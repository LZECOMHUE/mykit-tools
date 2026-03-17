'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function WordAssociationTool() {
  const [word, setWord] = useState('');
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const findAssociations = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `https://api.datamuse.com/words?rel_trg=${encodeURIComponent(word)}&max=50`
      );
      const data = await res.json();
      setAssociations(data.sort((a, b) => (b.score || 0) - (a.score || 0)) || []);
    } catch (err) {
      setError('Failed to fetch associations. Try again.');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') findAssociations();
  };

  const maxScore = Math.max(...associations.map(a => a.score || 0), 1);

  const getRelevanceColor = (score) => {
    const percent = (score / maxScore) * 100;
    if (percent > 75) return 'text-accent';
    if (percent > 50) return 'text-blue-400';
    return 'text-secondary';
  };

  const getSize = (score) => {
    const percent = (score / maxScore) * 100;
    if (percent > 75) return 'text-2xl font-bold';
    if (percent > 50) return 'text-xl font-semibold';
    return 'text-base font-medium';
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Enter a word to find associations
          </label>
          <div className="flex gap-2">
            <Input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. summer, rain, coffee"
              className="flex-1"
            />
            <Button
              onClick={findAssociations}
              disabled={loading || !word.trim()}
            >
              {loading ? 'Loading...' : 'Find Associations'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {associations.length > 0 && (
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-6">
              Word Cloud - Words Associated with "{word}"
            </h3>
            <div className="flex flex-wrap gap-4 items-center justify-center p-6 bg-surface rounded-lg">
              {associations.map((assoc) => (
                <div
                  key={assoc.word}
                  className={`${getSize(assoc.score)} ${getRelevanceColor(assoc.score)} cursor-pointer hover:text-accent transition font-mono`}
                  title={`Relevance score: ${assoc.score}`}
                >
                  {assoc.word}
                </div>
              ))}
            </div>
            <p className="text-xs text-secondary mt-3 text-center">
              Larger words have stronger associations
            </p>
          </div>
        )}

        {!loading && word && associations.length === 0 && !error && (
          <p className="text-secondary text-sm">No associations found. Try a different word.</p>
        )}

        {associations.length > 0 && (
          <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
            <p className="font-medium mb-1">Brainstorming Tip:</p>
            <p>Use these associations to generate creative ideas, write poetry, or find related concepts.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
