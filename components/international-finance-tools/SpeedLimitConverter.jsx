'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const COMMON_SPEEDS = [
  { kmh: 30, mph: 19, context: 'School zones / residential areas' },
  { kmh: 50, mph: 31, context: 'Urban / city centres (Europe)' },
  { kmh: 80, mph: 50, context: 'Rural roads (metric countries)' },
  { kmh: 100, mph: 62, context: 'Highways (many metric countries)' },
  { kmh: 110, mph: 68, context: 'Highways (Australia, France, Spain)' },
  { kmh: 120, mph: 75, context: 'Motorways (EU countries)' },
  { kmh: 130, mph: 81, context: 'Motorways (Germany advisory, Italy, Austria)' },
  { kmh: 140, mph: 87, context: 'High-speed motorways' },
];

export default function SpeedLimitConverter() {
  const [inputSpeed, setInputSpeed] = useState('100');
  const [inputUnit, setInputUnit] = useState('kmh');
  const [result, setResult] = useState(null);

  const UNIT_OPTIONS = [
    { value: 'kmh', label: 'Kilometres per Hour (km/h)' },
    { value: 'mph', label: 'Miles per Hour (mph)' },
  ];

  function convert() {
    const speed = parseFloat(inputSpeed) || 0;
    let kmh, mph;

    if (inputUnit === 'kmh') {
      kmh = speed;
      mph = (speed / 1.60934).toFixed(1);
    } else {
      mph = speed;
      kmh = (speed * 1.60934).toFixed(1);
    }

    setResult({
      inputUnit,
      inputSpeed: speed,
      kmh: parseFloat(kmh),
      mph: parseFloat(mph),
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-2">
          Speed Limit Converter
        </h2>
        <p className="text-secondary text-sm mb-6">
          Convert between kilometres per hour and miles per hour
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Speed Unit
            </label>
            <Select
              options={UNIT_OPTIONS}
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Enter Speed
            </label>
            <div className="relative">
              <Input
                type="number"
                value={inputSpeed}
                onChange={(e) => setInputSpeed(e.target.value)}
                placeholder="Enter speed"
                min="0"
                step="1"
              />
              <span className="absolute right-3 top-3 text-secondary font-mono">
                {inputUnit === 'kmh' ? 'km/h' : 'mph'}
              </span>
            </div>
          </div>

          <Button onClick={convert} className="w-full mt-6">
            Convert
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Quick Conversion Result */}
          <Card className="p-6 bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Conversion Result
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-r-2 border-border pr-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="font-mono text-4xl font-bold text-primary">
                    {result.kmh}
                  </p>
                  <p className="font-mono text-lg font-bold text-secondary">km/h</p>
                </div>
                <p className="text-secondary text-sm">Kilometres per Hour</p>
              </div>

              <div className="pl-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="font-mono text-4xl font-bold text-accent">
                    {result.mph}
                  </p>
                  <p className="font-mono text-lg font-bold text-secondary">mph</p>
                </div>
                <p className="text-secondary text-sm">Miles per Hour</p>
              </div>
            </div>
          </Card>

          {/* Road Sign Visual */}
          <Card className="p-6">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Road Sign Comparison
            </h3>

            <div className="grid grid-cols-2 gap-8">
              {/* Metric Sign (Europe) */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-4 border-red-600 bg-white flex items-center justify-center mb-4 shadow-lg">
                  <div className="text-center">
                    <p className="font-mono text-3xl font-bold text-primary">
                      {Math.round(result.kmh)}
                    </p>
                    <p className="text-xs font-bold text-secondary">km/h</p>
                  </div>
                </div>
                <p className="text-center text-sm text-secondary font-medium">
                  Metric (Europe, Asia, Australia)
                </p>
              </div>

              {/* Imperial Sign (US/UK) */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 border-4 border-black bg-white flex items-center justify-center mb-4 shadow-lg">
                  <div className="text-center">
                    <p className="font-mono text-3xl font-bold text-primary">
                      {Math.round(result.mph)}
                    </p>
                    <p className="text-xs font-bold text-secondary">mph</p>
                  </div>
                </div>
                <p className="text-center text-sm text-secondary font-medium">
                  Imperial (US, UK)
                </p>
              </div>
            </div>

            <p className="text-xs text-secondary mt-6 p-3 bg-surface rounded border border-border text-center">
              Note: Actual road signs vary by country. This is a simplified representation.
            </p>
          </Card>

          {/* Common Speed Limits Reference */}
          <Card className="p-6">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Common Speed Limits Worldwide
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-3 font-bold text-primary">Context</th>
                    <th className="text-center py-3 px-3 font-bold text-primary">km/h</th>
                    <th className="text-center py-3 px-3 font-bold text-primary">mph</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMON_SPEEDS.map((speed, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-border ${
                        Math.round(result.kmh) === speed.kmh
                          ? 'bg-accent-muted border-l-4 border-l-accent'
                          : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-primary">{speed.context}</td>
                      <td className="text-center py-3 px-3 font-mono font-bold">
                        {speed.kmh}
                      </td>
                      <td className="text-center py-3 px-3 font-mono font-bold">
                        {speed.mph}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Geographic Information */}
          <Card className="p-6 bg-blue-50 border-2 border-blue-200">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Which System Uses Which Unit?
            </h3>

            <div className="space-y-4">
              <div>
                <p className="font-bold text-primary mb-2">Metric (km/h):</p>
                <p className="text-secondary text-sm">
                  Australia, Canada, Europe, India, Japan, Mexico, New Zealand, Singapore, South
                  Korea, most of the world
                </p>
              </div>

              <div>
                <p className="font-bold text-primary mb-2">Imperial (mph):</p>
                <p className="text-secondary text-sm">
                  United States, United Kingdom, Bahamas, Belize, Cayman Islands, Myanmar, Turks and
                  Caicos Islands
                </p>
              </div>

              <div className="mt-4 p-3 bg-white rounded border border-blue-200">
                <p className="text-sm text-secondary">
                  When driving internationally, always check local speed limits before you drive.
                  Speeding fines can be substantial, especially in Europe.
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="p-6">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Quick Conversion Tips
            </h3>

            <ul className="space-y-2 text-sm text-secondary list-disc list-inside">
              <li>
                <strong>Quick estimate:</strong> Divide km/h by 1.6 to get mph (not exact, but close)
              </li>
              <li>
                <strong>Another method:</strong> km/h x 0.625 = mph (multiply by 5/8)
              </li>
              <li>
                <strong>For mph to km/h:</strong> Multiply by 1.6 or multiply by 8/5
              </li>
              <li>
                <strong>Exact conversion:</strong> 1 km/h = 0.621371 mph (precise)
              </li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
