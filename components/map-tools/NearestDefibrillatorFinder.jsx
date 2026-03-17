'use client';

import NearMeFinderTemplate from '@/components/templates/NearMeFinderTemplate';

export default function NearestDefibrillatorFinder() {
  return (
    <NearMeFinderTemplate
      title="Defibrillators (AEDs)"
      amenityType="emergency=defibrillator"
      icon="⚡"
      resultFields={[
        { key: 'access', label: 'Access' },
        { key: 'opening_hours', label: 'Hours' },
        { key: 'indoor', label: 'Indoor' },
        { key: 'phone', label: 'Phone' },
      ]}
      defaultRadius={1000}
      maxRadius={3000}
    />
  );
}
