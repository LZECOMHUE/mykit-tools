'use client';

import { useState, useRef } from 'react';
import AddressAutocomplete from '@/components/ui/AddressAutocomplete';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import MapView from '@/components/ui/MapView';

export default function PubDensityMap() {
  const [postcode, setPostcode] = useState('');
  const [coords, setCoords] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [markers, setMarkers] = useState([]);
  const lastRequestTime = useRef(0);

  const handleSearch = async () => {
    // Use autocomplete coords if available, otherwise geocode the text
    let userCoords = coords;

    if (!userCoords && postcode.trim()) {
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(postcode)},UK&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'MyKit.tools/1.0',
          },
        }
      );

      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.length > 0) {
          userCoords = { lat: parseFloat(geoData[0].lat), lon: parseFloat(geoData[0].lon), displayName: geoData[0].display_name };
        }
      }
    }

    if (!userCoords) {
      setError('Please enter a postcode or city name');
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastRequestTime.current < 2000) {
      setError('Please wait a moment before searching again');
      return;
    }
    lastRequestTime.current = now;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const lat = userCoords.lat;
      const lon = userCoords.lon;

      // Query for pubs within visible area
      const overpassQuery = `[out:json][timeout:10];node["amenity"="pub"](around:2000,${lat},${lon});out body;`;

      const pubResponse = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery,
        headers: {
          'User-Agent': 'MyKit.tools/1.0',
        },
      });

      if (!pubResponse.ok) throw new Error('Pub search failed');

      const pubData = await pubResponse.json();
      const pubs = pubData.elements || [];

      if (pubs.length === 0) {
        setError('No pubs found in this area within 2km');
        setLoading(false);
        return;
      }

      // Count pubs within 1km
      const pubsWithin1km = pubs.filter(pub => {
        const distance = Math.sqrt((pub.lat - lat) ** 2 + (pub.lon - lon) ** 2) * 111;
        return distance < 1;
      }).length;

      const pubMarkers = pubs.map(pub => ({
        lat: pub.lat,
        lon: pub.lon,
        popup: pub.tags?.name || pub.tags?.operator || pub.tags?.brand || pub.tags?.['addr:street'] || 'Pub',
      }));

      pubMarkers.push({
        lat,
        lon,
        popup: 'Your search location',
        type: 'user',
      });

      setResult({
        totalPubs: pubs.length,
        pubsWithin1km,
        location: userCoords.displayName,
      });

      setMapCenter([lat, lon]);
      setMarkers(pubMarkers);
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-primary">Pub Density Finder</h3>

          <div className="space-y-3">
            <AddressAutocomplete
              label="City or Postcode (UK)"
              value={postcode}
              onChange={setPostcode}
              onSelect={(place) => {
                setCoords({ lat: place.lat, lon: place.lon, displayName: place.displayName });
              }}
              placeholder="e.g. London, Dublin Street, Manchester"
              disabled={loading}
            />

            <Button
              onClick={handleSearch}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Searching...' : 'Find Pubs'}
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
              zoom={15}
              markers={markers}
              height="500px"
            />
          </Card>

          <Card>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-secondary mb-2">Location</p>
                <p className="font-heading text-lg text-primary">{result.location}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-surface rounded-lg border border-accent border-opacity-30">
                  <p className="text-sm text-secondary">Pubs Within 1km</p>
                  <p className="font-mono text-3xl font-bold text-accent mt-2">
                    {result.pubsWithin1km}
                  </p>
                  <p className="text-xs text-muted mt-2">of {result.totalPubs} total in 2km radius</p>
                </div>

                <div className="p-4 bg-surface rounded-lg border border-accent-warm border-opacity-30">
                  <p className="text-sm text-secondary">Pubs per km²</p>
                  <p className="font-mono text-3xl font-bold text-accent-warm mt-2">
                    {(result.pubsWithin1km / (Math.PI * 1 ** 2)).toFixed(1)}
                  </p>
                  <p className="text-xs text-muted mt-2">in 1km radius</p>
                </div>
              </div>

              <div className="text-xs text-muted p-3 bg-surface rounded-lg">
                <p>Pub density is measured as the number of pubs per square kilometer within a 1km radius of your search location. Data sourced from OpenStreetMap.</p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
