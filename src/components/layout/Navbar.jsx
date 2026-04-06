
import RoleSwitcher from "./RoleSwitcher.jsx";
import { useApp } from "../../context/AppContext.jsx";

export default function Navbar() {
  const { role, resetData, darkMode, toggleDarkMode } = useApp();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <div className="w-full px-3 sm:px-5 md:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">

        {/* ── Brand ── */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#5955E6] flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight truncate">
              Finan Tracker
            </h1>
            {/* Subtitle: hidden on xs, visible sm+ */}
            <p className="hidden sm:block text-[10px] md:text-[11px] text-slate-400 dark:text-slate-500 leading-none">
              Your personal financial overview
            </p>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="relative flex items-center w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0"
            style={{ background: darkMode ? "#5955E6" : "#cbd5e1" }}
            id="dark-mode-toggle"
          >
            <span className="absolute left-1 sm:left-1.5 text-[10px] sm:text-xs pointer-events-none">
              {darkMode ? "🌙" : ""}
            </span>
            <span className="absolute right-1 sm:right-1.5 text-[10px] sm:text-xs pointer-events-none">
              {!darkMode ? "☀️" : ""}
            </span>
            <span
              className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow transition-transform duration-300"
              style={{ transform: darkMode ? "translateX(26px)" : "translateX(2px)" }}
            />
          </button>

          {/* Reset Data:
              - xs  : icon-only square button
              - sm+ : icon + label
          */}
          {role === "admin" && (
            <button
              onClick={resetData}
              title="Reset all data to defaults and clear local storage"
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-slate-500
                         hover:text-red-500 border border-slate-200 dark:border-slate-600
                         hover:border-red-200 rounded-lg transition-colors
                         px-2 py-1.5 sm:px-3 sm:py-2"
            >
              {/* Reset icon — always visible */}
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {/* Label hidden on xs, visible sm+ */}
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {/* Role Switcher */}
          <RoleSwitcher />
        </div>
      </div>
    </nav>
  );
}
