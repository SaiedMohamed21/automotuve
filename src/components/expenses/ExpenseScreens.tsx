import React, { useState, useEffect, useMemo } from "react";
import { api } from "../../services/api";

// ─── Interfaces & Types ────────────────────────────────────────────────────────

export interface Expense {
  id: number;
  expenseNumber: string;
  expenseDate: string;
  expenseDateIso: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
  notes?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
  isVoided: boolean;
  voidReason?: string;
  voidedAt?: string;
}

export interface CategoryExpenseSummary {
  category: string;
  totalAmount: number;
  count: number;
  percentage: number;
}

export interface ExpenseSummary {
  totalToday: number;
  totalThisMonth: number;
  totalThisYear: number;
  totalAllTime: number;
  filteredTotal: number;
  activeCount: number;
  voidedCount: number;
  categoryBreakdown: CategoryExpenseSummary[];
}

export const PRESET_CATEGORIES = [
  "Electricity",
  "Water",
  "Plumbing",
  "Maintenance",
  "Rent",
  "Internet",
  "Cleaning",
  "Fuel",
  "Transportation",
  "Office Supplies",
  "Government Fees",
  "Miscellaneous",
  "Other",
];

export const PAYMENT_METHODS = [
  "Cash",
  "Visa",
  "InstaPay",
  "Wallet",
  "Bank Transfer",
  "Other",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(val: number): string {
  return (val || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " EGP";
}

function getCategoryIcon(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes("electr")) return "⚡";
  if (c.includes("water")) return "💧";
  if (c.includes("plumb")) return "🔧";
  if (c.includes("maint")) return "🛠️";
  if (c.includes("rent")) return "🏢";
  if (c.includes("net") || c.includes("phone")) return "🌐";
  if (c.includes("clean")) return "🧹";
  if (c.includes("fuel") || c.includes("gas")) return "⛽";
  if (c.includes("transport") || c.includes("travel")) return "🚗";
  if (c.includes("office") || c.includes("supply")) return "📎";
  if (c.includes("gov") || c.includes("tax") || c.includes("fee")) return "🏛️";
  return "📋";
}

// ─── Modal: Add Expense ───────────────────────────────────────────────────────

export function AddExpenseModal({
  isOpen,
  onClose,
  onExpenseAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onExpenseAdded: (exp: Expense) => void;
}) {
  const [expenseDate, setExpenseDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState<string>("Electricity");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [isCustomCat, setIsCustomCat] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [reference, setReference] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setExpenseDate(new Date().toISOString().split("T")[0]);
      setCategory("Electricity");
      setCustomCategory("");
      setIsCustomCat(false);
      setDescription("");
      setAmount("");
      setPaymentMethod("Cash");
      setReference("");
      setNotes("");
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const finalCat = isCustomCat ? customCategory.trim() : category.trim();
    if (!finalCat) {
      setError("Please select or enter an expense category");
      return;
    }
    if (!description.trim()) {
      setError("Expense description is required");
      return;
    }
    const numAmount = parseFloat(String(amount));
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Expense amount must be greater than 0");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        expenseDate: expenseDate ? new Date(expenseDate).toISOString() : new Date().toISOString(),
        category: finalCat,
        description: description.trim(),
        amount: numAmount,
        paymentMethod: paymentMethod.trim() || "Cash",
        reference: reference.trim() || undefined,
        notes: notes.trim() || undefined,
      };

      const result = await api.createExpense(payload);
      onExpenseAdded(result);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to record operating expense");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#e5e7eb] w-full max-w-[560px] overflow-hidden my-6">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#060f1e] text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[18px]">📋</span>
              <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]">
                Add Operating Expense
              </h3>
            </div>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-white/60 mt-0.5">
              Record a workshop operating expense (non-supplier, non-customer, non-payroll)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-[18px] leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-[6px] font-['Inter:Medium',sans-serif]">
              {error}
            </div>
          )}

          {/* Date & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Expense Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-['Inter:Medium',sans-serif] text-[12px] text-[#374151]">
                  Category <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomCat(!isCustomCat)}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-['Inter:Medium',sans-serif] underline"
                >
                  {isCustomCat ? "Choose from list" : "+ Custom category"}
                </button>
              </div>

              {isCustomCat ? (
                <input
                  type="text"
                  required
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g. Workshop Insurance"
                  className="w-full h-9 px-3 border border-blue-400 bg-blue-50/20 rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
                />
              ) : (
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value === "CUSTOM") {
                      setIsCustomCat(true);
                    } else {
                      setCategory(e.target.value);
                    }
                  }}
                  className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
                >
                  {PRESET_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {getCategoryIcon(c)} {c}
                    </option>
                  ))}
                  <option value="CUSTOM">+ Add New Category...</option>
                </select>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Workshop electricity bill for August"
              className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
            />
          </div>

          {/* Amount & Payment Method */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Amount (EGP) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0.01"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Semi_Bold',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>

            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reference & Notes */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Reference / Receipt # (Optional)
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. REC-8832 or Bill #992"
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes"
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-[6px] text-[11px] text-amber-900 flex items-start gap-2">
            <span className="text-[14px]">ℹ️</span>
            <span>
              <strong>Accounting Separation:</strong> Operating expenses are distinct from supplier purchases, customer job expenses, and technician payroll.
            </span>
          </div>

          <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-['Inter:Medium',sans-serif] text-[#4b5563] hover:bg-[#f3f4f6] rounded-[6px] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-[13px] font-['Inter:Semi_Bold',sans-serif] bg-[#060f1e] hover:bg-[#060f1e]/90 text-white rounded-[6px] transition-colors shadow-xs flex items-center gap-2"
            >
              {submitting && <span className="animate-spin text-[12px]">⏳</span>}
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Modal: Edit Expense ──────────────────────────────────────────────────────

export function EditExpenseModal({
  isOpen,
  onClose,
  expense,
  onExpenseUpdated,
}: {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense;
  onExpenseUpdated: (exp: Expense) => void;
}) {
  const [expenseDate, setExpenseDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [isCustomCat, setIsCustomCat] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [reference, setReference] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && expense) {
      setExpenseDate(expense.expenseDateIso || new Date().toISOString().split("T")[0]);
      if (PRESET_CATEGORIES.includes(expense.category)) {
        setCategory(expense.category);
        setIsCustomCat(false);
      } else {
        setCategory("Other");
        setCustomCategory(expense.category);
        setIsCustomCat(true);
      }
      setDescription(expense.description);
      setAmount(expense.amount);
      setPaymentMethod(expense.paymentMethod || "Cash");
      setReference(expense.reference || "");
      setNotes(expense.notes || "");
      setError(null);
    }
  }, [isOpen, expense]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const finalCat = isCustomCat ? customCategory.trim() : category.trim();
    if (!finalCat) {
      setError("Please select or enter an expense category");
      return;
    }
    if (!description.trim()) {
      setError("Expense description is required");
      return;
    }
    const numAmount = parseFloat(String(amount));
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Expense amount must be greater than 0");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        expenseDate: expenseDate ? new Date(expenseDate).toISOString() : undefined,
        category: finalCat,
        description: description.trim(),
        amount: numAmount,
        paymentMethod: paymentMethod.trim() || "Cash",
        reference: reference.trim() || undefined,
        notes: notes.trim() || undefined,
      };

      const result = await api.updateExpense(expense.id, payload);
      onExpenseUpdated(result);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update operating expense");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#e5e7eb] w-full max-w-[560px] overflow-hidden my-6">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#060f1e] text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[18px]">✏️</span>
              <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]">
                Edit Expense: {expense.expenseNumber}
              </h3>
            </div>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-white/60 mt-0.5">
              Modify operating expense record details
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-[18px] leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-[6px] font-['Inter:Medium',sans-serif]">
              {error}
            </div>
          )}

          {/* Read-only identifier banner */}
          <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-[6px] flex items-center justify-between text-[12px]">
            <span className="text-gray-600 font-['Inter:Medium',sans-serif]">
              Expense Number: <strong className="font-['JetBrains_Mono',monospace] text-gray-900">{expense.expenseNumber}</strong>
            </span>
            <span className="text-gray-500 text-[11px]">Audit Safe • Locked</span>
          </div>

          {/* Date & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Expense Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-['Inter:Medium',sans-serif] text-[12px] text-[#374151]">
                  Category <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomCat(!isCustomCat)}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-['Inter:Medium',sans-serif] underline"
                >
                  {isCustomCat ? "Choose from list" : "+ Custom category"}
                </button>
              </div>

              {isCustomCat ? (
                <input
                  type="text"
                  required
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g. Workshop Insurance"
                  className="w-full h-9 px-3 border border-blue-400 bg-blue-50/20 rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
                />
              ) : (
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value === "CUSTOM") {
                      setIsCustomCat(true);
                    } else {
                      setCategory(e.target.value);
                    }
                  }}
                  className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
                >
                  {PRESET_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {getCategoryIcon(c)} {c}
                    </option>
                  ))}
                  <option value="CUSTOM">+ Add New Category...</option>
                </select>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Workshop electricity bill for August"
              className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
            />
          </div>

          {/* Amount & Payment Method */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Amount (EGP) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0.01"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Semi_Bold',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>

            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reference & Notes */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Reference / Receipt # (Optional)
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-['Inter:Medium',sans-serif] text-[#4b5563] hover:bg-[#f3f4f6] rounded-[6px] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-[13px] font-['Inter:Semi_Bold',sans-serif] bg-[#060f1e] hover:bg-[#060f1e]/90 text-white rounded-[6px] transition-colors shadow-xs flex items-center gap-2"
            >
              {submitting && <span className="animate-spin text-[12px]">⏳</span>}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Modal: Void Expense ──────────────────────────────────────────────────────

export function VoidExpenseModal({
  isOpen,
  onClose,
  expense,
  onExpenseVoided,
}: {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense;
  onExpenseVoided: (exp: Expense) => void;
}) {
  const [reason, setReason] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleVoid() {
    setSubmitting(true);
    setError(null);
    try {
      const result = await api.voidExpense(expense.id, reason.trim() || undefined);
      onExpenseVoided(result);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to void expense");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#e5e7eb] w-full max-w-[480px] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e7eb] bg-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[18px]">⚠️</span>
            <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]">
              Void Expense: {expense.expenseNumber}
            </h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-[18px] leading-none">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-[6px]">
              {error}
            </div>
          )}

          <div className="bg-gray-50 p-3 rounded-[8px] border border-gray-200 text-[13px] space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Amount:</span>
              <strong className="text-gray-900">{formatCurrency(expense.amount)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Category:</span>
              <span className="text-gray-800">{expense.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Description:</span>
              <span className="text-gray-800">{expense.description}</span>
            </div>
          </div>

          <p className="text-[12px] text-gray-600">
            <strong>Audit-safe action:</strong> This operating expense will be marked as <span className="text-red-600 font-semibold">VOID</span>. It will be preserved in the historical ledger for audit tracking, but excluded from all active totals and financial reports.
          </p>

          <div>
            <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
              Reason for Voiding (Optional)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Duplicate entry, incorrect receipt attached"
              className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="pt-2 border-t border-gray-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-['Inter:Medium',sans-serif] text-gray-600 hover:bg-gray-100 rounded-[6px]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleVoid}
              disabled={submitting}
              className="px-4 py-2 text-[13px] font-['Inter:Semi_Bold',sans-serif] bg-red-600 hover:bg-red-700 text-white rounded-[6px] flex items-center gap-2"
            >
              {submitting && <span className="animate-spin text-[12px]">⏳</span>}
              Confirm Void
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal: Canonical Expense Details View ────────────────────────────────────

export function ExpenseDetailsModal({
  isOpen,
  onClose,
  expense,
  onEditClick,
  onVoidClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense;
  onEditClick: () => void;
  onVoidClick: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#e5e7eb] w-full max-w-[560px] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#060f1e] text-white">
          <div className="flex items-center gap-2.5">
            <span className="text-[20px]">{getCategoryIcon(expense.category)}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]">
                  Expense Details
                </h3>
                <span className="font-['JetBrains_Mono',monospace] text-[12px] bg-white/10 px-2 py-0.5 rounded text-white/90">
                  {expense.expenseNumber}
                </span>
              </div>
              <p className="font-['Inter:Regular',sans-serif] text-[11px] text-white/60 mt-0.5">
                SOS Motor Works General / Operating Expense
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-[18px] leading-none">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Status banner */}
          {expense.isVoided ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-[8px] text-[12px] text-red-800 space-y-1">
              <div className="font-['Inter:Bold',sans-serif] flex items-center gap-1.5">
                <span>⛔</span> THIS EXPENSE IS VOIDED
              </div>
              <div>Void Reason: <em>{expense.voidReason || "Voided by user"}</em></div>
              {expense.voidedAt && <div className="text-[11px] text-red-600">Voided on: {expense.voidedAt}</div>}
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-[8px] flex items-center justify-between text-[12px] text-emerald-900">
              <div className="font-['Inter:Semi_Bold',sans-serif] flex items-center gap-1.5">
                <span>✓</span> Active Operating Expense
              </div>
              <span className="text-[11px] text-emerald-700">Included in Financial Totals</span>
            </div>
          )}

          {/* Amount Card */}
          <div className="p-4 bg-gradient-to-r from-[#060f1e] to-[#1e293b] text-white rounded-[10px] flex items-center justify-between shadow-xs">
            <div>
              <p className="text-[11px] text-white/60 uppercase tracking-wider font-['Inter:Semi_Bold',sans-serif]">
                Total Amount
              </p>
              <p className="text-[24px] font-['Inter:Bold',sans-serif] font-bold mt-1 text-white">
                {formatCurrency(expense.amount)}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 bg-white/15 rounded-[6px] text-[12px] font-['Inter:Medium',sans-serif]">
                💳 {expense.paymentMethod}
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="border border-[#e5e7eb] rounded-[8px] overflow-hidden text-[13px] divide-y divide-[#f3f4f6]">
            <div className="grid grid-cols-3 p-3 bg-[#f9fafb]">
              <span className="text-gray-500 font-['Inter:Medium',sans-serif]">Date:</span>
              <span className="col-span-2 font-['Inter:Semi_Bold',sans-serif] text-gray-900">{expense.expenseDate}</span>
            </div>
            <div className="grid grid-cols-3 p-3">
              <span className="text-gray-500 font-['Inter:Medium',sans-serif]">Category:</span>
              <span className="col-span-2 text-gray-900 flex items-center gap-1.5 font-['Inter:Medium',sans-serif]">
                <span>{getCategoryIcon(expense.category)}</span> {expense.category}
              </span>
            </div>
            <div className="grid grid-cols-3 p-3 bg-[#f9fafb]">
              <span className="text-gray-500 font-['Inter:Medium',sans-serif]">Description:</span>
              <span className="col-span-2 text-gray-900 font-['Inter:Regular',sans-serif]">{expense.description}</span>
            </div>
            <div className="grid grid-cols-3 p-3">
              <span className="text-gray-500 font-['Inter:Medium',sans-serif]">Reference / Bill #:</span>
              <span className="col-span-2 text-gray-900 font-['JetBrains_Mono',monospace]">
                {expense.reference || "—"}
              </span>
            </div>
            <div className="grid grid-cols-3 p-3 bg-[#f9fafb]">
              <span className="text-gray-500 font-['Inter:Medium',sans-serif]">Notes:</span>
              <span className="col-span-2 text-gray-700">{expense.notes || "—"}</span>
            </div>
            <div className="grid grid-cols-3 p-3">
              <span className="text-gray-500 font-['Inter:Medium',sans-serif]">Recorded By:</span>
              <span className="col-span-2 text-gray-700">{expense.createdBy || "Accountant"}</span>
            </div>
            <div className="grid grid-cols-3 p-3 bg-[#f9fafb]">
              <span className="text-gray-500 font-['Inter:Medium',sans-serif]">Recorded At:</span>
              <span className="col-span-2 text-gray-600 text-[12px]">{expense.createdAt}</span>
            </div>
            {expense.updatedAt && (
              <div className="grid grid-cols-3 p-3">
                <span className="text-gray-500 font-['Inter:Medium',sans-serif]">Last Updated:</span>
                <span className="col-span-2 text-gray-600 text-[12px]">{expense.updatedAt}</span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-between">
            <div>
              {!expense.isVoided && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onVoidClick();
                  }}
                  className="px-3.5 py-2 text-[12px] font-['Inter:Medium',sans-serif] text-red-600 hover:bg-red-50 border border-red-200 rounded-[6px] transition-colors"
                >
                  Void Expense
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[13px] font-['Inter:Medium',sans-serif] text-[#4b5563] hover:bg-[#f3f4f6] rounded-[6px] transition-colors"
              >
                Close
              </button>
              {!expense.isVoided && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEditClick();
                  }}
                  className="px-4 py-2 text-[13px] font-['Inter:Semi_Bold',sans-serif] bg-[#060f1e] hover:bg-[#060f1e]/90 text-white rounded-[6px] transition-colors shadow-xs"
                >
                  Edit Expense
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Screen: Expenses Dashboard ──────────────────────────────────────────

export function ExpensesDashboardScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary>({
    totalToday: 0,
    totalThisMonth: 0,
    totalThisYear: 0,
    totalAllTime: 0,
    filteredTotal: 0,
    activeCount: 0,
    voidedCount: 0,
    categoryBreakdown: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Filters state
  const [search, setSearch] = useState<string>("");
  const [datePreset, setDatePreset] = useState<"All" | "Today" | "This Week" | "This Month" | "This Year" | "Custom">("This Month");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("All");
  const [includeVoided, setIncludeVoided] = useState<boolean>(false);
  const [showCategoryBreakdown, setShowCategoryBreakdown] = useState<boolean>(true);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [viewingExpense, setViewingExpense] = useState<Expense | null>(null);
  const [voidingExpense, setVoidingExpense] = useState<Expense | null>(null);

  // Update dateFrom / dateTo when preset changes
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    if (datePreset === "Today") {
      setDateFrom(todayStr);
      setDateTo(todayStr);
    } else if (datePreset === "This Week") {
      const d = new Date(today);
      const day = d.getDay(); // 0 is Sunday
      d.setDate(d.getDate() - day);
      const startOfWeek = d.toISOString().split("T")[0];
      setDateFrom(startOfWeek);
      setDateTo(todayStr);
    } else if (datePreset === "This Month") {
      setDateFrom(`${yyyy}-${mm}-01`);
      setDateTo(todayStr);
    } else if (datePreset === "This Year") {
      setDateFrom(`${yyyy}-01-01`);
      setDateTo(todayStr);
    } else if (datePreset === "All") {
      setDateFrom("");
      setDateTo("");
    }
  }, [datePreset]);

  async function loadData() {
    setLoading(true);
    try {
      const [list, summ] = await Promise.all([
        api.getExpenses({
          dateFrom: dateFrom || undefined,
          dateTo: dateTo || undefined,
          category: categoryFilter !== "All" ? categoryFilter : undefined,
          paymentMethod: paymentMethodFilter !== "All" ? paymentMethodFilter : undefined,
          search: search.trim() || undefined,
          includeVoided: includeVoided,
        }),
        api.getExpensesSummary({
          dateFrom: dateFrom || undefined,
          dateTo: dateTo || undefined,
        }),
      ]);

      setExpenses(list || []);
      setSummary(summ || {
        totalToday: 0,
        totalThisMonth: 0,
        totalThisYear: 0,
        totalAllTime: 0,
        filteredTotal: 0,
        activeCount: 0,
        voidedCount: 0,
        categoryBreakdown: [],
      });
    } catch (err) {
      console.error("Failed to load operating expenses:", err);
    } finally {
      setLoading(false);
    }
  }

  // Reload when filters change
  useEffect(() => {
    loadData();
  }, [dateFrom, dateTo, categoryFilter, paymentMethodFilter, search, includeVoided]);

  // Unique categories in current dataset
  const availableCategories = useMemo(() => {
    const cats = new Set(PRESET_CATEGORIES);
    expenses.forEach((e) => {
      if (e.category) cats.add(e.category);
    });
    return Array.from(cats);
  }, [expenses]);

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">

        {/* Top Header & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[12px] border border-[#e5e7eb] shadow-xs">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[22px]">📋</span>
              <h2 className="font-['Inter:Bold',sans-serif] text-[18px] text-[#111827]">
                Operating Expenses / المصروفات التشغيلية
              </h2>
            </div>
            <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6b7280] mt-1">
              Track workshop general overhead (utilities, rent, plumbing, internet, cleaning, supplies) — separate from suppliers & jobs.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              title="Refresh expenses"
              className="h-9 px-3 border border-[#d1d5db] hover:bg-[#f9fafb] text-[#4b5563] rounded-[6px] text-[13px] font-['Inter:Medium',sans-serif] transition-colors flex items-center gap-1.5"
            >
              🔄 Refresh
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="h-9 px-4 bg-[#060f1e] hover:bg-[#060f1e]/90 text-white rounded-[6px] text-[13px] font-['Inter:Semi_Bold',sans-serif] transition-colors shadow-xs flex items-center gap-2"
            >
              <span>+</span> Add Expense
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Medium',sans-serif] text-[12px] text-[#6b7280]">Expenses Today</span>
              <span className="text-[18px]">⚡</span>
            </div>
            <p className="font-['Inter:Bold',sans-serif] text-[22px] text-[#111827] mt-2">
              {formatCurrency(summary.totalToday)}
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#9ca3af] mt-1">
              Workshop daily spending
            </p>
          </div>

          <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Medium',sans-serif] text-[12px] text-[#6b7280]">This Month</span>
              <span className="text-[18px]">📅</span>
            </div>
            <p className="font-['Inter:Bold',sans-serif] text-[22px] text-blue-900 mt-2">
              {formatCurrency(summary.totalThisMonth)}
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#9ca3af] mt-1">
              Current calendar month
            </p>
          </div>

          <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Medium',sans-serif] text-[12px] text-[#6b7280]">This Year</span>
              <span className="text-[18px]">📊</span>
            </div>
            <p className="font-['Inter:Bold',sans-serif] text-[22px] text-purple-900 mt-2">
              {formatCurrency(summary.totalThisYear)}
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#9ca3af] mt-1">
              Current fiscal year
            </p>
          </div>

          <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Medium',sans-serif] text-[12px] text-[#6b7280]">Total Expenses</span>
              <span className="text-[18px]">💰</span>
            </div>
            <p className="font-['Inter:Bold',sans-serif] text-[22px] text-[#060f1e] mt-2">
              {formatCurrency(summary.totalAllTime)}
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#9ca3af] mt-1">
              {summary.activeCount} active transactions
            </p>
          </div>
        </div>

        {/* Category Breakdown Panel */}
        <div className="bg-white rounded-[10px] border border-[#e5e7eb] shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#e5e7eb] flex items-center justify-between bg-[#fcfcfd]">
            <div className="flex items-center gap-2">
              <span className="text-[16px]">📊</span>
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[13px] text-[#111827]">
                Category Breakdown ({datePreset === "Custom" ? "Custom Range" : datePreset})
              </span>
              <span className="text-[11px] text-[#6b7280] font-normal">
                Total: <strong>{formatCurrency(summary.filteredTotal)}</strong>
              </span>
            </div>
            <button
              onClick={() => setShowCategoryBreakdown(!showCategoryBreakdown)}
              className="text-[12px] text-[#4b5563] hover:text-[#111827] font-['Inter:Medium',sans-serif]"
            >
              {showCategoryBreakdown ? "Hide Summary ▲" : "Show Summary ▼"}
            </button>
          </div>

          {showCategoryBreakdown && (
            <div className="p-5">
              {summary.categoryBreakdown.length === 0 ? (
                <p className="text-[12px] text-gray-500 text-center py-3">No expenses recorded for this period.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {summary.categoryBreakdown.map((cb) => (
                    <div
                      key={cb.category}
                      onClick={() => setCategoryFilter(cb.category)}
                      className={`p-3 rounded-[8px] border transition-all cursor-pointer ${
                        categoryFilter === cb.category
                          ? "border-[#060f1e] bg-gray-50 ring-1 ring-[#060f1e]"
                          : "border-[#e5e7eb] hover:bg-[#f9fafb]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-['Inter:Semi_Bold',sans-serif] text-[#111827] flex items-center gap-1.5">
                          <span>{getCategoryIcon(cb.category)}</span> {cb.category}
                        </span>
                        <strong className="text-[#060f1e]">{formatCurrency(cb.totalAmount)}</strong>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                          className="bg-[#060f1e] h-1.5 rounded-full"
                          style={{ width: `${Math.min(100, Math.max(4, cb.percentage))}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                        <span>{cb.count} transaction{cb.count > 1 ? "s" : ""}</span>
                        <span>{cb.percentage}% of total</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 shadow-xs space-y-3">
          {/* Quick Date Range Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center border border-[#d1d5db] rounded-[6px] overflow-hidden text-[12px] font-['Inter:Medium',sans-serif]">
              {(["Today", "This Week", "This Month", "This Year", "All", "Custom"] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setDatePreset(preset)}
                  className={`px-3 py-1.5 transition-colors ${
                    datePreset === preset
                      ? "bg-[#060f1e] text-white"
                      : "bg-white text-[#4b5563] hover:bg-gray-100"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-[12px] text-[#4b5563] font-['Inter:Medium',sans-serif] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeVoided}
                  onChange={(e) => setIncludeVoided(e.target.checked)}
                  className="rounded border-gray-300 text-[#060f1e] focus:ring-[#060f1e]"
                />
                Show Voided ({summary.voidedCount})
              </label>

              {(categoryFilter !== "All" || paymentMethodFilter !== "All" || search || datePreset !== "This Month") && (
                <button
                  onClick={() => {
                    setCategoryFilter("All");
                    setPaymentMethodFilter("All");
                    setSearch("");
                    setDatePreset("This Month");
                    setIncludeVoided(false);
                  }}
                  className="text-[12px] text-red-600 hover:text-red-800 underline font-['Inter:Medium',sans-serif]"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Search & Custom Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2 border-t border-[#f3f4f6]">
            {/* Search */}
            <div className="lg:col-span-4 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search description, expense #, notes..."
                className="w-full h-9 pl-9 pr-3 border border-[#d1d5db] rounded-[6px] text-[12.5px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>

            {/* Date From (if Custom or editable) */}
            <div className="lg:col-span-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  setDatePreset("Custom");
                }}
                className="w-full h-9 px-2.5 border border-[#d1d5db] rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
                title="From Date"
              />
            </div>

            {/* Date To (if Custom or editable) */}
            <div className="lg:col-span-2">
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setDatePreset("Custom");
                }}
                className="w-full h-9 px-2.5 border border-[#d1d5db] rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
                title="To Date"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              >
                <option value="All">All Categories</option>
                {availableCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method Filter */}
            <div className="lg:col-span-2">
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              >
                <option value="All">All Payment Methods</option>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Expenses List Table */}
        <div className="bg-white rounded-[10px] border border-[#e5e7eb] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f9fafb] text-[#6b7280] font-['Inter:Semi_Bold',sans-serif] uppercase tracking-wider text-[11px] border-b border-[#e5e7eb]">
                <tr>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Expense #</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Description</th>
                  <th className="px-5 py-3.5 text-right">Amount</th>
                  <th className="px-5 py-3.5">Payment Method</th>
                  <th className="px-5 py-3.5">Reference</th>
                  <th className="px-5 py-3.5">Created By</th>
                  <th className="px-5 py-3.5 text-center">Status</th>
                  <th className="px-5 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="px-5 py-12 text-center text-[#9ca3af]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-[20px] animate-spin">⏳</span>
                        <span>Loading operating expenses...</span>
                      </div>
                    </td>
                  </tr>
                ) : expenses.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-5 py-12 text-center text-[#9ca3af]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-[24px]">📋</span>
                        <p className="text-[14px] font-['Inter:Medium',sans-serif] text-[#374151]">
                          No operating expenses found
                        </p>
                        <p className="text-[12px] text-[#9ca3af]">
                          {search || categoryFilter !== "All"
                            ? "No expenses match the current filter criteria."
                            : "Click '+ Add Expense' to record your first operating expense."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  expenses.map((exp) => (
                    <tr
                      key={exp.id}
                      className={`hover:bg-[#f9fafb] transition-colors ${
                        exp.isVoided ? "bg-red-50/30 opacity-70" : ""
                      }`}
                    >
                      <td className="px-5 py-3.5 font-['Inter:Regular',sans-serif] text-[#4b5563] whitespace-nowrap">
                        {exp.expenseDate}
                      </td>
                      <td className="px-5 py-3.5 font-['JetBrains_Mono',monospace] text-[#060f1e] font-semibold">
                        <button
                          type="button"
                          onClick={() => setViewingExpense(exp)}
                          className="hover:underline text-[#060f1e]"
                        >
                          {exp.expenseNumber}
                        </button>
                      </td>
                      <td className="px-5 py-3.5 font-['Inter:Medium',sans-serif] text-[#111827] whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] bg-gray-100 text-gray-800">
                          <span>{getCategoryIcon(exp.category)}</span> {exp.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-['Inter:Regular',sans-serif] text-[#374151] max-w-[260px] truncate">
                        <span title={exp.description}>{exp.description}</span>
                        {exp.notes && (
                          <div className="text-[11px] text-gray-400 truncate" title={exp.notes}>
                            {exp.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right font-['Inter:Bold',sans-serif] text-[#111827] whitespace-nowrap">
                        <span className={exp.isVoided ? "line-through text-red-500" : ""}>
                          {formatCurrency(exp.amount)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-['Inter:Regular',sans-serif] text-[#4b5563] whitespace-nowrap">
                        {exp.paymentMethod}
                      </td>
                      <td className="px-5 py-3.5 font-['JetBrains_Mono',monospace] text-[#6b7280] text-[12px]">
                        {exp.reference || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-[#6b7280] text-[12px]">
                        {exp.createdBy || "Accountant"}
                      </td>
                      <td className="px-5 py-3.5 text-center whitespace-nowrap">
                        {exp.isVoided ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-['Inter:Medium',sans-serif] bg-red-100 text-red-700">
                            Voided
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-['Inter:Medium',sans-serif] bg-emerald-100 text-emerald-800">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingExpense(exp)}
                            title="View details"
                            className="px-2 py-1 text-[11px] font-['Inter:Medium',sans-serif] text-[#060f1e] hover:bg-gray-100 rounded transition-colors"
                          >
                            View
                          </button>
                          {!exp.isVoided && (
                            <>
                              <button
                                type="button"
                                onClick={() => setEditingExpense(exp)}
                                title="Edit expense"
                                className="px-2 py-1 text-[11px] font-['Inter:Medium',sans-serif] text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => setVoidingExpense(exp)}
                                title="Void expense"
                                className="px-2 py-1 text-[11px] font-['Inter:Medium',sans-serif] text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                Void
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddExpenseModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onExpenseAdded={() => {
            loadData();
          }}
        />
      )}

      {editingExpense && (
        <EditExpenseModal
          isOpen={!!editingExpense}
          onClose={() => setEditingExpense(null)}
          expense={editingExpense}
          onExpenseUpdated={() => {
            loadData();
          }}
        />
      )}

      {viewingExpense && (
        <ExpenseDetailsModal
          isOpen={!!viewingExpense}
          onClose={() => setViewingExpense(null)}
          expense={viewingExpense}
          onEditClick={() => {
            setEditingExpense(viewingExpense);
            setViewingExpense(null);
          }}
          onVoidClick={() => {
            setVoidingExpense(viewingExpense);
            setViewingExpense(null);
          }}
        />
      )}

      {voidingExpense && (
        <VoidExpenseModal
          isOpen={!!voidingExpense}
          onClose={() => setVoidingExpense(null)}
          expense={voidingExpense}
          onExpenseVoided={() => {
            loadData();
          }}
        />
      )}
    </div>
  );
}
