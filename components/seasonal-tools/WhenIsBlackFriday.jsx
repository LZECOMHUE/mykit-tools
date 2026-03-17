'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getBlackFridayDate(year) {
  const november = new Date(year, 10, 1);
  let dayOfWeek = november.getDay();
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
  const firstThursday = new Date(year, 10, 1 + daysUntilThursday);
  const fourthThursday = new Date(firstThursday);
  fourthThursday.setDate(fourthThursday.getDate() + 21);
  const blackFridayDate = new Date(fourthThursday);
  blackFridayDate.setDate(blackFridayDate.getDate() + 1);
  return blackFridayDate;
}

export default function WhenIsBlackFriday() {
  return (
    <WhenIsTemplate
      name="Black Friday"
      getDate={getBlackFridayDate}
      description="Black Friday is the day after Thanksgiving in the United States, falling on the fourth Friday in November. It marks the unofficial start of the Christmas shopping season and is known for deep discounts and sales. Black Friday has become a global shopping event, with retailers offering significant price cuts both in-store and online. The term 'Black Friday' refers to the idea that retail profits go from red to black on this profitable day."
      traditions={[
        'Major sales and discounts across all types of products',
        'Opening sales early or midnight shopping',
        'Online shopping deals and discounts',
        'Cyber Monday the following Monday for additional online deals',
        'Doorbuster deals and limited quantities',
        'Extended shopping hours',
        'Camping outside stores for early access',
        'Gift buying for the Christmas season',
      ]}
      funFacts={[
        'Black Friday is the busiest shopping day of the year in the US',
        'The term "Black Friday" dates back to the 1950s in Philadelphia',
        'Over $1 billion in sales are made on Black Friday in the US',
        'Cyber Monday, the Monday after Black Friday, is the busiest online shopping day',
        'Black Friday shopping has expanded globally to Europe and Asia',
      ]}
      relatedSlugs={['cyber-monday-countdown', 'christmas-countdown']}
    />
  );
}
