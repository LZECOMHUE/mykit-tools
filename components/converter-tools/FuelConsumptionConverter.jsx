'use client';
import { useState, useMemo } from 'react';

const CONVERSIONS = {
  'L/100km': 1,
  'km/L': 100,
  'MPG-UK': 235.214,
  'MPG-US': 235.214 / 1.201,
};

const REFERENCE_EFFICIENCIES = [
  { value: 25, unit: 'L/100km', label: 'Average petrol car' },
  { value: 40, unit: 'L/100km', label: 'SUV / large vehicle' },
  { value: 15, unit: 'L/100km', label: 'Performance car' },
  { value: 8, unit: 'L/100km', label: 'Hybrid car (combined)' },
  { value: 5, unit: 'L/100km', label: 'Efficient hybrid / EV' },
  { value: 50, unit: 'L/100km', label: 'City driving (petrol)' },
  { value: 15, unit: 'L/100km', label: 'Motorway driving' },
];

export default function FuelConsumptionConverter() {
  const [inputValue, setInputValue] = useState('25');
  const [inputUnit, setInputUnit] = useState('L/100km');

  const conversions = useMemo(() => {
    const input = parseFloat(inputValue) || 0;
    if (input === 0) return { 'L/100km': '0', 'km/L': '0', 'MPG-UK': '0', 'MPG-US': '0' };

    if (inputUnit === 'L/100km') {
      return {
        'L/100km': input.toFixed(2),
        'km/L': (100 / input).toFixed(2),
        'MPG-UK': (235.214 / input).toFixed(2),
        'MPG-US': (235.214 / input / 1.201).toFixed(2),
      };
    } else if (inputUnit === 'km/L') {
      const liters100km = 100 / input;
      return {
        'L/100km': liters100km.toFixed(2),
        'km/L': input.toFixed(2),
        'MPG-UK': (235.214 / liters100km).toFixed(2),
        'MPG-US': (235.214 / liters100km / 1.201).toFixed(2),
      };
    } else if (inputUnit === 'MPG-UK') {
      const liters100km = 235.214 / input;
      return {
        'L/100km': liters100km.toFixed(2),
        'km/L': (100 / liters100km).toFixed(2),
        'MPG-UK': input.toFixed(2),
        'MPG-US': (input / 1.201).toFixed(2),
      };
    } else {
      // MPG-US
      const liters100km = 235.214 / input / 1.201;
      return {
        'L/100km': liters100km.toFixed(2),
        'km/L': (100 / liters100km).toFixed(2),
        'MPG-UK': (input * 1.201).toFixed(2),
        'MPG-US': input.toFixed(2),
      };
    }
  }, [inputValue, inputUnit]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.toString());
  };

  const units = Object.keys(CONVERSIONS);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-lg border border-border">
      <div className="space-y-6">
        {/* Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">Enter Fuel Consumption</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="25"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
            />
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white min-w-36"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-text-muted">
            Note: MPG-UK (imperial gallon) vs MPG-US (US gallon) are different. UK gallon = 4.546L, US gallon = 3.785L.
          </p>
        </div>

        {/* Efficiency Assessment */}
        {inputValue && parseFloat(inputValue) > 0 && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900 font-medium mb-2">Efficiency Rating</p>
            <div className="space-y-1">
              <p className="text-sm font-mono text-blue-900">
                {conversions['km/L']} km per litre
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (parseFloat(conversions['km/L']) / 20) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-blue-800 mt-2">
                {parseFloat(inputValue) < 10
                  ? 'Excellent fuel efficiency'
                  : parseFloat(inputValue) < 20
                  ? 'Very good fuel efficiency'
                  : parseFloat(inputValue) < 30
                  ? 'Good fuel efficiency'
                  : 'Average fuel efficiency'}
              </p>
            </div>
          </div>
        )}

        {/* All Conversions Grid */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase">All Conversions</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
            {units.map((unit) => (
              <div key={unit} className="p-3 bg-white border border-border rounded-lg">
                <p className="text-xs text-text-secondary mb-1">{unit}</p>
                <div className="flex items-center gap-2">
                  <p className="flex-1 font-mono font-bold text-text-primary">
                    {conversions[unit]}
                  </p>
                  <button
                    onClick={() => copyToClipboard(`${conversions[unit]} ${unit}`)}
                    className="p-1 text-accent hover:text-blue-600 transition-colors"
                  >
                    <span className="text-xs">📋</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reference Efficiencies */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase">Vehicle Efficiency References</p>
          <div className="p-4 bg-white border border-border rounded-lg space-y-3">
            {REFERENCE_EFFICIENCIES.map((ref, idx) => (
              <div key={idx} className="py-2 border-b border-border last:border-0">
                <p className="text-xs text-text-secondary mb-1">{ref.label}</p>
                <p className="font-mono font-medium text-text-primary">
                  {ref.value} L/100km = {(100 / ref.value).toFixed(2)} km/L = {(235.214 / ref.value).toFixed(1)} MPG-UK
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-900 mb-2 font-medium">Fuel Consumption Units</p>
          <ul className="text-xs text-green-900 space-y-1">
            <li>L/100km: Litres per 100 kilometres (Europe, Australia)</li>
            <li>km/L: Kilometres per litre (metric, inverted)</li>
            <li>MPG-UK: Miles per gallon (imperial gallon, 4.546 litres)</li>
            <li>MPG-US: Miles per gallon (US gallon, 3.785 litres)</li>
            <li>Lower L/100km is better. Higher km/L and MPG is better.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
