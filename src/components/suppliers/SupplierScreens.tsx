import React, { useState, useEffect, useMemo } from "react";
import { api } from "../../services/api";

// ─── Interfaces & Types ────────────────────────────────────────────────────────

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  company?: string;
  address?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  totalPurchases: number;
  totalPaid: number;
  outstandingBalance: number;
  lastPaymentDate?: string;
}

export interface SupplierSummary {
  totalSuppliers: number;
  totalPurchases: number;
  totalPaid: number;
  totalOutstandingDebt: number;
}

export interface SupplierPurchaseItem {
  id: number;
  partId: number;
  partName: string;
  partNumber: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SupplierPurchase {
  id: number;
  purchaseNumber: string;
  supplierId: number;
  supplierName: string;
  purchaseDate: string;
  dueDate?: string;
  notes?: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentStatus: "Paid" | "Partially Paid" | "Unpaid" | string;
  createdAt: string;
  items: SupplierPurchaseItem[];
}

export interface SupplierPayment {
  id: number;
  paymentNumber: string;
  supplierId: number;
  supplierName: string;
  purchaseId?: number;
  purchaseNumber?: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  reference?: string;
  notes?: string;
  createdBy?: string;
  createdAt: string;
}

export interface SupplierStatementEntry {
  id: number;
  date: string;
  type: "PURCHASE" | "PAYMENT" | string;
  referenceNumber: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface SupplierStatement {
  supplierId: number;
  supplierName: string;
  totalPurchases: number;
  totalPaid: number;
  outstandingBalance: number;
  transactions: SupplierStatementEntry[];
}

export interface InventoryPart {
  id: string | number;
  name: string;
  number: string;
  oem?: string;
  brand?: string;
  category?: string;
  currentQty: number;
  minQty?: number;
  purchasePrice?: number;
  sellingPrice?: number;
  compatibleVehicles?: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(val: number): string {
  return (val || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " EGP";
}

function formatDateDisplay(dStr?: string): string {
  if (!dStr) return "—";
  try {
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return dStr;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return dStr;
  }
}

// ─── Modals ───────────────────────────────────────────────────────────────────

export function AddSupplierModal({
  isOpen,
  onClose,
  onSaved,
  supplierToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (supplier: Supplier) => void;
  supplierToEdit?: Supplier | null;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (supplierToEdit) {
      setName(supplierToEdit.name);
      setPhone(supplierToEdit.phone);
      setCompany(supplierToEdit.company || "");
      setAddress(supplierToEdit.address || "");
      setNotes(supplierToEdit.notes || "");
      setIsActive(supplierToEdit.isActive);
    } else {
      setName("");
      setPhone("");
      setCompany("");
      setAddress("");
      setNotes("");
      setIsActive(true);
    }
    setError(null);
  }, [supplierToEdit, isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Supplier Name is required");
      return;
    }
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        company: company.trim() || undefined,
        address: address.trim() || undefined,
        notes: notes.trim() || undefined,
        isActive,
      };

      let result: Supplier;
      if (supplierToEdit) {
        result = await api.updateSupplier(supplierToEdit.id, payload);
      } else {
        result = await api.createSupplier(payload);
      }
      onSaved(result);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to save supplier");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#e5e7eb] w-full max-w-[520px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#060f1e] text-white">
          <div className="flex items-center gap-2.5">
            <span className="text-[18px]">🚚</span>
            <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]">
              {supplierToEdit ? "Edit Supplier" : "Add New Supplier"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-[18px] leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-[6px] font-['Inter:Medium',sans-serif]">
              {error}
            </div>
          )}

          <div>
            <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
              Supplier Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Al-Ahram Auto Parts"
              className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e] focus:ring-1 focus:ring-[#060f1e]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 01012345678"
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e] focus:ring-1 focus:ring-[#060f1e]"
              />
            </div>
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Company / Trade Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Al-Ahram Trading Co."
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e] focus:ring-1 focus:ring-[#060f1e]"
              />
            </div>
          </div>

          <div>
            <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 15 El-Tayaran St, Nasr City, Cairo"
              className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e] focus:ring-1 focus:ring-[#060f1e]"
            />
          </div>

          <div>
            <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
              Notes / Terms
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Payment terms, contact person, working hours, etc."
              className="w-full p-2.5 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e] focus:ring-1 focus:ring-[#060f1e] resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-[#d1d5db] text-[#060f1e] focus:ring-[#060f1e]"
            />
            <label htmlFor="isActive" className="font-['Inter:Regular',sans-serif] text-[13px] text-[#374151] select-none">
              Active Supplier (eligible for new purchases)
            </label>
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
              {supplierToEdit ? "Save Changes" : "Create Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Modal: Create New Part Inside Supplier Purchase ──────────────────────────

export function CreatePartInPurchaseModal({
  isOpen,
  onClose,
  existingParts,
  onPartCreated,
  onUseExistingPart,
}: {
  isOpen: boolean;
  onClose: () => void;
  existingParts: InventoryPart[];
  onPartCreated: (newPart: InventoryPart, qty: number, unitPrice: number) => void;
  onUseExistingPart: (part: InventoryPart, qty: number, unitPrice: number) => void;
}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [oem, setOem] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [minStock, setMinStock] = useState("1");
  const [quantity, setQuantity] = useState<number>(1);
  const [unitPurchasePrice, setUnitPurchasePrice] = useState<number>(0);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<{
    type: "NUMBER" | "OEM";
    part: InventoryPart;
    message: string;
  } | null>(null);

  // Real-time duplicate check when Part Number or OEM changes
  useEffect(() => {
    const normNum = number.trim().toLowerCase();
    const normOem = oem.trim().toLowerCase();

    if (normNum) {
      const match = existingParts.find(
        (p) => p.number && p.number.trim().toLowerCase() === normNum
      );
      if (match) {
        setDuplicateWarning({
          type: "NUMBER",
          part: match,
          message: `Part Number "${number.trim()}" already belongs to existing part "${match.name}" (Current stock: ${match.currentQty}).`,
        });
        return;
      }
    }

    if (normOem) {
      const match = existingParts.find(
        (p) => p.oem && p.oem.trim().toLowerCase() === normOem
      );
      if (match) {
        setDuplicateWarning({
          type: "OEM",
          part: match,
          message: `OEM Number "${oem.trim()}" already belongs to existing part "${match.name}" (Current stock: ${match.currentQty}).`,
        });
        return;
      }
    }

    setDuplicateWarning(null);
  }, [number, oem, existingParts]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Part Name is required.");
      return;
    }
    if (!category.trim()) {
      setError("Category is required.");
      return;
    }
    if (quantity <= 0) {
      setError("Quantity must be at least 1.");
      return;
    }
    if (unitPurchasePrice < 0) {
      setError("Unit Purchase Price cannot be negative.");
      return;
    }

    // Check duplicate
    if (duplicateWarning) {
      setError("Cannot create duplicate part. Please use the existing part or enter a unique Part / OEM Number.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Option A Data Integrity:
      // Create part as catalog item with CurrentQty = 0 so no initial StockIn movement is created.
      // The Supplier Purchase transaction will receive the stock and log the StockIn movement.
      const payload = {
        name: name.trim(),
        number: number.trim() || undefined,
        oem: oem.trim() || undefined,
        brand: brand.trim() || undefined,
        category: category.trim(),
        currentQty: 0,
        minQty: Math.max(1, parseInt(minStock) || 1),
        purchasePrice: unitPurchasePrice,
        compatibleVehicles: make.trim()
          ? [`${make.trim()} ${model.trim()}`.trim()]
          : undefined,
      };

      const res = await api.createPart(payload);

      const createdPart: InventoryPart = {
        id: res.id,
        name: res.name || name.trim(),
        number: res.number || number.trim() || `PN-${res.id}`,
        oem: res.oem || oem.trim() || undefined,
        brand: res.brand || brand.trim() || undefined,
        category: res.category || category.trim() || "Other",
        currentQty: 0,
        minQty: res.minQty || Math.max(1, parseInt(minStock) || 1),
        purchasePrice: unitPurchasePrice,
        compatibleVehicles: res.compatibleVehicles,
      };

      onPartCreated(createdPart, quantity, unitPurchasePrice);
      onClose();
    } catch (err: any) {
      const errMsg = err?.message || "Failed to create part.";
      setError(errMsg);

      // If backend reports duplicate, check if we can match it
      const match = existingParts.find(
        (p) =>
          (number.trim() && p.number && p.number.toLowerCase() === number.trim().toLowerCase()) ||
          (oem.trim() && p.oem && p.oem.toLowerCase() === oem.trim().toLowerCase())
      );
      if (match) {
        setDuplicateWarning({
          type: "NUMBER",
          part: match,
          message: errMsg,
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  const labelCls = "block font-['Inter:Medium',sans-serif] text-[11px] text-[#4b5563] mb-1";
  const inputCls = "w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]";

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#e5e7eb] w-full max-w-[560px] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#060f1e] text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[18px]">✨</span>
              <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]">
                Create New Part
              </h3>
            </div>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-white/60 mt-0.5">
              Add new catalog item & immediately receive into this supplier purchase
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white text-[18px] leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-3.5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-[6px] font-['Inter:Medium',sans-serif]">
              {error}
            </div>
          )}

          {/* Duplicate Part Warning Banner */}
          {duplicateWarning && (
            <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-[8px] space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="text-[18px]">⚠️</span>
                <div>
                  <p className="text-[12px] text-amber-900 font-['Inter:Semi_Bold',sans-serif]">
                    Part Already Exists in Inventory
                  </p>
                  <p className="text-[11px] text-amber-800 font-['Inter:Regular',sans-serif] mt-0.5">
                    {duplicateWarning.message}
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onUseExistingPart(duplicateWarning.part, quantity, unitPurchasePrice)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-[6px] text-[12px] font-['Inter:Semi_Bold',sans-serif] transition-colors shadow-xs"
                >
                  Use Existing Part & Add to Purchase →
                </button>
                <span className="text-[10px] text-amber-700">or change Part / OEM number to create a new part</span>
              </div>
            </div>
          )}

          {/* Part Name */}
          <div>
            <label className={labelCls}>
              Part Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Air Filter / Front Brake Pads"
              className={inputCls}
            />
          </div>

          {/* Part Number & OEM */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Part Number</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g. AF-2026-001"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>OEM Number</label>
              <input
                type="text"
                value={oem}
                onChange={(e) => setOem(e.target.value)}
                placeholder="e.g. XYZ123"
                className={inputCls}
              />
            </div>
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Mann / Bosch / Brembo"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                list="purchase-part-categories-list"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Filters, Brakes, Engine..."
                className={inputCls}
              />
              <datalist id="purchase-part-categories-list">
                <option value="Filters" />
                <option value="Brakes" />
                <option value="Suspension" />
                <option value="Engine" />
                <option value="Electrical" />
                <option value="Fluids & Oils" />
                <option value="Body" />
                <option value="Transmission" />
                <option value="Exhaust" />
                <option value="Air Conditioning" />
                <option value="Other" />
              </datalist>
            </div>
          </div>

          {/* Compatible Make & Model */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Compatible Make</label>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="e.g. Toyota / BMW / All"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Compatible Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Corolla / 320i"
                className={inputCls}
              />
            </div>
          </div>

          {/* Minimum Stock */}
          <div>
            <label className={labelCls}>Minimum Stock</label>
            <input
              type="number"
              min="1"
              value={minStock}
              onChange={(e) => setMinStock(e.target.value)}
              placeholder="1"
              className={inputCls}
            />
          </div>

          {/* Quantity & Unit Purchase Price Card */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-[8px] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[12px] text-blue-950 flex items-center gap-1.5">
                <span>📦</span> Received from this Supplier
              </span>
              <span className="text-[11px] font-['Inter:Medium',sans-serif] text-blue-800">
                Line Total: <strong>{formatCurrency(quantity * unitPurchasePrice)}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-['Inter:Semi_Bold',sans-serif] text-[11px] text-blue-900 mb-1">
                  Quantity Received <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full h-9 px-3 border border-blue-300 bg-white rounded-[6px] text-[13px] font-['Inter:Semi_Bold',sans-serif] focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block font-['Inter:Semi_Bold',sans-serif] text-[11px] text-blue-900 mb-1">
                  Unit Purchase Price (EGP) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="any"
                  value={unitPurchasePrice}
                  onChange={(e) => setUnitPurchasePrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full h-9 px-3 border border-blue-300 bg-white rounded-[6px] text-[13px] font-['Inter:Semi_Bold',sans-serif] focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <p className="text-[10.5px] text-blue-700 font-['Inter:Regular',sans-serif]">
              ℹ️ The part will be registered in the catalog with 0 initial stock. When you click "Receive Stock & Create Purchase", this quantity (+{quantity}) will be added to stock and logged as a single Stock IN movement with the purchase number.
            </p>
          </div>

          {/* Footer Actions */}
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
              disabled={submitting || !!duplicateWarning || !name.trim() || !category.trim() || quantity <= 0 || unitPurchasePrice < 0}
              className="px-5 py-2 text-[13px] font-['Inter:Semi_Bold',sans-serif] bg-[#060f1e] hover:bg-[#060f1e]/90 text-white rounded-[6px] transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              {submitting && <span className="animate-spin text-[12px]">⏳</span>}
              Save & Add to Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Modal: Create Supplier Purchase ──────────────────────────────────────────

export function AddPurchaseModal({
  isOpen,
  onClose,
  supplier,
  parts,
  onPurchaseCreated,
  onPartCreatedInInventory,
}: {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier;
  parts: InventoryPart[];
  onPurchaseCreated: (purchase: SupplierPurchase) => void;
  onPartCreatedInInventory?: (newPart: InventoryPart) => void;
}) {
  const [purchaseDate, setPurchaseDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  
  // Available parts (includes existing parts + newly created parts in this purchase session)
  const [availableParts, setAvailableParts] = useState<InventoryPart[]>(parts);
  const [isNewPartModalOpen, setIsNewPartModalOpen] = useState<boolean>(false);

  // Line items
  interface LineItem {
    partId: number;
    partName: string;
    partNumber: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }
  const [items, setItems] = useState<LineItem[]>([]);

  // Item selector state
  const [selectedPartId, setSelectedPartId] = useState<string>("");
  const [qtyInput, setQtyInput] = useState<number>(1);
  const [unitPriceInput, setUnitPriceInput] = useState<number>(0);

  // Immediate payment
  const [paidNow, setPaidNow] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [paymentReference, setPaymentReference] = useState<string>("");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize/reset form ONLY when modal is opened, preserving state across new part creation
  useEffect(() => {
    if (isOpen) {
      setPurchaseDate(new Date().toISOString().split("T")[0]);
      setDueDate("");
      setNotes("");
      setItems([]);
      setAvailableParts(parts);
      setSelectedPartId(parts.length > 0 ? String(parts[0].id) : "");
      if (parts.length > 0) {
        setUnitPriceInput(parts[0].purchasePrice || 0);
      }
      setQtyInput(1);
      setPaidNow(0);
      setPaymentMethod("Cash");
      setPaymentReference("");
      setError(null);
    }
  }, [isOpen]);

  // When part dropdown changes, prefill its default purchase price
  function handlePartChange(partIdStr: string) {
    setSelectedPartId(partIdStr);
    const p = availableParts.find((x) => String(x.id) === partIdStr);
    if (p) {
      setUnitPriceInput(p.purchasePrice || 0);
    }
  }

  function handleAddItem() {
    if (!selectedPartId) {
      setError("Please select a part from inventory");
      return;
    }
    const p = availableParts.find((x) => String(x.id) === selectedPartId);
    if (!p) {
      setError("Selected part not found");
      return;
    }
    if (qtyInput <= 0) {
      setError("Quantity must be at least 1");
      return;
    }
    if (unitPriceInput < 0) {
      setError("Unit price cannot be negative");
      return;
    }

    const lineTotal = qtyInput * unitPriceInput;
    const pId = typeof p.id === "string" ? parseInt(p.id, 10) : p.id;

    // If part already in list, merge
    const existingIdx = items.findIndex((it) => it.partId === pId);
    if (existingIdx >= 0) {
      const updated = [...items];
      updated[existingIdx].quantity += qtyInput;
      updated[existingIdx].unitPrice = unitPriceInput;
      updated[existingIdx].total = updated[existingIdx].quantity * unitPriceInput;
      setItems(updated);
    } else {
      setItems([
        ...items,
        {
          partId: pId,
          partName: p.name,
          partNumber: p.number,
          quantity: qtyInput,
          unitPrice: unitPriceInput,
          total: lineTotal,
        },
      ]);
    }

    // Reset line input
    setQtyInput(1);
    setError(null);
  }

  // Handle when a brand-new part is created inside CreatePartInPurchaseModal
  function handlePartCreated(newPart: InventoryPart, qty: number, price: number) {
    // 1. Add to local available parts
    setAvailableParts((prev) => {
      if (prev.some((p) => String(p.id) === String(newPart.id))) return prev;
      return [newPart, ...prev];
    });

    // 2. Select this new part
    setSelectedPartId(String(newPart.id));

    // 3. Immediately add line item to purchase
    const pId = typeof newPart.id === "string" ? parseInt(newPart.id, 10) : newPart.id;
    const lineTotal = qty * price;

    setItems((prev) => [
      ...prev,
      {
        partId: pId,
        partName: newPart.name,
        partNumber: newPart.number,
        quantity: qty,
        unitPrice: price,
        total: lineTotal,
      },
    ]);

    // 4. Update entry inputs
    setQtyInput(1);
    setUnitPriceInput(price);
    setError(null);

    // 5. Notify parent if registered
    if (onPartCreatedInInventory) {
      onPartCreatedInInventory(newPart);
    }
  }

  // Handle duplicate resolution: user chooses to use existing part
  function handleUseExistingPart(existingPart: InventoryPart, qty: number, price: number) {
    setSelectedPartId(String(existingPart.id));
    const pId = typeof existingPart.id === "string" ? parseInt(existingPart.id, 10) : existingPart.id;
    const lineTotal = qty * price;

    setItems((prev) => {
      const existingIdx = prev.findIndex((it) => it.partId === pId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        updated[existingIdx].unitPrice = price;
        updated[existingIdx].total = updated[existingIdx].quantity * price;
        return updated;
      } else {
        return [
          ...prev,
          {
            partId: pId,
            partName: existingPart.name,
            partNumber: existingPart.number,
            quantity: qty,
            unitPrice: price,
            total: lineTotal,
          },
        ];
      }
    });

    setQtyInput(1);
    setUnitPriceInput(price);
    setError(null);
    setIsNewPartModalOpen(false);
  }

  function handleRemoveItem(index: number) {
    setItems(items.filter((_, idx) => idx !== index));
  }

  const purchaseTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  const remainingPayable = useMemo(() => {
    return Math.max(0, purchaseTotal - (paidNow || 0));
  }, [purchaseTotal, paidNow]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) {
      setError("Please add at least one part item to this purchase");
      return;
    }
    if (paidNow < 0) {
      setError("Paid Now amount cannot be negative");
      return;
    }
    if (paidNow > purchaseTotal) {
      setError(`Paid Now amount (${paidNow} EGP) cannot exceed Purchase Total (${purchaseTotal} EGP)`);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        purchaseDate: purchaseDate ? new Date(purchaseDate).toISOString() : new Date().toISOString(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        notes: notes.trim() || undefined,
        items: items.map((it) => ({
          partId: it.partId,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
        })),
        paidNow: Number(paidNow) || 0,
        paymentMethod: paidNow > 0 ? paymentMethod : undefined,
        paymentReference: paidNow > 0 ? paymentReference.trim() || undefined : undefined,
      };

      const result = await api.createSupplierPurchase(supplier.id, payload);
      onPurchaseCreated(result);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to create supplier purchase");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#e5e7eb] w-full max-w-[680px] overflow-hidden my-6">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#060f1e] text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[18px]">📦</span>
              <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]">
                Create Supplier Purchase
              </h3>
            </div>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-white/60 mt-0.5">
              Supplier: <strong className="text-white">{supplier.name}</strong> • Stock will be added to Inventory
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

          {/* Dates & Reference */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Purchase Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Payment Due Date (Optional)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>
          </div>

          {/* Add Part Section */}
          <div className="p-3.5 bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px] space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[12px] text-[#111827]">
                Add Parts / Inventory Materials
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-normal text-[#6b7280]">
                  {availableParts.length} parts registered
                </span>
                <button
                  type="button"
                  onClick={() => setIsNewPartModalOpen(true)}
                  className="px-2.5 py-1 bg-[#060f1e] hover:bg-[#1a2942] text-white rounded-[6px] text-[11px] font-['Inter:Semi_Bold',sans-serif] transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>+</span> New Part
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-6">
                <div className="flex items-center justify-between mb-1">
                  <label className="font-['Inter:Medium',sans-serif] text-[11px] text-[#4b5563]">
                    Select Part
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsNewPartModalOpen(true)}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-['Inter:Medium',sans-serif] underline flex items-center gap-0.5"
                  >
                    + Add New Part
                  </button>
                </div>
                <select
                  value={selectedPartId}
                  onChange={(e) => handlePartChange(e.target.value)}
                  className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
                >
                  <option value="">-- Choose Part --</option>
                  {availableParts.map((p) => (
                    <option key={p.id} value={String(p.id)}>
                      {p.name} ({p.number}) — In Stock: {p.currentQty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block font-['Inter:Medium',sans-serif] text-[11px] text-[#4b5563] mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={qtyInput}
                  onChange={(e) => setQtyInput(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-['Inter:Medium',sans-serif] text-[11px] text-[#4b5563] mb-1">
                  Unit Price (EGP)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={unitPriceInput}
                  onChange={(e) => setUnitPriceInput(parseFloat(e.target.value) || 0)}
                  className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
                />
              </div>

              <div className="col-span-2">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="w-full h-9 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-[6px] text-[12px] font-['Inter:Semi_Bold',sans-serif] transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-[#e5e7eb] rounded-[8px] overflow-hidden">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#f3f4f6] text-[#6b7280] font-['Inter:Semi_Bold',sans-serif] uppercase tracking-wider text-[10px] border-b border-[#e5e7eb]">
                <tr>
                  <th className="px-3 py-2">Part</th>
                  <th className="px-3 py-2">Part Number</th>
                  <th className="px-3 py-2 text-right">Qty</th>
                  <th className="px-3 py-2 text-right">Unit Price</th>
                  <th className="px-3 py-2 text-right">Total</th>
                  <th className="px-2 py-2 text-center w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-[#9ca3af] font-['Inter:Regular',sans-serif]">
                      No items added yet. Please select parts from above or click "+ New Part".
                    </td>
                  </tr>
                ) : (
                  items.map((it, idx) => (
                    <tr key={idx} className="hover:bg-[#f9fafb]">
                      <td className="px-3 py-2 font-['Inter:Medium',sans-serif] text-[#111827]">{it.partName}</td>
                      <td className="px-3 py-2 font-['JetBrains_Mono',monospace] text-[#4b5563]">{it.partNumber}</td>
                      <td className="px-3 py-2 text-right font-['Inter:Semi_Bold',sans-serif]">{it.quantity}</td>
                      <td className="px-3 py-2 text-right text-[#4b5563]">{formatCurrency(it.unitPrice)}</td>
                      <td className="px-3 py-2 text-right font-['Inter:Bold',sans-serif] text-[#111827]">
                        {formatCurrency(it.total)}
                      </td>
                      <td className="px-2 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-red-500 hover:text-red-700 text-[13px] font-bold"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {items.length > 0 && (
                <tfoot className="bg-[#f9fafb] border-t border-[#e5e7eb]">
                  <tr>
                    <td colSpan={4} className="px-3 py-2.5 text-right font-['Inter:Semi_Bold',sans-serif] text-[#374151]">
                      Purchase Total:
                    </td>
                    <td className="px-3 py-2.5 text-right font-['Inter:Bold',sans-serif] text-[14px] text-[#060f1e]">
                      {formatCurrency(purchaseTotal)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Payment Section */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-[8px] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[12px] text-emerald-950 flex items-center gap-1.5">
                <span>💳</span> Immediate Payment (Paid Now)
              </span>
              <span className="text-[11px] text-emerald-800">
                Purchase != Payment: You can pay now or settle later
              </span>
            </div>

            <div className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-4">
                <label className="block font-['Inter:Medium',sans-serif] text-[11px] text-emerald-900 mb-1">
                  Amount Paid Now (EGP)
                </label>
                <input
                  type="number"
                  min="0"
                  max={purchaseTotal}
                  step="any"
                  value={paidNow}
                  onChange={(e) => setPaidNow(Math.min(purchaseTotal, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-full h-9 px-3 border border-emerald-300 bg-white rounded-[6px] text-[13px] font-['Inter:Semi_Bold',sans-serif] focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="col-span-4">
                <label className="block font-['Inter:Medium',sans-serif] text-[11px] text-emerald-900 mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={paidNow <= 0}
                  className="w-full h-9 px-2.5 border border-emerald-300 bg-white rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-emerald-600 disabled:opacity-50"
                >
                  <option value="Cash">Cash 💵</option>
                  <option value="Bank Transfer">Bank Transfer 🏦</option>
                  <option value="InstaPay">InstaPay 📱</option>
                  <option value="Wallet">Wallet 👜</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-4">
                <label className="block font-['Inter:Medium',sans-serif] text-[11px] text-emerald-900 mb-1">
                  Receipt / Reference #
                </label>
                <input
                  type="text"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  disabled={paidNow <= 0}
                  placeholder="e.g. REC-9921"
                  className="w-full h-9 px-2.5 border border-emerald-300 bg-white rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-emerald-600 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Breakdown banner */}
            <div className="flex items-center justify-between pt-2 border-t border-emerald-200/80 text-[12px]">
              <div>
                <span className="text-[#4b5563]">Purchase Total: </span>
                <strong className="text-[#111827]">{formatCurrency(purchaseTotal)}</strong>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-emerald-700">Paid Now: </span>
                <strong className="text-emerald-800">{formatCurrency(paidNow)}</strong>
              </div>
              <div>
                <span className="text-red-700 font-['Inter:Medium',sans-serif]">Remaining Payable to Supplier: </span>
                <strong className="text-red-800 font-['Inter:Bold',sans-serif] text-[13px]">
                  {formatCurrency(remainingPayable)}
                </strong>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
              Purchase Notes / Invoice Reference
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Supplier Invoice #SI-4029, parts received in good condition"
              className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
            />
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-[6px] text-[11px] text-blue-800 flex items-start gap-2">
            <span className="text-[14px]">ℹ️</span>
            <span>
              <strong>Inventory Integration:</strong> Confirming this purchase will immediately increase the inventory stock of all listed parts and create a Stock IN movement. It will also record a supplier payable of {formatCurrency(purchaseTotal)}.
            </span>
          </div>

          {/* Action buttons */}
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
              disabled={submitting || items.length === 0}
              className="px-5 py-2 text-[13px] font-['Inter:Semi_Bold',sans-serif] bg-[#060f1e] hover:bg-[#060f1e]/90 text-white rounded-[6px] transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              {submitting && <span className="animate-spin text-[12px]">⏳</span>}
              Receive Stock & Create Purchase
            </button>
          </div>
        </form>

        {/* Sub-modal: Create Brand New Part inside this Purchase */}
        {isNewPartModalOpen && (
          <CreatePartInPurchaseModal
            isOpen={isNewPartModalOpen}
            onClose={() => setIsNewPartModalOpen(false)}
            existingParts={availableParts}
            onPartCreated={handlePartCreated}
            onUseExistingPart={handleUseExistingPart}
          />
        )}
      </div>
    </div>
  );
}

export function PaySupplierModal({
  isOpen,
  onClose,
  supplier,
  onPaymentRecorded,
}: {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier;
  onPaymentRecorded: (payment: SupplierPayment) => void;
}) {
  const [amount, setAmount] = useState<number | string>("");
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [reference, setReference] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setPaymentDate(new Date().toISOString().split("T")[0]);
      setPaymentMethod("Cash");
      setReference("");
      setNotes("");
      setError(null);
    }
  }, [isOpen]);

  const numAmount = parseFloat(String(amount)) || 0;
  const currentOutstanding = supplier.outstandingBalance || 0;
  const newBalance = Math.max(0, currentOutstanding - numAmount);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (numAmount <= 0) {
      setError("Payment amount must be greater than 0");
      return;
    }
    if (numAmount > currentOutstanding) {
      setError(`Payment amount (${formatCurrency(numAmount)}) cannot exceed Current Outstanding Balance (${formatCurrency(currentOutstanding)})`);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        amount: numAmount,
        paymentDate: paymentDate ? new Date(paymentDate).toISOString() : new Date().toISOString(),
        paymentMethod,
        reference: reference.trim() || undefined,
        notes: notes.trim() || undefined,
      };

      const result = await api.recordSupplierPayment(supplier.id, payload);
      onPaymentRecorded(result);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to record supplier payment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#e5e7eb] w-full max-w-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#060f1e] text-white">
          <div className="flex items-center gap-2">
            <span className="text-[18px]">💵</span>
            <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]">
              Pay Supplier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-[18px] leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded-[6px] font-['Inter:Medium',sans-serif]">
              {error}
            </div>
          )}

          {/* Supplier banner */}
          <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] flex items-center justify-between">
            <div>
              <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#64748b]">Supplier</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[14px] text-[#0f172a]">{supplier.name}</p>
            </div>
            <div className="text-right">
              <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#64748b]">Outstanding Debt</p>
              <p className="font-['Inter:Bold',sans-serif] text-[15px] text-red-600">
                {formatCurrency(currentOutstanding)}
              </p>
            </div>
          </div>

          {/* Amount */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-['Inter:Medium',sans-serif] text-[12px] text-[#374151]">
                Payment Amount (EGP) <span className="text-red-500">*</span>
              </label>
              {currentOutstanding > 0 && (
                <div className="flex items-center gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAmount(Number((currentOutstanding * 0.25).toFixed(2)))}
                    className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                  >
                    25%
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount(Number((currentOutstanding * 0.5).toFixed(2)))}
                    className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                  >
                    50%
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount(currentOutstanding)}
                    className="px-1.5 py-0.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold rounded transition-colors"
                  >
                    Full Balance
                  </button>
                </div>
              )}
            </div>
            <input
              type="number"
              required
              min="0.01"
              max={currentOutstanding}
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 10000"
              className="w-full h-10 px-3 border border-[#d1d5db] rounded-[6px] text-[14px] font-['Inter:Bold',sans-serif] focus:outline-none focus:border-[#060f1e] focus:ring-1 focus:ring-[#060f1e]"
            />
          </div>

          {/* Payment Method & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full h-9 px-2.5 border border-[#d1d5db] bg-white rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              >
                <option value="Cash">Cash 💵</option>
                <option value="Bank Transfer">Bank Transfer 🏦</option>
                <option value="InstaPay">InstaPay 📱</option>
                <option value="Wallet">Wallet 👜</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
                Payment Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>
          </div>

          <div>
            <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
              Reference / Transfer ID
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. TRX-884920, InstaPay Ref"
              className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
            />
          </div>

          <div>
            <label className="block font-['Inter:Medium',sans-serif] text-[12px] text-[#374151] mb-1">
              Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Partial settlement for August purchases"
              className="w-full h-9 px-3 border border-[#d1d5db] rounded-[6px] text-[12px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
            />
          </div>

          {/* Live Balance Preview */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-[6px] space-y-1 text-[12px]">
            <div className="flex justify-between text-[#4b5563]">
              <span>Previous Outstanding Debt:</span>
              <span className="font-['Inter:Medium',sans-serif]">{formatCurrency(currentOutstanding)}</span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>This Payment:</span>
              <span className="font-['Inter:Semi_Bold',sans-serif]">- {formatCurrency(numAmount)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-gray-200 text-[#111827] font-['Inter:Bold',sans-serif]">
              <span>New Outstanding Debt:</span>
              <span className={newBalance > 0 ? "text-red-600" : "text-emerald-600"}>
                {formatCurrency(newBalance)}
              </span>
            </div>
          </div>

          {/* Action buttons */}
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
              disabled={submitting || numAmount <= 0 || numAmount > currentOutstanding}
              className="px-5 py-2 text-[13px] font-['Inter:Semi_Bold',sans-serif] bg-emerald-600 hover:bg-emerald-700 text-white rounded-[6px] transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              {submitting && <span className="animate-spin text-[12px]">⏳</span>}
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function PurchaseDetailsModal({
  isOpen,
  onClose,
  purchase,
}: {
  isOpen: boolean;
  onClose: () => void;
  purchase?: SupplierPurchase | null;
}) {
  if (!isOpen || !purchase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-[12px] shadow-2xl border border-[#e5e7eb] w-full max-w-[580px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between bg-[#060f1e] text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[18px]">🧾</span>
              <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px]">
                Purchase Details: {purchase.purchaseNumber}
              </h3>
            </div>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-white/60 mt-0.5">
              Supplier: <strong className="text-white">{purchase.supplierName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-[18px] leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-[8px] text-[12px]">
            <div>
              <p className="text-[#6b7280]">Date</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#111827]">{formatDateDisplay(purchase.purchaseDate)}</p>
            </div>
            <div>
              <p className="text-[#6b7280]">Due Date</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#111827]">{purchase.dueDate ? formatDateDisplay(purchase.dueDate) : "None"}</p>
            </div>
            <div>
              <p className="text-[#6b7280]">Payment Status</p>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-['Inter:Semi_Bold',sans-serif] mt-0.5 ${
                  purchase.paymentStatus === "Paid"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : purchase.paymentStatus === "Partially Paid"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {purchase.paymentStatus}
              </span>
            </div>
          </div>

          {purchase.notes && (
            <div className="p-2.5 bg-blue-50/50 border border-blue-100 rounded-[6px] text-[12px] text-blue-900">
              <span className="font-semibold">Notes: </span>{purchase.notes}
            </div>
          )}

          <div>
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[12px] text-[#374151] mb-2">Purchased Items</p>
            <div className="border border-[#e5e7eb] rounded-[8px] overflow-hidden">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#f9fafb] text-[#6b7280] font-['Inter:Semi_Bold',sans-serif] uppercase text-[10px] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-3 py-2">Part</th>
                    <th className="px-3 py-2">Part #</th>
                    <th className="px-3 py-2 text-right">Qty</th>
                    <th className="px-3 py-2 text-right">Unit Price</th>
                    <th className="px-3 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6]">
                  {purchase.items?.map((it) => (
                    <tr key={it.id}>
                      <td className="px-3 py-2 font-medium text-[#111827]">{it.partName}</td>
                      <td className="px-3 py-2 font-mono text-[#4b5563]">{it.partNumber}</td>
                      <td className="px-3 py-2 text-right font-semibold">{it.quantity}</td>
                      <td className="px-3 py-2 text-right text-[#4b5563]">{formatCurrency(it.unitPrice)}</td>
                      <td className="px-3 py-2 text-right font-bold text-[#111827]">{formatCurrency(it.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial summary */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-[6px] space-y-1.5 text-[12px]">
            <div className="flex justify-between text-[#4b5563]">
              <span>Total Purchase Amount:</span>
              <strong className="text-[#111827]">{formatCurrency(purchase.totalAmount)}</strong>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>Paid so far:</span>
              <strong>{formatCurrency(purchase.paidAmount)}</strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-gray-200 font-bold text-[13px]">
              <span className="text-red-700">Remaining Balance:</span>
              <span className="text-red-800">{formatCurrency(purchase.remainingAmount)}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#060f1e] text-white rounded-[6px] text-[13px] font-['Inter:Medium',sans-serif] hover:bg-[#060f1e]/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Supplier Dashboard ───────────────────────────────────────────────

export function SupplierDashboardScreen({
  onViewSupplier,
  parts = [],
  onReloadInventory,
}: {
  onViewSupplier: (supplier: Supplier) => void;
  parts: InventoryPart[];
  onReloadInventory?: () => void;
}) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [summary, setSummary] = useState<SupplierSummary>({
    totalSuppliers: 0,
    totalPurchases: 0,
    totalPaid: 0,
    totalOutstandingDebt: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Outstanding" | "Paid" | "Inactive">("All");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [purchasingSupplier, setPurchasingSupplier] = useState<Supplier | null>(null);
  const [payingSupplier, setPayingSupplier] = useState<Supplier | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const [suppList, summ] = await Promise.all([
        api.getSuppliers(),
        api.getSupplierSummary(),
      ]);
      setSuppliers(suppList || []);
      setSummary(summ || { totalSuppliers: 0, totalPurchases: 0, totalPaid: 0, totalOutstandingDebt: 0 });
    } catch (err) {
      console.error("Failed to load suppliers:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.phone && s.phone.toLowerCase().includes(q)) ||
        (s.company && s.company.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (statusFilter === "Outstanding") return s.outstandingBalance > 0;
      if (statusFilter === "Paid") return s.outstandingBalance === 0;
      if (statusFilter === "Inactive") return !s.isActive;

      return true;
    });
  }, [suppliers, search, statusFilter]);

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Medium',sans-serif] text-[12px] text-[#6b7280]">Total Suppliers</span>
              <span className="text-[18px]">🏢</span>
            </div>
            <p className="font-['Inter:Bold',sans-serif] text-[22px] text-[#111827] mt-2">
              {summary.totalSuppliers}
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#9ca3af] mt-1">
              Active parts & materials vendors
            </p>
          </div>

          <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Medium',sans-serif] text-[12px] text-[#6b7280]">Total Purchases</span>
              <span className="text-[18px]">📦</span>
            </div>
            <p className="font-['Inter:Bold',sans-serif] text-[22px] text-[#111827] mt-2">
              {formatCurrency(summary.totalPurchases)}
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#9ca3af] mt-1">
              Stock In & materials received
            </p>
          </div>

          <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Medium',sans-serif] text-[12px] text-emerald-700">Total Paid</span>
              <span className="text-[18px]">✅</span>
            </div>
            <p className="font-['Inter:Bold',sans-serif] text-[22px] text-emerald-700 mt-2">
              {formatCurrency(summary.totalPaid)}
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-emerald-600 mt-1">
              Settled payments to suppliers
            </p>
          </div>

          {/* Outstanding Supplier Debt — MOST IMPORTANT CARD */}
          <div className="bg-rose-50/70 rounded-[10px] border-2 border-rose-300 p-4 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[12px] text-rose-900 tracking-wide uppercase">
                Total Outstanding Debt
              </span>
              <span className="text-[18px]">⚠️</span>
            </div>
            <p className="font-['Inter:Bold',sans-serif] text-[22px] text-rose-700 mt-2">
              {formatCurrency(summary.totalOutstandingDebt)}
            </p>
            <p className="font-['Inter:Medium',sans-serif] text-[11px] text-rose-600 mt-1">
              Money currently owed to suppliers
            </p>
          </div>
        </div>

        {/* Toolbar: Search, Filter, Add Supplier */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-[10px] border border-[#e5e7eb] shadow-xs">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-[360px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#9ca3af]">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search supplier by name, phone, or company..."
                className="w-full h-9 pl-9 pr-3 border border-[#d1d5db] rounded-[6px] text-[13px] font-['Inter:Regular',sans-serif] focus:outline-none focus:border-[#060f1e]"
              />
            </div>

            <div className="flex items-center border border-[#d1d5db] rounded-[6px] overflow-hidden text-[12px] font-['Inter:Medium',sans-serif]">
              {(["All", "Outstanding", "Paid", "Inactive"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-2 transition-colors ${
                    statusFilter === filter
                      ? "bg-[#060f1e] text-white"
                      : "bg-white text-[#4b5563] hover:bg-gray-100"
                  }`}
                >
                  {filter === "Outstanding" ? "With Debt" : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              title="Refresh suppliers list"
              className="h-9 px-3 border border-[#d1d5db] hover:bg-[#f9fafb] text-[#4b5563] rounded-[6px] text-[13px] font-['Inter:Medium',sans-serif] transition-colors flex items-center gap-1.5"
            >
              🔄 Refresh
            </button>
            <button
              onClick={() => {
                setEditingSupplier(null);
                setIsAddModalOpen(true);
              }}
              className="h-9 px-4 bg-[#060f1e] hover:bg-[#060f1e]/90 text-white rounded-[6px] text-[13px] font-['Inter:Semi_Bold',sans-serif] transition-colors shadow-xs flex items-center gap-2"
            >
              <span>+</span> Add Supplier
            </button>
          </div>
        </div>

        {/* Suppliers Table */}
        <div className="bg-white rounded-[10px] border border-[#e5e7eb] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f9fafb] text-[#6b7280] font-['Inter:Semi_Bold',sans-serif] uppercase tracking-wider text-[11px] border-b border-[#e5e7eb]">
                <tr>
                  <th className="px-5 py-3.5">Supplier</th>
                  <th className="px-5 py-3.5">Phone</th>
                  <th className="px-5 py-3.5 text-right">Total Purchases</th>
                  <th className="px-5 py-3.5 text-right">Total Paid</th>
                  <th className="px-5 py-3.5 text-right">Outstanding Debt</th>
                  <th className="px-5 py-3.5">Last Payment</th>
                  <th className="px-5 py-3.5 text-center">Status</th>
                  <th className="px-5 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-[#9ca3af]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-[20px] animate-spin">⏳</span>
                        <span>Loading suppliers and balances...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-[#9ca3af]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-[24px]">🚚</span>
                        <p className="text-[14px] font-['Inter:Medium',sans-serif] text-[#374151]">No suppliers found</p>
                        <p className="text-[12px] text-[#9ca3af]">
                          {search ? "No suppliers match your search." : "Click '+ Add Supplier' to register your first supplier."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSuppliers.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-[#f9fafb] transition-colors cursor-pointer"
                      onClick={() => onViewSupplier(s)}
                    >
                      <td className="px-5 py-4">
                        <div className="font-['Inter:Semi_Bold',sans-serif] text-[#111827]">{s.name}</div>
                        {s.company && (
                          <div className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6b7280]">
                            {s.company}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 font-['JetBrains_Mono',monospace] text-[#4b5563]">
                        {s.phone}
                      </td>
                      <td className="px-5 py-4 text-right font-['Inter:Medium',sans-serif] text-[#111827]">
                        {formatCurrency(s.totalPurchases)}
                      </td>
                      <td className="px-5 py-4 text-right font-['Inter:Medium',sans-serif] text-emerald-700">
                        {formatCurrency(s.totalPaid)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {s.outstandingBalance > 0 ? (
                          <span className="inline-block px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full font-['Inter:Bold',sans-serif] text-[12px]">
                            {formatCurrency(s.outstandingBalance)}
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full font-['Inter:Medium',sans-serif] text-[12px]">
                            0.00 EGP (Settled)
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-[#6b7280] text-[12px]">
                        {formatDateDisplay(s.lastPaymentDate)}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-['Inter:Semi_Bold',sans-serif] ${
                            s.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          {s.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onViewSupplier(s)}
                            className="px-2.5 py-1 text-[11px] font-['Inter:Semi_Bold',sans-serif] bg-gray-100 hover:bg-gray-200 text-[#1f2937] rounded-[4px] transition-colors"
                          >
                            Profile
                          </button>
                          <button
                            onClick={() => setPurchasingSupplier(s)}
                            className="px-2.5 py-1 text-[11px] font-['Inter:Semi_Bold',sans-serif] bg-[#060f1e] hover:bg-[#060f1e]/90 text-white rounded-[4px] transition-colors"
                          >
                            + Purchase
                          </button>
                          <button
                            onClick={() => setPayingSupplier(s)}
                            disabled={s.outstandingBalance <= 0}
                            className="px-2.5 py-1 text-[11px] font-['Inter:Semi_Bold',sans-serif] bg-emerald-600 hover:bg-emerald-700 text-white rounded-[4px] transition-colors disabled:opacity-40 disabled:hover:bg-emerald-600"
                          >
                            Pay
                          </button>
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
      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        supplierToEdit={editingSupplier}
        onSaved={() => {
          loadData();
        }}
      />

      {purchasingSupplier && (
        <AddPurchaseModal
          isOpen={!!purchasingSupplier}
          onClose={() => setPurchasingSupplier(null)}
          supplier={purchasingSupplier}
          parts={parts}
          onPurchaseCreated={() => {
            loadData();
            if (onReloadInventory) onReloadInventory();
          }}
          onPartCreatedInInventory={() => {
            if (onReloadInventory) onReloadInventory();
          }}
        />
      )}

      {payingSupplier && (
        <PaySupplierModal
          isOpen={!!payingSupplier}
          onClose={() => setPayingSupplier(null)}
          supplier={payingSupplier}
          onPaymentRecorded={() => {
            loadData();
          }}
        />
      )}
    </div>
  );
}

// ─── Screen: Canonical Supplier Profile Screen ────────────────────────────────

export function SupplierProfileScreen({
  supplierId,
  onBack,
  parts = [],
  onReloadInventory,
}: {
  supplierId: number;
  onBack: () => void;
  parts: InventoryPart[];
  onReloadInventory?: () => void;
}) {
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [purchases, setPurchases] = useState<SupplierPurchase[]>([]);
  const [payments, setPayments] = useState<SupplierPayment[]>([]);
  const [statement, setStatement] = useState<SupplierStatement | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"purchases" | "payments" | "statement">("purchases");

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [viewingPurchase, setViewingPurchase] = useState<SupplierPurchase | null>(null);

  async function loadSupplierData() {
    setLoading(true);
    try {
      const [suppData, purList, payList, stmt] = await Promise.all([
        api.getSupplierById(supplierId),
        api.getSupplierPurchases(supplierId),
        api.getSupplierPayments(supplierId),
        api.getSupplierStatement(supplierId),
      ]);
      setSupplier(suppData);
      setPurchases(purList || []);
      setPayments(payList || []);
      setStatement(stmt || null);
    } catch (err) {
      console.error("Failed to load supplier details:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSupplierData();
  }, [supplierId]);

  if (loading && !supplier) {
    return (
      <div className="absolute left-[168px] right-0 top-[56px] bottom-0 flex items-center justify-center bg-[#f3f4f6]">
        <div className="flex flex-col items-center gap-2 text-[#6b7280]">
          <span className="text-[24px] animate-spin">⏳</span>
          <span className="text-[13px] font-['Inter:Medium',sans-serif]">Loading supplier profile...</span>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="absolute left-[168px] right-0 top-[56px] bottom-0 p-8 bg-[#f3f4f6]">
        <button
          onClick={onBack}
          className="text-[13px] text-[#4b5563] hover:text-[#111827] flex items-center gap-1.5 mb-4"
        >
          ← Back to Suppliers
        </button>
        <div className="p-6 bg-white rounded-[10px] border border-[#e5e7eb] text-center">
          <p className="text-[14px] text-red-600 font-semibold">Supplier not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">

        {/* Back Link */}
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-[13px] font-['Inter:Medium',sans-serif] text-[#4b5563] hover:text-[#111827] transition-colors"
          >
            ← Back to Suppliers List
          </button>
        </div>

        {/* Header Profile Card */}
        <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-[8px] bg-[#060f1e] text-white flex items-center justify-center text-[20px] font-bold">
                  🚚
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="font-['Inter:Bold',sans-serif] text-[20px] text-[#111827]">
                      {supplier.name}
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-['Inter:Semi_Bold',sans-serif] ${
                        supplier.isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}
                    >
                      {supplier.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[#9ca3af]">
                      ID: #{supplier.id}
                    </span>
                  </div>
                  {supplier.company && (
                    <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6b7280]">
                      {supplier.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Pills */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-[12px] text-[#4b5563]">
                <span className="flex items-center gap-1.5">
                  <span>📞</span> <strong className="font-['JetBrains_Mono']">{supplier.phone}</strong>
                </span>
                {supplier.address && (
                  <span className="flex items-center gap-1.5">
                    <span>📍</span> <span>{supplier.address}</span>
                  </span>
                )}
                {supplier.notes && (
                  <span className="flex items-center gap-1.5">
                    <span>📝</span> <span className="italic text-[#6b7280]">{supplier.notes}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Profile Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="h-9 px-3.5 border border-[#d1d5db] hover:bg-gray-50 text-[#374151] rounded-[6px] text-[12px] font-['Inter:Semi_Bold',sans-serif] transition-colors"
              >
                ✏️ Edit Supplier
              </button>
              <button
                onClick={() => setIsPurchaseModalOpen(true)}
                className="h-9 px-4 bg-[#060f1e] hover:bg-[#060f1e]/90 text-white rounded-[6px] text-[12px] font-['Inter:Semi_Bold',sans-serif] transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>📦</span> + Add Purchase
              </button>
              <button
                onClick={() => setIsPayModalOpen(true)}
                disabled={supplier.outstandingBalance <= 0}
                className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[6px] text-[12px] font-['Inter:Semi_Bold',sans-serif] transition-colors shadow-xs flex items-center gap-1.5 disabled:opacity-40"
              >
                <span>💵</span> Pay Supplier
              </button>
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#e5e7eb]">
            <div className="bg-[#f9fafb] p-3.5 rounded-[8px] border border-[#e5e7eb]">
              <span className="text-[11px] font-['Inter:Medium',sans-serif] text-[#6b7280] uppercase">Total Purchases</span>
              <p className="font-['Inter:Bold',sans-serif] text-[18px] text-[#111827] mt-1">
                {formatCurrency(supplier.totalPurchases)}
              </p>
              <p className="text-[10px] text-[#9ca3af] mt-0.5">Sum of all parts/materials bought</p>
            </div>

            <div className="bg-emerald-50/50 p-3.5 rounded-[8px] border border-emerald-200">
              <span className="text-[11px] font-['Inter:Medium',sans-serif] text-emerald-800 uppercase">Total Paid</span>
              <p className="font-['Inter:Bold',sans-serif] text-[18px] text-emerald-700 mt-1">
                {formatCurrency(supplier.totalPaid)}
              </p>
              <p className="text-[10px] text-emerald-600 mt-0.5">Total payments made to this supplier</p>
            </div>

            <div className="bg-rose-50/70 p-3.5 rounded-[8px] border border-rose-300">
              <span className="text-[11px] font-['Inter:Semi_Bold',sans-serif] text-rose-900 uppercase">
                Outstanding Balance
              </span>
              <p className="font-['Inter:Bold',sans-serif] text-[18px] text-rose-700 mt-1">
                {formatCurrency(supplier.outstandingBalance)}
              </p>
              <p className="text-[10px] text-rose-600 mt-0.5">Current workshop debt to this supplier</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#d1d5db] text-[13px] font-['Inter:Medium',sans-serif]">
          <button
            onClick={() => setActiveTab("purchases")}
            className={`px-5 py-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "purchases"
                ? "border-[#060f1e] text-[#060f1e] font-semibold"
                : "border-transparent text-[#6b7280] hover:text-[#111827]"
            }`}
          >
            <span>📦 Purchases History</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[11px] text-[#4b5563]">
              {purchases.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`px-5 py-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "payments"
                ? "border-[#060f1e] text-[#060f1e] font-semibold"
                : "border-transparent text-[#6b7280] hover:text-[#111827]"
            }`}
          >
            <span>💵 Payments History</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[11px] text-[#4b5563]">
              {payments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("statement")}
            className={`px-5 py-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "statement"
                ? "border-[#060f1e] text-[#060f1e] font-semibold"
                : "border-transparent text-[#6b7280] hover:text-[#111827]"
            }`}
          >
            <span>📜 Account Statement (كشف حساب)</span>
          </button>
        </div>

        {/* Tab 1: Purchases History */}
        {activeTab === "purchases" && (
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#e5e7eb] flex items-center justify-between bg-[#f9fafb]">
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[13px] text-[#111827]">
                All Purchases from {supplier.name}
              </span>
              <button
                onClick={() => setIsPurchaseModalOpen(true)}
                className="text-[12px] text-[#060f1e] font-['Inter:Semi_Bold',sans-serif] hover:underline"
              >
                + New Purchase
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#f9fafb] text-[#6b7280] font-['Inter:Semi_Bold',sans-serif] uppercase tracking-wider text-[11px] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Purchase #</th>
                    <th className="px-5 py-3 text-center">Items</th>
                    <th className="px-5 py-3 text-right">Total Amount</th>
                    <th className="px-5 py-3 text-right">Paid</th>
                    <th className="px-5 py-3 text-right">Remaining</th>
                    <th className="px-5 py-3 text-center">Payment Status</th>
                    <th className="px-5 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6]">
                  {purchases.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-10 text-center text-[#9ca3af]">
                        No purchases recorded for this supplier yet.
                      </td>
                    </tr>
                  ) : (
                    purchases.map((p) => (
                      <tr key={p.id} className="hover:bg-[#f9fafb]">
                        <td className="px-5 py-3.5 text-[#374151]">{formatDateDisplay(p.purchaseDate)}</td>
                        <td className="px-5 py-3.5 font-['JetBrains_Mono',monospace] font-bold text-[#111827]">
                          {p.purchaseNumber}
                        </td>
                        <td className="px-5 py-3.5 text-center text-[#6b7280]">
                          {p.items?.length || 0} {p.items?.length === 1 ? "part" : "parts"}
                        </td>
                        <td className="px-5 py-3.5 text-right font-['Inter:Semi_Bold',sans-serif] text-[#111827]">
                          {formatCurrency(p.totalAmount)}
                        </td>
                        <td className="px-5 py-3.5 text-right font-['Inter:Medium',sans-serif] text-emerald-700">
                          {formatCurrency(p.paidAmount)}
                        </td>
                        <td className="px-5 py-3.5 text-right font-['Inter:Bold',sans-serif]">
                          {p.remainingAmount > 0 ? (
                            <span className="text-red-600">{formatCurrency(p.remainingAmount)}</span>
                          ) : (
                            <span className="text-gray-400">0.00 EGP</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-['Inter:Semi_Bold',sans-serif] ${
                              p.paymentStatus === "Paid"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : p.paymentStatus === "Partially Paid"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {p.paymentStatus}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <button
                            onClick={() => setViewingPurchase(p)}
                            className="px-2.5 py-1 text-[11px] font-['Inter:Medium',sans-serif] bg-gray-100 hover:bg-gray-200 text-gray-800 rounded transition-colors"
                          >
                            View Items
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Payments History */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#e5e7eb] flex items-center justify-between bg-[#f9fafb]">
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[13px] text-[#111827]">
                Payment Transactions to {supplier.name}
              </span>
              <button
                onClick={() => setIsPayModalOpen(true)}
                disabled={supplier.outstandingBalance <= 0}
                className="text-[12px] text-emerald-700 font-['Inter:Semi_Bold',sans-serif] hover:underline disabled:opacity-40"
              >
                + Record Payment
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#f9fafb] text-[#6b7280] font-['Inter:Semi_Bold',sans-serif] uppercase tracking-wider text-[11px] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Payment #</th>
                    <th className="px-5 py-3 text-right">Amount</th>
                    <th className="px-5 py-3">Method</th>
                    <th className="px-5 py-3">Purchase Reference</th>
                    <th className="px-5 py-3">Reference / Tx #</th>
                    <th className="px-5 py-3">Notes</th>
                    <th className="px-5 py-3">Created By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6]">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-10 text-center text-[#9ca3af]">
                        No payments recorded for this supplier yet.
                      </td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id} className="hover:bg-[#f9fafb]">
                        <td className="px-5 py-3.5 text-[#374151]">{formatDateDisplay(p.paymentDate)}</td>
                        <td className="px-5 py-3.5 font-['JetBrains_Mono',monospace] font-bold text-[#111827]">
                          {p.paymentNumber}
                        </td>
                        <td className="px-5 py-3.5 text-right font-['Inter:Bold',sans-serif] text-emerald-700">
                          {formatCurrency(p.amount)}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1 font-['Inter:Medium',sans-serif] text-[#374151]">
                            {p.paymentMethod === "Cash" && "💵"}
                            {p.paymentMethod === "Bank Transfer" && "🏦"}
                            {p.paymentMethod === "InstaPay" && "📱"}
                            {p.paymentMethod === "Wallet" && "👜"}
                            <span>{p.paymentMethod}</span>
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-['JetBrains_Mono',monospace] text-[#4b5563]">
                          {p.purchaseNumber || "General Account"}
                        </td>
                        <td className="px-5 py-3.5 text-[#6b7280]">{p.reference || "—"}</td>
                        <td className="px-5 py-3.5 text-[#6b7280] italic">{p.notes || "—"}</td>
                        <td className="px-5 py-3.5 text-[12px] text-[#9ca3af]">{p.createdBy || "System"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Account Statement (كشف حساب) */}
        {activeTab === "statement" && (
          <div className="bg-white rounded-[10px] border border-[#e5e7eb] shadow-xs overflow-hidden space-y-4">
            <div className="px-5 py-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-['Inter:Bold',sans-serif] text-[15px] text-[#111827] flex items-center gap-2">
                  <span>📜</span> Chronological Account Statement — {supplier.name}
                </h3>
                <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6b7280] mt-0.5">
                  <strong>Debit (+):</strong> Increases workshop debt to supplier. <strong>Credit (-):</strong> Decreases debt via payments.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#6b7280] block">Current Running Balance</span>
                <span className="font-['Inter:Bold',sans-serif] text-[16px] text-rose-700">
                  {formatCurrency(statement?.outstandingBalance || supplier.outstandingBalance)}
                </span>
              </div>
            </div>

            <div className="px-5 pb-5 overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#f9fafb] text-[#6b7280] font-['Inter:Semi_Bold',sans-serif] uppercase tracking-wider text-[11px] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Reference #</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3 text-right">Debit (Purchase +)</th>
                    <th className="px-4 py-3 text-right">Credit (Payment -)</th>
                    <th className="px-4 py-3 text-right">Running Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6]">
                  {!statement?.transactions || statement.transactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-[#9ca3af]">
                        No account transactions recorded yet.
                      </td>
                    </tr>
                  ) : (
                    statement.transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-[#f9fafb]">
                        <td className="px-4 py-3 text-[#374151]">{formatDateDisplay(tx.date)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-['Inter:Semi_Bold',sans-serif] ${
                              tx.type === "PURCHASE"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-['JetBrains_Mono',monospace] text-[#111827]">
                          {tx.referenceNumber}
                        </td>
                        <td className="px-4 py-3 text-[#374151]">{tx.description}</td>
                        <td className="px-4 py-3 text-right font-['Inter:Semi_Bold',sans-serif] text-blue-700">
                          {tx.debit > 0 ? formatCurrency(tx.debit) : "—"}
                        </td>
                        <td className="px-4 py-3 text-right font-['Inter:Semi_Bold',sans-serif] text-emerald-700">
                          {tx.credit > 0 ? formatCurrency(tx.credit) : "—"}
                        </td>
                        <td className="px-4 py-3 text-right font-['Inter:Bold',sans-serif]">
                          <span className={tx.balance > 0 ? "text-rose-700" : "text-emerald-700"}>
                            {formatCurrency(tx.balance)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {statement && statement.transactions.length > 0 && (
                  <tfoot className="bg-[#f9fafb] border-t-2 border-[#e5e7eb] font-['Inter:Bold',sans-serif]">
                    <tr>
                      <td colSpan={4} className="px-4 py-3 text-right text-[#374151]">
                        Account Totals:
                      </td>
                      <td className="px-4 py-3 text-right text-blue-700">
                        {formatCurrency(statement.totalPurchases)}
                      </td>
                      <td className="px-4 py-3 text-right text-emerald-700">
                        {formatCurrency(statement.totalPaid)}
                      </td>
                      <td className="px-4 py-3 text-right text-[14px] text-rose-700">
                        {formatCurrency(statement.outstandingBalance)}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      <AddSupplierModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        supplierToEdit={supplier}
        onSaved={() => {
          loadSupplierData();
        }}
      />

      <AddPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        supplier={supplier}
        parts={parts}
        onPurchaseCreated={() => {
          loadSupplierData();
          if (onReloadInventory) onReloadInventory();
        }}
        onPartCreatedInInventory={() => {
          if (onReloadInventory) onReloadInventory();
        }}
      />

      <PaySupplierModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        supplier={supplier}
        onPaymentRecorded={() => {
          loadSupplierData();
        }}
      />

      <PurchaseDetailsModal
        isOpen={!!viewingPurchase}
        onClose={() => setViewingPurchase(null)}
        purchase={viewingPurchase}
      />
    </div>
  );
}
