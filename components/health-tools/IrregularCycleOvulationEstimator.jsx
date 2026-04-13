'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function IrregularCycleOvulationEstimator() {
  const [cycles, setCycles] = useState(['', '', '']);
  const [results, setResults] = useState(null);

  const handleCycleChange = (index, value) => {
    const newCycles = [...cycles];
    newCycles[index] = value;
    setCycles(newCycles);
  };

  const addCycleField = () => {
    setCycles([...cycles, '']);
  };

  const removeCycleField = (index) => {
    if (cycles.length > 3) {
      setCycles(cycles.filter((_, i) => i !== index));
    }
  };

  const calculateCycleStats = () => {
    const validCycles = cycles
      .map(c => parseInt(c))
      .filter(c => !isNaN(c) && c >= 21 && c <= 45);

    if (validCycles.length < 3) {
      alert('Please enter at least 3 valid cycle lengths (between 21 and 45 days)');
      return;
    }

    const average = Math.round(validCycles.reduce((a, b) => a + b, 0) / validCycles.length);
    const min = Math.min(...validCycles);
    const max = Math.max(...validCycles);
    const standardDev = Math.sqrt(
      validCycles.reduce((sq, n) => sq + Math.pow(n - average, 2), 0) / validCycles.length
    );

    // Ovulation typically occurs 14 days before the next period
    const earliestOvulation = min - 14;
    const latestOvulation = max - 14;
    const estimatedOvulation = average - 14;

    // Fertile window: 5 days before to day of ovulation
    const earliestFertileStart = earliestOvulation - 5;
    const latestFertileEnd = latestOvulation;

    const regularity =
      standardDev < 3 ? 'Very Regular' :
      standardDev < 7 ? 'Moderately Regular' :
      standardDev < 10 ? 'Somewhat Irregular' : 'Highly Irregular';

    setResults({
      average,
      min,
      max,
      standardDev,
      earliestOvulation: Math.max(1, earliestOvulation),
      latestOvulation,
      estimatedOvulation,
      earliestFertileStart: Math.max(1, earliestFertileStart),
      latestFertileEnd,
      regularity,
      cycleCount: validCycles.length,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Enter your last 3 to 6 cycle lengths (in days) to calculate your average cycle and ovulation patterns.
          </p>

          <div className="space-y-2">
            {cycles.map((cycle, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  type="number"
                  label={`Cycle ${idx + 1} Length (days)`}
                  min="21"
                  max="45"
                  value={cycle}
                  onChange={(e) => handleCycleChange(idx, e.target.value)}
                  placeholder="e.g. 28"
                />
                {cycles.length > 3 && (
                  <Button
                    onClick={() => removeCycleField(idx)}
                    variant="secondary"
                    className="mt-8"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>

          {cycles.length < 6 && (
            <Button onClick={addCycleField} variant="secondary" className="w-full">
              Add Another Cycle
            </Button>
          )}

          <Button onClick={calculateCycleStats} className="w-full">
            Analyze Cycle Pattern
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <div className="space-y-5">
              <div>
                <p className="text-secondary text-xs font-semibold mb-1">CYCLE REGULARITY</p>
                <div className="flex items-center justify-between">
                  <p className="font-heading text-lg font-bold text-primary">
                    {results.regularity}
                  </p>
                  <Badge variant={results.standardDev < 7 ? 'success' : 'warning'}>
                    σ = {results.standardDev.toFixed(1)}
                  </Badge>
                </div>
                <p className="text-secondary text-sm mt-2">
                  {results.regularity === 'Very Regular'
                    ? 'Your cycles are very consistent. Ovulation prediction is quite reliable.'
                    : results.regularity === 'Moderately Regular'
                    ? 'Your cycles are fairly regular. Ovulation may vary by a few days.'
                    : results.regularity === 'Somewhat Irregular'
                    ? 'Your cycles vary somewhat. Consider tracking additional signs like basal body temperature or cervical mucus.'
                    : 'Your cycles vary significantly. Consider tracking additional signs like basal body temperature or cervical mucus.'}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-xs font-semibold mb-2">AVERAGE CYCLE</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-surface p-3 rounded text-center">
                    <p className="text-secondary text-xs mb-1">Min</p>
                    <p className="font-mono text-lg font-bold text-primary">{results.min}</p>
                  </div>
                  <div className="bg-surface p-3 rounded text-center">
                    <p className="text-secondary text-xs mb-1">Average</p>
                    <p className="font-mono text-lg font-bold text-primary">{results.average}</p>
                  </div>
                  <div className="bg-surface p-3 rounded text-center">
                    <p className="text-secondary text-xs mb-1">Max</p>
                    <p className="font-mono text-lg font-bold text-primary">{results.max}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-xs font-semibold mb-3">ESTIMATED OVULATION</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-secondary text-sm mb-1">Earliest Possible</p>
                    <p className="font-mono font-semibold text-primary">
                      Day {results.earliestOvulation} of cycle
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded">
                    <p className="text-secondary text-sm mb-1">Most Likely (Estimated)</p>
                    <p className="font-mono font-semibold text-primary">
                      Day {results.estimatedOvulation} of cycle
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary text-sm mb-1">Latest Possible</p>
                    <p className="font-mono font-semibold text-primary">
                      Day {results.latestOvulation} of cycle
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-xs font-semibold mb-3">WIDEST FERTILE WINDOW</p>
                <p className="text-secondary text-sm">
                  To account for irregularity, your widest possible fertile window is:
                </p>
                <p className="font-mono text-lg font-bold text-primary mt-2">
                  Day {results.earliestFertileStart} to Day {results.latestFertileEnd}
                </p>
                <p className="text-secondary text-sm mt-2">
                  This covers all possible ovulation dates across your tracked cycles
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-50 border border-blue-200">
            <p className="text-secondary text-sm mb-3">
              <span className="font-semibold text-primary">Tracking Additional Signs:</span>
            </p>
            <ul className="text-secondary text-sm space-y-2">
              <li>- Basal body temperature (BBT) rises after ovulation</li>
              <li>- Cervical mucus becomes clear and stretchy around ovulation</li>
              <li>- Mild ovulation pain (mittelschmerz) may occur on ovulation day</li>
              <li>- Cervix becomes softer, higher, and more open near ovulation</li>
            </ul>
          </Card>
        </div>
      )}

      <Card className="bg-blue-50 border border-blue-200">
        <Badge>Disclaimer</Badge>
        <p className="text-secondary text-sm mt-2">
          This tool is for informational purposes only and should not replace professional medical advice.
          Always consult your healthcare provider for medical decisions.
        </p>
      </Card>
    </div>
  );
}
