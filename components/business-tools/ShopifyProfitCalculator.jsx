'use client';

import { useState, useMemo } from 'react';

const SHOPIFY_PLANS = {
  basic: { name: 'Basic', monthlyFee: 39, annualFee: 29, paymentFee: 0.029, paymentFixed: 0.30, thirdPartyFee: 0.02 },
  grow: { name: 'Shopify (Grow)', monthlyFee: 105, annualFee: 79, paymentFee: 0.027, paymentFixed: 0.30, thirdPartyFee: 0.01 },
  advanced: { name: 'Advanced', monthlyFee: 399, annualFee: 299, paymentFee: 0.025, paymentFixed: 0.30, thirdPartyFee: 0.006 },
};

function fmt(val) {
  const abs = Math.abs(val);
  return `${val < 0 ? '-' : ''}$${abs.toFixed(2)}`;
}

export default function ShopifyProfitCalculator() {
  const [monthlyOrders, setMonthlyOrders] = useState(50);
  const [orderValue, setOrderValue] = useState(75);
  const [productCost, setProductCost] = useState(25);
  const [shippingCost, setShippingCost] = useState(5);
  const [plan, setPlan] = useState('basic');
  const [billing, setBilling] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('shopify');
  const [internationalSales, setInternationalSales] = useState(false);

  const inputCls = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
  const selectCls = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  const r = useMemo(() => {
    const cfg = SHOPIFY_PLANS[plan];
    const planFee = billing === 'monthly' ? cfg.monthlyFee : cfg.annualFee;
    const monthlyPlanCost = billing === 'monthly' ? cfg.monthlyFee : cfg.annualFee / 12;
    const convRate = internationalSales ? 0.02 : 0.015;

    // Per order
    const paymentFee = paymentMethod === 'shopify' ? (orderValue * cfg.paymentFee + cfg.paymentFixed) : 0;
    const thirdPartyFee = paymentMethod === 'third-party' ? (orderValue * cfg.thirdPartyFee) : 0;
    const conversionFee = orderValue * convRate;
    const feesPerOrder = paymentFee + thirdPartyFee + conversionFee;
    const profitPerOrder = orderValue - productCost - shippingCost - feesPerOrder;

    // Monthly
    const revenue = monthlyOrders * orderValue;
    const totalProductCosts = monthlyOrders * productCost;
    const totalShippingCosts = monthlyOrders * shippingCost;
    const totalTransactionFees = monthlyOrders * feesPerOrder;
    const monthlyProfit = revenue - totalProductCosts - totalShippingCosts - totalTransactionFees - monthlyPlanCost;
    const effectiveRate = revenue > 0 ? ((totalTransactionFees + monthlyPlanCost) / revenue) * 100 : 0;
    const breakEven = profitPerOrder > 0 ? Math.ceil(monthlyPlanCost / profitPerOrder) : 0;

    return {
      paymentFee, thirdPartyFee, conversionFee, feesPerOrder, profitPerOrder,
      revenue, totalProductCosts, totalShippingCosts, totalTransactionFees, monthlyPlanCost,
      monthlyProfit, effectiveRate, breakEven, planName: cfg.name, planFee,
    };
  }, [monthlyOrders, orderValue, productCost, shippingCost, plan, billing, paymentMethod, internationalSales]);

  // Plan comparison
  const planComp = useMemo(() => {
    const convRate = internationalSales ? 0.02 : 0.015;
    return Object.entries(SHOPIFY_PLANS).map(([key, cfg]) => {
      const mpc = billing === 'monthly' ? cfg.monthlyFee : cfg.annualFee / 12;
      const pf = paymentMethod === 'shopify' ? (orderValue * cfg.paymentFee + cfg.paymentFixed) : 0;
      const tf = paymentMethod === 'third-party' ? (orderValue * cfg.thirdPartyFee) : 0;
      const cf = orderValue * convRate;
      const fpo = pf + tf + cf;
      const profit = monthlyOrders * (orderValue - productCost - shippingCost - fpo) - mpc;
      return { key, name: cfg.name, planCost: mpc, feePerOrder: fpo, profit };
    });
  }, [monthlyOrders, orderValue, productCost, shippingCost, billing, paymentMethod, internationalSales]);

  const bestPlan = planComp.reduce((best, c) => c.profit > best.profit ? c : best);

  const feeRows = [
    ...(r.paymentFee > 0 ? [{ label: 'Payment processing', val: r.paymentFee, note: `${(SHOPIFY_PLANS[plan].paymentFee * 100).toFixed(1)}% + $0.30` }] : []),
    ...(r.thirdPartyFee > 0 ? [{ label: 'Third-party fee', val: r.thirdPartyFee, note: `${(SHOPIFY_PLANS[plan].thirdPartyFee * 100).toFixed(1)}%` }] : []),
    { label: 'Currency conversion', val: r.conversionFee, note: internationalSales ? '2.0%' : '1.5%' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* LEFT: Inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1 block">Avg order value</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
              <input type="number" min="0" step="1" value={orderValue} onChange={(e) => setOrderValue(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full pl-5`} />
            </div>
          </div>
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1 block">Orders/month</label>
            <input type="number" min="1" step="1" value={monthlyOrders} onChange={(e) => setMonthlyOrders(parseInt(e.target.value) || 1)}
              className={`${inputCls} w-full`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Product cost</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">$</span>
              <input type="number" min="0" step="1" value={productCost} onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full pl-5`} />
            </div>
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Shipping cost</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">$</span>
              <input type="number" min="0" step="1" value={shippingCost} onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full pl-5`} />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-3 space-y-2">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Shopify plan</label>
            <select value={plan} onChange={(e) => setPlan(e.target.value)} className={`${selectCls} w-full`}>
              <option value="basic">Basic ($39/mo)</option>
              <option value="grow">Shopify / Grow ($105/mo)</option>
              <option value="advanced">Advanced ($399/mo)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Billing</label>
              <select value={billing} onChange={(e) => setBilling(e.target.value)} className={`${selectCls} w-full`}>
                <option value="monthly">Monthly</option>
                <option value="annual">Annual (save 24%)</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Payments</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className={`${selectCls} w-full`}>
                <option value="shopify">Shopify Payments</option>
                <option value="third-party">Third-party</option>
              </select>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer pt-1">
          <input type="checkbox" checked={internationalSales} onChange={(e) => setInternationalSales(e.target.checked)}
            className="w-3.5 h-3.5 accent-accent cursor-pointer" />
          <span className="text-[13px] text-text-primary">International sales (+2%)</span>
        </label>

        <p className="text-[10px] text-text-muted pt-1 border-t border-border">
          Based on Shopify fees as of 2026. Rates may vary.
        </p>
      </div>

      {/* RIGHT: Results */}
      <div className="space-y-3">
        {/* Hero */}
        <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-text-secondary">Monthly profit</p>
            <p className={`text-2xl sm:text-3xl font-bold font-mono leading-tight ${r.monthlyProfit >= 0 ? 'text-accent' : 'text-error'}`}>
              {fmt(r.monthlyProfit)}
            </p>
          </div>
          <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
            <p>Per order: <span className="font-mono">{fmt(r.profitPerOrder)}</span></p>
            <p>Plan: <span className="font-mono">{fmt(r.monthlyPlanCost)}/mo</span></p>
            <p>Break-even: <span className="font-mono">{r.breakEven} orders</span></p>
          </div>
        </div>

        {/* Per-order fee breakdown table */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Per-Order Fees</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary w-24">Rate</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Amount</th>
              </tr>
            </thead>
            <tbody>
              {feeRows.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-1.5 pr-2 text-text-secondary">{row.label}</td>
                  <td className="py-1.5 px-2 text-right text-text-muted text-[12px]">{row.note}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(row.val)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-border font-semibold">
                <td className="py-1.5 pr-2 text-text-primary" colSpan={2}>Total fees per order</td>
                <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(r.feesPerOrder)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Monthly summary table */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Monthly Summary</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-1.5 pr-2 text-text-secondary">Revenue ({monthlyOrders} orders)</td>
                <td className="py-1.5 px-2 text-right font-mono">{fmt(r.revenue)}</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-1.5 pr-2 text-text-secondary">Product costs</td>
                <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(r.totalProductCosts)}</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-1.5 pr-2 text-text-secondary">Shipping costs</td>
                <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(r.totalShippingCosts)}</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-1.5 pr-2 text-text-secondary">Transaction fees</td>
                <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(r.totalTransactionFees)}</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-1.5 pr-2 text-text-secondary">Shopify plan ({r.planName})</td>
                <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(r.monthlyPlanCost)}</td>
              </tr>
              <tr className={`border-t-2 border-border font-semibold ${r.monthlyProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <td className="py-1.5 pr-2 text-text-primary">Monthly profit</td>
                <td className={`py-1.5 px-2 text-right font-mono ${r.monthlyProfit >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {fmt(r.monthlyProfit)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Plan comparison table */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Plan Comparison</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Plan/mo</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Fee/order</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Profit/mo</th>
              </tr>
            </thead>
            <tbody>
              {planComp.map((c) => (
                <tr key={c.key} className={`border-b border-border/50 ${c.key === bestPlan.key ? 'bg-accent-muted' : ''}`}>
                  <td className="py-1.5 pr-2 text-text-secondary">
                    {c.name}
                    {c.key === bestPlan.key && <span className="ml-1.5 text-[10px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded">Best</span>}
                  </td>
                  <td className="py-1.5 px-2 text-right font-mono text-text-muted">{fmt(c.planCost)}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-text-muted">{fmt(c.feePerOrder)}</td>
                  <td className={`py-1.5 px-2 text-right font-mono font-semibold ${c.profit >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {fmt(c.profit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Effective rate */}
        <div className="bg-surface rounded-[var(--radius-card)] px-4 py-2.5 flex items-center justify-between">
          <span className="text-[13px] text-text-secondary">Effective total fee rate (incl. plan)</span>
          <span className="text-[15px] font-semibold font-mono text-text-primary">{r.effectiveRate.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
