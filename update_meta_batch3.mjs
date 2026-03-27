import fs from 'fs';

let content = fs.readFileSync('lib/tool-registry.js', 'utf8');

const updates = [
  {
    slug: 'when-is-remembrance-day',
    title: '"When is Remembrance Day? (UK Dates & Sunday Info)"',
    extraKeywords: ', when is remembrance day in uk, when is remembrance sunday this year, remembrance date'
  },
  {
    slug: 'cocktail-recipe-generator',
    title: '"Cocktail Recipe Maker & Ingredient Generator"',
    extraKeywords: ', cocktail recipe maker, cocktail builder, cocktail generator, online cocktail maker, cocktail ingredients generator'
  },
  {
    slug: 'australia-long-service-leave-calculator',
    title: '"Australia Long Service Leave Calculator (Accrual & Pro Rata)"',
    extraKeywords: ', long service leave accrual, pro rata long service leave calculator, qld long service leave calculator, long service leave wa calculator'
  },
  {
    slug: 'double-glazing-payback-calculator',
    title: '"Double Glazing Cost & Savings Payback Calculator"',
    extraKeywords: ', secondary glazing cost calculator, double glazed windows cost calculator, double glazing cost calculator'
  },
  {
    slug: 'us-medical-bill-estimator',
    title: '"US Medical Bill & Patient Cost Estimator"',
    extraKeywords: ', patient cost estimator, patient cost estimator tool, billing estimate tool'
  }
];

updates.forEach(up => {
  const regex = new RegExp(`(slug: "${up.slug}",[\\s\\S]*?keywords: ")([^"]+)("[\\s\\S]*?seoTitle: )null`);
  content = content.replace(regex, (match, p1, p2, p3) => {
    return p1 + p2 + up.extraKeywords + p3 + up.title;
  });
});

fs.writeFileSync('lib/tool-registry.js', content, 'utf8');

import('./lib/tool-registry.js').then(r => {
  const cats = r.tools.filter(t => updates.some(u => u.slug === t.slug)).map(t => t.slug + ': ' + t.category);
  console.log('Categories:', cats.join(', '));
});
