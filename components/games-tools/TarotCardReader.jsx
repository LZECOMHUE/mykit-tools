'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const MAJOR_ARCANA = [
  {
    name: 'The Fool',
    upright:
      'New beginnings, spontaneity, innocence, free spirit, taking risks',
    reversed: 'Recklessness, ignorance, delay, indecision, naivety',
  },
  {
    name: 'The Magician',
    upright: 'Power, inspired action, will, manifestation, resourcefulness',
    reversed: 'Manipulation, poor planning, lack of action, lost power',
  },
  {
    name: 'The High Priestess',
    upright: 'Intuition, sacred knowledge, divine feminine, the subconscious',
    reversed:
      'Withdrawal, silence, hidden agendas, lack of introspection, secrets',
  },
  {
    name: 'The Empress',
    upright:
      'Fertility, beauty, abundance, nurturing, nature, sensuality, power',
    reversed:
      'Blocked creativity, dependence, vanity, poor self-care, creative block',
  },
  {
    name: 'The Emperor',
    upright:
      'Authority, establishment, control, power, leadership, discipline',
    reversed:
      'Domination, rigidity, lack of control, stubbornness, inflexibility',
  },
  {
    name: 'The Hierophant',
    upright:
      'Tradition, conformity, education, beliefs, spirituality, ethics',
    reversed:
      'Rebellion, unorthodoxy, breaking tradition, personal beliefs, freedom',
  },
  {
    name: 'The Lovers',
    upright:
      'Relationships, choice, alignment, beliefs, values, honesty, openness',
    reversed:
      'Misalignment, conflict, bad communication, imbalance, disconnection',
  },
  {
    name: 'The Chariot',
    upright: 'Control, willpower, determination, success, drive, momentum',
    reversed: 'Self-doubt, lack of control, obstacles, powerlessness, blocked',
  },
  {
    name: 'Strength',
    upright:
      'Strength, courage, patience, control, inner power, determination, faith',
    reversed:
      'Inner weakness, self-doubt, lack of confidence, powerlessness, insecurity',
  },
  {
    name: 'The Hermit',
    upright:
      'Soul searching, introspection, inner wisdom, reflection, self-discovery',
    reversed:
      'Isolation, loneliness, withdrawal, lack of introspection, lost direction',
  },
  {
    name: 'Wheel of Fortune',
    upright:
      'Good luck, karma, life cycles, destiny, fate, fortune, closure',
    reversed:
      'Bad luck, reversal of fortune, negative cycles, lack of control, delays',
  },
  {
    name: 'Justice',
    upright:
      'Justice, fairness, truth, cause and effect, accountability, clarity',
    reversed:
      'Injustice, unfairness, lack of accountability, dishonesty, guilt, bias',
  },
  {
    name: 'The Hanged Man',
    upright:
      'Pause, perspective shift, restriction, letting go, suspension, enlightenment',
    reversed:
      'Stalling, resistance to change, unwillingness to see another view',
  },
  {
    name: 'Death',
    upright:
      'Ending, beginning, transition, transformation, passage, cycles, endings',
    reversed:
      'Resistance to change, inability to move forward, stagnation, stuck',
  },
  {
    name: 'Temperance',
    upright:
      'Balance, moderation, harmony, patience, purpose, self-discipline',
    reversed:
      'Imbalance, excess, conflict, lack of harmony, extremism, disharmony',
  },
  {
    name: 'The Devil',
    upright:
      'Bondage, vice, sexuality, materialism, playfulness, power, sexuality',
    reversed:
      'Release, detachment, honesty, reclamation of power, breaking free',
  },
  {
    name: 'The Tower',
    upright:
      'Sudden change, upheaval, chaos, revelation, conflict, danger, destruction',
    reversed:
      'Avoidance of disaster, delaying the inevitable, escaping a difficult',
  },
  {
    name: 'The Star',
    upright:
      'Hope, clarity, inspiration, spirituality, renewal, sense of purpose',
    reversed:
      'Lack of hope, despair, disconnection, lack of faith, self-doubt',
  },
  {
    name: 'The Moon',
    upright:
      'Illusion, intuition, uncertainty, subconsciousness, fear, dreams, anxiety',
    reversed:
      'Clarity, truth, insight, confusion releasing, understanding, inner strength',
  },
  {
    name: 'The Sun',
    upright:
      'Success, vitality, joy, celebration, positivity, enlightenment, truth',
    reversed:
      'Lack of success, depression, sadness, retreat, defeat, melancholy',
  },
  {
    name: 'Judgement',
    upright:
      'Reckoning, awakening, spiritual calling, renewal, purpose, absolution',
    reversed:
      'Doubt, hesitation, harsh self-criticism, lack of self-awareness',
  },
  {
    name: 'The World',
    upright:
      'Completion, accomplishment, travel, fulfillment, wholeness, unity',
    reversed:
      'Incomplete, unfulfilled, seeking closure, blockage, lack of closure',
  },
];

export default function TarotCardReader() {
  const [spread, setSpread] = useState('single');
  const [cards, setCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCards = () => {
    setIsDrawing(true);
    setCards([]);

    const cardCount =
      spread === 'single' ? 1 : spread === 'three' ? 3 : 5;
    const newCards = [];

    for (let i = 0; i < cardCount; i++) {
      setTimeout(() => {
        const randomCard =
          MAJOR_ARCANA[Math.floor(Math.random() * MAJOR_ARCANA.length)];
        const isReversed = Math.random() < 0.5;
        newCards.push({ ...randomCard, isReversed, index: i });
        setCards([...newCards]);
      }, i * 300);
    }

    setTimeout(() => {
      setIsDrawing(false);
    }, cardCount * 300 + 500);
  };

  const getCardLabel = (index) => {
    if (spread === 'single') return 'Your Card';
    if (spread === 'three') {
      return ['Past', 'Present', 'Future'][index];
    }
    return ['Significator', 'Challenge', 'Guidance', 'Outcome', 'Advice'][
      index
    ];
  };

  return (
    <div className="space-y-4">
      {/* Spread Selection */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Choose Your Reading
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'single', label: 'Single Card', icon: '1' },
                { id: 'three', label: 'Three Card (Past/Present/Future)', icon: '3' },
                { id: 'cross', label: 'Celtic Cross (5-Card)', icon: '+' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSpread(option.id)}
                  className={`p-3 rounded-lg border-2 transition-all font-medium ${
                    spread === option.id
                      ? 'border-purple-600 bg-purple-100 text-purple-700'
                      : 'border-text-muted bg-white text-text-secondary hover:border-purple-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={drawCards}
            disabled={isDrawing}
            className="w-full"
            size="lg"
          >
            {isDrawing ? 'Drawing Cards...' : 'Draw Cards'}
          </Button>
        </div>
      </Card>

      {/* Cards Display */}
      {cards.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="animate-fadeIn"
                style={{
                  animation: `fadeIn 0.6s ease-in-out ${idx * 0.2}s both`,
                }}
              >
                <style>{`
                  @keyframes fadeIn {
                    0% { opacity: 0; transform: rotateY(180deg) scale(0.8); }
                    100% { opacity: 1; transform: rotateY(0deg) scale(1); }
                  }
                `}</style>

                <Card
                  className={`text-white text-center space-y-3 p-4 bg-gradient-to-br ${
                    card.isReversed
                      ? 'from-gray-700 to-gray-900'
                      : 'from-purple-700 to-indigo-900'
                  } transform ${card.isReversed ? 'rotate-180' : ''}`}
                >
                  <p className="text-xs font-mono opacity-75">{getCardLabel(idx)}</p>
                  <p className="font-heading font-bold text-lg leading-tight">
                    {card.name}
                  </p>
                  {card.isReversed && (
                    <p className="text-xs bg-red-500  rounded px-2 py-1 inline-block mx-auto">
                      Reversed
                    </p>
                  )}
                </Card>
              </div>
            ))}
          </div>

          {/* Card Meanings */}
          <Card className="mt-6 space-y-4">
            <h3 className="font-heading text-xl font-bold text-text-primary">
              Card Meanings
            </h3>

            <div className="space-y-4">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-surface border-l-4 border-purple-500"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-mono text-text-secondary mb-1">
                        {getCardLabel(idx)}
                      </p>
                      <p className="font-heading font-bold text-text-primary">
                        {card.name}
                        {card.isReversed && ' (Reversed)'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {card.isReversed ? card.reversed : card.upright}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Button
            variant="secondary"
            onClick={drawCards}
            disabled={isDrawing}
            className="w-full mt-4"
          >
            Draw Again
          </Button>
        </div>
      )}

      {/* Info */}
      <details className="text-xs text-text-muted">
        <summary className="cursor-pointer hover:text-text-secondary">About this tool</summary>
        <p className="mt-2">Tarot is an ancient divination system using 22 Major Arcana cards.
          Each card carries deep symbolic meaning. This reading is for
          entertainment and spiritual reflection only.</p>
      </details>
    </div>
  );
}
