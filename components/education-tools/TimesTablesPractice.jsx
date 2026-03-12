'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateMathsWorksheetPDF } from '@/lib/worksheet-pdf';

export default function TimesTablesPractice() {
  const [mode, setMode] = useState('practice');
  const [selectedTables, setSelectedTables] = useState(new Set([2, 3, 4, 5]));
  const [worksheetQuestions, setWorksheetQuestions] = useState(20);
  const [worksheetColumns, setWorksheetColumns] = useState(1);

  // Practice mode state
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showKey, setShowKey] = useState(false);


  const generateQuestions = (tables, count) => {
    const questions = [];
    for (let i = 0; i < count; i++) {
      const table = Array.from(tables)[Math.floor(Math.random() * tables.size)];
      const multiplier = Math.floor(Math.random() * 10) + 1;
      questions.push({ a: table, b: multiplier, answer: table * multiplier });
    }
    return questions;
  };

  const handleTableToggle = (table) => {
    const newSelected = new Set(selectedTables);
    if (newSelected.has(table)) {
      newSelected.delete(table);
    } else {
      newSelected.add(table);
    }
    setSelectedTables(newSelected);
  };

  const startPractice = () => {
    if (selectedTables.size === 0) return;
    const questions = generateQuestions(selectedTables, 20);
    setAnswers(questions);
    setPracticeStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer('');
    setFeedback('');
    setShowKey(false);
  };

  const handleAnswerSubmit = () => {
    const current = answers[currentQuestion];
    const isCorrect = parseInt(userAnswer) === current.answer;

    if (isCorrect) {
      setFeedback('✓ Correct!');
      setScore(score + 1);
    } else {
      setFeedback(`✗ Incorrect. Answer: ${current.answer}`);
    }

    setTimeout(() => {
      if (currentQuestion < answers.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setFeedback('');
      }
    }, 1500);
  };

  const resetPractice = () => {
    setPracticeStarted(false);
    setCurrentQuestion(0);
    setUserAnswer('');
    setFeedback('');
    setScore(0);
    setAnswers([]);
  };

  const downloadWorksheet = () => {
    if (selectedTables.size === 0) return;
    const questions = generateWorksheetQuestions();
    if (questions.length === 0) return;

    const formatted = questions.map((q) => ({
      question: `${q.a} \u00d7 ${q.b}`,
      answer: q.answer,
      operation: 'multiplication',
    }));

    generateMathsWorksheetPDF({
      questions: formatted,
      studentName: '',
      columns: worksheetColumns,
      includeAnswerKey: true,
      difficulty: 'times-tables',
    });
  };

  const generateWorksheetQuestions = () => {
    return generateQuestions(selectedTables, worksheetQuestions);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">Times Tables Practice</h2>

        {/* Mode Selection */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode('practice')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'practice'
                ? 'bg-accent text-white'
                : 'bg-surface text-text-primary border border-border'
            }`}
          >
            Practice Mode
          </button>
          <button
            onClick={() => setMode('worksheet')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'worksheet'
                ? 'bg-accent text-white'
                : 'bg-surface text-text-primary border border-border'
            }`}
          >
            Worksheet Mode
          </button>
        </div>

        {!practiceStarted && mode === 'practice' && (
          <>
            {/* Select Tables */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-3">
                Select Times Tables to Practice
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(table => (
                  <button
                    key={table}
                    onClick={() => handleTableToggle(table)}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedTables.has(table)
                        ? 'bg-accent text-white'
                        : 'bg-surface text-text-primary border border-border'
                    }`}
                  >
                    {table}x
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={startPractice}
              disabled={selectedTables.size === 0}
              className="w-full bg-accent text-white font-medium disabled:opacity-50"
            >
              Start Practice (20 Questions)
            </Button>
          </>
        )}

        {mode === 'worksheet' && !practiceStarted && (
          <>
            {/* Select Tables */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-3">
                Select Times Tables
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(table => (
                  <button
                    key={table}
                    onClick={() => handleTableToggle(table)}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedTables.has(table)
                        ? 'bg-accent text-white'
                        : 'bg-surface text-text-primary border border-border'
                    }`}
                  >
                    {table}x
                  </button>
                ))}
              </div>
            </div>

            {/* Worksheet Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Number of Questions
                </label>
                <select
                  value={worksheetQuestions}
                  onChange={(e) => setWorksheetQuestions(parseInt(e.target.value))}
                  className="w-full p-3 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {[20, 40, 60].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Columns
                </label>
                <select
                  value={worksheetColumns}
                  onChange={(e) => setWorksheetColumns(parseInt(e.target.value))}
                  className="w-full p-3 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value={1}>1 Column</option>
                  <option value={2}>2 Columns</option>
                </select>
              </div>
            </div>

            <Button
              onClick={downloadWorksheet}
              disabled={selectedTables.size === 0}
              className="w-full bg-accent text-white font-medium disabled:opacity-50"
            >
              Download PDF
            </Button>
          </>
        )}
      </Card>

      {/* Practice Mode Active */}
      {practiceStarted && mode === 'practice' && currentQuestion < answers.length && (
        <Card className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-heading font-bold text-text-primary">
                Question {currentQuestion + 1} of {answers.length}
              </h3>
              <span className="text-sm font-medium text-text-secondary">
                Score: {score}/{currentQuestion}
              </span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / answers.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8 text-center">
            <div className="text-6xl font-mono font-bold text-text-primary mb-4">
              {answers[currentQuestion].a} × {answers[currentQuestion].b} = ?
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && userAnswer && handleAnswerSubmit()}
              placeholder="Your answer..."
              autoFocus
              className="w-full p-4 text-center text-3xl border-2 border-border rounded-lg font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-4 rounded-lg text-center font-bold text-lg mb-4 ${
                feedback.includes('✓')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {feedback}
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleAnswerSubmit}
            disabled={!userAnswer || feedback !== ''}
            className="w-full bg-accent text-white font-medium disabled:opacity-50"
          >
            Submit Answer
          </Button>
        </Card>
      )}

      {/* Practice Complete */}
      {practiceStarted && mode === 'practice' && currentQuestion >= answers.length && (
        <Card className="p-6">
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-4 text-center">
            Practice Complete!
          </h3>

          <div className="bg-surface p-6 rounded-lg mb-6 text-center">
            <div className="text-5xl font-mono font-bold text-accent mb-2">
              {score}/{answers.length}
            </div>
            <p className="text-lg text-text-secondary">
              Correct Answers ({Math.round((score / answers.length) * 100)}%)
            </p>
          </div>

          {showKey && (
            <div className="bg-white p-4 rounded-lg mb-6 border border-border max-h-96 overflow-auto">
              <h4 className="font-semibold text-text-primary mb-3">Answer Key</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 font-mono text-sm">
                {answers.map((q, i) => (
                  <div key={i} className="p-2 bg-surface rounded">
                    <div className="text-text-secondary">{q.a} × {q.b}</div>
                    <div className="text-text-primary font-bold">{q.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setShowKey(!showKey)}
              className="flex-1 px-4 py-2 bg-surface text-text-primary border border-border rounded-lg font-medium hover:bg-white transition-colors"
            >
              {showKey ? 'Hide' : 'Show'} Answer Key
            </button>
            <Button
              onClick={resetPractice}
              className="flex-1 bg-accent text-white font-medium"
            >
              Try Again
            </Button>
          </div>
        </Card>
      )}

    </div>
  );
}
