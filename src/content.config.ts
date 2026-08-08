import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reports' }),
  schema: z.object({
    /** ISO date of the match (YYYY-MM-DD) — matches the entry in matches.ts */
    matchDate: z.string(),
    league: z.enum(['Super League', 'T20 League']),
    /** Opponent name — must match the non-GSCK team in matches.ts exactly */
    opponent: z.string(),
    /** Outcome from GSCK's perspective */
    result: z.enum(['W', 'L', 'NR']),
    /** Human-friendly result sentence, e.g. "Won by 7 wickets" */
    resultText: z.string(),
    /** Optional score summary "Team A 112/8 (20.0) · GSCK 113/3 (11.3)" */
    scoreSummary: z.string().optional(),
    /** Optional venue / ground */
    venue: z.string().optional(),
    /** Optional cover image path (relative to /public) */
    coverImage: z.string().optional(),
    /** Optional link to the official scorecard PDF (in /public or external) */
    scorecardUrl: z.string().optional(),
  }),
});

export const collections = { reports };
