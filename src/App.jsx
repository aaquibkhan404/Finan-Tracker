
import SummaryCard from "./components/ui/SummaryCard.jsx";
import TransactionTable from "./components/transactions/TransactionTable.jsx";
import Charts from "./components/charts/Charts.jsx";
import Insights from "./features/insights/Insights.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import { useApp } from "./context/AppContext.jsx";

export default function App() {
  const { data, role, resetData, darkMode } = useApp();

  const income = data.filter(d => d.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = data.filter(d => d.type === "expense").reduce((a, b) => a + b.amount, 0);

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen font-sans`}>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-gray-700 dark:text-slate-200 transition-colors duration-300">
        <Navbar />
        <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">

          <div className="grid md:grid-cols-3 gap-8">
            <SummaryCard title="Income" value={income} color="text-green-600 dark:text-green-400" />
            <SummaryCard title="Expenses" value={expense} color="text-red-600 dark:text-red-400" />
            <SummaryCard title="Balance" value={income - expense} color="text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <Charts />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <TransactionTable />
            </div>
            <div>
              <Insights />
            </div>
          </div>
        </div>

        {/* Footer Slogan */}
        <div className="mt-12 pb-8 text-center space-y-1">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wide">
            Made with ❤️ by <span className="text-slate-700 dark:text-slate-200 font-bold">Aaquib</span> &mdash; Crafted for You
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-xs italic">
            #ek baar dhokha kha chukha hu dubara nhi khaunga
          </p>
        </div>
      </div>
    </div>
  );
}
