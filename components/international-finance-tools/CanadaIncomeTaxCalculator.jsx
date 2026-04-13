'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';

export default function CanadaIncomeTaxCalculator() {
  const [province, setProvince] = useState('on');
  const [employmentIncome, setEmploymentIncome] = useState(65000);
  const [rrspContributions, setRrspContributions] = useState(0);
  const [employmentStatus, setEmploymentStatus] = useState('employed');

  const provinces = [
    { value: 'ab', label: 'Alberta' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'mb', label: 'Manitoba' },
    { value: 'nb', label: 'New Brunswick' },
    { value: 'nl', label: 'Newfoundland and Labrador' },
    { value: 'ns', label: 'Nova Scotia' },
    { value: 'nt', label: 'Northwest Territories' },
    { value: 'nu', label: 'Nunavut' },
    { value: 'on', label: 'Ontario' },
    { value: 'pe', label: 'Prince Edward Island' },
    { value: 'qc', label: 'Quebec' },
    { value: 'sk', label: 'Saskatchewan' },
    { value: 'yt', label: 'Yukon' },
  ];

  const calculateFederalTax = (taxableIncome) => {
    let tax = 0;
    const BPA = 16129; // Federal basic personal amount
    const federallyTaxable = Math.max(0, taxableIncome - BPA);

    if (federallyTaxable > 220000) {
      tax += (federallyTaxable - 220000) * 0.33;
      tax += (220000 - 158468) * 0.29;
      tax += (158468 - 114750) * 0.26;
      tax += (114750 - 57375) * 0.205;
      tax += 57375 * 0.15;
    } else if (federallyTaxable > 158468) {
      tax += (federallyTaxable - 158468) * 0.29;
      tax += (158468 - 114750) * 0.26;
      tax += (114750 - 57375) * 0.205;
      tax += 57375 * 0.15;
    } else if (federallyTaxable > 114750) {
      tax += (federallyTaxable - 114750) * 0.26;
      tax += (114750 - 57375) * 0.205;
      tax += 57375 * 0.15;
    } else if (federallyTaxable > 57375) {
      tax += (federallyTaxable - 57375) * 0.205;
      tax += 57375 * 0.15;
    } else {
      tax += federallyTaxable * 0.15;
    }

    return Math.max(0, tax);
  };

  const calculateProvincialTax = (taxableIncome) => {
    const provincialBPA = {
      ab: 21885,
      bc: 12945,
      mb: 17000,
      nb: 11981,
      nl: 12297,
      ns: 15705,
      nt: 16777,
      nu: 18736,
      on: 11865,
      pe: 11309,
      qc: 17693,
      sk: 18881,
      yt: 16259,
    };

    const bpa = provincialBPA[province] || 12000;
    const provinciallyTaxable = Math.max(0, taxableIncome - bpa);
    let tax = 0;

    switch (province) {
      case 'ab': // Flat 10%
        tax = provinciallyTaxable * 0.1;
        break;
      case 'bc': // 5 brackets
        if (provinciallyTaxable > 246752) {
          tax += (provinciallyTaxable - 246752) * 0.205;
          tax += (246752 - 181232) * 0.17;
          tax += (181232 - 110076) * 0.1505;
          tax += (110076 - 45654) * 0.1079;
          tax += 45654 * 0.0506;
        } else if (provinciallyTaxable > 181232) {
          tax += (provinciallyTaxable - 181232) * 0.17;
          tax += (181232 - 110076) * 0.1505;
          tax += (110076 - 45654) * 0.1079;
          tax += 45654 * 0.0506;
        } else if (provinciallyTaxable > 110076) {
          tax += (provinciallyTaxable - 110076) * 0.1505;
          tax += (110076 - 45654) * 0.1079;
          tax += 45654 * 0.0506;
        } else if (provinciallyTaxable > 45654) {
          tax += (provinciallyTaxable - 45654) * 0.1079;
          tax += 45654 * 0.0506;
        } else {
          tax += provinciallyTaxable * 0.0506;
        }
        break;
      case 'mb': // 2 brackets
        if (provinciallyTaxable > 79625) {
          tax += (provinciallyTaxable - 79625) * 0.174;
          tax += 79625 * 0.108;
        } else {
          tax += provinciallyTaxable * 0.108;
        }
        break;
      case 'nb': // 3 brackets
        if (provinciallyTaxable > 176756) {
          tax += (provinciallyTaxable - 176756) * 0.203;
          tax += (176756 - 88897) * 0.161;
          tax += 88897 * 0.094;
        } else if (provinciallyTaxable > 88897) {
          tax += (provinciallyTaxable - 88897) * 0.161;
          tax += 88897 * 0.094;
        } else {
          tax += provinciallyTaxable * 0.094;
        }
        break;
      case 'nl': // 3 brackets
        if (provinciallyTaxable > 208453) {
          tax += (provinciallyTaxable - 208453) * 0.178;
          tax += (208453 - 104225) * 0.149;
          tax += 104225 * 0.0815;
        } else if (provinciallyTaxable > 104225) {
          tax += (provinciallyTaxable - 104225) * 0.149;
          tax += 104225 * 0.0815;
        } else {
          tax += provinciallyTaxable * 0.0815;
        }
        break;
      case 'ns': // 3 brackets
        if (provinciallyTaxable > 239950) {
          tax += (provinciallyTaxable - 239950) * 0.175;
          tax += (239950 - 119975) * 0.1667;
          tax += 119975 * 0.0915;
        } else if (provinciallyTaxable > 119975) {
          tax += (provinciallyTaxable - 119975) * 0.1667;
          tax += 119975 * 0.0915;
        } else {
          tax += provinciallyTaxable * 0.0915;
        }
        break;
      case 'nt': // 2 brackets
        if (provinciallyTaxable > 151951) {
          tax += (provinciallyTaxable - 151951) * 0.145;
          tax += 151951 * 0.059;
        } else {
          tax += provinciallyTaxable * 0.059;
        }
        break;
      case 'nu': // 2 brackets
        if (provinciallyTaxable > 161926) {
          tax += (provinciallyTaxable - 161926) * 0.115;
          tax += 161926 * 0.04;
        } else {
          tax += provinciallyTaxable * 0.04;
        }
        break;
      case 'on': // 5 brackets
        if (provinciallyTaxable > 308606) {
          tax += (provinciallyTaxable - 308606) * 0.1316;
          tax += (308606 - 220708) * 0.1116;
          tax += (220708 - 150000) * 0.0916;
          tax += (150000 - 51446) * 0.0616;
          tax += 51446 * 0.0505;
        } else if (provinciallyTaxable > 220708) {
          tax += (provinciallyTaxable - 220708) * 0.1116;
          tax += (220708 - 150000) * 0.0916;
          tax += (150000 - 51446) * 0.0616;
          tax += 51446 * 0.0505;
        } else if (provinciallyTaxable > 150000) {
          tax += (provinciallyTaxable - 150000) * 0.0916;
          tax += (150000 - 51446) * 0.0616;
          tax += 51446 * 0.0505;
        } else if (provinciallyTaxable > 51446) {
          tax += (provinciallyTaxable - 51446) * 0.0616;
          tax += 51446 * 0.0505;
        } else {
          tax += provinciallyTaxable * 0.0505;
        }
        break;
      case 'pe': // 2 brackets
        if (provinciallyTaxable > 104625) {
          tax += (provinciallyTaxable - 104625) * 0.18;
          tax += 104625 * 0.098;
        } else {
          tax += provinciallyTaxable * 0.098;
        }
        break;
      case 'qc': // 4 brackets + QPP (CPP alternative)
        if (provinciallyTaxable > 290776) {
          tax += (provinciallyTaxable - 290776) * 0.2575;
          tax += (290776 - 180711) * 0.241;
          tax += (180711 - 104589) * 0.2065;
          tax += 104589 * 0.15;
        } else if (provinciallyTaxable > 180711) {
          tax += (provinciallyTaxable - 180711) * 0.241;
          tax += (180711 - 104589) * 0.2065;
          tax += 104589 * 0.15;
        } else if (provinciallyTaxable > 104589) {
          tax += (provinciallyTaxable - 104589) * 0.2065;
          tax += 104589 * 0.15;
        } else {
          tax += provinciallyTaxable * 0.15;
        }
        break;
      case 'sk': // 2 brackets
        if (provinciallyTaxable > 158744) {
          tax += (provinciallyTaxable - 158744) * 0.145;
          tax += 158744 * 0.105;
        } else {
          tax += provinciallyTaxable * 0.105;
        }
        break;
      case 'yt': // 2 brackets
        if (provinciallyTaxable > 173205) {
          tax += (provinciallyTaxable - 173205) * 0.12;
          tax += 173205 * 0.06;
        } else {
          tax += provinciallyTaxable * 0.06;
        }
        break;
      default:
        tax = provinciallyTaxable * 0.1;
    }

    return Math.max(0, tax);
  };

  const calculateCPP = (income) => {
    if (province === 'qc') return 0; // Quebec has QPP instead
    const CPP_MAX_PENSIONABLE = 71300;
    const CPP_BASIC_EXEMPTION = 3500;
    const pensionable = Math.min(income, CPP_MAX_PENSIONABLE);
    const contributory = Math.max(0, pensionable - CPP_BASIC_EXEMPTION);

    let contribution = 0;
    // CPP rate 5.95% up to Year's Maximum Pensionable Earnings minus basic exemption
    if (contributory > 67800) {
      contribution += (Math.min(contributory, 67800) - 0) * 0.0595;
      contribution += (contributory - 67800) * 0.04;
    } else {
      contribution += contributory * 0.0595;
    }

    return Math.round(contribution);
  };

  const calculateEI = (income) => {
    const EI_MAX_INSURABLE = 63200;
    const EI_RATE = 0.0164;
    const insurable = Math.min(income, EI_MAX_INSURABLE);
    return Math.round(insurable * EI_RATE);
  };

  const taxableIncome = Math.max(0, employmentIncome - rrspContributions);
  const federalTax = calculateFederalTax(taxableIncome);
  const provincialTax = calculateProvincialTax(taxableIncome);
  const cppContribution = calculateCPP(employmentIncome);
  const eiPremium = calculateEI(employmentIncome);

  const totalDeductions = federalTax + provincialTax + cppContribution + eiPremium;
  const takeHomePay = employmentIncome - totalDeductions;

  const effectiveRate = employmentIncome > 0 ? (totalDeductions / employmentIncome * 100) : 0;
  const marginalRate = ((calculateFederalTax(taxableIncome + 1000) - federalTax) / 1000 +
                        (calculateProvincialTax(taxableIncome + 1000) - provincialTax) / 1000) * 100;

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Income & Contributions
        </h2>
        <div className="space-y-4">
          <Select
            label="Province/Territory"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            options={provinces}
          />
          <Input
            type="number"
            label="Employment Income ($ CAD)"
            value={employmentIncome}
            onChange={(e) => setEmploymentIncome(Number(e.target.value))}
            placeholder="65000"
          />
          <Input
            type="number"
            label="RRSP Contributions ($ CAD)"
            value={rrspContributions}
            onChange={(e) => setRrspContributions(Number(e.target.value))}
            placeholder="0"
          />
          <Select
            label="Employment Status"
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
            options={[
              { value: 'employed', label: 'Employed' },
              { value: 'self-employed', label: 'Self-Employed' },
            ]}
          />
        </div>
      </Card>

      <Card className="bg-blue-50 border border-blue-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Tax Breakdown
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Federal Income Tax</span>
            <span className="font-mono font-semibold text-primary">
              ${federalTax.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Provincial Income Tax</span>
            <span className="font-mono font-semibold text-primary">
              ${provincialTax.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">CPP Contributions</span>
            <span className="font-mono font-semibold text-primary">
              ${cppContribution.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">EI Premiums</span>
            <span className="font-mono font-semibold text-primary">
              ${eiPremium.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      <Card className="bg-green-50 border border-green-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Taxable Income</span>
            <span className="font-mono font-semibold text-primary">
              ${taxableIncome.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Total Deductions</span>
            <span className="font-mono font-semibold text-primary">
              ${totalDeductions.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-green-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Take-Home Pay</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${takeHomePay.toLocaleString()}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-green-300">
            <div>
              <p className="text-xs text-secondary">Effective Tax Rate</p>
              <p className="font-mono font-bold text-primary">{effectiveRate.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-xs text-secondary">Marginal Tax Rate</p>
              <p className="font-mono font-bold text-primary">{marginalRate.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator is for estimation purposes only and is based on 2025 Canadian tax rates and limits. Tax laws change regularly. For accurate tax advice, consult the Canada Revenue Agency (CRA) website or a certified tax professional. CPP contributions shown are employee contributions only; employers contribute equally.
        </p>
      </Card>
    </div>
  );
}
