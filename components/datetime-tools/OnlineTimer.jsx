"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Button from "@/components/ui/Button";

const PRESETS = [
  { label: "1m", seconds: 60 },
  { label: "2m", seconds: 120 },
  { label: "3m", seconds: 180 },
  { label: "5m", seconds: 300 },
  { label: "10m", seconds: 600 },
  { label: "15m", seconds: 900 },
  { label: "30m", seconds: 1800 },
  { label: "1h", seconds: 3600 },
];

export default function OnlineTimer() {
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [remaining, setRemaining] = useState(300);
  const [status, setStatus] = useState("idle"); // idle, running, paused, finished
  const [customH, setCustomH] = useState(0);
  const [customM, setCustomM] = useState(5);
  const [customS, setCustomS] = useState(0);

  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedRemainingRef = useRef(null);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) {
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const formatShort = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  // Update document title
  useEffect(() => {
    if (status === "running" || status === "paused") {
      document.title = `${formatShort(remaining)} - Timer`;
    } else if (status === "finished") {
      document.title = "Time's Up! - Timer";
    } else {
      document.title = "Online Timer";
    }
    return () => { document.title = "Online Timer"; };
  }, [remaining, status]);

  // Timer tick using wall-clock for accuracy
  useEffect(() => {
    if (status !== "running") return;

    startTimeRef.current = Date.now();
    pausedRemainingRef.current = remaining;

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const newRemaining = Math.max(0, pausedRemainingRef.current - elapsed);
      setRemaining(newRemaining);
      if (newRemaining <= 0) {
        clearInterval(intervalRef.current);
        setStatus("finished");
        playAlarm();
      }
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [status]);

  const playAlarm = useCallback(() => {
    try {
      const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const now = ctx.currentTime;

      // Play 3 beep sequences
      for (let rep = 0; rep < 3; rep++) {
        const baseTime = now + rep * 0.6;
        [0, 0.15, 0.3].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 880;
          osc.type = "sine";
          gain.gain.setValueAtTime(0.35, baseTime + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, baseTime + offset + 0.12);
          osc.start(baseTime + offset);
          osc.stop(baseTime + offset + 0.12);
        });
      }
    } catch (e) {
      // Audio not available
    }
  }, []);

  const selectPreset = (seconds) => {
    setTotalSeconds(seconds);
    setRemaining(seconds);
    setStatus("idle");
    clearInterval(intervalRef.current);
    // Update custom inputs to reflect
    setCustomH(Math.floor(seconds / 3600));
    setCustomM(Math.floor((seconds % 3600) / 60));
    setCustomS(seconds % 60);
  };

  const applyCustom = () => {
    const total = (customH || 0) * 3600 + (customM || 0) * 60 + (customS || 0);
    if (total <= 0) return;
    setTotalSeconds(total);
    setRemaining(total);
    setStatus("idle");
    clearInterval(intervalRef.current);
  };

  const handleStart = () => {
    if (remaining <= 0) return;
    setStatus("running");
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setStatus("paused");
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRemaining(totalSeconds);
    setStatus("idle");
  };

  // Sync custom inputs when idle
  const handleCustomChange = (field, val) => {
    const num = Math.max(0, parseInt(val) || 0);
    let h = customH, m = customM, s = customS;
    if (field === "h") { h = Math.min(num, 23); setCustomH(h); }
    if (field === "m") { m = Math.min(num, 59); setCustomM(m); }
    if (field === "s") { s = Math.min(num, 59); setCustomS(s); }
    const total = h * 3600 + m * 60 + s;
    if (total > 0 && status === "idle") {
      setTotalSeconds(total);
      setRemaining(total);
    }
  };

  // Progress calculation
  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference * (1 - progress);

  // Ring colour
  const ringColor = status === "finished"
    ? "text-red-500"
    : remaining <= 10 && status === "running"
      ? "text-amber-500"
      : "text-accent";

  const isEditable = status === "idle";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Preset pills */}
      <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => selectPreset(p.seconds)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              totalSeconds === p.seconds && status === "idle"
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Custom time input */}
      {isEditable && (
        <div className="flex items-center justify-center gap-1 mb-4">
          <input
            type="number"
            min={0}
            max={23}
            value={customH}
            onChange={(e) => handleCustomChange("h", e.target.value)}
            className="w-14 text-center font-mono text-sm py-1.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="H"
          />
          <span className="text-text-muted font-mono">:</span>
          <input
            type="number"
            min={0}
            max={59}
            value={customM}
            onChange={(e) => handleCustomChange("m", e.target.value)}
            className="w-14 text-center font-mono text-sm py-1.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="M"
          />
          <span className="text-text-muted font-mono">:</span>
          <input
            type="number"
            min={0}
            max={59}
            value={customS}
            onChange={(e) => handleCustomChange("s", e.target.value)}
            className="w-14 text-center font-mono text-sm py-1.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="S"
          />
        </div>
      )}

      {/* Timer display with progress ring */}
      <div className="flex justify-center mb-4">
        <div className="relative w-60 h-60">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 240 240"
          >
            <circle
              cx="120" cy="120" r="110"
              fill="none" stroke="currentColor" strokeWidth="4"
              className="text-border"
            />
            <circle
              cx="120" cy="120" r="110"
              fill="none" stroke="currentColor" strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-200 ${ringColor}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`font-mono font-bold text-text-primary select-none ${
              remaining >= 3600 ? "text-4xl" : "text-5xl"
            }`}>
              {formatTime(remaining)}
            </div>
            {status === "finished" && (
              <div className="text-sm font-medium text-red-500 mt-1 animate-pulse">
                Time's up!
              </div>
            )}
            {status === "paused" && (
              <div className="text-xs text-text-muted mt-1">Paused</div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        {status === "idle" && (
          <Button onClick={handleStart} disabled={remaining <= 0}>
            Start
          </Button>
        )}
        {status === "running" && (
          <Button onClick={handlePause}>Pause</Button>
        )}
        {status === "paused" && (
          <Button onClick={handleStart}>Resume</Button>
        )}
        {status === "finished" && (
          <Button onClick={handleReset}>Restart</Button>
        )}
        {(status === "running" || status === "paused") && (
          <Button variant="secondary" onClick={handleReset}>Reset</Button>
        )}
        {status === "finished" && (
          <Button variant="secondary" onClick={() => {
            setStatus("idle");
            setRemaining(totalSeconds);
          }}>
            New Timer
          </Button>
        )}
      </div>
    </div>
  );
}
