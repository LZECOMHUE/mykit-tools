'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function CountryQuiz() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizMode, setQuizMode] = useState('flag'); // flag, capital
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flag,flags,capital,population,cca2'
        );
        const data = await res.json();
        setCountries(data.filter(c => c.capital && c.capital.length > 0));
      } catch (err) {
        console.error('Failed to load countries');
      }
      setLoading(false);
    };

    fetchCountries();
  }, []);

  const getRandomCountries = (count) => {
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const generateQuestion = () => {
    const options = getRandomCountries(4);
    const correctIndex = Math.floor(Math.random() * 4);
    return { options, correctIndex };
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setQuestion(generateQuestion());
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setQuestion(null);
  };

  const handleAnswer = (index) => {
    if (answered || !question) return;
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === question.correctIndex) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(q => q + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setQuestion(generateQuestion());
    } else {
      setQuizStarted(false);
    }
  };

  const modeOptions = [
    { value: 'flag', label: '🚩 Flag Quiz' },
    { value: 'capital', label: '🏛 Capital Quiz' },
  ];

  if (loading) return <div className="bg-surface border border-border rounded-xl p-4"><p className="text-text-secondary">Loading countries...</p></div>;
  if (countries.length === 0) return <div className="bg-surface border border-border rounded-xl p-4"><p className="text-error">Failed to load countries</p></div>;

  if (!quizStarted) {
    return (
      <div className="bg-surface border border-border rounded-xl p-4 space-y-4">
        <p className="text-text-secondary text-sm">Test your geography knowledge!</p>

        <div>
          <p className="text-xs font-medium text-text-secondary mb-2">Quiz mode</p>
          <div className="flex flex-wrap gap-1.5">
            {modeOptions.map((o) => (
              <button
                key={o.value}
                onClick={() => setQuizMode(o.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  quizMode === o.value
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {score > 0 && (
          <div className="text-center">
            <p className="text-xs text-text-secondary mb-2">Last round results</p>
            <div className="flex justify-center gap-4">
              <div className="bg-success/10 px-4 py-2 rounded-lg">
                <p className="font-mono text-2xl font-bold text-success">{score}</p>
                <p className="text-xs text-success">Correct</p>
              </div>
              <div className="bg-accent-muted px-4 py-2 rounded-lg">
                <p className="font-mono text-2xl font-bold text-accent">{streak}</p>
                <p className="text-xs text-accent">Best Streak</p>
              </div>
            </div>
          </div>
        )}

        <Button onClick={startQuiz} className="w-full">
          Start Quiz (10 Questions)
        </Button>
      </div>
    );
  }

  if (!question) return null;

  const correct = question.options[question.correctIndex];
  const isAnswerCorrect = selectedAnswer === question.correctIndex;

  return (
    <div className="bg-surface border border-border rounded-xl p-4 space-y-4">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-secondary">
            Question {currentQuestion + 1} of 10
          </span>
          <span className="font-mono font-bold text-accent">
            {score} correct
          </span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center py-4">
        {quizMode === 'flag' && (
          <>
            <p className="text-sm text-text-secondary mb-4">What country is this?</p>
            {correct.flags?.svg ? (
              <img
                src={correct.flags.svg}
                alt={correct.flags.alt || 'Country flag'}
                className="mx-auto h-32 w-auto rounded shadow-sm border border-border"
              />
            ) : (
              <p className="text-6xl">{correct.flag}</p>
            )}
          </>
        )}
        {quizMode === 'capital' && (
          <>
            <p className="text-sm text-text-secondary mb-4">Which country has this capital?</p>
            <p className="font-heading text-2xl font-bold text-text-primary">
              {correct.capital[0]}
            </p>
          </>
        )}
      </div>

      {/* Streak display */}
      {streak > 0 && (
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-sm font-medium text-success">
            🔥 Streak: {streak}
          </p>
        </div>
      )}

      {/* Answer options */}
      <div className="space-y-2">
        {question.options.map((country, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={answered}
            className={`w-full p-3 text-left rounded-lg border-2 transition font-medium ${
              !answered
                ? 'border-border hover:border-accent cursor-pointer'
                : selectedAnswer === index
                ? index === question.correctIndex
                  ? 'border-success bg-success/10'
                  : 'border-error bg-error/10'
                : index === question.correctIndex
                ? 'border-success bg-success/10'
                : 'border-border opacity-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {quizMode === 'capital' && country.flag && (
                <span className="text-xl leading-none">{country.flag}</span>
              )}
              <span className="text-text-primary">{country.name.common}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {answered && (
        <div className={`p-3 rounded-lg text-sm ${isAnswerCorrect ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
          {isAnswerCorrect ? (
            <p className="font-medium">✓ Correct! {correct.name.common}</p>
          ) : (
            <p className="font-medium">✗ Wrong! The answer is {correct.name.common}</p>
          )}
        </div>
      )}

      {/* Next button */}
      {answered && currentQuestion < 9 && (
        <Button onClick={nextQuestion} className="w-full">
          Next Question
        </Button>
      )}

      {/* Results screen */}
      {answered && currentQuestion === 9 && (
        <div className="text-center space-y-4">
          <div className="font-heading text-2xl font-bold text-text-primary">Quiz Complete!</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-success/10 p-4 rounded-lg">
              <p className="font-mono text-3xl font-bold text-success">{score}</p>
              <p className="text-xs text-success">Correct Answers</p>
            </div>
            <div className="bg-accent-muted p-4 rounded-lg">
              <p className="font-mono text-3xl font-bold text-accent">{Math.round((score / 10) * 100)}%</p>
              <p className="text-xs text-accent">Score</p>
            </div>
          </div>
          <Button onClick={resetQuiz} className="w-full">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
