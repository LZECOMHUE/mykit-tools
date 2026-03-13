'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Almost never', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Fairly often', score: 3 },
      { text: 'Very often', score: 4 },
    ],
  },
  {
    id: 2,
    text: 'In the last month, how often have you felt unable to control the important things in your life?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Almost never', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Fairly often', score: 3 },
      { text: 'Very often', score: 4 },
    ],
  },
  {
    id: 3,
    text: 'In the last month, how often have you felt nervous and stressed?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Almost never', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Fairly often', score: 3 },
      { text: 'Very often', score: 4 },
    ],
  },
  {
    id: 4,
    text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
    options: [
      { text: 'Very often', score: 0 },
      { text: 'Fairly often', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Almost never', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 5,
    text: 'In the last month, how often have you felt that things were going your way?',
    options: [
      { text: 'Very often', score: 0 },
      { text: 'Fairly often', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Almost never', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 6,
    text: 'In the last month, how often have you found that you could not cope with all the things you had to do?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Almost never', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Fairly often', score: 3 },
      { text: 'Very often', score: 4 },
    ],
  },
  {
    id: 7,
    text: 'In the last month, how often have you been able to control irritations in your life?',
    options: [
      { text: 'Very often', score: 0 },
      { text: 'Fairly often', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Almost never', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 8,
    text: 'In the last month, how often have you felt that you were on top of things?',
    options: [
      { text: 'Very often', score: 0 },
      { text: 'Fairly often', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Almost never', score: 3 },
      { text: 'Never', score: 4 },
    ],
  },
  {
    id: 9,
    text: 'In the last month, how often have you been angered because of things outside your control?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Almost never', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Fairly often', score: 3 },
      { text: 'Very often', score: 4 },
    ],
  },
  {
    id: 10,
    text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Almost never', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Fairly often', score: 3 },
      { text: 'Very often', score: 4 },
    ],
  },
];

const STRESS_LEVELS = {
  low: {
    name: 'Low Stress (0-13)',
    emoji: '😌',
    color: '#16a34a',
    lightColor: '#dcfce7',
    description: 'You are managing stress well. You feel in control of your life and can handle challenges as they arise.',
    interpretation: 'Your stress levels are within a healthy range. You are coping effectively with life demands.',
    tips: [
      'Maintain your current coping strategies',
      'Continue regular exercise and healthy habits',
      'Keep up social connections',
      'Practice your stress-relief activities regularly',
      'Help others who may be struggling with stress',
    ],
    warningSigns: [],
  },
  moderate: {
    name: 'Moderate Stress (14-26)',
    emoji: '😟',
    color: '#f97316',
    lightColor: '#ffedd5',
    description: 'You are experiencing some stress, which is normal. You may feel occasional overwhelm but can generally manage.',
    interpretation: 'Your stress level is moderate. It\'s a good time to implement stress-management strategies before it increases.',
    tips: [
      'Identify your main stress sources',
      'Break large tasks into smaller, manageable steps',
      'Establish a regular exercise routine',
      'Practice relaxation techniques (meditation, deep breathing)',
      'Ensure adequate sleep (7-9 hours)',
      'Limit caffeine and maintain a balanced diet',
      'Set realistic goals and boundaries',
      'Talk to friends or family about concerns',
    ],
    warningSigns: [
      'Increasing difficulty concentrating',
      'Changes in sleep patterns',
      'Muscle tension or headaches',
      'Irritability or mood changes',
    ],
  },
  high: {
    name: 'High Stress (27-40)',
    emoji: '😰',
    color: '#dc2626',
    lightColor: '#fee2e2',
    description: 'You are experiencing high levels of stress. You may feel overwhelmed and find it difficult to manage daily responsibilities.',
    interpretation: 'Your stress level is concerning. It\'s important to take action to reduce stress and consider professional support.',
    tips: [
      'Prioritize your immediate needs and delegate when possible',
      'Schedule regular physical activity (at least 30 minutes daily)',
      'Practice mindfulness or meditation daily',
      'Consider professional support (therapist, counselor)',
      'Establish clear work-life boundaries',
      'Practice deep breathing exercises regularly',
      'Ensure adequate sleep and nutrition',
      'Reduce caffeine and alcohol intake',
      'Speak with your doctor about your stress levels',
      'Join a support group or community',
    ],
    warningSigns: [
      'Persistent anxiety or worry',
      'Significant changes in appetite or sleep',
      'Physical symptoms (chest pain, high blood pressure)',
      'Difficulty focusing or making decisions',
      'Withdrawal from activities or people',
      'Increased substance use',
      'Feelings of hopelessness',
    ],
  },
};

export default function StressLevelAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);

    let level;
    if (totalScore <= 13) level = 'low';
    else if (totalScore <= 26) level = 'moderate';
    else level = 'high';

    return { totalScore, level };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const levelInfo = STRESS_LEVELS[results.level];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your Stress Assessment</h2>
          <p className="mt-2 text-text-secondary">Based on the Perceived Stress Scale (PSS-10)</p>
        </div>

        <div className="rounded-[var(--radius-card)] border-2 border-warning bg-warning bg-opacity-5 p-4">
          <p className="text-sm text-text-secondary">
            <strong>Important:</strong> This tool is for educational purposes only and is not a clinical assessment. If you are experiencing significant stress, anxiety, or depression, please consult with a healthcare professional.
          </p>
        </div>

        <Card className="border-2" style={{ borderColor: levelInfo.color, backgroundColor: levelInfo.lightColor }}>
          <div className="space-y-4 text-center">
            <div className="text-6xl">{levelInfo.emoji}</div>
            <h3 className="font-heading text-3xl font-bold text-text-primary">{levelInfo.name}</h3>
            <div className="font-mono text-xl font-bold text-accent">Score: {results.totalScore}/40</div>
            <p className="text-lg text-text-secondary">{levelInfo.description}</p>
            <p className="text-text-secondary">{levelInfo.interpretation}</p>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Recommendations for Your Level</h4>
            <ul className="space-y-2">
              {levelInfo.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {levelInfo.warningSigns.length > 0 && (
          <Card className="border-l-4 bg-white" style={{ borderLeftColor: levelInfo.color }}>
            <div className="space-y-4">
              <h4 className="font-heading text-lg font-bold text-text-primary">Warning Signs to Watch For</h4>
              <ul className="space-y-2">
                {levelInfo.warningSigns.map((sign, idx) => (
                  <li key={idx} className="flex gap-3 text-text-secondary">
                    <span className="text-warning font-bold">⚠</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text-secondary pt-2">
                If you experience any of these signs, consider reaching out to a mental health professional.
              </p>
            </div>
          </Card>
        )}

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">When to Seek Professional Help</h4>
            <ul className="space-y-2">
              <li className="flex gap-3 text-text-secondary">
                <span className="text-accent font-bold">•</span>
                <span>You are consistently scoring in the high range</span>
              </li>
              <li className="flex gap-3 text-text-secondary">
                <span className="text-accent font-bold">•</span>
                <span>Stress is affecting your daily functioning or relationships</span>
              </li>
              <li className="flex gap-3 text-text-secondary">
                <span className="text-accent font-bold">•</span>
                <span>You are having thoughts of self-harm</span>
              </li>
              <li className="flex gap-3 text-text-secondary">
                <span className="text-accent font-bold">•</span>
                <span>Stress management techniques are not helping</span>
              </li>
              <li className="flex gap-3 text-text-secondary">
                <span className="text-accent font-bold">•</span>
                <span>You feel hopeless or persistently depressed</span>
              </li>
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
            Retake Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      <div className="rounded-[var(--radius-card)] border-2 border-info bg-info bg-opacity-5 p-4">
        <p className="text-sm text-text-secondary">
          This assessment is based on the Perceived Stress Scale (PSS-10), a validated measure of stress. Answer honestly about the last month.
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
