"use client";

import { useState, useMemo } from "react";

const VAT_RATES = [
  { value: "20", label: "20% (Standard)" },
  { value: "5", label: "5% (Reduced)" },
  { value: "12.5", label: "12.5% (Hospitality)" },
  { value: "0", label: "0% (Zero-rated)" },
  { value: "custom", label: "Custom rate" },
];

const fmt = (n) => {
  if (n === null || isNaN(n)) return "—";
  return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function VATCalculator() {
  const [mode, setMode] = useState("add"); // "add" or "remove"
  const [amount, setAmount] = useState("");
  const [rateOption, setRateOption] = useState("20");
  const [customRate, setCustomRate] = useState("");

  const vatRate = useMemo(() => {
    if (rateOption === "custom") return parseFloat(customRate) || 0;
    return parseFloat(rateOption);
  }, [rateOption, customRate]);

  const result = useMemo(() => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0 || vatRate < 0) return null;

    if (mode === "add") {
      const vatAmount = val * (vatRate / 100);
      return { net: val, vat: vatAmount, gross: val + vatAmount };
    } else {
      const net = val / (1 + vatRate / 100);
      const vatAmount = val - net;
      return { net, vat: vatAmount, gross: val };
    }
  }, [amount, vatRate, mode]);

  const inputStyle = "w-full px-3 py-2.5 text-sm rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono-num";
  const selectStyle = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  return (
    <div className="max-w-lg space-y-4">
      {/* Mode toggle */}
      <div className="flex rounded-[var(--radius-input)] border border-border overflow-hidden">
        <button
          onClick={() => setMode("add")}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            mode === "add"
              ? "bg-accent text-white"
              : "bg-white text-text-secondary hover:bg-surface"
          }`}
        >
          Add VAT
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            mode === "remove"
              ? "bg-accent text-white"
              : "bg-white text-text-secondary hover:bg-surface"
          }`}
        >
          Remove VAT
        </button>
      </div>

      {/* Input card */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-3">
        {/* Amount */}
        <div>
          <label className="block text-[13px] font-medium text-text-primary mb-1">
            {mode === "add" ? "Net amount (excl. VAT)" : "Gross amount (incl. VAT)"}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">£</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={mode === "add" ? "e.g. 100.00" : "e.g. 120.00"}
              className={`${inputStyle} pl-7`}
              step="any"
            />
          </div>
        </div>

        {/* VAT rate */}
        <div className="flex items-center gap-2">
          <label className="text-[13px] text-text-secondary whitespace-nowrap min-w-[70px]">VAT rate</label>
          <select value={rateOption} onChange={(e) => setRateOption(e.target.value)} className={selectStyle}>
            {VAT_RATES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        {rateOption === "custom" && (
          <div className="flex items-center gap-2 ml-[78px]">
            <input
              type="number"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              placeholder="e.g. 15"
              className="w-24 px-2 py-1.5 text-[13px] font-mono-num rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent"
              step="any"
            />
            <span className="text-[13px] text-text-muted">%</span>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] overflow-hidden">
          {/* Breakdown rows */}
          <div className="divide-y divide-border">
            <div className={`flex items-center justify-between px-4 py-3 ${mode === "remove" ? "" : "bg-accent-muted"}`}>
              <span className="text-[13px] text-text-secondary">Net (excl. VAT)</span>
              <span className="text-sm font-semibold font-mono-num text-text-primary">{fmt(result.net)}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[13px] text-text-secondary">
                VAT at {vatRate}%
              </span>
              <span className="text-sm font-semibold font-mono-num text-red-600">+ {fmt(result.vat)}</span>
            </div>
            <div className={`flex items-center justify-between px-4 py-3 ${mode === "add" ? "" : "bg-accent-muted"}`}>
              <span className="text-[13px] text-text-secondary">Gross (incl. VAT)</span>
              <span className="text-sm font-semibold font-mono-num text-text-primary">{fmt(result.gross)}</span>
            </div>
          </div>

          {/* Formula explanation */}
          <div className="px-4 py-2.5 bg-surface border-t border-border">
            {mode === "add" ? (
              <p className="text-[11px] text-text-muted font-mono-num">
                {fmt(result.net)} × {vatRate / 100} = {fmt(result.vat)} VAT → {fmt(result.net)} + {fmt(result.vat)} = {fmt(result.gross)}
              </p>
            ) : (
              <p className="text-[11px] text-text-muted font-mono-num">
                {fmt(result.gross)} ÷ {1 + vatRate / 100} = {fmt(result.net)} net → {fmt(result.gross)} − {fmt(result.net)} = {fmt(result.vat)} VAT
              </p>
            )}
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="bg-surface rounded-[var(--radius-card)] px-4 py-3 space-y-2">
        <p className="text-[12px] text-text-muted leading-relaxed">
          <span className="font-medium text-text-secondary">Adding VAT:</span> Multiply the net price by the VAT rate (e.g. £100 × 20% = £20 VAT, total £120).
        </p>
        <p className="text-[12px] text-text-muted leading-relaxed">
          <span className="font-medium text-text-secondary">Removing VAT:</span> Divide the gross price by 1.{vatRate === 20 ? "20" : vatRate === 5 ? "05" : String(1 + vatRate / 100).slice(1)} to get the net price. Don&apos;t just subtract {vatRate}% — that gives the wrong answer!
        </p>
        <p className="text-[12px] text-text-muted leading-relaxed">
          <span className="font-medium text-text-secondary">UK VAT rates:</span> Most goods and services are 20%. Energy, child car seats and some home renovations are 5%. Food, children&apos;s clothes and books are 0%.
        </p>
      </div>
    </div>
  );
}
