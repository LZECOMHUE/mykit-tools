'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateWordScramblePDF } from '@/lib/worksheet-pdf';

const PRESET_THEMES = {
  animals: ['dog', 'cat', 'elephant', 'giraffe', 'zebra', 'lion', 'tiger', 'monkey', 'penguin', 'dolphin'],
  food: ['apple', 'banana', 'carrot', 'broccoli', 'pizza', 'chocolate', 'cheese', 'bread', 'milk', 'egg'],
  christmas: ['santa', 'reindeer', 'sleigh', 'presents', 'decoration', 'snowflake', 'carol', 'holly', 'mistletoe', 'tinsel'],
  halloween: ['pumpkin', 'ghost', 'witch', 'skeleton', 'monster', 'candy', 'costume', 'scare', 'spooky', 'haunted'],
  subjects: ['maths', 'english', 'science', 'history', 'geography', 'art', 'music', 'sport', 'drama', 'computer'],
};

function scrambleWord(word) {
  let scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
  while (scrambled === word && word.length > 1) {
    scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
  }
  return scrambled;
}

export default function WordScrambleGenerator() {
  const [inputMode, setInputMode] = useState('theme');
  const [selectedTheme, setSelectedTheme] = useState('animals');
  const [customWords, setCustomWords] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [showAnswers, setShowAnswers] = useState(false);
  const [scrambledWords, setScrambledWords] = useState([]);
  const [originalWords, setOriginalWords] = useState([]);

  const handleGenerate = () => {
    let words = [];

    if (inputMode === 'theme') {
      words = PRESET_THEMES[selectedTheme] || [];
    } else {
      words = customWords
        .split('\n')
        .map(w => w.trim().toLowerCase())
        .filter(w => w.length > 0);
    }

    if (words.length === 0) return;

    setOriginalWords(words);

    const scrambled = words.map(word => {
      if (difficulty === 'easy') {
        // Keep first and last letter
        if (word.length <= 2) return scrambleWord(word);
        const first = word[0];
        const last = word[word.length - 1];
        const middle = word.slice(1, -1).split('').sort(() => Math.random() - 0.5).join('');
        return first + middle + last;
      } else if (difficulty === 'medium') {
        return scrambleWord(word);
      } else {
        // Hard: scramble + remove vowel
        let scrambled = scrambleWord(word);
        const vowels = 'aeiou';
        let vowelIndex = -1;
        for (let i = 0; i < scrambled.length; i++) {
          if (vowels.includes(scrambled[i])) {
            vowelIndex = i;
            break;
          }
        }
        if (vowelIndex !== -1) {
          scrambled = scrambled.slice(0, vowelIndex) + '_' + scrambled.slice(vowelIndex + 1);
        }
        return scrambled;
      }
    });

    setScrambledWords(scrambled);
  };

  const downloadWorksheet = () => {
    const themeName = inputMode === 'theme'
      ? selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
      : 'Custom';
    generateWordScramblePDF({
      scrambledWords,
      originalWords,
      difficulty,
      themeName,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">Word Scramble Generator</h2>

        {/* Input Mode Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">Word Source</label>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setInputMode('theme')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                inputMode === 'theme'
                  ? 'bg-accent text-white'
                  : 'bg-surface text-text-primary border border-border'
              }`}
            >
              Preset Themes
            </button>
            <button
              onClick={() => setInputMode('custom')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                inputMode === 'custom'
                  ? 'bg-accent text-white'
                  : 'bg-surface text-text-primary border border-border'
              }`}
            >
              Custom Words
            </button>
          </div>
        </div>

        {/* Theme Selection */}
        {inputMode === 'theme' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">Theme</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.keys(PRESET_THEMES).map(theme => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    selectedTheme === theme
                      ? 'bg-accent text-white'
                      : 'bg-surface text-text-primary border border-border'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Words */}
        {inputMode === 'custom' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Enter words (one per line)
            </label>
            <textarea
              value={customWords}
              onChange={(e) => setCustomWords(e.target.value)}
              placeholder="word1&#10;word2&#10;word3..."
              className="w-full p-3 border border-border rounded-lg font-sans text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              rows={6}
            />
          </div>
        )}

        {/* Difficulty */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">Difficulty</label>
          <div className="flex gap-3 flex-wrap">
            {['easy', 'medium', 'hard'].map(level => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  difficulty === level
                    ? 'bg-accent text-white'
                    : 'bg-surface text-text-primary border border-border'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-2">
            {difficulty === 'easy' && 'Keep first and last letters'}
            {difficulty === 'medium' && 'Fully scrambled'}
            {difficulty === 'hard' && 'Scrambled + missing vowel'}
          </p>
        </div>

        {/* Generate Button */}
        <Button onClick={handleGenerate} className="w-full bg-accent text-white font-medium">
          Generate Word Scramble
        </Button>
      </Card>

      {/* Output */}
      {scrambledWords.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold text-text-primary">
              Generated Scramble ({scrambledWords.length} words)
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-text-primary text-sm mb-3">Scrambled Words</h4>
                <ol className="space-y-2 text-sm">
                  {scrambledWords.map((word, i) => (
                    <li key={i} className="font-mono text-text-primary">
                      {i + 1}. {word}
                    </li>
                  ))}
                </ol>
              </div>
              {showAnswers && (
                <div>
                  <h4 className="font-semibold text-text-primary text-sm mb-3">Answer Key</h4>
                  <ol className="space-y-2 text-sm">
                    {originalWords.map((word, i) => (
                      <li key={i} className="font-mono text-text-primary">
                        {i + 1}. {word}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
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
