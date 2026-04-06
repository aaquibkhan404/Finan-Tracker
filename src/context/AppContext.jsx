
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { transactions as mock } from "../data/mockData.js";

const STORAGE_KEY = "finance_dashboard_transactions";


function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (_) {}
  return mock;
}


function saveData(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (_) {}
}

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setDataRaw] = useState(loadData);
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("finance_dark_mode") === "true";
  });

  
  useEffect(() => {
    saveData(data);
  }, [data]);

  
  useEffect(() => {
    localStorage.setItem("finance_dark_mode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const setData = useCallback((updater) => {
    setDataRaw(updater);
  }, []);

  
  const addTransaction = useCallback((tx) => {
    setDataRaw(prev => [{ ...tx, id: Date.now() }, ...prev]);
  }, []);

  const updateTransaction = useCallback((updatedTx) => {
    setDataRaw(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setDataRaw(prev => prev.filter(t => t.id !== id));
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setDataRaw(mock);
  }, []);

  return (
    <AppContext.Provider value={{
      data,
      role,
      setRole,
      search,
      setSearch,
      darkMode,
      toggleDarkMode,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      resetData,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
