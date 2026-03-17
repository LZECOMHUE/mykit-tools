'use client';

import { useEffect, useState } from 'react';
import PDFThumbnail from './PDFThumbnail';

// Displays all pages of a PDF as draggable thumbnails with selection/actions
export default function PDFPageList({
  file,
  pdfBytes,
  selectedPages,
  onSelectPage,
  onSelectAll,
  onDeselectAll,
  actions,
  thumbnailWidth = 140,
  showCheckboxes = true,
  draggable = false,
  onReorder,
}) {
  const [pageCount, setPageCount] = useState(0);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  useEffect(() => {
    async function getPageCount() {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

        let data;
        if (file instanceof File) {
          data = await file.arrayBuffer();
        } else if (pdfBytes) {
          data = pdfBytes instanceof Uint8Array ? pdfBytes.buffer : pdfBytes;
        }
        if (!data) return;

        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(data) }).promise;
        setPageCount(pdf.numPages);
      } catch {
        setPageCount(0);
      }
    }
    getPageCount();
  }, [file, pdfBytes]);

  if (pageCount === 0) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i);
  const allSelected = selectedPages?.length === pageCount;

  const handleDragStart = (e, idx) => {
    if (!draggable) return;
    setDragIndex(idx);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, idx) => {
    if (!draggable) return;
    e.preventDefault();
    setDragOverIndex(idx);
  };

  const handleDrop = (e, idx) => {
    if (!draggable || dragIndex === null) return;
    e.preventDefault();
    if (onReorder && dragIndex !== idx) {
      onReorder(dragIndex, idx);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-4">
      {/* Controls row */}
      {(showCheckboxes || actions) && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            {showCheckboxes && (
              <>
                <span className="text-sm text-text-secondary">
                  {selectedPages?.length || 0} of {pageCount} pages selected
                </span>
                <button
                  onClick={allSelected ? onDeselectAll : onSelectAll}
                  className="text-sm text-accent hover:text-accent-hover transition-colors cursor-pointer"
                >
                  {allSelected ? 'Deselect all' : 'Select all'}
                </button>
              </>
            )}
            {!showCheckboxes && (
              <span className="text-sm text-text-secondary">
                {pageCount} {pageCount === 1 ? 'page' : 'pages'}
              </span>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Page grid */}
      <div className="flex flex-wrap gap-4">
        {pages.map((pageIdx) => {
          const isSelected = selectedPages?.includes(pageIdx);
          const isDragTarget = dragOverIndex === pageIdx && dragIndex !== pageIdx;

          return (
            <div
              key={pageIdx}
              draggable={draggable}
              onDragStart={(e) => handleDragStart(e, pageIdx)}
              onDragOver={(e) => handleDragOver(e, pageIdx)}
              onDrop={(e) => handleDrop(e, pageIdx)}
              onDragEnd={handleDragEnd}
              className={`relative group rounded-[8px] p-2 transition-all duration-150 ${
                draggable ? 'cursor-grab active:cursor-grabbing' : ''
              } ${
                isDragTarget
                  ? 'ring-2 ring-accent ring-offset-2'
                  : ''
              } ${
                isSelected
                  ? 'bg-accent/5 ring-2 ring-accent'
                  : 'bg-surface hover:bg-surface-hover'
              }`}
              onClick={() => showCheckboxes && onSelectPage?.(pageIdx)}
            >
              {showCheckboxes && (
                <div className={`absolute top-3 left-3 z-10 w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-accent border-accent'
                    : 'bg-white border-border group-hover:border-accent/50'
                }`}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              )}
              <PDFThumbnail
                fileOrBytes={file || pdfBytes}
                pageIndex={pageIdx}
                width={thumbnailWidth}
                showPageNum
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
