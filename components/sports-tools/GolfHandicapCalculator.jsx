'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// World Handicap System (WHS) calculations
const calculateScoreDifferential = (grossScore, courseRating, slopeRating, par) => {
  const adjustedGrossScore = grossScore; // Could be adjusted based on ESC (Equitable Stroke Control)
  return (113 / slopeRating) * (adjustedGrossScore - courseRating);
};

const calculateHandicapIndex = (differentials) => {
  if (differentials.length === 0) return 0;

  const sorted = [...differentials].sort((a, b) => a - b);

  if (differentials.length < 3) return 0; // Need at least 3 rounds

  // Use best 8 of last 20 (or fewer if under 20 rounds)
  const usedCount = Math.min(8, Math.floor(differentials.length / 2.5));
  const usedDifferentials = sorted.slice(0, usedCount);
  const average = usedDifferentials.reduce((a, b) => a + b, 0) / usedDifferentials.length;

  return parseFloat(average.toFixed(1));
};

const calculateCourseHandicap = (handicapIndex, slopeRating, courseRating, par) => {
  return Math.round(handicapIndex * (slopeRating / 113) + (courseRating - par));
};

// Common UK course references
const COMMON_UK_COURSES = [
  { name: 'Typical UK Course', rating: 70, slope: 113, par: 72 },
  { name: 'Easy Course', rating: 68, slope: 110, par: 72 },
  { name: 'Difficult Course', rating: 72, slope: 125, par: 72 },
  { name: 'Par-3 Course', rating: 54, slope: 105, par: 54 },
];

export default function GolfHandicapCalculator() {
  const [rounds, setRounds] = useState([
    { id: 1, grossScore: 85, courseRating: 70, slopeRating: 113, par: 72 },
  ]);
  const [nextId, setNextId] = useState(2);
  const [newCourse, setNewCourse] = useState('');
  const [newCourseRating, setNewCourseRating] = useState('70');
  const [newCourseSlope, setNewCourseSlope] = useState('113');

  const handleAddRound = useCallback(() => {
    const newRound = {
      id: nextId,
      grossScore: 80,
      courseRating: 70,
      slopeRating: 113,
      par: 72,
    };
    setRounds([...rounds, newRound]);
    setNextId(nextId + 1);
  }, [rounds, nextId]);

  const handleUpdateRound = useCallback(
    (id, field, value) => {
      setRounds(rounds.map((r) => (r.id === id ? { ...r, [field]: parseFloat(value) || 0 } : r)));
    },
    [rounds]
  );

  const handleRemoveRound = useCallback(
    (id) => {
      if (rounds.length > 1) {
        setRounds(rounds.filter((r) => r.id !== id));
      }
    },
    [rounds]
  );

  // Calculate differentials and handicap
  const calculations = useMemo(() => {
    const differentials = rounds.map((r) =>
      calculateScoreDifferential(r.grossScore, r.courseRating, r.slopeRating, r.par)
    );

    const handicapIndex = calculateHandicapIndex(differentials);

    return {
      differentials,
      handicapIndex,
      roundsValid: rounds.length >= 3,
      usedRounds: Math.min(8, Math.floor(rounds.length / 2.5)),
      totalRounds: rounds.length,
    };
  }, [rounds]);

  const handleCalculateCourseHandicap = useCallback(() => {
    if (!newCourse || !newCourseRating || !newCourseSlope) {
      return;
      return;
    }
    return calculateCourseHandicap(
      calculations.handicapIndex,
      parseInt(newCourseSlope),
      parseInt(newCourseRating),
      72
    );
  }, [calculations.handicapIndex, newCourse, newCourseRating, newCourseSlope]);

  const courseHandicap = handleCalculateCourseHandicap();

  return (
    <div className="space-y-6">
      {/* Input Rounds */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Rounds Played</h3>

        <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
          {rounds.map((round, idx) => (
            <div key={round.id} className="p-3 bg-surface rounded-[var(--radius-input)] space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-secondary">Round {idx + 1}</span>
                {rounds.length > 1 && (
                  <button
                    onClick={() => handleRemoveRound(round.id)}
                    className="text-error hover:text-error text-sm font-medium"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">Gross Score</label>
                  <input
                    type="number"
                    value={round.grossScore}
                    onChange={(e) => handleUpdateRound(round.id, 'grossScore', e.target.value)}
                    className="w-full px-2 py-1.5 border border-border rounded text-sm font-mono focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">Course Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    value={round.courseRating}
                    onChange={(e) => handleUpdateRound(round.id, 'courseRating', e.target.value)}
                    className="w-full px-2 py-1.5 border border-border rounded text-sm font-mono focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">Slope Rating</label>
                  <input
                    type="number"
                    value={round.slopeRating}
                    onChange={(e) => handleUpdateRound(round.id, 'slopeRating', e.target.value)}
                    className="w-full px-2 py-1.5 border border-border rounded text-sm font-mono focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-1 block">Par</label>
                  <input
                    type="number"
                    value={round.par}
                    onChange={(e) => handleUpdateRound(round.id, 'par', e.target.value)}
                    className="w-full px-2 py-1.5 border border-border rounded text-sm font-mono focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleAddRound} className="w-full">
          + Add Round
        </Button>
      </Card>

      {/* Handicap Index Display */}
      {calculations.roundsValid ? (
        <Card className="bg-accent bg-opacity-5 border-2 border-accent">
          <div className="text-center">
            <p className="text-sm font-medium text-text-secondary uppercase mb-2">Your Handicap Index (WHS)</p>
            <div className="font-mono text-5xl font-bold text-accent mb-2">
              {calculations.handicapIndex.toFixed(1)}
            </div>
            <p className="text-xs text-text-muted">
              Based on {calculations.usedRounds} of {calculations.totalRounds} rounds
            </p>
          </div>
        </Card>
      ) : (
        <Card className="bg-warning bg-opacity-10 border border-warning">
          <p className="text-sm text-text-primary">
            <span className="font-medium">Need 3+ rounds</span> to calculate handicap. Currently have {calculations.totalRounds}.
          </p>
        </Card>
      )}

      {/* Differentials Breakdown */}
      {calculations.roundsValid && (
        <Card>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Score Differentials</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-3 py-2 text-left font-medium text-text-secondary">Round</th>
                  <th className="px-3 py-2 text-center font-medium text-text-secondary">Score</th>
                  <th className="px-3 py-2 text-center font-medium text-text-secondary">Rating</th>
                  <th className="px-3 py-2 text-center font-medium text-text-secondary">Slope</th>
                  <th className="px-3 py-2 text-right font-medium text-text-secondary">Differential</th>
                  <th className="px-3 py-2 text-center font-medium text-text-secondary">Used?</th>
                </tr>
              </thead>
              <tbody>
                {rounds.map((round, idx) => {
                  const differential = calculations.differentials[idx];
                  const sorted = [...calculations.differentials].sort((a, b) => a - b);
                  const isUsed = sorted.slice(0, calculations.usedRounds).includes(differential);

                  return (
                    <tr key={round.id} className={`border-b border-border ${isUsed ? 'bg-success bg-opacity-5' : ''}`}>
                      <td className="px-3 py-2 text-text-secondary">Round {idx + 1}</td>
                      <td className="px-3 py-2 text-center font-mono text-text-primary">{round.grossScore}</td>
                      <td className="px-3 py-2 text-center text-text-secondary text-xs">{round.courseRating}</td>
                      <td className="px-3 py-2 text-center text-text-secondary text-xs">{round.slopeRating}</td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-accent">
                        {differential.toFixed(1)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {isUsed && <span className="text-success font-bold">✓</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-text-muted mt-3">
            The WHS uses your best 8 differentials (or fewer for fewer rounds) to calculate your handicap index.
          </p>
        </Card>
      )}

      {/* Course Handicap Calculator */}
      {calculations.roundsValid && (
        <Card>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Course Handicap Calculator</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Quick Reference</label>
              <div className="space-y-2">
                {COMMON_UK_COURSES.map((course, idx) => {
                  const ch = calculateCourseHandicap(
                    calculations.handicapIndex,
                    course.slope,
                    course.rating,
                    course.par
                  );
                  return (
                    <div key={idx} className="flex justify-between items-center p-2 bg-surface rounded-[var(--radius-input)]">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{course.name}</p>
                        <p className="text-xs text-text-muted">
                          Rating {course.rating}, Slope {course.slope}
                        </p>
                      </div>
                      <div className="font-mono font-bold text-accent text-lg">{ch}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <label className="block text-sm font-medium text-text-primary mb-2">Calculate Custom Course</label>

              <div className="space-y-2 mb-3">
                <input
                  type="text"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="Course name"
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-sm"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={newCourseRating}
                    onChange={(e) => setNewCourseRating(e.target.value)}
                    placeholder="Course Rating"
                    className="px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-sm"
                  />
                  <input
                    type="number"
                    value={newCourseSlope}
                    onChange={(e) => setNewCourseSlope(e.target.value)}
                    placeholder="Slope Rating"
                    className="px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-sm"
                  />
                </div>
              </div>

              {courseHandicap !== null && (
                <Card className="bg-accent bg-opacity-5 p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-text-primary">{newCourse || 'Custom Course'}</span>
                    <span className="font-mono font-bold text-accent text-lg">{courseHandicap}</span>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* WHS Explanation */}
      <Card className="bg-info bg-opacity-5 border border-info">
        <h4 className="font-medium text-text-primary mb-2">World Handicap System (WHS) Explained</h4>
        <div className="text-sm text-text-secondary space-y-2">
          <p>
            <span className="font-medium">Handicap Index:</span> Your portable handicap that reflects your playing ability.
          </p>
          <p>
            <span className="font-medium">Course Handicap:</span> Your handicap adjusted for a specific course's difficulty (rating & slope).
          </p>
          <p>
            <span className="font-medium">Score Differential:</span> How much better or worse you played relative to the course difficulty: (113 / Slope) × (Adjusted Score - Rating)
          </p>
          <p>
            <span className="font-medium">Usage:</span> Your best 8 differentials (or proportional fewer) are used to calculate your index. This rewards consistency and improvement.
          </p>
        </div>
      </Card>

      <Card className="bg-warning bg-opacity-5 border border-warning">
        <p className="text-xs text-text-secondary">
          <strong>Disclaimer:</strong> For estimation purposes only. Official handicaps are maintained through your golf club. Course ratings and slope ratings come from your club or local golf union.
        </p>
      </Card>
    </div>
  );
}
