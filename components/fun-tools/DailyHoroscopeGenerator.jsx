'use client';

import { useState, useMemo } from 'react';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const HOROSCOPE_TEMPLATES = {
  love: [
    'Romance is in the air. A meaningful conversation awaits.',
    'Your charm is irresistible today. Let your feelings show.',
    'Single? Someone special is noticing you.',
    'Strengthen your bonds with a heartfelt gesture.',
    'Love requires patience today. Be understanding.',
    'An unexpected connection could blossom.',
    'Focus on what matters most in your relationships.',
  ],
  career: [
    'Your hard work is about to pay off. Stay focused.',
    'A new opportunity is closer than you think.',
    'Leadership qualities shine through today.',
    'Collaboration brings surprising success.',
    'Your confidence attracts positive attention.',
    'Think big. Your ambitions are within reach.',
    'A challenge is actually an opportunity in disguise.',
  ],
  health: [
    'Energy levels are high. Time for exercise.',
    'Rest and recovery are essential today.',
    'Listen to your body. Self-care is important.',
    'Stress levels are manageable. Breathe deeply.',
    'A wellness activity brings joy today.',
    'Your immune system is strong. Stay healthy.',
    'Balance is key to your wellbeing.',
  ],
  finance: [
    'Financial stability improves. Good news ahead.',
    'An investment of time pays dividends.',
    'Be cautious with new financial commitments.',
    'Unexpected money could come your way.',
    'Budget carefully. Small savings matter.',
    'A financial opportunity reveals itself.',
    'Patience with finances brings rewards.',
  ],
};

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const getHoroscope = (sign, category, date) => {
  const seed = hashString(`${sign}-${category}-${date}`);
  const templates = HOROSCOPE_TEMPLATES[category];
  return templates[seed % templates.length];
};

export default function DailyHoroscopeGenerator() {
  const [selectedSign, setSelectedSign] = useState('Leo');

  const today = new Date();
  const dateString = today.toISOString().split('T')[0];

  const horoscopes = useMemo(() => {
    const categories = ['love', 'career', 'health', 'finance'];
    const result = {};
    categories.forEach((cat) => {
      result[cat] = getHoroscope(selectedSign, cat, dateString);
    });
    return result;
  }, [selectedSign, dateString]);

  // Lucky number (deterministic based on date + sign)
  const luckyNumber = ((selectedSign.charCodeAt(0) + today.getDate()) % 50) + 1;
  const luckyColor = ['Red', 'Blue', 'Green', 'Gold', 'Purple', 'Pink', 'Silver', 'Orange'][
    (selectedSign.charCodeAt(0) + today.getMonth()) % 8
  ];

  // Overall rating (1-5 stars based on date)
  const ratingValue = ((today.getDate() + selectedSign.length) % 5) + 1;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-4">
      {/* Sign Selector */}
      <Card className="mb-4">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4 text-center">
          Daily Horoscope
        </h2>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Select your sign
          </label>
          <Select
            options={ZODIAC_SIGNS.map(s => ({ value: s, label: s }))}
            value={selectedSign}
            onChange={(e) => setSelectedSign(e.target.value)}
          />
        </div>

        <p className="text-xs text-text-secondary mt-3">
          Today's horoscope for {new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(today)}
        </p>
      </Card>

      {/* Header with Rating */}
      <Card className="mb-4 bg-accent/5 border-accent/30 text-center py-6">
        <p className="text-text-secondary text-sm mb-2">Today's Energy</p>
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-3xl ${
                star <= ratingValue ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-text-primary font-medium">
          {ratingValue === 5 && "Exceptional!"}
          {ratingValue === 4 && "Very Good"}
          {ratingValue === 3 && "Good"}
          {ratingValue === 2 && "Fair"}
          {ratingValue === 1 && "Calm"}
        </p>
      </Card>

      {/* Horoscope Categories */}
      <div className="space-y-4 mb-4">
        {/* Love */}
        <Card className="border-pink-200 bg-pink-50">
          <h3 className="text-sm font-medium text-pink-900 mb-2">❤️ Love</h3>
          <p className="text-text-primary">{horoscopes.love}</p>
        </Card>

        {/* Career */}
        <Card className="border-blue-200 bg-blue-50">
          <h3 className="text-sm font-medium text-blue-900 mb-2">💼 Career</h3>
          <p className="text-text-primary">{horoscopes.career}</p>
        </Card>

        {/* Health */}
        <Card className="border-green-200 bg-green-50">
          <h3 className="text-sm font-medium text-green-900 mb-2">💪 Health</h3>
          <p className="text-text-primary">{horoscopes.health}</p>
        </Card>

        {/* Finance */}
        <Card className="border-yellow-200 bg-yellow-50">
          <h3 className="text-sm font-medium text-yellow-900 mb-2">💰 Finance</h3>
          <p className="text-text-primary">{horoscopes.finance}</p>
        </Card>
      </div>

      {/* Lucky Numbers & Colours */}
      <Card>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Lucky Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface p-4 rounded-lg text-center">
            <p className="text-xs text-text-secondary mb-2">Lucky Number</p>
            <p className="font-heading text-4xl font-bold text-accent">{luckyNumber}</p>
          </div>

          <div className="bg-surface p-4 rounded-lg">
            <p className="text-xs text-text-secondary mb-2">Lucky Colour</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-300 to-purple-500 border-2 border-border" />
              <p className="font-heading text-xl font-bold text-text-primary">{luckyColor}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="mt-6 text-xs text-text-secondary text-center italic">
        <p>
          This horoscope is for entertainment purposes only. Each day's horoscope is generated
          consistently for each sign.
        </p>
      </div>
    </div>
  );
}
