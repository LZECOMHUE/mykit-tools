'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';

export default function CountryQuiz() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizMode, setQuizMode] = useState('flag'); // flag, capital, population
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,cca2'
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

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const getRandomCountries = (count) => {
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const generateQuestion = () => {
    const options = getRandomCountries(4);
    const correctIndex = Math.floor(Math.random() * 4);
    return { options, correctIndex };
  };

  const question = generateQuestion();
  const correct = question.options[question.correctIndex];
  const isAnswerCorrect = selectedAnswer === question.correctIndex;

  const handleAnswer = (index) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === question.correctIndex) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setQuizStarted(false);
    }
  };

  if (loading) return <Card><p className="text-secondary">Loading countries...</p></Card>;
  if (countries.length === 0) return <Card><p className="text-red-600">Failed to load countries</p></Card>;

  if (!quizStarted) {
    return (
      <Card>
        <div className="space-y-4 text-center">
          <div>
            <p className="text-secondary">Test your geography knowledge!</p>
          </div>

          <div className="bg-surface p-4 rounded-lg">
            <p className="text-sm font-medium text-secondary mb-3">Choose quiz mode:</p>
            <Select
              value={quizMode}
              onChange={(e) => setQuizMode(e.target.value)}
              options={[
                { value: 'flag', label: '🚩 Flag Quiz - Guess the country' },
                { value: 'capital', label: '🏛️ Capital Quiz - Guess the capital' },
              ]}
              className="w-full"
            />
          </div>

          {score > 0 && (
            <div className="text-center">
              <p className="text-sm text-secondary mb-2">Last round results:</p>
              <div className="flex justify-center gap-4">
                <div className="bg-green-50 px-4 py-2 rounded-lg">
                  <p className="font-mono text-2xl font-bold text-green-600">{score}</p>
                  <p className="text-xs text-green-700">Correct</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <p className="font-mono text-2xl font-bold text-blue-600">{streak}</p>
                  <p className="text-xs text-blue-700">Best Streak</p>
                </div>
              </div>
            </div>
          )}

          <Button onClick={startQuiz} className="w-full">
            Start Quiz (10 Questions)
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-secondary">
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
              <p className="text-sm text-secondary mb-4">What country is this?</p>
              <p className="text-6xl">{correct.flags[0]}</p>
            </>
          )}
          {quizMode === 'capital' && (
            <>
              <p className="text-sm text-secondary mb-4">Which country has this capital?</p>
              <p className="font-heading text-2xl font-bold text-primary">
                {correct.capital[0]}
              </p>
            </>
          )}
        </div>

        {/* Streak display */}
        {streak > 0 && (
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-700">
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
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : index === question.correctIndex
                  ? 'border-green-500 bg-green-50'
                  : 'border-border opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{country.flags[0]}</span>
                <span className="text-primary">{country.name.common}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`p-3 rounded-lg text-sm ${isAnswerCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {isAnswerCorrect ? (
              <p className="font-medium">✓ Correct! {correct.name.common}</p>
            ) : (
              <p className="font-medium">✗ Wrong! The answer is {correct.name.common}</p>
            )}
          </div>
        )}

        {/* Next button */}
        {answered && (
          <Button onClick={nextQuestion} className="w-full">
            {currentQuestion < 9 ? 'Next Question' : 'See Results'}
          </Button>
        )}

        {/* Results screen */}
        {answered && currentQuestion === 9 && (
          <div className="text-center space-y-4">
            <div className="font-heading text-2xl font-bold text-primary">Quiz Complete!</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-mono text-3xl font-bold text-green-600">{score}</p>
                <p className="text-xs text-green-700">Correct Answers</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-mono text-3xl font-bold text-blue-600">{Math.round((score / 10) * 100)}%</p>
                <p className="text-xs text-blue-700">Score</p>
              </div>
            </div>
            <Button onClick={resetQuiz} className="w-full">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
