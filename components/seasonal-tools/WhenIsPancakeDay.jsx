'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getPancakeDayDate(year) {
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
  const easterDate = new Date(year, month - 1, day);
  const pancakeDayDate = new Date(easterDate);
  pancakeDayDate.setDate(pancakeDayDate.getDate() - 47);
  return pancakeDayDate;
}

export default function WhenIsPancakeDay() {
  return (
    <WhenIsTemplate
      name="Pancake Day"
      getDate={getPancakeDayDate}
      description="Pancake Day, also known as Shrove Tuesday, falls 47 days before Easter and marks the last day before Lent begins. Traditionally, pancakes were eaten on this day to use up ingredients like butter, eggs, and sugar that were forbidden during the Lenten period. In the UK, Pancake Day is a fun celebration where people make and eat pancakes, often competing in pancake races. It is a secular holiday celebrated throughout Britain."
      traditions={[
        'Making and eating pancakes with various toppings',
        'Organising pancake races in towns and cities',
        'Tossing pancakes in frying pans',
        'Eating pancakes with lemon and sugar',
        'Competing in charity pancake races',
        'Serving pancakes for breakfast or lunch',
        'School pancake-eating competitions',
        'Family pancake-making parties',
      ]}
      funFacts={[
        'Pancake Day falls on a different date each year because Easter is calculated using the lunar calendar',
        'The tradition of pancake racing is unique to the UK, particularly in the Cotswolds',
        'Pancakes were eaten to use up rich foods before the Lenten fasting period',
        'The oldest pancake race tradition dates back to 1445 in Olney, Buckinghamshire',
        'Lemon and sugar remains the most popular pancake topping in the UK',
      ]}
      relatedSlugs={['easter-countdown', 'pancake-recipe']}
    />
  );
}
