"use client";

import { useState, useMemo, useCallback } from "react";
import { downloadAsJPG } from "@/lib/download-utils";

const CEREMONY_TYPES = [
  { value: "church", label: "Church", icon: "⛪" },
  { value: "civil", label: "Civil", icon: "🏛" },
  { value: "outdoor", label: "Outdoor", icon: "🌳" },
];

const SPEECH_TIMINGS = [
  { value: "before-meal", label: "Before meal" },
  { value: "during-meal", label: "During meal" },
  { value: "after-meal", label: "After meal" },
];

function addMins(date, mins) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + mins);
  return d;
}

function fmt(date) {
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function buildTimeline(config) {
  const events = [];
  const ceremony = new Date(`2025-01-01T${config.ceremonyTime}`);

  events.push({ time: fmt(addMins(ceremony, -30)), title: "Guests arrive and take seats", duration: "30 mins", icon: "🪑" });
  events.push({ time: fmt(ceremony), title: `${config.ceremonyType === "church" ? "Church" : config.ceremonyType === "civil" ? "Civil" : "Outdoor"} ceremony`, duration: "30-45 mins", icon: "💍" });

  let t = addMins(ceremony, 40);
  events.push({ time: fmt(t), title: config.ceremonyType === "church" ? "Signing the register" : "Couple photographs", duration: "15-20 mins", icon: "📸" });

  t = addMins(t, 20);
  events.push({ time: fmt(t), title: "Confetti and exit", duration: "10 mins", icon: "🎊" });

  const reception = config.receptionAtSameVenue ? addMins(t, 20) : new Date(`2025-01-01T${config.receptionTime}`);
  events.push({ time: fmt(reception), title: "Drinks reception", duration: "1 hour", icon: "🥂" });

  const meal = addMins(reception, 60);
  events.push({ time: fmt(meal), title: "Wedding breakfast", duration: "1.5-2 hours", icon: "🍽" });

  let speechTime;
  if (config.speechesTiming === "before-meal") speechTime = addMins(meal, -15);
  else if (config.speechesTiming === "during-meal") speechTime = addMins(meal, 30);
  else speechTime = addMins(meal, 90);

  events.push({ time: fmt(speechTime), title: "Speeches and toasts", duration: "30-45 mins", icon: "🎤" });

  const dance = addMins(speechTime, 50);
  events.push({ time: fmt(dance), title: "First dance", duration: "5 mins", icon: "💃" });

  const party = addMins(dance, 10);
  events.push({ time: fmt(party), title: "Dancing and entertainment", duration: "2-3 hours", icon: "🎶" });

  const cake = addMins(party, 90);
  events.push({ time: fmt(cake), title: "Cake cutting", duration: "15 mins", icon: "🎂" });

  if (config.hasEveningEvent) {
    events.push({ time: fmt(addMins(cake, 45)), title: "Evening reception", duration: "2-3 hours", icon: "🌙" });
  }

  return events;
}

export default function WeddingTimelineBuilder() {
  const [config, setConfig] = useState({
    ceremonyTime: "14:00",
    ceremonyType: "church",
    receptionAtSameVenue: true,
    receptionTime: "17:00",
    hasEveningEvent: false,
    speechesTiming: "during-meal",
  });

  const timeline = useMemo(() => buildTimeline(config), [config]);

  const update = useCallback((key, val) => {
    setConfig((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleDownload = useCallback(() => {
    downloadAsJPG({
      filename: `wedding-timeline-${new Date().toISOString().split("T")[0]}.jpg`,
      width: 700,
      height: 1000,
      title: "Wedding Day Timeline",
      subtitle: "Your Special Day Schedule",
      accentColor: "#e8a317",
      render: (ctx, area) => {
        let y = area.y;
        timeline.forEach((event) => {
          ctx.fillStyle = "#e8a317";
          ctx.beginPath();
          ctx.arc(area.x + 6, y + 7, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#e8a317";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(area.x + 6, y + 11);
          ctx.lineTo(area.x + 6, y + 18);
          ctx.stroke();
          ctx.fillStyle = "#1a1a1a";
          ctx.font = "bold 12px monospace";
          ctx.textAlign = "left";
          ctx.fillText(event.time, area.x + 18, y);
          ctx.font = "bold 11px sans-serif";
          ctx.fillText(event.title, area.x + 18, y + 16);
          ctx.fillStyle = "#525252";
          ctx.font = "10px sans-serif";
          ctx.fillText(event.duration, area.x + 18, y + 30);
          y += 50;
        });
      },
    });
  }, [timeline]);

  return (
    <div className="space-y-4">
      {/* Controls row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: config */}
        <div className="space-y-3">
          {/* Ceremony time */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-text-secondary w-24 shrink-0">Ceremony</label>
            <input
              type="time"
              value={config.ceremonyTime}
              onChange={(e) => update("ceremonyTime", e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-border bg-white text-sm font-mono text-text-primary outline-none focus:border-accent"
            />
          </div>

          {/* Ceremony type pills */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-text-secondary w-24 shrink-0">Type</label>
            <div className="flex gap-1.5">
              {CEREMONY_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => update("ceremonyType", t.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    config.ceremonyType === t.value
                      ? "bg-accent text-white"
                      : "bg-surface border border-border text-text-secondary hover:border-accent/30"
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Speeches timing */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-text-secondary w-24 shrink-0">Speeches</label>
            <div className="flex gap-1.5">
              {SPEECH_TIMINGS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => update("speechesTiming", t.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    config.speechesTiming === t.value
                      ? "bg-accent text-white"
                      : "bg-surface border border-border text-text-secondary hover:border-accent/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-4">
            <label className="text-xs font-medium text-text-secondary w-24 shrink-0">Options</label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={config.receptionAtSameVenue}
                onChange={(e) => update("receptionAtSameVenue", e.target.checked)}
                className="w-3.5 h-3.5 rounded"
              />
              <span className="text-xs text-text-secondary">Same venue</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={config.hasEveningEvent}
                onChange={(e) => update("hasEveningEvent", e.target.checked)}
                className="w-3.5 h-3.5 rounded"
              />
              <span className="text-xs text-text-secondary">Evening reception</span>
            </label>
          </div>

          {/* Separate reception time */}
          {!config.receptionAtSameVenue && (
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-text-secondary w-24 shrink-0">Reception</label>
              <input
                type="time"
                value={config.receptionTime}
                onChange={(e) => update("receptionTime", e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-border bg-white text-sm font-mono text-text-primary outline-none focus:border-accent"
              />
            </div>
          )}
        </div>

        {/* Right: tips */}
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-xs font-medium text-text-secondary mb-2">Tips for the day</p>
          <ul className="text-xs text-text-muted space-y-1">
            <li>- Build in 15-20 minute buffers between events</li>
            <li>- Share the timeline with your vendors in advance</li>
            <li>- Brief your photographer on key moments</li>
            <li>- Have a printed programme for guests</li>
            <li>- Assign someone to keep things on schedule</li>
          </ul>
        </div>
      </div>

      {/* Timeline - always visible, updates live */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3 flex items-center justify-between">
          <p className="font-heading text-lg font-bold text-white">Your Wedding Day</p>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Download JPG
          </button>
        </div>

        <div className="divide-y divide-border">
          {timeline.map((event, idx) => (
            <div key={idx} className="flex items-start gap-3 px-4 py-2.5">
              <span className="text-lg leading-none mt-0.5">{event.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-bold text-accent">{event.time}</span>
                  <span className="text-sm font-medium text-text-primary">{event.title}</span>
                </div>
                <span className="text-xs text-text-muted">{event.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
