"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { faqs } from "@/lib/content";
import { faqsFrench } from "@/lib/french";
import type { Locale } from "@/lib/languages";

export function FAQ({ locale = "en" }: { locale?: Locale }) {
  const [search, setSearch] = useState("");
  const items =
    locale === "fr"
      ? faqsFrench.map(([question, answer]) => ({ question, answer }))
      : faqs;
  const filtered = items.filter((item) =>
    `${item.question} ${item.answer}`
      .toLowerCase()
      .includes(search.toLowerCase().trim()),
  );
  return (
    <div className="faq-content">
      <label className="faq-search" htmlFor="faq-search">
        <Search size={17} />
        <input
          id="faq-search"
          aria-label={
            locale === "fr" ? "Rechercher une question" : "Search questions"
          }
          type="search"
          value={search}
          maxLength={120}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={
            locale === "fr" ? "Rechercher une question" : "Search questions"
          }
        />
      </label>
      <p className="small-note" role="status">
        {filtered.length}{" "}
        {locale === "fr"
          ? filtered.length === 1
            ? "réponse"
            : "réponses"
          : filtered.length === 1
            ? "answer"
            : "answers"}
      </p>
      <div className="accordion-list">
        {filtered.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <div>
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <h2>
            {locale === "fr"
              ? "Aucune question correspondante."
              : "No matching questions."}
          </h2>
          <button
            className="button button-outline"
            onClick={() => setSearch("")}
          >
            {locale === "fr" ? "Effacer la recherche" : "Clear search"}
          </button>
        </div>
      )}
    </div>
  );
}
