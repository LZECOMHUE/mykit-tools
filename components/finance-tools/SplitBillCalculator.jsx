'use client';

import { useState, useMemo } from 'react';

export default function SplitBillCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [tipPercentage, setTipPercentage] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [mode, setMode] = useState('equal');
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemPeople, setNewItemPeople] = useState([]);

  const fmt = (n) =>
    '£' +
    n.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const currentTipPercentage = customTip ? parseFloat(customTip) : tipPercentage;

  const results = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const people = Math.max(1, parseInt(numberOfPeople) || 1);
    const tipAmount = (bill * currentTipPercentage) / 100;
    const total = bill + tipAmount;

    if (mode === 'equal') {
      const perPerson = total / people;
      return {
        tipAmount,
        total,
        perPerson,
        bill,
        split: Array(people)
          .fill(null)
          .map((_, i) => ({ person: i + 1, amount: perPerson })),
      };
    } else {
      const personAmounts = Array(people)
        .fill(null)
        .map(() => 0);
      let subtotal = 0;

      items.forEach((item) => {
        const pricePerPerson = item.price / item.people.length;
        item.people.forEach((personIdx) => {
          personAmounts[personIdx] += pricePerPerson;
        });
        subtotal += item.price;
      });

      const tipPerPerson = Array(people)
        .fill(null)
        .map(() => 0);
      const tipPerItem = (item) => {
        const itemTip = (item.price * currentTipPercentage) / 100;
        return itemTip / item.people.length;
      };

      items.forEach((item) => {
        const itemTip = tipPerItem(item);
        item.people.forEach((personIdx) => {
          tipPerPerson[personIdx] += itemTip;
        });
      });

      const split = personAmounts.map((amount, i) => ({
        person: i + 1,
        amount: amount + tipPerPerson[i],
      }));

      return {
        tipAmount,
        total,
        bill: subtotal,
        split,
        itemized: true,
      };
    }
  }, [billAmount, currentTipPercentage, numberOfPeople, mode, items]);

  const handleAddItem = () => {
    if (newItemName && newItemPrice && newItemPeople.length > 0) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItemName,
          price: parseFloat(newItemPrice),
          people: newItemPeople.map((p) => parseInt(p)),
        },
      ]);
      setNewItemName('');
      setNewItemPrice('');
      setNewItemPeople([]);
    }
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const togglePersonForItem = (personIdx) => {
    if (newItemPeople.includes(personIdx.toString())) {
      setNewItemPeople(
        newItemPeople.filter((p) => p !== personIdx.toString())
      );
    } else {
      setNewItemPeople([...newItemPeople, personIdx.toString()]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Mode Toggle */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <label className="block text-text-secondary text-sm font-medium mb-3">
          Split Mode
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('equal')}
            className={`flex-1 px-4 py-2 rounded-[8px] font-medium transition-colors ${
              mode === 'equal'
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:bg-surface'
            }`}
          >
            Equal Split
          </button>
          <button
            onClick={() => setMode('itemized')}
            className={`flex-1 px-4 py-2 rounded-[8px] font-medium transition-colors ${
              mode === 'itemized'
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:bg-surface'
            }`}
          >
            Itemised Split
          </button>
        </div>
      </div>

      {/* Basic Inputs */}
      <div className="space-y-4 bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Total Bill Amount
          </label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Number of People
          </label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            placeholder="2"
            min="1"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Tip Percentage
          </label>
          <div className="flex gap-2 flex-wrap mb-3">
            {[0, 10, 12.5, 15, 20].map((pct) => (
              <button
                key={pct}
                onClick={() => {
                  setCustomTip('');
                  setTipPercentage(pct);
                }}
                className={`px-3 py-2 rounded-[8px] font-medium transition-colors text-sm ${
                  !customTip && tipPercentage === pct
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <input
            type="number"
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
            placeholder="Custom %"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>
      </div>

      {/* Itemised Mode Inputs */}
      {mode === 'itemized' && (
        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <h3 className="text-text-primary font-semibold mb-4">Add Items</h3>
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="e.g. Appetisers"
                className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Who shares this item?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Array(Math.max(2, parseInt(numberOfPeople) || 2))
                  .fill(null)
                  .map((_, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={newItemPeople.includes(i.toString())}
                        onChange={() => togglePersonForItem(i)}
                        className="w-4 h-4 cursor-pointer accent-accent"
                      />
                      <span className="text-text-secondary text-sm">
                        Person {i + 1}
                      </span>
                    </label>
                  ))}
              </div>
            </div>

            <button
              onClick={handleAddItem}
              className="w-full px-4 py-2 bg-accent text-white rounded-[8px] font-medium hover:bg-accent hover:brightness-110 transition-all"
            >
              + Add Item
            </button>
          </div>

          {items.length > 0 && (
            <div>
              <h4 className="text-text-secondary text-sm font-medium mb-2">
                Items Added
              </h4>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 px-3 bg-white border border-border rounded-[8px]"
                  >
                    <div className="flex-1">
                      <p className="text-text-primary font-medium text-sm">
                        {item.name}
                      </p>
                      <p className="text-text-muted text-xs">
                        {item.people.length} person{item.people.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-text-primary font-semibold">
                        {fmt(item.price)}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-error hover:text-error hover:brightness-110 font-bold"
                      >
                        x
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Subtotal</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {fmt(results.bill)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Tip Amount</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {fmt(results.tipAmount)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Total (inc. tip)</p>
          <p className="font-mono text-3xl font-bold text-accent">
            {fmt(results.total)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Per Person</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {mode === 'equal'
              ? fmt(results.perPerson)
              : fmt(results.split[0]?.amount || 0)}
          </p>
        </div>
      </div>

      {/* Individual Breakdown */}
      {results.split && results.split.length > 0 && (
        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <h3 className="text-text-primary font-semibold mb-4">
            Who Pays What
          </h3>
          <div className="space-y-2">
            {results.split.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-3 px-4 bg-white border border-border rounded-[8px]"
              >
                <span className="text-text-primary font-medium">
                  Person {item.person}
                </span>
                <span className="font-mono text-lg font-bold text-accent">
                  {fmt(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
