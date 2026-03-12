'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const AnxietyScreening = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(7).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const canvasRef = useRef(null);

  const questions = [
    'Feeling nervous, anxious, or on edge',
    'Not being able to stop or control worrying',
    'Worrying too much about different things',
    'Trouble relaxing',
    'Being so restless that it is hard to sit still',
    'Becoming easily annoyed or irritable',
    'Feeling afraid, as if something awful might happen',
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
    severe: { range: [15, 21], label: 'Severe', color: '#dc2626' },
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

    // Gradient background (lavender to soft blue)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(1, '#60a5fa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // White content area
    ctx.fillStyle = 'white';
    ctx.fillRect(40, 60, 720, 880);

    // Title
    ctx.font = 'bold 36px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'left';
    ctx.fillText('GAD-7 Anxiety Assessment', 60, 110);

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
      minimal: 'Your responses suggest minimal anxiety symptoms.',
      mild: 'Your responses suggest mild anxiety symptoms.',
      moderate: 'Your responses suggest moderate anxiety symptoms.',
      severe: 'Your responses suggest severe anxiety symptoms.',
    };
    ctx.fillText(descriptions[Object.keys(scoreCategories).find(k => scoreCategories[k].label === category.label)], 400, 340);

    // Separator
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 380);
    ctx.lineTo(740, 380);
    ctx.stroke();

    // Breathing exercise tip
    ctx.font = 'bold 18px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'left';
    ctx.fillText('Quick Calming Tip:', 60, 430);

    ctx.font = '14px "DM Sans"';
    ctx.fillStyle = '#525252';
    const breathingTip = [
      'Try a simple 4-7-8 breathing exercise:',
      '• Inhale for 4 counts',
      '• Hold for 7 counts',
      '• Exhale slowly for 8 counts',
      'Repeat 4 times when feeling anxious.',
    ];
    breathingTip.forEach((tip, i) => {
      ctx.fillText(tip, 80, 470 + i * 35);
    });

    // Resources
    ctx.font = 'bold 18px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.fillText('Support Resources:', 60, 740);

    ctx.font = '13px "DM Sans"';
    ctx.fillStyle = '#525252';
    const resources = [
      'Samaritans: 116 123 (UK, free, 24/7)',
      'NHS Urgent: 111, press 2',
      'Mind: mind.org.uk',
      'Anxiety UK: anxietyuk.org.uk',
    ];
    resources.forEach((resource, i) => {
      ctx.fillText('• ' + resource, 80, 780 + i * 35);
    });

    // Citation
    ctx.font = '11px "DM Sans"';
    ctx.fillStyle = '#a3a3a3';
    ctx.textAlign = 'left';
    ctx.fillText('Spitzer, R.L., Kroenke, K., Williams, J.B., & Löwe, B. (2006). The GAD-7.', 60, 920);

    // Watermark
    ctx.font = 'bold 14px "DM Sans"';
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('mykit.tools', 400, 970);

    // Download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `gad7-anxiety-assessment-${new Date().toISOString().split('T')[0]}.png`;
    link.click();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(7).fill(null));
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
            <p className="text-text-secondary">GAD-7 Anxiety Assessment</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 mb-8 border border-purple-200">
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
              {score <= 4 && 'Your responses suggest minimal anxiety symptoms.'}
              {score >= 5 && score <= 9 && 'Your responses suggest mild anxiety symptoms.'}
              {score >= 10 && score <= 14 && 'Your responses suggest moderate anxiety symptoms.'}
              {score >= 15 && 'Your responses suggest severe anxiety symptoms.'}
            </p>
            <p className="text-text-secondary mb-4">
              This is a screening tool for personal reflection, not a diagnosis. The information provided is for educational purposes only.
            </p>
            <p className="text-text-secondary font-semibold">
              If you are experiencing persistent anxiety or panic, please consider consulting a healthcare professional.
            </p>
          </div>

          <button
            onClick={() => setShowBreathing(!showBreathing)}
            className="w-full p-4 mb-6 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center gap-2 text-purple-700 font-semibold">
              <span>🌬️</span>
              Try a Calming Breathing Exercise
            </div>
          </button>

          {showBreathing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg text-text-primary mb-4">4-7-8 Breathing Exercise</h3>
              <ol className="space-y-3 text-text-secondary list-decimal list-inside">
                <li>Find a comfortable seated position</li>
                <li><strong>Inhale</strong> slowly through your nose for 4 counts</li>
                <li><strong>Hold</strong> your breath for 7 counts</li>
                <li><strong>Exhale</strong> slowly through your mouth for 8 counts</li>
                <li>Repeat 4-5 times</li>
              </ol>
              <p className="text-text-muted text-sm mt-4">
                This technique activates your parasympathetic nervous system, helping to calm anxiety.
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg text-text-primary mb-4">Support Resources</h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start">
                <span className="font-bold mr-3">UK:</span>
                <span><strong>Samaritans</strong> 116 123 (free, 24/7)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">UK:</span>
                <span><strong>Mind</strong> mind.org.uk</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">UK:</span>
                <span><strong>Anxiety UK</strong> anxietyuk.org.uk</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">US:</span>
                <span><strong>ADAA</strong> adaa.org (Anxiety and Depression Association)</span>
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
            Spitzer, R.L., Kroenke, K., Williams, J.B., & Löwe, B. (2006). The GAD-7: validity of a brief anxiety severity measure.
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
          GAD-7 is a public domain screening tool. This is not a substitute for professional medical advice.
        </p>
      </Card>
    </div>
  );
};

export default AnxietyScreening;
