'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'You find humor in:',
    options: [
      { text: 'Silly, childish jokes and puns', ageAdd: -30 },
      { text: 'Slapstick and physical comedy', ageAdd: -20 },
      { text: 'Witty, intelligent humor', ageAdd: 10 },
      { text: 'Dark or cynical humor', ageAdd: 20 },
    ],
  },
  {
    id: 2,
    text: 'Your typical weekend involves:',
    options: [
      { text: 'Playing games and having fun with friends', ageAdd: -25 },
      { text: 'Outdoor activities and adventures', ageAdd: -10 },
      { text: 'Social events or relaxing at home', ageAdd: 5 },
      { text: 'Working or catching up on chores', ageAdd: 25 },
    ],
  },
  {
    id: 3,
    text: 'When something goes wrong, you:',
    options: [
      { text: 'Get upset and cry', ageAdd: -25 },
      { text: 'Get frustrated but bounce back quickly', ageAdd: -5 },
      { text: 'Handle it maturely but feel the stress', ageAdd: 10 },
      { text: 'Stay calm and problem-solve immediately', ageAdd: 25 },
    ],
  },
  {
    id: 4,
    text: 'Your sleep schedule is:',
    options: [
      { text: 'All over the place, sleep when tired', ageAdd: -20 },
      { text: 'Irregular but I try to be consistent', ageAdd: 0 },
      { text: 'Pretty regular and responsible', ageAdd: 15 },
      { text: 'Strictly scheduled and regulated', ageAdd: 30 },
    ],
  },
  {
    id: 5,
    text: 'Your biggest priority right now:',
    options: [
      { text: 'Having fun and enjoying life', ageAdd: -30 },
      { text: 'Spending time with loved ones', ageAdd: -5 },
      { text: 'Personal growth and development', ageAdd: 5 },
      { text: 'Financial security and success', ageAdd: 25 },
    ],
  },
  {
    id: 6,
    text: 'How do you spend money?',
    options: [
      { text: 'Impulsively on whatever looks fun', ageAdd: -25 },
      { text: 'Mostly on experiences and entertainment', ageAdd: -10 },
      { text: 'Balanced between spending and saving', ageAdd: 5 },
      { text: 'Carefully planned and budgeted', ageAdd: 30 },
    ],
  },
  {
    id: 7,
    text: 'Your usual bedtime:',
    options: [
      { text: '9 PM or earlier', ageAdd: 35 },
      { text: '10-11 PM', ageAdd: 15 },
      { text: '11 PM to midnight', ageAdd: 0 },
      { text: 'Midnight or later', ageAdd: -15 },
    ],
  },
  {
    id: 8,
    text: 'When someone criticizes you:',
    options: [
      { text: 'You take it personally and feel hurt', ageAdd: -10 },
      { text: 'You get defensive at first', ageAdd: 5 },
      { text: 'You consider if there\'s truth to it', ageAdd: 10 },
      { text: 'You analyze it objectively and improve', ageAdd: 20 },
    ],
  },
  {
    id: 9,
    text: 'Your approach to learning new things:',
    options: [
      { text: 'I learn by playing and experimenting', ageAdd: -20 },
      { text: 'I learn through experience and mistakes', ageAdd: 0 },
      { text: 'I research and plan before trying', ageAdd: 10 },
      { text: 'I follow established systems and rules', ageAdd: 25 },
    ],
  },
  {
    id: 10,
    text: 'Your relationship with technology:',
    options: [
      { text: 'I use it for games and entertainment mostly', ageAdd: -20 },
      { text: 'I\'m fairly comfortable with current tech', ageAdd: 0 },
      { text: 'I understand and adapt to new tech', ageAdd: 5 },
      { text: 'I feel confused by modern technology', ageAdd: 35 },
    ],
  },
  {
    id: 11,
    text: 'Your fashion style is:',
    options: [
      { text: 'Whatever is comfortable and fun', ageAdd: -15 },
      { text: 'Trendy and fashionable', ageAdd: -5 },
      { text: 'Classic and practical', ageAdd: 10 },
      { text: 'Formal or very conservative', ageAdd: 30 },
    ],
  },
  {
    id: 12,
    text: 'When you get excited about something:',
    options: [
      { text: 'You jump around or act silly', ageAdd: -30 },
      { text: 'You talk very fast and enthusiastically', ageAdd: -15 },
      { text: 'You smile and chat about it normally', ageAdd: 0 },
      { text: 'You maintain composure and discuss calmly', ageAdd: 20 },
    ],
  },
  {
    id: 13,
    text: 'Your biggest worry is:',
    options: [
      { text: 'Whether people like me', ageAdd: -20 },
      { text: 'Social situations and relationships', ageAdd: -5 },
      { text: 'My future and career prospects', ageAdd: 5 },
      { text: 'Health, finances, and responsibilities', ageAdd: 30 },
    ],
  },
  {
    id: 14,
    text: 'You enjoy watching:',
    options: [
      { text: 'Cartoons and kids shows', ageAdd: -35 },
      { text: 'Action movies and comedies', ageAdd: -10 },
      { text: 'Drama series and reality TV', ageAdd: 5 },
      { text: 'News and documentaries', ageAdd: 25 },
    ],
  },
  {
    id: 15,
    text: 'Your life philosophy is:',
    options: [
      { text: 'YOLO - live life to the fullest now', ageAdd: -25 },
      { text: 'Enjoy the present while planning ahead', ageAdd: 0 },
      { text: 'Balance present happiness with future goals', ageAdd: 10 },
      { text: 'Responsibility and duty come first', ageAdd: 30 },
    ],
  },
];

export default function MentalAgeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const totalAgeAdd = Object.values(answers).reduce((sum, val) => sum + val, 0);
    let mentalAge = 25 + Math.floor(totalAgeAdd / 3);

    mentalAge = Math.max(5, Math.min(90, mentalAge));

    let description = '';
    if (mentalAge < 15) {
      description = 'You have a young, playful spirit! You see the world with wonder and joy. Life is an adventure.';
    } else if (mentalAge < 25) {
      description = 'You\'re youthful at heart with lots of energy and enthusiasm. You balance fun with some responsibility.';
    } else if (mentalAge < 35) {
      description = 'You\'re in your prime! You have maturity but still enjoy life. You balance work and play well.';
    } else if (mentalAge < 50) {
      description = 'You\'re thoughtful and responsible. You\'ve gained wisdom and perspective over time.';
    } else if (mentalAge < 65) {
      description = 'You have deep wisdom and life experience. You value stability and have seen much.';
    } else {
      description = 'You are very wise and measured. You prioritize responsibility and have a long perspective on life.';
    }

    return { mentalAge, description };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const getEmoji = (age) => {
      if (age < 15) return '👶';
      if (age < 25) return '🧒';
      if (age < 35) return '👨';
      if (age < 50) return '👴';
      return '🧙';
    };

    const getColor = (age) => {
      if (age < 15) return '#ec4899';
      if (age < 25) return '#f97316';
      if (age < 35) return '#0ea5e9';
      if (age < 50) return '#8b5cf6';
      return '#6b7280';
    };

    const getLightColor = (age) => {
      if (age < 15) return '#fce7f3';
      if (age < 25) return '#ffedd5';
      if (age < 35) return '#cffafe';
      if (age < 50) return '#f3e8ff';
      return '#f3f4f6';
    };

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your Mental Age</h2>
          <p className="mt-2 text-text-secondary">Just for fun - not scientifically validated!</p>
        </div>

        <Card className="border-2" style={{ borderColor: getColor(results.mentalAge), backgroundColor: getLightColor(results.mentalAge) }}>
          <div className="space-y-4 text-center">
            <div className="text-6xl">{getEmoji(results.mentalAge)}</div>
            <div className="font-mono text-5xl font-bold text-accent">{results.mentalAge}</div>
            <div className="text-sm text-text-secondary">Years Old</div>
            <p className="text-lg text-text-secondary">{results.description}</p>
          </div>
        </Card>

        <div className="rounded-[var(--radius-card)] border-2 border-info bg-info bg-opacity-5 p-4">
          <p className="text-sm text-text-secondary">
            <strong>Fun Fact:</strong> This quiz is purely for entertainment. Your actual age is what matters! Your chronological age, life experience, and wisdom are unique to you. This mental age is just a playful reflection of how you approach life right now.
          </p>
        </div>

        <Card className="bg-white">
          <div className="space-y-3">
            <h4 className="font-heading text-lg font-bold text-text-primary">What Your Mental Age Says About You</h4>
            {results.mentalAge < 15 && (
              <ul className="space-y-2">
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You find joy in simple pleasures</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You have an infectious enthusiasm</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You see possibilities everywhere</span>
                </li>
              </ul>
            )}
            {results.mentalAge >= 15 && results.mentalAge < 25 && (
              <ul className="space-y-2">
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You\'re adventurous but learning responsibility</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You balance spontaneity with growth</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You\'re figuring out who you want to be</span>
                </li>
              </ul>
            )}
            {results.mentalAge >= 25 && results.mentalAge < 35 && (
              <ul className="space-y-2">
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You have good perspective and balance</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You\'re confident in who you are</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You know what matters to you</span>
                </li>
              </ul>
            )}
            {results.mentalAge >= 35 && results.mentalAge < 50 && (
              <ul className="space-y-2">
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You value stability and meaning</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You\'ve learned from experience</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You think deeply about decisions</span>
                </li>
              </ul>
            )}
            {results.mentalAge >= 50 && (
              <ul className="space-y-2">
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You possess deep wisdom and perspective</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You\'ve cultivated genuine understanding</span>
                </li>
                <li className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>You prioritize what truly matters</span>
                </li>
              </ul>
            )}
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
      <div className="rounded-[var(--radius-card)] border-2 border-info bg-info bg-opacity-5 p-4">
        <p className="text-sm text-text-secondary">
          This is a fun, lighthearted quiz about your approach to life. It\'s not scientific and is just for entertainment!
        </p>
      </div>

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
                setAnswers({ ...answers, [question.id]: option.ageAdd });
              }}
              className={`w-full rounded-[var(--radius-input)] border-2 p-4 text-left transition-all ${
                answers[question.id] === option.ageAdd
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
