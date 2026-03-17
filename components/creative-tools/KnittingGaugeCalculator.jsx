'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function KnittingGaugeCalculator() {
  const [patternGaugeStitches, setPatternGaugeStitches] = useState('22');
  const [yourGaugeStitches, setYourGaugeStitches] = useState('20');
  const [patternGaugeRows, setPatternGaugeRows] = useState('30');
  const [yourGaugeRows, setYourGaugeRows] = useState('28');
  const [desiredWidth, setDesiredWidth] = useState('50');
  const [desiredLength, setDesiredLength] = useState('60');
  const [patternStitches, setPatternStitches] = useState('110');
  const [patternRows, setPatternRows] = useState('180');

  const results = useMemo(() => {
    const pGaugeS = parseFloat(patternGaugeStitches) || 0;
    const yGaugeS = parseFloat(yourGaugeStitches) || 0;
    const pGaugeR = parseFloat(patternGaugeRows) || 0;
    const yGaugeR = parseFloat(yourGaugeRows) || 0;
    const width = parseFloat(desiredWidth) || 0;
    const length = parseFloat(desiredLength) || 0;
    const pStitches = parseFloat(patternStitches) || 0;
    const pRows = parseFloat(patternRows) || 0;

    if (pGaugeS <= 0 || yGaugeS <= 0 || pGaugeR <= 0 || yGaugeR <= 0) return null;

    // Calculate adjustment ratios
    const stitchRatio = pGaugeS / yGaugeS;
    const rowRatio = pGaugeR / yGaugeR;

    // Adjust stitches and rows
    const adjustedStitches = pStitches ? Math.round(pStitches * stitchRatio) : Math.round((width / 10) * yGaugeS);
    const adjustedRows = pRows ? Math.round(pRows * rowRatio) : Math.round((length / 10) * yGaugeR);

    // Calculate difference
    const stitchDiff = adjustedStitches - (pStitches || Math.round((width / 10) * pGaugeS));
    const rowDiff = adjustedRows - (pRows || Math.round((length / 10) * pGaugeR));

    // Calculate actual dimensions with your gauge
    const actualWidth = (adjustedStitches / yGaugeS) * 10;
    const actualLength = (adjustedRows / yGaugeR) * 10;

    return {
      originalStitches: pStitches || Math.round((width / 10) * pGaugeS),
      adjustedStitches,
      stitchDiff,
      originalRows: pRows || Math.round((length / 10) * pGaugeR),
      adjustedRows,
      rowDiff,
      actualWidth: parseFloat(actualWidth.toFixed(1)),
      actualLength: parseFloat(actualLength.toFixed(1)),
      gaugeChange: ((yGaugeS / pGaugeS - 1) * 100).toFixed(1),
    };
  }, [patternGaugeStitches, yourGaugeStitches, patternGaugeRows, yourGaugeRows, desiredWidth, desiredLength, patternStitches, patternRows]);

  const handleReset = () => {
    setPatternGaugeStitches('22');
    setYourGaugeStitches('20');
    setPatternGaugeRows('30');
    setYourGaugeRows('28');
    setDesiredWidth('50');
    setDesiredLength('60');
    setPatternStitches('110');
    setPatternRows('180');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Input Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left: Configuration */}
        <Card>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h4 className="text-text-primary text-[13px] font-semibold mb-3">Your Gauge (per 10cm)</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Stitches per 10cm</label>
                  <input
                    type="number"
                    value={yourGaugeStitches}
                    onChange={(e) => setYourGaugeStitches(e.target.value)}
                    step="0.5"
                    min="0"
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>
                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Rows per 10cm</label>
                  <input
                    type="number"
                    value={yourGaugeRows}
                    onChange={(e) => setYourGaugeRows(e.target.value)}
                    step="0.5"
                    min="0"
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-border pb-4">
              <h4 className="text-text-primary text-[13px] font-semibold mb-3">Pattern Gauge (per 10cm)</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Stitches per 10cm</label>
                  <input
                    type="number"
                    value={patternGaugeStitches}
                    onChange={(e) => setPatternGaugeStitches(e.target.value)}
                    step="0.5"
                    min="0"
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>
                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Rows per 10cm</label>
                  <input
                    type="number"
                    value={patternGaugeRows}
                    onChange={(e) => setPatternGaugeRows(e.target.value)}
                    step="0.5"
                    min="0"
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-text-primary text-[13px] font-semibold mb-3">Desired Dimensions</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Width (cm)</label>
                  <input
                    type="number"
                    value={desiredWidth}
                    onChange={(e) => setDesiredWidth(e.target.value)}
                    step="1"
                    min="0"
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>
                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Length (cm)</label>
                  <input
                    type="number"
                    value={desiredLength}
                    onChange={(e) => setDesiredLength(e.target.value)}
                    step="1"
                    min="0"
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="secondary" onClick={handleReset} className="w-full">
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Right: Results */}
        {results && (
          <div className="space-y-4">
            {/* Main adjustment */}
            <Card className="bg-accent-muted border-accent-muted">
              <div className="space-y-4">
                <div>
                  <h3 className="text-text-secondary text-[13px] font-medium mb-1">Cast On (Stitches)</h3>
                  <p className="font-mono text-4xl font-bold text-accent">{results.adjustedStitches}</p>
                  <p className="text-text-muted text-xs mt-1">
                    {results.stitchDiff > 0 ? '+' : ''}{results.stitchDiff} stitches from pattern
                  </p>
                </div>

                <div className="border-t border-accent pt-4">
                  <h3 className="text-text-secondary text-[13px] font-medium mb-1">Rows to Work</h3>
                  <p className="font-mono text-3xl font-bold text-text-primary">{results.adjustedRows}</p>
                  <p className="text-text-muted text-xs mt-1">
                    {results.rowDiff > 0 ? '+' : ''}{results.rowDiff} rows from pattern
                  </p>
                </div>
              </div>
            </Card>

            {/* Actual dimensions & gauge info */}
            <Card>
              <div className="space-y-3">
                <div>
                  <h4 className="text-text-primary text-[13px] font-semibold mb-2">Gauge Difference</h4>
                  <p className="text-text-secondary text-sm">
                    Your gauge is <strong>{results.gaugeChange > 0 ? '+' : ''}{results.gaugeChange}%</strong> different from the pattern.
                  </p>
                </div>

                <div className="bg-surface rounded-[var(--radius-card)] p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Finished Width</span>
                    <span className="font-mono text-text-primary font-semibold">{results.actualWidth} cm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Finished Length</span>
                    <span className="font-mono text-text-primary font-semibold">{results.actualLength} cm</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tip */}
            <Card className="bg-warning/10 border-warning">
              <p className="text-text-secondary text-xs">
                <strong className="text-text-primary">Gauge matters!</strong> Even small differences accumulate over large projects. Always knit a swatch and adjust your needle size to match the pattern gauge.
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Info Section */}
      <Card className="bg-info/10 border-info">
        <div className="space-y-3">
          <p className="font-medium text-text-primary text-sm">How to Use This Calculator</p>
          <ol className="text-text-secondary text-sm space-y-2 list-decimal list-inside">
            <li><strong>Check your gauge:</strong> Knit a swatch in your yarn and measure stitches and rows per 10cm</li>
            <li><strong>Enter your gauge:</strong> Input the stitch and row counts from your swatch</li>
            <li><strong>Enter pattern gauge:</strong> Check your pattern for the recommended gauge</li>
            <li><strong>Get adjusted numbers:</strong> Cast on the adjusted stitch count instead</li>
          </ol>
        </div>
      </Card>
    </div>
  );
}
