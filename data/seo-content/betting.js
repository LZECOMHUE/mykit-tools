// SEO content for betting and odds tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const bettingSEO = {
  "matched-betting-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Matched Betting Actually Is",
        "Matched betting is a UK-specific arbitrage technique that extracts the value out of bookmaker free-bet promotions. You back a result with a high-street bookie (say, Bet365) and lay the same result on a betting exchange (Betfair, Smarkets or Betdaq), so the two bets cancel each other out. With a qualifying bet you usually lose a small amount; with a free bet you keep most of the bonus stake as a guaranteed return.",
        "It is not a betting system, a tipping service or a way to beat the bookies at sports prediction. The maths is fixed and the profit is locked in before the match kicks off. The catch is that bookmakers spot pattern-matching customers within weeks, so accounts get gubbed (limited or closed). Most people make a few thousand pounds during the welcome-offer phase, then the well runs dry."
      ),
      createAnswerFirstSection(
        "Choosing the Right Mode: Qualifying, SNR or SR",
        "The calculator has three modes because free bets are not all created equal. Use Normal mode for any qualifying bet placed with your own cash, this is the small loss you take to release the free bet. Use Free Bet SNR (Stake Not Returned) for the most common type of free bet, where the bookie keeps the stake and you only collect winnings if the back bet wins. Use Free Bet SR (Stake Returned) for rarer promotions where the stake is returned with any winnings, behaving more like cash.",
        "Picking the wrong mode is the single most common matched-betting error. An SR free bet calculated as SNR will tell you to lay too little, leaving you exposed to a real loss. Always check the bookmaker's terms and conditions before placing the bet. If the offer says 'bet £10 get £30 in free bets', those are almost certainly SNR."
      ),
      createAnswerFirstSection(
        "How Exchange Commission Eats Into the Profit",
        "Lay bets on a betting exchange are not free. The exchange takes a commission on net winnings: Betfair charges 5% as standard (sometimes 2% with their loyalty discount), Smarkets charges 2% flat and Betdaq sits at 2.5%. The calculator factors this in automatically so the lay stake is correct, but it changes which exchange is the smartest choice for any given offer.",
        "On a £20 free bet at typical odds, the difference between Betfair's 5% and Smarkets' 2% is roughly 30p of profit. That sounds trivial, but across 100 offers it adds up to £30 of pure margin lost. Most experienced matched bettors run accounts on at least two exchanges, then route each bet to whichever has the deepest liquidity at the closest available lay odds. The [odds converter](/odds-converter) and [betting odds calculator](/betting-odds-calculator) help you sense-check whether the lay price is reasonable before you click."
      ),
      createAnswerFirstSection(
        "Liability, Bankroll and Why You Need Float in Both Accounts",
        "The lay stake on the exchange is not the cash you actually need. Your liability is the amount you would owe the exchange if the back bet wins, calculated as lay stake times (lay odds minus 1). On a £100 lay at odds of 4.0, you need £300 sitting in your exchange account. Run out of liability and the bet does not get matched, leaving the bookie side completely unhedged.",
        "A reasonable starting bankroll for matched betting is around £200 split between bookie and exchange, which lets you cover most welcome-offer qualifying bets. Higher-odds events (long-shot horse bets, accumulator components) need significantly more float because the liability scales with the lay odds. Underestimating this is how beginners turn a guaranteed-profit hobby into a panic at the bank holiday weekend when nothing settles in time."
      ),
      {
        heading: "Worked Example: £25 Free Bet (SNR)",
        table: {
          headers: ["Input", "Value", "Notes"],
          rows: [
            ["Free bet stake", "£25", "Qualifies after a £10 cash bet"],
            ["Back odds", "4.0", "Bookmaker decimal odds"],
            ["Lay odds", "4.2", "Exchange asking price"],
            ["Commission", "5%", "Betfair standard rate"],
            ["Lay stake", "£18.16", "Calculated, not estimated"],
            ["Liability", "£58.13", "Cash needed in exchange"],
            ["Profit if back wins", "£17.25", "Same in either outcome"],
            ["Profit if lay wins", "£17.25", "True locked-in return"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is matched betting legal in the UK?",
        "Yes. Matched betting is fully legal in the UK and the profits are tax-free, because gambling winnings are not classed as taxable income by HMRC. It is not legal in the US for federal-tax purposes and the offer landscape in most other countries makes the technique impractical. This calculator is built around UK exchanges and UK bookmaker promotions."
      ),
      createFAQ(
        "How much money can you actually make from matched betting?",
        "Realistically, the welcome-offer phase across all UK bookmakers is worth £500 to £1,500 depending on how thoroughly you work through the list. Reload offers (existing-customer promotions) bring in another £100 to £300 a month for the first few months, then taper off as accounts get gubbed. Anyone promising guaranteed £1,000 a month long-term is selling you a course, not a real income."
      ),
      createFAQ(
        "What is account gubbing and how do I avoid it?",
        "Gubbing is when a bookmaker restricts your account so you can no longer claim promotions or place meaningful stakes. It is triggered by pattern recognition: round-number stakes, only ever betting on offers, never logging in for non-promotional bets. You can slow gubbing by mixing in occasional small recreational bets, varying stake sizes and avoiding the most heavily-arbed markets, but you cannot prevent it forever."
      ),
      createFAQ(
        "Why do my profits sometimes come out slightly different?",
        "Lay odds on the exchange shift in real time, sometimes by a tick or two between calculating and placing the bet. Most matched bettors accept a tolerance of around 1 to 2% of the back stake. If the lay price drifts further than that before you can place the bet, refresh the calculator with the new odds rather than locking in a worse return."
      ),
      createFAQ(
        "Can I use this for stake-not-returned bonuses on horse racing?",
        "Yes, the SNR mode works for any free bet where the stake is kept by the bookmaker. Horse racing markets often have wider lay-side spreads than football, so the effective return on a £25 free bet might be 70% rather than the 80%+ you can usually extract from a Premier League match. Check the lay liquidity at the exchange before placing the qualifier, otherwise you might find no one willing to take the other side at a fair price."
      ),
    ],
    relatedTools: [
      { slug: "betting-odds-calculator", label: "Betting Odds Calculator" },
      { slug: "accumulator-calculator", label: "Accumulator Calculator" },
      { slug: "odds-converter", label: "Odds Converter" },
    ],
  },

  "accumulator-calculator": {
    sections: [
      createAnswerFirstSection(
        "How an Accumulator Actually Works",
        "An accumulator (or 'acca') is a single bet made up of multiple selections, where the winnings from each leg roll over and become the stake for the next. A 4-fold acca with 2.0, 2.5, 3.0 and 4.0 odds turns a £10 stake into £600 if every leg comes in. Get one wrong and the entire bet loses, regardless of how many you got right.",
        "The maths is simple multiplication. Combined odds equal each leg's decimal odds multiplied together. Returns equal stake times combined odds. The dramatic payout potential is what makes accas popular on Saturday afternoons; the all-or-nothing risk is what makes them statistically a poor long-term bet for most punters."
      ),
      createAnswerFirstSection(
        "Marking Legs as Pending, Won or Lost",
        "Use the result selector on each leg as the matches finish. Switch a leg to 'won' to lock in its odds, or 'lost' to zero out the entire bet. The calculator updates in real time so you can watch a Saturday afternoon acca firm up between the 3pm kick-offs and the late-evening kick-off, or unwind it when one leg goes against you. This is more honest than waiting for the bookie to settle and gives you a running total in your hand throughout the afternoon.",
        "If a leg is void (postponed, abandoned, or a non-runner in horse racing), most bookmakers treat it as if it didn't exist and shorten the acca by one leg. The combined odds reduce, but the bet stays alive. Mark void legs as 'won' with their odds set to 1.0 to mimic this behaviour in the calculator."
      ),
      createAnswerFirstSection(
        "Rule 4 Deductions on Horse Racing Accas",
        "Rule 4 is a deduction applied to fixed-odds bets when a horse is withdrawn from a race after odds have been set. The deduction scales with the withdrawn horse's price: a 2/1 favourite withdrawing typically triggers a 30p in the pound deduction; a 33/1 outsider might trigger nothing at all. Rule 4 only applies to bets placed before the withdrawal, and it is applied to the winnings, not the stake.",
        "Toggle the Rule 4 option and enter the deduction percentage when you have a horse-racing leg affected. The calculator multiplies the combined odds by (1 minus deduction percent) to give a realistic settled return. This matters more than people think: a £20 acca with three horse legs and a 25% Rule 4 on one of them can lose £80 of expected profit before any results land."
      ),
      createAnswerFirstSection(
        "When Accumulators Are (and Aren't) a Good Bet",
        "Accumulators have terrible expected value for most punters because the bookmaker's margin compounds. If each leg has a 5% margin baked in, a 4-leg acca has roughly 18% margin against you, an 8-leg acca closer to 33%. That is the rough mathematical reason why bookies push accumulator promos every weekend; they know the long-run edge sits firmly with the house.",
        "Where they make sense is enhanced-acca offers (where the bookie pays out boosted odds), acca insurance promos (refund if one leg lets you down) and as a small fun stake on a Saturday. Treat them as entertainment, not a serious betting strategy. Use the [betting odds calculator](/betting-odds-calculator) to compare a 4-fold acca payout against placing four singles separately, and you will usually find the singles return more total profit on average."
      ),
      {
        heading: "Worked Example: 4-Fold Saturday Acca",
        table: {
          headers: ["Leg", "Selection", "Decimal Odds", "Status"],
          rows: [
            ["1", "Arsenal to win", "2.10", "Won"],
            ["2", "Man City over 2.5 goals", "1.80", "Won"],
            ["3", "Liverpool to win and BTTS", "3.20", "Won"],
            ["4", "Spurs to win", "2.50", "Pending"],
            ["Combined odds (live)", "30.24", "If Spurs win", ""],
            ["Stake", "£10", "Returns", "£302.40"],
            ["Profit if all 4 land", "£292.40", "", ""],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the maximum number of legs in an accumulator?",
        "Most UK bookmakers allow up to 20 selections in a single accumulator. Some operators (William Hill, Bet365) push this to 30 or more. The calculator supports up to 20 legs because anything beyond that has odds compounding so high that the chance of every leg winning becomes statistically negligible. Long-shot 20-leg accas with combined odds of 100,000/1 are essentially lottery tickets."
      ),
      createFAQ(
        "Can I have the same match twice in one accumulator?",
        "No. Bookmakers do not allow related contingencies in a single acca, so you cannot combine 'Arsenal to win' and 'Arsenal over 1.5 goals' in the same bet. The system will either reject the bet or settle it as a 'related contingency' bet at adjusted odds. If you want both, place them as separate bets, or use a 'bet builder' product where the bookmaker has pre-priced the combination."
      ),
      createFAQ(
        "How does each-way affect an accumulator?",
        "Each-way accas split your stake in half: one half goes on the win acca, the other on the place acca. To return the full each-way payout, every leg must win for the win acca and place for the place acca. Each-way accas are usually only available for horse racing or golf and are far less common than straight win accas. The standalone each-way calculator handles single-bet each-ways more cleanly."
      ),
      createFAQ(
        "What is acca insurance?",
        "Acca insurance is a promotion where the bookmaker refunds your stake (or returns it as a free bet) if all but one leg of your accumulator wins. Common offers refund up to £25 if one leg of a 5+ fold lets you down. Read the terms carefully: minimum number of legs, minimum odds per leg, and whether the refund is cash or a free bet (which has different value for matched-betting purposes)."
      ),
      createFAQ(
        "Should I cash out my accumulator?",
        "Cash out lets you settle a winning acca early at a reduced price, before the final leg has played. The bookmaker calculates a price that bakes in their estimate of the remaining leg's true odds, plus a margin for them. Mathematically, cash-out values are slightly worse than holding to the end on average, but they are useful psychologically when one leg is making you sweat. Compare the cash-out offer to the calculator's projected return before clicking."
      ),
    ],
    relatedTools: [
      { slug: "betting-odds-calculator", label: "Betting Odds Calculator" },
      { slug: "odds-converter", label: "Odds Converter" },
      { slug: "each-way-calculator", label: "Each Way Calculator" },
    ],
  },

  "betting-odds-calculator": {
    sections: [
      createAnswerFirstSection(
        "Decimal, Fractional or American: Which Format Is Which",
        "UK and Irish bookmakers traditionally use fractional odds (5/1, 11/4, evens), where the first number is potential profit and the second is the stake. Most European bookies and exchanges use decimal odds (6.0, 3.75, 2.0), where the number includes the stake; multiply your stake by the decimal odds to get total returns. American sportsbooks use moneyline odds: positive numbers (+500) show profit on a $100 stake; negative numbers (-150) show stake required to win $100.",
        "The three formats describe identical probabilities, just expressed differently. 5/1 fractional equals 6.0 decimal equals +500 American, all implying a 16.67% chance the bet wins. The calculator converts between all three so you can talk to a Cheltenham bookie in fractions, paste a Pinnacle line in decimals, and quote your American mate the same odds in moneyline without doing the maths in your head."
      ),
      createAnswerFirstSection(
        "What Implied Probability Tells You",
        "Implied probability is the percentage chance a bet would need to win for it to break even at the given odds. Decimal odds of 4.0 imply 25% probability (1 divided by 4). If you genuinely believe a horse has a 30% chance of winning and a bookie is offering 4.0 (25% implied), there is positive expected value. Bet only when your honest probability estimate is higher than the implied probability and you stand to make money long-term.",
        "Note that bookmaker odds always include their margin (the 'over-round'). A two-horse race priced at 1.85 and 1.85 implies probabilities of 54% each, totalling 108%; the extra 8% is the bookie's edge. Comparing odds across bookmakers using the [odds converter](/odds-converter) is a practical way to spot the sharpest price on any single market."
      ),
      createAnswerFirstSection(
        "Single Bets vs Each-Way: When Each-Way Pays",
        "An each-way bet is two bets in one: half your stake on the selection to win, half on it to place (typically top 2, 3 or 4 depending on the race or market). On a £10 each-way at 8/1 win, 1/4 odds for places, you stake £20 total. If the horse wins, you collect on both halves. If it places only, you lose the win bet but collect £10 plus £20 (1/4 of 8/1 on £10 stake) on the place portion.",
        "Each-way works best at longer odds (8/1 and above) where the place return alone covers the stake and turns a small profit. At short odds, each-way usually loses money even when the horse places, because the place fraction is too small to cover the lost win-side stake. Use the each-way mode in the calculator to see if a particular horse-and-race combo offers genuine value."
      ),
      createAnswerFirstSection(
        "Comparing Three Bookmakers Side by Side",
        "Best-odds shopping is the single highest-EV thing a casual punter can do. The same Premier League match might be priced 2.10 with one bookie, 2.20 with another, 2.05 with a third. On a £20 stake the difference between 2.10 and 2.20 is £2 of pure profit; over a season of 100 bets that is £200 you handed back to a sharper alternative bookmaker.",
        "Use the calculator to enter the same bet at different prices and see the return delta. Three or four mainstream UK accounts (one each from a high-street brand, a soft-book like Bet365 or William Hill, plus a sharper price source like Pinnacle or an exchange) will routinely beat a single-account approach by 3 to 5% over a year. Just bear in mind that pattern-matching across multiple accounts may speed up gubbing on the soft books."
      ),
    ],
    faqs: [
      createFAQ(
        "What does 'evens' mean in fractional odds?",
        "Evens (sometimes written as 'EVS' on a betting slip) means 1/1 odds. A £10 stake returns £20: your original tenner back plus £10 profit. In decimal it is 2.0, in American it is +100, and the implied probability is exactly 50%. Anything shorter than evens is an 'odds-on' selection (favourite), anything longer is 'odds-against' (underdog)."
      ),
      createFAQ(
        "How do I work out winnings from fractional odds?",
        "Multiply your stake by the first number, then divide by the second. A £20 bet at 7/2 odds returns £20 times 7 divided by 2, which equals £70 profit, plus your £20 stake back, for a total return of £90. The calculator does this automatically and converts to decimal and American so you can sense-check against the bookie's actual settlement."
      ),
      createFAQ(
        "Why do US sportsbooks use plus and minus signs?",
        "American odds split the world into favourites (negative) and underdogs (positive). Positive numbers show profit on a $100 stake (+200 means $100 wins $200). Negative numbers show stake required to win $100 (-150 means you bet $150 to win $100). The format makes line-shopping faster for someone used to it, but it is mathematically identical to decimal once you do the conversion."
      ),
      createFAQ(
        "Are higher decimal odds always better?",
        "Higher decimal odds give a bigger payout if the bet wins, but they also imply a lower probability of winning. A 10.0 decimal price (9/1) means the bookmaker thinks the bet has roughly a 10% chance, so nine times out of ten you lose your stake. The 'best' odds are simply the longest available across multiple bookmakers for the bet you actually want to place; never bet a price just because it looks high."
      ),
      createFAQ(
        "What is a 'push' in betting?",
        "A push is when a bet ties exactly with the line, so the stake is returned with no profit or loss. Common in handicap markets where the line is set at a whole number (e.g. Liverpool -2.0 and the match ends 3-1, exactly two goals); spread bets and Asian handicaps can also push. UK bookmakers usually call this a 'void bet' rather than a push, but the settlement is the same: stake back, no winnings."
      ),
    ],
    relatedTools: [
      { slug: "odds-converter", label: "Odds Converter" },
      { slug: "accumulator-calculator", label: "Accumulator Calculator" },
      { slug: "each-way-calculator", label: "Each Way Calculator" },
    ],
  },

  "odds-converter": {
    sections: [
      createAnswerFirstSection(
        "Why You Need to Convert Between Odds Formats",
        "Sportsbooks around the world quote prices in three different formats. A UK Saturday-afternoon bookie will write 5/1 on his board; the same horse on Pinnacle is shown as 6.00; the same line on a US sportsbook reads +500. They all describe identical probabilities, but the eye gets used to one and stumbles over the others. The converter takes any of the three as input and shows the other two instantly, plus the implied probability and the return on a £10 stake.",
        "This matters when shopping around multiple bookmakers, when discussing a tip with someone who uses a different format, or when reading betting analysis written for a US, European or UK audience. Three taps in the converter is faster than doing the maths in your head and removes the off-by-one mistakes that creep in around the evens line (where decimal and American both flip sign and direction)."
      ),
      createAnswerFirstSection(
        "How the Conversions Actually Work",
        "Decimal to fractional: subtract 1 from decimal, then express as a clean fraction. 3.5 decimal becomes 2.5/1, simplified to 5/2. Decimal to American: if decimal is 2.0 or higher, multiply (decimal minus 1) by 100 and prefix with plus. If lower than 2.0, divide -100 by (decimal minus 1). 1.5 decimal becomes -200 American; 4.0 decimal becomes +300 American.",
        "Implied probability is the cleanest sense-check across formats: 1 divided by decimal odds. A bet at 4.0 has 25% implied probability. At 3/1 fractional, same probability. At +300 American, same probability. If your honest estimate of the actual chance the bet wins is higher than the implied probability, it is a value bet; if lower, the bookmaker has the edge and you should pass."
      ),
      createAnswerFirstSection(
        "Common Odds Reference Points",
        "A few benchmarks worth memorising: evens (1/1, 2.0, +100) means 50% probability and equal profit to stake. Hot favourite (1/4, 1.25, -400) means 80% probability; rare in singles, common in heavy-favourite tennis or football lines. Long shot (10/1, 11.0, +1000) means 9% probability; classic Cheltenham handicap or outright market price. True outsider (50/1, 51.0, +5000) means 2% probability; lottery-territory.",
        "Knowing these intuitively turns the converter into a sense-check rather than a calculator. If a bookie is offering 33/1 on something you reckon is a 1-in-10 shot, that is a value bet. If they are offering 5/4 on something you think is genuinely 50/50, you are paying their margin. The [accumulator calculator](/accumulator-calculator) and [betting odds calculator](/betting-odds-calculator) both use the same odds engine, so anything you sense-check here flows through cleanly to combined-bet maths."
      ),
      createAnswerFirstSection(
        "Edge Cases: Evens, Decimals Below 2.0, and Negative American",
        "Evens is a special case because it is the boundary between odds-on and odds-against. Decimal 2.0 = fractional 1/1 = American +100 = 50% probability. Anything below decimal 2.0 (like 1.5) is odds-on, where the stake is more than the potential profit; in American this flips to a negative number. Anything above decimal 2.0 is odds-against, with profit larger than stake; American switches to a positive number.",
        "Be careful with very short odds (1.05, 1.10) common in heavy-favourite betting. The fractional reads as 1/20 or 1/10 and the American reads as -2000 or -1000, both ugly. The numbers look strange but the implied probabilities (95%, 91%) are intuitive. The reverse is also true: very long shots (101.0 decimal) read as 100/1 fractional or +10000 American. Both are mathematically fine but psychologically dramatic."
      ),
      {
        heading: "Quick Reference Conversion Table",
        table: {
          headers: ["Decimal", "Fractional", "American", "Implied %", "Return on £10"],
          rows: [
            ["1.50", "1/2", "-200", "66.67%", "£15.00"],
            ["1.91", "10/11", "-110", "52.36%", "£19.10"],
            ["2.00", "Evens (1/1)", "+100", "50.00%", "£20.00"],
            ["2.50", "3/2", "+150", "40.00%", "£25.00"],
            ["3.00", "2/1", "+200", "33.33%", "£30.00"],
            ["5.00", "4/1", "+400", "20.00%", "£50.00"],
            ["11.00", "10/1", "+1000", "9.09%", "£110.00"],
            ["26.00", "25/1", "+2500", "3.85%", "£260.00"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why do UK bookies still use fractional odds?",
        "Tradition more than anything. Fractional odds were the standard in British horse racing for over a century and survived the digital transition because punters were used to them. Online UK bookies typically let you toggle the display to decimal, which most professional bettors prefer because it is easier to multiply for accumulators and compare across markets."
      ),
      createFAQ(
        "Are decimal odds more accurate than fractional?",
        "Both express the same information, so neither is more accurate. Decimal is more precise when prices fall between common fractions (3.45 decimal cannot be cleanly rendered fractionally). Fractional looks cleaner for round odds (5/1, 10/1, evens). Most professionals and exchanges use decimal because it makes maths trivial; most high-street UK punters still prefer fractional because they grew up with it."
      ),
      createFAQ(
        "What does -110 in American odds mean?",
        "It means you stake $110 to win $100. -110 is the standard line for spread and total bets in American sports because it bakes in the bookie's typical 4.5% margin (called 'juice' or 'vig'). In decimal it is 1.91. Two -110 sides on the same market sum to 109% implied probability, with the extra 9% being the bookmaker's edge."
      ),
      createFAQ(
        "How do I convert my own probability estimate to decimal odds?",
        "Divide 100 by your probability percentage. If you reckon a horse has a 25% chance of winning, fair odds are 100 / 25 = 4.0 decimal (3/1 fractional, +300 American). If a bookie is offering longer than this, you have a value bet; shorter, and they have the edge. This is the core mathematical idea behind every value-betting system, including matched betting and proper sports modelling."
      ),
    ],
    relatedTools: [
      { slug: "betting-odds-calculator", label: "Betting Odds Calculator" },
      { slug: "accumulator-calculator", label: "Accumulator Calculator" },
      { slug: "matched-betting-calculator", label: "Matched Betting Calculator" },
    ],
  },

  "uk-lotto-number-picker": {
    sections: [
      createAnswerFirstSection(
        "How the UK National Lottery Lotto Game Works",
        "Lotto draws 6 main balls and 1 bonus ball from a pool of 1 to 59. To win the jackpot, all 6 of your main numbers must match the 6 main balls drawn. The bonus ball only matters for the second-tier prize (5 main numbers plus the bonus). Draws happen Wednesday and Saturday evenings, with tickets costing £2 per line and the minimum jackpot starting at £2 million.",
        "The picker generates 6 main numbers from 1 to 59 with an animated reveal, mimicking the feel of watching the actual draw. There is no bonus ball generator; the bonus is drawn from leftover numbers in the official draw, not picked separately. You can generate up to 5 lines at once for a full play slip and save the history if you want to keep using the same numbers week to week."
      ),
      createAnswerFirstSection(
        "The Brutal Truth About Lotto Odds",
        "The odds of matching all 6 main numbers are 1 in 45,057,474. To put that in human terms: you are roughly 70 times more likely to be struck by lightning in a given year than to win the Lotto jackpot from a single ticket. Match 5 plus the bonus (the second-tier prize) is 1 in 7.5 million; match 5 main is 1 in 144,000. Even the small £30 prize for matching 4 numbers comes round only once every 2,180 lines.",
        "This picker is for entertainment, not strategy. There is no number-selection method, lucky-number system or 'frequency analysis' that improves your odds; every draw is independent and every combination has identical 1-in-45-million probability. If you want a serious look at the maths, the [lottery odds comparison](/lottery-odds-comparison) tool shows the chances side by side across UK Lotto, EuroMillions, Thunderball and Set for Life so you can see exactly how unlikely each jackpot really is."
      ),
      createAnswerFirstSection(
        "Should You Pick Random or Choose Your Own Numbers?",
        "The expected value is identical either way; the picker exists because random selection avoids the 'birthday clustering' problem that bites people who pick their own. If your six numbers are all 31 or below (because you used family birthdays), and the jackpot is shared because someone else did the same, your share is smaller than it would have been with a random spread.",
        "A good random pick gives you numbers spread across the 1 to 59 range, including some over 31. The picker does this automatically. If you do prefer your own numbers, do not pick the same six everyone else picks: 7, 11, 13, 21, 27 and 49 appear on more lottery slips than statistical chance would predict, so jackpots are split more often when those numbers come up."
      ),
      createAnswerFirstSection(
        "What 'Quick Pick' and Multi-Line Generation Are For",
        "Generating 5 lines at once gives you a £10 play slip's worth of numbers in two seconds. Useful for syndicates where the organiser doesn't want to think about it, for last-minute Wednesday-evening Camelot app entries, or for anyone who likes the feel of having multiple lines without doing five separate generates. The history feature saves your last 20 sets so you can compare against the actual draw on a Wednesday or Saturday night.",
        "Just remember that 5 lines costs £10 per draw and gives you 5 chances out of 45 million. Buying more lines does linearly improve your odds (5 lines is 5 times better than 1), but 5 in 45 million is still effectively zero. Spend what you can lose without noticing, treat any prize as a windfall, and never let lotto play become a 'strategy' in your finances."
      ),
    ],
    faqs: [
      createFAQ(
        "How much does a UK Lotto ticket cost?",
        "A single line costs £2 since the price increase in October 2013. Before that it was £1 per line. Most players buy multiple lines per draw, so a typical play slip is £4 or £6. You can pay for up to 7 draws ahead via Direct Debit on the National Lottery website, which works out to £14 per week if you play one line each Wednesday and Saturday."
      ),
      createFAQ(
        "What happens if no one wins the jackpot?",
        "The jackpot rolls over to the next draw and grows. Lotto has a rollover cap, after which the jackpot must be won (a 'Must Be Won' draw); if no one matches all 6, the prize money cascades down to the next-highest tier with at least one winner. Rollovers can push the jackpot past £20 million on rare occasions, which is when ticket sales and number-picker traffic both spike sharply."
      ),
      createFAQ(
        "Are the numbers truly random?",
        "Yes. The picker uses the browser's built-in cryptographic random number generator (crypto.getRandomValues), which is the same source used by browsers for security tokens. Each ball is drawn without replacement, so you never get duplicate numbers in a single line. The animated reveal is for show; the numbers are determined the instant you click 'Generate'."
      ),
      createFAQ(
        "Can I save my favourite numbers for next week?",
        "The picker keeps a session history of your last 20 generated lines, but it does not store anything to your account. If you have a set of numbers you genuinely want to play every week (despite the maths), write them down or set them as a recurring entry on the National Lottery app. The picker is a fresh-roll-every-time tool, not a long-term tracking system."
      ),
      createFAQ(
        "Are some numbers drawn more often than others?",
        "Over the long run, no. The draw machine is mechanical and physically random. Some numbers do appear marginally more often in any given period (number 23 is currently among the most-drawn in UK Lotto history), but this is statistical noise, not a pattern that predicts future draws. Picking 'overdue' or 'hot' numbers does not improve your odds; the lottery has no memory."
      ),
    ],
    relatedTools: [
      { slug: "euromillions-number-picker", label: "EuroMillions Number Picker" },
      { slug: "thunderball-number-picker", label: "Thunderball Number Picker" },
      { slug: "lottery-odds-comparison", label: "Lottery Odds Comparison" },
    ],
  },

  "euromillions-number-picker": {
    sections: [
      createAnswerFirstSection(
        "How EuroMillions Works",
        "EuroMillions is a multi-country lottery played in the UK, France, Spain, Portugal, Ireland, Belgium, Switzerland, Luxembourg and Austria. You pick 5 main numbers from 1 to 50 plus 2 Lucky Stars from 1 to 12. To win the jackpot, all 7 numbers must match. Draws happen Tuesday and Friday evenings, with UK ticket prices of £2.50 per line. Jackpots start at around £14 million and can roll up to a hard cap of approximately £230 million.",
        "The picker generates 5 main numbers (1 to 50) and 2 Lucky Stars (1 to 12) with separate animated reveals, mimicking the official draw machine's two-stage process. It can generate multiple lines at once for full play slips, and stores the last 20 generated sets in the session history."
      ),
      createAnswerFirstSection(
        "The Odds Are Worse Than UK Lotto",
        "EuroMillions jackpot odds are 1 in 139,838,160, which is roughly 3 times worse than UK Lotto's 1 in 45 million. The bigger jackpots reflect this: the prize fund is shared across nine countries, so even a 'small' rollover quickly grows past £100 million. Match 5 + 1 Lucky Star is 1 in 6.99 million, match 5 + 0 Stars is 1 in 3.11 million. The smallest prize (match 2 main numbers only) is 1 in 22 and pays around £3 to £4.",
        "The bigger the jackpot, the more tickets are sold, so the bigger the jackpot must be to compensate for the higher chance of multiple winners splitting the pot. A £200 million EuroMillions roll-up routinely sells more tickets in the UK alone than a normal Lotto draw sells across its full week. The [lottery odds comparison](/lottery-odds-comparison) tool puts these numbers in context against the Powerball, Mega Millions, Thunderball and Set for Life."
      ),
      createAnswerFirstSection(
        "What 'Lucky Stars' Actually Are",
        "Lucky Stars are a second pool of numbers (1 to 12) drawn alongside the main 5. You pick 2 Lucky Stars per line, and they are separate from the main 50-number pool. This two-pool structure is similar to the Powerball and Mega Millions in the US, and it is what creates the very long jackpot odds despite the relatively small individual pool sizes.",
        "Match 2 main numbers and 1 Lucky Star pays around £4. Match 4 main and 2 Lucky Stars pays around £150. Match 5 main and 2 Lucky Stars is the jackpot. Lucky Stars are drawn without replacement from the pool of 12, so you cannot have the same Lucky Star twice in a single line. The picker handles this automatically."
      ),
      createAnswerFirstSection(
        "UK Millionaire Maker and How It Differs from the Main Game",
        "Every UK EuroMillions ticket has a unique Millionaire Maker code printed on it (a mix of letters and numbers like 'XXXX-12345'). One UK player wins £1 million in a separate raffle every Tuesday and Friday draw, regardless of whether they match any main numbers. The code is generated automatically when you buy a ticket; there is nothing to pick, no input required from you.",
        "The Millionaire Maker is a UK-only top-up that came in to keep British player numbers high after EuroMillions raised the main-game jackpot odds. Your odds of winning depend on the total UK ticket sales for that draw; on a normal week with around 8 million UK tickets, the odds are roughly 1 in 8 million per ticket. Significantly better than the main jackpot, though still firmly lottery-territory."
      ),
    ],
    faqs: [
      createFAQ(
        "How much is a EuroMillions ticket in the UK?",
        "A single line costs £2.50 in the UK. The same draw costs €2.50 in France, Spain and other European member countries. The price increased from £2.00 in November 2016. Most players buy 2 to 4 lines per draw, so a typical play slip is £5 to £10. There are no discounts for buying multiple lines."
      ),
      createFAQ(
        "What happens to the jackpot when it hits the cap?",
        "When the EuroMillions jackpot hits its hard cap (approximately £230 million), any further rollovers cascade down to the next-highest prize tier. This makes the secondary tiers temporarily much larger than usual, which is why 'Must-be-Won' EuroMillions draws often produce news stories about a £100,000+ Match 4 + 1 Lucky Star prize that would normally pay £150. The cap was introduced to stop runaway jackpots that swallow ticket sales from across Europe."
      ),
      createFAQ(
        "Is EuroMillions tax-free in the UK?",
        "Yes. UK lottery winnings (including EuroMillions) are completely tax-free. HMRC does not tax gambling winnings of any kind. However, if you put the winnings in a savings account, the interest is taxable, and any gifts to family members may have inheritance tax implications later if you die within seven years. Take proper financial advice before doing anything dramatic with a major win."
      ),
      createFAQ(
        "Can I play EuroMillions if I do not live in a member country?",
        "Officially, no. You must buy tickets from a licensed retailer in one of the nine member countries, and prizes can only be claimed by holders of valid tickets. Some online lottery agents (like theLotter) will buy tickets on your behalf for a markup, but this is a third-party service and not the same as playing directly. UK residents can play through the National Lottery website, app or any high-street retailer."
      ),
      createFAQ(
        "What is a 'EuroMillions Plus' or 'HotPicks'?",
        "EuroMillions HotPicks is a separate UK-only side game where you pick 1 to 5 numbers from the same EuroMillions main draw. You bet that those numbers will all be drawn (in any order). The odds are better than the main game because there are no Lucky Stars to match, but the prizes are smaller and capped. HotPicks is a separate £1.50 ticket from the main £2.50 EuroMillions entry."
      ),
    ],
    relatedTools: [
      { slug: "uk-lotto-number-picker", label: "UK Lotto Number Picker" },
      { slug: "thunderball-number-picker", label: "Thunderball Number Picker" },
      { slug: "lottery-odds-comparison", label: "Lottery Odds Comparison" },
    ],
  },

  "thunderball-number-picker": {
    sections: [
      createAnswerFirstSection(
        "How Thunderball Works",
        "Thunderball is a UK National Lottery game with significantly better jackpot odds than Lotto or EuroMillions. You pick 5 main numbers from 1 to 39 plus 1 Thunderball from a separate pool of 1 to 14. Match all 5 main numbers and the Thunderball to win the jackpot of £500,000 (a fixed prize, not a roll-up). Draws happen Tuesday, Wednesday, Friday and Saturday evenings; tickets cost £1 per line.",
        "The picker generates 5 main numbers (1 to 39) and 1 Thunderball (1 to 14) with animated reveals. The jackpot odds are 1 in 8,060,598, which is around 5 times better than UK Lotto and 17 times better than EuroMillions. The trade-off is that the top prize is fixed at £500,000 and there is no jackpot roll-up; rollovers cascade down to lower-tier prizes instead."
      ),
      createAnswerFirstSection(
        "Why Thunderball Has the Best Odds of Any UK Lottery",
        "Thunderball's smaller pools (39 and 14, vs Lotto's single 59 pool) make every line dramatically more likely to match. Matching just the Thunderball alone (no main numbers) pays £3 and has odds of 1 in 29; matching 1 main number plus the Thunderball pays £5 at odds of 1 in 35. Even the second-tier prize (5 main numbers, no Thunderball) is 1 in 620,000, which is significantly better than the third-tier prize on Lotto.",
        "If you want the best chance of winning anything at all, Thunderball beats every other UK national game. Roughly 1 in every 13 tickets wins something, even if only the £3 base prize. The trade-off is that the £500,000 jackpot is fixed and modest by lottery standards; if a £20 million dream is what you are after, EuroMillions or a Lotto rollover is the right tool. The [lottery odds comparison](/lottery-odds-comparison) lays this out side by side."
      ),
      createAnswerFirstSection(
        "Why £500,000 Is a Fixed Cap",
        "Thunderball was designed as a frequent-prize game, not a roll-up jackpot game. The £500,000 jackpot is paid as a fixed prize from the prize pool; if multiple players match all 6, they each get £500,000 (the prize is not split). If no one wins the jackpot, the unallocated prize money cascades down to lower tiers, making secondary prizes briefly larger than usual.",
        "This fixed-prize structure means Thunderball will never produce a £100 million news story, but it also means more frequent winners and a more predictable expected return. For someone who plays for the gentle thrill of a possible £500,000 (life-changing but not surreal), Thunderball offers significantly better value than Lotto's roll-up structure."
      ),
      createAnswerFirstSection(
        "Quick Picks vs Number Picking for Thunderball",
        "Thunderball has the same 'birthday clustering' issue as other lotteries. People pick numbers under 31 for main numbers (because of dates) and avoid the 'less lucky' end of the Thunderball pool, leaving the larger numbers underused. A truly random pick spreads your numbers across the full 1 to 39 main range and the 1 to 14 Thunderball range, which slightly reduces the chance of sharing a £500,000 jackpot if you do happen to match.",
        "More importantly, Thunderball's 4-times-a-week draw schedule makes it easy to set up a small auto-play habit on the National Lottery app. Two lines per draw at £1 each is £8 per week. That is not nothing, but it is also not far from what a regular player might already spend on lottery tickets across all games combined. The picker runs unlimited generates per visit, so it is easy to refresh until you find a line you like."
      ),
    ],
    faqs: [
      createFAQ(
        "How much is a Thunderball ticket?",
        "£1 per line, the cheapest UK National Lottery game. This price has been stable since 2010 (originally £1 since launch in 1999). Most players buy 4 to 8 lines per draw because the odds, while better than Lotto, are still long enough that single-line wins are rare. There are no multi-line discounts."
      ),
      createFAQ(
        "Can I play Thunderball every day?",
        "There are 4 Thunderball draws per week: Tuesday, Wednesday, Friday and Saturday. Tickets are sold up to 7 draws ahead, so you can pre-pay for two weeks of lines if you want to. The National Lottery app supports auto-play, which automatically enters the same numbers in every draw until you cancel it."
      ),
      createFAQ(
        "What are the smallest Thunderball prizes?",
        "Match 0 main numbers and just the Thunderball pays £3 (odds 1 in 29). Match 1 main number and the Thunderball pays £5 (1 in 35). Match 2 main and the Thunderball pays £10 (1 in 111). The frequency of these small prizes is what makes Thunderball feel friendlier than Lotto, even though no individual prize is large."
      ),
      createFAQ(
        "Has anyone ever won Thunderball multiple times?",
        "Yes, but rarely. Several UK Thunderball jackpots have been won by syndicates (where one ticket-buyer plays for a group). Individual repeat winners are statistically vanishingly unlikely; with 1-in-8-million odds, even a player buying 100 lines a week for 30 years is more likely to win zero jackpots than one. Treat any single match as a one-in-a-lifetime event."
      ),
      createFAQ(
        "Is the Thunderball drawn from the same pool as the main numbers?",
        "No, the Thunderball is drawn from a completely separate pool of 14 balls (1 to 14). This is why it can occasionally match one of your main numbers (if, say, you picked 7 as a main number and the Thunderball comes out as 7, both would count for prize purposes if you matched them in their respective pools). The picker handles the two pools as separate, so you cannot end up with a duplicate within either pool."
      ),
    ],
    relatedTools: [
      { slug: "uk-lotto-number-picker", label: "UK Lotto Number Picker" },
      { slug: "euromillions-number-picker", label: "EuroMillions Number Picker" },
      { slug: "set-for-life-number-picker", label: "Set for Life Number Picker" },
    ],
  },

  "mega-millions-number-picker": {
    sections: [
      createAnswerFirstSection(
        "How US Mega Millions Works",
        "Mega Millions is a US multi-state lottery sold in 47 states (all except Alabama, Alaska and Nevada) plus DC and the US Virgin Islands. You pick 5 main numbers from 1 to 70 plus 1 Mega Ball from a separate pool of 1 to 25. Match all 6 to win the jackpot, which starts at $20 million and rolls until won. Draws happen Tuesday and Friday evenings (US time) with $2 tickets, or $5 with the Megaplier add-on that multiplies non-jackpot prizes.",
        "The picker generates 5 main numbers (1 to 70) and 1 Mega Ball (1 to 25) with animated reveals. The jackpot odds are 1 in 302,575,350, which is among the longest of any major world lottery. Tickets are sold to legal US residents only; if you are visiting from overseas, you can buy in person at any participating retailer in a Mega Millions state."
      ),
      createAnswerFirstSection(
        "Why Mega Millions Jackpots Get Absurdly Large",
        "The jackpot has hit record territory multiple times in the past decade, with the all-time high passing $1.6 billion in October 2018. The structure that produces these numbers is straightforward: a 1-in-302-million jackpot probability means most draws have no jackpot winner, so the prize rolls. Each rollover increases ticket sales (because of news coverage), which increases the prize fund, which extends the streak.",
        "By the time Mega Millions hits $1 billion, it has typically gone 30+ draws without a winner and is selling 5 to 10 times its normal volume. The marginal expected value at that point is actually slightly positive in pure dollar terms, but the practical reality of taxes (federal plus state withholding can take 40%+) and the lump-sum vs annuity choice (the cash option is roughly half the headline jackpot) usually wipe that edge out. The [lottery odds comparison](/lottery-odds-comparison) shows Mega Millions side by side with Powerball and EuroMillions."
      ),
      createAnswerFirstSection(
        "The Megaplier and What It Actually Costs You",
        "For an extra $1 per line ($3 total), you can add the Megaplier feature. This randomly multiplies any non-jackpot prize by 2x, 3x, 4x or 5x. It does not affect the jackpot. The Megaplier value is drawn separately, with weighted probability: 5x is rarer than 2x.",
        "From a pure expected-value perspective, the Megaplier is roughly fair value but does not improve your edge against the house. It is most worth it if you are buying for prizes in the $500 to $5,000 range (where 5x can turn a useful prize into a meaningfully larger one). For jackpot-only chasers, the extra dollar is wasted money."
      ),
      createAnswerFirstSection(
        "October 2017 Format Change and Why It Matters",
        "Mega Millions changed its number format in October 2017. The main pool went from 1 to 75 down to 1 to 70, while the Mega Ball pool went from 1 to 15 up to 1 to 25. The result was much longer jackpot odds (from 1 in 259 million to 1 in 302 million), but better odds on the smaller prizes. This change is why historical statistics from before October 2017 are not directly comparable to current draws.",
        "If you see frequency-analysis lottery sites quoting 'most-drawn Mega Millions numbers since 2002', remember that any number above 70 in their main-ball stats is from before the format change and is no longer in the pool. The picker uses the current 1-to-70 main and 1-to-25 Mega Ball ranges, so the lines it produces are valid for any current draw."
      ),
    ],
    faqs: [
      createFAQ(
        "Can UK or European players buy Mega Millions tickets?",
        "Not directly. Mega Millions tickets must be purchased in person at a licensed US retailer, and the prize claim requires you to physically present the winning ticket within a US state. Some lottery courier services (Jackpot.com, theLotter) will buy tickets on your behalf for a markup, holding the physical ticket on your behalf and arranging prize claim if you win. This is legal but adds 25 to 40% to ticket prices."
      ),
      createFAQ(
        "What is the lump-sum cash option vs the annuity?",
        "Mega Millions winners can choose between an annuity (paid as 30 graduated annual payments over 29 years) or a lump-sum cash option (paid immediately). The lump-sum is typically about 60 to 65% of the headline jackpot, because the lottery commission would otherwise need to invest a smaller amount and pay out the larger figure over time. Most winners take the lump sum despite the headline reduction, because federal and state taxes apply either way and immediate access is more flexible."
      ),
      createFAQ(
        "How much tax is taken from a Mega Millions win?",
        "US federal tax is automatically withheld at 24% on prizes over $5,000, but the actual top rate is 37%, so most jackpot winners owe additional tax at filing time. State taxes vary: California, Florida, Texas, Washington, Wyoming and a few others have no state lottery tax; New York charges 8.82%. The combined federal-plus-state can take 40% to 47% of the headline jackpot. International winners face additional withholding under tax treaty rules."
      ),
      createFAQ(
        "What happens if multiple people win the jackpot?",
        "The jackpot is split equally among all winning tickets. This has happened multiple times, including the famous 2016 Powerball $1.586 billion jackpot which was split three ways. With Mega Millions, a $400 million jackpot split among two winners means each receives $200 million in headline prize money (or the lump-sum cash equivalent of that share). Smaller prizes are not split; they are paid in full to every matching ticket."
      ),
      createFAQ(
        "Is the Mega Ball drawn from the same pool as the main numbers?",
        "No. Mega Ball is drawn from a separate pool of 25 balls (1 to 25), unrelated to the main 1-to-70 pool. This means the Mega Ball can be the same number as one of the main balls (e.g. main numbers 5, 10, 22, 31, 47 plus Mega Ball 22 is a perfectly valid combination)."
      ),
    ],
    relatedTools: [
      { slug: "euromillions-number-picker", label: "EuroMillions Number Picker" },
      { slug: "uk-lotto-number-picker", label: "UK Lotto Number Picker" },
      { slug: "lottery-odds-comparison", label: "Lottery Odds Comparison" },
    ],
  },

  "lottery-odds-comparison": {
    sections: [
      createAnswerFirstSection(
        "Which Lottery Has the Best Jackpot Odds?",
        "Of the major UK draws, Thunderball has the kindest jackpot odds at 1 in 8,060,598, followed by Set For Life at 1 in 15,339,390. The UK Lotto sits at 1 in 45,057,474, and EuroMillions is the longest of the four at 1 in 139,838,160. The pattern across every country is the same: the smaller the matrix of numbers, the friendlier the odds, but also the smaller the headline jackpot.",
        "If you are picking a lottery purely for the best mathematical chance of winning anything substantial, Irish Lotto comes out top among the European games at 1 in 10,737,573. The US Powerball, with its 1 in 292,201,338 jackpot odds, is one of the worst on the planet for sheer probability, even though the rolling jackpots can pass a billion dollars. The Italian SuperEnalotto is the worst major lottery on the comparison at 1 in 622,614,630."
      ),
      createAnswerFirstSection(
        "Expected Value: Why You Lose on Average",
        "Every regulated lottery is mathematically engineered to return less in prize money than it takes in ticket revenue. The expected value (EV) figure shown for each draw represents the average loss per pound spent. UK Lotto sits at roughly -0.65, meaning every £2 ticket returns about 70p in expected prize value over a long enough run. Set For Life is the gentlest UK draw at -0.52, EuroMillions the steepest at -0.68.",
        "House edge varies between 48% and 71% across the lotteries in this comparison. To put that in context, a slot machine in a UK casino typically has a house edge of around 5%, and a roulette wheel sits between 2.7% and 5.26%. Lotteries are by far the worst-value gambling product the average punter ever buys. Treat ticket spend as entertainment money, not investment, and never chase losses by buying more tickets."
      ),
      {
        heading: "UK Lottery Odds at a Glance",
        table: {
          headers: ["Game", "Jackpot Odds", "Ticket Price", "Typical Jackpot"],
          rows: [
            ["Thunderball", "1 in 8,060,598", "£1.00", "£500K - £5M"],
            ["Set For Life", "1 in 15,339,390", "£1.50", "£10K/month for 30 years"],
            ["UK Lotto", "1 in 45,057,474", "£2.00", "£2M - £20M"],
            ["EuroMillions", "1 in 139,838,160", "£2.50", "£15M - £100M+"],
          ],
        },
      },
      createAnswerFirstSection(
        "Reading the Odds Like a Statistician",
        "Buying two UK Lotto tickets a week for fifty years gives you a cumulative chance of winning the jackpot of roughly 0.012%. That is statistically indistinguishable from never playing at all. You are about 90 times more likely to be struck by lightning in any given year (1 in 500,000) than you are to win the EuroMillions jackpot from a single ticket (1 in 139.8 million). Even the friendliest UK draw, Thunderball, would on average require buying 8 million tickets to expect one jackpot win.",
        "The honest framing is that the jackpot is a near-impossibility you are buying a small slice of for entertainment. The minor prize tiers (3 numbers, 4 numbers) hit much more often, but the prizes are usually £30 or less, which barely dents the cost of regular play. If you must play, set a strict weekly cap (£5 to £10 is sensible) and understand that the long-term expected outcome is a slow steady loss. Compare this with a low-cost index fund where the expected long-term return is positive, and the gap becomes obvious."
      ),
    ],
    faqs: [
      createFAQ(
        "Which UK lottery has the best chance of winning the jackpot?",
        "Thunderball has the best UK jackpot odds at 1 in 8,060,598, paying out a fixed £500,000 top prize. The trade-off is the smaller jackpot compared with EuroMillions or UK Lotto. If your goal is to maximise your chance of winning any prize at all, the UK Lotto's lowest tier (matching 2 numbers for a free Lucky Dip) hits at roughly 1 in 10.3, which is the most realistic 'win' on offer."
      ),
      createFAQ(
        "Does buying more tickets actually improve my odds?",
        "Yes, but linearly and from a tiny base. Buying 10 EuroMillions tickets gives you a 10 in 139,838,160 chance of the jackpot, or 1 in 13,983,816. That is still 28 times worse than UK Lotto with a single ticket. Spending more does not buy better odds per pound; you are simply buying more entries at the same fixed rate. Ticket syndicates work the same way, just spread the cost."
      ),
      createFAQ(
        "Why do bigger jackpots tend to have worse odds?",
        "Lottery operators design the matrix (number range and pick count) so the jackpot wins out roughly once every several draws. The bigger the advertised top prize, the longer the gap they need between winners, which means a wider matrix and longer odds. EuroMillions deliberately uses 5 numbers from 50 plus 2 stars from 12 because that produces a 139 million-to-one base rate, which lets the prize roll over several weeks before paying."
      ),
      createFAQ(
        "Is the lottery a worse bet than a casino?",
        "By a wide margin. A UK casino's house edge on roulette is between 2.7% (European) and 5.26% (American). Slot machines in regulated UK venues run at around 5%. The UK Lotto's house edge is roughly 48% and EuroMillions is 68%. You will lose money more slowly at a roulette table than buying scratch cards, on average. Neither is a way to make money, but the slow burn of a casino visit is mathematically friendlier than the lottery."
      ),
      createFAQ(
        "Should I play the same numbers every week?",
        "Mathematically it makes zero difference. Every combination has identical odds on every draw because the balls have no memory. Picking the same numbers each week is psychologically reassuring (you fear missing 'your' numbers coming up the week you forget) but it does not improve your chance of winning. Quick picks, birthdays, and lucky numbers all win the jackpot with the same probability."
      ),
    ],
    relatedTools: [
      { slug: "uk-lotto-number-picker", label: "UK Lotto Number Picker" },
      { slug: "euromillions-number-picker", label: "EuroMillions Number Picker" },
      { slug: "powerball-number-picker", label: "Powerball Number Picker" },
    ],
  },

  "dutching-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Dutching Is",
        "Dutching is the practice of backing more than one runner in the same race so that whichever of your selections wins, you collect the same profit (or the same loss). Instead of betting your entire stake on one horse, you split it across two, three, four or more, with the split weighted by their decimal odds so the returns even out. The calculator does the weighting for you: enter your total stake and the odds for each selection, and it shows the stake to put on each, the uniform return, and the combined book percentage.",
        "Note up front: dutching is only mathematically profitable when the combined book percentage of your selections is below 100%. If three horses are quoted at odds that imply 110% combined probability, you cannot dutch them at a profit, no matter how you split the stake. The bookmaker's overround is built in. The calculator shows the book percentage and flags whether it represents a positive-value position."
      ),
      createAnswerFirstSection(
        "When Dutching Makes Sense",
        "It comes up most often in horse racing or golf, where there are several contenders and the favourite is far from a certainty. Rather than guessing which of two or three credible runners will win, you can cover all of them. The trade-off is that your effective odds drop: dutching three runners at 4.0, 6.0 and 12.0 gives a flat return that's lower than backing any one of them to win, but you have a much wider chance of any of those returns landing.",
        "Dutching is also a key part of arbitrage betting (covering all outcomes across multiple bookmakers to lock in a profit) and matched-betting (offsetting a free bet against a back/lay pair). In each case the calculator runs the same arithmetic: stake-weighted by inverse odds so that every winning scenario pays the same. For lay-side cover on an exchange, see the [Lay Bet Calculator](/lay-bet-calculator)."
      ),
      {
        heading: "Worked Example: Dutching Three Selections",
        table: {
          headers: ["Selection", "Odds", "Implied prob", "Stake (from £100)", "Return if wins"],
          rows: [
            ["A", "3.0", "33.3%", "£44.78", "£134.33"],
            ["B", "5.0", "20.0%", "£26.87", "£134.35"],
            ["C", "8.0", "12.5%", "£16.79", "£134.32"],
            ["Combined book", "65.8%", "", "£88.44 staked", "Profit ~ £45.91 each"],
          ],
        },
      },
      createAnswerFirstSection(
        "Dutching Risks and Realistic Expectations",
        "If none of your selections win, you lose the full stake. So dutching three horses at combined 65% implied probability still leaves a 35% chance of total loss. Spread across long enough sessions, the variance can be substantial. The calculator gives you the maths cleanly but cannot tell you whether the prices are actually mispriced; that's your job, and it requires either domain knowledge of the sport or an edge over the bookmaker's pricing model that very few bettors actually have.",
        "The Gambling Commission and GambleAware both publish guidance on staying in control. Set a budget you can afford to lose, treat dutching like any other form of gambling, and don't chase losses by stacking bigger or wider duts. If you're betting at all, bet small and don't borrow to do it."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the book percentage?",
        "The sum of the implied probabilities of every selection in the market, calculated as 1 divided by each decimal odds. A book of 100% represents a fair market with no margin. Anything above 100% is the bookmaker's overround (typical UK racing books are 105-115%). Dutching is only mathematically profitable when your selected subset has a book under 100%."
      ),
      createFAQ(
        "Will dutching guarantee a profit?",
        "No. Dutching guarantees the same profit (or loss) regardless of which selection wins, but only among the selections you've actually backed. If a runner you didn't include wins, you lose your entire stake. The 'guarantee' is conditional on one of your picks winning. Across many bets, dutching is profitable only when you systematically pick subsets that combine to under 100% book."
      ),
      createFAQ(
        "How do I find dutch-able prices?",
        "Compare odds across multiple bookmakers and look for divergence. The same race priced at three different bookies will sometimes have a combined book under 100% if you take the best price for each runner. This is called arbing and is what professional arbitrage bettors do. Be aware that bookmakers are quick to limit or close accounts of customers who arb persistently."
      ),
      createFAQ(
        "How many selections should I dutch?",
        "There's no universal answer. Two or three selections is most common because each addition cuts your potential return per winning bet. Five or six selections in an 8-runner race might give you a near-arb but a tiny return. Beyond that, you're approaching 'just buy a tracker fund'. Most bettors dutch two or three selections that they actually fancy, rather than trying to cover the whole field."
      ),
      createFAQ(
        "Is dutching legal?",
        "Yes, in the UK and most jurisdictions. It's just a way of structuring multiple bets. Bookmakers are aware of it, don't object to it as such, and are licensed by the Gambling Commission to take such bets. If you do it well enough to have a long-term edge, individual bookmakers may limit or close your account, which is their commercial right."
      ),
    ],
    relatedTools: [
      { slug: "matched-betting-calculator", label: "Matched Betting Calculator" },
      { slug: "lay-bet-calculator", label: "Lay Bet Calculator" },
      { slug: "odds-converter", label: "Odds Converter" },
    ],
  },

  "each-way-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Each-Way Bets Work",
        "An each-way bet is two bets in one. Half your stake goes on the selection to win, the other half on it to place (finish in the top few). If your selection wins, both halves pay out. If it places but doesn't win, only the place half pays out (at a reduced fraction of the win odds). If it does neither, you lose the lot. The calculator takes your stake per part, the win odds, the place fraction (1/4 or 1/5 typically), and the number of paid places, then shows your three possible outcomes side by side.",
        "Bookmakers set the place terms based on field size. Standard UK terms: 5-7 runners gives 1/4 odds and 2 places, 8-15 runners gives 1/5 odds and 3 places, 16+ handicaps give 1/4 odds and 4 places. Some big races (Grand National, Derby) extend to 5 or 6 places. The 'preset' buttons load these standard terms quickly. Smaller fields of 4 or fewer runners typically don't accept each-way bets at all."
      ),
      createAnswerFirstSection(
        "When Each-Way Is and Isn't Good Value",
        "Each-way is sensible when you fancy a horse to be in the frame but aren't confident it can win. A 12.0 win-priced runner in an 8-runner race pays 12.0 if it wins, plus 3.20 (the 1/5 fraction of 11.0, plus the stake back) if it places. The double upside helps absorb the cost of the second part of the stake. It's poor value on short-priced favourites: backing a 2.5 favourite each-way is mostly just an inflated win bet, since the place return is barely above your stake.",
        "There's a known each-way value pattern in handicap racing: when the field has 12-15 runners (qualifying for 1/4 odds and 3 places) and a fancied runner is priced 7.0 to 11.0, the place portion alone can be a positive-value bet. Specialist tipsters and the so-called 'each-way thieves' communities target these. The calculator shows you the underlying numbers so you can spot the same pattern. For converting between fractional and decimal odds, the [Odds Converter](/odds-converter) handles all formats."
      ),
      {
        heading: "Standard UK Each-Way Terms by Field Size",
        table: {
          headers: ["Field size", "Place fraction", "Paid places"],
          rows: [
            ["2-4 runners", "Win only (no E/W)", "0"],
            ["5-7 runners", "1/4 odds", "2"],
            ["8-11 runners", "1/5 odds", "3"],
            ["12-15 runners (handicap)", "1/4 odds", "3"],
            ["16+ runners (handicap)", "1/4 odds", "4"],
            ["Extended (e.g. Grand National)", "1/4 odds", "5 or 6 (varies)"],
          ],
        },
      },
      createAnswerFirstSection(
        "What the Calculator Tells You",
        "Three scenarios. If the selection wins, you get the full win return (stake × odds) plus the place return (stake × (1 + place fraction × (odds - 1))) and the total profit is large. If the selection places without winning, you lose the win half and collect only the place half, often a small profit or a small loss depending on the place odds. If the selection neither wins nor places, you lose the full stake (which is twice the per-part stake, since each-way doubles your outlay).",
        "Read all three scenarios before placing the bet. A common mistake is focusing on the win-scenario profit and forgetting that the place-only scenario is the most likely outcome for most each-way picks. The fact that a place return is small or break-even is part of the design: each-way reduces variance, it doesn't increase expected value above what the underlying market price implies."
      ),
    ],
    faqs: [
      createFAQ(
        "What does '1/4 odds, 3 places' mean?",
        "If you bet each-way on a horse at 8.0 (which is 7.0 to 1 in fractional terms) and it places, the place part of your bet pays out at 1/4 of the fractional odds, so 7/4 = 1.75 to 1, meaning a £10 place stake returns £27.50 (£17.50 profit plus your £10 stake). 'Three places' means the bookmaker pays out the place part of the bet for any of the first three finishers."
      ),
      createFAQ(
        "Why does 'win only' apply to small fields?",
        "Bookmakers don't offer each-way on fields of 4 or fewer because there's not enough variance to make the place portion meaningful. With 2 runners, places aren't a thing; with 3 or 4, the place market would essentially mirror the win market. Some big races also have non-runner rules that can shift the field size and trigger Rule 4 deductions, which the calculator doesn't handle."
      ),
      createFAQ(
        "Is each-way better value than win-only betting?",
        "On average, no. Each-way is two bets, so the bookmaker takes margin twice. The variance is lower (you're less likely to walk away with nothing) but the expected return is generally lower than win-only. The exception is when place markets are mispriced relative to win markets, which happens occasionally in handicap races with mid-priced runners."
      ),
      createFAQ(
        "What is an each-way double or treble?",
        "An accumulator where each leg is itself an each-way bet. Each-way doubles consist of a win double and a place double; if any leg fails, the win accumulator dies, but the place portion can still pay if all legs place. They're popular but compound the bookmaker's margin twice across two or more legs, so they're typically poor value compared to single each-way bets."
      ),
      createFAQ(
        "Can I lose more than my stake on each-way?",
        "No. Your maximum loss is exactly your total stake (which is twice the per-part stake). Unlike spread betting, where losses can exceed the stake, traditional each-way is bounded by your outlay. The calculator's 'loss' scenario shows the negative of your total outlay, not anything more."
      ),
    ],
    relatedTools: [
      { slug: "odds-converter", label: "Odds Converter" },
      { slug: "accumulator-calculator", label: "Accumulator Calculator" },
      { slug: "betting-odds-calculator", label: "Betting Odds Calculator" },
    ],
  },

  "lay-bet-calculator": {
    sections: [
      createAnswerFirstSection(
        "What a Lay Bet Is",
        "A lay bet is the inverse of a back bet. When you lay a selection, you act as the bookmaker for that bet: you accept someone else's money in return for paying out if their selection wins. You collect the stake when the selection loses, and pay out the liability when it wins. Lay betting is only available on betting exchanges (Betfair, Smarkets, Betdaq), not at high-street bookies, because exchanges match individual backers and layers against each other.",
        "The calculator takes the lay odds, the lay stake (the amount you'd collect if the selection loses), and the exchange commission percentage, and shows you three things: your liability (how much you must pay out if the selection wins), the required balance you need in your account before placing the bet, and your profit and loss in each scenario. Liability is always (lay odds - 1) × lay stake."
      ),
      createAnswerFirstSection(
        "How Liability and Required Balance Work",
        "Lay liability is what makes lay betting feel different from back betting. If you lay a selection at odds of 5.0 with a £20 stake, your liability is £20 × (5.0 - 1) = £80. You need at least £80 free in your exchange account to place that lay bet, even though you only collect £20 (less commission) if you win. This is why exchange accounts often hold larger balances than back-only bookmaker accounts: the working capital required scales with the odds you're laying.",
        "The higher the lay odds, the bigger the liability for the same potential profit. Laying at 2.0 with a £20 stake means £20 liability (£20 risked to win £20). Laying at 10.0 with a £20 stake means £180 liability (£180 risked to win £20). Laying short prices is therefore more capital-efficient than laying long shots, which is one reason many lay-bettors focus on favourites. For the back side of arbitrage, the [Dutching Calculator](/dutching-calculator) shows how to spread stakes across multiple selections instead."
      ),
      {
        heading: "Liability Examples for £10 Lay Stake",
        table: {
          headers: ["Lay odds", "Liability", "Net profit if loses (5% commission)"],
          rows: [
            ["1.5", "£5.00", "£9.50"],
            ["2.0", "£10.00", "£9.50"],
            ["3.0", "£20.00", "£9.50"],
            ["5.0", "£40.00", "£9.50"],
            ["10.0", "£90.00", "£9.50"],
            ["20.0", "£190.00", "£9.50"],
          ],
        },
      },
      createAnswerFirstSection(
        "What Lay Betting Is Used For",
        "Three main uses. Matched betting: combine a free bet at a bookmaker with a lay at the exchange to lock in most of the free bet's value as cash. Trading: lay at one price expecting it to drift, then back at higher odds to lock in a profit regardless of outcome. Hedging: if you've already backed a selection, laying it back at lower odds can lock in a guaranteed profit before the event happens.",
        "Commission on exchanges typically runs 5% on Betfair (lower for high-volume customers, the famous 'premium charge' aside), 2% on Smarkets and Betdaq. Commission applies only to your net winnings on a market, so if you lose more than you win in a market the commission is zero. The calculator's commission setting affects only the profit-if-loses scenario, since the loss-if-wins scenario already accounts for the full liability."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the difference between a back bet and a lay bet?",
        "A back bet is what high-street bookmakers offer: you put down a stake, and if your selection wins, the bookmaker pays you out. A lay bet is the opposite: you act as the bookmaker, accepting another punter's stake, and you pay out if their selection wins. Both forms exist together on exchanges where backers and layers match each other directly."
      ),
      createFAQ(
        "Can I lose more than my stake on a lay bet?",
        "Yes, in a sense. The amount you can lose (liability) is greater than the amount you can win (stake) for any odds above 2.0. This is fundamental to lay betting and is why exchanges require you to have the full liability available in your account before you place the bet. You won't go into negative balance, but the maximum loss is liability, not stake."
      ),
      createFAQ(
        "What is the exchange commission?",
        "A percentage of your net winnings that the exchange takes as their fee for matching your bet. Betfair charges 5% on most accounts, Smarkets and Betdaq charge 2%. Some accounts pay reduced rates for high volume. Commission is only charged on net winnings in a market, not on every bet, so if you lose more than you win in a market, no commission is taken."
      ),
      createFAQ(
        "Is matched betting still profitable in 2026?",
        "Margins have shrunk considerably since the heyday of free-bet sign-up offers. UK bookmakers also limit or close accounts of customers they identify as bonus-hunters. It's still done by some, particularly with reload offers and lower-stakes promotions, but as a sustainable income source it's much harder than it was in 2015-2018. Treat any matched-betting income forecast with scepticism."
      ),
      createFAQ(
        "What happens if no one matches my lay bet?",
        "Your bet sits in the order book at the price you specified until it is matched (someone backs it) or the market closes. Unmatched lay bets carry no liability and don't tie up your balance once cancelled. Liquidity varies by market: top football matches and main horse races have deep order books; obscure markets may not match at all."
      ),
    ],
    relatedTools: [
      { slug: "dutching-calculator", label: "Dutching Calculator" },
      { slug: "matched-betting-calculator", label: "Matched Betting Calculator" },
      { slug: "odds-converter", label: "Odds Converter" },
    ],
  },

  "set-for-life-number-picker": {
    sections: [
      createAnswerFirstSection(
        "Set For Life Format",
        "UK National Lottery's Set For Life requires picking 5 main numbers from 1-47 plus 1 'Life Ball' from 1-10. Match all 6 to win £10,000 every month for 30 years (the top prize). Match 5 + 0 = £10,000/month for 1 year. Lower matches give cash prizes. Draws happen Mondays and Thursdays. Tickets cost £1.50 each.",
        "The 'random pick' (Lucky Dip) generates numbers automatically - same odds as picking yourself but removes effort. Common picking strategies: avoid heavily-played number patterns (1-2-3-4-5), use birthdays (limits to 1-31 only - missing 32-47), random pure-chance picks. Mathematically all combinations have equal probability of being drawn; the advantage of random picks is avoiding shared jackpots if your numbers happen to be popular."
      ),
      createAnswerFirstSection(
        "Odds and Realistic Expectations",
        "Top prize odds: 1 in 15.34 million. To put that in context: more likely to be struck by lightning (1 in 1.2 million in your lifetime) than to win Set For Life. The expected return per £1.50 ticket is roughly 50-55p - so £1 of every £2 spent ends up as profit/funding for the Lottery, not back to players. Treat as entertainment expense, not investment.",
        "Better odds: match 5 numbers without Life Ball (1 in 1.7 million), match 4+1 (1 in 250,000), match 3+1 (1 in 5,300). Lower-tier prizes (£5-£250) are achievable but small. The expected loss is about 47p per £1.50 ticket. Lottery players sometimes joke 'if you don't play, you can't win' - mathematically true but the same logic applies to any near-zero probability event."
      ),
      createAnswerFirstSection(
        "How the Number Picker Works",
        "Generates random numbers using browser's Math.random() or similar pseudo-random. Same statistical odds as buying a Lucky Dip ticket. Some pickers add filters: avoid consecutive numbers (1-2-3 patterns), exclude certain birthdays-only ranges, ensure spread across high/low/odd/even. None of these filters change actual probability - they just feel different.",
        "Cultural beliefs about lucky numbers (7, 8, 11, 13) vary by player. Some players use date-of-birth digits, anniversaries, sports jersey numbers. Mathematically identical chances regardless of method. The picker is a tool for generating random combinations without bias toward your personal favourites - sometimes that's exactly what you want."
      ),
      createAnswerFirstSection(
        "Responsible Play",
        "Lottery is gambling - National Lottery's GambleAware messaging is mandatory for a reason. Set yourself a monthly budget (e.g. £10/month = 6-7 plays). Don't chase losses by buying more tickets after a loss. Don't use lottery as a 'plan' - the math is a tax on people who don't understand probability. If you find yourself spending more than budgeted, GamCare, BeGambleAware, and Citizens Advice offer free support.",
        "The Lottery does fund good causes - about 30p of every £1.50 ticket goes to Heritage, Sport, Arts, Community, Health, and other charitable distributions. From that perspective, lottery spending is partly a charitable contribution. Use the [Powerball Number Picker](/powerball-number-picker) for the US lottery comparison, [Lucky Number Generator](/lucky-number-generator) for general number picks."
      ),
    ],
    faqs: [
      createFAQ(
        "Are random picks better than choosing my own?",
        "Mathematically identical odds. Statistically, random Lucky Dips are slightly less likely to result in shared jackpots (you avoid the heavily-played patterns that cluster around birthdays and common 'lucky' numbers). For maximum payout per win, pure random spreads risk."
      ),
      createFAQ(
        "What's the smallest prize?",
        "£5 for matching 3 numbers. Bigger if you also match the Life Ball: £10 for 3+1, £20 for 4+0, £250 for 4+1, £10,000 for 5+0 (1 year of monthly payments), £10,000/month for 30 years for 5+1 (the jackpot)."
      ),
      createFAQ(
        "Can I play from outside the UK?",
        "Officially you must be a UK resident and 18+ to buy tickets. Some online services claim to facilitate international play but this is technically against National Lottery rules. Stick to direct purchase from official channels (Camelot/National Lottery website or Allwyn from 2024)."
      ),
      createFAQ(
        "What if multiple winners hit the jackpot?",
        "The jackpot prize (£10,000/month for 30 years) is shared between all jackpot-winning tickets. So if 2 people match all 6, each gets £5,000/month. The £10k/month figure is per-ticket assuming sole winner; multiple winners reduce per-person payout proportionally."
      ),
    ],
    relatedTools: [
      { slug: "powerball-number-picker", label: "Powerball Number Picker" },
      { slug: "lucky-number-generator", label: "Lucky Number Generator" },
      { slug: "odds-converter", label: "Odds Converter" },
      { slug: "betting-odds-calculator", label: "Betting Odds Calculator" },
    ],
  },

  "powerball-number-picker": {
    sections: [
      createAnswerFirstSection(
        "Powerball Format",
        "US Powerball requires 5 main numbers from 1-69 plus 1 Powerball from 1-26. Match all 6 to win the jackpot (varies, often £100M+ at start, building to billions in record-setting rolls). Tickets cost $2 each (£1.50). Draws Monday, Wednesday, Saturday at 10:59 PM Eastern. Available in 45 US states + DC + Puerto Rico + US Virgin Islands.",
        "The current record Powerball jackpot: $2.04 billion (November 2022, single ticket in California). Powerball is the largest US lottery game by jackpot. UK residents cannot legally buy Powerball tickets directly - some 'lottery messenger' services exist but operate in a legal grey area. The huge jackpot prizes drive massive ticket sales, especially when rolling for weeks without a winner."
      ),
      createAnswerFirstSection(
        "Odds and Math",
        "Top prize odds: 1 in 292.2 million. Lower than UK Set For Life (15M) - American lotteries typically have worse odds because of the larger number range. To compare: more likely to be killed by a vending machine (~1 in 112 million) than to win Powerball. The expected return per $2 ticket is about $0.95 - half the ticket cost goes to administration, taxes, and prizes for lower tiers.",
        "Match 5 without Powerball: 1 in 11.7 million for $1 million. Match 4+1: 1 in 913,129 for $50,000. Match 4: 1 in 36,525 for $100. Match 3+1: 1 in 14,494 for $100. Lower-tier prizes ($4-100) are more frequent but small. Power Play option (extra $1) multiplies non-jackpot wins 2x-10x; it's optional and changes the expected return profile."
      ),
      createAnswerFirstSection(
        "Number Picking Strategy",
        "Quick Pick (random) is the most common - 70%+ of tickets sold are Quick Picks. Same odds as picking yourself. Birthdays-based picking is common but limits main numbers to 1-31 (missing 32-69 = lower likely jackpot). Sports jersey numbers, addresses, anniversaries are popular. The advantage of full-random picks is reducing chance of shared jackpot if your specific numbers are widely played.",
        "The 'wheel system' or 'frequency analysis' (picking numbers that haven't been drawn recently) - has zero statistical basis. Each draw is independent; previous draws don't affect future probability. Some people enjoy these strategies for the structure they provide; mathematically they don't improve your odds. Use the picker for unbiased random picks if that's what you want."
      ),
      createAnswerFirstSection(
        "Tax and Real Take-Home",
        "If you win the US lottery jackpot, expect roughly 40-50% to disappear to taxes. US federal lottery winnings: 24% withheld immediately, plus up to 13.3% in state tax (CA, NY) or 0% (Texas, Florida). Lump sum option: typically 50-60% of advertised jackpot pre-tax. Annuity option: full advertised amount paid over 30 years (more total but in instalments).",
        "Most jackpot winners take the lump sum despite getting less, because: investment of lump sum can outperform the annuity payments, life is uncertain, taxes might rise during annuity period. Financial advisers strongly recommend immediate professional financial planning post-win - dramatic lifestyle changes after lottery wins often correlate with negative outcomes for unprepared winners. Use the [Set For Life Number Picker](/set-for-life-number-picker) for the UK equivalent."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I play Powerball from the UK?",
        "Not legally direct. Official Powerball is restricted to US ticket purchases. Some 'lottery concierge' or 'lottery messenger' services claim to buy tickets on your behalf, but legal status is unclear. Most UK players stick to UK lotteries (National Lottery, Set For Life, EuroMillions) which are widely available and legitimate."
      ),
      createFAQ(
        "Are repeat winners suspicious?",
        "Modern US lottery audits investigate any seller selling many winning tickets. Most repeat 'wins' from one person/address are scrutinised. Lottery wins are random, so a single person winning twice is statistically possible but rare enough to merit investigation."
      ),
      createFAQ(
        "What about the $2.04B winner?",
        "California 2022 winner Edwin Castro took the lump sum: $997.6 million pre-tax. After federal and California state tax: roughly $628 million net. Has remained largely private since. Subsequent investigation found procedural issues but ticket was confirmed legitimate."
      ),
      createFAQ(
        "Is Power Play worth the extra dollar?",
        "Mathematical expected value usually slightly positive, but small. Power Play multiplies non-jackpot wins 2-10x. Most often results in modest ($4 → $8 with 2x multiplier) increases. Won't change a low-tier loss into a big win. For most players, the extra dollar is better spent on a second ticket (doubles your chance) than Power Play."
      ),
    ],
    relatedTools: [
      { slug: "set-for-life-number-picker", label: "Set For Life Number Picker" },
      { slug: "lucky-number-generator", label: "Lucky Number Generator" },
      { slug: "odds-converter", label: "Odds Converter" },
      { slug: "betting-odds-calculator", label: "Betting Odds Calculator" },
    ],
  },
};
