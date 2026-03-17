'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getThanksgivingDate(year) {
  const november = new Date(year, 10, 1);
  let dayOfWeek = november.getDay();
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
  const firstThursday = new Date(year, 10, 1 + daysUntilThursday);
  const fourthThursday = new Date(firstThursday);
  fourthThursday.setDate(fourthThursday.getDate() + 21);
  return fourthThursday;
}

export default function WhenIsThanksgiving() {
  return (
    <WhenIsTemplate
      name="Thanksgiving"
      getDate={getThanksgivingDate}
      description="Thanksgiving is celebrated on the fourth Thursday in November in the United States. It is a national holiday and family celebration where Americans gather to give thanks for the harvest and blessings of the past year. Thanksgiving traditionally features a large family meal with turkey as the centrepiece. The holiday marks the beginning of the holiday season and is deeply rooted in American tradition and culture."
      traditions={[
        'Gathering with family for a large festive meal',
        'Serving roast turkey as the main course',
        'Side dishes like stuffing, gravy, and cranberry sauce',
        'Watching the Thanksgiving Day Parade',
        'Watching American football on television',
        'Giving thanks and expressing gratitude',
        'Preparing pumpkin pie for dessert',
        'Travelling to spend time with family',
      ]}
      funFacts={[
        'Thanksgiving is celebrated on the fourth Thursday in November',
        'Approximately 46 million turkeys are eaten at Thanksgiving in the US',
        'The first Thanksgiving is traditionally dated to 1621',
        'Thanksgiving marks the unofficial start of the holiday shopping season',
        'Black Friday follows the day after Thanksgiving',
      ]}
      relatedSlugs={['black-friday-countdown', 'christmas-countdown']}
    />
  );
}
