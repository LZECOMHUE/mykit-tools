'use client';

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
        { key: 'wheelchair', label: 'Wheelchair' },
      ]}
      defaultRadius={2000}
      maxRadius={5000}
    />
  );
}
