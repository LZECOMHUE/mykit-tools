'use client';

import { useState, useMemo } from 'react';

export default function USNetWorthCalculator() {
  const [checkingsAccount, setCheckingsAccount] = useState(5000);
  const [savingsAccount, setSavingsAccount] = useState(25000);
  const [investments, setInvestments] = useState(50000);
  const [retirementAccount, setRetirementAccount] = useState(150000);
  const [primaryHome, setPrimaryHome] = useState(400000);
  const [vehicles, setVehicles] = useState(30000);
  const [otherAssets, setOtherAssets] = useState(0);
  const [mortgage, setMortgage] = useState(300000);
  const [studentLoans, setStudentLoans] = useState(0);
  const [creditCardDebt, setCreditCardDebt] = useState(0);
  const [carLoans, setCarLoans] = useState(15000);
  const [otherDebts, setOtherDebts] = useState(0);

  const results = useMemo(() => {
    const totalAssets =
      checkingsAccount +
      savingsAccount +
      investments +
      retirementAccount +
      primaryHome +
      vehicles +
      otherAssets;

    const totalLiabilities = mortgage + studentLoans + creditCardDebt + carLoans + otherDebts;
    const netWorth = totalAssets - totalLiabilities;

    const liquidAssets = checkingsAccount + savingsAccount + investments;
    const nonLiquidAssets = retirementAccount + primaryHome + vehicles + otherAssets;

    return {
      totalAssets: Math.round(totalAssets),
      totalLiabilities: Math.round(totalLiabilities),
      netWorth: Math.round(netWorth),
      liquidAssets: Math.round(liquidAssets),
      nonLiquidAssets: Math.round(nonLiquidAssets),
      assetsPercent: {
        liquid: ((liquidAssets / totalAssets) * 100).toFixed(1),
        retirement: ((retirementAccount / totalAssets) * 100).toFixed(1),
        realEstate: ((primaryHome / totalAssets) * 100).toFixed(1),
        vehicles: ((vehicles / totalAssets) * 100).toFixed(1),
        other: (((otherAssets) / totalAssets) * 100).toFixed(1),
      },
      debtPercent: {
        mortgage: ((mortgage / totalLiabilities) * 100).toFixed(1),
        student: ((studentLoans / totalLiabilities) * 100).toFixed(1),
        creditCard: ((creditCardDebt / totalLiabilities) * 100).toFixed(1),
        car: ((carLoans / totalLiabilities) * 100).toFixed(1),
        other: (((otherDebts) / totalLiabilities) * 100).toFixed(1),
      },
      debtToIncomeEstimate: (totalLiabilities / (netWorth + totalLiabilities + 100000)).toFixed(2),
    };
  }, [
    checkingsAccount,
    savingsAccount,
    investments,
    retirementAccount,
    primaryHome,
    vehicles,
    otherAssets,
    mortgage,
    studentLoans,
    creditCardDebt,
    carLoans,
    otherDebts,
  ]);

  return (
    <div className="space-y-6 p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assets Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Assets</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Checking Account
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={checkingsAccount}
                onChange={(e) => setCheckingsAccount(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Savings Account
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={savingsAccount}
                onChange={(e) => setSavingsAccount(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Investments (Stocks, Bonds, ETFs)
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={investments}
                onChange={(e) => setInvestments(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Retirement Accounts (401k, IRA)
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={retirementAccount}
                onChange={(e) => setRetirementAccount(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Primary Home Value
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={primaryHome}
                onChange={(e) => setPrimaryHome(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Vehicles Value
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={vehicles}
                onChange={(e) => setVehicles(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Other Assets (Jewelry, Art, Collectibles)
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={otherAssets}
                onChange={(e) => setOtherAssets(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Liabilities Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Liabilities</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Mortgage Balance
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={mortgage}
                onChange={(e) => setMortgage(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Student Loans
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={studentLoans}
                onChange={(e) => setStudentLoans(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Credit Card Debt
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={creditCardDebt}
                onChange={(e) => setCreditCardDebt(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Car Loans
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={carLoans}
                onChange={(e) => setCarLoans(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Other Debts
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={otherDebts}
                onChange={(e) => setOtherDebts(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success/10 border border-success rounded-lg p-4">
          <p className="text-sm text-text-secondary mb-1">Total Assets</p>
          <p className="font-mono text-2xl font-bold text-success">
            ${results.totalAssets.toLocaleString()}
          </p>
        </div>

        <div className="bg-error/10 border border-error rounded-lg p-4">
          <p className="text-sm text-text-secondary mb-1">Total Liabilities</p>
          <p className="font-mono text-2xl font-bold text-error">
            ${results.totalLiabilities.toLocaleString()}
          </p>
        </div>

        <div
          className={`rounded-lg p-4 border ${
            results.netWorth >= 0
              ? 'bg-accent/10 border-accent'
              : 'bg-warning/10 border-warning'
          }`}
        >
          <p className="text-sm text-text-secondary mb-1">Net Worth</p>
          <p
            className={`font-mono text-2xl font-bold ${
              results.netWorth >= 0 ? 'text-accent' : 'text-warning'
            }`}
          >
            ${results.netWorth.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Asset Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-4 rounded-lg">
          <h4 className="font-semibold text-text-primary mb-3">Asset Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Liquid Assets:</span>
              <div className="text-right">
                <div className="font-mono font-semibold">
                  ${results.liquidAssets.toLocaleString()}
                </div>
                <div className="text-text-muted text-xs">{results.assetsPercent.liquid}%</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Retirement Accounts:</span>
              <div className="text-right">
                <div className="font-mono font-semibold">
                  ${retirementAccount.toLocaleString()}
                </div>
                <div className="text-text-muted text-xs">{results.assetsPercent.retirement}%</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Real Estate:</span>
              <div className="text-right">
                <div className="font-mono font-semibold">
                  ${primaryHome.toLocaleString()}
                </div>
                <div className="text-text-muted text-xs">{results.assetsPercent.realEstate}%</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Vehicles:</span>
              <div className="text-right">
                <div className="font-mono font-semibold">
                  ${vehicles.toLocaleString()}
                </div>
                <div className="text-text-muted text-xs">{results.assetsPercent.vehicles}%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-lg">
          <h4 className="font-semibold text-text-primary mb-3">Debt Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Mortgage:</span>
              <div className="text-right">
                <div className="font-mono font-semibold">
                  ${mortgage.toLocaleString()}
                </div>
                <div className="text-text-muted text-xs">{results.debtPercent.mortgage}%</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Car Loans:</span>
              <div className="text-right">
                <div className="font-mono font-semibold">
                  ${carLoans.toLocaleString()}
                </div>
                <div className="text-text-muted text-xs">{results.debtPercent.car}%</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Credit Cards:</span>
              <div className="text-right">
                <div className="font-mono font-semibold">
                  ${creditCardDebt.toLocaleString()}
                </div>
                <div className="text-text-muted text-xs">{results.debtPercent.creditCard}%</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Student Loans:</span>
              <div className="text-right">
                <div className="font-mono font-semibold">
                  ${studentLoans.toLocaleString()}
                </div>
                <div className="text-text-muted text-xs">{results.debtPercent.student}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">What is Net Worth?</p>
        <p>
          Net worth is your total assets minus total liabilities. It represents what you would
          have left if you sold everything and paid off all debts. Tracking it over time helps you
          see your financial progress.
        </p>
      </div>
    </div>
  );
}
