'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

const TIMEZONES = [
  { id: 'london',    name: 'London',       abbr: 'GMT',  offset: 0 },
  { id: 'paris',     name: 'Paris',        abbr: 'CET',  offset: 1 },
  { id: 'dubai',     name: 'Dubai',        abbr: 'GST',  offset: 4 },
  { id: 'india',     name: 'India',        abbr: 'IST',  offset: 5.5 },
  { id: 'bangkok',   name: 'Bangkok',      abbr: 'ICT',  offset: 7 },
  { id: 'hongkong',  name: 'Hong Kong',    abbr: 'HKT',  offset: 8 },
  { id: 'tokyo',     name: 'Tokyo',        abbr: 'JST',  offset: 9 },
  { id: 'sydney',    name: 'Sydney',       abbr: 'AEST', offset: 10 },
  { id: 'auckland',  name: 'Auckland',     abbr: 'NZST', offset: 12 },
  { id: 'newyork',   name: 'New York',     abbr: 'EST',  offset: -5 },
  { id: 'chicago',   name: 'Chicago',      abbr: 'CST',  offset: -6 },
  { id: 'denver',    name: 'Denver',       abbr: 'MST',  offset: -7 },
  { id: 'losangeles',name: 'Los Angeles',  abbr: 'PST',  offset: -8 },
  { id: 'mexico',    name: 'Mexico City',  abbr: 'CST',  offset: -6 },
  { id: 'saopaulo',  name: 'Sao Paulo',    abbr: 'BRT',  offset: -3 },
];

const WORK_START = 9;
const WORK_END = 17;

function getZoneHour(baseHour, offset) {
  return ((baseHour + offset) % 24 + 24) % 24;
}

function formatHour(h) {
  const hr = Math.floor(h);
  const min = Math.round((h % 1) * 60);
  return `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

function isWorking(hour) {
  return hour >= WORK_START && hour < WORK_END;
}

// Colour for an hour cell
function hourColor(hour) {
  if (hour >= WORK_START && hour < WORK_END) return 'bg-emerald-100 text-emerald-800';
  if (hour >= 7 && hour < 9) return 'bg-amber-50 text-amber-700'; // early morning
  if (hour >= WORK_END && hour < 21) return 'bg-amber-50 text-amber-700'; // evening
  return 'bg-zinc-100 text-zinc-400'; // night
}

export default function TimezoneMeetingPlanner() {
  const [selectedIds, setSelectedIds] = useState(['london', 'newyork', 'tokyo']);
  const [baseHour, setBaseHour] = useState(14);

  const selectedZones = useMemo(() =>
    selectedIds.map(id => TIMEZONES.find(tz => tz.id === id)).filter(Boolean),
  [selectedIds]);

  const toggleZone = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(z => z !== id) : [...prev, id]
    );
  };

  // Find overlap windows
  const overlapSlots = useMemo(() => {
    if (selectedZones.length < 2) return [];
    const slots = [];
    for (let h = 0; h < 24; h += 0.5) {
      const allWorking = selectedZones.every(z => {
        const zh = getZoneHour(h, z.offset);
        return isWorking(zh);
      });
      if (allWorking) slots.push(h);
    }
    return slots;
  }, [selectedZones]);

  // Group consecutive overlap slots into ranges
  const overlapRanges = useMemo(() => {
    if (overlapSlots.length === 0) return [];
    const ranges = [];
    let start = overlapSlots[0];
    let prev = overlapSlots[0];
    for (let i = 1; i < overlapSlots.length; i++) {
      if (overlapSlots[i] - prev > 0.5) {
        ranges.push({ start, end: prev + 0.5 });
        start = overlapSlots[i];
      }
      prev = overlapSlots[i];
    }
    ranges.push({ start, end: prev + 0.5 });
    return ranges;
  }, [overlapSlots]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4 space-y-5">
      {/* Timezone pills */}
      <div>
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">Select Timezones</p>
        <div className="flex flex-wrap gap-1.5">
          {TIMEZONES.map(tz => (
            <button
              key={tz.id}
              onClick={() => toggleZone(tz.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedIds.includes(tz.id)
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border hover:bg-surface-hover text-text-primary'
              }`}
            >
              {tz.name}
              <span className="ml-1 opacity-60">{tz.abbr}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedZones.length > 0 && (
        <>
          {/* Time slider + current times */}
          <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted uppercase tracking-wide">Meeting time (UTC)</span>
              <span className="font-mono font-bold text-lg text-text-primary">{formatHour(baseHour)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="23.5"
              step="0.5"
              value={baseHour}
              onChange={(e) => setBaseHour(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(baseHour / 23.5) * 100}%, #e5e5e5 ${(baseHour / 23.5) * 100}%, #e5e5e5 100%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-text-muted font-mono">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:30</span>
            </div>
          </div>

          {/* Zone time cards - compact horizontal layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {selectedZones.map(zone => {
              const zh = getZoneHour(baseHour, zone.offset);
              const working = isWorking(zh);
              return (
                <div
                  key={zone.id}
                  className={`rounded-lg p-3 ${working ? 'bg-emerald-50 border border-emerald-200' : 'bg-surface border border-border'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-text-secondary truncate">{zone.name}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${working ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}`}>
                      {zone.abbr}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-xl text-text-primary">
                    {formatHour(zh)}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${working ? 'text-emerald-600' : 'text-text-muted'}`}>
                    {working ? 'Working hours' : zh >= 21 || zh < 7 ? 'Night time' : 'Outside work'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual timeline - the main feature */}
          <div className="bg-surface border border-border rounded-xl p-4 overflow-x-auto">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">24-Hour Overview</p>
            <div className="min-w-[600px]">
              {/* Hour labels */}
              <div className="flex mb-1" style={{ paddingLeft: '100px' }}>
                {Array.from({ length: 24 }).map((_, h) => (
                  <div key={h} className="flex-1 text-center text-[9px] font-mono text-text-muted">
                    {h % 3 === 0 ? `${String(h).padStart(2, '0')}` : ''}
                  </div>
                ))}
              </div>

              {/* Zone rows */}
              {selectedZones.map(zone => (
                <div key={zone.id} className="flex items-center mb-1">
                  <div className="w-[100px] text-xs font-medium text-text-secondary truncate pr-2 flex-shrink-0">
                    {zone.name}
                  </div>
                  <div className="flex flex-1 gap-px">
                    {Array.from({ length: 48 }).map((_, i) => {
                      const h = i / 2;
                      const zh = getZoneHour(h, zone.offset);
                      const isCurrent = Math.abs(h - baseHour) < 0.5;
                      return (
                        <button
                          key={i}
                          onClick={() => setBaseHour(h)}
                          className={`flex-1 h-6 rounded-sm transition-all ${hourColor(zh)} ${
                            isCurrent ? 'ring-2 ring-accent ring-offset-1 scale-y-125 z-10' : 'hover:opacity-80'
                          }`}
                          title={`${zone.name}: ${formatHour(zh)} (UTC ${formatHour(h)})`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-border" style={{ paddingLeft: '100px' }}>
                <div className="flex items-center gap-1 text-[10px] text-text-muted">
                  <span className="w-3 h-3 rounded-sm bg-emerald-100 border border-emerald-200" /> Working (9-5)
                </div>
                <div className="flex items-center gap-1 text-[10px] text-text-muted">
                  <span className="w-3 h-3 rounded-sm bg-amber-50 border border-amber-200" /> Early / Evening
                </div>
                <div className="flex items-center gap-1 text-[10px] text-text-muted">
                  <span className="w-3 h-3 rounded-sm bg-zinc-100 border border-zinc-200" /> Night
                </div>
              </div>
            </div>
          </div>

          {/* Overlap summary */}
          {selectedZones.length >= 2 && (
            <div className={`rounded-xl p-4 ${overlapRanges.length > 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
              <p className="text-xs font-medium uppercase tracking-wide mb-2 text-text-secondary">
                Overlap - all zones within 9am-5pm
              </p>
              {overlapRanges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {overlapRanges.map((range, i) => (
                    <button
                      key={i}
                      onClick={() => setBaseHour(range.start)}
                      className={`px-3 py-2 rounded-lg font-mono text-sm font-bold transition-all ${
                        baseHour >= range.start && baseHour < range.end
                          ? 'bg-accent text-white shadow-md'
                          : 'bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      {formatHour(range.start)} - {formatHour(range.end)} UTC
                    </button>
                  ))}
                  <p className="text-xs text-emerald-700 self-center ml-1">
                    {overlapSlots.length / 2}h of overlap across {selectedZones.length} zones
                  </p>
                </div>
              ) : (
                <p className="text-sm text-amber-700">
                  No overlap found where all {selectedZones.length} zones are within 9am-5pm. Try removing a zone or adjusting expectations.
                </p>
              )}
            </div>
          )}
        </>
      )}

      {selectedZones.length === 0 && (
        <div className="bg-surface border border-border rounded-xl text-center text-text-muted">
          Select at least 2 timezones above to find meeting overlap
        </div>
      )}
    </div>
  );
}
