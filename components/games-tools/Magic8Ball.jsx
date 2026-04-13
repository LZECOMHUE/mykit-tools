'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const RESPONSES = {
  positive: [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'You may rely on it',
  ],
  neutral: [
    'Reply hazy, try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
  ],
  negative: [
    'Don\'t count on it',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful',
    'Absolutely not',
  ],
};

const ALL_RESPONSES = [
  ...RESPONSES.positive,
  ...RESPONSES.neutral,
  ...RESPONSES.negative,
];

export default function Magic8Ball() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [history, setHistory] = useState([]);

  const askQuestion = () => {
    if (!question.trim()) return;

    setIsShaking(true);
    setAnswer(null);

    setTimeout(() => {
      const randomAnswer =
        ALL_RESPONSES[Math.floor(Math.random() * ALL_RESPONSES.length)];
      setAnswer(randomAnswer);
      setHistory((prev) => [randomAnswer, ...prev.slice(0, 9)]);
      setIsShaking(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      askQuestion();
    }
  };

  const answerType = answer
    ? RESPONSES.positive.includes(answer)
      ? 'positive'
      : RESPONSES.neutral.includes(answer)
        ? 'neutral'
        : 'negative'
    : null;

  const answerColour =
    answerType === 'positive'
      ? 'from-emerald-400 to-teal-500'
      : answerType === 'neutral'
        ? 'from-amber-400 to-orange-500'
        : 'from-rose-400 to-red-500';

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="space-y-4">
          <Input
            label="Ask your question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a yes/no question..."
          />

          <Button
            onClick={askQuestion}
            disabled={isShaking || !question.trim()}
            className="w-full"
            size="lg"
          >
            {isShaking ? 'Shaking...' : 'Ask the Magic 8-Ball'}
          </Button>
        </div>
      </Card>

      {/* Magic 8-Ball Visual */}
      <div className="flex justify-center py-4">
        <div className="relative">
          <style>{`
            @keyframes shake {
              0%, 100% { transform: rotate(0deg) translateX(0); }
              25% { transform: rotate(-8deg) translateX(-3px); }
              50% { transform: rotate(8deg) translateX(3px); }
              75% { transform: rotate(-5deg) translateX(-2px); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            .ball {
              animation: ${isShaking ? 'shake 0.15s infinite' : 'float 3s ease-in-out infinite'};
            }
          `}</style>

          <div className="ball w-40 h-40 rounded-full bg-gradient-to-br from-gray-900 to-black shadow-2xl flex items-center justify-center border-4 border-gray-800">
            {/* Window/Triangle on ball */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center">
                {answer ? (
                  <p className={`text-white font-heading font-bold text-center text-sm px-3 bg-gradient-to-br ${answerColour} rounded-full px-4 py-2`}>
                    {answer}
                  </p>
                ) : (
                  <div className="text-white text-4xl opacity-50">?</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Display */}
      {answer && (
        <Card
          hover
          className={`bg-gradient-to-br ${answerColour} text-white`}
        >
          <div className="text-center space-y-2">
            <p className="text-sm opacity-90">The Magic 8-Ball says...</p>
            <p className="font-heading text-3xl font-bold">{answer}</p>
          </div>
        </Card>
      )}

      {/* History */}
      {history.length > 0 && (
        <Card>
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Recent Answers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {history.map((response, idx) => {
                const type = RESPONSES.positive.includes(response)
                  ? 'positive'
                  : RESPONSES.neutral.includes(response)
                    ? 'neutral'
                    : 'negative';
                const colour =
                  type === 'positive'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : type === 'neutral'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200';

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-sm font-mono ${colour}`}
                  >
                    {response}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Info */}
      <details className="text-xs text-text-muted">
        <summary className="cursor-pointer hover:text-text-secondary">About this tool</summary>
        <p className="mt-2">The Magic 8-Ball is a mystical toy that answers yes/no questions. Ask
          a clear question and let fate decide your answer. For entertainment
          only.</p>
      </details>
    </div>
  );
}
