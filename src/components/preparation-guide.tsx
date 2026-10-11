"use client";

import Link from "next/link";
import { useState } from "react";
import { ranges, type RangeId } from "@/lib/catalogue";
import { rangesFrench } from "@/lib/french";
import type { Locale } from "@/lib/languages";

const guides: Record<
  RangeId,
  { method: string; text: string; points: string[] }
> = {
  tea: {
    method: "Give the leaf its own conditions.",
    text: "Tea type, leaf size and the selected batch matter. A green tea and an oolong should not be given one universal brewing instruction.",
    points: [
      "Use clean equipment and fresh water.",
      "Check the approved product label for dose, temperature and timing when available.",
      "Strain or remove the leaves at the end of the recommended infusion.",
    ],
  },
  herbal: {
    method: "Let the ingredients guide the infusion.",
    text: "Fruit, flowers and roots behave differently in water. A colourful drink is not evidence of a finished extraction or a safe botanical composition.",
    points: [
      "Use only the confirmed food ingredients and approved product instructions.",
      "Keep the vessel and strainer clean.",
      "Follow the final label rather than a tea-family assumption.",
    ],
  },
  latte: {
    method: "A concentrate, then a drink.",
    text: "A dry concentrate may need whisking or blending. The liquid you choose affects texture, taste and allergens.",
    points: [
      "Check both the concentrate and the milk or plant-based drink for allergens.",
      "Follow the approved mixing sequence and dose when published.",
      "Use suitable equipment and avoid splashing hot liquid.",
    ],
  },
  cacao: {
    method: "Texture is part of the taste.",
    text: "Cocoa disperses differently from an instant drink powder. Final instructions must be tested for the actual recipe and chosen liquid.",
    points: [
      "Confirm product and liquid allergens before preparing.",
      "Follow the approved mixing and heating instructions.",
      "Use clean utensils and a vessel suitable for hot liquids.",
    ],
  },
  coffee: {
    method: "The format follows the equipment.",
    text: "Beans, ground coffee and soft pods need different equipment. JULA’s final selling formats and roast-specific recipes are not confirmed.",
    points: [
      "Choose a grind appropriate to your brewing equipment.",
      "Follow your equipment’s safety and cleaning instructions.",
      "Use the batch-specific recipe once approved, not an assumed universal ratio.",
    ],
  },
  flower: {
    method: "Make room for the unfolding.",
    text: "Blooming tea combines infusion and movement. Food safety, composition and repeatable opening behaviour matter as much as appearance.",
    points: [
      "Use a clean, heat-safe vessel of an approved size.",
      "Follow the confirmed creation’s preparation instructions.",
      "Do not assume every decorative flower is food-safe.",
    ],
  },
  roasted: {
    method: "For a later chapter.",
    text: "Roasted soybean, buckwheat and rice directions require their own ingredient review and validated preparation. No final products are published.",
    points: [
      "This family is outside the immediate launch.",
      "No dosage, temperature or preparation time is confirmed.",
      "Explore the other families while this work develops.",
    ],
  },
};

export function PreparationGuide({ locale = "en" }: { locale?: Locale }) {
  const [family, setFamily] = useState<RangeId>("tea");
  const guide =
    locale === "fr"
      ? {
          method: rangesFrench[family].title,
          text: rangesFrench[family].context,
          points: [
            "Utilisez du matériel propre et adapté à la chaleur ; suivez ses consignes de sécurité.",
            "Vérifiez les allergènes du produit et du liquide choisi. Un aperçu ne permet pas de décider de leur compatibilité avec votre alimentation.",
            {
              tea: "Dose, température et durée doivent suivre l'étiquette validée du lot. Retirez les feuilles en fin d'infusion.",
              herbal:
                "N'utilisez que des ingrédients alimentaires confirmés et les instructions finales, sans appliquer par défaut celles du thé.",
              latte:
                "Le liquide influe sur la texture et les allergènes. Suivez la séquence de mélange et le dosage approuvés.",
              cacao:
                "La dispersion du cacao nécessite une méthode testée pour la recette et le liquide. Suivez les instructions de mélange et de chauffe validées.",
              coffee:
                "Adaptez la mouture au matériel et utilisez la recette validée pour le lot, pas un ratio universel.",
              flower:
                "Utilisez un récipient propre, résistant à la chaleur et de taille validée. Une fleur décorative n'est pas nécessairement comestible.",
              roasted:
                "Cette famille est prévue pour plus tard. Aucune dose, température ou durée n'est confirmée.",
            }[family],
          ],
        }
      : guides[family];
  return (
    <div className="preparation-guide">
      <div>
        <label htmlFor="guide-family">
          {locale === "fr" ? "Choisir une famille" : "Choose a family"}
        </label>
        <select
          id="guide-family"
          value={family}
          onChange={(event) => setFamily(event.target.value as RangeId)}
        >
          {ranges.map((range) => (
            <option key={range.id} value={range.id}>
              {range.name}
              {range.later
                ? locale === "fr"
                  ? " · Pour plus tard"
                  : " · Coming later"
                : ""}
            </option>
          ))}
        </select>
        <p className="small-note">
          {locale === "fr"
            ? "Contexte général de préparation, pas des instructions finales propres au produit."
            : "General preparation context. Not final product-specific instructions."}
        </p>
      </div>
      <div className="guide-result" aria-live="polite">
        <span className="eyebrow">
          {ranges.find((range) => range.id === family)?.name}
        </span>
        <h2>{guide.method}</h2>
        <p>{guide.text}</p>
        <ol>
          {guide.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ol>
        <Link
          href={`${locale === "fr" ? "/fr" : ""}/ranges/${family}`}
          className="text-link"
        >
          {locale === "fr" ? "Explorer cette famille" : "Explore this family"}
        </Link>
      </div>
    </div>
  );
}
