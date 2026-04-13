'use client';

import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import PDFDropZone from './PDFDropZone';

export default function PDFtoJPG() {
  const [pdf, setPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [format, setFormat] = useState('jpg');
  const [quality, setQuality] = useState('high');
  const [scale, setScale] = useState('2x');
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(null);
  const [images, setImages] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const canvasRef = useRef(null);

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setPdfFile(file);
    setImages([]);
    setProgress(null);

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;

      setPdf(pdfDoc);
      setPageCount(pdfDoc.numPages);
    } catch (error) {
      console.error('Error loading PDF:', error);
      alert('Error loading PDF. Please try again.');
    }
  };

  const getQualityValue = () => {
    switch (quality) {
      case 'low':
        return 0.6;
      case 'medium':
        return 0.75;
      case 'high':
        return 0.9;
      case 'maximum':
        return 1.0;
      default:
        return 0.9;
    }
  };

  const getScaleValue = () => {
    switch (scale) {
      case '1x':
        return 1;
      case '1.5x':
        return 1.5;
      case '2x':
        return 2;
      case '3x':
        return 3;
      default:
        return 2;
    }
  };

  const convertAllPages = async () => {
    if (!pdf) return;

    setConverting(true);
    setImages([]);
    const convertedImages = [];
    const scaleValue = getScaleValue();
    const qualityValue = getQualityValue();

    try {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setProgress({ current: pageNum, total: pdf.numPages });

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: scaleValue });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const imageData = canvas.toDataURL(
          format === 'jpg' ? 'image/jpeg' : 'image/png',
          qualityValue
        );

        convertedImages.push({
          id: pageNum,
          data: imageData,
          pageNum: pageNum,
        });
      }

      setImages(convertedImages);
      setProgress(null);
    } catch (error) {
      console.error('Error converting PDF:', error);
      alert('Error converting PDF pages. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  const downloadImage = (image) => {
    const link = document.createElement('a');
    link.href = image.data;
    link.download = `${pdfFile.name.replace('.pdf', '')}_page_${image.pageNum}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllImages = () => {
    images.forEach((image) => {
      setTimeout(() => {
        downloadImage(image);
      }, 100);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {!pdfFile ? (
        <PDFDropZone onFilesSelected={handleFileSelect} />
      ) : (
        <>
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-text-primary font-semibold">{pdfFile.name}</p>
                <p className="text-text-secondary text-sm mt-1">
                  {pageCount} page{pageCount !== 1 ? 's' : ''} - {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  setPdf(null);
                  setPdfFile(null);
                  setImages([]);
                  setProgress(null);
                }}
              >
                Choose Different File
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Output Format
                </label>
                <Select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  options={[
                    { value: 'jpg', label: 'JPG (Smaller size)' },
                    { value: 'png', label: 'PNG (Lossless)' },
                  ]}
                />
              </div>

              {format === 'jpg' && (
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Quality
                  </label>
                  <Select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    options={[
                      { value: 'low', label: 'Low (Smallest)' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High (Recommended)' },
                      { value: 'maximum', label: 'Maximum (Largest)' },
                    ]}
                  />
                </div>
              )}

              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Resolution Scale
                </label>
                <Select
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  options={[
                    { value: '1x', label: '1x (Screen)' },
                    { value: '1.5x', label: '1.5x' },
                    { value: '2x', label: '2x (Print friendly)' },
                    { value: '3x', label: '3x (Maximum detail)' },
                  ]}
                />
              </div>
            </div>

            <Button
              onClick={convertAllPages}
              disabled={converting}
              className="w-full"
            >
              {converting && progress ? `Converting page ${progress.current} of ${progress.total}...` : 'Convert All Pages'}
            </Button>
          </div>

          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-text-primary font-semibold">
                  Converted: {images.length} image{images.length !== 1 ? 's' : ''}
                </p>
                <Button
                  variant="primary"
                  onClick={downloadAllImages}
                >
                  Download All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="bg-surface border border-border rounded-[var(--radius-card)] overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={image.data}
                        alt={`Page ${image.pageNum}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 border-t border-border">
                      <p className="text-text-secondary text-sm mb-2">
                        Page {image.pageNum}
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => downloadImage(image)}
                        className="w-full text-sm py-2"
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
