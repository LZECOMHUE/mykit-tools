'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function MileageReimbursementCalculator() {
  const [businessMiles, setBusinessMiles] = useState('5000');
  const [vehicleType, setVehicleType] = useState('car');
  const [result, setResult] = useState(null);

  const VEHICLE_TYPES = [
    { value: 'car', label: 'Car' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'bicycle', label: 'Bicycle' },
  ];

  // HMRC 2026/27 approved mileage rates
  const MILEAGE_RATES = {
    car: [
      { range: '0 to 10,000 miles', rate: 0.45 },
      { range: '10,001+ miles', rate: 0.25 },
    ],
    motorcycle: [
      { range: 'All miles', rate: 0.24 },
    ],
    bicycle: [
      { range: 'All miles', rate: 0.20 },
    ],
  };

  function calculate() {
    const miles = parseFloat(businessMiles) || 0;
    let claim = 0;

    if (vehicleType === 'car') {
      const firstBand = Math.min(miles, 10000);
      const secondBand = Math.max(0, miles - 10000);
      claim = (firstBand * 0.45) + (secondBand * 0.25);
    } else if (vehicleType === 'motorcycle') {
      claim = miles * 0.24;
    } else if (vehicleType === 'bicycle') {
      claim = miles * 0.20;
    }

    // Tax relief at basic rate (20%)
    const taxReliefBasicRate = claim * 0.20;
    const taxReliefHigherRate = claim * 0.40;

    setResult({
      miles,
      claimAmount: claim.toFixed(2),
      taxReliefBasicRate: taxReliefBasicRate.toFixed(2),
      taxReliefHigherRate: taxReliefHigherRate.toFixed(2),
      netBenefit: claim.toFixed(2),
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Business Miles This Tax Year
            </label>
            <Input
              type="number"
              value={businessMiles}
              onChange={(e) => setBusinessMiles(e.target.value)}
              placeholder="Enter total business miles"
              min="0"
            />
            <p className="text-xs text-secondary mt-1">
              Only count miles for business journeys, not commuting to regular workplace.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Vehicle Type
            </label>
            <Select
              options={VEHICLE_TYPES}
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            />
            <p className="text-xs text-secondary mt-1">
              Choose the vehicle type you use for business miles.
            </p>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Claim
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Main Result */}
          <Card className="bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Your Mileage Claim
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Business Miles</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  {result.miles.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-accent">
                <p className="text-secondary text-sm mb-2">Claimable Amount</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{result.claimAmount}
                </p>
              </div>
            </div>
          </Card>

          {/* Rate Breakdown */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              HMRC Approved Rates (2026/27)
            </h3>

            <div className="space-y-4">
              {vehicleType === 'car' && (
                <>
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-secondary text-sm mb-2">0 to 10,000 miles</p>
                    <p className="font-mono text-lg font-bold text-primary">45p per mile</p>
                    <p className="text-xs text-secondary mt-1">
                      {Math.min(result.miles, 10000).toLocaleString()} miles × £0.45 = £{(Math.min(result.miles, 10000) * 0.45).toFixed(2)}
                    </p>
                  </div>

                  {result.miles > 10000 && (
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-secondary text-sm mb-2">10,001+ miles</p>
                      <p className="font-mono text-lg font-bold text-primary">25p per mile</p>
                      <p className="text-xs text-secondary mt-1">
                        {(result.miles - 10000).toLocaleString()} miles × £0.25 = £{((result.miles - 10000) * 0.25).toFixed(2)}
                      </p>
                    </div>
                  )}
                </>
              )}

              {vehicleType === 'motorcycle' && (
                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-2">All miles</p>
                  <p className="font-mono text-lg font-bold text-primary">24p per mile</p>
                  <p className="text-xs text-secondary mt-1">
                    {result.miles.toLocaleString()} miles × £0.24 = £{(result.miles * 0.24).toFixed(2)}
                  </p>
                </div>
              )}

              {vehicleType === 'bicycle' && (
                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-2">All miles</p>
                  <p className="font-mono text-lg font-bold text-primary">20p per mile</p>
                  <p className="text-xs text-secondary mt-1">
                    {result.miles.toLocaleString()} miles × £0.20 = £{(result.miles * 0.20).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Tax Relief */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Tax Relief Value
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">At Basic Rate (20%)</p>
                <p className="font-mono text-xl font-bold text-primary">
                  £{result.taxReliefBasicRate}
                </p>
                <p className="text-xs text-secondary mt-1">
                  Tax saving if you pay basic rate tax
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">At Higher Rate (40%)</p>
                <p className="font-mono text-xl font-bold text-primary">
                  £{result.taxReliefHigherRate}
                </p>
                <p className="text-xs text-secondary mt-1">
                  Tax saving if you pay higher rate tax
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p className="font-bold mb-2">How to claim:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>You can claim as a self-employed person or through a personal tax return</li>
                <li>Keep records of journeys (dates, destinations, business purpose)</li>
                <li>Use HMRC's approved mileage rates</li>
                <li>You cannot claim for commuting to your normal workplace</li>
                <li>You cannot claim for both mileage allowance and travel expenses for the same journey</li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
