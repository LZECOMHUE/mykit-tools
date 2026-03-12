'use client';

import { useState, useMemo } from 'react';

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState([
    { id: 1, name: 'Homework', weight: 20, score: '' },
    { id: 2, name: 'Quizzes', weight: 20, score: '' },
    { id: 3, name: 'Midterm', weight: 30, score: '' },
  ]);
  const [nextId, setNextId] = useState(4);

  const results = useMemo(() => {
    const totalWeight = assignments.reduce((sum, a) => sum + a.weight, 0);
    let weightedSum = 0;
    let completedAssignments = 0;

    assignments.forEach((a) => {
      const score = parseFloat(a.score);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        weightedSum += (score * a.weight) / 100;
        completedAssignments++;
      }
    });

    const currentGrade = totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0;

    // Calculate needed on final
    let finalWeight = 0;
    let remainingWeight = 0;
    assignments.forEach((a) => {
      const score = parseFloat(a.score);
      if (isNaN(score) || score < 0 || score > 100) {
        remainingWeight += a.weight;
      }
    });

    const gradeScale = [
      { min: 90, letter: 'A', description: 'Excellent' },
      { min: 80, letter: 'B', description: 'Good' },
      { min: 70, letter: 'C', description: 'Average' },
      { min: 60, letter: 'D', description: 'Below Average' },
      { min: 0, letter: 'F', description: 'Failing' },
    ];

    const letterGrade = gradeScale.find((g) => currentGrade >= g.min);

    return {
      currentGrade: currentGrade.toFixed(1),
      letterGrade: letterGrade || gradeScale[4],
      completedAssignments,
      remainingWeight,
      totalWeight,
    };
  }, [assignments]);

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { id: nextId, name: '', weight: 10, score: '' },
    ]);
    setNextId(nextId + 1);
  };

  const removeAssignment = (id) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter((a) => a.id !== id));
    }
  };

  const updateAssignment = (id, field, value) => {
    setAssignments(
      assignments.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      )
    );
  };

  const getLetterColor = (letter) => {
    if (letter === 'A') return 'text-success';
    if (letter === 'B') return 'text-accent';
    if (letter === 'C') return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Current Grade */}
      {results.completedAssignments > 0 && (
        <div className="bg-accent-muted border-2 border-accent rounded-[var(--radius-card)] p-6 text-center space-y-2">
          <p className="text-text-secondary text-sm">Current Grade</p>
          <div className="flex items-center justify-center gap-4">
            <p className="font-mono-num text-4xl font-bold text-accent">{results.currentGrade}%</p>
            <p className={`font-heading text-5xl font-bold ${getLetterColor(results.letterGrade.letter)}`}>
              {results.letterGrade.letter}
            </p>
          </div>
          <p className="text-text-secondary text-sm">{results.letterGrade.description}</p>
        </div>
      )}

      {/* Assignments */}
      <div className="space-y-3">
        <h3 className="text-text-primary font-semibold">Assignments & Grades</h3>
        {assignments.map((assignment) => (
          <div key={assignment.id} className="flex gap-2 items-end">
            <div className="flex-1">
              <input
                type="text"
                value={assignment.name}
                onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                placeholder="Assignment name"
                className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
            <div className="w-20">
              <label className="block text-text-secondary text-xs mb-1 font-medium">Weight %</label>
              <input
                type="number"
                value={assignment.weight}
                onChange={(e) => updateAssignment(assignment.id, 'weight', parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                className="w-full px-3 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
            <div className="w-20">
              <label className="block text-text-secondary text-xs mb-1 font-medium">Score</label>
              <input
                type="number"
                value={assignment.score}
                onChange={(e) => updateAssignment(assignment.id, 'score', e.target.value)}
                placeholder="0-100"
                min="0"
                max="100"
                className="w-full px-3 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
            <button
              onClick={() => removeAssignment(assignment.id)}
              className="px-3 py-3 text-error hover:bg-error/10 rounded-[var(--radius-input)] font-medium transition-colors"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addAssignment}
          className="w-full px-6 py-3 border-2 border-dashed border-border text-text-secondary rounded-[var(--radius-input)] font-medium hover:bg-surface transition-colors"
        >
          + Add Assignment
        </button>
      </div>

      {/* Weight Summary */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
        <p className="text-text-secondary text-sm mb-2">Total Weight: {results.totalWeight}% (target: 100%)</p>
        <div className="w-full bg-border rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all ${
              results.totalWeight === 100 ? 'bg-success' : 'bg-warning'
            }`}
            style={{ width: `${Math.min(100, results.totalWeight)}%` }}
          ></div>
        </div>
      </div>

      {/* Grade Scale */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-2">
        <h4 className="text-text-primary font-semibold text-sm">Grade Scale</h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <div className="text-center py-2 px-2 bg-white rounded-[var(--radius-input)]">
            <p className="text-success font-bold">A</p>
            <p className="text-xs text-text-secondary">90-100</p>
          </div>
          <div className="text-center py-2 px-2 bg-white rounded-[var(--radius-input)]">
            <p className="text-accent font-bold">B</p>
            <p className="text-xs text-text-secondary">80-89</p>
          </div>
          <div className="text-center py-2 px-2 bg-white rounded-[var(--radius-input)]">
            <p className="text-warning font-bold">C</p>
            <p className="text-xs text-text-secondary">70-79</p>
          </div>
          <div className="text-center py-2 px-2 bg-white rounded-[var(--radius-input)]">
            <p className="text-error font-bold">D</p>
            <p className="text-xs text-text-secondary">60-69</p>
          </div>
          <div className="text-center py-2 px-2 bg-white rounded-[var(--radius-input)]">
            <p className="text-error font-bold">F</p>
            <p className="text-xs text-text-secondary">&lt;60</p>
          </div>
        </div>
      </div>
    </div>
  );
}
