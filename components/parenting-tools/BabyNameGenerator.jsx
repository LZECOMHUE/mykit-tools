'use client';

import { useState, useMemo } from 'react';

const babyNames = {
  male: {
    classic: ['James', 'William', 'Benjamin', 'Alexander', 'Michael', 'Daniel', 'Matthew', 'David', 'Joseph', 'Charles', 'Edward', 'Henry', 'Thomas', 'George', 'Samuel'],
    modern: ['Liam', 'Noah', 'Oliver', 'Elijah', 'Logan', 'Lucas', 'Mason', 'Ethan', 'Aiden', 'Jackson', 'Jayden', 'Leo', 'Wyatt', 'Julian', 'Kai'],
    unique: ['Atlas', 'Phoenix', 'Sage', 'Silas', 'Ezra', 'Finn', 'Rowan', 'Orion', 'Jasper', 'Caspian', 'Cosmo', 'Theron', 'Maximus', 'Storm', 'Zephyr'],
  },
  female: {
    classic: ['Mary', 'Elizabeth', 'Catherine', 'Eleanor', 'Victoria', 'Margaret', 'Julia', 'Rose', 'Emma', 'Grace', 'Charlotte', 'Amelia', 'Dorothy', 'Helen', 'Anne'],
    modern: ['Sophia', 'Olivia', 'Ava', 'Isabella', 'Mia', 'Evelyn', 'Scarlett', 'Emily', 'Harper', 'Madison', 'Ella', 'Abigail', 'Lily', 'Luna', 'Nora'],
    unique: ['Aria', 'Aurora', 'Iris', 'Opal', 'Sienna', 'Nova', 'Luna', 'Hazel', 'Eden', 'Willow', 'Ivy', 'Aurora', 'Ember', 'Sage', 'Astrid'],
  },
};

const nameMeanings = {
  James: 'Supplanter', William: 'Resolute protector', Benjamin: 'Son of the right hand', Alexander: 'Defender of men',
  Liam: 'Strong-willed warrior', Noah: 'Rest, comfort', Oliver: 'Olive tree', Elijah: 'My God is Yahweh',
  Atlas: 'Bearer of the heavens', Phoenix: 'Reborn', Sage: 'Wise', Silas: 'From the forest',
  Mary: 'Of the sea', Elizabeth: 'God is my oath', Catherine: 'Pure', Eleanor: 'Bright, shining light',
  Sophia: 'Wisdom', Olivia: 'Olive tree', Ava: 'Life', Isabella: 'Devoted to God',
  Aria: 'Air', Aurora: 'Dawn', Iris: 'Rainbow', Opal: 'Gem',
};

export default function BabyNameGenerator() {
  const [gender, setGender] = useState('male');
  const [style, setStyle] = useState('modern');
  const [startingLetter, setStartingLetter] = useState('');
  const [liked, setLiked] = useState([]);
  const [showShortlist, setShowShortlist] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredNames = useMemo(() => {
    let names = [...babyNames[gender][style]];
    if (startingLetter) {
      names = names.filter((n) => n.toLowerCase().startsWith(startingLetter.toLowerCase()));
    }
    return names;
  }, [gender, style, startingLetter]);

  const currentName = filteredNames[currentIndex] || '';

  const handleLike = () => {
    if (currentName && !liked.includes(currentName)) {
      setLiked([...liked, currentName]);
    }
    handleNext();
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % filteredNames.length);
  };

  const handleRemoveLiked = (name) => {
    setLiked(liked.filter((n) => n !== name));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Controls */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setCurrentIndex(0);
                setLiked([]);
              }}
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              <option value="male">Boys</option>
              <option value="female">Girls</option>
            </select>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Style</label>
            <select
              value={style}
              onChange={(e) => {
                setStyle(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="unique">Unique</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Starting Letter (optional)</label>
          <input
            type="text"
            maxLength="1"
            value={startingLetter}
            onChange={(e) => {
              setStartingLetter(e.target.value);
              setCurrentIndex(0);
            }}
            placeholder="Leave blank for all"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>
      </div>

      {filteredNames.length > 0 ? (
        <>
          {/* Name Display */}
          <div className="bg-accent-muted border-2 border-accent rounded-[var(--radius-card)] p-8 text-center space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-2">Current name</p>
              <p className="font-heading text-4xl font-bold text-text-primary">{currentName}</p>
            </div>
            {nameMeanings[currentName] && (
              <p className="text-text-secondary text-sm italic">"{nameMeanings[currentName]}"</p>
            )}
            <div className="text-text-muted text-xs">
              {currentIndex + 1} of {filteredNames.length}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleLike}
              className="flex-1 px-6 py-3 bg-accent-warm text-white rounded-[var(--radius-input)] font-medium hover:bg-amber-500 transition-colors"
            >
              ❤️ Love It
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-white border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-surface transition-colors"
            >
              Next
            </button>
          </div>

          {/* Shortlist */}
          {liked.length > 0 && (
            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-text-primary font-semibold">Your Shortlist</h3>
                <button
                  onClick={() => setShowShortlist(!showShortlist)}
                  className="text-sm text-accent font-medium"
                >
                  {showShortlist ? 'Hide' : 'Show'} ({liked.length})
                </button>
              </div>
              {showShortlist && (
                <div className="space-y-2">
                  {liked.map((name) => (
                    <div key={name} className="flex justify-between items-center py-2 px-3 bg-white rounded-[var(--radius-input)] border border-border">
                      <span className="font-medium text-text-primary">{name}</span>
                      <button
                        onClick={() => handleRemoveLiked(name)}
                        className="text-error text-sm font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center text-text-muted">
          <p>No names found with that filter. Try a different letter or style.</p>
        </div>
      )}
    </div>
  );
}
