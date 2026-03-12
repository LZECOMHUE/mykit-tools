"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

// ── Ingredient data: grams per US cup ───────────────────────
const INGREDIENTS = {
  flour: {
    name: "Plain Flour (All-Purpose)",
    gramsPerCup: 125,
    emoji: "🌾",
    tips: "Spoon flour into the cup and level off — don't scoop or pack. Scooping can add 30g+ extra per cup.",
    variants: [
      { name: "Self-raising flour", gramsPerCup: 125 },
      { name: "Bread flour", gramsPerCup: 130 },
      { name: "Wholemeal flour", gramsPerCup: 130 },
      { name: "Cake flour", gramsPerCup: 115 },
      { name: "Almond flour", gramsPerCup: 96 },
      { name: "Coconut flour", gramsPerCup: 128 },
    ],
  },
  sugar: {
    name: "Granulated Sugar",
    gramsPerCup: 200,
    emoji: "🍬",
    tips: "Sugar is one of the more consistent cup measurements. No need to pack — just level off.",
    variants: [
      { name: "Caster sugar", gramsPerCup: 200 },
      { name: "Brown sugar (packed)", gramsPerCup: 220 },
      { name: "Icing sugar", gramsPerCup: 120 },
      { name: "Demerara sugar", gramsPerCup: 220 },
      { name: "Muscovado sugar", gramsPerCup: 210 },
    ],
  },
  butter: {
    name: "Butter",
    gramsPerCup: 227,
    emoji: "🧈",
    tips: "1 cup = 2 sticks of US butter = 227g. In UK recipes, butter is almost always weighed in grams.",
    variants: [
      { name: "Melted butter", gramsPerCup: 227 },
      { name: "Margarine", gramsPerCup: 227 },
      { name: "Coconut oil", gramsPerCup: 218 },
      { name: "Vegetable oil", gramsPerCup: 218 },
      { name: "Lard", gramsPerCup: 205 },
    ],
  },
  rice: {
    name: "White Rice (uncooked)",
    gramsPerCup: 185,
    emoji: "🍚",
    tips: "Rice roughly doubles in volume when cooked. 1 cup uncooked = about 3 cups cooked.",
    variants: [
      { name: "Basmati rice", gramsPerCup: 180 },
      { name: "Brown rice", gramsPerCup: 190 },
      { name: "Arborio/risotto rice", gramsPerCup: 200 },
      { name: "Sushi rice", gramsPerCup: 200 },
      { name: "Wild rice", gramsPerCup: 160 },
    ],
  },
  oats: {
    name: "Rolled Oats",
    gramsPerCup: 90,
    emoji: "🥣",
    tips: "Oats are very light — a cup of oats weighs far less than a cup of flour. Don't pack them down.",
    variants: [
      { name: "Quick oats", gramsPerCup: 80 },
      { name: "Steel-cut oats", gramsPerCup: 160 },
      { name: "Oat flour", gramsPerCup: 105 },
    ],
  },
};

// Common cup fractions for quick reference
const CUP_FRACTIONS = [
  { label: "¼ cup", value: 0.25 },
  { label: "⅓ cup", value: 1 / 3 },
  { label: "½ cup", value: 0.5 },
  { label: "⅔ cup", value: 2 / 3 },
  { label: "¾ cup", value: 0.75 },
  { label: "1 cup", value: 1 },
  { label: "1½ cups", value: 1.5 },
  { label: "2 cups", value: 2 },
  { label: "3 cups", value: 3 },
];

export default function CupsToGramsIngredient({ ingredient = "flour" }) {
  const [cups, setCups] = useState("");
  const [direction, setDirection] = useState("cups-to-grams"); // or "grams-to-cups"

  const data = INGREDIENTS[ingredient] || INGREDIENTS.flour;

  const result = useMemo(() => {
    const val = parseFloat(cups);
    if (!val || val <= 0) return null;
    if (direction === "cups-to-grams") {
      return { grams: val * data.gramsPerCup, cups: val };
    } else {
      return { grams: val, cups: val / data.gramsPerCup };
    }
  }, [cups, direction, data.gramsPerCup]);

  const formatNum = (n) => {
    if (n >= 100) return Math.round(n).toString();
    if (n >= 10) return n.toFixed(1).replace(/\.0$/, "");
    return n.toFixed(2).replace(/\.?0+$/, "");
  };

  return (
    <div className="space-y-4">
      {/* Converter */}
      <Card>
        <div className="text-center mb-4">
          <span className="text-4xl">{data.emoji}</span>
          <h3 className="text-lg font-semibold text-text-primary mt-1">{data.name}</h3>
          <p className="text-sm text-text-muted">
            1 US cup = <span className="font-mono">{data.gramsPerCup}g</span>
          </p>
        </div>

        {/* Direction toggle */}
        <div className="flex rounded-[var(--radius-input)] border border-border overflow-hidden mb-4">
          {[
            { key: "cups-to-grams", label: "Cups → Grams" },
            { key: "grams-to-cups", label: "Grams → Cups" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setDirection(key); setCups(""); }}
              className={`flex-1 px-3 py-2 text-sm font-medium cursor-pointer border-none transition-colors ${
                direction === key
                  ? "bg-accent text-white"
                  : "bg-white text-text-muted hover:text-text-secondary hover:bg-surface"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <Input
          label={direction === "cups-to-grams" ? "Cups" : "Grams"}
          type="number"
          value={cups}
          onChange={(e) => setCups(e.target.value)}
          placeholder={direction === "cups-to-grams" ? "e.g. 2" : "e.g. 250"}
          min="0"
          step="0.25"
        />

        {result && (
          <div className="mt-4 bg-accent/5 border border-accent/20 rounded-[var(--radius-card)] p-4 text-center">
            <p className="text-sm text-text-secondary mb-1">
              {direction === "cups-to-grams"
                ? `${formatNum(result.cups)} cup${result.cups !== 1 ? "s" : ""} of ${data.name.toLowerCase()}`
                : `${formatNum(result.grams)}g of ${data.name.toLowerCase()}`}
            </p>
            <p className="text-3xl font-bold font-mono text-accent">
              {direction === "cups-to-grams"
                ? `${formatNum(result.grams)}g`
                : `${formatNum(result.cups)} cup${result.cups !== 1 ? "s" : ""}`}
            </p>
          </div>
        )}
      </Card>

      {/* Quick reference table */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          Quick Reference — {data.name}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-text-secondary font-medium">Cups</th>
                <th className="text-right py-2 text-text-secondary font-medium">Grams</th>
                <th className="text-right py-2 text-text-secondary font-medium">Ounces</th>
              </tr>
            </thead>
            <tbody>
              {CUP_FRACTIONS.map(({ label, value }) => (
                <tr key={label} className="border-b border-border/50">
                  <td className="py-2 text-text-primary">{label}</td>
                  <td className="py-2 text-right font-mono text-text-primary">
                    {Math.round(value * data.gramsPerCup)}g
                  </td>
                  <td className="py-2 text-right font-mono text-text-muted">
                    {((value * data.gramsPerCup) / 28.35).toFixed(1)}oz
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Variants */}
      {data.variants && data.variants.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            Related Ingredients
          </h3>
          <div className="space-y-2">
            {data.variants.map((v) => (
              <div
                key={v.name}
                className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
              >
                <span className="text-sm text-text-primary">{v.name}</span>
                <span className="text-sm font-mono text-text-secondary">
                  1 cup = {v.gramsPerCup}g
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">Tips</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>{data.tips}</p>
          <p>
            Cup measurements can vary by up to 20% depending on how you fill the cup. For consistent baking results, weighing ingredients in grams is always more accurate.
          </p>
        </div>
      </Card>
    </div>
  );
}
