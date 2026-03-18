'use client';

import { useState, useMemo } from 'react';

const formatINR = (amount) => {
  if (amount < 0) return '-' + formatINR(-amount);
  const str = Math.round(amount).toString();
  if (str.length <= 3) return str;
  let result = str.slice(-3);
  let remaining = str.slice(0, -3);
  while (remaining.length > 2) {
    result = remaining.slice(-2) + ',' + result;
    remaining = remaining.slice(0, -2);
  }
  if (remaining) result = remaining + ',' + result;
  return result;
};

const GSTRatePreset = ({ rate, label, amount, onChange }) => (
  <button
    onClick={() => onChange(amount, rate)}
    className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-blue-50 hover:border-blue-500 transition-colors"
  >
    {label} @ {rate}%
  </button>
);

export default function IndiaGSTCalculator() {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [gstType, setGstType] = useState('cgst-sgst');

  const calculations = useMemo(() => {
    const validAmount = Math.max(0, amount);
    const validRate = Math.max(0, Math.min(100, gstRate));

    const gstAmount = (validAmount * validRate) / 100;
    const totalAmount = validAmount + gstAmount;

    let cgst = 0;
    let sgst = 0;

    if (gstType === 'cgst-sgst') {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    }

    return {
      baseAmount: validAmount,
      gstAmount,
      cgst,
      sgst,
      totalAmount,
      effectiveRate: ((gstAmount / validAmount) * 100).toFixed(2),
    };
  }, [amount, gstRate, gstType]);

  const handlePreset = (presetAmount, presetRate) => {
    setAmount(presetAmount);
    setGstRate(presetRate);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">GST Calculator</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Before GST in ₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
            <input
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(Number(e.target.value))}
              min="0"
              max="100"
              step="0.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GST Type</label>
            <select
              value={gstType}
              onChange={(e) => setGstType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="cgst-sgst">CGST + SGST (Intra-state)</option>
              <option value="igst">IGST (Inter-state)</option>
            </select>
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Common Rate Presets</p>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <GSTRatePreset rate={5} label="Food Items" amount={10000} onChange={handlePreset} />
                <GSTRatePreset rate={12} label="Services" amount={10000} onChange={handlePreset} />
              </div>
              <div className="flex flex-wrap gap-2">
                <GSTRatePreset rate={18} label="Goods" amount={10000} onChange={handlePreset} />
                <GSTRatePreset rate={28} label="Luxury" amount={10000} onChange={handlePreset} />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">GST Breakdown</h2>

          {/* Base Amount */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Amount (Before GST)</p>
            <p className="font-mono font-bold text-2xl text-gray-900">₹{formatINR(calculations.baseAmount)}</p>
          </div>

          {/* GST Amount */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">GST @ {gstRate}%</p>
            <p className="font-mono font-bold text-2xl text-blue-900">₹{formatINR(calculations.gstAmount)}</p>
          </div>

          {/* Split if CGST+SGST */}
          {gstType === 'cgst-sgst' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-xs text-gray-600 mb-1">CGST ({gstRate / 2}%)</p>
                <p className="font-mono font-bold text-lg text-indigo-900">₹{formatINR(calculations.cgst)}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">SGST ({gstRate / 2}%)</p>
                <p className="font-mono font-bold text-lg text-purple-900">₹{formatINR(calculations.sgst)}</p>
              </div>
            </div>
          )}

          {/* Total Amount */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Total Amount (Including GST)</p>
            <p className="font-mono font-bold text-3xl text-green-900">₹{formatINR(calculations.totalAmount)}</p>
          </div>

          {/* Effective Rate */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Effective GST Rate</p>
            <p className="font-mono font-bold text-xl text-gray-900">{calculations.effectiveRate}%</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-2">Understanding GST Types</p>
        <div className="space-y-2">
          <div>
            <p className="font-semibold text-gray-900">CGST + SGST (Intra-State Sale)</p>
            <p className="text-gray-700">Central GST and State GST are charged separately (each half of the total rate) when goods are sold within the same state.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">IGST (Inter-State Sale)</p>
            <p className="text-gray-700">Integrated GST is charged when goods move between states or for interstate services.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-2">Common GST Rates in India</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>0%:</strong> Food items (unprocessed), dairy, eggs</li>
          <li><strong>5%:</strong> Essential items, food grains, spices</li>
          <li><strong>12%:</strong> Processed foods, hair oil, footwear</li>
          <li><strong>18%:</strong> Most goods and services, electronics</li>
          <li><strong>28%:</strong> Luxury goods, sin goods (alcohol, tobacco)</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-amber-900 mb-2">Disclaimer</p>
        <p>This calculator is for informational purposes only. Actual GST rates and applicability may vary based on specific product categories and special circumstances. Consult with a tax professional or GST department for accurate information on your specific transaction.</p>
      </div>
    </div>
  );
}
