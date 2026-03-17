'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import PDFDropZone from './PDFDropZone';

export default function PDFReader() {
  const [pdf, setPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [rendering, setRendering] = useState(false);
  const canvasRef = useRef(null);
  const pageInputRef = useRef(null);

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setPdfFile(file);
    setCurrentPage(1);
    setScale(1.5);

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;

      setPdf(pdfDoc);
      setPageCount(pdfDoc.numPages);
    } catch (error) {
      console.error('Error loading PDF:', error);
      alert('Error loading PDF. Please try again.');
    }
  };

  const renderPage = async (pageNum) => {
    if (!pdf || !canvasRef.current) return;

    setRendering(true);

    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
    } finally {
      setRendering(false);
    }
  };

  useEffect(() => {
    if (pdf && currentPage >= 1 && currentPage <= pageCount) {
      renderPage(currentPage);
    }
  }, [pdf, currentPage, scale, pageCount]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageJump = (e) => {
    const pageNum = parseInt(e.target.value, 10);
    if (pageNum >= 1 && pageNum <= pageCount) {
      setCurrentPage(pageNum);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleFitWidth = () => {
    setScale(1.2);
  };

  const handleFitPage = () => {
    setScale(1);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!pdf) return;

      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pdf, currentPage, pageCount]);

  if (!pdfFile) {
    return <PDFDropZone onFilesSelected={handleFileSelect} />;
  }

  return (
    <div className="w-full flex flex-col h-screen md:h-auto md:max-w-4xl md:mx-auto space-y-4">
      {/* File Info Bar */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-text-primary font-semibold text-sm sm:text-base truncate">
              {pdfFile.name}
            </p>
            <p className="text-text-secondary text-xs sm:text-sm">
              {pageCount} pages - {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              setPdf(null);
              setPdfFile(null);
              setCurrentPage(1);
            }}
            className="text-sm py-2"
          >
            Choose File
          </Button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-3">
        {/* Navigation Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || rendering}
            className="text-sm py-2 px-3"
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <input
              ref={pageInputRef}
              type="number"
              min="1"
              max={pageCount}
              value={currentPage}
              onChange={handlePageJump}
              className="w-16 px-2 py-2 border border-border rounded-[var(--radius-input)] text-text-primary text-sm text-center font-mono-num"
            />
            <span className="text-text-secondary text-sm">
              / {pageCount}
            </span>
          </div>

          <Button
            variant="secondary"
            onClick={handleNextPage}
            disabled={currentPage >= pageCount || rendering}
            className="text-sm py-2 px-3"
          >
            Next
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
          <span className="text-text-secondary text-sm">Zoom:</span>

          <Button
            variant="secondary"
            onClick={handleZoomOut}
            disabled={scale <= 0.5 || rendering}
            className="text-sm py-2 px-3"
          >
            Zoom Out
          </Button>

          <span className="text-text-primary text-sm font-mono-num min-w-12 text-center">
            {Math.round(scale * 100)}%
          </span>

          <Button
            variant="secondary"
            onClick={handleZoomIn}
            disabled={scale >= 3 || rendering}
            className="text-sm py-2 px-3"
          >
            Zoom In
          </Button>

          <Button
            variant="secondary"
            onClick={handleFitWidth}
            className="text-sm py-2 px-3"
          >
            Fit Width
          </Button>

          <Button
            variant="secondary"
            onClick={handleFitPage}
            className="text-sm py-2 px-3"
          >
            Fit Page
          </Button>
        </div>

        {rendering && (
          <p className="text-text-muted text-sm">Rendering page {currentPage}...</p>
        )}
      </div>

      {/* Canvas Viewer */}
      <div className="flex-1 bg-gray-100 border border-border rounded-[var(--radius-card)] overflow-auto flex items-center justify-center min-h-96">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto"
        />
      </div>

      {/* Keyboard Hints */}
      <div className="text-center text-text-muted text-xs">
        Use arrow keys to navigate: left/right
      </div>
    </div>
  );
}
