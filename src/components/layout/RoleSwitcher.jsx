
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

  // Icon for current role
  const RoleIcon = () =>
    role === "admin" ? (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ) : (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    );

  return (
    <div className="relative inline-block text-left font-sans" ref={dropdownRef}>
      {/* Trigger button
          xs  : icon + chevron only (no label, compact square)
          sm+ : label + chevron
      */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 bg-[#5955E6] hover:bg-[#4C48CD]
                   text-white font-semibold rounded-xl transition-colors focus:outline-none
                   h-8 sm:h-10 md:h-[46px]
                   px-2.5 sm:px-4"
        title={`Current role: ${displayName}. Click to switch.`}
      >
        <RoleIcon />
        {/* Label: hidden on xs, shown sm+ */}
        <span className="hidden sm:inline text-sm md:text-base capitalize tracking-wide">
          {displayName}
        </span>
        <svg
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 sm:w-52 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg z-50 overflow-hidden py-1">
          <button
            onClick={() => handleSelect("viewer")}
            className="w-full flex items-center px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2.5 sm:mr-3 text-[#5955E6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Viewer Mode
          </button>

          <button
            onClick={() => handleSelect("admin")}
            className="w-full flex items-center px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2.5 sm:mr-3 text-[#5955E6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Admin Mode
          </button>
        </div>
      )}
    </div>
  );
}
