'use client';

import { useState, useMemo } from 'react';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
  'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse',
  'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
  'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim',
  'id', 'est', 'laborum', 'pellentesque', 'habitant', 'morbi', 'tristique', 'senectus',
  'netus', 'malesuada', 'fames', 'turpis', 'egestas', 'volutpat', 'orci', 'purus',
  'erat', 'venenatis', 'odio', 'vitae', 'justo', 'nullam', 'quat', 'massa', 'nisl',
  'quis', 'sem', 'volutpat', 'sagittis', 'mauris', 'blandit', 'alt', 'lacus', 'vitae',
  'semper', 'suscipit', 'leo', 'ac', 'nec', 'diam', 'praesent', 'luctus', 'malesuada',
  'libero', 'metus', 'volutpat', 'augue', 'aliquam', 'erat', 'volutpat', 'cras',
  'non', 'velit', 'nec', 'nisi', 'vulputate', 'nonummy', 'maecenas', 'tincidunt',
  'lacus', 'at', 'velit', 'vivamus', 'vel', 'nulla', 'eget', 'eros', 'eleifend',
  'porta', 'rhoncus', 'leo', 'sed', 'vulpis', 'vestibulum', 'ante', 'ipsum',
  'primis', 'in', 'faucibus', 'orci', 'luctus', 'posuere', 'cubilia', 'curae',
  'donec', 'pharetra', 'rhoncus', 'odio', 'mattis', 'imperdiet', 'mauris', 'eget',
  'arcu', 'vivamus', 'suscipit', 'tortor', 'eget', 'felis', 'porttitor', 'volutpat',
  'nullam', 'metus', 'turpis', 'accumsan', 'ac', 'tincidunt', 'in', 'sollicitudin',
];

export default function LoremIpsumGenerator() {
  const [generationType, setGenerationType] = useState('paragraphs');
  const [paragraphCount, setParagraphCount] = useState(3);
  const [sentenceCount, setSentenceCount] = useState(5);
  const [wordCount, setWordCount] = useState(50);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [copied, setCopied] = useState(false);

  const generatedText = useMemo(() => {
    let result = '';

    if (generationType === 'paragraphs') {
      for (let p = 0; p < paragraphCount; p++) {
        let paragraph = [];
        let currentWords = 0;
        const targetWords = wordsPerParagraph + Math.floor(Math.random() * 20 - 10);

        while (currentWords < targetWords) {
          const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
          paragraph.push(word);
          currentWords++;
        }

        result += paragraph.join(' ') + '.\n\n';
      }
    } else if (generationType === 'sentences') {
      for (let s = 0; s < sentenceCount; s++) {
        let sentence = [];
        const wordsInSentence = 5 + Math.floor(Math.random() * 10);

        for (let w = 0; w < wordsInSentence; w++) {
          const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
          sentence.push(word);
        }

        result += sentence.join(' ') + '. ';
      }
      result += '\n';
    } else if (generationType === 'words') {
      for (let w = 0; w < wordCount; w++) {
        const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
        result += word + ' ';
      }
    }

    return result.trim();
  }, [generationType, paragraphCount, sentenceCount, wordCount, wordsPerParagraph]);

  const wordCountValue = generatedText.split(/\s+/).filter(w => w.length > 0).length;
  const charCountValue = generatedText.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Configuration Panel */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Generation Type</h3>

        <div className="space-y-4">
          {/* Generation Type Selection */}
          <div className="flex gap-4">
            {[
              { value: 'paragraphs', label: 'Paragraphs' },
              { value: 'sentences', label: 'Sentences' },
              { value: 'words', label: 'Words' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="generationType"
                  value={option.value}
                  checked={generationType === option.value}
                  onChange={e => setGenerationType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-text-primary">{option.label}</span>
              </label>
            ))}
          </div>

          {/* Conditional Controls */}
          {generationType === 'paragraphs' && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Number of Paragraphs: {paragraphCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={paragraphCount}
                  onChange={e => setParagraphCount(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Words per Paragraph: {wordsPerParagraph}
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={wordsPerParagraph}
                  onChange={e => setWordsPerParagraph(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {generationType === 'sentences' && (
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Number of Sentences: {sentenceCount}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={sentenceCount}
                onChange={e => setSentenceCount(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {generationType === 'words' && (
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Number of Words: {wordCount}
              </label>
              <input
                type="range"
                min="5"
                max="500"
                value={wordCount}
                onChange={e => setWordCount(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Output */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Generated Text</h3>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] text-sm font-medium hover:bg-opacity-90"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        <textarea
          value={generatedText}
          readOnly
          className="w-full h-64 p-4 bg-white border border-border rounded-[var(--radius-input)] font-mono text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <div className="flex gap-4 mt-4 text-sm text-text-secondary">
          <span>Words: <span className="font-mono-num font-semibold text-text-primary">{wordCountValue}</span></span>
          <span>Characters: <span className="font-mono-num font-semibold text-text-primary">{charCountValue}</span></span>
        </div>
      </div>
    </div>
  );
}
