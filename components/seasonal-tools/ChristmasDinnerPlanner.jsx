'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ChristmasDinnerPlanner() {
  const [guests, setGuests] = useState('6');
  const [veg, setVeg] = useState('0');
  const [vegan, setVegan] = useState('0');
  const [glutenFree, setGlutenFree] = useState('0');
  const [servingTime, setServingTime] = useState('13:00');
  const [plan, setPlan] = useState(null);

  const generatePlan = () => {
    const numGuests = parseInt(guests) || 6;
    const numVeg = parseInt(veg) || 0;
    const numVegan = parseInt(vegan) || 0;
    const numMeat = numGuests - numVeg - numVegan;

    const [hour, minute] = servingTime.split(':').map(Number);
    const serveTime = new Date();
    serveTime.setHours(hour, minute, 0);

    const timeline = [];
    const addTask = (hoursBeforeServe, mins, task) => {
      const taskTime = new Date(serveTime);
      taskTime.setHours(taskTime.getHours() - hoursBeforeServe, taskTime.getMinutes() - mins);
      timeline.push({
        time: taskTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        task,
      });
    };

    addTask(4, 0, 'Remove turkey from freezer to thaw (if frozen)');
    addTask(3.5, 0, 'Preheat oven to 180C');
    addTask(3, 0, 'Prepare vegetables: peel potatoes, parsnips, carrots');
    addTask(3, 0, 'Make stuffing');
    addTask(2.5, 0, `Season turkey, stuff cavity, place in roasting tin`);
    addTask(2.5, 0, 'Put turkey in oven');
    addTask(2, 0, 'Prepare sprouts and check turkey basting');
    addTask(1.5, 0, 'Prepare meat sauces and gravies');
    addTask(1, 0, 'Par-boil roasting vegetables');
    addTask(0.5, 0, 'Vegetables in oven with turkey');
    addTask(0.25, 0, 'Finish cranberry sauce and port gravy');
    addTask(0, 0, 'Remove turkey, rest for 20 mins');
    addTask(-0.25, 0, 'Carve and plate up');
    addTask(-0.5, 0, 'DINNER SERVED');

    const shoppingList = [
      { item: `Turkey (${Math.ceil(numGuests * 0.4)}kg)`, qty: 1, notes: 'Allow 400g per person' },
      { item: 'Potatoes', qty: Math.ceil(numGuests * 0.4), notes: 'kg for roasting' },
      { item: 'Parsnips', qty: Math.ceil(numGuests * 0.2), notes: 'kg' },
      { item: 'Brussels sprouts', qty: Math.ceil(numGuests * 0.25), notes: 'kg' },
      { item: 'Carrots', qty: Math.ceil(numGuests * 0.2), notes: 'kg' },
      { item: 'Olive oil', qty: 1, notes: 'litre' },
      { item: 'Butter', qty: Math.ceil(numGuests * 0.05), notes: 'kg' },
      { item: 'Stuffing ingredients', qty: 2, notes: 'Herb seasoning packets' },
      { item: 'Gravy granules', qty: 1, notes: 'box' },
      { item: 'Cranberry sauce', qty: 1, notes: 'jar' },
      { item: 'Bread sauce', qty: 1, notes: 'or make fresh' },
      { item: 'Vegetables - vegetarian mains', qty: numVeg, notes: numVeg > 0 ? `Mushroom Wellington (${numVeg})` : 'N/A' },
      { item: 'Vegan alternatives', qty: numVegan, notes: numVegan > 0 ? `Vegan Wellington or roasted vegetables (${numVegan})` : 'N/A' },
      { item: 'Gluten-free bread', qty: glutenFree > 0 ? 1 : 0, notes: glutenFree > 0 ? `For ${glutenFree} guests` : 'N/A' },
      { item: 'Wine', qty: Math.ceil(numGuests / 2), notes: 'bottles (red and white)' },
      { item: 'Dessert', qty: 2, notes: 'Christmas pudding and mince pies' },
    ];

    setPlan({
      timeline,
      shoppingList,
      servingTime: servingTime,
      numGuests,
      numVeg,
      numVegan,
      numMeat,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Number of Guests</label>
            <Input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="2"
              max="20"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Serving Time</label>
            <Input
              type="time"
              value={servingTime}
              onChange={(e) => setServingTime(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-text-secondary text-xs font-medium mb-3">Dietary Requirements</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-text-secondary text-xs mb-1">Vegetarian</label>
              <Input
                type="number"
                value={veg}
                onChange={(e) => setVeg(e.target.value)}
                min="0"
                className="w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-xs mb-1">Vegan</label>
              <Input
                type="number"
                value={vegan}
                onChange={(e) => setVegan(e.target.value)}
                min="0"
                className="w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-xs mb-1">Gluten-free</label>
              <Input
                type="number"
                value={glutenFree}
                onChange={(e) => setGlutenFree(e.target.value)}
                min="0"
                className="w-full text-sm"
              />
            </div>
          </div>
        </div>

        <Button onClick={generatePlan} className="bg-accent text-white w-full">
          Generate Plan
        </Button>
      </div>

      {plan && (
        <div className="space-y-6">
          <div className="bg-accent text-white border border-accent rounded-[var(--radius-card)] p-6">
            <p className="text-sm opacity-90">Dinner Service</p>
            <p className="font-mono text-3xl font-bold">{plan.servingTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="text-sm opacity-75 mt-2">{plan.numGuests} guests ({plan.numMeat} meat, {plan.numVeg} veg, {plan.numVegan} vegan)</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h3 className="font-heading text-base font-bold text-text-primary">Cooking Timeline</h3>
            <div className="space-y-2">
              {plan.timeline.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white border border-border rounded-lg p-3">
                  <span className="font-mono font-bold text-accent w-16 flex-shrink-0">{item.time}</span>
                  <span className="text-text-primary">{item.task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h3 className="font-heading text-base font-bold text-text-primary">Shopping List</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-text-secondary">Item</th>
                    <th className="text-right py-2 px-2 font-medium text-text-secondary">Qty</th>
                    <th className="text-left py-2 px-2 font-medium text-text-secondary">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.shoppingList.map((item, idx) => (
                    <tr key={idx} className="border-b border-border">
                      <td className="py-2 px-2 text-text-primary">{item.item}</td>
                      <td className="py-2 px-2 text-text-secondary text-right font-mono">{item.qty}</td>
                      <td className="py-2 px-2 text-text-muted text-sm">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
