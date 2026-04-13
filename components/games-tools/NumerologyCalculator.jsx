'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const NUMBER_MEANINGS = {
  1: 'Leadership, independence, ambition, innovation, originality. You are a pioneer and trailblazer.',
  2: 'Cooperation, balance, diplomacy, sensitivity. You are a peacemaker and partner.',
  3: 'Creativity, self-expression, communication, joy. You are an artist and communicator.',
  4: 'Stability, practicality, hard work, foundation. You are a builder and organizer.',
  5: 'Freedom, adventure, versatility, change. You are adaptable and dynamic.',
  6: 'Harmony, responsibility, nurturing, service. You are a caregiver and healer.',
  7: 'Spirituality, introspection, wisdom, analysis. You are a seeker and thinker.',
  8: 'Power, abundance, material success, authority. You are ambitious and resourceful.',
  9: 'Compassion, humanitarian, wisdom, completion. You are a visionary and humanitarian.',
  11: 'Intuition, insight, spiritual awakening, enlightenment. You are a master of spiritual insight.',
  22: 'Master builder, grand vision, creation on large scale. You manifest big dreams into reality.',
  33: 'Master teacher, compassion, healing. You inspire and guide others with wisdom.',
};

const reduceToSingleDigit = (num) => {
  let steps = [num];
  while (num >= 10 && num !== 11 && num !== 22 && num !== 33) {
    const digits = num
      .toString()
      .split('')
      .map(Number);
    num = digits.reduce((a, b) => a + b, 0);
    steps.push(num);
  }
  return { final: num, steps };
};

const letterValue = (char) => {
  const upper = char.toUpperCase();
  return upper.charCodeAt(0) - 64; // A=1, B=2, etc.
};

const calculateNumbers = (birthDate, fullName) => {
  // Life Path Number (from birth date)
  const [month, day, year] = birthDate.split('-');
  const birthSum = (
    parseInt(month) +
    parseInt(day) +
    parseInt(year)
  ).toString();
  const lifePathSum = birthSum
    .split('')
    .reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const lifePathReduction = reduceToSingleDigit(lifePathSum);

  // Expression Number (from full name)
  const nameSum = fullName
    .split('')
    .filter((c) => c.match(/[a-z]/i))
    .reduce((sum, char) => sum + letterValue(char), 0);
  const expressionReduction = reduceToSingleDigit(nameSum);

  // Soul Urge Number (from vowels in name)
  const vowels = 'aeiouAEIOU';
  const vowelSum = fullName
    .split('')
    .filter((c) => vowels.includes(c))
    .reduce((sum, char) => sum + letterValue(char), 0);
  const soulUrgeReduction = reduceToSingleDigit(vowelSum);

  return {
    lifePath: {
      value: lifePathReduction.final,
      steps: [month, day, year, ...lifePathReduction.steps],
    },
    expression: {
      value: expressionReduction.final,
      steps: expressionReduction.steps,
    },
    soulUrge: {
      value: soulUrgeReduction.final,
      steps: soulUrgeReduction.steps,
    },
  };
};

export default function NumerologyCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [numbers, setNumbers] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  const handleCalculate = () => {
    if (!birthDate || !fullName.trim()) return;

    const result = calculateNumbers(birthDate, fullName);
    setNumbers(result);
    setShowSteps(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const getNumberCard = (title, number, steps) => {
    return (
      <Card className="space-y-3">
        <div>
          <p className="text-sm font-mono text-text-secondary mb-2">{title}</p>
          <p className="font-mono font-bold text-4xl text-blue-600">
            {number}
          </p>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">
          {NUMBER_MEANINGS[number] || 'Your number carries unique significance.'}
        </p>

        {showSteps && (
          <div className="bg-surface rounded-lg p-3">
            <p className="text-xs font-mono text-text-secondary mb-2">
              Calculation Steps:
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm">{step}</span>
                  {idx < steps.length - 1 && (
                    <span className="text-text-muted">+</span>
                  )}
                </div>
              ))}
              <span className="text-text-muted">=</span>
              <span className="font-mono font-bold text-sm text-blue-600">
                {number}
              </span>
            </div>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {/* Input Card */}
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-text-primary">
            Calculate Your Numerology Profile
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Birth Date (YYYY-MM-DD)
              </label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Full Name (as you would write it)
              </label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="John Smith"
              />
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!birthDate || !fullName.trim()}
            className="w-full"
            size="lg"
          >
            Calculate Numbers
          </Button>
        </div>
      </Card>

      {/* Results */}
      {numbers && (
        <>
          {/* Numbers Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getNumberCard('Life Path Number', numbers.lifePath.value, [
              ...numbers.lifePath.steps,
            ])}
            {getNumberCard(
              'Expression Number',
              numbers.expression.value,
              numbers.expression.steps
            )}
            {getNumberCard(
              'Soul Urge Number',
              numbers.soulUrge.value,
              numbers.soulUrge.steps
            )}
          </div>

          {/* Show Steps Toggle */}
          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={() => setShowSteps(!showSteps)}
            >
              {showSteps ? 'Hide' : 'Show'} Calculation Steps
            </Button>
          </div>

          {/* Interpretation */}
          <details className="text-xs text-text-muted">
            <summary className="cursor-pointer hover:text-text-secondary">About your numerology profile</summary>
            <div className="mt-2 space-y-3">
              <div>
                <p className="font-semibold">Life Path Number (From Birth Date)</p>
                <p>Your Life Path Number reveals your natural talents, abilities,
                  and life journey. It represents your core personality and
                  the lessons you are meant to learn. This is your primary life
                  direction.</p>
              </div>
              <div>
                <p className="font-semibold">Expression Number (From Full Name)</p>
                <p>Your Expression Number shows how you communicate and express
                  yourself in the world. It reveals your talents, abilities, and
                  how others perceive you. This is your natural way of being.</p>
              </div>
              <div>
                <p className="font-semibold">Soul Urge Number (From Vowels in Name)</p>
                <p>Your Soul Urge Number represents your inner desires, motivations,
                  and what truly drives you. It reveals what you really want from
                  life at the deepest level of your being.</p>
              </div>
              <div>
                <p className="font-semibold">Master Numbers</p>
                <p>If any of your numbers are 11, 22, or 33, you carry a master number!
                  These are considered highly spiritual and powerful numbers that bring
                  special gifts and greater responsibilities in life.</p>
              </div>
            </div>
          </details>

          <Button
            variant="secondary"
            onClick={() => {
              setBirthDate('');
              setFullName('');
              setNumbers(null);
            }}
            className="w-full"
          >
            Calculate Again
          </Button>
        </>
      )}

      {/* Info */}
      <details className="text-xs text-text-muted">
        <summary className="cursor-pointer hover:text-text-secondary">About this tool</summary>
        <p className="mt-2">Numerology is an ancient divination system that assigns meaning to numbers.
          Each number carries vibrations and significance. Your birth date and name
          can reveal your Life Path, Expression, and Soul Urge numbers. This reading
          is for entertainment and self-discovery only.</p>
      </details>
    </div>
  );
}
