'use client';

import { useState, useMemo } from 'react';

const excuses = {
  work: [
    'My dog ate my laptop charger',
    'There was a solar flare that knocked out the power grid',
    'I was abducted by aliens but they returned me safely',
    'My cat walked across my keyboard and sent an email to the CEO',
    'A time traveler told me not to come in today',
    'I was stuck in an elevator with someone who only speaks in riddles',
    'My plants staged a protest and demanded my attention',
    'I had to help an old lady find her lost yodelling skills',
    'The internet went sentient and asked me for life advice',
    'I accidentally joined a flash mob and couldn\'t leave',
    'My shoes developed consciousness and demanded equal rights',
    'A motivational speaker moved into my home and won\'t leave',
  ],
  social: [
    'I\'m hosting an emergency support group for confused refrigerators',
    'I was training my pet rock for the Olympics',
    'I got stuck in a conversation with someone about paint colors and lost track of time',
    'My houseplants staged an intervention',
    'I was elected mayor of my living room',
    'I had to help my toaster achieve its dreams',
    'My pillow filed a formal complaint against me',
    'I discovered my couch is a time machine',
    'I was consulting with my plants about their life goals',
    'A stranger convinced me their cat is actually a diplomat',
    'I was in a very important meeting with my socks',
    'My furniture unionized and demanded to negotiate',
  ],
  gym: [
    'My muscles filed for independence',
    'I made a commitment to befriend all the pigeons at the park',
    'My yoga mat held me hostage until I agreed to stretch',
    'I got distracted arguing with a squirrel about nuts',
    'My dumbbells went on strike demanding better working conditions',
    'I was mediating a dispute between my left and right shoe',
    'I had to attend an emergency meeting with my knees about their complaints',
    'A motivational squirrel inspired me to chase acorns instead',
    'My water bottle became sentient and demands snacks',
    'I was training a team of very uncooperative push-ups',
    'My heart and my lungs had a disagreement I had to settle',
    'I got recruited to be a personal trainer for my socks',
  ],
  chores: [
    'The dishes filed a lawsuit and I had to appear in court',
    'My laundry started a revolution and I\'m negotiating terms',
    'The dust bunnies under the couch formed a union',
    'My vacuum cleaner gained sentience and quit',
    'The trash can offered me a life-changing business opportunity',
    'The mop demanded a performance review and I\'m preparing feedback',
    'The shower curtain staged a dramatic escape',
    'My broom decided to pursue a career in modern dance',
    'The dust developed a PhD and now won\'t move for anyone',
    'The cleaning supplies started a competitive cooking show',
    'My dishes unionized and demanded dental coverage',
    'The furniture rearranged itself and I\'m documenting the incident',
  ],
  school: [
    'My pencil went on sabbatical to find itself',
    'The textbooks staged a library coup and I was negotiating',
    'My brain went on strike for better working conditions',
    'The algebra decided to become the geometry\'s personal trainer',
    'My notebook escaped to pursue a career in aviation',
    'The classroom chairs filed a collective complaint about posture',
    'My homework achieved sentience and refused to be copied',
    'The whiteboard started a stand-up comedy routine and wouldn\'t stop',
    'My backpack declared independence and formed its own nation',
    'The bell system hacked itself to ring at random intervals',
    'The cafeteria pizza filed a noise complaint about the eating sounds',
    'My desk unionized with the other furniture',
  ],
};

export default function ExcuseGenerator() {
  const [category, setCategory] = useState('work');
  const [currentExcuse, setCurrentExcuse] = useState(excuses.work[0]);
  const [ratings, setRatings] = useState({});
  const [copied, setCopied] = useState(false);

  const generateExcuse = () => {
    const categoryExcuses = excuses[category];
    const randomIndex = Math.floor(Math.random() * categoryExcuses.length);
    setCurrentExcuse(categoryExcuses[randomIndex]);
  };

  const handleRate = (value) => {
    setRatings((prev) => ({
      ...prev,
      [currentExcuse]: value,
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentExcuse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rating = ratings[currentExcuse];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <label className="block text-text-primary font-medium mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentExcuse(excuses[e.target.value][0]);
          }}
          className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="work">Work</option>
          <option value="social">Social</option>
          <option value="gym">Gym</option>
          <option value="chores">Chores</option>
          <option value="school">School</option>
        </select>
      </div>

      <div className="bg-surface p-6 rounded-[var(--radius-card)] min-h-32 flex items-center justify-center">
        <p className="text-2xl text-text-primary font-medium text-center leading-relaxed">
          {currentExcuse}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={generateExcuse}
          className="flex-1 px-4 py-3 bg-accent text-white font-medium rounded-[var(--radius-input)] hover:bg-blue-600 transition"
        >
          Generate Another
        </button>

        <button
          onClick={handleCopy}
          className={`flex-1 px-4 py-3 font-medium rounded-[var(--radius-input)] transition ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-white border border-border text-text-primary hover:bg-surface'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      <div className="bg-surface p-4 rounded-[var(--radius-card)]">
        <p className="text-text-secondary text-sm font-medium mb-3">Rate this excuse</p>
        <div className="flex justify-center gap-3">
          {['😒', '😐', '🙂', '😂'].map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleRate(index + 1)}
              className={`text-3xl px-4 py-2 rounded-[var(--radius-input)] transition ${
                rating === index + 1 ? 'bg-blue-200 scale-110' : 'hover:scale-110'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        {rating && (
          <p className="text-text-secondary text-xs text-center mt-2">
            You rated this {rating}/4
          </p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)] text-center">
        <p className="text-text-secondary text-sm">
          These excuses are for entertainment purposes only. We recommend honesty whenever possible!
        </p>
      </div>
    </div>
  );
}
