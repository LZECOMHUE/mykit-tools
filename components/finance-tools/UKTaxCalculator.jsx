"use client";

import { useState, useMemo } from "react";
import { getTaxYear, CURRENT_TAX_YEAR, TAX_YEAR_ORDER, TAX_YEARS } from "@/data/tax-rates";
import { formatCurrency, formatPercentage } from "@/lib/format";
import Tooltip from "@/components/ui/Tooltip";

const STUDENT_LOAN_OPTIONS = [
  { value: "none", label: "None" },
  { value: "plan1", label: "Plan 1 (pre-Sept 2012)" },
  { value: "plan2", label: "Plan 2 (post-Sept 2012)" },
  { value: "plan4", label: "Plan 4 (Scotland)" },
  { value: "plan5", label: "Plan 5 (post-Sept 2023)" },
  { value: "postgrad", label: "Postgraduate" },
];

const PENSION_OPTIONS = [
  { value: "none", label: "None" },
  { value: "3", label: "3%" },
  { value: "5", label: "5%" },
  { value: "6", label: "6%" },
  { value: "8", label: "8%" },
  { value: "10", label: "10%" },
  { value: "custom", label: "Custom £" },
];

const AGE_OPTIONS = [
  { value: "under65", label: "Under 65" },
  { value: "65-74", label: "65–74" },
  { value: "75+", label: "75 or over" },
];

// --- Tooltips ---
const TIPS = {
  salary: "Your total salary before any deductions. This is the figure on your employment contract.",
  taxYear: "Select the tax year you want to calculate for. The UK tax year runs from 6 April to 5 April.",
  scotland: "Scotland has different income tax rates and bands. Tick this if you live in Scotland, even if you work elsewhere.",
  married: "If you're married or in a civil partnership and one of you earns less than the Personal Allowance, you may be able to transfer £1,260 of unused allowance to the other person — saving up to £252/year.",
  noNI: "Tick this if you don't pay National Insurance — e.g. you're over State Pension age, or you have a certificate of exemption.",
  studentLoan: "Your repayment plan depends on when and where you studied. Check your payslip or Student Loans Company letter if unsure.",
  age: "Your age affects National Insurance. You stop paying NI when you reach State Pension age (currently 66).",
  taxCode: "Your tax code tells your employer how much tax-free pay you get. The standard code is 1257L. Leave blank to use the default.",
  pension: "Salary sacrifice pension contributions are deducted before tax, reducing your taxable income and saving you tax.",
  blind: "You can claim Blind Person's Allowance (extra tax-free income) if you're registered blind or severely sight impaired.",
};

function Tip({ text }) {
  return (
    <Tooltip content={text}>
      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-border text-[9px] text-text-muted cursor-help leading-none ml-0.5">?</span>
    </Tooltip>
  );
}

function calculateTax(grossSalary, options, taxYear) {
  const rates = getTaxYear(taxYear);
  if (!rates || grossSalary <= 0) {
    return {
      grossSalary: 0, personalAllowance: 0, taxableIncome: 0,
      incomeTax: 0, ni: 0, studentLoan: 0, pension: 0,
      totalDeductions: 0, takeHome: 0, effectiveRate: 0,
      taxBands: [], monthlyTakeHome: 0, weeklyTakeHome: 0, dailyTakeHome: 0,
      employersNI: 0,
    };
  }

  // --- Personal Allowance ---
  let personalAllowance = rates.personalAllowance;

  // Custom tax code overrides PA
  if (options.taxCode && options.taxCode.trim()) {
    const code = options.taxCode.trim().toUpperCase();
    const numMatch = code.match(/^(\d+)/);
    if (numMatch) {
      personalAllowance = parseInt(numMatch[1], 10) * 10;
    }
    if (code === "BR") personalAllowance = 0;
    if (code === "D0") personalAllowance = 0;
    if (code === "D1") personalAllowance = 0;
    if (code === "NT") return {
      grossSalary, personalAllowance: grossSalary, taxableIncome: 0,
      incomeTax: 0, ni: 0, studentLoan: 0, pension: 0,
      totalDeductions: 0, takeHome: grossSalary, effectiveRate: 0,
      taxBands: [], monthlyTakeHome: grossSalary / 12,
      weeklyTakeHome: grossSalary / 52, dailyTakeHome: grossSalary / 365,
      employersNI: 0,
    };
  } else {
    // Taper PA above £100k (only if no custom tax code)
    if (grossSalary > rates.personalAllowanceTaperThreshold) {
      const excess = grossSalary - rates.personalAllowanceTaperThreshold;
      personalAllowance = Math.max(0, personalAllowance - Math.floor(excess / 2));
    }
  }

  // Marriage allowance: receive extra PA
  if (options.married) {
    personalAllowance += rates.marriageAllowance;
  }

  if (options.blindPersons) {
    personalAllowance += rates.blindPersonsAllowance;
  }

  // --- Pension ---
  let pension = 0;
  if (options.pensionType !== "none") {
    pension = options.pensionType === "custom"
      ? (Number(options.pensionCustom) || 0)
      : grossSalary * (Number(options.pensionType) / 100);
  }

  const taxableGross = Math.max(0, grossSalary - pension);

  // --- Income Tax ---
  // Bands are defined as widths: { from: 0, to: 37700 } means the band covers £37,700
  const bands = options.scottish ? rates.scottishIncomeTaxBands : rates.incomeTaxBands;
  const taxableIncome = Math.max(0, taxableGross - personalAllowance);
  let incomeTax = 0;
  const taxBands = [];

  let remaining = taxableIncome;
  for (const band of bands) {
    const bandWidth = band.to === Infinity ? Infinity : band.to - band.from;
    const taxableInBand = Math.min(remaining, bandWidth);
    if (taxableInBand > 0) {
      const taxForBand = taxableInBand * band.rate;
      incomeTax += taxForBand;
      taxBands.push({ name: band.name, rate: band.rate, taxable: taxableInBand, tax: taxForBand });
      remaining -= taxableInBand;
    }
    if (remaining <= 0) break;
  }

  // --- National Insurance ---
  let ni = 0;
  const isOverStatePension = options.age === "65-74" || options.age === "75+";
  if (!options.noNI && !isOverStatePension) {
    if (taxableGross > rates.ni.primaryThreshold) {
      const mainBand = Math.min(taxableGross, rates.ni.upperEarningsLimit) - rates.ni.primaryThreshold;
      ni += Math.max(0, mainBand) * rates.ni.mainRate;
      if (taxableGross > rates.ni.upperEarningsLimit) {
        ni += (taxableGross - rates.ni.upperEarningsLimit) * rates.ni.higherRate;
      }
    }
  }

  // --- Employer's NI (informational) ---
  let employersNI = 0;
  if (rates.employerNI && taxableGross > rates.employerNI.secondaryThreshold) {
    employersNI = (taxableGross - rates.employerNI.secondaryThreshold) * rates.employerNI.rate;
  }

  // --- Student Loan ---
  let studentLoan = 0;
  if (options.studentLoan !== "none") {
    const plan = rates.studentLoans[options.studentLoan];
    if (plan && taxableGross > plan.threshold) {
      studentLoan = (taxableGross - plan.threshold) * plan.rate;
    }
  }
  if (options.studentLoan2 && options.studentLoan2 !== "none") {
    const plan2 = rates.studentLoans[options.studentLoan2];
    if (plan2 && taxableGross > plan2.threshold) {
      studentLoan += (taxableGross - plan2.threshold) * plan2.rate;
    }
  }

  const totalDeductions = incomeTax + ni + studentLoan + pension;
  const takeHome = grossSalary - totalDeductions;
  const effectiveRate = grossSalary > 0 ? (totalDeductions / grossSalary) * 100 : 0;

  return {
    grossSalary, personalAllowance, taxableIncome, incomeTax, ni,
    studentLoan, pension, totalDeductions, takeHome, effectiveRate, taxBands,
    monthlyTakeHome: takeHome / 12, weeklyTakeHome: takeHome / 52, dailyTakeHome: takeHome / 365,
    employersNI,
  };
}

// --- Summary table ---
function SummaryTable({ result }) {
  const rows = [
    { label: "Gross Pay", y: result.grossSalary, cls: "font-semibold" },
    { label: "Tax Free Allowance", y: result.personalAllowance },
    { label: "Total Taxable", y: result.taxableIncome },
    { label: "Income Tax", y: result.incomeTax, deduction: true, highlight: "bg-red-50" },
    ...(result.studentLoan > 0 ? [{ label: "Student Loan", y: result.studentLoan, deduction: true }] : []),
    { label: "National Insurance", y: result.ni, deduction: true },
    ...(result.pension > 0 ? [{ label: "Pension", y: result.pension, deduction: true }] : []),
    { label: "Total Deductions", y: result.totalDeductions, deduction: true, cls: "font-semibold" },
    { label: "Take-Home Pay", y: result.takeHome, cls: "font-semibold", highlight: "bg-green-50" },
    { label: "Employer's NI", y: result.employersNI, deduction: false, cls: "text-text-muted italic" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Summary</th>
            <th className="text-right py-1.5 px-2 font-semibold text-text-primary w-14">%</th>
            <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Yearly</th>
            <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Monthly</th>
            <th className="text-right py-1.5 pl-2 font-semibold text-text-primary">Weekly</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const pct = result.grossSalary > 0 ? ((row.y / result.grossSalary) * 100) : 0;
            const isDeduction = row.deduction;
            return (
              <tr key={row.label} className={`border-b border-border/50 ${row.highlight || ""} ${row.cls || ""}`}>
                <td className={`py-1.5 pr-2 ${row.cls?.includes("text-text-muted") ? "text-text-muted" : "text-text-secondary"}`}>{row.label}</td>
                <td className={`py-1.5 px-2 text-right font-mono-num ${isDeduction ? "text-red-600" : ""}`}>
                  {isDeduction ? `-${pct.toFixed(0)}%` : `${pct.toFixed(0)}%`}
                </td>
                <td className={`py-1.5 px-2 text-right font-mono-num ${isDeduction ? "text-red-600" : ""}`}>
                  {isDeduction ? `-${formatCurrency(row.y)}` : formatCurrency(row.y)}
                </td>
                <td className={`py-1.5 px-2 text-right font-mono-num ${isDeduction ? "text-red-600" : ""}`}>
                  {isDeduction ? `-${formatCurrency(row.y / 12)}` : formatCurrency(row.y / 12)}
                </td>
                <td className={`py-1.5 pl-2 text-right font-mono-num ${isDeduction ? "text-red-600" : ""}`}>
                  {isDeduction ? `-${formatCurrency(row.y / 52)}` : formatCurrency(row.y / 52)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// --- Bar chart ---
function BreakdownBar({ items, total }) {
  const colors = ["bg-green-400", "bg-blue-400", "bg-amber-400", "bg-purple-400", "bg-rose-400"];
  return (
    <div className="space-y-1.5">
      <div className="flex rounded-full overflow-hidden h-3">
        {items.map((item, i) =>
          item.value > 0 ? (
            <div key={item.label} className={`${colors[i]} transition-all duration-500`} style={{ width: `${(item.value / total) * 100}%` }} title={`${item.label}: ${formatCurrency(item.value)}`} />
          ) : null
        )}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {items.map((item, i) =>
          item.value > 0 ? (
            <span key={item.label} className="flex items-center gap-1 text-[11px] text-text-muted">
              <span className={`w-2 h-2 rounded-full ${colors[i]}`} />{item.label} ({formatPercentage((item.value / total) * 100, 0)})
            </span>
          ) : null
        )}
      </div>
    </div>
  );
}

// --- Compact select with tooltip ---
function Field({ label, tip, children }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[13px] text-text-secondary whitespace-nowrap min-w-[100px] flex items-center">
        {label}{tip && <Tip text={tip} />}
      </label>
      {children}
    </div>
  );
}

export default function UKTaxCalculator() {
  const [salary, setSalary] = useState("");
  const [period, setPeriod] = useState("year");
  const [taxYear, setTaxYear] = useState(CURRENT_TAX_YEAR);
  const [scottish, setScottish] = useState(false);
  const [married, setMarried] = useState(false);
  const [noNI, setNoNI] = useState(false);
  const [studentLoan, setStudentLoan] = useState("none");
  const [studentLoan2, setStudentLoan2] = useState("none");
  const [age, setAge] = useState("under65");
  const [taxCode, setTaxCode] = useState("");
  const [pensionType, setPensionType] = useState("none");
  const [pensionCustom, setPensionCustom] = useState("");
  const [blindPersons, setBlindPersons] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const annualSalary = useMemo(() => {
    const val = Number(salary) || 0;
    switch (period) {
      case "month": return val * 12;
      case "week": return val * 52;
      case "day": return val * 365;
      case "hour": return val * 37.5 * 52;
      default: return val;
    }
  }, [salary, period]);

  const result = useMemo(
    () => calculateTax(annualSalary, { scottish, married, noNI, studentLoan, studentLoan2, age, taxCode, pensionType, pensionCustom, blindPersons }, taxYear),
    [annualSalary, scottish, married, noNI, studentLoan, studentLoan2, age, taxCode, pensionType, pensionCustom, blindPersons, taxYear]
  );

  const hasResult = annualSalary > 0;
  const selectedYearLabel = TAX_YEARS[taxYear]?.label || taxYear;

  const inputSelect = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 items-start">
      {/* LEFT: Inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-2.5">
        {/* Tax year selector */}
        <Field label="Tax year" tip={TIPS.taxYear}>
          <select value={taxYear} onChange={(e) => setTaxYear(e.target.value)} className={inputSelect}>
            {TAX_YEAR_ORDER.map((yr) => (
              <option key={yr} value={yr}>{TAX_YEARS[yr].label}</option>
            ))}
          </select>
        </Field>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="flex items-center text-[13px] font-medium text-text-primary mb-1">
            Gross salary<Tip text={TIPS.salary} />
          </label>
          <div className="flex gap-1.5">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">£</span>
              <input
                id="salary" type="number" value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. 35000"
                className="w-full pl-6 pr-2 py-2 text-sm rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono-num"
              />
            </div>
            <select value={period} onChange={(e) => setPeriod(e.target.value)}
              className="px-2 py-2 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer">
              <option value="year">/ year</option>
              <option value="month">/ month</option>
              <option value="week">/ week</option>
              <option value="day">/ day</option>
              <option value="hour">/ hour</option>
            </select>
          </div>
          {period !== "year" && annualSalary > 0 && (
            <p className="text-[11px] text-text-muted mt-0.5">= {formatCurrency(annualSalary)}/year</p>
          )}
        </div>

        {/* Checkboxes row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 py-1">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={scottish} onChange={(e) => setScottish(e.target.checked)} className="w-3.5 h-3.5 accent-accent cursor-pointer" />
            <span className="text-[13px] text-text-primary">Scotland</span>
            <Tip text={TIPS.scotland} />
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={married} onChange={(e) => setMarried(e.target.checked)} className="w-3.5 h-3.5 accent-accent cursor-pointer" />
            <span className="text-[13px] text-text-primary">Married</span>
            <Tip text={TIPS.married} />
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={noNI} onChange={(e) => setNoNI(e.target.checked)} className="w-3.5 h-3.5 accent-accent cursor-pointer" />
            <span className="text-[13px] text-text-primary">No NI</span>
            <Tip text={TIPS.noNI} />
          </label>
        </div>

        {/* Student loan */}
        <Field label="Student loan" tip={TIPS.studentLoan}>
          <select value={studentLoan} onChange={(e) => setStudentLoan(e.target.value)} className={inputSelect}>
            {STUDENT_LOAN_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </Field>

        {/* Age */}
        <Field label="Age" tip={TIPS.age}>
          <select value={age} onChange={(e) => setAge(e.target.value)} className={inputSelect}>
            {AGE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </Field>

        {/* Pension */}
        <Field label="Pension" tip={TIPS.pension}>
          <select value={pensionType} onChange={(e) => setPensionType(e.target.value)} className={inputSelect}>
            {PENSION_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </Field>

        {pensionType === "custom" && (
          <div className="ml-[108px]">
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">£</span>
              <input type="number" value={pensionCustom} onChange={(e) => setPensionCustom(e.target.value)}
                placeholder="Annual amount"
                className="w-full pl-6 pr-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent font-mono-num" />
            </div>
          </div>
        )}

        {/* Advanced toggle */}
        <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-[12px] text-accent hover:text-accent-hover transition-colors cursor-pointer">
          {showAdvanced ? "- Hide" : "+ More"} options
        </button>

        {showAdvanced && (
          <div className="space-y-2.5 pt-2 border-t border-border">
            <Field label="Tax code" tip={TIPS.taxCode}>
              <input type="text" value={taxCode} onChange={(e) => setTaxCode(e.target.value)}
                placeholder="e.g. 1257L"
                className="flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent font-mono-num uppercase" />
            </Field>
            <Field label="2nd student loan" tip={TIPS.studentLoan}>
              <select value={studentLoan2} onChange={(e) => setStudentLoan2(e.target.value)} className={inputSelect}>
                {STUDENT_LOAN_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </Field>
            <label className="flex items-center gap-1.5 cursor-pointer ml-[108px]">
              <input type="checkbox" checked={blindPersons} onChange={(e) => setBlindPersons(e.target.checked)} className="w-3.5 h-3.5 accent-accent cursor-pointer" />
              <span className="text-[13px] text-text-primary">Blind Person&apos;s Allowance</span>
              <Tip text={TIPS.blind} />
            </label>
          </div>
        )}

        <p className="text-[10px] text-text-muted pt-1 border-t border-border">
          {selectedYearLabel} tax year. Figures are estimates — actual PAYE may differ slightly due to monthly rounding.
        </p>
      </div>

      {/* RIGHT: Results */}
      <div className="space-y-3">
        {/* Take-home hero */}
        <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-text-secondary">Annual take-home</p>
            <p className="text-2xl sm:text-3xl font-bold font-mono-num text-accent leading-tight">
              {hasResult ? formatCurrency(result.takeHome) : "£0.00"}
            </p>
          </div>
          {hasResult && (
            <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
              <p>{formatCurrency(result.monthlyTakeHome)}/mo</p>
              <p>{formatCurrency(result.weeklyTakeHome)}/wk</p>
              <p>{formatCurrency(result.dailyTakeHome)}/day</p>
            </div>
          )}
        </div>

        {/* Breakdown bar */}
        {hasResult && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <BreakdownBar
              total={result.grossSalary}
              items={[
                { label: "Take home", value: result.takeHome },
                { label: "Income tax", value: result.incomeTax },
                { label: "NI", value: result.ni },
                { label: "Student loan", value: result.studentLoan },
                { label: "Pension", value: result.pension },
              ]}
            />
          </div>
        )}

        {/* Summary table */}
        {hasResult && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <SummaryTable result={result} />
          </div>
        )}

        {/* Tax band detail */}
        {hasResult && result.taxBands.length > 0 && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-1.5 font-semibold text-text-primary">
                    {scottish ? "Scottish " : ""}Income Tax Bands
                  </th>
                  <th className="text-right py-1.5 font-semibold text-text-primary w-14">Rate</th>
                  <th className="text-right py-1.5 font-semibold text-text-primary">Taxable</th>
                  <th className="text-right py-1.5 pl-2 font-semibold text-text-primary">Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.taxBands.map((band) => (
                  <tr key={band.name} className="border-b border-border/50">
                    <td className="py-1 text-text-secondary">{band.name}</td>
                    <td className="py-1 text-right font-mono-num">{(band.rate * 100).toFixed(0)}%</td>
                    <td className="py-1 text-right font-mono-num">{formatCurrency(band.taxable)}</td>
                    <td className="py-1 pl-2 text-right font-mono-num text-red-600">-{formatCurrency(band.tax)}</td>
                  </tr>
                ))}
                <tr className="border-t border-border font-semibold">
                  <td className="py-1.5 text-text-primary" colSpan={3}>Total income tax</td>
                  <td className="py-1.5 pl-2 text-right font-mono-num text-red-600">-{formatCurrency(result.incomeTax)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Effective rate callout */}
        {hasResult && (
          <div className="bg-surface rounded-[var(--radius-card)] px-4 py-2.5 flex items-center justify-between">
            <span className="text-[13px] text-text-secondary">Effective tax rate</span>
            <span className="text-[15px] font-semibold font-mono-num text-text-primary">{formatPercentage(result.effectiveRate)}</span>
          </div>
        )}

        {/* Empty state */}
        {!hasResult && (
          <div className="bg-surface border border-border rounded-[var(--radius-card)] px-4 py-8 text-center text-text-muted text-sm">
            Enter your salary to see your take-home pay breakdown
          </div>
        )}
      </div>
    </div>
  );
}
