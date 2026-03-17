'use client';

import NearMeFinderTemplate from '@/components/templates/NearMeFinderTemplate';

export default function NearestPublicToiletFinder() {
  return (
    <NearMeFinderTemplate
      title="Public Toilets"
      amenityType="amenity=toilets"
      icon="🚽"
      resultFields={[
        { key: 'wheelchair', label: 'Wheelchair' },
        { key: 'baby_change', label: 'Baby Changing' },
        { key: 'fee', label: 'Fee' },
        { key: 'opening_hours', label: 'Hours' },
      ]}
      defaultRadius={1000}
      maxRadius={3000}
    />
  );
}
