'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getSummerStartDate(year) {
  return new Date(year, 5, 21);
}

export default function WhenDoesSummerStart() {
  return (
    <WhenIsTemplate
      name="Summer Solstice"
      getDate={getSummerStartDate}
      description="The summer solstice, also known as midsummer, occurs on approximately 21 June in the UK and marks the astronomical beginning of summer. It is the longest day of the year, with the maximum duration of daylight. After the summer solstice, day length gradually decreases as autumn approaches. The summer solstice has been celebrated by many cultures throughout history and marks the peak of the sun's power."
      traditions={[
        'Celebrating the longest day of the year',
        'Outdoor festivals and celebrations',
        'Gatherings at ancient sites like Stonehenge',
        'Picnics and barbecues',
        'Beach visits and water activities',
        'Evening gatherings that take advantage of long daylight hours',
        'Bonfire celebrations in some traditions',
        'Midsummer festivals in Scandinavian countries',
      ]}
      funFacts={[
        'The summer solstice is the longest day of the year in the Northern Hemisphere',
        'On this day, the sun\'s path is at its northernmost point',
        'The date varies between 20 and 22 June depending on the year',
        'Stonehenge aligns with the summer solstice sunrise',
        'In the UK, summer solstice occurs around 16 hours of daylight',
      ]}
      relatedSlugs={['longest-day-countdown', 'autumn-equinox-countdown']}
    />
  );
}
