"use client";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import { Search, RotateCcw, X } from "lucide-react";
import { filterProducts, ranges, type Product } from "@/lib/catalogue";
import { ProductCard } from "./editorial";
import { translate, type Locale } from "@/lib/languages";
import { tastesFrench } from "@/lib/french";

export function Catalog({
  items,
  initial = {},
  locale = "en",
}: {
  items: Product[];
  locale?: Locale;
  initial?: Record<string, string | undefined>;
}) {
  const [query, setQuery] = useState(initial.q ?? "");
  const [family, setFamily] = useState(
    ranges.some((range) => range.id === initial.family)
      ? initial.family!
      : "all",
  );
  const [taste, setTaste] = useState(
    ["Floral", "Roasted", "Spiced", "Fruity", "Earthy"].includes(
      initial.taste ?? "",
    )
      ? initial.taste!
      : "all",
  );
  const [sort, setSort] = useState(
    ["name", "family"].includes(initial.sort ?? "")
      ? initial.sort!
      : "editorial",
  );
  const searchInput = useRef<HTMLInputElement>(null);
  const [urlReady, setUrlReady] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const results = filterProducts(
    items,
    deferredQuery,
    family,
    taste,
    sort,
    locale,
  );
  const t = (text: string) => translate(text, locale);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? initial.q ?? "");
    const selectedFamily = params.get("family") ?? initial.family;
    setFamily(
      ranges.some((range) => range.id === selectedFamily)
        ? selectedFamily!
        : "all",
    );
    const selectedTaste = params.get("taste") ?? initial.taste;
    setTaste(
      ["Floral", "Roasted", "Spiced", "Fruity", "Earthy"].includes(
        selectedTaste ?? "",
      )
        ? selectedTaste!
        : "all",
    );
    const selectedSort = params.get("sort") ?? initial.sort;
    setSort(
      ["name", "family"].includes(selectedSort ?? "")
        ? selectedSort!
        : "editorial",
    );
    if (params.get("focus") === "search" || initial.focus === "search")
      searchInput.current?.focus();
    setUrlReady(true);
  }, [initial.q, initial.family, initial.taste, initial.sort, initial.focus]);
  useEffect(() => {
    if (!urlReady) return;
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (family !== "all") params.set("family", family);
    if (taste !== "all") params.set("taste", taste);
    if (sort !== "editorial") params.set("sort", sort);
    const next = params.size ? `?${params}` : "";
    window.history.replaceState(null, "", `${window.location.pathname}${next}`);
  }, [query, family, taste, sort, urlReady]);
  function reset() {
    setQuery("");
    setFamily("all");
    setTaste("all");
    setSort("editorial");
  }
  return (
    <div className="catalog">
      <div className="catalog-controls">
        <div className="catalog-search">
          <label htmlFor="catalog-search">{t("Find a drink")}</label>
          <div>
            <Search size={18} />
            <input
              ref={searchInput}
              id="catalog-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("Name, ingredient or proposed origin")}
              maxLength={120}
            />
            {query && (
              <button
                className="icon-button"
                onClick={() => setQuery("")}
                aria-label={t("Clear search")}
                title={t("Clear search")}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="catalog-family">{t("Family")}</label>
          <select
            id="catalog-family"
            value={family}
            onChange={(event) => setFamily(event.target.value)}
          >
            <option value="all">{t("All families")}</option>
            {ranges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.name}
                {range.later
                  ? locale === "fr"
                    ? " · Plus tard"
                    : " · Later"
                  : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="catalog-taste">{t("Taste direction")}</label>
          <select
            id="catalog-taste"
            value={taste}
            onChange={(event) => setTaste(event.target.value)}
          >
            <option value="all">{t("All directions")}</option>
            {(["Floral", "Roasted", "Spiced", "Fruity", "Earthy"] as const).map(
              (item) => (
                <option key={item} value={item}>
                  {locale === "fr" ? tastesFrench[item] : item}
                </option>
              ),
            )}
          </select>
        </div>
        <div>
          <label htmlFor="catalog-sort">{t("Sort by")}</label>
          <select
            id="catalog-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="editorial">{t("JULA selection")}</option>
            <option value="name">{t("Name A–Z")}</option>
            <option value="family">{t("Family")}</option>
          </select>
        </div>
      </div>
      <div className="catalog-results-bar">
        <p role="status" aria-live="polite">
          {locale === "fr"
            ? `${results.length} aperçu${results.length === 1 ? "" : "s"} de développement`
            : `${results.length} development ${results.length === 1 ? "preview" : "previews"}`}
        </p>
        <button className="reset-button" onClick={reset}>
          <RotateCcw size={14} /> {t("Reset filters")}
        </button>
      </div>
      {results.length ? (
        <div className="product-grid" aria-busy={query !== deferredQuery}>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={30} strokeWidth={1} />
          <h2>{t("No matching previews.")}</h2>
          <p>
            {t(
              "Try another search or a different family. GO ROASTED has no public products yet.",
            )}
          </p>
          <button className="button button-outline" onClick={reset}>
            <RotateCcw size={16} />
            {t("Reset filters")}
          </button>
        </div>
      )}
      <p className="catalog-image-note">
        {t(
          "Images are contextual photographs or JULA development illustrations, not final products. Taste directions are preliminary, not batch-approved tasting notes.",
        )}
      </p>
    </div>
  );
}
