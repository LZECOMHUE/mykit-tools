'use client';

import { useState, useMemo } from 'react';

const hobbies = [
  {
    name: 'Watercolor Painting',
    type: 'indoor',
    budget: 'low',
    time: '1hr',
    social: 'solo',
    cost: '£15-30',
    difficulty: 'easy',
    description: 'Express yourself through vibrant watercolor art.',
  },
  {
    name: 'Rock Climbing',
    type: 'outdoor',
    budget: 'high',
    time: '2hr+',
    social: 'both',
    cost: '£50-100',
    difficulty: 'hard',
    description: 'Challenge yourself physically while scaling indoor or outdoor walls.',
  },
  {
    name: 'Journaling',
    type: 'indoor',
    budget: 'free',
    time: '30min',
    social: 'solo',
    cost: '£0-10',
    difficulty: 'easy',
    description: 'Reflect and process your thoughts through daily writing.',
  },
  {
    name: 'Photography',
    type: 'outdoor',
    budget: 'medium',
    time: '1hr',
    social: 'both',
    cost: '£30-200',
    difficulty: 'medium',
    description: 'Capture the world through your camera lens.',
  },
  {
    name: 'Board Gaming',
    type: 'indoor',
    budget: 'medium',
    time: '1hr',
    social: 'social',
    cost: '£20-50',
    difficulty: 'easy',
    description: 'Gather friends for strategic fun and friendly competition.',
  },
  {
    name: 'Hiking',
    type: 'outdoor',
    budget: 'free',
    time: '2hr+',
    social: 'both',
    cost: '£0-50',
    difficulty: 'medium',
    description: 'Explore nature trails and get fresh air and exercise.',
  },
  {
    name: 'Cooking Classes',
    type: 'indoor',
    budget: 'medium',
    time: '1hr',
    social: 'social',
    cost: '£30-60',
    difficulty: 'medium',
    description: 'Learn culinary skills and impress with new recipes.',
  },
  {
    name: 'Yoga',
    type: 'indoor',
    budget: 'low',
    time: '30min',
    social: 'both',
    cost: '£0-20',
    difficulty: 'easy',
    description: 'Improve flexibility and mindfulness through guided practice.',
  },
  {
    name: 'Gardening',
    type: 'outdoor',
    budget: 'medium',
    time: '1hr',
    social: 'solo',
    cost: '£20-50',
    difficulty: 'easy',
    description: 'Grow your own vegetables, herbs, or flowers.',
  },
  {
    name: 'Guitar Playing',
    type: 'indoor',
    budget: 'medium',
    time: '1hr',
    social: 'both',
    cost: '£50-150',
    difficulty: 'hard',
    description: 'Master chords and melodies on this classic instrument.',
  },
  {
    name: 'Book Club',
    type: 'indoor',
    budget: 'low',
    time: '1hr',
    social: 'social',
    cost: '£10-20',
    difficulty: 'easy',
    description: 'Share stories and discuss books with fellow readers.',
  },
  {
    name: 'Cycling',
    type: 'outdoor',
    budget: 'high',
    time: '1hr',
    social: 'both',
    cost: '£100-500',
    difficulty: 'medium',
    description: 'Explore your area and build endurance on two wheels.',
  },
  {
    name: 'Origami',
    type: 'indoor',
    budget: 'free',
    time: '30min',
    social: 'solo',
    cost: '£0-5',
    difficulty: 'easy',
    description: 'Create intricate paper folded art.',
  },
  {
    name: 'Pottery',
    type: 'indoor',
    budget: 'medium',
    time: '1hr',
    social: 'both',
    cost: '£30-50',
    difficulty: 'medium',
    description: 'Shape clay into beautiful functional art.',
  },
  {
    name: 'Dance Classes',
    type: 'indoor',
    budget: 'medium',
    time: '1hr',
    social: 'social',
    cost: '£15-30',
    difficulty: 'medium',
    description: 'Learn new moves and have fun moving to music.',
  },
];

const DIFFICULTY_COLORS = { easy: 'bg-green-100 text-green-700', medium: 'bg-yellow-100 text-yellow-700', hard: 'bg-red-100 text-red-700' };

export default function NewHobbySuggester() {
  const [filters, setFilters] = useState({
    type: 'both',
    budget: 'any',
    time: 'any',
    social: 'any',
  });

  const suggestions = useMemo(() => {
    return hobbies.filter((hobby) => {
      if (filters.type !== 'both' && hobby.type !== filters.type) return false;
      if (filters.budget !== 'any' && hobby.budget !== filters.budget) return false;
      if (filters.time !== 'any' && hobby.time !== filters.time) return false;
      if (filters.social !== 'any' && hobby.social !== filters.social) return false;
      return true;
    });
  }, [filters]);

  const displayedSuggestions = suggestions.slice(0, 5);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-text-primary text-xs font-medium mb-1">Location</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="both">Both</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>

        <div>
          <label className="block text-text-primary text-xs font-medium mb-1">Budget</label>
          <select
            value={filters.budget}
            onChange={(e) => handleFilterChange('budget', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="any">Any</option>
            <option value="free">Free</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-text-primary text-xs font-medium mb-1">Time</label>
          <select
            value={filters.time}
            onChange={(e) => handleFilterChange('time', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="any">Any</option>
            <option value="30min">30 min</option>
            <option value="1hr">1 hour</option>
            <option value="2hr+">2+ hours</option>
          </select>
        </div>

        <div>
          <label className="block text-text-primary text-xs font-medium mb-1">Social</label>
          <select
            value={filters.social}
            onChange={(e) => handleFilterChange('social', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="any">Any</option>
            <option value="solo">Solo</option>
            <option value="social">Social</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-text-primary font-medium">
          Suggestions ({displayedSuggestions.length} found)
        </p>

        {displayedSuggestions.length > 0 ? (
          displayedSuggestions.map((hobby, idx) => (
            <div
              key={idx}
              className="bg-surface p-4 rounded-[var(--radius-card)] hover:bg-blue-50 transition"
            >
              <p className="text-text-primary font-medium text-lg">{hobby.name}</p>
              <p className="text-text-secondary text-sm mb-2">{hobby.description}</p>

              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-white border border-border rounded-full text-xs font-mono text-text-primary">{hobby.cost}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${DIFFICULTY_COLORS[hobby.difficulty]}`}>{hobby.difficulty}</span>
                <span className="px-2 py-0.5 bg-white border border-border rounded-full text-xs text-text-secondary">{hobby.time}</span>
                <span className="px-2 py-0.5 bg-white border border-border rounded-full text-xs text-text-secondary capitalize">{hobby.type}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-text-muted text-sm text-center py-4">
            No hobbies match your filters. Try adjusting your preferences.
          </p>
        )}
      </div>
    </div>
  );
}
