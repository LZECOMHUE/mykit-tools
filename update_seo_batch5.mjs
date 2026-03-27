import fs from 'fs';

// --- 1. UPDATE REGISTRY METADATA ---
let registry = fs.readFileSync('lib/tool-registry.js', 'utf8');
const updates = [
  {
    slug: 'mortgage-affordability-calculator',
    title: '"Mortgage Affordability Calculator (How much do I qualify for?)"',
    extraKeywords: ', what do i qualify for mortgage calculator, what can i get approved for mortgage calculator, 5 time salary mortgage calculator, free home loan calculator, mortgage calculator how much do i qualify for'
  },
  {
    slug: 'australia-penalty-rate-calculator',
    title: '"Australia Penalty Rates Calculator (Night Shift & Weekends)"',
    extraKeywords: ', penalty rates, night shift penalty rates australia, part time penalty rates, penalty rates for night shift, what are saturday penalty rates in australia'
  },
  {
    slug: 'key-finder',
    title: '"Musical Key & Chords Finder"',
    extraKeywords: ', key finder music chords, key finder with chords, chords key finder, chord key finder'
  },
  {
    slug: 'uk-self-assessment-estimator',
    title: '"UK Self Assessment Tax Return Estimator & Calculator"',
    extraKeywords: ', what is my tax return, how is self assessment tax calculated, self assessment tax rate, how to calculate self assessment tax'
  },
  {
    slug: 'childcare-cost-calculator',
    title: '"Childcare Costs & Benefits Calculator"',
    extraKeywords: ', childcare calculator, childcare benefits calculator, childcare benefit calculator, subsidized daycare calculator'
  }
];

updates.forEach(up => {
  const regex = new RegExp(`(slug: "${up.slug}",[\\s\\S]*?keywords: ")([^"]+)("[\\s\\S]*?seoTitle: )null`);
  registry = registry.replace(regex, (match, p1, p2, p3) => {
    return p1 + p2 + up.extraKeywords + p3 + up.title;
  });
});
fs.writeFileSync('lib/tool-registry.js', registry, 'utf8');

// --- 2. UPDATE music.js ---
let musicContent = fs.readFileSync('data/seo-content/music.js', 'utf8');
const newMusic = `
  "key-finder": {
    sections: [
      createAnswerFirstSection(
        "How a Musical Key Finder Works",
        "If you have a chord progression (e.g., C Major, F Major, G Major) but do not know what musical key you are playing in, a key finder tool reverses the process. It analyzes the specific notes within your chords and matches them against the 24 major and minor keys.",
        "Knowing your song's key is critical for writing melodies, adding a bassline, communicating with other musicians, and figuring out which scales (like the pentatonic or diatonic scale) you can use to solo over the track."
      )
    ],
    faqs: [
      createFAQ(
        "Can a key finder with chords detect multiple keys?",
        "Yes, it is very common in music theory for a simple chord progression (like Am and C) to exist perfectly in multiple keys (such as C Major or G Major). Our chord key finder will list all possible matching keys, ranked by the highest statistical probability."
      ),
      createFAQ(
        "What does it mean if my chords do not fit any key?",
        "If your chords contain notes outside of a traditional 7-note diatonic scale, you might be using 'borrowed chords' (modal mixture) or passing secondary dominants. While this breaks strict music theory rules, it often sounds great! The tool will highlight the closest matching key."
      )
    ]
  }
};`;
musicContent = musicContent.replace('};', newMusic);
fs.writeFileSync('data/seo-content/music.js', musicContent, 'utf8');

// --- 3. UPDATE finance.js ---
let financeContent = fs.readFileSync('data/seo-content/finance.js', 'utf8');
const newFinanceBatch5 = `
  "mortgage-affordability-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Mortgage Can You Qualify For?",
        "Lenders determine your maximum borrowing capacity using an income multiple (typically 4.5x your annual salary, sometimes up to 5x or 5.5x for high earners) and a strict affordability stress test checking your monthly outgoings.",
        "A mortgage affordability calculator estimates the ceiling of what a bank will lend you. Crucially, just because you qualify for a massive mortgage does not mean you should take it. You must ensure you can comfortably afford the monthly repayments without severely compromising your lifestyle."
      )
    ],
    faqs: [
      createFAQ(
        "Is there a 5 times salary mortgage calculator?",
        "Yes, our calculator allows you to adjust the income multiplier up to 5x or even 5.5x. However, in the UK, the Bank of England heavily restricts the number of mortgages lenders can offer at multiples of 4.5 or higher. To qualify for a 5x multiple, you usually need a pristine credit score and a high combined household income."
      ),
      createFAQ(
        "Do personal loans affect my mortgage approval?",
        "Yes, significantly. Lenders legally must factor in your exact monthly debt obligations (car finance, personal loans, credit card balances). These fixed outgoings drastically reduce your monthly disposable income, which lowers the maximum amount you can borrow."
      )
    ]
  },

  "australia-penalty-rate-calculator": {
    sections: [
      createAnswerFirstSection(
        "Understanding Australia's Penalty Rates",
        "In Australia, 'penalty rates' are higher legal pay rates designated by the Fair Work Ombudsman for employees working outside normal hours. If you work on weekends, public holidays, late night shifts, or early mornings, you are legally entitled to compensation above your base pay rate.",
        "These rates are determined by your specific modern award or enterprise agreement. For example, a retail worker might get 125% pay on Saturdays and 150% on Sundays, while hospitality workers might have completely different multipliers."
      )
    ],
    faqs: [
      createFAQ(
        "What are Saturday penalty rates in Australia?",
        "Saturday rates heavily depend on your industry's Modern Award. Common multipliers are 125% (time-and-a-quarter) or 150% (time-and-a-half). Casual employees often receive their 25% casual loading on top of these penalty rates, but exact interaction rules vary by award."
      ),
      createFAQ(
        "Do part-time employees get penalty rates?",
        "Yes. Part-time employees are absolutely entitled to penalty rates if they work weekends, public holidays, or late night shifts, exactly like full-time employees. If your employer claims otherwise, check the Fair Work Ombudsman guidelines."
      )
    ]
  },

  "childcare-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "Navigating Childcare Costs and Government Benefits",
        "Childcare is often one of the largest financial burdens for working families. Depending on your country (such as the UK's Tax-Free Childcare scheme or Australia's Child Care Subsidy), governments offer substantial financial assistance to help parents return to the workforce.",
        "A subsidized daycare calculator takes your combined household income, your working hours, and the number of children in care, and factors all of them against government subsidy thresholds to determine your true out-of-pocket cost."
      )
    ],
    faqs: [
      createFAQ(
        "How is the childcare benefit calculated?",
        "In most systems (like Australia's CCS), the subsidy is heavily means-tested. Families earning a lower combined income receive a higher percentage of their hourly fees covered (up to 90%). As household income rises, the subsidy percentage tapers down."
      ),
      createFAQ(
        "Does the subsidy cap cover the full daily fee?",
        "Rarely. Subsidies are usually capped at an 'hourly rate cap' set by the government (e.g. $13.73 an hour). If your prestigious daycare charges $16 an hour, the government only subsidizes a percentage of the $13.73 cap, leaving you to pay the gap completely out-of-pocket."
      )
    ]
  }
};`;
financeContent = financeContent.replace('};', newFinanceBatch5);
fs.writeFileSync('data/seo-content/finance.js', financeContent, 'utf8');

console.log('Batch 5 Complete!');
