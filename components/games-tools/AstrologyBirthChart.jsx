'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const ZODIAC_SIGNS = [
  {
    name: 'Aries',
    symbol: '♈',
    dates: 'Mar 21 - Apr 19',
    element: 'Fire',
    ruling: 'Mars',
    traits: [
      'Courageous and bold',
      'Determined and ambitious',
      'Passionate and energetic',
      'Confident and assertive',
      'Independent thinker',
    ],
    lucky: { number: 9, colour: 'Red', day: 'Tuesday' },
    compatible: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    challenging: ['Cancer', 'Capricorn', 'Libra'],
  },
  {
    name: 'Taurus',
    symbol: '♉',
    dates: 'Apr 20 - May 20',
    element: 'Earth',
    ruling: 'Venus',
    traits: [
      'Reliable and stable',
      'Patient and steadfast',
      'Practical and grounded',
      'Devoted and loyal',
      'Sensual and pleasure-seeking',
    ],
    lucky: { number: 6, colour: 'Green', day: 'Friday' },
    compatible: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
    challenging: ['Leo', 'Aquarius', 'Scorpio'],
  },
  {
    name: 'Gemini',
    symbol: '♊',
    dates: 'May 21 - Jun 20',
    element: 'Air',
    ruling: 'Mercury',
    traits: [
      'Intelligent and curious',
      'Adaptable and versatile',
      'Communicative and expressive',
      'Witty and playful',
      'Social and friendly',
    ],
    lucky: { number: 5, colour: 'Yellow', day: 'Wednesday' },
    compatible: ['Libra', 'Aquarius', 'Aries', 'Leo'],
    challenging: ['Virgo', 'Pisces', 'Sagittarius'],
  },
  {
    name: 'Cancer',
    symbol: '♋',
    dates: 'Jun 21 - Jul 22',
    element: 'Water',
    ruling: 'Moon',
    traits: [
      'Emotional and intuitive',
      'Protective and nurturing',
      'Deeply sentimental',
      'Loyal and devoted',
      'Imaginative and creative',
    ],
    lucky: { number: 2, colour: 'Silver', day: 'Monday' },
    compatible: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    challenging: ['Aries', 'Libra', 'Capricorn'],
  },
  {
    name: 'Leo',
    symbol: '♌',
    dates: 'Jul 23 - Aug 22',
    element: 'Fire',
    ruling: 'Sun',
    traits: [
      'Confident and proud',
      'Generous and warm-hearted',
      'Creative and expressive',
      'Natural leader',
      'Passionate and dramatic',
    ],
    lucky: { number: 1, colour: 'Gold', day: 'Sunday' },
    compatible: ['Sagittarius', 'Aries', 'Gemini', 'Libra'],
    challenging: ['Taurus', 'Scorpio', 'Aquarius'],
  },
  {
    name: 'Virgo',
    symbol: '♍',
    dates: 'Aug 23 - Sep 22',
    element: 'Earth',
    ruling: 'Mercury',
    traits: [
      'Analytical and methodical',
      'Practical and detail-oriented',
      'Intelligent and observant',
      'Reliable and hardworking',
      'Humble and modest',
    ],
    lucky: { number: 5, colour: 'Green', day: 'Wednesday' },
    compatible: ['Capricorn', 'Taurus', 'Cancer', 'Scorpio'],
    challenging: ['Gemini', 'Sagittarius', 'Pisces'],
  },
  {
    name: 'Libra',
    symbol: '♎',
    dates: 'Sep 23 - Oct 22',
    element: 'Air',
    ruling: 'Venus',
    traits: [
      'Diplomatic and fair-minded',
      'Social and charming',
      'Artistic and creative',
      'Balanced and harmonious',
      'Intellectually curious',
    ],
    lucky: { number: 6, colour: 'Blue', day: 'Friday' },
    compatible: ['Aquarius', 'Gemini', 'Leo', 'Sagittarius'],
    challenging: ['Cancer', 'Capricorn', 'Aries'],
  },
  {
    name: 'Scorpio',
    symbol: '♏',
    dates: 'Oct 23 - Nov 21',
    element: 'Water',
    ruling: 'Pluto',
    traits: [
      'Intense and passionate',
      'Secretive and mysterious',
      'Powerful and magnetic',
      'Resourceful and brave',
      'Deeply perceptive',
    ],
    lucky: { number: 8, colour: 'Red', day: 'Tuesday' },
    compatible: ['Pisces', 'Cancer', 'Taurus', 'Virgo'],
    challenging: ['Leo', 'Aquarius', 'Libra'],
  },
  {
    name: 'Sagittarius',
    symbol: '♐',
    dates: 'Nov 22 - Dec 21',
    element: 'Fire',
    ruling: 'Jupiter',
    traits: [
      'Optimistic and adventurous',
      'Independent and free-spirited',
      'Philosophical and wise',
      'Enthusiastic and passionate',
      'Honest and straightforward',
    ],
    lucky: { number: 3, colour: 'Purple', day: 'Thursday' },
    compatible: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    challenging: ['Virgo', 'Gemini', 'Pisces'],
  },
  {
    name: 'Capricorn',
    symbol: '♑',
    dates: 'Dec 22 - Jan 19',
    element: 'Earth',
    ruling: 'Saturn',
    traits: [
      'Ambitious and disciplined',
      'Responsible and mature',
      'Practical and prudent',
      'Self-controlled and reserved',
      'Determined and goal-oriented',
    ],
    lucky: { number: 8, colour: 'Brown', day: 'Saturday' },
    compatible: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    challenging: ['Aries', 'Libra', 'Cancer'],
  },
  {
    name: 'Aquarius',
    symbol: '♒',
    dates: 'Jan 20 - Feb 18',
    element: 'Air',
    ruling: 'Uranus',
    traits: [
      'Humanitarian and progressive',
      'Independent and intellectual',
      'Innovative and original',
      'Detached and objective',
      'Friendly and sociable',
    ],
    lucky: { number: 4, colour: 'Blue', day: 'Saturday' },
    compatible: ['Gemini', 'Libra', 'Sagittarius', 'Aries'],
    challenging: ['Taurus', 'Scorpio', 'Leo'],
  },
  {
    name: 'Pisces',
    symbol: '♓',
    dates: 'Feb 19 - Mar 20',
    element: 'Water',
    ruling: 'Neptune',
    traits: [
      'Compassionate and empathetic',
      'Artistic and imaginative',
      'Intuitive and spiritual',
      'Gentle and kind-hearted',
      'Escapist and dreamy',
    ],
    lucky: { number: 7, colour: 'Sea-green', day: 'Thursday' },
    compatible: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
    challenging: ['Gemini', 'Sagittarius', 'Virgo'],
  },
];

const CHINESE_ZODIACS = {
  rat: 'Intelligent, resourceful, ambitious. Quick-witted and clever.',
  ox: 'Strong, reliable, honest. Patient and methodical.',
  tiger: 'Courageous, passionate, bold. Competitive and energetic.',
  rabbit: 'Gentle, peaceful, kind. Artistic and intuitive.',
  dragon: 'Charismatic, powerful, confident. Ambitious and driven.',
  snake: 'Wise, mysterious, secretive. Contemplative and calculated.',
  horse: 'Free-spirited, energetic, passionate. Optimistic and social.',
  goat: 'Creative, gentle, compassionate. Artistic and sensitive.',
  monkey: 'Playful, clever, mischievous. Intelligent and quick.',
  rooster: 'Honest, direct, bold. Hardworking and organized.',
  dog: 'Loyal, faithful, honest. Protective and dedicated.',
  pig: 'Generous, compassionate, kind. Honest and sincere.',
};

const getChineseZodiac = (year) => {
  const zodiacs = Object.keys(CHINESE_ZODIACS);
  const idx = (year - 1900) % 12;
  return zodiacs[idx];
};

export default function AstrologyBirthChart() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [sunSign, setSunSign] = useState(null);
  const [chineseSign, setChineseSign] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const calculateSunSign = () => {
    if (!month || !day) return null;

    const monthIndex = months.indexOf(month);
    const dayNum = parseInt(day);

    return ZODIAC_SIGNS.find((sign) => {
      const [mStart, dStart, mEnd, dEnd] = [
        parseInt(sign.dates.split(' ')[0]),
        parseInt(sign.dates.split(' ')[1]),
        parseInt(sign.dates.split(' ')[3]),
        parseInt(sign.dates.split(' ')[4]),
      ];

      if (monthIndex + 1 < mStart || monthIndex + 1 > mEnd) return false;
      if (monthIndex + 1 === mStart && dayNum < dStart) return false;
      if (monthIndex + 1 === mEnd && dayNum > dEnd) return false;
      return true;
    });
  };

  const handleCalculate = () => {
    const sign = calculateSunSign();
    setSunSign(sign);

    if (year && year.length === 4) {
      const yearNum = parseInt(year);
      const chinese = getChineseZodiac(yearNum);
      setChineseSign(chinese);
    } else {
      setChineseSign(null);
    }
  };

  const getElementColour = (element) => {
    const colours = {
      Fire: 'text-red-600',
      Earth: 'text-amber-700',
      Air: 'text-blue-600',
      Water: 'text-cyan-600',
    };
    return colours[element] || 'text-gray-600';
  };

  return (
    <div className="space-y-4">
      {/* Input Card */}
      <Card className="bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-text-primary">
            Enter Your Birth Date
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-text-muted bg-white text-text-primary"
              >
                <option value="">Select month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Day
              </label>
              <Input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="1-31"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Year (optional)
              </label>
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
              />
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!month || !day}
            className="w-full"
            size="lg"
          >
            Calculate My Astrology
          </Button>
        </div>
      </Card>

      {/* Sun Sign Display */}
      {sunSign && (
        <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm font-mono text-orange-700 mb-2">
                Your Sun Sign
              </p>
              <div className="text-7xl mb-3">{sunSign.symbol}</div>
              <h2 className="font-heading text-4xl font-bold text-orange-900">
                {sunSign.name}
              </h2>
              <p className="text-sm text-orange-800 mt-2 font-mono">
                {sunSign.dates}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-white opacity-60 rounded-lg p-3">
              <div>
                <p className="text-xs text-orange-700">Element</p>
                <p className={`font-bold ${getElementColour(sunSign.element)}`}>
                  {sunSign.element}
                </p>
              </div>
              <div>
                <p className="text-xs text-orange-700">Ruling Planet</p>
                <p className="font-bold text-orange-900">{sunSign.ruling}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Traits */}
      {sunSign && (
        <Card>
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              {sunSign.name} Traits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sunSign.traits.map((trait, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-surface flex items-center gap-2"
                >
                  <span className="text-orange-500">★</span>
                  <p className="text-sm text-text-primary">{trait}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Lucky Items */}
      {sunSign && (
        <Card className="bg-purple-50">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Lucky Numbers & Colours
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-white border border-purple-200">
                <p className="text-xs text-text-secondary mb-1">Number</p>
                <p className="font-mono font-bold text-2xl text-purple-600">
                  {sunSign.lucky.number}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white border border-purple-200">
                <p className="text-xs text-text-secondary mb-1">Colour</p>
                <p className="font-bold text-purple-700">
                  {sunSign.lucky.colour}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white border border-purple-200">
                <p className="text-xs text-text-secondary mb-1">Day</p>
                <p className="font-bold text-purple-700">{sunSign.lucky.day}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Compatibility */}
      {sunSign && (
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-3">
                Most Compatible
              </h3>
              <div className="flex flex-wrap gap-2">
                {sunSign.compatible.map((sign) => (
                  <span
                    key={sign}
                    className="px-3 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm"
                  >
                    {sign}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-3">
                Challenging Matches
              </h3>
              <div className="flex flex-wrap gap-2">
                {sunSign.challenging.map((sign) => (
                  <span
                    key={sign}
                    className="px-3 py-2 rounded-full bg-rose-100 text-rose-700 font-medium text-sm"
                  >
                    {sign}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Chinese Zodiac */}
      {chineseSign && (
        <Card className="bg-gradient-to-br from-red-50 to-yellow-50 border-2 border-red-300">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Chinese Zodiac: Year of the {chineseSign.charAt(0).toUpperCase() + chineseSign.slice(1)}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {CHINESE_ZODIACS[chineseSign]}
            </p>
          </div>
        </Card>
      )}

      {/* Info */}
      <details className="text-xs text-text-muted">
        <summary className="cursor-pointer hover:text-text-secondary">About this tool</summary>
        <p className="mt-2">Western astrology uses your birth date to determine your sun sign,
          which represents your core identity. Chinese astrology uses your birth
          year. Both provide entertaining insights into personality and
          compatibility. For fun and reflection only.</p>
      </details>
    </div>
  );
}
