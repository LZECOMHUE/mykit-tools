'use client';

import { useState, useMemo } from 'react';

const powerWords = [
  'Amazing', 'Proven', 'Secret', 'Essential', 'Exclusive', 'Limited',
  'Revolutionary', 'Urgent', 'Now', 'Instant', 'Fast', 'Easy',
  'Free', 'New', 'Rare', 'Breakthrough', 'Critical', 'Powerful',
];

const spamTriggers = [
  'Free', 'Winner', 'Limited time', 'No obligation', 'Risk free',
  'Unsubscribe', 'Click here', 'Buy now', 'Congratulations',
  'You are a winner', 'Claim reward', 'Urgent action required',
];

const urgencyWords = [
  'Urgent', 'Now', 'Today', 'Last chance', 'Ending soon', 'Deadline',
  'Expire', 'Limited', 'Immediate', 'Quickly', 'Don\'t wait',
];

export default function EmailSubjectLineTester() {
  const [subjectLine, setSubjectLine] = useState('');

  const analysis = useMemo(() => {
    if (!subjectLine.trim()) return null;

    const line = subjectLine.trim();
    const length = line.length;
    const wordCount = line.split(/\s+/).length;
    const emojis = (line.match(/[\p{Emoji}]/gu) || []).length;

    // Check for power words
    const powerWordsFound = powerWords.filter((word) =>
      line.toLowerCase().includes(word.toLowerCase())
    );

    // Check for spam triggers
    const spamTriggersFound = spamTriggers.filter((trigger) =>
      line.toLowerCase().includes(trigger.toLowerCase())
    );

    // Check for urgency words
    const urgencyWordsFound = urgencyWords.filter((word) =>
      line.toLowerCase().includes(word.toLowerCase())
    );

    // Check for personalization (variables like [name], {first_name}, etc.)
    const hasPersonalization = /\[|\{[^}]*\}|\$/g.test(line);

    // Check for questions
    const hasQuestion = /\?/.test(line);

    // Check for numbers
    const hasNumbers = /\d/.test(line);

    // Scoring
    let score = 50; // Base score

    // Length score (ideal 30-50 characters)
    if (length >= 30 && length <= 50) {
      score += 10;
    } else if (length >= 20 && length <= 60) {
      score += 5;
    } else if (length > 70) {
      score -= 5; // Might get cut off
    }

    // Power words boost
    if (powerWordsFound.length > 0) {
      score += Math.min(powerWordsFound.length * 3, 15);
    }

    // Numbers boost
    if (hasNumbers) {
      score += 5;
    }

    // Question boost
    if (hasQuestion) {
      score += 5;
    }

    // Personalization boost
    if (hasPersonalization) {
      score += 5;
    }

    // Emoji boost (1-2 is good, more is worse)
    if (emojis === 1 || emojis === 2) {
      score += 3;
    } else if (emojis > 2) {
      score -= 5;
    }

    // Spam triggers penalty
    score -= spamTriggersFound.length * 10;

    // Urgency words (some urgency is good, but not too much)
    if (urgencyWordsFound.length === 1) {
      score += 5;
    } else if (urgencyWordsFound.length > 1) {
      score -= 5; // Over-urgent looks spammy
    }

    // Word count (5-9 words is ideal)
    if (wordCount >= 5 && wordCount <= 9) {
      score += 5;
    } else if (wordCount < 3) {
      score -= 5;
    } else if (wordCount > 12) {
      score -= 3;
    }

    score = Math.max(0, Math.min(100, score));

    const rating = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Work';
    const ratingColor = score >= 80 ? 'text-success' : score >= 60 ? 'text-accent' : score >= 40 ? 'text-warning' : 'text-error';

    return {
      length,
      wordCount,
      emojis,
      powerWordsFound,
      spamTriggersFound,
      urgencyWordsFound,
      hasPersonalization,
      hasQuestion,
      hasNumbers,
      score: Math.round(score),
      rating,
      ratingColor,
    };
  }, [subjectLine]);

  const suggestions = useMemo(() => {
    if (!analysis) return [];

    const suggestions = [];

    if (analysis.length < 20) {
      suggestions.push('Add more characters — aim for 30-50');
    }
    if (analysis.length > 60) {
      suggestions.push('Shorten it — email clients cut off at 60 chars on mobile');
    }
    if (analysis.wordCount < 3) {
      suggestions.push('Add more words — 5-9 words is ideal');
    }
    if (analysis.wordCount > 12) {
      suggestions.push('Reduce word count — get to the point faster');
    }
    if (analysis.powerWordsFound.length === 0) {
      suggestions.push(`Add a power word: ${powerWords[Math.floor(Math.random() * powerWords.length)]}`);
    }
    if (!analysis.hasNumbers && analysis.score < 70) {
      suggestions.push('Add a number (e.g., "3 ways", "50% off")');
    }
    if (!analysis.hasQuestion && analysis.score < 70) {
      suggestions.push('Try asking a question');
    }
    if (analysis.spamTriggersFound.length > 0) {
      suggestions.push(`Remove spam triggers: ${analysis.spamTriggersFound.slice(0, 2).join(', ')}`);
    }
    if (analysis.urgencyWordsFound.length > 1) {
      suggestions.push('Too much urgency — remove one urgency word');
    }

    return suggestions;
  }, [analysis]);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <label className="block text-text-secondary text-sm font-medium">Paste your subject line:</label>
        <input
          type="text"
          value={subjectLine}
          onChange={(e) => setSubjectLine(e.target.value)}
          placeholder="e.g., 3 proven ways to increase your productivity"
          className="w-full px-4 py-4 bg-white border border-border rounded-[var(--radius-card)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
        />
      </div>

      {analysis && (
        <>
          {/* Score */}
          <div className={`rounded-[var(--radius-card)] border-2 p-6 text-center space-y-2 ${
            analysis.score >= 80 ? 'bg-success/10 border-success' :
            analysis.score >= 60 ? 'bg-accent-muted border-accent' :
            analysis.score >= 40 ? 'bg-warning/10 border-warning' :
            'bg-error/10 border-error'
          }`}>
            <p className="text-text-secondary text-sm">Subject Line Score</p>
            <p className={`font-mono-num text-5xl font-bold ${analysis.ratingColor}`}>
              {analysis.score}
            </p>
            <p className={`text-lg font-semibold ${analysis.ratingColor}`}>
              {analysis.rating}
            </p>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-2">
              <h4 className="text-text-primary font-semibold text-sm">Suggestions:</h4>
              <ul className="space-y-2">
                {suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex gap-2 text-text-secondary text-sm">
                    <span className="text-accent">→</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-3 text-center">
              <p className="text-text-secondary text-xs mb-1">Characters</p>
              <p className="font-mono-num text-xl font-bold text-text-primary">
                {analysis.length}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {analysis.length < 30 ? '↑' : analysis.length > 50 ? '↓' : '✓'}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-3 text-center">
              <p className="text-text-secondary text-xs mb-1">Words</p>
              <p className="font-mono-num text-xl font-bold text-text-primary">
                {analysis.wordCount}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {analysis.wordCount < 5 ? '↑' : analysis.wordCount > 9 ? '↓' : '✓'}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-3 text-center">
              <p className="text-text-secondary text-xs mb-1">Power Words</p>
              <p className="font-mono-num text-xl font-bold text-text-primary">
                {analysis.powerWordsFound.length}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {analysis.powerWordsFound.length > 0 ? '✓' : '↑'}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-3 text-center">
              <p className="text-text-secondary text-xs mb-1">Spam Score</p>
              <p className="font-mono-num text-xl font-bold text-text-primary">
                {analysis.spamTriggersFound.length}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {analysis.spamTriggersFound.length === 0 ? '✓' : '⚠'}
              </p>
            </div>
          </div>

          {/* Analysis Details */}
          <div className="space-y-4">
            {analysis.powerWordsFound.length > 0 && (
              <div className="bg-success/10 border border-success rounded-[var(--radius-card)] p-3">
                <p className="text-text-primary text-sm font-medium mb-1">✓ Power Words Found:</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.powerWordsFound.map((word) => (
                    <span key={word} className="px-2 py-1 bg-white rounded text-xs font-medium text-text-primary border border-success">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.spamTriggersFound.length > 0 && (
              <div className="bg-warning/10 border border-warning rounded-[var(--radius-card)] p-3">
                <p className="text-text-primary text-sm font-medium mb-1">⚠ Spam Triggers Detected:</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.spamTriggersFound.map((trigger) => (
                    <span key={trigger} className="px-2 py-1 bg-white rounded text-xs font-medium text-text-primary border border-warning">
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-info/10 border border-info rounded-[var(--radius-card)] p-3 space-y-2">
              <p className="text-text-primary text-sm font-medium">Elements:</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
                <p>{analysis.hasQuestion ? '✓' : '○'} Has question</p>
                <p>{analysis.hasNumbers ? '✓' : '○'} Has number</p>
                <p>{analysis.hasPersonalization ? '✓' : '○'} Personalized</p>
                <p>{analysis.emojis > 0 ? '✓' : '○'} {analysis.emojis} emoji{analysis.emojis !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 text-sm text-text-secondary space-y-2">
            <p className="font-medium text-text-primary">💡 Best Practices:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>30-50 characters — fits on mobile without cutting off</li>
              <li>5-9 words — concise but descriptive</li>
              <li>Start with action/benefit — "Increase your sales by 50%"</li>
              <li>Personalization — [Name], [Company] get better open rates</li>
              <li>One power word is enough — avoid sounding salesy</li>
              <li>A/B test variations to find what works for your audience</li>
            </ul>
          </div>
        </>
      )}

      {!analysis && subjectLine.trim() && (
        <div className="text-center text-text-muted py-4">
          <p className="text-sm">Enter a subject line to analyze</p>
        </div>
      )}
    </div>
  );
}
