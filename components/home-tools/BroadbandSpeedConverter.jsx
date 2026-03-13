'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const downloadEstimates = [
  { name: 'Photo (5 MB)', sizeGB: 0.005 },
  { name: 'Song (5 MB)', sizeGB: 0.005 },
  { name: 'HD Movie (4 GB)', sizeGB: 4 },
  { name: 'Game (50 GB)', sizeGB: 50 },
  { name: '4K Movie (20 GB)', sizeGB: 20 },
];

function formatTime(seconds) {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return `${hours}h ${mins}m`;
}

function formatSpeed(mbps) {
  const mbs = mbps / 8;
  const gbps = mbps / 1000;
  return {
    mbps: mbps.toFixed(2),
    mbs: mbs.toFixed(2),
    gbps: gbps.toFixed(3),
  };
}

export default function BroadbandSpeedConverter() {
  const [speed, setSpeed] = useState('30');
  const [unit, setUnit] = useState('mbps');

  let speedInMbps = parseFloat(speed) || 0;
  if (unit === 'mbs') speedInMbps = (parseFloat(speed) || 0) * 8;
  if (unit === 'gbps') speedInMbps = (parseFloat(speed) || 0) * 1000;

  const formatted = formatSpeed(speedInMbps);

  return (
    <div className="space-y-8">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Speed
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              placeholder="Enter speed"
              className="flex-1"
            />
            <Select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-32">
              <option value="mbps">Mbps</option>
              <option value="mbs">MB/s</option>
              <option value="gbps">Gbps</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h3 className="font-heading text-base font-bold text-text-primary">Speed Conversions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-border rounded-lg p-4">
            <p className="text-text-muted text-xs mb-1">Megabits per second</p>
            <p className="font-mono text-2xl font-bold text-accent">{formatted.mbps}</p>
            <p className="text-text-muted text-xs">Mbps</p>
          </div>
          <div className="bg-white border border-border rounded-lg p-4">
            <p className="text-text-muted text-xs mb-1">Megabytes per second</p>
            <p className="font-mono text-2xl font-bold text-accent">{formatted.mbs}</p>
            <p className="text-text-muted text-xs">MB/s</p>
          </div>
          <div className="bg-white border border-border rounded-lg p-4">
            <p className="text-text-muted text-xs mb-1">Gigabits per second</p>
            <p className="font-mono text-2xl font-bold text-accent">{formatted.gbps}</p>
            <p className="text-text-muted text-xs">Gbps</p>
          </div>
        </div>
      </div>

      {speedInMbps > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
          <h3 className="font-heading text-base font-bold text-text-primary">Download Times</h3>
          <div className="space-y-3">
            {downloadEstimates.map((item) => {
              const downloadSeconds = (item.sizeGB * 8000) / speedInMbps;
              return (
                <div key={item.name} className="flex items-center justify-between bg-white border border-border rounded-lg p-4">
                  <span className="text-text-primary font-medium">{item.name}</span>
                  <span className="font-mono text-lg font-bold text-accent">{formatTime(downloadSeconds)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
