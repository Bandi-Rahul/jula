import { z } from "zod";

const shared = {
  email: z.email().max(254),
  website: z.string().max(200).optional().default(""),
};
const enquiryFields = {
  ...shared,
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().default(""),
  subject: z.enum([
    "General question",
    "Product development",
    "Press & collaboration",
    "Retail",
    "Hospitality",
    "Corporate gifting",
    "Personalised packaging",
  ]),
  message: z.string().trim().min(20).max(4000),
  privacy: z.literal(true),
};

export const enquirySchema = z.discriminatedUnion("kind", [
  z.object({ ...enquiryFields, kind: z.literal("general") }).strict(),
  z
    .object({
      ...enquiryFields,
      kind: z.literal("professional"),
      company: z.string().trim().min(2).max(160),
    })
    .strict(),
  z
    .object({
      ...shared,
      kind: z.literal("newsletter"),
      consent: z.literal(true),
    })
    .strict(),
]);

export const acceptanceSchema = z.object({
  accepted: z.literal(true),
  id: z.string().min(1).max(200),
});

export async function boundedJson(
  request: Request,
  limit = 16384,
): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    size += chunk.value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new Error("too-large");
    }
    chunks.push(chunk.value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}
