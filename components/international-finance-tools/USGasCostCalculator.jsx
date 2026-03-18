'use client';

import { useState, useMemo } from 'react';

export default function USGasCostCalculator() {
  const [tripDistance, setTripDistance] = useState(300);
  const [vehicleMpg, setVehicleMpg] = useState(25);
  const [gasPricePerGallon, setGasPricePerGallon] = useState(3.5);
  const [roundTrip, setRoundTrip] = useState(false);

  const results = useMemo(() => {
    const totalDistance = roundTrip ? tripDistance * 2 : tripDistance;
    const gallonsNeeded = totalDistance / vehicleMpg;
    const totalCost = gallonsNeeded * gasPricePerGallon;
    const costPerMile = totalCost / totalDistance;

    // Cost per hour (assuming 60 mph average)
    const estimatedHours = totalDistance / 60;
    const costPerHour = estimatedHours > 0 ? totalCost / estimatedHours : 0;

    return {
      totalDistance: Math.round(totalDistance),
      gallonsNeeded: gallonsNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerMile: costPerMile.toFixed(2),
      costPerHour: costPerHour.toFixed(2),
      estimatedHours: estimatedHours.toFixed(1),
    };
  }, [tripDistance, vehicleMpg, gasPricePerGallon, roundTrip]);

  return (
    <div className="space-y-6 p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Trip Details</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Trip Distance (miles)
            </label>
            <input
              type="number"
              value={tripDistance}
              onChange={(e) => setTripDistance(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              placeholder="300"
            />
          </div>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={roundTrip}
              onChange={(e) => setRoundTrip(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-text-secondary">Round trip</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Vehicle Fuel Efficiency (MPG)
            </label>
            <input
              type="number"
              value={vehicleMpg}
              onChange={(e) => setVehicleMpg(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              placeholder="25"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Gas Price per Gallon
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={gasPricePerGallon}
                onChange={(e) => setGasPricePerGallon(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="3.50"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Fuel Cost</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Distance:</span>
              <span className="font-mono font-semibold text-text-primary">
                {results.totalDistance} miles
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Vehicle Efficiency:</span>
                <span className="font-mono font-semibold text-text-primary">
                  {vehicleMpg} MPG
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Gallons Needed:</span>
                <span className="font-mono font-semibold text-text-primary">
                  {results.gallonsNeeded} gal
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Gas Price:</span>
                <span className="font-mono font-semibold">
                  ${gasPricePerGallon.toFixed(2)}/gal
                </span>
              </div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Estimated Drive Time:</span>
                <span className="font-mono font-semibold">
                  {results.estimatedHours} hours
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-accent/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-text-primary">Total Fuel Cost:</span>
                <span className="font-mono text-lg font-bold text-accent">
                  ${parseFloat(results.totalCost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="space-y-1 text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span>Per Mile:</span>
                  <span className="font-mono font-semibold">
                    ${results.costPerMile}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Per Hour:</span>
                  <span className="font-mono font-semibold">
                    ${results.costPerHour}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Note:</p>
        <p>
          This calculation only includes fuel costs. Total driving cost also includes vehicle
          maintenance (oil changes, tires), insurance, and depreciation. The IRS standard mileage
          rate (2025: 70.5 cents/mile) accounts for all these factors.
        </p>
      </div>
    </div>
  );
}
