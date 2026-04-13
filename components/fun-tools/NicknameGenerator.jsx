'use client';

import { useState, useMemo } from 'react';

export default function NicknameGenerator() {
  const [name, setName] = useState('Alexander');
  const [style, setStyle] = useState('cute');

  const generateNicknames = useMemo(() => {
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
    };

    const selectedStyle = styles[style] || styles.cute;
    return selectedStyle.map((nick) => nick.charAt(0).toUpperCase() + nick.slice(1));
  }, [name, style]);

  const handleCopy = (nickname) => {
    navigator.clipboard.writeText(nickname).catch(() => {});
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-text-primary font-medium mb-2">Enter a Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name here"
          className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-text-primary font-medium mb-2">Style</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="cute">Cute</option>
          <option value="cool">Cool</option>
          <option value="funny">Funny</option>
          <option value="sporty">Sporty</option>
          <option value="royal">Royal</option>
        </select>
      </div>

      {generateNicknames.length > 0 && (
        <div className="space-y-3">
          <p className="text-text-primary font-medium">
            Nicknames for {name}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {generateNicknames.map((nickname, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-surface rounded-[var(--radius-card)] hover:bg-blue-50 transition group cursor-pointer"
                onClick={() => handleCopy(nickname)}
              >
                <p className="text-text-primary font-medium">{nickname}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(nickname);
                  }}
                  className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-accent text-white text-xs font-medium rounded-[var(--radius-input)] transition"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
