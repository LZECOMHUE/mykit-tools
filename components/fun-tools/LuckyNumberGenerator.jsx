'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const COLOURS = [
  'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Gold', 'Silver', 'White'
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
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (!fullName || !dateOfBirth) return null;

    // Convert name to numbers (A=1, B=2, ... Z=26)
    const nameSum = fullName
      .toUpperCase()
      .split('')
      .reduce((sum, char) => {
        const code = char.charCodeAt(0) - 64;
        return char >= 'A' && char <= 'Z' ? sum + code : sum;
      }, 0);

    const namePathNumber = reduceToSingleDigit(nameSum);

    // Parse DOB
    const [year, month, day] = dateOfBirth.split('-').map(Number);
    const dobSum = year + month + day;
    const lifePathNumber = reduceToSingleDigit(dobSum);

    // Combined lucky number for today
    const today = new Date();
    const dayOfMonth = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const todaySum = dayOfMonth + currentMonth + currentYear;
    const todayLucky = reduceToSingleDigit(todaySum);

    // Generate 5 lucky numbers based on the combination
    const seed = (namePathNumber + lifePathNumber + todayLucky) % 10;
    const luckyNumbers = [];
    for (let i = 0; i < 5; i++) {
      luckyNumbers.push(((seed * 7 + i * 13) % 49) + 1);
    }

    // Lucky colour
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
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      {/* Input Section */}
      <Card className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4 text-center">
          Lucky Number Generator
        </h2>

        <div className="space-y-4 mb-6">
          <Input
            label="Full name"
            placeholder="e.g., John Smith"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Date of birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <Button
          onClick={handleGenerate}
          variant="primary"
          className="w-full"
          disabled={!fullName.trim() || !dateOfBirth}
        >
          Generate My Lucky Numbers
        </Button>
      </Card>

      {/* Results */}
      {showResults && results && (
        <>
          {/* Life Path Number */}
          <Card className="mb-6 bg-accent/5 border-accent/30">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-3 text-center">
              Your Life Path Number
            </h3>

            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-accent text-white flex items-center justify-center">
                <p className="font-heading text-5xl font-bold">{results.lifePathNumber}</p>
              </div>
            </div>

            <p className="text-center text-text-secondary italic text-sm">
              {results.personalityInsight}
            </p>
          </Card>

          {/* Today's Numbers */}
          <Card className="mb-6">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
              Today's Lucky Numbers
            </h3>

            <div className="grid grid-cols-5 gap-2 mb-4">
              {results.luckyNumbers.map((num, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-accent/10 border-2 border-accent rounded-lg flex items-center justify-center"
                >
                  <p className="font-mono font-bold text-accent text-lg">{num}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-secondary text-center">
              These numbers are based on today's date combined with your personal numerology
            </p>
          </Card>

          {/* Lucky Colour */}
          <Card className="mb-6">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
              Lucky Colour
            </h3>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-border" />
              <div>
                <p className="font-heading text-2xl font-bold text-text-primary">
                  {results.luckyColour}
                </p>
                <p className="text-xs text-text-secondary">
                  Wear this colour for extra luck today
                </p>
              </div>
            </div>
          </Card>

          {/* Numerology Breakdown */}
          <Card className="mb-6">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
              Your Numbers
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <span className="text-text-secondary">Name Path Number</span>
                <Badge className="bg-accent/10 text-accent border-accent/30">
                  {results.namePathNumber}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <span className="text-text-secondary">Life Path Number</span>
                <Badge className="bg-accent/10 text-accent border-accent/30">
                  {results.lifePathNumber}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <span className="text-text-secondary">Today's Number</span>
                <Badge className="bg-success/10 text-success border-success/30">
                  {results.todayLucky}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Day Rating */}
          <Card className="mb-6 bg-warning/5 border-warning/30">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-3 text-center">
              Today's Overall Energy
            </h3>

            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-3xl ${
                    star <= results.todayRating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-center text-sm text-text-secondary mt-3">
              {results.todayRating === 5 && "Fantastic energy today!"}
              {results.todayRating === 4 && "Great energy today!"}
              {results.todayRating === 3 && "Good balance today"}
              {results.todayRating === 2 && "Fair day ahead"}
              {results.todayRating === 1 && "Quiet, reflective day"}
            </p>
          </Card>

          {/* Reset Button */}
          <Button onClick={reset} variant="secondary" className="w-full">
            Generate for Someone Else
          </Button>
        </>
      )}
    </div>
  );
}
