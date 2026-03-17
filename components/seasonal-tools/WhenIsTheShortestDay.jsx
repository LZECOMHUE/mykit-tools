'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getShortestDayDate(year) {
  return new Date(year, 11, 21);
}

export default function WhenIsTheShortestDay() {
  return (
    <WhenIsTemplate
      name="Shortest Day"
      getDate={getShortestDayDate}
      description="The shortest day of the year occurs on the winter solstice, approximately 21 December in the UK. This day has the minimum duration of daylight, often around 8 to 9 hours depending on latitude. The shortest day marks the official beginning of winter. After this day, the duration of daylight gradually increases as the year progresses towards spring."
      traditions={[
        'Christmas celebrations',
        'Indoor activities and time with family',
        'Winter festival celebrations',
        'Candle lighting and festive decorations',
        'Reflective activities and meditation',
        'Yule celebrations in some traditions',
        'Warm gatherings and comfort food',
        'Planning for the new year',
      ]}
      funFacts={[
        'In London, the shortest day has approximately 7 hours 49 minutes of daylight',
        'The shortest day marks the winter solstice',
        'After the shortest day, daylight gradually increases each day',
        'Locations at higher latitudes experience shorter days',
        'The shortest day is cause for celebration as it marks the return of light',
      ]}
      relatedSlugs={['winter-solstice-countdown', 'longest-day-countdown']}
    />
  );
}
