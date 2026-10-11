"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { faqs } from "@/lib/content";

export function FAQ() {
  const [search, setSearch] = useState("");
  const filtered = faqs.filter((item) =>
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
          type="search"
          value={search}
          maxLength={120}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search questions"
        />
      </label>
      <p className="small-note" role="status">
        {filtered.length} {filtered.length === 1 ? "answer" : "answers"}
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
          <h2>No matching questions.</h2>
          <button
            className="button button-outline"
            onClick={() => setSearch("")}
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
