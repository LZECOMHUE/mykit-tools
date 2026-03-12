// SEO content for finance tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const financeSEO = {
  "uk-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Income Tax Works",
        "UK income tax is calculated on a tiered system. You get a personal allowance (currently £12,570) that is completely tax-free. Everything above that is taxed in bands: 20% basic rate up to £50,270 total income, 40% higher rate up to £125,140, and 45% additional rate above that.",
        "If you live in Scotland, you pay Scottish income tax rates instead, which have six bands ranging from 19% to 48%. Your tax code (shown on your payslip) tells your employer how much tax-free pay to give you before deducting tax."
      ),
      createAnswerFirstSection(
        "The £100,000 Tax Trap Explained",
        "Once your income exceeds £100,000, your personal allowance is gradually withdrawn. For every £2 you earn above £100,000, you lose £1 of your £12,570 allowance. This creates a hidden 60% tax rate on income between £100,000 and £125,140.",
        "For example, if you earn £110,000, you lose £5,000 of your personal allowance. That £10,000 of extra income costs you £4,000 in income tax (40%) plus £2,000 from the lost allowance, giving an effective rate of 60%. This is one of the most commonly missed tax planning issues in the UK. Salary sacrifice into a pension is one of the most effective ways to bring your income back below £100,000 and reclaim the full allowance."
      ),
      {
        heading: "Common Salary Breakdown Examples",
        table: {
          headers: ["Gross Salary", "Income Tax", "NI", "Take-Home (annual)", "Take-Home (monthly)"],
          rows: [
            ["£25,000", "£2,486", "£994", "£21,520", "£1,793"],
            ["£35,000", "£4,486", "£1,794", "£28,720", "£2,393"],
            ["£50,000", "£7,486", "£2,994", "£39,520", "£3,293"],
            ["£75,000", "£14,486", "£3,494", "£57,020", "£4,752"],
            ["£100,000", "£27,432", "£3,994", "£68,574", "£5,715"],
          ],
        },
      },
      createAnswerFirstSection(
        "National Insurance Contributions",
        "Employees pay National Insurance at 8% on earnings between £12,570 and £50,270, then 2% on anything above that. NI is separate from income tax but is deducted from your pay in the same way. You stop paying NI when you reach State Pension age (currently 66).",
        "From April 2025, employer NI increased to 15% with a lower threshold of £5,000. This does not directly reduce your pay, but it does affect your employer's costs and may influence future pay decisions."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the UK personal allowance for 2025/26?",
        "The personal allowance for the 2025/26 tax year is £12,570. This is the amount you can earn before paying any income tax. It has been frozen at this level since 2021/22 and is expected to remain frozen until at least April 2028."
      ),
      createFAQ(
        "How much tax do I pay on £50,000?",
        "On a salary of £50,000 in 2025/26, you would pay approximately £7,486 in income tax and £2,994 in National Insurance, leaving a take-home pay of around £39,520 per year or £3,293 per month. This assumes a standard tax code of 1257L with no pension contributions."
      ),
      createFAQ(
        "Do I pay Scottish income tax?",
        "You pay Scottish income tax rates if you live in Scotland, regardless of where you work. Scottish rates range from 19% (starter rate) to 48% (top rate) and have different band thresholds. Your tax code will start with an 'S' if you are a Scottish taxpayer."
      ),
      createFAQ(
        "How does student loan repayment affect my take-home pay?",
        "Student loan repayments are deducted at 9% of income above the plan threshold (£27,295 for Plan 2 in 2025/26). On a £35,000 salary with Plan 2, you would repay around £57.79 per month. Postgraduate loans are repaid at 6% above £21,000, and you can repay both simultaneously."
      ),
      createFAQ(
        "What is the marriage allowance?",
        "Marriage allowance lets you transfer £1,260 of your personal allowance to your spouse or civil partner if they earn more than you. This saves up to £252 per year. You can claim if one of you earns less than £12,570 and the other is a basic rate taxpayer."
      ),
    ],
  },

  "uk-dividend-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Dividend Tax Works",
        "Dividends are taxed separately from salary. You get a £500 dividend allowance each year (tax-free). Dividends above that are taxed at 8.75% (basic rate), 33.75% (higher rate), or 39.35% (additional rate), depending on which income tax band they fall into.",
        "The key thing to understand is that your salary uses up your tax bands first. So if your salary already puts you in the higher rate band, all your taxable dividends will be taxed at 33.75%. This is why director-shareholders often take a low salary combined with dividends to stay within the basic rate band."
      ),
      createAnswerFirstSection(
        "Optimal Salary and Dividend Strategy for Directors",
        "Many company directors pay themselves a combination of a low salary (typically £12,570 to use the personal allowance) and dividends on top. This is usually more tax-efficient than taking a large salary because dividends are not subject to National Insurance.",
        "For example, a director taking £12,570 salary plus £40,000 in dividends would pay roughly £3,456 in dividend tax. If they took the same £52,570 as salary instead, they would pay £7,486 in income tax plus £2,994 in NI, a difference of over £7,000. However, the optimal split depends on your specific circumstances, and corporation tax on the company profits must also be considered."
      ),
      createAnswerFirstSection(
        "The Dividend Allowance Over Time",
        "The dividend allowance has been reduced significantly in recent years. It was £5,000 in 2017/18, cut to £2,000 in 2018/19, then to £1,000 in 2023/24, and now just £500 from 2024/25 onwards. This means shareholders pay considerably more tax on dividends than they did a few years ago."
      ),
    ],
    faqs: [
      createFAQ(
        "Do I pay National Insurance on dividends?",
        "No. Dividends are not subject to National Insurance contributions. This is one reason why taking income as dividends (where possible) is often more tax-efficient than salary. However, only company shareholders can receive dividends, and you must pay corporation tax on the profits first."
      ),
      createFAQ(
        "What is the dividend tax rate for 2025/26?",
        "The dividend tax rates for 2025/26 are 8.75% (basic rate), 33.75% (higher rate), and 39.35% (additional rate). The first £500 of dividends is tax-free under the dividend allowance. These rates apply after your salary and other income have used up the relevant tax bands."
      ),
      createFAQ(
        "Do I need to file a tax return for dividends?",
        "You may need to file a self-assessment tax return if your dividends exceed £10,000 in total, or if you owe tax on dividends that was not collected through PAYE. If your dividends are within the £500 allowance, you do not need to report them."
      ),
      createFAQ(
        "Can I split dividends with my spouse?",
        "You can only receive dividends in proportion to your shareholding. If you and your spouse both own shares in the company, you can each receive dividends on your own shares. This can be a useful way to use both of your dividend allowances and basic rate bands."
      ),
    ],
  },

  "uk-capital-gains-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Capital Gains Tax Works",
        "Capital Gains Tax (CGT) is charged on the profit when you sell an asset that has increased in value. You only pay CGT on the gain (the difference between what you paid and what you sold for), not on the total sale price. The first £3,000 of gains each year is tax-free (the Annual Exempt Amount).",
        "CGT rates for 2025/26 are 18% (basic rate) and 24% (higher rate) for most assets. Your salary and other income determine which band your gains fall into. If you have unused basic rate band, gains use that up first at 18% before the 24% rate kicks in."
      ),
      createAnswerFirstSection(
        "CGT on Property vs Shares",
        "From April 2025, the same rates apply to residential property and other assets: 18% for basic rate taxpayers and 24% for higher rate taxpayers. Previously, residential property had higher rates of 18% and 28%, so the gap has narrowed.",
        "Your main home (primary residence) is usually exempt from CGT under Private Residence Relief. CGT on property most commonly applies to second homes, buy-to-let properties, and inherited properties that you later sell. For shares, you can use your ISA allowance to shelter gains, and transfers between spouses are CGT-free."
      ),
      createAnswerFirstSection(
        "Business Assets Relief (formerly Entrepreneurs' Relief)",
        "If you sell all or part of a qualifying business, you may be able to claim Business Assets Relief. This charges CGT at a reduced rate of 14% (for 2025/26) instead of the normal 18% or 24%. There is a lifetime limit of £1,000,000 in qualifying gains.",
        "To qualify, you typically need to have owned the business for at least 2 years, been involved in running it, and held at least 5% of the shares and voting rights. This relief was previously charged at 10% and is increasing to 14% from April 2025, with a further increase to 18% from April 2026."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the CGT annual exempt amount for 2025/26?",
        "The Annual Exempt Amount for 2025/26 is £3,000 per person. This is the amount of capital gains you can make each tax year without paying any CGT. It was reduced from £6,000 in 2023/24 and cannot be carried forward to future years."
      ),
      createFAQ(
        "Do I pay CGT on my main home?",
        "No. Your main home is usually completely exempt from CGT under Private Residence Relief. However, if you have let part of it out, used it for business, or have more than one property, the relief may be reduced. You should keep records of when you lived in the property."
      ),
      createFAQ(
        "Can I offset losses against gains?",
        "Yes. If you make a capital loss (sell an asset for less than you paid), you can offset it against gains in the same tax year. Unused losses can be carried forward to future years indefinitely. You must report losses to HMRC within 4 years of the end of the tax year."
      ),
      createFAQ(
        "Do I need to report CGT to HMRC?",
        "You must report and pay CGT on UK residential property within 60 days of completion. For other assets, you report gains through your self-assessment tax return. You do not need to report gains that fall within your annual exempt amount."
      ),
    ],
  },

  "uk-inheritance-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Inheritance Tax Works",
        "Inheritance Tax (IHT) is charged at 40% on the value of your estate above the nil-rate band of £325,000. If you leave your main home to your children or grandchildren, you also get a residence nil-rate band of £175,000. This means a single person can pass on up to £500,000 tax-free, and a married couple can pass on up to £1,000,000.",
        "The nil-rate band has been frozen at £325,000 since 2009 and is expected to remain at this level until at least 2030. Because house prices have risen significantly during this period, more estates are now above the IHT threshold than ever before."
      ),
      createAnswerFirstSection(
        "How Spouse Transfers Work",
        "Anything you leave to your spouse or civil partner is completely exempt from IHT, regardless of the amount. When the surviving spouse later dies, their estate can use both nil-rate bands, giving a combined threshold of up to £1,000,000 (£650,000 in nil-rate bands plus £350,000 in residence nil-rate bands).",
        "This transferable allowance is one of the most valuable IHT reliefs. Even if the first spouse used some of their nil-rate band (for example, by leaving money to children), the unused percentage transfers to the surviving spouse."
      ),
      createAnswerFirstSection(
        "The 7-Year Rule for Gifts",
        "Gifts made more than 7 years before death are completely outside your estate for IHT purposes. Gifts made within 7 years of death may be taxable, but taper relief reduces the rate: full tax in the first 3 years, then reducing to 32%, 24%, 16%, and 8% in subsequent years before becoming fully exempt after 7 years.",
        "You can also give up to £3,000 per year using your annual exemption (and carry forward one unused year), make small gifts of up to £250 per person, and give regular gifts out of surplus income without any time limit. Wedding gifts have higher limits: £5,000 from parents, £2,500 from grandparents."
      ),
      createAnswerFirstSection(
        "The Charity Rate Reduction",
        "If you leave at least 10% of your estate to charity, the IHT rate on the rest drops from 40% to 36%. This can create a situation where leaving more to charity actually increases the amount your family receives, because the 4% rate reduction more than offsets the gift."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the IHT threshold for 2025/26?",
        "The basic nil-rate band is £325,000 per person. With the residence nil-rate band of £175,000 (if you leave your home to direct descendants), a single person can pass on up to £500,000 tax-free. Married couples can combine their allowances for up to £1,000,000."
      ),
      createFAQ(
        "Is life insurance included in my estate?",
        "Yes, unless it is written in trust. Life insurance payouts are added to your estate and may push it above the IHT threshold. Writing a life insurance policy in trust means the payout goes directly to your beneficiaries without being counted as part of your estate."
      ),
      createFAQ(
        "Do I pay IHT on pensions?",
        "From April 2027, most unused pension pots will be included in your estate for IHT purposes. Currently, pensions are generally outside your estate. If you die before age 75, beneficiaries receive the pension tax-free. After 75, they pay income tax on withdrawals but no IHT."
      ),
      createFAQ(
        "What happens to the residence nil-rate band for estates over £2 million?",
        "The residence nil-rate band of £175,000 is tapered for estates worth more than £2 million. You lose £1 of the allowance for every £2 above £2 million. This means the RNRB is completely lost once the estate reaches £2,350,000."
      ),
    ],
  },

  "uk-student-loan-calculator": {
    sections: [
      createAnswerFirstSection(
        "Which Student Loan Plan Am I On?",
        "Your repayment plan depends on when and where you studied. Plan 1 is for those who started before September 2012 in England/Wales (or any year in Northern Ireland). Plan 2 is for England/Wales starters from September 2012 to July 2023. Plan 4 is for Scottish students. Plan 5 is for those starting from August 2023 onwards. Postgraduate loans are separate and repaid at 6% instead of 9%.",
        "If you are unsure which plan you are on, check your payslip (it will show the plan type), contact the Student Loans Company, or log in to your SLC account online."
      ),
      createAnswerFirstSection(
        "How Student Loan Repayments Are Calculated",
        "You repay 9% of everything you earn above your plan's threshold. For Plan 2 in 2025/26, the threshold is £27,295. So if you earn £35,000, you repay 9% of £7,705 (the amount above the threshold), which works out to £693.45 per year or £57.79 per month.",
        "Repayments are automatic through PAYE if you are employed. If you are self-employed, repayments are collected through your self-assessment tax return. You can have multiple plans at once (for example, Plan 2 plus a Postgraduate loan), and each is repaid simultaneously."
      ),
      {
        heading: "Repayment Thresholds by Plan (2025/26)",
        table: {
          headers: ["Plan", "Threshold", "Rate", "Write-off"],
          rows: [
            ["Plan 1", "£24,990", "9%", "25 years after first repayment (or age 65)"],
            ["Plan 2", "£27,295", "9%", "40 years after graduation"],
            ["Plan 4", "£31,395", "9%", "30 years after graduation"],
            ["Plan 5", "£25,000", "9%", "40 years after graduation"],
            ["Postgraduate", "£21,000", "6%", "30 years after first repayment"],
          ],
        },
      },
      createAnswerFirstSection(
        "Should I Make Voluntary Repayments?",
        "For most Plan 2 borrowers, voluntary repayments are not recommended. Because the loan is written off after 40 years, many graduates will never repay in full. Making extra repayments just means you pay more overall without reducing what you owe by enough to clear it before write-off.",
        "Voluntary repayments make more sense if you are a high earner who will repay in full anyway, if you are close to clearing the balance, or if you are on Plan 1 (which has a shorter write-off period). Use this calculator to project your repayment timeline before deciding."
      ),
    ],
    faqs: [
      createFAQ(
        "What happens to my student loan if I move abroad?",
        "You must inform the Student Loans Company if you move overseas. Your repayment threshold and amount will be adjusted based on the cost of living in your new country. If you do not report your move, you may face penalties. Repayments abroad are made directly to the SLC, not through your employer."
      ),
      createFAQ(
        "Do student loan repayments affect my credit score?",
        "No. Student loan repayments do not appear on your credit file and have no impact on your credit score. However, the repayments reduce your take-home pay, which lenders may consider when assessing mortgage affordability."
      ),
      createFAQ(
        "Is interest charged on student loans?",
        "Yes. Plan 2 loans are charged interest at the Retail Price Index (RPI) plus up to 3%, depending on your income. Plan 1 and Plan 4 loans are charged the lower of RPI or the Bank of England base rate plus 1%. Plan 5 loans are charged RPI only."
      ),
      createFAQ(
        "Can my student loan be written off early?",
        "Student loans are written off after the plan's specified period (25 to 40 years depending on the plan). The write-off is automatic and the remaining balance is cancelled with no tax charge. There is no way to have it written off earlier unless you become permanently disabled."
      ),
    ],
  },

  "uk-pension-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Pension Tax Relief Works",
        "When you contribute to a pension, the government adds tax relief at your marginal rate. For a basic rate taxpayer, a £100 pension contribution only costs £80 because the pension provider claims back 20% from HMRC. Higher rate taxpayers can claim an additional 20% through their tax return, making the true cost just £60.",
        "This makes pensions one of the most tax-efficient ways to save. If your employer offers salary sacrifice for pension contributions, you also save National Insurance (8% for employees), making it even cheaper. On a £100 salary sacrifice pension contribution as a basic rate taxpayer, the true cost to your take-home pay is just £72."
      ),
      createAnswerFirstSection(
        "The 25% Tax-Free Lump Sum",
        "When you access your pension (from age 55, rising to 57 in 2028), you can usually take 25% of your total pot as a tax-free lump sum. The remaining 75% is then taxed as income when you withdraw it. For example, if your pension pot is £400,000, you could take £100,000 tax-free and draw income from the remaining £300,000.",
        "Many people spread their withdrawals over several tax years to stay within the basic rate band, reducing the total tax they pay. You do not have to take the 25% all at once."
      ),
      createAnswerFirstSection(
        "The 4% Withdrawal Rule",
        "The 4% rule is a widely used guideline for retirement income. It suggests that if you withdraw 4% of your pension pot in the first year (adjusting for inflation each year after), your money should last at least 30 years.",
        "For example, a pension pot of £500,000 would provide roughly £20,000 per year under this rule. Combined with the full State Pension of £11,502 per year, that gives a total retirement income of around £31,500. This calculator uses the 4% rule to estimate your retirement income."
      ),
      createAnswerFirstSection(
        "Workplace Pension Auto-Enrolment",
        "All UK employers must automatically enrol eligible workers into a workplace pension. The minimum total contribution is 8% of qualifying earnings: 5% from you and 3% from your employer. You can opt out, but you would lose your employer's contribution, which is essentially free money."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the pension annual allowance for 2025/26?",
        "The annual allowance is £60,000 for 2025/26. This is the maximum you can contribute to pensions in a tax year while still receiving tax relief. You can carry forward up to 3 years of unused allowance if you were a member of a pension scheme in those years."
      ),
      createFAQ(
        "When can I access my pension?",
        "Currently you can access your pension from age 55. This is increasing to 57 from April 2028. There is no upper age limit, and you do not have to access it at any particular time. You can also continue working while drawing your pension."
      ),
      createFAQ(
        "Should I contribute more than the minimum?",
        "In most cases, yes. The minimum 5% employee contribution (with 3% employer match) is unlikely to provide a comfortable retirement income on its own. Financial advisers typically suggest aiming for a total contribution of 12-15% of your salary throughout your career."
      ),
      createFAQ(
        "What is the State Pension and how much is it?",
        "The full new State Pension is £221.20 per week (£11,502.40 per year) for 2025/26. You need 35 qualifying years of National Insurance contributions to receive the full amount. You can check your State Pension forecast on the gov.uk website."
      ),
    ],
  },

  "uk-salary-sacrifice-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Salary Sacrifice Saves You Money",
        "Salary sacrifice works by reducing your official salary in exchange for a benefit (usually pension contributions, but also cycle to work, childcare, or electric vehicle leases). Because the sacrifice happens before tax and NI are calculated, you save both income tax and National Insurance on the sacrificed amount.",
        "For a higher rate taxpayer sacrificing £500 per month into a pension: you save 40% income tax (£200) plus 2% NI (£10), so the sacrifice only reduces your take-home pay by £290 instead of the full £500. Your employer also saves 15% employer NI (£75), and good employers pass some or all of this saving on to you as an additional pension contribution."
      ),
      createAnswerFirstSection(
        "Salary Sacrifice vs Personal Pension Contributions",
        "Salary sacrifice is almost always more tax-efficient than making personal pension contributions. With a personal contribution, you get tax relief but not NI relief. With salary sacrifice, you save both. The difference is 8% for basic rate taxpayers and 2% for higher rate taxpayers.",
        "The only downside is that salary sacrifice reduces your official salary, which could affect: mortgage applications (lenders look at gross salary), statutory maternity/paternity pay (based on earnings), death-in-service benefits (often a multiple of salary), and future pay rises (if calculated as a percentage of salary). Check with your employer about how they handle these."
      ),
      createAnswerFirstSection(
        "The £100,000 Salary Sacrifice Strategy",
        "If your salary is between £100,000 and £125,140, salary sacrifice into a pension can be extremely valuable. It brings your salary below the £100,000 threshold where you start losing your personal allowance. By sacrificing enough to bring your salary to £100,000, you effectively avoid the hidden 60% marginal tax rate and reclaim your full £12,570 allowance."
      ),
    ],
    faqs: [
      createFAQ(
        "Does salary sacrifice affect my mortgage application?",
        "It can. Some lenders look at your pre-sacrifice salary, others at your post-sacrifice salary. If you are planning to apply for a mortgage, check with your lender first. You can usually opt out of salary sacrifice temporarily, but this means losing the tax and NI savings."
      ),
      createFAQ(
        "Can I sacrifice below minimum wage?",
        "No. Your post-sacrifice salary must not fall below the National Minimum Wage. Your employer should ensure this does not happen. If sacrificing the full amount would take you below minimum wage, the sacrifice amount must be reduced."
      ),
      createFAQ(
        "Does salary sacrifice affect my student loan repayments?",
        "Yes. Because salary sacrifice reduces your official salary, it also reduces your student loan repayments. This is an additional benefit that is easy to overlook. Your repayments are based on your post-sacrifice earnings."
      ),
      createFAQ(
        "What benefits can I salary sacrifice for?",
        "The most common salary sacrifice benefits are: pension contributions, cycle to work schemes, electric vehicle leases, childcare vouchers (closed to new applicants but existing schemes continue), and technology schemes. Each must be set up formally by your employer."
      ),
    ],
  },

  "uk-self-assessment-estimator": {
    sections: [
      createAnswerFirstSection(
        "Who Needs to File a Self-Assessment Tax Return?",
        "You need to file a self-assessment tax return if you are self-employed and earned more than £1,000, if you earned more than £150,000 in total, if you have untaxed income (such as rental income, dividends over £10,000, or foreign income), or if you are a company director. You also need to file if you want to claim certain tax reliefs or if HMRC has asked you to.",
        "If your only income is from employment and is fully taxed through PAYE, you usually do not need to file. However, higher rate taxpayers with pension contributions or Gift Aid donations often file to claim additional tax relief."
      ),
      createAnswerFirstSection(
        "Key Self-Assessment Deadlines",
        "The tax year runs from 6 April to 5 April. For the 2025/26 tax year: you must register by 5 October 2026, file your paper return by 31 October 2026, and file your online return and pay your tax bill by 31 January 2027. Late filing incurs an automatic £100 penalty, rising to £10 per day after 3 months.",
        "If your tax bill for the previous year was over £1,000, HMRC will ask you to make payments on account. These are advance payments towards next year's bill, due on 31 January and 31 July, each equal to half of your previous year's bill."
      ),
      createAnswerFirstSection(
        "Payments on Account Explained",
        "Payments on account can catch people off guard. If your self-assessment bill is £5,000, HMRC will also require two payments on account of £2,500 each towards the following year's bill. This means your first January payment could be £7,500 (the £5,000 balance plus the first £2,500 payment on account).",
        "You can apply to reduce payments on account if you expect your income to be lower next year. If the payments on account turn out to be too much, HMRC will refund the difference after you file your next return."
      ),
      createAnswerFirstSection(
        "Class 2 and Class 4 National Insurance",
        "Self-employed workers pay two types of NI. Class 2 NI is a flat rate of £3.45 per week (if profits exceed £6,725). Class 4 NI is 6% on profits between £12,570 and £50,270, then 2% above that. Both are collected through your self-assessment tax return.",
        "Class 2 contributions count towards your State Pension entitlement. Even if your profits are below the threshold, you can choose to pay voluntarily to protect your pension record."
      ),
    ],
    faqs: [
      createFAQ(
        "What happens if I miss the self-assessment deadline?",
        "If you miss the 31 January deadline, you will receive an automatic £100 penalty (even if you owe no tax). After 3 months, daily penalties of £10 start accruing for up to 90 days. After 6 months, a further penalty of 5% of the tax due (or £300, whichever is greater) is charged. Interest also accrues on any unpaid tax."
      ),
      createFAQ(
        "Can I claim expenses as a sole trader?",
        "Yes. You can deduct allowable business expenses from your income before calculating tax. Common expenses include office costs, travel, stock, professional fees, advertising, insurance, and use of home as an office. Keep records and receipts for at least 5 years."
      ),
      createFAQ(
        "Do I need an accountant for self-assessment?",
        "Not necessarily. If your tax affairs are straightforward (for example, a single source of self-employment income with simple expenses), you can file yourself using HMRC's online system. However, if you have multiple income sources, complex expenses, or capital gains, an accountant can help ensure you claim all available reliefs."
      ),
      createFAQ(
        "What is the trading allowance?",
        "The trading allowance is £1,000 per year. If your self-employment income is below this, you do not need to register as self-employed or file a tax return. If your income is above £1,000, you can choose to deduct the £1,000 allowance instead of your actual expenses, whichever is more beneficial."
      ),
    ],
  },

  "uk-buy-to-let-calculator": {
    sections: [
      createAnswerFirstSection(
        "Section 24: How Mortgage Interest Tax Works for Landlords",
        "Since April 2020, landlords can no longer deduct mortgage interest from their rental income before calculating tax. Instead, you receive a 20% basic rate tax credit on the interest. This change significantly increased the tax bill for higher rate taxpayers.",
        "For example, if you have £12,000 rental income and £8,000 mortgage interest, you are now taxed on the full £12,000 (at your marginal rate of 40% for higher rate taxpayers, that is £4,800), then receive a tax credit of 20% of £8,000 (£1,600). Your net tax is £3,200. Under the old rules, you would have been taxed on just £4,000, paying £1,600. The difference is significant and has made buy-to-let less profitable for many landlords."
      ),
      createAnswerFirstSection(
        "Understanding Gross vs Net Yield",
        "Gross yield is the simplest measure: annual rent divided by property price. A property costing £250,000 with £1,200 per month rent has a gross yield of 5.76%. This is useful for comparing properties but does not reflect your actual return.",
        "Net yield accounts for mortgage payments, expenses, void periods, and tax. A property with a 5.76% gross yield might have a net yield of just 2-3% after all costs, or even negative if mortgage rates are high. Always calculate the net yield before making an investment decision."
      ),
      createAnswerFirstSection(
        "SDLT Surcharge on Additional Properties",
        "Since October 2024, buying a second (or additional) property incurs a 5% stamp duty surcharge on top of the standard SDLT rates. On a £250,000 property, this adds £12,500 to your purchase costs. This surcharge applies to buy-to-let purchases, holiday homes, and any property that is not your only residence.",
        "The surcharge increased from 3% to 5% in October 2024. If you are replacing your main home (selling one and buying another), the surcharge does not apply. If you end up owning two properties temporarily while selling your old home, you can claim a refund within 3 years."
      ),
      createAnswerFirstSection(
        "Key Costs to Budget For",
        "Beyond the mortgage and SDLT, landlords should budget for: letting agent fees (8-15% of rent), landlord insurance (£200-500 per year), maintenance and repairs (typically 1-2% of property value per year), gas safety certificates (£60-80 per year), Energy Performance Certificates (£60-120 every 10 years), void periods (typically 4-8 weeks per year on average), and potential legal costs for tenant issues."
      ),
    ],
    faqs: [
      createFAQ(
        "Is buy-to-let still worth it in 2025?",
        "It depends on your circumstances. Higher mortgage rates and the Section 24 tax changes have reduced profitability, especially for higher rate taxpayers. However, property prices tend to grow over the long term, and rental demand remains strong. The investment case is strongest for lower rate taxpayers, those with large deposits (reducing mortgage costs), and those investing in high-yield areas."
      ),
      createFAQ(
        "Should I use a limited company for buy-to-let?",
        "Buying through a limited company avoids the Section 24 restriction (mortgage interest is fully deductible), and corporation tax (25%) is lower than higher rate income tax (40%). However, there are additional costs: higher mortgage rates, accountancy fees, and double taxation if you want to extract profits. It generally makes sense for higher rate taxpayers building a portfolio, but not for a single property."
      ),
      createFAQ(
        "How much deposit do I need for buy-to-let?",
        "Most buy-to-let mortgages require a minimum 25% deposit, though some lenders accept 20%. A larger deposit (30-40%) will get you a better interest rate. On a £250,000 property, you would need £62,500 at 25%, plus SDLT and other purchase costs."
      ),
      createFAQ(
        "What is a good rental yield?",
        "A gross yield of 5-7% is generally considered good for residential property. Yields vary significantly by location: northern cities (Liverpool, Manchester, Leeds) typically offer 6-8%, while London properties may yield just 3-4%. Net yield after all costs is what truly matters for your investment return."
      ),
    ],
  },
};
