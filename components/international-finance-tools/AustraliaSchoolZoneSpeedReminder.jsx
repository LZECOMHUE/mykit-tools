'use client';

import { useState, useMemo } from 'react';

const stateRules = {
  NSW: {
    name: 'New South Wales',
    zoneSpeed: 40,
    times: 'Mon-Fri: 8am-10am, 2:30pm-4pm; Weekends/holidays: No zones',
    warningZone: 45,
  },
  VIC: {
    name: 'Victoria',
    zoneSpeed: 40,
    times: 'Mon-Fri: 8am-9:30am, 2:30pm-4pm; No zones weekends/holidays',
    warningZone: 45,
  },
  QLD: {
    name: 'Queensland',
    zoneSpeed: 40,
    times: 'Mon-Fri: 7am-9am, 2:30pm-4pm; No zones weekends/holidays',
    warningZone: 45,
  },
  SA: {
    name: 'South Australia',
    zoneSpeed: 25,
    times: 'Mon-Fri: 8am-9:30am, 2:45pm-4pm; Wed 8am-9:30am',
    warningZone: 30,
  },
  WA: {
    name: 'Western Australia',
    zoneSpeed: 40,
    times: 'Mon-Fri: 7:30am-9:30am, 2:30pm-4:30pm; No zones weekends',
    warningZone: 45,
  },
  TAS: {
    name: 'Tasmania',
    zoneSpeed: 40,
    times: 'Mon-Fri: 8am-9:30am, 2:30pm-4pm',
    warningZone: 45,
  },
  ACT: {
    name: 'Australian Capital Territory',
    zoneSpeed: 40,
    times: 'Mon-Fri: 7:30am-9:30am, 2:30pm-4pm',
    warningZone: 45,
  },
  NT: {
    name: 'Northern Territory',
    zoneSpeed: 40,
    times: 'Mon-Fri: 8am-9:30am, 3pm-4:30pm (urban schools)',
    warningZone: 45,
  },
};

export default function AustraliaSchoolZoneSpeedReminder() {
  const [state, setState] = useState('NSW');
  const [currentSpeed, setCurrentSpeed] = useState('50');
  const [day, setDay] = useState('monday');
  const [time, setTime] = useState('08:30');

  const rules = stateRules[state];

  const speedStatus = useMemo(() => {
    const speed = parseFloat(currentSpeed) || 0;
    const limit = rules.zoneSpeed;
    const warning = rules.warningZone;

    if (speed > limit + 10) {
      return { status: 'dangerously over', color: 'red', icon: '🚨' };
    } else if (speed > limit) {
      return { status: 'exceeding limit', color: 'orange', icon: '⚠️' };
    } else if (speed >= warning) {
      return { status: 'approaching limit', color: 'yellow', icon: '🔔' };
    }
    return { status: 'within limit', color: 'green', icon: '✓' };
  }, [currentSpeed, rules]);

  const isSchoolZoneActive = useMemo(() => {
    const [hour, minute] = time.split(':').map(Number);
    const currentTime = hour + minute / 60;

    const isMondayFriday = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day);

    if (!isMondayFriday) return false;

    if (state === 'NSW' || state === 'VIC' || state === 'QLD') {
      return (currentTime >= 8 && currentTime <= 10) || (currentTime >= 14.5 && currentTime <= 16);
    } else if (state === 'SA') {
      return (currentTime >= 8 && currentTime <= 9.5) || (currentTime >= 14.75 && currentTime <= 16);
    } else if (state === 'WA') {
      return (currentTime >= 7.5 && currentTime <= 9.5) || (currentTime >= 14.5 && currentTime <= 16.5);
    } else if (state === 'TAS' || state === 'ACT') {
      return (currentTime >= 8 && currentTime <= 9.5) || (currentTime >= 14.5 && currentTime <= 16);
    } else if (state === 'NT') {
      return (currentTime >= 8 && currentTime <= 9.5) || (currentTime >= 15 && currentTime <= 16.5);
    }
    return false;
  }, [day, time, state]);

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Location and Time */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            State / Territory
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            {Object.entries(stateRules).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Day
          </label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Current Speed */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Current Speed
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={currentSpeed}
            onChange={(e) => setCurrentSpeed(e.target.value)}
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
          <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
            km/h
          </span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {[20, 30, 40, 50, 60].map((spd) => (
            <button
              key={spd}
              onClick={() => setCurrentSpeed(spd.toString())}
              className="px-3 py-1 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20"
            >
              {spd}
            </button>
          ))}
        </div>
      </div>

      {/* Zone Status */}
      <div
        className={`rounded-lg border-2 bg-${speedStatus.color}-50 border-${speedStatus.color}-200`}
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">{speedStatus.icon}</div>
          <div>
            <div className="text-2xl font-bold text-text-primary mb-2">
              {isSchoolZoneActive ? '⚠️ School Zone Active' : '✓ No School Zone'}
            </div>
            <div className="text-lg font-semibold mb-2">
              Speed Limit: {rules.zoneSpeed} km/h
            </div>
            <div className="text-sm text-text-secondary">
              You are {speedStatus.status}
            </div>
          </div>
        </div>
      </div>

      {/* Zone Times */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3 text-lg">
          School Zone Times - {rules.name}
        </h3>
        <p className="text-text-secondary text-sm mb-3">{rules.times}</p>
        <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <div className="text-sm text-blue-800">
            {isSchoolZoneActive ? (
              <strong>⚠️ School zone is currently ACTIVE</strong>
            ) : (
              <strong>✓ No active school zone now</strong>
            )}
          </div>
        </div>
      </div>

      {/* Speed Limit Guide */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          School Zone Speed Limits by State
        </h3>
        <div className="space-y-2">
          {Object.entries(stateRules)
            .sort((a, b) => a[1].zoneSpeed - b[1].zoneSpeed)
            .map(([key, data]) => (
              <div
                key={key}
                className={`flex justify-between items-center p-3 rounded border ${
                  state === key
                    ? 'bg-accent/10 border-accent'
                    : 'bg-surface border-border'
                }`}
              >
                <span className="text-text-secondary">{data.name}</span>
                <span className="font-mono font-bold text-text-primary text-lg">
                  {data.zoneSpeed} km/h
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-3">🚗 School Zone Safety</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>• Slow down and be alert for children near schools</li>
          <li>• School zones operate on school days only (not holidays/weekends in most states)</li>
          <li>• Watch for children crossing streets unexpectedly</li>
          <li>• Be prepared to stop quickly</li>
          <li>• Fines for speeding in school zones are typically doubled</li>
          <li>• Penalties include fines, loss of demerit points, and possible license suspension</li>
        </ul>
      </div>

      {/* Penalty Information */}
      <div className="bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-red-900 mb-3">⚠️ Speeding Penalties</h3>
        <p className="text-sm text-red-800 mb-3">
          Penalties for speeding in school zones are typically severe:
        </p>
        <div className="space-y-2 text-sm text-red-800">
          <div>
            <strong>Up to 10 km/h over:</strong> Fines $200-400, demerit points
          </div>
          <div>
            <strong>11-20 km/h over:</strong> Fines $400-1000, loss of license possible
          </div>
          <div>
            <strong>20+ km/h over:</strong> Severe fines, license suspension, court appearance possible
          </div>
        </div>
        <p className="text-xs text-red-700 mt-3">
          Note: Penalties vary by state. Check your state's specific penalties.
        </p>
      </div>
    </div>
  );
}
