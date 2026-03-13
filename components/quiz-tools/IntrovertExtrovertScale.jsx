'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'At a party with strangers, you:',
    options: [
      { text: 'Hide in a quiet corner', score: 0 },
      { text: 'Talk to a few selected people', score: 2 },
      { text: 'Chat with whoever approaches', score: 5 },
      { text: 'Work the room and meet everyone', score: 10 },
    ],
  },
  {
    id: 2,
    text: 'How much social time do you need weekly?',
    options: [
      { text: 'Almost none, prefer being alone', score: 0 },
      { text: 'Limited, maybe a few hours', score: 3 },
      { text: 'Moderate amount, balanced', score: 5 },
      { text: 'Lots, the more the better', score: 10 },
    ],
  },
  {
    id: 3,
    text: 'You recharge energy by:',
    options: [
      { text: 'Spending time alone', score: 0 },
      { text: 'Quiet time with close people', score: 3 },
      { text: 'Mix of alone and group time', score: 5 },
      { text: 'Being around others', score: 10 },
    ],
  },
  {
    id: 4,
    text: 'Making new friends is:',
    options: [
      { text: 'Exhausting, I avoid it', score: 0 },
      { text: 'Difficult but possible', score: 2 },
      { text: 'Fairly natural and easy', score: 6 },
      { text: 'Easy and exciting', score: 10 },
    ],
  },
  {
    id: 5,
    text: 'Spontaneous plans to hang out:',
    options: [
      { text: 'Please, no. Need warning', score: 0 },
      { text: 'Only if I\'m already in the mood', score: 3 },
      { text: 'Sometimes fun, sometimes draining', score: 5 },
      { text: 'Yes! I love spontaneity', score: 10 },
    ],
  },
  {
    id: 6,
    text: 'On social media, you:',
    options: [
      { text: 'Rarely post, prefer lurking', score: 1 },
      { text: 'Share occasionally with close circles', score: 3 },
      { text: 'Post regularly to stay connected', score: 6 },
      { text: 'Very active, constant updates', score: 10 },
    ],
  },
  {
    id: 7,
    text: 'Your ideal vacation is:',
    options: [
      { text: 'Alone in a quiet location', score: 0 },
      { text: 'With one close friend', score: 2 },
      { text: 'Small group of trusted people', score: 5 },
      { text: 'Big group trip with new adventures', score: 10 },
    ],
  },
  {
    id: 8,
    text: 'Public speaking or being the center of attention:',
    options: [
      { text: 'My worst nightmare', score: 0 },
      { text: 'Very uncomfortable', score: 2 },
      { text: 'Manageable with preparation', score: 5 },
      { text: 'Actually quite enjoyable', score: 10 },
    ],
  },
  {
    id: 9,
    text: 'Phone calls or video chats:',
    options: [
      { text: 'Avoid at all costs', score: 0 },
      { text: 'Only when necessary', score: 2 },
      { text: 'Fine in moderation', score: 5 },
      { text: 'Love connecting this way', score: 10 },
    ],
  },
  {
    id: 10,
    text: 'After a social event, you feel:',
    options: [
      { text: 'Completely drained for days', score: 0 },
      { text: 'Tired and need recovery time', score: 2 },
      { text: 'Somewhat tired, content', score: 5 },
      { text: 'Energized and ready for more', score: 10 },
    ],
  },
  {
    id: 11,
    text: 'Your job preference is:',
    options: [
      { text: 'Solitary work, minimal interaction', score: 0 },
      { text: 'Mostly independent with some collaboration', score: 3 },
      { text: 'Mix of independent and team work', score: 5 },
      { text: 'Highly collaborative and people-focused', score: 10 },
    ],
  },
  {
    id: 12,
    text: 'When feeling stressed, you:',
    options: [
      { text: 'Withdraw completely', score: 0 },
      { text: 'Prefer being alone with maybe one person', score: 2 },
      { text: 'Want support but in controlled doses', score: 5 },
      { text: 'Seek out friends immediately', score: 10 },
    ],
  },
  {
    id: 13,
    text: 'Group activities at work:',
    options: [
      { text: 'I try to skip them', score: 0 },
      { text: 'Attend but don\'t enjoy', score: 2 },
      { text: 'Okay if kept reasonably short', score: 5 },
      { text: 'I look forward to them', score: 10 },
    ],
  },
  {
    id: 14,
    text: 'How many close friends do you want?',
    options: [
      { text: 'Just one or two at most', score: 0 },
      { text: 'A small tight circle', score: 3 },
      { text: 'Several close friends', score: 6 },
      { text: 'Many friends, the more the merrier', score: 10 },
    ],
  },
  {
    id: 15,
    text: 'You identify as:',
    options: [
      { text: 'Definitely introverted', score: 0 },
      { text: 'Mostly introverted', score: 2 },
      { text: 'Somewhere in the middle', score: 5 },
      { text: 'Mostly extroverted', score: 8 },
    ],
  },
];

const RESULT_RANGES = {
  strongIntrovert: {
    name: 'Strong Introvert',
    emoji: '🏠',
    color: '#0ea5e9',
    lightColor: '#cffafe',
    range: '0-19',
    description: 'You deeply value alone time and find large social gatherings draining. Your small circle of close friends is everything to you.',
    traits: [
      'Prefer meaningful one-on-one interactions',
      'Recharge through solitude',
      'Deeply thoughtful and observant',
      'Prefer quality over quantity in friendships',
      'Need advance notice for social plans',
    ],
    tips: [
      'Honor your need for alone time',
      'Build gradually toward socializing',
      'Find social settings that match your style (small cafes vs. loud clubs)',
      'Remember that your depth is a strength',
      'Energy management is key to your wellbeing',
    ],
  },
  introvert: {
    name: 'Introvert',
    emoji: '📚',
    color: '#06b6d4',
    lightColor: '#ecfdf5',
    range: '20-39',
    description: 'You enjoy social time but need regular breaks to recharge. You prefer meaningful conversations over small talk.',
    traits: [
      'Selective about social commitments',
      'Enjoy deeper conversations',
      'Comfortable in small groups',
      'Thoughtful listener',
      'Appreciate preparation before socializing',
    ],
    tips: [
      'Balance social and alone time carefully',
      'Don\'t force yourself into constant socializing',
      'Find activities that suit your social needs',
      'Your reflective nature helps others',
      'Communicate your boundaries clearly',
    ],
  },
  ambivert: {
    name: 'Ambivert',
    emoji: '⚖️',
    color: '#8b5cf6',
    lightColor: '#f3e8ff',
    range: '40-60',
    description: 'You are flexible and adaptable, enjoying both social time and solitude. You can be the life of the party or happily alone.',
    traits: [
      'Flexible and adaptable personality',
      'Enjoy both social and solo activities',
      'Comfortable in various social situations',
      'Can read social cues well',
      'Balanced energy management',
    ],
    tips: [
      'Your flexibility is a superpower',
      'Respect your varying energy levels',
      'Help bridge gaps between introverts and extroverts',
      'Lean into what feels right in the moment',
      'Recognize you can be both gregarious and introspective',
    ],
  },
  extrovert: {
    name: 'Extrovert',
    emoji: '🎉',
    color: '#f97316',
    lightColor: '#ffedd5',
    range: '61-79',
    description: 'You gain energy from social interaction and love being around people. You are naturally outgoing and engaging.',
    traits: [
      'Energized by social interaction',
      'Natural conversationalist',
      'Comfortable being center of attention',
      'Enjoy large group settings',
      'Action-oriented and spontaneous',
    ],
    tips: [
      'Find communities and groups that match your energy',
      'Use your enthusiasm to inspire others',
      'Remember to listen as well as speak',
      'Help quieter people feel included',
      'Channel your energy into leadership or organizing',
    ],
  },
  strongExtrovert: {
    name: 'Strong Extrovert',
    emoji: '⚡',
    color: '#dc2626',
    lightColor: '#fee2e2',
    range: '80-100',
    description: 'You are the ultimate people person. Social interaction energizes you and you thrive in the spotlight.',
    traits: [
      'Boundless social energy',
      'Natural leader and organizer',
      'Thrives with constant interaction',
      'Highly spontaneous and adventurous',
      'Enthusiastic and infectious energy',
    ],
    tips: [
      'Seek roles that leverage your people skills',
      'Ensure quieter friends don\'t feel overwhelmed',
      'Find outlets for your boundless energy',
      'Learn to enjoy quieter moments occasionally',
      'Your enthusiasm is contagious - use it positively',
    ],
  },
};

export default function IntrovertExtrovertScale() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const percentage = Math.round((totalScore / (QUESTIONS.length * 10)) * 100);

    let category;
    if (percentage <= 19) category = 'strongIntrovert';
    else if (percentage <= 39) category = 'introvert';
    else if (percentage <= 60) category = 'ambivert';
    else if (percentage <= 79) category = 'extrovert';
    else category = 'strongExtrovert';

    return { totalScore, percentage, category };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const categoryInfo = RESULT_RANGES[results.category];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your Personality Type</h2>
          <p className="mt-2 text-text-secondary">Where do you fall on the introvert-extrovert spectrum?</p>
        </div>

        <Card className="border-2" style={{ borderColor: categoryInfo.color, backgroundColor: categoryInfo.lightColor }}>
          <div className="space-y-4 text-center">
            <div className="text-6xl">{categoryInfo.emoji}</div>
            <h3 className="font-heading text-3xl font-bold text-text-primary">{categoryInfo.name}</h3>
            <div className="font-mono text-xl font-bold text-accent">Spectrum Position: {results.percentage}%</div>
            <p className="text-sm text-text-secondary">(0% = Full Introvert, 100% = Full Extrovert)</p>
            <p className="text-lg text-text-secondary">{categoryInfo.description}</p>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Your Characteristics</h4>
            <ul className="space-y-2">
              {categoryInfo.traits.map((trait, idx) => (
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
            <h4 className="font-heading text-lg font-bold text-text-primary">Tips for Your Type</h4>
            <ul className="space-y-2">
              {categoryInfo.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="rounded-[var(--radius-card)] border-l-4 p-4" style={{ borderLeftColor: categoryInfo.color, backgroundColor: categoryInfo.lightColor }}>
          <p className="text-sm text-text-secondary">
            <strong>Remember:</strong> This is a spectrum, not a fixed label. Your position may vary depending on your mood, energy, and the situation. Both introverts and extroverts have valuable qualities.
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
                setAnswers({ ...answers, [question.id]: option.score });
              }}
              className={`w-full rounded-[var(--radius-input)] border-2 p-4 text-left transition-all ${
                answers[question.id] === option.score
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
