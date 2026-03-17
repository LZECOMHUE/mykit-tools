'use client';

import WhenIsTemplate from './WhenIsTemplate';

const CHINESE_NEW_YEAR_DATES = {
  2025: new Date(2025, 0, 29),
  2026: new Date(2026, 1, 17),
  2027: new Date(2027, 2, 6),
  2028: new Date(2028, 0, 26),
  2029: new Date(2029, 1, 13),
  2030: new Date(2030, 2, 3),
  2031: new Date(2031, 0, 23),
  2032: new Date(2032, 1, 11),
  2033: new Date(2033, 1, 1),
  2034: new Date(2034, 0, 20),
};

function getChineseNewYearDate(year) {
  return CHINESE_NEW_YEAR_DATES[year] || new Date(year, 0, 29);
}

export default function WhenIsChineseNewYear() {
  return (
    <WhenIsTemplate
      name="Chinese New Year"
      getDate={getChineseNewYearDate}
      description="Chinese New Year, also known as Lunar New Year or Spring Festival, is the most important celebration in Chinese culture. It marks the beginning of a new year on the traditional lunar calendar. Families gather to celebrate with special meals, fireworks, and decorations featuring red and gold colours symbolising good luck and prosperity. The festival is celebrated by over 1.5 billion people worldwide and is a public holiday across much of Asia."
      traditions={[
        'Family reunion dinners with special foods symbolising good fortune',
        'Exchanging red envelopes (hong bao) containing money',
        'Cleaning homes to sweep away bad luck',
        'Decorating with red lanterns, couplets, and gold ornaments',
        'Setting off fireworks and firecrackers',
        'Wearing red clothing for good luck',
        'Lion and dragon dances in streets and parades',
        'Visiting temples to pray for blessings',
      ]}
      funFacts={[
        'Chinese New Year is based on the lunar calendar, so the date changes each year',
        'Each year is associated with one of twelve zodiac animals',
        'The celebrations typically last 15 days',
        'Red envelopes are given to bring good fortune and ward off evil',
        'Fireworks were originally used to scare away evil spirits',
      ]}
      relatedSlugs={['diwali-countdown', 'hanukkah-countdown']}
    />
  );
}
