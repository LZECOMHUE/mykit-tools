'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Fallback facts if API is unavailable
const FALLBACK_FACTS = {
  math: {
    2: 'The first even prime number',
    3: 'The first odd prime number',
    7: 'A prime number and lucky number in many cultures',
    42: 'The answer to life, the universe, and everything (Douglas Adams)',
    100: 'A perfect square, 10 times 10',
    144: 'A Fibonacci number, also known as a gross',
    365: 'The number of days in a year',
    999: 'The largest three-digit number',
  },
  trivia: {
    2: 'Binary is the foundation of all computing',
    3: 'A triangular number, the smallest triangle',
    7: 'Days of the week across most cultures',
    42: 'The number of minutes in one degree of arc',
    100: '10 to the power of 2',
    144: 'Eggs in a dozen dozens',
    365: 'Approximately the length of a year',
    999: 'Emergency services number in many countries',
  }
};

export default function NumberFacts() {
  const [number, setNumber] = useState('');
  const [mathFact, setMathFact] = useState('');
  const [triviaFact, setTriviaFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getFacts = async () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) {
      setError('Please enter a valid positive number');
      return;
    }

    setLoading(true);
    setError('');
    setMathFact('');
    setTriviaFact('');

    try {
      const [mathRes, triviaRes] = await Promise.all([
        fetch(`http://numbersapi.com/${num}/math?json`).catch(() => ({ ok: false })),
        fetch(`http://numbersapi.com/${num}/trivia?json`).catch(() => ({ ok: false }))
      ]);

      let mathData = null;
      let triviaData = null;

      if (mathRes.ok) {
        mathData = await mathRes.json();
      }
      if (triviaRes.ok) {
        triviaData = await triviaRes.json();
      }

      setMathFact(mathData?.text || FALLBACK_FACTS.math[num] || 'No mathematical fact available');
      setTriviaFact(triviaData?.text || FALLBACK_FACTS.trivia[num] || 'No trivia fact available');
    } catch (err) {
      // Use fallbacks
      setMathFact(FALLBACK_FACTS.math[num] || 'Unable to fetch fact');
      setTriviaFact(FALLBACK_FACTS.trivia[num] || 'Unable to fetch fact');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') getFacts();
  };

  const getRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    setNumber(randomNum.toString());
    setNumber(randomNum.toString());
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Enter a number
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. 42, 365, 2024"
              className="flex-1"
            />
            <Button
              onClick={getFacts}
              disabled={loading || !number}
            >
              {loading ? 'Loading...' : 'Get Facts'}
            </Button>
          </div>
          <button
            onClick={getRandomNumber}
            className="mt-2 text-sm text-accent hover:text-accent-hover"
          >
            Random number
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {mathFact && (
          <div className="space-y-3">
            <div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                📐 Mathematical Fact
              </h3>
              <p className="bg-surface border border-border p-4 rounded-lg text-primary leading-relaxed">
                {mathFact}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                🎯 Trivia Fact
              </h3>
              <p className="bg-surface border border-border p-4 rounded-lg text-primary leading-relaxed">
                {triviaFact}
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={getRandomNumber}
                className="text-sm text-accent hover:text-accent-hover font-medium"
              >
                Try another number
              </button>
            </div>
          </div>
        )}

        {!loading && !mathFact && !error && number && (
          <p className="text-secondary text-sm">Click "Get Facts" to discover interesting facts about this number.</p>
        )}
      </div>
    </Card>
  );
}
