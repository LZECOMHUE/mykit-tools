// SEO content for quiz and personality assessment tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const quizSEO = {
  "anxiety-screening-gad7": {
    sections: [
      createAnswerFirstSection(
        "What the GAD-7 Actually Measures",
        "The GAD-7 is a 7-item screener developed by Spitzer, Kroenke and colleagues in 2006 to flag generalised anxiety disorder. It is the questionnaire your GP hands you on a clipboard before an NHS talking-therapies referral, and the same form IAPT services use to track progress between sessions. Each item asks how often a symptom (worry, restlessness, irritability, fear that something awful might happen) has bothered you over the last two weeks, scored 0 to 3.",
        "Total scores run from 0 to 21. The standard cut-offs published in the original validation paper are 5 for mild, 10 for moderate, and 15 for severe anxiety. A 10 is the threshold most clinicians use as a prompt for further assessment. The questions are deliberately blunt because the tool is designed for speed in a 10-minute appointment, not nuance."
      ),
      createAnswerFirstSection(
        "What Your Score Means (and What It Doesn't)",
        "A score is a snapshot of the last fortnight, nothing more. Scoring 12 today does not mean you have an anxiety disorder; it means a clinician would want to talk to you. Scoring 3 does not mean you are fine forever; people with chronic but well-managed anxiety often score low between flare-ups. The GAD-7 is a screening instrument, not a diagnostic one.",
        "If your score concerns you, the next step is your GP. In England you can also self-refer to NHS Talking Therapies without a GP appointment via nhs.uk. If you are in immediate crisis, the Samaritans line is 116 123 and is free from any phone. None of this replaces a real conversation with a healthcare professional, and the tool will not tell us anything about you, your data stays in your browser."
      ),
      createAnswerFirstSection(
        "Why People Take It Online First",
        "Three patterns come up repeatedly. First: people about to book a GP appointment who want to walk in with a number rather than fumbling for words. Second: people already in therapy who want to track week-on-week change between sessions. Third: friends or family of someone struggling, trying to gauge how worried they should be. All three are reasonable uses, and the form was specifically designed to work outside the consulting room.",
        "The reason it shows up in so many apps and sites is that the GAD-7 is in the public domain. Pfizer released it for unrestricted use in 1999, which is why you will see identical wording on the [PHQ-9 depression screener](/depression-screening-phq9), in NHS apps, and in private therapist intake forms. Same questions, same scoring, same evidence base."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the GAD-7 a diagnosis?",
        "No. It is a screening questionnaire designed to flag people who would benefit from a proper clinical assessment. A diagnosis of generalised anxiety disorder requires a trained professional to consider duration of symptoms, level of impairment, and whether anything else (thyroid issues, medication side effects, another mental health condition) explains the picture better."
      ),
      createFAQ(
        "What score should make me speak to my GP?",
        "The original validation paper suggests 10 as the threshold where further assessment is warranted, and 15 as severe. In practice, if your score is 10 or above, or if any score is causing you distress or affecting daily life, that is worth raising with a GP or self-referring to NHS Talking Therapies. There is no minimum score required to ask for help."
      ),
      createFAQ(
        "How is this different from a panic attack quiz?",
        "The GAD-7 measures generalised anxiety, the kind that hangs around in the background, worrying about everything from work to family to whether you locked the back door. Panic attacks are acute, time-limited, and often have very specific physical symptoms (racing heart, hyperventilation, sense of doom). They can co-occur, but they are different things and would be assessed separately."
      ),
      createFAQ(
        "Why are the questions so similar to each other?",
        "The seven items deliberately overlap because the tool was designed to be reliable across short administration times. Asking essentially the same construct (excessive worry) from slightly different angles improves the internal consistency of the score. It is annoying as a respondent but it is what makes the score meaningful."
      ),
    ],
    relatedTools: [
      { slug: "depression-screening-phq9", label: "Depression Screening (PHQ-9)" },
      { slug: "self-esteem-scale", label: "Self-Esteem Assessment" },
      { slug: "stress-level-assessment", label: "Stress Level Assessment" },
    ],
  },

  "depression-screening-phq9": {
    sections: [
      createAnswerFirstSection(
        "What the PHQ-9 Is",
        "The PHQ-9 is the 9-item Patient Health Questionnaire, developed by Spitzer, Kroenke and Williams in the late 1990s and validated across thousands of primary care patients. It maps directly onto the nine symptoms of major depressive disorder in the DSM, asking how often each has bothered you in the last two weeks, scored 0 (not at all) to 3 (nearly every day). Total scores run 0 to 27.",
        "It is the standard depression screen used by NHS GPs, IAPT services, employee assistance programmes, and health insurers worldwide. The tool sits in the public domain because Pfizer released it for unrestricted use, which is why the same nine questions appear on millions of clipboards every year."
      ),
      createAnswerFirstSection(
        "Reading Your Score Honestly",
        "Standard cut-offs are 5 for mild, 10 for moderate, 15 for moderately severe, and 20 for severe depression. A score of 10 or above is the point at which the original validation paper found acceptable sensitivity and specificity for major depression, and it is the threshold most NHS services use to consider treatment.",
        "A high score is not a diagnosis. It is a flag that says \"go talk to someone qualified\". A low score is also not a clean bill of health, particularly if specific items (poor sleep, low energy) are still bothering you in isolation. The questionnaire was built to start a conversation, not finish one. Question 9 about thoughts of self-harm is scored separately and is taken seriously regardless of the rest of the total."
      ),
      createAnswerFirstSection(
        "When People Use This Online",
        "The most common reason is the obvious one: you have been feeling rough for weeks and want some structure to the question of whether to book a GP appointment. The second most common is tracking. People already in therapy or on antidepressants often retake the PHQ-9 every few weeks to spot whether things are actually improving, since the slow nature of recovery can hide week-on-week change.",
        "The third use, and one we feel strongly about, is family members trying to gauge concern. If someone you love has been off and you do not know how worried to be, the PHQ-9 is a reasonable conversation-starter, but it is not a substitute for asking them directly how they are. The [GAD-7 anxiety screener](/anxiety-screening-gad7) is often used alongside it because anxiety and depression frequently co-occur."
      ),
    ],
    faqs: [
      createFAQ(
        "Does a high PHQ-9 score mean I have depression?",
        "No, it means a clinician would want to assess you properly. A diagnosis of major depressive disorder requires consideration of duration (at least two weeks of most-day symptoms), impairment, exclusion of other causes (thyroid, medication, grief, another condition), and a clinical interview. The PHQ-9 only screens; it does not diagnose."
      ),
      createFAQ(
        "What should I do if I score above 10?",
        "Book a GP appointment, or self-refer to NHS Talking Therapies if you are in England (you can do this without a GP via nhs.uk/talk). If question 9 about self-harm scored 1 or higher, please prioritise this. Samaritans are on 116 123 free from any phone, 24 hours a day. If you are in immediate danger, call 999 or go to A&E."
      ),
      createFAQ(
        "Can the PHQ-9 tell the difference between depression and burnout?",
        "Not really, and this is one of its limitations. Burnout, grief, prolonged work stress, and seasonal low mood can all produce similar symptom patterns to depression in the short term. A clinician will tease these apart by looking at context, duration, and the presence of specific features like persistent worthlessness or anhedonia. The questionnaire is a starting point, not a sorting hat."
      ),
      createFAQ(
        "How often should I retake it?",
        "If you are tracking treatment progress, every two to four weeks is standard practice in NHS services. Taking it daily is not useful and tends to amplify normal day-to-day variation into something it is not. Score what you have actually felt over the last fortnight, then leave it alone."
      ),
    ],
    relatedTools: [
      { slug: "anxiety-screening-gad7", label: "Anxiety Screening (GAD-7)" },
      { slug: "self-esteem-scale", label: "Self-Esteem Assessment" },
      { slug: "stress-level-assessment", label: "Stress Level Assessment" },
    ],
  },

  "hogwarts-house-quiz": {
    sections: [
      createAnswerFirstSection(
        "How the Sorting Works",
        "Twelve scenario questions, four answer options each, every option weighted toward one of four houses: the Scholars (curiosity, knowledge), the Brave (courage, conviction), the Ambitious (drive, leadership), or the Loyal (kindness, dependability). Whichever house gets the most points by the end is your sort. Ties go to the highest-scoring single answer, which keeps the result deterministic rather than arbitrary.",
        "We use generic house names rather than the trademarked ones because trademarks are real and we are not in the business of getting C&D letters, but the archetypes are the same four you are familiar with. Picture brave-Gryffindor as the Brave, smart-Ravenclaw as the Scholars, ambitious-Slytherin as the Ambitious, kind-Hufflepuff as the Loyal."
      ),
      createAnswerFirstSection(
        "Why The Result Feels Right (Or Doesn't)",
        "The questions are written around values rather than preferences. \"Your favourite colour\" tells us nothing; \"what would disappoint you most\" tells us a great deal. This is the same trick personality researchers use to dodge social-desirability bias: ask about behaviour and stakes, not labels. The result will usually feel right because you have been answering questions about how you actually behave, not which house you wanted to be in.",
        "When the result feels wrong, two things are usually going on. Either you answered as the version of yourself you would like to be rather than the one you actually are (very common, very human), or you genuinely sit between two houses. Most real people are dual-house: a brave-but-also-loyal best friend, an ambitious-scholar academic. The quiz picks the dominant trait, which can flatten that nuance."
      ),
      createAnswerFirstSection(
        "What This Is and Isn't",
        "It is a fun personality quiz dressed up in fantasy. It is not validated psychology, it is not the Big Five, and it does not predict anything about your career or relationships. The four-house typology has no peer-reviewed research behind it because J.K. Rowling invented it for a children's book in 1997. That does not make it useless, archetypes are useful for self-reflection, but it means the result should not be on your CV.",
        "If you want a quiz with actual psychometric grounding, the [Big Five Personality Test](/big-five-personality-test) covers Openness, Conscientiousness, Extraversion, Agreeableness and Neuroticism, which is the model academic researchers use. If you want pure entertainment, this one and the [What Dog Breed Are You quiz](/what-dog-breed-are-you) are both honest about being entertainment."
      ),
    ],
    faqs: [
      createFAQ(
        "Why don't you use the actual house names?",
        "The four house names from the Harry Potter books are trademarked. Using them on a public website that runs ads or premium features would invite a takedown notice. The archetypes (brave, scholarly, ambitious, loyal) are not trademarked, so we use those instead. The personality framework still works the same way."
      ),
      createFAQ(
        "Can I get more than one house?",
        "The quiz reports your top house, but a near-tie between two houses is genuinely meaningful and shows up surprisingly often. Most people sit between two archetypes rather than landing perfectly on one. If your top two scores are within a couple of points, treat both as valid sides of your personality."
      ),
      createFAQ(
        "Is this the official Pottermore quiz?",
        "No. Pottermore (now Wizarding World) has its own sorting questionnaire run by Warner Bros. This is an independent personality quiz inspired by the same four-archetype structure, with our own questions. Different questions and a different scoring system can produce a different sort."
      ),
      createFAQ(
        "Will I get the same result if I take it again?",
        "Usually yes, if you answer honestly each time. People who get wildly different results between sittings are usually answering aspirationally on one go and realistically on the other. The quiz is short enough that mood-of-the-day can shift one or two answers, but a consistent personality should produce a consistent result."
      ),
    ],
    relatedTools: [
      { slug: "what-element-are-you", label: "What Element Are You?" },
      { slug: "what-dog-breed-are-you", label: "What Dog Breed Are You?" },
      { slug: "which-decade-do-you-belong-in", label: "Which Decade Do You Belong In?" },
    ],
  },

  "how-british-are-you": {
    sections: [
      createAnswerFirstSection(
        "What This Quiz Actually Tests",
        "Fifteen lifestyle and culture questions about tea preferences, queuing etiquette, weather chat, beans on toast, the role of \"sorry\" in everyday speech, and other unwritten rules of British life. Each answer scores between 0 and 4 points based on how British the response is. Add up the points, divide by the maximum, and you get a percentage from \"Basically American\" through \"More British Than The Queen\".",
        "The scoring is calibrated against stereotypically British behaviours rather than actual demographic data. We are not measuring whether you were born here or hold a passport. We are measuring whether you instinctively apologise to a chair you bumped into."
      ),
      createAnswerFirstSection(
        "Where The Stereotypes Come From",
        "Most of the cultural anchors here, queuing without prompting, talking about weather as a social lubricant, the unhealthy national relationship with tea, beans on toast as a serious meal, complaining about something rather than fixing it, were documented in Kate Fox's 2004 book Watching the English. The book is a serious anthropological observation of English (specifically) social rules, and most of what looks like a stereotype on this quiz has actual ethnographic grounding.",
        "The quiz leans into the comedic version because it is more fun, but the underlying patterns are real. The unwritten rule that you join the back of any visible queue, even one of two people, is something Brits do without thinking and visitors notice immediately. So is the apology that comes out before any complaint about service, like a verbal cushion."
      ),
      createAnswerFirstSection(
        "Who Actually Scores High",
        "Three patterns dominate. First, people who genuinely grew up in Britain often score in the 70 to 90 percent range, because the cultural rules have been baked in since childhood. Second, expats who have lived here for a decade or more often score higher than they expect, because British habits are absorbed by osmosis and the queuing thing is contagious. Third, dedicated anglophiles who have only visited can score remarkably high if they have been paying attention.",
        "Below 50 percent usually means you find one or more of the core anchors actively unpleasant (warm beer, complaining for sport, milky tea), which is fair enough. None of these are mandatory and most are objectively peculiar."
      ),
    ],
    faqs: [
      createFAQ(
        "Is this quiz English or British?",
        "Mostly English, honestly. Several of the cultural anchors (Sunday roast, beans on toast, queuing as a competitive sport) are pan-British, but the most distinctive ones come from English social rules specifically. Scotland, Wales and Northern Ireland share many of these but also have their own which the quiz does not capture in detail."
      ),
      createFAQ(
        "I'm British and scored 60%, what's wrong with me?",
        "Probably nothing. The scoring penalises liking coffee over tea, finding small talk about the weather pointless, and not eating beans on toast, all of which a lot of perfectly British people quietly do. A 60% is well within normal-British range, you are just not stereotypical-British."
      ),
      createFAQ(
        "Does the quiz work for non-British takers?",
        "Yes, and it is often more interesting that way. People who have visited or lived in Britain often score in the 30-60% range and the result tells them which specific cultural habits they have absorbed without noticing. A score below 30% usually means you find the British way of doing things genuinely alien, which is also fair information."
      ),
      createFAQ(
        "Why is tea so heavily weighted?",
        "Because it is the single best predictor of British cultural assimilation. Almost every other anchor on the quiz has exceptions, but the tea-with-milk-and-a-biscuit reflex is so deeply embedded that it is hard to fake. If you grew up making tea for visitors before any other conversation happened, this question alone tells us a lot."
      ),
    ],
    relatedTools: [
      { slug: "which-decade-do-you-belong-in", label: "Which Decade Do You Belong In?" },
      { slug: "mental-age-quiz", label: "Mental Age Quiz" },
      { slug: "what-element-are-you", label: "What Element Are You?" },
    ],
  },

  "introvert-extrovert-scale": {
    sections: [
      createAnswerFirstSection(
        "Introversion as a Spectrum",
        "Carl Jung introduced the introvert-extrovert distinction in 1921, but the modern psychological consensus, established by Hans Eysenck and now embedded in the Big Five, is that this is a continuum, not a binary. Almost no one is a pure introvert or pure extrovert. Most people sit somewhere in the middle and lean one way, which is why \"ambivert\" became a useful term in the last decade.",
        "This quiz scores fifteen questions about how you respond to social demand, recharge your energy, handle small talk, react to spontaneous plans, and feel about being the centre of attention. Each answer carries a numerical weight, and the total maps to a percentage on the introvert-extrovert spectrum. Scores under 30 are introvert-leaning, 30 to 70 is the broad ambivert range, and over 70 is extrovert-leaning."
      ),
      createAnswerFirstSection(
        "What Energy Recharge Actually Means",
        "The defining feature is not whether you are shy or outgoing; plenty of introverts are charming and plenty of extroverts get nervous in groups. The defining feature is what restores your energy after a busy day. Introverts feel restored by time alone, even after enjoyable social events. Extroverts feel restored by company, even after a productive solo work session.",
        "This is why introverted teachers and extroverted hermits both exist. You can be very good at the social skills your job demands and still need three hours of nothing afterwards to feel human again. If that pattern feels familiar, the quiz is going to score you on the introverted side regardless of how you appear at parties."
      ),
      createAnswerFirstSection(
        "What The Score Is For",
        "Most people take this expecting validation: \"yes, I am the introvert I always thought I was\". A surprisingly large minority discover they are ambiverts, which can reframe a lot of confused feelings about whether they like socialising or not. The honest answer is that ambiverts like socialising in the right doses with the right people, and that is allowed.",
        "The score does not predict happiness, success, or relationship compatibility. There is research showing extroverts report slightly higher day-to-day positive affect, but introverts catch up on deeper measures of life satisfaction and meaning. This is a self-knowledge tool, not a hierarchy. If you want a fuller personality picture, the [Big Five Personality Test](/big-five-personality-test) places extraversion alongside the four other major dimensions."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between introvert and shy?",
        "Shyness is anxiety about social judgment, an introversion is a preference for lower social stimulation. Plenty of introverts are not shy at all; they are perfectly confident in social situations but actively prefer being alone. And plenty of extroverts are shy; they want company but feel anxious about it. The two overlap but they are not the same thing."
      ),
      createFAQ(
        "What does ambivert mean?",
        "Sitting in the middle of the introvert-extrovert spectrum, which is where most of the population actually lives. Ambiverts respond well to both solo and social time and tend to be flexible about which they want, depending on the day. The term is not in the original psychometric models but has become useful shorthand for the 40-50% of people who lean neither strongly inward nor strongly outward."
      ),
      createFAQ(
        "Can my type change over time?",
        "Slightly. Personality traits are stable but not fixed. Most people drift slightly more introverted with age, partly because energy levels drop and partly because most people get clearer about which social situations are worth the effort. Major life events (parenting, career changes, grief) can shift you a few points either way, but a strong introvert at 25 will rarely become a strong extrovert at 45."
      ),
      createFAQ(
        "Is one type better than the other?",
        "No, despite extroversion being slightly more culturally rewarded in Western workplaces. The research on life outcomes is mixed; introverts have a small edge in academic performance and deep work, extroverts have a small edge in sales and leadership-by-presence roles. Both produce successful, happy people. The advantage comes from understanding where you sit, not from being on a particular side."
      ),
    ],
    relatedTools: [
      { slug: "big-five-personality-test", label: "Big Five Personality Test" },
      { slug: "stress-level-assessment", label: "Stress Level Assessment" },
      { slug: "what-type-of-friend-are-you", label: "What Type of Friend Are You?" },
    ],
  },

  "love-language-quiz": {
    sections: [
      createAnswerFirstSection(
        "The Five Languages, Briefly",
        "Words of Affirmation (compliments, verbal appreciation), Acts of Service (helping with tasks), Receiving Gifts (thoughtful tokens), Quality Time (focused attention), and Physical Touch (hand-holding, hugs, intimacy). Gary Chapman, a marriage counsellor, named these in his 1992 book The Five Love Languages and the framework took off because it gave couples a vocabulary for something they had been arguing about without words.",
        "The quiz gives you 25 paired-choice questions where you have to pick which of two scenarios would make you feel more loved. Forced choice is the trick that makes the scoring work; if you let people rank everything as \"important\" you get a flat distribution. Forcing them to choose surfaces the actual hierarchy."
      ),
      createAnswerFirstSection(
        "What The Research Actually Says",
        "Here is the honest part: the love languages framework has limited peer-reviewed support. A 2022 review in Current Directions in Psychological Science found that the five categories don't cleanly hold up as distinct dimensions, that matching partners' love languages doesn't reliably predict relationship satisfaction, and that the underlying construct (one primary language) oversimplifies how people actually give and receive affection. Most people respond to most languages.",
        "That doesn't make the quiz useless. It works as a conversation-starter, a way to surface unspoken expectations, and a vocabulary for couples who don't have one. The categories are intuitively recognisable even if they aren't scientifically rigorous. Treat the result as \"things I notice and appreciate\" rather than \"the only way I can be loved\"."
      ),
      createAnswerFirstSection(
        "How To Use The Result Without Overdoing It",
        "Take it with your partner if you are in a relationship, and then talk about the results rather than treating them as a contract. The biggest mistake couples make is reducing the framework to a checklist (\"you said quality time so I will block out Tuesday evenings\") which makes the gestures feel mechanical. The point is to notice what already lands and do more of that.",
        "If you are taking it solo, the most useful thing the result tells you is what to ask for, since most people are bad at articulating what they actually want. \"I think I might be a Words of Affirmation person, can you tell me when I do something well\" is a much better request than \"why don't you appreciate me\". The [Attachment Style Quiz](/attachment-style-quiz) and [Communication Style Quiz](/communication-style-quiz) cover related but distinct territory."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I have more than one love language?",
        "Yes, and most people do. The five-language model has been criticised exactly for the rigid \"primary language\" framing. In reality most people have two or three that are roughly equally important, with one or two that don't land as much. Treat your top two or three results as the meaningful ones rather than fixating on the absolute winner."
      ),
      createFAQ(
        "Does my love language change over time?",
        "Often, yes. Quality Time tends to become more important when life gets busy, Physical Touch shifts during pregnancy, illness, or grief, Acts of Service ramps up when one partner is overloaded with logistics. The quiz captures a snapshot of where you are now, not a permanent personality trait."
      ),
      createFAQ(
        "Is this scientifically valid?",
        "The framework has limited research support. The five categories don't hold up cleanly as distinct dimensions in factor analysis, and \"matching\" partners' love languages doesn't reliably predict relationship outcomes. It works better as a conversation tool than as a psychometric instrument. We mention this because we think honesty about what's pop psychology and what isn't matters."
      ),
      createFAQ(
        "What if my partner and I have different love languages?",
        "Common, manageable, not a problem unless you make it one. The premise of the framework is that mismatches cause friction precisely because each partner is showing love in their own preferred way and not noticing the other doing the same. The fix is mutual awareness, not converting each other."
      ),
    ],
    relatedTools: [
      { slug: "attachment-style-quiz", label: "Attachment Style Quiz" },
      { slug: "communication-style-quiz", label: "Communication Style Quiz" },
      { slug: "crush-quiz", label: "Does My Crush Like Me?" },
    ],
  },

  "mental-age-quiz": {
    sections: [
      createAnswerFirstSection(
        "What This Quiz Is (And Definitely Isn't)",
        "Fifteen questions about your habits, sleep schedule, sense of humour, money decisions, and reactions to stress. Each answer adjusts a starting age up or down by between 5 and 35 years. The total tells you whether you are mentally a teenager who never grew up, a sensible 30-something, or a 70-year-old in a younger body.",
        "It is entertainment. There is no science behind \"mental age\" as a personality construct, despite the term occasionally appearing in old-school IQ tests where it had a different and very specific meaning. We are using it the way social media uses it: as a fun way to confront whether you act like the age you actually are."
      ),
      createAnswerFirstSection(
        "Why The Result Often Surprises People",
        "Most people score 5 to 15 years away from their actual age, in either direction, and find the result faintly accusatory. Younger-than-actual scorers are usually told they need to take responsibility more seriously; older-than-actual scorers are usually told they should let themselves have more fun. Both reactions are predictable because the quiz is calibrated to amplify whichever pattern dominates.",
        "The most interesting case is the 28-year-old who scores 55. They usually recognise themselves immediately: bedtime by 10pm, financial planner already opened, finds parties exhausting. The label \"mental age\" gives them permission to laugh at it. That permission is the point of taking the quiz."
      ),
      createAnswerFirstSection(
        "Sharing The Result",
        "The quiz is built around shareability because that is genuinely what it is for. Your result is a one-line conversation-starter: \"I'm 26 but apparently mentally 47\" gets a reply. Send it to the friend group chat, post it to Instagram stories, take it again with a partner and compare. That is the entire intended use case.",
        "If you want a personality quiz with actual psychometric backing, the [Introvert or Extrovert Scale](/introvert-extrovert-scale) and the [Big Five Personality Test](/big-five-personality-test) are both grounded in research. If you want fun, this one and the [Which Decade Do You Belong In quiz](/which-decade-do-you-belong-in) are honestly fun and don't pretend to be more than that."
      ),
    ],
    faqs: [
      createFAQ(
        "Is mental age a real psychological concept?",
        "Not in the way the quiz uses it. Mental age was originally a term in early IQ testing (Binet, 1905) referring to cognitive performance levels relative to typical scores at different ages. That usage has been largely abandoned in modern psychology in favour of standardised IQ scores. The pop-culture \"mental age\" you see in quizzes is a fun framing, not a clinical concept."
      ),
      createFAQ(
        "Why did I get a much higher mental age than my actual age?",
        "Because you answered \"sensible\" on most of the questions: regular bedtime, careful spending, prefer planning, calm under criticism. The quiz weights all of these as \"older\" and stacks them up. It does not mean anything is wrong; it usually means you have been a serious person since you were 9 years old, and the quiz is just noticing."
      ),
      createFAQ(
        "Can I retake it if I don't like the result?",
        "Of course, but be honest the second time. People who retake quizzes consistently get different results because they answer more aspirationally on the second go. If your second result is dramatically different from the first, the second one is probably less accurate, not more."
      ),
      createFAQ(
        "Will I get a different result on a different day?",
        "Slightly. Mood, time of week, and whether you slept well all shift a few answers around. But the structural pattern (mostly mature, mostly chaotic, evenly mixed) usually stays stable across attempts. If it changes wildly between sittings, you are answering performatively rather than honestly."
      ),
    ],
    relatedTools: [
      { slug: "which-decade-do-you-belong-in", label: "Which Decade Do You Belong In?" },
      { slug: "how-british-are-you", label: "How British Are You?" },
      { slug: "what-element-are-you", label: "What Element Are You?" },
    ],
  },

  "narcissism-test": {
    sections: [
      createAnswerFirstSection(
        "What This Test Actually Is",
        "The Narcissistic Personality Inventory short form (NPI-16) is a 16-item version of the longer NPI-40, both developed by Robert Raskin and colleagues to measure narcissistic traits in the general population. Each question presents two statements and asks you to choose the one that better describes you (one narcissistic-leaning, one not). Your score is the total number of narcissistic-leaning choices, ranging from 0 to 16.",
        "Average scores in the general population sit around 4 to 6 on the NPI-16. Significantly higher scores (10 and above) suggest stronger narcissistic traits, but this is sub-clinical narcissism, the everyday personality dimension that everyone has some of. It is not the same as Narcissistic Personality Disorder (NPD), which is a diagnosed condition with much stricter criteria."
      ),
      createAnswerFirstSection(
        "What The Score Doesn't Mean",
        "Scoring high on the NPI-16 does not mean you have NPD or that you are a bad person. Narcissism in the trait sense includes confidence, self-promotion, and willingness to take credit, all of which are useful in moderation and present in most successful people. NPD is a clinical diagnosis requiring persistent patterns of grandiosity, lack of empathy, and impairment in functioning, assessed by a clinician using DSM criteria. The NPI-16 cannot diagnose anything.",
        "The other thing the score doesn't tell you: whether someone else in your life is a narcissist. People often take this hoping to confirm a partner or colleague's behaviour, and the test cannot answer that question because it is a self-report measure designed to be answered honestly by the person taking it. Someone with high narcissistic traits would either rate themselves accurately (because they think those traits are good) or distort the answers, and you have no way of telling which."
      ),
      createAnswerFirstSection(
        "Why People Take It",
        "The most common reason is suspicion. Either someone has called you a narcissist and you want to check, or you suspect a partner or family member of narcissistic patterns and you want a framework. Both are reasonable, but only the first is something this test can help with directly.",
        "If you are worried about a relationship rather than yourself, the [Red Flags Quiz](/red-flags-quiz) is more useful because it asks about observable behaviours rather than internal traits. If you are worried about a specific dynamic, the [Attachment Style Quiz](/attachment-style-quiz) and [Big Five Personality Test](/big-five-personality-test) cover related territory. None of these are diagnostic, but all of them are more directly aimed at the question you are probably asking."
      ),
    ],
    faqs: [
      createFAQ(
        "Can this test diagnose narcissistic personality disorder?",
        "No. The NPI-16 measures narcissistic traits on a continuum that everyone has some of. Narcissistic Personality Disorder (NPD) is a clinical diagnosis that requires assessment by a qualified mental health professional using DSM-5 criteria, including pervasive patterns, significant impairment, and ruling out other conditions. A high score here is a flag for self-reflection, not a diagnosis."
      ),
      createFAQ(
        "What is a normal score?",
        "Average scores on the NPI-16 in the general population are around 4 to 6. Scores above 10 are notably high but still common in confident, ambitious people. Scores at 14-16 are unusual and suggest significant narcissistic traits, which may or may not be problematic depending on context and behaviour."
      ),
      createFAQ(
        "Why does the test use forced-choice pairs?",
        "Because narcissism is socially undesirable to admit to, and most people will refuse a direct \"I am special\" question even when they think it. Forcing a choice between two phrasings (\"I am special\" vs \"I am no better than most people\") makes the choice feel less self-flattering and produces more honest answers. It is the standard format Raskin used in the original NPI-40 and we kept it."
      ),
      createFAQ(
        "Can I use this to check if someone else is a narcissist?",
        "Not really. The test is a self-report instrument and only works if the person taking it answers honestly about themselves. You cannot fill it in on someone else's behalf and trust the result. If you are worried about someone's behaviour, observable warning signs from the [Red Flags Quiz](/red-flags-quiz) are more useful than trying to score them on a personality measure."
      ),
    ],
    relatedTools: [
      { slug: "big-five-personality-test", label: "Big Five Personality Test" },
      { slug: "red-flags-quiz", label: "Relationship Red Flags Quiz" },
      { slug: "emotional-intelligence-quiz", label: "Emotional Intelligence Quiz" },
    ],
  },

  "red-flags-quiz": {
    sections: [
      createAnswerFirstSection(
        "What This Quiz Looks At",
        "Twenty statements describing observable behaviours from a partner: checking your phone without permission, getting angry when you spend time with friends, gaslighting, public criticism, financial control, isolation from your support network. You answer how often each one happens, never to often, and the score categorises behaviours into Control, Manipulation, and Respect patterns. The output is a count of red flags by category and an overall risk indicator.",
        "We did not invent any of these warning signs. They come from established frameworks for identifying coercive control and abusive relationships, including the work of organisations like Refuge, Women's Aid, and the Power and Control Wheel originally developed in Duluth, Minnesota in 1984. Coercive control became a criminal offence in England and Wales in 2015 under Section 76 of the Serious Crime Act, and the behaviours covered in this quiz are the same patterns the law was written to address."
      ),
      createAnswerFirstSection(
        "What The Result Means",
        "More than three or four red flags marked as \"often\" or \"always\" is a serious indicator that the relationship contains controlling or abusive dynamics, regardless of how the rest of it feels. People in coercive relationships frequently underrate their own situation because the abusive patterns develop slowly and become normalised. Seeing the behaviours listed plainly, in writing, often clarifies what was hard to name.",
        "A low score does not mean a relationship is perfect. Healthy relationships can still have communication issues, occasional conflict, and frustrating habits. The quiz is specifically tuned to coercive and abusive patterns, not to general relationship quality. If you scored low but feel something is off, that feeling is also valid information."
      ),
      createAnswerFirstSection(
        "If The Result Worries You",
        "Three resources, all UK-based and free. Refuge runs the National Domestic Abuse Helpline on 0808 2000 247, 24 hours a day. Women's Aid has live chat support at chat.womensaid.org.uk. Men's Advice Line for men in abusive relationships is 0808 8010 327. All three are confidential and you do not have to be in immediate crisis to call.",
        "If you are in immediate danger, call 999. If you cannot speak, you can press 55 to be transferred to a silent solutions service. None of these will pressure you to take any specific action; they will help you think through what is going on, on your timeline. Leaving a controlling relationship is hard and statistically the most dangerous moment, which is why these services prioritise safety planning over telling people what to do."
      ),
    ],
    faqs: [
      createFAQ(
        "What counts as a red flag?",
        "Behaviours that consistently restrict your freedom, undermine your sense of self, or make you feel unsafe physically or emotionally. The 20 statements in this quiz cover the most commonly observed patterns: monitoring and isolation (Control), guilt-trips and gaslighting (Manipulation), and contempt or public belittling (Respect). One isolated incident is not necessarily a red flag; a recurring pattern is."
      ),
      createFAQ(
        "Is jealousy always a red flag?",
        "No, low-grade occasional jealousy is normal and most people experience it sometimes. Jealousy becomes a red flag when it leads to controlling behaviour: wanting to know where you are at all times, checking your phone, getting angry when you spend time with friends, monitoring your social media. The behaviour matters more than the feeling underneath it."
      ),
      createFAQ(
        "I scored low but I still feel unhappy. What now?",
        "Trust the feeling. The quiz specifically measures coercive and abusive patterns. A low score means the relationship probably is not abusive, but it does not mean it is right for you. Mismatched needs, communication breakdown, growing apart, and unmet expectations are all real reasons relationships do not work without abuse being involved."
      ),
      createFAQ(
        "Can men be in abusive relationships?",
        "Yes. Around one in three victims of domestic abuse in the UK are men, according to ONS Crime Survey data. The behaviours measured by this quiz apply regardless of gender. The Men's Advice Line (0808 8010 327) and ManKind Initiative (01823 334 244) are both UK-based services for men in abusive relationships."
      ),
    ],
    relatedTools: [
      { slug: "attachment-style-quiz", label: "Attachment Style Quiz" },
      { slug: "communication-style-quiz", label: "Communication Style Quiz" },
      { slug: "narcissism-test", label: "Narcissism Test (NPI-16)" },
    ],
  },

  "self-esteem-scale": {
    sections: [
      createAnswerFirstSection(
        "What The Rosenberg Scale Is",
        "The Rosenberg Self-Esteem Scale, published by sociologist Morris Rosenberg in 1965, is the most widely used measure of global self-esteem in the world. Ten items, four-point Likert scale (strongly agree to strongly disagree), about half worded positively (\"I take a positive attitude toward myself\") and half negatively (\"At times I think I am no good at all\"). The negative items are reverse-scored so a high total always means high self-esteem.",
        "Total scores run 0 to 30, with 15 to 25 considered the normal range. Below 15 indicates low self-esteem; consistent scores above 25 are sometimes flagged in research as overly positive (potentially defensive) but are generally interpreted as healthy high self-esteem. The scale has been translated into more than 50 languages and used in tens of thousands of studies. Its validity is about as well-established as anything in social psychology."
      ),
      createAnswerFirstSection(
        "What \"Self-Esteem\" Means Here",
        "Rosenberg defined self-esteem as a global evaluation of self-worth, distinct from confidence in specific areas (work, looks, social skills). You can be a confident public speaker with low global self-esteem, or have low confidence at sports while scoring high on this scale. The scale measures whether you fundamentally feel okay about being you, not whether you feel competent at any particular task.",
        "This matters because people often confuse self-esteem with arrogance or with situational confidence. The scale is asking about something quieter: do you believe you have value as a person, regardless of whether you are good at the thing you tried today. Healthy self-esteem is the baseline that lets failures bounce off; low self-esteem is the soil that lets every setback feel like confirmation you are not worth much."
      ),
      createAnswerFirstSection(
        "What To Do With Your Score",
        "Low scores are common and treatable. Cognitive Behavioural Therapy is the most evidenced treatment for low self-esteem; in the UK you can self-refer to NHS Talking Therapies at nhs.uk/talk. Books that have actual research behind them include Melanie Fennell's \"Overcoming Low Self-Esteem\" and Kristin Neff's work on self-compassion, which has emerged as a related and possibly more useful construct in recent decades.",
        "Tracking change over time is more useful than the absolute number. The scale was designed to be retaken (every few weeks during therapy is typical) and movement of 3 or 4 points is meaningful. Low self-esteem often co-occurs with anxiety and depression, so the [GAD-7](/anxiety-screening-gad7) and [PHQ-9](/depression-screening-phq9) screeners are worth running alongside this if you scored low and want a fuller picture."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the Rosenberg Scale accurate?",
        "It is one of the most validated psychological measures in existence, used in thousands of peer-reviewed studies since 1965. It correlates well with related constructs (depression, anxiety, life satisfaction) and predicts real-world outcomes (academic performance, relationship quality) at modest but meaningful levels. It is short and limited by self-report bias, but as global self-esteem measures go, it is the gold standard."
      ),
      createFAQ(
        "What is a normal score?",
        "Most large-sample studies place the population mean around 19 to 22 out of 30. Scores between 15 and 25 are considered the normal range. Below 15 indicates low self-esteem and is associated with greater risk of depression and anxiety. Above 25 is healthy high self-esteem; very high scores (28-30) sometimes flag in research as defensive but are usually fine."
      ),
      createFAQ(
        "Why are some questions worded negatively?",
        "To control for acquiescence bias, the tendency to agree with questionnaire items regardless of content. If all ten items asked \"I am great, agree?\" then people who tend to agree with everything would score artificially high. Mixing five positively-worded and five negatively-worded items, with the negative ones reverse-scored, controls for this and produces more reliable totals."
      ),
      createFAQ(
        "Can self-esteem be improved?",
        "Yes, with effort. Cognitive Behavioural Therapy has strong research support for low self-esteem, particularly Melanie Fennell's protocols. Self-compassion practices, developed by Kristin Neff, have emerged as a related and possibly more useful approach. NHS Talking Therapies offer both as treatment in the UK at no cost. Self-esteem is more like fitness than height: stable but trainable."
      ),
    ],
    relatedTools: [
      { slug: "depression-screening-phq9", label: "Depression Screening (PHQ-9)" },
      { slug: "anxiety-screening-gad7", label: "Anxiety Screening (GAD-7)" },
      { slug: "big-five-personality-test", label: "Big Five Personality Test" },
    ],
  },

  "what-dog-breed-are-you": {
    sections: [
      createAnswerFirstSection(
        "How The Quiz Sorts You",
        "Twelve questions about your energy levels, social preferences, loyalty patterns, communication style, and approach to challenges. Each answer maps to one of nine breed archetypes: Labrador (friendly all-rounder), Golden Retriever (warm optimist), Border Collie (intense achiever), German Shepherd (loyal protector), Husky (independent adventurer), Greyhound (graceful loner), Pug (cosy charmer), Cocker Spaniel (sensitive supporter), or Mixed Breed (genuinely unique combination). Whichever breed scores most points by the end is your match.",
        "The breed personalities used in the scoring come from the well-established literature on canine temperament, not vibes. Dr Stanley Coren's work on breed intelligence and temperament, and the AKC breed standards, both inform how each option is weighted. Border Collies really are the smartest, most driven breed; Pugs really are stubborn cuddle-machines. The quiz pairs human personality patterns to those breed traits."
      ),
      createAnswerFirstSection(
        "Why Some Results Feel Eerily Right",
        "The reason a personality-to-dog quiz often lands well is that humans have spent 15,000 years selectively breeding dogs to amplify specific personality traits. Border Collies were bred for focus and work drive; Labradors were bred for sociability and reliability; Greyhounds were bred for independence and speed. Those traits are now genuinely distinct and recognisable, which means matching them to human personality types produces meaningful (if simplified) parallels.",
        "The match also tends to feel right because dogs are emotionally legible in a way humans usually aren't allowed to be. \"I am a Golden Retriever\" gives you permission to be openly warm without it being awkward. \"I am a Greyhound\" gives you permission to be selective about company without it being rude. The quiz is partly a way of giving your traits a friendlier label."
      ),
      createAnswerFirstSection(
        "What This Doesn't Mean",
        "It does not mean you should adopt that breed of dog. Compatibility between human and dog comes from matching lifestyles, not personalities; a high-energy human can be a perfect fit for a low-energy dog because they balance each other out. If you are actually choosing a dog, talk to a trainer or rescue centre, not a quiz on the internet. The result here is purely for fun and self-recognition.",
        "If you want more involved personality typing, the [Hogwarts House Quiz](/hogwarts-house-quiz) and the [What Element Are You quiz](/what-element-are-you) use similar archetype-based scoring. For something with actual psychometric grounding, the [Big Five Personality Test](/big-five-personality-test) is the academic standard."
      ),
    ],
    faqs: [
      createFAQ(
        "Why didn't I get my favourite breed?",
        "Because the quiz scores you on traits, not preferences. People who love Huskies often score Labrador because they have laid-back social personalities even though they admire the husky-type independence. The result is what your personality maps to, not what you would choose. If you really wanted to be a Husky, you can take it again and lean into the more independent answers."
      ),
      createFAQ(
        "Is this based on real breed personalities?",
        "Yes. The breed archetypes used in scoring draw from established work on canine temperament, including Stanley Coren's research on breed intelligence and the American Kennel Club breed standards. Border Collies really are intense and driven; Pugs really are stubborn cuddlers. The mapping from human traits to breed traits is the imaginative leap, but the breed personalities themselves are well-documented."
      ),
      createFAQ(
        "Can I get a Mixed Breed result?",
        "Yes, and it usually means your answers don't cluster strongly toward any single archetype. Mixed Breed is not a worse result; it often means you are more balanced or adaptable than people who score strongly on one breed. The scoring rewards strong patterns, so a person who is moderate on every dimension lands here."
      ),
      createFAQ(
        "Should I get the dog the quiz tells me I am?",
        "No, please don't make a real dog-buying decision based on this. Compatibility between humans and dogs depends on lifestyle, energy match, training time, living space, and a dozen other practical factors. Often the best match is a dog with complementary energy, not matching personality. Talk to a rescue or breed-specific charity if you are seriously thinking about adopting."
      ),
    ],
    relatedTools: [
      { slug: "what-element-are-you", label: "What Element Are You?" },
      { slug: "hogwarts-house-quiz", label: "Fantasy House Sorting Quiz" },
      { slug: "what-type-of-friend-are-you", label: "What Type of Friend Are You?" },
    ],
  },

  "which-decade-do-you-belong-in": {
    sections: [
      createAnswerFirstSection(
        "How The Quiz Decides",
        "Twelve questions covering music, fashion, technology, nightlife, films, lifestyle, and cars. Each answer tags a decade from the 1950s through the 1980s, and whichever decade scores the most tags by the end is where the quiz says you belong. The scoring is straightforward weighted-points; there is no clever modelling, just whichever vibe collected the most votes from your answers.",
        "We capped the decade range at the 1980s deliberately. Once you hit the 1990s, the cultural anchors get muddier (most people born after 1985 lived through them, so it stops being a personality result and becomes a memory result). The decades from 50s to 80s are far enough back that almost no one has direct experience of all four, which makes the result genuinely about which culture you would have fitted into rather than which one you grew up in."
      ),
      createAnswerFirstSection(
        "What Each Decade Means In The Scoring",
        "The 1950s in the scoring means traditional, family-oriented, swing music, classic cars, drive-in movies, vinyl records. The 1960s means free-spirited, hippie, idealistic, music festivals, rock and roll, vans. The 1970s means laid-back, creative, disco, platform shoes, fuel-efficient compacts, dinner parties. The 1980s means ambitious, fast-paced, synth-pop, power suits, sports cars, nightclubs.",
        "These are stereotyped versions of each decade's cultural mood and they leave a lot out (the 80s also had post-punk and Thatcherism; the 60s had Vietnam and assassinations) but the quiz is calibrated to the dominant pop-culture aesthetic, not the historical record. If you care about historical nuance, this is not the tool for that."
      ),
      createAnswerFirstSection(
        "Why The Result Often Surprises People",
        "Most people expect to land in the decade closest to their actual preferences, and most do, but a meaningful minority discover they are temporally misplaced. The 24-year-old who scores 70s because they secretly love disco and laid-back creativity. The 60-year-old who scores 80s because they peaked in their twenties and never really left. The 40-year-old who scores 50s because they are quietly traditional in ways they had not articulated.",
        "These results are interesting because they surface aesthetic preferences that don't map neatly onto your actual decade of birth. Take it with friends and the comparing-results conversation is usually better than the result itself, which is what this kind of quiz exists for. The [How British Are You quiz](/how-british-are-you) and the [Mental Age Quiz](/mental-age-quiz) work the same way: they are conversation-starters, not psychology."
      ),
    ],
    faqs: [
      createFAQ(
        "Why don't you include the 1990s or 2000s?",
        "Because most people who take the quiz lived through one or both of those decades, which makes the result about memory and nostalgia rather than personality fit. Capping at the 80s means almost no one has direct experience of all four eras, so the answer reflects which cultural mood you respond to rather than which one you grew up in."
      ),
      createFAQ(
        "I'm Gen Z and got the 1950s. Is that weird?",
        "Not at all, and it is one of the most common surprise results. Younger respondents often score higher decades because the quiz weights answers around traditional, slower-paced, family-oriented choices, which a meaningful chunk of any generation prefers regardless of when they were born. It usually means your aesthetic sensibility leans toward an era you have only seen in films."
      ),
      createFAQ(
        "Is this a serious personality test?",
        "No. It is a fun quiz that uses cultural aesthetics as a proxy for personality vibe, with no psychometric grounding. The result is for entertainment and conversation, not self-knowledge. If you want a personality test with actual research behind it, the [Big Five Personality Test](/big-five-personality-test) is the academic standard."
      ),
      createFAQ(
        "What if I'm split between two decades?",
        "Common, and arguably more interesting than a single clear result. A 6-6 tie between the 60s and 70s usually means you are drawn to the laid-back creative energy that ran through both, with slightly different music. Treat both as valid sides of your aesthetic."
      ),
    ],
    relatedTools: [
      { slug: "mental-age-quiz", label: "Mental Age Quiz" },
      { slug: "how-british-are-you", label: "How British Are You?" },
      { slug: "what-element-are-you", label: "What Element Are You?" },
    ],
  },

  "emotional-intelligence-quiz": {
    sections: [
      createAnswerFirstSection(
        "What This Quiz Actually Measures",
        "20 questions across the four-branch model of emotional intelligence developed by Salovey and Mayer in the early 1990s. You score 1 to 4 on each question, giving 20 points per branch and 80 total. Your result lands in one of four bands: Developing (35 or below), Growing (36-50), Strong (51-65), or Exceptional (66+).",
        "The four branches are perceiving emotions (reading faces, tone, body language), using emotions (channelling moods to fuel work), understanding emotions (knowing why an emotion shows up and what it leads to), and managing emotions (regulating yourself and others under pressure). The branch breakdown matters more than the total. Two people can both score 55 but be wildly different - one scoring 18 in perceiving and 8 in managing, another the reverse. The quiz takes about 4 minutes."
      ),
      createAnswerFirstSection(
        "Why Some People Score Low on Managing Emotions",
        "The managing branch is consistently the lowest-scoring across most people who take this quiz. It's the branch that asks you to do something with the emotion, not just notice it. Becoming defensive at criticism, ruminating after a setback, or reacting in high-stress moments all show up here.",
        "If your managing score is below 12 out of 20, the lift comes from rehearsed, boring habits rather than insight. Naming the emotion out loud (\"I'm feeling defensive right now\") slows the reaction down by a few seconds, which is often enough to choose a different response. Six-second pauses between trigger and reaction, journalling 90 seconds after a tough meeting, asking one trusted person for feedback every fortnight - none of it sounds glamorous, but the data on emotional regulation is clear that the boring work outperforms the insight-led work."
      ),
      {
        heading: "Score Bands and What They Indicate",
        table: {
          headers: ["Total Score", "Band", "Typical Pattern", "First Step"],
          rows: [
            ["0-35", "Developing", "Often miss emotional cues, struggle to name feelings", "Build vocabulary - learn 30+ emotion words beyond happy/sad/angry"],
            ["36-50", "Growing", "Notice emotions but react before regulating", "Practice the 6-second pause between trigger and response"],
            ["51-65", "Strong", "Read situations well, occasional reactive moments", "Work the weakest branch - usually managing or understanding"],
            ["66-80", "Exceptional", "Read others, regulate self, use emotions strategically", "Coach others; teaching cements the skill"],
          ],
        },
      },
      createAnswerFirstSection(
        "What This Quiz Is Not",
        "This is a self-report quiz for personal reflection, not a clinical or diagnostic instrument. The MSCEIT (the validated ability test based on the same four-branch model) costs around £300 to administer and uses scenarios judged by expert raters. Self-report questionnaires of any kind, including this one, tend to inflate when people answer how they wish they responded rather than how they actually do.",
        "Use the result as a prompt, not a label. If the [Communication Style Quiz](/communication-style-quiz) shows you favour assertive communication but your managing score is 8, that's a useful gap - you have the words but lose them under pressure. The [Big Five Personality Test](/big-five-personality-test) covers the broader trait architecture; emotional intelligence is closer to a learnable skill stack than a fixed trait, which is why the developing-to-exceptional band shifts over months of deliberate practice."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a good emotional intelligence score?",
        "Scoring 51 or higher (the Strong band) puts you in the upper half of typical responses on this quiz. Scores above 65 are uncommon and usually appear in people who have done years of therapy, leadership coaching, or contemplative practice. Branch balance matters too: a 60 with 18-12-15-15 across the four branches is healthier than a 60 with 19-19-12-10."
      ),
      createFAQ(
        "Is this quiz scientifically validated?",
        "No. This quiz uses the four-branch framework from Salovey and Mayer's published research, but it has not been independently validated for reliability or external criterion validity. Validated tests in this space are the MSCEIT (ability-based) and the EQ-i 2.0 (trait-based, self-report), both administered by accredited practitioners. Treat this quiz as a self-reflection tool, not a clinical measurement."
      ),
      createFAQ(
        "Can emotional intelligence be improved?",
        "Yes, more reliably than IQ. Emotional regulation responds well to mindfulness training, cognitive behavioural techniques, and structured feedback over a 6-12 month window. Perceiving emotions improves with deliberate face-and-voice practice, the kind used in acting schools. Managing emotions is the branch most often coached in leadership development and shows the largest gains in workplace settings."
      ),
      createFAQ(
        "Why are my four branch scores so different?",
        "Most people are uneven. A common pattern is high perceiving and understanding (you read others well, see patterns) but lower managing (you struggle to act on what you read). Therapists and coaches often score the inverse: strong managing and using, weaker perceiving in their own emotions. The asymmetry tells you where to focus, not whether something is wrong."
      ),
      createFAQ(
        "Should I share my results?",
        "Personal call. The downloadable results card is designed to be shareable with a coach, therapist, or trusted colleague who can help you interpret the branches. Sharing on social media without context tends to invite people to compete on a number that means very little out of context, which defeats the purpose of the reflection."
      ),
    ],
    relatedTools: [
      { slug: "communication-style-quiz", label: "Communication Style Quiz" },
      { slug: "big-five-personality-test", label: "Big Five Personality Test" },
      { slug: "attachment-style-quiz", label: "Attachment Style Quiz" },
    ],
  },
};
