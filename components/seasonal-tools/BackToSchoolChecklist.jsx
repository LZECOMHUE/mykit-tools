'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';

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

  const categories = Object.entries(checklist);
  const totalItems = categories.reduce((sum, [_, items]) => sum + items.length, 0);
  const completedItems = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <label className="block text-text-secondary text-sm font-medium mb-2">
          School Year
        </label>
        <Select value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)} className="w-full">
          <option value="reception">Reception</option>
          <option value="primary">Primary School (Years 1-6)</option>
          <option value="secondary">Secondary School (Years 7-11)</option>
        </Select>
      </div>

      <div className="bg-accent text-white border border-accent rounded-[var(--radius-card)] p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-lg font-bold">Progress</h3>
          <span className="font-mono text-2xl font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm opacity-90 mt-3">
          {completedItems} of {totalItems} items checked off
        </p>
      </div>

      <div className="space-y-6">
        {categories.map(([category, items]) => (
          <div key={category} className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h3 className="font-heading text-base font-bold text-text-primary capitalize">
              {category === 'uniform' ? 'Uniform' : category === 'stationery' ? 'Stationery' : 'Bags & Accessories'}
            </h3>
            <div className="space-y-2">
              {items.map((item, idx) => {
                const itemKey = `${category}-${idx}`;
                return (
                  <div key={itemKey} className="flex items-start gap-3 bg-white border border-border rounded-lg p-3">
                    <Checkbox
                      id={itemKey}
                      checked={checked[itemKey] || false}
                      onChange={() => handleCheck(itemKey)}
                    />
                    <label htmlFor={itemKey} className="text-text-primary cursor-pointer flex-1">
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4 space-y-2">
        <p className="font-heading text-sm font-bold text-blue-900">Tip: Label everything!</p>
        <p className="text-blue-800 text-sm">
          Write your child's name on uniform, shoes, lunch box, water bottle, and PE kit. This helps prevent items getting lost.
        </p>
      </div>
    </div>
  );
}
