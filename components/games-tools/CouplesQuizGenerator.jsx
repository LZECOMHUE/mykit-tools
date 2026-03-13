"use client";

import { useState } from "react";
import {
  couplesQuizQuestionsSweet,
  couplesQuizQuestionsFunny,
  couplesQuizQuestionsSpicy,
} from "@/data/games/who-knows-me-questions";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

export default function CouplesQuizGenerator() {
  const [config, setConfig] = useState({
    relationshipType: "long-term",
    numberOfQuestions: 10,
    tone: "sweet",
    person1Name: "Partner 1",
    person2Name: "Partner 2",
  });

  const [quiz, setQuiz] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(1);

  const getQuestionsByTone = () => {
    switch (config.tone) {
      case "funny":
        return couplesQuizQuestionsFunny;
      case "spicy":
        return couplesQuizQuestionsSpicy;
      default:
        return couplesQuizQuestionsSweet;
    }
  };

  const generateQuiz = () => {
    const availableQuestions = getQuestionsByTone();

    const selectedQuestions = [];
    const usedIndices = new Set();

    while (
      selectedQuestions.length <
      Math.min(config.numberOfQuestions, availableQuestions.length)
    ) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      if (!usedIndices.has(randomIndex)) {
        selectedQuestions.push(availableQuestions[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    setQuiz({
      person1: config.person1Name,
      person2: config.person2Name,
      questions: selectedQuestions.map((q, idx) => ({
        ...q,
        number: idx + 1,
      })),
      tone: config.tone,
    });
    setShowAnswers(false);
    setCurrentPerson(1);
  };

  return (
    <div className="space-y-8">
      {!quiz ? (
        <Card>
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
            Couples Quiz Configuration
          </h2>

          <div className="space-y-4 mb-6">
            <Input
              label="Partner 1 Name"
              type="text"
              value={config.person1Name}
              onChange={(e) =>
                setConfig({ ...config, person1Name: e.target.value })
              }
            />

            <Input
              label="Partner 2 Name"
              type="text"
              value={config.person2Name}
              onChange={(e) =>
                setConfig({ ...config, person2Name: e.target.value })
              }
            />

            <Select
              label="Relationship Type"
              value={config.relationshipType}
              onChange={(e) =>
                setConfig({ ...config, relationshipType: e.target.value })
              }
              options={[
                { value: "new-couple", label: "New Couple (less than 6 months)" },
                { value: "long-term", label: "Long-term (1-5 years)" },
                { value: "married", label: "Married (5+ years)" },
              ]}
            />

            <Select
              label="Quiz Tone"
              value={config.tone}
              onChange={(e) => setConfig({ ...config, tone: e.target.value })}
              options={[
                { value: "sweet", label: "Sweet & Romantic" },
                { value: "funny", label: "Funny & Cheeky" },
                { value: "spicy", label: "Spicy & Intimate" },
              ]}
            />

            <div>
              <label className="text-text-secondary text-sm font-medium block mb-2">
                Number of Questions: {config.numberOfQuestions}
              </label>
              <input
                type="range"
                min="10"
                max="20"
                step="5"
                value={config.numberOfQuestions}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    numberOfQuestions: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>
          </div>

          <Button onClick={generateQuiz} className="w-full">
            Generate Couples Quiz
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-text-primary">
                  How Well Do You Know Me?
                </h2>
                <p className="text-text-secondary text-sm mt-1">
                  {quiz.person1} vs {quiz.person2}
                </p>
              </div>
              <Button
                onClick={() => setShowAnswers(!showAnswers)}
                variant={showAnswers ? "primary" : "secondary"}
              >
                {showAnswers ? "Hide Answers" : "Show Answers"}
              </Button>
            </div>

            <div className="flex gap-2 mb-6">
              <Button
                onClick={() => setCurrentPerson(1)}
                className={`flex-1 ${
                  currentPerson === 1 ? "bg-accent text-white" : ""
                }`}
                variant={currentPerson === 1 ? "primary" : "secondary"}
              >
                {quiz.person1}'s Answers
              </Button>
              <Button
                onClick={() => setCurrentPerson(2)}
                className={`flex-1 ${
                  currentPerson === 2 ? "bg-accent text-white" : ""
                }`}
                variant={currentPerson === 2 ? "primary" : "secondary"}
              >
                {quiz.person2}'s Answers
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              {quiz.questions.map((q) => (
                <div
                  key={q.number}
                  className="bg-surface border border-border rounded-lg p-4"
                >
                  <p className="font-heading font-bold text-text-primary mb-3">
                    {q.number}. {q.question}
                  </p>

                  {showAnswers && (
                    <div className="bg-accent/10 border border-accent rounded p-3">
                      <p className="text-accent font-mono font-bold text-sm">
                        Expected: {q.question}
                      </p>
                    </div>
                  )}

                  {!showAnswers && (
                    <input
                      type="text"
                      placeholder={`${
                        currentPerson === 1 ? quiz.person1 : quiz.person2
                      }'s answer...`}
                      className="w-full p-2 border border-border rounded text-text-primary"
                    />
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={() => setQuiz(null)}
              variant="secondary"
              className="w-full"
            >
              Create New Quiz
            </Button>
          </Card>

          <Card className="bg-accent/10 border-accent">
            <p className="text-accent font-heading font-bold mb-2">Scoring Tip</p>
            <p className="text-text-secondary text-sm">
              Award 1 point for each correct answer. Closest match wins the round!
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
