'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateSpellingTestPDF } from '@/lib/worksheet-pdf';

export default function SpellingTestGenerator() {
  const [words, setWords] = useState('');
  const [studentName, setStudentName] = useState('');
  const [testDate, setTestDate] = useState('');
  const [numVersions, setNumVersions] = useState(1);
  const [includeSentences, setIncludeSentences] = useState(false);
  const [includeWordCount, setIncludeWordCount] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [generatedTests, setGeneratedTests] = useState([]);

  const handleGenerate = () => {
    const wordList = words
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length > 0);

    if (wordList.length === 0) return;

    const versions = [];
    for (let v = 0; v < numVersions; v++) {
      const shuffled = [...wordList].sort(() => Math.random() - 0.5);
      versions.push(shuffled);
    }

    setGeneratedTests(versions);
  };

  const downloadWorksheet = () => {
    generateSpellingTestPDF({
      testVersions: generatedTests,
      studentName,
      testDate,
      includeWordCount,
      showAnswers,
    });
  };

  const wordList = words
    .split('\n')
    .map(w => w.trim())
    .filter(w => w.length > 0);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">Spelling Test Generator</h2>

        {/* Words Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Spelling Words (one per line, 5-20 words)
          </label>
          <textarea
            value={words}
            onChange={(e) => setWords(e.target.value)}
            placeholder="word1&#10;word2&#10;word3..."
            className="w-full p-3 border border-border rounded-lg font-sans text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            rows={8}
          />
          <p className="text-xs text-text-muted mt-1">
            Words entered: {wordList.length}
          </p>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Student Name (optional)
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name..."
              className="w-full p-3 border border-border rounded-lg font-sans text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Test Date (optional)
            </label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full p-3 border border-border rounded-lg font-sans text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Number of Versions
            </label>
            <select
              value={numVersions}
              onChange={(e) => setNumVersions(parseInt(e.target.value))}
              className="w-full p-3 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {[1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSentences}
                onChange={(e) => setIncludeSentences(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm font-medium text-text-primary">Use in sentence</span>
            </label>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeWordCount}
                onChange={(e) => setIncludeWordCount(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm font-medium text-text-primary">Include word count</span>
            </label>
          </div>
        </div>

        <Button onClick={handleGenerate} className="w-full bg-accent text-white font-medium">
          Generate Spelling Test
        </Button>
      </Card>

      {/* Output */}
      {generatedTests.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold text-text-primary">
              Test Versions Generated ({generatedTests.length})
            </h3>
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="px-3 py-1 text-sm bg-surface text-text-primary border border-border rounded-lg hover:bg-white transition-colors"
            >
              {showAnswers ? 'Hide' : 'Show'} Answers
            </button>
          </div>

          {/* Preview */}
          <div className="bg-white p-4 rounded-lg mb-6 overflow-auto max-h-96">
            <div className="space-y-8">
              {generatedTests.map((testWords, vIdx) => (
                <div key={vIdx}>
                  <h4 className="font-semibold text-text-primary mb-3 text-sm">
                    Version {vIdx + 1}
                  </h4>
                  <ol className="space-y-2 font-mono text-sm text-text-primary">
                    {testWords.map((word, idx) => (
                      <li key={idx}>
                        {idx + 1}. {showAnswers ? word : '_'.repeat(Math.max(word.length, 10))}
                      </li>
                    ))}
                  </ol>
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
