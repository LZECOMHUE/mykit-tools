'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    statement: 'They check your phone without permission',
    category: 'Control',
  },
  {
    id: 2,
    statement: 'They get angry when you spend time with friends',
    category: 'Control',
  },
  {
    id: 3,
    statement: 'They want to know where you are at all times',
    category: 'Control',
  },
  {
    id: 4,
    statement: 'They try to control how you dress',
    category: 'Control',
  },
  {
    id: 5,
    statement: 'They make financial decisions without consulting you',
    category: 'Control',
  },
  {
    id: 6,
    statement: 'They guilt-trip you when you set boundaries',
    category: 'Manipulation',
  },
  {
    id: 7,
    statement: 'They twist arguments so you end up apologising',
    category: 'Manipulation',
  },
  {
    id: 8,
    statement: 'They give you the silent treatment as punishment',
    category: 'Manipulation',
  },
  {
    id: 9,
    statement: 'They say things like "if you loved me, you would..."',
    category: 'Manipulation',
  },
  {
    id: 10,
    statement: 'They deny things they\'ve said or done (gaslighting)',
    category: 'Manipulation',
  },
  {
    id: 11,
    statement: 'They dismiss your feelings as "overreacting"',
    category: 'Respect',
  },
  {
    id: 12,
    statement: 'They make fun of you in front of others',
    category: 'Respect',
  },
  {
    id: 13,
    statement: 'They compare you unfavourably to others',
    category: 'Respect',
  },
  {
    id: 14,
    statement: 'They break promises repeatedly',
    category: 'Respect',
  },
  {
    id: 15,
    statement: 'They take credit for your ideas or achievements',
    category: 'Respect',
  },
  {
    id: 16,
    statement: 'They raise their voice or shout during disagreements',
    category: 'Communication',
  },
  {
    id: 17,
    statement: 'They refuse to discuss problems',
    category: 'Communication',
  },
  {
    id: 18,
    statement: 'They threaten to leave during arguments',
    category: 'Communication',
  },
  {
    id: 19,
    statement: 'They blame you for their bad moods',
    category: 'Communication',
  },
  {
    id: 20,
    statement: 'They go through cycles of being very loving then very cold',
    category: 'Communication',
  },
];

const RESULT_CATEGORIES = [
  {
    range: [0, 15],
    title: 'Healthy Relationship',
    emoji: '💚',
    message: 'Your relationship shows healthy patterns. Keep maintaining open communication, mutual respect, and personal boundaries. Trust your instincts and continue nurturing what works.',
    gradient: 'from-green-400 to-emerald-600',
    showResources: false,
  },
  {
    range: [16, 30],
    title: 'Some Concerns',
    emoji: '⚠️',
    message: 'There are some patterns worth paying attention to. Consider having honest conversations about boundaries, or speak with a trusted friend or counsellor. Early awareness is powerful.',
    gradient: 'from-yellow-400 to-amber-600',
    showResources: false,
  },
  {
    range: [31, 50],
    title: 'Significant Red Flags',
    emoji: '🚩',
    message: 'There are several concerning patterns in this relationship. You deserve better. Please talk to someone you trust—a friend, family member, or professional. Your wellbeing matters.',
    gradient: 'from-orange-400 to-red-600',
    showResources: true,
  },
  {
    range: [51, 80],
    title: 'Serious Warning Signs',
    emoji: '🆘',
    message: 'This relationship contains multiple serious warning signs. You are not alone, and help is available. Please reach out to the support organisations below. You deserve safety and respect.',
    gradient: 'from-red-500 to-red-700',
    showResources: true,
  },
];

const SUPPORT_RESOURCES = [
  {
    name: 'National Domestic Abuse Helpline (UK)',
    phone: '0808 2000 247',
    note: '24/7, free and confidential',
    url: 'https://www.nationaldahelpline.org.uk',
  },
  {
    name: 'Refuge (UK)',
    url: 'https://www.refuge.org.uk',
    note: 'Support and safe housing',
  },
  {
    name: 'National Domestic Violence Hotline (US)',
    phone: '1-800-799-7233',
    note: '24/7, free and confidential',
    url: 'https://www.thehotline.org',
  },
  {
    name: 'Women\'s Aid (UK)',
    url: 'https://www.womensaid.org.uk',
    note: 'Information and support',
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
  const gradientPairs = {
    'from-green-400 to-emerald-600': ['#4ade80', '#059669'],
    'from-yellow-400 to-amber-600': ['#facc15', '#d97706'],
    'from-orange-400 to-red-600': ['#fb923c', '#dc2626'],
    'from-red-500 to-red-700': ['#ef4444', '#b91c1c'],
  };

  const [start, end] = gradientPairs[resultCategory.gradient] || ['#000000', '#ffffff'];
  const gradient = ctx.createLinearGradient(0, 0, 0, 1000);
  gradient.addColorStop(0, start);
  gradient.addColorStop(1, end);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 1000);

  // White card container
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(40, 100, 720, 750);

  // Emoji
  ctx.font = 'bold 100px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'center';
  ctx.fillText(resultCategory.emoji, 400, 230);

  // Title
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'center';
  ctx.fillText(resultCategory.title, 400, 320);

  // Score
  ctx.font = '28px "JetBrains Mono"';
  ctx.fillStyle = '#525252';
  ctx.textAlign = 'center';
  ctx.fillText(`Score: ${score}/80`, 400, 375);

  // Key message
  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#525252';
  ctx.textAlign = 'center';
  ctx.fillText('Knowledge is the first step to a healthier future', 400, 450);

  // Message (wrapped)
  ctx.font = 'normal 16px Arial';
  ctx.fillStyle = '#525252';
  ctx.textAlign = 'center';
  const messageLines = resultCategory.message.match(/.{1,50}(?:\s|$)/g) || [];
  let y = 510;
  messageLines.slice(0, 7).forEach((line) => {
    ctx.fillText(line.trim(), 400, y);
    y += 30;
  });

  // Watermark
  ctx.font = '14px Arial';
  ctx.fillStyle = '#a3a3a3';
  ctx.textAlign = 'center';
  ctx.fillText('mykit.tools', 400, 900);

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'red-flags-quiz-results.png';
    a.click();
    URL.revokeObjectURL(url);
  });
}

export default function RedFlagsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const resultCategory = getResultCategory(score);

  const scoreValues = {
    'Never': 0,
    'Rarely': 1,
    'Sometimes': 2,
    'Often': 3,
    'Very Often': 4,
  };

  const handleAnswer = (value) => {
    const newScore = score + scoreValues[value];
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
      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900">
          <strong>Disclaimer:</strong> This quiz is educational and not a substitute for professional advice. If you're in immediate danger, call 999 (UK) or 911 (US).
        </p>
      </div>

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

          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-accent-muted text-accent text-xs font-semibold rounded-full">
              {QUESTIONS[currentQuestion].category}
            </span>
          </div>

          {/* Statement */}
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-8">
            {QUESTIONS[currentQuestion].statement}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left border-2 border-border rounded-lg hover:bg-accent-muted hover:border-accent transition-all bg-white text-text-primary font-medium"
              >
                {option}
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
            <p className="text-2xl font-mono text-accent">Score: {score}/80</p>
          </div>

          {/* Result Message */}
          <div className="bg-surface rounded-lg p-6 mb-8">
            <p className="text-text-secondary leading-relaxed text-lg">
              {resultCategory.message}
            </p>
          </div>

          {/* Support Resources (if needed) */}
          {resultCategory.showResources && (
            <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-red-900 mb-4">
                Support Resources Available
              </h3>
              <div className="space-y-4">
                {SUPPORT_RESOURCES.map((resource, index) => (
                  <div key={index} className="border-b border-red-200 last:border-b-0 pb-4 last:pb-0">
                    <p className="font-semibold text-red-900">{resource.name}</p>
                    {resource.phone && (
                      <p className="text-red-800 font-mono">📱 {resource.phone}</p>
                    )}
                    {resource.note && (
                      <p className="text-sm text-red-700">{resource.note}</p>
                    )}
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Visit website →
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-red-900 mt-4 font-semibold">
                💙 You deserve to feel safe in your relationship
              </p>
            </div>
          )}

          {/* Key Message */}
          <div className="text-center mb-8 p-4 bg-slate-50 rounded-lg">
            <p className="text-lg font-semibold text-text-primary">
              Knowledge is the first step to a healthier future
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
