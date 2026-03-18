'use client';

import { useState, useMemo } from 'react';

const weatherGuides = {
  freezing: {
    range: [-Infinity, 32],
    label: 'Freezing',
    color: 'from-blue-300 to-blue-500',
    clothes: [
      'Heavy winter coat',
      'Thermal layers',
      'Insulated boots',
      'Warm hat and gloves',
      'Scarf or neck warmer',
    ],
    activities: [
      'Indoor activities',
      'Winter sports (skiing, snowboarding)',
      'Ice skating',
      'Sledding',
    ],
    warning: 'Frostbite risk - limit outdoor time',
  },
  cold: {
    range: [32, 50],
    label: 'Cold',
    color: 'from-cyan-300 to-blue-400',
    clothes: [
      'Winter coat',
      'Long-sleeved shirt',
      'Jeans or warm pants',
      'Warm socks',
      'Hat and gloves',
    ],
    activities: [
      'Hiking',
      'Jogging (with layers)',
      'Outdoor walks',
      'Winter photography',
    ],
    warning: 'Risk of hypothermia in wet conditions',
  },
  cool: {
    range: [50, 65],
    label: 'Cool',
    color: 'from-teal-300 to-cyan-400',
    clothes: [
      'Light jacket or sweater',
      'Long-sleeved shirt',
      'Jeans',
      'Comfortable shoes',
    ],
    activities: [
      'Outdoor walking',
      'Hiking',
      'Running',
      'Outdoor shopping',
    ],
    warning: null,
  },
  comfortable: {
    range: [65, 80],
    label: 'Comfortable',
    color: 'from-green-300 to-emerald-400',
    clothes: [
      'T-shirt or light long-sleeve',
      'Light pants or shorts',
      'Sneakers',
      'Optional light jacket',
    ],
    activities: [
      'Any outdoor activity',
      'Picnicking',
      'Sports',
      'Outdoor dining',
    ],
    warning: null,
  },
  hot: {
    range: [80, 95],
    label: 'Hot',
    color: 'from-yellow-300 to-orange-400',
    clothes: [
      'T-shirt or tank top',
      'Shorts',
      'Light, breathable fabrics',
      'Hat for sun protection',
      'Sunglasses',
    ],
    activities: [
      'Swimming',
      'Beach day',
      'Light sports',
      'Water activities',
    ],
    warning: 'Stay hydrated - drink plenty of water',
  },
  extreme: {
    range: [95, Infinity],
    label: 'Extreme Heat',
    color: 'from-orange-400 to-red-500',
    clothes: [
      'Lightweight, loose-fitting clothes',
      'Light colors (white, light gray)',
      'Tank top or sleeveless',
      'Shorts',
      'Wide-brimmed hat',
      'Sunglasses',
    ],
    activities: [
      'Indoor activities',
      'Swimming (early morning/evening)',
      'Shaded outdoor activities',
      'Mall or air-conditioned venues',
    ],
    warning: 'Heat exhaustion risk - limit outdoor activity, stay hydrated, take breaks',
  },
};

export default function FahrenheitWeatherGuide() {
  const [tempF, setTempF] = useState('72');

  const guide = useMemo(() => {
    if (!tempF || isNaN(tempF)) return null;
    const temp = parseFloat(tempF);
    return Object.values(weatherGuides).find(
      (g) => temp >= g.range[0] && temp < g.range[1]
    );
  }, [tempF]);

  const tempC = useMemo(() => {
    if (!tempF || isNaN(tempF)) return null;
    return ((parseFloat(tempF) - 32) * 5) / 9;
  }, [tempF]);

  return (
    <div className="bg-surface rounded-lg p-8">
      {/* Input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Temperature
        </label>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={tempF}
            onChange={(e) => setTempF(e.target.value)}
            placeholder="Enter temperature in F"
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
          <span className="px-4 py-2 bg-white border border-border rounded-lg text-text-primary font-medium">
            °F
          </span>
        </div>

        {/* Quick Buttons */}
        <div className="flex flex-wrap gap-2">
          {[32, 50, 65, 75, 85, 95].map((temp) => (
            <button
              key={temp}
              onClick={() => setTempF(temp.toString())}
              className="px-3 py-1 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20"
            >
              {temp}°F
            </button>
          ))}
        </div>
      </div>

      {guide && tempC !== null && (
        <>
          {/* Temperature Display */}
          <div className={`bg-gradient-to-r ${guide.color} rounded-lg p-8 mb-8 text-white`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm font-medium opacity-90">Current Weather</div>
                <div className="text-5xl font-mono font-bold">{tempF}°</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{guide.label}</div>
                <div className="text-sm opacity-90 font-mono">
                  {tempC.toFixed(1)}°C
                </div>
              </div>
            </div>
            {guide.warning && (
              <div className="bg-white/20 rounded p-3 text-sm font-medium">
                ⚠️ {guide.warning}
              </div>
            )}
          </div>

          {/* What to Wear */}
          <div className="mb-8">
            <h3 className="font-semibold text-text-primary mb-4 text-lg">
              What to Wear
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {guide.clothes.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-border rounded p-3 text-text-primary"
                >
                  <span className="text-accent mr-2">✓</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Suggestions */}
          <div className="mb-8">
            <h3 className="font-semibold text-text-primary mb-4 text-lg">
              Recommended Activities
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {guide.activities.map((activity, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-border rounded p-3 text-text-primary"
                >
                  <span className="text-accent mr-2">⚡</span> {activity}
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Reference */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h3 className="font-semibold text-text-primary mb-3">
              Temperature Conversion
            </h3>
            <div className="font-mono text-text-primary space-y-1">
              <div>
                <span className="text-text-secondary">Fahrenheit: </span>
                <span className="font-bold text-lg">{tempF}°F</span>
              </div>
              <div>
                <span className="text-text-secondary">Celsius: </span>
                <span className="font-bold text-lg">{tempC.toFixed(1)}°C</span>
              </div>
            </div>
          </div>
        </>
      )}

      {!guide && (
        <div className="text-center py-8 text-text-secondary">
          Enter a temperature to see clothing and activity recommendations
        </div>
      )}
    </div>
  );
}
