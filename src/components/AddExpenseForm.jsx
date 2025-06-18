import { useState } from 'react';

// Form to add a new expense
function AddExpenseForm({ onAdd, currency }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [expenseCurrency, setExpenseCurrency] = useState(currency);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    onAdd({
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      category,
      currency: expenseCurrency,
    });
    setName('');
    setAmount('');
    setCategory('General');
    setExpenseCurrency(currency);
  };

  return (
    <form className="add-expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Expense name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General">General</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <select value={expenseCurrency} onChange={e => setExpenseCurrency(e.target.value)}>
        {CURRENCIES.map(c => (
          <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddExpenseForm;
