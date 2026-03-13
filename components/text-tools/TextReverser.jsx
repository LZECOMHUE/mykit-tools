"use client";
import { useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Toggle from "@/components/ui/Toggle";

export default function TextReverser() {
  const [input, setInput] = useState("Hello World");
  const [reverseMode, setReverseMode] = useState("characters");

  const reverseCharacters = (text) => {
    return text.split("").reverse().join("");
  };

  const reverseWords = (text) => {
    return text.split(/\s+/).reverse().join(" ");
  };

  const reverseLines = (text) => {
    return text.split("\n").reverse().join("\n");
  };

  const getOutput = () => {
    switch (reverseMode) {
      case "characters":
        return reverseCharacters(input);
      case "words":
        return reverseWords(input);
      case "lines":
        return reverseLines(input);
      default:
        return input;
    }
  };

  const output = getOutput();

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Input Text
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to reverse"
              rows={6}
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-text-primary">Reverse Mode</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="reverseMode"
                  value="characters"
                  checked={reverseMode === "characters"}
                  onChange={(e) => setReverseMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">
                  Reverse Characters
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="reverseMode"
                  value="words"
                  checked={reverseMode === "words"}
                  onChange={(e) => setReverseMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">
                  Reverse Words
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="reverseMode"
                  value="lines"
                  checked={reverseMode === "lines"}
                  onChange={(e) => setReverseMode(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">
                  Reverse Lines
                </span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">Reversed Output</p>
          <div className="bg-surface p-4 rounded-lg border border-border break-all">
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
