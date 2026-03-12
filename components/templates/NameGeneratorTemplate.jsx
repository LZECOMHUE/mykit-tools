"use client";

import { useState, useRef, useCallback } from "react";
import Button from "@/components/ui/Button";
import { downloadNameCard } from "@/lib/export";

/**
 * Reusable template for all "fun name generator" tools.
 *
 * Props:
 *   slug        — tool slug for watermark URL
 *   headline    — e.g. "Your Pop Star Name Is..."
 *   subheadline — e.g. "Answer a few questions to discover your stage name"
 *   bgGradient  — tailwind gradient classes for the result card
 *   icon        — emoji shown on the result card
 *   type        — name type for download card (e.g. "Pop Star", "Rapper")
 *   gradientColors — array of 2 hex colors for download card gradient (e.g. ['#d946ef', '#7c3aed'])
 *   inputs      — array of { id, label, placeholder, options? }
 *                  if options is provided → renders a <select>
 *                  if not → renders a text <input>
 *   generate    — (inputValues) => string   — returns the generated name
 */
export default function NameGeneratorTemplate({
  slug,
  headline,
  subheadline,
  bgGradient = "from-purple-500 to-pink-500",
  icon = "✨",
  type = "Name",
  gradientColors = ["#7c3aed", "#d946ef"],
  inputs = [],
  generate,
}) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(inputs.map((i) => [i.id, ""]))
  );
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const handleChange = (id, val) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleGenerate = () => {
    const name = generate(values);
    setResult(name);
  };

  const allFilled = inputs.every((i) => values[i.id]?.trim());

  const handleCopy = useCallback(() => {
    if (!result) return;
    const text = `${headline} ${result}\n\nmykit.tools/${slug}`;
    navigator.clipboard.writeText(text);
  }, [result, headline, slug]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    downloadNameCard(result, type, icon, gradientColors, slug);
  }, [result, type, icon, gradientColors, slug]);

  return (
    <div className="max-w-lg mx-auto">
      {/* Input form */}
      {!result && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-6 max-sm:p-4">
          {subheadline && (
            <p className="text-text-secondary text-sm mb-6 text-center">
              {subheadline}
            </p>
          )}

          <div className="space-y-4">
            {inputs.map((input) => (
              <div key={input.id} className="flex flex-col gap-1.5">
                <label
                  htmlFor={input.id}
                  className="text-sm font-medium text-text-primary"
                >
                  {input.label}
                </label>
                {input.options ? (
                  <select
                    id={input.id}
                    value={values[input.id]}
                    onChange={(e) => handleChange(input.id, e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[var(--radius-input)] border border-border bg-white text-text-primary min-h-[44px] outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 cursor-pointer"
                  >
                    <option value="">Select...</option>
                    {input.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={input.id}
                    type="text"
                    value={values[input.id]}
                    onChange={(e) => handleChange(input.id, e.target.value)}
                    placeholder={input.placeholder}
                    className="w-full px-3 py-2.5 rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted min-h-[44px] outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
                  />
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!allFilled}
            className="w-full mt-6"
          >
            Generate My Name
          </Button>
        </div>
      )}

      {/* Result card — designed to be screenshot-friendly */}
      {result && (
        <div className="space-y-4">
          <div
            ref={resultRef}
            className={`bg-gradient-to-br ${bgGradient} rounded-[var(--radius-card)] p-5 sm:p-10 text-center text-white shadow-lg`}
          >
            <span className="text-4xl block mb-3">{icon}</span>
            <p className="text-sm font-medium opacity-80 uppercase tracking-wide mb-2">
              {headline}
            </p>
            <p
              className="text-3xl sm:text-4xl font-bold font-heading leading-tight"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
            >
              {result}
            </p>
            <p className="text-xs opacity-50 mt-6">mykit.tools/{slug}</p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCopy} variant="secondary" className="flex-1">
              Copy Result
            </Button>
            <Button onClick={handleDownload} className="flex-1">
              Download Card
            </Button>
            <Button
              onClick={() => {
                setResult(null);
                setValues(
                  Object.fromEntries(inputs.map((i) => [i.id, ""]))
                );
              }}
              variant="ghost"
              className="flex-1"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
