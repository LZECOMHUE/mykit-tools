'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const NarcissismTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(16).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const canvasRef = useRef(null);

  const questions = [
    {
      a: 'I like to be the centre of attention',
      b: 'I prefer to blend in with the crowd',
    },
    {
      a: 'I am no better or worse than most people',
      b: 'I think I am a special person',
    },
    {
      a: 'Everybody likes to hear my stories',
      b: 'Sometimes I tell good stories',
    },
    {
      a: 'I usually get the respect I deserve',
      b: 'I insist upon getting the respect that is due me',
    },
    {
      a: 'I don\'t mind following orders',
      b: 'I like having authority over people',
    },
    {
      a: 'I am going to be a great person',
      b: 'I hope I am going to be successful',
    },
    {
      a: 'Sometimes I am not sure of what I am doing',
      b: 'I always know what I am doing',
    },
    {
      a: 'I don\'t like it when I find myself manipulating people',
      b: 'I find it easy to manipulate people',
    },
    {
      a: 'Being an authority doesn\'t mean that much to me',
      b: 'People always seem to recognize my authority',
    },
    {
      a: 'I know that I am good because everybody keeps telling me so',
      b: 'When people compliment me I sometimes get embarrassed',
    },
    {
      a: 'I try not to be a show-off',
      b: 'I am apt to show off if I get the chance',
    },
    {
      a: 'I am much like everybody else',
      b: 'I am an extraordinary person',
    },
    {
      a: 'I am not particularly interested in looking at myself in the mirror',
      b: 'I like to look at myself in the mirror',
    },
    {
      a: 'I want to amount to something in the eyes of the world',
      b: 'I just want to be reasonably happy',
    },
    {
      a: 'I can live my life in any way I want to',
      b: 'People can\'t always live their lives in terms of what they want',
    },
    {
      a: 'I am assertive',
      b: 'I wish I were more assertive',
    },
  ];

  // The narcissistic choice for each item (0 = A, 1 = B)
  const narcissisticChoices = [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0];

  const scoreCategories = {
    low: { range: [0, 3], label: 'Low', color: '#16a34a' },
    belowAverage: { range: [4, 6], label: 'Below Average', color: '#2563eb' },
    average: { range: [7, 9], label: 'Average', color: '#f59e0b' },
    aboveAverage: { range: [10, 12], label: 'Above Average', color: '#e8a317' },
    high: { range: [13, 16], label: 'High', color: '#dc2626' },
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === narcissisticChoices[index]) {
        score += 1;
      }
    });
    return score;
  };

  const getCategory = (score) => {
    for (const [key, data] of Object.entries(scoreCategories)) {
      if (score >= data.range[0] && score <= data.range[1]) {
        return data;
      }
    }
    return scoreCategories.low;
  };

  const handleAnswer = (choiceIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = choiceIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleGoToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const downloadResults = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const score = calculateScore();
    const category = getCategory(score);

    const ctx = canvas.getContext('2d');
    const width = 800;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;

    // Gradient background (dark navy to gold)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(1, '#f59e0b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // White content area
    ctx.fillStyle = 'white';
    ctx.fillRect(40, 60, 720, 880);

    // Title
    ctx.font = 'bold 36px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'left';
    ctx.fillText('NPI-16 Narcissism Test', 60, 110);

    // Score box
    ctx.font = 'bold 72px "JetBrains Mono"';
    ctx.fillStyle = category.color;
    ctx.textAlign = 'center';
    ctx.fillText(score.toString(), 400, 240);

    // Category label
    ctx.font = 'bold 28px "DM Sans"';
    ctx.fillStyle = category.color;
    ctx.fillText(category.label, 400, 290);

    // Comparison to average
    ctx.font = '14px "DM Sans"';
    ctx.fillStyle = '#525252';
    ctx.textAlign = 'center';
    const avgComparison =
      score < 6.5
        ? 'Below population average (6.5)'
        : score > 6.5
        ? 'Above population average (6.5)'
        : 'At population average (6.5)';
    ctx.fillText(avgComparison, 400, 330);

    // Separator
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 370);
    ctx.lineTo(740, 370);
    ctx.stroke();

    // Interpretation
    ctx.font = 'bold 18px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'left';
    ctx.fillText('What This Means:', 60, 420);

    ctx.font = '13px "DM Sans"';
    ctx.fillStyle = '#525252';
    let interpretation = '';
    if (score <= 3) interpretation = 'You score low on narcissistic traits. You likely value humility, genuine connections, and others\' wellbeing.';
    else if (score <= 6) interpretation = 'You score below average on narcissistic traits. You have healthy self-regard while remaining grounded.';
    else if (score <= 9) interpretation = 'You score at average levels of narcissistic traits. This is typical for the general population.';
    else if (score <= 12) interpretation = 'You score above average on narcissistic traits. You may have strong self-confidence and leadership qualities.';
    else interpretation = 'You score high on narcissistic traits. Consider how this affects your relationships and empathy.';

    const lines = ctx.measureText(interpretation).width > 600
      ? [interpretation.substring(0, 50) + '...', interpretation.substring(50)]
      : [interpretation];

    lines.forEach((line, i) => {
      ctx.fillText(line, 80, 460 + i * 35);
    });

    // Important note
    ctx.font = 'bold 14px "DM Sans"';
    ctx.fillStyle = '#dc2626';
    ctx.textAlign = 'left';
    ctx.fillText('Important Disclaimer:', 60, 580);

    ctx.font = '12px "DM Sans"';
    ctx.fillStyle = '#525252';
    const disclaimer = [
      'This measures narcissistic TRAITS on a spectrum.',
      'It is NOT a diagnosis for Narcissistic Personality Disorder.',
      'Everyone has some narcissism — healthy self-regard is normal.',
    ];
    disclaimer.forEach((line, i) => {
      ctx.fillText('• ' + line, 80, 620 + i * 35);
    });

    // Citation
    ctx.font = '11px "DM Sans"';
    ctx.fillStyle = '#a3a3a3';
    ctx.textAlign = 'left';
    ctx.fillText('Ames, D.R., Rose, P., & Anderson, C.P. (2006). The NPI-16.', 60, 920);

    // Watermark
    ctx.font = 'bold 14px "DM Sans"';
    ctx.fillStyle = 'rgba(30, 58, 138, 0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('mykit.tools', 400, 970);

    // Download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `npi16-narcissism-test-${new Date().toISOString().split('T')[0]}.png`;
    link.click();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(16).fill(null));
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const score = calculateScore();
    const category = getCategory(score);

    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-2">Your Results</h2>
            <p className="text-text-secondary">NPI-16 Narcissism Test</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-amber-100 rounded-lg p-8 mb-8 border border-amber-300">
            <div className="text-center">
              <p className="text-white text-sm mb-2">Your Score</p>
              <p className="font-mono text-6xl font-bold mb-2" style={{ color: category.color }}>
                {score}
              </p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {category.label}
              </p>
              <p className="text-sm text-text-muted mt-3">Population average: 6.5</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg text-text-primary mb-4">Understanding Your Score</h3>
            <p className="text-text-secondary mb-4">
              {score <= 3 && 'You score low on narcissistic traits. You likely value humility, genuine connections, and others\' wellbeing. You probably excel in collaborative environments and care deeply about how your actions affect others.'}
              {score > 3 && score <= 6 && 'You score below average on narcissistic traits. You have healthy self-regard while remaining grounded. You balance confidence with humility.'}
              {score > 6 && score <= 9 && 'You score at average levels of narcissistic traits. This is typical for the general population. You have a mix of self-focus and empathy.'}
              {score > 9 && score <= 12 && 'You score above average on narcissistic traits. You may have strong self-confidence, charisma, and leadership qualities. Be mindful of how this affects your relationships.'}
              {score > 12 && 'You score high on narcissistic traits. You likely have strong confidence and ambition. Consider how this affects your empathy and relationships.'}
            </p>
          </div>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-full p-4 mb-6 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow flex items-center justify-center gap-2"
          >
            <span className="text-blue-600">ℹ️</span>
            <span className="font-semibold text-blue-700">What is Narcissism?</span>
          </button>

          {showInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg text-text-primary mb-4">About Narcissistic Traits</h3>
              <p className="text-text-secondary mb-4">
                Narcissism exists on a spectrum. Everyone has narcissistic traits to some degree. Healthy narcissism includes:
              </p>
              <ul className="space-y-2 text-text-secondary mb-4 list-disc list-inside">
                <li>Healthy self-esteem and confidence</li>
                <li>Motivation to achieve goals</li>
                <li>Ability to lead and inspire others</li>
                <li>Resilience in the face of criticism</li>
              </ul>
              <p className="text-text-secondary font-semibold">
                This assessment measures traits, not disorder. Narcissistic Personality Disorder is a rare clinical diagnosis requiring professional assessment.
              </p>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg text-text-primary mb-4">Important Disclaimer</h3>
            <p className="text-text-secondary mb-4">
              This test measures narcissistic personality <strong>traits</strong> on a spectrum. It is <strong>NOT</strong> a diagnosis for Narcissistic Personality Disorder.
            </p>
            <p className="text-text-secondary mb-4">
              Everyone has some degree of narcissism. Healthy self-regard, confidence, and self-focus are normal and adaptive. Only clinicians can diagnose personality disorders.
            </p>
            <p className="text-text-secondary font-semibold">
              Use this tool for self-reflection, not self-diagnosis.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={downloadResults}
              className="flex-1 bg-accent text-white"
                          >
              Download Results Card
            </Button>
            <Button onClick={resetQuiz} variant="secondary" className="flex-1">
              Take Quiz Again
            </Button>
          </div>

          <p className="text-xs text-text-muted text-center mt-6">
            Ames, D.R., Rose, P., & Anderson, C.P. (2006). The NPI-16: Minimal narcissism assessment.
          </p>
        </Card>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-8">
        <div className="mb-6">
          <p className="text-sm text-text-muted mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-text-primary mb-6">
            Which statement do you agree with more?
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => handleAnswer(0)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQuestion] === 0
                  ? 'border-accent bg-blue-50'
                  : 'border-border bg-white hover:border-blue-300'
              }`}
            >
              <span className="font-semibold text-text-primary block mb-1">A</span>
              <span className="text-text-secondary">{questions[currentQuestion].a}</span>
            </button>

            <div className="text-center text-text-muted text-sm font-semibold">OR</div>

            <button
              onClick={() => handleAnswer(1)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQuestion] === 1
                  ? 'border-accent bg-blue-50'
                  : 'border-border bg-white hover:border-blue-300'
              }`}
            >
              <span className="font-semibold text-text-primary block mb-1">B</span>
              <span className="text-text-secondary">{questions[currentQuestion].b}</span>
            </button>
          </div>
        </div>

        {/* Progress indicator dots */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {Array.from({ length: questions.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleGoToQuestion(index)}
              className={`w-10 h-10 rounded-full font-mono text-sm font-bold transition-all ${
                index === currentQuestion
                  ? 'bg-accent text-white'
                  : answers[index] !== null
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-surface text-text-muted border border-border'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            variant="secondary"
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              currentQuestion === questions.length - 1
                ? setShowResults(true)
                : setCurrentQuestion(currentQuestion + 1)
            }
            disabled={answers[currentQuestion] === null}
            className="flex-1 bg-accent text-white"
          >
            {currentQuestion === questions.length - 1 ? 'View Results' : 'Next'}
          </Button>
        </div>

        <p className="text-xs text-text-muted text-center mt-6">
          NPI-16 is a public domain personality assessment for personal reflection only.
        </p>
      </Card>
    </div>
  );
};

export default NarcissismTest;
