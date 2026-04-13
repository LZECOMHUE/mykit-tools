'use client';

import { useState } from 'react';

export default function FilamentComparison() {
  const [selectedMaterials, setSelectedMaterials] = useState(['PLA', 'ABS', 'PETG']);

  const filamentData = {
    PLA: {
      costPerKg: 18,
      printTemp: '190-220',
      bedTemp: '20-60',
      strength: 3,
      flexibility: 1,
      easePrinting: 5,
      uvResistance: 'Low',
      bestUses: 'Miniatures, prototypes, decorative items, beginner projects',
      pros: ['Easy to print', 'Wide color range', 'Affordable', 'Low odor', 'Good detail'],
      cons: ['Not food-safe', 'Limited strength', 'Can warp slightly', 'Moderate UV sensitivity'],
    },
    ABS: {
      costPerKg: 20,
      printTemp: '230-250',
      bedTemp: '80-110',
      strength: 4,
      flexibility: 2,
      easePrinting: 2,
      uvResistance: 'Moderate',
      bestUses: 'Functional parts, enclosures, high-stress items',
      pros: ['High strength', 'Good temperature resistance', 'Industrial standard', 'Durable'],
      cons: ['Difficult to print', 'Strong odor', 'Requires heated bed', 'Prone to warping'],
    },
    PETG: {
      costPerKg: 22,
      printTemp: '225-250',
      bedTemp: '70-90',
      strength: 4,
      flexibility: 2,
      easePrinting: 4,
      uvResistance: 'Good',
      bestUses: 'Functional parts, durable items, outdoor use',
      pros: ['Good strength', 'Easy to print', 'Food-contact possible', 'UV resistant', 'Low warping'],
      cons: ['More expensive', 'Can string', 'Less color variety'],
    },
    TPU: {
      costPerKg: 28,
      printTemp: '220-245',
      bedTemp: '60-80',
      strength: 2,
      flexibility: 5,
      easePrinting: 2,
      uvResistance: 'Moderate',
      bestUses: 'Flexible parts, phone cases, seals, gaskets',
      pros: ['Flexible and durable', 'Good impact resistance', 'Elastic', 'Waterproof'],
      cons: ['Slow print speed', 'Difficult to print', 'More expensive', 'Can be sticky'],
    },
    Nylon: {
      costPerKg: 35,
      printTemp: '250-260',
      bedTemp: '80-100',
      strength: 5,
      flexibility: 3,
      easePrinting: 1,
      uvResistance: 'Excellent',
      bestUses: 'High-strength functional parts, gears, hinges',
      pros: ['Excellent strength', 'Very durable', 'UV resistant', 'Flexible', 'Chemical resistant'],
      cons: ['Very difficult to print', 'Expensive', 'Requires heated chamber', 'Absorbs moisture'],
    },
    ASA: {
      costPerKg: 25,
      printTemp: '240-260',
      bedTemp: '100-120',
      strength: 4,
      flexibility: 2,
      easePrinting: 2,
      uvResistance: 'Excellent',
      bestUses: 'Outdoor items, weather-resistant parts, signage',
      pros: ['Excellent UV resistance', 'High strength', 'Weather resistant', 'Good finish'],
      cons: ['Difficult to print', 'Requires heated chamber', 'Strong odor', 'Expensive'],
    },
  };

  const allMaterials = Object.keys(filamentData);

  const toggleMaterial = (material) => {
    setSelectedMaterials((prev) => {
      if (prev.includes(material)) {
        return prev.filter((m) => m !== material);
      } else {
        return [...prev, material];
      }
    });
  };

  const RatingBar = ({ value, max = 5 }) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden border border-border">
        <div
          className="h-full bg-accent"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className="text-[13px] font-mono text-text-secondary w-6">{value}/{max}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Material Selector */}
      <div>
        <p className="text-[13px] font-medium text-text-primary mb-3">Select Materials to Compare</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {allMaterials.map((material) => (
            <button
              key={material}
              onClick={() => toggleMaterial(material)}
              className={`px-3 py-2 text-[13px] font-medium rounded-[var(--radius-input)] border transition ${
                selectedMaterials.includes(material)
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-text-primary border-border hover:border-accent'
              }`}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {selectedMaterials.map((material) => {
          const data = filamentData[material];
          return (
            <div
              key={material}
              className="border border-border rounded-[var(--radius-card)] overflow-hidden bg-white"
            >
              {/* Header */}
              <div className="bg-accent-muted border-b border-border p-4">
                <h3 className="font-heading font-bold text-lg text-text-primary">{material}</h3>
                <p className="font-mono text-2xl font-bold text-accent mt-1">£{data.costPerKg}/kg</p>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Temperatures */}
                <div>
                  <p className="text-[13px] font-medium text-text-primary mb-2">Print Settings</p>
                  <div className="space-y-2 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Nozzle Temp:</span>
                      <span className="font-mono text-text-primary">{data.printTemp}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Bed Temp:</span>
                      <span className="font-mono text-text-primary">{data.bedTemp}°C</span>
                    </div>
                  </div>
                </div>

                {/* Properties */}
                <div>
                  <p className="text-[13px] font-medium text-text-primary mb-3">Properties</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[13px] text-text-secondary block mb-1">Strength</label>
                      <RatingBar value={data.strength} />
                    </div>
                    <div>
                      <label className="text-[13px] text-text-secondary block mb-1">Flexibility</label>
                      <RatingBar value={data.flexibility} />
                    </div>
                    <div>
                      <label className="text-[13px] text-text-secondary block mb-1">Ease of Printing</label>
                      <RatingBar value={data.easePrinting} />
                    </div>
                  </div>
                </div>

                {/* UV Resistance */}
                <div className="bg-surface rounded-[var(--radius-input)] p-2">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-text-secondary">UV Resistance:</span>
                    <span className="font-medium text-text-primary">{data.uvResistance}</span>
                  </div>
                </div>

                {/* Best Uses */}
                <div>
                  <p className="text-[13px] font-medium text-text-primary mb-1">Best Uses</p>
                  <p className="text-[13px] text-text-secondary">{data.bestUses}</p>
                </div>

                {/* Pros */}
                <div>
                  <p className="text-[13px] font-medium text-text-primary mb-2">Pros</p>
                  <ul className="space-y-1">
                    {data.pros.map((pro, idx) => (
                      <li key={idx} className="flex gap-2 text-[13px] text-text-secondary">
                        <span className="text-green-600 font-bold">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <p className="text-[13px] font-medium text-text-primary mb-2">Cons</p>
                  <ul className="space-y-1">
                    {data.cons.map((con, idx) => (
                      <li key={idx} className="flex gap-2 text-[13px] text-text-secondary">
                        <span className="text-red-600 font-bold">-</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedMaterials.length === 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] text-center">
          <p className="text-text-secondary text-[13px]">Select at least one material to compare</p>
        </div>
      )}

      {/* Comparison Table */}
      {selectedMaterials.length > 1 && (
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-text-primary">Property</th>
                {selectedMaterials.map((material) => (
                  <th key={material} className="text-center px-4 py-2 font-medium text-text-primary">
                    {material}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2 text-text-secondary">Cost per kg</td>
                {selectedMaterials.map((material) => (
                  <td key={material} className="text-center px-4 py-2 font-mono text-text-primary">
                    £{filamentData[material].costPerKg}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-2 text-text-secondary">Strength</td>
                {selectedMaterials.map((material) => (
                  <td key={material} className="text-center px-4 py-2 font-mono text-text-primary">
                    {filamentData[material].strength}/5
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-2 text-text-secondary">Flexibility</td>
                {selectedMaterials.map((material) => (
                  <td key={material} className="text-center px-4 py-2 font-mono text-text-primary">
                    {filamentData[material].flexibility}/5
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-2 text-text-secondary">Ease of Printing</td>
                {selectedMaterials.map((material) => (
                  <td key={material} className="text-center px-4 py-2 font-mono text-text-primary">
                    {filamentData[material].easePrinting}/5
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-2 text-text-secondary">UV Resistance</td>
                {selectedMaterials.map((material) => (
                  <td key={material} className="text-center px-4 py-2 text-text-primary">
                    {filamentData[material].uvResistance}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
