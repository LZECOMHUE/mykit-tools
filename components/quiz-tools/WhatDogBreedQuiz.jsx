'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'Your ideal energy level is:',
    options: [
      { text: 'High, active, always ready to go', breed: 'husky' },
      { text: 'Moderate, balanced activity', breed: 'goldenRetriever' },
      { text: 'Low, prefer relaxation', breed: 'pug' },
      { text: 'Very high, intense and focused', breed: 'borderCollie' },
    ],
  },
  {
    id: 2,
    text: 'How do you feel about social situations?',
    options: [
      { text: 'Love being around people', breed: 'labrador' },
      { text: 'Love meeting new people', breed: 'goldenRetriever' },
      { text: 'Prefer a close circle', breed: 'pug' },
      { text: 'Depend on the person', breed: 'germanShepherd' },
    ],
  },
  {
    id: 3,
    text: 'Your approach to life is:',
    options: [
      { text: 'Eager to please and laid-back', breed: 'labrador' },
      { text: 'Warm and optimistic', breed: 'goldenRetriever' },
      { text: 'Independent and reserved', breed: 'greyhound' },
      { text: 'Intelligent and observant', breed: 'borderCollie' },
    ],
  },
  {
    id: 4,
    text: 'In a group, you are:',
    options: [
      { text: 'The friendly connector', breed: 'labrador' },
      { text: 'The calm mediator', breed: 'cockerSpaniel' },
      { text: 'The lone wolf', breed: 'greyhound' },
      { text: 'The leader and protector', breed: 'germanShepherd' },
    ],
  },
  {
    id: 5,
    text: 'Your loyalty level is:',
    options: [
      { text: 'Completely devoted to those I love', breed: 'germanShepherd' },
      { text: 'Steadily loyal and dependable', breed: 'labrador' },
      { text: 'Friendly and open', breed: 'goldenRetriever' },
      { text: 'Choose my people carefully', breed: 'pug' },
    ],
  },
  {
    id: 6,
    text: 'When facing challenges, you:',
    options: [
      { text: 'Tackle them head-on with focus', breed: 'borderCollie' },
      { text: 'Work through them steadily', breed: 'labrador' },
      { text: 'Use speed and agility', breed: 'greyhound' },
      { text: 'Ask for help from trusted people', breed: 'cockerSpaniel' },
    ],
  },
  {
    id: 7,
    text: 'Your ideal living situation is:',
    options: [
      { text: 'Plenty of space to roam', breed: 'husky' },
      { text: 'Comfortable home with active life', breed: 'labrador' },
      { text: 'Cozy space, low-key life', breed: 'pug' },
      { text: 'Space to work and focus', breed: 'borderCollie' },
    ],
  },
  {
    id: 8,
    text: 'Your personality strengths are:',
    options: [
      { text: 'Reliable and adaptable', breed: 'labrador' },
      { text: 'Intelligent and driven', breed: 'borderCollie' },
      { text: 'Charming and affectionate', breed: 'pug' },
      { text: 'Fast, focused, and brave', breed: 'greyhound' },
    ],
  },
  {
    id: 9,
    text: 'You would describe yourself as:',
    options: [
      { text: 'Loving and enthusiastic', breed: 'goldenRetriever' },
      { text: 'Spirited and unpredictable', breed: 'husky' },
      { text: 'Sensitive and supportive', breed: 'cockerSpaniel' },
      { text: 'Protective and loyal', breed: 'germanShepherd' },
    ],
  },
  {
    id: 10,
    text: 'Your communication style is:',
    options: [
      { text: 'Open and expressive', breed: 'labrador' },
      { text: 'Direct and protective', breed: 'germanShepherd' },
      { text: 'Playful and charming', breed: 'pug' },
      { text: 'Reserved but warm', breed: 'cockerSpaniel' },
    ],
  },
  {
    id: 11,
    text: 'When it comes to training and growth:',
    options: [
      { text: 'I love learning new skills', breed: 'borderCollie' },
      { text: 'I do what is asked reliably', breed: 'labrador' },
      { text: 'I need motivation and treats', breed: 'pug' },
      { text: 'I prefer to watch and observe', breed: 'greyhound' },
    ],
  },
  {
    id: 12,
    text: 'Your ideal weekend is:',
    options: [
      { text: 'Outdoor adventure with others', breed: 'husky' },
      { text: 'Active fun with loved ones', breed: 'goldenRetriever' },
      { text: 'Snuggled up with close friends', breed: 'pug' },
      { text: 'Solving a challenging puzzle', breed: 'borderCollie' },
    ],
  },
];

const BREED_INFO = {
  labrador: {
    name: 'Labrador Retriever',
    emoji: '🐕',
    color: '#dc2626',
    lightColor: '#fee2e2',
    match: 'Your personality is like a Labrador: friendly, eager to please, and incredibly versatile.',
    description: 'You are the people person of the group. Friendly, reliable, and beloved by everyone, you adapt well to any situation and genuinely care about those around you.',
    traits: [
      'Enthusiastically friendly and outgoing',
      'Reliable and eager to help',
      'Adaptable to different situations',
      'Great listener and connector',
      'Loved by almost everyone',
    ],
    funFacts: [
      'Labradors are the most popular dog breed worldwide',
      'They were originally bred to retrieve fishing nets in Newfoundland',
      'Their waterproof double coat helps them thrive in cold conditions',
    ],
  },
  borderCollie: {
    name: 'Border Collie',
    emoji: '🧠',
    color: '#0ea5e9',
    lightColor: '#cffafe',
    match: 'Your personality is like a Border Collie: brilliant, focused, and driven to succeed.',
    description: 'You are the intelligent problem-solver who loves learning and mastering new challenges. Your mind is always engaged, and you excel at everything you set your mind to.',
    traits: [
      'Highly intelligent and quick learner',
      'Intensely focused and driven',
      'Excellent problem-solver',
      'Thrives on mental stimulation',
      'Naturally excels at leadership',
    ],
    funFacts: [
      'Border Collies are considered the smartest dog breed',
      'They can understand over 250 words and commands',
      'Originally bred to herd sheep across the Scotland-England border',
    ],
  },
  goldenRetriever: {
    name: 'Golden Retriever',
    emoji: '💛',
    color: '#f97316',
    lightColor: '#ffedd5',
    match: 'Your personality is like a Golden Retriever: warm, optimistic, and genuinely kind-hearted.',
    description: 'You radiate warmth and positivity that makes others feel comfortable and valued. Your gentle nature and genuine kindness make you a wonderful presence in any situation.',
    traits: [
      'Warm and genuinely kind',
      'Optimistic and positive outlook',
      'Patient and gentle with others',
      'Natural empathy and compassion',
      'Brings out the best in people',
    ],
    funFacts: [
      'Golden Retrievers were bred to retrieve game for Scottish hunters',
      'They have webbed paws which makes them excellent swimmers',
      'They consistently rank in the top 3 most popular dog breeds',
    ],
  },
  husky: {
    name: 'Siberian Husky',
    emoji: '❄️',
    color: '#6366f1',
    lightColor: '#e0e7ff',
    match: 'Your personality is like a Husky: spirited, adventurous, and energetically independent.',
    description: 'You are the free spirit with endless energy and wanderlust. You\'re not afraid of challenges, love adventure, and inspire others to embrace the wild side of life.',
    traits: [
      'Spirited and adventurous nature',
      'Independent and strong-willed',
      'Endless enthusiasm and energy',
      'Not easily discouraged',
      'Brings excitement and unpredictability',
    ],
    funFacts: [
      'Huskies were bred to pull sleds across the frozen Arctic',
      'They have striking blue or multi-colored eyes',
      'They "talk" by howling and are known for being vocal',
    ],
  },
  pug: {
    name: 'Pug',
    emoji: '🐾',
    color: '#ec4899',
    lightColor: '#fce7f3',
    match: 'Your personality is like a Pug: charming, affectionate, and charmingly mischievous.',
    description: 'You are the lovable character who brings joy through humor and genuine affection. Despite your laid-back nature, your presence is unforgettable and cherished.',
    traits: [
      'Charming and affectionate personality',
      'Has a mischievous sense of humor',
      'Prefers comfort and companionship',
      'Highly lovable and endearing',
      'Creates a cozy, fun atmosphere',
    ],
    funFacts: [
      'Pugs were bred as companions for Chinese emperors',
      'Their wrinkled face is one of their most distinctive features',
      'They are prone to "reverse sneezing," a cute quirk of the breed',
    ],
  },
  greyhound: {
    name: 'Greyhound',
    emoji: '⚡',
    color: '#a855f7',
    lightColor: '#f3e8ff',
    match: 'Your personality is like a Greyhound: sleek, focused, and powerfully independent.',
    description: 'You are the mysterious independent who prefers observation to constant activity. You move through life with grace and focus, revealing your depth only to those you trust.',
    traits: [
      'Independent and selective about relationships',
      'Thoughtful and observant nature',
      'Graceful and elegant presence',
      'Focused when pursuing goals',
      'Comfortable with solitude',
    ],
    funFacts: [
      'Greyhounds are one of the oldest dog breeds, dating back to ancient Egypt',
      'They can reach speeds of 45 mph in just a few strides',
      'Despite their athletic appearance, they are gentle couch potatoes',
    ],
  },
  cockerSpaniel: {
    name: 'Cocker Spaniel',
    emoji: '🎨',
    color: '#84cc16',
    lightColor: '#dcfce7',
    match: 'Your personality is like a Cocker Spaniel: artistic, sensitive, and deeply connected.',
    description: 'You are the sensitive, artistic soul with excellent emotional intelligence. You feel things deeply, understand others intuitively, and create beauty wherever you go.',
    traits: [
      'Sensitive and emotionally aware',
      'Artistic and creative tendencies',
      'Strong intuitive sense about people',
      'Loyal and devoted to loved ones',
      'Brings warmth and comfort',
    ],
    funFacts: [
      'Cocker Spaniels were originally bred as hunting dogs in Spain',
      'Their long, silky ears are iconic and need regular grooming',
      'They are known for their gentle, sweet temperament',
    ],
  },
  germanShepherd: {
    name: 'German Shepherd',
    emoji: '🛡️',
    color: '#b91c1c',
    lightColor: '#fee2e2',
    match: 'Your personality is like a German Shepherd: loyal, protective, and naturally commanding.',
    description: 'You are the natural leader with a strong sense of responsibility and loyalty. You take your commitments seriously and have an unwavering dedication to those you love.',
    traits: [
      'Fiercely loyal and devoted',
      'Natural protective instincts',
      'Strong sense of responsibility',
      'Intelligent and strategic thinker',
      'Commands respect naturally',
    ],
    funFacts: [
      'German Shepherds are one of the most versatile dog breeds',
      'They are extensively used in police, military, and search-and-rescue work',
      'They were popularized by Max von Stephanitz in late 1800s Germany',
    ],
  },
};

export default function WhatDogBreedQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const breedCounts = {
      labrador: 0,
      borderCollie: 0,
      goldenRetriever: 0,
      husky: 0,
      pug: 0,
      greyhound: 0,
      cockerSpaniel: 0,
      germanShepherd: 0,
    };

    Object.values(answers).forEach((breed) => {
      breedCounts[breed] += 1;
    });

    const dominantBreed = Object.keys(breedCounts).reduce((a, b) =>
      breedCounts[a] > breedCounts[b] ? a : b
    );

    return { breedCounts, dominantBreed };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const breed = results.dominantBreed;
    const info = BREED_INFO[breed];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your Dog Breed Match</h2>
          <p className="mt-2 text-text-secondary">Which breed matches your personality?</p>
        </div>

        <Card className="border-2" style={{ borderColor: info.color, backgroundColor: info.lightColor }}>
          <div className="space-y-4 text-center">
            <div className="text-6xl">{info.emoji}</div>
            <h3 className="font-heading text-3xl font-bold text-text-primary">{info.name}</h3>
            <p className="text-lg text-text-secondary">{info.match}</p>
            <p className="text-text-secondary">{info.description}</p>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Your Personality Traits</h4>
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
            <h4 className="font-heading text-lg font-bold text-text-primary">Fun Breed Facts</h4>
            <ul className="space-y-2">
              {info.funFacts.map((fact, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent">•</span>
                  <span>{fact}</span>
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
                setAnswers({ ...answers, [question.id]: option.breed });
              }}
              className={`w-full rounded-[var(--radius-input)] border-2 p-4 text-left transition-all ${
                answers[question.id] === option.breed
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
