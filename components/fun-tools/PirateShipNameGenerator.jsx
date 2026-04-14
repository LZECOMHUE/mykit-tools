'use client';

import { useState, useCallback } from 'react';

const categories = [
  { value: 'warship', label: 'Warship', icon: '⚓' },
  { value: 'ghost-ship', label: 'Ghost Ship', icon: '👻' },
  { value: 'merchant-raider', label: 'Merchant Raider', icon: '💰' },
  { value: 'privateer', label: 'Privateer', icon: '🏴' },
  { value: 'legendary', label: 'Legendary', icon: '🌟' },
  { value: 'explorer', label: 'Explorer', icon: '🧭' },
];

const pirateData = {
  warship: {
    ships: ['The Iron Galleon', 'The Destroyer', "The Corsair's Blade", 'The War Hammer', 'The Battle Raven', 'The Crimson Cannon', 'The Dreadnought'],
    captains: ['Blackheart Morgan', 'Captain Draven Skull', 'Iron Jake the Merciless', 'Scarlet Sails Sarah', 'Captain Razor Blackstone', 'Admiral Bloodbeard'],
    flags: ['Skull and crossbones with blood drip', "Flaming death's head", 'Black flag with silver sword', 'Red skull with crossed cannons', 'Skeleton holding dual cutlasses', 'Burning ship on black field'],
    reputations: ['Terror of the Caribbean', 'Scourge of seven seas', 'Destroyer of naval fleets', 'Feared by all merchants', 'Never surrenders to the Crown', 'Sank three frigates in one battle'],
    ports: ['Tortuga Harbor', 'Skull Rock Cove', "Dead Man's Bay", 'Blackwater Port', "Pirate's Graveyard", 'Cannonball Cove'],
  },
  'ghost-ship': {
    ships: ['The Phantom Crawler', 'The Cursed Wanderer', "The Specter's Wake", 'The Haunted Depth', 'The Lost Void', 'The Pale Mariner', "The Wraith's Drift"],
    captains: ['Captain Casper the Damned', 'Ghost Faced Garrett', 'The Phantom Captain', 'Restless Reginald', 'Captain Vanished Jack', 'The Hollow Helmsman'],
    flags: ['Tattered white flag with ghostly skull', 'Faded flag that glows at night', "Transparent death's head", 'Ethereal pale bones', 'Flag that appears and disappears', 'Shredded cloth that weeps'],
    reputations: ['Ships vanish in its wake', 'Sighted only during storms', 'Crew reports seeing ghosts aboard', 'Disappears without a trace', 'The legends refuse to die', 'Appears before shipwrecks as an omen'],
    ports: ['The Misty Reaches', 'Phantom Port', 'The Twilight Strait', 'Limbo Harbor', 'The Fog-Bound Deep', 'Nowhere Dock'],
  },
  'merchant-raider': {
    ships: ['The Golden Privateer', "The Merchant's Gambit", 'The Trade Wind Taker', 'The Fortune Seeker', 'The Cargo Master', 'The Silk Thief', 'The Spice Runner'],
    captains: ['Crafty Captain Cole', 'Merchant Marauder Maria', 'Captain Silver Tongue', 'The Deal Maker', 'Captain Fortune Finder', 'Ledger-Book Lenny'],
    flags: ['Gold coins on black field', 'Merchant galley crossed with sword', 'Scales of justice broken', 'Coin pouch design', 'Trading post burning', 'Golden anchor on crimson'],
    reputations: ['Steals only valuable cargo', 'Makes deals with merchants', 'Leaves no witnesses to treasure location', 'Wealthy beyond measure', 'Fences stolen goods worldwide', 'Has a network of informants in every port'],
    ports: ['The Free Port', "Merchant's Haven", 'The Golden Anchorage', "Smuggler's Cove", 'Trade Quarter', 'Black Market Bay'],
  },
  privateer: {
    ships: ['The Royal Venture', "The Crown's Blessing", 'The Lawful Raider', 'The Patent Predator', 'The Noble Corsair', "The King's Shadow", 'The Licensed Fury'],
    captains: ['Captain Sir Edward Drake', 'Lady Privateering Patricia', 'Captain Royal Charter', 'The Legitimized Pirate', "Captain Crown's Favor", 'Sir Reginald Wavecutter'],
    flags: ['Royal crest with privateer mark', 'Letters of marque displayed', 'Crown and sword intertwined', 'Royal seal with anchor', 'Official government seal', 'Lion rampant on navy blue'],
    reputations: ['Only attacks enemies of the Crown', 'Sanctioned by royalty', 'Brings wealth to the kingdom', 'Respected by nobles', 'Has official government protection', 'Walks the line between pirate and patriot'],
    ports: ['Royal Harbor', "Crown's Dock", 'Palace Port', "Noble's Anchorage", 'Official Privateer Base', 'The Admiralty Wharf'],
  },
  legendary: {
    ships: ['The Eternal Revenge', "The Legend's Wake", 'The Forever Ship', 'The Mythic Terror', 'The Immortal Vessel', "The World's End", 'The Stormbreaker'],
    captains: ['The Legendary Captain', 'Immortal Iris the Vast', 'Captain Eternal Vengeance', 'The Undying Pirate', 'Captain Deathless', 'The Pirate King'],
    flags: ['Flag bearing ancient symbols', "Legendary crimson death's head", 'Glowing supernatural skull', 'Symbol of eternal power', 'Flag older than history itself', 'Constellation map on black silk'],
    reputations: ['Oldest pirate crew alive', 'Led dozens of legendary raids', 'Rumored to be immortal', 'Treasure beyond counting', 'Featured in a hundred stories', 'Sailed off the edge of the map and returned'],
    ports: ['The Hidden Sanctuary', "Legend's Harbor", 'The Mythical Shores', 'Eternal Paradise', 'The Legendary Bay', "Davy Jones' Welcome"],
  },
  explorer: {
    ships: ['The Horizon Chaser', 'The Far Voyager', 'The Compass Rose', 'The Tradewind Dancer', "The Navigator's Pride", 'The Uncharted Dream', 'The Star Follower'],
    captains: ['Captain Atlas Vane', 'Cartographer Celeste', 'Navigator Nils', 'Wayfinder Wren', 'Captain Meridian Cross', 'The Wandering Mariner'],
    flags: ['Compass on deep blue field', 'Sextant and stars', 'Globe with crossed swords', 'Albatross on sky blue', 'North star in gold', 'Unfurled map design'],
    reputations: ['Discovered three unknown islands', 'Sailed further north than any pirate', 'Maps sold for a fortune', 'Found passage through the ice', 'Charts the most dangerous routes', 'Has never been lost'],
    ports: ["Explorer's Rest", 'New Discovery Bay', 'Charted Waters Dock', "The Cartographer's Cove", 'Uncharted Harbor', 'Waypoint Island'],
  },
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function PirateShipNameGenerator() {
  const [type, setType] = useState('warship');
  const [result, setResult] = useState(null);

  const generate = useCallback(() => {
    const data = pirateData[type];
    setResult({
      shipName: pick(data.ships),
      captain: pick(data.captains),
      flag: pick(data.flags),
      reputation: pick(data.reputations),
      port: pick(data.ports),
    });
  }, [type]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button key={c.value} onClick={() => { setType(c.value); setResult(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              type === c.value ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}>{c.icon} {c.label}</button>
        ))}
      </div>

      <button onClick={generate} className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors">
        {result ? 'Generate Another' : 'Generate Pirate Ship'}
      </button>

      {result && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{result.shipName}</p>
            <p className="text-gray-400 text-sm mt-1">Captain: {result.captain}</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Flag Design</p>
              <p className="font-medium text-sm text-text-primary">{result.flag}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Home Port</p>
              <p className="font-medium text-sm text-text-primary">{result.port}</p>
            </div>
            <div className="bg-white px-4 py-3 col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Reputation</p>
              <p className="font-medium text-sm text-text-primary">{result.reputation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
