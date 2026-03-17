'use client';

import { useState, useRef, useCallback } from 'react';

export default function PDFDropZone({
  onFilesSelected,
  multiple = false,
  accept = '.pdf',
  label,
  description,
  maxSizeMB = 100,
  children,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const defaultLabel = multiple ? 'Drop PDF files here' : 'Drop your PDF here';
  const defaultDesc = multiple
    ? 'or click to choose files'
    : 'or click to choose a file';

  const validateFiles = useCallback(
    (files) => {
      const maxBytes = maxSizeMB * 1024 * 1024;
      const valid = [];
      for (const file of files) {
        if (!file.name.toLowerCase().endsWith('.pdf') && accept === '.pdf') {
          setError(`"${file.name}" is not a PDF file`);
          return null;
        }
        if (accept === 'image/*' && !file.type.startsWith('image/')) {
          setError(`"${file.name}" is not an image file`);
          return null;
        }
        if (file.size > maxBytes) {
          setError(`"${file.name}" exceeds the ${maxSizeMB}MB limit`);
          return null;
        }
        valid.push(file);
      }
      return valid;
    },
    [maxSizeMB, accept]
  );

  const handleFiles = useCallback(
    (fileList) => {
      setError(null);
      const files = Array.from(fileList);
      if (!multiple && files.length > 1) {
        setError('Please select only one file');
        return;
      }
      const valid = validateFiles(files);
      if (valid && valid.length > 0) {
        onFilesSelected(valid);
      }
    },
    [multiple, validateFiles, onFilesSelected]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
    }
  };

  // If children are provided (files already loaded), render those instead
  if (children) {
    return children;
  }

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full min-h-[280px] rounded-[var(--radius-card)] border-2 border-dashed cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-accent bg-accent/5 scale-[1.01]'
            : 'border-border hover:border-accent/50 hover:bg-surface'
        }`}
      >
        {/* Upload icon */}
        <div className={`mb-4 transition-colors ${isDragging ? 'text-accent' : 'text-text-muted'}`}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <polyline points="9 15 12 12 15 15" />
          </svg>
        </div>

        <p className="text-base font-medium text-text-primary mb-1">
          {label || defaultLabel}
        </p>
        <p className="text-sm text-text-muted">
          {description || defaultDesc}
        </p>
        <p className="text-xs text-text-muted mt-2">
          Max file size: {maxSizeMB}MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-error text-center">{error}</p>
      )}
    </div>
  );
}
