'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const cleaningTasks = {
  kitchen: [
    'Wipe down counters and backsplash',
    'Clean stovetop',
    'Wipe cabinet fronts',
    'Sweep and mop floor',
    'Clean sink and taps',
    'Empty and wipe bins',
    'Clean inside microwave',
  ],
  bathroom: [
    'Scrub toilet',
    'Clean sink and mirrors',
    'Wipe down shower/bath',
    'Sweep and mop floor',
    'Empty bins',
    'Wipe taps and tiles',
    'Clean tiles and grout',
  ],
  bedroom: [
    'Change bed sheets',
    'Vacuum or sweep',
    'Dust surfaces',
    'Wipe mirrors and windows',
    'Tidy cupboards',
    'Vacuum under bed',
  ],
  living_room: [
    'Vacuum sofas and cushions',
    'Dust surfaces',
    'Wipe down TV and electronics',
    'Tidy books and magazines',
    'Vacuum floor',
    'Wipe windows',
  ],
  hallway: [
    'Vacuum or sweep',
    'Wipe mirrors and walls',
    'Dust shelves',
    'Mop floor',
    'Clean door handles',
  ],
  general: [
    'Dust surfaces',
    'Wipe down door handles',
    'Tidy clutter',
    'Empty bins',
    'Sweep/vacuum',
    'Wipe mirrors',
  ],
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function CleaningScheduleGenerator() {
  const [numRooms, setNumRooms] = useState('4');
  const [frequency, setFrequency] = useState('weekly');
  const [numPeople, setNumPeople] = useState('2');
  const [schedule, setSchedule] = useState(null);

  const generateSchedule = () => {
    const rooms = Math.min(parseInt(numRooms) || 4, 6);
    const people = Math.max(parseInt(numPeople) || 2, 1);
    const taskDays = frequency === 'daily' ? 7 : frequency === 'weekly' ? 7 : 14;

    const generatedSchedule = [];
    let taskIndex = 0;

    for (let day = 0; day < taskDays; day++) {
      const dayName = daysOfWeek[day % 7];
      const dayTasks = [];

      const roomsList = Object.keys(cleaningTasks).slice(0, rooms);

      roomsList.forEach((room) => {
        const person = (taskIndex % people) + 1;
        const roomTasks = cleaningTasks[room];
        const task = roomTasks[Math.floor(Math.random() * roomTasks.length)];
        dayTasks.push({ person, room: room.replace('_', ' '), task });
        taskIndex++;
      });

      generatedSchedule.push({ day, dayName, tasks: dayTasks });
    }

    setSchedule(generatedSchedule);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Number of Rooms/Areas
          </label>
          <Input
            type="number"
            value={numRooms}
            onChange={(e) => setNumRooms(e.target.value)}
            min="1"
            max="6"
            className="w-full max-w-xs"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Cleaning Frequency
          </label>
          <Select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full max-w-xs">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
          </Select>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Number of People
          </label>
          <Input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            min="1"
            className="w-full max-w-xs"
          />
        </div>

        <Button onClick={generateSchedule} className="bg-accent text-white">
          Generate Schedule
        </Button>
      </div>

      {schedule && (
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-text-primary">
            {frequency === 'daily' ? 'Daily' : frequency === 'weekly' ? 'Weekly' : 'Fortnightly'} Cleaning Rota
          </h3>
          <div className="space-y-4">
            {schedule.map((daySchedule) => (
              <div key={daySchedule.day} className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
                <h4 className="font-heading text-base font-bold text-text-primary mb-3">{daySchedule.dayName}</h4>
                <div className="space-y-2">
                  {daySchedule.tasks.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white border border-border rounded-lg p-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-mono font-bold text-sm">
                        {item.person}
                      </div>
                      <div>
                        <p className="text-text-primary font-medium">{item.task}</p>
                        <p className="text-text-muted text-sm">{item.room}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
