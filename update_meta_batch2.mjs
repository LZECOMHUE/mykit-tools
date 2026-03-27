import fs from 'fs';

let content = fs.readFileSync('lib/tool-registry.js', 'utf8');

const updates = [
  {
    slug: 'us-student-loan-calculator',
    title: '"US Student Loan Calculator (Federal & Sallie Mae)"',
    extraKeywords: ', federal student loan calculator, sallie mae loan calculator, fedloan calculator, student loan total'
  },
  {
    slug: 'australia-pay-calculator',
    title: '"Australia Pay Calculator (Take Home Pay & ATO PAYE)"',
    extraKeywords: ', australia paye, au take home pay calculator, paye australia, ato tax payment calculator'
  },
  {
    slug: 'nearest-public-toilet-finder',
    title: '"Nearest Public Toilet Finder (Closest Restroom Map)"',
    extraKeywords: ', closest public restroom, nearest public restroom to my location, public bathroom near me now, closest public toilet'
  },
  {
    slug: 'employee-cost-calculator',
    title: '"Employee Cost to Employer Calculator (True Salary Cost)"',
    extraKeywords: ', cost of employment calculator, employer cost calculator, employee cost calculator australia, how much does it cost to employ someone'
  },
  {
    slug: 'company-car-tax-calculator',
    title: '"Company Car Tax Calculator (BiK & Hybrid Vehicles)"',
    extraKeywords: ', company vehicle tax calculator, hybrid company car tax calculator, comcar tax calculator, bik car tax calculator'
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
