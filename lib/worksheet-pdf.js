import { jsPDF } from 'jspdf';

/**
 * Shared PDF generation utilities for education worksheets.
 * All worksheets share a consistent professional design:
 * - A4 portrait with decorative border
 * - Coloured header banner with title and subtitle
 * - Name/Date lines
 * - mykit.tools watermark footer
 */

// ── Shared constants ────────────────────────────────────
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 15;
const CONTENT_W = PAGE_W - MARGIN * 2;

function createDoc() {
  return new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
}

function drawPageFrame(doc, accentColor = '#2563eb') {
  // Decorative double border
  doc.setDrawColor(accentColor);
  doc.setLineWidth(1.5);
  doc.roundedRect(8, 8, PAGE_W - 16, PAGE_H - 16, 4, 4, 'S');
  doc.setLineWidth(0.5);
  doc.roundedRect(10, 10, PAGE_W - 20, PAGE_H - 20, 3, 3, 'S');
}

function drawHeader(doc, { title, subtitle, bgColor = '#1e3a5f', textColor = '#ffffff', subtitleColor = '#93C5FD' }) {
  const headerH = 24;
  doc.setFillColor(bgColor);
  doc.roundedRect(MARGIN, MARGIN, CONTENT_W, headerH, 3, 3, 'F');

  doc.setTextColor(textColor);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(title, PAGE_W / 2, MARGIN + 10, { align: 'center' });

  if (subtitle) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(subtitleColor);
    doc.text(subtitle, PAGE_W / 2, MARGIN + 18, { align: 'center' });
  }

  return MARGIN + headerH + 6; // return Y position after header
}

function drawNameDateLines(doc, y, studentName = '') {
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.setTextColor(120, 120, 120);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  doc.text('Name:', MARGIN + 2, y);
  if (studentName) {
    doc.setTextColor(30, 30, 30);
    doc.text(studentName, MARGIN + 18, y);
  }
  doc.line(MARGIN + 18, y + 1, MARGIN + 80, y + 1);

  doc.setTextColor(120, 120, 120);
  doc.text('Date:', MARGIN + 90, y);
  doc.line(MARGIN + 104, y + 1, MARGIN + 150, y + 1);

  return y + 8;
}

function drawWatermark(doc) {
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('mykit.tools', PAGE_W / 2, PAGE_H - 12, { align: 'center' });
}

function savePDF(doc, filename) {
  doc.save(filename);
}

// ── Handwriting Practice Sheet PDF ──────────────────────
export function generateHandwritingPDF({
  text,
  studentName = '',
  styleOption = 'print',
  lineStyle = 'solid',
  lineSpacing = 'medium',
  fontSize = 'medium',
  repetitions = 1,
}) {
  const doc = createDoc();
  const accentColor = '#6366f1'; // indigo for education
  drawPageFrame(doc, accentColor);

  const spacingMap = { small: 8, medium: 12, large: 16 };
  const fontSizeMap = { small: 12, medium: 16, large: 22 };
  const guideFontSize = fontSizeMap[fontSize];
  const lineGap = spacingMap[lineSpacing];

  let y = drawHeader(doc, {
    title: 'Handwriting Practice',
    subtitle: `${styleOption === 'cursive' ? 'Cursive' : 'Print'} Style  |  ${fontSize.charAt(0).toUpperCase() + fontSize.slice(1)} Size`,
    bgColor: '#4338ca',
    subtitleColor: '#c7d2fe',
  });

  y = drawNameDateLines(doc, y, studentName);
  y += 4;

  const lines = text.split('\n').filter(l => l.length > 0);
  const font = styleOption === 'cursive' ? 'times' : 'courier';

  for (const line of lines) {
    for (let rep = 0; rep < repetitions; rep++) {
      if (y + lineGap + 16 > PAGE_H - 25) break; // prevent overflow

      // Traced guide text (light grey)
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(guideFontSize);
      doc.setFont(font, 'normal');
      doc.text(line, MARGIN + 2, y + 4);

      // Practice lines below
      const lineCount = 3;
      const lineStartY = y + guideFontSize * 0.4 + 2;
      for (let i = 0; i < lineCount; i++) {
        const ly = lineStartY + i * 4;
        doc.setDrawColor(210, 210, 210);
        doc.setLineWidth(0.2);
        if (lineStyle === 'dashed') {
          doc.setLineDashPattern([2, 2], 0);
        } else {
          doc.setLineDashPattern([], 0);
        }
        doc.line(MARGIN, ly, PAGE_W - MARGIN, ly);
      }
      doc.setLineDashPattern([], 0);

      y += lineGap + 4;
    }
  }

  drawWatermark(doc);
  savePDF(doc, 'handwriting-practice-sheet.pdf');
}

// ── Spelling Test PDF ───────────────────────────────────
export function generateSpellingTestPDF({
  testVersions,
  studentName = '',
  testDate = '',
  includeWordCount = true,
  showAnswers = false,
}) {
  const doc = createDoc();
  const accentColor = '#0891b2'; // cyan for spelling
  drawPageFrame(doc, accentColor);

  const wordCount = testVersions[0]?.length || 0;
  let y = drawHeader(doc, {
    title: 'Spelling Test',
    subtitle: `${wordCount} Words${testVersions.length > 1 ? `  |  ${testVersions.length} Versions` : ''}`,
    bgColor: '#155e75',
    subtitleColor: '#a5f3fc',
  });

  y = drawNameDateLines(doc, y, studentName);

  if (testDate) {
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${testDate}`, PAGE_W - MARGIN - 2, y - 6, { align: 'right' });
  }

  y += 2;

  // Draw test items for each version
  testVersions.forEach((words, vIdx) => {
    if (vIdx > 0) {
      y += 6;
      if (y > PAGE_H - 60) {
        doc.addPage();
        drawPageFrame(doc, accentColor);
        y = MARGIN + 10;
      }
      doc.setFillColor(accentColor);
      doc.roundedRect(MARGIN, y, CONTENT_W, 6, 1, 1, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`Version ${vIdx + 1}`, PAGE_W / 2, y + 4.2, { align: 'center' });
      y += 10;
    }

    const itemHeight = 7;
    words.forEach((word, idx) => {
      if (y + itemHeight > PAGE_H - 30) {
        doc.addPage();
        drawPageFrame(doc, accentColor);
        y = MARGIN + 10;
      }

      // Number
      doc.setTextColor(120, 120, 120);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${idx + 1}.`, MARGIN + 2, y + 3);

      // Answer line
      const lineStart = MARGIN + 12;
      const lineWidth = Math.max(word.length * 3.5 + 10, 50);
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(lineStart, y + 4, lineStart + lineWidth, y + 4);

      y += itemHeight;
    });
  });

  // Answer key
  if (showAnswers) {
    y += 8;
    if (y > PAGE_H - 50) {
      doc.addPage();
      drawPageFrame(doc, accentColor);
      y = MARGIN + 10;
    }

    // Divider
    doc.setDrawColor(accentColor);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 6;

    doc.setFillColor(accentColor);
    doc.roundedRect(MARGIN, y, CONTENT_W, 6, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Answer Key', PAGE_W / 2, y + 4.2, { align: 'center' });
    y += 10;

    // Answers in columns
    testVersions.forEach((words, vIdx) => {
      if (vIdx > 0) {
        y += 4;
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(`Version ${vIdx + 1}`, MARGIN + 2, y);
        y += 4;
      }

      const cols = words.length > 10 ? 3 : 2;
      const colW = CONTENT_W / cols;
      const perCol = Math.ceil(words.length / cols);

      doc.setTextColor(30, 30, 30);
      doc.setFontSize(8);
      doc.setFont('courier', 'bold');

      words.forEach((word, idx) => {
        const col = Math.floor(idx / perCol);
        const row = idx % perCol;
        const x = MARGIN + 4 + col * colW;
        const itemY = y + row * 4.5;
        doc.text(`${idx + 1}. ${word}`, x, itemY);
      });

      y += perCol * 4.5 + 2;
    });
  }

  drawWatermark(doc);
  savePDF(doc, `spelling-test${showAnswers ? '-answers' : ''}.pdf`);
}

// ── Maths Worksheet PDF ─────────────────────────────────
export function generateMathsWorksheetPDF({
  questions,
  studentName = '',
  columns = 1,
  includeAnswerKey = true,
  difficulty = 'medium',
}) {
  const doc = createDoc();
  const accentColor = '#059669'; // emerald for maths
  drawPageFrame(doc, accentColor);

  const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  let y = drawHeader(doc, {
    title: 'Maths Worksheet',
    subtitle: `${questions.length} Questions  |  ${diffLabel} Difficulty  |  ${columns === 2 ? 'Two' : 'One'} Column${columns === 2 ? 's' : ''}`,
    bgColor: '#065f46',
    subtitleColor: '#6ee7b7',
  });

  y = drawNameDateLines(doc, y, studentName);
  y += 4;

  // Questions
  const colW = CONTENT_W / columns;
  const itemH = 7;
  const perCol = Math.ceil(questions.length / columns);

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(11);
  doc.setFont('courier', 'bold');

  questions.forEach((q, idx) => {
    const col = Math.floor(idx / perCol);
    const row = idx % perCol;
    const x = MARGIN + 4 + col * colW;
    const itemY = y + row * itemH;

    if (itemY > PAGE_H - 80) return; // safety

    // Number
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.text(`${idx + 1}.`, x, itemY);

    // Question
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.text(`${q.question} = ______`, x + 8, itemY);
  });

  // Answer key
  if (includeAnswerKey) {
    const questionsBottom = y + perCol * itemH + 4;
    let ansY = questionsBottom + 4;

    if (ansY > PAGE_H - 40) {
      doc.addPage();
      drawPageFrame(doc, accentColor);
      ansY = MARGIN + 10;
    }

    // Divider
    doc.setDrawColor(accentColor);
    doc.setLineWidth(0.6);
    doc.line(MARGIN, ansY, PAGE_W - MARGIN, ansY);
    ansY += 4;

    doc.setFillColor(accentColor);
    doc.roundedRect(MARGIN, ansY, CONTENT_W, 6, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Answer Key', PAGE_W / 2, ansY + 4.2, { align: 'center' });
    ansY += 10;

    // Answers in 4 columns
    const ansCols = 4;
    const ansColW = CONTENT_W / ansCols;
    const ansPerCol = Math.ceil(questions.length / ansCols);

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(8);
    doc.setFont('courier', 'bold');

    questions.forEach((q, idx) => {
      const col = Math.floor(idx / ansPerCol);
      const row = idx % ansPerCol;
      const x = MARGIN + 2 + col * ansColW;
      const itemY = ansY + row * 4;
      doc.text(`${idx + 1}. ${q.answer}`, x, itemY);
    });
  }

  drawWatermark(doc);
  savePDF(doc, 'maths-worksheet.pdf');
}

// ── Word Scramble PDF ───────────────────────────────────
export function generateWordScramblePDF({
  scrambledWords,
  originalWords,
  difficulty = 'medium',
  themeName = 'Custom',
}) {
  const doc = createDoc();
  const accentColor = '#d97706'; // amber for word games
  drawPageFrame(doc, accentColor);

  const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  let y = drawHeader(doc, {
    title: 'Word Scramble',
    subtitle: `${scrambledWords.length} Words  |  ${diffLabel} Difficulty  |  ${themeName} Theme`,
    bgColor: '#92400e',
    subtitleColor: '#fde68a',
  });

  y = drawNameDateLines(doc, y);
  y += 4;

  // Two-column layout: scrambled on left, answer blanks on right
  const halfW = CONTENT_W / 2 - 4;
  const leftX = MARGIN;
  const rightX = MARGIN + halfW + 8;
  const itemH = 8;

  // Column headers
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(leftX, y, halfW, 6, 1, 1, 'F');
  doc.roundedRect(rightX, y, halfW, 6, 1, 1, 'F');

  doc.setTextColor(80, 80, 80);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Scrambled Words', leftX + halfW / 2, y + 4.2, { align: 'center' });
  doc.text('Your Answers', rightX + halfW / 2, y + 4.2, { align: 'center' });
  y += 10;

  // Word rows
  scrambledWords.forEach((scrambled, idx) => {
    if (y + itemH > PAGE_H - 60) return;

    // Number + scrambled word
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.setFont('courier', 'bold');
    doc.text(`${idx + 1}.  ${scrambled.toUpperCase()}`, leftX + 2, y + 3);

    // Number + answer line
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(10);
    doc.text(`${idx + 1}.`, rightX + 2, y + 3);

    const lineStart = rightX + 10;
    const lineLen = Math.max(originalWords[idx].length * 3 + 10, 30);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(lineStart, y + 4, lineStart + lineLen, y + 4);

    // Subtle row divider
    if (idx < scrambledWords.length - 1) {
      doc.setDrawColor(240, 240, 240);
      doc.setLineWidth(0.1);
      doc.line(MARGIN, y + itemH - 1, PAGE_W - MARGIN, y + itemH - 1);
    }

    y += itemH;
  });

  // Answer key at bottom
  y += 6;
  doc.setDrawColor(accentColor);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 4;

  doc.setFillColor(accentColor);
  doc.roundedRect(MARGIN, y, CONTENT_W, 6, 1, 1, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Answer Key', PAGE_W / 2, y + 4.2, { align: 'center' });
  y += 10;

  const cols = originalWords.length > 8 ? 3 : 2;
  const colW = CONTENT_W / cols;
  const perCol = Math.ceil(originalWords.length / cols);

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(8);
  doc.setFont('courier', 'bold');

  originalWords.forEach((word, idx) => {
    const col = Math.floor(idx / perCol);
    const row = idx % perCol;
    const x = MARGIN + 4 + col * colW;
    const itemY = y + row * 4.5;
    doc.text(`${idx + 1}. ${word}`, x, itemY);
  });

  drawWatermark(doc);
  savePDF(doc, 'word-scramble.pdf');
}

// ── Sudoku PDF ──────────────────────────────────────────
export function generateSudokuPDF({
  puzzle,
  solution = null,
  difficulty = 'medium',
  includeAnswers = false,
}) {
  const doc = createDoc();
  const accentColor = '#7c3aed'; // violet for puzzles
  drawPageFrame(doc, accentColor);

  const puzzleNum = Math.floor(Math.random() * 100000);
  const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  let y = drawHeader(doc, {
    title: 'Sudoku Puzzle',
    subtitle: `${diffLabel} Difficulty  |  Puzzle #${puzzleNum}`,
    bgColor: '#4c1d95',
    subtitleColor: '#c4b5fd',
  });

  y = drawNameDateLines(doc, y);
  y += 2;

  // Calculate grid dimensions to fill page nicely
  const availH = PAGE_H - y - 30;
  const cellSize = Math.min(CONTENT_W / 9, availH / 9);
  const gridW = cellSize * 9;
  const gridX = (PAGE_W - gridW) / 2;

  const gridData = includeAnswers && solution ? solution : puzzle;

  // Draw cells
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const x = gridX + col * cellSize;
      const cy = y + row * cellSize;
      const num = gridData[row][col];

      // Alternating 3x3 box backgrounds
      const boxRow = Math.floor(row / 3);
      const boxCol = Math.floor(col / 3);
      if ((boxRow + boxCol) % 2 === 0) {
        doc.setFillColor(248, 248, 255);
        doc.rect(x, cy, cellSize, cellSize, 'F');
      }

      // Highlight answer cells that weren't in original puzzle
      if (includeAnswers && puzzle[row][col] === 0 && num !== 0) {
        doc.setFillColor(220, 240, 255);
        doc.rect(x, cy, cellSize, cellSize, 'F');
      }

      // Cell border
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.15);
      doc.rect(x, cy, cellSize, cellSize, 'S');

      // Number
      if (num !== 0) {
        const isOriginal = puzzle[row][col] !== 0;
        doc.setTextColor(isOriginal ? 20 : 100, isOriginal ? 20 : 100, isOriginal ? 20 : 180);
        doc.setFontSize(Math.max(10, cellSize * 0.6));
        doc.setFont('helvetica', 'bold');
        doc.text(String(num), x + cellSize / 2, cy + cellSize * 0.68, { align: 'center' });
      }
    }
  }

  // Bold 3x3 box borders
  doc.setDrawColor(40, 40, 40);
  doc.setLineWidth(0.8);
  for (let i = 0; i <= 3; i++) {
    const pos = gridX + i * cellSize * 3;
    doc.line(pos, y, pos, y + gridW);
    const hPos = y + i * cellSize * 3;
    doc.line(gridX, hPos, gridX + gridW, hPos);
  }

  // Outer border
  doc.setDrawColor(accentColor);
  doc.setLineWidth(1);
  doc.rect(gridX, y, gridW, gridW, 'S');

  if (includeAnswers) {
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Solution - blue numbers were blank in the puzzle', PAGE_W / 2, y + gridW + 6, { align: 'center' });
  }

  drawWatermark(doc);
  savePDF(doc, `sudoku-${difficulty}${includeAnswers ? '-solution' : ''}.pdf`);
}

// ── Invoice PDF ─────────────────────────────────────────
export function generateInvoicePDF({
  invoiceNumber = '',
  invoiceDate = '',
  paymentTerms = 'Due on receipt',
  currency = 'GBP',
  businessName = '',
  businessAddress = '',
  businessEmail = '',
  businessPhone = '',
  clientName = '',
  clientAddress = '',
  clientEmail = '',
  lineItems = [],
  taxRate = 0,
  discountType = 'percentage',
  discountValue = 0,
  notes = '',
}) {
  const doc = createDoc();

  // No decorative border for invoices - cleaner look
  const currencySymbol = currency === 'GBP' ? '\u00A3' : currency === 'USD' ? '$' : currency === 'EUR' ? '\u20AC' : '';

  // Header
  doc.setFillColor('#1e3a5f');
  doc.rect(0, 0, PAGE_W, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', MARGIN, 22);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  if (invoiceNumber) doc.text(`#${invoiceNumber}`, PAGE_W - MARGIN, 14, { align: 'right' });
  if (invoiceDate) doc.text(invoiceDate, PAGE_W - MARGIN, 20, { align: 'right' });
  if (paymentTerms) {
    doc.setFontSize(8);
    doc.text(paymentTerms, PAGE_W - MARGIN, 26, { align: 'right' });
  }

  let y = 45;

  // From / To sections
  const halfW = CONTENT_W / 2 - 4;

  // From
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('FROM', MARGIN, y);
  y += 5;

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  if (businessName) { doc.text(businessName, MARGIN, y); y += 5; }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  if (businessAddress) {
    const addrLines = businessAddress.split('\n');
    addrLines.forEach(line => { doc.text(line, MARGIN, y); y += 4; });
  }
  if (businessEmail) { doc.text(businessEmail, MARGIN, y); y += 4; }
  if (businessPhone) { doc.text(businessPhone, MARGIN, y); y += 4; }

  // To (right side)
  let toY = 45;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO', MARGIN + halfW + 8, toY);
  toY += 5;

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  if (clientName) { doc.text(clientName, MARGIN + halfW + 8, toY); toY += 5; }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  if (clientAddress) {
    const addrLines = clientAddress.split('\n');
    addrLines.forEach(line => { doc.text(line, MARGIN + halfW + 8, toY); toY += 4; });
  }
  if (clientEmail) { doc.text(clientEmail, MARGIN + halfW + 8, toY); toY += 4; }

  y = Math.max(y, toY) + 10;

  // Line items table
  const tableX = MARGIN;
  const descW = CONTENT_W * 0.45;
  const qtyW = CONTENT_W * 0.15;
  const rateW = CONTENT_W * 0.2;
  const amtW = CONTENT_W * 0.2;

  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(tableX, y, CONTENT_W, 8, 'F');

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Description', tableX + 2, y + 5.5);
  doc.text('Qty', tableX + descW + 2, y + 5.5);
  doc.text('Rate', tableX + descW + qtyW + 2, y + 5.5);
  doc.text('Amount', tableX + descW + qtyW + rateW + 2, y + 5.5);
  y += 10;

  // Table rows
  let subtotal = 0;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  lineItems.forEach((item, idx) => {
    const amount = (item.quantity || 0) * (item.unitPrice || 0);
    subtotal += amount;

    // Alternating row background
    if (idx % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(tableX, y, CONTENT_W, 7, 'F');
    }

    doc.setTextColor(30, 30, 30);
    doc.text(item.description || '', tableX + 2, y + 5);
    doc.text(String(item.quantity || 0), tableX + descW + 2, y + 5);
    doc.text(`${currencySymbol}${(item.unitPrice || 0).toFixed(2)}`, tableX + descW + qtyW + 2, y + 5);
    doc.text(`${currencySymbol}${amount.toFixed(2)}`, tableX + descW + qtyW + rateW + 2, y + 5);

    y += 7;
  });

  // Totals
  y += 4;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(tableX + descW + qtyW, y, PAGE_W - MARGIN, y);
  y += 6;

  const totalsX = tableX + descW + qtyW;

  doc.setTextColor(80, 80, 80);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', totalsX + 2, y);
  doc.text(`${currencySymbol}${subtotal.toFixed(2)}`, PAGE_W - MARGIN - 2, y, { align: 'right' });
  y += 6;

  let discount = 0;
  if (discountValue > 0) {
    discount = discountType === 'percentage' ? subtotal * (discountValue / 100) : discountValue;
    doc.text(`Discount${discountType === 'percentage' ? ` (${discountValue}%)` : ''}:`, totalsX + 2, y);
    doc.text(`-${currencySymbol}${discount.toFixed(2)}`, PAGE_W - MARGIN - 2, y, { align: 'right' });
    y += 6;
  }

  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * (taxRate / 100);

  if (taxRate > 0) {
    doc.text(`Tax (${taxRate}%):`, totalsX + 2, y);
    doc.text(`${currencySymbol}${tax.toFixed(2)}`, PAGE_W - MARGIN - 2, y, { align: 'right' });
    y += 6;
  }

  const total = afterDiscount + tax;

  // Total due - bold and prominent
  doc.setDrawColor(30, 30, 30);
  doc.setLineWidth(0.5);
  doc.line(totalsX, y, PAGE_W - MARGIN, y);
  y += 6;

  doc.setFillColor('#1e3a5f');
  doc.roundedRect(totalsX, y - 2, PAGE_W - MARGIN - totalsX, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL DUE:', totalsX + 4, y + 5);
  doc.text(`${currencySymbol}${total.toFixed(2)}`, PAGE_W - MARGIN - 4, y + 5, { align: 'right' });

  // Notes
  if (notes) {
    y += 20;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('NOTES', MARGIN, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const noteLines = doc.splitTextToSize(notes, CONTENT_W);
    doc.text(noteLines, MARGIN, y);
  }

  // Watermark footer
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Generated with mykit.tools', PAGE_W / 2, PAGE_H - 10, { align: 'center' });

  savePDF(doc, `invoice${invoiceNumber ? `-${invoiceNumber}` : ''}.pdf`);
}

// ── Running Training Plan PDF ───────────────────────────
export function generateTrainingPlanPDF({
  race = '5K',
  plan = [],
  units = 'km',
  startDate = '',
}) {
  const doc = createDoc();
  const accentColor = '#dc2626'; // red for fitness
  drawPageFrame(doc, accentColor);

  let y = drawHeader(doc, {
    title: `${race} Training Plan`,
    subtitle: `${plan.length} Weeks  |  ${units === 'km' ? 'Kilometres' : 'Miles'}${startDate ? `  |  Starting ${startDate}` : ''}`,
    bgColor: '#991b1b',
    subtitleColor: '#fca5a5',
  });

  y += 2;

  // Weekly breakdown
  plan.forEach((week, wIdx) => {
    if (y > PAGE_H - 40) {
      doc.addPage();
      drawPageFrame(doc, accentColor);
      y = MARGIN + 10;
    }

    // Week header
    const weekLabel = week.isTaper ? 'TAPER' : week.isCutback ? 'RECOVERY' : '';
    doc.setFillColor(week.isTaper ? '#fef2f2' : week.isCutback ? '#fff7ed' : '#f8fafc');
    doc.roundedRect(MARGIN, y, CONTENT_W, 6, 1, 1, 'F');

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`Week ${week.week || wIdx + 1}${weekLabel ? ` (${weekLabel})` : ''}`, MARGIN + 3, y + 4.2);

    if (week.weeklyTotal !== undefined) {
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text(`Total: ${week.weeklyTotal} ${units}`, PAGE_W - MARGIN - 3, y + 4.2, { align: 'right' });
    }
    y += 8;

    // Days
    const days = week.days || [];
    days.forEach((day) => {
      if (y > PAGE_H - 25) {
        doc.addPage();
        drawPageFrame(doc, accentColor);
        y = MARGIN + 10;
      }

      doc.setTextColor(120, 120, 120);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text(day.day || '', MARGIN + 4, y + 2.5);

      doc.setTextColor(30, 30, 30);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      const workout = day.workout || day.name || 'Rest';
      doc.text(workout, MARGIN + 22, y + 2.5);

      if (day.distance) {
        doc.setTextColor(accentColor);
        doc.setFont('helvetica', 'bold');
        doc.text(`${day.distance} ${units}`, PAGE_W - MARGIN - 4, y + 2.5, { align: 'right' });
      }

      y += 5;
    });

    y += 3;
  });

  drawWatermark(doc);
  savePDF(doc, `${race.toLowerCase().replace(/\s+/g, '-')}-training-plan.pdf`);
}

// ── Wedding Seating Chart PDF ───────────────────────────
export function generateSeatingChartPDF({
  tables = [],
  guests = [],
  coupleNames = '',
}) {
  const doc = createDoc();
  const accentColor = '#be185d'; // rose for weddings
  drawPageFrame(doc, accentColor);

  let y = drawHeader(doc, {
    title: coupleNames ? `The Wedding of ${coupleNames}` : 'Wedding Seating Chart',
    subtitle: `${tables.length} Tables  |  ${guests.length} Guests`,
    bgColor: '#831843',
    subtitleColor: '#fbcfe8',
  });

  y += 2;

  // Tables in a flowing layout
  const colCount = 3;
  const colW = (CONTENT_W - (colCount - 1) * 4) / colCount;

  tables.forEach((table, tIdx) => {
    const col = tIdx % colCount;
    const x = MARGIN + col * (colW + 4);

    // Get guests at this table
    const tableGuests = guests.filter(g => g.tableId === table.id);
    const cardH = 10 + tableGuests.length * 4 + 4;

    // New row check
    if (col === 0 && tIdx > 0) {
      // Estimate if previous row fits
      y += 0; // y already advanced
    }

    if (y + cardH > PAGE_H - 25) {
      doc.addPage();
      drawPageFrame(doc, accentColor);
      y = MARGIN + 10;
    }

    // Table card
    doc.setFillColor(255, 250, 252);
    doc.roundedRect(x, y, colW, cardH, 2, 2, 'F');
    doc.setDrawColor(accentColor);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, colW, cardH, 2, 2, 'S');

    // Table name header
    doc.setFillColor(accentColor);
    doc.roundedRect(x, y, colW, 7, 2, 2, 'F');
    // Fix bottom corners
    doc.setFillColor(accentColor);
    doc.rect(x, y + 3, colW, 4, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(table.name || `Table ${tIdx + 1}`, x + colW / 2, y + 5, { align: 'center' });

    // Seat count
    doc.setFontSize(6);
    doc.text(`${tableGuests.length}/${table.capacity || '?'} seats`, x + colW - 3, y + 5, { align: 'right' });

    // Guest names
    let guestY = y + 10;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');

    tableGuests.forEach((guest) => {
      let name = guest.name || 'Guest';
      // Dietary icons
      if (guest.dietary && guest.dietary.length > 0) {
        const icons = guest.dietary.map(d => {
          if (d === 'vegetarian') return '(V)';
          if (d === 'vegan') return '(VG)';
          if (d === 'gluten-free') return '(GF)';
          if (d === 'dairy-free') return '(DF)';
          return '';
        }).filter(Boolean).join(' ');
        name += ` ${icons}`;
      }
      doc.text(name, x + 3, guestY);
      guestY += 4;
    });

    // Advance Y after every row of cards
    if (col === colCount - 1 || tIdx === tables.length - 1) {
      y += cardH + 4;
    }
  });

  drawWatermark(doc);
  savePDF(doc, 'wedding-seating-chart.pdf');
}
