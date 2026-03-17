'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function SawhorseAngleCalculator() {
  const [desiredHeight, setDesiredHeight] = useState(90);
  const [topWidth, setTopWidth] = useState(40);
  const [baseSpread, setBaseSpread] = useState(80);
  const [legCount, setLegCount] = useState(4);

  const calculation = useMemo(() => {
    const heightDiff = desiredHeight - (topWidth / 2);
    const horizontalDist = (baseSpread - topWidth) / 2;

    const legLength = Math.sqrt(heightDiff ** 2 + horizontalDist ** 2);
    const angleFromVertical = Math.atan(horizontalDist / heightDiff) * (180 / Math.PI);
    const angleFromHorizontal = 90 - angleFromVertical;

    return {
      legLength: legLength.toFixed(1),
      angleFromVertical: angleFromVertical.toFixed(1),
      angleFromHorizontal: angleFromHorizontal.toFixed(1),
      heightDiff: heightDiff.toFixed(1),
      horizontalDist: horizontalDist.toFixed(1),
    };
  }, [desiredHeight, topWidth, baseSpread]);

  const Diagram = () => (
    <svg viewBox="0 0 280 250" className="w-full h-auto border border-border rounded-[var(--radius-input)] bg-surface p-3">
      <text x="140" y="20" textAnchor="middle" className="fill-text-primary" fontSize="13" fontWeight="bold">
        Sawhorse Side View
      </text>

      <line x1="60" y1="80" x2="220" y2="80" stroke="currentColor" strokeWidth="3" className="text-text-primary" />
      <line x1="60" y1="80" x2="30" y2="200" stroke="currentColor" strokeWidth="2.5" className="text-accent" />
      <line x1="220" y1="80" x2="250" y2="200" stroke="currentColor" strokeWidth="2.5" className="text-accent" />
      <line x1="30" y1="200" x2="250" y2="200" stroke="currentColor" strokeWidth="3" className="text-text-primary" />

      <circle cx="60" cy="80" r="4" fill="currentColor" className="fill-text-secondary" />
      <circle cx="220" cy="80" r="4" fill="currentColor" className="fill-text-secondary" />
      <circle cx="30" cy="200" r="4" fill="currentColor" className="fill-accent" />
      <circle cx="250" cy="200" r="4" fill="currentColor" className="fill-accent" />

      <text x="140" y="98" textAnchor="middle" className="fill-text-secondary" fontSize="11">
        Top: {topWidth}cm
      </text>
      <text x="12" y="140" className="fill-text-secondary" fontSize="10" fontWeight="bold">
        {calculation.legLength}cm
      </text>
      <text x="140" y="230" textAnchor="middle" className="fill-text-secondary" fontSize="11">
        Base: {baseSpread}cm
      </text>
      <text x="140" y="50" textAnchor="middle" className="fill-text-secondary" fontSize="11" fontWeight="bold">
        Height: {desiredHeight}cm
      </text>

      <path
        d={`M 80 75 Q 85 70 92 75`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent"
      />
      <text x="85" y="65" className="fill-accent" fontSize="10" fontWeight="bold">
        {calculation.angleFromVertical}°
      </text>
    </svg>
  );

  return (
    <div className="space-y-3">
      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Sawhorse Dimensions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[13px]">
          <div>
            <label className="block text-text-secondary font-medium mb-1">Desired Height (cm)</label>
            <Input
              type="number"
              min="60"
              step="1"
              value={desiredHeight}
              onChange={(e) => setDesiredHeight(parseFloat(e.target.value) || 0)}
            />
            <p className="text-text-muted text-[11px] mt-1">Typical working height: 80-100cm</p>
          </div>

          <div>
            <label className="block text-text-secondary font-medium mb-1">Top Width (cm)</label>
            <Input
              type="number"
              min="20"
              step="1"
              value={topWidth}
              onChange={(e) => setTopWidth(parseFloat(e.target.value) || 0)}
            />
            <p className="text-text-muted text-[11px] mt-1">Width between where legs attach</p>
          </div>

          <div>
            <label className="block text-text-secondary font-medium mb-1">Base Spread (cm)</label>
            <Input
              type="number"
              min="40"
              step="1"
              value={baseSpread}
              onChange={(e) => setBaseSpread(parseFloat(e.target.value) || 0)}
            />
            <p className="text-text-muted text-[11px] mt-1">Distance between feet on ground</p>
          </div>

          <div>
            <label className="block text-text-secondary font-medium mb-1">Number of Legs</label>
            <select
              value={legCount}
              onChange={(e) => setLegCount(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary text-[13px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            >
              <option value="2">2 legs (simple A-frame)</option>
              <option value="4">4 legs (standard)</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="border-2 border-accent bg-accent-muted">
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Calculated Angles &amp; Dimensions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-[13px] mb-4">
          <div>
            <p className="text-text-secondary text-[11px] mb-1">Leg Length</p>
            <p className="font-mono text-xl font-bold text-accent">{calculation.legLength} cm</p>
          </div>

          <div>
            <p className="text-text-secondary text-[11px] mb-1">Angle from Vertical</p>
            <p className="font-mono text-xl font-bold text-accent">{calculation.angleFromVertical}°</p>
          </div>

          <div>
            <p className="text-text-secondary text-[11px] mb-1">Angle from Horizontal</p>
            <p className="font-mono text-lg font-bold text-text-primary">{calculation.angleFromHorizontal}°</p>
          </div>

          <div>
            <p className="text-text-secondary text-[11px] mb-1">Horizontal Distance</p>
            <p className="font-mono text-lg font-bold text-text-primary">{calculation.horizontalDist} cm</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-text-secondary text-[11px]">
            <strong>Tip:</strong> Cut legs at {calculation.angleFromVertical}° to the vertical for a stable sawhorse. Make sure both legs are identical for balance.
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Sawhorse Diagram</h2>
        <Diagram />
      </Card>
    </div>
  );
}
