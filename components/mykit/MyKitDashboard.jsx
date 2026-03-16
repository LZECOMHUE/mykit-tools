'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useMyKit } from '@/lib/mykit-context';
import { useAuth } from '@/lib/mock-auth';
import { getToolBySlug } from '@/lib/tool-registry';
import { categories } from '@/lib/categories';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

// Shared drag state via ref (survives across renders without causing re-renders during drag)
const dragRef = { current: null };

function DragHandle() {
  return (
    <svg width="12" height="18" viewBox="0 0 12 18" fill="currentColor" className="text-text-muted">
      <circle cx="3" cy="3" r="1.5" />
      <circle cx="9" cy="3" r="1.5" />
      <circle cx="3" cy="9" r="1.5" />
      <circle cx="9" cy="9" r="1.5" />
      <circle cx="3" cy="15" r="1.5" />
      <circle cx="9" cy="15" r="1.5" />
    </svg>
  );
}

function DraggableToolCard({ slug, folderId, index, onRemove, onReorder, onMoveToFolder }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const tool = getToolBySlug(slug);
  if (!tool) return null;
  const cat = categories.find(c => c.slug === tool.category);

  const handleDragStart = (e) => {
    dragRef.current = { type: 'tool', slug, folderId, index };
    e.dataTransfer.effectAllowed = 'move';
    // Required for Firefox
    e.dataTransfer.setData('text/plain', slug);
    // Add a slight delay to let the browser create the drag image
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    dragRef.current = null;
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragRef.current?.type === 'tool' && dragRef.current.slug !== slug) {
      e.dataTransfer.dropEffect = 'move';
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const drag = dragRef.current;
    if (!drag || drag.type !== 'tool') return;

    if (drag.folderId === folderId) {
      // Reorder within same folder
      onReorder(folderId, drag.slug, index);
    } else {
      // Move to this folder
      onMoveToFolder(drag.slug, drag.folderId, folderId);
    }
    dragRef.current = null;
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group flex items-center gap-2 bg-white border rounded-lg p-3 transition-all cursor-grab active:cursor-grabbing select-none ${
        isDragOver ? 'border-accent shadow-md ring-2 ring-blue-100' : 'border-border hover:border-blue-200 hover:shadow-sm'
      }`}
    >
      <div className="flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity">
        <DragHandle />
      </div>
      <Link
        href={`/${slug}`}
        className="flex-1 min-w-0"
        draggable={false}
        onClick={(e) => {
          // Only navigate if not dragging
          if (dragRef.current) e.preventDefault();
        }}
      >
        <p className="text-sm font-medium text-text-primary truncate">{tool.name}</p>
        <p className="text-xs text-text-muted truncate">{cat?.icon} {cat?.name}</p>
      </Link>
      {onRemove && (
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(slug); }}
          className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-error text-xs transition-opacity cursor-pointer flex-shrink-0"
          title="Remove"
          draggable={false}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
}

function StaticToolCard({ slug }) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;
  const cat = categories.find(c => c.slug === tool.category);

  return (
    <Link href={`/${slug}`} className="group flex items-center gap-3 bg-white border border-border rounded-lg p-3 hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{tool.name}</p>
        <p className="text-xs text-text-muted truncate">{cat?.icon} {cat?.name}</p>
      </div>
    </Link>
  );
}

function FolderSection({ folder, onRemoveTool, onRenameFolder, onDeleteFolder, onMoveTool, onReorderTools, folderIndex, onReorderFolders, totalFolders }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(folder.name);
  const [isFolderDragOver, setIsFolderDragOver] = useState(false);

  const handleRename = () => {
    if (editName.trim() && editName !== folder.name) {
      onRenameFolder(folder.id, editName.trim());
    }
    setIsEditing(false);
  };

  const isFavourites = folder.id === 'favourites';

  const handleReorder = (folderId, draggedSlug, targetIndex) => {
    const newSlugs = [...folder.slugs];
    const fromIdx = newSlugs.indexOf(draggedSlug);
    if (fromIdx !== -1) {
      newSlugs.splice(fromIdx, 1);
      newSlugs.splice(targetIndex, 0, draggedSlug);
      onReorderTools(folderId, newSlugs);
    }
  };

  // Folder-level drop zone for receiving tools from other folders
  const handleFolderDragOver = (e) => {
    e.preventDefault();
    const drag = dragRef.current;
    if (drag?.type === 'tool' && drag.folderId !== folder.id) {
      e.dataTransfer.dropEffect = 'move';
      setIsFolderDragOver(true);
    }
    if (drag?.type === 'folder' && drag.folderIndex !== folderIndex) {
      e.dataTransfer.dropEffect = 'move';
      setIsFolderDragOver(true);
    }
  };

  const handleFolderDragLeave = (e) => {
    // Only clear if leaving the folder entirely (not entering a child)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFolderDragOver(false);
    }
  };

  const handleFolderDrop = (e) => {
    e.preventDefault();
    setIsFolderDragOver(false);

    const drag = dragRef.current;
    if (!drag) return;

    if (drag.type === 'tool' && drag.folderId !== folder.id) {
      onMoveTool(drag.slug, drag.folderId, folder.id);
      dragRef.current = null;
    }
    if (drag.type === 'folder' && drag.folderIndex !== folderIndex) {
      onReorderFolders(drag.folderIndex, folderIndex);
      dragRef.current = null;
    }
  };

  // Folder dragging (for reordering folders)
  const handleFolderHeaderDragStart = (e) => {
    e.stopPropagation();
    dragRef.current = { type: 'folder', folderId: folder.id, folderIndex };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', folder.id);
  };

  const handleFolderHeaderDragEnd = () => {
    dragRef.current = null;
    setIsFolderDragOver(false);
  };

  return (
    <div
      onDragOver={handleFolderDragOver}
      onDragLeave={handleFolderDragLeave}
      onDrop={handleFolderDrop}
      className={`border rounded-[12px] p-5 transition-all ${
        isFolderDragOver
          ? 'bg-blue-50 border-accent ring-2 ring-blue-100'
          : 'bg-surface border-border'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {!isFavourites && (
            <div
              draggable
              onDragStart={handleFolderHeaderDragStart}
              onDragEnd={handleFolderHeaderDragEnd}
              className="cursor-grab active:cursor-grabbing opacity-30 hover:opacity-70 transition-opacity"
            >
              <DragHandle />
            </div>
          )}
          <span className="text-lg">{isFavourites ? '\u2B50' : '\uD83D\uDCC1'}</span>
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setIsEditing(false); }}
              onBlur={handleRename}
              autoFocus
              className="text-base font-bold text-text-primary bg-white border border-border rounded px-2 py-1"
            />
          ) : (
            <h3 className="text-base font-bold text-text-primary">{folder.name}</h3>
          )}
          <span className="text-xs text-text-muted font-mono">({folder.slugs.length})</span>
        </div>
        <div className="flex items-center gap-1">
          {!isFavourites && (
            <>
              <button
                onClick={() => { setEditName(folder.name); setIsEditing(true); }}
                className="text-text-muted hover:text-text-secondary text-xs px-2 py-1 rounded hover:bg-white transition-colors cursor-pointer"
              >
                Rename
              </button>
              <button
                onClick={() => onDeleteFolder(folder.id)}
                className="text-text-muted hover:text-error text-xs px-2 py-1 rounded hover:bg-white transition-colors cursor-pointer"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {folder.slugs.length === 0 ? (
        <div className="text-sm text-text-muted py-8 text-center border-2 border-dashed border-border rounded-lg">
          {isFavourites ? 'Click the bookmark icon on any tool, or drag tools here' : 'Drag tools here or add from the search below'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {folder.slugs.map((slug, idx) => (
            <DraggableToolCard
              key={slug}
              slug={slug}
              folderId={folder.id}
              index={idx}
              onRemove={(s) => onRemoveTool(s, folder.id)}
              onReorder={handleReorder}
              onMoveToFolder={onMoveTool}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RecentSection({ recent }) {
  return (
    <div className="bg-surface border border-border rounded-[12px] p-5">
      <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
        <span className="text-lg">{'\uD83D\uDD52'}</span> Recently Used
      </h3>
      {recent.length === 0 ? (
        <p className="text-sm text-text-muted py-4 text-center">Tools you use will appear here</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {recent.slice(0, 12).map(r => (
            <StaticToolCard key={r.slug} slug={r.slug} />
          ))}
        </div>
      )}
    </div>
  );
}

function PurchasesSection({ purchases }) {
  return (
    <div className="bg-surface border border-border rounded-[12px] p-5">
      <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
        <span className="text-lg">{'\uD83D\uDCE6'}</span> Purchases
      </h3>
      {purchases.length === 0 ? (
        <p className="text-sm text-text-muted py-4 text-center">Premium downloads you purchase will appear here</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {purchases.map(slug => (
            <StaticToolCard key={slug} slug={slug} />
          ))}
        </div>
      )}
    </div>
  );
}

function SavedProjectsSection({ savedProjects, onDelete }) {
  return (
    <div className="bg-surface border border-border rounded-[12px] p-5">
      <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
        <span className="text-lg">{'\uD83D\uDCBE'}</span> Saved Projects
      </h3>
      {savedProjects.length === 0 ? (
        <p className="text-sm text-text-muted py-4 text-center">Projects you save from tools will appear here</p>
      ) : (
        <div className="space-y-2">
          {savedProjects.map(project => {
            const tool = getToolBySlug(project.toolSlug);
            return (
              <div key={project.id} className="group flex items-center gap-3 bg-white border border-border rounded-lg p-3 hover:border-blue-200 transition-all">
                <Link href={`/${project.toolSlug}`} className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{project.name}</p>
                  <p className="text-xs text-text-muted">
                    {tool?.name} - saved {new Date(project.timestamp).toLocaleDateString('en-GB')}
                  </p>
                </Link>
                <button
                  onClick={() => onDelete(project.id)}
                  className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-error text-xs transition-opacity cursor-pointer"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AddToolSearch({ onAdd }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    const { tools } = require('@/lib/tool-registry');
    const q = value.toLowerCase();
    const matches = tools
      .filter(t => t.name.toLowerCase().includes(q) || t.tags?.some(tag => tag.includes(q)) || t.category?.includes(q))
      .slice(0, 8);
    setResults(matches);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search tools to add to your kit..."
        className="w-full"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
          {results.map(tool => {
            const cat = categories.find(c => c.slug === tool.category);
            return (
              <button
                key={tool.slug}
                onClick={() => { onAdd(tool.slug); setQuery(''); setResults([]); }}
                className="w-full text-left px-4 py-3 hover:bg-surface transition-colors border-b border-border last:border-0 cursor-pointer"
              >
                <p className="text-sm font-medium text-text-primary">{tool.name}</p>
                <p className="text-xs text-text-muted">{cat?.icon} {cat?.name}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MyKitDashboard() {
  const auth = useAuth();
  const mykit = useMyKit();
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [activeTab, setActiveTab] = useState('tools');

  if (!auth.isSignedIn) {
    return (
      <div className="bg-surface border border-border rounded-[12px] p-12 text-center">
        <p className="text-4xl mb-4">{'\uD83D\uDEE0\uFE0F'}</p>
        <h2 className="font-heading text-xl font-bold text-text-primary mb-2">Sign in to access MyKit</h2>
        <p className="text-sm text-text-secondary mb-6">
          Save your favourite tools, track purchases, and pick up where you left off.
        </p>
        <button
          onClick={auth.signIn}
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-[8px] transition-colors cursor-pointer"
        >
          Sign in to get started
        </button>
      </div>
    );
  }

  if (!mykit.loaded) {
    return <div className="text-center py-12 text-text-muted">Loading your kit...</div>;
  }

  const tabs = [
    { id: 'tools', label: 'My Tools', count: mykit.bookmarked.length },
    { id: 'recent', label: 'Recent', count: mykit.recent.length },
    { id: 'purchases', label: 'Purchases', count: mykit.purchases.length },
    { id: 'projects', label: 'Saved Projects', count: mykit.savedProjects.length },
  ];

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      mykit.createFolder(newFolderName.trim());
      setNewFolderName('');
      setShowNewFolder(false);
    }
  };

  // Sort folders by folderOrder
  const sortedFolders = [...mykit.folders].sort((a, b) => {
    const aIdx = mykit.folderOrder.indexOf(a.id);
    const bIdx = mykit.folderOrder.indexOf(b.id);
    return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
  });

  const handleReorderFolders = (fromIdx, toIdx) => {
    const fromId = sortedFolders[fromIdx]?.id;
    const toId = sortedFolders[toIdx]?.id;
    if (!fromId || !toId || fromId === 'favourites' || toId === 'favourites') return;
    const newOrder = [...mykit.folderOrder];
    const fromOrderIdx = newOrder.indexOf(fromId);
    const toOrderIdx = newOrder.indexOf(toId);
    if (fromOrderIdx !== -1 && toOrderIdx !== -1) {
      newOrder.splice(fromOrderIdx, 1);
      newOrder.splice(toOrderIdx, 0, fromId);
      mykit.reorderFolders(newOrder);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer relative ${
              activeTab === tab.id
                ? 'text-accent'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-1.5 text-xs font-mono px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-blue-50 text-accent' : 'bg-surface text-text-muted'
              }`}>
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t" />
            )}
          </button>
        ))}
      </div>

      {/* My Tools Tab */}
      {activeTab === 'tools' && (
        <div className="space-y-4">
          {/* Search to add tools */}
          <div className="bg-white border border-border rounded-[12px] p-4">
            <p className="text-xs text-text-muted mb-2 font-medium uppercase tracking-wide">Add tools to your kit</p>
            <AddToolSearch onAdd={(slug) => mykit.addTool(slug, 'favourites')} />
          </div>

          {/* Folders */}
          {sortedFolders.map((folder, folderIdx) => (
            <FolderSection
              key={folder.id}
              folder={folder}
              folderIndex={folderIdx}
              totalFolders={sortedFolders.length}
              onRemoveTool={mykit.removeToolFromFolder}
              onRenameFolder={mykit.renameFolder}
              onDeleteFolder={mykit.deleteFolder}
              onMoveTool={mykit.moveTool}
              onReorderTools={mykit.reorderToolsInFolder}
              onReorderFolders={handleReorderFolders}
            />
          ))}

          {/* New Folder */}
          {showNewFolder ? (
            <div className="flex items-center gap-2 bg-surface border border-border rounded-[12px] p-4">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCreateFolder(); if (e.key === 'Escape') setShowNewFolder(false); }}
                placeholder="Folder name..."
                autoFocus
                className="flex-1 px-3 py-2 text-sm border border-border rounded-[8px] bg-white text-text-primary"
              />
              <Button onClick={handleCreateFolder} className="bg-accent text-white">Create</Button>
              <Button onClick={() => setShowNewFolder(false)} variant="ghost">Cancel</Button>
            </div>
          ) : (
            <button
              onClick={() => setShowNewFolder(true)}
              className="w-full py-3 border-2 border-dashed border-border rounded-[12px] text-sm text-text-muted hover:text-text-secondary hover:border-blue-200 transition-colors cursor-pointer"
            >
              + New Folder
            </button>
          )}
        </div>
      )}

      {/* Recent Tab */}
      {activeTab === 'recent' && <RecentSection recent={mykit.recent} />}

      {/* Purchases Tab */}
      {activeTab === 'purchases' && <PurchasesSection purchases={mykit.purchases} />}

      {/* Saved Projects Tab */}
      {activeTab === 'projects' && <SavedProjectsSection savedProjects={mykit.savedProjects} onDelete={mykit.deleteProject} />}
    </div>
  );
}
