'use client';

import { useState, useMemo } from 'react';

const shapes = {
  cube: {
    name: 'Cube',
    inputs: [{ label: 'Side length (cm)', key: 'side' }],
    formula: 'V = a³',
    calculate: (values) => Math.pow(values.side, 3),
  },
  rectangular_prism: {
    name: 'Rectangular Prism',
    inputs: [
      { label: 'Length (cm)', key: 'length' },
      { label: 'Width (cm)', key: 'width' },
      { label: 'Height (cm)', key: 'height' },
    ],
    formula: 'V = l × w × h',
    calculate: (values) => values.length * values.width * values.height,
  },
  sphere: {
    name: 'Sphere',
    inputs: [{ label: 'Radius (cm)', key: 'radius' }],
    formula: 'V = (4/3)πr³',
    calculate: (values) => (4 / 3) * Math.PI * Math.pow(values.radius, 3),
  },
  cylinder: {
    name: 'Cylinder',
    inputs: [
      { label: 'Radius (cm)', key: 'radius' },
      { label: 'Height (cm)', key: 'height' },
    ],
    formula: 'V = πr²h',
    calculate: (values) => Math.PI * Math.pow(values.radius, 2) * values.height,
  },
  cone: {
    name: 'Cone',
    inputs: [
      { label: 'Radius (cm)', key: 'radius' },
      { label: 'Height (cm)', key: 'height' },
    ],
    formula: 'V = (1/3)πr²h',
    calculate: (values) => (1 / 3) * Math.PI * Math.pow(values.radius, 2) * values.height,
  },
  pyramid: {
    name: 'Pyramid',
    inputs: [
      { label: 'Base area (cm²)', key: 'baseArea' },
      { label: 'Height (cm)', key: 'height' },
    ],
    formula: 'V = (1/3) × base area × h',
    calculate: (values) => (1 / 3) * values.baseArea * values.height,
  },
};

export default function VolumeCalculator() {
  const [shape, setShape] = useState('cube');
  const [values, setValues] = useState({
    side: 10,
    length: 10,
    width: 10,
    height: 10,
    radius: 10,
    baseArea: 100,
  });

  const currentShape = shapes[shape];

  const result = useMemo(() => {
    const cm3 = currentShape.calculate(values);
    return {
      cm3: cm3,
      m3: cm3 / 1000000,
      liters: cm3 / 1000,
    };
  }, [shape, values]);

  const handleInputChange = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: parseFloat(val) || 0,
    }));
  };

  const handleReset = () => {
    setValues({
      side: 10,
      length: 10,
      width: 10,
      height: 10,
      radius: 10,
      baseArea: 100,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="space-y-2">
        <label className="block text-text-primary font-medium">Shape Type</label>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          {Object.entries(shapes).map(([key, val]) => (
            <option key={key} value={key}>
              {val.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-surface p-4 rounded-[var(--radius-card)] space-y-3">
        {currentShape.inputs.map((input) => (
          <div key={input.key}>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              {input.label}
            </label>
            <input
              type="number"
              value={values[input.key]}
              onChange={(e) => handleInputChange(input.key, e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)]">
        <p className="text-text-secondary text-sm font-mono">
          Formula: {currentShape.formula}
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-surface p-4 rounded-[var(--radius-card)] space-y-2">
          <p className="text-text-secondary text-sm">Cubic Centimeters</p>
          <p className="text-2xl font-mono font-semibold text-text-primary">
            {result.cm3.toFixed(2)} cm³
          </p>
        </div>
        <div className="bg-surface p-4 rounded-[var(--radius-card)] space-y-2">
          <p className="text-text-secondary text-sm">Cubic Meters</p>
          <p className="text-2xl font-mono font-semibold text-text-primary">
            {result.m3.toFixed(6)} m³
          </p>
        </div>
        <div className="bg-surface p-4 rounded-[var(--radius-card)] space-y-2">
          <p className="text-text-secondary text-sm">Liters</p>
          <p className="text-2xl font-mono font-semibold text-text-primary">
            {result.liters.toFixed(2)} L
          </p>
        </div>
      </div>

      <button
        onClick={handleReset}
        className="w-full px-4 py-2 bg-white border border-border text-text-primary font-medium rounded-[var(--radius-input)] hover:bg-surface transition"
      >
        Reset
      </button>
    </div>
  );
}
