'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateSudokuPDF } from '@/lib/worksheet-pdf';

export default function SudokuGenerator() {
  // State management
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [grid, setGrid] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [pencilMode, setPencilMode] = useState(false);
  const [notes, setNotes] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const canvasRef = useRef(null);
  const timerRef = useRef(null);

  // Sudoku generation and solving algorithms
  const isValid = useCallback((grid, row, col, num) => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false;
    }
    // Check column
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false;
    }
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (grid[i][j] === num) return false;
      }
    }
    return true;
  }, []);

  const generateSolution = useCallback(() => {
    const grid = Array(9)
      .fill(null)
      .map(() => Array(9).fill(0));

    const solve = (grid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(
              () => Math.random() - 0.5
            );
            for (const num of numbers) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (solve(grid)) {
                  return true;
                }
                grid[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    solve(grid);
    return grid;
  }, [isValid]);

  const removeNumbers = useCallback((grid, difficulty) => {
    const puzzle = grid.map((row) => [...row]);
    const givenCount = {
      easy: { min: 36, max: 40 },
      medium: { min: 28, max: 32 },
      hard: { min: 22, max: 26 },
      expert: { min: 17, max: 21 },
    }[difficulty];

    const cellsToRemove =
      81 -
      Math.floor(
        Math.random() * (givenCount.max - givenCount.min + 1) + givenCount.min
      );
    let removed = 0;

    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }

    return puzzle;
  }, []);

  const generateNewPuzzle = useCallback(() => {
    const newSolution = generateSolution();
    const newPuzzle = removeNumbers(newSolution, difficulty);
    const newGrid = newPuzzle.map((row) => [...row]);
    const newNotes = Array(9)
      .fill(null)
      .map(() =>
        Array(9)
          .fill(null)
          .map(() => new Set())
      );

    setPuzzle(newPuzzle);
    setSolution(newSolution);
    setGrid(newGrid);
    setNotes(newNotes);
    setSelectedCell(null);
    setTimer(0);
    setIsRunning(true);
    setShowSolution(false);
  }, [difficulty, generateSolution, removeNumbers]);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Format timer display
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cell click handler
  const handleCellClick = (row, col) => {
    if (puzzle && puzzle[row][col] !== 0) return; // Can't edit given numbers
    setSelectedCell({ row, col });
  };

  // Number input handler
  const handleNumberInput = (num) => {
    if (!selectedCell || !grid) return;
    const { row, col } = selectedCell;
    if (puzzle[row][col] !== 0) return; // Can't edit given numbers

    if (pencilMode) {
      const newNotes = notes.map((r) => [...r]);
      if (newNotes[row][col].has(num)) {
        newNotes[row][col].delete(num);
      } else {
        newNotes[row][col].add(num);
      }
      setNotes(newNotes);
    } else {
      const newGrid = grid.map((r) => [...r]);
      newGrid[row][col] = newGrid[row][col] === num ? 0 : num;
      setGrid(newGrid);
    }
  };

  // Keyboard input handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCell) return;

      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        handleNumberInput(parseInt(e.key));
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        if (!pencilMode && grid) {
          const newGrid = grid.map((r) => [...r]);
          newGrid[selectedCell.row][selectedCell.col] = 0;
          setGrid(newGrid);
        }
      } else if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        e.preventDefault();
        const { row, col } = selectedCell;
        let newRow = row;
        let newCol = col;

        if (e.key === 'ArrowUp') newRow = Math.max(0, row - 1);
        if (e.key === 'ArrowDown') newRow = Math.min(8, row + 1);
        if (e.key === 'ArrowLeft') newCol = Math.max(0, col - 1);
        if (e.key === 'ArrowRight') newCol = Math.min(8, col + 1);

        setSelectedCell({ row: newRow, col: newCol });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, pencilMode, grid]);

  // Hint function
  const giveHint = () => {
    if (!grid || !solution) return;
    const emptyCells = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0 && puzzle[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = grid.map((r) => [...r]);
    newGrid[randomCell.row][randomCell.col] = solution[randomCell.row][randomCell.col];
    setGrid(newGrid);
  };

  // Check if cell has error
  const hasError = (row, col, grid, solution, puzzle) => {
    if (puzzle[row][col] !== 0) return false;
    if (grid[row][col] === 0) return false;
    return grid[row][col] !== solution[row][col];
  };

  // Check if cell has same number as selected
  const hasSameNumber = (row, col) => {
    if (!selectedCell || !grid) return false;
    const selectedNum = grid[selectedCell.row][selectedCell.col];
    if (selectedNum === 0) return false;
    return grid[row][col] === selectedNum && !(row === selectedCell.row && col === selectedCell.col);
  };

  // Download puzzle as PDF
  const downloadPuzzle = (includeAnswers = false) => {
    generateSudokuPDF({
      puzzle,
      solution,
      difficulty,
      includeAnswers,
    });
  };

  // Initialize on mount
  useEffect(() => {
    generateNewPuzzle();
  }, []);

  if (!puzzle || !grid) {
    return <div className="text-center text-text-muted">Loading...</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Controls Card */}
      <Card className="mb-6 p-6">
        <div className="space-y-4">
          {/* Difficulty and Timer Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm font-medium text-text-primary bg-white hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary mb-2">Time</p>
              <p className="text-2xl font-mono font-bold text-text-primary">
                {formatTime(timer)}
              </p>
            </div>
          </div>

          {/* Mode Toggles */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setPencilMode(!pencilMode)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                pencilMode
                  ? 'bg-accent text-white'
                  : 'bg-surface text-text-primary border border-border hover:bg-surface-hover'
              }`}
            >
              {pencilMode ? '✎ Pencil ON' : '✎ Pencil OFF'}
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isRunning
                  ? 'bg-warning text-white'
                  : 'bg-surface text-text-primary border border-border hover:bg-surface-hover'
              }`}
            >
              {isRunning ? '⏸ Pause' : '▶ Resume'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button onClick={giveHint} variant="secondary" size="sm">
              💡 Hint
            </Button>
            <Button onClick={() => downloadPuzzle(false)} variant="secondary" size="sm">
              ⬇ Download PDF
            </Button>
            <Button onClick={() => downloadPuzzle(true)} variant="secondary" size="sm">
              ⬇ Solution PDF
            </Button>
            <Button
              onClick={() => setShowSolution(!showSolution)}
              variant="secondary"
              size="sm"
            >
              {showSolution ? '👁 Hide Solution' : '👁 Show Solution'}
            </Button>
            <Button onClick={() => generateNewPuzzle()} variant="primary" size="sm">
              ♻ New Puzzle
            </Button>
          </div>
        </div>
      </Card>

      {/* Sudoku Grid */}
      <div className="flex justify-center mb-6">
        <div className="bg-white border-2 border-text-primary p-4 rounded-lg shadow-sm">
          <div className="inline-block border-2 border-text-primary">
            {Array.from({ length: 9 }, (_, row) => (
              <div key={row} className="flex">
                {Array.from({ length: 9 }, (_, col) => {
                  const isSelected =
                    selectedCell && selectedCell.row === row && selectedCell.col === col;
                  const isSameRow =
                    selectedCell && selectedCell.row === row && selectedCell.col !== col;
                  const isSameCol =
                    selectedCell && selectedCell.col === col && selectedCell.row !== row;
                  const isInSameBox =
                    selectedCell &&
                    Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
                    Math.floor(selectedCell.col / 3) === Math.floor(col / 3) &&
                    !(selectedCell.row === row && selectedCell.col === col);
                  const isError = !showSolution && hasError(row, col, grid, solution, puzzle);
                  const isSameNum = !showSolution && hasSameNumber(row, col);
                  const value = showSolution ? solution[row][col] : grid[row][col];
                  const cellNotes = !showSolution && notes ? notes[row][col] : new Set();
                  const isGiven = puzzle[row][col] !== 0;

                  return (
                    <div
                      key={`${row}-${col}`}
                      onClick={() => handleCellClick(row, col)}
                      className={`
                        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center
                        font-mono font-bold text-sm sm:text-base md:text-lg
                        cursor-pointer transition-colors
                        border-l border-t border-text-muted
                        ${col === 8 ? 'border-r' : ''}
                        ${row === 8 ? 'border-b' : ''}
                        ${col % 3 === 2 && col !== 8 ? 'border-r-2 border-r-text-primary' : ''}
                        ${row % 3 === 2 && row !== 8 ? 'border-b-2 border-b-text-primary' : ''}
                        ${isSelected ? 'bg-accent text-white' : ''}
                        ${isSameRow || isSameCol || isInSameBox ? 'bg-accent-muted' : ''}
                        ${isError ? 'bg-error/20 text-error' : ''}
                        ${isSameNum ? 'bg-accent/20' : ''}
                        ${!isSelected && !isError && !isSameNum && 'hover:bg-surface-hover'}
                        ${isGiven ? 'text-text-primary' : 'text-accent'}
                      `}
                    >
                      {value ? (
                        <span>{value}</span>
                      ) : pencilMode && cellNotes.size > 0 ? (
                        <div className="grid grid-cols-3 gap-px text-xs md:text-sm leading-none">
                          {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                            <div
                              key={num}
                              className={cellNotes.has(num) ? 'text-text-primary' : 'text-transparent'}
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Number Pad */}
      <Card className="p-4">
        <p className="text-xs text-text-secondary mb-3 uppercase font-medium">Enter Numbers</p>
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="py-2 px-1 sm:px-3 rounded-lg font-mono font-bold text-sm sm:text-base
                bg-surface border border-border hover:bg-surface-hover text-text-primary
                transition-colors active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => {
              if (!selectedCell || !grid) return;
              const newGrid = grid.map((r) => [...r]);
              newGrid[selectedCell.row][selectedCell.col] = 0;
              setGrid(newGrid);
            }}
            className="py-2 px-1 sm:px-3 rounded-lg font-bold text-sm sm:text-base col-span-5 sm:col-span-9
              bg-error/10 border border-error text-error hover:bg-error/20 transition-colors active:scale-95"
          >
            Delete
          </button>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="mt-6 p-4 bg-surface">
        <p className="text-xs text-text-secondary mb-2">
          <strong>How to play:</strong> Fill each row, column, and 3×3 box with digits 1-9.
          Use arrow keys to navigate, numbers 1-9 to enter, Delete to clear. Toggle pencil mode
          for candidates. Click the same number highlights all occurrences.
        </p>
      </Card>

      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
