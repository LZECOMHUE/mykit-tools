'use client';

import { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import PDFDropZone from './PDFDropZone';
import PDFThumbnail from './PDFThumbnail';

export default function NumberPages() {
  const [pdfFile, setPdfFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [position, setPosition] = useState('bottom-center');
  const [startingNumber, setStartingNumber] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [format, setFormat] = useState('1');
  const [pageCount, setPageCount] = useState(0);

  const handlePdfUpload = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPdfFile({ file, arrayBuffer, pageCount: pdfDoc.getPageCount() });
      setPageCount(pdfDoc.getPageCount());
    } catch (error) {
      alert('Failed to load PDF. Please check the file and try again.');
      console.error(error);
    }
  };

  const getPositionCoordinates = (page, pageNum, totalPages) => {
    const { width, height } = page.getSize();
    const margin = 30;
    let x, y;

    switch (position) {
      case 'bottom-left':
        x = margin;
        y = margin;
        break;
      case 'bottom-right':
        x = width - margin;
        y = margin;
        break;
      case 'top-left':
        x = margin;
        y = height - margin;
        break;
      case 'top-right':
        x = width - margin;
        y = height - margin;
        break;
      case 'top-center':
        x = width / 2;
        y = height - margin;
        break;
      case 'bottom-center':
      default:
        x = width / 2;
        y = margin;
        break;
    }

    return { x, y };
  };

  const getPageNumberText = (pageNum, totalPages) => {
    switch (format) {
      case 'Page 1':
        return `Page ${pageNum}`;
      case '1 of N':
        return `${pageNum} of ${totalPages}`;
      case 'Page 1 of N':
        return `Page ${pageNum} of ${totalPages}`;
      case '1':
      default:
        return String(pageNum);
    }
  };

  const handleAddPageNumbers = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.load(pdfFile.arrayBuffer);
      const pages = pdfDoc.getPages();
      const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const totalPages = pages.length;

      pages.forEach((page, index) => {
        const pageNumber = startingNumber + index;
        const text = getPageNumberText(pageNumber, totalPages);
        const { x, y } = getPositionCoordinates(page, pageNumber, totalPages);

        // Determine text alignment based on position
        const isRightAligned = position.includes('right');
        const isLeftAligned = position.includes('left');
        const isCentered = position.includes('center');

        const textWidth = helvetica.widthOfTextAtSize(text, fontSize);
        let adjustedX = x;

        if (isRightAligned) {
          adjustedX = x - textWidth;
        } else if (isCentered) {
          adjustedX = x - textWidth / 2;
        }

        page.drawText(text, {
          x: adjustedX,
          y,
          size: fontSize,
          font: helvetica,
          color: rgb(0.2, 0.2, 0.2),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `numbered-${pdfFile.file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to add page numbers. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!pdfFile ? (
        <PDFDropZone onFilesSelected={(files) => handlePdfUpload(files[0])} />
      ) : (
        <>
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h3 className="text-text-primary font-semibold mb-4">
              PDF uploaded ({pageCount} pages)
            </h3>
            <PDFThumbnail fileOrBytes={pdfFile.file} />
            <Button
              onClick={() => setPdfFile(null)}
              variant="secondary"
              className="mt-4"
            >
              Change PDF
            </Button>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h3 className="text-text-primary font-semibold">Configuration</h3>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Position
              </label>
              <Select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                options={[
                  { value: 'bottom-center', label: 'Bottom Center' },
                  { value: 'bottom-left', label: 'Bottom Left' },
                  { value: 'bottom-right', label: 'Bottom Right' },
                  { value: 'top-center', label: 'Top Center' },
                  { value: 'top-left', label: 'Top Left' },
                  { value: 'top-right', label: 'Top Right' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Starting Number
              </label>
              <Input
                type="number"
                value={startingNumber}
                onChange={(e) => setStartingNumber(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Font Size: {fontSize}px
              </label>
              <Input
                type="range"
                min="8"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Number Format
              </label>
              <Select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                options={[
                  { value: '1', label: '1' },
                  { value: 'Page 1', label: 'Page 1' },
                  { value: '1 of N', label: '1 of N' },
                  { value: 'Page 1 of N', label: 'Page 1 of N' },
                ]}
              />
            </div>

            <Button
              onClick={handleAddPageNumbers}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : 'Add Page Numbers'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
