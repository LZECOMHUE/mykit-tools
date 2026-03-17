'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getWinterStartDate(year) {
  return new Date(year, 11, 21);
}

export default function WhenDoesWinterStart() {
  return (
    <WhenIsTemplate
      name="Winter Solstice"
      getDate={getWinterStartDate}
      description="The winter solstice, also known as midwinter, occurs on approximately 21 December in the UK and marks the astronomical beginning of winter. It is the shortest day of the year, with the minimum duration of daylight. After the winter solstice, day length gradually increases as the year progresses. The winter solstice has been celebrated by many cultures throughout history and marks a turning point in the year as daylight returns."
      traditions={[
        'Christmas celebrations and festive decorations',
        'Yule log traditions',
        'Candle lighting to symbolise the return of light',
        'Winter festivals and celebrations',
        'Family gatherings and meals',
        'Hot drinks and comfort food',
        'Ancient solstice celebrations at sites like Stonehenge',
        'Preparations for the new year',
      ]}
      funFacts={[
        'The winter solstice is the shortest day of the year in the Northern Hemisphere',
        'On this day, the sun\'s path is at its southernmost point',
        'The date varies between 20 and 23 December depending on the year',
        'After the winter solstice, daylight gradually increases each day',
        'Many ancient sites align with the winter solstice',
      ]}
      relatedSlugs={['shortest-day-countdown', 'christmas-countdown']}
    />
  );
}
