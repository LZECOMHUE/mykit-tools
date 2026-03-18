'use client';

import { useState, useMemo } from 'react';

// Cost of living indices by city (Sydney = 100 baseline)
const CITY_DATA = {
  Sydney: {
    rent: 100,
    groceries: 100,
    transport: 100,
    utilities: 100,
    dining: 100,
    overall: 100,
  },
  Melbourne: {
    rent: 88,
    groceries: 98,
    transport: 95,
    utilities: 98,
    dining: 96,
    overall: 94,
  },
  Brisbane: {
    rent: 75,
    groceries: 96,
    transport: 88,
    utilities: 95,
    dining: 92,
    overall: 88,
  },
  Perth: {
    rent: 78,
    groceries: 102,
    transport: 92,
    utilities: 105,
    dining: 94,
    overall: 91,
  },
  Adelaide: {
    rent: 68,
    groceries: 94,
    transport: 85,
    utilities: 92,
    dining: 88,
    overall: 84,
  },
  Hobart: {
    rent: 72,
    groceries: 105,
    transport: 88,
    utilities: 100,
    dining: 90,
    overall: 86,
  },
  Darwin: {
    rent: 82,
    groceries: 115,
    transport: 98,
    utilities: 110,
    dining: 105,
    overall: 102,
  },
  Canberra: {
    rent: 85,
    groceries: 99,
    transport: 92,
    utilities: 96,
    dining: 97,
    overall: 94,
  },
};

export default function AustraliaCostOfLivingByCity() {
  const [monthlyBudget, setMonthlyBudget] = useState(4500);
  const [selectedCities, setSelectedCities] = useState(['Sydney', 'Melbourne', 'Brisbane']);

  const cityList = Object.keys(CITY_DATA).sort();

  const results = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const comparison = {};

    selectedCities.forEach((city) => {
      const indices = CITY_DATA[city];
      const adjustedBudget = budget * (indices.overall / 100);

      comparison[city] = {
        indices,
        adjustedBudget: adjustedBudget.toFixed(2),
        overallIndex: indices.overall,
        differenceFromSydney: (
          (indices.overall - CITY_DATA.Sydney.overall) *
          (budget / 100)
        ).toFixed(2),
      };
    });

    return comparison;
  }, [monthlyBudget, selectedCities]);

  const toggleCity = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              Monthly Budget (AUD)
            </label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              placeholder="Enter monthly budget"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
            <p className="text-text-muted text-sm mt-1">
              Adjusted amount shows what this budget goes as far in each city
            </p>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Select Cities to Compare
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cityList.map((city) => (
                <label
                  key={city}
                  className="flex items-center cursor-pointer p-2 rounded hover:bg-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedCities.includes(city)}
                    onChange={() => toggleCity(city)}
                    className="mr-2"
                  />
                  <span className="text-text-primary text-sm">{city}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Comparison Table */}
        {selectedCities.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-white border border-border">
                  <th className="text-left p-3 font-semibold text-text-primary">
                    City
                  </th>
                  <th className="text-right p-3 font-semibold text-text-primary">
                    Cost Index
                  </th>
                  <th className="text-right p-3 font-semibold text-text-primary">
                    Adjusted Budget
                  </th>
                  <th className="text-right p-3 font-semibold text-text-primary">
                    vs Sydney
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedCities.map((city) => {
                  const data = results[city];
                  const isSydney = city === 'Sydney';
                  const isLowest = !isSydney && Math.min(
                    ...selectedCities
                      .filter(c => c !== 'Sydney')
                      .map(c => results[c].overallIndex)
                  ) === data.overallIndex;

                  return (
                    <tr
                      key={city}
                      className={`border border-border ${
                        isSydney
                          ? 'bg-gray-50'
                          : isLowest
                          ? 'bg-green-50'
                          : 'bg-white hover:bg-surface'
                      }`}
                    >
                      <td className="p-3 font-semibold text-text-primary">
                        {city}
                        {isSydney && <span className="text-accent ml-2">(baseline)</span>}
                        {isLowest && <span className="text-success ml-2">(lowest)</span>}
                      </td>
                      <td className="text-right p-3 font-mono text-text-primary">
                        {data.overallIndex}
                      </td>
                      <td className="text-right p-3 font-mono font-semibold text-accent">
                        ${data.adjustedBudget}
                      </td>
                      <td className="text-right p-3 font-mono">
                        {parseFloat(data.differenceFromSydney) < 0 ? (
                          <span className="text-success">
                            -${Math.abs(parseFloat(data.differenceFromSydney)).toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-error">
                            +${data.differenceFromSydney}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Category Breakdown */}
        {selectedCities.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-text-primary font-semibold text-lg">
              Cost Index by Category (Sydney = 100)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCities.map((city) => (
                <div
                  key={city}
                  className="bg-white rounded-lg border border-border p-4"
                >
                  <h3 className="text-text-primary font-semibold mb-3">
                    {city}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Rent:</span>
                      <span className="font-mono font-semibold">
                        {results[city].indices.rent}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Groceries:</span>
                      <span className="font-mono font-semibold">
                        {results[city].indices.groceries}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Transport:</span>
                      <span className="font-mono font-semibold">
                        {results[city].indices.transport}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Utilities:</span>
                      <span className="font-mono font-semibold">
                        {results[city].indices.utilities}
                      </span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-border">
                      <span className="text-text-secondary">Dining:</span>
                      <span className="font-mono font-semibold">
                        {results[city].indices.dining}
                      </span>
                    </div>

                    <div className="flex justify-between pt-3">
                      <span className="text-text-primary font-semibold">
                        Overall:
                      </span>
                      <span className="font-mono font-semibold text-accent">
                        {results[city].indices.overall}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        {selectedCities.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-text-primary font-semibold text-lg mb-4">
              Key Insights
            </h3>

            <div className="space-y-3 text-text-secondary text-sm">
              <div>
                <p className="font-semibold mb-2">Cheapest Cities:</p>
                <p>
                  Adelaide and Hobart offer the most affordable living costs, roughly
                  15-20% cheaper than Sydney overall
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Most Expensive:</p>
                <p>
                  Darwin and Perth have higher costs due to remoteness and limited
                  supply, particularly for groceries and utilities
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Rent Variations:</p>
                <p>
                  Sydney and Canberra have the highest rental costs. Brisbane and
                  Adelaide offer significantly cheaper accommodation
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Budget Impact:</p>
                <p>
                  Moving from Sydney to Adelaide could stretch a monthly budget by
                  16-20%, depending on lifestyle
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Category Explanations */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-text-primary font-semibold text-lg mb-4">
            What's Included in Each Category
          </h3>

          <div className="space-y-3 text-sm text-text-secondary">
            <div>
              <p className="font-semibold text-text-primary">Rent</p>
              <p>Average rent for a 2-bedroom apartment in a typical suburb</p>
            </div>

            <div>
              <p className="font-semibold text-text-primary">Groceries</p>
              <p>Basket of common grocery items (milk, bread, vegetables, etc.)</p>
            </div>

            <div>
              <p className="font-semibold text-text-primary">Transport</p>
              <p>Public transport fares and fuel costs for vehicle owners</p>
            </div>

            <div>
              <p className="font-semibold text-text-primary">Utilities</p>
              <p>Electricity, water, gas, internet for a typical household</p>
            </div>

            <div>
              <p className="font-semibold text-text-primary">Dining</p>
              <p>Restaurant meals and takeaway food at typical venues</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Indices are based on 2025 estimates and typical costs in each city
            </li>
            <li>
              Individual costs vary widely depending on lifestyle and location within
              city
            </li>
            <li>Rent varies significantly by suburb and apartment type</li>
            <li>
              Cost of living changes regularly - check current data for up-to-date
              figures
            </li>
            <li>Does not include healthcare, education, or childcare costs</li>
            <li>Index assumes Sydney baseline of 100</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
