'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono';
const selectCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer';
const labelCls = 'text-[13px] font-medium text-text-secondary';

// Common cities with coordinates
const CITIES = {
  london: { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
  paris: { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
  newyork: { lat: 40.7128, lng: -74.006, name: 'New York, USA' },
  sydney: { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia' },
  tokyo: { lat: 35.6762, lng: 139.6503, name: 'Tokyo, Japan' },
  dubai: { lat: 25.2048, lng: 55.2708, name: 'Dubai, UAE' },
  toronto: { lat: 43.6532, lng: -79.3832, name: 'Toronto, Canada' },
  capetown: { lat: -33.9249, lng: 18.4241, name: 'Cape Town, South Africa' },
  bangkok: { lat: 13.7563, lng: 100.5018, name: 'Bangkok, Thailand' },
  moscow: { lat: 55.7558, lng: 37.6173, name: 'Moscow, Russia' },
};

// Simplified sunrise/sunset calculation using PSA algorithm
function calculateSunTimes(date, latitude, longitude) {
  const J2000 = 2451545.0;
  const daysSinceJ2000 = (date.getTime() / 86400000) - (J2000 - date.getTimezoneOffset() / 1440);
  const n = daysSinceJ2000;

  // Mean solar time
  const J = n - longitude / 360;

  // Solar mean anomaly (degrees)
  const M = 357.5291 + 0.98560028 * J;
  const M_rad = (M % 360) * (Math.PI / 180);

  // Equation of center
  const C = (1.9146 - 0.004817 * (J / 36525) - 0.000014 * ((J / 36525) ** 2)) * Math.sin(M_rad) +
    (0.019993 - 0.000101 * (J / 36525)) * Math.sin(2 * M_rad) +
    0.00029 * Math.sin(3 * M_rad);

  // Ecliptic longitude
  const lambda = 280.4665 + 36000.76983 * (J / 36525) + 0.0003032 * ((J / 36525) ** 2) + C;
  const lambda_rad = (lambda % 360) * (Math.PI / 180);

  // Solar transit
  const J_transit = J2000 + J + 0.0053 * Math.sin(M_rad) - 0.0069 * Math.sin(2 * lambda_rad);

  // Declination
  const epsilon = 23.439291 - 0.0130042 * (J / 36525) - 0.00000016 * ((J / 36525) ** 2) + 0.000000504 * ((J / 36525) ** 3);
  const epsilon_rad = epsilon * (Math.PI / 180);
  const delta_rad = Math.asin(Math.sin(epsilon_rad) * Math.sin(lambda_rad));

  // Hour angle
  const lat_rad = latitude * (Math.PI / 180);
  const H0_rad = Math.acos(-Math.tan(lat_rad) * Math.tan(delta_rad));

  // Convert JD to decimal hours
  const rise_JD = J_transit - H0_rad / (2 * Math.PI);
  const set_JD = J_transit + H0_rad / (2 * Math.PI);

  const rise_hours = ((rise_JD - Math.floor(rise_JD)) * 24 + date.getTimezoneOffset() / 60) % 24;
  const set_hours = ((set_JD - Math.floor(set_JD)) * 24 + date.getTimezoneOffset() / 60) % 24;

  return { rise: rise_hours, set: set_hours };
}

function timeToString(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export default function GoldenHourCalculator() {
  const [locationType, setLocationType] = useState('city');
  const [selectedCity, setSelectedCity] = useState('london');
  const [latitude, setLatitude] = useState('51.5074');
  const [longitude, setLongitude] = useState('-0.1278');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const currentCity = selectedCity ? CITIES[selectedCity] : null;

  const calculations = useMemo(() => {
    let lat, lng;

    if (locationType === 'city' && currentCity) {
      lat = currentCity.lat;
      lng = currentCity.lng;
    } else {
      lat = parseFloat(latitude) || 0;
      lng = parseFloat(longitude) || 0;
    }

    const dateObj = new Date(date + 'T12:00:00Z');
    const times = calculateSunTimes(dateObj, lat, lng);

    const sunrise = times.rise;
    const sunset = times.set;

    // Golden hour: 1 hour after sunrise and 1 hour before sunset
    const morningGoldenStart = sunrise;
    const morningGoldenEnd = Math.min(sunrise + 1, sunset - 1);
    const eveningGoldenStart = Math.max(sunset - 1, sunrise + 1);
    const eveningGoldenEnd = sunset;

    // Blue hour: roughly 20-30 mins before sunrise and after sunset
    const morningBlueStart = Math.max(0, sunrise - 0.5);
    const morningBlueEnd = sunrise;
    const eveningBlueStart = sunset;
    const eveningBlueEnd = Math.min(24, sunset + 0.5);

    const dayLength = sunset - sunrise;

    // Determine season
    const month = new Date(date).getMonth();
    let season = 'Winter';
    if (month >= 2 && month <= 4) season = 'Spring';
    if (month >= 5 && month <= 7) season = 'Summer';
    if (month >= 8 && month <= 10) season = 'Autumn';

    return {
      sunrise,
      sunset,
      morningGoldenStart,
      morningGoldenEnd,
      eveningGoldenStart,
      eveningGoldenEnd,
      morningBlueStart,
      morningBlueEnd,
      eveningBlueStart,
      eveningBlueEnd,
      dayLength,
      season,
      locationName: currentCity?.name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    };
  }, [locationType, selectedCity, latitude, longitude, date]);

  const timelineData = useMemo(() => {
    const hours = [];
    for (let h = 0; h < 24; h++) {
      const isGolden =
        (h + 0.5 >= calculations.morningGoldenStart && h + 0.5 < calculations.morningGoldenEnd) ||
        (h + 0.5 >= calculations.eveningGoldenStart && h + 0.5 < calculations.eveningGoldenEnd);
      const isBlue =
        (h + 0.5 >= calculations.morningBlueStart && h + 0.5 < calculations.morningBlueEnd) ||
        (h + 0.5 >= calculations.eveningBlueStart && h + 0.5 < calculations.eveningBlueEnd);
      const isDaylight = h + 0.5 > calculations.sunrise && h + 0.5 < calculations.sunset;

      let color = 'bg-text-muted';
      if (isGolden) color = 'bg-accent-warm opacity-80';
      else if (isBlue) color = 'bg-accent opacity-60';
      else if (isDaylight) color = 'bg-accent-muted';

      hours.push({ hour: h, color, isGolden, isBlue, isDaylight });
    }
    return hours;
  }, [calculations]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel - Controls */}
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelCls}>Location Type</label>
          <select value={locationType} onChange={(e) => setLocationType(e.target.value)} className={selectCls}>
            <option value="city">Select City</option>
            <option value="coordinates">Enter Coordinates</option>
          </select>
        </div>

        {locationType === 'city' ? (
          <div>
            <label className={labelCls}>City</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className={selectCls}>
              {Object.entries(CITIES).map(([key, city]) => (
                <option key={key} value={key}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div>
              <label className={labelCls}>Latitude</label>
              <input
                type="number"
                min="-90"
                max="90"
                step="0.0001"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Longitude</label>
              <input
                type="number"
                min="-180"
                max="180"
                step="0.0001"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className={inputCls}
              />
            </div>
          </>
        )}

        <div>
          <label className={labelCls}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputCls}
          />
        </div>

        <hr className="border-border" />

        <div className="p-3 rounded-[var(--radius-card)] bg-surface border border-border">
          <p className="text-[12px] font-medium text-text-secondary mb-2">Legend</p>
          <div className="space-y-2 text-[12px]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-warm opacity-80" />
              <span className="text-text-secondary">Golden hour</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent opacity-60" />
              <span className="text-text-secondary">Blue hour</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-muted" />
              <span className="text-text-secondary">Daylight</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="flex flex-col gap-4">
        {/* Hero Banner */}
        <div className="p-4 rounded-[var(--radius-card)] bg-accent-muted border border-border">
          <p className="text-text-muted text-[12px] uppercase tracking-wide mb-2">{calculations.locationName}</p>
          <p className="font-heading text-2xl font-bold text-accent mb-4">{new Date(date).toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <div className="grid grid-cols-3 gap-3 text-[13px]">
            <div>
              <p className="text-text-muted text-[11px] mb-1">Sunrise</p>
              <p className="font-mono font-medium text-text-primary">{timeToString(calculations.sunrise)}</p>
            </div>
            <div>
              <p className="text-text-muted text-[11px] mb-1">Sunset</p>
              <p className="font-mono font-medium text-text-primary">{timeToString(calculations.sunset)}</p>
            </div>
            <div>
              <p className="text-text-muted text-[11px] mb-1">Day Length</p>
              <p className="font-mono font-medium text-text-primary">{calculations.dayLength.toFixed(1)}h</p>
            </div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">24-Hour Timeline</p>
          </div>
          <div className="px-4 py-4">
            <div className="flex gap-1 mb-2">
              {timelineData.map((item) => (
                <div
                  key={item.hour}
                  className={`flex-1 h-8 rounded-[4px] ${item.color} transition-opacity`}
                  title={`${String(item.hour).padStart(2, '0')}:00`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-text-muted">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:59</span>
            </div>
          </div>
        </div>

        {/* Golden Hour Details */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Golden Hour Windows</p>
          </div>
          <div className="divide-y divide-border">
            <div className="px-4 py-4">
              <p className="text-[13px] font-medium text-text-primary mb-2">Morning Golden Hour</p>
              <div className="text-[13px] font-mono">
                <div className="flex justify-between mb-2">
                  <span className="text-text-secondary">Start</span>
                  <span className="text-text-primary">{timeToString(calculations.morningGoldenStart)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">End</span>
                  <span className="text-text-primary">{timeToString(calculations.morningGoldenEnd)}</span>
                </div>
                <p className="text-[12px] text-text-muted mt-2">
                  Duration: {Math.round((calculations.morningGoldenEnd - calculations.morningGoldenStart) * 60)} minutes
                </p>
              </div>
            </div>
            <div className="px-4 py-4">
              <p className="text-[13px] font-medium text-text-primary mb-2">Evening Golden Hour</p>
              <div className="text-[13px] font-mono">
                <div className="flex justify-between mb-2">
                  <span className="text-text-secondary">Start</span>
                  <span className="text-text-primary">{timeToString(calculations.eveningGoldenStart)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">End</span>
                  <span className="text-text-primary">{timeToString(calculations.eveningGoldenEnd)}</span>
                </div>
                <p className="text-[12px] text-text-muted mt-2">
                  Duration: {Math.round((calculations.eveningGoldenEnd - calculations.eveningGoldenStart) * 60)} minutes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blue Hour Details */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Blue Hour Windows</p>
          </div>
          <div className="divide-y divide-border">
            <div className="px-4 py-4">
              <p className="text-[13px] font-medium text-text-primary mb-2">Morning Blue Hour</p>
              <div className="text-[13px] font-mono">
                <div className="flex justify-between mb-2">
                  <span className="text-text-secondary">Start</span>
                  <span className="text-text-primary">{timeToString(calculations.morningBlueStart)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">End (sunrise)</span>
                  <span className="text-text-primary">{timeToString(calculations.morningBlueEnd)}</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-4">
              <p className="text-[13px] font-medium text-text-primary mb-2">Evening Blue Hour</p>
              <div className="text-[13px] font-mono">
                <div className="flex justify-between mb-2">
                  <span className="text-text-secondary">Start (sunset)</span>
                  <span className="text-text-primary">{timeToString(calculations.eveningBlueStart)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">End</span>
                  <span className="text-text-primary">{timeToString(calculations.eveningBlueEnd)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 rounded-[var(--radius-card)] bg-surface border border-border">
          <p className="text-[12px] text-text-muted mb-3">Photography Tip</p>
          <p className="text-[13px] text-text-primary leading-relaxed">
            Golden hour offers warm, soft light perfect for portraits and landscapes. Blue hour provides cool, even light ideal for cityscapes and moody images. Plan your shoot during these windows for professional results.
          </p>
        </div>
      </div>
    </div>
  );
}
