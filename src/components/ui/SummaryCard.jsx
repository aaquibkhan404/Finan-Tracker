
export default function SummaryCard({ title, value, color }) {
  const isIncome = title === "Income";
  const isExpense = title === "Expenses";

  const iconBg = isIncome
    ? "bg-emerald-100 text-emerald-600"
    : isExpense
      ? "bg-red-100 text-red-500"
      : "bg-blue-100 text-blue-600";

  let icon = null;

  if (title === "Income") {
    icon = (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
      </svg>
    );
  } else if (title === "Expenses") {
    icon = (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"></path>
      </svg>
    );
  } else {
    icon = (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
      </svg>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex items-center justify-between h-full hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-200">
      <div className="flex flex-col justify-center">
        <h3 className="text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-xs mb-2">{title}</h3>
        <p className={`text-3xl lg:text-4xl font-extrabold ${color ? color : 'text-slate-800 dark:text-white'}`}>₹{value}</p>
      </div>
      <div className={`p-3 rounded-xl flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
    </div>
  );
}
