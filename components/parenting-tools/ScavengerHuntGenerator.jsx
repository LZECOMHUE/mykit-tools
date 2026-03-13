'use client';
import { useState } from 'react';

const SCAVENGER_ITEMS = {
  '3-5': {
    indoor: [
      'Something red', 'Something soft', 'A sock', 'A book', 'A toy',
      'Something round', 'Something that makes noise', 'A pillow', 'A cup', 'A spoon',
      'Something yellow', 'A pencil', 'A shoe', 'A blanket', 'Something smooth',
      'A toy car', 'Something blue', 'A hat', 'A plate', 'Something fuzzy'
    ],
    nature: [
      'A stick', 'A leaf', 'A rock', 'A flower', 'Grass',
      'A pinecone', 'A feather', 'A seed', 'Bark', 'A twig',
      'Something green', 'A petal', 'A bug (look carefully)', 'An acorn', 'A stone'
    ],
    park: [
      'A ball', 'A stick', 'A leaf', 'A rock', 'Grass',
      'A flower', 'A feather', 'Bark', 'Sand', 'A twig',
      'Something blue', 'Something red', 'A pinecone', 'A bug', 'A seed'
    ]
  },
  '5-7': {
    indoor: [
      'Something made of plastic', 'Something written on', 'A pair of socks', 'A book with more than 10 pages', 'Something that rolls',
      'Something with buttons', 'A utensil for eating', 'A container', 'Something warm', 'A picture',
      'Something with wheels', 'A stuffed animal', 'Something square', 'A cord or string', 'A piece of paper with writing',
      'Something that opens and closes', 'A remote control', 'A pillow', 'Something metal', 'A brush or comb'
    ],
    nature: [
      'A twig as long as your hand', 'Three leaves of different shapes', 'A smooth stone', 'A rough piece of bark', 'A feather',
      'An acorn or seed pod', 'Something yellow or orange', 'Something red or pink', 'A living insect', 'Moss',
      'A pinecone', 'A flower (or petal)', 'A piece of string naturally made', 'Dirt', 'A bone or animal sign'
    ],
    park: [
      'A leaf with holes in it', 'A smooth pebble', 'A stick shaped like a Y', 'A flower or flowering plant', 'Grass from different places',
      'A feather', 'A piece of wood', 'A rock bigger than your fist', 'A stick with bark missing', 'Something made by an insect',
      'Moss or lichen', 'An acorn or tree seed', 'Dirt or sand', 'A pinecone', 'Something colorful from nature'
    ]
  },
  '7-9': {
    indoor: [
      'Something that uses batteries', 'A book published before 2010', 'Something with your initials', 'A photo of a family member', 'Something fragrant',
      'A device with a screen', 'Something you can wear', 'A game', 'An instruction manual', 'Something made of leather',
      'A mirror', 'Something with a pattern', 'A container that locks', 'A musical instrument', 'A cooking utensil',
      'Something vintage or old', 'A plant or flower', 'Something with numbers on it', 'A card or ticket', 'Something related to a hobby'
    ],
    nature: [
      'A leaf with interesting veins', 'Five rocks of different sizes', 'Tree bark with a pattern', 'Animal tracks or droppings', 'Evidence of an insect home',
      'A seed or fruit from a plant', 'A feather from a specific type of bird', 'Three plants used for food or medicine', 'Lichen or fungus', 'A stone with multiple colors',
      'Animal bone or shed', 'A spiderweb or threads', 'Flowers of three colors', 'A stick with interesting knots', 'Evidence of an animal living nearby'
    ],
    park: [
      'Something with writing on it (from the park)', 'A bench made of a specific material', 'A sign with a number', 'Equipment made of specific material', 'Litter to collect',
      'A plant growing where it shouldn\'t', 'A tree with distinctive bark', 'A playground surface sample', 'Animal evidence', 'Mud or dirt sample',
      'A wildflower growing in the park', 'A stick from a specific tree', 'Evidence of maintenance work', 'A stone with a face or shape', 'A photo showing park safety'
    ]
  },
  '9-12': {
    indoor: [
      'Something valuable (in terms of money or sentiment)', 'An object from another country', 'Something with a patent number', 'Proof of a subscription', 'A security device',
      'Something handmade', 'An object from before you were born', 'A device with more than 20 components', 'Something with a warranty', 'An instruction manual (printed)',
      'A collectible item', 'Something designed by a famous designer', 'Proof of a hobby', 'A historical object', 'Something electronic with a reset button',
      'A textile with interesting weave', 'Something with a barcode you can read', 'A tool with multiple functions', 'An object related to sustainability', 'A piece of art'
    ],
    nature: [
      'Five leaves of different species (identify them)', 'Evidence of animal adaptation', 'Three types of fungi or lichen', 'A decomposing object and its stages', 'Animal tracks with identification',
      'Three stones with different formation types', 'A seasonal plant indicator', 'Soil sample from different depths', 'Water quality indicators', 'Evidence of pollination',
      'A bird feather with species identification', 'Plant material showing growth patterns', 'Insect evidence with species identification', 'A stone showing weather erosion', 'Evidence of plant competition'
    ],
    park: [
      'Documentation of park infrastructure damage', 'A historical marker or plaque', 'Evidence of park maintenance', 'A plant species invasive to the area', 'A water source and its quality',
      'Equipment engineering features', 'A geological feature and description', 'Evidence of human impact', 'A native plant species (identified)', 'Wildlife habitat evidence',
      'Erosion patterns', 'A safety feature purpose documentation', 'A plant adaptation to park conditions', 'Seasonal change documentation', 'Park rules enforcement evidence'
    ]
  }
};

export default function ScavengerHuntGenerator() {
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [locationType, setLocationType] = useState('indoor');
  const [numItems, setNumItems] = useState('10');
  const [generated, setGenerated] = useState(false);
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const generateHunt = () => {
    const itemSet = SCAVENGER_ITEMS[ageGroup]?.[locationType] || SCAVENGER_ITEMS['5-7'].indoor;
    const count = parseInt(numItems);

    const shuffled = [...itemSet].sort(() => Math.random() - 0.5).slice(0, count);
    setItems(shuffled);
    setCheckedItems({});
    setGenerated(true);
  };

  const toggleItem = (idx) => {
    const newChecked = { ...checkedItems };
    newChecked[idx] = !newChecked[idx];
    setCheckedItems(newChecked);
  };

  const printHunt = () => {
    window.print();
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const LocationInfo = {
    indoor: 'Search indoors around your house. Look in rooms, cupboards, and under furniture.',
    nature: 'Search in nature areas. Look in grass, under trees, and around plants.',
    park: 'Search in a local park. Look around equipment, grass, trees, and near water features.'
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="font-heading text-xl font-bold text-text-primary">Hunt Configuration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Age Group</label>
            <div className="flex gap-2">
              {['3-5', '5-7', '7-9', '9-12'].map(age => (
                <button
                  key={age}
                  onClick={() => setAgeGroup(age)}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors ${
                    ageGroup === age
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Location</label>
            <select
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary"
            >
              <option value="indoor">Indoor</option>
              <option value="nature">Nature/Woodland</option>
              <option value="park">Park</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Number of Items</label>
            <input
              type="range"
              min="5"
              max="20"
              value={numItems}
              onChange={(e) => setNumItems(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-accent font-mono font-medium">{numItems} items</div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Season (if nature)</label>
            <select className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary">
              <option>Spring</option>
              <option>Summer</option>
              <option>Autumn</option>
              <option>Winter</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateHunt}
          className="w-full bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] py-2 font-medium transition-colors"
        >
          Generate Scavenger Hunt
        </button>
      </div>

      {generated && (
        <div className="space-y-6">
          <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-heading text-xl font-bold text-text-primary">Hunt Checklist</h2>
                <p className="text-text-secondary text-sm mt-1">{LocationInfo[locationType]}</p>
              </div>
              <button
                onClick={printHunt}
                className="px-4 py-2 bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] font-medium text-sm transition-colors"
              >
                Print
              </button>
            </div>

            {items.length > 0 && (
              <div className="space-y-2 my-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Progress: {completedCount} of {items.length}</span>
                  <span className="text-accent font-mono font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-white border border-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {items.map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-white border border-border rounded-[var(--radius-card)] cursor-pointer hover:bg-surface transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems[idx] || false}
                    onChange={() => toggleItem(idx)}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                  <span className={`flex-grow font-mono font-bold text-lg ${checkedItems[idx] ? 'text-text-muted line-through' : 'text-accent'}`}>
                    {idx + 1}.
                  </span>
                  <span className={checkedItems[idx] ? 'text-text-muted line-through' : 'text-text-primary'}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {completedCount === items.length && items.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-[var(--radius-card)] p-6 text-center">
              <h3 className="font-heading text-2xl font-bold text-green-900 mb-2">You found everything!</h3>
              <p className="text-green-800">Great job completing the scavenger hunt!</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading font-bold text-blue-900 mb-2">Tips for Success</h3>
            <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
              <li>Work alone or in teams</li>
              <li>Take a camera to photograph items instead of collecting them</li>
              <li>Set a time limit for added challenge</li>
              <li>Make sure outdoor searches are in safe areas</li>
              <li>For nature hunts, don\'t pick rare or protected plants</li>
              <li>Check items off as you find them</li>
              <li>Ask for help if you\'re stuck on an item</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
