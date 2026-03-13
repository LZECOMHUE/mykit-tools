"use client";
import { useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function TextSorter() {
  const [input, setInput] = useState("zebra\napple\nmonkey\nbanana");
  const [sortMode, setSortMode] = useState("az");

  const getSortedText = () => {
    const lines = input
      .split("\n")
      .filter((line) => line.trim() !== "");

    switch (sortMode) {
      case "az":
        return [...lines].sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );
      case "za":
        return [...lines].sort((a, b) =>
          b.toLowerCase().localeCompare(a.toLowerCase())
        );
      case "length-short":
        return [...lines].sort((a, b) => a.length - b.length);
      case "length-long":
        return [...lines].sort((a, b) => b.length - a.length);
      case "random":
        const shuffled = [...lines];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      default:
        return lines;
    }
  };

  const output = getSortedText().join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Input Text (one item per line)
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter items to sort, one per line"
              rows={8}
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-text-primary">Sort Method</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sortMode"
                  value="az"
                  checked={sortMode === "az"}
                  onChange={(e) => setSortMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">A to Z</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sortMode"
                  value="za"
                  checked={sortMode === "za"}
                  onChange={(e) => setSortMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">Z to A</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sortMode"
                  value="length-short"
                  checked={sortMode === "length-short"}
                  onChange={(e) => setSortMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">
                  Shortest First
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sortMode"
                  value="length-long"
                  checked={sortMode === "length-long"}
                  onChange={(e) => setSortMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">
                  Longest First
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sortMode"
                  value="random"
                  checked={sortMode === "random"}
                  onChange={(e) => setSortMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">Random</span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Sorted Output ({getSortedText().length} items)
          </p>
          <div className="bg-surface p-4 rounded-lg border border-border max-h-96 overflow-y-auto">
            <p className="font-mono text-text-primary whitespace-pre-wrap text-sm">
              {output}
            </p>
          </div>
          <Button onClick={handleCopy} className="w-full">
            Copy Output
          </Button>
        </div>
      </Card>
    </div>
  );
}
