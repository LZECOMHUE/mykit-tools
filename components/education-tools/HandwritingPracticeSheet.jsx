'use client';

import { useState, useRef, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { generateHandwritingPDF } from '@/lib/worksheet-pdf';

export default function HandwritingPracticeSheet() {
  const [practiceText, setPracticeText] = useState('');
  const [styleOption, setStyleOption] = useState('print');
  const [lineStyle, setLineStyle] = useState('solid');
  const [lineSpacing, setLineSpacing] = useState('medium');
  const [fontSize, setFontSize] = useState('medium');
  const [repetitions, setRepetitions] = useState(1);
  const [letterCase, setLetterCase] = useState('lowercase');
  const [studentName, setStudentName] = useState('');
  const previewRef = useRef(null);

  const fontSizeMap = { small: '32px', medium: '48px', large: '64px' };
  const spacingMap = { small: 80, medium: 120, large: 160 };

  const processText = () => {
    if (!practiceText.trim()) return '';
    let text = practiceText.trim();
    if (letterCase === 'uppercase') text = text.toUpperCase();
    if (letterCase === 'lowercase') text = text.toLowerCase();
    return text;
  };

  const downloadWorksheet = () => {
    generateHandwritingPDF({
      text: processText(),
      studentName,
      styleOption,
      lineStyle,
      lineSpacing,
      fontSize,
      repetitions,
    });
  };

  const renderGuidelines = (y, lineHeight) => {
    const canvasHeight = 3200;
    const lines = [];

    if (lineStyle === 'solid') {
      for (let i = 0; i < canvasHeight; i += lineHeight) {
        lines.push(i);
      }
    } else if (lineStyle === 'dashed') {
      for (let i = 0; i < canvasHeight; i += lineHeight) {
        lines.push(i);
      }
    }

    return lines;
  };

  const text = processText();
  const fsSize = parseInt(fontSizeMap[fontSize]);
  const spacing = spacingMap[lineSpacing];

  return (
    <div className="w-full space-y-4">
      <div className="bg-surface border border-border rounded-xl p-4">
        {/* Practice Text */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Text to Practice
          </label>
          <textarea
            value={practiceText}
            onChange={(e) => setPracticeText(e.target.value)}
            placeholder="Enter letters, words, or sentences..."
            className="w-full p-3 border border-border rounded-lg font-sans text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            rows={4}
          />
        </div>

        {/* Student Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Student Name (optional)
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name..."
            className="w-full p-3 border border-border rounded-lg font-sans text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        {/* Style Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Font Style</label>
            <div className="space-y-2">
              {['print', 'cursive'].map(style => (
                <button
                  key={style}
                  onClick={() => setStyleOption(style)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    styleOption === style
                      ? 'bg-accent text-white'
                      : 'bg-surface text-text-primary border border-border'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Lines</label>
            <div className="space-y-2">
              {['solid', 'dashed'].map(style => (
                <button
                  key={style}
                  onClick={() => setLineStyle(style)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    lineStyle === style
                      ? 'bg-accent text-white'
                      : 'bg-surface text-text-primary border border-border'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Spacing</label>
            <div className="space-y-2">
              {['small', 'medium', 'large'].map(space => (
                <button
                  key={space}
                  onClick={() => setLineSpacing(space)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    lineSpacing === space
                      ? 'bg-accent text-white'
                      : 'bg-surface text-text-primary border border-border'
                  }`}
                >
                  {space}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Font Size</label>
            <div className="space-y-2">
              {['small', 'medium', 'large'].map(size => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    fontSize === size
                      ? 'bg-accent text-white'
                      : 'bg-surface text-text-primary border border-border'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* More Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Letter Case</label>
            <div className="space-y-2">
              {['lowercase', 'uppercase', 'mixed'].map(lc => (
                <button
                  key={lc}
                  onClick={() => setLetterCase(lc)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    letterCase === lc
                      ? 'bg-accent text-white'
                      : 'bg-surface text-text-primary border border-border'
                  }`}
                >
                  {lc}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Repetitions
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3, 4, 5].map(rep => (
                <button
                  key={rep}
                  onClick={() => setRepetitions(rep)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    repetitions === rep ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
                  }`}
                >{rep}x</button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Preview - live, shows whenever text is entered */}
      {text && (
        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Preview</h3>
          <div
            ref={previewRef}
            className="bg-white rounded-lg overflow-auto max-h-96 border border-border p-4"
          >
            <div className="max-w-2xl">
              {studentName && (
                <p className="text-sm text-text-secondary mb-4">Name: {studentName}</p>
              )}
              {[...Array(repetitions)].map((_, repIdx) => (
                <div key={repIdx} className="mb-4">
                  <p
                    style={{
                      fontFamily: styleOption === 'cursive' ? 'cursive' : 'monospace',
                      fontSize: fontSizeMap[fontSize],
                      color: '#c0c0c0',
                      lineHeight: `${spacing}px`,
                      letterSpacing: '2px',
                    }}
                  >
                    {text}
                  </p>
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={`blank-${i}`}
                      style={{
                        height: `${spacing}px`,
                        borderBottom: lineStyle === 'solid' ? '2px solid #e5e5e5' : '2px dashed #e5e5e5',
                        marginBottom: '4px',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>


          <Button onClick={downloadWorksheet} className="w-full bg-accent text-white font-medium mt-4">
            Download PDF
          </Button>
        </div>
      )}
    </div>
  );
}
