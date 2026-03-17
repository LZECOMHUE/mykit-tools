'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PriorityRanker() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [comparisons, setComparisons] = useState(null);
  const [wins, setWins] = useState({});

  const addItem = () => {
    if (newItem.trim() && items.length < 10) {
      setItems([...items, newItem]);
      setNewItem('');
      if (comparisons !== null) {
        setComparisons(null);
        setWins({});
      }
    }
  };

  const removeItem = (index) => {
    const removed = items[index];
    setItems(items.filter((_, i) => i !== index));
    const newWins = { ...wins };
    delete newWins[removed];
    setWins(newWins);
  };

  const startRanking = () => {
    if (items.length >= 3) {
      const newWins = {};
      items.forEach((item) => {
        newWins[item] = 0;
      });
      setWins(newWins);
      setComparisons(0);
    }
  };

  // Get pairwise comparisons
  const comparisonPairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        pairs.push([items[i], items[j]]);
      }
    }
    return pairs;
  }, [items]);

  const totalComparisons = comparisonPairs.length;

  const recordVote = (winner) => {
    const newWins = { ...wins };
    newWins[winner] = (newWins[winner] || 0) + 1;
    setWins(newWins);

    if (comparisons < totalComparisons - 1) {
      setComparisons(comparisons + 1);
    } else {
      setComparisons(null);
    }
  };

  const rankedItems = Object.entries(wins)
    .map(([item, winCount]) => ({ item, winCount }))
    .sort((a, b) => b.winCount - a.winCount);

  const reset = () => {
    setComparisons(null);
    setWins({});
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <Card className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
          Priority Ranker
        </h2>
        <p className="text-text-secondary text-sm mb-4">
          Add 3-10 items and we'll rank them based on pairwise comparisons
        </p>

        <div className="space-y-3 mb-4">
          <Input
            label="Add item"
            placeholder="e.g., Learn Spanish"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') addItem();
            }}
          />
          <Button onClick={addItem} variant="primary" className="w-full">
            Add Item
          </Button>
        </div>

        {items.length > 0 && (
          <div className="space-y-2 mb-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-surface rounded-lg"
              >
                <span className="text-text-primary font-medium">{item}</span>
                <button
                  onClick={() => removeItem(idx)}
                  className="text-error hover:text-error/70 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length >= 3 && comparisons === null && (
          <Button onClick={startRanking} variant="primary" className="w-full">
            Start Ranking ({totalComparisons} comparisons)
          </Button>
        )}
      </Card>

      {/* Comparison UI */}
      {comparisons !== null && comparisonPairs[comparisons] && (
        <Card className="mb-6 bg-accent/5">
          <div className="mb-4">
            <p className="text-text-secondary text-sm mb-2">
              Question {comparisons + 1} of {totalComparisons}
            </p>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${((comparisons + 1) / totalComparisons) * 100}%` }}
              />
            </div>
          </div>

          <p className="text-text-primary text-center font-medium mb-6">
            Which is more important?
          </p>

          <div className="flex gap-3">
            <Button
              onClick={() => recordVote(comparisonPairs[comparisons][0])}
              variant="primary"
              className="flex-1 text-center py-6"
            >
              <span className="block">{comparisonPairs[comparisons][0]}</span>
            </Button>
            <Button
              onClick={() => recordVote(comparisonPairs[comparisons][1])}
              variant="primary"
              className="flex-1 text-center py-6"
            >
              <span className="block">{comparisonPairs[comparisons][1]}</span>
            </Button>
          </div>
        </Card>
      )}

      {/* Results */}
      {comparisons === null && Object.keys(wins).length > 0 && (
        <Card className="mb-6">
          <h3 className="font-heading text-xl font-bold text-text-primary mb-4">Rankings</h3>

          <div className="space-y-3 mb-6">
            {rankedItems.map((item, idx) => (
              <div
                key={item.item}
                className="flex items-center justify-between p-3 bg-surface rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading text-lg font-bold text-accent">
                    #{idx + 1}
                  </span>
                  <span className="text-text-primary font-medium">{item.item}</span>
                </div>
                <span className="font-mono text-sm text-text-secondary">
                  {item.winCount} wins
                </span>
              </div>
            ))}
          </div>

          <Button onClick={reset} variant="secondary" className="w-full">
            Reset
          </Button>
        </Card>
      )}
    </div>
  );
}
