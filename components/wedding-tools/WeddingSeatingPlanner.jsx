'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { generateSeatingChartPDF } from '@/lib/worksheet-pdf';

// ─── DIETARY & GROUP CONSTANTS ──────────────────────────────────────
const DIETARY = {
  vegetarian: { label: 'Vegetarian', icon: '🌿', colorClass: 'text-green-600', bgClass: 'bg-green-50' },
  vegan: { label: 'Vegan', icon: '🌱', colorClass: 'text-emerald-700', bgClass: 'bg-emerald-50' },
  'gluten-free': { label: 'Gluten Free', icon: '🌾', colorClass: 'text-orange-500', bgClass: 'bg-orange-50' },
  'nut-allergy': { label: 'Nut Allergy', icon: '⚠️', colorClass: 'text-red-600', bgClass: 'bg-red-50' },
  'dairy-free': { label: 'Dairy Free', icon: '🥛', colorClass: 'text-blue-600', bgClass: 'bg-blue-50' },
  halal: { label: 'Halal', icon: '🍖', colorClass: 'text-purple-600', bgClass: 'bg-purple-50' },
  kosher: { label: 'Kosher', icon: '✡', colorClass: 'text-amber-700', bgClass: 'bg-amber-50' },
  other: { label: 'Other', icon: '📝', colorClass: 'text-gray-600', bgClass: 'bg-gray-50' },
};

const GROUPS = [
  'Bride\'s Family',
  'Groom\'s Family',
  'Bride\'s Friends',
  'Groom\'s Friends',
  'Colleagues',
  'Plus Ones',
  'Children',
  'Other',
];

const TABLE_SHAPES = { round: 'Round', rectangle: 'Long' };

let guestIdCounter = 1;
let tableIdCounter = 1;

const createGuest = (name, group = 'Other', dietary = [], isPlusOne = false, notes = '') => ({
  id: guestIdCounter++,
  name,
  group,
  dietary,
  isPlusOne,
  notes,
  tableId: null,
});

const createTable = (name, capacity = 8, shape = 'round') => ({
  id: tableIdCounter++,
  name,
  capacity,
  shape,
  x: 50 + Math.random() * 200,
  y: 50 + Math.random() * 200,
});

// ─── ICONS ──────────────────────────────────────
const Icon = ({ type, size = 16, color = 'currentColor' }) => {
  const icons = {
    plus: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M8 3v10M3 8h10" />
      </svg>
    ),
    trash: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 5h10M5.5 5V3.5a1 1 0 011-1h3a1 1 0 011 1V5M6.5 7.5v4M9.5 7.5v4M4.5 5l.5 8a1 1 0 001 1h4a1 1 0 001-1l.5-8" />
      </svg>
    ),
    edit: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      >
        <path d="M9.5 3.5l3 3M3 10.5V13.5h3l7-7-3-3-7 7z" />
      </svg>
    ),
    users: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <circle cx="6" cy="5" r="2.5" />
        <path d="M1 14c0-2.8 2.2-5 5-5s5 2.2 5 5" />
        <circle cx="11.5" cy="5.5" r="2" strokeWidth="1" />
        <path d="M15 14c0-2.2-1.6-4-3.5-4" strokeWidth="1" />
      </svg>
    ),
    download: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2v8.5M4.5 7.5L8 11l3.5-3.5M3 13h10" />
      </svg>
    ),
    x: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
    ),
    check: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8.5l3.5 3.5L13 4" />
      </svg>
    ),
    table: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      >
        <circle cx="8" cy="8" r="5.5" />
        <circle cx="8" cy="8" r="2" strokeDasharray="2 2" strokeWidth="1" />
      </svg>
    ),
  };
  return <span className="inline-flex items-center justify-center">{icons[type] || null}</span>;
};

// ─── MODAL ──────────────────────────────────────
function Modal({ open, onClose, title, children, width = 440 }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl p-0 w-[90%] max-h-[85vh] overflow-auto shadow-2xl"
        style={{ maxWidth: width }}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-heading text-base font-semibold text-text-primary">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="bg-none border-none cursor-pointer p-1 hover:opacity-70 transition-opacity"
          >
            <Icon type="x" size={16} color="var(--text-muted)" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── VISUAL TABLE (FLOOR PLAN) ──────────────────
function FloorTable({ table, guests, isSelected, onSelect, onDrag, planBounds }) {
  const seated = guests.filter((g) => g.tableId === table.id);
  const full = seated.length >= table.capacity;
  const overCapacity = seated.length > table.capacity;
  const dragRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleDown = (e) => {
    if (e.target.closest('[data-no-drag]')) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    offset.current = { x: clientX - table.x, y: clientY - table.y };
    setDragging(true);

    const handleMove = (ev) => {
      const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
      onDrag(table.id, cx - offset.current.x, cy - offset.current.y);
    };
    const handleUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
  };

  const isRound = table.shape === 'round';
  const w = isRound ? 130 : 170;
  const h = isRound ? 130 : 90;

  // Seat positions around the table
  const seatPositions = [];
  const count = table.capacity;
  if (isRound) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      seatPositions.push({
        x: w / 2 + (w / 2 + 8) * Math.cos(angle) - 8,
        y: h / 2 + (h / 2 + 8) * Math.sin(angle) - 8,
      });
    }
  } else {
    const perSide = Math.ceil(count / 2);
    for (let i = 0; i < perSide; i++) {
      seatPositions.push({
        x: 14 + (i / Math.max(perSide - 1, 1)) * (w - 28) - 8,
        y: -16,
      });
    }
    for (let i = 0; i < count - perSide; i++) {
      seatPositions.push({
        x: 14 + (i / Math.max(count - perSide - 1, 1)) * (w - 28) - 8,
        y: h,
      });
    }
  }

  const dietaryIcons = [...new Set(seated.flatMap((g) => g.dietary))].slice(0, 4);

  return (
    <div
      ref={dragRef}
      onMouseDown={handleDown}
      onTouchStart={handleDown}
      style={{
        position: 'absolute',
        left: table.x - w / 2,
        top: table.y - h / 2,
        width: w + 32,
        height: h + 40,
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        zIndex: isSelected ? 10 : dragging ? 10 : 1,
      }}
    >
      {/* Seats */}
      {seatPositions.map((pos, i) => {
        const occupied = i < seated.length;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: pos.x + 8,
              top: pos.y + 16,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: occupied ? '#a3885f' : '#f3f0e8',
              border: `1.5px solid ${occupied ? '#a3885f' : '#d4cec2'}`,
              transition: 'all 0.2s',
            }}
          />
        );
      })}

      {/* Table body */}
      <div
        data-no-drag
        onClick={() => onSelect(table.id)}
        style={{
          position: 'absolute',
          left: 16,
          top: 16,
          width: w,
          height: h,
          borderRadius: isRound ? '50%' : '12px',
          background: isSelected ? '#f0e8da' : overCapacity ? '#fdf0f0' : '#ffffff',
          border: `2px solid ${isSelected ? '#8b6f4e' : overCapacity ? '#b85c5c' : '#e5e0d5'}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: isSelected
            ? 'rgba(139,111,78,0.19) 0px 0px 0px 3px'
            : 'rgba(44,40,36,0.06) 0px 2px 8px',
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: isSelected ? '#8b6f4e' : '#2c2824',
            letterSpacing: '-0.01em',
            marginBottom: 2,
          }}
        >
          {table.name}
        </div>
        <div
          style={{
            fontSize: 10,
            color: overCapacity ? '#b85c5c' : full ? '#7a9a7a' : '#8a847a',
            fontWeight: 500,
          }}
        >
          {seated.length}/{table.capacity}
        </div>
        {dietaryIcons.length > 0 && (
          <div className="flex gap-px mt-0.5 text-[9px]">
            {dietaryIcons.map((d) => (
              <span key={d}>{DIETARY[d]?.icon}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── GUEST ROW ──────────────────────────────────
function GuestRow({
  guest,
  tables,
  onAssign,
  onRemove,
  onEdit,
  isAssigning,
  onStartAssign,
}) {
  const table = tables.find((t) => t.id === guest.tableId);
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 border-b border-border transition-colors ${
        isAssigning ? 'bg-amber-50' : ''
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-sm font-medium text-text-primary">
          {guest.isPlusOne && (
            <span className="text-[9px] bg-surface text-text-muted px-1.5 py-0.5 rounded font-semibold">
              +1
            </span>
          )}
          {guest.name}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-muted mt-0.5">
          <span>{guest.group}</span>
          {guest.dietary.length > 0 && (
            <span className="flex gap-0.5">
              {guest.dietary.map((d) => (
                <span key={d} title={DIETARY[d]?.label}>
                  {DIETARY[d]?.icon}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>

      {table ? (
        <button
          onClick={() => onAssign(guest.id, null)}
          className="text-xs px-2 py-1 rounded border border-border-hover bg-surface text-text-secondary cursor-pointer font-medium whitespace-nowrap hover:border-border transition-colors"
        >
          {table.name} ✕
        </button>
      ) : (
        <button
          onClick={() => onStartAssign(guest.id)}
          className={`text-xs px-2 py-1 rounded whitespace-nowrap font-semibold transition-colors ${
            isAssigning
              ? 'bg-accent text-white border border-accent'
              : 'text-accent border border-accent/40 bg-transparent hover:border-accent/60'
          }`}
        >
          {isAssigning ? 'Pick table →' : 'Assign'}
        </button>
      )}

      <button
        onClick={() => onEdit(guest)}
        className="bg-none border-none cursor-pointer p-0.5 opacity-50 hover:opacity-70 transition-opacity"
      >
        <Icon type="edit" size={13} color="var(--text-muted)" />
      </button>
      <button
        onClick={() => onRemove(guest.id)}
        className="bg-none border-none cursor-pointer p-0.5 opacity-40 hover:opacity-60 transition-opacity"
      >
        <Icon type="trash" size={13} color="#b85c5c" />
      </button>
    </div>
  );
}

// Old exportSeatingChart removed - now uses generateSeatingChartPDF from worksheet-pdf.js

// ═════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════
export default function WeddingSeatingPlanner() {
  const [guests, setGuests] = useState([]);
  const [tables, setTables] = useState([]);
  const [view, setView] = useState('guests'); // guests | floorplan
  const [assigningGuestId, setAssigningGuestId] = useState(null);
  const [coupleNames, setCoupleNames] = useState('');

  // Guest modal
  const [guestModal, setGuestModal] = useState(false);
  const [editGuest, setEditGuest] = useState(null);
  const [gName, setGName] = useState('');
  const [gGroup, setGGroup] = useState('Other');
  const [gDietary, setGDietary] = useState([]);
  const [gPlusOne, setGPlusOne] = useState(false);
  const [gNotes, setGNotes] = useState('');

  // Table modal
  const [tableModal, setTableModal] = useState(false);
  const [editTable, setEditTable] = useState(null);
  const [tName, setTName] = useState('');
  const [tCapacity, setTCapacity] = useState('8');
  const [tShape, setTShape] = useState('round');

  // Quick add
  const [quickAdd, setQuickAdd] = useState('');

  const floorRef = useRef(null);

  // Stats
  const stats = useMemo(() => {
    const total = guests.length;
    const assigned = guests.filter((g) => g.tableId).length;
    const unassigned = total - assigned;
    const dietary = guests.filter((g) => g.dietary.length > 0).length;
    const totalSeats = tables.reduce((s, t) => s + t.capacity, 0);
    return { total, assigned, unassigned, dietary, totalSeats };
  }, [guests, tables]);

  // Guest CRUD
  const openAddGuest = () => {
    setEditGuest(null);
    setGName('');
    setGGroup('Other');
    setGDietary([]);
    setGPlusOne(false);
    setGNotes('');
    setGuestModal(true);
  };
  const openEditGuest = (g) => {
    setEditGuest(g);
    setGName(g.name);
    setGGroup(g.group);
    setGDietary([...g.dietary]);
    setGPlusOne(g.isPlusOne);
    setGNotes(g.notes || '');
    setGuestModal(true);
  };
  const saveGuest = () => {
    if (!gName.trim()) return;
    if (editGuest) {
      setGuests((prev) =>
        prev.map((g) =>
          g.id === editGuest.id
            ? {
                ...g,
                name: gName.trim(),
                group: gGroup,
                dietary: gDietary,
                isPlusOne: gPlusOne,
                notes: gNotes,
              }
            : g
        )
      );
    } else {
      setGuests((prev) => [
        ...prev,
        createGuest(gName.trim(), gGroup, gDietary, gPlusOne, gNotes),
      ]);
    }
    setEditGuest(null);
    setGuestModal(false);
  };
  const removeGuest = (id) =>
    setGuests((prev) => prev.filter((g) => g.id !== id));

  const handleQuickAdd = (e) => {
    if (e.key === 'Enter' && quickAdd.trim()) {
      setGuests((prev) => [...prev, createGuest(quickAdd.trim())]);
      setQuickAdd('');
    }
  };

  // Table CRUD
  const openAddTable = () => {
    setEditTable(null);
    setTName(`Table ${tables.length + 1}`);
    setTCapacity('8');
    setTShape('round');
    setTableModal(true);
  };
  const openEditTable = (t) => {
    setEditTable(t);
    setTName(t.name);
    setTCapacity(String(t.capacity));
    setTShape(t.shape);
    setTableModal(true);
  };
  const saveTable = () => {
    if (!tName.trim()) return;
    const cap = Math.max(1, Math.min(20, parseInt(tCapacity) || 8));
    if (editTable) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === editTable.id
            ? { ...t, name: tName.trim(), capacity: cap, shape: tShape }
            : t
        )
      );
    } else {
      setTables((prev) => [
        ...prev,
        createTable(tName.trim(), cap, tShape),
      ]);
    }
    setTableModal(false);
  };
  const removeTable = (id) => {
    setGuests((prev) =>
      prev.map((g) => (g.tableId === id ? { ...g, tableId: null } : g))
    );
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  // Assignment
  const assignGuest = (guestId, tableId) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, tableId } : g))
    );
    setAssigningGuestId(null);
  };
  const handleTableSelect = (tableId) => {
    if (assigningGuestId) {
      assignGuest(assigningGuestId, tableId);
    }
  };

  // Drag tables
  const handleTableDrag = useCallback((tableId, x, y) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId ? { ...t, x: Math.max(80, x), y: Math.max(80, y) } : t
      )
    );
  }, []);

  // Form input styles
  const inputClasses =
    'w-full px-3 py-2 text-sm font-medium border border-border rounded-lg bg-white text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors';
  const labelClasses =
    'text-xs font-semibold text-text-muted uppercase tracking-widest block mb-1';

  const groupedGuests = useMemo(() => {
    const groups = {};
    guests.forEach((g) => {
      if (!groups[g.group]) groups[g.group] = [];
      groups[g.group].push(g);
    });
    return groups;
  }, [guests]);

  const unassignedGuests = useMemo(() => guests.filter((g) => !g.tableId), [
    guests,
  ]);

  return (
    <div className="bg-white text-text-primary border border-border rounded-[var(--radius-card)] overflow-hidden flex flex-col min-h-[600px]">

      {/* ═══ TOOLBAR ═══ */}
      <div className="border-b border-border bg-white px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Stats pills */}
          <div className="flex gap-2 text-xs font-semibold">
            <span className="bg-accent/10 text-accent px-2.5 py-1 rounded-full">
              {stats.total} guests
            </span>
            {stats.unassigned > 0 && (
              <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full">
                {stats.unassigned} unseated
              </span>
            )}
            <span className="bg-surface text-text-secondary px-2.5 py-1 rounded-full">
              {tables.length} tables · {stats.totalSeats} seats
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* View toggle */}
            <div className="flex rounded-[var(--radius-input)] border border-border overflow-hidden">
              {[
                ['guests', 'Guest List'],
                ['floorplan', 'Floor Plan'],
              ].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 text-xs font-semibold cursor-pointer border-none transition-all ${
                    view === v
                      ? 'bg-accent text-white'
                      : 'bg-white text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Export */}
            <button
              onClick={() => generateSeatingChartPDF({ tables, guests, coupleNames })}
              disabled={tables.length === 0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-input)] bg-accent text-white text-xs font-semibold cursor-pointer transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon type="download" size={14} color="white" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* ═══ COUPLE NAME BAR ═══ */}
      <div className="border-b border-border bg-surface px-6 py-3 flex items-center gap-3">
        <span className="text-xs text-text-muted font-medium whitespace-nowrap">
          Names on plan:
        </span>
        <input
          value={coupleNames}
          onChange={(e) => setCoupleNames(e.target.value)}
          placeholder="e.g. Sarah & James"
          className="flex-1 max-w-xs px-3 py-2 text-xs border border-border rounded-lg bg-white text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* ═══ SIDEBAR ═══ */}
        <div
          className={`${
            view === 'floorplan' ? 'w-80 border-r border-border' : 'w-full max-w-2xl mx-auto'
          } bg-white overflow-y-auto flex flex-col flex-shrink-0`}
        >
          {/* Quick add */}
          <div className="border-b border-border px-4 py-3 flex gap-2">
            <input
              value={quickAdd}
              onChange={(e) => setQuickAdd(e.target.value)}
              onKeyDown={handleQuickAdd}
              placeholder="Quick add guest + Enter"
              className={inputClasses}
            />
            <button
              onClick={openAddGuest}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-white cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
              title="Add with details"
            >
              <Icon type="plus" size={16} color="white" />
            </button>
          </div>

          {/* Action bar */}
          <div className="border-b border-border px-4 py-2.5 flex gap-2">
            <button
              onClick={openAddTable}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-text-secondary text-xs font-semibold cursor-pointer hover:bg-surface transition-colors"
            >
              <Icon type="table" size={13} color="var(--text-muted)" /> Add
              Table
            </button>
          </div>

          {/* Tables list (compact in sidebar) */}
          {tables.length > 0 && (
            <div className="border-b border-border">
              <div className="px-4 py-2 text-xs font-bold text-text-muted uppercase tracking-wider">
                Tables
              </div>
              {tables.map((t) => {
                const seated = guests.filter((g) => g.tableId === t.id);
                const full = seated.length >= t.capacity;
                return (
                  <div
                    key={t.id}
                    onClick={() => assigningGuestId && !full && handleTableSelect(t.id)}
                    className={`flex items-center gap-2 px-4 py-1.5 text-sm border-b border-border last:border-b-0 transition-colors ${
                      assigningGuestId && !full
                        ? 'cursor-pointer hover:bg-accent/5 hover:border-accent/20'
                        : ''
                    } ${assigningGuestId && full ? 'opacity-50' : ''}`}
                  >
                    <span
                      className={`w-2 h-2 flex-shrink-0 ${
                        t.shape === 'round' ? 'rounded-full' : 'rounded-sm'
                      } ${full ? 'bg-green-500' : 'bg-stone-300'}`}
                    />
                    <span className="flex-1 font-medium">{t.name}</span>
                    <span
                      className={`text-xs font-semibold ${full ? 'text-green-600' : 'text-text-muted'}`}
                    >
                      {seated.length}/{t.capacity}
                    </span>
                    {!assigningGuestId && (
                      <>
                        <button
                          onClick={() => openEditTable(t)}
                          className="bg-none border-none cursor-pointer p-1 opacity-40 hover:opacity-70 transition-opacity"
                        >
                          <Icon type="edit" size={11} color="var(--text-muted)" />
                        </button>
                        <button
                          onClick={() => removeTable(t.id)}
                          className="bg-none border-none cursor-pointer p-1 opacity-30 hover:opacity-60 transition-opacity"
                        >
                          <Icon type="trash" size={11} color="#b85c5c" />
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Guest list */}
          {guests.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="text-5xl mb-3">💐</div>
              <div className="font-heading text-xl font-semibold mb-2">
                Start your guest list
              </div>
              <div className="text-sm text-text-muted leading-relaxed">
                Type a name above and press Enter to quickly add guests, or use the + button
                for full details including dietary requirements.
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {assigningGuestId && (
                <div
                  className="sticky top-0 px-4 py-2 border-b border-amber-200 text-xs font-semibold flex items-center justify-between bg-amber-50 text-amber-700"
                >
                  <span>
                    Click a table {view === 'guests' ? 'above' : 'on the floor plan'} to seat{' '}
                    {guests.find((g) => g.id === assigningGuestId)?.name}
                  </span>
                  <button
                    onClick={() => setAssigningGuestId(null)}
                    className="text-xs font-semibold px-2 py-1 rounded hover:opacity-70 transition-opacity bg-transparent text-amber-700 border-none cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
              {/* Unassigned first */}
              {unassignedGuests.length > 0 && (
                <div>
                  <div
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-600"
                  >
                    Unseated ({unassignedGuests.length})
                  </div>
                  {unassignedGuests.map((g) => (
                    <GuestRow
                      key={g.id}
                      guest={g}
                      tables={tables}
                      onAssign={assignGuest}
                      onRemove={removeGuest}
                      onEdit={openEditGuest}
                      isAssigning={assigningGuestId === g.id}
                      onStartAssign={setAssigningGuestId}
                    />
                  ))}
                </div>
              )}
              {/* Assigned by table */}
              {tables.map((t) => {
                const seated = guests.filter((g) => g.tableId === t.id);
                if (seated.length === 0) return null;
                return (
                  <div key={t.id}>
                    <div
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-700"
                    >
                      {t.name} ({seated.length}/{t.capacity})
                    </div>
                    {seated.map((g) => (
                      <GuestRow
                        key={g.id}
                        guest={g}
                        tables={tables}
                        onAssign={assignGuest}
                        onRemove={removeGuest}
                        onEdit={openEditGuest}
                        isAssigning={assigningGuestId === g.id}
                        onStartAssign={setAssigningGuestId}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ═══ FLOOR PLAN ═══ */}
        {view === 'floorplan' && (
          <div
            ref={floorRef}
            className="flex-1 relative overflow-hidden bg-stone-100"
          >
            {/* Grid */}
            <svg
              width="100%"
              height="100%"
              className="absolute inset-0 opacity-30"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#d4cec2"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {tables.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-10 py-20">
                  <div className="text-5xl mb-3">🪑</div>
                  <div className="font-heading text-xl font-semibold mb-2">
                    No tables yet
                  </div>
                  <div className="text-sm text-text-muted mb-4">
                    Add tables from the sidebar to start arranging your layout
                  </div>
                  <button
                    onClick={openAddTable}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <Icon type="plus" size={14} color="white" /> Add First
                    Table
                  </button>
                </div>
              </div>
            ) : (
              tables.map((t) => (
                <FloorTable
                  key={t.id}
                  table={t}
                  guests={guests}
                  isSelected={false}
                  onSelect={handleTableSelect}
                  onDrag={handleTableDrag}
                />
              ))
            )}

            {/* Legend */}
            <div
              className="absolute bottom-4 left-4 bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs flex gap-3"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />{' '}
                Seated
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-200 border-[1.5px] border-stone-300" />{' '}
                Empty
              </span>
              <span className="text-text-muted">Drag tables to arrange</span>
            </div>

            {assigningGuestId && (
              <div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-amber-700 shadow-lg"
              >
                Click a table to seat {guests.find((g) => g.id === assigningGuestId)?.name}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ GUEST MODAL ═══ */}
      <Modal
        open={guestModal}
        onClose={() => {
          setEditGuest(null);
          setGuestModal(false);
        }}
        title={editGuest ? 'Edit Guest' : 'Add Guest'}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClasses}>Name</label>
            <input
              value={gName}
              onChange={(e) => setGName(e.target.value)}
              placeholder="Guest name"
              className={inputClasses}
              onKeyDown={(e) => e.key === 'Enter' && saveGuest()}
              autoFocus
            />
          </div>
          <div>
            <label className={labelClasses}>Group</label>
            <div className="flex flex-wrap gap-1.5">
              {GROUPS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGGroup(g)}
                  className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer border font-medium transition-colors ${
                    gGroup === g
                      ? 'bg-accent text-white border-accent'
                      : 'bg-surface text-text-secondary border-border hover:border-border-hover'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClasses}>Dietary Requirements</label>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(DIETARY).map(([k, v]) => {
                const on = gDietary.includes(k);
                return (
                  <button
                    key={k}
                    onClick={() =>
                      setGDietary((prev) =>
                        on ? prev.filter((d) => d !== k) : [...prev, k]
                      )
                    }
                    className={`px-2.5 py-1.5 text-xs rounded-lg cursor-pointer border font-medium transition-colors flex items-center gap-1 ${
                      on
                        ? `border-current ${DIETARY[k].colorClass} ${DIETARY[k].bgClass}`
                        : 'bg-surface border-border hover:border-border-hover text-text-muted'
                    }`}
                  >
                    <span className="text-sm">{v.icon}</span> {v.label}
                  </button>
                );
              })}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={gPlusOne}
              onChange={(e) => setGPlusOne(e.target.checked)}
            />{' '}
            This is a plus one
          </label>
          <div>
            <label className={labelClasses}>Notes (optional)</label>
            <textarea
              value={gNotes}
              onChange={(e) => setGNotes(e.target.value)}
              placeholder="e.g. Needs wheelchair access"
              rows={2}
              className={`${inputClasses} resize-vertical`}
            />
          </div>
          <div className="flex gap-2 justify-end pt-2 border-t border-border">
            <button
              onClick={() => {
                setEditGuest(null);
                setGuestModal(false);
              }}
              className="px-4 py-2 rounded-lg border border-border text-text-secondary text-xs font-semibold cursor-pointer hover:bg-surface transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveGuest}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Icon type="check" size={14} color="white" />{' '}
              {editGuest ? 'Save Changes' : 'Add Guest'}
            </button>
          </div>
        </div>
      </Modal>

      {/* ═══ TABLE MODAL ═══ */}
      <Modal
        open={tableModal}
        onClose={() => setTableModal(false)}
        title={editTable ? 'Edit Table' : 'Add Table'}
        width={380}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClasses}>Table Name</label>
            <input
              value={tName}
              onChange={(e) => setTName(e.target.value)}
              placeholder="e.g. Top Table"
              className={inputClasses}
              onKeyDown={(e) => e.key === 'Enter' && saveTable()}
              autoFocus
            />
          </div>
          <div>
            <label className={labelClasses}>Shape</label>
            <div className="flex gap-2">
              {Object.entries(TABLE_SHAPES).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setTShape(k)}
                  className={`flex-1 px-4 py-3 rounded-lg cursor-pointer text-center text-xs font-semibold border-2 transition-colors ${
                    tShape === k
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'bg-surface border-border hover:border-border-hover text-text-muted'
                  }`}
                >
                  <div className="text-2xl mb-1">
                    {k === 'round' ? '⬤' : '▬'}
                  </div>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClasses}>Seats</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setTCapacity(
                    String(Math.max(1, (parseInt(tCapacity) || 8) - 1))
                  )
                }
                className="px-3 py-2 rounded-lg border border-border text-text-secondary text-lg font-semibold cursor-pointer hover:bg-surface transition-colors"
              >
                −
              </button>
              <input
                type="number"
                value={tCapacity}
                onChange={(e) => setTCapacity(e.target.value)}
                className={`${inputClasses} w-20 text-center text-lg font-bold`}
              />
              <button
                onClick={() =>
                  setTCapacity(
                    String(Math.min(20, (parseInt(tCapacity) || 8) + 1))
                  )
                }
                className="px-3 py-2 rounded-lg border border-border text-text-secondary text-lg font-semibold cursor-pointer hover:bg-surface transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2 border-t border-border">
            {editTable && (
              <button
                onClick={() => {
                  removeTable(editTable.id);
                  setTableModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity border border-red-200"
              >
                Delete Table
              </button>
            )}
            <div className="flex-1" />
            <button
              onClick={() => setTableModal(false)}
              className="px-4 py-2 rounded-lg border border-border text-text-secondary text-xs font-semibold cursor-pointer hover:bg-surface transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveTable}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Icon type="check" size={14} color="white" />{' '}
              {editTable ? 'Save' : 'Add Table'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
