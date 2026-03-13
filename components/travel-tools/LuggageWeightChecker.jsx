'use client';

import { useState, useMemo } from 'react';

const AIRLINES = {
  'British Airways': { economy: { carry: 7, checked: 23 }, premium: { carry: 7, checked: 32 } },
  'Ryanair': { economy: { carry: 10, checked: 0 }, premium: { carry: 10, checked: 20 } },
  'EasyJet': { economy: { carry: 7, checked: 15 }, premium: { carry: 7, checked: 27 } },
  'Lufthansa': { economy: { carry: 8, checked: 23 }, premium: { carry: 8, checked: 32 } },
  'Air France': { economy: { carry: 12, checked: 23 }, premium: { carry: 12, checked: 32 } },
  'KLM': { economy: { carry: 12, checked: 23 }, premium: { carry: 12, checked: 32 } },
  'United': { economy: { carry: 10, checked: 23 }, premium: { carry: 15, checked: 32 } },
  'Delta': { economy: { carry: 10, checked: 23 }, premium: { carry: 15, checked: 32 } },
  'American': { economy: { carry: 10, checked: 23 }, premium: { carry: 15, checked: 32 } },
  'Emirates': { economy: { carry: 7, checked: 30 }, premium: { carry: 15, checked: 40 } },
  'Qatar Airways': { economy: { carry: 7, checked: 30 }, premium: { carry: 15, checked: 40 } },
};

const ITEM_WEIGHTS = {
  'Laptop': 2,
  'Shoes (pair)': 0.5,
  'Jeans': 0.6,
  'T-shirt': 0.2,
  'Sweater': 0.4,
  'Jacket': 0.8,
  'Toiletries': 0.5,
  'Hairdryer': 0.6,
  'Phone': 0.2,
  'Camera': 0.5,
  'Chargers': 0.3,
  'Book': 0.4,
  'Water Bottle (full)': 1.2,
  'Tablet': 0.5,
};

export default function LuggageWeightChecker() {
  const [airline, setAirline] = useState('British Airways');
  const [flightClass, setFlightClass] = useState('economy');
  const [items, setItems] = useState([
    { name: 'Laptop', weight: 2, id: 1 }
  ]);
  const [nextId, setNextId] = useState(2);
  const [customItem, setCustomItem] = useState('');
  const [customWeight, setCustomWeight] = useState('');

  const allowances = useMemo(() => {
    return AIRLINES[airline][flightClass];
  }, [airline, flightClass]);

  const totals = useMemo(() => {
    const carryOnTotal = items
      .filter(item => item.type === 'carry')
      .reduce((sum, item) => sum + item.weight, 0);

    const checkedTotal = items
      .filter(item => item.type === 'checked')
      .reduce((sum, item) => sum + item.weight, 0);

    return { carryOnTotal, checkedTotal };
  }, [items]);

  const addItem = (name, weight, type = 'carry') => {
    setItems([...items, { name, weight: parseFloat(weight) || 0, id: nextId, type }]);
    setNextId(nextId + 1);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddCustom = () => {
    if (customItem.trim() && customWeight) {
      addItem(customItem, customWeight);
      setCustomItem('');
      setCustomWeight('');
    }
  };

  const carryItems = items.filter(item => item.type === 'carry');
  const checkedItems = items.filter(item => item.type === 'checked');

  return (
    <div className="w-full space-y-6">
      {/* Airline & Class */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Airline
          </label>
          <select
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {Object.keys(AIRLINES).map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Class
          </label>
          <select
            value={flightClass}
            onChange={(e) => setFlightClass(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="economy">Economy</option>
            <option value="premium">Premium/Business</option>
          </select>
        </div>
      </div>

      {/* Allowances */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
          <p className="text-text-secondary text-[11px] font-medium uppercase">
            Carry-on Limit
          </p>
          <p className="font-mono text-text-primary text-lg mt-1">
            {allowances.carry} kg
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
          <p className="text-text-secondary text-[11px] font-medium uppercase">
            Checked Limit
          </p>
          <p className="font-mono text-text-primary text-lg mt-1">
            {allowances.checked} kg
          </p>
        </div>
      </div>

      {/* Add Items */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
        <p className="text-text-secondary text-sm font-medium mb-3">
          Quick Add Items
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(ITEM_WEIGHTS).map(([name, weight]) => (
            <button
              key={name}
              onClick={() => addItem(name, weight, 'carry')}
              className="text-left rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-sm hover:bg-white transition-colors"
            >
              {name} ({weight}kg)
            </button>
          ))}
        </div>
      </div>

      {/* Custom Item */}
      <div className="space-y-2">
        <label className="text-text-secondary text-sm font-medium">
          Add Custom Item
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            placeholder="Item name"
            className="flex-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="number"
            value={customWeight}
            onChange={(e) => setCustomWeight(e.target.value)}
            placeholder="Weight (kg)"
            min="0"
            step="0.1"
            className="w-24 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleAddCustom}
            className="rounded-[var(--radius-card)] bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Carry-On Items */}
      {carryItems.length > 0 && (
        <div className="rounded-[var(--radius-card)] bg-blue-50 border border-accent p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-text-secondary text-sm font-medium">
              Carry-On Items
            </p>
            <div className={`font-mono font-bold ${totals.carryOnTotal > allowances.carry ? 'text-error' : 'text-text-primary'}`}>
              {totals.carryOnTotal.toFixed(1)} / {allowances.carry} kg
            </div>
          </div>
          <div className="space-y-2">
            {carryItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white rounded p-2">
                <span className="text-text-primary text-sm">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-text-secondary">{item.weight} kg</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-error hover:text-error-hover text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checked Items */}
      {checkedItems.length > 0 && (
        <div className="rounded-[var(--radius-card)] bg-green-50 border border-success p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-text-secondary text-sm font-medium">
              Checked Items
            </p>
            <div className={`font-mono font-bold ${totals.checkedTotal > allowances.checked ? 'text-error' : 'text-text-primary'}`}>
              {totals.checkedTotal.toFixed(1)} / {allowances.checked} kg
            </div>
          </div>
          <div className="space-y-2">
            {checkedItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white rounded p-2">
                <span className="text-text-primary text-sm">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-text-secondary">{item.weight} kg</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-error hover:text-error-hover text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
