"use client";

import { useState, useMemo } from "react";
import { musicRoundSongs } from "@/data/games/music-round-songs";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Toggle from "@/components/ui/Toggle";

export default function MusicRoundGenerator() {
  const [config, setConfig] = useState({
    numberOfQuestions: 10,
    decade: "mixed",
    questionFormat: "title",
    showAnswers: false,
  });

  const [round, setRound] = useState(null);

  const generateRound = () => {
    let fileredSongs = musicRoundSongs;

    if (config.decade !== "mixed") {
      fileredSongs = fileredSongs.filter((s) => s.decade === config.decade);
    }

    const selectedSongs = [];
    const usedIndices = new Set();

    while (selectedSongs.length < Math.min(config.numberOfQuestions, fileredSongs.length)) {
      const randomIndex = Math.floor(Math.random() * fileredSongs.length);
      if (!usedIndices.has(randomIndex)) {
        selectedSongs.push(fileredSongs[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    const questions = selectedSongs.map((song, idx) => {
      const questionText =
        config.questionFormat === "title"
          ? `${song.title} by ???`
          : `??? by ${song.artist}`;

      const answerText =
        config.questionFormat === "title" ? song.artist : song.title;

      return {
        number: idx + 1,
        question: questionText,
        answer: answerText,
        title: song.title,
        artist: song.artist,
        decade: song.decade,
      };
    });

    setRound({
      questions,
      decade: config.decade,
      format: config.questionFormat,
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Music Round Configuration
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Number of Questions: {config.numberOfQuestions}
            </label>
            <input
              type="range"
              min="5"
              max="15"
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

          <Select
            label="Decade Filter"
            value={config.decade}
            onChange={(e) => setConfig({ ...config, decade: e.target.value })}
            options={[
              { value: "mixed", label: "Mixed Decades" },
              { value: "60s", label: "1960s" },
              { value: "70s", label: "1970s" },
              { value: "80s", label: "1980s" },
              { value: "90s", label: "1990s" },
              { value: "00s", label: "2000s" },
              { value: "10s", label: "2010s" },
              { value: "20s", label: "2020s" },
            ]}
          />

          <Select
            label="Question Format"
            value={config.questionFormat}
            onChange={(e) =>
              setConfig({ ...config, questionFormat: e.target.value })
            }
            options={[
              { value: "title", label: "Song Title (find artist)" },
              { value: "artist", label: "Artist (find song title)" },
            ]}
          />
        </div>

        <Button onClick={generateRound} className="w-full">
          Generate Music Round
        </Button>
      </Card>

      {round && (
        <div className="space-y-4">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-text-primary">
                Music Round
              </h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-secondary text-sm font-medium">
                  Show Answers
                </span>
                <input
                  type="checkbox"
                  checked={config.showAnswers}
                  onChange={(e) =>
                    setConfig({ ...config, showAnswers: e.target.checked })
                  }
                  className="w-4 h-4"
                />
              </label>
            </div>

            <div className="space-y-3">
              {round.questions.map((q) => (
                <div
                  key={q.number}
                  className="pb-4 border-b border-border last:border-0"
                >
                  <p className="font-mono font-medium text-text-primary text-lg">
                    {q.number}. {q.question}
                  </p>
                  {config.showAnswers && (
                    <p className="text-accent font-mono font-medium mt-2">
                      Answer: {q.answer}
                    </p>
                  )}
                  <p className="text-text-muted text-xs mt-2">
                    {q.decade.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-text-secondary text-sm font-medium mb-2">
                Host Notes
              </p>
              <p className="text-text-muted text-sm">
                Allow 30-60 seconds per question. Award 1 point for correct answer. Accept close variations of artist/song names.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
