export type League = 'Super League' | 'T20 League';
export type Role = 'Captain' | 'Vice-captain';

export interface Player {
  name: string;
  leagues: League[];
  superLeagueRole?: Role;
  t20Role?: Role;
}

// Merged from the two 2026 Norwegian Cricket Federation squad CSVs
// (Super League Qualifying A + T20 League Qualifying B).
// Unknown / placeholder entries removed.
// Alphabetical by first name.
export const players: Player[] = [
  { name: 'Anandu Nair',                  leagues: ['T20 League'] },
  { name: 'Asish Jacob',                  leagues: ['Super League', 'T20 League'] },
  { name: 'Basil Boon Kuriakose',         leagues: ['Super League', 'T20 League'], superLeagueRole: 'Captain' },
  { name: 'Benny Kuriakose',              leagues: ['Super League', 'T20 League'] },
  { name: 'Bibin Devasia',                leagues: ['Super League', 'T20 League'] },
  { name: 'Bibin Thomas',                 leagues: ['Super League', 'T20 League'], t20Role: 'Captain' },
  { name: 'Deva Nandan Harikrishna',      leagues: ['Super League', 'T20 League'] },
  { name: 'Jojy Varghese',                leagues: ['Super League', 'T20 League'] },
  { name: 'Kiran Raj',                    leagues: ['Super League', 'T20 League'] },
  { name: 'Lineesh Puthiyotttum Kandi',   leagues: ['Super League', 'T20 League'] },
  { name: 'Mahaboob Veettilayil Monutty', leagues: ['Super League', 'T20 League'] },
  { name: 'Mahesh Das',                   leagues: ['Super League', 'T20 League'] },
  { name: 'Nithin Chekkattu Nandan',      leagues: ['Super League', 'T20 League'] },
  {
    name: 'Rahul Kuppakkattu Kaladharan',
    leagues: ['Super League', 'T20 League'],
    superLeagueRole: 'Vice-captain',
    t20Role: 'Vice-captain',
  },
  { name: 'Ranjit Ramakrishnan Nair',     leagues: ['Super League', 'T20 League'] },
  { name: 'Ranjith Tom',                  leagues: ['Super League', 'T20 League'] },
  { name: 'Renju Kochumman Raju',         leagues: ['Super League', 'T20 League'] },
  { name: 'Rijoy P',                      leagues: ['Super League', 'T20 League'] },
  { name: 'Rohith Moothedath',            leagues: ['Super League', 'T20 League'] },
  { name: 'Vijith Peedika Kandiyil',      leagues: ['Super League', 'T20 League'] },
  { name: 'Vipin Chandran Ponattil',      leagues: ['T20 League'] },
];

export const leadership = {
  superLeague: {
    captain: players.find((p) => p.superLeagueRole === 'Captain')!,
    viceCaptain: players.find((p) => p.superLeagueRole === 'Vice-captain')!,
  },
  t20: {
    captain: players.find((p) => p.t20Role === 'Captain')!,
    viceCaptain: players.find((p) => p.t20Role === 'Vice-captain')!,
  },
};
