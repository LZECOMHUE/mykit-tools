'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function ThisOrThatDecider() {
  const [optionA, setOptionA] = useState('Pizza');
  const [optionB, setOptionB] = useState('Tacos');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const decide = () => {
    if (!optionA.trim() || !optionB.trim()) return;

    setIsFlipping(true);
    setResult(null);
    setShowFeedback(false);

    setTimeout(() => {
      const winner = Math.random() > 0.5 ? 'A' : 'B';
      setResult(winner);
      setIsFlipping(false);
      setTimeout(() => {
        setShowFeedback(true);
      }, 500);
    }, 3000);
  };

  useEffect(() => {
    const winner = Math.random() > 0.5 ? 'A' : 'B';
    setResult(winner);
    setShowFeedback(true);
  }, []);

  const handleDisappointed = () => {
    const winner = result === 'A' ? 'B' : 'A';
    setResult(winner);
    setShowFeedback(false);
    setTimeout(() => {
      setShowFeedback(true);
    }, 300);
  };

  const reset = () => {
    setOptionA('');
    setOptionB('');
    setResult(null);
    setShowFeedback(false);
    setIsFlipping(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4 space-y-3">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-text-primary text-xs font-medium mb-1">Option A</label>
          <input
            type="text"
            placeholder="e.g., Pizza"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        <span className="text-text-muted text-sm font-medium pb-2">vs</span>
        <div className="flex-1">
          <label className="block text-text-primary text-xs font-medium mb-1">Option B</label>
          <input
            type="text"
            placeholder="e.g., Tacos"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
      </div>

      <Button
        onClick={decide}
        variant="primary"
        className="w-full"
        disabled={!optionA.trim() || !optionB.trim() || isFlipping}
      >
        {isFlipping ? 'Deciding...' : 'Decide!'}
      </Button>

      {/* Countdown Animation */}
      {isFlipping && (
        <div className="text-center py-12 bg-accent/5 rounded-[var(--radius-card)]">
          <p className="text-text-secondary text-sm">Deciding...</p>
          <div className="font-heading text-6xl font-bold text-accent animate-pulse mt-4">
            ✨
          </div>
        </div>
      )}

      {/* Result */}
      {result && !isFlipping && (
        <div className="bg-accent/5 border border-accent/30 rounded-[var(--radius-card)] text-center">
          <p className="text-text-secondary text-sm mb-2">The Winner Is...</p>
          <div className="font-heading text-5xl font-bold text-accent mb-4">
            {result === 'A' ? optionA : optionB}
          </div>

          {showFeedback && (
            <div className="mt-4 pt-4 border-t border-accent/20 space-y-3">
              <p className="text-text-secondary text-sm">How do you feel about this?</p>
              <div className="flex gap-2 sm:gap-3">
                <Button
                  onClick={() => { reset(); }}
                  variant="primary"
                  className="flex-1"
                >
                  Great!
                </Button>
                <Button
                  onClick={handleDisappointed}
                  variant="secondary"
                  className="flex-1"
                >
                  Actually, {result === 'A' ? optionB : optionA}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reset Button */}
      {result && (
        <Button onClick={reset} variant="secondary" className="w-full">
          Try Again
        </Button>
      )}
    </div>
  );
}
