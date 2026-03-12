'use client';

import { useState, useMemo, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  // Openness
  { id: 1, trait: 'O', text: 'I have a vivid imagination', reverse: false },
  { id: 2, trait: 'O', text: 'I enjoy hearing new ideas', reverse: false },
  { id: 3, trait: 'O', text: 'I am full of ideas', reverse: false },
  { id: 4, trait: 'O', text: 'I enjoy thinking about abstract concepts', reverse: false },
  { id: 5, trait: 'O', text: 'I prefer variety to routine', reverse: false },
  { id: 6, trait: 'O', text: 'I have difficulty understanding abstract ideas', reverse: true },
  { id: 7, trait: 'O', text: 'I am not interested in theoretical discussions', reverse: true },
  { id: 8, trait: 'O', text: 'I do not enjoy art exhibitions', reverse: true },
  { id: 9, trait: 'O', text: 'I avoid philosophical discussions', reverse: true },
  { id: 10, trait: 'O', text: 'I rarely look for deeper meaning', reverse: true },

  // Conscientiousness
  { id: 11, trait: 'C', text: 'I am always prepared', reverse: false },
  { id: 12, trait: 'C', text: 'I pay attention to details', reverse: false },
  { id: 13, trait: 'C', text: 'I get tasks done right away', reverse: false },
  { id: 14, trait: 'C', text: 'I follow a schedule', reverse: false },
  { id: 15, trait: 'C', text: 'I am exacting in my work', reverse: false },
  { id: 16, trait: 'C', text: 'I often forget to put things back', reverse: true },
  { id: 17, trait: 'C', text: 'I leave my belongings around', reverse: true },
  { id: 18, trait: 'C', text: 'I make a mess of things', reverse: true },
  { id: 19, trait: 'C', text: 'I shirk my duties', reverse: true },
  { id: 20, trait: 'C', text: 'I neglect my duties', reverse: true },

  // Extraversion
  { id: 21, trait: 'E', text: 'I am the life of the party', reverse: false },
  { id: 22, trait: 'E', text: 'I feel comfortable around people', reverse: false },
  { id: 23, trait: 'E', text: 'I start conversations', reverse: false },
  { id: 24, trait: 'E', text: 'I talk to a lot of different people at parties', reverse: false },
  { id: 25, trait: 'E', text: 'I don\'t mind being the centre of attention', reverse: false },
  { id: 26, trait: 'E', text: 'I don\'t talk a lot', reverse: true },
  { id: 27, trait: 'E', text: 'I keep in the background', reverse: true },
  { id: 28, trait: 'E', text: 'I have little to say', reverse: true },
  { id: 29, trait: 'E', text: 'I don\'t like to draw attention to myself', reverse: true },
  { id: 30, trait: 'E', text: 'I am quiet around strangers', reverse: true },

  // Agreeableness
  { id: 31, trait: 'A', text: 'I am interested in people', reverse: false },
  { id: 32, trait: 'A', text: 'I sympathize with others\' feelings', reverse: false },
  { id: 33, trait: 'A', text: 'I have a soft heart', reverse: false },
  { id: 34, trait: 'A', text: 'I take time out for others', reverse: false },
  { id: 35, trait: 'A', text: 'I make people feel at ease', reverse: false },
  { id: 36, trait: 'A', text: 'I am not interested in other people\'s problems', reverse: true },
  { id: 37, trait: 'A', text: 'I feel little concern for others', reverse: true },
  { id: 38, trait: 'A', text: 'I insult people', reverse: true },
  { id: 39, trait: 'A', text: 'I am not really interested in others', reverse: true },
  { id: 40, trait: 'A', text: 'I am hard to get to know', reverse: true },

  // Neuroticism
  { id: 41, trait: 'N', text: 'I get stressed out easily', reverse: false },
  { id: 42, trait: 'N', text: 'I worry about things', reverse: false },
  { id: 43, trait: 'N', text: 'I am easily disturbed', reverse: false },
  { id: 44, trait: 'N', text: 'I get upset easily', reverse: false },
  { id: 45, trait: 'N', text: 'I change my mood a lot', reverse: false },
  { id: 46, trait: 'N', text: 'I am relaxed most of the time', reverse: true },
  { id: 47, trait: 'N', text: 'I seldom feel blue', reverse: true },
  { id: 48, trait: 'N', text: 'I rarely get irritated', reverse: true },
  { id: 49, trait: 'N', text: 'I am not easily bothered by things', reverse: true },
  { id: 50, trait: 'N', text: 'I keep my cool', reverse: true },
];

const TRAIT_INFO = {
  O: {
    name: 'Openness',
    descriptions: {
      veryLow: 'You prefer the familiar and enjoy routine. You tend to be practical and focused on concrete details rather than abstract ideas.',
      low: 'You value stability and traditional approaches. You\'re comfortable with what you know and less likely to seek novelty.',
      average: 'You balance creativity with practicality. You\'re open to new ideas but also appreciate familiar patterns.',
      high: 'You enjoy intellectual exploration and new experiences. You\'re imaginative and curious about how things work.',
      veryHigh: 'You\'re highly creative and intellectually curious. You constantly seek new ideas, experiences, and ways of understanding the world.',
    },
  },
  C: {
    name: 'Conscientiousness',
    descriptions: {
      veryLow: 'You\'re spontaneous and adaptable but may struggle with organisation and follow-through on commitments.',
      low: 'You prefer flexibility to rigid structure. You\'re laid-back but may sometimes miss deadlines or neglect details.',
      average: 'You balance being organised with flexibility. You generally follow through on responsibilities with reasonable consistency.',
      high: 'You\'re reliable and well-organised. You take pride in your work and follow through on your commitments.',
      veryHigh: 'You\'re extremely disciplined and detail-oriented. You\'re dependable, organised, and take your responsibilities very seriously.',
    },
  },
  E: {
    name: 'Extraversion',
    descriptions: {
      veryLow: 'You\'re introverted and prefer solitude or small groups. You recharge by spending time alone rather than socialising.',
      low: 'You\'re reserved and selective about social situations. You have a smaller circle of close friends and prefer quiet environments.',
      average: 'You enjoy both social interaction and alone time. You\'re comfortable meeting new people but also need personal space.',
      high: 'You\'re outgoing and energetic. You enjoy social situations and readily make new connections with others.',
      veryHigh: 'You\'re highly extroverted and thrive in social environments. You\'re the person who brings energy to groups and loves meeting new people.',
    },
  },
  A: {
    name: 'Agreeableness',
    descriptions: {
      veryLow: 'You\'re competitive and assertive. You prioritise your own needs and may challenge others\' viewpoints directly.',
      low: 'You\'re independent and direct. You\'re not afraid to disagree and may prioritise your own interests.',
      average: 'You\'re cooperative but also assertive when needed. You balance empathy with the ability to set boundaries.',
      high: 'You\'re warm, compassionate, and considerate. You\'re motivated to help others and maintain harmony in relationships.',
      veryHigh: 'You\'re highly empathetic and altruistic. You\'re deeply concerned about others\' wellbeing and prioritise harmony and cooperation.',
    },
  },
  N: {
    name: 'Neuroticism',
    descriptions: {
      veryLow: 'You\'re emotionally stable and resilient. You remain calm under pressure and recover quickly from setbacks.',
      low: 'You\'re generally calm and stable. You experience negative emotions but manage them well.',
      average: 'You experience normal emotional ups and downs. You\'re reasonably resilient but sometimes feel stressed or anxious.',
      high: 'You experience emotions intensely. You\'re prone to worry and stress, and may take longer to recover from setbacks.',
      veryHigh: 'You\'re emotionally reactive and sensitive. You experience significant stress and anxiety, and negative emotions affect you deeply.',
    },
  },
};

function drawRadarChart(ctx, scores) {
  const centerX = 400;
  const centerY = 500;
  const maxRadius = 150;
  const numTraits = 5;
  const angleSlice = (Math.PI * 2) / numTraits;

  // Draw axes and grid
  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (maxRadius * (i + 1)) / 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Draw trait axes
  const traits = ['O', 'C', 'E', 'A', 'N'];
  ctx.strokeStyle = '#d4d4d4';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < numTraits; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const x = centerX + maxRadius * Math.cos(angle);
    const y = centerY + maxRadius * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  // Draw data polygon
  ctx.fillStyle = '#2563eb20';
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < numTraits; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const radius = (scores[traits[i]] / 100) * maxRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw data points
  ctx.fillStyle = '#2563eb';
  for (let i = 0; i < numTraits; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const radius = (scores[traits[i]] / 100) * maxRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw labels
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 16px DM Sans';
  ctx.textAlign = 'center';
  for (let i = 0; i < numTraits; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const x = centerX + (maxRadius + 40) * Math.cos(angle);
    const y = centerY + (maxRadius + 40) * Math.sin(angle);
    ctx.fillText(TRAIT_INFO[traits[i]].name, x, y);
  }
}

function downloadResultCard(results) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // Gradient background (deep purple to blue)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#4c1d95');
  gradient.addColorStop(1, '#1e40af');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Fraunces';
  ctx.textAlign = 'center';
  ctx.fillText('Big Five Personality Test', canvas.width / 2, 50);

  // Draw radar chart
  drawRadarChart(ctx, results.scores);

  // Results section
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px DM Sans';
  ctx.textAlign = 'left';
  let y = 700;

  const traits = ['O', 'C', 'E', 'A', 'N'];
  traits.forEach((trait) => {
    const score = results.scores[trait];
    ctx.font = 'bold 16px DM Sans';
    ctx.fillText(`${TRAIT_INFO[trait].name}: ${score}%`, 40, y);
    y += 30;
  });

  // Watermark
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '14px DM Sans';
  ctx.textAlign = 'right';
  ctx.fillText('mykit.tools', canvas.width - 40, canvas.height - 20);

  // Download
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'big-five-personality-results.png';
  link.click();
}

function getLevelLabel(score) {
  if (score >= 80) return 'Very High';
  if (score >= 60) return 'High';
  if (score >= 40) return 'Average';
  if (score >= 20) return 'Low';
  return 'Very Low';
}

export default function BigFivePersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef(null);

  const scores = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const scoresByTrait = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    const countByTrait = { O: 0, C: 0, E: 0, A: 0, N: 0 };

    QUESTIONS.forEach((q) => {
      if (answers[q.id] !== undefined) {
        let score = answers[q.id];
        if (q.reverse) {
          score = 6 - score;
        }
        scoresByTrait[q.trait] += score;
        countByTrait[q.trait] += 1;
      }
    });

    const percentages = {};
    Object.keys(scoresByTrait).forEach((trait) => {
      const avg = countByTrait[trait] > 0 ? scoresByTrait[trait] / countByTrait[trait] : 0;
      percentages[trait] = Math.round((avg / 5) * 100);
    });

    return {
      scores: percentages,
      levels: {
        O: getLevelLabel(percentages.O),
        C: getLevelLabel(percentages.C),
        E: getLevelLabel(percentages.E),
        A: getLevelLabel(percentages.A),
        N: getLevelLabel(percentages.N),
      },
    };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && scores) {
    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary">Your Results</h2>
          <p className="text-text-secondary mt-2">Based on the International Personality Item Pool (IPIP) — Goldberg et al., 2006</p>
        </div>

        {/* Radar chart placeholder - visual representation */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-accent">
          <div className="aspect-square rounded-lg bg-white flex items-center justify-center">
            <p className="text-text-secondary text-center px-4">
              Radar chart will display here. Traits: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
            </p>
          </div>
        </Card>

        {/* Trait results */}
        <div className="space-y-4">
          {['O', 'C', 'E', 'A', 'N'].map((trait) => (
            <Card key={trait} className="bg-white">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-text-primary">{TRAIT_INFO[trait].name}</h3>
                  <div className="font-mono text-2xl font-bold text-accent">{scores.scores[trait]}%</div>
                </div>
                <div className="bg-surface rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-accent h-full transition-all duration-500"
                    style={{ width: `${scores.scores[trait]}%` }}
                  />
                </div>
                <p className="text-text-secondary text-sm font-medium">{scores.levels[trait]}</p>
                <p className="text-text-secondary text-sm">
                  {TRAIT_INFO[trait].descriptions[scores.levels[trait].toLowerCase().replace(' ', '')]}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 border border-accent rounded-[var(--radius-card)] p-4">
          <p className="text-sm text-text-secondary">
            These results reflect your personality based on your responses. Remember that personality is complex and multi-faceted. Your traits exist on a spectrum and may vary across different situations and contexts.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => {
              const results = { scores: scores.scores };
              downloadResultCard(results);
            }}
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
          Citation: Goldberg, L. R., Johnson, J. A., Eber, H. W., Hogan, R., Ashton, M. C., Cloninger, C. R., & Gough, H. G. (2006). The International Personality Item Pool and the future of public-domain personality measures. Journal of Research in Personality, 40(1), 84-96.
        </p>
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
        <div className="space-y-6">
          <p className="text-lg text-text-primary font-medium">{question.text}</p>

          {/* Rating scale */}
          <div className="flex justify-between gap-2">
            {[
              { value: 1, label: 'Strongly Disagree' },
              { value: 2, label: 'Disagree' },
              { value: 3, label: 'Neutral' },
              { value: 4, label: 'Agree' },
              { value: 5, label: 'Strongly Agree' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => {
                  const newAnswers = { ...answers, [question.id]: value };
                  setAnswers(newAnswers);
                }}
                className={`flex-1 py-3 px-2 rounded-[var(--radius-input)] text-xs font-medium transition-all ${
                  answers[question.id] === value
                    ? 'bg-accent text-white border border-accent'
                    : 'bg-white text-text-secondary border border-border hover:border-accent'
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          <p className="text-xs text-text-muted text-center mt-4">
            {answers[question.id] && `You selected: ${[
              'Strongly Disagree',
              'Disagree',
              'Neutral',
              'Agree',
              'Strongly Agree',
            ][answers[question.id] - 1]}`}
          </p>
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
