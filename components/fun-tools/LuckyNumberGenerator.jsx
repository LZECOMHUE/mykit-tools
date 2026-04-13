'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const COLOURS = [
  { name: 'Red', css: 'bg-red-500' },
  { name: 'Orange', css: 'bg-orange-500' },
  { name: 'Yellow', css: 'bg-yellow-400' },
  { name: 'Green', css: 'bg-green-500' },
  { name: 'Blue', css: 'bg-blue-500' },
  { name: 'Purple', css: 'bg-purple-500' },
  { name: 'Pink', css: 'bg-pink-500' },
  { name: 'Gold', css: 'bg-amber-400' },
  { name: 'Silver', css: 'bg-gray-400' },
  { name: 'White', css: 'bg-white border border-border' },
];

const PERSONALITY_INSIGHTS = {
  1: 'Leader and innovator. You are independent and pioneering.',
  2: 'Diplomat and mediator. You value harmony and cooperation.',
  3: 'Creative and expressive. You communicate with passion.',
  4: 'Practical and organized. You build solid foundations.',
  5: 'Adventurous and freedom-loving. You seek variety.',
  6: 'Nurturing and responsible. You care for others deeply.',
  7: 'Spiritual and analytical. You seek wisdom and truth.',
  8: 'Ambitious and powerful. You pursue success and recognition.',
  9: 'Compassionate and humanitarian. You help others.',
};

const sumDigits = (num) => {
  return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
};

const reduceToSingleDigit = (num) => {
  while (num >= 10) {
    num = sumDigits(num);
  }
  return num;
};

export default function LuckyNumberGenerator() {
  const [fullName, setFullName] = useState('Jane Smith');
  const [dateOfBirth, setDateOfBirth] = useState('1990-06-15');
  const [showResults, setShowResults] = useState(true);

  const results = useMemo(() => {
    if (!fullName || !dateOfBirth) return null;

    const nameSum = fullName
      .toUpperCase()
      .split('')
      .reduce((sum, char) => {
        const code = char.charCodeAt(0) - 64;
        return char >= 'A' && char <= 'Z' ? sum + code : sum;
      }, 0);

    const namePathNumber = reduceToSingleDigit(nameSum);

    const [year, month, day] = dateOfBirth.split('-').map(Number);
    const dobSum = year + month + day;
    const lifePathNumber = reduceToSingleDigit(dobSum);

    const today = new Date();
    const dayOfMonth = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const todaySum = dayOfMonth + currentMonth + currentYear;
    const todayLucky = reduceToSingleDigit(todaySum);

    const seed = (namePathNumber + lifePathNumber + todayLucky) % 10;
    const luckyNumbers = [];
    for (let i = 0; i < 5; i++) {
      luckyNumbers.push(((seed * 7 + i * 13) % 49) + 1);
    }

    const colourIndex = (namePathNumber + lifePathNumber) % COLOURS.length;
    const luckyColour = COLOURS[colourIndex];

    return {
      namePathNumber,
      lifePathNumber,
      todayLucky,
      luckyNumbers: luckyNumbers.slice(0, 5),
      luckyColour,
      personalityInsight: PERSONALITY_INSIGHTS[lifePathNumber],
      todayRating: Math.floor((todayLucky / 9) * 5),
    };
  }, [fullName, dateOfBirth]);

  const handleGenerate = () => {
    if (fullName.trim() && dateOfBirth) {
      setShowResults(true);
    }
  };

  const reset = () => {
    setFullName('');
    setDateOfBirth('');
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-4 space-y-3">
      {/* Input Section */}
      <div className="space-y-3 mb-3">
        <Input
          label="Full name"
          placeholder="e.g., John Smith"
          value={fullName}
          onChange={(e) => { setFullName(e.target.value); setShowResults(false); }}
        />

        <Input
          label="Date of birth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => { setDateOfBirth(e.target.value); setShowResults(false); }}
        />

        <Button
          onClick={handleGenerate}
          variant="primary"
          className="w-full"
          disabled={!fullName.trim() || !dateOfBirth}
        >
          Generate My Lucky Numbers
        </Button>
      </div>

      {/* Results */}
      {showResults && results && (
        <>
          {/* Lucky Numbers + Lucky Colour */}
          <div className="bg-accent/5 border border-accent/30 rounded-[var(--radius-card)] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-text-primary font-medium text-sm">Today's Lucky Numbers</p>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${results.luckyColour.css}`} />
                <span className="text-text-secondary text-xs">Lucky colour: {results.luckyColour.name}</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {results.luckyNumbers.map((num, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-accent/10 border-2 border-accent rounded-lg flex items-center justify-center"
                >
                  <p className="font-mono font-bold text-accent text-lg">{num}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Numerology + Day Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-surface rounded-[var(--radius-card)] p-4">
              <p className="text-text-primary font-medium text-sm mb-2">Numerology</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Life Path</span>
                  <Badge className="bg-accent/10 text-accent border-accent/30">{results.lifePathNumber}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Name Path</span>
                  <Badge className="bg-accent/10 text-accent border-accent/30">{results.namePathNumber}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Today's Number</span>
                  <Badge className="bg-success/10 text-success border-success/30">{results.todayLucky}</Badge>
                </div>
              </div>
              <p className="text-text-secondary text-xs italic mt-2">{results.personalityInsight}</p>
            </div>

            <div className="bg-surface rounded-[var(--radius-card)] p-4">
              <p className="text-text-primary font-medium text-sm mb-2">Today's Energy</p>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl ${star <= results.todayRating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-center text-sm text-text-secondary">
                {results.todayRating === 5 && "Fantastic energy today!"}
                {results.todayRating === 4 && "Great energy today!"}
                {results.todayRating === 3 && "Good balance today"}
                {results.todayRating === 2 && "Fair day ahead"}
                {results.todayRating === 1 && "Quiet, reflective day"}
                {results.todayRating === 0 && "A day for rest"}
              </p>
            </div>
          </div>

          <Button onClick={reset} variant="secondary" className="w-full">
            Generate for Someone Else
          </Button>
        </>
      )}
    </div>
  );
}
