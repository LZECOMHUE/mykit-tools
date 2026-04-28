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
};
