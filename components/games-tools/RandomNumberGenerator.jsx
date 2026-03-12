"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Toggle from "@/components/ui/Toggle";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [quantity, setQuantity] = useState(5);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [sorted, setSorted] = useState(false);
  const [results, setResults] = useState([]);

  const generateNumbers = () => {
    const minNum = Math.min(parseInt(min) || 0, parseInt(max) || 100);
    const maxNum = Math.max(parseInt(max) || 100, parseInt(min) || 0);
    const qty = Math.min(Math.max(parseInt(quantity) || 1, 1), 1000);
    const range = maxNum - minNum + 1;

    let numbers = [];

    if (!allowDuplicates && qty > range) {
      numbers = Array.from({ length: range }, (_, i) => minNum + i);
    } else if (allowDuplicates) {
      numbers = Array.from({ length: qty }, () =>
        Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
      );
    } else {
      const used = new Set();
      while (numbers.length < qty && used.size < range) {
        const num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        if (!used.has(num)) {
          numbers.push(num);
          used.add(num);
        }
      }
    }

    if (sorted) {
      numbers.sort((a, b) => a - b);
    }

    setResults(numbers);
  };

  const minNum = parseInt(min) || 0;
  const maxNum = parseInt(max) || 100;
  const isValid = minNum <= maxNum;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Minimum"
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              helper="Lowest number in range"
            />
            <Input
              label="Maximum"
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              helper="Highest number in range"
            />
          </div>

          <Input
            label="Quantity"
            type="number"
            min="1"
            max="1000"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            helper="How many numbers to generate"
          />

          <div className="space-y-2">
            <Toggle
              label="Allow Duplicates"
              checked={allowDuplicates}
              onChange={(val) => setAllowDuplicates(val)}
            />
            <Toggle
              label="Sort Results"
              checked={sorted}
              onChange={(val) => setSorted(val)}
            />
          </div>

          <Button
            onClick={generateNumbers}
            disabled={!isValid}
            className="w-full"
            size="lg"
          >
            Generate Numbers
          </Button>
          {!isValid && (
            <p className="text-xs text-error text-center">
              Minimum must be less than or equal to maximum
            </p>
          )}
        </div>
      </Card>

      {results.length > 0 && (
        <Card hover>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-semibold text-text-primary">
                Generated Numbers
              </h3>
              <p className="text-sm text-text-secondary">
                {results.length} number{results.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
              {results.join(", ")}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xs text-text-secondary">Min</p>
                <p className="font-mono text-lg font-bold text-blue-600">
                  {Math.min(...results)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <p className="text-xs text-text-secondary">Avg</p>
                <p className="font-mono text-lg font-bold text-purple-600">
                  {(
                    results.reduce((a, b) => a + b, 0) / results.length
                  ).toFixed(1)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                <p className="text-xs text-text-secondary">Max</p>
                <p className="font-mono text-lg font-bold text-rose-600">
                  {Math.max(...results)}
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(results.join(", "));
              }}
              className="w-full"
            >
              Copy to Clipboard
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
