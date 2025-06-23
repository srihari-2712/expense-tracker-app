import { useEffect, useRef } from 'react';

function ExpenseCharts({ expenses }) {
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const pieChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  useEffect(() => {
    let Chart;
    import('chart.js/auto').then((mod) => {
      Chart = mod.default;
      // Pie chart: Expenses by category
      const categoryTotals = {};
      expenses.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.convertedAmount;
      });
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      if (pieRef.current) {
        pieChartInstance.current = new Chart(pieRef.current, {
          type: 'pie',
          data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
              data: Object.values(categoryTotals),
              backgroundColor: [
                '#2193b0', '#6dd5ed', '#fbc531', '#e17055', '#00b894', '#fdcb6e', '#636e72'
              ],
            }],
          },
          options: { plugins: { legend: { position: 'bottom' } } },
        });
      }
      // Bar chart: Expenses by month
      const monthTotals = {};
      expenses.forEach(e => {
        const d = new Date(e.date || Date.now());
        const label = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
        monthTotals[label] = (monthTotals[label] || 0) + e.convertedAmount;
      });
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      if (barRef.current) {
        barChartInstance.current = new Chart(barRef.current, {
          type: 'bar',
          data: {
            labels: Object.keys(monthTotals),
            datasets: [{
              label: 'Monthly Spending',
              data: Object.values(monthTotals),
              backgroundColor: '#2193b0',
            }],
          },
          options: { plugins: { legend: { display: false } } },
        });
      }
    });
    // Cleanup on unmount
    return () => {
      if (pieChartInstance.current) pieChartInstance.current.destroy();
      if (barChartInstance.current) barChartInstance.current.destroy();
    };
  }, [expenses]);

  return (
    <div className="expense-charts">
      <h3>Analytics</h3>
      <canvas ref={pieRef} width={250} height={250}></canvas>
      <canvas ref={barRef} width={350} height={200}></canvas>
    </div>
  );
}

export default ExpenseCharts;
