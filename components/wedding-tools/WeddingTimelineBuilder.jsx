"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function WeddingTimelineBuilder() {
  const [config, setConfig] = useState({
    ceremonyTime: "14:00",
    ceremonyType: "church",
    receptionAtSameVenue: true,
    receptionTime: "17:00",
    hasEveningEvent: false,
    speechesTiming: "during-meal",
  });

  const [timeline, setTimeline] = useState(null);

  const generateTimeline = () => {
    const events = [];

    const parsedCeremonyTime = new Date(`2025-01-01T${config.ceremonyTime}`);
    let currentTime = new Date(parsedCeremonyTime);

    // Ceremony prep
    let prepTime = new Date(currentTime);
    prepTime.setMinutes(prepTime.getMinutes() - 30);
    events.push({
      time: formatTime(prepTime),
      title: "Guests arrival and seating",
      duration: "30 mins",
      details: "Guests arrive and find seats",
    });

    events.push({
      time: formatTime(currentTime),
      title: `${config.ceremonyType === "church" ? "Church" : config.ceremonyType === "civil" ? "Civil" : "Outdoor"} ceremony begins`,
      duration: "30-45 mins",
      details: "Main ceremony takes place",
    });

    currentTime.setMinutes(currentTime.getMinutes() + 40);

    events.push({
      time: formatTime(currentTime),
      title: config.ceremonyType === "church" ? "Signing register" : "Photographs",
      duration: "15-20 mins",
      details: config.ceremonyType === "church" ? "Sign the register with witnesses" : "Professional couple photos",
    });

    currentTime.setMinutes(currentTime.getMinutes() + 20);

    events.push({
      time: formatTime(currentTime),
      title: "Confetti/exit",
      duration: "10 mins",
      details: "Guests celebrate couple's exit",
    });

    currentTime.setMinutes(currentTime.getMinutes() + 10);

    // Reception start
    const receptionTime = new Date(`2025-01-01T${config.receptionTime}`);
    events.push({
      time: formatTime(receptionTime),
      title: "Reception begins",
      duration: "Cocktail hour",
      details: "Welcome drinks and canapés",
    });

    let mealtTime = new Date(receptionTime);
    mealtTime.setMinutes(mealtTime.getMinutes() + 60);

    events.push({
      time: formatTime(mealtTime),
      title: "Sit-down meal",
      duration: "1.5-2 hours",
      details: "Three-course dinner",
    });

    let speechesTime = mealtTime;
    if (config.speechesTiming === "during-meal") {
      speechesTime = new Date(mealtTime);
      speechesTime.setMinutes(speechesTime.getMinutes() + 30);
    } else if (config.speechesTiming === "after-meal") {
      speechesTime = new Date(mealtTime);
      speechesTime.setMinutes(speechesTime.getMinutes() + 90);
    } else {
      speechesTime = new Date(mealtTime);
      speechesTime.setMinutes(speechesTime.getMinutes() - 15);
    }

    events.push({
      time: formatTime(speechesTime),
      title: "Speeches and toasts",
      duration: "30-45 mins",
      details: "Bride, groom, parents, best man",
    });

    let danceTime = new Date(speechesTime);
    danceTime.setMinutes(danceTime.getMinutes() + 50);

    events.push({
      time: formatTime(danceTime),
      title: "First dance",
      duration: "5 mins",
      details: "Couple's first dance as married",
    });

    danceTime.setMinutes(danceTime.getMinutes() + 10);

    events.push({
      time: formatTime(danceTime),
      title: "Dancing and entertainment",
      duration: "2-3 hours",
      details: "DJ or live band, dancing continues",
    });

    let cakeTime = new Date(danceTime);
    cakeTime.setMinutes(cakeTime.getMinutes() + 90);

    events.push({
      time: formatTime(cakeTime),
      title: "Cake cutting",
      duration: "15 mins",
      details: "Cake cutting and desserts",
    });

    if (config.hasEveningEvent) {
      cakeTime.setMinutes(cakeTime.getMinutes() + 45);
      events.push({
        time: formatTime(cakeTime),
        title: "Evening reception",
        duration: "2-3 hours",
        details: "Additional guests arrive, food and drinks",
      });
    }

    setTimeline({ events, ceremonyTime: config.ceremonyTime });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Wedding Timeline Configuration
        </h2>

        <div className="space-y-4 mb-6">
          <Input
            label="Ceremony Start Time"
            type="time"
            value={config.ceremonyTime}
            onChange={(e) => setConfig({ ...config, ceremonyTime: e.target.value })}
          />

          <Select
            label="Ceremony Type"
            value={config.ceremonyType}
            onChange={(e) => setConfig({ ...config, ceremonyType: e.target.value })}
            options={[
              { value: "church", label: "Church ceremony" },
              { value: "civil", label: "Civil ceremony" },
              { value: "outdoor", label: "Outdoor ceremony" },
            ]}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sameVenue"
              checked={config.receptionAtSameVenue}
              onChange={(e) =>
                setConfig({ ...config, receptionAtSameVenue: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label htmlFor="sameVenue" className="text-text-secondary text-sm font-medium">
              Reception at same venue
            </label>
          </div>

          {!config.receptionAtSameVenue && (
            <Input
              label="Reception Start Time"
              type="time"
              value={config.receptionTime}
              onChange={(e) =>
                setConfig({ ...config, receptionTime: e.target.value })
              }
            />
          )}

          <Select
            label="Speeches Timing"
            value={config.speechesTiming}
            onChange={(e) =>
              setConfig({ ...config, speechesTiming: e.target.value })
            }
            options={[
              { value: "before-meal", label: "Before meal" },
              { value: "during-meal", label: "During meal (after main)" },
              { value: "after-meal", label: "After meal" },
            ]}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="evening"
              checked={config.hasEveningEvent}
              onChange={(e) =>
                setConfig({ ...config, hasEveningEvent: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label htmlFor="evening" className="text-text-secondary text-sm font-medium">
              Evening reception with additional guests
            </label>
          </div>
        </div>

        <Button onClick={generateTimeline} className="w-full">
          Generate Timeline
        </Button>
      </Card>

      {timeline && (
        <div className="space-y-4">
          <Card>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
              Your Wedding Day Timeline
            </h2>

            <div className="space-y-3">
              {timeline.events.map((event, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-accent pl-4 pb-4 last:pb-0"
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="font-mono font-bold text-accent text-lg">
                      {event.time}
                    </p>
                    <p className="font-heading font-bold text-text-primary">
                      {event.title}
                    </p>
                  </div>
                  <p className="text-text-secondary text-sm">
                    {event.duration} - {event.details}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-text-secondary text-sm font-medium mb-2">
                Tips for the day
              </p>
              <ul className="text-text-muted text-sm space-y-1 list-disc list-inside">
                <li>Build in 15-20 minute buffers between events</li>
                <li>Keep guests informed of timing via programme</li>
                <li>Have a timeline to share with your vendors</li>
                <li>Brief your photographer on key moments</li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
