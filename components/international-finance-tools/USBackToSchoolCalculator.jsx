'use client';

import { useState, useMemo } from 'react';

export default function USBackToSchoolCalculator() {
  const [gradeLevel, setGradeLevel] = useState('3-5');
  const [numChildren, setNumChildren] = useState('1');

  const supplyData = {
    'K-2': {
      label: 'Kindergarten - 2nd Grade',
      estCost: 65,
      supplies: [
        { name: 'Crayons', qty: '2 boxes', checked: false },
        { name: 'Pencils (#2)', qty: 'box', checked: false },
        { name: 'Glue sticks', qty: 'box', checked: false },
        { name: 'Scissors (child safe)', qty: '1 pair', checked: false },
        { name: 'Backpack', qty: '1', checked: false },
        { name: 'Folders', qty: '4-6', checked: false },
        { name: 'Tissues (boxes)', qty: '4 boxes', checked: false },
        { name: 'Pencils - thin tip', qty: 'box', checked: false },
        { name: 'Erasers', qty: 'pack', checked: false },
        { name: 'Ruled paper/notebook', qty: '2', checked: false },
      ],
    },
    '3-5': {
      label: '3rd - 5th Grade',
      estCost: 90,
      supplies: [
        { name: 'Pencils (#2)', qty: '2 boxes', checked: false },
        { name: 'Colored pencils', qty: '1 box', checked: false },
        { name: 'Markers', qty: '1 box', checked: false },
        { name: 'Glue sticks', qty: 'box', checked: false },
        { name: 'Notebooks', qty: '4-6', checked: false },
        { name: 'Folders/dividers', qty: '6', checked: false },
        { name: 'Backpack', qty: '1', checked: false },
        { name: 'Ruler', qty: '1', checked: false },
        { name: 'Pencil case', qty: '1', checked: false },
        { name: 'Calculator (basic)', qty: '1', checked: false },
        { name: 'Highlighters', qty: 'pack', checked: false },
        { name: 'Eraser', qty: 'pack', checked: false },
        { name: 'Index cards', qty: '2 packs', checked: false },
        { name: 'Tissue (boxes)', qty: '3 boxes', checked: false },
      ],
    },
    '6-8': {
      label: '6th - 8th Grade',
      estCost: 125,
      supplies: [
        { name: 'Binders', qty: '3-4', checked: false },
        { name: 'Dividers/tabs', qty: '3-4 sets', checked: false },
        { name: 'Notebook paper', qty: '3 packs', checked: false },
        { name: 'Pencils (#2)', qty: '2 boxes', checked: false },
        { name: 'Pens (blue/black)', qty: 'pack', checked: false },
        { name: 'Colored pencils', qty: '1 box', checked: false },
        { name: 'Highlighters', qty: 'pack', checked: false },
        { name: 'Backpack', qty: '1', checked: false },
        { name: 'Scientific calculator', qty: '1', checked: false },
        { name: 'Flash drive / USB', qty: '1', checked: false },
        { name: 'Folders', qty: '6-8', checked: false },
        { name: 'Planner/agenda', qty: '1', checked: false },
        { name: 'Ruler/protractor', qty: '1 each', checked: false },
        { name: 'Compass', qty: '1', checked: false },
        { name: 'Index cards', qty: '2 packs', checked: false },
      ],
    },
    '9-12': {
      label: '9th - 12th Grade',
      estCost: 180,
      supplies: [
        { name: 'Binders/folders', qty: '4-5', checked: false },
        { name: 'Notebook paper', qty: '3-4 packs', checked: false },
        { name: 'Pens (assorted)', qty: 'pack', checked: false },
        { name: 'Pencils', qty: '1 box', checked: false },
        { name: 'Highlighters', qty: 'pack', checked: false },
        { name: 'Backpack/bag', qty: '1', checked: false },
        { name: 'Graphing calculator', qty: '1', checked: false },
        { name: 'Laptop/tablet', qty: '1', checked: false },
        { name: 'Flash drive / cloud storage', qty: '1', checked: false },
        { name: 'Planner/agenda', qty: '1', checked: false },
        { name: 'Headphones/earbuds', qty: '1', checked: false },
        { name: 'Art/specialty supplies', qty: 'as needed', checked: false },
        { name: 'Folders/dividers', qty: '6-8', checked: false },
        { name: 'Sticky notes', qty: '3 pads', checked: false },
        { name: 'Index cards', qty: '2-3 packs', checked: false },
        { name: 'Rulers/geometry set', qty: '1', checked: false },
      ],
    },
  };

  const [localSupplies, setLocalSupplies] = useState(supplyData[gradeLevel].supplies);

  const handleGradeChange = (newGrade) => {
    setGradeLevel(newGrade);
    setLocalSupplies(supplyData[newGrade].supplies);
  };

  const toggleSupply = (index) => {
    const updated = [...localSupplies];
    updated[index].checked = !updated[index].checked;
    setLocalSupplies(updated);
  };

  const calculations = useMemo(() => {
    const numKids = parseInt(numChildren) || 1;
    const data = supplyData[gradeLevel];
    const estCostPerChild = data.estCost;
    const totalCost = estCostPerChild * numKids;

    const checkedCount = localSupplies.filter((s) => s.checked).length;
    const percentageDone = localSupplies.length > 0 ? Math.round((checkedCount / localSupplies.length) * 100) : 0;

    return {
      numKids,
      gradeLevel: data.label,
      estCostPerChild,
      totalCost,
      totalSupplies: localSupplies.length,
      checkedCount,
      percentageDone,
    };
  }, [gradeLevel, numChildren, localSupplies]);

  const fmt = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <h1 className="text-3xl font-heading font-bold text-blue-900 mb-2">Back-to-School Calculator</h1>
        <p className="text-blue-800">Get everything your child needs</p>
      </div>

      {/* Controls */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        {/* Grade Level */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Grade Level</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(supplyData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => handleGradeChange(key)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  gradeLevel === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-border text-text-primary hover:border-blue-500'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Children */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Number of Children</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="1"
              max="10"
              value={numChildren}
              onChange={(e) => setNumChildren(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <span className="text-sm text-text-muted">child{parseInt(numChildren) !== 1 ? 'ren' : ''}</span>
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-600 text-xs font-medium mb-1">Cost Per Child</p>
          <p className="font-mono text-2xl font-bold text-blue-700">{fmt(calculations.estCostPerChild)}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-xs font-medium mb-1">Total Cost</p>
          <p className="font-mono text-2xl font-bold text-green-700">{fmt(calculations.totalCost)}</p>
        </div>
      </div>

      {/* Checklist Progress */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-text-primary">Supply Checklist</h3>
          <span className="text-sm text-text-secondary">
            {calculations.checkedCount} of {calculations.totalSupplies}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${calculations.percentageDone}%` }}
          />
        </div>
        <p className="text-sm text-text-secondary">{calculations.percentageDone}% Complete</p>

        {/* Supplies List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {localSupplies.map((supply, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                checked={supply.checked}
                onChange={() => toggleSupply(idx)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${supply.checked ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                  {supply.name}
                </p>
                <p className="text-xs text-text-muted">{supply.qty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Level Info */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">Estimated Cost by Grade</h3>
        <div className="space-y-2 text-sm">
          {Object.entries(supplyData).map(([key, data]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-text-secondary">{data.label}</span>
              <span className="font-mono text-text-primary font-semibold">{fmt(data.estCost)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">Money-Saving Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>• <strong>Check teacher lists:</strong> Some supplies may already be in the classroom</li>
          <li>• <strong>Sales timing:</strong> Shop after-school-starts sales for better deals</li>
          <li>• <strong>Bulk buying:</strong> Team up with other parents for bulk discounts</li>
          <li>• <strong>Generic brands:</strong> Store brands work just as well</li>
          <li>• <strong>Tax-free holidays:</strong> Many states have back-to-school tax-free weekends</li>
          <li>• <strong>Used items:</strong> Backpacks and bags can be reused from siblings</li>
          <li>• <strong>Calculators:</strong> For older grades, check if phones/devices can substitute</li>
        </ul>
      </div>

      {/* What's Included */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">Cost Includes</h3>
        <ul className="space-y-1 text-text-secondary text-sm">
          <li>✓ Writing supplies (pencils, pens, markers)</li>
          <li>✓ Paper products (notebooks, folders, paper)</li>
          <li>✓ Organization (binders, dividers, planner)</li>
          <li>✓ Tools (ruler, calculator, compass)</li>
          <li>✓ Backpack</li>
          <li>✓ Basic tech items (younger grades: USB drives; older: laptop assumed separate)</li>
        </ul>
      </div>
    </div>
  );
}
