'use client';

import WhenIsTemplate from './WhenIsTemplate';

const DIWALI_DATES = {
  2025: new Date(2025, 9, 20),
  2026: new Date(2026, 10, 8),
  2027: new Date(2027, 9, 29),
  2028: new Date(2028, 10, 17),
  2029: new Date(2029, 10, 7),
  2030: new Date(2030, 9, 26),
  2031: new Date(2031, 10, 15),
  2032: new Date(2032, 11, 4),
  2033: new Date(2033, 10, 25),
  2034: new Date(2034, 10, 13),
};

function getDiwaliDate(year) {
  return DIWALI_DATES[year] || new Date(year, 9, 20);
}

export default function WhenIsDiwali() {
  return (
    <WhenIsTemplate
      name="Diwali"
      getDate={getDiwaliDate}
      description="Diwali, the Festival of Lights, is one of the most important festivals in Hinduism, celebrated across India and by Hindu, Sikh, Jain, and Buddhist communities worldwide. The festival celebrates the victory of light over darkness and good over evil. Homes and streets are illuminated with lamps called diyas, decorative lights, and fireworks. It is a time for spiritual renewal, family gatherings, and sharing sweets and gifts."
      traditions={[
        'Lighting oil lamps (diyas) and candles throughout homes and streets',
        'Setting off fireworks and firecrackers',
        'Exchanging sweets, gifts, and greeting cards',
        'Cleaning and decorating homes',
        'Wearing new clothes',
        'Preparing special festive foods and sweets',
        'Gambling games (traditionally played during Diwali)',
        'Creating rangoli (colourful patterns) on floors',
      ]}
      funFacts={[
        'Diwali is celebrated over five days, with the main day falling on the darkest night of the lunar month',
        'The word "Diwali" comes from "Deepavali," meaning "row of lights"',
        'Diwali marks the beginning of the financial year for many Indian businesses',
        'Millions of lamps are lit simultaneously during Diwali celebrations',
        'It is considered the best time for new beginnings and starting new ventures',
      ]}
      relatedSlugs={['hanukkah-countdown', 'chinese-new-year-countdown']}
    />
  );
}
