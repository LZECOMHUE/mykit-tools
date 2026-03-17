'use client';

import { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import Button from '@/components/ui/Button';
import PDFDropZone from './PDFDropZone';
import PDFThumbnail from './PDFThumbnail';

export default function RotatePDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [rotations, setRotations] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePdfUpload = async (file) => {
    setPdfFile(file);
    setRotations({});

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const pdfDoc = await PDFDocument.load(e.target.result);
        const pageCount = pdfDoc.getPageCount();

        const pageList = Array.from({ length: pageCount }, (_, i) => ({
          index: i,
          number: i + 1,
        }));

        setPages(pageList);

        const initialRotations = {};
        pageList.forEach((p) => {
          initialRotations[p.index] = 0;
        });
        setRotations(initialRotations);
      } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Failed to load PDF. Please try another file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const rotatePageCW = (pageIndex) => {
    setRotations((prev) => ({
      ...prev,
      [pageIndex]: (prev[pageIndex] + 90) % 360,
    }));
  };

  const rotatePageCCW = (pageIndex) => {
    setRotations((prev) => ({
      ...prev,
      [pageIndex]: (prev[pageIndex] - 90 + 360) % 360,
    }));
  };

  const rotateAllCW = () => {
    setRotations((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key] = (updated[key] + 90) % 360;
      });
      return updated;
    });
  };

  const rotateAllCCW = () => {
    setRotations((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key] = (updated[key] - 90 + 360) % 360;
      });
      return updated;
    });
  };

  const applyRotationsAndDownload = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfDoc = await PDFDocument.load(e.target.result);
        const pdfPages = pdfDoc.getPages();

        pdfPages.forEach((page, index) => {
          const rotation = rotations[index] || 0;
          if (rotation !== 0) {
            page.setRotation(degrees(rotation));
          }
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `rotated-${pdfFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setIsProcessing(false);
      };
      reader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Failed to process PDF. Please try again.');
      setIsProcessing(false);
    }
  };

  const resetTool = () => {
    setPdfFile(null);
    setPages([]);
    setRotations({});
  };

  if (!pdfFile || pages.length === 0) {
    return <PDFDropZone onFilesSelected={(files) => handlePdfUpload(files[0])} />;
  }

  return (
    <div className="space-y-6 w-full">
      {/* Top Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            {pdfFile.name}
          </h2>
          <p className="text-sm text-text-secondary">
            {pages.length} page{pages.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button
            variant="secondary"
            onClick={rotateAllCCW}
            disabled={isProcessing}
          >
            Rotate All Left
          </Button>
          <Button
            variant="secondary"
            onClick={rotateAllCW}
            disabled={isProcessing}
          >
            Rotate All Right
          </Button>
        </div>
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pages.map((page) => (
          <div
            key={page.index}
            className="flex flex-col items-center gap-3 bg-surface border border-border rounded-[var(--radius-card)] p-3"
          >
            <PDFThumbnail
              fileOrBytes={pdfFile}
              pageIndex={page.index}
              rotation={rotations[page.index] || 0}
            />

            <div className="text-xs text-text-muted font-medium">
              Page {page.number}
            </div>

            <div className="flex gap-2 w-full">
              <button
                onClick={() => rotatePageCCW(page.index)}
                disabled={isProcessing}
                className="flex-1 px-2 py-1.5 text-xs font-medium text-text-primary bg-white border border-border rounded-[var(--radius-input)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                title="Rotate left (90 degrees counter-clockwise)"
              >
                L
              </button>
              <button
                onClick={() => rotatePageCW(page.index)}
                disabled={isProcessing}
                className="flex-1 px-2 py-1.5 text-xs font-medium text-text-primary bg-white border border-border rounded-[var(--radius-input)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                title="Rotate right (90 degrees clockwise)"
              >
                R
              </button>
            </div>

            <div className="text-xs text-text-muted">
              {rotations[page.index] || 0}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
        <Button
          onClick={applyRotationsAndDownload}
          disabled={isProcessing}
          className="sm:order-2 flex-1"
        >
          {isProcessing ? 'Processing...' : 'Apply & Download'}
        </Button>

        <Button
          variant="secondary"
          onClick={resetTool}
          disabled={isProcessing}
          className="sm:order-1 flex-1 sm:flex-none"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
}
