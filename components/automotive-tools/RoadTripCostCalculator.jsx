'use client';

import { useState, useMemo } from 'react';

const CAR_PRESETS = {
  'Tesla Model 3': { type: 'electric', efficiency: 0.16 },
  'Nissan Leaf': { type: 'electric', efficiency: 0.18 },
  'Ford Fiesta': { type: 'petrol', efficiency: 5.8 },
  'VW Golf': { type: 'petrol', efficiency: 5.5 },
  'Toyota Prius': { type: 'petrol', efficiency: 4.2 },
  'BMW 3 Series': { type: 'diesel', efficiency: 4.8 },
  'Mercedes-Benz C-Class': { type: 'petrol', efficiency: 5.2 },
  'Land Rover Discovery': { type: 'diesel', efficiency: 8.5 },
  'Custom': { type: 'petrol', efficiency: 6.0 }
};

export default function RoadTripCostCalculator() {
  const [distance, setDistance] = useState('500');
  const [distanceUnit, setDistanceUnit] = useState('miles');
  const [fuelType, setFuelType] = useState('petrol');
  const [efficiency, setEfficiency] = useState('5.8');
  const [fuelPrice, setFuelPrice] = useState('1.45');
  const [passengers, setPassengers] = useState('1');

  const result = useMemo(() => {
    const dist = parseFloat(distance) || 0;
    const eff = parseFloat(efficiency) || 0;
    const price = parseFloat(fuelPrice) || 0;
    const pax = parseInt(passengers) || 1;

    if (dist <= 0 || eff <= 0 || price <= 0) return null;

    // Convert distance to miles if needed
    const distMiles = distanceUnit === 'miles' ? dist : dist * 0.621371;

    // Calculate fuel needed and total cost
    let fuelNeeded, totalCost;

    if (fuelType === 'electric') {
      // For electric: efficiency is in kWh per mile
      fuelNeeded = distMiles * eff;
      totalCost = fuelNeeded * price;
    } else {
      // For petrol/diesel: efficiency is in mpg
      fuelNeeded = distMiles / eff;
      totalCost = fuelNeeded * price;
    }

    const costPerMile = totalCost / distMiles;
    const costPerPassenger = totalCost / pax;

    return {
      distMiles: distMiles.toFixed(1),
      distKm: (distMiles * 1.60934).toFixed(1),
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerMile: costPerMile.toFixed(3),
      costPerPassenger: costPerPassenger.toFixed(2),
      fuelUnit: fuelType === 'electric' ? 'kWh' : 'litres'
    };
  }, [distance, distanceUnit, fuelType, efficiency, fuelPrice, passengers]);

  const handleCarPreset = (car) => {
    const preset = CAR_PRESETS[car];
    setFuelType(preset.type);
    setEfficiency(preset.efficiency.toString());
  };

  return (
    <div className="w-full space-y-6">
      {/* Car Presets */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Popular Vehicles
        </label>
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 mt-2">
          {Object.keys(CAR_PRESETS).filter(car => car !== 'Custom').slice(0, 6).map(car => (
            <button
              key={car}
              onClick={() => handleCarPreset(car)}
              className="text-left rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-sm hover:bg-surface transition-colors"
            >
              {car}
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {/* Distance */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Distance
          </label>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              min="0"
              step="10"
              className="flex-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <select
              value={distanceUnit}
              onChange={(e) => setDistanceUnit(e.target.value)}
              className="rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="miles">miles</option>
              <option value="km">km</option>
            </select>
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Fuel Type
          </label>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="petrol">Petrol (mpg)</option>
            <option value="diesel">Diesel (mpg)</option>
            <option value="electric">Electric (kWh/mile)</option>
          </select>
        </div>

        {/* Efficiency */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            {fuelType === 'electric' ? 'Energy Efficiency (kWh/mile)' : 'Fuel Efficiency (mpg)'}
          </label>
          <input
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            min="0"
            step="0.1"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Fuel Price */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            {fuelType === 'electric' ? 'Cost per kWh (GBP)' : 'Cost per Litre (GBP)'}
          </label>
          <input
            type="number"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
            min="0"
            step="0.01"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="text-text-secondary text-[11px] mt-1">
            {fuelType === 'electric' ? 'UK average: 0.28 GBP/kWh' : 'UK average: 1.45 GBP/litre'}
          </p>
        </div>

        {/* Passengers */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Number of Passengers
          </label>
          <input
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            min="1"
            max="8"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Main Cost */}
          <div className="rounded-[var(--radius-card)] bg-accent bg-opacity-10 border border-accent p-4">
            <p className="text-text-secondary text-sm font-medium mb-2">
              Total Trip Cost
            </p>
            <p className="text-4xl font-bold font-mono text-accent">
              £{result.totalCost}
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Distance
              </p>
              <p className="text-text-primary text-sm mt-1">
                {result.distMiles} miles
              </p>
              <p className="text-text-secondary text-[11px]">
                ({result.distKm} km)
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Fuel Needed
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {result.fuelNeeded} {result.fuelUnit}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Cost per Mile
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                £{result.costPerMile}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-success bg-opacity-10 border border-success p-3">
              <p className="text-[11px] font-medium uppercase">Per Passenger</p>
              <p className="font-mono text-success text-lg mt-1">
                £{result.costPerPassenger}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
