'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const FORTUNES = [
  'You will find true love in an unexpected place',
  'A career change brings unexpected happiness',
  'Travel awaits you in the near future',
  'Financial abundance is coming your way',
  'A close friendship will deepen significantly',
  'You will achieve a lifelong dream',
  'A creative project brings recognition',
  'Laughter and joy surround your next month',
  'Someone thinks highly of you right now',
  'Your next adventure will change you',
  'Good news arrives very soon',
  'You will inspire someone today',
  'A pleasant surprise is on the way',
  'Your kindness will be returned tenfold',
  'New opportunities await you',
  'You will make the right choice',
  'Happiness blooms where you plant seeds',
  'Your hard work will pay off',
  'You will meet someone important',
  'Life brings wonderful surprises',
  'An old dream is about to resurface',
  'You will feel proud of yourself soon',
  'Peace and calm enter your life',
  'Your potential is unlimited',
  'You will leave a lasting positive impression',
  'A wish comes true unexpectedly',
  'Your courage will be rewarded',
  'You will find what you are seeking',
  'Success is closer than you think',
  'You will discover something valuable',
  'Love finds you when you stop looking',
  'Your future is bright and full of promise',
];

const COLOURS = [
  { name: 'Red', values: ['passion', 'energy', 'love', 'power', 'courage'] },
  {
    name: 'Blue',
    values: ['peace', 'wisdom', 'truth', 'trust', 'communication'],
  },
  {
    name: 'Green',
    values: ['growth', 'healing', 'renewal', 'abundance', 'harmony'],
  },
  {
    name: 'Yellow',
    values: ['joy', 'optimism', 'creativity', 'success', 'happiness'],
  },
  {
    name: 'Purple',
    values: ['intuition', 'magic', 'spirituality', 'mystery', 'transformation'],
  },
];

export default function FortuneTeller() {
  const [step, setStep] = useState('start'); // start, colour, number1, number2, fortune
  const [selectedColour, setSelectedColour] = useState(null);
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [fortune, setFortune] = useState(null);

  const startGame = () => {
    setStep('colour');
    setSelectedColour(null);
    setFirstNumber(null);
    setSecondNumber(null);
    setFortune(null);
  };

  const selectColour = (colour) => {
    setSelectedColour(colour);
    setTimeout(() => setStep('number1'), 600);
  };

  const selectFirstNumber = (num) => {
    setFirstNumber(num);
    setTimeout(() => setStep('number2'), 600);
  };

  const selectSecondNumber = (num) => {
    setSecondNumber(num);
    setTimeout(() => revealFortune(num), 600);
  };

  const revealFortune = (num) => {
    const fortuneIndex =
      (selectedColour.name.length +
        firstNumber +
        num +
        Math.floor(Math.random() * 10)) %
      FORTUNES.length;
    setFortune(FORTUNES[fortuneIndex]);
    setStep('fortune');
  };

  const reset = () => {
    setStep('start');
    setSelectedColour(null);
    setFirstNumber(null);
    setSecondNumber(null);
    setFortune(null);
  };

  return (
    <div className="space-y-6">
      {step === 'start' && (
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 text-center space-y-4">
          <h2 className="font-heading text-3xl font-bold text-text-primary">
            Fortune Teller
          </h2>
          <p className="text-text-secondary">
            Unfold your fate! Pick a colour, then numbers, and receive your
            fortune.
          </p>
          <Button onClick={startGame} size="lg" className="w-full">
            Begin Your Fortune
          </Button>
        </Card>
      )}

      {step === 'colour' && (
        <Card className="bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
                Step 1: Pick a Colour
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {COLOURS.map((colour) => (
                  <button
                    key={colour.name}
                    onClick={() => selectColour(colour)}
                    className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                  >
                    <div
                      className={`absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity ${
                        colour.name === 'Red'
                          ? 'bg-red-500'
                          : colour.name === 'Blue'
                            ? 'bg-blue-500'
                            : colour.name === 'Green'
                              ? 'bg-emerald-500'
                              : colour.name === 'Yellow'
                                ? 'bg-yellow-500'
                                : 'bg-purple-500'
                      }`}
                    ></div>
                    <div className="relative h-full flex items-center justify-center">
                      <span className="font-heading font-bold text-white text-center text-sm">
                        {colour.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={reset}
              className="w-full"
            >
              Start Over
            </Button>
          </div>
        </Card>
      )}

      {step === 'number1' && selectedColour && (
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-2">You chose:</p>
              <div
                className={`w-12 h-12 rounded-lg mx-auto mb-4 ${
                  selectedColour.name === 'Red'
                    ? 'bg-red-500'
                    : selectedColour.name === 'Blue'
                      ? 'bg-blue-500'
                      : selectedColour.name === 'Green'
                        ? 'bg-emerald-500'
                        : selectedColour.name === 'Yellow'
                          ? 'bg-yellow-500'
                          : 'bg-purple-500'
                }`}
              ></div>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
                Step 2: Pick a Number (1-10)
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => selectFirstNumber(num)}
                    className="aspect-square rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition-colors"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={reset}
              className="w-full"
            >
              Start Over
            </Button>
          </div>
        </Card>
      )}

      {step === 'number2' && firstNumber && (
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-text-secondary mb-2">You chose:</p>
              <div className="flex justify-center gap-2 mb-4">
                <div
                  className={`w-12 h-12 rounded-lg ${
                    selectedColour.name === 'Red'
                      ? 'bg-red-500'
                      : selectedColour.name === 'Blue'
                        ? 'bg-blue-500'
                        : selectedColour.name === 'Green'
                          ? 'bg-emerald-500'
                          : selectedColour.name === 'Yellow'
                            ? 'bg-yellow-500'
                            : 'bg-purple-500'
                  }`}
                ></div>
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  {firstNumber}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
                Step 3: Pick Another Number (1-10)
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => selectSecondNumber(num)}
                    className="aspect-square rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg transition-colors"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={reset}
              className="w-full"
            >
              Start Over
            </Button>
          </div>
        </Card>
      )}

      {step === 'fortune' && fortune && (
        <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 space-y-4 border-2 border-yellow-300">
          <div className="text-center space-y-4">
            <div className="text-5xl">✨</div>
            <h3 className="font-heading text-2xl font-bold text-yellow-900">
              Your Fortune
            </h3>
            <p className="text-lg text-yellow-800 leading-relaxed">
              {fortune}
            </p>

            <div className="bg-white rounded-lg p-4 text-sm text-text-secondary">
              <p className="mb-2 font-medium text-text-primary">Your Journey:</p>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div
                    className={`w-8 h-8 rounded-full mx-auto mb-1 ${
                      selectedColour.name === 'Red'
                        ? 'bg-red-500'
                        : selectedColour.name === 'Blue'
                          ? 'bg-blue-500'
                          : selectedColour.name === 'Green'
                            ? 'bg-emerald-500'
                            : selectedColour.name === 'Yellow'
                              ? 'bg-yellow-500'
                              : 'bg-purple-500'
                    }`}
                  ></div>
                  <p className="text-xs font-mono">{selectedColour.name}</p>
                </div>
                <div className="text-text-muted">→</div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full mx-auto mb-1 bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    {firstNumber}
                  </div>
                </div>
                <div className="text-text-muted">→</div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full mx-auto mb-1 bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {secondNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={reset}
            size="lg"
            className="w-full"
          >
            Get Another Fortune
          </Button>
        </Card>
      )}

      {/* Info */}
      <Card className="bg-orange-50 border-l-4 border-orange-500">
        <p className="text-sm text-text-secondary">
          This digital fortune teller is inspired by the classic paper cootie
          catcher game. Pick colours and numbers to reveal your mysterious
          fortune. For entertainment purposes only.
        </p>
      </Card>
    </div>
  );
}
