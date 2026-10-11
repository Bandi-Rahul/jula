"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

const storageKey = "jula-privacy-preferences-v1";
export function CookiePreferences() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey))
        setMessage(
          "Preferences have been stored in this browser. Non-essential services remain off.",
        );
    } catch {
      setMessage(
        "Browser storage is unavailable. No preference has been stored.",
      );
    }
  }, []);
  return (
    <div className="cookie-settings">
      <div className="cookie-row">
        <div>
          <h2>Necessary functions</h2>
          <p>
            Navigation, security and saving the preferences you choose. No
            account or payment cookies are currently used.
          </p>
        </div>
        <label>
          <input type="checkbox" checked disabled />
          Always active
        </label>
      </div>
      <div className="cookie-row">
        <div>
          <h2>Analytics</h2>
          <p>
            No analytics service is installed. It will not run merely because
            preferences are saved.
          </p>
        </div>
        <label>
          <input type="checkbox" checked={false} disabled />
          Not installed
        </label>
      </div>
      <div className="cookie-row">
        <div>
          <h2>Marketing</h2>
          <p>
            No advertising tracker or marketing cookie service is installed.
          </p>
        </div>
        <label>
          <input type="checkbox" checked={false} disabled />
          Not installed
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
                "Preferences saved in this browser. Analytics and marketing remain off.",
              );
            } catch {
              setMessage(
                "Your browser blocked storage. Preferences were not saved; non-essential services remain off.",
              );
            }
          }}
        >
          Save preferences
        </button>
        <button
          className="copy-draft"
          onClick={() => {
            try {
              localStorage.removeItem(storageKey);
              setMessage(
                "The saved preference has been removed. Non-essential services remain off.",
              );
            } catch {
              setMessage(
                "Browser storage could not be accessed. Non-essential services remain off.",
              );
            }
          }}
        >
          <RotateCcw size={15} />
          Remove saved preference
        </button>
      </div>
      <p role="status" className="form-feedback">
        {message}
      </p>
    </div>
  );
}
