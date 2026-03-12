"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

const TRIVIA = {
  general: [
    { q: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Madrid"], correct: 1 },
    { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Leonardo da Vinci", "Michelangelo", "Raphael"], correct: 1 },
    { q: "What is the largest planet in our solar system?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], correct: 1 },
    { q: "In what year did the Titanic sink?", options: ["1912", "1920", "1905", "1915"], correct: 0 },
    { q: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "Liechtenstein", "San Marino"], correct: 1 },
    { q: "Who is the author of Harry Potter?", options: ["J.K. Rowling", "J.R.R. Tolkien", "George R.R. Martin", "Stephen King"], correct: 0 },
    { q: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
    { q: "What is the capital of Japan?", options: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"], correct: 1 },
    { q: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
    { q: "Who is the fastest land animal?", options: ["Lion", "Gazelle", "Cheetah", "Greyhound"], correct: 2 },
  ],
  science: [
    { q: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
    { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Lysosome"], correct: 1 },
    { q: "What is the speed of light?", options: ["300,000 m/s", "150,000 m/s", "200,000 m/s", "400,000 m/s"], correct: 0 },
    { q: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
    { q: "What is the most abundant element in the universe?", options: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"], correct: 3 },
    { q: "How many bones are in the adult human body?", options: ["186", "206", "226", "246"], correct: 1 },
    { q: "What is the boiling point of water?", options: ["50°C", "75°C", "100°C", "125°C"], correct: 2 },
    { q: "What is the study of rocks called?", options: ["Biology", "Geology", "Astronomy", "Botany"], correct: 1 },
    { q: "What are the three states of matter?", options: ["Solid, Liquid, Air", "Solid, Liquid, Gas", "Solid, Vapor, Liquid", "Hard, Soft, Gas"], correct: 1 },
    { q: "How many chromosomes do humans have?", options: ["23", "46", "69", "92"], correct: 1 },
  ],
  history: [
    { q: "In what year did World War 2 end?", options: ["1943", "1944", "1945", "1946"], correct: 2 },
    { q: "Who was the first President of the United States?", options: ["Jefferson", "Washington", "Lincoln", "Madison"], correct: 1 },
    { q: "When was the Declaration of Independence signed?", options: ["1774", "1775", "1776", "1777"], correct: 2 },
    { q: "Which empire built Machu Picchu?", options: ["Aztec", "Maya", "Inca", "Olmec"], correct: 2 },
    { q: "In what year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correct: 2 },
    { q: "Who was the first King of England?", options: ["William the Conqueror", "Alfred the Great", "Edward the Confessor", "Ethelred"], correct: 0 },
    { q: "When did the Renaissance begin?", options: ["12th century", "13th century", "14th century", "15th century"], correct: 2 },
    { q: "Who was Napoleon Bonaparte?", options: ["A Russian general", "A French military leader", "A British general", "A Spanish diplomat"], correct: 1 },
    { q: "What year did the Magna Carta get signed?", options: ["1200", "1215", "1225", "1235"], correct: 1 },
    { q: "When did the Industrial Revolution begin?", options: ["1600s", "1700s", "1800s", "1900s"], correct: 1 },
  ],
  geography: [
    { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
    { q: "How many countries are in the European Union?", options: ["25", "27", "29", "31"], correct: 1 },
    { q: "What is the largest desert in the world?", options: ["Kalahari", "Arabian", "Sahara", "Gobi"], correct: 2 },
    { q: "Which river flows through Egypt?", options: ["Amazon", "Yangtze", "Nile", "Danube"], correct: 2 },
    { q: "What is the capital of Brazil?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], correct: 2 },
    { q: "Which country is the least densely populated?", options: ["Canada", "Australia", "Greenland", "Mongolia"], correct: 2 },
    { q: "What is the highest mountain in North America?", options: ["Mount Whitney", "Mount Denali", "Mount Kilimanjaro", "Mount Rainier"], correct: 1 },
    { q: "How many Great Lakes are there?", options: ["3", "4", "5", "6"], correct: 2 },
    { q: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Montreal", "Ottawa"], correct: 3 },
    { q: "Which desert is the hottest in the world?", options: ["Sahara", "Death Valley", "Atacama", "Kalahari"], correct: 0 },
  ],
  popculture: [
    { q: "What year did Avatar come out?", options: ["2007", "2008", "2009", "2010"], correct: 2 },
    { q: "Who is the main character in The Office?", options: ["Jim Halpert", "Pam Beesly", "Michael Scott", "Dwight Schrute"], correct: 2 },
    { q: "What is the name of the coffee shop in Friends?", options: ["The Café", "Central Perk", "Friend's Café", "The Coffee House"], correct: 1 },
    { q: "In which city is Hogwarts located?", options: ["London", "Edinburgh", "Scotland", "It's fictional"], correct: 3 },
    { q: "How many episodes are in the first season of Game of Thrones?", options: ["8", "9", "10", "12"], correct: 2 },
    { q: "Who is the main character in Breaking Bad?", options: ["Jesse Pinkman", "Walter White", "Hank Schrader", "Mike Ehrmantraut"], correct: 1 },
    { q: "What is the name of SpongeBob's best friend?", options: ["Squidward", "Patrick", "Mr. Krabs", "Sandy"], correct: 1 },
    { q: "What is the superhero name of Bruce Wayne?", options: ["Superman", "Batman", "Ironman", "Hawkeye"], correct: 1 },
    { q: "In which country is Taylor Swift from?", options: ["UK", "Canada", "USA", "Australia"], correct: 2 },
    { q: "What is the name of Simba's father in The Lion King?", options: ["Scar", "Mufasa", "Zazu", "Nala"], correct: 1 },
  ],
};

export default function TriviaQuiz() {
  const [category, setCategory] = useState("general");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = useMemo(() => {
    const q = TRIVIA[category] || TRIVIA.general;
    return q.sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [category]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
  };

  const handleAnswer = (optionIndex) => {
    const question = questions[currentQuestion];
    const isCorrect = optionIndex === question.correct;

    setAnswers([...answers, { ...question, selected: optionIndex, correct: isCorrect }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
  };

  if (!quizStarted) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="space-y-4">
            <Select
              label="Choose Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "general", label: "General Knowledge" },
                { value: "science", label: "Science" },
                { value: "history", label: "History" },
                { value: "geography", label: "Geography" },
                { value: "popculture", label: "Pop Culture" },
              ]}
            />

            <Button onClick={startQuiz} size="lg" className="w-full">
              Start Quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-6">
        <Card hover className="bg-gradient-to-br from-green-50 to-emerald-50 text-center space-y-4">
          <p className="text-sm text-text-secondary font-semibold">Quiz Complete!</p>
          <p className="font-heading text-4xl font-bold text-text-primary">
            {score}/{questions.length}
          </p>
          <p className="text-2xl font-semibold text-accent">
            {percentage}%
          </p>
          <p className="text-sm text-text-secondary">
            {percentage >= 80
              ? "Excellent!"
              : percentage >= 60
                ? "Good job!"
                : percentage >= 40
                  ? "Not bad!"
                  : "Better luck next time!"}
          </p>

          <Button onClick={resetQuiz} size="lg" className="w-full">
            Try Again
          </Button>
        </Card>

        <div className="space-y-2">
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            Review Answers
          </h3>
          {answers.map((ans, idx) => (
            <Card
              key={idx}
              className={ans.correct ? "border-success" : "border-error"}
            >
              <div className="space-y-2">
                <p className="font-semibold text-text-primary text-sm">
                  Q{idx + 1}. {ans.q}
                </p>
                <div className="space-y-1">
                  {ans.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`text-xs p-1 rounded ${
                        i === ans.selected
                          ? ans.correct
                            ? "bg-success/10 text-success"
                            : "bg-error/10 text-error"
                          : i === ans.correct
                            ? "bg-success/10 text-success"
                            : "text-text-secondary"
                      }`}
                    >
                      {i === ans.correct && ans.selected !== i && "✓ "}
                      {i === ans.selected && !ans.correct && "✗ "}
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-text-secondary">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <p className="font-semibold text-accent">Score: {score}</p>
          </div>

          <div className="w-full bg-surface rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      <Card hover className="bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            {question.q}
          </h3>

          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <Button
                key={idx}
                variant="secondary"
                onClick={() => handleAnswer(idx)}
                className="w-full text-left"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
