'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

const tasks = [
  { week: 8, category: 'Notifications', item: 'Give notice to current landlord/mortgage lender', days: 56 },
  { week: 8, category: 'Notifications', item: 'Notify council of address change', days: 56 },
  { week: 8, category: 'Utilities', item: 'Contact electricity, gas, water companies', days: 56 },
  { week: 8, category: 'Post', item: 'Arrange mail redirection with Royal Mail', days: 56 },
  { week: 8, category: 'Decluttering', item: 'Start sorting through belongings', days: 56 },
  { week: 4, category: 'Moving Company', item: 'Book removal company', days: 28 },
  { week: 4, category: 'Utilities', item: 'Get final meter readings', days: 28 },
  { week: 4, category: 'Post', item: 'Change address with banks and insurance', days: 28 },
  { week: 4, category: 'Post', item: 'Notify employer and HMRC of new address', days: 28 },
  { week: 4, category: 'Decluttering', item: 'Sell or donate unwanted items', days: 28 },
  { week: 2, category: 'Packing', item: 'Start packing non-essential items', days: 14 },
  { week: 2, category: 'Utilities', item: 'Arrange new utility connections', days: 14 },
  { week: 2, category: 'Medical', item: 'Update address with GP and dentist', days: 14 },
  { week: 2, category: 'Post', item: 'Update address with subscription services', days: 14 },
  { week: 1, category: 'Packing', item: 'Pack non-essential room by room', days: 7 },
  { week: 1, category: 'Cleaning', item: 'Deep clean current home', days: 7 },
  { week: 1, category: 'Utilities', item: 'Confirm moving company time slot', days: 7 },
  { week: 1, category: 'Post', item: 'Notify holiday plans if relocating', days: 7 },
  { week: 0, category: 'Moving Day', item: 'Final walkthrough of old property', days: 0 },
  { week: 0, category: 'Moving Day', item: 'Supervise loading of removals van', days: 0 },
  { week: 0, category: 'Moving Day', item: 'Check all rooms, closets, and storage', days: 0 },
  { week: 0, category: 'Moving Day', item: 'Lock all windows and doors', days: 0 },
  { week: 0, category: 'First Week', item: 'Unpack essentials box', days: -1 },
  { week: 0, category: 'First Week', item: 'Check all utilities are working', days: -1 },
  { week: 0, category: 'First Week', item: 'Update address on driving licence and passport', days: -1 },
  { week: 0, category: 'First Week', item: 'Register with local GP and dentist', days: -1 },
];

export default function MovingHouseChecklist() {
  const [movingDate, setMovingDate] = useState('');
  const [checked, setChecked] = useState({});

  const handleCheckChange = (key) => {
    setChecked(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const groupedTasks = {};
  if (movingDate) {
    const baseDate = new Date(movingDate);
    tasks.forEach(task => {
      const taskDate = new Date(baseDate);
      taskDate.setDate(taskDate.getDate() - task.days);

      if (!groupedTasks[task.category]) {
        groupedTasks[task.category] = [];
      }
      groupedTasks[task.category].push({
        ...task,
        dueDate: taskDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
      });
    });
  }

  const completedCount = Object.values(checked).filter(Boolean).length;
  const totalTasks = Object.keys(groupedTasks).reduce((sum, cat) => sum + (groupedTasks[cat]?.length || 0), 0);
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <label className="block text-text-secondary text-sm font-medium mb-2">
          When are you moving?
        </label>
        <Input
          type="date"
          value={movingDate}
          onChange={(e) => setMovingDate(e.target.value)}
          className="w-full max-w-xs"
        />
      </div>

      {movingDate && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-lg font-bold text-text-primary">Progress</h3>
              <span className="font-mono text-2xl font-bold text-accent">{progressPercent}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-text-muted text-sm mt-3">
              {completedCount} of {totalTasks} tasks completed
            </p>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-heading text-base font-bold text-text-primary">{category}</h3>
                <div className="space-y-2">
                  {categoryTasks.map((task, idx) => {
                    const key = `${category}-${idx}`;
                    return (
                      <div key={key} className="flex items-start gap-3 bg-white border border-border rounded-lg p-3">
                        <Checkbox
                          checked={checked[key] || false}
                          onChange={() => handleCheckChange(key)}
                          id={key}
                        />
                        <div className="flex-1">
                          <label htmlFor={key} className="block text-text-primary cursor-pointer">
                            {task.item}
                          </label>
                          <p className="text-text-muted text-xs mt-1">
                            Due: {task.dueDate}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
