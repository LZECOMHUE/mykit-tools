'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { HOUSEHOLD_TASKS } from '@/data/unpaid-work-wages';

const getTaskBalanceColor = (a, b) => {
  const total = a + b;
  if (total === 0) return 'bg-border';
  const percentA = (a / total) * 100;
  const diff = Math.abs(percentA - 50);
  if (diff > 30) return 'bg-error';
  if (diff > 15) return 'bg-warning';
  return 'bg-success';
};

export default function HouseholdTaskSplit() {
  const [partnerAName, setPartnerAName] = useState('Partner A');
  const [partnerBName, setPartnerBName] = useState('Partner B');
  const [tasks, setTasks] = useState(
    HOUSEHOLD_TASKS.reduce((acc, task) => {
      acc[task.id] = { a: 0, b: 0 };
      return acc;
    }, {})
  );
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const totalA = Object.values(tasks).reduce((sum, t) => sum + (t.a || 0), 0);
    const totalB = Object.values(tasks).reduce((sum, t) => sum + (t.b || 0), 0);
    const total = totalA + totalB;
    const percentA = total > 0 ? Math.round((totalA / total) * 100) : 50;
    const percentB = 100 - percentA;
    const fteA = (totalA / 40).toFixed(1);
    const fteB = (totalB / 40).toFixed(1);
    return { totalA, totalB, total, percentA, percentB, fteA, fteB };
  }, [tasks]);

  const handleTaskChange = (taskId, partner, value) => {
    const numValue = Math.max(0, Math.min(70, parseFloat(value) || 0));
    setTasks(prev => ({
      ...prev,
      [taskId]: { ...prev[taskId], [partner]: numValue }
    }));
  };

  const handleCopy = () => {
    const text = `Our household task split:\n${partnerAName}: ${stats.percentA}% (${stats.totalA.toFixed(1)} hours/week)\n${partnerBName}: ${stats.percentB}% (${stats.totalB.toFixed(1)} hours/week)\n\nmykit.tools/household-task-split`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Pill = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${active ? 'bg-accent text-white' : 'border border-border hover:bg-surface-hover text-text-primary'}`}>
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      {/* Framing message */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-4">
        <p className="text-xs text-text-secondary leading-relaxed">
          This tool is for reflection and conversation, not blame. Most households have an imbalance. Seeing it clearly is the first step towards more equitable distribution.
        </p>
      </div>

      {/* Partner names - compact inline */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Partner 1</p>
          <input
            type="text"
            value={partnerAName}
            onChange={(e) => setPartnerAName(e.target.value)}
            maxLength="20"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-background text-text-primary"
            placeholder="Name"
          />
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Partner 2</p>
          <input
            type="text"
            value={partnerBName}
            onChange={(e) => setPartnerBName(e.target.value)}
            maxLength="20"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-background text-text-primary"
            placeholder="Name"
          />
        </div>
      </div>

      {/* Big split headline + stats side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-heading text-3xl sm:text-4xl font-bold text-accent">
                {stats.percentA}%
              </div>
              <p className="text-text-secondary text-xs mt-0.5">{partnerAName}</p>
              <p className="text-text-muted text-[10px] mt-1 font-mono">
                {stats.totalA.toFixed(1)} hrs/wk
              </p>
            </div>
            <div>
              <div className="font-heading text-3xl sm:text-4xl font-bold text-accent">
                {stats.percentB}%
              </div>
              <p className="text-text-secondary text-xs mt-0.5">{partnerBName}</p>
              <p className="text-text-muted text-[10px] mt-1 font-mono">
                {stats.totalB.toFixed(1)} hrs/wk
              </p>
            </div>
          </div>

          {/* Balance bar */}
          <div className="mt-4 h-2 bg-border rounded-full overflow-hidden flex">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${stats.percentA}%` }}
            />
            <div
              className="h-full bg-warning transition-all duration-300"
              style={{ width: `${stats.percentB}%` }}
            />
          </div>

          {/* FTE stats inline */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs mt-4">
            <span className="text-text-primary">
              <span className="font-mono font-bold">{stats.fteA}</span>
              <span className="text-text-muted ml-1">FTE - {partnerAName}</span>
            </span>
            <span className="text-text-primary">
              <span className="font-mono font-bold">{stats.fteB}</span>
              <span className="text-text-muted ml-1">FTE - {partnerBName}</span>
            </span>
          </div>
        </div>

        {/* Balance indicator */}
        <div className="flex flex-col items-center justify-center bg-surface rounded-xl border border-border p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Balance</p>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-bold text-white ${getTaskBalanceColor(stats.totalA, stats.totalB)}`}>
            {Math.abs(stats.percentA - stats.percentB)}%
          </div>
          <p className="text-text-muted text-[10px] mt-2">difference</p>
        </div>
      </div>

      {/* Compact task table */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-hover">
                <th className="text-left py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Task</th>
                <th className="text-center py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">{partnerAName}</th>
                <th className="text-center py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">{partnerBName}</th>
                <th className="text-center py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Balance</th>
              </tr>
            </thead>
            <tbody>
              {HOUSEHOLD_TASKS.map((task) => (
                <tr key={task.id} className="border-t border-border/50 hover:bg-surface-hover/50">
                  <td className="py-2 px-3 text-text-primary font-medium">{task.name}</td>
                  <td className="py-2 px-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max="70"
                      step="0.5"
                      value={tasks[task.id].a}
                      onChange={(e) => handleTaskChange(task.id, 'a', e.target.value)}
                      className="w-12 py-1 px-1.5 border border-border rounded text-center font-mono text-xs bg-background focus:ring-1 focus:ring-accent focus:border-accent"
                      placeholder="0"
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max="70"
                      step="0.5"
                      value={tasks[task.id].b}
                      onChange={(e) => handleTaskChange(task.id, 'b', e.target.value)}
                      className="w-12 py-1 px-1.5 border border-border rounded text-center font-mono text-xs bg-background focus:ring-1 focus:ring-accent focus:border-accent"
                      placeholder="0"
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    {tasks[task.id].a + tasks[task.id].b > 0 && (
                      <div className="h-4 bg-border rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getTaskBalanceColor(tasks[task.id].a, tasks[task.id].b)} transition-all duration-300`}
                          style={{ width: `${(tasks[task.id].a / (tasks[task.id].a + tasks[task.id].b)) * 100}%` }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Share buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="primary" size="sm" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy summary'}
        </Button>
        <Button
          as="a"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Our household task split:\n${partnerAName}: ${stats.percentA}%\n${partnerBName}: ${stats.percentB}%\n\nmykit.tools/household-task-split`)}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
        >
          Share on X
        </Button>
      </div>

      <p className="text-center text-[10px] text-text-muted mt-4">
        Remember: Conversations about fairness are more valuable than perfect numbers.
      </p>
    </div>
  );
}
