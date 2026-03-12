'use client';

import { useState, useMemo } from 'react';

const costumeDatabase = {
  scary: {
    "3-12": [
      { name: "Ghost", materials: "White sheet, black marker" },
      { name: "Vampire", materials: "Black clothes, red lipstick, cape" },
      { name: "Zombie", materials: "Old clothes, face paint, fake blood" },
      { name: "Witch", materials: "Black dress, hat, broomstick, makeup" },
      { name: "Skeleton", materials: "Black outfit, white paint, black marker" },
      { name: "Mummy", materials: "Old clothes, white bandages or strips" },
      { name: "Frankenstein", materials: "Green face paint, bolts (drawn), dark clothes" },
      { name: "Dracula", materials: "Black cape, white shirt, red lipstick" },
    ],
  },
  funny: {
    "3-12": [
      { name: "Inflatable T-Rex", materials: "Inflatable dinosaur costume (or brown fabric)" },
      { name: "Dad in a Bathrobe", materials: "Bathrobe, slippers, newspaper" },
      { name: "Plant in a Pot", materials: "Cardboard box, plant leaves, green paint" },
      { name: "Pizza Slice", materials: "Brown cardboard, red/yellow fabric" },
      { name: "Where's Waldo?", materials: "Red/white striped shirt, beanie, glasses" },
      { name: "Fortune Teller", materials: "Colorful fabrics, turban, scarves" },
      { name: "Cereal Box Character", materials: "Cardboard box, markers, paint" },
      { name: "Tourist", materials: "Camera, map, loud shirt, sandals with socks" },
    ],
  },
  creative: {
    "3-12": [
      { name: "Rainbow", materials: "Colored fabric strips, white clothes" },
      { name: "Starburst", materials: "Yellow/orange felt, radiating spikes" },
      { name: "Book Character", materials: "Character-specific colored clothes, props" },
      { name: "Time Machine", materials: "Cardboard box, buttons, dials, silver paint" },
      { name: "Woodland Creature", materials: "Browns/greens, ears headband, face paint" },
      { name: "Superhero", materials: "Colored cape, shirt, mask, belt" },
      { name: "Movie Monster", materials: "Costume basics, special effects makeup" },
      { name: "Alien", materials: "Silver/neon clothes, antenna headband, face paint" },
    ],
  },
  group: {
    "3-12": [
      { name: "Rainbow Candies", materials: "Colored clothes per person" },
      { name: "Playing Cards", materials: "Cardboard, markers, different colors/suits" },
      { name: "Pac-Man Characters", materials: "Colored circles, construction paper" },
      { name: "Crayons in a Box", materials: "Each person wears different crayon color" },
      { name: "Garden Gnomes", materials: "Red/blue outfits, pointed hats, beards" },
      { name: "Candy Corn", materials: "Yellow, orange, white clothes in layers" },
      { name: "Pizza and Toppings", materials: "One pizza, others dress as toppings" },
      { name: "Household Items", materials: "Cereal box, tissue box, toilet paper roll" },
    ],
  },
};

export default function HalloweenCostumeGenerator() {
  const [style, setStyle] = useState('scary');
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [budget, setBudget] = useState('low');
  const [generated, setGenerated] = useState(null);

  const budgetLabels = {
    low: "Under £5",
    medium: "£5-15",
    high: "£15+",
  };

  const styles = [
    { value: 'scary', label: 'Scary' },
    { value: 'funny', label: 'Funny' },
    { value: 'creative', label: 'Creative' },
    { value: 'group', label: 'Group Costume' },
  ];

  const ageGroups = [
    { value: '3-5', label: 'Ages 3-5' },
    { value: '5-7', label: 'Ages 5-7' },
    { value: '7-9', label: 'Ages 7-9' },
    { value: '9-12', label: 'Ages 9-12' },
  ];

  const availableCostumes = useMemo(() => {
    const styleData = costumeDatabase[style];
    if (!styleData) return [];
    const ageKey = Object.keys(styleData).find(key => styleData[key].length > 0);
    return styleData[ageKey] || [];
  }, [style]);

  const handleGenerate = () => {
    if (availableCostumes.length > 0) {
      const random = Math.floor(Math.random() * availableCostumes.length);
      setGenerated(availableCostumes[random]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Configuration */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Costume Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map((s) => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  style === s.value
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Age Group
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ageGroups.map((ag) => (
              <button
                key={ag.value}
                onClick={() => setAgeGroup(ag.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  ageGroup === ag.value
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {ag.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Budget
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(budgetLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setBudget(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  budget === key
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors"
        >
          Generate Costume Idea
        </button>
      </div>

      {/* Results */}
      {generated && (
        <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-8 space-y-4">
          <h3 className="text-text-primary font-semibold">Your Costume Idea:</h3>
          <h2 className="text-4xl font-bold text-orange-600">{generated.name}</h2>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <p className="text-text-secondary text-sm mb-1">Materials Needed:</p>
            <p className="text-text-primary font-medium">{generated.materials}</p>
          </div>
          <button
            onClick={handleGenerate}
            className="w-full bg-white border border-orange-300 text-orange-600 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
          >
            Another Idea
          </button>
        </div>
      )}

      {/* Tips */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Costume Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ Check materials at home first to save money</li>
          <li>✓ Test makeup on a small area first</li>
          <li>✓ Ensure costume doesn't restrict movement</li>
          <li>✓ Wear comfortable shoes for trick-or-treating</li>
          <li>✓ Make the costume bright/reflective for safety</li>
          <li>✓ Have fun and be creative!</li>
        </ul>
      </div>

      {/* Budget Tips */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Budget Breakdown</h3>
        <div className="space-y-2">
          {[
            { budget: 'Under £5', tips: 'Use items from home, face paint, markers' },
            { budget: '£5-15', tips: 'Basic fabric, costume pieces, accessories' },
            { budget: '£15+', tips: 'Quality costume kits, special effects makeup' },
          ].map((b) => (
            <div key={b.budget} className="flex justify-between items-start py-2 border-b border-border last:border-b-0">
              <span className="font-medium text-text-primary">{b.budget}</span>
              <span className="text-text-secondary text-sm text-right">{b.tips}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
