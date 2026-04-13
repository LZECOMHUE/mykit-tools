'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function SynonymFinder() {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const findSynonyms = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setError('');

    try {
      const [synRes, simRes] = await Promise.all([
        fetch(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}&max=50`),
        fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(word)}&max=30`)
      ]);

      const synData = await synRes.json();
      const simData = await simRes.json();

      setSynonyms(synData.sort((a, b) => (b.score || 0) - (a.score || 0)) || []);
      setSimilar(simData.sort((a, b) => (b.score || 0) - (a.score || 0)) || []);
    } catch (err) {
      setError('Failed to fetch synonyms. Try again.');
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') findSynonyms();
  };

  const maxScore = Math.max(...synonyms.map(s => s.score || 0), 1);

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Enter a word
          </label>
          <div className="flex gap-2">
            <Input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. happy, quick, smart"
              className="flex-1"
            />
            <Button
              onClick={findSynonyms}
              disabled={loading || !word.trim()}
            >
              {loading ? 'Searching...' : 'Find Synonyms'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {synonyms.length > 0 && (
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-4">
              Synonyms
            </h3>
            <div className="space-y-2">
              {synonyms.map((syn) => (
                <button
                  key={syn.word}
                  onClick={() => copyToClipboard(syn.word)}
                  className="w-full group text-left p-3 bg-surface border border-border rounded-lg hover:border-accent hover:bg-accent-muted transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-primary group-hover:text-accent">
                      {syn.word}
                    </span>
                    <div className="h-2 bg-border rounded-full w-16">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{
                          width: `${(syn.score / maxScore) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {similar.length > 0 && (
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-4">
              Similar Meaning
            </h3>
            <div className="flex flex-wrap gap-2">
              {similar.map((sim) => (
                <button
                  key={sim.word}
                  onClick={() => copyToClipboard(sim.word)}
                  className="group px-3 py-2 bg-surface border border-border rounded-lg hover:border-accent hover:bg-accent-muted transition"
                >
                  <span className="font-mono text-sm text-secondary group-hover:text-accent">
                    {sim.word}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && word && synonyms.length === 0 && similar.length === 0 && !error && (
          <p className="text-secondary text-sm">No synonyms found. Try a different word.</p>
        )}
      </div>
    </Card>
  );
}
