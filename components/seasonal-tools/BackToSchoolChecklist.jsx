'use client';

import { useState } from 'react';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import { downloadAsJPG, drawSectionHeading, drawCheckItem } from '@/lib/download-utils';

const checklists = {
  reception: {
    uniform: [
      'Sweatshirt/cardigan with school badge',
      'Trousers or skirt (2-3 pairs)',
      'White shirts/blouses (3-4)',
      'School shoes (2 pairs)',
      'PE kit: shorts, t-shirt, pumps',
    ],
    stationery: [
      'Pencil case',
      'HB pencils (pack of 12)',
      'Coloured pencils',
      'Glue stick (2-3)',
      'Safety scissors',
    ],
    accessories: [
      'School bag/rucksack',
      'Lunch box',
      'Water bottle',
      'Plimsolls/indoor shoes',
      'Socks (6 pairs)',
    ],
  },
  primary: {
    uniform: [
      'Sweatshirt/cardigan with school badge (2)',
      'Trousers or skirt (2-3 pairs)',
      'White shirts/blouses (4-5)',
      'School shoes (2 pairs)',
      'PE kit: shorts, t-shirt, pumps',
      'Tie (if required)',
    ],
    stationery: [
      'Pencil case',
      'HB pencils (pack of 24)',
      'Coloured pencils (pack of 24)',
      'Pens (blue and black)',
      'Highlighters',
      'Ruler (30cm)',
      'Eraser',
      'Glue stick (3)',
      'Safety scissors',
      'Compass',
    ],
    accessories: [
      'School bag/rucksack',
      'Lunch box',
      'Water bottle',
      'Plimsolls/indoor shoes',
      'PE bag',
      'Socks (8 pairs)',
      'Underwear (7 pairs)',
      'Hair clips/bands',
    ],
  },
  secondary: {
    uniform: [
      'Blazer with school badge',
      'Trousers or skirt (2-3 pairs)',
      'White shirts/blouses (5-6)',
      'School shoes (2 pairs)',
      'PE kit: shorts, t-shirt, trainers',
      'Tie (if required)',
      'V-neck jumper (optional)',
    ],
    stationery: [
      'Pencil case',
      'HB pencils (pack of 24)',
      'Coloured pencils',
      'Pens (blue, black, red)',
      'Highlighters (pack of 4)',
      'Ruler (30cm)',
      'Protractor',
      'Eraser',
      'Glue stick (3)',
      'Calculator (scientific)',
      'Compass',
      'Set square',
      'Notebook (A4)',
    ],
    accessories: [
      'School bag/rucksack (large)',
      'Lunch box',
      'Water bottle',
      'PE bag (large)',
      'Socks (10 pairs)',
      'Underwear (8 pairs)',
      'Deodorant',
      'Hair ties/clips',
      'Student planner',
    ],
  },
};

export default function BackToSchoolChecklist() {
  const [schoolYear, setSchoolYear] = useState('primary');
  const [checked, setChecked] = useState({});

  const checklist = checklists[schoolYear];

  const handleCheck = (key) => {
    setChecked(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const downloadChecklist = () => {
    const categories = Object.entries(checklist);

    downloadAsJPG({
      filename: 'back-to-school-checklist.jpg',
      width: 900,
      height: 1200,
      title: 'Back to School Checklist',
      subtitle: `${schoolYear === 'reception' ? 'Reception' : schoolYear === 'primary' ? 'Primary School' : 'Secondary School'}`,
      accentColor: '#0891b2',
      render: (ctx, area) => {
        let y = area.y;

        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#2563eb';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`Progress: ${progress}% complete`, area.x, y);
        y += 24;

        categories.forEach(([category, items]) => {
          const catName = category === 'uniform' ? 'Uniform' : category === 'stationery' ? 'Stationery' : 'Bags & Accessories';
          y = drawSectionHeading(ctx, catName, area.x, y, area.width);

          items.forEach((item, idx) => {
            const itemKey = `${category}-${idx}`;
            const isChecked = checked[itemKey] || false;
            y = drawCheckItem(ctx, item, isChecked, area.x, y, { fontSize: 12, lineHeight: 22 });
          });

          y += 8;
        });
      }
    });
  };

  const categories = Object.entries(checklist);
  const totalItems = categories.reduce((sum, [_, items]) => sum + items.length, 0);
  const completedItems = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  const YEAR_OPTIONS = [
    { value: 'reception', label: 'Reception' },
    { value: 'primary', label: 'Primary (Yrs 1-6)' },
    { value: 'secondary', label: 'Secondary (Yrs 7-11)' },
  ];

  return (
    <div className="space-y-4">
      {/* Year picker + progress inline */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {YEAR_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setSchoolYear(opt.value); setChecked({}); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                schoolYear === opt.value
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-text-secondary">{completedItems}/{totalItems} items</span>
          <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono font-bold text-accent text-sm">{progress}%</span>
        </div>
      </div>

      {/* Checklist sections */}
      {categories.map(([category, items]) => (
        <div key={category} className="bg-surface border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="px-4 py-2 border-b border-border">
            <h3 className="font-heading text-sm font-bold text-text-primary">
              {category === 'uniform' ? 'Uniform' : category === 'stationery' ? 'Stationery' : 'Bags & Accessories'}
            </h3>
          </div>
          <div>
            {items.map((item, idx) => {
              const itemKey = `${category}-${idx}`;
              const isChecked = checked[itemKey] || false;
              return (
                <label
                  key={itemKey}
                  htmlFor={itemKey}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer border-b border-border last:border-b-0 transition-colors ${
                    isChecked ? 'bg-green-50' : 'bg-white hover:bg-surface'
                  }`}
                >
                  <Checkbox
                    id={itemKey}
                    checked={isChecked}
                    onChange={() => handleCheck(itemKey)}
                  />
                  <span className={`text-sm flex-1 ${isChecked ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-3">
        <p className="font-heading text-sm font-bold text-blue-900">Tip: Label everything!</p>
        <p className="text-blue-800 text-sm mt-1">
          Write your child's name on uniform, shoes, lunch box, water bottle, and PE kit to prevent items getting lost.
        </p>
      </div>

      <Button onClick={downloadChecklist} className="w-full bg-accent text-white">
        Download Checklist as JPG
      </Button>
    </div>
  );
}
