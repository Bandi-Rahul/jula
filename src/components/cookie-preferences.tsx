"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { translate, type Locale } from "@/lib/languages";

const storageKey = "jula-privacy-preferences-v1";
export function CookiePreferences({ locale = "en" }: { locale?: Locale }) {
  const [message, setMessage] = useState("");
  const t = (text: string) => translate(text, locale);
  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey))
        setMessage(
          translate(
            "Preferences have been stored in this browser. Non-essential services remain off.",
            locale,
          ),
        );
    } catch {
      setMessage(
        translate(
          "Browser storage is unavailable. No preference has been stored.",
          locale,
        ),
      );
    }
  }, [locale]);
  return (
    <div className="cookie-settings">
      <div className="cookie-row">
        <div>
          <h2>{t("Necessary functions")}</h2>
          <p>
            {t(
              "Navigation, security and saving the preferences you choose. No account or payment cookies are currently used.",
            )}
          </p>
        </div>
        <label>
          <input type="checkbox" checked disabled />
          {t("Always active")}
        </label>
      </div>
      <div className="cookie-row">
        <div>
          <h2>{t("Analytics")}</h2>
          <p>
            {t(
              "No analytics service is installed. It will not run merely because preferences are saved.",
            )}
          </p>
        </div>
        <label>
          <input type="checkbox" checked={false} disabled />
          {t("Not installed")}
        </label>
      </div>
      <div className="cookie-row">
        <div>
          <h2>{t("Marketing")}</h2>
          <p>
            {t(
              "No advertising tracker or marketing cookie service is installed.",
            )}
          </p>
        </div>
        <label>
          <input type="checkbox" checked={false} disabled />
          {t("Not installed")}
        </label>
      </div>
      <div className="form-actions">
        <button
          className="button"
          onClick={() => {
            try {
              localStorage.setItem(
                storageKey,
                JSON.stringify({
                  version: 1,
                  necessary: true,
                  analytics: false,
                  marketing: false,
                  updatedAt: new Date().toISOString(),
                }),
              );
              setMessage(
                t(
                  "Preferences saved in this browser. Analytics and marketing remain off.",
                ),
              );
            } catch {
              setMessage(
                t(
                  "Your browser blocked storage. Preferences were not saved; non-essential services remain off.",
                ),
              );
            }
          }}
        >
          {t("Save preferences")}
        </button>
        <button
          className="copy-draft"
          onClick={() => {
            try {
              localStorage.removeItem(storageKey);
              setMessage(
                t(
                  "The saved preference has been removed. Non-essential services remain off.",
                ),
              );
            } catch {
              setMessage(
                t(
                  "Browser storage could not be accessed. Non-essential services remain off.",
                ),
              );
            }
          }}
        >
          <RotateCcw size={15} />
          {t("Remove saved preference")}
        </button>
      </div>
      <p role="status" className="form-feedback">
        {message}
      </p>
    </div>
  );
}
