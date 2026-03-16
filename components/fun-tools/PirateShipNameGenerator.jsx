'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const pirateData = {
  warship: {
    ships: ['The Iron Galleon', 'The Destroyer', 'The Corsair\'s Blade', 'The War Hammer', 'The Battle Raven'],
    captains: ['Blackheart Morgan', 'Captain Draven Skull', 'Iron Jake the Merciless', 'Scarlet Sails Sarah', 'Captain Razor Blackstone'],
    flags: ['Skull and crossbones with blood drip', 'Flaming death\'s head', 'Black flag with silver sword', 'Red skull with crossed cannons', 'Skeleton holding dual cutlasses'],
    reputations: ['Terror of the Caribbean', 'Scourge of seven seas', 'Destroyer of naval fleets', 'Feared by all merchants', 'Never surrenders to the Crown'],
    ports: ['Tortuga Harbor', 'Skull Rock Cove', 'Dead Man\'s Bay', 'Blackwater Port', 'Pirate\'s Graveyard'],
  },
  'ghost-ship': {
    ships: ['The Phantom Crawler', 'The Cursed Wanderer', 'The Specter\'s Wake', 'The Haunted Depth', 'The Lost Void'],
    captains: ['Captain Casper the Damned', 'Ghost Faced Garrett', 'The Phantom Captain', 'Restless Reginald', 'Captain Vanished Jack'],
    flags: ['Tattered white flag with ghostly skull', 'Faded flag that glows at night', 'Transparent death\'s head', 'Ethereal pale bones', 'Flag that appears and disappears'],
    reputations: ['Ships vanish in its wake', 'Sighted only during storms', 'Crew reports seeing ghosts aboard', 'Disappears without a trace', 'The legends refuse to die'],
    ports: ['The Misty Reaches', 'Phantom Port', 'The Twilight Strait', 'Limbo Harbor', 'The Fog-Bound Deep'],
  },
  'merchant-raider': {
    ships: ['The Golden Privateer', 'The Merchant\'s Gambit', 'The Trade Wind Taker', 'The Fortune Seeker', 'The Cargo Master'],
    captains: ['Crafty Captain Cole', 'Merchant Marauder Maria', 'Captain Silver Tongue', 'The Deal Maker', 'Captain Fortune Finder'],
    flags: ['Gold coins on black field', 'Merchant galley crossed with sword', 'Scales of justice broken', 'Coin pouch design', 'Trading post burning'],
    reputations: ['Steals only valuable cargo', 'Makes deals with merchants', 'Leaves no witnesses to treasure location', 'Wealthy beyond measure', 'Fences stolen goods worldwide'],
    ports: ['The Free Port', 'Merchant\'s Haven', 'The Golden Anchorage', 'Smuggler\'s Cove', 'Trade Quarter'],
  },
  privateer: {
    ships: ['The Royal Venture', 'The Crown\'s Blessing', 'The Lawful Raider', 'The Patent Predator', 'The Noble Corsair'],
    captains: ['Captain Sir Edward Drake', 'Lady Privateering Patricia', 'Captain Royal Charter', 'The Legitimized Pirate', 'Captain Crown\'s Favor'],
    flags: ['Royal crest with privateer mark', 'Letters of marque displayed', 'Crown and sword intertwined', 'Royal seal with anchor', 'Official government seal'],
    reputations: ['Only attacks enemies of the Crown', 'Sanctioned by royalty', 'Brings wealth to the kingdom', 'Respected by nobles', 'Has official government protection'],
    ports: ['Royal Harbor', 'Crown\'s Dock', 'Palace Port', 'Noble\'s Anchorage', 'Official Privateer Base'],
  },
  legendary: {
    ships: ['The Eternal Revenge', 'The Legend\'s Wake', 'The Forever Ship', 'The Mythic Terror', 'The Immortal Vessel'],
    captains: ['The Legendary Captain', 'Immortal Iris the Vast', 'Captain Eternal Vengeance', 'The Undying Pirate', 'Captain Deathless'],
    flags: ['Flag bearing ancient symbols', 'Legendary crimson death\'s head', 'Glowing supernatural skull', 'Symbol of eternal power', 'Flag older than history itself'],
    reputations: ['Oldest pirate crew alive', 'Led dozens of legendary raids', 'Rumored to be immortal', 'Treasure beyond counting', 'Featured in a hundred stories'],
    ports: ['The Hidden Sanctuary', 'Legend\'s Harbor', 'The Mythical Shores', 'Eternal Paradise', 'The Legendary Bay'],
  },
};

export default function PirateShipNameGenerator() {
  const [category, setCategory] = useState('warship');
  const [ship, setShip] = useState(null);

  const generateShip = () => {
    const data = pirateData[category];

    const shipName = data.ships[Math.floor(Math.random() * data.ships.length)];
    const captain = data.captains[Math.floor(Math.random() * data.captains.length)];
    const flag = data.flags[Math.floor(Math.random() * data.flags.length)];
    const reputation = data.reputations[Math.floor(Math.random() * data.reputations.length)];
    const port = data.ports[Math.floor(Math.random() * data.ports.length)];

    setShip({
      shipName,
      captain,
      flag,
      reputation,
      port,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Ship Type
          </label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'warship', label: 'Warship' },
              { value: 'ghost-ship', label: 'Ghost Ship' },
              { value: 'merchant-raider', label: 'Merchant Raider' },
              { value: 'privateer', label: 'Privateer' },
              { value: 'legendary', label: 'Legendary' },
            ]}
          />
        </div>

        <Button onClick={generateShip} className="bg-accent text-white w-full">
          Generate Pirate Ship
        </Button>
      </div>

      {ship && (
        <div className="bg-slate-800 text-white border border-slate-700 rounded-[var(--radius-card)] p-8 space-y-4">
          <div>
            <p className="font-heading text-4xl font-bold">{ship.shipName}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4">
            <p className="text-sm opacity-90 mb-1">Captain</p>
            <p className="text-2xl font-bold">{ship.captain}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-3">
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Flag Design</p>
              <p className="text-lg font-medium">{ship.flag}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Reputation</p>
              <p className="text-lg font-medium">{ship.reputation}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Home Port</p>
              <p className="text-lg font-medium">{ship.port}</p>
            </div>
          </div>

          <Button onClick={generateShip} variant="secondary" className="bg-white text-slate-800 w-full mt-4">
            Generate Another
          </Button>
        </div>
      )}
    </div>
  );
}
