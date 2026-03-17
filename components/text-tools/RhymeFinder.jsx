'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function RhymeFinder() {
  const [word, setWord] = useState('');
  const [rhymes, setRhymes] = useState([]);
  const [nearRhymes, setNearRhymes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const findRhymes = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setError('');

    try {
      const [rhymeRes, nearRes] = await Promise.all([
        fetch(`https://api.datamuse.com/words?rel_rhy=${encodeURIComponent(word)}&max=50`),
        fetch(`https://api.datamuse.com/words?rel_nry=${encodeURIComponent(word)}&max=20`)
      ]);

      const rhymeData = await rhymeRes.json();
      const nearData = await nearRes.json();

      setRhymes(rhymeData || []);
      setNearRhymes(nearData || []);
    } catch (err) {
      setError('Failed to fetch rhymes. Try again.');
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') findRhymes();
  };

  const syllableBuckets = rhymes.reduce((acc, rhyme) => {
    const syl = rhyme.numSyllables || 1;
    if (!acc[syl]) acc[syl] = [];
    acc[syl].push(rhyme);
    return acc;
  }, {});

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Enter a word
          </label>
          <div className="flex gap-2">
            <Input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. cat, love, orange"
              className="flex-1"
            />
            <Button
              onClick={findRhymes}
              disabled={loading || !word.trim()}
            >
              {loading ? 'Searching...' : 'Find Rhymes'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {rhymes.length > 0 && (
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-4">
              Perfect Rhymes
            </h3>
            <div className="space-y-4">
              {Object.entries(syllableBuckets)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([syllables, words]) => (
                  <div key={syllables}>
                    <p className="text-sm font-medium text-secondary mb-2">
                      {syllables} syllable{parseInt(syllables) !== 1 ? 's' : ''}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {words.map((w) => (
                        <button
                          key={w.word}
                          onClick={() => copyToClipboard(w.word)}
                          className="group px-3 py-2 bg-surface border border-border rounded-lg hover:border-accent hover:bg-accent-muted transition"
                        >
                          <span className="font-mono text-sm text-primary group-hover:text-accent">
                            {w.word}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {nearRhymes.length > 0 && (
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-4">
              Near Rhymes
            </h3>
            <div className="flex flex-wrap gap-2">
              {nearRhymes.map((w) => (
                <button
                  key={w.word}
                  onClick={() => copyToClipboard(w.word)}
                  className="group px-3 py-2 bg-surface border border-border rounded-lg hover:border-accent hover:bg-accent-muted transition"
                >
                  <span className="font-mono text-sm text-secondary group-hover:text-accent">
                    {w.word}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && word && rhymes.length === 0 && nearRhymes.length === 0 && !error && (
          <p className="text-secondary text-sm">No rhymes found. Try a different word.</p>
        )}
      </div>
    </Card>
  );
}
