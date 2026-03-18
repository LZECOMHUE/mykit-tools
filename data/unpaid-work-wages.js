// Wage data for unpaid work calculators
// Sources: ONS (UK), BLS (US), ABS (AU), StatCan (CA), official government wage statistics
// Last updated: 2026-03

export const COUNTRIES = [
  { id: 'uk', name: 'United Kingdom', currency: '\u00A3', code: 'GBP', flag: '\uD83C\uDDEC\uD83C\uDDE7' },
  { id: 'us', name: 'United States', currency: '$', code: 'USD', flag: '\uD83C\uDDFA\uD83C\uDDF8' },
  { id: 'ca', name: 'Canada', currency: 'C$', code: 'CAD', flag: '\uD83C\uDDE8\uD83C\uDDE6' },
  { id: 'au', name: 'Australia', currency: 'A$', code: 'AUD', flag: '\uD83C\uDDE6\uD83C\uDDFA' },
  { id: 'ie', name: 'Ireland', currency: '\u20AC', code: 'EUR', flag: '\uD83C\uDDEE\uD83C\uDDEA' },
  { id: 'nz', name: 'New Zealand', currency: 'NZ$', code: 'NZD', flag: '\uD83C\uDDF3\uD83C\uDDFF' },
  { id: 'in', name: 'India', currency: '\u20B9', code: 'INR', flag: '\uD83C\uDDEE\uD83C\uDDF3' },
  { id: 'ae', name: 'UAE', currency: 'AED', code: 'AED', flag: '\uD83C\uDDE6\uD83C\uDDEA' },
  { id: 'sg', name: 'Singapore', currency: 'S$', code: 'SGD', flag: '\uD83C\uDDF8\uD83C\uDDEC' },
  { id: 'de', name: 'Germany', currency: '\u20AC', code: 'EUR', flag: '\uD83C\uDDE9\uD83C\uDDEA' },
  { id: 'fr', name: 'France', currency: '\u20AC', code: 'EUR', flag: '\uD83C\uDDEB\uD83C\uDDF7' },
  { id: 'za', name: 'South Africa', currency: 'R', code: 'ZAR', flag: '\uD83C\uDDFF\uD83C\uDDE6' },
];

// Hourly rates for professional equivalents by country (midpoint of range)
export const ROLE_RATES = {
  uk: {
    childcare: 13.50, nightCare: 17.50, cooking: 16.00, cleaning: 13.50,
    householdMgmt: 17.50, tutoring: 32.50, emotionalSupport: 50.00,
    driving: 13.50, nursing: 17.50, entertainment: 13.50, admin: 16.50, laundry: 13.00,
    avgFemaleWage: 14.50, avgSalary: 35000,
  },
  us: {
    childcare: 21.50, nightCare: 28.50, cooking: 25.00, cleaning: 20.00,
    householdMgmt: 21.50, tutoring: 45.00, emotionalSupport: 90.00,
    driving: 18.00, nursing: 25.00, entertainment: 18.00, admin: 21.50, laundry: 18.00,
    avgFemaleWage: 22.50, avgSalary: 59000,
  },
  ca: {
    childcare: 19.50, nightCare: 25.00, cooking: 22.00, cleaning: 21.50,
    householdMgmt: 20.00, tutoring: 40.00, emotionalSupport: 75.00,
    driving: 17.00, nursing: 23.00, entertainment: 17.00, admin: 19.50, laundry: 17.00,
    avgFemaleWage: 20.00, avgSalary: 55000,
  },
  au: {
    childcare: 30.00, nightCare: 38.00, cooking: 32.00, cleaning: 35.00,
    householdMgmt: 30.00, tutoring: 55.00, emotionalSupport: 100.00,
    driving: 25.00, nursing: 35.00, entertainment: 25.00, admin: 28.00, laundry: 25.00,
    avgFemaleWage: 30.00, avgSalary: 70000,
  },
  ie: {
    childcare: 14.00, nightCare: 18.00, cooking: 16.50, cleaning: 14.00,
    householdMgmt: 18.00, tutoring: 35.00, emotionalSupport: 55.00,
    driving: 14.00, nursing: 18.00, entertainment: 14.00, admin: 17.00, laundry: 13.50,
    avgFemaleWage: 15.50, avgSalary: 40000,
  },
  nz: {
    childcare: 24.00, nightCare: 30.00, cooking: 26.00, cleaning: 28.00,
    householdMgmt: 25.00, tutoring: 45.00, emotionalSupport: 85.00,
    driving: 22.00, nursing: 28.00, entertainment: 22.00, admin: 24.00, laundry: 22.00,
    avgFemaleWage: 25.00, avgSalary: 58000,
  },
  in: {
    childcare: 175, nightCare: 225, cooking: 150, cleaning: 115,
    householdMgmt: 200, tutoring: 400, emotionalSupport: 600,
    driving: 150, nursing: 200, entertainment: 125, admin: 175, laundry: 100,
    avgFemaleWage: 120, avgSalary: 600000,
  },
  ae: {
    childcare: 45, nightCare: 60, cooking: 50, cleaning: 40,
    householdMgmt: 55, tutoring: 100, emotionalSupport: 150,
    driving: 40, nursing: 55, entertainment: 40, admin: 50, laundry: 35,
    avgFemaleWage: 45, avgSalary: 180000,
  },
  sg: {
    childcare: 18, nightCare: 24, cooking: 20, cleaning: 18,
    householdMgmt: 22, tutoring: 50, emotionalSupport: 80,
    driving: 16, nursing: 22, entertainment: 16, admin: 20, laundry: 15,
    avgFemaleWage: 18, avgSalary: 60000,
  },
  de: {
    childcare: 14.00, nightCare: 18.00, cooking: 16.00, cleaning: 14.00,
    householdMgmt: 18.00, tutoring: 30.00, emotionalSupport: 55.00,
    driving: 14.00, nursing: 18.00, entertainment: 13.50, admin: 16.50, laundry: 13.00,
    avgFemaleWage: 15.00, avgSalary: 42000,
  },
  fr: {
    childcare: 13.00, nightCare: 17.00, cooking: 15.50, cleaning: 13.00,
    householdMgmt: 17.00, tutoring: 28.00, emotionalSupport: 50.00,
    driving: 13.00, nursing: 17.00, entertainment: 13.00, admin: 16.00, laundry: 12.50,
    avgFemaleWage: 14.00, avgSalary: 38000,
  },
  za: {
    childcare: 45, nightCare: 60, cooking: 40, cleaning: 35,
    householdMgmt: 55, tutoring: 120, emotionalSupport: 200,
    driving: 40, nursing: 55, entertainment: 35, admin: 50, laundry: 30,
    avgFemaleWage: 45, avgSalary: 250000,
  },
};

// Emotional labour roles with rates (uses subset of ROLE_RATES keys + custom)
export const EMOTIONAL_LABOUR_ROLES = [
  { id: 'remembering', name: 'Remembering everything', desc: 'Birthdays, appointments, school dates, shoe sizes, allergies, teacher names', rateKey: 'admin' },
  { id: 'planning', name: 'Planning and scheduling', desc: 'Meal plans, weekly schedule, activity bookings, holiday planning, party organising', rateKey: 'householdMgmt' },
  { id: 'anticipating', name: 'Anticipating needs', desc: 'Buying clothes before outgrown, restocking nappies/wipes, noticing when shoes are too small', rateKey: 'householdMgmt' },
  { id: 'decisions', name: 'Decision fatigue', desc: '"What\'s for dinner?" x365, choosing schools, medical decisions, screen time rules', rateKey: 'emotionalSupport' },
  { id: 'worry', name: 'Worry and risk assessment', desc: 'Checking they\'re breathing, sun cream, road safety, online safety, friendship drama', rateKey: 'nursing' },
  { id: 'social', name: 'Social coordination', desc: 'Thank you cards, RSVPs, teacher gifts, remembering allergies, childcare swaps', rateKey: 'admin' },
  { id: 'houseMgmt', name: 'Household project management', desc: 'Knowing what needs fixing, booking tradespeople, insurance, car MOT, maintenance', rateKey: 'householdMgmt' },
  { id: 'familyRelations', name: 'Family relationship management', desc: 'Keeping in touch with both families, managing in-law dynamics, arranging visits', rateKey: 'emotionalSupport' },
  { id: 'research', name: 'Research', desc: 'Googling symptoms at 2am, researching schools, finding the right car seat, comparing nurseries', rateKey: 'householdMgmt' },
  { id: 'defaultParent', name: 'Default parent tax', desc: 'Being the one the school calls, knowing where everything is, the backup for everything', rateKey: 'admin' },
];

// SAHP calculator role definitions
export const SAHP_ROLES = [
  { id: 'childcare', name: 'Childcare', tasks: 'Feeding, school pickups, supervising play', equivalent: 'Nanny' },
  { id: 'nightCare', name: 'Night care', tasks: 'Night feeds, settling, nightmares', equivalent: 'Night nanny' },
  { id: 'cooking', name: 'Cooking', tasks: 'Meal planning, 3 meals a day, snacks', equivalent: 'Private chef' },
  { id: 'cleaning', name: 'Cleaning', tasks: 'Hoovering, bathrooms, tidying up', equivalent: 'Cleaner' },
  { id: 'householdMgmt', name: 'Household management', tasks: 'Bills, budgeting, appointments', equivalent: 'Household manager' },
  { id: 'tutoring', name: 'Tutoring', tasks: 'Reading practice, homework, phonics', equivalent: 'Private tutor' },
  { id: 'emotionalSupport', name: 'Emotional support', tasks: 'Tantrums, anxiety, conflict resolution', equivalent: 'Child counsellor' },
  { id: 'driving', name: 'Driving', tasks: 'School runs, activities, playdates', equivalent: 'Private driver' },
  { id: 'nursing', name: 'Healthcare', tasks: 'Illness care, GP visits, medicine', equivalent: 'Healthcare worker' },
  { id: 'entertainment', name: 'Entertainment', tasks: 'Arts and crafts, park trips, stories', equivalent: 'Activity leader' },
  { id: 'admin', name: 'Admin', tasks: 'Dentist bookings, school forms, insurance', equivalent: 'Personal assistant' },
  { id: 'laundry', name: 'Laundry', tasks: 'Washing, folding, ironing, stain removal', equivalent: 'Laundry service' },
];

// Age preset hours per week for SAHP calculator
export const AGE_PRESETS = {
  'baby': { label: 'Baby (0-1)', hours: { childcare: 40, nightCare: 14, cooking: 10, cleaning: 10, householdMgmt: 5, tutoring: 0, emotionalSupport: 5, driving: 3, nursing: 5, entertainment: 10, admin: 3, laundry: 7 }},
  'toddler': { label: 'Toddler (1-3)', hours: { childcare: 35, nightCare: 7, cooking: 12, cleaning: 12, householdMgmt: 5, tutoring: 2, emotionalSupport: 8, driving: 5, nursing: 3, entertainment: 12, admin: 3, laundry: 8 }},
  'preschool': { label: 'Pre-school (3-5)', hours: { childcare: 30, nightCare: 3, cooking: 14, cleaning: 10, householdMgmt: 5, tutoring: 5, emotionalSupport: 7, driving: 7, nursing: 2, entertainment: 10, admin: 4, laundry: 7 }},
  'primary': { label: 'Primary (5-11)', hours: { childcare: 20, nightCare: 2, cooking: 14, cleaning: 10, householdMgmt: 5, tutoring: 7, emotionalSupport: 5, driving: 10, nursing: 2, entertainment: 7, admin: 4, laundry: 6 }},
  'teen': { label: 'Teenager (11-18)', hours: { childcare: 10, nightCare: 1, cooking: 14, cleaning: 8, householdMgmt: 5, tutoring: 5, emotionalSupport: 10, driving: 12, nursing: 1, entertainment: 3, admin: 5, laundry: 5 }},
};

// Child multipliers (additional % per extra child for roles that scale)
export const CHILD_MULTIPLIERS = {
  cooking: 0.4,    // 40% more per extra child
  laundry: 0.5,    // 50% more
  driving: 0.3,    // 30% more
  cleaning: 0.25,  // 25% more
  childcare: 0.3,
  entertainment: 0.3,
  nightCare: 0.2,
};

// Breastfeeding data
export const BF_DATA = {
  feedsPerDay: { '0-3': 10, '3-6': 7, '6-12': 5, '12-24': 3 },
  minsPerFeed: { '0-3': 30, '3-6': 22, '6-12': 15, '12-24': 12 },
  nightFeeds: { '0-3': 3, '3-6': 2, '6-12': 1, '12-24': 0.5 },
  formulaCostWeekly: {
    uk: 12.50, us: 30, ca: 35, au: 30, ie: 13, nz: 28, in: 1150, ae: 100, sg: 40, de: 12, fr: 11, za: 350,
  },
  equipmentSaved: {
    uk: 350, us: 450, ca: 400, au: 500, ie: 350, nz: 400, in: 5000, ae: 600, sg: 350, de: 300, fr: 280, za: 3500,
  },
  mlPerDay: 750, // average exclusive BF
};

// Cost of raising a child - annual estimates by age band and country
export const CHILD_COST_DATA = {
  uk: {
    '0-2': { childcare: 12000, food: 1200, clothes: 800, equipment: 2000, health: 200, other: 1500 },
    '3-4': { childcare: 8000, food: 1500, clothes: 700, activities: 1200, other: 1200 },
    '5-11': { school: 800, food: 2000, clothes: 800, activities: 1800, tech: 300, other: 1500 },
    '11-16': { school: 1000, food: 2800, clothes: 1200, activities: 1500, tech: 600, social: 1200, other: 1500 },
    '16-18': { education: 1200, food: 3000, clothes: 1200, driving: 2000, tech: 500, social: 1800, other: 1500 },
  },
  us: {
    '0-2': { childcare: 18000, food: 1800, clothes: 1000, equipment: 2500, health: 1500, other: 2000 },
    '3-4': { childcare: 14000, food: 2200, clothes: 900, activities: 1800, other: 1800 },
    '5-11': { school: 1200, food: 2800, clothes: 1000, activities: 2500, tech: 500, other: 2000 },
    '11-16': { school: 1500, food: 3500, clothes: 1500, activities: 2200, tech: 800, social: 1800, other: 2000 },
    '16-18': { education: 2000, food: 4000, clothes: 1500, driving: 4000, tech: 700, social: 2500, other: 2000 },
  },
  // Simplified for other countries - multiplier from UK
  ca: 1.1, au: 1.4, ie: 1.05, nz: 1.15, in: 0.15, ae: 1.3, sg: 1.2, de: 1.0, fr: 0.95, za: 0.25,
};

// Childcare market rates for grandparent calculator
export const CHILDCARE_RATES = {
  uk: { nurseryUnder2: 72, nursery2to3: 62, nursery3to5: 48, childminder: 6.50, afterSchool: 12, holidayClub: 32 },
  us: { nurseryUnder2: 65, nursery2to3: 55, nursery3to5: 45, childminder: 12, afterSchool: 18, holidayClub: 50 },
  ca: { nurseryUnder2: 60, nursery2to3: 50, nursery3to5: 40, childminder: 10, afterSchool: 15, holidayClub: 45 },
  au: { nurseryUnder2: 140, nursery2to3: 120, nursery3to5: 100, childminder: 15, afterSchool: 20, holidayClub: 60 },
  ie: { nurseryUnder2: 65, nursery2to3: 55, nursery3to5: 45, childminder: 6, afterSchool: 10, holidayClub: 30 },
  nz: { nurseryUnder2: 70, nursery2to3: 60, nursery3to5: 50, childminder: 9, afterSchool: 15, holidayClub: 40 },
  in: { nurseryUnder2: 600, nursery2to3: 500, nursery3to5: 400, childminder: 100, afterSchool: 200, holidayClub: 500 },
  ae: { nurseryUnder2: 200, nursery2to3: 180, nursery3to5: 150, childminder: 35, afterSchool: 50, holidayClub: 120 },
  sg: { nurseryUnder2: 90, nursery2to3: 75, nursery3to5: 60, childminder: 12, afterSchool: 18, holidayClub: 50 },
  de: { nurseryUnder2: 45, nursery2to3: 38, nursery3to5: 30, childminder: 5, afterSchool: 8, holidayClub: 25 },
  fr: { nurseryUnder2: 40, nursery2to3: 35, nursery3to5: 28, childminder: 4.50, afterSchool: 7, holidayClub: 22 },
  za: { nurseryUnder2: 350, nursery2to3: 300, nursery3to5: 250, childminder: 50, afterSchool: 80, holidayClub: 200 },
};

// Household task categories for partner split
export const HOUSEHOLD_TASKS = [
  { id: 'cooking', name: 'Cooking and meal prep' },
  { id: 'cleaning', name: 'Cleaning and tidying' },
  { id: 'laundry', name: 'Laundry' },
  { id: 'shopping', name: 'Food shopping' },
  { id: 'dayCare', name: 'Childcare (daytime)' },
  { id: 'nightCare', name: 'Night waking and bedtime' },
  { id: 'schoolRuns', name: 'School runs and transport' },
  { id: 'homework', name: 'Homework help' },
  { id: 'admin', name: 'Household admin (bills, appointments)' },
  { id: 'diy', name: 'DIY and maintenance' },
  { id: 'garden', name: 'Garden' },
  { id: 'pets', name: 'Pet care' },
  { id: 'socialPlanning', name: 'Social planning (parties, events, gifts)' },
  { id: 'emotionalKids', name: 'Emotional support for children' },
  { id: 'emotionalPartner', name: 'Emotional support for partner' },
];

// Timezone to country mapping for auto-detection
const TIMEZONE_TO_COUNTRY = {
  'America/New_York': 'us', 'America/Chicago': 'us', 'America/Denver': 'us',
  'America/Los_Angeles': 'us', 'America/Phoenix': 'us', 'America/Anchorage': 'us',
  'Pacific/Honolulu': 'us', 'America/Detroit': 'us', 'America/Indiana/Indianapolis': 'us',
  'America/Boise': 'us', 'America/Juneau': 'us',
  'America/Toronto': 'ca', 'America/Vancouver': 'ca', 'America/Edmonton': 'ca',
  'America/Winnipeg': 'ca', 'America/Halifax': 'ca', 'America/St_Johns': 'ca',
  'America/Regina': 'ca', 'America/Montreal': 'ca',
  'Australia/Sydney': 'au', 'Australia/Melbourne': 'au', 'Australia/Brisbane': 'au',
  'Australia/Perth': 'au', 'Australia/Adelaide': 'au', 'Australia/Hobart': 'au',
  'Asia/Kolkata': 'in', 'Asia/Calcutta': 'in',
  'Europe/London': 'uk', 'Europe/Belfast': 'uk',
  'Asia/Dubai': 'ae', 'Asia/Muscat': 'ae',
  'Europe/Dublin': 'ie',
  'Pacific/Auckland': 'nz', 'Pacific/Chatham': 'nz',
  'Asia/Singapore': 'sg',
  'Africa/Johannesburg': 'za',
  'Europe/Berlin': 'de', 'Europe/Munich': 'de',
  'Europe/Paris': 'fr', 'Europe/Lyon': 'fr',
};

// Detect user's country from browser timezone
export function detectUserCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_TO_COUNTRY[tz] || 'uk';
  } catch {
    return 'uk';
  }
}

// Helper: format currency value
export function formatCurrency(amount, countryId) {
  const country = COUNTRIES.find(c => c.id === countryId);
  if (!country) return String(Math.round(amount));
  const rounded = Math.round(amount);
  if (countryId === 'in') return `${country.currency}${rounded.toLocaleString('en-IN')}`;
  return `${country.currency}${rounded.toLocaleString()}`;
}
