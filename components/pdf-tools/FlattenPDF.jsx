'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PDFDropZone from './PDFDropZone';
import PDFThumbnail from './PDFThumbnail';

export default function FlattenPDF() {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [flattened, setFlattened] = useState(null);

  const handleFileSelect = async (selectedFile) => {
    setError(null);
    setFile(selectedFile);
    setFlattened(null);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const pageCount = pdf.getPageCount();
      const form = pdf.getForm();
      const hasFormFields = form.getFields().length > 0;

      setFileInfo({
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2),
        pageCount: pageCount,
        hasFormFields: hasFormFields,
      });

      // Generate thumbnail of first page
      const firstPageNum = 0;
      const pdfBytes = await pdf.save();
      setThumbnail({
        buffer: pdfBytes,
        pageNumber: firstPageNum,
      });
    } catch (err) {
      setError('Failed to load PDF. Please check the file and try again.');
      setFile(null);
      setFileInfo(null);
      setThumbnail(null);
    }
  };

  const handleFlatten = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const form = pdf.getForm();

      if (form.getFields().length > 0) {
        form.flatten();
      }

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setFlattened({
        url: url,
        filename: `flattened-${file.name}`,
        size: (blob.size / 1024).toFixed(2),
      });
    } catch (err) {
      setError('Failed to flatten PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!flattened) return;
    const a = document.createElement('a');
    a.href = flattened.url;
    a.download = flattened.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setFile(null);
    setFileInfo(null);
    setThumbnail(null);
    setFlattened(null);
    setError(null);
  };

  if (flattened) {
    return (
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-6 space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-[var(--radius-input)] p-4">
          <p className="text-text-primary font-medium">PDF flattened successfully</p>
          <p className="text-text-secondary text-sm mt-1">
            File size: {flattened.size} KB
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
    <div className="space-y-6">
      {/* File Info Card */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-6">
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
          <div className="flex justify-between">
            <span className="text-text-secondary">Form fields:</span>
            <span className="text-text-primary font-mono">
              {fileInfo.hasFormFields ? 'Yes' : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Preview */}
      {thumbnail && (
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-6">
          <h3 className="text-text-primary font-semibold mb-4">Preview</h3>
          <div className="max-w-xs mx-auto">
            <PDFThumbnail
              fileOrBytes={thumbnail.buffer}
              pageIndex={thumbnail.pageNumber}
            />
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="rounded-[var(--radius-card)] bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm text-text-primary">
          <strong>What does flattening do?</strong> Flattens form fields and annotations into static content. The resulting PDF will look the same but form fields can no longer be edited.
        </p>
      </div>

      {/* Action Buttons */}
      {error && (
        <div className="rounded-[var(--radius-input)] bg-red-50 border border-red-200 p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          onClick={handleFlatten}
          disabled={isProcessing}
          variant="primary"
        >
          {isProcessing ? 'Flattening...' : 'Flatten PDF'}
        </Button>
        <Button onClick={handleReset} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
