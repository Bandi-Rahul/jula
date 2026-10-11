import { createHash } from "node:crypto";
import { acceptanceSchema, boundedJson, enquirySchema } from "@/lib/enquiries";

export const runtime = "nodejs";
const buckets = new Map<string, { count: number; until: number }>();
const reply = (message: string, status: number) =>
  Response.json(
    { message },
    { status, headers: { "Cache-Control": "no-store" } },
  );

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return reply(
      "The request origin could not be verified. Nothing was sent.",
      403,
    );
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply("A JSON request is required.", 415);
  const now = Date.now();
  for (const [key, bucket] of buckets)
    if (bucket.until <= now) buckets.delete(key);
  const ipHeader = process.env.TRUSTED_CLIENT_IP_HEADER;
  const identifier = ipHeader
    ? (request.headers.get(ipHeader)?.slice(0, 150) ?? "unknown")
    : "shared";
  const key = createHash("sha256").update(identifier).digest("hex");
  const bucket = buckets.get(key) ?? { count: 0, until: now + 60_000 };
  bucket.count += 1;
  buckets.set(key, bucket);
  if (bucket.count > (ipHeader ? 10 : 50))
    return reply(
      "Too many attempts. Please try again later. Nothing was sent.",
      429,
    );
  let body: unknown;
  try {
    body = await boundedJson(request);
  } catch {
    return reply("The request is invalid or too large. Nothing was sent.", 400);
  }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success)
    return reply(
      "Please check your email, required fields, message length and privacy acknowledgement. Nothing was sent.",
      400,
    );
  if (parsed.data.website)
    return reply("The request could not be accepted. Nothing was sent.", 400);
  const newsletter = parsed.data.kind === "newsletter";
  const endpoint = newsletter
    ? process.env.NEWSLETTER_WEBHOOK_URL
    : process.env.ENQUIRY_WEBHOOK_URL;
  if (process.env.FORM_PROCESSING_APPROVED !== "true" || !endpoint) {
    return reply(
      newsletter
        ? "Your email and opt-in are valid, but signup is not active. No subscription was created and nothing was sent."
        : "Your enquiry passed validation, but the receiving service is not active. Nothing was sent. You can copy your draft below.",
      503,
    );
  }
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:")
      return reply(
        "The receiving service is not configured securely. Nothing was sent.",
        503,
      );
    const token = newsletter
      ? process.env.NEWSLETTER_WEBHOOK_TOKEN
      : process.env.ENQUIRY_WEBHOOK_TOKEN;
    const payload = { ...parsed.data, website: undefined };
    const upstream = await fetch(url, {
      method: "POST",
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (
      !upstream.ok ||
      !acceptanceSchema.safeParse(await upstream.json()).success
    )
      return reply(
        "The receiving service did not confirm acceptance. Please do not assume your request was delivered.",
        502,
      );
    return reply(
      newsletter
        ? "The receiving service accepted your signup request. A subscription or confirmation email is not yet confirmed."
        : "The receiving service accepted your enquiry. Email delivery and a response time are not yet confirmed.",
      200,
    );
  } catch {
    return reply(
      "The receiving service could not confirm acceptance. Your request has not been confirmed as delivered.",
      502,
    );
  }
}
