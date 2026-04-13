'use client';

import { useState } from 'react';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import PDFDropZone from './PDFDropZone';
import PDFThumbnail from './PDFThumbnail';

export default function WatermarkPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkText, setWatermarkText] = useState('DRAFT');
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(40);
  const [rotation, setRotation] = useState(45);
  const [color, setColor] = useState('grey');
  const [position, setPosition] = useState('center');
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

  const getColorRGB = () => {
    const opacityValue = opacity / 100;
    switch (color) {
      case 'red':
        return rgb(1, 0, 0, opacityValue);
      case 'blue':
        return rgb(0, 0, 1, opacityValue);
      case 'grey':
      default:
        return rgb(0.5, 0.5, 0.5, opacityValue);
    }
  };

  const handleAddWatermark = async () => {
    if (!pdfFile || !watermarkText.trim()) {
      alert('Please enter watermark text');
      return;
    }

    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.load(pdfFile.arrayBuffer);
      const pages = pdfDoc.getPages();
      const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const colorRGB = getColorRGB();

      pages.forEach((page) => {
        const { width, height } = page.getSize();

        if (position === 'center') {
          const textWidth = helvetica.widthOfTextAtSize(watermarkText, fontSize);
          const x = (width - textWidth) / 2;
          const y = height / 2;

          page.drawText(watermarkText, {
            x,
            y,
            size: fontSize,
            font: helvetica,
            color: colorRGB,
            rotate: degrees(rotation),
          });
        } else if (position === 'tiled') {
          const textWidth = helvetica.widthOfTextAtSize(watermarkText, fontSize);
          const textHeight = fontSize;
          const spacing = Math.max(textWidth, textHeight) * 1.5;

          let xPos = 0;
          while (xPos < width + textWidth) {
            let yPos = 0;
            while (yPos < height + textHeight) {
              page.drawText(watermarkText, {
                x: xPos,
                y: yPos,
                size: fontSize,
                font: helvetica,
                color: colorRGB,
                rotate: degrees(rotation),
              });
              yPos += spacing;
            }
            xPos += spacing;
          }
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `watermarked-${pdfFile.file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to add watermark. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {!pdfFile ? (
        <PDFDropZone onFilesSelected={(files) => handlePdfUpload(files[0])} />
      ) : (
        <>
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
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

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-4">
            <h3 className="text-text-primary font-semibold">Configuration</h3>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Watermark Text
              </label>
              <Input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="e.g. CONFIDENTIAL, DRAFT"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Font Size: {fontSize}px
              </label>
              <Input
                type="range"
                min="24"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Opacity: {opacity}%
              </label>
              <Input
                type="range"
                min="10"
                max="80"
                step="5"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Rotation Angle
              </label>
              <Select
                value={rotation.toString()}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                options={[
                  { value: '0', label: '0 degrees' },
                  { value: '30', label: '30 degrees' },
                  { value: '45', label: '45 degrees' },
                  { value: '60', label: '60 degrees' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Colour
              </label>
              <Select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                options={[
                  { value: 'grey', label: 'Grey' },
                  { value: 'red', label: 'Red' },
                  { value: 'blue', label: 'Blue' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Position
              </label>
              <Select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                options={[
                  { value: 'center', label: 'Center' },
                  { value: 'tiled', label: 'Tiled (grid)' },
                ]}
              />
            </div>

            <Button
              onClick={handleAddWatermark}
              disabled={isProcessing || !watermarkText.trim()}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : 'Add Watermark'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
