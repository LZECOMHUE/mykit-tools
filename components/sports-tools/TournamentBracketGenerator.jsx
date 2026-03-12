'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const FORMATS = {
  SINGLE_ELIMINATION: 'single',
  DOUBLE_ELIMINATION: 'double',
  ROUND_ROBIN: 'roundrobin',
};

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const generateSingleElimination = (teams) => {
  const rounds = [];
  let currentRound = teams.map((team, idx) => ({ id: idx, team1: team, team2: null, winner: null }));

  // Pair teams
  const matches = [];
  for (let i = 0; i < currentRound.length; i += 2) {
    matches.push({
      id: i,
      team1: currentRound[i]?.team1 || null,
      team2: currentRound[i + 1]?.team1 || null,
      winner: null,
    });
  }

  rounds.push({ roundNum: 1, matches });

  let matchId = matches.length;
  for (let round = 2; round <= Math.log2(teams.length); round++) {
    const prevMatches = rounds[round - 2].matches;
    const nextMatches = [];
    for (let i = 0; i < prevMatches.length; i += 2) {
      nextMatches.push({
        id: matchId++,
        team1: null,
        team2: null,
        winner: null,
      });
    }
    rounds.push({ roundNum: round, matches: nextMatches });
  }

  return rounds;
};

const generateRoundRobin = (teams) => {
  const fixtures = [];
  const schedule = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      fixtures.push({
        id: fixtures.length,
        team1: teams[i],
        team2: teams[j],
        score1: null,
        score2: null,
        winner: null,
      });
    }
  }

  // Simple round assignment (can be improved with proper scheduler)
  let round = 1;
  const used = new Set();
  for (let fixture of fixtures) {
    const key = `${fixture.team1}-${fixture.team2}`;
    schedule.push({ ...fixture, round: Math.ceil((fixtures.indexOf(fixture) + 1) / (teams.length / 2)) });
  }

  return schedule.sort((a, b) => a.round - b.round);
};

export default function TournamentBracketGenerator() {
  const [format, setFormat] = useState(FORMATS.SINGLE_ELIMINATION);
  const [teamsInput, setTeamsInput] = useState('Team A\nTeam B\nTeam C\nTeam D');
  const [bracket, setBracket] = useState(null);
  const [roundRobin, setRoundRobin] = useState(null);
  const [standings, setStandings] = useState([]);

  const teams = useMemo(() => {
    return teamsInput
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }, [teamsInput]);

  const handleGenerate = useCallback(() => {
    if (teams.length < 2) {
      return;
    }

    const shuffled = shuffleArray(teams);

    if (format === FORMATS.SINGLE_ELIMINATION || format === FORMATS.DOUBLE_ELIMINATION) {
      const rounds = generateSingleElimination(shuffled);
      setBracket(rounds);
      setRoundRobin(null);
    } else {
      const fixtures = generateRoundRobin(shuffled);
      setRoundRobin(fixtures);
      setBracket(null);

      // Initialize standings
      const standings = shuffled.map((team) => ({
        team,
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
      }));
      setStandings(standings);
    }
  }, [teams, format]);

  const handleReshuffle = useCallback(() => {
    handleGenerate();
  }, [handleGenerate]);

  const handleSetWinner = useCallback(
    (roundIdx, matchIdx, winner) => {
      if (!bracket) return;
      const newBracket = JSON.parse(JSON.stringify(bracket));
      newBracket[roundIdx].matches[matchIdx].winner = winner;

      // Advance winner to next round
      if (roundIdx < newBracket.length - 1) {
        const nextRound = newBracket[roundIdx + 1];
        const nextMatchIdx = Math.floor(matchIdx / 2);
        const isTeam1 = matchIdx % 2 === 0;
        if (isTeam1) {
          nextRound.matches[nextMatchIdx].team1 = winner;
        } else {
          nextRound.matches[nextMatchIdx].team2 = winner;
        }
      }

      setBracket(newBracket);
    },
    [bracket]
  );

  const handleSetRoundRobinScore = useCallback(
    (fixtureIdx, score1, score2) => {
      if (!roundRobin) return;

      const newRoundRobin = [...roundRobin];
      const fixture = newRoundRobin[fixtureIdx];
      fixture.score1 = score1;
      fixture.score2 = score2;

      // Determine winner
      if (score1 > score2) {
        fixture.winner = fixture.team1;
      } else if (score2 > score1) {
        fixture.winner = fixture.team2;
      } else {
        fixture.winner = 'draw';
      }

      setRoundRobin(newRoundRobin);

      // Update standings
      const newStandings = standings.map((s) => ({
        ...s,
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
      }));

      for (let f of newRoundRobin) {
        const s1 = newStandings.find((s) => s.team === f.team1);
        const s2 = newStandings.find((s) => s.team === f.team2);

        if (s1 && s2) {
          s1.played += 1;
          s2.played += 1;

          if (f.winner === f.team1) {
            s1.won += 1;
            s2.lost += 1;
            s1.points += 3;
          } else if (f.winner === f.team2) {
            s2.won += 1;
            s1.lost += 1;
            s2.points += 3;
          } else {
            s1.points += 1;
            s2.points += 1;
          }
        }
      }

      setStandings(newStandings.sort((a, b) => b.points - a.points));
    },
    [roundRobin, standings]
  );

  const handleDownloadBracket = useCallback(() => {
    const element = document.getElementById('bracket-content');
    if (!element) return;

    // Use html2canvas equivalent here
  }, []);

  return (
    <div className="space-y-6">
      {/* Setup Panel */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Tournament Setup</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Tournament Format</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(FORMATS).map(([key, value]) => (
                <button
                  key={value}
                  onClick={() => setFormat(value)}
                  className={`px-4 py-2 rounded-[var(--radius-input)] font-medium transition ${
                    format === value
                      ? 'bg-accent text-white'
                      : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  {key === 'SINGLE_ELIMINATION' && 'Single Elimination'}
                  {key === 'DOUBLE_ELIMINATION' && 'Double Elimination'}
                  {key === 'ROUND_ROBIN' && 'Round Robin'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Teams/Players ({teams.length})
            </label>
            <textarea
              value={teamsInput}
              onChange={(e) => setTeamsInput(e.target.value)}
              placeholder="Team A&#10;Team B&#10;Team C&#10;Team D"
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted font-mono text-sm focus:outline-none focus:border-accent"
            />
            <p className="text-xs text-text-muted mt-2">One team per line. Max 32 teams.</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} className="flex-1">
              Generate Tournament
            </Button>
            {bracket && (
              <Button onClick={handleReshuffle} variant="secondary">
                Reshuffle
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Bracket Display */}
      {bracket && (
        <Card>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Tournament Bracket</h3>

          <div id="bracket-content" className="overflow-x-auto pb-4">
            <div className="space-y-4 min-w-max p-4 bg-surface rounded-[var(--radius-card)]">
              {bracket.map((round, roundIdx) => (
                <div key={roundIdx}>
                  <h4 className="text-sm font-medium text-text-secondary mb-3">Round {round.roundNum}</h4>
                  <div className="space-y-3">
                    {round.matches.map((match, matchIdx) => (
                      <div key={matchIdx} className="bg-white border border-border rounded-[var(--radius-input)] overflow-hidden">
                        {/* Team 1 */}
                        <div
                          onClick={() => handleSetWinner(roundIdx, matchIdx, match.team1)}
                          className={`p-3 border-b border-border cursor-pointer transition ${
                            match.winner === match.team1 ? 'bg-success bg-opacity-20' : 'hover:bg-surface'
                          }`}
                        >
                          <div className="text-sm font-medium text-text-primary">
                            {match.team1 || '—'}
                          </div>
                        </div>

                        {/* Team 2 */}
                        <div
                          onClick={() => handleSetWinner(roundIdx, matchIdx, match.team2)}
                          className={`p-3 cursor-pointer transition ${
                            match.winner === match.team2 ? 'bg-success bg-opacity-20' : 'hover:bg-surface'
                          }`}
                        >
                          <div className="text-sm font-medium text-text-primary">
                            {match.team2 || '—'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleDownloadBracket} variant="secondary" className="w-full mt-4">
            Download Bracket as Image
          </Button>
        </Card>
      )}

      {/* Round Robin Fixtures & Standings */}
      {roundRobin && (
        <>
          {/* Standings */}
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Standings</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-3 py-2 text-left font-medium text-text-secondary">Team</th>
                    <th className="px-3 py-2 text-center font-medium text-text-secondary">P</th>
                    <th className="px-3 py-2 text-center font-medium text-text-secondary">W</th>
                    <th className="px-3 py-2 text-center font-medium text-text-secondary">L</th>
                    <th className="px-3 py-2 text-center font-medium text-text-secondary">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((s, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-surface">
                      <td className="px-3 py-2 font-medium text-text-primary">{s.team}</td>
                      <td className="px-3 py-2 text-center text-text-secondary">{s.played}</td>
                      <td className="px-3 py-2 text-center text-success font-medium">{s.won}</td>
                      <td className="px-3 py-2 text-center text-error font-medium">{s.lost}</td>
                      <td className="px-3 py-2 text-center font-mono font-bold text-accent">{s.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Fixtures */}
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Fixtures & Results</h3>

            {[...new Set(roundRobin.map((f) => f.round))].map((roundNum) => (
              <div key={roundNum} className="mb-6 pb-4 border-b border-border last:border-b-0">
                <h4 className="font-medium text-text-primary mb-3">Round {roundNum}</h4>
                <div className="space-y-2">
                  {roundRobin
                    .filter((f) => f.round === roundNum)
                    .map((fixture) => (
                      <div key={fixture.id} className="bg-surface p-3 rounded-[var(--radius-input)]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="flex-1 text-text-primary font-medium">{fixture.team1}</span>
                          <div className="flex gap-1 items-center">
                            <input
                              type="number"
                              min="0"
                              max="99"
                              value={fixture.score1 ?? ''}
                              onChange={(e) =>
                                handleSetRoundRobinScore(
                                  fixture.id,
                                  e.target.value ? parseInt(e.target.value) : null,
                                  fixture.score2
                                )
                              }
                              placeholder="0"
                              className="w-12 px-2 py-1 border border-border rounded text-center font-mono focus:outline-none focus:border-accent"
                            />
                            <span className="text-text-secondary">vs</span>
                            <input
                              type="number"
                              min="0"
                              max="99"
                              value={fixture.score2 ?? ''}
                              onChange={(e) =>
                                handleSetRoundRobinScore(
                                  fixture.id,
                                  fixture.score1,
                                  e.target.value ? parseInt(e.target.value) : null
                                )
                              }
                              placeholder="0"
                              className="w-12 px-2 py-1 border border-border rounded text-center font-mono focus:outline-none focus:border-accent"
                            />
                          </div>
                          <span className="flex-1 text-right text-text-primary font-medium">{fixture.team2}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}
