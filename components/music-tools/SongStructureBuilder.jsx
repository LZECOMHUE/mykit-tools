'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';

const SECTION_TYPES = [
  'Intro', 'Verse', 'Pre-Chorus', 'Chorus', 'Bridge', 'Solo', 'Interlude', 'Breakdown', 'Outro',
];

const SECTION_COLORS = {
  'Intro': 'bg-red-100 border-red-300',
  'Verse': 'bg-blue-100 border-blue-300',
  'Pre-Chorus': 'bg-yellow-100 border-yellow-300',
  'Chorus': 'bg-green-100 border-green-300',
  'Bridge': 'bg-purple-100 border-purple-300',
  'Solo': 'bg-orange-100 border-orange-300',
  'Interlude': 'bg-cyan-100 border-cyan-300',
  'Breakdown': 'bg-pink-100 border-pink-300',
  'Outro': 'bg-gray-100 border-gray-300',
};

const PRESETS = {
  pop: [
    { type: 'Intro', bars: 4 },
    { type: 'Verse', bars: 8 },
    { type: 'Chorus', bars: 8 },
    { type: 'Verse', bars: 8 },
    { type: 'Chorus', bars: 8 },
    { type: 'Bridge', bars: 8 },
    { type: 'Chorus', bars: 8 },
    { type: 'Outro', bars: 4 },
  ],
  blues12: [
    { type: 'Intro', bars: 12 },
    { type: 'Verse', bars: 12 },
    { type: 'Verse', bars: 12 },
    { type: 'Solo', bars: 12 },
    { type: 'Outro', bars: 12 },
  ],
  simple: [
    { type: 'Verse', bars: 8 },
    { type: 'Chorus', bars: 8 },
    { type: 'Verse', bars: 8 },
    { type: 'Chorus', bars: 8 },
  ],
};

export default function SongStructureBuilder() {
  const [sections, setSections] = useState([]);
  const [bpm, setBpm] = useState(120);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const addSection = (type) => {
    const newSection = {
      id: Date.now(),
      type,
      bars: 8,
      notes: '',
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const updateSection = (id, updates) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const moveSection = (id, direction) => {
    const index = sections.findIndex((s) => s.id === id);
    if (direction === 'up' && index > 0) {
      const newSections = [...sections];
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
      setSections(newSections);
    } else if (direction === 'down' && index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setSections(newSections);
    }
  };

  const applyPreset = (presetKey) => {
    setSections(
      PRESETS[presetKey].map((preset, i) => ({
        id: Date.now() + i,
        ...preset,
        notes: '',
      }))
    );
  };

  const totalBars = sections.reduce((sum, s) => sum + s.bars, 0);
  const estimatedSeconds = (totalBars / 4) * (60 / bpm) * 4;
  const minutes = Math.floor(estimatedSeconds / 60);
  const seconds = Math.round(estimatedSeconds % 60);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            BPM (Beats Per Minute)
          </label>
          <Input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Math.max(1, parseInt(e.target.value) || 120))}
            className="font-mono"
            min="1"
          />
        </div>
        <div className="sm:col-span-2">
          <p className="text-sm font-medium text-text-primary mb-2">Preset Structures</p>
          <div className="flex gap-2">
            <button
              onClick={() => applyPreset('pop')}
              className="px-3 py-2 bg-surface border border-border rounded hover:bg-surface-hover text-sm font-medium text-text-primary transition-all"
            >
              Pop
            </button>
            <button
              onClick={() => applyPreset('blues12')}
              className="px-3 py-2 bg-surface border border-border rounded hover:bg-surface-hover text-sm font-medium text-text-primary transition-all"
            >
              Blues 12-Bar
            </button>
            <button
              onClick={() => applyPreset('simple')}
              className="px-3 py-2 bg-surface border border-border rounded hover:bg-surface-hover text-sm font-medium text-text-primary transition-all"
            >
              Simple
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold text-text-primary mb-3">
          Add Sections
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {SECTION_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => addSection(type)}
              className="px-3 py-2 bg-surface border border-border rounded hover:bg-surface-hover text-sm font-medium text-text-primary transition-all"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {sections.length > 0 && (
        <>
          <Card className="bg-accent/5 border border-accent/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-text-secondary">Total Duration</p>
                <p className="font-mono text-2xl font-bold text-text-primary">
                  {totalBars} bars {minutes}:{seconds.toString().padStart(2, '0')}
                </p>
              </div>
              <button
                onClick={() => setSections([])}
                className="px-3 py-2 bg-white border border-border text-text-primary rounded hover:bg-surface-hover text-sm font-medium transition-all"
              >
                Clear All
              </button>
            </div>
          </Card>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-3">
              Timeline
            </h3>
            <div className="flex h-12 gap-1 bg-surface rounded-lg p-2 overflow-x-auto">
              {sections.map((section) => {
                const percentage = (section.bars / totalBars) * 100;
                return (
                  <div
                    key={section.id}
                    style={{ flex: `0 0 ${percentage}%` }}
                    className={`rounded flex items-center justify-center text-xs font-bold text-center px-1 ${SECTION_COLORS[section.type]}`}
                    title={`${section.type} - ${section.bars} bars`}
                  >
                    {percentage > 10 && <span className="truncate">{section.type}</span>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-text-primary">
              Structure Details
            </h3>
            {sections.map((section, index) => (
              <Card key={section.id} className={`border-2 ${SECTION_COLORS[section.type]}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-text-primary">
                        {index + 1}. {section.type}
                      </h4>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveSection(section.id, 'up')}
                        disabled={index === 0}
                        className="px-2 py-1 bg-white border border-border rounded text-sm font-medium text-text-primary hover:bg-surface disabled:opacity-50 transition-all"
                      >
                        Up
                      </button>
                      <button
                        onClick={() => moveSection(section.id, 'down')}
                        disabled={index === sections.length - 1}
                        className="px-2 py-1 bg-white border border-border rounded text-sm font-medium text-text-primary hover:bg-surface disabled:opacity-50 transition-all"
                      >
                        Down
                      </button>
                      <button
                        onClick={() => removeSection(section.id)}
                        className="px-2 py-1 bg-red-100 border border-red-300 rounded text-sm font-medium text-red-700 hover:bg-red-200 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-1">
                        Bars
                      </label>
                      <div className="flex gap-1">
                        {[4, 8, 16].map((bars) => (
                          <button
                            key={bars}
                            onClick={() => updateSection(section.id, { bars })}
                            className={`flex-1 px-2 py-1 rounded text-sm font-mono font-bold transition-all ${
                              section.bars === bars
                                ? 'bg-accent text-white'
                                : 'bg-white border border-border text-text-primary hover:bg-surface'
                            }`}
                          >
                            {bars}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-1">
                        Duration: {Math.round((section.bars / 4) * (60 / bpm) * 4)}s
                      </label>
                      <Input
                        type="text"
                        placeholder="Notes (optional)"
                        value={section.notes}
                        onChange={(e) => updateSection(section.id, { notes: e.target.value })}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {sections.length === 0 && (
        <p className="text-sm text-text-secondary italic">
          Click section buttons to build your song structure.
        </p>
      )}
    </div>
  );
}
