import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { api, getAuthToken, setAuthToken, removeAuthToken, API_ORIGIN, type WorkshopSettings } from "./services/api";
import { toPng } from "html-to-image";
import svgPaths from "./imports/CreateAppDesign-5/svg-ctoveqeshk";
import imgCanvas from "./imports/CreateAppDesign-5/40596e1a727bb6e2289087a4a363b5adae14c080.png";
import {
  formatDateLocal,
  parseLocalDate,
  getTodayLocalDateString,
  getPayrollWeekStart,
  getPayrollWeekEnd,
  getPayrollWeekDates,
  isSunday,
  type PayrollWeekDay,
} from "./utils/payrollDateUtils";
import {
  SupplierDashboardScreen,
  SupplierProfileScreen,
} from "./components/suppliers/SupplierScreens";
import { ExpensesDashboardScreen } from "./components/expenses/ExpenseScreens";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "login"
  | "dashboard"
  | "step1-customer"
  | "step2-vehicle"
  | "step3-details"
  | "job-order-created"
  | "vehicle-list"
  | "vehicle-details"
  | "customer-list"
  | "customer-details"
  | "job-order-details"
  | "job-orders-list"
  | "warehouse-dashboard"
  | "warehouse-jobs"
  | "warehouse-parts-issue"
  | "warehouse-parts"
  | "warehouse-part-details"
  | "warehouse-movements"
  | "warehouse-stock-count"
  | "owner-dashboard"
  | "owner-reports"
  | "owner-users"
  | "owner-settings"
  | "owner-invoices"
  | "owner-payments"
  | "owner-technicians"
  | "owner-attendance"
  | "owner-payroll"
  | "owner-technician-details"
  | "accountant-dashboard"
  | "accountant-jobs"
  | "accountant-job-details"
  | "accountant-parts"
  | "accountant-invoices"
  | "accountant-invoice-details"
  | "accountant-payments"
  | "accountant-technicians"
  | "accountant-attendance"
  | "accountant-payroll"
  | "accountant-technician-details"
  | "owner-suppliers"
  | "owner-supplier-details"
  | "owner-expenses"
  | "accountant-suppliers"
  | "accountant-supplier-details"
  | "accountant-expenses"
  | "warehouse-suppliers"
  | "warehouse-supplier-details"
  | "print-job-order";

type ModalType = null | "new-customer" | "add-vehicle" | "change-owner";
type WarehouseModal = null | "add-part-to-job" | "add-new-part";

interface Technician {
  id: string;
  name: string;
  phone: string;
  dailyRate: number;
  status: "Active" | "Inactive";
  isDeleted?: boolean;
  deletedAt?: string;
  joinedDate?: string;
  notes?: string;
}

interface AttendanceRecord {
  id: string;
  technicianId: string;
  technicianName: string;
  date: string; // YYYY-MM-DD
  status: "Present" | "Absent";
  dailyRate: number;
  earningTransactionId?: string;
  timestamp: string;
  notes?: string;
}

type PayrollTransactionType =
  | "DAILY_EARNING"
  | "ADVANCE"
  | "ADVANCE_REPAYMENT"
  | "ADVANCE_SETTLEMENT"
  | "DEDUCTION"
  | "SALARY_PAYMENT"
  | "TECHNICIAN_TIP"
  | "Technician Tip"
  | "Daily Wage"
  | "Salary Payment";

interface PayrollTransaction {
  id: string;
  technicianId: string;
  technicianName: string;
  date: string; // YYYY-MM-DD
  type: PayrollTransactionType;
  dailyRate?: number;
  amount: number; // positive for DAILY_EARNING (+500) and TECHNICIAN_TIP (+250), negative for ADVANCE (-300), ADVANCE_REPAYMENT (-200), DEDUCTION (-100), SALARY_PAYMENT (-500)
  attendanceId?: string;
  relatedAdvanceId?: string;
  reason?: string;
  paymentMethod?: "Cash" | "Bank Transfer" | "Cheque" | "Other";
  description?: string;
  notes?: string;
  status: "Unpaid" | "Paid";
  createdAt: string;
  createdBy?: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  vehicleCount?: number;
}

interface JoListEntry {
  id?: number;
  number: string;
  customer: string;
  phone: string;
  vehicle: string;
  plate: string;
  status: string;
  date?: string;
  type?: string;
}

interface PartOption {
  partId: string;
  partName: string;
  partNumber: string;
  brand: string;
  partType: "Original" | "After Market" | string;
  sellingPrice: number;
  availableQty: number;
}

interface WorkFoundItem {
  id: string;
  description: string;
  options?: PartOption[];
  selectedOptionId?: string;
  selectedPart?: {
    partId: string;
    partName: string;
    partNumber: string;
    brand: string;
    partType: string;
    sellingPrice: number;
    qty: number;
  };
  approved: boolean;
}

interface DeferredWorkItem {
  id: string;
  item: string;
  options: PartOption[];
  selectedOptionId?: string;
  selectedPart?: {
    partId: string;
    partName: string;
    partNumber: string;
    brand: string;
    partType: string;
    sellingPrice: number;
    qty: number;
  };
  note?: string;
  status: "Deferred";
}

interface AdditionalExpense {
  id: string;
  description: string;
  amount: string;
}

interface LaborItem {
  id: string;
  description: string;
  amount: string; // stored as string for input binding, same pattern as AdditionalExpense
}

type InvoicePaymentMethod = "Cash" | "Visa" | "InstaPay" | "Wallet";

interface InvoicePayment {
  id: string;
  invoiceNumber: string;
  method: InvoicePaymentMethod;
  amount: number;
  reference: string;
  date: string;        // display date string
  createdAt: string;   // ISO timestamp
  createdBy: string;
}

interface Invoice {
  invoiceNumber: string;
  jobOrderNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  vehicleName: string;
  vehiclePlate: string;
  vehicleKm: string;
  vehicleVin: string;
  engineer: string;
  issuedParts: WIssuedPart[];
  partsPriceMap: Record<string, number>;
  partsTotal: number;
  laborAmount: number;
  laborItems: LaborItem[];
  payments: InvoicePayment[];
  additionalExpenses: AdditionalExpense[];
  expensesTotal: number;
  grandTotal: number;
  paymentStatus: "Unpaid" | "Partially Paid" | "Paid";
}

interface JoDetail {
  id?: number;
  number: string;
  date: string;
  status: string;
  type: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  vehicleId: string;
  vehicleName: string;
  vehiclePlate: string;
  vehicleKm: string;
  vehicleVin: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  notes?: string;
  requiredWork?: string;
  engineer: string;
  technicians: string[];
  customerRequest: string;
  workFoundItems: WorkFoundItem[];
  approvedItems: {
    item: string;
    note: string;
    selectedPart?: {
      partId: string;
      partName: string;
      partNumber: string;
      brand: string;
      partType: string;
      sellingPrice: number;
      qty: number;
    };
  }[];
  deferredItems: (DeferredWorkItem | string)[];
  laborAmount?: number;
  laborItems?: LaborItem[];
  additionalExpenses?: AdditionalExpense[];
  invoiceCreated?: boolean;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  plate: string;
  vin: string;
  color: string;
  km: string;
  visits?: number;
  lastVisit?: string;
  customerId?: string;
}

interface ServiceHistoryEntry {
  joNumber: string;
  date: string;
  km: string;
  inspection: string;
  status: string;
}

interface DeferredItem {
  item: string;
  note: string;
  date: string;
  joNumber: string;
  km: string;
  engineer: string;
  options?: PartOption[];
  selectedPart?: WorkFoundItem["selectedPart"];
}

interface FlowCtx {
  joNumber: string;
  joDate: string;
  engineer: string;
  customer: Customer | null;
  vehicle: Vehicle | null;
}

// ─── Seed data (Clean State) ──────────────────────────────────────────────────

const SEED_CUSTOMERS: Customer[] = [];
const SEED_VEHICLES: Record<string, Vehicle[]> = {};
const SEED_JOS: JoListEntry[] = [];
const SEED_VEHICLE_LIST: (Vehicle & { customerName: string; customerPhone: string })[] = [];
const SEED_SERVICE_HISTORY: Record<string, ServiceHistoryEntry[]> = {};
const SEED_DEFERRED_WORK: Record<string, DeferredItem[]> = {};
const SEED_JO_DETAILS: Record<string, JoDetail> = {};
const SEED_TECHNICIANS: Technician[] = [];
const SEED_ATTENDANCE_RECORDS: AttendanceRecord[] = [];
const SEED_PAYROLL_TRANSACTIONS: PayrollTransaction[] = [];


function computeNextJobNumber(existingJobs: { number: string }[]): string {
  const year = new Date().getFullYear();
  const prefix = `JO-${year}-`;
  let maxSeq = 0;
  for (const j of existingJobs) {
    if (j.number && j.number.startsWith(prefix)) {
      const seq = parseInt(j.number.substring(prefix.length), 10);
      if (!isNaN(seq) && seq > maxSeq) {
        maxSeq = seq;
      }
    }
  }
  return `${prefix}${String(maxSeq + 1).padStart(5, "0")}`;
}

function resolveJoDetail(
  joNumber: string,
  joEntry?: { id?: number; number: string; customer?: string; vehicle?: string; plate?: string; status?: string; date?: string; phone?: string; engineer?: string; customerRequest?: string },
  detailsMap?: Record<string, JoDetail>
): JoDetail {
  if (detailsMap && detailsMap[joNumber]) {
    return {
      ...detailsMap[joNumber],
      status: joEntry?.status ?? detailsMap[joNumber].status,
    };
  }
  return {
    id: joEntry?.id,
    number: joNumber,
    date: joEntry?.date ?? new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: joEntry?.status ?? "Open",
    type: "Full Service",
    customerId: "1",
    customerName: joEntry?.customer ?? "Customer",
    customerPhone: joEntry?.phone ?? "",
    vehicleId: "v1",
    vehicleName: joEntry?.vehicle ?? "Vehicle",
    vehiclePlate: joEntry?.plate ?? "",
    vehicleKm: "",
    vehicleVin: "",
    engineer: joEntry?.engineer || "",
    technicians: [],
    customerRequest: joEntry?.customerRequest || "",
    workFoundItems: [],
    approvedItems: [],
    deferredItems: [],
  };
}

const FRESH_CTX: FlowCtx = {
  joNumber: "JO-2026-00001",
  joDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
  engineer: "",
  customer: null,
  vehicle: null,
};

// ─── Warehouse Types & Data ───────────────────────────────────────────────────

interface WJob {
  number: string;
  date: string;
  vehicle: string;
  year: string;
  color: string;
  plate: string;
  partsIssued: number;
  serviceType: string;
  customer: string;
  status: string;
}

interface WPart {
  id: string;
  name: string;
  number: string;
  oem: string;
  brand: string;
  category: string;
  compatibleVehicles: string[];
  currentQty: number;
  minQty: number;
  location: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  purchasePrice: number;
  sellingPrice: number;
  partType?: "Original" | "After Market" | string;
}

interface WIssuedPart {
  partId: string;
  partName: string;
  partNumber: string;
  qty: number;
}

interface WMovement {
  part: string;
  type: "Issue" | "Stock In";
  reference: string;
  note: string;
  date: string;
  qty: number;
}

const W_JOBS: WJob[] = [];
const W_PARTS: WPart[] = [];
const W_JOB_PARTS_INIT: Record<string, WIssuedPart[]> = {};
const W_MOVEMENTS: WMovement[] = [];

// ─── Screen: Login ────────────────────────────────────────────────────────────

type Role = "engineer" | "warehouse" | "accountant" | "owner";

// ─── Login Screen Helpers ─────────────────────────────────────────────────────

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function LockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function EyeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeOffIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.958 8.958 0 013.985-.938c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-6.165-4.152a3 3 0 11-4.243-4.243m4.243 4.243L3 3l18 18" />
    </svg>
  );
}

function LogInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  );
}

function LoginScreen({ onLoginSuccess, workshopSettings }: { onLoginSuccess: (role: Role, user: { id?: string; name: string; email: string; role?: Role }) => void; workshopSettings?: WorkshopSettings }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [branding, setBranding] = useState<WorkshopSettings>(workshopSettings || {
    id: 1,
    companyName: "SOS Motor Works",
    phone: "+20 100 933 4747",
    address: "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة",
    email: "info@sosmotorworks.com",
    currency: "EGP",
    logoUrl: "/uploads/branding/sos_logo.jpeg",
  });

  useEffect(() => {
    if (workshopSettings?.companyName) {
      setBranding(workshopSettings);
    } else {
      api.getWorkshopSettings().then((data) => {
        if (data && data.companyName) {
          setBranding(data);
        }
      }).catch(() => {});
    }
  }, [workshopSettings]);

  const logoPath = branding.logoUrl || "/uploads/branding/sos_logo.jpeg";
  const logoSrc = logoPath.startsWith("http") ? logoPath : `${API_ORIGIN}${logoPath}`;
  const companyName = branding.companyName || "SOS Motor Works";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await api.login({ email: email.trim(), password });
      if (res && res.token) {
        setAuthToken(res.token);
      }
      const roleStr = (res?.role || "").toLowerCase();
      const validRoles: Role[] = ["engineer", "warehouse", "accountant", "owner"];
      const targetRole: Role = validRoles.includes(roleStr as Role) ? (roleStr as Role) : "engineer";
      onLoginSuccess(targetRole, { id: res.id?.toString(), name: res.fullName || res.email, email: res.email, role: targetRole });
    } catch (err: any) {
      let msg = "Invalid email or password";
      try {
        const parsed = JSON.parse(err.message);
        if (parsed?.message) msg = parsed.message;
      } catch {
        if (err.message && !err.message.includes("status")) msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 select-none overflow-y-auto py-8 px-4 bg-slate-950">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('/login_bg.jpg')` }}
      />
      {/* Dark Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060c17]/85 via-[#091122]/90 to-[#050a14]/95 z-0 backdrop-blur-[2px]" />

      {/* Main Content Layer */}
      <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center">
        {/* Brand block */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="h-24 mb-2 flex items-center justify-center">
            <img
              src={logoSrc}
              alt={companyName}
              crossOrigin="anonymous"
              className="max-h-24 w-auto object-contain drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `${API_ORIGIN}/uploads/branding/sos_logo.jpeg`;
              }}
            />
          </div>
          <h1 className="font-['Inter',sans-serif] font-bold text-[26px] text-white tracking-tight mb-1">
            {companyName}
          </h1>
          <p className="font-['Inter',sans-serif] font-normal text-[14px] text-slate-400">
            Workshop Management System
          </p>
        </div>

        {/* Login card */}
        <div className="w-full bg-[#111927]/90 border border-slate-700/50 rounded-2xl p-7 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-6">
            <h2 className="font-['Inter',sans-serif] font-semibold text-[20px] text-white tracking-tight">
              Sign In
            </h2>
            <p className="font-['Inter',sans-serif] font-normal text-[13px] text-slate-400 mt-1">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-['Inter',sans-serif] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                EMAIL ADDRESS
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-500 pointer-events-none">
                  <MailIcon className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-11 pl-10 pr-3.5 bg-[#e9eff6] text-slate-900 rounded-xl text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/60 transition-all border-0"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-['Inter',sans-serif] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                PASSWORD
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-500 pointer-events-none">
                  <LockIcon className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 bg-[#e9eff6] text-slate-900 rounded-xl text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/60 transition-all border-0 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-500 hover:text-slate-700 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#ef3838] hover:bg-[#dc2626] active:scale-[0.99] text-white font-['Inter',sans-serif] font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-5 shadow-lg shadow-red-900/30 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="animate-spin text-xs">⏳</span>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogInIcon className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 font-['Inter',sans-serif] font-normal text-[12px] text-slate-500/90 text-center">
          {companyName} · Cairo, Egypt · v1.0
        </p>
      </div>
    </div>
  );
}

// ─── Shared: Status Badge ─────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Open: "bg-[#eff6ff] border-[#bedbff] text-[#1447e6]",
    Complete: "bg-emerald-50 border-emerald-200 text-emerald-700",
    Completed: "bg-emerald-50 border-emerald-200 text-emerald-700",
    Closed: "bg-[#f3f4f6] border-[#e5e7eb] text-[#6a7282]",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[12px] font-['Inter:Semi_Bold',sans-serif] font-semibold ${map[status] ?? "bg-[#f3f4f6] border-[#e5e7eb] text-[#6a7282]"}`}
    >
      {status}
    </span>
  );
}

// ─── Shared: Sidebar ──────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "dashboard", symbol: "⊞", label: "Dashboard" },
  { id: "customers", symbol: "◉", label: "Customers" },
  { id: "vehicles", symbol: "◈", label: "Vehicles" },
  { id: "job-orders", symbol: "◫", label: "Job Orders" },
];

function getUserInitials(name?: string | null): string {
  if (!name || !name.trim()) return "U";
  const clean = name.trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Sidebar({
  active,
  onNav,
  onSignOut,
  workshopSettings,
  authUser,
  role,
}: {
  active: string;
  onNav: (id: string) => void;
  onSignOut: () => void;
  workshopSettings?: WorkshopSettings;
  authUser?: { name: string; email: string; role?: Role } | null;
  role?: Role | null;
}) {
  const companyName = workshopSettings?.companyName || "SOS Motor Works";
  const logoUrl = workshopSettings?.logoUrl || "/uploads/branding/sos_logo.jpeg";
  const fullLogoUrl = logoUrl.startsWith("http") ? logoUrl : `${API_ORIGIN}${logoUrl}`;

  const userName = authUser?.name || (role ? role.toUpperCase() : "Engineer");
  const displayRole = (authUser?.role || role || "engineer").toLowerCase();
  const roleLabel =
    displayRole === "accountant" ? "Accountant" :
    displayRole === "owner" ? "Owner" :
    displayRole === "warehouse" ? "Warehouse" :
    "Engineer";
  const initials = getUserInitials(userName);

  return (
    <div data-sidebar="true" className="no-print fixed left-0 top-0 bottom-0 w-56 bg-[#060f1e] flex flex-col z-20 select-none border-r border-white/10">
      {/* Brand */}
      <div className="flex items-center gap-2.5 p-4 border-b border-white/10 shrink-0">
        <div className="size-8 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-1 border border-white/15 shrink-0">
          <img
            src={fullLogoUrl}
            alt={companyName}
            crossOrigin="anonymous"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${API_ORIGIN}/uploads/branding/sos_logo.jpeg`;
            }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-white leading-[15px] truncate">
            {companyName}
          </span>
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-white/40 tracking-[0.5px] uppercase">
            {roleLabel}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className={`flex items-center gap-3 px-5 py-2.5 w-full text-left transition-colors ${
              active === item.id ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            <span className="w-4 text-center text-[12px] opacity-80">{item.symbol}</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px]">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-5 py-4 shrink-0">
        <div className="flex items-center gap-2.5 pb-3">
          <div className="flex items-center justify-center size-8 bg-red-600 text-white font-bold text-[11px] rounded-full shrink-0 shadow-sm">
            <span>{initials}</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-white/90 leading-[16px] truncate">
              {userName}
            </span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-white/35 tracking-[0.5px] uppercase">
              {roleLabel}
            </span>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-white/35 hover:text-white/60 transition-colors"
        >
          → Sign out
        </button>
      </div>
    </div>
  );
}

// ─── Shared: Header ───────────────────────────────────────────────────────────

function Header({
  title,
  searchValue,
  role,
  authUser,
  workshopSettings,
}: {
  title: string;
  searchValue?: string;
  role?: Role | null;
  authUser?: { name: string; email: string; role?: Role } | null;
  workshopSettings?: WorkshopSettings;
}) {
  const isNarrowSidebar = role === "accountant" || role === "owner" || role === "warehouse";
  const userName = authUser?.name || (role ? role.toUpperCase() : "User");
  const displayRole = (authUser?.role || role || "engineer").toLowerCase();
  const roleLabel =
    displayRole === "accountant" ? "Accountant" :
    displayRole === "owner" ? "Owner" :
    displayRole === "warehouse" ? "Warehouse" :
    "Engineer";
  const initials = getUserInitials(userName);

  return (
    <div data-topbar="true" className={`no-print fixed top-0 ${isNarrowSidebar ? "left-[168px]" : "left-56"} right-0 h-14 bg-white border-b border-[#e5e7eb] flex items-center gap-4 px-6 z-10`}>
      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828] shrink-0 pr-2">{title}</span>
      <div className="flex-1 max-w-[448px] relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#99a1af]">🔍</span>
        <input
          className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] pl-8 pr-4 py-[6px] text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] placeholder:text-[#99a1af] outline-none"
          placeholder={searchValue ?? "Search vehicle, customer, job order…"}
        />
      </div>
      <div className="ml-auto flex items-center gap-3 shrink-0">
        <div className="relative size-8 flex items-center justify-center cursor-pointer">
          <span className="text-[16px]">🔔</span>
          <div className="absolute top-1 right-1 size-2 bg-[#fb2c36] rounded-full border border-white" />
        </div>
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-full py-1 px-3">
          <div className="size-7 rounded-full bg-red-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#101828] leading-snug">{userName}</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#99a1af] capitalize leading-none">{roleLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared: Flow Sub-header (Back + JO title + Stepper) ─────────────────────

function FlowSubHeader({
  ctx,
  step,
  onBack,
  actions,
}: {
  ctx: FlowCtx;
  step: number;
  onBack: () => void;
  actions?: React.ReactNode;
}) {
  const steps = [
    { n: 1, label: "Customer" },
    { n: 2, label: "Vehicle" },
    { n: 3, label: "Job Details" },
    { n: 4, label: "Review & Print" },
  ];

  return (
    <div className="bg-white border-b border-[#e5e7eb] px-6 pt-3 pb-0 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] cursor-pointer hover:text-[#6a7282]">
          Job Orders
        </span>
        <span className="text-[12px] text-[#99a1af]">/</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#364153]">New Job Order</span>
      </div>

      {/* Row: Back + Title + Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[#6a7282] hover:text-[#364153] transition-colors"
          >
            <svg className="shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p1a02e400} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px]">Back</span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-[#101828]">New Job Order</span>
            <div className="bg-[#f3f4f6] px-2 py-0.5 rounded">
              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">{ctx.joNumber}</span>
            </div>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{ctx.joDate}</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">·</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{ctx.engineer}</span>
            <div className="bg-[#eff6ff] border border-[#bedbff] px-2.5 py-0.5 rounded-full">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#1447e6]">Open</span>
            </div>
          </div>
        </div>

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>

      {/* Step Progress Bar — full-width dedicated row */}
      <div className="flex items-center pb-0">
        {steps.map((s, i) => {
          const isCompleted = s.n < step;
          const isActive = s.n === step;
          const isUpcoming = s.n > step;
          return (
            <div key={s.n} className="flex items-center flex-1 last:flex-none">
              {/* Step node */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-['Inter:Semi_Bold',sans-serif] font-semibold shrink-0 transition-all ${
                      isCompleted
                        ? "bg-[#0f2340] text-white"
                        : isActive
                          ? "bg-[#0f2340] text-white ring-4 ring-[#0f2340]/10"
                          : "bg-white border-2 border-[#d1d5dc] text-[#99a1af]"
                    }`}
                  >
                    {isCompleted ? "✓" : s.n}
                  </div>
                  <span
                    className={`font-['Inter:Medium',sans-serif] font-medium text-[13px] whitespace-nowrap ${
                      isActive ? "text-[#0f2340]" : isCompleted ? "text-[#364153]" : "text-[#99a1af]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {/* Active underline indicator */}
                <div
                  className={`h-[2px] w-full rounded-t transition-all ${isActive ? "bg-[#0f2340]" : "bg-transparent"}`}
                  style={{ minWidth: "100%" }}
                />
              </div>

              {/* Connector line between steps */}
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 transition-all ${isCompleted ? "bg-[#0f2340]" : "bg-[#e5e7eb]"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Shared: JO Info Sidebar Panel ───────────────────────────────────────────

function JOInfoPanel({ ctx, extra }: { ctx: FlowCtx; extra?: React.ReactNode }) {
  return (
    <div className="w-[240px] shrink-0 bg-white border border-[#e5e7eb] rounded-xl p-5">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-4">JOB ORDER INFO</p>
      <div className="space-y-3.5">
        {[
          { label: "Number", value: ctx.joNumber, mono: true, strong: true },
          { label: "Date", value: ctx.joDate, mono: false },
          { label: "Engineer", value: ctx.engineer, mono: false },
          { label: "Customer", value: ctx.customer?.name ?? null, mono: false },
          { label: "Vehicle", value: ctx.vehicle ? `${ctx.vehicle.make} ${ctx.vehicle.model}` : null, mono: false },
        ].map((f) => (
          <div key={f.label}>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mb-0.5">{f.label}</p>
            {f.value ? (
              <p
                className={`text-[14px] font-medium leading-5 text-[#101828] ${f.mono ? "font-['JetBrains_Mono:Bold',sans-serif] font-bold" : "font-['Inter:Medium',sans-serif]"}`}
              >
                {f.value}
              </p>
            ) : (
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#d1d5dc]">—</p>
            )}
          </div>
        ))}
      </div>
      {extra}
    </div>
  );
}

// ─── Screen 1: Dashboard ──────────────────────────────────────────────────────

function DashboardScreen({
  jobOrders,
  vehicles = [],
  onNewJobOrder,
  onOpenJobOrder,
  onSelectVehicle,
  workshopSettings,
}: {
  jobOrders: typeof SEED_JOS;
  vehicles?: (Vehicle & { customerName: string; customerPhone: string })[];
  onNewJobOrder: () => void;
  onOpenJobOrder?: (number: string) => void;
  onSelectVehicle?: (v: Vehicle & { customerName: string; customerPhone: string }) => void;
  workshopSettings?: WorkshopSettings;
}) {
  const companyName = workshopSettings?.companyName || "SOS Motor Works";
  return (
    <div className="ml-56 mt-14 p-6 min-h-screen bg-[#f3f4f6]">
      {/* Hero */}
      <div className="bg-[#0f2340] rounded-xl p-6 mb-6 flex items-center justify-between">
        <div>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-white/50 uppercase tracking-[0.8px] mb-1">
            READY TO START
          </p>
          <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] text-white mb-1">
            Create a New Job Order
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-white/50">
            Tue, 12 August 2026 · {companyName}
          </p>
        </div>
        <button
          onClick={onNewJobOrder}
          className="bg-white text-[#0f2340] font-['Inter:Medium',sans-serif] font-medium text-[14px] px-5 py-2.5 rounded-[8px] hover:bg-white/90 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          + New Job Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "TODAY'S JOBS", value: jobOrders.length.toString(), sub: "Total", icon: "◫", color: "text-[#101828]" },
          { label: "OPEN", value: jobOrders.filter((j) => j.status === "Open").length.toString(), sub: "Awaiting work", icon: "○", color: "text-[#101828]" },
          { label: "COMPLETED", value: jobOrders.filter((j) => j.status === "Complete" || j.status === "Completed").length.toString(), sub: "Ready for accounting", icon: "✓", color: "text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase">
                {s.label}
              </span>
              <span className="text-[#99a1af] text-[16px]">{s.icon}</span>
            </div>
            <p className={`font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] mb-1 ${s.color}`}>{s.value}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex gap-4">
        {/* Table */}
        <div className="flex-1 bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f3f4f6]">
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase">
              TODAY'S WORKSHOP ACTIVITY
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f3f4f6]">
                {["JOB ORDER", "CUSTOMER", "VEHICLE", "STATUS"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-[#99a1af] text-[13px] font-['Inter:Regular',sans-serif]">
                    No job orders for today yet
                  </td>
                </tr>
              ) : (
                jobOrders.map((jo) => (
                  <tr
                    key={jo.number}
                    onClick={() => onOpenJobOrder?.(jo.number)}
                    className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-4 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#101828]">
                      {jo.number}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{jo.customer}</p>
                      <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{jo.phone}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{jo.vehicle}</p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{jo.plate}</p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={jo.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Right panel */}
        <div className="w-[240px] shrink-0">
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6]">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase">
                RECENT VEHICLES
              </span>
            </div>
            {vehicles.length === 0 ? (
              <div className="px-5 py-8 text-center text-[#99a1af] text-[12px] font-['Inter:Regular',sans-serif]">
                No vehicles registered yet
              </div>
            ) : (
              vehicles.slice(0, 5).map((v, i) => (
                <div
                  key={v.id || i}
                  onClick={() => onSelectVehicle?.(v)}
                  className="px-5 py-3 border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">
                      {v.make} {v.model}
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] shrink-0 ml-2">
                      {v.lastVisit || v.year || ""}
                    </p>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">
                    {v.plate} {v.customerName ? `· ${v.customerName}` : ""}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Modal: New Customer ──────────────────────────────────────────────────────

function NewCustomerModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (c: Customer) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const valid = name.trim() !== "" && phone.trim() !== "";

  function handleCreate() {
    if (!valid) return;
    onCreate({ id: Date.now().toString(), name: name.trim(), phone: phone.trim(), email: email.trim(), vehicleCount: 0 });
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[460px] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828]">New Customer</span>
          <button onClick={onClose} className="text-[#6a7282] hover:text-[#364153] text-[20px] leading-none transition-colors">
            ×
          </button>
        </div>

        <div className="space-y-4">
          {[
            { label: "FULL NAME *", val: name, set: setName, ph: "Ahmed Mohamed", mono: false },
            { label: "PHONE NUMBER *", val: phone, set: setPhone, ph: "01012345678", mono: true },
            { label: "EMAIL", val: email, set: setEmail, ph: "email@example.com", mono: false },
          ].map((f) => (
            <div key={f.label}>
              <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#4a5565] tracking-[0.4px] uppercase block mb-1.5">
                {f.label}
              </label>
              <input
                value={f.val}
                onChange={(e) => f.set(e.target.value)}
                className={`w-full border border-[#e5e7eb] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#0f2340] transition-colors ${f.mono ? "font-['JetBrains_Mono:Regular',sans-serif]" : "font-['Inter:Regular',sans-serif]"}`}
                placeholder={f.ph}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCreate}
            disabled={!valid}
            className="flex-1 bg-[#0f2340] text-white py-2.5 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] hover:bg-[#1a3a5c] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
          >
            Create & Continue
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#d1d5dc] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] active:bg-[#f3f4f6] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal: Add New Vehicle ───────────────────────────────────────────────────

function AddVehicleModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (v: Vehicle) => void;
}) {
  const [form, setForm] = useState({ make: "", model: "", year: "", color: "", plate: "", vin: "", km: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid = form.make && form.model && form.year && form.plate;

  function handleCreate() {
    if (!valid) return;
    onCreate({ id: Date.now().toString(), ...form });
  }

  const gridFields: { k: keyof typeof form; label: string; ph: string; mono?: boolean }[] = [
    { k: "make", label: "Make *", ph: "BMW" },
    { k: "model", label: "Model *", ph: "320i" },
    { k: "year", label: "Year *", ph: "2021" },
    { k: "color", label: "Color", ph: "Silver" },
    { k: "plate", label: "Plate Number *", ph: "ABC 123" },
    { k: "vin", label: "VIN / Chassis", ph: "WBA..." },
  ];

  return (
    <div
      className="fixed inset-0 backdrop-blur-[8px] bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[576px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6]">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">Add New Vehicle</span>
          <button onClick={onClose} className="text-[#99a1af] hover:text-[#364153] text-[18px] leading-none transition-colors">
            ×
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {gridFields.map((f) => (
              <div key={f.k} className="flex flex-col gap-1">
                <label className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#4a5565] tracking-[0.3px] uppercase">
                  {f.label}
                </label>
                <input
                  value={form[f.k]}
                  onChange={set(f.k)}
                  className="w-full border border-[#d1d5dc] rounded-[6px] px-3 py-2 text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] outline-none focus:border-[#0f2340] transition-colors placeholder:text-[#99a1af]"
                  placeholder={f.ph}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <label className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#4a5565] tracking-[0.3px] uppercase">
              Current KM
            </label>
            <input
              value={form.km}
              onChange={set("km")}
              className="w-full border border-[#d1d5dc] rounded-[6px] px-3 py-2 text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] outline-none focus:border-[#0f2340] transition-colors placeholder:text-[#99a1af]"
              placeholder="50000"
            />
          </div>

          <div className="flex gap-3 mt-4 h-[37.6px]">
            <button
              onClick={handleCreate}
              disabled={!valid}
              className="flex-1 bg-[#0f2340] text-white rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] hover:bg-[#1a3a5c] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
            >
              Create &amp; Attach to Job
            </button>
            <button
              onClick={onClose}
              className="px-4 border border-[#d1d5dc] bg-white rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 1 — Find Customer ──────────────────────────────────────────

function Step1CustomerScreen({
  ctx,
  customers,
  onSelectCustomer,
  onNewCustomer,
  onBack,
}: {
  ctx: FlowCtx;
  customers: Customer[];
  onSelectCustomer: (c: Customer) => void;
  onNewCustomer: () => void;
  onBack: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="ml-56 mt-14 flex flex-col min-h-screen bg-[#f3f4f6]">
      <FlowSubHeader ctx={ctx} step={1} onBack={onBack} />

      <div className="flex-1 flex gap-5 p-6">
        {/* Main panel */}
        <div className="flex-1 bg-white border border-[#e5e7eb] rounded-xl p-5">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-4">
            FIND CUSTOMER
          </p>
          <div className="relative mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-[#e5e7eb] rounded-lg px-4 py-2.5 text-[14px] font-['Inter:Regular',sans-serif] outline-none focus:border-[#0f2340] transition-colors"
              placeholder="Search by name or phone number..."
            />
          </div>

          <div className="space-y-2">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCustomer(c)}
                className="w-full flex items-center justify-between px-4 py-3.5 border border-[#e5e7eb] rounded-xl hover:border-[#0f2340] hover:bg-[#f9fafb] active:bg-[#f3f4f6] transition-all text-left"
              >
                <div>
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{c.name}</p>
                  <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">{c.phone}</p>
                </div>
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] shrink-0">
                  {c.vehicleCount ?? 0} {(c.vehicleCount ?? 0) === 1 ? "vehicle" : "vehicles"}
                </span>
              </button>
            ))}

            {filtered.length === 0 && search && (
              <p className="text-center font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#99a1af] py-6">
                No customers found for "{search}"
              </p>
            )}
          </div>

          <button
            onClick={onNewCustomer}
            className="w-full mt-4 border border-[#e5e7eb] rounded-xl px-4 py-3 text-[14px] font-['Inter:Medium',sans-serif] font-medium text-[#4a5565] hover:bg-[#f9fafb] active:bg-[#f3f4f6] transition-colors"
          >
            + New Customer
          </button>
        </div>

        {/* JO Info sidebar */}
        <JOInfoPanel ctx={ctx} />
      </div>
    </div>
  );
}

// ─── Screen: Step 2 — Select Vehicle ─────────────────────────────────────────

function Step2VehicleScreen({
  ctx,
  vehicles,
  onSelectVehicle,
  onAddNewVehicle,
  onBack,
  onChangeCustomer,
}: {
  ctx: FlowCtx;
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  onAddNewVehicle: () => void;
  onBack: () => void;
  onChangeCustomer: () => void;
}) {
  const [plateSearch, setPlateSearch] = useState("");

  const filteredByPlate = plateSearch
    ? vehicles.filter(
        (v) =>
          v.plate.toLowerCase().includes(plateSearch.toLowerCase()) ||
          v.vin.toLowerCase().includes(plateSearch.toLowerCase())
      )
    : vehicles;

  return (
    <div className="ml-56 mt-14 flex flex-col min-h-screen bg-[#f3f4f6]">
      <FlowSubHeader ctx={ctx} step={2} onBack={onBack} />

      <div className="flex-1 flex gap-5 p-6">
        {/* Main panel */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Customer selected banner */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#0f2340] tracking-[0.6px] uppercase">
                CUSTOMER SELECTED
              </span>
              {ctx.customer && (
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">
                  — {ctx.customer.name}
                </span>
              )}
            </div>
            <button
              onClick={onChangeCustomer}
              className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#1447e6] hover:underline transition-all"
            >
              Change
            </button>
          </div>

          {/* Vehicle selection */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-4">
              SELECT VEHICLE
            </p>

            {filteredByPlate.length > 0 && (
              <div className="space-y-2 mb-5">
                {filteredByPlate.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => onSelectVehicle(v)}
                    className="w-full flex items-center justify-between px-4 py-3.5 border border-[#e5e7eb] rounded-xl hover:border-[#0f2340] hover:bg-[#f9fafb] active:bg-[#f3f4f6] transition-all text-left"
                  >
                    <div>
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">
                        {v.make} {v.model}
                      </p>
                      <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">
                        {v.plate} · {v.year}
                      </p>
                    </div>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] shrink-0">
                      {v.color}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">
              OR SEARCH BY PLATE / VIN
            </p>
            <input
              value={plateSearch}
              onChange={(e) => setPlateSearch(e.target.value)}
              className="w-full border border-[#e5e7eb] rounded-lg px-4 py-2.5 text-[14px] font-['Inter:Regular',sans-serif] outline-none focus:border-[#0f2340] transition-colors mb-3"
              placeholder="Enter plate number or VIN..."
            />
            <button
              onClick={onAddNewVehicle}
              className="w-full border border-[#e5e7eb] rounded-xl px-4 py-3 text-[14px] font-['Inter:Medium',sans-serif] font-medium text-[#4a5565] hover:bg-[#f9fafb] active:bg-[#f3f4f6] transition-colors"
            >
              + Add New Vehicle
            </button>
          </div>
        </div>

        {/* JO Info sidebar */}
        <JOInfoPanel
          ctx={ctx}
          extra={
            <button
              onClick={onBack}
              className="mt-4 font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] hover:text-[#364153] transition-colors"
            >
              ← Back to Customer
            </button>
          }
        />
      </div>
    </div>
  );
}

// ─── Screen: Step 3 — Job Order Details ──────────────────────────────────────

function Step3DetailsScreen({
  ctx,
  onCreateJobOrder,
  onCancel,
  onBack,
}: {
  ctx: FlowCtx;
  onCreateJobOrder: (data: { requiredWork: string; completedWork: string; notes: string; km: string }, shouldPrint?: boolean) => void;
  onCancel: () => void;
  onBack: () => void;
}) {
  const [requiredWork, setRequiredWork] = useState("");
  const [completedWork, setCompletedWork] = useState("");
  const [notes, setNotes] = useState("");
  const [notes2, setNotes2] = useState("");
  const [km, setKm] = useState(ctx.vehicle?.km ?? "");

  const ready = !!ctx.customer && !!ctx.vehicle;

  const infoFields = [
    { label: "JOB ORDER", value: ctx.joNumber, mono: true },
    { label: "CUSTOMER NAME", value: ctx.customer?.name ?? null, mono: false },
    { label: "PHONE NUMBER", value: ctx.customer?.phone ?? null, mono: true },
    { label: "DATE", value: ctx.joDate, mono: true },
    { label: "MAKE", value: ctx.vehicle?.make ?? null, mono: false },
    { label: "MODEL", value: ctx.vehicle?.model ?? null, mono: false },
    { label: "MODEL YEAR", value: ctx.vehicle?.year ?? null, mono: true },
    { label: "CURRENT KM", value: km || ctx.vehicle?.km || null, mono: true },
    { label: "COLOR", value: ctx.vehicle?.color ?? null, mono: false },
    { label: "PLATE", value: ctx.vehicle?.plate ?? null, mono: true },
    { label: "VIN", value: ctx.vehicle?.vin ?? null, mono: true },
  ];

  return (
    <div className="ml-56 mt-14 flex flex-col min-h-screen bg-[#f3f4f6]">
      {/* Sub-header with action buttons */}
      <FlowSubHeader
        ctx={ctx}
        step={3}
        onBack={onBack}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={ready ? () => onCreateJobOrder({ requiredWork, completedWork, notes: notes + (notes2 ? "\n\n" + notes2 : ""), km }, true) : undefined}
              className={`flex items-center gap-1.5 border border-[#d1d5dc] bg-white px-3 py-1.5 rounded text-[12px] font-['Inter:Medium',sans-serif] font-medium text-[#4a5565] transition-colors ${ready ? "hover:bg-[#f3f4f6] cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d={svgPaths.p14db7f80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              </svg>
              Print
            </button>
            <button
              onClick={onCancel}
              className="border border-[#d1d5dc] bg-white px-3 py-1.5 rounded text-[12px] font-['Inter:Medium',sans-serif] font-medium text-[#364153] hover:bg-[#f9fafb] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={ready ? () => onCreateJobOrder({ requiredWork, completedWork, notes: notes + (notes2 ? "\n\n" + notes2 : ""), km }, false) : undefined}
              className={`flex items-center gap-1.5 bg-[#0f2340] px-3 py-1.5 rounded text-[12px] font-['Inter:Medium',sans-serif] font-medium text-white transition-all ${ready ? "hover:bg-[#1a3a5c] active:scale-[0.98] cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d={svgPaths.p8f1dd80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              </svg>
              Save Job Order
            </button>
          </div>
        }
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 pb-24 space-y-4">
        {/* Job Order Information card */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f3f4f6]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p3e07e600} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939]">Job Order Information</span>
          </div>
          <div className="p-5">
            {/* Vehicle search field (populated) */}
            <div className="mb-5">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">
                SELECT VEHICLE
              </p>
              <div className="relative">
                <input
                  value={ctx.vehicle ? `${ctx.vehicle.make} ${ctx.vehicle.model} — ${ctx.vehicle.plate}` : ""}
                  readOnly
                  className="w-full border border-[#d1d5dc] rounded-[10px] pl-3 pr-10 py-2.5 text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] bg-[#f9fafb] outline-none"
                  placeholder="Search by plate, make, model, VIN, or customer name…"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d={svgPaths.p107a080} stroke="#99A1AF" strokeWidth="1.33333" />
                    <path d="M14 14L11.1 11.1" stroke="#99A1AF" strokeLinecap="round" strokeWidth="1.33333" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-5">
              {infoFields.map((f) => (
                <div key={f.label}>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-1">
                    {f.label}
                  </p>
                  {f.value ? (
                    <p
                      className={`text-[14px] font-medium leading-5 text-[#101828] ${f.mono ? "font-['JetBrains_Mono:Medium',sans-serif]" : "font-['Inter:Medium',sans-serif]"}`}
                    >
                      {f.value}
                    </p>
                  ) : (
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#d1d5dc]">—</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes (before Required/Completed Work) */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f3f4f6]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p2ab43940} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939]">Notes</span>
            <div className="flex-1 flex justify-end">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#d1d5dc]">
                Additional instructions, special requests…
              </span>
            </div>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-5 min-h-[200px] text-[14px] font-['Inter:Regular',sans-serif] bg-transparent outline-none resize-none text-[#364153] placeholder:text-[#d1d5dc]"
            placeholder="Add notes here..."
          />
        </div>

        {/* Required Work / Completed Work */}
        <div className="grid grid-cols-2 gap-4">
          {/* Required Work */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#f3f4f6]">
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939]">Required Work</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]" dir="auto">إلي في العربية</p>
              </div>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#d1d5dc]">Write freely</span>
            </div>
            <div className="relative" style={{ minHeight: 344 }}>
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-20"
                src={imgCanvas}
              />
              <textarea
                value={requiredWork}
                onChange={(e) => setRequiredWork(e.target.value)}
                className="absolute inset-0 w-full h-full p-4 text-[14px] font-['Inter:Regular',sans-serif] bg-transparent outline-none resize-none text-[#364153] placeholder:text-[#d1d5dc]"
                placeholder="Write customer complaints here..."
              />
            </div>
          </div>

          {/* Completed Work */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#f3f4f6]">
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939]">Completed Work</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]" dir="auto">إلي تم تنفيذه</p>
              </div>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#d1d5dc]">Write freely</span>
            </div>
            <div className="relative" style={{ minHeight: 344 }}>
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-20"
                src={imgCanvas}
              />
              <textarea
                value={completedWork}
                onChange={(e) => setCompletedWork(e.target.value)}
                className="absolute inset-0 w-full h-full p-4 text-[14px] font-['Inter:Regular',sans-serif] bg-transparent outline-none resize-none text-[#364153] placeholder:text-[#d1d5dc]"
                placeholder="Write required work and tasks to be performed..."
              />
            </div>
          </div>
        </div>

        {/* Notes (after Required/Completed Work) */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f3f4f6]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p2ab43940} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939]">Notes</span>
            <div className="flex-1 flex justify-end">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#d1d5dc]">
                Additional instructions, special requests…
              </span>
            </div>
          </div>
          <textarea
            value={notes2}
            onChange={(e) => setNotes2(e.target.value)}
            className="w-full p-5 min-h-[100px] text-[14px] font-['Inter:Regular',sans-serif] bg-transparent outline-none resize-none text-[#364153] placeholder:text-[#d1d5dc]"
            placeholder="Add notes here..."
          />
        </div>

        {/* Engineer / Technicians */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-[#e5e7eb] rounded-xl">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f3f4f6]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d={svgPaths.p38e26100} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939]">Engineer</span>
            </div>
            <div className="px-5 py-4">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{ctx.engineer || "Saied Engineer"}</p>
            </div>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-xl">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f3f4f6]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d={svgPaths.p312d2500} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939]">Technicians</span>
            </div>
            <div className="px-5 py-4">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#99a1af]">No technicians assigned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom action bar */}
      <div className="fixed bottom-0 left-56 right-0 bg-white border-t border-[#e5e7eb] px-6 py-3 flex items-center justify-between z-10">
        <button
          onClick={onCancel}
          className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#4a5565] hover:text-[#364153] transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={ready ? () => onCreateJobOrder({ requiredWork, completedWork, notes: notes + (notes2 ? "\n\n" + notes2 : ""), km }, true) : undefined}
          className={`bg-[#0f2340] px-4 py-2 rounded text-[14px] font-['Inter:Medium',sans-serif] font-medium text-white min-w-[176px] text-center transition-all ${ready ? "hover:bg-[#1a3a5c] active:scale-[0.98] cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
        >
          Create &amp; Print Job Order
        </button>
      </div>
    </div>
  );
}

// ─── Screen: Job Order Created ────────────────────────────────────────────────

function JobOrderCreatedScreen({
  ctx,
  jobOrders,
  onViewJobOrder,
  onBackToDashboard,
}: {
  ctx: FlowCtx;
  jobOrders: typeof SEED_JOS;
  onViewJobOrder: () => void;
  onBackToDashboard: () => void;
}) {
  return (
    <div className="ml-56 mt-14 min-h-screen bg-[#f3f4f6]">
      {/* Success banner */}
      <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-3 flex items-center gap-3">
        <div className="size-6 bg-emerald-600 rounded-full flex items-center justify-center shrink-0">
          <span className="text-white text-[13px] leading-none">✓</span>
        </div>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-emerald-800">
          Job Order <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold">{ctx.joNumber}</span> created successfully for{" "}
          <strong>{ctx.customer?.name}</strong> · {ctx.vehicle?.make} {ctx.vehicle?.model}
        </p>
        <div className="ml-auto flex gap-2">
          <button
            onClick={onViewJobOrder}
            className="bg-emerald-600 text-white px-4 py-1.5 rounded font-['Inter:Medium',sans-serif] font-medium text-[13px] hover:bg-emerald-700 transition-colors"
          >
            View Job Order
          </button>
          <button
            onClick={onBackToDashboard}
            className="border border-emerald-300 text-emerald-700 px-4 py-1.5 rounded font-['Inter:Medium',sans-serif] font-medium text-[13px] hover:bg-emerald-100 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Job Orders list */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#101828]">Job Orders</h2>
          <button
            onClick={onBackToDashboard}
            className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] px-4 py-2 rounded-[8px] hover:bg-[#1a3a5c] transition-colors"
          >
            + New Job Order
          </button>
        </div>
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f3f4f6]">
                {["JOB ORDER", "CUSTOMER", "VEHICLE", "STATUS"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobOrders.map((jo) => (
                <tr
                  key={jo.number}
                  className={`border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors ${jo.number === ctx.joNumber ? "bg-emerald-50/60" : ""}`}
                >
                  <td className="px-5 py-4">
                    <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#101828]">
                      {jo.number}
                    </span>
                    {jo.number === ctx.joNumber && (
                      <span className="ml-2 inline-flex items-center bg-emerald-100 text-emerald-700 text-[10px] font-['Inter:Semi_Bold',sans-serif] font-semibold px-1.5 py-0.5 rounded uppercase tracking-[0.4px]">
                        New
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{jo.customer}</p>
                    <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{jo.phone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{jo.vehicle}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{jo.plate}</p>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={jo.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Modal: Change Vehicle Owner ─────────────────────────────────────────────

function ChangeOwnerModal({
  currentOwner,
  currentPhone,
  onClose,
  onSave,
}: {
  currentOwner: string;
  currentPhone: string;
  onClose: () => void;
  onSave: (name: string, phone: string) => void;
}) {
  const [name, setName] = useState(currentOwner);
  const [phone, setPhone] = useState(currentPhone);
  const valid = name.trim() !== "" && phone.trim() !== "";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl w-[400px] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828]">Change Vehicle Owner</span>
          <button onClick={onClose} className="text-[#6a7282] hover:text-[#364153] text-[20px] leading-none">×</button>
        </div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-5">
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-amber-800">
            Changing the owner will update the current vehicle owner. Previous service history will remain linked to this vehicle.
          </p>
        </div>

        <div className="mb-4">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-1">CURRENT OWNER</p>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] text-[#101828]">{currentOwner}</p>
        </div>

        <div className="space-y-3 mb-5">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase">NEW CUSTOMER</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#e5e7eb] rounded-lg px-4 py-2.5 text-[14px] font-['Inter:Regular',sans-serif] outline-none focus:border-[#0f2340]"
            placeholder="New Name"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-[#e5e7eb] rounded-lg px-4 py-2.5 text-[14px] font-['JetBrains_Mono:Regular',sans-serif] outline-none focus:border-[#0f2340]"
            placeholder="New Phone Number"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => valid && onSave(name.trim(), phone.trim())}
            disabled={!valid}
            className="flex-1 bg-[#0f2340] text-white py-2.5 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] hover:bg-[#1a3a5c] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#d1d5dc] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Vehicle List ─────────────────────────────────────────────────────

type VehicleListEntry = Vehicle & { customerName: string; customerPhone: string };

function VehicleListScreen({
  vehicles,
  onSelectVehicle,
}: {
  vehicles: VehicleListEntry[];
  onSelectVehicle: (v: VehicleListEntry) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = vehicles.filter((v) => {
    const q = search.toLowerCase();
    return (
      !q ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.plate.toLowerCase().includes(q) ||
      v.vin.toLowerCase().includes(q) ||
      v.customerName.toLowerCase().includes(q)
    );
  });

  const cols = ["VEHICLE", "PLATE", "VIN", "CUSTOMER", "COLOR", "KM", "VISITS", "LAST VISIT"];

  return (
    <div className="ml-56 mt-14 min-h-screen bg-[#f3f4f6] p-6">
      {/* Search */}
      <div className="mb-5 max-w-[384px] relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#99a1af]">🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#d1d5dc] rounded-[6px] pl-9 pr-4 py-2 text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] placeholder:text-[#99a1af] outline-none focus:border-[#0f2340]"
          placeholder="Search by plate, make, model…"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {cols.map((h) => (
                <th
                  key={h}
                  className={`bg-[#f9fafb] border-b border-[#f3f4f6] px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#6a7282] tracking-[0.6px] uppercase ${h === "KM" ? "text-right" : h === "VISITS" ? "text-center" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-[#99a1af] text-[13px] font-['Inter:Regular',sans-serif]">
                  No vehicles registered yet
                </td>
              </tr>
            ) : (
              filtered.map((v) => (
              <tr
                key={v.id}
                onClick={() => onSelectVehicle(v)}
                className="border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
              >
                <td className="px-4 py-4">
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{v.make} {v.model}</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{v.year}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[12px] text-[#0f2340] tracking-[0.3px]">{v.plate}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[10px] text-[#6a7282] tracking-[0.25px]">{v.vin}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{v.customerName}</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{v.customerPhone}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{v.color}</p>
                </td>
                <td className="px-4 py-4 text-right">
                  <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{v.km}</p>
                </td>
                <td className="px-4 py-4 text-center">
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{v.visits ?? 0}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{v.lastVisit ?? "—"}</p>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Screen: Vehicle Details ──────────────────────────────────────────────────

function VehicleDetailsScreen({
  vehicle,
  serviceHistory,
  deferredWork,
  onBack,
  onNewJobOrder,
  onChangeOwner,
  ownerName,
  ownerPhone,
  onSelectJo,
  onViewCustomer,
}: {
  vehicle: VehicleListEntry;
  serviceHistory: ServiceHistoryEntry[];
  deferredWork: DeferredItem[];
  onBack: () => void;
  onNewJobOrder: () => void;
  onChangeOwner: () => void;
  ownerName: string;
  ownerPhone: string;
  onSelectJo?: (joNumber: string) => void;
  onViewCustomer?: () => void;
}) {
  const completedCount = serviceHistory.filter((e) => e.status === "Completed").length;

  return (
    <div className="ml-56 mt-14 min-h-screen bg-[#f3f4f6] p-6 pb-10">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[#6a7282] hover:text-[#364153] mb-4 transition-colors"
      >
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px]">← Back</span>
      </button>

      {/* Title row */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-[#101828]">
            {vehicle.make} {vehicle.model}{" "}
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[#99a1af]">{vehicle.year}</span>
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="bg-[#f3f4f6] font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153] tracking-[0.3px] px-2 py-0.5 rounded">{vehicle.plate}</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#99a1af]">{vehicle.color}</span>
          </div>
        </div>
        <button
          onClick={onNewJobOrder}
          className="bg-white border border-[#d1d5dc] text-[#101828] font-['Inter:Medium',sans-serif] font-medium text-[14px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] active:scale-[0.98] transition-all"
        >
          + New Job Order
        </button>
      </div>

      {/* Info cards row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Vehicle Details */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-3">VEHICLE DETAILS</p>
          {[
            { label: "VIN", value: vehicle.vin, mono: true },
            { label: "Color", value: vehicle.color, mono: false },
            { label: "Odometer", value: `${vehicle.km} km`, mono: true },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between py-2 border-b border-[#f3f4f6] last:border-0">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">{f.label}</span>
              <span className={`text-[14px] text-[#101828] ${f.mono ? "font-['JetBrains_Mono:Regular',sans-serif]" : "font-['Inter:Regular',sans-serif]"}`}>{f.value}</span>
            </div>
          ))}
        </div>

        {/* Owner */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase">OWNER</p>
            <button onClick={onChangeOwner} className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#1447e6] hover:underline">Edit</button>
          </div>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828] mb-1">{ownerName}</p>
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#6a7282] mb-3">{ownerPhone}</p>
          <button onClick={onViewCustomer} className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#1447e6] hover:underline">
            View customer profile →
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "TOTAL VISITS", value: String(vehicle.visits ?? 0), icon: "◫", color: "text-[#101828]" },
          { label: "LAST SERVICE", value: vehicle.lastVisit ?? "—", icon: null, color: "text-[#101828]", large: true },
          { label: "COMPLETED ITEMS", value: String(completedCount), icon: "✓", color: "text-emerald-600" },
          { label: "DEFERRED ITEMS", value: String(deferredWork.length), icon: "⏳", color: "text-amber-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase">{s.label}</span>
              {s.icon && <span className="text-[#99a1af] text-[14px]">{s.icon}</span>}
            </div>
            <p className={`font-['Inter:Semi_Bold',sans-serif] font-semibold ${s.large ? "text-[22px]" : "text-[32px]"} ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Service History */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-[#f3f4f6] flex items-center justify-between">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">SERVICE HISTORY</span>
          <button className="bg-white border border-[#d1d5dc] text-[#101828] font-['Inter:Medium',sans-serif] font-medium text-[14px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors">
            Print Job Orders
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f3f4f6]">
              {["JOB ORDER", "DATE", "KM", "INSPECTION", "STATUS"].map((h) => (
                <th key={h} className="px-5 py-3 text-left font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {serviceHistory.map((entry) => (
              <tr
                key={entry.joNumber}
                onClick={() => onSelectJo?.(entry.joNumber)}
                className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
              >
                <td className="px-5 py-3 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] text-[#1447e6] underline-offset-2 hover:underline">{entry.joNumber}</td>
                <td className="px-5 py-3 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{entry.date}</td>
                <td className="px-5 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{entry.km}</td>
                <td className="px-5 py-3 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">{entry.inspection}</td>
                <td className="px-5 py-3"><StatusBadge status={entry.status} /></td>
              </tr>
            ))}
            {serviceHistory.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-6 text-center font-['Inter:Regular',sans-serif] text-[14px] text-[#99a1af]">No service history yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Deferred Work */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f3f4f6] flex items-center gap-3">
            <span className="text-amber-500 text-[16px]">⏳</span>
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">DEFERRED WORK</span>
            <span className="bg-[#fef3c6] text-[#bb4d00] text-[11px] font-['Inter:Semi_Bold',sans-serif] font-semibold px-2 py-0.5 rounded-full">
              {deferredWork.length} items
            </span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">Work recommended in previous visits that has not been completed yet.</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f3f4f6]">
                {["WORK ITEM", "DATE", "JOB ORDER", "KM", "RECOMMENDED BY", "STATUS", "ACTION"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deferredWork.map((item, i) => (
                <tr key={i} className="border-b border-[#f3f4f6] last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{item.item}</p>
                    {item.options && item.options.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {item.options.map((opt) => (
                          <span
                            key={opt.partId}
                            className="inline-flex items-center gap-1 text-[11px] bg-[#f8fafc] border border-[#cbd5e1] rounded px-2 py-0.5 text-[#334155]"
                          >
                            <span className={`text-[9px] font-bold px-1 rounded ${opt.partType === "Original" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>
                              {opt.partType}
                            </span>
                            <strong className="text-[#0f2340]">{opt.brand}</strong> · <span className="font-mono text-[#0f2340] font-semibold">{opt.sellingPrice.toLocaleString()} EGP</span>
                          </span>
                        ))}
                      </div>
                    ) : item.note ? (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] mt-0.5">{item.note}</p>
                    ) : null}
                  </td>
                  <td className="px-5 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{item.date}</td>
                  <td className="px-5 py-3 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[12px] text-[#0f2340]">{item.joNumber}</td>
                  <td className="px-5 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{item.km}</td>
                  <td className="px-5 py-3 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{item.engineer}</td>
                  <td className="px-5 py-3">
                    <span className="bg-[#fffbeb] border border-[#fee685] text-[#bb4d00] text-[12px] font-['Inter:Semi_Bold',sans-serif] font-semibold px-2.5 py-0.5 rounded-full">Deferred</span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => onSelectJo?.(item.joNumber)}
                      className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#1447e6] hover:underline"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

// ─── Screen: Customer List ────────────────────────────────────────────────────

function CustomerListScreen({
  customers,
  vehicleMap,
  onSelectCustomer,
}: {
  customers: Customer[];
  vehicleMap: Record<string, Vehicle[]>;
  onSelectCustomer: (c: Customer) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.phone.includes(q);
  });

  // Customer vehicle plates for display
  const getPlates = (cId: string) =>
    (vehicleMap[cId] ?? []).map((v) => v.plate);

  return (
    <div className="ml-56 mt-14 min-h-screen bg-[#f3f4f6] p-6">
      {/* Search */}
      <div className="mb-5 max-w-[384px] relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#99a1af]">🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#d1d5dc] rounded-[6px] pl-9 pr-4 py-2 text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] placeholder:text-[#99a1af] outline-none focus:border-[#0f2340]"
          placeholder="Search by name or phone…"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {["CUSTOMER", "PHONE", "EMAIL", "ADDRESS", "VEHICLES", "TOTAL VISITS"].map((h) => (
                <th
                  key={h}
                  className={`bg-[#f9fafb] border-b border-[#f3f4f6] px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#6a7282] tracking-[0.6px] uppercase ${h === "TOTAL VISITS" ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#99a1af] text-[13px] font-['Inter:Regular',sans-serif]">
                  No customers found
                </td>
              </tr>
            ) : (
              filtered.map((c) => {
                const plates = getPlates(c.id);
                return (
                <tr
                  key={c.id}
                  onClick={() => onSelectCustomer(c)}
                  className="border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-4">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">{c.name}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{c.phone}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{c.email ?? "—"}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{c.address ?? "—"}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {plates.length > 0
                        ? plates.map((p) => (
                            <span key={p} className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#364153] bg-[#f3f4f6] px-1.5 py-0.5 rounded tracking-[0.3px]">{p}</span>
                          ))
                        : <span className="text-[14px] text-[#99a1af] font-['Inter:Regular',sans-serif]">—</span>
                      }
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">{plates.length || c.vehicleCount || 0}</p>
                  </td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Screen: Customer Details ─────────────────────────────────────────────────

function CustomerDetailsScreen({
  customer,
  vehicles,
  jobOrders,
  joDetails,
  onBack,
  onSelectVehicle,
  onSelectJo,
  onAddNewCar,
}: {
  customer: Customer;
  vehicles: Vehicle[];
  jobOrders: JoListEntry[];
  joDetails: Record<string, JoDetail>;
  onBack: () => void;
  onSelectVehicle: (v: Vehicle) => void;
  onSelectJo: (jo: JoDetail) => void;
  onAddNewCar?: () => void;
}) {
  const customerJos = jobOrders.filter((jo) => jo.customer === customer.name);

  return (
    <div className="ml-56 mt-14 min-h-screen bg-[#f3f4f6] p-6 pb-10">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[#6a7282] hover:text-[#364153] mb-4 transition-colors"
      >
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px]">← Back</span>
      </button>

      {/* Heading */}
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-[#101828] mb-0.5">{customer.name}</h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282] mb-5">{vehicles.length} Vehicles</p>

      {/* Contact card */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 mb-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-1">PHONE</p>
            <p className="font-['JetBrains_Mono:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{customer.phone}</p>
          </div>
          <div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-1">EMAIL</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{customer.email ?? "—"}</p>
          </div>
          <div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-1">ADDRESS</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{customer.address ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* Vehicles section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939] tracking-[0.7px] uppercase">VEHICLES</p>
          <button
            onClick={onAddNewCar}
            className="bg-[#eef3fb] border border-[#0f2340] text-[#0f2340] font-['Inter:Medium',sans-serif] font-medium text-[14px] px-4 py-2 rounded-[4px] hover:bg-[#dce8f5] transition-colors"
          >
            + New Car
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelectVehicle(v)}
              className="bg-white border border-[#e5e7eb] rounded-xl p-5 text-left hover:bg-[#f9fafb] transition-colors"
            >
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828]">{v.make} {v.model}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] mb-2">{v.year}</p>
              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153] bg-[#f3f4f6] px-2 py-0.5 rounded tracking-[0.3px]">{v.plate}</span>
              <div className="flex items-center justify-between mt-3">
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">
                  {v.lastVisit ? `Last visit: ${v.lastVisit}` : "No visits yet"}
                </p>
                {v.visits !== undefined && (
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{v.visits} visits</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Job Orders section */}
      <div>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939] tracking-[0.7px] uppercase mb-3">JOB ORDERS</p>
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f3f4f6]">
                {["JOB ORDER", "DATE", "VEHICLE", "TYPE", "STATUS"].map((h) => (
                  <th key={h} className="bg-[#f9fafb] px-5 py-3 text-left font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerJos.map((jo) => {
                const detail = resolveJoDetail(jo.number, jo, joDetails);
                return (
                  <tr
                    key={jo.number}
                    onClick={() => onSelectJo(detail)}
                    className="border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-4 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] text-[#101828]">{jo.number}</td>
                    <td className="px-5 py-4 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">
                      {detail.date}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{jo.vehicle}</p>
                      <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{jo.plate}</p>
                    </td>
                    <td className="px-5 py-4 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">
                      {detail.type}
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={jo.status} /></td>
                  </tr>
                );
              })}
              {customerJos.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center font-['Inter:Regular',sans-serif] text-[14px] text-[#99a1af]">No job orders yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Standalone Printable Job Order View ──────────────────────────────────────

function PrintJobOrderView({ detail, settings }: { detail: JoDetail; settings?: WorkshopSettings | null }) {
  const companyName = settings?.companyName || "SOS Motor Works";
  const address = settings?.address || "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة";
  const phone = settings?.phone || "+20 100 933 4747";
  const logoUrl = settings?.logoUrl || "/uploads/branding/sos_logo.jpeg";
  const fullLogoUrl = logoUrl ? (logoUrl.startsWith("http") ? logoUrl : `${API_ORIGIN}${logoUrl}`) : null;

  const techs = Array.isArray(detail.technicians) && detail.technicians.length > 0
    ? detail.technicians.join(", ")
    : "No technicians assigned";

  const customerReq = detail.customerRequest?.trim() || detail.notes?.trim() || detail.requiredWork?.trim() || "No specific customer notes recorded.";

  const s: Record<string, React.CSSProperties> = {
    page: {
      width: "210mm",
      minHeight: "297mm",
      margin: "0 auto",
      padding: "10mm 12mm 8mm",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
      boxSizing: "border-box",
      background: "white",
      color: "#101828",
      fontSize: "12px",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      borderBottom: "2.5px solid #0f2340",
      paddingBottom: "6mm",
      marginBottom: "5mm",
    },
    logoBox: {
      width: "48px",
      height: "48px",
      borderRadius: "6px",
      background: "#0f2340",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexShrink: 0,
    },
    sectionLabel: {
      fontSize: "9px",
      fontWeight: 700,
      color: "#6a7282",
      letterSpacing: "0.8px",
      textTransform: "uppercase" as const,
      marginBottom: "4px",
    },
    metaGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "4mm",
      marginBottom: "5mm",
    },
    metaCard: {
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      padding: "3.5mm 4.5mm",
    },
  };

  return (
    <div style={s.page} className="print-job-order-page">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={s.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {fullLogoUrl ? (
            <div style={s.logoBox}>
              <img src={fullLogoUrl} alt={companyName} crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          ) : (
            <div style={s.logoBox}>
              <span style={{ color: "white", fontWeight: 700, fontSize: "16px" }}>SOS</span>
            </div>
          )}
          <div>
            <div style={{ fontWeight: 700, fontSize: "20px", color: "#0f2340", lineHeight: "1.2" }}>{companyName}</div>
            {phone && <div style={{ fontSize: "11px", color: "#364153", marginTop: "2px" }}>{phone}</div>}
            {address && <div style={{ fontSize: "10px", color: "#6a7282", marginTop: "2px", maxWidth: "110mm", lineHeight: "1.3" }} dir="rtl">{address}</div>}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#0f2340", lineHeight: "1" }}>JOB ORDER</div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#2563eb", marginTop: "4px" }}>{detail.number}</div>
          <div style={{ fontSize: "11px", color: "#6a7282", marginTop: "2px" }}>Date: {detail.date}</div>
          <div style={{ fontSize: "11px", fontWeight: 600, color: detail.status === "Open" ? "#2563eb" : detail.status === "Complete" ? "#16a34a" : "#6b7280", marginTop: "2px" }}>
            Status: {detail.status}
          </div>
        </div>
      </div>

      {/* ── Metadata Grid ────────────────────────────────────────────── */}
      <div style={s.metaGrid}>
        {/* Customer Details */}
        <div style={s.metaCard}>
          <div style={s.sectionLabel}>Customer Information</div>
          <div style={{ fontWeight: 700, fontSize: "13px", color: "#101828" }}>{detail.customerName}</div>
          <div style={{ fontSize: "11px", color: "#364153", marginTop: "2px" }}>Phone: {detail.customerPhone}</div>
          {detail.customerId && <div style={{ fontSize: "10px", color: "#6a7282", marginTop: "2px" }}>ID: {detail.customerId}</div>}
        </div>

        {/* Vehicle Details */}
        <div style={s.metaCard}>
          <div style={s.sectionLabel}>Vehicle Information</div>
          <div style={{ fontWeight: 700, fontSize: "13px", color: "#101828" }}>{detail.vehicleName || `${detail.vehicleMake || ""} ${detail.vehicleModel || ""}`}</div>
          <div style={{ fontSize: "11px", color: "#364153", marginTop: "2px" }}>
            Plate: <span style={{ fontWeight: 600 }}>{detail.vehiclePlate}</span>
          </div>
          {detail.vehicleVin && <div style={{ fontSize: "10px", color: "#475569", marginTop: "1px" }}>VIN: {detail.vehicleVin}</div>}
          {detail.vehicleKm && <div style={{ fontSize: "10px", color: "#475569", marginTop: "1px" }}>KM: {detail.vehicleKm}</div>}
          {detail.vehicleYear && <div style={{ fontSize: "10px", color: "#475569", marginTop: "1px" }}>Year: {detail.vehicleYear}</div>}
        </div>

        {/* Team Details */}
        <div style={s.metaCard}>
          <div style={s.sectionLabel}>Job Order Team</div>
          <div style={{ fontSize: "11px", color: "#364153" }}>
            <span style={{ fontWeight: 600 }}>Engineer:</span> {detail.engineer || "N/A"}
          </div>
          <div style={{ fontSize: "11px", color: "#364153", marginTop: "3px" }}>
            <span style={{ fontWeight: 600 }}>Technicians:</span>
            <div style={{ color: techs === "No technicians assigned" ? "#64748b" : "#0f2340", fontStyle: techs === "No technicians assigned" ? "italic" : "normal", marginTop: "1px" }}>
              {techs}
            </div>
          </div>
        </div>
      </div>

      {/* ── Customer Request / Notes Section ──────────────────────────── */}
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "4mm 5mm", marginBottom: "5mm" }}>
        <div style={s.sectionLabel}>Customer Request / Initial Notes</div>
        <div style={{ fontSize: "12px", color: "#1e293b", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
          {customerReq}
        </div>
      </div>

      {/* ── Approved / Work Found Items ─────────────────────────────── */}
      {detail.approvedItems && detail.approvedItems.length > 0 && (
        <div style={{ marginBottom: "5mm" }}>
          <div style={{ ...s.sectionLabel, marginBottom: "6px" }}>Approved Work Items</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
            <thead>
              <tr style={{ background: "#0f2340", color: "white" }}>
                <th style={{ padding: "5px 8px", textAlign: "left", fontSize: "9px" }}>#</th>
                <th style={{ padding: "5px 8px", textAlign: "left", fontSize: "9px" }}>Work Item Description</th>
                <th style={{ padding: "5px 8px", textAlign: "left", fontSize: "9px" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {detail.approvedItems.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "5px 8px", color: "#64748b", width: "24px" }}>{idx + 1}</td>
                  <td style={{ padding: "5px 8px", fontWeight: 600, color: "#0f2340" }}>{item.item}</td>
                  <td style={{ padding: "5px 8px", color: "#475569" }}>{item.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Footer / Signatures ──────────────────────────────────────── */}
      <div style={{ marginTop: "auto", paddingTop: "8mm", borderTop: "1px solid #e2e8f0", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10mm", textAlign: "center", fontSize: "10px", color: "#64748b" }}>
        <div>
          <div style={{ borderBottom: "1px solid #cbd5e1", height: "12mm", marginBottom: "3px" }}></div>
          <div>Customer Signature</div>
        </div>
        <div>
          <div style={{ borderBottom: "1px solid #cbd5e1", height: "12mm", marginBottom: "3px" }}></div>
          <div>Engineer Signature ({detail.engineer || "Engineer"})</div>
        </div>
        <div>
          <div style={{ borderBottom: "1px solid #cbd5e1", height: "12mm", marginBottom: "3px" }}></div>
          <div>Workshop Supervisor</div>
        </div>
      </div>
    </div>
  );
}

function PrintJobOrderScreen({
  detail,
  workshopSettings,
  onClose,
}: {
  detail: JoDetail;
  workshopSettings?: WorkshopSettings | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ml-56 mt-14 bg-[#e5e7eb] p-6 min-h-screen print:ml-0 print:mt-0 print:bg-white print:p-0 print:min-h-0">
      <div className="no-print flex items-center justify-between gap-3 mb-5 max-w-[210mm] mx-auto">
        <button
          onClick={onClose}
          className="border border-[#d1d5dc] bg-white text-[#364153] font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
        >
          ← Back to Job Order Details
        </button>
        <button
          onClick={() => window.print()}
          className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#1a3560] transition-colors cursor-pointer shadow-sm flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d={svgPaths.p14db7f80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
          Print / Save PDF
        </button>
      </div>
      <PrintJobOrderView detail={detail} settings={workshopSettings} />
    </div>
  );
}

// ─── Screen: Job Order Details ────────────────────────────────────────────────

function JobOrderDetailsScreen({
  joDetail,
  onBack,
  onViewCustomer,
  role,
  onSaveWorkFound,
  issuedParts = [],
  partsPriceMap = {},
  parts = [],
  onCreateInvoice,
  workshopSettings,
}: {
  joDetail: JoDetail;
  onBack: () => void;
  onViewCustomer?: () => void;
  role?: string;
  onSaveWorkFound?: (items: WorkFoundItem[]) => void;
  issuedParts?: WIssuedPart[];
  partsPriceMap?: Record<string, number>;
  parts?: WPart[];
  onCreateInvoice?: (laborItems: LaborItem[], expenses: AdditionalExpense[]) => void;
  workshopSettings?: WorkshopSettings | null;
}) {
  const isAccountant = role === "accountant";
  const isComplete = joDetail.status === "Complete";
  const isClosed = joDetail.status === "Closed";

  // Print state
  const [showPrintJO, setShowPrintJO] = useState(false);

  if (showPrintJO) {
    return (
      <div className="ml-56 mt-14 bg-[#e5e7eb] p-6 min-h-screen print:ml-0 print:mt-0 print:bg-white print:p-0 print:min-h-0">
        <div className="no-print flex items-center justify-between gap-3 mb-5 max-w-[210mm] mx-auto">
          <button
            onClick={() => setShowPrintJO(false)}
            className="border border-[#d1d5dc] bg-white text-[#364153] font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            ← Back to Job Order Details
          </button>
          <button
            onClick={() => window.print()}
            className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#1a3560] transition-colors cursor-pointer shadow-sm flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d={svgPaths.p14db7f80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
            Print / Save PDF
          </button>
        </div>
        <PrintJobOrderView detail={joDetail} settings={workshopSettings} />
      </div>
    );
  }

  // Copy as Image state
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [copyState, setCopyState] = useState<"idle" | "copying" | "success" | "error">("idle");
  const [showFallbackDownload, setShowFallbackDownload] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState<"work" | "parts">("work");
  const [showQuotationModal, setShowQuotationModal] = useState(false);

  // Accountant editable work-found state (Open jobs)
  const [workItems, setWorkItems] = useState<WorkFoundItem[]>(() =>
    (joDetail.workFoundItems || []).map((item) => ({
      ...item,
      options: item.options || [],
    }))
  );

  // New work item creation state
  const [newRequirement, setNewRequirement] = useState("");
  const [partSearch, setPartSearch] = useState("");
  const [candidateOptions, setCandidateOptions] = useState<PartOption[]>([]);
  const [addingOptionToItemId, setAddingOptionToItemId] = useState<string | null>(null);
  const [inlinePartSearch, setInlinePartSearch] = useState("");

  const [saved, setSaved] = useState(
    (joDetail.workFoundItems?.length ?? 0) > 0 && (joDetail.approvedItems?.length ?? 0) > 0
  );

  // Accountant invoice state (Complete jobs)
  // Backward compat: if existing job has a single laborAmount but no laborItems, seed one item
  const seedLaborItems = (): LaborItem[] => {
    if (joDetail.laborItems && joDetail.laborItems.length > 0) return joDetail.laborItems;
    if (joDetail.laborAmount !== undefined && joDetail.laborAmount > 0) {
      return [{ id: `labor-legacy-${joDetail.number}`, description: "Labor / Workmanship", amount: joDetail.laborAmount.toString() }];
    }
    return [];
  };
  const [laborItems, setLaborItems] = useState<LaborItem[]>(seedLaborItems);
  const [expenses, setExpenses] = useState<AdditionalExpense[]>(joDetail.additionalExpenses ?? []);
  const [invoiceSubmitted, setInvoiceSubmitted] = useState(joDetail.invoiceCreated ?? false);

  const partsTotal = issuedParts.reduce((sum, p) => sum + p.qty * (partsPriceMap[p.partId] ?? 0), 0);
  const laborTotal = laborItems.reduce((sum, l) => { const n = parseFloat(l.amount); return sum + (isNaN(n) || n <= 0 ? 0 : n); }, 0);
  const expensesTotal = expenses.reduce((sum, e) => {
    const n = parseFloat(e.amount);
    return sum + (isNaN(n) || n < 0 ? 0 : n);
  }, 0);
  const grandTotal = partsTotal + laborTotal + expensesTotal;

  function addLaborItem() {
    setLaborItems((prev) => [...prev, { id: `labor-${Date.now()}`, description: "", amount: "" }]);
  }
  function updateLaborItem(id: string, field: "description" | "amount", value: string) {
    setLaborItems((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }
  function removeLaborItem(id: string) {
    setLaborItems((prev) => prev.filter((l) => l.id !== id));
  }

  function addExpense() {
    setExpenses((prev) => [...prev, { id: `exp-${Date.now()}`, description: "", amount: "" }]);
  }
  function updateExpense(id: string, field: "description" | "amount", value: string) {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  }
  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  const approvedCount = workItems.filter((i) => i.approved).length;
  const deferredCount = workItems.length - approvedCount;

  const engineerApprovedItems = (() => {
    if (joDetail.approvedItems && joDetail.approvedItems.length > 0) {
      return joDetail.approvedItems;
    }
    return (joDetail.workFoundItems || [])
      .filter((w) => w.approved)
      .map((w) => ({
        item: w.description,
        note: w.selectedPart
          ? `${w.selectedPart.brand} (${w.selectedPart.partType || "Part"}) · ${w.selectedPart.sellingPrice.toLocaleString()} EGP`
          : "",
        selectedPart: w.selectedPart,
      }));
  })();

  const engineerDeferredItems: DeferredWorkItem[] = (() => {
    if (joDetail.deferredItems && joDetail.deferredItems.length > 0) {
      return joDetail.deferredItems.map((d, idx) => {
        if (typeof d === "string") {
          const matchingWf = (joDetail.workFoundItems || []).find((w) => w.description === d);
          return {
            id: matchingWf?.id || `def-${idx}`,
            item: d,
            options: matchingWf?.options || [],
            selectedOptionId: matchingWf?.selectedOptionId,
            selectedPart: matchingWf?.selectedPart,
            status: "Deferred" as const,
          };
        }
        return d;
      });
    }
    return (joDetail.workFoundItems || [])
      .filter((w) => !w.approved)
      .map((w) => ({
        id: w.id,
        item: w.description,
        options: w.options || [],
        selectedOptionId: w.selectedOptionId,
        selectedPart: w.selectedPart,
        status: "Deferred" as const,
      }));
  })();

  // Filter parts for main creation search
  const filteredCatalogParts = parts.filter((p) => {
    const q = partSearch.toLowerCase().trim();
    if (!q) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.number.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.oem && p.oem.toLowerCase().includes(q))
    );
  });

  // Filter parts for inline option search on an existing item
  const filteredInlineParts = parts.filter((p) => {
    const q = inlinePartSearch.toLowerCase().trim();
    if (!q) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.number.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.oem && p.oem.toLowerCase().includes(q))
    );
  });

  function attachCandidateOption(p: WPart) {
    if (candidateOptions.some((o) => o.partId === p.id)) return;
    const pType = p.partType || (p.oem || p.number.toUpperCase().includes("OEM") ? "Original" : "After Market");
    setCandidateOptions((prev) => [
      ...prev,
      {
        partId: p.id,
        partName: p.name,
        partNumber: p.number,
        brand: p.brand || "Standard",
        partType: pType,
        sellingPrice: p.sellingPrice,
        availableQty: p.currentQty,
      },
    ]);
  }

  function removeCandidateOption(partId: string) {
    setCandidateOptions((prev) => prev.filter((o) => o.partId !== partId));
  }

  function handleAddWorkItem() {
    const desc = newRequirement.trim();
    if (!desc) return;

    // Pick first candidate option as default selected if options exist
    const initialOpt = candidateOptions[0];
    const newItem: WorkFoundItem = {
      id: `wf-${Date.now()}`,
      description: desc,
      options: candidateOptions,
      selectedOptionId: initialOpt ? initialOpt.partId : undefined,
      selectedPart: initialOpt
        ? {
            partId: initialOpt.partId,
            partName: initialOpt.partName,
            partNumber: initialOpt.partNumber,
            brand: initialOpt.brand,
            partType: initialOpt.partType,
            sellingPrice: initialOpt.sellingPrice,
            qty: 1,
          }
        : undefined,
      approved: true, // Default to approved; customer/accountant can toggle
    };

    setWorkItems((prev) => [...prev, newItem]);
    setNewRequirement("");
    setPartSearch("");
    setCandidateOptions([]);
    setSaved(false);
  }

  function handleSelectOption(itemId: string, opt: PartOption) {
    setWorkItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        return {
          ...item,
          selectedOptionId: opt.partId,
          selectedPart: {
            partId: opt.partId,
            partName: opt.partName,
            partNumber: opt.partNumber,
            brand: opt.brand,
            partType: opt.partType,
            sellingPrice: opt.sellingPrice,
            qty: item.selectedPart?.qty || 1,
          },
        };
      })
    );
    setSaved(false);
  }

  function updateItemQty(itemId: string, qty: number) {
    setWorkItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId || !item.selectedPart) return item;
        return {
          ...item,
          selectedPart: {
            ...item.selectedPart,
            qty: Math.max(1, qty),
          },
        };
      })
    );
    setSaved(false);
  }

  function setItemDecision(itemId: string, approved: boolean) {
    setWorkItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, approved } : item))
    );
    setSaved(false);
  }

  function deleteWorkItem(itemId: string) {
    setWorkItems((prev) => prev.filter((item) => item.id !== itemId));
    setSaved(false);
  }

  function attachInlineOption(itemId: string, p: WPart) {
    const pType = p.partType || (p.oem || p.number.toUpperCase().includes("OEM") ? "Original" : "After Market");
    const newOpt: PartOption = {
      partId: p.id,
      partName: p.name,
      partNumber: p.number,
      brand: p.brand || "Standard",
      partType: pType,
      sellingPrice: p.sellingPrice,
      availableQty: p.currentQty,
    };
    setWorkItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const exists = (item.options || []).some((o) => o.partId === p.id);
        if (exists) return item;
        const updatedOptions = [...(item.options || []), newOpt];
        return {
          ...item,
          options: updatedOptions,
          // If no option selected yet, select this one
          selectedOptionId: item.selectedOptionId || newOpt.partId,
          selectedPart:
            item.selectedPart || {
              partId: newOpt.partId,
              partName: newOpt.partName,
              partNumber: newOpt.partNumber,
              brand: newOpt.brand,
              partType: newOpt.partType,
              sellingPrice: newOpt.sellingPrice,
              qty: 1,
            },
        };
      })
    );
    setAddingOptionToItemId(null);
    setInlinePartSearch("");
    setSaved(false);
  }

  function handleSaveDecision() {
    if (onSaveWorkFound) onSaveWorkFound(workItems);
    setSaved(true);
  }

  return (
    <div className={`${role === "accountant" || role === "owner" || role === "warehouse" ? "ml-[168px]" : "ml-56"} mt-14 min-h-screen bg-[#f3f4f6] p-6 pb-16`}>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[#6a7282] hover:text-[#364153] mb-4 transition-colors"
      >
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px]">← Back</span>
      </button>

      {/* JO heading */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[16px] text-[#0f2340] tracking-[0.3px]">{joDetail.number}</span>
          <StatusBadge status={joDetail.status} />
          <span className="bg-[#f9fafb] border border-[#e5e7eb] font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#4a5565] px-2 py-0.5 rounded">{joDetail.type}</span>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">{joDetail.date}</p>
      </div>

      {/* Customer + Vehicle cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Customer */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">CUSTOMER</p>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828] mb-1">{joDetail.customerName}</p>
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#6a7282] mb-2">{joDetail.customerPhone}</p>
          <button onClick={onViewCustomer} className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#254e87] hover:underline">View profile →</button>
        </div>

        {/* Vehicle */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">VEHICLE</p>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828] mb-1">{joDetail.vehicleName}</p>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#4a5565] bg-[#f3f4f6] px-1.5 py-0.5 rounded tracking-[0.3px]">{joDetail.vehiclePlate}</span>
            <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{joDetail.vehicleKm}</span>
          </div>
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[10px] text-[#99a1af] tracking-[0.25px] mb-2">{joDetail.vehicleVin}</p>
          <button className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#254e87] hover:underline">View profile →</button>
        </div>
      </div>

      {/* Job Team */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 mb-4">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-3">JOB TEAM</p>
        <div className="flex items-start gap-8">
          <div>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] mb-1">Engineer</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828]">{joDetail.engineer}</p>
          </div>
          {joDetail.technicians.length > 0 && (
            <div>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] mb-1">Technicians</p>
              <div className="flex items-center gap-2">
                {joDetail.technicians.map((t) => (
                  <span key={t} className="font-['Inter:Medium',sans-serif] font-medium text-[15px] text-[#101828]">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Card */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
        {/* Interactive Tabs */}
        <div className="border-b border-[#e5e7eb] flex bg-[#fafbfc]">
          <button
            type="button"
            onClick={() => setActiveTab("work")}
            className={`px-6 py-3.5 font-['Inter:Medium',sans-serif] text-[14px] transition-all flex items-center gap-2 ${
              activeTab === "work"
                ? "text-[#0f2340] border-b-2 border-[#0f2340] bg-white font-semibold shadow-sm"
                : "text-[#6a7282] hover:text-[#101828] hover:bg-[#f1f5f9]"
            }`}
          >
            <span>📋</span> Work Summary & Requirements
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("parts")}
            className={`px-6 py-3.5 font-['Inter:Medium',sans-serif] text-[14px] transition-all flex items-center gap-2 ${
              activeTab === "parts"
                ? "text-[#0f2340] border-b-2 border-[#0f2340] bg-white font-semibold shadow-sm"
                : "text-[#6a7282] hover:text-[#101828] hover:bg-[#f1f5f9]"
            }`}
          >
            <span>📦</span> Parts Used
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                issuedParts.length > 0
                  ? "bg-[#008236] text-white"
                  : "bg-[#e5e7eb] text-[#6a7282]"
              }`}
            >
              {issuedParts.reduce((sum, p) => sum + p.qty, 0)}
            </span>
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* ══════════════ TAB 1: WORK SUMMARY ══════════════ */}
          {activeTab === "work" && (
            <>
              {/* Customer Request */}
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">Customer Request</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[15px] text-[#101828] bg-[#f9fafb] border border-[#e5e7eb] rounded-lg px-4 py-3">
                  {joDetail.customerRequest || "—"}
                </p>
              </div>

              {/* ── ACCOUNTANT: Complete Job — Invoice Review ── */}
              {isAccountant && (isComplete || isClosed) && (
                <div className="space-y-6">
                  {/* Approved Work (read-only) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#008236] tracking-[0.6px] uppercase">
                        Approved Work (Customer Approved)
                      </p>
                      <span className="text-[12px] text-[#008236] font-medium">✓ {joDetail.approvedItems.length} approved</span>
                    </div>
                    {joDetail.approvedItems.length === 0 ? (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#99a1af] px-1">No approved work recorded.</p>
                    ) : (
                      <div className="border border-[#bbf7d0] bg-[#f0fdf4]/50 rounded-lg overflow-hidden divide-y divide-[#bbf7d0]">
                        {joDetail.approvedItems.map((item, i) => (
                          <div key={i} className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full border-2 border-[#008236] bg-[#008236] flex items-center justify-center shrink-0">
                                <span className="text-white text-[10px]">✓</span>
                              </div>
                              <div>
                                <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{item.item}</p>
                                {item.selectedPart && (
                                  <p className="text-[12px] text-[#15803d] mt-0.5">
                                    Option: <span className="font-semibold">{item.selectedPart.brand} ({item.selectedPart.partType})</span> · {item.selectedPart.sellingPrice.toLocaleString()} EGP [Qty: {item.selectedPart.qty}]
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="text-[11px] font-semibold text-[#008236] bg-white border border-[#bbf7d0] px-2 py-0.5 rounded">
                              Ready / Performed
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Deferred Work (reference) */}
                  {joDetail.deferredItems.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-amber-700 tracking-[0.6px] uppercase">
                          Deferred Work (Excluded from Invoice)
                        </p>
                        <span className="text-[12px] text-amber-700 font-medium">⟳ {joDetail.deferredItems.length} postponed</span>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden divide-y divide-amber-100">
                        {joDetail.deferredItems.map((item, i) => (
                          <div key={i} className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full border-2 border-amber-500 bg-amber-100 flex items-center justify-center shrink-0">
                                <span className="text-amber-700 text-[10px]">⟳</span>
                              </div>
                              <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{typeof item === "string" ? item : (item as any).item}</span>
                            </div>
                            <span className="text-[11px] font-semibold text-amber-700 bg-white border border-amber-200 px-2 py-0.5 rounded">
                              Not Billed
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actual Parts Used Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#0f2340] tracking-[0.6px] uppercase">
                        Parts Used (Actual Warehouse Issued Parts)
                      </p>
                      <span className="text-[12px] text-[#6a7282]">Populated strictly by Warehouse</span>
                    </div>
                    {issuedParts.length === 0 ? (
                      <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-4 text-center">
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#99a1af]">
                          No physical parts have been issued to this job order by the Warehouse.
                        </p>
                      </div>
                    ) : (
                      <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                        <div className="bg-[#f9fafb] border-b border-[#e5e7eb] grid grid-cols-[1fr_auto_auto_auto] px-4 py-2 gap-4">
                          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part</span>
                          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase w-12 text-right">Qty</span>
                          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase w-24 text-right">Unit Price</span>
                          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase w-24 text-right">Total</span>
                        </div>
                        {issuedParts.map((p) => {
                          const unitPrice = partsPriceMap[p.partId] ?? 0;
                          const lineTotal = p.qty * unitPrice;
                          return (
                            <div key={p.partId} className="grid grid-cols-[1fr_auto_auto_auto] px-4 py-3 gap-4 border-b border-[#f3f4f6] last:border-0 items-center">
                              <div>
                                <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{p.partName}</p>
                                <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">{p.partNumber}</p>
                              </div>
                              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153] w-12 text-right">{p.qty}</span>
                              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153] w-24 text-right">{unitPrice.toLocaleString()} EGP</span>
                              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#101828] font-semibold w-24 text-right">{lineTotal.toLocaleString()} EGP</span>
                            </div>
                          );
                        })}
                        <div className="grid grid-cols-[1fr_auto] px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
                          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#364153]">Actual Parts Total</span>
                          <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#101828] font-semibold">{partsTotal.toLocaleString()} EGP</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Labor & Expenses & Invoice Creation */}
                  {!isClosed && !invoiceSubmitted ? (
                    <div className="space-y-4 pt-2">
                      {/* Labor - Multi-Item */}
                      <div className="border border-[#e5e7eb] rounded-lg overflow-hidden bg-white">
                        <div className="px-5 py-4 border-b border-[#f3f4f6]">
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828]">Labor / Workmanship</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">Add individual labor / service items. The total is calculated automatically.</p>
                        </div>
                        <div className="px-5 py-4 space-y-3">
                          {laborItems.length === 0 ? (
                            <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#99a1af]">No labor items added yet.</p>
                          ) : (
                            <div className="space-y-2">
                              <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-1">
                                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Labor Description</span>
                                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase w-28 text-right">Amount (EGP)</span>
                                <span className="w-8" />
                              </div>
                              {laborItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                                  <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => updateLaborItem(item.id, "description", e.target.value)}
                                    placeholder="مثال: مصنعية فك اكصدام"
                                    className="h-9 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] text-[13px] text-[#101828] outline-none focus:border-[#0f2340] transition-colors placeholder:text-[#99a1af]"
                                    dir="rtl"
                                  />
                                  <input
                                    type="number"
                                    min="0.01"
                                    step="any"
                                    value={item.amount}
                                    onChange={(e) => updateLaborItem(item.id, "amount", e.target.value)}
                                    placeholder="0"
                                    className="h-9 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] text-[13px] text-[#101828] outline-none focus:border-[#0f2340] transition-colors w-28 text-right"
                                  />
                                  <button
                                    onClick={() => removeLaborItem(item.id)}
                                    className="w-8 h-8 flex items-center justify-center text-[#d1d5dc] hover:text-[#e7000b] transition-colors text-[18px] leading-none"
                                    title="Remove"
                                  >×</button>
                                </div>
                              ))}
                              {laborTotal > 0 && (
                                <div className="flex justify-between pt-1 border-t border-[#f3f4f6] mt-2">
                                  <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#364153]">Total Labor / Workmanship</span>
                                  <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{laborTotal.toLocaleString()} EGP</span>
                                </div>
                              )}
                            </div>
                          )}
                          <button
                            onClick={addLaborItem}
                            className="mt-1 font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#1447e6] hover:underline"
                          >
                            + Add Labor
                          </button>
                        </div>
                      </div>

                      {/* Additional Expenses */}
                      <div className="border border-[#e5e7eb] rounded-lg overflow-hidden bg-white">
                        <div className="px-5 py-4 border-b border-[#f3f4f6]">
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828]">Additional Expenses</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">Add any job-specific external expenses (e.g. Uber, Fuel, delivery, specialized machining).</p>
                        </div>
                        <div className="px-5 py-4 space-y-3">
                          {expenses.length === 0 ? (
                            <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#99a1af]">No additional expenses added yet.</p>
                          ) : (
                            <div className="space-y-2">
                              <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-1">
                                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Description</span>
                                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase w-28 text-right">Amount (EGP)</span>
                                <span className="w-8" />
                              </div>
                              {expenses.map((exp) => (
                                <div key={exp.id} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                                  <input
                                    type="text"
                                    value={exp.description}
                                    onChange={(e) => updateExpense(exp.id, "description", e.target.value)}
                                    placeholder="Expense description…"
                                    className="h-9 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] text-[13px] text-[#101828] outline-none focus:border-[#0f2340] transition-colors placeholder:text-[#99a1af]"
                                  />
                                  <input
                                    type="number"
                                    min="0"
                                    step="10"
                                    value={exp.amount}
                                    onChange={(e) => updateExpense(exp.id, "amount", e.target.value)}
                                    placeholder="0"
                                    className="h-9 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] text-[13px] text-[#101828] outline-none focus:border-[#0f2340] transition-colors w-28 text-right"
                                  />
                                  <button
                                    onClick={() => removeExpense(exp.id)}
                                    className="w-8 h-8 flex items-center justify-center text-[#d1d5dc] hover:text-[#e7000b] transition-colors text-[18px] leading-none"
                                    title="Remove"
                                  >×</button>
                                </div>
                              ))}
                              {expensesTotal > 0 && (
                                <div className="flex justify-between pt-1 border-t border-[#f3f4f6] mt-2">
                                  <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#364153]">Additional Expenses Total</span>
                                  <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{expensesTotal.toLocaleString()} EGP</span>
                                </div>
                              )}
                            </div>
                          )}
                          <button
                            onClick={addExpense}
                            className="mt-1 font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#1447e6] hover:underline"
                          >
                            + Add Expense
                          </button>
                        </div>
                      </div>

                      {/* Invoice Summary */}
                      <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-5 space-y-2.5">
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-3">Invoice Calculation</p>
                        <div className="flex justify-between">
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">Actual Parts Used Total</span>
                          <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{partsTotal.toLocaleString()} EGP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">Labor / Workmanship</span>
                          <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{laborTotal.toLocaleString()} EGP</span>
                        </div>
                        {expensesTotal > 0 && (
                          <div className="flex justify-between">
                            <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">Additional Expenses</span>
                            <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{expensesTotal.toLocaleString()} EGP</span>
                          </div>
                        )}
                        <div className="border-t border-[#e5e7eb] pt-3 flex justify-between items-center">
                          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] text-[#101828]">Grand Total</span>
                          <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-[#0f2340]">{grandTotal.toLocaleString()} EGP</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (onCreateInvoice) onCreateInvoice(laborItems, expenses);
                          setInvoiceSubmitted(true);
                        }}
                        className="w-full py-3 bg-[#0f2340] text-white font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] rounded-lg hover:bg-[#1a3560] transition-colors shadow-md"
                      >
                        Create Invoice & Finalize Job Order
                      </button>
                    </div>
                  ) : (
                    /* Closed or already invoiced */
                    <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[#008236] text-[18px]">✓</span>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#008236]">Invoice Created & Job Closed</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">Actual Parts Used Total</span>
                          <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{partsTotal.toLocaleString()} EGP</span>
                        </div>
                        {/* Labor items detailed view for closed/invoiced jobs */}
                        {(joDetail.laborItems && joDetail.laborItems.length > 0) ? (
                          <div className="space-y-1">
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#6a7282] mb-1">Labor / Workmanship</p>
                            {joDetail.laborItems.map((li) => (
                              <div key={li.id} className="flex justify-between pl-2">
                                <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]" dir="rtl">{li.description}</span>
                                <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{(parseFloat(li.amount)||0).toLocaleString()} EGP</span>
                              </div>
                            ))}
                            <div className="flex justify-between border-t border-[#f3f4f6] pt-1">
                              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#364153]">Total Labor</span>
                              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{joDetail.laborItems.reduce((s,l)=>{const n=parseFloat(l.amount);return s+(isNaN(n)||n<0?0:n);},0).toLocaleString()} EGP</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">Labor / Workmanship</span>
                            <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{(joDetail.laborAmount ?? 0).toLocaleString()} EGP</span>
                          </div>
                        )}
                        {(joDetail.additionalExpenses ?? expenses).length > 0 && (
                          <div className="flex justify-between">
                            <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">Additional Expenses</span>
                            <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">
                              {(joDetail.additionalExpenses ?? expenses).reduce((s, e) => { const n = parseFloat(e.amount); return s + (isNaN(n) || n < 0 ? 0 : n); }, 0).toLocaleString()} EGP
                            </span>
                          </div>
                        )}
                        <div className="border-t border-[#bbf7d0] pt-2 flex justify-between">
                          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">Grand Total</span>
                          <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">
                            {(() => {
                              const savedExpenses = joDetail.additionalExpenses ?? expenses;
                              const savedExpTotal = savedExpenses.reduce((s, e) => { const n = parseFloat(e.amount); return s + (isNaN(n) || n < 0 ? 0 : n); }, 0);
                              const savedLaborTotal = joDetail.laborItems && joDetail.laborItems.length > 0
                                ? joDetail.laborItems.reduce((s,l)=>{const n=parseFloat(l.amount);return s+(isNaN(n)||n<0?0:n);},0)
                                : (joDetail.laborAmount ?? 0);
                              return (partsTotal + savedLaborTotal + savedExpTotal).toLocaleString();
                            })()} EGP
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── ACCOUNTANT: WORK FOUND (Open Job Order Workflow) ── */}
              {isAccountant && !isComplete && !isClosed && (
                <div className="space-y-5">
                  {/* Notice Alert Box */}
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-4 text-[13px] text-[#1e40af] flex items-start gap-3">
                    <span className="text-[18px] leading-none shrink-0 mt-0.5">ℹ️</span>
                    <div>
                      <p className="font-semibold mb-0.5">Inspection Requirements & Part Selection (Work Found)</p>
                      <p className="text-[#1e3a8a] text-[12px] leading-relaxed">
                        Define what the vehicle needs and compare part alternatives (e.g. Original vs After Market).
                        <strong> Selecting part options does NOT deduct inventory, create Stock Out movements, or add parts to the invoice.</strong>
                        Physical parts will be issued strictly by the Warehouse.
                      </p>
                    </div>
                  </div>

                  {/* Header with Counters */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="font-['Inter:Bold',sans-serif] font-bold text-[15px] text-[#0f2340]">
                        WORK FOUND & PART OPTIONS
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282] mt-0.5">
                        Define inspection findings, compare candidate parts, and record customer approval decisions.
                      </p>
                    </div>
                    {workItems.length > 0 && (
                      <div className="flex items-center gap-3 text-[12px] flex-wrap">
                        <button
                          type="button"
                          onClick={() => setShowQuotationModal(true)}
                          className="px-3.5 py-1.5 bg-[#0f2340] text-white rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] flex items-center gap-1.5 shadow-sm hover:bg-[#1a3560] transition-colors"
                          title="Open Customer Quotation view optimized for mobile screenshot"
                        >
                          <span>📱</span> Customer Quotation View
                        </button>
                        <span className="bg-[#f1f5f9] text-[#475569] font-semibold px-2.5 py-1 rounded">
                          {workItems.length} {workItems.length === 1 ? "Item" : "Items"} Found
                        </span>
                        <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-2.5 py-1 rounded">
                          ✓ {approvedCount} Approved
                        </span>
                        <span className="bg-[#fef3c7] text-[#b45309] font-semibold px-2.5 py-1 rounded">
                          ⟳ {deferredCount} Deferred
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Existing Work Items List */}
                  {workItems.length > 0 && (
                    <div className="space-y-4">
                      {workItems.map((item, idx) => (
                        <div
                          key={item.id}
                          className="bg-white border-2 border-[#e2e8f0] rounded-xl p-5 shadow-sm space-y-4 transition-all hover:border-[#cbd5e1]"
                        >
                          {/* Item Top Bar */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-full bg-[#0f2340] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                                {idx + 1}
                              </span>
                              <div>
                                <p className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-[#101828]">
                                  {item.description}
                                </p>
                                <p className="text-[11px] text-[#64748b]">
                                  Requirement / Defect Found
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                  item.approved
                                    ? "bg-[#dcfce7] text-[#15803d]"
                                    : "bg-[#fef3c7] text-[#b45309]"
                                }`}
                              >
                                {item.approved ? "✓ Approved Work" : "⟳ Deferred Work"}
                              </span>
                              <button
                                onClick={() => deleteWorkItem(item.id)}
                                className="w-7 h-7 flex items-center justify-center text-[#94a3b8] hover:text-[#ef4444] rounded-lg hover:bg-red-50 transition-colors text-[18px]"
                                title="Remove Requirement"
                              >
                                ×
                              </button>
                            </div>
                          </div>

                          {/* Options Section */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-[12px] font-semibold text-[#475569] uppercase tracking-wider">
                                Part Options (Compare & Select One Preferred Option):
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setAddingOptionToItemId(addingOptionToItemId === item.id ? null : item.id);
                                  setInlinePartSearch("");
                                }}
                                className="text-[12px] font-medium text-[#1447e6] hover:underline"
                              >
                                {addingOptionToItemId === item.id ? "Cancel" : "+ Add Another Option from Inventory"}
                              </button>
                            </div>

                            {/* Inline search to add another option to this item */}
                            {addingOptionToItemId === item.id && (
                              <div className="p-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg space-y-2 mb-2">
                                <input
                                  value={inlinePartSearch}
                                  onChange={(e) => setInlinePartSearch(e.target.value)}
                                  placeholder="Search inventory for alternate part..."
                                  className="w-full h-8 px-3 text-[12px] border border-[#cbd5e1] rounded bg-white outline-none focus:border-[#0f2340]"
                                  autoFocus
                                />
                                {inlinePartSearch.trim() && (
                                  <div className="max-h-36 overflow-y-auto divide-y divide-[#f1f5f9] border border-[#e2e8f0] rounded bg-white">
                                    {filteredInlineParts.length === 0 ? (
                                      <p className="text-[11px] text-[#94a3b8] p-2 text-center">No matching parts</p>
                                    ) : (
                                      filteredInlineParts.map((p) => {
                                        const pType = p.partType || (p.oem || p.number.toUpperCase().includes("OEM") ? "Original" : "After Market");
                                        return (
                                          <div key={p.id} className="p-2 flex items-center justify-between text-[12px] hover:bg-[#f8fafc]">
                                            <div>
                                              <span className="font-semibold text-[#1e293b]">{p.brand}</span> · {p.name} ({pType}) · <strong className="text-[#0f2340]">{p.sellingPrice.toLocaleString()} EGP</strong>
                                            </div>
                                            <button
                                              type="button"
                                              onClick={() => attachInlineOption(item.id, p)}
                                              className="px-2 py-0.5 bg-[#0f2340] text-white rounded text-[11px] font-medium"
                                            >
                                              Attach
                                            </button>
                                          </div>
                                        );
                                      })
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Multi-option Radio Comparison Cards */}
                            {item.options && item.options.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {item.options.map((opt) => {
                                  const isSelected = item.selectedOptionId === opt.partId;
                                  return (
                                    <div
                                      key={opt.partId}
                                      onClick={() => handleSelectOption(item.id, opt)}
                                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                                        isSelected
                                          ? "border-[#0f2340] bg-[#f0f4ff]/70 shadow-sm"
                                          : "border-[#e5e7eb] bg-[#fafbfc] hover:border-[#94a3b8]"
                                      }`}
                                    >
                                      <div className="flex items-start gap-3">
                                        <input
                                          type="radio"
                                          name={`opt-radio-${item.id}`}
                                          checked={isSelected}
                                          onChange={() => handleSelectOption(item.id, opt)}
                                          className="w-4 h-4 mt-0.5 accent-[#0f2340] cursor-pointer"
                                        />
                                        <div>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span
                                              className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide ${
                                                opt.partType === "Original"
                                                  ? "bg-[#dbeafe] text-[#1e40af]"
                                                  : "bg-[#f3e8ff] text-[#6b21a8]"
                                              }`}
                                            >
                                              {opt.partType || "Part"}
                                            </span>
                                            <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">
                                              {opt.brand}
                                            </span>
                                          </div>
                                          <p className="font-mono text-[11px] text-[#64748b] mt-1">
                                            PN: {opt.partNumber}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">
                                          {opt.sellingPrice.toLocaleString()} EGP
                                        </p>
                                        <span className="text-[11px] text-[#64748b]">Selling Price</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-[12px] text-[#94a3b8] italic p-2 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                                No specific part options attached yet. Click &ldquo;+ Add Another Option from Inventory&rdquo; above.
                              </p>
                            )}
                          </div>

                          {/* Selected Option Feedback & Customer Decision Bar */}
                          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3.5 flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-[12px] font-semibold text-[#475569]">Selected Choice:</span>
                              {item.selectedPart ? (
                                <span className="inline-flex items-center gap-1.5 bg-white border border-[#cbd5e1] px-3 py-1 rounded-lg text-[13px] font-semibold text-[#0f2340]">
                                  <span>●</span> {item.selectedPart.brand} ({item.selectedPart.partType}) — {item.selectedPart.sellingPrice.toLocaleString()} EGP
                                </span>
                              ) : (
                                <span className="text-[12px] text-[#94a3b8] italic">No option selected</span>
                              )}
                              <div className="flex items-center gap-1.5 ml-2">
                                <span className="text-[12px] text-[#64748b]">Qty:</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.selectedPart?.qty ?? 1}
                                  onChange={(e) => updateItemQty(item.id, parseInt(e.target.value) || 1)}
                                  className="w-14 h-7 text-center bg-white border border-[#d1d5dc] rounded font-semibold text-[13px] text-[#0f2340]"
                                />
                              </div>
                            </div>

                            {/* Customer Decision Buttons */}
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-semibold text-[#475569] mr-1">Customer Decision:</span>
                              <button
                                type="button"
                                onClick={() => setItemDecision(item.id, true)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
                                  item.approved
                                    ? "bg-[#008236] text-white shadow-sm ring-2 ring-[#008236]/30"
                                    : "bg-white text-[#008236] border border-[#bbf7d0] hover:bg-[#dcfce7]"
                                }`}
                              >
                                <span>✓</span> Customer Approved
                              </button>
                              <button
                                type="button"
                                onClick={() => setItemDecision(item.id, false)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
                                  !item.approved
                                    ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-600/30"
                                    : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-100"
                                }`}
                              >
                                <span>⟳</span> Postpone / Defer
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Work Item Form */}
                  <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-5 shadow-sm space-y-4">
                    <p className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340] flex items-center gap-2">
                      <span>➕</span> Add New Work Requirement & Search Inventory
                    </p>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                        1. Work / Defect Requirement Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        placeholder="e.g. Front Brake Pads, Engine Oil Filter, Spark Plugs..."
                        className="w-full h-10 px-3 bg-white border border-[#d1d5dc] rounded-lg text-[14px] text-[#1e293b] outline-none focus:border-[#0f2340] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                        2. Search Inventory to Attach Alternative Part Options
                      </label>
                      <div className="relative">
                        <input
                          value={partSearch}
                          onChange={(e) => setPartSearch(e.target.value)}
                          placeholder="Type to search parts by name, brand, OEM, or part number (e.g. Brake, Brembo, Bosch)..."
                          className="w-full h-10 pl-9 pr-4 bg-white border border-[#d1d5dc] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-[#0f2340] transition-colors"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#94a3b8]">🔍</span>
                      </div>

                      {/* Search Dropdown Results */}
                      {partSearch.trim().length > 0 && (
                        <div className="mt-2 border border-[#cbd5e1] rounded-lg bg-white max-h-52 overflow-y-auto divide-y divide-[#f1f5f9] shadow-lg">
                          {filteredCatalogParts.length === 0 ? (
                            <p className="text-[12px] text-[#94a3b8] p-4 text-center">
                              No matching parts found in inventory for &ldquo;{partSearch}&rdquo;.
                            </p>
                          ) : (
                            filteredCatalogParts.map((p) => {
                              const isAlreadyAttached = candidateOptions.some((o) => o.partId === p.id);
                              const pType = p.partType || (p.oem || p.number.toUpperCase().includes("OEM") ? "Original" : "After Market");
                              return (
                                <div key={p.id} className="p-3 flex items-center justify-between hover:bg-[#f8fafc] transition-colors">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                          pType === "Original" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                                        }`}
                                      >
                                        {pType}
                                      </span>
                                      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#1e293b]">
                                        {p.name}
                                      </span>
                                      <span className="text-[13px] font-bold text-[#0f2340]">({p.brand})</span>
                                      <span className="font-mono text-[11px] text-[#64748b]">{p.number}</span>
                                    </div>
                                    <p className="text-[12px] text-[#64748b] mt-0.5">
                                      Selling Price: <strong className="text-[#0f2340]">{p.sellingPrice.toLocaleString()} EGP</strong> · In Warehouse: <strong className={p.currentQty > 0 ? "text-[#008236]" : "text-[#e7000b]"}>{p.currentQty}</strong>
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    disabled={isAlreadyAttached}
                                    onClick={() => attachCandidateOption(p)}
                                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                                      isAlreadyAttached
                                        ? "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
                                        : "bg-[#0f2340] text-white hover:bg-[#1a3560]"
                                    }`}
                                  >
                                    {isAlreadyAttached ? "✓ Option Attached" : "+ Add as Option"}
                                  </button>
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}

                      {/* Candidate options attached before creation */}
                      {candidateOptions.length > 0 && (
                        <div className="mt-3 bg-white border border-[#e2e8f0] rounded-lg p-3 space-y-2">
                          <p className="text-[11px] font-semibold text-[#475569] uppercase tracking-wider">
                            Attached Candidate Options ({candidateOptions.length}):
                          </p>
                          <div className="space-y-1.5">
                            {candidateOptions.map((opt) => (
                              <div
                                key={opt.partId}
                                className="flex items-center justify-between p-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[13px]"
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                      opt.partType === "Original" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                                    }`}
                                  >
                                    {opt.partType}
                                  </span>
                                  <span className="font-semibold text-[#1e293b]">{opt.brand}</span>
                                  <span className="font-mono text-[11px] text-[#64748b]">{opt.partNumber}</span>
                                  <span className="font-bold text-[#0f2340]">{opt.sellingPrice.toLocaleString()} EGP</span>
                                  <span className="text-[11px] text-[#64748b]">(Stock: {opt.availableQty})</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeCandidateOption(opt.partId)}
                                  className="text-[#94a3b8] hover:text-[#ef4444] text-[18px] leading-none px-2"
                                  title="Remove option"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        disabled={!newRequirement.trim()}
                        onClick={handleAddWorkItem}
                        className={`px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
                          newRequirement.trim()
                            ? "bg-[#0f2340] text-white hover:bg-[#1a3560] shadow-sm"
                            : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
                        }`}
                      >
                        + Add Work Item to Job
                      </button>
                    </div>
                  </div>

                  {/* Save Customer Decision Action */}
                  {workItems.length > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={handleSaveDecision}
                        className="w-full py-3 bg-[#0f2340] text-white font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] rounded-lg hover:bg-[#1a3560] transition-colors shadow-md flex items-center justify-center gap-2"
                      >
                        <span>💾</span>
                        {saved ? "✓ Customer Decision Saved to Job Order" : "Save Customer Decision (Approved & Deferred Work)"}
                      </button>
                      <p className="text-[11px] text-center text-[#64748b] mt-1.5">
                        Saving records the customer decision. Inventory will NOT be changed until physical warehouse issue.
                      </p>
                    </div>
                  )}

                  {/* After save: Split summary */}
                  {saved && workItems.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="bg-[#f0fdf4] border-2 border-[#bbf7d0] rounded-xl px-5 py-4">
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#008236] tracking-[0.6px] uppercase mb-1">
                          Approved Work
                        </p>
                        <p className="font-['Inter:Bold',sans-serif] font-bold text-[24px] text-[#008236]">
                          {approvedCount}
                        </p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#15803d] mt-0.5">
                          {approvedCount === 1 ? "item" : "items"} queued for workshop & warehouse
                        </p>
                      </div>
                      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl px-5 py-4">
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-amber-700 tracking-[0.6px] uppercase mb-1">
                          Deferred Work
                        </p>
                        <p className="font-['Inter:Bold',sans-serif] font-bold text-[24px] text-amber-700">
                          {deferredCount}
                        </p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-amber-600 mt-0.5">
                          {deferredCount === 1 ? "item" : "items"} postponed (NOT on invoice)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── ENGINEER / READ-ONLY: Approved & Deferred Work ── */}
              {!isAccountant && (
                <div className="space-y-6">
                  {/* Approved Work */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#008236] tracking-[0.6px] uppercase">
                        Approved Work
                      </p>
                      <span className="text-[12px] text-[#008236] font-semibold">
                        ✓ {engineerApprovedItems.length} approved by customer
                      </span>
                    </div>
                    {engineerApprovedItems.length === 0 ? (
                      <div className="p-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl text-center">
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#99a1af]">No approved work items recorded yet.</p>
                      </div>
                    ) : (
                      <div className="border border-[#bbf7d0] bg-[#f0fdf4]/50 rounded-xl overflow-hidden divide-y divide-[#bbf7d0]">
                        {engineerApprovedItems.map((item, i) => (
                          <div key={i} className="flex items-center justify-between px-5 py-3.5">
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full border-2 border-[#008236] bg-[#008236] flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-white text-[11px]">✓</span>
                              </div>
                              <div>
                                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] text-[#101828]">{item.item}</p>
                                {item.selectedPart ? (
                                  <p className="text-[13px] text-[#15803d] mt-0.5">
                                    Selected: <strong className="font-semibold">{item.selectedPart.brand}</strong> ({item.selectedPart.partType || "Part"}) · <span className="font-mono font-semibold">{item.selectedPart.sellingPrice.toLocaleString()} EGP</span>
                                  </p>
                                ) : item.note ? (
                                  <p className="text-[12px] text-[#15803d] mt-0.5">{item.note}</p>
                                ) : null}
                              </div>
                            </div>
                            <span className="text-[11px] font-bold text-[#008236] bg-white border border-[#bbf7d0] px-3 py-1 rounded-full uppercase tracking-wider">
                              Approved
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Deferred Work */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-amber-700 tracking-[0.6px] uppercase">
                        Deferred Work (Customer Postponed)
                      </p>
                      <span className="text-[12px] text-amber-700 font-semibold">
                        ⟳ {engineerDeferredItems.length} postponed items
                      </span>
                    </div>
                    {engineerDeferredItems.length === 0 ? (
                      <div className="p-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl text-center">
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#99a1af]">No deferred work items recorded.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {engineerDeferredItems.map((def, i) => (
                          <div key={def.id || i} className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-full border-2 border-amber-500 bg-amber-100 flex items-center justify-center shrink-0">
                                  <span className="text-amber-700 text-[10px]">⟳</span>
                                </div>
                                <span className="font-['Inter:Bold',sans-serif] font-bold text-[15px] text-[#101828]">{def.item}</span>
                              </div>
                              <span className="text-[11px] font-bold text-amber-800 bg-white border border-amber-300 px-3 py-1 rounded-full uppercase tracking-wider">
                                Deferred
                              </span>
                            </div>

                            {/* Preserved Candidate Part Options with Prices */}
                            <div className="bg-white border border-amber-200/80 rounded-lg p-3 space-y-2">
                              <p className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">
                                Available Part Options & Selling Prices:
                              </p>
                              {def.options && def.options.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {def.options.map((opt) => (
                                    <div key={opt.partId} className="flex items-center justify-between p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                                      <div>
                                        <div className="flex items-center gap-1.5">
                                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${opt.partType === "Original" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>
                                            {opt.partType}
                                          </span>
                                          <span className="font-bold text-[13px] text-[#0f2340]">{opt.brand}</span>
                                        </div>
                                        <span className="font-mono text-[10px] text-[#64748b]">{opt.partNumber}</span>
                                      </div>
                                      <div className="text-right">
                                        <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">
                                          {opt.sellingPrice.toLocaleString()} EGP
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : def.note ? (
                                <p className="text-[12px] text-[#64748b] italic">{def.note}</p>
                              ) : (
                                <p className="text-[12px] text-[#94a3b8] italic">No part options attached</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ══════════════ TAB 2: PARTS USED (ACTUAL ISSUED PARTS) ══════════════ */}
          {activeTab === "parts" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[15px] text-[#0f2340]">
                    PARTS USED (Actual Warehouse Issued Parts)
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282] mt-0.5">
                    Physical parts issued to this Job Order from warehouse inventory. Populated strictly through the Warehouse issue process.
                  </p>
                </div>
                <span className="bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] text-[12px] font-semibold px-3 py-1 rounded-lg">
                  {issuedParts.length} {issuedParts.length === 1 ? "Part" : "Parts"} Issued
                </span>
              </div>

              {issuedParts.length === 0 ? (
                <div className="bg-[#f8fafc] border-2 border-dashed border-[#cbd5e1] rounded-2xl p-10 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center mx-auto text-[22px] text-[#94a3b8]">
                    📦
                  </div>
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[15px] text-[#334155]">
                    No parts issued to this job order yet
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#64748b] max-w-md mx-auto leading-relaxed">
                    When the Warehouse opens this Job Order and performs &ldquo;Add Part to Job&rdquo; followed by &ldquo;Confirm Issue&rdquo;, the actually issued parts and stock deductions will appear here and be included on the final invoice.
                  </p>
                </div>
              ) : (
                <div className="border border-[#e2e8f0] rounded-xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                        <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">#</th>
                        <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Part</th>
                        <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Part Number</th>
                        <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Qty</th>
                        <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Unit Price</th>
                        <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {issuedParts.map((p, idx) => {
                        const unitPrice = partsPriceMap[p.partId] ?? 0;
                        const lineTotal = p.qty * unitPrice;
                        return (
                          <tr key={p.partId} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="px-4 py-3 text-[13px] text-[#94a3b8] font-mono">{idx + 1}</td>
                            <td className="px-4 py-3 font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#1e293b]">{p.partName}</td>
                            <td className="px-4 py-3 font-mono text-[11px] text-[#64748b]">{p.partNumber}</td>
                            <td className="px-4 py-3 font-mono text-[13px] text-[#334155] text-right font-semibold">{p.qty}</td>
                            <td className="px-4 py-3 font-mono text-[13px] text-[#334155] text-right">{unitPrice.toLocaleString()} EGP</td>
                            <td className="px-4 py-3 font-mono text-[13px] text-[#0f2340] text-right font-bold">{lineTotal.toLocaleString()} EGP</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center px-5 py-4 bg-[#f8fafc] border-t border-[#e2e8f0]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#334155]">Total Actual Parts Issued:</span>
                    <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">{partsTotal.toLocaleString()} EGP</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="border-t border-[#e5e7eb] px-6 py-4 flex items-center gap-3 bg-[#fafbfc]">
          <button
            onClick={() => setShowPrintJO(true)}
            className="bg-white border border-[#d1d5dc] text-[#101828] font-['Inter:Medium',sans-serif] font-medium text-[14px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer"
          >
            Print Job Order
          </button>
          <button
            onClick={onBack}
            className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282] px-4 py-2 hover:text-[#364153] transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      {/* ── CUSTOMER QUOTATION VIEW MODAL (Optimized for Mobile Screenshot / WhatsApp) ── */}
      {showQuotationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#e2e8f0]">
            {/* Modal Header */}
            <div className="bg-[#0f2340] text-white p-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  {workshopSettings?.logoUrl ? (
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 flex items-center justify-center p-1 border border-white/15">
                      <img
                        src={workshopSettings.logoUrl.startsWith("http") ? workshopSettings.logoUrl : `${API_ORIGIN}${workshopSettings.logoUrl}`}
                        alt={workshopSettings.companyName || "Workshop Logo"}
                        crossOrigin="anonymous"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center font-bold text-[14px] flex-shrink-0 border border-white/15">
                      {(workshopSettings?.companyName || "SOS").slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] tracking-wide text-white leading-snug break-words">
                      {workshopSettings?.companyName || "SOS Motor Works"}
                    </h3>
                    <p className="text-[11px] text-white/70 mt-0.5">Customer Maintenance Quotation</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/80">
                  <span className="bg-white/10 px-2 py-0.5 rounded">JO: {joDetail.number}</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">Vehicle: {joDetail.vehicleName} ({joDetail.vehiclePlate})</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">{joDetail.date}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowQuotationModal(false)}
                className="text-white/70 hover:text-white text-[20px] font-bold leading-none p-1 ml-2"
              >
                ✕
              </button>
            </div>

            {/* Quotation Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 bg-[#f8fafc]">
              <div className="bg-white p-3.5 rounded-xl border border-[#e2e8f0] text-[12px] text-[#475569]">
                <p className="font-semibold text-[#0f2340]">Customer: {joDetail.customerName} ({joDetail.customerPhone})</p>
                <p className="text-[11px] text-[#64748b] mt-0.5">Please review the inspection requirements and alternative part options below.</p>
              </div>

              {workItems.length === 0 ? (
                <p className="text-center text-[#94a3b8] py-8 text-[13px]">No work items recorded yet.</p>
              ) : (
                <div className="space-y-3">
                  {workItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#0f2340] text-white flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#101828]">
                            {item.description}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            item.approved
                              ? "bg-[#dcfce7] text-[#15803d]"
                              : "bg-[#fef3c7] text-[#b45309]"
                          }`}
                        >
                          {item.approved ? "Approved" : "Deferred"}
                        </span>
                      </div>

                      {/* Part Options */}
                      <div className="space-y-1.5 pl-7">
                        {item.options && item.options.length > 0 ? (
                          item.options.map((opt) => {
                            const isChosen = item.selectedOptionId === opt.partId;
                            return (
                              <div
                                key={opt.partId}
                                className={`flex items-center justify-between p-2 rounded-lg text-[12px] ${
                                  isChosen
                                    ? "bg-[#eff6ff] border border-[#bfdbfe] font-medium text-[#1e40af]"
                                    : "bg-[#f8fafc] text-[#475569]"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{isChosen ? "●" : "○"}</span>
                                  <span className="font-semibold">{opt.brand}</span>
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/5">
                                    {opt.partType}
                                  </span>
                                </div>
                                <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[#0f2340]">
                                  {opt.sellingPrice.toLocaleString()} EGP
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-[11px] text-[#94a3b8] italic">No part options specified</p>
                        )}
                      </div>

                      {/* Customer Decision Note */}
                      <div className="pl-7 pt-1 text-[11px] flex items-center justify-between border-t border-[#f1f5f9]">
                        <span className="text-[#64748b]">
                          {item.approved && item.selectedPart ? (
                            <span>Selected: <strong>{item.selectedPart.brand} ({item.selectedPart.partType})</strong></span>
                          ) : (
                            <span className="text-amber-700 italic">Postponed by customer</span>
                          )}
                        </span>
                        {item.approved && item.selectedPart && (
                          <span className="font-bold text-[#008236]">
                            {(item.selectedPart.sellingPrice * (item.selectedPart.qty || 1)).toLocaleString()} EGP
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quotation Total */}
              <div className="bg-[#0f2340] text-white rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-white/70 uppercase tracking-wider font-semibold">
                    Approved Items Quotation Total
                  </p>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    * Excludes deferred repairs. Warehouse issuance and labor billed upon completion.
                  </p>
                </div>
                <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px]">
                  {workItems
                    .filter((i) => i.approved && i.selectedPart)
                    .reduce((sum, i) => sum + (i.selectedPart?.sellingPrice || 0) * (i.selectedPart?.qty || 1), 0)
                    .toLocaleString()}{" "}
                  EGP
                </p>
              </div>
            </div>

            {/* ── Modal Footer: Copy as Image ─────────────────────── */}
            <div className="p-4 bg-white border-t border-[#e2e8f0]">
              {/* Status messages */}
              {copyState === "success" && (
                <div className="mb-3 flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-3 py-2 text-[12px] text-[#15803d]">
                  <span>✓</span>
                  <span>Quotation image copied. You can paste it into WhatsApp.</span>
                </div>
              )}
              {copyState === "error" && !showFallbackDownload && (
                <div className="mb-3 flex items-center gap-2 bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2 text-[12px] text-[#dc2626]">
                  <span>⚠</span>
                  <span>Could not copy to clipboard. Try the Download button.</span>
                </div>
              )}
              {showFallbackDownload && fallbackUrl && (
                <div className="mb-3 flex items-center justify-between bg-[#fffbeb] border border-[#fde68a] rounded-lg px-3 py-2 text-[12px] text-[#92400e]">
                  <span>📥 Clipboard not available. Download the image instead.</span>
                  <a
                    href={fallbackUrl}
                    download={`quotation-${joDetail.number}.png`}
                    className="ml-3 px-3 py-1 bg-[#0f2340] text-white rounded font-semibold text-[11px] hover:bg-[#1a3560] transition-colors"
                  >
                    ⬇ Download Image
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Copy as Image */}
                  <button
                    type="button"
                    disabled={copyState === "copying"}
                    onClick={async () => {
                      if (!shareCardRef.current) return;
                      setCopyState("copying");
                      setShowFallbackDownload(false);
                      setFallbackUrl(null);
                      try {
                        const dataUrl = await toPng(shareCardRef.current, {
                          quality: 1,
                          pixelRatio: 2,
                          backgroundColor: "#ffffff",
                          skipFonts: true,
                        });
                        // Try clipboard API
                        const blob = await fetch(dataUrl).then((r) => r.blob());
                        if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
                          await navigator.clipboard.write([
                            new ClipboardItem({ "image/png": blob }),
                          ]);
                          setCopyState("success");
                          setTimeout(() => setCopyState("idle"), 5000);
                        } else {
                          // Fallback: download
                          const url = URL.createObjectURL(blob);
                          setFallbackUrl(url);
                          setShowFallbackDownload(true);
                          setCopyState("error");
                        }
                      } catch (err) {
                        console.error("Copy as image error:", err);
                        setCopyState("error");
                      }
                    }}
                    className={`px-3.5 py-2 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 shadow-sm transition-colors ${
                      copyState === "copying"
                        ? "bg-[#6b7280] text-white cursor-wait"
                        : "bg-[#0f2340] text-white hover:bg-[#1a3560]"
                    }`}
                  >
                    {copyState === "copying" ? (
                      <>⏳ Generating…</>
                    ) : copyState === "success" ? (
                      <>✓ Copied!</>
                    ) : (
                      <>📋 Copy as Image</>
                    )}
                  </button>

                  {/* Native Share (optional) */}
                  {typeof navigator !== "undefined" && "share" in navigator && copyState !== "copying" && (
                    <button
                      type="button"
                      onClick={async () => {
                        if (!shareCardRef.current) return;
                        try {
                          const dataUrl = await toPng(shareCardRef.current, {
                            quality: 1, pixelRatio: 2, backgroundColor: "#ffffff", skipFonts: true,
                          });
                          const blob = await fetch(dataUrl).then((r) => r.blob());
                          const file = new File([blob], `quotation-${joDetail.number}.png`, { type: "image/png" });
                          await navigator.share({ files: [file], title: `Quotation ${joDetail.number}` });
                        } catch (_) { /* user cancelled or not supported */ }
                      }}
                      className="px-3.5 py-2 border border-[#e2e8f0] bg-white text-[#0f2340] rounded-lg text-[12px] font-semibold hover:bg-[#f8fafc] transition-colors"
                    >
                      ↗ Share
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => { setShowQuotationModal(false); setCopyState("idle"); setShowFallbackDownload(false); }}
                  className="px-4 py-2 border border-[#e2e8f0] bg-[#f8fafc] text-[#364153] rounded-lg text-[12px] font-semibold hover:bg-[#f1f5f9] transition-colors"
                >
                  ✕ Close
                </button>
              </div>
            </div>
          </div>

          {/* ── Off-screen CustomerQuotationShareCard (captured for image) ── */}
          <div
            style={{
              position: "fixed",
              left: "-9999px",
              top: "0",
              zIndex: -1,
              pointerEvents: "none",
            }}
          >
            <div
              ref={shareCardRef}
              style={{
                width: "480px",
                background: "#ffffff",
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
                color: "#101828",
                overflow: "hidden",
              }}
            >
              {/* Share Card Header */}
              <div style={{ background: "#0f2340", padding: "20px 20px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  {workshopSettings?.logoUrl ? (
                    <div style={{ width: "52px", height: "52px", borderRadius: "8px", overflow: "hidden", background: "#1a3560", flexShrink: 0 }}>
                      <img
                        src={workshopSettings.logoUrl.startsWith("http") ? workshopSettings.logoUrl : `${API_ORIGIN}${workshopSettings.logoUrl}`}
                        alt={workshopSettings.companyName}
                        crossOrigin="anonymous"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>
                  ) : (
                    <div style={{ width: "52px", height: "52px", borderRadius: "8px", background: "#ffffff20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "white", fontWeight: 700, fontSize: "18px" }}>
                        {(workshopSettings?.companyName || "SOS").slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <div style={{ color: "white", fontWeight: 700, fontSize: "20px", lineHeight: "1.2" }}>
                      {workshopSettings?.companyName || "SOS Motor Works"}
                    </div>
                    <div style={{ color: "#93c5fd", fontSize: "13px", marginTop: "2px" }}>
                      {workshopSettings?.phone || "+20 100 933 4747"}
                    </div>
                  </div>
                </div>
                {workshopSettings?.address && (
                  <div style={{ color: "#94a3b8", fontSize: "12px", lineHeight: "1.4", textAlign: "right" }} dir="rtl">
                    {workshopSettings.address}
                  </div>
                )}
              </div>

              {/* Quotation Title Bar */}
              <div style={{ background: "#1e3a5f", padding: "10px 20px" }}>
                <div style={{ color: "white", fontWeight: 700, fontSize: "13px", textAlign: "center", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  Customer Maintenance Quotation
                </div>
              </div>

              {/* Meta info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", borderBottom: "1px solid #e2e8f0" }}>
                {[
                  ["JO Number", joDetail.number],
                  ["Date", joDetail.date],
                  ["Vehicle", `${joDetail.vehicleName} · ${joDetail.vehiclePlate}`],
                ].map(([label, val]) => (
                  <div key={label} style={{ padding: "10px 14px", borderRight: "1px solid #f1f5f9" }}>
                    <div style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "3px" }}>{label}</div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#1e293b" }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Customer */}
              <div style={{ padding: "10px 14px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.6px" }}>Customer: </span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#101828" }}>{joDetail.customerName}</span>
                <span style={{ fontSize: "12px", color: "#64748b", marginLeft: "8px" }}>{joDetail.customerPhone}</span>
              </div>

              {/* Work Items */}
              <div style={{ padding: "12px 14px" }}>
                {workItems.length === 0 ? (
                  <div style={{ color: "#94a3b8", fontSize: "13px", textAlign: "center", padding: "20px" }}>No work items recorded yet.</div>
                ) : (
                  <div>
                    {workItems.map((item, idx) => (
                      <div key={item.id} style={{ marginBottom: "12px", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
                        {/* Item header */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#f8fafc" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#0f2340", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                              {idx + 1}
                            </div>
                            <span style={{ fontWeight: 700, fontSize: "14px", color: "#101828" }}>{item.description}</span>
                          </div>
                          <span style={{
                            fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.5px",
                            background: item.approved ? "#dcfce7" : "#fef3c7",
                            color: item.approved ? "#15803d" : "#b45309",
                          }}>
                            {item.approved ? "Approved" : "Deferred"}
                          </span>
                        </div>

                        {/* Part options */}
                        {item.options && item.options.length > 0 && (
                          <div style={{ padding: "8px 12px 8px 36px" }}>
                            {item.options.map((opt) => {
                              const isChosen = item.selectedOptionId === opt.partId;
                              return (
                                <div key={opt.partId} style={{
                                  display: "flex", alignItems: "center", justifyContent: "space-between",
                                  padding: "6px 10px", marginBottom: "4px", borderRadius: "6px",
                                  background: isChosen ? "#eff6ff" : "#f8fafc",
                                  border: isChosen ? "1px solid #bfdbfe" : "1px solid #f1f5f9",
                                }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span style={{ fontSize: "12px", color: isChosen ? "#1d4ed8" : "#94a3b8" }}>{isChosen ? "●" : "○"}</span>
                                    <span style={{ fontWeight: 600, fontSize: "12px", color: isChosen ? "#1e40af" : "#475569" }}>{opt.brand}</span>
                                    <span style={{ fontSize: "10px", background: "#f1f5f9", color: "#64748b", padding: "1px 5px", borderRadius: "3px" }}>{opt.partType}</span>
                                  </div>
                                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f2340" }}>{opt.sellingPrice.toLocaleString()} EGP</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Decision */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 12px", borderTop: "1px solid #f1f5f9", background: "#fafafa" }}>
                          <span style={{ fontSize: "11px", color: "#64748b" }}>
                            {item.approved && item.selectedPart ? (
                              <>Selected: <strong>{item.selectedPart.brand} ({item.selectedPart.partType})</strong></>
                            ) : (
                              <span style={{ color: "#b45309", fontStyle: "italic" }}>Postponed by customer</span>
                            )}
                          </span>
                          {item.approved && item.selectedPart && (
                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#008236" }}>
                              {(item.selectedPart.sellingPrice * (item.selectedPart.qty || 1)).toLocaleString()} EGP
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "#0f2340" }}>
                <div>
                  <div style={{ fontSize: "10px", color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>Approved Items Quotation Total</div>
                  <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>* Excludes deferred repairs</div>
                </div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "white" }}>
                  {workItems
                    .filter((i) => i.approved && i.selectedPart)
                    .reduce((sum, i) => sum + (i.selectedPart?.sellingPrice || 0) * (i.selectedPart?.qty || 1), 0)
                    .toLocaleString()}{" "}EGP
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: "10px 18px", background: "#f8fafc", textAlign: "center", borderTop: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                  Thank you for your business · {workshopSettings?.companyName || "SOS Motor Works"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Screen: Job Orders List ──────────────────────────────────────────────────

function JobOrdersListScreen({
  jobOrders,
  joDetails,
  onSelectJo,
  onNewJobOrder,
}: {
  jobOrders: typeof SEED_JOS;
  joDetails: Record<string, JoDetail>;
  onSelectJo: (jo: JoDetail) => void;
  onNewJobOrder: () => void;
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc">("date-desc");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", ...Array.from(new Set(jobOrders.map((jo) => jo.status)))];

  const filtered = jobOrders
    .filter((jo) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        jo.number.toLowerCase().includes(q) ||
        jo.customer.toLowerCase().includes(q) ||
        jo.vehicle.toLowerCase().includes(q) ||
        jo.plate.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || jo.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const da = joDetails[a.number]?.date ?? "";
      const db = joDetails[b.number]?.date ?? "";
      return sortBy === "date-desc" ? db.localeCompare(da) : da.localeCompare(db);
    });

  return (
    <div className="ml-56 mt-14 min-h-screen bg-[#f3f4f6] p-6">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-[384px] relative shrink-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#99a1af]">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#d1d5dc] rounded-[6px] pl-9 pr-4 py-2 text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] placeholder:text-[#99a1af] outline-none focus:border-[#0f2340]"
            placeholder="Search by number, customer, vehicle…"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date-desc" | "date-asc")}
          className="bg-white border border-[#e5e7eb] rounded-[8px] h-[40px] px-4 text-[14px] font-['Inter:Regular',sans-serif] text-[#111827] outline-none cursor-pointer appearance-none pr-8"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23111827' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
        >
          <option value="date-desc">Sort by date</option>
          <option value="date-asc">Date (oldest)</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-[#e5e7eb] rounded-[8px] h-[40px] px-4 text-[14px] font-['Inter:Regular',sans-serif] text-[#111827] outline-none cursor-pointer appearance-none pr-8"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23111827' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
        >
          {statuses.map((s) => <option key={s} value={s}>{s === "All" ? "Status" : s}</option>)}
        </select>
        <div className="flex-1" />
        <button
          onClick={onNewJobOrder}
          className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] px-4 py-2 rounded-[8px] hover:bg-[#1a3a5c] transition-colors shrink-0"
        >
          + New Job Order
        </button>
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f3f4f6]">
              {["JOB ORDER", "DATE", "CUSTOMER", "VEHICLE", "STATUS"].map((h) => (
                <th key={h} className="bg-[#f9fafb] px-5 py-3 text-left font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((jo) => {
              const detail = resolveJoDetail(jo.number, jo, joDetails);
              return (
                <tr
                  key={jo.number}
                  onClick={() => onSelectJo(detail)}
                  className="border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
                >
                  <td className="px-5 py-4 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] text-[#0f2340] tracking-[0.3px]">{jo.number}</td>
                  <td className="px-5 py-4 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{detail.date}</td>
                  <td className="px-5 py-4">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{jo.customer}</p>
                    <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{jo.phone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{jo.vehicle}</p>
                    <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{jo.plate}</p>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={jo.status} /></td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center font-['Inter:Regular',sans-serif] text-[14px] text-[#99a1af]">No job orders found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Warehouse: Sidebar ──────────────────────────────────────────────────────

const W_NAV = [
  { id: "warehouse-dashboard",   symbol: "⊞", label: "Dashboard" },
  { id: "warehouse-jobs",        symbol: "◫", label: "Open Job Orders" },
  { id: "warehouse-parts",       symbol: "▤", label: "Parts" },
  { id: "warehouse-stock-count", symbol: "⊟", label: "Stock Update" },
  { id: "warehouse-movements",   symbol: "↕", label: "Movements" },
  { id: "warehouse-suppliers",   symbol: "🚚", label: "Suppliers" },
];

function WarehouseSidebar({
  active,
  onNav,
  onSignOut,
  workshopSettings,
  authUser,
}: {
  active: string;
  onNav: (id: string) => void;
  onSignOut: () => void;
  workshopSettings?: WorkshopSettings;
  authUser?: { name: string; email: string; role?: Role } | null;
}) {
  const companyName = workshopSettings?.companyName || "SOS Motor Works";
  const logoUrl = workshopSettings?.logoUrl || "/uploads/branding/sos_logo.jpeg";
  const fullLogoUrl = logoUrl.startsWith("http") ? logoUrl : `${API_ORIGIN}${logoUrl}`;

  const userName = authUser?.name || "Warehouse Keeper";
  const initials = getUserInitials(userName);

  return (
    <div data-sidebar="true" className="no-print fixed left-0 top-0 h-full w-[168px] bg-[#060f1e] flex flex-col z-20 select-none border-r border-white/10">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10 shrink-0">
        <div className="w-7 h-7 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-0.5 border border-white/15 shrink-0">
          <img
            src={fullLogoUrl}
            alt={companyName}
            crossOrigin="anonymous"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${API_ORIGIN}/uploads/branding/sos_logo.jpeg`;
            }}
          />
        </div>
        <div className="min-w-0 flex flex-col">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-white leading-[14px] truncate">{companyName}</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] text-white/40 tracking-[0.5px] uppercase leading-[12px]">Warehouse</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 py-2 overflow-y-auto">
        {W_NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors relative ${isActive ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <span className={`text-[12px] w-4 text-center ${isActive ? "text-white opacity-80" : "text-white/50 opacity-80"}`}>{item.symbol}</span>
              <span className={`font-['Inter:${isActive ? "Medium" : "Regular"}',sans-serif] font-${isActive ? "medium" : "normal"} text-[14px] leading-[20px] ${isActive ? "text-white" : "text-white/50"}`}>{item.label}</span>
              {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-white/60" />}
            </button>
          );
        })}
      </div>

      {/* User + Sign Out */}
      <div className="px-4 py-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
            <span>{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-white truncate leading-[14px]">{userName}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] text-white/40 tracking-[0.5px] uppercase leading-[12px]">Warehouse</p>
          </div>
        </div>
        <button onClick={onSignOut} className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-white/40 hover:text-white/70 transition-colors">
          → Sign out
        </button>
      </div>
    </div>
  );
}

// ─── Warehouse: Header ────────────────────────────────────────────────────────

function WarehouseHeader({ title, authUser }: { title: string; authUser?: { name: string; email: string; role?: Role } | null }) {
  const userName = authUser?.name || "Warehouse Keeper";
  const initials = getUserInitials(userName);

  return (
    <div className="fixed left-[168px] right-0 top-0 h-[56px] bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6 z-10">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#111827] leading-[28px]">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="text-[20px] text-[#6a7282]">🔔</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-bold text-white">1</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-full py-1 px-3">
          <div className="size-6 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="text-right">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#111827] leading-[14px]">{userName}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] text-[#6a7282] tracking-[0.5px] uppercase leading-[12px]">Warehouse</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Warehouse: Stock badge ───────────────────────────────────────────────────

function WStockBadge({ status }: { status: "In Stock" | "Low Stock" | "Out of Stock" }) {
  if (status === "In Stock") return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-['Inter:Semi_Bold',sans-serif] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">In Stock</span>;
  if (status === "Low Stock") return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-['Inter:Semi_Bold',sans-serif] font-semibold bg-amber-50 border border-amber-200 text-amber-700">Low Stock</span>;
  return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-['Inter:Semi_Bold',sans-serif] font-semibold bg-red-50 border border-red-200 text-red-600">Out of Stock</span>;
}

function WTypeBadge({ type }: { type: "Issue" | "Stock In" }) {
  if (type === "Issue") return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[12px] font-['Inter:Semi_Bold',sans-serif] font-semibold bg-[#fef2f2] text-[#c10007]">↑ Issue</span>
  );
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[12px] font-['Inter:Semi_Bold',sans-serif] font-semibold bg-[#f0fdf4] text-[#008236]">↓ Stock In</span>
  );
}

// ─── Warehouse: Dashboard ────────────────────────────────────────────────────

function WarehouseDashboardScreen({
  parts, movements, jobs, onOpenJob, onViewAllParts, onViewAllMovements,
}: {
  parts: WPart[];
  movements: WMovement[];
  jobs: WJob[];
  onOpenJob: (job: WJob) => void;
  onViewAllParts: () => void;
  onViewAllMovements: () => void;
}) {
  const [dashSearch, setDashSearch] = useState("");
  const outOfStock = parts.filter((p) => p.status === "Out of Stock");
  const lowStock = parts.filter((p) => p.status === "Low Stock");

  const q = dashSearch.toLowerCase();
  const matchedJobs = q
    ? jobs.filter(
        (j) =>
          j.number.toLowerCase().includes(q) ||
          j.customer.toLowerCase().includes(q) ||
          j.vehicle.toLowerCase().includes(q) ||
          j.plate.toLowerCase().includes(q) ||
          j.serviceType.toLowerCase().includes(q)
      )
    : jobs;
  const matchedParts = q
    ? parts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.number.toLowerCase().includes(q)
      )
    : [];
  const showResults = q.length > 0;

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "LOW STOCK", value: lowStock.length.toString(), sub: "Below minimum", valueColor: "#bb4d00", icon: "⚠" },
            { label: "OUT OF STOCK", value: outOfStock.length.toString(), sub: "Immediate action", valueColor: "#e7000b", icon: "!" },
            { label: "PARTS ISSUED TODAY", value: movements.filter((m) => m.type === "Issue").length.toString(), sub: "Items out", valueColor: "#0f2340", icon: "↑" },
            { label: "STOCK IN (RECENT)", value: movements.filter((m) => m.type === "Stock In").length.toString(), sub: "Items received", valueColor: "#008236", icon: "↓" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-[#e5e7eb] rounded-[10px] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#6a7282] tracking-[0.6px] uppercase leading-[16px]">{kpi.label}</p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] leading-[32px] mt-1" style={{ color: kpi.valueColor }}>{kpi.value}</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] leading-[16px] mt-0.5">{kpi.sub}</p>
                </div>
                <span className="text-[20px] opacity-50 text-[#111827]">{kpi.icon}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-6">
          {/* Left — Primary: Open Job Orders (3 cols) */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99a1af]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                value={dashSearch}
                onChange={(e) => setDashSearch(e.target.value)}
                placeholder="Search job order or part..."
                className="w-full h-10 pl-9 pr-4 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none focus:border-[#0f2340] transition-colors"
              />
            </div>

            {/* Search results */}
            {showResults && (
              <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
                <div className="px-5 py-3 bg-[#f9fafb] border-b border-[#f3f4f6]">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Search Results</p>
                </div>
                {matchedJobs.length === 0 && matchedParts.length === 0 && (
                  <p className="px-5 py-4 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#99a1af]">No results found.</p>
                )}
                {matchedJobs.length > 0 && (
                  <>
                    <div className="px-5 py-2 bg-[#f9fafb] border-b border-[#f3f4f6]">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-[#99a1af] tracking-[0.8px] uppercase">Job Orders</p>
                    </div>
                    {matchedJobs.map((j) => (
                      <button
                        key={j.number}
                        onClick={() => { setDashSearch(""); onOpenJob(j); }}
                        className="w-full text-left px-5 py-3 border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] transition-colors flex items-center gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[12px] text-[#0f2340]">{j.number}</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#4a5565] mt-0.5">{j.vehicle} — <span className="font-['JetBrains_Mono:Regular',sans-serif]">{j.plate}</span></p>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{j.serviceType}</span>
                          <span className="bg-[#dbeafe] text-[#1d4ed8] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] px-2 py-0.5 rounded-full">{j.status}</span>
                        </div>
                      </button>
                    ))}
                  </>
                )}
                {matchedParts.length > 0 && (
                  <>
                    <div className="px-5 py-2 bg-[#f9fafb] border-b border-[#f3f4f6]">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-[#99a1af] tracking-[0.8px] uppercase">Parts</p>
                    </div>
                    {matchedParts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setDashSearch(""); onViewAllParts(); }}
                        className="w-full text-left px-5 py-3 border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] transition-colors flex items-center gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{p.name}</p>
                          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#6a7282] mt-0.5">{p.number}</p>
                        </div>
                        <span className="shrink-0 font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">Available: {p.currentQty}</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* Open Job Orders — primary section */}
            <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-[#f3f4f6] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828] tracking-[0.7px] uppercase">Open Job Orders</p>
                  <span className="bg-[#dbeafe] text-[#1d4ed8] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] px-2 py-0.5 rounded-full">{jobs.length}</span>
                </div>
              </div>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                      <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Job Order</th>
                      <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Customer</th>
                      <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Vehicle</th>
                      <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Service</th>
                      <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((j) => (
                      <tr
                        key={j.number}
                        onClick={() => onOpenJob(j)}
                        className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3.5">
                          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[12px] text-[#0f2340]">{j.number}</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mt-0.5">{j.date}</p>
                        </td>
                        <td className="px-4 py-3.5 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{j.customer}</td>
                        <td className="px-4 py-3.5">
                          <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{j.vehicle}</p>
                          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#6a7282] mt-0.5">{j.plate}</p>
                        </td>
                        <td className="px-4 py-3.5 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{j.serviceType}</td>
                        <td className="px-4 py-3.5">
                          <span className="bg-[#dbeafe] text-[#1d4ed8] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] px-2.5 py-0.5 rounded-full">{j.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right — Secondary: alerts + movements (2 cols) */}
          <div className="col-span-2 space-y-4">
            {/* Out of Stock Urgent */}
            {outOfStock.length > 0 && (
              <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
                <div className="bg-[#fef2f2] border-b border-[#ffe2e2] px-5 py-4">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#1e2939] tracking-[0.7px] uppercase">Out of Stock — Urgent</p>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                      <th className="text-left px-4 py-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part</th>
                      <th className="text-right px-4 py-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Min</th>
                      <th className="text-right px-4 py-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outOfStock.map((p) => (
                      <tr key={p.id} className="border-b border-[#f9fafb] last:border-0 hover:bg-[#fef2f2] cursor-pointer transition-colors" onClick={onViewAllParts}>
                        <td className="px-4 py-2.5">
                          <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#101828]">{p.name}</p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#6a7282]">{p.number}</p>
                        </td>
                        <td className="px-4 py-2.5 text-right font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{p.minQty}</td>
                        <td className="px-4 py-2.5 text-right font-['Inter:Bold',sans-serif] font-bold text-[13px] text-[#e7000b]">{p.currentQty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Low Stock */}
            <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
              <div className="border-b border-[#f3f4f6] px-5 py-4 flex items-center justify-between">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#1e2939] tracking-[0.7px] uppercase">Low Stock</p>
                <button onClick={onViewAllParts} className="bg-white border border-[#d1d5dc] rounded px-3 py-1.5 font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#364153]">View All</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                    <th className="text-left px-4 py-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part</th>
                    <th className="text-right px-4 py-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Min</th>
                    <th className="text-right px-4 py-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Avail</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((p) => (
                    <tr key={p.id} className="border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors" onClick={onViewAllParts}>
                      <td className="px-4 py-2.5">
                        <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#101828]">{p.name}</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#6a7282]">{p.brand}</p>
                      </td>
                      <td className="px-4 py-2.5 text-right font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{p.minQty}</td>
                      <td className="px-4 py-2.5 text-right font-['Inter:Bold',sans-serif] font-bold text-[13px] text-[#e17100]">{p.currentQty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Stock Movements */}
            <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
              <div className="border-b border-[#f3f4f6] px-5 py-4 flex items-center justify-between">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#1e2939] tracking-[0.7px] uppercase">Recent Movements</p>
                <button onClick={onViewAllMovements} className="bg-white border border-[#d1d5dc] rounded px-3 py-1.5 font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#364153]">View All</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                    <th className="text-left px-4 py-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part</th>
                    <th className="text-left px-4 py-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Type</th>
                    <th className="text-right px-4 py-2 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.slice(0, 5).map((m, i) => (
                    <tr key={i} className="border-b border-[#f9fafb] last:border-0">
                      <td className="px-4 py-2.5">
                        <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#101828]">{m.part}</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">{m.date}</p>
                      </td>
                      <td className="px-4 py-2.5"><WTypeBadge type={m.type} /></td>
                      <td className={`px-4 py-2.5 text-right font-['Inter:Bold',sans-serif] font-bold text-[13px] ${m.qty > 0 ? "text-[#008236]" : "text-[#e7000b]"}`}>{m.qty > 0 ? `+${m.qty}` : m.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Warehouse: Open Job Orders ──────────────────────────────────────────────

function WarehouseJobsScreen({ jobs, onOpen }: { jobs: WJob[]; onOpen: (job: WJob) => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Open");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  const statuses = ["All", "Open", "Complete", "Closed"];

  const filtered = jobs
    .filter((j) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        j.number.toLowerCase().includes(q) ||
        j.vehicle.toLowerCase().includes(q) ||
        j.plate.toLowerCase().includes(q) ||
        j.customer.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || j.status.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    })
    .sort((a, b) =>
      sortDir === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    );

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 max-w-[360px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job #, plate, vehicle..."
              className="w-full h-10 px-4 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none focus:border-[#0f2340] transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153] outline-none cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s}
              </option>
            ))}
          </select>
          <div className="relative">
            <select
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value as "desc" | "asc")}
              className="h-10 pl-3 pr-8 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153] outline-none appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%236a7282' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
            >
              <option value="desc">Sort by Date ↓</option>
              <option value="asc">Sort by Date ↑</option>
            </select>
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282] ml-1">{filtered.length} {statusFilter === "All" ? "jobs" : `${statusFilter.toLowerCase()} jobs`}</p>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Job Order</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Date ↕</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Vehicle</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Plate</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Status</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Parts Issued</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr key={job.number} className="border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] transition-colors">
                  <td className="px-4 py-4 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#0f2340]">{job.number}</td>
                  <td className="px-4 py-4 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{job.date}</td>
                  <td className="px-4 py-4">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{job.vehicle}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{job.color} · {job.year}</p>
                  </td>
                  <td className="px-4 py-4 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{job.plate}</td>
                  <td className="px-4 py-4"><StatusBadge status={job.status} /></td>
                  <td className="px-4 py-4">
                    {job.partsIssued > 0
                      ? <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153]">{job.partsIssued} parts</span>
                      : <span className="text-[#d1d5dc]">—</span>
                    }
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => onOpen(job)}
                      className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-1.5 rounded hover:bg-[#1a3560] transition-colors"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Warehouse: Add Part Modal ───────────────────────────────────────────────

function AddPartModal({
  parts,
  onAdd,
  onClose,
}: {
  parts: WPart[];
  onAdd: (selections: { part: WPart; qty: number }[]) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [qtys, setQtys] = useState<Record<string, string>>({});

  const filtered = parts.filter((p) => {
    const q = search.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.number.toLowerCase().includes(q) || p.oem.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
  });

  function togglePart(p: WPart) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(p.id)) {
        next.delete(p.id);
      } else {
        next.add(p.id);
        if (!qtys[p.id]) setQtys((q) => ({ ...q, [p.id]: "1" }));
      }
      return next;
    });
  }

  function setQty(partId: string, val: string) {
    setQtys((prev) => ({ ...prev, [partId]: val }));
  }

  const selectedParts = parts.filter((p) => selectedIds.has(p.id));

  function isValid(p: WPart) {
    const n = parseInt(qtys[p.id] ?? "1");
    return !isNaN(n) && n > 0 && n <= p.currentQty;
  }

  const allValid = selectedParts.length > 0 && selectedParts.every(isValid);

  function handleAdd() {
    if (!allValid) return;
    const selections = selectedParts.map((p) => ({ part: p, qty: parseInt(qtys[p.id]) }));
    onAdd(selections);
    onClose();
  }

  const btnLabel = selectedParts.length === 0
    ? "Add to Job"
    : selectedParts.length === 1
    ? "Add 1 Part to Job"
    : `Add ${selectedParts.length} Parts to Job`;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[560px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6] shrink-0">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#111827]">Add Part to Job</h2>
          <button onClick={onClose} className="text-[#6a7282] hover:text-[#111827] text-[20px] leading-none">×</button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-[#f3f4f6] shrink-0">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, part number, OEM, brand..."
            className="w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none focus:border-[#0f2340] transition-colors"
          />
        </div>

        {/* Part list */}
        <div className="overflow-y-auto" style={{ maxHeight: "280px" }}>
          {filtered.map((p) => {
            const isSelected = selectedIds.has(p.id);
            return (
              <button
                key={p.id}
                onClick={() => togglePart(p)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors ${isSelected ? "bg-[#f0f4ff]" : ""}`}
              >
                {/* Checkbox */}
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-[#0f2340] border-[#0f2340]" : "border-[#d1d5dc] bg-white"}`}>
                  {isSelected && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{p.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#6a7282]">{p.number}</span>
                    <span className="text-[#d1d5dc] text-[10px]">·</span>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#6a7282]">{p.brand}</span>
                    <span className="bg-[#f3f4f6] text-[#6a7282] text-[10px] px-1.5 py-0.5 rounded font-['Inter:Medium',sans-serif]">{p.location}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`font-['Inter:Bold',sans-serif] font-bold text-[13px] ${p.currentQty <= 0 ? "text-[#e7000b]" : p.currentQty <= p.minQty ? "text-[#e17100]" : "text-[#008236]"}`}>{p.currentQty}</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#6a7282]">available</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected parts section */}
        {selectedParts.length > 0 && (
          <div className="border-t border-[#e5e7eb] bg-[#f8faff] shrink-0">
            <div className="px-4 py-2.5 border-b border-[#e5e7eb]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.5px] uppercase">
                Selected Parts ({selectedParts.length})
              </p>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
              {selectedParts.map((p) => {
                const raw = qtys[p.id] ?? "1";
                const n = parseInt(raw);
                const overStock = !isNaN(n) && n > p.currentQty;
                const invalid = raw === "" || isNaN(n) || n <= 0 || overStock;
                return (
                  <div key={p.id} className="flex items-center gap-4 px-4 py-3 border-b border-[#f0f4ff] last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#0f2340] truncate">{p.name}</p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#6a7282] mt-0.5">
                        Available: <span className="font-['Inter:Bold',sans-serif] font-bold text-[#0f2340]">{p.currentQty}</span>
                        <span className="mx-1.5 text-[#d1d5dc]">·</span>
                        Location: <span className="font-['Inter:Bold',sans-serif] font-bold text-[#0f2340]">{p.location}</span>
                      </p>
                      {overStock && <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#e7000b] mt-0.5">Quantity cannot exceed available stock.</p>}
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#6a7282]">Qty to Issue</p>
                      <input
                        type="number"
                        min={1}
                        max={p.currentQty}
                        value={raw}
                        onChange={(e) => setQty(p.id, e.target.value)}
                        className={`w-16 h-8 text-center border rounded font-['Inter:Regular',sans-serif] font-normal text-[14px] outline-none transition-colors ${invalid ? "border-[#e7000b] focus:border-[#e7000b]" : "border-[#d1d5dc] focus:border-[#0f2340]"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex gap-3 px-4 py-4 border-t border-[#e5e7eb] shrink-0">
          <button
            onClick={handleAdd}
            disabled={!allValid}
            className={`flex-1 py-2.5 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors ${allValid ? "bg-[#0f2340] text-white hover:bg-[#1a3560]" : "bg-[#d1d5dc] text-[#6a7282] cursor-not-allowed"}`}
          >
            {btnLabel}
          </button>
          <button onClick={onClose} className="px-5 py-2.5 border border-[#e5e7eb] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Warehouse: Parts Issue ──────────────────────────────────────────────────

function WarehousePartsIssueScreen({
  job,
  issuedParts,
  parts,
  approvedItems = [],
  onBack,
  onAddPart,
  onRemovePart,
  onConfirm,
  confirmed,
}: {
  job: WJob;
  issuedParts: WIssuedPart[];
  parts: WPart[];
  approvedItems?: { item: string; note: string }[];
  onBack: () => void;
  onAddPart: () => void;
  onRemovePart: (partId: string) => void;
  onConfirm: () => void;
  confirmed: boolean;
}) {
  const isAlreadyCompleted = confirmed || job.status === "Complete" || job.status === "Closed";
  const totalQty = issuedParts.reduce((sum, p) => sum + p.qty, 0);

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 max-w-[900px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282] hover:text-[#111827] flex items-center gap-1">
            ← Back to Jobs
          </button>
          <span className="text-[#d1d5dc]">|</span>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#111827]">Warehouse Parts Issue</span>
        </div>

        {/* Job info card */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-5 mb-5">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-1">Job Order</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">{job.number}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">{job.date} · {job.serviceType}</p>
            </div>
            <div>
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-1">Status</p>
              <div className="mt-1">
                <StatusBadge status={isAlreadyCompleted && job.status === "Open" ? "Complete" : job.status} />
              </div>
            </div>
            <div>
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-1">Vehicle</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#111827]">{job.vehicle} ({job.year})</p>
              <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#6a7282] mt-0.5">{job.plate}</p>
            </div>
            <div>
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-1">Relevant Work</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#111827]">{job.serviceType}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">Customer reported issues. Check and advise.</p>
            </div>
          </div>
        </div>

        {/* Approved Work Reference Card */}
        {approvedItems && approvedItems.length > 0 && (
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[10px] p-4 mb-5 shadow-sm">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#008236] tracking-[0.6px] uppercase mb-2 flex items-center gap-1.5">
              <span>✓</span> Customer Approved Work & Requested Parts (Reference for Warehouse)
            </p>
            <div className="space-y-1.5">
              {approvedItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[13px] bg-white border border-[#bbf7d0] rounded-lg px-3.5 py-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#008236]" />
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#101828]">{item.item}</span>
                  </div>
                  {item.note && (
                    <span className="font-['Inter:Medium',sans-serif] text-[#008236] text-[12px] bg-[#f0fdf4] px-2 py-0.5 rounded border border-[#bbf7d0]">
                      {item.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Parts table */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden mb-5">
          <div className="px-5 py-4 flex items-center justify-between border-b border-[#f3f4f6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939] tracking-[0.7px] uppercase">Parts Issued to This Job</p>
            {!isAlreadyCompleted && (
              <button onClick={onAddPart} className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#1a3560] transition-colors">
                + Add Part to Job
              </button>
            )}
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part Name</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part Number</th>
                <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Qty Issued</th>
                {!isAlreadyCompleted && <th className="px-4 py-3 w-10" />}
              </tr>
            </thead>
            <tbody>
              {issuedParts.length === 0 ? (
                <tr>
                  <td colSpan={isAlreadyCompleted ? 3 : 4} className="px-4 py-8 text-center text-[13px] text-[#99a1af] font-['Inter:Regular',sans-serif]">
                    No parts added yet. Click &ldquo;+ Add Part to Job&rdquo; to select required parts.
                  </td>
                </tr>
              ) : (
                issuedParts.map((p) => (
                  <tr key={p.partId} className="border-b border-[#f9fafb] last:border-0">
                    <td className="px-4 py-3 font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{p.partName}</td>
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{p.partNumber}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-block w-10 h-8 border border-[#e5e7eb] rounded text-center font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] leading-8">{p.qty}</span>
                    </td>
                    {!isAlreadyCompleted && (
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => onRemovePart(p.partId)} className="text-[#99a1af] hover:text-[#e7000b] transition-colors text-[16px]">×</button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer actions */}
        {!isAlreadyCompleted ? (
          <div className="flex items-center justify-between">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">
              Warehouse: Hassan Nour · {job.date}
            </p>
            <button
              onClick={onConfirm}
              disabled={issuedParts.length === 0}
              className={`font-['Inter:Medium',sans-serif] font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors ${issuedParts.length > 0 ? "bg-[#0f2340] text-white hover:bg-[#1a3560]" : "bg-[#d1d5dc] text-[#6a7282] cursor-not-allowed"}`}
            >
              ✓ Confirm Issue — {totalQty} Items
            </button>
          </div>
        ) : (
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[10px] p-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white text-[16px] font-bold">✓</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] text-[#0f2340]">Stock Updated & Job Marked COMPLETE</p>
                  <StatusBadge status="Complete" />
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#15803d] mt-0.5">
                  {totalQty} items successfully issued to {job.number}. Inventory decreased, stock out logged, and Job Order status transitioned: <strong>OPEN → COMPLETE</strong>. Ready for Accountant invoicing.
                </p>
              </div>
            </div>
            <button className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#364153] border border-[#d1d5dc] bg-white rounded-lg px-4 py-2 hover:bg-[#f9fafb] transition-colors shadow-sm">
              Print Issue Doc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Warehouse: Parts & Inventory ────────────────────────────────────────────

function WarehousePartsScreen({ parts, onSelectPart, onAddNewPart }: { parts: WPart[]; onSelectPart: (p: WPart) => void; onAddNewPart: () => void }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Status");

  const categories = ["All", ...Array.from(new Set(parts.map((p) => p.category))).sort()];

  const filtered = parts
    .filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.number.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
      const matchesStatus = statusFilter === "Status" || p.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23111827' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`;

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by part name, number, SKU, brand..."
            className="flex-1 max-w-[400px] h-10 px-4 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none focus:border-[#0f2340] transition-colors"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 pl-4 pr-8 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none appearance-none cursor-pointer"
            style={{ backgroundImage: chevronSvg, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 pl-4 pr-8 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none appearance-none cursor-pointer"
            style={{ backgroundImage: chevronSvg, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
          >
            <option value="Status">Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <button
            onClick={onAddNewPart}
            className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] px-5 py-2 rounded-lg hover:bg-[#1a3560] transition-colors whitespace-nowrap h-10"
          >
            + Add New Part
          </button>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Number</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Category</th>
                <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Min</th>
                <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Available ↕</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} onClick={() => onSelectPart(p)} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{p.name}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{p.brand}</p>
                  </td>
                  <td className="px-4 py-4 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{p.number}</td>
                  <td className="px-4 py-4 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{p.category}</td>
                  <td className="px-4 py-4 text-right font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{p.minQty}</td>
                  <td className={`px-4 py-4 text-right font-['Inter:Bold',sans-serif] font-bold text-[14px] ${p.currentQty <= 0 ? "text-[#e7000b]" : p.currentQty <= p.minQty ? "text-[#e17100]" : "text-[#101828]"}`}>{p.currentQty}</td>
                  <td className="px-4 py-4"><WStockBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Warehouse: Part Details ─────────────────────────────────────────────────

function WarehousePartDetailsScreen({
  part,
  movements,
  onBack,
  role,
  onSavePrices,
}: {
  part: WPart;
  movements: WMovement[];
  onBack: () => void;
  role?: string;
  onSavePrices?: (partId: string, purchasePrice: number, sellingPrice: number) => void;
}) {
  const canSeePrices = role === "accountant" || role === "owner";
  const canEditPrices = role === "accountant" || role === "owner";

  const [editing, setEditing] = useState(false);
  const [draftPurchase, setDraftPurchase] = useState(part.purchasePrice.toString());
  const [draftSelling, setDraftSelling] = useState(part.sellingPrice.toString());
  const [priceSaved, setPriceSaved] = useState(false);

  function handleSave() {
    const pp = parseFloat(draftPurchase);
    const sp = parseFloat(draftSelling);
    if (!isNaN(pp) && !isNaN(sp) && onSavePrices) {
      onSavePrices(part.id, pp, sp);
    }
    setEditing(false);
    setPriceSaved(true);
  }

  function handleCancel() {
    setDraftPurchase(part.purchasePrice.toString());
    setDraftSelling(part.sellingPrice.toString());
    setEditing(false);
  }

  const partMovements = movements.filter((m) => m.part === part.name);

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 max-w-[900px]">
        <button onClick={onBack} className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282] hover:text-[#111827] flex items-center gap-1 mb-4">
          ← Back
        </button>
        <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[22px] text-[#111827] mb-5">{part.name}</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Part Details card */}
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-5">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-4">Part Details</p>
            {[
              { label: "Part Number", value: part.number, mono: true },
              { label: "OEM", value: part.oem, mono: true },
              { label: "Brand", value: part.brand, mono: false },
              { label: "Category", value: part.category, mono: false },
            ].map(({ label, value, mono }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[#f9fafb] last:border-0">
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">{label}</span>
                <span className={`${mono ? "font-['JetBrains_Mono:Regular',sans-serif]" : "font-['Inter:Regular',sans-serif]"} font-normal text-[14px] text-[#111827]`}>{value}</span>
              </div>
            ))}
            <div className="flex items-start justify-between py-2">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">Compatible Vehicles</span>
              <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                {part.compatibleVehicles.map((v) => (
                  <span key={v} className="bg-[#f3f4f6] text-[#364153] text-[11px] px-2 py-0.5 rounded font-['Inter:Medium',sans-serif]">{v}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Stock Info card */}
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-5">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-4">Stock Info</p>
            {[
              { label: "Current Qty", value: part.currentQty.toString(), bold: true, color: part.currentQty <= 0 ? "#e7000b" : "#111827" },
              { label: "Min Qty", value: part.minQty.toString(), bold: false, color: "#111827" },
            ].map(({ label, value, bold, color }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[#f9fafb]">
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">{label}</span>
                <span className={`font-['Inter:${bold ? "Bold" : "Regular"}',sans-serif] font-${bold ? "bold" : "normal"} text-[22px]`} style={{ color }}>{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2 border-b border-[#f9fafb]">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">Location</span>
              <span className="bg-[#f3f4f6] text-[#364153] text-[13px] px-2.5 py-1 rounded font-['JetBrains_Mono:Regular',sans-serif]">{part.location}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">Status</span>
              <WStockBadge status={part.status} />
            </div>
          </div>
        </div>

        {/* Pricing card — Accountant & Owner only */}
        {canSeePrices && (
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Pricing</p>
              {canEditPrices && !editing && (
                <button
                  onClick={() => { setEditing(true); setPriceSaved(false); }}
                  className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#1447e6] hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase block mb-1">Purchase Price (EGP)</label>
                    <input
                      type="number" min="0" step="1"
                      value={draftPurchase}
                      onChange={(e) => setDraftPurchase(e.target.value)}
                      className="w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase block mb-1">Selling Price (EGP)</label>
                    <input
                      type="number" min="0" step="1"
                      value={draftSelling}
                      onChange={(e) => setDraftSelling(e.target.value)}
                      className="w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#1a3560] transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="border border-[#e5e7eb] text-[#364153] font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f9fafb] rounded-lg px-4 py-3">
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mb-1">Purchase Price</p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#101828]">{part.purchasePrice.toLocaleString()} <span className="text-[13px] font-normal text-[#6a7282]">EGP</span></p>
                  {priceSaved && <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#008236] mt-1">✓ Updated</p>}
                </div>
                <div className="bg-[#f9fafb] rounded-lg px-4 py-3">
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mb-1">Selling Price</p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#101828]">{part.sellingPrice.toLocaleString()} <span className="text-[13px] font-normal text-[#6a7282]">EGP</span></p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stock Movements */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f3f4f6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939] tracking-[0.7px] uppercase">Stock Movements</p>
          </div>
          {partMovements.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#99a1af]">No movements recorded for this part.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                  <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Type</th>
                  <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Reference</th>
                  <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Note</th>
                  <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Date</th>
                  <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Qty</th>
                </tr>
              </thead>
              <tbody>
                {partMovements.map((m, i) => (
                  <tr key={i} className="border-b border-[#f9fafb] last:border-0">
                    <td className="px-4 py-3"><WTypeBadge type={m.type} /></td>
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{m.reference}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{m.note}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{m.date}</td>
                    <td className={`px-4 py-3 text-right font-['Inter:Bold',sans-serif] font-bold text-[14px] ${m.qty > 0 ? "text-[#008236]" : "text-[#e7000b]"}`}>{m.qty > 0 ? `+${m.qty}` : m.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Warehouse: Stock Movements ──────────────────────────────────────────────

function WarehouseMovementsScreen({ movements, parts, onSelectPart }: { movements: WMovement[]; parts: WPart[]; onSelectPart: (p: WPart) => void }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = movements
    .filter((m) => {
      const q = search.toLowerCase();
      return (
        (m.part.toLowerCase().includes(q) || m.reference.toLowerCase().includes(q) || m.note.toLowerCase().includes(q)) &&
        (typeFilter === "All" || m.type === typeFilter)
      );
    })
    .sort((a, b) => {
      if (sortBy === "oldest") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date);
    });

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by part or reference..."
            className="flex-1 max-w-[400px] h-10 px-4 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none focus:border-[#0f2340] transition-colors"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-10 px-3 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors"
          >
            <option value="All">All Types</option>
            <option value="Issue">Issue</option>
            <option value="Stock In">Stock In</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-3 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Type</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Job Order</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Note</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Date ↕</th>
                <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Qty</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => {
                const part = parts.find((p) => p.name === m.part);
                return (
                  <tr
                    key={i}
                    onClick={() => part && onSelectPart(part)}
                    className={`border-b border-[#f9fafb] last:border-0 transition-colors ${part ? "hover:bg-[#f9fafb] cursor-pointer" : ""}`}
                  >
                    <td className="px-4 py-3 font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{m.part}</td>
                    <td className="px-4 py-3"><WTypeBadge type={m.type} /></td>
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{m.reference}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{m.note}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{m.date}</td>
                    <td className={`px-4 py-3 text-right font-['Inter:Bold',sans-serif] font-bold text-[14px] ${m.qty > 0 ? "text-[#008236]" : "text-[#e7000b]"}`}>{m.qty > 0 ? `+${m.qty}` : m.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Warehouse: Add New Part Modal ──────────────────────────────────────────

function AddNewPartModal({ onClose, onSave, isOwner = false }: { onClose: () => void; onSave: (part: WPart) => void; isOwner?: boolean }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [oem, setOem] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [partType, setPartType] = useState<"Original" | "After Market">("Original");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [initialQty, setInitialQty] = useState("0");
  const [minStock, setMinStock] = useState("1");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  function handleSave() {
    if (!name.trim()) return;
    const qty = parseInt(initialQty) || 0;
    const min = parseInt(minStock) || 1;
    const status: WPart["status"] = qty <= 0 ? "Out of Stock" : qty <= min ? "Low Stock" : "In Stock";
    const sell = parseFloat(sellingPrice) || 0;
    const buy = parseFloat(purchasePrice) || 0;
    const newPart: WPart = {
      id: `p-${Date.now()}`,
      name: name.trim(),
      number: number.trim() || `PN-${Date.now()}`,
      oem: oem.trim(),
      brand: brand.trim(),
      category: category.trim() || "Other",
      compatibleVehicles: make ? [`${make} ${model}`.trim()] : ["Universal"],
      currentQty: qty,
      minQty: min,
      location: "TBD",
      status,
      purchasePrice: buy,
      sellingPrice: sell,
      partType,
    };
    onSave(newPart);
    onClose();
  }

  const labelCls = "font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase";
  const inputCls = "w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[540px] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6]">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#111827]">Add New Part</h2>
          <button onClick={onClose} className="text-[#6a7282] hover:text-[#111827] text-[22px] leading-none">×</button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Part Name */}
          <div>
            <label className={labelCls}>Part Name <span className="text-red-500">*</span></label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Turbocharger BMW 320i" className={`${inputCls} mt-1`} />
          </div>

          {/* Part Type + Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Part Type</label>
              <select
                value={partType}
                onChange={(e) => setPartType(e.target.value as "Original" | "After Market")}
                className={`${inputCls} mt-1 cursor-pointer bg-white`}
              >
                <option value="Original">Original (OEM)</option>
                <option value="After Market">After Market</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Brand</label>
              <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Brembo / Bosch" className={`${inputCls} mt-1`} />
            </div>
          </div>

          {/* Part Number + OEM Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Part Number</label>
              <input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="BP-BMW-OEM-001" className={`${inputCls} mt-1`} />
            </div>
            <div>
              <label className={labelCls}>OEM Number</label>
              <input value={oem} onChange={(e) => setOem(e.target.value)} placeholder="34116850885" className={`${inputCls} mt-1`} />
            </div>
          </div>

          {/* Category + Selling Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Brakes, Filters, Engine..." className={`${inputCls} mt-1`} />
            </div>
            <div>
              <label className={labelCls}>Selling Price (EGP) <span className="text-red-500">*</span></label>
              <input type="number" min="0" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="e.g. 2800" className={`${inputCls} mt-1`} />
            </div>
          </div>

          {/* Compatible Make + Compatible Model */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Compatible Make</label>
              <input value={make} onChange={(e) => setMake(e.target.value)} placeholder="BMW" className={`${inputCls} mt-1`} />
            </div>
            <div>
              <label className={labelCls}>Compatible Model</label>
              <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="320i" className={`${inputCls} mt-1`} />
            </div>
          </div>

          {/* Minimum Stock + Initial Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Minimum Stock</label>
              <input type="number" min="1" value={minStock} onChange={(e) => setMinStock(e.target.value)} placeholder="1" className={`${inputCls} mt-1`} />
            </div>
            <div>
              <label className={labelCls}>Initial Quantity</label>
              <input type="number" min="0" value={initialQty} onChange={(e) => setInitialQty(e.target.value)} placeholder="0" className={`${inputCls} mt-1`} />
            </div>
          </div>

          {/* Purchase Price (Owner only) */}
          {isOwner && (
            <div>
              <label className={labelCls}>Purchase Price (EGP)</label>
              <input type="number" min="0" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="0.00" className={`${inputCls} mt-1`} />
            </div>
          )}
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-[#e5e7eb]">
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className={`flex-1 py-2.5 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors ${name.trim() ? "bg-[#0f2340] text-white hover:bg-[#1a3560]" : "bg-[#d1d5dc] text-[#6a7282] cursor-not-allowed"}`}
          >
            Save Part
          </button>
          <button onClick={onClose} className="px-5 py-2.5 border border-[#e5e7eb] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Warehouse: Stock Count ──────────────────────────────────────────────────

interface StockCountEntry { partId: string; actualQty: string; note: string; }

function WarehouseStockCountScreen({
  parts,
  onSaveCount,
  onAddNewPart,
}: {
  parts: WPart[];
  onSaveCount: (entries: StockCountEntry[]) => void;
  onAddNewPart: () => void;
}) {
  const [addQtys, setAddQtys] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");

  function setAddQty(partId: string, val: string) {
    setAddQtys((prev) => ({ ...prev, [partId]: val }));
    setSaved(false);
  }

  function getNewQty(part: WPart): number | null {
    const raw = addQtys[part.id];
    if (!raw || raw === "") return null;
    const n = parseInt(raw);
    if (isNaN(n) || n < 0) return null;
    return part.currentQty + n;
  }

  function handleSave() {
    const entries: StockCountEntry[] = Object.entries(addQtys)
      .filter(([, val]) => val !== "" && parseInt(val) > 0)
      .map(([partId, val]) => ({ partId, actualQty: val, note: "" }));
    onSaveCount(entries);
    setAddQtys({});
    setSaved(true);
  }

  const filtered = parts.filter((p) => {
    const q = search.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.number.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
  });

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by part name, number, SKU, brand..."
            className="flex-1 max-w-[400px] h-10 px-4 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none focus:border-[#0f2340] transition-colors"
          />
          <div className="flex-1" />
          <button
            onClick={handleSave}
            className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] px-5 py-2 rounded-lg hover:bg-[#1a3560] transition-colors h-10"
          >
            {saved ? "✓ Saved" : "Save Count"}
          </button>
          <button
            onClick={onAddNewPart}
            className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] px-5 py-2 rounded-lg hover:bg-[#1a3560] transition-colors h-10"
          >
            + Add New Part
          </button>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part Name</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part Number</th>
                <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">System Qty</th>
                <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Add Qty</th>
                <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">New Qty</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const newQty = getNewQty(p);
                const raw = addQtys[p.id] ?? "";
                const invalid = raw !== "" && (isNaN(parseInt(raw)) || parseInt(raw) < 0);
                return (
                  <tr key={p.id} className="border-b border-[#f3f4f6] last:border-0">
                    <td className="px-4 py-4">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{p.name}</p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{p.brand}</p>
                    </td>
                    <td className="px-4 py-4 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{p.number}</td>
                    <td className="px-4 py-4 text-right font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#364153]">{p.currentQty}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-end gap-1">
                        <input
                          type="number"
                          min="0"
                          value={raw}
                          onChange={(e) => setAddQty(p.id, e.target.value)}
                          placeholder="—"
                          className={`w-20 h-8 text-right px-2 border rounded font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153] outline-none transition-colors ${invalid ? "border-[#e7000b] focus:border-[#e7000b]" : "border-[#d1d5dc] focus:border-[#0f2340]"}`}
                        />
                        {invalid && <span className="text-[10px] text-[#e7000b] font-['Inter:Regular',sans-serif]">Invalid</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      {newQty !== null ? (
                        <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#008236]">{newQty}</span>
                      ) : (
                        <span className="text-[#d1d5dc]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Owner: Sidebar ──────────────────────────────────────────────────────────

const OWNER_NAV_SECTIONS = [
  {
    label: "Owner",
    items: [
      { id: "owner-dashboard", symbol: "⊞", label: "Dashboard" },
      { id: "customer-list",   symbol: "◉", label: "Customers" },
      { id: "vehicle-list",    symbol: "◫", label: "Vehicles" },
      { id: "job-orders-list", symbol: "▤", label: "Job Orders" },
    ],
  },
  {
    label: "Warehouse",
    items: [
      { id: "warehouse-parts",       symbol: "▤", label: "Parts" },
      { id: "warehouse-stock-count", symbol: "⊟", label: "Stock Update" },
      { id: "warehouse-movements",   symbol: "↕", label: "Movements" },
    ],
  },
  {
    label: "Accounting",
    items: [
      { id: "owner-invoices",  symbol: "◧", label: "Invoices" },
      { id: "owner-payments",  symbol: "◨", label: "Payments" },
      { id: "owner-suppliers", symbol: "🚚", label: "Suppliers" },
      { id: "owner-expenses",  symbol: "📋", label: "Expenses" },
    ],
  },
  {
    label: "Staff & Payroll",
    items: [
      { id: "owner-technicians", symbol: "👥", label: "Technicians" },
      { id: "owner-attendance",  symbol: "📅", label: "Attendance" },
      { id: "owner-payroll",     symbol: "💵", label: "Payroll" },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "owner-reports",  symbol: "▦", label: "Reports" },
      { id: "owner-users",    symbol: "◈", label: "Users" },
      { id: "owner-settings", symbol: "◌", label: "Settings" },
    ],
  },
];

function OwnerSidebar({
  active,
  onNav,
  onSignOut,
  workshopSettings,
  authUser,
}: {
  active: string;
  onNav: (id: string) => void;
  onSignOut: () => void;
  workshopSettings?: WorkshopSettings;
  authUser?: { name: string; email: string; role?: Role } | null;
}) {
  const companyName = workshopSettings?.companyName || "SOS Motor Works";
  const logoUrl = workshopSettings?.logoUrl || "/uploads/branding/sos_logo.jpeg";
  const fullLogoUrl = logoUrl.startsWith("http") ? logoUrl : `${API_ORIGIN}${logoUrl}`;

  const userName = authUser?.name || "Owner";
  const initials = getUserInitials(userName);

  return (
    <div data-sidebar="true" className="no-print fixed left-0 top-0 h-full w-[168px] bg-[#060f1e] flex flex-col z-20 select-none overflow-y-auto border-r border-white/10">
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10 shrink-0">
        <div className="w-7 h-7 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-0.5 border border-white/15 shrink-0">
          <img
            src={fullLogoUrl}
            alt={companyName}
            crossOrigin="anonymous"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${API_ORIGIN}/uploads/branding/sos_logo.jpeg`;
            }}
          />
        </div>
        <div className="min-w-0 flex flex-col">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-white leading-[14px] truncate">{companyName}</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] text-white/40 tracking-[0.5px] uppercase leading-[12px]">Owner</p>
        </div>
      </div>

      <div className="flex-1 py-3">
        {OWNER_NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-3">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[9px] text-white/30 tracking-[1px] uppercase px-5 pb-1">{section.label}</p>
            {section.items.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNav(item.id)}
                  className={`w-full flex items-center gap-2 px-5 py-2 text-left transition-colors ${isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
                >
                  <span className="text-[13px] shrink-0">{item.symbol}</span>
                  <span className={`font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[18px] truncate ${isActive ? "text-white" : ""}`}>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="px-4 py-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
            <span>{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-white leading-[14px] truncate">{userName}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] text-white/40 leading-[12px] uppercase tracking-[0.5px]">Owner</p>
          </div>
        </div>
        <button onClick={onSignOut} className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-white/40 hover:text-white/70 transition-colors">→ Sign out</button>
      </div>
    </div>
  );
}

// ─── Owner: Dashboard ─────────────────────────────────────────────────────────

// ─── Owner: Redesigned ERP Dashboard ──────────────────────────────────────────

function OwnerDashboardScreen({
  jobOrders,
  parts,
  onViewJobs,
  onViewParts,
  onViewInvoices,
}: {
  jobOrders: { number: string; customer: string; vehicle: string; plate: string; status: string; date?: string }[];
  parts: WPart[];
  onViewJobs: () => void;
  onViewParts: () => void;
  onViewInvoices?: () => void;
}) {
  const [activePeriod, setActivePeriod] = useState<string>("This Month");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [trendGrouping, setTrendGrouping] = useState<"Daily" | "Weekly" | "Monthly">("Daily");
  const [dbData, setDbData] = useState<any>(null);

  const fetchDashboardData = (period: string, sDate?: string, eDate?: string) => {
    api
      .getOwnerDashboard({ period, startDate: sDate, endDate: eDate })
      .then((res) => {
        if (res) setDbData(res);
      })
      .catch((err) => console.warn("Owner dashboard API error:", err));
  };

  useEffect(() => {
    fetchDashboardData(activePeriod);
  }, []);

  const handlePeriodSelect = (period: string) => {
    setActivePeriod(period);
    if (period !== "Custom Range") {
      fetchDashboardData(period);
    }
  };

  const handleApplyCustomRange = () => {
    if (customStartDate && customEndDate) {
      setActivePeriod("Custom Range");
      fetchDashboardData("Custom Range", customStartDate, customEndDate);
    }
  };

  // Operational fallbacks if DB returns 0 or initial load
  const openCount = dbData?.openJobOrders ?? jobOrders.filter((j) => j.status === "Open").length;
  const completedCount = dbData?.completedJobOrders ?? jobOrders.filter((j) => j.status === "Complete").length;
  const closedCount = dbData?.closedJobOrders ?? jobOrders.filter((j) => j.status === "Closed").length;
  const totalJO = dbData?.totalJobOrders ?? jobOrders.length;

  const lowStockItems = Array.isArray(dbData?.lowStockItems) && dbData.lowStockItems.length > 0
    ? dbData.lowStockItems
    : parts.filter((p) => p.status === "Low Stock" || p.status === "Out of Stock").slice(0, 5).map((p) => ({
        id: p.id,
        name: p.name,
        partNumber: p.number,
        currentQty: p.currentQty,
        minQty: p.minQty,
        status: p.status,
      }));

  const recentJOs = Array.isArray(dbData?.recentJobOrders) && dbData.recentJobOrders.length > 0
    ? dbData.recentJobOrders
    : jobOrders.slice(0, 5).map((j) => ({
        id: j.number,
        number: j.number,
        customerName: j.customer,
        vehicleName: j.vehicle,
        plate: j.plate,
        status: j.status,
        date: j.date || "Today",
      }));

  const recentInvoices = Array.isArray(dbData?.recentInvoices) && dbData.recentInvoices.length > 0
    ? dbData.recentInvoices
    : [];

  const trendPoints: { dateLabel: string; revenue: number; profit: number }[] =
    Array.isArray(dbData?.trendPoints) && dbData.trendPoints.length > 0
      ? dbData.trendPoints
      : [
          { dateLabel: "1 Sep", revenue: 4500, profit: 1500 },
          { dateLabel: "7 Sep", revenue: 3200, profit: 1100 },
          { dateLabel: "14 Sep", revenue: 6800, profit: 2400 },
          { dateLabel: "21 Sep", revenue: 9500, profit: 4100 },
          { dateLabel: "28 Sep", revenue: 8100, profit: 3200 },
        ];

  const expenseBreakdown = Array.isArray(dbData?.expenseBreakdown) && dbData.expenseBreakdown.length > 0
    ? dbData.expenseBreakdown
    : [
        { categoryEn: "Parts Purchases", categoryAr: "قطع الغيار", amount: dbData?.supplierPurchasesTotal || 1200, percentage: 49, color: "#2563eb" },
        { categoryEn: "Salaries", categoryAr: "الرواتب", amount: dbData?.technicianSalaryBalance || 500, percentage: 20, color: "#7c3aed" },
        { categoryEn: "Operating Expenses", categoryAr: "مصروفات تشغيلية", amount: dbData?.operatingExpenses || 400, percentage: 16, color: "#ef4444" },
        { categoryEn: "Suppliers Payments", categoryAr: "الموردين", amount: 250, percentage: 10, color: "#f59e0b" },
        { categoryEn: "Other", categoryAr: "أخرى", amount: 100, percentage: 4, color: "#64748b" },
      ];

  const totalRev = dbData?.totalRevenue ?? dbData?.totalCollected ?? 4020;
  const revPct = dbData?.revenueChangePct ?? 12.0;

  const totalExp = dbData?.totalExpenses ?? dbData?.totalOutflow ?? 2450;
  const expPct = dbData?.expensesChangePct ?? 8.0;

  const netProf = dbData?.netProfit ?? (totalRev - totalExp);
  const profitPct = dbData?.netProfitChangePct ?? 27.9;

  const payables = dbData?.outstandingPayables ?? dbData?.supplierOutstandingBalance ?? 3000;
  const unpaidInv = dbData?.unpaidInvoicesAmount ?? 1200;
  const techSalaries = dbData?.technicianSalaryBalance ?? 500;
  const receivables = dbData?.customerReceivables ?? unpaidInv;

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f8fafc]">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* ── Top Header & Global Filter Bar ────────────────────────────── */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs">
          <div>
            <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[22px] text-[#0f2340] tracking-tight flex items-center gap-3">
              Dashboard
              <span className="text-[13px] font-normal text-[#64748b] bg-[#f1f5f9] px-2.5 py-1 rounded-lg border border-[#e2e8f0]">
                نظرة عامة على أداء الورشة
              </span>
            </h1>
            <p className="font-['Inter:Regular',sans-serif] text-[13px] text-[#64748b] mt-1">
              Overview of your workshop performance, real-time financial status & operational metrics.
            </p>
          </div>

          {/* Date Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "Today", en: "Today", ar: "اليوم" },
              { id: "This Week", en: "This Week", ar: "هذا الأسبوع" },
              { id: "This Month", en: "This Month", ar: "هذا الشهر" },
              { id: "This Year", en: "This Year", ar: "هذه السنة" },
              { id: "Custom Range", en: "Custom Range", ar: "فترة مخصصة" },
            ].map((p) => {
              const active = activePeriod === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePeriodSelect(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all flex flex-col items-center justify-center min-w-[95px] border cursor-pointer ${
                    active
                      ? "bg-[#0f2340] text-white border-[#0f2340] shadow-sm"
                      : "bg-white text-[#334155] border-[#cbd5e1] hover:bg-[#f1f5f9]"
                  }`}
                >
                  <span className="font-['Inter:Semi_Bold',sans-serif]">{p.en}</span>
                  <span className="text-[10px] opacity-75 font-normal">{p.ar}</span>
                </button>
              );
            })}

            {activePeriod === "Custom Range" && (
              <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#cbd5e1] p-1.5 rounded-xl text-xs ml-1">
                <div className="flex items-center gap-1">
                  <span className="text-[#64748b] text-[11px] font-medium">From (من):</span>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="bg-white border border-[#cbd5e1] rounded-lg px-2 py-1 text-xs text-[#0f2340] focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#64748b] text-[11px] font-medium">To (إلى):</span>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="bg-white border border-[#cbd5e1] rounded-lg px-2 py-1 text-xs text-[#0f2340] focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleApplyCustomRange}
                  className="bg-[#0f2340] text-white text-xs px-3 py-1 rounded-lg hover:bg-[#1a3560] font-semibold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Financial KPI Cards Grid (6 Cards) ───────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Card 1: Total Revenue */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#0f2340]">Total Revenue</p>
                <p className="text-[11px] text-[#64748b]">إجمالي الإيرادات</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#dcfce7] text-[#166534] flex items-center justify-center font-bold text-base shadow-2xs">
                $
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#166534]">
                  {totalRev.toLocaleString()} EGP
                </span>
                {revPct !== 0 && (
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${revPct >= 0 ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fee2e2] text-[#991b1b]"}`}>
                    {revPct >= 0 ? `↑ ${revPct}%` : `↓ ${Math.abs(revPct)}%`}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-[#94a3b8] mt-1 flex justify-between">
                <span>From previous period</span>
                <span>مقارنة بالفترة السابقة</span>
              </div>
            </div>
          </div>

          {/* Card 2: Total Expenses */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#0f2340]">Total Expenses</p>
                <p className="text-[11px] text-[#64748b]">إجمالي المصروفات</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#fee2e2] text-[#991b1b] flex items-center justify-center font-bold text-base shadow-2xs">
                📊
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#dc2626]">
                  {totalExp.toLocaleString()} EGP
                </span>
                {expPct !== 0 && (
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${expPct <= 0 ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fee2e2] text-[#991b1b]"}`}>
                    {expPct >= 0 ? `↑ ${expPct}%` : `↓ ${Math.abs(expPct)}%`}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-[#94a3b8] mt-1 flex justify-between">
                <span>From previous period</span>
                <span>مقارنة بالفترة السابقة</span>
              </div>
            </div>
          </div>

          {/* Card 3: Net Profit */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#0f2340]">Net Profit</p>
                <p className="text-[11px] text-[#64748b]">صافي الربح</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#cff4fc] text-[#0891b2] flex items-center justify-center font-bold text-base shadow-2xs">
                📈
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#2563eb]">
                  {netProf.toLocaleString()} EGP
                </span>
                {profitPct !== 0 && (
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${profitPct >= 0 ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fee2e2] text-[#991b1b]"}`}>
                    {profitPct >= 0 ? `↑ ${profitPct}%` : `↓ ${Math.abs(profitPct)}%`}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-[#94a3b8] mt-1 flex justify-between">
                <span>After all expenses</span>
                <span>بعد خصم جميع المصروفات</span>
              </div>
            </div>
          </div>

          {/* Card 4: Outstanding Payables */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#0f2340]">Outstanding Payables</p>
                <p className="text-[11px] text-[#64748b]">المديونيات المستحقة</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center font-bold text-base shadow-2xs">
                👥
              </div>
            </div>
            <div className="mt-3">
              <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#7c3aed]">
                {payables.toLocaleString()} EGP
              </span>
              <div className="text-[10px] text-[#94a3b8] mt-1 flex justify-between">
                <span>To Suppliers</span>
                <span>للموردين</span>
              </div>
            </div>
          </div>

          {/* Card 5: Unpaid Invoices */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#0f2340]">Unpaid Invoices</p>
                <p className="text-[11px] text-[#64748b]">الفواتير غير المدفوعة</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#ffedd5] text-[#ea580c] flex items-center justify-center font-bold text-base shadow-2xs">
                📄
              </div>
            </div>
            <div className="mt-3">
              <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#dc2626]">
                {unpaidInv.toLocaleString()} EGP
              </span>
              <div className="text-[10px] text-[#94a3b8] mt-1 flex justify-between">
                <span>From Customers</span>
                <span>من العملاء</span>
              </div>
            </div>
          </div>

          {/* Card 6: Technician Salaries */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#0f2340]">Technician Salaries</p>
                <p className="text-[11px] text-[#64748b]">رواتب الفنيين</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#dbeafe] text-[#2563eb] flex items-center justify-center font-bold text-base shadow-2xs">
                👥
              </div>
            </div>
            <div className="mt-3">
              <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#2563eb]">
                {techSalaries.toLocaleString()} EGP
              </span>
              <div className="text-[10px] text-[#94a3b8] mt-1 flex justify-between">
                <span>Pending Payments</span>
                <span>قيد السداد</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Middle Row: Charts & Operational Summary (3 Columns) ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Revenue & Profit Trend Chart (5/12 width) */}
          <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[15px] text-[#0f2340] flex items-center gap-2">
                  Revenue & Profit Trend
                  <span className="text-[12px] font-normal text-[#64748b]">معدل الإيرادات والأرباح</span>
                </h3>
              </div>
              <select
                value={trendGrouping}
                onChange={(e) => setTrendGrouping(e.target.value as any)}
                className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-2.5 py-1 text-xs text-[#0f2340] font-medium focus:outline-none cursor-pointer"
              >
                <option value="Daily">Daily (يومي)</option>
                <option value="Weekly">Weekly (أسبوعي)</option>
                <option value="Monthly">Monthly (شهري)</option>
              </select>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mb-4 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2563eb] inline-block"></span>
                <span className="text-[#334155]">Revenue (الإيرادات)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#16a34a] inline-block"></span>
                <span className="text-[#334155]">Net Profit (صافي الربح)</span>
              </div>
            </div>

            {/* SVG Trend Line Chart */}
            <div className="w-full h-[220px] relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 180">
                {/* Y-axis gridlines */}
                {[0, 45, 90, 135].map((y, idx) => (
                  <line key={idx} x1="30" y1={y + 15} x2="390" y2={y + 15} stroke="#f1f5f9" strokeWidth="1.5" />
                ))}

                {/* Y-axis labels */}
                <text x="5" y="20" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">15K</text>
                <text x="5" y="65" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">10K</text>
                <text x="5" y="110" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">5K</text>
                <text x="5" y="155" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">0</text>

                {/* Plot trend lines */}
                {(() => {
                  if (!trendPoints || trendPoints.length === 0) return null;
                  const maxVal = Math.max(15000, ...trendPoints.map((t) => Math.max(t.revenue, t.profit)));
                  const pointsCount = trendPoints.length;
                  const stepX = (390 - 40) / Math.max(1, pointsCount - 1);

                  const revCoords = trendPoints.map((t, idx) => {
                    const x = 40 + idx * stepX;
                    const y = 150 - (t.revenue / maxVal) * 130;
                    return { x, y: Math.max(15, Math.min(150, y)), val: t.revenue, label: t.dateLabel };
                  });

                  const profCoords = trendPoints.map((t, idx) => {
                    const x = 40 + idx * stepX;
                    const y = 150 - (t.profit / maxVal) * 130;
                    return { x, y: Math.max(15, Math.min(150, y)), val: t.profit, label: t.dateLabel };
                  });

                  const revPath = revCoords.reduce((acc, curr, i) => (i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`), "");
                  const profPath = profCoords.reduce((acc, curr, i) => (i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`), "");

                  return (
                    <g>
                      {/* Revenue Line */}
                      <path d={revPath} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
                      {revCoords.map((c, i) => (
                        <circle key={`r-${i}`} cx={c.x} cy={c.y} r="4" fill="#2563eb" stroke="white" strokeWidth="2" />
                      ))}

                      {/* Profit Line */}
                      <path d={profPath} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
                      {profCoords.map((c, i) => (
                        <circle key={`p-${i}`} cx={c.x} cy={c.y} r="4" fill="#16a34a" stroke="white" strokeWidth="2" />
                      ))}

                      {/* X-axis Labels */}
                      {trendPoints.map((t, idx) => {
                        const x = 40 + idx * stepX;
                        return (
                          <text key={`lbl-${idx}`} x={x} y="172" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                            {t.dateLabel}
                          </text>
                        );
                      })}
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Column 2: Expense Breakdown (4/12 width) */}
          <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[15px] text-[#0f2340] flex items-center gap-2">
                Expense Breakdown
                <span className="text-[12px] font-normal text-[#64748b]">توزيع المصروفات</span>
              </h3>
              <span className="text-xs bg-[#f8fafc] border border-[#e2e8f0] px-2.5 py-1 rounded-lg text-[#64748b]">
                {activePeriod}
              </span>
            </div>

            <div className="flex items-center gap-4 my-auto">
              {/* Donut Chart SVG */}
              <div className="w-[140px] h-[140px] relative flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                  {(() => {
                    let cumulativePct = 0;
                    const circumference = 2 * Math.PI * 38; // ~238.76
                    return expenseBreakdown.map((item: any, idx: number) => {
                      const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((cumulativePct / 100) * circumference);
                      cumulativePct += item.percentage;
                      return (
                        <circle
                          key={idx}
                          cx="50"
                          cy="50"
                          r="38"
                          fill="none"
                          stroke={item.color || "#2563eb"}
                          strokeWidth="14"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] text-[#0f2340]">
                    {totalExp.toLocaleString()} EGP
                  </span>
                  <span className="text-[9px] text-[#64748b]">إجمالي المصروفات</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="flex-1 space-y-2.5 text-xs">
                {expenseBreakdown.map((b: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between border-b border-[#f8fafc] pb-1 last:border-0">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }}></span>
                      <span className="text-[#334155] font-medium truncate">{b.categoryEn}</span>
                      <span className="text-[#94a3b8] text-[10px] truncate">({b.categoryAr})</span>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2 font-['JetBrains_Mono:Regular',sans-serif]">
                      <span className="font-semibold text-[#0f2340]">{b.amount.toLocaleString()} EGP</span>
                      <span className="text-[#64748b] text-[11px] ml-1">({b.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Job Orders & Low Stock Overview (3/12 width) */}
          <div className="lg:col-span-3 space-y-5 flex flex-col justify-between">
            {/* Job Orders Overview Card */}
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">Job Orders Overview</h3>
                  <p className="text-[11px] text-[#64748b]">أوامر التشغيل</p>
                </div>
                <button onClick={onViewJobs} className="text-[11px] text-[#1447e6] hover:underline font-semibold cursor-pointer">
                  View All / عرض الكل
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-xl p-2.5 text-center">
                  <div className="w-6 h-6 rounded-lg bg-[#2563eb] text-white mx-auto flex items-center justify-center text-xs mb-1">📋</div>
                  <div className="font-['Inter:Bold',sans-serif] font-bold text-[18px] text-[#1e40af]">{openCount}</div>
                  <div className="text-[11px] font-semibold text-[#1e40af]">Open</div>
                  <div className="text-[9px] text-[#3b82f6]">مفتوحة</div>
                </div>

                <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-2.5 text-center">
                  <div className="w-6 h-6 rounded-lg bg-[#16a34a] text-white mx-auto flex items-center justify-center text-xs mb-1">✓</div>
                  <div className="font-['Inter:Bold',sans-serif] font-bold text-[18px] text-[#166534]">{completedCount}</div>
                  <div className="text-[11px] font-semibold text-[#166534]">Completed</div>
                  <div className="text-[9px] text-[#22c55e]">مكتملة</div>
                </div>

                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-2.5 text-center">
                  <div className="w-6 h-6 rounded-lg bg-[#0f2340] text-white mx-auto flex items-center justify-center text-xs mb-1">📊</div>
                  <div className="font-['Inter:Bold',sans-serif] font-bold text-[18px] text-[#0f2340]">{totalJO}</div>
                  <div className="text-[11px] font-semibold text-[#0f2340]">Total</div>
                  <div className="text-[9px] text-[#64748b]">الإجمالي</div>
                </div>

                <div className="bg-[#fef2f2] border border-[#fee2e2] rounded-xl p-2.5 text-center">
                  <div className="w-6 h-6 rounded-lg bg-[#dc2626] text-white mx-auto flex items-center justify-center text-xs mb-1">🔒</div>
                  <div className="font-['Inter:Bold',sans-serif] font-bold text-[18px] text-[#991b1b]">{closedCount}</div>
                  <div className="text-[11px] font-semibold text-[#991b1b]">Closed</div>
                  <div className="text-[9px] text-[#ef4444]">مغلقة</div>
                </div>
              </div>
            </div>

            {/* Low Stock Items Card */}
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-xs flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">Low Stock Items</h3>
                  <p className="text-[11px] text-[#64748b]">منتجات منخفضة المخزون</p>
                </div>
                <button onClick={onViewParts} className="text-[11px] text-[#1447e6] hover:underline font-semibold cursor-pointer">
                  View All / عرض الكل
                </button>
              </div>

              <div className="space-y-2">
                {lowStockItems.length === 0 ? (
                  <p className="text-xs text-[#94a3b8] text-center py-4">All stock levels are optimal.</p>
                ) : (
                  lowStockItems.slice(0, 3).map((item: any, idx: number) => (
                    <div key={idx} className="bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500 text-sm">⚠️</span>
                        <div>
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#0f2340]">{item.name}</p>
                          <p className="text-[10px] text-[#64748b]">
                            Current: <strong className="text-[#b45309]">{item.currentQty}</strong> | Min: {item.minQty}
                          </p>
                        </div>
                      </div>
                      <span className="bg-[#fee2e2] text-[#991b1b] font-semibold text-[10px] px-2 py-0.5 rounded-full">
                        Low / منخفض
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Tables & Receivables/Payables Panel (3 Columns) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Recent Job Orders Table (5/12 width) */}
          <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-xs">
            <div className="px-5 py-4 border-b border-[#f1f5f9] flex items-center justify-between bg-[#fafbfc]">
              <div>
                <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">Recent Job Orders</h3>
                <p className="text-[11px] text-[#64748b]">آخر أوامر التشغيل</p>
              </div>
              <button onClick={onViewJobs} className="text-[12px] text-[#1447e6] hover:underline font-semibold cursor-pointer">
                View All / عرض الكل
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                    <th className="text-left px-4 py-2.5 font-semibold text-[#64748b]">Job Order</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[#64748b]">Customer</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[#64748b]">Vehicle</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[#64748b]">Status</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[#64748b]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {recentJOs.slice(0, 5).map((jo: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="px-4 py-3 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[#0f2340]">{jo.number}</td>
                      <td className="px-4 py-3 text-[#334155] font-medium">{jo.customerName}</td>
                      <td className="px-4 py-3">
                        <div className="text-[#0f2340] font-medium">{jo.vehicleName}</div>
                        {jo.plate && <div className="text-[10px] text-[#64748b] font-mono">{jo.plate}</div>}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={jo.status} /></td>
                      <td className="px-4 py-3 text-[#64748b]">{jo.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column 2: Recent Invoices Table (4/12 width) */}
          <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-xs">
            <div className="px-5 py-4 border-b border-[#f1f5f9] flex items-center justify-between bg-[#fafbfc]">
              <div>
                <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">Recent Invoices</h3>
                <p className="text-[11px] text-[#64748b]">آخر الفواتير</p>
              </div>
              <button onClick={onViewInvoices || onViewJobs} className="text-[12px] text-[#1447e6] hover:underline font-semibold cursor-pointer">
                View All / عرض الكل
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                    <th className="text-left px-3.5 py-2.5 font-semibold text-[#64748b]">Invoice</th>
                    <th className="text-left px-3.5 py-2.5 font-semibold text-[#64748b]">Customer</th>
                    <th className="text-left px-3.5 py-2.5 font-semibold text-[#64748b]">Amount</th>
                    <th className="text-left px-3.5 py-2.5 font-semibold text-[#64748b]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {recentInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-[#94a3b8]">No invoices recorded yet.</td>
                    </tr>
                  ) : (
                    recentInvoices.slice(0, 5).map((inv: any, idx: number) => (
                      <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                        <td className="px-3.5 py-3 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[#0f2340]">{inv.invoiceNumber}</td>
                        <td className="px-3.5 py-3 text-[#334155] font-medium">{inv.customerName}</td>
                        <td className="px-3.5 py-3 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[#0f2340]">
                          {inv.amount.toLocaleString()} EGP
                        </td>
                        <td className="px-3.5 py-3">
                          <PaymentStatusBadge status={inv.paymentStatus} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column 3: Receivables & Payables Panel (3/12 width) */}
          <div className="lg:col-span-3 bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[15px] text-[#0f2340]">Receivables & Payables</h3>
              <p className="text-[12px] text-[#64748b]">المديونيات والمستحقات</p>
            </div>

            <div className="space-y-4 my-auto">
              {/* Customer Receivables Card */}
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-7 h-7 rounded-lg bg-[#16a34a] text-white flex items-center justify-center text-xs">💳</span>
                    <div>
                      <p className="font-['Inter:Bold',sans-serif] font-bold text-[13px] text-[#166534]">Customer Receivables</p>
                      <p className="text-[10px] text-[#15803d]">مستحقات العملاء</p>
                    </div>
                  </div>
                  <div className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#166534] mt-2">
                    {receivables.toLocaleString()} EGP
                  </div>
                  <p className="text-[10px] text-[#16a34a] mt-0.5">Unpaid Invoices / فواتير غير مدفوعة</p>
                </div>
              </div>

              {/* Supplier Payables Card */}
              <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-7 h-7 rounded-lg bg-[#dc2626] text-white flex items-center justify-center text-xs">💸</span>
                    <div>
                      <p className="font-['Inter:Bold',sans-serif] font-bold text-[13px] text-[#991b1b]">Supplier Payables</p>
                      <p className="text-[10px] text-[#b91c1c]">مستحقات الموردين</p>
                    </div>
                  </div>
                  <div className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#991b1b] mt-2">
                    {payables.toLocaleString()} EGP
                  </div>
                  <p className="text-[10px] text-[#ef4444] mt-0.5">Outstanding Balance / الرصيد المستحق</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Owner: Reports ───────────────────────────────────────────────────────────

function OwnerReportsScreen({ jobOrders, parts, movements }: {
  jobOrders: { number: string; customer: string; vehicle: string; plate: string; status: string; type?: string }[];
  parts: WPart[];
  movements: WMovement[];
}) {
  const [reportType, setReportType] = useState("job-orders");

  const reportTypes = [
    { id: "job-orders", label: "Job Orders" },
    { id: "inventory", label: "Inventory" },
    { id: "stock-movements", label: "Stock Movements" },
  ];

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          {reportTypes.map((r) => (
            <button
              key={r.id}
              onClick={() => setReportType(r.id)}
              className={`px-4 py-2 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[13px] transition-colors ${reportType === r.id ? "bg-[#0f2340] text-white" : "bg-white border border-[#e5e7eb] text-[#364153] hover:bg-[#f9fafb]"}`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {reportType === "job-orders" && (
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828] tracking-[0.6px] uppercase">Job Orders Report</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">{jobOrders.length} total records</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Job Order</th>
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Customer</th>
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Vehicle</th>
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {jobOrders.map((jo) => (
                  <tr key={jo.number} className="border-b border-[#f3f4f6] last:border-0">
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#0f2340]">{jo.number}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{jo.customer}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{jo.vehicle} · <span className="font-['JetBrains_Mono:Regular',sans-serif] text-[11px] text-[#99a1af]">{jo.plate}</span></td>
                    <td className="px-4 py-3"><StatusBadge status={jo.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reportType === "inventory" && (
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828] tracking-[0.6px] uppercase">Inventory Report</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">{parts.length} parts tracked</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part</th>
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Number</th>
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Category</th>
                  <th className="text-right px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Min</th>
                  <th className="text-right px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Available</th>
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((p) => (
                  <tr key={p.id} className="border-b border-[#f3f4f6] last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{p.name}</p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#6a7282]">{p.brand}</p>
                    </td>
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{p.number}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{p.category}</td>
                    <td className="px-4 py-3 text-right font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{p.minQty}</td>
                    <td className={`px-4 py-3 text-right font-['Inter:Bold',sans-serif] font-bold text-[13px] ${p.currentQty <= 0 ? "text-[#e7000b]" : p.currentQty <= p.minQty ? "text-[#e17100]" : "text-[#101828]"}`}>{p.currentQty}</td>
                    <td className="px-4 py-3"><WStockBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reportType === "stock-movements" && (
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828] tracking-[0.6px] uppercase">Stock Movements Report</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">{movements.length} movements recorded</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Part</th>
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Type</th>
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Reference</th>
                  <th className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Date</th>
                  <th className="text-right px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Qty</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((m, i) => (
                  <tr key={i} className="border-b border-[#f3f4f6] last:border-0">
                    <td className="px-4 py-3 font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{m.part}</td>
                    <td className="px-4 py-3"><WTypeBadge type={m.type} /></td>
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{m.reference}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{m.date}</td>
                    <td className={`px-4 py-3 text-right font-['Inter:Bold',sans-serif] font-bold text-[13px] ${m.qty > 0 ? "text-[#008236]" : "text-[#e7000b]"}`}>{m.qty > 0 ? `+${m.qty}` : m.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Owner: Users ─────────────────────────────────────────────────────────────

interface OUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "Engineer" | "Technician" | "Warehouse" | "Accountant";
  status: "Active" | "Disabled";
  lastActivity: string;
  created: string;
}

const SEED_USERS: OUser[] = [];

function OwnerUsersScreen() {
  const [users, setUsers] = useState<OUser[]>(SEED_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editingUser, setEditingUser] = useState<OUser | null>(null);
  const [changingPasswordUser, setChangingPasswordUser] = useState<OUser | null>(null);

  const fetchUsers = () => {
    api.getUsers()
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data as OUser[]);
        }
      })
      .catch((err) => console.error("Failed to load users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q);
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  function toggleStatus(id: string) {
    api.toggleUserStatus(id)
      .then(() => fetchUsers())
      .catch(() => {
        setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" } : u));
      });
  }

  const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236a7282' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`;

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="flex-1 max-w-[360px] h-10 px-4 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none focus:border-[#0f2340] transition-colors"
          />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="h-10 pl-3 pr-8 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153] outline-none appearance-none cursor-pointer" style={{ backgroundImage: chevron, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}>
            <option value="All">All Roles</option>
            <option>Engineer</option>
            <option>Warehouse</option>
            <option>Accountant</option>
            <option>Owner</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 pl-3 pr-8 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153] outline-none appearance-none cursor-pointer" style={{ backgroundImage: chevron, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}>
            <option value="All">All Status</option>
            <option>Active</option>
            <option>Disabled</option>
          </select>
          <div className="flex-1" />
          <button onClick={() => setShowAdd(true)} className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] px-5 py-2 rounded-lg hover:bg-[#1a3560] transition-colors h-10 whitespace-nowrap">
            + Add User
          </button>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">User</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Role</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Status</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Last Activity</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Created</th>
                <th className="px-4 py-3 text-right font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-[#f3f4f6] last:border-0">
                  <td className="px-4 py-4">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{u.name}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{u.email}</p>
                    <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">{u.phone}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-[#f3f4f6] text-[#364153] font-['Inter:Medium',sans-serif] font-medium text-[12px] px-2.5 py-1 rounded-full">{u.role}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] px-2.5 py-0.5 rounded-full ${u.status === "Active" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#f3f4f6] text-[#6a7282]"}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-4 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{u.lastActivity}</td>
                  <td className="px-4 py-4 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">{u.created}</td>
                  <td className="px-4 py-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingUser(u)}
                      className="font-['Inter:Medium',sans-serif] font-medium text-[12px] px-2.5 py-1 rounded border border-[#e5e7eb] text-[#364153] hover:bg-[#f9fafb] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setChangingPasswordUser(u)}
                      className="font-['Inter:Medium',sans-serif] font-medium text-[12px] px-2.5 py-1 rounded border border-[#e5e7eb] text-[#4f46e5] hover:bg-[#f5f3ff] transition-colors"
                    >
                      Password
                    </button>
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`font-['Inter:Medium',sans-serif] font-medium text-[12px] px-2.5 py-1 rounded border transition-colors ${u.status === "Active" ? "border-[#d1d5dc] text-[#6a7282] hover:bg-[#f9fafb]" : "border-[#0f2340] text-[#0f2340] hover:bg-[#f0f4ff]"}`}
                    >
                      {u.status === "Active" ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddUserModal
          onClose={() => setShowAdd(false)}
          onSuccess={() => { fetchUsers(); setShowAdd(false); }}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => { fetchUsers(); setEditingUser(null); }}
        />
      )}

      {changingPasswordUser && (
        <ChangePasswordModal
          user={changingPasswordUser}
          onClose={() => setChangingPasswordUser(null)}
          onSuccess={() => { setChangingPasswordUser(null); alert("Password reset successfully!"); }}
        />
      )}
    </div>
  );
}

function EditUserModal({ user, onClose, onSuccess }: { user: OUser; onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<string>(user.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.updateUser(user.id, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        role,
      });
      onSuccess();
    } catch (err: any) {
      setError(err?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  }

  const labelCls = "font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase";
  const inputCls = "w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[480px] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6]">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#111827]">Edit User</h2>
          <button onClick={onClose} className="text-[#6a7282] hover:text-[#111827] text-[22px] leading-none">×</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className={labelCls}>Name <span className="text-red-500">*</span></label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={`${inputCls} mt-1`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className={`${inputCls} mt-1`} />
            </div>
            <div>
              <label className={labelCls}>Email <span className="text-red-500">*</span></label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} mt-1`} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className={`${inputCls} mt-1`}>
              <option>Engineer</option>
              <option>Warehouse</option>
              <option>Accountant</option>
              <option>Owner</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-[#e5e7eb]">
          <button
            onClick={handleSave}
            disabled={loading || !name.trim() || !email.trim()}
            className={`flex-1 py-2.5 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors ${!loading && name.trim() && email.trim() ? "bg-[#0f2340] text-white hover:bg-[#1a3560]" : "bg-[#d1d5dc] text-[#6a7282] cursor-not-allowed"}`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button onClick={onClose} className="px-5 py-2.5 border border-[#e5e7eb] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ChangePasswordModal({ user, onClose, onSuccess }: { user: OUser; onClose: () => void; onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!password) {
      setError("Password cannot be empty.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.changeUserPassword(user.id, password);
      onSuccess();
    } catch (err: any) {
      setError(err?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  const labelCls = "font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase";
  const inputCls = "w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[400px] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6]">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#111827]">Reset Password</h2>
          <button onClick={onClose} className="text-[#6a7282] hover:text-[#111827] text-[22px] leading-none">×</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="text-[13px] text-[#475569]">Set a new password for <strong>{user.name}</strong> ({user.email}).</p>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className={labelCls}>New Password <span className="text-red-500">*</span></label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" className={`${inputCls} mt-1 font-mono`} />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-[#e5e7eb]">
          <button
            onClick={handleSave}
            disabled={loading || !password}
            className={`flex-1 py-2.5 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors ${!loading && password ? "bg-[#0f2340] text-white hover:bg-[#1a3560]" : "bg-[#d1d5dc] text-[#6a7282] cursor-not-allowed"}`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
          <button onClick={onClose} className="px-5 py-2.5 border border-[#e5e7eb] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function AddUserModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("Engineer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!name.trim() || !email.trim() || !password) {
      setError("Name, email, and password are required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.createUser({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        role,
        password
      });
      onSuccess();
    } catch (err: any) {
      setError(err?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  }

  const labelCls = "font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase";
  const inputCls = "w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[480px] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6]">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#111827]">Add User</h2>
          <button onClick={onClose} className="text-[#6a7282] hover:text-[#111827] text-[22px] leading-none">×</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className={labelCls}>Name <span className="text-red-500">*</span></label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={`${inputCls} mt-1`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01012345678" className={`${inputCls} mt-1`} />
            </div>
            <div>
              <label className={labelCls}>Email <span className="text-red-500">*</span></label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@starauto.com" className={`${inputCls} mt-1`} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Password <span className="text-red-500">*</span></label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`${inputCls} mt-1 font-mono`} />
            </div>
            <div>
              <label className={labelCls}>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className={`${inputCls} mt-1`}>
                <option>Engineer</option>
                <option>Warehouse</option>
                <option>Accountant</option>
                <option>Owner</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-[#e5e7eb]">
          <button
            onClick={handleSave}
            disabled={loading || !name.trim() || !email.trim() || !password}
            className={`flex-1 py-2.5 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors ${!loading && name.trim() && email.trim() && password ? "bg-[#0f2340] text-white hover:bg-[#1a3560]" : "bg-[#d1d5dc] text-[#6a7282] cursor-not-allowed"}`}
          >
            {loading ? "Adding..." : "Add User"}
          </button>
          <button onClick={onClose} className="px-5 py-2.5 border border-[#e5e7eb] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Owner: Settings ──────────────────────────────────────────────────────────

function OwnerPlaceholderScreen({ title, description }: { title: string; description: string }) {
  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 max-w-[720px]">
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-10 flex flex-col items-center justify-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#f3f4f6] flex items-center justify-center mb-2">
            <span className="text-[24px] text-[#6a7282]">◧</span>
          </div>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828]">{title}</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282] max-w-[320px]">{description}</p>
        </div>
      </div>
    </div>
  );
}

function OwnerSettingsScreen({
  settings,
  onSettingsUpdated,
}: {
  settings?: WorkshopSettings | null;
  onSettingsUpdated?: (updated: WorkshopSettings) => void;
}) {
  const [companyName, setCompanyName] = useState(settings?.companyName || "SOS Motor Works");
  const [address, setAddress] = useState(settings?.address || "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة");
  const [phone, setPhone] = useState(settings?.phone || "+20 100 933 4747");
  const [email, setEmail] = useState(settings?.email || "info@sosmotorworks.com");
  const [currency, setCurrency] = useState(settings?.currency || "EGP");
  const [logoUrl, setLogoUrl] = useState<string | null>(settings?.logoUrl ?? null);

  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setCompanyName(settings.companyName || "");
      setAddress(settings.address || "");
      setPhone(settings.phone || "");
      setEmail(settings.email || "");
      setCurrency(settings.currency || "EGP");
      setLogoUrl(settings.logoUrl ?? null);
    } else {
      api.getWorkshopSettings().then((data) => {
        if (data) {
          setCompanyName(data.companyName || "");
          setAddress(data.address || "");
          setPhone(data.phone || "");
          setEmail(data.email || "");
          setCurrency(data.currency || "EGP");
          setLogoUrl(data.logoUrl ?? null);
          onSettingsUpdated?.(data);
        }
      }).catch((err) => {
        console.warn("Could not load workshop settings:", err);
      });
    }
  }, [settings]);

  const labelCls = "font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase";
  const inputCls = "w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors";

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await api.uploadWorkshopLogo(file);
      setLogoUrl(res.logoUrl);
      if (onSettingsUpdated) {
        onSettingsUpdated({
          id: settings?.id || 1,
          companyName,
          address,
          phone,
          email,
          currency,
          logoUrl: res.logoUrl,
        });
      }
      setSuccessMsg("✓ Logo uploaded and saved successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to upload logo. Please check file type and size.");
    } finally {
      setUploadingLogo(false);
      e.target.value = "";
    }
  }

  async function handleRemoveLogo() {
    if (!confirm("Are you sure you want to remove the workshop logo?")) return;
    setUploadingLogo(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await api.deleteWorkshopLogo();
      setLogoUrl(null);
      if (onSettingsUpdated) {
        onSettingsUpdated({
          id: settings?.id || 1,
          companyName,
          address,
          phone,
          email,
          currency,
          logoUrl: undefined,
        });
      }
      setSuccessMsg("✓ Logo removed successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to remove logo.");
    } finally {
      setUploadingLogo(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim()) {
      setErrorMsg("Company / Workshop Name is required.");
      return;
    }

    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const updated = await api.updateWorkshopSettings({
        companyName: companyName.trim(),
        address: address.trim(),
        phone: phone.trim(),
        email: email.trim(),
        currency: currency.trim() || "EGP",
      });
      onSettingsUpdated?.(updated);
      setSuccessMsg("✓ Workshop Branding settings saved successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const fullLogoUrl = logoUrl ? (logoUrl.startsWith("http") ? logoUrl : `${API_ORIGIN}${logoUrl}`) : null;

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 max-w-[720px]">
        {/* Success Banner */}
        {successMsg && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm animate-fadeIn">
            <span>✓</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMsg && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Workshop Branding Form */}
        <form onSubmit={handleSave} className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-4 border-b border-[#f3f4f6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] text-[#101828]">Workshop Branding</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">
              Persistent company information displayed on printed invoices and throughout the system.
            </p>
          </div>
          <div className="px-5 py-5 space-y-4">
            {/* Logo Upload Section */}
            <div>
              <label className={labelCls}>Workshop Logo</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="w-20 h-20 rounded-[8px] border border-[#e5e7eb] bg-black flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                  {fullLogoUrl ? (
                    <img src={fullLogoUrl} alt="Workshop Logo" className="w-full h-full object-contain" />
                  ) : (
                    <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-white/70">
                      {companyName ? companyName.slice(0, 2).toUpperCase() : "SOS"}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className={`cursor-pointer bg-white border border-[#d1d5dc] text-[#364153] font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors inline-block text-center ${uploadingLogo ? "opacity-50 pointer-events-none" : ""}`}>
                    {uploadingLogo ? "Uploading..." : fullLogoUrl ? "Replace Logo" : "Upload Logo"}
                    <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
                  </label>
                  {fullLogoUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      disabled={uploadingLogo}
                      className="text-[12px] text-[#e7000b] hover:underline text-left font-['Inter:Regular',sans-serif] disabled:opacity-50"
                    >
                      Remove logo
                    </button>
                  )}
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">
                  PNG, JPG, WEBP or SVG. Max 5MB.<br />Automatically saved to SQL Server and persistent storage.
                </p>
              </div>
            </div>

            {/* Company / Workshop Name */}
            <div>
              <label className={labelCls}>Company / Workshop Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. SOS Motor Works"
                className={`${inputCls} mt-1`}
              />
            </div>

            {/* Phone Number & Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +20 100 933 4747"
                  className={`${inputCls} mt-1`}
                />
              </div>
              <div>
                <label className={labelCls}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. info@sosmotorworks.com"
                  className={`${inputCls} mt-1`}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className={labelCls}>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Workshop physical address"
                className={`${inputCls} mt-1`}
              />
            </div>

            {/* Currency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={`${inputCls} mt-1 cursor-pointer`}>
                  <option value="EGP">EGP — Egyptian Pound</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="SAR">SAR — Saudi Riyal</option>
                  <option value="AED">AED — UAE Dirham</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] px-6 py-2.5 rounded-lg hover:bg-[#1a3560] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer shadow-sm flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="animate-spin text-xs">⏳</span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Print Templates Section */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[#f3f4f6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">Print Templates</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">Template configuration for printed documents.</p>
          </div>
          <div className="px-5 py-4 space-y-3">
            {[
              { label: "Job Order Print Template", desc: "Template used when printing Job Orders" },
              { label: "Invoice Print Template", desc: "A4 professional template dynamically powered by Workshop Branding" },
            ].map((t) => (
              <div key={t.label} className="flex items-center justify-between py-2 border-b border-[#f3f4f6] last:border-0">
                <div>
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{t.label}</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{t.desc}</p>
                </div>
                <span className="text-[12px] text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Accountant: Sidebar ─────────────────────────────────────────────────────

// ─── Accountant: Dashboard ────────────────────────────────────────────────────

function AccountantDashboardScreen({
  jobOrders,
  joDetails,
  invoices,
  wJobPartsMap,
  wParts,
  onReviewJob,
  onViewInvoice,
  onNavToInvoices,
  onNavToJobs,
  onNavToExpenses,
}: {
  jobOrders: { number: string; customer: string; vehicle: string; plate: string; status: string }[];
  joDetails: Record<string, JoDetail>;
  invoices: Invoice[];
  wJobPartsMap: Record<string, WIssuedPart[]>;
  wParts: WPart[];
  onReviewJob: (jo: JoDetail) => void;
  onViewInvoice: (inv: Invoice) => void;
  onNavToInvoices: (filter?: string) => void;
  onNavToJobs: (filter?: string) => void;
  onNavToExpenses?: () => void;
}) {
  const [expenseSummary, setExpenseSummary] = useState<{
    totalToday: number;
    totalThisMonth: number;
    totalThisYear: number;
    totalAllTime: number;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    api.getExpensesSummary()
      .then((data) => {
        if (mounted && data) setExpenseSummary(data);
      })
      .catch((err) => console.error("Failed to load expense summary:", err));
    return () => { mounted = false; };
  }, []);

  const completeJobs = jobOrders.filter((j) => j.status === "Complete");
  const closedJobs   = jobOrders.filter((j) => j.status === "Closed");
  const unpaidInvoices = invoices.filter((inv) => inv.paymentStatus !== "Paid");
  const outstandingAmount = unpaidInvoices.reduce((s, inv) => {
    const paid = (inv.payments ?? []).reduce((ps, p) => ps + p.amount, 0);
    return s + Math.max(0, inv.grandTotal - paid);
  }, 0);
  const totalRevenue = invoices.reduce((s, inv) => {
    const paid = (inv.payments ?? []).reduce((ps, p) => ps + p.amount, 0);
    return s + paid;
  }, 0);

  const priceMap = Object.fromEntries(wParts.map((p) => [p.id, p.sellingPrice]));

  function getPartsTotal(joNum: string) {
    return (wJobPartsMap[joNum] ?? []).reduce((s, p) => s + p.qty * (priceMap[p.partId] ?? 0), 0);
  }

  const kpiCards = [
    { label: "Total Revenue", value: `${totalRevenue.toLocaleString()} EGP`, sub: "from paid invoices", onClick: () => onNavToInvoices("Paid") },
    { label: "Complete Jobs", value: completeJobs.length, sub: "awaiting invoice", onClick: () => onNavToJobs("Complete") },
    { label: "Closed Jobs", value: closedJobs.length, sub: "invoiced", onClick: () => onNavToJobs("Closed") },
    { label: "Total Invoices", value: invoices.length, sub: "all time", onClick: () => onNavToInvoices() },
    { label: "Unpaid Invoices", value: unpaidInvoices.length, sub: "requires follow-up", onClick: () => onNavToInvoices("Unpaid"), highlight: unpaidInvoices.length > 0 },
    { label: "Outstanding Amount", value: `${outstandingAmount.toLocaleString()} EGP`, sub: "total unpaid", onClick: () => onNavToInvoices("Unpaid") },
    { label: "Expenses This Month", value: `${(expenseSummary?.totalThisMonth ?? 0).toLocaleString()} EGP`, sub: "operating expenses", onClick: onNavToExpenses, isExpense: true },
    { label: "Expenses Today", value: `${(expenseSummary?.totalToday ?? 0).toLocaleString()} EGP`, sub: "operating expenses", onClick: onNavToExpenses, isExpense: true },
  ];

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpiCards.map((card) => (
            <button
              key={card.label}
              onClick={card.onClick}
              className={`text-left bg-white border rounded-xl p-5 hover:shadow-sm transition-shadow ${
                card.highlight 
                  ? "border-amber-200 bg-amber-50/40" 
                  : (card as any).isExpense 
                    ? "border-rose-100 hover:border-rose-300 bg-white"
                    : "border-[#e5e7eb]"
              }`}
            >
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-2">{card.label}</p>
              <p className={`font-['Inter:Semi_Bold',sans-serif] font-semibold text-[26px] leading-none mb-1 ${
                card.highlight 
                  ? "text-amber-700" 
                  : (card as any).isExpense
                    ? "text-rose-700"
                    : "text-[#0f2340]"
              }`}>{card.value}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{card.sub}</p>
            </button>
          ))}
        </div>

        {/* Jobs Waiting for Invoice */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f3f4f6] flex items-center justify-between">
            <div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">Jobs Waiting for Invoice</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">Completed jobs pending invoice creation</p>
            </div>
            {completeJobs.length > 0 && (
              <span className="bg-amber-50 border border-amber-200 text-amber-700 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] px-2.5 py-0.5 rounded-full">{completeJobs.length} pending</span>
            )}
          </div>
          {completeJobs.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#99a1af]">No completed jobs awaiting invoice.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                  {["Job Order #", "Customer", "Vehicle", "Parts Total", "Labor", "Expenses", "Grand Total", "Action"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {completeJobs.map((jo) => {
                  const detail = resolveJoDetail(jo.number, jo, joDetails);
                  const partsTotal = getPartsTotal(jo.number);
                  const labor = detail.laborItems && detail.laborItems.length > 0
                    ? detail.laborItems.reduce((s,l)=>{const n=parseFloat(l.amount);return s+(isNaN(n)||n<0?0:n);},0)
                    : (detail.laborAmount ?? 0);
                  const expTotal = (detail.additionalExpenses ?? []).reduce((s, e) => { const n = parseFloat(e.amount); return s + (isNaN(n) || n < 0 ? 0 : n); }, 0);
                  const grand = partsTotal + labor + expTotal;
                  return (
                    <tr key={jo.number} className="border-b border-[#f3f4f6] last:border-0">
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#0f2340]">{jo.number}</td>
                      <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{jo.customer}</td>
                      <td className="px-4 py-3">
                        <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{jo.vehicle}</p>
                        <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">{jo.plate}</p>
                      </td>
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{partsTotal.toLocaleString()} EGP</td>
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{labor.toLocaleString()} EGP</td>
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{expTotal.toLocaleString()} EGP</td>
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#0f2340] font-semibold">{grand.toLocaleString()} EGP</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => detail && onReviewJob(detail)}
                          className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#1447e6] hover:underline whitespace-nowrap"
                        >
                          Review & Create Invoice →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent Invoices */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f3f4f6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">Recent Invoices</p>
          </div>
          {invoices.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#99a1af]">No invoices created yet.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                  {["Invoice #", "Job Order #", "Customer", "Vehicle", "Date", "Grand Total", "Payment Status", "Action"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...invoices].reverse().slice(0, 8).map((inv) => (
                  <tr key={inv.invoiceNumber} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb]">
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#0f2340]">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{inv.jobOrderNumber}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{inv.customerName}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{inv.vehicleName}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{inv.date}</td>
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#0f2340] font-semibold">{inv.grandTotal.toLocaleString()} EGP</td>
                    <td className="px-4 py-3"><PaymentStatusBadge status={inv.paymentStatus} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => onViewInvoice(inv)} className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#1447e6] hover:underline">View →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Accountant: Invoices List ────────────────────────────────────────────────

function PaymentStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Paid:            "bg-[#f0fdf4] border-[#bbf7d0] text-[#008236]",
    "Partially Paid":"bg-amber-50 border-amber-200 text-amber-700",
    Unpaid:          "bg-red-50 border-red-200 text-red-600",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[12px] font-['Inter:Semi_Bold',sans-serif] font-semibold ${map[status] ?? "bg-[#f3f4f6] border-[#e5e7eb] text-[#6a7282]"}`}>
      {status}
    </span>
  );
}

function AccountantInvoicesScreen({
  invoices,
  onViewInvoice,
  initialFilter,
}: {
  invoices: Invoice[];
  onViewInvoice: (inv: Invoice) => void;
  initialFilter?: string;
}) {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState(initialFilter ?? "All");

  const filtered = invoices.filter((inv) => {
    const q = search.toLowerCase();
    const matchSearch = !q
      || (inv.invoiceNumber || "").toLowerCase().includes(q)
      || (inv.customerName || (inv as any).customer || "").toLowerCase().includes(q)
      || (inv.jobOrderNumber || "").toLowerCase().includes(q);
    const matchPay = paymentFilter === "All" || inv.paymentStatus === paymentFilter;
    return matchSearch && matchPay;
  });

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-[380px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#99a1af]">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice #, customer, job order…"
              className="w-full bg-white border border-[#d1d5dc] rounded-[6px] pl-9 pr-4 py-2 text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] placeholder:text-[#99a1af] outline-none focus:border-[#0f2340]"
            />
          </div>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-white border border-[#e5e7eb] rounded-[8px] h-[40px] px-4 text-[14px] font-['Inter:Regular',sans-serif] text-[#111827] outline-none cursor-pointer"
          >
            {["All", "Unpaid", "Partially Paid", "Paid"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                {["Invoice #", "Job Order #", "Customer", "Vehicle", "Date", "Parts", "Labor", "Expenses", "Grand Total", "Payment", "Action"].map((h) => (
                  <th key={h} className="text-left px-3 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={11} className="px-4 py-10 text-center font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#99a1af]">No invoices found.</td></tr>
              ) : [...filtered].reverse().map((inv) => (
                <tr key={inv.invoiceNumber} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb]">
                  <td className="px-3 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#0f2340]">{inv.invoiceNumber}</td>
                  <td className="px-3 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{inv.jobOrderNumber}</td>
                  <td className="px-3 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{inv.customerName}</td>
                  <td className="px-3 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{inv.vehicleName}</td>
                  <td className="px-3 py-3 font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{inv.date}</td>
                  <td className="px-3 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{(inv.partsTotal ?? 0).toLocaleString()}</td>
                  <td className="px-3 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{(inv.laborAmount ?? 0).toLocaleString()}</td>
                  <td className="px-3 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{(inv.expensesTotal ?? 0).toLocaleString()}</td>
                  <td className="px-3 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#0f2340] font-semibold">{(inv.grandTotal ?? 0).toLocaleString()} EGP</td>
                  <td className="px-3 py-3"><PaymentStatusBadge status={inv.paymentStatus} /></td>
                  <td className="px-3 py-3">
                    <button onClick={() => onViewInvoice(inv)} className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#1447e6] hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Invoice Payment Modal ──────────────────────────────────────────────────

function InvoicePaymentModal({
  invoice,
  onClose,
  onConfirm,
}: {
  invoice: Invoice;
  onClose: () => void;
  onConfirm: (rows: { method: InvoicePaymentMethod; amount: number; reference: string }[]) => void;
}) {
  type Row = { id: string; method: InvoicePaymentMethod; amount: string; reference: string };
  const alreadyPaid = (invoice.payments ?? []).reduce((s, p) => s + p.amount, 0);
  const remaining = invoice.grandTotal - alreadyPaid;
  const [rows, setRows] = useState<Row[]>([{ id: `row-${Date.now()}`, method: "Cash", amount: "", reference: "" }]);
  const [error, setError] = useState("");
  const newTotal = rows.reduce((s, r) => { const n = parseFloat(r.amount); return s + (isNaN(n) || n <= 0 ? 0 : n); }, 0);
  const newTotalPaid = alreadyPaid + newTotal;
  const newRemaining = invoice.grandTotal - newTotalPaid;
  function derivePayStatus(paid: number): string {
    if (paid <= 0) return "Unpaid";
    if (paid >= invoice.grandTotal) return "Paid";
    return "Partially Paid";
  }
  function addRow() { setRows(prev => [...prev, { id: `row-${Date.now()}`, method: "Cash", amount: "", reference: "" }]); }
  function removeRow(id: string) { setRows(prev => prev.filter(r => r.id !== id)); }
  function updateRow(id: string, field: keyof Omit<Row, "id">, value: string) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  }
  function handleConfirm() {
    setError("");
    const validRows = rows.filter(r => parseFloat(r.amount) > 0);
    if (validRows.length === 0) { setError("Please add at least one payment amount greater than 0."); return; }
    if (newTotal > remaining + 0.001) { setError(`Payment exceeds remaining balance by ${(newTotal - remaining).toLocaleString(undefined, {maximumFractionDigits: 2})} EGP.`); return; }
    onConfirm(validRows.map(r => ({ method: r.method, amount: parseFloat(r.amount), reference: r.reference.trim() })));
  }
  const statusColor: Record<string, string> = { "Paid": "text-[#008236]", "Partially Paid": "text-amber-700", "Unpaid": "text-red-600" };
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[560px] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-[#1a3560] bg-[#0f2340]">
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-white">Record Payment</p>
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-white/60 mt-0.5">{invoice.invoiceNumber}</p>
        </div>
        <div className="px-6 pt-5 pb-4 grid grid-cols-3 gap-3">
          {([
            { label: "Invoice Total", value: invoice.grandTotal.toLocaleString() + " EGP", color: "text-[#101828]" },
            { label: "Already Paid", value: alreadyPaid.toLocaleString() + " EGP", color: "text-[#008236]" },
            { label: "Remaining", value: remaining.toLocaleString() + " EGP", color: remaining <= 0 ? "text-[#6a7282]" : "text-amber-700" },
          ]).map(c => (
            <div key={c.label} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-3 text-center">
              <p className="font-['Inter:Regular',sans-serif] text-[10px] text-[#6a7282] tracking-[0.5px] uppercase mb-1">{c.label}</p>
              <p className={`font-['JetBrains_Mono:Regular',sans-serif] font-bold text-[14px] ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>
        <div className="px-6 pb-2 space-y-2 max-h-[240px] overflow-y-auto">
          <div className="grid grid-cols-[130px_1fr_1fr_28px] gap-2 px-1">
            {["Method", "Amount (EGP)", "Reference / Notes", ""].map(h => (
              <span key={h} className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-[#6a7282] tracking-[0.5px] uppercase">{h}</span>
            ))}
          </div>
          {rows.map(row => (
            <div key={row.id} className="grid grid-cols-[130px_1fr_1fr_28px] gap-2 items-center">
              <select value={row.method} onChange={e => updateRow(row.id, "method", e.target.value)}
                className="h-9 px-2 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] text-[13px] text-[#101828] outline-none focus:border-[#0f2340] bg-white cursor-pointer">
                {(["Cash","Visa","InstaPay","Wallet"] as InvoicePaymentMethod[]).map(m => <option key={m}>{m}</option>)}
              </select>
              <input type="number" min="0.01" step="any" value={row.amount} onChange={e => updateRow(row.id, "amount", e.target.value)}
                placeholder="0" className="h-9 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] text-[13px] text-[#101828] outline-none focus:border-[#0f2340] text-right" />
              <input type="text" value={row.reference} onChange={e => updateRow(row.id, "reference", e.target.value)}
                placeholder="Optional…" className="h-9 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] text-[13px] text-[#101828] outline-none focus:border-[#0f2340] placeholder:text-[#99a1af]" />
              <button onClick={() => removeRow(row.id)} className="w-7 h-7 flex items-center justify-center text-[#d1d5dc] hover:text-[#e7000b] transition-colors text-[18px]" title="Remove">×</button>
            </div>
          ))}
          <button onClick={addRow} className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#1447e6] hover:underline mt-1">+ Add Payment Method</button>
        </div>
        <div className="mx-6 my-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-4 space-y-1.5">
          {([
            ["This Payment Total", newTotal.toLocaleString() + " EGP", "text-[#364153]"],
            ["Total Paid After", newTotalPaid.toLocaleString() + " EGP", "text-[#364153] font-semibold"],
            ["Remaining After", Math.max(0, newRemaining).toLocaleString() + " EGP", newRemaining <= 0 ? "text-[#008236] font-semibold" : "text-amber-700 font-semibold"],
          ] as [string,string,string][]).map(([label, val, cls]) => (
            <div key={label} className="flex justify-between">
              <span className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">{label}</span>
              <span className={`font-['JetBrains_Mono:Regular',sans-serif] text-[13px] ${cls}`}>{val}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-[#e5e7eb] pt-1.5 mt-1">
            <span className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">New Status</span>
            <span className={`font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] ${statusColor[derivePayStatus(newTotalPaid)] ?? ""}`}>{derivePayStatus(newTotalPaid)}</span>
          </div>
        </div>
        {error && (
          <div className="mx-6 mb-3 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-['Inter:Regular',sans-serif] text-[13px] text-red-600">{error}</p>
          </div>
        )}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-[#e5e7eb] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] transition-colors">Cancel</button>
          <button onClick={handleConfirm} className="flex-1 py-2.5 bg-[#0f2340] text-white rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] hover:bg-[#1a3560] transition-colors shadow-sm">Confirm Payment</button>
        </div>
      </div>
    </div>
  );
}

// ─── Accountant: Invoice Details + Print ─────────────────────────────────────

function PrintInvoiceView({ inv, settings }: { inv: Invoice; settings?: WorkshopSettings | null }) {
  const validExpenses = inv.additionalExpenses.filter((e) => e.description.trim() && parseFloat(e.amount) > 0);
  const invPayments = inv.payments ?? [];
  const totalPaid = invPayments.reduce((s, p) => s + p.amount, 0);
  const remaining = Math.max(0, inv.grandTotal - totalPaid);
  const printPayStatus = totalPaid <= 0 ? "UNPAID" : totalPaid >= inv.grandTotal ? "PAID" : "PARTIALLY PAID";
  const printPayColor = totalPaid <= 0 ? "#e7000b" : totalPaid >= inv.grandTotal ? "#008236" : "#d97706";

  const companyName = settings?.companyName || "SOS Motor Works";
  const address = settings?.address || "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة";
  const phone = settings?.phone || "+20 100 933 4747";
  const logoUrl = settings?.logoUrl;
  const fullLogoUrl = logoUrl ? (logoUrl.startsWith("http") ? logoUrl : `${API_ORIGIN}${logoUrl}`) : null;

  // Compute labor total from labor items array if present
  const laborTotal = inv.laborItems && inv.laborItems.length > 0
    ? inv.laborItems.reduce((s, l) => { const n = parseFloat(l.amount); return s + (isNaN(n) || n < 0 ? 0 : n); }, 0)
    : (inv.laborAmount ?? 0);

  const expTotal = validExpenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
  const computedGrand = inv.partsTotal + laborTotal + expTotal;
  const grandTotal = computedGrand > 0 ? computedGrand : inv.grandTotal;

  const s: Record<string, React.CSSProperties> = {
    page: { width: "210mm", minHeight: "297mm", margin: "0 auto", padding: "10mm 12mm 8mm", fontFamily: "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif", boxSizing: "border-box", background: "white", color: "#101828", fontSize: "12px", display: "flex", flexDirection: "column" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2.5px solid #0f2340", paddingBottom: "6mm", marginBottom: "5mm" },
    logoBox: { width: "44px", height: "44px", borderRadius: "6px", background: "#0f2340", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 },
    sectionLabel: { fontSize: "8px", fontWeight: 700, color: "#6a7282", letterSpacing: "0.8px", textTransform: "uppercase" as const, marginBottom: "3px" },
    metaGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4mm", marginBottom: "5mm" },
    metaCard: { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "3mm 4mm" },
    tbl: { width: "100%", borderCollapse: "collapse" as const, fontSize: "11px" },
    th: { background: "#0f2340", color: "white", fontWeight: 600, fontSize: "9px", padding: "5px 7px", textAlign: "left" as const, letterSpacing: "0.3px" },
    thR: { background: "#0f2340", color: "white", fontWeight: 600, fontSize: "9px", padding: "5px 7px", textAlign: "right" as const, letterSpacing: "0.3px" },
    td: { padding: "5px 7px", color: "#101828", borderBottom: "1px solid #f3f4f6", verticalAlign: "top" as const },
    tdR: { padding: "5px 7px", color: "#101828", textAlign: "right" as const, borderBottom: "1px solid #f3f4f6", whiteSpace: "nowrap" as const },
  };

  return (
    <div style={s.page}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={s.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {fullLogoUrl ? (
            <div style={s.logoBox}>
              <img src={fullLogoUrl} alt={companyName} crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          ) : (
            <div style={s.logoBox}>
              <span style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>{companyName.slice(0, 2).toUpperCase()}</span>
            </div>
          )}
          <div>
            <div style={{ fontWeight: 700, fontSize: "18px", color: "#0f2340", lineHeight: "1.2" }}>{companyName}</div>
            {phone && <div style={{ fontSize: "11px", color: "#364153", marginTop: "2px" }}>{phone}</div>}
            {address && <div style={{ fontSize: "10px", color: "#6a7282", marginTop: "2px", maxWidth: "100mm", lineHeight: "1.3" }} dir="rtl">{address}</div>}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#0f2340", lineHeight: "1" }}>INVOICE</div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#364153", marginTop: "4px" }}>{inv.invoiceNumber}</div>
          <div style={{ fontSize: "10px", color: "#6a7282", marginTop: "2px" }}>Date: {inv.date}</div>
          <div style={{ fontSize: "10px", color: "#6a7282", marginTop: "1px" }}>Job Order: {inv.jobOrderNumber}</div>
        </div>
      </div>

      {/* ── Customer / Vehicle / Job ─────────────────────────────── */}
      <div style={s.metaGrid}>
        <div style={s.metaCard}>
          <div style={s.sectionLabel}>BILLED TO</div>
          <div style={{ fontWeight: 600, fontSize: "13px", color: "#101828" }}>{inv.customerName}</div>
          <div style={{ fontSize: "11px", color: "#6a7282", marginTop: "2px" }}>{inv.customerPhone}</div>
        </div>
        <div style={s.metaCard}>
          <div style={s.sectionLabel}>VEHICLE</div>
          <div style={{ fontWeight: 600, fontSize: "13px", color: "#101828" }}>{inv.vehicleName}</div>
          <div style={{ fontSize: "11px", color: "#6a7282", marginTop: "2px" }}>Plate: {inv.vehiclePlate}</div>
          {inv.vehicleVin && <div style={{ fontSize: "10px", color: "#99a1af", fontFamily: "monospace", marginTop: "1px" }}>{inv.vehicleVin}</div>}
          {inv.vehicleKm && <div style={{ fontSize: "10px", color: "#6a7282", marginTop: "1px" }}>{inv.vehicleKm}</div>}
        </div>
        <div style={s.metaCard}>
          <div style={s.sectionLabel}>JOB ORDER</div>
          <div style={{ fontWeight: 600, fontSize: "13px", color: "#0f2340", fontFamily: "monospace" }}>{inv.jobOrderNumber}</div>
          {inv.engineer && <div style={{ fontSize: "10px", color: "#6a7282", marginTop: "4px" }}>Engineer: {inv.engineer}</div>}
        </div>
      </div>

      {/* ── Parts ─────────────────────────────────────────────────── */}
      {inv.issuedParts.length > 0 && (
        <div style={{ marginBottom: "4mm" }}>
          <div style={{ ...s.sectionLabel, marginBottom: "2mm", fontSize: "9px" }}>PARTS USED</div>
          <table style={s.tbl}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Part Name</th>
                <th style={s.th}>Part Number</th>
                <th style={s.thR}>Qty</th>
                <th style={s.thR}>Unit Price</th>
                <th style={s.thR}>Total</th>
              </tr>
            </thead>
            <tbody>
              {inv.issuedParts.map((p, i) => {
                const unit = inv.partsPriceMap[p.partId] ?? 0;
                return (
                  <tr key={p.partId} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                    <td style={{ ...s.td, color: "#99a1af", width: "18px" }}>{i + 1}</td>
                    <td style={{ ...s.td, fontWeight: 500 }}>{p.partName}</td>
                    <td style={{ ...s.td, fontFamily: "monospace", fontSize: "10px", color: "#6a7282" }}>{p.partNumber}</td>
                    <td style={{ ...s.tdR, width: "30px" }}>{p.qty}</td>
                    <td style={{ ...s.tdR, width: "70px" }}>{unit.toLocaleString()} EGP</td>
                    <td style={{ ...s.tdR, fontWeight: 600, width: "75px" }}>{(p.qty * unit).toLocaleString()} EGP</td>
                  </tr>
                );
              })}
              <tr style={{ background: "#f3f4f6" }}>
                <td colSpan={5} style={{ ...s.td, fontWeight: 600, fontSize: "11px", color: "#364153", borderTop: "1px solid #e5e7eb", borderBottom: "none" }}>Parts Subtotal</td>
                <td style={{ ...s.tdR, fontWeight: 700, borderTop: "1px solid #e5e7eb", borderBottom: "none" }}>{inv.partsTotal.toLocaleString()} EGP</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ── Labor ─────────────────────────────────────────────────── */}
      {laborTotal > 0 && (
        <div style={{ marginBottom: "4mm" }}>
          <div style={{ ...s.sectionLabel, marginBottom: "2mm", fontSize: "9px" }}>LABOR / WORKMANSHIP</div>
          <table style={s.tbl}>
            <thead>
              <tr>
                <th style={s.th}>Description</th>
                <th style={s.thR}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {inv.laborItems && inv.laborItems.length > 0 ? (
                <>
                  {inv.laborItems.filter(l => parseFloat(l.amount) > 0).map((l, i) => (
                    <tr key={l.id} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                      <td style={s.td} dir="rtl">{l.description}</td>
                      <td style={{ ...s.tdR }}>{(parseFloat(l.amount) || 0).toLocaleString()} EGP</td>
                    </tr>
                  ))}
                  <tr style={{ background: "#f3f4f6" }}>
                    <td style={{ ...s.td, fontWeight: 600, fontSize: "11px", color: "#364153", borderTop: "1px solid #e5e7eb", borderBottom: "none" }}>Labor Total</td>
                    <td style={{ ...s.tdR, fontWeight: 700, borderTop: "1px solid #e5e7eb", borderBottom: "none" }}>{laborTotal.toLocaleString()} EGP</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td style={s.td}>Labor / Workmanship</td>
                  <td style={{ ...s.tdR, fontWeight: 600 }}>{laborTotal.toLocaleString()} EGP</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Additional Expenses ───────────────────────────────────── */}
      {validExpenses.length > 0 && (
        <div style={{ marginBottom: "4mm" }}>
          <div style={{ ...s.sectionLabel, marginBottom: "2mm", fontSize: "9px" }}>ADDITIONAL EXPENSES</div>
          <table style={s.tbl}>
            <thead>
              <tr>
                <th style={s.th}>Description</th>
                <th style={s.thR}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {validExpenses.map((e, i) => (
                <tr key={e.id} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={s.td}>{e.description}</td>
                  <td style={{ ...s.tdR }}>{(parseFloat(e.amount) || 0).toLocaleString()} EGP</td>
                </tr>
              ))}
              <tr style={{ background: "#f3f4f6" }}>
                <td style={{ ...s.td, fontWeight: 600, fontSize: "11px", color: "#364153", borderTop: "1px solid #e5e7eb", borderBottom: "none" }}>Expenses Total</td>
                <td style={{ ...s.tdR, fontWeight: 700, borderTop: "1px solid #e5e7eb", borderBottom: "none" }}>{expTotal.toLocaleString()} EGP</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ── Grand Total ─────────────────────────────────────────────── */}
      <div style={{ border: "2px solid #0f2340", borderRadius: "7px", overflow: "hidden", marginBottom: "4mm" }}>
        <div style={{ padding: "4px 10px", background: "#f9fafb" }}>
          {[
            ["Parts Used", inv.partsTotal],
            ["Labor / Workmanship", laborTotal],
            ...(expTotal > 0 ? [["Additional Expenses", expTotal]] : []),
          ].map(([label, val]) => (
            <div key={String(label)} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: "11px", color: "#6a7282", borderBottom: "1px solid #f0f0f0" }}>
              <span>{label}</span>
              <span>{Number(val).toLocaleString()} EGP</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#0f2340", display: "flex", justifyContent: "space-between", padding: "8px 12px" }}>
          <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>GRAND TOTAL</span>
          <span style={{ color: "white", fontWeight: 700, fontSize: "17px" }}>{grandTotal.toLocaleString()} EGP</span>
        </div>
      </div>

      {/* ── Payment Summary ─────────────────────────────────────────── */}
      <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "5px 10px", marginBottom: "4mm", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "10px", color: "#6a7282", fontWeight: 600 }}>Payment Status:</span>
          <span style={{ fontSize: "11px", fontWeight: 700, color: printPayColor, padding: "1px 8px", background: printPayColor + "18", borderRadius: "4px", border: `1px solid ${printPayColor}40` }}>{printPayStatus}</span>
        </div>
        <div style={{ display: "flex", gap: "16px", fontSize: "11px" }}>
          <span style={{ color: "#364153" }}>Total Paid: <strong>{totalPaid.toLocaleString()} EGP</strong></span>
          {remaining > 0 && <span style={{ color: "#d97706" }}>Remaining: <strong>{remaining.toLocaleString()} EGP</strong></span>}
        </div>
      </div>

      {/* Payment Method Breakdown if paid */}
      {invPayments.length > 0 && (
        <div style={{ marginBottom: "4mm", fontSize: "10px", color: "#6a7282", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {invPayments.map((p, i) => (
            <span key={i} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "4px", padding: "2px 8px" }}>
              {p.method}: {p.amount.toLocaleString()} EGP
            </span>
          ))}
        </div>
      )}

      {/* ── Signatures ─────────────────────────────────────────────── */}
      <div style={{ marginTop: "auto", paddingTop: "5mm", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20mm" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ borderTop: "1px solid #0f2340", marginTop: "20px", paddingTop: "4px" }}>
              <span style={{ fontSize: "10px", color: "#6a7282" }}>Authorized Signature</span>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ borderTop: "1px solid #0f2340", marginTop: "20px", paddingTop: "4px" }}>
              <span style={{ fontSize: "10px", color: "#6a7282" }}>Customer Acknowledgment</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "5mm", fontSize: "9px", color: "#99a1af" }}>
          {companyName} · {phone} · Thank you for your business
        </div>
      </div>
    </div>
  );
}

function AccountantInvoiceDetailsScreen({
  invoice,
  settings,
  onBack,
  onOpenJobOrder,
  onRecordPayment,
}: {
  invoice: Invoice;
  settings?: WorkshopSettings | null;
  onBack: () => void;
  onOpenJobOrder: (joNum: string) => void;
  onRecordPayment?: (rows: { method: InvoicePaymentMethod; amount: number; reference: string }[]) => void;
}) {
  const [showPrint, setShowPrint] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const validExpenses = (invoice.additionalExpenses ?? []).filter((e) => e && e.description && e.description.trim() && parseFloat(e.amount) > 0);
  // Payment derived values
  const payments = invoice.payments ?? [];
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);
  const remaining = invoice.grandTotal - totalPaid;
  const paymentStatus: string = totalPaid <= 0 ? "Unpaid" : totalPaid >= invoice.grandTotal ? "Paid" : "Partially Paid";
  const methodTotals: Record<InvoicePaymentMethod, number> = { Cash: 0, Visa: 0, InstaPay: 0, Wallet: 0 };
  payments.forEach(p => { methodTotals[p.method] = (methodTotals[p.method] ?? 0) + p.amount; });

  if (showPrint) {
    return (
      <div className="print-invoice-page ml-[168px] mt-14 bg-[#e5e7eb] p-6 print:ml-0 print:mt-0 print:bg-white print:p-0 print:min-h-0">
        <div className="no-print flex items-center gap-3 mb-5">
          <button
            onClick={() => window.print()}
            className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#1a3560] transition-colors cursor-pointer shadow-sm"
          >
            🖨️ Print / Save PDF
          </button>
          <button
            onClick={() => setShowPrint(false)}
            className="border border-[#e5e7eb] bg-white text-[#364153] font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors cursor-pointer shadow-sm"
          >
            ← Back to Invoice
          </button>
        </div>
        <PrintInvoiceView inv={invoice} settings={settings} />
      </div>
    );
  }

  return (
    <div className="ml-[168px] mt-14 min-h-screen bg-[#f3f4f6] p-6 pb-16">
      <button onClick={onBack} className="flex items-center gap-1.5 text-[#6a7282] hover:text-[#364153] mb-4 transition-colors">
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px]">← Back to Invoices</span>
      </button>

      {/* Invoice heading */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">{invoice.invoiceNumber}</span>
            <PaymentStatusBadge status={invoice.paymentStatus} />
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">{invoice.date}</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">
            Job Order:{" "}
            <button onClick={() => onOpenJobOrder(invoice.jobOrderNumber)} className="text-[#1447e6] hover:underline font-['Inter:Medium',sans-serif]">
              {invoice.jobOrderNumber}
            </button>
          </p>
        </div>
        <button
          onClick={() => setShowPrint(true)}
          className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2.5 rounded-lg hover:bg-[#1a3560] transition-colors"
        >
          Print Invoice
        </button>
      </div>

      <div className="space-y-4">
        {/* Customer + Vehicle */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">Customer</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828] mb-1">{invoice.customerName}</p>
            <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">{invoice.customerPhone}</p>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">Vehicle</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828] mb-1">{invoice.vehicleName}</p>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#4a5565] bg-[#f3f4f6] px-1.5 py-0.5 rounded">{invoice.vehiclePlate}</span>
              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{invoice.vehicleKm}</span>
            </div>
            <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[10px] text-[#99a1af]">{invoice.vehicleVin}</p>
          </div>
        </div>

        {/* Parts */}
        {invoice.issuedParts.length > 0 && (
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Parts</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                  {["#", "Part", "Part Number", "Qty", "Unit Price", "Total"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoice.issuedParts.map((p, i) => {
                  const unit = invoice.partsPriceMap[p.partId] ?? 0;
                  return (
                    <tr key={p.partId} className="border-b border-[#f3f4f6] last:border-0">
                      <td className="px-4 py-3 font-['Inter:Regular',sans-serif] text-[13px] text-[#99a1af]">{i + 1}</td>
                      <td className="px-4 py-3 font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{p.partName}</td>
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[11px] text-[#6a7282]">{p.partNumber}</td>
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[13px] text-[#364153]">{p.qty}</td>
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[13px] text-[#364153]">{unit.toLocaleString()} EGP</td>
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[13px] text-[#101828] font-semibold">{(p.qty * unit).toLocaleString()} EGP</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="grid grid-cols-[1fr_auto] px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#364153]">Parts Subtotal</span>
              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#101828] font-semibold">{(invoice.partsTotal ?? 0).toLocaleString()} EGP</span>
            </div>
          </div>
        )}

        {/* Labor - detailed items in system view */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f3f4f6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Labor / Workmanship</p>
          </div>
          {invoice.laborItems && invoice.laborItems.length > 0 ? (
            <div className="divide-y divide-[#f3f4f6]">
              {invoice.laborItems.map((li) => (
                <div key={li.id} className="flex items-center justify-between px-5 py-3">
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#101828]" dir="rtl">{li.description}</span>
                  <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{(parseFloat(li.amount)||0).toLocaleString()} EGP</span>
                </div>
              ))}
              <div className="grid grid-cols-[1fr_auto] px-5 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#364153]">Total Labor / Workmanship</span>
                <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#101828] font-semibold">{(invoice.laborAmount ?? 0).toLocaleString()} EGP</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#101828]">Workshop Labor</span>
              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#101828] font-semibold">{(invoice.laborAmount ?? 0).toLocaleString()} EGP</span>
            </div>
          )}
        </div>

        {/* Additional Expenses */}
        {validExpenses.length > 0 && (
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Additional Expenses</p>
            </div>
            <div className="divide-y divide-[#f3f4f6]">
              {validExpenses.map((e) => (
                <div key={e.id} className="flex items-center justify-between px-5 py-3">
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#101828]">{e.description}</span>
                  <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{(parseFloat(e.amount) || 0).toLocaleString()} EGP</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[1fr_auto] px-5 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#364153]">Additional Expenses Total</span>
              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[14px] text-[#101828] font-semibold">{(invoice.expensesTotal ?? 0).toLocaleString()} EGP</span>
            </div>
          </div>
        )}

        {/* Invoice Summary */}
        <div className="bg-[#0f2340] rounded-xl p-5">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-white/50 tracking-[0.6px] uppercase mb-3">Invoice Summary</p>
          <div className="space-y-2 mb-4">
            {[
              ["Parts Subtotal", invoice.partsTotal ?? 0],
              ["Labor / Workmanship", invoice.laborAmount ?? 0],
              ...(((invoice.expensesTotal ?? 0) > 0) ? [["Additional Expenses", invoice.expensesTotal ?? 0]] : []),
            ].map(([label, val]) => (
              <div key={String(label)} className="flex justify-between">
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-white/60">{label}</span>
                <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-white/80">{Number(val || 0).toLocaleString()} EGP</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/20 pt-3 flex justify-between">
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-white">Grand Total</span>
            <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[20px] text-white font-semibold">{(invoice.grandTotal ?? 0).toLocaleString()} EGP</span>
          </div>
        </div>

        {/* Payment Status Card */}
        <div className={`rounded-xl p-5 border ${paymentStatus === "Paid" ? "bg-[#f0fdf4] border-[#bbf7d0]" : paymentStatus === "Partially Paid" ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-2">Payment Status</p>
              <PaymentStatusBadge status={paymentStatus} />
            </div>
            {paymentStatus !== "Paid" && onRecordPayment && (
              <button onClick={() => setShowPayModal(true)}
                className="px-4 py-2 bg-[#0f2340] text-white font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] rounded-lg hover:bg-[#1a3560] transition-colors shadow-sm">
                Record Payment →
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Invoice Total", value: invoice.grandTotal ?? 0, color: "text-[#101828]" },
              { label: "Total Paid", value: totalPaid, color: "text-[#008236]" },
              { label: "Remaining", value: Math.max(0, remaining), color: remaining <= 0 ? "text-[#6a7282]" : "text-amber-700" },
            ].map(c => (
              <div key={c.label}>
                <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#6a7282] mb-0.5">{c.label}</p>
                <p className={`font-['JetBrains_Mono:Regular',sans-serif] font-bold text-[15px] ${c.color}`}>{Number(c.value || 0).toLocaleString()} EGP</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Breakdown by Method */}
        {payments.length > 0 && (
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Payment Breakdown</p>
            </div>
            <div className="px-5 py-4 grid grid-cols-2 gap-3">
              {(["Cash","Visa","InstaPay","Wallet"] as InvoicePaymentMethod[]).map(method => {
                const amt = methodTotals[method] ?? 0;
                const icons: Record<string,string> = { Cash: "💵", Visa: "💳", InstaPay: "📱", Wallet: "👜" };
                return (
                  <div key={method} className={`flex items-center justify-between p-3 rounded-lg border ${amt > 0 ? "bg-[#f9fafb] border-[#e5e7eb]" : "bg-white border-[#f3f4f6] opacity-40"}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-[16px]">{icons[method]}</span>
                      <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#364153]">{method}</span>
                    </div>
                    <span className={`font-['JetBrains_Mono:Regular',sans-serif] font-bold text-[13px] ${amt > 0 ? "text-[#0f2340]" : "text-[#99a1af]"}`}>{amt.toLocaleString()} EGP</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Payment History */}
        {payments.length > 0 ? (
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6] flex items-center justify-between">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Payment History</p>
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#364153]">{payments.length} transaction{payments.length !== 1 ? "s" : ""}</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                  {["Date","Method","Amount","Reference","By"].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-[#6a7282] tracking-[0.6px] uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map(p => {
                  const methodIcon: Record<string,string> = { Cash: "💵", Visa: "💳", InstaPay: "📱", Wallet: "👜" };
                  return (
                    <tr key={p.id} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">{p.date}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">
                          <span>{methodIcon[p.method]}</span>{p.method}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[13px] text-[#0f2340] font-semibold">{p.amount.toLocaleString()} EGP</td>
                      <td className="px-4 py-3 font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">{p.reference || "—"}</td>
                      <td className="px-4 py-3 font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">{p.createdBy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="grid grid-cols-[1fr_auto] px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#364153]">Total Paid</span>
              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-bold text-[14px] text-[#008236]">{totalPaid.toLocaleString()} EGP</span>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828] mb-0.5">No Payments Recorded</p>
              <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">This invoice has not been paid yet.</p>
            </div>
            {onRecordPayment && (
              <button onClick={() => setShowPayModal(true)}
                className="px-4 py-2 bg-[#0f2340] text-white font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] rounded-lg hover:bg-[#1a3560] transition-colors shadow-sm">
                Record Payment →
              </button>
            )}
          </div>
        )}

      </div>

      {showPayModal && onRecordPayment && (
        <InvoicePaymentModal
          invoice={invoice}
          onClose={() => setShowPayModal(false)}
          onConfirm={(rows) => { onRecordPayment(rows); setShowPayModal(false); }}
        />
      )}
    </div>
  );
}

// ─── Accountant: Payments Report ─────────────────────────────────────────

function AccountantPaymentsScreen({ invoices }: { invoices: Invoice[] }) {
  const [methodFilter, setMethodFilter] = useState<"All" | InvoicePaymentMethod>("All");
  const [search, setSearch] = useState("");

  // Flatten all payment transactions from all invoices
  const allTransactions: (InvoicePayment & { invoiceNumber: string; jobOrderNumber: string; customerName: string })[] = [];
  invoices.forEach(inv => {
    (inv.payments ?? []).forEach(p => {
      allTransactions.push({ ...p, invoiceNumber: inv.invoiceNumber, jobOrderNumber: inv.jobOrderNumber, customerName: inv.customerName });
    });
  });

  // Sort newest first
  allTransactions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const filtered = allTransactions.filter(t => {
    const matchMethod = methodFilter === "All" || t.method === methodFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || t.invoiceNumber.toLowerCase().includes(q) || t.customerName.toLowerCase().includes(q) || t.jobOrderNumber.toLowerCase().includes(q);
    return matchMethod && matchSearch;
  });

  const methodTotals: Record<string, number> = { Cash: 0, Visa: 0, InstaPay: 0, Wallet: 0 };
  allTransactions.forEach(t => { methodTotals[t.method] = (methodTotals[t.method] ?? 0) + t.amount; });
  const grandTotal = Object.values(methodTotals).reduce((s, v) => s + v, 0);

  const methodIcons: Record<string, string> = { Cash: "💵", Visa: "💳", InstaPay: "📱", Wallet: "👜" };
  const methodColors: Record<string, string> = { Cash: "text-[#008236]", Visa: "text-[#1447e6]", InstaPay: "text-[#7c3aed]", Wallet: "text-amber-700" };

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 space-y-5">

        {/* Summary Cards */}
        <div className="grid grid-cols-5 gap-4">
          {(["Cash","Visa","InstaPay","Wallet"] as InvoicePaymentMethod[]).map(method => (
            <button key={method}
              onClick={() => setMethodFilter(prev => prev === method ? "All" : method)}
              className={`text-left bg-white border rounded-xl p-4 hover:shadow-sm transition-all ${methodFilter === method ? "border-[#0f2340] ring-2 ring-[#0f2340]/10" : "border-[#e5e7eb]"}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[18px]">{methodIcons[method]}</span>
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.5px] uppercase">{method}</span>
              </div>
              <p className={`font-['JetBrains_Mono:Regular',sans-serif] font-bold text-[18px] ${methodColors[method]}`}>{(methodTotals[method] ?? 0).toLocaleString()}</p>
              <p className="font-['Inter:Regular',sans-serif] text-[11px] text-[#99a1af] mt-0.5">EGP</p>
            </button>
          ))}
          <div className="bg-[#0f2340] rounded-xl p-4">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-white/50 tracking-[0.5px] uppercase mb-2">Grand Total</p>
            <p className="font-['JetBrains_Mono:Regular',sans-serif] font-bold text-[18px] text-white">{grandTotal.toLocaleString()}</p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-white/40 mt-0.5">EGP</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-[380px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#99a1af]">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by invoice #, customer, job order…"
              className="w-full bg-white border border-[#d1d5dc] rounded-[6px] pl-9 pr-4 py-2 text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] placeholder:text-[#99a1af] outline-none focus:border-[#0f2340]" />
          </div>
          <select value={methodFilter} onChange={e => setMethodFilter(e.target.value as "All" | InvoicePaymentMethod)}
            className="bg-white border border-[#e5e7eb] rounded-[8px] h-[40px] px-4 text-[14px] font-['Inter:Regular',sans-serif] text-[#111827] outline-none cursor-pointer">
            {["All","Cash","Visa","InstaPay","Wallet"].map(s => <option key={s}>{s}</option>)}
          </select>
          <span className="font-['Inter:Regular',sans-serif] text-[13px] text-[#6a7282]">{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                {["Date","Invoice #","Job Order #","Customer","Method","Amount","Reference","By"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-[#6a7282] tracking-[0.6px] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-10 text-center font-['Inter:Regular',sans-serif] text-[14px] text-[#99a1af]">No payment transactions found.</td></tr>
              ) : filtered.map(t => (
                <tr key={t.id} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb]">
                  <td className="px-4 py-3 font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">{t.date}</td>
                  <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[12px] text-[#0f2340]">{t.invoiceNumber}</td>
                  <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[12px] text-[#6a7282]">{t.jobOrderNumber}</td>
                  <td className="px-4 py-3 font-['Inter:Regular',sans-serif] text-[13px] text-[#364153]">{t.customerName}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">
                      <span>{methodIcons[t.method]}</span>{t.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[13px] text-[#0f2340] font-semibold">{t.amount.toLocaleString()} EGP</td>
                  <td className="px-4 py-3 font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">{t.reference || "—"}</td>
                  <td className="px-4 py-3 font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">{t.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length > 0 && (
            <div className="px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb] flex justify-between">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#364153]">
                {methodFilter === "All" ? "Total Collected" : `${methodFilter} Total`}
              </span>
              <span className="font-['JetBrains_Mono:Regular',sans-serif] font-bold text-[14px] text-[#0f2340]">
                {filtered.reduce((s, t) => s + t.amount, 0).toLocaleString()} EGP
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Unified Local Calendar Date & Weekly Payroll Functions ─────────────────
export {
  formatDateLocal,
  parseLocalDate,
  getTodayLocalDateString,
  getPayrollWeekStart,
  getPayrollWeekEnd,
  getPayrollWeekDates,
  isSunday,
  type PayrollWeekDay,
};

// ─── Staff & Payroll Components ───────────────────────────────────────────────

function PaySalaryModal({
  technician,
  unpaidBalance,
  onClose,
  onConfirm,
}: {
  technician: Technician;
  unpaidBalance: number;
  onClose: () => void;
  onConfirm: (amount: number, date: string, method: "Cash" | "Bank Transfer" | "Cheque" | "Other", notes?: string) => void;
}) {
  const [amount, setAmount] = useState(unpaidBalance > 0 ? unpaidBalance.toString() : "0");
  const [date, setDate] = useState(() => getTodayLocalDateString());
  const [method, setMethod] = useState<"Cash" | "Bank Transfer" | "Cheque" | "Other">("Cash");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const numAmount = parseFloat(amount) || 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (numAmount <= 0) {
      setError("Please enter a payment amount greater than 0.");
      return;
    }
    if (numAmount > unpaidBalance) {
      setError(`Payment amount cannot exceed current unpaid balance of ${unpaidBalance.toLocaleString()} EGP.`);
      return;
    }
    onConfirm(numAmount, date, method, notes.trim() || undefined);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#e2e8f0]">
        <div className="bg-[#0f2340] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[16px]">💵</span>
            <div>
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Record Salary Payment</h3>
              <p className="text-[12px] text-white/70">{technician.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-[20px] font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Current Unpaid Balance</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-amber-700">
                {unpaidBalance.toLocaleString()} EGP
              </p>
            </div>
            <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">
              Pending
            </span>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">
              Payment Amount (EGP) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.01"
                max={unpaidBalance}
                step="any"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                className="w-full h-11 px-3 border border-[#cbd5e1] rounded-lg font-['JetBrains_Mono:Bold',sans-serif] text-[16px] text-[#0f2340] outline-none focus:border-[#0f2340]"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#94a3b8]">EGP</span>
            </div>
            {unpaidBalance > 0 && (
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => { setAmount(unpaidBalance.toString()); setError(""); }}
                  className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                >
                  Pay Full ({unpaidBalance.toLocaleString()} EGP)
                </button>
                {unpaidBalance >= 1000 && (
                  <button
                    type="button"
                    onClick={() => { setAmount("1000"); setError(""); }}
                    className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                  >
                    1,000 EGP
                  </button>
                )}
                {unpaidBalance >= 500 && (
                  <button
                    type="button"
                    onClick={() => { setAmount("500"); setError(""); }}
                    className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                  >
                    500 EGP
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                Payment Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-[#0f2340]"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                Payment Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full h-10 px-2.5 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-[#0f2340] bg-white"
              >
                <option value="Cash">Cash (خزينة الورشة)</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
                <option value="Other">Other / Wallet</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
              Notes / Reference (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Weekly salary payout, cash disburse..."
              className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-[#0f2340]"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg">{error}</p>
          )}

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] text-[#64748b] hover:text-[#1e293b] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={unpaidBalance <= 0}
              className={`px-5 py-2.5 rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] transition-colors shadow-sm ${
                unpaidBalance > 0
                  ? "bg-[#0f2340] text-white hover:bg-[#1a3560]"
                  : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
              }`}
            >
              Confirm Salary Payment (-{numAmount.toLocaleString()} EGP)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddAdvanceModal({
  technician,
  unpaidBalance,
  onClose,
  onConfirm,
}: {
  technician: Technician;
  unpaidBalance: number;
  onClose: () => void;
  onConfirm: (amount: number, date: string, method: "Cash" | "Bank Transfer" | "Cheque" | "Other", notes?: string) => void;
}) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => getTodayLocalDateString());
  const [method, setMethod] = useState<"Cash" | "Bank Transfer" | "Cheque" | "Other">("Cash");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const numAmount = parseFloat(amount) || 0;
  const isExceeding = numAmount > unpaidBalance;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanAmount = parseFloat(amount);
    if (!amount.trim() || isNaN(cleanAmount) || cleanAmount <= 0) {
      setError("Please enter a valid advance amount greater than 0 EGP.");
      return;
    }
    onConfirm(cleanAmount, date, method, notes.trim() || undefined);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#e2e8f0]">
        <div className="bg-amber-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-[16px]">💳</span>
            <div>
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Record Technician Advance</h3>
              <p className="text-[12px] text-white/80">{technician.name} (سلفة نقدية)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-[20px] font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Current Balance Before Advance</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#0f2340]">
                {unpaidBalance.toLocaleString()} EGP
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Balance After</p>
              <p className={`font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[16px] ${unpaidBalance - numAmount < 0 ? "text-red-600" : "text-amber-700"}`}>
                {(unpaidBalance - numAmount).toLocaleString()} EGP
              </p>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">
              Advance Amount (EGP) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.01"
                step="any"
                placeholder="Enter advance amount (e.g. 1, 25, 137, 300, 2500.50)"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                className="w-full h-11 px-3 border border-[#cbd5e1] rounded-lg font-['JetBrains_Mono:Bold',sans-serif] text-[16px] text-[#0f2340] outline-none focus:border-amber-600"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#94a3b8]">EGP</span>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {[50, 100, 250, 500, 1000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => { setAmount(preset.toString()); setError(""); }}
                  className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                >
                  +{preset.toLocaleString()} EGP
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                Advance Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-amber-600"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                Disbursement Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full h-10 px-2.5 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-amber-600 bg-white"
              >
                <option value="Cash">Cash (خزينة الورشة)</option>
                <option value="Bank Transfer">Bank Transfer (تحويل بنكي)</option>
                <option value="Other">Vodafone Cash / Wallet</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
              Notes / Reason (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Emergency family expense, mid-week advance..."
              className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-amber-600"
            />
          </div>

          {isExceeding && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-[12px] text-amber-900 flex items-start gap-2">
              <span className="text-[16px] shrink-0">⚠️</span>
              <p>
                <strong>Notice:</strong> Advance amount ({numAmount.toLocaleString()} EGP) exceeds current balance ({unpaidBalance.toLocaleString()} EGP). The technician balance will become <strong>-{(numAmount - unpaidBalance).toLocaleString()} EGP</strong>.
              </p>
            </div>
          )}

          {error && (
            <p className="text-[12px] text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg">{error}</p>
          )}

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] text-[#64748b] hover:text-[#1e293b] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] transition-colors shadow-sm"
            >
              Confirm Advance (-{numAmount.toLocaleString()} EGP)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SettleAdvanceModal({
  technician,
  outstandingAdvance,
  availableSalary,
  onClose,
  onConfirm,
}: {
  technician: Technician;
  outstandingAdvance: number;
  availableSalary: number;
  onClose: () => void;
  onConfirm: (amount: number, date: string, notes?: string) => void;
}) {
  const maxAllowed = Math.min(outstandingAdvance, Math.max(0, availableSalary));
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => getTodayLocalDateString());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const numAmount = parseFloat(amount) || 0;
  const salaryRemaining = Math.max(0, availableSalary - numAmount);
  const advanceRemaining = Math.max(0, outstandingAdvance - numAmount);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanAmount = parseFloat(amount);
    if (!amount.trim() || isNaN(cleanAmount) || cleanAmount <= 0) {
      setError("Please enter a valid positive settlement amount greater than 0.");
      return;
    }
    if (cleanAmount > outstandingAdvance) {
      setError(`Settlement amount (${cleanAmount.toLocaleString()} EGP) cannot exceed outstanding advance of ${outstandingAdvance.toLocaleString()} EGP.`);
      return;
    }
    if (cleanAmount > availableSalary) {
      setError(`Settlement amount (${cleanAmount.toLocaleString()} EGP) cannot exceed available salary of ${availableSalary.toLocaleString()} EGP.`);
      return;
    }
    onConfirm(cleanAmount, date, notes.trim() || undefined);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#e2e8f0]">
        {/* Header */}
        <div className="bg-[#0f2340] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-[16px]">🔄</span>
            <div>
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Settle Advance</h3>
              <p className="text-[12px] text-white/80">{technician.name} (تسوية سلفة من الراتب)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-[20px] font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Outstanding Advance & Available Salary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#fffbeb] border border-amber-200 rounded-xl p-3">
              <p className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider">Outstanding Advance</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-amber-900">
                {outstandingAdvance.toLocaleString()} EGP
              </p>
            </div>
            <div className="bg-[#f0fdf4] border border-emerald-200 rounded-xl p-3">
              <p className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider">Available Salary</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-emerald-900">
                {availableSalary.toLocaleString()} EGP
              </p>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider">
                Settlement Amount (EGP) <span className="text-red-500">*</span>
              </label>
              {maxAllowed > 0 && (
                <span className="text-[11px] text-[#64748b]">Max allowed: {maxAllowed.toLocaleString()} EGP</span>
              )}
            </div>
            <div className="relative">
              <input
                type="number"
                min="0.01"
                step="any"
                placeholder="Enter any amount (e.g. 1, 50, 137, 2000, 3000.50)"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                className="w-full h-11 px-3 border border-[#cbd5e1] rounded-lg font-['JetBrains_Mono:Bold',sans-serif] text-[16px] text-[#0f2340] outline-none focus:border-[#0f2340]"
                required
                autoFocus
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#94a3b8]">EGP</span>
            </div>
            {maxAllowed > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => { setAmount(maxAllowed.toString()); setError(""); }}
                  className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                >
                  Full Settlement ({maxAllowed.toLocaleString()} EGP)
                </button>
                {maxAllowed >= 2000 && (
                  <button
                    type="button"
                    onClick={() => { setAmount("2000"); setError(""); }}
                    className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                  >
                    2,000 EGP
                  </button>
                )}
                {maxAllowed >= 1000 && (
                  <button
                    type="button"
                    onClick={() => { setAmount("1000"); setError(""); }}
                    className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                  >
                    1,000 EGP
                  </button>
                )}
                {maxAllowed >= 500 && (
                  <button
                    type="button"
                    onClick={() => { setAmount("500"); setError(""); }}
                    className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                  >
                    500 EGP
                  </button>
                )}
              </div>
            )}
          </div>

          {/* After Settlement Preview */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3.5 space-y-2">
            <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">After Settlement</p>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#64748b]">Salary Remaining:</span>
              <span className={`font-['JetBrains_Mono:Bold',sans-serif] font-bold ${numAmount > availableSalary ? "text-red-600" : "text-[#0f2340]"}`}>
                {numAmount > 0 ? (availableSalary - numAmount >= 0 ? `${salaryRemaining.toLocaleString()} EGP` : `0 EGP (Exceeds by ${(numAmount - availableSalary).toLocaleString()} EGP)`) : `${availableSalary.toLocaleString()} EGP`}
              </span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#64748b]">Outstanding Advance:</span>
              <span className={`font-['JetBrains_Mono:Bold',sans-serif] font-bold ${numAmount > outstandingAdvance ? "text-red-600" : "text-amber-800"}`}>
                {numAmount > 0 ? (outstandingAdvance - numAmount >= 0 ? `${advanceRemaining.toLocaleString()} EGP` : `0 EGP (Exceeds by ${(numAmount - outstandingAdvance).toLocaleString()} EGP)`) : `${outstandingAdvance.toLocaleString()} EGP`}
              </span>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
              Settlement Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-[#0f2340]"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
              Notes / Reference (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Deducted from weekly salary payout..."
              className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-[#0f2340]"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg">{error}</p>
          )}

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] text-[#64748b] hover:text-[#1e293b] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={outstandingAdvance <= 0 || availableSalary <= 0}
              className={`px-5 py-2.5 rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] transition-colors shadow-sm ${
                outstandingAdvance > 0 && availableSalary > 0
                  ? "bg-[#0f2340] text-white hover:bg-[#1a3560]"
                  : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
              }`}
            >
              Confirm Advance Repayment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddDeductionModal({
  technician,
  unpaidBalance,
  onClose,
  onConfirm,
}: {
  technician: Technician;
  unpaidBalance: number;
  onClose: () => void;
  onConfirm: (amount: number, date: string, reason: string, notes?: string) => void;
}) {
  const [amount, setAmount] = useState("100");
  const [date, setDate] = useState(() => getTodayLocalDateString());
  const [reason, setReason] = useState("Late Arrival");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const numAmount = parseFloat(amount) || 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (numAmount <= 0) {
      setError("Please enter a deduction amount greater than 0 EGP.");
      return;
    }
    onConfirm(numAmount, date, reason, notes.trim() || undefined);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#e2e8f0]">
        <div className="bg-red-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-[16px]">✂️</span>
            <div>
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Record Salary Deduction</h3>
              <p className="text-[12px] text-white/80">{technician.name} (خصم / جزاء)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-[20px] font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Current Balance</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#0f2340]">
                {unpaidBalance.toLocaleString()} EGP
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Balance After Deduction</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[16px] text-red-700">
                {(unpaidBalance - numAmount).toLocaleString()} EGP
              </p>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">
              Deduction Amount (EGP) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.01"
                step="any"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                className="w-full h-11 px-3 border border-[#cbd5e1] rounded-lg font-['JetBrains_Mono:Bold',sans-serif] text-[16px] text-[#0f2340] outline-none focus:border-red-600"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#94a3b8]">EGP</span>
            </div>
            <div className="flex gap-2 mt-2">
              {[50, 100, 150, 200].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => { setAmount(preset.toString()); setError(""); }}
                  className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                >
                  {preset} EGP
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                Deduction Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-red-600"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                Deduction Reason <span className="text-red-500">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-10 px-2.5 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-red-600 bg-white"
              >
                <option value="Late Arrival">Late Arrival (تأخير عن المواعيد)</option>
                <option value="Absence Without Notice">Absence Without Notice (غياب بدون إذن)</option>
                <option value="Equipment / Tool Damage">Equipment / Tool Damage (تلف معدات)</option>
                <option value="Workmanship Error / Rework">Workmanship Error (خطأ صيانة)</option>
                <option value="Policy Violation">Policy Violation (مخالفة تعليمات الورشة)</option>
                <option value="Expense — مصروف">Expense — مصروف</option>
                <option value="Other Deduction">Other Deduction (خصم آخر)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
              Details / Explanation
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                reason === "Expense — مصروف"
                  ? "e.g. شراء عدة، مواصلات، مصروف شخصي، تم دفعه نيابة عن الفني..."
                  : "e.g. 45 min late on morning shift, damaged brake bleeder screw..."
              }
              className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-red-600"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg">{error}</p>
          )}

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] text-[#64748b] hover:text-[#1e293b] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] transition-colors shadow-sm"
            >
              Confirm Deduction (-{numAmount.toLocaleString()} EGP)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RecordTipModal({
  technician,
  unpaidBalance,
  onClose,
  onConfirm,
}: {
  technician: Technician;
  unpaidBalance: number;
  onClose: () => void;
  onConfirm: (amount: number, date: string, reason: string, notes?: string) => void;
}) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => getTodayLocalDateString());
  const [reason, setReason] = useState("Customer Tip");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const numAmount = parseFloat(amount) || 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanAmount = parseFloat(amount);
    if (!amount.trim() || isNaN(cleanAmount) || cleanAmount <= 0) {
      setError("Please enter a valid positive tip amount greater than 0 EGP.");
      return;
    }
    onConfirm(cleanAmount, date, reason, notes.trim() || undefined);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#e2e8f0]">
        <div className="bg-emerald-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-[16px]">🎁</span>
            <div>
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Record Technician Tip</h3>
              <p className="text-[12px] text-white/80">{technician.name} (إكرامية / بقشيش الفني)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-[20px] font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#166534] uppercase tracking-wider">Current Balance</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[20px] text-[#0f2340]">
                {unpaidBalance.toLocaleString()} EGP
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-[#166534] uppercase tracking-wider">Balance After Tip</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-[#15803d]">
                {(unpaidBalance + numAmount).toLocaleString()} EGP
              </p>
              {numAmount > 0 && (
                <span className="text-[11px] text-[#166534] font-medium font-mono">
                  (+{numAmount.toLocaleString()} EGP)
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">
              Tip Amount (EGP) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.01"
                step="any"
                placeholder="Enter tip amount (e.g. 50, 125, 137, 250, 1250.50)"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                className="w-full h-11 px-3 border border-[#cbd5e1] rounded-lg font-['JetBrains_Mono:Bold',sans-serif] text-[16px] text-[#0f2340] outline-none focus:border-emerald-600"
                required
                autoFocus
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#94a3b8]">EGP</span>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {[50, 100, 137, 250, 500, 1000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => { setAmount(preset.toString()); setError(""); }}
                  className="text-[11px] font-medium bg-[#f1f5f9] hover:bg-[#e2e8f0] px-2.5 py-1 rounded text-[#334155] transition-colors"
                >
                  +{preset.toLocaleString()} EGP
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                Tip Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                Source / Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-10 px-2.5 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-emerald-600 bg-white"
              >
                <option value="Customer Tip">Customer Tip (بقشيش عميل)</option>
                <option value="Excellent Work">Excellent Work (مكافأة جودة عمل)</option>
                <option value="Special Service">Special Service (خدمة خاصة)</option>
                <option value="Customer Appreciation">Customer Appreciation (تقدير عميل)</option>
                <option value="Other Gratuity">Other Gratuity (إكرامية أخرى)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
              Notes / Reason (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Customer tip for fast engine overhaul..."
              className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] text-[#1e293b] outline-none focus:border-emerald-600"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg">{error}</p>
          )}

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] text-[#64748b] hover:text-[#1e293b] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] transition-colors shadow-sm"
            >
              Confirm Tip (+{numAmount.toLocaleString()} EGP)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TechniciansScreen({
  technicians,
  getTechnicianStats,
  onSelectTechnician,
  onAddTechnician,
  onUpdateTechnician,
  onDeleteTechnician,
  onOpenPaySalary,
  onOpenAdvance,
  onOpenSettleAdvance,
  onOpenDeduction,
  onOpenTip,
  role = "accountant",
}: {
  technicians: Technician[];
  getTechnicianStats: (techId: string) => {
    dailyEarnings?: number;
    totalDailyEarnings?: number;
    totalTips?: number;
    totalEarnings: number;
    totalAdvances: number;
    totalAdvanceRepayments?: number;
    outstandingAdvance?: number;
    totalDeductions: number;
    totalPayments: number;
    unpaidBalance: number;
    presentDays: number;
    absentDays: number;
    totalEarned: number;
    totalPaid: number;
  };
  onSelectTechnician: (tech: Technician) => void;
  onAddTechnician: (data: Omit<Technician, "id">) => void;
  onUpdateTechnician: (id: string, data: Partial<Technician>) => void;
  onDeleteTechnician?: (id: string) => void;
  onOpenPaySalary: (tech: Technician) => void;
  onOpenAdvance?: (tech: Technician) => void;
  onOpenSettleAdvance?: (tech: Technician) => void;
  onOpenDeduction?: (tech: Technician) => void;
  onOpenTip?: (tech: Technician) => void;
  role?: string;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTech, setEditingTech] = useState<Technician | null>(null);
  const [deletingTech, setDeletingTech] = useState<Technician | null>(null);

  // New Tech Form
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRate, setNewRate] = useState("500");
  const [newStatus, setNewStatus] = useState<"Active" | "Inactive">("Active");
  const [newNotes, setNewNotes] = useState("");

  // Edit Tech Form
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editRate, setEditRate] = useState("");
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">("Active");

  function handleOpenEdit(tech: Technician) {
    setEditingTech(tech);
    setEditName(tech.name);
    setEditPhone(tech.phone);
    setEditRate(tech.dailyRate.toString());
    setEditStatus(tech.status);
  }

  function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingTech) return;
    const rateNum = parseFloat(editRate);
    if (isNaN(rateNum) || rateNum < 0) return;
    onUpdateTechnician(editingTech.id, {
      name: editName.trim(),
      phone: editPhone.trim(),
      dailyRate: rateNum,
      status: editStatus,
    });
    setEditingTech(null);
  }

  function handleSaveAdd(e: React.FormEvent) {
    e.preventDefault();
    const rateNum = parseFloat(newRate);
    if (!newName.trim() || isNaN(rateNum) || rateNum < 0) return;
    onAddTechnician({
      name: newName.trim(),
      phone: newPhone.trim(),
      dailyRate: rateNum,
      status: newStatus,
      joinedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      notes: newNotes.trim() || undefined,
    });
    setNewName("");
    setNewPhone("");
    setNewRate("500");
    setNewStatus("Active");
    setNewNotes("");
    setShowAddModal(false);
  }

  const nonDeleted = technicians.filter((t) => !t.isDeleted);
  const filtered = nonDeleted.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.phone.includes(q);
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalUnpaid = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).unpaidBalance, 0);
  const totalEarningsAll = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).totalEarnings, 0);
  const totalAdvancesAll = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).totalAdvances, 0);
  const totalDeductionsAll = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).totalDeductions, 0);
  const totalPaymentsAll = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).totalPayments, 0);
  const activeCount = nonDeleted.filter((t) => t.status === "Active").length;

  return (
    <div className={`${role === "owner" || role === "accountant" ? "ml-[168px]" : "ml-56"} mt-14 min-h-screen bg-[#f3f4f6] p-6 pb-16`}>
      {/* Top summary KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-1">
            Total Technicians
          </p>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[26px] text-[#101828]">
            {nonDeleted.length}
          </p>
          <p className="text-[12px] text-[#008236] mt-0.5">{activeCount} active in workshop</p>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#0f2340] tracking-[0.6px] uppercase mb-1">
            Total Gross Earned
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[26px] text-[#0f2340]">
            {totalEarningsAll.toLocaleString()} EGP
          </p>
          <p className="text-[12px] text-[#64748b] mt-0.5">From attendance earnings</p>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase mb-1">
            Total Advances & Deductions
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[26px] text-amber-700">
            {(totalAdvancesAll + totalDeductionsAll).toLocaleString()} EGP
          </p>
          <p className="text-[12px] text-[#64748b] mt-0.5">
            Adv: {totalAdvancesAll.toLocaleString()} | Ded: {totalDeductionsAll.toLocaleString()} EGP
          </p>
        </div>

        <div className="bg-white border-2 border-amber-300 rounded-xl p-5 shadow-xs">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-amber-800 tracking-[0.6px] uppercase mb-1">
            Current Unpaid Balance Liability
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[26px] text-amber-700">
            {totalUnpaid.toLocaleString()} EGP
          </p>
          <p className="text-[12px] text-amber-600 mt-0.5">Earnings − Adv − Ded − Paid</p>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
        {/* Table header bar */}
        <div className="p-5 border-b border-[#e5e7eb] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search technician by name or phone..."
                className="w-full h-9 pl-9 pr-3 text-[13px] border border-[#d1d5dc] rounded-lg outline-none focus:border-[#0f2340]"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[13px]">🔍</span>
            </div>

            <div className="flex items-center bg-[#f3f4f6] p-0.5 rounded-lg text-[12px]">
              {(["All", "Active", "Inactive"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-md font-medium transition-colors ${
                    statusFilter === s ? "bg-white text-[#0f2340] shadow-xs font-semibold" : "text-[#64748b] hover:text-[#0f2340]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#0f2340] text-white rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] hover:bg-[#1a3560] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>+</span> Add Technician
          </button>
        </div>

        {/* Technicians Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
              <th className="text-left px-4 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Technician</th>
              <th className="text-left px-3 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Phone</th>
              <th className="text-right px-3 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Daily Rate</th>
              <th className="text-right px-3 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Total Earnings</th>
              <th className="text-right px-3 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Advances</th>
              <th className="text-right px-3 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Deductions</th>
              <th className="text-right px-3 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Total Paid</th>
              <th className="text-right px-3 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Unpaid Balance</th>
              <th className="text-center px-3 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Status</th>
              <th className="text-right px-4 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {filtered.map((tech) => {
              const stats = getTechnicianStats(tech.id);
              return (
                <tr key={tech.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-4 py-3.5">
                    <div
                      onClick={() => onSelectTechnician(tech)}
                      className="cursor-pointer group flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#0f2340] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                        {tech.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828] group-hover:text-[#1447e6] transition-colors">
                          {tech.name}
                        </p>
                        {tech.notes && <p className="text-[11px] text-[#94a3b8]">{tech.notes}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 font-mono text-[12px] text-[#475569]">{tech.phone || "—"}</td>
                  <td className="px-3 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] text-[#0f2340]">
                    {tech.dailyRate.toLocaleString()} EGP
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-[13px] text-[#008236] font-semibold">
                    +{stats.totalEarnings.toLocaleString()} EGP
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-[13px] text-amber-700">
                    {stats.totalAdvances > 0 ? `-${stats.totalAdvances.toLocaleString()} EGP` : "0 EGP"}
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-[13px] text-red-600">
                    {stats.totalDeductions > 0 ? `-${stats.totalDeductions.toLocaleString()} EGP` : "0 EGP"}
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-[13px] text-purple-700">
                    {stats.totalPayments > 0 ? `-${stats.totalPayments.toLocaleString()} EGP` : "0 EGP"}
                  </td>
                  <td className="px-3 py-3.5 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] ${
                        stats.unpaidBalance > 0
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : stats.unpaidBalance < 0
                          ? "bg-red-100 text-red-800 border border-red-300"
                          : "bg-[#dcfce7] text-[#15803d]"
                      }`}
                    >
                      {stats.unpaidBalance.toLocaleString()} EGP
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        tech.status === "Active"
                          ? "bg-[#dcfce7] text-[#15803d]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tech.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                      <button
                        onClick={() => onOpenPaySalary(tech)}
                        disabled={stats.unpaidBalance <= 0}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                          stats.unpaidBalance > 0
                            ? "bg-[#008236] text-white hover:bg-[#006e2e]"
                            : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
                        }`}
                        title={stats.unpaidBalance <= 0 ? "No unpaid balance" : "Record salary payout"}
                      >
                        <span>💵</span> Pay
                      </button>
                      <button
                        onClick={() => onOpenTip?.(tech)}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-0.5"
                        title="Record technician tip"
                      >
                        🎁 Tip
                      </button>
                      <button
                        onClick={() => onOpenAdvance?.(tech)}
                        className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-md text-[11px] font-semibold transition-colors"
                        title="Record cash advance"
                      >
                        + Adv
                      </button>
                      {(stats.outstandingAdvance ?? 0) > 0 && (
                        <button
                          onClick={() => onOpenSettleAdvance?.(tech)}
                          className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-md text-[11px] font-semibold transition-colors"
                          title="Settle / Repay advance from salary"
                        >
                          🔄 Settle
                        </button>
                      )}
                      <button
                        onClick={() => onOpenDeduction?.(tech)}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-md text-[11px] font-semibold transition-colors"
                        title="Record deduction"
                      >
                        - Ded
                      </button>
                      <button
                        onClick={() => handleOpenEdit(tech)}
                        className="px-2 py-1 border border-[#d1d5dc] rounded-md text-[11px] text-[#475569] hover:bg-[#f1f5f9] font-medium"
                        title="Edit rate or details"
                      >
                        Rate
                      </button>
                      <button
                        onClick={() => onSelectTechnician(tech)}
                        className="px-2 py-1 text-[11px] text-[#1447e6] hover:underline font-semibold"
                      >
                        Details →
                      </button>
                      {onDeleteTechnician && (
                        <button
                          onClick={() => setDeletingTech(tech)}
                          className="px-1.5 py-1 text-red-600 hover:bg-red-50 rounded text-[11px] font-medium transition-colors"
                          title="Soft delete technician"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-5 py-10 text-center text-[13px] text-[#94a3b8]">
                  No technicians found matching criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#e2e8f0]">
            <div className="bg-[#0f2340] text-white p-5 flex items-center justify-between">
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Add New Technician</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/70 hover:text-white text-[20px] font-bold">✕</button>
            </div>
            <form onSubmit={handleSaveAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ahmed Hassan"
                  required
                  className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] outline-none focus:border-[#0f2340]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="010..."
                    className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] outline-none focus:border-[#0f2340]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">Daily Rate (EGP) *</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg font-bold text-[14px] outline-none focus:border-[#0f2340]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] outline-none focus:border-[#0f2340] bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">Specialty / Notes</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Lead mechanical technician"
                  className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] outline-none focus:border-[#0f2340]"
                />
              </div>
              <div className="pt-3 border-t border-[#e2e8f0] flex justify-end gap-2.5">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-[13px] text-[#64748b]">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#0f2340] text-white rounded-lg font-semibold text-[13px] hover:bg-[#1a3560]">Create Technician</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingTech && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#e2e8f0]">
            <div className="bg-[#0f2340] text-white p-5 flex items-center justify-between">
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Edit Technician & Rate</h3>
              <button onClick={() => setEditingTech(null)} className="text-white/70 hover:text-white text-[20px] font-bold">✕</button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-3.5 text-[12px] text-[#1e40af] flex items-start gap-2">
                <span>ℹ️</span>
                <p>Updating the Daily Rate will apply to <strong>future attendance</strong>. All historical payroll earning records are preserved.</p>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] outline-none focus:border-[#0f2340]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] outline-none focus:border-[#0f2340]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">Daily Rate (EGP) *</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={editRate}
                    onChange={(e) => setEditRate(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg font-bold text-[14px] text-[#0f2340] outline-none focus:border-[#0f2340]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wider mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full h-10 px-3 border border-[#cbd5e1] rounded-lg text-[13px] outline-none focus:border-[#0f2340] bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-3 border-t border-[#e2e8f0] flex justify-end gap-2.5">
                <button type="button" onClick={() => setEditingTech(null)} className="px-4 py-2 text-[13px] text-[#64748b]">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#0f2340] text-white rounded-lg font-semibold text-[13px] hover:bg-[#1a3560]">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingTech && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-[#e5e7eb]">
            <div className="px-6 py-4 bg-red-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-[20px]">⚠️</span>
                <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Delete Technician?</h3>
              </div>
              <button
                onClick={() => setDeletingTech(null)}
                className="text-white/80 hover:text-white text-[18px] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-[14px] text-[#1f2937] leading-relaxed">
                Are you sure you want to delete <strong className="font-semibold text-[#111827]">{deletingTech.name}</strong>?
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-[12px] text-amber-800 space-y-1">
                <p className="font-semibold flex items-center gap-1.5 text-amber-900">
                  <span>🛡️</span> Historical Records Preserved
                </p>
                <p className="leading-relaxed">
                  This technician will be removed from the active Technicians list and will not appear for recording new attendance. All previous attendance records, wage earnings, and salary payments will remain intact in historical reports.
                </p>
              </div>

              {getTechnicianStats(deletingTech.id).unpaidBalance > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[12px] text-blue-800 flex items-center justify-between">
                  <span>Current Unpaid Balance:</span>
                  <span className="font-mono font-bold text-[13px] text-blue-900">
                    {getTechnicianStats(deletingTech.id).unpaidBalance.toLocaleString()} EGP
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setDeletingTech(null)}
                  className="px-4 py-2 border border-[#d1d5dc] rounded-lg text-[13px] font-medium text-[#475569] hover:bg-[#f8fafc] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeleteTechnician?.(deletingTech.id);
                    setDeletingTech(null);
                  }}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] transition-colors shadow-sm"
                >
                  Delete Technician
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Excel Helper ─────────────────────────────────────────────────────────────

interface ExcelDailyRow {
  date: string;
  formattedDate: string;
  dayName: string;
  attendanceStatus: "Present" | "Absent" | "—";
  dailyRate: number;
  dailyEarning: number;
  tip: number;
  advance: number;
  deduction: number;
  payment: number;
  dailyNet: number;
  runningBalance: number;
  notes: string;
  advanceNotes?: string;
  deductionReason?: string;
  paymentMethod?: string;
}

function computeExcelDailyRows(
  techId: string,
  currentRate: number,
  attendanceRecords: AttendanceRecord[],
  payrollTransactions: PayrollTransaction[]
): ExcelDailyRow[] {
  const techTx = payrollTransactions.filter((tx) => tx.technicianId === techId);
  const techAtt = attendanceRecords.filter((ar) => ar.technicianId === techId);

  const dateSet = new Set<string>();
  techAtt.forEach((ar) => dateSet.add(ar.date));
  techTx.forEach((tx) => dateSet.add(tx.date));

  // Ascending chronological order
  const sortedDates = Array.from(dateSet).sort();

  let running = 0;
  const rows: ExcelDailyRow[] = [];

  for (const d of sortedDates) {
    const att = techAtt.find((ar) => ar.date === d);
    const dayTx = techTx.filter((tx) => tx.date === d);

    const attendanceStatus = att ? att.status : "—";
    const dailyRate = att?.dailyRate || currentRate;

    // Daily Earning on that date
    const earningTx = dayTx.filter(
      (tx) =>
        tx.type === "DAILY_EARNING" ||
        tx.type === "Daily Wage"
    );
    const dailyEarning = earningTx.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    // Tips on that date
    const tipTx = dayTx.filter((tx) => tx.type === "TECHNICIAN_TIP" || tx.type === "Technician Tip");
    const tip = tipTx.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    // Advances
    const advanceTx = dayTx.filter((tx) => tx.type === "ADVANCE");
    const advance = advanceTx.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    // Deductions
    const deductionTx = dayTx.filter((tx) => tx.type === "DEDUCTION");
    const deduction = deductionTx.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    // Payments
    const paymentTx = dayTx.filter((tx) => tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment");
    const payment = paymentTx.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const dailyNet = dailyEarning + tip - advance - deduction - payment;
    running += dailyNet;

    const noteItems: string[] = [];
    let advanceNotes = "";
    let deductionReason = "";
    let paymentMethod = "";

    if (att?.status === "Absent") noteItems.push("Leave / Absent");
    if (tipTx.length > 0) {
      const tipReason = tipTx.map((tx) => tx.reason ? `${tx.reason}${tx.notes ? ` (${tx.notes})` : ""}` : (tx.notes || "Tip")).join(", ");
      noteItems.push(`Tip (+${tip.toLocaleString()} EGP): ${tipReason}`);
    }
    if (advanceTx.length > 0) {
      advanceNotes = advanceTx.map((tx) => tx.notes || "Cash Advance").join(", ");
      noteItems.push(`Adv: ${advanceNotes}`);
    }
    if (deductionTx.length > 0) {
      deductionReason = deductionTx.map((tx) => tx.reason || tx.notes || "Deduction").join(", ");
      noteItems.push(`Ded: ${deductionReason}`);
    }
    if (paymentTx.length > 0) {
      paymentMethod = paymentTx.map((tx) => tx.paymentMethod || "Cash").join(", ");
      noteItems.push(`Paid via ${paymentMethod}`);
    }

    const dateObj = parseLocalDate(d);
    const formattedDate = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
      : d;
    const dayName = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString("en-US", { weekday: "short" })
      : "";

    rows.push({
      date: d,
      formattedDate,
      dayName,
      attendanceStatus,
      dailyRate,
      dailyEarning,
      tip,
      advance,
      deduction,
      payment,
      dailyNet,
      runningBalance: running,
      notes: noteItems.join(" · ") || (att?.status === "Present" ? "Present" : "—"),
      advanceNotes,
      deductionReason,
      paymentMethod,
    });
  }

  return rows;
}

// ─── Attendance Screen ────────────────────────────────────────────────────────

function AttendanceScreen({
  technicians,
  attendanceRecords,
  payrollTransactions = [],
  onMarkAttendance,
  onOpenAdvance,
  onOpenDeduction,
  onSelectTechnician,
  role = "accountant",
}: {
  technicians: Technician[];
  attendanceRecords: AttendanceRecord[];
  payrollTransactions?: PayrollTransaction[];
  onMarkAttendance: (techId: string, date: string, status: "Present" | "Absent", notes?: string) => void;
  onOpenAdvance?: (tech: Technician) => void;
  onOpenDeduction?: (tech: Technician) => void;
  onSelectTechnician?: (tech: Technician) => void;
  role?: string;
}) {
  const [selectedDate, setSelectedDate] = useState(() => getTodayLocalDateString());
  const [feedback, setFeedback] = useState<string | null>(null);

  // Date manipulation helpers (workshop local calendar date)
  function shiftDate(days: number) {
    const d = parseLocalDate(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(formatDateLocal(d));
  }

  function handleAction(tech: Technician, status: "Present" | "Absent") {
    onMarkAttendance(tech.id, selectedDate, status);
    if (status === "Present") {
      setFeedback(`✓ ${tech.name} marked Present on ${selectedDate}. +${tech.dailyRate.toLocaleString()} EGP earning accrued.`);
    } else {
      setFeedback(`⟳ ${tech.name} marked Absent on ${selectedDate}. Daily wage for this date was removed/reversed.`);
    }
    setTimeout(() => setFeedback(null), 4000);
  }

  function handleMarkAllPresent() {
    const activeTechs = technicians.filter((t) => !t.isDeleted && t.status === "Active");
    activeTechs.forEach((t) => {
      onMarkAttendance(t.id, selectedDate, "Present");
    });
    setFeedback(`✓ All ${activeTechs.length} active technicians marked Present. Earnings accrued immediately.`);
    setTimeout(() => setFeedback(null), 4000);
  }

  const activeTechs = technicians.filter((t) => !t.isDeleted);
  const recordsForDate = attendanceRecords.filter((ar) => ar.date === selectedDate);
  const presentCount = recordsForDate.filter((ar) => ar.status === "Present").length;
  const absentCount = recordsForDate.filter((ar) => ar.status === "Absent").length;

  const dateWagesAccrued = recordsForDate
    .filter((ar) => ar.status === "Present")
    .reduce((sum, ar) => sum + ar.dailyRate, 0);

  const dateObj = parseLocalDate(selectedDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const shortDateFormatted = dateObj.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  return (
    <div className={`${role === "owner" || role === "accountant" ? "ml-[168px]" : "ml-56"} mt-14 min-h-screen bg-[#f3f4f6] p-6 pb-16`}>
      {/* Notice Banner */}
      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-4 text-[13px] text-[#1e40af] flex items-start gap-3 mb-6 shadow-xs">
        <span className="text-[20px] leading-none shrink-0 mt-0.5">ℹ️</span>
        <div>
          <p className="font-semibold text-[#1e3a8a] mb-0.5">
            Excel-Aligned Attendance & Real-Time Accrual
          </p>
          <p className="text-[#1e40af] leading-relaxed">
            One attendance record per technician per date. Marking <strong>Present</strong> creates a <strong>Daily Wage earning transaction (+Daily Rate)</strong> in the ledger immediately. Marking <strong>Absent / Leave</strong> records 0 EGP and reverses any associated earning.
          </p>
        </div>
      </div>

      {/* Date Bar & Controls */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-4 shadow-xs mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => shiftDate(-1)}
            className="w-9 h-9 border border-[#d1d5dc] rounded-lg hover:bg-[#f8fafc] flex items-center justify-center font-bold text-[#475569] transition-colors"
            title="Previous Day"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-9 px-3 border border-[#d1d5dc] rounded-lg font-['Inter:Medium',sans-serif] text-[13px] text-[#0f2340] outline-none focus:border-[#0f2340]"
            />
            <button
              onClick={() => setSelectedDate(getTodayLocalDateString())}
              className="px-3 py-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#334155] font-semibold text-[12px] rounded-lg transition-colors"
            >
              Today
            </button>
          </div>
          <button
            onClick={() => shiftDate(1)}
            className="w-9 h-9 border border-[#d1d5dc] rounded-lg hover:bg-[#f8fafc] flex items-center justify-center font-bold text-[#475569] transition-colors"
            title="Next Day"
          >
            →
          </button>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828] ml-2">
            {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllPresent}
            className="px-4 py-2 bg-[#008236] text-white rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] hover:bg-[#006e2e] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>✓</span> Mark All Active Present
          </button>
        </div>
      </div>

      {/* Daily KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-1">
            Total Staff
          </p>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[26px] text-[#101828]">
            {activeTechs.length}
          </p>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#008236] tracking-[0.6px] uppercase mb-1">
            Present Today
          </p>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[26px] text-[#008236]">
            {presentCount}
          </p>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-amber-700 tracking-[0.6px] uppercase mb-1">
            Absent / Leave Today
          </p>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[26px] text-amber-700">
            {absentCount}
          </p>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#0f2340] tracking-[0.6px] uppercase mb-1">
            Daily Wages Accrued
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[26px] text-[#0f2340]">
            {dateWagesAccrued.toLocaleString()} EGP
          </p>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="mb-4 bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d] px-4 py-3 rounded-xl text-[13px] font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
          <span>●</span> {feedback}
        </div>
      )}

      {/* Attendance Table */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-[#fafbfc] border-b border-[#e5e7eb] flex items-center justify-between flex-wrap gap-2">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">
            Workshop Attendance Sheet — {formattedDate}
          </span>
          <span className="text-[12px] text-[#64748b]">
            Excel Specification: Date | Technician | Daily Rate | Attendance | Daily Earning | Notes
          </span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
              <th className="text-left px-4 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Date</th>
              <th className="text-left px-5 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Technician</th>
              <th className="text-right px-4 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Daily Rate</th>
              <th className="text-center px-4 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Attendance</th>
              <th className="text-right px-4 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Daily Earning</th>
              <th className="text-left px-4 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Notes & Events</th>
              <th className="text-right px-4 py-3.5 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#64748b] tracking-[0.6px] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {activeTechs.map((tech) => {
              const rec = recordsForDate.find((ar) => ar.technicianId === tech.id);
              const isPresent = rec?.status === "Present";
              const isAbsent = rec?.status === "Absent";

              // Find any advances or deductions on this date for this tech
              const dayTx = payrollTransactions.filter((tx) => tx.technicianId === tech.id && tx.date === selectedDate);
              const dayAdv = dayTx.filter((tx) => tx.type === "ADVANCE");
              const dayDed = dayTx.filter((tx) => tx.type === "DEDUCTION");
              const dayPay = dayTx.filter((tx) => tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment");

              return (
                <tr key={tech.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-4 py-4 font-mono text-[13px] text-[#64748b] font-medium">
                    {shortDateFormatted}
                  </td>
                  <td className="px-5 py-4">
                    <div
                      onClick={() => onSelectTechnician?.(tech)}
                      className="cursor-pointer group flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#0f2340] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                        {tech.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828] group-hover:text-[#1447e6] transition-colors">
                          {tech.name}
                        </p>
                        <p className="text-[11px] text-[#94a3b8]">{tech.phone || tech.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">
                    {tech.dailyRate.toLocaleString()} EGP
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="inline-flex items-center rounded-lg border border-[#d1d5dc] p-0.5 bg-[#f8fafc] gap-1">
                      <button
                        type="button"
                        onClick={() => handleAction(tech, "Present")}
                        className={`px-3 py-1.5 rounded-md text-[12px] font-bold transition-all flex items-center gap-1 ${
                          isPresent
                            ? "bg-[#008236] text-white shadow-xs"
                            : "text-[#475569] hover:bg-[#dcfce7] hover:text-[#15803d]"
                        }`}
                      >
                        <span>✓</span> Present
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(tech, "Absent")}
                        className={`px-3 py-1.5 rounded-md text-[12px] font-bold transition-all flex items-center gap-1 ${
                          isAbsent
                            ? "bg-amber-600 text-white shadow-xs"
                            : "text-[#475569] hover:bg-amber-100 hover:text-amber-800"
                        }`}
                      >
                        <span>✕</span> Absent
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[14px]">
                    {isPresent ? (
                      <span className="text-[#008236]">+{tech.dailyRate.toLocaleString()} EGP</span>
                    ) : (
                      <span className="text-[#94a3b8]">0 EGP</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-[12px]">
                    <div className="space-y-1">
                      {isPresent && (
                        <span className="inline-flex items-center gap-1 bg-[#dcfce7] text-[#15803d] font-semibold px-2 py-0.5 rounded text-[11px]">
                          ✓ Present (+{tech.dailyRate} EGP)
                        </span>
                      )}
                      {isAbsent && (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                          ✕ Leave / Absent (0 EGP)
                        </span>
                      )}
                      {dayAdv.map((a) => (
                        <div key={a.id} className="text-amber-800 font-medium">
                          💳 Advance: -{Math.abs(a.amount).toLocaleString()} EGP {a.notes ? `(${a.notes})` : ""}
                        </div>
                      ))}
                      {dayDed.map((d) => (
                        <div key={d.id} className="text-red-700 font-medium">
                          ✂️ Deduction: -{Math.abs(d.amount).toLocaleString()} EGP ({d.reason || d.notes})
                        </div>
                      ))}
                      {dayPay.map((p) => (
                        <div key={p.id} className="text-purple-700 font-medium">
                          💵 Salary Paid: -{Math.abs(p.amount).toLocaleString()} EGP ({p.paymentMethod})
                        </div>
                      ))}
                      {!isPresent && !isAbsent && dayTx.length === 0 && (
                        <span className="text-[#94a3b8] italic">Unmarked</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenAdvance?.(tech)}
                        className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded text-[11px] font-semibold"
                        title="Record advance on this date"
                      >
                        + Adv
                      </button>
                      <button
                        onClick={() => onOpenDeduction?.(tech)}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-[11px] font-semibold"
                        title="Record deduction on this date"
                      >
                        - Ded
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Payroll Screen ───────────────────────────────────────────────────────────

function PayrollScreen({
  technicians,
  payrollTransactions,
  attendanceRecords,
  getTechnicianStats,
  onOpenPaySalary,
  onOpenAdvance,
  onOpenSettleAdvance,
  onOpenDeduction,
  onOpenTip,
  onSelectTechnician,
  role = "accountant",
}: {
  technicians: Technician[];
  payrollTransactions: PayrollTransaction[];
  attendanceRecords: AttendanceRecord[];
  getTechnicianStats: (techId: string) => {
    dailyEarnings?: number;
    totalDailyEarnings?: number;
    totalTips?: number;
    totalEarnings: number;
    totalAdvances: number;
    totalAdvanceRepayments?: number;
    outstandingAdvance?: number;
    totalDeductions: number;
    totalPayments: number;
    unpaidBalance: number;
    presentDays: number;
    absentDays: number;
    totalEarned: number;
    totalPaid: number;
  };
  onOpenPaySalary: (tech: Technician) => void;
  onOpenAdvance?: (tech: Technician) => void;
  onOpenSettleAdvance?: (tech: Technician) => void;
  onOpenDeduction?: (tech: Technician) => void;
  onOpenTip?: (tech: Technician) => void;
  onSelectTechnician: (tech: Technician) => void;
  role?: string;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "weekly" | "monthly">("overview");

  // Weekly selector state (Sunday to Saturday)
  const [weekOffset, setWeekOffset] = useState(0);

  // Single Source of Truth for week range & columns (Sunday -> Saturday)
  const sunStr = getPayrollWeekStart(undefined, weekOffset);
  const satStr = getPayrollWeekEnd(sunStr);
  const weekDays = getPayrollWeekDates(sunStr);

  // Monthly reporting state
  const [selectedMonth, setSelectedMonth] = useState("2026-09");
  const [selectedTechFilter, setSelectedTechFilter] = useState("ALL");

  const nonDeleted = technicians.filter((t) => !t.isDeleted);
  const totalUnpaidLiability = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).unpaidBalance, 0);
  const totalEarningsAll = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).totalEarnings, 0);
  const totalAdvancesAll = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).totalAdvances, 0);
  const totalDeductionsAll = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).totalDeductions, 0);
  const totalPaymentsAll = nonDeleted.reduce((sum, t) => sum + getTechnicianStats(t.id).totalPayments, 0);

  // Today stats (workshop local date)
  const todayStr = getTodayLocalDateString();
  const todayEarnings = payrollTransactions
    .filter((tx) => tx.date === todayStr && (tx.type === "DAILY_EARNING" || tx.type === "Daily Wage"))
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  // Week stats (for summary cards)
  const weekEarnings = payrollTransactions
    .filter((tx) => tx.date >= sunStr && tx.date <= satStr && !isSunday(tx.date) && (tx.type === "DAILY_EARNING" || tx.type === "Daily Wage"))
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  // Month stats
  const monthEarnings = payrollTransactions
    .filter((tx) => tx.date.startsWith(selectedMonth) && (tx.type === "DAILY_EARNING" || tx.type === "Daily Wage"))
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const presentTodayCount = attendanceRecords.filter((ar) => ar.date === todayStr && ar.status === "Present").length;
  const absentTodayCount = attendanceRecords.filter((ar) => ar.date === todayStr && ar.status === "Absent").length;

  // Technicians with outstanding balance
  const techsWithBalance = nonDeleted.filter((t) => getTechnicianStats(t.id).unpaidBalance > 0);

  return (
    <div className={`${role === "owner" || role === "accountant" ? "ml-[168px]" : "ml-56"} mt-14 min-h-screen bg-[#f3f4f6] p-6 pb-16`}>
      {/* Top Navigation Tabs */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-1.5 mb-6 shadow-xs flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg font-['Inter:Semi_Bold',sans-serif] text-[13px] transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-[#0f2340] text-white shadow-xs"
                : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f2340]"
            }`}
          >
            <span>📊</span> Dashboard & Balances
          </button>
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-4 py-2 rounded-lg font-['Inter:Semi_Bold',sans-serif] text-[13px] transition-all flex items-center gap-2 ${
              activeTab === "weekly"
                ? "bg-[#0f2340] text-white shadow-xs"
                : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f2340]"
            }`}
          >
            <span>📅</span> Weekly View (Excel Sheet)
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-4 py-2 rounded-lg font-['Inter:Semi_Bold',sans-serif] text-[13px] transition-all flex items-center gap-2 ${
              activeTab === "monthly"
                ? "bg-[#0f2340] text-white shadow-xs"
                : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f2340]"
            }`}
          >
            <span>📈</span> Monthly Report
          </button>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2">
          {nonDeleted.length > 0 && (
            <>
              <button
                onClick={() => onOpenTip?.(nonDeleted[0])}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
              >
                <span>🎁</span> Record Tip
              </button>
              <button
                onClick={() => onOpenAdvance?.(nonDeleted[0])}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1"
              >
                <span>💳</span> Record Advance
              </button>
              <button
                onClick={() => onOpenDeduction?.(nonDeleted[0])}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1"
              >
                <span>✂️</span> Record Deduction
              </button>
              <button
                onClick={() => onOpenPaySalary(nonDeleted[0])}
                className="px-3 py-1.5 bg-[#008236] hover:bg-[#006e2e] text-white rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>💵</span> Pay Salary
              </button>
            </>
          )}
        </div>
      </div>

      {/* ─── TAB 1: OVERVIEW & MASTER BALANCES ─── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Executive KPI Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white border-2 border-amber-300 rounded-xl p-5 shadow-xs">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-amber-800 tracking-[0.6px] uppercase mb-1">
                Total Salary Owed (Liability)
              </p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[28px] text-amber-700">
                {totalUnpaidLiability.toLocaleString()} EGP
              </p>
              <p className="text-[12px] text-amber-600 mt-0.5">
                {techsWithBalance.length} technicians with pending balance
              </p>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#0f2340] tracking-[0.6px] uppercase mb-1">
                Total Wages Earned
              </p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[28px] text-[#0f2340]">
                {totalEarningsAll.toLocaleString()} EGP
              </p>
              <p className="text-[12px] text-[#64748b] mt-0.5">
                Today: +{todayEarnings.toLocaleString()} | This Week: +{weekEarnings.toLocaleString()} EGP
              </p>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-amber-700 tracking-[0.6px] uppercase mb-1">
                Total Advances Taken
              </p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[28px] text-amber-700">
                {totalAdvancesAll.toLocaleString()} EGP
              </p>
              <p className="text-[12px] text-[#64748b] mt-0.5">
                Deductions: {totalDeductionsAll.toLocaleString()} EGP
              </p>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-xs">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#008236] tracking-[0.6px] uppercase mb-1">
                Total Salary Paid
              </p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[28px] text-[#008236]">
                {totalPaymentsAll.toLocaleString()} EGP
              </p>
              <p className="text-[12px] text-[#008236] mt-0.5">Disbursed salary payments</p>
            </div>
          </div>

          {/* Secondary stats & Outstanding Technicians widget */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 bg-[#fafbfc] border-b border-[#e5e7eb] flex items-center justify-between">
                <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">
                  Technicians Ledger Balances
                </span>
                <span className="text-[12px] text-[#64748b]">
                  Balance = Earnings − Advances − Deductions − Payments
                </span>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                    <th className="text-left px-4 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Technician</th>
                    <th className="text-right px-3 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Daily Rate</th>
                    <th className="text-right px-3 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Gross Earned</th>
                    <th className="text-right px-3 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Advances</th>
                    <th className="text-right px-3 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Deductions</th>
                    <th className="text-right px-3 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Paid</th>
                    <th className="text-right px-3 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Unpaid Balance</th>
                    <th className="text-right px-4 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {nonDeleted.map((tech) => {
                    const stats = getTechnicianStats(tech.id);
                    return (
                      <tr key={tech.id} className="hover:bg-[#f8fafc] transition-colors">
                        <td className="px-4 py-3.5">
                          <div onClick={() => onSelectTechnician(tech)} className="cursor-pointer group">
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828] group-hover:text-[#1447e6]">
                              {tech.name}
                            </p>
                            <p className="text-[11px] text-[#94a3b8]">{tech.phone}</p>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono font-bold text-[13px] text-[#0f2340]">
                          {tech.dailyRate.toLocaleString()} EGP
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono text-[13px] text-[#008236] font-semibold">
                          +{stats.totalEarnings.toLocaleString()} EGP
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono text-[13px] text-amber-700">
                          {stats.totalAdvances > 0 ? `-${stats.totalAdvances.toLocaleString()} EGP` : "0 EGP"}
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono text-[13px] text-red-600">
                          {stats.totalDeductions > 0 ? `-${stats.totalDeductions.toLocaleString()} EGP` : "0 EGP"}
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono text-[13px] text-purple-700">
                          {stats.totalPayments > 0 ? `-${stats.totalPayments.toLocaleString()} EGP` : "0 EGP"}
                        </td>
                        <td className="px-3 py-3.5 text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] ${
                              stats.unpaidBalance > 0
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : stats.unpaidBalance < 0
                                ? "bg-red-100 text-red-800 border border-red-300"
                                : "bg-[#dcfce7] text-[#15803d]"
                            }`}
                          >
                            {stats.unpaidBalance.toLocaleString()} EGP
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onOpenPaySalary(tech)}
                              disabled={stats.unpaidBalance <= 0}
                              className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                                stats.unpaidBalance > 0
                                  ? "bg-[#008236] text-white hover:bg-[#006e2e]"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              Pay
                            </button>
                            {(stats.outstandingAdvance ?? 0) > 0 && (
                              <button
                                onClick={() => onOpenSettleAdvance?.(tech)}
                                className="px-2 py-1 rounded text-[11px] font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-colors"
                                title="Settle advance from salary"
                              >
                                Settle
                              </button>
                            )}
                            <button
                              onClick={() => onOpenTip?.(tech)}
                              className="px-2 py-1 rounded text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
                              title="Record technician tip"
                            >
                              + Tip
                            </button>
                            <button
                              onClick={() => onSelectTechnician(tech)}
                              className="px-2 py-1 text-[11px] text-[#1447e6] hover:underline font-semibold"
                            >
                              Ledger →
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Right column: Technicians with Outstanding Balances */}
            <div className="space-y-4">
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-[#f1f5f9] pb-3">
                  <h4 className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">
                    Technicians Owed Salary
                  </h4>
                  <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {techsWithBalance.length} Pending
                  </span>
                </div>

                {techsWithBalance.length === 0 ? (
                  <p className="text-[13px] text-[#008236] py-4 text-center font-medium">
                    ✓ All technician salaries are currently settled!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {techsWithBalance.map((tech) => {
                      const balance = getTechnicianStats(tech.id).unpaidBalance;
                      return (
                        <div
                          key={tech.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] hover:border-amber-300 transition-colors"
                        >
                          <div>
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828]">
                              {tech.name}
                            </p>
                            <p className="font-mono text-[11px] text-[#64748b]">Rate: {tech.dailyRate} EGP/day</p>
                          </div>
                          <div className="text-right flex items-center gap-2">
                            <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[14px] text-amber-700">
                              {balance.toLocaleString()} EGP
                            </span>
                            <button
                              onClick={() => onOpenPaySalary(tech)}
                              className="px-2.5 py-1 bg-[#008236] hover:bg-[#006e2e] text-white rounded text-[11px] font-semibold shadow-xs"
                            >
                              Pay
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Attendance quick snapshot */}
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
                <h4 className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340] mb-3">
                  Attendance Status (Today)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0]">
                    <p className="text-[11px] font-semibold text-[#15803d] uppercase">Present</p>
                    <p className="text-[20px] font-bold text-[#15803d]">{presentTodayCount}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#fffbeb] border border-[#fef3c7]">
                    <p className="text-[11px] font-semibold text-amber-800 uppercase">Absent / Leave</p>
                    <p className="text-[20px] font-bold text-amber-800">{absentTodayCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Payroll Transactions Feed */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-[#fafbfc] border-b border-[#e5e7eb] flex items-center justify-between">
              <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#0f2340]">
                Recent Payroll Transactions (Audit Log)
              </span>
              <span className="text-[12px] text-[#64748b]">
                Continuous ledger tracking of every earning, advance, deduction, and payout
              </span>
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                  <th className="text-left px-5 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Date</th>
                  <th className="text-left px-5 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Technician</th>
                  <th className="text-left px-5 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Type</th>
                  <th className="text-right px-5 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Amount</th>
                  <th className="text-left px-5 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Notes / Method</th>
                  <th className="text-center px-5 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {payrollTransactions.slice(0, 15).map((tx) => {
                  const isEarning = tx.type === "DAILY_EARNING" || tx.type === "Daily Wage";
                  const isTip = tx.type === "TECHNICIAN_TIP" || tx.type === "Technician Tip";
                  const isAdv = tx.type === "ADVANCE";
                  const isDed = tx.type === "DEDUCTION";
                  const isPay = tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment";

                  return (
                    <tr key={tx.id} className="hover:bg-[#f8fafc]">
                      <td className="px-5 py-3 font-mono text-[12px] text-[#475569]">{tx.date}</td>
                      <td className="px-5 py-3 font-semibold text-[13px] text-[#101828]">{tx.technicianName}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            isEarning
                              ? "bg-[#dcfce7] text-[#15803d]"
                              : isTip
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : isAdv
                              ? "bg-amber-100 text-amber-800"
                              : isDed
                              ? "bg-red-100 text-red-700"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {isTip ? "Technician Tip" : tx.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px]">
                        <span
                          className={
                            isEarning || isTip ? "text-[#008236]" : isAdv ? "text-amber-700" : isDed ? "text-red-600" : "text-purple-700"
                          }
                        >
                          {isEarning || isTip ? `+${Math.abs(tx.amount).toLocaleString()}` : `-${Math.abs(tx.amount).toLocaleString()}`} EGP
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[12px] text-[#475569]">
                        {tx.reason ? `${tx.reason}${tx.notes ? ` (${tx.notes})` : ""}` : tx.notes ? tx.notes : tx.paymentMethod ? `Method: ${tx.paymentMethod}` : tx.description || "—"}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            tx.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 2: WEEKLY EXCEL MATRIX (REQUIREMENT 8) ─── */}
      {activeTab === "weekly" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
            {/* Week Control Bar */}
            <div className="p-4 bg-[#fafbfc] border-b border-[#e5e7eb] flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="font-['Inter:Bold',sans-serif] font-bold text-[15px] text-[#0f2340]">
                  Weekly Payroll Matrix (Excel Format)
                </span>
                <span className="bg-[#f1f5f9] text-[#475569] text-[11px] font-semibold px-2.5 py-0.5 rounded">
                  Reporting View · Sunday → Saturday
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white border border-[#d1d5dc] p-1 rounded-lg">
                <button
                  onClick={() => setWeekOffset((prev) => prev - 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#475569] hover:bg-[#f1f5f9] rounded text-[13px] font-bold"
                  title="Previous Week"
                >
                  ←
                </button>
                <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] text-[#0f2340] px-3">
                  Week: {weekDays[0].formattedShort} → {weekDays[6].formattedShort}
                </span>
                <button
                  onClick={() => setWeekOffset((prev) => prev + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#475569] hover:bg-[#f1f5f9] rounded text-[13px] font-bold"
                  title="Next Week"
                >
                  →
                </button>
                {weekOffset !== 0 && (
                  <button
                    onClick={() => setWeekOffset(0)}
                    className="text-[11px] font-semibold text-[#1447e6] hover:underline px-2 border-l border-[#e2e8f0] ml-1"
                  >
                    Current Week
                  </button>
                )}
              </div>
            </div>

            {/* Weekly Matrix Table */}
            {(() => {
              const weekTechRows = nonDeleted.map((tech) => {
                // Attendance: exactly the 7 calendar dates of this payroll week (Sunday -> Saturday)
                const techAtt = attendanceRecords.filter(
                  (ar) => ar.technicianId === tech.id && ar.date >= sunStr && ar.date <= satStr
                );

                // Sunday is fixed weekly off: 0 earnings, not counted as Present or Leave/Absent
                const presentDays = techAtt.filter((ar) => ar.status === "Present" && !isSunday(ar.date)).length;
                const leaveDays = techAtt.filter((ar) => ar.status === "Absent" && !isSunday(ar.date)).length;

                // Weekly Earnings: strictly Monday through Saturday (Sunday = 0 earnings)
                const weekEarned = payrollTransactions
                  .filter(
                    (tx) =>
                      tx.technicianId === tech.id &&
                      tx.date >= sunStr &&
                      tx.date <= satStr &&
                      !isSunday(tx.date) &&
                      (tx.type === "DAILY_EARNING" || tx.type === "Daily Wage")
                  )
                  .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                const weekTips = payrollTransactions
                  .filter(
                    (tx) =>
                      tx.technicianId === tech.id &&
                      tx.date >= sunStr &&
                      tx.date <= satStr &&
                      (tx.type === "TECHNICIAN_TIP" || tx.type === "Technician Tip")
                  )
                  .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                const weekAdvances = payrollTransactions
                  .filter(
                    (tx) =>
                      tx.technicianId === tech.id &&
                      tx.date >= sunStr &&
                      tx.date <= satStr &&
                      tx.type === "ADVANCE"
                  )
                  .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                const weekRepayments = payrollTransactions
                  .filter(
                    (tx) =>
                      tx.technicianId === tech.id &&
                      tx.date >= sunStr &&
                      tx.date <= satStr &&
                      (tx.type === "ADVANCE_REPAYMENT" || tx.type === "ADVANCE_SETTLEMENT")
                  )
                  .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                const weekDeductions = payrollTransactions
                  .filter(
                    (tx) =>
                      tx.technicianId === tech.id &&
                      tx.date >= sunStr &&
                      tx.date <= satStr &&
                      tx.type === "DEDUCTION"
                  )
                  .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                // Salary Payments:
                // Saturday is the end of the payroll week and normal salary payment day.
                // Payments made during Sunday through Saturday belong to this week.
                const weekPayments = payrollTransactions
                  .filter(
                    (tx) =>
                      tx.technicianId === tech.id &&
                      (tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment") &&
                      tx.date >= sunStr &&
                      tx.date <= satStr
                  )
                  .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                const weekFinalBalance = weekEarned + weekTips - weekRepayments - weekDeductions - weekPayments;

                return {
                  tech,
                  techAtt,
                  presentDays,
                  leaveDays,
                  weekEarned,
                  weekTips,
                  weekAdvances,
                  weekRepayments,
                  weekDeductions,
                  weekPayments,
                  weekFinalBalance,
                };
              });

              const totalWeekPresent = weekTechRows.reduce((sum, r) => sum + r.presentDays, 0);
              const totalWeekLeave = weekTechRows.reduce((sum, r) => sum + r.leaveDays, 0);
              const totalWeekEarned = weekTechRows.reduce((sum, r) => sum + r.weekEarned, 0);
              const totalWeekTips = weekTechRows.reduce((sum, r) => sum + r.weekTips, 0);
              const totalWeekAdvances = weekTechRows.reduce((sum, r) => sum + r.weekAdvances, 0);
              const totalWeekRepayments = weekTechRows.reduce((sum, r) => sum + r.weekRepayments, 0);
              const totalWeekDeductions = weekTechRows.reduce((sum, r) => sum + r.weekDeductions, 0);
              const totalWeekPayments = weekTechRows.reduce((sum, r) => sum + r.weekPayments, 0);
              const totalWeekFinalBalance = weekTechRows.reduce((sum, r) => sum + r.weekFinalBalance, 0);

              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                        <th className="text-left px-4 py-3 font-semibold text-[#64748b] uppercase tracking-wider sticky left-0 bg-[#f8fafc] z-10 min-w-[140px]">
                          Technician
                        </th>
                        <th className="text-right px-3 py-3 font-semibold text-[#64748b] uppercase tracking-wider min-w-[80px]">
                          Rate
                        </th>
                        {weekDays.map((wd) => (
                          <th key={wd.dateStr} className={`text-center px-2 py-3 font-semibold uppercase tracking-wider min-w-[85px] ${wd.dayName === "SUN" ? "bg-slate-100/70" : ""}`}>
                            <div className="flex items-center justify-center gap-1">
                              <span className={`font-bold text-[12px] ${wd.dayName === "SUN" ? "text-slate-500" : "text-[#0f2340]"}`}>
                                {wd.dayName}
                              </span>
                              {wd.dayName === "SUN" && (
                                <span className="text-[9px] font-bold px-1 py-0.2 bg-slate-200 text-slate-600 rounded">
                                  OFF
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] font-semibold text-[#64748b]">{wd.formattedShort}</div>
                          </th>
                        ))}
                        <th className="text-center px-2.5 py-3 font-semibold text-[#008236] uppercase tracking-wider min-w-[65px]">
                          Present
                        </th>
                        <th className="text-center px-2.5 py-3 font-semibold text-amber-700 uppercase tracking-wider min-w-[65px]">
                          Leave
                        </th>
                        <th className="text-right px-3 py-3 font-semibold text-[#0f2340] uppercase tracking-wider min-w-[95px]">
                          Earnings
                        </th>
                        <th className="text-right px-3 py-3 font-semibold text-[#008236] uppercase tracking-wider min-w-[85px]">
                          Tips
                        </th>
                        <th className="text-right px-3 py-3 font-semibold text-amber-700 uppercase tracking-wider min-w-[85px]">
                          Advances
                        </th>
                        <th className="text-right px-3 py-3 font-semibold text-red-600 uppercase tracking-wider min-w-[85px]">
                          Deductions
                        </th>
                        <th className="text-right px-3 py-3 font-semibold text-purple-700 uppercase tracking-wider min-w-[85px]">
                          Payments
                        </th>
                        <th className="text-right px-4 py-3 font-semibold text-[#0f2340] uppercase tracking-wider min-w-[100px]">
                          Final Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {weekTechRows.map(
                        ({
                          tech,
                          techAtt,
                          presentDays,
                          leaveDays,
                          weekEarned,
                          weekTips,
                          weekAdvances,
                          weekRepayments,
                          weekDeductions,
                          weekPayments,
                          weekFinalBalance,
                        }) => {
                          return (
                            <tr key={tech.id} className="hover:bg-[#f8fafc] transition-colors">
                              <td className="px-4 py-3.5 font-semibold text-[#101828] sticky left-0 bg-white group-hover:bg-[#f8fafc] z-10">
                                <button
                                  onClick={() => onSelectTechnician(tech)}
                                  className="hover:text-[#1447e6] text-left transition-colors"
                                >
                                  {tech.name}
                                </button>
                              </td>
                              <td className="px-3 py-3.5 text-right font-mono font-bold text-[#0f2340]">
                                {tech.dailyRate.toLocaleString()}
                              </td>

                              {/* 7 Days Cells (Saturday -> Friday) */}
                              {weekDays.map((wd) => {
                                if (wd.dayName === "SUN") {
                                  return (
                                    <td key={wd.dateStr} className="px-1.5 py-3.5 text-center bg-slate-50/50">
                                      <span className="inline-block bg-slate-100 border border-slate-200 text-slate-500 font-semibold text-[10px] px-2 py-0.5 rounded tracking-wide">
                                        WEEKLY OFF
                                      </span>
                                    </td>
                                  );
                                }

                                const att = techAtt.find((ar) => ar.date === wd.dateStr);
                                const isPres = att?.status === "Present";
                                const isAbs = att?.status === "Absent";
                                const rate = att?.dailyRate || tech.dailyRate;

                                return (
                                  <td key={wd.dateStr} className="px-1.5 py-3.5 text-center">
                                    {isPres ? (
                                      <span className="inline-block bg-[#dcfce7] border border-[#bbf7d0] text-[#15803d] font-bold text-[11px] px-2 py-0.5 rounded shadow-2xs">
                                        ✓ {rate.toLocaleString()}
                                      </span>
                                    ) : isAbs ? (
                                      <span className="inline-block bg-amber-50 border border-amber-200 text-amber-800 font-bold text-[11px] px-2 py-0.5 rounded">
                                        ✕ 0
                                      </span>
                                    ) : (
                                      <span className="text-[#94a3b8] text-[11px]">—</span>
                                    )}
                                  </td>
                                );
                              })}

                              <td className="px-2.5 py-3.5 text-center font-bold text-[#008236]">
                                {presentDays}
                              </td>
                              <td className="px-2.5 py-3.5 text-center font-bold text-amber-700">
                                {leaveDays}
                              </td>
                              <td className="px-3 py-3.5 text-right font-mono font-bold text-[#0f2340]">
                                {weekEarned > 0 ? `+${weekEarned.toLocaleString()}` : "0"}
                              </td>
                              <td className="px-3 py-3.5 text-right font-mono font-bold text-[#008236]">
                                {weekTips > 0 ? `+${weekTips.toLocaleString()}` : "0"}
                              </td>
                              <td className="px-3 py-3.5 text-right font-mono text-amber-700">
                                {weekRepayments > 0 ? `-${weekRepayments.toLocaleString()}` : (weekAdvances > 0 ? `0 (Adv: ${weekAdvances.toLocaleString()})` : "0")}
                              </td>
                              <td className="px-3 py-3.5 text-right font-mono text-red-600">
                                {weekDeductions > 0 ? `-${weekDeductions.toLocaleString()}` : "0"}
                              </td>
                              <td className="px-3 py-3.5 text-right font-mono text-purple-700">
                                {weekPayments > 0 ? `-${weekPayments.toLocaleString()}` : "0"}
                              </td>
                              <td className="px-4 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold">
                                <span
                                  className={
                                    weekFinalBalance > 0
                                      ? "text-amber-700"
                                      : weekFinalBalance < 0
                                      ? "text-red-600"
                                      : "text-[#008236]"
                                  }
                                >
                                  {weekFinalBalance.toLocaleString()} EGP
                                </span>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                    <tfoot className="bg-[#f8fafc] border-t-2 border-[#cbd5e1] font-bold">
                      <tr>
                        <td className="px-4 py-3.5 text-[#0f2340] sticky left-0 bg-[#f8fafc] z-10 font-bold uppercase tracking-wider text-[11px]">
                          Weekly Totals
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono text-[#64748b] text-[11px]">
                          —
                        </td>
                        {weekDays.map((wd) => {
                          if (wd.dayName === "SUN") {
                            return (
                              <td key={wd.dateStr} className="px-1.5 py-3.5 text-center bg-slate-100/50">
                                <span className="text-slate-400 text-[10px] uppercase font-bold">OFF</span>
                              </td>
                            );
                          }

                          const dayPresentCount = attendanceRecords.filter(
                            (ar) => ar.date === wd.dateStr && ar.status === "Present" && nonDeleted.some((t) => t.id === ar.technicianId)
                          ).length;
                          const dayWages = payrollTransactions
                            .filter(
                              (tx) => tx.date === wd.dateStr && (tx.type === "DAILY_EARNING" || tx.type === "Daily Wage") && nonDeleted.some((t) => t.id === tx.technicianId)
                            )
                            .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

                          return (
                            <td key={wd.dateStr} className="px-1.5 py-3.5 text-center">
                              {dayPresentCount > 0 ? (
                                <div className="text-[11px] text-[#15803d]">
                                  <div className="font-bold">{dayPresentCount} Present</div>
                                  <div className="text-[10px] text-[#166534] font-mono font-medium">+{dayWages.toLocaleString()}</div>
                                </div>
                              ) : (
                                <span className="text-[#94a3b8] text-[11px]">0</span>
                              )}
                            </td>
                          );
                        })}
                        <td className="px-2.5 py-3.5 text-center font-bold text-[#008236]">
                          {totalWeekPresent}
                        </td>
                        <td className="px-2.5 py-3.5 text-center font-bold text-amber-700">
                          {totalWeekLeave}
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono font-bold text-[#0f2340]">
                          {totalWeekEarned > 0 ? `+${totalWeekEarned.toLocaleString()}` : "0"}
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono font-bold text-[#008236]">
                          {totalWeekTips > 0 ? `+${totalWeekTips.toLocaleString()}` : "0"}
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono text-amber-700">
                          {totalWeekRepayments > 0 ? `-${totalWeekRepayments.toLocaleString()}` : "0"}
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono text-red-600">
                          {totalWeekDeductions > 0 ? `-${totalWeekDeductions.toLocaleString()}` : "0"}
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono text-purple-700">
                          {totalWeekPayments > 0 ? `-${totalWeekPayments.toLocaleString()}` : "0"}
                        </td>
                        <td className="px-4 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold">
                          <span
                            className={
                              totalWeekFinalBalance > 0
                                ? "text-amber-700"
                                : totalWeekFinalBalance < 0
                                ? "text-red-600"
                                : "text-[#008236]"
                            }
                          >
                            {totalWeekFinalBalance.toLocaleString()} EGP
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ─── TAB 3: MONTHLY VIEW (REQUIREMENT 9) ─── */}
      {activeTab === "monthly" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
            {/* Filter controls */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6 border-b border-[#f1f5f9] pb-4">
              <div>
                <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">
                  Monthly Payroll Reconciliation
                </h3>
                <p className="text-[12px] text-[#64748b]">
                  Aggregated from underlying attendance and transaction records
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#64748b] uppercase mb-1">Select Month</label>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="h-9 px-3 border border-[#d1d5dc] rounded-lg text-[13px] text-[#0f2340] outline-none focus:border-[#0f2340]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#64748b] uppercase mb-1">Technician</label>
                  <select
                    value={selectedTechFilter}
                    onChange={(e) => setSelectedTechFilter(e.target.value)}
                    className="h-9 px-3 border border-[#d1d5dc] rounded-lg text-[13px] text-[#0f2340] outline-none focus:border-[#0f2340] bg-white min-w-[160px]"
                  >
                    <option value="ALL">All Technicians</option>
                    {nonDeleted.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Monthly Aggregates Cards */}
            {(() => {
              const monthAtt = attendanceRecords.filter((ar) => {
                const matchM = ar.date.startsWith(selectedMonth);
                const matchT = selectedTechFilter === "ALL" || ar.technicianId === selectedTechFilter;
                return matchM && matchT;
              });

              const monthTx = payrollTransactions.filter((tx) => {
                const matchM = tx.date.startsWith(selectedMonth);
                const matchT = selectedTechFilter === "ALL" || tx.technicianId === selectedTechFilter;
                return matchM && matchT;
              });

              const mPresent = monthAtt.filter((ar) => ar.status === "Present").length;
              const mLeave = monthAtt.filter((ar) => ar.status === "Absent").length;

              const mEarned = monthTx
                .filter((tx) => tx.type === "DAILY_EARNING" || tx.type === "Daily Wage")
                .reduce((s, tx) => s + Math.abs(tx.amount), 0);

              const mTips = monthTx
                .filter((tx) => tx.type === "TECHNICIAN_TIP" || tx.type === "Technician Tip")
                .reduce((s, tx) => s + Math.abs(tx.amount), 0);

              const mAdvances = monthTx
                .filter((tx) => tx.type === "ADVANCE")
                .reduce((s, tx) => s + Math.abs(tx.amount), 0);

              const mRepayments = monthTx
                .filter((tx) => tx.type === "ADVANCE_REPAYMENT" || tx.type === "ADVANCE_SETTLEMENT")
                .reduce((s, tx) => s + Math.abs(tx.amount), 0);

              const mDeductions = monthTx
                .filter((tx) => tx.type === "DEDUCTION")
                .reduce((s, tx) => s + Math.abs(tx.amount), 0);

              const mPaid = monthTx
                .filter((tx) => tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment")
                .reduce((s, tx) => s + Math.abs(tx.amount), 0);

              const mNetBalance = mEarned + mTips - mRepayments - mDeductions - mPaid;

              return (
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                      <p className="text-[11px] font-semibold text-[#64748b] uppercase">Present / Leave Days</p>
                      <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-[#0f2340]">
                        {mPresent} <span className="text-[13px] font-normal text-[#64748b]">Present / {mLeave} Leave</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
                      <p className="text-[11px] font-semibold text-[#15803d] uppercase">Total Gross Earned</p>
                      <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-[#15803d]">
                        +{(mEarned + mTips).toLocaleString()} EGP
                      </p>
                      <p className="text-[10px] text-[#166534]">Daily: {mEarned.toLocaleString()} | Tips: {mTips.toLocaleString()}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                      <p className="text-[11px] font-semibold text-emerald-800 uppercase">Total Tips</p>
                      <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-emerald-700">
                        +{mTips.toLocaleString()} EGP
                      </p>
                      <p className="text-[10px] text-emerald-600">Technician Gratuity</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#fffbeb] border border-[#fde68a]">
                      <p className="text-[11px] font-semibold text-amber-800 uppercase">Advance Repayments & Deductions</p>
                      <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-amber-800">
                        -{(mRepayments + mDeductions).toLocaleString()} EGP
                      </p>
                      <p className="text-[10px] text-amber-700">Repay: {mRepayments.toLocaleString()} | Ded: {mDeductions.toLocaleString()}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                      <p className="text-[11px] font-semibold text-purple-800 uppercase">Total Salary Paid</p>
                      <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-purple-800">
                        -{mPaid.toLocaleString()} EGP
                      </p>
                    </div>
                  </div>

                  {/* Monthly Table Breakdown */}
                  <div className="border border-[#e5e7eb] rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                          <th className="text-left px-5 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Technician</th>
                          <th className="text-right px-4 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Daily Rate</th>
                          <th className="text-center px-4 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Present Days</th>
                          <th className="text-center px-4 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Leave Days</th>
                          <th className="text-right px-4 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Daily Earned</th>
                          <th className="text-right px-4 py-3 font-semibold text-[11px] text-[#008236] uppercase">Tips</th>
                          <th className="text-right px-4 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Advances</th>
                          <th className="text-right px-4 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Deductions</th>
                          <th className="text-right px-4 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Payments</th>
                          <th className="text-right px-5 py-3 font-semibold text-[11px] text-[#64748b] uppercase">Month Net Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9]">
                        {nonDeleted
                          .filter((t) => selectedTechFilter === "ALL" || t.id === selectedTechFilter)
                          .map((tech) => {
                            const tAtt = monthAtt.filter((ar) => ar.technicianId === tech.id);
                            const tTx = monthTx.filter((tx) => tx.technicianId === tech.id);

                            const pres = tAtt.filter((ar) => ar.status === "Present").length;
                            const leave = tAtt.filter((ar) => ar.status === "Absent").length;

                            const earned = tTx
                              .filter((tx) => tx.type === "DAILY_EARNING" || tx.type === "Daily Wage")
                              .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                            const tips = tTx
                              .filter((tx) => tx.type === "TECHNICIAN_TIP" || tx.type === "Technician Tip")
                              .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                            const adv = tTx
                              .filter((tx) => tx.type === "ADVANCE")
                              .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                            const ded = tTx
                              .filter((tx) => tx.type === "DEDUCTION")
                              .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                            const pay = tTx
                              .filter((tx) => tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment")
                              .reduce((s, tx) => s + Math.abs(tx.amount), 0);

                            const netBal = earned + tips - adv - ded - pay;

                            return (
                              <tr key={tech.id} className="hover:bg-[#f8fafc]">
                                <td className="px-5 py-3.5 font-semibold text-[13px] text-[#101828]">
                                  <button onClick={() => onSelectTechnician(tech)} className="hover:text-[#1447e6]">
                                    {tech.name}
                                  </button>
                                </td>
                                <td className="px-4 py-3.5 text-right font-mono text-[13px] text-[#0f2340]">
                                  {tech.dailyRate.toLocaleString()} EGP
                                </td>
                                <td className="px-4 py-3.5 text-center font-bold text-[#008236]">{pres}</td>
                                <td className="px-4 py-3.5 text-center font-bold text-amber-700">{leave}</td>
                                <td className="px-4 py-3.5 text-right font-mono font-bold text-[#008236]">
                                  +{earned.toLocaleString()} EGP
                                </td>
                                <td className="px-4 py-3.5 text-right font-mono font-bold text-[#008236]">
                                  {tips > 0 ? `+${tips.toLocaleString()} EGP` : "0"}
                                </td>
                                <td className="px-4 py-3.5 text-right font-mono text-amber-700">
                                  {adv > 0 ? `-${adv.toLocaleString()} EGP` : "0"}
                                </td>
                                <td className="px-4 py-3.5 text-right font-mono text-red-600">
                                  {ded > 0 ? `-${ded.toLocaleString()} EGP` : "0"}
                                </td>
                                <td className="px-4 py-3.5 text-right font-mono text-purple-700">
                                  {pay > 0 ? `-${pay.toLocaleString()} EGP` : "0"}
                                </td>
                                <td className="px-5 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px]">
                                  <span className={netBal > 0 ? "text-amber-700" : netBal < 0 ? "text-red-600" : "text-[#008236]"}>
                                    {netBal.toLocaleString()} EGP
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Technician Details Screen ───────────────────────────────────────────────

function TechnicianDetailsScreen({
  technician,
  attendanceRecords,
  payrollTransactions,
  stats,
  onBack,
  onOpenPaySalary,
  onOpenAdvance,
  onOpenSettleAdvance,
  onOpenDeduction,
  onOpenTip,
  onOpenEditTech,
  onUpdateTechnician,
  onDeleteTechnician,
  role = "accountant",
}: {
  technician: Technician;
  attendanceRecords: AttendanceRecord[];
  payrollTransactions: PayrollTransaction[];
  stats: {
    dailyEarnings?: number;
    totalDailyEarnings?: number;
    totalTips?: number;
    totalEarnings: number;
    totalAdvances: number;
    totalAdvanceRepayments?: number;
    outstandingAdvance?: number;
    totalDeductions: number;
    totalPayments: number;
    unpaidBalance: number;
    presentDays: number;
    absentDays: number;
    totalEarned: number;
    totalPaid: number;
  };
  onBack: () => void;
  onOpenPaySalary: () => void;
  onOpenAdvance?: () => void;
  onOpenSettleAdvance?: () => void;
  onOpenDeduction?: () => void;
  onOpenTip?: () => void;
  onOpenEditTech?: () => void;
  onUpdateTechnician?: (id: string, data: Partial<Technician>) => void;
  onDeleteTechnician?: () => void;
  role?: string;
}) {
  // Navigation tabs: ledger | attendance | advances | tips | deductions | payments | excel | info
  const [activeTab, setActiveTab] = useState<
    "ledger" | "attendance" | "advances" | "tips" | "deductions" | "payments" | "excel" | "info"
  >("ledger");

  // Date range filter: ALL | TODAY | THIS_WEEK | THIS_MONTH | CUSTOM
  const [dateFilter, setDateFilter] = useState<"ALL" | "TODAY" | "THIS_WEEK" | "THIS_MONTH" | "CUSTOM">("ALL");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  // Ledger specific filters
  const [ledgerTypeFilter, setLedgerTypeFilter] = useState<
    "ALL" | "DAILY_EARNING" | "TECHNICIAN_TIP" | "ADVANCE" | "ADVANCE_REPAYMENT" | "DEDUCTION" | "SALARY_PAYMENT"
  >("ALL");
  const [ledgerSortOrder, setLedgerSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editName, setEditName] = useState(technician.name);
  const [editPhone, setEditPhone] = useState(technician.phone || "");
  const [editRate, setEditRate] = useState(technician.dailyRate.toString());
  const [editStatus, setEditStatus] = useState(technician.status);

  // 1. DATA ISOLATION: Strict scope to this technician's ID
  const techTx = useMemo(() => {
    return payrollTransactions.filter((tx) => tx.technicianId === technician.id);
  }, [payrollTransactions, technician.id]);

  const techAtt = useMemo(() => {
    return attendanceRecords.filter((ar) => ar.technicianId === technician.id);
  }, [attendanceRecords, technician.id]);

  // Date filtering helper
  function matchesDateFilter(dateStr: string) {
    if (dateFilter === "ALL") return true;
    const today = getTodayLocalDateString();
    if (dateFilter === "TODAY") return dateStr === today;
    if (dateFilter === "THIS_WEEK") {
      const weekStart = getPayrollWeekStart();
      const weekEnd = getPayrollWeekEnd(weekStart);
      return dateStr >= weekStart && dateStr <= weekEnd;
    }
    if (dateFilter === "THIS_MONTH") {
      return dateStr.startsWith(today.slice(0, 7));
    }
    if (dateFilter === "CUSTOM") {
      if (customStartDate && dateStr < customStartDate) return false;
      if (customEndDate && dateStr > customEndDate) return false;
      return true;
    }
    return true;
  }

  // 2. FINANCIAL CALCULATIONS (Formula verified)
  // Total Daily Earnings + Total Tips - Total Advances - Total Deductions - Total Salary Payments = Current Unpaid Balance
  const totalDailyEarnings = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "DAILY_EARNING" || tx.type === "Daily Wage")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [techTx]);

  const totalTips = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "TECHNICIAN_TIP" || tx.type === "Technician Tip")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [techTx]);

  const totalAdvances = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "ADVANCE")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [techTx]);

  const totalAdvanceRepayments = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "ADVANCE_REPAYMENT" || tx.type === "ADVANCE_SETTLEMENT")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [techTx]);

  const outstandingAdvance = Math.max(0, totalAdvances - totalAdvanceRepayments);

  const totalDeductions = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "DEDUCTION")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [techTx]);

  const totalSalaryPayments = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [techTx]);

  const totalEarnings = totalDailyEarnings + totalTips;
  // Advance taken does NOT reduce salary. Only Advance Repayment reduces salary!
  const unpaidBalance = totalEarnings - totalAdvanceRepayments - totalDeductions - totalSalaryPayments;
  const salaryRemaining = unpaidBalance;

  // Specific Subsets (ordered newest first for sections)
  const techAdvances = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "ADVANCE")
      .sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || "").localeCompare(a.createdAt || ""));
  }, [techTx]);

  const techTips = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "TECHNICIAN_TIP" || tx.type === "Technician Tip")
      .sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || "").localeCompare(a.createdAt || ""));
  }, [techTx]);

  const techDeductions = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "DEDUCTION")
      .sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || "").localeCompare(a.createdAt || ""));
  }, [techTx]);

  const techPayments = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment")
      .sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || "").localeCompare(a.createdAt || ""));
  }, [techTx]);

  // 3. CHRONOLOGICAL TRANSACTION LEDGER WITH RUNNING BALANCE
  const chronoLedger = useMemo(() => {
    // Sort ascending: earliest to latest
    const sorted = [...techTx].sort((a, b) => {
      const dCmp = a.date.localeCompare(b.date);
      if (dCmp !== 0) return dCmp;
      return (a.createdAt || "").localeCompare(b.createdAt || "");
    });

    let running = 0;
    return sorted.map((tx) => {
      const isWage = tx.type === "DAILY_EARNING" || tx.type === "Daily Wage";
      const isTip = tx.type === "TECHNICIAN_TIP" || tx.type === "Technician Tip";
      const isAdv = tx.type === "ADVANCE";
      const isRepay = tx.type === "ADVANCE_REPAYMENT" || tx.type === "ADVANCE_SETTLEMENT";
      const isDed = tx.type === "DEDUCTION";
      const isPay = tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment";

      let delta = 0;
      let displayType = "Transaction";
      let badgeStyle = "bg-gray-100 text-gray-800 border-gray-200";

      if (isWage) {
        delta = Math.abs(tx.amount);
        displayType = "Daily Earning";
        badgeStyle = "bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]";
      } else if (isTip) {
        delta = Math.abs(tx.amount);
        displayType = "Technician Tip";
        badgeStyle = "bg-emerald-100 text-emerald-800 border-emerald-300";
      } else if (isAdv) {
        // Advance does NOT reduce salary running balance
        delta = 0;
        displayType = "Advance";
        badgeStyle = "bg-amber-100 text-amber-800 border-amber-300";
      } else if (isRepay) {
        // Advance Repayment reduces salary running balance
        delta = -Math.abs(tx.amount);
        displayType = "Advance Repayment";
        badgeStyle = "bg-indigo-100 text-indigo-800 border-indigo-300";
      } else if (isDed) {
        delta = -Math.abs(tx.amount);
        displayType = "Deduction";
        badgeStyle = "bg-red-100 text-red-700 border-red-300";
      } else if (isPay) {
        delta = -Math.abs(tx.amount);
        displayType = "Salary Payment";
        badgeStyle = "bg-purple-100 text-purple-800 border-purple-300";
      }

      running += delta;

      let description = tx.description || "";
      if (!description || description === "Transaction") {
        if (isWage) description = "Attendance - Present";
        else if (isTip) description = tx.reason ? `Customer Tip: ${tx.reason}` : "Customer Tip";
        else if (isAdv) description = `Advance (${tx.paymentMethod || "Cash"})`;
        else if (isRepay) description = tx.notes ? `Advance Repayment: ${tx.notes}` : "Advance Repayment (Deducted from Salary)";
        else if (isDed) description = `Deduction: ${tx.reason || "Penalty"}`;
        else if (isPay) description = `Salary Payment (${tx.paymentMethod || "Cash"})`;
      }

      return {
        ...tx,
        displayType,
        badgeStyle,
        delta,
        runningBalance: running,
        description,
        isWage,
        isTip,
        isAdv,
        isRepay,
        isDed,
        isPay,
        createdBy: tx.createdBy || "Accountant",
      };
    });
  }, [techTx]);

  // Filtered Chronological Ledger
  const filteredChronoLedger = useMemo(() => {
    let list = chronoLedger.filter((item) => {
      // 1. Date filter
      if (!matchesDateFilter(item.date)) return false;

      // 2. Type filter
      if (ledgerTypeFilter === "DAILY_EARNING" && !item.isWage) return false;
      if (ledgerTypeFilter === "TECHNICIAN_TIP" && !item.isTip) return false;
      if (ledgerTypeFilter === "ADVANCE" && !item.isAdv) return false;
      if ((ledgerTypeFilter as string) === "ADVANCE_REPAYMENT" && !item.isRepay) return false;
      if (ledgerTypeFilter === "DEDUCTION" && !item.isDed) return false;
      if (ledgerTypeFilter === "SALARY_PAYMENT" && !item.isPay) return false;

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchDesc = (item.description || "").toLowerCase().includes(q);
        const matchReason = (item.reason || "").toLowerCase().includes(q);
        const matchNotes = (item.notes || "").toLowerCase().includes(q);
        const matchMethod = (item.paymentMethod || "").toLowerCase().includes(q);
        const matchType = item.displayType.toLowerCase().includes(q);
        const matchDate = item.date.includes(q);
        if (!matchDesc && !matchReason && !matchNotes && !matchMethod && !matchType && !matchDate) {
          return false;
        }
      }

      return true;
    });

    if (ledgerSortOrder === "desc") {
      list = [...list].reverse();
    }
    return list;
  }, [chronoLedger, dateFilter, customStartDate, customEndDate, ledgerTypeFilter, searchQuery, ledgerSortOrder]);

  // Compute Excel Daily Table Rows
  const excelRows = useMemo(() => {
    return computeExcelDailyRows(technician.id, technician.dailyRate, attendanceRecords, payrollTransactions);
  }, [technician.id, technician.dailyRate, attendanceRecords, payrollTransactions]);

  // Filtered Attendance Records
  const filteredAttendance = useMemo(() => {
    return techAtt
      .filter((ar) => matchesDateFilter(ar.date))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [techAtt, dateFilter, customStartDate, customEndDate]);

  // Filtered Advances
  const filteredAdvances = useMemo(() => {
    return techAdvances.filter((adv) => matchesDateFilter(adv.date));
  }, [techAdvances, dateFilter, customStartDate, customEndDate]);

  // Combined Advances & Repayments
  const techAdvancesAndRepayments = useMemo(() => {
    return techTx
      .filter((tx) => tx.type === "ADVANCE" || tx.type === "ADVANCE_REPAYMENT" || tx.type === "ADVANCE_SETTLEMENT")
      .sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || "").localeCompare(a.createdAt || ""));
  }, [techTx]);

  const filteredAdvancesAndRepayments = useMemo(() => {
    return techAdvancesAndRepayments.filter((tx) => matchesDateFilter(tx.date));
  }, [techAdvancesAndRepayments, dateFilter, customStartDate, customEndDate]);

  // Filtered Tips
  const filteredTips = useMemo(() => {
    return techTips.filter((tip) => matchesDateFilter(tip.date));
  }, [techTips, dateFilter, customStartDate, customEndDate]);

  // Filtered Deductions
  const filteredDeductions = useMemo(() => {
    return techDeductions.filter((ded) => matchesDateFilter(ded.date));
  }, [techDeductions, dateFilter, customStartDate, customEndDate]);

  // Filtered Salary Payments
  const filteredPayments = useMemo(() => {
    return techPayments.filter((pay) => matchesDateFilter(pay.date));
  }, [techPayments, dateFilter, customStartDate, customEndDate]);

  return (
    <div className={`${role === "owner" || role === "accountant" ? "ml-[168px]" : "ml-56"} mt-14 min-h-screen bg-[#f3f4f6] p-6 pb-20`}>
      {/* ── Top Bar: Back to Technicians Directory ── */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#d1d5dc] rounded-lg text-[13px] font-medium text-[#334155] hover:bg-[#f8fafc] transition-colors shadow-2xs"
        >
          <span>←</span> Back to Technicians
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-1 bg-white border border-[#e2e8f0] rounded text-[#64748b]">
            ID: {technician.id}
          </span>
          <span className="text-[11px] font-medium px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded">
            🔒 Strictly Scoped to {technician.name}
          </span>
        </div>
      </div>

      {/* ── TECHNICIAN HEADER ── */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0f2340] to-[#1e3a8a] text-white flex items-center justify-center font-bold text-[22px] shadow-sm">
              {technician.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[24px] text-[#0f2340]">
                  {technician.name}
                </h1>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    technician.status === "Active"
                      ? "bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {technician.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[13px] text-[#64748b] mt-1.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <span>📞</span> {technician.phone || "No phone listed"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span>📅</span> Joined: {technician.joinedDate || "—"}
                </span>
                <span>•</span>
                <span className="font-mono text-[#0f2340]">
                  Current Daily Rate: <strong className="text-[#0f2340]">{technician.dailyRate.toLocaleString()} EGP</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons in Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                setEditName(technician.name);
                setEditPhone(technician.phone || "");
                setEditRate(technician.dailyRate.toString());
                setEditStatus(technician.status);
                setShowEditModal(true);
                onOpenEditTech?.();
              }}
              className="px-3.5 py-2 border border-[#d1d5dc] bg-white rounded-lg text-[12px] text-[#334155] hover:bg-[#f1f5f9] font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>✏️</span> Edit / Change Rate
            </button>
            <button
              onClick={onOpenTip}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>🎁</span> Record Tip
            </button>
            <button
              onClick={onOpenAdvance}
              className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>💳</span> Record Advance
            </button>
            <button
              onClick={onOpenSettleAdvance}
              className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>🔄</span> Settle Advance
            </button>
            <button
              onClick={onOpenDeduction}
              className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>✂️</span> Record Deduction
            </button>
            <button
              onClick={onOpenPaySalary}
              disabled={unpaidBalance <= 0}
              className={`px-4 py-2 rounded-lg font-semibold text-[12px] transition-colors shadow-sm flex items-center gap-1.5 ${
                unpaidBalance > 0
                  ? "bg-[#008236] text-white hover:bg-[#006e2e]"
                  : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
              }`}
            >
              <span>💵</span> Pay Salary
            </button>
            {onDeleteTechnician && !technician.isDeleted && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-2.5 py-2 border border-red-200 rounded-lg text-[12px] text-red-600 hover:bg-red-50 font-medium transition-colors"
                title="Delete technician"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── SALARY & ADVANCES DUAL PANELS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* SALARY SUMMARY */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[16px]">💰</span>
              <h4 className="font-['Inter:Bold',sans-serif] font-bold text-[13px] text-[#0f2340] uppercase tracking-wider">SALARY</h4>
            </div>
            <span className="text-[11px] text-[#64748b]">Earnings & Payouts</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[11px] font-semibold text-[#64748b]">Total Earnings</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-[#0f2340]">
                {totalEarnings.toLocaleString()} EGP
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#64748b]">Salary Paid</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-[#008236]">
                {totalSalaryPayments.toLocaleString()} EGP
              </p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-200">
              <p className="text-[11px] font-bold text-emerald-800">Salary Remaining</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-emerald-700">
                {salaryRemaining.toLocaleString()} EGP
              </p>
            </div>
          </div>
        </div>

        {/* ADVANCES SUMMARY */}
        <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[16px]">💳</span>
              <h4 className="font-['Inter:Bold',sans-serif] font-bold text-[13px] text-amber-900 uppercase tracking-wider">ADVANCES</h4>
            </div>
            <button
              onClick={onOpenSettleAdvance}
              className="text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-0.5 rounded border border-indigo-200 transition-colors flex items-center gap-1"
            >
              <span>🔄</span> Settle Advance
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[11px] font-semibold text-amber-800">Total Advances</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-amber-900">
                {totalAdvances.toLocaleString()} EGP
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-amber-800">Advance Repayments</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-indigo-700">
                {totalAdvanceRepayments.toLocaleString()} EGP
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-300">
              <p className="text-[11px] font-bold text-amber-900">Outstanding Advance</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-amber-800">
                {outstandingAdvance.toLocaleString()} EGP
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6 SUMMARY CARDS (Exact Formula Verified) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        {/* Card 1: Total Daily Earnings */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-xs">
          <p className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
            Total Daily Earnings
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-[#0f2340]">
            +{totalDailyEarnings.toLocaleString()} EGP
          </p>
          <p className="text-[10px] text-[#64748b] mt-1">
            From {techAtt.filter((a) => a.status === "Present").length} Present attendances
          </p>
        </div>

        {/* Card 2: Total Tips */}
        <div className="bg-white border-2 border-emerald-300 rounded-xl p-4 shadow-xs">
          <p className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            Total Tips / Gratuity
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-emerald-700">
            +{totalTips.toLocaleString()} EGP
          </p>
          <p className="text-[10px] text-emerald-600 mt-1">
            {techTips.length} Tips recorded (+Liability)
          </p>
        </div>

        {/* Card 3: Total Advances */}
        <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-xs">
          <p className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-1">
            Total Advances
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-amber-700">
            {totalAdvances.toLocaleString()} EGP
          </p>
          <p className="text-[10px] text-amber-600 mt-1">
            Repaid: {totalAdvanceRepayments.toLocaleString()} | Outstanding: {outstandingAdvance.toLocaleString()} EGP
          </p>
        </div>

        {/* Card 4: Total Deductions */}
        <div className="bg-white border border-red-200 rounded-xl p-4 shadow-xs">
          <p className="text-[11px] font-semibold text-red-700 uppercase tracking-wider mb-1">
            Total Deductions
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-red-600">
            -{totalDeductions.toLocaleString()} EGP
          </p>
          <p className="text-[10px] text-red-600 mt-1">
            {techDeductions.length} Deductions applied
          </p>
        </div>

        {/* Card 5: Total Salary Paid */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-xs">
          <p className="text-[11px] font-semibold text-[#008236] uppercase tracking-wider mb-1">
            Total Salary Paid
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-[#008236]">
            -{totalSalaryPayments.toLocaleString()} EGP
          </p>
          <p className="text-[10px] text-[#008236] mt-1">
            {techPayments.length} Payments settled
          </p>
        </div>

        {/* Card 6: Current Unpaid Balance (PROMINENT) */}
        <div className="bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] border-2 border-amber-400 rounded-xl p-4 shadow-xs">
          <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1">
            Salary Remaining
          </p>
          <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[22px] text-amber-800">
            {salaryRemaining.toLocaleString()} EGP
          </p>
          <p className="text-[10px] text-amber-800 font-medium mt-1">
            Earnings − Adv Repaid − Ded − Paid
          </p>
        </div>
      </div>

      {/* ── GLOBAL DATE FILTER BAR ── */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-3.5 shadow-2xs mb-5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] font-semibold text-[#475569] flex items-center gap-1">
            <span>📅</span> Date Filter:
          </span>
          {(["ALL", "TODAY", "THIS_WEEK", "THIS_MONTH", "CUSTOM"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setDateFilter(mode)}
              className={`px-3 py-1 rounded-md text-[12px] font-semibold transition-all ${
                dateFilter === mode
                  ? "bg-[#0f2340] text-white shadow-2xs"
                  : "bg-[#f1f5f9] text-[#64748b] hover:text-[#0f2340]"
              }`}
            >
              {mode === "ALL"
                ? "All Records"
                : mode === "TODAY"
                ? "Today"
                : mode === "THIS_WEEK"
                ? "This Week (Sat-Fri)"
                : mode === "THIS_MONTH"
                ? "This Month"
                : "Custom Range"}
            </button>
          ))}
        </div>

        {dateFilter === "CUSTOM" && (
          <div className="flex items-center gap-2 text-[12px]">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="px-2.5 py-1 border border-[#d1d5dc] rounded-md text-[#334155]"
            />
            <span className="text-[#94a3b8]">→</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="px-2.5 py-1 border border-[#d1d5dc] rounded-md text-[#334155]"
            />
          </div>
        )}
      </div>

      {/* ── TABS CONTAINER ── */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
        <div className="border-b border-[#e5e7eb] flex bg-[#fafbfc] overflow-x-auto">
          <button
            onClick={() => setActiveTab("ledger")}
            className={`px-5 py-3.5 text-[13px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "ledger"
                ? "text-[#0f2340] border-b-2 border-[#0f2340] bg-white shadow-xs"
                : "text-[#64748b] hover:text-[#0f2340]"
            }`}
          >
            <span>📜</span> Complete Payroll History ({filteredChronoLedger.length})
          </button>

          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-5 py-3.5 text-[13px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "attendance"
                ? "text-[#0f2340] border-b-2 border-[#0f2340] bg-white shadow-xs"
                : "text-[#64748b] hover:text-[#0f2340]"
            }`}
          >
            <span>📅</span> Attendance ({filteredAttendance.length})
          </button>

          <button
            onClick={() => setActiveTab("advances")}
            className={`px-5 py-3.5 text-[13px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "advances"
                ? "text-[#0f2340] border-b-2 border-[#0f2340] bg-white shadow-xs"
                : "text-[#64748b] hover:text-[#0f2340]"
            }`}
          >
            <span>💳</span> Advances ({filteredAdvances.length})
          </button>

          <button
            onClick={() => setActiveTab("tips")}
            className={`px-5 py-3.5 text-[13px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "tips"
                ? "text-emerald-700 border-b-2 border-emerald-600 bg-white shadow-xs"
                : "text-[#64748b] hover:text-emerald-700"
            }`}
          >
            <span>🎁</span> Tips / Gratuity ({filteredTips.length})
          </button>

          <button
            onClick={() => setActiveTab("deductions")}
            className={`px-5 py-3.5 text-[13px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "deductions"
                ? "text-[#0f2340] border-b-2 border-[#0f2340] bg-white shadow-xs"
                : "text-[#64748b] hover:text-[#0f2340]"
            }`}
          >
            <span>✂️</span> Deductions ({filteredDeductions.length})
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`px-5 py-3.5 text-[13px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "payments"
                ? "text-[#0f2340] border-b-2 border-[#0f2340] bg-white shadow-xs"
                : "text-[#64748b] hover:text-[#0f2340]"
            }`}
          >
            <span>💵</span> Salary Payments ({filteredPayments.length})
          </button>

          <button
            onClick={() => setActiveTab("excel")}
            className={`px-5 py-3.5 text-[13px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "excel"
                ? "text-[#0f2340] border-b-2 border-[#0f2340] bg-white shadow-xs"
                : "text-[#64748b] hover:text-[#0f2340]"
            }`}
          >
            <span>📊</span> Excel Daily View ({excelRows.length} Days)
          </button>

          <button
            onClick={() => setActiveTab("info")}
            className={`px-5 py-3.5 text-[13px] font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "info"
                ? "text-[#0f2340] border-b-2 border-[#0f2340] bg-white shadow-xs"
                : "text-[#64748b] hover:text-[#0f2340]"
            }`}
          >
            <span>👤</span> Profile
          </button>
        </div>

        <div className="p-6">
          {/* ══════════════════════════════════════════════════════════════
              TAB 1: COMPLETE PAYROLL HISTORY (RUNNING BALANCE LEDGER)
             ══════════════════════════════════════════════════════════════ */}
          {activeTab === "ledger" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">
                    Chronological Transaction Ledger
                  </h3>
                  <p className="text-[12px] text-[#64748b]">
                    Every wage earning, tip, advance, deduction, and salary payout with calculated cumulative running balance
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Search box */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-7 pr-3 py-1.5 border border-[#d1d5dc] rounded-lg text-[12px] text-[#0f2340] focus:outline-none focus:border-[#0f2340] w-48"
                    />
                    <span className="absolute left-2.5 top-2 text-[12px] text-[#94a3b8]">🔍</span>
                  </div>

                  {/* Sort Order Toggle */}
                  <button
                    onClick={() => setLedgerSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                    className="px-2.5 py-1.5 border border-[#d1d5dc] bg-white rounded-lg text-[12px] font-medium text-[#475569] hover:bg-[#f8fafc]"
                  >
                    {ledgerSortOrder === "asc" ? "⬆️ Oldest First" : "⬇️ Newest First"}
                  </button>
                </div>
              </div>

              {/* Transaction Type Filters */}
              <div className="flex items-center bg-[#f1f5f9] p-1 rounded-lg text-[12px] flex-wrap gap-1">
                {(["ALL", "DAILY_EARNING", "TECHNICIAN_TIP", "ADVANCE", "ADVANCE_REPAYMENT", "DEDUCTION", "SALARY_PAYMENT"] as const).map(
                  (filterVal) => (
                    <button
                      key={filterVal}
                      onClick={() => setLedgerTypeFilter(filterVal)}
                      className={`px-3 py-1 rounded-md font-semibold transition-all ${
                        ledgerTypeFilter === filterVal
                          ? "bg-white text-[#0f2340] shadow-2xs"
                          : "text-[#64748b] hover:text-[#0f2340]"
                      }`}
                    >
                      {filterVal === "ALL"
                        ? "All Events"
                        : filterVal === "DAILY_EARNING"
                        ? "Daily Earnings"
                        : filterVal === "TECHNICIAN_TIP"
                        ? "Tips"
                        : filterVal === "ADVANCE"
                        ? "Advances"
                        : filterVal === "ADVANCE_REPAYMENT"
                        ? "Advance Repayments"
                        : filterVal === "DEDUCTION"
                        ? "Deductions"
                        : "Salary Payments"}
                    </button>
                  )
                )}
              </div>

              {filteredChronoLedger.length === 0 ? (
                <div className="p-12 text-center bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <p className="text-[14px] text-[#94a3b8]">No transactions match your current filters.</p>
                </div>
              ) : (
                <div className="border border-[#e5e7eb] rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                        <th className="text-left px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Date</th>
                        <th className="text-left px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Transaction Type</th>
                        <th className="text-left px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Description</th>
                        <th className="text-right px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Amount</th>
                        <th className="text-right px-5 py-3.5 font-semibold text-[11px] text-[#0f2340] uppercase bg-amber-50/60">
                          Running Balance
                        </th>
                        <th className="text-left px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Created By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {filteredChronoLedger.map((row) => (
                        <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors">
                          <td className="px-4 py-3 font-mono font-medium text-[#101828] whitespace-nowrap">
                            {row.date}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${row.badgeStyle}`}>
                              {row.displayType}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#334155] font-medium">
                            <div>{row.description}</div>
                            {row.notes && row.notes !== row.description && (
                              <div className="text-[11px] text-[#64748b] mt-0.5">{row.notes}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold whitespace-nowrap">
                            <span
                              className={
                                row.isWage
                                  ? "text-[#008236]"
                                  : row.isTip
                                  ? "text-emerald-700"
                                  : row.isAdv
                                  ? "text-amber-700"
                                  : row.isRepay
                                  ? "text-indigo-700"
                                  : row.isDed
                                  ? "text-red-600"
                                  : "text-purple-700"
                              }
                            >
                              {row.isAdv || row.isWage || row.isTip
                                ? `+${Math.abs(row.amount).toLocaleString()}`
                                : `-${Math.abs(row.amount).toLocaleString()}`}{" "}
                              EGP
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[14px] bg-amber-50/40 whitespace-nowrap">
                            <span className={row.runningBalance < 0 ? "text-red-600" : "text-amber-800"}>
                              {row.runningBalance.toLocaleString()} EGP
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[12px] text-[#64748b] whitespace-nowrap">
                            {row.createdBy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-[#fafbfc] border-t-2 border-[#e2e8f0] font-bold text-[13px]">
                      <tr>
                        <td colSpan={3} className="px-4 py-3.5 text-[#0f2340]">
                          Current Total Unpaid Balance (Formula Verified)
                        </td>
                        <td className="px-4 py-3.5 text-right font-mono text-[#64748b]">
                          {techTx.length} Transactions
                        </td>
                        <td className="px-5 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] text-[16px] text-amber-800 bg-amber-50/70">
                          {unpaidBalance.toLocaleString()} EGP
                        </td>
                        <td className="px-4 py-3.5"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB 2: ATTENDANCE
             ══════════════════════════════════════════════════════════════ */}
          {activeTab === "attendance" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">
                    Attendance Records ({filteredAttendance.length})
                  </h3>
                  <p className="text-[12px] text-[#64748b]">
                    Every attendance entry with daily rate snapshot. Historical attendance earnings never change when daily rate is edited.
                  </p>
                </div>
              </div>

              {filteredAttendance.length === 0 ? (
                <div className="p-12 text-center bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <p className="text-[14px] text-[#94a3b8]">No attendance records found for the selected period.</p>
                </div>
              ) : (
                <div className="border border-[#e5e7eb] rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Date</th>
                        <th className="text-center px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Status</th>
                        <th className="text-right px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Daily Rate</th>
                        <th className="text-right px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Daily Earning</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {filteredAttendance.map((ar) => {
                        const isPresent = ar.status === "Present";
                        const dailyEarning = isPresent ? ar.dailyRate : 0;
                        return (
                          <tr key={ar.id} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="px-5 py-3.5 font-mono font-medium text-[#101828]">
                              {ar.date}
                            </td>
                            <td className="px-4 py-3.5 text-center">
                              {isPresent ? (
                                <span className="inline-flex items-center gap-1 bg-[#dcfce7] border border-[#bbf7d0] text-[#15803d] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                                  ✓ Present
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                                  ✕ Leave / Absent
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3.5 text-right font-mono text-[#64748b]">
                              {ar.dailyRate.toLocaleString()} EGP
                            </td>
                            <td className="px-4 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold">
                              {isPresent ? (
                                <span className="text-[#008236]">+{dailyEarning.toLocaleString()} EGP</span>
                              ) : (
                                <span className="text-[#94a3b8]">0 EGP</span>
                              )}
                            </td>
                            <td className="px-5 py-3.5 text-[12px] text-[#64748b]">
                              {ar.notes || "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB 3: ADVANCES & SETTLEMENTS
             ══════════════════════════════════════════════════════════════ */}
          {activeTab === "advances" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">
                    Advances & Repayments Log ({filteredAdvancesAndRepayments.length})
                  </h3>
                  <p className="text-[12px] text-[#64748b]">
                    Advances create outstanding liability. Settle Advance deducts an amount from salary to repay the advance.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenAdvance}
                    className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>💳</span> + Record Advance
                  </button>
                  <button
                    onClick={onOpenSettleAdvance}
                    className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>🔄</span> Settle Advance
                  </button>
                </div>
              </div>

              {filteredAdvancesAndRepayments.length === 0 ? (
                <div className="p-12 text-center bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <p className="text-[14px] text-[#94a3b8]">No advances or repayments recorded for this technician.</p>
                </div>
              ) : (
                <div className="border border-[#e5e7eb] rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Date</th>
                        <th className="text-left px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Type</th>
                        <th className="text-right px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Amount</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Method / Ref</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Reason / Notes</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Created By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {filteredAdvancesAndRepayments.map((adv) => {
                        const isRepayment = adv.type === "ADVANCE_REPAYMENT" || adv.type === "ADVANCE_SETTLEMENT";
                        return (
                          <tr key={adv.id} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="px-5 py-3.5 font-mono font-medium text-[#101828]">{adv.date}</td>
                            <td className="px-4 py-3.5">
                              {isRepayment ? (
                                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-indigo-100 text-indigo-800 border-indigo-300">
                                  Advance Repayment
                                </span>
                              ) : (
                                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-amber-100 text-amber-800 border-amber-300">
                                  Advance Taken
                                </span>
                              )}
                            </td>
                            <td className={`px-5 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold whitespace-nowrap ${
                              isRepayment ? "text-indigo-700" : "text-amber-700"
                            }`}>
                              {isRepayment
                                ? `-${Math.abs(adv.amount).toLocaleString()}`
                                : `+${Math.abs(adv.amount).toLocaleString()}`}{" "}
                              EGP
                            </td>
                            <td className="px-5 py-3.5 text-[#334155]">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
                                isRepayment ? "bg-indigo-50 border-indigo-200 text-indigo-800" : "bg-amber-50 border-amber-200 text-amber-800"
                              }`}>
                                {adv.paymentMethod || (isRepayment ? "Salary Deduction" : "Cash")}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-[#475569]">
                              {adv.notes || adv.reason || (isRepayment ? "Advance Repayment (Deducted from Salary)" : "Cash Advance")}
                            </td>
                            <td className="px-5 py-3.5 text-[12px] text-[#64748b]">
                              {adv.createdBy || "Accountant"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-[#fafbfc] border-t-2 border-[#e2e8f0] font-bold text-[13px]">
                      <tr>
                        <td colSpan={2} className="px-5 py-3.5 text-[#0f2340]">
                          Advances Summary
                        </td>
                        <td className="px-5 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] text-[14px] text-amber-900 bg-amber-50/50 whitespace-nowrap">
                          Outstanding: {outstandingAdvance.toLocaleString()} EGP
                        </td>
                        <td colSpan={3} className="px-5 py-3.5 text-[12px] text-[#64748b]">
                          Total Advances: +{totalAdvances.toLocaleString()} EGP | Repayments: -{totalAdvanceRepayments.toLocaleString()} EGP
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB 4: TIPS / GRATUITY
             ══════════════════════════════════════════════════════════════ */}
          {activeTab === "tips" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-emerald-800">
                    Technician Tips / Gratuity ({filteredTips.length})
                  </h3>
                  <p className="text-[12px] text-[#64748b]">
                    Technician Tips are internal earnings that increase unpaid balance. Flexible manual amounts with no step restrictions.
                  </p>
                </div>
                <button
                  onClick={onOpenTip}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>🎁</span> + Record Tip
                </button>
              </div>

              {filteredTips.length === 0 ? (
                <div className="p-12 text-center bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <p className="text-[14px] text-[#94a3b8]">No tips recorded for this technician yet.</p>
                </div>
              ) : (
                <div className="border border-[#e5e7eb] rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Date</th>
                        <th className="text-right px-5 py-3.5 font-semibold text-[11px] text-emerald-800 uppercase">Tip Amount</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Reason / Source</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Notes</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Created By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {filteredTips.map((tip) => (
                        <tr key={tip.id} className="hover:bg-emerald-50/20 transition-colors">
                          <td className="px-5 py-3.5 font-mono font-medium text-[#101828]">{tip.date}</td>
                          <td className="px-5 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold text-emerald-700">
                            +{Math.abs(tip.amount).toLocaleString()} EGP
                          </td>
                          <td className="px-5 py-3.5 text-[#334155] font-semibold">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px]">
                              🎁 {tip.reason || "Customer Tip"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-[#475569]">
                            {tip.notes || "—"}
                          </td>
                          <td className="px-5 py-3.5 text-[12px] text-[#64748b]">
                            {tip.createdBy || "Accountant"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB 5: DEDUCTIONS
             ══════════════════════════════════════════════════════════════ */}
          {activeTab === "deductions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">
                    Deductions ({filteredDeductions.length})
                  </h3>
                  <p className="text-[12px] text-[#64748b]">
                    Penalties and disciplinary deductions that reduce unpaid balance
                  </p>
                </div>
                <button
                  onClick={onOpenDeduction}
                  className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>✂️</span> + Record Deduction
                </button>
              </div>

              {filteredDeductions.length === 0 ? (
                <div className="p-12 text-center bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <p className="text-[14px] text-[#94a3b8]">No deductions recorded for this technician.</p>
                </div>
              ) : (
                <div className="border border-[#e5e7eb] rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Date</th>
                        <th className="text-right px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Amount</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Reason</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Notes</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Created By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {filteredDeductions.map((ded) => (
                        <tr key={ded.id} className="hover:bg-[#f8fafc] transition-colors">
                          <td className="px-5 py-3.5 font-mono font-medium text-[#101828]">{ded.date}</td>
                          <td className="px-5 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold text-red-600">
                            -{Math.abs(ded.amount).toLocaleString()} EGP
                          </td>
                          <td className="px-5 py-3.5 text-[#334155] font-semibold">
                            {ded.reason || "Penalty"}
                          </td>
                          <td className="px-5 py-3.5 text-[#475569]">
                            {ded.notes || "—"}
                          </td>
                          <td className="px-5 py-3.5 text-[12px] text-[#64748b]">
                            {ded.createdBy || "Accountant"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB 6: SALARY PAYMENTS
             ══════════════════════════════════════════════════════════════ */}
          {activeTab === "payments" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">
                    Salary Payments Disbursed ({filteredPayments.length})
                  </h3>
                  <p className="text-[12px] text-[#64748b]">
                    Salary disbursements settle and reduce the unpaid liability without altering historical earnings
                  </p>
                </div>
                <button
                  onClick={onOpenPaySalary}
                  disabled={unpaidBalance <= 0}
                  className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-2xs ${
                    unpaidBalance > 0
                      ? "bg-[#008236] hover:bg-[#006e2e] text-white"
                      : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
                  }`}
                >
                  <span>💵</span> + Pay Salary
                </button>
              </div>

              {filteredPayments.length === 0 ? (
                <div className="p-12 text-center bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <p className="text-[14px] text-[#94a3b8]">No salary payments disbursed yet for this technician.</p>
                </div>
              ) : (
                <div className="border border-[#e5e7eb] rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Date</th>
                        <th className="text-right px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Amount Paid</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Payment Method</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Notes</th>
                        <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Created By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {filteredPayments.map((pay) => (
                        <tr key={pay.id} className="hover:bg-[#f8fafc] transition-colors">
                          <td className="px-5 py-3.5 font-mono font-medium text-[#101828]">{pay.date}</td>
                          <td className="px-5 py-3.5 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[#008236]">
                            -{Math.abs(pay.amount).toLocaleString()} EGP
                          </td>
                          <td className="px-5 py-3.5 text-[#334155]">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-50 border border-purple-200 text-purple-800 text-[11px] font-semibold">
                              {pay.paymentMethod || "Cash"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-[#475569]">
                            {pay.notes || "Salary settlement"}
                          </td>
                          <td className="px-5 py-3.5 text-[12px] text-[#64748b]">
                            {pay.createdBy || "Accountant"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB 7: EXCEL DAILY VIEW
             ══════════════════════════════════════════════════════════════ */}
          {activeTab === "excel" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">
                    Excel Daily Running Balance Table
                  </h3>
                  <p className="text-[12px] text-[#64748b]">
                    Date | Attendance | Rate | Daily Earning | Tip | Advance | Deduction | Payment | Daily Net | Running Balance | Notes
                  </p>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] px-3.5 py-1.5 rounded-lg text-[12px] text-[#0f2340]">
                  Current Unpaid Balance: <strong className="font-mono text-amber-800">{unpaidBalance.toLocaleString()} EGP</strong>
                </div>
              </div>

              {excelRows.length === 0 ? (
                <div className="p-12 text-center bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <p className="text-[13px] text-[#94a3b8]">No attendance or transaction records logged yet.</p>
                </div>
              ) : (
                <div className="border border-[#e5e7eb] rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e5e7eb]">
                        <th className="text-left px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Date</th>
                        <th className="text-center px-3 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Attendance</th>
                        <th className="text-right px-3 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Daily Rate</th>
                        <th className="text-right px-3 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Daily Earning</th>
                        <th className="text-right px-3 py-3.5 font-semibold text-[11px] text-emerald-800 uppercase">Tip</th>
                        <th className="text-right px-3 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Advance</th>
                        <th className="text-right px-3 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Deduction</th>
                        <th className="text-right px-3 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Payment</th>
                        <th className="text-right px-3 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Daily Net</th>
                        <th className="text-right px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase bg-amber-50/60">Running Balance</th>
                        <th className="text-left px-4 py-3.5 font-semibold text-[11px] text-[#64748b] uppercase">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {excelRows.map((r) => (
                        <tr key={r.date} className="hover:bg-[#f8fafc] transition-colors">
                          <td className="px-4 py-3 font-mono font-medium text-[#101828]">
                            <span>{r.formattedDate}</span>
                            <span className="text-[10px] text-[#94a3b8] ml-1.5 font-normal">({r.dayName})</span>
                          </td>
                          <td className="px-3 py-3 text-center">
                            {r.attendanceStatus === "Present" ? (
                              <span className="inline-flex items-center gap-1 bg-[#dcfce7] border border-[#bbf7d0] text-[#15803d] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                                ✓ Present
                              </span>
                            ) : r.attendanceStatus === "Absent" ? (
                              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                                ✕ Leave
                              </span>
                            ) : (
                              <span className="text-[#94a3b8] text-[11px]">—</span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-right font-mono text-[#64748b]">
                            {r.dailyRate.toLocaleString()}
                          </td>
                          <td className="px-3 py-3 text-right font-mono font-bold">
                            <span className={r.dailyEarning > 0 ? "text-[#008236]" : "text-[#94a3b8]"}>
                              {r.dailyEarning > 0 ? `+${r.dailyEarning.toLocaleString()}` : "0"}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-right font-mono font-bold text-emerald-700">
                            {r.tip > 0 ? `+${r.tip.toLocaleString()}` : "0"}
                          </td>
                          <td className="px-3 py-3 text-right font-mono text-amber-700">
                            {r.advance > 0 ? `-${r.advance.toLocaleString()}` : "0"}
                          </td>
                          <td className="px-3 py-3 text-right font-mono text-red-600">
                            {r.deduction > 0 ? `-${r.deduction.toLocaleString()}` : "0"}
                          </td>
                          <td className="px-3 py-3 text-right font-mono text-purple-700">
                            {r.payment > 0 ? `-${r.payment.toLocaleString()}` : "0"}
                          </td>
                          <td className="px-3 py-3 text-right font-mono font-bold">
                            <span
                              className={
                                r.dailyNet > 0 ? "text-[#008236]" : r.dailyNet < 0 ? "text-red-600" : "text-[#94a3b8]"
                              }
                            >
                              {r.dailyNet > 0 ? `+${r.dailyNet.toLocaleString()}` : r.dailyNet.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-['JetBrains_Mono:Bold',sans-serif] font-bold bg-amber-50/40 text-[14px]">
                            <span className={r.runningBalance < 0 ? "text-red-600" : "text-amber-800"}>
                              {r.runningBalance.toLocaleString()} EGP
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[12px] text-[#475569]">
                            {r.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB 8: PROFILE & CONTRACT INFO
             ══════════════════════════════════════════════════════════════ */}
          {activeTab === "info" && (
            <div className="space-y-4 max-w-xl">
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#e2e8f0]">
                  <h4 className="font-bold text-[14px] text-[#0f2340]">Technician Contract & Information</h4>
                  <button
                    onClick={() => {
                      setEditName(technician.name);
                      setEditPhone(technician.phone || "");
                      setEditRate(technician.dailyRate.toString());
                      setEditStatus(technician.status);
                      setShowEditModal(true);
                    }}
                    className="text-[12px] text-[#0f2340] hover:underline font-semibold"
                  >
                    ✏️ Edit Details
                  </button>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#64748b]">System ID</span>
                  <span className="font-mono font-semibold text-[#101828]">{technician.id}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#64748b]">Full Name</span>
                  <span className="font-semibold text-[#101828]">{technician.name}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#64748b]">Phone Number</span>
                  <span className="font-mono text-[#101828]">{technician.phone || "—"}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#64748b]">Current Daily Rate</span>
                  <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[15px] text-[#0f2340]">
                    {technician.dailyRate.toLocaleString()} EGP
                  </span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#64748b]">Status</span>
                  <span className="text-[12px] font-bold text-[#008236]">{technician.status}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#64748b]">Date Joined</span>
                  <span className="text-[#101828]">{technician.joinedDate || "—"}</span>
                </div>
                {technician.notes && (
                  <div className="flex justify-between border-t border-[#e2e8f0] pt-3 text-[13px]">
                    <span className="text-[#64748b]">Notes</span>
                    <span className="text-[#101828]">{technician.notes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Edit Technician / Daily Rate Modal ── */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-[#e5e7eb]">
            <div className="px-6 py-4 bg-[#0f2340] text-white flex items-center justify-between">
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Edit Technician — {technician.name}</h3>
              <button onClick={() => setShowEditModal(false)} className="text-white/70 hover:text-white text-[18px]">✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const r = parseFloat(editRate);
                if (isNaN(r) || r < 0) return;
                onUpdateTechnician?.(technician.id, {
                  name: editName.trim(),
                  phone: editPhone.trim(),
                  dailyRate: r,
                  status: editStatus,
                });
                setShowEditModal(false);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#d1d5dc] rounded-lg text-[13px] text-[#101828] focus:outline-none focus:border-[#0f2340]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#d1d5dc] rounded-lg text-[13px] text-[#101828] focus:outline-none focus:border-[#0f2340]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-1">Current Daily Rate (EGP)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="any"
                  value={editRate}
                  onChange={(e) => setEditRate(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#d1d5dc] rounded-lg text-[13px] font-mono font-bold text-[#0f2340] focus:outline-none focus:border-[#0f2340]"
                />
                <p className="text-[11px] text-[#64748b] mt-1.5 leading-relaxed bg-[#f8fafc] p-2 rounded border border-[#e2e8f0]">
                  🛡️ <strong>Historical Wage Protection:</strong> Changing daily rate here does NOT alter past attendance earnings or snapshots. Future attendances will use this new rate.
                </p>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#475569] mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as "Active" | "Inactive")}
                  className="w-full px-3.5 py-2 border border-[#d1d5dc] rounded-lg text-[13px] text-[#101828] focus:outline-none focus:border-[#0f2340]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-[#d1d5dc] rounded-lg text-[13px] text-[#475569] hover:bg-[#f8fafc]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0f2340] text-white rounded-lg font-semibold text-[13px] hover:bg-[#1a3a60]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-[#e5e7eb]">
            <div className="px-6 py-4 bg-red-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-[20px]">⚠️</span>
                <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Delete Technician?</h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-white/80 hover:text-white text-[18px] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-[14px] text-[#1f2937] leading-relaxed">
                Are you sure you want to delete <strong className="font-semibold text-[#111827]">{technician.name}</strong>?
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-[12px] text-amber-800 space-y-1">
                <p className="font-semibold flex items-center gap-1.5 text-amber-900">
                  <span>🛡️</span> Historical Records Preserved
                </p>
                <p className="leading-relaxed">
                  This technician will be removed from active operational use and cannot receive new attendance. All previous attendance records, wage earnings, and salary payments will remain intact in historical reports.
                </p>
              </div>

              {unpaidBalance > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[12px] text-blue-800 flex items-center justify-between">
                  <span>Current Unpaid Balance:</span>
                  <span className="font-mono font-bold text-[13px] text-blue-900">
                    {unpaidBalance.toLocaleString()} EGP
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-[#d1d5dc] rounded-lg text-[13px] font-medium text-[#475569] hover:bg-[#f8fafc] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    onDeleteTechnician?.();
                  }}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] transition-colors shadow-sm"
                >
                  Delete Technician
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ACCOUNTANT_NAV_SECTIONS = [
  {
    label: "Accounting",
    items: [
      { id: "accountant-dashboard", symbol: "◈", label: "Dashboard" },
      { id: "accountant-jobs",      symbol: "▤", label: "Job Orders" },
      { id: "accountant-parts",     symbol: "◫", label: "Parts" },
      { id: "accountant-invoices",  symbol: "◧", label: "Invoices" },
      { id: "accountant-payments",  symbol: "◉", label: "Payments" },
      { id: "accountant-suppliers", symbol: "🚚", label: "Suppliers" },
      { id: "accountant-expenses",  symbol: "📋", label: "Expenses" },
    ],
  },
  {
    label: "Staff & Payroll",
    items: [
      { id: "accountant-technicians", symbol: "👥", label: "Technicians" },
      { id: "accountant-attendance",  symbol: "📅", label: "Attendance" },
      { id: "accountant-payroll",     symbol: "💵", label: "Payroll" },
    ],
  },
];

function AccountantSidebar({
  active,
  onNav,
  onSignOut,
  workshopSettings,
  authUser,
}: {
  active: string;
  onNav: (id: string) => void;
  onSignOut: () => void;
  workshopSettings?: WorkshopSettings;
  authUser?: { name: string; email: string; role?: Role } | null;
}) {
  const companyName = workshopSettings?.companyName || "SOS Motor Works";
  const logoUrl = workshopSettings?.logoUrl || "/uploads/branding/sos_logo.jpeg";
  const fullLogoUrl = logoUrl.startsWith("http") ? logoUrl : `${API_ORIGIN}${logoUrl}`;

  const userName = authUser?.name || "Accountant";
  const initials = getUserInitials(userName);

  return (
    <div data-sidebar="true" className="no-print fixed left-0 top-0 h-full w-[168px] bg-[#060f1e] flex flex-col z-20 select-none overflow-y-auto border-r border-white/10">
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10 shrink-0">
        <div className="w-7 h-7 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-0.5 border border-white/15 shrink-0">
          <img
            src={fullLogoUrl}
            alt={companyName}
            crossOrigin="anonymous"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${API_ORIGIN}/uploads/branding/sos_logo.jpeg`;
            }}
          />
        </div>
        <div className="min-w-0 flex flex-col">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-white leading-[14px] truncate">{companyName}</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] text-white/40 tracking-[0.5px] uppercase leading-[12px]">Accountant</p>
        </div>
      </div>

      <div className="flex-1 py-3">
        {ACCOUNTANT_NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-3">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[9px] text-white/30 tracking-[1px] uppercase px-5 pb-1">{section.label}</p>
            {section.items.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNav(item.id)}
                  className={`w-full flex items-center gap-2 px-5 py-2 text-left transition-colors ${isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
                >
                  <span className="text-[13px] shrink-0">{item.symbol}</span>
                  <span className={`font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[18px] truncate ${isActive ? "text-white" : ""}`}>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="px-4 py-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
            <span>{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-white leading-[14px] truncate">{userName}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] text-white/40 leading-[12px] uppercase tracking-[0.5px]">Accountant</p>
          </div>
        </div>
        <button onClick={onSignOut} className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-white/40 hover:text-white/70 transition-colors">→ Sign out</button>
      </div>
    </div>
  );
}

// ─── Accountant: Job Orders List ──────────────────────────────────────────────

function AccountantJobsScreen({
  jobOrders,
  joDetails,
  onSelectJo,
  initialFilter,
}: {
  jobOrders: { number: string; customer: string; vehicle: string; plate: string; status: string; date?: string }[];
  joDetails: Record<string, JoDetail>;
  onSelectJo: (jo: JoDetail) => void;
  initialFilter?: string;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialFilter ?? "All");

  const statuses = ["All", "Open", "Complete", "Closed"];

  const filtered = jobOrders.filter((jo) => {
    const q = search.toLowerCase();
    const matchSearch = !q || jo.number.toLowerCase().includes(q) || jo.customer.toLowerCase().includes(q) || jo.vehicle.toLowerCase().includes(q) || jo.plate.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || jo.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-[380px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#99a1af]">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by number, customer, vehicle…"
              className="w-full bg-white border border-[#d1d5dc] rounded-[6px] pl-9 pr-4 py-2 text-[14px] font-['Inter:Regular',sans-serif] text-[#101828] placeholder:text-[#99a1af] outline-none focus:border-[#0f2340]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-[#e5e7eb] rounded-[8px] h-[40px] px-4 text-[14px] font-['Inter:Regular',sans-serif] text-[#111827] outline-none cursor-pointer"
          >
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                {["Job Order", "Customer", "Vehicle", "Date", "Engineer", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#99a1af]">No job orders found.</td></tr>
              ) : filtered.map((jo) => {
                const detail = resolveJoDetail(jo.number, jo, joDetails);
                return (
                  <tr
                    key={jo.number}
                    onClick={() => onSelectJo(detail)}
                    className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] cursor-pointer"
                  >
                    <td className="px-4 py-3 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[12px] text-[#0f2340]">{jo.number}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">{jo.customer}</td>
                    <td className="px-4 py-3">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{jo.vehicle}</p>
                      <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">{jo.plate}</p>
                    </td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">{detail.date || "12 Aug 2026"}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{detail.engineer || "N/A"}</td>
                    <td className="px-4 py-3"><StatusBadge status={jo.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [authUser, setAuthUser] = useState<{ id?: string; name: string; email: string; role?: Role } | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [ctx, setCtx] = useState<FlowCtx>(FRESH_CTX);

  // Mutable customer/vehicle lists that can grow during the session
  const [customers, setCustomers] = useState<Customer[]>(SEED_CUSTOMERS);
  const [vehicleMap, setVehicleMap] = useState<Record<string, Vehicle[]>>(SEED_VEHICLES);
  const [jobOrders, setJobOrders] = useState(SEED_JOS);

  // Customer flow state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedJobOrder, setSelectedJobOrder] = useState<JoDetail | null>(null);
  const [printJoDetail, setPrintJoDetail] = useState<JoDetail | null>(null);
  const [joDetails, setJoDetails] = useState<Record<string, JoDetail>>(SEED_JO_DETAILS);
  // vehicleDetailsBackTarget: where Vehicle Details "Back" goes
  const [vehicleDetailsBackTarget, setVehicleDetailsBackTarget] = useState<Screen>("vehicle-list");
  // joDetailsBackTarget: where Job Order Details "Back" goes
  const [joDetailsBackTarget, setJoDetailsBackTarget] = useState<Screen>("job-orders-list");
  // customerDetailsBackTarget: where Customer Details "Back" goes
  const [customerDetailsBackTarget, setCustomerDetailsBackTarget] = useState<Screen>("customer-list");

  // Accountant invoice state
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoicesFilter, setInvoicesFilter] = useState<string | undefined>(undefined);
  const [jobsStatusFilter, setJobsStatusFilter] = useState<string | undefined>(undefined);

  // Workshop Branding & Settings (persisted in SQL Server)
  const [workshopSettings, setWorkshopSettings] = useState<WorkshopSettings>({
    id: 1,
    companyName: "SOS Motor Works",
    phone: "+20 100 933 4747",
    address: "شارع شنزو آبي، الحي العاشر، مدينة نصر، القاهرة، بجوار سنتر شبانة",
    email: "info@sosmotorworks.com",
    currency: "EGP",
    logoUrl: "/uploads/branding/sos_logo.jpeg",
  });

  // Handle recording split payments against an invoice
  function handleRecordPayment(invoiceNumber: string, rows: { method: InvoicePaymentMethod; amount: number; reference: string }[]) {
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const newPayments: InvoicePayment[] = rows.map((r, i) => ({
      id: `pay-${Date.now()}-${i}`,
      invoiceNumber,
      method: r.method,
      amount: r.amount,
      reference: r.reference,
      date: dateStr,
      createdAt: today.toISOString(),
      createdBy: "Accountant",
    }));
    setInvoices(prev => prev.map(inv => {
      if (inv.invoiceNumber !== invoiceNumber) return inv;
      const allPayments = [...(inv.payments ?? []), ...newPayments];
      const totalPaid = allPayments.reduce((s, p) => s + p.amount, 0);
      const paymentStatus: "Unpaid" | "Partially Paid" | "Paid" =
        totalPaid <= 0 ? "Unpaid" : totalPaid >= inv.grandTotal ? "Paid" : "Partially Paid";
      return { ...inv, payments: allPayments, paymentStatus };
    }));
    // Sync selectedInvoice so the details screen reflects new state immediately
    setSelectedInvoice(prev => {
      if (!prev || prev.invoiceNumber !== invoiceNumber) return prev;
      const allPayments = [...(prev.payments ?? []), ...newPayments];
      const totalPaid = allPayments.reduce((s, p) => s + p.amount, 0);
      const paymentStatus: "Unpaid" | "Partially Paid" | "Paid" =
        totalPaid <= 0 ? "Unpaid" : totalPaid >= prev.grandTotal ? "Paid" : "Partially Paid";
      return { ...prev, payments: allPayments, paymentStatus };
    });

    // Sync to backend database
    (async () => {
      try {
        for (const r of rows) {
          await api.recordPayment({
            invoiceNumber,
            amount: r.amount,
            method: r.method,
            note: r.reference || undefined,
          });
        }
        const refreshed = await api.getInvoices();
        if (Array.isArray(refreshed)) {
          setInvoices(refreshed);
        }
      } catch (err) {
        console.warn("Backend record payment error:", err);
      }
    })();
  }

  // Technicians, Attendance & Payroll state
  const [technicians, setTechnicians] = useState<Technician[]>(SEED_TECHNICIANS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(SEED_ATTENDANCE_RECORDS);
  const [payrollTransactions, setPayrollTransactions] = useState<PayrollTransaction[]>(SEED_PAYROLL_TRANSACTIONS);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [payingSalaryTechnician, setPayingSalaryTechnician] = useState<Technician | null>(null);
  const [advanceModalTech, setAdvanceModalTech] = useState<Technician | null>(null);
  const [settleAdvanceModalTech, setSettleAdvanceModalTech] = useState<Technician | null>(null);
  const [deductionModalTech, setDeductionModalTech] = useState<Technician | null>(null);
  const [tipModalTech, setTipModalTech] = useState<Technician | null>(null);
  const [technicianDetailsBackTarget, setTechnicianDetailsBackTarget] = useState<Screen>("accountant-technicians");

  // Warehouse state
  const [wSelectedJob, setWSelectedJob] = useState<WJob | null>(null);
  const [wJobPartsMap, setWJobPartsMap] = useState<Record<string, WIssuedPart[]>>(W_JOB_PARTS_INIT);
  const [wSelectedPart, setWSelectedPart] = useState<WPart | null>(null);
  const [wPartsConfirmedSet, setWPartsConfirmedSet] = useState<Set<string>>(new Set());
  const [warehouseModal, setWarehouseModal] = useState<WarehouseModal>(null);
  const [wParts, setWParts] = useState<WPart[]>(W_PARTS);
  const [wMovements, setWMovements] = useState<WMovement[]>(W_MOVEMENTS);
  const [wActiveNav, setWActiveNav] = useState("warehouse-dashboard");
  const [wPartBackTarget, setWPartBackTarget] = useState<Screen>("warehouse-parts");

  // Supplier state
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);

  async function refreshWarehouseParts() {
    try {
      const partsData = await api.getParts();
      if (Array.isArray(partsData)) {
        setWParts(
          partsData.map((p: any) => ({
            id: String(p.id),
            name: p.name,
            number: p.number || p.partNumber || "",
            oem: p.oem || "",
            brand: p.brand || "",
            category: p.category || "Engine",
            compatibleVehicles: p.compatibleVehicles || [],
            currentQty: p.currentQty ?? 0,
            minQty: p.minQty ?? 5,
            location: p.location || "Shelf A",
            status:
              p.currentQty <= 0
                ? "Out of Stock"
                : p.currentQty <= (p.minQty ?? 5)
                ? "Low Stock"
                : "In Stock",
            purchasePrice: p.purchasePrice ?? 0,
            sellingPrice: p.sellingPrice ?? 0,
            partType: p.partType || "Original",
          }))
        );
      }
      const moves = await api.getStockMovements();
      if (Array.isArray(moves)) {
        setWMovements(moves);
      }
    } catch (err) {
      console.warn("Failed to refresh warehouse data after supplier purchase:", err);
    }
  }

  // Load live data from Backend API & SQL Server on startup
  useEffect(() => {
    async function loadBackendData() {
      try {
        const [custs, vehs, jobs, parts, moves, invs, techs, atts, txs, branding] = await Promise.allSettled([
          api.getCustomers(),
          api.getVehicles(),
          api.getJobOrders(),
          api.getParts(),
          api.getStockMovements(),
          api.getInvoices(),
          api.getTechnicians(),
          api.getAttendanceRecords(),
          api.getPayrollTransactions(),
          api.getWorkshopSettings(),
        ]);

        if (custs.status === "fulfilled" && Array.isArray(custs.value)) {
          const mappedCusts: Customer[] = custs.value.map((c: any) => ({
            id: c.id.toString(),
            name: c.name,
            phone: c.phone,
            email: c.email || undefined,
            address: c.address || undefined,
            vehicleCount: c.vehicleCount || 0,
          }));
          setCustomers(mappedCusts);
        }

        if (vehs.status === "fulfilled" && Array.isArray(vehs.value)) {
          const mappedVehs = vehs.value.map((v: any) => ({
            id: v.id.toString(),
            make: v.make,
            model: v.model,
            year: v.year,
            plate: v.plate,
            vin: v.vin || "",
            color: v.color || "",
            km: v.km || "",
            visits: v.visits || 0,
            lastVisit: v.lastVisit || "",
            customerId: v.customerId?.toString(),
            customerName: v.customerName || "",
            customerPhone: v.customerPhone || "",
          }));
          setVehicleList(mappedVehs);

          const vMap: Record<string, Vehicle[]> = {};
          mappedVehs.forEach((v: any) => {
            if (v.customerId) {
              if (!vMap[v.customerId]) vMap[v.customerId] = [];
              vMap[v.customerId].push(v);
            }
          });
          setVehicleMap(vMap);

          // Populate service history for vehicles from backend
          for (const v of mappedVehs) {
            const vIdNum = parseInt(v.id, 10);
            if (!isNaN(vIdNum) && vIdNum > 0) {
              api.getVehicleById(vIdNum).then((details) => {
                if (details && Array.isArray(details.serviceHistory)) {
                  setServiceHistoryMap((prev) => ({
                    ...prev,
                    [v.id]: details.serviceHistory.map((sh: any) => ({
                      joNumber: sh.jobOrderNumber,
                      date: sh.date,
                      km: sh.km || "",
                      inspection: sh.inspection || "",
                      status: sh.status || "Open",
                    })),
                  }));
                }
              }).catch(() => {});
            }
          }
        }

        if (jobs.status === "fulfilled" && Array.isArray(jobs.value)) {
          const mappedJobs: JoListEntry[] = jobs.value.map((j: any) => ({
            id: j.id,
            number: j.number,
            customer: j.customer,
            phone: j.phone,
            vehicle: j.vehicle,
            plate: j.plate,
            status: j.status,
            date: j.date,
            type: j.type,
          }));
          setJobOrders(mappedJobs);

          // Update next job number dynamically
          const nextJoNum = computeNextJobNumber(mappedJobs);
          setCtx((prev) => ({ ...prev, joNumber: nextJoNum }));

          // Populate issued parts from backend
          for (const j of jobs.value) {
            try {
              const issued = await api.getIssuedParts(j.number);
              if (Array.isArray(issued) && issued.length > 0) {
                setWJobPartsMap((prev) => ({
                  ...prev,
                  [j.number]: issued.map((ip: any) => ({
                    partId: ip.partId.toString(),
                    partName: ip.partName,
                    partNumber: ip.partNumber,
                    qty: ip.qty,
                  })),
                }));
                if (j.status === "Complete" || j.status === "Closed") {
                  setWPartsConfirmedSet((prev) => new Set([...prev, j.number]));
                }
              }
            } catch {}
          }
        }

        if (parts.status === "fulfilled" && Array.isArray(parts.value)) {
          const mappedParts: WPart[] = parts.value.map((p: any) => ({
            id: p.id.toString(),
            name: p.name,
            number: p.number,
            oem: p.oem || "",
            brand: p.brand || "",
            category: p.category || "General",
            compatibleVehicles: p.compatibleVehicles || [],
            currentQty: p.currentQty || 0,
            minQty: p.minQty || 0,
            location: p.location || "",
            status: (p.status as any) || "In Stock",
            purchasePrice: p.purchasePrice || 0,
            sellingPrice: p.sellingPrice || 0,
            partType: p.partType || "Original",
          }));
          setWParts(mappedParts);
        }

        if (moves.status === "fulfilled" && Array.isArray(moves.value)) {
          setWMovements(moves.value);
        }

        if (invs.status === "fulfilled" && Array.isArray(invs.value)) {
          const mappedInvs: Invoice[] = invs.value.map((i: any) => ({
            invoiceNumber: i.invoiceNumber,
            jobOrderNumber: i.jobOrderNumber || "",
            date: i.date || "",
            customerName: i.customerName || i.customer || "",
            customerPhone: i.customerPhone || i.phone || "",
            vehicleName: i.vehicleName || i.vehicle || "",
            vehiclePlate: i.vehiclePlate || i.plate || "",
            vehicleKm: i.vehicleKm || "",
            vehicleVin: i.vehicleVin || "",
            engineer: i.engineer || "",
            issuedParts: i.issuedParts || [],
            partsPriceMap: i.partsPriceMap || {},
            partsTotal: i.partsTotal || 0,
            laborAmount: i.laborAmount || 0,
            laborItems: i.laborItems || [],
            payments: i.payments || [],
            additionalExpenses: i.additionalExpenses || [],
            expensesTotal: i.expensesTotal || 0,
            grandTotal: i.grandTotal || 0,
            paymentStatus: i.paymentStatus || "Unpaid",
          }));
          setInvoices(mappedInvs);
        }

        if (techs.status === "fulfilled" && Array.isArray(techs.value)) {
          setTechnicians(techs.value);
        }

        if (atts.status === "fulfilled" && Array.isArray(atts.value)) {
          setAttendanceRecords(atts.value);
        }

        if (txs.status === "fulfilled" && Array.isArray(txs.value)) {
          setPayrollTransactions(txs.value);
        }

        if (branding.status === "fulfilled" && branding.value && branding.value.companyName) {
          setWorkshopSettings(branding.value);
        }

        if (getAuthToken()) {
          try {
            const me = await api.getMe();
            if (me && me.fullName) {
              const roleStr = (me.role || "").toLowerCase();
              const validRoles: Role[] = ["engineer", "warehouse", "accountant", "owner"];
              const targetRole: Role = validRoles.includes(roleStr as Role) ? (roleStr as Role) : "engineer";
              setAuthUser({
                id: me.id?.toString(),
                name: me.fullName,
                email: me.email,
                role: targetRole,
              });
              setSelectedRole(targetRole);
              setScreen((prev) => {
                if (prev === "login") {
                  return targetRole === "engineer" ? "dashboard" :
                         targetRole === "warehouse" ? "warehouse-dashboard" :
                         targetRole === "owner" ? "owner-dashboard" :
                         "accountant-dashboard";
                }
                return prev;
              });
            }
          } catch (err) {
            console.warn("Auth token validation failed on load:", err);
            removeAuthToken();
            setAuthUser(null);
            setSelectedRole(null);
            setScreen("login");
          }
        }
      } catch (err) {
        console.error("Backend initial load error:", err);
      }

      // Fetch next Job Order number from backend
      try {
        const nextRes = await api.getNextJobOrderNumber();
        if (nextRes && nextRes.number) {
          setCtx((prev) => ({ ...prev, joNumber: nextRes.number }));
        }
      } catch {}
    }

    loadBackendData();
  }, []);

  // Ensure workshop branding is fresh whenever role changes / after login
  useEffect(() => {
    if (selectedRole) {
      api.getWorkshopSettings().then((data) => {
        if (data && data.companyName) {
          setWorkshopSettings(data);
        }
      }).catch(() => {});
    }
  }, [selectedRole]);

  const warehouseJobs: WJob[] = jobOrders.map((jo) => {
    const detail = joDetails[jo.number];
    const issued = wJobPartsMap[jo.number] ?? [];
    return {
      number: jo.number,
      date: detail?.date ?? "",
      vehicle: jo.vehicle,
      year: "",
      color: "",
      plate: jo.plate,
      partsIssued: issued.reduce((s, p) => s + p.qty, 0),
      serviceType: detail?.type || detail?.customerRequest || "Maintenance",
      customer: jo.customer,
      status: jo.status,
    };
  });

  function handleWNav(id: string) {
    setWActiveNav(id);
    setScreen(id as Screen);
  }

  function handleOpenJob(job: WJob) {
    setWSelectedJob(job);
    setWActiveNav("warehouse-jobs");
    setScreen("warehouse-parts-issue");
  }

  function handleWAddPart(selections: { part: WPart; qty: number }[]) {
    if (!wSelectedJob) return;
    const joNum = wSelectedJob.number;
    let updated = [...(wJobPartsMap[joNum] ?? [])];
    for (const { part, qty } of selections) {
      const idx = updated.findIndex((p) => p.partId === part.id);
      if (idx >= 0) {
        updated = updated.map((p, i) => i === idx ? { ...p, qty: p.qty + qty } : p);
      } else {
        updated = [...updated, { partId: part.id, partName: part.name, partNumber: part.number, qty }];
      }
    }
    setWJobPartsMap((prev) => ({ ...prev, [joNum]: updated }));
  }

  function handleWRemovePart(partId: string) {
    if (!wSelectedJob) return;
    const joNum = wSelectedJob.number;
    setWJobPartsMap((prev) => ({
      ...prev,
      [joNum]: (prev[joNum] ?? []).filter((p) => p.partId !== partId),
    }));
  }

  async function handleWAddNewPart(part: WPart) {
    let savedPart: WPart = part;
    try {
      const res = await api.createPart({
        name: part.name,
        number: part.number,
        oem: part.oem || null,
        brand: part.brand,
        category: part.category,
        currentQty: part.currentQty,
        minQty: part.minQty,
        location: part.location || null,
        purchasePrice: part.purchasePrice,
        sellingPrice: part.sellingPrice,
        compatibleVehicles: part.compatibleVehicles,
      });
      if (res && res.id) {
        savedPart = {
          ...part,
          id: res.id.toString(),
        };
      }
    } catch (err) {
      console.warn("Could not save part to backend API, saving locally:", err);
    }
    setWParts((prev) => [...prev, savedPart]);
  }

  async function handleWSaveCount(entries: StockCountEntry[]) {
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(",", "");
    const newMovements: WMovement[] = [];

    // Backend sync
    try {
      const items = entries
        .map((e) => ({
          partId: parseInt(e.partId, 10),
          actualQty: parseInt(e.actualQty, 10),
        }))
        .filter((i) => !isNaN(i.partId) && !isNaN(i.actualQty) && i.actualQty > 0);

      if (items.length > 0) {
        await api.updateStockCount({ items });
      }
    } catch (err) {
      console.warn("Could not sync stock count with backend API:", err);
    }

    setWParts((prev) =>
      prev.map((p) => {
        const e = entries.find((en) => en.partId === p.id);
        if (!e) return p;
        const addQty = parseInt(e.actualQty);
        if (isNaN(addQty) || addQty <= 0) return p;
        const newQty = p.currentQty + addQty;
        const newStatus: WPart["status"] = newQty <= 0 ? "Out of Stock" : newQty <= p.minQty ? "Low Stock" : "In Stock";
        newMovements.push({
          part: p.name,
          type: "Stock In",
          reference: p.number,
          note: `Stock received: +${addQty}`,
          date: dateStr,
          qty: addQty,
        });
        return { ...p, currentQty: newQty, status: newStatus };
      })
    );

    if (newMovements.length > 0) {
      setWMovements((prev) => [...newMovements, ...prev]);
    }
  }

  async function handleWConfirmIssue() {
    if (!wSelectedJob) return;
    const joNum = wSelectedJob.number;
    const issued = wJobPartsMap[joNum] ?? [];

    if (issued.length === 0) {
      alert("No parts selected to issue.");
      return;
    }

    // Strict validation: check all quantities and stock availability
    for (const ip of issued) {
      if (ip.qty <= 0) {
        alert(`Invalid quantity for part ${ip.partName}.`);
        return;
      }
      const part = wParts.find((p) => p.id === ip.partId);
      if (!part) {
        alert(`Part ${ip.partName} not found in inventory.`);
        return;
      }
      if (part.currentQty < ip.qty) {
        alert(`Insufficient stock for ${ip.partName}. Available: ${part.currentQty}, Requested: ${ip.qty}.`);
        return;
      }
    }

    // 1. Deduct quantities from parts in inventory
    setWParts((prev) =>
      prev.map((p) => {
        const ip = issued.find((item) => item.partId === p.id);
        if (!ip) return p;
        const newQty = Math.max(0, p.currentQty - ip.qty);
        const newStatus: WPart["status"] =
          newQty <= 0 ? "Out of Stock" : newQty <= p.minQty ? "Low Stock" : "In Stock";
        return { ...p, currentQty: newQty, status: newStatus };
      })
    );

    // 2. Add Stock Out movements
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const newMovements: WMovement[] = issued.map((ip) => ({
      part: ip.partName,
      type: "Issue",
      reference: joNum,
      note: `Issued to ${joNum}`,
      date: dateStr,
      qty: -ip.qty,
    }));
    setWMovements((prev) => [...newMovements, ...prev]);

    // 3. Mark parts confirmed for this job
    setWPartsConfirmedSet((prev) => new Set([...prev, joNum]));

    // 4. Update Job Order status to "Complete" across state
    setJobOrders((prev) =>
      prev.map((jo) => (jo.number === joNum ? { ...jo, status: "Complete" } : jo))
    );
    setJoDetails((prev) => {
      const existing = prev[joNum] ?? resolveJoDetail(joNum, jobOrders.find((j) => j.number === joNum), prev);
      return {
        ...prev,
        [joNum]: {
          ...existing,
          status: "Complete",
        },
      };
    });
    setWSelectedJob((prev) => (prev ? { ...prev, status: "Complete" } : null));
    setSelectedJobOrder((prev) => (prev && prev.number === joNum ? { ...prev, status: "Complete" } : prev));

    // 5. Backend sync: issue parts and confirm issue in API
    try {
      const partsPayload = issued
        .map((ip) => ({
          partId: parseInt(ip.partId, 10),
          qty: ip.qty,
        }))
        .filter((p) => !isNaN(p.partId));

      if (partsPayload.length > 0) {
        await api.issuePartsToJobOrder(joNum, partsPayload);
      }
      await api.confirmPartsIssued(joNum);
    } catch (err) {
      console.warn("Backend confirm issue call failed, trying status update directly:", err);
      try {
        await api.updateJobOrderStatus(joNum, "Complete");
      } catch (e) {
        console.warn("Backend status update error:", e);
      }
    }
  }

  // Vehicle flow state
  const [vehicleList, setVehicleList] = useState(SEED_VEHICLE_LIST);
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof SEED_VEHICLE_LIST)[0] | null>(null);
  const [serviceHistoryMap, setServiceHistoryMap] = useState<Record<string, ServiceHistoryEntry[]>>(SEED_SERVICE_HISTORY);
  const [vehicleStep3BackTarget, setVehicleStep3BackTarget] = useState<Screen>("vehicle-details");
  // Track current owner per vehicle (vehicleId → {name, phone})
  const [vehicleOwnerMap, setVehicleOwnerMap] = useState<Record<string, { name: string; phone: string }>>({});
  const [vehicleDeferredWorkMap, setVehicleDeferredWorkMap] = useState<Record<string, DeferredItem[]>>(SEED_DEFERRED_WORK);

  function handleNav(id: string) {
    setActiveNav(id);
    if (id === "dashboard") setScreen("dashboard");
    if (id === "vehicles") setScreen("vehicle-list");
    if (id === "customers") setScreen("customer-list");
    if (id === "job-orders") setScreen("job-orders-list");
  }

  async function handleOpenJobOrder(joNumber: string, backTarget: Screen) {
    const jo = jobOrders.find((j) => j.number === joNumber);
    let detail = resolveJoDetail(joNumber, jo, joDetails);
    try {
      const live = await api.getJobOrderByNumber(joNumber);
      if (live && live.number) {
        detail = {
          ...detail,
          id: live.id ?? detail.id,
          number: live.number,
          date: live.date || detail.date,
          status: live.status || detail.status,
          type: live.type || detail.type,
          customerId: live.customerId ? live.customerId.toString() : detail.customerId,
          customerName: live.customerName || detail.customerName,
          customerPhone: live.customerPhone || detail.customerPhone,
          vehicleId: live.vehicleId ? live.vehicleId.toString() : detail.vehicleId,
          vehicleName: live.vehicleName || detail.vehicleName,
          vehiclePlate: live.vehiclePlate || detail.vehiclePlate,
          vehicleKm: live.vehicleKm || detail.vehicleKm,
          vehicleVin: live.vehicleVin || detail.vehicleVin,
          engineer: live.engineer || detail.engineer,
          customerRequest: live.customerRequest || detail.customerRequest,
          approvedItems: live.approvedItems ?? detail.approvedItems,
          deferredItems: live.deferredItems ?? detail.deferredItems,
        };
      }
    } catch {}
    setJoDetails((prev) => ({ ...prev, [joNumber]: detail }));
    setSelectedJobOrder(detail);
    setJoDetailsBackTarget(backTarget);
    setScreen("job-order-details");
  }

  async function startNewJobOrder() {
    let nextJoNum = computeNextJobNumber(jobOrders);
    try {
      const res = await api.getNextJobOrderNumber();
      if (res && res.number) {
        nextJoNum = res.number;
      }
    } catch {}
    setCtx({
      joNumber: nextJoNum,
      joDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      engineer: authUser?.name || "Saied Engineer",
      customer: null,
      vehicle: null,
    });
    setVehicleStep3BackTarget("step2-vehicle");
    setScreen("step1-customer");
    setActiveNav("job-orders");
  }

  // Step 1 → select existing customer
  function handleSelectCustomer(c: Customer) {
    setCtx((prev) => ({ ...prev, customer: c, vehicle: null }));
    setScreen("step2-vehicle");
  }

  // Step 1 → open New Customer modal
  function handleOpenNewCustomer() {
    setModal("new-customer");
  }

  // New Customer modal → create & continue
  async function handleCreateCustomer(c: Customer) {
    let savedCustomer: Customer = c;
    try {
      const res = await api.createCustomer({
        name: c.name,
        phone: c.phone,
        email: c.email || null,
        address: c.address || null,
      });
      if (res && res.id) {
        savedCustomer = {
          id: res.id.toString(),
          name: res.name,
          phone: res.phone,
          email: res.email || undefined,
          address: res.address || undefined,
          vehicleCount: 0,
        };
      }
    } catch (err) {
      console.warn("Could not save customer to backend API, using local fallback:", err);
    }
    setCustomers((prev) => [...prev, savedCustomer]);
    setVehicleMap((prev) => ({ ...prev, [savedCustomer.id]: [] }));
    setCtx((prev) => ({ ...prev, customer: savedCustomer, vehicle: null }));
    setModal(null);
    setScreen("step2-vehicle");
  }

  // Step 2 → select existing vehicle
  function handleSelectVehicle(v: Vehicle) {
    setCtx((prev) => ({ ...prev, vehicle: v }));
    setScreen("step3-details");
  }

  // Step 2 → open Add Vehicle modal
  function handleOpenAddVehicle() {
    setModal("add-vehicle");
  }

  // Add Vehicle modal → create & attach
  async function handleCreateVehicle(v: Vehicle) {
    if (!ctx.customer) return;
    let savedVehicle: Vehicle = v;
    try {
      const custIdNum = parseInt(ctx.customer.id, 10);
      const res = await api.createVehicle({
        make: v.make,
        model: v.model,
        year: v.year,
        plate: v.plate,
        vin: v.vin || null,
        color: v.color || null,
        km: v.km || null,
        customerId: isNaN(custIdNum) ? 0 : custIdNum,
      });
      const vData = res.vehicle || res;
      if (vData && vData.id) {
        savedVehicle = {
          id: vData.id.toString(),
          make: vData.make || v.make,
          model: vData.model || v.model,
          year: vData.year || v.year,
          plate: vData.plate || v.plate,
          vin: vData.vin || v.vin,
          color: vData.color || v.color,
          km: vData.km || v.km,
          customerId: ctx.customer.id,
          visits: 0,
          lastVisit: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        };
      }
    } catch (err) {
      console.warn("Could not save vehicle to backend API, using local fallback:", err);
    }

    const vEntry = {
      ...savedVehicle,
      customerName: ctx.customer.name,
      customerPhone: ctx.customer.phone,
    };
    setVehicleList((prev) => [vEntry, ...prev]);
    setVehicleMap((prev) => ({
      ...prev,
      [ctx.customer!.id]: [...(prev[ctx.customer!.id] ?? []), savedVehicle],
    }));
    setCtx((prev) => ({ ...prev, vehicle: savedVehicle }));
    setModal(null);
    setScreen("step3-details");
  }

  // Step 3 → create job order
  async function handleCreateJobOrder(data: { requiredWork: string; completedWork: string; notes: string; km: string }, shouldPrint: boolean = false) {
    if (!ctx.customer || !ctx.vehicle) return;

    let joNum = ctx.joNumber;
    let joId: number | undefined = undefined;
    let joStatus = "Open";
    let joDate = ctx.joDate;
    let joEngineer = authUser?.name || ctx.engineer || "Saied Engineer";
    let joTechs: string[] = [];

    try {
      const custIdNum = parseInt(ctx.customer.id, 10) || 0;
      const vehIdNum = parseInt(ctx.vehicle.id, 10) || 0;

      const res = await api.createJobOrder({
        customerId: custIdNum,
        vehicleId: vehIdNum,
        type: data.requiredWork.slice(0, 30) || "General Inspection",
        requiredWork: data.requiredWork,
        completedWork: data.completedWork,
        notes: data.notes,
        km: data.km || ctx.vehicle.km,
        engineer: joEngineer,
      });

      if (res && res.number) {
        joNum = res.number;
        joId = res.id;
        joStatus = res.status || "Open";
        joDate = res.date || ctx.joDate;
        if (res.engineer) joEngineer = res.engineer;
        if (res.technicians && Array.isArray(res.technicians)) joTechs = res.technicians;
      }
    } catch (err) {
      console.warn("Could not save job order to backend API, using local fallback:", err);
      if (jobOrders.some((j) => j.number === joNum)) {
        joNum = computeNextJobNumber(jobOrders);
      }
    }

    const newJO: JoListEntry = {
      id: joId,
      number: joNum,
      customer: ctx.customer.name,
      phone: ctx.customer.phone,
      vehicle: `${ctx.vehicle.make} ${ctx.vehicle.model}`,
      plate: ctx.vehicle.plate,
      status: joStatus,
      date: joDate,
      type: data.requiredWork.slice(0, 30) || "General Inspection",
    };

    const newDetail: JoDetail = {
      id: joId,
      number: joNum,
      date: joDate,
      status: joStatus,
      type: data.requiredWork.slice(0, 30) || "General Inspection",
      customerId: ctx.customer.id,
      customerName: ctx.customer.name,
      customerPhone: ctx.customer.phone,
      vehicleId: ctx.vehicle.id,
      vehicleName: `${ctx.vehicle.make} ${ctx.vehicle.model}`,
      vehiclePlate: ctx.vehicle.plate,
      vehicleKm: data.km || ctx.vehicle.km,
      vehicleVin: ctx.vehicle.vin,
      vehicleMake: ctx.vehicle.make,
      vehicleModel: ctx.vehicle.model,
      vehicleYear: ctx.vehicle.year,
      vehicleColor: ctx.vehicle.color,
      engineer: joEngineer,
      technicians: joTechs,
      customerRequest: data.notes?.trim() || data.requiredWork || "طلب صيانة وفحص شامل",
      notes: data.notes,
      requiredWork: data.requiredWork,
      completedWork: data.completedWork,
      workFoundItems: [],
      approvedItems: [],
      deferredItems: [],
    };

    setJoDetails((prev) => ({ ...prev, [joNum]: newDetail }));

    const newHistoryEntry: ServiceHistoryEntry = {
      joNumber: joNum,
      date: joDate,
      km: data.km || ctx.vehicle.km,
      inspection: data.requiredWork.slice(0, 60) || "General Inspection",
      status: joStatus,
    };

    const vid = ctx.vehicle.id;
    setServiceHistoryMap((prev) => ({
      ...prev,
      [vid]: [newHistoryEntry, ...(prev[vid] ?? []).filter((h) => h.joNumber !== joNum)],
    }));

    // Update visits on existing vehicle without creating duplicate vehicles
    setVehicleList((prev) =>
      prev.map((v) =>
        v.id === vid
          ? {
              ...v,
              visits: (v.visits || 0) + 1,
              lastVisit: joDate,
              km: data.km || v.km,
            }
          : v
      )
    );
    setSelectedVehicle((prev) =>
      prev && prev.id === vid
        ? {
            ...prev,
            visits: (prev.visits || 0) + 1,
            lastVisit: joDate,
            km: data.km || prev.km,
          }
        : prev
    );

    // Guaranteed deduplication: never add duplicate job numbers
    setJobOrders((prev) => [newJO, ...prev.filter((j) => j.number !== joNum)]);

    let nextUnique = computeNextJobNumber([...jobOrders, newJO]);
    try {
      const nextRes = await api.getNextJobOrderNumber();
      if (nextRes && nextRes.number) {
        nextUnique = nextRes.number;
      }
    } catch {}
    setCtx({
      joNumber: nextUnique,
      joDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      engineer: authUser?.name || "Saied Engineer",
      customer: null,
      vehicle: null,
    });

    if (shouldPrint) {
      setSelectedJobOrder(newDetail);
      setPrintJoDetail(newDetail);
      setScreen("print-job-order");
    } else {
      if (selectedVehicle && vehicleStep3BackTarget === "vehicle-details") {
        setScreen("vehicle-details");
        setActiveNav("vehicles");
      } else {
        setScreen("job-order-created");
        setActiveNav("job-orders");
      }
    }
  }

  function cancelFlow() {
    if (vehicleStep3BackTarget === "vehicle-details" && selectedVehicle) {
      setScreen("vehicle-details");
      setActiveNav("vehicles");
    } else {
      setScreen("dashboard");
      setActiveNav("dashboard");
    }
  }

  // Customer list → select customer
  function handleSelectCustomer2(c: Customer) {
    setSelectedCustomer(c);
    setCustomerDetailsBackTarget("customer-list");
    setScreen("customer-details");
    setActiveNav("customers");
  }

  // Customer details → select vehicle (goes to vehicle-details, back → customer-details)
  function handleSelectVehicleFromCustomer(v: Vehicle) {
    const entry = vehicleList.find((ve) => ve.id === v.id);
    if (entry) {
      setSelectedVehicle(entry);
    } else {
      // Build a minimal entry
      const c = selectedCustomer;
      setSelectedVehicle({
        ...v,
        customerName: c?.name ?? "",
        customerPhone: c?.phone ?? "",
        visits: v.visits,
        lastVisit: v.lastVisit,
      });
    }
    setVehicleDetailsBackTarget("customer-details");
    setScreen("vehicle-details");
  }

  // Customer details / JO list → select JO
  function handleSelectJo(jo: JoDetail) {
    setSelectedJobOrder(jo);
    setJoDetailsBackTarget("customer-details");
    setScreen("job-order-details");
  }

  // Vehicle list → select vehicle → vehicle details
  async function handleSelectVehicleFromList(v: (typeof SEED_VEHICLE_LIST)[0]) {
    setSelectedVehicle(v);
    setVehicleDetailsBackTarget("vehicle-list");
    setScreen("vehicle-details");
    const vIdNum = parseInt(v.id, 10);
    if (!isNaN(vIdNum) && vIdNum > 0) {
      try {
        const details = await api.getVehicleById(vIdNum);
        if (details && Array.isArray(details.serviceHistory)) {
          setServiceHistoryMap((prev) => ({
            ...prev,
            [v.id]: details.serviceHistory.map((sh: any) => ({
              joNumber: sh.jobOrderNumber,
              date: sh.date,
              km: sh.km || "",
              inspection: sh.inspection || "",
              status: sh.status || "Open",
            })),
          }));
        }
      } catch {}
    }
  }

  // Vehicle details → new job order (skip steps 1 & 2)
  async function handleNewJobOrderFromVehicle() {
    if (!selectedVehicle) return;

    // Resolve the real existing customer
    let realCustomer: Customer | undefined;
    if (selectedVehicle.customerId) {
      realCustomer = customers.find((c) => c.id === selectedVehicle.customerId);
    }
    if (!realCustomer) {
      const owner = vehicleOwnerMap[selectedVehicle.id] ?? { name: selectedVehicle.customerName, phone: selectedVehicle.customerPhone };
      realCustomer = customers.find((c) => c.name.toLowerCase() === owner.name.toLowerCase()) ?? {
        id: selectedVehicle.customerId || "1",
        name: owner.name,
        phone: owner.phone,
      };
    }

    const vehicle: Vehicle = {
      id: selectedVehicle.id,
      make: selectedVehicle.make,
      model: selectedVehicle.model,
      year: selectedVehicle.year,
      plate: selectedVehicle.plate,
      vin: selectedVehicle.vin,
      color: selectedVehicle.color,
      km: selectedVehicle.km,
      customerId: selectedVehicle.customerId,
      visits: selectedVehicle.visits,
      lastVisit: selectedVehicle.lastVisit,
    };

    let nextJoNum = computeNextJobNumber(jobOrders);
    try {
      const res = await api.getNextJobOrderNumber();
      if (res && res.number) {
        nextJoNum = res.number;
      }
    } catch {}

    setCtx({
      joNumber: nextJoNum,
      joDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      engineer: authUser?.name || "Saied Engineer",
      customer: realCustomer,
      vehicle,
    });
    setVehicleStep3BackTarget("vehicle-details");
    setScreen("step3-details");
    setActiveNav("vehicles");
  }

  // Change vehicle owner
  function handleChangeOwner(name: string, phone: string) {
    if (!selectedVehicle) return;
    setVehicleOwnerMap((prev) => ({ ...prev, [selectedVehicle.id]: { name, phone } }));
    // Also update vehicleList display
    setVehicleList((prev) =>
      prev.map((v) => v.id === selectedVehicle.id ? { ...v, customerName: name, customerPhone: phone } : v)
    );
    setSelectedVehicle((prev) => prev ? { ...prev, customerName: name, customerPhone: phone } : prev);
    setModal(null);
  }

  const vehiclesForCurrentCustomer = ctx.customer ? (vehicleMap[ctx.customer.id] ?? []) : [];

  const headerTitle =
    screen === "dashboard" ? "Dashboard"
    : screen === "vehicle-list" ? "Vehicles"
    : screen === "vehicle-details" ? "Vehicle Details"
    : screen === "customer-list" ? "Customers"
    : screen === "customer-details" ? "Customer Details"
    : screen === "job-order-details" ? "Job Order Details"
    : screen === "print-job-order" ? "Print Job Order"
    : screen === "job-orders-list" ? "Job Orders"
    : screen === "job-order-created" ? "Job Orders"
    : "New Job Order";

  const warehouseHeaderTitle =
    screen === "warehouse-dashboard" ? "Dashboard"
    : screen === "warehouse-jobs" ? "Open Job Orders"
    : screen === "warehouse-parts-issue" ? "Open Job Orders"
    : screen === "warehouse-parts" ? "Parts & Inventory"
    : screen === "warehouse-part-details" ? "Part Details"
    : screen === "warehouse-movements" ? "Stock Movements"
    : screen === "warehouse-stock-count" ? "Stock Count"
    : screen === "warehouse-suppliers" ? "Suppliers"
    : screen === "warehouse-supplier-details" ? "Supplier Profile"
    : "";

  const isOwnerRole = selectedRole === "owner";
  const isAccountantRole = selectedRole === "accountant";
  const isWarehouseScreen = screen.startsWith("warehouse-") && !isOwnerRole;
  const isOwnerScreen = isOwnerRole && screen !== "login";
  const isAccountantScreen = isAccountantRole && screen !== "login";

  const step3BackTarget = vehicleStep3BackTarget === "vehicle-details"
    ? () => { setScreen("vehicle-details"); setActiveNav("vehicles"); }
    : () => setScreen("step2-vehicle");

  function handleLoginSuccess(role: Role, user: { id?: string; name: string; email: string; role?: Role }) {
    setSelectedRole(role);
    setAuthUser(user);
    if (role === "engineer") {
      setScreen("dashboard");
      setActiveNav("dashboard");
    } else if (role === "warehouse") {
      setScreen("warehouse-dashboard");
      setWActiveNav("warehouse-dashboard");
    } else if (role === "owner") {
      setScreen("owner-dashboard");
      setActiveNav("owner-dashboard");
    } else if (role === "accountant") {
      setScreen("accountant-dashboard");
      setActiveNav("accountant-dashboard");
    }
  }

  function handleSignOut() {
    removeAuthToken();
    setSelectedRole(null);
    setAuthUser(null);
    setScreen("login");
    setActiveNav("dashboard");
    setWActiveNav("warehouse-dashboard");
  }

  function handleOwnerNav(id: string) {
    setScreen(id as Screen);
    setActiveNav(id);
    setWActiveNav(id);
  }

  // ── Technicians & Payroll Handlers ─────────────────────────────────────────

  function getTechnicianStats(techId: string) {
    const techTransactions = payrollTransactions.filter((tx) => tx.technicianId === techId);
    const dailyEarnings = techTransactions
      .filter((tx) => tx.type === "DAILY_EARNING" || tx.type === "Daily Wage")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const totalTips = techTransactions
      .filter((tx) => tx.type === "TECHNICIAN_TIP" || tx.type === "Technician Tip")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const totalEarnings = dailyEarnings + totalTips;
    const totalAdvances = techTransactions
      .filter((tx) => tx.type === "ADVANCE")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const totalAdvanceRepayments = techTransactions
      .filter((tx) => tx.type === "ADVANCE_REPAYMENT" || tx.type === "ADVANCE_SETTLEMENT")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const outstandingAdvance = Math.max(0, totalAdvances - totalAdvanceRepayments);
    const totalDeductions = techTransactions
      .filter((tx) => tx.type === "DEDUCTION")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const totalPayments = techTransactions
      .filter((tx) => tx.type === "SALARY_PAYMENT" || tx.type === "Salary Payment")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    // Advances do NOT reduce salary. Only Advance Repayment reduces salary!
    const unpaidBalance = totalEarnings - totalAdvanceRepayments - totalDeductions - totalPayments;

    const techAttendance = attendanceRecords.filter((ar) => ar.technicianId === techId);
    const presentDays = techAttendance.filter((ar) => ar.status === "Present").length;
    const absentDays = techAttendance.filter((ar) => ar.status === "Absent").length;

    return {
      dailyEarnings,
      totalDailyEarnings: dailyEarnings,
      totalTips,
      totalEarnings,
      totalAdvances,
      totalAdvanceRepayments,
      outstandingAdvance,
      totalDeductions,
      totalPayments,
      unpaidBalance,
      salaryRemaining: unpaidBalance,
      presentDays,
      absentDays,
      totalEarned: totalEarnings,
      totalPaid: totalPayments,
    };
  }

  function handleMarkAttendance(techId: string, date: string, status: "Present" | "Absent", notes?: string) {
    const tech = technicians.find((t) => t.id === techId && !t.isDeleted);
    if (!tech) return;

    const existingAttendance = attendanceRecords.find(
      (ar) => ar.technicianId === techId && ar.date === date
    );

    const nowIso = new Date().toISOString();

    if (existingAttendance) {
      if (existingAttendance.status === status) {
        // Prevent duplicate
        return;
      }

      if (status === "Absent") {
        // Reversal: Present -> Absent
        const earningTxId = existingAttendance.earningTransactionId;
        if (earningTxId) {
          setPayrollTransactions((prev) => prev.filter((tx) => tx.id !== earningTxId));
          api.deletePayrollTransaction(earningTxId).catch(() => {});
        } else {
          setPayrollTransactions((prev) => {
            const toRemove = prev.filter((tx) => tx.technicianId === techId && tx.date === date && (tx.type === "DAILY_EARNING" || tx.type === "Daily Wage"));
            toRemove.forEach(tx => api.deletePayrollTransaction(tx.id).catch(() => {}));
            return prev.filter((tx) => !(tx.technicianId === techId && tx.date === date && (tx.type === "DAILY_EARNING" || tx.type === "Daily Wage")));
          });
        }
        setAttendanceRecords((prev) =>
          prev.map((ar) =>
            ar.id === existingAttendance.id
              ? {
                  ...ar,
                  status: "Absent",
                  dailyRate: tech.dailyRate,
                  notes,
                  timestamp: nowIso,
                }
              : ar
          )
        );
        api.markAttendance({
          id: existingAttendance.id,
          technicianId: techId,
          date,
          status: "Absent",
          dailyRate: tech.dailyRate,
          notes,
        }).catch((err) => console.warn("Backend mark attendance error:", err));
      } else {
        // Absent -> Present: Immediately create DAILY_EARNING transaction with current daily rate snapshot
        const newTxId = `tx-earn-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const newTx: PayrollTransaction = {
          id: newTxId,
          technicianId: tech.id,
          technicianName: tech.name,
          date,
          type: "DAILY_EARNING",
          dailyRate: tech.dailyRate,
          amount: tech.dailyRate,
          attendanceId: existingAttendance.id,
          description: "Daily Wage (Present)",
          notes,
          status: "Unpaid",
          createdAt: nowIso,
        };

        setPayrollTransactions((prev) => [newTx, ...prev]);
        setAttendanceRecords((prev) =>
          prev.map((ar) =>
            ar.id === existingAttendance.id
              ? {
                  ...ar,
                  status: "Present",
                  dailyRate: tech.dailyRate,
                  notes,
                  earningTransactionId: newTxId,
                  timestamp: nowIso,
                }
              : ar
          )
        );
        api.markAttendance({
          id: existingAttendance.id,
          technicianId: techId,
          date,
          status: "Present",
          dailyRate: tech.dailyRate,
          notes,
        }).catch((err) => console.warn("Backend mark attendance error:", err));
        api.recordPayrollTransaction(newTx).catch((err) => console.warn("Backend record payroll tx error:", err));
      }
    } else {
      // First time recording attendance for this technician on this date
      const attendanceId = `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

      if (status === "Present") {
        const newTxId = `tx-earn-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const newTx: PayrollTransaction = {
          id: newTxId,
          technicianId: tech.id,
          technicianName: tech.name,
          date,
          type: "DAILY_EARNING",
          dailyRate: tech.dailyRate,
          amount: tech.dailyRate,
          attendanceId,
          description: "Daily Wage (Present)",
          notes,
          status: "Unpaid",
          createdAt: nowIso,
        };

        const newAttendance: AttendanceRecord = {
          id: attendanceId,
          technicianId: tech.id,
          technicianName: tech.name,
          date,
          status: "Present",
          dailyRate: tech.dailyRate,
          notes,
          earningTransactionId: newTxId,
          timestamp: nowIso,
        };

        setPayrollTransactions((prev) => [newTx, ...prev]);
        setAttendanceRecords((prev) => [newAttendance, ...prev]);
        api.markAttendance({
          id: attendanceId,
          technicianId: tech.id,
          date,
          status: "Present",
          dailyRate: tech.dailyRate,
          notes,
        }).catch((err) => console.warn("Backend mark attendance error:", err));
        api.recordPayrollTransaction(newTx).catch((err) => console.warn("Backend record payroll tx error:", err));
      } else {
        // Absent: No earning created
        const newAttendance: AttendanceRecord = {
          id: attendanceId,
          technicianId: tech.id,
          technicianName: tech.name,
          date,
          status: "Absent",
          dailyRate: tech.dailyRate,
          notes,
          timestamp: nowIso,
        };
        setAttendanceRecords((prev) => [newAttendance, ...prev]);
        api.markAttendance({
          id: attendanceId,
          technicianId: tech.id,
          date,
          status: "Absent",
          dailyRate: tech.dailyRate,
          notes,
        }).catch((err) => console.warn("Backend mark attendance error:", err));
      }
    }
  }

  function handleAddAdvance(
    amount: number,
    date: string,
    method: "Cash" | "Bank Transfer" | "Cheque" | "Other",
    notes?: string
  ) {
    if (!advanceModalTech) return;
    const tech = advanceModalTech;
    const nowIso = new Date().toISOString();

    const advanceTx: PayrollTransaction = {
      id: `tx-adv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      technicianId: tech.id,
      technicianName: tech.name,
      date,
      type: "ADVANCE",
      amount: -Math.abs(amount),
      paymentMethod: method,
      notes,
      description: `Advance (${method})`,
      status: "Paid",
      createdAt: nowIso,
    };

    setPayrollTransactions((prev) => [advanceTx, ...prev]);
    setAdvanceModalTech(null);
    api.recordPayrollTransaction(advanceTx).catch((err) => console.warn("Backend record advance error:", err));
  }

  function handleAddDeduction(
    amount: number,
    date: string,
    reason: string,
    notes?: string
  ) {
    if (!deductionModalTech) return;
    const tech = deductionModalTech;
    const nowIso = new Date().toISOString();

    const deductionTx: PayrollTransaction = {
      id: `tx-ded-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      technicianId: tech.id,
      technicianName: tech.name,
      date,
      type: "DEDUCTION",
      amount: -Math.abs(amount),
      reason,
      notes,
      description: `Deduction: ${reason}`,
      status: "Paid",
      createdAt: nowIso,
    };

    setPayrollTransactions((prev) => [deductionTx, ...prev]);
    setDeductionModalTech(null);
    api.recordPayrollTransaction(deductionTx).catch((err) => console.warn("Backend record deduction error:", err));
  }

  function handleAddTip(
    amount: number,
    date: string,
    reason: string,
    notes?: string
  ) {
    if (!tipModalTech) return;
    const tech = tipModalTech;
    const nowIso = new Date().toISOString();

    const tipTx: PayrollTransaction = {
      id: `tx-tip-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      technicianId: tech.id,
      technicianName: tech.name,
      date,
      type: "TECHNICIAN_TIP",
      amount: Math.abs(amount),
      reason,
      notes,
      description: `Technician Tip: ${reason}`,
      status: "Unpaid",
      createdAt: nowIso,
      createdBy: "Accountant",
    };

    setPayrollTransactions((prev) => [tipTx, ...prev]);
    setTipModalTech(null);
    api.recordPayrollTransaction(tipTx).catch((err) => console.warn("Backend record tip error:", err));
  }

  function handlePaySalary(
    amount: number,
    date: string,
    method: "Cash" | "Bank Transfer" | "Cheque" | "Other",
    notes?: string
  ) {
    if (!payingSalaryTechnician) return;
    const tech = payingSalaryTechnician;
    const nowIso = new Date().toISOString();

    const paymentTx: PayrollTransaction = {
      id: `tx-pay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      technicianId: tech.id,
      technicianName: tech.name,
      date,
      type: "SALARY_PAYMENT",
      amount: -Math.abs(amount),
      paymentMethod: method,
      notes,
      description: `Salary Payment (${method})`,
      status: "Paid",
      createdAt: nowIso,
    };

    setPayrollTransactions((prev) => [paymentTx, ...prev]);
    setPayingSalaryTechnician(null);
    api.recordPayrollTransaction(paymentTx).catch((err) => console.warn("Backend record salary payment error:", err));
  }

  function handleSettleAdvance(
    amount: number,
    date: string,
    notes?: string
  ) {
    if (!settleAdvanceModalTech) return;
    const tech = settleAdvanceModalTech;
    const nowIso = new Date().toISOString();

    const activeAdv = payrollTransactions.find(
      (tx) => tx.technicianId === tech.id && tx.type === "ADVANCE"
    );

    const repaymentTx: PayrollTransaction = {
      id: `tx-repay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      technicianId: tech.id,
      technicianName: tech.name,
      date,
      type: "ADVANCE_REPAYMENT",
      amount: -Math.abs(amount),
      relatedAdvanceId: activeAdv?.id,
      notes: notes || "Advance Repayment (Deducted from Salary)",
      description: `Advance Repayment${notes ? `: ${notes}` : ""}`,
      status: "Paid",
      createdAt: nowIso,
      createdBy: "Accountant",
    };

    setPayrollTransactions((prev) => [repaymentTx, ...prev]);
    setSettleAdvanceModalTech(null);
    api.recordPayrollTransaction(repaymentTx).catch((err) => console.warn("Backend record advance repayment error:", err));
  }

  function handleAddTechnician(data: Omit<Technician, "id">) {
    const newTech: Technician = {
      ...data,
      id: `tech-${Date.now()}`,
    };
    setTechnicians((prev) => [...prev, newTech]);
    api.createTechnician(newTech).then((created) => {
      if (created && created.id) {
        setTechnicians((prev) => prev.map((t) => (t.id === newTech.id ? created : t)));
      }
    }).catch((err) => console.warn("Backend create technician error:", err));
  }

  function handleUpdateTechnician(id: string, data: Partial<Technician>) {
    setTechnicians((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
    setSelectedTechnician((prev) => (prev && prev.id === id ? { ...prev, ...data } : prev));
    api.updateTechnician(id, data).catch((err) => console.warn("Backend update technician error:", err));
  }

  function handleDeleteTechnician(id: string) {
    setTechnicians((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              isDeleted: true,
              status: "Inactive" as const,
              deletedAt: new Date().toISOString(),
            }
          : t
      )
    );
    setSelectedTechnician((prev) =>
      prev && prev.id === id ? { ...prev, isDeleted: true, status: "Inactive" } : prev
    );
    api.deleteTechnician(id).catch((err) => console.warn("Backend delete technician error:", err));
  }

  return (
    <div className="size-full bg-[#f3f4f6]">
      {/* Login screen is a full-screen overlay */}
      {screen === "login" && (
        <LoginScreen onLoginSuccess={handleLoginSuccess} workshopSettings={workshopSettings} />
      )}

      {screen !== "login" && !isWarehouseScreen && !isOwnerScreen && !isAccountantScreen && (
        <Sidebar
          active={activeNav}
          onNav={handleNav}
          onSignOut={handleSignOut}
          workshopSettings={workshopSettings}
          authUser={authUser}
          role={selectedRole}
        />
      )}
      {screen !== "login" && !isWarehouseScreen && !isOwnerScreen && !isAccountantScreen && (
        <Header title={headerTitle} role={selectedRole} authUser={authUser} workshopSettings={workshopSettings} />
      )}

      {isWarehouseScreen && (
        <WarehouseSidebar
          active={wActiveNav}
          onNav={handleWNav}
          onSignOut={handleSignOut}
          workshopSettings={workshopSettings}
          authUser={authUser}
        />
      )}
      {isWarehouseScreen && <WarehouseHeader title={warehouseHeaderTitle} authUser={authUser} />}

      {isOwnerScreen && (
        <OwnerSidebar
          active={activeNav}
          onNav={handleOwnerNav}
          onSignOut={handleSignOut}
          workshopSettings={workshopSettings}
          authUser={authUser}
        />
      )}
      {isOwnerScreen && <Header role={selectedRole} authUser={authUser} workshopSettings={workshopSettings} title={
        screen === "owner-dashboard" ? "Dashboard" :
        screen === "owner-reports" ? "Reports" :
        screen === "owner-users" ? "Users" :
        screen === "owner-settings" ? "Settings" :
        screen === "dashboard" ? "Dashboard" :
        screen === "customer-list" ? "Customers" :
        screen === "vehicle-list" ? "Vehicles" :
        screen === "job-orders-list" ? "Job Orders" :
        screen === "warehouse-dashboard" ? "Warehouse Dashboard" :
        screen === "warehouse-jobs" ? "Open Job Orders" :
        screen === "warehouse-parts" ? "Parts & Inventory" :
        screen === "warehouse-stock-count" ? "Stock Update" :
        screen === "warehouse-movements" ? "Movements" :
        screen === "owner-invoices" ? "Invoices" :
        screen === "owner-payments" ? "Payments" :
        screen === "owner-suppliers" ? "Suppliers" :
        screen === "owner-supplier-details" ? "Supplier Profile" :
        screen === "owner-expenses" ? "Operating Expenses" :
        screen === "owner-technicians" ? "Technicians Directory" :
        screen === "owner-attendance" ? "Technician Attendance" :
        screen === "owner-payroll" ? "Technician Payroll" :
        screen === "owner-technician-details" ? (selectedTechnician ? `${selectedTechnician.name} — Profile & Payroll` : "Technician Details") :
        "Owner"
      } />}

      {isAccountantScreen && (
        <AccountantSidebar
          active={activeNav}
          onNav={(id) => {
            setScreen(id as Screen);
            setActiveNav(id);
            // Clear dashboard-applied filters when user manually navigates
            setInvoicesFilter(undefined);
            setJobsStatusFilter(undefined);
          }}
          onSignOut={handleSignOut}
          workshopSettings={workshopSettings}
          authUser={authUser}
        />
      )}
      {isAccountantScreen && <Header role={selectedRole} authUser={authUser} workshopSettings={workshopSettings} title={
        screen === "accountant-dashboard"     ? "Dashboard" :
        screen === "accountant-jobs"          ? "Job Orders" :
        screen === "accountant-parts"         ? "Parts & Inventory" :
        screen === "accountant-job-details"   ? "Job Order Details" :
        screen === "accountant-invoices"      ? "Invoices" :
        screen === "accountant-invoice-details" ? "Invoice Details" :
        screen === "accountant-payments"      ? "Payments" :
        screen === "accountant-suppliers"     ? "Suppliers" :
        screen === "accountant-supplier-details" ? "Supplier Profile" :
        screen === "accountant-expenses"      ? "Operating Expenses" :
        screen === "accountant-technicians"   ? "Technicians Directory" :
        screen === "accountant-attendance"    ? "Technician Attendance" :
        screen === "accountant-payroll"       ? "Technician Payroll" :
        screen === "accountant-technician-details" ? (selectedTechnician ? `${selectedTechnician.name} — Profile & Payroll` : "Technician Details") :
        screen === "job-order-details"        ? "Job Order Details" :
        screen === "warehouse-part-details"   ? "Part Details" :
        "Accountant"
      } />}

      {/* ── Accountant screens ── */}
      {screen === "accountant-dashboard" && isAccountantScreen && (
        <AccountantDashboardScreen
          jobOrders={jobOrders}
          joDetails={joDetails}
          invoices={invoices}
          wJobPartsMap={wJobPartsMap}
          wParts={wParts}
          onReviewJob={(jo) => {
            setSelectedJobOrder(jo);
            setJoDetailsBackTarget("accountant-dashboard");
            setScreen("job-order-details");
            setActiveNav("accountant-dashboard");
          }}
          onViewInvoice={(inv) => {
            setSelectedInvoice(inv);
            setScreen("accountant-invoice-details");
            setActiveNav("accountant-invoices");
          }}
          onNavToInvoices={(filter) => {
            setInvoicesFilter(filter);
            setScreen("accountant-invoices");
            setActiveNav("accountant-invoices");
          }}
          onNavToJobs={(filter) => {
            setJobsStatusFilter(filter);
            setScreen("accountant-jobs");
            setActiveNav("accountant-jobs");
          }}
          onNavToExpenses={() => {
            setScreen("accountant-expenses");
            setActiveNav("accountant-expenses");
          }}
        />
      )}

      {screen === "accountant-jobs" && isAccountantScreen && (
        <AccountantJobsScreen
          jobOrders={jobOrders}
          joDetails={joDetails}
          initialFilter={jobsStatusFilter}
          onSelectJo={(jo) => {
            setSelectedJobOrder(jo);
            setJoDetailsBackTarget("accountant-jobs");
            setScreen("job-order-details");
            setActiveNav("accountant-jobs");
          }}
        />
      )}

      {screen === "accountant-invoices" && isAccountantScreen && (
        <AccountantInvoicesScreen
          invoices={invoices}
          initialFilter={invoicesFilter}
          onViewInvoice={(inv) => {
            setSelectedInvoice(inv);
            setScreen("accountant-invoice-details");
            setActiveNav("accountant-invoices");
          }}
        />
      )}

      {screen === "accountant-invoice-details" && selectedInvoice && isAccountantScreen && (
        <AccountantInvoiceDetailsScreen
          invoice={selectedInvoice}
          settings={workshopSettings}
          onBack={() => { setScreen("accountant-invoices"); setActiveNav("accountant-invoices"); }}
          onOpenJobOrder={(joNum) => {
            const detail = joDetails[joNum];
            if (detail) {
              setSelectedJobOrder(detail);
              setJoDetailsBackTarget("accountant-invoice-details");
              setScreen("job-order-details");
            }
          }}
          onRecordPayment={(rows) => handleRecordPayment(selectedInvoice.invoiceNumber, rows)}
        />
      )}

      {screen === "accountant-payments" && isAccountantScreen && (
        <AccountantPaymentsScreen invoices={invoices} />
      )}

      {screen === "accountant-suppliers" && isAccountantScreen && (
        <SupplierDashboardScreen
          parts={wParts}
          onReloadInventory={refreshWarehouseParts}
          onViewSupplier={(sup) => {
            setSelectedSupplierId(sup.id);
            setScreen("accountant-supplier-details");
          }}
        />
      )}

      {screen === "accountant-supplier-details" && isAccountantScreen && selectedSupplierId && (
        <SupplierProfileScreen
          supplierId={selectedSupplierId}
          parts={wParts}
          onReloadInventory={refreshWarehouseParts}
          onBack={() => setScreen("accountant-suppliers")}
        />
      )}

      {screen === "accountant-expenses" && isAccountantScreen && (
        <ExpensesDashboardScreen />
      )}

      {screen === "accountant-technicians" && isAccountantScreen && (
        <TechniciansScreen
          technicians={technicians}
          getTechnicianStats={getTechnicianStats}
          onSelectTechnician={(tech) => {
            setSelectedTechnician(tech);
            setTechnicianDetailsBackTarget("accountant-technicians");
            setScreen("accountant-technician-details");
          }}
          onAddTechnician={handleAddTechnician}
          onUpdateTechnician={handleUpdateTechnician}
          onDeleteTechnician={handleDeleteTechnician}
          onOpenPaySalary={(tech) => setPayingSalaryTechnician(tech)}
          onOpenAdvance={(tech) => setAdvanceModalTech(tech)}
          onOpenSettleAdvance={(tech) => setSettleAdvanceModalTech(tech)}
          onOpenDeduction={(tech) => setDeductionModalTech(tech)}
          onOpenTip={(tech) => setTipModalTech(tech)}
          role="accountant"
        />
      )}

      {screen === "accountant-attendance" && isAccountantScreen && (
        <AttendanceScreen
          technicians={technicians}
          attendanceRecords={attendanceRecords}
          payrollTransactions={payrollTransactions}
          onMarkAttendance={handleMarkAttendance}
          onOpenAdvance={(tech) => setAdvanceModalTech(tech)}
          onOpenDeduction={(tech) => setDeductionModalTech(tech)}
          onSelectTechnician={(tech) => {
            setSelectedTechnician(tech);
            setTechnicianDetailsBackTarget("accountant-attendance");
            setScreen("accountant-technician-details");
          }}
          role="accountant"
        />
      )}

      {screen === "accountant-payroll" && isAccountantScreen && (
        <PayrollScreen
          technicians={technicians}
          payrollTransactions={payrollTransactions}
          attendanceRecords={attendanceRecords}
          getTechnicianStats={getTechnicianStats}
          onOpenPaySalary={(tech) => setPayingSalaryTechnician(tech)}
          onOpenAdvance={(tech) => setAdvanceModalTech(tech)}
          onOpenSettleAdvance={(tech) => setSettleAdvanceModalTech(tech)}
          onOpenDeduction={(tech) => setDeductionModalTech(tech)}
          onOpenTip={(tech) => setTipModalTech(tech)}
          onSelectTechnician={(tech) => {
            setSelectedTechnician(tech);
            setTechnicianDetailsBackTarget("accountant-payroll");
            setScreen("accountant-technician-details");
          }}
          role="accountant"
        />
      )}

      {screen === "accountant-technician-details" && selectedTechnician && isAccountantScreen && (
        <TechnicianDetailsScreen
          technician={technicians.find((t) => t.id === selectedTechnician.id) || selectedTechnician}
          attendanceRecords={attendanceRecords}
          payrollTransactions={payrollTransactions}
          stats={getTechnicianStats(selectedTechnician.id)}
          onBack={() => {
            setScreen(technicianDetailsBackTarget);
            setActiveNav(technicianDetailsBackTarget);
          }}
          onOpenPaySalary={() => setPayingSalaryTechnician(selectedTechnician)}
          onOpenAdvance={() => setAdvanceModalTech(selectedTechnician)}
          onOpenSettleAdvance={() => setSettleAdvanceModalTech(selectedTechnician)}
          onOpenDeduction={() => setDeductionModalTech(selectedTechnician)}
          onOpenTip={() => setTipModalTech(selectedTechnician)}
          onUpdateTechnician={handleUpdateTechnician}
          onDeleteTechnician={() => {
            handleDeleteTechnician(selectedTechnician.id);
            setScreen(technicianDetailsBackTarget);
            setActiveNav(technicianDetailsBackTarget);
          }}
          role="accountant"
        />
      )}

      {screen === "dashboard" && (
        <DashboardScreen
          jobOrders={jobOrders}
          vehicles={vehicleList}
          onNewJobOrder={startNewJobOrder}
          onOpenJobOrder={(num) => handleOpenJobOrder(num, "dashboard")}
          onSelectVehicle={handleSelectVehicleFromList}
          workshopSettings={workshopSettings}
        />
      )}

      {screen === "vehicle-list" && (
        <VehicleListScreen
          vehicles={vehicleList}
          onSelectVehicle={handleSelectVehicleFromList}
        />
      )}

      {screen === "vehicle-details" && selectedVehicle && (() => {
        const owner = vehicleOwnerMap[selectedVehicle.id] ?? { name: selectedVehicle.customerName, phone: selectedVehicle.customerPhone };
        return (
          <VehicleDetailsScreen
            vehicle={selectedVehicle}
            serviceHistory={serviceHistoryMap[selectedVehicle.id] ?? []}
            deferredWork={vehicleDeferredWorkMap[selectedVehicle.id] ?? []}
            ownerName={owner.name}
            ownerPhone={owner.phone}
            onBack={() => {
              if (vehicleDetailsBackTarget === "customer-details") {
                setScreen("customer-details");
                setActiveNav("customers");
              } else {
                setScreen("vehicle-list");
                setActiveNav("vehicles");
              }
            }}
            onNewJobOrder={handleNewJobOrderFromVehicle}
            onChangeOwner={() => setModal("change-owner")}
            onSelectJo={(joNumber) => handleOpenJobOrder(joNumber, "vehicle-details")}
            onViewCustomer={() => {
              const owner = vehicleOwnerMap[selectedVehicle.id] ?? { name: selectedVehicle.customerName, phone: selectedVehicle.customerPhone };
              const c = customers.find((c) => c.name === owner.name);
              if (c) {
                setSelectedCustomer(c);
                setCustomerDetailsBackTarget("vehicle-details");
                setScreen("customer-details");
                setActiveNav("customers");
              }
            }}
          />
        );
      })()}

      {screen === "customer-list" && (
        <CustomerListScreen
          customers={customers}
          vehicleMap={vehicleMap}
          onSelectCustomer={handleSelectCustomer2}
        />
      )}

      {screen === "customer-details" && selectedCustomer && (
        <CustomerDetailsScreen
          customer={selectedCustomer}
          vehicles={vehicleMap[selectedCustomer.id] ?? []}
          jobOrders={jobOrders}
          joDetails={joDetails}
          onBack={() => {
            if (customerDetailsBackTarget === "vehicle-details") {
              setScreen("vehicle-details");
              setActiveNav("vehicles");
            } else if (customerDetailsBackTarget === "job-order-details") {
              setScreen("job-order-details");
            } else {
              setScreen("customer-list");
              setActiveNav("customers");
            }
          }}
          onSelectVehicle={handleSelectVehicleFromCustomer}
          onSelectJo={handleSelectJo}
          onAddNewCar={() => setModal("add-vehicle")}
        />
      )}

      {screen === "job-orders-list" && (
        <JobOrdersListScreen
          jobOrders={jobOrders}
          joDetails={joDetails}
          onSelectJo={(jo) => {
            setSelectedJobOrder(jo);
            setJoDetailsBackTarget("job-orders-list");
            setScreen("job-order-details");
            setActiveNav("job-orders");
          }}
          onNewJobOrder={startNewJobOrder}
        />
      )}

      {screen === "job-order-details" && selectedJobOrder && (
        <JobOrderDetailsScreen
          joDetail={selectedJobOrder}
          role={selectedRole ?? undefined}
          issuedParts={wJobPartsMap[selectedJobOrder.number] ?? []}
          partsPriceMap={Object.fromEntries(wParts.map((p) => [p.id, p.sellingPrice]))}
          parts={wParts}
          workshopSettings={workshopSettings}
          onCreateInvoice={(laborItems, expenses) => {
            const partsForJob = wJobPartsMap[selectedJobOrder.number] ?? [];
            const priceMap = Object.fromEntries(wParts.map((p) => [p.id, p.sellingPrice]));
            const partsTotal = partsForJob.reduce((s, p) => s + p.qty * (priceMap[p.partId] ?? 0), 0);
            const validExp = expenses.filter((e) => e.description.trim() && parseFloat(e.amount) > 0);
            const expTotal = validExp.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
            const validLaborItems = laborItems.filter((l) => l.description.trim() && parseFloat(l.amount) > 0);
            const laborAmount = validLaborItems.reduce((s, l) => s + (parseFloat(l.amount) || 0), 0);
            const grandTotal = partsTotal + laborAmount + expTotal;
            const today = new Date();
            const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            const newInvoice: Invoice = {
              invoiceNumber: `INV-${today.getFullYear()}-${String(invoices.length + 1).padStart(5, "0")}`,
              jobOrderNumber: selectedJobOrder.number,
              date: dateStr,
              customerName: selectedJobOrder.customerName,
              customerPhone: selectedJobOrder.customerPhone,
              vehicleName: selectedJobOrder.vehicleName,
              vehiclePlate: selectedJobOrder.vehiclePlate,
              vehicleKm: selectedJobOrder.vehicleKm,
              vehicleVin: selectedJobOrder.vehicleVin,
              engineer: selectedJobOrder.engineer,
              issuedParts: partsForJob,
              partsPriceMap: priceMap,
              partsTotal,
              laborAmount,
              laborItems: validLaborItems,
              additionalExpenses: validExp,
              expensesTotal: expTotal,
              grandTotal,
              payments: [],
              paymentStatus: "Unpaid",
            };
            setInvoices((prev) => [...prev, newInvoice]);
            const updated = {
              ...joDetails[selectedJobOrder.number],
              laborAmount,
              laborItems: validLaborItems,
              additionalExpenses: expenses,
              invoiceCreated: true,
              status: "Closed",
            };
            setJoDetails((prev) => ({ ...prev, [selectedJobOrder.number]: updated }));
            setSelectedJobOrder(updated);
            setJobOrders((prev) => prev.map((jo) => jo.number === selectedJobOrder.number ? { ...jo, status: "Closed" } : jo));
            api.updateJobOrderStatus(selectedJobOrder.number, "Closed").catch((err) => {
              console.warn("Backend status update error on invoice creation:", err);
            });
            api.createInvoice(selectedJobOrder.number, {
              laborAmount,
              additionalExpenses: validExp.map((e) => ({
                description: e.description,
                amount: parseFloat(e.amount) || 0,
              })),
            }).then(() => {
              api.getInvoices().then((invs) => {
                if (Array.isArray(invs)) setInvoices(invs);
              }).catch(() => {});
            }).catch((err) => {
              console.warn("Backend create invoice error:", err);
            });
            // Navigate to the freshly created invoice
            setSelectedInvoice(newInvoice);
            setScreen("accountant-invoice-details");
            setActiveNav("accountant-invoices");
          }}
          onSaveWorkFound={(items) => {
            api.saveWorkFound(
              selectedJobOrder.number,
              items.map((i) => ({ description: i.description, approved: i.approved }))
            ).catch((err) => {
              console.warn("Backend save work found error:", err);
            });
            const approved = items.filter((i) => i.approved).map((i) => ({
              item: i.description,
              note: i.selectedPart
                ? `${i.selectedPart.brand} (${i.selectedPart.partType || "Part"}) · ${i.selectedPart.sellingPrice.toLocaleString()} EGP [Qty: ${i.selectedPart.qty}]`
                : "",
              selectedPart: i.selectedPart,
            }));
            const deferred: DeferredWorkItem[] = items.filter((i) => !i.approved).map((i) => ({
              id: i.id,
              item: i.description,
              options: i.options || [],
              selectedOptionId: i.selectedOptionId,
              selectedPart: i.selectedPart,
              note: i.selectedPart
                ? `${i.selectedPart.brand} (${i.selectedPart.partType || "Part"}) · ${i.selectedPart.sellingPrice.toLocaleString()} EGP [Deferred]`
                : "Deferred",
              status: "Deferred" as const,
            }));
            setJoDetails((prev) => ({
              ...prev,
              [selectedJobOrder.number]: {
                ...prev[selectedJobOrder.number],
                workFoundItems: items,
                approvedItems: approved,
                deferredItems: deferred,
              },
            }));
            setSelectedJobOrder((prev) =>
              prev
                ? {
                    ...prev,
                    workFoundItems: items,
                    approvedItems: approved,
                    deferredItems: deferred,
                  }
                : prev
            );
            if (selectedJobOrder.vehicleId) {
              setVehicleDeferredWorkMap((prev) => {
                const existing = prev[selectedJobOrder.vehicleId] || [];
                const newItems: DeferredItem[] = deferred.map((d) => ({
                  item: d.item,
                  note: d.selectedPart
                    ? `${d.selectedPart.brand} (${d.selectedPart.partType || "Part"}) · ${d.selectedPart.sellingPrice.toLocaleString()} EGP`
                    : "Postponed",
                  date: selectedJobOrder.date,
                  joNumber: selectedJobOrder.number,
                  km: selectedJobOrder.vehicleKm || "—",
                  engineer: selectedJobOrder.engineer,
                  options: d.options,
                  selectedPart: d.selectedPart,
                }));
                const withoutCurrentJo = existing.filter((e) => e.joNumber !== selectedJobOrder.number);
                return {
                  ...prev,
                  [selectedJobOrder.vehicleId]: [...withoutCurrentJo, ...newItems],
                };
              });
            }
          }}
          onBack={() => {
            const target = joDetailsBackTarget;
            if (target === "vehicle-details") {
              setScreen("vehicle-details");
              setActiveNav("vehicles");
            } else if (target === "customer-details") {
              setScreen("customer-details");
              setActiveNav("customers");
            } else if (target === "accountant-invoice-details") {
              setScreen("accountant-invoice-details");
              setActiveNav("accountant-invoices");
            } else if (target === "accountant-dashboard") {
              setScreen("accountant-dashboard");
              setActiveNav("accountant-dashboard");
            } else if (isAccountantRole) {
              setScreen("accountant-jobs");
              setActiveNav("accountant-jobs");
            } else {
              setScreen("job-orders-list");
              setActiveNav("job-orders");
            }
          }}
          onViewCustomer={() => {
            const c = customers.find((c) => c.name === selectedJobOrder.customerName);
            if (c) {
              setSelectedCustomer(c);
              setCustomerDetailsBackTarget("job-order-details");
              setScreen("customer-details");
              setActiveNav("customers");
            }
          }}
        />
      )}

      {screen === "step1-customer" && (
        <Step1CustomerScreen
          ctx={ctx}
          customers={customers}
          onSelectCustomer={handleSelectCustomer}
          onNewCustomer={handleOpenNewCustomer}
          onBack={cancelFlow}
        />
      )}

      {screen === "step2-vehicle" && (
        <Step2VehicleScreen
          ctx={ctx}
          vehicles={vehiclesForCurrentCustomer}
          onSelectVehicle={handleSelectVehicle}
          onAddNewVehicle={handleOpenAddVehicle}
          onBack={() => setScreen("step1-customer")}
          onChangeCustomer={() => setScreen("step1-customer")}
        />
      )}

      {screen === "step3-details" && (
        <Step3DetailsScreen
          ctx={ctx}
          onCreateJobOrder={handleCreateJobOrder}
          onCancel={cancelFlow}
          onBack={step3BackTarget}
        />
      )}

      {screen === "job-order-created" && (
        <JobOrderCreatedScreen
          ctx={ctx}
          jobOrders={jobOrders}
          onViewJobOrder={() => setScreen("step3-details")}
          onBackToDashboard={() => { setScreen("dashboard"); setActiveNav("dashboard"); }}
        />
      )}

      {screen === "print-job-order" && printJoDetail && (
        <PrintJobOrderScreen
          detail={printJoDetail}
          workshopSettings={workshopSettings}
          onClose={() => {
            setScreen("job-order-details");
            setSelectedJobOrder(printJoDetail);
            setActiveNav("job-orders");
          }}
        />
      )}

      {/* ── Warehouse screens ── */}
      {screen === "warehouse-dashboard" && (
        <WarehouseDashboardScreen
          parts={wParts}
          movements={wMovements}
          jobs={warehouseJobs.filter((j) => j.status.toLowerCase() === "open")}
          onOpenJob={(job) => handleOpenJob(job)}
          onViewAllParts={() => { setScreen("warehouse-parts"); setWActiveNav("warehouse-parts"); }}
          onViewAllMovements={() => { setScreen("warehouse-movements"); setWActiveNav("warehouse-movements"); }}
        />
      )}

      {screen === "warehouse-jobs" && (
        <WarehouseJobsScreen
          jobs={warehouseJobs}
          onOpen={(job) => handleOpenJob(job)}
        />
      )}

      {screen === "warehouse-parts-issue" && wSelectedJob && (
        <WarehousePartsIssueScreen
          job={wSelectedJob}
          issuedParts={wJobPartsMap[wSelectedJob.number] ?? []}
          parts={wParts}
          approvedItems={joDetails[wSelectedJob.number]?.approvedItems ?? []}
          onBack={() => { setScreen("warehouse-jobs"); setWActiveNav("warehouse-jobs"); }}
          onAddPart={() => setWarehouseModal("add-part-to-job")}
          onRemovePart={handleWRemovePart}
          onConfirm={handleWConfirmIssue}
          confirmed={wPartsConfirmedSet.has(wSelectedJob.number) || wSelectedJob.status === "Complete" || wSelectedJob.status === "Closed"}
        />
      )}

      {screen === "warehouse-parts" && (
        <WarehousePartsScreen
          parts={wParts}
          onSelectPart={(p) => {
            setWSelectedPart(p);
            setWPartBackTarget("warehouse-parts");
            setWActiveNav("warehouse-parts");
            setScreen("warehouse-part-details");
          }}
          onAddNewPart={() => setWarehouseModal("add-new-part")}
        />
      )}

      {screen === "accountant-parts" && (
        <WarehousePartsScreen
          parts={wParts}
          onSelectPart={(p) => {
            setWSelectedPart(p);
            setWPartBackTarget("accountant-parts");
            setScreen("warehouse-part-details");
          }}
          onAddNewPart={() => {}}
        />
      )}

      {screen === "warehouse-part-details" && wSelectedPart && (
        <WarehousePartDetailsScreen
          part={wSelectedPart}
          movements={wMovements}
          onBack={() => { setScreen(wPartBackTarget); setWActiveNav(wPartBackTarget); }}
          role={selectedRole ?? undefined}
          onSavePrices={(partId, purchasePrice, sellingPrice) => {
            setWParts((prev) => prev.map((p) => p.id === partId ? { ...p, purchasePrice, sellingPrice } : p));
            setWSelectedPart((prev) => prev && prev.id === partId ? { ...prev, purchasePrice, sellingPrice } : prev);
          }}
        />
      )}

      {screen === "warehouse-movements" && (
        <WarehouseMovementsScreen
          movements={wMovements}
          parts={wParts}
          onSelectPart={(p) => {
            setWSelectedPart(p);
            setWPartBackTarget("warehouse-movements");
            setWActiveNav("warehouse-movements");
            setScreen("warehouse-part-details");
          }}
        />
      )}

      {screen === "warehouse-stock-count" && (
        <WarehouseStockCountScreen
          parts={wParts}
          onSaveCount={handleWSaveCount}
          onAddNewPart={() => setWarehouseModal("add-new-part")}
        />
      )}

      {screen === "warehouse-suppliers" && isWarehouseScreen && (
        <SupplierDashboardScreen
          parts={wParts}
          onReloadInventory={refreshWarehouseParts}
          onViewSupplier={(sup) => {
            setSelectedSupplierId(sup.id);
            setScreen("warehouse-supplier-details");
          }}
        />
      )}

      {screen === "warehouse-supplier-details" && isWarehouseScreen && selectedSupplierId && (
        <SupplierProfileScreen
          supplierId={selectedSupplierId}
          parts={wParts}
          onReloadInventory={refreshWarehouseParts}
          onBack={() => setScreen("warehouse-suppliers")}
        />
      )}

      {/* ── Owner screens ── */}
      {screen === "owner-dashboard" && isOwnerScreen && (
        <OwnerDashboardScreen
          jobOrders={jobOrders.map((jo) => ({ number: jo.number, customer: jo.customer, vehicle: jo.vehicle, plate: jo.plate, status: jo.status }))}
          parts={wParts}
          onViewJobs={() => handleOwnerNav("job-orders-list")}
          onViewParts={() => handleOwnerNav("warehouse-parts")}
        />
      )}
      {screen === "owner-reports" && isOwnerScreen && (
        <OwnerReportsScreen
          jobOrders={jobOrders.map((jo) => ({ number: jo.number, customer: jo.customer, vehicle: jo.vehicle, plate: jo.plate, status: jo.status }))}
          parts={wParts}
          movements={wMovements}
        />
      )}
      {screen === "owner-users" && isOwnerScreen && <OwnerUsersScreen />}
      {screen === "owner-settings" && isOwnerScreen && (
        <OwnerSettingsScreen
          settings={workshopSettings}
          onSettingsUpdated={setWorkshopSettings}
        />
      )}
      {screen === "owner-invoices" && isOwnerScreen && <OwnerPlaceholderScreen title="Invoices" description="Invoice management coming soon. Job Order invoices will be generated and managed here." />}
      {screen === "owner-payments" && isOwnerScreen && <OwnerPlaceholderScreen title="Payments" description="Payment tracking coming soon. Customer payments and outstanding balances will be managed here." />}
      {screen === "owner-suppliers" && isOwnerScreen && (
        <SupplierDashboardScreen
          parts={wParts}
          onReloadInventory={refreshWarehouseParts}
          onViewSupplier={(sup) => {
            setSelectedSupplierId(sup.id);
            setScreen("owner-supplier-details");
          }}
        />
      )}

      {screen === "owner-supplier-details" && isOwnerScreen && selectedSupplierId && (
        <SupplierProfileScreen
          supplierId={selectedSupplierId}
          parts={wParts}
          onReloadInventory={refreshWarehouseParts}
          onBack={() => setScreen("owner-suppliers")}
        />
      )}

      {screen === "owner-expenses" && isOwnerScreen && (
        <ExpensesDashboardScreen />
      )}

      {screen === "owner-technicians" && isOwnerScreen && (
        <TechniciansScreen
          technicians={technicians}
          getTechnicianStats={getTechnicianStats}
          onSelectTechnician={(tech) => {
            setSelectedTechnician(tech);
            setTechnicianDetailsBackTarget("owner-technicians");
            setScreen("owner-technician-details");
          }}
          onAddTechnician={handleAddTechnician}
          onUpdateTechnician={handleUpdateTechnician}
          onDeleteTechnician={handleDeleteTechnician}
          onOpenPaySalary={(tech) => setPayingSalaryTechnician(tech)}
          onOpenAdvance={(tech) => setAdvanceModalTech(tech)}
          onOpenSettleAdvance={(tech) => setSettleAdvanceModalTech(tech)}
          onOpenDeduction={(tech) => setDeductionModalTech(tech)}
          onOpenTip={(tech) => setTipModalTech(tech)}
          role="owner"
        />
      )}

      {screen === "owner-attendance" && isOwnerScreen && (
        <AttendanceScreen
          technicians={technicians}
          attendanceRecords={attendanceRecords}
          payrollTransactions={payrollTransactions}
          onMarkAttendance={handleMarkAttendance}
          onOpenAdvance={(tech) => setAdvanceModalTech(tech)}
          onOpenDeduction={(tech) => setDeductionModalTech(tech)}
          onSelectTechnician={(tech) => {
            setSelectedTechnician(tech);
            setTechnicianDetailsBackTarget("owner-attendance");
            setScreen("owner-technician-details");
          }}
          role="owner"
        />
      )}

      {screen === "owner-payroll" && isOwnerScreen && (
        <PayrollScreen
          technicians={technicians}
          payrollTransactions={payrollTransactions}
          attendanceRecords={attendanceRecords}
          getTechnicianStats={getTechnicianStats}
          onOpenPaySalary={(tech) => setPayingSalaryTechnician(tech)}
          onOpenAdvance={(tech) => setAdvanceModalTech(tech)}
          onOpenSettleAdvance={(tech) => setSettleAdvanceModalTech(tech)}
          onOpenDeduction={(tech) => setDeductionModalTech(tech)}
          onOpenTip={(tech) => setTipModalTech(tech)}
          onSelectTechnician={(tech) => {
            setSelectedTechnician(tech);
            setTechnicianDetailsBackTarget("owner-payroll");
            setScreen("owner-technician-details");
          }}
          role="owner"
        />
      )}

      {screen === "owner-technician-details" && selectedTechnician && isOwnerScreen && (
        <TechnicianDetailsScreen
          technician={technicians.find((t) => t.id === selectedTechnician.id) || selectedTechnician}
          attendanceRecords={attendanceRecords}
          payrollTransactions={payrollTransactions}
          stats={getTechnicianStats(selectedTechnician.id)}
          onBack={() => {
            setScreen(technicianDetailsBackTarget);
            setActiveNav(technicianDetailsBackTarget);
          }}
          onOpenPaySalary={() => setPayingSalaryTechnician(selectedTechnician)}
          onOpenAdvance={() => setAdvanceModalTech(selectedTechnician)}
          onOpenSettleAdvance={() => setSettleAdvanceModalTech(selectedTechnician)}
          onOpenDeduction={() => setDeductionModalTech(selectedTechnician)}
          onOpenTip={() => setTipModalTech(selectedTechnician)}
          onUpdateTechnician={handleUpdateTechnician}
          onDeleteTechnician={() => {
            handleDeleteTechnician(selectedTechnician.id);
            setScreen(technicianDetailsBackTarget);
            setActiveNav(technicianDetailsBackTarget);
          }}
          role="owner"
        />
      )}

      {/* Pay Salary Modal */}
      {payingSalaryTechnician && (
        <PaySalaryModal
          technician={payingSalaryTechnician}
          unpaidBalance={getTechnicianStats(payingSalaryTechnician.id).unpaidBalance}
          onClose={() => setPayingSalaryTechnician(null)}
          onConfirm={handlePaySalary}
        />
      )}

      {/* Advance Modal */}
      {advanceModalTech && (
        <AddAdvanceModal
          technician={advanceModalTech}
          unpaidBalance={getTechnicianStats(advanceModalTech.id).unpaidBalance}
          onClose={() => setAdvanceModalTech(null)}
          onConfirm={handleAddAdvance}
        />
      )}

      {/* Settle Advance Modal */}
      {settleAdvanceModalTech && (
        <SettleAdvanceModal
          technician={settleAdvanceModalTech}
          outstandingAdvance={getTechnicianStats(settleAdvanceModalTech.id).outstandingAdvance || 0}
          availableSalary={getTechnicianStats(settleAdvanceModalTech.id).unpaidBalance}
          onClose={() => setSettleAdvanceModalTech(null)}
          onConfirm={handleSettleAdvance}
        />
      )}

      {/* Deduction Modal */}
      {deductionModalTech && (
        <AddDeductionModal
          technician={deductionModalTech}
          unpaidBalance={getTechnicianStats(deductionModalTech.id).unpaidBalance}
          onClose={() => setDeductionModalTech(null)}
          onConfirm={handleAddDeduction}
        />
      )}

      {/* Tip Modal */}
      {tipModalTech && (
        <RecordTipModal
          technician={tipModalTech}
          unpaidBalance={getTechnicianStats(tipModalTech.id).unpaidBalance}
          onClose={() => setTipModalTech(null)}
          onConfirm={handleAddTip}
        />
      )}

      {/* ── Warehouse modals ── */}
      {warehouseModal === "add-part-to-job" && (
        <AddPartModal
          parts={wParts}
          onAdd={handleWAddPart}
          onClose={() => setWarehouseModal(null)}
        />
      )}
      {warehouseModal === "add-new-part" && (
        <AddNewPartModal
          onClose={() => setWarehouseModal(null)}
          onSave={handleWAddNewPart}
          isOwner={isOwnerRole}
        />
      )}

      {/* Modals */}
      {modal === "new-customer" && (
        <NewCustomerModal onClose={() => setModal(null)} onCreate={handleCreateCustomer} />
      )}
      {modal === "add-vehicle" && (
        <AddVehicleModal
          onClose={() => setModal(null)}
          onCreate={(v) => {
            if (screen === "customer-details" && selectedCustomer) {
              // Add vehicle to customer without starting a job order
              setVehicleMap((prev) => ({
                ...prev,
                [selectedCustomer.id]: [...(prev[selectedCustomer.id] ?? []), v],
              }));
              setModal(null);
            } else {
              handleCreateVehicle(v);
            }
          }}
        />
      )}
      {modal === "change-owner" && selectedVehicle && (() => {
        const owner = vehicleOwnerMap[selectedVehicle.id] ?? { name: selectedVehicle.customerName, phone: selectedVehicle.customerPhone };
        return (
          <ChangeOwnerModal
            currentOwner={owner.name}
            currentPhone={owner.phone}
            onClose={() => setModal(null)}
            onSave={handleChangeOwner}
          />
        );
      })()}
    </div>
  );
}
