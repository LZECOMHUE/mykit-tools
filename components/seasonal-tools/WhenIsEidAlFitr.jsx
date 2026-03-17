'use client';

import WhenIsTemplate from './WhenIsTemplate';

const EID_AL_FITR_DATES = {
  2025: new Date(2025, 2, 30),
  2026: new Date(2026, 2, 19),
  2027: new Date(2027, 2, 9),
  2028: new Date(2028, 0, 29),
  2029: new Date(2029, 0, 18),
  2030: new Date(2030, 0, 6),
  2031: new Date(2031, 11, 27),
  2032: new Date(2032, 10, 16),
  2033: new Date(2033, 10, 5),
  2034: new Date(2034, 9, 26),
};

function getEidAlFitrDate(year) {
  return EID_AL_FITR_DATES[year] || new Date(year, 2, 30);
}

export default function WhenIsEidAlFitr() {
  return (
    <WhenIsTemplate
      name="Eid al-Fitr"
      getDate={getEidAlFitrDate}
      description="Eid al-Fitr, also known as the Festival of Breaking the Fast, is one of the two major Islamic holidays. It marks the end of Ramadan, the Islamic month of fasting. Eid al-Fitr is a joyful celebration where Muslims gather to pray, spend time with family and friends, exchange gifts, and share special meals. It is a time of gratitude, forgiveness, and celebrating the spiritual discipline of the previous month."
      traditions={[
        'Special morning prayers at mosques or prayer grounds',
        'Wearing new or best clothing, often traditional dress',
        'Greeting friends and family with "Eid Mubarak" (Blessed Eid)',
        'Sharing festive meals and special desserts with loved ones',
        'Giving gifts, especially to children',
        'Visiting family and friends throughout the day',
        'Charitable giving to those in need',
        'Decorating homes and streets with lights and festive displays',
      ]}
      funFacts={[
        'Eid al-Fitr lasts for three days in most Muslim-majority countries',
        'The date is determined by the sighting of the new moon',
        'It is one of the most important celebrations in the Islamic calendar',
        'Muslims prepare for Eid by new clothes shopping and cleaning homes',
        'Special Eid dishes vary by culture but often include date-based foods',
      ]}
      relatedSlugs={['ramadan-countdown', 'eid-al-adha-countdown']}
    />
  );
}
