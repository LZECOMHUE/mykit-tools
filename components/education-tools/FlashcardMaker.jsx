'use client';

import { useState } from 'react';

export default function FlashcardMaker() {
  const [cards, setCards] = useState([
    { id: 1, front: '', back: '' },
  ]);
  const [nextId, setNextId] = useState(2);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [shuffled, setShuffled] = useState(false);

  const validCards = cards.filter((c) => c.front.trim() && c.back.trim());
  const studyCards = shuffled ? [...validCards].sort(() => Math.random() - 0.5) : validCards;
  const currentCard = studyCards[currentCardIndex];

  const addCard = () => {
    setCards([...cards, { id: nextId, front: '', back: '' }]);
    setNextId(nextId + 1);
  };

  const removeCard = (id) => {
    if (cards.length > 1) {
      setCards(cards.filter((c) => c.id !== id));
    }
  };

  const updateCard = (id, field, value) => {
    setCards(
      cards.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  const startStudy = () => {
    setIsStudyMode(true);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setKnown(new Set());
  };

  const handleKnow = () => {
    setKnown(new Set([...known, currentCard.id]));
    nextCard();
  };

  const nextCard = () => {
    if (currentCardIndex < studyCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const restartStudy = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setKnown(new Set());
  };

  if (isStudyMode && validCards.length > 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-sm">
              Card {currentCardIndex + 1} of {studyCards.length}
            </span>
            <span className="text-success text-sm font-medium">
              Known: {known.size}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-accent h-full transition-all"
              style={{ width: `${((currentCardIndex + 1) / studyCards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`h-64 rounded-[var(--radius-card)] border-2 border-accent cursor-pointer flex items-center justify-center transition-all transform ${
            isFlipped ? 'bg-accent text-white' : 'bg-accent-muted'
          }`}
        >
          <div className="text-center p-6">
            <p className="text-xs text-opacity-60 mb-2">
              {isFlipped ? 'Answer' : 'Question'}
            </p>
            <p className="text-2xl font-semibold text-center">
              {isFlipped ? currentCard?.back : currentCard?.front}
            </p>
            <p className="text-xs mt-4 text-opacity-60">Click to flip</p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={prevCard}
              disabled={currentCardIndex === 0}
              className="flex-1 px-4 py-3 bg-white border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={nextCard}
              disabled={currentCardIndex === studyCards.length - 1}
              className="flex-1 px-4 py-3 bg-white border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>

          <button
            onClick={handleKnow}
            className="w-full px-6 py-3 bg-success text-white rounded-[var(--radius-input)] font-medium hover:bg-green-600 transition-colors"
          >
            ✓ I Know This
          </button>

          <button
            onClick={restartStudy}
            className="w-full px-6 py-3 bg-white border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-surface transition-colors"
          >
            Restart
          </button>
        </div>

        {/* Study Complete */}
        {currentCardIndex === studyCards.length - 1 && known.size === studyCards.length && (
          <div className="bg-success/10 border border-success rounded-[var(--radius-card)] p-4 text-center space-y-2">
            <p className="text-success font-semibold">🎉 Great job!</p>
            <p className="text-text-secondary text-sm">You know all {studyCards.length} cards!</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Mode Selection */}
      {!isStudyMode && (
        <>
          {/* Create/Edit Cards */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-text-primary font-semibold">Flashcards</h3>
              <span className="text-text-secondary text-xs">
                {validCards.length} valid card{validCards.length !== 1 ? 's' : ''}
              </span>
            </div>

            {cards.map((card, idx) => (
              <div key={card.id} className="border border-border rounded-[var(--radius-card)] p-4 space-y-3">
                <div>
                  <label className="block text-text-secondary text-xs font-medium mb-1">
                    Front (Question)
                  </label>
                  <input
                    type="text"
                    value={card.front}
                    onChange={(e) => updateCard(card.id, 'front', e.target.value)}
                    placeholder="e.g., What is the capital of France?"
                    className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-xs font-medium mb-1">
                    Back (Answer)
                  </label>
                  <input
                    type="text"
                    value={card.back}
                    onChange={(e) => updateCard(card.id, 'back', e.target.value)}
                    placeholder="e.g., Paris"
                    className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>

                {cards.length > 1 && (
                  <button
                    onClick={() => removeCard(card.id)}
                    className="w-full px-3 py-2 text-error text-sm font-medium hover:bg-error/10 rounded-[var(--radius-input)] transition-colors"
                  >
                    Remove Card
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addCard}
              className="w-full px-6 py-3 border-2 border-dashed border-border text-text-secondary rounded-[var(--radius-input)] font-medium hover:bg-surface transition-colors"
            >
              + Add Card
            </button>
          </div>

          {/* Study Controls */}
          {validCards.length > 0 && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShuffled(!shuffled);
                  }}
                  className={`flex-1 px-6 py-3 rounded-[var(--radius-input)] font-medium transition-colors ${
                    shuffled
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:bg-surface'
                  }`}
                >
                  {shuffled ? '✓ Shuffled' : 'Shuffle'}
                </button>
                <button
                  onClick={startStudy}
                  className="flex-1 px-6 py-3 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Study
                </button>
              </div>
            </div>
          )}

          {validCards.length === 0 && cards.length > 0 && (
            <div className="bg-warning/10 border border-warning rounded-[var(--radius-card)] p-4 text-text-secondary text-sm">
              Add both a front and back to each card before studying
            </div>
          )}
        </>
      )}
    </div>
  );
}
