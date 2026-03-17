# OpenStreetMap Map Tools - Implementation Documentation

## Overview

This implementation adds 10 map-based tools to MyKit.tools using OpenStreetMap, Leaflet, and OSRM (Open Source Routing Machine). All tools are fully functional with zero runtime API costs.

## Components Created

### 1. Foundation Components

#### `components/ui/MapView.jsx`
A reusable Leaflet map component with dynamic import to avoid SSR issues.

**Features:**
- Dynamic Leaflet library loading
- Default marker icon configuration
- OpenStreetMap tile layer
- Support for custom markers with popups
- Responsive height and className props
- Error boundary for map loading failures

**Props:**
```javascript
{
  center: [lat, lon],        // Map center (default: London)
  zoom: number,              // Zoom level (default: 13)
  markers: [{lat, lon, popup}], // Array of markers
  className: string,         // Tailwind classes
  height: string,           // CSS height (default: '400px')
  children: ReactNode,      // Additional map components
  onMapReady: function      // Callback when map loads
}
```

#### `components/templates/NearMeFinderTemplate.jsx`
A reusable template for finding nearby amenities using OpenStreetMap data.

**Features:**
- Geolocation support with postcode fallback
- Nominatim geocoding for address to lat/lon conversion
- Overpass API querying for OpenStreetMap data
- Haversine distance calculation
- Rate limiting (2 second minimum between requests)
- Sorting by distance or name
- Interactive Leaflet map display
- Detailed result listing with OSM tags

**Props:**
```javascript
{
  title: string,               // "Playgrounds", "Parks", etc
  amenityType: string,         // OSM query: "leisure=playground"
  overpassQuery: string,       // Custom Overpass QL (optional)
  icon: string,               // Display emoji/icon
  resultFields: [{key, label}], // Which OSM tags to display
  defaultRadius: number,      // Search radius in meters
  maxRadius: number,          // Maximum radius allowed
}
```

### 2. Simple Amenity Finder Tools (using NearMeFinderTemplate)

#### `components/map-tools/NearestPlaygroundFinder.jsx`
Finds playgrounds using `leisure=playground` OSM tag.

**Displayed Fields:**
- Surface (playground surface type)
- Access (public/private/etc)
- Wheelchair accessibility

#### `components/map-tools/NearestDefibrillatorFinder.jsx`
Finds automated external defibrillators using `emergency=defibrillator` OSM tag.

**Displayed Fields:**
- Access status
- Opening hours
- Indoor/outdoor
- Phone contact

#### `components/map-tools/NearestPublicToiletFinder.jsx`
Finds public restrooms using `amenity=toilets` OSM tag.

**Displayed Fields:**
- Wheelchair access
- Baby changing facilities
- Fee status
- Opening hours

#### `components/map-tools/NearestEVChargerFinder.jsx`
Finds electric vehicle charging stations using `amenity=charging_station` OSM tag.

**Displayed Fields:**
- Operator name
- Number of bays
- Socket types (Type 2, CHAdeMO, CCS)

#### `components/map-tools/NearestCashMachineFinder.jsx`
Finds ATMs using `amenity=atm` OSM tag.

**Displayed Fields:**
- Operator (bank/network)
- Fee status
- Indoor/outdoor
- Opening hours

#### `components/map-tools/NearestParkFinder.jsx`
Finds parks and green spaces using `leisure=park` OSM tag.

**Displayed Fields:**
- Area size
- Wheelchair access
- Dog policy

### 3. Advanced Tools (Custom Implementation)

#### `components/map-tools/WalkingTimeCalculator.jsx`
Calculates walking routes between two UK addresses.

**APIs Used:**
- **Nominatim**: Address to lat/lon geocoding
- **OSRM**: Route calculation (foot mode)
- **Leaflet**: Map visualization

**Features:**
- Accepts addresses or postcodes
- Calculates distance in km and miles
- Shows walking time estimates for different paces:
  - Slow (3 mph)
  - Normal (3.5 mph)
  - Brisk (4 mph)
  - Fast (4.5 mph)
- Interactive map with start/end markers
- Responsive design
- Error handling for route calculation failures

**API Calls:**
```
Nominatim: https://nominatim.openstreetmap.org/search
OSRM: https://router.project-osrm.org/route/v1/foot/{lon1},{lat1};{lon2},{lat2}
```

#### `components/map-tools/HowFarFromTheSeaCalculator.jsx`
Calculates distance to nearest UK coast.

**Features:**
- Enter UK postcode
- Pre-computed coastal points (40+ major UK coastal locations)
- Haversine distance calculation
- Results in miles and kilometers
- Interactive map showing user location and nearest coast
- Shows coastal point name and coordinates

**Data:**
40+ UK coastal points including:
- Southend-on-Sea, Brighton, Dover
- Scarborough, Whitehaven
- Scottish coast points (Dunnet Head, Thurso, Ullapool)
- Welsh coast (Aberystwyth, Tenby)
- Southwest England (Plymouth, Mousehole)
- And many more

#### `components/map-tools/PubDensityMap.jsx`
Shows pub density statistics for any UK location.

**APIs Used:**
- **Nominatim**: Location geocoding
- **Overpass**: Find pubs using `amenity=pub`

**Features:**
- Search any UK city or postcode
- Query pubs within 2km radius
- Display on interactive map
- Calculate pubs within 1km
- Show density (pubs per km²)
- Fun descriptive messages based on pub count
- Sortable pub results

**Statistics:**
- Total pubs within 2km
- Pubs per km² (within 1km radius)
- Colorful results card

#### `components/map-tools/SchoolRunCalculator.jsx`
Calculates school run costs and times.

**APIs Used:**
- **Nominatim**: Address geocoding (home and school)
- **OSRM**: Route calculation for walking, driving, and cycling

**Features:**
- Input home and school addresses
- Set cost per mile (HMRC default: 0.45p)
- Calculate multiple modes:
  - **Walking**: Distance and time estimate
  - **Driving**: Distance, time, and annual cost
  - **Cycling**: Time estimate (1.5x walking speed)
- Annual cost calculation:
  - Formula: distance × 2 trips/day × 190 school days × cost per mile
- Interactive map showing routes
- Responsive design

**Calculations:**
```
Annual Drive Cost = Distance(miles) × 2 × 190 × Cost per mile
Cycling Time ≈ Walking Time × 0.67 (4.5 mph average)
```

## API Usage

### Public APIs Used (All Free/Rate-Limited)

#### 1. Nominatim (OSM Geocoding)
- **Endpoint**: `https://nominatim.openstreetmap.org/search`
- **Rate Limit**: 1 request/second recommended
- **User-Agent Required**: Yes
- **Cost**: Free
- **Use Cases**: Address to lat/lon conversion

#### 2. Overpass API
- **Endpoint**: `https://overpass-api.de/api/interpreter`
- **Rate Limit**: ~30-40 requests/minute per user
- **User-Agent Required**: Yes
- **Cost**: Free
- **Use Cases**: Query OSM data (amenities, pubs, etc)
- **Query Format**: Custom QL (Overpass Query Language)

#### 3. OSRM (Open Source Routing Machine)
- **Endpoint**: `https://router.project-osrm.org/route/v1/{mode}/{coordinates}`
- **Rate Limit**: Reasonable request limits
- **User-Agent Required**: Yes
- **Cost**: Free
- **Use Cases**: Route calculation (walking, driving, cycling)
- **Modes**: foot (walking), car (driving), bike (cycling)

#### 4. Leaflet.js
- **CDN**: `cdnjs.cloudflare.com`
- **Cost**: Free
- **Use Cases**: Map rendering and interaction

## Rate Limiting Implementation

All tools implement rate limiting to prevent API abuse:

```javascript
const lastRequestTime = useRef(0);

// Only allow requests 2 seconds apart
if (now - lastRequestTime.current < 2000) {
  setError('Please wait a moment before searching again');
  return;
}
lastRequestTime.current = now;
```

## Data Sources

### OpenStreetMap Tags

**Amenity Tags:**
- `leisure=playground` - Play areas
- `emergency=defibrillator` - AEDs/Defibrillators
- `amenity=toilets` - Public restrooms
- `amenity=charging_station` - EV chargers
- `amenity=atm` - Cash machines
- `amenity=pub` - Pubs and bars
- `leisure=park` - Parks and green spaces

**Sub-tags (attributes):**
- `wheelchair` - Wheelchair accessibility (yes/no/limited)
- `access` - Public/private/customers
- `opening_hours` - Operating hours
- `fee` - Whether there's a fee
- `baby_change` - Baby changing facilities
- `operator` - Operating company
- `capacity` - Number of items/bays
- `socket:type2`, `socket:ccs`, etc - EV socket types

## Tool Characteristics

| Tool | Template | API Complexity | Tier | Search Radius |
|------|----------|---|------|---|
| Nearest Playground | NearMeFinder | Low | 2 | 2km default |
| Nearest Defibrillator | NearMeFinder | Low | 2 | 1km default |
| Nearest Public Toilet | NearMeFinder | Low | 2 | 1km default |
| Nearest EV Charger | NearMeFinder | Low | 2 | 3km default |
| Nearest Cash Machine | NearMeFinder | Low | 2 | 1km default |
| Nearest Park | NearMeFinder | Low | 2 | 2km default |
| Walking Route | Custom | Medium | 2 | N/A (point-to-point) |
| How Far From Sea | Custom | Low | 2 | Pre-computed |
| Pub Density | Custom | Medium | 2 | 2km fixed |
| School Run | Custom | High | 2 | N/A (point-to-point) |

## File Structure

```
components/
  ├── ui/
  │   └── MapView.jsx                    # Reusable Leaflet map
  ├── templates/
  │   └── NearMeFinderTemplate.jsx       # Reusable finder template
  └── map-tools/
      ├── NearestPlaygroundFinder.jsx
      ├── NearestDefibrillatorFinder.jsx
      ├── NearestPublicToiletFinder.jsx
      ├── NearestEVChargerFinder.jsx
      ├── NearestCashMachineFinder.jsx
      ├── NearestParkFinder.jsx
      ├── WalkingTimeCalculator.jsx
      ├── HowFarFromTheSeaCalculator.jsx
      ├── PubDensityMap.jsx
      └── SchoolRunCalculator.jsx

app/(tools)/
  ├── nearest-playground-finder/page.jsx
  ├── nearest-defibrillator-finder/page.jsx
  ├── nearest-public-toilet-finder/page.jsx
  ├── nearest-ev-charger-finder/page.jsx
  ├── nearest-cash-machine-finder/page.jsx
  ├── nearest-park-finder/page.jsx
  ├── walking-route-calculator/page.jsx
  ├── how-far-from-the-sea/page.jsx
  ├── pub-density-map/page.jsx
  └── school-run-calculator/page.jsx

lib/
  └── tool-registry.js                    # Updated with 10 new tools
```

## Key Technical Decisions

### 1. Dynamic Leaflet Import
Leaflet requires `window` object which doesn't exist during SSR. Solution: Dynamic import in useEffect to delay until client-side.

### 2. All Client-Side Processing
- Distance calculations use Haversine formula
- No server-side processing required
- No database lookups
- Zero runtime cost after initial load

### 3. Pre-Computed Coastal Data
Rather than query a coastline database, we maintain a list of 40+ major UK coastal points. Trade-off: slightly less accurate but massive performance benefit.

### 4. Nominatim User-Agent
All Nominatim requests include `User-Agent: MyKit.tools/1.0` header to identify the application per Nominatim policy.

### 5. Responsive Design
- Mobile-first approach (375px minimum)
- Maps scale to container
- Touch-friendly button sizes (44px+)
- Stacked layouts on mobile

## Dependencies

**New packages added:**
- `leaflet` - Map rendering
- `react-leaflet` - React bindings for Leaflet

**Already available:**
- React 19.2.3
- Next.js 16.1.6
- Tailwind CSS 4

## Future Enhancements

1. **Caching**: Implement local caching of Overpass/Nominatim results
2. **Custom Markers**: Different marker colors based on amenity type
3. **Clustering**: Cluster nearby amenities on zoom-out
4. **Filtering**: Advanced filters (opening hours, wheelchair access, etc)
5. **Route Shapes**: Display walking route on map for WalkingTimeCalculator
6. **Historical Data**: Cache old searches for offline access
7. **Export**: Save results as GPX or GeoJSON
8. **Offline Maps**: Integrate Mapbox offline tiles
9. **Multi-Language**: Translate amenity types and UI
10. **Dark Mode**: Map dark theme support

## Testing Notes

- All tools tested for mobile responsiveness (375px width)
- Geolocation tested both with and without browser permission
- APIs tested for timeouts and error cases
- Maps verified to load and display markers correctly
- All components use 'use client' directive

## Performance Targets

- Map load: < 2 seconds
- Amenity search: < 3 seconds
- Route calculation: < 5 seconds
- No layout shift when loading
- All client-side, zero server load

## Accessibility Features

- Proper input labels (not placeholders)
- Keyboard navigation on buttons
- ARIA labels where needed
- Color contrast ratios meet WCAG AA
- Touch targets 44px minimum
- Error messages in color + text

## SEO Considerations

- Each tool has a unique slug and registry entry
- SEO descriptions target key search terms
- Internal linking between related tools
- Schema markup from main tool registry
- Category placement (Travel, Health, Finance)
