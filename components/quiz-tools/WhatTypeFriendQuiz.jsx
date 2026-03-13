'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'Your friends have a crisis. You:',
    options: [
      { text: 'Take charge and fix it immediately', type: 'mum' },
      { text: 'Make them laugh about it first', type: 'hype' },
      { text: 'Listen without judgment for hours', type: 'therapist' },
      { text: 'Suggest doing something chaotic for distraction', type: 'chaos' },
    ],
  },
  {
    id: 2,
    text: 'Your ideal group activity is:',
    options: [
      { text: 'Organizing a proper outing with logistics', type: 'planner' },
      { text: 'Whatever comes up spontaneously', type: 'chaos' },
      { text: 'A cozy hangout where everyone feels safe', type: 'mum' },
      { text: 'Something fun that builds everyone up', type: 'hype' },
    ],
  },
  {
    id: 3,
    text: 'When someone shares bad news, you:',
    options: [
      { text: 'Validate their feelings and explore what they need', type: 'therapist' },
      { text: 'Have a plan to help them feel better', type: 'mum' },
      { text: 'Get excited about finding solutions together', type: 'planner' },
      { text: 'Make sure they know they can survive this', type: 'hype' },
    ],
  },
  {
    id: 4,
    text: 'Your role at parties is usually:',
    options: [
      { text: 'Making sure everyone is comfortable and fed', type: 'mum' },
      { text: 'Creating the hype and fun energy', type: 'hype' },
      { text: 'Chilling in the corner observing', type: 'quiet' },
      { text: 'The one suggesting wild or unexpected activities', type: 'chaos' },
    ],
  },
  {
    id: 5,
    text: 'Your friends rely on you for:',
    options: [
      { text: 'Practical advice and problem-solving', type: 'mum' },
      { text: 'A pep talk and motivation boost', type: 'hype' },
      { text: 'Actually understanding their feelings', type: 'therapist' },
      { text: 'Keeping things unpredictable and interesting', type: 'chaos' },
    ],
  },
  {
    id: 6,
    text: 'On group chats, you typically:',
    options: [
      { text: 'Send reminders and keep everyone organized', type: 'planner' },
      { text: 'Celebrate wins and hype everyone up', type: 'hype' },
      { text: 'Listen to drama and offer perspective', type: 'therapist' },
      { text: 'Send random funny things', type: 'quiet' },
    ],
  },
  {
    id: 7,
    text: 'Conflict between friends makes you want to:',
    options: [
      { text: 'Step in and help resolve it', type: 'mum' },
      { text: 'Get to the bottom of why they feel that way', type: 'therapist' },
      { text: 'Distract everyone with something fun', type: 'chaos' },
      { text: 'Observe quietly and support individually', type: 'quiet' },
    ],
  },
  {
    id: 8,
    text: 'Your biggest strength as a friend is:',
    options: [
      { text: 'Being dependable and caring for people', type: 'mum' },
      { text: 'Bringing out everyone\'s confidence', type: 'hype' },
      { text: 'Remembering the details of everyone\'s lives', type: 'therapist' },
      { text: 'Never taking yourself too seriously', type: 'chaos' },
    ],
  },
  {
    id: 9,
    text: 'You prefer friendships where you can:',
    options: [
      { text: 'Show up for the big moments', type: 'mum' },
      { text: 'Be completely yourself without judgment', type: 'quiet' },
      { text: 'Have deep conversations anytime', type: 'therapist' },
      { text: 'Plan amazing experiences together', type: 'planner' },
    ],
  },
  {
    id: 10,
    text: 'If you could describe your friendship energy:',
    options: [
      { text: 'Warm, nurturing, and protective', type: 'mum' },
      { text: 'Loud, enthusiastic, and motivating', type: 'hype' },
      { text: 'Calm, empathetic, and present', type: 'therapist' },
      { text: 'Laid-back, observant, and loyal', type: 'quiet' },
    ],
  },
];

const FRIEND_TYPE_INFO = {
  mum: {
    name: 'The Mum Friend',
    emoji: '🤗',
    color: '#ec4899',
    lightColor: '#fce7f3',
    description: 'You are the nurturing heart of your friend group. You take care of everyone, remember details, and always know what people need even before they ask. Your friends feel safe with you.',
    traits: [
      'Instinctively protective and caring',
      'Remembers important dates and details',
      'Always prepared and practical',
      'Natural problem-solver',
      'Makes people feel cared for and valued',
    ],
  },
  chaos: {
    name: 'The Chaos Friend',
    emoji: '🎪',
    color: '#f97316',
    lightColor: '#ffedd5',
    description: 'You are the spontaneous spirit who keeps life unpredictable and fun. Your group would be boring without you. You suggest wild ideas and drag everyone into adventures.',
    traits: [
      'Spontaneous and impulsive',
      'Creates memorable moments',
      'Never afraid to try new things',
      'Brings excitement and energy',
      'Helps others loosen up and have fun',
    ],
  },
  planner: {
    name: 'The Planner',
    emoji: '📋',
    color: '#0ea5e9',
    lightColor: '#cffafe',
    description: 'You are the organizer who makes sure everything actually happens. You create the itineraries, coordinate the details, and ensure everyone has an amazing time.',
    traits: [
      'Detail-oriented and organized',
      'Makes things actually happen',
      'Great at logistics and planning',
      'Reliable and dependable',
      'Enjoys making experiences special',
    ],
  },
  therapist: {
    name: 'The Therapist',
    emoji: '💭',
    color: '#a855f7',
    lightColor: '#f3e8ff',
    description: 'You are the emotional anchor of the group. People open up to you and feel truly heard. You listen deeply, ask the right questions, and help people understand themselves better.',
    traits: [
      'Excellent listener and observer',
      'Deep emotional intelligence',
      'Helps people process feelings',
      'Non-judgmental and empathetic',
      'People feel understood around you',
    ],
  },
  hype: {
    name: 'The Hype Person',
    emoji: '🌟',
    color: '#eab308',
    lightColor: '#fef9c3',
    description: 'You are the motivator and cheerleader who lifts everyone up. Your enthusiasm is contagious, and your friends feel braver and more confident just by being around you.',
    traits: [
      'Naturally enthusiastic and positive',
      'Believes in people\'s potential',
      'Motivates with genuine encouragement',
      'Celebrates wins big and small',
      'Brings out the best in others',
    ],
  },
  quiet: {
    name: 'The Quiet One',
    emoji: '🤐',
    color: '#6b7280',
    lightColor: '#f3f4f6',
    description: 'You are the steady, observant presence in the group. You listen more than you talk, you\'re genuinely loyal, and people trust you completely. You don\'t need the spotlight to matter.',
    traits: [
      'Observant and thoughtful',
      'Genuinely loyal and dependable',
      'Comfortable with quiet',
      'Deep listener, sparse words',
      'Others feel safe being themselves around you',
    ],
  },
};

export default function WhatTypeFriendQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const typeCounts = {
      mum: 0,
      chaos: 0,
      planner: 0,
      therapist: 0,
      hype: 0,
      quiet: 0,
    };

    Object.values(answers).forEach((type) => {
      typeCounts[type] += 1;
    });

    const dominantType = Object.keys(typeCounts).reduce((a, b) =>
      typeCounts[a] > typeCounts[b] ? a : b
    );

    return { typeCounts, dominantType };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const friendType = results.dominantType;
    const info = FRIEND_TYPE_INFO[friendType];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your Friend Type</h2>
          <p className="mt-2 text-text-secondary">Every friend group needs someone like you</p>
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
            <h4 className="font-heading text-lg font-bold text-text-primary">Why You Matter</h4>
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

        <div className="rounded-[var(--radius-card)] border-l-4 p-4" style={{ borderLeftColor: info.color, backgroundColor: info.lightColor }}>
          <p className="text-sm text-text-secondary">
            <strong>Remember:</strong> Most people have a mix of these types. You may be a secondary type as well. The best friend groups have balance and everyone bringing their unique energy.
          </p>
        </div>

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
                setAnswers({ ...answers, [question.id]: option.type });
              }}
              className={`w-full rounded-[var(--radius-input)] border-2 p-4 text-left transition-all ${
                answers[question.id] === option.type
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
