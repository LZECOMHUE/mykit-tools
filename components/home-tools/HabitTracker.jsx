'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const getDayName = (dayOfMonth) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayOfMonth];
};

export default function HabitTracker() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [habits, setHabits] = useState(['Morning Exercise', 'Read 30 mins', 'Meditate']);
  const [newHabit, setNewHabit] = useState('');
  const [theme, setTheme] = useState('minimal');
  const [completed, setCompleted] = useState({});

  const currentDate = new Date(month + '-01');
  const monthName = currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const days = daysInMonth(currentDate);
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleAddHabit = () => {
    if (newHabit.trim() && habits.length < 10) {
      setHabits([...habits, newHabit]);
      setNewHabit('');
    }
  };

  const handleRemoveHabit = (idx) => {
    const updatedHabits = habits.filter((_, i) => i !== idx);
    setHabits(updatedHabits);
    const newCompleted = {};
    Object.entries(completed).forEach(([key, val]) => {
      const [habitIdx] = key.split('-');
      if (parseInt(habitIdx) < updatedHabits.length) {
        newCompleted[key] = val;
      }
    });
    setCompleted(newCompleted);
  };

  const handleToggleDay = (habitIdx, day) => {
    const key = `${habitIdx}-${day}`;
    setCompleted(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getHabitCompletion = (habitIdx) => {
    let count = 0;
    for (let day = 1; day <= days; day++) {
      if (completed[`${habitIdx}-${day}`]) count++;
    }
    return Math.round((count / days) * 100);
  };

  const colors = theme === 'colourful'
    ? ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-pink-100', 'bg-yellow-100', 'bg-red-100', 'bg-teal-100', 'bg-indigo-100', 'bg-orange-100', 'bg-cyan-100']
    : ['bg-surface'];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-text-secondary text-sm font-medium mb-2">Month & Year</label>
            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-text-secondary text-sm font-medium mb-2">Theme</label>
            <Select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full">
              <option value="minimal">Minimal</option>
              <option value="colourful">Colourful</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Add Habit ({habits.length}/10)
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
              placeholder="e.g. Morning jog"
              className="flex-1"
              disabled={habits.length >= 10}
            />
            <Button onClick={handleAddHabit} disabled={habits.length >= 10} className="bg-accent text-white">
              Add
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {habits.map((habit, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white border border-border rounded-lg p-3">
              <span className="text-text-primary">{habit}</span>
              <Button
                onClick={() => handleRemoveHabit(idx)}
                variant="ghost"
                className="text-error"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>

      {habits.length > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4 overflow-x-auto">
          <h3 className="font-heading text-base font-bold text-text-primary">{monthName}</h3>

          <div className="min-w-full">
            <div className="flex gap-1 mb-4">
              <div className="w-32 flex-shrink-0"></div>
              {Array.from({ length: days }).map((_, dayIdx) => {
                const day = dayIdx + 1;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                return (
                  <div key={day} className="w-8 h-8 flex-shrink-0 flex flex-col items-center justify-center text-xs">
                    <span className="font-medium text-text-muted">{getDayName(date.getDay())}</span>
                    <span className="font-mono font-bold text-text-secondary">{day}</span>
                  </div>
                );
              })}
            </div>

            {habits.map((habit, habitIdx) => {
              const completion = getHabitCompletion(habitIdx);
              const bgColor = colors[habitIdx % colors.length];
              return (
                <div key={habitIdx} className="flex gap-1 mb-2">
                  <div className={`${bgColor} w-32 flex-shrink-0 rounded-lg p-2 flex items-center`}>
                    <span className="text-text-primary text-xs font-medium truncate">{habit}</span>
                  </div>
                  {Array.from({ length: days }).map((_, dayIdx) => {
                    const day = dayIdx + 1;
                    const isChecked = completed[`${habitIdx}-${day}`] || false;
                    return (
                      <button
                        key={day}
                        onClick={() => handleToggleDay(habitIdx, day)}
                        className={`w-8 h-8 flex-shrink-0 rounded border-2 flex items-center justify-center ${
                          isChecked
                            ? 'bg-accent border-accent text-white'
                            : 'border-border bg-white hover:bg-surface'
                        }`}
                      >
                        {isChecked && '✓'}
                      </button>
                    );
                  })}
                  <div className="w-12 flex-shrink-0 flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-accent">{completion}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
