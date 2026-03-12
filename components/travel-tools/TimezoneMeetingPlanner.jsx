'use client';

import { useState, useMemo } from 'react';

const timezones = [
  { name: 'London (GMT/BST)', offset: 0 },
  { name: 'Paris (CET/CEST)', offset: 1 },
  { name: 'Dubai (GST)', offset: 4 },
  { name: 'India (IST)', offset: 5.5 },
  { name: 'Bangkok (ICT)', offset: 7 },
  { name: 'Hong Kong (HKT)', offset: 8 },
  { name: 'Tokyo (JST)', offset: 9 },
  { name: 'Sydney (AEST/AEDT)', offset: 10 },
  { name: 'New York (EST/EDT)', offset: -5 },
  { name: 'Los Angeles (PST/PDT)', offset: -8 },
  { name: 'Mexico City (CST/CDT)', offset: -6 },
  { name: 'São Paulo (BRT)', offset: -3 },
];

const workingHours = { start: 9, end: 17 };

export default function TimezoneMeetingPlanner() {
  const [selectedZones, setSelectedZones] = useState(['London (GMT/BST)', 'New York (EST/EDT)', 'Tokyo (JST)']);
  const [baseHour, setBaseHour] = useState(14);

  const zones = selectedZones.map((name) => ({
    name,
    ...timezones.find((tz) => tz.name === name),
  }));

  const availableHours = useMemo(() => {
    if (zones.length === 0) return [];

    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      const zoneHours = zones.map((zone) => {
        const zoneTime = (hour + zone.offset) % 24;
        return {
          zone: zone.name,
          hour: zoneTime,
          isWorking: zoneTime >= workingHours.start && zoneTime < workingHours.end,
        };
      });

      const workingCount = zoneHours.filter((z) => z.isWorking).length;
      const allWorking = workingCount === zones.length;

      hours.push({
        baseHour: hour,
        zones: zoneHours,
        workingCount,
        allWorking,
      });
    }

    return hours;
  }, [zones]);

  const currentTimes = useMemo(() => {
    return zones.map((zone) => {
      const zoneHour = (baseHour + zone.offset) % 24;
      const isWorking = zoneHour >= workingHours.start && zoneHour < workingHours.end;
      return {
        zone: zone.name,
        hour: zoneHour,
        isWorking,
        display: String(Math.floor(zoneHour)).padStart(2, '0') + ':00',
      };
    });
  }, [baseHour, zones]);

  const toggleZone = (zoneName) => {
    if (selectedZones.includes(zoneName)) {
      setSelectedZones(selectedZones.filter((z) => z !== zoneName));
    } else {
      setSelectedZones([...selectedZones, zoneName]);
    }
  };

  const formatHour = (hour) => {
    const h = Math.floor(hour);
    const m = (hour % 1) * 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Timezone Selection */}
      <div className="space-y-3">
        <h3 className="text-text-primary font-semibold">Select Timezones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {timezones.map((tz) => (
            <label
              key={tz.name}
              className={`flex items-center gap-2 p-3 rounded-[var(--radius-input)] cursor-pointer border ${
                selectedZones.includes(tz.name)
                  ? 'bg-accent-muted border-accent'
                  : 'bg-white border-border hover:bg-surface'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedZones.includes(tz.name)}
                onChange={() => toggleZone(tz.name)}
                className="w-4 h-4"
              />
              <span className="text-sm text-text-primary font-medium">{tz.name}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedZones.length > 0 ? (
        <>
          {/* Time Slider */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <label className="block text-text-secondary text-sm font-medium">
              London Time: {formatHour(baseHour)}
            </label>
            <input
              type="range"
              min="0"
              max="23"
              step="0.5"
              value={baseHour}
              onChange={(e) => setBaseHour(parseFloat(e.target.value))}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-text-muted text-xs">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:30</span>
            </div>
          </div>

          {/* Current Times for All Zones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentTimes.map((time) => (
              <div
                key={time.zone}
                className={`rounded-[var(--radius-card)] p-4 border ${
                  time.isWorking
                    ? 'bg-success/10 border-success'
                    : 'bg-warning/10 border-warning'
                }`}
              >
                <p className="text-text-secondary text-xs mb-1">{time.zone}</p>
                <p className="font-mono-num text-2xl font-bold text-text-primary">
                  {time.display}
                </p>
                <p className="text-xs mt-1 text-text-secondary">
                  {time.isWorking ? '✓ Working Hours' : '⏰ Outside Working Hours'}
                </p>
              </div>
            ))}
          </div>

          {/* Best Meeting Times */}
          <div className="bg-accent-muted border border-accent rounded-[var(--radius-card)] p-6 space-y-3">
            <h4 className="text-text-primary font-semibold">Best Meeting Times (All zones within 9am-5pm)</h4>
            {availableHours.filter((h) => h.allWorking).length > 0 ? (
              <div className="space-y-2">
                {availableHours
                  .filter((h) => h.allWorking)
                  .map((h) => (
                    <button
                      key={h.baseHour}
                      onClick={() => setBaseHour(h.baseHour)}
                      className={`w-full p-3 rounded-[var(--radius-input)] text-left transition-colors ${
                        baseHour === h.baseHour
                          ? 'bg-accent text-white'
                          : 'bg-white border border-border hover:bg-surface'
                      }`}
                    >
                      <span className="font-medium">
                        {formatHour(h.baseHour)} London
                      </span>
                      <span className="text-xs ml-2">
                        ({h.zones.map((z) => formatHour(z.hour)).join(', ')})
                      </span>
                    </button>
                  ))}
              </div>
            ) : (
              <p className="text-text-secondary text-sm">
                ⚠️ No time works for all zones within working hours.
              </p>
            )}
          </div>

          {/* Overlap Summary */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-sm mb-3">Zones with working hour overlap:</p>
            <div className="flex flex-wrap gap-2">
              {availableHours.map((h) => (
                <div
                  key={h.baseHour}
                  className="flex items-center gap-2 px-3 py-2 bg-white rounded-[var(--radius-input)] border border-border text-xs"
                >
                  <span className="font-medium text-text-primary">
                    {formatHour(h.baseHour)} London
                  </span>
                  <span
                    className={`font-mono-num font-bold ${
                      h.allWorking
                        ? 'text-success'
                        : h.workingCount > 0
                          ? 'text-warning'
                          : 'text-error'
                    }`}
                  >
                    {h.workingCount}/{zones.length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center text-text-muted">
          <p>Select at least 2 timezones to find meeting times</p>
        </div>
      )}
    </div>
  );
}
