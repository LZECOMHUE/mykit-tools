'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

const PRESET_CITIES = [
  { name: 'London', timezone: 'Europe/London' },
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Sydney', timezone: 'Australia/Sydney' },
  { name: 'Dubai', timezone: 'Asia/Dubai' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
  { name: 'Paris', timezone: 'Europe/Paris' },
  { name: 'Singapore', timezone: 'Asia/Singapore' },
  { name: 'Toronto', timezone: 'America/Toronto' },
  { name: 'Moscow', timezone: 'Europe/Moscow' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
  { name: 'Bangkok', timezone: 'Asia/Bangkok' },
];

export default function WorldClock() {
  const [cities, setCities] = useState([
    { id: 1, name: 'London', timezone: 'Europe/London' },
    { id: 2, name: 'New York', timezone: 'America/New_York' },
    { id: 3, name: 'Tokyo', timezone: 'Asia/Tokyo' },
  ]);

  const [selectedCity, setSelectedCity] = useState('London');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = (timezone) => {
    try {
      return new Date(time.toLocaleString('en-US', { timeZone: timezone }));
    } catch {
      return time;
    }
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handleAddCity = () => {
    const cityData = PRESET_CITIES.find((c) => c.name === selectedCity);
    if (cityData && !cities.find((c) => c.name === selectedCity)) {
      setCities([
        ...cities,
        {
          id: Date.now(),
          name: cityData.name,
          timezone: cityData.timezone,
        },
      ]);
    }
  };

  const handleRemoveCity = (id) => {
    setCities(cities.filter((c) => c.id !== id));
  };

  const availableCities = PRESET_CITIES.filter(
    (c) => !cities.find((city) => city.name === c.name)
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Select
            value={selectedCity}
            onChange={setSelectedCity}
            options={availableCities.map((c) => ({
              value: c.name,
              label: c.name,
            }))}
          />
          <Button onClick={handleAddCity} className="md:col-span-2">
            Add City
          </Button>
        </div>
      </div>

      {cities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city) => {
            const cityTime = getTimeInTimezone(city.timezone);
            return (
              <div
                key={city.id}
                className="bg-surface border border-border rounded-[var(--radius-card)] p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {city.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">{city.timezone}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveCity(city.id)}
                    className="text-text-muted hover:text-text-primary text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="font-mono text-3xl font-bold text-text-primary">
                    {formatTime(cityTime)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {formatDate(cityTime)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cities.length === 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 text-center">
          <p className="text-text-muted">Add cities to see their current time</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>View the current time in multiple cities around the world, updated every second.</p>
      </div>
    </div>
  );
}
