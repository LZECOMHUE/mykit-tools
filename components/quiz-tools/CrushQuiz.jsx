'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    question: 'When you walk into a room, your crush...',
    options: [
      { text: 'Ignores you', score: 0 },
      { text: 'Glances occasionally', score: 1 },
      { text: 'Smiles at you', score: 2 },
      { text: 'Lights up and comes over', score: 3 },
    ],
  },
  {
    id: 2,
    question: 'How often does your crush text you first?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Rarely', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Often', score: 3 },
    ],
  },
  {
    id: 3,
    question: 'When you\'re talking, your crush...',
    options: [
      { text: 'Looks around distractedly', score: 0 },
      { text: 'Listens politely', score: 1 },
      { text: 'Leans in and engages', score: 2 },
      { text: 'Mirrors your body language and laughs', score: 3 },
    ],
  },
  {
    id: 4,
    question: 'Your crush\'s friends...',
    options: [
      { text: 'Don\'t know who you are', score: 0 },
      { text: 'Have met you', score: 1 },
      { text: 'Tease them about you', score: 2 },
      { text: 'Tell you your crush talks about you', score: 3 },
    ],
  },
  {
    id: 5,
    question: 'When you post on social media, your crush...',
    options: [
      { text: 'Doesn\'t react', score: 0 },
      { text: 'Occasionally likes', score: 1 },
      { text: 'Often likes and sometimes comments', score: 2 },
      { text: 'Likes everything and replies quickly', score: 3 },
    ],
  },
  {
    id: 6,
    question: 'Your crush remembers...',
    options: [
      { text: 'Nothing you\'ve said', score: 0 },
      { text: 'Big things', score: 1 },
      { text: 'Small details you\'ve mentioned', score: 2 },
      { text: 'Things even you\'ve forgotten saying', score: 3 },
    ],
  },
  {
    id: 7,
    question: 'When someone else flirts with you, your crush...',
    options: [
      { text: 'Doesn\'t notice', score: 0 },
      { text: 'Doesn\'t seem bothered', score: 1 },
      { text: 'Gets a bit quiet', score: 2 },
      { text: 'Seems clearly uncomfortable', score: 3 },
    ],
  },
  {
    id: 8,
    question: 'Your crush makes physical contact...',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Accidentally sometimes', score: 1 },
      { text: 'Casual touches', score: 2 },
      { text: 'Finds excuses to touch your arm/shoulder', score: 3 },
    ],
  },
  {
    id: 9,
    question: 'They suggest hanging out...',
    options: [
      { text: 'Never', score: 0 },
      { text: 'In groups only', score: 1 },
      { text: 'Sometimes one-on-one', score: 2 },
      { text: 'Regularly makes plans with just you', score: 3 },
    ],
  },
  {
    id: 10,
    question: 'When you need help, your crush...',
    options: [
      { text: 'Is unavailable', score: 0 },
      { text: 'Helps if convenient', score: 1 },
      { text: 'Goes out of their way', score: 2 },
      { text: 'Drops everything', score: 3 },
    ],
  },
  {
    id: 11,
    question: 'Eye contact with your crush is...',
    options: [
      { text: 'Rare', score: 0 },
      { text: 'Normal', score: 1 },
      { text: 'Frequent and lingering', score: 2 },
      { text: 'Intense — you catch them looking', score: 3 },
    ],
  },
  {
    id: 12,
    question: 'Your crush\'s laugh around you is...',
    options: [
      { text: 'Normal', score: 0 },
      { text: 'Slightly louder', score: 1 },
      { text: 'Extra giggly', score: 2 },
      { text: 'They laugh at things that aren\'t even funny', score: 3 },
    ],
  },
  {
    id: 13,
    question: 'They bring you things...',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Occasionally', score: 1 },
      { text: 'Coffee/snacks they know you like', score: 2 },
      { text: 'Gifts that show they really know you', score: 3 },
    ],
  },
  {
    id: 14,
    question: 'When making future plans, your crush...',
    options: [
      { text: 'Never includes you', score: 0 },
      { text: 'Sometimes mentions you', score: 1 },
      { text: 'Often includes you', score: 2 },
      { text: 'Talks about "we" and "us"', score: 3 },
    ],
  },
  {
    id: 15,
    question: 'Your gut feeling says...',
    options: [
      { text: 'They\'re not interested', score: 0 },
      { text: 'Hard to tell', score: 1 },
      { text: 'There might be something', score: 2 },
      { text: 'They definitely like me', score: 3 },
    ],
  },
];

const RESULT_CATEGORIES = [
  {
    range: [0, 10],
    title: 'Not Interested',
    emoji: '😔',
    message: 'It looks like your crush isn\'t showing romantic interest right now. Remember, not every connection becomes a match—and that\'s okay! You deserve someone who\'s clearly into you. Keep your heart open for someone who will be.',
    gradient: 'from-slate-400 to-slate-600',
  },
  {
    range: [11, 20],
    title: 'Hard to Tell',
    emoji: '🤔',
    message: 'The signals are mixed, which can be the most frustrating part! They might be shy, they might be figuring things out, or they might just enjoy your friendship. If you want clarity, sometimes a genuine conversation is the way to go.',
    gradient: 'from-amber-400 to-amber-600',
  },
  {
    range: [21, 33],
    title: 'There\'s Something There',
    emoji: '✨',
    message: 'There are definitely positive signs! Your crush seems to enjoy your company and goes out of their way around you. They might be waiting for you to make a move, or they\'re taking their time—either way, the foundation is there.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    range: [34, 45],
    title: 'They\'re Into You!',
    emoji: '🔥',
    message: 'All the signs point to yes! Your crush is showing genuine interest—they remember the small things, they make time for you, and they light up around you. The real question is: what do you want to do about it?',
    gradient: 'from-pink-400 to-rose-500',
  },
];

function getResultCategory(score) {
  return RESULT_CATEGORIES.find(
    (cat) => score >= cat.range[0] && score <= cat.range[1]
  );
}

function downloadResultCard(score, resultCategory) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // Gradient background
  const [gradientStart, gradientEnd] = resultCategory.gradient.split(' to-').map((g) => {
    const colorMap = {
      'slate-400': '#78716c',
      'slate-600': '#57534e',
      'amber-400': '#fbbf24',
      'amber-600': '#d97706',
      'cyan-400': '#22d3ee',
      'blue-500': '#3b82f6',
      'pink-400': '#f472b6',
      'rose-500': '#f43f5e',
    };
    return colorMap[g] || '#ffffff';
  });

  const gradient = ctx.createLinearGradient(0, 0, 0, 1000);
  gradient.addColorStop(0, gradientStart);
  gradient.addColorStop(1, gradientEnd);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 1000);

  // White card container
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(40, 100, 720, 750);

  // Emoji
  ctx.font = 'bold 120px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'center';
  ctx.fillText(resultCategory.emoji, 400, 250);

  // Title
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'center';
  ctx.fillText(resultCategory.title, 400, 340);

  // Score
  ctx.font = '32px "JetBrains Mono"';
  ctx.fillStyle = '#525252';
  ctx.textAlign = 'center';
  ctx.fillText(`Score: ${score}/45`, 400, 400);

  // Message (wrapped)
  ctx.font = 'normal 18px Arial';
  ctx.fillStyle = '#525252';
  ctx.textAlign = 'center';
  const messageLines = resultCategory.message.match(/.{1,50}(?:\s|$)/g) || [];
  let y = 480;
  messageLines.slice(0, 8).forEach((line) => {
    ctx.fillText(line.trim(), 400, y);
    y += 35;
  });

  // Watermark
  ctx.font = '16px Arial';
  ctx.fillStyle = '#a3a3a3';
  ctx.textAlign = 'center';
  ctx.fillText('mykit.tools', 400, 900);

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crush-quiz-results.png';
    a.click();
    URL.revokeObjectURL(url);
  });
}

export default function CrushQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const resultCategory = getResultCategory(score);

  const handleAnswer = (points) => {
    const newScore = score + points;
    setScore(newScore);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsComplete(false);
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {!isComplete ? (
        <Card className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">
                Question {currentQuestion + 1} of {QUESTIONS.length}
              </span>
              <span className="text-sm font-mono text-accent">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-8">
            {QUESTIONS[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {QUESTIONS[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="w-full p-4 text-left border-2 border-border rounded-lg hover:bg-accent-muted hover:border-accent transition-all bg-white text-text-primary font-medium"
              >
                {option.text}
              </button>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="p-8">
          {/* Result Header */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">{resultCategory.emoji}</div>
            <h2 className="text-4xl font-heading font-bold text-text-primary mb-2">
              {resultCategory.title}
            </h2>
            <p className="text-2xl font-mono text-accent">Score: {score}/45</p>
          </div>

          {/* Result Message */}
          <div className="bg-surface rounded-lg p-6 mb-8">
            <p className="text-text-secondary leading-relaxed text-lg">
              {resultCategory.message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => downloadResultCard(score, resultCategory)}
              className="flex-1"
              variant="primary"
            >
              Download Results
            </Button>
            <Button
              onClick={resetQuiz}
              variant="secondary"
              className="flex-1"
            >
              Retake Quiz
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
