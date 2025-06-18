import ExpenseItem from './ExpenseItem';

// Component to display the list of expenses
function ExpenseList({ expenses, onRemove, currency }) {
  if (!expenses.length) {
    return <div className="expense-list">No expenses yet.</div>;
  }
  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onRemove={onRemove}
          currency={currency}
        />
      ))}
    </div>
  );
}

export default ExpenseList;
