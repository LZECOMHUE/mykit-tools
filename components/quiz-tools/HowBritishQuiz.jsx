'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'Do you find tea more appealing than coffee?',
    options: [
      { text: 'Yes, with milk and a biscuit', points: 4 },
      { text: 'Tea is nice', points: 3 },
      { text: 'Coffee for me', points: 1 },
      { text: 'Tea is hot leaf water', points: 0 },
    ],
  },
  {
    id: 2,
    text: 'How often do you say "sorry" unnecessarily?',
    options: [
      { text: 'Constantly, even when I\'m right', points: 4 },
      { text: 'More than I should', points: 3 },
      { text: 'Sometimes', points: 2 },
      { text: 'Never apologize', points: 0 },
    ],
  },
  {
    id: 3,
    text: 'Your take on beans on toast:',
    options: [
      { text: 'A proper meal, love it', points: 4 },
      { text: 'Acceptable when hungry', points: 2 },
      { text: 'Unusual but okay', points: 1 },
      { text: 'Absolutely not', points: 0 },
    ],
  },
  {
    id: 4,
    text: 'How do you feel about warm beer?',
    options: [
      { text: 'Traditional and proper', points: 4 },
      { text: 'Don\'t mind it', points: 2 },
      { text: 'Prefer cold', points: 1 },
      { text: 'Horrifying', points: 0 },
    ],
  },
  {
    id: 5,
    text: 'Queuing at a bus stop, you:',
    options: [
      { text: 'Follow the unwritten rules strictly', points: 4 },
      { text: 'Wait politely in order', points: 3 },
      { text: 'Get on without much thought', points: 1 },
      { text: 'Push through', points: 0 },
    ],
  },
  {
    id: 6,
    text: 'Your weather conversation ability:',
    options: [
      { text: 'Can discuss weather for 20 minutes', points: 4 },
      { text: 'Mention weather politely', points: 3 },
      { text: 'Say weather is fine and move on', points: 1 },
      { text: 'Not interested in weather chat', points: 0 },
    ],
  },
  {
    id: 7,
    text: 'Digestive biscuits with tea, your opinion:',
    options: [
      { text: 'Essential, the only choice', points: 4 },
      { text: 'Very nice', points: 3 },
      { text: 'Okay I suppose', points: 1 },
      { text: 'Never heard of them', points: 0 },
    ],
  },
  {
    id: 8,
    text: 'How much does rain affect your plans?',
    options: [
      { text: 'I just work around it, very British', points: 4 },
      { text: 'Don\'t let it stop me much', points: 3 },
      { text: 'Changes my plans a bit', points: 1 },
      { text: 'Cancels everything', points: 0 },
    ],
  },
  {
    id: 9,
    text: 'Your opinion on fish and chips:',
    options: [
      { text: 'National treasure, must be eaten regularly', points: 4 },
      { text: 'Excellent comfort food', points: 3 },
      { text: 'Decent meal', points: 1 },
      { text: 'Overrated', points: 0 },
    ],
  },
  {
    id: 10,
    text: 'Complaining without solution, normal for you?',
    options: [
      { text: 'Yes, it\'s therapeutic', points: 4 },
      { text: 'Quite often', points: 3 },
      { text: 'Only when I have reason', points: 1 },
      { text: 'I solve problems, not complain', points: 0 },
    ],
  },
  {
    id: 11,
    text: 'How do you feel about "banter"?',
    options: [
      { text: 'Essential to friendship', points: 4 },
      { text: 'Enjoy light teasing', points: 3 },
      { text: 'Don\'t get it much', points: 1 },
      { text: 'It\'s annoying', points: 0 },
    ],
  },
  {
    id: 12,
    text: 'Sunday roast importance to you:',
    options: [
      { text: 'Sacred weekly tradition', points: 4 },
      { text: 'Have it regularly', points: 3 },
      { text: 'Occasional meal', points: 1 },
      { text: 'Not interested', points: 0 },
    ],
  },
  {
    id: 13,
    text: 'How much does cricket interest you?',
    options: [
      { text: 'Follow it religiously', points: 4 },
      { text: 'Understand the basics', points: 2 },
      { text: 'Vaguely aware', points: 1 },
      { text: 'No interest whatsoever', points: 0 },
    ],
  },
  {
    id: 14,
    text: 'Your ability to say "no" directly:',
    options: [
      { text: 'I hint around it politely', points: 4 },
      { text: 'Struggle to be direct', points: 3 },
      { text: 'Can be direct when needed', points: 1 },
      { text: 'Very direct about saying no', points: 0 },
    ],
  },
  {
    id: 15,
    text: 'Your view on the Royal Family:',
    options: [
      { text: 'Important national institution', points: 4 },
      { text: 'Interesting tradition', points: 3 },
      { text: 'Not my concern', points: 1 },
      { text: 'Should be abolished', points: 0 },
    ],
  },
];

const RESULT_TIERS = {
  basically_american: {
    name: 'Basically American (0-20%)',
    emoji: '🗽',
    color: '#dc2626',
    lightColor: '#fee2e2',
    description: 'You might have a British passport, but your soul is firmly across the pond. British culture is a mystery to you.',
    traits: [
      'Prefers hot/cold beverages clarity',
      'Direct communication style',
      'Tea is optional at best',
      'Not interested in queuing protocol',
      'Weather is just weather',
    ],
  },
  part_time_brit: {
    name: 'Part-Time Brit (21-40%)',
    emoji: '🚢',
    color: '#f97316',
    lightColor: '#ffedd5',
    description: 'You have some British sensibilities, but you\'re not fully committed. You appreciate the tea but could take it or leave it.',
    traits: [
      'Occasional tea drinker',
      'Sometimes polite to a fault',
      'Can enjoy British foods',
      'Make an effort with politeness',
      'Recognize some British humor',
    ],
  },
  reasonably_british: {
    name: 'Reasonably British (41-60%)',
    emoji: '🇬🇧',
    color: '#0ea5e9',
    lightColor: '#cffafe',
    description: 'You are solidly British. You understand the culture, enjoy the traditions, and live by most of the unwritten rules.',
    traits: [
      'Regular tea drinker',
      'Understands and uses banter',
      'Respects the queue',
      'Enjoys British comfort foods',
      'Complains about weather genuinely',
    ],
  },
  proper_british: {
    name: 'Proper British (61-80%)',
    emoji: '👑',
    color: '#8b5cf6',
    lightColor: '#f3e8ff',
    description: 'You are very British indeed. You embody the culture with tea runs, gentle complaining, and impeccable politeness.',
    traits: [
      'Tea with milk is non-negotiable',
      'Politeness is your default',
      'Queuing is sacred',
      'Sunday roast is important',
      'Can turn any topic into weather discussion',
    ],
  },
  more_british_than_queen: {
    name: 'More British Than The Queen (81-100%)',
    emoji: '👸',
    color: '#d946ef',
    lightColor: '#fdf2f8',
    description: 'You are the pinnacle of Britishness. Other British people ask you for advice. You should be teaching this quiz.',
    traits: [
      'Tea is a way of life',
      'Apologizes for existing',
      'Perfected the art of subtle complaint',
      'Understands complex unwritten rules',
      'British traditions are your foundation',
    ],
  },
};

export default function HowBritishQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const totalPoints = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxPoints = QUESTIONS.length * 4;
    const percentage = Math.round((totalPoints / maxPoints) * 100);

    let tier;
    if (percentage <= 20) tier = 'basically_american';
    else if (percentage <= 40) tier = 'part_time_brit';
    else if (percentage <= 60) tier = 'reasonably_british';
    else if (percentage <= 80) tier = 'proper_british';
    else tier = 'more_british_than_queen';

    return { totalPoints, percentage, tier };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const tierInfo = RESULT_TIERS[results.tier];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your Britishness Score</h2>
          <p className="mt-2 text-text-secondary">How British are you really?</p>
        </div>

        <Card className="border-2" style={{ borderColor: tierInfo.color, backgroundColor: tierInfo.lightColor }}>
          <div className="space-y-4 text-center">
            <div className="text-6xl">{tierInfo.emoji}</div>
            <h3 className="font-heading text-3xl font-bold text-text-primary">{tierInfo.name}</h3>
            <div className="font-mono text-4xl font-bold text-accent">{results.percentage}%</div>
            <p className="text-lg text-text-secondary">{tierInfo.description}</p>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Your British Traits</h4>
            <ul className="space-y-2">
              {tierInfo.traits.map((trait, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">✓</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="rounded-[var(--radius-card)] border-l-4 p-4" style={{ borderLeftColor: tierInfo.color, backgroundColor: tierInfo.lightColor }}>
          <p className="text-sm text-text-secondary">
            <strong>Fun fact:</strong> Britishness is not just nationality, it\'s a state of mind. Whether you\'re at 10% or 100%, embrace your unique cultural blend!
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
                setAnswers({ ...answers, [question.id]: option.points });
              }}
              className={`w-full rounded-[var(--radius-input)] border-2 p-4 text-left transition-all ${
                answers[question.id] === option.points
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
