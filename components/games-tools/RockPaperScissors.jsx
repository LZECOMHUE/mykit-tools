"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

const CHOICES = {
  rock: { emoji: "🪨", beats: "scissors" },
  paper: { emoji: "📄", beats: "rock" },
  scissors: { emoji: "✂️", beats: "paper" },
};

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [bestOf, setBestOf] = useState(1);
  const [roundNumber, setRoundNumber] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const handlePlay = (choice) => {
    setPlayerChoice(choice);
    const computer = Object.keys(CHOICES)[
      Math.floor(Math.random() * 3)
    ];
    setComputerChoice(computer);

    const gameResult = determineWinner(choice, computer);
    setResult(gameResult);

    if (gameResult === "win") {
      setStats((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else if (gameResult === "lose") {
      setStats((prev) => ({ ...prev, losses: prev.losses + 1 }));
    } else {
      setStats((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }

    const roundsNeeded = Math.ceil(parseInt(bestOf) / 2);
    if (stats.wins + 1 === roundsNeeded || stats.losses + 1 === roundsNeeded) {
      setGameOver(true);
    }

    setRoundNumber((prev) => prev + 1);
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return "draw";
    if (CHOICES[player].beats === computer) return "win";
    return "lose";
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setStats({ wins: 0, losses: 0, draws: 0 });
    setRoundNumber(1);
    setGameOver(false);
  };

  const roundsNeeded = Math.ceil(parseInt(bestOf) / 2);
  const gameWon = stats.wins === roundsNeeded;
  const gameLost = stats.losses === roundsNeeded;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="space-y-4">
          <Select
            label="Best Of"
            value={bestOf}
            onChange={(e) => {
              setBestOf(e.target.value);
              resetGame();
            }}
            options={[
              { value: "1", label: "Best of 1" },
              { value: "3", label: "Best of 3" },
              { value: "5", label: "Best of 5" },
              { value: "7", label: "Best of 7" },
            ]}
          />

          <div className="grid grid-cols-3 gap-2">
            {Object.entries(CHOICES).map(([choice, { emoji }]) => (
              <Button
                key={choice}
                onClick={() => handlePlay(choice)}
                disabled={gameOver}
                variant={playerChoice === choice ? "primary" : "secondary"}
                className="text-2xl"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {computerChoice && (
        <Card hover>
          <div className="space-y-4 text-center">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <p className="text-xs text-text-secondary mb-2">You</p>
                <p className="text-4xl">
                  {CHOICES[playerChoice].emoji}
                </p>
              </div>

              <div>
                <p
                  className={`text-sm font-bold ${
                    result === "win"
                      ? "text-success"
                      : result === "lose"
                        ? "text-error"
                        : "text-text-muted"
                  }`}
                >
                  {result === "win"
                    ? "Win"
                    : result === "lose"
                      ? "Lose"
                      : "Draw"}
                </p>
              </div>

              <div>
                <p className="text-xs text-text-secondary mb-2">
                  Computer
                </p>
                <p className="text-4xl">
                  {CHOICES[computerChoice].emoji}
                </p>
              </div>
            </div>

            {!gameOver && (
              <Button
                variant="secondary"
                onClick={() => {
                  setPlayerChoice(null);
                  setComputerChoice(null);
                  setResult(null);
                }}
                size="sm"
              >
                Next Round
              </Button>
            )}
          </div>
        </Card>
      )}

      <Card className="space-y-3">
        <div className="text-center mb-3">
          <p className="text-sm text-text-secondary">
            Round {roundNumber} of {roundsNeeded * 2 - 1}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
            <p className="text-xs text-text-secondary">Wins</p>
            <p className="font-mono text-2xl font-bold text-success">
              {stats.wins}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-center">
            <p className="text-xs text-text-secondary">Draws</p>
            <p className="font-mono text-2xl font-bold text-warning">
              {stats.draws}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-center">
            <p className="text-xs text-text-secondary">Losses</p>
            <p className="font-mono text-2xl font-bold text-error">
              {stats.losses}
            </p>
          </div>
        </div>
      </Card>

      {gameOver && (
        <Card hover className="bg-gradient-to-br from-green-50 to-emerald-50 text-center space-y-3">
          <p className="text-sm text-text-secondary font-semibold">
            {gameWon ? "You Won!" : "You Lost!"}
          </p>
          <p className="font-heading text-2xl font-bold text-text-primary">
            {stats.wins} - {stats.losses}
          </p>
          <Button onClick={resetGame} size="lg" className="w-full">
            Play Again
          </Button>
        </Card>
      )}
    </div>
  );
}
