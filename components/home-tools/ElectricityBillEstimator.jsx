'use client';

import { useState, useMemo, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';

export default function ElectricityBillEstimator() {
  const [inputMode, setInputMode] = useState('readings'); // 'readings' or 'total'
  const [tariff, setTariff] = useState('standard');
  const [standingCharge, setStandingCharge] = useState(0.616);
  const [billingDays, setBillingDays] = useState(91);

  // Readings mode
  const [currentReading, setCurrentReading] = useState(45230);
  const [previousReading, setPreviousReading] = useState(45105);

  // Total kWh mode
  const [totalKwh, setTotalKwh] = useState(125);

  // Standard tariff
  const [standardRate, setStandardRate] = useState(0.245);

  // Economy 7 tariff
  const [economy7Day, setEconomy7Day] = useState(0.28);
  const [economy7Night, setEconomy7Night] = useState(0.15);
  const [economy7NightPercent, setEconomy7NightPercent] = useState(30);

  // Fixed rate tariff
  const [fixedRate, setFixedRate] = useState(0.23);

  // Compare with previous
  const [compareMode, setCompareMode] = useState(false);
  const [compareBillingDays, setCompareBillingDays] = useState(91);
  const [compareKwh, setCompareKwh] = useState(110);

  // Calculate kWh used
  const kwhUsed = useMemo(() => {
    if (inputMode === 'readings') {
      return Math.max(0, currentReading - previousReading);
    }
    return totalKwh;
  }, [inputMode, currentReading, previousReading, totalKwh]);

  // Calculate electricity cost
  const electricityCost = useMemo(() => {
    if (tariff === 'standard') {
      return kwhUsed * standardRate;
    } else if (tariff === 'economy7') {
      const nightKwh = (kwhUsed * economy7NightPercent) / 100;
      const dayKwh = kwhUsed - nightKwh;
      return dayKwh * economy7Day + nightKwh * economy7Night;
    } else {
      // fixed
      return kwhUsed * fixedRate;
    }
  }, [tariff, kwhUsed, standardRate, economy7Day, economy7Night, economy7NightPercent, fixedRate]);

  // Calculate standing charge
  const standingChargeCost = useMemo(
    () => standingCharge * billingDays,
    [standingCharge, billingDays]
  );

  // Calculate VAT
  const subtotal = electricityCost + standingChargeCost;
  const vat = subtotal * 0.05;
  const totalBill = subtotal + vat;

  // Compare calculation
  const compareKwhRate = kwhUsed > 0 ? kwhUsed / compareKwh : 1;
  const compareElectricityCost =
    tariff === 'standard'
      ? compareKwh * standardRate
      : tariff === 'economy7'
        ? (compareKwh * (economy7NightPercent / 100)) * economy7Night +
          (compareKwh * (1 - economy7NightPercent / 100)) * economy7Day
        : compareKwh * fixedRate;
  const compareStandingCharge = standingCharge * compareBillingDays;
  const compareSubtotal = compareElectricityCost + compareStandingCharge;
  const compareVat = compareSubtotal * 0.05;
  const compareTotalBill = compareSubtotal + compareVat;

  const billDifference = totalBill - compareTotalBill;
  const percentChange = compareKwh > 0 ? ((kwhUsed - compareKwh) / compareKwh) * 100 : 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatKwh = (value) => {
    return new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };

  const tabsContent = [
    {
      id: 'estimate',
      label: 'Current Bill',
      content: (
        <div className="space-y-6">
          {/* Input Mode */}
          <div className="space-y-3">
            <h3 className="text-text-primary font-semibold">Enter Usage</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setInputMode('readings')}
                className={`flex-1 px-3 py-2 rounded-[8px] text-sm font-medium transition-colors ${
                  inputMode === 'readings'
                    ? 'bg-accent text-white'
                    : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
                }`}
              >
                Meter Readings
              </button>
              <button
                onClick={() => setInputMode('total')}
                className={`flex-1 px-3 py-2 rounded-[8px] text-sm font-medium transition-colors ${
                  inputMode === 'total'
                    ? 'bg-accent text-white'
                    : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
                }`}
              >
                Total kWh
              </button>
            </div>
          </div>

          {/* Meter Readings Input */}
          {inputMode === 'readings' && (
            <Card className="space-y-4">
              <Input
                label="Current Meter Reading (kWh)"
                type="number"
                value={currentReading}
                onChange={(e) => setCurrentReading(Number(e.target.value))}
              />
              <Input
                label="Previous Meter Reading (kWh)"
                type="number"
                value={previousReading}
                onChange={(e) => setPreviousReading(Number(e.target.value))}
              />
            </Card>
          )}

          {/* Total kWh Input */}
          {inputMode === 'total' && (
            <Card>
              <Input
                label="Total kWh Used"
                type="number"
                value={totalKwh}
                onChange={(e) => setTotalKwh(Number(e.target.value))}
              />
            </Card>
          )}

          {/* Billing Period */}
          <Input
            label="Number of Days in Billing Period"
            type="number"
            value={billingDays}
            onChange={(e) => setBillingDays(Number(e.target.value))}
          />

          {/* Tariff Selection */}
          <div className="space-y-3">
            <h3 className="text-text-primary font-semibold">Tariff Type</h3>
            <div className="space-y-2">
              {[
                { value: 'standard', label: 'Standard Variable' },
                { value: 'fixed', label: 'Fixed Rate' },
                { value: 'economy7', label: 'Economy 7' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 bg-surface rounded-[8px] cursor-pointer hover:bg-surface-hover transition-colors"
                >
                  <input
                    type="radio"
                    name="tariff"
                    value={option.value}
                    checked={tariff === option.value}
                    onChange={(e) => setTariff(e.target.value)}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="text-text-primary font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rate Input based on Tariff */}
          {tariff === 'standard' && (
            <Input
              label="Rate per kWh (p)"
              type="number"
              value={standardRate * 100}
              onChange={(e) => setStandardRate(Number(e.target.value) / 100)}
              step="0.1"
            />
          )}

          {tariff === 'fixed' && (
            <Input
              label="Fixed Rate per kWh (p)"
              type="number"
              value={fixedRate * 100}
              onChange={(e) => setFixedRate(Number(e.target.value) / 100)}
              step="0.1"
            />
          )}

          {tariff === 'economy7' && (
            <Card className="space-y-4">
              <Input
                label="Day Rate per kWh (p)"
                type="number"
                value={economy7Day * 100}
                onChange={(e) => setEconomy7Day(Number(e.target.value) / 100)}
                step="0.1"
              />
              <Input
                label="Night Rate per kWh (p)"
                type="number"
                value={economy7Night * 100}
                onChange={(e) => setEconomy7Night(Number(e.target.value) / 100)}
                step="0.1"
              />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-text-primary">
                    Night Usage %
                  </label>
                  <span className="font-mono-num text-text-primary">
                    {economy7NightPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={economy7NightPercent}
                  onChange={(e) => setEconomy7NightPercent(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
                />
              </div>
            </Card>
          )}

          {/* Standing Charge */}
          <Input
            label="Standing Charge per Day (p)"
            type="number"
            value={standingCharge * 100}
            onChange={(e) => setStandingCharge(Number(e.target.value) / 100)}
            step="0.1"
            helper="Current UK average around 61.6p"
          />
        </div>
      ),
    },
    {
      id: 'results',
      label: 'Breakdown',
      content: (
        <div className="space-y-4">
          {/* kWh Used */}
          <Card className="space-y-2">
            <p className="text-xs text-text-secondary">kWh Used</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {formatKwh(kwhUsed)}
            </p>
          </Card>

          {/* Cost Breakdown */}
          <Card className="space-y-3">
            <h3 className="text-text-primary font-semibold">Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Electricity Usage</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(electricityCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Standing Charge</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(standingChargeCost)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">VAT (5%)</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(vat)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <span className="text-text-primary">Total Bill</span>
                <span className="font-mono-num text-lg text-accent">
                  {formatCurrency(totalBill)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-8 px-4">
      {/* Title */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          Electricity Bill Estimator
        </h1>
        <p className="text-text-secondary mt-2">
          Calculate your UK electricity bill with current rates
        </p>
      </div>

      {/* Comparison Toggle */}
      <button
        onClick={() => setCompareMode(!compareMode)}
        className="px-4 py-2 text-sm font-medium text-accent hover:bg-accent-muted rounded-[8px] transition-colors"
      >
        {compareMode ? '- Hide Comparison' : '+ Compare with Previous Period'}
      </button>

      {/* Main Grid */}
      <div className={`grid gap-6 ${compareMode ? 'lg:grid-cols-2' : ''}`}>
        {/* Current Bill */}
        <div>
          <h2 className="text-text-primary font-semibold mb-4">Current Period</h2>
          <Tabs tabs={tabsContent} defaultTab="estimate" className="space-y-4" />
        </div>

        {/* Comparison */}
        {compareMode && (
          <div className="space-y-6">
            <h2 className="text-text-primary font-semibold">Previous Period</h2>

            <Card className="space-y-4">
              <Input
                label="kWh Used"
                type="number"
                value={compareKwh}
                onChange={(e) => setCompareKwh(Number(e.target.value))}
              />
              <Input
                label="Billing Days"
                type="number"
                value={compareBillingDays}
                onChange={(e) => setCompareBillingDays(Number(e.target.value))}
              />
            </Card>

            {/* Comparison Results */}
            <Card className="space-y-3 bg-blue-50 border-blue-200">
              <h3 className="text-text-primary font-semibold">Comparison</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Previous Bill</span>
                  <span className="font-mono-num text-text-primary">
                    {formatCurrency(compareTotalBill)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Current Bill</span>
                  <span className="font-mono-num text-text-primary">
                    {formatCurrency(totalBill)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-blue-300 pt-2 font-semibold">
                  <span className="text-blue-900">Difference</span>
                  <span
                    className={`font-mono-num ${
                      billDifference > 0
                        ? 'text-orange-700'
                        : 'text-green-700'
                    }`}
                  >
                    {billDifference > 0 ? '+' : ''}
                    {formatCurrency(billDifference)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-900">Usage Change</span>
                  <span
                    className={`font-mono-num font-semibold ${
                      percentChange > 0
                        ? 'text-orange-700'
                        : 'text-green-700'
                    }`}
                  >
                    {percentChange > 0 ? '+' : ''}
                    {percentChange.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> Rates shown are examples. Use your actual rates from your bill. Standing charge is based on the 2026 UK average of 61.6p/day. VAT is charged at 5% on electricity.
        </p>
      </Card>
    </div>
  );
}
