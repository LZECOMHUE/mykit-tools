// SEO content for games and generator tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const gameSEO = {
  "bingo-card-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Create Custom Bingo Cards",
        "Type your list of custom words, phrases, or numbers into the generator. You need at least 25 items for a standard 5x5 card (24 items plus a free space). Our tool automatically scrambles your list and generates unique, randomised bingo cards ready for printing.",
        "Custom bingo cards are perfect for baby showers, classroom vocabulary games, corporate meetings (like buzzword bingo), or family gatherings. You can print up to 100 unique cards at once for free."
      ),
      createAnswerFirstSection(
        "Using Bingo for Education",
        "Teachers use custom bingo cards to make learning interactive. Instead of standard numbers, you can input spelling words, math equations, historical dates, or foreign language vocabulary. When you call out the definition or equation, students find the matching answer on their card.",
        "This turns standard memorisation tasks into a fun, competitive game that keeps students engaged."
      )
    ],
    faqs: [
      createFAQ(
        "Can I print multiple unique bingo cards?",
        "Yes, our site allows you to generate and print multiple uniquely randomised bingo cards at once. Just click the print option and specify how many copies you need. Each card will have your words arranged in a different order."
      ),
      createFAQ(
        "How many words do I need for a 5x5 bingo card?",
        "A standard 5x5 bingo grid has 25 squares. The centre square is traditionally a 'Free Space'. Therefore, you need exactly 24 unique words or phrases to fill out one card without repeating items."
      ),
      createFAQ(
        "Are these bingo cards completely free to make?",
        "Yes, the MyKit Bingo Card Generator is completely free to use. There are no limits on how many custom words you can input or how many sheets you can generate."
      )
    ],
    relatedTools: [
      { slug: "word-scramble-generator", label: "Word Scramble Maker" },
      { slug: "random-number-generator", label: "Random Number Picker" },
      { slug: "trivia-quiz", label: "Trivia Generator" }
    ]
  },

  "word-scramble-generator": {
    sections: [
      createAnswerFirstSection(
        "Creating Custom Word Scrambles",
        "To make a word scramble puzzle, enter your list of words into the tool. We will automatically shuffle the letters of each word to create a unique challenge. You can then print the puzzle sheet along with a separate answer key.",
        "Word scrambles (also known as anagram puzzles) are excellent tools for teachers building spelling worksheets, or for parents creating rainy-day activities and party games."
      ),
      createAnswerFirstSection(
        "Educational Benefits of Word Scrambles",
        "Unscrambling letters improves spelling accuracy, vocabulary, and pattern recognition. It forces the brain to look at structural letter groupings (like 'th', 'ch', 'ing') rather than just reading whole words.",
        "They are particularly effective for primary school students learning new spelling lists, or as icebreaker puzzles for English language learners."
      )
    ],
    faqs: [
      createFAQ(
        "Does this tool provide an answer key?",
        "Yes, whenever you generate a customized word scramble, the tool automatically creates a matching answer key. You can print the puzzle for your students or guests, and keep the answer key for yourself."
      ),
      createFAQ(
        "Can I use phrases or just single words?",
        "You can use both. If you enter a phrase with multiple words, the tool will typically scramble the entire phrase. For best results, we recommend using single words or short compound words."
      ),
      createFAQ(
        "Is there a limit to how many words I can scramble?",
        "There is no strict limit, but for printing purposes, we recommend keeping your list to between 10 and 20 words so they fit neatly on a single page."
      )
    ],
    relatedTools: [
      { slug: "bingo-card-generator", label: "Custom Bingo Cards" },
      { slug: "word-counter", label: "Word & Character Counter" }
    ]
  },

  "mtg-deck-cost": {
    sections: [
      createAnswerFirstSection(
        "How to Price an MTG Deck",
        "Pricing a Magic: The Gathering deck involves pulling real-time aggregate market data for every individual card in the 60 or 100-card list. Because card prices fluctuate wildly based on tournament results, reprints, and ban lists, static tracking is impossible.",
        "Our MTG deck cost builder pulls daily closing prices from major marketplaces (like TCGPlayer or Cardmarket) to estimate the true cash value of your decklist for selling, trading, or budget-building."
      )
    ],
    faqs: [
      createFAQ(
        "Does the deck value calculator account for foil or full-art cards?",
        "The standard estimate pulls the lowest available print price for an English, Near Mint version of the card. Foil, alternate-art, or hyper-specific vintage printings will carry a massive premium that basic bulk estimators might not fully capture."
      ),
      createFAQ(
        "Why is my magic deck cost suddenly dropping?",
        "It happens! If a highly played card in your deck gets reprinted in a new Masters set, or if a key combo piece gets banned in Modern or Commander, the secondary market value of the entire deck strategy can plummet overnight."
      )
    ]
  },

  "pub-quiz-generator": {
    sections: [
      createAnswerFirstSection(
        "What Makes a Good Pub Quiz Round?",
        "A pub quiz round is a set of 5 to 10 questions on a single theme. Most pubs run 4 rounds in an evening, taking about 90 minutes total. The classic mix is general knowledge, history, science, music and geography, with one themed round (Bond films, capital cities, song lyrics) to keep regulars engaged.",
        "Question difficulty matters more than category. The sweet spot is questions where the average team gets 6 or 7 out of 10, because that creates the satisfying buzz of \"we got it\" rather than the silence of \"no clue\". If your average score is 9 out of 10 the quiz is too easy. If it is 3 out of 10 people stop trying. Mix obvious openers with one or two stumpers per round."
      ),
      createAnswerFirstSection(
        "How To Run a Pub Quiz Without It Falling Apart",
        "Print one answer sheet per team and one question pack for the host. Read each question twice clearly, allow 30 seconds for teams to write the answer, then move on. Mark sheets between rounds and announce running totals, since the leaderboard is half the entertainment.",
        "The classic rookie mistakes: questions with multiple acceptable answers (always have a single definitive answer in the host pack), questions that sound obvious read aloud but are tricky to spell (be lenient on spelling), and questions on too-recent events (something from last week may have changed by quiz night). Have a tie-breaker question ready, ideally numerical (\"how many bricks in Buckingham Palace\") so the closest guess wins. Keep scoring simple: 1 point per correct answer, 2 points for picture rounds, no half marks. If a question gets challenged mid-quiz, rule on it quickly and move on."
      ),
      createAnswerFirstSection(
        "Themed Rounds That Always Work",
        "The reliable themed rounds are music intros (play 6 seconds, name the song), connection rounds (5 questions where the answers all link), picture rounds, anagrams, and \"what links these three\". Themed rounds break up the rhythm of pure trivia and give weaker general-knowledge teams a chance to shine.",
        "Music intros work best with a mix of decades. Try three from the 60s and 70s for the older crowd, three from the 90s and 00s, and two from the last few years. Picture rounds (printable sheets of cropped famous faces, logos, or landmarks) work especially well in family quizzes. The \"what links these three\" format is brutal but loved: question 1 reads \"Mary Berry, Paul Hollywood, Prue Leith\", question 2 asks what links them, answer is Bake Off judges. The [scattergories list generator](/scattergories-list-generator) gives you ready-made themed rounds and the [music round generator](/music-round-generator) builds a music round from scratch."
      ),
      createAnswerFirstSection(
        "Configuring This Generator for Pub, Office or Family Quizzes",
        "Pick the number of rounds (4 is standard for a 90-minute quiz), questions per round (5 to 10), the categories you want and a difficulty level. The tool builds a complete pack with questions, answers and a host script, plus a printable answer sheet for teams. The premium PDF adds scorecards, a bonus round and a watermark-free copy.",
        "Default settings work for most situations. Classic pub night: 4 rounds, 10 questions each, mixed categories, mixed difficulty. Office party: 3 rounds of 5, easier questions, more pop culture. Kids' family quiz: 3 rounds of 5, easy difficulty, focus on animals, film and sport. Older relatives' birthday quiz: 4 rounds of 8, harder questions, focus on history, geography and music from the 50s through the 70s. The generator pulls from a database of more than 1,000 pre-vetted questions, so re-running the same configuration gives you a fresh quiz each time."
      ),
    ],
    faqs: [
      createFAQ(
        "How many rounds should a pub quiz have?",
        "Four rounds of 10 questions is the standard for a 90-minute pub night. Five rounds of 8 also works. Keep total questions between 30 and 50; any more than that and energy flags. If you have a band or food break planned, build it into the running order between rounds 2 and 3 rather than at the end."
      ),
      createFAQ(
        "How do I make sure my pub quiz is fair?",
        "Use a mix of categories so no single team has a built-in advantage. Read each question twice using the same wording, and keep answer sheets out of view of other teams. For tie-breakers, pick a question with a numerical answer (\"how many seconds in a leap year\") so the closest guess wins, rather than first-correct-team-on-the-buzzer."
      ),
      createFAQ(
        "Can I use these questions for a school or office quiz?",
        "Yes. The generator is free for personal and small-group use, including office socials, school clubs, family parties and small charity quizzes. The questions are pre-written and reviewed quarterly to remove out-of-date current affairs. For paid commercial events such as a charity fundraiser with ticket sales, the premium PDF licence covers commercial use."
      ),
      createFAQ(
        "What is the difference between a picture round and a music round?",
        "A picture round shows printed images (logos, faces, landmarks, cropped objects) for teams to identify on the answer sheet. A music round plays short audio clips for teams to name the song or artist. Both are visual or audio breaks in a text-heavy quiz. Use one of each per quiz at most, since they take more setup than standard rounds."
      ),
      createFAQ(
        "Can I make a kids-only pub quiz?",
        "Yes. Set the difficulty to easy and pick categories like Animals, Film and TV, Sport, and Geography. Drop science and history (those skew older). 5-question rounds work better than 10 for under-12s, and the quiz should run for 30 to 45 minutes total before attention starts to wander."
      ),
    ],
    relatedTools: [
      { slug: "scattergories-list-generator", label: "Scattergories List Generator" },
      { slug: "music-round-generator", label: "Music Round Generator" },
      { slug: "pub-quiz-answer-sheet-printer", label: "Pub Quiz Answer Sheet Printer" },
    ],
  },

  "sudoku-generator": {
    sections: [
      createAnswerFirstSection(
        "What Makes a Sudoku Easy, Medium, Hard or Expert?",
        "Difficulty in Sudoku is set by how many numbers are filled in at the start (called \"givens\"). Easy puzzles start with 36 to 40 givens, medium with 28 to 32, hard with 22 to 26 and expert with the absolute minimum of 17 to 21. The lower the count, the more the solver has to deduce.",
        "An easy Sudoku can usually be solved by simple scanning - look at where a 7 already appears in the grid and work out which empty cell in each row, column or 3x3 box must hold the next 7. Medium puzzles need pencil notes (writing candidates in the corners of cells) and basic techniques like \"hidden singles\". Hard puzzles require pattern-spotting techniques: pointing pairs, naked triples, X-wings. Expert puzzles, with just 17 starting clues, often need chain logic or trial-and-error in a worst case. The rule that every valid Sudoku must have exactly one solution still applies at every difficulty."
      ),
      createAnswerFirstSection(
        "How to Solve Sudoku: The Three Techniques That Crack 90% of Puzzles",
        "Scanning, hidden singles and naked pairs will solve almost every easy and medium Sudoku and will get you through most hard ones. Scanning means looking at each digit 1 through 9 in turn and finding rows, columns or boxes where it can only fit in one cell. Hidden singles means looking inside a row, column or box and finding a cell that can only hold one specific number even though several others might seem possible.",
        "Naked pairs is the next step up: when two cells in a row both contain the same two candidate numbers and nothing else, you can eliminate those two numbers from every other cell in that row. Switch on pencil mode in the generator (the ✎ Pencil button) to write candidates into cell corners as you work. The grid also highlights every cell that shares a row, column or box with your selected cell, plus every other cell containing the same number, which makes spotting these patterns much faster than working with paper."
      ),
      {
        heading: "Difficulty Levels and What to Expect",
        table: {
          headers: ["Difficulty", "Givens", "Typical Solve Time", "Techniques Needed"],
          rows: [
            ["Easy", "36 to 40", "5 to 10 minutes", "Scanning only"],
            ["Medium", "28 to 32", "10 to 25 minutes", "Hidden singles, basic notes"],
            ["Hard", "22 to 26", "20 to 60 minutes", "Naked pairs, pointing pairs"],
            ["Expert", "17 to 21", "1 to 3 hours", "X-wings, chains, trial moves"],
          ],
        },
      },
      createAnswerFirstSection(
        "Printing Sudoku for the Pub, Classroom or Long Flight",
        "Click Download PDF for a print-ready puzzle on a single A4 page. The Solution PDF gives you the answer key on a separate sheet, useful for classroom worksheets where you mark students' work or for pub quiz hosts running a Sudoku-as-tiebreaker round. Both files are watermark-free.",
        "For schools, easy and medium puzzles work well as 5-to-10-minute filler activities for years 4 through 7. Hard and expert make sensible \"if you finish early\" enrichment material. For long flights, generate three or four hard puzzles before you board - solving without a phone for hints adds about 50% to typical times because the highlighting tools are not available. The grid here uses standard Sudoku notation with thick lines on the 3x3 box borders, so puzzles printed from this tool look identical to those in newspapers and puzzle books."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the minimum number of clues a Sudoku needs?",
        "17 clues is the proven mathematical minimum. In 2012, researchers searched all possible 16-clue grids by computer and showed that no 16-clue puzzle has a unique solution. The 17-clue puzzles in the expert tier are the hardest mathematically possible without becoming ambiguous. Most published expert puzzles use 18 to 22 clues for a slightly more enjoyable solve."
      ),
      createFAQ(
        "Can every Sudoku be solved without guessing?",
        "Easy through hard puzzles, yes - all standard solving techniques will reach the answer. Some expert puzzles published in newspapers genuinely require trial and error (pick a candidate, follow it through, and if it leads to a contradiction backtrack and try the other). The puzzles generated here always have a unique solution but expert difficulty may require chain logic that feels like guessing even though it is provably deductive."
      ),
      createFAQ(
        "How is the puzzle generated to ensure one solution?",
        "The generator first builds a complete valid solution by filling cells one at a time using a recursive backtracking algorithm with random number ordering. It then removes cells based on the chosen difficulty (e.g. 50 cells removed for medium). Because the same starting solution can technically support multiple removal patterns, the puzzle is regenerated if uniqueness checks fail. Every puzzle you download has exactly one valid solution."
      ),
      createFAQ(
        "Is Sudoku good for the brain?",
        "Studies on cognitive activity in older adults consistently show that puzzles like Sudoku help maintain processing speed and short-term memory, though they do not prevent dementia. For children, Sudoku develops logical reasoning, working memory and patience. The benefit is in the regular practice rather than any single solve - 15 to 20 minutes a few times a week is the typical recommendation."
      ),
      createFAQ(
        "Why is my puzzle showing red cells?",
        "Red shading means you have entered a number that does not match the puzzle's unique solution for that cell. The check happens silently as you fill cells - it is not telling you which clue is wrong, only that the current entry conflicts with the eventual answer. Toggle Show Solution to see the correct number, or use the Hint button to fill one random empty cell with the correct value."
      ),
    ],
    relatedTools: [
      { slug: "maths-worksheet-generator", label: "Maths Worksheet Generator" },
      { slug: "dice-roller", label: "Dice Roller" },
      { slug: "random-number-generator", label: "Random Number Generator" },
    ],
  },

  "secret-santa-generator": {
    sections: [
      createAnswerFirstSection(
        "How Secret Santa Works (and How This Generator Handles the Awkward Bits)",
        "Secret Santa needs a minimum of 3 people. Anything fewer and the maths breaks: with 2 people, both \"draw\" each other and the secret is gone. The generator shuffles the participant list, pairs each giver to the next person in the shuffled order, and uses the budget you set (default £25) to display on every assignment card.",
        "The reveal-one-at-a-time interface is the key feature for in-person Secret Santas where one person organises but everyone wants to keep their own match secret. Each participant clicks Reveal next to their own name, sees who they are buying for, then clicks Hide before passing the screen to the next person. Nobody sees anyone else's match. For remote Secret Santas (everyone in different cities), download the JPG and crop it so each person only sees their own line, or use a private message to send each person their assignment individually."
      ),
      createAnswerFirstSection(
        "Exclusions: How to Stop Couples Drawing Each Other",
        "The exclusions field handles the most common organiser headache: stopping spouses, siblings or housemates from drawing each other. Type one pair per line in the format \"Alice, Bob\" or \"Alice - Bob\" and the algorithm will retry the assignment up to 100 times until it finds a valid arrangement that respects every exclusion.",
        "There is a maths limit to this. With 5 participants and 4 exclusion pairs, you may have over-constrained the problem and no valid arrangement exists. The tool alerts you with \"Could not generate valid assignments\" if this happens. The fix is usually dropping one exclusion (the rule that the youngest cousin cannot draw the oldest cousin probably matters less than the spouse rule). For a workplace Secret Santa with 8 people, two or three exclusion pairs is fine; for a family of 6 with 4 exclusion pairs you are likely going to need to compromise."
      ),
      createAnswerFirstSection(
        "What Budget Should You Set for Secret Santa?",
        "The UK Secret Santa average sits at £15 to £25 in workplaces and £20 to £40 in family settings, based on John Lewis and Argos buying patterns. The £25 default in the generator is the workplace sweet spot: low enough not to exclude anyone on a tight budget, high enough to buy something thoughtful rather than a token chocolate.",
        "Two practical rules: pick a number that makes sense for the lowest-earning person in the group (a £50 budget shuts out a Christmas-temp colleague), and always include both a cap and a floor - \"£20 budget, £15 minimum\" stops anyone from cheaping out with a £3 mug. The generator's reveal screen shows the budget on every assignment so the recipient never wonders if their £25 gift was generous or the cheapest in the bag. If your group includes both adults and children, run two separate Secret Santas with different budgets rather than mixing. The [advent calendar activity generator](/advent-calendar-activity-generator) and [party bag checklist](/party-bag-checklist-generator) cover the surrounding Christmas planning."
      ),
    ],
    faqs: [
      createFAQ(
        "How many people do you need for Secret Santa?",
        "Three is the absolute minimum. Below that, everyone knows who has them. Five to ten is the comfortable range for an office or family group: enough that the secret holds, small enough that everyone gets a thoughtful gift. Above 15, consider running two parallel Secret Santas (e.g. one per office floor or one per family branch) so people are gifting to someone they actually know."
      ),
      createFAQ(
        "Can two people draw each other in Secret Santa?",
        "The classic algorithm prevents this by arranging participants in a single circular shuffle - each person gives to the next person in the circle, so reciprocal pairs are mathematically impossible. Some Secret Santa rules deliberately allow reciprocal pairs (more random, but means two people both shop for each other and the third pair feels left out). This generator uses the no-reciprocals approach by default."
      ),
      createFAQ(
        "Is Secret Santa anonymous after the reveal?",
        "It depends on the group's tradition. The classic format is anonymous through the gift opening, then everyone reveals their match at the end (\"I had Sarah!\"). Some groups stay anonymous indefinitely, especially if the gifts are exchanged remotely. Decide as a group before the draw - the generator does not enforce either approach, just generates the pairings."
      ),
      createFAQ(
        "Can I do Secret Santa online if everyone is in different places?",
        "Yes, and it is increasingly common since 2020. Generate the assignments here, then either screenshot each person's line and DM it to them privately, or use the Reveal feature with one organiser who messages each participant their match. Gifts get posted directly to recipients (Amazon wishlists make this easier) or exchanged at a Zoom call where everyone opens at once."
      ),
      createFAQ(
        "What if someone drops out after the draw?",
        "Re-run the draw with the new list. The generator takes 1 to 2 seconds; there is no penalty for redoing it. If you cannot tell anyone you are re-running it (because that would reveal the original draw), one organiser handles the reshuffle quietly and re-sends private messages. The original assignments are not stored anywhere - each generation is fresh."
      ),
    ],
    relatedTools: [
      { slug: "advent-calendar-activity-generator", label: "Advent Calendar Activity Generator" },
      { slug: "party-bag-checklist-generator", label: "Party Bag Checklist Generator" },
      { slug: "random-number-picker", label: "Random Name Picker" },
    ],
  },

  "alien-name-generator": {
    sections: [
      createAnswerFirstSection(
        "Six Alien Archetypes, Picked in One Click",
        "The generator builds a complete alien character from one of 6 archetypes: warrior, scientist, diplomat, hive-mind, shapeshifter or explorer. Each archetype draws from its own pool of roughly 7 to 8 names, 6 species, 6 homeworlds, 6 technologies and 6 culturally appropriate greetings, so the same archetype can produce hundreds of distinct combinations before anything starts to feel familiar.",
        "Picking warrior gives you names like Zyx'thal or Throm'dex paired with species such as the Krell Dominion or the Vendral Horde. Picking diplomat instead swaps that out for Syx'mara of the Harmonious Alliance, greeting you with \"may our words build bridges\". The point is that the tone shifts with the archetype, so a sci-fi short story needing one menacing antagonist and one peaceful ambassador can pull both from the same tool without them sounding identical."
      ),
      createAnswerFirstSection(
        "Using Alien Names for D&D, Starfinder and Homebrew Sci-Fi",
        "Game masters running Starfinder, Stars Without Number or a sci-fi reflavour of D&D need NPC names on the spot when players ask \"who is the cantina owner\". The 5-second turnaround here beats flipping through a sourcebook. Each result includes a homeworld and a piece of signature technology, which is usually enough hook for a 20-minute encounter.",
        "Hive-mind names come out collectively (\"The Connected Many\", \"Distributed Entity\") rather than as individual people, which is genuinely useful when the party meets a Borg-style faction and you need it to feel different from a regular alien crew. The shapeshifter pool leans on form-fluid names like Morph'vor and Flux'eon. If you want backstory rather than just a name, the [Fantasy Tavern Name Generator](/fantasy-tavern-name-generator) handles the watering-hole side of your campaign and the [Wizard Name Generator](/wizard-name-generator) covers the magical NPCs."
      ),
    ],
    faqs: [
      createFAQ(
        "Will this generator give me the same alien twice?",
        "Eventually, yes. Each archetype has a pool of around 7 names crossed with 6 of each other field, so the maths works out to a few hundred unique combinations per archetype. For most short stories or RPG campaigns that is more than enough; if you need genuinely fresh material after generating 30 or 40 aliens of the same type, switching archetype gives you a clean new pool."
      ),
      createFAQ(
        "Can I use these alien names in published fiction?",
        "Yes. The names and species are randomly assembled from common sci-fi vocabulary (think apostrophe-heavy syllables, militaristic empire titles, void-and-prime locations) and are not lifted from any single existing franchise. If a result happens to closely match a published name, regenerate to get a different combination before publishing."
      ),
      createFAQ(
        "What is the difference between the warrior and hive-mind options?",
        "Warrior produces individual aliens with personal honour codes, weapon-themed tech and combat-focused greetings. Hive-mind produces collective entities (the names sound plural by design - \"The Unified We\", \"Overmind Kael\") with assimilation-themed tech and unsettling group greetings like \"resistance is discouraged\". Pick warrior for one-on-one antagonists, hive-mind when the party needs to face a faceless faction."
      ),
      createFAQ(
        "Does the generator work for naming alien planets?",
        "Each result includes a homeworld (such as Nebula Prime, Knowledge Nexus, Waypoint Zero or Liquid Surface Nine) which doubles as a planet name. If you only want planet names, generate a few aliens and just use the homeworld field. The explorer archetype tends to produce the most varied location names because its pool leans heavily on cartography vocabulary."
      ),
    ],
    relatedTools: [
      { slug: "fantasy-tavern-name-generator", label: "Fantasy Tavern Name Generator" },
      { slug: "wizard-name-generator", label: "Wizard Name Generator" },
      { slug: "pirate-ship-name-generator", label: "Pirate Ship Name Generator" },
    ],
  },

  "astrology-birth-chart": {
    sections: [
      createAnswerFirstSection(
        "Birth Chart Basics: Sun Sign, Element and Ruling Planet",
        "Your birth date drops you into one of the 12 Western zodiac signs, each tied to one of 4 elements (Fire, Earth, Air or Water) and one ruling planet. The tool pulls all this from your month and day in a single click, then adds the Chinese zodiac if you also enter your birth year. No account needed, no email asked for.",
        "An Aries born on 25 March, for example, is a Fire sign ruled by Mars with lucky number 9, lucky colour Red and lucky day Tuesday. The interface bundles all that with a list of 5 personality traits, 4 most-compatible signs and 3 challenging matches. It is faster than the typical \"sign up to see your full chart\" sites and does not pretend the result is destiny."
      ),
      createAnswerFirstSection(
        "Compatibility, Elements and the Chinese Zodiac Layer",
        "Compatibility in classical Western astrology is mostly elemental: Fire signs (Aries, Leo, Sagittarius) tend to get on with other Fire and Air signs, Earth signs (Taurus, Virgo, Capricorn) pair best with Earth and Water. The tool surfaces the 4 most compatible and 3 most challenging signs for whichever sun sign you generate, so you can quickly check whether you and your partner are theoretically a Fire-Air match or a Cancer-Capricorn standoff.",
        "Adding a birth year unlocks the Chinese zodiac on top, which runs on a 12-year cycle of animals (rat, ox, tiger, rabbit, dragon, snake, horse, goat, monkey, rooster, dog, pig). 1990 is the Year of the Horse; 1988 is the Dragon. The two systems disagree often (a Western Aries can be a Chinese Rabbit) which is part of the fun. Treat the whole thing as a personality conversation starter rather than a forecast. For numerology-based readings the [Numerology Calculator](/numerology-calculator) covers the same date with a different lens."
      ),
    ],
    faqs: [
      createFAQ(
        "What if my birthday falls on a cusp date?",
        "The tool uses fixed date ranges (Aries is Mar 21 to Apr 19, for instance), so birthdays right on the boundary always get assigned to one specific sign. In practice cusp dates can shift by a day depending on time zone and birth year, but the assignment here matches the standard tropical zodiac that most popular astrology articles use. If you want a more precise chart that includes Moon and Rising signs, you would need exact birth time and location, which this tool does not collect."
      ),
      createFAQ(
        "Is astrology actually accurate?",
        "There is no peer-reviewed scientific evidence that birth date predicts personality or life events, and double-blind studies have repeatedly failed to support astrological claims. Most people who enjoy astrology treat it as a reflective framework rather than a forecast, similar to a personality questionnaire. This tool is built for that reflective, entertainment use; the wording leans helpful and conversational rather than predictive."
      ),
      createFAQ(
        "How is the Chinese zodiac year calculated?",
        "The tool uses a simple modular calculation: take your birth year minus 1900, divide by 12, and the remainder maps to one of the 12 animals. This treats 1 January as the start of the year, which is technically incorrect for Chinese astrology (it should follow the lunar new year, falling between mid-January and mid-February). Anyone born in January or early February should double-check against the actual lunar new year date for that year."
      ),
      createFAQ(
        "Can I find out my Moon and Rising sign here?",
        "Not in this tool. Moon and Rising signs require your exact birth time (down to the minute) and birth location, and they involve calculating planet positions for that moment. This calculator stays simple and only computes Sun sign and Chinese zodiac. For a full natal chart with Moon and Rising you would need a dedicated astrology service that asks for birth time."
      ),
    ],
    relatedTools: [
      { slug: "daily-horoscope", label: "Daily Horoscope" },
      { slug: "numerology-calculator", label: "Numerology Calculator" },
      { slug: "fortune-teller", label: "Fortune Teller" },
    ],
  },

  "charades-generator": {
    sections: [
      createAnswerFirstSection(
        "Five Categories, Three Difficulty Settings, Built-In Timer",
        "The generator pulls prompts from 5 themed pools (Movies, TV Shows, Animals, Actions, Objects) with 20 prompts in each, giving 100 ready-to-act items. Difficulty controls the timer length only: Easy gives you 90 seconds per round, Medium 60 seconds, Hard 45 seconds. The prompts themselves are drawn from the same pool either way, so swapping difficulty mid-game just adjusts the pace.",
        "A typical pool item looks like \"The Lion King\" (Movies), \"Brooklyn Nine-Nine\" (TV), \"Sloth\" (Animals), \"Brushing teeth\" (Actions) or \"Rocket\" (Objects). The Hard timer is the most useful for adult party games because 45 seconds genuinely tests how quickly the actor can convey something abstract. For kids' parties Easy at 90 seconds gives them room to think before the pressure builds."
      ),
      createAnswerFirstSection(
        "How to Run a Round Without an Argument",
        "Split into 2 teams of 3 to 5 people. One person from Team A pulls a prompt by clicking Get Prompt, looks at it without showing teammates, then clicks Start Timer and acts. Their team has the timer's worth of seconds to guess. If they get it, point to Team A; if not, the prompt resets at the end of the round. Alternate teams.",
        "The classic charades disputes are about gestures (no pointing at objects in the room, no spelling letters, no mouthing the word). Decide those rules before round 1 and stick to them. Round Complete shows a green panel with Next Round and End Game buttons, so the host does not have to remember whose turn is next. The Download JPG option saves the current category's full word list as a printable sheet, which is useful for backup if your phone battery dies mid-party. For a wider party-game shortlist try [Truth or Dare](/truth-or-dare) or [Never Have I Ever](/never-have-i-ever)."
      ),
    ],
    faqs: [
      createFAQ(
        "How many people do you need to play charades?",
        "Four is the practical minimum (two teams of 2). The sweet spot is 6 to 10 people split into two teams, because that gives each player at least 2 turns over a half-hour game and keeps everyone involved between rounds. Above 12 it is worth running 3 teams to keep waiting time short, or splitting into two parallel games."
      ),
      createFAQ(
        "What is the standard time limit for a charades round?",
        "60 seconds is the traditional standard, which is what the Medium setting here uses. Easy stretches it to 90 seconds for younger players or unfamiliar prompts. Hard tightens it to 45 seconds, which is the unofficial competitive length used in pub charades nights. If your group is doing well you can drop to 30 seconds without setting it up - just stop the timer manually."
      ),
      createFAQ(
        "Can I add my own custom charades words?",
        "The generator does not currently accept custom word lists; it draws from a fixed pool of 100 prompts. If you need themed prompts (e.g. all 1980s films or all British TV) the simplest workaround is to write them on paper slips beforehand and mix them in. The downloadable JPG of the current category list is meant to act as a fallback printable when you want to play offline."
      ),
      createFAQ(
        "Is charades good for kids' parties?",
        "Yes, the Animals category in particular works well for ages 5 and up because most of the 20 animals are easy to mime (giraffe, snake, kangaroo, penguin) and visually obvious to guess. Set difficulty to Easy for the 90-second timer and stick to Animals or Actions; the TV and Movies pools assume the player has seen the show, which younger kids often have not."
      ),
    ],
    relatedTools: [
      { slug: "truth-or-dare", label: "Truth or Dare" },
      { slug: "never-have-i-ever", label: "Never Have I Ever" },
      { slug: "trivia-quiz", label: "Trivia Quiz" },
    ],
  },

  "coin-flip": {
    sections: [
      createAnswerFirstSection(
        "Flip 1 to 10 Coins, Track Every Result",
        "Set the number of coins between 1 and 10, hit Flip Coin, and the tool generates fresh heads/tails results using JavaScript's Math.random function. Single flips work for quick yes/no decisions; flipping all 10 at once gives you a snapshot of the heads-vs-tails ratio in a small sample. Each batch is added to a flip history that keeps your last 10 sessions in view.",
        "The animation lasts about 600 milliseconds, which is long enough to feel like a real flip without slowing down repeated decisions. Heads and tails counters update beneath each batch so you can see at a glance whether your last 10 coins skewed 7H:3T or 4H:6T. Random variance is common in small samples; over a true 50/50 process you should expect to see runs of 4 or 5 of the same result without anything being wrong."
      ),
      createAnswerFirstSection(
        "When You Actually Need a Coin Flip Online",
        "The everyday use is tie-breaking: deciding who goes first in a board game, which restaurant to pick, whose turn it is to take the bins out. The tool replaces fishing for a real coin and is genuinely faster than asking a smart speaker. Friends-group decisions and remote work calls (\"flip a coin to pick the next sprint demo\") are the most common reasons people pull this up.",
        "Slightly less obvious uses: probability lessons in primary maths classrooms (flip 100 times in batches of 10 and discuss the variance), rock-paper-scissors substitutes when one of you has covered hands, and quick board-game initiative checks. The 10-coin batch is also useful for resolving multi-way decisions: assign heads to one option and tails to another, then count majorities. For weighted choices (where 2 of 3 options are more likely), use [Spin the Wheel](/spin-the-wheel) instead."
      ),
    ],
    faqs: [
      createFAQ(
        "Is an online coin flip actually random?",
        "It uses pseudo-random numbers from your browser's Math.random function, which is more than uniform enough for casual decisions but is not cryptographically random. For the practical purpose of \"tails or heads, who goes first\" the bias is statistically undetectable. For anything that needs verifiable fairness (legal coin tosses, paid competitions) you should use a hardware random number generator or a witnessed physical coin."
      ),
      createFAQ(
        "Why does it flip 10 coins instead of just one?",
        "Single flips cover the basic decision case. Flipping multiple coins at once is genuinely useful for class probability demos (showing that 10 flips often produce 6:4 splits, not the textbook 5:5), for splitting tasks across a team (heads = task A, tails = task B), and for breaking ties when there are 3 or more options to choose between. Capping at 10 keeps the result grid readable on a phone screen."
      ),
      createFAQ(
        "Can I save the flip results?",
        "The tool keeps an automatic in-session history of your last 10 flip batches, displayed below the current result with the heads-to-tails count for each. The history clears when you reload the page; there is no save-to-file option because the data is so small. If you need a permanent record (research, classroom data) screenshot the history before refreshing."
      ),
      createFAQ(
        "What are the odds of flipping the same side 10 times in a row?",
        "Roughly 1 in 1,024 (which is 2 to the power of 10, or about 0.1%). It will happen if you flip the tool enough times, and it does not mean the random number generator is broken. The probability of getting at least 5 heads in a row across 100 flips is actually very high - around 80% - because there are so many overlapping windows where a streak could start."
      ),
    ],
    relatedTools: [
      { slug: "dice-roller", label: "Dice Roller" },
      { slug: "random-number-generator", label: "Random Number Generator" },
      { slug: "spin-the-wheel", label: "Spin the Wheel" },
    ],
  },

  "couples-quiz-generator": {
    sections: [
      createAnswerFirstSection(
        "Sweet, Funny or Spicy: Pick the Right Tone for Your Audience",
        "The generator pulls from 3 separate question banks - Sweet & Romantic, Funny & Cheeky and Spicy & Intimate - and lets you set the round length to 10, 15 or 20 questions. Sweet questions are the safe default for an anniversary dinner or family-present hen do; Spicy is for a more private date night and includes questions you would not want to read out at the wedding rehearsal.",
        "Tone matters more than people expect. A hen do in front of mum and aunties needs Sweet or Funny, never Spicy. A relationship-anniversary night in needs whichever tone matches your partner's sense of humour. The relationship type setting (new couple, long-term 1-5 years, married 5+) does not change the questions but does flag the slider as a reminder that brand-new couples will struggle with the long-term-memory questions in any of the banks."
      ),
      createAnswerFirstSection(
        "Mr & Mrs Style Scoring, Without the Spreadsheet",
        "Run the quiz in two passes. Click Partner 1's Answers, partner 1 fills in their guesses about partner 2 on the screen. Then switch tab to Partner 2's Answers and they do the same about partner 1. Click Show Answers when both are done, compare against what each person said for themselves, and award 1 point per correct or near-correct guess.",
        "The classic Mr & Mrs hen do format runs the partner who is not present being asked the questions earlier in the day, with their answers written down for the bride to guess against in front of the group. This generator covers the digital version of that, which works well for couples doing the quiz together at home. Print the questions via Download JPG if you want a paper-and-pen version for an in-person party. The [Who Knows Me Best](/who-knows-me-best) tool runs the same scoring style for friend groups rather than couples."
      ),
    ],
    faqs: [
      createFAQ(
        "How many questions should we use for a hen do?",
        "10 to 15 works for most hen dos. Twenty starts to drag once you factor in the bride reading each question, the maid of honour comparing answers, and the inevitable laughter. If the questions are being mixed with games, drinks and other activities, stick at 10. If the quiz is the main event of an evening, 15 with a Funny tone usually fills 30 to 40 minutes."
      ),
      createFAQ(
        "What is the difference between sweet, funny and spicy questions?",
        "Sweet leans on relationship-history nostalgia (first date, favourite memory together, what attracted you). Funny is more cheeky and observational (which celebrity does your partner most resemble in the morning, weirdest habit). Spicy is the genuinely intimate end - it is fine for a private date night but is not safe for any setting with parents or in-laws present. Pick based on who is in the room."
      ),
      createFAQ(
        "Can we add our own custom questions?",
        "Custom questions are not currently supported - the generator pulls only from its three pre-written banks. The downloadable JPG is plain enough that you can print it and write extra questions in pen. For a larger custom-question game, the [Pub Quiz Generator](/pub-quiz-generator) supports themed rounds that you can repurpose for couples-style trivia."
      ),
      createFAQ(
        "Does the quiz work for new couples or only long-term partners?",
        "It works for both, but the question pools assume a few months of shared history. Couples in the first 6 weeks together will struggle with questions about parents, careers and childhood, which is most of the Sweet bank. New couples generally have a better time with the Funny tone, which leans on opinions and observations rather than long-term memory."
      ),
    ],
    relatedTools: [
      { slug: "who-knows-me-best", label: "Who Knows Me Best" },
      { slug: "hen-do-planner", label: "Hen Do Planner" },
      { slug: "wedding-speech-outline-generator", label: "Wedding Speech Outline Generator" },
    ],
  },

  "crystal-ball-fortune": {
    sections: [
      createAnswerFirstSection(
        "Five Themed Fortune Pools, One Glowing Ball",
        "Pick one of 5 question themes (Love & Relationships, Money & Abundance, Career & Success, Travel & Adventure, Personal Growth) and the crystal ball animates for about 1.8 seconds before revealing a themed message from a pool of 7 written specifically for that category. Click Ask Again to draw a different fortune from the same pool, or pick a new theme to switch the vibe.",
        "Each pool has its own register. Career fortunes lean professional (\"a collaboration brings professional success beyond what you imagined alone\"); Travel fortunes promise journeys; Love fortunes lean toward connection language. The ball glows during the gazing animation and then settles into a slow float. It is a 30-second novelty rather than a daily ritual, but the themed pools mean you can keep coming back without seeing the same line every visit."
      ),
      createAnswerFirstSection(
        "Where the Crystal Ball Fits Among Other Novelty Fortune Tools",
        "If you want a yes/no answer to a specific question, the [Magic 8 Ball](/magic-8-ball) is the right tool - it gives you binary verdicts. The crystal ball here is open-ended, returning a 1-line piece of guidance rather than a definitive answer. Use it the way you might use a daily inspiration card: ask a question in your head, gaze, read what comes up, and decide whether it nudges you somewhere useful.",
        "The full novelty-divination cluster includes the [Tarot Card Reader](/tarot-card-reader) for 3-card or 1-card spreads with traditional meanings, and the [Fortune Teller](/fortune-teller) for the colour-and-number paper-cootie-catcher version. None of them claim predictive accuracy. They exist for fun, for a quick procrastination break, or as conversation prompts at parties; the visions-revealed history at the bottom keeps your last 10 fortunes if you want to scroll back and see whether anything actually came true."
      ),
    ],
    faqs: [
      createFAQ(
        "Are crystal ball fortunes real predictions?",
        "No, and this tool does not claim they are. The fortunes are pre-written messages randomly drawn from a pool of 7 per category. There is no astrological calculation, no birth-date math and no AI generation behind them; they are essentially a themed inspiration deck. Treat them as conversation prompts or reflective starters, not as forecasts about your week."
      ),
      createFAQ(
        "How is the fortune chosen?",
        "When you click a category, the tool waits 1.8 seconds for the gazing animation, then picks one fortune from that category's pool of 7 using JavaScript's Math.random function. Two consecutive asks of the same category can return the same fortune; that is expected behaviour given the small pool. Switching categories pulls from a fresh pool of 7."
      ),
      createFAQ(
        "Can I ask the crystal ball a specific question?",
        "Hold a question in mind before you pick a category, then read whichever fortune comes up and consider whether it speaks to your question. The tool itself has no input field for typing the question - it only takes the category click - so the question stays private. This mirrors how physical crystal-ball gazing works in folklore: ambient prompt, personal interpretation."
      ),
      createFAQ(
        "Does the visions revealed history save between sessions?",
        "No, the history only persists while the page is open. It clears when you refresh or close the tab; nothing is sent to a server or saved to your account. If you want to keep a particular fortune, screenshot it before you reload."
      ),
    ],
    relatedTools: [
      { slug: "magic-8-ball", label: "Magic 8 Ball" },
      { slug: "fortune-teller", label: "Fortune Teller" },
      { slug: "oracle-card-reader", label: "Oracle Card Reader" },
    ],
  },

  "dj-name-generator": {
    sections: [
      createAnswerFirstSection(
        "Pick a Genre, Get a Stage Name in One Click",
        "The generator covers 5 dance-music genres (House, Techno, Dubstep, Trance, Drum and Bass) with 9 to 10 names per genre. Each result bundles the DJ name with a signature sound description, a hometown that fits the scene (Berlin and Cologne for techno, London and Bristol for DnB), and a dream festival the DJ would headline. Click Generate Another to pull a fresh combination from the same pool.",
        "Each genre has its own naming logic. House names lean atmospheric (DJ Velvet, DJ Mirage, DJ Aura). Techno names go harder and shorter (DJ Onyx, DJ Cipher, DJ Hexcore). Dubstep names use bass and impact words (DJ Bassquake, DJ Subsonic). Trance names reach for cosmic vocabulary (DJ Ethereal, DJ Stardrift). DnB names often use jungle-revival references like DJ Amen or DJ Recoil that nod to the genre's history."
      ),
      createAnswerFirstSection(
        "Using a Generated Name for Real Sets vs Just for Fun",
        "If you are picking a working DJ name, the generator is a brainstorming tool rather than a final answer. Run it 5 to 10 times, screenshot the names you like, and check Beatport, Discogs and Instagram for whether any other artist already uses the name. \"DJ Pulse\" or \"DJ Horizon\" are likely already taken; combinations like \"DJ Stardrift\" are fresh enough that the search comes up empty in most cases.",
        "For stories, screenplays, party invites or fictional radio shows, the generator is a near-instant solution. The dream-festival field gives you a free worldbuilding hook (your character's dream of headlining Tomorrowland, Berghain or EDC). Pair it with the [Pop Star Name Generator](/pop-star-name-generator) for a vocalist or the [Band Name Generator](/band-name-generator) if your DJ has a live act."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I use a generated DJ name professionally?",
        "Yes, but always check that no other working artist already uses the name before you put it on a release or a flyer. The generator pulls from common dance-music vocabulary and some combinations will already be in use. Search the candidate name on Beatport, SoundCloud, Discogs and Instagram before committing; if the top results are all your candidate name belonging to someone else, regenerate."
      ),
      createFAQ(
        "Why are the hometown options different per genre?",
        "Dance music has strong regional identities. Detroit is the historical home of techno; Berlin is its modern capital; Bristol and London anchor UK bass and DnB; Ibiza is house-and-trance central. The hometowns in each genre's pool reflect those scenes so the generated profile feels authentic to the genre rather than just randomly assigned."
      ),
      createFAQ(
        "What is the difference between a DJ name and a producer name?",
        "Functionally they are the same thing in most modern dance music; the same artist often DJs sets and produces tracks under one name. The names this generator produces work for either role. If you specifically want a producer-only alias (which sometimes uses the artist's real first name plus a single-word stage element), this tool is less suited than a custom rap-name or alter-ego generator."
      ),
      createFAQ(
        "Are dubstep and drum and bass really separate genres?",
        "Yes, although they share UK origins and bass-heavy production. Dubstep typically sits at 140 BPM with halftime drums and heavy wobble bass; drum and bass runs at 170 to 180 BPM with fast breakbeats and a different feel. The generator keeps them in separate pools so the names and signature-sound descriptions match the genre's actual sonic identity."
      ),
    ],
    relatedTools: [
      { slug: "rapper-name-generator", label: "Rapper Name Generator" },
      { slug: "pop-star-name-generator", label: "Pop Star Name Generator" },
      { slug: "band-name-generator", label: "Band Name Generator" },
    ],
  },

  "dnd-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "Three Starter Tiers: £43 Beginner, £196 Intermediate, £316 Collector",
        "The calculator ships with 3 preset tiers based on what is actually needed to play. Beginner (£43) covers the Player's Handbook (£30), a basic dice set (£8) and pencils and paper (£5) - enough to join a campaign someone else is running. Intermediate (£196) adds the Dungeon Master Guide and Monster Manual (essential to run your own game), plus a DM screen, battle mat, miniature and premium dice. Collector (£316) tops it off with two extra rulebooks (Xanathar's Guide and Tasha's Cauldron), a 5-miniature pack, terrain tiles and a £30/year D&D Beyond subscription.",
        "Every line item is editable. Real prices vary - second-hand rulebooks on eBay regularly go for £15 to £20, dice sets dip to £5 in pound-shop multibuys, and Wizards of the Coast occasionally bundles core books for £75 instead of £90 individually. Update the prices in the left panel to match what you are actually paying and the totals recalculate as you type."
      ),
      createAnswerFirstSection(
        "Cost-Per-Session: The Number That Reframes the Hobby",
        "Set the sessions-per-year field to your honest estimate (the default of 20 assumes a fortnightly campaign that sometimes misses) and the calculator divides total annual cost by that number. The Beginner tier at 20 sessions works out to £2.15 per session, which is genuinely cheaper than a pint at most pubs. The Collector tier at 20 sessions is around £15.80 per session in year one but drops dramatically in year two when only the £30 D&D Beyond renewal recurs.",
        "This per-session view is the answer to the \"isn't D&D expensive\" question. Compared to other Friday-night options (cinema at £14, restaurant meal at £25, gig ticket at £40 plus drinks) even the maxed-out Collector tier is competitive. For comparing against other hobbies, the [MTG Deck Cost Calculator](/mtg-deck-cost) breaks down a Magic deck and the [Miniatures Cost Calculator](/miniatures-cost-calculator) costs out a Warhammer or Bolt Action army."
      ),
    ],
    faqs: [
      createFAQ(
        "Do I really need to buy the rulebooks?",
        "No. The Basic Rules PDF has been free on the official D&D website for years and includes everything needed to play (4 classes, 4 races, the core mechanics). One person at the table needs a copy of the actual Player's Handbook for full character options, and the DM benefits from the Dungeon Master Guide, but a brand-new player can run a level 1 character entirely from the free rules. That cuts the Beginner tier from £43 down to £13."
      ),
      createFAQ(
        "Is D&D Beyond worth the £30 a year?",
        "It is worth it if you play often enough that the digital character sheet and rules lookup save you time. For a fortnightly group running long campaigns, yes. For a one-off short campaign or a player who already has the physical books, probably not. The free tier of D&D Beyond gives you basic rules and one character; the £30 master tier unlocks full content sharing across a group, which only one player at the table needs to buy."
      ),
      createFAQ(
        "How does this compare to other tabletop RPGs?",
        "D&D's £30-per-rulebook structure is at the higher end. Pathfinder 2e is similar (£40 core book, but the Archives of Nethys website hosts all rules legally for free). Indie RPGs like Mausritel or Mörk Borg cost £20 to £25 for a single book that includes everything. If budget is tight, those are sensible alternatives to the £196 Intermediate tier here."
      ),
      createFAQ(
        "Why does the Collector tier need 5 miniatures?",
        "A typical D&D party has 4 to 6 players plus monsters. The Collector preset assumes the DM is buying enough mini variety to represent the party plus a small enemy roster. Custom-painted single mini packs cost £4 to £6 each at Games Workshop or Reaper, so the £25 line item covers either 5 unpainted plastics or one premium hand-painted figure. Cardboard standees from a free print-and-cut PDF can replace the lot for £0 if you would rather spend the budget on books."
      ),
    ],
    relatedTools: [
      { slug: "mtg-deck-cost", label: "MTG Deck Cost Calculator" },
      { slug: "miniatures-cost-calculator", label: "Miniatures Cost Calculator" },
      { slug: "hobby-cost-tracker", label: "Hobby Cost Tracker" },
    ],
  },

  "fortune-teller": {
    sections: [
      createAnswerFirstSection(
        "The Digital Cootie Catcher: Pick a Colour, Then Two Numbers",
        "The classic paper fortune teller (or cootie catcher) was a folded square of paper with colours on the outside, numbers on the inside, and fortunes hidden under the flaps. This tool runs the same flow digitally in 3 steps: pick 1 of 5 colours (Red, Blue, Green, Yellow, Purple), then 2 numbers from 1 to 10. The fortune you see is selected from a pool of 32 written messages using a hash of your colour and number choices, with a small random nudge added each time.",
        "The same combination of colour and numbers can return different fortunes on different attempts because of that random nudge - which is closer to how the paper version works in practice (the kid running the cootie catcher often skips a count or picks the next flap if the first one feels boring). If you want a less random, more theme-aligned version, the [Crystal Ball Fortune](/crystal-ball-fortune) lets you pick a specific topic before reading the fortune."
      ),
      createAnswerFirstSection(
        "Where This Beats the Paper Version",
        "Paper cootie catchers fall apart after 20 minutes of being passed around a primary-school playground. The digital version does not, and it gives you the journey display at the end (your colour-then-number-then-number visualised as 3 circles) which kids find satisfying. It is also genuinely useful for sleepover parties or rainy school holidays when you need 5 minutes of low-effort entertainment.",
        "The 32 fortunes are generic and positive (\"you will find true love in an unexpected place\", \"your hard work will pay off\") rather than predictive. The tool is overtly framed as entertainment - the about-this-tool note at the bottom calls it a paper cootie-catcher inspiration, not an oracle. For older kids and adults wanting something with a bit more theme, the [Magic 8 Ball](/magic-8-ball) is the natural step up because it answers a typed question with one of 20 classic responses."
      ),
    ],
    faqs: [
      createFAQ(
        "How do you actually fold a paper fortune teller?",
        "Take a square sheet, fold corner to corner both ways to mark the centre, then fold each corner into the centre. Flip it over and fold each new corner into the new centre. Slide your fingers under the four flaps. Write 4 colours on the outside, 8 numbers on the inside, and 8 fortunes under the inner flaps. The digital version here mimics the colour-then-number-then-fortune flow without the folding step."
      ),
      createFAQ(
        "Are the fortunes here actually random?",
        "Mostly. The fortune index is calculated from your colour name length, your two numbers, and a small random nudge of 0 to 9. That means the same colour-and-number combination can land on different fortunes if the random part lands differently. There are 32 fortunes in the pool, so even with the same starting choices you might see 2 or 3 different results across attempts."
      ),
      createFAQ(
        "Is this safe for children to use?",
        "Yes. The 32 fortunes are written to be uplifting and age-appropriate (themes of friendship, kindness, dreams coming true, hard work paying off). There is no input field where kids type questions and no AI involvement, so there is no chance of the tool returning anything unexpected. The interface is large-button friendly for younger players."
      ),
      createFAQ(
        "Can I get the same fortune twice?",
        "Yes - because the fortune pool has 32 entries and there is a random component to the selection, you will sometimes see a repeat. The shorter the session, the more likely it is. If you want to avoid a duplicate, just pick different colours and numbers on the next round; the variety in inputs spreads results across the pool more evenly."
      ),
    ],
    relatedTools: [
      { slug: "magic-8-ball", label: "Magic 8 Ball" },
      { slug: "crystal-ball-fortune", label: "Crystal Ball Fortune" },
      { slug: "tarot-card-reader", label: "Tarot Card Reader" },
    ],
  },

  "guess-the-name-game": {
    sections: [
      createAnswerFirstSection(
        "Generate 10 to 100 Numbered Entry Slips for Mystery-Item Games",
        "Type the name of the mystery item (the teddy bear at the school fair, the cake at the wedding, the doll at the church fete) and set the slip count anywhere from 10 to 100. The tool produces an organiser answer card showing the item name, plus a printable grid of numbered entry slips with blank lines for Your Name and Your Guess. Each slip is uniquely numbered which makes finding the winning guess fast.",
        "The default of 20 slips is right for most school summer fairs and church coffee mornings. Wedding receptions and larger fundraisers often get through 60 to 100 slips. Print at 85% to 90% browser zoom for the cleanest cut-line spacing on A4 - the printable preview hint says exactly that. The Download JPG button gives you a fallback image if you would rather email the slip sheet to a print shop than print at home."
      ),
      createAnswerFirstSection(
        "Running the Game on the Day",
        "Set up at the stall with the bowl, jar or table holding the mystery item, a pile of cut entry slips, a few pens, and an honesty box for the entry fee (most school fairs charge 50p or £1 per guess). Players write their name and guess on a slip and post it through a slot or drop it in a bowl. At the end of the event, sort the slips and find the closest guess.",
        "Common ways the game falls apart: 1) handwriting is illegible, so always provide pens with reliable ink and not pencil; 2) two people guess the exact same value, in which case the rule is usually first-slip-in wins or both win and split the prize; 3) people peek at others' slips, which the small slip size helps prevent. Keep the organiser answer card sealed in an envelope and only open it in front of witnesses at the reveal. For a complete kids' fair, pair this with the [Bingo Card Generator](/bingo-card-generator) for a printable bingo round."
      ),
    ],
    faqs: [
      createFAQ(
        "How many entry slips should I print for a school fair?",
        "20 to 30 covers a small classroom-level event. A whole-school summer fair needs 60 to 100, especially if the prize is appealing. As a rough rule, expect 1 in 5 to 1 in 10 attendees to enter; a 200-pupil school plus families means around 600 attendees, so plan for 60 to 120 slips. The tool caps at 100 per generation, so for very large events you can run two batches with different starting numbers (number the second batch 101 to 200)."
      ),
      createFAQ(
        "What is the difference between guess the name and guess the weight?",
        "Both are mystery-guessing fundraisers that use the same slip format. \"Guess the name\" works for an item with a personality (a teddy bear named Snuffles, a doll, a stuffed animal). \"Guess the weight\" works for cakes, jars of sweets or fruit baskets. The slip and the organiser card produced here work identically for both - just change the wording on the entry slip's prompt or write it in by hand."
      ),
      createFAQ(
        "Can I include a photo of the mystery item on the slip?",
        "Not in the digital generator currently. The tool produces text-only slips with the slip number, name field, guess field and a footer label. If you need a photo (which can boost engagement at fundraisers) print the slips here and the photo separately on coloured A4 to display at the stall, or paste a small photo into the JPG with any image editor before printing."
      ),
      createFAQ(
        "What happens if two people guess the same name and it is correct?",
        "The most common rule is first-slip-in wins, decided by the slip number (lower numbered slip wins because it was filled in first). The other common rule is split the prize equally between all correct guessers. Decide before the event starts and write the rule on the organiser answer card so you do not get caught out. Some larger fundraisers use a tie-breaker question (\"how many gummy bears in the jar\" with the closest answer winning)."
      ),
    ],
    relatedTools: [
      { slug: "bingo-card-generator", label: "Bingo Card Generator" },
      { slug: "raffle-ticket-picker", label: "Raffle Ticket Picker" },
      { slug: "random-name-picker", label: "Random Name Picker" },
    ],
  },

  "magic-8-ball": {
    sections: [
      createAnswerFirstSection(
        "How To Ask the Magic 8 Ball a Question",
        "Type your yes-or-no question into the box and tap the ball. It shakes for about a second and a half, then a triangular window glows with one of the 20 classic responses. The answer is biased the way the original toy is biased: 10 responses are positive (\"It is certain\"), 5 are neutral (\"Reply hazy, try again\"), and 5 are negative (\"Don't count on it\"). So roughly half the time the ball is on your side, which is part of why people keep asking.",
        "Phrasing matters more than people expect. \"Should I go for the promotion?\" gives you a clearer answer than \"Should I think about maybe going for the promotion?\" The ball ignores nuance. Your last ten answers stay in the history list in case you want to compare what the ball said yesterday with what it says today."
      ),
      createAnswerFirstSection(
        "What the 20 Classic Responses Actually Mean",
        "The original 1950s Mattel ball uses a 20-sided die floating in blue dye, each face printed with a phrase. Across hundreds of asks the answers trend close to 50% positive, 25% neutral, 25% negative, no matter what you ask.",
        "For low-stakes decisions (lunch, what to watch, whether to text someone back), it is a perfectly good random oracle that comes with built-in personality. For higher-stakes questions, try the [Coin Flip](/coin-flip) for binary choices or the [Fortune Teller](/fortune-teller) for a slightly more elaborate prediction."
      ),
    ],
    faqs: [
      createFAQ(
        "How many possible answers does the Magic 8 Ball have?",
        "Exactly 20. The original toy uses a regular icosahedron (a 20-sided die) suspended in blue liquid, one phrase per face. This online version uses the same 20 phrases in the same proportions: 10 positive, 5 neutral, 5 negative. Each has a 5% chance of appearing on any given shake."
      ),
      createFAQ(
        "Is the Magic 8 Ball actually random?",
        "Yes, this version uses JavaScript's built-in random number generator to pick one of the 20 responses with equal probability. Long-running claims that certain phrases come up more often are mostly confirmation bias."
      ),
      createFAQ(
        "Can I ask follow-up questions?",
        "Technically yes, the tool will not stop you. Traditionally though the rule is one question per topic. If the answer is \"reply hazy, try again\" or \"ask again later\", that is the one case where the ball is asking you to re-shake."
      ),
      createFAQ(
        "Why does the answer feel weirdly accurate sometimes?",
        "Because the brain is excellent at pattern-matching ambiguous statements onto its own situation, an effect psychologists call the Barnum effect. \"Outlook not so good\" can apply to almost anything, so when it lands on a question you secretly had doubts about, it feels like the ball read your mind. You read your own mind, and the ball gave you permission to admit it."
      ),
    ],
    relatedTools: [
      { slug: "coin-flip", label: "Coin Flip" },
      { slug: "fortune-teller", label: "Fortune Teller" },
      { slug: "tarot-card-reader", label: "Tarot Card Reader" },
    ],
  },

  "never-have-i-ever": {
    sections: [
      createAnswerFirstSection(
        "How To Play Never Have I Ever With This Tool",
        "Pick a category (innocent, adventurous, or spicy), set the number of players from 1 to 10, and tap Start. A statement appears on screen. Anyone who has done the thing taps their own player button to mark a point against themselves. Tap Next Statement and another one appears. The player with the most points at the end of the night has lived the most.",
        "The traditional drinking-game version uses a sip instead of a button tap. If you run it that way, two ground rules first: nobody has to drink if they would rather not, and nobody is allowed to ask follow-up questions about a sip without permission. The fun is the gentle reveal, not the interrogation. The tool itself is teetotal-friendly because it uses a tap counter, so it works just as well on a teen sleepover or a sober party."
      ),
      createAnswerFirstSection(
        "Choosing Innocent, Adventurous or Spicy",
        "Innocent covers everyday life: been camping, learned an instrument, tried sushi. Safe for any audience including kids and people you have just met. Adventurous covers travel and the kind of mildly chaotic behaviour that makes a good story: gone skydiving, been to a music festival. Spicy gets into mistakes and regrets: ghosted someone, lied to get out of trouble.",
        "The spicy category can get awkward fast with the wrong group. Read the room first. A long-running friend group will probably enjoy it; a work team-building event almost certainly will not. Hen and stag dos almost always end up in spicy by the third round. For a tamer alternative use [Truth or Dare](/truth-or-dare), which lets people opt into a dare instead of admitting to anything."
      ),
    ],
    faqs: [
      createFAQ(
        "How many players can play?",
        "The tool tracks scores for 1 to 10 players. Beyond 10 the screen gets crowded, so for larger groups split into two parallel games or use a written tally."
      ),
      createFAQ(
        "Is this safe to play with teens or kids?",
        "Stick to the innocent category and it works as a clean party game for ages 13 and up. The adventurous and spicy categories include themes that are not appropriate for younger players, so do not switch off innocent if kids are in the group."
      ),
      createFAQ(
        "Do I have to drink to play?",
        "No. The tool uses a tap-to-score system, so you can run it dry just as easily. If you do play as a drinking game, the rule should be that anyone can pass on any statement without being challenged."
      ),
      createFAQ(
        "What do I do if a statement does not apply to anyone?",
        "Skip it. Tap Next Statement and the tool pulls another from the same category. It is fine to pass on anything that lands flat or feels too personal for the room."
      ),
    ],
    relatedTools: [
      { slug: "truth-or-dare", label: "Truth or Dare Generator" },
      { slug: "would-you-rather", label: "Would You Rather" },
      { slug: "couples-quiz-generator", label: "Couples Quiz Generator" },
    ],
  },

  "number-picker": {
    sections: [
      createAnswerFirstSection(
        "How To Generate Random Numbers in a Range",
        "Set the minimum and maximum values, choose how many numbers you want (up to 1,000), and tap Generate. A list of random integers appears underneath. Two toggles change how the list is built: Allow Duplicates lets the same number appear more than once, and Sort Results returns the list in ascending order rather than the order it was drawn.",
        "Switch duplicates off when you need every result to be unique, like drawing 25 winners from 500 raffle tickets. Switch sorting on for a clean scannable list. If you ask for more unique numbers than fit in your range (100 numbers from 1 to 50), the tool returns the full range instead of looping forever."
      ),
      createAnswerFirstSection(
        "When You Need Bulk Numbers vs One at a Time",
        "Use this tool when you need a list. If you only need one number with a satisfying reveal animation, the [Random Number Picker](/random-number-picker) gives you a game-show style spin. This generator is built for bulk: up to 1,000 results in a single tap.",
        "Common uses: sample data for spreadsheets, lottery picks, one-off PINs, picking which 30 customers from a list of 500 to survey (duplicates off), or generating dice rolls for tabletop games. For numbers requiring cryptographic strength (banking, security keys, passwords you actually care about) use a dedicated password generator instead - this tool uses standard JavaScript randomness, fine for play but not for security."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the largest range I can use?",
        "The minimum and maximum can be any whole number, including negatives. JavaScript handles integers up to about 9 quadrillion accurately, so practical ranges all work without rounding issues. The list size is capped at 1,000 results per generation."
      ),
      createFAQ(
        "Can I generate decimal numbers?",
        "No, this tool only returns whole numbers (integers). For decimals, multiply by 10 or 100 before generating and divide afterwards (so for 1 to 10 with one decimal place, generate 10 to 100 and divide your results by 10)."
      ),
      createFAQ(
        "Why do I sometimes see fewer numbers than I asked for?",
        "If you turn off duplicates and ask for more numbers than your range allows, the tool returns the full range. Asking for 50 unique numbers between 1 and 20 returns all 20 numbers. Either widen the range or allow duplicates."
      ),
      createFAQ(
        "Is this random enough for a real raffle or competition?",
        "For informal raffles and prize draws yes, this is genuinely random and unbiased. For licensed gambling or any prize draw regulated by the Gambling Commission, use a dedicated audited random number service. The maths here is sound but it cannot prove its own fairness in a court."
      ),
    ],
    relatedTools: [
      { slug: "random-number-picker", label: "Random Number Picker" },
      { slug: "random-name-picker", label: "Random Name Picker" },
      { slug: "dice-roller", label: "Dice Roller" },
    ],
  },

  "oracle-card-reader": {
    sections: [
      createAnswerFirstSection(
        "How an Oracle Card Reading Works",
        "Think of a question or area of your life you want guidance on, then tap the deck. One card flips face-up with a name (such as \"Trust Yourself\" or \"Adventure Awaits\"), a short message, and an affirmation to take with you. Unlike a tarot deck, oracle cards do not follow a fixed structure, so each card stands alone rather than slotting into a position in a spread.",
        "Oracle decks differ from the 78-card Rider-Waite tarot: there is no Major Arcana or suit system, and the imagery is usually softer. Each card is meant to be read at face value (\"let go\", \"you are enough\") rather than interpreted through layered symbolism, making oracle a good entry point for anyone curious about cartomancy without learning the full tarot vocabulary."
      ),
      createAnswerFirstSection(
        "How To Use the Card You Drew",
        "Read the card name first, then the longer message, then the affirmation. The affirmation is the bit you carry with you for the day. Many people screenshot it and set it as a lock screen.",
        "Common practice is one card per morning, drawn before checking your phone. If a card feels confusing or unrelated, write it down anyway; sometimes the meaning becomes clear later in the day. For deeper multi-card readings with structure, try the [Tarot Card Reader](/tarot-card-reader) which offers one-card, three-card, and Celtic Cross spreads."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between oracle cards and tarot cards?",
        "Tarot has a fixed structure: 78 cards split into a 22-card Major Arcana and a 56-card Minor Arcana with four suits. Oracle decks have no fixed structure - any number of cards, any themes the deck creator chose. Oracle is more freeform and beginner-friendly; tarot has deeper tradition and more interpretive depth."
      ),
      createFAQ(
        "Can I draw more than one card?",
        "Yes, but the standard practice is one card per day or per question. Drawing five back-to-back tends to dilute the meaning of each. For a multi-card reading with structure (past-present-future, situation-action-outcome) the tarot reader is better suited."
      ),
      createFAQ(
        "Are these cards based on a particular oracle deck?",
        "The cards here are an original set written for general daily guidance, themed around growth, healing, love, career, and adventure. They are not licensed from a specific commercial deck, so the tool is free to use without copyright restrictions."
      ),
      createFAQ(
        "Do I need to believe in this for it to work?",
        "No, and most regular oracle users do not treat the cards as supernatural. The value is in the prompt, the same way journalling works whether you believe in the prompts. A card pulled at random gives your brain a frame to think within for the day."
      ),
    ],
    relatedTools: [
      { slug: "tarot-card-reader", label: "Tarot Card Reader" },
      { slug: "fortune-teller", label: "Fortune Teller" },
      { slug: "magic-8-ball", label: "Magic 8 Ball" },
    ],
  },

  "pub-quiz-answer-sheet-printer": {
    sections: [
      createAnswerFirstSection(
        "How To Print Answer Sheets for Quiz Night",
        "Type your team name (optional), set the number of rounds, and set the questions per round. The tool builds a printable answer grid with a numbered line for each question, a Score box at the end of each round, and a Total Score box at the bottom. Tap Download JPG to save a clean A4-sized image, then print one copy per team plus one for the host's marking pile.",
        "Standard pub quiz settings: 4 rounds of 10 questions for a 90-minute night, or 5 rounds of 8 for the same length. For a charity quiz with food breaks, drop to 3 rounds of 10. The sheet leaves space for a one-or-two-word answer, which is the right amount; longer lines tempt people to argue about \"close enough\". The watermark version is free; the premium PDF adds a tie-breaker box, picture round grid and round-title fields."
      ),
      createAnswerFirstSection(
        "What Goes On a Good Pub Quiz Answer Sheet",
        "A good answer sheet has four things: a team name field at the top, numbered lines grouped by round, a small score box per round so the host can mark and tally as they go, and a total score box at the bottom. This generator gives you all four.",
        "If you are using picture or music rounds, print those on a separate sheet (the [Music Round Generator](/music-round-generator) and the [Pub Quiz Generator](/pub-quiz-generator) both produce dedicated round sheets) since teams need different layouts. Hand out fresh sheets per round if your venue is loud and chaotic, otherwise one sheet per team for the whole quiz keeps paper waste down."
      ),
    ],
    faqs: [
      createFAQ(
        "How many rounds should a quiz have?",
        "Four rounds of 10 questions is the standard 90-minute pub night format. Three rounds of 10 works for quizzes under 75 minutes; five rounds of 8 gives more variety. Beyond five rounds attention starts to flag and marking takes too long."
      ),
      createFAQ(
        "Can I use this sheet for a kids' or school quiz?",
        "Yes, the format works for any age group. For under-10s drop to 3 rounds of 5 questions, since their attention span and writing speed are both lower. The team name field works just as well as a child's name field."
      ),
      createFAQ(
        "Does the sheet include space for a tie-breaker question?",
        "The free sheet has a Total Score box but no dedicated tie-breaker line. The premium PDF adds a tie-breaker box for a numerical answer (\"how many bricks in Buckingham Palace\") with a closest-to-correct-wins rule. Worth writing one even if you never use it."
      ),
      createFAQ(
        "Why should I print one sheet per team rather than one shared sheet?",
        "Two reasons: teams want to discuss in private without the next table reading their answers, and one sheet per team makes marking faster. Sharing a sheet only works for cooperative formats like family game night with one team."
      ),
    ],
    relatedTools: [
      { slug: "pub-quiz-generator", label: "Pub Quiz Generator" },
      { slug: "music-round-generator", label: "Music Round Generator" },
      { slug: "scattergories-list-generator", label: "Scattergories List Generator" },
    ],
  },

  "raffle-ticket-picker": {
    sections: [
      createAnswerFirstSection(
        "How To Draw Random Raffle Winners",
        "Set the total number of tickets sold (up to 10,000) and how many winners you want (up to 10 per draw). Tap Draw and the tool runs a brief animated shuffle, then displays the winning ticket number. The same number cannot win twice in the same session, so first prize, second prize and third prize all come out as different ticket numbers. Reset clears the history and starts a fresh draw.",
        "Under the hood the picker uses a Fisher-Yates shuffle, the standard algorithm for unbiased random selection. Every ticket from 1 to your total has an exactly equal chance of being drawn, and once a number has won it is removed from the pool. That matters for fairness: a less rigorous method without removing winners can let the same number win twice, which raffles are not allowed to do."
      ),
      createAnswerFirstSection(
        "What To Do If a Drawn Ticket Is Not Claimed",
        "Have a redraw rule written down before the event starts. Two common conventions: announce a 60-second window for the holder to come forward then redraw if the room is silent, or take three names per prize so you have backups. Either is fine, but you have to pick one in advance and tell the room.",
        "Pre-paid raffle ticket sales (school fairs, online community draws) usually award the prize and contact the winner afterwards. For door-prize raffles where you must be present to win, write \"present-to-win\" on the tickets and posters. The [Random Number Picker](/random-number-picker) works for the same job in a more game-show animated style if you want a bigger reveal moment."
      ),
    ],
    faqs: [
      createFAQ(
        "How does the picker make sure no number wins twice?",
        "When a ticket is drawn it is added to a used-numbers set, and the next draw skips any number already in that set. The Reset button clears the set so you can run a fresh raffle. This guarantees no duplicate winners within a single drawing session."
      ),
      createFAQ(
        "What is the largest raffle I can run with this?",
        "The total ticket count is capped at 10,000, which covers school fairs, charity events and most community draws. If you have sold more than 10,000 tickets you are running a regulated raffle that needs a Gambling Commission registration anyway, in which case the rules will require an approved drawing method."
      ),
      createFAQ(
        "Can I draw more than 10 winners?",
        "Per session, 10. To draw more, reset and draw again - the second session produces a fresh independent set of winners. For a draw of 50+ winners the [Number Picker](/number-picker) lets you generate up to 1,000 unique random numbers in one go."
      ),
      createFAQ(
        "Is this legal for a charity raffle?",
        "For small society lotteries and incidental non-commercial lotteries (school fairs, office raffles with modest prizes), this is a legitimate way to draw winners as long as the process is transparent and witnessed. For licensed lotteries with significant prizes, check your Gambling Commission permit; it will specify how the draw must be conducted."
      ),
    ],
    relatedTools: [
      { slug: "random-name-picker", label: "Random Name Picker" },
      { slug: "random-number-picker", label: "Random Number Picker" },
      { slug: "number-picker", label: "Number Picker" },
    ],
  },

  "random-name-picker": {
    sections: [
      createAnswerFirstSection(
        "How To Pick a Random Name From a List",
        "Paste names into the input box, one per line. The tool parses every non-empty line as a separate name and shows the count underneath the box. Tap Pick and a slot-machine-style animation flashes through your list for about a second and a half before landing on a winner. Remove Picked takes the chosen name off the list so the next pick draws from a smaller pool - useful when picking a sequence of winners (door prizes, secret-santa order, who reads next).",
        "Pasting from Excel, Google Sheets or Numbers works the same way as pasting from a text file. The tool strips empty lines automatically and trims whitespace, so a column from your spreadsheet works without reformatting. Names are stored only in the browser tab, never sent to a server, so a class register or staff list stays private."
      ),
      createAnswerFirstSection(
        "Common Uses: Classrooms, Teams, Decisions",
        "Teachers use this to call on students fairly without picking the same hands every lesson. The Remove Picked toggle is essential here, otherwise the same name keeps coming up because of clustering in random sequences. Office team leads use it to pick presenters or assign pair-coding partners; event hosts use it to draw door prizes from a guest list.",
        "Where this tool wins over the [Spin the Wheel](/spin-the-wheel) approach: longer lists (50+ names) are easier to scroll than to fit on a wheel, the animation is faster, and Remove Picked stops the same person winning every prize. Where the wheel wins: visual drama on a projector or stream. Use the wheel for stage moments, the picker for repeat draws."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I paste names from Excel?",
        "Yes. Copy a column of names from Excel, Google Sheets or Numbers, paste into the input box, and each row becomes one name. Empty rows are skipped automatically and surrounding whitespace is trimmed."
      ),
      createFAQ(
        "How do I stop the same name being picked twice?",
        "After a name is picked, tap Remove Picked. That name is removed from the active list, so the next pick draws from the smaller pool. Tap Reset to restore the full list when you start a new round."
      ),
      createFAQ(
        "Are my names saved or sent to a server?",
        "No. The list is held in the browser tab only and is cleared when you close the page or refresh. Nothing is uploaded, stored, or shared, which makes it safe for class registers and staff lists."
      ),
      createFAQ(
        "What is the maximum number of names I can paste?",
        "There is no hard cap, but the picker animation gets visibly slower past 1,000 names. For lists under 500 names performance is instant. For a 5,000-person draw the [Number Picker](/number-picker) is faster - assign each person a number first, then draw the number."
      ),
    ],
    relatedTools: [
      { slug: "spin-the-wheel", label: "Spin the Wheel" },
      { slug: "raffle-ticket-picker", label: "Raffle Ticket Picker" },
      { slug: "random-number-picker", label: "Random Number Picker" },
    ],
  },

  "random-number-picker": {
    sections: [
      createAnswerFirstSection(
        "How To Use the Animated Number Picker",
        "Choose a preset (1-10, 1-100, 1-1000) or set a custom min and max. Tap Pick and the display rolls through random numbers for about three seconds before slowing and landing on the winner. The No Repeats toggle removes the picked number from the pool so the next pick is guaranteed to be a different one, until every number in your range has been picked.",
        "The animation matters more than people expect. A static \"here is your number\" feels arbitrary; a spinning, decelerating display makes the result feel earned. The tool runs a 2-second fast spin followed by 8 deceleration steps mimicking the way a roulette ball behaves before it lands. Mathematically the result is no more random than picking once, but psychologically the reveal is satisfying and the room watches the screen instead of arguing about who picks next."
      ),
      createAnswerFirstSection(
        "When To Use This vs the Number Picker vs a Dice Roller",
        "Use this picker for one number with a reveal, in front of an audience: classroom \"who answers next\", office name-out-of-a-hat, family game night for a board-game starting tile. Use the [Number Picker](/number-picker) when you need a list of many numbers at once with no animation.",
        "For physical dice ranges (D4, D6, D8, D12, D20) the [Dice Roller](/dice-roller) rolls multiple dice at once. This number picker is more general-purpose: any custom range, integers only. The No Repeats toggle is the killer feature for classroom use - the same student does not get called twice in a row, and you cycle through everyone fairly across a 30-person register before any name comes up again."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the largest range I can pick from?",
        "The min and max can be any integers including negatives. The 1-1000 preset is the largest preset, but you can type any custom range. For ranges over 100,000 the animation may not look smooth, but the picked result will still be uniformly random."
      ),
      createFAQ(
        "Does No Repeats work across page refreshes?",
        "No. The list of used numbers is stored in the page only, so refreshing the browser starts a fresh pool. To draw a sequence across multiple lessons, keep the tab open between sessions or write the picked numbers down as you go."
      ),
      createFAQ(
        "Why is the animation taking so long?",
        "The spin is set to about 3 seconds total: 2 seconds of fast switching plus a deceleration phase. Shorter spins feel rushed and longer ones feel slow. For a faster pick without animation the [Number Picker](/number-picker) returns results instantly."
      ),
      createFAQ(
        "Can I use this to pick lottery numbers?",
        "Technically yes, the maths is identical. The tool picks one number at a time, so you would tap Pick six times with No Repeats on. For dedicated lottery picks our country-specific generators (UK Lotto, Powerball, Mega Millions, EuroMillions) handle the right ranges and bonus balls automatically."
      ),
    ],
    relatedTools: [
      { slug: "number-picker", label: "Number Picker" },
      { slug: "dice-roller", label: "Dice Roller" },
      { slug: "random-name-picker", label: "Random Name Picker" },
    ],
  },

  "rock-paper-scissors": {
    sections: [
      createAnswerFirstSection(
        "How To Play Rock Paper Scissors Against the Computer",
        "Pick your match length (best of 1, 3, 5 or 7), then tap rock, paper or scissors. The computer picks at the same time and the screen shows both choices with the result: win, lose or draw. Wins and losses are tallied at the top; the match ends when one side reaches the rounds-needed total (best of 5 ends at 3 wins, best of 7 at 4 wins).",
        "Rock beats scissors, scissors beats paper, paper beats rock - the same loop as a thousand schoolyard arguments. The computer picks each round independently with a uniform 1-in-3 chance for each option. Across hundreds of rounds you will land at roughly one third wins, one third losses, one third draws no matter what strategy you try. Short matches are won and lost by streaks of luck, which is why best of 7 is the more competitive format."
      ),
      createAnswerFirstSection(
        "Strategy, Variants and the Big Bang Extension",
        "Against another human, basic strategy works because humans are not random. About 35% of human first picks are rock, so leading with paper has a slight edge. Players also tend to repeat winning hands and switch after losing. None of this works against the computer here because the computer is genuinely random.",
        "The classic 3-option game has a 5-option extension: Rock Paper Scissors Lizard Spock, invented by Sam Kass and Karen Bryla in 1995 and popularised by The Big Bang Theory. The 5-option version reduces ties from 33% to 20%, which is why competitive play prefers it. This tool runs the classic 3-option rules; for a binary decision try the [Coin Flip](/coin-flip), or [Spin the Wheel](/spin-the-wheel) for any number of options."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the computer cheating?",
        "No. The computer picks one of the three options with equal 1-in-3 probability before seeing your move (using JavaScript's random number generator). It cannot react to your choice. Long-run results trend to roughly 33% wins, 33% losses, 33% draws."
      ),
      createFAQ(
        "What is best of 1, 3, 5 or 7?",
        "Best of 1 is a single round. Best of 3 ends at 2 wins, best of 5 at 3 wins, best of 7 at 4 wins. Longer matches reduce the impact of luck (one unlucky round matters less in best of 7 than in best of 1)."
      ),
      createFAQ(
        "Can I play rock paper scissors lizard spock here?",
        "Not in this version - this tool runs the classic 3-option rules only. The 5-option Lizard-Spock variant has different win conditions (lizard poisons Spock, Spock vaporises rock, paper disproves Spock) and would need its own page to render those properly."
      ),
      createFAQ(
        "Is there a winning strategy against the computer?",
        "No, because the computer's pick is genuinely random. Any pattern you try will average out to a 1-in-3 chance per round. Against another human there are exploitable patterns (rock is the most common opening, players switch after losses), but none of those apply here."
      ),
    ],
    relatedTools: [
      { slug: "coin-flip", label: "Coin Flip" },
      { slug: "spin-the-wheel", label: "Spin the Wheel" },
      { slug: "dice-roller", label: "Dice Roller" },
    ],
  },

  "scattergories-list-generator": {
    sections: [
      createAnswerFirstSection(
        "How To Run a Scattergories Round",
        "Set the number of rounds and the round duration (the standard rules use 3 minutes per letter; 60 seconds is a popular short-format variation). Tap Generate and the tool produces one round per request, each with a random letter and a list of 12 categories. Read the categories aloud or display them on a screen, start the timer, and every player has the round duration to write down a word starting with that letter for as many categories as they can.",
        "Scoring follows the classic rules: 1 point for each unique answer (no other player wrote the same thing), 0 points for any answer matching another player's. Alliterative answers (\"Pretty Penny\", \"Smelly Sam\") score 2 points if every word starts with the round letter. The tool keeps the letter and categories on screen for the duration so you can mark answers without flipping back and forth."
      ),
      createAnswerFirstSection(
        "Categories, Difficulty and Custom Lists",
        "The default pool draws from 100+ categories: animals, things in a kitchen, types of dance, films, song titles, sports, capital cities, school subjects, things you find in a pocket. The mix of concrete (\"things in a kitchen\") and abstract (\"reasons to be late\") is what makes the game work; pure trivia categories like \"countries\" alone get repetitive.",
        "If standard categories feel stale, switch to Custom Categories mode and paste your own list, one per line. House-themed categories work well: \"things our cat does\", \"songs from our wedding playlist\". This is also how to tune difficulty: harder rounds use abstract categories, easier rounds use concrete ones. For a different word-list group game try the [Pub Quiz Generator](/pub-quiz-generator) or [Charades Generator](/charades-generator)."
      ),
    ],
    faqs: [
      createFAQ(
        "How many categories per round?",
        "Twelve, matching the official Scattergories card design. Each round uses one random letter from A-Z (some house rules skip awkward letters like V, X, Y and Z) and 12 fresh categories drawn at random from the database."
      ),
      createFAQ(
        "How long is a Scattergories round?",
        "The standard published rule is 3 minutes per letter, set by the original 1988 Hasbro game. Many groups play shorter (1 or 2 minutes) because the writing pace is brisk. Set the round duration to whatever works; the built-in timer counts down on screen."
      ),
      createFAQ(
        "What if two players write the same answer?",
        "Both players score 0 for that category. The point of the game is to think of answers other people will not. If everyone agrees an answer is valid, it counts; if there is dispute, vote with the host casting the deciding vote in a tie."
      ),
      createFAQ(
        "Can I use this for a kids' Scattergories game?",
        "Yes, with two adjustments: switch to Custom Categories and write concrete topics (\"animals\", \"foods\", \"toys\", \"colours\"), and shorten rounds to 90 seconds since younger players write more slowly. For under-eights, trim the list to 8 simpler categories rather than the standard 12."
      ),
    ],
    relatedTools: [
      { slug: "pub-quiz-generator", label: "Pub Quiz Generator" },
      { slug: "charades-generator", label: "Charades Generator" },
      { slug: "music-round-generator", label: "Music Round Generator" },
    ],
  },

  "roulette-wheel": {
    sections: [
      createAnswerFirstSection(
        "European vs American Wheel: The 2.7% That Matters",
        "The European wheel has 37 pockets numbered 1 to 36 plus a single zero, giving the house an edge of 2.7%. The American wheel adds an extra 00 pocket, taking the total to 38 and almost doubling the house edge to 5.26%. The numbers, the colours and the layout look almost identical to a casual eye, yet that single extra green pocket is the difference between losing about £2.70 and £5.26 per £100 wagered over a long enough run.",
        "Practical consequence: if you ever sit down at a real roulette table, choose European every time. American roulette only really exists in US casinos and a handful of Las Vegas-style rooms abroad; in the UK and most of Europe the single-zero wheel is standard. The simulator here lets you switch between the two so you can see the same bets resolve under both house edges, and watch the bankroll drift downward faster on the American wheel even though every spin individually feels fair."
      ),
      createAnswerFirstSection(
        "Why 'Systems' Don't Beat the Wheel",
        "Every roulette outcome is independent. The wheel does not remember the last 10 reds in a row, and the probability of red on the next spin is still 18 in 37 (or 18 in 38 on the American wheel). The Martingale system (double your bet after every loss) sounds clever until you hit a losing streak that runs into the table maximum, at which point you are out a small fortune and cannot recover with another double. Real casinos welcome system players; they pay the bills.",
        "The maths behind every betting strategy from D'Alembert to Fibonacci to Labouchere all reduces to the same outcome over enough spins: you will lose 2.7% of your total turnover on European, 5.26% on American. The simulator demonstrates this with no risk to your wallet. Place 100 spins of the same bet at any chip size, watch the balance trend, and you will see the house edge behaving exactly as advertised. There is no winning long-term strategy. The only way to leave roulette ahead is to leave early and not come back. Try the [random number generator](/random-number-generator) if you just want a fair, edgeless source of numbers."
      ),
      {
        heading: "Roulette Bet Payouts and True Odds",
        table: {
          headers: ["Bet Type", "Payout", "European Win Chance", "House Edge"],
          rows: [
            ["Straight (single number)", "35 to 1", "1 in 37 (2.7%)", "2.7%"],
            ["Red, Black, Odd, Even", "1 to 1", "18 in 37 (48.6%)", "2.7%"],
            ["1-18 or 19-36", "1 to 1", "18 in 37 (48.6%)", "2.7%"],
            ["Dozen (1-12, 13-24, 25-36)", "2 to 1", "12 in 37 (32.4%)", "2.7%"],
            ["Split (two adjacent numbers)", "17 to 1", "2 in 37 (5.4%)", "2.7%"],
          ],
        },
      },
      createAnswerFirstSection(
        "How to Use This as a Practice Tool",
        "The simulator starts you with 1,000 chips and lets you place straight numbers, red, black, odd, even, and the high or low halves. Place a bet, hit spin, and watch the wheel decelerate over four seconds before settling on the winning pocket. The history strip across the bottom keeps the last 20 results so you can see the natural variance of the game; expect runs of five or six reds in a row, and the very occasional run of ten. None of these sequences predict the next spin.",
        "Where this is genuinely useful: learning the table layout before visiting a real casino, testing a betting strategy without losing actual money (you will see why every strategy fails), and watching how the balance behaves over 50 to 100 spins. A common surprise is how often you can be 'up' temporarily even though the long-term trend is downward; that fleeting win window is what makes roulette psychologically addictive. Roulette is gambling, not strategy. If you find yourself wanting to spin again to chase a loss, that is the moment the simulator has done its job. Compare the variance with a [dice roller](/dice-roller) to see how different probability distributions behave."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the best bet in roulette?",
        "Mathematically, every bet on a European wheel has the same 2.7% house edge, so there is no single 'best' bet by expected value. The even-money bets (red, black, odd, even, 1-18, 19-36) win 48.6% of the time, which gives you the slowest bankroll drain and the longest playing time per pound. Straight number bets win 2.7% of the time but pay 35 to 1, so the variance is much higher and your bankroll swings dramatically. Pick based on whether you want a long, slow game or a short, exciting one."
      ),
      createFAQ(
        "Why does the wheel have a green zero?",
        "The green zero is the entire reason the casino makes money. Without it, red and black would each win exactly half the time, paying 1 to 1 with zero edge. The single zero on a European wheel makes red and black each pay 18 in 37 instead of 18 in 36, which is the source of the 2.7% house edge. The American 00 doubles this to 5.26%. Every other 'fair' bet on the table is similarly tilted by the green pocket, even when it is not directly involved in your bet."
      ),
      createFAQ(
        "Are some numbers 'due' to come up after a long absence?",
        "No. This is the gambler's fallacy. The wheel has no memory; each spin is mechanically independent. If 17 has not appeared in 200 spins, the probability of 17 on the next spin is still exactly 1 in 37. The streak feels meaningful because human brains are pattern-finding machines, but no statistical test on a fair wheel will show any predictive value in past results. Casinos display the recent history specifically because it encourages this fallacy."
      ),
      createFAQ(
        "Can I beat roulette by betting on the same number repeatedly?",
        "No. Betting on 17 every spin gives you a 1 in 37 chance each time. Over 100 spins you would expect to hit 17 roughly 2.7 times, winning 35 chips each hit (94.5 chips total) while spending 100 chips on bets. That is the 5.5% loss the European house edge mathematically guarantees. Some real-world wheels have tiny mechanical biases that pros have exploited historically, but online and modern casino wheels are tested for fairness and any bias is microscopic."
      ),
      createFAQ(
        "What does 'En Prison' or 'La Partage' mean in roulette rules?",
        "These are French roulette rules that reduce the house edge on even-money bets to 1.35%. La Partage returns half your bet if zero hits; En Prison locks your bet for one more spin and refunds it if you win the next one. They are only offered on French roulette tables and are worth seeking out if you find one. Standard European roulette and the American wheel do not include these rules, so the full house edge applies on every spin."
      ),
    ],
    relatedTools: [
      { slug: "lottery-odds-comparison", label: "Lottery Odds Comparison" },
      { slug: "dice-roller", label: "Dice Roller" },
      { slug: "random-number-generator", label: "Random Number Generator" },
    ],
  },
};
