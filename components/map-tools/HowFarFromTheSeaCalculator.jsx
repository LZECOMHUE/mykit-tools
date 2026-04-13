'use client';

import { useState } from 'react';
import AddressAutocomplete from '@/components/ui/AddressAutocomplete';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import MapView from '@/components/ui/MapView';

// Pre-computed list of UK coastal points (lat, lon, name)
const COASTAL_POINTS = [
  { lat: 50.735, lon: -1.8883, name: 'Southend-on-Sea' },
  { lat: 51.4532, lon: 0.0038, name: 'Southend Pier' },
  { lat: 51.338, lon: -0.04, name: 'Brighton Beach' },
  { lat: 50.8173, lon: -0.0754, name: 'Dover' },
  { lat: 51.2176, lon: 1.3826, name: 'Whitstable' },
  { lat: 54.6036, lon: -1.5888, name: 'Scarborough' },
  { lat: 54.1165, lon: -3.1754, name: 'Whitehaven' },
  { lat: 55.3837, lon: -3.5142, name: 'Eyemouth' },
  { lat: 56.4588, lon: -2.967, name: 'St Abbs' },
  { lat: 57.1451, lon: -2.1249, name: 'Montrose' },
  { lat: 56.9707, lon: -3.1872, name: 'Leuchars' },
  { lat: 55.9167, lon: -3.1333, name: 'Dunnet Head' },
  { lat: 58.5667, lon: -3.0667, name: 'Thurso' },
  { lat: 57.4667, lon: -4.25, name: 'Ullapool' },
  { lat: 57.4833, lon: -6.3833, name: 'Glenelg' },
  { lat: 57.8667, lon: -7.9833, name: 'Dunvegan' },
  { lat: 57.96, lon: -7.1742, name: 'Portree' },
  { lat: 57.3, lon: -4.4, name: 'Applecross' },
  { lat: 56.3833, lon: -3.5, name: 'Stranraer' },
  { lat: 54.75, lon: -3.25, name: 'Maryport' },
  { lat: 54.3583, lon: -3.2667, name: 'Barrow-in-Furness' },
  { lat: 53.9, lon: -3.3, name: 'Liverpool' },
  { lat: 53.3611, lon: -2.9092, name: 'Wirral' },
  { lat: 52.7083, lon: -3.1667, name: 'Aberystwyth' },
  { lat: 51.8647, lon: -3.0217, name: 'Porthcawl' },
  { lat: 51.4184, lon: -3.3667, name: 'Barry' },
  { lat: 51.8378, lon: -5.3269, name: 'Cardigan' },
  { lat: 52.0089, lon: -5.5283, name: 'Newquay, Wales' },
  { lat: 51.5, lon: -5.1667, name: 'Tenby' },
  { lat: 50.5833, lon: -5.0667, name: 'Mousehole' },
  { lat: 50.4389, lon: -4.7639, name: 'Plymouth' },
  { lat: 50.7184, lon: -4.4142, name: 'Exmouth' },
  { lat: 50.7447, lon: -3.0262, name: 'Bournemouth' },
  { lat: 50.7194, lon: -1.9014, name: 'Lymington' },
  { lat: 50.9, lon: -1.4, name: 'Portsmouth' },
  { lat: 51.1217, lon: -1.3006, name: 'Isle of Wight' },
  { lat: 52.7167, lon: 1.3167, name: 'Great Yarmouth' },
  { lat: 52.9283, lon: 1.1592, name: 'Cromer' },
  { lat: 53.2, lon: 0.5, name: 'Skegness' },
  { lat: 53.6442, lon: -0.0683, name: 'Cleethorpes' },
  { lat: 54.1089, lon: 0.2909, name: 'Filey' },
];

function getDistance(lat1, lon1, lat2, lon2) {
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

export default function HowFarFromTheSeaCalculator() {
  const [postcode, setPostcode] = useState('');
  const [coords, setCoords] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [markers, setMarkers] = useState([]);

  const handleCalculate = async () => {
    // Use autocomplete coords if available, otherwise geocode the text
    let userCoords = coords;

    if (!userCoords && postcode.trim()) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(postcode)},UK&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'MyKit.tools/1.0',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          userCoords = { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        }
      }
    }

    if (!userCoords) {
      setError('Please enter a postcode or address');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const userLat = userCoords.lat;
      const userLon = userCoords.lon;

      // Find nearest coastal point
      let nearest = null;
      let minDistance = Infinity;

      COASTAL_POINTS.forEach(point => {
        const dist = getDistance(userLat, userLon, point.lat, point.lon);
        if (dist < minDistance) {
          minDistance = dist;
          nearest = { ...point, distance: dist };
        }
      });

      if (nearest) {
        const miles = nearest.distance * 0.621371;

        setResult({
          userLat,
          userLon,
          nearest,
          miles,
          km: nearest.distance,
        });

        setMapCenter([userLat, userLon]);
        setMarkers([
          { lat: userLat, lon: userLon, popup: 'Your location', type: 'user' },
          { lat: nearest.lat, lon: nearest.lon, popup: `Nearest coast: ${nearest.name}`, color: 'amber' },
        ]);
      }
    } catch (err) {
      setError('Failed to calculate. Please try again.');
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-primary">Find Your Distance to the Sea</h3>

          <div className="space-y-3">
            <AddressAutocomplete
              label="UK Postcode or Address"
              value={postcode}
              onChange={setPostcode}
              onSelect={(place) => {
                setCoords({ lat: place.lat, lon: place.lon });
              }}
              placeholder="e.g. SW1A 1AA, London"
              disabled={loading}
            />

            <Button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Calculating...' : 'How Far to the Sea?'}
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
              zoom={9}
              markers={markers}
              height="400px"
            />
          </Card>

          <Card>
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Distance to Nearest Coast</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-success bg-opacity-10 rounded-lg border border-success border-opacity-20">
                    <p className="text-sm text-success font-medium">Miles</p>
                    <p className="font-mono text-3xl font-bold text-success mt-2">
                      {result.miles.toFixed(1)}
                    </p>
                  </div>
                  <div className="p-4 bg-success bg-opacity-10 rounded-lg border border-success border-opacity-20">
                    <p className="text-sm text-success font-medium">Kilometers</p>
                    <p className="font-mono text-3xl font-bold text-success mt-2">
                      {result.km.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Nearest Coastal Point</h3>
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <p className="font-heading text-lg text-primary mb-2">{result.nearest.name}</p>
                  <p className="text-sm text-secondary">
                    Coordinates: <span className="font-mono">{result.nearest.lat.toFixed(4)}, {result.nearest.lon.toFixed(4)}</span>
                  </p>
                </div>
              </div>

              <div className="text-xs text-muted p-3 bg-surface rounded-lg">
                <p>This calculates the straight-line distance (as the crow flies) to the nearest major UK coastal point. Actual travel distance may be significantly longer depending on terrain and available routes.</p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
