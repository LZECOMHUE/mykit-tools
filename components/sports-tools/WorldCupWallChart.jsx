"use client";

import { useState, useCallback, useMemo } from "react";
import { GROUPS, TOURNAMENT_INFO } from "@/data/world-cup-2026/groups";
import { downloadWorldCupPDF } from "@/lib/world-cup-pdf";

// ── Helpers ──────────────────────────────────────────────

function initialGroupState() {
  const state = {};
  for (const letter of Object.keys(GROUPS)) {
    state[letter] = {
      matches: [
        [0, 1, "", ""],
        [2, 3, "", ""],
        [0, 2, "", ""],
        [1, 3, "", ""],
        [0, 3, "", ""],
        [1, 2, "", ""],
      ],
    };
  }
  return state;
}

function calcStandings(groupLetter, groupState) {
  const teams = GROUPS[groupLetter];
  const stats = teams.map((t, i) => ({
    idx: i, name: t.name, code: t.code, flag: t.flag,
    played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0,
  }));
  for (const [t1, t2, s1, s2] of groupState.matches) {
    if (s1 === "" || s2 === "") continue;
    const g1 = parseInt(s1, 10);
    const g2 = parseInt(s2, 10);
    if (isNaN(g1) || isNaN(g2)) continue;
    stats[t1].played++; stats[t2].played++;
    stats[t1].gf += g1; stats[t1].ga += g2;
    stats[t2].gf += g2; stats[t2].ga += g1;
    if (g1 > g2) { stats[t1].won++; stats[t1].pts += 3; stats[t2].lost++; }
    else if (g1 < g2) { stats[t2].won++; stats[t2].pts += 3; stats[t1].lost++; }
    else { stats[t1].drawn++; stats[t2].drawn++; stats[t1].pts++; stats[t2].pts++; }
  }
  stats.forEach((s) => (s.gd = s.gf - s.ga));
  stats.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  return stats;
}

function initialKnockoutState() {
  const rounds = { r32: [], r16: [], qf: [], sf: [], third: [], final: [] };
  for (let i = 0; i < 16; i++) rounds.r32.push({ team1: "", team2: "", score1: "", score2: "" });
  for (let i = 0; i < 8; i++) rounds.r16.push({ team1: "", team2: "", score1: "", score2: "" });
  for (let i = 0; i < 4; i++) rounds.qf.push({ team1: "", team2: "", score1: "", score2: "" });
  for (let i = 0; i < 2; i++) rounds.sf.push({ team1: "", team2: "", score1: "", score2: "" });
  rounds.third.push({ team1: "", team2: "", score1: "", score2: "" });
  rounds.final.push({ team1: "", team2: "", score1: "", score2: "" });
  return rounds;
}

const GROUP_LETTERS = Object.keys(GROUPS);

// ── Group Card (compact poster style) ────────────────────

function GroupCard({ letter, groupState, onMatchChange, standings }) {
  const teams = GROUPS[letter];

  return (
    <div className="bg-[#0f1923] rounded-lg overflow-hidden border border-[#1e3a5f]/50">
      {/* Group header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] px-3 py-1.5 flex items-center justify-between">
        <span className="text-white font-bold text-xs tracking-widest uppercase">
          Group {letter}
        </span>
        <div className="flex gap-2 text-[10px] text-white/50 font-mono">
          <span>P</span><span>W</span><span>D</span><span>L</span><span className="text-amber-400">Pts</span>
        </div>
      </div>

      {/* Teams */}
      {standings.map((team, pos) => (
        <div
          key={team.code}
          className={`flex items-center px-3 py-1.5 border-b border-[#1e3a5f]/30 ${
            pos < 2 ? "bg-[#0a2e1a]" : pos === 2 ? "bg-[#2a2a0a]" : "bg-[#0f1923]"
          }`}
        >
          {/* Position + Flag + Name */}
          <span className="text-[10px] text-white/30 font-mono w-4">{pos + 1}</span>
          <span className="text-sm mr-1.5">{team.flag}</span>
          <span className="text-white text-xs font-medium flex-1 truncate">
            {team.code === "TBD" ? team.name : team.name}
          </span>
          {/* Mini stats */}
          <div className="flex gap-2 text-[10px] font-mono text-white/60">
            <span className="w-3 text-center">{team.played}</span>
            <span className="w-3 text-center">{team.won}</span>
            <span className="w-3 text-center">{team.drawn}</span>
            <span className="w-3 text-center">{team.lost}</span>
            <span className="w-4 text-center font-bold text-amber-400">{team.pts}</span>
          </div>
        </div>
      ))}

      {/* Match scores (compact) */}
      <div className="px-2 py-2 space-y-1">
        {groupState.matches.map(([t1, t2, s1, s2], mi) => (
          <div key={mi} className="flex items-center gap-1 text-[11px]">
            <span className="w-8 text-right text-white/70 font-medium truncate">
              {teams[t1].code}
            </span>
            <input
              type="number" min="0" max="99" value={s1}
              onChange={(e) => onMatchChange(letter, mi, "s1", e.target.value)}
              className="w-7 h-5 text-center font-mono text-[11px] bg-[#1a2a3a] border border-[#2a4a6f] rounded text-white focus:outline-none focus:border-amber-400"
              aria-label={`${teams[t1].code} score`}
            />
            <span className="text-white/30 text-[9px]">-</span>
            <input
              type="number" min="0" max="99" value={s2}
              onChange={(e) => onMatchChange(letter, mi, "s2", e.target.value)}
              className="w-7 h-5 text-center font-mono text-[11px] bg-[#1a2a3a] border border-[#2a4a6f] rounded text-white focus:outline-none focus:border-amber-400"
              aria-label={`${teams[t2].code} score`}
            />
            <span className="w-8 text-left text-white/70 font-medium truncate">
              {teams[t2].code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Knockout Match (bracket style) ───────────────────────

function BracketMatch({ match, index, roundKey, onKnockoutChange, highlight }) {
  const baseBg = highlight ? "bg-gradient-to-r from-amber-900/30 to-amber-800/20 border-amber-500/50" : "bg-[#1a2a3a] border-[#2a4a6f]/50";
  return (
    <div className={`rounded-md border overflow-hidden ${baseBg}`}>
      {/* Team 1 */}
      <div className="flex items-center px-2 py-1 border-b border-[#2a4a6f]/30">
        <span className="text-white text-[11px] font-medium flex-1 truncate min-w-0">
          {match.team1 || "\u2014"}
        </span>
        <input
          type="number" min="0" max="99" value={match.score1}
          onChange={(e) => onKnockoutChange(roundKey, index, "score1", e.target.value)}
          className="w-6 h-5 text-center font-mono text-[11px] bg-[#0f1923] border border-[#2a4a6f] rounded text-white focus:outline-none focus:border-amber-400 ml-1"
        />
      </div>
      {/* Team 2 */}
      <div className="flex items-center px-2 py-1">
        <span className="text-white text-[11px] font-medium flex-1 truncate min-w-0">
          {match.team2 || "\u2014"}
        </span>
        <input
          type="number" min="0" max="99" value={match.score2}
          onChange={(e) => onKnockoutChange(roundKey, index, "score2", e.target.value)}
          className="w-6 h-5 text-center font-mono text-[11px] bg-[#0f1923] border border-[#2a4a6f] rounded text-white focus:outline-none focus:border-amber-400 ml-1"
        />
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────

export default function WorldCupWallChart() {
  const [groupState, setGroupState] = useState(initialGroupState);
  const [knockout, setKnockout] = useState(initialKnockoutState);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleMatchChange = useCallback((group, matchIdx, field, value) => {
    setGroupState((prev) => {
      const next = { ...prev };
      const matches = next[group].matches.map((m) => [...m]);
      matches[matchIdx][field === "s1" ? 2 : 3] = value === "" ? "" : value;
      next[group] = { ...next[group], matches };
      return next;
    });
  }, []);

  const handleKnockoutChange = useCallback((roundKey, matchIdx, field, value) => {
    setKnockout((prev) => {
      const next = { ...prev };
      const roundMatches = next[roundKey].map((m) => ({ ...m }));
      roundMatches[matchIdx][field] = value === "" ? "" : value;
      next[roundKey] = roundMatches;
      return next;
    });
  }, []);

  const allStandings = useMemo(() => {
    const result = {};
    for (const letter of GROUP_LETTERS) {
      result[letter] = calcStandings(letter, groupState[letter]);
    }
    return result;
  }, [groupState]);

  const handleReset = () => {
    setGroupState(initialGroupState());
    setKnockout(initialKnockoutState());
  };

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      downloadWorldCupPDF({ groupState, knockout, standings: allStandings });
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="space-y-0 -mx-4 sm:-mx-6 lg:-mx-0">
      {/* ── POSTER HEADER ───────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628] text-white px-4 sm:px-8 py-8 text-center relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px)"
        }} />

        <div className="relative">
          <p className="text-amber-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">
            FIFA
          </p>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-2 tracking-tight">
            WORLD CUP 2026
          </h2>
          <div className="flex items-center justify-center gap-3 text-white/60 text-sm">
            <span>USA</span>
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            <span>Canada</span>
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            <span>Mexico</span>
          </div>
          <p className="text-white/40 text-xs mt-2 font-mono">
            June 11 - July 19, 2026 &nbsp;|&nbsp; 48 teams &nbsp;|&nbsp; 104 matches
          </p>
        </div>

        {/* Action buttons floating */}
        <div className="flex justify-center gap-3 mt-6 relative">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-medium text-white/70 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-colors"
          >
            Reset All
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            className="px-5 py-2 text-xs font-bold text-[#0a1628] bg-amber-400 hover:bg-amber-300 rounded-md transition-colors disabled:opacity-50"
          >
            {pdfLoading ? "Generating..." : "Download Wall Chart PDF"}
          </button>
        </div>
      </div>

      {/* ── GROUP STAGE ──────────────────────────────────── */}
      <div className="bg-[#0b1520] px-4 sm:px-6 py-6">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-white font-bold text-sm tracking-[0.2em] uppercase">Group Stage</h3>
          <div className="flex-1 h-px bg-[#1e3a5f]" />
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-[#0a2e1a] border border-green-700/50" />
              <span className="text-green-400/70">Qualifies</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-[#2a2a0a] border border-yellow-700/50" />
              <span className="text-yellow-400/70">Possible 3rd</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {GROUP_LETTERS.map((letter) => (
            <GroupCard
              key={letter}
              letter={letter}
              groupState={groupState[letter]}
              onMatchChange={handleMatchChange}
              standings={allStandings[letter]}
            />
          ))}
        </div>
      </div>

      {/* ── KNOCKOUT ROUNDS ──────────────────────────────── */}
      <div className="bg-[#0b1520] px-4 sm:px-6 py-6 border-t border-[#1e3a5f]">
        <div className="flex items-center gap-3 mb-5">
          <h3 className="text-white font-bold text-sm tracking-[0.2em] uppercase">Knockout Rounds</h3>
          <div className="flex-1 h-px bg-[#1e3a5f]" />
        </div>

        {/* Bracket tree layout - uses grid for proper vertical alignment */}
        <div className="overflow-x-auto pb-4">
          <div className="grid min-w-[1000px]" style={{ gridTemplateColumns: "1fr 8px 1fr 8px 1fr 8px 1fr 8px 1fr" }}>
            {/* Column headers */}
            {[
              { label: "Round of 32", gold: false },
              null,
              { label: "Round of 16", gold: false },
              null,
              { label: "Quarter-Finals", gold: false },
              null,
              { label: "Semi-Finals", gold: false },
              null,
              { label: "Final", gold: true },
            ].map((col, ci) =>
              col === null ? (
                <div key={`sep-${ci}`} />
              ) : (
                <div key={col.label} className="text-center mb-3">
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${col.gold ? "text-amber-400/70" : "text-white/40"}`}>
                    {col.label}
                  </span>
                </div>
              )
            )}

            {/* R32 - 16 matches */}
            <div className="space-y-1">
              {knockout.r32.map((m, i) => (
                <BracketMatch key={`r32-${i}`} match={m} index={i} roundKey="r32" onKnockoutChange={handleKnockoutChange} />
              ))}
            </div>
            <div className="flex items-center"><div className="w-px h-full bg-[#1e3a5f]/40 mx-auto" /></div>

            {/* R16 - 8 matches, vertically distributed */}
            <div className="flex flex-col justify-around">
              {knockout.r16.map((m, i) => (
                <BracketMatch key={`r16-${i}`} match={m} index={i} roundKey="r16" onKnockoutChange={handleKnockoutChange} />
              ))}
            </div>
            <div className="flex items-center"><div className="w-px h-full bg-[#1e3a5f]/40 mx-auto" /></div>

            {/* QF - 4 matches */}
            <div className="flex flex-col justify-around">
              {knockout.qf.map((m, i) => (
                <BracketMatch key={`qf-${i}`} match={m} index={i} roundKey="qf" onKnockoutChange={handleKnockoutChange} />
              ))}
            </div>
            <div className="flex items-center"><div className="w-px h-full bg-[#1e3a5f]/40 mx-auto" /></div>

            {/* SF - 2 matches */}
            <div className="flex flex-col justify-around">
              {knockout.sf.map((m, i) => (
                <BracketMatch key={`sf-${i}`} match={m} index={i} roundKey="sf" onKnockoutChange={handleKnockoutChange} />
              ))}
            </div>
            <div className="flex items-center"><div className="w-px h-full bg-[#1e3a5f]/40 mx-auto" /></div>

            {/* Final + 3rd place */}
            <div className="flex flex-col justify-center gap-6">
              <BracketMatch
                match={knockout.final[0]} index={0} roundKey="final"
                onKnockoutChange={handleKnockoutChange} highlight
              />
              <div>
                <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-center">
                  3rd Place
                </p>
                <BracketMatch
                  match={knockout.third[0]} index={0} roundKey="third"
                  onKnockoutChange={handleKnockoutChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER INFO ──────────────────────────────────── */}
      <div className="bg-[#060d15] px-4 sm:px-6 py-4 text-center">
        <p className="text-white/30 text-[10px] font-mono">
          Fill in scores as the tournament progresses. Standings update automatically. Download the PDF to print as a poster.
        </p>
      </div>
    </div>
  );
}
