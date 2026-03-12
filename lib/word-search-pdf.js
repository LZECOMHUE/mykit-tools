import { jsPDF } from 'jspdf';

/**
 * Theme colour palettes for different word search themes.
 * Each has a primary accent, a soft background tint, and a border colour.
 */
const THEME_COLORS = {
  Halloween: { accent: '#E85D04', bg: '#FFF3E0', border: '#E85D04', headerBg: '#1a1a2e', headerText: '#ffffff', subtitle: '#F4A261' },
  Christmas: { accent: '#B71C1C', bg: '#FFF8F0', border: '#B71C1C', headerBg: '#1B5E20', headerText: '#ffffff', subtitle: '#FFD54F' },
  Animals:   { accent: '#2E7D32', bg: '#F1F8E9', border: '#2E7D32', headerBg: '#1B5E20', headerText: '#ffffff', subtitle: '#A5D6A7' },
  Food:      { accent: '#E65100', bg: '#FFF3E0', border: '#E65100', headerBg: '#BF360C', headerText: '#ffffff', subtitle: '#FFCC80' },
  Sports:    { accent: '#1565C0', bg: '#E3F2FD', border: '#1565C0', headerBg: '#0D47A1', headerText: '#ffffff', subtitle: '#90CAF9' },
  Science:   { accent: '#4A148C', bg: '#F3E5F5', border: '#4A148C', headerBg: '#311B92', headerText: '#ffffff', subtitle: '#CE93D8' },
  Countries: { accent: '#00695C', bg: '#E0F2F1', border: '#00695C', headerBg: '#004D40', headerText: '#ffffff', subtitle: '#80CBC4' },
  default:   { accent: '#2563eb', bg: '#EFF6FF', border: '#2563eb', headerBg: '#1e3a5f', headerText: '#ffffff', subtitle: '#93C5FD' },
};

/**
 * Difficulty labels for the subtitle
 */
const DIFFICULTY_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

/**
 * Generate a professionally designed PDF word search worksheet.
 *
 * @param {Object} options
 * @param {string[][]} options.grid - 2D array of letters
 * @param {string[]} options.words - Words to find
 * @param {number} options.gridSize - Grid dimension (e.g. 10 for 10x10)
 * @param {string} options.themeName - Theme name (e.g. "Halloween")
 * @param {string} options.difficulty - "easy" | "medium" | "hard"
 * @param {boolean} options.includeAnswers - Whether to highlight answers
 * @param {Object} options.wordLocations - Map of word -> { cells: [{row, col}] }
 */
export function generateWordSearchPDF({
  grid,
  words,
  gridSize,
  themeName = 'Word Search',
  difficulty = 'medium',
  includeAnswers = false,
  wordLocations = {},
}) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = 210;
  const pageH = 297;
  const margin = 15;
  const contentW = pageW - margin * 2;

  const colors = THEME_COLORS[themeName] || THEME_COLORS.default;
  const title = `${themeName} Word Search`;

  // ── Decorative page border ──────────────────────────────
  doc.setDrawColor(colors.accent);
  doc.setLineWidth(1.5);
  doc.roundedRect(8, 8, pageW - 16, pageH - 16, 4, 4, 'S');
  doc.setLineWidth(0.5);
  doc.roundedRect(10, 10, pageW - 20, pageH - 20, 3, 3, 'S');

  // ── Header banner ──────────────────────────────────────
  const headerH = 28;
  doc.setFillColor(colors.headerBg);
  doc.roundedRect(margin, margin, contentW, headerH, 3, 3, 'F');

  // Title text
  doc.setTextColor(colors.headerText);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(title, pageW / 2, margin + 12, { align: 'center' });

  // Subtitle
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const diffLabel = DIFFICULTY_LABELS[difficulty] || 'Medium';
  const subtitle = `${gridSize}x${gridSize} Grid  |  ${diffLabel} Difficulty  |  ${words.length} Words`;
  doc.setTextColor(colors.subtitle);
  doc.text(subtitle, pageW / 2, margin + 21, { align: 'center' });

  // ── Grid ────────────────────────────────────────────────
  const gridTop = margin + headerH + 8;
  const maxGridW = contentW;
  // Use more vertical space - leave room for word list + footer
  const maxGridH = pageH - gridTop - 75; // word list + name/date + footer
  const cellSize = Math.min(maxGridW / gridSize, maxGridH / gridSize);
  const gridW = cellSize * gridSize;
  const gridX = (pageW - gridW) / 2; // centre the grid

  // Grid outer border
  doc.setDrawColor(colors.accent);
  doc.setLineWidth(0.8);
  doc.rect(gridX, gridTop, gridW, gridW);

  // Answer highlight colours
  const answerColors = [
    [255, 200, 200], [200, 230, 255], [200, 255, 200], [255, 230, 200],
    [230, 200, 255], [255, 255, 200], [200, 255, 230], [255, 200, 230],
    [220, 220, 255], [200, 240, 240], [240, 220, 200], [220, 255, 220],
  ];

  // Build answer cell lookup
  const answerCellMap = {};
  if (includeAnswers) {
    const wordList = Object.keys(wordLocations);
    wordList.forEach((word, wordIdx) => {
      const loc = wordLocations[word];
      if (loc && loc.cells) {
        const color = answerColors[wordIdx % answerColors.length];
        loc.cells.forEach((cell) => {
          answerCellMap[`${cell.row}-${cell.col}`] = color;
        });
      }
    });
  }

  // Letter font size - scale to fill the cell prominently
  const letterFontSize = Math.max(12, cellSize * 0.75);

  // Draw cells
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = gridX + col * cellSize;
      const y = gridTop + row * cellSize;
      const letter = grid[row]?.[col] || '';

      // Alternating subtle background for readability
      if ((row + col) % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(x, y, cellSize, cellSize, 'F');
      }

      // Answer highlight
      if (includeAnswers) {
        const key = `${row}-${col}`;
        if (answerCellMap[key]) {
          const [r, g, b] = answerCellMap[key];
          doc.setFillColor(r, g, b);
          doc.rect(x, y, cellSize, cellSize, 'F');
        }
      }

      // Cell border
      doc.setDrawColor(210, 210, 210);
      doc.setLineWidth(0.15);
      doc.rect(x, y, cellSize, cellSize, 'S');

      // Letter - large, bold, centered
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(letterFontSize);
      doc.setFont('helvetica', 'bold');
      doc.text(letter, x + cellSize / 2, y + cellSize * 0.68, { align: 'center' });
    }
  }

  // ── Words to Find section ──────────────────────────────
  const wordSectionTop = gridTop + gridW + 6;

  // Section header with accent bar
  doc.setFillColor(colors.accent);
  doc.roundedRect(margin, wordSectionTop, contentW, 7, 1, 1, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(includeAnswers ? 'Answer Key' : 'Words to Find', pageW / 2, wordSectionTop + 5, { align: 'center' });

  // Calculate word list layout dynamically
  const cols = words.length <= 8 ? 2 : words.length <= 15 ? 3 : 4;
  const colWidth = contentW / cols;
  const rowH = 5;
  const wordsPerCol = Math.ceil(words.length / cols);
  const wordListH = wordsPerCol * rowH + 8;

  // Word list background
  const wordListTop = wordSectionTop + 9;
  doc.setFillColor(colors.bg);
  doc.roundedRect(margin, wordListTop, contentW, wordListH, 2, 2, 'F');
  doc.setDrawColor(colors.border);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, wordListTop, contentW, wordListH, 2, 2, 'S');

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');

  words.forEach((word, idx) => {
    const colIdx = Math.floor(idx / wordsPerCol);
    const rowIdx = idx % wordsPerCol;
    const x = margin + 6 + colIdx * colWidth;
    const y = wordListTop + 6 + rowIdx * rowH;

    if (includeAnswers) {
      const colorIdx = Object.keys(wordLocations).indexOf(word);
      if (colorIdx >= 0) {
        const [r, g, b] = answerColors[colorIdx % answerColors.length];
        doc.setFillColor(r, g, b);
        doc.circle(x - 2, y - 1.2, 1.5, 'F');
      }
    }

    doc.setTextColor(30, 30, 30);
    doc.text(`${word}`, x + 2, y);
  });

  // ── Name / Date line ───────────────────────────────────
  const footerY = wordListTop + wordListH + 6;
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);

  doc.setTextColor(120, 120, 120);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Name:', margin + 2, footerY);
  doc.line(margin + 18, footerY, margin + 80, footerY);
  doc.text('Date:', margin + 90, footerY);
  doc.line(margin + 104, footerY, margin + 150, footerY);

  // ── Watermark footer ──────────────────────────────────
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('mykit.tools', pageW / 2, pageH - 12, { align: 'center' });

  // ── Trigger download ──────────────────────────────────
  const filename = `${themeName.toLowerCase().replace(/\s+/g, '-')}-word-search${includeAnswers ? '-answers' : ''}.pdf`;
  doc.save(filename);
}
