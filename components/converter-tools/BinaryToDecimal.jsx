'use client';
import { useState, useMemo } from 'react';

export default function BinaryToDecimal() {
  const [binary, setBinary] = useState('11111111');
  const [octal, setOctal] = useState('377');
  const [decimal, setDecimal] = useState('255');
  const [hexadecimal, setHexadecimal] = useState('FF');

  const validation = useMemo(() => {
    return {
      binary: /^[01]*$/.test(binary) && binary.length > 0,
      octal: /^[0-7]*$/.test(octal) && octal.length > 0,
      decimal: /^\d+$/.test(decimal) && decimal.length > 0,
      hexadecimal: /^[0-9A-Fa-f]*$/.test(hexadecimal) && hexadecimal.length > 0,
    };
  }, [binary, octal, decimal, hexadecimal]);

  const conversions = useMemo(() => {
    let decimalValue = 0;

    if (validation.binary && binary) {
      decimalValue = parseInt(binary, 2);
    } else if (validation.octal && octal) {
      decimalValue = parseInt(octal, 8);
    } else if (validation.decimal && decimal) {
      decimalValue = parseInt(decimal, 10);
    } else if (validation.hexadecimal && hexadecimal) {
      decimalValue = parseInt(hexadecimal, 16);
    } else {
      return {
        binary: '',
        octal: '',
        decimal: '',
        hexadecimal: '',
        isValid: false,
      };
    }

    return {
      binary: decimalValue.toString(2),
      octal: decimalValue.toString(8),
      decimal: decimalValue.toString(10),
      hexadecimal: decimalValue.toString(16).toUpperCase(),
      isValid: true,
    };
  }, [binary, octal, decimal, hexadecimal, validation]);

  const handleBinaryChange = (value) => {
    setBinary(value);
    if (/^[01]*$/.test(value) && value.length > 0) {
      const dec = parseInt(value, 2);
      setDecimal(dec.toString());
      setOctal(dec.toString(8));
      setHexadecimal(dec.toString(16).toUpperCase());
    }
  };

  const handleOctalChange = (value) => {
    setOctal(value);
    if (/^[0-7]*$/.test(value) && value.length > 0) {
      const dec = parseInt(value, 8);
      setBinary(dec.toString(2));
      setDecimal(dec.toString());
      setHexadecimal(dec.toString(16).toUpperCase());
    }
  };

  const handleDecimalChange = (value) => {
    setDecimal(value);
    if (/^\d+$/.test(value) && value.length > 0) {
      const dec = parseInt(value, 10);
      setBinary(dec.toString(2));
      setOctal(dec.toString(8));
      setHexadecimal(dec.toString(16).toUpperCase());
    }
  };

  const handleHexChange = (value) => {
    const upperValue = value.toUpperCase();
    setHexadecimal(upperValue);
    if (/^[0-9A-F]*$/.test(upperValue) && upperValue.length > 0) {
      const dec = parseInt(upperValue, 16);
      setBinary(dec.toString(2));
      setOctal(dec.toString(8));
      setDecimal(dec.toString());
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-surface rounded-lg border border-border">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Binary */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Binary (Base 2)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={binary}
                onChange={(e) => handleBinaryChange(e.target.value)}
                placeholder="11111111"
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-20 font-mono text-text-primary bg-white transition-colors ${
                  validation.binary && binary
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-border focus:border-accent focus:ring-accent'
                }`}
              />
              <button
                onClick={() => copyToClipboard(conversions.binary)}
                className="px-3 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-text-muted mt-1">Only 0-1 allowed</p>
          </div>

          {/* Octal */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Octal (Base 8)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={octal}
                onChange={(e) => handleOctalChange(e.target.value)}
                placeholder="377"
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-20 font-mono text-text-primary bg-white transition-colors ${
                  validation.octal && octal
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-border focus:border-accent focus:ring-accent'
                }`}
              />
              <button
                onClick={() => copyToClipboard(conversions.octal)}
                className="px-3 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-text-muted mt-1">Only 0-7 allowed</p>
          </div>

          {/* Decimal */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Decimal (Base 10)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={decimal}
                onChange={(e) => handleDecimalChange(e.target.value)}
                placeholder="255"
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-20 font-mono text-text-primary bg-white transition-colors ${
                  validation.decimal && decimal
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-border focus:border-accent focus:ring-accent'
                }`}
              />
              <button
                onClick={() => copyToClipboard(conversions.decimal)}
                className="px-3 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-text-muted mt-1">Standard decimal number</p>
          </div>

          {/* Hexadecimal */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hexadecimal (Base 16)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hexadecimal}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="FF"
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-opacity-20 font-mono text-text-primary bg-white transition-colors ${
                  validation.hexadecimal && hexadecimal
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-border focus:border-accent focus:ring-accent'
                }`}
              />
              <button
                onClick={() => copyToClipboard(conversions.hexadecimal)}
                className="px-3 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-text-muted mt-1">Only 0-9, A-F allowed</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            Change any field to convert between bases. Each conversion updates all other bases automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
