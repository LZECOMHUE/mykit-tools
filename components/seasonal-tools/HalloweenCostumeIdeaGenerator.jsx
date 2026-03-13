'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

const costumes = {
  toddler: [
    { name: 'Pumpkin', difficulty: 'Easy', materials: 'Orange fabric/felt, green for stem' },
    { name: 'Lion', difficulty: 'Easy', materials: 'Brown/tan clothes, yarn for mane' },
    { name: 'Butterfly', difficulty: 'Medium', materials: 'Coloured paper, wings template, antennae' },
    { name: 'Dinosaur', difficulty: 'Easy', materials: 'Green clothes, felt spikes, face paint' },
    { name: 'Ladybird', difficulty: 'Easy', materials: 'Red fabric, black paint/felt circles' },
    { name: 'Pirate', difficulty: 'Medium', materials: 'Black clothes, eye patch, striped shirt' },
    { name: 'Princess', difficulty: 'Easy', materials: 'Dress, plastic tiara, wand' },
    { name: 'Superhero', difficulty: 'Easy', materials: 'Coloured clothes, cape from fabric, mask' },
    { name: 'Ghost', difficulty: 'Easy', materials: 'White sheet, black marker for eyes' },
    { name: 'Sheep', difficulty: 'Medium', materials: 'White clothes, cotton wool, headband' },
  ],
  child: [
    { name: 'Mummy', difficulty: 'Medium', materials: 'White cloth strips, face paint, fake blood' },
    { name: 'Witch', difficulty: 'Medium', materials: 'Black dress, witch hat, broom' },
    { name: 'Vampire', difficulty: 'Medium', materials: 'Black/red cape, white face paint, fake fangs' },
    { name: 'Zombie', difficulty: 'Medium', materials: 'Tattered clothes, grey face paint, fake blood' },
    { name: 'Skeleton', difficulty: 'Medium', materials: 'Black clothes, white paint, glow-in-dark paint' },
    { name: 'Mad Scientist', difficulty: 'Medium', materials: 'Lab coat, wild wig, goggles' },
    { name: 'Frankenstein', difficulty: 'Medium', materials: 'Green face paint, black flat-top wig, bolts' },
    { name: 'Clown', difficulty: 'Easy', materials: 'Colourful clothes, face paint, oversized shoes' },
    { name: 'Ninja', difficulty: 'Easy', materials: 'All black clothes, black mask, rope' },
    { name: 'Astronaut', difficulty: 'Medium', materials: 'Silver clothes, helmet, glow sticks' },
    { name: 'Pirate', difficulty: 'Medium', materials: 'Pirate shirt, bandana, sword, fake beard' },
    { name: 'Blackcat', difficulty: 'Easy', materials: 'Black clothes, cat ears, face paint whiskers' },
  ],
  teen: [
    { name: 'Ghost Face', difficulty: 'Easy', materials: 'Black clothes, white ghost mask' },
    { name: 'Werewolf', difficulty: 'Hard', materials: 'Faux fur, latex makeup, fake claws' },
    { name: 'Dracul', difficulty: 'Medium', materials: 'Victorian clothes, cape, pale makeup, fake fangs' },
    { name: 'Zombie Cheerleader', difficulty: 'Medium', materials: 'Cheerleader outfit, grey makeup, fake blood' },
    { name: 'Plague Doctor', difficulty: 'Hard', materials: 'Period coat, bird mask, cane' },
    { name: 'Alien', difficulty: 'Medium', materials: 'Metallic clothes, face paint, antennae' },
    { name: 'Horror Movie Character', difficulty: 'Medium', materials: 'Masks and props from films' },
    { name: 'Corpse Bride', difficulty: 'Hard', materials: 'White wedding dress, zombie makeup' },
    { name: 'Haunted Doll', difficulty: 'Medium', materials: 'Dress, porcelain mask, makeup' },
    { name: 'Grim Reaper', difficulty: 'Easy', materials: 'Black robe, scythe, hood' },
  ],
  adult: [
    { name: 'Drag', difficulty: 'Medium', materials: 'Wig, makeup, dress, heels' },
    { name: 'Demon', difficulty: 'Hard', materials: 'Latex makeup, horns, red clothes' },
    { name: 'Zombie', difficulty: 'Medium', materials: 'Tattered clothes, latex scars, makeup' },
    { name: 'Witchy', difficulty: 'Easy', materials: 'Dark clothes, witch hat, makeup' },
    { name: 'Sexy Cat', difficulty: 'Easy', materials: 'Black outfit, ears, whisker makeup' },
    { name: 'Historical Figure', difficulty: 'Medium', materials: 'Period costume, accessories' },
    { name: 'Movie/TV Character', difficulty: 'Medium', materials: 'Specific clothing and props' },
    { name: 'Creepy Doll', difficulty: 'Medium', materials: 'Porcelain mask, dress, makeup' },
    { name: 'Swamp Creature', difficulty: 'Hard', materials: 'Green latex, prosthetics, makeup' },
    { name: 'Gothic Victorian', difficulty: 'Medium', materials: 'Period clothing, lace, makeup' },
  ],
};

export default function HalloweenCostumeIdeaGenerator() {
  const [ageGroup, setAgeGroup] = useState('child');
  const [groupCostume, setGroupCostume] = useState(false);
  const [budget, setBudget] = useState('medium');
  const [numIdeas, setNumIdeas] = useState('5');
  const [ideas, setIdeas] = useState([]);

  const generateIdeas = () => {
    const ageData = costumes[ageGroup];
    const filtered = budget === 'free'
      ? ageData.filter(c => c.difficulty === 'Easy')
      : budget === 'low'
      ? ageData.filter(c => c.difficulty !== 'Hard')
      : ageData;

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(parseInt(numIdeas), filtered.length));
    setIdeas(selected);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Age Group</label>
          <Select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="w-full">
            <option value="toddler">Toddler (2-4)</option>
            <option value="child">Child (5-10)</option>
            <option value="teen">Teen (11-18)</option>
            <option value="adult">Adult</option>
          </Select>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">DIY Budget</label>
          <Select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full">
            <option value="free">Free (using what you have)</option>
            <option value="low">Low (under £10)</option>
            <option value="medium">Medium (under £30)</option>
          </Select>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Number of Ideas</label>
          <Select value={numIdeas} onChange={(e) => setNumIdeas(e.target.value)} className="w-full">
            <option value="3">3 ideas</option>
            <option value="5">5 ideas</option>
            <option value="10">10 ideas</option>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="group"
            checked={groupCostume}
            onChange={() => setGroupCostume(!groupCostume)}
          />
          <label htmlFor="group" className="text-text-primary cursor-pointer">
            Group costume matching theme?
          </label>
        </div>

        <Button onClick={generateIdeas} className="bg-accent text-white w-full">
          Generate Costume Ideas
        </Button>
      </div>

      {ideas.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-text-primary">Costume Ideas</h3>
          <div className="space-y-3">
            {ideas.map((costume, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-heading text-base font-bold text-text-primary">{costume.name}</h4>
                  <span className={`px-3 py-1 rounded text-xs font-medium ${
                    costume.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    costume.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {costume.difficulty}
                  </span>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Materials needed:</p>
                  <p className="text-text-muted text-sm">{costume.materials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
