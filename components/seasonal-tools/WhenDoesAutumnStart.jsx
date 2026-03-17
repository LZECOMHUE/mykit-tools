'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getAutumnStartDate(year) {
  return new Date(year, 8, 23);
}

export default function WhenDoesAutumnStart() {
  return (
    <WhenIsTemplate
      name="Autumn Equinox"
      getDate={getAutumnStartDate}
      description="The autumn equinox, also known as the autumnal equinox, occurs on approximately 23 September in the UK and marks the astronomical beginning of autumn. On this day, the duration of day and night are nearly equal. After the autumn equinox, nights become longer than days as the season progresses towards winter. Autumn is characterized by cooling temperatures, changing foliage, harvest time, and the return to school."
      traditions={[
        'Celebrating the autumn harvest',
        'Picking apples and pumpkins',
        'Harvest festivals and fairs',
        'Back to school season',
        'Changing decorations to autumn themes',
        'Autumn walks and nature activities',
        'Preparation for winter',
        'Thanksgiving celebrations',
      ]}
      funFacts={[
        'The autumn equinox marks when day and night have nearly equal length',
        'The date varies between 22 and 24 September',
        'After the autumn equinox, nights are longer than days',
        'Autumn colours begin to appear as days shorten',
        'The autumn equinox is significant in many cultures and traditions',
      ]}
      relatedSlugs={['halloween-countdown', 'winter-solstice-countdown']}
    />
  );
}
