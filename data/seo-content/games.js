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
};
