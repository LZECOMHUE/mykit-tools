'use client';

import { useState } from 'react';
import AddressAutocomplete from '@/components/ui/AddressAutocomplete';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import MapView from '@/components/ui/MapView';

export default function SchoolRunCalculator() {
  const [homeAddress, setHomeAddress] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [homeCoords, setHomeCoords] = useState(null);
  const [schoolCoords, setSchoolCoords] = useState(null);
  const [costPerMile, setCostPerMile] = useState('0.45');
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

  const getRoute = async (fromLat, fromLon, toLat, toLon, mode) => {
    try {
      const modeMap = { walking: 'foot', driving: 'car', cycling: 'bike' };
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/${modeMap[mode]}/${fromLon},${fromLat};${toLon},${toLat}?overview=full&geometries=geojson`,
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
        distance: data.routes[0].distance,
        duration: data.routes[0].duration,
      };
    } catch (err) {
      console.error('Route error:', err);
      return null;
    }
  };

  const handleCalculate = async () => {
    // Use autocomplete coords if available, otherwise geocode the text
    let home = homeCoords;
    let school = schoolCoords;

    if (!home && homeAddress.trim()) {
      home = await geocodeAddress(homeAddress);
    }
    if (!school && schoolAddress.trim()) {
      school = await geocodeAddress(schoolAddress);
    }

    if (!home || !school) {
      setError('Please enter both home and school addresses');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      if (!home) {
        setError('Could not find home address');
        setLoading(false);
        return;
      }

      if (!school) {
        setError('Could not find school address');
        setLoading(false);
        return;
      }

      // Get all three routes
      const [walkRoute, driveRoute, cycleRoute] = await Promise.all([
        getRoute(home.lat, home.lon, school.lat, school.lon, 'walking'),
        getRoute(home.lat, home.lon, school.lat, school.lon, 'driving'),
        getRoute(home.lat, home.lon, school.lat, school.lon, 'cycling'),
      ]);

      if (!walkRoute || !driveRoute || !cycleRoute) {
        setError('Could not calculate routes');
        setLoading(false);
        return;
      }

      // Convert to miles
      const driveDistanceMiles = (driveRoute.distance / 1609.34);
      const driveTimeMinutes = Math.round(driveRoute.duration / 60);
      const walkDistanceMiles = (walkRoute.distance / 1609.34);
      const walkTimeMinutes = Math.round(walkRoute.duration / 60);
      const cycleTimeMinutes = Math.round(cycleRoute.duration / 60);

      // Calculate annual costs
      const costPerMileNum = parseFloat(costPerMile) || 0.45;
      const drivingCost = driveDistanceMiles * 2 * 190 * costPerMileNum;
      const pencePerMile = costPerMileNum * 100;

      setResult({
        home,
        school,
        walking: {
          distanceMiles: walkDistanceMiles,
          timeMinutes: walkTimeMinutes,
        },
        driving: {
          distanceMiles: driveDistanceMiles,
          timeMinutes: driveTimeMinutes,
          costPerMile: costPerMileNum,
          annualCost: drivingCost,
        },
        cycling: {
          timeMinutes: cycleTimeMinutes,
        },
      });

      setMapCenter([home.lat, home.lon]);
      setMarkers([
        { lat: home.lat, lon: home.lon, popup: 'Home', color: 'green' },
        { lat: school.lat, lon: school.lon, popup: 'School', color: 'red' },
      ]);
    } catch (err) {
      setError('Failed to calculate routes. Please try again.');
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-primary">School Run Calculator</h3>

          <div className="space-y-3">
            <AddressAutocomplete
              label="Home Address"
              value={homeAddress}
              onChange={setHomeAddress}
              onSelect={(place) => {
                setHomeCoords({ lat: place.lat, lon: place.lon, name: place.displayName });
              }}
              placeholder="e.g. 123 Main Street, London"
              disabled={loading}
            />

            <AddressAutocomplete
              label="School Address"
              value={schoolAddress}
              onChange={setSchoolAddress}
              onSelect={(place) => {
                setSchoolCoords({ lat: place.lat, lon: place.lon, name: place.displayName });
              }}
              placeholder="e.g. Primary School, London"
              disabled={loading}
            />

            <Input
              label="Cost per Mile (pence)"
              value={costPerMile}
              onChange={e => setCostPerMile(e.target.value)}
              placeholder="0.45"
              type="number"
              disabled={loading}
              step="0.01"
            />

            <Button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Calculating...' : 'Calculate School Run'}
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
              zoom={13}
              markers={markers}
              height="400px"
            />
          </Card>

          <Card>
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Walking Option</h3>
                <div className="p-4 bg-surface rounded-lg border border-border space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Distance</span>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {result.walking.distanceMiles.toFixed(2)} miles
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Time (one way)</span>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {result.walking.timeMinutes} minutes
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border text-sm text-muted">
                    Health benefit: Free, healthy exercise for child
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Driving Option</h3>
                <div className="p-4 bg-surface rounded-lg border border-border space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Distance (one way)</span>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {result.driving.distanceMiles.toFixed(2)} miles
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Time (one way)</span>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {result.driving.timeMinutes} minutes
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-secondary font-medium">Annual cost (at {result.driving.costPerMile}p/mile)</span>
                    <span className="font-mono text-2xl font-bold text-accent">
                      £{result.driving.annualCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-muted">
                    Based on 2 trips per day (to and from), 190 school days per year
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Cycling Option</h3>
                <div className="p-4 bg-surface rounded-lg border border-border space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Estimated Time (one way)</span>
                    <span className="font-mono text-lg font-semibold text-primary">
                      {result.cycling.timeMinutes} minutes
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border text-sm text-muted">
                    Estimated using 1.5x walking speed (4.5 mph average cycling pace)
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted p-3 bg-surface rounded-lg">
                <p>Cost estimates use the standard HMRC rate of {result.driving.costPerMile}p per mile. Actual costs may vary based on fuel prices, vehicle efficiency, and maintenance.</p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
