'use client';

import { useState } from 'react';
import AddressAutocomplete from '@/components/ui/AddressAutocomplete';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import MapView from '@/components/ui/MapView';

const WALKING_PACES = {
  slow: { mph: 3, name: 'Slow (3 mph)', color: 'bg-info' },
  normal: { mph: 3.5, name: 'Normal (3.5 mph)', color: 'bg-success' },
  brisk: { mph: 4, name: 'Brisk (4 mph)', color: 'bg-warning' },
  fast: { mph: 4.5, name: 'Fast (4.5 mph)', color: 'bg-error' },
};

export default function WalkingTimeCalculator() {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [markers, setMarkers] = useState([]);

  const geocodeAddress = async address => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)},UK&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'MyKit.tools/1.0',
          },
        }
      );

      if (!response.ok) throw new Error('Geocoding failed');

      const data = await response.json();
      if (data.length === 0) return null;

      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        name: data[0].display_name,
      };
    } catch (err) {
      console.error('Geocoding error:', err);
      return null;
    }
  };

  const getRoute = async (fromLat, fromLon, toLat, toLon) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/foot/${fromLon},${fromLat};${toLon},${toLat}?overview=full&geometries=geojson`,
        {
          headers: {
            'User-Agent': 'MyKit.tools/1.0',
          },
        }
      );

      if (!response.ok) throw new Error('Route calculation failed');

      const data = await response.json();
      if (data.routes.length === 0) throw new Error('No route found');

      return {
        distance: data.routes[0].distance, // meters
        duration: data.routes[0].duration, // seconds
        geometry: data.routes[0].geometry,
      };
    } catch (err) {
      console.error('Route error:', err);
      return null;
    }
  };

  const handleCalculate = async () => {
    // Use autocomplete coords if available, otherwise geocode the text
    let from = fromCoords;
    let to = toCoords;

    if (!from && fromAddress.trim()) {
      from = await geocodeAddress(fromAddress);
    }
    if (!to && toAddress.trim()) {
      to = await geocodeAddress(toAddress);
    }

    if (!from || !to) {
      setError('Please enter both addresses');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      if (!from) {
        setError('Could not find starting address');
        setLoading(false);
        return;
      }

      if (!to) {
        setError('Could not find destination address');
        setLoading(false);
        return;
      }

      const route = await getRoute(from.lat, from.lon, to.lat, to.lon);
      if (!route) {
        setError('Could not calculate route');
        setLoading(false);
        return;
      }

      const distanceKm = route.distance / 1000;
      const distanceMiles = distanceKm * 0.621371;

      const times = {};
      Object.entries(WALKING_PACES).forEach(([key, pace]) => {
        const hours = route.duration / 3600 / (pace.mph / 3.5);
        times[key] = {
          hours: Math.floor(hours),
          minutes: Math.round((hours % 1) * 60),
        };
      });

      setResult({
        from,
        to,
        distance: {
          km: distanceKm,
          miles: distanceMiles,
        },
        times,
        duration: route.duration,
      });

      setMapCenter([from.lat, from.lon]);
      setMarkers([
        { lat: from.lat, lon: from.lon, popup: `Start: ${from.name}`, color: 'green' },
        { lat: to.lat, lon: to.lon, popup: `End: ${to.name}`, color: 'red' },
      ]);
    } catch (err) {
      setError('Failed to calculate route. Please try again.');
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-primary">Route Details</h3>

          <div className="space-y-3">
            <AddressAutocomplete
              label="Starting Address"
              value={fromAddress}
              onChange={setFromAddress}
              onSelect={(place) => {
                setFromCoords({ lat: place.lat, lon: place.lon, name: place.displayName });
              }}
              placeholder="e.g. London Bridge, London"
              disabled={loading}
            />

            <AddressAutocomplete
              label="Destination Address"
              value={toAddress}
              onChange={setToAddress}
              onSelect={(place) => {
                setToCoords({ lat: place.lat, lon: place.lon, name: place.displayName });
              }}
              placeholder="e.g. Tower Bridge, London"
              disabled={loading}
            />

            <Button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Calculating...' : 'Calculate Walking Route'}
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-error bg-opacity-10 rounded-lg">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}
        </div>
      </Card>

      {result && (
        <>
          <Card className="p-0 overflow-hidden">
            <MapView
              center={mapCenter}
              zoom={14}
              markers={markers}
              height="400px"
            />
          </Card>

          <Card>
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Distance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-surface rounded-lg">
                    <p className="text-sm text-secondary">Kilometers</p>
                    <p className="font-mono text-2xl font-semibold text-primary mt-2">
                      {result.distance.km.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-surface rounded-lg">
                    <p className="text-sm text-secondary">Miles</p>
                    <p className="font-mono text-2xl font-semibold text-primary mt-2">
                      {result.distance.miles.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Walking Time</h3>
                <div className="space-y-3">
                  {Object.entries(WALKING_PACES).map(([key, pace]) => {
                    const time = result.times[key];
                    return (
                      <div
                        key={key}
                        className={`p-4 rounded-lg border border-border ${pace.color} bg-opacity-5`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-primary">{pace.name}</span>
                          <span className="font-mono text-lg font-semibold text-primary">
                            {time.hours > 0 ? `${time.hours}h ` : ''}{time.minutes}m
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-xs text-muted p-3 bg-surface rounded-lg">
                <p>Times estimated based on typical walking speeds. Actual times may vary based on terrain, fitness level, and route conditions.</p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
