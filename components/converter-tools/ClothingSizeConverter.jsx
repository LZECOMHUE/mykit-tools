'use client';
import { useState, useMemo } from 'react';

const CLOTHING_SIZES = {
  men: {
    shirt: [
      { uk: 'S', us: 'S', eu: '46', chest: '94-98cm' },
      { uk: 'M', us: 'M', eu: '50', chest: '98-104cm' },
      { uk: 'L', us: 'L', eu: '54', chest: '104-110cm' },
      { uk: 'XL', us: 'XL', eu: '58', chest: '110-116cm' },
      { uk: 'XXL', us: '2XL', eu: '62', chest: '116-122cm' },
    ],
    trousers: [
      { uk: '28', us: '28', eu: '46', waist: '71cm' },
      { uk: '30', us: '30', eu: '48', waist: '76cm' },
      { uk: '32', us: '32', eu: '50', waist: '81cm' },
      { uk: '34', us: '34', eu: '52', waist: '86cm' },
      { uk: '36', us: '36', eu: '54', waist: '91cm' },
      { uk: '38', us: '38', eu: '56', waist: '96cm' },
    ],
    shoes: [
      { uk: '6', us: '7', eu: '39', cm: '24' },
      { uk: '7', us: '8', eu: '40', cm: '25' },
      { uk: '8', us: '9', eu: '41', cm: '26' },
      { uk: '9', us: '10', eu: '42', cm: '27' },
      { uk: '10', us: '11', eu: '43', cm: '28' },
      { uk: '11', us: '12', eu: '44', cm: '29' },
      { uk: '12', us: '13', eu: '45', cm: '30' },
    ],
  },
  women: {
    shirt: [
      { uk: '6', us: 'XS', eu: '34', bust: '78cm' },
      { uk: '8', us: 'S', eu: '36', bust: '82cm' },
      { uk: '10', us: 'M', eu: '38', bust: '86cm' },
      { uk: '12', us: 'L', eu: '40', bust: '90cm' },
      { uk: '14', us: 'XL', eu: '42', bust: '94cm' },
      { uk: '16', us: '2XL', eu: '44', bust: '98cm' },
    ],
    dress: [
      { uk: '6', us: '2', eu: '34', bust: '80cm' },
      { uk: '8', us: '4', eu: '36', bust: '84cm' },
      { uk: '10', us: '6', eu: '38', bust: '88cm' },
      { uk: '12', us: '8', eu: '40', bust: '92cm' },
      { uk: '14', us: '10', eu: '42', bust: '96cm' },
      { uk: '16', us: '12', eu: '44', bust: '100cm' },
    ],
    shoes: [
      { uk: '3', us: '5', eu: '36', cm: '22' },
      { uk: '4', us: '6', eu: '37', cm: '23' },
      { uk: '5', us: '7', eu: '38', cm: '24' },
      { uk: '6', us: '8', eu: '39', cm: '25' },
      { uk: '7', us: '9', eu: '40', cm: '26' },
      { uk: '8', us: '10', eu: '41', cm: '27' },
    ],
  },
};

export default function ClothingSizeConverter() {
  const [gender, setGender] = useState('men');
  const [garment, setGarment] = useState('shirt');
  const [inputSize, setInputSize] = useState('M');
  const [system, setSystem] = useState('uk');

  const garmentOptions = Object.keys(CLOTHING_SIZES[gender]);

  const equivalents = useMemo(() => {
    const sizes = CLOTHING_SIZES[gender][garment] || [];
    const key = system === 'uk' ? 'uk' : system === 'us' ? 'us' : 'eu';

    const matching = sizes.find((s) => s[key].toString() === inputSize.toString());
    return matching || null;
  }, [gender, garment, inputSize, system]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.toString());
  };

  const getMeasurementLabel = () => {
    if (garment === 'shirt') return gender === 'men' ? 'Chest' : 'Bust';
    if (garment === 'dress') return 'Bust';
    if (garment === 'trousers') return 'Waist';
    if (garment === 'shoes') return 'Length';
    return '';
  };

  const getMeasurementKey = () => {
    if (garment === 'shirt') return gender === 'men' ? 'chest' : 'bust';
    if (garment === 'dress') return 'bust';
    if (garment === 'trousers') return 'waist';
    if (garment === 'shoes') return 'cm';
    return '';
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-surface rounded-lg border border-border">
      <div className="space-y-6">
        {/* Gender & Garment Tabs */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase mb-2">Gender</p>
            <div className="flex gap-2">
              {Object.entries(CLOTHING_SIZES).map(([key, _]) => (
                <button
                  key={key}
                  onClick={() => {
                    setGender(key);
                    setGarment(Object.keys(CLOTHING_SIZES[key])[0]);
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                    gender === key
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-accent'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-text-secondary uppercase mb-2">Garment Type</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {garmentOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setGarment(option)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                    garment === option
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-accent'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* System Selection */}
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase mb-2">Enter Size From</p>
          <div className="flex gap-2">
            {['uk', 'us', 'eu'].map((sys) => (
              <button
                key={sys}
                onClick={() => setSystem(sys)}
                className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  system === sys
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:border-accent'
                }`}
              >
                {sys.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {system.toUpperCase()} Size
          </label>
          <input
            type="text"
            value={inputSize}
            onChange={(e) => setInputSize(e.target.value)}
            placeholder="Enter size"
            className="w-full px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
          />
        </div>

        {/* Results */}
        {equivalents && (
          <div className="p-4 bg-white border border-border rounded-lg space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-surface rounded border border-border">
                <p className="text-xs text-text-secondary mb-2">UK Size</p>
                <p className="font-mono text-2xl font-bold text-text-primary">{equivalents.uk}</p>
              </div>
              <div className="p-3 bg-surface rounded border border-border">
                <p className="text-xs text-text-secondary mb-2">US Size</p>
                <p className="font-mono text-2xl font-bold text-text-primary">{equivalents.us}</p>
              </div>
              <div className="p-3 bg-surface rounded border border-border">
                <p className="text-xs text-text-secondary mb-2">EU Size</p>
                <p className="font-mono text-2xl font-bold text-text-primary">{equivalents.eu}</p>
              </div>
            </div>

            {equivalents[getMeasurementKey()] && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs text-blue-900 font-medium">{getMeasurementLabel()}</p>
                <p className="font-mono text-lg font-bold text-blue-900">
                  {equivalents[getMeasurementKey()]}
                </p>
              </div>
            )}
          </div>
        )}

        {!equivalents && inputSize && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-900">Size not found. Check your input.</p>
          </div>
        )}

        {/* Size Guide Table */}
        <div className="p-4 bg-white border border-border rounded-lg overflow-x-auto">
          <p className="text-xs font-medium text-text-secondary uppercase mb-3">Size Guide</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-2 py-2 font-medium text-text-secondary">UK</th>
                <th className="text-left px-2 py-2 font-medium text-text-secondary">US</th>
                <th className="text-left px-2 py-2 font-medium text-text-secondary">EU</th>
              </tr>
            </thead>
            <tbody>
              {(CLOTHING_SIZES[gender][garment] || []).map((size, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-surface">
                  <td className="px-2 py-2 font-mono text-text-primary">{size.uk}</td>
                  <td className="px-2 py-2 font-mono text-text-primary">{size.us}</td>
                  <td className="px-2 py-2 font-mono text-text-primary">{size.eu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
