'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CoinFlipButSmarter() {
  const [optionHeads, setOptionHeads] = useState('Heads');
  const [optionTails, setOptionTails] = useState('Tails');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [history, setHistory] = useState([]);

  const flip = () => {
    if (!optionHeads.trim() || !optionTails.trim()) return;

    setIsFlipping(true);
    setResult(null);
    setShowFeedback(false);

    // Simulate coin flip with CSS animation
    setTimeout(() => {
      const winner = Math.random() > 0.5 ? 'heads' : 'tails';
      setResult(winner);
      setIsFlipping(false);
      setTimeout(() => {
        setShowFeedback(true);
      }, 300);
    }, 2000);
  };

  const handleDisappointed = () => {
    const newResult = result === 'heads' ? 'tails' : 'heads';
    setResult(newResult);
    setShowFeedback(false);
    setTimeout(() => {
      setShowFeedback(true);
    }, 300);
  };

  const confirmResult = () => {
    const winner = result === 'heads' ? optionHeads : optionTails;
    setHistory([
      ...history,
      {
        heads: optionHeads,
        tails: optionTails,
        winner,
      },
    ]);
    reset();
  };

  const reset = () => {
    setOptionHeads('Heads');
    setOptionTails('Tails');
    setResult(null);
    setShowFeedback(false);
    setIsFlipping(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <Card className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4 text-center">
          Coin Flip But Smarter
        </h2>

        <div className="space-y-4 mb-6">
          <Input
            label="Heads = "
            placeholder="First option"
            value={optionHeads}
            onChange={(e) => setOptionHeads(e.target.value)}
          />
          <Input
            label="Tails = "
            placeholder="Second option"
            value={optionTails}
            onChange={(e) => setOptionTails(e.target.value)}
          />
        </div>

        <Button
          onClick={flip}
          variant="primary"
          className="w-full text-lg py-6"
          disabled={!optionHeads.trim() || !optionTails.trim() || isFlipping}
        >
          {isFlipping ? 'Flipping...' : 'Flip!'}
        </Button>
      </Card>

      {/* Coin Animation */}
      {isFlipping && (
        <Card className="mb-6 py-12 text-center bg-accent/5">
          <div className="flex justify-center">
            <div
              className="w-24 h-24 rounded-full bg-accent text-white flex items-center justify-center font-heading text-4xl font-bold animate-spin"
              style={{ animationDuration: '0.6s' }}
            >
              🪙
            </div>
          </div>
        </Card>
      )}

      {/* Result */}
      {result && !isFlipping && (
        <Card className="mb-6 bg-accent/5 border-accent/30">
          <div className="text-center">
            <div className="mb-4">
              <div className="text-6xl mb-2">
                {result === 'heads' ? 'H' : 'T'}
              </div>
              <p className="text-sm text-text-secondary mb-2 capitalize">
                {result} came up!
              </p>
            </div>

            <div className="py-4 border-y border-accent/20 mb-4">
              <p className="text-text-secondary text-sm mb-2">Your result:</p>
              <p className="font-heading text-3xl font-bold text-accent">
                {result === 'heads' ? optionHeads : optionTails}
              </p>
            </div>

            {showFeedback && (
              <div className="space-y-3">
                <p className="text-text-secondary text-sm">How do you feel?</p>
                <div className="flex gap-2">
                  <Button
                    onClick={confirmResult}
                    variant="primary"
                    className="flex-1"
                  >
                    I'm Happy!
                  </Button>
                  <Button
                    onClick={handleDisappointed}
                    variant="secondary"
                    className="flex-1"
                  >
                    I'm Disappointed
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Flip History */}
      {history.length > 0 && (
        <Card>
          <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
            History ({history.length})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.slice().reverse().map((flip, idx) => (
              <div key={idx} className="text-sm text-text-secondary bg-surface p-2 rounded">
                {flip.winner}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
