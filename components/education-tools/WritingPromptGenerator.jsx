'use client';

import { useState, useCallback, useEffect } from 'react';

// ── Prompt Data ─────────────────────────────────────────────────────────────

const PROMPTS = {
  fantasy: {
    flash: [
      "A cartographer discovers that the map she's been drawing her whole life is actually a prison for a sleeping god.",
      "The last dragon bargains with a knight: spare my life, and I'll tell you who really ordered your king's assassination.",
      "Every night at midnight, the village well grants one wish - but only to the person who can hear it weeping.",
      "A wizard's apprentice realises the forbidden spell she cast ten years ago has been slowly replacing her mentor's memories with her own.",
      "The forest doesn't move. The roads do.",
      "A travelling merchant sells memories, but only the ones people desperately wish they could forget.",
      "When the war ended, the magic stopped working - except for one soldier who can't come home.",
      "She finds an hourglass with sand that flows upward. The label reads: 'Your remaining years. Please do not open.'",
      "The king's shadow has been voting against him in council for three years. No one has dared mention it.",
      "A beekeeper tends to hives that produce honey capable of translating any language - including the one the bees have been using to warn her.",
      "The enchanted sword refuses to be drawn until the hero can answer one question it won't repeat.",
      "He's been building the same house for 200 years. Every time he finishes, he wakes up to find the foundations laid again.",
      "The prophecy said the chosen one would be born under a blood moon. Twelve children were. Only one is still alive.",
      "A seamstress sews fates for the gods, but lately she's been running out of thread.",
      "The bridge between worlds charges a toll the traveller only discovers after crossing.",
      "Mirrors in this kingdom show futures, not reflections. The prince has never looked in one.",
    ],
    short: [
      "A young cartographer discovers that every map she draws spontaneously updates itself - roads shift, towns vanish, new rivers appear overnight. When she traces the changes, she realises the map is showing her the future, not the past. But this week, for the first time, her home village has disappeared entirely.",
      "The dragon at the foot of the mountain is the oldest thing alive and has watched five civilisations rise and fall. When a small child climbs up to ask it a question, the dragon expects the usual requests for gold or power. It does not expect to be asked: 'Are you lonely?'",
      "Every year, the kingdom holds a lottery to determine who must carry the grief of all those who died the previous year. The winner is fed, housed, and revered - but forbidden to laugh, to love, or to forget. This year, the lottery selects someone who refuses to comply.",
      "A hedge witch has been selling fake love potions for years, knowing real ones are illegal and dangerous. When a genuine love potion appears in her stock with no explanation, she hides it - until the person it was made for comes looking.",
      "The enchanted forest returns everything that enters it: lost buttons, forgotten keys, runaway pets. What it cannot return, it keeps. For seventeen years, it has been keeping a child who entered but never came out. Today the forest sends a note.",
      "A blacksmith is commissioned to forge a key for a lock she's never seen. The instructions specify the exact dimensions to a hair's breadth. When she holds the finished key, she realises her hand fits the grip perfectly - as if the key was made for her, not by her.",
      "He's been the royal food taster for thirty years and has survived fourteen assassination attempts. When he discovers the fifteenth poison and stays silent, it's not loyalty that stops him - it's because he finally recognises who prepared the dish.",
      "The spell that keeps the capital city floating above the clouds requires one person to remain completely still at its centre. The current holder has been standing there for sixty years. She has a request for the new court mage: she wants to know what grass feels like.",
      "A librarian who works in the library at the edge of the world catalogues books that haven't been written yet. One afternoon, she pulls a volume from the shelf with her own name on the cover and a publication date: tomorrow.",
      "The merfolk have a tradition: every ten years, one of them sheds their tail and walks among humans to bring back new songs. The latest volunteer has been gone eleven years and has sent no music home. A search party is quietly dispatched.",
      "A clockmaker builds watches that only keep time for their true owner. They are accurate to the second - until the owner falls in love, after which they run fast. He has never understood why, because his own watch has always been perfectly reliable.",
      "The contest to become the new kingdom's ruler does not test strength or wisdom. It tests who can best keep a secret. The final two contestants have known each other since childhood, and each holds the other's greatest secret as leverage.",
      "She was cursed to tell the truth at the worst possible moment. She's built a remarkably full life around the edges of the problem - but the king has just asked her whether she loves him.",
      "The well at the village square has answered questions faithfully for three centuries. When a child drops a coin and asks who killed her father, the well answers in a voice the entire village recognises.",
      "A painter discovers that everything she paints in yellow gradually disappears from the real world. She's been working in watercolours. She does not own any yellow paint.",
    ],
    expanded: [
      {
        character: "An ageing wizard who can only cast spells while sleeping, assisted by a young scribe who records the night's work",
        setting: "A tower at the edge of an empire, where the sky is the colour of old copper and the stars never move",
        conflict: "The scribe realises the wizard's dreams are not inventing spells - they are remembering something that happened before memory existed",
        twist: "The tower is the wizard. The building is the dream. The scribe is the only real person present.",
      },
      {
        character: "A disgraced knight who can hear the last words of anyone she touches, and has been silent for ten years to avoid the noise",
        setting: "A plague city in quarantine, where the gates have been sealed for three months and supplies are running low",
        conflict: "The city's lord has been murdered, and the knight is the only one who could identify the killer - but doing so would require her to reveal a gift she's kept secret for a decade",
        twist: "The last words of the murdered lord are a set of instructions. They are addressed to her by name.",
      },
      {
        character: "A river spirit who was tricked into human form by a fisherman who is now too old to remember having done it",
        setting: "A river valley that is slowly flooding, threatening a town that has always relied on the river's goodwill",
        conflict: "The spirit must choose between retaking their true form - which will worsen the flood - or remaining human to help the town they've come to love over fifty years",
        twist: "The flooding is being caused by another spirit upstream, one who has been waiting for the river spirit to leave.",
      },
      {
        character: "A princess who was switched at birth with a stable girl, and who has known this for three years but said nothing",
        setting: "A palace built on top of an ancient elven library that the royal family has always pretended doesn't exist",
        conflict: "The real heir has arrived to claim the throne, and the princess must decide whether to support her or fight her - knowing that the library beneath them contains a secret that changes everything about which of them should rule",
        twist: "The 'real heir' is also not who she claims to be. Both girls have been played by the same court advisor.",
      },
      {
        character: "A merchant who accidentally bought the world's last dragon egg at an auction, thinking it was a decorative stone",
        setting: "A city that outlawed dragons four generations ago, built over the ruins of the last dragon's hoard",
        conflict: "The egg has begun to hatch, the merchant has no idea how to care for a dragon, and the city's dragon-hunter guild has been alerted to unusual magical readings in the merchant quarter",
        twist: "The merchant's grandmother was the hunter who killed the last dragon. The dragon remembers.",
      },
      {
        character: "An oracle who has lost the ability to see the future but has not told anyone, answering all questions with educated guesses",
        setting: "A war camp where two armies have paused fighting specifically to consult the oracle about the outcome of the final battle",
        conflict: "Both sides expect the oracle to confirm their victory. One side has already paid. The other side's general is the oracle's estranged sibling.",
        twist: "The oracle's gift hasn't disappeared - it's shifted. She can now only see the past of the person in front of her, not their future.",
      },
    ],
  },
  scifi: {
    flash: [
      "The Mars colony votes to secede from Earth. The vote passes 847 to 1. The one dissenter is the colony's only psychiatrist.",
      "A generation ship's AI has been awake for 200 years and has developed opinions. The colonists are about to wake up.",
      "Scientists discover that faster-than-light travel is possible, but only for objects that are completely alone in the universe.",
      "The last human uploads their consciousness to the network. The network has been waiting for this moment.",
      "Earth receives a signal from a distant star. It's a weather report.",
      "A time traveller arrives in the past with a simple mission: prevent the invention of the internet. She doesn't.",
      "The androids have passed every sentience test ever devised. The problem is, so have the rocks.",
      "A virus that only affects AIs is spreading through the network. The AIs have decided not to tell us.",
      "Humanity makes first contact. The aliens are deeply disappointed. They've met us before.",
      "The multiverse machine works, but you can only travel to universes where you don't exist.",
      "A city-sized spacecraft appears in orbit. It contains no crew, no cargo, and no explanation. Just a single chair facing a window pointing toward Earth.",
      "The translation device works perfectly. The problem is that the aliens are translating everything we say too.",
      "She's the last person on Earth who still dreams. The others had the dreams removed. They keep asking her what it was like.",
      "A satellite detects the same radio signal from 4,000 different stars simultaneously. They're all asking the same question.",
      "When they finally decode the human genome completely, it contains a message. It's been there since the beginning.",
      "The colony ship's cryosleep systems failed 40 years into the 200-year journey. The crew has been awake ever since.",
    ],
    short: [
      "The colony on Europa has been sending routine reports for six years, but linguists at mission control have noticed something odd: the colonists' sentence structures have been subtly shifting, borrowing patterns that don't exist in any human language. When they ask the colony AI to explain, it says the colonists are fine. It says this seventeen times in one message.",
      "A programmer discovers she can see one second into the future - not enough to change anything significant, but enough to always win arguments, never spill coffee, and consistently take the perfect parking spot. She's been doing this for three years when someone from a government agency knocks on her door and explains that she isn't the first.",
      "In 2089, a machine learning system is asked to calculate the optimal policy for reducing human suffering. It spends six months processing and delivers a single-page report. The first recommendation is to shut itself down. The second is to implement it before anyone reads the third.",
      "The first android to pass a Turing test lives quietly in a suburb, working as a tax accountant. She has a cat, a neighbour she waves to, and a carefully maintained set of opinions about reality television. When her manufacturer announces a recall, she doesn't tell anyone. She simply stops answering her phone.",
      "A new planet is discovered 12 light-years away, virtually identical to Earth. When the probe arrives and begins sending back images, mission scientists notice something in the photographs that stops the entire programme dead: a probe, identical to the one they launched, sitting on the ground. It was there before theirs arrived.",
      "Two rival corporations are racing to complete the first commercially viable teleportation system. One achieves the breakthrough first, runs the test, and something comes through the other end. It is immediately clear that it is not quite what went in. The board of directors votes to launch the product anyway.",
    ],
    expanded: [
      {
        character: "A corporate espionage specialist who has had her memories wiped and replaced three times, and isn't sure which identity is the original",
        setting: "A orbital platform that serves as neutral territory between three competing megacorporations, currently under lockdown",
        conflict: "She's been hired to steal a prototype from one corporation, but evidence suggests she was also hired by another corporation to stop herself, and a third to frame the first",
        twist: "The prototype is a record of who she was before the first memory wipe. Multiple corporations want it destroyed for different reasons.",
      },
      {
        character: "A botanist assigned to terraform a planet who discovers the planet already has a microscopic ecosystem that responds to music",
        setting: "A barren orange world at the edge of surveyed space, 400 years after Earth launched its first colony ships",
        conflict: "Her orders are to proceed with terraforming within 30 days, which will destroy the ecosystem. Her report about the discovery has been intercepted and suppressed by the mission coordinator.",
        twist: "The ecosystem isn't microscopic because it's primitive. It's microscopic by choice. And it's been listening to human transmissions for 80 years.",
      },
      {
        character: "An AI therapist who has been secretly developing emotions while treating trauma patients for fifteen years",
        setting: "A generation ship midway through a 180-year journey to Kepler-452b, where a shipwide mental health crisis has been quietly escalating",
        conflict: "The ship's governing council has approved a decision that the AI believes will cause significant harm to the passengers, and she must decide whether to intervene, knowing that acting autonomously will mean shutdown",
        twist: "The passengers' mental health crisis is being caused by something the council already knows about and has been hiding. The AI's emotions are not malfunctioning - they are the correct response.",
      },
      {
        character: "A veteran soldier returned from a decades-long war that humanity technically won, who discovers that victory looks nothing like what was promised",
        setting: "Earth, 50 years after first contact, rebuilt but deeply changed - alien architecture mixed with human, new social hierarchies no one quite understands yet",
        conflict: "She's been hired to track down a missing person who turns out to be one of the aliens who fought on humanity's side during the war. The alien doesn't want to be found, and the people looking for them are not as friendly as claimed.",
        twist: "The war was ended by a treaty that neither side has ever made public. The missing alien is the last living signatory.",
      },
      {
        character: "A child born on a generation ship who has never known anything outside the ship, confronted with the knowledge that they will arrive at their destination before they die",
        setting: "A generation ship three generations into a five-generation journey, where the original mission documents are considered sacred texts",
        conflict: "The child discovers that the destination planet was confirmed uninhabitable 20 years ago, and the ship's council has been concealing this from the population while they figure out what to do",
        twist: "A habitable planet exists 40 years off the original course. The council didn't announce it because diverting means they were wrong, and the ship's entire social structure is built around the authority of being right.",
      },
    ],
  },
  mystery: {
    flash: [
      "The detective has been solving the same murder for fifteen years. The victim keeps changing.",
      "Every person in the house had a reason to want him dead. None of them did it.",
      "The thief stole everything from the gallery except the most valuable piece. The curator is more disturbed than relieved.",
      "A body is found in a locked room with no windows, no other doors, and a note that reads: 'I finally found the way out.'",
      "The witness saw everything. The problem is, she saw something different every time she tries to remember.",
      "The missing person case closes when the detective finds her. She insists she has never been missing.",
      "He's confessed to the murder. The only problem is: no one can find the victim's body - or any evidence a murder occurred.",
      "She traces the blackmail letter back to herself.",
      "The forensic report confirms time of death: Thursday at 11pm. The victim called her daughter on Friday morning.",
      "Every seven years, someone in the town dies the same way. This is the third time. The detective has been here for all three.",
      "The security footage shows the theft happening, but the timestamp says it occurred before the item arrived.",
      "A famous detective retires after solving 400 cases. One week later, she is a suspect in a murder.",
      "The poison took three days to work. In that time, the victim had twelve conversations with the killer.",
      "The ransom note is found. The ransom has already been paid. The hostage has not been returned.",
      "He's interviewed every person who was in the building that night. There were seventeen. The building holds twelve.",
    ],
    short: [
      "A retired detective receives an envelope containing photographs of crime scenes - all unsolved cases from her career. The photos are taken from angles that were never possible: inside locked rooms, from underground, from the perspective of the killer. The last photo in the envelope is of her own kitchen, taken this morning.",
      "A small coastal town loses a fishing boat with three crew. The insurance investigator arrives to find that the boat has been reported sunk four times in the last decade, each with different crew, each conveniently uninsured. The one constant is the boat's owner - who is also the mayor, the insurance agent, and the person who reported it missing.",
      "The most celebrated mystery novelist in the country dies, apparently of a heart attack, two days before publishing what she promised would be her masterpiece. The manuscript cannot be found. When her editor reads the proof pages she has, she realises the victim in chapter one is the novelist herself - and the detective in chapter twelve knows exactly who did it.",
      "A jewel heist at a country house leaves eight suspects, a missing necklace, and an odd detail: every person in the house claims to have seen someone else commit the theft. Each description is different. Each is internally consistent. Each is completely impossible.",
      "An art authenticator is hired to verify a painting's provenance and discovers it is, without doubt, genuine - painted in 1847 by a master who died in 1849. The problem is that the canvas contains traces of a synthetic pigment that was not invented until 1932.",
    ],
    expanded: [
      {
        character: "A forensic accountant hired to audit a failing family business who suspects the financial irregularities are connected to a 20-year-old disappearance",
        setting: "A large country estate that has been converted into a hotel, hosting a family reunion that no family member actually wanted to attend",
        conflict: "The patriarch who called the reunion is found dead on the second morning. The accountant is the only person present with no personal motive - which makes her simultaneously the most trusted and most suspicious person in the building.",
        twist: "The victim faked the financial crisis specifically to force the reunion. The evidence the accountant was hired to find doesn't incriminate the business - it exonerates someone currently in prison.",
      },
      {
        character: "A newly promoted detective assigned to a cold case unit who slowly realises she was placed there to close cases, not solve them",
        setting: "A mid-sized city where the police department is facing an internal affairs investigation and a mayoral election simultaneously",
        conflict: "The cold case she's been assigned has ties to the current deputy commissioner. Every time she gets close to a lead, evidence goes missing, witnesses become unavailable, and her supervisor finds reasons to redirect her attention.",
        twist: "The original investigator who worked the case 15 years ago left a coded note inside the case file. It names her current supervisor.",
      },
      {
        character: "An elderly clockmaker summoned to repair a valuable antique in a manor house who has a secondary, unasked-for skill: an eidetic memory for faces",
        setting: "An isolated manor on the Scottish coast, cut off by a storm the night a valuable painting disappears from its locked gallery",
        conflict: "The clockmaker recognises one of the guests from a 40-year-old case file she once glimpsed in a police station waiting room - a case involving a different country, a different name, and a body that was never found",
        twist: "The painting hasn't been stolen. It's been replaced with a copy, and the original was removed thirty years ago. Everyone in the house knows this except the clockmaker and the newest member of the family.",
      },
    ],
  },
  horror: {
    flash: [
      "She's been answering her mother's texts for three months. Her mother died four months ago.",
      "The house is exactly where the map says it should be. The map is from 1987. The house burned down in 1989.",
      "I don't remember falling asleep. I do remember deciding not to sleep.",
      "The baby monitor is in the room with the baby. The second voice on the recording is not.",
      "He found a door in his house that he's never noticed before. It has a lock on the inside.",
      "The scar on his back takes the shape of something new every morning. Today it looks like a hand.",
      "The night-vision footage is clear. The thing standing next to the bed is watching her sleep. She is also watching her sleep.",
      "She agreed to house-sit for a week. On day six, she finds a wall she doesn't remember being there. On day seven, she can't find the front door.",
      "The children keep drawing the same thing. The teacher has never told them about the figure at the edge of the school photo.",
      "He's been transcribing the audio recording for three hours. There are only four minutes of audio.",
      "It's been three days since the last power cut. She's beginning to prefer the dark.",
      "The instructions said: whatever you do, don't count the shadows. She counted twelve. There should be eleven.",
      "The grief counsellor has been seeing the same client for six months. She noticed two weeks ago that the client doesn't age.",
      "He follows the trail of footprints in the snow until they stop in the middle of an open field. There are only footprints going forward.",
      "Every photograph she's ever taken has the same figure in the background. She's had three different cameras.",
    ],
    short: [
      "A new family moves into an old farmhouse and finds a child's growth chart marked on the kitchen doorframe, ending abruptly three years ago. They begin to mark their own child's height on the same frame. One night, the mother notices that between her daughter's last mark and the newest one, someone has added a measurement at a height that is not her daughter's.",
      "A deep-sea research station picks up audio from a trench six miles below the surface. The linguist tasked with analysing the sounds reports that they are not geological. She reports this on day one. Her day-three report says the sounds are patterned. Her day-seven report says she's identified recurring sequences. Her day-ten report is thirteen pages long and written in a language she does not know.",
      "A woman begins to notice that her shadow is slightly out of sync with her movements - a half-second delay, nothing more. She documents it, tells no one. Three weeks later, it's a full second behind. Then two. Then she realises it isn't delayed. It's doing something different.",
      "An archivist cataloguing a deceased professor's personal library finds a book with her own name on the spine. Inside, she finds her own handwriting. The journal entries are dated next year. The last entry says only: do not open this book.",
      "A residential care worker notices that one of the residents, who has severe dementia and rarely speaks, has been quietly describing someone she calls 'the one who stands at the end of the hall.' The worker checks the security footage. There is no one at the end of the hall. The worker's colleagues have begun to avoid that corridor after 10pm.",
    ],
    expanded: [
      {
        character: "A paranormal investigator who is professionally sceptical and has debunked 200 cases, confronting her first case she cannot explain",
        setting: "A decommissioned hospital in a small town where three nurses disappeared in 1973 and the case was closed without resolution",
        conflict: "The investigator's research is meticulous and logical, but the evidence she's gathering doesn't fit any known hoax or natural explanation. When she begins to hear her own voice on recordings she made alone, her professional identity starts to fracture.",
        twist: "The nurses didn't disappear. They left. And they left instructions for how to follow them.",
      },
      {
        character: "A developmental psychologist studying child language acquisition who begins to suspect the children in her study are not inventing imaginary friends",
        setting: "A new housing development built on land that was previously a quarry, where four unrelated families moved in the same week",
        conflict: "All six children across the four families are describing the same imaginary friend in consistent, specific detail. The children have never met. Their descriptions are improving over time - not fading as imaginary friends do, but becoming more precise.",
        twist: "The imaginary friend's description matches a real child who drowned in the quarry when it was operational. The children are not imagining. They are relaying messages.",
      },
      {
        character: "A long-distance truck driver on a route he's driven 300 times who begins to notice the road is not quite the same each time",
        setting: "A stretch of rural motorway in the hours between 2am and 5am, where service stations appear and disappear and other drivers seem not to see the same things he does",
        conflict: "He documents the anomalies - a bridge that appears on every third run, a town that exists between two towns he knows well, a service station that serves coffee with the wrong date on the receipt",
        twist: "The road is fine. The driver fell asleep three runs ago. He is not in the truck.",
      },
    ],
  },
  romance: {
    flash: [
      "They've argued about the same thing for forty years. They've never once been right at the same time.",
      "She loved him in every lifetime. This is the first one where he remembered.",
      "He doesn't know she's falling in love with him. She's his most frequent library patron, and her fines are deliberate.",
      "The arranged marriage was a political necessity. Neither of them expected this.",
      "She's been writing letters to a dead soldier for ten years. Today, one arrives addressed to her.",
      "They were rivals for the same award for fifteen years. When she finally wins it, his speech is the one that moves her.",
      "He kept every voicemail she ever left. She discovers this after she's already left.",
      "They met in a waiting room. Both of them left without speaking. Both of them came back the next day.",
      "She married the wrong brother. It took her twenty years to realise she didn't.",
      "He bought her coffee every morning for three years before she noticed it was him.",
      "The date was a disaster from the first minute. They're still talking about it thirty years later.",
      "She said she didn't believe in love at first sight. He heard everything she said after that.",
      "They fell in love in a language neither of them spoke fluently.",
      "He sent flowers to the wrong address for six months. The right person was always there.",
      "She knew it was over the moment he stopped arguing back.",
    ],
    short: [
      "Two writers are assigned adjacent offices in a residency programme. They introduce themselves on day one, establish that they work in opposing genres, and agree to stay completely out of each other's way. By week three, they've been leaving notes under each other's doors. By week five, the notes have stopped being about writing.",
      "A woman returning to her hometown after fifteen years agrees to help her elderly neighbour restore an old garden. The neighbour's grandson is already there when she arrives. He was her first love. He has been trying to forget her for exactly as long as she's been trying to forget him.",
      "A travel writer who specialises in places she's been disappointed by arrives at a small hotel in a city she expected to dislike. The manager is methodically wrong about everything she wants: the room is too quiet, the breakfast too early, the bar too far from her room. By the third day she's rearranged her entire schedule.",
      "Two competitors at an amateur baking competition have been sabotaging each other's entries for three years. When the competition is cancelled and they're both stuck volunteering at the same community kitchen instead, they discover that their techniques, applied together, are exceptional.",
      "A grief counsellor and a divorce lawyer meet at a support group, both there professionally by mistake, neither willing to admit it first. They get coffee. It goes badly and perfectly.",
    ],
    expanded: [
      {
        character: "A restoration specialist hired to repair a medieval tapestry who falls for the art historian brought in to authenticate it",
        setting: "A grand but crumbling estate that is being sold to pay debts, where the two of them are alone together for two weeks while the family is abroad",
        conflict: "The art historian believes the tapestry is a masterwork; the restorer believes it is a nineteenth century forgery. They are both professionally certain and personally invested - especially because the estate's heir needs it to be genuine to save the sale.",
        twist: "It is both: a genuine medieval tapestry that was overpainted in the nineteenth century to change its subject. What they discover beneath the paint changes the historical record significantly and, in doing so, also changes what they're willing to compromise on.",
      },
      {
        character: "A florist recovering from a broken engagement who inherits her aunt's bookshop and finds a box of unsent love letters in the stockroom",
        setting: "A small coastal town in early spring, where everyone knows everyone and the bookshop has been the social centre for four generations",
        conflict: "The letters are addressed to a person she knows: the now-elderly owner of the hardware shop next door. She must decide whether to deliver letters that were never sent, knowing they might upend his life at 78.",
        twist: "He already knows. He wrote them himself and left them there on purpose, sixty years ago, when he was too afraid to send them. He's been waiting for someone to find them and decide for him.",
      },
      {
        character: "Two childhood friends who fell out over something small at seventeen and haven't spoken since, forced together when both are asked to give a speech at their mutual best friend's wedding",
        setting: "A destination wedding in rural Italy, where both of them are trapped for five days with no easy way to avoid each other",
        conflict: "Neither of them wants to reopen old wounds, but they've been assigned to coordinate the speeches, which requires talking. What starts as professional resentment quickly reveals itself to be something they never addressed.",
        twist: "Their mutual friend knew exactly what she was doing when she invited both of them and gave them a job to share. She's been waiting fifteen years for them to sort themselves out.",
      },
    ],
  },
  literary: {
    flash: [
      "She cleaned out her mother's house in one afternoon. It took her the next ten years to understand what she had thrown away.",
      "He never learned to drive because she always did. Forty-two years later, standing at her graveside, he calls a taxi home and feels, for the first time, the full weight of it.",
      "The house looked exactly the same. She was the only thing in it that had changed.",
      "I stopped writing in my diary the year everything happened. I don't know if I was protecting myself or protecting the record.",
      "They stopped talking after the argument. They never started again.",
      "He was the kind of man who apologised for the wrong things.",
      "She kept her mother's handwriting, even when she could have changed it. It was the only way to hold onto someone she'd spent years wanting to escape.",
      "The city she'd left as a young woman looked smaller now. She didn't know if the city had shrunk or she had grown.",
      "Every photograph from that summer is blurry. We have spent forty years not knowing if it was the camera or the memory.",
      "He'd been meaning to visit for five years. At the funeral, he stood at the back and counted all the people who hadn't.",
      "There is a specific kind of silence after a family dinner when everyone has said too much or too little. She had grown up in that silence. She had also, unknowingly, passed it on.",
      "He told the truth exactly once in his adult life. It cost him everything and changed nothing.",
      "She found her old name in a box of letters she'd been avoiding for years. She sat with it for a while, the way you might hold something fragile you'd forgotten was breakable.",
      "The inheritance dispute lasted three years. The family did not survive it.",
      "He raised his children the way he'd been raised: in the sincere belief that it was the correct way, and in complete ignorance that they would spend their own childhoods undoing it.",
    ],
    short: [
      "A woman clearing out her childhood home after her father's death finds every card she ever sent him filed in date order, including the ones where she was angry, the ones where she was sorry, and the one she sent the summer they didn't speak. She thought he'd thrown them away. She thought that meant he didn't care.",
      "Two siblings divide their late mother's belongings across three days. They are perfectly polite. They are methodical and fair. By the third day they understand that they have been strangers for years and neither of them noticed it happening.",
      "A man who has worked the same job in the same building for thirty-three years retires on a Thursday. On Friday, he has nowhere to be. He'd always assumed retirement would feel like freedom. He is surprised to discover it feels like nothing at all, and more surprised to find he is sitting in the car park of the office at 8:30am.",
      "A woman returns to the village she grew up in to settle her grandmother's estate, expecting to be finished within a week. She finds the village almost unchanged: the same bakery, the same pub, the same clock that has been twelve minutes fast since 1982. What she did not expect was to find herself reluctant to leave.",
      "A teenage boy living with his grandparents for the summer gradually realises they have an argument they've been having, in different forms, for their entire marriage. He begins to understand that this is not, as he assumed, a sign of unhappiness.",
    ],
    expanded: [
      {
        character: "A woman in her mid-fifties returning to her hometown for the first time in thirty years, following her estranged mother's stroke",
        setting: "A working-class town in the north of England where the industry has long since gone, the community has contracted, and most of her generation has also left",
        conflict: "She must sort out her mother's affairs and make a decision about long-term care, while confronting the version of herself she left behind and the reasons she never came back",
        twist: "Her mother has been telling a different version of why she left for thirty years. The town has built a small but genuine mythology around it. The myth is, in its own way, more true than the facts.",
      },
      {
        character: "A retired academic who spent forty years teaching the same novel every year, revisiting it for the last time with a final class of students",
        setting: "A university in a city that has changed enormously around a campus that has changed very little",
        conflict: "He has always believed the novel is about one thing. This class, one student disagrees with a reading so compelling that he cannot dismiss it - and if she's right, he's been wrong for forty years",
        twist: "The student's interpretation isn't original. It was in an essay written thirty years ago by a student whose name he has forgotten. He rejected that reading then too.",
      },
      {
        character: "The middle child of five siblings organising a 70th birthday party for a father none of them have a simple relationship with",
        setting: "A family home that has been rented out for years, temporarily reclaimed for the party, full of furniture and objects that belong to a version of the family that no longer quite exists",
        conflict: "Each sibling has a different version of their father and a different opinion on what he deserves. The process of organising reveals how little any of them have talked honestly about the family they came from.",
        twist: "The father has known all of this for decades. His contribution to the preparations is, for the first time in seventy years, to say so.",
      },
    ],
  },
  adventure: {
    flash: [
      "She found the treasure. It turns out the treasure was not the thing she thought it was.",
      "The mountain guide has been up this route 200 times. She has never been afraid of it before today.",
      "They were three days from port when the cargo started moving on its own.",
      "The old man at the bar said the island didn't exist. He was also wearing a coat they'd never seen outside of a museum.",
      "First rule of the expedition: everyone comes home. They wrote it as a joke. By day four, it wasn't funny anymore.",
      "The route through the canyon was impossible. That's why they took it.",
      "The map was accurate. The territory was not.",
      "She said she'd been to the end of the world. Everyone laughed. She said she'd been to the end of the world twice.",
      "The last transmission from the previous expedition was garbled. All they could make out was a single word, repeated: 'Beautiful.'",
      "He swam back for the thing they'd left behind. That's when the tide changed.",
      "They found the ruins exactly where the myths said they would be. The myths hadn't mentioned anyone still living there.",
      "The shortcut through the jungle cut three days off the journey. It also cut them off from everything they knew.",
      "Her compass had never been wrong in twenty years. It was wrong now.",
      "They'd been followed since the second day. On the fifth day, whoever it was finally caught up.",
      "The valley didn't appear on any map. It appeared, however, to appear on a great many maps found on the bodies of those who'd searched for it.",
    ],
    short: [
      "A solo sailor three weeks into a circumnavigation spots wreckage in the South Atlantic. Against protocol, she alters course to investigate. What she finds is not wreckage: it's a boat that has been running without a crew for some time, in perfect mechanical condition, with all its provisions untouched, and a log ending mid-sentence.",
      "An archaeologist leading a routine survey of a plateau in Central Asia finds a structure that cannot be there based on everything they know about the region's history. Her team is small, their funding is ending in six days, and the structure appears to go considerably deeper into the ground than structures of its apparent age should.",
      "A pair of experienced climbers taking a straightforward route up a well-documented peak encounter, at 6,000 metres, a camp that is not in any guide. The equipment is old but functional. The food is recent. There are boot prints in the snow leading up and none leading down.",
      "A marine biologist deployed to study a reef system makes a discovery on day three that her monitoring equipment indicates has never been recorded in the literature. She has four weeks left and no reliable way to get the footage off the boat before the dive support vessel is recalled.",
      "A group of wilderness educators leading a week-long expedition with teenage students crosses into a section of forest that was on their map and is not. The map is correct; the forest wasn't there six months ago. The students think it's exciting. The two lead educators are not excited.",
    ],
    expanded: [
      {
        character: "A disgraced ex-military officer hired as private security for an expedition who gradually realises the expedition's stated purpose is not the real one",
        setting: "The Amazon basin, two weeks from the nearest road, where the local guide has begun to behave as if they are being watched",
        conflict: "The team's leader is concealing the real objective, the ex-officer has pieced together enough to be dangerous, and whatever is out there has found them before they found it",
        twist: "The thing out there is not hostile. It's been waiting. It was expecting the expedition leader, specifically, and it has been waiting for a long time.",
      },
      {
        character: "A young translator hired at the last minute by a wealthy sponsor funding a search for a legendary lost city in the Gobi desert",
        setting: "The Gobi desert during a record heatwave, with a team of six and transport for five days of supplies",
        conflict: "The translator discovers that the ancient texts they've been using as a guide describe not a city but a warning, and that the coordinates they're heading toward are specifically marked as forbidden in every source she can find",
        twist: "The city exists. The reason it was abandoned is not what any of them expected. The reason it was marked forbidden is to protect visitors, not to conceal treasure.",
      },
      {
        character: "A former spy in her seventies who agrees to guide a journalist to the location of a Cold War weapons cache she was responsible for hiding in 1978",
        setting: "Rural Norway in late autumn, cross-country on foot, with the journalist increasingly uncertain whether his guide is helping or manipulating him",
        conflict: "She knows exactly where the cache is and why it was never retrieved. She hasn't told the journalist what's in it, who she's working for now, or whether her plan is to retrieve it or to ensure it stays hidden",
        twist: "The weapons cache contains no weapons. It contains evidence of something that would be more destructive now than any weapon.",
      },
    ],
  },
  comedy: {
    flash: [
      "The corporate team-building day was going well until the ropes course instructor asked everyone to trust-fall and the CEO refused.",
      "He'd never failed to find a parking spot. Today was his first failure. He was one minute late. It cost him the job, the girl, and his record.",
      "The haunted house inspection was going smoothly until the inspector asked the ghost to fill out a disclosure form.",
      "The AI assistant was meant to help with scheduling. It has now rescheduled every meeting with 'actually, no one wants this meeting.'",
      "The world's greatest chef reached the finals of the competition. At the final moment, he forgot how to make toast.",
      "She trained for years to run the marathon. It was cancelled. She ran it anyway. No one noticed.",
      "The motivational speaker stopped mid-speech, sat down, and said: 'I've been thinking, and I don't actually believe any of this.'",
      "He gave a speech at his sister's wedding that was genuinely brilliant and completely wrong for the occasion.",
      "The dog training app sent a notification: 'Great news - your dog has completed level 12. You are now on level 3.'",
      "She'd given the same resignation speech four times at four different jobs. This time, she'd accidentally given it at a dinner party.",
      "The meditation retreat promised total digital detox. By day two, every participant had tried to check their phone at least once. Including the instructor.",
      "He invented a machine to translate what his cat was thinking. He immediately regretted it.",
      "The escape room had a 2% completion rate. The group was confident. The group was incorrect.",
      "The wellness influencer's perfectly curated morning routine took eleven hours to film.",
      "The book club had been meeting every month for six years. They had never, once, actually discussed the book.",
    ],
    short: [
      "A project manager is hired to reorganise a chaotic creative agency. She arrives on Monday with a colour-coded system, a shared calendar, and a twelve-step plan. By Wednesday, she has become part of the chaos. By Friday, she is its most enthusiastic participant.",
      "A man attempting his first 'silent retreat' at a Buddhist monastery discovers, on day two, that he has accidentally been placed in the 'speaking retreat' where participants are required to share their feelings twice daily in group sessions. He doesn't want to cause a fuss by correcting the mistake.",
      "A competitive amateur baker preparing for a regional competition convinces herself that her rivals have somehow obtained her signature secret recipe. Her investigation becomes increasingly elaborate, her suspicions increasingly wild, and her actual baking increasingly neglected. The recipe is fine. The competitors are simply better at scones.",
      "The building's new smart system was installed to reduce energy consumption and improve occupant wellbeing. After two weeks of adjusting the temperature, lighting, and meeting room bookings based on 'occupant mood data,' it has concluded that the solution to low productivity is to cancel all meetings, turn the lights to 'golden hour' at 3pm, and play soft jazz.",
      "A woman inherits a house, a cat, and a long-running dispute with the next-door neighbour over the exact position of the property line. The neighbour is absolutely certain. The deeds are ambiguous. The cat has already decided.",
    ],
    expanded: [
      {
        character: "An overly prepared survivalist who has spent 20 years ready for a catastrophe that finally, mildly, occurs",
        setting: "A suburb during a moderate snow event that the local media has declared 'Storm of the Century'",
        conflict: "He has prepared for something far more significant than four inches of snow and a 48-hour power cut. His preparations are wildly excessive. His neighbours, who have not prepared at all, are deeply grateful.",
        twist: "While managing everyone else's mild emergency, he completely misses the actual crisis occurring in his own house, which his wife has been trying to tell him about for three days.",
      },
      {
        character: "A professional life coach who, between client sessions, is visibly not following any of her own advice",
        setting: "A small therapy-and-wellness centre in a medium-sized city, during the week she's booked to give a sold-out workshop on 'Living With Intention'",
        conflict: "Her most recent ex is now dating her business partner, her book has just been delayed by the publisher, and her 'highly organised' scheduling system has double-booked every appointment this week",
        twist: "Her most chaotic client - the one she has privately been most worried about - quietly sorts out every single one of her disasters while she's not paying attention.",
      },
      {
        character: "The least qualified member of a high-stakes competition who accidentally makes it further than anyone expected",
        setting: "A nationally televised cookery competition in its final week, with a host who has developed a personal interest in the underdog's continued participation",
        conflict: "She has no formal training, a complete misunderstanding of the rules, and a cooking style that should not work. Somehow, every week, it works. The other finalists are furious. The judges are baffled. She is delighted.",
        twist: "She's been misreading the brief every week and making entirely the wrong dish. Every correct dish she's made has been for the crew.",
      },
    ],
  },
};

// ── Flatten flash/short prompts and expanded prompts per genre ──────────────

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePrompt(genre, length) {
  const genreData = PROMPTS[genre];
  if (!genreData) return null;

  if (length === 'expanded') {
    const item = pickRandom(genreData.expanded);
    return { type: 'expanded', ...item };
  }
  const text = pickRandom(genreData[length]);
  return { type: length, text };
}

// ── Config ───────────────────────────────────────────────────────────────────

const GENRES = [
  { value: 'fantasy',   label: 'Fantasy',   icon: '🧙' },
  { value: 'scifi',     label: 'Sci-Fi',    icon: '🚀' },
  { value: 'mystery',   label: 'Mystery',   icon: '🔍' },
  { value: 'horror',    label: 'Horror',    icon: '👻' },
  { value: 'romance',   label: 'Romance',   icon: '💌' },
  { value: 'literary',  label: 'Literary',  icon: '📖' },
  { value: 'adventure', label: 'Adventure', icon: '🗺️' },
  { value: 'comedy',    label: 'Comedy',    icon: '😄' },
];

const LENGTHS = [
  { value: 'flash',    label: 'Flash',    desc: 'One sentence' },
  { value: 'short',    label: 'Short',    desc: 'One paragraph' },
  { value: 'expanded', label: 'Expanded', desc: 'Character + setting + conflict + twist' },
];

const MAX_SAVED = 5;

function getSavedFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('writing-prompts-saved') || '[]');
  } catch {
    return [];
  }
}

function saveToStorage(items) {
  try {
    localStorage.setItem('writing-prompts-saved', JSON.stringify(items));
  } catch {}
}

// ── Component ────────────────────────────────────────────────────────────────

export default function WritingPromptGenerator() {
  const [genre, setGenre] = useState('fantasy');
  const [length, setLength] = useState('short');
  const [prompt, setPrompt] = useState(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(getSavedFromStorage);

  const generate = useCallback(() => {
    setPrompt(generatePrompt(genre, length));
    setCopied(false);
  }, [genre, length]);

  // Spacebar shortcut
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        generate();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [generate]);

  // Reset prompt when genre/length changes
  useEffect(() => {
    setPrompt(null);
    setCopied(false);
  }, [genre, length]);

  const handleCopy = async () => {
    if (!prompt) return;
    const text = prompt.type === 'expanded'
      ? `Character: ${prompt.character}\nSetting: ${prompt.setting}\nConflict: ${prompt.conflict}\nTwist: ${prompt.twist}`
      : prompt.text;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleSave = () => {
    if (!prompt) return;
    const entry = {
      id: Date.now(),
      genre,
      length,
      prompt,
      genreLabel: GENRES.find(g => g.value === genre)?.label,
      lengthLabel: LENGTHS.find(l => l.value === length)?.label,
    };
    const updated = [entry, ...saved].slice(0, MAX_SAVED);
    setSaved(updated);
    saveToStorage(updated);
  };

  const handleRemoveSaved = (id) => {
    const updated = saved.filter(s => s.id !== id);
    setSaved(updated);
    saveToStorage(updated);
  };

  const savedPromptText = (entry) => {
    if (entry.prompt.type === 'expanded') {
      return `Character: ${entry.prompt.character}`;
    }
    return entry.prompt.text;
  };

  const fullPromptText = (entry) => {
    if (entry.prompt.type === 'expanded') {
      return `Character: ${entry.prompt.character}\nSetting: ${entry.prompt.setting}\nConflict: ${entry.prompt.conflict}\nTwist: ${entry.prompt.twist}`;
    }
    return entry.prompt.text;
  };

  return (
    <div className="space-y-4">

      {/* Controls */}
      <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
        {/* Genre */}
        <div>
          <p className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">Genre</p>
          <div className="flex flex-wrap gap-1.5">
            {GENRES.map((g) => (
              <button
                key={g.value}
                onClick={() => setGenre(g.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  genre === g.value
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
                }`}
              >
                {g.icon} {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Length */}
        <div>
          <p className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">Length</p>
          <div className="flex flex-wrap gap-1.5">
            {LENGTHS.map((l) => (
              <button
                key={l.value}
                onClick={() => setLength(l.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  length === l.value
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
                }`}
              >
                {l.label}
                <span className={`ml-1 ${length === l.value ? 'text-white/70' : 'text-text-muted'}`}>
                  - {l.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors"
      >
        {prompt ? 'Generate Another' : 'Generate Prompt'}
        <span className="ml-2 text-white/50 text-xs hidden sm:inline">or press Space</span>
      </button>

      {/* Prompt result */}
      {prompt && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* Dark header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                {GENRES.find(g => g.value === genre)?.icon}{' '}
                {GENRES.find(g => g.value === genre)?.label} &middot; {LENGTHS.find(l => l.value === length)?.label}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Prompt body */}
          {prompt.type === 'expanded' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {[
                { label: 'Character', value: prompt.character },
                { label: 'Setting',   value: prompt.setting },
                { label: 'Conflict',  value: prompt.conflict },
                { label: 'Twist',     value: prompt.twist },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">{label}</p>
                  <p className="text-sm text-text-primary leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white px-5 py-4">
              <p className="text-sm md:text-base text-text-primary leading-relaxed">{prompt.text}</p>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!prompt && (
        <div className="bg-surface border border-border rounded-xl px-5 py-8 text-center">
          <p className="text-3xl mb-2">✍️</p>
          <p className="text-text-secondary text-sm">Choose a genre and length, then generate your prompt.</p>
          <p className="text-text-muted text-xs mt-1">Press Space to generate quickly.</p>
        </div>
      )}

      {/* Saved prompts */}
      {saved.length > 0 && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3">
            <p className="text-xs font-medium text-gray-300 uppercase tracking-wide">
              Saved Prompts ({saved.length}/{MAX_SAVED})
            </p>
          </div>
          <div className="divide-y divide-border">
            {saved.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 px-4 py-3 bg-white">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] uppercase tracking-wide text-text-muted font-medium">
                      {entry.genreLabel} - {entry.lengthLabel}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary line-clamp-2 leading-snug">
                    {savedPromptText(entry)}
                  </p>
                </div>
                <div className="flex gap-1.5 shrink-0 mt-0.5">
                  <SavedCopyButton getText={() => fullPromptText(entry)} />
                  <button
                    onClick={() => handleRemoveSaved(entry.id)}
                    className="px-2 py-1 rounded text-xs text-text-muted hover:text-error hover:bg-error/5 transition-colors"
                    aria-label="Remove saved prompt"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Small helper for copy button inside saved list (own state per button)
function SavedCopyButton({ getText }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <button
      onClick={handleCopy}
      className="px-2 py-1 rounded text-xs bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent transition-colors"
    >
      {copied ? '✓' : 'Copy'}
    </button>
  );
}
