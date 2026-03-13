'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'When faced with a problem, you:',
    options: [
      { text: 'Research and understand it deeply', house: 'scholars' },
      { text: 'Face it head-on with courage', house: 'brave' },
      { text: 'Find the most effective solution', house: 'ambitious' },
      { text: 'Support your friends through it', house: 'loyal' },
    ],
  },
  {
    id: 2,
    text: 'What matters most to you?',
    options: [
      { text: 'Knowledge and truth', house: 'scholars' },
      { text: 'Doing the right thing', house: 'brave' },
      { text: 'Achieving your goals', house: 'ambitious' },
      { text: 'Your loved ones\' wellbeing', house: 'loyal' },
    ],
  },
  {
    id: 3,
    text: 'Your ideal way to spend time is:',
    options: [
      { text: 'Learning something new', house: 'scholars' },
      { text: 'Adventure and new experiences', house: 'brave' },
      { text: 'Working toward ambitions', house: 'ambitious' },
      { text: 'Time with close friends', house: 'loyal' },
    ],
  },
  {
    id: 4,
    text: 'In a group project, you naturally:',
    options: [
      { text: 'Research and gather information', house: 'scholars' },
      { text: 'Take on the challenging parts', house: 'brave' },
      { text: 'Lead and organize everything', house: 'ambitious' },
      { text: 'Make sure everyone feels included', house: 'loyal' },
    ],
  },
  {
    id: 5,
    text: 'You are best known for being:',
    options: [
      { text: 'Thoughtful and insightful', house: 'scholars' },
      { text: 'Bold and fearless', house: 'brave' },
      { text: 'Driven and resourceful', house: 'ambitious' },
      { text: 'Dependable and kind', house: 'loyal' },
    ],
  },
  {
    id: 6,
    text: 'When someone you care about is struggling:',
    options: [
      { text: 'You listen and help them understand', house: 'scholars' },
      { text: 'You encourage them to be strong', house: 'brave' },
      { text: 'You help them find solutions', house: 'ambitious' },
      { text: 'You\'re simply there for them', house: 'loyal' },
    ],
  },
  {
    id: 7,
    text: 'Your greatest strength is:',
    options: [
      { text: 'Your mind and intellect', house: 'scholars' },
      { text: 'Your courage and determination', house: 'brave' },
      { text: 'Your ambition and drive', house: 'ambitious' },
      { text: 'Your loyalty and heart', house: 'loyal' },
    ],
  },
  {
    id: 8,
    text: 'What would disappoint you most?',
    options: [
      { text: 'Ignorance and closed-mindedness', house: 'scholars' },
      { text: 'Cowardice and giving up', house: 'brave' },
      { text: 'Settling for mediocrity', house: 'ambitious' },
      { text: 'Betraying someone\'s trust', house: 'loyal' },
    ],
  },
  {
    id: 9,
    text: 'Your approach to risk is:',
    options: [
      { text: 'Calculated after research', house: 'scholars' },
      { text: 'Embrace it fearlessly', house: 'brave' },
      { text: 'Take it if it helps progress', house: 'ambitious' },
      { text: 'Avoid it to protect others', house: 'loyal' },
    ],
  },
  {
    id: 10,
    text: 'You feel most alive when:',
    options: [
      { text: 'Discovering something new', house: 'scholars' },
      { text: 'Overcoming a challenge', house: 'brave' },
      { text: 'Reaching a goal', house: 'ambitious' },
      { text: 'Helping someone you love', house: 'loyal' },
    ],
  },
  {
    id: 11,
    text: 'What does loyalty mean to you?',
    options: [
      { text: 'Being honest even when hard', house: 'scholars' },
      { text: 'Standing up for what\'s right', house: 'brave' },
      { text: 'Helping them succeed', house: 'ambitious' },
      { text: 'Being there unconditionally', house: 'loyal' },
    ],
  },
  {
    id: 12,
    text: 'Your life philosophy is:',
    options: [
      { text: 'Seek understanding above all', house: 'scholars' },
      { text: 'Live boldly and authentically', house: 'brave' },
      { text: 'Achieve greatness', house: 'ambitious' },
      { text: 'Build strong bonds with others', house: 'loyal' },
    ],
  },
];

const HOUSE_INFO = {
  scholars: {
    name: 'The Scholars',
    emoji: '📚',
    color: '#0ea5e9',
    lightColor: '#cffafe',
    description: 'The Scholars value wisdom, knowledge, and understanding above all. You are curious, analytical, and always seeking to understand the deeper truths of the world.',
    traits: [
      'Curious and love learning',
      'Thoughtful and analytical',
      'Value truth and honesty',
      'Great at seeing connections',
      'Appreciate intellectual challenges',
    ],
    strengths: [
      'Problem-solving through research',
      'Understanding complex systems',
      'Teaching and explaining clearly',
      'Spotting patterns and insights',
    ],
    archetypes: [
      'The Mentor',
      'The Philosopher',
      'The Detective',
      'The Scientist',
    ],
  },
  brave: {
    name: 'The Brave',
    emoji: '⚔️',
    color: '#dc2626',
    lightColor: '#fee2e2',
    description: 'The Brave are courageous, bold, and willing to stand up for what they believe in. You face challenges head-on and inspire others with your fearless determination.',
    traits: [
      'Courageous and fearless',
      'Take on challenges directly',
      'Inspire others by example',
      'Stand up for what\'s right',
      'Physically and morally brave',
    ],
    strengths: [
      'Leadership in difficult times',
      'Taking decisive action',
      'Protecting those in need',
      'Overcoming obstacles',
    ],
    archetypes: [
      'The Knight',
      'The Hero',
      'The Warrior',
      'The Pioneer',
    ],
  },
  ambitious: {
    name: 'The Ambitious',
    emoji: '🚀',
    color: '#f97316',
    lightColor: '#ffedd5',
    description: 'The Ambitious are driven, resourceful, and determined to succeed. You are strategic, clever, and will do whatever it takes to achieve your goals and climb higher.',
    traits: [
      'Driven and goal-focused',
      'Clever and resourceful',
      'Strategic thinking',
      'Natural leadership ability',
      'Competitive spirit',
    ],
    strengths: [
      'Achieving goals systematically',
      'Strategic planning',
      'Overcoming limitations',
      'Building and creating success',
    ],
    archetypes: [
      'The Leader',
      'The Entrepreneur',
      'The Strategist',
      'The Architect',
    ],
  },
  loyal: {
    name: 'The Loyal',
    emoji: '❤️',
    color: '#16a34a',
    lightColor: '#dcfce7',
    description: 'The Loyal are dedicated, hardworking, and deeply committed to their relationships and values. You are the steadfast presence that others can always count on.',
    traits: [
      'Devoted and reliable',
      'Hardworking and diligent',
      'Strong sense of duty',
      'Deeply loyal to loved ones',
      'Kind and compassionate',
    ],
    strengths: [
      'Building lasting relationships',
      'Being dependable support',
      'Perseverance and dedication',
      'Creating safe communities',
    ],
    archetypes: [
      'The Friend',
      'The Guardian',
      'The Caretaker',
      'The Devoted',
    ],
  },
};

export default function HogwartsHouseQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const houseCounts = {
      scholars: 0,
      brave: 0,
      ambitious: 0,
      loyal: 0,
    };

    Object.values(answers).forEach((house) => {
      houseCounts[house] += 1;
    });

    const dominantHouse = Object.keys(houseCounts).reduce((a, b) =>
      houseCounts[a] > houseCounts[b] ? a : b
    );

    return { houseCounts, dominantHouse };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const house = results.dominantHouse;
    const info = HOUSE_INFO[house];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your House</h2>
          <p className="mt-2 text-text-secondary">Which house aligns with your true character?</p>
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
            <h4 className="font-heading text-lg font-bold text-text-primary">Your Character Traits</h4>
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

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Your Greatest Strengths</h4>
            <ul className="space-y-2">
              {info.strengths.map((strength, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Archetypal Characters Like You</h4>
            <ul className="space-y-2">
              {info.archetypes.map((archetype, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">→</span>
                  <span>{archetype}</span>
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
                setAnswers({ ...answers, [question.id]: option.house });
              }}
              className={`w-full rounded-[var(--radius-input)] border-2 p-4 text-left transition-all ${
                answers[question.id] === option.house
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
