'use client';

import { useState, useMemo } from 'react';

const DEFAULT_STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
  'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall',
  'not', 'no', 'if', 'as', 'so', 'at', 'by', 'for', 'from', 'in',
  'into', 'of', 'on', 'to', 'with', 'that', 'this', 'it', 'i', 'you',
  'he', 'she', 'we', 'they', 'my', 'your', 'his', 'her', 'our', 'its',
  'me', 'him', 'us', 'them', 'am', 'be', 'been', 'which', 'what', 'when',
  'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
  'most', 'other', 'some', 'such', 'than', 'too', 'very'
]);

export default function WordFrequencyCounter() {
  const [text, setText] = useState('');
  const [ignoreCommon, setIgnoreCommon] = useState(true);
  const [minLength, setMinLength] = useState(1);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const wordData = useMemo(() => {
    if (!text.trim()) return { words: [], totalUnique: 0, totalWords: 0 };

    const processedText = caseSensitive ? text : text.toLowerCase();
    const words = processedText.split(/\s+/).filter(w => w.length > 0);

    const freq = {};
    words.forEach(word => {
      const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
      if (cleanWord.length >= minLength) {
        const checkWord = caseSensitive ? cleanWord : cleanWord.toLowerCase();
        if (!ignoreCommon || !DEFAULT_STOP_WORDS.has(checkWord)) {
          freq[cleanWord] = (freq[cleanWord] || 0) + 1;
        }
      }
    });

    const sorted = Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / words.length) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count);

    return {
      words: sorted.slice(0, 20),
      totalUnique: Object.keys(freq).length,
      totalWords: words.length
    };
  }, [text, ignoreCommon, minLength, caseSensitive]);

  return (
    <div className="w-full space-y-6">
      {/* Input */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Paste Your Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to analyze word frequency..."
          className="w-full mt-2 min-h-[150px] rounded-[var(--radius-input)] border border-border bg-white p-3 font-sans text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      {/* Options */}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreCommon}
            onChange={(e) => setIgnoreCommon(e.target.checked)}
            className="w-4 h-4 rounded accent-accent"
          />
          <span className="text-text-secondary text-sm font-medium">
            Ignore Common Words
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4 rounded accent-accent"
          />
          <span className="text-text-secondary text-sm font-medium">
            Case Sensitive
          </span>
        </label>

        <div>
          <label className="text-text-secondary text-sm font-medium">
            Minimum Word Length
          </label>
          <input
            type="number"
            value={minLength}
            onChange={(e) => setMinLength(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="20"
            className="w-full mt-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Stats */}
      {text.trim() && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
              <div className="text-lg font-bold font-mono text-text-primary">
                {wordData.totalWords}
              </div>
              <div className="text-[11px] text-text-muted mt-1">Total Words</div>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
              <div className="text-lg font-bold font-mono text-text-primary">
                {wordData.totalUnique}
              </div>
              <div className="text-[11px] text-text-muted mt-1">Unique Words</div>
            </div>
          </div>

          {/* Word Frequency Table */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Top 20 Most Frequent Words
            </h3>
            <div className="space-y-2">
              {wordData.words.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-12 text-right">
                    <span className="text-sm font-mono font-bold text-text-primary">
                      {item.count}
                    </span>
                  </div>
                  <div className="flex-1 bg-surface rounded-[var(--radius-input)] overflow-hidden">
                    <div
                      className="h-6 bg-accent rounded-[var(--radius-input)] flex items-center px-2 transition-all"
                      style={{
                        width: `${Math.min(100, (item.count / wordData.words[0].count) * 100)}%`
                      }}
                    >
                      {item.count === wordData.words[0].count && (
                        <span className="text-[10px] text-white font-mono font-bold">
                          {item.count}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-sm text-text-secondary">{item.word}</span>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-[11px] text-text-muted font-mono">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
