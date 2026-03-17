'use client';

import WhenIsTemplate from './WhenIsTemplate';

const EID_AL_ADHA_DATES = {
  2025: new Date(2025, 5, 6),
  2026: new Date(2026, 4, 26),
  2027: new Date(2027, 4, 16),
  2028: new Date(2028, 4, 5),
  2029: new Date(2029, 3, 24),
  2030: new Date(2030, 3, 13),
  2031: new Date(2031, 3, 3),
  2032: new Date(2032, 2, 22),
  2033: new Date(2033, 2, 11),
  2034: new Date(2034, 2, 1),
};

function getEidAlAdhaDate(year) {
  return EID_AL_ADHA_DATES[year] || new Date(year, 5, 6);
}

export default function WhenIsEidAlAdha() {
  return (
    <WhenIsTemplate
      name="Eid al-Adha"
      getDate={getEidAlAdhaDate}
      description="Eid al-Adha, the Festival of Sacrifice, is the second and holier of the two Islamic holidays. It commemorates the willingness of Prophet Ibrahim to sacrifice his son in obedience to God. Muslims celebrate by performing the Hajj pilgrimage to Mecca, making animal sacrifices, and sharing the meat with family, friends, and the poor. It is a time of spiritual renewal, charity, and gratitude."
      traditions={[
        'Animal sacrifice of sheep, goats, cows, or camels',
        'Special prayers and sermons at mosques',
        'Sharing meat from sacrifices with family and poor people',
        'Wearing new clothes and perfume',
        'Visiting family and friends',
        'Exchanging greetings and gifts',
        'Preparing and sharing festive meals',
        'Hajj pilgrimage to Mecca for those able to travel',
      ]}
      funFacts={[
        'Eid al-Adha lasts for three or four days depending on the country',
        'It coincides with the final days of the Hajj pilgrimage',
        'The festival honours Prophet Ibrahim\'s test of faith',
        'Over 2 million Muslims gather in Mecca for Hajj during this time',
        'Eid al-Adha is celebrated by nearly 2 billion Muslims worldwide',
      ]}
      relatedSlugs={['ramadan-countdown', 'eid-al-fitr-countdown']}
    />
  );
}
