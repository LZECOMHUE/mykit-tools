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
  }
};
