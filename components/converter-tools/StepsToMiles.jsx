'use client';

import ConverterTemplate from '@/components/templates/ConverterTemplate';

export default function StepsToMiles() {
  return (
    <ConverterTemplate
      slug="steps-to-miles"
      inputUnit="steps"
      inputLabel="Steps"
      outputUnit="miles"
      outputLabel="Miles"
      convert={(value) => value / 2112}
      reverseConvert={(value) => value * 2112}
      reverseSlug="miles-to-steps"
      precision={2}
      commonValues={[1000, 2000, 5000, 7500, 10000, 15000, 20000]}
      formula="miles = steps ÷ 2,112 (based on average 2.5 ft stride)"
      inputPlaceholder="Enter number of steps"
    />
  );
}
