"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const QUESTIONS = [
  { a: "Fly like an eagle", b: "Swim like a dolphin", a_pct: 65 },
  { a: "Have superpowers but be blind", b: "Be invisible but can't use other superpowers", a_pct: 42 },
  { a: "Time travel to the past", b: "Travel to the future", a_pct: 58 },
  { a: "Always have wet socks", b: "Always have damp armpits", a_pct: 28 },
  { a: "Speak every language fluently", b: "Be able to communicate with animals", a_pct: 71 },
  { a: "Live 200 years as your current age", b: "Live 80 years and relive one year whenever you want", a_pct: 45 },
  { a: "Read everyone's mind", b: "Control people's actions", a_pct: 62 },
  { a: "Have no internet ever", b: "Have no phone ever", a_pct: 35 },
  { a: "Always be cold", b: "Always be hot", a_pct: 58 },
  { a: "See the future but can't change it", b: "Change the past but can't see what happens", a_pct: 51 },
  { a: "Have perfect teeth but bad breath", b: "Have bad teeth but perfect breath", a_pct: 72 },
  { a: "Skip sleep but still get rest", b: "Sleep 12 hours and never be tired", a_pct: 68 },
  { a: "Become really good at your favorite hobby", b: "Become average at everything you try", a_pct: 43 },
  { a: "Always know what people think about you", b: "Know what anyone thinks about anyone else", a_pct: 37 },
  { a: "Never have to work but be bored", b: "Work constantly but be fulfilled", a_pct: 41 },
];

export default function WouldYouRather() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = QUESTIONS[currentIdx];

  const handleChoice = (choice) => {
    setAnswered(true);
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const nextQuestion = () => {
    setCurrentIdx((prev) => (prev + 1) % QUESTIONS.length);
    setRevealed(false);
    setAnswered(false);
  };

  const prevQuestion = () => {
    setCurrentIdx((prev) => (prev - 1 + QUESTIONS.length) % QUESTIONS.length);
    setRevealed(false);
    setAnswered(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="space-y-4 text-center">
          <p className="text-sm text-text-secondary">
            Question {currentIdx + 1} of {QUESTIONS.length}
          </p>
          <h3 className="font-heading text-2xl font-bold text-text-primary">
            Would You Rather...
          </h3>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card
          hover
          className="cursor-pointer transition-all"
          onClick={() => handleChoice("a")}
        >
          <div className="space-y-2 text-center">
            <p className="font-heading text-lg font-semibold text-text-primary">
              {question.a}
            </p>
            {revealed && (
              <div className="pt-3 border-t border-border">
                <p className="text-3xl font-mono font-bold text-blue-600">
                  {question.a_pct}%
                </p>
                <p className="text-xs text-text-secondary">chose this</p>
              </div>
            )}
          </div>
        </Card>

        <Card
          hover
          className="cursor-pointer transition-all"
          onClick={() => handleChoice("b")}
        >
          <div className="space-y-2 text-center">
            <p className="font-heading text-lg font-semibold text-text-primary">
              {question.b}
            </p>
            {revealed && (
              <div className="pt-3 border-t border-border">
                <p className="text-3xl font-mono font-bold text-rose-600">
                  {100 - question.a_pct}%
                </p>
                <p className="text-xs text-text-secondary">chose this</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {!revealed && answered && (
        <Card className="bg-accent-muted border border-accent/20">
          <Button onClick={handleReveal} className="w-full" variant="primary">
            See What % Chose Each
          </Button>
        </Card>
      )}

      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={prevQuestion}
          className="flex-1"
          size="md"
        >
          ← Previous
        </Button>
        <Button
          onClick={nextQuestion}
          className="flex-1"
          size="md"
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
