'use client';

import { useState, useMemo } from 'react';

const percentileLookup = {
  1600: 99, 1590: 99, 1580: 99, 1570: 99, 1560: 99, 1550: 99, 1540: 99, 1530: 99, 1520: 99, 1510: 99,
  1500: 98, 1490: 98, 1480: 98, 1470: 97, 1460: 97, 1450: 97, 1440: 96, 1430: 96, 1420: 95, 1410: 95,
  1400: 94, 1390: 94, 1380: 93, 1370: 92, 1360: 92, 1350: 91, 1340: 90, 1330: 89, 1320: 88, 1310: 87,
  1300: 86, 1290: 85, 1280: 84, 1270: 83, 1260: 82, 1250: 80, 1240: 79, 1230: 77, 1220: 76, 1210: 74,
  1200: 72, 1190: 71, 1180: 69, 1170: 67, 1160: 65, 1150: 63, 1140: 61, 1130: 59, 1120: 57, 1110: 55,
  1100: 53, 1090: 51, 1080: 49, 1070: 47, 1060: 45, 1050: 43, 1040: 41, 1030: 39, 1020: 37, 1010: 35,
  1000: 33, 990: 31, 980: 29, 970: 27, 960: 25, 950: 23, 940: 21, 930: 19, 920: 17, 910: 15,
  900: 13, 890: 11, 880: 9, 870: 7, 860: 5, 850: 3,
};

const getPercentile = (score) => {
  if (score >= 1600) return 99;
  if (score <= 850) return 1;
  const rounded = Math.round(score / 10) * 10;
  return percentileLookup[rounded] || 50;
};

export default function SATScoreCalculator() {
  const [readingScore, setReadingScore] = useState('650');
  const [mathScore, setMathScore] = useState('700');

  const results = useMemo(() => {
    const reading = Math.min(800, Math.max(200, parseFloat(readingScore) || 0));
    const math = Math.min(800, Math.max(200, parseFloat(mathScore) || 0));
    const total = reading + math;
    const percentile = getPercentile(total);

    return {
      reading: Math.round(reading),
      math: Math.round(math),
      total,
      percentile,
    };
  }, [readingScore, mathScore]);

  const scoreColor = (score) => {
    if (score >= 1500) return 'from-green-100 to-green-50';
    if (score >= 1400) return 'from-blue-100 to-blue-50';
    if (score >= 1300) return 'from-yellow-100 to-yellow-50';
    if (score >= 1200) return 'from-orange-100 to-orange-50';
    return 'from-red-100 to-red-50';
  };

  const scoreLabel = (score) => {
    if (score >= 1500) return 'Excellent';
    if (score >= 1400) return 'Very Good';
    if (score >= 1300) return 'Good';
    if (score >= 1200) return 'Fair';
    return 'Below Average';
  };

  return (
    <div className="space-y-4">
      {/* Score Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Evidence-Based Reading/Writing */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <label className="block text-sm font-medium text-text-secondary mb-4">
            Evidence-Based Reading & Writing (200-800)
          </label>
          <input
            type="range"
            min="200"
            max="800"
            step="10"
            value={readingScore}
            onChange={(e) => setReadingScore(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
          />
          <input
            type="number"
            value={readingScore}
            onChange={(e) => setReadingScore(e.target.value)}
            min="200"
            max="800"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
          <div className="text-center mt-2 font-mono font-bold text-accent text-2xl">
            {Math.round(parseFloat(readingScore) || 0)}
          </div>
        </div>

        {/* Math Section */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <label className="block text-sm font-medium text-text-secondary mb-4">
            Math (200-800)
          </label>
          <input
            type="range"
            min="200"
            max="800"
            step="10"
            value={mathScore}
            onChange={(e) => setMathScore(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
          />
          <input
            type="number"
            value={mathScore}
            onChange={(e) => setMathScore(e.target.value)}
            min="200"
            max="800"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
          <div className="text-center mt-2 font-mono font-bold text-accent text-2xl">
            {Math.round(parseFloat(mathScore) || 0)}
          </div>
        </div>
      </div>

      {/* Total Score Card */}
      <div className={`bg-gradient-to-br ${scoreColor(results.total)} rounded-lg border border-border p-5`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <div className="text-sm text-text-secondary mb-1">SAT Total Score</div>
            <div className="text-5xl font-mono font-bold text-accent">
              {results.total}
            </div>
            <div className="text-lg font-semibold text-text-primary mt-2">
              {scoreLabel(results.total)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-secondary mb-1">Percentile Rank</div>
            <div className="text-4xl font-mono font-bold text-accent">
              {results.percentile}%
            </div>
            <div className="text-sm text-text-secondary mt-2">
              Better than {results.percentile}% of test takers
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-border rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-4">Evidence-Based Reading & Writing</h3>
          <div className="text-3xl font-mono font-bold text-accent mb-2">
            {results.reading}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-accent rounded-full h-2"
              style={{ width: `${(results.reading / 800) * 100}%` }}
            />
          </div>
          <div className="text-xs text-text-muted mt-2">
            {((results.reading / 800) * 100).toFixed(1)}% of max score
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-4">Math Section</h3>
          <div className="text-3xl font-mono font-bold text-accent mb-2">
            {results.math}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-accent rounded-full h-2"
              style={{ width: `${(results.math / 800) * 100}%` }}
            />
          </div>
          <div className="text-xs text-text-muted mt-2">
            {((results.math / 800) * 100).toFixed(1)}% of max score
          </div>
        </div>
      </div>

      {/* College Competitiveness */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-4">🎓 College Competitiveness</h3>
        <div className="space-y-2 text-sm">
          {results.total >= 1500 && (
            <div className="text-green-700">✓ Competitive for Ivy League and top universities</div>
          )}
          {results.total >= 1400 && results.total < 1500 && (
            <div className="text-blue-700">✓ Strong score for selective universities</div>
          )}
          {results.total >= 1300 && results.total < 1400 && (
            <div className="text-yellow-700">✓ Good score for many universities</div>
          )}
          {results.total >= 1200 && results.total < 1300 && (
            <div className="text-orange-700">✓ Acceptable for regional universities</div>
          )}
          {results.total < 1200 && (
            <div className="text-red-700">Consider retaking the test or exploring community college</div>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-3">Score Benchmarks</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { score: '1600', label: 'Perfect Score' },
            { score: '1500+', label: 'Ivy League Range' },
            { score: '1400+', label: 'Selective Universities' },
            { score: '1300+', label: 'Many Top Universities' },
            { score: '1200', label: 'Average College Bound' },
            { score: '1050', label: 'National Average' },
          ].map((item) => (
            <div key={item.score} className="flex justify-between p-2 bg-surface rounded">
              <span className="text-text-secondary">{item.label}</span>
              <span className="font-mono font-bold text-accent">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
