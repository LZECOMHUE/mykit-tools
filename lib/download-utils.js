/**
 * Shared utility for generating downloadable JPG images from tool output.
 * Free downloads include a subtle mykit.tools watermark.
 *
 * Usage:
 *   import { downloadAsJPG } from '@/lib/download-utils';
 *
 *   downloadAsJPG({
 *     filename: 'my-meal-plan.jpg',
 *     width: 800,
 *     height: 1000,
 *     title: 'Weekly Meal Plan',
 *     subtitle: 'Generated with MyKit.tools',
 *     accentColor: '#2563eb',
 *     render: (ctx, area) => { ... draw content ... }
 *   });
 */

/**
 * Creates and downloads a watermarked JPG image.
 *
 * @param {Object} options
 * @param {string} options.filename - Download filename (e.g. 'meal-plan.jpg')
 * @param {number} [options.width=800] - Canvas width in pixels
 * @param {number} [options.height=1000] - Canvas height in pixels
 * @param {string} [options.title] - Header title text
 * @param {string} [options.subtitle] - Smaller subtitle below the title
 * @param {string} [options.accentColor='#2563eb'] - Accent colour for header bar
 * @param {Function} options.render - Callback (ctx, contentArea) to draw the main content.
 *   contentArea = { x, y, width, height } - the usable area below the header.
 * @param {number} [options.quality=0.92] - JPEG quality (0-1)
 */
export function downloadAsJPG({
  filename = 'mykit-download.jpg',
  width = 800,
  height = 1000,
  title,
  subtitle,
  accentColor = '#2563eb',
  render,
  quality = 0.92,
}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  let contentY = 20;

  // Header bar with title
  if (title) {
    const headerH = subtitle ? 70 : 56;
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, width, headerH);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, width / 2, subtitle ? 28 : headerH / 2);

    if (subtitle) {
      ctx.font = '14px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText(subtitle, width / 2, 52);
    }

    contentY = headerH + 20;
  }

  // Content area for the tool to draw into
  const contentArea = {
    x: 24,
    y: contentY,
    width: width - 48,
    height: height - contentY - 50, // leave room for watermark
  };

  // Call the tool-specific render function
  if (render) {
    ctx.save();
    render(ctx, contentArea);
    ctx.restore();
  }

  // Watermark
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  ctx.font = '13px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('mykit.tools', width / 2, height - 12);

  // Diagonal watermark for free version
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.fillStyle = 'rgba(0,0,0,0.04)';
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('mykit.tools', 0, 0);
  ctx.restore();

  // Download
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/jpeg', quality);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Helper: draw a simple table on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} options
 * @param {number} options.x - Left edge
 * @param {number} options.y - Top edge
 * @param {number} options.width - Table width
 * @param {string[]} options.headers - Column headers
 * @param {string[][]} options.rows - Data rows
 * @param {number[]} [options.colWidths] - Column width ratios (auto if omitted)
 * @param {string} [options.accentColor='#2563eb'] - Header row colour
 * @returns {number} The y position after the table
 */
export function drawTable(ctx, { x, y, width, headers, rows, colWidths, accentColor = '#2563eb' }) {
  const rowH = 28;
  const headerH = 32;
  const cols = headers.length;

  // Calculate column widths
  const totalRatio = colWidths ? colWidths.reduce((a, b) => a + b, 0) : cols;
  const widths = colWidths
    ? colWidths.map((r) => (r / totalRatio) * width)
    : Array(cols).fill(width / cols);

  // Header row
  ctx.fillStyle = accentColor;
  ctx.fillRect(x, y, width, headerH);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.textBaseline = 'middle';

  let colX = x;
  headers.forEach((header, i) => {
    ctx.textAlign = i === 0 ? 'left' : 'right';
    const textX = i === 0 ? colX + 8 : colX + widths[i] - 8;
    ctx.fillText(header, textX, y + headerH / 2);
    colX += widths[i];
  });

  // Data rows
  let rowY = y + headerH;
  rows.forEach((row, rowIdx) => {
    // Alternating row bg
    if (rowIdx % 2 === 0) {
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(x, rowY, width, rowH);
    }

    ctx.fillStyle = '#1a1a1a';
    ctx.font = '12px sans-serif';
    ctx.textBaseline = 'middle';

    colX = x;
    row.forEach((cell, i) => {
      ctx.textAlign = i === 0 ? 'left' : 'right';
      const textX = i === 0 ? colX + 8 : colX + widths[i] - 8;
      ctx.fillText(String(cell), textX, rowY + rowH / 2);
      colX += widths[i];
    });

    rowY += rowH;
  });

  // Bottom border
  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, rowY);
  ctx.lineTo(x + width, rowY);
  ctx.stroke();

  return rowY + 8;
}

/**
 * Helper: draw a section heading.
 */
export function drawSectionHeading(ctx, text, x, y, width, color = '#1a1a1a') {
  ctx.fillStyle = color;
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);

  // Underline
  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y + 22);
  ctx.lineTo(x + width, y + 22);
  ctx.stroke();

  return y + 32;
}

/**
 * Helper: draw a bulleted list.
 */
export function drawBulletList(ctx, items, x, y, options = {}) {
  const { fontSize = 13, lineHeight = 22, bulletColor = '#2563eb', textColor = '#1a1a1a', maxWidth = 700 } = options;

  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  let currentY = y;
  items.forEach((item) => {
    // Bullet
    ctx.fillStyle = bulletColor;
    ctx.beginPath();
    ctx.arc(x + 4, currentY + fontSize / 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Text (with basic word wrap)
    ctx.fillStyle = textColor;
    const words = String(item).split(' ');
    let line = '';
    const textX = x + 16;

    words.forEach((word) => {
      const testLine = line + (line ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth - 16 && line) {
        ctx.fillText(line, textX, currentY);
        currentY += lineHeight;
        line = word;
      } else {
        line = testLine;
      }
    });
    if (line) {
      ctx.fillText(line, textX, currentY);
      currentY += lineHeight;
    }
  });

  return currentY;
}

/**
 * Helper: draw a key-value pair row.
 */
export function drawKeyValue(ctx, label, value, x, y, width, options = {}) {
  const { labelColor = '#525252', valueColor = '#1a1a1a', fontSize = 13, bold = false } = options;

  ctx.textBaseline = 'top';
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillStyle = labelColor;
  ctx.fillText(label, x, y);

  ctx.textAlign = 'right';
  ctx.fillStyle = valueColor;
  ctx.font = `${bold ? 'bold ' : ''}${fontSize}px monospace`;
  ctx.fillText(String(value), x + width, y);

  return y + (fontSize + 8);
}

/**
 * Helper: draw a checklist item with tick/cross.
 */
export function drawCheckItem(ctx, text, checked, x, y, options = {}) {
  const { fontSize = 13, lineHeight = 24 } = options;

  // Checkbox
  ctx.strokeStyle = checked ? '#16a34a' : '#e5e5e5';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, y + 2, 14, 14);

  if (checked) {
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 3, y + 9);
    ctx.lineTo(x + 6, y + 13);
    ctx.lineTo(x + 11, y + 5);
    ctx.stroke();
  }

  // Text
  ctx.fillStyle = checked ? '#1a1a1a' : '#a3a3a3';
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(text, x + 22, y + 1);

  return y + lineHeight;
}
