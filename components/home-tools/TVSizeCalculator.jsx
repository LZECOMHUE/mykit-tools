'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const commonSizes = [
  { inches: 32, cm: 81 },
  { inches: 43, cm: 109 },
  { inches: 50, cm: 127 },
  { inches: 55, cm: 140 },
  { inches: 65, cm: 165 },
  { inches: 75, cm: 190 },
  { inches: 85, cm: 216 },
];

const roomTypes = {
  bedroom: { minMultiplier: 1.2, maxMultiplier: 1.5, label: 'Bedroom' },
  living_room: { minMultiplier: 1.5, maxMultiplier: 2.5, label: 'Living Room' },
  cinema_room: { minMultiplier: 2.5, maxMultiplier: 3, label: 'Cinema Room' },
};

export default function TVSizeCalculator() {
  const [distance, setDistance] = useState('2');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [roomType, setRoomType] = useState('living_room');

  const distanceInMetres = distanceUnit === 'm' ? parseFloat(distance) || 0 : (parseFloat(distance) || 0) * 0.3048;
  const distanceInInches = distanceInMetres * 39.37;

  const room = roomTypes[roomType];
  const minSize = distanceInInches / room.maxMultiplier;
  const maxSize = distanceInInches / room.minMultiplier;

  const recommendedSize = (minSize + maxSize) / 2;

  const closestSize = commonSizes.reduce((prev, curr) =>
    Math.abs(curr.inches - recommendedSize) < Math.abs(prev.inches - recommendedSize) ? curr : prev
  );

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Viewing Distance
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance"
              className="flex-1"
            />
            <Select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)} className="w-20">
              <option value="m">Metres</option>
              <option value="ft">Feet</option>
            </Select>
          </div>
          <p className="text-text-muted text-xs mt-2">
            {distanceInMetres.toFixed(2)} m ({distanceInInches.toFixed(0)}")
          </p>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Room Type
          </label>
          <Select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full">
            {Object.entries(roomTypes).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="bg-accent text-white border border-accent rounded-[var(--radius-card)] p-6">
        <p className="text-sm opacity-90 mb-2">Recommended TV Size</p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-5xl font-bold">{closestSize.inches}"</span>
          <span className="text-lg opacity-90">({closestSize.cm} cm)</span>
        </div>
        <p className="text-xs opacity-75 mt-3">
          For your {distanceInMetres.toFixed(1)}m viewing distance and {room.label}
        </p>
        <p className="text-xs opacity-75 mt-1">
          Range: {Math.round(minSize)}" to {Math.round(maxSize)}"
        </p>
      </div>

      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h3 className="font-heading text-base font-bold text-text-primary">Common TV Sizes & Viewing Distance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-secondary">Size</th>
                <th className="text-left py-2 px-2 font-medium text-text-secondary">Bedroom</th>
                <th className="text-left py-2 px-2 font-medium text-text-secondary">Living Room</th>
                <th className="text-left py-2 px-2 font-medium text-text-secondary">Cinema</th>
              </tr>
            </thead>
            <tbody>
              {commonSizes.map((size) => (
                <tr key={size.inches} className="border-b border-border">
                  <td className="py-2 px-2 font-mono font-bold text-accent">{size.inches}"</td>
                  <td className="py-2 px-2 text-text-muted">{((size.inches * 1.2) / 39.37).toFixed(1)}m - {((size.inches * 1.5) / 39.37).toFixed(1)}m</td>
                  <td className="py-2 px-2 text-text-muted">{((size.inches * 1.5) / 39.37).toFixed(1)}m - {((size.inches * 2.5) / 39.37).toFixed(1)}m</td>
                  <td className="py-2 px-2 text-text-muted">{((size.inches * 2.5) / 39.37).toFixed(1)}m - {((size.inches * 3) / 39.37).toFixed(1)}m</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
