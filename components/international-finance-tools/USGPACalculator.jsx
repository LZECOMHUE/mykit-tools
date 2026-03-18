'use client';

import { useState, useMemo } from 'react';

export default function USGPACalculator() {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Mathematics', grade: '3.0', credits: '3' },
  ]);
  const [nextId, setNextId] = useState(2);

  const grades = [
    { value: '4.0', label: 'A (4.0)' },
    { value: '3.7', label: 'A- (3.7)' },
    { value: '3.3', label: 'B+ (3.3)' },
    { value: '3.0', label: 'B (3.0)' },
    { value: '2.7', label: 'B- (2.7)' },
    { value: '2.3', label: 'C+ (2.3)' },
    { value: '2.0', label: 'C (2.0)' },
    { value: '1.7', label: 'C- (1.7)' },
    { value: '1.3', label: 'D+ (1.3)' },
    { value: '1.0', label: 'D (1.0)' },
    { value: '0.7', label: 'D- (0.7)' },
    { value: '0.0', label: 'F (0.0)' },
  ];

  const addClass = () => {
    if (classes.length < 20) {
      setClasses([...classes, { id: nextId, name: '', grade: '3.0', credits: '3' }]);
      setNextId(nextId + 1);
    }
  };

  const removeClass = (id) => {
    if (classes.length > 1) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  const updateClass = (id, field, value) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const calculations = useMemo(() => {
    const validClasses = classes.filter((c) => c.name && c.grade && c.credits);

    if (validClasses.length === 0) {
      return {
        gpa: '0.00',
        totalCredits: '0',
        breakdown: '',
        honors: '',
      };
    }

    const totalPoints = validClasses.reduce((sum, c) => {
      const gradeVal = parseFloat(c.grade) || 0;
      const credVal = parseFloat(c.credits) || 0;
      return sum + gradeVal * credVal;
    }, 0);

    const totalCredits = validClasses.reduce((sum, c) => {
      return sum + (parseFloat(c.credits) || 0);
    }, 0);

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

    let honors = '';
    const gpaNum = parseFloat(gpa);
    if (gpaNum >= 3.9) honors = 'Summa Cum Laude (3.9+)';
    else if (gpaNum >= 3.7) honors = 'Magna Cum Laude (3.7+)';
    else if (gpaNum >= 3.5) honors = 'Cum Laude (3.5+)';

    const breakdown = `${validClasses.length} class${validClasses.length !== 1 ? 'es' : ''} / ${totalCredits.toFixed(1)} credits`;

    return {
      gpa,
      totalCredits: totalCredits.toFixed(1),
      breakdown,
      honors,
    };
  }, [classes]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Classes Input */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Add Your Classes</h2>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {classes.map((cls, idx) => (
            <div key={cls.id} className="flex flex-col sm:flex-row gap-2 items-start sm:items-end">
              {/* Class Name */}
              <div className="flex-1 min-w-0">
                <label className="text-xs text-text-secondary font-medium block mb-1">Class Name</label>
                <input
                  type="text"
                  value={cls.name}
                  onChange={(e) => updateClass(cls.id, 'name', e.target.value)}
                  placeholder="e.g., Biology"
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                />
              </div>

              {/* Grade Dropdown */}
              <div className="w-full sm:w-32">
                <label className="text-xs text-text-secondary font-medium block mb-1">Grade</label>
                <select
                  value={cls.grade}
                  onChange={(e) => updateClass(cls.id, 'grade', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                >
                  {grades.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Credits Input */}
              <div className="w-full sm:w-20">
                <label className="text-xs text-text-secondary font-medium block mb-1">Credits</label>
                <input
                  type="number"
                  value={cls.credits}
                  onChange={(e) => updateClass(cls.id, 'credits', e.target.value)}
                  min="1"
                  max="5"
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary text-center focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                />
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeClass(cls.id)}
                disabled={classes.length === 1}
                className="w-full sm:w-10 px-3 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {classes.length < 20 && (
          <button
            onClick={addClass}
            className="w-full px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            + Add Class
          </button>
        )}
      </div>

      {/* Main GPA Result */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-600 text-sm font-medium mb-1">Cumulative GPA</p>
        <p className="font-mono text-5xl font-bold text-blue-700">{calculations.gpa}</p>
        <p className="text-blue-600 text-xs mt-2">{calculations.breakdown}</p>
      </div>

      {/* Honors */}
      {calculations.honors && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-amber-600 text-sm font-medium mb-1">Latin Honors</p>
          <p className="font-semibold text-amber-700">{calculations.honors}</p>
        </div>
      )}

      {/* Summary Table */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Total Credits</span>
            <span className="font-mono font-semibold text-text-primary">{calculations.totalCredits}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Classes Added</span>
            <span className="font-mono font-semibold text-text-primary">{classes.filter((c) => c.name && c.grade).length}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
            <span className="text-text-primary">Weighted GPA</span>
            <span className="font-mono text-lg text-blue-600">{calculations.gpa}</span>
          </div>
        </div>
      </div>

      {/* Grade Scale Reference */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Grade Scale</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
          {grades.map((g) => (
            <div key={g.value} className="flex justify-between items-center">
              <span className="text-text-secondary">{g.label.split('(')[0].trim()}</span>
              <span className="font-mono text-text-primary">{g.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-700 text-xs">
          <strong>Note:</strong> GPA is calculated using a weighted average. Each class grade is multiplied by its credit hours, then divided by total credits.
        </p>
      </div>
    </div>
  );
}
