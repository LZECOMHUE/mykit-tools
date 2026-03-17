// FIFA World Cup 2026 - USA, Canada & Mexico
// 48 teams, 12 groups of 4
// June 11 - July 19, 2026
// Top 2 from each group + 8 best third-placed teams advance to Round of 32

export const TOURNAMENT_INFO = {
  name: "FIFA World Cup 2026",
  hosts: "USA / Canada / Mexico",
  dates: "June 11 - July 19, 2026",
  teams: 48,
  groups: 12,
  venues: 16,
  format: "12 groups of 4, top 2 + 8 best 3rd = 32 in knockout",
};

// Teams by group with FIFA country codes and flag emoji
// TBD entries are for playoff winners not yet determined
export const GROUPS = {
  A: [
    { name: "Mexico", code: "MEX", flag: "\u{1F1F2}\u{1F1FD}" },
    { name: "South Africa", code: "RSA", flag: "\u{1F1FF}\u{1F1E6}" },
    { name: "South Korea", code: "KOR", flag: "\u{1F1F0}\u{1F1F7}" },
    { name: "UEFA Path D Winner", code: "TBD", flag: "\u{1F3F3}\u{FE0F}" },
  ],
  B: [
    { name: "Canada", code: "CAN", flag: "\u{1F1E8}\u{1F1E6}" },
    { name: "UEFA Path A Winner", code: "TBD", flag: "\u{1F3F3}\u{FE0F}" },
    { name: "Qatar", code: "QAT", flag: "\u{1F1F6}\u{1F1E6}" },
    { name: "Switzerland", code: "SUI", flag: "\u{1F1E8}\u{1F1ED}" },
  ],
  C: [
    { name: "Brazil", code: "BRA", flag: "\u{1F1E7}\u{1F1F7}" },
    { name: "Morocco", code: "MAR", flag: "\u{1F1F2}\u{1F1E6}" },
    { name: "Haiti", code: "HAI", flag: "\u{1F1ED}\u{1F1F9}" },
    { name: "Scotland", code: "SCO", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}" },
  ],
  D: [
    { name: "United States", code: "USA", flag: "\u{1F1FA}\u{1F1F8}" },
    { name: "Paraguay", code: "PAR", flag: "\u{1F1F5}\u{1F1FE}" },
    { name: "Australia", code: "AUS", flag: "\u{1F1E6}\u{1F1FA}" },
    { name: "UEFA Path C Winner", code: "TBD", flag: "\u{1F3F3}\u{FE0F}" },
  ],
  E: [
    { name: "Germany", code: "GER", flag: "\u{1F1E9}\u{1F1EA}" },
    { name: "Cura\u00e7ao", code: "CUW", flag: "\u{1F1E8}\u{1F1FC}" },
    { name: "Ivory Coast", code: "CIV", flag: "\u{1F1E8}\u{1F1EE}" },
    { name: "Ecuador", code: "ECU", flag: "\u{1F1EA}\u{1F1E8}" },
  ],
  F: [
    { name: "Netherlands", code: "NED", flag: "\u{1F1F3}\u{1F1F1}" },
    { name: "Japan", code: "JPN", flag: "\u{1F1EF}\u{1F1F5}" },
    { name: "UEFA Path B Winner", code: "TBD", flag: "\u{1F3F3}\u{FE0F}" },
    { name: "Tunisia", code: "TUN", flag: "\u{1F1F9}\u{1F1F3}" },
  ],
  G: [
    { name: "Belgium", code: "BEL", flag: "\u{1F1E7}\u{1F1EA}" },
    { name: "Egypt", code: "EGY", flag: "\u{1F1EA}\u{1F1EC}" },
    { name: "Iran", code: "IRN", flag: "\u{1F1EE}\u{1F1F7}" },
    { name: "New Zealand", code: "NZL", flag: "\u{1F1F3}\u{1F1FF}" },
  ],
  H: [
    { name: "Spain", code: "ESP", flag: "\u{1F1EA}\u{1F1F8}" },
    { name: "Cape Verde", code: "CPV", flag: "\u{1F1E8}\u{1F1FB}" },
    { name: "Saudi Arabia", code: "KSA", flag: "\u{1F1F8}\u{1F1E6}" },
    { name: "Uruguay", code: "URU", flag: "\u{1F1FA}\u{1F1FE}" },
  ],
  I: [
    { name: "France", code: "FRA", flag: "\u{1F1EB}\u{1F1F7}" },
    { name: "Senegal", code: "SEN", flag: "\u{1F1F8}\u{1F1F3}" },
    { name: "IC Path 2 Winner", code: "TBD", flag: "\u{1F3F3}\u{FE0F}" },
    { name: "Norway", code: "NOR", flag: "\u{1F1F3}\u{1F1F4}" },
  ],
  J: [
    { name: "Argentina", code: "ARG", flag: "\u{1F1E6}\u{1F1F7}" },
    { name: "Algeria", code: "ALG", flag: "\u{1F1E9}\u{1F1FF}" },
    { name: "Austria", code: "AUT", flag: "\u{1F1E6}\u{1F1F9}" },
    { name: "Jordan", code: "JOR", flag: "\u{1F1EF}\u{1F1F4}" },
  ],
  K: [
    { name: "Portugal", code: "POR", flag: "\u{1F1F5}\u{1F1F9}" },
    { name: "IC Path 1 Winner", code: "TBD", flag: "\u{1F3F3}\u{FE0F}" },
    { name: "Uzbekistan", code: "UZB", flag: "\u{1F1FA}\u{1F1FF}" },
    { name: "Colombia", code: "COL", flag: "\u{1F1E8}\u{1F1F4}" },
  ],
  L: [
    { name: "England", code: "ENG", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}" },
    { name: "Croatia", code: "CRO", flag: "\u{1F1ED}\u{1F1F7}" },
    { name: "Ghana", code: "GHA", flag: "\u{1F1EC}\u{1F1ED}" },
    { name: "Panama", code: "PAN", flag: "\u{1F1F5}\u{1F1E6}" },
  ],
};

// Group stage match schedule template (matchday structure)
// Actual dates/times TBC by FIFA
export const MATCHDAYS = [
  { day: 1, label: "Matchday 1", matches: ["1v2", "3v4"] },
  { day: 2, label: "Matchday 2", matches: ["1v3", "2v4"] },
  { day: 3, label: "Matchday 3", matches: ["1v4", "2v3"] },
];

// Knockout round structure
// R32 = Round of 32, R16 = Round of 16, QF = Quarter-finals, SF = Semi-finals, F = Final
export const KNOCKOUT_STRUCTURE = {
  round_of_32: {
    label: "Round of 32",
    shortLabel: "R32",
    matches: 16,
    description: "Winners and runners-up from each group, plus 8 best third-placed teams",
  },
  round_of_16: {
    label: "Round of 16",
    shortLabel: "R16",
    matches: 8,
  },
  quarter_finals: {
    label: "Quarter-Finals",
    shortLabel: "QF",
    matches: 4,
  },
  semi_finals: {
    label: "Semi-Finals",
    shortLabel: "SF",
    matches: 2,
  },
  third_place: {
    label: "3rd Place Play-off",
    shortLabel: "3rd",
    matches: 1,
  },
  final: {
    label: "Final",
    shortLabel: "F",
    matches: 1,
  },
};

// Host cities
export const HOST_CITIES = [
  // USA (11 cities)
  { city: "New York/New Jersey", country: "USA", stadium: "MetLife Stadium", capacity: 82500 },
  { city: "Los Angeles", country: "USA", stadium: "SoFi Stadium", capacity: 70240 },
  { city: "Dallas", country: "USA", stadium: "AT&T Stadium", capacity: 80000 },
  { city: "San Francisco", country: "USA", stadium: "Levi's Stadium", capacity: 68500 },
  { city: "Miami", country: "USA", stadium: "Hard Rock Stadium", capacity: 64767 },
  { city: "Atlanta", country: "USA", stadium: "Mercedes-Benz Stadium", capacity: 71000 },
  { city: "Houston", country: "USA", stadium: "NRG Stadium", capacity: 72220 },
  { city: "Philadelphia", country: "USA", stadium: "Lincoln Financial Field", capacity: 69176 },
  { city: "Seattle", country: "USA", stadium: "Lumen Field", capacity: 68740 },
  { city: "Kansas City", country: "USA", stadium: "Arrowhead Stadium", capacity: 76416 },
  { city: "Boston", country: "USA", stadium: "Gillette Stadium", capacity: 65878 },
  // Canada (2 cities)
  { city: "Toronto", country: "CAN", stadium: "BMO Field", capacity: 45000 },
  { city: "Vancouver", country: "CAN", stadium: "BC Place", capacity: 54500 },
  // Mexico (3 cities)
  { city: "Mexico City", country: "MEX", stadium: "Estadio Azteca", capacity: 87523 },
  { city: "Guadalajara", country: "MEX", stadium: "Estadio Akron", capacity: 49850 },
  { city: "Monterrey", country: "MEX", stadium: "Estadio BBVA", capacity: 53500 },
];
