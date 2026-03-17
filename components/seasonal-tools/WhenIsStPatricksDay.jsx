'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getStPatricksDayDate(year) {
  return new Date(year, 2, 17);
}

export default function WhenIsStPatricksDay() {
  return (
    <WhenIsTemplate
      name="St Patrick's Day"
      getDate={getStPatricksDayDate}
      description="St Patrick's Day is celebrated on 17 March to honour Saint Patrick, the patron saint of Ireland. The day celebrates Irish culture, heritage, and the arrival of Christianity in Ireland. St Patrick's Day is observed as a public holiday in Ireland and Northern Ireland, and is celebrated by people of Irish descent around the world. The day is associated with parades, green clothing, and festive celebrations."
      traditions={[
        'Wearing green clothing from head to toe',
        'Displaying and wearing shamrocks',
        'Attending St Patrick\'s Day parades in cities around the world',
        'Drinking green-dyed beer or Irish stout',
        'Wearing decorations featuring leprechauns and rainbows',
        'Sharing traditional Irish food and drink',
        'Painting faces with green designs',
        'Dancing to Irish music',
      ]}
      funFacts={[
        'St Patrick\'s Day is celebrated in over 150 countries worldwide',
        'The colour green was not originally associated with St Patrick\'s Day; blue was used instead',
        'St Patrick was born in Roman Britain, not Ireland',
        'St Patrick used the shamrock to explain the Holy Trinity to the Irish people',
        'Over 30 million Americans claim Irish ancestry',
      ]}
      relatedSlugs={['easter-countdown', 'bonfire-night-countdown']}
    />
  );
}
