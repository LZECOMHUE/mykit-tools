'use client';

import WhenIsTemplate from './WhenIsTemplate';

const HANUKKAH_DATES = {
  2025: new Date(2025, 11, 14),
  2026: new Date(2026, 11, 4),
  2027: new Date(2027, 10, 23),
  2028: new Date(2028, 11, 12),
  2029: new Date(2029, 11, 1),
  2030: new Date(2030, 10, 20),
  2031: new Date(2031, 11, 9),
  2032: new Date(2032, 10, 28),
  2033: new Date(2033, 10, 17),
  2034: new Date(2034, 11, 6),
};

function getHanukkahDate(year) {
  return HANUKKAH_DATES[year] || new Date(year, 11, 14);
}

export default function WhenIsHanukkah() {
  return (
    <WhenIsTemplate
      name="Hanukkah"
      getDate={getHanukkahDate}
      description="Hanukkah, the Festival of Lights, is an eight-day Jewish holiday celebrating the rededication of the Second Temple in Jerusalem. It commemorates the Jewish triumph against religious persecution and the miracle of a small amount of sacred oil burning for eight days. Hanukkah is celebrated by lighting the menorah (a nine-branched candelabra) with one additional candle lit each evening, playing games, exchanging gifts, and sharing meals."
      traditions={[
        'Lighting the menorah (hanukiah) each evening with blessings and songs',
        'Spinning the dreidel (traditional spinning top)',
        'Playing games with chocolate coins (gelt)',
        'Eating foods fried in oil, like latkes (potato pancakes) and jelly doughnuts',
        'Exchanging gifts over the eight days',
        'Singing Hanukkah songs and carols',
        'Displaying menorahs in windows',
        'Gathering with family and friends for festive meals',
      ]}
      funFacts={[
        'Hanukkah lasts for eight days and nights',
        'The word "Hanukkah" means "dedication" in Hebrew',
        'The menorah symbolises the miracle of the oil lasting eight days',
        'Hanukkah falls between late November and late December each year',
        'Latkes are eaten because they are fried in oil, commemorating the oil miracle',
      ]}
      relatedSlugs={['passover-countdown', 'diwali-countdown']}
    />
  );
}
