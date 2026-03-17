'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getWorldBookDayDate(year) {
  const march = new Date(year, 2, 1);
  let dayOfWeek = march.getDay();
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
  const firstThursday = new Date(year, 2, 1 + daysUntilThursday);
  return firstThursday;
}

export default function WhenIsWorldBookDay() {
  return (
    <WhenIsTemplate
      name="World Book Day"
      getDate={getWorldBookDayDate}
      description="World Book Day in the UK is celebrated on the first Thursday in March and promotes reading and books. It is a national celebration of authors, illustrators, and books, with the aim of inspiring children and adults to discover the joy of reading. On this day, children dress up as their favourite book characters and exchange book tokens. Schools and libraries organize special events to promote literacy and a love of reading."
      traditions={[
        'Dressing up as favourite book characters',
        'Exchanging World Book Day tokens for books',
        'Attending book-themed events at schools and libraries',
        'Reading favourite books',
        'Book swaps and book discussions',
        'Author visits and book signings at schools',
        'Book prizes and reading competitions',
        'Promoting literacy and the love of reading',
      ]}
      funFacts={[
        'World Book Day is celebrated on the first Thursday in March in the UK',
        'Every child in UK primary schools receives a £1 book token',
        'The costume tradition of dressing as book characters is unique to UK World Book Day',
        'World Book Day promotes reading among children and adults',
        'The global World Book Day is celebrated on 23 April',
      ]}
      relatedSlugs={['st-george-day-countdown', 'easter-countdown']}
    />
  );
}
