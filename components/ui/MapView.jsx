'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

const MARKER_COLORS = {
  blue: '#2563eb',
  red: '#dc2626',
  green: '#16a34a',
  amber: '#d97706',
  purple: '#7c3aed',
  pink: '#db2777',
};

function createMarkerSvg(color = '#2563eb') {
  const hex = MARKER_COLORS[color] || color;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="42">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${hex}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="11" r="5" fill="#fff" opacity="0.9"/>
  </svg>`;
}

function createUserMarkerSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24">
    <circle cx="16" cy="16" r="14" fill="#2563eb" stroke="#fff" stroke-width="3"/>
    <circle cx="16" cy="16" r="6" fill="#fff"/>
  </svg>`;
}

export default function MapView({
  center = [51.505, -0.09],
  zoom = 13,
  markers = [],
  className = '',
  height = '400px',
  children,
  onMapReady,
  onMoveEnd,
}) {
  const [leafletLib, setLeafletLib] = useState(null);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const onMoveEndRef = useRef(onMoveEnd);

  useEffect(() => {
    onMoveEndRef.current = onMoveEnd;
  }, [onMoveEnd]);

  // Load leaflet
  useEffect(() => {
    import('leaflet').then(L => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
      setLeafletLib(L);
    }).catch(() => setError('Failed to load map library'));
  }, []);

  // Initialize map once leaflet is loaded and container is ready
  useEffect(() => {
    if (!leafletLib || !containerRef.current || mapInstanceRef.current) return;

    const L = leafletLib;
    const map = L.map(containerRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Listen for user drag
    map.on('dragend', () => {
      if (onMoveEndRef.current) {
        const c = map.getCenter();
        onMoveEndRef.current({ lat: c.lat, lon: c.lng });
      }
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, [leafletLib]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update center/zoom
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(center, zoom, { duration: 0.8 });
  }, [center, zoom]);

  // Update markers
  useEffect(() => {
    if (!leafletLib || !markersLayerRef.current) return;

    const L = leafletLib;
    markersLayerRef.current.clearLayers();

    markers.forEach(marker => {
      let icon;
      if (marker.type === 'user') {
        icon = L.divIcon({
          html: createUserMarkerSvg(),
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          popupAnchor: [0, -12],
          className: '',
        });
      } else {
        icon = L.divIcon({
          html: createMarkerSvg(marker.color || 'blue'),
          iconSize: [28, 42],
          iconAnchor: [14, 42],
          popupAnchor: [0, -42],
          className: '',
        });
      }

      const m = L.marker([marker.lat, marker.lon], { icon }).addTo(markersLayerRef.current);
      if (marker.popup) {
        m.bindPopup(marker.popup);
      }
    });
  }, [markers, leafletLib]);

  if (error) {
    return <div style={{ height }} className={`bg-surface rounded-lg flex items-center justify-center ${className}`}>
      <p className="text-error">{error}</p>
    </div>;
  }

  if (!leafletLib) {
    return <div style={{ height }} className={`bg-surface rounded-lg flex items-center justify-center ${className}`}>
      <p className="text-secondary">Loading map...</p>
    </div>;
  }

  return (
    <div style={{ height }} className={className}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
      <div ref={containerRef} style={{ height: '100%', width: '100%', borderRadius: '8px' }} />
    </div>
  );
}
