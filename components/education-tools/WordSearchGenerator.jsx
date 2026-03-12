'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateWordSearchPDF } from '@/lib/word-search-pdf';

const BUILT_IN_THEMES = {
  animals: {
    name: 'Animals',
    words: [
      'CAT', 'DOG', 'COW', 'PIG', 'HEN',
      'FROG', 'BEAR', 'FISH', 'DEER', 'DUCK',
      'LION', 'TIGER', 'EAGLE', 'KOALA', 'PANDA',
      'WHALE', 'SNAKE', 'ZEBRA', 'SHARK', 'HORSE',
      'PENGUIN', 'DOLPHIN', 'GIRAFFE', 'GORILLA', 'ELEPHANT',
    ],
  },
  food: {
    name: 'Food',
    words: [
      'PIE', 'JAM', 'HAM', 'EGG', 'NUT',
      'SOUP', 'TACO', 'CAKE', 'RICE', 'CORN',
      'PIZZA', 'SUSHI', 'PASTA', 'SALAD', 'STEAK',
      'CURRY', 'BREAD', 'CHEESE', 'WAFFLE', 'NOODLES',
      'BURGER', 'PANCAKE', 'CHOCOLATE', 'MUFFIN', 'COOKIE',
    ],
  },
  sports: {
    name: 'Sports',
    words: [
      'SKI', 'RUN', 'ROW', 'BOX',
      'GOLF', 'SWIM', 'SURF', 'JUDO', 'POLO',
      'RUGBY', 'TENNIS', 'BOXING', 'HOCKEY', 'SKIING',
      'KARATE', 'CYCLING', 'FENCING', 'ARCHERY', 'CRICKET',
      'SURFING', 'FOOTBALL', 'BASEBALL', 'SWIMMING', 'HANDBALL',
    ],
  },
  science: {
    name: 'Science',
    words: [
      'ION', 'DNA', 'LAB', 'GAS',
      'ATOM', 'CELL', 'STAR', 'WAVE', 'LENS',
      'PRISM', 'LIGHT', 'FORCE', 'ORBIT', 'LASER',
      'OXYGEN', 'PLANET', 'FOSSIL', 'MAGNET', 'PHOTON',
      'GRAVITY', 'ECLIPSE', 'NEURON', 'GENOME', 'ENERGY',
    ],
  },
  countries: {
    name: 'Countries',
    words: [
      'USA', 'UK',
      'PERU', 'CUBA', 'IRAN', 'IRAQ', 'FIJI',
      'JAPAN', 'SPAIN', 'ITALY', 'CHILE', 'KENYA',
      'INDIA', 'EGYPT', 'FRANCE', 'BRAZIL', 'CANADA',
      'MEXICO', 'SWEDEN', 'GREECE', 'NORWAY', 'TURKEY',
    ],
  },
};

const WORD_COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#6366f1', // indigo
  '#84cc16', // lime
  '#f97316', // orange
  '#14b8a6', // teal
  '#a855f7', // fuchsia
  '#0ea5e9', // sky
  '#d946ef', // violet
  '#ca8a04', // yellow
];

const DIRECTIONS = {
  easy: [
    [0, 1],  // right
    [1, 0],  // down
  ],
  medium: [
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
    [-1, 0], // up
  ],
  hard: [
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
    [-1, 0], // up
    [1, 1],  // down-right
    [-1, -1], // up-left
    [1, -1],  // down-left
    [-1, 1],  // up-right
  ],
};

export default function WordSearchGenerator({ theme: propsTheme = null }) {
  const canvasRef = useRef(null);
  const [gridSize, setGridSize] = useState(12);
  const [difficulty, setDifficulty] = useState('medium');
  const [useRandomLetters, setUseRandomLetters] = useState(true);
  const isPresetTheme = !!propsTheme;
  const [selectedTheme, setSelectedTheme] = useState(isPresetTheme ? 'preset' : 'animals');
  const [customWords, setCustomWords] = useState('');
  const [words, setWords] = useState(isPresetTheme ? propsTheme.words : BUILT_IN_THEMES.animals.words);
  const [puzzleWords, setPuzzleWords] = useState([]); // words in the current puzzle
  const [grid, setGrid] = useState([]);
  const [wordLocations, setWordLocations] = useState({});
  const [foundWords, setFoundWords] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionCells, setSelectionCells] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [unplacedWords, setUnplacedWords] = useState([]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Completion effect
  useEffect(() => {
    if (foundWords.size > 0 && puzzleWords.length > 0 && foundWords.size === puzzleWords.length) {
      setTimerActive(false);
    }
  }, [foundWords, puzzleWords.length]);

  // Parse custom words
  const parseCustomWords = (input) => {
    if (!input.trim()) return [];
    return input
      .split(/[,\n]+/)
      .map((w) => w.trim().toUpperCase())
      .filter((w) => w.length > 0 && w.length <= Math.floor(gridSize * 0.8));
  };

  // Handle theme change
  const handleThemeChange = (themeName) => {
    setSelectedTheme(themeName);
    if (themeName === 'custom') {
      setWords([]);
    } else {
      const themeData = BUILT_IN_THEMES[themeName];
      setWords(themeData.words);
      setCustomWords('');
    }
    setFoundWords(new Set());
    setTimer(0);
    setTimerActive(false);
  };

  // Handle custom words input
  const handleCustomWordsChange = (e) => {
    const input = e.target.value;
    setCustomWords(input);
    const parsed = parseCustomWords(input);
    setWords(parsed);
  };

  // Generate grid
  const generateGrid = useCallback(() => {
    // Filter words that can fit in the grid (max 80% of grid size)
    const maxWordLen = Math.floor(gridSize * 0.8);
    const fittingWords = words.filter((w) => w.length <= maxWordLen);

    if (fittingWords.length < 3) {
      return;
    }

    // Cap word count based on grid capacity so it doesn't get too crowded
    const maxWords = Math.min(fittingWords.length, Math.floor(gridSize * 1.2));

    // Shuffle and pick a random selection if we have more words than needed
    const shuffled = [...fittingWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, maxWords);

    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(''));
    const newWordLocations = {};
    const placedWords = new Set();
    const directions = DIRECTIONS[difficulty];

    // Sort words by length (longest first) for better placement
    const sortedWords = [...selectedWords].sort((a, b) => b.length - a.length);

    // Try to place each word
    for (const word of sortedWords) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 200;

      while (!placed && attempts < maxAttempts) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const startRow = Math.floor(Math.random() * gridSize);
        const startCol = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(newGrid, word, startRow, startCol, direction)) {
          placeWord(newGrid, word, startRow, startCol, direction);
          newWordLocations[word] = {
            start: { row: startRow, col: startCol },
            direction,
            cells: getCellsForWord(startRow, startCol, word.length, direction),
          };
          placedWords.add(word);
          placed = true;
        }

        attempts++;
      }
    }

    // Fill remaining cells with random letters
    if (useRandomLetters) {
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (!newGrid[i][j]) {
            newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
          }
        }
      }
    } else {
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (!newGrid[i][j]) {
            newGrid[i][j] = '·';
          }
        }
      }
    }

    // Track which words made it into the puzzle
    const actualWords = selectedWords.filter((w) => placedWords.has(w));
    setPuzzleWords(actualWords);
    setGrid(newGrid);
    setWordLocations(newWordLocations);
    setFoundWords(new Set());
    setTimer(0);
    setTimerActive(false);
    setSelectionCells([]);

    const unplaced = selectedWords.filter((w) => !placedWords.has(w));
    if (unplaced.length > 0) {
      setUnplacedWords(unplaced);
    } else {
      setUnplacedWords([]);
    }
  }, [words, gridSize, difficulty, useRandomLetters]);

  // Check if word can be placed
  const canPlaceWord = (currentGrid, word, row, col, direction) => {
    const [dx, dy] = direction;

    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;

      if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
        return false;
      }

      const cell = currentGrid[newRow][newCol];
      if (cell && cell !== word[i]) {
        return false;
      }
    }

    return true;
  };

  // Place word in grid
  const placeWord = (currentGrid, word, row, col, direction) => {
    const [dx, dy] = direction;
    for (let i = 0; i < word.length; i++) {
      currentGrid[row + i * dx][col + i * dy] = word[i];
    }
  };

  // Get cells for word
  const getCellsForWord = (row, col, length, direction) => {
    const [dx, dy] = direction;
    const cells = [];
    for (let i = 0; i < length; i++) {
      cells.push({ row: row + i * dx, col: col + i * dy });
    }
    return cells;
  };

  // Get cells between two points
  const getCellsBetween = (startRow, startCol, endRow, endCol) => {
    const cells = [];
    const rowDiff = Math.sign(endRow - startRow);
    const colDiff = Math.sign(endCol - startCol);

    // Check if it's a valid straight line
    const rowDelta = endRow - startRow;
    const colDelta = endCol - startCol;

    if (rowDelta !== 0 && colDelta !== 0) {
      // Diagonal
      if (Math.abs(rowDelta) !== Math.abs(colDelta)) {
        return cells; // Invalid diagonal
      }
    }

    let row = startRow;
    let col = startCol;

    while (true) {
      cells.push({ row, col });
      if (row === endRow && col === endCol) break;
      row += rowDiff;
      col += colDiff;
    }

    return cells;
  };

  // Handle cell selection
  const handleCellMouseDown = (row, col) => {
    setSelectionStart({ row, col });
    setSelectionCells([{ row, col }]);
    setIsSelecting(true);
    if (!timerActive && foundWords.size === 0) {
      setTimerActive(true);
    }
  };

  const handleCellMouseOver = (row, col) => {
    if (!isSelecting || !selectionStart) return;

    const cells = getCellsBetween(selectionStart.row, selectionStart.col, row, col);
    setSelectionCells(cells);
  };

  const handleCellMouseUp = () => {
    if (!isSelecting || !selectionStart) return;
    setIsSelecting(false);

    // Check if selected cells spell a word
    const selectedWord = selectionCells.map((cell) => grid[cell.row][cell.col]).join('');

    if (puzzleWords.includes(selectedWord) && !foundWords.has(selectedWord)) {
      setFoundWords((prev) => new Set([...prev, selectedWord]));
    }

    setSelectionCells([]);
  };

  // Format timer
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get the theme name for PDF title
  const getThemeName = () => {
    if (isPresetTheme && propsTheme?.name) return propsTheme.name;
    if (selectedTheme === 'custom') return 'Custom';
    const theme = BUILT_IN_THEMES[selectedTheme];
    return theme ? theme.name : 'Word Search';
  };

  // Download as professional PDF
  const downloadPuzzle = (includeAnswers = false) => {
    if (!grid.length) return;

    generateWordSearchPDF({
      grid,
      words: puzzleWords,
      gridSize,
      themeName: getThemeName(),
      difficulty,
      includeAnswers,
      wordLocations,
    });
  };

  const isCellSelected = (row, col) => {
    return selectionCells.some((cell) => cell.row === row && cell.col === col);
  };

  const getCellHighlightColor = (row, col) => {
    for (const word of foundWords) {
      const location = wordLocations[word];
      if (location) {
        for (const cell of location.cells) {
          if (cell.row === row && cell.col === col) {
            const colorIndex = [...foundWords].indexOf(word) % WORD_COLORS.length;
            return WORD_COLORS[colorIndex];
          }
        }
      }
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card>
        <div className="space-y-6">
          {/* Theme Selector — hidden when a preset theme is provided (e.g. Halloween, Christmas) */}
          {!isPresetTheme && (
            <>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  🎨 Choose a Theme
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {Object.entries(BUILT_IN_THEMES).map(([key, themeData]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange(key)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTheme === key
                          ? 'bg-accent text-white'
                          : 'bg-surface text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      {themeData.name}
                    </button>
                  ))}
                  <button
                    onClick={() => handleThemeChange('custom')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTheme === 'custom'
                        ? 'bg-accent text-white'
                        : 'bg-surface text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* Custom Words Input */}
              {selectedTheme === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    📝 Enter Words (one per line or comma-separated)
                  </label>
                  <textarea
                    value={customWords}
                    onChange={handleCustomWordsChange}
                    placeholder="Enter words (minimum 3, maximum 30)"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent-muted font-mono text-sm"
                    rows="4"
                  />
                  <div className="text-sm text-text-secondary mt-2">
                    {words.length} words entered (max 30)
                  </div>
                </div>
              )}
            </>
          )}

          {/* Grid Size */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              📏 Grid Size
            </label>
            <div className="flex gap-2 flex-wrap">
              {[10, 12, 15, 18, 20].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setGridSize(size);
                    setFoundWords(new Set());
                    setTimer(0);
                    setTimerActive(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    gridSize === size
                      ? 'bg-accent text-white'
                      : 'bg-surface text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  {size}x{size}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ⚙️ Difficulty
            </label>
            <div className="flex gap-2">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setDifficulty(level);
                    setFoundWords(new Set());
                    setTimer(0);
                    setTimerActive(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    difficulty === level
                      ? 'bg-accent text-white'
                      : 'bg-surface text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Display Options */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useRandomLetters}
                onChange={(e) => setUseRandomLetters(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-text-primary">
                Fill empty cells with random letters
              </span>
            </label>
            {!useRandomLetters && (
              <p className="text-sm text-text-secondary mt-2">Dots will show empty cells</p>
            )}
          </div>

          {/* Generate Button */}
          <Button onClick={generateGrid} variant="primary" size="lg" className="w-full">
            🔄 Generate Puzzle
          </Button>
        </div>
      </Card>

      {/* Warning for unplaced words */}
      {unplacedWords.length > 0 && (
        <div className="bg-warning/10 border border-warning text-warning p-4 rounded-lg">
          <p className="font-medium">⚠️ Some words couldn't fit:</p>
          <p className="text-sm mt-1">{unplacedWords.join(', ')}</p>
          <p className="text-sm mt-2">Try a larger grid size or shorter words.</p>
        </div>
      )}

      {/* Main Puzzle Area */}
      {grid.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grid */}
          <div className="lg:col-span-2">
            <Card className="overflow-auto">
              <div className="flex flex-col gap-4">
                {/* Timer and Progress */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-text-primary">
                      ⏱️ {formatTimer(timer)}
                    </div>
                    <div className="text-sm font-medium text-text-primary">
                      ✓ {foundWords.size} / {puzzleWords.length}
                    </div>
                  </div>
                  {foundWords.size === puzzleWords.length && foundWords.size > 0 && (
                    <div className="text-lg font-bold text-success animate-pulse">
                      🎉 Completed!
                    </div>
                  )}
                </div>

                {/* Grid */}
                <div
                  className="inline-block"
                  onMouseUp={handleCellMouseUp}
                  onMouseLeave={() => {
                    if (isSelecting) {
                      setIsSelecting(false);
                      setSelectionCells([]);
                    }
                  }}
                  style={{
                    display: 'inline-grid',
                    gridTemplateColumns: `repeat(${gridSize}, 36px)`,
                    gap: '0px',
                    border: '2px solid #1a1a1a',
                    backgroundColor: '#ffffff',
                  }}
                >
                  {grid.map((row, rowIdx) =>
                    row.map((letter, colIdx) => {
                      const isSelected = isCellSelected(rowIdx, colIdx);
                      const highlightColor = getCellHighlightColor(rowIdx, colIdx);

                      return (
                        <div
                          key={`${rowIdx}-${colIdx}`}
                          onMouseDown={() => handleCellMouseDown(rowIdx, colIdx)}
                          onMouseOver={() => handleCellMouseOver(rowIdx, colIdx)}
                          className="flex items-center justify-center border cursor-pointer font-mono font-bold text-sm text-text-primary select-none transition-colors"
                          style={{
                            width: 36,
                            height: 36,
                            backgroundColor: highlightColor
                              ? `${highlightColor}30`
                              : isSelected
                              ? '#2563eb40'
                              : '#ffffff',
                            borderColor: isSelected ? '#2563eb' : '#e5e5e5',
                          }}
                        >
                          {letter}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </Card>

            {/* Download Buttons */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <Button onClick={() => downloadPuzzle(false)} variant="secondary" size="md">
                ⬇️ Download PDF
              </Button>
              <Button onClick={() => downloadPuzzle(true)} variant="secondary" size="md">
                ⬇️ Download Answer Key
              </Button>
              <Button
                onClick={() => {
                  setFoundWords(new Set());
                  setTimer(0);
                  setTimerActive(false);
                  setSelectionCells([]);
                }}
                variant="ghost"
                size="md"
              >
                🔁 Reset
              </Button>
            </div>
          </div>

          {/* Word List Sidebar */}
          <div>
            <Card>
              <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
                Words to Find
              </h3>
              <div className="space-y-2">
                {puzzleWords.map((word, idx) => {
                  const isFound = foundWords.has(word);
                  const colorIndex = idx % WORD_COLORS.length;
                  const color = WORD_COLORS[colorIndex];

                  return (
                    <div
                      key={word}
                      className="p-2 rounded-lg transition-all"
                      style={{
                        backgroundColor: isFound ? `${color}20` : '#f8f8f8',
                        borderLeft: `4px solid ${color}`,
                      }}
                    >
                      <span
                        className={`font-mono font-medium text-sm ${
                          isFound
                            ? 'line-through text-text-secondary'
                            : 'text-text-primary'
                        }`}
                      >
                        {isFound ? '✓ ' : '○ '} {word}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Instructions */}
              <div className="mt-6 p-3 bg-surface rounded-lg">
                <p className="text-xs text-text-secondary">
                  <strong>How to play:</strong> Click and drag across letters to select words.
                  Words can go horizontal, vertical, or diagonal depending on difficulty.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Empty State */}
      {grid.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-text-secondary text-lg">
            Configure your puzzle and click "Generate Puzzle" to get started! 🎯
          </p>
        </Card>
      )}
    </div>
  );
}
