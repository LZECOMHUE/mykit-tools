"use client";
import { useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function WhitespaceRemover() {
  const [input, setInput] = useState(
    "  Hello    World  \n\nThis  has   extra   spaces"
  );
  const [trimLines, setTrimLines] = useState(true);
  const [removeBlank, setRemoveBlank] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [removeAll, setRemoveAll] = useState(false);

  const getOutput = () => {
    let result = input;

    if (removeAll) {
      return result.replace(/\s/g, "");
    }

    if (trimLines) {
      result = result
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    }

    if (removeBlank) {
      result = result
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n");
    }

    if (collapseSpaces) {
      result = result
        .split("\n")
        .map((line) => line.replace(/\s+/g, " "))
        .join("\n");
    }

    return result;
  };

  const output = getOutput();
  const charDifference = input.length - output.length;

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
              placeholder="Enter text with extra whitespace"
              rows={8}
            />
            <p className="text-xs text-text-muted mt-1">
              {input.length} characters
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-text-primary">
              Whitespace Options
            </p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={trimLines}
                  onChange={(e) => setTrimLines(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">Trim Lines</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={removeBlank}
                  onChange={(e) => setRemoveBlank(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">
                  Remove Blank Lines
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={collapseSpaces}
                  onChange={(e) => setCollapseSpaces(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">
                  Collapse Multiple Spaces
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={removeAll}
                  onChange={(e) => setRemoveAll(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-text-secondary">
                  Remove All Whitespace
                </span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-text-secondary">Output</p>
            <p className="text-xs text-success font-medium">
              {output.length} characters (-{charDifference})
            </p>
          </div>
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
