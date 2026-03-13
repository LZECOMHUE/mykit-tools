"use client";

import { useState, useMemo } from "react";
import { pubQuizQuestions, categories } from "@/data/games/pub-quiz-questions";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

export default function PubQuizGenerator() {
  const [config, setConfig] = useState({
    rounds: 4,
    questionsPerRound: 5,
    selectedCategories: ["general", "science", "history"],
    difficulty: "mixed",
  });

  const [quiz, setQuiz] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  const generateQuiz = () => {
    const newQuiz = [];

    for (let round = 1; round <= config.rounds; round++) {
      const roundQuestions = [];
      const availableCategories = [...config.selectedCategories];

      for (let i = 0; i < config.questionsPerRound; i++) {
        const randomCategoryIndex = Math.floor(
          Math.random() * availableCategories.length
        );
        const category = availableCategories[randomCategoryIndex];
        const categoryData = pubQuizQuestions[category];

        let difficulty = config.difficulty;
        if (config.difficulty === "mixed") {
          const difficulties = ["easy", "medium", "hard"];
          difficulty = difficulties[Math.floor(Math.random() * 3)];
        }

        const questionsInDifficulty = categoryData[difficulty];
        const question =
          questionsInDifficulty[
            Math.floor(Math.random() * questionsInDifficulty.length)
          ];

        roundQuestions.push({
          number: i + 1,
          question: question.question,
          answer: question.answer,
          category: category,
          difficulty: difficulty,
        });
      }

      newQuiz.push({
        roundNumber: round,
        questions: roundQuestions,
      });
    }

    setQuiz(newQuiz);
    setShowAnswers(false);
  };

  const handleCategoryToggle = (category) => {
    setConfig((prev) => {
      const selected = prev.selectedCategories;
      if (selected.includes(category)) {
        return {
          ...prev,
          selectedCategories: selected.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...selected, category],
        };
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Quiz Configuration
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Number of Rounds: {config.rounds}
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={config.rounds}
              onChange={(e) =>
                setConfig({ ...config, rounds: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Questions per Round: {config.questionsPerRound}
            </label>
            <input
              type="range"
              min="5"
              max="10"
              value={config.questionsPerRound}
              onChange={(e) =>
                setConfig({
                  ...config,
                  questionsPerRound: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <Select
            label="Difficulty"
            value={config.difficulty}
            onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
            options={[
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
              { value: "mixed", label: "Mixed" },
            ]}
          />
        </div>

        <div className="mb-6">
          <label className="text-text-secondary text-sm font-medium block mb-3">
            Select Categories
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.selectedCategories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  className="w-4 h-4"
                />
                <span className="text-text-secondary capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <Button onClick={generateQuiz} className="w-full">
          Generate Quiz
        </Button>
      </Card>

      {quiz && (
        <div className="space-y-4">
          <div className="flex gap-2 justify-between items-center">
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              Your Quiz
            </h2>
            <Button
              onClick={() => setShowAnswers(!showAnswers)}
              variant="secondary"
            >
              {showAnswers ? "Hide Answers" : "Show Answers"}
            </Button>
          </div>

          {quiz.map((round) => (
            <Card key={round.roundNumber}>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
                Round {round.roundNumber}
              </h3>

              <div className="space-y-3">
                {round.questions.map((q) => (
                  <div key={q.number} className="pb-3 border-b border-border last:border-0">
                    <p className="font-mono font-medium text-text-primary">
                      {q.number}. {q.question}
                    </p>
                    {showAnswers && (
                      <p className="text-accent font-mono mt-1 font-medium">
                        Answer: {q.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border text-text-muted text-sm">
                <p>Host Notes: Allow 30-60 seconds per question. Award 1 point per correct answer.</p>
              </div>
            </Card>
          ))}

          <Card className="bg-accent/10 border-accent">
            <h3 className="font-heading font-bold text-accent mb-2">Quiz Summary</h3>
            <p className="text-text-secondary text-sm">
              Total Questions: {quiz.reduce((sum, r) => sum + r.questions.length, 0)} | Total Rounds: {quiz.length}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
