'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const RUNES = [
  {
    name: 'Fehu',
    symbol: 'ᚠ',
    upright: 'Abundance, wealth, prosperity, success, good fortune',
    reversed: 'Loss, poverty, conflict, failure, scarcity',
    advice: 'Focus on building lasting abundance through wise choices.',
  },
  {
    name: 'Uruz',
    symbol: 'ᚢ',
    upright: 'Strength, health, power, vitality, determination',
    reversed: 'Weakness, exhaustion, loss of control, illness',
    advice: 'Reconnect with your inner strength and determination.',
  },
  {
    name: 'Thurisaz',
    symbol: 'ᚦ',
    upright: 'Power, protection, challenge, conflict, gateway',
    reversed: 'Vulnerability, conflict, weakness, loss of protection',
    advice: 'Face challenges directly. Use your power wisely.',
  },
  {
    name: 'Ansuz',
    symbol: 'ᚨ',
    upright: 'Communication, wisdom, messaging, clarity, inspiration',
    reversed: 'Miscommunication, confusion, lack of clarity, ignorance',
    advice: 'Seek clarity through honest communication.',
  },
  {
    name: 'Raido',
    symbol: 'ᚱ',
    upright: 'Journey, travel, movement, change, communication',
    reversed: 'Stagnation, delays, obstacles, loss of direction',
    advice: 'Embrace change and keep moving forward.',
  },
  {
    name: 'Kenaz',
    symbol: 'ᚲ',
    upright: 'Fire, light, illumination, knowledge, creativity',
    reversed: 'Darkness, confusion, ignorance, hidden obstacles',
    advice: 'Bring light to confusion. Trust your inner knowledge.',
  },
  {
    name: 'Gebo',
    symbol: 'ᚷ',
    upright: 'Gift, exchange, partnership, balance, reciprocity',
    reversed: 'Imbalance, selfishness, unequal exchange, loss',
    advice: 'Give and receive with equal measure and grace.',
  },
  {
    name: 'Wunjo',
    symbol: 'ᚹ',
    upright: 'Joy, happiness, light, pleasure, harmony',
    reversed: 'Sorrow, despair, darkness, disharmony, grief',
    advice: 'Seek joy and allow happiness to flow into your life.',
  },
  {
    name: 'Hagalaz',
    symbol: 'ᚼ',
    upright: 'Disruption, chaos, destruction, transformation, challenge',
    reversed: 'Becoming orderly, protection, clarity returning',
    advice: 'Chaos leads to transformation. Trust the process.',
  },
  {
    name: 'Nauthiz',
    symbol: 'ᚾ',
    upright: 'Necessity, constraint, hardship, friction, need',
    reversed: 'Breaking free, release, overcoming obstacles',
    advice: 'Hardship builds character. Persevere through difficulty.',
  },
  {
    name: 'Isa',
    symbol: 'ᛁ',
    upright: 'Ice, standstill, stagnation, rest, stillness',
    reversed: 'Breaking free, thawing, transformation, movement',
    advice: 'Sometimes stillness is needed before forward motion.',
  },
  {
    name: 'Jera',
    symbol: 'ᛃ',
    upright: 'Harvest, cycles, seasons, reward, resolution',
    reversed: 'Delays, immature fruit, impatience, setbacks',
    advice: 'Patience brings reward. Trust in natural cycles.',
  },
  {
    name: 'Eihwaz',
    symbol: 'ᛇ',
    upright: 'Protection, defense, resilience, endurance, reliability',
    reversed: 'Vulnerability, lack of defense, weakness, instability',
    advice: 'You are more resilient than you know.',
  },
  {
    name: 'Perthro',
    symbol: 'ᛈ',
    upright: 'Chance, mystery, initiation, hidden meaning, destiny',
    reversed: 'Bad luck, mystery remaining unsolved, blocked',
    advice: 'Trust in the mystery. Not all must be known.',
  },
  {
    name: 'Algiz',
    symbol: 'ᛉ',
    upright: 'Protection, shield, defense, guardianship, safety',
    reversed: 'Vulnerability, betrayal, broken protection, danger',
    advice: 'You are protected. Extend protection to others.',
  },
  {
    name: 'Sowulo',
    symbol: 'ᛊ',
    upright: 'Sun, light, success, wholeness, honor, victory',
    reversed: 'Defeat, darkness, loss of power, false victory',
    advice: 'Let your light shine bright. Embrace your power.',
  },
  {
    name: 'Tiwaz',
    symbol: 'ᛏ',
    upright: 'Courage, victory, discipline, honor, warrior spirit',
    reversed: 'Cowardice, defeat, injustice, broken promises',
    advice: 'Summon your courage. Fight for what matters.',
  },
  {
    name: 'Berkano',
    symbol: 'ᛒ',
    upright: 'Birch, growth, fertility, new beginning, motherhood',
    reversed: 'Stagnation, barrenness, delays, binding',
    advice: 'New growth is possible. Nurture your projects.',
  },
  {
    name: 'Ehwaz',
    symbol: 'ᛖ',
    upright: 'Horse, movement, journey, progress, transportation',
    reversed: 'Delays, separation, isolation, stagnation',
    advice: 'Keep moving forward. Partnership accelerates progress.',
  },
  {
    name: 'Mannaz',
    symbol: 'ᛘ',
    upright: 'Human, self, divine, consciousness, humanity',
    reversed: 'Ego, isolation, self-deception, broken relationships',
    advice: 'Connect with your higher self. Embrace humanity.',
  },
  {
    name: 'Laguz',
    symbol: 'ᛚ',
    upright: 'Water, flow, intuition, emotions, healing, renewal',
    reversed: 'Stagnant emotions, blocked intuition, confusion, inertia',
    advice: 'Flow with life. Trust your intuition and emotions.',
  },
  {
    name: 'Ingwaz',
    symbol: 'ᛝ',
    upright: 'Inguz, completion, accomplishment, fertility, new start',
    reversed: 'Stagnation, loss of energy, incomplete, blocked',
    advice: 'You are ready. Complete what you began.',
  },
  {
    name: 'Othala',
    symbol: 'ᛟ',
    upright: 'Home, heritage, ancestry, inheritance, prosperity',
    reversed: 'Loss of home, broken inheritance, displacement',
    advice: 'Honor your roots. Build your legacy.',
  },
  {
    name: 'Dagaz',
    symbol: 'ᛞ',
    upright: 'Day, breakthrough, clarity, light, transformation',
    reversed: 'Darkness, confusion, night, hidden aspects',
    advice: 'Breakthrough is near. Clarity illuminates the path.',
  },
];

export default function RuneStoneReader() {
  const [spread, setSpread] = useState('single');
  const [runes, setRunes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const castRunes = () => {
    setIsDrawing(true);
    setRunes([]);

    const runeCount =
      spread === 'single' ? 1 : spread === 'three' ? 3 : 5;

    setTimeout(() => {
      const newRunes = [];
      for (let i = 0; i < runeCount; i++) {
        const randomRune = RUNES[Math.floor(Math.random() * RUNES.length)];
        const isReversed = Math.random() < 0.5;
        newRunes.push({ ...randomRune, isReversed, index: i });
      }
      setRunes(newRunes);
      setIsDrawing(false);
    }, 1200);
  };

  const getPositionLabel = (index) => {
    if (spread === 'single') return 'Your Rune';
    if (spread === 'three') {
      return ['Past', 'Present', 'Future'][index];
    }
    return ['Centre', 'Challenge', 'Guidance', 'Outcome', 'Destiny'][index];
  };

  return (
    <div className="space-y-4">
      {/* Spread Selection */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Choose Your Spread
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'single', label: 'Single Rune' },
                { id: 'three', label: 'Three Runes (Past/Present/Future)' },
                { id: 'cross', label: 'Five Rune Spread' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSpread(option.id)}
                  className={`p-3 rounded-lg border-2 transition-all font-medium ${
                    spread === option.id
                      ? 'border-amber-600 bg-amber-100 text-amber-700'
                      : 'border-text-muted bg-white text-text-secondary hover:border-amber-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={castRunes}
            disabled={isDrawing}
            className="w-full"
            size="lg"
          >
            {isDrawing ? 'Casting Runes...' : 'Cast the Runes'}
          </Button>
        </div>
      </Card>

      {/* Runes Display */}
      {runes.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {runes.map((rune, idx) => (
              <div
                key={idx}
                className="animate-fadeIn"
                style={{
                  animation: `fadeIn 0.6s ease-in-out ${idx * 0.25}s both`,
                }}
              >
                <style>{`
                  @keyframes fadeIn {
                    0% { opacity: 0; transform: scale(0.5) rotate(180deg); }
                    100% { opacity: 1; transform: scale(1) rotate(0deg); }
                  }
                `}</style>

                <Card
                  className={`text-center space-y-2 p-4 bg-gradient-to-br ${
                    rune.isReversed
                      ? 'from-gray-700 to-gray-900'
                      : 'from-amber-700 to-yellow-800'
                  } text-white transform ${rune.isReversed ? 'rotate-180' : ''}`}
                >
                  <p className="text-xs font-mono opacity-75">
                    {getPositionLabel(idx)}
                  </p>
                  <p className="text-4xl font-bold">{rune.symbol}</p>
                  <p className="font-heading font-bold text-sm">{rune.name}</p>
                  {rune.isReversed && (
                    <p className="text-xs bg-red-500  rounded px-2 py-1 inline-block mx-auto">
                      Reversed
                    </p>
                  )}
                </Card>
              </div>
            ))}
          </div>

          {/* Rune Meanings */}
          <Card className="mt-6 space-y-4">
            <h3 className="font-heading text-xl font-bold text-text-primary">
              Rune Meanings
            </h3>

            <div className="space-y-4">
              {runes.map((rune, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-surface border-l-4 border-amber-600"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="text-3xl">{rune.symbol}</div>
                    <div>
                      <p className="text-xs font-mono text-text-secondary mb-1">
                        {getPositionLabel(idx)}
                      </p>
                      <p className="font-heading font-bold text-text-primary">
                        {rune.name}
                        {rune.isReversed && ' (Reversed)'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 ml-3">
                    <p className="text-sm text-text-secondary">
                      <span className="font-semibold">Meaning: </span>
                      {rune.isReversed ? rune.reversed : rune.upright}
                    </p>
                    <p className="text-sm text-text-secondary">
                      <span className="font-semibold">Guidance: </span>
                      {rune.advice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Button
            variant="secondary"
            onClick={castRunes}
            disabled={isDrawing}
            className="w-full mt-4"
          >
            Cast Again
          </Button>
        </div>
      )}

      {/* Info */}
      <details className="text-xs text-text-muted">
        <summary className="cursor-pointer hover:text-text-secondary">About runes</summary>
        <div className="mt-2 space-y-2">
          <p>The Elder Futhark is an ancient Germanic alphabet used for divination
            and spiritual insight. Each rune carries Norse wisdom and symbolism.
            Rune readings offer guidance by revealing patterns and messages from
            the subconscious. This tool is for entertainment and reflection.</p>
          <p className="font-semibold">How to interpret:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Upright: Active, positive expression of the rune</li>
            <li>Reversed: Blocked or shadow aspect of the rune</li>
            <li>Position matters: Context shapes meaning</li>
            <li>Trust your intuition when interpreting</li>
          </ul>
        </div>
      </details>
    </div>
  );
}
