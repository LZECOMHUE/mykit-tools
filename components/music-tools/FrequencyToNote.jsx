'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function frequencyToMidi(frequency) {
  return 12 * Math.log2(frequency / 440) + 69;
}

function midiToFrequency(midiNote) {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

function midiToNote(midiNote) {
  const noteIndex = Math.round(midiNote) % 12;
  const octave = Math.floor(Math.round(midiNote) / 12) - 1;
  return { note: NOTES[noteIndex], octave };
}

function noteToCents(frequency) {
  const midi = frequencyToMidi(frequency);
  const nearestMidi = Math.round(midi);
  const cents = (midi - nearestMidi) * 100;
  return cents;
}

function buildReferenceTable() {
  const table = [];
  for (let octave = 2; octave <= 6; octave++) {
    for (let noteIdx = 0; noteIdx < NOTES.length; noteIdx++) {
      const midiNote = octave * 12 + noteIdx + 12;
      const freq = midiToFrequency(midiNote);
      table.push({
        note: NOTES[noteIdx],
        octave,
        midiNote,
        frequency: freq,
      });
    }
  }
  return table;
}

export default function FrequencyToNote() {
  const [frequency, setFrequency] = useState('440');
  const [mode, setMode] = useState('frequency');
  const [selectedNote, setSelectedNote] = useState('A');
  const [selectedOctave, setSelectedOctave] = useState('4');

  const referenceTable = useMemo(() => buildReferenceTable(), []);

  let analysis = null;
  let resultFrequency = null;

  if (mode === 'frequency' && frequency) {
    const freq = parseFloat(frequency);
    if (!isNaN(freq) && freq > 0) {
      const midi = frequencyToMidi(freq);
      const { note, octave } = midiToNote(midi);
      const nearestFreq = midiToFrequency(Math.round(midi));
      const cents = noteToCents(freq);

      analysis = {
        frequency: freq,
        note,
        octave,
        nearestFrequency: nearestFreq,
        cents,
        isSharp: cents > 0,
      };
      resultFrequency = freq;
    }
  } else if (mode === 'note' && selectedNote && selectedOctave) {
    const octave = parseInt(selectedOctave);
    const noteIdx = NOTES.indexOf(selectedNote);
    const midiNote = octave * 12 + noteIdx + 12;
    const freq = midiToFrequency(midiNote);
    analysis = {
      note: selectedNote,
      octave,
      frequency: freq,
      nearestFrequency: freq,
      cents: 0,
      isSharp: false,
    };
    resultFrequency = freq;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Convert Between:
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('frequency')}
            className={`flex-1 px-4 py-2 rounded font-medium transition-all ${
              mode === 'frequency'
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-primary'
            }`}
          >
            Frequency to Note
          </button>
          <button
            onClick={() => setMode('note')}
            className={`flex-1 px-4 py-2 rounded font-medium transition-all ${
              mode === 'note'
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-primary'
            }`}
          >
            Note to Frequency
          </button>
        </div>
      </div>

      {mode === 'frequency' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Frequency (Hz)
          </label>
          <Input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="e.g., 440"
            className="font-mono"
            min="0"
          />
          <p className="text-xs text-text-secondary mt-1">
            Enter a frequency in Hertz
          </p>
        </div>
      )}

      {mode === 'note' && (
        <div className="space-y-3">
          <div>
            <Select
              label="Note"
              options={NOTES.map((note) => ({ value: note, label: note }))}
              value={selectedNote}
              onChange={(value) => setSelectedNote(value)}
            />
          </div>

          <div>
            <Select
              label="Octave"
              options={[2, 3, 4, 5, 6].map((octave) => ({ value: String(octave), label: String(octave) }))}
              value={selectedOctave}
              onChange={(value) => setSelectedOctave(value)}
            />
          </div>
        </div>
      )}

      {analysis && (
        <>
          <Card className="bg-accent/5 border border-accent/10">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary mb-1">Note</p>
                <p className="font-mono text-3xl font-bold text-text-primary">
                  {analysis.note}{analysis.octave}
                </p>
              </div>

              <div>
                <p className="text-sm text-text-secondary mb-1">Frequency</p>
                <p className="font-mono text-2xl font-bold text-text-primary">
                  {analysis.frequency.toFixed(2)} Hz
                </p>
                {mode === 'frequency' && (
                  <p className="text-xs text-text-secondary mt-1">
                    Exact note frequency: {analysis.nearestFrequency.toFixed(2)} Hz
                  </p>
                )}
              </div>

              {mode === 'frequency' && (
                <div>
                  <p className="text-sm text-text-secondary mb-2">Tuning Offset</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text-primary">
                        {analysis.cents.toFixed(1)} cents {analysis.isSharp ? 'sharp' : 'flat'}
                      </span>
                    </div>

                    <div className="bg-surface border border-border rounded h-6 flex items-center overflow-hidden">
                      <div className="flex-1 h-full flex items-center relative">
                        <div className="absolute left-0 right-0 flex justify-between px-1 h-full items-center text-xs text-text-muted">
                          <span>-50</span>
                          <span>0</span>
                          <span>+50</span>
                        </div>
                        <div
                          className="absolute h-1 bg-accent"
                          style={{
                            left: '50%',
                            width: '2px',
                            height: '80%',
                            marginLeft: '-1px',
                          }}
                        />
                        <div
                          className="absolute w-2 h-4 bg-accent rounded transition-all"
                          style={{
                            left: `${Math.max(5, Math.min(95, 50 + (analysis.cents / 100) * 45))}%`,
                            marginLeft: '-4px',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </>
      )}

      <div>
        <h3 className="font-heading font-semibold text-text-primary mb-3">
          Reference Table (C2 - C6)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-2 py-1 font-medium text-text-primary">Note</th>
                <th className="text-left px-2 py-1 font-medium text-text-primary">Octave</th>
                <th className="text-right px-2 py-1 font-medium text-text-primary">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {referenceTable.map((entry, i) => (
                <tr
                  key={i}
                  className={`border-b border-border hover:bg-surface-hover ${
                    mode === 'note' &&
                    entry.note === selectedNote &&
                    entry.octave === parseInt(selectedOctave)
                      ? 'bg-accent/5'
                      : ''
                  }`}
                >
                  <td className="px-2 py-1 font-mono text-text-primary">
                    {entry.note}
                  </td>
                  <td className="px-2 py-1 text-text-primary">{entry.octave}</td>
                  <td className="px-2 py-1 text-right font-mono text-text-primary">
                    {entry.frequency.toFixed(2)} Hz
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
