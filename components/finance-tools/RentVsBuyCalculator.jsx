'use client';

import { useState, useMemo, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

export default function RentVsBuyCalculator() {
  const [period, setPeriod] = useState(25);

  // Renting inputs
  const [monthlyRent, setMonthlyRent] = useState(1200);
  const [rentIncreasePercent, setRentIncreasePercent] = useState(3);
  const [rentersInsurance, setRentersInsurance] = useState(15);

  // Buying inputs
  const [propertyPrice, setPropertyPrice] = useState(400000);
  const [depositAmount, setDepositAmount] = useState(100000);
  const [mortgageRate, setMortgageRate] = useState(5.5);
  const [mortgageTerm, setMortgageTerm] = useState(25);
  const [maintenancePercent, setMaintenancePercent] = useState(1);
  const [buildingsInsurance, setBuildingsInsurance] = useState(45);
  const [groundRent, setGroundRent] = useState(0);

  // Calculate UK stamp duty
  const calculateStampDuty = useCallback((price) => {
    // 2026 rates
    if (price <= 250000) return 0;
    if (price <= 425000) return (price - 250000) * 0.05;
    if (price <= 550000) return (175000 * 0.05) + (price - 425000) * 0.1;
    return (175000 * 0.05) + (125000 * 0.1) + (price - 550000) * 0.12;
  }, []);

  const stampDuty = useMemo(
    () => calculateStampDuty(propertyPrice),
    [propertyPrice, calculateStampDuty]
  );

  const totalBuyingCost = depositAmount + stampDuty;
  const mortgageAmount = propertyPrice - depositAmount;

  // Calculate monthly mortgage payment
  const monthlyMortgage = useMemo(() => {
    const monthlyRate = mortgageRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;
    if (monthlyRate === 0) return mortgageAmount / numberOfPayments;
    return (
      mortgageAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  }, [mortgageAmount, mortgageRate, mortgageTerm]);

  // Calculate costs over period
  const costs = useMemo(() => {
    let rentCost = 0;
    let buyCost = 0;

    for (let year = 0; year < period; year++) {
      // Renting costs
      const yearlyRent =
        monthlyRent * 12 * Math.pow(1 + rentIncreasePercent / 100, year);
      rentCost += yearlyRent + rentersInsurance * 12;

      // Buying costs
      const yearlyMortgage = monthlyMortgage * 12;
      const yearlyMaintenance = propertyPrice * (maintenancePercent / 100);
      const yearlyInsurance = buildingsInsurance * 12;
      const yearlyGround = groundRent * 12;

      buyCost +=
        yearlyMortgage + yearlyMaintenance + yearlyInsurance + yearlyGround;
    }

    // Add stamp duty and deposit to buying cost
    buyCost += totalBuyingCost;

    return { rentCost, buyCost };
  }, [
    period,
    monthlyRent,
    rentIncreasePercent,
    rentersInsurance,
    monthlyMortgage,
    propertyPrice,
    maintenancePercent,
    buildingsInsurance,
    groundRent,
    totalBuyingCost,
  ]);

  // Calculate equity built from mortgage repayment
  const equityBuilt = useMemo(() => {
    let principalPaid = 0;
    let loanBalance = mortgageAmount;
    const monthlyRate = mortgageRate / 100 / 12;

    for (let month = 0; month < period * 12; month++) {
      const interestPayment = loanBalance * monthlyRate;
      const principalPayment = monthlyMortgage - interestPayment;
      principalPaid += principalPayment;
      loanBalance -= principalPayment;
    }

    return principalPaid;
  }, [period, mortgageAmount, mortgageRate, monthlyMortgage]);

  const netBuyCost = costs.buyCost - equityBuilt;

  const savings = costs.rentCost - netBuyCost;
  const isBuyCheaper = savings > 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-8 px-4">
      {/* Title */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          Rent vs Buy Calculator
        </h1>
        <p className="text-text-secondary mt-2">
          Compare the lifetime cost of renting versus buying a property in the UK
        </p>
      </div>

      {/* Period Selector */}
      <div className="space-y-3">
        <h2 className="text-text-primary font-semibold">Comparison Period</h2>
        <div className="grid grid-cols-4 gap-2">
          {[5, 10, 15, 25].map((years) => (
            <button
              key={years}
              onClick={() => setPeriod(years)}
              className={`px-4 py-2 rounded-[8px] font-medium text-sm transition-colors ${
                period === years
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
              }`}
            >
              {years} years
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Renting Column */}
        <Card className="space-y-4">
          <h2 className="text-text-primary font-semibold border-b border-border pb-3">
            Renting
          </h2>

          <Input
            label="Monthly Rent"
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            placeholder="1200"
          />

          <Input
            label="Annual Rent Increase (%)"
            type="number"
            value={rentIncreasePercent}
            onChange={(e) => setRentIncreasePercent(Number(e.target.value))}
            placeholder="3"
          />

          <Input
            label="Monthly Renter's Insurance"
            type="number"
            value={rentersInsurance}
            onChange={(e) => setRentersInsurance(Number(e.target.value))}
            placeholder="15"
          />
        </Card>

        {/* Buying Column */}
        <Card className="space-y-4">
          <h2 className="text-text-primary font-semibold border-b border-border pb-3">
            Buying
          </h2>

          <Input
            label="Property Price"
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            placeholder="400000"
          />

          <Input
            label="Deposit Amount"
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
            placeholder="100000"
          />

          <div className="p-3 bg-surface rounded-[8px] border border-border">
            <p className="text-xs text-text-secondary">Stamp Duty</p>
            <p className="font-mono-num text-lg font-bold text-text-primary">
              {formatCurrency(stampDuty)}
            </p>
          </div>

          <Input
            label="Mortgage Interest Rate (%)"
            type="number"
            value={mortgageRate}
            onChange={(e) => setMortgageRate(Number(e.target.value))}
            placeholder="5.5"
            step="0.1"
          />

          <Input
            label="Mortgage Term (years)"
            type="number"
            value={mortgageTerm}
            onChange={(e) => setMortgageTerm(Number(e.target.value))}
            placeholder="25"
          />

          <Input
            label="Annual Maintenance (%)"
            type="number"
            value={maintenancePercent}
            onChange={(e) => setMaintenancePercent(Number(e.target.value))}
            placeholder="1"
          />

          <Input
            label="Monthly Buildings Insurance"
            type="number"
            value={buildingsInsurance}
            onChange={(e) => setBuildingsInsurance(Number(e.target.value))}
            placeholder="45"
          />

          <Input
            label="Monthly Ground Rent/Service Charge"
            type="number"
            value={groundRent}
            onChange={(e) => setGroundRent(Number(e.target.value))}
            placeholder="0"
          />
        </Card>

        {/* Summary Column */}
        <Card className="space-y-4">
          <h2 className="text-text-primary font-semibold border-b border-border pb-3">
            Summary
          </h2>

          <div className="space-y-4">
            {/* Total Renting Cost */}
            <div className="space-y-1">
              <p className="text-xs text-text-secondary">Total Renting Cost</p>
              <p className="font-mono-num text-lg font-bold text-text-primary">
                {formatCurrency(costs.rentCost)}
              </p>
            </div>

            {/* Mortgage Payment */}
            <div className="space-y-1">
              <p className="text-xs text-text-secondary">Monthly Mortgage</p>
              <p className="font-mono-num text-lg font-bold text-text-primary">
                {formatCurrency(monthlyMortgage)}
              </p>
            </div>

            {/* Equity Built */}
            <div className="space-y-1">
              <p className="text-xs text-text-secondary">Equity Built</p>
              <p className="font-mono-num text-lg font-bold text-accent">
                {formatCurrency(equityBuilt)}
              </p>
            </div>

            {/* Net Buying Cost */}
            <div className="space-y-1">
              <p className="text-xs text-text-secondary">Net Cost After Equity</p>
              <p className="font-mono-num text-lg font-bold text-text-primary">
                {formatCurrency(netBuyCost)}
              </p>
            </div>

            <div className="border-t border-border pt-4">
              {isBuyCheaper ? (
                <div className="space-y-1">
                  <p className="text-xs text-green-700 font-medium">
                    Buying is cheaper
                  </p>
                  <p className="font-mono-num text-2xl font-bold text-green-700">
                    {formatCurrency(savings)}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-orange-700 font-medium">
                    Renting is cheaper
                  </p>
                  <p className="font-mono-num text-2xl font-bold text-orange-700">
                    {formatCurrency(Math.abs(savings))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <Card className="space-y-4">
        <h2 className="text-text-primary font-semibold">Typical Monthly Costs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Renting Breakdown */}
          <div className="space-y-3">
            <h3 className="text-text-secondary font-medium">Renting</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Rent</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(monthlyRent)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Renter's Insurance</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(rentersInsurance)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <span className="text-text-primary">Total</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(monthlyRent + rentersInsurance)}
                </span>
              </div>
            </div>
          </div>

          {/* Buying Breakdown */}
          <div className="space-y-3">
            <h3 className="text-text-secondary font-medium">Buying</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Mortgage</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(monthlyMortgage)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Maintenance</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(propertyPrice / 12 * (maintenancePercent / 100))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Buildings Insurance</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(buildingsInsurance)}
                </span>
              </div>
              {groundRent > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Ground Rent</span>
                  <span className="font-mono-num text-text-primary">
                    {formatCurrency(groundRent)}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <span className="text-text-primary">Total</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(
                    monthlyMortgage +
                      propertyPrice / 12 * (maintenancePercent / 100) +
                      buildingsInsurance +
                      groundRent
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> Stamp duty rates are based on 2026 UK thresholds. Your actual monthly mortgage payment may vary based on your lender's fees. Equity built assumes you pay off the mortgage over the full term. Property values are not included in this calculation.
        </p>
      </Card>
    </div>
  );
}
