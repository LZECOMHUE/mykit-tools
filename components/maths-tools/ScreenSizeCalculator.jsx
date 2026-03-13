'use client';

import { useState, useMemo } from 'react';

export default function ScreenSizeCalculator() {
  const [diagonal, setDiagonal] = useState('24');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [customRatioW, setCustomRatioW] = useState('16');
  const [customRatioH, setCustomRatioH] = useState('9');
  const [unit, setUnit] = useState('inches');

  const results = useMemo(() => {
    const diag = parseFloat(diagonal) || 1;
    let ratioW, ratioH;

    if (aspectRatio === 'custom') {
      ratioW = parseFloat(customRatioW) || 16;
      ratioH = parseFloat(customRatioH) || 9;
    } else {
      const parts = aspectRatio.split(':');
      ratioW = parseFloat(parts[0]);
      ratioH = parseFloat(parts[1]);
    }

    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(ratioW, ratioH);
    const simplifiedW = ratioW / g;
    const simplifiedH = ratioH / g;

    const aspectFactor = Math.sqrt(
      simplifiedW * simplifiedW + simplifiedH * simplifiedH
    );
    const widthInches = (diag * simplifiedW) / aspectFactor;
    const heightInches = (diag * simplifiedH) / aspectFactor;

    const widthCm = widthInches * 2.54;
    const heightCm = heightInches * 2.54;

    const areaInches = widthInches * heightInches;
    const areaCm = widthCm * heightCm;

    const diagonal_cm = diag * 2.54;

    return {
      diagonal: diag,
      widthInches: widthInches.toFixed(2),
      heightInches: heightInches.toFixed(2),
      widthCm: widthCm.toFixed(2),
      heightCm: heightCm.toFixed(2),
      areaInches: areaInches.toFixed(2),
      areaCm: areaCm.toFixed(2),
      aspectRatio: `${simplifiedW.toFixed(0)}:${simplifiedH.toFixed(0)}`,
      diagonal_cm: diagonal_cm.toFixed(2),
    };
  }, [diagonal, aspectRatio, customRatioW, customRatioH]);

  const commonScreens = [
    { diagonal: '21.5', ratio: '16:9', label: '21.5" 16:9', type: 'Monitor' },
    { diagonal: '24', ratio: '16:9', label: '24" 16:9', type: 'Monitor' },
    { diagonal: '27', ratio: '16:9', label: '27" 16:9', type: 'Monitor' },
    { diagonal: '32', ratio: '16:9', label: '32" 16:9', type: 'Monitor' },
    { diagonal: '34', ratio: '21:9', label: '34" 21:9', type: 'Ultrawide' },
    { diagonal: '49', ratio: '32:9', label: '49" 32:9', type: 'Super Ultrawide' },
    { diagonal: '55', ratio: '16:9', label: '55" 16:9', type: 'TV' },
    { diagonal: '65', ratio: '16:9', label: '65" 16:9', type: 'TV' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Input Section */}
      <div className="space-y-4 bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Screen Diagonal (inches)
          </label>
          <input
            type="number"
            value={diagonal}
            onChange={(e) => setDiagonal(e.target.value)}
            placeholder="24"
            step="0.1"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {['16:9', '16:10', '4:3', '21:9'].map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`px-3 py-2 rounded-[8px] font-medium transition-colors text-sm ${
                  aspectRatio === ratio && aspectRatio !== 'custom'
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {['32:9'].map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`px-3 py-2 rounded-[8px] font-medium transition-colors text-sm ${
                  aspectRatio === ratio && aspectRatio !== 'custom'
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
          <button
            onClick={() => setAspectRatio('custom')}
            className={`w-full px-3 py-2 rounded-[8px] font-medium transition-colors text-sm ${
              aspectRatio === 'custom'
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:bg-surface'
            }`}
          >
            Custom Ratio
          </button>
        </div>

        {aspectRatio === 'custom' && (
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1">
                Width
              </label>
              <input
                type="number"
                value={customRatioW}
                onChange={(e) => setCustomRatioW(e.target.value)}
                placeholder="16"
                className="w-full px-3 py-2 bg-white border border-border rounded-[8px] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1">
                Height
              </label>
              <input
                type="number"
                value={customRatioH}
                onChange={(e) => setCustomRatioH(e.target.value)}
                placeholder="9"
                className="w-full px-3 py-2 bg-white border border-border rounded-[8px] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-xs font-medium uppercase mb-1">
            Width
          </p>
          <p className="font-mono text-2xl font-bold text-text-primary mb-1">
            {results.widthInches}"
          </p>
          <p className="font-mono text-sm text-text-muted">
            {results.widthCm}cm
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-xs font-medium uppercase mb-1">
            Height
          </p>
          <p className="font-mono text-2xl font-bold text-text-primary mb-1">
            {results.heightInches}"
          </p>
          <p className="font-mono text-sm text-text-muted">
            {results.heightCm}cm
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-xs font-medium uppercase mb-1">
            Aspect Ratio
          </p>
          <p className="font-mono text-2xl font-bold text-accent">
            {results.aspectRatio}
          </p>
        </div>
      </div>

      {/* Screen Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-xs font-medium uppercase mb-2">
            Screen Area (Inches)
          </p>
          <p className="font-mono text-3xl font-bold text-accent">
            {results.areaInches} in2
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-xs font-medium uppercase mb-2">
            Screen Area (CM)
          </p>
          <p className="font-mono text-3xl font-bold text-accent">
            {results.areaCm} cm2
          </p>
        </div>
      </div>

      {/* Visual Representation */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <h3 className="text-text-primary font-semibold mb-4">
          Visual Scale (not actual size)
        </h3>
        <div className="flex items-center justify-center py-8 px-4">
          <div
            className="bg-accent bg-opacity-20 border-2 border-accent rounded-[4px]"
            style={{
              width: `${Math.min(
                300,
                (parseFloat(results.widthInches) / parseFloat(results.heightInches)) *
                  200
              )}px`,
              height: '200px',
              aspectRatio: `${results.widthInches} / ${results.heightInches}`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-text-secondary text-xs font-medium">
                {diagonal}" {results.aspectRatio}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Common Screens Reference Table */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <h3 className="text-text-primary font-semibold mb-4">Common Screens</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-text-secondary font-medium py-2 px-3">
                  Screen
                </th>
                <th className="text-right text-text-secondary font-medium py-2 px-3">
                  Width
                </th>
                <th className="text-right text-text-secondary font-medium py-2 px-3">
                  Height
                </th>
                <th className="text-right text-text-secondary font-medium py-2 px-3">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {commonScreens.map((screen, idx) => {
                const parts = screen.ratio.split(':');
                const ratioW = parseFloat(parts[0]);
                const ratioH = parseFloat(parts[1]);
                const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
                const g = gcd(ratioW, ratioH);
                const simplifiedW = ratioW / g;
                const simplifiedH = ratioH / g;
                const aspectFactor = Math.sqrt(
                  simplifiedW * simplifiedW + simplifiedH * simplifiedH
                );
                const d = parseFloat(screen.diagonal);
                const w = ((d * simplifiedW) / aspectFactor).toFixed(1);
                const h = ((d * simplifiedH) / aspectFactor).toFixed(1);

                return (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-white transition-colors last:border-b-0 cursor-pointer"
                    onClick={() => {
                      setDiagonal(screen.diagonal);
                      setAspectRatio(screen.ratio);
                    }}
                  >
                    <td className="text-text-primary font-medium py-2 px-3">
                      {screen.label}
                    </td>
                    <td className="text-right text-text-primary font-mono py-2 px-3">
                      {w}"
                    </td>
                    <td className="text-right text-text-primary font-mono py-2 px-3">
                      {h}"
                    </td>
                    <td className="text-right text-text-muted text-xs py-2 px-3">
                      {screen.type}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-text-muted text-xs mt-3">
          Click any row to load that screen size
        </p>
      </div>

      {/* Conversion Reference */}
      <div className="bg-info bg-opacity-10 border border-info rounded-[12px] p-4 sm:p-6">
        <p className="text-text-secondary text-sm mb-2">
          <span className="font-medium text-info">Conversion:</span> 1 inch = 2.54 cm
        </p>
        <p className="text-text-secondary text-sm">
          Diagonal measurement is the distance from one corner of the screen to the opposite corner.
          Use this calculator when shopping for monitors or TVs to understand actual screen dimensions.
        </p>
      </div>
    </div>
  );
}
