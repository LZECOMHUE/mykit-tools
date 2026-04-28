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
};
