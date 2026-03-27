import fs from 'fs';

let businessContent = fs.readFileSync('data/seo-content/business.js', 'utf8');
const newBusiness = `
  "employee-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "The True Cost of an Employee",
        "When hiring a new employee, their gross salary is only the starting point. As an employer, you must also pay national insurance (or payroll taxes depending on your country), mandatory pension contributions, software licences, office space, and benefits.",
        "A typical rule of thumb is that an employee actually costs an employer 1.25 to 1.4 times their base salary. Our cost of employment calculator breaks this down precisely to help you budget for new hires without unexpected surprises down the line."
      )
    ],
    faqs: [
      createFAQ(
        "How much does it cost to employ someone in Australia?",
        "In Australia, on top of the base salary, employers must legally pay an 11.5% Superannuation Guarantee (rising to 12% by July 2025) and state-based Payroll Tax if your total wage bill exceeds the threshold. You must also factor in Worker's Compensation insurance and leave loading."
      ),
      createFAQ(
        "What are the employer costs in the UK?",
        "In the UK, the major additional costs are Employer National Insurance Contributions (which increased to 15% with a much lower threshold starting April 2025) and mandatory auto-enrolment pension contributions."
      )
    ]
  }
};
`;
businessContent = businessContent.replace('};', newBusiness);
fs.writeFileSync('data/seo-content/business.js', businessContent, 'utf8');

let mapsContent = fs.readFileSync('data/seo-content/maps.js', 'utf8');
const newMaps = `
  "nearest-public-toilet-finder": {
    sections: [
      createAnswerFirstSection(
        "Find the Closest Public Restroom Instantly",
        "When you need to go, you need to go. Our interactive map uses your live GPS location to pinpoint the nearest public toilets, open bathrooms in shopping centres, and accessible restrooms.",
        "Whether you are travelling in an unfamiliar city, driving cross-country, or dealing with a medical condition, having a reliable toilet locator can bring immense peace of mind."
      )
    ],
    faqs: [
      createFAQ(
        "Does the map show accessible or disabled toilets?",
        "Yes, our map includes filters for accessible restrooms (including those requiring a Radar key in the UK) and baby changing facilities. This makes it easier for parents and individuals with disabilities to find suitable facilities nearby."
      ),
      createFAQ(
        "Are the listed public bathrooms free to use?",
        "Most public toilets displayed on the map are free, but some in major train stations or tourist areas may require a small fee. We aim to highlight whether a facility is paid or free whenever that data is available."
      )
    ]
  }
};
`;
mapsContent = mapsContent.replace('};', newMaps);
fs.writeFileSync('data/seo-content/maps.js', mapsContent, 'utf8');

let financeContent = fs.readFileSync('data/seo-content/finance.js', 'utf8');
const newFinance = `
  "us-student-loan-calculator": {
    sections: [
      createAnswerFirstSection(
        "Understanding Federal vs Private Student Loans",
        "When calculating your student loan payoff, it is critical to distinguish between federal and private loans. Federal loans offer flexible repayment plans, such as Income-Driven Repayment (IDR) and potential forgiveness options.",
        "Private loans (from providers like Sallie Mae or Discover) generally have stricter repayment terms and variable interest rates. You cannot use federal repayment plans for private loans, which means your monthly payment is rigidly based on the loan term and interest rate."
      )
    ],
    faqs: [
      createFAQ(
        "How do I use a federal student loan calculator?",
        "Enter your total loan balance, your interest rate, and your expected loan term. The calculator will determine your fixed monthly payment to clear the debt in that timeframe. For federal loans, a standard repayment plan is 10 years."
      ),
      createFAQ(
        "Can I pay off my Sallie Mae loan faster?",
        "Yes, you can make extra payments toward the principal balance of any student loan, including private loans like Sallie Mae, without early repayment penalties. Making extra contributions drastically reduces the total interest paid over the life of the loan."
      )
    ]
  },

  "australia-pay-calculator": {
    sections: [
      createAnswerFirstSection(
        "Australia PAYE and Take Home Pay",
        "Calculating your net pay in Australia involves deducting PAYG (Pay As You Go) withholding tax and the 2% Medicare levy from your gross salary. The ATO sets strict tax brackets, meaning the more you earn, the higher the marginal tax rate applies to your top dollars.",
        "Our AU take home pay calculator automatically applies the latest ATO tax tables to give you an accurate breakdown of your fortnightly or monthly salary, showing exactly what will land in your bank account."
      )
    ],
    faqs: [
      createFAQ(
        "How much tax do I pay in Australia?",
        "Australia has a progressive tax system with a tax-free threshold of $18,200. Earnings above that are taxed at 16%, 30%, 37%, and 45% as your income moves through the brackets. You also pay a 2% Medicare levy on your taxable income."
      ),
      createFAQ(
        "Does the pay calculator include the Medicare Levy Surcharge?",
        "If you do not have appropriate private hospital cover and your income exceeds the threshold, you may be liable for the Medicare Levy Surcharge (MLS) of an additional 1% to 1.5%. You should manually account for this if applicable."
      )
    ]
  },

  "company-car-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Benefit-in-Kind (BiK) Car Tax Works",
        "If your employer provides you with a company vehicle that you can use privately, this is considered a 'perk' or Benefit-in-Kind (BiK) by HMRC. You must pay income tax on the value of this benefit, which is deducted straight from your salary through your tax code.",
        "The tax amount is calculated using the car's P11D value (list price plus options), its CO2 emissions, and your personal income tax bracket. The higher the emissions and the higher your tax bracket, the more company car tax you pay."
      )
    ],
    faqs: [
      createFAQ(
        "Why is a hybrid company car tax calculator so important?",
        "For hybrid vehicles, BiK tax rates depend not just on CO2 emissions, but also on the car's zero-emission electric range. A plug-in hybrid with an electric range of over 130 miles falls into an ultra-low tax bracket, whereas a mild hybrid is taxed heavily like a standard petrol car."
      ),
      createFAQ(
        "Is an electric company car worth it?",
        "Absolutely. Fully electric vehicles currently enjoy exceptionally low BiK tax rates (fixed at 2% until April 2025, rising by 1% annually thereafter). Choosing an EV over a combustion engine car can easily save a higher-rate taxpayer thousands of pounds per year in company car tax."
      )
    ]
  }
};
`;
financeContent = financeContent.replace('};', newFinance);
fs.writeFileSync('data/seo-content/finance.js', financeContent, 'utf8');

console.log('Batch 2 Content updated!');
