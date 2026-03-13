"use client";

import { useState, useEffect } from "react";
import { scattergoriesCategories } from "@/data/games/scattergories-categories";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScattergoriesListGenerator() {
  const [config, setConfig] = useState({
    rounds: 3,
    categoryMode: "random",
    customCategories: "",
    roundDuration: 60,
  });

  const [game, setGame] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const generateGame = () => {
    const newGame = [];
    let categoriesToUse =
      config.categoryMode === "random"
        ? scattergoriesCategories
        : config.customCategories
            .split("\n")
            .map((c) => c.trim())
            .filter((c) => c);

    for (let round = 0; round < config.rounds; round++) {
      const letter = ALPHABET[Math.floor(Math.random() * 26)];
      const roundCategories = [];

      for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * categoriesToUse.length);
        roundCategories.push(categoriesToUse[randomIndex]);
      }

      newGame.push({
        roundNumber: round + 1,
        letter,
        categories: roundCategories,
        score: 0,
      });
    }

    setGame(newGame);
    setCurrentRound(0);
    setTimeLeft(config.roundDuration);
    setIsRunning(false);
  };

  const startRound = () => {
    setTimeLeft(config.roundDuration);
    setIsRunning(true);
  };

  const nextRound = () => {
    if (currentRound < game.length - 1) {
      setCurrentRound(currentRound + 1);
      setTimeLeft(config.roundDuration);
      setIsRunning(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Game Configuration
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Number of Rounds: {config.rounds}
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={config.rounds}
              onChange={(e) =>
                setConfig({ ...config, rounds: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <Select
            label="Category Mode"
            value={config.categoryMode}
            onChange={(e) =>
              setConfig({ ...config, categoryMode: e.target.value })
            }
            options={[
              { value: "random", label: "Random Categories" },
              { value: "custom", label: "Custom Categories" },
            ]}
          />

          {config.categoryMode === "custom" && (
            <div>
              <label className="text-text-secondary text-sm font-medium block mb-2">
                Enter Custom Categories (one per line)
              </label>
              <textarea
                value={config.customCategories}
                onChange={(e) =>
                  setConfig({ ...config, customCategories: e.target.value })
                }
                placeholder="Books&#10;Movies&#10;Animals..."
                className="w-full h-20 p-3 border border-border rounded-lg text-text-primary"
              />
            </div>
          )}

          <Select
            label="Round Duration"
            value={config.roundDuration}
            onChange={(e) =>
              setConfig({ ...config, roundDuration: parseInt(e.target.value) })
            }
            options={[
              { value: 60, label: "60 seconds" },
              { value: 90, label: "90 seconds" },
              { value: 120, label: "120 seconds" },
            ]}
          />
        </div>

        <Button onClick={generateGame} className="w-full">
          Generate Game
        </Button>
      </Card>

      {game && (
        <div className="space-y-4">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-text-primary">
                Round {currentRound + 1} of {game.length}
              </h2>
              <div className="text-right">
                <p className="text-text-secondary text-sm">Progress</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  {currentRound + 1}/{game.length}
                </p>
              </div>
            </div>

            <div className="bg-accent/10 border-2 border-accent rounded-lg p-6 mb-6 text-center">
              <p className="text-text-secondary text-sm mb-2">Starting Letter</p>
              <p className="font-mono text-6xl font-bold text-accent">
                {game[currentRound].letter}
              </p>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {game[currentRound].categories.map((category, idx) => (
                  <div
                    key={idx}
                    className="bg-surface border border-border rounded-lg p-4"
                  >
                    <p className="font-mono text-text-primary font-medium">
                      {idx + 1}. {category}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 mb-6 text-center">
              <p className="text-text-secondary text-sm mb-2">Time Remaining</p>
              <p className="font-mono text-4xl font-bold text-text-primary">
                {formatTime(timeLeft || config.roundDuration)}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              {!isRunning && timeLeft === config.roundDuration && (
                <Button onClick={startRound} className="flex-1">
                  Start Round
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
              {!isRunning && timeLeft < config.roundDuration && (
                <Button
                  onClick={startRound}
                  variant="secondary"
                  className="flex-1"
                >
                  Resume
                </Button>
              )}
              {!isRunning && (
                <Button
                  onClick={nextRound}
                  disabled={currentRound === game.length - 1}
                  className="flex-1"
                >
                  Next Round
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
