'use client';
import { useState } from 'react';

const PARTY_BAG_ITEMS = {
  '3-5': {
    'general': [
      { name: 'Colouring book mini', cost: 0.50, qty: 1 },
      { name: 'Pencils or crayons pack', cost: 0.75, qty: 1 },
      { name: 'Sticker sheet', cost: 0.40, qty: 1 },
      { name: 'Bouncy ball', cost: 0.25, qty: 1 },
      { name: 'Temporary tattoos', cost: 0.30, qty: 1 },
      { name: 'Blowing bubbles', cost: 0.40, qty: 1 },
      { name: 'Pencil topper toy', cost: 0.20, qty: 1 },
      { name: 'Mini puzzle game', cost: 0.60, qty: 1 },
      { name: 'Sweeties (lollipop)', cost: 0.25, qty: 1 },
      { name: 'Hair clip or band', cost: 0.30, qty: 1 }
    ],
    'princess': [
      { name: 'Pink colouring book', cost: 0.60, qty: 1 },
      { name: 'Princess sticker sheet', cost: 0.50, qty: 1 },
      { name: 'Tiara or crown clip', cost: 0.80, qty: 1 },
      { name: 'Sparkly pencil', cost: 0.30, qty: 1 },
      { name: 'Jewelled ring toy', cost: 0.50, qty: 1 },
      { name: 'Purple bouncy ball', cost: 0.25, qty: 1 },
      { name: 'Princess hair clip', cost: 0.40, qty: 1 },
      { name: 'Glitter temporary tattoo', cost: 0.40, qty: 1 },
      { name: 'Princess bubbles', cost: 0.50, qty: 1 },
      { name: 'Pink sweets', cost: 0.30, qty: 1 }
    ],
    'dinosaur': [
      { name: 'Dinosaur colouring book', cost: 0.60, qty: 1 },
      { name: 'Dinosaur sticker sheet', cost: 0.50, qty: 1 },
      { name: 'Small dinosaur toy', cost: 0.70, qty: 1 },
      { name: 'Dino pencil topper', cost: 0.30, qty: 1 },
      { name: 'Roar! whistle toy', cost: 0.40, qty: 1 },
      { name: 'Green bouncy ball', cost: 0.25, qty: 1 },
      { name: 'Dinosaur temporary tattoo', cost: 0.40, qty: 1 },
      { name: 'Prehistoric bubbles', cost: 0.50, qty: 1 },
      { name: 'Dino-themed pencil', cost: 0.35, qty: 1 },
      { name: 'Green or brown sweets', cost: 0.30, qty: 1 }
    ],
    'superhero': [
      { name: 'Superhero colouring book', cost: 0.60, qty: 1 },
      { name: 'Hero sticker sheet', cost: 0.50, qty: 1 },
      { name: 'Mask toy', cost: 0.60, qty: 1 },
      { name: 'Cape pencil topper', cost: 0.40, qty: 1 },
      { name: 'Power-up bouncy ball', cost: 0.25, qty: 1 },
      { name: 'Hero temporary tattoo', cost: 0.40, qty: 1 },
      { name: 'Lightning bolt whistle', cost: 0.40, qty: 1 },
      { name: 'Hero bubbles', cost: 0.50, qty: 1 },
      { name: 'Red or blue sweets', cost: 0.30, qty: 1 },
      { name: 'Comic strip stickers', cost: 0.35, qty: 1 }
    ],
    'space': [
      { name: 'Space colouring book', cost: 0.60, qty: 1 },
      { name: 'Galaxy sticker sheet', cost: 0.50, qty: 1 },
      { name: 'Mini rocket toy', cost: 0.70, qty: 1 },
      { name: 'Planet pencil topper', cost: 0.40, qty: 1 },
      { name: 'Alien bouncy ball', cost: 0.25, qty: 1 },
      { name: 'Star temporary tattoo', cost: 0.40, qty: 1 },
      { name: 'Glow-in-dark stickers', cost: 0.60, qty: 1 },
      { name: 'Spaceman bubbles', cost: 0.50, qty: 1 },
      { name: 'Black and silver sweets', cost: 0.30, qty: 1 },
      { name: 'Moon rock candy', cost: 0.40, qty: 1 }
    ],
    'animals': [
      { name: 'Animal colouring book', cost: 0.60, qty: 1 },
      { name: 'Animal sticker sheet', cost: 0.50, qty: 1 },
      { name: 'Small animal toy', cost: 0.60, qty: 1 },
      { name: 'Animal whistle', cost: 0.40, qty: 1 },
      { name: 'Animal bouncy ball', cost: 0.25, qty: 1 },
      { name: 'Paw print temporary tattoo', cost: 0.40, qty: 1 },
      { name: 'Fur-covered pencil', cost: 0.35, qty: 1 },
      { name: 'Animal bubbles', cost: 0.50, qty: 1 },
      { name: 'Zoo animal sweets', cost: 0.30, qty: 1 },
      { name: 'Jungle vine toy', cost: 0.40, qty: 1 }
    ]
  },
  '5-7': {
    'general': [
      { name: 'Mini notebook', cost: 0.70, qty: 1 },
      { name: 'Quality pencil set', cost: 0.90, qty: 1 },
      { name: 'Bookmark', cost: 0.50, qty: 1 },
      { name: 'Puzzle cube or brain teaser', cost: 0.80, qty: 1 },
      { name: 'Bouncy ball set', cost: 0.50, qty: 1 },
      { name: 'Mini card game', cost: 1.00, qty: 1 },
      { name: 'Temporary tattoo sheet', cost: 0.40, qty: 1 },
      { name: 'Blowing bubbles large', cost: 0.50, qty: 1 },
      { name: 'Hair clip or band set', cost: 0.50, qty: 1 },
      { name: 'Mixed sweets small pack', cost: 0.50, qty: 1 }
    ],
    'superhero': [
      { name: 'Comic book', cost: 1.00, qty: 1 },
      { name: 'Superhero mask', cost: 0.80, qty: 1 },
      { name: 'Action figure (small)', cost: 1.00, qty: 1 },
      { name: 'Hero trading cards pack', cost: 0.70, qty: 1 },
      { name: 'Cape or armband', cost: 0.90, qty: 1 },
      { name: 'Glow sticks', cost: 0.50, qty: 1 },
      { name: 'Hero sticker sheet', cost: 0.40, qty: 1 },
      { name: 'Superhero puzzle', cost: 0.80, qty: 1 },
      { name: 'Hero pencil set', cost: 0.70, qty: 1 },
      { name: 'Themed sweets', cost: 0.50, qty: 1 }
    ],
    'space': [
      { name: 'Space colouring book deluxe', cost: 0.80, qty: 1 },
      { name: 'Mini telescope toy', cost: 1.20, qty: 1 },
      { name: 'Planet mobile craft kit', cost: 1.00, qty: 1 },
      { name: 'Glow-in-dark stars', cost: 0.60, qty: 1 },
      { name: 'Astronaut figure', cost: 0.90, qty: 1 },
      { name: 'Space sticker sheet deluxe', cost: 0.60, qty: 1 },
      { name: 'Galaxy notebook', cost: 0.70, qty: 1 },
      { name: 'Glow sticks', cost: 0.50, qty: 1 },
      { name: 'Planet bouncy ball set', cost: 0.60, qty: 1 },
      { name: 'Space-themed sweets', cost: 0.60, qty: 1 }
    ],
    'dinosaur': [
      { name: 'Dinosaur book or comic', cost: 0.90, qty: 1 },
      { name: 'Dinosaur figure set', cost: 1.20, qty: 1 },
      { name: 'Fossil excavation kit', cost: 1.50, qty: 1 },
      { name: 'Dinosaur puzzle', cost: 0.80, qty: 1 },
      { name: 'Dino eggs (bath bombs)', cost: 0.70, qty: 1 },
      { name: 'Dinosaur sticker sheet', cost: 0.50, qty: 1 },
      { name: 'Roar mask toy', cost: 0.60, qty: 1 },
      { name: 'Dino trading cards', cost: 0.70, qty: 1 },
      { name: 'Prehistoric notebook', cost: 0.70, qty: 1 },
      { name: 'Dinosaur sweets', cost: 0.60, qty: 1 }
    ]
  }
};

export default function PartyBagChecklistGenerator() {
  const [config, setConfig] = useState({
    ageGroup: '5-7',
    budget: '£2',
    theme: 'general',
    quantity: '10'
  });

  const [checklist, setChecklist] = useState(null);

  const handleGenerate = () => {
    const budgetValue = parseFloat(config.budget.replace('£', ''));
    const ageData = PARTY_BAG_ITEMS[config.ageGroup];
    const themeItems = ageData[config.theme] || ageData['general'];
    const qtyBags = parseInt(config.quantity);

    // Select items that fit the budget
    let selectedItems = [];
    let total = 0;

    // Sort items by cost (cheapest first) to maximize value
    const sortedItems = [...themeItems].sort((a, b) => a.cost - b.cost);

    for (const item of sortedItems) {
      if (total + item.cost <= budgetValue) {
        selectedItems.push(item);
        total += item.cost;
      }
    }

    // If no items fit, just take the cheapest
    if (selectedItems.length === 0 && sortedItems.length > 0) {
      selectedItems = [sortedItems[0]];
      total = sortedItems[0].cost;
    }

    // Calculate totals
    const itemCost = total;
    const totalCost = itemCost * qtyBags;

    setChecklist({
      items: selectedItems,
      itemTotal: itemCost,
      totalCost: totalCost,
      quantity: qtyBags,
      budget: budgetValue,
      theme: config.theme
    });
  };

  const availableThemes = {
    '3-5': ['general', 'princess', 'dinosaur', 'superhero', 'space', 'animals'],
    '5-7': ['general', 'superhero', 'space', 'dinosaur']
  };

  const themes = availableThemes[config.ageGroup] || [];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Age Group</label>
          <div className="grid grid-cols-2 gap-2">
            {['3-5', '5-7'].map(age => (
              <button
                key={age}
                onClick={() => {
                  setConfig(c => ({ ...c, ageGroup: age, theme: 'general' }));
                }}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition ${
                  config.ageGroup === age
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {age} years
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Budget Per Bag</label>
          <div className="grid grid-cols-4 gap-2">
            {['£1', '£2', '£3', '£5'].map(b => (
              <button
                key={b}
                onClick={() => setConfig(c => ({ ...c, budget: b }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition ${
                  config.budget === b
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Party Theme</label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map(theme => (
              <button
                key={theme}
                onClick={() => setConfig(c => ({ ...c, theme }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize text-sm ${
                  config.theme === theme
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Number of Bags</label>
          <div className="grid grid-cols-4 gap-2">
            {['5', '10', '15', '20'].map(q => (
              <button
                key={q}
                onClick={() => setConfig(c => ({ ...c, quantity: q }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition ${
                  config.quantity === q
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
        >
          Generate Shopping List
        </button>
      </div>

      {checklist && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">Party Bag Shopping List</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-text-secondary">Items Per Bag</p>
                  <p className="font-mono font-bold text-accent text-lg">{checklist.items.length}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Cost Per Bag</p>
                  <p className="font-mono font-bold text-accent text-lg">£{checklist.itemTotal.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Total Cost</p>
                  <p className="font-mono font-bold text-accent text-lg">£{checklist.totalCost.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {checklist.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white border border-border rounded-[var(--radius-input)] p-3">
                  <div className="flex items-center gap-3 flex-1">
                    <input type="checkbox" className="w-4 h-4 cursor-pointer accent-accent" />
                    <div>
                      <p className="text-text-primary font-medium">{item.name}</p>
                      <p className="text-text-secondary text-sm">Qty per bag: {item.qty}</p>
                    </div>
                  </div>
                  <span className="font-mono text-accent font-bold">£{item.cost.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-accent-muted border border-accent rounded-[var(--radius-input)] p-4">
                <p className="text-text-secondary text-sm mb-1">Cost Per Bag</p>
                <p className="font-mono font-bold text-accent text-xl">£{checklist.itemTotal.toFixed(2)}</p>
              </div>
              <div className="bg-accent-muted border border-accent rounded-[var(--radius-input)] p-4">
                <p className="text-text-secondary text-sm mb-1">Total For {checklist.quantity} Bags</p>
                <p className="font-mono font-bold text-accent text-xl">£{checklist.totalCost.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-input)] p-4">
              <h3 className="font-heading font-semibold text-blue-900 mb-2">Shopping Tips</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>- Check Pound Shop and discount stores for best prices</li>
                <li>- Buy multi-packs to save money on small items</li>
                <li>- Add small sweets or treats to fill remaining bag space</li>
                <li>- Consider bulk online suppliers for larger quantities</li>
                <li>- Wrap items individually for extra excitement</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGenerate}
              className="bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
            >
              Generate New List
            </button>
            <button
              onClick={() => window.print()}
              className="bg-white border border-border text-text-primary py-3 rounded-[var(--radius-input)] font-medium hover:bg-surface transition"
            >
              Print List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
