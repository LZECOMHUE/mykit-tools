'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const FORTUNES = {
  love: [
    'A profound connection blooms when you least expect it. Open your heart to possibilities.',
    'Someone is thinking of you at this very moment. Your energy draws love closer.',
    'Passion and intimacy deepen in your closest relationships. Nurture these bonds.',
    'The universe conspires to bring your soulmate closer. Trust the timing.',
    'Love transcends distance. A cherished relationship will strengthen unexpectedly.',
    'Your capacity for love inspires others. Return the generosity you give.',
    'True love requires vulnerability. Be brave enough to show your authentic self.',
  ],
  money: [
    'Unexpected financial fortune is flowing your way. Stay open to opportunity.',
    'Your investments in yourself will yield abundant returns. Trust your worth.',
    'A financial blessing arrives from an unexpected source within the month.',
    'Prosperity follows those who take inspired action. Bold moves lead to gain.',
    'The seeds you planted financially are beginning to sprout. Harvest awaits.',
    'Money flows easily to those who share generously. Give without attachment.',
    'Your financial future brightens. A significant opportunity emerges soon.',
  ],
  career: [
    'Your talents are recognized by someone important. A promotion or new role beckons.',
    'The career path you envision becomes clear. Take the next step with confidence.',
    'Hard work meets reward. Recognition and advancement come at the right time.',
    'A collaboration brings professional success beyond what you imagined alone.',
    'Your unique skills are exactly what someone needs right now. Trust your expertise.',
    'A new direction in work brings unexpected fulfillment. Follow your instinct.',
    'Success in your field is assured. Your dedication creates lasting impact.',
  ],
  travel: [
    'A journey transforms your perspective. Adventure awaits in the near future.',
    'Distance brings clarity. Travel will reveal answers you have been seeking.',
    'An unexpected trip brings unexpected joy and meaningful connections.',
    'The world is waiting for your exploration. A magical destination calls to you.',
    'Your wanderlust will be satisfied. Pack your bags, adventure is imminent.',
    'Movement brings change. Travel will open new chapters in your story.',
    'A place you have long dreamed of becomes a reality sooner than expected.',
  ],
  personal: [
    'Personal growth accelerates. You are becoming the person you wish to be.',
    'Your inner transformation manifests as outer positive change.',
    'Healing from past wounds completes. Peace settles into your spirit.',
    'Confidence blooms from within. The world responds to your radiant energy.',
    'A skill you develop becomes a gift you share with others.',
    'Your authentic self emerges stronger. The real you is your greatest power.',
    'Spiritual awakening deepens. Your connection to something greater strengthens.',
  ],
};

export default function CrystalBallFortune() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fortune, setFortune] = useState(null);
  const [isGazing, setIsGazing] = useState(false);
  const [history, setHistory] = useState([]);

  const gazeBall = (category) => {
    if (category === selectedCategory && fortune) {
      // Reset if clicking same category
      setFortune(null);
      setSelectedCategory(null);
      return;
    }

    setSelectedCategory(category);
    setIsGazing(true);
    setFortune(null);

    setTimeout(() => {
      const categoryFortunes = FORTUNES[category];
      const newFortune =
        categoryFortunes[
          Math.floor(Math.random() * categoryFortunes.length)
        ];
      setFortune(newFortune);
      setHistory((prev) => [
        { category, fortune: newFortune },
        ...prev.slice(0, 9),
      ]);
      setIsGazing(false);
    }, 1800);
  };

  const categories = [
    { key: 'love', label: 'Love & Relationships', icon: '❤️' },
    { key: 'money', label: 'Money & Abundance', icon: '💰' },
    { key: 'career', label: 'Career & Success', icon: '⭐' },
    { key: 'travel', label: 'Travel & Adventure', icon: '✈️' },
    { key: 'personal', label: 'Personal Growth', icon: '🌟' },
  ];

  return (
    <div className="space-y-4">
      {/* Category Selection */}
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-text-primary">
            What aspect of your future do you wish to explore?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => gazeBall(cat.key)}
                disabled={isGazing}
                className={`p-3 rounded-lg transition-all border-2 font-medium text-sm ${
                  selectedCategory === cat.key
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-text-muted text-text-secondary hover:border-blue-400'
                } disabled:opacity-50`}
              >
                <span className="text-xl block mb-1">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Crystal Ball */}
      <div className="flex justify-center py-4">
        <style>{`
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3); }
            50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.7), 0 0 80px rgba(99, 102, 241, 0.4); }
          }
          @keyframes swirl {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          @keyframes float-gently {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .crystal-ball {
            animation: ${isGazing ? 'glow 0.5s ease-in-out infinite' : 'float-gently 4s ease-in-out infinite'};
          }
          .mist {
            animation: ${isGazing ? 'swirl 0.6s ease-in-out infinite' : 'none'};
          }
        `}</style>

        <div className="crystal-ball w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-300 shadow-2xl flex items-center justify-center relative overflow-hidden border-4 border-purple-400">
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white via-blue-100 to-purple-200 opacity-40"></div>

          {/* Mist effect when gazing */}
          {isGazing && (
            <>
              <div className="mist absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-purple-300 to-transparent"></div>
              <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
                <div className="absolute inset-8 rounded-full border-2 border-purple-400 border-transparent border-t-purple-400 opacity-50"></div>
              </div>
            </>
          )}

          {/* Content */}
          <div className="relative text-center z-10">
            {isGazing ? (
              <div className="text-2xl animate-pulse">✨</div>
            ) : fortune ? (
              <div className="text-sm text-purple-900 font-heading font-bold px-4">
                ???
              </div>
            ) : selectedCategory ? (
              <div className="text-3xl animate-bounce">🔮</div>
            ) : (
              <div className="text-4xl">🔮</div>
            )}
          </div>
        </div>
      </div>

      {/* Fortune Display */}
      {fortune && !isGazing && (
        <Card className="bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-400">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm font-mono text-purple-700 mb-2">
                The crystal ball reveals:
              </p>
              <p className="text-lg leading-relaxed text-purple-900 font-heading">
                {fortune}
              </p>
            </div>

            <Button
              onClick={() => gazeBall(selectedCategory)}
              disabled={isGazing}
              className="w-full"
            >
              {isGazing ? 'Gazing...' : 'Ask Again'}
            </Button>
          </div>
        </Card>
      )}

      {/* History */}
      {history.length > 0 && (
        <Card>
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Visions Revealed
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {history.map((entry, idx) => {
                const category = categories.find((c) => c.key === entry.category);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-surface border-l-4 border-purple-500"
                  >
                    <p className="text-xs font-mono text-text-secondary mb-1">
                      {category.label}
                    </p>
                    <p className="text-sm text-text-primary line-clamp-2">
                      {entry.fortune}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Info */}
      <details className="text-xs text-text-muted">
        <summary className="cursor-pointer hover:text-text-secondary">About this tool</summary>
        <p className="mt-2">The crystal ball is a mystical tool used for divination and receiving
          guidance about the future. Gaze into its depths to receive wisdom and
          insight. For entertainment and reflection purposes only.</p>
      </details>
    </div>
  );
}
