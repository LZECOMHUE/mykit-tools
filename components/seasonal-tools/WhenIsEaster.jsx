'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

export default function WhenIsEaster() {
  return (
    <WhenIsTemplate
      name="Easter"
      getDate={getEasterDate}
      description="Easter is the most important Christian festival, celebrating the resurrection of Jesus Christ. The date changes each year because it is calculated based on the lunar calendar. It falls on the first Sunday after the first full moon following the spring equinox. In the UK, Easter is a major holiday with a four-day weekend, and it marks the end of the Lenten period of fasting and reflection."
      traditions={[
        'Easter eggs and chocolate eggs, symbolising new life and rebirth',
        'Easter egg hunts, especially popular with children in gardens and parks',
        'Hot cross buns, traditionally eaten on Good Friday',
        'Easter Sunday roasts, often featuring lamb or ham',
        'Easter parade and bonnet decorating traditions',
        'Giving Easter cards to friends and family',
        'Easter baskets filled with treats and gifts',
      ]}
      funFacts={[
        'The word "Easter" may come from "Eostre," the Anglo-Saxon goddess of spring',
        'Chocolate was first used for Easter eggs in France during the 18th century',
        'Easter can fall anywhere between March 22 and April 25',
        'The UK eats approximately 80 million Easter eggs every year',
        'In some traditions, people eat simnel cake, a fruit cake covered with marzipan',
      ]}
      relatedSlugs={['pancake-day', 'hot-cross-buns-recipe']}
    />
  );
}
