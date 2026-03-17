'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getSpringStartDate(year) {
  return new Date(year, 2, 20);
}

export default function WhenDoesSpringStart() {
  return (
    <WhenIsTemplate
      name="Spring Equinox"
      getDate={getSpringStartDate}
      description="The spring equinox, also known as the vernal equinox, occurs on approximately 20 March in the UK and marks the astronomical beginning of spring. On this day, the duration of day and night are nearly equal, with day length increasing after this date. The spring equinox signals the end of winter and the beginning of warmer weather, longer days, and the renewal of nature. Flowers bloom, birds return from migration, and outdoor activities resume."
      traditions={[
        'Celebrating the return of spring and warmer weather',
        'Gardening and planting seeds for the growing season',
        'Easter celebrations in some traditions',
        'Spring cleaning of homes',
        'Outdoor activities and nature walks',
        'Spring festivals and fairs',
        'Seasonal cooking with fresh produce',
        'Celebrating renewal and rebirth',
      ]}
      funFacts={[
        'The spring equinox occurs when the sun crosses the celestial equator',
        'On the equinox, day and night have nearly equal length',
        'The date of the spring equinox varies between 19 and 21 March',
        'Many ancient sites, like Stonehenge, align with the spring equinox',
        'The spring equinox is significant in many cultures and religions',
      ]}
      relatedSlugs={['easter-countdown', 'summer-solstice-countdown']}
    />
  );
}
