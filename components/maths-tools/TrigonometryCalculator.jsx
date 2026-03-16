'use client';

import { useState, useMemo } from 'react';

export default function TrigonometryCalculator() {
  const [angle, setAngle] = useState(45);
  const [unit, setUnit] = useState('degrees');

  const angleInRadians = useMemo(() => {
    return unit === 'degrees' ? (angle * Math.PI) / 180 : parseFloat(angle) || 0;
  }, [angle, unit]);

  const trig = useMemo(() => {
    const sin = Math.sin(angleInRadians);
    const cos = Math.cos(angleInRadians);
    const tan = Math.tan(angleInRadians);
    const csc = Math.abs(sin) < 0.0001 ? Infinity : 1 / sin;
    const sec = Math.abs(cos) < 0.0001 ? Infinity : 1 / cos;
    const cot = Math.abs(tan) < 0.0001 ? Infinity : 1 / tan;

    return { sin, cos, tan, csc, sec, cot };
  }, [angleInRadians]);

  const displayAngle = () => {
    if (unit === 'degrees') return angle;
    return (angleInRadians * 180) / Math.PI;
  };

  const isSpecialAngle = () => {
    const deg = (angleInRadians * 180) / Math.PI;
    return [0, 30, 45, 60, 90, 120, 135, 150, 180, 270, 360].includes(deg % 360);
  };

  const formatValue = (val) => {
    if (!isFinite(val)) return 'undefined';
    return val.toFixed(6);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-text-primary font-medium mb-2">Angle</label>
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-text-primary font-medium mb-2">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="degrees">Degrees</option>
            <option value="radians">Radians</option>
          </select>
        </div>
      </div>

      <div className="bg-surface p-6 rounded-[var(--radius-card)] space-y-4">
        <p className="text-text-secondary text-sm font-medium">
          Angle: {displayAngle().toFixed(2)}° {unit === 'degrees' ? '' : `(${angleInRadians.toFixed(6)} rad)`}
          {isSpecialAngle() && <span className="ml-2 text-yellow-600">★ Special angle</span>}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-border p-3 rounded-[var(--radius-input)]">
            <p className="text-text-muted text-xs font-medium">sin θ</p>
            <p className="text-lg font-mono font-semibold text-text-primary">
              {formatValue(trig.sin)}
            </p>
          </div>

          <div className="bg-white border border-border p-3 rounded-[var(--radius-input)]">
            <p className="text-text-muted text-xs font-medium">cos θ</p>
            <p className="text-lg font-mono font-semibold text-text-primary">
              {formatValue(trig.cos)}
            </p>
          </div>

          <div className="bg-white border border-border p-3 rounded-[var(--radius-input)]">
            <p className="text-text-muted text-xs font-medium">tan θ</p>
            <p className="text-lg font-mono font-semibold text-text-primary">
              {formatValue(trig.tan)}
            </p>
          </div>

          <div className="bg-white border border-border p-3 rounded-[var(--radius-input)]">
            <p className="text-text-muted text-xs font-medium">csc θ</p>
            <p className="text-lg font-mono font-semibold text-text-primary">
              {formatValue(trig.csc)}
            </p>
          </div>

          <div className="bg-white border border-border p-3 rounded-[var(--radius-input)]">
            <p className="text-text-muted text-xs font-medium">sec θ</p>
            <p className="text-lg font-mono font-semibold text-text-primary">
              {formatValue(trig.sec)}
            </p>
          </div>

          <div className="bg-white border border-border p-3 rounded-[var(--radius-input)]">
            <p className="text-text-muted text-xs font-medium">cot θ</p>
            <p className="text-lg font-mono font-semibold text-text-primary">
              {formatValue(trig.cot)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)]">
        <p className="text-text-secondary font-medium text-sm mb-3">Unit Circle</p>
        <svg
          viewBox="0 0 200 200"
          className="w-full max-w-xs mx-auto"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
        >
          <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e5e5" strokeWidth="2" />
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 100 + 80 * Math.cos(rad);
            const y = 100 + 80 * Math.sin(rad);
            return (
              <line
                key={deg}
                x1="100"
                y1="100"
                x2={x}
                y2={y}
                stroke="#d4d4d4"
                strokeWidth="1"
              />
            );
          })}

          <line x1="20" y1="100" x2="180" y2="100" stroke="#a3a3a3" strokeWidth="1" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#a3a3a3" strokeWidth="1" />

          <circle cx="100" cy="100" r="2" fill="#1a1a1a" />

          <line
            x1="100"
            y1="100"
            x2={100 + 80 * Math.cos(angleInRadians)}
            y2={100 + 80 * Math.sin(angleInRadians)}
            stroke="#2563eb"
            strokeWidth="2"
          />
          <circle
            cx={100 + 80 * Math.cos(angleInRadians)}
            cy={100 + 80 * Math.sin(angleInRadians)}
            r="4"
            fill="#2563eb"
          />
        </svg>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-[var(--radius-card)]">
        <p className="text-text-secondary text-sm font-medium mb-2">Identities</p>
        <p className="text-text-secondary text-xs font-mono">
          sin²θ + cos²θ = 1
        </p>
        <p className="text-text-secondary text-xs font-mono mt-1">
          {trig.sin.toFixed(4)}² + {trig.cos.toFixed(4)}² = {(Math.pow(trig.sin, 2) + Math.pow(trig.cos, 2)).toFixed(6)}
        </p>
      </div>
    </div>
  );
}
