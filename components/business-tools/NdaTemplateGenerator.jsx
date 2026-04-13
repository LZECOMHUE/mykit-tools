'use client';

import { useState } from 'react';
import { downloadAsJPG } from '@/lib/download-utils';
import Button from '@/components/ui/Button';

export default function NdaTemplateGenerator() {
  const [disclosingParty, setDisclosingParty] = useState('Acme Corp Ltd');
  const [receivingParty, setReceivingParty] = useState('Your Company Name');
  const [purpose, setPurpose] = useState('potential business partnership');
  const [duration, setDuration] = useState(2);

  const generateNda = () => {
    return `
CONFIDENTIALITY AGREEMENT

This Confidentiality Agreement ("Agreement") is entered into as of ${new Date().toLocaleDateString('en-GB')} between:

DISCLOSING PARTY: ${disclosingParty}
RECEIVING PARTY: ${receivingParty}

WHEREAS, the Disclosing Party wishes to disclose certain Confidential Information to the Receiving Party for the purpose of ${purpose};

NOW IT IS AGREED:

1. CONFIDENTIAL INFORMATION
"Confidential Information" means any information disclosed by the Disclosing Party, whether orally, in writing, or in any other form, including but not limited to business plans, financial information, technical data, and trade secrets.

2. OBLIGATIONS
The Receiving Party agrees to:
(a) Keep the Confidential Information strictly confidential
(b) Not disclose it to third parties without prior written consent
(c) Use it solely for the stated purpose
(d) Take reasonable steps to protect it

3. EXCEPTIONS
Confidential Information does not include information that is:
(a) Already in the public domain
(b) Independently developed without use of the Confidential Information
(c) Legally required to be disclosed by law or court order

4. TERM
This Agreement shall remain in effect for ${duration} year(s) from the date of disclosure.

5. RETURN OF INFORMATION
Upon request, the Receiving Party shall return or destroy all Confidential Information.

6. NO LICENSE
This Agreement grants no license or rights to the Confidential Information.

7. DISCLAIMERS
The Confidential Information is provided "as is" without warranty of any kind.

8. GOVERNING LAW
This Agreement shall be governed by the laws of England and Wales.

9. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties.

---

DISCLAIMER: This is a template for reference only. This is NOT legal advice. Before using this agreement, you should consult with a qualified solicitor or lawyer to ensure it meets your specific needs and complies with applicable law.

Signatures:

For ${disclosingParty}:
_____________________
Signature
_____________________
Print Name
_____________________
Date

For ${receivingParty}:
_____________________
Signature
_____________________
Print Name
_____________________
Date
    `.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateNda().catch(() => {}));
  };

  const handleDownloadJPG = () => {
    const ndaText = generateNda();

    downloadAsJPG({
      filename: `nda-${disclosingParty.replace(/\s+/g, '-').toLowerCase()}.jpg`,
      width: 700,
      height: 1000,
      title: 'NDA Template',
      subtitle: 'Confidentiality Agreement',
      accentColor: '#2563eb',
      render: (ctx, area) => {
        ctx.fillStyle = '#1a1a1a';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        const lines = ndaText.split('\n');
        let y = area.y;
        const maxLines = Math.floor(area.height / 14);
        let lineCount = 0;

        lines.forEach((line) => {
          if (lineCount >= maxLines - 2) return;

          if (line.trim().length === 0) {
            y += 8;
            lineCount++;
          } else {
            const words = line.split(' ');
            let currentLine = '';

            words.forEach((word) => {
              const testLine = currentLine + (currentLine ? ' ' : '') + word;
              const metrics = ctx.measureText(testLine);

              if (metrics.width > area.width - 16 && currentLine) {
                if (lineCount >= maxLines - 2) return;
                ctx.fillText(currentLine, area.x + 8, y);
                y += 12;
                lineCount++;
                currentLine = word;
              } else {
                currentLine = testLine;
              }
            });

            if (currentLine && lineCount < maxLines - 2) {
              ctx.fillText(currentLine, area.x + 8, y);
              y += 12;
              lineCount++;
            }
          }
        });
      },
    });
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Disclosing Party (Company Name)
          </label>
          <input
            type="text"
            value={disclosingParty}
            onChange={(e) => setDisclosingParty(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Receiving Party (Company Name)
          </label>
          <input
            type="text"
            value={receivingParty}
            onChange={(e) => setReceivingParty(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Purpose
          </label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g., business partnership, job interview, acquisition discussion"
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Duration (Years)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          NDA Template Preview
        </h3>

        <pre className="bg-surface rounded-[var(--radius-input)] p-4 text-xs overflow-auto max-h-96 font-mono text-text-secondary whitespace-pre-wrap">
          {generateNda()}
        </pre>

        <div className="flex gap-3 mt-4">
          <button
            onClick={copyToClipboard}
            className="flex-1 px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700"
          >
            Copy to Clipboard
          </button>
          <Button
            onClick={handleDownloadJPG}
            variant="secondary"
            className="flex-1"
          >
            Download JPG
          </Button>
        </div>
      </div>

      <div className="bg-red-100 border border-error border-opacity-20 rounded-[var(--radius-input)] p-4">
        <p className="text-sm font-medium text-error mb-1">IMPORTANT DISCLAIMER</p>
        <p className="text-sm text-text-secondary">
          This is a generic template for reference only. This is NOT legal advice. Always consult with a qualified solicitor before using any legal agreement, as NDA laws vary by jurisdiction and your specific situation may require customization.
        </p>
      </div>
    </div>
  );
}
