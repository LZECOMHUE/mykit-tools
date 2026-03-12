'use client';

import { useState, useMemo } from 'react';

const resolutionDatabase = {
  health: {
    easy: [
      "Drink 8 glasses of water daily",
      "Take a 10-minute walk 3 times a week",
      "Eat one portion of vegetables at each meal",
      "Get to bed 15 minutes earlier",
      "Stretch for 5 minutes each morning",
    ],
    medium: [
      "Exercise 30 minutes, 4 times a week",
      "Cut down on sugar and processed foods",
      "Do a 30-day fitness challenge",
      "Join a sports club or fitness class",
      "Run a 5K race",
    ],
    hard: [
      "Complete a half-marathon",
      "Lose 10kg (or 1 stone) healthily",
      "Build a consistent gym routine 5x weekly",
      "Eliminate most processed foods from diet",
      "Achieve a specific fitness milestone",
    ],
  },
  career: {
    easy: [
      "Learn one new skill related to your job",
      "Read one professional development book",
      "Attend a networking event per quarter",
      "Update LinkedIn profile",
      "Take one online course",
    ],
    medium: [
      "Get a professional certification",
      "Increase income by 10%",
      "Lead a project or team initiative",
      "Complete an advanced training program",
      "Develop a new valuable skill",
    ],
    hard: [
      "Get promoted or change to better role",
      "Start your own business or side project",
      "Double your current income",
      "Complete multiple certifications",
      "Become an industry expert in your field",
    ],
  },
  relationships: {
    easy: [
      "Call a friend or family member weekly",
      "Send one thoughtful message per week",
      "Plan one game night with friends",
      "Have dinner with family without phones",
      "Write letters to people you appreciate",
    ],
    medium: [
      "Plan a trip with close friends",
      "Improve communication with partner/family",
      "Volunteer together with loved ones",
      "Take a class together with someone",
      "Have deeper conversations weekly",
    ],
    hard: [
      "Repair an important broken relationship",
      "Build a completely new social circle",
      "Commit to long-term relationship goals",
      "Plan a big group adventure",
      "Become a better listener and partner",
    ],
  },
  finance: {
    easy: [
      "Track spending daily",
      "Set a monthly budget",
      "Save £20 per week",
      "Cancel unused subscriptions",
      "Pack lunch 3 days a week",
    ],
    medium: [
      "Save £100 per month for emergency fund",
      "Create an investment plan",
      "Reduce debt by 20%",
      "Start a side income",
      "Build a 3-month emergency fund",
    ],
    hard: [
      "Save 20% of income annually",
      "Become completely debt-free",
      "Build a 12-month emergency fund",
      "Invest £500+ per month",
      "Increase net worth by 50%",
    ],
  },
  hobbies: {
    easy: [
      "Learn to play 5 songs on an instrument",
      "Start a creative hobby (painting, writing)",
      "Read 12 books this year",
      "Take 50 new photographs",
      "Learn a new recipe each month",
    ],
    medium: [
      "Complete a DIY project",
      "Learn a new language (conversational level)",
      "Create and share your art/hobby publicly",
      "Write a short story or blog",
      "Master a challenging hobby skill",
    ],
    hard: [
      "Finish a creative project (book, album, etc)",
      "Become fluent in a new language",
      "Achieve mastery in a hobby craft",
      "Compete or perform publicly",
      "Share expertise by teaching others",
    ],
  },
};

export default function NewYearResolutionGenerator() {
  const [selectedCategories, setSelectedCategories] = useState(['health']);
  const [difficulty, setDifficulty] = useState('medium');
  const [generated, setGenerated] = useState([]);

  const categories = [
    { value: 'health', label: '💪 Health & Fitness' },
    { value: 'career', label: '💼 Career & Growth' },
    { value: 'relationships', label: '💕 Relationships' },
    { value: 'finance', label: '💰 Finance' },
    { value: 'hobbies', label: '🎨 Hobbies & Personal' },
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy (Small changes)' },
    { value: 'medium', label: 'Medium (Balanced)' },
    { value: 'hard', label: 'Ambitious (Stretch goals)' },
  ];

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleGenerate = () => {
    const resolutions = [];
    for (const category of selectedCategories) {
      const options = resolutionDatabase[category][difficulty];
      if (options && options.length > 0) {
        const random = Math.floor(Math.random() * options.length);
        resolutions.push({ category, text: options[random] });
      }
    }
    setGenerated(resolutions);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Configuration */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Choose Categories (select at least one)
          </label>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryToggle(cat.value)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                  selectedCategories.includes(cat.value)
                    ? 'bg-accent bg-opacity-10 border-accent text-accent'
                    : 'border-border text-text-primary hover:bg-surface'
                }`}
              >
                {selectedCategories.includes(cat.value) ? '✓ ' : ''}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {difficulties.map((d) => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  difficulty === d.value
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {d.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={selectedCategories.length === 0}
          className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Generate Resolutions
        </button>
      </div>

      {/* Results */}
      {generated.length > 0 && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Your 2026 Resolutions</h2>
            <div className="space-y-3">
              {generated.map((res, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-accent">
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      className="mt-1 cursor-pointer w-5 h-5"
                    />
                    <div className="flex-1">
                      <p className="text-text-secondary text-sm font-medium mb-1">
                        {categories.find((c) => c.value === res.category)?.label}
                      </p>
                      <p className="text-text-primary font-medium">{res.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              className="w-full mt-4 bg-blue-100 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Resolution Success Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ Make resolutions specific and measurable</li>
          <li>✓ Start small and build momentum</li>
          <li>✓ Track progress weekly or monthly</li>
          <li>✓ Find an accountability partner</li>
          <li>✓ Review and adjust as needed</li>
          <li>✓ Celebrate small wins along the way</li>
        </ul>
      </div>

      {/* SMART Goals Template */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">Make Your Goals SMART</h3>
        <div className="space-y-3">
          {[
            { letter: 'S', word: 'Specific', desc: 'Be clear and detailed about what you want' },
            { letter: 'M', word: 'Measurable', desc: 'Set concrete metrics to track progress' },
            { letter: 'A', word: 'Achievable', desc: 'Make sure the goal is realistic' },
            { letter: 'R', word: 'Relevant', desc: 'Ensure it matters to you personally' },
            { letter: 'T', word: 'Time-bound', desc: 'Set a deadline (e.g., by end of 2026)' },
          ].map((item) => (
            <div key={item.letter} className="flex gap-3 py-2 border-b border-border last:border-b-0">
              <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                {item.letter}
              </div>
              <div>
                <p className="font-semibold text-text-primary">{item.word}</p>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
