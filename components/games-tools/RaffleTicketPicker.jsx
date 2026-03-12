"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RaffleTicketPicker() {
  const [totalTickets, setTotalTickets] = useState(500);
  const [numWinners, setNumWinners] = useState(1);
  const [winners, setWinners] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [usedNumbers, setUsedNumbers] = useState(new Set());

  const totalTicketsInt = Math.max(1, Math.min(10000, parseInt(totalTickets) || 500));
  const numWinnersInt = Math.max(1, Math.min(10, parseInt(numWinners) || 1));

  const drawWinner = async () => {
    setIsDrawing(true);

    // Simulate drawing animation
    let currentNumber = Math.floor(Math.random() * totalTicketsInt) + 1;
    const animationSteps = 15;

    for (let i = 0; i < animationSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      currentNumber = Math.floor(Math.random() * totalTicketsInt) + 1;
    }

    // Get actual winner
    let winningNumber;
    do {
      winningNumber = Math.floor(Math.random() * totalTicketsInt) + 1;
    } while (usedNumbers.has(winningNumber));

    const newUsed = new Set(usedNumbers);
    newUsed.add(winningNumber);
    setUsedNumbers(newUsed);
    setWinners([...winners, winningNumber]);
    setIsDrawing(false);
  };

  const resetDraw = () => {
    setWinners([]);
    setUsedNumbers(new Set());
  };

  const drawMultiple = async () => {
    setIsDrawing(true);
    let newUsed = new Set(usedNumbers);
    let newWinners = [...winners];

    for (let i = 0; i < numWinnersInt - winners.length; i++) {
      let winningNumber;
      do {
        winningNumber = Math.floor(Math.random() * totalTicketsInt) + 1;
      } while (newUsed.has(winningNumber));

      newUsed.add(winningNumber);
      newWinners.push(winningNumber);

      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    setUsedNumbers(newUsed);
    setWinners(newWinners);
    setIsDrawing(false);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card className="bg-gradient-to-br from-red-50 to-pink-50">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Total Tickets"
              type="number"
              min="1"
              max="10000"
              value={totalTickets}
              onChange={(e) => setTotalTickets(e.target.value)}
              helper="1 - 10,000"
            />

            <Input
              label="Number of Winners"
              type="number"
              min="1"
              max="10"
              value={numWinners}
              onChange={(e) => setNumWinners(e.target.value)}
              helper="1 - 10"
            />
          </div>

          {winners.length === 0 ? (
            <Button
              onClick={drawWinner}
              disabled={isDrawing}
              className="w-full"
              size="lg"
            >
              {isDrawing ? "Drawing..." : "🎲 Draw First Winner"}
            </Button>
          ) : winners.length < numWinnersInt ? (
            <div className="flex gap-3">
              <Button
                onClick={drawWinner}
                disabled={isDrawing}
                className="flex-1"
                size="lg"
              >
                {isDrawing ? "Drawing..." : "🎲 Draw Next Winner"}
              </Button>
              <Button
                onClick={drawMultiple}
                disabled={isDrawing}
                variant="secondary"
                size="lg"
              >
                Draw All {numWinnersInt - winners.length}
              </Button>
            </div>
          ) : (
            <Button
              onClick={resetDraw}
              variant="secondary"
              className="w-full"
              size="lg"
            >
              ↻ Draw Again
            </Button>
          )}
        </div>
      </Card>

      {/* Winners Display */}
      {winners.length > 0 && (
        <div className="space-y-4">
          {winners.map((ticket, idx) => (
            <div key={idx} className="relative">
              {/* Raffle Ticket Design */}
              <div
                className="relative bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-lg overflow-hidden shadow-lg"
                style={{
                  borderLeft: "30px dashed rgba(255,255,255,0.8)",
                }}
              >
                {/* Ticket Stub (left side) */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-12 bg-amber-900 flex flex-col items-center justify-center"
                  style={{
                    borderRight: "2px dashed rgba(255,255,255,0.5)",
                  }}
                >
                  <div className="text-white text-xs font-bold text-center transform -rotate-90 whitespace-nowrap">
                    STUB
                  </div>
                </div>

                {/* Main Ticket Content */}
                <div className="ml-16 px-6 py-8 text-center relative">
                  {/* Decorative Stars */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl">
                    ⭐ ⭐ ⭐
                  </div>

                  {/* Winner Badge */}
                  <div className="inline-block bg-red-600 text-white rounded-full px-4 py-1 font-bold text-sm mb-4 transform -rotate-3">
                    🏆 WINNER 🏆
                  </div>

                  {/* Ticket Number - BIG */}
                  <div className="my-4">
                    <p className="text-white text-xs font-semibold opacity-80 uppercase tracking-widest">
                      Winning Ticket #{idx + 1}
                    </p>
                    <p className="font-mono text-6xl sm:text-7xl font-black text-white drop-shadow-lg">
                      {ticket}
                    </p>
                    <p className="text-white text-xs font-semibold opacity-80 uppercase tracking-widest mt-2">
                      Congratulations!
                    </p>
                  </div>

                  {/* Decorative Confetti */}
                  <div className="absolute top-1/2 left-4 text-xl transform -translate-y-1/2">
                    🎉
                  </div>
                  <div className="absolute top-1/2 right-4 text-xl transform -translate-y-1/2">
                    🎉
                  </div>
                </div>

                {/* Right dashed edge */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-px"
                  style={{
                    borderRight: "2px dashed rgba(255,255,255,0.8)",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Draw History */}
      {winners.length > 0 && (
        <Card className="bg-blue-50 border border-blue-200">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-bold text-text-primary">
              📊 Draw History
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {winners.map((ticket, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-blue-300 rounded-lg p-3 text-center"
                >
                  <p className="text-xs text-text-muted uppercase font-semibold">
                    Position {idx + 1}
                  </p>
                  <p className="font-mono text-2xl font-bold text-blue-600">
                    #{ticket}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm text-text-secondary">
              Total drawn: <strong>{winners.length}</strong> of{" "}
              <strong>{numWinnersInt}</strong> winners
            </p>
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-amber-50 border border-amber-200">
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-text-primary">
            📖 How to Use
          </h4>
          <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
            <li>Enter your total number of raffle tickets</li>
            <li>Set how many winners you need to draw</li>
            <li>Click the draw button to pick a random winner</li>
            <li>Each ticket can only win once (no duplicates)</li>
            <li>Share the winning ticket number with everyone</li>
            <li>Click "Draw Again" to do another raffle</li>
          </ol>
        </div>
      </Card>
    </div>
  );
}
