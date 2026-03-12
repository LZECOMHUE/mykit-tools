'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateMathsWorksheetPDF } from '@/lib/worksheet-pdf';

export default function MathsWorksheetGenerator() {
  const [operations, setOperations] = useState(new Set(['addition']));
  const [difficulty, setDifficulty] = useState('medium');
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(50);
  const [numQuestions, setNumQuestions] = useState(20);
  const [columns, setColumns] = useState(1);
  const [includeRemainders, setIncludeRemainders] = useState(false);
  const [mixOperations, setMixOperations] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [questions, setQuestions] = useState([]);

  const difficultyRanges = {
    easy: { min: 1, max: 10 },
    medium: { min: 1, max: 50 },
    hard: { min: 1, max: 100 },
  };

  const handleOperationToggle = (op) => {
    const newOps = new Set(operations);
    if (newOps.has(op)) {
      newOps.delete(op);
    } else {
      newOps.add(op);
    }
    setOperations(newOps);
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    const range = difficultyRanges[level];
    setMinRange(range.min);
    setMaxRange(range.max);
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  };

  const generateQuestions = () => {
    if (operations.size === 0) return;

    const newQuestions = [];
    const opsArray = Array.from(operations);

    for (let i = 0; i < numQuestions; i++) {
      let operation = mixOperations
        ? opsArray[Math.floor(Math.random() * opsArray.length)]
        : opsArray[i % opsArray.length];

      const a = generateRandomNumber();
      const b = generateRandomNumber();

      let question, answer;

      switch (operation) {
        case 'addition':
          question = `${a} + ${b}`;
          answer = a + b;
          break;
        case 'subtraction':
          question = `${Math.max(a, b)} - ${Math.min(a, b)}`;
          answer = Math.max(a, b) - Math.min(a, b);
          break;
        case 'multiplication':
          question = `${a} × ${b}`;
          answer = a * b;
          break;
        case 'division':
          if (b === 0) {
            i--;
            continue;
          }
          if (!includeRemainders) {
            const divisor = Math.floor(Math.random() * (maxRange / 2)) + 1;
            const quotient = Math.floor(Math.random() * Math.floor(maxRange / divisor)) + 1;
            question = `${quotient * divisor} ÷ ${divisor}`;
            answer = quotient;
          } else {
            question = `${a} ÷ ${b}`;
            answer = `${Math.floor(a / b)} r${a % b}`;
          }
          break;
        default:
          continue;
      }

      newQuestions.push({ question, answer, operation });
    }

    setQuestions(newQuestions);
    setShowPreview(true);
  };

  const downloadWorksheet = () => {
    if (questions.length === 0) return;
    generateMathsWorksheetPDF({
      questions,
      studentName,
      columns,
      includeAnswerKey,
      difficulty,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">Maths Worksheet Generator</h2>

        {/* Operations */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Operations
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['addition', 'subtraction', 'multiplication', 'division'].map(op => (
              <button
                key={op}
                onClick={() => handleOperationToggle(op)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize ${
                  operations.has(op)
                    ? 'bg-accent text-white'
                    : 'bg-surface text-text-primary border border-border'
                }`}
              >
                {op === 'addition' && '+'}
                {op === 'subtraction' && '−'}
                {op === 'multiplication' && '×'}
                {op === 'division' && '÷'}
                {' ' + op}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Difficulty
          </label>
          <div className="flex gap-3 mb-4">
            {['easy', 'medium', 'hard'].map(level => (
              <button
                key={level}
                onClick={() => handleDifficultyChange(level)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize ${
                  difficulty === level
                    ? 'bg-accent text-white'
                    : 'bg-surface text-text-primary border border-border'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Range */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Min Value
            </label>
            <input
              type="number"
              value={minRange}
              onChange={(e) => setMinRange(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full p-3 border border-border rounded-lg font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Max Value
            </label>
            <input
              type="number"
              value={maxRange}
              onChange={(e) => setMaxRange(Math.max(minRange, parseInt(e.target.value) || 100))}
              className="w-full p-3 border border-border rounded-lg font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Division Options */}
        {operations.has('division') && (
          <div className="mb-6 flex items-center gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeRemainders}
                onChange={(e) => setIncludeRemainders(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm font-medium text-text-primary">Include remainders</span>
            </label>
          </div>
        )}

        {/* Worksheet Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Number of Questions
            </label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              className="w-full p-3 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {[10, 20, 30, 40].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Columns
            </label>
            <select
              value={columns}
              onChange={(e) => setColumns(parseInt(e.target.value))}
              className="w-full p-3 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Student Name
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Optional..."
              className="w-full p-3 border border-border rounded-lg font-sans text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Mix Operations */}
        <div className="flex items-center gap-3 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={mixOperations}
              onChange={(e) => setMixOperations(e.target.checked)}
              disabled={operations.size <= 1}
              className="w-4 h-4 accent-accent disabled:opacity-50"
            />
            <span className="text-sm font-medium text-text-primary">Mix operations</span>
          </label>
        </div>

        {/* Include Answer Key */}
        <div className="flex items-center gap-3 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeAnswerKey}
              onChange={(e) => setIncludeAnswerKey(e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm font-medium text-text-primary">Include answer key</span>
          </label>
        </div>

        <Button
          onClick={generateQuestions}
          disabled={operations.size === 0}
          className="w-full bg-accent text-white font-medium disabled:opacity-50"
        >
          Generate Worksheet
        </Button>
      </Card>

      {/* Preview */}
      {showPreview && questions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
            Preview ({questions.length} questions)
          </h3>

          <div className="bg-white p-4 rounded-lg mb-6 overflow-auto max-h-96 border border-border">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: columns === 1 ? '1fr' : 'repeat(2, 1fr)',
              }}
            >
              {questions.map((q, i) => (
                <div key={i} className="font-mono text-sm text-text-primary">
                  {i + 1}. {q.question} = ___
                </div>
              ))}
            </div>
          </div>

          <Button onClick={downloadWorksheet} className="w-full bg-accent text-white font-medium">
            Download PDF
          </Button>
        </Card>
      )}
    </div>
  );
}
