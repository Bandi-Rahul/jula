"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { languagePath, translate, type Locale } from "@/lib/languages";

export function Newsletter({ locale = "en" }: { locale?: Locale }) {
  const t = (text: string) => translate(text, locale);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <section className="newsletter wrap" aria-labelledby="newsletter-title">
      <div>
        <span className="eyebrow">{t("Stay in the loop")}</span>
        <h2 id="newsletter-title">
          {locale === "fr" ? (
            <>
              Un mot, quand il y a<br />
              quelque chose à partager.
            </>
          ) : (
            <>
              A note when there is
              <br />
              something worth sharing.
            </>
          )}
        </h2>
        <p>{t("Future launches, new discoveries and news from JULA.")}</p>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          setMessage("");
          const form = event.currentTarget;
          const values = new FormData(form);
          try {
            const result = await submitEnquiry(
              {
                kind: "newsletter",
                email: values.get("email"),
                consent: values.get("consent") === "on",
                website: values.get("website"),
              },
              locale,
            );
            setMessage(result.message);
            if (result.ok) form.reset();
          } catch {
            setMessage(
              t(
                "The service could not be reached. Your subscription has not been confirmed.",
              ),
            );
          } finally {
            setPending(false);
          }
        }}
      >
        <label htmlFor="newsletter-email">{t("Email address")}</label>
        <div className="email-line">
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder={t("Your email address")}
            required
            maxLength={254}
            autoComplete="email"
          />
          <button
            type="submit"
            className="icon-button"
            aria-label={t("Request newsletter signup")}
            title={t("Request newsletter signup")}
            disabled={pending}
          >
            {pending ? <span className="spinner" /> : <ArrowRight size={23} />}
          </button>
        </div>
        <div className="honeypot" aria-hidden="true">
          <label>
            {t("Leave empty")}
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="checkbox-label">
          <input type="checkbox" name="consent" required />
          {locale === "fr"
            ? "J'accepte de recevoir les nouvelles de JULA. Je pourrai me désinscrire à tout moment."
            : "I agree to receive JULA news. I can unsubscribe at any time."}
        </label>
        <p className="small-note">
          {t(
            "Signup is not active until an approved email service is connected.",
          )}{" "}
          <Link href={languagePath("/privacy", locale)}>
            {t("Privacy notice")}
          </Link>
          .
        </p>
        <p role="status" className="form-feedback">
          {message}
        </p>
      </form>
    </section>
  );
}
