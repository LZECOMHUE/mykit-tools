'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const HOROSCOPE_TEMPLATES = {
  beginnings: [
    'A fresh start awaits you in',
    'New beginnings emerge in',
    'Exciting opportunities arrive in',
    'A positive shift occurs in',
  ],
  growth: [
    'Your efforts flourish in',
    'Progress accelerates in',
    'Growth manifests in',
    'Positive momentum builds in',
  ],
  love: [
    'Romance blossoms in',
    'Affection deepens in',
    'Connection strengthens in',
    'Love finds you in',
  ],
  career: [
    'Professional advancement beckons in',
    'Your talents shine in',
    'Success awaits in',
    'Career momentum grows in',
  ],
  health: [
    'Vitality returns in',
    'Wellness improves in',
    'Energy rises in',
    'Balance restores in',
  ],
};

const AREAS = [
  'your love life',
  'your career',
  'your finances',
  'your health',
  'your relationships',
  'your creative projects',
];

const LUCKY_COLOURS = [
  'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange',
  'Pink', 'Silver', 'Gold', 'Emerald', 'Sapphire', 'Rose Gold',
];

const LUCKY_NUMBERS = [1, 3, 5, 7, 8, 9, 11, 13, 21, 27, 33, 42];

// Deterministic seeded random for daily consistency
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const getHoroscope = (sign, date) => {
  const signIndex = ZODIAC_SIGNS.indexOf(sign);
  const dateSeed = new Date(date).getTime() / 1000;
  const baseSeed = dateSeed + signIndex;

  const getRandomItem = (arr, offset = 0) => {
    const seed = baseSeed + offset;
    const idx = Math.floor(seededRandom(seed) * arr.length);
    return arr[idx];
  };

  const templates = Object.values(HOROSCOPE_TEMPLATES).flat();
  const template = getRandomItem(templates, 1);
  const area = getRandomItem(AREAS, 2);
  const luckyNumber = getRandomItem(LUCKY_NUMBERS, 3);
  const luckyColour = getRandomItem(LUCKY_COLOURS, 4);
  const rating = Math.floor(seededRandom(baseSeed + 5) * 5) + 1;

  return {
    overall: `${template} ${area}. Trust your intuition and take inspired action.`,
    love: getRandomItem([
      'Romance is in the air. Someone thinks highly of you.',
      'A meaningful connection deepens unexpectedly.',
      'Love shows up in ways you did not anticipate.',
      'Your heart opens to new possibilities.',
      'Affection surrounds you from those closest to you.',
    ], 6),
    career: getRandomItem([
      'Your professional skills are recognized. Opportunities arise.',
      'Collaboration brings success. Share your vision with others.',
      'A project gains momentum. Persistence pays off.',
      'Your dedication creates positive impact.',
      'Career growth is nearer than you think.',
    ], 7),
    health: getRandomItem([
      'Take time to nurture yourself. Rest is important.',
      'Energy levels rise. Use this vitality wisely.',
      'Listen to your body. Wellness improves with care.',
      'A healthy habit brings lasting benefits.',
      'Balance returns. Prioritize self-care.',
    ], 8),
    rating,
    luckyNumber,
    luckyColour,
  };
};

export default function DailyHoroscope() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedSign, setSelectedSign] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displaySigns = showAll ? ZODIAC_SIGNS : ZODIAC_SIGNS.slice(0, 6);

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center space-y-2">
          <p className="text-sm font-mono text-purple-700">Today&apos;s Forecast</p>
          <h2 className="font-heading text-2xl font-bold text-purple-900">
            Daily Horoscope
          </h2>
          <p className="text-sm text-purple-700">{today}</p>
        </div>
      </Card>

      {/* Sign Selection */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-text-primary">
          {showAll ? 'All Signs' : 'Select your sign'}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {displaySigns.map((sign) => (
            <button
              key={sign}
              onClick={() => setSelectedSign(sign)}
              className={`p-3 rounded-lg transition-all border-2 font-medium text-sm ${
                selectedSign === sign
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white border-text-muted text-text-secondary hover:border-purple-400'
              }`}
            >
              {sign}
            </button>
          ))}
        </div>

        {!showAll && (
          <Button
            variant="secondary"
            onClick={() => setShowAll(true)}
            className="w-full text-sm"
          >
            View All Signs
          </Button>
        )}

        {showAll && (
          <Button
            variant="secondary"
            onClick={() => setShowAll(false)}
            className="w-full text-sm"
          >
            Hide Extra Signs
          </Button>
        )}
      </div>

      {/* Horoscope Display */}
      {selectedSign && (
        <>
          {/* Main Horoscope */}
          <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-mono text-orange-700 mb-2">
                  Your Reading
                </p>
                <h3 className="font-heading text-3xl font-bold text-orange-900">
                  {selectedSign}
                </h3>
              </div>

              {/* Overall Rating */}
              <div className="text-center">
                <p className="text-sm text-orange-800 mb-2">Overall Energy</p>
                <p className={`text-2xl font-mono ${
                  getHoroscope(selectedSign, today).rating >= 4
                    ? 'text-emerald-600'
                    : getHoroscope(selectedSign, today).rating === 3
                      ? 'text-yellow-600'
                      : 'text-orange-600'
                }`}>
                  {renderStars(getHoroscope(selectedSign, today).rating)}
                </p>
              </div>

              {/* Main Message */}
              <div className="bg-white opacity-70 rounded-lg p-4">
                <p className="text-center text-orange-900 leading-relaxed font-heading">
                  {getHoroscope(selectedSign, today).overall}
                </p>
              </div>

              {/* Lucky Items */}
              <div className="grid grid-cols-2 gap-3 bg-white opacity-50 rounded-lg p-3">
                <div className="text-center">
                  <p className="text-xs text-orange-700 font-mono">Lucky Number</p>
                  <p className="font-mono font-bold text-2xl text-orange-900">
                    {getHoroscope(selectedSign, today).luckyNumber}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-orange-700 font-mono">Lucky Colour</p>
                  <p className="font-bold text-orange-900">
                    {getHoroscope(selectedSign, today).luckyColour}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Readings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Love */}
            <Card className="bg-rose-50 border-l-4 border-rose-500">
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-rose-700">
                  Love
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {getHoroscope(selectedSign, today).love}
                </p>
              </div>
            </Card>

            {/* Career */}
            <Card className="bg-blue-50 border-l-4 border-blue-500">
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-blue-700">
                  Career
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {getHoroscope(selectedSign, today).career}
                </p>
              </div>
            </Card>

            {/* Health */}
            <Card className="bg-emerald-50 border-l-4 border-emerald-500">
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-emerald-700">
                  Health
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {getHoroscope(selectedSign, today).health}
                </p>
              </div>
            </Card>
          </div>

          {/* All Signs Button */}
          <Button
            onClick={() => setSelectedSign(null)}
            variant="secondary"
            className="w-full"
          >
            View All Signs
          </Button>
        </>
      )}

      {/* All Signs View */}
      {!selectedSign && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ZODIAC_SIGNS.map((sign) => {
            const horoscope = getHoroscope(sign, today);
            return (
              <Card
                key={sign}
                hover
                onClick={() => setSelectedSign(sign)}
                className="cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-text-primary">
                      {sign}
                    </h4>
                    <span className={`text-sm ${
                      horoscope.rating >= 4
                        ? 'text-emerald-600'
                        : horoscope.rating === 3
                          ? 'text-yellow-600'
                          : 'text-orange-600'
                    }`}>
                      {renderStars(horoscope.rating)}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {horoscope.overall}
                  </p>
                  <div className="flex gap-2 text-xs font-mono text-text-secondary">
                    <span>No. {horoscope.luckyNumber}</span>
                    <span>{horoscope.luckyColour}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Info */}
      <Card className="bg-purple-50 border-l-4 border-purple-500">
        <p className="text-sm text-text-secondary">
          Daily horoscopes are generated fresh each day for each sign. These
          readings blend traditional astrology with daily guidance. Use them for
          inspiration and reflection, not as predictions of fact.
        </p>
      </Card>
    </div>
  );
}
