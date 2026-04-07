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
        "From April 2026, employer NI increased to 15% with a lower threshold of £5,000. This does not directly reduce your pay, but it does affect your employer's costs and may influence future pay decisions."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the UK personal allowance for 2026/27?",
        "The personal allowance for the 2026/27 tax year is £12,570. This is the amount you can earn before paying any income tax. It has been frozen at this level since 2021/22 and is expected to remain frozen until at least April 2028."
      ),
      createFAQ(
        "How much tax do I pay on £50,000?",
        "On a salary of £50,000 in 2026/27, you would pay approximately £7,486 in income tax and £2,994 in National Insurance, leaving a take-home pay of around £39,520 per year or £3,293 per month. This assumes a standard tax code of 1257L with no pension contributions."
      ),
      createFAQ(
        "Do I pay Scottish income tax?",
        "You pay Scottish income tax rates if you live in Scotland, regardless of where you work. Scottish rates range from 19% (starter rate) to 48% (top rate) and have different band thresholds. Your tax code will start with an 'S' if you are a Scottish taxpayer."
      ),
      createFAQ(
        "How does student loan repayment affect my take-home pay?",
        "Student loan repayments are deducted at 9% of income above the plan threshold (£27,295 for Plan 2 in 2026/27). On a £35,000 salary with Plan 2, you would repay around £57.79 per month. Postgraduate loans are repaid at 6% above £21,000, and you can repay both simultaneously."
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
        "What is the dividend tax rate for 2026/27?",
        "The dividend tax rates for 2026/27 are 8.75% (basic rate), 33.75% (higher rate), and 39.35% (additional rate). The first £500 of dividends is tax-free under the dividend allowance. These rates apply after your salary and other income have used up the relevant tax bands."
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
        "CGT rates for 2026/27 are 18% (basic rate) and 24% (higher rate) for most assets. Your salary and other income determine which band your gains fall into. If you have unused basic rate band, gains use that up first at 18% before the 24% rate kicks in."
      ),
      createAnswerFirstSection(
        "CGT on Property vs Shares",
        "From April 2026, the same rates apply to residential property and other assets: 18% for basic rate taxpayers and 24% for higher rate taxpayers. Previously, residential property had higher rates of 18% and 28%, so the gap has narrowed.",
        "Your main home (primary residence) is usually exempt from CGT under Private Residence Relief. CGT on property most commonly applies to second homes, buy-to-let properties, and inherited properties that you later sell. For shares, you can use your ISA allowance to shelter gains, and transfers between spouses are CGT-free."
      ),
      createAnswerFirstSection(
        "Business Assets Relief (formerly Entrepreneurs' Relief)",
        "If you sell all or part of a qualifying business, you may be able to claim Business Assets Relief. This charges CGT at a reduced rate of 14% (for 2026/27) instead of the normal 18% or 24%. There is a lifetime limit of £1,000,000 in qualifying gains.",
        "To qualify, you typically need to have owned the business for at least 2 years, been involved in running it, and held at least 5% of the shares and voting rights. This relief was previously charged at 10% and is increasing to 14% from April 2026, with a further increase to 18% from April 2026."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the CGT annual exempt amount for 2026/27?",
        "The Annual Exempt Amount for 2026/27 is £3,000 per person. This is the amount of capital gains you can make each tax year without paying any CGT. It was reduced from £6,000 in 2023/24 and cannot be carried forward to future years."
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
        "What is the IHT threshold for 2026/27?",
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
        "You repay 9% of everything you earn above your plan's threshold. For Plan 2 in 2026/27, the threshold is £27,295. So if you earn £35,000, you repay 9% of £7,705 (the amount above the threshold), which works out to £693.45 per year or £57.79 per month.",
        "Repayments are automatic through PAYE if you are employed. If you are self-employed, repayments are collected through your self-assessment tax return. You can have multiple plans at once (for example, Plan 2 plus a Postgraduate loan), and each is repaid simultaneously."
      ),
      {
        heading: "Repayment Thresholds by Plan (2026/27)",
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
      createAnswerFirstSection(
        "The Lifetime Allowance (LTA) Abolishment",
        "In April 2024, the Lifetime Allowance (previously £1,073,100) was officially abolished. There is no longer a cap on how much you can accumulate in your pension pot over your lifetime without facing punitive tax charges.",
        "However, it was replaced by the Lump Sum Allowance (LSA), which caps the maximum tax-free cash you can withdraw at £268,275 (exactly 25% of the old LTA). Any lump sums taken above this limit are taxed at your marginal rate."
      ),
      createAnswerFirstSection(
        "Pension Carry Forward Rules Explained",
        "The Carry Forward rule allows you to use up unused annual pension allowances from the previous three tax years, potentially enabling you to contribute far more than the current £60,000 limit in a single year and receive massive tax relief.",
        "To use carry forward, you must have been a member of a registered pension scheme during the years you are carrying forward from. You must also use your current year's £60,000 allowance fully before tapping into previous years. This strategy is incredibly powerful for company directors making employer contributions or high earners trying to mitigate the £100k tax trap."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the pension annual allowance for 2026/27?",
        "The annual allowance is £60,000 for 2026/27. This is the maximum you can contribute to pensions in a tax year while still receiving tax relief. You can carry forward up to 3 years of unused allowance if you were a member of a pension scheme in those years."
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
        "The full new State Pension is £221.20 per week (£11,502.40 per year) for 2026/27. You need 35 qualifying years of National Insurance contributions to receive the full amount. You can check your State Pension forecast on the gov.uk website."
      ),
      createFAQ(
        "What happens to my pension if I die before retirement?",
        "If you die before age 75, your beneficiaries can inherit your defined contribution pension pot completely tax-free. If you die after age 75, your beneficiaries will pay income tax at their marginal rate on any withdrawals they make from the inherited pot."
      ),
      createFAQ(
        "Can I take my pension and continue working?",
        "Yes, you can draw from your pension while continuing to work. However, once you start flexibly accessing taxable income from your pension, you trigger the Money Purchase Annual Allowance (MPAA). This drastically reduces your future annual allowance from £60,000 down to just £10,000, limiting your ability to build your pot further."
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
        "The tax year runs from 6 April to 5 April. For the 2026/27 tax year: you must register by 5 October 2026, file your paper return by 31 October 2026, and file your online return and pay your tax bill by 31 January 2027. Late filing incurs an automatic £100 penalty, rising to £10 per day after 3 months.",
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

  "pay-rise-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Calculate a Pay Rise",
        "A pay rise is calculated as a percentage increase on your current salary. To work it out manually, multiply your current salary by the percentage and divide by 100. For example, a 5% rise on a £30,000 salary is £1,500, giving you a new salary of £31,500.",
        "Keep in mind that the amount you actually take home will be less than the gross increase. Higher earners may find that a pay rise pushes them into a higher tax band, meaning part of the increase is taxed at 40% instead of 20%. This calculator shows both the gross and net impact so you can see exactly what lands in your bank account."
      ),
      {
        heading: "Common Pay Rise Examples (2026/27 Tax Year)",
        table: {
          headers: ["Current Salary", "3% Rise", "5% Rise", "10% Rise"],
          rows: [
            ["£25,000", "£25,750", "£26,250", "£27,500"],
            ["£30,000", "£30,900", "£31,500", "£33,000"],
            ["£40,000", "£41,200", "£42,000", "£44,000"],
            ["£50,000", "£51,500", "£52,500", "£55,000"],
            ["£75,000", "£77,250", "£78,750", "£82,500"],
          ],
        },
      },
      createAnswerFirstSection(
        "What Is a Good Pay Rise in 2025?",
        "The average UK pay rise in 2025 is around 4-5% according to recent surveys, though this varies widely by sector. Public sector workers have seen rises of 2-3%, while tech and finance roles have averaged 5-7%. At a minimum, your pay rise should match inflation to avoid a real-terms pay cut.",
        "If you have not received a rise in over a year, your purchasing power has likely fallen. Use this calculator to see what your salary would need to be to match the cost of living, then use that figure when negotiating with your employer."
      ),
      createAnswerFirstSection(
        "Pay Rise vs Inflation",
        "A pay rise only makes you better off if it exceeds inflation. If inflation is running at 3% and you receive a 3% rise, your real spending power has not changed. You need to beat inflation to genuinely earn more. CPI inflation in the UK was around 3-4% through early 2025.",
        "When negotiating a raise, frame it in these terms. Asking for an 'inflation plus 2%' rise is more compelling than asking for a specific number, because it acknowledges the economic context and positions the request as reasonable."
      ),
    ],
    faqs: [
      createFAQ(
        "How much extra will I take home after a pay rise?",
        "It depends on your tax band. A basic rate taxpayer (earning under £50,270) keeps about 68p of every extra £1 after income tax and National Insurance. A higher rate taxpayer (over £50,270) keeps about 58p. Use this calculator to see your exact take-home increase."
      ),
      createFAQ(
        "Should I ask for a pay rise or a one-off bonus?",
        "A pay rise is almost always better in the long term because it compounds. A £2,000 pay rise gives you £2,000 more every year for the rest of your career (plus future percentage rises on top). A £2,000 bonus is a one-time payment, taxed the same way, and does not increase your base salary."
      ),
      createFAQ(
        "When is the best time to ask for a pay rise?",
        "The best time is during your annual review, after completing a major project, or when you have taken on additional responsibilities. Avoid asking during company-wide cost-cutting. Come prepared with evidence of your contributions and market salary data for your role."
      ),
      createFAQ(
        "Does a pay rise affect my student loan repayments?",
        "Yes. Student loan repayments are calculated as a percentage of income above the threshold (£27,295 for Plan 2). A pay rise increases your repayments by 9% of the additional income above the threshold, but this also means you pay off your loan faster."
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
        "Yes, auto enrolment is a legal duty for employers. However, employees have the right to opt out manually if they wish. Opting out is rarely recommended, as you lose your employer's matched contribution - essentially turning down tax-free free money."
      ),
      createFAQ(
        "How are pensionable earnings calculated?",
        "For 2026/27, qualifying or 'pensionable' earnings are the portion of your salary between £6,240 and £50,270. If your salary is £30,000, your qualifying earnings are £23,760. Your 5% contribution is calculated purely on this middle slice."
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
  },

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
        "Absolutely. Fully electric vehicles currently enjoy exceptionally low BiK tax rates (fixed at 2% until April 2026, rising by 1% annually thereafter). Choosing an EV over a combustion engine car can easily save a higher-rate taxpayer thousands of pounds per year in company car tax."
      )
    ]
  },

  "australia-long-service-leave-calculator": {
    sections: [
      createAnswerFirstSection(
        "Understanding Long Service Leave (LSL) Accrual",
        "Long Service Leave (LSL) is a paid leave entitlement for Australian employees who have worked for the same employer for a continuous, extended period. The core principle is consistent, but the exact accrual rates, eligibility thresholds, and payout rules vary significantly between states (e.g. QLD vs WA vs VIC).",
        "Typically, employees are entitled to 2 months (8.6667 weeks) of paid leave after 10 years of continuous service. Use calculating tools to track your exact accrual and pro rata entitlements."
      )
    ],
    faqs: [
      createFAQ(
        "How does a pro rata long service leave calculator work?",
        "If you leave your employer after a certain number of years (usually 7 years, but this depends on your state), but before the full 10-year mark, you may be entitled to a pro rata (proportional) payout of your accrued leave. The calculator factors in your specific state legislation to determine if you meet this threshold."
      ),
      createFAQ(
        "Does LSL apply to casual and part-time workers?",
        "Yes, in most Australian states and territories, casual and permanent part-time employees are eligible for Long Service Leave. The accrual is calculated proportionally based on the total hours worked over their continuous employment."
      )
    ]
  },

  "us-medical-bill-estimator": {
    sections: [
      createAnswerFirstSection(
        "Navigating US Healthcare Costs",
        "The US healthcare system is notoriously complex due to the interplay of deductibles, copays, coinsurance, and out-of-pocket maximums. A patient cost estimator tool helps you forecast exactly what a procedure or treatment will cost you personally, rather than relying on abstract hospital chargemaster rates.",
        "Always remember: the 'billed amount' is rarely what you actually pay. Your insurance company negotiates a much lower 'allowed amount', and your out-of-pocket obligation is based strictly on that lower negotiated rate."
      )
    ],
    faqs: [
      createFAQ(
        "How is patient responsibility calculated on a medical bill?",
        "First, you must pay 100% of the negotiated rate until your annual deductible is met. Afterward, you enter the coinsurance phase (e.g. your insurance pays 80%, you pay 20%). Once your total payments hit the out-of-pocket maximum, the insurance covers 100% of allowed charges for the rest of the year."
      ),
      createFAQ(
        "Can a billing estimate tool guarantee the final cost?",
        "No. An estimator provides a highly accurate forecast based on your insurance plan's summary of benefits. However, if complications arise during a procedure requiring additional doctors, imaging, or longer hospital stays, the final billed amount will increase."
      )
    ]
  },

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
};


