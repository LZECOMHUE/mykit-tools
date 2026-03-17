'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const CHINESE_ZODIAC_DATA = {
  0: { animal: 'Monkey', element: 'Metal', personality: 'Clever, playful, mischievous', famous: ['Leonardo DiCaprio', 'Jackie Chan'] },
  1: { animal: 'Rooster', element: 'Water', personality: 'Confident, honest, straightforward', famous: ['Mariah Carey', 'Steve Buscemi'] },
  2: { animal: 'Dog', element: 'Wood', personality: 'Loyal, honest, reliable', famous: ['Madonna', 'Michael Jackson'] },
  3: { animal: 'Pig', element: 'Fire', personality: 'Generous, compassionate, gentle', famous: ['Miley Cyrus', 'Elijah Wood'] },
  4: { animal: 'Rat', element: 'Earth', personality: 'Intelligent, adaptable, quick-witted', famous: ['Ben Affleck', 'Usain Bolt'] },
  5: { animal: 'Ox', element: 'Metal', personality: 'Diligent, dependable, strong', famous: ['Meryl Streep', 'Paul Newman'] },
  6: { animal: 'Tiger', element: 'Water', personality: 'Brave, competitive, unpredictable', famous: ['Marilyn Monroe', 'Tom Cruise'] },
  7: { animal: 'Rabbit', element: 'Wood', personality: 'Gentle, quiet, compassionate', famous: ['Angelina Jolie', 'Britney Spears'] },
  8: { animal: 'Dragon', element: 'Fire', personality: 'Confident, ambitious, energetic', famous: ['Bruce Lee', 'Celine Dion'] },
  9: { animal: 'Snake', element: 'Earth', personality: 'Wise, mysterious, graceful', famous: ['Oprah Winfrey', 'Megan Fox'] },
  10: { animal: 'Horse', element: 'Metal', personality: 'Enthusiastic, warm-hearted, independent', famous: ['Denzel Washington', 'Jennifer Aniston'] },
  11: { animal: 'Goat', element: 'Water', personality: 'Artistic, gentle, creative', famous: ['George Clooney', 'Gwyneth Paltrow'] },
};

const COMPATIBILITY_CHART = {
  'Rat': { bestWith: ['Dragon', 'Monkey'], avoidWith: ['Horse'] },
  'Ox': { bestWith: ['Snake', 'Rooster'], avoidWith: ['Goat'] },
  'Tiger': { bestWith: ['Horse', 'Dog'], avoidWith: ['Monkey'] },
  'Rabbit': { bestWith: ['Goat', 'Pig'], avoidWith: ['Rooster'] },
  'Dragon': { bestWith: ['Rat', 'Monkey'], avoidWith: ['Dog'] },
  'Snake': { bestWith: ['Rooster', 'Ox'], avoidWith: ['Pig'] },
  'Horse': { bestWith: ['Tiger', 'Dog'], avoidWith: ['Rat'] },
  'Goat': { bestWith: ['Rabbit', 'Pig'], avoidWith: ['Ox'] },
  'Monkey': { bestWith: ['Rat', 'Dragon'], avoidWith: ['Tiger'] },
  'Rooster': { bestWith: ['Ox', 'Snake'], avoidWith: ['Rabbit'] },
  'Dog': { bestWith: ['Tiger', 'Horse'], avoidWith: ['Dragon'] },
  'Pig': { bestWith: ['Rabbit', 'Goat'], avoidWith: ['Snake'] },
};

export default function ChineseZodiacCalculator() {
  const [birthYear, setBirthYear] = useState(new Date().getFullYear() - 1);

  const zodiacIndex = birthYear % 12;
  const zodiacData = CHINESE_ZODIAC_DATA[zodiacIndex];
  const compatibility = COMPATIBILITY_CHART[zodiacData.animal];

  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      {/* Year Input */}
      <Card className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4 text-center">
          Chinese Zodiac Calculator
        </h2>

        <div className="mb-4">
          <Input
            label="Birth year"
            type="number"
            min={1900}
            max={currentYear}
            value={birthYear}
            onChange={(e) => setBirthYear(Number(e.target.value))}
          />
        </div>

        <p className="text-center text-sm text-text-secondary">
          You are {age} years old
        </p>
      </Card>

      {/* Main Zodiac Card */}
      <Card className="mb-6 text-center py-8 bg-accent/5 border-accent/30">
        <p className="font-heading text-6xl mb-4">🐉</p>
        <p className="font-heading text-4xl font-bold text-accent mb-2">
          {zodiacData.animal}
        </p>
        <div className="flex justify-center gap-2 mb-4">
          <Badge>{zodiacData.element}</Badge>
          <Badge>{birthYear}</Badge>
        </div>
      </Card>

      {/* Personality & Traits */}
      <Card className="mb-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">Personality Traits</h3>

        <div className="bg-surface p-4 rounded-lg mb-4">
          <p className="text-text-primary font-medium">{zodiacData.personality}</p>
        </div>

        <div>
          <p className="text-sm text-text-secondary font-medium mb-3">Famous {zodiacData.animal}s</p>
          <div className="space-y-2">
            {zodiacData.famous.map((person) => (
              <div key={person} className="flex items-center gap-2 p-2 bg-surface rounded-lg">
                <span>🌟</span>
                <span className="text-text-primary">{person}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Compatibility */}
      <Card className="mb-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Compatibility
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-success mb-2">Best Matches</h4>
            <div className="flex flex-wrap gap-2">
              {compatibility.bestWith.map((animal) => (
                <Badge key={animal} className="bg-success/10 text-success border-success/30">
                  {animal}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-error mb-2">Challenging Matches</h4>
            <div className="flex flex-wrap gap-2">
              {compatibility.avoidWith.map((animal) => (
                <Badge key={animal} className="bg-error/10 text-error border-error/30">
                  {animal}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Element Info */}
      <Card>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Element: {zodiacData.element}
        </h3>

        <div className="text-sm text-text-secondary space-y-2">
          {zodiacData.element === 'Metal' && (
            <>
              <p>Metal signs are strong-willed, determined, and authoritative.</p>
              <p>They value loyalty and hard work above all else.</p>
            </>
          )}
          {zodiacData.element === 'Water' && (
            <>
              <p>Water signs are intuitive, adaptable, and emotional.</p>
              <p>They are sensitive to their surroundings and others' feelings.</p>
            </>
          )}
          {zodiacData.element === 'Wood' && (
            <>
              <p>Wood signs are energetic, creative, and compassionate.</p>
              <p>They seek growth and harmony in their lives.</p>
            </>
          )}
          {zodiacData.element === 'Fire' && (
            <>
              <p>Fire signs are passionate, dynamic, and enthusiastic.</p>
              <p>They bring energy and excitement wherever they go.</p>
            </>
          )}
          {zodiacData.element === 'Earth' && (
            <>
              <p>Earth signs are practical, grounded, and reliable.</p>
              <p>They are stable and methodical in their approach to life.</p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
