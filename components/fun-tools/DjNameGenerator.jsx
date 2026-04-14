'use client';

import { useState, useCallback } from 'react';

const djData = {
  house: {
    names: ['DJ Neonwave', 'DJ Soulbeat', 'DJ Velvet', 'DJ Chromatic', 'DJ Euphoria', 'DJ Prism', 'DJ Solstice', 'DJ Mirage', 'DJ Cascade', 'DJ Aura'],
    sounds: ['Melodic progressive house', 'Deep house grooves', 'Tech house fusion', 'Soulful house vibes', 'Progressive house journey', 'Afro house rhythms', 'Vocal house anthems'],
    hometowns: ['Berlin', 'Ibiza', 'Amsterdam', 'London', 'Barcelona', 'Chicago', 'New York'],
    festivals: ['Tomorrowland', 'Ultra', 'Awakenings', 'Paradise Lost', 'Electric Zoo', 'Defected Croatia', 'Sonar'],
  },
  techno: {
    names: ['DJ Onyx', 'DJ Cipher', 'DJ Monolith', 'DJ Pulse', 'DJ Steel', 'DJ Hexcore', 'DJ Axiom', 'DJ Struktur', 'DJ Krater', 'DJ Vektron'],
    sounds: ['Industrial techno', 'Minimal techno', 'Peak hour techno', 'Acid techno', 'Hypnotic techno', 'Hard techno', 'Dub techno'],
    hometowns: ['Detroit', 'Cologne', 'Berlin', 'Frankfurt', 'Brussels', 'Glasgow', 'Tbilisi'],
    festivals: ['Awakenings', 'Berghain', 'Tresor', 'Movement', 'Time Warp', 'Dekmantel', 'Sonar'],
  },
  dubstep: {
    names: ['DJ Bassquake', 'DJ Wobble', 'DJ Shattercore', 'DJ Subsonic', 'DJ Noisevault', 'DJ Fracture', 'DJ Seismic', 'DJ Glitchwave', 'DJ Bassweight'],
    sounds: ['Future bass dubstep', 'Brostep wobble', 'Deep dubstep', 'Halftime dubstep', 'Liquid dubstep fusion', 'Riddim', 'Tearout'],
    hometowns: ['London', 'Los Angeles', 'Bristol', 'Tokyo', 'Toronto', 'Auckland', 'Denver'],
    festivals: ['EDC', 'Fabric Live', 'Outlook', 'SMF', 'Snowglobe', 'Lost Lands', 'Bass Canyon'],
  },
  trance: {
    names: ['DJ Ethereal', 'DJ Skyrise', 'DJ Lumina', 'DJ Transcend', 'DJ Horizon', 'DJ Zenith', 'DJ Elysium', 'DJ Stardrift', 'DJ Ascend'],
    sounds: ['Uplifting trance', 'Progressive trance', 'Psytrance', 'Techno trance', 'Melodic trance', 'Vocal trance', 'Hard trance'],
    hometowns: ['Ibiza', 'Amsterdam', 'Athens', 'Tel Aviv', 'Istanbul', 'Mumbai', 'Goa'],
    festivals: ['Trance Energy', 'Transmission', 'ASOT', 'Luminosity', 'Dreamstate', 'Boom Festival'],
  },
  'drum-and-bass': {
    names: ['DJ Velocity', 'DJ Rushbeat', 'DJ Breakcore', 'DJ Neurofunk', 'DJ Liquid', 'DJ Switchback', 'DJ Rolltide', 'DJ Amen', 'DJ Recoil'],
    sounds: ['Liquid funk', 'Neurofunk', 'Jump-up', 'Techstep', 'Atmospheric liquid', 'Jungle revival', 'Minimal DnB'],
    hometowns: ['London', 'Bristol', 'Manchester', 'Tokyo', 'Melbourne', 'Prague', 'Vienna'],
    festivals: ['Let It Roll', 'Hospitality', 'Fabric Live', 'Rampage', 'Sun and Bass', 'Innovation'],
  },
};

const genres = [
  { value: 'house', label: 'House', icon: '🏠' },
  { value: 'techno', label: 'Techno', icon: '⚡' },
  { value: 'dubstep', label: 'Dubstep', icon: '🔊' },
  { value: 'trance', label: 'Trance', icon: '🌀' },
  { value: 'drum-and-bass', label: 'DnB', icon: '🥁' },
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function DjNameGenerator() {
  const [genre, setGenre] = useState('house');
  const [dj, setDj] = useState(null);

  const generate = useCallback(() => {
    const data = djData[genre];
    setDj({
      name: pick(data.names),
      sound: pick(data.sounds),
      hometown: pick(data.hometowns),
      festival: pick(data.festivals),
    });
  }, [genre]);

  return (
    <div className="space-y-4">
      {/* Genre pills */}
      <div className="flex flex-wrap gap-1.5">
        {genres.map((g) => (
          <button
            key={g.value}
            onClick={() => { setGenre(g.value); setDj(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              genre === g.value
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}
          >
            {g.icon} {g.label}
          </button>
        ))}
      </div>

      <button
        onClick={generate}
        className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors"
      >
        {dj ? 'Generate Another' : 'Generate DJ Name'}
      </button>

      {dj && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* DJ name - big and bold */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{dj.name}</p>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Signature Sound</p>
              <p className="font-medium text-sm text-text-primary">{dj.sound}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Hometown</p>
              <p className="font-medium text-sm text-text-primary">{dj.hometown}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Dream Festival</p>
              <p className="font-medium text-sm text-accent">{dj.festival}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
