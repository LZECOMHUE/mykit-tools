'use client';

import { useState, useEffect } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CountryComparisonTool() {
  const [countries, setCountries] = useState([]);
  const [country1, setCountry1] = useState('GB');
  const [country2, setCountry2] = useState('US');
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,cca2,population,area,capital,region,subregion,languages,currencies,timezones,flags'
        );
        const data = await res.json();
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);

        const uk = sorted.find(c => c.cca2 === 'GB');
        const us = sorted.find(c => c.cca2 === 'US');
        if (uk) setData1(uk);
        if (us) setData2(us);
      } catch (err) {
        setError('Failed to load countries.');
      }
      setLoading(false);
    };

    fetchCountries();
  }, []);

  const handleCountry1Change = (e) => {
    const code = e.target.value;
    setCountry1(code);
    const found = countries.find(c => c.cca2 === code);
    setData1(found || null);
  };

  const handleCountry2Change = (e) => {
    const code = e.target.value;
    setCountry2(code);
    const found = countries.find(c => c.cca2 === code);
    setData2(found || null);
  };

  const swap = () => {
    setCountry1(country2);
    setCountry2(country1);
    setData1(data2);
    setData2(data1);
  };

  const countryOptions = countries.map(c => ({
    value: c.cca2,
    label: `${c.flags[0]} ${c.name.common}`
  }));

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    return num.toLocaleString();
  };

  const ComparisonRow = ({ label, value1, value2, isNumeric = false }) => {
    let maxVal = 0;
    if (isNumeric) {
      maxVal = Math.max(value1 || 0, value2 || 0);
    }

    return (
      <div className="grid grid-cols-3 gap-2 py-3 border-b border-border last:border-b-0">
        <div className="text-sm font-medium text-secondary">{label}</div>
        <div className="text-sm">
          {isNumeric && maxVal > 0 ? (
            <div className="flex items-center gap-2">
              <div className="h-2 bg-blue-200 rounded-full flex-1" style={{width: '100%'}}>
                <div
                  className="h-full bg-accent rounded-full"
                  style={{width: `${((value1 || 0) / maxVal) * 100}%`}}
                />
              </div>
              <span className="font-mono text-xs text-primary">{formatNumber(value1)}</span>
            </div>
          ) : (
            <span className="font-mono text-sm">{formatNumber(value1)}</span>
          )}
        </div>
        <div className="text-sm">
          {isNumeric && maxVal > 0 ? (
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-primary">{formatNumber(value2)}</span>
              <div className="h-2 bg-blue-200 rounded-full flex-1" style={{width: '100%'}}>
                <div
                  className="h-full bg-accent rounded-full"
                  style={{width: `${((value2 || 0) / maxVal) * 100}%`}}
                />
              </div>
            </div>
          ) : (
            <span className="font-mono text-sm">{formatNumber(value2)}</span>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <Card><p className="text-secondary">Loading countries...</p></Card>;
  if (error) return <Card><p className="text-red-600">{error}</p></Card>;

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Select countries to compare
          </label>
          <div className="flex gap-2 items-start flex-col sm:flex-row sm:items-center">
            <Select
              value={country1}
              onChange={handleCountry1Change}
              options={countryOptions}
              className="flex-1"
            />
            <Button onClick={swap} variant="secondary" className="w-full sm:w-auto">
              Swap
            </Button>
            <Select
              value={country2}
              onChange={handleCountry2Change}
              options={countryOptions}
              className="flex-1"
            />
          </div>
        </div>

        {data1 && data2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column header */}
            <div className="flex items-center gap-3 pb-3 border-b-2 border-accent md:border-b-0 md:border-r-2">
              <span className="text-2xl">{data1.flags[0]}</span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {data1.name.common}
                </h3>
                <p className="text-xs text-secondary">{data1.region}</p>
              </div>
            </div>

            {/* Right column header */}
            <div className="flex items-center gap-3 pb-3 border-b-2 border-accent">
              <span className="text-2xl">{data2.flags[0]}</span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {data2.name.common}
                </h3>
                <p className="text-xs text-secondary">{data2.region}</p>
              </div>
            </div>

            {/* Comparison rows */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-3 gap-2 mb-4 pb-3 border-b-2 border-accent font-semibold text-sm">
                <div>Metric</div>
                <div className="text-center">{data1.name.common}</div>
                <div className="text-center">{data2.name.common}</div>
              </div>

              <ComparisonRow
                label="Population"
                value1={data1.population}
                value2={data2.population}
                isNumeric={true}
              />
              <ComparisonRow
                label="Area (km²)"
                value1={data1.area}
                value2={data2.area}
                isNumeric={true}
              />
              <ComparisonRow
                label="Capital"
                value1={data1.capital?.[0] || 'N/A'}
                value2={data2.capital?.[0] || 'N/A'}
              />
              <ComparisonRow
                label="Subregion"
                value1={data1.subregion || 'N/A'}
                value2={data2.subregion || 'N/A'}
              />
              <ComparisonRow
                label="Languages"
                value1={data1.languages ? Object.values(data1.languages).join(', ') : 'N/A'}
                value2={data2.languages ? Object.values(data2.languages).join(', ') : 'N/A'}
              />
              <ComparisonRow
                label="Currencies"
                value1={data1.currencies ? Object.keys(data1.currencies).join(', ') : 'N/A'}
                value2={data2.currencies ? Object.keys(data2.currencies).join(', ') : 'N/A'}
              />
              <ComparisonRow
                label="Timezones"
                value1={data1.timezones?.length || 0}
                value2={data2.timezones?.length || 0}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
