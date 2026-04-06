
import { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext.jsx";

export default function RoleSwitcher() {
  const { role, setRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
    setIsOpen(false);
  };

  const displayName = role === "admin" ? "Admin" : "Viewer";

  return (
    <div className="relative inline-block text-left font-sans" ref={dropdownRef}>
      <div className="flex rounded-xl overflow-hidden bg-[#5955E6] hover:bg-[#4C48CD] transition-colors h-[46px]">
        <button 
          className="text-white px-5 min-w-[100px] font-semibold tracking-wide capitalize text-base flex items-center justify-start focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {displayName}
        </button>
        <button 
          className="border-l border-white/40 px-4 focus:outline-none flex items-center justify-center text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm z-50 overflow-hidden py-1">
          <button 
            onClick={() => handleSelect("viewer")}
            className="w-full flex items-center px-5 py-3 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5 mr-3 text-[#5955E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-[17px]">Viewer Mode</span>
          </button>
          
          <button 
            onClick={() => handleSelect("admin")}
            className="w-full flex items-center px-5 py-3 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5 mr-3 text-[#5955E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[17px]">Admin Mode</span>
          </button>
        </div>
      )}
    </div>
  );
}
