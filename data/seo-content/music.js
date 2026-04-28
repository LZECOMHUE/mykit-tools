// SEO content for music and audio tools
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const musicSEO = {
  "ukulele-tuner": {
    sections: [
      createAnswerFirstSection(
        "Standard Tuning for Ukulele (G-C-E-A)",
        "The standard tuning for a soprano, concert, and tenor ukulele is G-C-E-A (from the top string closest to your face, down to the floor). Often remembered with the acronym 'Good Cows Eat Apples'.",
        "Unlike guitars, standard ukulele tuning is 're-entrant', which means the strings do not go strictly from low to high pitch. The top G string is actually tuned higher than the C string right below it, giving the ukulele its signature bright, island sound."
      )
    ],
    faqs: [
      createFAQ(
        "Does the online ukulele tuner use my microphone?",
        "Yes, if you select the microphone tuner option, it listens to the pitch of your string in real-time and provides visual feedback to tell you if the string is flat (too low) or sharp (too high)."
      ),
      createFAQ(
        "Should my soprano ukulele be tuned differently than a tenor?",
        "No. Soprano, concert, and tenor ukuleles are all typically strung and tuned to standard G-C-E-A tuning. The only exception is the Baritone ukulele, which is larger and naturally tuned to D-G-B-E (like the top four strings of a guitar)."
      )
    ]
  },

  "key-finder": {
    sections: [
      createAnswerFirstSection(
        "How a Musical Key Finder Works",
        "If you have a chord progression (e.g., C Major, F Major, G Major) but do not know what musical key you are playing in, a key finder tool reverses the process. It analyzes the specific notes within your chords and matches them against the 24 major and minor keys.",
        "Knowing your song's key is critical for writing melodies, adding a bassline, communicating with other musicians, and figuring out which scales (like the pentatonic or diatonic scale) you can use to solo over the track."
      )
    ],
    faqs: [
      createFAQ(
        "Can a key finder with chords detect multiple keys?",
        "Yes, it is very common in music theory for a simple chord progression (like Am and C) to exist perfectly in multiple keys (such as C Major or G Major). Our chord key finder will list all possible matching keys, ranked by the highest statistical probability."
      ),
      createFAQ(
        "What does it mean if my chords do not fit any key?",
        "If your chords contain notes outside of a traditional 7-note diatonic scale, you might be using 'borrowed chords' (modal mixture) or passing secondary dominants. While this breaks strict music theory rules, it often sounds great! The tool will highlight the closest matching key."
      )
    ]
  },

  "chord-library": {
    sections: [
      createAnswerFirstSection(
        "How To Read the Chord Diagrams",
        "Each chord diagram shows six vertical lines (the strings, low E on the left, high E on the right) and horizontal lines (the frets). A number on a string tells you which fret to press. A 0 means play the open string. An X above the diagram means do not play that string at all. The library covers the 12 root notes and 13 chord types: Major, Minor, 7, Maj7, Min7, Sus2, Sus4, Dim, Aug, Add9, 6, m6 and Power.",
        "The notes ringing out from a basic C Major shape are C, E and G, which are the 1st, 3rd and 5th of the C major scale. Almost every chord chart on the internet uses this notation, so once you can read it here you can read it anywhere. The library shows multiple voicings for each chord where they exist, including open shapes and barre shapes higher up the neck."
      ),
      createAnswerFirstSection(
        "Open Voicings vs Barre Voicings",
        "Open voicings use one or more open strings and only work in specific keys (mainly C, D, E, G and A and their minor counterparts). Barre voicings use one finger across multiple strings and can be moved up and down the neck to play any chord. The library shows both where they exist, so a beginner can grab the easiest open shape and an intermediate player can pick a barre shape that fits their fingerpicking pattern.",
        "When to pick which: open voicings sound brighter and ring more, but they are limited to certain keys. Barre voicings sound thicker and let you play any chord by sliding the same shape, but they take weeks of practice before they ring cleanly. Most songs sound best with a mix of the two. If you are struggling with the F barre chord, try the F shape on the 5th fret of the A string, which uses an easier root-position barre. The [scale finder](/scale-finder) shows you which notes from each chord live in the scale of your song's key."
      ),
      createAnswerFirstSection(
        "Substitutions and Why They Work",
        "Once you know which notes each chord type contains, substitution becomes simple. Replace a Major chord with Maj7 to add jazzy colour. Swap a Major for a Sus2 or Sus4 to add tension that resolves. Swap any chord for its relative minor (or vice versa) for a moodier feel. Power chords (just root and 5th) are interchangeable with both major and minor chords, which is why rock guitarists default to them when they want to ride between feels.",
        "Common pop substitutions worth memorising: I-V-vi-IV (the four chords in everything from Let It Be to Don't Stop Believin') sounds different if you swap the IV for a IVmaj7 or the V for a Vsus4 resolving to V. Try the same progression in C with and without these tweaks and the difference is obvious. The [music theory reference](/music-theory) explains the Roman numeral system and the rules of substitution in more depth."
      ),
      createAnswerFirstSection(
        "The Tip Field on Each Chord",
        "Each chord type has a one-line tip describing its emotional character. Bright, dark, jazzy, bluesy, mysterious, dreamy, soulful. These descriptions are not arbitrary; they come from how the intervals within the chord interact with the human ear. A Major chord has a clean 3rd-5th relationship (a perfect fifth) which the brain hears as resolved. A Diminished chord has two stacked minor 3rds, which sounds unstable.",
        "Use the tips when you are writing or arranging. If a section feels too cheerful for the lyric, swap a Major chord for a Minor or a Sus4. If a song feels static, drop a Maj7 in to add forward motion. If a chorus feels flat, an Aug chord in the lead-in to the next section pushes the listener into it. You do not need to memorise theory to use this; just read the tip and try it."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does my chord sound buzzy or muted?",
        "Two main causes. First, your fretting fingers are too far from the fret (press just behind it, not in the middle of the fret space) or are not pressing hard enough. Second, you are accidentally muting other strings with the underside of your fingers; arch your fingers more so they press straight down. Buzzy A or D barre chords usually mean your barre finger is not flat enough across the strings."
      ),
      createFAQ(
        "What is the difference between Maj7 and Min7?",
        "A Maj7 chord stacks a root, major 3rd, perfect 5th and major 7th (so C-E-G-B for Cmaj7). A Min7 stacks a root, minor 3rd, perfect 5th and minor 7th (so C-Eb-G-Bb for Cm7). The major 7th gives Maj7 its dreamy, jazzy quality; the minor 7th gives Min7 its smoother, bluesier sound. They are not interchangeable, but they both sit nicely in jazz, soul and neo-soul."
      ),
      createFAQ(
        "How do I know which voicing to play?",
        "Match the voicing to what is happening around it. If you are strumming alone, an open voicing rings out and fills the space. If you are in a band with a bass player, mid-neck barre voicings cut through better and avoid clashing with the bass. If you are playing a fingerstyle pattern, pick a voicing that puts the bass note on the lowest string you are picking. Try several and trust your ear."
      ),
      createFAQ(
        "Can I use these chord shapes for ukulele or bass?",
        "No. Ukulele and bass have different tunings and string counts, so the shapes are not transferable. The library here is specifically for standard-tuned 6-string guitar. For ukulele, look at our [ukulele tuner](/ukulele-tuner) and dedicated ukulele chord references."
      ),
      createFAQ(
        "What is the difference between a Sus2 and a Sus4?",
        "Sus2 replaces the 3rd of a chord with the 2nd note of the scale (so Csus2 is C-D-G). Sus4 replaces the 3rd with the 4th (so Csus4 is C-F-G). Both feel unresolved because the 3rd is missing. Sus4 typically sounds tense and wants to fall to the major chord (the 4 wants to drop to 3). Sus2 sounds open and floating without strong direction. Both are common in 80s pop, indie and folk."
      ),
    ],
    relatedTools: [
      { slug: "scale-finder", label: "Scale Finder" },
      { slug: "music-theory", label: "Music Theory Reference" },
      { slug: "guitar-tuner", label: "Guitar Tuner" },
    ],
  },

  "music-theory": {
    sections: [
      createAnswerFirstSection(
        "What the Circle of Fifths Actually Tells You",
        "The circle of fifths arranges the 12 keys in a ring, each one a perfect fifth (7 semitones) above the last. C at the top, G to the right, D below G, then A, E, B, F#, and round through the flats. Each step clockwise adds one sharp to the key signature. Each step anticlockwise adds one flat. So G has 1 sharp (F#), D has 2 sharps (F#, C#), A has 3 (F#, C#, G#), and so on.",
        "Why this matters in practice: keys that are next to each other on the circle sound related, so a song in C Major can naturally move to G Major or F Major without sounding jarring. Keys on opposite sides of the circle (C and F#, for example) sound distant and feel like a hard left turn. When you are writing a bridge or a key change, the circle tells you which target keys will sound smooth. Most pop key changes go up by a semitone or up a 4th; both are easy because you are travelling one or two steps round the circle."
      ),
      createAnswerFirstSection(
        "Major vs Minor Keys (and Their Cousins)",
        "Every major key has a relative minor that uses exactly the same notes; you just start the scale from a different place. C Major and A Minor share the same 7 notes (C, D, E, F, G, A, B); the difference is which note feels like home. Start a melody on C and resolve to C and the song feels major. Start on A and resolve to A and the same notes feel minor. This is why pop songs often shift between, say, C and Am verse-to-chorus without a key change.",
        "The reference also covers the modes (Dorian, Phrygian, Lydian, Mixolydian, Locrian) which are essentially the major scale started from each of its other 6 notes. Mixolydian (the 5th mode) gives you the dominant-7 sound used in blues and funk. Dorian (the 2nd mode) gives you the cool, jazzy minor used in songs like So What or Scarborough Fair. The [scale finder](/scale-finder) lets you hear each mode and see it on a guitar fretboard so the abstract names connect to real shapes."
      ),
      createAnswerFirstSection(
        "Intervals: The Building Blocks of Everything",
        "An interval is the distance between two notes, measured in semitones. The reference lists all 13 intervals from unison (0 semitones) to octave (12). A perfect 5th (7 semitones) is the most consonant interval after unison and octave, which is why it is the foundation of every power chord and the structural skeleton of Western harmony. A tritone (6 semitones) is the most dissonant; it was historically called the 'devil's interval' because it sounds so unstable.",
        "You can hear interval characters in songs you already know. The first two notes of Twinkle Twinkle are a perfect 5th (C to G). Somewhere Over the Rainbow opens with an octave leap. The Star Wars theme starts with a perfect 5th (C to G in the original key). The Simpsons theme opens with a tritone (C to F#). Once you can hear these, you can name any interval by ear, which is the foundation of relative pitch. The [chord library](/chord-library) shows the intervals inside each chord type."
      ),
      createAnswerFirstSection(
        "The Diatonic Chord Pattern Every Songwriter Should Memorise",
        "In any major key, the seven chords built from the scale follow a fixed pattern: I (Major), ii (minor), iii (minor), IV (Major), V (Major), vi (minor), vii (diminished). In C Major, that gives you C, Dm, Em, F, G, Am, Bdim. This is the menu of chords that fit naturally in C; pick from this menu and the song will sound cohesive.",
        "The Roman numerals matter because they let you write chord progressions that are key-independent. I-V-vi-IV is the 'four chord' progression that powers thousands of pop songs (Let It Be, With or Without You, Don't Stop Believin'). In C it is C-G-Am-F. In G it is G-D-Em-C. In D it is D-A-Bm-G. Once you memorise the pattern as numerals you can transpose any song to any key by reading off the right notes from the major scale of that key."
      ),
    ],
    faqs: [
      createFAQ(
        "Do I need to learn music theory to write songs?",
        "No. Plenty of great songwriters work entirely by ear. But theory shortcuts the trial and error: instead of randomly trying chords until something sounds good, you can pick from chords that you know fit the key. Think of it as a cheat sheet, not a rulebook. Every theory rule has been broken by famous songs that sound great anyway."
      ),
      createFAQ(
        "What is the difference between a key signature and a scale?",
        "A scale is the ordered set of notes (do-re-mi-fa-sol-la-ti-do). A key signature is the shorthand at the start of sheet music that tells you which notes are sharp or flat throughout the piece. They describe the same notes from different angles. The C major scale uses no sharps or flats, so C major's key signature is empty. The G major scale uses F#, so G major's key signature has one sharp."
      ),
      createFAQ(
        "Why do some songs feel sad even though they are in a major key?",
        "Several reasons. The melody might emphasise the 6th (which is the relative minor's root). The chord progression might lean on the vi chord (e.g. Am in C major). The tempo might be slow. The singer's phrasing and lyric content carry as much emotion as the harmony does. Whitney Houston's 'I Will Always Love You' is in A major but feels heartbreaking; that is delivery and arrangement, not theory."
      ),
      createFAQ(
        "What is enharmonic equivalence?",
        "Two notes that sound the same but are written differently are enharmonic equivalents. F# and Gb are the same pitch on a piano. C# and Db are the same. Why bother with two names? Because the key signature dictates which spelling makes the music readable. F#m has F#, C#, G# (sharps); Gbm would have Gb, Db, A (mixed sharps and flats), which is hard to read. Composers pick whichever spelling keeps the page tidy."
      ),
      createFAQ(
        "How long does it take to learn music theory well enough to be useful?",
        "The basics (major scale, minor scale, the 7 chord pattern, the circle of fifths, common intervals) take maybe 10 hours of focused study to truly understand and another month or two of regular practice to internalise. After that you have everything you need to read most pop, rock, folk and jazz lead sheets. Classical and advanced jazz have deeper layers, but the foundation is small."
      ),
    ],
    relatedTools: [
      { slug: "chord-library", label: "Chord Library" },
      { slug: "scale-finder", label: "Scale Finder" },
      { slug: "key-finder", label: "Key Finder" },
    ],
  },

  "scale-finder": {
    sections: [
      createAnswerFirstSection(
        "How to Pick a Scale for Your Song",
        "The scale you solo or write a melody in should match the key and feel of the backing chords. If the song is in C Major and you want a happy, resolved feel, use the C Major scale. If you want a bluesy edge over the same chords, use the C Major Pentatonic or even the C Blues scale. If the song is in C Minor and you want sad and introspective, use C Natural Minor; for an exotic, dramatic feel, try C Harmonic Minor instead.",
        "The tool shows 14 scales: Major (Ionian), Natural Minor, Pentatonic Major, Pentatonic Minor, Blues, Harmonic Minor, Melodic Minor, the four common modes (Dorian, Mixolydian, Phrygian, Lydian, Locrian), Whole Tone and Chromatic. Each scale shows which notes are in it, the formula in whole steps and half steps (W = whole step, H = half step, 1.5 = step and a half), and the chords that come from that scale."
      ),
      createAnswerFirstSection(
        "Pentatonic vs Diatonic - When to Use Which",
        "Pentatonic scales have 5 notes; diatonic scales (major and minor) have 7. The pentatonic scales remove the two notes that can clash with the underlying chords (the 4th and 7th in major; the 2nd and 6th in minor). This makes pentatonic almost foolproof: any note you play over a backing track will sound good. That is why beginner blues and rock soloists are taught the minor pentatonic first; you can shred badly and still sound musical.",
        "Diatonic scales sound richer and more varied but require more thought. The 4th and 7th create tension that you need to resolve quickly to a stable note (1, 3 or 5). Most professional soloists weave between pentatonic and diatonic; pentatonic for the safe, repeated motifs, diatonic for the moments where the melody pushes against the harmony. The [chord library](/chord-library) shows which chord notes correspond to which scale degrees."
      ),
      createAnswerFirstSection(
        "Modes Explained Without the Jargon",
        "A mode is a major scale played from a different starting note. The C Major scale (C-D-E-F-G-A-B) becomes D Dorian if you start on D and treat D as home. It becomes E Phrygian if you start on E. Same notes, different feel, because the relationships to home note change. Dorian (start on the 2nd) feels jazzy minor. Mixolydian (start on the 5th) feels bluesy. Phrygian (start on the 3rd) feels Spanish or exotic. Lydian (start on the 4th) feels dreamy and bright.",
        "Modes are why two songs in the 'same notes' can feel completely different. The minor blues scale and the Dorian mode both have a dark colour but they hit you differently. The classic example: So What by Miles Davis sits on D Dorian for half its length, then jumps up to Eb Dorian. Same scale shape, transposed. Once your ear knows what each mode sounds like, you can pick the one that fits the mood you want without thinking about theory."
      ),
      createAnswerFirstSection(
        "Using the Fretboard View",
        "The fretboard view shows where every note of the scale sits on a standard-tuned 6-string guitar across 15 frets. The root notes are highlighted so you always know where to start patterns. Click any string to hear that note played, or hit the play button to hear the whole scale ascend and descend. The display mode toggle switches between note names (C, D, E) and interval numbers (1, 2, 3) so you can train your eye to see relationships rather than just memorise positions.",
        "The smart way to use this is to learn one position at a time. The minor pentatonic 'box 1' shape (root on the 6th string) covers about 4 frets and is the foundation of 90% of rock and blues lead playing. Master that single shape in every key by sliding it up and down the neck. Then learn box 2, which sits a bit higher up. After 5 boxes you have the entire neck mapped. The [music theory reference](/music-theory) puts these shapes into the wider context of keys and modes."
      ),
    ],
    faqs: [
      createFAQ(
        "What scale should I use over a 12-bar blues in E?",
        "E Minor Pentatonic for the safe, classic blues sound. E Blues scale (which adds the b5 'blue note') for more grit. E Mixolydian over the I and IV chords for a country-tinged feel. Most blues players mix all three, leaning on the minor pentatonic for the bulk and dropping in blue notes and mixolydian phrases for variety."
      ),
      createFAQ(
        "What is the difference between Harmonic Minor and Natural Minor?",
        "Natural Minor uses a flat 7 (so A Natural Minor is A-B-C-D-E-F-G). Harmonic Minor raises that 7 back to a regular 7th (A Harmonic Minor is A-B-C-D-E-F-G#). The raised 7th creates a strong pull back to the root and gives Harmonic Minor its distinctive exotic, almost Middle Eastern character. It is the standard scale used in flamenco, classical minor-key music, and a lot of metal lead playing."
      ),
      createFAQ(
        "Why does my solo sound generic?",
        "Almost always because you are running scales up and down without phrasing. Scales tell you which notes are available; melody comes from how you arrange them. Try this: play 3 notes, leave a gap, play 4 notes, leave a longer gap, play 1 note, hold it. Phrasing with breath beats running 16th notes every time. Listen to BB King; he can make 3 notes sound like a story."
      ),
      createFAQ(
        "Can I use pentatonic scales for jazz?",
        "Yes, with restraint. Pentatonic scales work over the I, ii, V and vi chords in any key, but jazz also uses chord-tone targeting and altered scales over the V chord that pure pentatonic ignores. Many jazz players use pentatonic 'cells' as a starting point and decorate them with chromatic passing tones, then switch to bebop or altered scales over the dominant chords."
      ),
      createFAQ(
        "What scale fits the Mario theme?",
        "The Super Mario Bros theme is mostly in C Major with some chromatic ornamentation, and the underground theme is built around F Minor Pentatonic. Game music often switches between major and minor scales for emotional contrast within a single piece, which is something soundtracks borrow from classical scoring."
      ),
    ],
    relatedTools: [
      { slug: "chord-library", label: "Chord Library" },
      { slug: "music-theory", label: "Music Theory Reference" },
      { slug: "key-finder", label: "Key Finder" },
    ],
  },

  "piano-chords": {
    sections: [
      createAnswerFirstSection(
        "How to Read the Piano Keyboard Diagrams",
        "Each diagram shows two octaves of a piano keyboard, starting at middle C (C4). The notes you press for the chord are highlighted; everything else stays grey. Pick a root note from the 12 available (the chromatic scale runs C, C#, D, D# and so on round to B), then choose a chord type from the menu - Major, Minor, 7, Maj7, Min7, Sus2, Sus4, Add9, Dim, Aug, Min9, 9. The intervals shown above each diagram are the formula for that chord; a Major triad is 1-3-5, a Min7 is 1-b3-5-b7, an Aug is 1-3-#5.",
        "The keyboard layout matters because piano chord shapes are physical patterns your hands learn by repetition. A C Major triad sits across three white keys (C-E-G); a D Major sits across two white keys plus a black key (D-F#-A); a B Major sits across three black keys plus a white key (B-D#-F#). Once you spot the recurring shapes, you can play any chord in any key without memorising every voicing individually."
      ),
      createAnswerFirstSection(
        "Inversions and Why You'd Use Them",
        "An inversion is the same chord with a different note on the bottom. Root position has the root at the bottom (C-E-G for C Major). First inversion moves the root to the top (E-G-C); second inversion moves the third on top of that (G-C-E). You hear all three as the same chord but they sit at different heights and pull the ear in different directions. The tool toggles between root, first, and second inversion so you can compare side by side and play whichever lies closest to the previous chord under your hand.",
        "Practical use: when moving from C Major to F Major in root position, your hand jumps a fourth, which sounds clunky in fingerpicking patterns. Use first inversion of F (A-C-F) instead and your hand barely moves. Bach, Beatles songwriters, and modern pop arrangers all use inversions to keep voice leading smooth. The [chord library](/chord-library) shows guitar versions of the same idea."
      ),
      createAnswerFirstSection(
        "The 12 Notes and Why They Repeat",
        "Western music uses 12 notes per octave: C, C#, D, D#, E, F, F#, G, G#, A, A#, B. The pattern repeats above and below; the C an octave higher has exactly twice the frequency of the one below it. A standard 88-key piano covers 7 full octaves plus a few extra notes. The reference tool starts at C4 (middle C) and shows 24 keys, which is enough to lay out any single-octave chord and most stretched two-octave voicings.",
        "The 5 black keys per octave aren't a separate scale; they're the sharps and flats. C# and Db are the same key (enharmonic equivalents); the spelling depends on which key you're in. In F# Major you write F#, in Gb Major you write Gb, but it's the same physical black key both times. The display defaults to sharps but the tool labels enharmonic notes correctly when you switch root."
      ),
    ],
    faqs: [
      createFAQ(
        "Why do some chords sound different to others with the same name?",
        "Voicing changes the colour. A C Major played as C-E-G in middle range sounds bright and stable; the same chord voiced as G-C-E (second inversion) up an octave sounds airy and unresolved; spread C-G-E across two octaves sounds cinematic. Same notes, different feel. Try the inversion toggle on each chord to hear the shift."
      ),
      createFAQ(
        "Can I use this for left-hand bass too?",
        "The diagrams show the chord notes only, so you'd need to add a left-hand bass note manually - usually the root, sometimes the fifth for a fuller sound. Solo piano players often play the root with the left hand and the chord shape with the right; in a band setting the bassist covers the root and the pianist plays a higher voicing on top."
      ),
      createFAQ(
        "What's the difference between a Sus2 and an Add9?",
        "Sus2 replaces the third with the second, so Csus2 is C-D-G (no E). Add9 keeps the third and adds the second on top, so Cadd9 is C-E-G-D. Sus2 sounds open and floating because the third is missing; Add9 sounds rich and bright because both notes are there. They both appear in folk and indie pop and aren't interchangeable."
      ),
      createFAQ(
        "How do I know which chord to play when reading a song?",
        "Sheet music or chord charts will name the chord (Cmaj7, Em, F#m7, etc.). Match the name to the entry in the tool, then play the highlighted notes. Beginners can ignore the inversion choice and stick with root position; once you're comfortable, switch to whichever inversion keeps your hand closest to the previous chord."
      ),
      createFAQ(
        "Why does my chord sound muddy in the lower register?",
        "Low notes have closer overtone spacing, so chords played below middle C tend to sound thick and unclear. Move the chord up an octave or skip the lowest note and double a higher one. Most piano arrangements keep close-voiced chords above C4 and use single bass notes or wider intervals below."
      ),
    ],
    relatedTools: [
      { slug: "chord-library", label: "Chord Library" },
      { slug: "music-theory", label: "Music Theory Reference" },
      { slug: "key-finder", label: "Key Finder" },
    ],
  },

  "tap-tempo": {
    sections: [
      createAnswerFirstSection(
        "How Tap Tempo Calculates BPM",
        "Tap the button along to a song's beat and the tool measures the milliseconds between taps. After two taps you have one interval; after three taps you have two intervals which it averages; after eight taps you have seven intervals averaged together. The BPM number updates after each tap and gets steadier the longer you tap because each new interval pulls the average closer to the actual tempo. Stop tapping for 3 seconds and the tool resets so you can start again on a new song.",
        "The maths is simple: BPM = 60,000 / (average interval in milliseconds). Tap once a second and you'd see 60 BPM; tap twice a second and you'd see 120 BPM. The accuracy depends on how steadily you tap, which is why short bursts of 4-5 taps tend to drift while a held rhythm of 8 or more taps lands within 1-2 BPM of the true tempo."
      ),
      createAnswerFirstSection(
        "When to Use a Tap Tempo (and When Not To)",
        "DJs use it to find the BPM of an unlabelled track before mixing - if you can hum or click along, you can read the BPM in 4 seconds. Producers use it to set up a click track that matches a reference song before recording over it. Drummers use it as a portable metronome substitute when learning a song; tap along to the studio recording, get the BPM, then practice to that exact tempo with a regular metronome. Songwriters use it to log the tempo of a riff or vocal phrase before the idea slips away.",
        "Where it falls short: songs with rubato (deliberately fluctuating tempo - lots of singer-songwriter ballads, classical music, jazz ballads) don't have a single BPM, so the tool will just average through the variation. Songs with sudden tempo changes need a re-tap at each new section. For checking if your own tempo is steady, a [metronome](/metronome) running alongside is a better feedback loop than tap tempo because it tells you whether you're rushing or dragging in real time."
      ),
      createAnswerFirstSection(
        "Common BPM Ranges by Genre",
        "Ballads usually sit between 60 and 80 BPM. Classic rock and pop run 110 to 130. Disco and house cluster around 118-128. Hip hop is broad: trap beats around 70 BPM (which feels like 140 if you count double-time), classic boom-bap around 90, dance-leaning hip hop around 100. Drum and bass and jungle live in the 160-180 zone. The fastest mainstream genres - speed metal, hardcore - push past 200. Songs you'd describe as 'medium tempo' almost always come in between 100 and 130."
      ),
    ],
    faqs: [
      createFAQ(
        "How many taps do I need for an accurate reading?",
        "Two taps give you a rough estimate (you'll see a number, but it's based on a single interval that could be off by 10-20 BPM). Four taps tighten it considerably. Eight or more taps lands within 1-2 BPM of the true tempo for most steady-tempo music. The tool keeps a rolling average of your last 8 taps for this reason."
      ),
      createFAQ(
        "Why is my BPM reading off by exactly half or double?",
        "You're tapping on a different subdivision than the song's actual beat. If a song is 120 BPM but you're tapping on every other beat, you'll get 60 BPM. If you're tapping on every eighth note, you'll get 240. Decide whether you want the quarter-note pulse (the foot tap), the half-note pulse, or the eighth-note pulse before you start, and stick with one."
      ),
      createFAQ(
        "Does this work on mobile?",
        "Yes - the tap target is large enough for thumb taps on a phone screen and the timing precision is still well within the 1-2 BPM range that matters in practice. Tap with one finger and don't try to use two thumbs alternating, since the brain can't perfectly sync a left-right alternation to an external rhythm."
      ),
      createFAQ(
        "What happens if I tap unevenly?",
        "The averaging smooths out small inconsistencies, but big swings in your tap timing will still show up as a number that bounces around. If the BPM display jumps by more than 5 between taps, you're tapping unevenly. Reset and try again, focusing on a steady rhythm rather than trying to nail the exact moment of each beat."
      ),
      createFAQ(
        "Can I use this for songs with tempo changes?",
        "Tap during the section you care about, hit reset, then tap again during the next section. The tool can't detect tempo changes on its own; it just measures whatever interval you give it. For songs with constant gradual tempo drift (rare in pop, common in classical), the average across many taps gives you the song's overall mean tempo, which may or may not be what you want."
      ),
    ],
    relatedTools: [
      { slug: "metronome", label: "Metronome" },
      { slug: "transpose-tool", label: "Chord Transpose Tool" },
      { slug: "guitar-tuner", label: "Guitar Tuner" },
    ],
  },

  "transpose-tool": {
    sections: [
      createAnswerFirstSection(
        "How to Transpose a Chord Progression",
        "Type or paste your chord progression (G Em C D, for example) and pick how many semitones to shift up or down. A semitone is the smallest step in Western music - one fret on a guitar, one key on a piano including the black notes. Shifting G up 2 semitones gives you A; shifting it up 7 gives you D. The tool moves every chord by the same amount, so the relationships between chords stay identical and the song still sounds like the song, just higher or lower.",
        "Why bother? The most common reasons are vocal range (the original key sits too high or low for the singer), instrument-friendliness (G, C, D, Em are all easy open guitar shapes; F#, B, F are not, so transposing makes a song easier to play), and matching another instrument (a horn player asking for it in Bb, a recorder player who needs it in C). Choose your target key by picking a number of semitones, or just type a target key letter and the tool works out the semitone shift for you."
      ),
      createAnswerFirstSection(
        "Capo Suggestions for Easier Shapes",
        "On guitar, a capo clamps all the strings at a chosen fret, effectively raising the pitch of every chord shape you play. This means you can keep playing the easy open shapes (G, C, D, Em, Am) but have them sound higher. The tool calculates which capo position would let you play the simplest shape combinations to match your target key, and shows the original chords next to the capo'd shapes. If a song is in F (which has no clean open shapes), capo on fret 1 and play E shapes, or capo on fret 5 and play C shapes; both come out in F.",
        "Capo trade-offs are worth knowing. Higher capo positions raise the chords' brightness but shorten the scale length, which can make fingerpicking feel cramped above fret 7. Some shapes work better at certain frets: capo 2 with G shapes is bright and rings well; capo 5 with C shapes is warmer and more parlour-style. The [chord library](/chord-library) shows all the open shapes referenced in the suggestions."
      ),
      createAnswerFirstSection(
        "Transposing for Vocal Range",
        "Most singers have a comfortable range of about 1.5 to 2 octaves. If a song's melody peaks at a high G but your vocalist tops out at a comfortable D, you need to transpose down 4 semitones (G to D). The trick is figuring out which note is the problem: usually the chorus high note or the bridge, not the verse. Find the highest melody note, decide where you want it to sit, count the semitones between, and apply the same shift to every chord.",
        "Be aware: transposing changes the feel of the song slightly. Lower keys sound darker and more intimate; higher keys sound brighter and more excited. A folk song that lives in G can lose some of its edge in F, and a rock song in E can sound thin in G. If a transposition feels wrong even when the singer is comfortable, try a different key entirely or use a capo to keep the original guitar voicings while shifting pitch."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the difference between transposing and using a capo?",
        "Transposing changes the actual chord names you play (G becomes A). A capo lets you keep playing the same shapes but raises the pitch. Both achieve the same audible result but feel different to the player. Transposing is the right answer if you don't have a capo, are using a piano or non-fretted instrument, or want to sing in a specific key with custom voicings. Capo is the right answer if you want to keep the song's open-string ring."
      ),
      createFAQ(
        "How do I transpose if the chord has slashes (like C/G)?",
        "A slash chord names the chord first, then the bass note. C/G is C Major with G as the lowest note. Transpose both parts by the same number of semitones: shift up 2 and you get D/A. The tool currently focuses on basic triads and 7th chords; for elaborate jazz voicings you may need to handle the bass note manually."
      ),
      createFAQ(
        "Why do some keys sound easier on guitar than others?",
        "Guitar tuning (E-A-D-G-B-E) makes certain keys sit naturally with open-string drones. E, A, D, G, and their relative minors (C#m, F#m, Bm, Em) all have at least one chord that uses open strings and avoids barre chords. Keys like Bb, Eb, Ab, Db rely on barre shapes which are harder to play and don't ring as much. This is why folk and rock have so many songs in G and D and far fewer in Eb."
      ),
      createFAQ(
        "How many semitones is a perfect fifth?",
        "Seven semitones. C to G, D to A, E to B, F to C, G to D - all perfect fifths. The fifth is the most common transposition for solving range issues because it's far enough to make a real difference but close enough that the new key still feels related to the original. Up a fifth makes a song noticeably brighter; down a fifth makes it noticeably warmer."
      ),
      createFAQ(
        "Can I transpose a chord progression with sharps and flats mixed?",
        "Yes. The tool reads any combination of notes and accidentals, transposes each by the same amount, and outputs in a consistent spelling. If your input is mixed (F# in one chord, Gb in another), the output will be normalised to one spelling so you don't end up with awkward chord names that aren't in the destination key."
      ),
    ],
    relatedTools: [
      { slug: "chord-library", label: "Chord Library" },
      { slug: "key-finder", label: "Key Finder" },
      { slug: "guitar-tuner", label: "Guitar Tuner" },
    ],
  },
};
