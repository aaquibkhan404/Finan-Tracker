
import { AreaChart, Area, PieChart, Pie, Tooltip, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { useApp } from "../../context/AppContext.jsx";


const PALETTE = [
  "#00D4FF", // cyan
  "#8B5CF6", // purple
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#06B6D4", // teal
  "#F97316", // orange
  "#EC4899", // pink
  "#6366F1", // indigo
  "#84CC16", // lime
];

export default function Charts() {
  const { data, darkMode } = useApp();

  // ── Derived values for area chart 
  const gridColor    = darkMode ? "#334155" : "#E5E7EB";
  const tickColor    = darkMode ? "#64748B" : "#9CA3AF";
  const tooltipBg    = darkMode ? "#1E293B" : "#FFFFFF";
  const tooltipBorder= darkMode ? "#334155" : "#E2E8F0";
  const tooltipLabel = darkMode ? "#94A3B8" : "#9CA3AF";
  const tooltipValue = darkMode ? "#F1F5F9" : "#1E293B";

  // ── Spending by category (expenses only)
  const categoryMap = data
    .filter(d => d.type === "expense")
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const categoryData = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], i) => ({
      name,
      value,
      color: PALETTE[i % PALETTE.length],
    }));

  const totalExpense = categoryData.reduce((s, d) => s + d.value, 0);

  const cardClass = `border rounded-2xl p-6 h-[420px] flex flex-col transition-colors duration-300 ${
    darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
  }`;

  
  const AreaTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: tooltipBg, border: `1px solid ${tooltipBorder}` }}
        className="px-4 py-3 rounded-xl font-sans z-50 shadow-lg">
        <p style={{ color: tooltipLabel }} className="text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <p style={{ color: tooltipValue }} className="text-xl font-extrabold">₹{payload[0].value}</p>
      </div>
    );
  };

  // ── Category donut tooltip ────────────────────────────────────────────
  const CategoryTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    const pct  = totalExpense > 0 ? Math.round((item.value / totalExpense) * 100) : 0;
    return (
      <div
        style={{
          background: tooltipBg,
          border: `1px solid ${tooltipBorder}`,
          borderLeft: `4px solid ${item.payload.color}`,
        }}
        className="px-4 py-3 rounded-xl font-sans z-50 shadow-lg min-w-[150px]"
      >
        <p style={{ color: tooltipLabel }} className="text-xs font-bold uppercase tracking-wider mb-1">
          {item.name}
        </p>
        <p style={{ color: tooltipValue }} className="text-xl font-extrabold">
          ₹{item.value.toLocaleString()}
        </p>
        <p style={{ color: item.payload.color }} className="text-xs font-bold mt-0.5">
          {pct}% of spending
        </p>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">

      {/* ── Area / Trend Chart ───────────────────────────────────────── */}
      <div className={cardClass}>
        <h3 className={`font-semibold uppercase tracking-wider text-xs mb-4 text-center ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
          Trend Analysis
        </h3>
        <div className="flex-1 w-full h-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3B82F6" stopOpacity={darkMode ? 0.3 : 0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12, fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12, fontWeight: 600 }} dx={-10} />
              <Tooltip content={<AreaTooltip />} cursor={{ stroke: tickColor, strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={4}
                fillOpacity={1} fill="url(#colorAmount)" activeDot={{ r: 8, strokeWidth: 0, fill: '#3B82F6' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Spending by Category Donut ───────────────────────────────── */}
      <div className={cardClass}>
        
        <div className="flex items-center justify-between mb-2">
          <h3 className={`font-bold text-base ${darkMode ? "text-white" : "text-slate-800"}`}>
            Spending by Category
          </h3>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold cursor-default select-none
            ${darkMode ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-500"}`}>
            +
          </div>
        </div>

        {/* Donut */}
        <div className="flex-1 min-h-0 w-full" style={{ height: "230px" }}>
          {categoryData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className={`text-sm font-medium ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                No expense data yet
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={106}
                  paddingAngle={3}
                  stroke="none"
                  cornerRadius={6}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{ outline: "none", filter: "brightness(1.05)" }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CategoryTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2 px-1">
          {categoryData.map((entry) => {
            const pct = totalExpense > 0 ? Math.round((entry.value / totalExpense) * 100) : 0;
            return (
              <div key={entry.name} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className={`text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {entry.name}
                </span>
                <span className={`text-xs font-bold tabular-nums ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
