
import RoleSwitcher from "./RoleSwitcher.jsx";
import { useApp } from "../../context/AppContext.jsx";

export default function Navbar() {
  const { role, resetData, darkMode, toggleDarkMode } = useApp();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <div className="w-full px-6 h-16 flex items-center justify-between">
       
        <div className="flex items-center gap-3">
         
          <div className="w-8 h-8 rounded-lg bg-[#5955E6] flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight">
              Finan Tracker
            </h1>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-none">Your personal financial overview</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          
          <button
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="relative flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none"
            style={{ background: darkMode ? "#5955E6" : "#cbd5e1" }}
            id="dark-mode-toggle"
          >
          
            <span className="absolute left-1.5 text-xs pointer-events-none">
              {darkMode ? "🌙" : ""}
            </span>
            <span className="absolute right-1.5 text-xs pointer-events-none">
              {!darkMode ? "☀️" : ""}
            </span>
           
            <span
              className="absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 flex items-center justify-center"
              style={{ transform: darkMode ? "translateX(28px)" : "translateX(2px)" }}
            >
            </span>
          </button>

          {role === "admin" && (
            <button
              onClick={resetData}
              title="Reset all data to defaults and clear local storage"
              className="text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-red-500 border border-slate-200 dark:border-slate-600 hover:border-red-200 px-3 py-2 rounded-lg transition-colors"
            >
              ↺ Reset Data
            </button>
          )}
          <RoleSwitcher />
        </div>
      </div>
    </nav>
  );
}
