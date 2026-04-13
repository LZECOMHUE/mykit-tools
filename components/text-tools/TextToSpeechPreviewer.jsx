'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

export default function TextToSpeechPreviewer() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !voice) {
        setVoice(availableVoices[0].voiceURI);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [voice]);

  const handlePlay = () => {
    if (!text.trim()) return;

    window.speechSynthesis.cancel();

    const newUtterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find((v) => v.voiceURI === voice);
    if (selectedVoice) {
      newUtterance.voice = selectedVoice;
    }
    newUtterance.rate = rate;
    newUtterance.pitch = pitch;

    newUtterance.onstart = () => setIsPlaying(true);
    newUtterance.onend = () => setIsPlaying(false);
    newUtterance.onerror = () => setIsPlaying(false);

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
    setIsPlaying(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const voiceOptions = voices.map((v) => ({
    value: v.voiceURI,
    label: `${v.name} ${v.default ? '(Default)' : ''}`,
  }));

  const isSpeaking = typeof window !== 'undefined' ? (window.speechSynthesis?.speaking || false) : false;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Enter Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text to hear it read aloud..."
          className="w-full min-h-[150px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Voice
          </label>
          {voiceOptions.length > 0 ? (
            <Select
              value={voice}
              onChange={setVoice}
              options={voiceOptions}
            />
          ) : (
            <div className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-surface text-text-muted">
              Loading voices...
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Speed: <span className="font-mono font-semibold text-text-primary">{rate.toFixed(1)}</span>x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Pitch: <span className="font-mono font-semibold text-text-primary">{pitch.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-2">
        {!isSpeaking ? (
          <Button onClick={handlePlay} disabled={!text.trim()} className="flex-1">
            Play
          </Button>
        ) : (
          <>
            <Button onClick={handlePause} className="flex-1">
              Pause
            </Button>
            <Button onClick={handleResume} className="flex-1" variant="secondary">
              Resume
            </Button>
          </>
        )}
        <Button onClick={handleStop} disabled={!isSpeaking} className="flex-1" variant="secondary">
          Stop
        </Button>
      </div>

      {isSpeaking && (
        <div className="bg-blue-100 border border-accent rounded-[var(--radius-card)] p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <p className="text-sm text-text-primary font-medium">Now playing</p>
          </div>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Listen to text read aloud with adjustable voice, speed, and pitch.</p>
      </div>
    </div>
  );
}
