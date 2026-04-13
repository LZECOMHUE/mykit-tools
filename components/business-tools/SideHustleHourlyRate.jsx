'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

const MIN_WAGE_UK = 11.44;

export default function SideHustleHourlyRate() {
  const [monthlyIncome, setMonthlyIncome] = useState(800);
  const [materialsCost, setMaterialsCost] = useState(150);
  const [toolsEquipment, setToolsEquipment] = useState(30);
  const [softwareSubscriptions, setSoftwareSubscriptions] = useState(20);
  const [postagePackaging, setPostagePackaging] = useState(80);
  const [marketplaceFees, setMarketplaceFees] = useState(40);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [weekliesHours, setWeekliesHours] = useState({
    making: 10,
    photographing: 3,
    listing: 3,
    packing: 4,
    admin: 2,
  });

  const calculations = useMemo(() => {
    const totalExpenses = materialsCost + toolsEquipment + softwareSubscriptions + postagePackaging + marketplaceFees + otherExpenses;
    const netIncome = monthlyIncome - totalExpenses;
    const monthlyHours = Object.values(weekliesHours).reduce((sum, h) => sum + h, 0) * 4.33;
    const hourlyRate = monthlyHours > 0 ? (netIncome / monthlyHours).toFixed(2) : 0;

    return {
      totalExpenses: totalExpenses.toFixed(2),
      netIncome: netIncome.toFixed(2),
      monthlyHours: monthlyHours.toFixed(1),
      hourlyRate: parseFloat(hourlyRate),
      isAboveMinWage: parseFloat(hourlyRate) >= MIN_WAGE_UK,
      difference: Math.abs(parseFloat(hourlyRate) - MIN_WAGE_UK).toFixed(2),
    };
  }, [monthlyIncome, materialsCost, toolsEquipment, softwareSubscriptions, postagePackaging, marketplaceFees, otherExpenses, weekliesHours]);

  const updateHour = (key, value) => {
    setWeekliesHours(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  const expenseBreakdown = [
    { label: 'Materials', value: materialsCost, setValue: setMaterialsCost },
    { label: 'Tools/Equipment', value: toolsEquipment, setValue: setToolsEquipment },
    { label: 'Software Subscriptions', value: softwareSubscriptions, setValue: setSoftwareSubscriptions },
    { label: 'Postage/Packaging', value: postagePackaging, setValue: setPostagePackaging },
    { label: 'Marketplace Fees', value: marketplaceFees, setValue: setMarketplaceFees },
    { label: 'Other', value: otherExpenses, setValue: setOtherExpenses },
  ];

  const hourBreakdown = [
    { label: 'Making', key: 'making' },
    { label: 'Photography', key: 'photographing' },
    { label: 'Listing Products', key: 'listing' },
    { label: 'Packing & Posting', key: 'packing' },
    { label: 'Admin & Accounts', key: 'admin' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        {/* Income */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Monthly Income £</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
            className={inputCls}
            step="0.01"
          />
        </div>

        {/* Expenses */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Monthly Expenses</h3>
          <div className="space-y-2">
            {expenseBreakdown.map(item => (
              <div key={item.label}>
                <label className="text-[11px] text-text-muted">{item.label} £</label>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => item.setValue(parseFloat(e.target.value) || 0)}
                  className={inputCls}
                  step="0.01"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Hours */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Weekly Hours</h3>
          <div className="space-y-2">
            {hourBreakdown.map(item => (
              <div key={item.key}>
                <label className="text-[11px] text-text-muted">{item.label}</label>
                <input
                  type="number"
                  value={weekliesHours[item.key]}
                  onChange={(e) => updateHour(item.key, e.target.value)}
                  className={inputCls}
                  step="0.5"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero */}
        <div className={`rounded-[12px] space-y-2 ${calculations.isAboveMinWage ? 'bg-success/10' : 'bg-error/10'}`}>
          <div className="text-[13px] text-text-secondary">Your Real Hourly Rate</div>
          <div className={`font-heading font-bold text-[48px] leading-tight ${calculations.isAboveMinWage ? 'text-success' : 'text-error'}`}>
            £{calculations.hourlyRate.toFixed(2)}/hr
          </div>
          <div className="text-[13px] text-text-secondary space-y-1 pt-2 border-t border-border/40">
            <div>
              {calculations.isAboveMinWage ? (
                <span className="text-success font-medium">
                  {calculations.difference} above minimum wage ({calculations.difference} per hour extra)
                </span>
              ) : (
                <span className="text-error font-medium">
                  {calculations.difference} below minimum wage ({MIN_WAGE_UK}/hr)
                </span>
              )}
            </div>
            <div>Monthly Net Income: £{calculations.netIncome}</div>
            <div>Monthly Hours: {calculations.monthlyHours}h</div>
          </div>
        </div>

        {/* Income & Expenses */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Income Breakdown</h3>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 text-text-secondary">Gross Income</td>
                <td className="py-2 text-right font-mono text-success font-bold">£{monthlyIncome.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Total Expenses</td>
                <td className="py-2 text-right font-mono text-error font-bold">-£{calculations.totalExpenses}</td>
              </tr>
              <tr className="border-t-2 border-accent/30">
                <td className="py-2 text-text-primary font-bold">Net Income</td>
                <td className="py-2 text-right font-mono font-bold text-text-primary text-[14px]">£{calculations.netIncome}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Expenses Detail */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Expense Breakdown</h3>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-border">
              {expenseBreakdown
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value)
                .map(item => (
                  <tr key={item.label}>
                    <td className="py-2 text-text-secondary">{item.label}</td>
                    <td className="py-2 text-right font-mono text-text-primary">£{item.value.toFixed(2)}</td>
                  </tr>
                ))}
              <tr className="border-t-2 border-error/30">
                <td className="py-2 text-text-primary font-bold">Total</td>
                <td className="py-2 text-right font-mono font-bold text-text-primary">£{calculations.totalExpenses}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Hours Breakdown */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Weekly Time Breakdown</h3>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-border">
              {hourBreakdown.map(item => (
                <tr key={item.key}>
                  <td className="py-2 text-text-secondary">{item.label}</td>
                  <td className="py-2 text-right font-mono text-text-primary">{weekliesHours[item.key].toFixed(1)}h</td>
                </tr>
              ))}
              <tr className="border-t-2 border-accent/30">
                <td className="py-2 text-text-primary font-bold">Total Weekly</td>
                <td className="py-2 text-right font-mono font-bold text-text-primary">
                  {(Object.values(weekliesHours).reduce((sum, h) => sum + h, 0)).toFixed(1)}h
                </td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Monthly (@ 4.33 weeks)</td>
                <td className="py-2 text-right font-mono text-text-primary">{calculations.monthlyHours}h</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Comparison */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Minimum Wage Comparison</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Your Hourly Rate</span>
              <span className="font-mono font-bold">£{calculations.hourlyRate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">UK Minimum Wage</span>
              <span className="font-mono font-bold">£{MIN_WAGE_UK.toFixed(2)}</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className={calculations.isAboveMinWage ? 'bg-success' : 'bg-error'}
                style={{
                  width: `${Math.min((calculations.hourlyRate / MIN_WAGE_UK) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <div className={`text-[12px] font-medium ${calculations.isAboveMinWage ? 'text-success' : 'text-error'}`}>
              {calculations.isAboveMinWage
                ? `${calculations.difference} above minimum wage`
                : `${calculations.difference} below minimum wage`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
