'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getLongestDayDate(year) {
  return new Date(year, 5, 21);
}

export default function WhenIsTheLongestDay() {
  return (
    <WhenIsTemplate
      name="Longest Day"
      getDate={getLongestDayDate}
      description="The longest day of the year occurs on the summer solstice, approximately 21 June in the UK. This day has the maximum duration of daylight, often around 16 to 17 hours depending on latitude. The longest day marks the peak of summer and is celebrated in many cultures. After this day, the duration of daylight gradually decreases as autumn approaches."
      traditions={[
        'Outdoor festivals and celebrations',
        'Beach visits and water activities',
        'Evening events taking advantage of extended daylight',
        'Picnics and barbecues',
        'Sunrise and sunset viewing',
        'Active outdoor pursuits like hiking and cycling',
        'Open-air concerts and performances',
        'Garden parties and social gatherings',
      ]}
      funFacts={[
        'In London, the longest day has approximately 16 hours 38 minutes of daylight',
        'The longest day marks the summer solstice',
        'After the longest day, daylight gradually decreases each day',
        'Locations at higher latitudes experience longer days',
        'The longest day is celebrated as midsummer in many Nordic countries',
      ]}
      relatedSlugs={['summer-solstice-countdown', 'shortest-day-countdown']}
    />
  );
}
