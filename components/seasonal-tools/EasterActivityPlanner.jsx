'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const activities = {
  '3-5': {
    morning: [
      { name: 'Egg Decorating', duration: 45, instructions: 'Paint hard-boiled eggs with washable paint and stickers' },
      { name: 'Bunny Craft', duration: 30, instructions: 'Make paper bunnies with cotton wool tails' },
      { name: 'Breakfast Treat', duration: 30, instructions: 'Make hot cross buns or Easter-themed pancakes' },
      { name: 'Sticky Treat Making', duration: 40, instructions: 'Make chocolate nests with small eggs' },
    ],
    afternoon: [
      { name: 'Outdoor Egg Hunt', duration: 60, instructions: 'Hide chocolate eggs around the garden for them to find' },
      { name: 'Spring Garden Planting', duration: 50, instructions: 'Plant spring flowers in pots together' },
      { name: 'Story Time & Movie', duration: 90, instructions: 'Read Easter books and watch gentle Easter film' },
      { name: 'Decoration Making', duration: 45, instructions: 'Create Easter garlands with paper chains and bunnies' },
    ],
  },
  '5-7': {
    morning: [
      { name: 'Egg Tie-Dye', duration: 60, instructions: 'Use tea, beetroot juice, and food colouring to dye eggs naturally' },
      { name: 'Easter Card Making', duration: 50, instructions: 'Design cards with Easter themes' },
      { name: 'Bunny Trail Setup', duration: 45, instructions: 'Create a bunny paw print trail around the house' },
      { name: 'Baking Challenge', duration: 60, instructions: 'Bake Easter cupcakes and decorate them' },
    ],
    afternoon: [
      { name: 'Easter Egg Hunt', duration: 75, instructions: 'Multi-stage hunt with clues and riddles' },
      { name: 'Scavenger Hunt', duration: 90, instructions: 'Search for Easter-themed items around the garden' },
      { name: 'Craft Station', duration: 60, instructions: 'Make pom-pom chicks and paper baskets' },
      { name: 'Picnic Tea', duration: 60, instructions: 'Have Easter-themed outdoor picnic' },
    ],
  },
  '7-9': {
    morning: [
      { name: 'Egg Marble Painting', duration: 50, instructions: 'Marble paint eggs using oil paints and water' },
      { name: 'Easter Quiz', duration: 45, instructions: 'Create and solve Easter trivia questions' },
      { name: 'Cooking Challenge', duration: 90, instructions: 'Cook Easter lunch dishes as a competition' },
      { name: 'Decorative Basket Making', duration: 75, instructions: 'Weave Easter baskets from paper or fabric' },
    ],
    afternoon: [
      { name: 'Clue-Based Hunt', duration: 120, instructions: 'Multi-stop hunt with cryptic clues to solve' },
      { name: 'Relay Races', duration: 60, instructions: 'Easter-themed relay races and games' },
      { name: 'Art Project', duration: 90, instructions: 'Create Easter tableau or mosaic artwork' },
      { name: 'Movie & Treats', duration: 120, instructions: 'Watch film and make Easter treats' },
    ],
  },
};

export default function EasterActivityPlanner() {
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [location, setLocation] = useState('garden');
  const [duration, setDuration] = useState('afternoon');
  const [schedule, setSchedule] = useState(null);

  const generateSchedule = () => {
    const ageActivities = activities[ageGroup];
    const activities_list = ageActivities[duration === 'morning' ? 'morning' : 'afternoon'];

    if (location === 'indoor') {
      const indoor_filtered = activities_list.filter(a => !a.name.includes('Garden') && !a.name.includes('Outdoor'));
      setSchedule(indoor_filtered.slice(0, 3));
    } else {
      setSchedule(activities_list.slice(0, 3));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Age Group</label>
          <Select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="w-full">
            <option value="3-5">3-5 years</option>
            <option value="5-7">5-7 years</option>
            <option value="7-9">7-9 years</option>
          </Select>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Location</label>
          <Select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full">
            <option value="garden">Garden</option>
            <option value="indoor">Indoor</option>
          </Select>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Duration</label>
          <Select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full">
            <option value="morning">Morning (AM)</option>
            <option value="afternoon">Afternoon (PM)</option>
          </Select>
        </div>

        <Button onClick={generateSchedule} className="bg-accent text-white w-full">
          Create Schedule
        </Button>
      </div>

      {schedule && (
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-text-primary">Easter Activity Schedule</h3>
          <div className="space-y-4">
            {schedule.map((activity, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-heading text-base font-bold text-text-primary">{idx + 1}. {activity.name}</h4>
                  <span className="font-mono font-bold text-accent bg-white border border-border px-3 py-1 rounded text-sm">
                    {activity.duration} min
                  </span>
                </div>
                <p className="text-text-secondary text-sm">{activity.instructions}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-sm">
              Tip: Build in 15-minute breaks between activities. Have supplies ready before you start. Keep water and snacks available throughout.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
