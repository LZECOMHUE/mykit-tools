'use client';

import { useEffect, useRef, useState } from 'react';

// Renders a thumbnail preview of a single PDF page
export default function PDFThumbnail({
  fileOrBytes,
  pageIndex = 0,
  width = 160,
  className = '',
  label,
  showPageNum = false,
  rotation = 0,
}) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        setLoading(true);
        setError(false);

        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

        let data;
        if (fileOrBytes instanceof File) {
          data = await fileOrBytes.arrayBuffer();
        } else if (fileOrBytes instanceof Uint8Array) {
          data = fileOrBytes.buffer;
        } else if (fileOrBytes instanceof ArrayBuffer) {
          data = fileOrBytes;
        } else {
          throw new Error('Invalid input');
        }

        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(data) }).promise;
        const page = await pdf.getPage(pageIndex + 1);

        const baseViewport = page.getViewport({ scale: 1 });
        const scale = width / baseViewport.width;
        const viewport = page.getViewport({ scale, rotation });

        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    if (fileOrBytes) render();

    return () => {
      cancelled = true;
    };
  }, [fileOrBytes, pageIndex, width, rotation]);

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <div className="relative bg-white border border-border rounded-[6px] overflow-hidden shadow-sm">
        {loading && !error && (
          <div
            className="flex items-center justify-center bg-surface animate-pulse"
            style={{ width, height: width * 1.414 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
        )}
        {error && (
          <div
            className="flex items-center justify-center bg-surface"
            style={{ width, height: width * 1.414 }}
          >
            <span className="text-xs text-text-muted">Preview unavailable</span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={loading ? 'hidden' : 'block'}
        />
      </div>
      {(label || showPageNum) && (
        <span className="mt-1.5 text-xs text-text-secondary truncate max-w-full text-center">
          {label || `Page ${pageIndex + 1}`}
        </span>
      )}
    </div>
  );
}
