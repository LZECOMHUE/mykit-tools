'use client';

import { useState } from 'react';

const pickupLines = {
  cheesy: [
    'Are you a parking ticket? Because you\'ve got FINE written all over you.',
    'Do you have a map? I just got lost in your eyes.',
    'Are you a magician? Because whenever I look at you, everyone else disappears.',
    'Is your name Google? Because you\'re everything I\'ve been searching for.',
    'Do you believe in love at first sight, or should I walk by again?',
    'If you were a vegetable, you\'d be a cute-cumber.',
    'Are you a campfire? Because you\'re hot and I want s\'more.',
    'Do you have a BandAid? Because I scraped my knee falling for you.',
    'Are you French? Because Eiffel for you.',
    'If you were a flower, you\'d be a daff-o-dil.',
  ],
  clever: [
    'I must be a snowflake, because I\'ve fallen for you.',
    'Do you have the time? Or should I just stare at you until yours stops?',
    'I\'d say you\'re the top 1% of attractive, but that would be percentile thinking.',
    'Are you a problem? Because I\'d like to solve for you.',
    'Do you believe in love at first sight, or do I need to walk by again with better lighting?',
    'If you were a vegetable, you\'d be a cute-cumber, and that\'s not even a compliment, it\'s a fact.',
    'I\'m not a photographer, but I can picture us together.',
    'Are you made of copper and tellurium? Because you\'re CuTe.',
    'Are you an angle? Because you\'re acute one.',
    'Do you have a pencil? Because I want to erase your past and write our future.',
  ],
  nerdy: [
    'Are you made of copper and tellurium? Because you\'re Cu-Te.',
    'Are you an exception? I\'d catch you.',
    'Are you a compiler? Because you raise my error levels.',
    'Do you want to see my source code?',
    'I wish I were DNA helicase so I could unwind your double helix.',
    'You must be a red blood cell, because you just took my oxygen away.',
    'Are you the Higgs boson? Because scientists have been looking for you.',
    'If you were an element, you\'d be Francium, because you\'re the most attractive.',
    'Are you a microwave oven? Because you\'re radiating.',
    'Do you have any raisins? No? Want some then?',
  ],
  food: [
    'Are you a parking ticket? Because you\'ve got FINE written all over you... like cinnamon on a donut.',
    'Are you a bowl of cereal? Because you\'re milk\'s favorite.',
    'Do you work at Starbucks? Because I like you a latte.',
    'Are you a pizza? Because I think we\'re a perfect match... with the right toppings.',
    'If you were a vegetable, you\'d be a cute-cumber, and I\'d put you in my salad.',
    'Are you a dessert menu? Because you\'re looking sweet.',
    'I must be a snowflake, because I\'ve melted for you like chocolate.',
    'Do you work at a bakery? Because you\'re a cutie pie.',
    'Are you made of honey? Because you\'re bee-autiful and I\'d never bee-leave my luck.',
    'If looks could kill, you\'d be a lethal weapon... like a spicy pepper.',
  ],
  animal: [
    'Are you a beaver? Because dam!',
    'Are you a cat? Because I\'m feline a connection.',
    'Do you have a map? Because I just got lost in your eyes like a wolf in the woods.',
    'Are you a penguin? Because you\'ve stolen the ice from my heart.',
    'If you were a penguin, you\'d be my penguin.',
    'Are you a bird? Because I\'d like to be your nest.',
    'Do you believe in love at first sight, or should I act like a squirrel and try again?',
    'Are you a monkey? Because you\'re going bananas on my heart.',
    'If you were a cat, I\'d want to be a cat too, just to be near you.',
    'Are you a butterfly? Because you make my heart flutter.',
  ],
};

export default function PickupLineGenerator() {
  const [category, setCategory] = useState('cheesy');
  const [currentLine, setCurrentLine] = useState(pickupLines.cheesy[0]);
  const [ratings, setRatings] = useState({});
  const [copied, setCopied] = useState(false);

  const generateLine = () => {
    const lines = pickupLines[category];
    const randomIndex = Math.floor(Math.random() * lines.length);
    setCurrentLine(lines[randomIndex]);
  };

  const handleRate = (value) => {
    setRatings((prev) => ({
      ...prev,
      [currentLine]: value,
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLine).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rating = ratings[currentLine];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-[var(--radius-card)]">
        <p className="text-text-secondary text-sm">
          Remember: these are for fun and entertainment! Always be respectful and genuine in real interactions.
        </p>
      </div>

      <div>
        <label className="block text-text-primary font-medium mb-2">Style</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentLine(pickupLines[e.target.value][0]);
          }}
          className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="cheesy">Cheesy</option>
          <option value="clever">Clever</option>
          <option value="nerdy">Nerdy</option>
          <option value="food">Food-Themed</option>
          <option value="animal">Animal-Themed</option>
        </select>
      </div>

      <div className="bg-surface rounded-[var(--radius-card)] min-h-32 flex items-center justify-center">
        <p className="text-xl text-text-primary font-medium text-center leading-relaxed italic">
          "{currentLine}"
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={generateLine}
          className="flex-1 px-4 py-3 bg-accent text-white font-medium rounded-[var(--radius-input)] hover:bg-blue-600 transition"
        >
          Generate Another
        </button>

        <button
          onClick={handleCopy}
          className={`flex-1 px-4 py-3 font-medium rounded-[var(--radius-input)] transition ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-white border border-border text-text-primary hover:bg-surface'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      <div className="bg-surface p-4 rounded-[var(--radius-card)]">
        <p className="text-text-secondary text-sm font-medium mb-3">How smooth is this line?</p>
        <div className="flex justify-center gap-3">
          {['😬', '🤐', '😏', '😎'].map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleRate(index + 1)}
              className={`text-3xl px-4 py-2 rounded-[var(--radius-input)] transition ${
                rating === index + 1 ? 'bg-blue-200 scale-110' : 'hover:scale-110'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        {rating && (
          <p className="text-text-secondary text-xs text-center mt-2">
            Smoothness rating: {rating}/4
          </p>
        )}
      </div>
    </div>
  );
}
