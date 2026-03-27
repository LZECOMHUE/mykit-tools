import fs from 'fs';

let indexContent = fs.readFileSync('data/seo-content/index.js', 'utf8');
indexContent = indexContent.replace(
  'import { gameSEO } from "./games";',
  'import { gameSEO } from "./games";\nimport { seasonalSEO } from "./seasonal.js";\nimport { businessSEO } from "./business.js";\nimport { mapsSEO } from "./maps.js";'
);
indexContent = indexContent.replace(
  '...gameSEO,',
  '...gameSEO,\n  ...seasonalSEO,\n  ...businessSEO,\n  ...mapsSEO,'
);
fs.writeFileSync('data/seo-content/index.js', indexContent, 'utf8');

let financeContent = fs.readFileSync('data/seo-content/finance.js', 'utf8');
const newFinance = `
  "workplace-pension-calculator": {
    sections: [
      createAnswerFirstSection(
        "Understanding Auto Enrolment in the UK",
        "Every employer in the UK must automatically enrol eligible staff into a workplace pension scheme and pay money into it. The minimum total contribution is 8% of your qualifying earnings: 5% from you, and 3% from your employer.",
        "Your employer might pay more than the legal minimum, and they might calculate contributions on your full salary rather than just qualifying earnings. A workplace pension calculator (like this one) cuts through the confusion and shows exactly how much is deposited each month."
      )
    ],
    faqs: [
      createFAQ(
        "Is the workplace pension a legal requirement?",
        "Yes, auto enrolment is a legal duty for employers. However, employees have the right to opt out manually if they wish. Opting out is rarely recommended, as you lose your employer's matched contribution — essentially turning down tax-free free money."
      ),
      createFAQ(
        "How are pensionable earnings calculated?",
        "For 2025/26, qualifying or 'pensionable' earnings are the portion of your salary between £6,240 and £50,270. If your salary is £30,000, your qualifying earnings are £23,760. Your 5% contribution is calculated purely on this middle slice."
      )
    ]
  },

  "canada-tfsa-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Track TFSA Contribution Room",
        "Your Tax-Free Savings Account (TFSA) contribution room accumulates over time. If you turned 18 and were a Canadian resident in 2009 or earlier, your total cumulative room is now over $95,000. Unused room carries forward indefinitely, meaning you don't lose the space if you don't invest in a given year.",
        "Withdrawing money from your TFSA does not permanently reduce your room. You regain the withdrawn contribution space on January 1st of the following calendar year. Our TFSA calculator factors in standard interest rates to help you visualize long-term compounding tax-free growth."
      )
    ],
    faqs: [
      createFAQ(
        "What is the TFSA contribution limit for 2025?",
        "The annual TFSA contribution limit usually sits around $7,000, but gets indexed to inflation. However, you are likely working with a much higher cumulative limit. Check your exact available contribution room by logging into the CRA (Canada Revenue Agency) website."
      ),
      createFAQ(
        "Does the TFSA calculator show post-tax interest returns?",
        "A TFSA is completely tax-free. Any interest, capital gains, or dividends generated within the account are yours to keep, and you do not pay income tax when you withdraw the funds, so the returns shown by our calculator are your true, final returns."
      )
    ]
  }
};
`;
financeContent = financeContent.replace('};', newFinance);
fs.writeFileSync('data/seo-content/finance.js', financeContent, 'utf8');
console.log('Finance and Index updated successfully!');
