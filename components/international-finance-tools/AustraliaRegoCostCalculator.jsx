'use client';

import { useState, useMemo } from 'react';

export default function AustraliaRegoCostCalculator() {
  const [state, setState] = useState('NSW');
  const [vehicleType, setVehicleType] = useState('car');
  const [cylinders, setCylinders] = useState('4');

  const costs = useMemo(() => {
    const ratios = {
      NSW: { car: 395, motorcycle: 145, truck: 520 },
      VIC: { car: 389, motorcycle: 154, truck: 485 },
      QLD: { car: 290, motorcycle: 115, truck: 380 },
    };

    const baseRate = ratios[state]?.[vehicleType] || 300;
    const cylinderFee = Math.max(0, (parseInt(cylinders) - 3) * 5);
    const total = baseRate + cylinderFee;

    return { base: baseRate, cylinderFee, total };
  }, [state, vehicleType, cylinders]);

  return (
    <div className="bg-surface rounded-lg space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">State</label>
          <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-white">
            <option>NSW</option>
            <option>VIC</option>
            <option>QLD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Vehicle Type</label>
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-white">
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="truck">Truck/Ute</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Cylinders</label>
          <input type="number" value={cylinders} onChange={(e) => setCylinders(e.target.value)} min="2" max="12" className="w-full px-4 py-2 border border-border rounded-lg" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg">
        <div className="text-sm text-green-700 mb-2">Annual Registration Cost</div>
        <div className="text-5xl font-mono font-bold text-green-900">${costs.total}</div>
        <div className="text-sm text-green-700 mt-3">Base: ${costs.base} + Cylinder fee: ${costs.cylinderFee}</div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">📋 Vehicle Registration</h3>
        <p className="text-sm text-blue-800">Annual vehicle registration is required in Australia. Costs vary by state, vehicle type, and engine size. Registration includes registration fees, stamp duty, and third-party insurance.</p>
      </div>
    </div>
  );
}
