'use client';

import { useState, useEffect } from 'react';

const elections = [
  {
    name: '2026 Midterm Elections',
    date: '2026-11-03',
    type: 'Midterm',
    description: 'U.S. House of Representatives and 1/3 of Senate seats',
    importance: 'Major',
  },
  {
    name: '2028 Presidential Election',
    date: '2028-11-07',
    type: 'Presidential',
    description: 'Presidential and Vice-Presidential election',
    importance: 'Major',
  },
  {
    name: '2030 Midterm Elections',
    date: '2030-11-05',
    type: 'Midterm',
    description: 'U.S. House of Representatives and 1/3 of Senate seats',
    importance: 'Major',
  },
  {
    name: 'Iowa Caucuses 2028',
    date: '2028-01-15',
    type: 'Primary',
    description: 'First major contest for 2028 Presidential primary',
    importance: 'Primary',
  },
  {
    name: 'New Hampshire Primary 2028',
    date: '2028-01-24',
    type: 'Primary',
    description: 'Second major primary contest',
    importance: 'Primary',
  },
  {
    name: 'Super Tuesday 2028',
    date: '2028-03-05',
    type: 'Primary',
    description: 'Multiple large states hold primaries',
    importance: 'Primary',
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

export default function USElectionCountdown() {
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const updateCountdown = () => {
      const updated = {};
      elections.forEach((election) => {
        updated[election.date] = getTimeRemaining(election.date);
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'Presidential':
        return 'from-blue-500 to-blue-600';
      case 'Midterm':
        return 'from-purple-500 to-purple-600';
      case 'Primary':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const upcomingElections = elections.filter((e) => !timeRemaining[e.date]?.isOver);

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          U.S. Election Dates
        </h2>
        <p className="text-text-secondary">
          Countdown to upcoming U.S. elections and primaries
        </p>
      </div>

      {/* Elections List */}
      <div className="space-y-4">
        {upcomingElections.map((election) => {
          const time = timeRemaining[election.date];

          return (
            <div
              key={election.date}
              className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div
                className={`bg-gradient-to-r ${getTypeColor(
                  election.type
                )} text-white px-6 py-4 flex justify-between items-start`}
              >
                <div>
                  <div className="font-semibold text-lg">{election.name}</div>
                  <div className="text-sm opacity-90">{formatDate(election.date)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-75 uppercase tracking-wide">
                    {election.type}
                  </div>
                  <div className="text-sm opacity-75">{election.importance}</div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-text-secondary mb-4">{election.description}</p>

                {time && !time.isOver && (
                  <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                    <div className="text-sm text-accent font-medium mb-3">
                      Time Remaining
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white rounded p-3 text-center border border-accent/20">
                        <div className="text-3xl font-mono font-bold text-accent">
                          {time.days}
                        </div>
                        <div className="text-xs text-text-secondary mt-1">
                          {time.days === 1 ? 'Day' : 'Days'}
                        </div>
                      </div>
                      <div className="bg-white rounded p-3 text-center border border-accent/20">
                        <div className="text-3xl font-mono font-bold text-accent">
                          {time.hours}
                        </div>
                        <div className="text-xs text-text-secondary mt-1">Hours</div>
                      </div>
                      <div className="bg-white rounded p-3 text-center border border-accent/20">
                        <div className="text-3xl font-mono font-bold text-accent">
                          {time.minutes}
                        </div>
                        <div className="text-xs text-text-secondary mt-1">Minutes</div>
                      </div>
                    </div>
                  </div>
                )}

                {time?.isOver && (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200 text-red-700">
                    This election has already taken place.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Election Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">📋 Election Information</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <strong>Midterm Elections</strong> - Held every 2 years, all House seats (435) and 1/3 of Senate seats (34) are up for election
          </p>
          <p>
            <strong>Presidential Elections</strong> - Held every 4 years, President and Vice-President elected
          </p>
          <p>
            <strong>Primaries</strong> - State contests where each party selects delegates for presidential nominations
          </p>
          <p>
            <strong>Voting</strong> - U.S. citizens 18+ can vote. Register before your state deadline.
          </p>
        </div>
      </div>

      {/* Voter Registration */}
      <div className="bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-3">✓ Voter Registration</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>• Register to vote at vote411.org or your state election office</li>
          <li>• Deadlines vary by state - often 15-30 days before election</li>
          <li>• You'll need proof of citizenship and a valid ID</li>
          <li>• Voter registration is free</li>
          <li>• You can update your registration if you move</li>
        </ul>
      </div>

      {/* Voting Methods */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">🗳️ Voting Methods</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white border border-border rounded p-4">
            <div className="font-medium text-text-primary mb-2">In-Person on Election Day</div>
            <p className="text-text-secondary text-xs">
              Vote at your designated polling location on Election Day, typically the first Tuesday in November
            </p>
          </div>
          <div className="bg-white border border-border rounded p-4">
            <div className="font-medium text-text-primary mb-2">Early In-Person Voting</div>
            <p className="text-text-secondary text-xs">
              Many states allow early voting 1-2 weeks before Election Day at designated locations
            </p>
          </div>
          <div className="bg-white border border-border rounded p-4">
            <div className="font-medium text-text-primary mb-2">Mail-in / Absentee Ballot</div>
            <p className="text-text-secondary text-xs">
              Request an absentee ballot from your state election office - timing requirements vary by state
            </p>
          </div>
        </div>
      </div>

      {/* State Election Resources */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">
          Find Your Polling Location
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          Visit these sites to find your voter registration status, polling location, and ballot information:
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-surface rounded">
            • vote411.org - Comprehensive voting information by state
          </div>
          <div className="p-2 bg-surface rounded">
            • ballotpedia.org - Full ballot information and measures
          </div>
          <div className="p-2 bg-surface rounded">
            • Your state election office website
          </div>
        </div>
      </div>
    </div>
  );
}
