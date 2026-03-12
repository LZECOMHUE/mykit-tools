"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const LOTTERY_CONFIGS = {
  "uk-lotto": {
    name: "UK Lotto",
    emoji: "🎯",
    mainCount: 6,
    mainRange: [1, 59],
    bonusName: "Bonus Ball",
    bonusCount: 1,
    bonusRange: [1, 59],
    mainColor: "#2563eb",
    bonusColor: "#8b5cf6",
    draws: "Wednesday & Saturday",
    jackpotOdds: "1 in 45,057,474",
  },
  euromillions: {
    name: "EuroMillions",
    emoji: "⭐",
    mainCount: 5,
    mainRange: [1, 50],
    bonusName: "Lucky Stars",
    bonusCount: 2,
    bonusRange: [1, 12],
    mainColor: "#2563eb",
    bonusColor: "#eab308",
    draws: "Tuesday & Friday",
    jackpotOdds: "1 in 139,838,160",
  },
  thunderball: {
    name: "Thunderball",
    emoji: "⚡",
    mainCount: 5,
    mainRange: [1, 39],
    bonusName: "Thunderball",
    bonusCount: 1,
    bonusRange: [1, 14],
    mainColor: "#ffffff",
    bonusColor: "#f97316",
    mainBorder: true,
    draws: "Wednesday, Saturday & Sunday",
    jackpotOdds: "1 in 8,060,598",
  },
  "set-for-life": {
    name: "Set for Life",
    emoji: "💰",
    mainCount: 5,
    mainRange: [1, 47],
    bonusName: "Life Ball",
    bonusCount: 1,
    bonusRange: [1, 10],
    mainColor: "#16a34a",
    bonusColor: "#eab308",
    draws: "Monday & Wednesday",
    jackpotOdds: "1 in 33,294,240",
  },
  "us-powerball": {
    name: "US Powerball",
    emoji: "🔴",
    mainCount: 5,
    mainRange: [1, 69],
    bonusName: "Powerball",
    bonusCount: 1,
    bonusRange: [1, 26],
    mainColor: "#ffffff",
    bonusColor: "#dc2626",
    mainBorder: true,
    draws: "Monday, Wednesday & Saturday",
    jackpotOdds: "1 in 292,201,338",
  },
  "us-mega-millions": {
    name: "Mega Millions",
    emoji: "💛",
    mainCount: 5,
    mainRange: [1, 70],
    bonusName: "Mega Ball",
    bonusCount: 1,
    bonusRange: [1, 25],
    mainColor: "#ffffff",
    bonusColor: "#eab308",
    mainBorder: true,
    draws: "Tuesday & Friday",
    jackpotOdds: "1 in 302,575,350",
  },
};

export default function LotteryNumberPicker({ lottery = "uk-lotto" }) {
  const config = LOTTERY_CONFIGS[lottery];
  const [mainNumbers, setMainNumbers] = useState([]);
  const [bonusNumbers, setBonusNumbers] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [history, setHistory] = useState([]);
  const [showingIndex, setShowingIndex] = useState(-1);

  const generateNumbers = (count, range) => {
    const numbers = [];
    const [min, max] = range;
    const available = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    for (let i = 0; i < count; i++) {
      const randomIdx = Math.floor(Math.random() * available.length);
      numbers.push(available[randomIdx]);
      available.splice(randomIdx, 1);
    }

    return numbers.sort((a, b) => a - b);
  };

  const pickNumbers = () => {
    setIsAnimating(true);
    setShowingIndex(-1);

    const newMain = generateNumbers(config.mainCount, config.mainRange);
    const newBonus = generateNumbers(config.bonusCount, config.bonusRange);

    setMainNumbers([]);
    setBonusNumbers([]);

    // Animate main numbers
    newMain.forEach((num, idx) => {
      setTimeout(() => {
        setMainNumbers((prev) => [...prev, num]);
        setShowingIndex(idx);
      }, idx * 200);
    });

    // Animate bonus numbers
    newBonus.forEach((num, idx) => {
      setTimeout(() => {
        setBonusNumbers((prev) => [...prev, num]);
      }, (newMain.length + idx) * 200);
    });

    setTimeout(() => {
      setIsAnimating(false);
      setShowingIndex(-1);
      // Add to history
      setHistory((prev) =>
        [{ main: newMain, bonus: newBonus }, ...prev].slice(0, 5)
      );
    }, (newMain.length + newBonus.length) * 200);
  };

  const quickPick5Lines = () => {
    const lines = [];
    for (let i = 0; i < 5; i++) {
      lines.push({
        main: generateNumbers(config.mainCount, config.mainRange),
        bonus: generateNumbers(config.bonusCount, config.bonusRange),
      });
    }
    setHistory((prev) => [lines, ...prev].slice(0, 5));
  };

  const NumberBall = ({ number, color, isBorder, isAnimating, animationDelay }) => {
    const isAnimatingNow = isAnimating && animationDelay !== undefined;

    return (
      <div
        className={`
          w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
          font-mono font-bold text-sm sm:text-base
          transition-transform duration-300
          ${isAnimatingNow ? "animate-pop" : "scale-100"}
        `}
        style={{
          backgroundColor: isBorder ? "white" : color,
          color: isBorder ? color : "white",
          border: isBorder ? `3px solid ${color}` : "none",
          animationDelay: isAnimatingNow ? `${animationDelay * 200}ms` : "0ms",
          boxShadow: isBorder
            ? `0 2px 8px rgba(0,0,0,0.1), inset 0 0 0 2px ${color}`
            : `0 4px 12px rgba(0,0,0,0.15)`,
        }}
      >
        {number}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pop {
          animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Header */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-3xl sm:text-4xl">{config.emoji}</span>
            <div className="flex-1">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
                {config.name}
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Draws: {config.draws}
              </p>
            </div>
          </div>
          <div className="p-2 bg-white/60 rounded-lg border border-blue-200">
            <p className="text-xs sm:text-sm text-text-secondary">
              <span className="font-semibold text-text-primary">Jackpot odds:</span> {config.jackpotOdds}
            </p>
          </div>
        </div>
      </Card>

      {/* Number Display */}
      <Card hover={mainNumbers.length > 0} className="space-y-4">
        <div className="space-y-3">
          {/* Main Numbers */}
          <div>
            <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
              Main Numbers
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {mainNumbers.map((num, idx) => (
                <NumberBall
                  key={`main-${idx}`}
                  number={num}
                  color={config.mainColor}
                  isBorder={config.mainBorder}
                  isAnimating={isAnimating && idx < showingIndex + 1}
                  animationDelay={idx}
                />
              ))}
              {isAnimating &&
                mainNumbers.length < config.mainCount &&
                Array.from({ length: config.mainCount - mainNumbers.length }).map((_, idx) => (
                  <div
                    key={`empty-${idx}`}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface border-2 border-dashed border-border animate-pulse"
                  />
                ))}
            </div>
          </div>

          {/* Bonus Numbers */}
          {config.bonusCount > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                {config.bonusName}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {bonusNumbers.map((num, idx) => (
                  <NumberBall
                    key={`bonus-${idx}`}
                    number={num}
                    color={config.bonusColor}
                    isBorder={config.mainBorder && lottery.includes("us")}
                    isAnimating={isAnimating && idx < bonusNumbers.length}
                    animationDelay={config.mainCount + idx}
                  />
                ))}
                {isAnimating &&
                  bonusNumbers.length < config.bonusCount &&
                  Array.from({ length: config.bonusCount - bonusNumbers.length }).map((_, idx) => (
                    <div
                      key={`empty-bonus-${idx}`}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface border-2 border-dashed border-border animate-pulse"
                    />
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          <Button
            onClick={pickNumbers}
            disabled={isAnimating}
            size="lg"
            className="w-full"
          >
            {isAnimating ? "Picking..." : "🎰 Pick My Numbers"}
          </Button>
          <Button
            onClick={quickPick5Lines}
            disabled={isAnimating}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Quick Pick 5 Lines
          </Button>
        </div>
      </Card>

      {/* History */}
      {history.length > 0 && (
        <Card>
          <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
            Recent Picks
          </h3>
          <div className="space-y-3">
            {history.map((pick, historyIdx) => (
              <div
                key={historyIdx}
                className="p-3 rounded-lg bg-surface border border-border"
              >
                {Array.isArray(pick) ? (
                  // Quick pick 5 lines
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      5-Line Pick #{history.length - historyIdx}
                    </p>
                    {pick.map((line, lineIdx) => (
                      <div key={lineIdx} className="flex items-center gap-2 text-xs">
                        <span className="text-text-muted">Line {lineIdx + 1}:</span>
                        <div className="flex gap-1 flex-wrap">
                          {line.main.map((num) => (
                            <span
                              key={`hist-${lineIdx}-${num}`}
                              className="w-6 h-6 rounded-full text-center leading-6 font-mono text-white text-xs font-bold"
                              style={{
                                backgroundColor: config.mainColor,
                                fontSize: "10px",
                              }}
                            >
                              {num}
                            </span>
                          ))}
                          {line.bonus.map((num) => (
                            <span
                              key={`hist-bonus-${lineIdx}-${num}`}
                              className="w-6 h-6 rounded-full text-center leading-6 font-mono text-xs font-bold"
                              style={{
                                backgroundColor: config.mainBorder
                                  ? "white"
                                  : config.bonusColor,
                                color: config.mainBorder
                                  ? config.bonusColor
                                  : "white",
                                border: config.mainBorder
                                  ? `2px solid ${config.bonusColor}`
                                  : "none",
                                fontSize: "10px",
                              }}
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Single pick
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Pick #{history.length - historyIdx}
                    </p>
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      {pick.main.map((num) => (
                        <span
                          key={`hist-${num}`}
                          className="w-6 h-6 rounded-full text-center leading-6 font-mono text-white text-xs font-bold"
                          style={{
                            backgroundColor: config.mainColor,
                            fontSize: "10px",
                          }}
                        >
                          {num}
                        </span>
                      ))}
                      {pick.bonus.map((num) => (
                        <span
                          key={`hist-bonus-${num}`}
                          className="w-6 h-6 rounded-full text-center leading-6 font-mono text-xs font-bold"
                          style={{
                            backgroundColor: config.mainBorder
                              ? "white"
                              : config.bonusColor,
                            color: config.mainBorder ? config.bonusColor : "white",
                            border: config.mainBorder
                              ? `2px solid ${config.bonusColor}`
                              : "none",
                            fontSize: "10px",
                          }}
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <Card className="bg-amber-50 border-l-4 border-l-amber-400">
        <p className="text-xs sm:text-sm text-text-secondary">
          <span className="font-semibold text-amber-700">⚠️ Disclaimer:</span> For entertainment only.
          Random numbers have no better chance of winning than any other combination. Please play responsibly.
        </p>
      </Card>
    </div>
  );
}
