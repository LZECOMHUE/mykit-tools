'use client';

import { useState, useEffect } from 'react';

const superBowls = [
  {
    year: 2025,
    number: 'LIX',
    date: '2025-02-09',
    location: 'New Orleans, Louisiana',
    stadium: 'Caesars Superdome',
    teams: 'TBD',
  },
  {
    year: 2026,
    number: 'LX',
    date: '2026-02-01',
    location: 'Santa Clara, California',
    stadium: 'Levi Stadium',
    teams: 'TBD',
  },
  {
    year: 2027,
    number: 'LXI',
    date: '2027-02-07',
    location: 'Las Vegas, Nevada',
    stadium: 'Allegiant Stadium',
    teams: 'TBD',
  },
  {
    year: 2028,
    number: 'LXII',
    date: '2028-02-06',
    location: 'Indianapolis, Indiana',
    stadium: 'Lucas Oil Stadium',
    teams: 'TBD',
  },
];

const getTimeRemaining = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { isOver: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  return { days, hours, minutes, isOver: false };
};

export default function SuperBowlCountdown() {
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const updateCountdown = () => {
      const updated = {};
      superBowls.forEach((sb) => {
        updated[sb.date] = getTimeRemaining(sb.date);
      });
      setTimeRemaining(updated);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const upcomingBowls = superBowls.filter((sb) => !timeRemaining[sb.date]?.isOver);
  const nextBowl = upcomingBowls[0];

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Super Bowl Countdown
        </h2>
        <p className="text-text-secondary">
          Countdown to the NFL Championship Game
        </p>
      </div>

      {/* Next Super Bowl (Featured) */}
      {nextBowl && timeRemaining[nextBowl.date] && (
        <div className="bg-gradient-to-br from-red-600 to-blue-600 rounded-lg overflow-hidden shadow-lg">
          <div className="p-8 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm uppercase tracking-widest opacity-90 mb-2">
                  Next Super Bowl
                </div>
                <div className="text-5xl font-bold mb-2">Super Bowl {nextBowl.number}</div>
                <div className="text-2xl opacity-90">{nextBowl.year}</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-75 uppercase mb-2">Countdown</div>
                <div className="text-3xl font-mono font-bold">
                  {timeRemaining[nextBowl.date].days} days
                </div>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/10 rounded p-3 text-center">
                  <div className="text-4xl font-mono font-bold">
                    {timeRemaining[nextBowl.date].days}
                  </div>
                  <div className="text-sm opacity-75 mt-1">Days</div>
                </div>
                <div className="bg-white/10 rounded p-3 text-center">
                  <div className="text-4xl font-mono font-bold">
                    {timeRemaining[nextBowl.date].hours}
                  </div>
                  <div className="text-sm opacity-75 mt-1">Hours</div>
                </div>
                <div className="bg-white/10 rounded p-3 text-center">
                  <div className="text-4xl font-mono font-bold">
                    {timeRemaining[nextBowl.date].minutes}
                  </div>
                  <div className="text-sm opacity-75 mt-1">Minutes</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="opacity-75 mb-1">Date</div>
                  <div className="font-semibold">{formatDate(nextBowl.date)}</div>
                </div>
                <div>
                  <div className="opacity-75 mb-1">Location</div>
                  <div className="font-semibold">{nextBowl.location}</div>
                </div>
                <div>
                  <div className="opacity-75 mb-1">Stadium</div>
                  <div className="font-semibold">{nextBowl.stadium}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Super Bowls */}
      <div>
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Upcoming Super Bowls
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingBowls.slice(0, 4).map((sb) => {
            const time = timeRemaining[sb.date];

            return (
              <div
                key={sb.date}
                className="bg-white border border-border rounded-lg hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-text-primary text-lg">
                      Super Bowl {sb.number}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {formatDate(sb.date)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-accent">
                      {sb.year}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-text-secondary">
                  <div>
                    <span className="text-text-secondary">Location:</span>{' '}
                    <span className="font-medium text-text-primary">
                      {sb.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Stadium:</span>{' '}
                    <span className="font-medium text-text-primary">
                      {sb.stadium}
                    </span>
                  </div>
                </div>

                {time && !time.isOver && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs text-accent font-medium mb-2">
                      Time Remaining
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-accent/10 rounded p-2 text-center">
                        <div className="font-mono font-bold text-accent">
                          {time.days}
                        </div>
                        <div className="text-xs text-text-muted">Days</div>
                      </div>
                      <div className="bg-accent/10 rounded p-2 text-center">
                        <div className="font-mono font-bold text-accent">
                          {time.hours}
                        </div>
                        <div className="text-xs text-text-muted">Hours</div>
                      </div>
                      <div className="bg-accent/10 rounded p-2 text-center">
                        <div className="font-mono font-bold text-accent">
                          {time.minutes}
                        </div>
                        <div className="text-xs text-text-muted">Min</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Party Planning */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4">🎉 Super Bowl Party Planning</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-text-primary mb-3">Food & Drinks</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• Wings: 6-8 per person</li>
              <li>• Pizza: 1 slice per person + extra</li>
              <li>• Chips & dips: 1.5 oz per person</li>
              <li>• Appetizers: 5-7 pieces per person</li>
              <li>• Drinks: 2-3 per person for 4 hours</li>
              <li>• Desserts & snacks for the whole game</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-3">Party Setup</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• Test your TV and sound system</li>
              <li>• Clear seating for good sightlines</li>
              <li>• Have enough bathrooms stocked</li>
              <li>• Prep food ahead of time</li>
              <li>• Set up a drink station</li>
              <li>• Have toothpicks, napkins, trash bins ready</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">📺 Super Bowl Facts</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            • The Super Bowl is watched by over 100 million people annually in the U.S.
          </p>
          <p>
            • Super Bowl Sunday is the second-largest eating day in the U.S. after
            Thanksgiving
          </p>
          <p>
            • The average Super Bowl party has 17 people and costs $229 to host
          </p>
          <p>
            • Americans consume 1.4 billion chicken wings on Super Bowl Sunday
          </p>
          <p>
            • The halftime show is one of the most-watched live performances globally
          </p>
        </div>
      </div>

      {/* TV Viewing Info */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">📡 Where to Watch</h3>
        <div className="space-y-2 text-sm">
          <p className="text-text-secondary">
            The Super Bowl is broadcast on major networks. Check your local listings for:
          </p>
          <div className="grid md:grid-cols-2 gap-2 mt-3">
            <div className="bg-surface p-2 rounded">CBS, NBC, or FOX (free over-the-air)</div>
            <div className="bg-surface p-2 rounded">Paramount+, Peacock, Tubi (streaming)</div>
            <div className="bg-surface p-2 rounded">NFL+ (official NFL app)</div>
            <div className="bg-surface p-2 rounded">Local sports bars and restaurants</div>
          </div>
        </div>
      </div>
    </div>
  );
}
