'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getRemembranceDayDate(year) {
  return new Date(year, 10, 11);
}

export default function WhenIsRemembranceDay() {
  return (
    <WhenIsTemplate
      name="Remembrance Day"
      getDate={getRemembranceDayDate}
      description="Remembrance Day is observed on 11 November in the UK and Commonwealth countries to honour the contributions and sacrifices of members of the armed forces who have died in the line of duty. The date marks the anniversary of the end of World War I on 11 November 1918. In the UK, Remembrance Sunday (the second Sunday in November) is the main day of commemoration, though 11 November itself is also observed."
      traditions={[
        'Wearing poppies as symbols of remembrance',
        'Two minutes of silence at 11 AM to honour the fallen',
        'Attending Remembrance Sunday services and parades',
        'Laying wreaths at war memorials',
        'Red poppy sales to raise funds for veterans',
        'Military parades in towns and cities',
        'Flying flags at half mast',
        'Church services and civic ceremonies',
      ]}
      funFacts={[
        'The red poppy became a symbol of remembrance following World War I',
        'The two-minute silence at 11 AM on 11 November is observed across the UK',
        'Armistice Day marks the end of World War I on 11 November 1918',
        'The poppy appeal is the main fundraising campaign for the Royal British Legion',
        'Remembrance Day is observed in Canada, Australia, and other Commonwealth nations',
      ]}
      relatedSlugs={['bonfire-night-countdown', 'christmas-countdown']}
    />
  );
}
