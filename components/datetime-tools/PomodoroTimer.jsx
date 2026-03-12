'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PomodoroTimer() {
  // Timer state
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [taskLabel, setTaskLabel] = useState('');

  // Session state
  const [phase, setPhase] = useState('work'); // 'work', 'short-break', 'long-break'
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // in seconds
  const [totalFocusTimeToday, setTotalFocusTimeToday] = useState(0);

  const audioContextRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const hasNotifiedRef = useRef(false);

  // Initialize timer on mount
  useEffect(() => {
    // Load stats from localStorage
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('pomodoroDate');
    const savedStats = localStorage.getItem('pomodoroStats');

    if (savedDate === today && savedStats) {
      const stats = JSON.parse(savedStats);
      setSessionsCompleted(stats.sessionsCompleted || 0);
      setTotalFocusTimeToday(stats.totalFocusTimeToday || 0);
    } else {
      // Reset daily stats
      localStorage.setItem('pomodoroDate', today);
      localStorage.setItem('pomodoroStats', JSON.stringify({
        sessionsCompleted: 0,
        totalFocusTimeToday: 0,
      }));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer finished
          playBellSound();
          hasNotifiedRef.current = false;

          // Advance to next phase
          if (phase === 'work') {
            // Move to short or long break
            if (sessionsCompleted > 0 && sessionsCompleted % 4 === 0) {
              setPhase('long-break');
              setTimeRemaining(longBreakDuration * 60);
            } else {
              setPhase('short-break');
              setTimeRemaining(shortBreakDuration * 60);
            }

            // Record completed session
            setSessionsCompleted((prev) => {
              const updated = prev + 1;
              updateDailyStats(totalFocusTimeToday + workDuration, updated);
              return updated;
            });
          } else {
            // Break finished, back to work
            setPhase('work');
            setTimeRemaining(workDuration * 60);
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRunning, phase, workDuration, shortBreakDuration, longBreakDuration, sessionsCompleted, totalFocusTimeToday]);

  const updateDailyStats = (focusTime, sessions) => {
    const today = new Date().toDateString();
    localStorage.setItem('pomodoroStats', JSON.stringify({
      sessionsCompleted: sessions,
      totalFocusTimeToday: focusTime,
    }));
  };

  const playBellSound = () => {
    if (hasNotifiedRef.current) return; // Prevent multiple sounds
    hasNotifiedRef.current = true;

    try {
      const audioContext = audioContextRef.current || new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const now = audioContext.currentTime;
      const notes = [
        { frequency: 800, duration: 0.1, startTime: now },
        { frequency: 600, duration: 0.15, startTime: now + 0.1 },
        { frequency: 800, duration: 0.2, startTime: now + 0.25 },
      ];

      notes.forEach(({ frequency, duration, startTime }) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.value = frequency;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (error) {
      console.error('Failed to play notification sound:', error);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('work');
    setTimeRemaining(workDuration * 60);
    setTaskLabel('');
  };

  const handleWorkDurationChange = (e) => {
    const value = Math.min(60, Math.max(15, parseInt(e.target.value) || 15));
    setWorkDuration(value);
    if (!isRunning) {
      setTimeRemaining(value * 60);
    }
  };

  const handleShortBreakChange = (e) => {
    const value = Math.min(15, Math.max(3, parseInt(e.target.value) || 5));
    setShortBreakDuration(value);
  };

  const handleLongBreakChange = (e) => {
    const value = Math.min(30, Math.max(10, parseInt(e.target.value) || 15));
    setLongBreakDuration(value);
  };

  // Get phase colors
  const getPhaseColors = () => {
    switch (phase) {
      case 'work':
        return {
          bg: 'bg-red-50',
          ring: 'text-red-500',
          text: 'text-red-700',
          border: 'border-red-200',
          label: 'Work',
        };
      case 'short-break':
        return {
          bg: 'bg-green-50',
          ring: 'text-green-500',
          text: 'text-green-700',
          border: 'border-green-200',
          label: 'Short Break',
        };
      case 'long-break':
        return {
          bg: 'bg-blue-50',
          ring: 'text-blue-500',
          text: 'text-blue-700',
          border: 'border-blue-200',
          label: 'Long Break',
        };
      default:
        return {
          bg: 'bg-surface',
          ring: 'text-accent',
          text: 'text-primary',
          border: 'border-border',
          label: 'Unknown',
        };
    }
  };

  const colors = getPhaseColors();
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const totalDuration = phase === 'work' ? workDuration : phase === 'short-break' ? shortBreakDuration : longBreakDuration;
  const progress = ((totalDuration * 60 - timeRemaining) / (totalDuration * 60)) * 100;
  const circumference = 2 * Math.PI * 90; // radius 90
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      {/* Settings Panel */}
      <Card className="mb-8 p-6 border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Work Duration (min)
            </label>
            <input
              type="number"
              min="15"
              max="60"
              value={workDuration}
              onChange={handleWorkDurationChange}
              disabled={isRunning}
              className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-surface disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Short Break (min)
            </label>
            <input
              type="number"
              min="3"
              max="15"
              value={shortBreakDuration}
              onChange={handleShortBreakChange}
              disabled={isRunning}
              className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-surface disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Long Break (min)
            </label>
            <input
              type="number"
              min="10"
              max="30"
              value={longBreakDuration}
              onChange={handleLongBreakChange}
              disabled={isRunning}
              className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-surface disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Task
            </label>
            <input
              type="text"
              value={taskLabel}
              onChange={(e) => setTaskLabel(e.target.value)}
              placeholder="What are you working on?"
              className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Timer Display */}
      <div className={`${colors.bg} rounded-xl border-2 ${colors.border} p-8 mb-8`}>
        {/* Phase Indicator */}
        <div className="text-center mb-6">
          <p className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}>
            {colors.label}
          </p>
          {taskLabel && (
            <p className="text-sm text-text-secondary mt-1 truncate">{taskLabel}</p>
          )}
        </div>

        {/* Circular Timer */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            {/* Background circle */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-border"
              />
              {/* Progress ring */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${colors.ring}`}
              />
            </svg>

            {/* Timer text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-mono text-5xl font-bold text-text-primary">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center mb-6">
          {!isRunning ? (
            <Button onClick={handleStart} className="bg-accent hover:bg-accent-hover text-white">
              Start
            </Button>
          ) : (
            <Button onClick={handlePause} className="bg-accent hover:bg-accent-hover text-white">
              Pause
            </Button>
          )}
          <Button
            onClick={handleReset}
            className="bg-white border border-border text-text-primary hover:bg-surface"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Stats */}
      <Card className="p-6 border border-border">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Today's Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary">Sessions Completed</span>
            <span className="font-mono text-sm font-semibold text-text-primary">
              {sessionsCompleted}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary">Total Focus Time</span>
            <span className="font-mono text-sm font-semibold text-text-primary">
              {Math.floor(totalFocusTimeToday / 60)}h {totalFocusTimeToday % 60}m
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary">Current Streak</span>
            <span className="font-mono text-sm font-semibold text-text-primary">
              {sessionsCompleted > 0 ? '🔥' : '—'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
