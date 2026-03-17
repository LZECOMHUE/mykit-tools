'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getFathersDayDate(year) {
  const june = new Date(year, 5, 1);
  let dayOfWeek = june.getDay();
  const daysUntilSunday = (0 - dayOfWeek + 7) % 7;
  const firstSunday = new Date(year, 5, 1 + daysUntilSunday);
  const thirdSunday = new Date(firstSunday);
  thirdSunday.setDate(thirdSunday.getDate() + 14);
  return thirdSunday;
}

export default function WhenIsFathersDay() {
  return (
    <WhenIsTemplate
      name="Father's Day"
      getDate={getFathersDayDate}
      description="Father's Day is celebrated on the third Sunday in June in the UK and many other countries. The day honours fathers and paternal figures, and is a time to express appreciation and gratitude for their contributions. Father's Day is a more modern celebration compared to Mother's Day, having been established in the early 20th century. It is celebrated through cards, gifts, special meals, and family gatherings."
      traditions={[
        'Giving Father\'s Day cards expressing love and appreciation',
        'Presenting gifts like tools, gadgets, sports equipment, or accessories',
        'Giving ties, cufflinks, or watches',
        'Sharing a special meal or barbecue',
        'Taking fathers out for activities they enjoy',
        'Spending quality time with fathers',
        'Giving gifts related to hobbies or interests',
      ]}
      funFacts={[
        'Father\'s Day is celebrated on the third Sunday in June in the UK and US',
        'The first Father\'s Day celebration was in 1910 in Washington State, USA',
        'Different countries celebrate Father\'s Day on different dates',
        'Father\'s Day is celebrated in over 80 countries',
        'Necktie sales spike significantly around Father\'s Day in June',
      ]}
      relatedSlugs={['mothers-day-uk-countdown', 'parent-appreciation-day']}
    />
  );
}
