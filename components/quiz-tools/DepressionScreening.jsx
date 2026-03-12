'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const DepressionScreening = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(9).fill(null));
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef(null);

  const questions = [
    'Little interest or pleasure in doing things',
    'Feeling down, depressed, or hopeless',
    'Trouble falling or staying asleep, or sleeping too much',
    'Feeling tired or having little energy',
    'Poor appetite or overeating',
    'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    'Trouble concentrating on things, such as reading the newspaper or watching television',
    'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    'Thoughts that you would be better off dead, or of hurting yourself in some way',
  ];

  const options = [
    'Not at all',
    'Several days',
    'More than half the days',
    'Nearly every day',
  ];

  const scoreCategories = {
    minimal: { range: [0, 4], label: 'Minimal', color: '#16a34a' },
    mild: { range: [5, 9], label: 'Mild', color: '#2563eb' },
    moderate: { range: [10, 14], label: 'Moderate', color: '#f59e0b' },
    moderatelySevere: { range: [15, 19], label: 'Moderately Severe', color: '#ef4444' },
    severe: { range: [20, 27], label: 'Severe', color: '#dc2626' },
  };

  const calculateScore = () => answers.reduce((sum, val) => sum + (val !== null ? val : 0), 0);

  const getCategory = (score) => {
    for (const [key, data] of Object.entries(scoreCategories)) {
      if (score >= data.range[0] && score <= data.range[1]) {
        return data;
      }
    }
    return scoreCategories.minimal;
  };

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
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

    // Gradient background (calming blue to teal)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0369a1');
    gradient.addColorStop(1, '#0d9488');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // White content area
    ctx.fillStyle = 'white';
    ctx.fillRect(40, 60, 720, 880);

    // Title
    ctx.font = 'bold 36px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'left';
    ctx.fillText('PHQ-9 Depression Screening', 60, 110);

    // Score box
    ctx.font = 'bold 72px "JetBrains Mono"';
    ctx.fillStyle = category.color;
    ctx.textAlign = 'center';
    ctx.fillText(score.toString(), 400, 240);

    // Category label
    ctx.font = 'bold 28px "DM Sans"';
    ctx.fillStyle = category.color;
    ctx.fillText(category.label, 400, 290);

    // Description
    ctx.font = '16px "DM Sans"';
    ctx.fillStyle = '#525252';
    ctx.textAlign = 'center';
    const descriptions = {
      minimal: 'Your responses suggest minimal depressive symptoms.',
      mild: 'Your responses suggest mild depressive symptoms.',
      moderate: 'Your responses suggest moderate depressive symptoms.',
      moderatelySevere: 'Your responses suggest moderately severe depressive symptoms.',
      severe: 'Your responses suggest severe depressive symptoms.',
    };
    ctx.fillText(descriptions[Object.keys(scoreCategories).find(k => scoreCategories[k].label === category.label)], 400, 340);

    // Separator
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 380);
    ctx.lineTo(740, 380);
    ctx.stroke();

    // Message
    ctx.font = 'bold 18px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'left';
    ctx.fillText('Next Steps:', 60, 430);

    ctx.font = '14px "DM Sans"';
    ctx.fillStyle = '#525252';
    const nextSteps = [
      'This is a screening tool, not a diagnosis.',
      'Consider consulting a healthcare professional.',
      'Help is available — please reach out.',
    ];
    nextSteps.forEach((step, i) => {
      ctx.fillText('• ' + step, 80, 470 + i * 35);
    });

    // Resources
    ctx.font = 'bold 18px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.fillText('Support Resources:', 60, 610);

    ctx.font = '13px "DM Sans"';
    ctx.fillStyle = '#525252';
    const resources = [
      'Samaritans: 116 123 (UK, free, 24/7)',
      'NHS Urgent: 111, press 2',
      'Crisis Text: Text SHOUT to 85258',
      'US: 988 Suicide & Crisis Lifeline',
    ];
    resources.forEach((resource, i) => {
      ctx.fillText('• ' + resource, 80, 650 + i * 35);
    });

    // Citation
    ctx.font = '11px "DM Sans"';
    ctx.fillStyle = '#a3a3a3';
    ctx.textAlign = 'left';
    ctx.fillText('Kroenke, K., Spitzer, R.L., & Williams, J.B.W. (2001). The PHQ-9.', 60, 920);

    // Watermark
    ctx.font = 'bold 14px "DM Sans"';
    ctx.fillStyle = 'rgba(2, 132, 199, 0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('mykit.tools', 400, 970);

    // Download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `phq9-depression-screening-${new Date().toISOString().split('T')[0]}.png`;
    link.click();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(9).fill(null));
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
            <p className="text-text-secondary">PHQ-9 Depression Screening</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-8 mb-8 border border-blue-200">
            <div className="text-center">
              <p className="text-text-muted text-sm mb-2">Your Score</p>
              <p className="font-mono text-6xl font-bold mb-2" style={{ color: category.color }}>
                {score}
              </p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {category.label}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg text-text-primary mb-4">Understanding Your Score</h3>
            <p className="text-text-secondary mb-4">
              {score <= 4 && 'Your responses suggest minimal depressive symptoms.'}
              {score >= 5 && score <= 9 && 'Your responses suggest mild depressive symptoms.'}
              {score >= 10 && score <= 14 && 'Your responses suggest moderate depressive symptoms.'}
              {score >= 15 && score <= 19 && 'Your responses suggest moderately severe depressive symptoms.'}
              {score >= 20 && 'Your responses suggest severe depressive symptoms.'}
            </p>
            <p className="text-text-secondary mb-4">
              This is a screening tool, not a diagnosis. The information provided is for educational purposes only.
            </p>
            <p className="text-text-secondary font-semibold">
              If you are experiencing persistent depression or thoughts of self-harm, please consult a healthcare professional or contact the resources below.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg text-text-primary mb-4">If You're in Crisis</h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start">
                <span className="font-bold mr-3">UK:</span>
                <span><strong>Samaritans</strong> 116 123 (free, 24/7)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">UK:</span>
                <span><strong>NHS Urgent</strong> 111, press 2</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">UK:</span>
                <span><strong>Crisis Text Line</strong> Text SHOUT to 85258</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">US:</span>
                <span><strong>988 Suicide & Crisis Lifeline</strong> Call or text 988</span>
              </li>
            </ul>
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
            Kroenke, K., Spitzer, R.L., & Williams, J.B.W. (2001). The PHQ-9: validity of a brief depression severity measure.
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
          <h2 className="text-xl font-bold text-text-primary mb-6">
            Over the last 2 weeks, how often have you been bothered by:
          </h2>
          <p className="text-lg text-text-secondary">{questions[currentQuestion]}</p>
        </div>

        <div className="space-y-3 mb-8">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQuestion] === index
                  ? 'border-accent bg-blue-50'
                  : 'border-border bg-white hover:border-blue-300'
              }`}
            >
              <span className="font-semibold text-text-primary">{option}</span>
              <span className="text-text-muted ml-2 text-sm">({index})</span>
            </button>
          ))}
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
          PHQ-9 is a public domain screening tool. This is not a substitute for professional medical advice.
        </p>
      </Card>
    </div>
  );
};

export default DepressionScreening;
