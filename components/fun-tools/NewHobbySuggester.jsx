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
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-text-primary font-medium mb-2">Location</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="both">Both Indoor & Outdoor</option>
            <option value="indoor">Indoor Only</option>
            <option value="outdoor">Outdoor Only</option>
          </select>
        </div>

        <div>
          <label className="block text-text-primary font-medium mb-2">Budget</label>
          <select
            value={filters.budget}
            onChange={(e) => handleFilterChange('budget', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="any">Any Budget</option>
            <option value="free">Free</option>
            <option value="low">Low (under £30)</option>
            <option value="medium">Medium (£30-100)</option>
            <option value="high">High (over £100)</option>
          </select>
        </div>

        <div>
          <label className="block text-text-primary font-medium mb-2">Time Commitment</label>
          <select
            value={filters.time}
            onChange={(e) => handleFilterChange('time', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="any">Any Time</option>
            <option value="30min">30 minutes</option>
            <option value="1hr">1 hour</option>
            <option value="2hr+">2+ hours</option>
          </select>
        </div>

        <div>
          <label className="block text-text-primary font-medium mb-2">Social</label>
          <select
            value={filters.social}
            onChange={(e) => handleFilterChange('social', e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="any">Solo or Social</option>
            <option value="solo">Solo</option>
            <option value="social">Social/Groups</option>
            <option value="both">Both Options</option>
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
              className="bg-surface p-4 rounded-[var(--radius-card)] space-y-2 hover:bg-blue-50 transition"
            >
              <p className="text-text-primary font-medium text-lg">{hobby.name}</p>
              <p className="text-text-secondary text-sm">{hobby.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white border border-border p-2 rounded-[var(--radius-input)]">
                  <p className="text-text-muted">Cost</p>
                  <p className="text-text-primary font-mono">{hobby.cost}</p>
                </div>
                <div className="bg-white border border-border p-2 rounded-[var(--radius-input)]">
                  <p className="text-text-muted">Difficulty</p>
                  <p className="text-text-primary font-mono capitalize">{hobby.difficulty}</p>
                </div>
                <div className="bg-white border border-border p-2 rounded-[var(--radius-input)]">
                  <p className="text-text-muted">Time</p>
                  <p className="text-text-primary font-mono">{hobby.time}</p>
                </div>
                <div className="bg-white border border-border p-2 rounded-[var(--radius-input)]">
                  <p className="text-text-muted">Type</p>
                  <p className="text-text-primary font-mono capitalize">{hobby.type}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-surface p-6 rounded-[var(--radius-card)] text-center">
            <p className="text-text-muted">
              No hobbies match your filters. Try adjusting your preferences!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
