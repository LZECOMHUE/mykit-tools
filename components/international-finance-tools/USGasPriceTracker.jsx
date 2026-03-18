'use client';

import { useState, useMemo } from 'react';

export default function USGasPriceTracker() {
  const [mpg, setMpg] = useState('25');
  const [distance, setDistance] = useState('300');
  const [pricePerGallon, setPricePerGallon] = useState('3.50');
  const [tripType, setTripType] = useState('custom');

  const trips = {
    shortCommute: { name: 'Short Commute', distance: 20, description: 'Daily round-trip' },
    longCommute: { name: 'Long Commute', distance: 60, description: 'Daily round-trip' },
    weekendTrip: { name: 'Weekend Trip', distance: 200, description: 'One-way distance' },
    roadTrip: { name: 'Road Trip', distance: 800, description: 'One-way distance' },
    crossCountry: { name: 'Cross Country', distance: 2500, description: 'One-way distance' },
  };

  const calculations = useMemo(() => {
    const mpgVal = parseFloat(mpg) || 25;
    const distVal = parseFloat(distance) || 300;
    const priceVal = parseFloat(pricePerGallon) || 3.5;

    const gallonsNeeded = distVal / mpgVal;
    const tripCost = gallonsNeeded * priceVal;
    const costPerMile = tripCost / distVal;

    return {
      gallonsNeeded: gallonsNeeded.toFixed(2),
      tripCost: tripCost.toFixed(2),
      costPerMile: costPerMile.toFixed(2),
      distance: distVal,
    };
  }, [mpg, distance, pricePerGallon]);

  const handleTripSelect = (type) => {
    if (type !== 'custom') {
      setDistance(trips[type].distance.toString());
      setTripType(type);
    } else {
      setTripType('custom');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Calculate average costs at different price points
  const costComparison = useMemo(() => {
    const mpgVal = parseFloat(mpg) || 25;
    const distVal = parseFloat(distance) || 300;
    const gallons = distVal / mpgVal;

    return [
      { price: 2.5, name: 'Budget', cost: (gallons * 2.5).toFixed(2) },
      { price: 3.0, name: 'Average', cost: (gallons * 3.0).toFixed(2) },
      { price: 3.5, name: 'Current (Est.)', cost: (gallons * 3.5).toFixed(2) },
      { price: 4.0, name: 'High', cost: (gallons * 4.0).toFixed(2) },
      { price: 4.5, name: 'Very High', cost: (gallons * 4.5).toFixed(2) },
    ];
  }, [mpg, distance]);

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      {/* Main Inputs */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-6 text-lg">
          Trip Cost Calculator
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Vehicle MPG
            </label>
            <input
              type="number"
              value={mpg}
              onChange={(e) => setMpg(e.target.value)}
              step="0.5"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
            <div className="text-xs text-text-muted mt-1">
              Miles per gallon (city/highway)
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Distance
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
              <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                miles
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Gas Price
            </label>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                $
              </span>
              <input
                type="number"
                value={pricePerGallon}
                onChange={(e) => setPricePerGallon(e.target.value)}
                step="0.01"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
              <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                /gal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Presets */}
      <div>
        <h3 className="font-semibold text-text-primary mb-3 text-sm">
          Quick Trip Presets
        </h3>
        <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-2">
          {Object.entries(trips).map(([key, trip]) => (
            <button
              key={key}
              onClick={() => handleTripSelect(key)}
              className={`p-3 rounded-lg border-2 transition text-sm ${
                tripType === key
                  ? 'border-accent bg-accent/10 text-accent font-medium'
                  : 'border-border text-text-primary hover:border-accent'
              }`}
            >
              <div className="font-medium">{trip.name}</div>
              <div className="text-xs opacity-75 mt-1">{trip.distance} mi</div>
            </button>
          ))}
          <button
            onClick={() => handleTripSelect('custom')}
            className={`p-3 rounded-lg border-2 transition text-sm ${
              tripType === 'custom'
                ? 'border-accent bg-accent/10 text-accent font-medium'
                : 'border-border text-text-primary hover:border-accent'
            }`}
          >
            <div className="font-medium">Custom</div>
            <div className="text-xs opacity-75 mt-1">Your amount</div>
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <div className="text-sm text-blue-700 mb-2">Gallons Needed</div>
          <div className="text-4xl font-mono font-bold text-blue-900">
            {calculations.gallonsNeeded}
          </div>
          <div className="text-xs text-blue-700 mt-2">
            {mpg} MPG ÷ {calculations.distance} miles
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <div className="text-sm text-green-700 mb-2">Total Trip Cost</div>
          <div className="text-4xl font-mono font-bold text-green-900">
            {formatCurrency(calculations.tripCost)}
          </div>
          <div className="text-xs text-green-700 mt-2">
            At {formatCurrency(pricePerGallon)}/gallon
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
          <div className="text-sm text-purple-700 mb-2">Cost Per Mile</div>
          <div className="text-4xl font-mono font-bold text-purple-900">
            {formatCurrency(calculations.costPerMile)}
          </div>
          <div className="text-xs text-purple-700 mt-2">
            Fuel cost only
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Cost at Different Price Points
        </h3>
        <div className="space-y-2">
          {costComparison.map((item) => (
            <div
              key={item.price}
              className={`flex justify-between items-center p-3 rounded ${
                Math.abs(parseFloat(item.price) - parseFloat(pricePerGallon)) < 0.1
                  ? 'bg-accent/10 border border-accent'
                  : 'bg-gray-50 border border-border'
              }`}
            >
              <div>
                <span className="font-medium text-text-primary">{item.name}</span>
                <span className="text-text-secondary ml-2 text-sm">
                  (${item.price.toFixed(2)}/gal)
                </span>
              </div>
              <span className="font-mono font-bold text-text-primary">
                {formatCurrency(item.cost)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Efficiency Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">⚡ Fuel Efficiency Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <ul className="space-y-2 text-text-secondary">
            <li>• Drive at steady speeds (55-65 mph is optimal)</li>
            <li>• Remove excess weight from your vehicle</li>
            <li>• Check tire pressure monthly</li>
            <li>• Use premium gas only if required</li>
          </ul>
          <ul className="space-y-2 text-text-secondary">
            <li>• Avoid excessive idling</li>
            <li>• Keep up with regular maintenance</li>
            <li>• Use cruise control on highways</li>
            <li>• Combine multiple trips into one</li>
          </ul>
        </div>
      </div>

      {/* Annual Fuel Cost */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">📊 Annual Fuel Cost Estimate</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {[
            {
              label: 'Short commute (20 mi/day)',
              dailyMiles: 20,
              workDays: 250,
            },
            {
              label: 'Long commute (60 mi/day)',
              dailyMiles: 60,
              workDays: 250,
            },
            {
              label: 'Casual driving (15 mi/day)',
              dailyMiles: 15,
              workDays: 365,
            },
            {
              label: 'Heavy driving (40 mi/day)',
              dailyMiles: 40,
              workDays: 365,
            },
          ].map((scenario, idx) => {
            const annualMiles = scenario.dailyMiles * scenario.workDays;
            const annualGallons = annualMiles / parseFloat(mpg);
            const annualCost = annualGallons * parseFloat(pricePerGallon);
            return (
              <div key={idx} className="bg-white rounded p-3 border border-blue-100">
                <div className="font-medium text-text-primary mb-1">
                  {scenario.label}
                </div>
                <div className="text-xs text-text-secondary mb-2">
                  {annualMiles.toLocaleString()} miles/year
                </div>
                <div className="font-mono font-bold text-accent">
                  {formatCurrency(annualCost)}/year
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Gas Prices Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-2">⛽ Gas Price Information</h3>
        <p className="text-sm text-yellow-800 mb-3">
          Gas prices shown here are estimates. For current prices in your area:
        </p>
        <div className="space-y-1 text-sm text-yellow-800">
          <div>• GasBuddy.com - Real-time prices by location</div>
          <div>• AAA Gas Prices - National average trends</div>
          <div>• Local gas stations - Most accurate for your area</div>
        </div>
      </div>
    </div>
  );
}
