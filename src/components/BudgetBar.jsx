import { useState } from 'react';

function BudgetBar({ total, currency, onSetBudget, budget }) {
  const [input, setInput] = useState(budget || '');
  const percent = budget ? Math.min((total / budget) * 100, 100) : 0;
  const over = budget && total > budget;

  return (
    <div className="budget-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Budget:</span>
        <input
          type="number"
          min="0"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Set budget"
          style={{ width: 90 }}
        />
        <button onClick={() => onSetBudget(Number(input))}>Set</button>
      </div>
      {budget ? (
        <div className="budget-progress">
          <div
            className="budget-progress-bar"
            style={{ width: percent + '%', background: over ? '#e17055' : '#00b894' }}
          />
        </div>
      ) : null}
      {over && <div className="budget-alert">You have exceeded your budget!</div>}
    </div>
  );
}

export default BudgetBar;
