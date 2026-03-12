'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function MortgageAffordabilityCalculator() {
  const [salary, setSalary] = useState('');
  const [partnerSalary, setPartnerSalary] = useState('');
  const [monthlyOutgoings, setMonthlyOutgoings] = useState('');
  const [deposit, setDeposit] = useState('');
  const [interestRate, setInterestRate] = useState('4.5');
  const [mortgageTerm, setMortgageTerm] = useState('25');

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtDecimal = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const results = useMemo(() => {
    const annualSalary = parseFloat(salary) || 0;
    const partnerAnnualSalary = parseFloat(partnerSalary) || 0;
    const monthlyExpenditures = parseFloat(monthlyOutgoings) || 0;
    const depositAmount = parseFloat(deposit) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseFloat(mortgageTerm) || 25;

    if (annualSalary <= 0) return null;

    const totalSalary = annualSalary + partnerAnnualSalary;
    const stressTestRate = rate + 2; // Stress test at +2%

    // Calculate max borrowing at different multipliers
    const affordableAtMultiplier = (multiplier) => totalSalary * multiplier;

    // Calculate monthly payment
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;
    const monthlyPayment = (borrowAmount) => {
      if (monthlyRate === 0) return borrowAmount / numPayments;
      return (borrowAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    };

    // Find max affordable at standard rate (4-4.5x salary rule, stress test at +2%)
    const maxAt4x = affordableAtMultiplier(4);
    const maxAt4_5x = affordableAtMultiplier(4.5);

    // Stress test: max that keeps monthly payment below 30% of monthly income at stress-test rate
    const monthlyIncome = totalSalary / 12;
    const maxAffordableMonthly = monthlyIncome * 0.3 - monthlyExpenditures;

    let maxBorrowingStress = 0;
    if (maxAffordableMonthly > 0) {
      // Binary search to find max borrowing amount
      let low = 0;
      let high = totalSalary * 5;
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        const monthlyPaymentAtStress = (mid * (stressTestRate / 100 / 12) * Math.pow(1 + stressTestRate / 100 / 12, numPayments)) / (Math.pow(1 + stressTestRate / 100 / 12, numPayments) - 1);
        if (monthlyPaymentAtStress <= maxAffordableMonthly) {
          low = mid;
        } else {
          high = mid;
        }
      }
      maxBorrowingStress = low;
    }

    // Use the most conservative of 4.5x salary or stress test
    const maxBorrowing = Math.min(maxAt4_5x, maxBorrowingStress);
    const propertyBudget = maxBorrowing + depositAmount;
    const monthlyPaymentAmount = monthlyPayment(maxBorrowing);
    const mortgageToIncomePercentage = (monthlyPaymentAmount / monthlyIncome) * 100;

    // Get affordability colour and status
    let affordabilityStatus = 'good';
    if (mortgageToIncomePercentage > 30) affordabilityStatus = 'stretched';
    if (mortgageToIncomePercentage > 40) affordabilityStatus = 'risky';

    return {
      maxBorrowing,
      propertyBudget,
      monthlyPayment: monthlyPaymentAmount,
      mortgageToIncomePercentage,
      affordabilityStatus,
      multipliers: [
        { label: '3x salary', amount: affordableAtMultiplier(3) },
        { label: '3.5x salary', amount: affordableAtMultiplier(3.5) },
        { label: '4x salary', amount: affordableAtMultiplier(4) },
        { label: '4.5x salary', amount: affordableAtMultiplier(4.5) },
        { label: '5x salary', amount: affordableAtMultiplier(5) },
      ],
      totalSalary,
      monthlyIncome,
      monthlyExpenditures,
    };
  }, [salary, partnerSalary, monthlyOutgoings, deposit, interestRate, mortgageTerm]);

  const handleReset = () => {
    setSalary('');
    setPartnerSalary('');
    setMonthlyOutgoings('');
    setDeposit('');
    setInterestRate('4.5');
    setMortgageTerm('25');
  };

  const getAffordabilityColor = (status) => {
    if (status === 'good') return 'bg-success/10 border-success text-success';
    if (status === 'stretched') return 'bg-warning/10 border-warning text-warning';
    return 'bg-error/10 border-error text-error';
  };

  const getAffordabilityLabel = (status) => {
    if (status === 'good') return 'Comfortable';
    if (status === 'stretched') return 'Stretched';
    return 'High Risk';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Input Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-text-primary font-semibold">Your Income & Outgoings</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Annual Salary</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="£45,000"
                min="0"
                step="1000"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Partner's Annual Salary (optional)</label>
              <input
                type="number"
                value={partnerSalary}
                onChange={(e) => setPartnerSalary(e.target.value)}
                placeholder="£0"
                min="0"
                step="1000"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Monthly Outgoings (loans, cards, etc.)</label>
              <input
                type="number"
                value={monthlyOutgoings}
                onChange={(e) => setMonthlyOutgoings(e.target.value)}
                placeholder="£500"
                min="0"
                step="50"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Deposit Available</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="£50,000"
                min="0"
                step="5000"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Mortgage Details Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-text-primary font-semibold">Mortgage Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Interest Rate (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="4.5"
                min="0"
                step="0.1"
                max="10"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
              <p className="text-xs text-text-muted mt-1">Mortgage rate assumption</p>
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Mortgage Term (years)</label>
              <input
                type="number"
                value={mortgageTerm}
                onChange={(e) => setMortgageTerm(e.target.value)}
                placeholder="25"
                min="5"
                max="40"
                step="1"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Main Results */}
          <Card className="border-2 border-accent bg-accent/5">
            <div className="space-y-4">
              <h3 className="text-text-primary font-semibold">How Much Can You Borrow?</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-text-secondary text-xs mb-2">Max Borrowing</p>
                  <p className="font-mono text-2xl sm:text-3xl font-bold text-accent">{fmt(results.maxBorrowing)}</p>
                </div>

                <div>
                  <p className="text-text-secondary text-xs mb-2">Property Budget (+ deposit)</p>
                  <p className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">{fmt(results.propertyBudget)}</p>
                </div>

                <div>
                  <p className="text-text-secondary text-xs mb-2">Monthly Repayment</p>
                  <p className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">{fmtDecimal(results.monthlyPayment)}</p>
                </div>
              </div>

              {/* Affordability Gauge */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-text-secondary text-sm">Affordability Ratio</p>
                  <p className="font-mono font-bold text-text-primary">{results.mortgageToIncomePercentage.toFixed(1)}% of income</p>
                </div>
                <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${
                      results.mortgageToIncomePercentage < 25
                        ? 'bg-success'
                        : results.mortgageToIncomePercentage < 30
                          ? 'bg-warning'
                          : 'bg-error'
                    }`}
                    style={{ width: `${Math.min(results.mortgageToIncomePercentage, 50)}%` }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-2">Rule of thumb: keep under 30% for comfort</p>
              </div>

              {/* Affordability Status */}
              <div className={`border rounded-lg p-3 ${getAffordabilityColor(results.affordabilityStatus)}`}>
                <p className="font-semibold text-sm">Status: {getAffordabilityLabel(results.affordabilityStatus)}</p>
              </div>
            </div>
          </Card>

          {/* Salary Multiplier Comparison Table */}
          <Card>
            <div className="space-y-3">
              <h3 className="text-text-primary font-semibold">Borrowing at Different Salary Multiples</h3>
              <div className="space-y-2">
                {results.multipliers.map((mult, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 px-3 bg-surface rounded-lg">
                    <span className="text-text-secondary text-sm">{mult.label}</span>
                    <span className="font-mono font-bold text-text-primary">{fmt(mult.amount)}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-3">
                The highest amount shown above is your realistic borrowing capacity (limited by stress testing).
              </p>
            </div>
          </Card>

          {/* Financial Summary */}
          <Card>
            <div className="space-y-3">
              <h3 className="text-text-primary font-semibold">Financial Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 px-3 border-b border-border">
                  <span className="text-text-secondary">Combined Annual Salary</span>
                  <span className="font-mono font-bold text-text-primary">{fmt(results.totalSalary)}</span>
                </div>
                <div className="flex justify-between py-2 px-3 border-b border-border">
                  <span className="text-text-secondary">Monthly Income</span>
                  <span className="font-mono font-bold text-text-primary">{fmtDecimal(results.monthlyIncome)}</span>
                </div>
                <div className="flex justify-between py-2 px-3">
                  <span className="text-text-secondary">Monthly Outgoings</span>
                  <span className="font-mono font-bold text-text-primary">{fmtDecimal(results.monthlyExpenditures)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Reset Button */}
          <div className="flex justify-center pt-2">
            <Button variant="secondary" onClick={handleReset}>
              Reset Calculator
            </Button>
          </div>
        </>
      )}

      {!results && (salary || partnerSalary) && (
        <div className="bg-info/10 border border-info rounded-lg p-4 text-text-secondary text-sm">
          Enter your annual salary to calculate borrowing capacity.
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-surface border border-border rounded-lg p-4 text-xs text-text-muted space-y-2">
        <p className="font-semibold text-text-secondary">Disclaimer:</p>
        <p>
          This calculator provides estimates based on standard lending criteria. Lenders use different affordability models and will consider employment history, credit score, and down payment. Always consult a mortgage adviser for a formal assessment. Figures are illustrative only.
        </p>
      </div>
    </div>
  );
}
