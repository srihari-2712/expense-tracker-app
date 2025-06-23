// Component to show summary of expenses
const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'INR', symbol: '₹' },
  { code: 'JPY', symbol: '¥' },
  { code: 'CNY', symbol: '¥' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CAD', symbol: 'C$' },
];

function ExpenseSummary({ expenses, currency, setCurrency, rates }) {
  // Calculate total in selected currency using numeric convertedAmount
  const total = expenses.reduce((sum, e) => sum + (typeof e.convertedAmount === 'number' ? e.convertedAmount : 0), 0).toFixed(2);

  // Calculate total in INR
  const inrRate = rates['INR'] || 1;
  const selectedRate = rates[currency.code] || 1;
  const totalInINR = (total / selectedRate * inrRate).toFixed(2);

  return (
    <div className="summary">
      <label>
        Currency:
        <select
          value={currency.code}
          onChange={e => setCurrency(CURRENCIES.find(c => c.code === e.target.value))}
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
          ))}
        </select>
      </label>
      <span style={{ marginLeft: '1rem' }}>
        Total Spent: {currency.symbol}{total} (₹{totalInINR} INR)
      </span>
    </div>
  );
}

export default ExpenseSummary;

