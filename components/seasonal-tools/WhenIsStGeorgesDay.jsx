'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getStGeorgesDayDate(year) {
  return new Date(year, 3, 23);
}

export default function WhenIsStGeorgesDay() {
  return (
    <WhenIsTemplate
      name="St George's Day"
      getDate={getStGeorgesDayDate}
      description="St George's Day is celebrated on 23 April to honour Saint George, the patron saint of England. St George is famous for the legend of slaying a dragon. In England, the day is celebrated as a marker of English identity and heritage. Traditionally, St George's Day was a major festival, though it is less widely observed today. It is marked by displaying the English flag (St George's Cross), which features a red cross on a white background."
      traditions={[
        'Displaying the English flag (St George\'s Cross)',
        'Wearing red and white colours',
        'Attending St George\'s Day celebrations and fairs',
        'Reading the legend of St George and the dragon',
        'Wearing red roses or red crosses',
        'Traditional English food and drink',
        'Church services dedicated to St George',
        'Re-enactments of the dragon-slaying legend',
      ]}
      funFacts={[
        'St George is the patron saint of England, Portugal, Georgia, and several other countries',
        'The legend of St George slaying the dragon dates back to medieval times',
        'St George\'s Cross is the flag of England and appears in the Union Jack',
        'St George\'s Day was a major festival in medieval England, equal to Christmas',
        'The same date (23 April) is also celebrated as Shakespeare\'s birthday',
      ]}
      relatedSlugs={['easter-countdown', 'spring-equinox-countdown']}
    />
  );
}
