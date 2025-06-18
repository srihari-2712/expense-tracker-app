import { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseSummary from './components/ExpenseSummary';
import './App.css';

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

const DEFAULT_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  INR: 86.34,
  JPY: 157.5,
  CNY: 7.25,
  AUD: 1.54,
  CAD: 1.37,
};

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currency, setCurrency] = useState(CURRENCIES[3]); // INR default
  const [rates, setRates] = useState(DEFAULT_RATES);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setRates(r => ({ ...r, ...data.rates }));
        }
      })
      .catch(() => {});
  }, []);

  const handleAddExpense = (expense) => {
    setExpenses(prev => [
      ...prev,
      { ...expense, currency: expense.currency || currency.code }
    ]);
  };

  const handleRemoveExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Filtered expenses
  const filteredExpenses = filter === 'All' ? expenses : expenses.filter(e => e.category === filter);

  // Convert all expenses to selected currency for summary and list
  const getConvertedExpenses = () => {
    return filteredExpenses.map(e => {
      const fromRate = rates[e.currency] || 1;
      const toRate = rates[currency.code] || 1;
      const usdAmount = e.amount / fromRate;
      const converted = usdAmount * toRate;
      return { ...e, convertedAmount: converted };
    });
  };

  const convertedExpenses = getConvertedExpenses();

  return (
    <div className="app-container">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <ExpenseSummary
          expenses={convertedExpenses}
          currency={currency}
          setCurrency={setCurrency}
          rates={rates}
        />
        <AddExpenseForm onAdd={handleAddExpense} currency={currency.code} />
        <ExpenseList
          expenses={convertedExpenses}
          onRemove={handleRemoveExpense}
          currency={currency}
        />
      </main>
    </div>
  );
}

export default App;
