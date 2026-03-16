'use client';

import { useState, useRef } from 'react';

export default function PubQuizAnswerSheetPrinter() {
  const [teamName, setTeamName] = useState('');
  const [numRounds, setNumRounds] = useState('5');
  const [questionsPerRound, setQuestionsPerRound] = useState('10');
  const printRef = useRef(null);

  const downloadAsJPG = () => {
    const rounds = parseInt(numRounds) || 0;
    const questions = parseInt(questionsPerRound) || 0;
    if (rounds === 0 || questions === 0) return;

    const canvas = document.createElement('canvas');
    const scale = 2;
    const width = 800;
    const height = 120 + (rounds * (questions * 25 + 80)) + 80;

    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    let y = 50;

    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Pub Quiz Answer Sheet', 40, y);

    y += 45;

    if (teamName) {
      ctx.fillStyle = '#525252';
      ctx.font = '16px sans-serif';
      ctx.fillText('Team: ' + teamName, 40, y);
      y += 35;
    }

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#1a1a1a';

    for (let r = 0; r < rounds; r++) {
      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Round ' + (r + 1), 50, y);

      y += 25;

      ctx.fillStyle = '#1a1a1a';
      ctx.font = '12px sans-serif';

      for (let q = 0; q < questions; q++) {
        ctx.fillText((q + 1) + '. _________________________________', 50, y);
        y += 25;
      }

      ctx.fillStyle = '#525252';
      ctx.font = '11px sans-serif';
      ctx.fillText('Score: _____ / ' + questions, width - 150, y - (questions * 25) + 10);

      y += 40;
    }

    y += 20;
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Total Score: _____ / ' + (rounds * questions), 50, y);

    y += 40;
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('mykit.tools', width / 2, height - 20);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.download = 'pub-quiz-answer-sheet.jpg';
    link.click();
  };

  const rounds = parseInt(numRounds) || 0;
  const questions = parseInt(questionsPerRound) || 0;

  return (
    <div className="w-full space-y-6">
      {/* Configuration */}
      <div className="space-y-4">
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your team name"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-text-secondary text-sm font-medium">
              Number of Rounds
            </label>
            <input
              type="number"
              value={numRounds}
              onChange={(e) => setNumRounds(e.target.value)}
              min="1"
              max="20"
              className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-text-secondary text-sm font-medium">
              Questions per Round
            </label>
            <input
              type="number"
              value={questionsPerRound}
              onChange={(e) => setQuestionsPerRound(e.target.value)}
              min="1"
              max="20"
              className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <button
          onClick={downloadAsJPG}
          className="w-full rounded-[var(--radius-card)] bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          Download JPG
        </button>
      </div>

      {/* Preview */}
      <div className="print:hidden rounded-[var(--radius-card)] bg-surface border border-border p-3">
        <p className="text-text-secondary text-[11px]">
          Preview below. Click "Print Answer Sheet" to generate a printable version.
        </p>
      </div>

      {/* Printable Content */}
      <div className="bg-white p-8 print:p-0 print:bg-transparent">
        {/* Header */}
        <div className="text-center mb-8 print:mb-6">
          <h1 className="text-3xl font-bold font-heading text-text-primary">
            Pub Quiz Answer Sheet
          </h1>
          {teamName && (
            <p className="text-lg text-text-secondary mt-2">
              Team: {teamName}
            </p>
          )}
        </div>

        {/* Quiz Grid */}
        <div className="space-y-6 print:space-y-4">
          {Array.from({ length: rounds }).map((_, roundIdx) => (
            <div key={roundIdx} className="break-inside-avoid print:page-break-inside-avoid">
              {/* Round Header */}
              <h2 className="text-xl font-bold font-heading text-text-primary mb-3 print:mb-2">
                Round {roundIdx + 1}
              </h2>

              {/* Questions Grid */}
              <div className="grid gap-3 print:gap-2">
                {Array.from({ length: questions }).map((_, qIdx) => (
                  <div key={qIdx} className="flex items-center gap-3 print:gap-2">
                    {/* Question Number */}
                    <div className="w-8 h-8 rounded-[var(--radius-input)] bg-accent text-white flex items-center justify-center font-mono font-bold text-sm print:w-6 print:h-6 print:text-[11px] flex-shrink-0">
                      {qIdx + 1}
                    </div>

                    {/* Answer Blank */}
                    <div className="flex-1 border-b border-text-muted"></div>
                  </div>
                ))}
              </div>

              {/* Round Score */}
              <div className="mt-4 print:mt-3 flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary font-medium">Score:</span>
                  <div className="w-12 border-b-2 border-text-primary"></div>
                  <span className="text-text-secondary">/{questions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Score */}
        <div className="mt-8 print:mt-6 pt-6 print:pt-4 border-t-2 border-text-primary">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold font-heading text-text-primary">
              Total Score
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-16 border-b-2 border-text-primary"></div>
              <span className="text-text-primary font-mono font-bold">
                /{rounds * questions}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 print:mt-6 text-center text-text-muted text-[11px]">
          <p>Generated by MyKit.tools - Good luck!</p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
