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

  "should-i-pay-off-debt-or-save": {
    sections: [
      createAnswerFirstSection(
        "Should I Pay Off Debt or Save?",
        "If your debt's interest rate is higher than the return you'd earn saving that money, paying off debt first wins mathematically. A credit card at 20% APR costs more than almost any savings account or ISA pays. Clearing that debt is a guaranteed, tax-free 20% return.",
        "The break-even point is roughly when your debt interest rate equals your expected savings or investment return. At that point the two strategies are equivalent, and personal factors like peace of mind or the need for an accessible emergency fund should guide your decision."
      ),
      createAnswerFirstSection(
        "The Maths Behind the Recommendation",
        "This calculator runs both strategies forward over 10 years using compound monthly interest. Strategy A pays off your debt first, then redirects every pound into savings. Strategy B ignores the debt and saves everything, leaving the debt to grow. The 'net benefit' figure is the difference in your overall wealth after 10 years.",
        "Because debt interest compounds against you at the same rate savings compound for you, even a small gap between the two rates creates a surprisingly large difference over time. A debt at 18.9% vs savings at 4.5% means the pay-debt strategy wins by thousands over a decade."
      ),
      {
        heading: "Common Debt vs Savings Rate Comparisons",
        table: {
          headers: ["Debt Type", "Typical Rate", "Best Savings Rate (2026)", "Verdict"],
          rows: [
            ["Credit card", "18-30%", "4-5% (cash ISA)", "Always pay debt first"],
            ["Personal loan", "6-15%", "4-5% (cash ISA)", "Usually pay debt first"],
            ["Car finance", "5-12%", "4-5% (cash ISA)", "Pay debt, unless rate is low"],
            ["Student loan (Plan 2)", "7.1%", "7%+ (S&S ISA long-term)", "Very close call - consider both"],
            ["Help to Buy mortgage", "1.75%", "4-5% (cash ISA)", "Save/invest first"],
          ],
        },
      },
      createAnswerFirstSection(
        "When Saving First Makes Sense",
        "There are cases where saving before paying debt is the smarter move. If you have no emergency fund, building 3 months of expenses in accessible savings first protects you from going further into debt when unexpected costs hit. Your employer may also match pension contributions - that is effectively a 50-100% instant return, almost always worth prioritising over paying down cheap debt.",
        "Some debt, like student loans in the UK, uses an income-contingent repayment model rather than compounding interest in the traditional sense. In those cases the standard maths does not apply and saving or investing alongside repayments can be the better strategy."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I pay off all debt before starting to save?",
        "Not necessarily. High-interest debt (credit cards, payday loans) should almost always be cleared first. But if you have no emergency fund, building 1-3 months of savings in parallel is sensible. And if your employer matches pension contributions, capture that match before paying down anything."
      ),
      createFAQ(
        "Does debt interest rate or savings rate matter more?",
        "The gap between the two rates matters most. If your debt costs 20% and your savings earn 4%, the 16-point gap means every pound on debt gives a 16p per year better return than saving. If the gap is only 1-2%, other factors like liquidity and peace of mind often matter more than the maths."
      ),
      createFAQ(
        "What counts as a good savings rate to compare?",
        "Use the actual annual rate you'd earn. For cash ISAs or savings accounts in 2026, that is around 4-5%. For stocks and shares ISAs or index funds, historical long-run returns average 6-10% per year but with significant short-term volatility. Using 7% is a reasonable planning assumption for a diversified investment portfolio held 10+ years."
      ),
      createFAQ(
        "Should UK student loans be treated as debt?",
        "Plan 2 and Plan 5 student loans in the UK are income-contingent - you only repay 9% of income above a threshold, and unrepaid balances are written off after 30-40 years. For most graduates, the standard debt-vs-save maths does not apply. Treat them more like a graduate tax than a conventional debt."
      ),
      createFAQ(
        "What is the 'net benefit' figure in this calculator?",
        "Net benefit is the difference in your overall financial position after 10 years between the two strategies. A positive figure means the 'pay debt first' approach leaves you better off. It accounts for the interest you avoid on the debt plus the compound growth of your savings after the debt is cleared."
      ),
    ],
    relatedTools: [
      { slug: "debt-payoff-calculator", label: "Debt Payoff Calculator" },
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
      { slug: "emergency-fund-calculator", label: "Emergency Fund Calculator" },
    ],
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
  },

  "mortgage-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Your Monthly Mortgage Payment Is Calculated",
        "The standard repayment formula is M = P × [r(1+r)^n] / [(1+r)^n - 1], where M is the monthly payment, P is the loan amount, r is the monthly interest rate (annual rate divided by 12) and n is the term in months. On a £200,000 loan at 4.5% over 25 years, that works out to £1,112 a month.",
        "The maths is brutal in the early years. On that same £200,000 loan, your first monthly payment puts £750 toward interest and only £362 toward the actual loan balance. By year 15 the split flips and most of each payment is finally chipping away at the principal. Total interest paid across the 25 years comes to roughly £133,560. That is why overpaying even £100 a month early in the term can knock years off the mortgage and save tens of thousands."
      ),
      createAnswerFirstSection(
        "Repayment vs Interest Only",
        "Repayment mortgages reduce the loan each month, so you own the property outright at the end of the term. Interest only mortgages keep the loan balance flat and you owe the full original amount when the term ends.",
        "Interest only is cheaper monthly. The same £200,000 loan at 4.5% costs £750 a month interest only, versus £1,112 a month on repayment. The catch is that you need a credible plan to clear the £200,000 at the end, usually selling the property, an investment portfolio or an inheritance. UK lenders have been strict about interest only since the 2014 Mortgage Market Review and most will not approve it for owner-occupiers without proof of a repayment vehicle. Most people buying a home should be on a repayment mortgage. Interest only is mainly used by buy-to-let landlords."
      ),
      createAnswerFirstSection(
        "How Much Can I Actually Borrow?",
        "UK lenders typically cap mortgage offers at 4.5 times your annual income, sometimes stretching to 5 or 5.5 times for higher earners and specialist schemes. On a household income of £60,000, that is a maximum loan of £270,000 to £330,000.",
        "The income multiple is only the start. Lenders run your full outgoings (childcare, car finance, credit card minimums, student loan repayments) and then stress-test your payments at a higher rate to make sure you could still cope if rates rose. A £20,000 deposit on a £250,000 house leaves a 92% loan-to-value mortgage, which costs noticeably more than an 80% LTV mortgage because the lender sees more risk. Once you know what you can borrow, use the [stamp duty calculator](/stamp-duty-calculator) to add the upfront tax bill to your budget, and the [savings burndown](/savings-burndown) tool to plan how long your deposit savings will last."
      ),
      createAnswerFirstSection(
        "Why a 0.5% Rate Change Matters So Much",
        "A small change in the headline rate has a disproportionate effect on the total cost. Going from 4.5% to 5.0% on a £200,000, 25-year mortgage adds £61 to the monthly payment but adds £18,300 to the total interest paid over the life of the loan.",
        "This is why fixed rate deals matter. Most UK borrowers fix for 2 or 5 years; when the deal ends, you re-mortgage onto a new rate or roll onto the lender's standard variable rate, which is currently 6 to 8%. The risk is that if rates have risen by the time you re-mortgage, your monthly payment jumps. The 2022 to 2023 rate cycle caught a lot of borrowers off guard: a 1.5% fix from 2020 that ended in 2023 often saw payments roughly double. The sensible move is to stress-test your own budget at 2 percentage points above your current rate before you commit."
      ),
      {
        heading: "Worked Examples at 4.5%",
        table: {
          headers: ["Loan", "Term", "Monthly Payment", "Total Interest"],
          rows: [
            ["£150,000", "25 years", "£833", "£100,200"],
            ["£200,000", "25 years", "£1,112", "£133,560"],
            ["£250,000", "25 years", "£1,389", "£166,950"],
            ["£300,000", "25 years", "£1,667", "£200,340"],
            ["£200,000 at 5.5%", "25 years", "£1,228", "£168,360"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is a typical UK mortgage rate in 2026?",
        "As of April 2026, typical 5-year fixed rates for borrowers with a 25% deposit sit around 4.0% to 4.5%. Smaller deposits push the rate up: a 90% LTV mortgage might be 4.8% to 5.2%. The rate you actually get depends on your credit profile, deposit size, the property type and the specific lender's appetite that week, so always confirm with a comparison site or broker before relying on a headline figure."
      ),
      createFAQ(
        "How much deposit do I need to buy a house?",
        "Most UK lenders accept a 5% deposit, but you get materially better rates with 10% or more, and the best rates start at 25%. A 5% deposit on a £250,000 house is £12,500, on top of which you need stamp duty, legal fees and a buffer for moving costs. First-time buyer schemes like the 95% mortgage guarantee exist if you cannot stretch further, but the underlying interest rates are usually higher."
      ),
      createFAQ(
        "Can I overpay my mortgage and how much will it save?",
        "Most fixed-rate UK mortgages let you overpay 10% of the outstanding balance each year without an early repayment charge. On a £200,000 mortgage that is up to £20,000 a year. Overpaying early in the term has the biggest impact because most of your monthly payment is interest at that point. An extra £100 a month on a £200,000, 25-year, 4.5% mortgage knocks roughly 4 years off the term and saves about £24,000 in interest."
      ),
      createFAQ(
        "What is loan-to-value and why does the band matter?",
        "LTV is the loan as a percentage of the property value. A £180,000 loan on a £200,000 house is 90% LTV. Lenders price mortgages in bands (typically 60%, 75%, 80%, 85%, 90%, 95%) and each step down to a lower band unlocks meaningfully better rates. Saving an extra £4,000 to drop from 91% LTV to 89% LTV might shave 0.3% off your rate, which on a £200,000 loan saves around £600 a year."
      ),
      createFAQ(
        "Should I take a 25-year or 35-year mortgage term?",
        "A longer term means lower monthly payments but much more interest paid overall. £200,000 at 4.5% costs £1,112 a month over 25 years (£133,560 interest) versus £946 a month over 35 years (£197,320 interest). Many lenders now offer 35 and even 40-year terms, and first-time buyers often pick longer terms to make affordability work. The smart play is to overpay or re-mortgage onto a shorter term as your income grows, so you do not pay the full long-term interest cost."
      ),
    ],
    relatedTools: [
      { slug: "stamp-duty-calculator", label: "Stamp Duty Calculator" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "savings-burndown", label: "Savings Burndown" },
    ],
  },

  "debt-payoff-calculator": {
    sections: [
      createAnswerFirstSection(
        "Avalanche vs Snowball: Which Strategy Wins?",
        "The avalanche method (clear the highest-interest debt first) saves you the most money in pure mathematical terms. On £15,000 of mixed debt at typical rates (a credit card at 24.9% APR, a personal loan at 9.9%, a car finance balance at 6.5%), avalanche saves around £1,200 in interest versus snowball over the payoff period. Snowball (clear the smallest balance first) is slower mathematically, but it gives you a quick win in the first 6 to 12 months, which dramatically improves the chances of actually finishing the plan.",
        "Choose avalanche if you are emotionally steady, comfortable with a long timeline before the first debt clears, and motivated by saving money. Choose snowball if you have ever quit a budget, started and stopped a payoff plan, or know you need momentum to stay engaged. The best strategy is the one you will actually finish, and behavioural finance research has consistently shown snowball completion rates are higher in real-world studies despite the worse maths. The calculator runs both side by side, so you can see exactly how much extra interest snowball will cost in your specific case before you decide."
      ),
      createAnswerFirstSection(
        "How the Calculation Works (Standard Amortisation, Nothing Fancy)",
        "Each debt is treated as a separate amortising balance with monthly compound interest. Your monthly budget is split into minimum payments on every debt plus an 'attack' payment on whichever debt the chosen strategy targets first. Once that debt clears, the freed-up minimum payment plus the attack amount roll forward onto the next target. This is the snowball or avalanche 'roll-up' effect, and it is what gives both strategies their power.",
        "On £20,000 of debt at an average 18% APR with a £500 monthly budget, you are looking at roughly 5 years 2 months to clear with avalanche, paying around £10,400 in total interest. The same setup with snowball clears in around 5 years 4 months at £11,100 interest. Less than two months of difference, around £700 in extra interest. For some debt mixes the gap is much smaller (a few pounds), for others much larger (a couple of thousand). The year-by-year timeline in the tool shows your remaining balance and total interest accrued at the end of each year."
      ),
      {
        heading: "Common Debt Types and Typical 2026 Rates",
        table: {
          headers: ["Debt Type", "Typical APR", "Why It Matters"],
          rows: [
            ["Credit card (standard)", "20% - 30%", "Almost always the avalanche target"],
            ["Store card", "25% - 35%", "Higher than credit cards, attack first"],
            ["Personal loan", "6% - 15%", "Fixed term and fixed rate, simpler to model"],
            ["Car finance (HP)", "5% - 12%", "Watch for early settlement charges"],
            ["Overdraft", "35% - 40%", "Brutally high; clear before any savings"],
            ["Buy Now Pay Later", "0% if on time, 30%+ if missed", "Diary the deadline or it gets nasty"],
          ],
        },
      },
      createAnswerFirstSection(
        "Should You Even Be Aggressively Paying Down All of This?",
        "Some debt should not be aggressively paid early. A 0% balance transfer card has zero interest until the promo period ends, so paying anything more than the minimum during that window is a bad use of cash. UK student loans (Plan 2 and Plan 5) are income-contingent and many graduates never repay in full; voluntary overpayments are usually wasted money. Help to Buy mortgages and shared-ownership loans often have low subsidised rates that should not be priority targets.",
        "An emergency fund usually trumps debt payoff, even high-interest debt. If you have no cash buffer, the next car repair or boiler breakdown will go straight onto the credit card you just cleared, and you will be back where you started but more demoralised. Most personal finance experts recommend at least one month of essentials in cash before any aggressive debt attack, then 3 to 6 months once the worst debt is gone. The [savings burndown](/savings-burndown) tool helps work out how long an emergency pot would last, and the [compound interest calculator](/compound-interest-calculator) shows how that pot grows once your debt is cleared and you redirect those payments into investing."
      ),
      createAnswerFirstSection(
        "When Debt Consolidation Makes the Calculator Lie",
        "If you can consolidate £20,000 of mixed debt at 18% APR onto a personal loan at 8% APR, you save thousands and the payoff timeline looks dramatically better. The maths is real, but two warnings: consolidation only works if you do not run the cleared cards back up (which most people do within 18 months according to lender data), and the headline rate quoted in advertising is the representative APR offered to 51% of accepted applicants, not necessarily the rate you will get. Soft-search the rate first before applying, because hard searches affect your credit file.",
        "Balance-transfer cards are the other consolidation route. A 0% balance transfer for 24 months at a 3% transfer fee on £5,000 of credit card debt means £150 in fees but no interest for two years, saving roughly £2,200 versus paying it on a standard credit card. The catch: the calculator will show this as huge savings only if you include the fee as upfront cost, and only if you actually clear the balance in the promo window. Roll into a second balance transfer when the first ends if you cannot, but each transfer adds another fee and requires an active credit check. The [mortgage calculator](/mortgage-calculator) is the right comparison if you are considering a debt consolidation loan secured against your home (do not, for almost any normal level of consumer debt, but the tool exists to model the cost if you were to)."
      ),
    ],
    faqs: [
      createFAQ(
        "How long will it take me to clear my debts?",
        "It depends on your total balance, the average interest rate and your monthly budget after minimum payments. As a rough guide: £10,000 of mixed debt at 18% APR with £300 a month going in clears in around 4 years 4 months. £20,000 at the same rate with £500 a month takes around 5 years 2 months. The calculator gives you the exact figure for your specific debts, including the year-by-year remaining balance, so you can see how long the long bit feels rather than just the headline."
      ),
      createFAQ(
        "What's the minimum payment trap?",
        "Credit card minimum payments in the UK are typically 1% of the balance plus the month's interest, or £5, whichever is higher. On a £5,000 balance at 24.9% APR, that is around £105 a month, of which roughly £100 is interest. Paying only the minimum, you would clear the balance in roughly 25 years and pay around £8,500 in interest on top of the original £5,000. Adding even £50 a month above the minimum cuts the payoff time to under 7 years and saves roughly £4,500."
      ),
      createFAQ(
        "Should I pay off the smallest debt or the highest-rate debt first?",
        "Mathematically, highest rate first (avalanche) saves more. Behaviourally, smallest first (snowball) is more motivating because you see a debt fully clear in months rather than years. If the gap in interest cost is small (the calculator will tell you exactly how small), pick whichever method you will actually stick with. If the gap is large (one debt is a 30% APR store card and the rest are sub-10%), avalanche is almost always the right call regardless of personality."
      ),
      createFAQ(
        "What if I can only afford the minimums right now?",
        "Make the minimums on time, every time, while you work to free up extra money. Missing minimum payments triggers default fees (usually £12 per missed payment in the UK), can push your interest rate to a higher penalty rate, and damages your credit file for up to 6 years. If the minimums are unaffordable, contact StepChange or Citizens Advice before missing payments; both offer free debt advice and can help you negotiate with creditors. A Debt Management Plan (DMP) freezes interest on most debts and stretches payments over 5 to 10 years; an Individual Voluntary Arrangement (IVA) is more formal but writes off remaining debt after the agreed term."
      ),
      createFAQ(
        "Does paying off debt early hurt my credit score?",
        "Almost never in any meaningful way. Closing a long-held credit account can very slightly reduce your average account age, which is a minor factor in credit scoring. Reducing your credit utilisation (the percentage of available credit you are using) significantly improves your score. The net effect of paying off debt is overwhelmingly positive for credit health, and the only situation where it hurts is if you close your only credit account and stop using credit entirely, which makes it harder to demonstrate ongoing borrowing behaviour to future lenders."
      ),
    ],
    relatedTools: [
      { slug: "mortgage-calculator", label: "Mortgage Calculator" },
      { slug: "savings-burndown", label: "Savings Burndown" },
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
    ],
  },

  "can-i-retire-early": {
    sections: [
      createAnswerFirstSection(
        "How Much Pension Pot Do You Need to Retire Early?",
        "As a rough guide, multiply your desired annual income by 25. If you want £30,000 a year before tax, you need a pot of around £750,000; if you want £40,000, you need £1,000,000. That figure assumes the 4% rule, which suggests withdrawing 4% of your pot in year one and adjusting that pound figure for inflation each year afterwards.",
        "The 4% rule was built on US data and a 30-year retirement. If you retire at 55 and live to 90, you are funding 35 years and the safe withdrawal rate drops closer to 3.3% on the cautious end. At 3.3%, the same £30,000 lifestyle needs roughly £910,000. None of this includes the State Pension, which adds £11,973 a year from age 66 in 2026/27 and reduces the gap your private pot has to fill once you cross that line."
      ),
      createAnswerFirstSection(
        "The Bridge Years Are the Hard Part",
        "Most pensions cannot be touched before age 55, rising to 57 in April 2028. The State Pension does not start until 66 (and is rising to 67 between 2026 and 2028). If you want to retire at 50, you need to fund five years of living costs entirely outside your pension wrapper, normally from a Stocks and Shares ISA or a General Investment Account. A 50-year-old wanting £30k a year for five bridge years needs roughly £150,000 in accessible non-pension money before they touch the [ISA calculator](/isa-calculator) for projections.",
        "Salary sacrifice can bring forward your retirement date faster than most people expect because contributions into a pension save you 32% (basic rate plus NI) or 42% (higher rate plus NI) versus saving the same money out of net pay. Someone in the 40% band sacrificing £500 a month for ten years builds a pension pot worth roughly £85,000 at 5% growth, having only sacrificed £290 a month from their take-home. That accelerated pot is what makes 55 possible for higher earners and not just lottery winners."
      ),
      createAnswerFirstSection(
        "What If the Calculator Says 'Not Yet'?",
        "Three levers move the needle. Saving more is the obvious one and shows up immediately, but it has the smallest effect on long timelines because you are adding to a pot that compound growth is doing most of the work on. Working two extra years is mathematically larger because it is two more years of contributions, two more years of growth on the existing pot, and two fewer years of retirement to fund. Lowering target spending is the most powerful lever of all, and the one most early-retirement plans underweight; cutting target income from £40,000 to £32,000 cuts the pot needed by £200,000 at the 4% rule. A pension under-funded for £40k is fully funded for £32k."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I retire at 55 in the UK?",
        "Yes, if your private pension and savings are large enough to bridge to State Pension age. From April 2028 the minimum pension access age rises to 57, so anyone born after April 1971 cannot draw a private pension at 55. You will not get the State Pension until 66 (rising to 67 by 2028), so retiring at 55 means funding 11 years entirely from your own savings before any state top-up arrives."
      ),
      createFAQ(
        "How much do I need to retire at 60?",
        "For a £30,000 annual income from 60 to State Pension age at 67, then a reduced top-up after, a typical pot is £550,000 to £650,000 depending on your housing costs and whether you have any defined benefit pensions. The seven bridge years from 60 to 67 are the most demanding part: you are drawing roughly £210,000 of cumulative income before the State Pension reduces your draw by around £12,000 a year."
      ),
      createFAQ(
        "Is the 4% rule reliable for UK retirees?",
        "It is a useful starting point but UK markets and pension wrappers behave differently to the US ones the rule was tested on. Most UK financial advisers now use 3% to 3.5% as a safe withdrawal rate for a 30-year retirement, falling to 2.8% to 3.2% for a 40-year retirement. The calculator on this page uses 4% to keep numbers comparable to common rules of thumb; if you want a more cautious answer, run it again with your desired income inflated by 20% to see what you would need under a 3.3% rule."
      ),
      createFAQ(
        "Should I include my house in my retirement pot?",
        "Only if you genuinely plan to downsize or use equity release. Living in a £500,000 mortgage-free house does not pay the gas bill. A common compromise is to assume downsizing in your late 70s releases roughly 30% of the house value as a late-retirement top-up; for a £400,000 house, that is £120,000 of extra capital from age 78 onward, useful for care costs but not for funding earlier discretionary spending."
      ),
    ],
    relatedTools: [
      { slug: "pension-calculator", label: "Pension Calculator" },
      { slug: "isa-calculator", label: "ISA Calculator" },
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
    ],
  },

  "child-benefit-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Child Benefit Will You Receive in 2026/27?",
        "Child Benefit pays £26.05 per week for your first or only child and £17.25 per week for each additional child in 2026/27. A family with two children receives £43.30 a week, or £2,251.60 a year, paid every four weeks. A family with three children receives £60.55 a week, or £3,148.60 a year. Payments continue until your child turns 16, or 20 if they remain in approved education or training.",
        "You only receive Child Benefit if you claim it. Many higher-earning parents skip the claim because of the tax charge described below, but doing so means missing out on National Insurance credits that protect your State Pension entitlement. The fix is to claim Child Benefit but tick the box opting out of payment. You keep the credits, you avoid the charge, and you can opt back in if your income falls."
      ),
      createAnswerFirstSection(
        "The High Income Child Benefit Charge",
        "From April 2026 the HICBC threshold rose to £80,000 (up from £60,000), with the charge tapering to 100% by £100,000. Between £80,000 and £100,000, you pay back 1% of your Child Benefit for every £200 you earn above the threshold. At £90,000 you owe back half. At £100,000 you owe back the lot. The charge is on the higher earner in the household, not on the parent claiming, and it is collected through Self Assessment.",
        "Salary sacrifice into a pension is the cleanest workaround for someone earning £85,000 to £95,000 with kids. £5,000 sacrificed brings adjusted net income from £85k to £80k, restores the full Child Benefit, and saves 40% income tax on the sacrificed amount. For a two-child family that is roughly £2,250 of Child Benefit retained plus £2,000 of tax saved on a £5,000 sacrifice, before the long-term pension growth on the contribution. The [salary sacrifice calculator](/uk-salary-sacrifice-calculator) models this combination directly."
      ),
      createAnswerFirstSection(
        "What Counts Towards the £80,000 Threshold",
        "HICBC is based on adjusted net income, which is your total taxable income minus certain reliefs. It includes salary, bonuses, taxable benefits in kind (the company car, the private medical), self-employment profits, rental income, and most pension income. It excludes pension contributions made by salary sacrifice (because those reduce your taxable income at source), Gift Aid donations grossed up, and trading losses. A higher earner who pays £6,000 a year into pension via salary sacrifice and donates £1,200 to charity has their HICBC income calculated as their P60 figure minus the gross Gift Aid, not their headline salary."
      ),
    ],
    faqs: [
      createFAQ(
        "How much is Child Benefit for one child in 2026?",
        "£26.05 a week, paid every four weeks (£104.20 per payment). That works out to £1,354.60 a year. The first-child rate is the same whether you are a single parent or a couple, and it is paid to one parent only, normally the one who registered the claim."
      ),
      createFAQ(
        "Do I get Child Benefit if I earn over £80,000?",
        "You can still claim and receive Child Benefit, but if you (or your partner) earn over £80,000 you start owing some of it back through the High Income Child Benefit Charge, and at £100,000 the charge equals 100% of the benefit. Most families in that band claim anyway to protect National Insurance credits, then either pay the charge through Self Assessment or opt out of receiving the cash."
      ),
      createFAQ(
        "When does Child Benefit stop?",
        "Automatically when your child turns 16, unless they continue in approved full-time education (A-levels, T-levels, or equivalent) or unpaid training. You can extend Child Benefit until age 20 by submitting form CH297. It stops on the 31 August following their 16th birthday if they leave school at 16, or at the end of their final year of approved education otherwise."
      ),
      createFAQ(
        "Why claim Child Benefit if I will pay it all back?",
        "Claiming gives the non-working or lower-earning parent National Insurance credits towards their State Pension for every year they are responsible for a child under 12. Missing those credits can permanently reduce a State Pension worth £230,000 over a typical retirement. The claim also automatically registers the child for an NI number at 16. You can opt out of receiving payment while keeping the credits, which is what most affected high earners do."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "uk-salary-sacrifice-calculator", label: "Salary Sacrifice Calculator" },
      { slug: "childcare-cost-calculator", label: "Childcare Cost Calculator" },
    ],
  },

  "credit-card-payoff-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Long Does It Take to Pay Off a Credit Card?",
        "On a £5,000 balance at 24.9% APR paying only the 2% minimum (or £25, whichever is higher), you would take roughly 26 years to clear the debt and pay around £8,200 in interest on top. Adding £50 a month above the minimum cuts that to under 8 years and saves around £4,500 in interest. Adding £150 above the minimum clears the balance in just over 3 years and saves around £6,000.",
        "The minimum-payment trap exists because UK credit card minimums are typically 1% of the balance plus the month's interest, or £25, whichever is higher. As your balance shrinks, so does the minimum, which is why minimum-only repayment stretches into decades. Fixed payments (paying the same pound figure every month regardless of the minimum) is the single biggest behavioural change you can make on a credit card, because it forces the principal down rather than letting interest erode every payment."
      ),
      createAnswerFirstSection(
        "Where the UK Average Credit Card APR Sits in 2026",
        "Bank of England data puts the average UK credit card APR at around 23% to 26% for standard cards in early 2026, with store cards higher (29% to 35%) and rewards or premium cards often higher still (24% to 29%). With the BoE base rate currently around 4%, that is a margin of roughly 20 percentage points between the cost of money to the bank and what you are charged, which is why credit card debt is almost always more expensive than any other debt you might also be carrying.",
        "Promotional 0% purchase or balance-transfer cards are the obvious release valve. A 24-month 0% balance transfer with a 3% transfer fee on £5,000 of debt costs £150 upfront and saves roughly £2,200 in interest over the period versus a standard card, provided you actually clear the balance inside the 24 months. Miss the deadline and the card flips to a standard rate (often 23% or higher), which wipes out most of the saving. The [debt payoff calculator](/debt-payoff-calculator) lets you stress-test what happens if you only clear part of the balance before the promo ends."
      ),
      createAnswerFirstSection(
        "Should You Save or Pay the Card Off First?",
        "If you have any credit card balance accruing interest at 20%+, paying it down beats almost every savings or investment option available to a UK consumer. Even the best easy-access savings account in 2026 pays around 4.5% (taxed at your marginal rate, leaving 3.6% net for a basic-rate taxpayer). Paying down a 24% APR card returns 24% tax-free in effective interest avoided. The maths is not close. The exception is an emergency fund of one month's essential spending; without that, an unexpected boiler bill goes back onto the card and you start over. Build the £1,500 to £2,000 buffer first, then attack the card with everything else."
      ),
    ],
    faqs: [
      createFAQ(
        "How much should I pay above the minimum?",
        "As much as you can afford while keeping any other essential debt (mortgage, rent, council tax) covered. As a benchmark, paying double the minimum on a £5,000 balance at 24.9% APR roughly halves the payoff time and cuts total interest by around 60%. Even £25 a month above the minimum makes a meaningful difference, especially on smaller balances under £2,000."
      ),
      createFAQ(
        "What's a good APR for a credit card in the UK?",
        "Anything below 20% is competitive in 2026. The headline 'representative APR' on advertising is what 51% of accepted applicants get, so your offered rate may be higher than the headline. Sub-15% rates are typically reserved for premium or excellent-credit cards. If your current card is above 25%, it is worth checking eligibility for a lower-rate card via a soft-search service before applying, because hard searches affect your file."
      ),
      createFAQ(
        "Is a balance transfer worth it?",
        "Almost always, if you have a clear plan to repay during the 0% period. A 24-month 0% transfer with a 3% fee on £4,000 costs £120 upfront and saves roughly £1,400 in interest versus paying it on a 22% APR card. Without a repayment plan, the saving disappears the moment the promo ends and the rate jumps. Eligibility depends on your credit file; balance transfers often require a 'good' or 'excellent' rating to access the longest 0% periods."
      ),
      createFAQ(
        "Will paying off my card improve my credit score?",
        "Paying down balances reduces your credit utilisation ratio (the percentage of available credit you are using), which is one of the largest factors in UK credit scoring. Dropping from 80% utilisation to 30% can lift your score significantly within one or two reporting cycles. Closing the card after paying it off can slightly hurt your score by reducing total available credit and shortening account age, so leaving the cleared card open is usually the better move."
      ),
    ],
    relatedTools: [
      { slug: "debt-payoff-calculator", label: "Debt Payoff Calculator" },
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
      { slug: "loan-repayment-calculator", label: "Loan Repayment Calculator" },
    ],
  },

  "debt-snowball-calculator": {
    sections: [
      createAnswerFirstSection(
        "Snowball vs Avalanche: Which Pays Off Debt Faster?",
        "Mathematically, the avalanche method (paying highest-interest debt first) always pays off debt faster and cheaper than snowball (paying smallest balance first). On a typical UK debt mix - £5,000 credit card at 18.9%, £15,000 car loan at 4.5%, £25,000 student loan at 3.1% - with £200 a month extra, avalanche saves around £1,200 in interest and clears the debt roughly two months sooner than snowball. The gap widens with higher-rate debts.",
        "Snowball wins on behaviour, not maths. Clearing a £500 store card in three months gives you a visible win, freeing up that minimum payment as ammunition for the next debt and building momentum. Studies of actual debt-payoff completion rates (most notably by Ramsey Solutions and academic work by Gal and McShane) suggest people stick with snowball at higher rates because the early wins are motivating. If you have tried and abandoned the avalanche before, snowball may be the right call even though the calculator shows it costs more."
      ),
      createAnswerFirstSection(
        "When the Difference Is Big Enough to Matter",
        "If your highest-rate debt is dramatically more expensive than the rest (a 39% APR store card alongside two sub-5% loans), avalanche is almost always the right call regardless of personality, because the interest gap is too large to ignore. £3,000 on a 39% store card accrues £100 a month in interest alone. Throwing snowball payments at the £500 sub-5% personal loan first because it is smaller is a behavioural luxury that costs roughly £500 over the payoff timeline.",
        "If your debts are all in a narrow rate band (say 6% to 9%), the maths of avalanche barely beats snowball, and the behavioural pull of snowball usually wins. The calculator shows you the exact pound difference between the two methods so you can make the call with eyes open. Below £500 difference over the whole payoff, most people who choose snowball stick with it; above £2,000 difference, most people switch to avalanche once they see the number. The [debt payoff calculator](/debt-payoff-calculator) lets you test the same debts under both strategies side by side."
      ),
      createAnswerFirstSection(
        "What the Snowball Calculator Cannot See",
        "The calculator assumes you keep adding the same monthly extra payment until the last debt is gone, and that you do not run any of the cleared cards back up. In practice, the second assumption is the one that breaks. Lender data published by UK Finance shows roughly one in three borrowers who consolidate or clear credit card debt return to a meaningful balance within 18 months. The behavioural fix is to either close the cleared card, lock it in a drawer, or set it to direct-debit-pay-in-full each month so that any new spend triggers an immediate full repayment. None of those fixes show up in the calculator output, but they are the single biggest determinant of whether the projected debt-free date actually arrives."
      ),
    ],
    faqs: [
      createFAQ(
        "How much extra should I pay each month?",
        "As much as you can sustain for the full payoff period without burning out and reverting to minimums. £100 to £200 a month is a typical realistic range for most UK households with mixed debt totalling under £30,000. The calculator shows you the time and interest savings at every level, so you can pick the smallest extra amount that still gets you debt-free within a tolerable horizon, normally 3 to 5 years."
      ),
      createFAQ(
        "Should I include my mortgage in the calculator?",
        "No. Mortgages typically have rates of 4% to 6% in 2026, far below most other consumer debt, and are designed for very long terms with their own overpayment rules and early-repayment charges. Use the dedicated [mortgage overpayment calculator](/mortgage-overpayment-calculator) for that. The snowball calculator works best for credit cards, store cards, personal loans, car finance, and overdrafts."
      ),
      createFAQ(
        "What about my Student Loan?",
        "UK Plan 2 and Plan 5 student loans are income-contingent: you only repay 9% of income above the threshold (£27,295 for Plan 2 in 2026/27), and any remaining balance is written off after 30 to 40 years. For most graduates, voluntary overpayments are wasted money because they would not have repaid the full balance anyway. Leave student loans out of any aggressive payoff plan unless you are a high earner who will clearly clear the balance within the term."
      ),
      createFAQ(
        "What if I miss a month?",
        "Make the minimums on every debt every month, even if you cannot make the extra payment. Missing a minimum triggers default fees (typically £12 per missed payment in the UK), can push the rate to a penalty APR (often 5 to 10 percentage points higher), and reports as a missed payment on your credit file for six years. If the minimums themselves become unaffordable, contact StepChange or Citizens Advice before missing payments; both offer free debt advice."
      ),
    ],
    relatedTools: [
      { slug: "debt-payoff-calculator", label: "Debt Payoff Calculator" },
      { slug: "credit-card-payoff-calculator", label: "Credit Card Payoff Calculator" },
      { slug: "mortgage-overpayment-calculator", label: "Mortgage Overpayment Calculator" },
    ],
  },

  "isa-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Could £20,000 a Year in an ISA Become?",
        "Maxing the £20,000 ISA allowance every year for 20 years at 5% real growth produces a pot of around £660,000, all of it tax-free at withdrawal. At 6% real growth the same contributions produce roughly £736,000; at 7%, £820,000. Real growth means after inflation, so these are pots in today's money. Cash ISAs paying around 4.5% in 2026 grow more slowly in nominal terms and barely keep pace with inflation in real terms.",
        "The shape of compound growth means the last few years of contributions do most of the heavy lifting. A 25-year-old who fills the ISA for ten years and then stops will retire with more in real terms than a 35-year-old who fills it for twenty years, because the early contributions have an extra ten years to compound. This is why financial planners obsess about starting early, even with smaller amounts. £200 a month from age 22 reaches a larger pot at 65 than £400 a month from age 35."
      ),
      createAnswerFirstSection(
        "ISA Allowance Rules That Trip People Up",
        "The £20,000 annual allowance for 2026/27 covers all your ISAs combined, not £20,000 per ISA. You can spread it however you like across Cash, Stocks and Shares, Innovative Finance, and Lifetime ISAs (the LISA has its own £4,000 sub-allowance which counts towards the overall £20,000). If you put £15,000 into a Stocks and Shares ISA in April, you have £5,000 left for the rest of the tax year across all your ISAs combined.",
        "Partial-year transfers are the rule that catches most savers. You can transfer existing ISAs between providers without it counting towards your annual allowance, but you cannot withdraw from an ISA and re-contribute the same money in the same tax year unless your provider offers a 'flexible' ISA (most cash ISAs do, most stocks-and-shares ISAs do not). If you take £5,000 out of a non-flexible ISA in May to cover an emergency, you have lost that £5,000 of allowance for the year. The [compound interest calculator](/compound-interest-calculator) is useful for stress-testing whether breaking into ISA capital is worth the lost growth on the outflow."
      ),
      createAnswerFirstSection(
        "Cash ISA vs Stocks and Shares ISA",
        "Cash ISAs in 2026 pay around 4.5% on the best easy-access deals and 5% to 5.3% on one to two-year fixes. With CPI inflation hovering around 2.5% to 3%, that is roughly 1.5% to 2.5% real return. Stocks and Shares ISAs invested in a global tracker have averaged 6% to 7% real return over the last 30 years (FTSE All-World total return data), with significant volatility year to year. Over 20-year holding periods, stocks have outperformed cash 100% of the time in UK historical data; over 5-year periods, stocks beat cash roughly 75% of the time but with notable drawdowns in adverse periods. The choice usually comes down to time horizon: cash for goals under 5 years, stocks for goals over 10 years, a blended split for the awkward middle."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the ISA allowance for 2026/27?",
        "£20,000 per person, per tax year. That figure has not changed since 2017/18 and is currently frozen with no scheduled increase. Couples can each use their full £20,000, giving a household allowance of £40,000 a year. Children get a separate £9,000 Junior ISA allowance up to age 18."
      ),
      createFAQ(
        "Can I have multiple ISAs?",
        "Yes. Since April 2024 you can pay into multiple ISAs of the same type within the same tax year (previously you had to pick one Cash ISA and one Stocks and Shares ISA per year). The combined contributions across all ISAs still cannot exceed £20,000. You can also hold ISAs from previous tax years across multiple providers without restriction."
      ),
      createFAQ(
        "Do I pay tax on ISA gains or interest?",
        "No. ISAs are completely shielded from income tax and capital gains tax inside the wrapper, and there is no further tax when you withdraw. This contrasts with general savings (where interest above £1,000 a year is taxed for basic-rate payers, £500 for higher-rate, £0 for additional-rate) and general investment accounts (where dividends above £500 are taxed and capital gains above £3,000 are taxed)."
      ),
      createFAQ(
        "Should I move my ISA to a higher-paying provider?",
        "Often yes, especially with cash ISAs. Use a provider's official ISA transfer process - never withdraw and re-pay, because that would count as a fresh contribution against your annual allowance. Stocks and shares ISA transfers between platforms typically take two to four weeks; cash transfers are quicker, normally five to seven working days. Some fixed-rate cash ISAs charge an early-exit penalty equivalent to 90 to 180 days' interest, so check before transferring."
      ),
    ],
    relatedTools: [
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
      { slug: "pension-calculator", label: "Pension Calculator" },
      { slug: "savings-burndown", label: "Savings Burndown" },
    ],
  },

  "mortgage-overpayment-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Will Overpaying Your Mortgage Save You?",
        "On a £200,000 mortgage at 5.5% with 25 years remaining, paying an extra £100 a month saves around £33,000 in interest and clears the mortgage 4 years and 2 months early. £200 a month extra saves around £58,000 and clears it 7 years and 3 months early. £500 a month extra saves around £104,000 and clears it nearly 13 years early. The bigger the rate and the earlier in the term, the more dramatic the saving.",
        "The reason small overpayments produce such large savings is that mortgage interest is front-loaded. In year one of a 25-year £200,000 mortgage at 5.5%, roughly 80% of each monthly payment is interest and only 20% reduces the balance. An overpayment goes 100% to the balance, so a £100 overpayment in year one is worth around five times as much, in capital reduction terms, as the principal portion of a normal payment. Every overpayment in the early years compounds by avoiding decades of future interest on that capital."
      ),
      createAnswerFirstSection(
        "The 10% Rule and Early Repayment Charges",
        "Most UK fixed-rate mortgages allow you to overpay up to 10% of the outstanding balance per year without penalty. On a £200,000 mortgage that is £20,000 a year of allowed overpayment, far more than most households can muster. Going above 10% triggers an early repayment charge (ERC), typically 1% to 5% of the overpayment depending on how many years are left on the fix.",
        "Tracker and SVR mortgages usually have no overpayment limit and no ERC, but their rates are typically higher (SVRs in 2026 sit at 7% to 8% with the Bank of England base rate at 4%). If you are mid-fix at 4% and considering whether to overpay or save, the 10% allowance is normally generous enough to cover anything you would realistically pay in. The [mortgage calculator](/mortgage-calculator) is useful for modelling the original payment schedule before layering overpayments on top."
      ),
      createAnswerFirstSection(
        "Overpay or Save: When the Rate Comparison Changes",
        "The rule of thumb most UK savers learn is 'compare your mortgage rate to the best savings rate after tax'. With a 5.5% mortgage and the best easy-access savings paying around 4.5% (3.6% net for a basic-rate taxpayer above the £1,000 personal savings allowance), overpaying clearly wins on pure rate. With a 4% fixed mortgage and the same 4.5% savings rate, saving in an ISA wins, especially because savings stay liquid while mortgage overpayments do not. The crossover point is roughly when your after-tax savings rate exceeds your mortgage rate, accounting for the personal savings allowance and your ISA capacity. The other consideration is flexibility: an offset mortgage gives you the same interest-saving effect as an overpayment but keeps the cash accessible, which is worth a 0.2 to 0.4 percentage point premium on the rate for some borrowers."
      ),
    ],
    faqs: [
      createFAQ(
        "Is it better to overpay or extend the term?",
        "Almost always overpay. Extending the term reduces your monthly payment but increases total interest paid significantly. Overpaying cuts both the term and the total interest. The exception is if you genuinely cannot afford the current monthly payment due to a temporary income shock, in which case extending is a survival tool, not a long-term strategy."
      ),
      createFAQ(
        "Should I lump-sum overpay or pay extra each month?",
        "Mathematically, a lump sum at the start of the year saves more interest than the same total spread monthly, because the capital reduction starts working sooner. Practically, regular monthly overpayments are easier to budget and harder to forget. A common compromise is to overpay monthly within the 10% annual allowance and add any windfalls (bonuses, tax refunds) as one-off lump sums."
      ),
      createFAQ(
        "What happens to my monthly payment after overpaying?",
        "Most lenders give you a choice: keep the same monthly payment and shorten the term, or keep the same term and reduce the monthly payment. Keeping the same payment and shortening the term saves dramatically more interest. Reducing the monthly payment frees up cash flow but loses most of the saving. The default at most lenders is to keep the term and reduce the payment, so you may need to actively request the alternative."
      ),
      createFAQ(
        "Can I get my overpayments back?",
        "Generally no, unless you have an offset mortgage or a flexible mortgage that allows drawdown. Overpayments on a standard repayment mortgage become part of the balance and are only released when you sell the property or remortgage. This is the main reason some advisers prefer ISA saving for borrowers without strong job security; the money stays liquid in case of emergencies."
      ),
    ],
    relatedTools: [
      { slug: "mortgage-calculator", label: "Mortgage Calculator" },
      { slug: "mortgage-affordability-calculator", label: "Mortgage Affordability Calculator" },
      { slug: "stamp-duty-calculator", label: "Stamp Duty Calculator" },
    ],
  },

  "national-insurance-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much National Insurance Do You Pay in 2026/27?",
        "Employees pay 8% on earnings between the primary threshold of £12,570 and the upper earnings limit of £50,270, then 2% on everything above. On a £35,000 salary you pay £1,794 a year (£149.50 a month). On £50,000 you pay £2,994 a year (£249.50 a month). On £100,000 you pay £4,008 a year (£334 a month). NI tops out as a flat 2% rate above £50,270, which is why high earners feel income tax bite far more than NI.",
        "Employer National Insurance is the bigger number most employees never see. From April 2026 the employer rate is 15% (up from 13.8%) on salary above £5,000 (down from £9,100), so the cost to employ someone on £35,000 is now around £4,500 of employer NI on top of their salary. This is why salary sacrifice schemes are popular: the employer saves their NI on the sacrificed amount and often passes some or all of that saving back to the employee."
      ),
      createAnswerFirstSection(
        "The Self-Employed and Class 4 NI",
        "Self-employed people pay Class 4 NI on profits at 6% between £12,570 and £50,270, then 2% above (down from 9% in earlier tax years). Class 2 NI was effectively abolished from April 2024; you no longer pay the £3.45 weekly Class 2 contribution but you still get qualifying years for State Pension based on profits above £6,725. So a sole trader with £40,000 of profit pays roughly £1,646 in Class 4 NI, with no Class 2 due. Compare that to an employee on £40,000 salary paying £2,194 in Class 1 NI, plus their employer paying another £5,250 in employer NI on top.",
        "Most directors of small limited companies optimise around this gap by paying themselves a salary at or just above the personal allowance and taking the rest as dividends, which avoids NI entirely. The trade-off is that dividends do not count towards State Pension qualifying years, so the small salary needs to be at least £6,500 a year to pick up an NI credit without actually paying contributions. The [salary sacrifice calculator](/uk-salary-sacrifice-calculator) is useful for employees considering pension sacrifice, which removes the NI charge on the sacrificed pound."
      ),
      createAnswerFirstSection(
        "When You Stop Paying NI",
        "You stop paying employee NI the day you reach State Pension age, even if you keep working. State Pension age is 66 throughout 2026, rising to 67 between April 2026 and March 2028, and to 68 between 2044 and 2046. Self-employed Class 4 NI also stops at State Pension age but is reconciled at the end of the tax year, so you typically pay a part-year amount in the year you cross the threshold. Voluntary Class 3 contributions (£17.45 a week in 2026/27) let you fill gaps in your NI record up to six years back, which can be worth thousands in lifetime State Pension if you are short of qualifying years."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the NI threshold for 2026/27?",
        "The primary threshold (the point where employees start paying NI) is £12,570 a year, the same as the income tax personal allowance. The upper earnings limit (where the rate drops from 8% to 2%) is £50,270. Both thresholds have been frozen since 2022 and are scheduled to remain frozen until at least April 2028."
      ),
      createFAQ(
        "Do I pay NI on my pension?",
        "No. Pension income is subject to income tax but not National Insurance. This is one of the largest tax differences between salary and pension income, and is part of why retirees on the same gross income as workers have noticeably more take-home pay."
      ),
      createFAQ(
        "How many years of NI do I need for a full State Pension?",
        "35 qualifying years for the full new State Pension (£11,973 a year in 2026/27). 10 years is the minimum to get any State Pension at all. If you have fewer than 35 years on your record, you can pay voluntary Class 3 contributions to fill gaps; check your record on the gov.uk State Pension forecast page before paying, because some gap years cannot be backfilled."
      ),
      createFAQ(
        "Does salary sacrifice reduce my NI?",
        "Yes, and that is one of its main benefits. Sacrificing £5,000 of salary into pension reduces your Class 1 NI bill by 8% of £5,000 (£400 a year if the sacrifice is below the upper earnings limit) and saves your employer 15% (£750 a year). Many employers pass the employer saving back into your pension, making sacrifice a roughly 23% boost on the contribution before any income tax saving."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "uk-salary-sacrifice-calculator", label: "Salary Sacrifice Calculator" },
      { slug: "hourly-to-salary", label: "Hourly to Salary" },
    ],
  },

  "pension-income-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Income Will Your Pension Pot Produce?",
        "A £200,000 pension pot using the 4% withdrawal rule generates £8,000 a year in year one, or £667 a month before tax. A £400,000 pot generates £16,000 (£1,333 a month). A £500,000 pot generates £20,000 (£1,667 a month). At State Pension age, those private pensions stack on top of the full new State Pension of £11,973 a year, so a £400,000 pot plus full State Pension produces a combined pre-tax income of around £27,973, leaving roughly £24,800 after tax for someone with no other income.",
        "Annuity rates in 2026 sit at roughly 6.5% to 7.5% for a healthy 65-year-old buying a single-life level annuity. £200,000 spent on an annuity therefore buys about £13,000 to £15,000 a year, guaranteed for life. The annuity number looks better than the 4% drawdown number, but it is not directly comparable; an annuity uses up the capital, while drawdown leaves your pot invested with the chance of growth and a remainder to pass on. The choice between them is often about longevity risk preference rather than maths."
      ),
      createAnswerFirstSection(
        "The 4% Rule, the 3.3% Rule, and Why It Matters",
        "The 4% rule (Bengen, 1994) was tested on US data with a 30-year retirement starting at 65 and assumes you withdraw 4% in year one and adjust that pound figure for inflation each year afterwards. It worked in 96% of historical US 30-year periods. UK markets have lower long-term real returns and higher equity volatility in some windows, so most UK financial planners now use 3.3% to 3.5% as a comparable safe withdrawal rate. The difference matters: at 4%, a £400,000 pot supports £16,000 a year; at 3.3%, the same pot supports only £13,200 a year. £2,800 a year less is a meaningful constraint over a 25-year retirement.",
        "Variable withdrawal strategies (Guyton-Klinger guardrails, ratcheting, the Yale-Endowment 80/20 rule) increase the safe starting rate to roughly 5% in exchange for accepting that you cut your spending in years following a major market drawdown. Nobody enjoys cutting spending in retirement, so most retirees end up with a hybrid: 3.5% to 4% as a base, with discretionary spending (holidays, gifts) layered on top in good market years and trimmed in bad ones. The [can I retire early calculator](/can-i-retire-early) lets you stress-test what happens to projected retirement income at different growth and withdrawal assumptions."
      ),
      createAnswerFirstSection(
        "What Pension Income Looks Like After Tax",
        "Pension income (apart from the 25% tax-free lump sum) is taxed as normal earned income. The personal allowance of £12,570 applies first, then 20% basic rate to £50,270, 40% higher rate to £125,140. So a £25,000 pension income for someone with no other income produces £22,514 net after tax (no NI, because pensioners do not pay NI). For someone still working part-time on £15,000, the pension income stacks on top and most of it falls into the basic rate band. The State Pension always uses up the personal allowance first, which catches retirees by surprise; with State Pension at £11,973 in 2026/27, every pound of private pension is taxable from the £597 mark upwards."
      ),
    ],
    faqs: [
      createFAQ(
        "How much pension income can I get from £100,000?",
        "Using the 4% rule, £4,000 a year in year one (£333 a month). Using a more cautious 3.3%, £3,300 a year (£275 a month). Buying an annuity with the full pot at age 65 produces roughly £6,500 to £7,500 a year guaranteed for life, but uses up the capital. A £100,000 pot is best treated as a supplement to the State Pension and any other savings, not as a standalone retirement income."
      ),
      createFAQ(
        "Should I take an annuity or use drawdown?",
        "Drawdown gives flexibility and the chance of growth (and a residual pot to pass on), but you bear the longevity and market risk. Annuity gives certainty but uses up the capital and offers limited inflation protection unless you pay extra. A common compromise is to annuitise enough to cover essential bills (council tax, utilities, food) and use drawdown for discretionary spending; this caps your downside while keeping flexibility. Annuity rates in 2026 are at their highest in fifteen years, which has shifted some retirees back towards full or partial annuitisation."
      ),
      createFAQ(
        "Can I take all my pension at once?",
        "Yes, since 2015 pension freedoms. 25% of the pot is tax-free up to a Lump Sum Allowance (LSA) of £268,275; the remaining 75% is taxed as income in the year you take it. Taking a £200,000 pot all at once would push someone with no other income from a £12,570 personal allowance into the additional rate band, costing roughly £55,000 in tax versus spreading withdrawals over multiple years. For most retirees, a phased drawdown over 5 to 10+ years is dramatically more tax-efficient than a single large withdrawal."
      ),
      createFAQ(
        "What happens to my pension if I die?",
        "If you die before 75, your remaining pension pot can usually be passed to your nominated beneficiary tax-free. After 75, the beneficiary pays income tax at their marginal rate on any withdrawals from the inherited pot. This is one of the largest IHT planning advantages of pensions; pension assets sit outside the deceased's estate for inheritance tax purposes (with some exceptions being introduced from April 2027 onwards under recent Budget changes)."
      ),
    ],
    relatedTools: [
      { slug: "pension-calculator", label: "Pension Calculator" },
      { slug: "pension-tax-free-lump-sum", label: "Pension Tax Free Lump Sum" },
      { slug: "can-i-retire-early", label: "Can I Retire Early" },
    ],
  },

  "pension-tax-free-lump-sum": {
    sections: [
      createAnswerFirstSection(
        "How Much Tax-Free Lump Sum Can You Take?",
        "You can take 25% of your pension pot as a tax-free lump sum from age 55 (rising to 57 from April 2028). On a £200,000 pot that is £50,000 tax-free; on £400,000 it is £100,000; on £1,000,000 it is £250,000. The cap is the Lump Sum Allowance of £268,275, which means anyone with a pot above roughly £1,073,000 hits the cap and the excess 25% becomes taxable.",
        "The tax-free lump sum is one of the largest single tax breaks in the UK system. £50,000 of tax-free cash is equivalent to roughly £83,000 of gross salary for a higher-rate taxpayer (after 40% tax and 2% NI). Many retirees use it to clear remaining mortgage debt, fund the early bridge years before State Pension kicks in, or front-load discretionary spending in the active early years of retirement when health is best."
      ),
      createAnswerFirstSection(
        "Take It All at Once or Drip-Feed?",
        "You do not have to take the full 25% in one go. Under flexi-access drawdown, every withdrawal you make from your pension is split 25/75: 25% tax-free, 75% taxed as income. Withdrawing £40,000 a year therefore gives you £10,000 tax-free and £30,000 taxable, year after year, until either the 25% allowance is exhausted or the LSA cap is reached. This phased approach is normally more tax-efficient than taking the maximum lump sum on day one, because it stretches the tax-free element across multiple years and reduces the temptation to spend the lump sum quickly.",
        "Taking the full 25% at age 55 also triggers some pension wrapper changes worth understanding. Once you have taken any taxable income from a flexi-access drawdown pot, the Money Purchase Annual Allowance kicks in, capping your future contributions at £10,000 a year (down from the standard £60,000). For anyone still working and contributing, that is a meaningful constraint. Taking only the tax-free lump sum without taking any taxable income avoids this trigger. The [can I retire early calculator](/can-i-retire-early) is useful for modelling whether the lump sum changes your retirement-readiness numbers materially."
      ),
      createAnswerFirstSection(
        "What to Do with the Lump Sum",
        "The single most popular use is clearing the remaining mortgage. With UK mortgage rates around 4.5% to 6% in 2026 and savings rates around 4.5% before tax, paying off a mortgage with the lump sum often produces a guaranteed risk-free return higher than any savings or investment alternative. The exception is if your mortgage is on a sub-3% legacy fix; in that case keeping the cash invested in an ISA or general investment account at expected 5%+ real returns probably wins. The second most popular use is rebuilding the lump sum into a Stocks and Shares ISA over several tax years, effectively moving capital from the pension wrapper (where future drawdowns are taxed) to the ISA wrapper (where future drawdowns are not). At £20,000 a year of ISA allowance per person, a couple can move £40,000 a year of pension lump sum into ISA over three to four years."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the Lump Sum Allowance?",
        "£268,275 in 2026/27. This is the lifetime cap on the tax-free lump sum from all your pensions combined. It replaced the old Lifetime Allowance from April 2024. If your total pension wealth is £1,000,000, your 25% tax-free entitlement is £250,000 (under the cap). At £1,200,000, your entitlement is capped at £268,275 (because 25% would be £300,000 but the LSA limits it)."
      ),
      createFAQ(
        "Do I have to take the lump sum at retirement?",
        "No. You can leave your pension untouched indefinitely and pass it on to beneficiaries (often more tax-efficiently than other assets due to current pension IHT rules). You can also start drawing taxable income while leaving the tax-free lump sum untouched, then take the lump sum later. The flexibility is one of the main strengths of UK Defined Contribution pensions since the 2015 pension freedoms."
      ),
      createFAQ(
        "Is the tax-free lump sum really tax-free?",
        "Yes, on the way out of the pension. Once it is sitting in a savings account or investment account, any interest or growth on it is taxed under normal rules: interest above your personal savings allowance, dividends above £500, capital gains above £3,000. Most retirees move the lump sum (or as much as fits) into ISAs over the following years to keep the future returns tax-free as well."
      ),
      createFAQ(
        "Can I take the lump sum from a Defined Benefit pension?",
        "Yes, but it works differently. Most DB schemes offer a 'commutation' option where you give up some of your guaranteed annual pension in exchange for a lump sum, typically at a rate of 12 to 16 times the income given up. So giving up £1,000 a year of guaranteed pension might buy a £15,000 lump sum. The maths often favours keeping the income unless the scheme's commutation rate is unusually generous (above 20x), because £1,000 a year inflation-linked for life is hard to replace with a lump sum at modern annuity rates."
      ),
    ],
    relatedTools: [
      { slug: "pension-calculator", label: "Pension Calculator" },
      { slug: "pension-income-calculator", label: "Pension Income Calculator" },
      { slug: "can-i-retire-early", label: "Can I Retire Early" },
    ],
  },

  "retirement-countdown": {
    sections: [
      createAnswerFirstSection(
        "How Many Working Days Until You Retire?",
        "If you are 45 and planning to retire at the State Pension age of 66, that is 21 years, or roughly 5,460 working days assuming a five-day week with bank holidays. If you are 55 and aiming for 60, it is around 1,300 working days. The countdown is satisfying for two reasons: it makes a vague future date feel concrete, and it reframes time at work in units small enough to imagine using productively somewhere else.",
        "The UK State Pension age is 66 throughout 2026, rising to 67 between 6 April 2026 and 5 April 2028, and to 68 between 2044 and 2046. Anyone born after April 1960 will be affected by at least one of these increases. Private pensions can be accessed earlier - currently from 55, rising to 57 from April 2028 - but only if the pot is large enough to bridge to State Pension age without running out."
      ),
      createAnswerFirstSection(
        "Why Reframing Time Helps",
        "Behavioural economics research (notably Hershfield's 'future-self continuity' work) shows that people who can vividly picture their retired self save more for retirement than those who cannot. A countdown that says '5,460 working days' makes the future feel close enough that it links to today's decisions, where a date 21 years out feels like science fiction. Tools that show working days remaining, Monday mornings remaining, or commutes remaining all hijack the same psychological mechanism, which is why they tend to get bookmarked rather than used once and forgotten.",
        "The flip side is the regret half of the same calculation. Someone five years from a planned retirement at 60 has roughly 1,300 working days left, of which perhaps 400 are useful for adjusting the plan if the [can I retire early calculator](/can-i-retire-early) shows a shortfall. The other 900 are too late to make a meaningful pot-size difference; they only affect whether you delay retirement or scale down spending. Knowing the split helps focus action on the years that actually matter."
      ),
      createAnswerFirstSection(
        "Setting a Realistic Target Date",
        "The single most common error is anchoring on a round-number age (60, 55, 50) without checking the pension-pot maths. The second most common error is anchoring on State Pension age and ignoring the option of an earlier private retirement bridge. A useful exercise is to run three target dates side by side: your earliest theoretically possible date (the day you turn 55, or 57 from 2028), your minimum-effort date (the day your projected pot at current contributions hits 25 times your target spending), and your stretch date (a year or two earlier, if you ramped up contributions). The countdown then becomes three countdowns, and you pick the one whose extra effort is worth the freedom it buys."
      ),
    ],
    faqs: [
      createFAQ(
        "When can I retire in the UK?",
        "Whenever your savings allow. The legal minimum age for accessing a private pension is currently 55, rising to 57 from April 2028. The State Pension currently starts at 66, rising to 67 by 2028 and 68 by 2046. Most early retirees combine private pension drawdown from 55 (or earlier ISA savings) with a top-up from the State Pension when it kicks in."
      ),
      createFAQ(
        "How many working days are in a year?",
        "Roughly 252 in a typical UK year (365 days minus 104 weekend days minus 8 bank holidays minus around 1 to 2 days for floating bank holidays). Most full-time UK employees actually work 220 to 230 days once you subtract their typical 25 to 28 days of annual leave. So 'one year of work' is about 250 calendar working days but only 225 actual at-the-desk days."
      ),
      createFAQ(
        "Should I retire at 60 or 65?",
        "Five years of additional work between 60 and 65 typically grows a pension pot by roughly 30% to 45%, because you keep adding contributions and the pot keeps growing on the existing capital. Five years also reduces the years of retirement you need to fund. If your pot is borderline, working to 65 often makes the difference between a comfortable and a tight retirement. If your pot is already adequate, 60 frees up five years of useful, healthy time that working would have consumed."
      ),
      createFAQ(
        "Is it too late to plan for retirement?",
        "It is rarely too late but the levers shrink as you approach retirement. From age 55+ with a small pot, the realistic options are: working a few more years, ramping up contributions to use the £60,000 annual allowance (£10,000 if you have already triggered the MPAA), claiming any missing State Pension qualifying years through voluntary Class 3 contributions, and downsizing the house at retirement. Combined, these often add £50,000 to £150,000 of meaningful late-stage funding to a tight retirement plan."
      ),
    ],
    relatedTools: [
      { slug: "can-i-retire-early", label: "Can I Retire Early" },
      { slug: "pension-calculator", label: "Pension Calculator" },
      { slug: "state-pension-age-checker", label: "State Pension Age Checker" },
    ],
  },

  "savings-burndown": {
    sections: [
      createAnswerFirstSection(
        "How the Burndown Calculation Works",
        "The tool simulates your savings month by month. Each month it adds interest at your stated rate divided by 12, increases your spending by the monthly equivalent of inflation, then subtracts the net spending (spending minus any income) from the balance. It runs that loop until the balance hits zero or 100 years pass, whichever comes first. The output is the date your money runs out, plus milestones along the way (50% gone, 25% gone, emergency fund reached).",
        "Two assumptions matter here. First, inflation compounds monthly even though most people think of it annually; the calculator handles this so a stated 3% annual inflation behaves correctly month-to-month. Second, interest is paid on the balance before that month's withdrawal, which is how most savings accounts and money-market funds actually work. Together these two details mean the burndown date is usually a few months later than a naive 'savings divided by monthly spending' estimate would suggest."
      ),
      createAnswerFirstSection(
        "Sabbatical, Career Break, and Early Retirement Use Cases",
        "The classic use case is planning a career break: you have £40,000 saved, you spend £2,500 a month, you want to know how long that lasts. The honest answer is around 16 months at zero inflation and zero interest, but realistic numbers stretch that to 18-19 months once you factor in even a modest 4% return on the cash sitting in an easy-access ISA. If you bring in some income (freelance work, a part-time job, rental income), the burndown extends further: £500 a month income against £2,500 spending means you only burn £2,000 net, pushing the same pot to closer to 23 months.",
        "For early retirement, the burndown answers the harder question of whether your pot is genuinely sustainable. Most FIRE planning uses the [4% withdrawal rule](/uk-tax-calculator) but real lives have lumpy spending - a new boiler at year 3, a wedding at year 7, a knee replacement at year 12. The month-by-month view lets you stress-test the plan against single big withdrawals you'd struggle to model with a simple percentage rule. If the pot survives the first 10 years with extra £5,000 expenses every other year, it's probably durable."
      ),
      createAnswerFirstSection(
        "Why Inflation Matters More Than You Think",
        "Holding savings flat for 20 years feels safe, but inflation eats them slowly. At 3% annual inflation, £100 of spending today costs £180 in 20 years; the same pot of money buys roughly half what it does now. The simulator increases your spending each month to match inflation, which is why the burndown date is usually closer than people expect. A pot that 'lasts 30 years' at today's prices may only last 22 once the spending side rises with inflation.",
        "The way to push back against this: your interest rate needs to beat inflation, ideally by 1-3%. UK easy-access savings accounts paying 4.5% in a 2.5% inflation environment give you about 2% real growth, which extends the runway. Cash in a current account paying 0% loses 2.5% of purchasing power a year and accelerates the burndown noticeably. The [compound interest calculator](/compound-interest-calculator) shows how that gap compounds across decades."
      ),
    ],
    faqs: [
      createFAQ(
        "Does the calculator account for tax on interest?",
        "No, the interest rate you enter is treated as net (after tax). For most ISA and Personal Savings Allowance scenarios that's accurate (basic rate taxpayers get £1,000 of interest tax-free; higher rate gets £500). If you're earning more than the allowance and holding savings outside an ISA, reduce the rate you enter by your marginal tax band (so 5% gross becomes 4% net for a basic rate taxpayer, or 3% for higher rate)."
      ),
      createFAQ(
        "What if my income changes during the period?",
        "The simulator assumes constant monthly income. If you're planning a phased plan (full-time work, then part-time, then retirement), run it three times with different income figures and stitch the dates together. Future versions may support multi-phase scenarios but for now a manual three-pass approach gives you the right answer."
      ),
      createFAQ(
        "Is 4% the right inflation rate to assume?",
        "Use what fits your spending profile. UK CPI averaged around 2-3% over the last decade and spiked to 11% in 2022. For a long-running plan, somewhere between 2.5% and 3.5% is a reasonable central estimate. Run the calculation a second time at +2 percentage points (e.g. 5% instead of 3%) to see how the plan holds up against higher-than-expected inflation; that's the kind of sensitivity check professional planners do."
      ),
      createFAQ(
        "Should I include my pension or just liquid savings?",
        "Liquid only - the burndown is about cash you can spend immediately. Pensions, property equity, and shares you don't want to sell are separate from the savings runway calculation. Once you start drawing from a pension at 55+, that becomes a separate income stream you can add to the 'monthly income' field."
      ),
      createFAQ(
        "What does the 'emergency fund' milestone mean?",
        "When your remaining pot equals 3 months of current spending, the simulator flags it. That's the conventional minimum emergency reserve; anything below that and you have no buffer for unexpected costs. Hitting this milestone before the planned end date means you should have re-engaged with paid work several months earlier than you might have."
      ),
    ],
    relatedTools: [
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
      { slug: "savings-goal-calculator", label: "Savings Goal Calculator" },
      { slug: "retirement-countdown", label: "Retirement Countdown" },
    ],
  },

  "savings-goal-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Work Out Your Monthly Savings Target",
        "Enter the amount you want to save, what you've saved already, and how many months you have. The tool subtracts your current savings from the target to find the gap, then divides by the number of months. For a £6,000 holiday fund with £600 already saved over 12 months, you need £450 a month, which equals roughly £104 a week or £208 a fortnight. The weekly and fortnightly figures are derived from the monthly amount using 4.33 weeks per month and 26 fortnights per year, which match calendar reality more closely than the rough 4-weeks-per-month assumption.",
        "If you add an interest rate, the calculator runs a month-by-month projection: deposit goes in, balance earns the monthly equivalent of the annual rate (annual rate divided by 12), and the next month repeats. With even modest interest the required deposit shrinks because compounding does some of the work. At 5% interest, that £6,000 holiday goal needs roughly £435 a month instead of £450, a £15 monthly saving over the year that comes purely from picking the right account."
      ),
      createAnswerFirstSection(
        "Common Savings Goals and Realistic Timelines",
        "Emergency fund (3 months of spending, around £6,000-£10,000 for most UK households) typically takes 12-24 months on a moderate income. House deposit (£20,000-£50,000) takes 3-7 years for first-time buyers; saving £400-£600 a month gets most people there in a reasonable window. Wedding (£15,000-£25,000 average UK cost) usually has an 18-month runway from engagement, which works out to £800-£1,400 a month on top of normal living costs. Holiday (£2,000-£5,000) tends to be a 6-12 month goal at £200-£500 a month.",
        "The reason these goals fail is almost always the same: not enough automation. People decide to save £400 a month then leave it as 'whatever's left over at the end' and the leftover is usually £50. Set up a standing order on payday for the target amount and treat the rest as money to live on. The [compound interest calculator](/compound-interest-calculator) shows how reliable that habit becomes when stretched across years."
      ),
      createAnswerFirstSection(
        "Where to Park Short-Term Savings",
        "For goals under 18 months, a high-yield easy-access savings account or a cash ISA is the right home. Stocks and shares ISAs can drop 20% in any given year, so they're inappropriate for short-term goals where you can't afford to lose ground. UK easy-access rates in 2026 range from around 3% on high-street current accounts to 4.5%+ on app-only banks; that 1.5 percentage points adds up to roughly £150-£300 over the life of a typical 12-18 month savings target.",
        "For goals 5+ years out (house deposit on a slow build, or wedding savings started while still students), a Lifetime ISA can pay a 25% government bonus on contributions up to £4,000 a year if you're 18-39 and saving for your first home. That bonus is essentially free money that no high-street account can match. The trade-off is that withdrawing for any reason other than a first home or retirement triggers a 25% penalty that wipes out the bonus and a bit more."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the interest calculation accurate to real-world savings accounts?",
        "It uses the standard monthly compounding formula, which matches how UK savings accounts typically pay. Some accounts pay annually rather than monthly which slightly reduces the effective rate; if your account pays annually you'd get roughly 0.1-0.2% less than the calculator suggests. For most planning purposes the difference is small enough to ignore."
      ),
      createFAQ(
        "What if I miss a month?",
        "The calculator assumes consistent contributions. Missing a month means you need to either extend the timeframe by one month, increase the next deposits to catch up, or accept reaching slightly less than the goal. Re-run with your updated current savings amount to see exactly what's required to recover."
      ),
      createFAQ(
        "Should I include my employer pension contributions in this?",
        "No, the calculator is for savings goals (holidays, deposits, weddings) where you can access the money. Pension contributions are locked away until 55+ and are tracked separately through your workplace scheme. For pension-specific projections, use the [pension calculator](/pension-calculator)."
      ),
      createFAQ(
        "How accurate are the weekly and fortnightly figures?",
        "They're derived from the monthly amount using calendar-accurate ratios (4.33 weeks per month, 26 fortnights per year). If you set up a weekly standing order rather than monthly, the result over 12 months will land within £5-£10 of the target, which is well within rounding tolerance."
      ),
      createFAQ(
        "Can I model irregular income (commission, freelance)?",
        "Not directly - the calculator assumes flat monthly contributions. If your income is lumpy, work out the average monthly amount you can realistically commit, plug that in, and treat any windfalls (bonuses, tax refunds, end-of-quarter commission) as bonus deposits that pull the goal closer."
      ),
    ],
    relatedTools: [
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
      { slug: "savings-burndown", label: "Savings Burndown" },
      { slug: "retirement-countdown", label: "Retirement Countdown" },
    ],
  },

  "should-i-rent-or-buy": {
    sections: [
      createAnswerFirstSection(
        "What the Comparison Actually Calculates",
        "The tool compares two parallel paths over a period you choose (typically 5 to 15 years). Path one: you rent at your current monthly rent, no equity built, no maintenance bills. Path two: you buy with the deposit you have, take on a mortgage at the rate and term you specify, pay maintenance and insurance on the property, and benefit from any property value growth. After the chosen number of years, the tool tots up total cost on each side, deducts the equity built and the property gain, and shows which path leaves you better off financially.",
        "The standard estimates baked in: 1% of property value per year for maintenance, 0.3% for insurance, 0.2% for council tax escalation. These are rough industry averages; actual costs vary by property age, location, and condition. A 1970s detached house with a slate roof costs more to maintain than a new-build flat with a service charge that handles the structural side. Adjust the inputs upwards if you're buying older or more rural property."
      ),
      createAnswerFirstSection(
        "The Opportunity Cost of the Deposit",
        "Buying ties up the deposit in property; renting lets you invest it. If your deposit is £60,000 and you'd otherwise invest it at 6% in a Stocks and Shares ISA, that's roughly £24,000 of compound growth over 5 years that buying foregoes. Property has historically grown around 2.5-4% a year nationally, so the comparison usually favours investing the deposit unless you stay 8-10+ years and let property gains accumulate while you also build equity through mortgage payments.",
        "This is why renting can be the rational choice even when 'rent is dead money' is the conventional view. The deposit invested productively, plus the avoidance of stamp duty, conveyancing, and immediate maintenance bills, often beats home ownership for stays under 5 years. The break-even tends to be 7-10 years for most UK markets, though London's price-to-rent ratio is so distorted that buying often only beats renting after 12-15 years."
      ),
      createAnswerFirstSection(
        "Hidden Costs That Tilt the Maths",
        "Stamp duty: 0% on first-time buyers under £425,000, then 5% on the slice between £425,000 and £625,000, rising to 10% and 12% on higher slices. Conveyancing and survey fees: £1,500-£3,000 typically. Mortgage arrangement fee: £0-£2,000 depending on the deal. Moving costs: £500-£2,000. These add up to roughly 2-4% of the purchase price as a one-off transaction cost that renting avoids.",
        "On the other side of the ledger, rent rises with inflation while mortgage payments on a fixed-rate deal stay constant for the deal's term, then track interest rates. If you're 5 years into a fixed mortgage and rents have risen 25%, your payment hasn't changed and your monthly cash advantage versus renting has grown. The [stamp duty calculator](/stamp-duty-calculator) gives precise figures for any specific purchase price; the [mortgage calculator](/mortgage-calculator) shows what your monthly payment would actually be."
      ),
    ],
    faqs: [
      createFAQ(
        "What if property prices fall?",
        "The calculator assumes a steady annual growth rate. If prices fall, the buying side gets worse: you'd still be paying mortgage and maintenance, but the equity built is offset by the loss in property value. Try setting property growth to 0% or even negative to see how the buy side performs in a flat or falling market. UK national prices fell roughly 15% from 2007-2009 and took until 2015 to recover; renters during that period came out ahead."
      ),
      createFAQ(
        "Does this account for mortgage repayments going to capital vs interest?",
        "The total mortgage payments are calculated correctly, including the mix of capital and interest, and the equity built reflects the capital portion only. So even though you might pay £150,000 in mortgage payments over 10 years, only £50,000-£70,000 of that becomes equity (the rest is interest paid to the bank). The calculator shows both figures separately."
      ),
      createFAQ(
        "What about tax benefits of homeownership?",
        "In the UK there are limited tax advantages to owning your main residence: no capital gains tax on the primary home, but you can no longer offset mortgage interest against income (unlike pre-2017 buy-to-let). The model assumes a primary residence, so the only major tax effect is no CGT on sale - already implicitly captured by treating property gains as net of tax."
      ),
      createFAQ(
        "How accurate is the maintenance estimate?",
        "1% of property value per year is the long-run average across owners, including occasional big-ticket items (new boiler every 12 years, roof every 30 years, kitchen every 20). In any given year you might spend nothing or you might spend 5%; the average comes out around 1%. Newer properties trend lower (0.5-0.7%); older or listed properties trend higher (1.5-2%)."
      ),
      createFAQ(
        "Should I factor in the security of homeownership?",
        "The calculator measures money only. Renting brings less security (landlords can sell, raise rent, refuse to renew) which is a real cost not captured in pounds. If you have children settling in school or you've found a community you want to commit to, owning might be the right choice even if the spreadsheet narrowly favours renting. Conversely, if you're early career and likely to move for jobs, the financial case for renting is reinforced by the practical case."
      ),
    ],
    relatedTools: [
      { slug: "mortgage-calculator", label: "Mortgage Calculator" },
      { slug: "stamp-duty-calculator", label: "Stamp Duty Calculator" },
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
    ],
  },

  "split-bill-calculator": {
    sections: [
      createAnswerFirstSection(
        "Equal Split vs Itemised Split",
        "Equal mode is the default and works for most restaurant trips: total bill plus tip, divided by the number of people. Five people, £125 bill, 15% tip = £143.75 total, £28.75 each. This is the right approach when everyone ate similar amounts or the group has agreed to split evenly even if one person had the steak and another had the salad. The tool defaults to 15% tip with one-tap presets for 10%, 12.5%, 15%, 18%, 20%, and a custom field if you want anything else.",
        "Itemised mode handles the case where someone had the lobster and someone else just had a coffee. Add each item with its price and tick the people who shared it. The tool divides each item among its consumers, applies tip proportionally to what each person ate, and gives you a per-person total that reflects actual consumption. This is the right approach for work lunches where the company is paying back specific employees, for groups where one person doesn't drink alcohol, or for any situation where 'equal split' would feel unfair."
      ),
      createAnswerFirstSection(
        "Tip Conventions in the UK and Abroad",
        "UK restaurants: 10-12.5% is standard for table service, often added automatically as a 'service charge'. Higher-end restaurants in London might add 15%. Tipping isn't expected in pubs unless the staff bring food to the table. UK cafes and counter-service places don't expect tips. US restaurants: 18-20% is the floor; under 15% is read as a complaint. Service workers in the US are often paid a sub-minimum wage that assumes tips will make up the difference. European norms vary: 5-10% in France, 'rounding up' in Germany, often included in the bill in Italy and Spain.",
        "Watch for service charges already on the bill. If a UK restaurant has added 12.5% service, you don't need to tip again on top - you can if the service was exceptional, but it's not expected. Check the bill before calculating, and if a service charge is included, set the tip to 0% in the calculator (you're already paying it). Some venues distinguish between 'optional service charge' and 'mandatory service charge'; both can be removed if the service was poor, but you have to ask."
      ),
      createAnswerFirstSection(
        "Awkward Edge Cases",
        "Birthday person not paying: subtract their meal cost from the bill, split the remainder among everyone else, then the rest of the group covers the birthday meal pro-rata. The tool handles this if you uncheck the birthday person from any items they consumed and add a separate 'birthday meal' line that everyone shares. One person paying with a card and getting refunds from others: do the maths first, send a screenshot of the per-person amounts to the group chat, then settle up via bank transfer or splitting apps. Most banking apps now support 'request money' which makes this less awkward.",
        "Drinks vs food: many groups split the food evenly but pay for their own drinks separately, especially when one person has a £45 wine and another has tap water. The itemised mode handles this cleanly: add the food items with everyone ticked, then add each drink with only the drinker ticked. The [tip calculator](/tip-calculator) is the right alternative if everyone is paying their own bill and just needs to work out their individual tip."
      ),
    ],
    faqs: [
      createFAQ(
        "Should the tip be calculated on the pre-VAT or post-VAT amount?",
        "Conventionally, tip on the post-VAT total because that's what's printed on the bill. Some American etiquette guides argue you should tip on the pre-tax amount, but in the UK no one separates VAT from the bill total in practice. The calculator applies tip to the bill amount you enter, which is the post-VAT figure printed on the receipt."
      ),
      createFAQ(
        "What's the right tip for poor service?",
        "Lower the tip to 5-10% to send a message; zero is reserved for genuinely bad service (rude staff, ignored requests, food returned). If a service charge is already on the bill, ask for it to be removed; UK restaurants are required to do this if the service was inadequate. Don't stiff a server because the kitchen was slow; the server didn't cook the food."
      ),
      createFAQ(
        "How do I handle Venmo, PayPal, or transfer fees?",
        "If splitting via a payment app that charges a fee (rare in the UK; common in the US), the person paying the bill should add a small percentage (1-3%) on top of each person's share to cover fees. Mention it explicitly in the group chat so people know why their share is slightly higher than the calculator says."
      ),
      createFAQ(
        "Can the calculator handle a group where some people don't tip?",
        "Yes - in itemised mode, the tip is calculated per item, so if you set up the group such that one person owns no items, they pay nothing including no tip. For more nuanced cases (everyone splits food with tip, but one person opts out of tip on their drinks), you'd have to do that adjustment manually."
      ),
      createFAQ(
        "What if we have to round up to the nearest pound?",
        "After splitting, the per-person total often has awkward pence. Round each person's amount up to the nearest pound or 50p; the small over-payment goes back to the person who paid the bill, which makes the maths easy and saves arguments. The calculator shows precise amounts; rounding is a manual step at the table."
      ),
    ],
    relatedTools: [
      { slug: "tip-calculator", label: "Tip Calculator" },
      { slug: "discount-calculator", label: "Discount Calculator" },
      { slug: "percentage-calculator", label: "Percentage Calculator" },
    ],
  },

  "hourly-to-salary": {
    sections: [
      createAnswerFirstSection(
        "Convert Hourly Rate to Annual Salary (and Back)",
        "To convert hourly to annual: multiply your hourly rate by your weekly hours, then multiply by the weeks you actually work in a year. £20/hour at 40 hours over 52 weeks = £41,600 annual gross. To convert annual to hourly: divide salary by (weekly hours x weeks worked). The same £41,600 at 40 hours x 52 weeks = £20/hour.",
        "The number that catches most people out is the weeks-worked figure. Salaried staff are paid for 52 weeks even though they take 5-6 weeks of holiday plus bank holidays; hourly contractors usually only earn during the weeks they work, which is closer to 46-48. If you are quoted £25/hour as a freelancer, that is not the same gross income as £52,000 salaried, even though the simple maths suggests it is. The calculator shows hourly, daily, weekly, fortnightly, monthly and annual side by side so you can spot the right comparison."
      ),
      createAnswerFirstSection(
        "When This Calculator Is Genuinely Useful",
        "Negotiating a contract role versus a permanent role is the obvious case. A permanent £45,000 with 28 days holiday is roughly equivalent to £24/hour as a contractor only if the contractor works 46 weeks; at 40 weeks the contractor needs about £27.50/hour to match. Use the [UK Tax Calculator](/uk-tax-calculator) afterwards to compare take-home, because employed PAYE and umbrella company contractors pay tax differently from limited-company directors.",
        "The other big use is comparing job offers with different working patterns. A £30,000 salary at 35 hours a week is a higher hourly rate (£16.48) than £32,000 at 40 hours a week (£15.38), which most candidates do not realise until they run the numbers. Part-time roles, compressed weeks (4 days x 10 hours), and term-time-only contracts all distort the headline salary, and the converter quietly does that comparison for you."
      ),
      {
        heading: "Common Hourly to Salary Conversions (40 hour week, 52 weeks)",
        table: {
          headers: ["Hourly Rate", "Weekly", "Monthly", "Annual"],
          rows: [
            ["£12.21 (NLW)", "£488.40", "£2,116", "£25,397"],
            ["£15.00", "£600.00", "£2,600", "£31,200"],
            ["£20.00", "£800.00", "£3,467", "£41,600"],
            ["£25.00", "£1,000.00", "£4,333", "£52,000"],
            ["£35.00", "£1,400.00", "£6,067", "£72,800"],
            ["£50.00", "£2,000.00", "£8,667", "£104,000"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the National Living Wage hourly rate for 2026/27?",
        "The National Living Wage rose to £12.21 per hour in April 2026 for workers aged 21 and over. At 40 hours a week across 52 weeks that is roughly £25,397 gross, before income tax and National Insurance. Younger workers get less: 18 to 20 year olds are on £10.00, and apprentices on the lowest rate at £7.55."
      ),
      createFAQ(
        "Should I use 52 weeks or fewer when converting?",
        "Salaried staff use 52 weeks because they are paid year-round including holiday. Self-employed and zero-hours workers should use the weeks they actually expect to bill, typically 46 to 48 once you subtract holidays, sick days and quiet weeks. Using 52 for a contractor overstates annual income; using 48 for a salaried worker understates it."
      ),
      createFAQ(
        "How does this differ from a take-home pay calculator?",
        "This converter shows gross figures only - the headline pay before any deductions. Income tax, National Insurance, pension contributions and student loan repayments come off the top. Run the figure through the UK Tax Calculator afterwards to see what actually lands in your bank account."
      ),
      createFAQ(
        "Why does my monthly figure look different to my payslip?",
        "Most UK payslips divide annual salary by 12 to get a flat monthly figure, regardless of how many days are in the month. This converter does the same. Some employers pay weekly or four-weekly instead, which produces 13 paydays a year and slightly lower per-payslip amounts; the annual total is identical."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "salary-breakdown-visualiser", label: "Salary Breakdown Visualiser" },
      { slug: "pay-rise-calculator", label: "Pay Rise Calculator" },
    ],
  },

  "loan-repayment-calculator": {
    sections: [
      createAnswerFirstSection(
        "Monthly Repayment Formula and What It Tells You",
        "A standard repayment loan uses M = P x [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate, and n is the number of monthly payments. A £200,000 loan at 5.5% over 25 years works out at about £1,228 a month and £368,392 in total, of which £168,392 is pure interest. The interest figure is the headline most people miss; over a 25-year mortgage you typically pay close to the original loan amount again in interest.",
        "Interest-only loans work differently: you pay only the monthly interest (£200,000 at 5.5% = £917/month) and owe the entire £200,000 at the end. Total interest over 25 years is £275,000, but you have not reduced the debt at all. This is fine if you have a separate repayment plan (an investment ISA maturing, a property sale), but disastrous if you do not."
      ),
      createAnswerFirstSection(
        "Why Overpayments Punch Above Their Weight",
        "Overpaying £200 a month on a £200,000, 25-year loan at 5.5% knocks roughly 6 years off the term and saves around £40,000 in interest. The maths feels disproportionate because each pound of overpayment goes 100% to capital, while a normal monthly payment in year 1 is mostly interest. The earlier in the loan the overpayment lands, the larger the saving.",
        "Most UK lenders allow 10% overpayments per year on fixed-rate mortgages without early repayment charges. Check your specific deal before committing - some loans charge 1% to 5% on overpayments above the allowance, which can wipe out the saving. Use the [Mortgage Overpayment Calculator](/mortgage-overpayment-calculator) for a year-by-year breakdown showing exactly when the savings appear."
      ),
      {
        heading: "Repayment Examples (£200,000 loan, 25 years)",
        table: {
          headers: ["Rate", "Monthly Payment", "Total Repaid", "Total Interest"],
          rows: [
            ["3.5%", "£1,001", "£300,372", "£100,372"],
            ["4.5%", "£1,112", "£333,560", "£133,560"],
            ["5.5%", "£1,228", "£368,392", "£168,392"],
            ["6.5%", "£1,350", "£404,873", "£204,873"],
            ["7.5%", "£1,478", "£443,360", "£243,360"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I take a longer term to reduce my monthly payment?",
        "It works in the short term but costs more in the long term. Stretching a £200,000 loan at 5.5% from 25 years to 35 years drops the monthly payment from £1,228 to £1,094, but total interest jumps from £168,392 to £259,496 - around £91,000 extra. A common compromise is to take the longer term for affordability, then overpay aggressively if the budget allows."
      ),
      createFAQ(
        "What's the difference between a fixed and variable rate?",
        "A fixed rate locks your monthly payment for a set period (usually 2, 5 or 10 years). A variable rate moves with the lender's standard variable rate (SVR) or Bank of England base rate, so the monthly payment changes when rates change. Fixed gives predictability; variable gives upside if rates fall but pain if they rise."
      ),
      createFAQ(
        "Are interest-only loans still available in the UK?",
        "Yes, but criteria are stricter than they were pre-2008. You typically need a credible repayment vehicle (a maturing investment, a sale of another property, or a clear plan to switch to repayment), a low loan-to-value ratio (often below 75%), and proof of income comfortably above the lender's threshold. Most retail mortgages are repayment by default."
      ),
      createFAQ(
        "Does the calculator include arrangement fees and other costs?",
        "No, it shows only the principal and interest. Arrangement fees, valuation fees, broker fees and early repayment charges sit on top. A £999 arrangement fee on a 5-year fix adds about £17 a month if rolled into the loan, and significantly more once interest compounds across the full term. Always compare the APRC (annual percentage rate of charge) rather than the headline rate."
      ),
    ],
    relatedTools: [
      { slug: "mortgage-calculator", label: "Mortgage Calculator" },
      { slug: "mortgage-overpayment-calculator", label: "Mortgage Overpayment Calculator" },
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
    ],
  },

  "stamp-duty-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Stamp Duty Bands Work",
        "Stamp Duty Land Tax (SDLT) in England and Northern Ireland is charged in slices, not as a flat rate. For a standard home mover in 2026/27, the first £250,000 is tax-free, the next £675,000 (up to £925k) is at 5%, the next £575,000 (up to £1.5m) is at 10%, and anything above £1.5m is at 12%. A £400,000 home costs £7,500 in stamp duty (5% of the £150,000 above the £250k threshold).",
        "First-time buyers get a more generous deal: nothing on the first £425,000, then 5% up to £625,000. So a first-time buyer spending £400,000 pays zero SDLT. Step over £625,000 and the relief disappears entirely - a £626,000 purchase by a first-time buyer is taxed under the standard home mover bands, costing £18,800. Watch that cliff edge if you are stretching to a higher-priced flat."
      ),
      createAnswerFirstSection(
        "The 3% Surcharge on Second Homes and Buy-to-Let",
        "Buy a property as an additional home (a second home, a holiday let, or a buy-to-let) and you pay an extra 3% on every band, including the bottom slice that is normally tax-free. A £400,000 buy-to-let costs £19,500 in SDLT (3% on the first £250k = £7,500, plus 8% on the next £150k = £12,000) versus £7,500 if it were your only home.",
        "Non-UK residents add another 2% on top of whatever band applies, taking the worst-case rate to 17% on the slice above £1.5m. The surcharge applies to anyone who has not been resident in the UK for at least 183 days during the 12 months before completion. Crossing the threshold mid-purchase can be planned for if you have flexibility on completion dates. Pair this with the [Mortgage Calculator](/mortgage-calculator) to see whether the surcharge changes what you can actually afford."
      ),
      {
        heading: "Stamp Duty by Property Price (Home Mover, 2026/27)",
        table: {
          headers: ["Property Price", "SDLT (Home Mover)", "SDLT (First-Time Buyer)", "SDLT (Additional Property)"],
          rows: [
            ["£250,000", "£0", "£0", "£7,500"],
            ["£350,000", "£5,000", "£0", "£15,500"],
            ["£500,000", "£12,500", "£3,750", "£27,500"],
            ["£750,000", "£25,000", "Not eligible", "£47,500"],
            ["£1,000,000", "£41,250", "Not eligible", "£71,250"],
            ["£1,500,000", "£91,250", "Not eligible", "£136,250"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Do I pay stamp duty in Scotland and Wales?",
        "No - SDLT only covers England and Northern Ireland. Scotland charges Land and Buildings Transaction Tax (LBTT) with different bands and thresholds. Wales charges Land Transaction Tax (LTT). The principles are similar (tiered bands, surcharges on additional homes, first-time buyer reliefs) but the exact thresholds and rates differ. Check the relevant Revenue website for whichever country your property is in."
      ),
      createFAQ(
        "When do I have to pay stamp duty?",
        "Within 14 days of completion. Your solicitor or conveyancer normally handles the SDLT return and the payment for you on completion day, taking the funds from the deposit you transferred earlier. Late filing triggers a £100 penalty plus interest, and if the solicitor forgets it lands on you, not them - the buyer is legally liable."
      ),
      createFAQ(
        "Is stamp duty refundable if I sell my old home within 36 months?",
        "Yes, in the specific case where you bought a new main home before selling your old one and paid the 3% additional-property surcharge. If you sell the old home within 36 months of buying the new one, you can reclaim the surcharge from HMRC. Keep the completion paperwork from both transactions; the refund is not automatic, you have to apply."
      ),
      createFAQ(
        "Can I add stamp duty to the mortgage?",
        "Some lenders allow it, but most prefer SDLT to come from your deposit savings. Adding £15,000 of stamp duty to a £300,000 loan increases the loan-to-value, may push you into a higher LTV rate band, and costs significantly more over 25 years once interest compounds. If you can find the cash from elsewhere, do."
      ),
    ],
    relatedTools: [
      { slug: "mortgage-calculator", label: "Mortgage Calculator" },
      { slug: "rent-vs-buy-calculator", label: "Rent vs Buy Calculator" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
    ],
  },

  "inflation-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Inflation Erodes Purchasing Power Over Time",
        "Inflation works as compound erosion. £1,000 sitting in a non-interest-paying account during 5% inflation drops to roughly £950 of real spending power after one year, £902 after two, and £783 after five. Run that across 20 years at 3% (the Bank of England's long-term target is 2%, but actual UK CPI has averaged closer to 3% since 2000) and £1,000 today buys what £554 buys now.",
        "The historical mode of the calculator answers \"what was £X in year Y worth in today's money?\" - useful for understanding house prices, salaries or the price of a pint across decades. The future mode answers \"what will £X be worth in N years?\" - useful for retirement planning. Both run the same compound formula: future value = present value x (1 + rate)^years."
      ),
      createAnswerFirstSection(
        "What This Means for Cash Savings",
        "If your savings account pays 4.5% AER and inflation runs at 3%, your real return is roughly 1.5% per year, not 4.5%. A £20,000 emergency fund earns £900 in nominal interest but only £300 in real purchasing power after inflation eats its share. That is one reason the [Compound Interest Calculator](/compound-interest-calculator) lets you toggle inflation adjustment on - the nominal-only number is misleading.",
        "The classic British example is the £85,000 FSCS protection limit. It was set in 2010 and has not moved since. Adjusted for cumulative UK inflation across 16 years, the real protection is now closer to £56,000 in 2010 spending power. Pension thresholds, tax bands and benefit rates work the same way: when they freeze, real value declines silently every year. The personal allowance has been £12,570 since 2021/22; in 2026 money that frozen allowance is worth roughly £10,400 of 2021 spending power."
      ),
      {
        heading: "What £10,000 in 2010 Bought in Each Following Year (3% Annual Inflation)",
        table: {
          headers: ["Year", "Equivalent Today", "Cumulative Loss"],
          rows: [
            ["2010", "£10,000", "0%"],
            ["2015", "£11,593", "13.7%"],
            ["2020", "£13,439", "25.6%"],
            ["2024", "£15,126", "33.9%"],
            ["2026", "£16,047", "37.7%"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What inflation rate should I use?",
        "For UK calculations, 2.5% to 3.5% is a reasonable long-run estimate. The Bank of England targets 2% but actual CPI has averaged around 3% across the last 25 years, with sharp spikes (over 11% in late 2022) and quieter periods. Use the lower end for conservative planning and the higher end if you want a stress test. The Office for National Statistics publishes historical CPI back to 1989."
      ),
      createFAQ(
        "Why do inflation calculators give different answers?",
        "Different rate assumptions and different inflation indices. CPI (Consumer Prices Index) is what the Bank of England targets; RPI (Retail Prices Index) typically runs about 1 percentage point higher because it includes housing costs differently. The ONS no longer publishes RPI as a national statistic, but some legacy products (rail fares, student loans) still index to it. Pick the index that matches your purpose and stay consistent."
      ),
      createFAQ(
        "Does inflation affect my pension?",
        "Most workplace and personal pensions invest in real assets (equities, bonds, property) which historically beat inflation over decades, but year-to-year volatility is high. The State Pension is uprated by the triple lock (the highest of inflation, earnings growth or 2.5%), which usually keeps it ahead of inflation. Defined-benefit pensions vary - check whether yours uprates by CPI or RPI in payment, because that can change retirement income by tens of thousands over a long retirement."
      ),
      createFAQ(
        "What happened to UK inflation in 2022 to 2023?",
        "CPI peaked at 11.1% in October 2022, the highest since 1981. The spike was driven primarily by energy prices following the Russia-Ukraine war, food prices, and post-pandemic supply chain issues. By late 2024 it was back near the 2% target, but the cumulative price level is now permanently higher; prices do not fall back when inflation slows, they just rise more slowly. A £100 weekly shop in 2021 still costs about £125 today, and that gap is locked in."
      ),
    ],
    relatedTools: [
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
      { slug: "pension-calculator", label: "Pension Calculator" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
    ],
  },

  "salary-breakdown-visualiser": {
    sections: [
      createAnswerFirstSection(
        "See Where Every Pound of Your Salary Actually Goes",
        "Type your gross annual salary and the visualiser splits it into four deductions plus take-home: income tax, National Insurance, pension (if you contribute), student loan (if you have one) and what lands in your bank account. On £35,000 with a 5% pension and Plan 2 student loan, you keep about £25,500 of the £35,000 - around 73p in the pound. On £100,000 with the same setup, the share drops closer to 60p in the pound because of the 40% higher rate band and the gradual loss of the personal allowance.",
        "The expense block is where the visualiser earns its keep. Once you have add rent, bills, food, transport and subscriptions, the leftover figure is what you actually have available to save, invest or spend on choices. Most UK households are surprised by how small that figure is once everything fixed is taken out, and how much the subscriptions row totals - £15 streaming, £8 phone, £30 gym, £12 cloud storage, £20 newspaper digital all stack up to close to £85/month."
      ),
      createAnswerFirstSection(
        "Tax Band Effects You Can Watch in Real Time",
        "Slide the salary up from £49,000 to £52,000 and watch the income tax line jump disproportionately - that is the 40% higher rate kicking in once you cross £50,270. Similarly, push past £100,000 and an extra slice of tax appears as the personal allowance starts withdrawing at £1 lost per £2 earned, creating an effective marginal rate of 60%. The visualiser shows the pain in pictures rather than HMRC formulas.",
        "Pension contributions are the single biggest lever for high earners. A 10% salary sacrifice on £105,000 brings the gross down to £94,500, which is below the £100,000 cliff edge - so you keep the full personal allowance and avoid the 60% trap entirely. The [UK Tax Calculator](/uk-tax-calculator) does the same calculation in formula form; the visualiser exists for people who want to see the proportion at a glance before committing to a 30-minute deep-dive."
      ),
    ],
    faqs: [
      createFAQ(
        "How accurate is this against a real payslip?",
        "Within a few pounds for standard PAYE employees with tax code 1257L. The visualiser uses 2026/27 thresholds: £12,570 personal allowance, £50,270 higher rate threshold, 8% NI from £12,570 to £50,270, 2% above that. Anything unusual on your tax code (K codes, BR codes, marriage allowance transferred in) will shift the figure by a few hundred pounds a year. Pension via salary sacrifice is handled correctly; pension via relief at source needs a manual adjustment."
      ),
      createFAQ(
        "What student loan plan should I pick?",
        "Plan 1 covers English/Welsh students who started university before September 2012. Plan 2 covers those who started between September 2012 and July 2023. Plan 4 is for Scottish students. Plan 5 is for those starting from August 2023. Postgraduate loans are separate (6% above £21,000) and many borrowers have Plan 2 plus Postgraduate running at the same time. Your payslip lists the plan code under \"Student Loan\"."
      ),
      createFAQ(
        "Why is the National Insurance figure lower than I expected?",
        "The main NI rate was reduced to 8% in April 2024. If you remember a 12% figure from older payslips or older tax calculators, that is out of date. The 2% rate above the upper earnings limit (£50,270) has not changed. Self-employed Class 4 NI works differently and is not modelled here."
      ),
      createFAQ(
        "Does this work for Scottish taxpayers?",
        "Not yet - the visualiser uses the rest-of-UK income tax bands (20%, 40%, 45%). Scottish income tax has six bands ranging from 19% to 48%, so a Scottish 50,000 salary actually has slightly less income tax in the lowest band but more above £43,663. Take the take-home figure as roughly indicative for Scottish residents and use a Scotland-specific calculator for an exact answer."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "hourly-to-salary", label: "Hourly to Salary Calculator" },
      { slug: "pension-calculator", label: "Pension Calculator" },
    ],
  },

  "rent-vs-buy-calculator": {
    sections: [
      createAnswerFirstSection(
        "The Real Cost of Renting vs Buying Over 25 Years",
        "Renting is not simply throwing money away, and buying is not simply free property growth. Both have hidden costs that need adding to the obvious monthly figure. For renting: rent rises (typically 3% a year compounded), contents and renters insurance, agency fees on each new tenancy. For buying: stamp duty up front, mortgage interest (which dominates payments in the first 10-15 years), maintenance (figure 1% of property value per year - so £4,000 a year on a £400,000 home), buildings insurance, ground rent if leasehold, and selling costs at the end.",
        "Run a £400,000 home with a £100,000 deposit at 5.5% over 25 years versus £1,200/month rent rising 3% a year. Buying costs roughly £635,000 across 25 years (mortgage payments, maintenance, insurance, stamp duty, deposit). Renting costs roughly £525,000 across 25 years. Buying looks £110,000 worse - until you factor in that the buyer ends with a paid-off home worth roughly £700,000 if it tracks 2.5% house price growth. The buyer's equity makes them about £590,000 better off in net wealth terms."
      ),
      createAnswerFirstSection(
        "When Renting Genuinely Beats Buying",
        "Short time horizons are the obvious case. Buying involves £15,000 to £30,000 in transaction costs (stamp duty, legal fees, surveys, mortgage arrangement, removals); selling adds estate agent fees of 1% to 1.5%. If you move within 5 years, those costs swamp any equity built and the buyer ends up worse off than the renter. The 5-year break-even is the rule of thumb most UK financial advisers quote.",
        "High-mobility careers, areas with rent-to-price ratios under 4% (where rent is much cheaper than buying), and those who would invest the deposit in a Stocks and Shares ISA returning 7% over 25 years can all make renting the better choice. Use the [Stamp Duty Calculator](/stamp-duty-calculator) to see your exact upfront cost, and the [Mortgage Calculator](/mortgage-calculator) to compare monthly burden against your local rental market before committing."
      ),
    ],
    faqs: [
      createFAQ(
        "What rent increase rate should I use?",
        "3% is the long-run UK average since 2010, but the last 3 years have seen renewals routinely at 5% to 8% in major cities. Use 3% for a long-term planning view, or set it higher to stress test. Tenants on rolling assured shorthold tenancies typically see steeper increases than those on long fixed terms, because landlords use renewals as the moment to bring rents to market."
      ),
      createFAQ(
        "How much should I budget for maintenance on a property?",
        "1% of the property value per year is the standard rule of thumb across UK property circles. So £400 per £40,000 of value - or £4,000 a year on a £400,000 house. New builds skew lower in early years; Victorian terraces with old plumbing, original windows and a roof past its prime can run at 2% to 3%. Leasehold flats have predictable service charges instead, but those have risen 8% to 15% a year recently due to building safety remediation costs."
      ),
      createFAQ(
        "What if house prices fall?",
        "House prices have fallen meaningfully a few times in living memory (1989-95 dropped about 20% nominal in real money terms; 2007-09 dropped about 16%; 2022-23 saw a small dip then recovery). The break-even comparison is sensitive to growth rate - drop the assumption from 2.5% to 0% and buying often loses across 25 years. Use the calculator to flex the growth rate and see how robust your conclusion is to different scenarios."
      ),
      createFAQ(
        "Should I include the deposit as a cost or an investment?",
        "Both views are valid. As a renter you would either spend that deposit, save it earning interest, or invest it in a Stocks and Shares ISA. The opportunity cost is real - £100,000 in a 7% return investment becomes £540,000 over 25 years, which is comparable to the equity in the bought home. The calculator treats the deposit as a sunk buying cost; you can mentally add the foregone investment growth on the renting side for a fairer comparison."
      ),
    ],
    relatedTools: [
      { slug: "mortgage-calculator", label: "Mortgage Calculator" },
      { slug: "stamp-duty-calculator", label: "Stamp Duty Calculator" },
      { slug: "mortgage-overpayment-calculator", label: "Mortgage Overpayment Calculator" },
    ],
  },

  "uk-council-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Council Tax Bands Work",
        "Every home in England is placed in one of eight bands (A to H) based on the property's value as it stood on 1 April 1991. Yes, 1991 - the bands have not been revalued in over 30 years. Band A covers homes worth up to £40,000 in 1991 prices; Band D covers £68,001 to £88,000; Band H covers anything above £320,000. A 1991 valuation roughly maps to a 6x to 8x multiple in 2026 money for typical properties.",
        "Your bill is the band multiplier x your local authority's Band D rate. A typical Band D bill in 2026/27 sits around £2,200 for England. Band A pays 6/9 of that (£1,467); Band H pays 18/9 of that (£4,400). Wales has nine bands (A to I), uses 2003 valuations, and has different multipliers. Scotland has eight bands but multipliers vary at the higher end. The single occupier discount of 25% applies in all three countries when only one adult lives at the property."
      ),
      createAnswerFirstSection(
        "Discounts, Exemptions and Successful Reband Appeals",
        "Single adult living alone: 25% discount. All adults are full-time students: 100% exemption. The property is unfurnished and empty: discount varies by council, often 100% for the first month then full charge. Severely mentally impaired and the only adult: 100% exemption. A working adult plus a full-time student lodger: 25% discount, because the student is disregarded.",
        "Reband appeals are worth checking: the Valuation Office Agency estimated in 2017 that around 400,000 English homes are in the wrong band, usually one band too high. If your home and your neighbours' homes have the same 1991 valuation but different bands, you can request a reband. The savings are not trivial - moving from Band E to Band D on a £2,200 Band D rate saves £660 a year, every year, until you sell. Check via the GOV.UK 'check your council tax band' service before you spend any money on professional services."
      ),
      {
        heading: "Council Tax Bands and Typical 2026/27 Annual Cost (England)",
        table: {
          headers: ["Band", "1991 Property Value", "Multiplier", "Typical Annual Bill"],
          rows: [
            ["A", "Up to £40,000", "6/9", "£1,467"],
            ["B", "£40,001 to £52,000", "7/9", "£1,711"],
            ["C", "£52,001 to £68,000", "8/9", "£1,956"],
            ["D", "£68,001 to £88,000", "9/9", "£2,200"],
            ["E", "£88,001 to £120,000", "11/9", "£2,689"],
            ["F", "£120,001 to £160,000", "13/9", "£3,178"],
            ["G", "£160,001 to £320,000", "15/9", "£3,667"],
            ["H", "Over £320,000", "18/9", "£4,400"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are council tax rates frozen at 1991 valuations?",
        "Because revaluation is politically toxic. Wales tried in 2005 (using 2003 prices) and a third of homes moved up bands, which generated massive backlash. Scotland and England have repeatedly considered revaluation since but have shelved it each time. The result is that areas with above-average house price growth since 1991 (London, the South East) are under-paying relative to their current property values, while parts of the North under-paid in 1991 and now over-pay relatively."
      ),
      createFAQ(
        "Can I get a discount if I work from home?",
        "Generally no. The single occupier discount applies only when there is one adult resident, regardless of whether they work from home. There is a discount for using part of your home as business premises for non-domestic rates purposes, but it is rare in practice for desk-based home workers. If you are running a substantial business from home (dental practice, salon, retail) you may need to pay business rates on that portion."
      ),
      createFAQ(
        "What happens if I do not pay?",
        "After one missed instalment your council can demand the full year's bill upfront. Continued non-payment leads to a court summons, then a liability order, then enforcement action including bailiffs or attachment of earnings. Council tax debt is one of the most aggressively pursued in the UK because councils have specific statutory powers. If you genuinely cannot pay, contact the council immediately - most will set up a payment plan, and pension-age and low-income residents may qualify for Council Tax Support."
      ),
      createFAQ(
        "Do students pay council tax?",
        "Full-time students are disregarded for council tax. A property where every adult is a full-time student is fully exempt. A property with one student and one non-student gets the 25% single-occupier discount because the student does not count. Part-time students do count, even if they are studying intensely - the test is full-time enrolled status with the institution."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "mortgage-calculator", label: "Mortgage Calculator" },
      { slug: "rent-vs-buy-calculator", label: "Rent vs Buy Calculator" },
    ],
  },

  "pension-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Your Pension Pot Could Be Worth at Retirement",
        "The calculator runs compound growth on your current pot plus monthly contributions over the years to retirement. £50,000 today plus £500/month contributions plus a 3% employer match (so £515 effective) at 5% growth across 32 years (age 35 to 67) projects to roughly £710,000 at retirement. Of that, £247,500 is your contributions, £100,500 is employer top-up, and the remaining £362,000 is investment growth.",
        "The growth rate assumption matters more than people realise. Drop the rate from 5% to 4% and the pot falls to about £580,000 - over £130,000 less for nothing more than one percentage point. UK workplace pensions in default funds typically aim for 4% to 6% real growth, but past returns are not future returns. Stress-test your number using 3%, 5% and 7% to see the range. The [Compound Interest Calculator](/compound-interest-calculator) shows the same maths in non-pension form if you want to see why the growth assumption is so sensitive."
      ),
      createAnswerFirstSection(
        "How Much You Actually Need at Retirement",
        "The Pensions and Lifetime Savings Association publishes annual estimates: a single person needs about £14,400/year for a Minimum standard, £31,300 for Moderate, and £43,100 for Comfortable retirement (2024 figures). Couples can share costs and need less per person. A common rule of thumb is to multiply your desired annual income by 25 - so a Moderate retirement needs about £780,000 in pot terms, plus the £11,973/year State Pension covering some of the gap.",
        "Drawdown at the standard 4% safe withdrawal rate from a £710,000 pot gives £28,400/year inflation-adjusted, plus the State Pension on top. That is in the Moderate band but not Comfortable. To hit Comfortable you would need either higher contributions earlier, a longer working life, or genuinely strong investment returns. The single largest lever is starting age: a 25-year-old contributing £200/month with 3% employer match across 42 years often beats a 45-year-old contributing £600/month across 22 years, even though the older saver pays in twice as much money. Compounding does the rest."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the minimum I should contribute?",
        "Auto-enrolment requires a total of 8% (3% employer, 5% employee) on qualifying earnings between £6,240 and £50,270. For someone earning £35,000 that is roughly £190/month going into the pot. Most retirement modelling shows 8% is too low to hit the PLSA Moderate standard - you need 12% to 15% across a working life to be on track. If your employer matches above 3%, taking the full match is usually the highest-return decision in personal finance."
      ),
      createFAQ(
        "Should I worry about pension lifetime allowance?",
        "The lifetime allowance was abolished in April 2024. There is no longer a maximum pot you can build up tax-favourably. The annual allowance still exists - £60,000 of contributions per tax year, tapered down for high earners. A new £268,275 cap applies to the 25% tax-free lump sum at retirement, which limits the immediate cash you can take but does not limit the pot growth itself."
      ),
      createFAQ(
        "What growth rate should I assume?",
        "4% to 5% net of fees and inflation for a default workplace pension fund is reasonable for long-term planning. Higher-risk equity-heavy funds have averaged 6% to 7% over very long periods but with substantial year-to-year swings. Lower-risk lifestyle funds (which de-risk as you approach retirement) often run at 3% to 4%. Check your pension provider's projection tool for fund-specific assumptions."
      ),
      createFAQ(
        "Does the calculator account for inflation?",
        "The basic calculator shows nominal pot value at retirement. To get the real (inflation-adjusted) value, subtract about 2% to 3% from your growth rate before running the projection. So a 5% nominal growth assumption becomes a 2% real growth assumption - and the £710,000 nominal pot from the example would represent about £370,000 of today's spending power after 32 years of 3% inflation. This is why the gap between contribution amount and pot size is partly an illusion."
      ),
    ],
    relatedTools: [
      { slug: "isa-calculator", label: "ISA Calculator" },
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
    ],
  },

  "dividend-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Dividend Tax Works in 2026/27",
        "Dividends sit on top of your other income and use up tax bands in this order: salary first, then savings interest, then dividends. The first £500 of dividends each year is tax-free under the dividend allowance. After that the rates are 8.75% in the basic rate band (up to £50,270 total income), 33.75% in the higher rate band (up to £125,140), and 39.35% in the additional rate band above. Importantly, dividends are not subject to National Insurance.",
        "A salary of £40,000 plus £10,000 dividends works out as: £500 tax-free dividend allowance, then £9,500 taxed at 8.75% (because the total income of £50,000 stays within the basic rate band), giving a dividend tax bill of £831.25. Push the dividend up to £20,000 and £10,270 of it falls into the basic rate band (8.75%), £9,230 falls into the higher rate band (33.75%), and the dividend tax bill jumps to £4,013. The cliff edge at £50,270 hits hard."
      ),
      createAnswerFirstSection(
        "The Director's Salary and Dividend Trade-Off",
        "Many UK company directors take a small salary (often £12,570 to use the personal allowance) and the rest as dividends. The split can save thousands per year compared to taking everything as salary. £12,570 salary plus £37,430 dividends produces a dividend tax bill of £3,231, plus zero NI on the salary, plus corporation tax of 19% on the profits before they become dividends. Total deductions roughly £10,500 on a £50,000 income.",
        "By contrast, taking the same £50,000 entirely as salary triggers about £7,486 income tax and £2,994 NI, plus employer NI of about £4,800 if the company pays it - total £15,280. The dividend route saves around £4,800 a year. But the maths shifts when corporation tax is at 25% (over £250,000 profits), when you need to take more than the personal allowance as salary for pension contribution purposes, or when you want maximum statutory rights. Always check with an accountant for your specific case. The [UK Tax Calculator](/uk-tax-calculator) covers the salary-only side."
      ),
      {
        heading: "Dividend Tax by Income Band (2026/27)",
        table: {
          headers: ["Tax Band", "Income Range (after personal allowance)", "Rate on Dividends Above £500 Allowance"],
          rows: [
            ["Basic", "£0 to £37,700", "8.75%"],
            ["Higher", "£37,701 to £112,570", "33.75%"],
            ["Additional", "Over £112,570", "39.35%"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why has the dividend allowance shrunk so much?",
        "It was £5,000 when introduced in 2016, dropped to £2,000 in 2018, then £1,000 in 2023, then £500 from April 2024. Successive governments cut it to raise revenue from small business owners and individual investors holding shares outside ISAs. The cumulative effect is significant - a director taking £30,000 of dividends now pays around £400 more per year than they would have under the £5,000 allowance."
      ),
      createFAQ(
        "Are dividends inside an ISA taxable?",
        "No. Dividends from shares held inside a Stocks and Shares ISA are completely tax-free, regardless of amount. There is no dividend allowance limit for ISA dividends because the ISA wrapper itself shelters the income. This is why most UK private investors hold dividend-paying shares inside ISAs first, only spilling over to a General Investment Account once they have used the £20,000 annual ISA allowance."
      ),
      createFAQ(
        "Do I need to do a self-assessment for dividends?",
        "If your total dividend income for the year exceeds £10,000, yes. Below £10,000 but above £500, you can either register for self-assessment or ask HMRC to adjust your tax code to collect the dividend tax through PAYE. Below £500 in total dividends and you are within the allowance, so no action is needed."
      ),
      createFAQ(
        "What if I receive overseas dividends?",
        "Overseas dividends are taxable at the same UK rates, but you may also pay foreign withholding tax (typically 15% to 30%). The UK has double taxation treaties with most major countries that let you claim a credit for foreign tax paid against your UK liability, so you do not pay tax twice on the same income. The mechanics are reported through self-assessment. US dividends are common because of W-8BEN form filing requirements."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "isa-calculator", label: "ISA Calculator" },
      { slug: "national-insurance-calculator", label: "National Insurance Calculator" },
    ],
  },

  "inheritance-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Inheritance Tax Is Calculated",
        "Inheritance Tax is 40% on the value of your estate above the £325,000 nil-rate band. If you leave your main home to direct descendants (children, grandchildren) you also get the £175,000 residence nil-rate band on top, taking your tax-free allowance to £500,000. A married couple combines both, giving up to £1,000,000 tax-free if both bands are fully used and the home is left to descendants.",
        "An estate worth £600,000 with the home left to children pays IHT only on £100,000 (the slice above the £500,000 combined allowance), giving a £40,000 tax bill. The same estate with no descendants pays on £275,000 (above the £325,000 plain nil-rate band), giving a £110,000 tax bill - a £70,000 swing for the same money based purely on who inherits. The frozen nil-rate band has been £325,000 since 2009 and is locked at this level until April 2030."
      ),
      createAnswerFirstSection(
        "The 7-Year Rule and Lifetime Gifting",
        "Gifts made more than 7 years before death are completely outside the estate for IHT. Gifts made between 3 and 7 years before death attract taper relief, reducing the rate from the full 40% on a sliding scale: 32% for 3-4 years, 24% for 4-5 years, 16% for 5-6 years, 8% for 6-7 years. Gifts under 3 years before death are taxed at the full 40%. Crucially, taper relief only applies to gifts above the nil-rate band, so small gifts within the £325,000 threshold get no benefit from the taper.",
        "Annual exemptions are useful but small: £3,000 per year to anyone (with one year of carry-forward), £250 small gifts to as many people as you like, and unlimited gifts out of normal income provided your standard of living is unaffected. Wedding gifts have higher limits: £5,000 from parents, £2,500 from grandparents, £1,000 from anyone else. The big planning move for substantial estates is to start gifting major sums early - a £200,000 gift made 8 years before death saves £80,000 in IHT compared to the same gift made on the death bed. Always combine this with the [UK Tax Calculator](/uk-tax-calculator) for the income tax impact during your lifetime."
      ),
      {
        heading: "IHT Liability by Estate Value (Single Person, Home to Children)",
        table: {
          headers: ["Estate Value", "Allowance", "Taxable", "IHT at 40%"],
          rows: [
            ["£300,000", "£500,000", "£0", "£0"],
            ["£500,000", "£500,000", "£0", "£0"],
            ["£750,000", "£500,000", "£250,000", "£100,000"],
            ["£1,000,000", "£500,000", "£500,000", "£200,000"],
            ["£2,000,000", "£500,000 (full RNRB)", "£1,500,000", "£600,000"],
            ["£2,500,000", "£325,000 (RNRB tapered out)", "£2,175,000", "£870,000"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the residence nil-rate band taper?",
        "The £175,000 residence nil-rate band reduces by £1 for every £2 the estate exceeds £2 million. So at £2.35 million estate value, the residence nil-rate band has tapered out completely, leaving only the £325,000 standard nil-rate band. Married couples lose both spouse's RNRBs if their combined estate sits above the taper. This creates an effective marginal rate above 60% in the £2m to £2.35m band, so estate planning around this threshold is worth taking seriously."
      ),
      createFAQ(
        "Will my pension be subject to IHT after April 2027?",
        "Most unused pension pots will be drawn into the IHT estate from April 2027 under government changes announced in late 2024. Currently, defined contribution pensions sit outside the estate; beneficiaries who inherit before age 75 receive the pot tax-free, and those who inherit at 75+ pay only income tax on withdrawals. The 2027 change does not abolish those routes but adds the pot to the IHT calculation, potentially adding 40% on top. Check what your provider's communications say closer to the date."
      ),
      createFAQ(
        "Is life insurance counted in the estate?",
        "Yes, by default - the payout adds to the estate and may push it above the IHT threshold. Writing the policy in trust is the standard fix. The proceeds then pass directly to beneficiaries without entering the estate, so neither IHT nor probate delays apply. Most providers offer trust forms free of charge; ask your insurer or solicitor when you take out the policy. Existing policies can usually be put into trust retrospectively."
      ),
      createFAQ(
        "Can I avoid IHT by giving my house to my children?",
        "Not easily. If you continue living in the property rent-free after gifting it, HMRC treats it as a gift with reservation of benefit, and the property stays in your estate for IHT. To genuinely remove it, you would need to pay full market rent to your children (which is taxable income to them) or move out completely. Most attempts to give the house away while staying in it fail this test. The standard advice is to use the residence nil-rate band rather than try to give the house away during life."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "dividend-tax-calculator", label: "Dividend Tax Calculator" },
      { slug: "pension-calculator", label: "Pension Calculator" },
    ],
  },

  "council-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "Council Tax Bands A to H Explained",
        "Council tax in England runs on eight bands based on property values from 1991. The Band D rate is set by each local authority every March; everything else scales off that. Band A pays 6/9 of Band D, Band B pays 7/9, Band C pays 8/9, Band D pays 9/9 (the reference), Band E pays 11/9, Band F pays 13/9, Band G pays 15/9, Band H pays 18/9. That spread means a Band A household pays roughly a third of what a Band H household pays in the same authority.",
        "A typical 2026/27 Band D bill in England is around £2,200, though the range is wide - some London inner boroughs sit closer to £1,500 while parts of Rutland and Nottingham are above £2,400. Use the calculator to slide between bands and see the proportional change against the typical Band D rate, then check your actual local rate at gov.uk/council-tax for the precise number. Use the [UK Council Tax Calculator](/uk-council-tax-calculator) for a more detailed breakdown including local authority lookup."
      ),
      createAnswerFirstSection(
        "Single Occupancy and Other Discounts",
        "If only one adult lives at the property, the bill drops by 25%. This is the single most common discount and a household with one working adult plus children under 18 still qualifies. Two adults living together get the full 100% bill, even if one is unemployed or low-income (separate Council Tax Support is available for low-income households).",
        "Other discounts: 100% exemption when all residents are full-time students, 100% exemption when the only resident is severely mentally impaired, 50% discount when the property is a second home (in some authorities), and varying empty-property discounts that have been tightened in recent years. Some authorities now charge 200% on properties left empty for over 2 years to discourage hoarding of housing stock. Always check your specific council's policy because second-home rules are now set locally."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the difference between Band D and the council tax precept?",
        "Band D is the council's core property tax. The bill on top usually includes a separate adult social care precept (around 2-3% of the core figure), a police and crime commissioner precept (around £200-£300/year), and a fire authority precept (around £80-£100/year). All four numbers go on one bill but are set by different bodies. The headline 'Band D rate' typically refers to the council's own portion, not the all-in figure."
      ),
      createFAQ(
        "Do students need to pay council tax?",
        "Full-time students are disregarded. A property where every adult is a full-time student is fully exempt. A house with a student plus a working adult gets a 25% single-occupier discount because the student does not count as an adult for the calculation. Students must apply for the exemption with proof of enrolment - it is not automatic. Part-time students do count, even if their study load is heavy."
      ),
      createFAQ(
        "Can I challenge my council tax band?",
        "Yes, through the Valuation Office Agency's free challenge process. The grounds need to be substantive: incorrect 1991 valuation, comparable neighbours in lower bands, structural changes that affect the property's value. Some commercial reband companies charge 20-50% of the first year's saving, but the application is free if you do it yourself. Around 30% of challenges historically succeed, but a successful reband saves the difference for as long as you own the property."
      ),
      createFAQ(
        "What happens if I move mid-year?",
        "Council tax is calculated daily. You pay your old council up to the day you move out, your new council from the day you move in. There is no double charge for moving day itself. Notify both councils when you move (most have online forms); the old council will refund any overpayment automatically, usually within 6 weeks."
      ),
    ],
    relatedTools: [
      { slug: "uk-council-tax-calculator", label: "UK Council Tax Calculator" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "stamp-duty-calculator", label: "Stamp Duty Calculator" },
    ],
  },

  "child-benefit-tax-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the High Income Child Benefit Charge Works",
        "Child Benefit pays £26.05/week for the first child and £17.25/week per additional child in 2026/27 - around £1,355/year for one child or £2,252/year for two. The catch is the High Income Child Benefit Charge (HICBC). If the higher-earning partner has adjusted net income above £80,000 (raised from £60,000 from April 2026), the benefit is clawed back at 1% per £200 of income above the threshold. By £100,000 income, the entire benefit is clawed back.",
        "Crucially, the threshold applies to whoever earns more in the household, not combined income. A couple where both earn £55,000 (combined £110,000) keeps the full benefit. A single parent earning £80,001 or a couple where one partner earns £80,001 starts losing it. This produces the perverse outcome of single-earner households on £100,000 paying full HICBC while dual-earner households on £160,000 pay none."
      ),
      createAnswerFirstSection(
        "Why You Should Still Claim, Even If You Lose the Benefit",
        "If you opt out entirely to avoid HICBC, you lose two things: the cash benefit (which you would lose anyway through HICBC) and National Insurance credits for the parent who is not earning. The NI credits matter for State Pension entitlement. A non-earning parent looking after a child under 12 needs Child Benefit registration to receive automatic NI credits for those years - missing them costs £325/year of State Pension for each missed year, which compounds across decades.",
        "The right move for high earners is to claim Child Benefit, then either pay the HICBC through self-assessment, or tick the box that says 'I do not want to receive Child Benefit but I do want my NI record protected'. The latter gets the credits without the cash, avoiding the self-assessment hassle. Salary sacrifice into a pension is the other big lever - it reduces adjusted net income, so a £90,000 earner with £15,000 of pension contributions counts as £75,000 for HICBC and keeps the full benefit. Use the [UK Tax Calculator](/uk-tax-calculator) to see the wider tax implication."
      ),
      {
        heading: "Child Benefit After HICBC by Income (2 Children, 2026/27)",
        table: {
          headers: ["Higher Earner Income", "Gross Benefit", "HICBC", "Net Benefit"],
          rows: [
            ["£75,000", "£2,252", "£0", "£2,252"],
            ["£85,000", "£2,252", "£563", "£1,689"],
            ["£90,000", "£2,252", "£1,126", "£1,126"],
            ["£95,000", "£2,252", "£1,689", "£563"],
            ["£100,000+", "£2,252", "£2,252", "£0"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What counts as adjusted net income for HICBC?",
        "Adjusted net income is total taxable income minus pension contributions, gift aid donations and trading losses. Crucially, it includes employer-provided benefits in kind (company car, private medical) that you might not think of as income. The figure is normally close to your P60 total but can differ if you have other income streams. Pension contributions via salary sacrifice reduce the figure most reliably; relief at source contributions reduce it through self-assessment."
      ),
      createFAQ(
        "Did the threshold actually change in April 2026?",
        "Yes. The HICBC threshold rose from £60,000 to £80,000 from April 2026, and the full clawback completes at £100,000 instead of £80,000. The taper rate is now 1% per £200 (instead of 1% per £100), spreading the clawback across a £20,000 band rather than the previous £10,000 band. Couples earning between £60k and £80k who used to pay HICBC now keep the full benefit."
      ),
      createFAQ(
        "How do I pay the HICBC?",
        "Through self-assessment. Register for self-assessment by 5 October following the tax year you crossed the threshold. The charge is added to your tax bill and paid by 31 January (with a payment on account by 31 July if your tax bill is over £1,000). Many high earners get caught out the first year because they have not done self-assessment before. Set a reminder for the registration deadline - HMRC fines for late registration are £100 plus interest on unpaid tax."
      ),
      createFAQ(
        "Should I opt out if I will definitely lose the lot?",
        "Generally no, even if your income is comfortably above £100,000. The non-earning partner's National Insurance credits (worth around £325/year of future State Pension per qualifying year) are worth claiming via the 'no payment, just NI credits' option. The only case for opting out entirely is if both partners are working and accruing NI through employment - then the credits are surplus and the self-assessment hassle outweighs the benefit."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "child-benefit-calculator", label: "Child Benefit Calculator" },
      { slug: "is-childcare-worth-it", label: "Is Childcare Worth It Calculator" },
    ],
  },

  "maternity-pay-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK Statutory Maternity Pay Works",
        "Statutory Maternity Pay (SMP) runs for 39 weeks. The first 6 weeks are paid at 90% of your average weekly earnings with no cap. The remaining 33 weeks are paid at the lower of 90% of your earnings or the statutory rate of £187.18/week (2026/27 rate, up from £184.03 in 2025/26). To qualify, you need to have been employed by the same employer continuously for at least 26 weeks at the 15th week before your due date, and your average weekly earnings must be at least £125 (the Lower Earnings Limit for NI).",
        "Total SMP for a £500/week earner: 6 weeks at £450 (90%) plus 33 weeks at £187.18 (statutory cap), giving £8,877.94 across the 39 weeks. The same calculation for a £250/week earner: 6 weeks at £225, then 33 weeks at £187.18 (statutory cap kicks in below the 90% figure), totalling £7,527.94. Mothers earning more get more in the first 6 weeks but everyone hits the same statutory rate ceiling thereafter."
      ),
      createAnswerFirstSection(
        "Enhanced Maternity, the Final 13 Weeks, and Common Pitfalls",
        "Many UK employers offer enhanced maternity above the statutory minimum. Common patterns: full pay for 13 weeks then SMP, or 90% for 26 weeks then SMP. Check your contract - the enhancement is contractual and worth substantially more than the statutory rate. The total leave entitlement is 52 weeks (26 weeks Ordinary Maternity Leave plus 26 weeks Additional Maternity Leave); the final 13 weeks of leave is unpaid unless your employer offers extra.",
        "The other surprise is that SMP runs from the day your maternity leave starts, not the baby's birth. You can start as early as the 11th week before due date or as late as the day after birth. Most mothers start either 1 week before due date (using Annual Leave to bridge the period after MATB1 form) or on the birth date itself. The [UK Tax Calculator](/uk-tax-calculator) is useful for working out what your reduced household income looks like in tax-paid terms across the year of leave."
      ),
      {
        heading: "SMP Total by Average Weekly Earnings (39 weeks total, 2026/27)",
        table: {
          headers: ["Weekly Earnings", "First 6 Weeks (90%)", "Next 33 Weeks", "Total SMP"],
          rows: [
            ["£200", "£1,080", "£5,940 (90% rate £180)", "£7,020"],
            ["£300", "£1,620", "£6,177 (cap £187.18)", "£7,797"],
            ["£500", "£2,700", "£6,177 (cap £187.18)", "£8,877"],
            ["£800", "£4,320", "£6,177 (cap £187.18)", "£10,497"],
            ["£1,200", "£6,480", "£6,177 (cap £187.18)", "£12,657"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What if I don't qualify for SMP?",
        "If you have not been with the same employer for the 26-week qualifying period or you earn less than £125/week, you may instead qualify for Maternity Allowance through the DWP. Maternity Allowance pays the same flat rate as the SMP statutory cap (£187.18/week in 2026/27) for 39 weeks, with eligibility based on having worked 26 of the 66 weeks before due date, including some self-employed weeks paying Class 2 NI."
      ),
      createFAQ(
        "Is SMP taxed?",
        "Yes - SMP counts as earned income and is subject to income tax and National Insurance through PAYE. Most employers continue to deduct tax and NI as normal during maternity leave. If your total annual income drops below the personal allowance during the leave year, you may be due a tax refund through HMRC's normal annual reconciliation."
      ),
      createFAQ(
        "Can I take SMP and work part-time?",
        "Limited yes - up to 10 'Keeping In Touch' (KIT) days during maternity leave without losing SMP for the relevant weeks. KIT days are paid at your normal rate, separate from SMP. Beyond 10 days, working will trigger the loss of SMP for that week. Many employers use KIT days for handover meetings, conferences, or short-term cover."
      ),
      createFAQ(
        "Does my partner get any pay?",
        "Statutory Paternity Pay covers up to 2 weeks for partners, paid at the same statutory rate (£187.18/week). Some employers enhance this. Shared Parental Leave (SPL) lets parents split the maternity leave entitlement between them, with the same combined 39 weeks of paid leave but more flexibility on who takes which weeks. SPL is underused but worth considering for households where the mother wants an earlier return to work."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "child-benefit-tax-calculator", label: "Child Benefit Tax Calculator" },
      { slug: "is-childcare-worth-it", label: "Is Childcare Worth It Calculator" },
    ],
  },

  "is-childcare-worth-it": {
    sections: [
      createAnswerFirstSection(
        "When Returning to Work Is Genuinely Worth It",
        "The maths often surprises households. A £40,000 salary returning to work full-time with one child in nursery at £1,400/month produces a net gain of roughly £4,500/year in 2026/27, after tax (£5,486), NI (£2,194), childcare costs (£16,800) and assuming no commute. That works out to about £2.30/hour worked - well below minimum wage in real terms.",
        "The same parent on a £55,000 salary nets closer to £15,000/year, or £7.80/hour. The break-even is heavily sensitive to childcare cost: full-time nursery in London averages £1,800/month (£21,600/year), in the North averages £900/month (£10,800/year). Use the calculator to plug in your actual local cost rather than national averages, because the regional spread is wider than most national articles suggest."
      ),
      createAnswerFirstSection(
        "Government Support That Changes the Maths",
        "Tax-Free Childcare gives a 20% top-up on contributions up to £2,000 per child per year (£500/quarter), so a £10,000 nursery fee becomes effectively £8,000 if the parent uses the scheme. Fully funded 30 hours/week of childcare for working parents of children aged 9 months to school age (April 2026 expansion) is the biggest game-changer in years - it can wipe £8,000 to £15,000 off annual nursery costs depending on hours used.",
        "Universal Credit covers up to 85% of childcare costs for low-income working parents, paid in arrears against receipts. Workplace nursery vouchers (closed to new joiners since 2018) still benefit existing users. The key planning point: model the post-April-2026 funded hours scenario as well as the legacy scenario, because the gap between them is often £500/month or more. Pair the result with the [UK Tax Calculator](/uk-tax-calculator) to see your actual take-home, and the [Maternity Pay Calculator](/maternity-pay-calculator) to compare against staying on extended leave."
      ),
    ],
    faqs: [
      createFAQ(
        "Is going back to work worth it for £20,000 a year?",
        "On a £20,000 salary with full-time nursery at £1,200/month, after tax, NI and childcare you may net less than £1,500/year, or under £1/hour worked. Many households conclude it is not financially worth it for the lower-earning parent to return full-time at this income level. Part-time hours that fit within the funded childcare entitlement (30 hours/week from April 2026) often produce a much better hourly return."
      ),
      createFAQ(
        "Should I take Tax-Free Childcare or stay on the old vouchers?",
        "If you are still receiving childcare vouchers via salary sacrifice from before October 2018, run both scenarios. Vouchers offer up to £243/month tax-free for basic-rate taxpayers (worth roughly £933/year saving) or £124/month for higher-rate (worth £478/year). Tax-Free Childcare offers up to £2,000/year per child. Households with multiple children and total childcare costs above £10,000 usually win with TFC; single-child households on basic rate often do better with vouchers if costs are below £4,000."
      ),
      createFAQ(
        "What about long-term career impact?",
        "The calculator only models the current year's net gain or loss. Career break research (notably the Resolution Foundation's analyses) suggests parents who take 5+ years out lose 15-30% of lifetime earnings compared to those who stay in work part-time. The annual £2,500 'loss' from going back to work might be a £150,000 'gain' across a 25-year career through preserved progression. Hard to model, but worth weighing against the year-one figure."
      ),
      createFAQ(
        "Can I work from home to reduce childcare hours?",
        "Mostly no for under-3s. Genuinely productive working with a 1-year-old at home is rare and typically only feasible for very short periods. Nursery for 3 days a week plus working from home with a grandparent on the other 2 days is a common compromise that drops childcare costs by 40% while preserving most working hours. The maths shifts noticeably once children are 3+ and at preschool/funded hours, when full-time work-from-home with school pickup becomes practical."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "childcare-cost-calculator", label: "Childcare Cost Calculator" },
      { slug: "maternity-pay-calculator", label: "Maternity Pay Calculator" },
    ],
  },
};


