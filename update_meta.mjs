import fs from 'fs';

let content = fs.readFileSync('lib/tool-registry.js', 'utf8');

const updates = [
  {
    slug: 'when-is-hanukkah',
    title: '"When is Hanukkah Next? Dates & Countdown"',
    // Adding keywords based on queries: when does hanukkah start, what days are hanukkah, hanukkah dates
    extraKeywords: ', when does hanukkah start, when is hanukkah celebrated, what days are hanukkah'
  },
  {
    slug: 'amazon-fba-calculator',
    title: '"Amazon FBA Calculator UK (Seller Fees & Profit)"',
    extraKeywords: ', amazon seller fees uk, amazon fba fees uk, amazon fulfillment fees uk, ebay selling fees'
  },
  {
    slug: 'workplace-pension-calculator',
    title: '"Workplace Pension Calculator UK (Auto Enrolment)"',
    extraKeywords: ', workplace pension calculator gov uk, pensionable earnings calculator'
  },
  {
    slug: 'canada-tfsa-calculator',
    title: '"Canada TFSA Calculator (Interest Rate & Savings Return)"',
    extraKeywords: ', tfsa interest rate calculator, tfsa return calculator'
  },
  {
    slug: 'nearest-defibrillator-finder',
    title: '"Nearest Defibrillator Finder (AED Locations Map)"',
    extraKeywords: ', aed locations, closest aed, defib finder, patient cost estimator tool'
  }
];

updates.forEach(up => {
  const regex = new RegExp(`(slug: "${up.slug}",[\\s\\S]*?keywords: ")([^"]+)("[\\s\\S]*?seoTitle: )null`);
  content = content.replace(regex, (match, p1, p2, p3) => {
    return p1 + p2 + up.extraKeywords + p3 + up.title;
  });
});

fs.writeFileSync('lib/tool-registry.js', content, 'utf8');
console.log('Metadata updated successfully!');
