'use client';

import NearMeFinderTemplate from '@/components/templates/NearMeFinderTemplate';

export default function NearestParkFinder() {
  return (
    <NearMeFinderTemplate
      title="Parks"
      amenityType="leisure=park"
      icon="🌳"
      resultFields={[
        { key: 'area', label: 'Area' },
        { key: 'wheelchair', label: 'Wheelchair' },
        { key: 'dog', label: 'Dogs' },
      ]}
      defaultRadius={2000}
      maxRadius={5000}
    />
  );
}
