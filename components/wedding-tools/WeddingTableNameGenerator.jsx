"use client";

import { useState } from "react";
import { tableNameThemes } from "@/data/wedding/table-name-themes";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";

export default function WeddingTableNameGenerator() {
  const [config, setConfig] = useState({
    theme: "flowers",
    numberOfTables: 8,
  });

  const [tables, setTables] = useState(null);

  const themeOptions = Object.keys(tableNameThemes).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

  const generateTables = () => {
    const themeData = tableNameThemes[config.theme];
    const availableNames = themeData.names;
    const selectedNames = [];
    const usedIndices = new Set();

    const numToSelect = Math.min(config.numberOfTables, availableNames.length);

    while (selectedNames.length < numToSelect) {
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      if (!usedIndices.has(randomIndex)) {
        selectedNames.push(availableNames[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    const generatedTables = selectedNames.map((name, idx) => ({
      number: idx + 1,
      name,
      description: themeData.descriptions[name] || "Elegant choice",
    }));

    setTables(generatedTables);
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Table Name Configuration
        </h2>

        <div className="space-y-4 mb-6">
          <Select
            label="Theme"
            value={config.theme}
            onChange={(e) => setConfig({ ...config, theme: e.target.value })}
            options={themeOptions}
          />

          <div>
            <label className="text-text-secondary text-sm font-medium block mb-2">
              Number of Tables: {config.numberOfTables}
            </label>
            <input
              type="range"
              min="5"
              max="20"
              value={config.numberOfTables}
              onChange={(e) =>
                setConfig({ ...config, numberOfTables: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
        </div>

        <Button onClick={generateTables} className="w-full">
          Generate Table Names
        </Button>
      </Card>

      {tables && (
        <div className="space-y-4">
          <Card>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
              Your Table Names
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {tables.map((table) => (
                <div
                  key={table.number}
                  className="bg-surface border border-border rounded-lg p-4"
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="font-mono font-bold text-accent">
                      Table {table.number}
                    </p>
                    <p className="font-heading font-bold text-text-primary text-lg">
                      {table.name}
                    </p>
                  </div>
                  <p className="text-text-secondary text-sm">
                    {table.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border space-y-3">
              <p className="text-text-secondary text-sm font-medium">
                Usage Ideas
              </p>
              <ul className="text-text-muted text-sm space-y-1 list-disc list-inside">
                <li>Print names on elegant place cards</li>
                <li>Display names on table numbers with descriptions</li>
                <li>Create a seating plan with table names</li>
                <li>Use as conversation starters on the menus</li>
                <li>Add to your wedding website</li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
