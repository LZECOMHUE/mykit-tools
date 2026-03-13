'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'How do you react to challenges?',
    options: [
      { text: 'Face them with passion and intensity', element: 'fire' },
      { text: 'Go with the flow and adapt', element: 'water' },
      { text: 'Stay grounded and persistent', element: 'earth' },
      { text: 'Rise above and see the bigger picture', element: 'air' },
    ],
  },
  {
    id: 2,
    text: 'Your energy level is typically:',
    options: [
      { text: 'High, burning bright, sometimes exhausting', element: 'fire' },
      { text: 'Fluid, depends on the situation', element: 'water' },
      { text: 'Steady and consistent', element: 'earth' },
      { text: 'Variable and unpredictable', element: 'air' },
    ],
  },
  {
    id: 3,
    text: 'In relationships, you are:',
    options: [
      { text: 'Passionate and intense', element: 'fire' },
      { text: 'Emotional and intuitive', element: 'water' },
      { text: 'Loyal and dependable', element: 'earth' },
      { text: 'Independent and free-spirited', element: 'air' },
    ],
  },
  {
    id: 4,
    text: 'Your ideal environment is:',
    options: [
      { text: 'Exciting and vibrant', element: 'fire' },
      { text: 'Fluid and changing', element: 'water' },
      { text: 'Stable and grounded', element: 'earth' },
      { text: 'Open and spacious', element: 'air' },
    ],
  },
  {
    id: 5,
    text: 'When you feel emotions, you:',
    options: [
      { text: 'Express them immediately and intensely', element: 'fire' },
      { text: 'Feel deeply but keep them private', element: 'water' },
      { text: 'Process them slowly and carefully', element: 'earth' },
      { text: 'Analyze them intellectually', element: 'air' },
    ],
  },
  {
    id: 6,
    text: 'Your approach to life goals:',
    options: [
      { text: 'Chase them with determination', element: 'fire' },
      { text: 'Let life guide me naturally', element: 'water' },
      { text: 'Build toward them step-by-step', element: 'earth' },
      { text: 'Explore many possibilities', element: 'air' },
    ],
  },
  {
    id: 7,
    text: 'How do others perceive you?',
    options: [
      { text: 'Confident and charismatic', element: 'fire' },
      { text: 'Mysterious and intuitive', element: 'water' },
      { text: 'Reliable and grounded', element: 'earth' },
      { text: 'Intellectual and curious', element: 'air' },
    ],
  },
  {
    id: 8,
    text: 'Your weakness tends to be:',
    options: [
      { text: 'Being too impulsive or aggressive', element: 'fire' },
      { text: 'Being too sensitive or moody', element: 'water' },
      { text: 'Being too stubborn or resistant to change', element: 'earth' },
      { text: 'Being too detached or disconnected', element: 'air' },
    ],
  },
  {
    id: 9,
    text: 'Your natural talent is:',
    options: [
      { text: 'Leadership and motivation', element: 'fire' },
      { text: 'Empathy and understanding', element: 'water' },
      { text: 'Building and creating', element: 'earth' },
      { text: 'Learning and communicating', element: 'air' },
    ],
  },
  {
    id: 10,
    text: 'You feel most alive when:',
    options: [
      { text: 'Taking action and pursuing passion', element: 'fire' },
      { text: 'Connecting deeply with others', element: 'water' },
      { text: 'Working with your hands or nature', element: 'earth' },
      { text: 'Exploring ideas and possibilities', element: 'air' },
    ],
  },
];

const ELEMENT_INFO = {
  fire: {
    name: 'Fire',
    emoji: '🔥',
    color: '#dc2626',
    lightColor: '#fee2e2',
    description: 'You are passionate, energetic, and bold. Your inner fire drives you to pursue your dreams with intensity and inspire those around you.',
    traits: [
      'Passionate and energetic',
      'Confident and courageous',
      'Natural leader',
      'Quick to act and decide',
      'Infectious enthusiasm',
    ],
    strengths: [
      'Inspiring others to action',
      'Taking bold risks',
      'Creating excitement and momentum',
      'Pursuing goals with determination',
      'Bringing warmth and light',
    ],
    weaknesses: [
      'Can be impulsive without thinking',
      'May burn out from overexertion',
      'Can be aggressive or dominating',
      'Struggles with patience',
      'May dismiss emotions as weakness',
    ],
    compatible: ['Air (fuels your fire)', 'Wood (feeds your flames)'],
  },
  water: {
    name: 'Water',
    emoji: '💧',
    color: '#0ea5e9',
    lightColor: '#cffafe',
    description: 'You are emotional, intuitive, and adaptable. Like water, you flow around obstacles and deeply understand the hidden currents of life.',
    traits: [
      'Emotionally intelligent',
      'Intuitive and perceptive',
      'Adaptable and flexible',
      'Deeply empathetic',
      'Reflective and introspective',
    ],
    strengths: [
      'Understanding others deeply',
      'Adapting to change easily',
      'Emotional healing presence',
      'Creating harmony',
      'Seeing truth beneath surface',
    ],
    weaknesses: [
      'Can be overly emotional',
      'May lack boundaries',
      'Can be indecisive',
      'May get stuck in the past',
      'Struggles with assertiveness',
    ],
    compatible: ['Metal (clarifies your flow)', 'Wood (helps you grow)'],
  },
  earth: {
    name: 'Earth',
    emoji: '🌍',
    color: '#84cc16',
    lightColor: '#dcfce7',
    description: 'You are grounded, practical, and reliable. You build solid foundations and create stability for yourself and others.',
    traits: [
      'Practical and down-to-earth',
      'Reliable and dependable',
      'Grounded and stable',
      'Nurturing and supportive',
      'Patient and persistent',
    ],
    strengths: [
      'Creating stability and security',
      'Building lasting things',
      'Nurturing growth in others',
      'Following through on commitments',
      'Creating safe spaces',
    ],
    weaknesses: [
      'Can be too rigid',
      'Resistant to change',
      'May lack ambition',
      'Can be pessimistic',
      'Struggles with taking risks',
    ],
    compatible: ['Water (nourishes you)', 'Metal (supports you)'],
  },
  air: {
    name: 'Air',
    emoji: '💨',
    color: '#8b5cf6',
    lightColor: '#f3e8ff',
    description: 'You are intellectual, communicative, and free-spirited. Your curiosity and perspective bring clarity and new ideas to every situation.',
    traits: [
      'Intellectual and analytical',
      'Curious and open-minded',
      'Communicative and expressive',
      'Free-spirited and independent',
      'Forward-thinking',
    ],
    strengths: [
      'Seeing the big picture',
      'Communicating clearly',
      'Bringing fresh perspectives',
      'Connecting ideas and people',
      'Inspiring innovation',
    ],
    weaknesses: [
      'Can be detached emotionally',
      'May be indecisive',
      'Can be scattered or unfocused',
      'Struggles with grounding',
      'May overlook practical details',
    ],
    compatible: ['Fire (ignites you)', 'Wood (helps you grow)'],
  },
};

export default function WhatElementQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const elementCounts = {
      fire: 0,
      water: 0,
      earth: 0,
      air: 0,
    };

    Object.values(answers).forEach((element) => {
      elementCounts[element] += 1;
    });

    const dominantElement = Object.keys(elementCounts).reduce((a, b) =>
      elementCounts[a] > elementCounts[b] ? a : b
    );

    return { elementCounts, dominantElement };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const element = results.dominantElement;
    const info = ELEMENT_INFO[element];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your Element</h2>
          <p className="mt-2 text-text-secondary">Which element represents your spirit?</p>
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
            <h4 className="font-heading text-lg font-bold text-text-primary">Your Traits</h4>
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
            <h4 className="font-heading text-lg font-bold text-text-primary">Your Strengths</h4>
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

        <Card className="border-l-4 bg-white" style={{ borderLeftColor: info.color }}>
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Areas for Growth</h4>
            <ul className="space-y-2">
              {info.weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-warning font-bold">→</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Compatible Elements</h4>
            <ul className="space-y-2">
              {info.compatible.map((comp, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">◆</span>
                  <span>{comp}</span>
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
                setAnswers({ ...answers, [question.id]: option.element });
              }}
              className={`w-full rounded-[var(--radius-input)] border-2 p-4 text-left transition-all ${
                answers[question.id] === option.element
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
