// SEO content for parenting and kids tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const parentingSEO = {
  "birthday-party-game-planner": {
    sections: [
      createAnswerFirstSection(
        "How to Plan a Birthday Party That Actually Works",
        "A successful kids' party schedule has a clear arc: arrival activity (10 to 15 minutes), 3 or 4 active games (10 to 15 minutes each), a quieter game while food is laid out (10 minutes), food and cake (20 minutes), one last big game, then party bags at the door. For a 1-hour party, drop the arrival activity and trim each game to 8 minutes; for a 2-hour party, add a craft station between food and the final game.",
        "The single most useful trick: have one extra game ready that is not on the printed schedule. Children burn through games faster than you expect (especially on a sugar high) and a 5-minute lull in a 5-year-old's birthday party feels like an hour. Keep something easy in your pocket like Sleeping Lions or Freeze Dance and pull it out the moment energy dips. Print the schedule for your own reference, but do not show it to the kids; they will start asking when each thing is happening."
      ),
      createAnswerFirstSection(
        "Picking Games by Age",
        "Match the game to the age, not the other way around. 3 to 5 year olds need games with simple rules and no losers (Musical Statues, Pass the Parcel, Duck Duck Goose). 5 to 7 year olds can handle elimination games (Musical Bumps, Sack Race, Pin the Tail). 7 to 9 year olds are into anything with teams and a goal (Scavenger Hunt, Treasure Hunt, Capture the Flag). 9 to 12 year olds want autonomy and challenge (Murder Mystery, Code-Breaking, Minute-to-Win-It tournaments).",
        "Mixed-age parties are the hardest. If the gap is more than 3 years, pick games where the older kids can naturally take a leadership role: scavenger hunts where each older child captains a team of younger ones, or relay races with mixed-age teams that balance speed and effort. Avoid pure elimination games at mixed-age parties unless you have a way for eliminated kids to keep doing something fun (a craft table on the side works well). Look at the [pass the parcel forfeit generator](/pass-the-parcel-forfeit-generator) if you want age-appropriate forfeits inside each layer."
      ),
      createAnswerFirstSection(
        "How Many Games Do You Actually Need?",
        "Plan for one game per 10 minutes of party time, then add a buffer of 2 spare games. So a 90-minute party needs 9 planned games plus 2 spares. That sounds like too many. It is not. Half of them will run shorter than you expected and a couple will fall flat with this particular group of kids.",
        "Worked example for 12 kids aged 5-7 over 90 minutes: arrive and free play with bubbles (10 mins), Musical Bumps (10), Sack Race (10), Pin the Tail (10), food and cake (25), Pass the Parcel (15), Egg and Spoon Race (10). That is 90 minutes on paper but in practice it will run 80 (food usually takes longer, games shorter), so keep Sleeping Lions in your pocket for the inevitable 10-minute slack. Use the [party bag checklist generator](/party-bag-checklist-generator) to plan the takeaway and the [kids activity spinner](/kids-activity-spinner) for the post-party come-down."
      ),
      createAnswerFirstSection(
        "Indoor vs Outdoor and Wet Weather Backup",
        "Outdoor games (Capture the Flag, Sack Race, Three-Legged Race, Treasure Hunt) need at least a small lawn or quiet park space and a backup plan if it rains. Indoor games (Musical Statues, Pass the Parcel, Sleeping Lions, Charades) work in any room with the furniture pushed back. Most parents end up with a hybrid, even when planning a garden party.",
        "If you are using a hall or hired venue, walk the space before the party to identify hazards (low tables, glass display cabinets, cables) and decide what gets moved or covered. Bring a bag with the things you always forget: blu-tack, a pen, sellotape, scissors, kitchen roll, plasters and a bin bag. Even a perfectly planned party will involve at least one spilled drink, one bumped head and one toilet emergency. Plan for those, not just for the games."
      ),
    ],
    faqs: [
      createFAQ(
        "How long should a kids' birthday party last?",
        "1.5 hours for ages 3 to 5, 2 hours for ages 5 to 8, and 2 to 3 hours for ages 8 and up. Younger children peak earlier and meltdown harder; longer parties just mean overtired kids and stressed parents. If you want to add length, do it at the end with a quieter activity (film, craft) rather than more games."
      ),
      createFAQ(
        "How many kids should I invite to a birthday party?",
        "A common rule is the child's age plus one, so a 6-year-old invites 7 friends. That is a guideline, not a rule. Most school-age parties are 10 to 15 children, which is manageable for one or two adult helpers. Above 20 children you need either a venue with structured activities or 3 to 4 adults running parallel game stations."
      ),
      createFAQ(
        "What games work for a small party of just 4 or 5 kids?",
        "Small parties are great for cooperative games and mini tournaments. Try Pin the Tail with everyone having a go, a 4-person Treasure Hunt with multiple clues, Charades or Pictionary in two pairs, and Lego or playdough challenges. Skip elimination games like Musical Chairs, since rounds finish in seconds with so few players."
      ),
      createFAQ(
        "How do I keep parents at the party without it being awkward?",
        "Set up a parents' corner with tea, coffee and biscuits as far from the games as the space allows. Make it clear in the invite whether you expect parents to stay or drop off (typical cut-off is age 5 or 6). If you want parents to leave, have a written collection time on the invite and stick to it."
      ),
      createFAQ(
        "What should I put in a party bag and how much should I spend?",
        "Most parents budget £2 to £4 per bag. The standard contents are a slice of birthday cake in a napkin, a small toy or puzzle, one or two sweets and a balloon. Less is more: one nice item beats five tiny throwaway plastic things that go straight in the bin. The [party bag checklist generator](/party-bag-checklist-generator) gives a shopping list with totals for any budget."
      ),
    ],
    relatedTools: [
      { slug: "pass-the-parcel-forfeit-generator", label: "Pass the Parcel Forfeit Generator" },
      { slug: "party-bag-checklist-generator", label: "Party Bag Checklist Generator" },
      { slug: "kids-activity-spinner", label: "Kids Activity Spinner" },
    ],
  },

  "baby-growth-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Does a Growth Percentile Actually Mean?",
        "If your baby is on the 50th percentile for weight, it means that out of 100 babies of the same age and sex, your baby would weigh more than 50 of them and less than the other 50. The 50th is the median, not a target. Babies on the 3rd percentile and the 97th are both perfectly normal; what matters is whether they stay roughly on their own line over time, not which line they happen to be on.",
        "Health visitors and paediatricians worry about percentile crossing, not percentile rank. A baby tracking steadily along the 9th percentile is healthier than one who has dropped from the 75th to the 25th in three months. WHO charts (used in the UK from 2009) are based on breastfed babies from six countries who were raised in optimal conditions, so they describe how children grow when nothing is going wrong, not how the average child happens to grow."
      ),
      createAnswerFirstSection(
        "When Centiles Are Worth a Real Look",
        "Three situations are worth raising with your health visitor or GP: dropping more than two centile spaces (e.g. 75th down to the 9th), staying flat in weight for more than a month after the early weeks, or a sudden mismatch between weight and length percentiles where one is far higher than the other. None of these mean something is definitely wrong. They just mean it deserves a proper look.",
        "Worked example: a 4-month-old boy weighing 6.8 kg sits around the 25th percentile. If he was born on the 75th and has dropped steadily ever since, the health visitor will probably ask about feeding frequency, wet nappies and milestones. If he has been on the 25th since birth and is alert, peeing, pooing and meeting milestones, that is just his line. Babies are not supposed to all be average."
      ),
      {
        heading: "WHO 50th Percentile Reference (Approximate)",
        table: {
          headers: ["Age", "Boys weight", "Boys length", "Girls weight", "Girls length"],
          rows: [
            ["Birth", "3.3 kg", "49.9 cm", "3.2 kg", "49.1 cm"],
            ["1 month", "4.5 kg", "54.7 cm", "4.2 kg", "53.7 cm"],
            ["3 months", "6.4 kg", "61.4 cm", "5.8 kg", "59.8 cm"],
            ["6 months", "7.9 kg", "67.6 cm", "7.3 kg", "65.7 cm"],
            ["12 months", "9.6 kg", "75.7 cm", "8.9 kg", "73.7 cm"],
            ["24 months", "12.2 kg", "87.8 cm", "11.5 kg", "85.7 cm"],
          ],
        },
      },
      createAnswerFirstSection(
        "Things This Calculator Cannot Do",
        "It cannot diagnose anything. It cannot replace the red book, your health visitor's plotted curve, or a GP appointment. It uses a single 50th-percentile WHO dataset for ages 0 to 24 months and estimates other percentiles from that, which is fine for a quick sanity check but not the same as a proper longitudinal chart with your baby's actual measurements over time.",
        "If you want a fuller picture, weigh your baby on the same scales each time, ideally naked or in a clean nappy, and plot at the same time of day where possible. The personal child health record (red book in England) is still the canonical tool for tracking. If something feels off, even if numbers say otherwise, ring your health visitor; they would rather see you for a non-issue than miss a real one. The [pregnancy due date calculator](/pregnancy-due-date-calculator) and [age calculator](/age-calculator) help you keep track of corrected age, which matters a lot if your baby was born early."
      ),
    ],
    faqs: [
      createFAQ(
        "My baby is on the 9th percentile. Should I worry?",
        "Almost certainly not on its own. The 9th percentile means 9 out of 100 babies the same age and sex weigh less, and 91 weigh more, but every one of those 9 is normal. Health professionals look at the trend across several measurements rather than a single number. If your baby is alert, feeding well, producing wet nappies and meeting milestones, the line they sit on is just their line."
      ),
      createFAQ(
        "Why does the UK use WHO charts and not US CDC charts?",
        "WHO charts have been the UK standard since 2009 because they are built from babies raised in optimal conditions across six countries (including breastfed infants), so they show how a child should grow rather than how the average child does grow. CDC charts are descriptive of US children, where formula feeding has historically been more common and so weight gain runs slightly higher. The two charts diverge most noticeably between 3 and 12 months."
      ),
      createFAQ(
        "What is corrected age and when do I use it?",
        "Corrected age is your baby's age minus the number of weeks they were premature. If your baby was born 8 weeks early and is now 6 months old, their corrected age is 4 months and you plot them at 4 months on the chart. Most paediatricians use corrected age for growth and development until at least 2 years old, sometimes longer for very preterm babies."
      ),
      createFAQ(
        "Should I weigh my baby every week?",
        "No. After the first six weeks, NHS guidance is to weigh no more than once a month up to 6 months, then every two months until age 1, and every three months in the second year. Weighing too often picks up natural fluctuations that look like problems and aren't. The exception is if a health professional has specifically asked you to monitor more closely."
      ),
      createFAQ(
        "Why did my baby's weight drop in the first week?",
        "Newborns commonly lose 5 to 10% of their birth weight in the first 3 to 5 days as fluid balance settles and feeding establishes. Most babies are back to birth weight by 10 to 14 days. A loss of more than 10%, or failure to regain birth weight by day 14, is when health visitors will want to investigate feeding properly."
      ),
    ],
    relatedTools: [
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
      { slug: "age-calculator", label: "Age Calculator" },
      { slug: "baby-name-generator", label: "Baby Name Generator" },
    ],
  },

  "cost-of-raising-a-child": {
    sections: [
      createAnswerFirstSection(
        "What a Child Actually Costs From 0 to 18",
        "In the UK, raising a single child to age 18 typically lands between £160,000 and £240,000 depending on childcare choices, schooling and lifestyle, with childcare alone making up roughly a third of that bill in the early years. The Child Poverty Action Group's most recent estimate is around £166,000 for a couple and £220,000 for a lone parent, before housing. Add private school and the figure can double.",
        "The cost is not spread evenly. Years 0 to 4 are dominated by nursery fees that frequently run £55 to £70 per day in London and £40 to £55 in the regions, which is why parents who lose a parent's income or use grandparents see such different totals from those who pay for full-time care. Once children start school, daily costs ease but holiday clubs, school uniforms (allow £150 to £300 per year), school trips and clubs steadily fill the gap."
      ),
      createAnswerFirstSection(
        "Why Childcare Choice Changes the Total by Tens of Thousands",
        "Switch the childcare option from nursery to grandparents in this calculator and watch the total drop by £30,000 to £60,000. That is real money, and it is the single biggest variable for most families. The 15 hours of free childcare for 3 and 4 year olds (extended in the 2024 reforms to younger children if you meet the working parents criteria) covers term-time only and runs out fast if your child is in care 50 weeks a year.",
        "Tax-Free Childcare adds £2 from the government for every £8 you put in, capped at £2,000 per child per year. It stacks with the free hours but not with childcare vouchers from older salary-sacrifice schemes. The [grandparent childcare value calculator](/grandparent-childcare-calculator) puts a number on what unpaid family help is actually worth in your area, which often makes the trade-off feel more honest."
      ),
      {
        heading: "Approximate UK Costs by Age Band (Couple Family, State School)",
        table: {
          headers: ["Age band", "Years", "Annual cost (typical)", "Total for the band"],
          rows: [
            ["0-2", "3", "£14,000 to £20,000", "£42,000 to £60,000"],
            ["3-4", "2", "£10,000 to £14,000", "£20,000 to £28,000"],
            ["5-11", "7", "£7,000 to £9,500", "£49,000 to £66,500"],
            ["11-16", "5", "£8,000 to £11,000", "£40,000 to £55,000"],
            ["16-18", "2", "£9,000 to £12,000", "£18,000 to £24,000"],
          ],
        },
      },
      createAnswerFirstSection(
        "What This Calculator Does Not Include",
        "Two big costs sit outside the headline number: the extra housing you need (a bigger flat or house, in a catchment area), and the income you may give up to look after a child. Those are the elephants in the room and they vary so much by location and household that a single national average would be meaningless. We model them in the [stay-at-home mum calculator](/stay-at-home-mum-calculator) and the [parental career sacrifice calculator](/career-sacrifice-calculator) instead.",
        "Also missing: gifts (yours and other people's), birthday parties (allow £100 to £400 per year by school age), tutoring, music lessons, smartphones from around age 11, driving lessons (around £1,400 to £1,800 in the UK by 17), and university maintenance contributions if you choose to top up the student loan. None of these are required, but most middle-income families end up paying for at least three or four of them."
      ),
    ],
    faqs: [
      createFAQ(
        "Do second and third children cost the same as the first?",
        "No, they cost noticeably less per child because of hand-me-downs, shared bedrooms, and bulk childcare discounts at most nurseries. CPAG research suggests the second child costs roughly 70% of the first, and the third around 60%, though this evens out as they reach secondary school and uniforms, trips and devices are no longer shareable."
      ),
      createFAQ(
        "How much does private school add to the total?",
        "UK day school fees average around £18,000 to £22,000 a year and rose sharply from January 2025 when VAT was added at 20%. From age 5 to 18 (13 years), that is roughly £230,000 to £290,000 on top of the standard cost of raising a child. Boarding fees push that figure to £400,000 or more. Bursaries and scholarships are real but rare; budget on the full sticker price."
      ),
      createFAQ(
        "Does Child Benefit cover any of this?",
        "It helps, but only modestly. Child Benefit pays £26.05 per week for the eldest child and £17.25 for each subsequent child (2026/27 rates), so a one-child family receives roughly £1,355 a year. That covers about a month of nursery fees in London. The High Income Child Benefit Charge starts to claw it back if either parent earns over £60,000 and removes it entirely above £80,000."
      ),
      createFAQ(
        "Why do US estimates look so different from UK ones?",
        "The USDA's 2017 estimate (the last official one) was around $233,000 for raising a child to 17, before college. American estimates exclude childcare for parents who don't pay for it, and US health insurance is treated separately. UK estimates also exclude housing and parental income loss. Once you adjust for what is included, UK and US totals are surprisingly close at the median."
      ),
      createFAQ(
        "How accurate is this for low-income or single-parent families?",
        "The figures here are middle-of-the-road estimates for a couple in average circumstances. Single-parent households spend less in absolute terms (smaller home, fewer family activities) but a much higher proportion of household income, and qualify for Universal Credit elements that offset childcare. The CPAG report on the cost of a child is the best source for poverty-level breakdowns and runs the numbers yearly."
      ),
    ],
    relatedTools: [
      { slug: "stay-at-home-mum-calculator", label: "Stay-at-Home Mum Salary Calculator" },
      { slug: "grandparent-childcare-calculator", label: "Grandparent Childcare Value Calculator" },
      { slug: "career-sacrifice-calculator", label: "Parental Career Sacrifice Calculator" },
    ],
  },

  "stay-at-home-mum-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Stay-at-Home Mums Are Actually Worth in the UK",
        "Add up the going rate for what a stay-at-home mum does in a typical week (childcare at nanny rates, cooking at chef rates, cleaning, tutoring, driving, household management, night care, emotional support and the rest) and the annual figure usually lands between £55,000 and £85,000 in the UK, depending on how many children, how young they are, and where you live. London nannies command £14 to £18 per hour gross. Outside London the going rate is closer to £11 to £14. Most stay-at-home mums work 80 to 100 hours a week across these roles.",
        "These numbers are not designed to win an argument with your partner. They exist because the work is invisible in GDP statistics and on tax returns, and seeing it priced makes the trade-off concrete. If you went back to work and paid for the same hours, this is what it would cost. The figure is also a useful gut-check when a partner asks 'what do you actually do all day' and you have not had the energy to count."
      ),
      createAnswerFirstSection(
        "How UK Maternity Leave and Pay Affects the Calculation",
        "Statutory Maternity Pay in the UK runs for 39 weeks: 90% of average earnings for the first 6 weeks, then £187.18 per week (or 90% of earnings if lower) for the remaining 33 weeks, with the final 13 weeks of leave unpaid. Maternity Allowance covers self-employed mothers at the same flat rate. By month 9 most mothers are deciding whether to return at full hours, return part time, or stop work entirely.",
        "The 30 hours of free childcare for 3 and 4 year olds (extended to younger ages from September 2024 for working parents earning between £9,518 and £100,000 each) makes a significant difference, but only for term time and only if the parent meets the work requirement. Tax-Free Childcare adds £2 for every £8 you put in, capped at £2,000 per child per year. The arithmetic of returning to work full time often comes down to whether your post-tax salary clears the cost of full-time nursery, which in London routinely costs £1,800 to £2,400 per month per child."
      ),
      {
        heading: "Approximate Hourly Rates Used in This Calculator (UK)",
        table: {
          headers: ["Role", "UK hourly rate", "Typical weekly hours", "Annual value"],
          rows: [
            ["Childcare (nanny)", "£12.50", "30", "£19,500"],
            ["Cooking (chef)", "£14.00", "14", "£10,192"],
            ["Cleaning (housekeeper)", "£11.50", "10", "£5,980"],
            ["Tutoring (homework help)", "£20.00", "4", "£4,160"],
            ["Driving (chauffeur)", "£13.00", "7", "£4,732"],
            ["Night care (overnight rate)", "£15.00", "5", "£3,900"],
          ],
        },
      },
      createAnswerFirstSection(
        "What the Number Misses",
        "It misses the pension you are not building (a year out of work in your 30s typically costs £15,000 to £30,000 of compounded retirement income by age 67), the National Insurance contributions you would otherwise be paying, and the career compounding effect where every year out lowers your re-entry salary. Specified Adult Childcare Credits help if grandparents are caring for under-12s while you work, but there is no equivalent credit for the parent at home.",
        "It also misses the upside that no spreadsheet captures: being there for the school run, knowing your child's friends' parents, catching the developmental wobble that a nursery key worker would not have spotted. None of that is monetised, and that is fine; the point of this tool is to make visible what was invisible, not to argue that childcare is purely transactional. The [emotional labour calculator](/emotional-labour-calculator) and [household task split](/household-task-split) tools cover the parts of the load that look smaller individually but compound over years."
      ),
    ],
    faqs: [
      createFAQ(
        "Is this number what I would actually earn if I went back to work?",
        "No. It is what it would cost to replace your unpaid work at market rates, which is a different question. Your post-tax salary on return would depend on your career, hours, and tax band. The two figures are useful side by side: the replacement cost shows the value of staying home; the salary shows the cost of doing so. The [parental career sacrifice calculator](/career-sacrifice-calculator) models the lifetime earnings side."
      ),
      createFAQ(
        "Should I count emotional labour and mental load in this calculator?",
        "This tool focuses on hands-on time spent on tangible tasks (childcare, cooking, driving), which is easier to defend as a real number. Emotional labour (remembering everyone's medications, planning birthdays, scheduling dentists, holding the family's emotional temperature) is real but harder to time. The dedicated [emotional labour calculator](/emotional-labour-calculator) attaches realistic project-management hourly rates to those tasks."
      ),
      createFAQ(
        "What about Specified Adult Childcare Credits and Carer's Credit?",
        "If you receive Child Benefit for a child under 12, you automatically get National Insurance credits towards your State Pension while you are not working. Specified Adult Childcare Credits transfer that credit to a grandparent if they are doing the childcare while you work. Carer's Credit covers anyone caring 20+ hours a week for a person with a disability. None of these replace lost workplace pension contributions."
      ),
      createFAQ(
        "How do you set the hourly rate for night care?",
        "Night nannies in the UK charge £15 to £20 per hour, with a typical overnight shift (10pm to 7am) costing £140 to £180. Postnatal doulas charge similarly. The calculator uses a conservative middle figure because most stay-at-home parents are not on duty for the full nine hours; they are on call, with broken sleep, which is not the same thing as active overnight childcare."
      ),
      createFAQ(
        "Can I share this number to start a conversation with my partner?",
        "Yes, that is largely what the tool exists for. The result page has a copy-to-share button that puts the headline number and a short summary into a sentence you can paste into a message. The point is rarely to demand payment; it is to make sure both partners see the unpaid work clearly enough to plan around it (pensions, savings, parental leave splits)."
      ),
    ],
    relatedTools: [
      { slug: "emotional-labour-calculator", label: "Emotional Labour Calculator" },
      { slug: "career-sacrifice-calculator", label: "Parental Career Sacrifice Calculator" },
      { slug: "cost-of-raising-a-child", label: "Cost of Raising a Child Calculator" },
    ],
  },

  "stay-at-home-mom-calculator": {
    sections: [
      createAnswerFirstSection(
        "What a Stay-at-Home Mom's Work Is Worth in the US",
        "Price out what a stay-at-home mom does in a typical week at US market rates and the annual figure usually lands between $80,000 and $130,000, depending on the city, the number of children, and how young they are. Salary.com's annual Mom Salary Survey has put the figure above $180,000 in recent years using the longest hours estimate. The midpoint here uses BLS occupational wage data for nannies, housekeepers, line cooks and the rest, applied to a realistic 90-hour week.",
        "Why does the number look so much higher than the UK equivalent? US labour costs are higher across the board, full-time childcare in major metros runs $1,400 to $2,500 per month per child, and the lack of statutory paid leave or universal pre-K means more of the work stays inside the household for longer. The figure is not a paycheck; it is a replacement-cost estimate. If you went back to work and paid for everything you currently do, this is what your household would be writing checks for."
      ),
      createAnswerFirstSection(
        "Why the US Numbers Look the Way They Do",
        "The US has no federal paid maternity leave. FMLA gives 12 weeks of unpaid, job-protected leave to employees of larger firms who have been there a year, and only nine states plus DC offer paid family leave at the state level. Most American mothers either return to work within 6 to 12 weeks or stop working altogether because the math of full-time daycare ($15,000 to $30,000 per child per year) plus a second commute does not clear a typical second salary after taxes.",
        "Childcare costs vary wildly by state. Mississippi sits around $700 per month for infant centre care; Massachusetts and California are over $2,000. The Child Care Aware annual report tracks the figures by state and is the standard reference. Add in 529 plan contributions (most US parents start one in the first two years), health insurance premiums for the family plan, and the cost-of-childcare gap in the first 5 years can easily eclipse the working parent's after-tax pay."
      ),
      {
        heading: "Approximate US Hourly Rates Used in This Calculator",
        table: {
          headers: ["Role", "US hourly rate", "Typical weekly hours", "Annual value"],
          rows: [
            ["Childcare (nanny)", "$22.00", "30", "$34,320"],
            ["Cooking (line cook)", "$18.00", "14", "$13,104"],
            ["Cleaning (housekeeper)", "$17.00", "10", "$8,840"],
            ["Tutoring (private tutor)", "$30.00", "4", "$6,240"],
            ["Driving (chauffeur)", "$20.00", "7", "$7,280"],
            ["Night care (postpartum doula)", "$28.00", "5", "$7,280"],
          ],
        },
      },
      createAnswerFirstSection(
        "What the Number Cannot Capture",
        "It does not capture the lost retirement contributions (no 401(k) match for years out of work, fewer Social Security earning years), the hit to your future earnings if you re-enter the workforce, or the lack of health insurance through your own employer. American stay-at-home parents lose around $570,000 in lifetime earnings on average, and those numbers are higher for mothers with degrees. Some of that is offset by saved childcare costs; most is not.",
        "It also does not capture the things that matter most to a lot of families: being there for after-school pickup, holding the household together when a parent is travelling for work, knowing the paediatrician's name without checking. The point of putting a dollar figure on the work is not to argue that staying home is a transaction. It is to make sure both partners can see the work clearly enough to plan around it (pensions, term life insurance, the household's true financial picture). The [emotional labour calculator](/emotional-labour-calculator) and [parental career sacrifice calculator](/career-sacrifice-calculator) cover the parts that compound over decades rather than weeks."
      ),
    ],
    faqs: [
      createFAQ(
        "How is this different from Salary.com's Mom Salary?",
        "Salary.com's annual survey applies broader job titles (CEO, psychologist, day care teacher) at higher hours, often producing figures over $180,000. This calculator uses a more conservative method: a realistic 80 to 100 hour week split across replacement-cost roles drawn from BLS occupational data. Both approaches are defensible; this one is harder to dismiss as marketing because it cites the source rates."
      ),
      createFAQ(
        "What about Social Security credits while I'm not working?",
        "You don't earn Social Security credits in years you don't work, and the formula uses your highest 35 years of earnings. So a 10-year career break with a few low-earning part-time years can shave hundreds of dollars per month off your eventual benefit. Some families address this with spousal benefits (which max out at 50% of the working spouse's amount), but spousal benefits don't accumulate the way personal benefits do."
      ),
      createFAQ(
        "Can I deduct any of this on my taxes?",
        "No. Unpaid household work is not income and isn't reported on a tax return, so there is nothing to deduct. The Child and Dependent Care Credit only applies if you actually pay someone else for childcare while you work or look for work, which doesn't apply to a parent providing the care directly. The 529 plan deduction (where applicable, varies by state) is the closest thing to a tax break tied to raising kids."
      ),
      createFAQ(
        "How much does daycare actually cost in major US cities?",
        "Infant centre care typically costs $1,200 to $2,500 per month, with New York City, San Francisco, Boston and DC at the top end. In-home nannies run $18 to $30 per hour plus payroll taxes, easily exceeding $50,000 per year for full-time care. After-school care for school-age children runs $400 to $1,000 per month. Child Care Aware publishes state-by-state averages each year and is the standard source."
      ),
      createFAQ(
        "Is the dollar figure useful for my partner conversation?",
        "Yes. The headline number is most useful as a starting point for two practical decisions: how much term life insurance to carry on the stay-at-home parent (replacement cost is the standard heuristic), and how to split retirement contributions so both partners are funding their later years. The result page has a copy-to-share button so you can drop the figure into a text without arguing the methodology."
      ),
    ],
    relatedTools: [
      { slug: "stay-at-home-mum-calculator", label: "Stay-at-Home Mum Salary Calculator (UK)" },
      { slug: "emotional-labour-calculator", label: "Emotional Labour Calculator" },
      { slug: "career-sacrifice-calculator", label: "Parental Career Sacrifice Calculator" },
    ],
  },

  "easter-egg-hunt-clue-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Match the Clue Difficulty to the Age",
        "Use picture clues and one-step rhymes for ages 3 to 5 (\"look where the cold things live\"), simple riddles with one piece of wordplay for 5 to 7 (\"in the room where we rest our heads, under the pillow you will find\"), proper riddles with a twist for 7 to 9, and cryptic clues with codes or maps for 9 to 12. Mixed-age hunts work best when the older child is given the role of clue-reader, so the younger ones still feel like they are solving it.",
        "Number the clues so each one points to where the next is hidden, ending at the egg pile. For 6 children doing a hunt with 8 clues, expect the whole thing to take 25 to 35 minutes including the chocolate-eating slowdown after they find the first egg or two. Print one master copy for yourself with the hiding spot for each clue listed, because in 20 minutes' time you will not remember whether the third clue was meant to be on the radiator or behind the kettle."
      ),
      createAnswerFirstSection(
        "Indoor vs Garden Hunts and Wet Weather Backups",
        "Indoor hunts work in any house but feel small after 8 to 10 hides; garden hunts feel epic but rely on the weather and you will lose at least one egg in the bushes (factor in 10% wastage when buying chocolate). The best version is hybrid: clues 1 to 5 inside leading the kids around the house, clues 6 to 10 in the garden ending at a basket. That way you have a wet-weather backup in the early clues and the kids still get the run-around-outside thrill at the end.",
        "If you are running a hunt for under-5s outside, hide foil-wrapped eggs above ground level only. Earwigs, slugs and damp grass turn unwrapped chocolate into something nobody wants to eat by the time it is found. For older kids, the parental cheat sheet matters more, not less; cryptic clues that you cannot remember solving yourself an hour later will derail the whole event."
      ),
      {
        heading: "Recommended Clue and Egg Counts by Group Size",
        table: {
          headers: ["Number of children", "Number of clues", "Eggs per child", "Total eggs"],
          rows: [
            ["1-2", "5-7", "10", "10-20"],
            ["3-4", "7-10", "8", "24-32"],
            ["5-8", "8-12", "6", "30-48"],
            ["9-15", "10-15", "5", "45-75"],
            ["16+", "12-15 (split into teams)", "4", "64+"],
          ],
        },
      },
      createAnswerFirstSection(
        "Five Things That Wreck a Hunt and How to Avoid Them",
        "First, hiding clues somewhere you have to move furniture to access (the clue ends up not being found at all). Second, using the same hiding pattern twice in a row, so kids guess every clue from then on. Third, putting all the eggs at the final destination so early clues feel like work with no reward. Fourth, leaving the parental cheat sheet in another room. Fifth, running it before breakfast (this tool comes with a small recommendation: feed everyone first, particularly any child under 7).",
        "If you have time for one extra touch, scatter a few \"decoy\" eggs along the route between clues so kids find chocolate as they go. It keeps the energy up and means the slowest reader is not bored. For a polished version with printable clue cards, a parent's hide-spot map and a finishing certificate, the premium PDF download has the lot. For the rest of the day, the [easter activity planner](/easter-activity-planner) and the [treasure hunt clue generator](/treasure-hunt-clue-generator) cover the time after the chocolate runs out."
      ),
    ],
    faqs: [
      createFAQ(
        "How many eggs should I buy per child?",
        "Plan on 5 to 10 small foil-wrapped eggs per child for the hunt itself, plus one larger Easter egg per child as the final prize. For a 6-child hunt, that is 30 to 60 small eggs and 6 large ones. Bulk bags of mini eggs work out cheapest. Always buy 10 to 20% more than you think you need; you will lose at least one in the garden and at least one will get stepped on."
      ),
      createFAQ(
        "Can I run an Easter egg hunt for a 2-year-old?",
        "Yes, but skip the clues entirely. For under-3s, just place 10 to 15 brightly coloured plastic eggs at toddler height (on the floor, on low chairs, just inside cupboards) and let them \"find\" them with you walking alongside. The fun is in the picking-up and the basket-filling, not the puzzle-solving. Foil-wrapped chocolate is fine from 18 months but supervise closely for choking risk."
      ),
      createFAQ(
        "What if it rains on Easter Sunday?",
        "Switch to indoor mode. A house can comfortably support a 10-clue hunt across a kitchen, living room, hallway and one bedroom. Use lots of small hiding spots (under cushions, inside shoes, behind books) rather than fewer big ones. Keep the energy up by playing music. If you have a garage or covered porch, hide one or two clues there to get them outdoors briefly without getting drenched."
      ),
      createFAQ(
        "How do I run a hunt for kids of mixed ages?",
        "Either give each age group its own coloured eggs (red for the oldest, blue for the middle, yellow for the toddler, with the rule that you only collect your own colour), or pair an older child with a younger one as a team. The first method works best for groups of 6+ children; the pairing method is better for siblings. Without a system, the older children will hoover up everything within 3 minutes."
      ),
      createFAQ(
        "Do I need to hide eggs at every clue or just at the end?",
        "Either works. Eggs at every clue keep the energy up and reward each find immediately, but they slow the hunt down. Eggs only at the end keeps momentum but risks the middle clues feeling like work. The sweet spot is one or two scattered eggs per clue stop plus a basket at the final clue, which gives instant payoff and a big finale. The premium PDF gives you printable clue cards and a parent's hide-spot map for both formats."
      ),
    ],
    relatedTools: [
      { slug: "easter-activity-planner", label: "Easter Activity Planner" },
      { slug: "treasure-hunt-clue-generator", label: "Treasure Hunt Clue Generator" },
      { slug: "scavenger-hunt-generator", label: "Scavenger Hunt Generator" },
    ],
  },
};
