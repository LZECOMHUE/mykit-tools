'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const GAME_MODES = {
  501: 501,
  301: 301,
  701: 701,
};

const QUICK_SCORES = [20, 26, 40, 41, 45, 60, 80, 85, 100, 120, 140, 180];

const CHECKOUT_ROUTES = {
  50: 'Bull',
  25: 'Single 25',
  40: 'D20',
  60: 'T20',
  90: 'T20, T10',
  110: 'T20, T15',
  120: 'T20, T20',
  140: 'T20, T20, D10',
  160: 'T20, T20, D20',
  170: 'T20, T20, Bull',
};

const getSuggestedCheckout = (remaining) => {
  if (remaining < 2 || remaining > 170) return null;
  return CHECKOUT_ROUTES[remaining];
};

export default function DartsScoreTracker() {
  const [gameMode, setGameMode] = useState(501);
  const [playerCount, setPlayerCount] = useState(2);
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', scores: [], remaining: 501 },
    { id: 2, name: 'Player 2', scores: [], remaining: 501 },
  ]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [currentDarts, setCurrentDarts] = useState('');
  const [mustFinishDouble, setMustFinishDouble] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleStartGame = useCallback(() => {
    const initialPlayers = Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      scores: [],
      remaining: gameMode,
    }));
    setPlayers(initialPlayers);
    setCurrentPlayerIdx(0);
    setGameStarted(true);
    setWinner(null);
    setCurrentDarts('');
  }, [playerCount, gameMode]);

  const handlePlayerNameChange = useCallback(
    (idx, newName) => {
      if (!gameStarted) {
        const newPlayers = [...players];
        newPlayers[idx].name = newName;
        setPlayers(newPlayers);
      }
    },
    [players, gameStarted]
  );

  const handleAddDarts = useCallback(
    (score) => {
      setCurrentDarts(currentDarts ? `${currentDarts} + ${score}` : score.toString());
    },
    [currentDarts]
  );

  const handleSubmitTurn = useCallback(() => {
    if (!currentDarts) return;

    // Parse the darts
    const dartValues = currentDarts
      .split('+')
      .map((s) => parseInt(s.trim()))
      .filter((v) => !isNaN(v));

    if (dartValues.length === 0) {
      setCurrentDarts('');
      return;
    }

    const turnTotal = dartValues.reduce((a, b) => a + b, 0);
    const newPlayers = [...players];
    const player = newPlayers[currentPlayerIdx];
    const newRemaining = player.remaining - turnTotal;

    // Bust detection
    if (newRemaining < 0 || newRemaining === 1) {
      // Bust - revert turn
      return;
    }

    // Check for checkout (if finishing double required)
    if (newRemaining === 0 && mustFinishDouble && dartValues[dartValues.length - 1] % 2 !== 0) {
      return;
    }

    // Valid turn
    player.scores.push({
      darts: dartValues,
      total: turnTotal,
      remaining: newRemaining,
    });
    player.remaining = newRemaining;

    // Check for win
    if (newRemaining === 0) {
      setWinner(currentPlayerIdx);
      setGameStarted(false);
    }

    setPlayers(newPlayers);
    setCurrentDarts('');

    // Next player
    setCurrentPlayerIdx((currentPlayerIdx + 1) % playerCount);
  }, [currentDarts, currentPlayerIdx, playerCount, players, mustFinishDouble]);

  const handleUndo = useCallback(() => {
    const newPlayers = [...players];
    const player = newPlayers[currentPlayerIdx];
    if (player.scores.length > 0) {
      const lastScore = player.scores.pop();
      player.remaining = lastScore.remaining + lastScore.total;
      setPlayers(newPlayers);
      setWinner(null);
    }
  }, [currentPlayerIdx, players]);

  const handleNewGame = useCallback(() => {
    setGameStarted(false);
    setWinner(null);
    setCurrentDarts('');
    setCurrentPlayerIdx(0);
  }, []);

  const currentPlayer = players[currentPlayerIdx];
  const threeDAverages = useMemo(() => {
    return players.map((p) => {
      if (p.scores.length === 0) return 0;
      const totalScore = p.scores.reduce((sum, s) => sum + s.total, 0);
      const threeDAverageCounts = Math.ceil(p.scores.length);
      return (totalScore / threeDAverageCounts * 3).toFixed(1);
    });
  }, [players]);

  const highestScores = useMemo(() => {
    return players.map((p) => {
      if (p.scores.length === 0) return 0;
      return Math.max(...p.scores.map((s) => s.total));
    });
  }, [players]);

  return (
    <div className="space-y-6">
      {!gameStarted ? (
        <Card>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Game Setup</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Game Mode</label>
              <div className="flex gap-2">
                {Object.values(GAME_MODES).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setGameMode(mode)}
                    className={`px-4 py-2 rounded-[var(--radius-input)] font-medium transition ${
                      gameMode === mode
                        ? 'bg-accent text-white'
                        : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Number of Players</label>
              <select
                value={playerCount}
                onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent"
              >
                {[2, 3, 4].map((count) => (
                  <option key={count} value={count}>
                    {count} Players
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={mustFinishDouble}
                  onChange={(e) => setMustFinishDouble(e.target.checked)}
                  className="w-4 h-4 rounded border-border focus:ring-2 focus:ring-accent"
                />
                <span className="text-sm font-medium text-text-primary">Must finish on a double</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Player Names</label>
              <div className="space-y-2">
                {players.map((p, idx) => (
                  <input
                    key={p.id}
                    type="text"
                    value={p.name}
                    onChange={(e) => handlePlayerNameChange(idx, e.target.value)}
                    placeholder={`Player ${idx + 1}`}
                    className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
                  />
                ))}
              </div>
            </div>

            <Button onClick={handleStartGame} className="w-full">
              Start Game
            </Button>
          </div>
        </Card>
      ) : winner !== null ? (
        <Card className="bg-success bg-opacity-10 border border-success p-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-success mb-2">🎉 Game Over!</h2>
          <p className="text-xl text-text-primary mb-4 font-bold">{players[winner].name} wins!</p>
          <Button onClick={handleNewGame}>New Game</Button>
        </Card>
      ) : (
        <>
          {/* Scoreboards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {players.map((p, idx) => (
              <Card
                key={p.id}
                className={`p-4 transition ${
                  idx === currentPlayerIdx ? 'ring-2 ring-accent bg-accent bg-opacity-5' : ''
                }`}
              >
                <div className="text-xs font-medium text-text-secondary uppercase mb-1">{p.name}</div>
                <div className="font-mono text-3xl font-bold text-accent mb-2">{p.remaining}</div>
                <div className="text-xs text-text-muted space-y-1">
                  <div>Avg: {threeDAverages[idx]}</div>
                  <div>Best: {highestScores[idx]}</div>
                  <div>Darts: {p.scores.length * 3}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Current player turn */}
          {currentPlayer && (
            <Card className="bg-accent bg-opacity-5 border-2 border-accent">
              <h3 className="text-lg font-heading font-bold text-text-primary mb-4">{currentPlayer.name} - Turn</h3>

              <div className="mb-4 p-3 bg-white rounded-[var(--radius-input)] border border-border">
                <div className="text-xs font-medium text-text-secondary mb-1">Current Turn</div>
                <div className="font-mono text-xl text-text-primary">
                  {currentDarts || '—'}
                </div>
              </div>

              {currentPlayer.remaining <= 170 && currentPlayer.remaining > 0 && (
                <div className="mb-4 p-3 bg-success bg-opacity-10 rounded-[var(--radius-input)] border border-success">
                  <div className="text-xs font-medium text-success mb-1">Suggested Checkout</div>
                  <div className="font-mono font-bold text-success">
                    {getSuggestedCheckout(currentPlayer.remaining) || 'Out of range'}
                  </div>
                </div>
              )}

              {currentPlayer.remaining <= 2 && currentPlayer.remaining > 0 && (
                <div className="mb-4 p-3 bg-warning bg-opacity-10 rounded-[var(--radius-input)] border border-warning">
                  <span className="text-warning font-bold">On checkout!</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Quick scores</label>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {QUICK_SCORES.map((score) => (
                    <button
                      key={score}
                      onClick={() => handleAddDarts(score)}
                      className="px-2 py-2 text-sm font-medium bg-surface border border-border text-text-primary rounded-[var(--radius-input)] hover:bg-surface-hover active:bg-accent active:text-white transition"
                    >
                      {score === 180 ? '180! 🎯' : score}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">Manual entry</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="180"
                    placeholder="Enter dart score"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddDarts(parseInt(e.target.value));
                        e.target.value = '';
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
                  />
                  <Button
                    onClick={() => {
                      const input = document.querySelector('input[type="number"]');
                      if (input.value) {
                        handleAddDarts(parseInt(input.value));
                        input.value = '';
                      }
                    }}
                    variant="secondary"
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmitTurn} className="flex-1">
                  Submit Turn
                </Button>
                <Button onClick={handleUndo} variant="secondary">
                  Undo
                </Button>
                <Button
                  onClick={() => setCurrentDarts('')}
                  variant="secondary"
                >
                  Clear
                </Button>
              </div>
            </Card>
          )}

          {/* History */}
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Game History</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {players.map((p) => (
                <div key={p.id}>
                  <h4 className="text-sm font-medium text-text-secondary mb-2">{p.name}</h4>
                  <div className="bg-surface rounded-[var(--radius-input)] overflow-hidden">
                    <div className="grid grid-cols-4 text-xs font-medium text-text-secondary bg-surface-hover p-2">
                      <div>Turn</div>
                      <div>Darts</div>
                      <div>Score</div>
                      <div>Remaining</div>
                    </div>
                    {p.scores.length === 0 ? (
                      <div className="p-2 text-xs text-text-muted">No turns yet</div>
                    ) : (
                      p.scores.map((turn, idx) => (
                        <div key={idx} className="grid grid-cols-4 text-xs p-2 border-t border-border">
                          <div className="text-text-secondary">{idx + 1}</div>
                          <div className="font-mono">{turn.darts.join(', ')}</div>
                          <div className="font-mono font-bold text-accent">{turn.total}</div>
                          <div className="font-mono">{turn.remaining}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Button onClick={handleNewGame} variant="secondary" className="w-full">
            End Game & New Game
          </Button>
        </>
      )}
    </div>
  );
}
