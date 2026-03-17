'use client';

import WhenIsTemplate from './WhenIsTemplate';

const PASSOVER_DATES = {
  2025: new Date(2025, 3, 12),
  2026: new Date(2026, 3, 2),
  2027: new Date(2027, 3, 21),
  2028: new Date(2028, 3, 9),
  2029: new Date(2029, 3, 30),
  2030: new Date(2030, 3, 19),
  2031: new Date(2031, 3, 9),
  2032: new Date(2032, 3, 27),
  2033: new Date(2033, 3, 15),
  2034: new Date(2034, 4, 5),
};

function getPassoverDate(year) {
  return PASSOVER_DATES[year] || new Date(year, 3, 12);
}

export default function WhenIsPassover() {
  return (
    <WhenIsTemplate
      name="Passover"
      getDate={getPassoverDate}
      description="Passover is a Jewish festival celebrating the liberation of the Israelites from slavery in Egypt. The holiday lasts eight days and commemorates the "passing over" of Jewish homes by the plague of the firstborn. Passover is marked by a special ritual meal called the Seder, eating matzo (unleavened bread), and avoiding leavened products. It is a time of reflection, freedom, and family gatherings."
      traditions={[
        'Conducting a Seder meal with symbolic foods',
        'Eating matzo (unleavened bread) for eight days',
        'Reciting the Haggadah (story of the exodus)',
        'Searching for and burning chametz (leavened products)',
        'Drinking four cups of wine during the Seder',
        'Eating symbolic foods: bitter herbs, charoset, eggs, and lamb',
        'Preparing the home by removing all leavened products',
        'Singing Passover songs and hymns',
      ]}
      funFacts={[
        'Passover lasts for eight days (seven in Israel)',
        'The word "Passover" refers to God passing over Jewish homes during the tenth plague',
        'Matzo is eaten as a reminder of the hasty departure from Egypt',
        'The Seder plate contains six symbolic foods representing the exodus story',
        'Passover is one of the most observed Jewish holidays worldwide',
      ]}
      relatedSlugs={['hanukkah-countdown', 'rosh-hashanah-countdown']}
    />
  );
}
