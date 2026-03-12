'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const SCENARIOS = [
  {
    id: 1,
    scenario: 'A colleague takes credit for your idea in a meeting. You...',
    options: [
      { text: 'Say nothing', style: 'passive' },
      { text: 'Confront them angrily in front of everyone', style: 'aggressive' },
      { text: 'Make sarcastic comments later to mutual friends', style: 'passive-aggressive' },
      { text: 'Calmly address it with them privately after the meeting', style: 'assertive' },
    ],
  },
  {
    id: 2,
    scenario: 'Your friend cancels plans last minute — again. You...',
    options: [
      { text: 'Say "it\'s fine" when it\'s not', style: 'passive' },
      { text: 'Tell them they\'re selfish and unreliable', style: 'aggressive' },
      { text: 'Post a vague complaint on social media', style: 'passive-aggressive' },
      { text: 'Tell them honestly how it makes you feel and set a boundary', style: 'assertive' },
    ],
  },
  {
    id: 3,
    scenario: 'Your partner makes a decision without consulting you. You...',
    options: [
      { text: 'Go along with it silently, feeling frustrated', style: 'passive' },
      { text: 'Blow up at them and demand they explain themselves', style: 'aggressive' },
      { text: 'Give them the silent treatment for days', style: 'passive-aggressive' },
      { text: 'Explain calmly why you\'d like to be involved in future decisions', style: 'assertive' },
    ],
  },
  {
    id: 4,
    scenario: 'You disagree with your boss\'s approach. You...',
    options: [
      { text: 'Keep quiet and go along with it', style: 'passive' },
      { text: 'Tell them they\'re wrong and question their competence', style: 'aggressive' },
      { text: 'Complain to colleagues but never mention it to them', style: 'passive-aggressive' },
      { text: 'Share your perspective respectfully, asking for their reasoning', style: 'assertive' },
    ],
  },
  {
    id: 5,
    scenario: 'Someone cuts in front of you in a queue. You...',
    options: [
      { text: 'Do nothing, seethe quietly to yourself', style: 'passive' },
      { text: 'Loudly call them out and demand they move', style: 'aggressive' },
      { text: 'Mutter passive-aggressive comments loud enough for them to hear', style: 'passive-aggressive' },
      { text: 'Politely point out the queue and ask them to rejoin it', style: 'assertive' },
    ],
  },
  {
    id: 6,
    scenario: 'A friend asks you to do something you don\'t have time for. You...',
    options: [
      { text: 'Say yes and feel resentful', style: 'passive' },
      { text: 'Say "absolutely not" bluntly without explanation', style: 'aggressive' },
      { text: 'Agree then "forget" to do it', style: 'passive-aggressive' },
      { text: 'Explain you can\'t but suggest an alternative you could help with', style: 'assertive' },
    ],
  },
  {
    id: 7,
    scenario: 'Your partner criticises your cooking. You...',
    options: [
      { text: 'Apologise and feel hurt, say nothing else', style: 'passive' },
      { text: 'Criticise them back or tell them they\'re ungrateful', style: 'aggressive' },
      { text: 'Stop cooking for them without explanation', style: 'passive-aggressive' },
      { text: 'Ask what specifically they\'d prefer and have a conversation', style: 'assertive' },
    ],
  },
  {
    id: 8,
    scenario: 'You receive poor service at a restaurant. You...',
    options: [
      { text: 'Don\'t say anything and leave a bad review later', style: 'passive' },
      { text: 'Demand to speak to the manager and complain loudly', style: 'aggressive' },
      { text: 'Leave a scathing review without mentioning it to the restaurant', style: 'passive-aggressive' },
      { text: 'Politely flag the issue to your server and ask how it can be fixed', style: 'assertive' },
    ],
  },
  {
    id: 9,
    scenario: 'Your team member isn\'t pulling their weight on a project. You...',
    options: [
      { text: 'Do their work for them without mentioning it', style: 'passive' },
      { text: 'Publicly call them out for not working hard enough', style: 'aggressive' },
      { text: 'Mention it to others but never talk to them directly', style: 'passive-aggressive' },
      { text: 'Have a private conversation about your concerns and expectations', style: 'assertive' },
    ],
  },
  {
    id: 10,
    scenario: 'Someone interrupts you repeatedly during a conversation. You...',
    options: [
      { text: 'Stop talking and let them dominate', style: 'passive' },
      { text: 'Cut them off aggressively and tell them to listen', style: 'aggressive' },
      { text: 'Wait until later to make cutting remarks about their rudeness', style: 'passive-aggressive' },
      { text: 'Politely say "I\'d like to finish my thought" and continue', style: 'assertive' },
    ],
  },
  {
    id: 11,
    scenario: 'A family member brings up a sensitive topic you\'d rather not discuss. You...',
    options: [
      { text: 'Change the subject or leave the room', style: 'passive' },
      { text: 'Snap at them or tell them to mind their own business', style: 'aggressive' },
      { text: 'Agree to talk but sabotage the conversation', style: 'passive-aggressive' },
      { text: 'Kindly explain your boundary and suggest a better time', style: 'assertive' },
    ],
  },
  {
    id: 12,
    scenario: 'You need to return something because it\'s faulty. You...',
    options: [
      { text: 'Accept it as your fault and keep the faulty item', style: 'passive' },
      { text: 'Angrily demand a refund and criticise the product', style: 'aggressive' },
      { text: 'Complain online but don\'t return it properly', style: 'passive-aggressive' },
      { text: 'Explain the issue calmly and ask about return options', style: 'assertive' },
    ],
  },
  {
    id: 13,
    scenario: 'Someone gossips about you. You...',
    options: [
      { text: 'Say nothing and let it affect how you feel', style: 'passive' },
      { text: 'Confront them aggressively about spreading lies', style: 'aggressive' },
      { text: 'Gossip about them in return', style: 'passive-aggressive' },
      { text: 'Ask them directly what they said and why', style: 'assertive' },
    ],
  },
  {
    id: 14,
    scenario: 'You\'re asked to do extra work on top of your current load. You...',
    options: [
      { text: 'Say yes even though you\'re already overwhelmed', style: 'passive' },
      { text: 'Refuse sharply and complain about the request', style: 'aggressive' },
      { text: 'Agree but let quality slip or miss deadlines', style: 'passive-aggressive' },
      { text: 'Explain your current workload and discuss priorities', style: 'assertive' },
    ],
  },
  {
    id: 15,
    scenario: 'Your partner forgets your birthday. You...',
    options: [
      { text: 'Act like it\'s fine but feel deeply hurt', style: 'passive' },
      { text: 'Tell them how selfish and inconsiderate they are', style: 'aggressive' },
      { text: 'Don\'t mention it but punish them with coldness', style: 'passive-aggressive' },
      { text: 'Calmly tell them how this made you feel and why it matters', style: 'assertive' },
    ],
  },
  {
    id: 16,
    scenario: 'Someone makes an offensive joke about a group you belong to. You...',
    options: [
      { text: 'Laugh along even though you\'re uncomfortable', style: 'passive' },
      { text: 'Tell them they\'re a terrible person and shame them', style: 'aggressive' },
      { text: 'Roll your eyes and make a cutting remark later', style: 'passive-aggressive' },
      { text: 'Let them know the joke isn\'t okay and why', style: 'assertive' },
    ],
  },
];

const COMMUNICATION_STYLES = {
  passive: {
    name: 'Passive',
    emoji: '🤐',
    description: 'You tend to avoid conflict and keep your feelings to yourself. While this preserves peace in the moment, it often leads to resentment and leaves your needs unmet.',
    gradient: 'from-slate-400 to-slate-600',
    strengths: [
      'Good listener and empathetic',
      'Rarely creates conflict',
      'Others see you as accommodating',
    ],
    growthAreas: [
      'Building confidence to express your needs',
      'Learning that your feelings matter',
      'Setting and maintaining healthy boundaries',
    ],
    tips: 'Practice saying "no" in low-stakes situations. Remember: your needs are as valid as anyone else\'s. Start small: "I\'d prefer..." or "I\'m not comfortable with..."',
  },
  aggressive: {
    name: 'Aggressive',
    emoji: '🔥',
    description: 'You tend to prioritise your needs over others\' feelings. While you\'re direct, this can damage relationships and make people defensive rather than open to dialogue.',
    gradient: 'from-red-400 to-red-600',
    strengths: [
      'You advocate for yourself',
      'People know where they stand with you',
      'You don\'t tolerate disrespect',
    ],
    growthAreas: [
      'Listening without interrupting',
      'Considering others\' perspectives',
      'Expressing needs without attacking',
    ],
    tips: 'Try to pause before responding. Ask yourself: "How would I feel if someone spoke to me this way?" Start with "I feel..." instead of "You always..."',
  },
  'passive-aggressive': {
    name: 'Passive-Aggressive',
    emoji: '😒',
    description: 'You express frustration indirectly through sarcasm, cold shoulders, or subtle jabs. This creates confusion and tension because your real message isn\'t clear.',
    gradient: 'from-amber-400 to-amber-600',
    strengths: [
      'You avoid outright confrontation',
      'You\'re creative with your words',
      'You sense when things are wrong',
    ],
    growthAreas: [
      'Expressing feelings directly and calmly',
      'Having honest conversations',
      'Letting go of resentment',
    ],
    tips: 'Notice when you\'re being sarcastic or cold. That\'s your signal to have a real conversation instead. Say what you actually mean, kindly but clearly.',
  },
  assertive: {
    name: 'Assertive',
    emoji: '✨',
    description: 'You express your needs clearly and respectfully while considering others\' feelings. This builds trust, respect, and healthy relationships where everyone\'s needs can be heard.',
    gradient: 'from-green-400 to-emerald-600',
    strengths: [
      'Clear and honest communication',
      'Respect for yourself and others',
      'Healthy, sustainable relationships',
    ],
    growthAreas: [
      'Maintaining consistency under stress',
      'Balancing firmness with compassion',
      'Handling others\' negative reactions with poise',
    ],
    tips: 'You\'re on the right track! Keep practicing these skills, especially when emotions run high. Your clarity helps everyone involved.',
  },
};

function getStyleScores(answers) {
  const scores = {
    passive: 0,
    aggressive: 0,
    'passive-aggressive': 0,
    assertive: 0,
  };

  answers.forEach((answer) => {
    scores[answer]++;
  });

  return scores;
}

function getPrimaryStyle(scores) {
  let maxScore = 0;
  let primaryStyle = 'assertive';

  Object.entries(scores).forEach(([style, score]) => {
    if (score > maxScore) {
      maxScore = score;
      primaryStyle = style;
    }
  });

  return primaryStyle;
}

function downloadResultCard(primaryStyle, scores) {
  const style = COMMUNICATION_STYLES[primaryStyle];
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradientPairs = {
    'from-slate-400 to-slate-600': ['#78716c', '#57534e'],
    'from-red-400 to-red-600': ['#f87171', '#dc2626'],
    'from-amber-400 to-amber-600': ['#fbbf24', '#d97706'],
    'from-green-400 to-emerald-600': ['#4ade80', '#059669'],
  };

  const [start, end] = gradientPairs[style.gradient] || ['#000000', '#ffffff'];
  const gradient = ctx.createLinearGradient(0, 0, 0, 1000);
  gradient.addColorStop(0, start);
  gradient.addColorStop(1, end);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 1000);

  // White card container
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(40, 80, 720, 800);

  // Emoji
  ctx.font = 'bold 100px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'center';
  ctx.fillText(style.emoji, 400, 210);

  // Style Name
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'center';
  ctx.fillText(style.name, 400, 300);

  // Subtitle
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#525252';
  ctx.textAlign = 'center';
  ctx.fillText('Communication Style', 400, 345);

  // Strengths header
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'left';
  ctx.fillText('Key Strengths:', 80, 410);

  // Strengths list
  ctx.font = 'normal 14px Arial';
  ctx.fillStyle = '#525252';
  let y = 440;
  style.strengths.forEach((strength) => {
    ctx.fillText('• ' + strength, 100, y);
    y += 30;
  });

  // Watermark
  ctx.font = '14px Arial';
  ctx.fillStyle = '#a3a3a3';
  ctx.textAlign = 'center';
  ctx.fillText('mykit.tools', 400, 920);

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'communication-style-results.png';
    a.click();
    URL.revokeObjectURL(url);
  });
}

export default function CommunicationStyleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const scores = getStyleScores(answers);
  const primaryStyle = getPrimaryStyle(scores);
  const styleData = COMMUNICATION_STYLES[primaryStyle];

  const handleAnswer = (style) => {
    const newAnswers = [...answers, style];
    setAnswers(newAnswers);

    if (currentQuestion < SCENARIOS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
  };

  const progress = ((currentQuestion + 1) / SCENARIOS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {!isComplete ? (
        <Card className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">
                Scenario {currentQuestion + 1} of {SCENARIOS.length}
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

          {/* Scenario */}
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-8">
            {SCENARIOS[currentQuestion].scenario}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {SCENARIOS[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.style)}
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
            <div className="text-7xl mb-4">{styleData.emoji}</div>
            <h2 className="text-4xl font-heading font-bold text-text-primary mb-2">
              {styleData.name}
            </h2>
            <p className="text-text-secondary">Communication Style</p>
          </div>

          {/* Description */}
          <div className="bg-surface rounded-lg p-6 mb-8">
            <p className="text-text-secondary leading-relaxed text-lg">
              {styleData.description}
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {Object.entries(scores).map(([style, score]) => (
              <div key={style} className="bg-surface rounded-lg p-4 text-center">
                <p className="text-text-muted text-sm capitalize mb-2">{style}</p>
                <p className="text-3xl font-mono text-accent font-bold">{score}</p>
              </div>
            ))}
          </div>

          {/* Strengths */}
          <div className="mb-8">
            <h3 className="text-xl font-heading font-bold text-text-primary mb-4">
              Your Strengths
            </h3>
            <ul className="space-y-2">
              {styleData.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-text-secondary">
                  <span className="text-accent mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Growth Areas */}
          <div className="mb-8">
            <h3 className="text-xl font-heading font-bold text-text-primary mb-4">
              Growth Areas
            </h3>
            <ul className="space-y-2">
              {styleData.growthAreas.map((area, index) => (
                <li key={index} className="flex items-start gap-3 text-text-secondary">
                  <span className="text-amber-500 mt-1">→</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Practical Tip</h3>
            <p className="text-blue-800">{styleData.tips}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => downloadResultCard(primaryStyle, scores)}
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
