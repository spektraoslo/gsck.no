export type League = 'Super League' | 'T20 League';
export type Outcome = 'W' | 'L' | 'NR';

export interface Match {
  sno: number;
  matchType: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  teamOne: string;
  teamTwo: string;
  /** Raw result string from federation CSV */
  result: string;
  /** Raw score summary from CSV, e.g. "Team A: 144/8(20.0)Team B: 145/6(18.4)" */
  scoreSummary: string;
}

export interface LeagueStats {
  played: number;
  won: number;
  lost: number;
  noResult: number;
  points: number;
  form: Outcome[]; // most recent first, up to 5
}

const GSCK = 'Grorud cricket klubb';

// ── 2026 Super League — Qualifying A ───────────────────────
export const superLeagueMatches: Match[] = [
  { sno: 1, matchType: 'League', date: '2026-08-08', teamOne: 'Drammen B CK', teamTwo: GSCK,          result: 'Grorud cricket klubb won by 7 Wickets',         scoreSummary: 'Drammen B CK: 112/8(20.0)Grorud cricket klubb: 113/3(11.3)' },
  { sno: 2, matchType: 'League', date: '2026-07-25', teamOne: 'Strømsø B',    teamTwo: GSCK,          result: 'Abandoned.',                                    scoreSummary: 'Strømsø B: 83/3(10.0)' },
  { sno: 3, matchType: 'League', date: '2026-07-21', teamOne: 'Strømmen B',   teamTwo: GSCK,          result: 'Grorud cricket klubb won by 4 Wickets',         scoreSummary: 'Strømmen B: 144/8(20.0)Grorud cricket klubb: 145/6(18.4)' },
  { sno: 4, matchType: 'League', date: '2026-07-03', teamOne: 'Minhaj B',     teamTwo: GSCK,          result: 'Grorud cricket klubb won by 10 Wickets (D/L)',  scoreSummary: 'Minhaj B: 106/8(20.0)Grorud cricket klubb: 85/0(5.3)' },
  { sno: 5, matchType: 'League', date: '2026-06-26', teamOne: GSCK,           teamTwo: 'Kringsjå',    result: 'Grorud cricket klubb won by 5 Runs',            scoreSummary: 'Grorud cricket klubb: 157/9(20.0)Kringsjå: 152/7(20.0)' },
  { sno: 6, matchType: 'League', date: '2026-06-09', teamOne: GSCK,           teamTwo: 'Asker',       result: 'Asker won by 1 Run (D/L)',                      scoreSummary: 'Grorud cricket klubb: 108/6(14.0)Asker: 109/8(14.0)' },
  { sno: 7, matchType: 'League', date: '2026-05-24', teamOne: GSCK,           teamTwo: 'Helsfyr',     result: 'Grorud cricket klubb won by 93 Runs',           scoreSummary: 'Grorud cricket klubb: 176/8(20.0)Helsfyr: 83/10(11.5)' },
  { sno: 8, matchType: 'League', date: '2026-05-13', teamOne: 'Fjord C',      teamTwo: GSCK,          result: 'Grorud cricket klubb won by 2 Wickets',         scoreSummary: 'Fjord C: 150/6(20.0)Grorud cricket klubb: 151/8(19.2)' },
];

// ── 2026 T20 League — Qualifying B ─────────────────────────
export const t20Matches: Match[] = [
  { sno: 1, matchType: 'League', date: '2026-07-31', teamOne: 'Sandvika CK',           teamTwo: GSCK,       result: 'Sandvika CK won by 66 Runs',                    scoreSummary: 'Sandvika CK: 205/5(20.0)Grorud cricket klubb: 139/9(20.0)' },
  { sno: 2, matchType: 'League', date: '2026-07-14', teamOne: GSCK,                    teamTwo: 'Nord C',   result: 'Forfeited. Winner: Grorud cricket klubb',       scoreSummary: 'Grorud cricket klubb: 0/0(0.0)' },
  { sno: 3, matchType: 'League', date: '2026-07-06', teamOne: 'Holmlia Cricketklubb',  teamTwo: GSCK,       result: 'Holmlia Cricketklubb won by 43 Runs',           scoreSummary: 'Holmlia Cricketklubb: 154/10(20.0)Grorud cricket klubb: 111/10(17.3)' },
  { sno: 4, matchType: 'League', date: '2026-06-28', teamOne: GSCK,                    teamTwo: 'Hisøy',    result: 'Hisøy won by 3 Wickets',                        scoreSummary: 'Grorud cricket klubb: 139/4(20.0)Hisøy: 140/7(19.0)' },
  { sno: 5, matchType: 'League', date: '2026-06-11', teamOne: GSCK,                    teamTwo: 'Fjord D',  result: 'Grorud cricket klubb won by 10 Runs',           scoreSummary: 'Grorud cricket klubb: 133/10(19.5)Fjord D: 123/9(20.0)' },
  { sno: 6, matchType: 'League', date: '2026-05-21', teamOne: 'MASK C',                teamTwo: GSCK,       result: 'Grorud cricket klubb won by 8 Wickets',         scoreSummary: 'MASK C: 123/9(20.0)Grorud cricket klubb: 124/2(13.5)' },
  { sno: 7, matchType: 'League', date: '2026-05-09', teamOne: 'Nordlys',               teamTwo: GSCK,       result: 'Nordlys won by 37 Runs',                        scoreSummary: 'Nordlys: 139/7(20.0)Grorud cricket klubb: 102/10(15.5)' },
];

// ── Helpers ────────────────────────────────────────────────

export function outcomeFor(match: Match): Outcome {
  const r = match.result.toLowerCase();
  if (r.startsWith('abandoned') || r.includes('no result')) return 'NR';
  if (r.includes('winner: grorud')) return 'W';
  if (r.startsWith('grorud cricket klubb won')) return 'W';
  return 'L';
}

/** Standard scoring: W=2, NR=1, L=0. Adjust if federation uses different rules. */
export function computeStats(matches: Match[]): LeagueStats {
  const sortedNewestFirst = [...matches].sort((a, b) => (a.date < b.date ? 1 : -1));
  const stats: LeagueStats = {
    played: matches.length,
    won: 0,
    lost: 0,
    noResult: 0,
    points: 0,
    form: sortedNewestFirst.slice(0, 5).map(outcomeFor),
  };
  for (const m of matches) {
    const o = outcomeFor(m);
    if (o === 'W') { stats.won++; stats.points += 2; }
    else if (o === 'L') { stats.lost++; }
    else { stats.noResult++; stats.points += 1; }
  }
  return stats;
}

export interface ParsedScore {
  team: string;
  score: string; // e.g. "144/8"
  overs: string; // e.g. "20.0"
}

/** Parse "Team: X/Y(Z.Z)Team2: A/B(C.D)" into per-team scores. */
export function parseScores(match: Match): { one: ParsedScore | null; two: ParsedScore | null } {
  const extract = (team: string): ParsedScore | null => {
    const escaped = team.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`${escaped}:\\s*(\\d+/\\d+)\\((\\d+\\.\\d+)\\)`);
    const m = match.scoreSummary.match(re);
    return m ? { team, score: m[1], overs: m[2] } : null;
  };
  return { one: extract(match.teamOne), two: extract(match.teamTwo) };
}

export function isGSCK(name: string): boolean {
  return name === GSCK;
}

export function displayName(name: string): string {
  return isGSCK(name) ? 'GSCK' : name;
}

// ── GSCK standing snapshot (from Norges Cricket Forbund points table CSVs) ──
// Only our own team's position is kept — not the rest of the table.

export interface GsckStanding {
  position: number;
  totalTeams: number;
  netRr: number;
}

export const gsckSuperLeagueStanding: GsckStanding = {
  position: 2,
  totalTeams: 10,
  netRr: 2.1206,
};

export const gsckT20Standing: GsckStanding = {
  position: 6,
  totalTeams: 9,
  netRr: -0.8576,
};

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
