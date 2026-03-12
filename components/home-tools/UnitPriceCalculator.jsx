'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function UnitPriceCalculator() {
  const [products, setProducts] = useState([
    { id: 1, name: '', price: '', quantity: '', unit: 'g' },
    { id: 2, name: '', price: '', quantity: '', unit: 'g' },
  ]);
  const [nextId, setNextId] = useState(3);

  const unitConversions = {
    g: 1,
    kg: 1000,
    mg: 0.001,
    ml: 1,
    L: 1000,
    fl_oz: 29.5735,
    pint: 568.261,
    each: 1,
    pack: 1,
  };

  const getBaseUnit = (unit) => {
    if (['g', 'kg', 'mg'].includes(unit)) return 'g';
    if (['ml', 'L', 'fl_oz', 'pint'].includes(unit)) return 'ml';
    return unit;
  };

  const convertToBase = (quantity, unit) => {
    return (parseFloat(quantity) || 0) * (unitConversions[unit] || 1);
  };

  const results = useMemo(() => {
    const validProducts = products
      .filter((p) => p.name && p.price && p.quantity)
      .map((p) => {
        const baseQuantity = convertToBase(p.quantity, p.unit);
        const pricePerUnit = baseQuantity > 0 ? parseFloat(p.price) / baseQuantity : 0;

        return {
          ...p,
          baseQuantity,
          pricePerUnit,
        };
      });

    if (validProducts.length === 0) return null;

    const minPrice = Math.min(...validProducts.map((p) => p.pricePerUnit));
    const maxPrice = Math.max(...validProducts.map((p) => p.pricePerUnit));

    return validProducts.map((p) => ({
      ...p,
      isBestValue: p.pricePerUnit === minPrice,
      savings: (maxPrice - p.pricePerUnit) * p.baseQuantity,
    }));
  }, [products]);

  const handleProductChange = (id, field, value) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleAddProduct = () => {
    setProducts([...products, { id: nextId, name: '', price: '', quantity: '', unit: 'g' }]);
    setNextId(nextId + 1);
  };

  const handleRemoveProduct = (id) => {
    if (products.length > 2) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleReset = () => {
    setProducts([
      { id: 1, name: '', price: '', quantity: '', unit: 'g' },
      { id: 2, name: '', price: '', quantity: '', unit: 'g' },
    ]);
    setNextId(3);
  };

  const unitLabels = {
    g: 'per gram',
    kg: 'per kg',
    mg: 'per mg',
    ml: 'per ml',
    L: 'per litre',
    fl_oz: 'per fl oz',
    pint: 'per pint',
    each: 'each',
    pack: 'per pack',
  };

  const baseUnitLabel = {
    g: 'g',
    ml: 'ml',
    each: 'each',
    pack: 'pack',
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Instructions */}
      <div className="bg-info/10 border border-info rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-medium text-text-primary mb-1">Compare unit prices across products</p>
        <p>Enter product name, price, quantity and unit to find the best value.</p>
      </div>

      {/* Products Table */}
      <Card className="overflow-x-auto">
        <div className="space-y-4">
          <h3 className="text-text-primary font-semibold">Products</h3>

          <div className="space-y-3 min-w-max sm:min-w-0">
            {products.map((product, idx) => (
              <div key={product.id} className="flex flex-col sm:flex-row gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="flex-1 min-w-0">
                  <label className="block text-text-secondary text-xs font-medium mb-1">Product Name</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                    placeholder="e.g. Tesco Milk"
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>

                <div className="w-24 min-w-0">
                  <label className="block text-text-secondary text-xs font-medium mb-1">Price (£)</label>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>

                <div className="w-28 min-w-0">
                  <label className="block text-text-secondary text-xs font-medium mb-1">Quantity</label>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(product.id, 'quantity', e.target.value)}
                    placeholder="0"
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>

                <div className="w-24 min-w-0">
                  <label className="block text-text-secondary text-xs font-medium mb-1">Unit</label>
                  <select
                    value={product.unit}
                    onChange={(e) => handleProductChange(product.id, 'unit', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  >
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="mg">mg</option>
                    <option value="ml">ml</option>
                    <option value="L">L</option>
                    <option value="fl_oz">fl oz</option>
                    <option value="pint">pint</option>
                    <option value="each">each</option>
                    <option value="pack">pack</option>
                  </select>
                </div>

                <div className="flex items-end">
                  {products.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex gap-2">
            {products.length < 6 && (
              <Button variant="secondary" size="sm" onClick={handleAddProduct}>
                + Add Product
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Results Table */}
          <Card>
            <div className="space-y-3">
              <h3 className="text-text-primary font-semibold">Unit Price Comparison</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-text-secondary font-medium py-2 px-2">Product</th>
                      <th className="text-right text-text-secondary font-medium py-2 px-2">Price</th>
                      <th className="text-right text-text-secondary font-medium py-2 px-2">Quantity</th>
                      <th className="text-right text-text-secondary font-medium py-2 px-2">Unit Price</th>
                      <th className="text-right text-text-secondary font-medium py-2 px-2">Savings vs Most Expensive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results
                      .sort((a, b) => a.pricePerUnit - b.pricePerUnit)
                      .map((product) => (
                        <tr
                          key={product.id}
                          className={`border-b border-border last:border-0 ${
                            product.isBestValue ? 'bg-success/10' : ''
                          } hover:bg-surface transition-colors`}
                        >
                          <td className="text-text-primary font-medium py-3 px-2">
                            {product.name}
                            {product.isBestValue && (
                              <span className="ml-2 inline-block bg-success text-white text-xs px-2 py-0.5 rounded font-semibold">
                                Best Value
                              </span>
                            )}
                          </td>
                          <td className="text-right font-mono text-text-primary py-3 px-2">
                            £{parseFloat(product.price).toFixed(2)}
                          </td>
                          <td className="text-right font-mono text-text-primary py-3 px-2">
                            {parseFloat(product.quantity).toFixed(2)} {product.unit}
                          </td>
                          <td className="text-right font-mono font-bold text-text-primary py-3 px-2">
                            £{product.pricePerUnit.toFixed(4)}
                          </td>
                          <td className="text-right text-text-primary py-3 px-2">
                            {product.isBestValue ? (
                              <span className="text-success font-bold">—</span>
                            ) : (
                              <span className="text-warning font-bold">
                                £{product.savings.toFixed(2)} for this quantity
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Summary Card */}
          <Card className="border-2 border-success bg-success/5">
            <div className="space-y-3">
              <h3 className="text-text-primary font-semibold">Best Value Product</h3>

              {results[0] && (
                <>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-text-secondary">Product:</p>
                    <p className="font-mono font-bold text-text-primary">{results[0].name}</p>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t border-success/20">
                    <p className="text-text-secondary">Unit Price:</p>
                    <p className="font-mono text-xl font-bold text-success">£{results[0].pricePerUnit.toFixed(4)}</p>
                  </div>

                  {results.length > 1 && results[results.length - 1].pricePerUnit > results[0].pricePerUnit && (
                    <div className="flex justify-between items-center py-2 border-t border-success/20">
                      <p className="text-text-secondary">Saving vs most expensive:</p>
                      <p className="font-mono font-bold text-success">
                        £{(results[results.length - 1].pricePerUnit - results[0].pricePerUnit).toFixed(4)} per unit
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
        </>
      )}

      {!results && products.some((p) => p.name || p.price || p.quantity) && (
        <div className="bg-info/10 border border-info rounded-lg p-4 text-text-secondary text-sm">
          Fill in all fields (name, price, quantity, unit) for at least 2 products to compare.
        </div>
      )}
    </div>
  );
}
