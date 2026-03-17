# Map Tools Code Examples

## Example 1: Add Hospital Finder

```javascript
// components/map-tools/NearestHospitalFinder.jsx
'use client';

import NearMeFinderTemplate from '@/components/templates/NearMeFinderTemplate';

export default function NearestHospitalFinder() {
  return (
    <NearMeFinderTemplate
      title="Hospitals"
      amenityType="amenity=hospital"
      icon="🏥"
      resultFields={[
        { key: 'phone', label: 'Phone' },
        { key: 'website', label: 'Website' },
        { key: 'emergency', label: '24h Emergency' },
      ]}
      defaultRadius={5000}
      maxRadius={10000}
    />
  );
}
```

## Example 2: OSM Amenity Types Reference

Common OpenStreetMap amenity types for creating new tools:

```javascript
// Amenities
'amenity=hospital'              // Hospitals
'amenity=doctors'               // Doctor offices
'amenity=dentist'               // Dentists
'amenity=pharmacy'              // Pharmacies
'amenity=cafe'                  // Coffee/Cafes
'amenity=restaurant'            // Restaurants
'amenity=pub'                   // Pubs/Bars
'amenity=library'               // Libraries
'amenity=police'                // Police stations
'amenity=fire_station'          // Fire departments
'amenity=parking'               // Parking areas
'amenity=fuel'                  // Gas stations
'amenity=bank'                  // Banks
'amenity=post_office'           // Post offices

// Leisure
'leisure=park'                  // Parks
'leisure=playground'            // Playgrounds
'leisure=swimming_pool'         // Swimming pools
'leisure=gym'                   // Gyms/Fitness centers

// Emergency
'emergency=defibrillator'       // AEDs
'emergency=phone'               // Emergency phones
```

## Example 3: Custom Tool Using MapView

```javascript
// components/map-tools/CustomMapTool.jsx
'use client';

import { useState } from 'react';
import MapView from '@/components/ui/MapView';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CustomMapTool() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [markers, setMarkers] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${location},UK&format=json`,
      { headers: { 'User-Agent': 'MyKit.tools/1.0' } }
    );

    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      setMapCenter([lat, lon]);
      setMarkers([{ lat: parseFloat(lat), lon: parseFloat(lon), popup: location }]);
      setResult(data[0]);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Input
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter a location"
        />
        <Button onClick={handleSearch} className="mt-4">Search</Button>
      </Card>

      {result && (
        <MapView center={mapCenter} zoom={14} markers={markers} height="500px" />
      )}
    </div>
  );
}
```

## Example 4: Haversine Distance Calculation

```javascript
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const deltaLat = (lat2 - lat1) * Math.PI / 180;
  const deltaLon = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) ** 2 +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.asin(Math.sqrt(a));

  return R * c; // Returns distance in kilometers
}

// Usage:
const distanceKm = haversineDistance(51.5074, -0.1278, 48.8566, 2.3522);
console.log(`London to Paris: ${distanceKm.toFixed(1)}km`);
```

## Example 5: OSRM Route Calculation

```javascript
async function calculateRoute(fromLat, fromLon, toLat, toLon, mode = 'foot') {
  // mode: 'foot' (walking), 'car' (driving), 'bike' (cycling)

  const url =
    `https://router.project-osrm.org/route/v1/${mode}/` +
    `${fromLon},${fromLat};${toLon},${toLat}` +
    `?overview=full&geometries=geojson`;

  const response = await fetch(url, {
    headers: { 'User-Agent': 'MyKit.tools/1.0' }
  });

  const data = await response.json();

  if (!data.routes || data.routes.length === 0) {
    throw new Error('No route found');
  }

  const route = data.routes[0];

  return {
    distanceMeters: route.distance,
    durationSeconds: route.duration,
    distanceKm: route.distance / 1000,
    distanceMiles: route.distance / 1609.34,
    durationMinutes: route.duration / 60,
    geometry: route.geometry,
  };
}
```

## Example 6: Error Handling Pattern

```javascript
'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

export default function SafeMapTool() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (address) => {
    setLoading(true);
    setError('');

    try {
      if (!address || address.trim().length === 0) {
        throw new Error('Please enter an address');
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`,
        {
          headers: { 'User-Agent': 'MyKit.tools/1.0' },
          signal: controller.signal
        }
      );

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error('Search service is unavailable');
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error('Location not found');
      }

      return data[0];

    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Search timed out. Please try again.');
      } else {
        setError(err.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Card className="p-4 bg-error bg-opacity-10 border border-error rounded-lg">
          <p className="text-error text-sm">{error}</p>
        </Card>
      )}
    </>
  );
}
```

## Example 7: Rate Limiting Pattern

```javascript
const lastRequestTime = useRef(0);

const rateLimit = () => {
  const now = Date.now();
  if (now - lastRequestTime.current < 2000) {
    return false; // Too soon, reject
  }
  lastRequestTime.current = now;
  return true; // OK to proceed
};

const handleSearch = () => {
  if (!rateLimit()) {
    setError('Please wait before searching again');
    return;
  }
  // Proceed with search
};
```

## Example 8: Customizing Search Radius

```javascript
// Large search area for hospitals
<NearMeFinderTemplate
  title="Hospitals"
  amenityType="amenity=hospital"
  defaultRadius={5000}    // 5km
  maxRadius={20000}       // 20km
/>

// Small search area for coffee shops
<NearMeFinderTemplate
  title="Coffee Shops"
  amenityType="amenity=cafe"
  defaultRadius={500}     // 500m
  maxRadius={3000}        // 3km
/>

// Medium search area for parks
<NearMeFinderTemplate
  title="Parks"
  amenityType="leisure=park"
  defaultRadius={2000}    // 2km
  maxRadius={5000}        // 5km
/>
```

## Example 9: Adding New Tool to Registry

```javascript
// In lib/tool-registry.js:

{
  slug: "nearest-library-finder",
  name: "Nearest Library Finder",
  description: "Find libraries near you with opening hours and contact details on an interactive map",
  category: "education",
  tags: ["map", "library", "location", "books", "learning"],
  keywords: "nearest library, find library near me, library locator map, public library finder",
  tier: 2,
  hasSave: false,
  hasPremiumExport: false,
  hasAI: false,
  hasMultipleVariants: false,
  seoTitle: null,
  ogImage: null,
  relatedSlugs: ["nearest-park-finder", "walking-route-calculator"],
  dateAdded: "2026-03-16",
  lastReviewed: "2026-03-16",
}
```

## Example 10: Nominatim Geocoding

```javascript
async function geocodeAddress(address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'MyKit.tools/1.0',
        },
      }
    );

    if (!response.ok) throw new Error('Geocoding failed');

    const data = await response.json();
    if (data.length === 0) throw new Error('Location not found');

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      name: data[0].display_name,
      boundingBox: data[0].boundingbox,
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}
```

These examples demonstrate how to extend the map tools framework for your needs.
