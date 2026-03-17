'use client';

import NearMeFinderTemplate from '@/components/templates/NearMeFinderTemplate';

export default function NearestCashMachineFinder() {
  return (
    <NearMeFinderTemplate
      title="Cash Machines (ATMs)"
      amenityType="amenity=atm"
      icon="💷"
      resultFields={[
        { key: 'operator', label: 'Operator' },
        { key: 'fee', label: 'Fee' },
        { key: 'indoor', label: 'Indoor' },
        { key: 'opening_hours', label: 'Hours' },
      ]}
      defaultRadius={1000}
      maxRadius={3000}
    />
  );
}
