/**
 * MyKit.tools — Export Utilities
 *
 * Generates shareable JPG images from tool results using Canvas API.
 * No external dependencies — pure browser Canvas.
 */

// ─── CANVAS HELPERS ──────────────────────────────────────────

function createCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawRoundedRect(ctx, x, y, w, h, r, fill, stroke) {
  roundRect(ctx, x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
}

function drawText(ctx, text, x, y, opts = {}) {
  const { font = '16px sans-serif', color = '#1a1a1a', align = 'left', baseline = 'top', maxWidth } = opts;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  if (maxWidth) {
    ctx.fillText(text, x, y, maxWidth);
  } else {
    ctx.fillText(text, x, y);
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (const word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, currentY);
      line = word + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}

// ─── GRADIENT HELPERS ────────────────────────────────────────

function createGradient(ctx, x, y, w, h, colors) {
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
  return grad;
}

// ─── WATERMARK ───────────────────────────────────────────────

function drawWatermark(ctx, width, height) {
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.font = 'bold 48px sans-serif';
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 6);
  ctx.fillText('mykit.tools', 0, 0);
  ctx.restore();
}

function drawFooter(ctx, width, height, slug) {
  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`mykit.tools/${slug}`, width / 2, height - 12);
}

// ─── DOWNLOAD TRIGGER ────────────────────────────────────────

function downloadCanvas(canvas, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/jpeg', 0.92);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ═══════════════════════════════════════════════════════════════
// SHAREABLE CARD GENERATORS
// ═══════════════════════════════════════════════════════════════

/**
 * Life Stats — shareable infographic card
 */
export function downloadLifeStatsCard(stats, birthDateStr) {
  const W = 1080, H = 1350;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Top gradient header
  const headerGrad = createGradient(ctx, 0, 0, W, 320, ['#2563eb', '#7c3aed']);
  ctx.fillStyle = headerGrad;
  roundRect(ctx, 0, 0, W, 320, 0);
  ctx.fill();

  // Title
  drawText(ctx, 'MY LIFE IN NUMBERS', W / 2, 50, { font: 'bold 28px sans-serif', color: 'rgba(255,255,255,0.7)', align: 'center' });

  // Age
  drawText(ctx, `${stats.years} years, ${stats.monthsRemainder} months, ${stats.daysRemainder} days`, W / 2, 110, {
    font: 'bold 42px sans-serif', color: '#ffffff', align: 'center'
  });

  // Born day
  drawText(ctx, `Born on a ${stats.dayOfWeek} · ${stats.generation?.name || ''}`, W / 2, 175, {
    font: '20px sans-serif', color: 'rgba(255,255,255,0.8)', align: 'center'
  });

  // Days alive big number
  drawText(ctx, stats.daysAlive?.toLocaleString() || '', W / 2, 230, {
    font: 'bold 56px monospace', color: '#ffffff', align: 'center'
  });
  drawText(ctx, 'days alive', W / 2, 290, {
    font: '18px sans-serif', color: 'rgba(255,255,255,0.7)', align: 'center'
  });

  // Stats grid
  const statItems = [
    { emoji: '❤️', label: 'Heartbeats', value: stats.heartbeats },
    { emoji: '🌬️', label: 'Breaths', value: stats.breaths },
    { emoji: '😊', label: 'Times Smiled', value: stats.timesSmiled },
    { emoji: '👁️', label: 'Times Blinked', value: stats.timesBlinked },
    { emoji: '😴', label: 'Hours Slept', value: stats.hoursSleep },
    { emoji: '🍽️', label: 'Meals Eaten', value: stats.mealEaten },
    { emoji: '🚶', label: 'Steps Taken', value: stats.stepsTaken },
    { emoji: '💬', label: 'Words Spoken', value: stats.wordsSpoken },
    { emoji: '🌍', label: 'Trips Around Sun', value: stats.tripsAroundSun },
    { emoji: '🌕', label: 'Full Moons Seen', value: stats.fullMoons },
  ];

  const cols = 2, rows = 5;
  const cardW = 480, cardH = 120;
  const startX = (W - cols * cardW - 20) / 2;
  const startY = 360;

  statItems.forEach((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + 20);
    const y = startY + row * (cardH + 16);

    drawRoundedRect(ctx, x, y, cardW, cardH, 16, '#f8f8f8', '#e5e5e5');

    // Emoji
    ctx.font = '36px sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.emoji, x + 20, y + cardH / 2);

    // Value
    const valStr = typeof item.value === 'number' ? item.value.toLocaleString() : String(item.value || '—');
    drawText(ctx, valStr, x + 80, y + 30, { font: 'bold 28px monospace', color: '#1a1a1a' });

    // Label
    drawText(ctx, item.label, x + 80, y + 72, { font: '16px sans-serif', color: '#525252' });
  });

  // Watermark + footer
  drawWatermark(ctx, W, H);
  drawFooter(ctx, W, H, 'life-stats');

  downloadCanvas(canvas, 'my-life-stats.jpg');
}


/**
 * Salary Visualizer — earnings card
 */
export function downloadSalaryCard(salary, period, breakdown, funFacts) {
  const W = 1080, H = 1080;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Header gradient
  const grad = createGradient(ctx, 0, 0, W, 260, ['#059669', '#2563eb']);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, 260);

  drawText(ctx, 'MY EARNINGS', W / 2, 40, { font: 'bold 24px sans-serif', color: 'rgba(255,255,255,0.7)', align: 'center' });

  const salaryStr = `£${Number(salary).toLocaleString()}`;
  drawText(ctx, salaryStr, W / 2, 90, { font: 'bold 64px monospace', color: '#ffffff', align: 'center' });
  drawText(ctx, `per ${period}`, W / 2, 170, { font: '22px sans-serif', color: 'rgba(255,255,255,0.8)', align: 'center' });

  // Breakdown rows
  const breakdownItems = [
    { label: 'Per Year', value: breakdown?.yearly },
    { label: 'Per Month', value: breakdown?.monthly },
    { label: 'Per Week', value: breakdown?.weekly },
    { label: 'Per Day', value: breakdown?.daily },
    { label: 'Per Hour', value: breakdown?.hourly },
    { label: 'Per Minute', value: breakdown?.perMinute },
    { label: 'Per Second', value: breakdown?.perSecond },
  ];

  let y = 300;
  breakdownItems.forEach((item) => {
    if (!item.value && item.value !== 0) return;
    drawRoundedRect(ctx, 60, y, W - 120, 64, 12, '#f8f8f8', '#e5e5e5');
    drawText(ctx, item.label, 90, y + 20, { font: '18px sans-serif', color: '#525252' });
    const val = typeof item.value === 'number' ? `£${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '';
    drawText(ctx, val, W - 90, y + 20, { font: 'bold 22px monospace', color: '#1a1a1a', align: 'right' });
    y += 80;
  });

  // Fun facts at bottom
  if (funFacts && funFacts.length > 0) {
    y += 20;
    drawText(ctx, 'Fun Facts', 60, y, { font: 'bold 20px sans-serif', color: '#525252' });
    y += 40;
    funFacts.slice(0, 3).forEach((fact) => {
      drawText(ctx, `• ${fact}`, 80, y, { font: '16px sans-serif', color: '#525252', maxWidth: W - 160 });
      y += 30;
    });
  }

  drawWatermark(ctx, W, H);
  drawFooter(ctx, W, H, 'salary-visualizer');

  downloadCanvas(canvas, 'my-salary-breakdown.jpg');
}


/**
 * Name Generator — vibrant name card
 */
export function downloadNameCard(name, type, emoji, gradientColors, slug) {
  const W = 1080, H = 1080;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Full gradient background
  const grad = createGradient(ctx, 0, 0, W, H, gradientColors);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle overlay pattern
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = 20 + Math.random() * 80;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Large emoji
  ctx.font = '120px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, W / 2, 300);

  // "Your X Name Is..." subtitle
  drawText(ctx, `YOUR ${type.toUpperCase()} NAME IS...`, W / 2, 420, {
    font: 'bold 24px sans-serif', color: 'rgba(255,255,255,0.7)', align: 'center'
  });

  // The name — big and bold with text shadow
  ctx.save();
  ctx.font = 'bold 64px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillText(name, W / 2 + 3, 543);
  // Main text
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, W / 2, 540);
  ctx.restore();

  // Decorative line
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 200, 620);
  ctx.lineTo(W / 2 + 200, 620);
  ctx.stroke();

  // CTA
  drawText(ctx, 'What\'s yours? Try it free!', W / 2, 660, {
    font: '20px sans-serif', color: 'rgba(255,255,255,0.6)', align: 'center'
  });

  // Footer URL
  drawText(ctx, `mykit.tools/${slug}`, W / 2, H - 40, {
    font: '16px sans-serif', color: 'rgba(255,255,255,0.4)', align: 'center'
  });

  downloadCanvas(canvas, `my-${type.toLowerCase().replace(/\s+/g, '-')}-name.jpg`);
}


/**
 * BMI Calculator — health result card
 */
export function downloadBmiCard(bmi, category, heightCm, weightKg, healthyMin, healthyMax) {
  const W = 1080, H = 1080;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Category colours
  const catColors = {
    'Underweight': { bg: '#dbeafe', accent: '#2563eb' },
    'Healthy weight': { bg: '#d1fae5', accent: '#059669' },
    'Overweight': { bg: '#fef3c7', accent: '#d97706' },
    'Obese (Class I)': { bg: '#fed7aa', accent: '#ea580c' },
    'Obese (Class II)': { bg: '#fecaca', accent: '#dc2626' },
    'Obese (Class III)': { bg: '#fecaca', accent: '#991b1b' },
  };
  const colors = catColors[category] || catColors['Healthy weight'];

  // Header
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, W, 400);

  drawText(ctx, 'MY BMI RESULT', W / 2, 60, { font: 'bold 24px sans-serif', color: 'rgba(0,0,0,0.4)', align: 'center' });

  // Big BMI number
  drawText(ctx, bmi.toFixed(1), W / 2, 180, { font: 'bold 120px monospace', color: colors.accent, align: 'center' });

  // Category
  drawRoundedRect(ctx, W / 2 - 160, 280, 320, 50, 25, colors.accent);
  drawText(ctx, category, W / 2, 295, { font: 'bold 22px sans-serif', color: '#ffffff', align: 'center' });

  // Scale bar
  const scaleY = 450;
  const scaleW = W - 160;
  const scaleH = 24;
  const scaleX = 80;
  const segments = [
    { pct: 0.18, color: '#3b82f6' },  // underweight <18.5
    { pct: 0.25, color: '#22c55e' },  // healthy 18.5-25
    { pct: 0.30, color: '#eab308' },  // overweight 25-30
    { pct: 0.35, color: '#f97316' },  // obese I 30-35
    { pct: 0.40, color: '#ef4444' },  // obese II 35-40
    { pct: 0.50, color: '#991b1b' },  // obese III 40+
  ];

  // Draw scale
  let segX = scaleX;
  segments.forEach((seg, i) => {
    const segW = scaleW / segments.length;
    const r = i === 0 ? 12 : i === segments.length - 1 ? 12 : 0;
    ctx.fillStyle = seg.color;
    if (i === 0) {
      roundRect(ctx, segX, scaleY, segW, scaleH, 12);
      ctx.fill();
      ctx.fillRect(segX + segW - 12, scaleY, 12, scaleH);
    } else if (i === segments.length - 1) {
      ctx.fillRect(segX, scaleY, segW - 12, scaleH);
      roundRect(ctx, segX, scaleY, segW, scaleH, 12);
      ctx.fill();
    } else {
      ctx.fillRect(segX, scaleY, segW, scaleH);
    }
    segX += segW;
  });

  // BMI marker
  const markerPct = Math.min(Math.max((bmi - 15) / 30, 0), 1);
  const markerX = scaleX + markerPct * scaleW;
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(markerX, scaleY + scaleH / 2, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(markerX, scaleY + scaleH / 2, 10, 0, Math.PI * 2);
  ctx.fill();

  // Scale labels
  const labels = ['15', '18.5', '25', '30', '35', '40+'];
  labels.forEach((l, i) => {
    const lx = scaleX + (i / (labels.length - 1)) * scaleW;
    drawText(ctx, l, lx, scaleY + 40, { font: '14px sans-serif', color: '#a3a3a3', align: 'center' });
  });

  // Info cards
  const infoY = 540;
  drawRoundedRect(ctx, 80, infoY, W / 2 - 100, 120, 16, '#f8f8f8', '#e5e5e5');
  drawText(ctx, 'Height', 100, infoY + 20, { font: '14px sans-serif', color: '#a3a3a3' });
  drawText(ctx, `${(heightCm / 100).toFixed(2)}m`, 100, infoY + 55, { font: 'bold 32px monospace', color: '#1a1a1a' });

  drawRoundedRect(ctx, W / 2 + 20, infoY, W / 2 - 100, 120, 16, '#f8f8f8', '#e5e5e5');
  drawText(ctx, 'Weight', W / 2 + 40, infoY + 20, { font: '14px sans-serif', color: '#a3a3a3' });
  drawText(ctx, `${weightKg.toFixed(1)}kg`, W / 2 + 40, infoY + 55, { font: 'bold 32px monospace', color: '#1a1a1a' });

  // Healthy range
  if (healthyMin && healthyMax) {
    drawRoundedRect(ctx, 80, infoY + 150, W - 160, 100, 16, '#d1fae5', '#a7f3d0');
    drawText(ctx, 'Healthy weight range for your height', W / 2, infoY + 175, { font: '16px sans-serif', color: '#065f46', align: 'center' });
    drawText(ctx, `${healthyMin.toFixed(1)}kg – ${healthyMax.toFixed(1)}kg`, W / 2, infoY + 210, {
      font: 'bold 28px monospace', color: '#059669', align: 'center'
    });
  }

  drawWatermark(ctx, W, H);
  drawFooter(ctx, W, H, 'bmi-calculator');

  downloadCanvas(canvas, 'my-bmi-result.jpg');
}


/**
 * Birthday Countdown — birthday card
 */
export function downloadBirthdayCard(data) {
  const { days, hours, minutes, age, nextBirthday, zodiac, daysLived } = data;
  const W = 1080, H = 1350;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const grad = createGradient(ctx, 0, 0, W, H, ['#ec4899', '#f43f5e', '#f97316']);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle circles pattern
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, 15 + Math.random() * 60, 0, Math.PI * 2);
    ctx.fill();
  }

  // Big cake emoji
  ctx.font = '100px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🎂', W / 2, 140);

  // Title
  drawText(ctx, 'MY BIRTHDAY COUNTDOWN', W / 2, 240, {
    font: 'bold 28px sans-serif', color: 'rgba(255,255,255,0.7)', align: 'center'
  });

  // Next birthday date
  drawText(ctx, nextBirthday, W / 2, 300, {
    font: 'bold 36px sans-serif', color: '#ffffff', align: 'center'
  });

  // Turning age
  drawText(ctx, `Turning ${age}!`, W / 2, 360, {
    font: '24px sans-serif', color: 'rgba(255,255,255,0.8)', align: 'center'
  });

  // Countdown boxes
  const boxW = 220, boxH = 140, gap = 24;
  const totalBoxW = 4 * boxW + 3 * gap;
  const boxStartX = (W - totalBoxW) / 2;
  const boxY = 430;
  const countdownItems = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: '🎉', label: '' },
  ];

  countdownItems.forEach((item, i) => {
    const x = boxStartX + i * (boxW + gap);
    drawRoundedRect(ctx, x, boxY, boxW, boxH, 20, 'rgba(255,255,255,0.15)');
    if (typeof item.value === 'number') {
      drawText(ctx, String(item.value), x + boxW / 2, boxY + 40, {
        font: 'bold 48px monospace', color: '#ffffff', align: 'center'
      });
    } else {
      ctx.font = '48px sans-serif';
      ctx.fillText(item.value, x + boxW / 2, boxY + 55);
    }
    if (item.label) {
      drawText(ctx, item.label, x + boxW / 2, boxY + 105, {
        font: '16px sans-serif', color: 'rgba(255,255,255,0.7)', align: 'center'
      });
    }
  });

  // Stats
  const statsY = 640;
  const statsItems = [
    { emoji: '📅', label: 'Days Lived', value: daysLived?.toLocaleString() || '' },
    { emoji: zodiac?.symbol || '⭐', label: 'Zodiac Sign', value: zodiac?.name || '' },
  ];

  statsItems.forEach((item, i) => {
    const y = statsY + i * 130;
    drawRoundedRect(ctx, 80, y, W - 160, 110, 20, 'rgba(255,255,255,0.1)');
    ctx.font = '36px sans-serif';
    ctx.fillText(item.emoji, 120, y + 55);
    drawText(ctx, item.label, 170, y + 25, { font: '16px sans-serif', color: 'rgba(255,255,255,0.6)' });
    drawText(ctx, item.value, 170, y + 55, { font: 'bold 28px sans-serif', color: '#ffffff' });
  });

  // Footer
  drawText(ctx, 'mykit.tools/birthday-countdown', W / 2, H - 40, {
    font: '16px sans-serif', color: 'rgba(255,255,255,0.4)', align: 'center'
  });

  downloadCanvas(canvas, 'my-birthday-countdown.jpg');
}
