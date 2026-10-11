import { enquirySchema } from "./enquiries";
import { assetPath, staticHosting } from "./hosting";

export async function submitEnquiry(
  payload: unknown,
): Promise<{ ok: boolean; message: string }> {
  if (staticHosting) {
    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success || parsed.data.website)
      return {
        ok: false,
        message:
          "Please check the required fields and consent. Nothing was sent.",
      };
    return {
      ok: false,
      message:
        parsed.data.kind === "newsletter"
          ? "Your email and opt-in are valid, but signup is not active. No subscription was created and nothing was sent."
          : "Your enquiry passed validation in this browser. Nothing was sent. You can copy your draft below.",
    };
  }
  const response = await fetch(assetPath("/api/enquiries"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return { ok: response.ok, message: result.message };
}
