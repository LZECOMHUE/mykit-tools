// US Federal and State Tax Rates - 2025/26
// Source: IRS and state tax authorities
// Last reviewed: March 2026
// NOTE: This is for estimation only - consult a tax professional for accurate calculations

export const US_FEDERAL_TAX_BRACKETS_2026 = {
  single: [
    { from: 0, to: 11600, rate: 0.10 },
    { from: 11600, to: 47150, rate: 0.12 },
    { from: 47150, to: 100525, rate: 0.22 },
    { from: 100525, to: 191950, rate: 0.24 },
    { from: 191950, to: 243725, rate: 0.32 },
    { from: 243725, to: 609350, rate: 0.35 },
    { from: 609350, to: Infinity, rate: 0.37 },
  ],
  married_filing_jointly: [
    { from: 0, to: 23200, rate: 0.10 },
    { from: 23200, to: 94300, rate: 0.12 },
    { from: 94300, to: 201050, rate: 0.22 },
    { from: 201050, to: 383900, rate: 0.24 },
    { from: 383900, to: 487450, rate: 0.32 },
    { from: 487450, to: 731200, rate: 0.35 },
    { from: 731200, to: Infinity, rate: 0.37 },
  ],
  married_filing_separately: [
    { from: 0, to: 11600, rate: 0.10 },
    { from: 11600, to: 47150, rate: 0.12 },
    { from: 47150, to: 100525, rate: 0.22 },
    { from: 100525, to: 191950, rate: 0.24 },
    { from: 191950, to: 243725, rate: 0.32 },
    { from: 243725, to: 365600, rate: 0.35 },
    { from: 365600, to: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { from: 0, to: 16550, rate: 0.10 },
    { from: 16550, to: 63100, rate: 0.12 },
    { from: 63100, to: 100500, rate: 0.22 },
    { from: 100500, to: 191950, rate: 0.24 },
    { from: 191950, to: 243700, rate: 0.32 },
    { from: 243700, to: 609350, rate: 0.35 },
    { from: 609350, to: Infinity, rate: 0.37 },
  ],
};

// FICA rates (Social Security + Medicare)
export const FICA_RATES = {
  socialSecurity: {
    rate: 0.062, // 6.2%
    wageBase: 176100, // 2025 wage base limit
  },
  medicare: {
    rate: 0.0145, // 1.45%
    additionalRate: 0.009, // Additional 0.9% over $200k (single) or $250k (married)
    singleThreshold: 200000,
    marriedJointlyThreshold: 250000,
  },
};

// State income tax rates - simplified for estimation
// Many states have progressive brackets; these are reasonable estimates
export const STATE_TAX_RATES = {
  // No income tax states
  AK: { name: 'Alaska', rate: 0, note: 'No state income tax' },
  FL: { name: 'Florida', rate: 0, note: 'No state income tax' },
  NV: { name: 'Nevada', rate: 0, note: 'No state income tax' },
  NH: { name: 'New Hampshire', rate: 0, note: 'No state income tax (interest/dividends only)' },
  SD: { name: 'South Dakota', rate: 0, note: 'No state income tax' },
  TN: { name: 'Tennessee', rate: 0, note: 'No state income tax' },
  TX: { name: 'Texas', rate: 0, note: 'No state income tax' },
  WA: { name: 'Washington', rate: 0, note: 'No state income tax' },
  WY: { name: 'Wyoming', rate: 0, note: 'No state income tax' },

  // Flat tax states
  CO: { name: 'Colorado', rate: 0.044, type: 'flat' },
  IL: { name: 'Illinois', rate: 0.0495, type: 'flat' },
  IN: { name: 'Indiana', rate: 0.0365, type: 'flat' },
  KY: { name: 'Kentucky', rate: 0.05, type: 'flat' },
  MA: { name: 'Massachusetts', rate: 0.05, type: 'flat' },
  MI: { name: 'Michigan', rate: 0.0425, type: 'flat' },
  MN: { name: 'Minnesota', rate: 0.0985, type: 'flat' }, // Approximate top rate
  MS: { name: 'Mississippi', rate: 0.05, type: 'flat' },
  NC: { name: 'North Carolina', rate: 0.045, type: 'flat' },
  PA: { name: 'Pennsylvania', rate: 0.0307, type: 'flat' },

  // Progressive tax states (top rates shown)
  AL: { name: 'Alabama', rate: 0.05, type: 'progressive', topRate: true },
  AZ: { name: 'Arizona', rate: 0.0545, type: 'progressive', topRate: true },
  AR: { name: 'Arkansas', rate: 0.059, type: 'progressive', topRate: true },
  CA: { name: 'California', rate: 0.133, type: 'progressive', topRate: true },
  CT: { name: 'Connecticut', rate: 0.065, type: 'progressive', topRate: true },
  DE: { name: 'Delaware', rate: 0.066, type: 'progressive', topRate: true },
  GA: { name: 'Georgia', rate: 0.0575, type: 'progressive', topRate: true },
  HI: { name: 'Hawaii', rate: 0.11, type: 'progressive', topRate: true },
  ID: { name: 'Idaho', rate: 0.058, type: 'progressive', topRate: true },
  IA: { name: 'Iowa', rate: 0.0598, type: 'progressive', topRate: true },
  KS: { name: 'Kansas', rate: 0.057, type: 'progressive', topRate: true },
  LA: { name: 'Louisiana', rate: 0.06, type: 'progressive', topRate: true },
  ME: { name: 'Maine', rate: 0.0715, type: 'progressive', topRate: true },
  MD: { name: 'Maryland', rate: 0.0575, type: 'progressive', topRate: true },
  MO: { name: 'Missouri', rate: 0.053, type: 'progressive', topRate: true },
  MT: { name: 'Montana', rate: 0.062, type: 'progressive', topRate: true },
  NE: { name: 'Nebraska', rate: 0.0684, type: 'progressive', topRate: true },
  NJ: { name: 'New Jersey', rate: 0.0885, type: 'progressive', topRate: true },
  NM: { name: 'New Mexico', rate: 0.059, type: 'progressive', topRate: true },
  NY: { name: 'New York', rate: 0.0965, type: 'progressive', topRate: true },
  OH: { name: 'Ohio', rate: 0.0575, type: 'progressive', topRate: true },
  OK: { name: 'Oklahoma', rate: 0.05, type: 'progressive', topRate: true },
  OR: { name: 'Oregon', rate: 0.099, type: 'progressive', topRate: true },
  RI: { name: 'Rhode Island', rate: 0.063, type: 'progressive', topRate: true },
  SC: { name: 'South Carolina', rate: 0.07, type: 'progressive', topRate: true },
  UT: { name: 'Utah', rate: 0.0495, type: 'progressive', topRate: true },
  VT: { name: 'Vermont', rate: 0.0875, type: 'progressive', topRate: true },
  VA: { name: 'Virginia', rate: 0.0575, type: 'progressive', topRate: true },
  WI: { name: 'Wisconsin', rate: 0.0685, type: 'progressive', topRate: true },
  WV: { name: 'West Virginia', rate: 0.065, type: 'progressive', topRate: true },
};

// Standard deduction (2025)
export const STANDARD_DEDUCTION_2025 = {
  single: 14600,
  married_filing_jointly: 29200,
  married_filing_separately: 14600,
  head_of_household: 21900,
};

// 401k contribution limits (2025)
export const IRA_401K_LIMITS = {
  year: 2025,
  maxContribution: 23500,
  catchUpContribution: 7500, // Age 50+
  maxSEP_IRA: 66000,
  maxSOLO_401k: 69000,
};

// Medicare Wage Base (2025)
export const MEDICARE_WAGE_BASE = 176100;

// Federal student loan standard repayment (10 years)
export const STUDENT_LOAN_STANDARD_REPAYMENT_YEARS = 10;

export function getFederalTax(grossIncome, filingStatus = 'single') {
  const brackets = US_FEDERAL_TAX_BRACKETS_2026[filingStatus] || US_FEDERAL_TAX_BRACKETS_2026.single;
  let tax = 0;

  for (const bracket of brackets) {
    if (grossIncome <= bracket.from) break;

    const taxableInThisBracket = Math.min(grossIncome, bracket.to) - bracket.from;
    tax += taxableInThisBracket * bracket.rate;
  }

  return tax;
}

export function getStateTax(grossIncome, stateCode = 'CA') {
  const state = STATE_TAX_RATES[stateCode];
  if (!state) return 0;
  return grossIncome * state.rate;
}

export function getSocialSecurityTax(grossIncome) {
  return Math.min(grossIncome, FICA_RATES.socialSecurity.wageBase) * FICA_RATES.socialSecurity.rate;
}

export function getMedicareTax(grossIncome, filingStatus = 'single') {
  const threshold =
    filingStatus === 'married_filing_jointly'
      ? FICA_RATES.medicare.marriedJointlyThreshold
      : FICA_RATES.medicare.singleThreshold;

  let medicareTax = grossIncome * FICA_RATES.medicare.rate;

  if (grossIncome > threshold) {
    const additionalIncome = grossIncome - threshold;
    medicareTax += additionalIncome * FICA_RATES.medicare.additionalRate;
  }

  return medicareTax;
}
