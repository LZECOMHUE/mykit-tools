'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const PALM_LINES = {
  'heart-line': {
    name: 'Heart Line',
    description:
      'This line represents your emotional and romantic nature, love, and relationships.',
    details: [
      {
        condition: 'Long and deep',
        meaning: 'Strong emotional depth, passionate, loyal in love',
      },
      {
        condition: 'Short or faint',
        meaning: 'Independent spirit, values practicality over emotion',
      },
      {
        condition: 'Curved upward',
        meaning: 'Generous, open-hearted, expressive in relationships',
      },
      {
        condition: 'Straight across',
        meaning: 'Rational approach to relationships, logical thinker',
      },
    ],
  },
  'head-line': {
    name: 'Head Line',
    description:
      'This line represents your intellect, creativity, communication style, and problem-solving abilities.',
    details: [
      {
        condition: 'Long and clear',
        meaning: 'Analytical mind, good concentration, thoughtful decision-maker',
      },
      {
        condition: 'Short',
        meaning: 'Practical thinker, prefers action over contemplation',
      },
      {
        condition: 'Curved downward',
        meaning: 'Creative, imaginative, artistic sensitivity',
      },
      {
        condition: 'Straight',
        meaning: 'Logical, organized, strategic thinking',
      },
    ],
  },
  'life-line': {
    name: 'Life Line',
    description:
      'This line represents your vitality, physical health, major life events, and life trajectory.',
    details: [
      {
        condition: 'Long and deep',
        meaning: 'Good health, vitality, vibrant life force',
      },
      {
        condition: 'Short',
        meaning: 'Does not indicate short lifespan; rather a quieter, simpler life',
      },
      {
        condition: 'Curved around thumb',
        meaning: 'Strong energy, resilience, good recovery from challenges',
      },
      {
        condition: 'Breaks or gaps',
        meaning: 'Major life changes, turning points, new beginnings',
      },
    ],
  },
  'fate-line': {
    name: 'Fate Line',
    description:
      'This line represents your destiny, career path, life purpose, and significant life changes.',
    details: [
      {
        condition: 'Clear and strong',
        meaning: 'Clear life direction, strong sense of purpose, destiny',
      },
      {
        condition: 'Faint or absent',
        meaning: 'Life path less predetermined, more freedom and flexibility',
      },
      {
        condition: 'Starts from life line',
        meaning: 'Family influence shapes your destiny',
      },
      {
        condition: 'Breaks',
        meaning: 'Major career changes, life redirections, new paths',
      },
    ],
  },
};

const FINGER_MEANINGS = {
  thumb: 'Willpower, determination, and personal strength. A longer thumb suggests strong will and determination.',
  index: 'Leadership, authority, and ambition. A long index finger indicates natural leadership qualities.',
  middle: 'Responsibility, balance, and stability. Represents your sense of duty and maturity.',
  ring: 'Creativity, self-expression, and relationships. A long ring finger shows creative ability.',
  pinky: 'Communication, intelligence, and social skills. A long pinky suggests excellent communication.',
};

const MOUNTS = {
  venus: 'Governs love, sensuality, passion, and vitality. A prominent mount indicates strong emotional and physical energy.',
  jupiter: 'Governs ambition, leadership, confidence, and optimism. Prominence suggests natural authority.',
  saturn: 'Governs responsibility, discipline, caution, and wisdom. Prominence indicates seriousness and wisdom.',
  sun: 'Governs creativity, talent, success, and wealth. Prominence suggests creative and artistic ability.',
  mercury: 'Governs communication, intelligence, business acumen. Prominence indicates analytical and commercial talent.',
  moon: 'Governs imagination, intuition, travel, and emotional expression. Prominence suggests strong intuition.',
  plain: 'The plain of Mars governs willpower and courage. Prominence indicates determination and boldness.',
};

export default function PalmReadingGuide() {
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedFinger, setSelectedFinger] = useState(null);
  const [selectedMount, setSelectedMount] = useState(null);

  const renderLineDetails = (line) => {
    const lineData = PALM_LINES[line];
    return (
      <Card className="space-y-4">
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="font-heading text-2xl font-bold text-text-primary">
            {lineData.name}
          </h3>
          <p className="text-text-secondary mt-2">{lineData.description}</p>
        </div>

        <div className="space-y-3">
          {lineData.details.map((detail, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-surface">
              <p className="font-medium text-text-primary text-sm">
                {detail.condition}
              </p>
              <p className="text-text-secondary text-sm mt-1">
                {detail.meaning}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          onClick={() => setSelectedLine(null)}
          className="w-full"
        >
          Back to Palm
        </Button>
      </Card>
    );
  };

  if (selectedLine) {
    return <div className="space-y-6">{renderLineDetails(selectedLine)}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Hand Diagram */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-bold text-text-primary">
            Click on a palm line or finger to learn its meaning
          </h3>

          {/* Simple Hand Representation */}
          <div className="bg-white rounded-lg p-8">
            <svg viewBox="0 0 200 350" className="w-full max-w-xs mx-auto">
              {/* Hand outline */}
              <path
                d="M 60 100 Q 50 150 55 250 L 80 300 Q 100 320 120 300 L 145 250 Q 150 150 140 100 L 100 80 L 60 100 Z"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
              />

              {/* Life Line */}
              <path
                d="M 85 100 Q 80 150 85 250"
                stroke="#f87171"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <circle cx="85" cy="100" r="6" fill="none" stroke="#f87171" strokeWidth="2" />
              <text x="50" y="110" fontSize="11" fill="#dc2626" fontWeight="bold">
                Life
              </text>

              {/* Head Line */}
              <path
                d="M 70 140 Q 100 135 130 140"
                stroke="#fbbf24"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <text x="75" y="130" fontSize="11" fill="#b45309" fontWeight="bold">
                Head
              </text>

              {/* Heart Line */}
              <path
                d="M 65 110 Q 100 105 135 110"
                stroke="#ec4899"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <text x="65" y="100" fontSize="11" fill="#be185d" fontWeight="bold">
                Heart
              </text>

              {/* Fate Line */}
              <path
                d="M 100 80 Q 100 180 100 280"
                stroke="#06b6d4"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <text x="105" y="180" fontSize="11" fill="#0891b2" fontWeight="bold">
                Fate
              </text>

              {/* Fingers */}
              <circle cx="50" cy="85" r="4" fill="none" stroke="#6b7280" strokeWidth="1.5" />
              <circle cx="70" cy="75" r="4" fill="none" stroke="#6b7280" strokeWidth="1.5" />
              <circle cx="90" cy="70" r="4" fill="none" stroke="#6b7280" strokeWidth="1.5" />
              <circle cx="110" cy="75" r="4" fill="none" stroke="#6b7280" strokeWidth="1.5" />
              <circle cx="130" cy="85" r="4" fill="none" stroke="#6b7280" strokeWidth="1.5" />

              {/* Finger labels */}
              <text x="45" y="95" fontSize="10" fill="#6b7280" fontWeight="bold">
                T
              </text>
              <text x="65" y="90" fontSize="10" fill="#6b7280" fontWeight="bold">
                I
              </text>
              <text x="85" y="85" fontSize="10" fill="#6b7280" fontWeight="bold">
                M
              </text>
              <text x="105" y="90" fontSize="10" fill="#6b7280" fontWeight="bold">
                R
              </text>
              <text x="125" y="100" fontSize="10" fill="#6b7280" fontWeight="bold">
                P
              </text>
            </svg>

            <p className="text-xs text-text-secondary text-center mt-4">
              T=Thumb, I=Index, M=Middle, R=Ring, P=Pinky
            </p>
          </div>
        </div>
      </Card>

      {/* Palm Lines */}
      <div className="space-y-3">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          Major Palm Lines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(PALM_LINES).map(([key, line]) => (
            <Button
              key={key}
              onClick={() => setSelectedLine(key)}
              className="text-left h-auto p-4"
              variant="secondary"
            >
              <div>
                <p className="font-heading font-bold">{line.name}</p>
                <p className="text-xs text-text-secondary mt-1">
                  Click to learn more
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Fingers Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            Finger Length Meanings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(FINGER_MEANINGS).map(([finger, meaning]) => (
              <div
                key={finger}
                className="p-3 rounded-lg bg-surface border-l-4 border-purple-500"
              >
                <p className="font-heading font-semibold text-text-primary capitalize">
                  {finger} Finger
                </p>
                <p className="text-sm text-text-secondary mt-2">{meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Mounts Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            Palm Mounts
          </h3>
          <p className="text-sm text-text-secondary">
            The fleshy areas of your palm have specific meanings. A pronounced
            mount indicates strong traits in that area.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(MOUNTS).map(([mount, meaning]) => (
              <div
                key={mount}
                className="p-3 rounded-lg bg-surface border-l-4 border-pink-500"
              >
                <p className="font-heading font-semibold text-text-primary capitalize">
                  Mount of {mount.charAt(0).toUpperCase() + mount.slice(1)}
                </p>
                <p className="text-sm text-text-secondary mt-2">{meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Info */}
      <Card className="bg-purple-50 border-l-4 border-purple-500">
        <p className="text-sm text-text-secondary">
          Palm reading is an ancient divination practice. The lines, mounts, and
          finger lengths are interpreted to gain insight into personality and
          life path. This guide is for entertainment and spiritual curiosity
          only.
        </p>
      </Card>
    </div>
  );
}
