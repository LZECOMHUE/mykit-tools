'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Pre-built yardage estimates for projects
const YARDAGE_ESTIMATES = {
  scarf: {
    baby: { lace: 400, fingering: 500, DK: 600, worsted: 700, aran: 800, chunky: 900, 'super-chunky': 1000 },
    child: { lace: 600, fingering: 800, DK: 1000, worsted: 1200, aran: 1400, chunky: 1600, 'super-chunky': 1800 },
    'adult-S': { lace: 800, fingering: 1100, DK: 1400, worsted: 1700, aran: 2000, chunky: 2300, 'super-chunky': 2600 },
    'adult-M': { lace: 1000, fingering: 1300, DK: 1700, worsted: 2100, aran: 2500, chunky: 2900, 'super-chunky': 3300 },
    'adult-L': { lace: 1200, fingering: 1600, DK: 2000, worsted: 2500, aran: 3000, chunky: 3500, 'super-chunky': 4000 },
    'adult-XL': { lace: 1400, fingering: 1900, DK: 2300, worsted: 2800, aran: 3300, chunky: 3800, 'super-chunky': 4300 },
  },
  hat: {
    baby: { lace: 400, fingering: 500, DK: 600, worsted: 700, aran: 800, chunky: 900, 'super-chunky': 1000 },
    child: { lace: 600, fingering: 800, DK: 1000, worsted: 1200, aran: 1400, chunky: 1600, 'super-chunky': 1800 },
    'adult-S': { lace: 800, fingering: 1000, DK: 1200, worsted: 1400, aran: 1600, chunky: 1800, 'super-chunky': 2000 },
    'adult-M': { lace: 900, fingering: 1100, DK: 1300, worsted: 1500, aran: 1700, chunky: 1900, 'super-chunky': 2100 },
    'adult-L': { lace: 1000, fingering: 1200, DK: 1400, worsted: 1600, aran: 1800, chunky: 2000, 'super-chunky': 2200 },
    'adult-XL': { lace: 1100, fingering: 1300, DK: 1500, worsted: 1700, aran: 1900, chunky: 2100, 'super-chunky': 2300 },
  },
  jumper: {
    baby: { lace: 600, fingering: 800, DK: 1000, worsted: 1200, aran: 1400, chunky: 1600, 'super-chunky': 1800 },
    child: { lace: 1000, fingering: 1400, DK: 1800, worsted: 2200, aran: 2600, chunky: 3000, 'super-chunky': 3400 },
    'adult-S': { lace: 1200, fingering: 1700, DK: 2200, worsted: 2700, aran: 3200, chunky: 3700, 'super-chunky': 4200 },
    'adult-M': { lace: 1400, fingering: 2000, DK: 2600, worsted: 3200, aran: 3800, chunky: 4400, 'super-chunky': 5000 },
    'adult-L': { lace: 1600, fingering: 2300, DK: 3000, worsted: 3700, aran: 4400, chunky: 5100, 'super-chunky': 5800 },
    'adult-XL': { lace: 1800, fingering: 2600, DK: 3400, worsted: 4200, aran: 5000, chunky: 5800, 'super-chunky': 6600 },
  },
  blanket: {
    baby: { lace: 1200, fingering: 1600, DK: 2000, worsted: 2400, aran: 2800, chunky: 3200, 'super-chunky': 3600 },
    child: { lace: 2000, fingering: 2800, DK: 3600, worsted: 4400, aran: 5200, chunky: 6000, 'super-chunky': 6800 },
    'adult-S': { lace: 2800, fingering: 3800, DK: 5000, worsted: 6200, aran: 7400, chunky: 8600, 'super-chunky': 9800 },
    'adult-M': { lace: 3200, fingering: 4400, DK: 5800, worsted: 7200, aran: 8600, chunky: 10000, 'super-chunky': 11400 },
    'adult-L': { lace: 3600, fingering: 5000, DK: 6600, worsted: 8200, aran: 9800, chunky: 11400, 'super-chunky': 13000 },
    'adult-XL': { lace: 4000, fingering: 5600, DK: 7400, worsted: 9200, aran: 11000, chunky: 12800, 'super-chunky': 14600 },
  },
  socks: {
    baby: { lace: 200, fingering: 300, DK: 400, worsted: 500, aran: 600, chunky: 700, 'super-chunky': 800 },
    child: { lace: 300, fingering: 400, DK: 500, worsted: 600, aran: 700, chunky: 800, 'super-chunky': 900 },
    'adult-S': { lace: 400, fingering: 500, DK: 600, worsted: 700, aran: 800, chunky: 900, 'super-chunky': 1000 },
    'adult-M': { lace: 450, fingering: 550, DK: 650, worsted: 750, aran: 850, chunky: 950, 'super-chunky': 1050 },
    'adult-L': { lace: 500, fingering: 600, DK: 700, worsted: 800, aran: 900, chunky: 1000, 'super-chunky': 1100 },
    'adult-XL': { lace: 550, fingering: 650, DK: 750, worsted: 850, aran: 950, chunky: 1050, 'super-chunky': 1150 },
  },
  cardigan: {
    baby: { lace: 800, fingering: 1100, DK: 1400, worsted: 1700, aran: 2000, chunky: 2300, 'super-chunky': 2600 },
    child: { lace: 1400, fingering: 1900, DK: 2400, worsted: 2900, aran: 3400, chunky: 3900, 'super-chunky': 4400 },
    'adult-S': { lace: 1800, fingering: 2400, DK: 3000, worsted: 3600, aran: 4200, chunky: 4800, 'super-chunky': 5400 },
    'adult-M': { lace: 2000, fingering: 2700, DK: 3400, worsted: 4100, aran: 4800, chunky: 5500, 'super-chunky': 6200 },
    'adult-L': { lace: 2200, fingering: 3000, DK: 3800, worsted: 4600, aran: 5400, chunky: 6200, 'super-chunky': 7000 },
    'adult-XL': { lace: 2400, fingering: 3300, DK: 4200, worsted: 5100, aran: 6000, chunky: 6900, 'super-chunky': 7800 },
  },
  amigurumi: {
    baby: { lace: 100, fingering: 150, DK: 200, worsted: 250, aran: 300, chunky: 350, 'super-chunky': 400 },
    child: { lace: 200, fingering: 300, DK: 400, worsted: 500, aran: 600, chunky: 700, 'super-chunky': 800 },
    'adult-S': { lace: 300, fingering: 450, DK: 600, worsted: 750, aran: 900, chunky: 1050, 'super-chunky': 1200 },
    'adult-M': { lace: 400, fingering: 600, DK: 800, worsted: 1000, aran: 1200, chunky: 1400, 'super-chunky': 1600 },
    'adult-L': { lace: 500, fingering: 750, DK: 1000, worsted: 1250, aran: 1500, chunky: 1750, 'super-chunky': 2000 },
    'adult-XL': { lace: 600, fingering: 900, DK: 1200, worsted: 1500, aran: 1800, chunky: 2100, 'super-chunky': 2400 },
  },
};

// Average knitting speed in metres per hour
const KNITTING_SPEED = 20; // metres per hour

export default function YarnCostCalculator() {
  const [projectType, setProjectType] = useState('jumper');
  const [size, setSize] = useState('adult-M');
  const [yarnWeight, setYarnWeight] = useState('DK');
  const [pricePerBall, setPricePerBall] = useState('4.50');
  const [ballGrams, setBallGrams] = useState('50');
  const [metresPerBall, setMetresPerBall] = useState('120');
  const [customYardage, setCustomYardage] = useState('');

  const results = useMemo(() => {
    const price = parseFloat(pricePerBall) || 0;
    const grams = parseFloat(ballGrams) || 0;
    const metres = parseFloat(metresPerBall) || 0;
    const customYards = parseFloat(customYardage) || 0;

    if (price <= 0 || grams <= 0 || metres <= 0) return null;

    // Get estimated yardage from lookup table
    const estimatedYardage = customYards || (YARDAGE_ESTIMATES[projectType]?.[size]?.[yarnWeight] || 0);

    if (estimatedYardage <= 0) return null;

    // Calculate balls needed (rounded up + 1 extra)
    const metresNeeded = estimatedYardage;
    const ballsExact = metresNeeded / metres;
    const ballsNeeded = Math.ceil(ballsExact) + 1;

    const totalCost = ballsNeeded * price;
    const totalGrams = ballsNeeded * grams;

    // Calculate time estimate
    const timeHours = metresNeeded / KNITTING_SPEED;
    const timeHoursFull = Math.floor(timeHours);
    const timeMinutes = Math.round((timeHours - timeHoursFull) * 60);

    return {
      estimatedYardage: Math.round(estimatedYardage),
      estimatedGrams: Math.round(estimatedYardage / (metres / grams)),
      ballsExact: parseFloat(ballsExact.toFixed(2)),
      ballsNeeded,
      totalCost: parseFloat(totalCost.toFixed(2)),
      totalGrams: Math.round(totalGrams),
      timeHours: timeHoursFull,
      timeMinutes,
    };
  }, [projectType, size, yarnWeight, pricePerBall, ballGrams, metresPerBall, customYardage]);

  const handleReset = () => {
    setProjectType('jumper');
    setSize('adult-M');
    setYarnWeight('DK');
    setPricePerBall('4.50');
    setBallGrams('50');
    setMetresPerBall('120');
    setCustomYardage('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4 space-y-4">
      {/* Input Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left: Configuration */}
        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-text-primary text-[13px] font-medium mb-2">Project Type</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              >
                <option value="scarf">Scarf</option>
                <option value="hat">Hat</option>
                <option value="jumper">Jumper</option>
                <option value="blanket">Blanket</option>
                <option value="socks">Socks</option>
                <option value="cardigan">Cardigan</option>
                <option value="amigurumi">Amigurumi</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary text-[13px] font-medium mb-2">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              >
                <option value="baby">Baby</option>
                <option value="child">Child</option>
                <option value="adult-S">Adult Small</option>
                <option value="adult-M">Adult Medium</option>
                <option value="adult-L">Adult Large</option>
                <option value="adult-XL">Adult XL</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary text-[13px] font-medium mb-2">Yarn Weight</label>
              <select
                value={yarnWeight}
                onChange={(e) => setYarnWeight(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              >
                <option value="lace">Lace</option>
                <option value="fingering">Fingering</option>
                <option value="DK">DK</option>
                <option value="worsted">Worsted</option>
                <option value="aran">Aran</option>
                <option value="chunky">Chunky</option>
                <option value="super-chunky">Super Chunky</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary text-[13px] font-medium mb-2">Price per Ball (£)</label>
              <input
                type="number"
                value={pricePerBall}
                onChange={(e) => setPricePerBall(e.target.value)}
                placeholder="4.50"
                step="0.01"
                min="0"
                className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-primary text-[13px] font-medium mb-2">Ball Weight (g)</label>
              <input
                type="number"
                value={ballGrams}
                onChange={(e) => setBallGrams(e.target.value)}
                placeholder="50"
                step="1"
                min="0"
                className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-primary text-[13px] font-medium mb-2">Metres per Ball</label>
              <input
                type="number"
                value={metresPerBall}
                onChange={(e) => setMetresPerBall(e.target.value)}
                placeholder="120"
                step="5"
                min="0"
                className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-primary text-[13px] font-medium mb-2">Custom Yardage (optional)</label>
              <input
                type="number"
                value={customYardage}
                onChange={(e) => setCustomYardage(e.target.value)}
                placeholder="Leave blank for estimate"
                step="10"
                min="0"
                className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div className="pt-2">
              <Button variant="secondary" onClick={handleReset} className="w-full">
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Right: Hero Results */}
        {results && (
          <Card className="bg-accent-muted border-accent-muted">
            <div className="space-y-4">
              <div>
                <h3 className="text-text-secondary text-[13px] font-medium mb-1">Estimated Cost</h3>
                <p className="font-mono text-4xl font-bold text-accent">
                  £{results.totalCost.toFixed(2)}
                </p>
              </div>

              <div>
                <h3 className="text-text-secondary text-[13px] font-medium mb-1">Time to Knit</h3>
                <p className="font-mono text-3xl font-bold text-text-primary">
                  {results.timeHours} hours {results.timeMinutes}m
                </p>
              </div>

              <div className="bg-white rounded-[var(--radius-card)] p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Yarn Needed</span>
                  <span className="font-mono text-text-primary font-semibold">
                    {results.estimatedYardage} m ({results.estimatedGrams} g)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Balls to Buy</span>
                  <span className="font-mono text-text-primary font-semibold">
                    {results.ballsNeeded}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-text-secondary text-sm">Price per Ball</span>
                  <span className="font-mono text-text-primary font-semibold">
                    £{(results.totalCost / results.ballsNeeded).toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-text-secondary text-xs leading-relaxed">
                Your {projectType} will cost approximately <strong>£{results.totalCost.toFixed(2)}</strong> in yarn and take roughly <strong>{results.timeHours} hours {results.timeMinutes > 0 ? `${results.timeMinutes} minutes` : ''}</strong> at an average knitting pace.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Info Section */}
      <details className="text-xs text-text-muted mt-2">
        <summary className="cursor-pointer hover:text-text-secondary">About this calculator</summary>
        <div className="mt-2 space-y-1">
          <ul className="space-y-1 list-disc list-inside">
            <li>Yardage estimates are pre-built for common projects and sizes</li>
            <li>We add 1 extra ball to account for gauge swatches and mistakes</li>
            <li>Time estimates assume an average knitting speed of 20 metres per hour</li>
            <li>Override yardage with your pattern's requirements for accuracy</li>
          </ul>
        </div>
      </details>
    </div>
  );
}
