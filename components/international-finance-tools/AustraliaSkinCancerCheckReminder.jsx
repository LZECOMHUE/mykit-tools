'use client';

import { useState } from 'react';

export default function AustraliaSkinCancerCheckReminder() {
  const [city, setCity] = useState('Sydney');
  const [skinType, setSkinType] = useState('fair');

  const recommendations = {
    fair: { recheck: 'Every 3 months', risk: 'Very High' },
    light: { recheck: 'Every 6 months', risk: 'High' },
    medium: { recheck: 'Annually', risk: 'Moderate' },
    olive: { recheck: 'Every 2 years', risk: 'Low-Moderate' },
    dark: { recheck: 'Every 3 years', risk: 'Low' },
  };

  const rec = recommendations[skinType];

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Location</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-white">
            <option>Sydney</option>
            <option>Melbourne</option>
            <option>Brisbane</option>
            <option>Perth</option>
            <option>Darwin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Skin Type</label>
          <select value={skinType} onChange={(e) => setSkinType(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-white">
            <option value="fair">Fair (Burns easily)</option>
            <option value="light">Light (Usually burns)</option>
            <option value="medium">Medium (Sometimes burns)</option>
            <option value="olive">Olive (Rarely burns)</option>
            <option value="dark">Dark (Very rarely burns)</option>
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-8">
        <div className="text-2xl font-bold text-orange-900 mb-2">☀️ Australia's UV Risk</div>
        <p className="text-orange-800 mb-4">Australia has one of the highest rates of skin cancer in the world due to intense sun exposure</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded p-3">
            <div className="font-medium text-orange-900">Your Risk Level</div>
            <div className="text-lg font-bold text-orange-700 mt-1">{rec.risk}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="font-medium text-orange-900">Recommended Check-Up</div>
            <div className="text-lg font-bold text-orange-700 mt-1">{rec.recheck}</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">🧴 Sun Protection</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Apply SPF 30+ sunscreen daily (year-round)</li>
          <li>• Reapply every 2 hours and after swimming</li>
          <li>• Wear protective clothing, hats, and sunglasses</li>
          <li>• Avoid sun between 10am-3pm (peak UV)</li>
          <li>• Check UV index daily before outdoor activities</li>
        </ul>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold text-red-900 mb-3">🔍 When to See a Doctor</h3>
        <p className="text-sm text-red-800 mb-3">Get checked if you notice:</p>
        <ul className="space-y-2 text-sm text-red-800">
          <li>• New moles or spots</li>
          <li>• Changes in size, shape, or color of existing moles</li>
          <li>• Itching, bleeding, or oozing from skin lesions</li>
          <li>• Scaly or crusty patches that won't heal</li>
        </ul>
      </div>
    </div>
  );
}
