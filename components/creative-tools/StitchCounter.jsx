'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function StitchCounter() {
  const [rowCount, setRowCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('stitch-counter-rows');
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  const [stitchCount, setStitchCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('stitch-counter-stitches');
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  const [lastAction, setLastAction] = useState(null);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('stitch-counter-rows', rowCount.toString());
  }, [rowCount]);

  useEffect(() => {
    localStorage.setItem('stitch-counter-stitches', stitchCount.toString());
  }, [stitchCount]);

  const handleRowTap = () => {
    setRowCount(c => c + 1);
    setLastAction({ type: 'row', time: Date.now() });
    setTimeout(() => setLastAction(null), 2000);
  };

  const handleStitchTap = () => {
    setStitchCount(c => c + 1);
    setLastAction({ type: 'stitch', time: Date.now() });
    setTimeout(() => setLastAction(null), 2000);
  };

  const handleRowUndo = () => {
    if (rowCount > 0) {
      setRowCount(c => c - 1);
      setLastAction({ type: 'row-undo', time: Date.now() });
      setTimeout(() => setLastAction(null), 2000);
    }
  };

  const handleStitchUndo = () => {
    if (stitchCount > 0) {
      setStitchCount(c => c - 1);
      setLastAction({ type: 'stitch-undo', time: Date.now() });
      setTimeout(() => setLastAction(null), 2000);
    }
  };

  const handleReset = () => {
    if (confirm('Reset both counters? This cannot be undone.')) {
      setRowCount(0);
      setStitchCount(0);
      setLastAction({ type: 'reset', time: Date.now() });
      setTimeout(() => setLastAction(null), 2000);
    }
  };

  return (
    <div className="w-full bg-white flex flex-col p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <p className="text-text-secondary text-sm">Tap to count rows and stitches while you knit</p>
      </div>

      {/* Two Column Layout for Desktop, Stacked for Mobile */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
        {/* Row Counter */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center mb-4">
            <p className="text-text-secondary text-sm font-medium mb-2">Row</p>
          </div>

          {/* Big Tap Area */}
          <button
            onClick={handleRowTap}
            className="w-full sm:w-48 h-48 sm:h-48 rounded-full bg-accent text-white flex items-center justify-center active:bg-accent-hover transition-colors shadow-lg"
            aria-label="Increment row counter"
          >
            <span className="font-mono text-6xl font-bold">{rowCount}</span>
          </button>

          {/* Undo Button */}
          <Button
            variant="secondary"
            onClick={handleRowUndo}
            disabled={rowCount === 0}
            className="w-full sm:w-48"
          >
            Undo Last
          </Button>

          {/* Feedback */}
          {lastAction?.type === 'row' && (
            <div className="text-success text-sm font-medium animate-fade-out">+1 row</div>
          )}
          {lastAction?.type === 'row-undo' && (
            <div className="text-warning text-sm font-medium animate-fade-out">-1 row</div>
          )}
        </div>

        {/* Stitch Counter */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center mb-4">
            <p className="text-text-secondary text-sm font-medium mb-2">Stitch</p>
          </div>

          {/* Big Tap Area */}
          <button
            onClick={handleStitchTap}
            className="w-full sm:w-48 h-48 sm:h-48 rounded-full bg-accent text-white flex items-center justify-center active:bg-accent-hover transition-colors shadow-lg"
            aria-label="Increment stitch counter"
          >
            <span className="font-mono text-6xl font-bold">{stitchCount}</span>
          </button>

          {/* Undo Button */}
          <Button
            variant="secondary"
            onClick={handleStitchUndo}
            disabled={stitchCount === 0}
            className="w-full sm:w-48"
          >
            Undo Last
          </Button>

          {/* Feedback */}
          {lastAction?.type === 'stitch' && (
            <div className="text-success text-sm font-medium animate-fade-out">+1 stitch</div>
          )}
          {lastAction?.type === 'stitch-undo' && (
            <div className="text-warning text-sm font-medium animate-fade-out">-1 stitch</div>
          )}
        </div>
      </div>

      {/* Reset Button - Bottom */}
      <div className="flex justify-center mt-12 pb-4">
        <Button variant="secondary" onClick={handleReset} className="px-6">
          Reset Both
        </Button>
      </div>

      {/* Info */}
      <div className="mt-8 bg-info/10 border border-info rounded-lg p-4 max-w-2xl mx-auto w-full">
        <p className="text-text-secondary text-sm">
          <strong className="text-text-primary">Always saved:</strong> Your counters auto-save to your phone. Come back anytime to continue where you left off.
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-fade-out {
          animation: fadeOut 1.5s ease-out;
        }
      `}</style>
    </div>
  );
}
