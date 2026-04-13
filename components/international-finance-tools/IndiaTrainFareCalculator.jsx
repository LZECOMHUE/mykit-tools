'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const CLASS_DATA = {
  general: {
    name: 'General',
    ratePerKm: 0.22,
    minFare: 10,
    reservationCharge: 0,
    color: 'bg-gray-400',
  },
  sleeper: {
    name: 'Sleeper (SL)',
    ratePerKm: 0.4,
    minFare: 145,
    reservationCharge: 20,
    color: 'bg-blue-500',
  },
  threeAC: {
    name: '3AC',
    ratePerKm: 1.1,
    minFare: 415,
    reservationCharge: 40,
    color: 'bg-purple-500',
  },
  twoAC: {
    name: '2AC',
    ratePerKm: 1.6,
    minFare: 565,
    reservationCharge: 50,
    color: 'bg-blue-600',
  },
  oneAC: {
    name: '1AC',
    ratePerKm: 2.75,
    minFare: 950,
    reservationCharge: 60,
    color: 'bg-amber-600',
  },
  chairCar: {
    name: 'Chair Car (CC)',
    ratePerKm: 1.05,
    minFare: 250,
    reservationCharge: 30,
    color: 'bg-green-500',
  },
  executiveChair: {
    name: 'Executive Chair (EC)',
    ratePerKm: 1.8,
    minFare: 400,
    reservationCharge: 40,
    color: 'bg-indigo-600',
  },
};

const COMMON_ROUTES = [
  { name: 'Delhi to Mumbai', distance: 1384 },
  { name: 'Delhi to Kolkata', distance: 1447 },
  { name: 'Mumbai to Chennai', distance: 1279 },
  { name: 'Delhi to Chennai', distance: 2175 },
  { name: 'Bangalore to Hyderabad', distance: 570 },
  { name: 'Mumbai to Bangalore', distance: 981 },
  { name: 'Chennai to Hyderabad', distance: 758 },
  { name: 'Delhi to Goa', distance: 1961 },
];

const SURCHARGE_DATA = {
  general: 0,
  sleeper: 15,
  threeAC: 30,
  twoAC: 50,
  oneAC: 75,
  chairCar: 20,
  executiveChair: 40,
};

function calculateFare(distance, classType) {
  const classInfo = CLASS_DATA[classType];
  const baseFare = Math.max(distance * classInfo.ratePerKm, classInfo.minFare);
  const superFastSurcharge = SURCHARGE_DATA[classType];
  const subtotal = baseFare + classInfo.reservationCharge + superFastSurcharge;

  // GST on fares above 999
  let gst = 0;
  if (subtotal > 999) {
    gst = Math.round(subtotal * 0.05);
  }

  const totalFare = subtotal + gst;

  return {
    baseFare: Math.round(baseFare),
    reservationCharge: classInfo.reservationCharge,
    superFastSurcharge,
    subtotal: Math.round(subtotal),
    gst,
    totalFare: Math.round(totalFare),
  };
}

export default function IndiaTrainFareCalculator() {
  const [distance, setDistance] = useState('1384');
  const [trainClass, setTrainClass] = useState('sleeper');

  const fareDetails = useMemo(() => {
    const dist = parseFloat(distance) || 0;
    if (dist <= 0) return null;
    return calculateFare(dist, trainClass);
  }, [distance, trainClass]);

  const handleSetRoute = (dist) => {
    setDistance(dist.toString());
  };

  const handleReset = () => {
    setDistance('1384');
    setTrainClass('sleeper');
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Distance (km)
            </label>
            <Input
              type="number"
              min="1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance in km"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Train Class
            </label>
            <Select
              value={trainClass}
              onChange={(e) => setTrainClass(e.target.value)}
              options={Object.entries(CLASS_DATA).map(([key, data]) => ({
                value: key,
                label: data.name,
              }))}
              className="w-full"
            />
          </div>

          <Button onClick={handleReset} variant="secondary" className="w-full">
            Reset
          </Button>
        </div>
      </Card>

      {fareDetails && (
        <>
          <Card className="bg-accent-muted">
            <h3 className="font-heading text-lg font-bold text-primary mb-2">
              Approximate Fare
            </h3>
            <p className="font-mono text-4xl font-bold text-accent">
              ₹{fareDetails.totalFare.toLocaleString('en-IN')}
            </p>
          </Card>

          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Fare Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Base Fare ({distance} km)</span>
                <span className="font-mono font-bold text-primary">
                  ₹{fareDetails.baseFare.toLocaleString('en-IN')}
                </span>
              </div>

              {fareDetails.reservationCharge > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-secondary">Reservation Charge</span>
                  <span className="font-mono font-bold text-primary">
                    ₹{fareDetails.reservationCharge.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {fareDetails.superFastSurcharge > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-secondary">Superfast Surcharge</span>
                  <span className="font-mono font-bold text-primary">
                    ₹{fareDetails.superFastSurcharge.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Subtotal</span>
                <span className="font-mono font-bold text-primary">
                  ₹{fareDetails.subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {fareDetails.gst > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-secondary">GST (5%)</span>
                  <span className="font-mono font-bold text-primary">
                    ₹{fareDetails.gst.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="font-heading font-bold text-primary">Total Fare</span>
                <span className="font-mono text-2xl font-bold text-accent">
                  ₹{fareDetails.totalFare.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Common Routes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMMON_ROUTES.map((route) => (
                <button
                  key={route.name}
                  onClick={() => handleSetRoute(route.distance)}
                  className="p-3 text-left border border-border rounded-lg hover:bg-accent-muted transition-colors"
                >
                  <p className="text-sm font-medium text-primary">{route.name}</p>
                  <p className="text-xs text-secondary">{route.distance} km</p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-surface">
            <p className="text-sm text-secondary">
              <strong>Note:</strong> These are approximate fares based on standard IRCTC fare calculation methods. Actual fares vary based on train type, availability of berths, dynamic pricing, and special charges. Always check IRCTC.co.in for exact booking fares. Surcharges vary by train category (Express, Superfast, Premium, etc.).
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
