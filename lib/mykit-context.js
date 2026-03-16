'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const MyKitContext = createContext(null);

const STORAGE_KEY = 'mykit-user-data';

const defaultData = {
  // Tool bookmarks organised into folders
  folders: [
    { id: 'favourites', name: 'Favourites', icon: 'star', slugs: [] },
  ],
  // Flat list of all bookmarked tool slugs (for quick lookup)
  bookmarked: [],
  // Recently used tools (slug + timestamp)
  recent: [],
  // Purchased tool slugs
  purchases: [],
  // Saved projects (toolSlug + name + timestamp + data)
  savedProjects: [],
  // Custom folder order for drag reorder
  folderOrder: ['favourites'],
};

export function MyKitProvider({ children }) {
  const [data, setData] = useState(defaultData);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({ ...defaultData, ...parsed });
      }
    } catch (e) {
      console.warn('Failed to load MyKit data:', e);
    }
    setLoaded(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('Failed to save MyKit data:', e);
      }
    }
  }, [data, loaded]);

  // Check if a tool is bookmarked
  const isBookmarked = useCallback((slug) => {
    return data.bookmarked.includes(slug);
  }, [data.bookmarked]);

  // Add a tool to a folder (defaults to Favourites)
  const addTool = useCallback((slug, folderId = 'favourites') => {
    setData(prev => {
      const newBookmarked = prev.bookmarked.includes(slug)
        ? prev.bookmarked
        : [...prev.bookmarked, slug];

      const newFolders = prev.folders.map(f => {
        if (f.id === folderId && !f.slugs.includes(slug)) {
          return { ...f, slugs: [...f.slugs, slug] };
        }
        return f;
      });

      return { ...prev, bookmarked: newBookmarked, folders: newFolders };
    });
  }, []);

  // Remove a tool from a specific folder
  const removeToolFromFolder = useCallback((slug, folderId) => {
    setData(prev => {
      const newFolders = prev.folders.map(f => {
        if (f.id === folderId) {
          return { ...f, slugs: f.slugs.filter(s => s !== slug) };
        }
        return f;
      });

      // Check if the tool is still in any folder
      const stillInAFolder = newFolders.some(f => f.slugs.includes(slug));
      const newBookmarked = stillInAFolder
        ? prev.bookmarked
        : prev.bookmarked.filter(s => s !== slug);

      return { ...prev, bookmarked: newBookmarked, folders: newFolders };
    });
  }, []);

  // Remove a tool from all folders (full unbookmark)
  const removeTool = useCallback((slug) => {
    setData(prev => ({
      ...prev,
      bookmarked: prev.bookmarked.filter(s => s !== slug),
      folders: prev.folders.map(f => ({
        ...f,
        slugs: f.slugs.filter(s => s !== slug),
      })),
    }));
  }, []);

  // Toggle bookmark (add to Favourites or remove entirely)
  const toggleBookmark = useCallback((slug) => {
    setData(prev => {
      if (prev.bookmarked.includes(slug)) {
        // Remove from all folders
        return {
          ...prev,
          bookmarked: prev.bookmarked.filter(s => s !== slug),
          folders: prev.folders.map(f => ({
            ...f,
            slugs: f.slugs.filter(s => s !== slug),
          })),
        };
      } else {
        // Add to Favourites
        return {
          ...prev,
          bookmarked: [...prev.bookmarked, slug],
          folders: prev.folders.map(f => {
            if (f.id === 'favourites') {
              return { ...f, slugs: [...f.slugs, slug] };
            }
            return f;
          }),
        };
      }
    });
  }, []);

  // Move a tool between folders
  const moveTool = useCallback((slug, fromFolderId, toFolderId) => {
    setData(prev => ({
      ...prev,
      folders: prev.folders.map(f => {
        if (f.id === fromFolderId) {
          return { ...f, slugs: f.slugs.filter(s => s !== slug) };
        }
        if (f.id === toFolderId && !f.slugs.includes(slug)) {
          return { ...f, slugs: [...f.slugs, slug] };
        }
        return f;
      }),
    }));
  }, []);

  // Create a new folder
  const createFolder = useCallback((name) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setData(prev => {
      if (prev.folders.some(f => f.id === id)) return prev;
      return {
        ...prev,
        folders: [...prev.folders, { id, name, icon: 'folder', slugs: [] }],
        folderOrder: [...prev.folderOrder, id],
      };
    });
    return id;
  }, []);

  // Rename a folder
  const renameFolder = useCallback((folderId, newName) => {
    setData(prev => ({
      ...prev,
      folders: prev.folders.map(f =>
        f.id === folderId ? { ...f, name: newName } : f
      ),
    }));
  }, []);

  // Delete a folder (tools go back to uncategorised, stay bookmarked)
  const deleteFolder = useCallback((folderId) => {
    if (folderId === 'favourites') return; // Can't delete Favourites
    setData(prev => ({
      ...prev,
      folders: prev.folders.filter(f => f.id !== folderId),
      folderOrder: prev.folderOrder.filter(id => id !== folderId),
    }));
  }, []);

  // Reorder folders
  const reorderFolders = useCallback((newOrder) => {
    setData(prev => ({ ...prev, folderOrder: newOrder }));
  }, []);

  // Reorder tools within a folder
  const reorderToolsInFolder = useCallback((folderId, newSlugs) => {
    setData(prev => ({
      ...prev,
      folders: prev.folders.map(f =>
        f.id === folderId ? { ...f, slugs: newSlugs } : f
      ),
    }));
  }, []);

  // Track a recently used tool
  const trackRecent = useCallback((slug) => {
    setData(prev => {
      const filtered = prev.recent.filter(r => r.slug !== slug);
      const updated = [{ slug, timestamp: Date.now() }, ...filtered].slice(0, 20);
      return { ...prev, recent: updated };
    });
  }, []);

  // Add a purchase record
  const addPurchase = useCallback((slug) => {
    setData(prev => {
      if (prev.purchases.includes(slug)) return prev;
      return { ...prev, purchases: [...prev.purchases, slug] };
    });
  }, []);

  // Check if tool is purchased
  const isPurchased = useCallback((slug) => {
    return data.purchases.includes(slug);
  }, [data.purchases]);

  // Save a project
  const saveProject = useCallback((toolSlug, name, projectData) => {
    const id = `${toolSlug}-${Date.now()}`;
    setData(prev => ({
      ...prev,
      savedProjects: [
        { id, toolSlug, name, data: projectData, timestamp: Date.now() },
        ...prev.savedProjects,
      ],
    }));
    return id;
  }, []);

  // Delete a saved project
  const deleteProject = useCallback((projectId) => {
    setData(prev => ({
      ...prev,
      savedProjects: prev.savedProjects.filter(p => p.id !== projectId),
    }));
  }, []);

  const value = {
    ...data,
    loaded,
    isBookmarked,
    addTool,
    removeTool,
    removeToolFromFolder,
    toggleBookmark,
    moveTool,
    createFolder,
    renameFolder,
    deleteFolder,
    reorderFolders,
    reorderToolsInFolder,
    trackRecent,
    addPurchase,
    isPurchased,
    saveProject,
    deleteProject,
  };

  return (
    <MyKitContext.Provider value={value}>
      {children}
    </MyKitContext.Provider>
  );
}

export function useMyKit() {
  const ctx = useContext(MyKitContext);
  if (!ctx) {
    return {
      folders: [], bookmarked: [], recent: [], purchases: [], savedProjects: [],
      folderOrder: [], loaded: false,
      isBookmarked: () => false, addTool: () => {}, removeTool: () => {},
      removeToolFromFolder: () => {}, toggleBookmark: () => {}, moveTool: () => {},
      createFolder: () => {}, renameFolder: () => {}, deleteFolder: () => {},
      reorderFolders: () => {}, reorderToolsInFolder: () => {},
      trackRecent: () => {}, addPurchase: () => {}, isPurchased: () => false,
      saveProject: () => {}, deleteProject: () => {},
    };
  }
  return ctx;
}
