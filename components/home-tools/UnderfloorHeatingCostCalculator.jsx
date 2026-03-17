'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const formatCurrency = (value) => {
  if (value < 1) {
    return 'p' + (value * 100).toFixed(1);
  }
  return '£' + value.toFixed(2);
};

export default function UnderfloorHeatingCostCalculator() {
  const [roomArea, setRoomArea] = useState(20);
  const [systemType, setSystemType] = useState('electric-mat');
  const [insulationQuality, setInsulationQuality] = useState('average');
  const [heatingHoursPerDay, setHeatingHoursPerDay] = useState(8);
  const [electricityTariff, setElectricityTariff] = useState(24.5);
  const [gasTariff, setGasTariff] = useState(6.2);
  const [roomTemperature, setRoomTemperature] = useState(20);

  const systemTypes = [
    { value: 'electric-mat', label: 'Electric Mat System' },
    { value: 'electric-cable', label: 'Electric Cable System' },
    { value: 'wet-system', label: 'Wet System (pipes + boiler)' },
    { value: 'wet-ashp', label: 'Wet System (heat pump)' },
  ];

  const insulationOptions = [
    { value: 'poor', label: 'Poor (no insulation)' },
    { value: 'average', label: 'Average (some insulation)' },
    { value: 'good', label: 'Good (well insulated)' },
  ];

  const calculations = useMemo(() => {
    // Installation costs and running efficiency by system type
    const specs = {
      'electric-mat': {
        costPerM2: 50,
        totalCost: roomArea * 50,
        efficiency: 1.0,
        wattagePerM2: 150, // Typical 150W/m2
        lifespan: 20,
        maintenance: 20,
      },
      'electric-cable': {
        costPerM2: 40,
        totalCost: roomArea * 40,
        efficiency: 1.0,
        wattagePerM2: 120, // Typical 120W/m2
        lifespan: 25,
        maintenance: 15,
      },
      'wet-system': {
        costPerM2: 80,
        totalCost: roomArea * 80 + 2500, // Plus boiler
        efficiency: 0.90, // 90% efficient boiler
        wattagePerM2: 100, // Lower due to water thermal mass
        lifespan: 25,
        maintenance: 150, // Annual boiler service
      },
      'wet-ashp': {
        costPerM2: 100,
        totalCost: roomArea * 100 + 8000, // Plus heat pump
        efficiency: 3.2, // COP of 3.2
        wattagePerM2: 80,
        lifespan: 25,
        maintenance: 100,
      },
    };

    const system = specs[systemType];

    // Efficiency factor by insulation quality
    const insulationFactors = {
      poor: 1.3,
      average: 1.0,
      good: 0.7,
    };

    const insulationFactor = insulationFactors[insulationQuality];

    // Power needed (adjusted for insulation and temperature)
    const temperatureFactor = (roomTemperature / 20);
    const basePower = roomArea * system.wattagePerM2 * insulationFactor * temperatureFactor;

    // Daily heating calculation
    const hoursPerDay = heatingHoursPerDay;
    const dailyKwh = (basePower / 1000) * hoursPerDay;
    const monthlyKwh = dailyKwh * 30.44;
    const annualKwh = dailyKwh * 365;

    // Running costs by system type
    let dailyCost, monthlyCost, annualCost;

    if (systemType === 'electric-mat' || systemType === 'electric-cable') {
      const electricityRate = electricityTariff / 100;
      dailyCost = dailyKwh * electricityRate;
      monthlyCost = monthlyKwh * electricityRate;
      annualCost = annualKwh * electricityRate;
    } else if (systemType === 'wet-system') {
      // Gas boiler
      const gasRate = gasTariff / 100;
      const heatRequired = dailyKwh; // Heat needed
      const gasCost = (heatRequired / 0.90) * gasRate; // Account for 90% efficiency
      dailyCost = gasCost;
      monthlyCost = gasCost * 30.44;
      annualCost = gasCost * 365;
    } else {
      // Heat pump
      const electricityRate = electricityTariff / 100;
      const heatRequired = dailyKwh; // Heat needed
      const electricityNeeded = (heatRequired / 3.2); // COP of 3.2
      dailyCost = electricityNeeded * electricityRate;
      monthlyCost = electricityNeeded * 30.44 * electricityRate;
      annualCost = electricityNeeded * 365 * electricityRate;
    }

    // Total costs over 10 and 25 years
    const cost10Year = system.totalCost + (annualCost * 10) + (system.maintenance * 10);
    const cost25Year = system.totalCost + (annualCost * 25) + (system.maintenance * 25);

    // Radiator comparison
    const radiatorInstallationCost = roomArea * 200; // Rough estimate
    const radiatorHeatingCost = annualCost * 1.15; // ~15% less efficient than UFH
    const radiatorCost10Year = radiatorInstallationCost + (radiatorHeatingCost * 10) + (150 * 10); // Annual maintenance

    // Comfort comparison
    const comfortRating = systemType === 'wet-ashp' ? 10 : systemType === 'wet-system' ? 9 : 7;
    const noiseLevel = systemType.includes('wet') ? 'Quiet' : 'Silent';

    return {
      system,
      basePower,
      dailyKwh,
      monthlyKwh,
      annualKwh,
      dailyCost,
      monthlyCost,
      annualCost,
      cost10Year,
      cost25Year,
      radiatorInstallationCost,
      radiatorHeatingCost,
      radiatorCost10Year,
      comfortRating,
      noiseLevel,
      insulationFactor,
      savings10Year: radiatorCost10Year - cost10Year,
      savings25Year: (radiatorInstallationCost + (radiatorHeatingCost * 25) + (150 * 25)) - cost25Year,
    };
  }, [roomArea, systemType, insulationQuality, heatingHoursPerDay, electricityTariff, gasTariff, roomTemperature]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Configuration */}
      <div className="bg-surface rounded-[12px] border border-border p-6 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-text-primary">Underfloor Heating Cost Calculator</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Room Area (m²)"
            type="number"
            value={roomArea}
            onChange={(e) => setRoomArea(parseFloat(e.target.value) || 0)}
            min="5"
            step="1"
            helper="Floor area to be heated"
          />
          <Select
            label="System Type"
            options={systemTypes}
            value={systemType}
            onChange={(e) => setSystemType(e.target.value)}
          />
          <Select
            label="Insulation Quality"
            options={insulationOptions}
            value={insulationQuality}
            onChange={(e) => setInsulationQuality(e.target.value)}
            helper="Affects heating demand"
          />
          <Input
            label="Heating Hours Per Day"
            type="number"
            value={heatingHoursPerDay}
            onChange={(e) => setHeatingHoursPerDay(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.5"
            helper="How long heating runs daily"
          />
          <Input
            label="Target Room Temperature (°C)"
            type="number"
            value={roomTemperature}
            onChange={(e) => setRoomTemperature(parseFloat(e.target.value) || 20)}
            min="15"
            max="25"
            step="1"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Electricity Rate (p/kWh)"
              type="number"
              value={electricityTariff}
              onChange={(e) => setElectricityTariff(parseFloat(e.target.value) || 0)}
              step="0.5"
              helper="24.5p"
            />
            <Input
              label="Gas Rate (p/kWh)"
              type="number"
              value={gasTariff}
              onChange={(e) => setGasTariff(parseFloat(e.target.value) || 0)}
              step="0.1"
              helper="6.2p"
            />
          </div>
        </div>
      </div>

      {/* Key Costs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-1">Installation Cost</p>
          <p className="text-2xl font-bold font-mono text-text-primary">
            {formatCurrency(calculations.system.totalCost)}
          </p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-1">Daily Running Cost</p>
          <p className="text-2xl font-bold font-mono text-text-primary">
            {formatCurrency(calculations.dailyCost)}
          </p>
          <p className="text-xs text-text-secondary mt-1">{calculations.dailyKwh.toFixed(1)} kWh</p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-1">Monthly Cost</p>
          <p className="text-2xl font-bold font-mono text-text-primary">
            {formatCurrency(calculations.monthlyCost)}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-4">
          <p className="text-xs text-green-700 uppercase font-semibold mb-1">Annual Cost</p>
          <p className="text-2xl font-bold font-mono text-green-600">
            {formatCurrency(calculations.annualCost)}
          </p>
        </div>
      </div>

      {/* UFH vs Radiators Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Underfloor Heating (This Room)</h3>

          <div className="space-y-3">
            <div className="pb-3 border-b border-border">
              <p className="text-sm text-text-secondary mb-1">Installation Cost</p>
              <p className="text-2xl font-bold font-mono text-text-primary">
                {formatCurrency(calculations.system.totalCost)}
              </p>
            </div>

            <div className="pb-3 border-b border-border">
              <p className="text-sm text-text-secondary mb-1">Annual Running Cost</p>
              <p className="text-2xl font-bold font-mono text-text-primary">
                {formatCurrency(calculations.annualCost)}
              </p>
            </div>

            <div className="pb-3 border-b border-border">
              <p className="text-sm text-text-secondary mb-1">Annual Maintenance</p>
              <p className="text-2xl font-bold font-mono text-text-primary">
                {formatCurrency(calculations.system.maintenance)}
              </p>
            </div>

            <div className="pt-2 bg-blue-50 px-3 py-2 rounded-[8px]">
              <p className="text-xs text-blue-700 font-semibold mb-2">10-Year Total Cost</p>
              <p className="text-xl font-bold font-mono text-blue-600">
                {formatCurrency(calculations.cost10Year)}
              </p>
            </div>

            <div className="pt-2 bg-blue-50 px-3 py-2 rounded-[8px]">
              <p className="text-xs text-blue-700 font-semibold mb-2">25-Year Total Cost</p>
              <p className="text-xl font-bold font-mono text-blue-600">
                {formatCurrency(calculations.cost25Year)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-amber-900 mb-4">Traditional Radiators (This Room)</h3>

          <div className="space-y-3">
            <div className="pb-3 border-b border-amber-200">
              <p className="text-sm text-amber-800 mb-1">Installation Cost</p>
              <p className="text-2xl font-bold font-mono text-amber-600">
                {formatCurrency(calculations.radiatorInstallationCost)}
              </p>
            </div>

            <div className="pb-3 border-b border-amber-200">
              <p className="text-sm text-amber-800 mb-1">Annual Running Cost</p>
              <p className="text-2xl font-bold font-mono text-amber-600">
                {formatCurrency(calculations.radiatorHeatingCost)}
              </p>
            </div>

            <div className="pb-3 border-b border-amber-200">
              <p className="text-sm text-amber-800 mb-1">Annual Maintenance</p>
              <p className="text-2xl font-bold font-mono text-amber-600">
                £150
              </p>
            </div>

            <div className="pt-2 bg-amber-100 px-3 py-2 rounded-[8px]">
              <p className="text-xs text-amber-800 font-semibold mb-2">10-Year Total Cost</p>
              <p className="text-xl font-bold font-mono text-amber-700">
                {formatCurrency(calculations.radiatorCost10Year)}
              </p>
            </div>

            <div className="pt-2 bg-amber-100 px-3 py-2 rounded-[8px]">
              <p className="text-xs text-amber-800 font-semibold mb-2">25-Year Total Cost</p>
              <p className="text-xl font-bold font-mono text-amber-700">
                {formatCurrency((calculations.radiatorInstallationCost + (calculations.radiatorHeatingCost * 25) + (150 * 25)))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-green-900 mb-4">UFH Savings vs Radiators</h3>

          <div className="space-y-3">
            <div className="pb-3 border-b border-green-200">
              <p className="text-sm text-green-800">10-Year Saving</p>
              <p className="text-2xl font-bold font-mono text-green-600">
                {calculations.savings10Year > 0 ? '+' : ''}{formatCurrency(calculations.savings10Year)}
              </p>
            </div>

            <div>
              <p className="text-sm text-green-800">25-Year Saving</p>
              <p className="text-2xl font-bold font-mono text-green-600">
                {calculations.savings25Year > 0 ? '+' : ''}{formatCurrency(calculations.savings25Year)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Comfort Comparison</h3>

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-text-primary mb-1">Underfloor Heating</p>
              <ul className="space-y-1 text-text-secondary">
                <li>Comfort rating: {calculations.comfortRating}/10</li>
                <li>Heat distribution: Even and radiant</li>
                <li>Noise: {calculations.noiseLevel}</li>
                <li>Space saving: No radiators needed</li>
                <li>Lifespan: {calculations.system.lifespan} years</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-border">
              <p className="font-semibold text-text-primary mb-1">Radiators</p>
              <ul className="space-y-1 text-text-secondary">
                <li>Comfort rating: 6/10</li>
                <li>Heat distribution: Convective</li>
                <li>Noise: Occasional creaking/gurgling</li>
                <li>Space: Takes up wall space</li>
                <li>Lifespan: 15-20 years</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* System Type Comparison */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">System Types Explained</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-bold text-text-primary mb-2">Electric Mat System</h4>
            <p className="text-text-secondary mb-2">Self-adhesive mats laid on floor, connected to thermostat.</p>
            <ul className="space-y-1 text-text-secondary text-xs">
              <li>Cost: {formatCurrency(roomArea * 50)}</li>
              <li>Best for: Small rooms, retrofits</li>
              <li>Pros: Easy install, no pipes/boiler</li>
              <li>Cons: High running costs (electric)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-2">Electric Cable System</h4>
            <p className="text-text-secondary mb-2">Heating cables embedded in screed or under tiles.</p>
            <ul className="space-y-1 text-text-secondary text-xs">
              <li>Cost: {formatCurrency(roomArea * 40)}</li>
              <li>Best for: Bathrooms, kitchens</li>
              <li>Pros: Durable, flexible layout</li>
              <li>Cons: Permanent installation, electric cost</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-2">Wet System (Gas Boiler)</h4>
            <p className="text-text-secondary mb-2">Pipes laid in floor connected to gas boiler.</p>
            <ul className="space-y-1 text-text-secondary text-xs">
              <li>Cost: {formatCurrency(roomArea * 80 + 2500)}</li>
              <li>Best for: Whole-house heating</li>
              <li>Pros: Lower running costs, radiant heat</li>
              <li>Cons: Disruptive install, boiler maintenance</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-2">Wet System (Heat Pump)</h4>
            <p className="text-text-secondary mb-2">Pipes in floor connected to air source heat pump.</p>
            <ul className="space-y-1 text-text-secondary text-xs">
              <li>Cost: {formatCurrency(roomArea * 100 + 8000)}</li>
              <li>Best for: New builds, net-zero homes</li>
              <li>Pros: Lowest running costs, green energy</li>
              <li>Cons: High upfront cost, needs good insulation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-green-900 mb-4">UFH Advantages</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Even heat distribution:</strong> Warmth across whole floor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>No radiators:</strong> More wall space for furniture</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Excellent comfort:</strong> Radiant heat feels warmer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Silent operation:</strong> No noise from heating system</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Lower temperature needed:</strong> Works at 18-20°C instead of 21-22°C</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Longer lifespan:</strong> 25+ years vs 15 for radiators</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Reduced allergies:</strong> No dust circulation from convection</span>
            </li>
          </ul>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-red-900 mb-4">UFH Disadvantages</h3>
          <ul className="space-y-2 text-sm text-red-800">
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-600 mt-0.5">✗</span>
              <span><strong>High upfront cost:</strong> £1000-3000+ for typical room</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-600 mt-0.5">✗</span>
              <span><strong>Disruptive installation:</strong> Floor must be lifted/screed laid</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-600 mt-0.5">✗</span>
              <span><strong>Slower response:</strong> Takes longer to warm up or cool down</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-600 mt-0.5">✗</span>
              <span><strong>Requires good insulation:</strong> Poor insulation wastes energy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-600 mt-0.5">✗</span>
              <span><strong>Electric versions expensive to run:</strong> Higher electricity rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-600 mt-0.5">✗</span>
              <span><strong>Difficult to repair:</strong> Pipes/cables embedded in floor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-red-600 mt-0.5">✗</span>
              <span><strong>Furniture positioning matters:</strong> Can't cover heating areas</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-blue-900 mb-4">💡 Tips for Best Results</h3>
        <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
          <li><span className="font-semibold">Insulate first:</span> Better insulation (floor, walls, ceiling) dramatically reduces heating costs</li>
          <li><span className="font-semibold">Consider whole-house:</span> More cost-effective than single rooms</li>
          <li><span className="font-semibold">Pair with heat pump:</span> Wet UFH + heat pump = lowest running costs</li>
          <li><span className="font-semibold">Use low floor coverings:</span> Avoid thick carpets that block heat transfer</li>
          <li><span className="font-semibold">Install smart thermostat:</span> Automatic scheduling maximizes efficiency</li>
          <li><span className="font-semibold">Zone the heating:</span> Heat only occupied rooms to save energy</li>
          <li><span className="font-semibold">Get multiple quotes:</span> Installation costs vary significantly</li>
          <li><span className="font-semibold">Check warranty:</span> Aim for 10+ years on system and installation</li>
        </ol>
      </div>
    </div>
  );
}
