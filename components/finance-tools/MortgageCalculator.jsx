"use client";

import { useState, useMemo } from "react";
import { formatCurrency, formatPercentage } from "@/lib/format";
import Tooltip from "@/components/ui/Tooltip";

const TIPS = {
  propertyPrice: "The full purchase price of the property, including any renovations you plan to add.",
  depositPercentage: "The percentage of the property price you're putting down. Typical range: 5%-25%. Higher deposit = lower monthly payments and better mortgage rates.",
  depositAmount: "The fixed amount you're putting down. This will be converted to a percentage for the calculation.",
  mortgageTerm: "How long you'll take to repay the mortgage. Typical: 25 years. Shorter terms = higher payments but less interest paid. Longer terms = lower payments but more interest.",
  interestRate: "The annual percentage rate (APR). Current typical rates: 4-6%. Check MoneySupermarket or your lender's website for current rates.",
  repaymentType: "Repayment: you pay down the loan + interest each month. Interest only: you only pay interest, principal is repaid at the end (typically when you sell).",
};

function Tip({ text }) {
  return (
    <Tooltip content={text}>
      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-border text-[9px] text-text-muted cursor-help leading-none ml-0.5">?</span>
    </Tooltip>
  );
}

function calculateMortgage(propertyPrice, depositAmount, term, rate, repaymentType) {
  if (!propertyPrice || propertyPrice <= 0 || !depositAmount || depositAmount < 0 || !term || term <= 0 || !rate || rate < 0) {
    return null;
  }

  const loan = propertyPrice - depositAmount;
  if (loan < 0) {
    return null; // deposit exceeds property price
  }

  const monthlyRate = rate / 100 / 12;
  const totalMonths = term * 12;

  let monthlyPayment = 0;

  if (repaymentType === "repayment") {
    // M = P[r(1+r)^n]/[(1+r)^n-1]
    if (monthlyRate === 0) {
      monthlyPayment = loan / totalMonths;
    } else {
      const numerator = loan * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
      const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
      monthlyPayment = numerator / denominator;
    }
  } else {
    // Interest only: M = P × r
    monthlyPayment = loan * monthlyRate;
  }

  const totalRepaid = monthlyPayment * totalMonths;
  const totalInterest = repaymentType === "repayment"
    ? totalRepaid - loan
    : totalRepaid; // for interest-only, all payments are interest

  const ltv = (loan / propertyPrice) * 100;

  return {
    propertyPrice,
    depositAmount,
    depositPercentage: (depositAmount / propertyPrice) * 100,
    loan,
    monthlyPayment,
    totalRepaid,
    totalInterest,
    ltv,
    term,
    rate,
    repaymentType,
  };
}

function ResultCard({ children }) {
  return (
    <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
      {children}
    </div>
  );
}

function SummaryRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between text-[13px] py-1.5 border-b border-border/50 last:border-b-0">
      <span className={highlight ? "text-text-primary font-medium" : "text-text-secondary"}>{label}</span>
      <span className={`font-mono-num font-semibold ${highlight ? "text-red-600" : "text-text-primary"}`}>{value}</span>
    </div>
  );
}

function ComparisonTable({ baseRate, loan, term, repaymentType }) {
  const rates = [
    baseRate - 1,
    baseRate - 0.5,
    baseRate,
    baseRate + 0.5,
    baseRate + 1,
  ];

  const rows = rates.map((r) => {
    const calc = calculateMortgage(
      loan + loan > 0 ? 1 : 0, // dummy property price
      0,
      term,
      r,
      repaymentType
    );
    if (!calc) return null;

    // Recalculate with the correct property price
    const fullCalc = calculateMortgage(loan / (1 - (0.5) / 100), loan / (1 - (0.5) / 100) * 0.5, term, r, repaymentType);

    // Simplified: just compute payment for this rate
    const monthlyRate = r / 100 / 12;
    const totalMonths = term * 12;
    let monthlyPayment = 0;
    if (repaymentType === "repayment") {
      if (monthlyRate === 0) {
        monthlyPayment = loan / totalMonths;
      } else {
        monthlyPayment = (loan * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      }
    } else {
      monthlyPayment = loan * monthlyRate;
    }

    const totalRepaid = monthlyPayment * totalMonths;
    const totalInterest = repaymentType === "repayment" ? totalRepaid - loan : totalRepaid;

    return {
      rate: r,
      monthlyPayment,
      totalInterest,
    };
  });

  return (
    <table className="w-full text-[12px]">
      <thead>
        <tr className="border-b-2 border-border">
          <th className="text-left py-1.5 font-semibold text-text-primary">Rate</th>
          <th className="text-right py-1.5 font-semibold text-text-primary">Monthly</th>
          <th className="text-right py-1.5 font-semibold text-text-primary">Total Interest</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className={`border-b border-border/50 ${row.rate === baseRate ? "bg-accent/5 font-semibold" : ""}`}>
            <td className="py-1.5 text-text-secondary">{row.rate.toFixed(2)}%</td>
            <td className="py-1.5 text-right font-mono-num">{formatCurrency(row.monthlyPayment)}</td>
            <td className="py-1.5 text-right font-mono-num">{formatCurrency(row.totalInterest)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState("");
  const [depositMode, setDepositMode] = useState("percentage"); // "percentage" or "amount"
  const [depositPercentage, setDepositPercentage] = useState(10);
  const [depositAmount, setDepositAmount] = useState("");
  const [term, setTerm] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [repaymentType, setRepaymentType] = useState("repayment");

  // Calculate actual deposit amount based on mode
  const effectiveDepositAmount = useMemo(() => {
    const price = Number(propertyPrice) || 0;
    if (depositMode === "percentage") {
      return (price * depositPercentage) / 100;
    } else {
      return Number(depositAmount) || 0;
    }
  }, [propertyPrice, depositMode, depositPercentage, depositAmount]);

  // Calculate effective deposit percentage
  const effectiveDepositPercentage = useMemo(() => {
    const price = Number(propertyPrice) || 0;
    if (price > 0) {
      return (effectiveDepositAmount / price) * 100;
    }
    return 0;
  }, [propertyPrice, effectiveDepositAmount]);

  // Main mortgage calculation
  const result = useMemo(() => {
    return calculateMortgage(Number(propertyPrice) || 0, effectiveDepositAmount, Number(term) || 0, Number(rate) || 0, repaymentType);
  }, [propertyPrice, effectiveDepositAmount, term, rate, repaymentType]);

  const hasResult = result !== null;

  const inputSelect = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";
  const inputText = "w-full px-2.5 py-2 text-sm rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono-num";

  // Calculate required income for affordability
  const requiredIncome = hasResult ? result.monthlyPayment * 12 / 4.5 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 items-start">
      {/* LEFT: Inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-2.5">
        {/* Property Price */}
        <div>
          <label htmlFor="propertyPrice" className="flex items-center text-[13px] font-medium text-text-primary mb-1">
            Property price
            <Tip text={TIPS.propertyPrice} />
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">£</span>
            <input
              id="propertyPrice"
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
              placeholder="e.g. 250000"
              className={`${inputText} pl-6`}
            />
          </div>
        </div>

        {/* Deposit: toggle between percentage and amount */}
        {propertyPrice && (
          <div>
            <label className="flex items-center text-[13px] font-medium text-text-primary mb-1">
              Deposit
              <Tip text={depositMode === "percentage" ? TIPS.depositPercentage : TIPS.depositAmount} />
            </label>
            <div className="flex gap-1.5 items-center">
              {depositMode === "percentage" ? (
                <>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={depositPercentage}
                    onChange={(e) => setDepositPercentage(Number(e.target.value))}
                    className="flex-1 h-2 bg-border rounded-full cursor-pointer accent-accent"
                  />
                  <span className="text-sm font-mono-num text-text-primary w-10 text-right">{depositPercentage}%</span>
                </>
              ) : (
                <>
                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">£</span>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Amount"
                      className={`${inputText} pl-6`}
                    />
                  </div>
                </>
              )}
              <div className="flex gap-0.5 bg-surface p-0.5 rounded-[var(--radius-input)] border border-border">
                <button
                  onClick={() => setDepositMode("percentage")}
                  className={`px-1.5 py-1 text-[12px] font-medium rounded-[var(--radius-input)] transition-colors ${
                    depositMode === "percentage"
                      ? "bg-accent text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  %
                </button>
                <button
                  onClick={() => setDepositMode("amount")}
                  className={`px-1.5 py-1 text-[12px] font-medium rounded-[var(--radius-input)] transition-colors ${
                    depositMode === "amount"
                      ? "bg-accent text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  £
                </button>
              </div>
            </div>
            {hasResult && (
              <p className="text-[11px] text-text-muted mt-1">
                {formatCurrency(result.depositAmount)} deposit • {formatCurrency(result.loan)} to borrow
              </p>
            )}
          </div>
        )}

        {/* Mortgage Term */}
        <div>
          <label htmlFor="term" className="flex items-center text-[13px] font-medium text-text-primary mb-1">
            Mortgage term
            <Tip text={TIPS.mortgageTerm} />
          </label>
          <div className="flex gap-1.5">
            <input
              id="term"
              type="number"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              min="5"
              max="40"
              className={`${inputText} flex-1`}
            />
            <span className="text-sm text-text-secondary pt-2 whitespace-nowrap">years</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label htmlFor="rate" className="flex items-center text-[13px] font-medium text-text-primary mb-1">
            Interest rate
            <Tip text={TIPS.interestRate} />
          </label>
          <div className="flex gap-1.5">
            <input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              step="0.01"
              min="0"
              max="10"
              className={`${inputText} flex-1`}
            />
            <span className="text-sm text-text-secondary pt-2 whitespace-nowrap">%</span>
          </div>
          <p className="text-[11px] text-text-muted mt-0.5">
            Check current rates on <a href="https://www.moneysupermarket.com/mortgages/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">MoneySupermarket</a>
          </p>
        </div>

        {/* Repayment Type */}
        <div>
          <label className="flex items-center text-[13px] font-medium text-text-primary mb-2">
            Repayment type
            <Tip text={TIPS.repaymentType} />
          </label>
          <div className="flex gap-1.5 bg-surface p-0.5 rounded-[var(--radius-input)] border border-border">
            <button
              onClick={() => setRepaymentType("repayment")}
              className={`flex-1 px-2 py-1.5 text-[12px] font-medium rounded-[var(--radius-input)] transition-colors ${
                repaymentType === "repayment"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Repayment
            </button>
            <button
              onClick={() => setRepaymentType("interest-only")}
              className={`flex-1 px-2 py-1.5 text-[12px] font-medium rounded-[var(--radius-input)] transition-colors ${
                repaymentType === "interest-only"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Interest Only
            </button>
          </div>
        </div>

        <p className="text-[10px] text-text-muted pt-1 border-t border-border">
          All figures are estimates. Your actual mortgage payment may vary depending on fees, insurance, and other factors. Consult with your lender for an accurate quote.
        </p>
      </div>

      {/* RIGHT: Results */}
      <div className="space-y-3">
        {/* Monthly payment hero */}
        {hasResult ? (
          <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] text-text-secondary">Monthly payment</p>
              <p className="text-2xl sm:text-3xl font-bold font-mono-num text-accent leading-tight">
                {formatCurrency(result.monthlyPayment)}
              </p>
            </div>
            <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
              <p>Total repaid</p>
              <p className="text-sm font-semibold">{formatCurrency(result.totalRepaid)}</p>
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-[var(--radius-card)] px-4 py-8 text-center text-text-muted text-sm">
            Enter property price and deposit to calculate your mortgage
          </div>
        )}

        {/* Summary */}
        {hasResult && (
          <ResultCard>
            <SummaryRow label="Property price" value={formatCurrency(result.propertyPrice)} />
            <SummaryRow
              label="Deposit"
              value={`${formatCurrency(result.depositAmount)} (${formatPercentage(result.depositPercentage, 1)})`}
            />
            <SummaryRow label="Loan amount" value={formatCurrency(result.loan)} />
            <SummaryRow label="Mortgage term" value={`${result.term} years`} />
            <SummaryRow label="Interest rate" value={`${result.rate.toFixed(2)}%`} />
            <SummaryRow label="Monthly payment" value={formatCurrency(result.monthlyPayment)} />
            <SummaryRow label="Total repaid" value={formatCurrency(result.totalRepaid)} />
            <SummaryRow label="Total interest paid" value={formatCurrency(result.totalInterest)} highlight={true} />
            <SummaryRow label="Loan-to-value (LTV)" value={`${formatPercentage(result.ltv, 1)}`} />
          </ResultCard>
        )}

        {/* Interest rate sensitivity */}
        {hasResult && (
          <ResultCard>
            <p className="text-[12px] font-medium text-text-primary mb-2">Interest rate sensitivity</p>
            <ComparisonTable baseRate={result.rate} loan={result.loan} term={result.term} repaymentType={result.repaymentType} />
            <p className="text-[10px] text-text-muted mt-2">Shows how monthly payment and total interest change with different rates</p>
          </ResultCard>
        )}

        {/* Affordability */}
        {hasResult && (
          <ResultCard>
            <p className="text-[13px] text-text-secondary">
              <span className="font-medium text-text-primary">Affordability note:</span> Lenders typically allow up to 4.5× your annual salary.
              For a {formatCurrency(result.loan)} loan, you'd typically need a household income of around{" "}
              <span className="font-semibold font-mono-num text-accent">{formatCurrency(requiredIncome)}</span>/year.
            </p>
          </ResultCard>
        )}
      </div>
    </div>
  );
}
