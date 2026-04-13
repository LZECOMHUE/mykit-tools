'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';

export default function ProsAndConsGenerator() {
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  const addPro = () => {
    if (newPro.trim()) {
      setPros([...pros, { text: newPro, weight: 5 }]);
      setNewPro('');
    }
  };

  const addCon = () => {
    if (newCon.trim()) {
      setCons([...cons, { text: newCon, weight: 5 }]);
      setNewCon('');
    }
  };

  const updateProWeight = (index, weight) => {
    const updated = [...pros];
    updated[index].weight = weight;
    setPros(updated);
  };

  const updateConWeight = (index, weight) => {
    const updated = [...cons];
    updated[index].weight = weight;
    setCons(updated);
  };

  const removePro = (index) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const removeCon = (index) => {
    setCons(cons.filter((_, i) => i !== index));
  };

  const proScore = pros.reduce((sum, item) => sum + item.weight, 0);
  const conScore = cons.reduce((sum, item) => sum + item.weight, 0);
  const difference = Math.abs(proScore - conScore);
  const winner = proScore > conScore ? 'Pros' : conScore > proScore ? 'Cons' : 'Tied';

  const reset = () => {
    setPros([]);
    setCons([]);
    setNewPro('');
    setNewCon('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pros Column */}
        <Card className="border-success/30 bg-success/5">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Pros</h2>

          <div className="space-y-3 mb-4">
            <Input
              label="Add a pro"
              placeholder="e.g., Better salary"
              value={newPro}
              onChange={(e) => setNewPro(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addPro();
              }}
            />
            <Button onClick={addPro} variant="primary" className="w-full">
              Add Pro
            </Button>
          </div>

          <div className="space-y-3">
            {pros.map((pro, idx) => (
              <div key={idx} className="bg-white border border-border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-text-primary font-medium flex-1">{pro.text}</p>
                  <button
                    onClick={() => removePro(idx)}
                    className="text-xs text-error hover:text-error/70 ml-2"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={pro.weight}
                    onChange={(e) => updateProWeight(idx, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs font-mono text-success font-bold w-6 text-right">
                    {pro.weight}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-success/20">
            <p className="text-sm text-text-secondary mb-1">Score</p>
            <p className="font-heading text-3xl font-bold text-success">{proScore}</p>
          </div>
        </Card>

        {/* Cons Column */}
        <Card className="border-error/30 bg-error/5">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Cons</h2>

          <div className="space-y-3 mb-4">
            <Input
              label="Add a con"
              placeholder="e.g., Long commute"
              value={newCon}
              onChange={(e) => setNewCon(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addCon();
              }}
            />
            <Button onClick={addCon} variant="primary" className="w-full">
              Add Con
            </Button>
          </div>

          <div className="space-y-3">
            {cons.map((con, idx) => (
              <div key={idx} className="bg-white border border-border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-text-primary font-medium flex-1">{con.text}</p>
                  <button
                    onClick={() => removeCon(idx)}
                    className="text-xs text-error hover:text-error/70 ml-2"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={con.weight}
                    onChange={(e) => updateConWeight(idx, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs font-mono text-error font-bold w-6 text-right">
                    {con.weight}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-error/20">
            <p className="text-sm text-text-secondary mb-1">Score</p>
            <p className="font-heading text-3xl font-bold text-error">{conScore}</p>
          </div>
        </Card>
      </div>

      {/* Results */}
      {(pros.length > 0 || cons.length > 0) && (
        <Card className="mt-6 bg-accent/5 border-accent/30">
          <div className="text-center">
            <p className="text-sm text-text-secondary mb-2">Decision</p>
            <p className="font-heading text-4xl font-bold text-accent mb-2">
              {winner}
            </p>
            {winner !== 'Tied' && (
              <p className="text-lg text-text-primary">
                by <span className="font-mono font-bold">{difference}</span> points
              </p>
            )}
            {winner === 'Tied' && (
              <p className="text-text-secondary">This is a tough call!</p>
            )}
          </div>
        </Card>
      )}

      {/* Reset Button */}
      {(pros.length > 0 || cons.length > 0) && (
        <div className="mt-4">
          <Button
            onClick={reset}
            variant="secondary"
            className="w-full"
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
