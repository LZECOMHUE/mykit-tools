"use client";

import { useState, useMemo } from "react";
import { formatNumber } from "@/lib/format";

// --- Formatting helpers ---

/** Convert decimal inches to nearest fraction (1/16 precision) */
function toFraction(decimal) {
  const sign = decimal < 0 ? "-" : "";
  const abs = Math.abs(decimal);
  const whole = Math.floor(abs);
  const remainder = abs - whole;

  if (remainder < 0.03125) return whole === 0 ? "0" : `${sign}${whole}`;

  // Find closest 1/16
  const sixteenths = Math.round(remainder * 16);
  if (sixteenths === 16) return `${sign}${whole + 1}`;
  if (sixteenths === 0) return whole === 0 ? "0" : `${sign}${whole}`;

  // Simplify fraction
  let num = sixteenths;
  let den = 16;
  while (num % 2 === 0) { num /= 2; den /= 2; }

  const fractionMap = {
    "1/2": "½", "1/4": "¼", "3/4": "¾",
    "1/8": "⅛", "3/8": "⅜", "5/8": "⅝", "7/8": "⅞",
  };
  const fracStr = `${num}/${den}`;
  const nice = fractionMap[fracStr] || fracStr;

  return whole > 0 ? `${sign}${whole} ${nice}` : `${sign}${nice}`;
}

/** Convert decimal feet to feet & inches string */
function toFeetInches(decimalFeet) {
  const sign = decimalFeet < 0 ? "-" : "";
  const abs = Math.abs(decimalFeet);
  const feet = Math.floor(abs);
  const inches = (abs - feet) * 12;
  const roundedInches = Math.round(inches * 10) / 10;

  if (roundedInches >= 12) return `${sign}${feet + 1}′ 0″`;
  if (roundedInches === 0) return `${sign}${feet}′ 0″`;
  if (roundedInches === Math.round(roundedInches)) {
    return `${sign}${feet}′ ${Math.round(roundedInches)}″`;
  }
  return `${sign}${feet}′ ${roundedInches.toFixed(1)}″`;
}

/** Convert decimal pounds to lbs & oz */
function toLbsOz(decimalLbs) {
  const sign = decimalLbs < 0 ? "-" : "";
  const abs = Math.abs(decimalLbs);
  const lbs = Math.floor(abs);
  const oz = (abs - lbs) * 16;
  const roundedOz = Math.round(oz * 10) / 10;

  if (roundedOz >= 16) return `${sign}${lbs + 1} lbs 0 oz`;
  if (roundedOz === 0) return `${sign}${lbs} lbs`;
  return `${sign}${lbs} lbs ${roundedOz === Math.round(roundedOz) ? Math.round(roundedOz) : roundedOz.toFixed(1)} oz`;
}

/** Convert decimal stone to stone & lbs */
function toStoneLbs(decimalStone) {
  const sign = decimalStone < 0 ? "-" : "";
  const abs = Math.abs(decimalStone);
  const stone = Math.floor(abs);
  const lbs = (abs - stone) * 14;
  const roundedLbs = Math.round(lbs * 10) / 10;

  if (roundedLbs >= 14) return `${sign}${stone + 1} st 0 lbs`;
  if (roundedLbs === 0) return `${sign}${stone} st`;
  return `${sign}${stone} st ${roundedLbs === Math.round(roundedLbs) ? Math.round(roundedLbs) : roundedLbs.toFixed(1)} lbs`;
}

// Map of display format names to formatter functions
const FORMATTERS = {
  decimal: null, // handled by default formatNumber
  fraction: toFraction,
  feetInches: toFeetInches,
  lbsOz: toLbsOz,
  stoneLbs: toStoneLbs,
};

const FORMAT_LABELS = {
  decimal: "Decimal",
  fraction: "Fraction",
  feetInches: "Feet & Inches",
  lbsOz: "Lbs & Oz",
  stoneLbs: "Stone & Lbs",
};

export default function ConverterTemplate({
  slug,
  inputUnit,
  inputLabel,
  outputUnit,
  outputLabel,
  convert,
  reverseConvert,
  reverseSlug,
  precision = 2,
  commonValues = [1, 5, 10, 25, 50, 100],
  formula,
  inputPlaceholder,
  displayFormats = null, // e.g. ["decimal", "fraction", "feetInches"]
  defaultFormat = "decimal",
}) {
  const [value, setValue] = useState("");
  const [displayFormat, setDisplayFormat] = useState(defaultFormat);

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;
    return convert(num);
  }, [value, convert]);

  const formatResult = (val) => {
    if (val === null || val === undefined) return null;
    const formatter = FORMATTERS[displayFormat];
    if (formatter) return formatter(val);
    return formatNumber(val, precision);
  };

  const formatForTable = (val) => {
    // For the common values table, always show decimal + active alt format
    const dec = formatNumber(val, precision);
    const formatter = FORMATTERS[displayFormat];
    if (formatter && displayFormat !== "decimal") {
      return `${dec} (${formatter(val)})`;
    }
    return dec;
  };

  const commonTable = useMemo(() => {
    return commonValues.map((v) => ({
      input: v,
      output: convert(v),
    }));
  }, [commonValues, convert]);

  const hasFormats = displayFormats && displayFormats.length > 1;

  return (
    <div className="space-y-3">
      {/* Converter card */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-5">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
          {/* Input */}
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-1">{inputLabel}</label>
            <div className="relative">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={inputPlaceholder || `Enter ${inputUnit}`}
                className="w-full px-3 py-2.5 text-sm rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono-num"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-text-muted font-medium">{inputUnit}</span>
            </div>
          </div>

          {/* Equals */}
          <div className="flex items-center justify-center pb-1">
            <span className="text-text-muted text-lg">=</span>
          </div>

          {/* Output */}
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-1">{outputLabel}</label>
            <div className="relative">
              <div className="w-full px-3 py-2.5 text-sm rounded-[var(--radius-input)] border border-border bg-surface text-text-primary font-mono-num min-h-[42px] flex items-center">
                {result !== null ? formatResult(result) : <span className="text-text-muted">—</span>}
              </div>
              {!hasFormats && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-text-muted font-medium">{outputUnit}</span>
              )}
            </div>
          </div>
        </div>

        {/* Format selector (only if multiple formats available) */}
        {hasFormats && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border">
            <span className="text-[12px] text-text-muted mr-1">Display as:</span>
            {displayFormats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setDisplayFormat(fmt)}
                className={`px-2.5 py-1 text-[12px] rounded-full border transition-colors cursor-pointer ${
                  displayFormat === fmt
                    ? "bg-accent text-white border-accent"
                    : "bg-white text-text-secondary border-border hover:border-accent/50"
                }`}
              >
                {FORMAT_LABELS[fmt]}
              </button>
            ))}
          </div>
        )}

        {/* Copy + Reverse row */}
        <div className={`flex items-center justify-between ${hasFormats ? "mt-2" : "mt-3 pt-3 border-t border-border"}`}>
          {result !== null && (
            <button
              onClick={() => navigator.clipboard.writeText(
                formatResult(result)
              )}
              className="text-[12px] text-accent hover:text-accent-hover transition-colors cursor-pointer"
            >
              Copy result
            </button>
          )}
          {reverseSlug && (
            <a href={`/${reverseSlug}`} className="text-[12px] text-accent hover:text-accent-hover transition-colors ml-auto">
              ↔ Convert {outputLabel} to {inputLabel}
            </a>
          )}
        </div>
      </div>

      {/* Formula */}
      {formula && (
        <div className="bg-surface rounded-[var(--radius-card)] px-4 py-3">
          <p className="text-[12px] text-text-muted mb-1">Formula</p>
          <p className="text-sm font-mono-num text-text-primary">{formula}</p>
        </div>
      )}

      {/* Common values table */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Common Conversions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1">
          {commonTable.map((row) => (
            <div key={row.input} className="flex justify-between text-[13px] py-1 border-b border-border/50">
              <span className="text-text-secondary font-mono-num">{row.input} {inputUnit}</span>
              <span className="text-text-primary font-mono-num">{formatForTable(row.output)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
