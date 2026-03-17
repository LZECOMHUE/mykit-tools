'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';

export default function DecisionMatrixMaker() {
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [weights, setWeights] = useState({});
  const [scores, setScores] = useState({});
  const [newOption, setNewOption] = useState('');
  const [newCriterion, setNewCriterion] = useState('');

  // Step 1: Add options
  const addOption = () => {
    if (newOption.trim() && options.length < 6) {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  // Step 2: Add criteria
  const addCriterion = () => {
    if (newCriterion.trim() && criteria.length < 8) {
      setCriteria([...criteria, newCriterion]);
      setNewCriterion('');
    }
  };

  const removeCriterion = (index) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  // Step 3: Set weights for criteria
  const updateWeight = (criterion, weight) => {
    setWeights({ ...weights, [criterion]: weight });
  };

  // Step 4: Score options
  const updateScore = (optionIndex, criterion, score) => {
    const key = `${optionIndex}-${criterion}`;
    setScores({ ...scores, [key]: score });
  };

  // Calculate totals
  const calculateTotal = (optionIndex) => {
    let total = 0;
    criteria.forEach((criterion) => {
      const score = scores[`${optionIndex}-${criterion}`] || 0;
      const weight = weights[criterion] || 1;
      total += score * weight;
    });
    return total;
  };

  const results = options.map((opt, idx) => ({
    option: opt,
    total: calculateTotal(idx),
  })).sort((a, b) => b.total - a.total);

  const goToStep = (stepNum) => {
    if (stepNum <= 2 || options.length > 0) {
      if (stepNum <= 3 || criteria.length > 0) {
        setStep(stepNum);
      }
    }
  };

  const reset = () => {
    setStep(1);
    setOptions([]);
    setCriteria([]);
    setWeights({});
    setScores({});
    setNewOption('');
    setNewCriterion('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Indicator */}
      <div className="flex gap-2 mb-6 justify-between">
        {[1, 2, 3, 4].map((s) => (
          <button
            key={s}
            onClick={() => goToStep(s)}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              step === s
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary hover:bg-surface-hover'
            }`}
          >
            Step {s}
          </button>
        ))}
      </div>

      {/* Step 1: Options */}
      {step === 1 && (
        <Card>
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
            What are you choosing between?
          </h2>
          <p className="text-text-secondary text-sm mb-4">Add 2 to 6 options</p>

          <div className="space-y-3 mb-4">
            <Input
              label="Add option"
              placeholder="e.g., Job A"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addOption();
              }}
            />
            <Button onClick={addOption} variant="primary" className="w-full">
              Add Option
            </Button>
          </div>

          <div className="space-y-2 mb-4">
            {options.map((opt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-surface rounded-lg"
              >
                <span className="text-text-primary font-medium">{opt}</span>
                <button
                  onClick={() => removeOption(idx)}
                  className="text-error hover:text-error/70 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setStep(2)}
            variant="primary"
            className="w-full"
            disabled={options.length < 2}
          >
            Continue (need at least 2 options)
          </Button>
        </Card>
      )}

      {/* Step 2: Criteria */}
      {step === 2 && (
        <Card>
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
            What criteria matter?
          </h2>
          <p className="text-text-secondary text-sm mb-4">Add 3 to 8 criteria (e.g., Salary, Location)</p>

          <div className="space-y-3 mb-4">
            <Input
              label="Add criterion"
              placeholder="e.g., Salary"
              value={newCriterion}
              onChange={(e) => setNewCriterion(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addCriterion();
              }}
            />
            <Button onClick={addCriterion} variant="primary" className="w-full">
              Add Criterion
            </Button>
          </div>

          <div className="space-y-2 mb-4">
            {criteria.map((crit, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-surface rounded-lg"
              >
                <span className="text-text-primary font-medium">{crit}</span>
                <button
                  onClick={() => removeCriterion(idx)}
                  className="text-error hover:text-error/70 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setStep(1)}
              variant="secondary"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                criteria.forEach((c) => {
                  if (!weights[c]) setWeights({ ...weights, [c]: 5 });
                });
                setStep(3);
              }}
              variant="primary"
              className="flex-1"
              disabled={criteria.length < 3}
            >
              Continue
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Weight Criteria */}
      {step === 3 && (
        <Card>
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
            How important is each criterion?
          </h2>
          <p className="text-text-secondary text-sm mb-4">Rate 1 (not important) to 10 (very important)</p>

          <div className="space-y-4 mb-4">
            {criteria.map((criterion) => (
              <div key={criterion} className="bg-surface p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-primary font-medium">{criterion}</span>
                  <span className="font-mono text-accent font-bold">{weights[criterion] || 5}</span>
                </div>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={weights[criterion] || 5}
                  onChange={(e) => updateWeight(criterion, parseInt(e.target.value))}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setStep(2)}
              variant="secondary"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep(4)}
              variant="primary"
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Score Options */}
      {step === 4 && (
        <Card>
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
            Score each option
          </h2>
          <p className="text-text-secondary text-sm mb-4">Rate each option 1 to 10 for each criterion</p>

          <div className="overflow-x-auto mb-4">
            <div className="space-y-4">
              {options.map((option, optIdx) => (
                <div key={optIdx} className="bg-surface p-4 rounded-lg">
                  <h3 className="font-medium text-text-primary mb-3">{option}</h3>
                  <div className="space-y-3">
                    {criteria.map((criterion) => (
                      <div key={criterion}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-text-secondary">{criterion}</span>
                          <span className="font-mono text-accent">
                            {scores[`${optIdx}-${criterion}`] || 0}
                          </span>
                        </div>
                        <Slider
                          min={0}
                          max={10}
                          step={1}
                          value={scores[`${optIdx}-${criterion}`] || 0}
                          onChange={(e) =>
                            updateScore(optIdx, criterion, parseInt(e.target.value))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setStep(1)}
            variant="secondary"
            className="w-full"
          >
            Back
          </Button>
        </Card>
      )}

      {/* Results */}
      {step === 4 && criteria.length > 0 && options.length > 0 && (
        <Card className="mt-6 bg-accent/5 border-accent/30">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Rankings</h2>

          <div className="space-y-3 mb-4">
            {results.map((result, idx) => (
              <div
                key={result.option}
                className="flex items-center justify-between p-3 bg-white border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading text-lg font-bold text-accent">#{idx + 1}</span>
                  <span className="text-text-primary font-medium">{result.option}</span>
                </div>
                <span className="font-mono text-xl font-bold text-accent">
                  {result.total.toFixed(0)}
                </span>
              </div>
            ))}
          </div>

          <Button onClick={reset} variant="secondary" className="w-full">
            Start Over
          </Button>
        </Card>
      )}
    </div>
  );
}
