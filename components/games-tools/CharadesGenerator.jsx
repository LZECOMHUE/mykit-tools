"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

const CHARADES = {
  movies: [
    "Titanic", "The Lion King", "Jaws", "Back to the Future", "Ghostbusters",
    "E.T.", "Jurassic Park", "Avatar", "Avengers", "Frozen",
    "Cinderella", "Beauty and the Beast", "The Wizard of Oz", "Casablanca", "Pulp Fiction",
    "The Matrix", "Inception", "Interstellar", "The Dark Knight", "Forrest Gump",
  ],
  tv: [
    "The Office", "Friends", "Breaking Bad", "Game of Thrones", "The Crown",
    "Stranger Things", "The Mandalorian", "SpongeBob SquarePants", "The Simpsons", "Grey's Anatomy",
    "The Walking Dead", "Sherlock", "Doctor Who", "Parks and Recreation", "Brooklyn Nine-Nine",
    "Ozark", "The Boys", "Euphoria", "Succession", "The Last of Us",
  ],
  animals: [
    "Cat", "Dog", "Lion", "Elephant", "Penguin",
    "Snake", "Monkey", "Giraffe", "Dolphin", "Butterfly",
    "Bear", "Kangaroo", "Octopus", "Flamingo", "Crocodile",
    "Cheetah", "Owl", "Sloth", "Panda", "Shark",
  ],
  actions: [
    "Swimming", "Cooking", "Dancing", "Running", "Sleeping",
    "Brushing teeth", "Playing guitar", "Fishing", "Skiing", "Boxing",
    "Painting", "Yoga", "Weight lifting", "Gardening", "Snoring",
    "Crying", "Laughing", "Typing", "Fixing a car", "Taking a photo",
  ],
  objects: [
    "Bicycle", "Piano", "Umbrella", "Ladder", "Suitcase",
    "Microwave", "Skateboard", "Telescope", "Camera", "Skateboard",
    "Laptop", "Phone", "Airplane", "Train", "Boat",
    "Rocket", "House", "Bridge", "Book", "Television",
  ],
};

const DIFFICULTIES = {
  easy: { timerSeconds: 90, description: "Well-known things, easier to act out" },
  medium: { timerSeconds: 60, description: "Mix of common and less obvious items" },
  hard: { timerSeconds: 45, description: "Challenging, obscure, or tricky items" },
};

export default function CharadesGenerator() {
  const [category, setCategory] = useState("movies");
  const [difficulty, setDifficulty] = useState("medium");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [roundCount, setRoundCount] = useState(1);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
  }, [timeLeft, isRunning]);

  const getNewPrompt = () => {
    const list = CHARADES[category] || CHARADES.movies;
    const selected = list[Math.floor(Math.random() * list.length)];
    setCurrentPrompt(selected);
  };

  const startTimer = () => {
    const timer = DIFFICULTIES[difficulty].timerSeconds;
    setTimeLeft(timer);
    setIsRunning(true);
  };

  const handleNextRound = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setCurrentPrompt("");
    setRoundCount(roundCount + 1);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentPrompt("");
    setTimeLeft(0);
    setIsRunning(false);
    setRoundCount(1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!gameStarted) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-red-50 to-orange-50">
          <div className="space-y-4">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "movies", label: "Movies & Shows" },
                { value: "tv", label: "TV Shows" },
                { value: "animals", label: "Animals" },
                { value: "actions", label: "Actions" },
                { value: "objects", label: "Objects" },
              ]}
            />

            <Select
              label="Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              options={[
                { value: "easy", label: "Easy (90 sec)" },
                { value: "medium", label: "Medium (60 sec)" },
                { value: "hard", label: "Hard (45 sec)" },
              ]}
              helper={DIFFICULTIES[difficulty].description}
            />

            <Button
              onClick={() => setGameStarted(true)}
              size="lg"
              className="w-full"
            >
              Start Game
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-50 to-orange-50">
        <div className="space-y-3 text-center">
          <p className="text-sm text-text-secondary">Round {roundCount}</p>

          <div
            className={`text-6xl font-mono font-bold ${
              timeLeft === 0
                ? "text-error"
                : timeLeft <= 10
                  ? "text-warning"
                  : "text-accent"
            }`}
          >
            {formatTime(timeLeft)}
          </div>

          <div className="flex gap-2">
            {!isRunning && currentPrompt === "" && (
              <Button onClick={getNewPrompt} variant="secondary" className="flex-1">
                Get Prompt
              </Button>
            )}

            {!isRunning && currentPrompt !== "" && (
              <Button onClick={startTimer} className="flex-1">
                Start Timer
              </Button>
            )}

            {isRunning && (
              <Button
                onClick={() => setIsRunning(false)}
                variant="secondary"
                className="flex-1"
              >
                Pause
              </Button>
            )}

            {currentPrompt && isRunning === false && timeLeft > 0 && (
              <Button
                onClick={() => setIsRunning(true)}
                variant="secondary"
                className="flex-1"
              >
                Resume
              </Button>
            )}
          </div>
        </div>
      </Card>

      {currentPrompt && (
        <Card hover className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-40 flex items-center justify-center">
          <div className="text-center space-y-3">
            <p className="text-sm text-text-secondary font-semibold uppercase">
              Act This Out
            </p>
            <p className="font-heading text-4xl sm:text-5xl font-bold text-text-primary">
              {currentPrompt}
            </p>
            {!isRunning && timeLeft === 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={getNewPrompt}
              >
                Different Prompt →
              </Button>
            )}
          </div>
        </Card>
      )}

      {timeLeft === 0 && currentPrompt !== "" && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 space-y-3">
          <p className="text-center font-semibold text-text-primary">
            Round Complete!
          </p>
          <div className="flex gap-2">
            <Button onClick={handleNextRound} className="flex-1">
              Next Round
            </Button>
            <Button
              variant="secondary"
              onClick={resetGame}
              className="flex-1"
            >
              End Game
            </Button>
          </div>
        </Card>
      )}

      {currentPrompt === "" && !isRunning && (
        <Card className="bg-surface text-center">
          <p className="text-sm text-text-secondary mb-3">
            Ready to start?
          </p>
          <Button
            variant="secondary"
            onClick={resetGame}
            className="w-full"
          >
            Back to Settings
          </Button>
        </Card>
      )}
    </div>
  );
}
