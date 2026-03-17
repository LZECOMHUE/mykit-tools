'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getMemorialDayDate(year) {
  const may = new Date(year, 4, 1);
  let dayOfWeek = may.getDay();
  const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
  const firstMonday = new Date(year, 4, 1 + daysUntilMonday);
  const lastMonday = new Date(firstMonday);
  while (lastMonday.getMonth() === 4) {
    const nextMonday = new Date(lastMonday);
    nextMonday.setDate(nextMonday.getDate() + 7);
    if (nextMonday.getMonth() === 4) {
      lastMonday.setDate(nextMonday.getDate());
    } else {
      break;
    }
  }
  return lastMonday;
}

export default function WhenIsMemorialDay() {
  return (
    <WhenIsTemplate
      name="Memorial Day"
      getDate={getMemorialDayDate}
      description="Memorial Day is celebrated on the last Monday in May in the United States. It is a federal holiday dedicated to honouring and mourning those who died while serving in the US armed forces. Memorial Day is a time for parades, ceremonies, and solemn remembrance at cemeteries and monuments. Many Americans use the long weekend to travel or spend time with family, marking the unofficial beginning of summer."
      traditions={[
        'Visiting cemeteries and war memorials',
        'Placing flags and flowers on graves of veterans',
        'Attending parades and memorial services',
        'Observing a moment of silence at 3 PM',
        'Flying the American flag at half mast until noon',
        'Family gatherings and outdoor activities',
        'Picnics and barbecues',
        'Attending military ceremonies and events',
      ]}
      funFacts={[
        'Memorial Day is celebrated on the last Monday in May',
        'The holiday originated after the Civil War',
        'Memorial Day is distinct from Veterans Day, which honours all veterans',
        'Originally called Decoration Day, the name changed after World War I',
        'It is a federal holiday in all 50 US states',
      ]}
      relatedSlugs={['independence-day-countdown', 'labor-day-countdown']}
    />
  );
}
