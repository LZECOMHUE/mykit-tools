'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const EmotionalIntelligenceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef(null);

  const domains = {
    perceiving: { name: 'Perceiving Emotions', color: '#2563eb', range: [0, 4] },
    using: { name: 'Using Emotions', color: '#7c3aed', range: [5, 9] },
    understanding: { name: 'Understanding Emotions', color: '#059669', range: [10, 14] },
    managing: { name: 'Managing Emotions', color: '#dc2626', range: [15, 19] },
  };

  const questions = [
    // Perceiving Emotions (5 questions)
    {
      domain: 'perceiving',
      question: 'Your colleague seems upset during a meeting. How do you recognize this?',
      options: [
        { text: 'I don\'t really notice until they explicitly say something', score: 1 },
        { text: 'I notice some changes in their tone or body language', score: 2 },
        { text: 'I pick up on subtle shifts in expression, tone, and posture', score: 3 },
        { text: 'I immediately sense their emotional state and can usually name the specific emotion', score: 4 },
      ],
    },
    {
      domain: 'perceiving',
      question: 'When you look in the mirror after a difficult day, you can typically:',
      options: [
        { text: 'See that something is wrong, but can\'t quite identify what', score: 1 },
        { text: 'Tell you\'re feeling down or stressed', score: 2 },
        { text: 'Read clear signs of frustration, sadness, or anxiety in your face', score: 3 },
        { text: 'Accurately identify your emotional state from subtle facial cues alone', score: 4 },
      ],
    },
    {
      domain: 'perceiving',
      question: 'In a crowded room, you typically:',
      options: [
        { text: 'Miss the emotional dynamics between people', score: 1 },
        { text: 'Notice that some people seem happy and others don\'t', score: 2 },
        { text: 'Sense the emotional tone and key relationships in the group', score: 3 },
        { text: 'Quickly understand the emotional landscape and who is connected to whom', score: 4 },
      ],
    },
    {
      domain: 'perceiving',
      question: 'A friend cancels plans last minute. You:',
      options: [
        { text: 'Accept the reason at face value', score: 1 },
        { text: 'Wonder if something is bothering them', score: 2 },
        { text: 'Sense they\'re dealing with something emotional, even if unstated', score: 3 },
        { text: 'Immediately understand their likely emotional state without explanation', score: 4 },
      ],
    },
    {
      domain: 'perceiving',
      question: 'When someone says "I\'m fine" but their tone suggests otherwise, you:',
      options: [
        { text: 'Take it at face value', score: 1 },
        { text: 'Think they might not be fine', score: 2 },
        { text: 'Recognize the incongruence and gently probe', score: 3 },
        { text: 'Instantly know what emotion they\'re hiding and why', score: 4 },
      ],
    },
    // Using Emotions (5 questions)
    {
      domain: 'using',
      question: 'When you\'re feeling motivated and energetic, you typically:',
      options: [
        { text: 'Don\'t think about how to use this state productively', score: 1 },
        { text: 'Notice you\'re in a good mood and try to tackle easier tasks', score: 2 },
        { text: 'Channel this energy into important projects strategically', score: 3 },
        { text: 'Deliberately harness this state to accomplish significant goals or creative work', score: 4 },
      ],
    },
    {
      domain: 'using',
      question: 'Anxiety before a presentation usually leads you to:',
      options: [
        { text: 'Become paralyzed and perform poorly', score: 1 },
        { text: 'Feel nervous but push through somehow', score: 2 },
        { text: 'Channel the anxiety into focus and preparation', score: 3 },
        { text: 'Transform the anxiety into excitement and deliver powerfully', score: 4 },
      ],
    },
    {
      domain: 'using',
      question: 'When facing a creative challenge, you:',
      options: [
        { text: 'Try to stay emotionally neutral', score: 1 },
        { text: 'Work with whatever emotions come up', score: 2 },
        { text: 'Use slight frustration or curiosity to fuel your thinking', score: 3 },
        { text: 'Intentionally evoke emotions that enhance creativity and novel thinking', score: 4 },
      ],
    },
    {
      domain: 'using',
      question: 'Your mood typically affects your productivity by:',
      options: [
        { text: 'Controlling your work output regardless of effort', score: 1 },
        { text: 'Making some tasks harder or easier', score: 2 },
        { text: 'Helping you work smarter on different types of tasks', score: 3 },
        { text: 'Allowing you to strategically use emotional states to optimize performance', score: 4 },
      ],
    },
    {
      domain: 'using',
      question: 'When you need to negotiate or persuade someone, you:',
      options: [
        { text: 'Remain emotionally distant and purely logical', score: 1 },
        { text: 'Try to be friendly but don\'t think much about emotions', score: 2 },
        { text: 'Use your emotional awareness to find common ground', score: 3 },
        { text: 'Strategically use emotional intelligence to build connection and influence positively', score: 4 },
      ],
    },
    // Understanding Emotions (5 questions)
    {
      domain: 'understanding',
      question: 'When someone is angry, you typically understand:',
      options: [
        { text: 'Just that they\'re upset', score: 1 },
        { text: 'That they\'re frustrated about something specific', score: 2 },
        { text: 'The underlying cause and how their anger builds over time', score: 3 },
        { text: 'The root cause, trigger, and likely consequences of their anger', score: 4 },
      ],
    },
    {
      domain: 'understanding',
      question: 'You\'re good at recognizing when you shift from one emotion to another because:',
      options: [
        { text: 'You don\'t usually track your emotional shifts', score: 1 },
        { text: 'You notice your mood changes', score: 2 },
        { text: 'You can identify what triggered the shift and how emotions blend', score: 3 },
        { text: 'You understand emotional trajectories and what each transition means for your behaviour', score: 4 },
      ],
    },
    {
      domain: 'understanding',
      question: 'When someone says they\'re "overwhelmed," you understand this might mean:',
      options: [
        { text: 'They have too much to do', score: 1 },
        { text: 'They\'re stressed and possibly anxious', score: 2 },
        { text: 'They\'re experiencing a mix of anxiety, frustration, and powerlessness', score: 3 },
        { text: 'A complex emotional state mixing stress, loss of control, and decision fatigue', score: 4 },
      ],
    },
    {
      domain: 'understanding',
      question: 'In your own emotional patterns, you:',
      options: [
        { text: 'Don\'t see much of a pattern', score: 1 },
        { text: 'Notice you feel certain ways at certain times', score: 2 },
        { text: 'Understand what situations trigger specific emotions and how they affect you', score: 3 },
        { text: 'See complex patterns in your emotions and understand the interconnections', score: 4 },
      ],
    },
    {
      domain: 'understanding',
      question: 'Your partner is quiet and withdrawn. You understand this could be:',
      options: [
        { text: 'Just how they\'re being right now', score: 1 },
        { text: 'A sign they\'re upset', score: 2 },
        { text: 'Related to something specific, or possibly sadness/hurt', score: 3 },
        { text: 'One of several possible emotional states (sadness, hurt, processing, or needing space)', score: 4 },
      ],
    },
    // Managing Emotions (5 questions)
    {
      domain: 'managing',
      question: 'When you feel anger rising, you typically:',
      options: [
        { text: 'Express it immediately', score: 1 },
        { text: 'Try to calm down but often struggle', score: 2 },
        { text: 'Use strategies to regulate and respond thoughtfully', score: 3 },
        { text: 'Transform the anger into productive action or resolve the underlying issue', score: 4 },
      ],
    },
    {
      domain: 'managing',
      question: 'After a setback or failure, you:',
      options: [
        { text: 'Stay discouraged for days', score: 1 },
        { text: 'Feel sad but eventually move on', score: 2 },
        { text: 'Process the emotions and extract lessons for improvement', score: 3 },
        { text: 'Quickly reframe the setback as valuable learning and stay motivated', score: 4 },
      ],
    },
    {
      domain: 'managing',
      question: 'In high-stress situations, you:',
      options: [
        { text: 'Become reactive and emotional', score: 1 },
        { text: 'Feel stressed but try to keep going', score: 2 },
        { text: 'Stay relatively calm and think clearly', score: 3 },
        { text: 'Remain composed, think strategically, and help others stay calm', score: 4 },
      ],
    },
    {
      domain: 'managing',
      question: 'When you\'re anxious about something, you:',
      options: [
        { text: 'Can\'t think about anything else until it passes', score: 1 },
        { text: 'Struggle to focus on other things', score: 2 },
        { text: 'Can acknowledge the anxiety and work on other things', score: 3 },
        { text: 'Process the anxiety productively and maintain focus on priorities', score: 4 },
      ],
    },
    {
      domain: 'managing',
      question: 'Someone criticizes your work. Your initial response is typically to:',
      options: [
        { text: 'Become defensive or angry', score: 1 },
        { text: 'Feel hurt but try to listen', score: 2 },
        { text: 'Feel defensive but recognize the feedback might be valuable', score: 3 },
        { text: 'Separate your self-worth from the feedback and consider it objectively', score: 4 },
      ],
    },
  ];

  const calculateDomainScores = () => {
    const scores = {
      perceiving: 0,
      using: 0,
      understanding: 0,
      managing: 0,
    };

    answers.forEach((answer, index) => {
      if (answer !== null) {
        const domain = questions[index].domain;
        const score = questions[index].options[answer].score;
        scores[domain] += score;
      }
    });

    return scores;
  };

  const getTotalScore = (domainScores) => {
    return Object.values(domainScores).reduce((a, b) => a + b, 0);
  };

  const getOverallCategory = (total) => {
    if (total <= 35) return { level: 'Developing', color: '#ef4444', advice: 'Focus on building emotional awareness.' };
    if (total <= 50) return { level: 'Growing', color: '#f59e0b', advice: 'You\'re developing good EI; keep strengthening it.' };
    if (total <= 65) return { level: 'Strong', color: '#2563eb', advice: 'You have strong emotional intelligence.' };
    return { level: 'Exceptional', color: '#16a34a', advice: 'You have exceptional emotional intelligence.' };
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

    const domainScores = calculateDomainScores();
    const total = getTotalScore(domainScores);
    const category = getOverallCategory(total);

    const ctx = canvas.getContext('2d');
    const width = 800;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;

    // Gradient background (amber to orange)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#b45309');
    gradient.addColorStop(1, '#ea580c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // White content area
    ctx.fillStyle = 'white';
    ctx.fillRect(40, 60, 720, 880);

    // Title
    ctx.font = 'bold 36px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'left';
    ctx.fillText('Emotional Intelligence Assessment', 60, 110);

    // Overall score
    ctx.font = 'bold 72px "JetBrains Mono"';
    ctx.fillStyle = category.color;
    ctx.textAlign = 'center';
    ctx.fillText(total.toString(), 400, 240);

    // Category label
    ctx.font = 'bold 28px "DM Sans"';
    ctx.fillStyle = category.color;
    ctx.fillText(category.level, 400, 290);

    // Domain breakdown
    ctx.font = 'bold 14px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'left';
    ctx.fillText('Domain Scores:', 60, 350);

    const domainLabels = [
      { key: 'perceiving', label: 'Perceiving' },
      { key: 'using', label: 'Using' },
      { key: 'understanding', label: 'Understanding' },
      { key: 'managing', label: 'Managing' },
    ];

    domainLabels.forEach((domain, i) => {
      ctx.font = '13px "DM Sans"';
      ctx.fillStyle = '#525252';
      const score = domainScores[domain.key];
      ctx.fillText(`${domain.label}: ${score}/20`, 80, 390 + i * 30);
    });

    // Message
    ctx.font = 'bold 18px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'left';
    ctx.fillText('Your EI Level:', 60, 530);

    ctx.font = '14px "DM Sans"';
    ctx.fillStyle = '#525252';
    ctx.fillText(category.advice, 80, 570);

    // Growth tips
    ctx.font = 'bold 14px "DM Sans"';
    ctx.fillStyle = '#1a1a1a';
    ctx.fillText('Growth Tips:', 60, 630);

    ctx.font = '12px "DM Sans"';
    ctx.fillStyle = '#525252';
    const tips = [
      'Practice mindfulness to increase emotional awareness',
      'Reflect on how emotions influence your decisions',
      'Seek feedback on how you impact others emotionally',
      'Work on emotional regulation through breathing and pausing',
    ];
    tips.forEach((tip, i) => {
      ctx.fillText('• ' + tip, 80, 670 + i * 30);
    });

    // Disclaimer
    ctx.font = '11px "DM Sans"';
    ctx.fillStyle = '#a3a3a3';
    ctx.textAlign = 'left';
    ctx.fillText('This is a self-assessment for personal reflection, not a clinical measure.', 60, 920);

    // Watermark
    ctx.font = 'bold 14px "DM Sans"';
    ctx.fillStyle = 'rgba(180, 83, 9, 0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('mykit.tools', 400, 970);

    // Download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `ei-assessment-${new Date().toISOString().split('T')[0]}.png`;
    link.click();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(20).fill(null));
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const domainScores = calculateDomainScores();
    const total = getTotalScore(domainScores);
    const category = getOverallCategory(total);

    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-2">Your Results</h2>
            <p className="text-text-secondary">Emotional Intelligence Assessment</p>
          </div>

          <div className="bg-gradient-to-br from-amber-900 to-orange-100 rounded-lg p-8 mb-8 border border-orange-300">
            <div className="text-center">
              <p className="text-white text-sm mb-2">Total Score</p>
              <p className="font-mono text-6xl font-bold mb-2" style={{ color: category.color }}>
                {total}
              </p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {category.level}
              </p>
              <p className="text-white text-sm mt-3">out of 80</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg text-text-primary mb-4">Domain Breakdown</h3>
            <div className="space-y-4">
              {[
                { key: 'perceiving', name: 'Perceiving Emotions', description: 'Ability to recognize emotions in yourself and others' },
                { key: 'using', name: 'Using Emotions', description: 'Ability to use emotions to enhance thinking and actions' },
                { key: 'understanding', name: 'Understanding Emotions', description: 'Ability to understand emotional patterns and causes' },
                { key: 'managing', name: 'Managing Emotions', description: 'Ability to regulate and respond to emotions constructively' },
              ].map((domain) => (
                <div key={domain.key} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-text-primary">{domain.name}</h4>
                    <p className="font-mono font-bold text-lg" style={{ color: domains[domain.key].color }}>
                      {domainScores[domain.key]}/20
                    </p>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{domain.description}</p>
                  <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${(domainScores[domain.key] / 20) * 100}%`,
                        backgroundColor: domains[domain.key].color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
              <span className="text-blue-600">📈</span>
              Developing Your EI
            </h3>
            <ul className="space-y-3 text-text-secondary list-disc list-inside">
              <li>Practice mindfulness and emotional awareness daily</li>
              <li>Notice how your emotions affect your decisions and behaviour</li>
              <li>Ask trusted people for honest feedback on your emotional impact</li>
              <li>Develop strategies for managing stress (breathing, exercise, reflection)</li>
              <li>Read about psychology and emotional patterns</li>
              <li>Seek diverse social interactions and practice empathy</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg text-text-primary mb-4">About This Assessment</h3>
            <p className="text-text-secondary mb-4">
              This assessment is based on Salovey & Mayer's framework of emotional intelligence, which includes perceiving, using, understanding, and managing emotions.
            </p>
            <p className="text-text-secondary font-semibold">
              This is a self-assessment for personal reflection only, not a clinical diagnostic tool.
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
        </Card>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

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
          <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-3">
            {domains[currentQuestionData.domain].name}
          </p>
          <h2 className="text-lg font-bold text-text-primary">
            {currentQuestionData.question}
          </h2>
        </div>

        <div className="space-y-3 mb-8">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQuestion] === index
                  ? 'border-accent bg-blue-50'
                  : 'border-border bg-white hover:border-blue-300'
              }`}
            >
              <span className="text-text-secondary">{option.text}</span>
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
          Based on Salovey & Mayer's emotional intelligence framework. Self-assessment for personal reflection.
        </p>
      </Card>
    </div>
  );
};

export default EmotionalIntelligenceQuiz;
