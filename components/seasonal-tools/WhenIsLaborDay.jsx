'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getLaborDayDate(year) {
  const september = new Date(year, 8, 1);
  let dayOfWeek = september.getDay();
  const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
  const firstMonday = new Date(year, 8, 1 + daysUntilMonday);
  return firstMonday;
}

export default function WhenIsLaborDay() {
  return (
    <WhenIsTemplate
      name="Labor Day"
      getDate={getLaborDayDate}
      description="Labor Day is celebrated on the first Monday in September in the United States and Canada. It is a federal holiday dedicated to honouring the contributions and achievements of workers. Labor Day marks the end of summer and the start of the school year. Many people use the long weekend for travel, picnics, and final summer activities before autumn begins."
      traditions={[
        'Taking a day off work to rest and relax',
        'Spending time with family and friends',
        'Picnics and barbecues',
        'Outdoor activities and beach visits',
        'Fireworks displays in some regions',
        'Attending Labor Day parades and celebrations',
        'Shopping sales (Labor Day weekend sales)',
        'Travel and holiday activities',
      ]}
      funFacts={[
        'Labor Day is celebrated on the first Monday in September in the US',
        'The holiday honours the social and economic achievements of workers',
        'Labor Day marks the unofficial end of summer in the US',
        'Many schools begin the academic year after Labor Day',
        'Labor Day has been a federal holiday since 1894',
      ]}
      relatedSlugs={['memorial-day-countdown', 'thanksgiving-countdown']}
    />
  );
}
