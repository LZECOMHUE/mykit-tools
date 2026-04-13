'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const djData = {
  house: {
    names: ['DJ Neonwave', 'DJ Soulbeat', 'DJ Velvet', 'DJ Chromatic', 'DJ Euphoria'],
    sounds: ['Melodic progressive house', 'Deep house grooves', 'Tech house fusion', 'Soulful house vibes', 'Progressive house journey'],
    hometowns: ['Berlin', 'Ibiza', 'Amsterdam', 'London', 'Barcelona'],
    festivals: ['Tomorrowland', 'Ultra', 'Awakenings', 'Paradise Lost', 'Electric Zoo'],
  },
  techno: {
    names: ['DJ Onyx', 'DJ Cipher', 'DJ Monolith', 'DJ Pulse', 'DJ Steel'],
    sounds: ['Industrial techno', 'Minimal techno', 'Peak hour techno', 'Acid techno', 'Hypnotic techno'],
    hometowns: ['Detroit', 'Cologne', 'Berlin', 'Frankfurt', 'Brussels'],
    festivals: ['Awakenings', 'Berghain', 'Tresor', 'Movement', 'Time Warp'],
  },
  dubstep: {
    names: ['DJ Bassquake', 'DJ Wobble', 'DJ Shattercore', 'DJ Subsonic', 'DJ Noisevault'],
    sounds: ['Future bass dubstep', 'Brostep wobble', 'Deep dubstep', 'Halftime dubstep', 'Liquid dubstep fusion'],
    hometowns: ['London', 'Los Angeles', 'Bristol', 'Tokyo', 'Toronto'],
    festivals: ['EDC', 'Fabric Live', 'Outlook', 'SMF', 'Snowglobe'],
  },
  trance: {
    names: ['DJ Ethereal', 'DJ Skyrise', 'DJ Lumina', 'DJ Transcend', 'DJ Horizon'],
    sounds: ['Uplifting trance', 'Progressive trance', 'Psytrance', 'Techno trance', 'Melodic trance'],
    hometowns: ['Ibiza', 'Amsterdam', 'Athens', 'Tel Aviv', 'Istanbul'],
    festivals: ['Trance Energy', 'Transmission', 'Awakenings', 'Full On!', 'Sun Dancing'],
  },
  'drum-and-bass': {
    names: ['DJ Velocity', 'DJ Rushbeat', 'DJ Breakcore', 'DJ Neurofunk', 'DJ Liquid'],
    sounds: ['Liquid funk', 'Neurofunk', 'Jump-up', 'Techstep', 'Atmospheric liquid'],
    hometowns: ['London', 'Bristol', 'Manchester', 'Tokyo', 'Melbourne'],
    festivals: ['Let It Roll', 'Hospitality', 'Fabric Live', 'Rampage', 'Hospital Sundays'],
  },
};

export default function DjNameGenerator() {
  const [genre, setGenre] = useState('house');
  const [djName, setDjName] = useState(null);

  const generateDj = () => {
    const data = djData[genre];

    const name = data.names[Math.floor(Math.random() * data.names.length)];
    const sound = data.sounds[Math.floor(Math.random() * data.sounds.length)];
    const hometown = data.hometowns[Math.floor(Math.random() * data.hometowns.length)];
    const festival = data.festivals[Math.floor(Math.random() * data.festivals.length)];

    setDjName({
      name,
      sound,
      hometown,
      festival,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Music Genre
          </label>
          <Select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            options={[
              { value: 'house', label: 'House' },
              { value: 'techno', label: 'Techno' },
              { value: 'dubstep', label: 'Dubstep' },
              { value: 'trance', label: 'Trance' },
              { value: 'drum-and-bass', label: 'Drum and Bass' },
            ]}
          />
        </div>

        <Button onClick={generateDj} className="bg-accent text-white w-full">
          Generate DJ Name
        </Button>
      </div>

      {djName && (
        <div className="bg-purple-600 text-white border border-purple-500 rounded-[var(--radius-card)] space-y-4">
          <div>
            <p className="font-heading text-4xl font-bold">{djName.name}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4">
            <p className="text-xs opacity-75 uppercase tracking-wider mb-1">Signature Sound</p>
            <p className="text-lg font-medium">{djName.sound}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-3">
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Hometown</p>
              <p className="text-lg font-medium">{djName.hometown}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Dream Festival Booking</p>
              <p className="text-lg font-medium">{djName.festival}</p>
            </div>
          </div>

          <Button onClick={generateDj} variant="secondary" className="bg-white text-purple-600 w-full mt-4">
            Generate Another
          </Button>
        </div>
      )}
    </div>
  );
}
