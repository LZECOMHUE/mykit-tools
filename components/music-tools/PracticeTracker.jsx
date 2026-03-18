'use client';

import { useState, useEffect, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const STORAGE_KEY = 'mykit-practice-log';

const CATEGORIES = ['Scales', 'Songs', 'Technique', 'Theory', 'Improvisation', 'Other'];
const INSTRUMENTS = ['Guitar', 'Bass', 'Piano', 'Ukulele', 'Other'];

const CATEGORY_COLOURS = {
  'Scales': 'bg-red-400',
  'Songs': 'bg-accent',
  'Technique': 'bg-green-400',
  'Theory': 'bg-yellow-400',
  'Improvisation': 'bg-purple-400',
  'Other': 'bg-gray-400',
};

export default function PracticeTracker() {
  const [logs, setLogs] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Scales');
  const [instrument, setInstrument] = useState('Guitar');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(30);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setLogs(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse practice logs:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = () => {
    if (!duration || isNaN(parseInt(duration))) {
      alert('Please enter a valid duration');
      return;
    }

    const newLog = {
      id: editingId || Date.now(),
      date,
      duration: parseInt(duration),
      category,
      instrument,
      notes,
      rating,
    };

    if (editingId) {
      setLogs(logs.map((l) => (l.id === editingId ? newLog : l)));
      setEditingId(null);
    } else {
      setLogs([newLog, ...logs]);
    }

    resetForm();
  };

  const resetForm = () => {
    setDate(new Date().toISOString().split('T')[0]);
    setDuration('');
    setCategory('Scales');
    setInstrument('Guitar');
    setNotes('');
    setRating(0);
  };

  const handleDeleteLog = (id) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  const handleEditLog = (log) => {
    setDate(log.date);
    setDuration(log.duration.toString());
    setCategory(log.category);
    setInstrument(log.instrument);
    setNotes(log.notes);
    setRating(log.rating);
    setEditingId(log.id);
  };

  const handleCancelEdit = () => {
    resetForm();
    setEditingId(null);
  };

  const stats = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const yearAgo = new Date(today);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    const thisWeek = logs.filter((l) => new Date(l.date) >= weekAgo).reduce((sum, l) => sum + l.duration, 0);
    const thisMonth = logs.filter((l) => new Date(l.date) >= monthAgo).reduce((sum, l) => sum + l.duration, 0);
    const thisYear = logs.filter((l) => new Date(l.date) >= yearAgo).reduce((sum, l) => sum + l.duration, 0);

    let streak = 0;
    let currentDate = new Date(today);
    const logsByDate = {};
    logs.forEach((l) => {
      const d = l.date;
      logsByDate[d] = (logsByDate[d] || 0) + l.duration;
    });

    while (logsByDate[currentDate.toISOString().split('T')[0]]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    const byCategory = {};
    CATEGORIES.forEach((c) => {
      byCategory[c] = logs.filter((l) => l.category === c).reduce((sum, l) => sum + l.duration, 0);
    });

    const byInstrument = {};
    INSTRUMENTS.forEach((i) => {
      byInstrument[i] = logs.filter((l) => l.instrument === i).reduce((sum, l) => sum + l.duration, 0);
    });

    return { thisWeek, thisMonth, thisYear, streak, byCategory, byInstrument };
  }, [logs]);

  const progressPercentage = Math.min(100, (stats.thisWeek / (weeklyGoal * 7)) * 100);

  return (
    <div className="space-y-6">
      <Card className="bg-accent/5 border border-accent/10">
        <h3 className="font-heading font-semibold text-text-primary mb-4">
          Log Practice Session
        </h3>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Duration (minutes)
              </label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 30"
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Category
              </label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Instrument
              </label>
              <Select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
                {INSTRUMENTS.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you practice? Any notes?"
              rows={2}
              className="w-full bg-background border border-border rounded-lg p-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Rating {rating > 0 && <span className="text-accent-warm font-mono">{rating}/5</span>}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(rating === star ? 0 : star)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setRating(rating === star ? 0 : star);
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center text-2xl transition-all rounded hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  aria-label={`Rate ${star} out of 5 stars`}
                  aria-pressed={star <= rating}
                >
                  {star <= rating ? '★' : '☆'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAddLog} className="flex-1">
              {editingId ? 'Update Log' : 'Log Session'}
            </Button>
            {editingId && (
              <Button variant="secondary" onClick={handleCancelEdit} className="flex-1">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <p className="text-xs text-text-secondary mb-1">This Week</p>
          <p className="font-mono text-2xl font-bold text-text-primary">
            {stats.thisWeek}
          </p>
          <p className="text-xs text-text-secondary mt-1">minutes</p>
        </Card>

        <Card>
          <p className="text-xs text-text-secondary mb-1">This Month</p>
          <p className="font-mono text-2xl font-bold text-text-primary">
            {stats.thisMonth}
          </p>
          <p className="text-xs text-text-secondary mt-1">minutes</p>
        </Card>

        <Card>
          <p className="text-xs text-text-secondary mb-1">This Year</p>
          <p className="font-mono text-2xl font-bold text-text-primary">
            {stats.thisYear}
          </p>
          <p className="text-xs text-text-secondary mt-1">minutes</p>
        </Card>

        <Card>
          <p className="text-xs text-text-secondary mb-1">Streak</p>
          <p className="font-mono text-2xl font-bold text-text-primary">
            {stats.streak}
          </p>
          <p className="text-xs text-text-secondary mt-1">days</p>
        </Card>
      </div>

      <Card>
        <h3 className="font-heading font-semibold text-text-primary mb-3">Weekly Goal</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Input
              type="number"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(Math.max(1, parseInt(e.target.value) || 30))}
              className="w-24 font-mono"
              min="1"
            />
            <span className="text-sm text-text-secondary">min/day</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary">Progress</span>
              <span className="font-mono font-bold text-text-primary">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {stats.thisWeek} of {weeklyGoal * 7} minutes this week
            </p>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="font-heading font-semibold text-text-primary mb-3">
          Practice by Category
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const minutes = stats.byCategory[cat];
            const totalMinutes = Object.values(stats.byCategory).reduce((a, b) => a + b, 0);
            const percentage = totalMinutes > 0 ? (minutes / totalMinutes) * 100 : 0;
            return (
              <div key={cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-primary font-medium">{cat}</span>
                  <span className="text-text-secondary font-mono">{minutes} min</span>
                </div>
                <div className="w-full bg-surface rounded h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${CATEGORY_COLOURS[cat]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {logs.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-text-primary mb-3">
            Recent Sessions (Last 20)
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {logs.slice(0, 20).map((log) => (
              <Card key={log.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-text-primary">
                      {new Date(log.date).toLocaleDateString('en-GB')}
                    </span>
                    <span className="text-xs bg-surface px-2 py-1 rounded text-text-primary font-medium">
                      {log.category}
                    </span>
                    <span className="text-xs bg-surface px-2 py-1 rounded text-text-primary font-medium">
                      {log.instrument}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-1">
                    <span className="font-mono font-bold text-text-primary">{log.duration}</span> min
                  </p>
                  {log.notes && <p className="text-xs text-text-secondary">{log.notes}</p>}
                  {log.rating > 0 && (
                    <p className="text-xs text-accent-warm mt-1">
                      {'★'.repeat(log.rating)}{'☆'.repeat(5 - log.rating)}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEditLog(log)}
                    className="px-2 py-1 text-xs font-medium text-accent hover:bg-accent/5 rounded transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="px-2 py-1 text-xs font-medium text-error hover:bg-error/5 rounded transition-all"
                  >
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {logs.length === 0 && (
        <p className="text-sm text-text-secondary italic text-center py-4">
          Start logging your practice sessions to track your progress.
        </p>
      )}
    </div>
  );
}
