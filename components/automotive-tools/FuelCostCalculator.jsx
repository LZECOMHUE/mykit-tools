'use client';

import { useState, useMemo } from 'react';

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState('');
  const [unit, setUnit] = useState('miles');
  const [mpgType, setMpgType] = useState('mpg');
  const [mpg, setMpg] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Vehicle 1', mpg: '', fuelPrice: '' },
  ]);

  const commonVehicles = [
    { name: 'Small Car (Civic, Focus)', mpg: 35 },
    { name: 'Family Car (Accord, Mondeo)', mpg: 28 },
    { name: 'SUV (CR-V, Escape)', mpg: 24 },
    { name: 'Sedan (Camry, Passat)', mpg: 30 },
    { name: 'Truck (F-150)', mpg: 20 },
    { name: 'Hybrid (Prius)', mpg: 50 },
    { name: 'Electric (Tesla)', mpg: 100 },
  ];

  const calculations = useMemo(() => {
    const dist = parseFloat(distance) || 0;
    const price = parseFloat(fuelPrice) || 0;
    const consumption = parseFloat(mpg) || 0;

    if (!dist || !consumption || !price) return null;

    const distanceKm = unit === 'km' ? dist : dist * 1.60934;
    const consumptionL100km = mpgType === 'mpg' ? 235.214 / consumption : consumption;

    const fuelNeeded = (distanceKm * consumptionL100km) / 100;
    const totalCost = fuelNeeded * price;
    const costPerKm = totalCost / distanceKm;

    return {
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerKm: costPerKm.toFixed(3),
      costPerMile: (costPerKm * 1.60934).toFixed(3),
    };
  }, [distance, unit, mpg, fuelPrice, mpgType]);

  const handleAddVehicle = () => {
    const newId = Math.max(...vehicles.map((v) => v.id), 0) + 1;
    setVehicles([...vehicles, { id: newId, name: `Vehicle ${vehicles.length + 1}`, mpg: '', fuelPrice: '' }]);
  };

  const handleRemoveVehicle = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const handleVehicleChange = (id, field, value) => {
    setVehicles(vehicles.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  };

  const vehicleComparisons = useMemo(() => {
    const dist = parseFloat(distance) || 0;
    if (!dist) return [];

    return vehicles.map((v) => {
      const vMpg = parseFloat(v.mpg) || 0;
      const vPrice = parseFloat(v.fuelPrice) || 0;

      if (!vMpg || !vPrice) return null;

      const distanceKm = unit === 'km' ? dist : dist * 1.60934;
      const consumptionL100km = mpgType === 'mpg' ? 235.214 / vMpg : vMpg;
      const fuelNeeded = (distanceKm * consumptionL100km) / 100;
      const totalCost = fuelNeeded * vPrice;

      return {
        id: v.id,
        name: v.name,
        fuelNeeded: fuelNeeded.toFixed(2),
        totalCost: totalCost.toFixed(2),
      };
    }).filter(Boolean);
  }, [distance, unit, vehicles, mpgType]);

  const fmt = (n) => '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Main Calculator */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-text-primary">Trip Fuel Cost Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Distance
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="0"
                className="flex-1 px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              >
                <option value="miles">Miles</option>
                <option value="km">Km</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Fuel Efficiency
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={mpg}
                onChange={(e) => setMpg(e.target.value)}
                placeholder="0"
                step="0.1"
                className="flex-1 px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
              <select
                value={mpgType}
                onChange={(e) => setMpgType(e.target.value)}
                className="px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              >
                <option value="mpg">MPG</option>
                <option value="l100km">L/100km</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Fuel Price (per litre)
            </label>
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {calculations && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-text-muted text-sm mb-1">Fuel Needed</p>
            <p className="font-mono-num text-2xl font-bold text-blue-600">
              {calculations.fuelNeeded}L
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-text-muted text-sm mb-1">Total Cost</p>
            <p className="font-mono-num text-2xl font-bold text-green-600">
              {fmt(calculations.totalCost)}
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-text-muted text-sm mb-1">Cost per Km</p>
            <p className="font-mono-num text-2xl font-bold text-purple-600">
              £{calculations.costPerKm}
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-text-muted text-sm mb-1">Cost per Mile</p>
            <p className="font-mono-num text-2xl font-bold text-orange-600">
              £{calculations.costPerMile}
            </p>
          </div>
        </div>
      )}

      {/* Vehicle Comparison */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-text-primary">Compare Vehicles</h3>
          <button
            onClick={handleAddVehicle}
            className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
          >
            + Add Vehicle
          </button>
        </div>

        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white border border-border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <input
                  type="text"
                  value={vehicle.name}
                  onChange={(e) => handleVehicleChange(vehicle.id, 'name', e.target.value)}
                  placeholder="Vehicle name"
                  className="px-4 py-2 border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={vehicle.mpg}
                    onChange={(e) => handleVehicleChange(vehicle.id, 'mpg', e.target.value)}
                    placeholder="MPG"
                    step="0.1"
                    className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                  <span className="px-2 py-2 text-text-secondary">MPG</span>
                </div>
                <input
                  type="number"
                  value={vehicle.fuelPrice}
                  onChange={(e) => handleVehicleChange(vehicle.id, 'fuelPrice', e.target.value)}
                  placeholder="£/L"
                  step="0.01"
                  className="px-4 py-2 border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                />
              </div>

              {distance && vehicle.mpg && vehicle.fuelPrice && (
                <div className="bg-surface rounded p-3 flex justify-between items-center mb-3">
                  <div>
                    <p className="text-text-secondary text-sm">Total cost for {distance} {unit}</p>
                    <p className="font-mono-num font-bold text-text-primary">
                      {fmt(vehicleComparisons.find((vc) => vc.id === vehicle.id)?.totalCost || '0')}
                    </p>
                  </div>
                  <p className="text-text-secondary text-sm">
                    Fuel: {vehicleComparisons.find((vc) => vc.id === vehicle.id)?.fuelNeeded || '0'}L
                  </p>
                </div>
              )}

              {vehicles.length > 1 && (
                <button
                  onClick={() => handleRemoveVehicle(vehicle.id)}
                  className="text-error text-sm font-medium hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">Average Vehicle Efficiency</h3>
        <div className="space-y-2">
          {commonVehicles.map((v) => (
            <div
              key={v.name}
              className="flex justify-between items-center py-2 px-3 hover:bg-white rounded cursor-pointer"
              onClick={() => setMpg(v.mpg)}
            >
              <span className="text-text-secondary">{v.name}</span>
              <span className="font-mono-num font-semibold text-text-primary">{v.mpg} MPG</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
