'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'Which music style appeals to you most?',
    options: [
      { text: 'Big band and swing', decade: '50s' },
      { text: 'Rock and roll, soul', decade: '60s' },
      { text: 'Disco, funk, glam rock', decade: '70s' },
      { text: 'Synth-pop, new wave, punk', decade: '80s' },
    ],
  },
  {
    id: 2,
    text: 'What fashion era speaks to your style?',
    options: [
      { text: 'Poodle skirts and leather jackets', decade: '50s' },
      { text: 'Hippie, mini dresses, bell-bottoms', decade: '60s' },
      { text: 'Platform shoes, bell-bottoms, sequins', decade: '70s' },
      { text: 'Power suits, leg warmers, bold colors', decade: '80s' },
    ],
  },
  {
    id: 3,
    text: 'What technology era appeals to you?',
    options: [
      { text: 'Radio and vinyl records', decade: '50s' },
      { text: 'Black and white TV', decade: '60s' },
      { text: 'Colour TV and early computers', decade: '70s' },
      { text: 'Personal computers and arcade games', decade: '80s' },
    ],
  },
  {
    id: 4,
    text: 'How do you prefer to spend a night out?',
    options: [
      { text: 'Drive-in movies and milkshake bars', decade: '50s' },
      { text: 'Concerts and music festivals', decade: '60s' },
      { text: 'Disco dancing and dinner parties', decade: '70s' },
      { text: 'Nightclubs with great DJs and lights', decade: '80s' },
    ],
  },
  {
    id: 5,
    text: 'What movie genre is your favourite?',
    options: [
      { text: 'Classic musicals and dramas', decade: '50s' },
      { text: 'Romantic comedies and epics', decade: '60s' },
      { text: 'Action and adventure films', decade: '70s' },
      { text: 'Sci-fi and blockbuster action', decade: '80s' },
    ],
  },
  {
    id: 6,
    text: 'What represents your ideal lifestyle?',
    options: [
      { text: 'Wholesome, family-oriented, traditional', decade: '50s' },
      { text: 'Rebellious, free-spirited, idealistic', decade: '60s' },
      { text: 'Laid-back, diverse, creative', decade: '70s' },
      { text: 'Fast-paced, ambitious, trendy', decade: '80s' },
    ],
  },
  {
    id: 7,
    text: 'What type of car appeals to you?',
    options: [
      { text: 'Classic convertibles and cruisers', decade: '50s' },
      { text: 'Colorful vans and muscle cars', decade: '60s' },
      { text: 'Fuel-efficient compact cars', decade: '70s' },
      { text: 'Fast sports cars and SUVs', decade: '80s' },
    ],
  },
  {
    id: 8,
    text: 'What hairstyle fits your vibe?',
    options: [
      { text: 'Slicked back or victory rolls', decade: '50s' },
      { text: 'Long, straight, or afro-textured', decade: '60s' },
      { text: 'Feathered or permed', decade: '70s' },
      { text: 'Big curls, perms, or spiky', decade: '80s' },
    ],
  },
  {
    id: 9,
    text: 'What was the ideal home decor?',
    options: [
      { text: 'Pastel colors and chrome accents', decade: '50s' },
      { text: 'Bold patterns and bright colors', decade: '60s' },
      { text: 'Earth tones and wood furniture', decade: '70s' },
      { text: 'Neon accents and high-tech gadgets', decade: '80s' },
    ],
  },
  {
    id: 10,
    text: 'What food trend appeals to you?',
    options: [
      { text: 'Casseroles and meat and potatoes', decade: '50s' },
      { text: 'Fondue and exotic cuisine', decade: '60s' },
      { text: 'Vegetarian and natural foods', decade: '70s' },
      { text: 'Fast food and experimental cooking', decade: '80s' },
    ],
  },
  {
    id: 11,
    text: 'What communication style fits you?',
    options: [
      { text: 'Formal and proper', decade: '50s' },
      { text: 'Open and expressive', decade: '60s' },
      { text: 'Casual and relaxed', decade: '70s' },
      { text: 'Trendy and current slang', decade: '80s' },
    ],
  },
  {
    id: 12,
    text: 'What entertainment was your preferred era?',
    options: [
      { text: 'Theatre and live performances', decade: '50s' },
      { text: 'Experimental theatre and happenings', decade: '60s' },
      { text: 'Live music and comedy clubs', decade: '70s' },
      { text: 'Music videos and cable TV', decade: '80s' },
    ],
  },
];

const DECADE_INFO = {
  '50s': {
    name: 'The 1950s',
    emoji: '✨',
    color: '#dc2626',
    lightColor: '#fee2e2',
    description: 'You are a classic romantic who values tradition, elegance, and timeless beauty. You appreciate the charm of wholesome entertainment and prefer things done with a touch of sophistication.',
    traits: [
      'Appreciation for tradition and formality',
      'Love of classic entertainment and music',
      'Values family and conventional lifestyles',
      'Enjoys timeless style and elegance',
      'Appreciates nostalgia and heritage',
    ],
  },
  '60s': {
    name: 'The 1960s',
    emoji: '🌼',
    color: '#f97316',
    lightColor: '#ffedd5',
    description: 'You are a free spirit with idealistic views and a love for cultural change. You embrace diversity, challenge the status quo, and believe in the power of expression and revolution.',
    traits: [
      'Free-spirited and idealistic worldview',
      'Appreciation for cultural movements',
      'Values creativity and self-expression',
      'Embraces diversity and change',
      'Loves music and artistic experimentation',
    ],
  },
  '70s': {
    name: 'The 1970s',
    emoji: '🌿',
    color: '#84cc16',
    lightColor: '#dcfce7',
    description: 'You are laid-back and groovy with a natural, earthy sensibility. You value authenticity, environmental consciousness, and a relaxed approach to life while still embracing creative expression.',
    traits: [
      'Laid-back and easygoing nature',
      'Environmental and eco-conscious values',
      'Appreciation for natural authenticity',
      'Creative and artistic inclinations',
      'Values diversity and acceptance',
    ],
  },
  '80s': {
    name: 'The 1980s',
    emoji: '⚡',
    color: '#a855f7',
    lightColor: '#f3e8ff',
    description: 'You are ambitious, trendy, and energetic with a love for excitement and innovation. You embrace technology, bold self-expression, and the fast-paced nature of contemporary life.',
    traits: [
      'Ambitious and forward-thinking mindset',
      'Embrace of technology and innovation',
      'Love of bold self-expression',
      'Fast-paced and energetic lifestyle',
      'Appreciation for pop culture and trends',
    ],
  },
  '90s': {
    name: 'The 1990s',
    emoji: '🎮',
    color: '#0ea5e9',
    lightColor: '#cffafe',
    description: 'You are cool, independent, and digitally savvy with eclectic tastes. You appreciate alternative culture, nostalgia, and the balance between authentic counterculture and emerging digital connectivity.',
    traits: [
      'Independent and unconventional thinking',
      'Early adopter of digital technology',
      'Appreciation for alternative culture',
      'Eclectic and diverse taste',
      'Values authenticity and cool detachment',
    ],
  },
  '00s': {
    name: 'The 2000s',
    emoji: '📱',
    color: '#06b6d4',
    lightColor: '#ecfdf5',
    description: 'You are connected, optimistic, and digital-native with a love for pop culture fusion. You seamlessly blend online and offline experiences and appreciate the nostalgia of early internet culture.',
    traits: [
      'Digital-native and tech-savvy',
      'Connected and social personality',
      'Optimistic worldview',
      'Pop culture enthusiast',
      'Seamlessly blends digital and physical worlds',
    ],
  },
};

export default function WhichDecadeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const decadeCounts = {
      '50s': 0,
      '60s': 0,
      '70s': 0,
      '80s': 0,
      '90s': 0,
      '00s': 0,
    };

    Object.values(answers).forEach((decade) => {
      decadeCounts[decade] += 1;
    });

    const dominantDecade = Object.keys(decadeCounts).reduce((a, b) =>
      decadeCounts[a] > decadeCounts[b] ? a : b
    );

    return { decadeCounts, dominantDecade };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const decade = results.dominantDecade;
    const info = DECADE_INFO[decade];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your Decade Match</h2>
          <p className="mt-2 text-text-secondary">Which era resonates most with your soul?</p>
        </div>

        <Card className="border-2" style={{ borderColor: info.color, backgroundColor: info.lightColor }}>
          <div className="space-y-4 text-center">
            <div className="text-6xl">{info.emoji}</div>
            <h3 className="font-heading text-3xl font-bold text-text-primary">{info.name}</h3>
            <p className="text-lg text-text-secondary">{info.description}</p>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Your Key Traits</h4>
            <ul className="space-y-2">
              {info.traits.map((trait, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">✓</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
              setAnswers({});
            }}
          >
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-text-primary">
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </span>
          <span className="text-text-secondary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full border border-border bg-white">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="border-2 bg-white">
        <p className="mb-6 text-lg font-medium text-text-primary">{question.text}</p>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAnswers({ ...answers, [question.id]: option.decade });
              }}
              className={`w-full rounded-[var(--radius-input)] border-2 p-4 text-left transition-all ${
                answers[question.id] === option.decade
                  ? 'border-accent bg-accent bg-opacity-10'
                  : 'border-border hover:border-accent'
              }`}
            >
              <div className="font-medium text-text-primary">{option.text}</div>
            </button>
          ))}
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button
          variant="secondary"
          size="lg"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
        >
          Previous
        </Button>

        {currentQuestion < QUESTIONS.length - 1 ? (
          <Button
            variant="primary"
            size="lg"
            disabled={answers[question.id] === undefined}
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            disabled={!allAnswered}
            onClick={() => setShowResults(true)}
          >
            See Results
          </Button>
        )}
      </div>
    </div>
  );
}
