'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const STORAGE_KEY_PREFIX = 'mykit-setlist-';

function secondsToMMSS(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function MMSSToSeconds(mmss) {
  const [mins, secs] = mmss.split(':').map(Number);
  return (mins || 0) * 60 + (secs || 0);
}

export default function SetlistTimer() {
  const [setlistId] = useState(() => `${Date.now()}`);
  const [songs, setSongs] = useState([]);
  const [targetTime, setTargetTime] = useState('');
  const [mode, setMode] = useState('planning'); // 'planning' or 'live'
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);
  const [newSongName, setNewSongName] = useState('');
  const [newSongDuration, setNewSongDuration] = useState('4:00');
  const [editingId, setEditingId] = useState(null);
  const [expandedNotes, setExpandedNotes] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${setlistId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSongs(data.songs || []);
        setTargetTime(data.targetTime || '');
      } catch {
        // Silent fail on corrupt data
      }
    }
  }, [setlistId]);

  // Save to localStorage
  useEffect(() => {
    const data = { songs, targetTime };
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${setlistId}`, JSON.stringify(data));
  }, [songs, targetTime, setlistId]);

  // Timer effect
  useEffect(() => {
    if (!isPlaying || mode !== 'live') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, mode]);

  const handleAddSong = () => {
    if (!newSongName.trim()) return;

    const newSong = {
      id: Date.now(),
      name: newSongName.trim(),
      duration: MMSSToSeconds(newSongDuration),
      notes: '',
    };

    setSongs([...songs, newSong]);
    setNewSongName('');
    setNewSongDuration('4:00');
  };

  const handleDeleteSong = (id) => {
    setSongs(songs.filter((s) => s.id !== id));
    if (mode === 'live' && currentSongIndex >= songs.length - 1) {
      setCurrentSongIndex(Math.max(0, songs.length - 2));
    }
  };

  const handleReorderSong = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === songs.length - 1)
    ) {
      return;
    }

    const newSongs = [...songs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSongs[index], newSongs[targetIndex]] = [newSongs[targetIndex], newSongs[index]];
    setSongs(newSongs);

    if (mode === 'live') {
      if (currentSongIndex === index) {
        setCurrentSongIndex(targetIndex);
      } else if (currentSongIndex === targetIndex) {
        setCurrentSongIndex(index);
      }
    }
  };

  const handleUpdateSong = (id, field, value) => {
    setSongs(
      songs.map((s) =>
        s.id === id
          ? {
              ...s,
              [field]: field === 'duration' ? MMSSToSeconds(value) : value,
            }
          : s
      )
    );
  };

  const handleStartSet = () => {
    setMode('live');
    setCurrentSongIndex(0);
    setElapsedSeconds(0);
    setIsPlaying(true);
  };

  const handleNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      // Don't reset elapsed, it keeps running
    }
  };

  const handleEndSet = () => {
    setMode('planning');
    setIsPlaying(false);
    setCurrentSongIndex(0);
    setElapsedSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newSongName.trim()) {
      handleAddSong();
    }
  };

  // Calculate totals
  const totalDuration = songs.reduce((sum, s) => sum + s.duration, 0);
  const targetDurationSeconds = targetTime ? MMSSToSeconds(targetTime) : null;
  const timeDifference = targetDurationSeconds ? totalDuration - targetDurationSeconds : null;

  // Calculate running time for each song
  const runningTimes = songs.reduce((acc, song, idx) => {
    const runningTotal = songs.slice(0, idx + 1).reduce((sum, s) => sum + s.duration, 0);
    acc.push(runningTotal);
    return acc;
  }, []);

  // Get current song elapsed
  const currentSongStartTime = currentSongIndex === 0 ? 0 : runningTimes[currentSongIndex - 1];
  const currentSongElapsed = Math.max(0, elapsedSeconds - currentSongStartTime);
  const currentSong = songs[currentSongIndex];
  const currentSongRemaining = currentSong ? currentSong.duration - currentSongElapsed : 0;

  // Set ended?
  const setEnded = mode === 'live' && currentSongIndex === songs.length - 1 && currentSongRemaining <= 0;

  return (
    <div className="space-y-6">
      {/* Summary Panel */}
      <Card>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-text-muted uppercase font-medium">Songs</p>
            <p className="text-2xl font-mono font-bold text-text-primary">{songs.length}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase font-medium">Total Time</p>
            <p className="text-2xl font-mono font-bold text-text-primary">
              {secondsToMMSS(totalDuration)}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-2">
            <Input
              label="Target Time"
              id="target-time"
              placeholder="HH:MM:SS"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="mb-0"
            />
          </div>
        </div>

        {/* Time status */}
        {targetDurationSeconds && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-text-secondary">
                {timeDifference > 0 ? 'Over by' : 'Under by'}
              </span>
              <span
                className={`text-lg font-mono font-bold ${
                  timeDifference > 0 ? 'text-error' : 'text-success'
                }`}
              >
                {secondsToMMSS(Math.abs(timeDifference))}
              </span>
            </div>
          </div>
        )}

        {/* Live mode status */}
        {mode === 'live' && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-text-secondary">Elapsed</span>
              <span className="text-2xl font-mono font-bold text-accent">
                {secondsToMMSS(elapsedSeconds)}
              </span>
            </div>
            {currentSong && (
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-text-secondary">Current Song Remaining</span>
                <span className="text-lg font-mono font-bold text-text-primary">
                  {secondsToMMSS(Math.max(0, currentSongRemaining))}
                </span>
              </div>
            )}
            {setEnded && (
              <div className="bg-success/10 border border-success rounded-lg p-3 text-center">
                <p className="text-sm font-medium text-success">Set Complete!</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Mode Toggle & Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {mode === 'planning' ? (
          <Button
            onClick={handleStartSet}
            disabled={songs.length === 0}
            variant="primary"
            className="flex-1"
          >
            Start Set
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="primary"
              className="flex-1"
            >
              {isPlaying ? 'Pause' : 'Resume'}
            </Button>
            <Button onClick={handleEndSet} variant="secondary" className="flex-1">
              End Set
            </Button>
          </>
        )}
      </div>

      {/* Planning Mode: Add Song Form */}
      {mode === 'planning' && (
        <Card>
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-text-primary">Add Song</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                label="Song Name"
                id="song-name"
                placeholder="Enter song name..."
                value={newSongName}
                onChange={(e) => setNewSongName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 mb-0"
              />
              <Input
                label="Duration (MM:SS)"
                id="song-duration"
                placeholder="4:00"
                value={newSongDuration}
                onChange={(e) => setNewSongDuration(e.target.value)}
                className="w-full sm:w-24 mb-0"
              />
              <div className="flex items-end">
                <Button onClick={handleAddSong} variant="primary" className="w-full sm:w-auto">
                  Add
                </Button>
              </div>
            </div>
            <p className="text-xs text-text-muted">Press Enter or click Add. Default duration: 4:00</p>
          </div>
        </Card>
      )}

      {/* Songs List */}
      <div className="space-y-3">
        {songs.length === 0 ? (
          <Card>
            <p className="text-center text-text-muted py-8">No songs added yet. Start building your setlist above.</p>
          </Card>
        ) : (
          songs.map((song, idx) => {
            const runningTime = runningTimes[idx];
            const isCurrentSong = mode === 'live' && currentSongIndex === idx;

            return (
              <Card
                key={song.id}
                className={`transition-all ${
                  isCurrentSong ? 'bg-accent/5 border-accent' : ''
                }`}
              >
                <div className="space-y-3">
                  {/* Header Row */}
                  <div className="flex items-start gap-3">
                    <div className="text-2xl font-mono font-bold text-text-secondary min-w-12">
                      {idx + 1}
                      {isCurrentSong && <div className="text-xs text-accent font-medium mt-1">LIVE</div>}
                    </div>

                    {mode === 'planning' ? (
                      /* Planning Mode: Editable fields */
                      <div className="flex-1 space-y-2">
                        <Input
                          id={`song-name-${song.id}`}
                          value={song.name}
                          onChange={(e) => handleUpdateSong(song.id, 'name', e.target.value)}
                          className="mb-0"
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Input
                            id={`song-duration-${song.id}`}
                            value={secondsToMMSS(song.duration)}
                            onChange={(e) => handleUpdateSong(song.id, 'duration', e.target.value)}
                            className="w-full sm:w-28 mb-0"
                          />
                          <div className="flex-1 flex items-end">
                            <button
                              onClick={() =>
                                setExpandedNotes(expandedNotes === song.id ? null : song.id)
                              }
                              className="text-xs text-accent hover:text-accent-hover font-medium px-2 py-2"
                            >
                              {expandedNotes === song.id ? 'Hide' : 'Notes'}
                            </button>
                          </div>
                        </div>
                        {expandedNotes === song.id && (
                          <textarea
                            value={song.notes}
                            onChange={(e) => handleUpdateSong(song.id, 'notes', e.target.value)}
                            placeholder="Key, tuning, tempo, or other notes..."
                            className="w-full bg-background border border-border rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
                            rows="2"
                          />
                        )}
                      </div>
                    ) : (
                      /* Live Mode: Display only */
                      <div className="flex-1">
                        <p className="font-medium text-text-primary text-lg">{song.name}</p>
                        {song.notes && (
                          <p className="text-xs text-text-muted mt-1">{song.notes}</p>
                        )}
                        <p className="text-sm text-text-secondary mt-2">
                          Duration: <span className="font-mono">{secondsToMMSS(song.duration)}</span>
                        </p>
                        {isCurrentSong && (
                          <div className="mt-3 bg-background border border-accent rounded-lg p-3">
                            <div className="flex items-baseline justify-between mb-2">
                              <span className="text-xs font-medium text-accent uppercase">Current</span>
                              <span className="text-xs text-text-muted">{secondsToMMSS(Math.max(0, currentSongRemaining))}</span>
                            </div>
                            <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-accent h-2 transition-all duration-300"
                                style={{
                                  width: `${Math.min(100, (currentSongElapsed / song.duration) * 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-1">
                      {mode === 'planning' && (
                        <>
                          <button
                            onClick={() => handleReorderSong(idx, 'up')}
                            disabled={idx === 0}
                            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title="Move up"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleReorderSong(idx, 'down')}
                            disabled={idx === songs.length - 1}
                            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            title="Move down"
                          >
                            ▼
                          </button>
                        </>
                      )}
                      {mode === 'planning' && (
                        <button
                          onClick={() => handleDeleteSong(song.id)}
                          className="p-2 text-error hover:text-error hover:bg-error/5 rounded transition-colors"
                          title="Delete song"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Running Time Footer */}
                  <div className="text-xs text-text-muted pt-2 border-t border-border">
                    After this song: <span className="font-mono font-semibold">{secondsToMMSS(runningTime)}</span>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Live Mode: Next Song Button */}
      {mode === 'live' && currentSongIndex < songs.length - 1 && (
        <Card className="bg-accent/5 border-accent">
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">Next up:</p>
            <p className="font-heading text-xl font-semibold text-text-primary">
              {songs[currentSongIndex + 1].name}
            </p>
            <Button onClick={handleNextSong} variant="primary" className="w-full">
              Skip to Next Song
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
