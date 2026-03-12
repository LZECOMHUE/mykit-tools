"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Toggle from "@/components/ui/Toggle";

const THEMES = [
  { value: "numbers", label: "Numbers (1-75)", wordList: null },
  { value: "numbers-90", label: "Numbers (1-90)", wordList: null },
  { value: "christmas", label: "🎄 Christmas", wordList: [
    "Santa", "Reindeer", "Sleigh", "Ornament", "Tinsel", "Candy Cane", "Gingerbread", "Snowflake",
    "Mistletoe", "Stocking", "Wreath", "Caroling", "Eggnog", "Chimney", "Presents", "Tree",
    "Angel", "Bell", "Candle", "Elf", "Lights", "Star", "Snow", "Joy"
  ]},
  { value: "halloween", label: "🎃 Halloween", wordList: [
    "Pumpkin", "Ghost", "Witch", "Candy", "Costume", "Spooky", "Broom", "Cobweb",
    "Cauldron", "Skull", "Bat", "Spider", "Monster", "Vampire", "Mummy", "Scare",
    "Trick-or-Treat", "Scary", "Dark", "Graveyard", "Haunted", "Potion", "Trick", "Treat"
  ]},
  { value: "baby", label: "👶 Baby Shower", wordList: [
    "Bottle", "Pacifier", "Diaper", "Rattle", "Teddy Bear", "Crib", "Baby Booties", "Stroller",
    "Nursery", "Blanket", "Bib", "Rocking Chair", "Mobile", "Milestone", "Sweet", "Bundle",
    "Tiny", "Newborn", "Precious", "Angel", "Nursery Rhyme", "Lullaby", "Onesie", "Cuddle"
  ]},
  { value: "wedding", label: "💒 Wedding", wordList: [
    "Bride", "Groom", "Vows", "Ring", "Dress", "Cake", "Bouquet", "Ceremony",
    "Reception", "Dance", "Kiss", "Love", "Forever", "Champagne", "Toast", "Honeymoon",
    "Escort", "Guest", "Celebration", "Newlyweds", "Unity", "Bliss", "Together", "Veil"
  ]},
];

const GRID_SIZES = [
  { value: "3x3", label: "3x3 (9 squares)", size: 3 },
  { value: "4x4", label: "4x4 (16 squares)", size: 4 },
  { value: "5x5", label: "5x5 (25 squares)", size: 5 },
];

export default function BingoCardGenerator() {
  const [gridSize, setGridSize] = useState("5x5");
  const [theme, setTheme] = useState("numbers");
  const [numCards, setNumCards] = useState(6);
  const [freeSpace, setFreeSpace] = useState(true);
  const [customWords, setCustomWords] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const gridSizeInt = GRID_SIZES.find((g) => g.value === gridSize)?.size || 5;
  const numCardsInt = Math.max(1, Math.min(30, parseInt(numCards) || 6));
  const selectedTheme = THEMES.find((t) => t.value === theme);

  const getWords = () => {
    if (theme === "numbers") {
      const max = 75;
      return Array.from({ length: max }, (_, i) => (i + 1).toString());
    }
    if (theme === "numbers-90") {
      const max = 90;
      return Array.from({ length: max }, (_, i) => (i + 1).toString());
    }
    if (customWords.trim()) {
      return customWords
        .split("\n")
        .map((w) => w.trim())
        .filter((w) => w.length > 0);
    }
    return selectedTheme?.wordList || [];
  };

  const generateCard = (cardNum) => {
    const words = getWords();
    const squaresNeeded = gridSizeInt * gridSizeInt - (freeSpace ? 1 : 0);

    if (words.length < squaresNeeded) {
      return null;
    }

    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const card = [];

    for (let row = 0; row < gridSizeInt; row++) {
      const cardRow = [];
      for (let col = 0; col < gridSizeInt; col++) {
        if (freeSpace && row === Math.floor(gridSizeInt / 2) && col === Math.floor(gridSizeInt / 2)) {
          cardRow.push("FREE");
        } else {
          const idx = card.length;
          cardRow.push(shuffled[idx % shuffled.length]);
        }
      }
      card.push(cardRow);
    }

    return card;
  };

  const cards = useMemo(() => {
    return Array.from({ length: numCardsInt }, (_, i) => generateCard(i));
  }, [gridSizeInt, numCardsInt, freeSpace, theme, customWords]);

  const canGenerate =
    (theme !== "custom" && theme) || (theme === "custom" && customWords.trim());

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Grid Size"
              value={gridSize}
              onChange={(e) => setGridSize(e.target.value)}
              options={GRID_SIZES}
            />

            <Select
              label="Bingo Theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              options={THEMES}
            />
          </div>

          {theme === "custom" && (
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">
                Custom Words (one per line)
              </label>
              <textarea
                value={customWords}
                onChange={(e) => setCustomWords(e.target.value)}
                placeholder="Santa&#10;Reindeer&#10;Sleigh&#10;..."
                className="w-full px-3 py-2 rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 min-h-[100px] text-sm"
              />
              <p className="text-xs text-text-muted mt-1">
                Need at least {gridSizeInt * gridSizeInt - (freeSpace ? 1 : 0)} words
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">
                Number of Cards: {numCardsInt}
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={numCards}
                onChange={(e) => setNumCards(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <Toggle
                label="Free Space (center)"
                checked={freeSpace}
                onChange={setFreeSpace}
              />
            </div>
          </div>

          <Button
            onClick={() => setShowPreview(true)}
            disabled={!canGenerate}
            className="w-full"
            size="lg"
          >
            Generate Bingo Cards
          </Button>
        </div>
      </Card>

      {/* Preview Section */}
      {showPreview && cards.length > 0 && cards[0] && (
        <div className="space-y-6">
          {/* Bingo Cards Grid */}
          <Card>
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-text-primary">
                🎉 Bingo Cards (Print Multiple Pages)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, cardIdx) => (
                  card && (
                    <div
                      key={cardIdx}
                      className="bg-white border-2 border-accent rounded-lg overflow-hidden shadow-sm print:page-break-inside-avoid print:shadow-none print:border-gray-300"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-accent to-accent-hover text-white p-3 text-center">
                        <h4 className="font-heading font-bold text-xl tracking-[0.3em]">
                          BINGO
                        </h4>
                        <p className="text-xs opacity-90">Card #{cardIdx + 1}</p>
                      </div>

                      {/* Bingo Grid */}
                      <div className="p-4">
                        <div
                          className="gap-2"
                          style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${gridSizeInt}, 1fr)`,
                          }}
                        >
                          {card.map((row, rowIdx) =>
                            row.map((cell, colIdx) => (
                              <div
                                key={`${rowIdx}-${colIdx}`}
                                className={`flex items-center justify-center rounded-lg font-mono text-sm font-bold min-h-[60px] p-1 text-center ${
                                  cell === "FREE"
                                    ? "bg-accent text-white"
                                    : "bg-gray-100 text-text-primary border border-gray-300"
                                }`}
                              >
                                <span className="break-words text-xs sm:text-sm">
                                  {cell === "FREE" ? "FREE" : cell}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Watermark */}
                      <div
                        className="relative h-12 flex items-center justify-center text-text-muted opacity-20 select-none pointer-events-none"
                        style={{
                          transform: "rotate(-15deg)",
                          fontSize: "12px",
                        }}
                      >
                        mykit.tools
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  <strong>Print Tip:</strong> Adjust browser zoom to 75-80% to fit more cards per page.
                </p>
              </div>

              <Button
                onClick={() => window.print()}
                variant="secondary"
                className="w-full"
              >
                🖨️ Print Bingo Cards
              </Button>
            </div>
          </Card>

          {/* Caller Sheet */}
          <Card className="border-2 border-amber-300">
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-bold text-text-primary">
                📢 Caller Sheet
              </h3>
              <p className="text-sm text-text-secondary">
                Numbers to call out (shuffle for randomness)
              </p>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {getWords()
                  .slice(0, gridSizeInt === 5 ? 75 : gridSizeInt === 4 ? 50 : 25)
                  .map((word) => (
                    <div
                      key={word}
                      className="bg-accent text-white rounded-lg p-2 text-center font-mono text-sm font-bold"
                    >
                      {word}
                    </div>
                  ))}
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="bg-green-50 border border-green-200">
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-text-primary">
                📖 How to Play Bingo
              </h4>
              <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
                <li>Distribute one card to each player</li>
                <li>Call out numbers/words randomly from the caller sheet</li>
                <li>Players mark matching squares on their cards</li>
                <li>First player to complete a line (horizontal, vertical, or diagonal) wins</li>
                <li>Or play for a full card ("BINGO!")</li>
              </ol>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
