'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PDFDropZone from './PDFDropZone';

export default function ProtectPDF() {
  const [pdf, setPdf] = useState(null);
  const [fileName, setFileName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [allowPrinting, setAllowPrinting] = useState(true);
  const [allowCopying, setAllowCopying] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePdfUpload = (files) => {
    setError('');
    setSuccess(false);
    if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setPdf(e.target.result);
      setFileName(file.name.replace('.pdf', ''));
    };

    reader.onerror = () => {
      setError('Failed to read PDF file. Please try again.');
    };

    reader.readAsArrayBuffer(file);
  };

  const handleProtect = async () => {
    setError('');
    setSuccess(false);

    if (!pdf) {
      setError('Please upload a PDF first.');
      return;
    }

    if (!password) {
      setError('Please enter a password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.load(pdf);

      const ownerPassword = password;
      const userPassword = '';

      const encryptionOptions = {
        userPassword,
        ownerPassword,
        permissions: {
          printing: allowPrinting ? 'highResolution' : 'none',
          copying: allowCopying,
          modifying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: true,
          documentAssembly: false,
        },
      };

      pdfDoc.encrypt(encryptionOptions);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}-protected.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccess(true);
      setPdf(null);
      setPassword('');
      setConfirmPassword('');
      setFileName('');
    } catch (err) {
      setError(`Protection failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Upload Section */}
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Upload PDF
          </h2>
          <PDFDropZone
            onFilesSelected={handlePdfUpload}
            accept=".pdf"
            maxSizeMB={50}
          />
          {pdf && (
            <div className="mt-4 p-3 bg-white border border-border rounded-[var(--radius-input)] text-text-secondary text-sm">
              File loaded: <span className="font-medium">{fileName}.pdf</span>
            </div>
          )}
        </div>

        {/* Password Section */}
        {pdf && (
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Set Password
            </h2>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-text-primary text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-text-secondary hover:text-text-primary text-sm"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="text-text-muted text-xs mt-1">
                Minimum 4 characters required
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="block text-text-primary text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 text-text-secondary hover:text-text-primary text-sm"
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Permissions Section */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-text-primary font-medium text-sm mb-3">
                Permissions
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowPrinting}
                    onChange={(e) => setAllowPrinting(e.target.checked)}
                    className="w-4 h-4 accent-accent rounded"
                  />
                  <span className="text-text-primary text-sm">
                    Allow printing
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowCopying}
                    onChange={(e) => setAllowCopying(e.target.checked)}
                    className="w-4 h-4 accent-accent rounded"
                  />
                  <span className="text-text-primary text-sm">
                    Allow copying text
                  </span>
                </label>
              </div>
              <p className="text-text-muted text-xs mt-3">
                All other modifications (editing, annotating, forms) are disabled
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-[var(--radius-card)] bg-red-50 border border-red-200 p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="rounded-[var(--radius-card)] bg-green-50 border border-green-200 p-4">
            <p className="text-green-800 text-sm">
              PDF protected successfully and downloaded
            </p>
          </div>
        )}

        {/* Action Button */}
        {pdf && (
          <Button
            onClick={handleProtect}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Protecting...' : 'Protect PDF'}
          </Button>
        )}
      </div>
    </div>
  );
}
