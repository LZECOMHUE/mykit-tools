'use client';

import { useState, useMemo } from 'react';

export default function AustraliaBushfireRiskChecker() {
  const [temp, setTemp] = useState('35');
  const [humidity, setHumidity] = useState('25');
  const [wind, setWind] = useState('35');

  const riskLevel = useMemo(() => {
    const t = parseFloat(temp) || 35;
    const h = parseFloat(humidity) || 25;
    const w = parseFloat(wind) || 35;

    // Simplified fire danger calculation
    const score = (t * 0.3) - (h * 0.4) + (w * 0.3);

    if (score > 80) return { level: 'Catastrophic', color: 'red', text: '🚨 EXTREME DANGER' };
    if (score > 60) return { level: 'Severe', color: 'orange', text: '⚠️ HIGH DANGER' };
    if (score > 40) return { level: 'Very High', color: 'yellow', text: '🔔 MODERATE RISK' };
    if (score > 20) return { level: 'High', color: 'yellow', text: '⚠️ ELEVATED RISK' };
    return { level: 'Moderate', color: 'green', text: '✓ SAFE' };
  }, [temp, humidity, wind]);

  return (
    <div className="bg-surface rounded-lg space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Temperature</label>
          <div className="flex gap-2">
            <input type="number" value={temp} onChange={(e) => setTemp(e.target.value)} className="flex-1 px-4 py-2 border border-border rounded-lg" />
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">°C</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Humidity</label>
          <div className="flex gap-2">
            <input type="number" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="flex-1 px-4 py-2 border border-border rounded-lg" />
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Wind Speed</label>
          <div className="flex gap-2">
            <input type="number" value={wind} onChange={(e) => setWind(e.target.value)} className="flex-1 px-4 py-2 border border-border rounded-lg" />
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">km/h</span>
          </div>
        </div>
      </div>

      <div className={`rounded-lg border-2 bg-${riskLevel.color}-50 border-${riskLevel.color}-200`}>
        <div className="text-4xl mb-2">{riskLevel.text}</div>
        <div className="text-2xl font-bold">{riskLevel.level}</div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-red-900 mb-3">🔥 Bushfire Safety</h3>
        <ul className="space-y-2 text-sm text-red-800">
          <li>• Have an emergency plan before fire season</li>
          <li>• Prepare your property (clear gutters, trim trees)</li>
          <li>• Monitor official fire danger ratings</li>
          <li>• Leave early - don't wait for evacuation orders</li>
          <li>• Have emergency supplies ready</li>
          <li>• Keep your car fueled in fire season</li>
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">📞 Emergency Contacts</h3>
        <p className="text-sm text-blue-800">Fire/Emergency: 000</p>
        <p className="text-sm text-blue-800">Bushfire Hotline: Check your state's emergency services</p>
      </div>
    </div>
  );
}
