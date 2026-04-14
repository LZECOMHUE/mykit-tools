'use client';

import { useState, useMemo } from 'react';

const categories = [
  { value: 'cute', label: 'Cute', icon: '🥰' },
  { value: 'cool', label: 'Cool', icon: '😎' },
  { value: 'funny', label: 'Funny', icon: '😂' },
  { value: 'sporty', label: 'Sporty', icon: '🏆' },
  { value: 'royal', label: 'Royal', icon: '👑' },
  { value: 'gamer', label: 'Gamer', icon: '🎮' },
];

export default function NicknameGenerator() {
  const [name, setName] = useState('Alexander');
  const [style, setStyle] = useState('cute');

  const nicknames = useMemo(() => {
    if (!name || name.length === 0) return [];

    const n = name.toLowerCase();
    const firstLetter = n[0];
    const lastLetter = n[n.length - 1];
    const firstSyllable = n.substring(0, Math.ceil(n.length / 2));

    const styles = {
      cute: [
        `${firstSyllable}ie`,
        `${firstSyllable}kins`,
        `${firstSyllable}y`,
        `${firstSyllable}poo`,
        `little ${firstLetter}`,
        `${firstSyllable}sweet`,
        `${firstSyllable}cup`,
        `honey${firstLetter}`,
      ],
      cool: [
        `${firstLetter}${lastLetter}`,
        `${firstSyllable}${firstLetter}`,
        `${lastLetter}man`,
        `the ${firstLetter}`,
        `${firstSyllable}force`,
        `${firstSyllable}master`,
        `captain ${firstLetter}`,
        `${firstSyllable}pro`,
      ],
      funny: [
        `${firstSyllable}zilla`,
        `${name} the great`,
        `professor ${firstSyllable}`,
        `${firstSyllable}tron`,
        `the ${firstSyllable}ster`,
        `${name} the magnificent`,
        `${firstSyllable}plex`,
        `mighty ${firstSyllable}`,
      ],
      sporty: [
        `${firstSyllable}ball`,
        `turbo ${firstSyllable}`,
        `flash ${firstLetter}`,
        `${firstSyllable}hawk`,
        `speed ${firstSyllable}`,
        `${firstSyllable}bolt`,
        `power ${firstSyllable}`,
        `athlete ${firstLetter}`,
      ],
      royal: [
        `king ${firstSyllable}`,
        `lord ${name}`,
        `his majesty ${firstSyllable}`,
        `prince ${firstSyllable}`,
        `the great ${firstSyllable}`,
        `duchess ${name}`,
        `sir ${firstSyllable}`,
        `emperor ${firstSyllable}`,
      ],
      gamer: [
        `x${firstSyllable}x`,
        `${firstSyllable}_pro`,
        `dark${firstSyllable}`,
        `${firstLetter}${lastLetter}_gaming`,
        `${firstSyllable}slayer`,
        `legend_${firstSyllable}`,
        `${firstSyllable}nova`,
        `epic_${firstLetter}`,
      ],
    };

    const selectedStyle = styles[style] || styles.cute;
    return selectedStyle.map((nick) => nick.charAt(0).toUpperCase() + nick.slice(1));
  }, [name, style]);

  const handleCopy = (nickname) => {
    navigator.clipboard.writeText(nickname).catch(() => {});
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button key={c.value} onClick={() => setStyle(c.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              style === c.value ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}>{c.icon} {c.label}</button>
        ))}
      </div>

      {nicknames.length > 0 && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3">
            <p className="text-sm text-gray-300">Nicknames for <span className="font-bold text-white">{name}</span></p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            {nicknames.map((nickname, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(nickname)}
                className="bg-white px-4 py-3 text-left group hover:bg-blue-50 transition-colors"
              >
                <p className="font-medium text-sm text-text-primary">{nickname}</p>
                <p className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">Click to copy</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
