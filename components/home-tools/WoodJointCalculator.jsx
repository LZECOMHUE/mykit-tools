'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-[13px] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted';
const selectCls = 'w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-[13px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted';
const cardCls = 'bg-white border border-border rounded-[var(--radius-card)] p-4';

export default function WoodJointCalculator() {
  const [jointType, setJointType] = useState('dovetail');
  const [boardThickness, setBoardThickness] = useState(18);
  const [boardWidth, setBoardWidth] = useState(150);
  const [woodHardness, setWoodHardness] = useState('softwood');

  const jointOptions = {
    dovetail: { label: 'Dovetail Joint', description: 'Classic interlocking pins and tails' },
    finger: { label: 'Finger Joint', description: 'Box/finger joint for box corners' },
    box: { label: 'Box Joint', description: 'Rectangular fingers at corners' },
    halflap: { label: 'Half-Lap Joint', description: 'Overlapping half-thickness cuts' },
    mortise: { label: 'Mortise & Tenon', description: 'Hole and projection joint' },
    dowel: { label: 'Dowel Joint', description: 'Wooden dowel alignment' },
  };

  const calculation = useMemo(() => {
    const thickness = boardThickness;
    const width = boardWidth;

    if (jointType === 'dovetail') {
      const angle = woodHardness === 'softwood' ? 1 / 6 : 1 / 8;
      const slope = Math.atan(angle) * (180 / Math.PI);
      const numTails = Math.floor(width / 30);
      const tailWidth = Math.floor(width / (numTails + 1));
      const pinWidth = tailWidth;

      return {
        type: 'Dovetail Joint',
        numTails,
        tailWidth: `${tailWidth}mm`,
        pinWidth: `${pinWidth}mm`,
        angle: `${slope.toFixed(1)}°`,
        ratio: woodHardness === 'softwood' ? '1:6' : '1:8',
        description: `Create ${numTails} tails with ${tailWidth}mm width. Pins are ${pinWidth}mm wide. Slope angle: ${slope.toFixed(1)}°`,
      };
    }

    if (jointType === 'finger' || jointType === 'box') {
      const numFingers = Math.floor(width / 20);
      const fingerWidth = Math.floor(width / numFingers);
      const gapWidth = fingerWidth;

      return {
        type: 'Finger Joint',
        numFingers,
        fingerWidth: `${fingerWidth}mm`,
        gapWidth: `${gapWidth}mm`,
        description: `Create ${numFingers} fingers with ${fingerWidth}mm width and ${gapWidth}mm gaps. Depth equals board thickness (${thickness}mm)`,
      };
    }

    if (jointType === 'halflap') {
      const lapWidth = Math.floor(width / 3);
      const lapDepth = thickness / 2;

      return {
        type: 'Half-Lap Joint',
        lapWidth: `${lapWidth}mm`,
        lapDepth: `${lapDepth.toFixed(1)}mm`,
        description: `Cut a lap ${lapWidth}mm wide and ${lapDepth.toFixed(1)}mm deep (half thickness). Each board overlaps the other by half its thickness.`,
      };
    }

    if (jointType === 'mortise') {
      const mortiseWidth = Math.floor(thickness / 3);
      const mortiseDepth = Math.floor(thickness * 0.667);
      const tenonThickness = mortiseWidth;
      const tenonsLength = mortiseDepth;

      return {
        type: 'Mortise & Tenon',
        mortiseWidth: `${mortiseWidth}mm`,
        mortiseDepth: `${mortiseDepth}mm`,
        tenonThickness: `${tenonThickness}mm`,
        tenonsLength: `${tenonsLength}mm`,
        description: `Mortise: ${mortiseWidth}mm wide × ${mortiseDepth}mm deep. Tenon: ${tenonThickness}mm thick × ${tenonsLength}mm long. Mortise should be 1/3 board thickness.`,
      };
    }

    if (jointType === 'dowel') {
      const dowelDiameter = Math.floor(thickness / 2);
      const numDowels = Math.floor(width / 100) + 1;
      const dowelLength = thickness + 20;

      return {
        type: 'Dowel Joint',
        dowelDiameter: `${dowelDiameter}mm`,
        numDowels,
        dowelLength: `${dowelLength}mm`,
        spacing: `${Math.floor(width / numDowels)}mm`,
        description: `Use ${numDowels} dowels of ${dowelDiameter}mm diameter × ${dowelLength}mm length. Space ${Math.floor(width / numDowels)}mm apart. Glue into holes 20mm deeper than dowel insertion.`,
      };
    }

    return {};
  }, [jointType, boardThickness, boardWidth, woodHardness]);

  const JointDiagram = () => {
    if (jointType === 'dovetail') {
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto border border-border rounded-[var(--radius-input)] bg-surface p-2">
          <text x="120" y="15" textAnchor="middle" className="fill-text-primary" fontSize="12" fontWeight="bold">
            Dovetail Layout (Top View)
          </text>
          <rect x="30" y="30" width="180" height="60" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <polygon
                points={`${50 + i * 45},30 ${60 + i * 45},30 ${70 + i * 45},90 ${50 + i * 45},90`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
              />
              <polygon
                points={`${65 + i * 45},30 ${75 + i * 45},30 ${85 + i * 45},90 ${65 + i * 45},90`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-text-secondary"
              />
            </g>
          ))}
          <text x="120" y="115" textAnchor="middle" className="fill-text-secondary" fontSize="11">
            Tails (blue) interlock with Pins (grey)
          </text>
        </svg>
      );
    }

    if (jointType === 'finger' || jointType === 'box') {
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto border border-border rounded-[var(--radius-input)] bg-surface p-2">
          <text x="120" y="15" textAnchor="middle" className="fill-text-primary" fontSize="12" fontWeight="bold">
            Finger Joint (Interlocking View)
          </text>
          <rect x="30" y="30" width="180" height="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={45 + i * 35}
              y="30"
              width="25"
              height="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={i % 2 === 0 ? 'text-accent' : 'text-text-secondary'}
            />
          ))}
          <text x="120" y="125" textAnchor="middle" className="fill-text-secondary" fontSize="11">
            Cut slots in both boards to interlock
          </text>
        </svg>
      );
    }

    if (jointType === 'halflap') {
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto border border-border rounded-[var(--radius-input)] bg-surface p-2">
          <text x="120" y="15" textAnchor="middle" className="fill-text-primary" fontSize="12" fontWeight="bold">
            Half-Lap Joint (Side View)
          </text>
          <rect x="30" y="35" width="90" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary" />
          <rect x="120" y="55" width="90" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary" />
          <rect x="120" y="35" width="90" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-accent" />
          <rect x="30" y="55" width="90" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-accent" />
          <text x="120" y="125" textAnchor="middle" className="fill-text-secondary" fontSize="11">
            Both boards cut halfway through their thickness
          </text>
        </svg>
      );
    }

    if (jointType === 'mortise') {
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto border border-border rounded-[var(--radius-input)] bg-surface p-2">
          <text x="120" y="15" textAnchor="middle" className="fill-text-primary" fontSize="12" fontWeight="bold">
            Mortise &amp; Tenon (Front View)
          </text>
          <rect x="40" y="35" width="50" height="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary" />
          <rect x="100" y="35" width="100" height="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary" />
          <rect x="55" y="50" width="20" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" />
          <rect x="115" y="50" width="20" height="50" fill="currentColor" className="fill-accent opacity-30" />
          <text x="120" y="125" textAnchor="middle" className="fill-text-secondary" fontSize="11">
            Tenon (right) fits into Mortise hole (left)
          </text>
        </svg>
      );
    }

    if (jointType === 'dowel') {
      return (
        <svg viewBox="0 0 240 140" className="w-full h-auto border border-border rounded-[var(--radius-input)] bg-surface p-2">
          <text x="120" y="15" textAnchor="middle" className="fill-text-primary" fontSize="12" fontWeight="bold">
            Dowel Joint (Top View)
          </text>
          <rect x="40" y="35" width="160" height="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary" />
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={75 + i * 40}
              cy="60"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            />
          ))}
          <text x="120" y="125" textAnchor="middle" className="fill-text-secondary" fontSize="11">
            Dowels (circles) aligned and glued in holes
          </text>
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="space-y-3">
      <div className={cardCls}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Joint Settings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[13px]">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block font-medium">Joint Type</label>
            <select value={jointType} onChange={(e) => setJointType(e.target.value)} className={selectCls}>
              {Object.entries(jointOptions).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            <p className="text-text-muted text-[11px] mt-1">{jointOptions[jointType].description}</p>
          </div>

          <div>
            <label className="text-[13px] text-text-secondary mb-1 block font-medium">Wood Hardness</label>
            <select value={woodHardness} onChange={(e) => setWoodHardness(e.target.value)} className={selectCls}>
              <option value="softwood">Softwood (Pine, Fir)</option>
              <option value="hardwood">Hardwood (Oak, Maple)</option>
            </select>
            <p className="text-text-muted text-[11px] mt-1">Affects dovetail angles</p>
          </div>

          <div>
            <label className="text-[13px] text-text-secondary mb-1 block font-medium">Board Thickness (mm)</label>
            <input
              type="number"
              min="6"
              step="1"
              value={boardThickness}
              onChange={(e) => setBoardThickness(parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
          </div>

          <div>
            <label className="text-[13px] text-text-secondary mb-1 block font-medium">Board Width (mm)</label>
            <input
              type="number"
              min="50"
              step="5"
              value={boardWidth}
              onChange={(e) => setBoardWidth(parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-accent rounded-[var(--radius-card)] p-4" style={{ backgroundColor: 'rgb(37, 99, 235, 0.07)' }}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Joint Dimensions</h2>
        <div className="space-y-2 text-[13px] mb-4">
          {Object.entries(calculation).map(([key, value]) => {
            if (key === 'description' || key === 'type') return null;
            return (
              <div key={key} className="flex justify-between items-center">
                <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="font-mono font-bold text-text-primary">{value}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-text-secondary text-[11px] mb-2">
            <strong>Notes:</strong> {calculation.description}
          </p>
        </div>
      </div>

      <div className={cardCls}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Joint Diagram</h2>
        <JointDiagram />
      </div>
    </div>
  );
}
