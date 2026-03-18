'use client';

import { useState, useMemo } from 'react';

const cities = {
  toronto: { name: 'Toronto, ON', latitude: 43.65 },
  montreal: { name: 'Montreal, QC', latitude: 45.5 },
  calgary: { name: 'Calgary, AB', latitude: 51.0 },
  vancouver: { name: 'Vancouver, BC', latitude: 49.28 },
  winnipeg: { name: 'Winnipeg, MB', latitude: 49.88 },
  ottawa: { name: 'Ottawa, ON', latitude: 45.42 },
};

export default function CanadaSnowDayProbability() {
  const [city, setCity] = useState('toronto');
  const [snowfall, setSnowfall] = useState('15');
  const [temperature, setTemperature] = useState('-5');
  const [windSpeed, setWindSpeed] = useState('20');
  const [schoolBoard, setSchoolBoard] = useState('standard');

  const calculateProbability = useMemo(() => {
    let probability = 0;

    // Snowfall factor (0-40 points)
    const snowfallCm = parseFloat(snowfall) || 0;
    if (snowfallCm >= 20) probability += 40;
    else if (snowfallCm >= 15) probability += 30;
    else if (snowfallCm >= 10) probability += 20;
    else if (snowfallCm >= 5) probability += 10;

    // Temperature factor (0-30 points)
    const tempC = parseFloat(temperature) || -5;
    if (tempC <= -15) probability += 30;
    else if (tempC <= -10) probability += 25;
    else if (tempC <= -5) probability += 15;
    else if (tempC <= 0) probability += 10;

    // Wind factor (0-20 points)
    const wind = parseFloat(windSpeed) || 0;
    if (wind >= 40) probability += 20;
    else if (wind >= 30) probability += 15;
    else if (wind >= 20) probability += 10;
    else if (wind >= 10) probability += 5;

    // School board factor (multiplier)
    let multiplier = 1.0;
    if (schoolBoard === 'strict') multiplier = 1.2;
    else if (schoolBoard === 'lenient') multiplier = 0.8;

    probability = Math.round(probability * multiplier);
    probability = Math.min(99, probability); // Cap at 99%

    return {
      probability: Math.min(99, probability),
      verdict:
        probability >= 70
          ? '🎉 Very Likely'
          : probability >= 50
            ? '🤞 Likely'
            : probability >= 30
              ? '❓ Possible'
              : '❌ Unlikely',
    };
  }, [snowfall, temperature, windSpeed, schoolBoard]);

  const factors = [
    {
      label: 'Snowfall',
      value: snowfall,
      setter: setSnowfall,
      unit: 'cm',
      impact:
        parseInt(snowfall) >= 20
          ? '40%'
          : parseInt(snowfall) >= 15
            ? '30%'
            : '10-20%',
    },
    {
      label: 'Temperature',
      value: temperature,
      setter: setTemperature,
      unit: '°C',
      impact:
        parseInt(temperature) <= -15
          ? '30%'
          : parseInt(temperature) <= -10
            ? '25%'
            : '10-15%',
    },
    {
      label: 'Wind Speed',
      value: windSpeed,
      setter: setWindSpeed,
      unit: 'km/h',
      impact:
        parseInt(windSpeed) >= 40
          ? '20%'
          : parseInt(windSpeed) >= 30
            ? '15%'
            : '5-10%',
    },
  ];

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      {/* City Selection */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          City
        </label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
        >
          {Object.entries(cities).map(([key, { name }]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Weather Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
        {factors.map((factor) => (
          <div key={factor.label}>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {factor.label}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={factor.value}
                onChange={(e) => factor.setter(e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
              <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
                {factor.unit}
              </span>
            </div>
            <div className="text-xs text-text-muted mt-1">
              Impact: {factor.impact}
            </div>
          </div>
        ))}
      </div>

      {/* School Board Setting */}
      <div className="bg-white border border-border rounded-lg p-6">
        <label className="block text-sm font-medium text-text-secondary mb-3">
          School Board Type
        </label>
        <div className="flex gap-2">
          {[
            { value: 'lenient', label: 'Lenient (Rare closures)' },
            { value: 'standard', label: 'Standard (Average)' },
            { value: 'strict', label: 'Strict (Quick to close)' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSchoolBoard(option.value)}
              className={`px-4 py-2 rounded-lg border-2 transition font-medium text-sm ${
                schoolBoard === option.value
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-text-primary hover:border-accent'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Probability Display */}
      <div
        className={`rounded-lg p-8 border-2 text-center ${
          calculateProbability.probability >= 70
            ? 'bg-gradient-to-r from-green-100 to-green-50 border-green-300'
            : calculateProbability.probability >= 50
              ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-300'
              : 'bg-gradient-to-r from-red-100 to-red-50 border-red-300'
        }`}
      >
        <div className="text-5xl font-mono font-bold mb-2">
          {calculateProbability.probability}%
        </div>
        <div className="text-2xl font-semibold mb-2">
          {calculateProbability.verdict}
        </div>
        <div className="text-sm text-text-secondary">
          Chance of snow day closure
        </div>
      </div>

      {/* Factors Breakdown */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Probability Factors
        </h3>
        <div className="space-y-3">
          {[
            {
              name: 'Snowfall Amount',
              description: 'Heavy snow (20+ cm) greatly increases closure chances',
            },
            {
              name: 'Temperature',
              description: 'Very cold temps (-15°C or colder) make conditions dangerous',
            },
            {
              name: 'Wind Speed',
              description: 'High winds (40+ km/h) create blizzard conditions',
            },
            {
              name: 'School Board Policy',
              description:
                'Some boards are more cautious about safety than others',
            },
          ].map((factor, idx) => (
            <div key={idx} className="border-b border-border pb-3">
              <div className="font-medium text-text-primary mb-1">
                {factor.name}
              </div>
              <div className="text-sm text-text-secondary">
                {factor.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Snow Day Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">❄️ Snow Day Information</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            • Most Canadian schools close when conditions make travel unsafe for buses
          </li>
          <li>
            • Decisions are usually made early morning (6-7 AM) by school boards
          </li>
          <li>
            • Visibility, wind chill, and road conditions are major factors
          </li>
          <li>
            • Check your school board's website or local radio stations for closures
          </li>
          <li>
            • This calculator is for fun - actual closures depend on many factors!
          </li>
        </ul>
      </div>

      {/* Historical Snow Days */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">
          Average Snow Days by Region
        </h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          {[
            { region: 'Atlantic Canada', days: '6-8' },
            { region: 'Quebec', days: '5-7' },
            { region: 'Ontario', days: '4-6' },
            { region: 'Prairies', days: '8-12' },
            { region: 'British Columbia', days: '2-4' },
          ].map((item) => (
            <div
              key={item.region}
              className="flex justify-between p-2 bg-surface rounded"
            >
              <span className="text-text-secondary">{item.region}</span>
              <span className="font-mono font-bold text-accent">
                {item.days} days/year
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Note */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <p className="text-sm text-purple-800">
          ❓ Did you know? Some kids check the weather obsessively on winter
          mornings hoping for a snow day announcement. This calculator is just
          for fun - actual school closures depend on road conditions, bus driver
          safety assessments, and your specific school board's policies!
        </p>
      </div>
    </div>
  );
}
