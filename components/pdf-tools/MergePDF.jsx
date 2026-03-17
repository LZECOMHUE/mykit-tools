'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Button from '@/components/ui/Button';
import PDFDropZone from './PDFDropZone';
import PDFThumbnail from './PDFThumbnail';

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mergedPDF, setMergedPDF] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleFilesAdded = async (newFiles) => {
    const filesWithData = await Promise.all(
      newFiles.map(async (file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        pageCount: await getPageCount(file),
        preview: null,
      }))
    );
    setFiles((prev) => [...prev, ...filesWithData]);
  };

  const getPageCount = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      return pdf.getPageCount();
    } catch (error) {
      console.error('Error reading PDF:', error);
      return 0;
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    if (direction === 'up' && index > 0) {
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    }
    setFiles(newFiles);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex) => {
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      return;
    }

    const newFiles = [...files];
    const draggedFile = newFiles[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newFiles.splice(targetIndex, 0, draggedFile);
    setFiles(newFiles);
    setDraggedIndex(null);
  };

  const handleMergePDF = async () => {
    if (files.length === 0) return;

    setIsLoading(true);
    try {
      const mergedDoc = await PDFDocument.create();

      for (const fileData of files) {
        const arrayBuffer = await fileData.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedDoc.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedDoc.addPage(page));
      }

      const pdfBytes = await mergedDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setMergedPDF({
        url,
        fileName: `merged_${Date.now()}.pdf`,
        size: blob.size,
      });
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Error merging PDFs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (mergedPDF) {
      const link = document.createElement('a');
      link.href = mergedPDF.url;
      link.download = mergedPDF.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleStartOver = () => {
    setFiles([]);
    setMergedPDF(null);
    setDraggedIndex(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  if (mergedPDF) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-[var(--radius-card)] bg-surface p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent bg-opacity-10">
          <span className="text-2xl">✓</span>
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-text-primary">
            PDFs merged successfully
          </h3>
          <p className="mt-1 text-text-secondary">
            Your merged PDF is ready to download
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleDownload} variant="primary">
            Download PDF
          </Button>
          <Button onClick={handleStartOver} variant="secondary">
            Start over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {files.length === 0 ? (
        <PDFDropZone onFilesSelected={handleFilesAdded} multiple={true} />
      ) : (
        <>
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-text-primary">
              Files to merge ({files.length})
            </h3>
            <div className="space-y-3">
              {files.map((fileData, index) => (
                <div
                  key={fileData.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className={`flex items-center gap-4 rounded-[var(--radius-card)] border border-border p-4 transition-colors ${
                    draggedIndex === index ? 'bg-accent bg-opacity-5' : 'bg-white'
                  }`}
                >
                  <PDFThumbnail fileOrBytes={fileData.file} width={60} />

                  <div className="flex-1 text-left">
                    <p className="font-medium text-text-primary">
                      {fileData.name}
                    </p>
                    <p className="text-sm text-text-muted">
                      {fileData.pageCount} {fileData.pageCount === 1 ? 'page' : 'pages'} {' '}
                      · {formatFileSize(fileData.size)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-input)] border border-border hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Move up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-input)] border border-border hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Move down"
                    >
                      ↓
                    </button>
                    <Button
                      onClick={() => removeFile(fileData.id)}
                      variant="secondary"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                document.querySelector('[data-testid="pdf-drop-zone"]')?.click();
              }}
              variant="secondary"
            >
              Add more files
            </Button>
            <Button
              onClick={handleMergePDF}
              disabled={files.length < 2 || isLoading}
              className="flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Merging...
                </>
              ) : (
                `Merge ${files.length} PDF${files.length !== 1 ? 's' : ''}`
              )}
            </Button>
          </div>

          <PDFDropZone onFilesSelected={handleFilesAdded} multiple={true} variant="secondary" />
        </>
      )}
    </div>
  );
}
