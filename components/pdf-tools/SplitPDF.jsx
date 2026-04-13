'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import PDFDropZone from './PDFDropZone';
import PDFPageList from './PDFPageList';

export default function SplitPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pdfBytes, setPdfBytes] = useState(null);
  const [splitMode, setSplitMode] = useState('extract');
  const [selectedPages, setSelectedPages] = useState([]);
  const [customRanges, setCustomRanges] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePdfUpload = async (file) => {
    try {
      setError(null);
      const arrayBuffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(arrayBuffer);
      setPdfFile(file);
      setPdfDoc(doc);
      setPdfBytes(new Uint8Array(arrayBuffer));
      setSelectedPages([]);
      setCustomRanges('');
    } catch (err) {
      setError('Failed to load PDF. Please try another file.');
      setPdfFile(null);
      setPdfDoc(null);
      setPdfBytes(null);
    }
  };

  const parseCustomRanges = (rangeString) => {
    const pages = new Set();
    const parts = rangeString.split(',').map(p => p.trim());

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (isNaN(start) || isNaN(end)) continue;
        for (let i = Math.max(1, start); i <= Math.min(pdfDoc.getPageCount(), end); i++) {
          pages.add(i);
        }
      } else {
        const pageNum = Number(part);
        if (!isNaN(pageNum) && pageNum > 0 && pageNum <= pdfDoc.getPageCount()) {
          pages.add(pageNum);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplitPDF = async () => {
    if (!pdfDoc) return;
    setIsProcessing(true);
    setError(null);

    try {
      if (splitMode === 'individual') {
        // Split each page into its own PDF
        const pageCount = pdfDoc.getPageCount();
        for (let i = 0; i < pageCount; i++) {
          const newDoc = await PDFDocument.create();
          const [copiedPage] = await newDoc.copyPages(pdfDoc, [i]);
          newDoc.addPage(copiedPage);
          const pdfBytes = await newDoc.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `page-${i + 1}.pdf`;
          link.click();
          URL.revokeObjectURL(url);
        }
      } else if (splitMode === 'extract' && selectedPages.length > 0) {
        // Extract selected pages into one PDF
        const newDoc = await PDFDocument.create();
        const indicesToCopy = selectedPages.sort((a, b) => a - b);
        const copiedPages = await newDoc.copyPages(pdfDoc, indicesToCopy);
        copiedPages.forEach(page => newDoc.addPage(page));
        const pdfBytes = await newDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'extracted-pages.pdf';
        link.click();
        URL.revokeObjectURL(url);
      } else if (splitMode === 'ranges' && customRanges.trim()) {
        // Split by custom ranges
        const pagesToExtract = parseCustomRanges(customRanges);
        if (pagesToExtract.length === 0) {
          setError('No valid pages found in the specified ranges.');
          setIsProcessing(false);
          return;
        }
        const newDoc = await PDFDocument.create();
        const indicesToCopy = pagesToExtract.map(p => p - 1);
        const copiedPages = await newDoc.copyPages(pdfDoc, indicesToCopy);
        copiedPages.forEach(page => newDoc.addPage(page));
        const pdfBytes = await newDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'split-result.pdf';
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError('Failed to split PDF. Please try again.');
    }

    setIsProcessing(false);
  };

  const handleStartOver = () => {
    setPdfFile(null);
    setPdfDoc(null);
    setSplitMode('extract');
    setSelectedPages([]);
    setCustomRanges('');
    setError(null);
  };

  const splitModeOptions = [
    { value: 'extract', label: 'Extract selected pages' },
    { value: 'individual', label: 'Split into individual pages' },
    { value: 'ranges', label: 'Custom ranges' },
  ];

  if (!pdfFile) {
    return <PDFDropZone onFilesSelected={(files) => handlePdfUpload(files[0])} />;
  }

  const pageCount = pdfDoc?.getPageCount() || 0;
  const isValidSelection =
    (splitMode === 'extract' && selectedPages.length > 0) ||
    (splitMode === 'individual') ||
    (splitMode === 'ranges' && customRanges.trim().length > 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="p-4 bg-surface rounded-[var(--radius-card)] border border-border">
        <p className="text-text-secondary">
          <span className="font-medium text-text-primary">{pageCount} pages</span> loaded
        </p>
      </div>

      {/* Split mode selector */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          How do you want to split?
        </label>
        <Select
          value={splitMode}
          onChange={(e) => setSplitMode(e.target.value)}
          options={splitModeOptions}
        />
      </div>

      {/* Mode-specific content */}
      {splitMode === 'extract' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Select pages to extract
          </label>
          <PDFPageList
            pdfBytes={pdfBytes}
            selectedPages={selectedPages}
            onSelectPage={(pageIdx) => {
              const newPages = selectedPages.includes(pageIdx)
                ? selectedPages.filter(p => p !== pageIdx)
                : [...selectedPages, pageIdx];
              setSelectedPages(newPages);
            }}
            onSelectAll={() => {
              const pageCount = pdfDoc?.getPageCount() || 0;
              setSelectedPages(Array.from({ length: pageCount }, (_, i) => i));
            }}
            onDeselectAll={() => setSelectedPages([])}
            showCheckboxes
          />
          {selectedPages.length > 0 && (
            <p className="text-sm text-text-secondary mt-3">
              {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      )}

      {splitMode === 'individual' && (
        <div className="p-4 bg-surface rounded-[var(--radius-card)] border border-border">
          <p className="text-text-secondary">
            This will create {pageCount} separate PDF file{pageCount !== 1 ? 's' : ''}, one for each page.
            Downloads will start automatically.
          </p>
        </div>
      )}

      {splitMode === 'ranges' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Enter page ranges
          </label>
          <input
            type="text"
            placeholder="e.g., 1-3, 5, 7-10"
            value={customRanges}
            onChange={(e) => setCustomRanges(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 bg-white text-text-primary placeholder-text-muted"
          />
          <p className="text-xs text-text-muted mt-2">
            Separate ranges with commas. Use hyphens for ranges (e.g., 1-5). Valid pages: 1-{pageCount}
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-[var(--radius-input)] text-error text-sm">
          {error}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleSplitPDF}
          disabled={!isValidSelection || isProcessing}
          className="flex-1"
        >
          {isProcessing ? 'Processing...' : 'Split PDF'}
        </Button>
        <Button variant="secondary" onClick={handleStartOver}>
          Start over
        </Button>
      </div>
    </div>
  );
}
