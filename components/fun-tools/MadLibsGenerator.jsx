'use client';

import { useState, useCallback, useEffect } from 'react';

const THEMES = [
  { value: 'school-day', label: 'School Day', icon: '📚' },
  { value: 'pirate-adventure', label: 'Pirate Adventure', icon: '🏴‍☠️' },
  { value: 'haunted-house', label: 'Haunted House', icon: '👻' },
  { value: 'zoo-trip', label: 'Zoo Trip', icon: '🦁' },
  { value: 'space-mission', label: 'Space Mission', icon: '🚀' },
  { value: 'fairy-tale', label: 'Fairy Tale', icon: '🧚' },
];

// Each template: blanks.length === segments.length - 1
// segments[0], blank[0], segments[1], blank[1], ..., blank[n-1], segments[n]
const TEMPLATES = {
  'school-day': {
    title: 'The Worst School Day Ever',
    blanks: [
      { id: 0, type: 'adjective', hint: 'Adjective' },
      { id: 1, type: 'name', hint: 'A Name' },
      { id: 2, type: 'plural-noun', hint: 'Plural Noun' },
      { id: 3, type: 'verb-ing', hint: 'Verb ending in -ing' },
      { id: 4, type: 'number', hint: 'Number' },
      { id: 5, type: 'adjective', hint: 'Adjective' },
      { id: 6, type: 'noun', hint: 'Noun' },
      { id: 7, type: 'exclamation', hint: 'Exclamation' },
      { id: 8, type: 'animal', hint: 'Animal' },
      { id: 9, type: 'verb', hint: 'Verb (past tense)' },
      { id: 10, type: 'place', hint: 'A Place' },
      { id: 11, type: 'adjective', hint: 'Adjective' },
    ],
    // 13 segments for 12 blanks
    segments: [
      'It was a ',
      ' morning when ',
      ' arrived at school carrying a bag full of ',
      '. Instead of ',
      ' their homework, they had spent ',
      ' hours building a ',
      ' ',
      '. "',
      '!" they shouted as a ',
      ' ',
      ' out of their locker and ran all the way to ',
      '. The teacher said it was the most ',
      ' day she had ever seen.',
    ],
  },
  'pirate-adventure': {
    title: 'The Legendary Pirate Voyage',
    blanks: [
      { id: 0, type: 'adjective', hint: 'Adjective' },
      { id: 1, type: 'name', hint: 'A Name' },
      { id: 2, type: 'noun', hint: 'Noun' },
      { id: 3, type: 'adjective', hint: 'Adjective' },
      { id: 4, type: 'plural-noun', hint: 'Plural Noun' },
      { id: 5, type: 'number', hint: 'Number' },
      { id: 6, type: 'verb', hint: 'Verb (past tense)' },
      { id: 7, type: 'body-part', hint: 'Body Part' },
      { id: 8, type: 'exclamation', hint: 'Exclamation' },
      { id: 9, type: 'adjective', hint: 'Adjective' },
      { id: 10, type: 'noun', hint: 'Noun' },
      { id: 11, type: 'adverb', hint: 'Adverb' },
    ],
    // 13 segments for 12 blanks
    segments: [
      'The ',
      ' pirate Captain ',
      ' sailed the seas on a ship made entirely of old ',
      '. The crew was a ',
      ' bunch of ',
      ' who had been sailing for ',
      ' days without sleep. When they finally ',
      ' land, the captain touched their ',
      ' and whispered "',
      '!". They had found a ',
      ' island with nothing on it but a single golden ',
      '. They celebrated ',
      ' for the rest of their lives.',
    ],
  },
  'haunted-house': {
    title: 'A Night in the Spooky Mansion',
    blanks: [
      { id: 0, type: 'adjective', hint: 'Adjective' },
      { id: 1, type: 'name', hint: 'A Name' },
      { id: 2, type: 'plural-noun', hint: 'Plural Noun' },
      { id: 3, type: 'verb-ing', hint: 'Verb ending in -ing' },
      { id: 4, type: 'body-part', hint: 'Body Part' },
      { id: 5, type: 'adjective', hint: 'Adjective' },
      { id: 6, type: 'noun', hint: 'Noun' },
      { id: 7, type: 'exclamation', hint: 'Exclamation' },
      { id: 8, type: 'number', hint: 'Number' },
      { id: 9, type: 'verb', hint: 'Verb (past tense)' },
      { id: 10, type: 'adverb', hint: 'Adverb' },
      { id: 11, type: 'adjective', hint: 'Adjective' },
    ],
    // 13 segments for 12 blanks
    segments: [
      'On a dark and ',
      ' night, ',
      ' dared to enter the old mansion, famous for its floating ',
      ' and the mysterious sound of ',
      ' in the walls. They reached out their ',
      ' and felt something ',
      ' - a glowing ',
      '! "',
      '!" they screamed, running up ',
      ' flights of stairs until they ',
      ' out the window and landed ',
      ' in the garden, covered in ',
      ' slime.',
    ],
  },
  'zoo-trip': {
    title: 'The Most Chaotic Zoo Visit',
    blanks: [
      { id: 0, type: 'adjective', hint: 'Adjective' },
      { id: 1, type: 'name', hint: 'A Name' },
      { id: 2, type: 'animal', hint: 'Animal' },
      { id: 3, type: 'verb-ing', hint: 'Verb ending in -ing' },
      { id: 4, type: 'plural-noun', hint: 'Plural Noun' },
      { id: 5, type: 'exclamation', hint: 'Exclamation' },
      { id: 6, type: 'number', hint: 'Number' },
      { id: 7, type: 'adjective', hint: 'Adjective' },
      { id: 8, type: 'verb', hint: 'Verb (past tense)' },
      { id: 9, type: 'body-part', hint: 'Body Part' },
      { id: 10, type: 'adverb', hint: 'Adverb' },
      { id: 11, type: 'noun', hint: 'Noun' },
    ],
    // 13 segments for 12 blanks
    segments: [
      'It was meant to be a ',
      ' day out when ',
      ' accidentally fed their packed lunch to the biggest ',
      ' in the zoo. The animal immediately started ',
      ' all over the enclosure, knocking over ',
      ' in the process. "',
      '!" screamed the zookeeper, sprinting towards them on their ',
      ' legs. The ',
      ' animal then ',
      ' the keeper right on the ',
      ' before ',
      ' vanishing into a giant stuffed ',
      '.',
    ],
  },
  'space-mission': {
    title: 'Mission to the Unknown Planet',
    blanks: [
      { id: 0, type: 'adjective', hint: 'Adjective' },
      { id: 1, type: 'name', hint: 'A Name' },
      { id: 2, type: 'noun', hint: 'Noun' },
      { id: 3, type: 'adjective', hint: 'Adjective' },
      { id: 4, type: 'animal', hint: 'Animal' },
      { id: 5, type: 'plural-noun', hint: 'Plural Noun' },
      { id: 6, type: 'exclamation', hint: 'Exclamation' },
      { id: 7, type: 'number', hint: 'Number' },
      { id: 8, type: 'adjective', hint: 'Adjective' },
      { id: 9, type: 'body-part', hint: 'Body Part' },
      { id: 10, type: 'adverb', hint: 'Adverb' },
      { id: 11, type: 'verb', hint: 'Verb (past tense)' },
    ],
    // 13 segments for 12 blanks
    segments: [
      'Astronaut ',
      ' blasted off in their ',
      '-powered rocket into the ',
      ' galaxy. After ',
      ' days with only a ',
      ' for company, they landed on a planet made of ',
      '. "',
      '!" they radioed back to Earth. The aliens wore ',
      ' hats made from their own ',
      ' and communicated ',
      ' by ',
      ' their antennae. It was the strangest first contact in history.',
    ],
  },
  'fairy-tale': {
    title: 'The Strangest Kingdom in the Land',
    blanks: [
      { id: 0, type: 'adjective', hint: 'Adjective' },
      { id: 1, type: 'name', hint: 'A Name' },
      { id: 2, type: 'noun', hint: 'Noun' },
      { id: 3, type: 'adjective', hint: 'Adjective' },
      { id: 4, type: 'animal', hint: 'Animal' },
      { id: 5, type: 'plural-noun', hint: 'Plural Noun' },
      { id: 6, type: 'verb-ing', hint: 'Verb ending in -ing' },
      { id: 7, type: 'exclamation', hint: 'Exclamation' },
      { id: 8, type: 'number', hint: 'Number' },
      { id: 9, type: 'adjective', hint: 'Adjective' },
      { id: 10, type: 'verb', hint: 'Verb (past tense)' },
      { id: 11, type: 'adverb', hint: 'Adverb' },
    ],
    // 13 segments for 12 blanks
    segments: [
      'Once upon a time in a ',
      ' kingdom, a brave hero named ',
      ' set off to find the legendary ',
      ' of Doom. They rode a ',
      ' ',
      ' through forests full of magical ',
      ' that kept ',
      ' at passing travellers. "',
      '!" the hero cried as they crossed ',
      ' enchanted bridges. The evil wizard was so ',
      ' that he ',
      ' his own hat ',
      ' in front of the entire royal court, and the kingdom laughed happily ever after.',
    ],
  },
};

// Word bank - suggestions per word type for the auto-fill dice button
const WORD_BANK = {
  adjective: [
    'squishy', 'sparkly', 'grumpy', 'enormous', 'wobbly', 'invisible', 'fluffy', 'smelly',
    'ridiculous', 'tiny', 'magnificent', 'slimy', 'crunchy', 'bouncy', 'suspicious', 'glittery',
    'gigantic', 'prickly', 'moody', 'dazzling', 'cheeky', 'fabulous', 'curious', 'lumpy',
  ],
  noun: [
    'sandwich', 'potato', 'umbrella', 'spaceship', 'dragon', 'skateboard', 'toothbrush', 'pickle',
    'teapot', 'banana', 'robot', 'mustache', 'unicorn', 'treehouse', 'eyeball', 'volcano',
    'bagpipe', 'cabbage', 'doorknob', 'wizard', 'pineapple', 'anvil', 'broomstick', 'waffle',
  ],
  'plural-noun': [
    'socks', 'bananas', 'penguins', 'biscuits', 'marshmallows', 'goblins', 'spaghetti noodles',
    'rubber ducks', 'baby teeth', 'yodelling gnomes', 'pancakes', 'garden gnomes', 'jellybeans',
    'librarians', 'raccoons', 'sneezes', 'toenails', 'igloos', 'dumplings', 'traffic cones',
    'emus', 'doorbells', 'pixies', 'teapots',
  ],
  verb: [
    'sneezed', 'galloped', 'moonwalked', 'burped', 'tiptoed', 'wiggled', 'cartwheeled', 'tap-danced',
    'squelched', 'bellowed', 'giggled', 'tumbled', 'pounced', 'warbled', 'slithered', 'hopped',
    'exploded', 'waddled', 'somersaulted', 'snorted', 'boogied', 'grumbled', 'clomped', 'pirouetted',
  ],
  'verb-ing': [
    'wrestling', 'yodelling', 'tickling', 'moonwalking', 'juggling', 'snoring', 'tap-dancing',
    'burping', 'gigging', 'twerking', 'sneezing', 'cartwheeling', 'squawking', 'bubbling',
    'slurping', 'clapping', 'wiggling', 'hopping', 'tumbling', 'pouncing', 'boogying',
    'pirouetting', 'hiccuping', 'stomping',
  ],
  adverb: [
    'wildly', 'suspiciously', 'clumsily', 'dramatically', 'loudly', 'gracefully', 'angrily',
    'secretly', 'awkwardly', 'gleefully', 'magnificently', 'furiously', 'bashfully', 'fabulously',
    'sneakily', 'honestly', 'hilariously', 'curiously', 'politely', 'ferociously', 'quietly',
    'boldly', 'weirdly', 'nervously',
  ],
  name: [
    'Bob', 'Priya', 'Mrs. Whiskers', 'Sir Reginald', 'Captain Nugget', 'Barbara', 'Dave',
    'Madame Tofu', 'Greg', 'Penelope', 'Mr. Beans', 'Zara', 'Baron von Pickle', 'Gary',
    'Lady Cabbage', 'Kevin', 'The Doctor', 'Moonbeam', 'Nigel', 'Stella', 'Chuck', 'Ethel',
    'Professor Sock', 'Tim',
  ],
  number: [
    '7', '42', '99', '13', '500', '1,000,000', 'eleventy-seven', '3', '27', '88', '404', '19',
    'a million and one', '4.5', 'zero', '101', '256', '69', 'a dozen', '72', '3.14', '66',
    'negative five', '21',
  ],
  'body-part': [
    'elbow', 'left nostril', 'big toe', 'kneecap', 'earlobe', 'bellybutton', 'pinky finger',
    'eyebrow', 'armpit', 'chin', 'ankle', 'heel', 'scalp', 'shoulder blade', 'knuckle',
    'cheek', 'tongue', 'wrist', 'thumb', 'forehead', 'eyelash', 'collarbone',
  ],
  animal: [
    'platypus', 'sloth', 'flamingo', 'hedgehog', 'capybara', 'llama', 'ferret', 'chinchilla',
    'walrus', 'armadillo', 'penguin', 'manatee', 'octopus', 'giraffe', 'kangaroo', 'meerkat',
    'tapir', 'narwhal', 'alpaca', 'axolotl', 'quokka', 'iguana', 'wombat', 'lemur',
  ],
  exclamation: [
    'Holy guacamole', 'Cowabunga', 'Jumping jellybeans', 'Great Scott', 'Yikes', 'Bazinga',
    'Crickey', 'Oh my gizzard', 'Fiddlesticks', 'Hot diggity', 'By Jove', 'Good gravy',
    'Sweet pancakes', 'Heavens to Betsy', 'Well I never', 'Blimey', 'Zoinks', 'Holy moly',
    'Sufferin\' succotash', 'Great googly moogly',
  ],
  place: [
    'the moon', 'Pizza Hut', 'Grandma\'s attic', 'Timbuktu', 'the bathroom', 'a parallel universe',
    'the supermarket', 'Atlantis', 'a volcano', 'Narnia', 'the laundry room', 'the North Pole',
    'Costa Coffee', 'a bouncy castle', 'the dentist\'s waiting room', 'Buckingham Palace',
    'a tree house', 'the Bermuda Triangle', 'IKEA', 'a mysterious cave',
  ],
};

// Colour coding by word type
const TYPE_COLOURS = {
  adjective: 'text-[#7c3aed]',
  noun: 'text-[#dc2626]',
  'plural-noun': 'text-[#dc2626]',
  verb: 'text-[#0891b2]',
  'verb-ing': 'text-[#0891b2]',
  adverb: 'text-[#059669]',
  name: 'text-[#d97706]',
  number: 'text-[#be185d]',
  'body-part': 'text-[#7c3aed]',
  animal: 'text-[#65a30d]',
  exclamation: 'text-[#dc2626]',
  place: 'text-[#0891b2]',
};

export default function MadLibsGenerator() {
  const [theme, setTheme] = useState('school-day');
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const template = TEMPLATES[theme];
  const filledCount = template.blanks.filter((b) => answers[`${theme}-${b.id}`]?.trim()).length;
  const totalBlanks = template.blanks.length;
  const allFilled = filledCount === totalBlanks;

  // Reset reveal when theme changes
  useEffect(() => {
    setRevealed(false);
  }, [theme]);

  const handleAnswerChange = useCallback((key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setRevealed(false);
  }, []);

  const handleAutoFill = useCallback((key, type, currentValue) => {
    const bank = WORD_BANK[type] || [];
    if (bank.length === 0) return;
    // Pick a random word, avoiding the current value if possible
    let pick = bank[Math.floor(Math.random() * bank.length)];
    if (pick === currentValue && bank.length > 1) {
      pick = bank[(bank.indexOf(pick) + 1) % bank.length];
    }
    setAnswers((prev) => ({ ...prev, [key]: pick }));
    setRevealed(false);
  }, []);

  const handleAutoFillAll = useCallback(() => {
    const updates = {};
    template.blanks.forEach((b) => {
      const key = `${theme}-${b.id}`;
      // Only fill empty blanks
      if (!answers[key]?.trim()) {
        const bank = WORD_BANK[b.type] || [];
        if (bank.length > 0) {
          updates[key] = bank[Math.floor(Math.random() * bank.length)];
        }
      }
    });
    if (Object.keys(updates).length > 0) {
      setAnswers((prev) => ({ ...prev, ...updates }));
      setRevealed(false);
    }
  }, [theme, template.blanks, answers]);

  const handleReveal = useCallback(() => {
    if (allFilled) setRevealed(true);
  }, [allFilled]);

  const handleNewRound = useCallback(() => {
    setAnswers((prev) => {
      const next = { ...prev };
      template.blanks.forEach((b) => delete next[`${theme}-${b.id}`]);
      return next;
    });
    setRevealed(false);
  }, [theme, template.blanks]);

  const buildStoryText = useCallback(() => {
    let text = template.title + '\n\n';
    template.segments.forEach((seg, i) => {
      text += seg;
      if (i < template.blanks.length) {
        const key = `${theme}-${template.blanks[i].id}`;
        text += answers[key] || `[${template.blanks[i].hint}]`;
      }
    });
    return text;
  }, [theme, template, answers]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildStoryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [buildStoryText]);

  const renderStory = (inRevealed) =>
    template.segments.map((seg, i) => {
      const blank = template.blanks[i];
      const key = blank ? `${theme}-${blank.id}` : null;
      const val = key ? answers[key] : null;
      return (
        <span key={i}>
          {seg}
          {blank && (
            val?.trim() ? (
              <span className={`font-bold ${TYPE_COLOURS[blank.type] || 'text-accent'}`}>
                {val}
              </span>
            ) : !inRevealed ? (
              <span className="italic text-text-muted underline decoration-dotted">{blank.hint}</span>
            ) : null
          )}
        </span>
      );
    });

  return (
    <div className="space-y-4">
      {/* Theme pills */}
      <div className="flex flex-wrap gap-1.5">
        {THEMES.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              theme === t.value
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-border rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-accent h-1.5 rounded-full transition-all duration-300"
            style={{ width: totalBlanks > 0 ? `${(filledCount / totalBlanks) * 100}%` : '0%' }}
          />
        </div>
        <span className="text-xs font-mono text-text-muted shrink-0">{filledCount}/{totalBlanks} filled</span>
      </div>

      {/* Blanks input form */}
      {!revealed && (
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs font-medium text-text-secondary mb-3 uppercase tracking-wider">Fill in the blanks - no peeking at the story!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {template.blanks.map((blank) => {
              const key = `${theme}-${blank.id}`;
              return (
                <div key={key}>
                  <label className="text-xs block mb-1">
                    <span className={`font-semibold ${TYPE_COLOURS[blank.type] || 'text-accent'}`}>
                      {blank.hint}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={answers[key] || ''}
                      onChange={(e) => handleAnswerChange(key, e.target.value)}
                      placeholder={`Any ${blank.hint.toLowerCase()}...`}
                      className="w-full pl-3 pr-10 py-2 border border-border rounded-lg bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleAutoFill(key, blank.type, answers[key])}
                      aria-label={`Auto-fill a random ${blank.hint.toLowerCase()}`}
                      title="Pick one for me"
                      className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center hover:bg-accent/10 active:scale-90 transition-all text-base"
                    >
                      🎲
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={handleReveal}
              disabled={!allFilled}
              className={`flex-1 min-w-0 py-3 rounded-lg font-medium text-sm transition-colors ${
                allFilled
                  ? 'bg-accent hover:bg-accent-hover text-white'
                  : 'bg-border text-text-muted cursor-not-allowed'
              }`}
            >
              {allFilled
                ? 'Reveal Story!'
                : `Fill ${totalBlanks - filledCount} more blank${totalBlanks - filledCount !== 1 ? 's' : ''} to reveal`}
            </button>
            {filledCount < totalBlanks && (
              <button
                onClick={handleAutoFillAll}
                className="px-4 py-3 rounded-lg bg-white border border-border text-text-secondary hover:border-accent/30 hover:text-accent text-sm font-medium transition-colors"
                title="Fill all empty blanks with random words"
              >
                🎲 Surprise me
              </button>
            )}
            <button
              onClick={handleNewRound}
              className="px-4 py-3 rounded-lg bg-white border border-border text-text-secondary hover:border-accent/30 hover:text-accent text-sm font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Live preview while filling (only shown once at least one blank is filled) */}
      {!revealed && filledCount > 0 && (
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Preview</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {renderStory(false)}
          </p>
        </div>
      )}

      {/* Revealed story */}
      {revealed && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Your Story</p>
              <p className="font-heading text-xl font-bold text-white">{template.title}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
              <button
                onClick={() => setRevealed(false)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="px-5 py-4">
            <p className="text-base text-text-primary leading-relaxed">
              {renderStory(true)}
            </p>
          </div>
          <div className="border-t border-border px-5 py-3">
            <button
              onClick={handleNewRound}
              className="w-full py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors"
            >
              New Round
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
