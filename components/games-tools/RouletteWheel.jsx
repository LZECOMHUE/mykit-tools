'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import GamblingDisclaimer from '@/components/ui/GamblingDisclaimer';

// Roulette wheel data
const WHEEL_NUMBERS = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
const RED_NUMBERS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
const BLACK_NUMBERS = new Set([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

const AMERICAN_WHEEL = [...WHEEL_NUMBERS];
const AMERICAN_WHEEL_NUMBERS = [...WHEEL_NUMBERS]; // European by default

const getNumberColor = (num) => {
  if (num === 0) return 'green';
  return RED_NUMBERS.has(num) ? 'red' : 'black';
};

export default function RouletteWheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastWinner, setLastWinner] = useState(null);
  const [spinHistory, setSpinHistory] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [chipSize, setChipSize] = useState(10);
  const [bets, setBets] = useState({});
  const [wheelVariant, setWheelVariant] = useState('european'); // european or american
  const wheelRef = useRef(null);
  const animationRef = useRef(null);

  const wheelNumbers = wheelVariant === 'european' ? WHEEL_NUMBERS : [0, '00', ...WHEEL_NUMBERS.slice(1)];
  const totalSlots = wheelNumbers.length;
  const slotAngle = 360 / totalSlots;

  const spin = () => {
    if (isSpinning || Object.keys(bets).length === 0) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * totalSlots);
    const winningNumber = wheelNumbers[randomIndex];
    const targetRotation = (randomIndex * slotAngle + 180) % 360;
    const fullRotations = 3600 + targetRotation;

    let currentRotation = rotation;
    const startTime = Date.now();
    const duration = 4000; // 4 seconds

    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const newRotation = rotation + (fullRotations - rotation) * easeProgress;

      setRotation(newRotation % 360);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setRotation(targetRotation);
        setLastWinner(winningNumber);
        setSpinHistory((prev) => [winningNumber, ...prev].slice(0, 20));
        resolveWinner(winningNumber);
        setIsSpinning(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const resolveWinner = (number) => {
    let winnings = 0;
    const newBets = { ...bets };

    Object.entries(bets).forEach(([betType, betAmount]) => {
      if (isBetWinner(betType, number)) {
        const payout = getBetPayout(betType);
        winnings += betAmount * payout;
      }
      delete newBets[betType];
    });

    setBalance((prev) => prev - Object.values(bets).reduce((a, b) => a + b, 0) + winnings);
    setBets(newBets);
  };

  const isBetWinner = (betType, winningNumber) => {
    if (betType === `straight-${winningNumber}`) return true;
    if (betType === 'red' && RED_NUMBERS.has(winningNumber)) return true;
    if (betType === 'black' && BLACK_NUMBERS.has(winningNumber)) return true;
    if (betType === 'odd' && winningNumber !== 0 && winningNumber % 2 === 1) return true;
    if (betType === 'even' && winningNumber !== 0 && winningNumber % 2 === 0) return true;
    if (betType === '1-18' && winningNumber > 0 && winningNumber <= 18) return true;
    if (betType === '19-36' && winningNumber > 18) return true;
    return false;
  };

  const getBetPayout = (betType) => {
    if (betType.includes('straight')) return 35;
    if (['red', 'black', 'odd', 'even', '1-18', '19-36'].includes(betType)) return 1;
    return 0;
  };

  const placeBet = (betType) => {
    if (balance < chipSize) return;
    setBalance((prev) => prev - chipSize);
    setBets((prev) => ({
      ...prev,
      [betType]: (prev[betType] || 0) + chipSize,
    }));
  };

  const clearBets = () => {
    const totalBet = Object.values(bets).reduce((a, b) => a + b, 0);
    setBalance((prev) => prev + totalBet);
    setBets({});
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Variant selector */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => {
            setWheelVariant('european');
            setRotation(0);
            setLastWinner(null);
            setSpinHistory([]);
            setBets({});
          }}
          className={`px-6 py-2 ${wheelVariant === 'european' ? 'bg-accent text-white' : 'bg-surface text-primary border border-border'}`}
        >
          European (0)
        </Button>
        <Button
          onClick={() => {
            setWheelVariant('american');
            setRotation(0);
            setLastWinner(null);
            setSpinHistory([]);
            setBets({});
          }}
          className={`px-6 py-2 ${wheelVariant === 'american' ? 'bg-accent text-white' : 'bg-surface text-primary border border-border'}`}
        >
          American (0, 00)
        </Button>
      </div>

      {/* Wheel */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full max-w-md aspect-square">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex justify-center">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-accent-warm"></div>
          </div>

          {/* Wheel container */}
          <svg
            ref={wheelRef}
            viewBox="0 0 400 400"
            className="w-full h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            {/* Outer decorative ring */}
            <circle cx="200" cy="200" r="195" fill="none" stroke="#d4af37" strokeWidth="3" />

            {/* Number slots */}
            {wheelNumbers.map((num, index) => {
              const angle = (index / totalSlots) * 360;
              const startAngle = angle - slotAngle / 2;
              const endAngle = angle + slotAngle / 2;

              const x1 = 200 + 170 * Math.cos(((startAngle - 90) * Math.PI) / 180);
              const y1 = 200 + 170 * Math.sin(((startAngle - 90) * Math.PI) / 180);
              const x2 = 200 + 170 * Math.cos(((endAngle - 90) * Math.PI) / 180);
              const y2 = 200 + 170 * Math.sin(((endAngle - 90) * Math.PI) / 180);

              const largArc = slotAngle > 180 ? 1 : 0;

              const color = num === 0 || num === '00' ? '#1a7d1a' : RED_NUMBERS.has(num) ? '#dc2626' : '#1a1a1a';

              return (
                <g key={`slot-${index}`}>
                  {/* Slot background */}
                  <path
                    d={`M 200 200 L ${x1} ${y1} A 170 170 0 ${largArc} 1 ${x2} ${y2} Z`}
                    fill={color}
                    stroke="#d4af37"
                    strokeWidth="1"
                  />

                  {/* Number text */}
                  <text
                    x="200"
                    y="200"
                    dy="0.3em"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${angle + slotAngle / 2} 200 200) translate(0 -130)`}
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {num}
                  </text>
                </g>
              );
            })}

            {/* Inner decorative rings */}
            <circle cx="200" cy="200" r="130" fill="none" stroke="#d4af37" strokeWidth="2" />
            <circle cx="200" cy="200" r="125" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.5" />

            {/* Center hub */}
            <circle cx="200" cy="200" r="35" fill="#d4af37" />
            <circle cx="200" cy="200" r="30" fill="#1a1a1a" />
            <circle cx="200" cy="200" r="20" fill="#d4af37" opacity="0.6" />
          </svg>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4 w-full">
          <Button
            onClick={spin}
            disabled={isSpinning || Object.keys(bets).length === 0}
            className="px-12 py-3 bg-accent-warm text-white font-bold text-lg disabled:opacity-50"
          >
            {isSpinning ? 'Spinning...' : 'SPIN'}
          </Button>

          {lastWinner !== null && (
            <div className="text-center">
              <p className="text-secondary text-sm mb-2">Last Winner</p>
              <div
                className={`inline-block px-4 py-2 rounded-lg font-mono font-bold text-lg text-white ${
                  lastWinner === 0 || lastWinner === '00'
                    ? 'bg-green-600'
                    : RED_NUMBERS.has(lastWinner)
                      ? 'bg-red-600'
                      : 'bg-black'
                }`}
              >
                {lastWinner}
              </div>
            </div>
          )}
        </div>

        {/* Spin history */}
        {spinHistory.length > 0 && (
          <div className="w-full">
            <p className="text-secondary text-sm mb-3">Recent Spins</p>
            <div className="flex flex-wrap gap-2">
              {spinHistory.slice(0, 20).map((num, idx) => (
                <Badge
                  key={idx}
                  className={`font-mono font-bold ${
                    num === 0 || num === '00'
                      ? 'bg-green-100 text-green-700'
                      : RED_NUMBERS.has(num)
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-800 text-white'
                  }`}
                >
                  {num}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Betting table */}
      <Card className="bg-surface">
        <div className="space-y-4">
          {/* Balance and chip selector */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div>
              <p className="text-secondary text-sm">Balance</p>
              <p className="font-mono font-bold text-2xl">{balance}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-secondary text-sm mb-2">Chip Size</p>
              <div className="flex gap-2">
                {[1, 5, 10, 25, 100].map((size) => (
                  <Button
                    key={size}
                    onClick={() => setChipSize(size)}
                    className={`px-3 py-2 text-sm ${
                      chipSize === size ? 'bg-accent text-white' : 'bg-surface border border-border text-primary'
                    }`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Betting sections */}
          <div className="space-y-4">
            {/* Outside bets */}
            <div>
              <h3 className="font-heading font-bold text-lg mb-3">Outside Bets</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { type: 'red', label: 'Red' },
                  { type: 'black', label: 'Black' },
                  { type: 'odd', label: 'Odd' },
                  { type: 'even', label: 'Even' },
                  { type: '1-18', label: '1-18' },
                  { type: '19-36', label: '19-36' },
                ].map(({ type, label }) => (
                  <div key={type}>
                    <Button
                      onClick={() => placeBet(type)}
                      disabled={isSpinning || balance < chipSize}
                      className="w-full py-3 border-2 text-center font-bold bg-white text-primary border-border hover:bg-surface disabled:opacity-50"
                    >
                      {label}
                    </Button>
                    {bets[type] && <p className="text-center text-sm text-secondary mt-1 font-mono">{bets[type]}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Inside bets (single numbers) */}
            <div>
              <h3 className="font-heading font-bold text-lg mb-3">Straight Bets (Select a Number)</h3>
              <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
                {Array.from({ length: wheelVariant === 'european' ? 37 : 38 }).map((_, i) => {
                  const num = i === 37 ? '00' : i;
                  const betType = `straight-${num}`;
                  return (
                    <button
                      key={betType}
                      onClick={() => placeBet(betType)}
                      disabled={isSpinning || balance < chipSize}
                      className={`aspect-square rounded flex items-center justify-center font-mono font-bold text-sm transition ${
                        num === 0 || num === '00'
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : RED_NUMBERS.has(num)
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-gray-800 text-white hover:bg-gray-900'
                      } disabled:opacity-50`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
              {Object.entries(bets)
                .filter(([type]) => type.includes('straight'))
                .map(([type, amount]) => (
                  <p key={type} className="text-center text-sm text-secondary mt-2 font-mono">
                    Bet on {type.replace('straight-', '')}: {amount}
                  </p>
                ))}
            </div>
          </div>

          {/* Stats */}
          {spinHistory.length > 0 && (
            <div className="pt-4 border-t border-border">
              <h3 className="font-heading font-bold text-lg mb-3">Spin Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-secondary text-sm">Total Spins</p>
                  <p className="font-mono font-bold text-xl">{spinHistory.length}</p>
                </div>
                <div>
                  <p className="text-secondary text-sm">Red Count</p>
                  <p className="font-mono font-bold text-xl text-red-600">
                    {spinHistory.filter((n) => RED_NUMBERS.has(n)).length}
                  </p>
                </div>
                <div>
                  <p className="text-secondary text-sm">Black Count</p>
                  <p className="font-mono font-bold text-xl text-gray-800">
                    {spinHistory.filter((n) => BLACK_NUMBERS.has(n)).length}
                  </p>
                </div>
                <div>
                  <p className="text-secondary text-sm">Zero Count</p>
                  <p className="font-mono font-bold text-xl text-green-600">
                    {spinHistory.filter((n) => n === 0 || n === '00').length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Clear bets button */}
          <div className="flex gap-3">
            <Button onClick={clearBets} disabled={Object.keys(bets).length === 0} className="flex-1">
              Clear Bets
            </Button>
          </div>
        </div>
      </Card>

      <GamblingDisclaimer type="roulette" />
    </div>
  );
}
