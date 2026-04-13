'use client';

import { useState, useMemo, useEffect } from 'react';

const ideas = {
  travel: [
    'Visit the Northern Lights in Iceland',
    'Trek to Machu Picchu',
    'Safari in Kenya',
    'Cherry blossoms in Japan',
    'Road trip down the Pacific Coast Highway',
    'Explore the temples of Thailand',
    'Hike the Swiss Alps',
    'Visit the pyramids of Egypt',
    'Island hop in Greece',
    'See the aurora australis in New Zealand',
  ],
  food: [
    'Learn to make handmade pasta in Italy',
    'Try authentic ramen in Tokyo',
    'Take a cooking class in Bangkok',
    'Eat croissants at a Parisian cafe',
    'Sample street food in Mexico City',
    'Try authentic paella in Spain',
    'Taste wine in Tuscany',
    'Learn to make sushi from a master chef',
    'Eat fresh seafood in Portugal',
    'Take a cheese-making class in France',
  ],
  adventure: [
    'Skydiving',
    'Scuba diving in the Great Barrier Reef',
    'White water rafting',
    'Bungee jumping',
    'Paragliding',
    'Climb Mount Kilimanjaro',
    'Surfing in Hawaii',
    'Rock climbing',
    'Zip-lining through a rainforest',
    'Hot air ballooning',
  ],
  learning: [
    'Learn to play an instrument',
    'Read 50 books in a year',
    'Master a new language',
    'Take a dance class',
    'Learn photography',
    'Get certified in scuba diving',
    'Take an improv comedy class',
    'Learn to paint',
    'Complete an online course in something new',
    'Learn to code a project from start to finish',
  ],
  creative: [
    'Write and publish a short story',
    'Start a blog or vlog',
    'Create a photo series',
    'Write a song',
    'Paint a mural',
    'Start your own business',
    'Create a podcast',
    'Build something with your hands',
    'Design and create your own fashion line',
    'Collaborate on an art project',
  ],
  wellness: [
    'Complete a 30-day yoga challenge',
    'Run a marathon',
    'Do a digital detox for a month',
    'Start meditation daily',
    'Learn to make healthy smoothie bowls',
    'Take a wellness retreat',
    'Try forest bathing',
    'Complete a 5K run',
    'Practice gratitude journaling for 100 days',
    'Learn mindfulness techniques',
  ],
};

export default function BucketListGenerator() {
  const [category, setCategory] = useState('travel');
  const [myList, setMyList] = useState([]);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);

  const generateIdeas = (cat) => {
    const categoryIdeas = ideas[cat || category];
    const shuffled = [...categoryIdeas].sort(() => 0.5 - Math.random()).slice(0, 5);
    setGeneratedIdeas(shuffled);
  };

  useEffect(() => {
    generateIdeas('travel');
  }, []);

  const toggleItem = (idea) => {
    setMyList((prev) =>
      prev.includes(idea) ? prev.filter((item) => item !== idea) : [...prev, idea]
    );
  };

  const handleCopyList = () => {
    const text = myList.join('\n');
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      <div className="bg-surface p-4 rounded-[var(--radius-card)]">
        <p className="text-text-secondary text-sm font-medium mb-2">Your Bucket List</p>
        <p className="text-2xl font-mono font-bold text-accent">{myList.length}</p>
        <p className="text-text-muted text-xs">items added to your list</p>
      </div>

      <div>
        <label className="block text-text-primary font-medium mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); generateIdeas(e.target.value); }}
          className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="travel">Travel</option>
          <option value="food">Food Experiences</option>
          <option value="adventure">Adventure & Adrenaline</option>
          <option value="learning">Learning & Skills</option>
          <option value="creative">Creative Projects</option>
          <option value="wellness">Wellness & Health</option>
        </select>
      </div>

      <button
        onClick={() => generateIdeas()}
        className="w-full px-4 py-3 bg-accent text-white font-medium rounded-[var(--radius-input)] hover:bg-blue-600 transition"
      >
        Generate 5 Ideas
      </button>

      {generatedIdeas.length > 0 && (
        <div className="space-y-3">
          <p className="text-text-primary font-medium">Suggested ideas for {category}</p>
          {generatedIdeas.map((idea, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-surface rounded-[var(--radius-card)] cursor-pointer hover:bg-blue-50 transition"
              onClick={() => toggleItem(idea)}
            >
              <input
                type="checkbox"
                checked={myList.includes(idea)}
                onChange={() => toggleItem(idea)}
                className="mt-1 w-5 h-5 accent-accent cursor-pointer"
              />
              <p className="text-text-primary flex-1">{idea}</p>
            </div>
          ))}
        </div>
      )}

      {myList.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-text-primary font-medium">My Bucket List</p>
            <button
              onClick={handleCopyList}
              className="px-3 py-1 bg-white border border-border text-text-secondary text-sm font-medium rounded-[var(--radius-input)] hover:bg-surface transition"
            >
              Copy List
            </button>
          </div>

          {myList.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-blue-50 border border-accent border-opacity-20 rounded-[var(--radius-card)] cursor-pointer hover:bg-blue-100 transition"
              onClick={() => toggleItem(item)}
            >
              <input
                type="checkbox"
                checked={true}
                onChange={() => toggleItem(item)}
                className="mt-1 w-5 h-5 accent-accent cursor-pointer"
              />
              <p className="text-text-primary flex-1">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
