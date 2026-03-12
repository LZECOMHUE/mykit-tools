'use client';

import ConverterTemplate from '@/components/templates/ConverterTemplate';

export default function MilesToSteps() {
  return (
    <ConverterTemplate
      slug="miles-to-steps"
      inputUnit="miles"
      inputLabel="Miles"
      outputUnit="steps"
      outputLabel="Steps"
      convert={(value) => value * 2112}
      reverseConvert={(value) => value / 2112}
      reverseSlug="steps-to-miles"
      precision={0}
      commonValues={[0.5, 1, 2, 3, 5, 10, 13.1]}
      formula="steps = miles × 2,112 (based on average 2.5 ft stride)"
      inputPlaceholder="Enter number of miles"
    />
  );
}
