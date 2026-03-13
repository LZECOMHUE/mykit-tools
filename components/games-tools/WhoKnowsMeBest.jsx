"use client";

import { useState } from "react";
import { whoKnomesMeQuestions } from "@/data/games/who-knows-me-questions";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function WhoKnowsMeBest() {
  const [questions, setQuestions] = useState(
    whoKnomesMeQuestions.slice(0, 10).map((q) => ({ question: q, answer: "" }))
  );
  const [quiz, setQuiz] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [scores, setScores] = useState(null);

  const addQuestion = () => {
    if (questions.length < whoKnomesMeQuestions.length) {
      setQuestions([...questions, { question: "", answer: "" }]);
    }
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const generateQuiz = () => {
    const validQuestions = questions.filter(
      (q) => q.question && q.answer && q.question !== ""
    );

    if (validQuestions.length < 5) {
      alert("You need at least 5 questions to create the quiz");
      return;
    }

    setQuiz({
      questions: validQuestions,
      quizStarted: false,
    });
    setShowAnswers(false);
  };

  return (
    <div className="space-y-8">
      {!quiz ? (
        <Card>
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
            Create Your Quiz
          </h2>

          <p className="text-text-secondary text-sm mb-6">
            Add 5-20 questions about yourself. Your friends will try to answer them.
          </p>

          <div className="space-y-3 mb-6">
            {questions.map((item, index) => (
              <div key={index} className="space-y-2 pb-4 border-b border-border last:border-0">
                <div className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <label className="text-text-secondary text-xs font-medium">
                      Question {index + 1}
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., What is my favourite colour?"
                      value={item.question}
                      onChange={(e) =>
                        updateQuestion(index, "question", e.target.value)
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Your answer"
                      value={item.answer}
                      onChange={(e) =>
                        updateQuestion(index, "answer", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    onClick={() => removeQuestion(index)}
                    variant="secondary"
                    className="px-3"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={addQuestion}
              disabled={questions.length >= whoKnomesMeQuestions.length}
              variant="secondary"
              className="flex-1"
            >
              Add Question
            </Button>
            <Button onClick={generateQuiz} className="flex-1">
              Create Quiz ({questions.filter((q) => q.question && q.answer).length} questions)
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-text-primary">
                How Well Do You Know Me?
              </h2>
              <Button
                onClick={() => setShowAnswers(!showAnswers)}
                variant={showAnswers ? "primary" : "secondary"}
              >
                {showAnswers ? "Hide Answers" : "Show Answers"}
              </Button>
            </div>

            <p className="text-text-secondary text-sm mb-6">
              Answer these questions about me. See how many you get right!
            </p>

            <div className="space-y-4">
              {quiz.questions.map((item, index) => (
                <div
                  key={index}
                  className="bg-surface border border-border rounded-lg p-4"
                >
                  <p className="font-heading font-bold text-text-primary mb-3">
                    {index + 1}. {item.question}
                  </p>

                  {showAnswers && (
                    <div className="bg-accent/10 border border-accent rounded p-3">
                      <p className="text-text-muted text-xs mb-1">Correct Answer:</p>
                      <p className="font-mono font-bold text-accent">
                        {item.answer}
                      </p>
                    </div>
                  )}

                  {!showAnswers && (
                    <input
                      type="text"
                      placeholder="Your answer..."
                      className="w-full p-2 border border-border rounded text-text-primary"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button
                onClick={() => setQuiz(null)}
                variant="secondary"
                className="w-full"
              >
                Create New Quiz
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
