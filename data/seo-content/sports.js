// SEO content for sports and tournament tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const sportsSEO = {
  "tournament-bracket-generator": {
    sections: [
      createAnswerFirstSection(
        "Pick the Format Before You Pick the Players",
        "Single elimination is the format most people picture when they hear the word 'bracket'. One loss and you are out. With 16 entrants you play 15 matches and finish in 4 rounds, which makes it the right pick for a one-day Sunday tournament or a quick office competition. With 32 entrants it stretches to 5 rounds, but you can still get through it in a single afternoon if matches are short.",
        "Double elimination keeps players in the bracket after a single loss by sending them down to a losers' side. The total match count nearly doubles (a 16-entrant double-elim runs 30 matches), but everyone gets at least two games and the eventual winner has genuinely beaten the field rather than scraping a single lucky bracket run. Round robin is everyone-plays-everyone, which gives the fairest competitive picture but scales badly: 8 players means 28 matches, 12 players means 66. Use round robin only for small group stages or league-style competitions that run over multiple weeks."
      ),
      createAnswerFirstSection(
        "Why Seedings Matter (and When to Skip Them)",
        "Seeding is the order players are slotted into the bracket. Proper seeding pits the strongest entrant against the weakest in round one, so the early matches are competitive at the bottom but the top seeds get a comparatively easy start. This is how Wimbledon, the FA Cup proper rounds, every major tennis Slam and most professional tournaments work. The strongest seed plays the lowest, the second seed plays the second-lowest, and so on.",
        "If you are running a casual tournament between mates, a charity 5-a-side or a children's birthday-party bracket, randomise the seedings instead. A random draw avoids arguments about who deserves the top seed and makes round one genuinely interesting because anyone can land against anyone. The generator supports both modes; pick whichever fits the stakes. For an example of seeded brackets in action, take a look at the [World Cup 2026 wall chart](/world-cup-2026-wall-chart) where the 48 teams are slotted into 12 groups based on FIFA ranking."
      ),
      createAnswerFirstSection(
        "Handling Bye Rounds When Numbers Don't Fit",
        "Single-elimination brackets work cleanly with 4, 8, 16, 32 or 64 entrants because each round halves the field. With 12 entrants you have 4 byes; with 20 you have 12 byes. The generator places these in the top of the bracket so the highest seeds skip round one, which is the convention used in tennis and most amateur competitions. The result is a clean bracket where the bye seeds drop straight into round two and meet whoever survives round one.",
        "If the numbers are awkward (think 11 entrants, where you need 5 byes), some organisers run a play-in round instead, where the lowest seeds fight for one or two spots in the main bracket. This adds a round but means everyone plays at least one match, which matters for entry fees and tournament fairness. The generator supports both approaches, but be honest with yourself about whether the players will accept being seeded down to a bye versus actually playing for their spot."
      ),
      createAnswerFirstSection(
        "Printing, Sharing and Updating as the Tournament Runs",
        "The generator exports brackets as PNG or PDF for printing on A3 or larger. A 32-entrant single-elim bracket fits comfortably on A3 landscape; anything larger really needs A2 or splitting across two sheets. Most pub-tournament organisers print one master copy to pin up, give each match scorer a small printed slip and update the master sheet after each round.",
        "If you are running an event remotely or over multiple sessions, share the live bracket URL instead of reprinting. Edit results as matches finish, and the bracket updates automatically. For knockout-only tournaments this works neatly. For more complex formats with group stages followed by knockouts, pair this with the [World Cup 2026 wall chart](/world-cup-2026-wall-chart) for groups, then port the qualifiers across into a fresh bracket."
      ),
    ],
    faqs: [
      createFAQ(
        "How many matches in a single-elimination tournament?",
        "Always exactly the number of entrants minus one. A 16-player single-elim has 15 matches, a 32-player has 31 matches, a 64-player has 63 matches. This is because every match eliminates exactly one player, and you need to eliminate everyone except the eventual champion. Useful for working out how many referees, courts or pitches you need to book."
      ),
      createFAQ(
        "What is the difference between a bracket and a fixture list?",
        "A bracket is the visual knockout chart where winners advance and losers drop out. A fixture list is the chronological schedule of who plays whom and when, used most commonly in round-robin or league formats. The generator produces both: brackets for elimination formats, full fixture grids for round robin. Most tournaments use both, with the bracket pinned up for spectators and the fixture list given to the scorers and players."
      ),
      createFAQ(
        "How do I run a double-elimination tournament fairly?",
        "Double elimination has two parallel brackets: a winners' side and a losers' side. Players who lose in the winners' bracket drop into the losers' bracket and keep playing. The losers' bracket winner faces the winners' bracket winner in the grand final. To make it strictly fair, the losers' bracket finalist may need to beat the winners' finalist twice, since the winners' finalist has not yet lost a match. Most casual tournaments skip this and play a single grand final to save time."
      ),
      createFAQ(
        "Can I use this for a Secret Santa or random pairing draw?",
        "The bracket generator is designed for competitive tournaments, where one team or player advances per match. For a non-competitive random pairing exercise like Secret Santa, use the [Secret Santa generator](/secret-santa-generator) instead, which handles the constraint that A drawing B does not require B to draw A. For random tie-breakers within a tournament round, the [dice roller](/dice-roller) handles single random numbers without overcomplicating things."
      ),
      createFAQ(
        "What's the best format for an 8-player tournament?",
        "For 8 entrants you have a clean single-elimination bracket of 7 matches and 3 rounds, which fits in a single afternoon with 30-minute matches. If you want everyone to get more game time, switch to double elimination (14 matches) or a small round robin (28 matches across 7 rounds). Round robin is the fairest result but takes the longest; it is the format chess clubs and small five-a-side leagues use most often."
      ),
    ],
    relatedTools: [
      { slug: "world-cup-2026-wall-chart", label: "World Cup 2026 Wall Chart" },
      { slug: "secret-santa-generator", label: "Secret Santa Generator" },
      { slug: "dice-roller", label: "Dice Roller" },
    ],
  },

  "golf-handicap-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the World Handicap System Works",
        "The World Handicap System (WHS) replaced the old CONGU and USGA systems in 2020 and is now the global standard for amateur handicaps. Your Handicap Index is the average of your 8 best score differentials from your last 20 rounds, regardless of where they were played. A score differential is calculated as (113 / slope rating) x (gross score - course rating). The 113 is the slope of a 'standard' course; the formula adjusts your score to account for the difficulty of the course you played.",
        "If you have fewer than 20 rounds in your record, the system uses fewer differentials in the average (5 of 6, 6 of 9, 8 of 20 etc.). You need a minimum of 3 scores to receive a Handicap Index. The calculator handles this scaling automatically; just keep entering rounds as you play them and the index updates after each one."
      ),
      createAnswerFirstSection(
        "Course Handicap vs Handicap Index",
        "Your Handicap Index is the portable number, the same wherever you play. Your Course Handicap is your Index translated to a specific course. The conversion is Course Handicap = Handicap Index x (slope rating / 113) + (course rating - par). On a course with a slope of 130 (harder than standard), a 12 Index becomes a Course Handicap of around 14; on a slope of 110 (easier than standard), the same Index becomes about 11.",
        "This is why two golfers with the same Handicap Index can have different Course Handicaps when playing the same course from different tees. The slope and rating of each tee box are calculated separately, so playing from the white tees vs the yellow tees changes your Course Handicap. The calculator computes both numbers for any course you enter, so you can sense-check what you should be playing off in a club competition."
      ),
      createAnswerFirstSection(
        "Why You Need a Course Rating, Not Just a Par",
        "Course rating is the score a scratch golfer (someone with a Handicap Index of 0) is expected to shoot on that course under normal conditions. Slope rating is how much harder the course gets for higher handicap players, on a scale where 113 is 'standard'. The values come from a USGA-approved course rating panel; you do not estimate them yourself.",
        "A par-72 course can have a course rating of 68 (easy), 70 (typical) or 74 (very hard). The calculator includes presets for common UK course profiles, but for actual handicap submission you need the exact figures, which are printed on the scorecard or available on the course's website. England Golf, the R&A and the USGA all publish rating data for affiliated clubs. The [tournament bracket generator](/tournament-bracket-generator) is useful for running club competitions where everyone needs to play off their correct course handicap."
      ),
      createAnswerFirstSection(
        "Score Differentials and the 8-of-20 Rule",
        "WHS uses your best 8 differentials out of your most recent 20 rounds, not all 20. This rewards consistency: your worst rounds (sliced 9-iron into the trees, three-putted from 8 feet, two lost balls on the back nine) do not count. The result is a 'demonstrated ability' figure that reflects what you can shoot when playing reasonably well, not your average performance.",
        "There is also a soft cap and hard cap on rapid handicap changes. If your Index suddenly jumps because of a string of bad rounds, the system limits the increase to 5.0 over your low Index of the past 12 months. This stops the system from inflating your handicap unfairly fast on a temporary slump. Likewise, exceptionally good rounds trigger an 'exceptional score' adjustment that pulls your Index down faster than the 8-of-20 average alone would suggest."
      ),
      {
        heading: "Course Handicap Examples (12.0 Handicap Index)",
        table: {
          headers: ["Course Type", "Slope", "Course Rating", "Par", "Course Handicap"],
          rows: [
            ["Easy course", "110", "68", "72", "8"],
            ["Typical UK course", "113", "70", "72", "10"],
            ["Difficult course", "125", "72", "72", "13"],
            ["Championship course", "135", "74", "72", "16"],
            ["Par-3 course", "105", "54", "54", "11"],
            ["Links course (windy)", "130", "73", "72", "15"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I get an official Handicap Index?",
        "In the UK, you need to be a member of an England Golf, Scottish Golf or Welsh Golfing Union affiliated club. Your club submits your scores to the central WHS database, and the system calculates your Index after 3 qualifying rounds. The Handicap Index is portable across affiliated clubs nationally and (because of the global WHS) recognised worldwide. The calculator gives an unofficial figure for personal tracking and casual rounds; for competition play you need an official Index from your home club."
      ),
      createFAQ(
        "What is a 'qualifying round'?",
        "Any round played according to the Rules of Golf, on a rated course, with a marker (someone playing alongside who confirms your score). Most club competitions are qualifying. Casual rounds where you took mulligans, played 'best ball' between two of you, or skipped holes are not qualifying. WHS also accepts 9-hole scores; two 9-hole scores combine into one 18-hole differential for handicap purposes."
      ),
      createFAQ(
        "How often does my Handicap Index update?",
        "Daily. Once your club submits a round to the WHS database, your Index recalculates overnight. This is a change from the old CONGU system where scores went into a 'buffer zone' and your handicap moved more slowly. The daily update means your Index is always current; play badly today, your Index nudges up tomorrow morning."
      ),
      createFAQ(
        "Can my handicap go up after a bad round?",
        "Yes, but only if the bad round becomes one of your top 8 of last 20 differentials, which usually means an unusually large blow-up. A round 5 to 8 strokes worse than your typical 8th-best in 20 will not affect your Index because it is outside the best 8. The soft cap (5.0 limit on rises) further protects against rapid handicap inflation. In practice, most rounds (good or bad) do not change your Index much; only consistent improvement or deterioration moves the number meaningfully."
      ),
      createFAQ(
        "What is the maximum handicap?",
        "The maximum Handicap Index under WHS is 54.0, regardless of gender. This is significantly higher than the old CONGU max of 28 (men) or 36 (ladies). The change was made to make the game more inclusive for genuine beginners; a 54 handicap means you take roughly 3 strokes per hole on a par-72 course. As you improve, your Index drops; most regular club golfers settle in the 12 to 24 range."
      ),
    ],
    relatedTools: [
      { slug: "tournament-bracket-generator", label: "Tournament Bracket Generator" },
      { slug: "darts-score-tracker", label: "Darts Score Tracker" },
      { slug: "running-training-plan", label: "Running Training Plan" },
    ],
  },

  "one-rep-max-calculator": {
    sections: [
      createAnswerFirstSection(
        "What 1RM Actually Means and Why It Matters",
        "Your one-rep max (1RM) is the heaviest weight you can lift for a single repetition with proper form. Almost every powerlifting and bodybuilding programme references 1RM percentages: '5 sets of 5 at 80%', '3 sets of 8 at 70%' and so on. Without knowing your 1RM, those instructions are guesses. Testing 1RM directly is risky and often pointless for most lifters; estimating it from sub-maximal sets is far safer and almost as accurate.",
        "The calculator takes a recent set you actually completed (e.g. 100 kg for 8 reps) and runs it through three independent formulas to estimate your true 1RM. The formulas are well-validated for the 2 to 10 rep range; above 10 reps the estimates start to drift because muscular endurance starts to dominate over pure strength. For best results, plug in a set you took to failure (or one rep short of it) at between 4 and 8 reps."
      ),
      createAnswerFirstSection(
        "The Three Formulas: Epley, Brzycki, Lombardi",
        "The Epley formula (1RM = weight x (1 + reps/30)) is the most common in bodybuilding programmes. It tends to give slightly conservative estimates at low reps and slightly optimistic ones at high reps. Brzycki (1RM = weight x 36 / (37 - reps)) is the powerlifting standard, more accurate at low reps (3 to 6) where the relationship between strength and reps is closest to linear. Lombardi (1RM = weight x reps^0.10) gives a third estimate based on a power-law model.",
        "All three formulas agree closely at 5 reps; they diverge most at 1 rep (where the estimate equals the input weight) and at 12+ reps (where reliability drops). The calculator shows all three so you can see the spread. If they disagree by more than 5 to 10%, your input set was probably too easy or too close to true failure for the formulas to work cleanly. Re-test with a 5 to 8 rep set."
      ),
      createAnswerFirstSection(
        "Percentages Table for Programming",
        "The percentages table below your 1RM estimate is the workhorse part of the tool. A 5x5 strength programme calls for 80 to 85%; an 8 to 10 hypertrophy session for 65 to 75%. A heavy single (the 'today's top set' in some programmes) is 90 to 95%. Knowing your 1RM gives you the actual weight to load on the bar, not just a rep target with no anchor.",
        "The table also shows estimated reps achievable at each percentage, which lets you sanity-check the load. If your estimated 1RM says 100 kg and the table says 80% (80 kg) should be good for 6 to 8 reps, but you are only getting 4 reps with form, your real 1RM is lower than the calculator suggests. This is most common with deadlifts, where rep-based estimates over-predict 1RM by 10 to 20% because the deadlift fatigues the central nervous system more aggressively than other lifts."
      ),
      createAnswerFirstSection(
        "Why Direct 1RM Testing Is Usually a Bad Idea",
        "Genuinely testing your 1RM is high-risk and high-fatigue. You need a fully warmed-up nervous system, a competent spotter, several attempts to find the true ceiling and significant recovery time afterwards. For competitive powerlifters, this is part of the sport; for everyone else, the marginal accuracy gain over a calculator is not worth the injury risk and the lost training time. A single missed lift can cost you a week of training while you nurse a strain.",
        "Use the calculator instead. Plug in a recent solid set, take the average of the three formulas, and use that as your working 1RM for the next 4 to 6 weeks of programming. Re-test (with a sub-maximal set, not a true 1RM) every 6 to 8 weeks to track progress. The [protein intake calculator](/protein-intake-calculator) and [TDEE calculator](/tdee-calculator) help you set the nutrition side of strength training, which usually limits gains more than the lifting itself."
      ),
      {
        heading: "1RM Percentage Reference",
        table: {
          headers: ["% of 1RM", "Reps achievable", "Training purpose"],
          rows: [
            ["95%", "1-2", "Heavy singles (peak strength)"],
            ["90%", "3-4", "Strength (pure)"],
            ["85%", "5-6", "Strength (5x5 programmes)"],
            ["80%", "6-8", "Strength + size"],
            ["75%", "8-10", "Hypertrophy (size)"],
            ["70%", "10-12", "Hypertrophy + endurance"],
            ["65%", "12-15", "Volume work"],
            ["60%", "15-18", "Endurance / warm-up"],
            ["50%", "20+", "Technique / metabolic"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Which formula is most accurate?",
        "Brzycki is generally the most accurate for the 2 to 6 rep range, especially for big compound lifts (squat, bench, deadlift). Epley is a touch more accurate for upper-body isolation work. Lombardi is the outlier and tends to predict lower than the other two; useful as a conservative estimate. Most strength coaches use Epley as the default because it gives slightly conservative numbers, which is safer for programming. The calculator shows all three so you can pick the one that matches your typical lift profile."
      ),
      createFAQ(
        "How accurate is a calculated 1RM?",
        "Within 5% for sets in the 3 to 6 rep range, taken to genuine failure or one rep short. Above 10 reps the accuracy drops because the lift becomes more about endurance than strength. The formulas are based on average athletes; if you have unusual fibre composition (predominantly slow-twitch from years of endurance training, for example) your real 1RM may be 5 to 10% lower than the calculator suggests, because you cannot generate quite as much peak force."
      ),
      createFAQ(
        "Should I use the same 1RM for every lift?",
        "No. Calculate 1RM separately for each main lift. Squat, bench, deadlift, overhead press and barbell row all have different 1RMs, and the relationships between them differ between individuals (some lifters bench more than they squat, others vice versa). For a full training programme, you typically need 1RMs for at least the four main lifts (squat, bench, deadlift, overhead press) and ideally for any other lift you programme by percentage."
      ),
      createFAQ(
        "How often should I re-test my 1RM?",
        "Every 6 to 8 weeks during a strength-focused training block. More frequent re-testing creates more nervous system fatigue and disrupts your programming. If you are running a long linear progression (Starting Strength, StrongLifts), the working weight is essentially auto-adjusting your 1RM upward each session, so you do not need explicit re-tests; just plug in a new heavy set whenever you want a refreshed number for accessory programming."
      ),
      createFAQ(
        "Can a beginner use 1RM percentages?",
        "Beginners are usually better served by a linear progression that adds weight every session (e.g. 2.5 kg per week on the squat) rather than percentage-based programming. Percentage programmes assume your 1RM is reasonably stable, which is not true for someone in the first 6 to 12 months of training. Once you can no longer add weight every session and need to start including lighter back-off sets, that is when 1RM-based programming becomes useful."
      ),
    ],
    relatedTools: [
      { slug: "protein-intake-calculator", label: "Protein Intake Calculator" },
      { slug: "tdee-calculator", label: "TDEE Calculator" },
      { slug: "bmi-calculator", label: "BMI Calculator" },
    ],
  },
};
