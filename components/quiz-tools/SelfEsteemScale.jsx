'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  { id: 1, text: 'On the whole, I am satisfied with myself.', reverse: false },
  { id: 2, text: 'At times I think I am no good at all.', reverse: true },
  { id: 3, text: 'I feel that I have a number of good qualities.', reverse: false },
  { id: 4, text: 'I am able to do things as well as most other people.', reverse: false },
  { id: 5, text: 'I feel I do not have much to be proud of.', reverse: true },
  { id: 6, text: 'I certainly feel useless at times.', reverse: true },
  { id: 7, text: 'I feel that I\'m a person of worth.', reverse: false },
  { id: 8, text: 'I wish I could have more respect for myself.', reverse: true },
  { id: 9, text: 'All in all, I am inclined to feel that I am a failure.', reverse: true },
  { id: 10, text: 'I take a positive attitude toward myself.', reverse: false },
];

function drawGaugeChart(ctx, score) {
  const centerX = 400;
  const centerY = 400;
  const radius = 120;

  // Draw gauge background
  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, 0);
  ctx.stroke();

  // Determine color based on score
  let gaugeColor = '#dc2626'; // red for low
  if (score >= 25 && score < 30) gaugeColor = '#f97316'; // orange
  if (score >= 30 && score < 35) gaugeColor = '#3b82f6'; // blue
  if (score >= 35) gaugeColor = '#16a34a'; // green

  // Draw gauge fill
  const scoreRatio = (score - 10) / 30; // 10-40 range to 0-1
  const angle = Math.PI + scoreRatio * Math.PI;
  ctx.strokeStyle = gaugeColor;
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, angle);
  ctx.stroke();

  // Draw needle
  const needleX = centerX + radius * Math.cos(angle);
  const needleY = centerY + radius * Math.sin(angle);
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(needleX, needleY);
  ctx.stroke();

  // Draw center circle
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
  ctx.fill();

  // Draw score text
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 48px JetBrains Mono';
  ctx.textAlign = 'center';
  ctx.fillText(score, centerX, centerY + 80);

  // Draw labels
  ctx.font = '12px DM Sans';
  ctx.fillStyle = '#525252';
  ctx.textAlign = 'center';
  ctx.fillText('Low', centerX - radius - 30, centerY + 10);
  ctx.fillText('High', centerX + radius + 30, centerY + 10);
}

function downloadResultCard(score, category) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // Gradient background (light blue to teal)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#e0f2fe');
  gradient.addColorStop(1, '#ccfbf1');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.height, canvas.height);

  // Title
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 32px Fraunces';
  ctx.textAlign = 'center';
  ctx.fillText('Rosenberg Self-Esteem Scale', canvas.width / 2, 60);

  // Draw gauge
  const centerX = canvas.width / 2;
  const centerY = 280;
  const radius = 80;

  // Gauge background
  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, 0);
  ctx.stroke();

  // Gauge color
  let gaugeColor = '#dc2626';
  if (score >= 25 && score < 30) gaugeColor = '#f97316';
  if (score >= 30 && score < 35) gaugeColor = '#3b82f6';
  if (score >= 35) gaugeColor = '#16a34a';

  const scoreRatio = (score - 10) / 30;
  const angle = Math.PI + scoreRatio * Math.PI;
  ctx.strokeStyle = gaugeColor;
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, angle);
  ctx.stroke();

  // Needle
  const needleX = centerX + radius * Math.cos(angle);
  const needleY = centerY + radius * Math.sin(angle);
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(needleX, needleY);
  ctx.stroke();

  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
  ctx.fill();

  // Score text
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 36px JetBrains Mono';
  ctx.textAlign = 'center';
  ctx.fillText(score, centerX, centerY + 60);

  // Category
  ctx.fillStyle = gaugeColor;
  ctx.font = 'bold 20px DM Sans';
  ctx.fillText(category, centerX, centerY + 100);

  // Message
  let message = 'Your self-esteem journey is unique. Keep growing!';
  if (category === 'Low') message = 'Consider speaking with a counsellor or therapist.';
  if (category === 'High') message = 'You have a healthy level of self-respect.';

  ctx.fillStyle = '#525252';
  ctx.font = '14px DM Sans';
  ctx.textAlign = 'center';
  ctx.fillText(message, centerX, centerY + 135);

  // Footer text
  ctx.fillStyle = '#525252';
  ctx.font = '12px DM Sans';
  ctx.textAlign = 'left';
  let y = 550;
  ctx.fillText('Based on the Rosenberg Self-Esteem Scale', 40, y);
  y += 20;
  ctx.fillText('Rosenberg, M. (1965). Princeton University Press.', 40, y);

  // Watermark
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.font = '14px DM Sans';
  ctx.textAlign = 'right';
  ctx.fillText('mykit.tools', canvas.width - 40, canvas.height - 20);

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'self-esteem-results.png';
  link.click();
}

function getCategory(score) {
  if (score <= 25) return 'Low';
  if (score < 35) return 'Normal';
  return 'High';
}

function getInterpretation(score) {
  if (score <= 15) {
    return 'Your results suggest lower self-esteem. This is not uncommon, and with support, it can improve. Consider speaking with a counsellor or therapist who can provide personalized guidance.';
  }
  if (score <= 25) {
    return 'Your self-esteem is in the lower range. Many people experience this, especially during challenging times. Working on self-compassion and challenging negative self-talk can help.';
  }
  if (score <= 30) {
    return 'Your self-esteem is in the normal range. You have a reasonable level of self-respect while still having room for growth and self-improvement.';
  }
  if (score <= 35) {
    return 'Your self-esteem is good. You have a healthy sense of self-worth and generally feel positive about yourself.';
  }
  return 'Your self-esteem is very high. You have a strong sense of self-worth and positive self-regard.';
}

export default function SelfEsteemScale() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    let score = 0;

    QUESTIONS.forEach((q) => {
      if (answers[q.id] !== undefined) {
        let value = answers[q.id];
        if (q.reverse) {
          value = 5 - value;
        }
        score += value;
      }
    });

    return {
      score,
      category: getCategory(score),
      interpretation: getInterpretation(score),
    };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  const categoryColors = {
    Low: { color: '#dc2626', lightColor: '#fee2e2' },
    Normal: { color: '#3b82f6', lightColor: '#dbeafe' },
    High: { color: '#16a34a', lightColor: '#dcfce7' },
  };

  if (showResults && results) {
    const colors = categoryColors[results.category];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">Your Self-Esteem Results</h2>
          <p className="text-text-secondary mt-2">Based on the Rosenberg Self-Esteem Scale (1965)</p>
        </div>

        {/* Gauge visualization */}
        <Card className="bg-white border-2" style={{ borderColor: colors.color }}>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-full h-64 flex items-center justify-center">
              <canvas
                ref={(el) => {
                  if (el) {
                    const ctx = el.getContext('2d');
                    el.width = 300;
                    el.height = 180;
                    drawGaugeChart(ctx, results.score);
                  }
                }}
                className="w-full"
              />
            </div>
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-text-primary">
                {results.score} / 40
              </div>
              <div className="text-lg font-bold mt-2" style={{ color: colors.color }}>
                {results.category}
              </div>
            </div>
          </div>
        </Card>

        {/* Interpretation */}
        <Card className="bg-white" style={{ backgroundColor: colors.lightColor, borderColor: colors.color, borderWidth: '2px' }}>
          <div className="space-y-3">
            <h3 className="font-bold text-text-primary text-lg">What This Means</h3>
            <p className="text-text-secondary">{results.interpretation}</p>
          </div>
        </Card>

        {/* Scale breakdown */}
        <Card className="bg-white">
          <div className="space-y-4">
            <h3 className="font-bold text-text-primary">Score Ranges</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#dc2626' }} />
                <div>
                  <div className="font-medium text-text-primary">10–25: Low Self-Esteem</div>
                  <div className="text-sm text-text-secondary">May benefit from professional support</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                <div>
                  <div className="font-medium text-text-primary">25–35: Normal Self-Esteem</div>
                  <div className="text-sm text-text-secondary">Healthy range with room for growth</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                <div>
                  <div className="font-medium text-text-primary">35–40: High Self-Esteem</div>
                  <div className="text-sm text-text-secondary">Strong sense of self-worth</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical tips */}
        <Card className="bg-white border-l-4" style={{ borderLeftColor: colors.color }}>
          <div className="space-y-3">
            <h3 className="font-bold text-text-primary">Ways to Support Your Self-Esteem</h3>
            <ul className="space-y-2">
              <li className="flex gap-3 text-text-secondary text-sm">
                <span className="font-bold" style={{ color: colors.color }}>→</span>
                <span>Practice self-compassion: treat yourself as you would a good friend</span>
              </li>
              <li className="flex gap-3 text-text-secondary text-sm">
                <span className="font-bold" style={{ color: colors.color }}>→</span>
                <span>Challenge negative self-talk and replace it with realistic, kind statements</span>
              </li>
              <li className="flex gap-3 text-text-secondary text-sm">
                <span className="font-bold" style={{ color: colors.color }}>→</span>
                <span>Set achievable goals and celebrate small wins</span>
              </li>
              <li className="flex gap-3 text-text-secondary text-sm">
                <span className="font-bold" style={{ color: colors.color }}>→</span>
                <span>Surround yourself with supportive people</span>
              </li>
              <li className="flex gap-3 text-text-secondary text-sm">
                <span className="font-bold" style={{ color: colors.color }}>→</span>
                <span>Engage in activities that make you feel competent</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Important disclaimer */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-[var(--radius-card)] p-4">
          <p className="text-sm text-text-secondary">
            <strong>⚠️ Important Disclaimer:</strong> This tool is for self-reflection only, not a clinical assessment. If you\'re struggling with self-esteem, depression, anxiety, or other mental health concerns, please reach out to a qualified mental health professional, counsellor, or therapist who can provide personalized support.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => downloadResultCard(results.score, results.category)}
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

        <p className="text-xs text-text-muted text-center">
          Citation: Rosenberg, M. (1965). Society and the Adolescent Self-Image. Princeton University Press.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)} bg-surface p-6">
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
        <div className="space-y-6">
          <p className="text-lg text-text-primary font-medium">{question.text}</p>

          {/* Response options */}
          <div className="flex flex-col gap-3">
            {[
              { value: 1, label: 'Strongly Disagree' },
              { value: 2, label: 'Disagree' },
              { value: 3, label: 'Agree' },
              { value: 4, label: 'Strongly Agree' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => {
                  setAnswers({ ...answers, [question.id]: value });
                }}
                className={`text-left p-4 rounded-[var(--radius-input)] border-2 transition-all ${
                  answers[question.id] === value
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-border hover:border-accent'
                }`}
              >
                <div className="font-medium text-text-primary">{label}</div>
              </button>
            ))}
          </div>

          {answers[question.id] && (
            <p className="text-xs text-text-muted text-center">
              You selected: {['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'][answers[question.id] - 1]}
              {question.reverse && ' (reverse scored)'}
            </p>
          )}
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
