'use client';

import { useState, useMemo } from 'react';

// CO2 estimates: driving ~171g/km per car (UK avg), train ~41g/km per passenger
const DRIVE_CO2_PER_KM = 171; // grams per km (UK average car)
const TRAIN_CO2_PER_KM = 41;  // grams per km per passenger

export default function DriveVsTrainCost() {
  // Drive inputs
  const [distance, setDistance] = useState('200');
  const [mpg, setMpg] = useState('45');
  const [fuelPrice, setFuelPrice] = useState('1.42');
  const [parking, setParking] = useState('0');
  const [passengers, setPassengers] = useState('1');

  // Train inputs
  const [ticketPrice, setTicketPrice] = useState('');
  const [numTickets, setNumTickets] = useState('1');
  const [transferCost, setTransferCost] = useState('0');

  const result = useMemo(() => {
    const dist = parseFloat(distance) || 0;
    const mpgVal = parseFloat(mpg) || 0;
    const fuel = parseFloat(fuelPrice) || 0;
    const park = parseFloat(parking) || 0;
    const pax = Math.max(1, parseInt(passengers) || 1);
    const ticket = parseFloat(ticketPrice) || 0;
    const tickets = Math.max(1, parseInt(numTickets) || 1);
    const transfer = parseFloat(transferCost) || 0;

    if (!dist || !mpgVal || !fuel) return null;

    // Convert distance (round trip miles) to km for CO2
    const distKm = dist * 1.60934;

    // Fuel calculation: MPG (UK) uses imperial gallons
    // L/100km = 282.5 / MPG (UK imperial)
    const lPer100km = 282.5 / mpgVal;
    const litresUsed = (distKm * lPer100km) / 100;
    const fuelCost = litresUsed * fuel;
    const driveTotalCost = fuelCost + park;
    const drivePerPerson = driveTotalCost / pax;

    // Train calculation
    const trainTotalCost = ticket * tickets + transfer;
    const trainPerPerson = tickets > 0 ? trainTotalCost / tickets : trainTotalCost;

    const diff = Math.abs(drivePerPerson - trainPerPerson);
    const isClose = diff < 5;
    const driveWins = drivePerPerson < trainPerPerson;

    // CO2 comparison (per person)
    const driveCO2 = (distKm * DRIVE_CO2_PER_KM) / pax / 1000; // kg
    const trainCO2 = (distKm * TRAIN_CO2_PER_KM) / 1000; // kg per passenger
    const co2Saved = Math.abs(driveCO2 - trainCO2);
    const trainGreener = trainCO2 < driveCO2;

    return {
      drivePerPerson,
      trainPerPerson,
      diff,
      isClose,
      driveWins,
      fuelCost,
      litresUsed,
      trainTotalCost,
      co2Saved,
      trainGreener,
      driveCO2,
      trainCO2,
      hasTrainData: ticket > 0,
    };
  }, [distance, mpg, fuelPrice, parking, passengers, ticketPrice, numTickets, transferCost]);

  const fmt = (n) =>
    '£' +
    parseFloat(n).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const fmtShort = (n) =>
    '£' + parseFloat(n).toFixed(2);

  const getVerdict = () => {
    if (!result || !result.hasTrainData) return null;
    if (result.isClose) return { text: 'Close call - within £5 per person', icon: '≈', draw: true };
    if (result.driveWins)
      return {
        text: `Driving is ${fmtShort(result.diff)} cheaper per person`,
        icon: '🚗',
        draw: false,
        winner: 'drive',
      };
    return {
      text: `Train is ${fmtShort(result.diff)} cheaper per person`,
      icon: '🚆',
      draw: false,
      winner: 'train',
    };
  };

  const verdict = getVerdict();

  const inputClass =
    'w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm';
  const labelClass = 'text-xs text-text-muted block mb-1';

  return (
    <div className="space-y-4">
      {/* Side-by-side inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Drive side */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="font-heading font-bold text-sm text-text-primary mb-3">
            🚗 Driving
          </p>
          <div className="space-y-2.5">
            <div>
              <label className={labelClass}>Distance (miles, round trip)</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="200"
                min="0"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Fuel efficiency (MPG)</label>
                <input
                  type="number"
                  value={mpg}
                  onChange={(e) => setMpg(e.target.value)}
                  placeholder="45"
                  min="1"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Fuel price (£/litre)</label>
                <input
                  type="number"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                  placeholder="1.42"
                  step="0.01"
                  min="0"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Parking cost (£)</label>
                <input
                  type="number"
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  placeholder="0"
                  min="0"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Passengers in car</label>
                <input
                  type="number"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  placeholder="1"
                  min="1"
                  max="9"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Train side */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="font-heading font-bold text-sm text-text-primary mb-3">
            🚆 Train
          </p>
          <div className="space-y-2.5">
            <div>
              <label className={labelClass}>Ticket price per person (£)</label>
              <input
                type="number"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                placeholder="e.g. 45.00"
                step="0.01"
                min="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Number of tickets</label>
              <input
                type="number"
                value={numTickets}
                onChange={(e) => setNumTickets(e.target.value)}
                placeholder="1"
                min="1"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Taxi / transfer costs (£ total)</label>
              <input
                type="number"
                value={transferCost}
                onChange={(e) => setTransferCost(e.target.value)}
                placeholder="0"
                step="0.01"
                min="0"
                className={inputClass}
              />
              <p className="text-[10px] text-text-muted mt-1">
                Cab, bus, or parking at station - to / from both ends
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero verdict card */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Verdict</p>
          {verdict ? (
            <p className="font-heading text-2xl font-bold text-white">
              {verdict.icon} {verdict.text}
            </p>
          ) : result ? (
            <p className="font-heading text-xl font-bold text-white">
              Enter train ticket price to compare
            </p>
          ) : (
            <p className="font-heading text-xl font-bold text-white">
              Enter journey details above
            </p>
          )}
        </div>

        {result && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">
                Drive total
              </p>
              <p className="font-mono font-bold text-sm text-text-primary">
                {fmt(result.drivePerPerson)}
                <span className="text-[10px] text-text-muted font-normal ml-1">/ person</span>
              </p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">
                Train total
              </p>
              <p className="font-mono font-bold text-sm text-text-primary">
                {result.hasTrainData ? (
                  <>
                    {fmt(result.trainPerPerson)}
                    <span className="text-[10px] text-text-muted font-normal ml-1">/ person</span>
                  </>
                ) : (
                  <span className="text-text-muted text-xs">-</span>
                )}
              </p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">
                Difference
              </p>
              <p className="font-mono font-bold text-sm text-text-primary">
                {result.hasTrainData ? fmt(result.diff) : <span className="text-text-muted text-xs">-</span>}
              </p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">
                CO2 saved
              </p>
              <p className="font-mono font-bold text-sm text-text-primary">
                {result.trainGreener ? (
                  <span title="Train produces less CO2 per person">
                    {result.co2Saved.toFixed(1)} kg
                    <span className="text-[10px] text-text-muted font-normal ml-1">by train</span>
                  </span>
                ) : (
                  <span title="Driving produces less CO2 (fully loaded car)">
                    {result.co2Saved.toFixed(1)} kg
                    <span className="text-[10px] text-text-muted font-normal ml-1">by driving</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {result && (
          <div className="grid grid-cols-3 gap-px bg-border border-t border-border">
            <div className="bg-white px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Fuel used</p>
              <p className="font-mono text-sm text-text-primary">{result.litresUsed.toFixed(1)} L</p>
            </div>
            <div className="bg-white px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Fuel cost</p>
              <p className="font-mono text-sm text-text-primary">{fmt(result.fuelCost)}</p>
            </div>
            <div className="bg-white px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Drive CO2</p>
              <p className="font-mono text-sm text-text-primary">{result.driveCO2.toFixed(1)} kg / person</p>
            </div>
          </div>
        )}
      </div>

      {/* What this doesn't include */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
        <p className="text-xs font-medium text-text-secondary mb-1">
          Things this calculator does not include for driving:
        </p>
        <p className="text-xs text-text-muted leading-relaxed">
          Car depreciation, insurance, servicing, road tolls, congestion charges, or the value of your time.
          For long motorway journeys especially, factor in coffee stop costs.
          The train figure also excludes food and drink on board.
        </p>
      </div>
    </div>
  );
}
