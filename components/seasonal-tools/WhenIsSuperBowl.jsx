'use client';

import WhenIsTemplate from './WhenIsTemplate';

const SUPER_BOWL_DATES = {
  2025: new Date(2025, 1, 9),
  2026: new Date(2026, 1, 1),
  2027: new Date(2027, 1, 7),
  2028: new Date(2028, 1, 6),
  2029: new Date(2029, 1, 4),
  2030: new Date(2030, 1, 3),
  2031: new Date(2031, 1, 2),
  2032: new Date(2032, 1, 1),
  2033: new Date(2033, 1, 6),
  2034: new Date(2034, 1, 5),
};

function getSuperBowlDate(year) {
  return SUPER_BOWL_DATES[year] || new Date(year, 1, 9);
}

export default function WhenIsSuperBowl() {
  return (
    <WhenIsTemplate
      name="Super Bowl"
      getDate={getSuperBowlDate}
      description="The Super Bowl is the annual championship game of the National Football League (NFL) in the United States, played on the first Sunday in February. It is one of the most watched sporting events in the world, attracting millions of viewers. The Super Bowl is famous not only for the football game but also for its expensive and creative television advertisements, halftime show performances, and elaborate parties. It has become a cultural event beyond just sports."
      traditions={[
        'Watching the Super Bowl game on television',
        'Organising Super Bowl parties with food and drinks',
        'Eating appetizers, wings, nachos, and pizza',
        'Viewing expensive and creative television advertisements',
        'Watching the halftime show performance',
        'Betting on the game and propositions',
        'Discussing plays and team performances',
        'Attending Super Bowl parties with friends and family',
      ]}
      funFacts={[
        'The Super Bowl is watched by over 100 million people in the US',
        'Super Bowl advertisements cost millions of dollars for 30-second spots',
        'The halftime show features major music and entertainment acts',
        'The Super Bowl has been held every year since 1967',
        'Super Bowl Sunday is the second-largest eating day in the US after Thanksgiving',
      ]}
      relatedSlugs={['thanksgiving-countdown', 'march-madness-countdown']}
    />
  );
}
