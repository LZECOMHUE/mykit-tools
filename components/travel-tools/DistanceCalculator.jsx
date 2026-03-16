'use client';
import { useState, useMemo } from 'react';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const CITIES = [
  { name: 'New York, USA', lat: 40.7128, lon: -74.006, tz: -5 },
  { name: 'Los Angeles, USA', lat: 34.0522, lon: -118.2437, tz: -8 },
  { name: 'London, UK', lat: 51.5074, lon: -0.1278, tz: 0 },
  { name: 'Paris, France', lat: 48.8566, lon: 2.3522, tz: 1 },
  { name: 'Berlin, Germany', lat: 52.52, lon: 13.405, tz: 1 },
  { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503, tz: 9 },
  { name: 'Bangkok, Thailand', lat: 13.7563, lon: 100.5018, tz: 7 },
  { name: 'Singapore, Singapore', lat: 1.3521, lon: 103.8198, tz: 8 },
  { name: 'Hong Kong, China', lat: 22.3193, lon: 114.1694, tz: 8 },
  { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093, tz: 10 },
  { name: 'Melbourne, Australia', lat: -37.8136, lon: 144.9631, tz: 10 },
  { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708, tz: 4 },
  { name: 'Mumbai, India', lat: 19.076, lon: 72.8777, tz: 5.5 },
  { name: 'Delhi, India', lat: 28.7041, lon: 77.1025, tz: 5.5 },
  { name: 'Bangkok, Thailand', lat: 13.7563, lon: 100.5018, tz: 7 },
  { name: 'Istanbul, Turkey', lat: 41.0082, lon: 28.9784, tz: 3 },
  { name: 'Cairo, Egypt', lat: 30.0444, lon: 31.2357, tz: 2 },
  { name: 'Toronto, Canada', lat: 43.6532, lon: -79.3832, tz: -5 },
  { name: 'Mexico City, Mexico', lat: 19.4326, lon: -99.1332, tz: -6 },
  { name: 'São Paulo, Brazil', lat: -23.5505, lon: -46.6333, tz: -3 },
  { name: 'Buenos Aires, Argentina', lat: -34.6037, lon: -58.3816, tz: -3 },
  { name: 'Cape Town, South Africa', lat: -33.9249, lon: 18.4241, tz: 2 },
  { name: 'Johannesburg, South Africa', lat: -26.2023, lon: 28.0436, tz: 2 },
  { name: 'Bangkok, Thailand', lat: 13.7563, lon: 100.5018, tz: 7 },
  { name: 'Seoul, South Korea', lat: 37.5665, lon: 126.978, tz: 9 },
  { name: 'Beijing, China', lat: 39.9042, lon: 116.4074, tz: 8 },
  { name: 'Shanghai, China', lat: 31.2304, lon: 121.4737, tz: 8 },
  { name: 'Vienna, Austria', lat: 48.2082, lon: 16.3738, tz: 1 },
  { name: 'Rome, Italy', lat: 41.9028, lon: 12.4964, tz: 1 },
  { name: 'Barcelona, Spain', lat: 41.3851, lon: 2.1734, tz: 1 },
  { name: 'Madrid, Spain', lat: 40.4168, lon: -3.7038, tz: 1 },
  { name: 'Amsterdam, Netherlands', lat: 52.3676, lon: 4.9041, tz: 1 },
  { name: 'Prague, Czech Republic', lat: 50.0755, lon: 14.4378, tz: 1 },
  { name: 'Athens, Greece', lat: 37.9838, lon: 23.7275, tz: 2 },
  { name: 'Moscow, Russia', lat: 55.7558, lon: 37.6173, tz: 3 },
  { name: 'Istanbul, Turkey', lat: 41.0082, lon: 28.9784, tz: 3 },
  { name: 'Bangkok, Thailand', lat: 13.7563, lon: 100.5018, tz: 7 },
  { name: 'Ho Chi Minh City, Vietnam', lat: 10.7769, lon: 106.7009, tz: 7 },
  { name: 'Hanoi, Vietnam', lat: 21.0285, lon: 105.8542, tz: 7 },
  { name: 'Manila, Philippines', lat: 14.5995, lon: 120.9842, tz: 8 },
  { name: 'Jakarta, Indonesia', lat: -6.1944, lon: 106.8229, tz: 7 },
  { name: 'Bali, Indonesia', lat: -8.6705, lon: 115.2126, tz: 8 },
  { name: 'Auckland, New Zealand', lat: -37.0882, lon: 174.7765, tz: 12 },
  { name: 'Reykjavik, Iceland', lat: 64.1466, lon: -21.9426, tz: 0 },
  { name: 'Lagos, Nigeria', lat: 6.5244, lon: 3.3792, tz: 1 },
  { name: 'Nairobi, Kenya', lat: -1.2864, lon: 36.8172, tz: 3 },
  { name: 'Bangkok, Thailand', lat: 13.7563, lon: 100.5018, tz: 7 },
];

// Remove duplicates
const UNIQUE_CITIES = Array.from(
  new Map(CITIES.map((city) => [city.name, city])).values()
);

function calculateGreatCircleDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function DistanceCalculator() {
  const [city1, setCity1] = useState('London, UK');
  const [city2, setCity2] = useState('Paris, France');

  const cityData1 = UNIQUE_CITIES.find((c) => c.name === city1);
  const cityData2 = UNIQUE_CITIES.find((c) => c.name === city2);

  const results = useMemo(() => {
    if (!cityData1 || !cityData2) {
      return {
        distanceKm: 0,
        distanceMiles: 0,
        flightTime: 0,
        tzDiff: 0,
      };
    }

    const distanceKm = calculateGreatCircleDistance(
      cityData1.lat,
      cityData1.lon,
      cityData2.lat,
      cityData2.lon
    );

    const distanceMiles = distanceKm / 1.60934;
    const flightTime = distanceKm / 800;
    const tzDiff = cityData2.tz - cityData1.tz;

    return {
      distanceKm: distanceKm.toFixed(0),
      distanceMiles: distanceMiles.toFixed(0),
      flightTime: flightTime.toFixed(1),
      tzDiff,
    };
  }, [cityData1, cityData2]);

  const getTzString = (offset) => {
    if (offset === 0) return 'Same timezone';
    const sign = offset > 0 ? '+' : '';
    const hours = Math.floor(Math.abs(offset));
    const minutes = Math.round((Math.abs(offset) % 1) * 60);
    const minString = minutes > 0 ? `:${String(minutes).padStart(2, '0')}` : '';
    return `${sign}${hours}${minString} hours`;
  };

  const getFlightTimeString = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours % 1) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            City 1
          </label>
          <Select
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
            options={UNIQUE_CITIES.map((c) => ({ value: c.name, label: c.name }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            City 2
          </label>
          <Select
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            options={UNIQUE_CITIES.map((c) => ({ value: c.name, label: c.name }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Distance</p>
            <div className="space-y-1 mt-2">
              <p className="font-mono text-2xl font-bold text-accent">
                {results.distanceKm}
                <span className="text-sm ml-1">km</span>
              </p>
              <p className="font-mono text-lg text-text-primary">
                {results.distanceMiles}
                <span className="text-sm ml-1">miles</span>
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Flight Time (approx.)</p>
            <p className="font-mono text-2xl font-bold text-accent mt-2">
              {getFlightTimeString(results.flightTime)}
            </p>
            <p className="text-xs text-text-muted mt-1">
              at 800 km/h cruise speed
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">Time Zone Difference</p>
          <p className="font-mono text-xl font-bold text-text-primary mt-2">
            {getTzString(results.tzDiff)}
          </p>
        </div>
      </Card>

      <Card>
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-bold text-text-primary">
            Journey Summary
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-text-secondary">From:</span>
              <span className="ml-2 font-mono text-text-primary">{city1}</span>
            </p>
            <p>
              <span className="text-text-secondary">To:</span>
              <span className="ml-2 font-mono text-text-primary">{city2}</span>
            </p>
            <p>
              <span className="text-text-secondary">Great circle distance:</span>
              <span className="ml-2 font-mono text-text-primary">
                {results.distanceKm} km ({results.distanceMiles} mi)
              </span>
            </p>
            <p>
              <span className="text-text-secondary">Flight time estimate:</span>
              <span className="ml-2 font-mono text-text-primary">
                {getFlightTimeString(results.flightTime)}
              </span>
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-xs text-text-muted">
          Flight time estimates assume constant cruise speed and do not account for takeoff, landing,
          taxiing, or air traffic routing. Actual flight times will be longer and vary by season.
          Great circle distance is calculated as the shortest path between two points on a sphere.
        </p>
      </Card>
    </div>
  );
}
