// Component to display a single expense item
function ExpenseItem({ expense, onRemove, currency }) {
  // Show the correct symbol for the selected currency
  const symbol = currency.symbol;
  // Use the numeric convertedAmount and format it for display
  const displayAmount = (typeof expense.convertedAmount === 'number' ? expense.convertedAmount.toFixed(2) : '0.00');
  return (
    <div className="expense-item">
      <span>{expense.name} - {symbol}{displayAmount} ({expense.category})</span>
      <button onClick={() => onRemove(expense.id)} aria-label="Remove expense">Remove</button>
    </div>
  );
}

export default ExpenseItem;
