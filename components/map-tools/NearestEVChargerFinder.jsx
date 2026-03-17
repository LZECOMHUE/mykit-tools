'use client';

import NearMeFinderTemplate from '@/components/templates/NearMeFinderTemplate';

export default function NearestEVChargerFinder() {
  return (
    <NearMeFinderTemplate
      title="EV Chargers"
      amenityType="amenity=charging_station"
      icon="🔌"
      resultFields={[
        { key: 'operator', label: 'Operator' },
        { key: 'capacity', label: 'Bays' },
        { key: 'socket:type2', label: 'Type 2' },
        { key: 'socket:chademo', label: 'CHAdeMO' },
        { key: 'socket:ccs', label: 'CCS' },
      ]}
      defaultRadius={3000}
      maxRadius={10000}
    />
  );
}
