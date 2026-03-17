'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

// Compatibility matrix (1-100)
const COMPATIBILITY_MATRIX = {
  'Aries-Aries': 80, 'Aries-Taurus': 60, 'Aries-Gemini': 85, 'Aries-Cancer': 40, 'Aries-Leo': 95, 'Aries-Virgo': 50,
  'Aries-Libra': 70, 'Aries-Scorpio': 65, 'Aries-Sagittarius': 90, 'Aries-Capricorn': 45, 'Aries-Aquarius': 80, 'Aries-Pisces': 35,
  'Taurus-Aries': 60, 'Taurus-Taurus': 85, 'Taurus-Gemini': 55, 'Taurus-Cancer': 85, 'Taurus-Leo': 65, 'Taurus-Virgo': 90,
  'Taurus-Libra': 75, 'Taurus-Scorpio': 80, 'Taurus-Sagittarius': 50, 'Taurus-Capricorn': 90, 'Taurus-Aquarius': 50, 'Taurus-Pisces': 80,
  'Gemini-Aries': 85, 'Gemini-Taurus': 55, 'Gemini-Gemini': 80, 'Gemini-Cancer': 50, 'Gemini-Leo': 85, 'Gemini-Virgo': 90,
  'Gemini-Libra': 95, 'Gemini-Scorpio': 60, 'Gemini-Sagittarius': 75, 'Gemini-Capricorn': 60, 'Gemini-Aquarius': 95, 'Gemini-Pisces': 55,
  'Cancer-Aries': 40, 'Cancer-Taurus': 85, 'Cancer-Gemini': 50, 'Cancer-Cancer': 85, 'Cancer-Leo': 60, 'Cancer-Virgo': 85,
  'Cancer-Libra': 55, 'Cancer-Scorpio': 90, 'Cancer-Sagittarius': 55, 'Cancer-Capricorn': 80, 'Cancer-Aquarius': 45, 'Cancer-Pisces': 95,
  'Leo-Aries': 95, 'Leo-Taurus': 65, 'Leo-Gemini': 85, 'Leo-Cancer': 60, 'Leo-Leo': 85, 'Leo-Virgo': 60,
  'Leo-Libra': 80, 'Leo-Scorpio': 60, 'Leo-Sagittarius': 90, 'Leo-Capricorn': 55, 'Leo-Aquarius': 60, 'Leo-Pisces': 50,
  'Virgo-Aries': 50, 'Virgo-Taurus': 90, 'Virgo-Gemini': 90, 'Virgo-Cancer': 85, 'Virgo-Leo': 60, 'Virgo-Virgo': 85,
  'Virgo-Libra': 70, 'Virgo-Scorpio': 75, 'Virgo-Sagittarius': 55, 'Virgo-Capricorn': 90, 'Virgo-Aquarius': 70, 'Virgo-Pisces': 80,
  'Libra-Aries': 70, 'Libra-Taurus': 75, 'Libra-Gemini': 95, 'Libra-Cancer': 55, 'Libra-Leo': 80, 'Libra-Virgo': 70,
  'Libra-Libra': 85, 'Libra-Scorpio': 70, 'Libra-Sagittarius': 75, 'Libra-Capricorn': 60, 'Libra-Aquarius': 90, 'Libra-Pisces': 60,
  'Scorpio-Aries': 65, 'Scorpio-Taurus': 80, 'Scorpio-Gemini': 60, 'Scorpio-Cancer': 90, 'Scorpio-Leo': 60, 'Scorpio-Virgo': 75,
  'Scorpio-Libra': 70, 'Scorpio-Scorpio': 85, 'Scorpio-Sagittarius': 65, 'Scorpio-Capricorn': 80, 'Scorpio-Aquarius': 55, 'Scorpio-Pisces': 90,
  'Sagittarius-Aries': 90, 'Sagittarius-Taurus': 50, 'Sagittarius-Gemini': 75, 'Sagittarius-Cancer': 55, 'Sagittarius-Leo': 90, 'Sagittarius-Virgo': 55,
  'Sagittarius-Libra': 75, 'Sagittarius-Scorpio': 65, 'Sagittarius-Sagittarius': 85, 'Sagittarius-Capricorn': 60, 'Sagittarius-Aquarius': 85, 'Sagittarius-Pisces': 65,
  'Capricorn-Aries': 45, 'Capricorn-Taurus': 90, 'Capricorn-Gemini': 60, 'Capricorn-Cancer': 80, 'Capricorn-Leo': 55, 'Capricorn-Virgo': 90,
  'Capricorn-Libra': 60, 'Capricorn-Scorpio': 80, 'Capricorn-Sagittarius': 60, 'Capricorn-Capricorn': 85, 'Capricorn-Aquarius': 65, 'Capricorn-Pisces': 75,
  'Aquarius-Aries': 80, 'Aquarius-Taurus': 50, 'Aquarius-Gemini': 95, 'Aquarius-Cancer': 45, 'Aquarius-Leo': 60, 'Aquarius-Virgo': 70,
  'Aquarius-Libra': 90, 'Aquarius-Scorpio': 55, 'Aquarius-Sagittarius': 85, 'Aquarius-Capricorn': 65, 'Aquarius-Aquarius': 85, 'Aquarius-Pisces': 65,
  'Pisces-Aries': 35, 'Pisces-Taurus': 80, 'Pisces-Gemini': 55, 'Pisces-Cancer': 95, 'Pisces-Leo': 50, 'Pisces-Virgo': 80,
  'Pisces-Libra': 60, 'Pisces-Scorpio': 90, 'Pisces-Sagittarius': 65, 'Pisces-Capricorn': 75, 'Pisces-Aquarius': 65, 'Pisces-Pisces': 85,
};

const TRAITS = {
  'Aries': { symbol: '♈', element: 'Fire', ruling: 'Mars', personality: 'Bold, passionate, impulsive' },
  'Taurus': { symbol: '♉', element: 'Earth', ruling: 'Venus', personality: 'Reliable, stable, practical' },
  'Gemini': { symbol: '♊', element: 'Air', ruling: 'Mercury', personality: 'Curious, witty, adaptable' },
  'Cancer': { symbol: '♋', element: 'Water', ruling: 'Moon', personality: 'Emotional, nurturing, intuitive' },
  'Leo': { symbol: '♌', element: 'Fire', ruling: 'Sun', personality: 'Confident, creative, generous' },
  'Virgo': { symbol: '♍', element: 'Earth', ruling: 'Mercury', personality: 'Analytical, practical, thoughtful' },
  'Libra': { symbol: '♎', element: 'Air', ruling: 'Venus', personality: 'Diplomatic, social, balanced' },
  'Scorpio': { symbol: '♏', element: 'Water', ruling: 'Pluto', personality: 'Intense, mysterious, determined' },
  'Sagittarius': { symbol: '♐', element: 'Fire', ruling: 'Jupiter', personality: 'Adventurous, optimistic, free-spirited' },
  'Capricorn': { symbol: '♑', element: 'Earth', ruling: 'Saturn', personality: 'Ambitious, disciplined, responsible' },
  'Aquarius': { symbol: '♒', element: 'Air', ruling: 'Uranus', personality: 'Innovative, independent, intellectual' },
  'Pisces': { symbol: '♓', element: 'Water', ruling: 'Neptune', personality: 'Dreamy, empathetic, artistic' },
};

const getCompatibility = (sign1, sign2) => {
  if (sign1 === sign2) return 85;
  const key = `${sign1}-${sign2}`;
  return COMPATIBILITY_MATRIX[key] || 50;
};

const getCompatibilities = (sign) => {
  return {
    love: getCompatibility(sign, ZODIAC_SIGNS[(ZODIAC_SIGNS.indexOf(sign) + 2) % 12]),
    friendship: getCompatibility(sign, ZODIAC_SIGNS[(ZODIAC_SIGNS.indexOf(sign) + 5) % 12]),
    work: getCompatibility(sign, ZODIAC_SIGNS[(ZODIAC_SIGNS.indexOf(sign) + 8) % 12]),
  };
};

const getBestMatches = (sign) => {
  return ZODIAC_SIGNS.filter(s => getCompatibility(sign, s) >= 85).slice(0, 3);
};

const getWorstMatches = (sign) => {
  return ZODIAC_SIGNS.filter(s => getCompatibility(sign, s) <= 50).slice(0, 3);
};

export default function ZodiacCompatibilityChecker() {
  const [sign1, setSign1] = useState('Leo');
  const [sign2, setSign2] = useState('Sagittarius');

  const compatibility = getCompatibility(sign1, sign2);
  const sign1Traits = TRAITS[sign1];
  const sign2Traits = TRAITS[sign2];
  const bestMatches = getBestMatches(sign1);
  const worstMatches = getWorstMatches(sign1);

  const getColorForScore = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-accent';
    return 'text-warning';
  };

  const getBgColorForScore = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-accent/10';
    return 'bg-warning/10';
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      {/* Sign Selection */}
      <Card className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4 text-center">
          Zodiac Compatibility Checker
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Your sign
            </label>
            <Select
              options={ZODIAC_SIGNS.map(s => ({ value: s, label: s }))}
              value={sign1}
              onChange={(e) => setSign1(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Their sign
            </label>
            <Select
              options={ZODIAC_SIGNS.map(s => ({ value: s, label: s }))}
              value={sign2}
              onChange={(e) => setSign2(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Compatibility Result */}
      <Card className={`mb-6 text-center py-8 ${getBgColorForScore(compatibility)} border border-border`}>
        <p className="text-text-secondary text-sm mb-2">{sign1} to {sign2}</p>
        <p className={`font-heading text-6xl font-bold ${getColorForScore(compatibility)}`}>
          {compatibility}%
        </p>
        <p className="text-text-primary font-medium mt-2">Compatibility</p>
      </Card>

      {/* Trait Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <div className="text-center mb-3">
            <p className="font-heading text-3xl">{sign1Traits.symbol}</p>
            <p className="font-heading text-xl font-bold text-text-primary">{sign1}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Element</span>
              <Badge>{sign1Traits.element}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Ruling planet</span>
              <span className="font-medium text-text-primary">{sign1Traits.ruling}</span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-text-secondary text-xs mb-1">Personality</p>
              <p className="text-text-primary font-medium">{sign1Traits.personality}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center mb-3">
            <p className="font-heading text-3xl">{sign2Traits.symbol}</p>
            <p className="font-heading text-xl font-bold text-text-primary">{sign2}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Element</span>
              <Badge>{sign2Traits.element}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Ruling planet</span>
              <span className="font-medium text-text-primary">{sign2Traits.ruling}</span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-text-secondary text-xs mb-1">Personality</p>
              <p className="text-text-primary font-medium">{sign2Traits.personality}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Compatibilities */}
      <Card className="mb-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Compatibility by Aspect
        </h3>

        <div className="space-y-3">
          {['Love', 'Friendship', 'Work'].map((aspect, idx) => {
            const scores = [75 + Math.random() * 15, 65 + Math.random() * 20, 70 + Math.random() * 15];
            const score = Math.round(scores[idx]);
            return (
              <div key={aspect} className={`p-3 rounded-lg ${getBgColorForScore(score)}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-text-primary">{aspect}</span>
                  <span className={`font-heading text-2xl font-bold ${getColorForScore(score)}`}>
                    {score}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Best & Worst Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-heading text-lg font-bold text-success mb-4">
            Best Matches for {sign1}
          </h3>

          <div className="space-y-2">
            {bestMatches.map((match) => (
              <div
                key={match}
                className="flex items-center justify-between p-2 bg-success/10 rounded-lg"
              >
                <span className="text-text-primary font-medium">{match}</span>
                <span className="font-mono text-success font-bold">
                  {getCompatibility(sign1, match)}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-heading text-lg font-bold text-error mb-4">
            Challenging Matches
          </h3>

          <div className="space-y-2">
            {worstMatches.map((match) => (
              <div
                key={match}
                className="flex items-center justify-between p-2 bg-error/10 rounded-lg"
              >
                <span className="text-text-primary font-medium">{match}</span>
                <span className="font-mono text-error font-bold">
                  {getCompatibility(sign1, match)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
