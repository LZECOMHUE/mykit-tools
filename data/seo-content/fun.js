// SEO content for fun and games tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const funSEO = {
  "typing-speed-test": {
    sections: [
      createAnswerFirstSection(
        "How Typing Speed Is Measured",
        "Typing speed is measured in words per minute (WPM). A 'word' is standardised as five characters, including spaces. So if you type 200 characters in one minute, your speed is 40 WPM. This standardisation means your score is comparable regardless of whether the text contains short or long words.",
        "The test presents a passage of text and measures how quickly and accurately you type it. Your WPM score accounts for errors, so mistyped words reduce your effective speed. The accuracy percentage shows what proportion of words you typed correctly on the first attempt."
      ),
      {
        heading: "Average Typing Speed by Skill Level",
        table: {
          headers: ["Skill Level", "WPM Range", "Description"],
          rows: [
            ["Beginner", "20-30 WPM", "Hunt-and-peck typing, looking at the keyboard"],
            ["Average", "35-45 WPM", "Casual typist, some touch typing"],
            ["Above average", "45-60 WPM", "Comfortable touch typist, office worker"],
            ["Fast", "60-80 WPM", "Skilled typist, most professional needs covered"],
            ["Professional", "80-100 WPM", "Transcriptionist, journalist, developer"],
            ["Expert", "100+ WPM", "Competitive typist, stenographer-level speed"],
          ],
        },
      },
      createAnswerFirstSection(
        "Tips to Improve Your Typing Speed",
        "The single most important habit is touch typing, which means keeping your fingers on the home row (ASDF JKL;) and reaching for other keys without looking at the keyboard. This feels slower at first but quickly becomes faster than hunt-and-peck because your eyes stay on the screen.",
        "Focus on accuracy before speed. Correcting mistakes takes more time than typing slowly but correctly. Practise for 10-15 minutes daily rather than one long session per week. Use the different difficulty levels in this tool to progress gradually. Easy mode uses common short words, medium mode adds longer words and punctuation, and hard mode includes numbers, symbols, and technical vocabulary."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a good typing speed for office work?",
        "45-60 WPM with high accuracy is sufficient for most office jobs. Data entry roles typically require 60-80 WPM. Transcription and court reporting require 80+ WPM. For general computer use, anything above 40 WPM means typing is not a bottleneck in your workflow."
      ),
      createFAQ(
        "Should I prioritise speed or accuracy?",
        "Accuracy first, always. A typist who types 50 WPM with 98% accuracy is more productive than one who types 70 WPM with 85% accuracy, because the faster typist spends significant time fixing mistakes. Once your accuracy is consistently above 95%, you can safely push for higher speed."
      ),
      createFAQ(
        "How often should I practise to see improvement?",
        "Short daily sessions of 10-15 minutes are more effective than occasional long sessions. Most people see measurable improvement within two weeks of daily practice. Speed gains come quickly at first, then slow down as you approach your natural plateau. Consistent practice is the key."
      ),
    ],
    relatedTools: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "random-number-generator", label: "Random Number Generator" },
      { slug: "stopwatch", label: "Online Stopwatch" },
    ],
  },

  "fortune-cookie-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Fortune Cookie Generator Works",
        "Our fortune cookie generator lets you crack a virtual cookie to reveal a randomly chosen fortune message, a set of six lucky numbers from 1 to 49, and a Chinese word of the day with its pinyin pronunciation and meaning. Click the cookie or the button to crack it - or press spacebar for a quick new fortune without reaching for the mouse.",
        "Choose from five fortune categories before you crack: Funny for a lighthearted laugh, Wise for genuine life advice, Love for romantic and relationship insights, Career for work and ambition inspiration, and Cryptic for mysterious and thought-provoking messages. Each category contains over 15 unique fortunes, giving plenty of variety across multiple cracks."
      ),
      createAnswerFirstSection(
        "The History of Fortune Cookies",
        "Despite their strong association with Chinese restaurants, fortune cookies are largely an American invention. The most widely accepted origin story traces them to Makoto Hagiwara, a Japanese-American landscape designer who served them at the Japanese Tea Garden in San Francisco around 1914. The concept spread to Chinese restaurants after World War II and became a staple of the American Chinese dining experience.",
        "In China itself, fortune cookies are virtually unknown - they are considered a distinctly American phenomenon. The classic message-in-a-cookie format was popularised by mass production in the mid-20th century, and today billions of fortune cookies are produced each year. The fortunes themselves range from pithy wisdom to lucky numbers, with the tradition of adding 'in bed' to the end of any fortune being a popular western game."
      ),
      {
        heading: "What Do the Lucky Numbers Mean?",
        body: "The six lucky numbers generated alongside your fortune are randomly picked from 1 to 49 - the same range used in many lottery formats. In Chinese culture, certain numbers carry special significance. The number 8 is considered the luckiest, associated with prosperity and wealth. The number 6 represents smooth progress. The number 9 symbolises longevity. Numbers like 4 are traditionally avoided in some contexts as the word sounds similar to 'death' in Mandarin. Our generator picks numbers with equal probability, so every combination is equally auspicious.",
      },
    ],
    faqs: [
      createFAQ(
        "Are the fortunes random every time?",
        "Yes - each crack of the cookie picks a new fortune at random from the selected category. Lucky numbers are also freshly generated on each crack. With 15 or more fortunes per category and a fresh random pick each time, you are unlikely to see the same fortune twice in a short session."
      ),
      createFAQ(
        "Can I use the fortunes for parties or events?",
        "Absolutely. The fortune messages are designed to be entertaining and shareable. You can copy any fortune with the copy button and paste it into a message, use it as a conversation starter, or include it in a party game. For printed fortune cookies at events, you could use the messages as inspiration for writing your own paper fortunes."
      ),
      createFAQ(
        "What does the Chinese word of the day mean?",
        "Each crack reveals a Chinese character with its pinyin romanisation and English meaning. Pinyin is the official system for writing Mandarin using the Latin alphabet and tone marks. The characters selected are all positive concepts - happiness, fortune, love, harmony, wisdom, and similar themes that fit the spirit of fortune cookies."
      ),
      createFAQ(
        "How many fortunes are in each category?",
        "Each of the five categories (Funny, Wise, Love, Career, and Cryptic) contains at least 16 unique fortune messages. That gives a total of over 80 different fortunes across the full set."
      ),
    ],
    relatedTools: [
      { slug: "lucky-number-generator", label: "Lucky Number Generator" },
      { slug: "daily-horoscope-generator", label: "Daily Horoscope Generator" },
      { slug: "compliment-generator", label: "Compliment Generator" },
    ],
  },

  "six-word-story": {
    sections: [
      createAnswerFirstSection(
        "What Is a Six-Word Story?",
        "A six-word story is a complete narrative - beginning, middle, and end - told in exactly six words. The form was popularised by the legend that Ernest Hemingway once wrote 'For sale: baby shoes, never worn.' as the saddest story imaginable. Whether the attribution is accurate or not, the challenge stuck: can you tell a whole story in just six words?",
        "The appeal is in the constraint. Six words force you to strip away everything except what truly matters. Every word carries enormous weight. A six-word story can be funny, heartbreaking, mysterious, or absurd. The reader's imagination fills in the gaps, which is often more powerful than spelling everything out. This tool gives you a live word counter, themed prompts to spark ideas, and a gallery of famous examples to study."
      ),
      createAnswerFirstSection(
        "Tips for Writing a Good Six-Word Story",
        "The best six-word stories create a sense of movement - something changes between the first word and the last. 'I married her. She left. Good.' implies a whole life. Contrast is powerful: a happy opening and a dark ending (or vice versa) creates instant tension. Avoid descriptions and adjectives - use nouns and verbs that carry the full story themselves.",
        "Choose your theme and read the writing prompt before you start. If you are stuck, try writing a longer version of your idea first and then cutting it down ruthlessly. Often a single phrase you land on while editing turns out to be the whole story. The famous examples in the gallery are worth studying - notice how many rely on a twist in the final word or two."
      ),
    ],
    faqs: [
      createFAQ(
        "Did Hemingway really write 'For sale: baby shoes, never worn.'?",
        "Almost certainly not. The story is widely attributed to Hemingway, but no documentary evidence connects it to him. Similar classified advertisements appeared in newspapers decades before Hemingway's time. The attribution is likely a myth that grew because the story's quality seemed worthy of a Nobel laureate. It remains one of the most discussed examples of flash fiction regardless of its true origin."
      ),
      createFAQ(
        "What is flash fiction or micro fiction?",
        "Flash fiction is any very short story - typically under 1,000 words. Six-word stories are an extreme form of micro fiction. Related formats include the 50-word story, the 100-word drabble, and the 55-word story. All share the same philosophy: constraint sharpens writing. Having fewer words forces writers to make every single one earn its place."
      ),
      createFAQ(
        "Can my story be more or fewer than six words?",
        "Traditionally, no - the six-word story is defined by the constraint. But this tool's word counter shows amber at 5 or 7 words and green at exactly 6, so you can experiment freely. Many writers draft at 7-8 words and then cut down to 6, which often produces the strongest version. The discipline of hitting exactly six is part of what makes the form interesting."
      ),
      createFAQ(
        "How do I save my stories?",
        "Click 'Save My Story' once your story is exactly 6 words. Your stories are saved in your browser's local storage - they stay between visits on the same device. You can save up to 10 stories at a time. Each saved story shows the date it was written and the theme you chose. Use the delete button to remove old ones and make room for new ones."
      ),
      createFAQ(
        "What are the best themes for six-word stories?",
        "Loss and love consistently produce the most affecting six-word stories because they deal with universal human experiences that readers can project their own feelings onto. Horror works well because the brevity leaves everything to the imagination. Childhood is a rich theme because a single image - a toy, a smell, a sound - can carry enormous emotional weight without needing explanation."
      ),
    ],
    relatedTools: [
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
      { slug: "compliment-generator", label: "Compliment Generator" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "mad-libs-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Mad Libs Generator Works",
        "Pick a theme - School Day, Pirate Adventure, Haunted House, Zoo Trip, Space Mission, or Fairy Tale - then fill in the blanks with nouns, verbs, adjectives, and other word types. The sillier your choices, the funnier the story. Once every blank is filled, hit 'Reveal Story' to see the complete tale with your words highlighted in colour.",
        "The classic Mad Libs format hides the story while you fill in random words, so you never know how they fit until the big reveal. A perfectly normal word like 'sandwich' or 'Tuesday' becomes hilarious dropped into an unexpected sentence. A live preview lets you watch your words slot in as you type, with each word type shown in a distinct colour so you can see the story take shape."
      ),
      createAnswerFirstSection(
        "Tips for the Funniest Results",
        "The best Mad Libs answers are either very specific or completely absurd. Instead of 'dog' for an animal, try 'hairless chihuahua'. Instead of 'ran' for a past tense verb, try 'somersaulted'. Ordinary words make ordinary stories - bold choices make unforgettable ones.",
        "Mad Libs work brilliantly as a group activity. One person reads out each blank type aloud while others call out answers without seeing the story. This blind input is what makes the format so entertaining. Works well on long car journeys, at the dinner table, or as an icebreaker at parties. Children aged 6 and up love it as a sneaky way to practise parts of speech without it feeling like a lesson."
      ),
    ],
    faqs: [
      createFAQ(
        "What age group is Mad Libs suitable for?",
        "Mad Libs is enjoyable from around age 6 upwards. Younger children can join in with a little help understanding what a noun or adjective means. Older kids and adults often find it even funnier because they can think of more unexpected words. It works well as a family activity because everyone can contribute and the results are always amusing."
      ),
      createFAQ(
        "What is an adjective, noun, or adverb?",
        "A noun is a person, place, or thing - like 'cat', 'kitchen', or 'umbrella'. An adjective describes a noun - like 'soggy', 'enormous', or 'purple'. A verb is an action word - like 'sneezed', 'wobbled', or 'exploded'. An adverb describes how something happens - like 'loudly', 'slowly', or 'accidentally'. For extra silliness, pick the most dramatic version you can think of."
      ),
      createFAQ(
        "Can I play Mad Libs with friends?",
        "Yes - this is the classic way to play. One person acts as the host and reads out each blank type ('Give me an adjective'). The other players call out answers without seeing the story. Once all the blanks are filled, the host reveals the story and reads it aloud. The more players involved, the more chaotic and funny the results tend to be."
      ),
      createFAQ(
        "Can I save or share my story?",
        "Once your story is revealed, use the Copy button to copy the full text to your clipboard and paste it into a message or note. Want to start fresh? Click New Round to clear your answers and try again with the same theme, or switch to a different theme for a completely new story."
      ),
    ],
    relatedTools: [
      { slug: "six-word-story", label: "Six-Word Story" },
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
      { slug: "excuse-generator", label: "Excuse Generator" },
    ],
  },

  "bucket-list-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Bucket List Generator Works",
        "Pick a category from travel, food experiences, adventure, learning, creative projects, or wellness, then hit Generate 5 Ideas. Tick the ones that resonate and they get added to your personal list at the top of the page. Keep generating across categories to build a mixed list that pulls from multiple areas of life rather than just one. The Copy List button drops the whole thing onto your clipboard.",
        "The point isn't to fill your list with 100 items in five minutes. Most people who actually finish bucket list goals keep their active list short - maybe 5 to 10 things they're working towards in any given year - while letting the bigger lifetime list sit at 50 to 100 items in the background. Generating ideas this way is mostly useful for breaking out of the obvious defaults. Everyone's first instinct is 'see the Northern Lights' or 'visit Japan'. The categories nudge you towards things you'd never have written down unsolicited."
      ),
      createAnswerFirstSection(
        "Turning a List Into Things You Actually Do",
        "A bucket list works best when each item is specific enough to plan against. 'Travel more' is not a bucket list item, it's a vague feeling. 'Visit the Northern Lights in Iceland in February 2027' is something you can save for, book, and tick off. When you copy your list out, take ten minutes to rewrite each entry with a rough year attached.",
        "Split your list into two: big-ticket items that need money and time off (a safari, a marathon abroad, learning to scuba dive) and smaller experiences you could do in a weekend (a pasta class, a hot air balloon ride, writing a short story). The smaller list is where momentum lives. People who tick off three small items in a year feel like the list is alive. Try the [New Hobby Suggester](/new-hobby-suggester) for ongoing pursuits that don't need a flight."
      ),
    ],
    faqs: [
      createFAQ(
        "How many items should be on a bucket list?",
        "There's no rule, but most people who maintain bucket lists end up with somewhere between 50 and 100 lifetime items, with maybe 5 to 10 they're actively working on at any given time. Lists much shorter than that tend to be fully ticked off after a few years. Lists much longer than 150 items start to feel like clutter rather than aspiration."
      ),
      createFAQ(
        "Should a bucket list only be expensive trips?",
        "No. Some of the most satisfying bucket list ticks are small and free or low-cost: writing a song, learning to bake sourdough, watching the sun rise from a hill near home, journaling for 100 days. Mixing big trips with smaller experiences keeps the list moving rather than gathering dust between expensive moments."
      ),
      createFAQ(
        "What's the difference between a bucket list and goals?",
        "Goals tend to be measurable and time-bound (run a sub-2-hour half-marathon by next October). Bucket list items are usually experiences rather than achievements (run any marathon, anywhere, before I'm 50). They overlap, but bucket lists lean towards memories and goals lean towards outcomes."
      ),
      createFAQ(
        "How do I stop my bucket list feeling overwhelming?",
        "Pick one item per quarter and put a date on it. Treat the rest as a wish list, not a to-do list. The pressure of having 80 unfinished things on a list is what kills bucket lists - the same list with 80 things and one chosen 'next' feels achievable."
      ),
    ],
    relatedTools: [
      { slug: "new-hobby-suggester", label: "New Hobby Suggester" },
      { slug: "compliment-generator", label: "Compliment Generator" },
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
    ],
  },

  "coin-flip-but-smarter": {
    sections: [
      createAnswerFirstSection(
        "How the Smarter Coin Flip Works",
        "Type what 'heads' means and what 'tails' means before flipping. Hit Flip, watch the coin spin for a couple of seconds, and see which side wins. The clever part comes after: once the coin lands, you're asked how you feel about the result. Tap I'm Happy and the decision is logged. Tap I'm Disappointed and the result silently flips to the other option, because if your gut sank when the coin landed, the coin already told you what you actually wanted.",
        "This is sometimes called the 'flip a coin and notice the feeling' trick, and it's the same logic poker players use to read their own tells. The coin itself doesn't care about your dinner choice or which job offer to take. What it does is force a snap reaction in the half-second between the result landing and you reading it. That reaction is information your conscious brain has been hiding from you. Use it for low-stakes decisions where you're stuck spinning in circles - what to cook, which film to watch, whether to text someone first."
      ),
      createAnswerFirstSection(
        "When to Use It and When Not To",
        "This works best for two-option decisions where both choices are roughly equivalent on paper but you've been stalling. Pizza or curry. Run today or rest. Cinema or sofa. The whole point is that the coin breaks the tie cheaply and the gut reaction tells you whether the tie was actually a tie. For anything important - a job, a house, a relationship - this is the wrong tool. Real decisions need a [Decision Matrix Maker](/decision-matrix-maker) or a [Pros and Cons Generator](/pros-and-cons-generator), where you can weight criteria properly.",
        "There's also a danger in using the gut-check trick too often: if you always override the coin, you stop trusting random outcomes for things that genuinely should be 50/50. Some decisions deserve to actually be settled by chance, because the energy of choosing isn't worth more than the choice itself. Try this rule: if you can articulate a reason for being disappointed in the result, override it. If you can't and just feel vaguely unhappy, take the coin's answer and move on."
      ),
    ],
    faqs: [
      createFAQ(
        "Is this actually random?",
        "Yes - the flip uses the browser's Math.random function, which produces a roughly 50/50 distribution over many flips. It's not cryptographically random, but for picking between dinner options it's indistinguishable from a real coin."
      ),
      createFAQ(
        "Why does the result change when I say I'm disappointed?",
        "Because the gut reaction is the actual signal. The flip is just a way to surface what you already wanted. If the result felt wrong the moment you saw it, you've found your answer - the tool just lets you commit to it without feeling like you flip-flopped."
      ),
      createFAQ(
        "Can I use it for big decisions?",
        "Not on its own. Use it as a tiebreaker after you've already weighed both options seriously and they genuinely seem equal. For anything with significant financial, career, or relationship consequences, work through a proper decision matrix first."
      ),
      createFAQ(
        "Why not just flip a real coin?",
        "You can - but a real coin doesn't capture history, and you can't pre-label the sides as easily. This version saves what each flip was for, which is useful if you flip a few decisions in a row and want to remember what you committed to."
      ),
    ],
    relatedTools: [
      { slug: "this-or-that-decider", label: "This or That Decider" },
      { slug: "decision-matrix-maker", label: "Decision Matrix Maker" },
      { slug: "pros-and-cons-generator", label: "Pros and Cons Generator" },
    ],
  },

  "conspiracy-theory-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Conspiracy Theory Generator Works",
        "Hit Generate Theory and three random pieces snap together: a subject (pigeons, socks, the moon, your neighbour, cheese), an action (have formed a secret government, are recording all conversations, control the weather), and a reason (because cheese is the key, to keep us buying their products, for their secret agenda). The result is something like 'Stairs are actually aliens in disguise to make us dance at midnight.' Show the breakdown if you want to see the three components separately, copy the line straight to your clipboard, or keep regenerating until something genuinely makes you laugh.",
        "Every output is clearly labelled fictional - this is for screenwriters writing satire, comedians stuck on a bit, tabletop GMs needing a paranoid NPC backstory, or anyone who finds joining 'pigeons' and 'communicating through cheese' funnier than it has any right to be. It's not a tool for crafting or promoting actual misinformation. The deliberately absurd subjects (cheese, toast, stairs) keep the outputs in clearly-comedic territory rather than anything that could be mistaken for genuine claims about real people, groups, or events."
      ),
      createAnswerFirstSection(
        "Using It for Writing and Comedy",
        "The generator works best as a creative prompt rather than a finished joke. Most outputs need a beat of reframing to land - 'Pigeons are recording all conversations for profit and power' is a passable starter; the comedy comes when you commit to it ('which is why my pigeon has been suspiciously quiet during pension reviews'). Use a few generations to find a subject-action pairing that surprises you, then write the third piece yourself rather than relying on the generator's reason.",
        "If you're writing parody for a sketch or short story, three or four absurd theories stitched together usually beats one elaborate one. The form itself is what's funny: confidently stated, vaguely sinister, completely unfounded. Give your fictional character three of these in a row, delivered with absolute conviction, and the comedy writes itself. For a quieter, more personal kind of nonsense, the [Excuse Generator](/excuse-generator) works on the same combinatorial principle."
      ),
    ],
    faqs: [
      createFAQ(
        "Are these based on real conspiracy theories?",
        "No. The components are deliberately absurd - the subjects are everyday objects and animals, and the reasons are nonsensical. Nothing in the database mirrors actual disinformation narratives, real political claims, or theories targeting real groups. It's clearly-fake fiction, not satire of real material."
      ),
      createFAQ(
        "Is this OK to share on social media?",
        "Sharing for laughs is fine - the outputs are obviously absurd. Worth tagging anything you share as fiction or comedy, especially in the current climate where genuine disinformation spreads fast. The phrase 'penguins replaced everyone with robots because cheese is the key' is unlikely to fool anyone, but a quick 'haha generated this for fun' caption removes any doubt."
      ),
      createFAQ(
        "Can I use this for a story or sketch?",
        "Yes. It works well as a creative prompt for satirical fiction, comedy sketches, tabletop RPG flavour, or as filler dialogue for a paranoid character. Take the output as a starting point and rewrite it in your own voice rather than using the raw line."
      ),
      createFAQ(
        "How many possible theories can it generate?",
        "With 10 subjects, 10 actions, and 10 reasons, there are 1,000 possible combinations. Most won't be funny - that's how combinatorial humour works - but a few generations usually surface something worth keeping."
      ),
    ],
    relatedTools: [
      { slug: "excuse-generator", label: "Excuse Generator" },
      { slug: "roast-generator", label: "Roast Generator" },
      { slug: "mad-libs-generator", label: "Mad Libs Generator" },
    ],
  },

  "decision-matrix-maker": {
    sections: [
      createAnswerFirstSection(
        "How the Decision Matrix Method Works",
        "A decision matrix (sometimes called a Pugh matrix or weighted scoring model) is a four-step structured way of comparing options against the criteria you actually care about. Step one: list the options you're choosing between (2 to 6 works best). Step two: list the criteria that matter, like salary, location, growth potential (3 to 8 keeps it focused). Step three: weight each criterion 1 to 10 by how much it matters to you. Step four: score each option 0 to 10 against each criterion. The tool multiplies your scores by your weights and ranks the options.",
        "This method works because it separates two questions that the brain usually mashes together: how much do I care about this thing, and how good is each option at delivering this thing. Once those are split, even a slight mathematical preference becomes visible. It's how product designers, hiring panels, and strategy teams structure decisions where 'gut feel' would either be too biased or too contested. The weighting step is the most important - if you give every criterion equal weight, you'll get the same answer as a basic pros and cons list."
      ),
      createAnswerFirstSection(
        "When This Tool Helps and When It Over-Engineers",
        "Use a decision matrix for genuinely multi-factor decisions: choosing between job offers, picking a flat to rent, deciding on a university, comparing software vendors, choosing a holiday destination with a partner. These are the situations where you have 4 to 6 things you care about and the obvious 'best' option keeps shifting depending on which factor you focused on last. The matrix forces all factors into one view and lets the maths surface a winner.",
        "Don't use it for low-stakes decisions or strongly emotional ones. Picking a restaurant doesn't need a weighted scoring model - just flip a coin and notice your reaction. Deciding whether to leave a long-term relationship can't be reduced to numbers without making the conclusion feel hollow regardless of which way it falls. The tool also fails when you secretly already know the answer and start nudging scores until your preferred option wins. If you catch yourself doing that, the matrix is just doing post-hoc justification, and you'd be better off being honest with yourself. For simpler two-option calls try the [Pros and Cons Generator](/pros-and-cons-generator) instead."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the difference between a decision matrix and a pros and cons list?",
        "A pros and cons list treats every point as equally important and only handles one option at a time. A decision matrix compares multiple options at once against weighted criteria, so a small advantage on a high-weighted factor can outweigh several small advantages elsewhere. The maths gives you a single ranked answer rather than two messy columns to interpret."
      ),
      createFAQ(
        "How many criteria should I include?",
        "Three to eight. Fewer than three and you're not really using a matrix - it's just a comparison. More than eight and you start padding with criteria you don't really care about, which dilutes the signal. If you can't get under eight, group related criteria together (combine 'salary' and 'bonus' into 'total compensation')."
      ),
      createFAQ(
        "What if all my options score similarly?",
        "Genuinely similar scores usually mean the options are close to interchangeable, which is itself useful information - it tells you the choice doesn't matter as much as you thought. If you've weighted a criterion at 10 but every option scores the same on it, that criterion isn't actually helping you decide and can be removed."
      ),
      createFAQ(
        "Can I save my matrix to come back to later?",
        "Yes - the tool auto-saves to your browser's local storage, so closing the tab and reopening the page later restores your last matrix. Logged-in users with a Pro subscription get cloud save across devices."
      ),
    ],
    relatedTools: [
      { slug: "pros-and-cons-generator", label: "Pros and Cons Generator" },
      { slug: "priority-ranker", label: "Priority Ranker" },
      { slug: "this-or-that-decider", label: "This or That Decider" },
    ],
  },

  "life-stats": {
    sections: [
      createAnswerFirstSection(
        "How the Life Stats Calculator Works",
        "Enter your date of birth and the calculator works out how long you've been alive in years, months, and days, then converts that figure into a series of bigger numbers based on average human rates: heartbeats (around 72 per minute), breaths (around 16 per minute), steps walked (around 6,000 per day), words spoken (around 16,000 per day), times you've smiled, times you've blinked, hours you've slept, and so on. It also calculates astronomical things like how many full moons you've seen (about one every 29.53 days) and how many trips around the sun you've completed.",
        "The numbers are estimates rather than facts about you specifically - someone with resting heart rate of 60 will have had fewer heartbeats than the average, an athlete will have walked more steps, a chatty person will have said more words. The calculator picks middle-of-the-road values that apply roughly to most adults. The figures get genuinely big quickly: a 30-year-old has had over a billion heartbeats and walked roughly 65 million steps. UK life expectancy of around 80 years works out to about 30,000 days alive total, which is a number people often find more sobering than 'eighty years' written out."
      ),
      createAnswerFirstSection(
        "Milestones, Generation, and the Day You Were Born",
        "Below the main numbers the tool surfaces a few specific milestones: the date you'll hit (or already passed) 10,000 days old, 1 billion seconds old (around age 31 years 8 months), 20,000 days old, and how long until your next birthday. Some people enjoy planning small celebrations around these - the 10,000 day birthday lands around your 27th birthday and is a popular alternative milestone for people who don't want to make a fuss about their actual round-number birthdays.",
        "It also tells you which day of the week you were born and which generation you fall into based on your birth year. Generation labels (Boomer, Gen X, Millennial, Gen Z, Gen Alpha) are loose cultural categories rather than strict definitions, but they're a useful conversation starter and give a snapshot of the world you were born into. The Download Shareable Card button creates a simple image of the headline numbers that you can post somewhere or send to a friend who's also curious about their own stats."
      ),
    ],
    faqs: [
      createFAQ(
        "How accurate are these numbers?",
        "The age figures (years, months, days alive) are exact. The 'human rate' figures are estimates based on population averages - 72 heartbeats per minute, 6,000 steps per day, 16,000 words spoken per day, and so on. Your actual numbers depend on your fitness, activity, and lifestyle. Treat them as ballpark figures rather than precise counts of your own life."
      ),
      createFAQ(
        "What's special about 10,000 days old?",
        "10,000 days lands around age 27 years 4 months, which is a meaningful round-number milestone for people who like planning small celebrations away from their actual birthdays. It's also been used as a marketing hook by brands like 10,000 Days (the Tool album) and various 'second adulthood' campaigns."
      ),
      createFAQ(
        "Why does the tool list a generation for my birth year?",
        "Because cultural generations are a common shorthand for 'what kind of world were you born into'. The boundaries used here are widely cited but not universal - definitions of Millennial vs Gen Z, in particular, vary by a few years across sources. Don't take the label too seriously."
      ),
      createFAQ(
        "Can I share my life stats?",
        "Yes - the Download Shareable Card button creates a simple image with your headline numbers that's easy to post on social media or send to a friend. The image doesn't include your full date of birth, just the calculated figures."
      ),
    ],
    relatedTools: [
      { slug: "age-calculator", label: "Age Calculator" },
      { slug: "salary-visualizer", label: "Salary Visualizer" },
      { slug: "percentage-calculator", label: "Percentage Calculator" },
    ],
  },

  "new-hobby-suggester": {
    sections: [
      createAnswerFirstSection(
        "How the Hobby Suggester Filters Ideas",
        "Pick four preferences: indoor or outdoor, budget (free, low, medium, or high), session length (30 minutes, 1 hour, or 2 hours plus), and solo or social. The tool filters its 15-hobby database down to the matches and shows up to five suggestions with rough cost estimates, difficulty ratings, and a sentence describing what each involves. You're not being told 'try yoga' regardless of context - you're getting hobbies that fit the slot in your life that you actually have.",
        "Cost ranges are realistic UK starting points - watercolour at £15 to £30 means a beginner pad of paper and a small paint set, not that you'll never spend more. Difficulty ratings are honest: 'easy' means a satisfying first session with no tuition, 'medium' means you'll want a YouTube tutorial open, and 'hard' (rock climbing, guitar) means expect to feel rubbish for a few weeks before improvement kicks in. The most common reason adults abandon new hobbies is misjudging how long the awkward beginner phase lasts."
      ),
      createAnswerFirstSection(
        "Picking Something That Sticks",
        "Hobbies that survive the first three months tend to share three properties: a clear next step, low-friction entry (gear is already in the house or cheap), and at least one social or accountability hook. Filtering by 'social' surfaces the hobbies with built-in groups - book club, dance class, board gaming - which dramatically increase your chance of still doing the thing in October.",
        "Start a hobby in the season that suits it. Gardening in March, photography in spring or autumn, hiking in late spring through early autumn, journaling and yoga in winter. Trying to learn rock climbing in January when it's pitch dark by 4pm is a bad first impression of an otherwise great hobby. If filtering surfaces nothing useful, soften filters one at a time. For more aspirational items try the [Bucket List Generator](/bucket-list-generator)."
      ),
    ],
    faqs: [
      createFAQ(
        "What's a realistic budget for a new hobby?",
        "Most hobbies can be started for under £50, including the example tools the suggester surfaces. Photography and cycling are the main exceptions - both have budget entry points but rapidly scale into hundreds or thousands once you commit. Watercolour, journaling, yoga, hiking, origami, and book clubs all have credible starting kits under £30."
      ),
      createFAQ(
        "How long before a new hobby starts feeling rewarding?",
        "Easy hobbies (journaling, hiking, board games) feel rewarding from session one. Medium hobbies (photography, gardening, pottery) start clicking around weeks 4 to 8. Hard hobbies (guitar, rock climbing) often feel frustrating for the first 8 to 12 weeks before something snaps into place. Knowing this in advance makes it much easier to push through the rough patch."
      ),
      createFAQ(
        "Should I try a few hobbies at once?",
        "One at a time, with maybe a second secondary one for variety, is usually the sweet spot. Three or more new hobbies in parallel almost guarantees that none of them will get enough hours per week to actually progress, and the lack of progress is what makes people quit."
      ),
      createFAQ(
        "What if no hobbies match my filters?",
        "The most common cause is filtering for 'free' budget plus '30 minutes' plus 'social' plus 'outdoor' - there are very few hobbies that fit all four. Loosen one preference at a time. Free and outdoor solo? Try hiking. Social and 30 minutes indoor? Try board gaming or a book club."
      ),
    ],
    relatedTools: [
      { slug: "bucket-list-generator", label: "Bucket List Generator" },
      { slug: "compliment-generator", label: "Compliment Generator" },
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
    ],
  },

  "pickup-line-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Pickup Line Generator Works",
        "Pick a style: cheesy (the classic 'Are you a parking ticket? Because you've got FINE written all over you' school of awful puns), clever (slightly more wordplay, slightly less cringe), nerdy (chemistry jokes, coding metaphors, 'Are you made of copper and tellurium? Because you're CuTe'), food-themed, or animal-themed. Hit Generate Another to roll a fresh line in that style, copy it to your clipboard, and rate the smoothness on the four-emoji scale if you want to track which lines actually made you laugh.",
        "These exist for entertainment - they are jokes, not strategy. Real flirting is built on showing genuine interest in another person, asking real questions, and reading the room. A well-delivered cheesy line at the right moment with the right person can be charming because the absurdity does the work; the same line read off your phone at a stranger in a bar will probably get you a polite excuse to leave. Use these on text threads with friends, in dating-app icebreakers where the bar is already low, or as the setup for a self-aware joke about how bad pickup lines are."
      ),
      createAnswerFirstSection(
        "When These Are Funny and When They're Just Awkward",
        "The cheesier the line, the more it relies on delivery. 'If you were a vegetable, you'd be a cute-cumber' lands as a joke when you're already laughing about something silly with someone you know. The same line as the opening salvo to a stranger lands like a script someone copied. Most of the lines in this database are best deployed knowingly - leading with 'I know this is going to be terrible, but' gives you permission to use any of them without it feeling like you actually believe this is how flirting works.",
        "Nerdy lines have a slightly different rule: they only work if both people get the reference. 'I wish I were DNA helicase so I could unwind your double helix' is amazing if you're both biochemists and a complete swing-and-a-miss otherwise. Food and animal-themed lines tend to be the safest defaults because the joke is in the pun rather than in any genuine claim. For sincerely nice things to say to a person you actually like, use the [Compliment Generator](/compliment-generator) - those are written to be said straight, not as comedy."
      ),
    ],
    faqs: [
      createFAQ(
        "Do pickup lines actually work?",
        "Pretty much never as a sincere opener. They sometimes work as a joke when both people are already in a flirty mood and the line is delivered with self-awareness. Treat them as comedy material, not seduction technique."
      ),
      createFAQ(
        "What's the difference between cheesy and clever lines?",
        "Cheesy lines lean fully into pun and wordplay with no apology - they're awful on purpose. Clever lines try to be slightly more original, often with an extra twist or wordplay layer. The line between them is fuzzy and depends on how generous you're feeling at the time."
      ),
      createFAQ(
        "Are these safe to use on dating apps?",
        "As icebreakers in a thread where you've already matched and the vibe is light, yes - especially nerdy or food-themed lines, where the pun signals 'I'm not taking myself too seriously'. Don't use these as your main bio or your opener if the other person's profile suggests they want a real conversation."
      ),
      createFAQ(
        "Can I rate the lines?",
        "Yes - the four-emoji rating scale (cringe, mute, smirk, smooth) lets you track which lines actually got a reaction. It's saved in your browser, so the next time you generate, you can see whether you've already rated this particular line."
      ),
    ],
    relatedTools: [
      { slug: "compliment-generator", label: "Compliment Generator" },
      { slug: "excuse-generator", label: "Excuse Generator" },
      { slug: "roast-generator", label: "Roast Generator" },
    ],
  },

  "priority-ranker": {
    sections: [
      createAnswerFirstSection(
        "How the Priority Ranker Works",
        "Add 3 to 10 items - tasks, goals, projects, anything you can list - and the tool pairs them up two at a time and asks 'Which is more important?'. You answer each pairwise comparison, and the items get a win count. With 5 items there are 10 comparisons; with 10 items there are 45. At the end, items are ranked by how many one-on-one matchups they won. The progress bar shows how many comparisons you've answered out of the total.",
        "This method is called pairwise comparison and it's surprisingly more honest than asking yourself to rank everything in one go. Trying to compare 8 things at once is mentally overwhelming - the brain settles for whatever order they happened to come out in. Comparing two things at a time is something the brain is good at, so the answers are more decisive, and the aggregated win counts produce a final ranking that reflects your actual preferences rather than your tolerance for ranking exercises. It's the same principle behind chess Elo ratings and tournament brackets."
      ),
      createAnswerFirstSection(
        "Pairwise Comparison vs the Eisenhower Matrix",
        "The Eisenhower matrix splits tasks into four quadrants - urgent and important, not urgent but important, urgent but not important, neither - which is great for thinking about what to do today versus what to delegate. Pairwise comparison is different: it gives you a single ranked list, which is what you actually need when you're trying to pick the next thing to work on from a long backlog. Use the matrix to triage; use pairwise to sequence.",
        "The MoSCoW prioritisation model (Must have, Should have, Could have, Won't have) is another useful framework, especially for product backlogs and feature lists. Pairwise comparison can be used inside any one of those buckets to sequence your Musts. For tasks where importance is much more obvious than the order, just keep a simple to-do list - the [Decision Matrix Maker](/decision-matrix-maker) is overkill for daily work but useful when the stakes are higher."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does it ask so many questions for 10 items?",
        "Pairwise comparison needs n*(n-1)/2 questions to compare every item to every other item. For 10 items that's 45 comparisons, which sounds like a lot but takes about 5 minutes because each individual question is so easy. The benefit is that the final ranking reflects every possible matchup, not just the order you happened to think of items in."
      ),
      createFAQ(
        "What if two items are tied at the end?",
        "Ties are normal and meaningful - they tell you those items are roughly equivalent in your eyes, so the choice between them probably doesn't matter much. If you need a definitive answer, do another pass with just the tied items and add a tiebreaker criterion (deadline, effort, energy) that wasn't in the original consideration."
      ),
      createFAQ(
        "Should I use this for daily tasks or big life goals?",
        "It works for both, but the value is highest when you have 5 to 10 items that genuinely all feel important and you're stuck. For 30-item daily to-do lists, a quick pass through the Eisenhower matrix is faster. For big life goals where you have 8 things you want to pursue this year, pairwise comparison forces honest sequencing."
      ),
      createFAQ(
        "Can I redo a comparison if I changed my mind?",
        "Currently each comparison is final, but you can hit Reset and run the whole thing again. Most people find the second pass produces almost the same ranking - the method is more stable than it looks because borderline calls get averaged out by the sheer number of comparisons."
      ),
    ],
    relatedTools: [
      { slug: "decision-matrix-maker", label: "Decision Matrix Maker" },
      { slug: "pros-and-cons-generator", label: "Pros and Cons Generator" },
      { slug: "this-or-that-decider", label: "This or That Decider" },
    ],
  },

  "pros-and-cons-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Pros and Cons Tool Works",
        "Two columns sit side by side: pros on the left in green, cons on the right in red. Add an entry to either column and a 1-to-10 weight slider appears next to it. Set the weight to reflect how much that point matters - a £10,000 pay rise might be a 9, while 'free coffee in the office' is probably a 2. The tool sums up the weighted scores and shows the winner at the bottom along with the points difference. A 5-point margin means the decision is fairly clear; a 30-point margin means it's not actually a difficult call.",
        "Weighting is the upgrade that makes a pros and cons list useful rather than just symmetrical. A traditional list with five pros and five cons looks like a tie even if four of the pros are minor and one of the cons is a dealbreaker. Forcing yourself to rate each point on the same 1-to-10 scale exposes that asymmetry. The auto-save runs in the background, so you can come back to a half-finished list later, and there's a premium PDF export if you want to share the breakdown with a partner or paste it into a journal."
      ),
      createAnswerFirstSection(
        "When This Beats a Decision Matrix and When It Doesn't",
        "Pros and cons works best for two-state decisions: should I do this, yes or no? Should I take this job, accept this offer, move to this city, end this thing. The output is a binary recommendation, which matches the shape of the question. For decisions between three or more options, where the question is really 'which of these is best', a [Decision Matrix Maker](/decision-matrix-maker) is the better fit - pros and cons can't compare options against each other, only weigh up a single option's good and bad sides.",
        "The honest failure mode of pros and cons lists is motivated reasoning: secretly wanting to take the job, then unconsciously weighting every pro at 9 and every con at 3 until the maths agrees. To guard against this, write your list, walk away for an hour, then come back and ask: would I weight these the same way if my preferred answer were the opposite? If you'd nudge any weights, your gut already knows what you want and the list is just performance. Try the [Coin Flip But Smarter](/coin-flip-but-smarter) tool for catching that signal."
      ),
    ],
    faqs: [
      createFAQ(
        "How many pros and cons should I list?",
        "Three to seven on each side is the sweet spot. Fewer than three on either side and you probably haven't thought about the decision deeply enough. More than seven and you're padding the list with minor points that dilute the weights of the genuinely important ones."
      ),
      createFAQ(
        "What's the difference between this and a decision matrix?",
        "A pros and cons list weighs up one option (yes/no). A decision matrix compares multiple options against weighted criteria. If you're choosing between staying or leaving, use pros and cons. If you're choosing between three job offers, use a decision matrix."
      ),
      createFAQ(
        "Why are my weights making the answer change?",
        "That's the point - weights are how you tell the tool which factors matter. If a small change in weight flips the answer, the decision is genuinely close, and the deciding factors are whichever points are sitting near a weight of 5. Either gather more information about those points, or accept that the choice doesn't matter as much as you thought."
      ),
      createFAQ(
        "Can I save my list?",
        "Yes - the tool auto-saves to your browser's local storage every couple of seconds, so closing and reopening the page restores your last list. Pro subscribers get cloud save across devices, and there's a premium PDF export if you want a clean printable version."
      ),
    ],
    relatedTools: [
      { slug: "decision-matrix-maker", label: "Decision Matrix Maker" },
      { slug: "this-or-that-decider", label: "This or That Decider" },
      { slug: "coin-flip-but-smarter", label: "Coin Flip But Smarter" },
    ],
  },

  "roast-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Roast Generator Works",
        "Pick a category - general, tech, food, sports, or fashion - and hit Bring Another Heat. The tool serves up a randomly chosen light-hearted roast from that category, like 'Your debug like a person with a broken keyboard smashing random keys' for tech or 'Your fashion sense was rejected by a thrift store' for fashion. Copy the line, share it on a group chat, or rotate through a few until something fits the person you're roasting. Every line in the database is intentionally goofy rather than genuinely cutting - the comedy is in the absurd image, not in landing real damage.",
        "These exist for friendly contexts: birthday cards for mates who can take it, group-chat banter, comedy roast nights between friends, or 'roast me' moments where the target is asking for it. They are explicitly not insults to use on people who haven't agreed to be roasted, on minors, on coworkers you don't know well, or on anyone whose mood you don't want to make worse. Roast comedy as a genre works on the rule that everyone in the room is in on the joke. Without that, it's just being unkind."
      ),
      createAnswerFirstSection(
        "Picking the Right Category",
        "Match the category to something the person is known for or jokes about themselves first. A friend who loves cooking and is openly bad at it will get more comic mileage out of food roasts ('You have the cooking skills of a microwave that's afraid of heat') than out of tech roasts. The general category is the safe default when you don't know the person well or the context is mixed - the lines are broad enough that they could apply to anyone, which makes them obvious comedy bits rather than personal jabs.",
        "If you're writing a best-man speech or a milestone birthday card, a roast lands hardest when sandwiched between two genuine compliments. Set up something nice, drop the absurd insult, then return to a sincere line. That structure - sometimes called the 'roast and toast' format - keeps the affection visible underneath the comedy and stops the joke turning into something that lingers awkwardly. For pure sincerity instead, use the [Compliment Generator](/compliment-generator)."
      ),
    ],
    faqs: [
      createFAQ(
        "Are these safe to use on friends?",
        "Yes, on friends who enjoy banter and have given you the social go-ahead. Every line is written to be obviously absurd rather than genuinely hurtful. That said, roast comedy depends on context - the same line will land as hilarious in a roast night and uncomfortable in a quiet WhatsApp chat with someone going through a hard week."
      ),
      createFAQ(
        "Can I use these for a roast speech?",
        "These are great seed material for best-man speeches, milestone birthdays, leaving dos, and similar set-pieces. Take a generated line, swap in a specific reference about the target ('your cooking' becomes 'your famous risotto'), and you've got a personalised joke that still leans on the absurd structure of the original."
      ),
      createFAQ(
        "What if a roast crosses a line?",
        "If a line feels too sharp for your specific situation, regenerate. The database is deliberately varied so different lines hit different intensities - some are barely insults at all, others lean harder into the absurd. Skip until you find one that fits the room."
      ),
      createFAQ(
        "Is there a clean version for work?",
        "Every line in the database is already PG and avoids profanity, slurs, and adult themes. That said, the 'is this OK at work' question depends entirely on workplace culture. A small startup with banter-heavy slack might love a roast tossed into a leaving message; a more formal office definitely won't. When in doubt, switch to compliments."
      ),
    ],
    relatedTools: [
      { slug: "compliment-generator", label: "Compliment Generator" },
      { slug: "excuse-generator", label: "Excuse Generator" },
      { slug: "pickup-line-generator", label: "Pickup Line Generator" },
    ],
  },

  "salary-visualizer": {
    sections: [
      createAnswerFirstSection(
        "Your Salary, Broken Down to the Second",
        "Type in your salary and pick whether it's annual, monthly, weekly, or hourly. The tool reverse-engineers your annual figure (so a £15/hour wage assumes 260 working days per year at 7.5 hours per day, which is the UK full-time benchmark) and shows what you earn at every time scale: per year, per month, per week, per day, per hour, per minute, per second. A live counter ticks up in real time, showing how much you've earned just by sitting on the page. On a £35,000 salary, that's roughly £1.11 per second of work time, or about £0.11 per second across the whole calendar year (since you're earning during sleep too).",
        "The 'time to earn common items' section flips the perspective: instead of asking 'how much do I make per hour?', it asks 'how long do I work to afford a £4 coffee?'. On £35,000 a year, that's roughly 22 minutes of work. A £1,200 iPhone takes around 89 hours - just over two working weeks. A £300,000 house takes around 6.5 years of working time, ignoring tax and the fact you actually need to live during those years. These figures put salary into a kind of time currency that makes spending decisions feel more concrete."
      ),
      createAnswerFirstSection(
        "Why This Visual Works",
        "Salary is abstract in big numbers. £45,000 a year sounds like a lot or a little depending on your context, but it's hard to feel. Broken into £21.63 per hour, suddenly the question 'is this 4-hour Netflix binge worth £86 of my time?' becomes answerable. Broken into £0.36 per minute, ordering a £15 takeaway means you've worked 41 minutes of your day to afford it - and the next time you see a £20 'small' impulse purchase, the time-cost framing kicks in automatically.",
        "This isn't financial advice; it's a perception tool. Some people find this kind of analysis useful for spending discipline. Others find it depressing or anxiety-inducing. Use it as a one-time mental calibration if you're trying to understand your time-to-money exchange rate, then put the spreadsheet away. The [UK tax calculator](/uk-tax-calculator) shows what you actually take home after tax, which is the more honest number for these comparisons."
      ),
      createAnswerFirstSection(
        "How UK Salaries Compare",
        "ONS data puts the median UK full-time salary at around £37,000 in 2026, with London medians higher (around £45,000) and northern regions lower (around £32,000-£34,000). Below £27,500 puts you in the bottom quartile of full-time earners; above £55,000 puts you in the top quartile; above £80,000 puts you in the top 10%. These figures shift the 'is my salary good?' question into context - a £40,000 salary is comfortably above median nationally but slightly below London median, which feels different when you're paying £1,800 a month rent.",
        "The live counter is satisfying when you're earning well; the 'time to afford a house' figure is sobering when you're younger or in a high-cost city. Both reactions are normal. The tool isn't trying to make you feel any particular way - it's just showing you the maths. The [hourly to salary calculator](/hourly-to-salary) handles the reverse direction if you only know your hourly rate."
      ),
    ],
    faqs: [
      createFAQ(
        "Are these figures pre-tax or post-tax?",
        "The salary you enter is treated as gross (pre-tax). For accurate post-tax figures, run your salary through the [UK tax calculator](/uk-tax-calculator) first to get your take-home, then enter that as your salary here. Most people think about salary in pre-tax terms (because that's what's on the contract and payslip), so the tool defaults to that convention."
      ),
      createFAQ(
        "Why does the per-second figure differ from per-hour divided by 3600?",
        "Two different definitions: per-hour is calculated assuming you work 260 days × 7.5 hours = 1,950 hours per year. Per-second is calculated assuming all 365.25 × 24 × 3600 seconds (i.e. across the whole calendar year, including sleep). The first answers 'how much does an hour of work pay?'; the second answers 'on average across all time, how much am I earning?'. Both are useful for different framings."
      ),
      createFAQ(
        "Does the live counter keep running if I close the tab?",
        "No - the counter resets whenever you reload the page, because it's tracking time you've spent on this specific session. It's a visualisation of your earning rate, not a running tally of lifetime earnings. To see a meaningful number, leave the tab open for 5+ minutes; you'll see it climb measurably."
      ),
      createFAQ(
        "What about pension contributions and benefits?",
        "Not factored in. The tool treats salary as a flat number and doesn't adjust for pension matches, healthcare benefits, or other employer perks. Your true 'cost to employer' is typically 15-20% above your gross salary because of employer NI and pension contributions, but that's not what you take home and isn't useful for personal spending decisions."
      ),
      createFAQ(
        "Is the 7.5 hours per day assumption realistic?",
        "It's the UK full-time standard for office work (37.5-hour week). If you work shifts (12 hours, 4 on / 4 off) or part-time, the per-hour figure will be off because the tool assumes a different total. For non-standard schedules, just enter your hourly rate directly and the tool will work backwards from there to give you accurate per-day, per-week, and per-year figures."
      ),
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "hourly-to-salary", label: "Hourly to Salary Calculator" },
      { slug: "savings-burndown", label: "Savings Burndown" },
    ],
  },

  "celebrity-birthday-twin": {
    sections: [
      createAnswerFirstSection(
        "Who Shares My Birthday?",
        "Enter your birth date and the tool returns the celebrities born on the same day of the year (the same calendar date, ignoring birth year). The list draws from a database of around 800 well-known names spanning actors, musicians, athletes, scientists, politicians and historical figures, and shows each person's name, birth year and what they're known for. You'll typically get between 5 and 15 matches depending on how popular your date is.",
        "Some dates are absurdly stacked. 14 February has Michael Bloomberg, Florence Henderson and a dozen others; 25 December crams Humphrey Bogart, Annie Lennox, Justin Trudeau and Sissy Spacek into the same line. Other dates are quieter and you'll get a handful of names you may not recognise. That's not a bug; it just means fewer A-list celebrities happened to be born on 7 March. The fun part is when you find someone who shares not just the date but the same year as you."
      ),
      createAnswerFirstSection(
        "What Counts as a 'Birthday Twin'?",
        "Strictly, a birthday twin shares the same calendar date. A 'star twin' shares the same date AND year, which is much rarer and gives you the same astrological chart down to the minute if you also know the time. The chance of any two random people sharing a birthday is 1 in 365, but in a room of 23 people the probability that two of them share a birthday is over 50%. That's the famous birthday paradox.",
        "If you want to push it further, the chance of being a star twin with a specific celebrity (same date, same year) drops to roughly 1 in 133,000 if they're alive and roughly your age. Worth a screenshot if it happens. Pair this with the [how common is your name](/how-common-is-your-name) tool to see whether you also share a popular name with your celebrity twin, which makes for a fun social media post."
      ),
      createAnswerFirstSection(
        "How the Database Was Built",
        "The list was assembled from public-domain biographical sources and weighted toward people likely to be recognised by a global English-speaking audience in 2026. Coverage is heaviest for 20th and 21st century film, music and sport (where most users will recognise names) and lighter for 18th and 19th century historical figures. If a date returns nobody you've heard of, it's not because nobody famous shares your birthday; it's because famous-by-our-definition skews modern.",
        "Names are not weighted by current fame. A child star from the 1980s sits next to a sitting head of state. The tool also includes some high-recognition deceased figures (Mozart, Lincoln, Marilyn Monroe) where the date is iconic. If you'd like to dig into how popular your own name is alongside your celebrity twin's, try [How Common Is Your Name?](/how-common-is-your-name)."
      ),
      createAnswerFirstSection(
        "What to Do With the Result",
        "It's a great icebreaker. 'I share a birthday with [name]' beats 'I'm a Capricorn' as a conversation starter at a party, because it's specific and people can actually picture the celebrity. Some people pin it to their LinkedIn or use it in dating profiles. Others screenshot the list every year on their birthday and share it on social media; February dates in particular tend to do well because the lists are dense.",
        "If your match is someone you genuinely admire, you've got a low-effort birthday tradition: rewatch one of their films, listen to one of their albums, read about them. If your match is someone awful, treat it as a coincidence and move on; you don't have to claim them. For more shareable trivia about yourself, try the [mental age quiz](/mental-age-quiz) or [which decade do you belong in](/which-decade-do-you-belong-in)."
      ),
    ],
    faqs: [
      createFAQ(
        "Why don't I recognise any of the names on my list?",
        "Some calendar dates have fewer 'household name' celebrities than others. Mid-July and early February are densely populated with famous birthdays; some January and November dates are sparser. The database currently covers around 800 well-known figures, so on a thin date you may only see 3 or 4 names and they might be more niche (older film stars, historical figures, athletes outside your country's main sports)."
      ),
      createFAQ(
        "Can I find someone born on the same day AND year as me?",
        "The tool shows birth years for every celebrity on the list, so you can scan the year column for a match. Same-day-same-year matches are rare; you're looking at roughly a 1 in 130,000 chance for a given celebrity who happens to be alive and roughly your age. If you find one, you have a 'star twin' and your astrological chart matches theirs (minus the time and place of birth)."
      ),
      createFAQ(
        "Is this list updated when celebrities pass away?",
        "Currently it's a static database, so deceased celebrities still appear (which is the right call, since people often want to see if they share a birthday with a historical figure). New high-profile birthdays get added periodically when public figures break into mainstream recognition. The list errs on the side of inclusion: better to show you a name you can google than miss your favourite obscure indie musician."
      ),
      createFAQ(
        "Does this work for any country's celebrities?",
        "The database leans Anglophone (UK, US, Canada, Australia, Ireland) because that's the user base, but includes high-profile figures from elsewhere where they're internationally recognised. If you're looking for celebrities specifically from a non-English-speaking country, coverage will be patchier; you'll see Federer or Beyoncé but probably not the equivalent local star unless they crossed over."
      ),
      createFAQ(
        "Can I use this for trivia or pub quizzes?",
        "It's surprisingly good for that. Pick three random dates, see who shares each one, and you have a quick 'guess whose birthday this is' round. Pair it with the [pub quiz generator](/pub-quiz-generator) for a full quiz. Also works well as a kid's history lesson: 'Mozart and you share a birthday' tends to land better than a textbook."
      ),
    ],
    relatedTools: [
      { slug: "how-common-is-your-name", label: "How Common Is Your Name?" },
      { slug: "mental-age-quiz", label: "Mental Age Quiz" },
      { slug: "which-decade-do-you-belong-in", label: "Which Decade Do You Belong In?" },
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
    ],
  },

  "paint-colour-mixer": {
    sections: [
      createAnswerFirstSection(
        "What Colour Do You Get When You Mix Two Colours?",
        "Pick two colours from the palette (or use the custom hex picker) and the tool returns the average of the two RGB values, which is what most paint-mixing in everyday life produces. Mix red (#FF0000) and blue (#0000FF) and you get purple (#7F007F). Mix yellow (#FFFF00) and blue (#0000FF) and you get a muddy grey-green (#7F7F7F), which surprises people raised on the 'yellow + blue = green' rule from primary school.",
        "That surprise is the entire reason the tool exists. Subtractive colour mixing (real paint, where pigments absorb wavelengths) and additive RGB mixing (screens, where light combines) follow different rules. Online tools work in RGB because that's what your monitor speaks. The result you see is what those two colours produce on screen; in actual oil or acrylic paint, the result will be a bit different because of how pigments interact. Use this for digital design, hex code experiments and 'what would this look like' tests, not for predicting the exact shade your wall will become."
      ),
      createAnswerFirstSection(
        "How the Mixer Calculates the Result",
        "The maths is the average of the two hex codes' red, green and blue components, taken separately. Red 100 mixed with red 200 gives red 150. Same for green and blue. So #FF0000 (255, 0, 0) mixed with #0000FF (0, 0, 255) gives (127, 0, 127), which is hex #7F007F. The tool then matches the result against a list of around 30 named colours and shows you the closest one (e.g. 'Mauve', 'Olive', 'Mint').",
        "If you want different ratios (70% red, 30% blue instead of 50/50), this tool doesn't do that. It always splits 50/50. That's a deliberate simplification: real paint mixing has hundreds of variables (white base, drying time, light source, gloss vs matte) and a tool that pretended to model all of them would be giving false precision. For weighted mixes try the [colour palette generator](/colour-palette-generator), and for digital colour work the [colour contrast checker pro](/colour-contrast-checker-pro) checks accessibility once you've picked your shades."
      ),
      createAnswerFirstSection(
        "Why Yellow Plus Blue Doesn't Always Make Green",
        "On screen, yellow is full red and full green light combined (#FFFF00). Blue is full blue light (#0000FF). Average those and you get half red, half green, half blue, which is grey. That's not a bug in the tool; that's how RGB averaging works. In actual paint, yellow pigment absorbs blue light and reflects green/red; blue pigment absorbs red/green and reflects blue. Mixed together, only green light gets reflected by both, so you see green.",
        "Tools that simulate paint properly use a model called Kubelka-Munk that approximates how light bounces through layers of pigment. That model is overkill for picking a hex code. If you're a digital artist or designer, the RGB average is what you actually want, because it tells you what your screen will show. If you're a traditional painter trying to predict the exact colour of cobalt blue mixed with cadmium yellow, no tool will fully replace mixing a test patch on your palette."
      ),
      createAnswerFirstSection(
        "Common Use Cases",
        "Designers use this when they want a transition shade between two brand colours (e.g. mixing a logo blue with a logo green to find a midpoint for a gradient). Hobbyists use it to see what custom hex values would look like before committing them to a CSS file or a craft project. Children use it because it's a satisfying loop: pick two squares, see what comes out, repeat.",
        "Worth saying: the tool is fully client-side. Your colour combinations don't get logged or stored. If you find a result you like, save the hex code somewhere (a text file, a Notion page, a notes app) because the tool has no save feature. For building out a full palette from one starting colour, switch to [colour palette generator](/colour-palette-generator), which takes one input and gives you four or five complementary shades."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does mixing red and green give brown?",
        "On screen, red is (255, 0, 0) and green is (0, 255, 0). The average is (127, 127, 0), which is olive/dark yellow, not brown exactly but close. In the colour-naming list, this lands at 'Olive'. Brown is technically just a dark, low-saturation orange or red, so the perception of 'brown' depends on what surrounds it. Try mixing the result with a third colour for richer browns."
      ),
      createFAQ(
        "Can I mix more than two colours?",
        "Not in one step. The tool is strictly two-input. If you want a three-colour mix, mix the first two, copy the resulting hex code, then mix that with the third colour. Each step takes the average, so the final result is mathematically equivalent to weighting the first two colours at 25% each and the third at 50%."
      ),
      createFAQ(
        "What's the closest named colour for my mix?",
        "The tool runs the result against around 30 well-known colour names (Burgundy, Mauve, Olive, Coral, Teal, etc.) and returns the closest match by RGB distance. If your result doesn't match any common name within a reasonable threshold, it labels it 'Mixed Color'. The match isn't perfect; colour naming is subjective and brands often disagree on what counts as 'coral' vs 'salmon'."
      ),
      createFAQ(
        "Will the on-screen colour match real paint?",
        "Approximately, in good lighting, on a calibrated monitor. In practice, no. Paint has texture, sheen and pigment behaviour that screens don't reproduce. Use the tool to narrow your shortlist, then get a paint sample pot before committing to a wall. For brands like Farrow & Ball or Dulux, also check their official hex code, which is usually published; this tool's RGB average won't match their published values exactly."
      ),
    ],
    relatedTools: [
      { slug: "colour-palette-generator", label: "Colour Palette Generator" },
      { slug: "colour-contrast-checker-pro", label: "Colour Contrast Checker Pro" },
      { slug: "gradient-generator", label: "Gradient Generator" },
      { slug: "hex-to-rgb", label: "Hex to RGB Converter" },
    ],
  },

  "how-common-is-your-name": {
    sections: [
      createAnswerFirstSection(
        "How Popular Is Your Name in the UK?",
        "Type your first name and the tool returns its rank in the UK over the past century, the decade it peaked in popularity, and whether it's currently rising, falling or stable. Names like 'Oliver' and 'Noah' are rising sharply (Oliver was rank 16 historically but is the top boys' name in 2025); names like 'Karen' and 'Linda' have collapsed since their 1960s peak. The database covers around 100 male and female names that have appeared in the UK Office for National Statistics top-ranked baby name lists since 1900.",
        "If your name isn't in the database, you're probably either very common (it should be there - try a different spelling) or genuinely rare. The tool also shows a six-decade bar chart so you can eyeball the trend. James was huge in the 1940s (rank 1) and is still strong but no longer top. Sarah peaked in the 1990s. Mary was the dominant girls' name for most of the 20th century and has now fallen off entirely from the top 100."
      ),
      createAnswerFirstSection(
        "Why Some Names Vanish While Others Endure",
        "Names follow generational cycles of around 80 to 100 years. A name your grandmother had (Doris, Edna, Mildred) feels old-fashioned to your parents but charming to your children, who will likely revive it. Names your parents had (Karen, Linda, Susan) are in the trough right now and feel dated, but they'll come back in 30 to 40 years. This is why baby naming consultants advise against picking the dominant name of your own parents' generation; you're picking the name that will feel most aged to your child as they grow up.",
        "Some names break the cycle and become genuinely timeless. James, William, Mary and Elizabeth have stayed in the UK top 30 for over a century. They're 'safe' picks if you want a name that won't date. The downside is that your child will share a classroom with two other Williams. For more naming research, try the [baby name explorer](/baby-name-explorer) or generate options with the [baby name generator](/baby-name-generator)."
      ),
      createAnswerFirstSection(
        "How the Rankings Are Calculated",
        "The data approximates UK ONS baby name records from 1900 to 2020s, sampled in decade buckets (1920s, 1930s, etc.). Rank shown is roughly that name's position in the all-time top 100 across the period. The 'peak' value tells you which decade saw the most babies given that name. The trend label compares the most recent two decades against the earlier four: 'rising' means current popularity exceeds historical average, 'stable' means flat, 'falling' means it's well below its peak.",
        "There are limits. Spelling variants (Sara vs Sarah, Stephen vs Steven) are usually grouped, but not always. Welsh, Scottish and Northern Irish names that didn't break into the all-UK top list won't appear; the ONS publishes separate national lists for those, which this tool doesn't currently merge in. Names with strong religious or cultural roots in immigrant communities (Mohammed, Fatima) are in the actual ONS top 100 for the 2010s and 2020s but historical depth is shallow because they weren't recorded as separate entries before mass migration."
      ),
      createAnswerFirstSection(
        "What to Do With Your Result",
        "If your name is rare (rank 80+) you've got something distinctive. If it's top 10 (currently Olivia, Amelia, Isla, Ava, Mia for girls; Noah, Oliver, George, Arthur, Muhammad for boys), prepare to share it with classmates and colleagues forever. Knowing your name's peak decade is a fun shortcut for guessing someone's age: if you meet a Karen, she's almost certainly born between 1955 and 1975. If you meet an Olivia, she's almost certainly under 25.",
        "Pair this with the [celebrity birthday twin](/celebrity-birthday-twin) tool to find a celebrity who shares both your name and your birthday, which is genuinely rare and a great social media post. If you're picking a baby name, run the candidates through here to avoid accidentally picking something currently surging (your kid will be one of five in their class) or sliding into trough territory (your kid will sound like their grandmother)."
      ),
    ],
    faqs: [
      createFAQ(
        "My name isn't in the database. What does that mean?",
        "It usually means your name has never appeared in the UK ONS all-time top 100, so it's genuinely uncommon. The database currently covers around 100 male and 100 female names that have hit the top 100 at some point since 1900. Names with regional, ethnic or modern coinages (Mohammed-spellings, very modern American imports, made-up Instagram names) may be missing even if they're now rising. If you spelled it differently (Sara vs Sarah, Mohammed vs Muhammad), try both."
      ),
      createFAQ(
        "Why is the data UK-only?",
        "The UK Office for National Statistics publishes high-quality baby name data going back over a century, which makes the trend lines reliable. US Social Security Administration data also exists but the lists differ significantly (Madison, Ashley and Tiffany rank much higher in the US than the UK, and vice versa for Oliver and Charlotte). A US-specific version may come later. For now, names ranked here are by UK frequency."
      ),
      createFAQ(
        "Does the tool know about double-barrel or compound names?",
        "Mostly no. Mary-Jane, Tommy-Lee, Lily-May and similar compound names are tracked separately by the ONS but aren't in this tool's current database. If you have a double-barrel name, search for the first half and you'll get a reasonable approximation of how common your full name is."
      ),
      createFAQ(
        "Can I see the trend chart for my name?",
        "Yes, when your name is in the database you'll see a six-bar chart showing approximate frequency by decade (1960s through 2020s, roughly). The bars are scaled relative to that name's peak, not to other names, so a small bar for 'James' is still more babies than a tall bar for 'Atticus'. The trend label ('rising', 'falling', 'stable') summarises the shape of the chart."
      ),
      createFAQ(
        "Is it OK to pick a falling name for my baby?",
        "Yes, if you like it. Falling names often feel fresh again after 60 to 80 years. 'Margaret' and 'Florence' were considered terribly dated in the 1990s and are now solidly back in fashion. Use the chart to spot names that are deep in their trough; those are the names most likely to be revived in the next decade. Avoid names that are at peak right now, because they'll feel saturated to your child as they grow up."
      ),
    ],
    relatedTools: [
      { slug: "celebrity-birthday-twin", label: "Celebrity Birthday Twin" },
      { slug: "baby-name-explorer", label: "Baby Name Explorer" },
      { slug: "baby-name-generator", label: "Baby Name Generator" },
      { slug: "mental-age-quiz", label: "Mental Age Quiz" },
    ],
  },

  "excuse-generator": {
    sections: [
      createAnswerFirstSection(
        "When a Genuine Excuse Won't Do",
        "The tool returns a random excuse from one of five categories: work, social, gym, chores or school. Pick the category, click generate, and you get one excuse at a time (no list dumps). Each excuse is a complete one-liner you can copy and paste into a text. Examples lean believable rather than absurd: 'My washing machine flooded and I'm waiting for the engineer' for work, 'I've come down with something and don't want to spread it' for social, 'My back has been giving me trouble' for gym.",
        "It's not a tool to teach you how to lie effectively. It's a tool for the moments when you genuinely need to bail, you can't find words, and you'd rather have a list to pick from than stare at a blank text input. The four most common scenarios users actually hit: declining a colleague's after-work drinks, getting out of a gym day you committed to with a friend, postponing a chore you said you'd do, and writing a 'sorry I missed it' message after the event."
      ),
      createAnswerFirstSection(
        "Picking the Right Category",
        "Work excuses lean toward logistics and dependents (childcare emergency, household problem, urgent appointment). Social excuses lean toward energy and timing (early start tomorrow, family thing came up, not feeling 100%). Gym excuses are mostly body-related (sore from yesterday, twinge in the back, virus going round). Chores excuses are practical (ran out of time, store was closed, missing the right tool). School ones (designed for older kids and teenagers, not primary-age) are the classic forgot-my-book / left-it-at-home / printer-broke set.",
        "Match the category to the relationship. Don't use a 'gym' excuse with your boss. Don't use a 'school' excuse on your dentist. The categories aren't disguised; they affect tone (chores excuses are casual, work excuses are professional). If the excuse the tool gives you would obviously not work for your situation, generate again. There are around 15 to 20 excuses per category and you can keep cycling until something fits. Pair this with the [compliment generator](/compliment-generator) if you want to soften the message."
      ),
      createAnswerFirstSection(
        "What Makes an Excuse Believable",
        "Specific beats vague. 'My boiler broke this morning' is better than 'something came up' because it's hard to follow up on without being intrusive. Excuses that name a third party (the engineer, the doctor, the school) are stickier than excuses that depend only on you. Excuses that imply you'll be free later or tomorrow are kinder than 'I just don't feel like it', which feels rejecting even if it's the honest version.",
        "Don't escalate. If you've used 'my boiler is broken' twice this month with the same person, switch categories. Most excuses get burned after one use; the same household crisis happening repeatedly looks suspicious. The tool deliberately rotates examples so you don't pick the same one twice in a row. Where possible, soft-cancel rather than hard-cancel: 'Can we move it to next week?' instead of 'I can't make it tonight.'"
      ),
      createAnswerFirstSection(
        "When You Should Just Say No",
        "If you're regularly using excuses to dodge something, the problem isn't the excuse, it's the commitment. Saying no without justification is a skill worth building. 'Thanks for the invite, I won't make this one' is a complete sentence and doesn't need a story. Most people don't follow up. The ones who do are usually the ones who'd see through a bad excuse anyway. Keep this tool for the genuinely awkward one-offs (last-minute cancellations, things you said yes to and now regret) rather than as a daily habit.",
        "If you find yourself constantly bailing, look at why. Are you over-committing? Are you saying yes when you mean maybe? Use a structured plan to figure out which obligations you actually want to keep. The [bucket list generator](/bucket-list-generator) is good for re-prioritising what you actually want your free time for; the [roast generator](/roast-generator) is good if you need a friend to call you out instead. The excuse generator is the bandage, not the cure."
      ),
    ],
    faqs: [
      createFAQ(
        "Are these excuses safe to use professionally?",
        "The 'work' category is written to be plausible in office settings. They lean toward unverifiable household or family issues that managers won't typically grill you on. Avoid using them more than once a quarter with the same manager; HR systems usually log absence patterns and a string of 'flooded boilers' raises eyebrows. Genuine illness ('I've come down with something') is usually the safest excuse because most workplaces don't want sick people in the office anyway."
      ),
      createFAQ(
        "Will my friend know I used a generator?",
        "Almost certainly not. The excuses are written to sound natural in a text message and don't have telltale phrases. The give-away is usually behaviour, not wording: if you reply five seconds after seeing their invite with a perfectly polished 30-word excuse, that's faster and tidier than a real bail message normally is. Wait a minute, drop a typo or two, and add a relationship-appropriate phrase ('sooo sorry') and it'll read as genuine."
      ),
      createFAQ(
        "Can I generate an excuse for being late?",
        "Most of the work and school excuses double as 'late' excuses if you swap 'I can't come in' for 'I'm running late'. Traffic, train delays, a school run that overran, finding the cat that escaped, are all on the lists. The tool doesn't have a separate 'late' category but the work category covers it well."
      ),
      createFAQ(
        "Why does the gym category feel guilt-trippy?",
        "Gym excuses are weird because the only person you're letting down is yourself (or a workout buddy). Most users hitting that category are looking for words to say to a friend after they've already decided not to go. The excuses are written to acknowledge that and not pretend you tried. If you want motivation instead of a way out, swap to the [compliment generator](/compliment-generator) for some self-affirmation."
      ),
      createFAQ(
        "Can I add my own excuses?",
        "Not in the tool itself; it's a fixed database. If you've got a great excuse the tool doesn't have, the easiest workaround is to use it as a starting point and rewrite the result in your own voice. For something funnier and more absurd, try the [conspiracy theory generator](/conspiracy-theory-generator) or the [roast generator](/roast-generator) for irreverent angle."
      ),
    ],
    relatedTools: [
      { slug: "compliment-generator", label: "Compliment Generator" },
      { slug: "roast-generator", label: "Roast Generator" },
      { slug: "conspiracy-theory-generator", label: "Conspiracy Theory Generator" },
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
    ],
  },

  "compliment-generator": {
    sections: [
      createAnswerFirstSection(
        "When You Want to Say Something Nice and Can't Find the Words",
        "The tool returns a single warm compliment from one of four categories: friends, partner, colleagues, or self-affirmation. Each compliment is written to feel genuine rather than smarmy: 'You make even ordinary days feel special' for partners, 'Your work ethic inspires the whole team' for colleagues, 'I'm proud of how far I've come' for self. Click generate to cycle through the bank (around 10 to 15 per category). Copy the one you like and send it.",
        "Most users land here for one of three reasons: they want to send something kind to someone going through a rough patch but don't trust their own writing voice; they're trying to dilute a long stretch of grumpy texts with something warmer; or they're working on self-talk and want a starter phrase they can actually believe. None of those are silly. Putting kindness into words is a skill, not a personality trait, and reading three good examples helps you write a better fourth."
      ),
      createAnswerFirstSection(
        "Why the Compliment Has to Match the Relationship",
        "A 'partner' compliment ('You make me feel completely myself') sent to a colleague will land at best as awkward and at worst as creepy. A 'colleague' compliment ('Your professionalism sets the standard') sent to your partner reads as cold and corporate. The category structure exists so you can sort the language register before you send. If the tool throws you something that doesn't fit, generate again; the bank is small enough that you'll see most options within five clicks.",
        "The 'self' category is different. It's written in first person ('I'm proud of how I handled that') rather than 'you' statements, because self-affirmation needs to feel like something you'd actually say to yourself in the mirror, not something a stranger said about you. If you want positive content for journalling or morning routines, this category produces single-sentence prompts that are short enough to write on a sticky note. The [bucket list generator](/bucket-list-generator) pairs well if you also want goal-setting prompts."
      ),
      createAnswerFirstSection(
        "Making a Compliment Feel Genuine",
        "Compliments work best when paired with one specific thing the person actually did. The generator gives you the warm framing; you add the detail. 'You make even ordinary days feel special' becomes 'You make even ordinary days feel special - like that random Tuesday you brought home a slice of cake just because you knew I'd had a long meeting'. The specifics turn it from a greeting card into something only you could have written.",
        "Don't string three compliments together. One sincere line beats three. Don't use it as a setup for a request ('You're so talented... could you also help me move on Saturday?'); the compliment becomes obvious manipulation. Use them at neutral moments rather than after arguments or right before asks; the timing matters more than the wording. If you're trying to repair after a fight, lead with apology, not flattery."
      ),
      createAnswerFirstSection(
        "Why Self-Affirmation Works (Even When It Feels Silly)",
        "Saying nice things to yourself feels artificial at first because most people aren't in the habit of it. There's actually decent research behind it: writing self-affirmations before stressful events lowers cortisol and improves task performance, particularly for people who are usually self-critical. The trick is to pick affirmations you can plausibly believe ('I'm capable of handling difficult conversations') rather than ones that feel too far from where you are ('I am the most successful person in my industry').",
        "Treat the self-affirmations from this tool as a starting bank. The ones that resonate, you save. The ones that feel hollow, you skip. Over a couple of weeks you'll naturally drift toward the framing that fits your life. Pair this with the [excuse generator](/excuse-generator) if your problem is also that you're saying yes to too many things and need a way to bow out kindly, or with the [nickname generator](/nickname-generator) if you want a more playful angle."
      ),
    ],
    faqs: [
      createFAQ(
        "Will it sound generic if I send a generated compliment?",
        "It's the difference between 'happy birthday' and 'happy birthday, hope today's amazing'. The base phrase from the tool is fine; the bit of context you add (a name, a specific shared moment, an emoji that fits how you actually text) makes it sound like you. Most people don't analyse compliments for evidence of human writing; they just feel pleased."
      ),
      createFAQ(
        "Is the 'partner' category appropriate for a new relationship?",
        "Some of them are. The longer-relationship ones ('After all these years you still surprise me') will feel premature in week three. The shorter ones ('You make me laugh in a way nobody else does') work fine from early dating onwards. Generate a few, pick the ones that match where you actually are, ignore the rest."
      ),
      createFAQ(
        "Can I use these for online dating profiles or bios?",
        "The 'self' category works well as a tone-setter for a bio, but read the result out loud first. Anything that sounds like a corporate mission statement ('I am committed to excellence') will turn people off. The compliments in this tool are designed for one-to-one messages, not public profiles, so use them as inspiration rather than copy-paste."
      ),
      createFAQ(
        "How is this different from a roast generator?",
        "Compliments are sincere and warm; the [roast generator](/roast-generator) is for friendly teasing between people who clearly like each other. They're not interchangeable. A roast lands as a roast because the relationship is already strong; a compliment lands when timing and specificity are right. Pick the tool that matches the vibe you want, not the energy you have at the moment of writing."
      ),
    ],
    relatedTools: [
      { slug: "excuse-generator", label: "Excuse Generator" },
      { slug: "roast-generator", label: "Roast Generator" },
      { slug: "nickname-generator", label: "Nickname Generator" },
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
    ],
  },

  "nickname-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Nickname Generator Builds Variants From Your Name",
        "Type a name and pick a style (cute, cool, funny, sporty, royal, gamer). The tool generates eight nickname variants by chopping your name into syllables and combining the chunks with style-specific suffixes. For 'Alexander' in cute style: Alexie, Alexkins, Alexy, Alexpoo, little A, Alexsweet, Alexcup, honeyA. Same name in gamer style: xAlexx, Alex_pro, darkAlex, Ar_gaming, Alexslayer, legend_Alex, Alexnova, epic_A.",
        "It works best for names that have at least 5 letters and some kind of repeatable syllable. Short names (Tom, Sam, Liz) come out a bit thin because there's not much to chop; you'll see things like 'tokins' and 'tosweet' which are fine for small kids but odd for adults. Longer names (Christopher, Elizabeth, Alexander) give the most varied output. Click any of the eight results to copy it to clipboard; the tool doesn't save anything."
      ),
      createAnswerFirstSection(
        "Picking a Style That Fits the Person",
        "Cute (-ie, -kins, -y, -poo, honey-) is for partners, kids, pets and very close friends. Don't use a 'cute' nickname for a colleague; it will read as patronising or worse. Cool (initials, -man, the -, -force, captain -) is what people pick when they want their gamertag or DJ name to sound confident. Funny (-zilla, -tron, professor -, mighty -) is for friend groups where everyone has an in-joke nickname; outside that context it'll fall flat.",
        "Sporty (turbo -, flash -, speed -, power -) is what coaches give younger kids; it sounds dated on adults. Royal (king -, his majesty -, sir -, emperor -) is high-camp and only works ironically. Gamer (x_x, dark_, legend_, _slayer) is for usernames on Steam, Discord and Xbox Live; absolutely don't put it on your CV. The category structure exists so you don't accidentally call your boss 'Alexpoo'. Try the [excuse generator](/excuse-generator) if you want a way to get out of an awkward nickname someone gave you."
      ),
      createAnswerFirstSection(
        "When the Output Is Bad",
        "It happens. Some name-and-style combinations break the formula and produce something unusable. 'Hugh' in royal style becomes 'King Hu' which isn't ideal. 'Phil' in cute becomes 'Philpoo' which is a hard sell. The tool doesn't filter for actual usability; it just runs the algorithm. If your eight results all look weird, try a different style, try a longer version of the name (Philip not Phil, Hugh not Hu) or use the name in a different way (last name, full name, middle name).",
        "If you're naming a character (game, novel, podcast handle) rather than a person, the 'cool' and 'gamer' styles tend to give the most usable output because they're designed to look like internet handles. Don't expect the result to be a one-shot perfect name; most people generate, copy two or three favourites, and pick from there. Pair with the [business name generator](/business-name-generator) if you're naming something other than a person."
      ),
      createAnswerFirstSection(
        "Nicknames That Stick vs Ones That Don't",
        "A nickname sticks because it's short, easy to say, and earned naturally. 'Beth' for Elizabeth sticks because everyone in the family started using it when she was 6. 'Eli-thunder-beth' invented by your friend group in week two of university doesn't stick because nobody can be bothered to say all of it. The names from this tool are starting points; they only become real nicknames if the person you give them to actually starts using them. Most won't.",
        "Don't impose nicknames on adults you don't know well. Even a friendly 'cool' style nickname can read as overstepping. Wait until someone uses it about themselves first, or ask. For self-naming (a gamertag, a podcast name, a Discord handle) you have full freedom; pick whatever you like, you can always change it. For naming someone else (a partner, a colleague, a sibling), be lighter on the trigger. The [compliment generator](/compliment-generator) is a safer way to give someone something positive than inventing a nickname they didn't ask for."
      ),
    ],
    faqs: [
      createFAQ(
        "Why are some of the nicknames just my name with letters tacked on?",
        "That's the algorithm. The tool slices your name in half (first syllable) and adds style-specific suffixes. Long names with multiple natural break points (Alexander → Alex, Christopher → Chris) generate cleaner-sounding nicknames than short names. If your output is mostly 'name + suffix' results, try entering a slightly longer version (full name including middle, or first + last) for more variety."
      ),
      createFAQ(
        "Are gamer nicknames OK to use as actual usernames?",
        "On Steam, Discord, Xbox Live and most game platforms, yes. The format (lowercase, underscores, mixed letters and numbers) matches platform conventions. They won't be unique because thousands of other people have similar handles, so you'll likely have to add numbers when you register. The tool doesn't check uniqueness; it just generates possible names."
      ),
      createFAQ(
        "Can I generate a nickname for my pet?",
        "Yes. Cute style works particularly well for pets (Bellakins, Rexie, Honeymax). Royal style is unintentionally hilarious for cats (King Whiskers, Lord Mittens). Just type the pet's name in the input field instead of a person's."
      ),
      createFAQ(
        "What if my name is non-Western and the suffixes don't fit?",
        "The suffixes are designed around English phonology, so they may sound forced on names from other languages. Try the cool or gamer styles, which use initials and shorter chunks rather than English diminutives. If nothing fits, the tool may just not be the right fit for your name; the [business name generator](/business-name-generator) might give you a better starting point if you're looking for something creative rather than diminutive."
      ),
    ],
    relatedTools: [
      { slug: "compliment-generator", label: "Compliment Generator" },
      { slug: "business-name-generator", label: "Business Name Generator" },
      { slug: "baby-name-generator", label: "Baby Name Generator" },
      { slug: "excuse-generator", label: "Excuse Generator" },
    ],
  },

  "this-or-that-decider": {
    sections: [
      createAnswerFirstSection(
        "When You Genuinely Cannot Pick Between Two Things",
        "Type two options into the boxes (Pizza vs Tacos by default) and click Decide. The tool runs a 3-second animation, then declares one of the two the winner. After the result, it asks 'How do you feel?' with two buttons: 'Great!' (you accept the result) or 'Actually, [the other one]' (you flip to the other option). That second button is the entire point of the tool: the moment you see the random pick and feel disappointed, you've just learned which one you actually wanted.",
        "It's not a serious decision aid. The randomisation is a 50/50 coin flip; the tool isn't weighting cost, time, calories or any other factor. What it does well is force a decision out of someone who's been stuck for ten minutes between two restaurants. Use it for tiny choices that don't matter much (lunch, film, route home) and for medium choices where you've over-thought it and need a tiebreaker. Don't use it for genuinely consequential decisions; you need a pros-and-cons list, not a coin flip."
      ),
      createAnswerFirstSection(
        "The Real Decision-Making Trick (Disguised as a Random Tool)",
        "The 'How do you feel?' prompt after the result is borrowed from a classic decision-making technique: when you can't pick, flip a coin, and the moment the result lands, notice which one you wanted to win. If you're glad the coin showed Option A, then A is your real preference; if you're disappointed, B is. The tool just automates that trick. Most people who use it don't even need the random pick; they need the tiny moment of relief or disappointment that tells them what they actually want.",
        "If you keep flipping the result with the 'Actually...' button until you're satisfied, you've used the tool perfectly. That's not a failure of the randomiser; that's you arriving at your real preference through elimination. The animation between options exists to give you that moment of suspense in which you commit emotionally to one outcome. A pure instant-result coin flip wouldn't trigger the same feeling."
      ),
      createAnswerFirstSection(
        "Common Use Cases",
        "Lunch decisions are by far the top use, followed by film/show decisions and 'should I go out tonight or stay in'. Couples and friend groups use it as a tiebreaker when they've been arguing in circles for fifteen minutes. Solo users use it to break analysis paralysis on tiny purchases (red mug or blue mug, this jumper or that one). It also works for binary ethical-but-not-serious dilemmas: 'tell my friend their haircut looks weird, or stay quiet'.",
        "Don't use it for things that would benefit from research. 'Buy this house or that house' is not a coin-flip decision. 'Which job offer should I take' is not a coin-flip decision. For those, sit down with a list of pros and cons or talk to someone you trust. The this-or-that decider is a low-stakes tool for low-stakes decisions; using it for life choices is the equivalent of choosing your university by drawing names from a hat. Save it for the trivial stuff and you'll get good use out of it."
      ),
      createAnswerFirstSection(
        "Why You Get Stuck on Tiny Decisions",
        "Decision fatigue is real. Once you've made 50 decisions in a day (what to wear, what to eat for breakfast, which email to answer first), tiny binary choices late in the day become disproportionately hard. Your brain is conserving glucose and would rather defer than commit. That's why people who eat the same breakfast every day or wear the same outfit (Steve Jobs, Mark Zuckerberg) report feeling sharper for the bigger decisions; they've eliminated the small ones.",
        "If you find yourself reaching for this tool multiple times a day, you might be over-optioning your life. Try eating the same lunch on weekdays for a fortnight and see how much mental energy that frees up. Use the tool for the genuinely random choices (which film tonight) and try to reduce the number of trivial decisions you face overall. The [bucket list generator](/bucket-list-generator) is a counterpoint: it's for when you have too few choices, not too many."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the result genuinely random?",
        "Yes. The tool uses Math.random() which gives a pseudo-random 50/50 split. There's no weighting based on which option you typed first, no tracking of past choices, no algorithm that figures out what you 'really' want. Whatever appears is a true coin flip. The 'Actually, the other one' button is what makes the tool useful, not the randomness itself."
      ),
      createFAQ(
        "Can I add more than two options?",
        "Not in this tool, no. It's strictly a binary decider. If you have three or more options, you've got two ways forward: run the tool multiple times in a tournament bracket (A vs B, then winner vs C), or eliminate options yourself first and bring it down to two. Most three-option dilemmas are really two-plus-a-default; spot the default and you're back to a binary."
      ),
      createFAQ(
        "Does it work for serious decisions like job offers?",
        "Don't use it that way. The 'check how you feel about the result' trick can be a useful tiebreaker between two roughly equal options, but if your decision involves significant money, time or relationships, you need a proper pros-and-cons sheet and ideally a conversation with someone who's been through a similar choice. This tool is for trivia."
      ),
      createFAQ(
        "Why does it take 3 seconds to decide?",
        "The animation gives you time to commit emotionally to one option before the result appears. A pure instant flip would skip that emotional step and miss the entire point of the tool. The 3 seconds is intentional; if you're impatient, you're using it wrong (and probably don't actually need the tool, you've already decided)."
      ),
    ],
    relatedTools: [
      { slug: "magic-8-ball", label: "Magic 8 Ball" },
      { slug: "coin-flip", label: "Coin Flip" },
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
      { slug: "bucket-list-generator", label: "Bucket List Generator" },
    ],
  },

  "pop-star-name-generator": {
    sections: [
      createAnswerFirstSection(
        "How Pop Star Names Get Made",
        "Pop star names tend to follow patterns: single word punchy names (Madonna, Beyoncé, Rihanna, Adele), first-name-with-last-initial (Lana Del Rey, Lady Gaga), or alphabet-letter combinations (NAS, M.I.A., SZA). The generator combines first names, mononyms, surname initials, and stylings to produce plausible-sounding pop star names.",
        "Common patterns: classy first name + dramatic surname (Aurora Vale, Stella Lux), single bold word (Phoenix, Echo, Velvet), mythological references (Athena, Orion), or letter-stylings (KIRA, NEVA). Real pop stars adopt names for branding - Lady Gaga is born Stefani Germanotta; Bruno Mars is born Peter Hernandez. Stage names work better when memorable and easy to spell."
      ),
      {
        heading: "Pop Star Name Generation Patterns",
        table: {
          headers: ["Pattern", "Example"],
          rows: [
            ["Single mononym", "Aurora, Phoenix, Lyric"],
            ["Two words bold", "Lana Spark, Velvet Storm"],
            ["First + last init", "Maya R., Eden L."],
            ["Stylised letters", "K.A.I., L.U.X.E"],
            ["Foreign-sounding", "Soleil, Aria, Ivory"],
            ["Lowercase aesthetic", "billie, olivia, dua"],
            ["Edgy single word", "Riot, Flux, Halo"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I use this for my actual stage name?",
        "As a starting point, yes. Test the generator output against social media (is the handle available? - check Instagram, TikTok, X), trademark databases (is it taken?), pronunciation (would fans guess how to say it?). The best stage names are simple, memorable, and unique."
      ),
      createFAQ(
        "What makes a good pop star name?",
        "Easy to spell, easy to say, distinctive. Avoid names too similar to existing artists (Beyonce, Adele, etc.). Single-word names dominate modern pop. Numbers or special characters work in some genres but hurt search/discovery on streaming platforms."
      ),
    ],
    relatedTools: [
      { slug: "rapper-name-generator", label: "Rapper Name Generator" },
      { slug: "band-name-generator", label: "Band Name Generator" },
      { slug: "nickname-generator", label: "Nickname Generator" },
    ],
  },

  "rapper-name-generator": {
    sections: [
      createAnswerFirstSection(
        "Rapper Name Patterns",
        "Rap names typically use: prefix conventions (Lil, Big, Young, Yung, MC, DJ, $) + name/word combos (Lil Wayne, Big Sean, Young Thug, MC Hammer). Or: name + descriptor (Tyler the Creator, Kendrick Lamar - real first/last name combos that sound rap-natural). Modern trap rap uses: stylised punctuation ($uicideboy$, MIKE) and number swaps (T1, Capone-N-Noreaga).",
        "Conventions vary by era and subgenre. Old-school East Coast rap: aggressive single-syllable names (Nas, Jay-Z, Eminem). Trap/Atlanta: numbers and adlibs (Future, Migos, 21 Savage). Conscious/lyrical: poetic full names (Kendrick Lamar, J. Cole, Common). Drill: punctuation and symbols (Pop Smoke, Sheff G). The generator can target specific subgenre styles."
      ),
      {
        heading: "Rapper Name Patterns",
        table: {
          headers: ["Style", "Example"],
          rows: [
            ["Lil + word", "Lil Storm, Lil Vegan"],
            ["MC + word", "MC Phoenix, MC Breeze"],
            ["DJ + word", "DJ Atlas, DJ Frostbite"],
            ["Big + word", "Big Roar, Big Mistake"],
            ["Young + word", "Young Drift, Young Echo"],
            ["Real-name style", "Marcus Knight, Jay Reign"],
            ["Single bold word", "Phantom, Reaper, Vex"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are 'Lil' and 'Young' so common?",
        "Hip-hop tradition - 'Lil' originated as a diminutive among friends (Lil Wayne started as Tunechi's nickname); 'Young' echoes age and energy. Both became signifiers of belonging to the genre. Newer rappers use them ironically or just because the SEO is bad: 'Lil' has saturated the streaming search results."
      ),
      createFAQ(
        "Can I use a rapper name for my actual music?",
        "Yes - but check it isn't already taken on Spotify/Apple Music. The generator gives candidate ideas; do trademark/availability research before committing. Many independent rappers stake claim with social media handles months before releasing music to lock in their name."
      ),
    ],
    relatedTools: [
      { slug: "pop-star-name-generator", label: "Pop Star Name Generator" },
      { slug: "band-name-generator", label: "Band Name Generator" },
      { slug: "nickname-generator", label: "Nickname Generator" },
    ],
  },

  "pirate-name-generator": {
    sections: [
      createAnswerFirstSection(
        "How Pirate Names Sound",
        "Pirate names typically combine: descriptive epithet (Black, Red, Bloody, One-Eyed, Mad) + body part or feature (Beard, Hook, Eye) or a profession-style identifier. Famous examples: Blackbeard (Edward Teach), Calico Jack (Jack Rackham), Anne Bonny, Henry 'Long Ben' Avery. The convention dates from real golden-age pirates and was amplified by fictional ones (Long John Silver).",
        "Modern pirate name generators produce variations: classic 'Black/Red/Bloody [trait]', 'Captain [Adjective]', or first name + colourful surname (Mary the Bold, Tom Five-Tongues). Used for: party themes, role-playing games, Halloween costumes, social handles. Most generators include both 'historical pirate' and 'fictional adventure' style outputs."
      ),
      {
        heading: "Pirate Name Patterns",
        table: {
          headers: ["Pattern", "Example"],
          rows: [
            ["Black/Red + feature", "Blackbeard, Redeye"],
            ["One/No + body part", "One-Eyed Jack, No-Hand Pete"],
            ["Captain + epithet", "Captain Stormcloud, Captain Brimstone"],
            ["Real-name + label", "Mary the Bold, Anne Coldhand"],
            ["Mad/Bloody/Foul", "Mad Magnus, Bloody Cobb"],
            ["Sea creature ref", "Krakenhand, Sharkmaw"],
            ["Old English style", "Ye Olde Cutthroat Quinn"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Were real pirates as colourful as the names?",
        "Some were. Blackbeard (Edward Teach) reportedly tied burning fuses in his beard during battle to look terrifying. Calico Jack got his nickname from his calico cotton clothing. Anne Bonny and Mary Read fought in men's clothing. Reality matched the legend in select cases; the romantic image is amplified."
      ),
      createFAQ(
        "Do real pirates still exist?",
        "Yes - modern piracy is mostly off East Africa, Southeast Asia, and the Gulf of Guinea. Today's pirates use speedboats and AK-47s, not cutlasses. The names aren't colourful (organised crime, not Hollywood). 'Pirate' as a modern term often refers to digital piracy (file sharing) rather than maritime piracy."
      ),
    ],
    relatedTools: [
      { slug: "wizard-name-generator", label: "Wizard Name Generator" },
      { slug: "elf-name-generator", label: "Elf Name Generator" },
      { slug: "fantasy-tavern-name-generator", label: "Fantasy Tavern Name Generator" },
    ],
  },

  "superhero-name-generator": {
    sections: [
      createAnswerFirstSection(
        "Superhero Name Patterns",
        "Superhero names typically combine: an adjective with an action/object (The Amazing Spider-Man, The Incredible Hulk), Mr/Captain/Wonder + power source (Captain America, Wonder Woman, Mr Fantastic), or single-word power signifiers (Wolverine, Cyclops, Storm). Modern Marvel/DC properties continue these patterns; comic publishing has well-established naming conventions.",
        "Generator output patterns: combine random colour + power (Crimson Lightning, Indigo Shield), add 'Captain', 'Doctor', 'The' prefix to a punchy noun, or pair an animal/element with a strong verb. Used for: gaming character creation, costume parties, team-building exercises, RPGs. Check for trademark issues before using one as a real persona."
      ),
      {
        heading: "Superhero Name Patterns",
        table: {
          headers: ["Pattern", "Example"],
          rows: [
            ["The + adjective + power", "The Amazing Phoenix"],
            ["Captain + nation/cause", "Captain Justice, Captain Earth"],
            ["Wonder/Marvel + name", "Wonder Knight, Marvel Spark"],
            ["Single power word", "Cyclone, Vector, Flash"],
            ["Animal + power", "Hawk-Eye, Wolf-Storm"],
            ["Colour + element", "Crimson Bolt, Sapphire Strike"],
            ["Mr/Ms + ability", "Mr Magnetic, Ms Velocity"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why do superheroes have alter egos?",
        "Plot device originally - secret identity protects loved ones. Now also commercial (Bruce Wayne is a brand on his own). Iron Man (Tony Stark), Spider-Man (Peter Parker), etc. The duality lets readers identify with the regular-person side."
      ),
      createFAQ(
        "Can I trademark a superhero name?",
        "Marvel and DC trademark their characters aggressively. Generic combinations (random adjective + noun) are fine for personal use but generate-then-check is wise. 'Spider-Man' is heavily protected; 'Spider-Star' might or might not collide with a registered mark. Independent comics use unique names to avoid clashes."
      ),
    ],
    relatedTools: [
      { slug: "wizard-name-generator", label: "Wizard Name Generator" },
      { slug: "band-name-generator", label: "Band Name Generator" },
      { slug: "nickname-generator", label: "Nickname Generator" },
    ],
  },

  "band-name-generator": {
    sections: [
      createAnswerFirstSection(
        "Band Name Patterns",
        "Band names follow recognisable patterns by genre. Indie/alternative: 'The + plural noun' (The Smiths, The Strokes, The National) or 'definite article + abstract concept' (The Cranberries, The Killers). Punk/metal: aggressive single words (Slipknot, Anthrax) or violent compounds (Bullet for My Valentine). Pop: shorter, brighter (Spice Girls, BLACKPINK, BTS).",
        "Modern band name generators target specific genres. Common patterns: random adjective + noun (Velvet Cathedral, Iron Apricot), preposition + place (Across the Universe, Beneath the Stars), wordplay/pun (Florence + the Machine, Imagine Dragons). Test the band name against social media availability before committing - a band needs Instagram, TikTok, Spotify, and ideally the .com domain."
      ),
      {
        heading: "Band Name Patterns",
        table: {
          headers: ["Genre", "Pattern Examples"],
          rows: [
            ["Indie", "The + plural (The Strokes, The XX)"],
            ["Punk", "Aggressive single words (Slipknot, Tool)"],
            ["Pop", "Bold, simple (Coldplay, Maroon 5)"],
            ["Metal", "Violent compounds (Cannibal Corpse)"],
            ["Folk", "Nature words (Mumford & Sons, Bon Iver)"],
            ["Electronic", "Producer + 'project' (Daft Punk, Disclosure)"],
            ["Rock", "Vehicle/journey (Greta Van Fleet, Foo Fighters)"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I check if a band name is available?",
        "Search Spotify, Apple Music, YouTube, Bandcamp - if a similar name exists with original music, it's taken. Check Instagram and TikTok handles. US Trademark Office (uspto.gov) for registered marks. The .com domain is often available even when social handles are taken."
      ),
      createFAQ(
        "What makes a good band name?",
        "Memorable, easy to pronounce, easy to spell, unique. Avoid: common phrases (hard to search), special characters (hurt SEO), mirror existing artists (cease-and-desist letters). Best test: tell 10 friends the name out loud - can they spell it correctly afterwards?"
      ),
    ],
    relatedTools: [
      { slug: "rapper-name-generator", label: "Rapper Name Generator" },
      { slug: "pop-star-name-generator", label: "Pop Star Name Generator" },
      { slug: "nickname-generator", label: "Nickname Generator" },
    ],
  },

  "wizard-name-generator": {
    sections: [
      createAnswerFirstSection(
        "Wizard Name Conventions",
        "Wizard names blend mystical sound and weight. Tolkien's Gandalf, Saruman, Radagast use Old English roots. Harry Potter's wizards use British surnames + arcane firsts (Dumbledore, McGonagall, Snape). D&D wizards span cultures (Mordenkainen, Tasha, Bigby). Generator outputs typically combine: ancient-sounding roots (Mor, Thal, Vex) + classical suffixes (-mar, -ius, -orth) for plausible-sounding names.",
        "Common patterns: doubled consonants (Ravenhall, Stoneveil), titles (Archmage Coriolus, Sage of the Mountain), elemental references (Frostwhisper, Emberflame), age signifiers (Ancient One, Elder Thalion). For RPG character creation, names with 2-3 syllables work best - memorable, pronounceable, distinct from party members."
      ),
      {
        heading: "Wizard Name Patterns",
        table: {
          headers: ["Pattern", "Example"],
          rows: [
            ["Two-syllable mystic", "Thalion, Caedmar, Voronis"],
            ["Title + name", "Archmage Voren, Sage Ela"],
            ["Element + word", "Frostwhisper, Emberhand"],
            ["Old English style", "Aelfwic, Brytan, Eadgyth"],
            ["Classical suffix", "Magnus Thalius, Coriolus"],
            ["Ancient One epithet", "Voracious the Ancient"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are wizard names just made up?",
        "Mostly, but well-crafted ones echo real linguistic patterns. Old English (Beowulf-era), Greek/Latin, or Welsh consonant clusters all sound 'wizard-y' to English readers because they sound ancient. Generator algorithms blend these phonetic patterns to feel believable."
      ),
      createFAQ(
        "Can I use these for D&D?",
        "Absolutely - this is exactly the use case. Generated names are unique to your character. For published settings (Forgotten Realms, etc.), some names may already exist in lore - quick search confirms. Most DMs let players use any name they like."
      ),
    ],
    relatedTools: [
      { slug: "elf-name-generator", label: "Elf Name Generator" },
      { slug: "fantasy-tavern-name-generator", label: "Fantasy Tavern Name Generator" },
      { slug: "pirate-name-generator", label: "Pirate Name Generator" },
    ],
  },

  "elf-name-generator": {
    sections: [
      createAnswerFirstSection(
        "Elf Name Conventions",
        "Elf names in fantasy fiction echo the languages Tolkien created (Sindarin, Quenya). Common features: flowing vowels (often 3+ in a row), soft consonants (no harsh K, B, T at starts), -lë, -ion, -wen, -dir suffixes. Examples: Legolas, Galadriel, Elrond, Arwen, Thranduil. Modern fantasy generators combine these phonemes algorithmically: Aelorian, Lyriendil, Vaelis.",
        "Different elf cultures have name variations. Wood elves: nature-related (Leaf, Branch, Stream prefixes - Aelfleaf, Streamwhisper). High elves: classical/ethereal (Celestrius, Aerendil). Dark elves: harsher consonants (Drizzt, Vhaeraun). The generator typically lets you choose a culture template; output should match the world you're playing."
      ),
      {
        heading: "Elf Name Patterns",
        table: {
          headers: ["Style", "Example"],
          rows: [
            ["Wood elf", "Aelfleaf, Riventhil"],
            ["High elf", "Celestrius, Aerendil"],
            ["Dark elf", "Vaelis, Drennaen"],
            ["Half-elf", "Aelora Stoneheart"],
            ["Sea elf", "Coriana, Tidewhisper"],
            ["Sun elf", "Solreth, Aurelian"],
            ["Moon elf", "Lunaria, Dreamweaver"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why do elf names sound similar across fantasy?",
        "Tolkien's influence is foundational. His Sindarin and Quenya elven languages shaped the genre's expectations. Most fantasy authors and game designers borrow phonetic patterns even when not explicitly drawing from Tolkien's work. Common phonemes (flowing vowels, soft consonants) carry the 'elf' genre signal."
      ),
      createFAQ(
        "Can elf names work for non-elf characters?",
        "Yes - flowing, classical-sounding names suit many fantasy races (high humans, fae, drow surnames). Less suitable for orcs (harsh consonants), dwarves (Norse-like compounds: Stoneforge, Beardgrim), or humans intended to feel grounded. Match the name's feel to the character's culture."
      ),
    ],
    relatedTools: [
      { slug: "wizard-name-generator", label: "Wizard Name Generator" },
      { slug: "fantasy-tavern-name-generator", label: "Fantasy Tavern Name Generator" },
      { slug: "pirate-name-generator", label: "Pirate Name Generator" },
    ],
  },

  "zodiac-compatibility-checker": {
    sections: [
      createAnswerFirstSection(
        "How Zodiac Compatibility Charts Work",
        "Western astrology divides the 12 zodiac signs into four elements (Fire, Earth, Air, Water) and three modalities (Cardinal, Fixed, Mutable). Compatibility tables typically rate sign pairs based on element compatibility - same element = highly compatible, complementary elements (Fire-Air, Earth-Water) = compatible, opposing elements often clash. Aries (Fire) and Sagittarius (Fire): high compatibility. Aries and Cancer (Water): low compatibility.",
        "Most popular compatibility systems are simplified for entertainment. Astrologers actually use full birth charts (sun, moon, rising sign, all planets) for serious compatibility readings. Sun-sign-only checks miss most of the picture. Use this kind of tool for fun/icebreaker purposes; don't make actual relationship decisions based on zodiac match - the predictive power is essentially nil."
      ),
      {
        heading: "Element Compatibility Matrix",
        table: {
          headers: ["Sign A", "Sign B", "Compatibility"],
          rows: [
            ["Aries (Fire)", "Sagittarius (Fire)", "High"],
            ["Aries (Fire)", "Cancer (Water)", "Challenging"],
            ["Taurus (Earth)", "Virgo (Earth)", "High"],
            ["Gemini (Air)", "Libra (Air)", "High"],
            ["Cancer (Water)", "Pisces (Water)", "High"],
            ["Leo (Fire)", "Aquarius (Air)", "Mixed"],
            ["Capricorn (Earth)", "Aries (Fire)", "Challenging"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I take this seriously?",
        "As a fun conversation starter, sure. As a real basis for relationship decisions, no - astrology has no scientific evidence for predicting compatibility. Studies (Carlson 1985 in Nature) showed astrologers can't match birth charts to personality profiles better than chance."
      ),
      createFAQ(
        "What about moon signs?",
        "Moon sign is supposedly more important for emotional/relationship compatibility than sun sign in serious astrology. Moon sign requires birth time (often unknown), so most casual compatibility tools use sun sign only. For full accuracy, get a complete birth chart from a astrologer."
      ),
    ],
    relatedTools: [
      { slug: "chinese-zodiac-calculator", label: "Chinese Zodiac Calculator" },
      { slug: "daily-horoscope", label: "Daily Horoscope" },
      { slug: "lucky-number-generator", label: "Lucky Number Generator" },
    ],
  },

  "chinese-zodiac-calculator": {
    sections: [
      createAnswerFirstSection(
        "Chinese Zodiac Animals by Birth Year",
        "Chinese zodiac uses 12-year cycle of animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig. Your animal depends on your birth year, but specifically your year on the lunar calendar (Chinese New Year falls late January or February, so January births might be the 'previous year's animal). 2024: Dragon. 2025: Snake. 2026: Horse. 2027: Goat.",
        "Each animal has associated personality traits (e.g. 'Dragons are confident, ambitious'). Practiced widely in Chinese, Vietnamese, Korean, and Japanese cultures. Same zodiac year repeats every 12 years - 1968, 1980, 1992, 2004, 2016, 2028 are all Monkey years. The 12-animal cycle interacts with five elements (wood, fire, earth, metal, water) for a 60-year complete cycle."
      ),
      {
        heading: "Chinese Zodiac by Year (Recent)",
        table: {
          headers: ["Year", "Animal", "Element"],
          rows: [
            ["2020", "Rat", "Metal"],
            ["2021", "Ox", "Metal"],
            ["2022", "Tiger", "Water"],
            ["2023", "Rabbit", "Water"],
            ["2024", "Dragon", "Wood"],
            ["2025", "Snake", "Wood"],
            ["2026", "Horse", "Fire"],
            ["2027", "Goat", "Fire"],
            ["2028", "Monkey", "Earth"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What if I was born in early January?",
        "Chinese New Year falls late January or early/mid February. If you were born BEFORE the New Year date in your birth year, you're the previous year's animal. So someone born 1 January 2024 is actually a Rabbit (2023's animal) until 9 February 2024 when 2024's Dragon year begins."
      ),
      createFAQ(
        "Are zodiac animal predictions taken seriously?",
        "Cultural significance varies. In Chinese, Vietnamese, and Korean cultures, zodiac shapes wedding date selection, baby naming, business decisions for some. Most modern people see it as cultural tradition, not literal prophecy. Like Western astrology, fun but not predictive."
      ),
    ],
    relatedTools: [
      { slug: "zodiac-compatibility-checker", label: "Zodiac Compatibility Checker" },
      { slug: "daily-horoscope", label: "Daily Horoscope" },
      { slug: "lucky-number-generator", label: "Lucky Number Generator" },
    ],
  },

  "lucky-number-generator": {
    sections: [
      createAnswerFirstSection(
        "How Lucky Numbers Are Generated",
        "Random number generators output truly random or pseudo-random numbers within a specified range. 'Lucky' is just framing - the math is identical to any random selection. Lottery numbers: typically 1-49 or 1-69 range, drawn 5-7 numbers without replacement. Lucky personal numbers: any range you specify (1-100 most common). Both use the same underlying random process.",
        "Cultural beliefs about 'lucky' numbers vary widely. Western: 7 is lucky; 13 is unlucky. Chinese: 8 is lucky (sounds like 'wealth' in Cantonese); 4 is unlucky (sounds like 'death'). Italian: 17 is unlucky. Tools generate without consideration of cultural lucky/unlucky associations - if you want to filter based on cultural beliefs, do it yourself after generation."
      ),
      {
        heading: "Lucky Number Common Uses",
        table: {
          headers: ["Use case", "Range / Format"],
          rows: [
            ["UK National Lottery", "5 numbers from 1-59 + 1 from 1-35"],
            ["EuroMillions", "5 numbers from 1-50 + 2 from 1-12"],
            ["US Powerball", "5 numbers from 1-69 + 1 from 1-26"],
            ["Personal lucky numbers", "Any range, often 1-100"],
            ["Random pick (any context)", "Custom range and count"],
            ["Birthday/anniversary date", "Often 1-31 or 1-12"],
            ["Roulette (American)", "0, 00, 1-36"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are these numbers more 'lucky' than ones I pick?",
        "Mathematically identical chance of winning. Random selection (RNG-generated) means each number has equal probability. 'Lucky' framing doesn't change the underlying probability. People sometimes feel better about randomly-generated numbers because the choice is removed - psychologically reduces regret if numbers don't win."
      ),
      createFAQ(
        "Is online RNG truly random?",
        "Mostly pseudo-random - generated from a deterministic algorithm seeded by something hard to predict (current time, system entropy). For lottery purposes, indistinguishable from true random. For cryptography/security, certified hardware random number generators are used (more rigorous standards)."
      ),
    ],
    relatedTools: [
      { slug: "chinese-zodiac-calculator", label: "Chinese Zodiac Calculator" },
      { slug: "zodiac-compatibility-checker", label: "Zodiac Compatibility Checker" },
      { slug: "dice-roller", label: "Dice Roller" },
    ],
  },

  "daily-horoscope-generator": {
    sections: [
      createAnswerFirstSection(
        "How Daily Horoscopes Are Created",
        "Daily horoscopes typically draw from a pool of generic personality and event statements that loosely match each zodiac sign's reputation. 'Today, Aries, you'll feel a burst of energy' aligns with Aries' fire/cardinal quality. The Forer effect (Barnum effect) explains why people feel horoscopes 'fit' - vague statements that could apply to anyone are interpreted as personally relevant.",
        "Most newspaper and online horoscopes are written by single authors who craft 12 daily predictions covering common life themes (love, work, health, family). Generators do similar combination of templates + signs. Real astrology uses planetary positions and aspects daily; this is much more specific work but often unavailable in free online formats."
      ),
      {
        heading: "Common Daily Horoscope Themes",
        table: {
          headers: ["Theme", "Example"],
          rows: [
            ["Love/relationship", "Today's a good day for romance"],
            ["Career/work", "An opportunity may appear"],
            ["Money", "Be cautious with finances"],
            ["Health", "Pay attention to your wellbeing"],
            ["Family", "Reach out to a family member"],
            ["Energy", "Your enthusiasm is high today"],
            ["Travel", "Adventure is calling"],
            ["Friendship", "An old friend may reach out"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why do horoscopes feel accurate?",
        "Forer effect: people accept vague, generally-positive statements as personally accurate. Studies (Forer 1949) showed people rated identical generic statements as 'highly accurate' descriptions of their personality. Horoscopes work the same way - statements vague enough to feel meaningful for almost anyone."
      ),
      createFAQ(
        "Should I make decisions based on my horoscope?",
        "No - horoscopes have no scientific predictive power. Carlson 1985 (Nature journal) and many subsequent studies show astrologers can't match natal charts to personality profiles better than chance. Treat as entertainment, not guidance. Real life decisions deserve evidence-based thinking."
      ),
    ],
    relatedTools: [
      { slug: "daily-horoscope", label: "Daily Horoscope" },
      { slug: "zodiac-compatibility-checker", label: "Zodiac Compatibility Checker" },
      { slug: "lucky-number-generator", label: "Lucky Number Generator" },
    ],
  },

  "dog-age-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Dog Years Actually Work",
        "The old '1 dog year = 7 human years' is too simple. Modern research (UCSD 2019 study) suggests a logarithmic relationship: human age = 16 × ln(dog age) + 31. So: 1-year-old dog ≈ 31 human years. 2-year-old ≈ 42. 5-year-old ≈ 57. 10-year-old ≈ 67. 15-year-old ≈ 75. The first 1-2 years are equivalent to 30+ human years (rapid maturation), then aging slows.",
        "Dog age also depends on size. Small breeds live longer than large: Chihuahua average 14-16 years, Great Dane 7-10 years. So a 7-year-old Great Dane is genuinely 'old' (equivalent ~70 human years), while a 7-year-old Chihuahua is middle-aged. Adjust the calculation by breed size: small dogs aged slower past year 2; large dogs faster."
      ),
      {
        heading: "Dog Age in Human Years (Average)",
        table: {
          headers: ["Dog Age", "Small Breed (under 9 kg)", "Medium", "Large (over 22 kg)"],
          rows: [
            ["1 year", "15 human", "15 human", "15 human"],
            ["2 years", "24 human", "24 human", "24 human"],
            ["5 years", "36 human", "37 human", "40 human"],
            ["10 years", "56 human", "60 human", "75 human"],
            ["12 years", "64 human", "69 human", "87 human"],
            ["15 years", "76 human", "83 human", "115 human (rare)"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does breed matter?",
        "Larger breeds age faster physiologically. The reasons aren't fully understood but appear linked to size-related biological stress. Large breeds also typically die younger from cancers and joint issues. Small breeds (Chihuahuas, terriers) regularly live 14-16 years; large breeds (Great Danes, Mastiffs) often die at 7-10."
      ),
      createFAQ(
        "When is a dog 'old'?",
        "Senior phase typically starts around 7-10 years, depending on breed. Veterinary 'senior' care recommendations kick in around year 7 for large breeds, year 9-10 for small. Older dogs benefit from twice-yearly checkups, blood panels, joint supplements. Cognitive dysfunction (canine dementia) common past age 10-12."
      ),
    ],
    relatedTools: [
      { slug: "cat-age-calculator", label: "Cat Age Calculator" },
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
      { slug: "year-progress-tracker", label: "Year Progress Tracker" },
    ],
  },

  "cat-age-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Cat Years Convert to Human Years",
        "Cats mature very fast in their first 2 years, then slow. Year 1 = 15 human years. Year 2 = 24 human years. After year 2, each cat year ≈ 4 human years. So: 5-year-old cat ≈ 36 human years. 10-year-old ≈ 56. 15-year-old ≈ 76. 20-year-old ≈ 96. Cats commonly live 12-18 years; well-cared-for indoor cats can reach 20+.",
        "Indoor vs outdoor lifespan varies enormously: indoor cats average 12-18 years; outdoor cats often only 2-5 years (predators, traffic, disease). Cats are 'senior' typically from age 11. 'Geriatric' from 15+. Even very old cats often retain alertness and personality - aged better than equivalent dog years in many cases."
      ),
      {
        heading: "Cat Age in Human Years",
        table: {
          headers: ["Cat Age", "Human Equivalent"],
          rows: [
            ["6 months", "10 human years"],
            ["1 year", "15 human"],
            ["2 years", "24 human"],
            ["5 years", "36 human"],
            ["8 years", "48 human"],
            ["10 years", "56 human"],
            ["12 years", "64 human"],
            ["15 years", "76 human"],
            ["18 years", "88 human"],
            ["20 years", "96 human"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How long do cats live?",
        "Average indoor cat: 12-18 years. Indoor cats living 20+ years are common and well-documented. Oldest verified cat (Creme Puff, USA): 38 years 3 days (1967-2005). Outdoor or feral cats: typically 2-5 years due to predators, disease, vehicles."
      ),
      createFAQ(
        "When does a cat become 'senior'?",
        "Around age 11. Veterinary recommendations include: bi-annual checkups, full blood panels, weight monitoring, dental care. Senior-specific food formulations exist (lower calories, joint support, kidney-friendly). Many cats remain active and playful well past senior age."
      ),
    ],
    relatedTools: [
      { slug: "dog-age-calculator", label: "Dog Age Calculator" },
      { slug: "date-difference-calculator", label: "Date Difference Calculator" },
      { slug: "year-progress-tracker", label: "Year Progress Tracker" },
    ],
  },
};
