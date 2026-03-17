'use client';

import WhenIsTemplate from './WhenIsTemplate';

function getMothersDayUKDate(year) {
  const easter = new Date(year, 0, 1);
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
  const mothersDayDate = new Date(easterDate);
  mothersDayDate.setDate(mothersDayDate.getDate() - 21);
  return mothersDayDate;
}

export default function WhenIsMothersDayUK() {
  return (
    <WhenIsTemplate
      name="Mother's Day (UK)"
      getDate={getMothersDayUKDate}
      description="Mother's Day in the UK, also known as Mothering Sunday, is celebrated on the fourth Sunday of Lent, which falls 21 days before Easter. This day honours mothers and maternal figures in British society. Unlike Mother's Day in many other countries, the UK celebrates Mothering Sunday, a Christian tradition linked to the Christian calendar. It is a time to express gratitude to mothers and carers through cards, gifts, flowers, and special meals."
      traditions={[
        'Giving Mother\'s Day cards to mothers and maternal figures',
        'Presenting flowers, especially carnations and spring flowers',
        'Giving gifts like chocolates, perfume, or jewellery',
        'Preparing special breakfasts or meals for mothers',
        'Family gatherings and meals',
        'Church services dedicated to mothers',
        'Wearing flowers in honour of mothers',
      ]}
      funFacts={[
        'UK Mother\'s Day falls 21 days before Easter, making the date change each year',
        'Mothering Sunday dates back to medieval times in Britain',
        'Originally, servants were given a day off to visit their family church',
        'The tradition of giving flowers became popular during the Victorian era',
        'UK Mother\'s Day is different from Mother\'s Day celebrated on May 10 in some countries',
      ]}
      relatedSlugs={['fathers-day-countdown', 'easter-countdown']}
    />
  );
}
