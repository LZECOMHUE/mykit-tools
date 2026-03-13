'use client';
import { useState } from 'react';

const PHONICS_DATA = {
  '3-5': {
    sounds: [
      { sound: 's', words: ['sun', 'sit', 'see', 'sat', 'sad'] },
      { sound: 'a', words: ['ant', 'apple', 'arm', 'art', 'ask'] },
      { sound: 't', words: ['top', 'ten', 'tap', 'tin', 'toy'] },
      { sound: 'p', words: ['pig', 'pen', 'pan', 'pet', 'put'] },
      { sound: 'i', words: ['ink', 'in', 'is', 'it', 'ill'] },
      { sound: 'n', words: ['nose', 'net', 'not', 'nap', 'no'] },
      { sound: 'm', words: ['mum', 'man', 'mat', 'mix', 'mom'] },
      { sound: 'd', words: ['dog', 'day', 'did', 'dig', 'dad'] }
    ]
  },
  '5-7': {
    sounds: [
      { sound: 'ch', words: ['chat', 'chap', 'chip', 'chop', 'chin'] },
      { sound: 'sh', words: ['shop', 'shut', 'ship', 'shin', 'shot'] },
      { sound: 'th', words: ['the', 'that', 'this', 'them', 'then'] },
      { sound: 'ou', words: ['out', 'our', 'loud', 'house', 'about'] },
      { sound: 'oi', words: ['oil', 'coin', 'join', 'boil', 'point'] },
      { sound: 'ar', words: ['car', 'far', 'star', 'park', 'dark'] },
      { sound: 'or', words: ['or', 'for', 'corn', 'horn', 'form'] },
      { sound: 'ur', words: ['fur', 'turn', 'burn', 'hurt', 'blur'] },
      { sound: 'igh', words: ['high', 'light', 'night', 'sight', 'right'] },
      { sound: 'oa', words: ['boat', 'coat', 'goat', 'road', 'toad'] }
    ]
  }
};

export default function PhonicsTreasureHunt() {
  const [config, setConfig] = useState({
    ageGroup: '5-7',
    stations: '8'
  });

  const [hunt, setHunt] = useState(null);
  const [selectedSounds, setSelectedSounds] = useState([]);

  const availableSounds = PHONICS_DATA[config.ageGroup]?.sounds || [];

  const handleSelectSound = (sound) => {
    setSelectedSounds(prev => {
      if (prev.includes(sound)) {
        return prev.filter(s => s !== sound);
      }
      return [...prev, sound];
    });
  };

  const handleGenerate = () => {
    const soundsToUse = selectedSounds.length > 0
      ? selectedSounds
      : availableSounds.slice(0, parseInt(config.stations)).map(s => s.sound);

    const stationCount = parseInt(config.stations);
    const stations = [];

    for (let i = 0; i < stationCount && i < soundsToUse.length; i++) {
      const sound = soundsToUse[i];
      const soundData = availableSounds.find(s => s.sound === sound);
      stations.push({
        number: i + 1,
        sound: sound,
        words: soundData ? soundData.words : []
      });
    }

    setHunt(stations);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Age Group</label>
          <div className="grid grid-cols-2 gap-2">
            {['3-5', '5-7'].map(age => (
              <button
                key={age}
                onClick={() => {
                  setConfig(c => ({ ...c, ageGroup: age }));
                  setSelectedSounds([]);
                }}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition ${
                  config.ageGroup === age
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {age} years old
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Number of Stations</label>
          <div className="grid grid-cols-3 gap-2">
            {['5', '8', '10'].map(num => (
              <button
                key={num}
                onClick={() => setConfig(c => ({ ...c, stations: num }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition ${
                  config.stations === num
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {num} stations
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Sounds to Practice</label>
          <p className="text-text-muted text-sm mb-3">Select specific sounds or leave blank to auto-select</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableSounds.map(({ sound }) => (
              <button
                key={sound}
                onClick={() => handleSelectSound(sound)}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-mono font-bold transition ${
                  selectedSounds.includes(sound)
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {sound}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
        >
          Create Phonics Treasure Hunt
        </button>
      </div>

      {hunt && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">
              Phonics Treasure Hunt Setup
            </h2>
            <p className="text-text-secondary mb-6">
              Hide letter cards at {hunt.length} different stations. Kids visit each station to find and collect the letters, then build words.
            </p>

            <div className="space-y-6">
              {hunt.map(station => (
                <div key={station.number} className="bg-white border border-border rounded-[var(--radius-input)] p-4">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-mono text-accent font-bold text-2xl">Station {station.number}</span>
                      <span className="font-heading font-bold text-text-primary text-xl">Sound: {station.sound}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-heading font-semibold text-text-primary mb-2">Words with this sound:</h4>
                    <div className="flex flex-wrap gap-2">
                      {station.words.map((word, i) => (
                        <span key={i} className="font-mono bg-accent-muted text-accent px-3 py-1 rounded-[var(--radius-input)] font-medium">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded p-3">
                    <p className="text-amber-900 text-sm">
                      <span className="font-semibold">Hide at this station:</span> Large letter cards showing "{station.sound}" in multiple places around the station area. Kids collect these cards to make words.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-[var(--radius-input)]">
              <h3 className="font-heading font-semibold text-blue-900 mb-3">How to Play</h3>
              <ol className="text-blue-800 text-sm space-y-2 list-inside">
                <li>1. Print large letter cards for each sound</li>
                <li>2. Hide cards around each station</li>
                <li>3. Children visit each station and collect the letter cards</li>
                <li>4. Use collected cards to build words from the word list</li>
                <li>5. Celebrate as they discover new words!</li>
              </ol>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-[var(--radius-input)]">
              <h3 className="font-heading font-semibold text-green-900 mb-2">Pro Tips</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>- Use bright coloured paper for easy spotting</li>
                <li>- Hide cards at different heights so kids search carefully</li>
                <li>- Give clues if kids get stuck (sing the sound or give hints)</li>
                <li>- Reward kids with stickers when they complete words</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGenerate}
              className="bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
            >
              Create Another
            </button>
            <button
              onClick={() => window.print()}
              className="bg-white border border-border text-text-primary py-3 rounded-[var(--radius-input)] font-medium hover:bg-surface transition"
            >
              Print Instructions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
