'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

const formatLimits = {
  commander: 100,
  standard: 60,
  modern: 60,
  pioneer: 60,
  legacy: 60,
  pauper: 60,
};

const categoryOptions = ['Land', 'Creature', 'Spell', 'Other'];

export default function MtgDeckCostCalculator() {
  const [format, setFormat] = useState('commander');
  const [cards, setCards] = useState([
    { id: 1, name: 'Island', quantity: 25, pricePerCard: 0.50, category: 'Land' },
  ]);
  const [nextId, setNextId] = useState(2);

  const addCard = () => {
    setCards([...cards, { id: nextId, name: '', quantity: 1, pricePerCard: 0, category: 'Spell' }]);
    setNextId(nextId + 1);
  };

  const updateCard = (id, field, value) => {
    setCards(cards.map(c =>
      c.id === id
        ? {
            ...c,
            [field]:
              field === 'name' || field === 'category'
                ? value
                : parseFloat(value) || 0,
          }
        : c
    ));
  };

  const removeCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const calculations = useMemo(() => {
    const totalCards = cards.reduce((sum, c) => sum + c.quantity, 0);
    const totalCost = cards.reduce(
      (sum, c) => sum + c.quantity * c.pricePerCard,
      0
    );

    const categoryBreakdown = {};
    cards.forEach(c => {
      if (!categoryBreakdown[c.category]) {
        categoryBreakdown[c.category] = { count: 0, cost: 0 };
      }
      categoryBreakdown[c.category].count += c.quantity;
      categoryBreakdown[c.category].cost += c.quantity * c.pricePerCard;
    });

    const sortedCards = [...cards].sort(
      (a, b) => b.quantity * b.pricePerCard - a.quantity * a.pricePerCard
    );

    const avgCostPerCard = totalCards > 0 ? (totalCost / totalCards).toFixed(2) : 0;

    return {
      totalCards,
      totalCost: totalCost.toFixed(2),
      formatLimit: formatLimits[format],
      categoryBreakdown,
      sortedCards,
      avgCostPerCard,
    };
  }, [cards, format]);

  const cardsOver = Math.max(0, calculations.totalCards - calculations.formatLimit);
  const cardStatus = calculations.totalCards === calculations.formatLimit
    ? 'Perfect'
    : calculations.totalCards < calculations.formatLimit
      ? `Need ${calculations.formatLimit - calculations.totalCards} more`
      : `Over by ${cardsOver}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        {/* Format Select */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Deck Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className={selectCls}
          >
            {Object.entries(formatLimits).map(([key, limit]) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} ({limit} cards)
              </option>
            ))}
          </select>
        </div>

        {/* Cards List */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Cards</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {cards.map(card => (
              <div key={card.id} className="space-y-1 pb-2 border-b border-border last:border-b-0">
                <input
                  type="text"
                  placeholder="Card name"
                  value={card.name}
                  onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                  className={inputCls}
                />
                <div className="grid grid-cols-3 gap-1">
                  <div>
                    <label className="text-[10px] text-text-muted">Qty</label>
                    <input
                      type="number"
                      value={card.quantity || ''}
                      onChange={(e) => updateCard(card.id, 'quantity', e.target.value)}
                      className={inputCls}
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-text-muted">Price ea</label>
                    <input
                      type="number"
                      value={card.pricePerCard || ''}
                      onChange={(e) => updateCard(card.id, 'pricePerCard', e.target.value)}
                      className={inputCls}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-text-muted">Type</label>
                    <select
                      value={card.category}
                      onChange={(e) => updateCard(card.id, 'category', e.target.value)}
                      className={selectCls}
                    >
                      {categoryOptions.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => removeCard(card.id)}
                  className="text-[12px] text-error hover:text-error/80 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addCard}
            className="w-full text-[13px] font-medium py-2 rounded-[8px] border border-accent text-accent hover:bg-accent-muted"
          >
            + Add Card
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero */}
        <div className="bg-accent-muted rounded-[12px] space-y-2">
          <div className="text-[13px] text-text-secondary">Total Deck Cost</div>
          <div className="font-heading font-bold text-[32px] text-text-primary">
            £{calculations.totalCost}
          </div>
          <div className="text-[13px] text-text-secondary space-y-1 pt-2 border-t border-border/40">
            <div>Total Cards: {calculations.totalCards} / {calculations.formatLimit}</div>
            <div>Status: <span className={calculations.totalCards > calculations.formatLimit ? 'text-error' : calculations.totalCards === calculations.formatLimit ? 'text-success' : 'text-warning'}>{cardStatus}</span></div>
            <div>Average Cost per Card: £{calculations.avgCostPerCard}</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">By Type</h3>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-border">
              {Object.entries(calculations.categoryBreakdown)
                .sort(([, a], [, b]) => b.count - a.count)
                .map(([category, data]) => (
                  <tr key={category}>
                    <td className="py-2 text-text-secondary">{category}</td>
                    <td className="py-2 text-right font-mono text-text-primary">{data.count} cards</td>
                    <td className="py-2 text-right font-mono text-text-primary">£{data.cost.toFixed(2)}</td>
                  </tr>
                ))}
              <tr className="border-t-2 border-accent/30">
                <td className="py-2 text-text-primary font-bold">Total</td>
                <td className="py-2 text-right font-mono text-text-primary">{calculations.totalCards}</td>
                <td className="py-2 text-right font-mono font-bold text-text-primary">£{calculations.totalCost}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Expensive Cards */}
        {calculations.sortedCards.length > 0 && (
          <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
            <h3 className="font-heading font-bold text-[14px] text-text-primary">Most Expensive Cards</h3>
            <table className="w-full text-[13px]">
              <tbody className="divide-y divide-border">
                {calculations.sortedCards
                  .slice(0, 10)
                  .filter(c => c.quantity * c.pricePerCard > 0)
                  .map((card, idx) => (
                    <tr key={idx}>
                      <td className="py-2 text-text-primary truncate">{card.name}</td>
                      <td className="py-2 text-right text-text-secondary font-mono text-[12px]">
                        {card.quantity}x £{card.pricePerCard.toFixed(2)}
                      </td>
                      <td className="py-2 text-right font-mono text-text-primary">
                        £{(card.quantity * card.pricePerCard).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Format Status */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Format Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Cards</span>
              <span className={`font-mono ${calculations.totalCards === calculations.formatLimit ? 'text-success' : calculations.totalCards > calculations.formatLimit ? 'text-error' : 'text-warning'}`}>
                {calculations.totalCards} / {calculations.formatLimit}
              </span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full ${calculations.totalCards > calculations.formatLimit ? 'bg-error' : calculations.totalCards === calculations.formatLimit ? 'bg-success' : 'bg-warning'}`}
                style={{
                  width: `${Math.min((calculations.totalCards / calculations.formatLimit) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <div className="text-[12px] text-text-secondary">
              {calculations.totalCards === calculations.formatLimit
                ? 'Deck is legal'
                : calculations.totalCards < calculations.formatLimit
                  ? `Add ${calculations.formatLimit - calculations.totalCards} more cards`
                  : `Remove ${cardsOver} cards to be legal`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
