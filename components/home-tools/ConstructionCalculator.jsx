'use client';

import { useState, useCallback } from 'react';

const ConstructionCalculator = () => {
  // State management
  const [display, setDisplay] = useState('0');
  const [label, setLabel] = useState('');
  const [memory, setMemory] = useState(0);
  const [currentValue, setCurrentValue] = useState(0); // decimal feet internally
  const [pendingOp, setPendingOp] = useState(null);
  const [previousValue, setPreviousValue] = useState(0);
  const [inputBuffer, setInputBuffer] = useState(''); // raw input string
  const [inputMode, setInputMode] = useState('number'); // 'number', 'feet', 'inch', 'fraction'
  const [dimensions, setDimensions] = useState({ length: null, width: null, height: null });
  const [mode, setMode] = useState('basic'); // 'basic', 'area', 'volume', 'pitch', 'stair', 'circle'
  const [stairConfig, setStairConfig] = useState({ totalRise: null, riserHeight: null });
  const [pitchConfig, setPitchConfig] = useState({ pitch: null, rise: null, run: null });

  // Helper: Convert decimal feet to feet-inches-fraction display
  const formatFeetInches = useCallback((decimalFeet) => {
    if (decimalFeet === null || decimalFeet === undefined || isNaN(decimalFeet)) return '0';

    const isNegative = decimalFeet < 0;
    const abs = Math.abs(decimalFeet);

    const feet = Math.floor(abs);
    const inchDecimal = (abs - feet) * 12;
    const inches = Math.floor(inchDecimal);
    const fractionDecimal = inchDecimal - inches;

    // Round to nearest 1/16
    const fractionSixteenths = Math.round(fractionDecimal * 16);
    let displayFraction = '';

    if (fractionSixteenths > 0 && fractionSixteenths < 16) {
      // Simplify fractions
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const divisor = gcd(fractionSixteenths, 16);
      const num = fractionSixteenths / divisor;
      const denom = 16 / divisor;
      displayFraction = ` ${num}/${denom}`;
    } else if (fractionSixteenths === 16) {
      // Round up to next inch
      return isNegative ? `-${feet}-${inches + 1}` : `${feet}-${inches + 1}`;
    }

    const sign = isNegative ? '-' : '';
    return `${sign}${feet}-${inches}${displayFraction}`;
  }, []);

  // Helper: Parse feet-inches-fraction input string to decimal feet
  const parseFeetInches = useCallback((str) => {
    if (!str || str === '0') return 0;

    // Handle format: "10-6 1/2" or "10-6" or just "10"
    const parts = str.split('-');
    if (parts.length === 2) {
      const feet = parseFloat(parts[0]);
      const inchParts = parts[1].trim().split(/\s+/);
      const inches = parseFloat(inchParts[0]);
      let fraction = 0;

      if (inchParts.length > 1) {
        const frac = inchParts[1].split('/');
        fraction = parseFloat(frac[0]) / parseFloat(frac[1]);
      }

      return feet + (inches + fraction) / 12;
    }

    return parseFloat(str);
  }, []);

  // Number input handler
  const handleNumber = useCallback((num) => {
    const newBuffer = inputBuffer === '0' ? String(num) : inputBuffer + String(num);
    setInputBuffer(newBuffer);
    setDisplay(newBuffer);
  }, [inputBuffer]);

  // Decimal point
  const handleDecimal = useCallback(() => {
    if (!inputBuffer.includes('.')) {
      const newBuffer = (inputBuffer || '0') + '.';
      setInputBuffer(newBuffer);
      setDisplay(newBuffer);
    }
  }, [inputBuffer]);

  // Fraction entry (e.g., 3/16)
  const handleFraction = useCallback(() => {
    if (inputBuffer) {
      const newBuffer = inputBuffer + '/';
      setInputBuffer(newBuffer);
      setDisplay(newBuffer);
    }
  }, [inputBuffer]);

  // Feet button
  const handleFeet = useCallback(() => {
    if (inputBuffer) {
      const value = parseFloat(inputBuffer);
      setCurrentValue(value);
      setDisplay(formatFeetInches(value));
      setInputBuffer('');
      setInputMode('feet');
      setLabel('FEET');
    }
  }, [inputBuffer, formatFeetInches]);

  // Inch button
  const handleInch = useCallback(() => {
    if (inputBuffer) {
      const inchValue = parseFloat(inputBuffer);
      const newValue = currentValue + inchValue / 12;
      setCurrentValue(newValue);
      setDisplay(formatFeetInches(newValue));
      setInputBuffer('');
      setInputMode('inch');
      setLabel('INCH');
    }
  }, [inputBuffer, currentValue, formatFeetInches]);

  // Yards button
  const handleYards = useCallback(() => {
    if (inputBuffer) {
      const yardValue = parseFloat(inputBuffer);
      const feetValue = yardValue * 3;
      setCurrentValue(feetValue);
      setDisplay(formatFeetInches(feetValue));
      setInputBuffer('');
      setLabel('YDS');
    }
  }, [inputBuffer, formatFeetInches]);

  // Basic arithmetic operations
  const handleOperation = useCallback((op) => {
    const value = inputBuffer ? parseFeetInches(inputBuffer) : currentValue;

    if (pendingOp && inputBuffer) {
      // Execute pending operation
      let result = previousValue;
      switch (pendingOp) {
        case '+':
          result = previousValue + value;
          break;
        case '-':
          result = previousValue - value;
          break;
        case '×':
          result = previousValue * value;
          break;
        case '÷':
          result = previousValue / value;
          break;
        default:
          break;
      }
      setCurrentValue(result);
      setPreviousValue(result);
      setDisplay(formatFeetInches(result));
    } else {
      setPreviousValue(value);
      setCurrentValue(value);
    }

    setPendingOp(op);
    setInputBuffer('');
  }, [inputBuffer, currentValue, pendingOp, previousValue, parseFeetInches, formatFeetInches]);

  // Equals button
  const handleEquals = useCallback(() => {
    if (!pendingOp) return;

    const value = inputBuffer ? parseFeetInches(inputBuffer) : currentValue;
    let result = previousValue;

    switch (pendingOp) {
      case '+':
        result = previousValue + value;
        break;
      case '-':
        result = previousValue - value;
        break;
      case '×':
        result = previousValue * value;
        break;
      case '÷':
        result = previousValue / value;
        break;
      default:
        break;
    }

    setCurrentValue(result);
    setDisplay(formatFeetInches(result));
    setPendingOp(null);
    setInputBuffer('');
  }, [pendingOp, inputBuffer, previousValue, currentValue, parseFeetInches, formatFeetInches]);

  // Clear current entry
  const handleClear = useCallback(() => {
    setInputBuffer('');
    setDisplay('0');
    setLabel('');
  }, []);

  // Clear all
  const handleClearAll = useCallback(() => {
    setDisplay('0');
    setLabel('');
    setMemory(0);
    setCurrentValue(0);
    setPendingOp(null);
    setPreviousValue(0);
    setInputBuffer('');
    setInputMode('number');
    setDimensions({ length: null, width: null, height: null });
    setMode('basic');
    setStairConfig({ totalRise: null, riserHeight: null });
    setPitchConfig({ pitch: null, rise: null, run: null });
  }, []);

  // Backspace
  const handleBackspace = useCallback(() => {
    if (inputBuffer) {
      const newBuffer = inputBuffer.slice(0, -1);
      setInputBuffer(newBuffer || '');
      setDisplay(newBuffer || '0');
    }
  }, [inputBuffer]);

  // Memory operations
  const handleMemoryStore = useCallback(() => {
    const value = inputBuffer ? parseFeetInches(inputBuffer) : currentValue;
    setMemory(value);
    setInputBuffer('');
  }, [inputBuffer, currentValue, parseFeetInches]);

  const handleMemoryRecall = useCallback(() => {
    setCurrentValue(memory);
    setDisplay(formatFeetInches(memory));
    setInputBuffer('');
  }, [memory, formatFeetInches]);

  const handleMemoryAdd = useCallback(() => {
    const value = inputBuffer ? parseFeetInches(inputBuffer) : currentValue;
    setMemory(memory + value);
    setInputBuffer('');
  }, [inputBuffer, currentValue, memory, parseFeetInches]);

  // Length button
  const handleLength = useCallback(() => {
    if (inputBuffer) {
      const value = parseFeetInches(inputBuffer);
      setDimensions(d => ({ ...d, length: value }));
      setMode('area');
      setLabel('LENGTH');
      setDisplay(formatFeetInches(value));
      setInputBuffer('');
    }
  }, [inputBuffer, parseFeetInches, formatFeetInches]);

  // Width button
  const handleWidth = useCallback(() => {
    if (inputBuffer) {
      const value = parseFeetInches(inputBuffer);
      setDimensions(d => ({ ...d, width: value }));

      if (dimensions.length !== null) {
        const area = dimensions.length * value;
        setLabel('AREA');
        setDisplay(formatFeetInches(area));
        setCurrentValue(area);
      } else {
        setLabel('WIDTH');
        setDisplay(formatFeetInches(value));
      }
      setInputBuffer('');
    }
  }, [inputBuffer, dimensions, parseFeetInches, formatFeetInches]);

  // Height button
  const handleHeight = useCallback(() => {
    if (inputBuffer) {
      const value = parseFeetInches(inputBuffer);
      setDimensions(d => ({ ...d, height: value }));

      if (dimensions.length !== null && dimensions.width !== null) {
        const volume = dimensions.length * dimensions.width * value;
        setLabel('VOLUME');
        setDisplay(formatFeetInches(volume));
        setCurrentValue(volume);
        setMode('volume');
      } else {
        setLabel('HEIGHT');
        setDisplay(formatFeetInches(value));
      }
      setInputBuffer('');
    }
  }, [inputBuffer, dimensions, parseFeetInches, formatFeetInches]);

  // Pitch button
  const handlePitch = useCallback(() => {
    if (inputBuffer) {
      const value = parseFloat(inputBuffer);
      setPitchConfig(p => ({ ...p, pitch: value }));
      setMode('pitch');
      setLabel('PITCH');
      setDisplay(`${value}/12`);
      setInputBuffer('');
    }
  }, [inputBuffer]);

  // Rise button
  const handleRise = useCallback(() => {
    if (inputBuffer) {
      const value = parseFeetInches(inputBuffer);
      setPitchConfig(p => ({ ...p, rise: value }));

      if (mode === 'pitch') {
        setLabel('RISE');
        setDisplay(formatFeetInches(value));
      }
      setInputBuffer('');
    }
  }, [inputBuffer, mode, parseFeetInches, formatFeetInches]);

  // Run button
  const handleRun = useCallback(() => {
    if (inputBuffer) {
      const value = parseFeetInches(inputBuffer);
      setPitchConfig(p => ({ ...p, run: value }));

      if (mode === 'pitch') {
        setLabel('RUN');
        setDisplay(formatFeetInches(value));
      }
      setInputBuffer('');
    }
  }, [inputBuffer, mode, parseFeetInches, formatFeetInches]);

  // Stair button
  const handleStair = useCallback(() => {
    if (inputBuffer) {
      const value = parseFeetInches(inputBuffer);
      setStairConfig(s => ({ ...s, totalRise: value }));
      setMode('stair');
      setLabel('TOTAL RISE');
      setDisplay(formatFeetInches(value));
      setInputBuffer('');
    }
  }, [inputBuffer, parseFeetInches, formatFeetInches]);

  // Conversion button
  const handleConversion = useCallback(() => {
    const value = inputBuffer ? parseFeetInches(inputBuffer) : currentValue;
    // Simple example: feet to meters
    const converted = value * 0.3048; // feet to meters
    setCurrentValue(converted);
    setDisplay(converted.toFixed(3));
    setLabel('CONV');
    setInputBuffer('');
  }, [inputBuffer, currentValue, parseFeetInches]);

  // Button styling
  const buttonBase = 'rounded-full font-bold text-sm font-mono transition-all active:scale-95';
  const buttonNumberBlue = `${buttonBase} bg-blue-600 hover:bg-blue-700 text-white`;
  const buttonYellow = `${buttonBase} bg-yellow-500 hover:bg-yellow-600 text-black`;
  const buttonOrange = `${buttonBase} bg-orange-500 hover:bg-orange-600 text-white`;
  const buttonGrey = `${buttonBase} bg-gray-400 hover:bg-gray-500 text-black`;
  const buttonLightGrey = `${buttonBase} bg-gray-300 hover:bg-gray-400 text-black`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      {/* Calculator outer casing */}
      <div
        className="w-full max-w-sm rounded-3xl p-6 shadow-2xl"
        style={{
          backgroundColor: '#FF9500',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        }}
      >
        {/* Top branding area */}
        <div className="text-center mb-4">
          <h2 className="text-white font-bold text-xl tracking-wide">CONSTRUCTION</h2>
          <h3 className="text-orange-100 font-semibold text-sm">Master Pro Calculator</h3>
        </div>

        {/* LCD Screen */}
        <div
          className="w-full mb-6 p-4 rounded-lg font-mono text-right overflow-hidden"
          style={{
            backgroundColor: '#c5cba3',
            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 4px rgba(255, 255, 255, 0.2)',
            minHeight: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div className="text-xs text-gray-700 tracking-widest">{label || '−'}</div>
          <div className="text-4xl font-bold text-gray-900 break-words leading-tight">{display}</div>
        </div>

        {/* Button pad */}
        <div className="bg-gray-300 p-4 rounded-2xl space-y-2">
          {/* Row 1: Special functions */}
          <div className="grid grid-cols-5 gap-2">
            <button onClick={() => setMode('pitch')} className={buttonGrey} style={{ padding: '12px 0' }}>
              Pitch
            </button>
            <button onClick={() => setMode('stair')} className={buttonGrey} style={{ padding: '12px 0' }}>
              Rise
            </button>
            <button onClick={() => setMode('stair')} className={buttonGrey} style={{ padding: '12px 0' }}>
              Run
            </button>
            <button onClick={() => {}} className={buttonGrey} style={{ padding: '12px 0' }}>
              Diag
            </button>
            <button onClick={() => {}} className={buttonGrey} style={{ padding: '12px 0' }}>
              Hip/V
            </button>
          </div>

          {/* Row 2: More special */}
          <div className="grid grid-cols-5 gap-2">
            <button onClick={() => {}} className={buttonGrey} style={{ padding: '12px 0' }}>
              Comp
            </button>
            <button onClick={handleStair} className={buttonGrey} style={{ padding: '12px 0' }}>
              Stair
            </button>
            <button onClick={() => {}} className={buttonGrey} style={{ padding: '12px 0' }}>
              Arc
            </button>
            <button onClick={() => {}} className={buttonGrey} style={{ padding: '12px 0' }}>
              Circ
            </button>
            <button onClick={() => {}} className={buttonGrey} style={{ padding: '12px 0' }}>
              Jack
            </button>
          </div>

          {/* Row 3: Dimension functions */}
          <div className="grid grid-cols-5 gap-2">
            <button onClick={() => {}} className={buttonGrey} style={{ padding: '12px 0' }}>
              m
            </button>
            <button onClick={handleLength} className={buttonGrey} style={{ padding: '12px 0' }}>
              Len
            </button>
            <button onClick={handleWidth} className={buttonGrey} style={{ padding: '12px 0' }}>
              Wid
            </button>
            <button onClick={handleHeight} className={buttonGrey} style={{ padding: '12px 0' }}>
              Ht
            </button>
            <button onClick={() => handleOperation('%')} className={buttonGrey} style={{ padding: '12px 0' }}>
              %
            </button>
          </div>

          {/* Row 4: Unit buttons + operators */}
          <div className="grid grid-cols-5 gap-2">
            <button onClick={handleYards} className={buttonYellow} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              Yds
            </button>
            <button onClick={handleFeet} className={buttonYellow} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              Feet
            </button>
            <button onClick={handleInch} className={buttonYellow} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              Inch
            </button>
            <button onClick={() => handleOperation('÷')} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              ÷
            </button>
            <button onClick={handleBackspace} className={buttonOrange} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              ←
            </button>
          </div>

          {/* Row 5: Conversion + number row */}
          <div className="grid grid-cols-5 gap-2">
            <button onClick={handleConversion} className={buttonYellow} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              Conv
            </button>
            <button onClick={() => handleNumber(7)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              7
            </button>
            <button onClick={() => handleNumber(8)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              8
            </button>
            <button onClick={() => handleNumber(9)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              9
            </button>
            <button onClick={handleClearAll} className={buttonOrange} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              AC
            </button>
          </div>

          {/* Row 6: Memory + numbers + multiply */}
          <div className="grid grid-cols-5 gap-2">
            <button onClick={handleMemoryStore} className={buttonLightGrey} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              Sto
            </button>
            <button onClick={() => handleNumber(4)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              4
            </button>
            <button onClick={() => handleNumber(5)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              5
            </button>
            <button onClick={() => handleNumber(6)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              6
            </button>
            <button onClick={() => handleOperation('×')} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              ×
            </button>
          </div>

          {/* Row 7: Recall + numbers + subtract */}
          <div className="grid grid-cols-5 gap-2">
            <button onClick={handleMemoryRecall} className={buttonLightGrey} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              Rcl
            </button>
            <button onClick={() => handleNumber(1)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              1
            </button>
            <button onClick={() => handleNumber(2)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              2
            </button>
            <button onClick={() => handleNumber(3)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              3
            </button>
            <button onClick={() => handleOperation('-')} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              −
            </button>
          </div>

          {/* Row 8: M+ + 0 + decimal + equals + add */}
          <div className="grid grid-cols-5 gap-2">
            <button onClick={handleMemoryAdd} className={buttonLightGrey} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              M+
            </button>
            <button onClick={() => handleNumber(0)} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              0
            </button>
            <button onClick={handleDecimal} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              .
            </button>
            <button onClick={handleEquals} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              =
            </button>
            <button onClick={() => handleOperation('+')} className={buttonNumberBlue} style={{ padding: '14px 0', fontWeight: 'bold' }}>
              +
            </button>
          </div>
        </div>

        {/* Footer branding */}
        <div className="text-center mt-4 text-orange-50 text-xs tracking-wider">
          Model 4065 • 2026
        </div>
      </div>

      {/* How to Use Guide */}
      <div className="mt-6 bg-white border border-border rounded-[var(--radius-card)] p-4 sm:p-5">
        <h2 className="font-heading text-base font-bold text-text-primary mb-3">How to Use the Construction Calculator</h2>

        <div className="space-y-4 text-sm text-text-secondary">
          <div>
            <h3 className="font-semibold text-text-primary mb-1">Entering Feet, Inches & Fractions</h3>
            <p>Enter dimensions the way builders think: type the feet value, press <span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">Feet</span>, then inches, then <span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">Inch</span>. For fractions, enter the numerator, press <span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">/</span>, then the denominator. Example: for 8 ft 6 ½ in, type <span className="font-mono-num">8</span> → Feet → <span className="font-mono-num">6</span> → Inch → <span className="font-mono-num">1/2</span>.</p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">Basic Arithmetic</h3>
            <p>Works like any calculator: enter a value, press an operator (+, −, ×, ÷), enter the second value, and press <span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">=</span>. All arithmetic works in feet-inches, so adding 3 ft 6 in + 2 ft 9 in gives you 6 ft 3 in automatically.</p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">Area & Volume</h3>
            <p>Switch to <span className="font-semibold text-text-primary">Area</span> mode to calculate square footage. Enter Length, then press <span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">×</span> and enter Width — the result is in square feet. For <span className="font-semibold text-text-primary">Volume</span>, multiply all three dimensions (L × W × H) to get cubic feet or cubic yards.</p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">Roof Pitch & Rise/Run</h3>
            <p>In <span className="font-semibold text-text-primary">Pitch</span> mode, enter any two of pitch (as X/12), rise, or run, and the calculator solves for the third. Enter pitch as a number (e.g. 6 for a 6/12 pitch), rise or run in feet-inches. Press <span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">Solve</span> to calculate.</p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">Stair Calculator</h3>
            <p><span className="font-semibold text-text-primary">Stair</span> mode calculates the number of risers and optimal riser height. Enter the total rise (floor to floor) and your target riser height (typically 7–7¾ inches for building code compliance). The calculator gives you the number of risers and adjusted riser height.</p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">Circle & Circumference</h3>
            <p>In <span className="font-semibold text-text-primary">Circle</span> mode, enter a diameter or radius to instantly get circumference and area. Useful for calculating concrete for round columns, pipe sizing, or circular patio layouts.</p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">Unit Conversions</h3>
            <p>Press the <span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">Conv</span> button to convert the current display value between feet, inches, metres, centimetres, and yards. The conversion cycles through each unit with each press.</p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-1">Memory Functions</h3>
            <p><span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">M+</span> adds the current value to memory, <span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">MR</span> recalls the stored value, and <span className="font-mono-num bg-surface px-1.5 py-0.5 rounded text-xs">MC</span> clears it. A small "M" indicator appears on the display when memory is in use.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionCalculator;
