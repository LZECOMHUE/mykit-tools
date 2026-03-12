'use client';

import { useState } from 'react';

const choresByAge = {
  '3-5': ['Pick up toys', 'Put books on shelf', 'Water plants', 'Wipe table', 'Put dishes in sink', 'Sort socks'],
  '5-7': ['Empty small trash', 'Sweep floor', 'Help with laundry', 'Set table', 'Unload dishwasher', 'Feed pets', 'Wipe windows'],
  '7-9': ['Load dishwasher', 'Vacuum room', 'Fold laundry', 'Take out trash', 'Tidy bedroom', 'Rake leaves', 'Wash car'],
  '9-12': ['Cook simple meals', 'Do own laundry', 'Clean bathroom', 'Mow lawn', 'Organize closet', 'Shop for groceries', 'Clean windows'],
};

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function ChoreChartGenerator() {
  const [numKids, setNumKids] = useState(1);
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [chorePerDay, setChorePerDay] = useState(1);
  const [kidNames, setKidNames] = useState(['Child 1']);
  const [chart, setChart] = useState(null);

  const handleKidNameChange = (index, value) => {
    const newNames = [...kidNames];
    newNames[index] = value;
    setKidNames(newNames);
  };

  const generateChart = () => {
    const availableChores = choresByAge[ageGroup];
    const chartData = {};

    weekDays.forEach((day) => {
      chartData[day] = {};
      kidNames.forEach((kidName, kidIndex) => {
        const choreIndices = [];
        for (let i = 0; i < chorePerDay; i++) {
          const choreIndex = (kidIndex + i * kidNames.length + weekDays.indexOf(day)) % availableChores.length;
          choreIndices.push(choreIndex);
        }
        chartData[day][kidName] = choreIndices.map((idx) => availableChores[idx]).join(', ');
      });
    });

    setChart(chartData);
  };

  const handleNumKidsChange = (num) => {
    setNumKids(num);
    const newNames = [];
    for (let i = 1; i <= num; i++) {
      newNames.push(kidNames[i - 1] || `Child ${i}`);
    }
    setKidNames(newNames);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Configuration */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Number of Kids</label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => handleNumKidsChange(num)}
                className={`px-4 py-2 rounded-[var(--radius-input)] font-medium transition-colors ${
                  numKids === num
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Age Group</label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              <option value="3-5">3-5 years</option>
              <option value="5-7">5-7 years</option>
              <option value="7-9">7-9 years</option>
              <option value="9-12">9-12 years</option>
            </select>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Chores Per Day</label>
            <select
              value={chorePerDay}
              onChange={(e) => setChorePerDay(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              <option value={1}>1 chore</option>
              <option value={2}>2 chores</option>
              <option value={3}>3 chores</option>
            </select>
          </div>
        </div>

        {/* Kid Names */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Kids' Names</label>
          <div className="space-y-2">
            {kidNames.map((name, idx) => (
              <input
                key={idx}
                type="text"
                value={name}
                onChange={(e) => handleKidNameChange(idx, e.target.value)}
                placeholder={`Child ${idx + 1}`}
                className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            ))}
          </div>
        </div>

        <button
          onClick={generateChart}
          className="w-full px-6 py-3 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700 transition-colors"
        >
          Generate Chart
        </button>
      </div>

      {/* Chart Display */}
      {chart && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 overflow-x-auto">
          <h3 className="text-text-primary font-semibold mb-4">Weekly Chore Chart</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-text-secondary font-medium">Day</th>
                {kidNames.map((name) => (
                  <th key={name} className="text-left py-2 px-3 text-text-secondary font-medium">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weekDays.map((day) => (
                <tr key={day} className="border-b border-border hover:bg-white">
                  <td className="py-3 px-3 font-medium text-text-primary">{day}</td>
                  {kidNames.map((kidName) => (
                    <td key={`${day}-${kidName}`} className="py-3 px-3 text-text-secondary">
                      {chart[day][kidName]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Print Instructions */}
      {chart && (
        <div className="bg-info/10 border border-info rounded-[var(--radius-card)] p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-1">💡 Tip:</p>
          <p>Print this chart and post it where everyone can see. Rotate chores weekly by moving each child down one row.</p>
        </div>
      )}
    </div>
  );
}
