"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Copy } from "lucide-react";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { staticHosting } from "@/lib/hosting";
import { languagePath, translate, type Locale } from "@/lib/languages";

export function InquiryForm({
  professional = false,
  enabled = false,
  locale = "en",
}: {
  professional?: boolean;
  enabled?: boolean;
  locale?: Locale;
}) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const t = (text: string) => translate(text, locale);
  const subjects = professional
    ? ["Retail", "Hospitality", "Corporate gifting", "Personalised packaging"]
    : ["General question", "Product development", "Press & collaboration"];
  return (
    <form
      ref={form}
      className="inquiry-form"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setMessage("");
        const values = new FormData(event.currentTarget);
        const payload = {
          kind: professional ? "professional" : "general",
          name: values.get("name"),
          email: values.get("email"),
          company: values.get("company"),
          subject: values.get("subject"),
          message: values.get("message"),
          privacy: values.get("privacy") === "on",
          website: values.get("website"),
        };
        try {
          const result = await submitEnquiry(payload, locale);
          setMessage(result.message);
          if (result.ok) form.current?.reset();
        } catch {
          setMessage(
            t(
              "The service could not be reached. Your enquiry has not been confirmed as delivered.",
            ),
          );
        } finally {
          setPending(false);
        }
      }}
    >
      <h2>{t(professional ? "Your professional enquiry" : "Your enquiry")}</h2>
      <p className="small-note">
        {t(
          enabled
            ? "Requests are forwarded to the configured receiving service. Acceptance does not guarantee email delivery or a response time."
            : "The receiving service is not active. You can prepare and validate a draft, but nothing will be sent.",
        )}
      </p>
      <div className="form-grid">
        <label htmlFor="enquiry-name">
          {t("Your name")} <span>{t("Required")}</span>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
          />
        </label>
        <label htmlFor="enquiry-email">
          {t("Email address")} <span>{t("Required")}</span>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
          />
        </label>
        <label htmlFor="enquiry-company">
          {t("Company")}{" "}
          <span>{t(professional ? "Required" : "Optional")}</span>
          <input
            id="enquiry-company"
            name="company"
            autoComplete="organization"
            minLength={professional ? 2 : undefined}
            maxLength={160}
            required={professional}
          />
        </label>
        <label htmlFor="enquiry-subject">
          {t("Subject")} <span>{t("Required")}</span>
          <select id="enquiry-subject" name="subject" required>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {t(subject)}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="enquiry-message" className="full-field">
          {t("Your message")} <span>{t("20–4,000 characters")}</span>
          <textarea
            id="enquiry-message"
            name="message"
            rows={6}
            minLength={20}
            maxLength={4000}
            required
            placeholder={t(
              professional
                ? "Your setting, intended use, quantities or timing, if known…"
                : "Tell us what you have in mind…",
            )}
          />
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          {t("Leave empty")}
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="checkbox-label">
        <input name="privacy" type="checkbox" required />
        <span>
          {locale === "fr" ? (
            <>
              J'ai lu la{" "}
              <Link href={languagePath("/privacy", locale)}>
                notice de confidentialité
              </Link>
              . Je comprends le statut actuel du service. Ceci n'est pas une
              inscription marketing.
            </>
          ) : (
            <>
              I have read the <Link href="/privacy">privacy notice</Link>. I
              understand the current service status. This is not a marketing
              signup.
            </>
          )}
        </span>
      </label>
      <p className="small-note">
        {t(
          staticHosting
            ? "Checking validates this draft only in your browser. Nothing is transmitted."
            : "Checking sends these fields to this site's server for validation. The application does not save your draft.",
        )}{" "}
        {t("Please do not include sensitive personal information.")}
      </p>
      <div className="form-actions">
        <button className="button" type="submit" disabled={pending}>
          {t(
            pending ? "Checking…" : enabled ? "Send enquiry" : "Check enquiry",
          )}
          <ArrowRight size={17} />
        </button>
        <button
          className="copy-draft"
          type="button"
          onClick={async () => {
            if (!form.current) return;
            const values = new FormData(form.current);
            const text = `${t("Your enquiry")} JULA\n${t("Your name")}: ${values.get("name")}\n${t("Email address")}: ${values.get("email")}\n${t("Company")}: ${values.get("company")}\n${t("Subject")}: ${t(String(values.get("subject")))}\n\n${values.get("message")}`;
            try {
              await navigator.clipboard.writeText(text);
              setMessage(
                t("Draft copied to your clipboard. It has not been sent."),
              );
            } catch {
              setMessage(
                t(
                  "Clipboard access is unavailable. Your draft remains in the form.",
                ),
              );
            }
          }}
        >
          <Copy size={15} />
          {t("Copy draft")}
        </button>
      </div>
      <p className="form-feedback" role="status">
        {message}
      </p>
    </form>
  );
}
