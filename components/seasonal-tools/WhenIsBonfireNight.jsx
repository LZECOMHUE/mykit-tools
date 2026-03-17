'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getBonfireNightDate(year) {
  return new Date(year, 10, 5);
}

export default function WhenIsBonfireNight() {
  return (
    <WhenIsTemplate
      name="Bonfire Night"
      getDate={getBonfireNightDate}
      description="Bonfire Night, also known as Guy Fawkes Night, is celebrated on 5 November in the UK. The date commemorates the discovery of the Gunpowder Plot in 1605, when Guy Fawkes and other conspirators attempted to blow up Parliament. The night is celebrated with bonfires, fireworks, and burning effigies of Guy Fawkes. It is a significant cultural event in British society with centuries of tradition."
      traditions={[
        'Building and lighting large bonfires in public spaces',
        'Setting off fireworks and firecrackers',
        'Burning Guy Fawkes effigies on bonfires',
        'Eating traditional bonfire night foods like toffee apples and parkin cake',
        'Attending organised bonfire night displays and events',
        'Watching fireworks displays in towns and cities',
        'Gathering around bonfires with family and friends',
        'Telling stories about Guy Fawkes and the Gunpowder Plot',
      ]}
      funFacts={[
        'Guy Fawkes Night celebrates the failure of the Gunpowder Plot of 1605',
        'The phrase "Remember, remember, the fifth of November" comes from the rhyme about the plot',
        'Guy Fawkes was caught in the cellars under Parliament with gunpowder',
        'Bonfire night traditions have been celebrated for over 400 years',
        'Some bonfires require careful preparation and safety measures for large displays',
      ]}
      relatedSlugs={['halloween-countdown', 'remembrance-day-countdown']}
    />
  );
}
