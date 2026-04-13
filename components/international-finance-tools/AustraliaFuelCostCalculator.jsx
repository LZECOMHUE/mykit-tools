'use client';

import { useState, useMemo } from 'react';

// Average fuel prices by state (2025 estimates in AUD per litre)
const FUEL_PRICES_BY_STATE = {
  NSW: 1.65,
  VIC: 1.68,
  QLD: 1.62,
  WA: 1.58,
  SA: 1.71,
  TAS: 1.73,
  ACT: 1.66,
  NT: 1.75,
};

export default function AustraliaFuelCostCalculator() {
  const [tripDistance, setTripDistance] = useState(500);
  const [fuelConsumption, setFuelConsumption] = useState(8.5);
  const [state, setState] = useState('NSW');
  const [customFuelPrice, setCustomFuelPrice] = useState('');

  const results = useMemo(() => {
    const distance = parseFloat(tripDistance) || 0;
    const consumption = parseFloat(fuelConsumption) || 0;
    const statePrice = parseFloat(customFuelPrice) || FUEL_PRICES_BY_STATE[state];

    // Calculate litres needed
    const litresNeeded = (distance / 100) * consumption;

    // Calculate total cost
    const totalCost = litresNeeded * statePrice;

    // Cost per km
    const costPerKm = distance > 0 ? totalCost / distance : 0;

    // CO2 emissions (rough estimate: 2.31kg per litre burned)
    const co2Emissions = litresNeeded * 2.31;

    return {
      distance: distance.toFixed(1),
      consumption: consumption.toFixed(1),
      fuelPrice: statePrice.toFixed(2),
      litresNeeded: litresNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerKm: costPerKm.toFixed(2),
      costPerHour: (distance > 0 ? (totalCost / (distance / 100)) : 0).toFixed(2), // Assuming 100 km/h avg
      co2Emissions: co2Emissions.toFixed(2),
    };
  }, [tripDistance, fuelConsumption, state, customFuelPrice]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4">
      <div className="bg-surface rounded-lg border border-border sm:p-4 space-y-4">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Trip Distance (km)
              </label>
              <input
                type="number"
                value={tripDistance}
                onChange={(e) => setTripDistance(e.target.value)}
                placeholder="Enter distance"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
              <p className="text-text-muted text-sm mt-1">One-way distance</p>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Fuel Consumption (L/100km)
              </label>
              <input
                type="number"
                value={fuelConsumption}
                onChange={(e) => setFuelConsumption(e.target.value)}
                placeholder="Enter consumption"
                step="0.1"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
              <p className="text-text-muted text-sm mt-1">Check your vehicle manual</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                State / Territory
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              >
                {Object.entries(FUEL_PRICES_BY_STATE).map(([stateCode, price]) => (
                  <option key={stateCode} value={stateCode}>
                    {stateCode} - ${price.toFixed(2)}/L
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Custom Fuel Price (optional) (AUD/L)
              </label>
              <input
                type="number"
                value={customFuelPrice}
                onChange={(e) => setCustomFuelPrice(e.target.value)}
                placeholder="Override state price"
                step="0.01"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg border border-border space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Fuel Cost Calculation</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Trip Distance:</span>
              <span className="font-mono font-semibold">
                {results.distance} km
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Fuel Consumption:</span>
              <span className="font-mono font-semibold">
                {results.consumption} L/100km
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Fuel Price:</span>
              <span className="font-mono font-semibold">
                ${results.fuelPrice}/litre
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Litres Needed:</span>
              <span className="font-mono font-semibold">
                {results.litresNeeded} L
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 bg-blue-50 -mx-6 -mb-4 px-6 py-4 rounded-b-lg">
              <span className="text-text-primary font-semibold">Total Fuel Cost:</span>
              <span className="font-mono text-3xl font-semibold text-accent">
                ${results.totalCost}
              </span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-text-secondary text-sm mb-2">Cost per Kilometre</p>
            <p className="text-3xl font-mono font-semibold text-accent">
              ${results.costPerKm}
            </p>
            <p className="text-text-muted text-xs mt-2">
              For budgeting longer trips
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-text-secondary text-sm mb-2">Estimated Emissions</p>
            <p className="text-3xl font-mono font-semibold text-accent">
              {results.co2Emissions} kg
            </p>
            <p className="text-text-muted text-xs mt-2">
              CO2 equivalent
            </p>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-text-primary font-semibold text-lg mb-4">
            Fuel Consumption Guide
          </h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex justify-between">
              <span>Small hatchback:</span>
              <span className="font-mono">5.5 - 7 L/100km</span>
            </div>
            <div className="flex justify-between">
              <span>Mid-size sedan:</span>
              <span className="font-mono">7 - 9 L/100km</span>
            </div>
            <div className="flex justify-between">
              <span>SUV/4WD:</span>
              <span className="font-mono">9 - 12 L/100km</span>
            </div>
            <div className="flex justify-between">
              <span>Truck/Van:</span>
              <span className="font-mono">12 - 15+ L/100km</span>
            </div>
          </div>
        </div>

        {/* Fuel Price Info */}
        <div className="bg-white rounded-lg border border-border">
          <h3 className="text-text-primary font-semibold text-lg mb-4">
            Current State Fuel Prices (2025 estimate)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {Object.entries(FUEL_PRICES_BY_STATE).map(([stateCode, price]) => (
              <div key={stateCode} className="text-center">
                <p className="text-text-secondary font-semibold">{stateCode}</p>
                <p className="font-mono text-text-primary">
                  ${price.toFixed(2)}/L
                </p>
              </div>
            ))}
          </div>
          <p className="text-text-muted text-xs mt-4">
            Prices fluctuate daily. Check local service stations for current rates.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Fuel consumption varies based on driving conditions and style</li>
            <li>Fuel prices update regularly - check current rates</li>
            <li>Highway driving typically uses less fuel than city driving</li>
            <li>Fuel price estimates are from 2025</li>
            <li>CO2 emissions are approximate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
