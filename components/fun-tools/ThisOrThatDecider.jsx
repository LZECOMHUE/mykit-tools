'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ThisOrThatDecider() {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const decide = () => {
    if (!optionA.trim() || !optionB.trim()) return;

    setIsFlipping(true);
    setResult(null);
    setShowFeedback(false);

    // 3-second countdown animation
    setTimeout(() => {
      const winner = Math.random() > 0.5 ? 'A' : 'B';
      setResult(winner);
      setIsFlipping(false);
      setTimeout(() => {
        setShowFeedback(true);
      }, 500);
    }, 3000);
  };

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
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <Card className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4 text-center">
          This or That?
        </h2>

        <div className="space-y-4 mb-6">
          <Input
            label="Option A"
            placeholder="e.g., Coffee"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
          />
          <Input
            label="Option B"
            placeholder="e.g., Tea"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
          />
        </div>

        <Button
          onClick={decide}
          variant="primary"
          className="w-full"
          disabled={!optionA.trim() || !optionB.trim() || isFlipping}
        >
          {isFlipping ? 'Deciding...' : 'Decide!'}
        </Button>
      </Card>

      {/* Countdown Animation */}
      {isFlipping && (
        <Card className="mb-6 text-center py-12 bg-accent/5">
          <div className="space-y-4">
            <p className="text-text-secondary text-sm">Deciding...</p>
            <div className="font-heading text-6xl font-bold text-accent animate-pulse">
              ✨
            </div>
          </div>
        </Card>
      )}

      {/* Result */}
      {result && !isFlipping && (
        <Card className="mb-6 bg-accent/5 border-accent/30">
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-2">The Winner Is...</p>
            <div className="font-heading text-5xl font-bold text-accent mb-4">
              {result === 'A' ? optionA : optionB}
            </div>

            {showFeedback && (
              <div className="mt-6 pt-6 border-t border-accent/20 space-y-3">
                <p className="text-text-secondary text-sm">How do you feel about this?</p>
                <div className="flex gap-2 sm:gap-3">
                  <Button
                    onClick={() => {
                      reset();
                    }}
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
        </Card>
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
