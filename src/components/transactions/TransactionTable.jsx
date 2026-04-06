
import { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";

const EMPTY_FORM = {
  date: new Date().toISOString().split("T")[0],
  amount: "",
  category: "",
  type: "income",
};

function AddTransactionModal({ onClose, onSave }) {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category.trim()) return setError("Category is required.");
    if (!form.amount || Number(form.amount) <= 0) return setError("Enter a valid amount greater than 0.");
    onSave({ ...form, amount: Number(form.amount) });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-modal"
        style={{ animation: "modalIn 0.22s cubic-bezier(.4,0,.2,1) both" }}
      >

        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 dark:text-white tracking-tight">Add Transaction</h2>
            <p className="text-xs text-slate-400 mt-0.5">New entry will appear at the top of the table</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors text-lg"
          >
            ×
          </button>
        </div>


        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Type</label>
            <div className="flex gap-2">
              {["income", "expense"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, type: t }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all ${form.type === t
                      ? t === "income"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-red-500 text-white border-red-500"
                      : "bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-slate-300"
                    }`}
                >
                  {t === "income" ? "⬆ Income" : "⬇ Expense"}
                </button>
              ))}
            </div>
          </div>


          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
            <input
              type="text"
              placeholder="e.g. Salary, Groceries..."
              value={form.category}
              onChange={e => { setForm(f => ({ ...f, category: e.target.value })); setError(""); }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100 placeholder-slate-300 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Amount (₹)</label>
            <input
              type="number"
              min="1"
              placeholder="0.00"
              value={form.amount}
              onChange={e => { setForm(f => ({ ...f, amount: e.target.value })); setError(""); }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100 placeholder-slate-300 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 text-sm transition-all"
            />
          </div>


          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 text-sm transition-all"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 font-semibold bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-100 dark:border-red-800">{error}</p>
          )}


          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#5955E6] hover:bg-[#4845c7] text-white font-bold text-sm transition-colors shadow-sm"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function TransactionTable() {
  const { data, search, setSearch, role, addTransaction, updateTransaction, deleteTransaction } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);

  const filtered = data.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => b.id - a.id);

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditForm({ ...t });
  };

  const handleSave = () => {
    updateTransaction(editForm);
    setEditingId(null);
  };

  const exportCSV = () => {
    const headers = ["Date", "Category", "Amount", "Type"];
    const rows = sorted.map(t => [t.date, t.category, t.amount, t.type]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onSave={addTransaction}
        />
      )}

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 h-full transition-colors duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <input
            placeholder="Search category..."
            value={search}
            className="bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 transition-all w-full sm:w-1/2 text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2 w-full sm:w-auto">

            <button
              onClick={exportCSV}
              title="Export transactions as CSV"
              className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>


            {role === "admin" && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 bg-[#5955E6] hover:bg-[#4845c7] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                Add Transaction
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl pb-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 dark:text-slate-500 uppercase text-xs font-bold tracking-widest border-b border-slate-100 dark:border-slate-700">
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 px-3">Type</th>
                {role === "admin" && <th className="pb-3 px-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-200 font-medium">
              {sorted.map((t) => (
                <tr key={t.id} className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  {editingId === t.id ? (
                    <>
                      <td className="py-4 px-3 text-sm">
                        <input type="date" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-1.5 rounded-lg outline-none focus:border-blue-400 text-slate-700 dark:text-slate-100 text-sm box-border w-full" />
                      </td>
                      <td className="py-4 px-3">
                        <input type="text" value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-1.5 rounded-lg outline-none focus:border-blue-400 text-slate-700 dark:text-slate-100 text-sm box-border w-full" />
                      </td>
                      <td className="py-4 px-3 font-bold">
                        <input type="number" value={editForm.amount} onChange={e => setEditForm({ ...editForm, amount: Number(e.target.value) })} className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-1.5 rounded-lg outline-none focus:border-blue-400 text-slate-700 dark:text-slate-100 font-bold text-sm w-24 box-border" />
                      </td>
                      <td className="py-4 px-3">
                        <select value={editForm.type} onChange={e => setEditForm({ ...editForm, type: e.target.value })} className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-1.5 rounded-lg outline-none focus:border-blue-400 text-slate-700 dark:text-slate-100 font-semibold text-xs uppercase tracking-wide box-border w-full">
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
                        </select>
                      </td>
                      <td className="py-4 px-3 text-right text-xs">
                        <div className="flex justify-end gap-2 align-middle h-full">
                          <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg font-semibold uppercase tracking-wide text-xs transition-colors">Save</button>
                          <button onClick={() => setEditingId(null)} className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-4 py-1.5 rounded-lg font-semibold uppercase tracking-wide text-xs transition-colors">Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-3 text-sm text-slate-400 dark:text-slate-500">{t.date}</td>
                      <td className="py-4 px-3 text-sm">{t.category}</td>
                      <td className={`py-4 px-3 font-bold text-sm ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>₹{t.amount}</td>
                      <td className="py-4 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${t.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
                          {t.type}
                        </span>
                      </td>
                      {role === "admin" && (
                        <td className="py-4 px-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => startEdit(t)} className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold px-4 py-1.5 rounded-lg text-xs uppercase tracking-wide transition-colors">
                              Edit
                            </button>
                            <button onClick={() => deleteTransaction(t.id)} className="bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800 font-semibold px-4 py-1.5 rounded-lg text-xs uppercase tracking-wide transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
