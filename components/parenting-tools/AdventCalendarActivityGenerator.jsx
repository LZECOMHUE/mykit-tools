'use client';
import { useState } from 'react';

const ACTIVITIES = {
  'free': {
    crafts: [
      { name: 'Paper Chain Garland', time: '15min', materials: 'Coloured paper, scissors, glue' },
      { name: 'Hand Print Wreath', time: '20min', materials: 'Paper, paint, scissors' },
      { name: 'Snowflake Cut Outs', time: '15min', materials: 'White paper, scissors' },
      { name: 'Decorated Gift Tags', time: '20min', materials: 'Card, markers, stickers' },
      { name: 'Crayon Resist Ornaments', time: '20min', materials: 'Paper, crayons, watercolour' },
      { name: 'Folded Paper Angels', time: '15min', materials: 'Paper, markers' },
      { name: 'Jingle Bell Crafts', time: '15min', materials: 'Jingle bells, string, beads' },
      { name: 'Christmas Card Making', time: '25min', materials: 'Card, stamps, markers' }
    ],
    baking: [
      { name: 'Simple Sugar Cookies', time: '1hr', materials: 'Flour, sugar, butter, eggs, icing' },
      { name: 'Hot Chocolate', time: '10min', materials: 'Cocoa powder, milk, marshmallows' },
      { name: 'Popcorn Garland', time: '30min', materials: 'Popcorn, string, needle' },
      { name: 'Gingerbread Shapes', time: '45min', materials: 'Gingerbread, icing, sweets' }
    ],
    games: [
      { name: 'Christmas Scavenger Hunt', time: '20min', materials: 'Paper, pencil, small prizes' },
      { name: 'Christmas Charades', time: '30min', materials: 'None (use Christmas words)' },
      { name: 'Reindeer Races', time: '20min', materials: 'Open space' },
      { name: 'Carol Singing', time: '30min', materials: 'Christmas songs' }
    ],
    kindness: [
      { name: 'Make a Card for Grandma', time: '20min', materials: 'Card, markers, stickers' },
      { name: 'Help Decorate the House', time: '30min', materials: 'Decorations' },
      { name: 'Leave Treats for Neighbours', time: '25min', materials: 'Homemade treats, bags' },
      { name: 'Write Thank You Notes', time: '30min', materials: 'Paper, pens' }
    ],
    movie: [
      { name: 'Watch Elf', time: '110min', materials: 'TV, snacks' },
      { name: 'Watch Home Alone', time: '103min', materials: 'TV, snacks' },
      { name: 'Watch The Polar Express', time: '111min', materials: 'TV, snacks' },
      { name: 'Watch Frozen', time: '109min', materials: 'TV, snacks' }
    ],
    outdoor: [
      { name: 'Build a Snowman', time: '45min', materials: 'Snow, carrots, sticks' },
      { name: 'Winter Nature Walk', time: '30min', materials: 'Warm clothes' },
      { name: 'Sledding', time: '1hr', materials: 'Sledge, snow' },
      { name: 'Make Snow Angels', time: '20min', materials: 'Snow' }
    ]
  },
  'low-cost': {
    crafts: [
      { name: 'Toilet Paper Roll Decorations', time: '20min', materials: 'Toilet rolls, paint, markers, glue' },
      { name: 'Salt Dough Ornaments', time: '45min', materials: 'Salt, flour, water, paint' },
      { name: 'Newspaper Collage Advent', time: '30min', materials: 'Newspaper, glue, scissors' },
      { name: 'Holly and Ivy Garland', time: '30min', materials: 'Green paper, red paint, scissors' },
      { name: 'Bean Mosaic Decorations', time: '25min', materials: 'Card, dried beans, glue' },
      { name: 'Cinnamon Stick Bundles', time: '15min', materials: 'Cinnamon sticks, ribbon, glue' }
    ],
    baking: [
      { name: 'Cinnamon Biscuits', time: '45min', materials: 'Flour, butter, cinnamon, sugar' },
      { name: 'Shortbread', time: '1hr', materials: 'Butter, flour, sugar' },
      { name: 'Rice Krispie Treats', time: '30min', materials: 'Butter, marshmallows, cereal' },
      { name: 'Fudge', time: '20min', materials: 'Condensed milk, butter, cocoa' },
      { name: 'Homemade Granola', time: '45min', materials: 'Oats, honey, oil, dried fruit' }
    ],
    activities: [
      { name: 'Make Bird Feeders', time: '20min', materials: 'Pine cones, peanut butter, seeds' },
      { name: 'Create Advent Numbers', time: '45min', materials: 'Card, markers, scissors' },
      { name: 'Design Your Own Wrapping Paper', time: '30min', materials: 'White paper, stamps, markers' },
      { name: 'Christmas Quiz Night', time: '1hr', materials: 'Paper, pencils' },
      { name: 'Start a Christmas Journal', time: '20min', materials: 'Notebook, pens' }
    ]
  },
  'any': {
    crafts: [
      { name: 'Resin Christmas Ornaments', time: '1hr', materials: 'Resin kit, moulds, flowers' },
      { name: 'Hand Blown Glass Decorations', time: 'varies', materials: 'Glass craft kit' },
      { name: 'Fancy Decoupage Decorations', time: '1.5hrs', materials: 'Card, tissue, glue, varnish' },
      { name: 'Embroidered Christmas Stocking', time: '3hrs', materials: 'Fabric, thread, needle, pattern' }
    ],
    baking: [
      { name: 'Gingerbread House', time: '2hrs', materials: 'Gingerbread, icing, sweets, decorations' },
      { name: 'Christmas Pudding', time: '2hrs', materials: 'Dried fruits, brandy, spices, flour' },
      { name: 'Mince Pies', time: '1.5hrs', materials: 'Pastry, mincemeat, apple' },
      { name: 'Panettone', time: '3hrs', materials: 'Flour, butter, eggs, dried fruit, yeast' },
      { name: 'Chocolate Truffles', time: '1.5hrs', materials: 'Chocolate, cream, cocoa, flavourings' }
    ],
    activities: [
      { name: 'Create an Advent Calendar Box', time: '2hrs', materials: 'Card, decorations, 24 items' },
      { name: 'Plan Christmas Dinner Menu', time: '1hr', materials: 'Paper, pens, recipe books' },
      { name: 'Design Christmas Crackers', time: '1.5hrs', materials: 'Paper tubes, tissue, gifts, jokes' },
      { name: 'Organize Christmas Playlist', time: '1hr', materials: 'Music streaming service' }
    ]
  }
};

export default function AdventCalendarActivityGenerator() {
  const [config, setConfig] = useState({
    ageGroup: '5-7',
    budget: 'free',
    indoorOutdoor: '50-50',
    familySize: 'medium'
  });

  const [activities, setActivities] = useState(null);

  const handleGenerate = () => {
    const budgetData = ACTIVITIES[config.budget];
    const allActivities = [];

    // Collect activities based on budget level
    Object.values(budgetData).forEach(category => {
      allActivities.push(...category);
    });

    // Generate 24 activities
    const generated = [];
    for (let day = 1; day <= 24; day++) {
      const activity = allActivities[Math.floor(Math.random() * allActivities.length)];
      generated.push({
        day,
        ...activity,
        description: `Activity ${day}`
      });
    }

    setActivities(generated);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Age Group</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['3-5', '5-7', '7-9', '9-12'].map(age => (
              <button
                key={age}
                onClick={() => setConfig(c => ({ ...c, ageGroup: age }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition ${
                  config.ageGroup === age
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Budget Level</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { value: 'free', label: 'Free or Nearly Free' },
              { value: 'low-cost', label: 'Low Cost (under £30)' },
              { value: 'any', label: 'Any Budget' }
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setConfig(c => ({ ...c, budget: opt.value }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition text-sm ${
                  config.budget === opt.value
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Indoor/Outdoor Mix</label>
          <div className="grid grid-cols-3 gap-2">
            {['mostly-indoor', '50-50', 'mostly-outdoor'].map(mix => (
              <button
                key={mix}
                onClick={() => setConfig(c => ({ ...c, indoorOutdoor: mix }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize text-sm ${
                  config.indoorOutdoor === mix
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {mix.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Family Size</label>
          <div className="grid grid-cols-3 gap-2">
            {['small', 'medium', 'large'].map(size => (
              <button
                key={size}
                onClick={() => setConfig(c => ({ ...c, familySize: size }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize ${
                  config.familySize === size
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
        >
          Generate 24 Days of Activities
        </button>
      </div>

      {activities && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Your 24-Day Advent Calendar</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activities.map(activity => (
                <div
                  key={activity.day}
                  className="bg-white border border-border rounded-[var(--radius-input)] p-4 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono font-bold text-accent text-lg">Day {activity.day}</span>
                    <span className="text-text-muted text-xs bg-accent-muted px-2 py-1 rounded whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary mb-2">{activity.name}</h3>
                  <p className="text-text-secondary text-sm mb-2">{activity.materials}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-[var(--radius-input)]">
              <p className="text-amber-900 text-sm">
                <span className="font-semibold">Pro tip:</span> Mix up the types of activities throughout the month. Alternate between quiet crafts, active games, baking, and outdoor adventures to keep the excitement varied!
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
          >
            Generate Another Set
          </button>
        </div>
      )}
    </div>
  );
}
