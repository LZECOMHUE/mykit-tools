'use client';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const MEAL_QUANTITIES = {
  'sit-down': {
    meat: 0.2,
    fish: 0.15,
    veg: 0.3,
    bread: 1.5,
    dessert: 0.15,
    canapes: 0,
  },
  buffet: {
    meat: 0.25,
    fish: 0.15,
    veg: 0.4,
    bread: 2,
    dessert: 0.2,
    canapes: 0,
  },
  canapes: {
    meat: 0,
    fish: 0,
    veg: 0,
    bread: 0,
    dessert: 0,
    canapes: 12,
  },
  bbq: {
    meat: 0.35,
    fish: 0.1,
    veg: 0.25,
    bread: 2.5,
    dessert: 0.15,
    canapes: 0,
  },
};

const DIETARY_DEFAULTS = {
  vegetarian: 10,
  vegan: 5,
  glutenFree: 3,
};

export default function WeddingCateringCalculator() {
  const [guests, setGuests] = useState(100);
  const [mealType, setMealType] = useState('sit-down');
  const [dietary, setDietary] = useState(DIETARY_DEFAULTS);

  const quantities = MEAL_QUANTITIES[mealType];
  const totalQuantities = {
    meat: guests * quantities.meat,
    fish: guests * quantities.fish,
    veg: guests * quantities.veg,
    bread: guests * quantities.bread,
    dessert: guests * quantities.dessert,
    canapes: guests * quantities.canapes,
  };

  // Calculate dietary adjustments
  const vegetarianGuests = Math.round(guests * (dietary.vegetarian / 100));
  const veganGuests = Math.round(guests * (dietary.vegan / 100));
  const glutenFreeGuests = Math.round(guests * (dietary.glutenFree / 100));

  const mealDescriptions = {
    'sit-down': 'Full 3-course sit-down meal',
    'buffet': 'Buffet-style service',
    'canapes': 'Canapes and cocktail reception (no main meal)',
    'bbq': 'BBQ with sides and salads',
  };

  return (
    <div className="space-y-4">
      {/* Configuration */}
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Number of Guests
            </label>
            <Input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Meal Type
            </label>
            <Select
              options={[
                { value: 'sit-down', label: 'Sit-down 3-course meal' },
                { value: 'buffet', label: 'Buffet service' },
                { value: 'canapes', label: 'Canapes and cocktails' },
                { value: 'bbq', label: 'BBQ' },
              ]}
              value={mealType}
              onChange={setMealType}
            />
          </div>

          <div className="bg-blue-50 rounded-[var(--radius-input)] p-3 border border-blue-100">
            <p className="text-sm text-text-primary font-medium mb-3">Dietary Requirements</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Vegetarian %</label>
                <Input
                  type="number"
                  value={dietary.vegetarian}
                  onChange={(e) =>
                    setDietary({
                      ...dietary,
                      vegetarian: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  min="0"
                  max="100"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Vegan %</label>
                <Input
                  type="number"
                  value={dietary.vegan}
                  onChange={(e) =>
                    setDietary({
                      ...dietary,
                      vegan: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  min="0"
                  max="100"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Gluten-Free %</label>
                <Input
                  type="number"
                  value={dietary.glutenFree}
                  onChange={(e) =>
                    setDietary({
                      ...dietary,
                      glutenFree: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  min="0"
                  max="100"
                  step="1"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Quantities */}
      {mealType !== 'canapes' && (
        <Card className="bg-green-50 border-green-100">
          <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
            Food Quantities (kg)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {quantities.meat > 0 && (
              <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
                <p className="text-text-secondary text-sm mb-1">Meat</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {totalQuantities.meat.toFixed(1)}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  {(totalQuantities.meat / guests).toFixed(2)} per person
                </p>
              </div>
            )}

            {quantities.fish > 0 && (
              <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
                <p className="text-text-secondary text-sm mb-1">Fish</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {totalQuantities.fish.toFixed(1)}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  {(totalQuantities.fish / guests).toFixed(2)} per person
                </p>
              </div>
            )}

            {quantities.veg > 0 && (
              <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
                <p className="text-text-secondary text-sm mb-1">Vegetables</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {totalQuantities.veg.toFixed(1)}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  {(totalQuantities.veg / guests).toFixed(2)} per person
                </p>
              </div>
            )}

            {quantities.bread > 0 && (
              <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
                <p className="text-text-secondary text-sm mb-1">Bread</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {Math.ceil(totalQuantities.bread)}
                </p>
                <p className="text-text-muted text-xs mt-1">rolls or slices</p>
              </div>
            )}

            {quantities.dessert > 0 && (
              <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
                <p className="text-text-secondary text-sm mb-1">Dessert Portions</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {Math.ceil(totalQuantities.dessert)}
                </p>
                <p className="text-text-muted text-xs mt-1">portions</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Canapes */}
      {mealType === 'canapes' && (
        <Card className="bg-amber-50 border-amber-100">
          <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
            Canape Quantities
          </h3>

          <div className="bg-white rounded-[var(--radius-input)] p-4 border border-border">
            <p className="text-text-secondary text-sm mb-2">Total Canapes</p>
            <p className="font-mono text-3xl font-semibold text-text-primary mb-2">
              {Math.ceil(totalQuantities.canapes)}
            </p>
            <p className="text-text-muted text-sm">
              Approximately {Math.ceil(totalQuantities.canapes / 12)} trays of 12
            </p>
          </div>

          <p className="text-text-secondary text-sm mt-4">
            Suggestion: Plan for 12-15 canapes per person for a cocktail reception lasting 2-3 hours
          </p>
        </Card>
      )}

      {/* Dietary Requirements Breakdown */}
      <Card>
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
          Dietary Breakdown
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-3 border border-border">
            <p className="text-text-secondary text-sm mb-2">Standard Diet</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {guests - vegetarianGuests - veganGuests}
            </p>
            <p className="text-text-muted text-xs">guests</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3 border border-border">
            <p className="text-text-secondary text-sm mb-2">Vegetarian</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {vegetarianGuests}
            </p>
            <p className="text-text-muted text-xs">guests ({dietary.vegetarian}%)</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3 border border-border">
            <p className="text-text-secondary text-sm mb-2">Vegan</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {veganGuests}
            </p>
            <p className="text-text-muted text-xs">guests ({dietary.vegan}%)</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3 border border-border">
            <p className="text-text-secondary text-sm mb-2">Gluten-Free</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {glutenFreeGuests}
            </p>
            <p className="text-text-muted text-xs">guests ({dietary.glutenFree}%)</p>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 rounded-[var(--radius-input)] p-3 border border-blue-100">
          <p className="text-sm text-text-primary">
            <span className="font-medium">Tip:</span> Always order extra portions for dietary
            requirements. Check all RSVPs before finalizing quantities with your caterer.
          </p>
        </div>
      </Card>

      {/* Shopping Checklist */}
      <Card>
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
          Shopping Reminder
        </h3>

        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Confirm dietary requirements with all guests on RSVP</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Order {Math.ceil(guests * 0.15)} extra portions for emergencies</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Plan for late arrivals and unexpected guests</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Keep a separate prep area for vegan and gluten-free items</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Discuss allergies directly with your catering team</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
