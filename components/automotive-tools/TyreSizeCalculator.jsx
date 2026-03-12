'use client';

import { useState, useMemo } from 'react';

export default function TyreSizeCalculator() {
  const [width1, setWidth1] = useState('205');
  const [aspect1, setAspect1] = useState('55');
  const [diameter1, setDiameter1] = useState('16');
  const [width2, setWidth2] = useState('225');
  const [aspect2, setAspect2] = useState('50');
  const [diameter2, setDiameter2] = useState('17');

  const calculateDimensions = (width, aspect, diameter) => {
    const w = parseFloat(width) || 0;
    const a = parseFloat(aspect) || 0;
    const d = parseFloat(diameter) || 0;

    if (!w || !a || !d) return null;

    const sidewallHeight = (w * a) / 100;
    const overallDiameter = d * 25.4 + (sidewallHeight * 2) / 10;
    const circumference = Math.PI * overallDiameter;
    const speedometerError = ((overallDiameter - (d * 25.4 + 2 * (w * a) / 1000)) / (d * 25.4 + 2 * (w * a) / 1000)) * 100;

    return {
      width: w.toFixed(1),
      sidewallHeight: sidewallHeight.toFixed(1),
      diameter: overallDiameter.toFixed(1),
      circumference: circumference.toFixed(2),
      speedometerError: speedometerError.toFixed(2),
    };
  };

  const dims1 = useMemo(() => calculateDimensions(width1, aspect1, diameter1), [width1, aspect1, diameter1]);
  const dims2 = useMemo(() => calculateDimensions(width2, aspect2, diameter2), [width2, aspect2, diameter2]);

  const speedometerDifference = useMemo(() => {
    if (!dims1 || !dims2) return null;
    const diff = parseFloat(dims2.speedometerError) - parseFloat(dims1.speedometerError);
    return diff.toFixed(2);
  }, [dims1, dims2]);

  const commonSizes = [
    { width: 165, aspect: 65, diameter: 13, name: 'Small Car' },
    { width: 175, aspect: 65, diameter: 14, name: 'Compact' },
    { width: 185, aspect: 70, diameter: 14, name: 'Economy' },
    { width: 195, aspect: 65, diameter: 15, name: 'Mid-size' },
    { width: 205, aspect: 60, diameter: 16, name: 'Standard' },
    { width: 215, aspect: 55, diameter: 17, name: 'Performance' },
    { width: 225, aspect: 45, diameter: 18, name: 'Sports' },
    { width: 245, aspect: 35, diameter: 20, name: 'SUV' },
  ];

  const TyreInfo = ({ width, aspect, diameter, dims, label }) => {
    if (!dims) return null;

    return (
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-text-primary">{label}</h3>
        <div className="text-center mb-4">
          <p className="font-mono-num text-3xl font-bold text-accent">{width}/{aspect}R{diameter}</p>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Tyre Width', value: `${dims.width} mm` },
            { label: 'Sidewall Height', value: `${dims.sidewallHeight} mm` },
            { label: 'Overall Diameter', value: `${dims.diameter} cm` },
            { label: 'Circumference', value: `${dims.circumference} cm` },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <span className="text-text-secondary">{item.label}</span>
              <span className="font-mono-num font-semibold text-text-primary">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Input Section */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-text-primary">Compare Tyre Sizes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tyre 1 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">Tyre Size 1</h3>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Width (mm)
              </label>
              <input
                type="number"
                value={width1}
                onChange={(e) => setWidth1(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Aspect Ratio (%)
              </label>
              <input
                type="number"
                value={aspect1}
                onChange={(e) => setAspect1(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Rim Diameter (inches)
              </label>
              <input
                type="number"
                value={diameter1}
                onChange={(e) => setDiameter1(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
          </div>

          {/* Tyre 2 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">Tyre Size 2</h3>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Width (mm)
              </label>
              <input
                type="number"
                value={width2}
                onChange={(e) => setWidth2(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Aspect Ratio (%)
              </label>
              <input
                type="number"
                value={aspect2}
                onChange={(e) => setAspect2(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Rim Diameter (inches)
              </label>
              <input
                type="number"
                value={diameter2}
                onChange={(e) => setDiameter2(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TyreInfo width={width1} aspect={aspect1} diameter={diameter1} dims={dims1} label="Tyre Size 1 Details" />
        <TyreInfo width={width2} aspect={aspect2} diameter={diameter2} dims={dims2} label="Tyre Size 2 Details" />
      </div>

      {/* Comparison */}
      {dims1 && dims2 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-text-primary">Size Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Diameter Difference',
                value: `${(parseFloat(dims2.diameter) - parseFloat(dims1.diameter)).toFixed(1)} cm`,
                desc: 'Tyre 2 vs Tyre 1',
              },
              {
                label: 'Circumference Difference',
                value: `${(parseFloat(dims2.circumference) - parseFloat(dims1.circumference)).toFixed(2)} cm`,
                desc: 'Per revolution',
              },
              {
                label: 'Speedometer Error',
                value: `${speedometerDifference}%`,
                desc: 'Speed reading difference',
              },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-text-muted text-sm mb-1">{item.label}</p>
                <p className="font-mono-num font-bold text-text-primary text-2xl">{item.value}</p>
                <p className="text-text-secondary text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Sizes */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">Common Tyre Sizes</h3>
        <div className="space-y-2">
          {commonSizes.map((size) => (
            <button
              key={`${size.width}/${size.aspect}R${size.diameter}`}
              onClick={() => {
                setWidth1(size.width.toString());
                setAspect1(size.aspect.toString());
                setDiameter1(size.diameter.toString());
              }}
              className="w-full text-left px-4 py-3 hover:bg-white rounded-lg transition-colors flex justify-between items-center"
            >
              <span className="text-text-secondary">{size.name}</span>
              <span className="font-mono-num font-semibold text-text-primary">
                {size.width}/{size.aspect}R{size.diameter}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Understanding Tyre Sizes</h3>
        <div className="space-y-2 text-text-secondary text-sm">
          <p>
            <strong>Width:</strong> First three digits (e.g., 205) — tyre width in millimetres
          </p>
          <p>
            <strong>Aspect Ratio:</strong> Two digits (e.g., 55) — sidewall height as a percentage of width
          </p>
          <p>
            <strong>Rim Diameter:</strong> Last two digits (e.g., 16) — wheel rim diameter in inches
          </p>
          <p>
            <strong>Example:</strong> 205/55R16 = 205mm wide, 55% aspect ratio, 16-inch rim
          </p>
        </div>
      </div>
    </div>
  );
}
