'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ChristmasGiftBudgetTracker() {
  const [recipients, setRecipients] = useState([
    { id: 1, name: 'Mum', budget: 30 },
    { id: 2, name: 'Dad', budget: 30 },
  ]);
  const [spent, setSpent] = useState({});
  const [newName, setNewName] = useState('');
  const [newBudget, setNewBudget] = useState('30');

  const addRecipient = () => {
    if (newName.trim()) {
      const newId = Math.max(...recipients.map(r => r.id), 0) + 1;
      setRecipients([...recipients, { id: newId, name: newName, budget: parseFloat(newBudget) || 30 }]);
      setNewName('');
      setNewBudget('30');
    }
  };

  const removeRecipient = (id) => {
    setRecipients(recipients.filter(r => r.id !== id));
    const newSpent = { ...spent };
    delete newSpent[id];
    setSpent(newSpent);
  };

  const updateSpent = (id, amount) => {
    setSpent(prev => ({
      ...prev,
      [id]: Math.max(0, amount)
    }));
  };

  const totalBudget = recipients.reduce((sum, r) => sum + r.budget, 0);
  const totalSpent = recipients.reduce((sum, r) => sum + (spent[r.id] || 0), 0);
  const remaining = totalBudget - totalSpent;

  const getStatus = (id) => {
    const recipient = recipients.find(r => r.id === id);
    const amount = spent[id] || 0;
    if (amount > recipient.budget) return 'error';
    if (amount > recipient.budget * 0.8) return 'warning';
    return 'success';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-accent text-white border border-accent rounded-[var(--radius-card)] p-6">
          <p className="text-sm opacity-90 mb-1">Total Budget</p>
          <p className="font-mono text-3xl font-bold">£{totalBudget.toFixed(2)}</p>
        </div>
        <div className={`border rounded-[var(--radius-card)] p-6 ${totalSpent <= totalBudget ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-sm font-medium mb-1 ${totalSpent <= totalBudget ? 'text-green-800' : 'text-red-800'}`}>Total Spent</p>
          <p className={`font-mono text-3xl font-bold ${totalSpent <= totalBudget ? 'text-green-800' : 'text-red-800'}`}>£{totalSpent.toFixed(2)}</p>
        </div>
        <div className={`border rounded-[var(--radius-card)] p-6 ${remaining >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-sm font-medium mb-1 ${remaining >= 0 ? 'text-green-800' : 'text-red-800'}`}>Remaining</p>
          <p className={`font-mono text-3xl font-bold ${remaining >= 0 ? 'text-green-800' : 'text-red-800'}`}>£{Math.abs(remaining).toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h3 className="font-heading text-base font-bold text-text-primary">Add Recipient</h3>
        <div className="space-y-3">
          <Input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name"
            className="w-full"
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-text-secondary text-xs font-medium mb-1">Budget</label>
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="30"
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addRecipient} className="bg-accent text-white">
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recipients.map((recipient) => {
          const amount = spent[recipient.id] || 0;
          const remaining = recipient.budget - amount;
          const percent = (amount / recipient.budget) * 100;
          const status = getStatus(recipient.id);

          return (
            <div key={recipient.id} className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-base font-bold text-text-primary">{recipient.name}</h4>
                <Button
                  onClick={() => removeRecipient(recipient.id)}
                  variant="ghost"
                  className="text-error text-sm"
                >
                  Remove
                </Button>
              </div>

              <div className="space-y-2">
                <label className="block text-text-secondary text-xs font-medium">Amount Spent</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => updateSpent(recipient.id, parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="font-mono text-lg font-bold text-text-primary">£{amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Budget: £{recipient.budget.toFixed(2)}</span>
                <span className={`font-mono font-bold ${status === 'success' ? 'text-green-800' : status === 'warning' ? 'text-yellow-800' : 'text-red-800'}`}>
                  £{remaining.toFixed(2)} remaining
                </span>
              </div>

              <div className="w-full bg-border rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    status === 'success' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
