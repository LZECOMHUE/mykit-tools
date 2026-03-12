// UK HMRC Tax Rates — multiple years
// Source: gov.uk
// Last reviewed: March 2026
// UPDATE EVERY APRIL when new rates are announced

export const TAX_YEARS = {
  "2025/26": {
    label: "2025/26 (current)",
    personalAllowance: 12570,
    personalAllowanceTaperThreshold: 100000,
    incomeTaxBands: [
      { name: "Basic rate", rate: 0.20, from: 0, to: 37700 },
      { name: "Higher rate", rate: 0.40, from: 37700, to: 125140 },
      { name: "Additional rate", rate: 0.45, from: 125140, to: Infinity },
    ],
    scottishIncomeTaxBands: [
      { name: "Starter rate", rate: 0.19, from: 0, to: 2351 },
      { name: "Basic rate", rate: 0.20, from: 2351, to: 13991 },
      { name: "Intermediate rate", rate: 0.21, from: 13991, to: 31092 },
      { name: "Higher rate", rate: 0.42, from: 31092, to: 62430 },
      { name: "Advanced rate", rate: 0.45, from: 62430, to: 112570 },
      { name: "Top rate", rate: 0.48, from: 112570, to: Infinity },
    ],
    ni: { primaryThreshold: 12570, upperEarningsLimit: 50270, mainRate: 0.08, higherRate: 0.02 },
    employerNI: { secondaryThreshold: 5000, rate: 0.15 },
    studentLoans: {
      plan1: { threshold: 24990, rate: 0.09 },
      plan2: { threshold: 27295, rate: 0.09 },
      plan4: { threshold: 31395, rate: 0.09 },
      plan5: { threshold: 25000, rate: 0.09 },
      postgrad: { threshold: 21000, rate: 0.06 },
    },
    blindPersonsAllowance: 3070,
    marriageAllowance: 1260,
  },

  "2024/25": {
    label: "2024/25",
    personalAllowance: 12570,
    personalAllowanceTaperThreshold: 100000,
    incomeTaxBands: [
      { name: "Basic rate", rate: 0.20, from: 0, to: 37700 },
      { name: "Higher rate", rate: 0.40, from: 37700, to: 125140 },
      { name: "Additional rate", rate: 0.45, from: 125140, to: Infinity },
    ],
    scottishIncomeTaxBands: [
      { name: "Starter rate", rate: 0.19, from: 0, to: 2306 },
      { name: "Basic rate", rate: 0.20, from: 2306, to: 13991 },
      { name: "Intermediate rate", rate: 0.21, from: 13991, to: 31092 },
      { name: "Higher rate", rate: 0.42, from: 31092, to: 62430 },
      { name: "Advanced rate", rate: 0.45, from: 62430, to: 112570 },
      { name: "Top rate", rate: 0.48, from: 112570, to: Infinity },
    ],
    ni: { primaryThreshold: 12570, upperEarningsLimit: 50270, mainRate: 0.08, higherRate: 0.02 },
    employerNI: { secondaryThreshold: 9100, rate: 0.138 },
    studentLoans: {
      plan1: { threshold: 22015, rate: 0.09 },
      plan2: { threshold: 27295, rate: 0.09 },
      plan4: { threshold: 27660, rate: 0.09 },
      plan5: { threshold: 25000, rate: 0.09 },
      postgrad: { threshold: 21000, rate: 0.06 },
    },
    blindPersonsAllowance: 2870,
    marriageAllowance: 1260,
  },

  "2023/24": {
    label: "2023/24",
    personalAllowance: 12570,
    personalAllowanceTaperThreshold: 100000,
    incomeTaxBands: [
      { name: "Basic rate", rate: 0.20, from: 0, to: 37700 },
      { name: "Higher rate", rate: 0.40, from: 37700, to: 125140 },
      { name: "Additional rate", rate: 0.45, from: 125140, to: Infinity },
    ],
    scottishIncomeTaxBands: [
      { name: "Starter rate", rate: 0.19, from: 0, to: 2162 },
      { name: "Basic rate", rate: 0.20, from: 2162, to: 13118 },
      { name: "Intermediate rate", rate: 0.21, from: 13118, to: 31092 },
      { name: "Higher rate", rate: 0.42, from: 31092, to: 112570 },
      { name: "Top rate", rate: 0.47, from: 112570, to: Infinity },
    ],
    ni: { primaryThreshold: 12570, upperEarningsLimit: 50270, mainRate: 0.12, higherRate: 0.02 },
    employerNI: { secondaryThreshold: 9100, rate: 0.138 },
    studentLoans: {
      plan1: { threshold: 22015, rate: 0.09 },
      plan2: { threshold: 27295, rate: 0.09 },
      plan4: { threshold: 27660, rate: 0.09 },
      plan5: { threshold: 25000, rate: 0.09 },
      postgrad: { threshold: 21000, rate: 0.06 },
    },
    blindPersonsAllowance: 2870,
    marriageAllowance: 1260,
  },

  "2022/23": {
    label: "2022/23",
    personalAllowance: 12570,
    personalAllowanceTaperThreshold: 100000,
    incomeTaxBands: [
      { name: "Basic rate", rate: 0.20, from: 0, to: 37700 },
      { name: "Higher rate", rate: 0.40, from: 37700, to: 112570 },
      { name: "Additional rate", rate: 0.45, from: 112570, to: Infinity },
    ],
    scottishIncomeTaxBands: [
      { name: "Starter rate", rate: 0.19, from: 0, to: 2162 },
      { name: "Basic rate", rate: 0.20, from: 2162, to: 13118 },
      { name: "Intermediate rate", rate: 0.21, from: 13118, to: 31092 },
      { name: "Higher rate", rate: 0.41, from: 31092, to: 112570 },
      { name: "Top rate", rate: 0.46, from: 112570, to: Infinity },
    ],
    // NI changed mid-year: 13.25% Apr-Oct, 12% Nov-Mar. Using blended approx.
    ni: { primaryThreshold: 12570, upperEarningsLimit: 50270, mainRate: 0.1325, higherRate: 0.0325 },
    employerNI: { secondaryThreshold: 9100, rate: 0.1505 },
    studentLoans: {
      plan1: { threshold: 20195, rate: 0.09 },
      plan2: { threshold: 27295, rate: 0.09 },
      plan4: { threshold: 27660, rate: 0.09 },
      plan5: { threshold: 25000, rate: 0.09 },
      postgrad: { threshold: 21000, rate: 0.06 },
    },
    blindPersonsAllowance: 2600,
    marriageAllowance: 1260,
  },

  "2021/22": {
    label: "2021/22",
    personalAllowance: 12570,
    personalAllowanceTaperThreshold: 100000,
    incomeTaxBands: [
      { name: "Basic rate", rate: 0.20, from: 0, to: 37700 },
      { name: "Higher rate", rate: 0.40, from: 37700, to: 112570 },
      { name: "Additional rate", rate: 0.45, from: 112570, to: Infinity },
    ],
    scottishIncomeTaxBands: [
      { name: "Starter rate", rate: 0.19, from: 0, to: 2097 },
      { name: "Basic rate", rate: 0.20, from: 2097, to: 12726 },
      { name: "Intermediate rate", rate: 0.21, from: 12726, to: 31092 },
      { name: "Higher rate", rate: 0.41, from: 31092, to: 112570 },
      { name: "Top rate", rate: 0.46, from: 112570, to: Infinity },
    ],
    ni: { primaryThreshold: 9568, upperEarningsLimit: 50270, mainRate: 0.12, higherRate: 0.02 },
    employerNI: { secondaryThreshold: 8840, rate: 0.138 },
    studentLoans: {
      plan1: { threshold: 19895, rate: 0.09 },
      plan2: { threshold: 27295, rate: 0.09 },
      plan4: { threshold: 25000, rate: 0.09 },
      plan5: { threshold: 25000, rate: 0.09 },
      postgrad: { threshold: 21000, rate: 0.06 },
    },
    blindPersonsAllowance: 2520,
    marriageAllowance: 1260,
  },

  "2020/21": {
    label: "2020/21",
    personalAllowance: 12500,
    personalAllowanceTaperThreshold: 100000,
    incomeTaxBands: [
      { name: "Basic rate", rate: 0.20, from: 0, to: 37500 },
      { name: "Higher rate", rate: 0.40, from: 37500, to: 112500 },
      { name: "Additional rate", rate: 0.45, from: 112500, to: Infinity },
    ],
    scottishIncomeTaxBands: [
      { name: "Starter rate", rate: 0.19, from: 0, to: 2085 },
      { name: "Basic rate", rate: 0.20, from: 2085, to: 12658 },
      { name: "Intermediate rate", rate: 0.21, from: 12658, to: 30930 },
      { name: "Higher rate", rate: 0.41, from: 30930, to: 112500 },
      { name: "Top rate", rate: 0.46, from: 112500, to: Infinity },
    ],
    ni: { primaryThreshold: 9500, upperEarningsLimit: 50000, mainRate: 0.12, higherRate: 0.02 },
    employerNI: { secondaryThreshold: 8788, rate: 0.138 },
    studentLoans: {
      plan1: { threshold: 19390, rate: 0.09 },
      plan2: { threshold: 26575, rate: 0.09 },
      plan4: { threshold: 25000, rate: 0.09 },
      plan5: { threshold: 25000, rate: 0.09 },
      postgrad: { threshold: 21000, rate: 0.06 },
    },
    blindPersonsAllowance: 2500,
    marriageAllowance: 1250,
  },
};

export const TAX_YEAR_ORDER = ["2025/26", "2024/25", "2023/24", "2022/23", "2021/22", "2020/21"];
export const CURRENT_TAX_YEAR = "2025/26";

export function getTaxYear(year = CURRENT_TAX_YEAR) {
  return TAX_YEARS[year];
}

// ── Dividend Tax Rates (2025/26) ──────────────────────────
// Source: gov.uk — tax on dividends
export const DIVIDEND_TAX = {
  "2025/26": {
    allowance: 500,
    rates: { basic: 0.0875, higher: 0.3375, additional: 0.3935 },
  },
  "2024/25": {
    allowance: 500,
    rates: { basic: 0.0875, higher: 0.3375, additional: 0.3935 },
  },
  "2023/24": {
    allowance: 1000,
    rates: { basic: 0.0875, higher: 0.3375, additional: 0.3935 },
  },
};

// ── Capital Gains Tax (2025/26) ───────────────────────────
// Source: gov.uk — capital gains tax rates
export const CGT_RATES = {
  "2025/26": {
    annualExemptAmount: 3000,
    basicRate: 0.18,
    higherRate: 0.24,
    residentialBasicRate: 0.18,
    residentialHigherRate: 0.24,
    businessAssetsReliefRate: 0.14, // formerly Entrepreneurs' Relief — rising to 14% from Apr 2025
    businessAssetsReliefLifetimeLimit: 1000000,
    investorsReliefRate: 0.14,
    investorsReliefLifetimeLimit: 1000000,
  },
  "2024/25": {
    annualExemptAmount: 3000,
    basicRate: 0.10,
    higherRate: 0.20,
    residentialBasicRate: 0.18,
    residentialHigherRate: 0.24,
    businessAssetsReliefRate: 0.10,
    businessAssetsReliefLifetimeLimit: 1000000,
    investorsReliefRate: 0.10,
    investorsReliefLifetimeLimit: 10000000,
  },
  "2023/24": {
    annualExemptAmount: 6000,
    basicRate: 0.10,
    higherRate: 0.20,
    residentialBasicRate: 0.18,
    residentialHigherRate: 0.28,
    businessAssetsReliefRate: 0.10,
    businessAssetsReliefLifetimeLimit: 1000000,
    investorsReliefRate: 0.10,
    investorsReliefLifetimeLimit: 10000000,
  },
};

// ── Inheritance Tax (2025/26) ─────────────────────────────
// Source: gov.uk — inheritance tax thresholds
export const IHT_RATES = {
  standardRate: 0.40,
  nilRateBand: 325000,
  residenceNilRateBand: 175000, // for main residence passed to direct descendants
  taperThreshold: 2000000, // RNRB tapers for estates over £2m
  taperRate: 0.50, // £1 lost per £2 over threshold
  charityRate: 0.36, // reduced rate if 10%+ left to charity
  charityThreshold: 0.10,
  // Potentially Exempt Transfers (PETs) taper relief
  petTaperYears: [
    { yearsBeforeDeath: 3, taperPercent: 0 },   // 0-3 years: full 40%
    { yearsBeforeDeath: 4, taperPercent: 20 },   // 3-4 years: 32%
    { yearsBeforeDeath: 5, taperPercent: 40 },   // 4-5 years: 24%
    { yearsBeforeDeath: 6, taperPercent: 60 },   // 5-6 years: 16%
    { yearsBeforeDeath: 7, taperPercent: 80 },   // 6-7 years: 8%
  ],
  annualExemption: 3000, // per year
  smallGiftsExemption: 250, // per person
  weddingGifts: { parent: 5000, grandparent: 2500, other: 1000 },
};

// ── Pension Annual Allowance (2025/26) ────────────────────
// Source: gov.uk — pension tax relief
export const PENSION_LIMITS = {
  "2025/26": {
    annualAllowance: 60000,
    moneyPurchaseAnnualAllowance: 10000, // if already accessed pension
    taperThresholdIncome: 260000,
    taperAdjustedIncome: 260000,
    minimumTaperedAllowance: 10000,
    statePensionFull: 11502.40, // per year (£221.20/week)
    autoEnrolmentMinEmployee: 0.05,
    autoEnrolmentMinEmployer: 0.03,
    autoEnrolmentMinTotal: 0.08,
  },
  "2024/25": {
    annualAllowance: 60000,
    moneyPurchaseAnnualAllowance: 10000,
    taperThresholdIncome: 260000,
    taperAdjustedIncome: 260000,
    minimumTaperedAllowance: 10000,
    statePensionFull: 11502.40,
    autoEnrolmentMinEmployee: 0.05,
    autoEnrolmentMinEmployer: 0.03,
    autoEnrolmentMinTotal: 0.08,
  },
};

// ── Self-Assessment / Self-Employment NI (2025/26) ────────
// Source: gov.uk — self-employed NI rates
export const SELF_EMPLOYMENT_NI = {
  "2025/26": {
    class2: { weeklyRate: 3.45, smallProfitsThreshold: 6725 },
    class4: { lowerProfitsLimit: 12570, upperProfitsLimit: 50270, mainRate: 0.06, higherRate: 0.02 },
  },
  "2024/25": {
    class2: { weeklyRate: 3.45, smallProfitsThreshold: 6725 },
    class4: { lowerProfitsLimit: 12570, upperProfitsLimit: 50270, mainRate: 0.06, higherRate: 0.02 },
  },
};

// ── Buy-to-Let SDLT Surcharge (2025/26) ──────────────────
// Source: gov.uk — stamp duty additional properties
export const BTL_SDLT = {
  surcharge: 0.05, // 5% surcharge on additional properties from Oct 2024
  bands: [
    { from: 0, to: 125000, rate: 0.05 },       // 0% + 5% surcharge
    { from: 125000, to: 250000, rate: 0.07 },   // 2% + 5%
    { from: 250000, to: 925000, rate: 0.10 },   // 5% + 5%
    { from: 925000, to: 1500000, rate: 0.15 },  // 10% + 5%
    { from: 1500000, to: Infinity, rate: 0.17 }, // 12% + 5%
  ],
  mortgageInterestReliefRate: 0.20, // basic rate tax credit only since April 2020
};
