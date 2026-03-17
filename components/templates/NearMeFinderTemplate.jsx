'use client';

import { useState, useCallback, useRef } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Slider from '@/components/ui/Slider';
import Card from '@/components/ui/Card';
import MapView from '@/components/ui/MapView';
import AddressAutocomplete from '@/components/ui/AddressAutocomplete';

const HAVERSINE_RADIUS = 6371e3; // Earth radius in meters

function getDistance(lat1, lon1, lat2, lon2) {
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dp = ((lat2 - lat1) * Math.PI) / 180;
  const dl = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return HAVERSINE_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function NearMeFinderTemplate({
  title,
  amenityType,
  overpassQuery = null,
  icon = '📍',
  resultFields = [],
  defaultRadius = 2000,
  maxRadius = 5000,
}) {
  const [userLocation, setUserLocation] = useState(null);
  const [postcode, setPostcode] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [radius, setRadius] = useState(defaultRadius);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [sortBy, setSortBy] = useState('distance');
  const [movedCenter, setMovedCenter] = useState(null);
  const lastRequestTime = useRef(0);

  const searchNearby = useCallback(
    async (lat, lon) => {
      // Rate limiting
      const now = Date.now();
      if (now - lastRequestTime.current < 2000) {
        setError('Please wait a moment before searching again');
        return;
      }
      lastRequestTime.current = now;

      setLoading(true);
      setError('');
      setResults([]);

      try {
        const query = overpassQuery || buildOverpassQuery(amenityType, lat, lon, radius);

        const response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: query,
          headers: {
            'User-Agent': 'MyKit.tools/1.0',
          },
        });

        if (!response.ok) throw new Error('Search failed');

        const data = await response.json();
        const items = data.elements || [];

        if (items.length === 0) {
          setError(`No ${title.toLowerCase()} found within ${radius}m`);
          setResults([]);
        } else {
          const processed = items
            .map(item => {
              // Nodes have lat/lon directly; ways/relations have center.lat/center.lon
              const itemLat = item.lat ?? item.center?.lat;
              const itemLon = item.lon ?? item.center?.lon;
              if (itemLat == null || itemLon == null) return null;
              return {
                id: item.id,
                lat: itemLat,
                lon: itemLon,
                name: buildResultName(item.tags),
                distance: getDistance(lat, lon, itemLat, itemLon),
                tags: item.tags || {},
              };
            })
            .filter(Boolean)
            .sort((a, b) => a.distance - b.distance);

          setResults(processed);
        }

        setMapCenter([lat, lon]);
        setMovedCenter(null);
      } catch (err) {
        setError('Failed to search. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    },
    [amenityType, overpassQuery, radius, title]
  );

  const handleMapMoved = useCallback((center) => {
    if (!loading) {
      setMovedCenter(center);
    }
  }, [loading]);

  const handleSearchThisArea = () => {
    if (!movedCenter) return;
    setUserLocation({ lat: movedCenter.lat, lon: movedCenter.lon });
    searchNearby(movedCenter.lat, movedCenter.lon);
  };

  const handleUseLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported in your browser');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        searchNearby(latitude, longitude);
      },
      err => {
        setError('Unable to get your location. Please enter a postcode instead.');
        setLoading(false);
      }
    );
  };

  const handleSearchPostcode = async () => {
    if (!postcode.trim()) {
      setError('Please enter a postcode');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(postcode)},UK&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'MyKit.tools/1.0',
          },
        }
      );

      if (!response.ok) throw new Error('Geocoding failed');

      const data = await response.json();
      if (data.length === 0) {
        setError('Postcode not found. Please try another.');
        setLoading(false);
        return;
      }

      const { lat, lon } = data[0];
      setUserLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
      searchNearby(parseFloat(lat), parseFloat(lon));
    } catch (err) {
      setError('Failed to find postcode. Please try again.');
      setLoading(false);
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const markers = sortedResults.map(result => ({
    lat: result.lat,
    lon: result.lon,
    popup: `${result.name} (${(result.distance / 1000).toFixed(2)}km)`,
  }));

  if (userLocation) {
    markers.unshift({
      lat: userLocation.lat,
      lon: userLocation.lon,
      popup: 'Your location',
      type: 'user',
    });
  }

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-primary">Search Options</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={handleUseLocation}
              disabled={loading}
              variant="primary"
              className="w-full"
            >
              {loading && userLocation ? 'Searching...' : 'Use My Location'}
            </Button>

            <div className="flex gap-2 items-end">
              <AddressAutocomplete
                value={postcode}
                onChange={setPostcode}
                onSelect={(place) => {
                  setUserLocation({ lat: place.lat, lon: place.lon });
                  searchNearby(place.lat, place.lon);
                }}
                placeholder="Type an address or postcode..."
                disabled={loading}
                className="flex-1"
              />
              <Button
                onClick={handleSearchPostcode}
                disabled={loading || !postcode}
                variant="secondary"
                className="shrink-0"
              >
                Search
              </Button>
            </div>
          </div>

          {userLocation && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                ✓ Location found: {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {userLocation && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Search Radius: {radius.toLocaleString()}m ({(radius / 1000).toFixed(1)}km)
                </label>
                <Slider
                  value={radius}
                  onChange={setRadius}
                  min={500}
                  max={maxRadius}
                  step={500}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Map */}
      {userLocation && (
        <Card className="p-0 overflow-hidden relative">
          <MapView
            center={mapCenter}
            zoom={15}
            markers={markers}
            height="500px"
            onMoveEnd={handleMapMoved}
          />
          {movedCenter && !loading && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
              <button
                onClick={handleSearchThisArea}
                className="bg-white text-text-primary text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-border hover:bg-surface transition-colors cursor-pointer"
              >
                Search this area
              </button>
            </div>
          )}
          {loading && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
              <div className="bg-white text-text-secondary text-sm px-4 py-2 rounded-full shadow-lg border border-border">
                Searching...
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Results */}
      {sortedResults.length > 0 && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-primary">
                {icon} Found {sortedResults.length} {title.toLowerCase()}
              </h3>
              <Select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                options={[
                  { value: 'distance', label: 'Distance' },
                  { value: 'name', label: 'Name' },
                ]}
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sortedResults.map(result => (
                <div
                  key={result.id}
                  className="p-3 bg-surface rounded-lg border border-border hover:border-border-hover transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-primary">{result.name}</p>
                      <p className="text-sm text-secondary mt-1">
                        <span className="font-mono">
                          {(result.distance / 1000).toFixed(2)}km away
                        </span>
                      </p>
                      {resultFields.length > 0 && (
                        <div className="text-xs text-muted mt-2 space-y-1">
                          {resultFields.map(field => {
                            const value = result.tags[field.key];
                            return value ? (
                              <p key={field.key}>
                                <span className="font-medium">{field.label}:</span> {value}
                              </p>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                    <a
                      href={`https://maps.openstreetmap.org/?mlat=${result.lat}&mlon=${result.lon}&zoom=16`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-hover text-sm ml-4 whitespace-nowrap"
                    >
                      View map
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function buildResultName(tags) {
  if (!tags) return 'Unknown location';

  // Use the actual name if available
  if (tags.name) return tags.name;

  // Try operator (common for defibrillators, cash machines, EV chargers)
  if (tags.operator) return tags.operator;

  // Try brand (common for ATMs, chargers)
  if (tags.brand) return tags.brand;

  // Try to build a street address
  const street = tags['addr:street'];
  const houseNum = tags['addr:housenumber'];
  if (street) {
    return houseNum ? `${houseNum} ${street}` : street;
  }

  // Try location description (common for defibrillators)
  if (tags['defibrillator:location']) return tags['defibrillator:location'];
  if (tags.description) return tags.description;

  // Try the leisure/amenity type as a last resort with a readable label
  const type = tags.amenity || tags.leisure || tags.emergency;
  if (type) {
    return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  return 'Unknown location';
}

function buildOverpassQuery(amenityType, lat, lon, radius) {
  const [key, value] = amenityType.split('=');
  return `[out:json][timeout:10];(node["${key}"="${value}"](around:${radius},${lat},${lon});way["${key}"="${value}"](around:${radius},${lat},${lon});relation["${key}"="${value}"](around:${radius},${lat},${lon}););out body center;`;
}
