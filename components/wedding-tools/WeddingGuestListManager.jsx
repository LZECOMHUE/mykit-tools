'use client';

import { useState, useMemo, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

export default function WeddingGuestListManager() {
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      side: 'bride',
      invitationType: 'day',
      rsvpStatus: 'accepted',
      hasPlus: false,
      dietary: 'none',
      dietaryNotes: '',
      tableNumber: 1,
    },
    {
      id: 2,
      name: 'Michael Smith',
      side: 'groom',
      invitationType: 'day',
      rsvpStatus: 'pending',
      hasPlus: true,
      dietary: 'vegetarian',
      dietaryNotes: '',
      tableNumber: 2,
    },
    {
      id: 3,
      name: 'Emily Chen',
      side: 'mutual',
      invitationType: 'evening',
      rsvpStatus: 'declined',
      hasPlus: false,
      dietary: 'vegan',
      dietaryNotes: 'Also no nuts',
      tableNumber: null,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterRsvp, setFilterRsvp] = useState('all');
  const [filterInvitation, setFilterInvitation] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    side: 'bride',
    invitationType: 'day',
    rsvpStatus: 'pending',
    hasPlus: false,
    dietary: 'none',
    dietaryNotes: '',
    tableNumber: null,
  });

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      side: 'bride',
      invitationType: 'day',
      rsvpStatus: 'pending',
      hasPlus: false,
      dietary: 'none',
      dietaryNotes: '',
      tableNumber: null,
    });
    setEditingId(null);
    setShowForm(false);
  }, []);

  // Add or update guest
  const handleSaveGuest = useCallback(() => {
    if (!formData.name.trim()) return;

    if (editingId) {
      setGuests(guests.map((g) => (g.id === editingId ? { ...formData, id: editingId } : g)));
    } else {
      const newId = Math.max(...guests.map((g) => g.id), 0) + 1;
      setGuests([...guests, { ...formData, id: newId }]);
    }
    resetForm();
  }, [formData, editingId, guests, resetForm]);

  // Edit guest
  const handleEditGuest = useCallback((guest) => {
    setFormData(guest);
    setEditingId(guest.id);
    setShowForm(true);
  }, []);

  // Delete guest
  const handleDeleteGuest = useCallback((id) => {
    setGuests(guests.filter((g) => g.id !== id));
  }, [guests]);

  // Filter and sort guests
  const filteredGuests = useMemo(() => {
    let filtered = guests;

    if (filterRsvp !== 'all') {
      filtered = filtered.filter((g) => g.rsvpStatus === filterRsvp);
    }

    if (filterInvitation !== 'all') {
      filtered = filtered.filter((g) => g.invitationType === filterInvitation);
    }

    // Sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'side') {
      const sideOrder = { bride: 0, groom: 1, mutual: 2 };
      filtered.sort((a, b) => sideOrder[a.side] - sideOrder[b.side]);
    } else if (sortBy === 'rsvp') {
      const rsvpOrder = { accepted: 0, pending: 1, no_response: 2, declined: 3 };
      filtered.sort((a, b) => rsvpOrder[a.rsvpStatus] - rsvpOrder[b.rsvpStatus]);
    }

    return filtered;
  }, [guests, filterRsvp, filterInvitation, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalInvited = guests.length;
    const accepted = guests.filter((g) => g.rsvpStatus === 'accepted').length;
    const declined = guests.filter((g) => g.rsvpStatus === 'declined').length;
    const pending = guests.filter((g) => g.rsvpStatus === 'pending').length;
    const plusOnes = guests.filter((g) => g.hasPlus && g.rsvpStatus === 'accepted').length;
    const dietary = {};
    guests.forEach((g) => {
      if (g.dietary !== 'none') {
        dietary[g.dietary] = (dietary[g.dietary] || 0) + 1;
      }
    });

    return { totalInvited, accepted, declined, pending, plusOnes, dietary };
  }, [guests]);

  const sideLabel = {
    bride: "Bride's Side",
    groom: "Groom's Side",
    mutual: 'Mutual',
  };

  const invitationLabel = {
    day: 'Day Invitation',
    evening: 'Evening Only',
    ceremony: 'Ceremony Only',
  };

  const rsvpColors = {
    accepted: 'bg-green-50 border-green-200',
    declined: 'bg-red-50 border-red-200',
    pending: 'bg-yellow-50 border-yellow-200',
    no_response: 'bg-gray-50 border-gray-200',
  };

  const rsvpTextColors = {
    accepted: 'text-green-700',
    declined: 'text-red-700',
    pending: 'text-yellow-700',
    no_response: 'text-gray-700',
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 py-8 px-4">
      {/* Title */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          Wedding Guest List Manager
        </h1>
        <p className="text-text-secondary mt-2">
          Track RSVPs, dietary requirements, and table assignments
        </p>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <Card className="text-center">
          <p className="text-xs text-text-secondary">Total Invited</p>
          <p className="font-mono-num text-2xl font-bold text-text-primary">
            {stats.totalInvited}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-text-secondary">Accepted</p>
          <p className="font-mono-num text-2xl font-bold text-green-700">
            {stats.accepted}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-text-secondary">Declined</p>
          <p className="font-mono-num text-2xl font-bold text-red-700">
            {stats.declined}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-text-secondary">Pending</p>
          <p className="font-mono-num text-2xl font-bold text-yellow-700">
            {stats.pending}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-text-secondary">Plus Ones</p>
          <p className="font-mono-num text-2xl font-bold text-accent">
            {stats.plusOnes}
          </p>
        </Card>
      </div>

      {/* Dietary Breakdown */}
      {Object.keys(stats.dietary).length > 0 && (
        <Card className="space-y-3">
          <h3 className="text-text-primary font-semibold">Dietary Requirements</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(stats.dietary).map(([diet, count]) => (
              <div key={diet} className="text-sm">
                <span className="text-text-secondary capitalize">{diet}:</span>
                <span className="font-mono-num font-bold text-text-primary ml-2">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add Guest Button */}
      <Button
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        variant="primary"
        className="w-full sm:w-auto"
      >
        + Add Guest
      </Button>

      {/* Guest Form */}
      {showForm && (
        <Card className="space-y-4 border-accent border-2">
          <div className="flex justify-between items-center">
            <h3 className="text-text-primary font-semibold">
              {editingId ? 'Edit Guest' : 'Add New Guest'}
            </h3>
            <button
              onClick={resetForm}
              className="text-text-muted hover:text-text-primary text-xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Guest name"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Side
                </label>
                <select
                  value={formData.side}
                  onChange={(e) =>
                    setFormData({ ...formData, side: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="bride">Bride's Side</option>
                  <option value="groom">Groom's Side</option>
                  <option value="mutual">Mutual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Invitation Type
                </label>
                <select
                  value={formData.invitationType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      invitationType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="day">Day Invitation</option>
                  <option value="evening">Evening Only</option>
                  <option value="ceremony">Ceremony Only</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  RSVP Status
                </label>
                <select
                  value={formData.rsvpStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, rsvpStatus: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                  <option value="no_response">No Response</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Table Number
                </label>
                <input
                  type="number"
                  value={formData.tableNumber || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tableNumber: e.target.value
                        ? Number(e.target.value)
                        : null,
                    })
                  }
                  placeholder="Optional"
                  className="w-full px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasPlus}
                onChange={(e) =>
                  setFormData({ ...formData, hasPlus: e.target.checked })
                }
                className="w-4 h-4 accent-accent rounded cursor-pointer"
              />
              <span className="text-text-primary font-medium">
                Has plus one
              </span>
            </label>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Dietary Requirements
              </label>
              <select
                value={formData.dietary}
                onChange={(e) =>
                  setFormData({ ...formData, dietary: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="none">None</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formData.dietary === 'other' && (
              <textarea
                value={formData.dietaryNotes}
                onChange={(e) =>
                  setFormData({ ...formData, dietaryNotes: e.target.value })
                }
                placeholder="Dietary notes"
                className="w-full px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                rows="2"
              />
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleSaveGuest}
                variant="primary"
                className="flex-1"
              >
                {editingId ? 'Update' : 'Add'} Guest
              </Button>
              <Button onClick={resetForm} variant="secondary" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Filters and Sort */}
      <div className="space-y-3">
        <h3 className="text-text-primary font-semibold">Filter & Sort</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              RSVP Status
            </label>
            <select
              value={filterRsvp}
              onChange={(e) => setFilterRsvp(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            >
              <option value="all">All</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
              <option value="pending">Pending</option>
              <option value="no_response">No Response</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Invitation Type
            </label>
            <select
              value={filterInvitation}
              onChange={(e) => setFilterInvitation(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            >
              <option value="all">All</option>
              <option value="day">Day</option>
              <option value="evening">Evening</option>
              <option value="ceremony">Ceremony</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            >
              <option value="name">Name</option>
              <option value="side">Side</option>
              <option value="rsvp">RSVP Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Guest List Table */}
      <div className="space-y-3">
        <h3 className="text-text-primary font-semibold">
          Guests ({filteredGuests.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-text-secondary font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-text-secondary font-semibold">
                  Side
                </th>
                <th className="px-4 py-3 text-left text-text-secondary font-semibold">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-text-secondary font-semibold">
                  RSVP
                </th>
                <th className="px-4 py-3 text-left text-text-secondary font-semibold">
                  Plus 1
                </th>
                <th className="px-4 py-3 text-left text-text-secondary font-semibold">
                  Dietary
                </th>
                <th className="px-4 py-3 text-left text-text-secondary font-semibold">
                  Table
                </th>
                <th className="px-4 py-3 text-right text-text-secondary font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest) => (
                <tr
                  key={guest.id}
                  className={`border-b border-border ${
                    rsvpColors[guest.rsvpStatus]
                  }`}
                >
                  <td className="px-4 py-3 text-text-primary font-medium">
                    {guest.name}
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs capitalize">
                    {sideLabel[guest.side]}
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs">
                    {invitationLabel[guest.invitationType]}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold capitalize ${
                        rsvpTextColors[guest.rsvpStatus]
                      }`}
                    >
                      {guest.rsvpStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {guest.hasPlus ? (
                      <span className="text-accent font-bold">✓</span>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs capitalize">
                    {guest.dietary !== 'none' ? guest.dietary : '-'}
                  </td>
                  <td className="px-4 py-3 text-text-primary font-mono-num">
                    {guest.tableNumber || '-'}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEditGuest(guest)}
                      className="text-accent hover:font-bold text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGuest(guest.id)}
                      className="text-error hover:font-bold text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGuests.length === 0 && (
          <Card className="text-center py-8">
            <p className="text-text-secondary">No guests match your filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}
