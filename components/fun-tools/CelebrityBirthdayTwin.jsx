'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

const celebrities = {
  '01-01': ['J.K. Rowling (1966, Author)', 'Denzel Washington (1954, Actor)', 'Pai (1996, Athlete)'],
  '01-02': ['Christy Turlington (1969, Model)', 'Cuba Gooding Jr. (1968, Actor)', 'Kate Bosworth (1983, Actress)'],
  '01-03': ['Mel Gibson (1956, Actor)', 'Michael Stipe (1960, Musician)', 'Anna Pavlova (1881, Ballerina)'],
  '01-04': ['Darius Rucker (1966, Musician)', 'Isaac Newton (1643, Scientist)', 'Tina Turner (1939, Singer)'],
  '01-05': ['Aquaman (Jason Momoa, 1979, Actor)', 'Marilyn Monroe (1926, Actress)', 'Ringo Starr (1940, Musician)'],
  '01-06': ['Sherlock Holmes (1854)', 'Henry VIII (1491)', 'Rowan Atkinson (1955, Actor)'],
  '01-07': ['Nicholas Cage (1964, Actor)', 'Katie Holmes (1978, Actress)', 'William Van Halen (1955, Musician)'],
  '01-08': ['David Bowie (1947, Musician)', 'Stephen Hawking (1942, Scientist)', 'Elvis (1935, Singer)'],
  '01-09': ['Michelle Obama (1964)', 'Susana Gimenez (1957, Actress)', 'Uta Hagen (1919, Actress)'],
  '01-10': ['Donald Trump (1946)', 'Pat Benatar (1953, Singer)', 'Ray Bolger (1904, Actor)'],
  '01-15': ['Martin Luther King Jr. (1929)', 'Chris Pratt (1979, Actor)', 'Michelle Obama (1964)'],
  '01-20': ['David Lynch (1946, Director)', 'Buzz Aldrin (1930, Astronaut)', 'Paul Stanley (1952, Musician)'],
  '02-14': ['Michael Bay (1965, Director)', 'Valentine Holmes (1996, Athlete)', 'Simon Pegg (1973, Actor)'],
  '03-17': ['Rob Lowe (1964, Actor)', 'Kurt Russell (1951, Actor)', 'Patrick Duffy (1949, Actor)'],
  '04-18': ['Amy Smart (1976, Actress)', 'David Tennant (1971, Actor)', 'Hayden Christensen (1981, Actor)'],
  '05-05': ['Chris Evans (1981, Actor)', 'David Blaine (1973, Magician)', 'Adele (1988, Singer)'],
  '06-20': ['Lionel Messi (1987, Athlete)', 'Nicole Kidman (1967, Actress)', 'Errol Flynn (1909, Actor)'],
  '07-04': ['Megan Fox (1986, Actress)', 'Bill Independence (1737)', 'Geraldo Rivera (1943, Broadcaster)'],
  '08-15': ['Jennifer Aniston (1969, Actress)', 'Ben Affleck (1972, Actor)', 'Napoleon (1769)'],
  '09-09': ['Beyonce (1981, Singer)', 'Michelle Williams (1980, Actress)', 'Otis Redding (1941, Singer)'],
  '10-09': ['John Lennon (1940, Musician)', 'Bella Thorne (1997, Actress)', 'Josh Duhamel (1977, Actor)'],
  '10-31': ['Scarlett Johansson (1984, Actress)', 'Vanilla Ice (1956, Rapper)', 'Halloween!'],
  '11-11': ['Leonardo DiCaprio (1974, Actor)', 'Conan O\'Brien (1963, TV Host)', 'Armistice Day'],
  '12-05': ['Brittany Snow (1986, Actress)', 'Walt Disney (1901, Animator)', 'Christina Aguilera (1980, Singer)'],
  '12-25': ['Humphrey Bogart (1899, Actor)', 'Isaac Newton (1643, Scientist)', 'Christmas!'],
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CelebrityBirthdayTwin() {
  const [month, setMonth] = useState('01');
  const [day, setDay] = useState('01');
  const [matches, setMatches] = useState(null);

  const getDaysInMonth = (m) => {
    const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[parseInt(m) - 1];
  };

  const findMatches = () => {
    const key = `${month}-${day.padStart(2, '0')}`;
    const result = celebrities[key] || [
      'No celebrity matches found for this date.',
      'Try a different date to find your celebrity twin!'
    ];
    setMatches(result);
  };

  const monthNum = parseInt(month);
  const dayNum = parseInt(day);
  const maxDays = getDaysInMonth(month);

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full border border-border rounded-lg p-2 text-text-primary"
            >
              {months.map((m, idx) => (
                <option key={m} value={String(idx + 1).padStart(2, '0')}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full border border-border rounded-lg p-2 text-text-primary"
            >
              {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
                <option key={d} value={String(d).padStart(2, '0')}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button onClick={findMatches} className="bg-accent text-white w-full">
          Find My Celebrity Birthday Twin
        </Button>
      </div>

      {matches && (
        <div className="bg-accent text-white border border-accent rounded-[var(--radius-card)] p-8 space-y-4">
          <div>
            <p className="text-sm opacity-90 mb-2">Your Birthday Twin:</p>
            <p className="font-heading text-3xl font-bold">
              {months[monthNum - 1]} {dayNum}
            </p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-2">
            {matches.map((match, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 rounded-lg p-3">
                <p className="text-lg">{match}</p>
              </div>
            ))}
          </div>

          <Button onClick={() => setMatches(null)} variant="secondary" className="bg-white text-accent w-full mt-4">
            Find Another Date
          </Button>
        </div>
      )}
    </div>
  );
}
