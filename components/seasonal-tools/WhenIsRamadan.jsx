'use client';

import WhenIsTemplate from './WhenIsTemplate';

const RAMADAN_DATES = {
  2025: new Date(2025, 1, 28),
  2026: new Date(2026, 1, 17),
  2027: new Date(2027, 1, 7),
  2028: new Date(2028, 0, 27),
  2029: new Date(2029, 0, 16),
  2030: new Date(2030, 0, 5),
  2031: new Date(2031, 11, 26),
  2032: new Date(2032, 10, 15),
  2033: new Date(2033, 10, 4),
  2034: new Date(2034, 9, 25),
};

function getRamadanDate(year) {
  return RAMADAN_DATES[year] || new Date(year, 1, 28);
}

export default function WhenIsRamadan() {
  return (
    <WhenIsTemplate
      name="Ramadan"
      getDate={getRamadanDate}
      description="Ramadan is the ninth month of the Islamic lunar calendar and is observed by Muslims worldwide as a month of fasting, prayer, and reflection. During Ramadan, Muslims fast from dawn to sunset, abstaining from food, drink, and other physical needs as an act of worship and spiritual discipline. It is a time for increased devotion, charitable giving, and strengthening community bonds. Ramadan commemorates the revelation of the Quran to the Prophet Muhammad."
      traditions={[
        'Fasting from sunrise to sunset each day of the month',
        'Pre-dawn meals called suhoor before fasting begins',
        'Breaking the fast at sunset with iftar meals, often shared with family and friends',
        'Increased prayer and recitation of the Quran, especially Taraweeh prayers at night',
        'Charitable giving and helping those in need',
        'Visiting mosques for special prayers and community gatherings',
        'Staying awake during Laylat al-Qadr (Night of Power), believed to be in the last ten days',
      ]}
      funFacts={[
        'Ramadan is based on the lunar calendar, so it moves about 11 days earlier each year',
        'Muslims believe that the Quran was first revealed to Muhammad during Ramadan',
        'Fasting during Ramadan is one of the Five Pillars of Islam',
        'The word "Ramadan" comes from the Arabic root meaning "dryness" or "scorching heat"',
        'Over 1.8 billion Muslims around the world observe Ramadan',
      ]}
      relatedSlugs={['eid-al-fitr-countdown', 'eid-al-adha-countdown']}
    />
  );
}
