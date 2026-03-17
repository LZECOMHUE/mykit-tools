import { jsPDF } from "jspdf";

/**
 * World Cup 2026 Wall Chart - Premium Printable PDF
 *
 * LIGHT/WHITE background - designed for printing on A3.
 * Clean, bold design with navy headers, large score boxes,
 * and proper bracket tree with connecting lines.
 *
 * Page 1: Group Stage (4x3 grid)
 * Page 2: Knockout Bracket (R32 -> Final) — REDESIGNED with round headers, match numbers, premium styling
 */

const GROUPS_DATA = {
  A: [
    { name: "Mexico", code: "MEX" },
    { name: "South Africa", code: "RSA" },
    { name: "South Korea", code: "KOR" },
    { name: "UEFA PO D", code: "TBD" },
  ],
  B: [
    { name: "Canada", code: "CAN" },
    { name: "UEFA PO A", code: "TBD" },
    { name: "Qatar", code: "QAT" },
    { name: "Switzerland", code: "SUI" },
  ],
  C: [
    { name: "Brazil", code: "BRA" },
    { name: "Morocco", code: "MAR" },
    { name: "Haiti", code: "HAI" },
    { name: "Scotland", code: "SCO" },
  ],
  D: [
    { name: "United States", code: "USA" },
    { name: "Paraguay", code: "PAR" },
    { name: "Australia", code: "AUS" },
    { name: "UEFA PO C", code: "TBD" },
  ],
  E: [
    { name: "Germany", code: "GER" },
    { name: "Curaçao", code: "CUW" },
    { name: "Ivory Coast", code: "CIV" },
    { name: "Ecuador", code: "ECU" },
  ],
  F: [
    { name: "Netherlands", code: "NED" },
    { name: "Japan", code: "JPN" },
    { name: "UEFA PO B", code: "TBD" },
    { name: "Tunisia", code: "TUN" },
  ],
  G: [
    { name: "Belgium", code: "BEL" },
    { name: "Egypt", code: "EGY" },
    { name: "Iran", code: "IRN" },
    { name: "New Zealand", code: "NZL" },
  ],
  H: [
    { name: "Spain", code: "ESP" },
    { name: "Cape Verde", code: "CPV" },
    { name: "Saudi Arabia", code: "KSA" },
    { name: "Uruguay", code: "URU" },
  ],
  I: [
    { name: "France", code: "FRA" },
    { name: "Senegal", code: "SEN" },
    { name: "IC PO 2", code: "TBD" },
    { name: "Norway", code: "NOR" },
  ],
  J: [
    { name: "Argentina", code: "ARG" },
    { name: "Algeria", code: "ALG" },
    { name: "Austria", code: "AUT" },
    { name: "Jordan", code: "JOR" },
  ],
  K: [
    { name: "Portugal", code: "POR" },
    { name: "IC PO 1", code: "TBD" },
    { name: "Uzbekistan", code: "UZB" },
    { name: "Colombia", code: "COL" },
  ],
  L: [
    { name: "England", code: "ENG" },
    { name: "Croatia", code: "CRO" },
    { name: "Ghana", code: "GHA" },
    { name: "Panama", code: "PAN" },
  ],
};

// ── Print-friendly colour palette ────────────────────────

const C = {
  // Backgrounds (all light)
  white: [255, 255, 255],
  cream: [252, 251, 248],
  lightGrey: [245, 245, 245],
  tableAlt: [248, 250, 252],       // very subtle blue-grey stripe

  // Headers (bold, print well)
  navy: [15, 30, 60],              // deep navy for main headers
  darkBlue: [25, 50, 85],          // group headers
  medBlue: [40, 70, 120],          // column headers

  // Qualification tints (subtle, print well)
  qualifyGreen: [230, 248, 235],   // light green for top 2
  qualifyBorder: [80, 170, 100],
  maybYellow: [255, 250, 230],     // light amber for 3rd
  maybBorder: [200, 170, 60],

  // Text
  textDark: [20, 20, 20],          // near-black for team names
  textMid: [80, 80, 80],           // medium for stats
  textLight: [150, 150, 150],      // light for placeholders
  textBlue: [30, 60, 110],         // blue for headers on white

  // Accents
  gold: [180, 140, 20],            // gold for highlights
  goldLight: [220, 185, 50],
  red: [200, 40, 40],              // for "v" separator

  // Lines
  border: [200, 200, 200],
  borderDark: [160, 160, 160],
  headerLine: [15, 30, 60],

  // Score boxes
  scoreBoxBg: [255, 255, 255],
  scoreBoxBorder: [100, 100, 100],

  // Bracket
  bracketLine: [120, 120, 120],
  bracketBoxBg: [250, 252, 255],
  bracketBoxBorder: [150, 165, 185],
  finalBoxBg: [255, 250, 235],
  finalBoxBorder: [180, 140, 20],
};

// ── Main export ──────────────────────────────────────────

export function generateWorldCupPDF({ groupState, knockout, standings }) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a3" });
  const W = 420;
  const H = 297;

  drawGroupStagePage(doc, W, H, groupState, standings);
  doc.addPage("a3", "landscape");
  drawKnockoutPage(doc, W, H, knockout);

  return doc;
}

// ── PAGE 1: GROUP STAGE ──────────────────────────────────

function drawGroupStagePage(doc, W, H, groupState, standings) {
  const m = 8;

  // White background (default, but explicit)
  doc.setFillColor(...C.white);
  doc.rect(0, 0, W, H, "F");

  // ── Decorative top border ──
  doc.setFillColor(...C.navy);
  doc.rect(0, 0, W, 3, "F");
  doc.setFillColor(...C.gold);
  doc.rect(0, 3, W, 0.8, "F");

  // ── Header ──
  const headerH = 30;

  // "FIFA" small label
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C.gold);
  doc.text("FIFA", W / 2, 10, { align: "center" });

  // Main title
  doc.setFontSize(28);
  doc.setTextColor(...C.navy);
  doc.text("WORLD CUP 2026", W / 2, 20, { align: "center" });

  // Subtitle
  doc.setFontSize(8);
  doc.setTextColor(...C.medBlue);
  doc.text("USA  \u2022  CANADA  \u2022  MEXICO     |     JUNE 11 - JULY 19, 2026     |     48 TEAMS     |     12 GROUPS", W / 2, 26, { align: "center" });

  // Divider line
  doc.setDrawColor(...C.navy);
  doc.setLineWidth(0.5);
  doc.line(m, headerH, W - m, headerH);

  // "GROUP STAGE" label
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...C.gold);
  doc.text("GROUP STAGE", m, headerH + 5);

  // Legend
  doc.setFontSize(5);
  doc.setFillColor(...C.qualifyGreen);
  doc.rect(W - m - 78, headerH + 2, 4, 3, "F");
  doc.setDrawColor(...C.qualifyBorder);
  doc.setLineWidth(0.2);
  doc.rect(W - m - 78, headerH + 2, 4, 3, "S");
  doc.setTextColor(...C.textMid);
  doc.text("Qualifies (top 2)", W - m - 73, headerH + 4.5);

  doc.setFillColor(...C.maybYellow);
  doc.rect(W - m - 40, headerH + 2, 4, 3, "F");
  doc.setDrawColor(...C.maybBorder);
  doc.rect(W - m - 40, headerH + 2, 4, 3, "S");
  doc.text("Possible 3rd", W - m - 35, headerH + 4.5);

  // ── Groups grid: 4 cols x 3 rows ──
  const gridStartY = headerH + 8;
  const gridGap = 3;
  const cols = 4;
  const rows = 3;
  const groupW = (W - m * 2 - gridGap * (cols - 1)) / cols;
  const groupH = (H - gridStartY - m - 4 - gridGap * (rows - 1)) / rows;

  const letters = Object.keys(GROUPS_DATA);

  letters.forEach((letter, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = m + col * (groupW + gridGap);
    const y = gridStartY + row * (groupH + gridGap);
    drawGroupCard(doc, x, y, groupW, groupH, letter, standings?.[letter], groupState?.[letter]);
  });

  // Footer
  doc.setFontSize(5);
  doc.setTextColor(...C.textLight);
  doc.text("mykit.tools/world-cup-2026-wall-chart", W / 2, H - 2, { align: "center" });

  // Bottom border
  doc.setFillColor(...C.gold);
  doc.rect(0, H - 0.8, W, 0.8, "F");
}

// ── Single group card ────────────────────────────────────

function drawGroupCard(doc, x, y, w, h, letter, standingsData, groupStateData) {
  const teams = GROUPS_DATA[letter];
  const headerH = 7.5;

  // Card border
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y, w, h, 1.5, 1.5, "S");

  // Group header bar
  doc.setFillColor(...C.darkBlue);
  doc.roundedRect(x, y, w, headerH, 1.5, 1.5, "F");
  // Square off bottom corners
  doc.rect(x, y + headerH - 1.5, w, 1.5, "F");

  // Group letter
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...C.white);
  doc.text(`GROUP ${letter}`, x + w / 2, y + 5.5, { align: "center" });

  // Column headers
  let cy = y + headerH + 0.5;
  doc.setFontSize(4.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...C.textLight);

  const nameEnd = x + w * 0.5;
  const statsArea = w * 0.46;
  const statCols = 6;
  const colW = statsArea / statCols;
  const labels = ["P", "W", "D", "L", "GD", "PTS"];

  labels.forEach((lbl, i) => {
    doc.text(lbl, nameEnd + i * colW + colW / 2, cy + 3, { align: "center" });
  });

  // Thin separator
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.15);
  doc.line(x + 2, cy + 4, x + w - 2, cy + 4);

  cy += 5;

  // Team rows
  const rowH = 6;
  const sorted = standingsData || teams.map((t, i) => ({
    idx: i, name: t.name, code: t.code, played: 0, won: 0, drawn: 0, lost: 0, gd: 0, pts: 0,
  }));

  sorted.forEach((team, pos) => {
    // Row background
    if (pos < 2) {
      doc.setFillColor(...C.qualifyGreen);
      doc.rect(x + 0.3, cy, w - 0.6, rowH, "F");
    } else if (pos === 2) {
      doc.setFillColor(...C.maybYellow);
      doc.rect(x + 0.3, cy, w - 0.6, rowH, "F");
    } else if (pos % 2 === 1) {
      doc.setFillColor(...C.tableAlt);
      doc.rect(x + 0.3, cy, w - 0.6, rowH, "F");
    }

    // Row separator
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.1);
    doc.line(x + 2, cy + rowH, x + w - 2, cy + rowH);

    // Team name (bold, dark)
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...C.textDark);
    const displayName = team.name.length > 18 ? team.name.substring(0, 17) + "." : team.name;
    doc.text(displayName, x + 3, cy + 4.2);

    // Stats
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(...C.textMid);
    const gdStr = team.gd >= 0 ? `+${team.gd}` : String(team.gd);
    const allStats = [String(team.played), String(team.won), String(team.drawn), String(team.lost), gdStr, String(team.pts)];

    allStats.forEach((val, i) => {
      const sx = nameEnd + i * colW + colW / 2;
      if (i === 5) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...C.navy);
      }
      doc.text(val, sx, cy + 4.2, { align: "center" });
      if (i === 5) {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...C.textMid);
      }
    });

    cy += rowH;
  });

  // ── Matches section ──
  cy += 2;
  doc.setFontSize(4.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...C.textLight);
  doc.text("MATCHES", x + 3, cy + 2);
  cy += 4;

  const matchPairs = [[0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2]];
  const matchH = 5.5;
  const scoreBoxW = 8;
  const scoreBoxH = 4.5;

  matchPairs.forEach(([t1, t2], mi) => {
    if (cy + matchH > y + h - 1) return;

    // Subtle alternating stripe
    if (mi % 2 === 0) {
      doc.setFillColor(...C.lightGrey);
      doc.rect(x + 0.3, cy, w - 0.6, matchH, "F");
    }

    const midX = x + w / 2;

    // Team 1 (right aligned)
    doc.setFontSize(6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...C.textDark);
    doc.text(teams[t1]?.code || "TBD", midX - 15, cy + 3.5, { align: "right" });

    // Score box 1
    doc.setFillColor(...C.scoreBoxBg);
    doc.setDrawColor(...C.scoreBoxBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(midX - 14, cy + 0.5, scoreBoxW, scoreBoxH, 0.5, 0.5, "FD");

    // Score box 2
    doc.roundedRect(midX + 6, cy + 0.5, scoreBoxW, scoreBoxH, 0.5, 0.5, "FD");

    // "v" between
    doc.setFontSize(5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...C.textLight);
    doc.text("v", midX, cy + 3.5, { align: "center" });

    // Filled-in scores
    if (groupStateData) {
      const match = groupStateData.matches[mi];
      if (match && match[2] !== "" && match[3] !== "") {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...C.textDark);
        doc.text(String(match[2]), midX - 14 + scoreBoxW / 2, cy + 3.8, { align: "center" });
        doc.text(String(match[3]), midX + 6 + scoreBoxW / 2, cy + 3.8, { align: "center" });
      }
    }

    // Team 2 (left aligned)
    doc.setFontSize(6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...C.textDark);
    doc.text(teams[t2]?.code || "TBD", midX + 15, cy + 3.5);

    cy += matchH;
  });
}

// ── PAGE 2: KNOCKOUT BRACKET (REDESIGNED) ───────────────

function drawKnockoutPage(doc, W, H, knockoutData) {
  const m = 6;

  // White background
  doc.setFillColor(...C.white);
  doc.rect(0, 0, W, H, "F");

  // Top border
  doc.setFillColor(...C.navy);
  doc.rect(0, 0, W, 3, "F");
  doc.setFillColor(...C.gold);
  doc.rect(0, 3, W, 0.8, "F");

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C.gold);
  doc.text("FIFA", W / 2, 10, { align: "center" });

  doc.setFontSize(24);
  doc.setTextColor(...C.navy);
  doc.text("WORLD CUP 2026", W / 2, 19, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(...C.gold);
  doc.text("KNOCKOUT ROUNDS", W / 2, 25, { align: "center" });

  // Divider
  doc.setDrawColor(...C.navy);
  doc.setLineWidth(0.5);
  doc.line(m, 28, W - m, 28);

  // ── Bracket tree ──
  const bracketY = 33;
  const bracketH = H - bracketY - 12;

  const matchBoxW = 48;
  const matchBoxH = 16;

  // Round definitions
  const rounds = [
    { key: "r32", label: "ROUND OF 32", count: 16, matchStart: 1 },
    { key: "r16", label: "ROUND OF 16", count: 8, matchStart: 17 },
    { key: "qf", label: "QUARTER-FINALS", count: 4, matchStart: 25 },
    { key: "sf", label: "SEMI-FINALS", count: 2, matchStart: 29 },
    { key: "final", label: "FINAL", count: 1, matchStart: 31 },
  ];

  // Calculate column X positions
  const totalCols = rounds.length;
  const usableW = W - m * 2;
  const colSpacing = usableW / totalCols;
  const colCenters = rounds.map((_, i) => m + colSpacing * (i + 0.5));

  // Calculate match positions for all rounds
  const matchPositions = {};
  const roundHeaderHeight = 7;

  rounds.forEach((round, ri) => {
    const positions = [];
    const matchStartY = bracketY + roundHeaderHeight + 3;

    if (round.count === 1) {
      const my = matchStartY + bracketH / 2 - matchBoxH / 2;
      positions.push({ x: colCenters[ri] - matchBoxW / 2, y: my, matchNumber: round.matchStart });
    } else {
      const gap = bracketH / round.count;
      for (let i = 0; i < round.count; i++) {
        const my = matchStartY + i * gap + (gap - matchBoxH) / 2;
        positions.push({ x: colCenters[ri] - matchBoxW / 2, y: my, matchNumber: round.matchStart + i });
      }
    }

    matchPositions[round.key] = positions;
  });

  // Draw round header pills
  rounds.forEach((round, ri) => {
    const isF = round.key === "final";
    const headerColor = isF ? C.gold : C.navy;
    const headerY = bracketY;
    const headerX = colCenters[ri] - colSpacing / 2 + 1;
    const headerW = colSpacing - 2;

    doc.setFillColor(...headerColor);
    doc.roundedRect(headerX, headerY, headerW, roundHeaderHeight, 1.5, 1.5, "F");

    doc.setFontSize(6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...C.white);
    doc.text(round.label, colCenters[ri], headerY + 5, { align: "center" });
  });

  // Draw connecting lines (bolder, darker)
  doc.setDrawColor(...C.borderDark);
  doc.setLineWidth(0.5);

  const connections = [["r32", "r16"], ["r16", "qf"], ["qf", "sf"], ["sf", "final"]];

  connections.forEach(([fromKey, toKey]) => {
    const fromPos = matchPositions[fromKey];
    const toPos = matchPositions[toKey];

    toPos.forEach((to, ti) => {
      const from1 = fromPos[ti * 2];
      const from2 = fromPos[ti * 2 + 1];
      if (!from1 || !from2) return;

      const fX = from1.x + matchBoxW;
      const tX = to.x;
      const midX = (fX + tX) / 2;

      const y1 = from1.y + matchBoxH / 2;
      const y2 = from2.y + matchBoxH / 2;
      const yTo = to.y + matchBoxH / 2;

      // Horizontal from match 1
      doc.line(fX, y1, midX, y1);
      // Horizontal from match 2
      doc.line(fX, y2, midX, y2);
      // Vertical connector
      doc.line(midX, y1, midX, y2);
      // Horizontal to next match
      doc.line(midX, yTo, tX, yTo);
    });
  });

  // Draw match boxes
  rounds.forEach((round) => {
    const positions = matchPositions[round.key];
    const isFinal = round.key === "final";
    const matches = knockoutData?.[round.key] || [];

    positions.forEach((pos, idx) => {
      const match = matches[idx] || {};
      drawBracketMatch(doc, pos.x, pos.y, matchBoxW, matchBoxH, match, pos.matchNumber, isFinal);
    });
  });

  // 3rd place playoff (bottom-right area with border and header)
  const thirdMatch = knockoutData?.third?.[0] || {};
  const thirdX = colCenters[4] - matchBoxW / 2;
  const thirdY = matchPositions.final[0].y + matchBoxH + 8;

  // 3rd place header
  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...C.textMid);
  doc.text("3RD PLACE PLAYOFF", thirdX + matchBoxW / 2, thirdY - 2.5, { align: "center" });

  // 3rd place box with subtle border
  doc.setFillColor(...C.finalBoxBg);
  doc.setDrawColor(...C.finalBoxBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(thirdX - 1, thirdY - 1, matchBoxW + 2, matchBoxH + 2, 1.2, 1.2, "S");

  drawBracketMatch(doc, thirdX, thirdY, matchBoxW, matchBoxH, thirdMatch, 63, false);

  // Bottom legend (bottom-left)
  const legendY = H - 6;
  doc.setFontSize(5);
  doc.setFont("helvetica", "normal");

  // Top 2 qualify
  doc.setFillColor(...C.qualifyGreen);
  doc.rect(m, legendY, 3, 3, "F");
  doc.setDrawColor(...C.qualifyBorder);
  doc.setLineWidth(0.15);
  doc.rect(m, legendY, 3, 3, "S");
  doc.setTextColor(...C.textMid);
  doc.text("Top 2 qualify", m + 5, legendY + 2.2);

  // Best 3rd placed
  doc.setFillColor(...C.maybYellow);
  doc.rect(m + 30, legendY, 3, 3, "F");
  doc.setDrawColor(...C.maybBorder);
  doc.rect(m + 30, legendY, 3, 3, "S");
  doc.text("Best 3rd-placed may qualify", m + 35, legendY + 2.2);

  // Footer
  doc.setFontSize(5);
  doc.setTextColor(...C.textLight);
  doc.text("mykit.tools/world-cup-2026-wall-chart", W / 2, H - 2, { align: "center" });

  doc.setFillColor(...C.gold);
  doc.rect(0, H - 0.8, W, 0.8, "F");
}

// ── Bracket match box (REDESIGNED) ──────────────────────

function drawBracketMatch(doc, x, y, w, h, match, matchNumber, isFinal) {
  const halfH = h / 2;

  // Box fill and border
  if (isFinal) {
    doc.setFillColor(...C.finalBoxBg);
    doc.setDrawColor(...C.finalBoxBorder);
    doc.setLineWidth(0.5);
  } else {
    doc.setFillColor(...C.bracketBoxBg);
    doc.setDrawColor(...C.bracketBoxBorder);
    doc.setLineWidth(0.35);
  }
  doc.roundedRect(x, y, w, h, 0.8, 0.8, "FD");

  // Match number (top-left, small grey)
  if (matchNumber) {
    doc.setFontSize(4);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...C.textLight);
    doc.text(`M${matchNumber}`, x + 1, y + 2.5);
  }

  // Divider between team 1 and team 2
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.2);
  doc.line(x + 1, y + halfH, x + w - 1, y + halfH);

  // Score column area
  const scoreColX = x + w - 11;
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.2);
  doc.line(scoreColX, y + 0.5, scoreColX, y + h - 0.5);

  // Team 1
  const t1 = match.team1 || "";
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  const t1Color = t1 ? C.textDark : C.textLight;
  doc.setTextColor(...t1Color);
  const t1Display = t1 ? t1 : "_________________";
  doc.text(t1Display, x + 2.5, y + halfH - 1.8);

  // Score 1 box
  if (matchNumber) {
    doc.setFillColor(...C.scoreBoxBg);
    doc.setDrawColor(...C.scoreBoxBorder);
    doc.setLineWidth(0.25);
    doc.rect(scoreColX + 0.5, y + 0.8, 5.5, 5.5, "FD");

    if (match.score1 !== "" && match.score1 !== undefined) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...C.textDark);
      doc.text(String(match.score1), scoreColX + 3.25, y + 3.8, { align: "center" });
    }
  }

  // Team 2
  const t2 = match.team2 || "";
  const t2Color = t2 ? C.textDark : C.textLight;
  doc.setTextColor(...t2Color);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  const t2Display = t2 ? t2 : "_________________";
  doc.text(t2Display, x + 2.5, y + h - 1.8);

  // Score 2 box
  if (matchNumber) {
    doc.setFillColor(...C.scoreBoxBg);
    doc.setDrawColor(...C.scoreBoxBorder);
    doc.setLineWidth(0.25);
    doc.rect(scoreColX + 0.5, y + h - 6.3, 5.5, 5.5, "FD");

    if (match.score2 !== "" && match.score2 !== undefined) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...C.textDark);
      doc.text(String(match.score2), scoreColX + 3.25, y + h - 3, { align: "center" });
    }
  }
}

// ── Download helper ──────────────────────────────────────

export function downloadWorldCupPDF(data) {
  const doc = generateWorldCupPDF(data);
  doc.save("World-Cup-2026-Wall-Chart.pdf");
}
