'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const ORACLE_CARDS = [
  {
    name: 'Trust Yourself',
    category: 'growth',
    message: 'Your inner wisdom knows the way. Listen to that quiet voice within.',
    affirmation: 'I trust my intuition and my ability to navigate my path.',
  },
  {
    name: 'Love is Near',
    category: 'love',
    message:
      'Whether romantic or platonic, deep connection is approaching. Open your heart.',
    affirmation: 'I am worthy of love and surrounded by kindness.',
  },
  {
    name: 'Abundance Flows',
    category: 'growth',
    message:
      'Prosperity in all forms is coming to you. Stay grateful and receptive.',
    affirmation: 'I attract abundance effortlessly into my life.',
  },
  {
    name: 'Let Go',
    category: 'healing',
    message:
      'Release what no longer serves you. Freedom lies on the other side of letting go.',
    affirmation: 'I release what I cannot control with grace.',
  },
  {
    name: 'New Beginnings',
    category: 'growth',
    message:
      'A fresh start is unfolding. Embrace the exciting changes ahead with courage.',
    affirmation: 'I welcome new chapters with an open heart.',
  },
  {
    name: 'You Are Strong',
    category: 'healing',
    message:
      'You have overcome before and you will overcome again. Your strength is extraordinary.',
    affirmation: 'My resilience carries me through every challenge.',
  },
  {
    name: 'Follow Your Passion',
    category: 'career',
    message:
      'What makes you come alive? Now is the time to pursue it. Your soul knows the way.',
    affirmation: 'I am aligned with my true purpose and passion.',
  },
  {
    name: 'Healing Begins',
    category: 'healing',
    message:
      'Whether physical, emotional, or spiritual, your healing journey is underway.',
    affirmation: 'I am healing and whole.',
  },
  {
    name: 'Adventure Awaits',
    category: 'adventure',
    message:
      'Take that leap. The world has magic waiting for the brave. Explore and discover.',
    affirmation: 'I embrace life as an adventure full of possibilities.',
  },
  {
    name: 'Gratitude Multiplies',
    category: 'growth',
    message:
      'What you appreciate grows. Find three small blessings to celebrate today.',
    affirmation: 'Gratitude opens all doors in my life.',
  },
  {
    name: 'You Are Enough',
    category: 'healing',
    message:
      'You do not need to earn love, prove your worth, or become more. You are already enough.',
    affirmation: 'I am complete and worthy exactly as I am.',
  },
  {
    name: 'Boundaries Are Healthy',
    category: 'growth',
    message:
      'Saying no to what does not serve you is an act of self-love. Protect your peace.',
    affirmation: 'I honor my needs and set loving boundaries.',
  },
  {
    name: 'Connection Deepens',
    category: 'love',
    message:
      'Whether with a person or community, meaningful bonds are strengthening.',
    affirmation: 'I cultivate deep and authentic connections.',
  },
  {
    name: 'Align With Your Values',
    category: 'growth',
    message:
      'When your actions match your beliefs, power returns. Get clear on what matters.',
    affirmation: 'I live in alignment with my deepest values.',
  },
  {
    name: 'Forgive Yourself',
    category: 'healing',
    message:
      'You did the best you could with what you knew. Release guilt and move forward.',
    affirmation: 'I forgive myself with compassion and grace.',
  },
  {
    name: 'Opportunity Knocks',
    category: 'career',
    message:
      'The universe is delivering what you need. Be alert and ready to receive.',
    affirmation: 'I recognize and welcome opportunities that appear.',
  },
  {
    name: 'Slow Down',
    category: 'healing',
    message: 'Rest is not laziness. Your body and soul need time to restore.',
    affirmation: 'I honor my need for rest and renewal.',
  },
  {
    name: 'Creativity Flows',
    category: 'career',
    message:
      'Your creative energy is alive and ready. Express yourself without fear.',
    affirmation: 'I express my creativity fearlessly and joyfully.',
  },
  {
    name: 'Joy Is Your Birthright',
    category: 'growth',
    message:
      'Seek experiences that make you feel alive. Happiness is calling you.',
    affirmation: 'I allow myself to experience joy in every moment.',
  },
  {
    name: 'You Are Protected',
    category: 'healing',
    message:
      'Trust that you are safe and supported. The universe has your back.',
    affirmation: 'I am safe, supported, and protected.',
  },
  {
    name: 'Patience Brings Fruit',
    category: 'growth',
    message:
      'Your efforts are not wasted. Good things take time. Trust the process.',
    affirmation: 'I trust in divine timing and enjoy the journey.',
  },
  {
    name: 'Celebrate Yourself',
    category: 'love',
    message:
      'Your wins matter, even the small ones. Acknowledge how far you have come.',
    affirmation: 'I celebrate my progress and honor my achievements.',
  },
  {
    name: 'Speak Your Truth',
    category: 'growth',
    message:
      'Your voice deserves to be heard. Express yourself authentically and boldly.',
    affirmation: 'I speak my truth with courage and clarity.',
  },
  {
    name: 'Miracles Are Real',
    category: 'adventure',
    message:
      'Magic happens when you believe. Stay open to the impossible becoming possible.',
    affirmation: 'I believe in miracles and welcome wonder.',
  },
  {
    name: 'Community Lifts You',
    category: 'love',
    message:
      'Reach out to your tribe. Collective love and support surround you.',
    affirmation: 'I am supported by my loving community.',
  },
  {
    name: 'Your Light Shines',
    category: 'growth',
    message:
      'Do not dim yourself for anyone. The world needs your unique radiance.',
    affirmation: 'My light shines brightly and inspires others.',
  },
  {
    name: 'Embrace Change',
    category: 'adventure',
    message:
      'Resistance creates struggle. Flow with what is unfolding. Transformation awaits.',
    affirmation: 'I embrace change as growth and evolution.',
  },
  {
    name: 'You Are Loved',
    category: 'love',
    message:
      'Beyond doubt. Beyond condition. You are cherished exactly as you are.',
    affirmation: 'I am infinitely loved and lovable.',
  },
  {
    name: 'Listen to Your Heart',
    category: 'growth',
    message:
      'Logic only takes you so far. Your heart holds the wisdom you are seeking.',
    affirmation: 'I follow my heart with complete trust.',
  },
  {
    name: 'Shine Brightly',
    category: 'growth',
    message: 'This is your moment. Step into your power. The world is waiting.',
    affirmation: 'I step into my power and shine brightly.',
  },
];

export default function OracleCardReader() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [history, setHistory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDrawing, setIsDrawing] = useState(false);

  const categories = [
    'all',
    'love',
    'career',
    'growth',
    'healing',
    'adventure',
  ];

  const drawCard = () => {
    setIsDrawing(true);
    setSelectedCard(null);

    setTimeout(() => {
      const filtered =
        categoryFilter === 'all'
          ? ORACLE_CARDS
          : ORACLE_CARDS.filter((c) => c.category === categoryFilter);

      const card = filtered[Math.floor(Math.random() * filtered.length)];
      setSelectedCard(card);
      setHistory((prev) => [card, ...prev.slice(0, 9)]);
      setIsDrawing(false);
    }, 800);
  };

  const getCategoryColour = (category) => {
    const colours = {
      love: 'from-rose-400 to-pink-500',
      career: 'from-blue-400 to-indigo-500',
      growth: 'from-emerald-400 to-teal-500',
      healing: 'from-purple-400 to-violet-500',
      adventure: 'from-orange-400 to-amber-500',
    };
    return colours[category] || 'from-gray-400 to-slate-500';
  };

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              What guidance do you seek?
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-text-muted text-text-secondary hover:border-purple-400'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={drawCard}
            disabled={isDrawing}
            className="w-full"
            size="lg"
          >
            {isDrawing ? 'Drawing...' : 'Draw Your Card'}
          </Button>
        </div>
      </Card>

      {/* Card Display */}
      {selectedCard && (
        <Card
          className={`bg-gradient-to-br ${getCategoryColour(selectedCard.category)} text-white space-y-4`}
        >
          <div>
            <p className="text-sm opacity-90 font-mono">Today\'s Oracle</p>
            <h2 className="font-heading font-bold text-3xl mt-2">
              {selectedCard.name}
            </h2>
          </div>

          <div className="bg-white opacity-10 p-4 rounded-lg">
            <p className="leading-relaxed text-lg">{selectedCard.message}</p>
          </div>

          <div className="bg-white opacity-10 p-4 rounded-lg">
            <p className="text-sm opacity-90 mb-2">Today\'s Affirmation:</p>
            <p className="font-heading font-semibold italic">
              {selectedCard.affirmation}
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={drawCard}
            disabled={isDrawing}
            className="w-full"
          >
            Draw Another Card
          </Button>
        </Card>
      )}

      {/* History */}
      {history.length > 0 && (
        <Card>
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Your Recent Cards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {history.map((card, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 bg-gradient-to-r ${getCategoryColour(card.category)} border-current`}
                >
                  <p className="font-heading font-semibold text-text-primary">
                    {card.name}
                  </p>
                  <p className="text-xs text-text-secondary mt-1 capitalize">
                    {card.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Info */}
      <details className="text-xs text-text-muted">
        <summary className="cursor-pointer hover:text-text-secondary">About this tool</summary>
        <p className="mt-2">Oracle cards offer gentle guidance and daily inspiration. Each card
          carries a message of encouragement and wisdom. Use this tool for
          reflection and spiritual insight.</p>
      </details>
    </div>
  );
}
