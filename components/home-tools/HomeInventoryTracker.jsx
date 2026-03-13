'use client';

import { useState } from 'react';

export default function HomeInventoryTracker() {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Living Room', items: [] }
  ]);
  const [nextRoomId, setNextRoomId] = useState(2);
  const [nextItemId, setNextItemId] = useState(1);
  const [newRoom, setNewRoom] = useState('');

  const addRoom = () => {
    if (newRoom.trim()) {
      setRooms([...rooms, { id: nextRoomId, name: newRoom, items: [] }]);
      setNextRoomId(nextRoomId + 1);
      setNewRoom('');
    }
  };

  const removeRoom = (roomId) => {
    setRooms(rooms.filter(r => r.id !== roomId));
  };

  const addItem = (roomId, itemName, description, value) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          items: [
            ...room.items,
            {
              id: nextItemId,
              name: itemName,
              description,
              value: parseFloat(value) || 0,
              year: new Date().getFullYear()
            }
          ]
        };
      }
      return room;
    }));
    setNextItemId(nextItemId + 1);
  };

  const removeItem = (roomId, itemId) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          items: room.items.filter(item => item.id !== itemId)
        };
      }
      return room;
    }));
  };

  const totalValue = rooms.reduce(
    (sum, room) => sum + room.items.reduce((roomSum, item) => roomSum + item.value, 0),
    0
  );

  const totalItems = rooms.reduce((sum, room) => sum + room.items.length, 0);

  return (
    <div className="w-full space-y-6">
      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
          <div className="text-lg font-bold font-mono text-text-primary">
            {rooms.length}
          </div>
          <div className="text-[11px] text-text-muted mt-1">Rooms</div>
        </div>
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
          <div className="text-lg font-bold font-mono text-text-primary">
            {totalItems}
          </div>
          <div className="text-[11px] text-text-muted mt-1">Items</div>
        </div>
        <div className="rounded-[var(--radius-card)] bg-accent bg-opacity-10 border border-accent p-3 text-center">
          <div className="text-lg font-bold font-mono text-accent">
            £{totalValue.toFixed(2)}
          </div>
          <div className="text-[11px] text-text-muted mt-1">Total Value</div>
        </div>
      </div>

      {/* Add Room */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addRoom()}
          placeholder="Room name (e.g., Kitchen, Bedroom)"
          className="flex-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          onClick={addRoom}
          className="rounded-[var(--radius-card)] bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          Add Room
        </button>
      </div>

      {/* Rooms and Items */}
      <div className="space-y-6">
        {rooms.map(room => (
          <RoomSection
            key={room.id}
            room={room}
            onRemoveRoom={() => removeRoom(room.id)}
            onAddItem={(name, desc, value) => addItem(room.id, name, desc, value)}
            onRemoveItem={(itemId) => removeItem(room.id, itemId)}
          />
        ))}
      </div>

      {/* Insurance Note */}
      <div className="rounded-[var(--radius-card)] bg-blue-50 border border-accent p-4">
        <p className="text-text-secondary text-sm font-medium mb-2">
          For Insurance Purposes
        </p>
        <ul className="text-text-secondary text-[13px] space-y-1">
          <li>• Keep receipts and photos of valuable items</li>
          <li>• Update values annually to account for depreciation</li>
          <li>• Mark high-value items for special coverage</li>
          <li>• Export or print this list for your records</li>
        </ul>
      </div>
    </div>
  );
}

function RoomSection({ room, onRemoveRoom, onAddItem, onRemoveItem }) {
  const [showForm, setShowForm] = useState(false);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (itemName.trim() && value) {
      onAddItem(itemName, description, value);
      setItemName('');
      setDescription('');
      setValue('');
      setShowForm(false);
    }
  };

  const roomValue = room.items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-[var(--radius-card)] border border-border overflow-hidden">
      {/* Room Header */}
      <div className="bg-surface border-b border-border p-4 flex items-center justify-between">
        <div>
          <h3 className="text-text-primary font-medium">{room.name}</h3>
          <p className="text-text-secondary text-sm">
            {room.items.length} item{room.items.length !== 1 ? 's' : ''} - £{roomValue.toFixed(2)}
          </p>
        </div>
        <button
          onClick={onRemoveRoom}
          className="text-error hover:text-error-hover text-sm font-medium"
        >
          Remove
        </button>
      </div>

      {/* Items */}
      {room.items.length > 0 && (
        <div className="divide-y divide-border">
          {room.items.map(item => (
            <div key={item.id} className="p-3 flex items-start justify-between gap-2 bg-white">
              <div className="flex-1">
                <p className="text-text-primary font-medium text-sm">{item.name}</p>
                {item.description && (
                  <p className="text-text-secondary text-[12px] mt-1">{item.description}</p>
                )}
                <p className="text-text-muted text-[11px] mt-1">{item.year}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-mono text-text-primary font-bold">£{item.value.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-error hover:text-error-hover text-[11px] font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Item Form */}
      <div className="border-t border-border bg-surface p-3">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full rounded-[var(--radius-card)] border border-border bg-white px-3 py-2 text-sm text-text-primary hover:bg-surface transition-colors"
          >
            + Add Item
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item name"
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-2 py-1 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-2 py-1 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Value (GBP)"
              min="0"
              step="0.01"
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-2 py-1 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 rounded-[var(--radius-card)] bg-accent text-white px-3 py-1 text-sm font-medium hover:bg-accent-hover transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-[var(--radius-card)] bg-white border border-border text-text-primary px-3 py-1 text-sm font-medium hover:bg-surface transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
