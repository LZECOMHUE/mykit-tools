'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    scenario: 'When you\'re feeling stressed or upset, what means most to you?',
    optionA: { text: 'Your partner listens and validates your feelings', language: 'words' },
    optionB: { text: 'Your partner helps you solve the problem or handles tasks', language: 'service' },
  },
  {
    id: 2,
    scenario: 'What makes you feel most loved in your relationship?',
    optionA: { text: 'Hearing compliments and affirmations', language: 'words' },
    optionB: { text: 'Your partner surprises you with small gifts', language: 'gifts' },
  },
  {
    id: 3,
    scenario: 'You\'ve had a difficult day. What would comfort you most?',
    optionA: { text: 'An uninterrupted evening doing something together', language: 'time' },
    optionB: { text: 'Your partner doing something thoughtful like cooking dinner', language: 'service' },
  },
  {
    id: 4,
    scenario: 'How do you prefer to show love to your partner?',
    optionA: { text: 'Through kind words and appreciation', language: 'words' },
    optionB: { text: 'By doing things that make their life easier', language: 'service' },
  },
  {
    id: 5,
    scenario: 'What gesture would make you feel most valued?',
    optionA: { text: 'Your partner remembering details about your interests', language: 'time' },
    optionB: { text: 'A thoughtful gift that shows they know you', language: 'gifts' },
  },
  {
    id: 6,
    scenario: 'In a relationship, what\'s most important to you?',
    optionA: { text: 'Physical affection and touch', language: 'touch' },
    optionB: { text: 'Dedicated quality time together', language: 'time' },
  },
  {
    id: 7,
    scenario: 'How do you feel most connected to your partner?',
    optionA: { text: 'Through conversations and emotional sharing', language: 'words' },
    optionB: { text: 'Through physical closeness and holding', language: 'touch' },
  },
  {
    id: 8,
    scenario: 'What\'s a turn-off in a relationship?',
    optionA: { text: 'Feeling neglected or not having quality time', language: 'time' },
    optionB: { text: 'Your partner being critical or harsh in words', language: 'words' },
  },
  {
    id: 9,
    scenario: 'After you achieve something, you most want to:',
    optionA: { text: 'Share the moment with your partner (quality time)', language: 'time' },
    optionB: { text: 'Receive words of praise and recognition', language: 'words' },
  },
  {
    id: 10,
    scenario: 'What romantic gesture means the most to you?',
    optionA: { text: 'A meaningful gift chosen just for you', language: 'gifts' },
    optionB: { text: 'Your partner making time for a special date', language: 'time' },
  },
  {
    id: 11,
    scenario: 'You feel most appreciated when:',
    optionA: { text: 'Your partner gives you a hug or holds your hand', language: 'touch' },
    optionB: { text: 'Your partner helps with something without being asked', language: 'service' },
  },
  {
    id: 12,
    scenario: 'What would strengthen your connection?',
    optionA: { text: 'More physical affection and closeness', language: 'touch' },
    optionB: { text: 'Meaningful conversations without distractions', language: 'time' },
  },
  {
    id: 13,
    scenario: 'You feel unloved when:',
    optionA: { text: 'You don\'t receive words of affirmation', language: 'words' },
    optionB: { text: 'Your partner doesn\'t help you with responsibilities', language: 'service' },
  },
  {
    id: 14,
    scenario: 'Your ideal date night involves:',
    optionA: { text: 'Focused attention on each other', language: 'time' },
    optionB: { text: 'Giving each other gifts or thoughtful surprises', language: 'gifts' },
  },
  {
    id: 15,
    scenario: 'In conflict, what\'s most important to resolve?',
    optionA: { text: 'You want reassuring words and understanding', language: 'words' },
    optionB: { text: 'You want your partner to take action to fix things', language: 'service' },
  },
  {
    id: 16,
    scenario: 'How do you celebrate milestones with your partner?',
    optionA: { text: 'With thoughtful gifts and tokens', language: 'gifts' },
    optionB: { text: 'With quality time and presence', language: 'time' },
  },
  {
    id: 17,
    scenario: 'You feel emotionally closest when:',
    optionA: { text: 'You\'re physically touching and cuddling', language: 'touch' },
    optionB: { text: 'You\'re having a deep, meaningful conversation', language: 'words' },
  },
  {
    id: 18,
    scenario: 'What would improve your relationship most?',
    optionA: { text: 'More help from your partner with daily tasks', language: 'service' },
    optionB: { text: 'More verbal appreciation and encouragement', language: 'words' },
  },
  {
    id: 19,
    scenario: 'You miss your partner most when:',
    optionA: { text: 'You can\'t spend quality time together', language: 'time' },
    optionB: { text: 'You don\'t feel their physical affection', language: 'touch' },
  },
  {
    id: 20,
    scenario: 'In daily life, what keeps the spark alive?',
    optionA: { text: 'Little surprises and thoughtful gestures', language: 'gifts' },
    optionB: { text: 'Sincere words of love and appreciation', language: 'words' },
  },
  {
    id: 21,
    scenario: 'You feel most supported when your partner:',
    optionA: { text: 'Takes care of things to reduce your stress', language: 'service' },
    optionB: { text: 'Listens and offers emotional support', language: 'words' },
  },
  {
    id: 22,
    scenario: 'Physical intimacy in a relationship is:',
    optionA: { text: 'Very important for feeling loved', language: 'touch' },
    optionB: { text: 'One important aspect among many', language: 'time' },
  },
  {
    id: 23,
    scenario: 'What\'s the best apology for you?',
    optionA: { text: 'Words of remorse and reassurance', language: 'words' },
    optionB: { text: 'Actions showing they\'ve changed', language: 'service' },
  },
  {
    id: 24,
    scenario: 'You show love through:',
    optionA: { text: 'Giving gifts and thoughtful surprises', language: 'gifts' },
    optionB: { text: 'Spending undivided time and attention', language: 'time' },
  },
  {
    id: 25,
    scenario: 'Your relationship feels strongest when:',
    optionA: { text: 'There\'s lots of physical affection', language: 'touch' },
    optionB: { text: 'You both regularly express appreciation', language: 'words' },
  },
];

const LANGUAGES = {
  words: {
    name: 'Words of Affirmation',
    emoji: '💬',
    color: '#3b82f6',
    lightColor: '#dbeafe',
    description: 'You feel loved when your partner says kind things, gives compliments, and expresses appreciation verbally.',
    tips: [
      'Express gratitude regularly',
      'Give specific, genuine compliments',
      'Use words of encouragement',
      'Listen actively when your partner speaks',
      'Avoid criticism or harsh words',
    ],
  },
  service: {
    name: 'Acts of Service',
    emoji: '🤝',
    color: '#10b981',
    lightColor: '#d1fae5',
    description: 'You feel loved when your partner does helpful things, reduces your stress, and takes care of responsibilities.',
    tips: [
      'Help without being asked',
      'Offer practical support during difficult times',
      'Take on tasks your partner dislikes',
      'Be reliable and follow through',
      'Anticipate needs and address them',
    ],
  },
  gifts: {
    name: 'Receiving Gifts',
    emoji: '🎁',
    color: '#f59e0b',
    lightColor: '#fef3c7',
    description: 'You feel loved when your partner gives thoughtful gifts that show they know and understand you.',
    tips: [
      'Give gifts that reflect their interests',
      'Remember special dates and occasions',
      'Give small gifts throughout the year',
      'Make gifts about thoughtfulness, not expense',
      'Present gifts with genuine care',
    ],
  },
  time: {
    name: 'Quality Time',
    emoji: '⏰',
    color: '#8b5cf6',
    lightColor: '#ede9fe',
    description: 'You feel loved when your partner gives you undivided attention and you spend meaningful time together.',
    tips: [
      'Put away phones and distractions',
      'Have meaningful conversations',
      'Plan date nights or special outings',
      'Be fully present when you\'re together',
      'Remember and discuss details from conversations',
    ],
  },
  touch: {
    name: 'Physical Touch',
    emoji: '🤲',
    color: '#ec4899',
    lightColor: '#fbcfe8',
    description: 'You feel loved through physical affection, holding hands, hugs, and intimate touch.',
    tips: [
      'Offer hugs and hand-holding',
      'Show affection regularly',
      'Be respectful of boundaries',
      'Use non-sexual touch to show care',
      'Initiate physical connection',
    ],
  },
};

function downloadResultCard(languages) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // Gradient background (pink to purple)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#f472b6');
  gradient.addColorStop(1, '#a855f7');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px Fraunces';
  ctx.textAlign = 'center';
  ctx.fillText('My Love Languages', canvas.width / 2, 60);

  // Top language
  const topLang = languages[0];
  const langInfo = LANGUAGES[topLang];
  ctx.font = 'bold 28px DM Sans';
  ctx.fillText(`${langInfo.emoji} ${langInfo.name}`, canvas.width / 2, 130);

  // Description
  ctx.fillStyle = '#1a1a1a';
  ctx.font = '16px DM Sans';
  ctx.textAlign = 'left';
  const descLines = [langInfo.description];
  let y = 180;
  descLines.forEach((line) => {
    ctx.fillText(line, 40, y);
    y += 25;
  });

  // All languages ranked
  y = 270;
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 16px DM Sans';
  ctx.fillText('Your Love Language Ranking:', 40, y);

  y += 40;
  languages.forEach((lang, idx) => {
    const info = LANGUAGES[lang];
    ctx.font = '14px DM Sans';
    ctx.fillText(`${idx + 1}. ${info.emoji} ${info.name}`, 60, y);
    y += 30;
  });

  // Tip section
  y = 650;
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 14px DM Sans';
  ctx.fillText('Pro Tip:', 40, y);
  y += 25;
  ctx.font = '12px DM Sans';
  ctx.fillStyle = '#525252';
  const tip = 'Share your top love languages with your partner and ask about theirs. Understanding each other\'s preferences strengthens your connection.';
  const tipLines = [];
  let currentLine = '';
  tip.split(' ').forEach((word) => {
    if (ctx.measureText(currentLine + word).width > 650) {
      tipLines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += (currentLine ? ' ' : '') + word;
    }
  });
  tipLines.push(currentLine);
  tipLines.forEach((line) => {
    ctx.fillText(line, 40, y);
    y += 18;
  });

  // Watermark
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '14px DM Sans';
  ctx.textAlign = 'right';
  ctx.fillText('mykit.tools', canvas.width - 40, canvas.height - 20);

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'love-languages-results.png';
  link.click();
}

export default function LoveLanguageQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const scores = {
      words: 0,
      service: 0,
      gifts: 0,
      time: 0,
      touch: 0,
    };

    Object.entries(answers).forEach(([qId, choiceKey]) => {
      const question = QUESTIONS.find((q) => q.id === parseInt(qId));
      if (question) {
        const language = choiceKey === 'A' ? question.optionA.language : question.optionB.language;
        scores[language] += 1;
      }
    });

    const ranked = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([lang]) => lang);

    return { scores, ranked };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">Your Love Languages</h2>
          <p className="text-text-secondary mt-2">Inspired by the concept of love languages for relationship communication</p>
        </div>

        {/* Top language highlight */}
        <Card className="border-2" style={{ borderColor: LANGUAGES[results.ranked[0]].color, backgroundColor: LANGUAGES[results.ranked[0]].lightColor }}>
          <div className="text-center space-y-3">
            <div className="text-5xl">{LANGUAGES[results.ranked[0]].emoji}</div>
            <h3 className="text-2xl font-bold text-text-primary">{LANGUAGES[results.ranked[0]].name}</h3>
            <p className="text-text-secondary">{LANGUAGES[results.ranked[0]].description}</p>
          </div>
        </Card>

        {/* Ranked languages */}
        <div className="space-y-3">
          <h3 className="font-bold text-text-primary">Your Rankings</h3>
          {results.ranked.map((lang, idx) => {
            const info = LANGUAGES[lang];
            const score = results.scores[lang];
            return (
              <Card key={lang} className="bg-white">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{info.emoji}</span>
                      <div>
                        <div className="font-bold text-text-primary">
                          {idx + 1}. {info.name}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-accent text-lg">{score}/{QUESTIONS.length}</span>
                  </div>
                  <div className="bg-surface rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${(score / QUESTIONS.length) * 100}%`,
                        backgroundColor: info.color,
                      }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tips for top 3 */}
        <div className="space-y-3">
          <h3 className="font-bold text-text-primary">Tips for Your Top Languages</h3>
          {results.ranked.slice(0, 3).map((lang) => {
            const info = LANGUAGES[lang];
            return (
              <Card key={lang} className="bg-white border-l-4" style={{ borderLeftColor: info.color }}>
                <div className="space-y-3">
                  <h4 className="font-bold text-text-primary">{info.emoji} {info.name}</h4>
                  <ul className="space-y-2">
                    {info.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3 text-text-secondary">
                        <span className="font-bold" style={{ color: info.color }}>✓</span>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Partnership tip */}
        <div className="bg-purple-50 border border-accent rounded-[var(--radius-card)] p-4">
          <p className="text-sm text-text-secondary">
            <strong>💜 Share with Your Partner:</strong> Ask your partner to take this quiz too! Understanding each other's love languages creates stronger emotional bonds and helps you show love in ways that truly resonate.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => downloadResultCard(results.ranked)}
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
        <div className="space-y-4">
          <p className="text-lg text-text-primary font-medium">{question.scenario}</p>

          {/* Options */}
          <div className="space-y-3">
            {[
              { key: 'A', option: question.optionA },
              { key: 'B', option: question.optionB },
            ].map(({ key, option }) => (
              <button
                key={key}
                onClick={() => setAnswers({ ...answers, [question.id]: key })}
                className={`w-full text-left p-4 rounded-[var(--radius-input)] border-2 transition-all ${
                  answers[question.id] === key
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-border hover:border-accent'
                }`}
              >
                <div className="text-text-primary">{option.text}</div>
              </button>
            ))}
          </div>
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
