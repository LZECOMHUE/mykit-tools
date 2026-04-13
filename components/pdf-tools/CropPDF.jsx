'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import PDFDropZone from './PDFDropZone';
import PDFThumbnail from './PDFThumbnail';

const PRESET_OPTIONS = [
  { value: 'custom', label: 'Custom margins' },
  { value: 'remove-10', label: 'Remove 10% margins' },
  { value: 'remove-20', label: 'Remove 20% margins' },
];

const APPLY_OPTIONS = [
  { value: 'all', label: 'All pages' },
  { value: 'selected', label: 'Selected pages' },
];

export default function CropPDF() {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preset, setPreset] = useState('custom');
  const [applyTo, setApplyTo] = useState('all');
  const [selectedPages, setSelectedPages] = useState([]);
  const [margins, setMargins] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const [unit, setUnit] = useState('pt');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cropped, setCropped] = useState(null);
  const [pageWidth, setPageWidth] = useState(612);
  const [pageHeight, setPageHeight] = useState(792);

  const handleFileSelect = async (selectedFile) => {
    setError(null);
    setFile(selectedFile);
    setCropped(null);
    setSelectedPages([]);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const pageCount = pdf.getPageCount();
      const firstPage = pdf.getPage(0);
      const { width, height } = firstPage.getSize();

      setFileInfo({
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2),
        pageCount: pageCount,
      });

      setPageWidth(width);
      setPageHeight(height);

      // Generate thumbnail
      const pdfBytes = await pdf.save();
      setThumbnail({
        buffer: pdfBytes,
        pageNumber: 0,
      });
    } catch (err) {
      setError('Failed to load PDF. Please check the file and try again.');
      setFile(null);
      setFileInfo(null);
      setThumbnail(null);
    }
  };

  const handlePresetChange = (value) => {
    setPreset(value);

    if (value === 'remove-10') {
      const topMargin = pageHeight * 0.1;
      const leftMargin = pageWidth * 0.1;
      setMargins({
        top: Math.round(topMargin),
        right: Math.round(leftMargin),
        bottom: Math.round(topMargin),
        left: Math.round(leftMargin),
      });
    } else if (value === 'remove-20') {
      const topMargin = pageHeight * 0.2;
      const leftMargin = pageWidth * 0.2;
      setMargins({
        top: Math.round(topMargin),
        right: Math.round(leftMargin),
        bottom: Math.round(topMargin),
        left: Math.round(leftMargin),
      });
    }
  };

  const handleMarginChange = (key, value) => {
    setMargins({
      ...margins,
      [key]: value ? parseInt(value) || 0 : 0,
    });
    setPreset('custom');
  };

  const handlePageToggle = (pageNum) => {
    if (selectedPages.includes(pageNum)) {
      setSelectedPages(selectedPages.filter(p => p !== pageNum));
    } else {
      setSelectedPages([...selectedPages, pageNum]);
    }
  };

  const handleCrop = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const pageCount = pdf.getPageCount();
      const pagesToCrop = applyTo === 'all'
        ? Array.from({ length: pageCount }, (_, i) => i)
        : selectedPages;

      pagesToCrop.forEach(pageIndex => {
        if (pageIndex >= 0 && pageIndex < pageCount) {
          const page = pdf.getPage(pageIndex);
          const { width, height } = page.getSize();

          const cropBox = [
            margins.left,
            margins.bottom,
            width - margins.right,
            height - margins.top,
          ];

          page.setCropBox(cropBox[0], cropBox[1], cropBox[2], cropBox[3]);
        }
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setCropped({
        url: url,
        filename: `cropped-${file.name}`,
        size: (blob.size / 1024).toFixed(2),
      });
    } catch (err) {
      setError('Failed to crop PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!cropped) return;
    const a = document.createElement('a');
    a.href = cropped.url;
    a.download = cropped.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setFile(null);
    setFileInfo(null);
    setThumbnail(null);
    setCropped(null);
    setError(null);
    setSelectedPages([]);
    setMargins({ top: 0, right: 0, bottom: 0, left: 0 });
    setPreset('custom');
  };

  if (cropped) {
    return (
      <div className="rounded-[var(--radius-card)] bg-surface border border-border space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-[var(--radius-input)] p-4">
          <p className="text-text-primary font-medium">PDF cropped successfully</p>
          <p className="text-text-secondary text-sm mt-1">
            File size: {cropped.size} KB
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleDownload} variant="primary">
            Download PDF
          </Button>
          <Button onClick={handleReset} variant="secondary">
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  if (!file || !fileInfo) {
    return (
      <div className="space-y-4">
        <PDFDropZone onFilesSelected={(files) => handleFileSelect(files[0])} />
        {error && (
          <div className="rounded-[var(--radius-input)] bg-red-50 border border-red-200 p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* File Info */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
        <h3 className="text-text-primary font-semibold mb-4">File Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Name:</span>
            <span className="text-text-primary font-mono">{fileInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Size:</span>
            <span className="text-text-primary font-mono">{fileInfo.size} KB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Pages:</span>
            <span className="text-text-primary font-mono">{fileInfo.pageCount}</span>
          </div>
        </div>
      </div>

      {/* Preview */}
      {thumbnail && (
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
          <h3 className="text-text-primary font-semibold mb-4">Preview (Page 1)</h3>
          <div className="max-w-xs mx-auto">
            <PDFThumbnail
              fileOrBytes={thumbnail.buffer}
              pageIndex={0}
            />
          </div>
        </div>
      )}

      {/* Crop Settings */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border space-y-4">
        <h3 className="text-text-primary font-semibold">Crop Margins</h3>

        {/* Preset Selector */}
        <div>
          <Select
            label="Preset"
            options={PRESET_OPTIONS}
            value={preset}
            onChange={(e) => handlePresetChange(e.target.value)}
          />
        </div>

        {/* Manual Margin Inputs */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Margin values (in points)
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Input
              type="number"
              label="Top"
              value={margins.top}
              onChange={(e) => handleMarginChange('top', e.target.value)}
              min="0"
            />
            <Input
              type="number"
              label="Right"
              value={margins.right}
              onChange={(e) => handleMarginChange('right', e.target.value)}
              min="0"
            />
            <Input
              type="number"
              label="Bottom"
              value={margins.bottom}
              onChange={(e) => handleMarginChange('bottom', e.target.value)}
              min="0"
            />
            <Input
              type="number"
              label="Left"
              value={margins.left}
              onChange={(e) => handleMarginChange('left', e.target.value)}
              min="0"
            />
          </div>
          <p className="text-xs text-text-muted mt-2">
            Page dimensions: {Math.round(pageWidth)} x {Math.round(pageHeight)} points
          </p>
        </div>

        {/* Apply To Option */}
        <div>
          <Select
            label="Apply crop to"
            options={APPLY_OPTIONS}
            value={applyTo}
            onChange={(e) => setApplyTo(e.target.value)}
          />
        </div>

        {/* Page Selection */}
        {applyTo === 'selected' && fileInfo.pageCount > 1 && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Select pages to crop
            </label>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 max-h-40 overflow-y-auto border border-border rounded-[var(--radius-input)] p-3">
              {Array.from({ length: fileInfo.pageCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageToggle(i)}
                  className={`
                    px-3 py-2 rounded-[var(--radius-input)] text-sm font-medium
                    transition-colors
                    ${selectedPages.includes(i)
                      ? 'bg-accent text-white'
                      : 'bg-surface border border-border text-text-primary hover:border-accent'
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-2">
              Selected: {selectedPages.length} page(s)
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-[var(--radius-input)] bg-red-50 border border-red-200 p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleCrop}
          disabled={isProcessing || (applyTo === 'selected' && selectedPages.length === 0)}
          variant="primary"
        >
          {isProcessing ? 'Cropping...' : 'Crop PDF'}
        </Button>
        <Button onClick={handleReset} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
