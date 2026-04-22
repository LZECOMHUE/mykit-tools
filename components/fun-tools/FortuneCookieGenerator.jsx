'use client';

import { useState, useCallback, useEffect } from 'react';

const CHINESE_WORDS = [
  { word: '福', pinyin: 'fú', meaning: 'Fortune / Good luck' },
  { word: '喜', pinyin: 'xǐ', meaning: 'Joy / Happiness' },
  { word: '爱', pinyin: 'ài', meaning: 'Love' },
  { word: '和', pinyin: 'hé', meaning: 'Harmony / Peace' },
  { word: '智', pinyin: 'zhì', meaning: 'Wisdom' },
  { word: '勇', pinyin: 'yǒng', meaning: 'Courage / Bravery' },
  { word: '财', pinyin: 'cái', meaning: 'Wealth / Prosperity' },
  { word: '缘', pinyin: 'yuán', meaning: 'Fate / Destiny' },
  { word: '信', pinyin: 'xìn', meaning: 'Trust / Faithfulness' },
  { word: '德', pinyin: 'dé', meaning: 'Virtue / Morality' },
  { word: '健', pinyin: 'jiàn', meaning: 'Health' },
  { word: '寿', pinyin: 'shòu', meaning: 'Longevity' },
];

const FORTUNES = {
  funny: [
    'A closed mouth gathers no feet.',
    'You will find great fortune - in the next cookie.',
    'Help! I am trapped in a fortune cookie factory.',
    'Today is a good day to wear clean socks.',
    'Your lucky number is 404. Fortune not found.',
    'You will soon be hungry again. (Accurate, right?)',
    'That wasn\'t chicken.',
    'The fortune you deserve is in another cookie.',
    'You have ketchup on your shirt. Check now.',
    'Someone thinks about you. It is your cat, judging you.',
    'Ignore previous fortune. This one is definitely correct.',
    'Opportunity knocks. But so does your neighbour. It\'s the neighbour.',
    'A surprise is coming. Spoiler: it\'s this cookie.',
    'You cannot fail this week. The week has already failed you.',
    'The best things in life are free. Everything else is very expensive.',
    'Good things come to those who wait. You have been waiting long enough.',
  ],
  wise: [
    'The journey of a thousand miles begins with a single step.',
    'A river cuts through rock not because of force, but persistence.',
    'Be not afraid of growing slowly. Be afraid only of standing still.',
    'The best time to plant a tree was twenty years ago. The second best time is now.',
    'He who knows others is wise. He who knows himself is enlightened.',
    'Silence is a true friend who never betrays.',
    'The gem cannot be polished without friction, nor the person without trials.',
    'When the wind of change blows, some build walls and others build windmills.',
    'A fool sees not the same tree as a wise person sees.',
    'Do not fear failure. Fear being in the same place next year.',
    'Every master was once a disaster.',
    'What you think, you become. What you feel, you attract.',
    'The obstacle in the path becomes the path.',
    'Learn from yesterday, live for today, hope for tomorrow.',
    'You are never too old to set another goal or dream a new dream.',
    'Your strength comes not from what you can do, but from overcoming what you thought you could not.',
  ],
  love: [
    'The heart has reasons that reason cannot know.',
    'Where there is love, there is life.',
    'The best thing to hold onto in life is each other.',
    'Love is not about finding the right person, but becoming the right person.',
    'To love and be loved is to feel the sun from both sides.',
    'The greatest happiness you can have is knowing that you do not necessarily need happiness.',
    'A loving heart is the truest wisdom.',
    'Love is the only force capable of transforming an enemy into a friend.',
    'Fall in love with someone who makes you want to be a better person.',
    'The best relationship is one where your love for each other exceeds your need for each other.',
    'Love begins at home, and it is not how much we do but how much love we put into what we do.',
    'Your soulmate is someone whose quirks match your own.',
    'The most important thing in the world is to love and be loved.',
    'A hug is a handshake from the heart.',
    'You will find love when you stop looking for it and start becoming it.',
    'The right person will make you feel at home anywhere.',
  ],
  career: [
    'Your present circumstances do not determine where you can go.',
    'The difference between ordinary and extraordinary is that little extra.',
    'Success is not the key to happiness. Happiness is the key to success.',
    'Choose a job you love and you will never work a day in your life.',
    'Hard work beats talent when talent does not work hard.',
    'Opportunities are usually disguised as hard work, which is why most people do not recognise them.',
    'The expert in anything was once a beginner.',
    'You do not need a reason to help people.',
    'Your big opportunity may be right where you are now.',
    'The only way to do great work is to love what you do.',
    'Success usually comes to those who are too busy to be looking for it.',
    'A goal without a plan is just a wish.',
    'Focus on progress, not perfection.',
    'Work hard in silence. Let your success be the noise.',
    'Do not watch the clock. Do what it does - keep going.',
    'Great things never come from comfort zones.',
  ],
  cryptic: [
    'The answer you seek is behind the door you have not opened.',
    'Three things cannot be hidden: the sun, the moon, and the truth.',
    'When the student is ready, the teacher will disappear.',
    'Not all who wander are lost, but you might want to check.',
    'The crow flies at midnight, but the wise owl stays home.',
    'Your future is written in water. Fortunately, water remembers.',
    'The key you need is made of time.',
    'All mirrors lie. Some are just more honest about it.',
    'The door opens inward.',
    'What you are looking for is looking for you.',
    'Beware the person who knows everything - they have stopped learning.',
    'The map is not the territory, but it helps.',
    'Time is a circle. You have been here before.',
    'The thing you fear most has already passed.',
    'Every ending contains the seed of a new beginning.',
    'The shadow knows the secret. Ask the shadow.',
  ],
};

const CATEGORIES = [
  { value: 'funny', label: 'Funny', icon: '😂' },
  { value: 'wise', label: 'Wise', icon: '🧠' },
  { value: 'love', label: 'Love', icon: '❤️' },
  { value: 'career', label: 'Career', icon: '💼' },
  { value: 'cryptic', label: 'Cryptic', icon: '🔮' },
];

function generateLuckyNumbers() {
  const nums = new Set();
  while (nums.size < 6) nums.add(Math.floor(Math.random() * 49) + 1);
  return Array.from(nums).sort((a, b) => a - b);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateResult(category) {
  return {
    fortune: pickRandom(FORTUNES[category]),
    luckyNumbers: generateLuckyNumbers(),
    chineseWord: pickRandom(CHINESE_WORDS),
  };
}

// Inline SVG: closed fortune cookie
function ClosedCookieSVG({ className }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="50" rx="52" ry="26" fill="#e8b86d" />
      <path d="M8 50 Q30 10 60 18 Q90 10 112 50" fill="#d4965a" />
      <path d="M8 50 Q30 90 60 82 Q90 90 112 50" fill="#c4813f" />
      <ellipse cx="60" cy="50" rx="52" ry="8" fill="#d4965a" />
      <line x1="8" y1="50" x2="112" y2="50" stroke="#b06030" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Inline SVG: cracked fortune cookie
function CrackedCookieSVG({ className }) {
  return (
    <svg
      viewBox="0 0 140 90"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left half */}
      <path d="M10 55 Q20 20 55 30 Q65 55 65 55 Q40 80 10 55Z" fill="#d4965a" />
      <path d="M10 55 Q25 70 65 55" fill="#c4813f" />
      {/* Right half */}
      <path d="M130 55 Q120 20 85 30 Q75 55 75 55 Q100 80 130 55Z" fill="#d4965a" />
      <path d="M130 55 Q115 70 75 55" fill="#c4813f" />
      {/* Paper strip */}
      <rect x="48" y="42" width="44" height="10" rx="2" fill="#fffbe6" stroke="#e8d5a0" strokeWidth="1" />
      <line x1="52" y1="47" x2="88" y2="47" stroke="#ccc" strokeWidth="1" />
    </svg>
  );
}

export default function FortuneCookieGenerator() {
  const [category, setCategory] = useState('wise');
  const [cracked, setCracked] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  const crack = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setCracked(false);
    setResult(null);

    setTimeout(() => {
      setCracked(true);
      setResult(generateResult(category));
      setAnimating(false);
    }, 350);
  }, [category, animating]);

  // Spacebar shortcut
  useEffect(() => {
    const onKey = (e) => {
      if (
        e.code === 'Space' &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        crack();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [crack]);

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.fortune);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleCategoryChange = (val) => {
    setCategory(val);
    setCracked(false);
    setResult(null);
  };

  return (
    <div className="space-y-4">
      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => handleCategoryChange(c.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              category === c.value
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Cookie visual + crack button */}
      <div className="bg-surface border border-border rounded-xl p-6 flex flex-col items-center gap-4">
        <button
          onClick={crack}
          disabled={animating}
          aria-label="Crack the fortune cookie"
          className={`transition-transform duration-300 ${animating ? 'scale-110' : 'hover:scale-105 active:scale-95'} cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg`}
        >
          {cracked ? (
            <CrackedCookieSVG className="w-32 h-20 drop-shadow-md" />
          ) : (
            <ClosedCookieSVG className="w-32 h-20 drop-shadow-md" />
          )}
        </button>

        <button
          onClick={crack}
          disabled={animating}
          className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors disabled:opacity-60"
        >
          {cracked ? 'Crack Another' : 'Crack Cookie'}
        </button>

        <p className="text-[10px] text-text-muted">Press spacebar to crack another</p>
      </div>

      {/* Fortune result */}
      {result && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* Fortune text - dark header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-5">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Your fortune</p>
            <p className="font-heading text-xl md:text-2xl font-semibold text-white leading-snug">
              {result.fortune}
            </p>
            <button
              onClick={handleCopy}
              className="mt-3 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              {copied ? '✓ Copied' : 'Copy fortune'}
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-px bg-border">
            {/* Lucky numbers */}
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Lucky numbers</p>
              <div className="flex flex-wrap gap-1.5">
                {result.luckyNumbers.map((n) => (
                  <span
                    key={n}
                    className="font-mono text-sm font-bold text-accent bg-accent/5 rounded-full w-7 h-7 flex items-center justify-center"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Chinese word of the day */}
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Chinese word</p>
              <p className="font-mono text-3xl font-bold text-text-primary leading-none mb-0.5">
                {result.chineseWord.word}
              </p>
              <p className="text-xs text-text-secondary">
                <span className="italic">{result.chineseWord.pinyin}</span>
                {' - '}
                {result.chineseWord.meaning}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
