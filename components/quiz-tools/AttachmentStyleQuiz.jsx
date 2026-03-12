'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'I find that other people don\'t want to get as close as I would like.',
    secure: 1,
    anxious: 4,
    dismissive: 2,
    fearful: 3,
  },
  {
    id: 2,
    text: 'I worry about being alone and abandoned.',
    secure: 1,
    anxious: 4,
    dismissive: 1,
    fearful: 4,
  },
  {
    id: 3,
    text: 'I prefer to be independent rather than dependent on others.',
    secure: 2,
    anxious: 1,
    dismissive: 4,
    fearful: 2,
  },
  {
    id: 4,
    text: 'My partner doesn\'t seem to want to be as emotionally close as I would like.',
    secure: 1,
    anxious: 4,
    dismissive: 2,
    fearful: 3,
  },
  {
    id: 5,
    text: 'I\'m uncomfortable being close and intimate with others.',
    secure: 1,
    anxious: 1,
    dismissive: 4,
    fearful: 3,
  },
  {
    id: 6,
    text: 'I worry that my partner doesn\'t really love me or want to stay with me.',
    secure: 1,
    anxious: 4,
    dismissive: 1,
    fearful: 4,
  },
  {
    id: 7,
    text: 'I\'m very comfortable discussing my emotions and feelings with my partner.',
    secure: 4,
    anxious: 3,
    dismissive: 1,
    fearful: 1,
  },
  {
    id: 8,
    text: 'I often worry that my partner will leave me or stop loving me.',
    secure: 1,
    anxious: 4,
    dismissive: 1,
    fearful: 4,
  },
  {
    id: 9,
    text: 'I feel most comfortable when I\'m not dependent on anyone.',
    secure: 1,
    anxious: 1,
    dismissive: 4,
    fearful: 2,
  },
  {
    id: 10,
    text: 'I can easily become close with others.',
    secure: 4,
    anxious: 2,
    dismissive: 1,
    fearful: 1,
  },
  {
    id: 11,
    text: 'I feel anxious when my partner and I don\'t talk or spend time together.',
    secure: 1,
    anxious: 4,
    dismissive: 1,
    fearful: 3,
  },
  {
    id: 12,
    text: 'I feel comfortable relying on my partner in times of need.',
    secure: 4,
    anxious: 3,
    dismissive: 1,
    fearful: 1,
  },
  {
    id: 13,
    text: 'I prefer not to show a partner how I feel deep down.',
    secure: 1,
    anxious: 1,
    dismissive: 4,
    fearful: 3,
  },
  {
    id: 14,
    text: 'I sometimes feel like I\'m not good enough in relationships.',
    secure: 1,
    anxious: 4,
    dismissive: 1,
    fearful: 4,
  },
  {
    id: 15,
    text: 'I think that maintaining emotional independence is important.',
    secure: 2,
    anxious: 1,
    dismissive: 4,
    fearful: 2,
  },
  {
    id: 16,
    text: 'I\'m confident that I can make my relationships work.',
    secure: 4,
    anxious: 2,
    dismissive: 2,
    fearful: 1,
  },
  {
    id: 17,
    text: 'I need a lot of reassurance that my partner cares about me.',
    secure: 1,
    anxious: 4,
    dismissive: 1,
    fearful: 3,
  },
  {
    id: 18,
    text: 'I trust my partner and feel that they trust me.',
    secure: 4,
    anxious: 2,
    dismissive: 2,
    fearful: 1,
  },
  {
    id: 19,
    text: 'I feel uncomfortable when someone wants to be very close to me.',
    secure: 1,
    anxious: 1,
    dismissive: 4,
    fearful: 3,
  },
  {
    id: 20,
    text: 'I find it easy to form close, meaningful relationships.',
    secure: 4,
    anxious: 2,
    dismissive: 1,
    fearful: 1,
  },
];

const STYLE_INFO = {
  secure: {
    name: 'Secure Attachment',
    emoji: '💚',
    color: '#16a34a',
    lightColor: '#dcfce7',
    description: 'You feel comfortable with intimacy and dependence in relationships. You trust your partner and can express your needs openly.',
    strengths: [
      'Comfortable with both closeness and independence',
      'Can communicate feelings openly and honestly',
      'Trust in your partner and relationships',
      'Handle conflict well and seek resolution',
    ],
    growth: [
      'Remember that all relationships require effort',
      'Your secure style is not a guarantee of relationship success',
      'Continue practicing empathy and understanding',
    ],
  },
  anxious: {
    name: 'Anxious-Preoccupied Attachment',
    emoji: '💛',
    color: '#d97706',
    lightColor: '#fef3c7',
    description: 'You crave intimacy and closeness in relationships. You may sometimes worry about your partner\'s feelings and need reassurance.',
    strengths: [
      'You\'re invested in your relationships',
      'You\'re attuned to your partner\'s emotions',
      'You value connection and intimacy',
      'You\'re likely to seek support when needed',
    ],
    growth: [
      'Work on building self-esteem and self-validation',
      'Practice independence and self-soothing',
      'Communicate your needs clearly without criticism',
      'Challenge catastrophic thinking patterns',
    ],
  },
  dismissive: {
    name: 'Dismissive-Avoidant Attachment',
    emoji: '💙',
    color: '#2563eb',
    lightColor: '#dbeafe',
    description: 'You value independence and self-reliance. You may feel uncomfortable with too much emotional intimacy or depend on others.',
    strengths: [
      'You\'re self-reliant and independent',
      'You don\'t get easily distressed in relationships',
      'You maintain a strong sense of self',
      'You can remain calm in conflict',
    ],
    growth: [
      'Practice vulnerability and emotional expression',
      'Work on trusting others and asking for help',
      'Develop comfort with emotional intimacy',
      'Challenge beliefs that needing others is weakness',
    ],
  },
  fearful: {
    name: 'Fearful-Avoidant Attachment',
    emoji: '💜',
    color: '#9333ea',
    lightColor: '#f3e8ff',
    description: 'You have mixed feelings about relationships—wanting closeness while fearing it. You may experience anxiety and avoidance.',
    strengths: [
      'You\'re aware of relationship complexities',
      'You can recognize your emotional patterns',
      'You might be empathetic due to your sensitivity',
      'You have capacity for deep connections',
    ],
    growth: [
      'Work with a therapist to resolve conflicting feelings',
      'Practice self-compassion and acceptance',
      'Build consistent, trustworthy relationships slowly',
      'Develop grounding techniques for anxiety',
    ],
  },
};

function downloadResultCard(style, percentages) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // Gradient background (peach to rose)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#fed7aa');
  gradient.addColorStop(1, '#fbcfe8');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Heart decoration
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('♥', canvas.width / 2, 100);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px Fraunces';
  ctx.textAlign = 'center';
  ctx.fillText('Attachment Style', canvas.width / 2, 200);

  // Style name with emoji
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 28px DM Sans';
  ctx.fillText(`${STYLE_INFO[style].emoji} ${STYLE_INFO[style].name}`, canvas.width / 2, 280);

  // Description
  ctx.fillStyle = '#525252';
  ctx.font = '16px DM Sans';
  ctx.textAlign = 'left';
  const descriptionLines = ctx.measureText(STYLE_INFO[style].description).width > 650
    ? STYLE_INFO[style].description.split(' ').reduce((lines, word) => {
        const lastLine = lines[lines.length - 1];
        const testLine = lastLine + (lastLine ? ' ' : '') + word;
        if (ctx.measureText(testLine).width > 650) {
          lines.push(word);
        } else {
          lines[lines.length - 1] = testLine;
        }
        return lines;
      }, [''])
    : [STYLE_INFO[style].description];

  let y = 330;
  descriptionLines.forEach((line) => {
    ctx.fillText(line, 40, y);
    y += 25;
  });

  // Breakdown percentages
  y = 500;
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 16px DM Sans';
  ctx.fillText('Style Breakdown:', 40, y);

  y += 40;
  Object.entries(percentages).forEach(([styleKey, percent]) => {
    ctx.font = '14px DM Sans';
    const styleName = STYLE_INFO[styleKey].name;
    ctx.fillText(`${styleName}: ${percent}%`, 60, y);
    y += 28;
  });

  // Watermark
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.font = '14px DM Sans';
  ctx.textAlign = 'right';
  ctx.fillText('mykit.tools', canvas.width - 40, canvas.height - 20);

  // Download
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'attachment-style-results.png';
  link.click();
}

export default function AttachmentStyleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const scores = { secure: 0, anxious: 0, dismissive: 0, fearful: 0 };

    Object.entries(answers).forEach(([questionId, value]) => {
      const question = QUESTIONS.find((q) => q.id === parseInt(questionId));
      if (question) {
        const styleKey = ['secure', 'anxious', 'dismissive', 'fearful'][value - 1];
        scores[styleKey] += 1;
      }
    });

    const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
    const percentages = {};
    Object.keys(scores).forEach((style) => {
      percentages[style] = Math.round((scores[style] / total) * 100);
    });

    const dominantStyle = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    return { scores, percentages, dominantStyle };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const style = results.dominantStyle;
    const info = STYLE_INFO[style];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">Your Attachment Style</h2>
          <p className="text-text-secondary mt-2">Based on attachment theory by Bowlby & Ainsworth (1969/1978)</p>
        </div>

        {/* Main result card */}
        <Card className="border-2" style={{ borderColor: info.color, backgroundColor: info.lightColor }}>
          <div className="text-center space-y-4">
            <div className="text-6xl">{info.emoji}</div>
            <h3 className="text-3xl font-bold text-text-primary">{info.name}</h3>
            <p className="text-text-secondary text-lg">{info.description}</p>
          </div>
        </Card>

        {/* Breakdown chart */}
        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-text-primary">Your Style Breakdown</h4>
            {Object.entries(results.percentages).map(([styleKey, percent]) => (
              <div key={styleKey}>
                <div className="flex justify-between mb-2">
                  <span className="text-text-secondary font-medium">{STYLE_INFO[styleKey].name}</span>
                  <span className="font-mono font-bold text-accent">{percent}%</span>
                </div>
                <div className="bg-surface rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${percent}%`, backgroundColor: STYLE_INFO[styleKey].color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths */}
        <Card className="bg-white border-l-4" style={{ borderLeftColor: info.color }}>
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-text-primary">Your Strengths</h4>
            <ul className="space-y-2">
              {info.strengths.map((strength, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Growth areas */}
        <Card className="bg-white border-l-4" style={{ borderLeftColor: info.color }}>
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-text-primary">Areas for Growth</h4>
            <ul className="space-y-2">
              {info.growth.map((area, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="font-bold" style={{ color: info.color }}>→</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Important note */}
        <div style={{ backgroundColor: info.lightColor }} className="border rounded-[var(--radius-card)] p-4">
          <p className="text-sm text-text-secondary">
            <strong>Remember:</strong> Your attachment style is not fixed. With awareness and effort, you can move towards secure attachment. If you're struggling with relationship patterns, speaking with a therapist can provide valuable support.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => downloadResultCard(style, results.percentages)}
          >
            Download Results Card
          </Button>
          <Button
            variant="secondary"
            size="lg"
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
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-primary font-medium">
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </span>
          <span className="text-text-secondary">{Math.round(progress)}%</span>
        </div>
        <div className="bg-white rounded-full h-2 overflow-hidden border border-border">
          <div
            className="bg-accent h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="bg-white border-2">
        <p className="text-lg text-text-primary font-medium mb-6">{question.text}</p>

        {/* Style options */}
        <div className="space-y-3">
          {[
            { key: 'secure', label: 'Secure', desc: 'Comfortable with this' },
            { key: 'anxious', label: 'Anxious', desc: 'Often worry about this' },
            { key: 'dismissive', label: 'Dismissive', desc: 'Prefer to avoid this' },
            { key: 'fearful', label: 'Fearful', desc: 'Mixed feelings about this' },
          ].map(({ key, label, desc }, idx) => (
            <button
              key={key}
              onClick={() => {
                setAnswers({ ...answers, [question.id]: idx + 1 });
              }}
              className={`w-full text-left p-4 rounded-[var(--radius-input)] border-2 transition-all ${
                answers[question.id] === idx + 1
                  ? 'border-accent bg-accent bg-opacity-10'
                  : 'border-border hover:border-accent'
              }`}
            >
              <div className="font-medium text-text-primary">{label}</div>
              <div className="text-sm text-text-secondary">{desc}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3 justify-between">
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
