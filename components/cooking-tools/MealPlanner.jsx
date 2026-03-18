'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

// Warmer, more pastel day palette (inspired by reference)
const DAY_STYLES = [
  { bg: 'bg-[#f8d7da]', text: 'text-[#8b2d3a]' },   // Monday - soft pink
  { bg: 'bg-[#d1c4e9]', text: 'text-[#5c2d91]' },   // Tuesday - lavender
  { bg: 'bg-[#c8e6c9]', text: 'text-[#2e6b30]' },   // Wednesday - sage green
  { bg: 'bg-[#e6dac3]', text: 'text-[#7a5d2e]' },   // Thursday - warm tan
  { bg: 'bg-[#e1bee7]', text: 'text-[#7b1fa2]' },   // Friday - soft purple
  { bg: 'bg-[#b3e5fc]', text: 'text-[#0277a8]' },   // Saturday - sky blue
  { bg: 'bg-[#f0f4c3]', text: 'text-[#6d7814]' },   // Sunday - soft lime
];

const DAY_HEX_BG =   ['#f8d7da','#d1c4e9','#c8e6c9','#e6dac3','#e1bee7','#b3e5fc','#f0f4c3'];
const DAY_HEX_TEXT = ['#8b2d3a','#5c2d91','#2e6b30','#7a5d2e','#7b1fa2','#0277a8','#6d7814'];

const emptyWeek = () => DAYS.reduce((acc, day) => {
  acc[day] = { Breakfast: '', Lunch: '', Dinner: '' };
  return acc;
}, {});

export default function MealPlanner() {
  const [meals, setMeals] = useState(emptyWeek());
  const [groceryItems, setGroceryItems] = useState(Array(16).fill(''));
  const [groceryChecked, setGroceryChecked] = useState(Array(16).fill(false));
  const [notes, setNotes] = useState('');
  const [budget, setBudget] = useState('');
  const [spent, setSpent] = useState('');
  const [dietary, setDietary] = useState('all');

  const updateMeal = (day, meal, value) => {
    setMeals(prev => ({ ...prev, [day]: { ...prev[day], [meal]: value } }));
  };

  const updateGrocery = (idx, value) => {
    setGroceryItems(prev => { const n = [...prev]; n[idx] = value; return n; });
  };

  const toggleGroceryCheck = (idx) => {
    setGroceryChecked(prev => { const n = [...prev]; n[idx] = !n[idx]; return n; });
  };

  const addGroceryRows = () => {
    setGroceryItems(prev => [...prev, '', '', '', '', '']);
    setGroceryChecked(prev => [...prev, false, false, false, false, false]);
  };

  const handleClear = () => {
    setMeals(emptyWeek());
    setGroceryItems(Array(16).fill(''));
    setGroceryChecked(Array(16).fill(false));
    setNotes('');
    setBudget('');
    setSpent('');
  };

  // ── PDF Generation ──
  const handleDownloadPDF = async (blank = false) => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pw = 210, ph = 297, margin = 10;
    const hex = (h) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];

    // Title (centred)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(34, 34, 34);
    const titleX = pw / 2;
    doc.text('MEAL', titleX - 1, 16, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(119, 119, 119);
    doc.text(' PLANNER', titleX + 1, 16, { align: 'left' });

    // Layout: 2fr / 1fr like reference
    const usableW = pw - margin * 2;
    const sidebarW = usableW / 3;
    const gridW = usableW - sidebarW - 6;
    const dayLabelW = 10;
    const mealGap = 2;
    const mealColW = (gridW - dayLabelW - mealGap * 2) / 3;
    const gridLeft = margin;
    const sidebarLeft = margin + gridW + 6;

    // Column headers
    let headerY = 22;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(119, 119, 119);
    MEALS.forEach((meal, i) => {
      const cx = gridLeft + dayLabelW + i * (mealColW + mealGap) + mealColW / 2;
      doc.text(meal.toUpperCase(), cx, headerY, { align: 'center' });
    });

    // Budget / Spent
    doc.setFontSize(6);
    doc.setTextColor(119, 119, 119);
    doc.text('BUDGET:', sidebarLeft, headerY - 1);
    doc.text('SPENT:', sidebarLeft + sidebarW / 2, headerY - 1);
    const bw = (sidebarW - 4) / 2;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(sidebarLeft, headerY + 1, bw, 5, 1, 1, 'F');
    doc.roundedRect(sidebarLeft + bw + 4, headerY + 1, bw, 5, 1, 1, 'F');
    if (budget && !blank) { doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(34,34,34); doc.text(budget, sidebarLeft + 2, headerY + 4.5); }
    if (spent && !blank) { doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(34,34,34); doc.text(spent, sidebarLeft + bw + 6, headerY + 4.5); }

    // Day rows
    const rowStartY = headerY + 6;
    const bottomMargin = 6;
    const totalH = ph - rowStartY - bottomMargin;
    const rowH = totalH / 7;
    const rowGap = 3;
    const cellH = rowH - rowGap;

    DAYS.forEach((day, di) => {
      const ry = rowStartY + di * rowH;

      // Day label - filled rect, no border
      const [dr,dg,db] = hex(DAY_HEX_BG[di]);
      doc.setFillColor(dr, dg, db);
      doc.roundedRect(gridLeft, ry, dayLabelW, cellH, 1.5, 1.5, 'F');

      // Day name rotated
      const [tr,tg,tb] = hex(DAY_HEX_TEXT[di]);
      doc.setTextColor(tr, tg, tb);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6);
      doc.text(day.toUpperCase(), gridLeft + dayLabelW / 2 + 0.3, ry + cellH / 2, { angle: 270, align: 'center' });

      // Meal cells - filled only, no stroke
      MEALS.forEach((meal, mi) => {
        const cx = gridLeft + dayLabelW + mi * (mealColW + mealGap);
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(cx, ry, mealColW, cellH, 1.5, 1.5, 'F');

        const txt = blank ? '' : meals[day][meal];
        if (txt) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(34, 34, 34);
          const lines = doc.splitTextToSize(txt, mealColW - 4);
          lines.slice(0, Math.floor(cellH / 4)).forEach((line, li) => {
            doc.text(line, cx + 2, ry + 5 + li * 3.5);
          });
        }
      });
    });

    // Grocery List
    let sy = headerY + 9;
    doc.setFillColor(220, 237, 200);
    doc.roundedRect(sidebarLeft, sy, sidebarW, 6, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(85, 107, 47);
    doc.text('GROCERY LIST', sidebarLeft + sidebarW / 2, sy + 4.3, { align: 'center' });

    sy += 8;
    const gRowH = 5.5;
    const checkSize = 4;
    const maxRows = Math.min(groceryItems.length, Math.floor((ph - sy - 55) / gRowH));

    for (let i = 0; i < maxRows; i++) {
      const gy = sy + i * gRowH;

      // Grey line
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(sidebarLeft, gy, sidebarW - checkSize - 3, gRowH - 1, 1, 1, 'F');

      // Checkbox
      doc.setFillColor(241, 248, 233);
      doc.roundedRect(sidebarLeft + sidebarW - checkSize - 0.5, gy + 0.5, checkSize, checkSize, 0.8, 0.8, 'F');

      if (!blank && groceryChecked[i]) {
        doc.setDrawColor(85, 107, 47);
        doc.setLineWidth(0.4);
        const cx = sidebarLeft + sidebarW - checkSize - 0.5;
        doc.line(cx + 0.8, gy + 2.5, cx + 1.5, gy + 3.5);
        doc.line(cx + 1.5, gy + 3.5, cx + 3.2, gy + 1.2);
      }

      if (!blank && groceryItems[i] && groceryItems[i].trim()) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(34, 34, 34);
        doc.text(groceryItems[i], sidebarLeft + 2, gy + 3.8);
      }
    }

    // Notes
    const ny = sy + maxRows * gRowH + 4;
    if (ny < ph - 25) {
      doc.setFillColor(230, 218, 195);
      doc.roundedRect(sidebarLeft, ny, sidebarW, 6, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(122, 93, 46);
      doc.text('NOTES', sidebarLeft + sidebarW / 2, ny + 4.3, { align: 'center' });

      // Notes box
      doc.setFillColor(245, 245, 245);
      const notesBoxH = Math.min(40, ph - ny - 18);
      doc.roundedRect(sidebarLeft, ny + 8, sidebarW, notesBoxH, 1.5, 1.5, 'F');

      if (notes && !blank) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(34, 34, 34);
        const nLines = doc.splitTextToSize(notes, sidebarW - 4);
        nLines.slice(0, Math.floor(notesBoxH / 4)).forEach((line, i) => {
          doc.text(line, sidebarLeft + 2, ny + 12 + i * 3.5);
        });
      }
    }

    doc.setFontSize(5);
    doc.setTextColor(200, 200, 200);
    doc.setFont('helvetica', 'normal');
    doc.text('mykit.tools', pw - margin, ph - 4, { align: 'right' });

    doc.save(`meal-plan-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-3 mb-5">
        <div className="w-40">
          <Select
            label="Dietary"
            options={[
              { value: 'all', label: 'No restrictions' },
              { value: 'vegetarian', label: 'Vegetarian' },
              { value: 'vegan', label: 'Vegan' },
              { value: 'glutenfree', label: 'Gluten-free' },
            ]}
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
          />
        </div>
        <Button onClick={handleClear} variant="secondary" size="sm">Clear All</Button>
        <Button onClick={() => handleDownloadPDF(false)} variant="primary" size="sm">Download My Plan</Button>
        <Button onClick={() => handleDownloadPDF(true)} variant="secondary" size="sm">Download Blank</Button>
      </div>

      {/* Main layout: 2fr 1fr grid like reference */}
      <div className="grid gap-6" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Left: Meal grid */}
        <div>
          {/* Column headers */}
          <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: '30px repeat(3, 1fr)' }}>
            <div />
            {MEALS.map(meal => (
              <div key={meal} className="text-center text-[11px] font-semibold text-text-muted uppercase tracking-[0.1em]">
                {meal}
              </div>
            ))}
          </div>

          {/* Day rows */}
          <div className="flex flex-col gap-4">
            {DAYS.map((day, di) => (
              <div
                key={day}
                className="grid gap-2.5"
                style={{ gridTemplateColumns: '30px repeat(3, 1fr)' }}
              >
                {/* Day label */}
                <div className={`rounded flex items-center justify-center aspect-[1/3] ${DAY_STYLES[di].bg} ${DAY_STYLES[di].text}`}>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.15em] leading-none"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {day}
                  </span>
                </div>

                {/* Meal inputs - no border, just grey fill, aspect ratio ~square */}
                {MEALS.map(meal => (
                  <textarea
                    key={meal}
                    value={meals[day][meal]}
                    onChange={(e) => updateMeal(day, meal, e.target.value)}
                    placeholder={meal}
                    className="w-full aspect-[2/1] px-2.5 py-2 text-sm bg-[#f5f5f5] rounded-md resize-none focus:bg-white focus:ring-1 focus:ring-accent/20 focus:outline-none placeholder:text-text-muted/40 text-text-primary"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="hidden sm:flex flex-col gap-3">
          {/* Budget row */}
          <div className="flex justify-between text-[11px] font-semibold text-text-muted uppercase tracking-[0.08em]">
            <div className="flex items-center gap-1">
              Budget:
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-16 h-5 px-1.5 text-[11px] bg-[#f5f5f5] rounded font-mono text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/20"
              />
            </div>
            <div className="flex items-center gap-1">
              Spent:
              <input
                type="text"
                value={spent}
                onChange={(e) => setSpent(e.target.value)}
                className="w-16 h-5 px-1.5 text-[11px] bg-[#f5f5f5] rounded font-mono text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/20"
              />
            </div>
          </div>

          {/* Grocery list */}
          <div className="text-center text-[11px] font-bold uppercase tracking-[0.1em] bg-[#dcedc8] text-[#556b2f] rounded py-1.5">
            Grocery List
          </div>
          <div className="flex flex-col gap-1 max-h-[420px] overflow-y-auto">
            {groceryItems.map((item, i) => (
              <div key={i} className="flex gap-1.5 items-center">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateGrocery(i, e.target.value)}
                  className={`flex-1 h-6 px-2 text-xs bg-[#f5f5f5] rounded focus:outline-none focus:ring-1 focus:ring-accent/20 ${groceryChecked[i] ? 'line-through text-text-muted' : 'text-text-primary'}`}
                />
                <button
                  onClick={() => toggleGroceryCheck(i)}
                  className={`w-5 h-5 rounded flex-shrink-0 transition-colors ${groceryChecked[i] ? 'bg-[#c8e6c9]' : 'bg-[#f1f8e9]'}`}
                  aria-label={`Mark item ${i + 1} as ${groceryChecked[i] ? 'incomplete' : 'complete'}`}
                >
                  {groceryChecked[i] && (
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mx-auto text-[#2e6b30]">
                      <path d="M4 8l3 3 5-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addGroceryRows}
            className="py-1 text-xs font-medium text-accent hover:bg-accent/5 rounded border border-dashed border-accent/30 transition-colors"
          >
            + Add more items
          </button>

          {/* Notes */}
          <div className="mt-auto">
            <div className="text-center text-[11px] font-bold uppercase tracking-[0.1em] bg-[#e6dac3] text-[#7a5d2e] rounded py-1.5 mb-1">
              Notes
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Meal prep reminders, allergies, etc."
              className="w-full px-2.5 py-2 text-xs bg-[#f5f5f5] rounded-md resize-none focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent/20 placeholder:text-text-muted/40 text-text-primary"
            />
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="sm:hidden mt-4 space-y-3">
        <div className="flex gap-2 text-[11px] font-semibold text-text-muted uppercase tracking-wide">
          <div className="flex-1">
            <span>Budget:</span>
            <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full h-6 px-1.5 mt-1 bg-[#f5f5f5] rounded font-mono text-text-primary text-xs" />
          </div>
          <div className="flex-1">
            <span>Spent:</span>
            <input type="text" value={spent} onChange={(e) => setSpent(e.target.value)} className="w-full h-6 px-1.5 mt-1 bg-[#f5f5f5] rounded font-mono text-text-primary text-xs" />
          </div>
        </div>

        <div className="text-center text-[11px] font-bold uppercase tracking-wide bg-[#dcedc8] text-[#556b2f] rounded py-1.5">
          Grocery List
        </div>
        <div className="grid grid-cols-2 gap-1">
          {groceryItems.map((item, i) => (
            <input key={i} type="text" value={item} onChange={(e) => updateGrocery(i, e.target.value)}
              className="h-6 px-2 text-xs bg-[#f5f5f5] rounded text-text-primary" />
          ))}
        </div>
        <button onClick={addGroceryRows} className="w-full py-1 text-xs font-medium text-accent hover:bg-accent/5 rounded border border-dashed border-accent/30">+ Add more</button>

        <div className="text-center text-[11px] font-bold uppercase tracking-wide bg-[#e6dac3] text-[#7a5d2e] rounded py-1.5">Notes</div>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Meal prep reminders..."
          className="w-full px-2 py-1.5 text-xs bg-[#f5f5f5] rounded-md resize-none text-text-primary" />
      </div>
    </div>
  );
}
