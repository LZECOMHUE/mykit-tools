'use client';

import { useState, useEffect, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

const hobbies = [
  'Running', 'Cycling', 'Photography', 'Knitting', '3D Printing',
  'Painting', 'Gardening', 'Baking', 'Fishing', 'Golf',
  'Climbing', 'Gaming', 'Music', 'Woodworking', 'Custom'
];

const categories = ['Equipment', 'Materials', 'Subscriptions', 'Courses', 'Events', 'Travel', 'Clothing', 'Other'];

export default function HobbyCostTracker() {
  const [selectedHobby, setSelectedHobby] = useState('Running');
  const [purchases, setPurchases] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    itemName: '',
    category: 'Equipment',
    amount: 0,
  });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`hobby-tracker-${selectedHobby}`);
    if (stored) {
      try {
        setPurchases(JSON.parse(stored));
      } catch {
        setPurchases([]);
      }
    } else {
      setPurchases([]);
    }
  }, [selectedHobby]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`hobby-tracker-${selectedHobby}`, JSON.stringify(purchases));
  }, [purchases, selectedHobby]);

  const addPurchase = () => {
    if (formData.itemName && formData.amount > 0) {
      setPurchases([
        ...purchases,
        {
          id: Date.now(),
          date: formData.date,
          itemName: formData.itemName,
          category: formData.category,
          amount: parseFloat(formData.amount),
        },
      ]);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        itemName: '',
        category: 'Equipment',
        amount: 0,
      });
    }
  };

  const removePurchase = (id) => {
    setPurchases(purchases.filter(p => p.id !== id));
  };

  const calculations = useMemo(() => {
    const totalSpent = purchases.reduce((sum, p) => sum + p.amount, 0);

    // By category
    const byCategory = {};
    purchases.forEach(p => {
      if (!byCategory[p.category]) {
        byCategory[p.category] = { count: 0, total: 0 };
      }
      byCategory[p.category].count += 1;
      byCategory[p.category].total += p.amount;
    });

    // By month
    const byMonth = {};
    purchases.forEach(p => {
      const month = p.date.substring(0, 7);
      if (!byMonth[month]) {
        byMonth[month] = 0;
      }
      byMonth[month] += p.amount;
    });

    // This year
    const currentYear = new Date().getFullYear().toString();
    const thisYearTotal = purchases
      .filter(p => p.date.startsWith(currentYear))
      .reduce((sum, p) => sum + p.amount, 0);

    // Most expensive category
    let maxCategory = '';
    let maxAmount = 0;
    Object.entries(byCategory).forEach(([cat, data]) => {
      if (data.total > maxAmount) {
        maxAmount = data.total;
        maxCategory = cat;
      }
    });

    return {
      totalSpent: totalSpent.toFixed(2),
      thisYearTotal: thisYearTotal.toFixed(2),
      byCategory,
      byMonth,
      maxCategory,
      maxAmount: maxAmount.toFixed(2),
      purchaseCount: purchases.length,
    };
  }, [purchases]);

  const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get category percentages
  const categoryPercentages = {};
  const categoryTotal = Object.values(calculations.byCategory).reduce((sum, c) => sum + c.total, 0);
  Object.entries(calculations.byCategory).forEach(([cat, data]) => {
    categoryPercentages[cat] = categoryTotal > 0 ? ((data.total / categoryTotal) * 100).toFixed(0) : 0;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        {/* Hobby Select */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Select Hobby</label>
          <select
            value={selectedHobby}
            onChange={(e) => setSelectedHobby(e.target.value)}
            className={selectCls}
          >
            {hobbies.map(hobby => (
              <option key={hobby} value={hobby}>{hobby}</option>
            ))}
          </select>
        </div>

        {/* Add Purchase Form */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Add Purchase</h3>

          <div>
            <label className="text-[11px] text-text-muted">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={inputCls}
            />
          </div>

          <div>
            <label className="text-[11px] text-text-muted">Item Name</label>
            <input
              type="text"
              placeholder="e.g., Running shoes"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              className={inputCls}
            />
          </div>

          <div>
            <label className="text-[11px] text-text-muted">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={selectCls}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-text-muted">Amount £</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.amount || ''}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className={inputCls}
              step="0.01"
            />
          </div>

          <button
            onClick={addPurchase}
            className="w-full text-[13px] font-medium py-2 rounded-[8px] bg-accent text-white hover:bg-accent-hover"
          >
            Add Purchase
          </button>
        </div>

        {/* Recent Purchases List */}
        {sortedPurchases.length > 0 && (
          <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
            <h3 className="font-heading font-bold text-[14px] text-text-primary">Recent</h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {sortedPurchases.slice(0, 10).map(purchase => (
                <div key={purchase.id} className="flex items-start justify-between gap-2 pb-2 border-b border-border last:border-b-0">
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-text-primary truncate">{purchase.itemName}</div>
                    <div className="text-[10px] text-text-muted">{purchase.date}</div>
                  </div>
                  <button
                    onClick={() => removePurchase(purchase.id)}
                    className="text-[11px] text-error hover:text-error/80"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero */}
        <div className="bg-accent-muted rounded-[12px] space-y-2">
          <div className="text-[13px] text-text-secondary">Total Spent on {selectedHobby}</div>
          <div className="font-heading font-bold text-[32px] text-text-primary">
            £{calculations.totalSpent}
          </div>
          <div className="text-[13px] text-text-secondary space-y-1 pt-2 border-t border-border/40">
            <div>This Year: £{calculations.thisYearTotal}</div>
            <div>Purchases: {calculations.purchaseCount}</div>
            {calculations.maxCategory && (
              <div>Biggest Spend: {calculations.maxCategory} (£{calculations.maxAmount})</div>
            )}
          </div>
        </div>

        {/* By Category */}
        {Object.keys(calculations.byCategory).length > 0 && (
          <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
            <h3 className="font-heading font-bold text-[14px] text-text-primary">By Category</h3>
            <div className="space-y-3">
              {Object.entries(calculations.byCategory)
                .sort(([, a], [, b]) => b.total - a.total)
                .map(([category, data]) => (
                  <div key={category}>
                    <div className="flex justify-between text-[13px] mb-1">
                      <span className="text-text-secondary">{category}</span>
                      <span className="font-mono text-text-primary">
                        £{data.total.toFixed(2)} ({categoryPercentages[category]}%)
                      </span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="bg-accent"
                        style={{
                          width: `${categoryPercentages[category]}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        {Object.keys(calculations.byCategory).length > 0 && (
          <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
            <h3 className="font-heading font-bold text-[14px] text-text-primary">Category Breakdown</h3>
            <table className="w-full text-[13px]">
              <tbody className="divide-y divide-border">
                {Object.entries(calculations.byCategory)
                  .sort(([, a], [, b]) => b.total - a.total)
                  .map(([category, data]) => (
                    <tr key={category}>
                      <td className="py-2 text-text-secondary">{category}</td>
                      <td className="py-2 text-right text-text-secondary font-mono text-[12px]">{data.count} item{data.count !== 1 ? 's' : ''}</td>
                      <td className="py-2 text-right font-mono text-text-primary font-bold">£{data.total.toFixed(2)}</td>
                    </tr>
                  ))}
                <tr className="border-t-2 border-accent/30">
                  <td className="py-2 text-text-primary font-bold">Total</td>
                  <td className="py-2 text-right font-mono text-text-primary font-bold">{calculations.purchaseCount}</td>
                  <td className="py-2 text-right font-mono text-text-primary font-bold text-[14px]">£{calculations.totalSpent}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* All Purchases */}
        {sortedPurchases.length > 0 && (
          <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
            <h3 className="font-heading font-bold text-[14px] text-text-primary">All Purchases</h3>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-[13px]">
                <tbody className="divide-y divide-border">
                  {sortedPurchases.map(purchase => (
                    <tr key={purchase.id} className="hover:bg-background/50">
                      <td className="py-2 text-text-primary">{purchase.itemName}</td>
                      <td className="py-2 text-right text-text-secondary font-mono text-[12px]">{purchase.date}</td>
                      <td className="py-2 text-right text-text-secondary font-mono text-[12px]">{purchase.category}</td>
                      <td className="py-2 text-right font-mono text-text-primary font-bold">£{purchase.amount.toFixed(2)}</td>
                      <td className="py-2 text-right">
                        <button
                          onClick={() => removePurchase(purchase.id)}
                          className="text-error hover:text-error/80 text-[12px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {purchases.length === 0 && (
          <div className="bg-surface rounded-[12px] border border-border text-center">
            <p className="text-[13px] text-text-muted">No purchases tracked yet. Add your first purchase to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
