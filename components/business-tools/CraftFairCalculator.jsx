'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

export default function CraftFairCalculator() {
  const [stallCost, setStallCost] = useState(50);
  const [travelMode, setTravelMode] = useState('distance');
  const [distance, setDistance] = useState(20);
  const [perMileRate, setPerMileRate] = useState(0.45);
  const [flatTravelCost, setFlatTravelCost] = useState(0);
  const [accommodation, setAccommodation] = useState(0);
  const [materialsCost, setMaterialsCost] = useState(100);
  const [itemsSold, setItemsSold] = useState(12);
  const [avgSellingPrice, setAvgSellingPrice] = useState(25);
  const [totalHours, setTotalHours] = useState(8);

  const calculations = useMemo(() => {
    const travelCost = travelMode === 'distance' ? distance * perMileRate * 2 : flatTravelCost;
    const totalCosts = stallCost + travelCost + accommodation + materialsCost;
    const revenue = itemsSold * avgSellingPrice;
    const profit = revenue - totalCosts;
    const hourlyRate = totalHours > 0 ? (profit / totalHours).toFixed(2) : 0;

    return {
      travelCost: travelCost.toFixed(2),
      totalCosts: totalCosts.toFixed(2),
      revenue: revenue.toFixed(2),
      profit: profit.toFixed(2),
      hourlyRate,
      profitMargin: revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0,
    };
  }, [stallCost, travelMode, distance, perMileRate, flatTravelCost, accommodation, materialsCost, itemsSold, avgSellingPrice, totalHours]);

  const profit = parseFloat(calculations.profit);
  const isProfitable = profit >= 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        {/* Stall Cost */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Stall/Table Cost £</label>
          <input
            type="number"
            value={stallCost}
            onChange={(e) => setStallCost(parseFloat(e.target.value) || 0)}
            className={inputCls}
            step="0.01"
          />
        </div>

        {/* Travel Cost */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Travel Cost Method</label>
          <select
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value)}
            className={selectCls}
          >
            <option value="distance">By Distance</option>
            <option value="flat">Flat Amount</option>
          </select>

          {travelMode === 'distance' ? (
            <>
              <div>
                <label className="text-[11px] text-text-muted">One-Way Distance (miles)</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
                  className={inputCls}
                  step="0.1"
                />
              </div>
              <div>
                <label className="text-[11px] text-text-muted">Cost per Mile £</label>
                <input
                  type="number"
                  value={perMileRate}
                  onChange={(e) => setPerMileRate(parseFloat(e.target.value) || 0)}
                  className={inputCls}
                  step="0.01"
                />
              </div>
              <p className="text-[11px] text-text-muted">Calculated as round trip: {(distance * 2).toFixed(1)} miles</p>
            </>
          ) : (
            <div>
              <label className="text-[11px] text-text-muted">Total Travel Cost £</label>
              <input
                type="number"
                value={flatTravelCost}
                onChange={(e) => setFlatTravelCost(parseFloat(e.target.value) || 0)}
                className={inputCls}
                step="0.01"
              />
            </div>
          )}
        </div>

        {/* Accommodation */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Accommodation (if overnight) £</label>
          <input
            type="number"
            value={accommodation}
            onChange={(e) => setAccommodation(parseFloat(e.target.value) || 0)}
            className={inputCls}
            step="0.01"
          />
        </div>

        {/* Materials Cost */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Stock/Materials Cost £</label>
          <input
            type="number"
            value={materialsCost}
            onChange={(e) => setMaterialsCost(parseFloat(e.target.value) || 0)}
            className={inputCls}
            step="0.01"
          />
        </div>

        {/* Sales */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <div>
            <label className="text-[11px] text-text-muted">Items Sold</label>
            <input
              type="number"
              value={itemsSold}
              onChange={(e) => setItemsSold(parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[11px] text-text-muted">Average Selling Price £</label>
            <input
              type="number"
              value={avgSellingPrice}
              onChange={(e) => setAvgSellingPrice(parseFloat(e.target.value) || 0)}
              className={inputCls}
              step="0.01"
            />
          </div>
        </div>

        {/* Time Spent */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Total Hours (setup, event, teardown)</label>
          <input
            type="number"
            value={totalHours}
            onChange={(e) => setTotalHours(parseFloat(e.target.value) || 0)}
            className={inputCls}
            step="0.5"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero */}
        <div className={`rounded-[12px] p-6 space-y-2 ${isProfitable ? 'bg-success/10' : 'bg-error/10'}`}>
          <div className="text-[13px] text-text-secondary">Profit</div>
          <div className={`font-heading font-bold text-[32px] ${isProfitable ? 'text-success' : 'text-error'}`}>
            £{calculations.profit}
          </div>
          <div className="text-[13px] text-text-secondary space-y-1 pt-2 border-t border-border/40">
            <div>Revenue: £{calculations.revenue}</div>
            <div>Total Costs: £{calculations.totalCosts}</div>
            <div>Hourly Rate: £{calculations.hourlyRate}/hr</div>
            <div>Profit Margin: {calculations.profitMargin}%</div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Costs</h3>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 text-text-secondary">Stall Cost</td>
                <td className="py-2 text-right font-mono text-text-primary">£{stallCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Travel</td>
                <td className="py-2 text-right font-mono text-text-primary">£{calculations.travelCost}</td>
              </tr>
              {accommodation > 0 && (
                <tr>
                  <td className="py-2 text-text-secondary">Accommodation</td>
                  <td className="py-2 text-right font-mono text-text-primary">£{accommodation.toFixed(2)}</td>
                </tr>
              )}
              <tr>
                <td className="py-2 text-text-secondary">Stock/Materials</td>
                <td className="py-2 text-right font-mono text-text-primary">£{materialsCost.toFixed(2)}</td>
              </tr>
              <tr className="border-t-2 border-error/30">
                <td className="py-2 text-text-primary font-bold">Total Costs</td>
                <td className="py-2 text-right font-mono font-bold text-text-primary">£{calculations.totalCosts}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Revenue & Profit */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Revenue & Profit</h3>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 text-text-secondary">Items Sold</td>
                <td className="py-2 text-right font-mono text-text-primary">{itemsSold}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Price per Item</td>
                <td className="py-2 text-right font-mono text-text-primary">£{avgSellingPrice.toFixed(2)}</td>
              </tr>
              <tr className="border-t-2 border-success/30">
                <td className="py-2 text-text-primary font-bold">Total Revenue</td>
                <td className="py-2 text-right font-mono font-bold text-success">£{calculations.revenue}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Profit</td>
                <td className={`py-2 text-right font-mono font-bold ${isProfitable ? 'text-success' : 'text-error'}`}>£{calculations.profit}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Time Value */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Time Value</h3>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 text-text-secondary">Total Hours</td>
                <td className="py-2 text-right font-mono text-text-primary">{totalHours}h</td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Profit per Hour</td>
                <td className={`py-2 text-right font-mono font-bold ${parseFloat(calculations.hourlyRate) >= 11.44 ? 'text-success' : 'text-warning'}`}>
                  £{calculations.hourlyRate}/hr
                </td>
              </tr>
              <tr className="text-[12px]">
                <td colSpan="2" className="py-2 text-text-muted">
                  {parseFloat(calculations.hourlyRate) >= 11.44
                    ? 'Above minimum wage (£11.44/hr)'
                    : `Below minimum wage by £${(11.44 - parseFloat(calculations.hourlyRate)).toFixed(2)}/hr`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
