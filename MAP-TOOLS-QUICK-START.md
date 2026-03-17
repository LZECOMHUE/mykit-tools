# Map Tools Quick Start Guide

## Installation

Already done! Dependencies installed:
```bash
npm install leaflet react-leaflet
```

## Files Created

### Foundation (2 files)
- `components/ui/MapView.jsx` - Reusable Leaflet map component
- `components/templates/NearMeFinderTemplate.jsx` - Reusable amenity finder

### Tools (10 files in components/map-tools/)
1. `NearestPlaygroundFinder.jsx`
2. `NearestDefibrillatorFinder.jsx`
3. `NearestPublicToiletFinder.jsx`
4. `NearestEVChargerFinder.jsx`
5. `NearestCashMachineFinder.jsx`
6. `NearestParkFinder.jsx`
7. `WalkingTimeCalculator.jsx`
8. `HowFarFromTheSeaCalculator.jsx`
9. `PubDensityMap.jsx`
10. `SchoolRunCalculator.jsx`

### Pages (10 files in app/(tools)/)
- All 10 tools have corresponding page.jsx files

### Registry
- `lib/tool-registry.js` - Updated with 10 new tool entries

## How Each Tool Works

### Template-Based Tools (7 tools)

These tools all use the NearMeFinderTemplate which:

1. Gets user location via browser geolocation OR
2. Geocodes a postcode via Nominatim
3. Queries Overpass API for nearby amenities
4. Displays results on a map + sorted list

**Example - Playgrounds:**
```javascript
import NearMeFinderTemplate from '@/components/templates/NearMeFinderTemplate';

export default function NearestPlaygroundFinder() {
  return (
    <NearMeFinderTemplate
      title="Playgrounds"
      amenityType="leisure=playground"
      icon="🛝"
      resultFields={[
        { key: 'surface', label: 'Surface' },
        { key: 'access', label: 'Access' },
      ]}
      defaultRadius={2000}
      maxRadius={5000}
    />
  );
}
```

To add a new template-based tool, just change the `amenityType` and `resultFields`.

### Custom Tools (3 tools)

These have custom logic:

**WalkingTimeCalculator**
- User inputs two addresses
- Nominatim geocodes both
- OSRM calculates walking route
- Displays distance + time for 4 different paces

**HowFarFromTheSeaCalculator**
- User enters UK postcode
- Nominatim geocodes to lat/lon
- Haversine formula finds nearest pre-computed coastal point
- Shows distance in miles/km

**SchoolRunCalculator**
- User inputs home and school addresses
- OSRM calculates walking, driving, and cycling routes
- Shows time + annual cost for driving
- Uses configurable cost per mile

**PubDensityMap**
- User enters city/postcode
- Overpass finds all pubs within 2km
- Displays on map and calculates density stats

## Key APIs and Rate Limits

| API | Endpoint | Limit | Usage |
|-----|----------|-------|-------|
| Nominatim | nominatim.openstreetmap.org | 1/sec | Address geocoding |
| Overpass | overpass-api.de | 30-40/min | Find amenities |
| OSRM | router.project-osrm.org | Reasonable | Calculate routes |

All requests include `User-Agent: MyKit.tools/1.0` header.

## Common Patterns

### Pattern 1: Get User Location
```javascript
navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  // Use latitude, longitude
});
```

### Pattern 2: Geocode Address
```javascript
const response = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${address},UK&format=json&limit=1`,
  { headers: { 'User-Agent': 'MyKit.tools/1.0' } }
);
const data = await response.json();
const { lat, lon } = data[0];
```

### Pattern 3: Query Overpass
```javascript
const query = `[out:json][timeout:10];node["amenity"="pub"](around:2000,${lat},${lon});out body;`;
const response = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  body: query,
  headers: { 'User-Agent': 'MyKit.tools/1.0' }
});
```

### Pattern 4: Calculate Distance (Haversine)
```javascript
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
```

### Pattern 5: Query OSRM for Route
```javascript
const response = await fetch(
  `https://router.project-osrm.org/route/v1/foot/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`,
  { headers: { 'User-Agent': 'MyKit.tools/1.0' } }
);
const route = await response.json();
const distanceMeters = route.routes[0].distance;
const durationSeconds = route.routes[0].duration;
```

## Testing a Tool Locally

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/nearest-park-finder`
3. Click "Use My Location" (requires browser permission)
4. Or enter a postcode: "SW1A 1AA"
5. Results display on map with list below

## Customization Examples

### Add a New Template-Based Tool

Create `components/map-tools/NearestLibraryFinder.jsx`:

```javascript
'use client';
import NearMeFinderTemplate from '@/components/templates/NearMeFinderTemplate';

export default function NearestLibraryFinder() {
  return (
    <NearMeFinderTemplate
      title="Libraries"
      amenityType="amenity=library"
      icon="📚"
      resultFields={[
        { key: 'opening_hours', label: 'Hours' },
        { key: 'website', label: 'Website' },
      ]}
      defaultRadius={2000}
      maxRadius={5000}
    />
  );
}
```

Then add to registry in `lib/tool-registry.js`:

```javascript
{
  slug: "nearest-library-finder",
  name: "Nearest Library Finder",
  description: "Find libraries near you with our interactive map...",
  category: "education",
  tags: ["map", "library", "location"],
  keywords: "nearest library, find library near me, library locator",
  tier: 2,
  hasSave: false, hasPremiumExport: false, hasAI: false, hasMultipleVariants: false,
  seoTitle: null, ogImage: null,
  relatedSlugs: null,
  dateAdded: "2026-03-16", lastReviewed: "2026-03-16",
}
```

Create `app/(tools)/nearest-library-finder/page.jsx`:

```javascript
import { getToolBySlug } from '@/lib/tool-registry';
import { generateToolMeta } from '@/lib/seo';
import NearestLibraryFinder from '@/components/map-tools/NearestLibraryFinder';
import AdSlot from '@/components/premium/AdSlot';
import SEOContent from '@/components/tools/SEOContent';

export async function generateMetadata() {
  return generateToolMeta(getToolBySlug('nearest-library-finder'));
}

export default function NearestLibraryFinderPage() {
  const tool = getToolBySlug('nearest-library-finder');
  return (
    <>
      <h1 className="font-heading text-3xl font-bold text-primary">{tool.name}</h1>
      <p className="text-secondary mt-2">{tool.description}</p>
      <AdSlot position="above-tool" />
      <NearestLibraryFinder />
      <AdSlot position="below-tool" />
      <SEOContent slug="nearest-library-finder" />
    </>
  );
}
```

That's it! Sitemap, navigation, and search all auto-update.

## Troubleshooting

### Map Won't Load
- Check browser console for Leaflet errors
- Verify MapView component is client-side (has 'use client')
- Check that react-leaflet is installed

### No Results Found
- Confirm location is correct
- Try a larger search radius
- Check Overpass API is responding (test in browser)
- Verify amenity type exists in OpenStreetMap

### Geolocation Permission Denied
- Tool falls back to postcode input
- User can manually enter address
- No error shown to user

### CORS Errors
- Overpass API supports CORS by default
- Nominatim might block direct requests (fall back to search box)
- OSRM should work fine

## Component Imports

All components use standard imports:
```javascript
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Slider from '@/components/ui/Slider';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import MapView from '@/components/ui/MapView';
import NearMeFinderTemplate from '@/components/templates/NearMeFinderTemplate';
```

## Styling

All tools use:
- Tailwind CSS classes only (no custom CSS)
- Font family: `font-heading` for headings, `font-mono` for numbers
- Colors: `text-primary`, `bg-success`, `border-border`, etc.
- Mobile-first responsive design

## Next Steps

1. Test all 10 tools in dev server
2. Add SEO content in `components/tools/SEOContent.jsx` for each slug
3. Test on mobile (375px width)
4. Test geolocation permissions
5. Deploy to production
6. Monitor API usage in analytics
7. Consider caching results for popular searches
