'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

// Reference table for yarn weights
const YARN_WEIGHTS = [
  {
    name: 'Lace',
    wrapsPerInch: '32+',
    recommendedNeedle: '1-3 mm (US 000-1)',
    recommendedHook: '1-2 mm',
    typicalGauge: '32+ stitches per 10cm',
    description: 'Extremely fine, delicate lace weight yarn'
  },
  {
    name: 'Fingering / Superwash',
    wrapsPerInch: '28-32',
    recommendedNeedle: '2-3 mm (US 1-3)',
    recommendedHook: '2-2.5 mm',
    typicalGauge: '28-32 stitches per 10cm',
    description: 'Fine yarn perfect for socks, shawls, and delicate garments'
  },
  {
    name: 'Fine / Sport',
    wrapsPerInch: '22-26',
    recommendedNeedle: '3-4 mm (US 3-6)',
    recommendedHook: '2.5-3.5 mm',
    typicalGauge: '22-26 stitches per 10cm',
    description: 'Lightweight yarn ideal for layering pieces and baby garments'
  },
  {
    name: 'Light / DK (Double Knit)',
    wrapsPerInch: '18-22',
    recommendedNeedle: '3.75-4.5 mm (US 5-7)',
    recommendedHook: '3.5-4.5 mm',
    typicalGauge: '18-22 stitches per 10cm',
    description: 'Versatile mid-weight yarn, excellent for sweaters and blankets'
  },
  {
    name: 'Medium / Worsted',
    wrapsPerInch: '16-20',
    recommendedNeedle: '4.5-5.5 mm (US 7-9)',
    recommendedHook: '4.5-5.5 mm',
    typicalGauge: '16-20 stitches per 10cm',
    description: 'Popular all-purpose yarn, great for scarves and medium projects'
  },
  {
    name: 'Bulky / Chunky',
    wrapsPerInch: '12-16',
    recommendedNeedle: '5.5-8 mm (US 9-11)',
    recommendedHook: '5.5-6.5 mm',
    typicalGauge: '12-16 stitches per 10cm',
    description: 'Heavy yarn that works up quickly, perfect for cosy blankets'
  },
  {
    name: 'Super Bulky',
    wrapsPerInch: '6-12',
    recommendedNeedle: '8-12.75 mm (US 11-17)',
    recommendedHook: '6.5 mm+',
    typicalGauge: '6-12 stitches per 10cm',
    description: 'Very thick yarn for fast projects and textured pieces'
  },
];

export default function YarnWeightConverter() {
  const [selectedWeight, setSelectedWeight] = useState(0);
  const yarn = YARN_WEIGHTS[selectedWeight];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Selector */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-text-primary font-semibold">Select Yarn Weight</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {YARN_WEIGHTS.map((weight, idx) => (
              <button
                key={weight.name}
                onClick={() => setSelectedWeight(idx)}
                className={`p-3 rounded-[var(--radius-card)] border-2 transition-all text-left ${
                  selectedWeight === idx
                    ? 'border-accent bg-accent-muted'
                    : 'border-border bg-white hover:border-accent/50'
                }`}
              >
                <p className="font-medium text-text-primary text-sm">{weight.name}</p>
                <p className="text-text-muted text-xs mt-1">{weight.wrapsPerInch} WPI</p>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        {/* Left: Quick specs */}
        <Card>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <p className="text-text-secondary text-[13px] font-medium mb-2">Wraps Per Inch</p>
              <p className="font-mono text-2xl font-bold text-text-primary">{yarn.wrapsPerInch}</p>
            </div>

            <div className="border-b border-border pb-4">
              <p className="text-text-secondary text-[13px] font-medium mb-2">Needle Size</p>
              <p className="text-text-primary text-sm font-medium">{yarn.recommendedNeedle}</p>
            </div>

            <div className="border-b border-border pb-4">
              <p className="text-text-secondary text-[13px] font-medium mb-2">Hook Size</p>
              <p className="text-text-primary text-sm font-medium">{yarn.recommendedHook}</p>
            </div>

            <div>
              <p className="text-text-secondary text-[13px] font-medium mb-2">Typical Gauge</p>
              <p className="text-text-primary text-sm font-medium">{yarn.typicalGauge}</p>
            </div>
          </div>
        </Card>

        {/* Right: Full description and context */}
        <Card className="bg-accent-muted">
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">{yarn.name}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{yarn.description}</p>
            </div>

            <div className="bg-white rounded-[var(--radius-card)] p-4 space-y-3">
              <div>
                <p className="text-text-secondary text-[13px] font-medium mb-1">Wraps Per Inch (WPI)</p>
                <p className="text-text-primary text-sm">
                  The number of times a yarn wraps around a ruler in one inch. Higher WPI means finer yarn. Use this as a quick reference if you don't have official specs.
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-[13px] font-medium mb-1">Needle & Hook Sizes</p>
                <p className="text-text-primary text-sm">
                  These are starting recommendations. Always check your pattern and knit a gauge swatch to find the right size for your project.
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-[13px] font-medium mb-1">Gauge</p>
                <p className="text-text-primary text-sm">
                  The number of stitches and rows per 10cm. Lighter yarns create more stitches in the same space, heavier yarns create fewer.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-text-primary font-semibold">Quick Reference Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-text-primary font-semibold">Weight</th>
                  <th className="text-left py-2 px-3 text-text-primary font-semibold">WPI</th>
                  <th className="text-left py-2 px-3 text-text-primary font-semibold">Gauge (per 10cm)</th>
                  <th className="text-left py-2 px-3 text-text-primary font-semibold">Needle (mm)</th>
                </tr>
              </thead>
              <tbody>
                {YARN_WEIGHTS.map((weight, idx) => (
                  <tr
                    key={weight.name}
                    className={`border-b border-border ${selectedWeight === idx ? 'bg-accent/10' : ''}`}
                  >
                    <td className="py-3 px-3 text-text-primary font-medium">{weight.name}</td>
                    <td className="py-3 px-3 font-mono text-text-secondary">{weight.wrapsPerInch}</td>
                    <td className="py-3 px-3 font-mono text-text-secondary">{weight.typicalGauge}</td>
                    <td className="py-3 px-3 font-mono text-text-secondary">
                      {weight.recommendedNeedle.split(' ')[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Info */}
      <Card className="bg-info/10 border-info">
        <div className="space-y-3">
          <p className="font-medium text-text-primary text-sm">About Yarn Weights</p>
          <p className="text-text-secondary text-sm leading-relaxed">
            Yarn weight determines how thick the yarn is and how many stitches you'll knit per 10cm. Heavier yarns create quick projects, while lighter yarns are perfect for intricate stitch patterns and fitted garments. Always check your pattern for specific gauge and needle size recommendations.
          </p>
        </div>
      </Card>
    </div>
  );
}
