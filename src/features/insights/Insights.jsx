
import { useApp } from "../../context/AppContext.jsx";

export default function Insights() {
  const { data } = useApp();

  const expenses = data.filter(d => d.type === "expense");

  const top = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highest = Object.keys(top).length
    ? Object.keys(top).reduce((a, b) => top[a] > top[b] ? a : b)
    : "N/A";

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 h-full flex flex-col justify-center transition-colors duration-300">
      <h3 className="text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-xs mb-5 text-center">Quick Insights</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
          <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Highest Spending</span>
          <span className="text-base font-bold text-red-500 dark:text-red-400">{highest}</span>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
          <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Total Transactions</span>
          <span className="text-base font-bold text-blue-600 dark:text-blue-400">{data.length}</span>
        </div>
      </div>
    </div>
  );
}
