import { enquirySchema } from "./enquiries";
import { assetPath, staticHosting } from "./hosting";
import { translate, type Locale } from "./languages";

export async function submitEnquiry(
  payload: unknown,
  locale: Locale = "en",
): Promise<{ ok: boolean; message: string }> {
  if (staticHosting) {
    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success || parsed.data.website)
      return {
        ok: false,
        message: translate(
          "Please check the required fields and consent. Nothing was sent.",
          locale,
        ),
      };
    return {
      ok: false,
      message: translate(
        parsed.data.kind === "newsletter"
          ? "Your email and opt-in are valid, but signup is not active. No subscription was created and nothing was sent."
          : "Your enquiry passed validation in this browser. Nothing was sent. You can copy your draft below.",
        locale,
      ),
    };
  }
  const response = await fetch(assetPath("/api/enquiries"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return {
    ok: response.ok,
    message:
      locale === "fr"
        ? response.ok
          ? "Demande acceptée par le service configuré. Cela ne garantit ni livraison d'un e-mail ni délai de réponse."
          : "La demande n'a pas été acceptée. Vérifiez les champs et le statut du service. Aucune livraison n'est confirmée."
        : result.message,
  };
}
