'use client';

import { useState, useRef, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateInvoicePDF } from '@/lib/worksheet-pdf';

const CURRENCIES = [
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

const PAYMENT_TERMS = [
  { value: 15, label: 'Net 15' },
  { value: 30, label: 'Net 30' },
  { value: 60, label: 'Net 60' },
  { value: 90, label: 'Net 90' },
];

export default function InvoiceGenerator() {
  const [currency, setCurrency] = useState('GBP');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [paymentTerms, setPaymentTerms] = useState(30);

  // Business Details
  const [businessName, setBusinessName] = useState('Your Company Name');
  const [businessAddress, setBusinessAddress] = useState('123 Business Street');
  const [businessEmail, setBusinessEmail] = useState('hello@company.com');
  const [businessPhone, setBusinessPhone] = useState('+44 (0)123 456 7890');
  const [logoUrl, setLogoUrl] = useState('');

  // Client Details
  const [clientName, setClientName] = useState('Client Name');
  const [clientAddress, setClientAddress] = useState('456 Client Avenue');
  const [clientEmail, setClientEmail] = useState('contact@client.com');

  // Line Items
  const [lineItems, setLineItems] = useState([
    { id: 1, description: 'Design Services', quantity: 10, unitPrice: 75 },
    { id: 2, description: 'Development', quantity: 20, unitPrice: 85 },
  ]);
  const [nextItemId, setNextItemId] = useState(3);

  // Totals
  const [taxRate, setTaxRate] = useState(20);
  const [discountType, setDiscountType] = useState('percentage'); // 'percentage' or 'fixed'
  const [discountValue, setDiscountValue] = useState(0);
  const [notes, setNotes] = useState(
    'Thank you for your business! Payment is due by the due date.'
  );

  const canvasRef = useRef(null);
  const currencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol || '£';

  // Calculate totals
  const calculations = useMemo(() => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0),
      0
    );

    let discount = 0;
    if (discountType === 'percentage') {
      discount = (subtotal * parseFloat(discountValue)) / 100 || 0;
    } else {
      discount = parseFloat(discountValue) || 0;
    }

    const afterDiscount = subtotal - discount;
    const taxAmount = (afterDiscount * parseFloat(taxRate)) / 100 || 0;
    const total = afterDiscount + taxAmount;

    // Calculate due date
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + paymentTerms);

    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      afterDiscount: afterDiscount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      total: total.toFixed(2),
      dueDate: dueDate.toISOString().split('T')[0],
    };
  }, [lineItems, taxRate, discountType, discountValue, invoiceDate, paymentTerms]);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: nextItemId,
        description: '',
        quantity: 1,
        unitPrice: 0,
      },
    ]);
    setNextItemId(nextItemId + 1);
  };

  const removeLineItem = (id) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (id, field, value) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const downloadAsPDF = () => {
    generateInvoicePDF({
      invoiceNumber,
      invoiceDate,
      paymentTerms: `Net ${paymentTerms}`,
      currency,
      businessName,
      businessAddress,
      businessEmail,
      businessPhone,
      clientName,
      clientAddress,
      clientEmail,
      lineItems,
      taxRate,
      discountType,
      discountValue,
      notes,
    });
  };

  const formatCurrency = (value) => {
    return `${currencySymbol}${parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Metadata */}
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Invoice Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Payment Terms
                </label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                >
                  {PAYMENT_TERMS.map((term) => (
                    <option key={term.value} value={term.value}>
                      {term.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Business Details */}
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Your Business
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Logo URL (optional)
                </label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                />
                {logoUrl && (
                  <div className="mt-2">
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="h-12 object-contain"
                      onError={() => setLogoUrl('')}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Client Details */}
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Bill To
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                />
              </div>
            </div>
          </Card>

          {/* Line Items */}
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Line Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-medium text-text-secondary py-2 px-2">
                      Description
                    </th>
                    <th className="text-right font-medium text-text-secondary py-2 px-2 w-20">
                      Qty
                    </th>
                    <th className="text-right font-medium text-text-secondary py-2 px-2 w-24">
                      Unit Price
                    </th>
                    <th className="text-right font-medium text-text-secondary py-2 px-2 w-24">
                      Total
                    </th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => {
                    const lineTotal =
                      (parseFloat(item.quantity) || 0) *
                      (parseFloat(item.unitPrice) || 0);
                    return (
                      <tr
                        key={item.id}
                        className="border-b border-border hover:bg-surface transition-colors"
                      >
                        <td className="py-3 px-2">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) =>
                              updateLineItem(item.id, 'description', e.target.value)
                            }
                            placeholder="Item description"
                            className="w-full px-2 py-1 border border-border rounded text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent focus:ring-opacity-20 transition-colors"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateLineItem(item.id, 'quantity', e.target.value)
                            }
                            min="0"
                            step="0.5"
                            className="w-full px-2 py-1 border border-border rounded text-right text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent focus:ring-opacity-20 transition-colors font-mono text-sm"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateLineItem(item.id, 'unitPrice', e.target.value)
                            }
                            min="0"
                            step="0.01"
                            className="w-full px-2 py-1 border border-border rounded text-right text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent focus:ring-opacity-20 transition-colors font-mono text-sm"
                          />
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-text-primary">
                          {formatCurrency(lineTotal)}
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => removeLineItem(item.id)}
                            disabled={lineItems.length === 1}
                            className="text-error hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed p-1 rounded transition-colors"
                            title="Remove item"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Button
              onClick={addLineItem}
              variant="secondary"
              size="md"
              className="mt-4 w-full sm:w-auto"
            >
              + Add Line Item
            </Button>
          </Card>

          {/* Totals & Discounts */}
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Amounts
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-text-secondary">
                <span>Subtotal</span>
                <span className="font-mono text-text-primary">
                  {formatCurrency(calculations.subtotal)}
                </span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Discount Type
                    </label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Discount Value
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        min="0"
                        step={discountType === 'percentage' ? 0.1 : 0.01}
                        className="flex-1 px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors font-mono"
                      />
                      <span className="text-text-secondary font-medium">
                        {discountType === 'percentage' ? '%' : currencySymbol}
                      </span>
                    </div>
                  </div>
                </div>

                {parseFloat(discountValue) > 0 && (
                  <div className="flex justify-between items-center text-text-secondary mb-4">
                    <span>Discount</span>
                    <span className="font-mono text-error">
                      -{formatCurrency(calculations.discount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-text-secondary">
                  <span>After Discount</span>
                  <span className="font-mono text-text-primary">
                    {formatCurrency(calculations.afterDiscount)}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm font-medium text-text-secondary">
                    Tax Rate
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-20 px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors font-mono text-sm"
                    />
                    <span className="text-text-secondary">%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-text-secondary mb-4">
                  <span>
                    Tax ({parseFloat(taxRate).toFixed(1)}%)
                  </span>
                  <span className="font-mono text-text-primary">
                    {formatCurrency(calculations.taxAmount)}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4 bg-accent bg-opacity-10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-text-primary">
                    Total Due
                  </span>
                  <span className="text-2xl font-mono font-bold text-accent">
                    {formatCurrency(calculations.total)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Notes & Terms
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              placeholder="Add payment instructions, thanks message, or terms here..."
              className="w-full px-3 py-2 border border-border rounded-lg text-text-primary bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 transition-colors text-sm"
            />
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:col-span-1 space-y-4">
          <div className="sticky top-6">
            <Card padding={false} className="overflow-hidden">
              {/* Invoice Preview */}
              <div
                id="invoice-preview"
                className="bg-white p-4 sm:p-6 space-y-4 text-sm"
                style={{
                  minWidth: '100%',
                  aspectRatio: '8.5 / 11',
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-start border-b border-border pb-3">
                  <div>
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="h-8 object-contain mb-2"
                      />
                    )}
                    <h2 className="text-lg font-bold text-text-primary">
                      {businessName}
                    </h2>
                  </div>
                  <div className="text-right">
                    <h1 className="text-2xl font-bold text-accent">INVOICE</h1>
                    <p className="text-xs text-text-muted">{invoiceNumber}</p>
                  </div>
                </div>

                {/* Company Details & Invoice Info */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-text-secondary mb-1">
                      From
                    </p>
                    <p className="text-text-primary">{businessName}</p>
                    <p className="text-text-muted">{businessAddress}</p>
                    <p className="text-text-muted">{businessEmail}</p>
                    <p className="text-text-muted">{businessPhone}</p>
                  </div>
                  <div className="text-right">
                    <div className="mb-3">
                      <p className="font-semibold text-text-secondary">
                        Invoice Date
                      </p>
                      <p className="text-text-primary">
                        {formatDate(invoiceDate)}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-secondary">
                        Due Date
                      </p>
                      <p className="text-text-primary">
                        {formatDate(calculations.dueDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bill To */}
                <div className="border-t border-border pt-3">
                  <p className="font-semibold text-text-secondary mb-1 text-xs">
                    Bill To
                  </p>
                  <p className="text-text-primary font-medium">{clientName}</p>
                  <p className="text-text-muted">{clientAddress}</p>
                  <p className="text-text-muted">{clientEmail}</p>
                </div>

                {/* Line Items Table */}
                <div className="border-t border-border pt-2">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left font-semibold text-text-secondary py-1">
                          Description
                        </th>
                        <th className="text-right font-semibold text-text-secondary py-1 w-12">
                          Qty
                        </th>
                        <th className="text-right font-semibold text-text-secondary py-1 w-16">
                          Rate
                        </th>
                        <th className="text-right font-semibold text-text-secondary py-1 w-16">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {lineItems.map((item) => {
                        const lineTotal =
                          (parseFloat(item.quantity) || 0) *
                          (parseFloat(item.unitPrice) || 0);
                        return (
                          <tr key={item.id} className="border-b border-border">
                            <td className="py-1 text-text-primary">
                              {item.description}
                            </td>
                            <td className="py-1 text-right font-mono text-text-primary">
                              {parseFloat(item.quantity).toFixed(1)}
                            </td>
                            <td className="py-1 text-right font-mono text-text-primary">
                              {formatCurrency(item.unitPrice)}
                            </td>
                            <td className="py-1 text-right font-mono text-text-primary">
                              {formatCurrency(lineTotal)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-2 space-y-1 text-xs">
                  <div className="flex justify-end gap-4">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="w-20 text-right font-mono text-text-primary">
                      {formatCurrency(calculations.subtotal)}
                    </span>
                  </div>
                  {parseFloat(discountValue) > 0 && (
                    <div className="flex justify-end gap-4">
                      <span className="text-text-secondary">Discount</span>
                      <span className="w-20 text-right font-mono text-error">
                        -{formatCurrency(calculations.discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-end gap-4">
                    <span className="text-text-secondary">
                      Tax ({parseFloat(taxRate).toFixed(1)}%)
                    </span>
                    <span className="w-20 text-right font-mono text-text-primary">
                      {formatCurrency(calculations.taxAmount)}
                    </span>
                  </div>
                  <div className="flex justify-end gap-4 border-t border-border pt-1 font-bold">
                    <span className="text-text-primary">Total Due</span>
                    <span className="w-20 text-right font-mono text-accent">
                      {formatCurrency(calculations.total)}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {notes && (
                  <div className="border-t border-border pt-2 text-xs">
                    <p className="font-semibold text-text-secondary mb-1">
                      Notes
                    </p>
                    <p className="text-text-muted leading-relaxed">
                      {notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <div className="border-t border-border p-4">
                <Button
                  onClick={downloadAsPDF}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Download PDF
                </Button>
              </div>
            </Card>

            {/* Hidden Canvas for Download */}
            <canvas ref={canvasRef} width={800} height={1100} className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
