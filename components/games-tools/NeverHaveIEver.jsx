"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

const STATEMENTS = {
  innocent: [
    "Never have I ever been to a concert",
    "Never have I ever dyed my hair",
    "Never have I ever skipped a class",
    "Never have I ever been on a plane",
    "Never have I ever learned to play an instrument",
    "Never have I ever traveled outside my country",
    "Never have I ever cooked a full meal",
    "Never have I ever won a competition",
    "Never have I ever performed in front of people",
    "Never have I ever tried sushi",
    "Never have I ever been camping",
    "Never have I ever spoken a foreign language",
  ],
  adventurous: [
    "Never have I ever jumped off a cliff",
    "Never have I ever gone skydiving",
    "Never have I ever been to a music festival",
    "Never have I ever gone on a road trip",
    "Never have I ever tried an extreme sport",
    "Never have I ever stayed up all night",
    "Never have I ever spontaneously bought a ticket somewhere",
    "Never have I ever gotten a tattoo",
    "Never have I ever been to a theme park",
    "Never have I ever gone hiking overnight",
    "Never have I ever tried something I was terrified of",
    "Never have I ever traveled solo",
  ],
  spicy: [
    "Never have I ever ghosted someone",
    "Never have I ever lied to get out of trouble",
    "Never have I ever texted someone I shouldn't",
    "Never have I ever done something really impulsive",
    "Never have I ever betrayed a friend's trust",
    "Never have I ever snuck out",
    "Never have I ever kissed someone on a dare",
    "Never have I ever lied on a resume",
    "Never have I ever done something I regretted",
    "Never have I ever broken a promise",
    "Never have I ever been on a terrible date",
    "Never have I ever said yes when I meant no",
  ],
};

export default function NeverHaveIEver() {
  const [category, setCategory] = useState("innocent");
  const [playerCount, setPlayerCount] = useState(4);
  const [scores, setScores] = useState({});
  const [statement, setStatement] = useState("");
  const [started, setStarted] = useState(false);

  const playerCountNum = Math.min(Math.max(parseInt(playerCount) || 1, 1), 10);

  const initializeGame = () => {
    const newScores = {};
    for (let i = 1; i <= playerCountNum; i++) {
      newScores[`player${i}`] = 0;
    }
    setScores(newScores);
    setStarted(true);
    getNewStatement();
  };

  const getNewStatement = () => {
    const list = STATEMENTS[category];
    const selected = list[Math.floor(Math.random() * list.length)];
    setStatement(selected);
  };

  const handleDrank = (playerId) => {
    setScores((prev) => ({
      ...prev,
      [playerId]: prev[playerId] + 1,
    }));
  };

  if (!started) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="space-y-4">
            <Input
              label="Number of Players (1-10)"
              type="number"
              min="1"
              max="10"
              value={playerCount}
              onChange={(e) => setPlayerCount(e.target.value)}
            />

            <Select
              label="Statement Intensity"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "innocent", label: "Innocent (Family Friendly)" },
                { value: "adventurous", label: "Adventurous" },
                { value: "spicy", label: "Spicy (Adults)" },
              ]}
            />

            <Button onClick={initializeGame} className="w-full" size="lg">
              Start Game
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="space-y-3 text-center">
          <p className="text-sm text-text-secondary">Current Statement</p>
          <p className="font-heading text-xl sm:text-2xl font-bold text-text-primary leading-snug">
            {statement}
          </p>
          <Button
            variant="secondary"
            onClick={getNewStatement}
            size="sm"
          >
            Next Statement
          </Button>
        </div>
      </Card>

      <div>
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
          Scores
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: playerCountNum }).map((_, idx) => {
            const playerId = `player${idx + 1}`;
            const score = scores[playerId] || 0;
            return (
              <Card key={playerId} hover className="space-y-2">
                <p className="text-sm text-text-secondary">Player {idx + 1}</p>
                <p className="font-mono text-3xl font-bold text-accent">
                  {score}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDrank(playerId)}
                  className="w-full"
                >
                  + 1 Point
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {Object.values(scores).length > 0 && (
        <Card className="bg-surface">
          <Button
            variant="secondary"
            onClick={() => {
              setStarted(false);
              setScores({});
              setStatement("");
            }}
            className="w-full"
          >
            Reset Game
          </Button>
        </Card>
      )}
    </div>
  );
}
