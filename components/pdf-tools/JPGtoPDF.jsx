'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import PDFDropZone from './PDFDropZone';

export default function JPGtoPDF() {
  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState('a4');
  const [orientation, setOrientation] = useState('auto');
  const [margin, setMargin] = useState('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  const pageSizeOptions = [
    { value: 'a4', label: 'A4 (210 x 297 mm)' },
    { value: 'letter', label: 'Letter (8.5 x 11 in)' },
    { value: 'fit', label: 'Fit to Image' },
  ];

  const orientationOptions = [
    { value: 'auto', label: 'Auto (detect)' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'landscape', label: 'Landscape' },
  ];

  const marginOptions = [
    { value: 'none', label: 'No Margin' },
    { value: 'small', label: 'Small (5mm)' },
    { value: 'medium', label: 'Medium (10mm)' },
  ];

  const getMarginValue = () => {
    const marginMap = { none: 0, small: 14.17, medium: 28.35 };
    return marginMap[margin] || 0;
  };

  const handleImagesUpload = (files) => {
    setError('');
    const validFiles = Array.from(files).filter((file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        setError('Only image files are supported');
      }
      return isImage;
    });

    const newImages = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: Math.random(),
            data: e.target.result,
            name: file.name,
            type: file.type,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then((loadedImages) => {
      setImages((prev) => [...prev, ...loadedImages]);
    });
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    setImages(newImages);
    setDraggedIndex(null);
  };

  const getPageDimensions = (imgWidth, imgHeight) => {
    const margins = getMarginValue();

    let pageWidth, pageHeight;

    if (pageSize === 'a4') {
      pageWidth = 595.28;
      pageHeight = 841.89;
    } else if (pageSize === 'letter') {
      pageWidth = 612;
      pageHeight = 792;
    } else {
      const imgAspect = imgWidth / imgHeight;
      if (orientation === 'portrait' || (orientation === 'auto' && imgAspect <= 1)) {
        pageHeight = 841.89;
        pageWidth = pageHeight * imgAspect;
      } else {
        pageWidth = 841.89;
        pageHeight = pageWidth / imgAspect;
      }
      return { pageWidth, pageHeight, margins };
    }

    if (orientation === 'landscape') {
      [pageWidth, pageHeight] = [pageHeight, pageWidth];
    } else if (orientation === 'auto') {
      const imgAspect = imgWidth / imgHeight;
      const pageAspect = pageWidth / pageHeight;
      if (imgAspect > pageAspect) {
        [pageWidth, pageHeight] = [pageHeight, pageWidth];
      }
    }

    return { pageWidth, pageHeight, margins };
  };

  const handleCreatePDF = async () => {
    setError('');

    if (images.length === 0) {
      setError('Please upload at least one image.');
      return;
    }

    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const image of images) {
        const img = new Image();
        img.src = image.data;

        await new Promise((resolve) => {
          img.onload = async () => {
            const { pageWidth, pageHeight, margins } = getPageDimensions(
              img.width,
              img.height
            );

            const page = pdfDoc.addPage([pageWidth, pageHeight]);

            let embeddedImage;
            if (image.type === 'image/jpeg') {
              embeddedImage = await pdfDoc.embedJpg(image.data);
            } else if (image.type === 'image/png') {
              embeddedImage = await pdfDoc.embedPng(image.data);
            } else {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              const pngData = canvas.toDataURL('image/png');
              embeddedImage = await pdfDoc.embedPng(pngData);
            }

            const availableWidth = pageWidth - margins * 2;
            const availableHeight = pageHeight - margins * 2;

            let imgWidth = availableWidth;
            let imgHeight = (availableWidth / img.width) * img.height;

            if (imgHeight > availableHeight) {
              imgHeight = availableHeight;
              imgWidth = (availableHeight / img.height) * img.width;
            }

            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;

            page.drawImage(embeddedImage, {
              x,
              y,
              width: imgWidth,
              height: imgHeight,
            });

            resolve();
          };
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `images-to-pdf.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setImages([]);
    } catch (err) {
      setError(`PDF creation failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-6">
        {/* Upload Section */}
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Upload Images
          </h2>
          <PDFDropZone
            onFilesSelected={handleImagesUpload}
            accept="image/*"
            multiple
            label="Drop your images here"
            description="or click to choose files"
          />
        </div>

        {/* Images Preview Section */}
        {images.length > 0 && (
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Images ({images.length})
            </h2>
            <p className="text-text-secondary text-sm mb-4">
              Drag to reorder images
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className={`relative rounded-[var(--radius-input)] overflow-hidden border-2 cursor-move transition-all ${
                    draggedIndex === index
                      ? 'border-accent opacity-50'
                      : 'border-border hover:border-accent'
                  }`}
                >
                  <img
                    src={image.data}
                    alt={image.name}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600"
                  >
                    X
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-xs p-1 text-center truncate">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Configuration Section */}
        {images.length > 0 && (
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 space-y-4">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              PDF Settings
            </h2>

            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                Page Size
              </label>
              <Select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                options={pageSizeOptions}
              />
            </div>

            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                Orientation
              </label>
              <Select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                options={orientationOptions}
              />
            </div>

            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                Margin
              </label>
              <Select
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                options={marginOptions}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-[var(--radius-card)] bg-red-50 border border-red-200 p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Action Button */}
        {images.length > 0 && (
          <Button
            onClick={handleCreatePDF}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Creating PDF...' : 'Create PDF'}
          </Button>
        )}
      </div>
    </div>
  );
}
