'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Button from '@/components/ui/Button';
import PDFDropZone from './PDFDropZone';
import PDFPageList from './PDFPageList';

export default function DeletePDFPages() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePdfUpload = async (file) => {
    setError('');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      setPdfFile(file);
      setPages(Array.from({ length: pageCount }, (_, i) => i));
      setSelectedPages(new Set());
    } catch (err) {
      setError('Failed to load PDF. Please try another file.');
    }
  };

  const togglePageSelection = (pageIndex) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageIndex)) {
      newSelected.delete(pageIndex);
    } else {
      newSelected.add(pageIndex);
    }
    setSelectedPages(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedPages.size === pages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(pages));
    }
  };

  const handleRemovePages = async () => {
    if (selectedPages.size === 0) {
      setError('Please select at least one page to remove.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const indicesToRemove = Array.from(selectedPages).sort((a, b) => b - a);
      for (const index of indicesToRemove) {
        pdfDoc.removePage(index);
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${pdfFile.name.replace('.pdf', '')}-deleted.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setPdfFile(null);
      setPages([]);
      setSelectedPages(new Set());
    } catch (err) {
      setError('Failed to process PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setPdfFile(null);
    setPages([]);
    setSelectedPages(new Set());
    setError('');
  };

  if (!pdfFile) {
    return <PDFDropZone onFilesSelected={(files) => handlePdfUpload(files[0])} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[var(--radius-input)]">
          {error}
        </div>
      )}

      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Select Pages to Remove
        </h2>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-secondary">
            {pages.length} pages total
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleSelectAll}
          >
            {selectedPages.size === pages.length
              ? 'Deselect All'
              : 'Select All'}
          </Button>
        </div>

        <PDFPageList
          file={pdfFile}
          selectedPages={Array.from(selectedPages)}
          onSelectPage={(pageIdx) => {
            const newSelected = new Set(selectedPages);
            if (newSelected.has(pageIdx)) {
              newSelected.delete(pageIdx);
            } else {
              newSelected.add(pageIdx);
            }
            setSelectedPages(newSelected);
          }}
          onSelectAll={() => setSelectedPages(new Set(pages))}
          onDeselectAll={() => setSelectedPages(new Set())}
          showCheckboxes
        />

        {selectedPages.size > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-[var(--radius-input)]">
            <p className="text-sm text-red-700">
              <strong>{selectedPages.size} page{selectedPages.size !== 1 ? 's' : ''}</strong> will be removed from your PDF.
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleRemovePages}
          disabled={selectedPages.size === 0 || isLoading}
          className="flex-1"
        >
          {isLoading ? 'Processing...' : 'Remove Pages & Download'}
        </Button>
        <Button
          variant="secondary"
          onClick={handleStartOver}
          className="flex-1"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
}
