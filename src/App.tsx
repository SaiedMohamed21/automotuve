import { useState, useEffect } from "react";
import svgPaths from "./imports/CreateAppDesign-5/svg-ctoveqeshk";
import imgCanvas from "./imports/CreateAppDesign-5/40596e1a727bb6e2289087a4a363b5adae14c080.png";
import { api } from "./services/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "role-selection"
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
  | "owner-payments";

type ModalType = null | "new-customer" | "add-vehicle" | "change-owner";
type WarehouseModal = null | "add-part-to-job" | "add-new-part";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  vehicleCount?: number;
}

interface JoListEntry {
  number: string;
  customer: string;
  phone: string;
  vehicle: string;
  plate: string;
  status: string;
}

interface JoDetail {
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
  engineer: string;
  technicians: string[];
  customerRequest?: string;
  requiredWork?: string;
  notes?: string;
  approvedItems?: { item: string; note?: string }[];
  deferredItems: string[];
  recommendedItems?: { item: string; note: string }[];
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
}

interface FlowCtx {
  joNumber: string;
  joDate: string;
  engineer: string;
  customer: Customer | null;
  vehicle: Vehicle | null;
}

const SEED_CUSTOMERS: Customer[] = [];
const SEED_VEHICLES: Record<string, Vehicle[]> = {};
const SEED_JOS: any[] = [];
const SEED_VEHICLE_LIST: (Vehicle & { customerName: string; customerPhone: string })[] = [];
const SEED_SERVICE_HISTORY: Record<string, ServiceHistoryEntry[]> = {};
const SEED_DEFERRED_WORK: Record<string, DeferredItem[]> = {};
const SEED_JO_DETAILS: Record<string, JoDetail> = {};

const FRESH_CTX: FlowCtx = {
  joNumber: "JO-2026-00001",
  joDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
  engineer: "Karim Samir",
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
const W_PARTS: WPart[] = [
  {
    id: "1",
    name: "Brake Pads Front",
    number: "BP-TY-001",
    oem: "04465-02220",
    brand: "Brembo",
    category: "Brakes",
    compatibleVehicles: ["Toyota Camry 2018-2023", "Toyota Corolla 2019-2024"],
    currentQty: 18,
    minQty: 5,
    location: "Shelf A-12",
    status: "In Stock",
  },
  {
    id: "2",
    name: "Synthetic Engine Oil 5W-30 (4L)",
    number: "OIL-5W30-4L",
    oem: "08880-83389",
    brand: "Mobil 1",
    category: "Fluids & Oils",
    compatibleVehicles: ["Universal / All Gasoline Engines"],
    currentQty: 2,
    minQty: 5,
    location: "Shelf B-04",
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Oil Filter - Hyundai / Kia",
    number: "OF-HK-002",
    oem: "26300-35505",
    brand: "Mann-Filter",
    category: "Filters",
    compatibleVehicles: ["Hyundai Elantra 2016-2023", "Kia Cerato 2017-2023"],
    currentQty: 0,
    minQty: 10,
    location: "Shelf A-02",
    status: "Out of Stock",
  },
  {
    id: "4",
    name: "Air Filter - Nissan Sunny",
    number: "AF-NS-003",
    oem: "16546-ED000",
    brand: "Bosch",
    category: "Filters",
    compatibleVehicles: ["Nissan Sunny 2012-2024", "Nissan Sentra 2014-2022"],
    currentQty: 12,
    minQty: 4,
    location: "Shelf A-05",
    status: "In Stock",
  },
  {
    id: "5",
    name: "Iridium Spark Plugs (Set of 4)",
    number: "SP-NGK-004",
    oem: "90919-01247",
    brand: "NGK",
    category: "Ignition",
    compatibleVehicles: ["Toyota RAV4 2019-2024", "Honda Civic 2016-2023"],
    currentQty: 25,
    minQty: 8,
    location: "Shelf C-01",
    status: "In Stock",
  },
  {
    id: "6",
    name: "Front Shock Absorber Pair",
    number: "SA-KYB-005",
    oem: "4060A045",
    brand: "KYB",
    category: "Suspension",
    compatibleVehicles: ["Mitsubishi Lancer EX 2008-2020"],
    currentQty: 1,
    minQty: 3,
    location: "Shelf D-08",
    status: "Low Stock",
  },
];
const W_JOB_PARTS_INIT: Record<string, WIssuedPart[]> = {};
const W_MOVEMENTS: WMovement[] = [
  { part: "Brake Pads Front", type: "Stock In", reference: "BP-TY-001", note: "Initial Stock Added", date: "10 Sept 2026", qty: 18 },
  { part: "Synthetic Engine Oil 5W-30 (4L)", type: "Stock In", reference: "OIL-5W30-4L", note: "Initial Stock Added", date: "10 Sept 2026", qty: 2 },
  { part: "Air Filter - Nissan Sunny", type: "Stock In", reference: "AF-NS-003", note: "Initial Stock Added", date: "10 Sept 2026", qty: 12 },
  { part: "Iridium Spark Plugs (Set of 4)", type: "Stock In", reference: "SP-NGK-004", note: "Initial Stock Added", date: "10 Sept 2026", qty: 25 },
  { part: "Front Shock Absorber Pair", type: "Stock In", reference: "SA-KYB-005", note: "Initial Stock Added", date: "10 Sept 2026", qty: 1 },
];

// ─── Screen: Role Selection ───────────────────────────────────────────────────

type Role = "engineer" | "warehouse" | "accountant" | "owner";

const ROLES: { id: Role; icon: string; label: string; description: string }[] = [
  { id: "engineer",   icon: "🔧", label: "Engineer",   description: "Create job orders, inspect vehicles, print job cards" },
  { id: "warehouse",  icon: "📦", label: "Warehouse",  description: "Manage parts, issue stock, track movements" },
  { id: "accountant", icon: "📋", label: "Accountant", description: "Finalize jobs, create invoices, record payments" },
  { id: "owner",      icon: "◉",  label: "Owner",      description: "Full access: dashboard, reports, pricing, users" },
];

function RoleSelectionScreen({ onSelectRole }: { onSelectRole: (role: Role) => void }) {
  const [hovered, setHovered] = useState<Role | null>(null);

  return (
    <div className="fixed inset-0 bg-[#060f1e] flex flex-col items-center justify-center z-50 select-none">
      {/* Brand block */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-[12px] bg-white/10 flex items-center justify-center mb-4">
          <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-white leading-[28px]">SA</span>
        </div>
        <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] text-white tracking-[-0.6px] mb-1">Star Auto Center</h1>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-white/40">Workshop Management System</p>
      </div>

      {/* Role card */}
      <div className="w-[448px] bg-white/[0.07] border border-white/10 rounded-2xl overflow-hidden">
        <div className="py-3 text-center">
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-white/40 tracking-[1.2px] uppercase">
            Select your role
          </span>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              onMouseEnter={() => setHovered(role.id)}
              onMouseLeave={() => setHovered(null)}
              className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${hovered === role.id ? "bg-white/10" : ""}`}
            >
              <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center shrink-0 text-[18px]">
                {role.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-white leading-[20px]">{role.label}</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-white/40 leading-[19.5px] mt-0.5">{role.description}</p>
              </div>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-white/20 shrink-0">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 font-['Inter:Regular',sans-serif] font-normal text-[12px] text-white/20">
        Star Auto Center · Cairo, Egypt · v1.0
      </p>
    </div>
  );
}

// ─── Shared: Status Badge ─────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Open: "bg-[#eff6ff] border-[#bedbff] text-[#1447e6]",
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

function Sidebar({ active, onNav, onSignOut }: { active: string; onNav: (id: string) => void; onSignOut: () => void }) {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-56 bg-[#060f1e] flex flex-col z-20 select-none">
      {/* Brand */}
      <div className="flex items-center gap-2.5 p-5 border-b border-white/10 shrink-0">
        <div className="flex items-center justify-center size-7 bg-white/10 rounded-[4px] shrink-0">
          <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[12px] text-white/90 leading-none">SA</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-white leading-[15px] truncate">Star Auto Center</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-white/40 tracking-[0.5px] uppercase">Engineer</span>
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
          <div className="flex items-center justify-center size-7 bg-white/15 rounded-full shrink-0">
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-white leading-none">KS</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-white/80 leading-[16px] truncate">Karim Samir</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-white/35 tracking-[0.5px] uppercase">Engineer</span>
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

function Header({ title, searchValue }: { title: string; searchValue?: string }) {
  return (
    <div className="fixed top-0 left-56 right-0 h-14 bg-white border-b border-[#e5e7eb] flex items-center gap-4 px-6 z-10">
      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828] shrink-0 pr-2">{title}</span>
      <div className="flex-1 max-w-[448px] relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#99a1af]">🔍</span>
        <input
          className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] pl-8 pr-4 py-[6px] text-[14px] font-['Inter:Regular',sans-serif] text-[#99a1af] outline-none"
          placeholder={searchValue ?? "Search vehicle, customer, job order…"}
          readOnly
        />
      </div>
      <div className="ml-auto flex items-center gap-3 shrink-0">
        <div className="relative size-8 flex items-center justify-center">
          <span className="text-[16px]">🔔</span>
          <div className="absolute top-1 right-1 size-2 bg-[#fb2c36] rounded-full border border-white" />
        </div>
        <div className="flex flex-col items-end">
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#101828]">Karim Samir</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#99a1af] capitalize">engineer</span>
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
  vehicles,
  onNewJobOrder,
  onSelectJo,
}: {
  jobOrders: any[];
  vehicles: any[];
  onNewJobOrder: () => void;
  onSelectJo?: (joNumber: string) => void;
}) {
  const openCount = jobOrders.filter((j) => j.status === "Open").length;
  const completedCount = jobOrders.filter((j) => j.status === "Completed").length;

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
            {new Date().toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "long", year: "numeric" })} · Star Auto Center
          </p>
        </div>
        <button
          onClick={onNewJobOrder}
          className="bg-white text-[#0f2340] font-['Inter:Medium',sans-serif] font-medium text-[14px] px-5 py-2.5 rounded-[8px] hover:bg-white/90 active:scale-95 transition-all shrink-0"
        >
          + New Job Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "TODAY'S JOBS", value: jobOrders.length.toString(), sub: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), icon: "◫", color: "text-[#101828]" },
          { label: "OPEN", value: openCount.toString(), sub: "Awaiting work", icon: "○", color: "text-[#101828]" },
          { label: "COMPLETED TODAY", value: completedCount.toString(), sub: "Ready for accounting", icon: "✓", color: "text-emerald-600" },
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
          {jobOrders.length === 0 ? (
            <div className="p-8 text-center text-[#99a1af] font-['Inter:Regular',sans-serif] text-[14px]">
              No job orders yet. Click "+ New Job Order" to create one.
            </div>
          ) : (
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
                    onClick={() => onSelectJo && onSelectJo(jo.number)}
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
                ))}
              </tbody>
            </table>
          )}
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
              <div className="p-5 text-center text-[#99a1af] font-['Inter:Regular',sans-serif] text-[12px]">
                No vehicles registered yet.
              </div>
            ) : (
              vehicles.slice(0, 5).map((v, i) => (
                <div key={v.id || i} className="px-5 py-3 border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors">
                  <div className="flex items-start justify-between">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{v.make} {v.model}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] shrink-0 ml-2">{v.lastVisit || ""}</p>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">
                    {v.plate} · {v.customerName || ""}
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
  onCreateJobOrder: (data: { requiredWork: string; completedWork: string; notes: string; km: string }) => void;
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
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-['Inter:Medium',sans-serif] font-medium text-[#4a5565] hover:bg-[#f3f4f6] rounded transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d={svgPaths.p14db7f80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              </svg>
              Print
            </button>
            <button
              onClick={onCancel}
              className="border border-[#d1d5dc] bg-white px-3 py-1.5 rounded text-[12px] font-['Inter:Medium',sans-serif] font-medium text-[#364153] hover:bg-[#f9fafb] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={ready ? () => onCreateJobOrder({ requiredWork, completedWork, notes, km }) : undefined}
              className={`flex items-center gap-1.5 bg-[#0f2340] px-3 py-1.5 rounded text-[12px] font-['Inter:Medium',sans-serif] font-medium text-white transition-all ${ready ? "hover:bg-[#1a3a5c] active:scale-[0.98]" : "opacity-50 cursor-not-allowed"}`}
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
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{ctx.engineer}</p>
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
          className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#4a5565] hover:text-[#364153] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={ready ? () => onCreateJobOrder({ requiredWork, completedWork, notes: notes + (notes2 ? "\n\n" + notes2 : ""), km }) : undefined}
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
            {filtered.map((v) => (
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
            ))}
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
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{item.note}</p>
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
            {filtered.map((c) => {
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
            })}
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
                const detail = joDetails[jo.number];
                return (
                  <tr
                    key={jo.number}
                    onClick={() => detail && onSelectJo(detail)}
                    className="border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-4 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] text-[#101828]">{jo.number}</td>
                    <td className="px-5 py-4 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153]">
                      {detail?.date ?? "—"}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{jo.vehicle}</p>
                      <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#99a1af]">{jo.plate}</p>
                    </td>
                    <td className="px-5 py-4 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282]">
                      {detail?.type ?? "—"}
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

// ─── Screen: Job Order Details ────────────────────────────────────────────────

function JobOrderDetailsScreen({
  joDetail,
  onBack,
  onViewCustomer,
}: {
  joDetail: JoDetail;
  onBack: () => void;
  onViewCustomer?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"summary" | "parts">("summary");

  const customerReq = joDetail.customerRequest || joDetail.requiredWork || joDetail.notes || "لا يوجد طلب مدون";
  const approvedList = joDetail.approvedItems || [];
  const deferredList = joDetail.deferredItems || [];

  return (
    <div className="ml-56 mt-14 min-h-screen bg-[#f3f4f6] p-6 pb-10">
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[#6a7282] hover:text-[#364153] mb-4 transition-colors"
      >
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px]">← Back</span>
      </button>

      {/* JO Header Row */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-[#0f2340] tracking-[0.3px]">
            {joDetail.number}
          </span>
          <StatusBadge status={joDetail.status} />
          <span className="bg-[#f9fafb] border border-[#e5e7eb] font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#4a5565] px-2.5 py-0.5 rounded">
            {joDetail.type || "Full Service"}
          </span>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">
          {joDetail.date}
        </p>
      </div>

      {/* Customer + Vehicle cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Customer */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">
            CUSTOMER
          </p>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828] mb-1">
            {joDetail.customerName || "Ahmed Mohamed"}
          </p>
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#6a7282] mb-3">
            {joDetail.customerPhone || "01012345678"}
          </p>
          <button
            onClick={onViewCustomer}
            className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#254e87] hover:underline"
          >
            View profile →
          </button>
        </div>

        {/* Vehicle */}
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">
            VEHICLE
          </p>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#101828] mb-1">
            {joDetail.vehicleName || "BMW 320i"}
          </p>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#4a5565] bg-[#f3f4f6] px-1.5 py-0.5 rounded tracking-[0.3px]">
              {joDetail.vehiclePlate || "ABC 123"}
            </span>
            <span className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">
              {joDetail.vehicleKm || "125,430 km"}
            </span>
          </div>
          <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] tracking-[0.25px] mb-3">
            {joDetail.vehicleVin || "WBABE9C57JA123456"}
          </p>
          <button className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#254e87] hover:underline">
            View profile →
          </button>
        </div>
      </div>

      {/* Job Team */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 mb-4">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-3">
          JOB TEAM
        </p>
        <div className="flex items-start gap-8">
          <div>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] mb-1">Engineer</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] text-[#101828]">
              {joDetail.engineer || "Karim Samir"}
            </p>
          </div>
          <div>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#99a1af] mb-1">Technicians</p>
            <div className="flex items-center gap-3">
              {joDetail.technicians && joDetail.technicians.length > 0 ? (
                joDetail.technicians.map((t) => (
                  <span key={t} className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] text-[#101828]">
                    {t}
                  </span>
                ))
              ) : (
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#99a1af] italic">
                  —
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Work Summary / Parts Card */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-[#e5e7eb] flex">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-5 py-3 font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors ${
              activeTab === "summary"
                ? "text-[#101828] border-b-2 border-[#101828]"
                : "text-[#6a7282] hover:text-[#101828]"
            }`}
          >
            Work Summary
          </button>
          <button
            onClick={() => setActiveTab("parts")}
            className={`px-5 py-3 font-['Inter:Regular',sans-serif] font-normal text-[14px] transition-colors ${
              activeTab === "parts"
                ? "text-[#101828] border-b-2 border-[#101828]"
                : "text-[#6a7282] hover:text-[#101828]"
            }`}
          >
            Parts
          </button>
        </div>

        {activeTab === "summary" && (
          <div className="p-5 space-y-6">
            {/* CUSTOMER REQUEST */}
            <div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-2">
                CUSTOMER REQUEST
              </p>
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 font-['Inter:Medium',sans-serif] text-[14px] text-[#1e293b]" dir="auto">
                {customerReq}
              </div>
            </div>

            {/* APPROVED WORK */}
            <div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#16a34a] tracking-[0.6px] uppercase mb-2">
                APPROVED WORK
              </p>
              {approvedList.length === 0 ? (
                <div className="border border-dashed border-[#cbd5e1] rounded-lg p-4 text-center font-['Inter:Regular',sans-serif] text-[13px] text-[#94a3b8]">
                  لم يتم إضافة أعمال معتمدة لهذه الزيارة بعد (في انتظار تحديد العميل).
                </div>
              ) : (
                <div className="space-y-2">
                  {approvedList.map((item: { item: string; note?: string }, i: number) => (
                    <div key={i} className="border border-[#e2e8f0] rounded-lg px-4 py-3 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#16a34a] shrink-0" />
                        <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#0f172a]">
                          {item.item}
                        </span>
                      </div>
                      {item.note && (
                        <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#64748b]">
                          {item.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DEFERRED WORK */}
            {deferredList.length > 0 && (
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#d97706] tracking-[0.6px] uppercase mb-2">
                  DEFERRED WORK
                </p>
                <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-3 space-y-2">
                  {deferredList.map((item: any, i: number) => (
                    <div key={i} className="bg-white border border-[#fde68a] rounded-lg px-4 py-3 flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#f59e0b] shrink-0" />
                      <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#0f172a]">
                        {typeof item === "string" ? item : (item as any).item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "parts" && (
          <div className="p-5">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#99a1af] tracking-[0.6px] uppercase mb-3">
              ISSUED PARTS
            </p>
            <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                    <th className="px-4 py-2.5 text-left font-['Inter:Semi_Bold',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-[0.6px]">Part Name</th>
                    <th className="px-4 py-2.5 text-left font-['Inter:Semi_Bold',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-[0.6px]">Part Number</th>
                    <th className="px-4 py-2.5 text-center font-['Inter:Semi_Bold',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-[0.6px]">Qty</th>
                    <th className="px-4 py-2.5 text-right font-['Inter:Semi_Bold',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-[0.6px]">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#f3f4f6]">
                    <td className="px-4 py-3 font-['Inter:Medium',sans-serif] text-[14px] text-[#101828]">Engine Oil 5W-30 (4L)</td>
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[12px] text-[#6a7282]">OIL-5W30-4L</td>
                    <td className="px-4 py-3 text-center font-['Inter:Medium',sans-serif] text-[14px] text-[#101828]">1</td>
                    <td className="px-4 py-3 text-right font-['JetBrains_Mono:Medium',sans-serif] text-[14px] text-[#101828]">1,200 EGP</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-['Inter:Medium',sans-serif] text-[14px] text-[#101828]">Oil Filter Original</td>
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] text-[12px] text-[#6a7282]">FLT-BMW-320</td>
                    <td className="px-4 py-3 text-center font-['Inter:Medium',sans-serif] text-[14px] text-[#101828]">1</td>
                    <td className="px-4 py-3 text-right font-['JetBrains_Mono:Medium',sans-serif] text-[14px] text-[#101828]">450 EGP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-[#e5e7eb] px-5 py-4 flex items-center gap-3">
          <button className="bg-white border border-[#d1d5dc] text-[#101828] font-['Inter:Medium',sans-serif] font-medium text-[14px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors">
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
              const detail: JoDetail = joDetails[jo.number] || {
                number: jo.number,
                date: jo.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                status: jo.status || "Open",
                type: "Full Service",
                customerId: jo.customerId?.toString() || "1",
                customerName: jo.customerName || jo.customer || "",
                customerPhone: jo.customerPhone || jo.phone || "",
                vehicleId: jo.vehicleId?.toString() || "v1",
                vehicleName: jo.vehicleName || jo.vehicle || "",
                vehiclePlate: jo.vehiclePlate || jo.plate || "",
                vehicleKm: jo.km || "0 km",
                vehicleVin: jo.vin || "",
                engineer: jo.engineer || "Karim Samir",
                technicians: [],
                deferredItems: [],
                recommendedItems: [],
              };
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
];

function WarehouseSidebar({ active, onNav, onSignOut }: { active: string; onNav: (id: string) => void; onSignOut: () => void }) {
  return (
    <div className="fixed left-0 top-0 h-full w-[168px] bg-[#060f1e] flex flex-col z-20 select-none">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <div className="w-7 h-7 rounded-[4px] bg-white/10 flex items-center justify-center shrink-0">
          <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[12px] text-white/90">SA</span>
        </div>
        <div className="min-w-0">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-white leading-[15px] truncate">Star Auto Center</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-white/40 tracking-[0.5px] uppercase leading-[15px]">Warehouse</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 py-2">
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
      <div className="px-5 py-5 border-t border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[10px] text-white">HN</span>
          </div>
          <div className="min-w-0">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-white truncate leading-[16px]">Hassan Nour</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-white/40 tracking-[0.5px] uppercase leading-[14px]">Warehouse</p>
          </div>
        </div>
        <button onClick={onSignOut} className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-white/40 hover:text-white/70 transition-colors">
          → Sign out
        </button>
      </div>
    </div>
  );
}

// ─── Warehouse: Header ────────────────────────────────────────────────────────

function WarehouseHeader({ title }: { title: string }) {
  return (
    <div className="fixed left-[168px] right-0 top-0 h-[56px] bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6 z-10">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#111827] leading-[28px]">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="text-[20px] text-[#6a7282]">🔔</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-bold text-white">1</span>
        </div>
        <div className="text-right">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#111827] leading-[16px]">Hassan Nour</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#6a7282] tracking-[0.5px] uppercase leading-[14px]">Warehouse</p>
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

  const partsIssuedTodayCount = movements
    .filter((m) => m.type === "Issue")
    .reduce((sum, m) => sum + Math.abs(m.qty), 0);

  const stockInRecentCount = movements
    .filter((m) => m.type === "Stock In")
    .reduce((sum, m) => sum + m.qty, 0);

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "LOW STOCK", value: lowStock.length.toString(), sub: "Below minimum", valueColor: "#bb4d00", icon: "⚠" },
            { label: "OUT OF STOCK", value: outOfStock.length.toString(), sub: "Immediate action", valueColor: "#e7000b", icon: "!" },
            { label: "PARTS ISSUED TODAY", value: partsIssuedTodayCount.toString(), sub: "Items out", valueColor: "#0f2340", icon: "↑" },
            { label: "STOCK IN (RECENT)", value: stockInRecentCount.toString(), sub: "Items received", valueColor: "#008236", icon: "↓" },
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
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  const filtered = jobs
    .filter((j) => {
      const q = search.toLowerCase();
      return (
        !q ||
        j.number.toLowerCase().includes(q) ||
        j.vehicle.toLowerCase().includes(q) ||
        j.plate.toLowerCase().includes(q) ||
        j.customer.toLowerCase().includes(q)
      );
    })
    .sort((a, b) =>
      sortDir === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    );

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 max-w-[400px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job #, plate, vehicle..."
              className="w-full h-10 px-4 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none focus:border-[#0f2340] transition-colors"
            />
          </div>
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
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#6a7282] ml-1">{filtered.length} open jobs</p>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Job Order</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Date ↕</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Vehicle</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Plate</th>
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
  onBack,
  onAddPart,
  onRemovePart,
  onConfirm,
  confirmed,
}: {
  job: WJob;
  issuedParts: WIssuedPart[];
  parts: WPart[];
  onBack: () => void;
  onAddPart: () => void;
  onRemovePart: (partId: string) => void;
  onConfirm: () => void;
  confirmed: boolean;
}) {
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
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase mb-1">Job Order</p>
              <p className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">{job.number}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">{job.date} · {job.serviceType}</p>
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

        {/* Parts table */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden mb-5">
          <div className="px-5 py-4 flex items-center justify-between border-b border-[#f3f4f6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#1e2939] tracking-[0.7px] uppercase">Parts Issued to This Job</p>
            {!confirmed && (
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
                {!confirmed && <th className="px-4 py-3 w-10" />}
              </tr>
            </thead>
            <tbody>
              {issuedParts.map((p) => (
                <tr key={p.partId} className="border-b border-[#f9fafb] last:border-0">
                  <td className="px-4 py-3 font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{p.partName}</td>
                  <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{p.partNumber}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-block w-10 h-8 border border-[#e5e7eb] rounded text-center font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] leading-8">{p.qty}</span>
                  </td>
                  {!confirmed && (
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => onRemovePart(p.partId)} className="text-[#99a1af] hover:text-[#e7000b] transition-colors text-[16px]">×</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer actions */}
        {!confirmed ? (
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
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <span className="text-white text-[14px]">✓</span>
              </div>
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#111827]">Stock Updated Successfully</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#008236] mt-0.5">{totalQty} items issued to {job.number}. Inventory updated.</p>
              </div>
            </div>
            <button className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#364153] border border-[#d1d5dc] rounded px-4 py-2 hover:bg-[#f9fafb] transition-colors">
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
}: {
  part: WPart;
  movements: WMovement[];
  onBack: () => void;
}) {
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

          {/* Part Number + OEM Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Part Number</label>
              <input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="TB-BMW-320-001" className={`${inputCls} mt-1`} />
            </div>
            <div>
              <label className={labelCls}>OEM Number</label>
              <input value={oem} onChange={(e) => setOem(e.target.value)} placeholder="123456789" className={`${inputCls} mt-1`} />
            </div>
          </div>

          {/* Brand + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Brand</label>
              <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Garrett" className={`${inputCls} mt-1`} />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Filters, Brakes, Oils..." className={`${inputCls} mt-1`} />
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

          {/* Purchase Price + Selling Price (Owner only) */}
          {isOwner && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Purchase Price (EGP)</label>
                <input type="number" min="0" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="0.00" className={`${inputCls} mt-1`} />
              </div>
              <div>
                <label className={labelCls}>Selling Price (EGP)</label>
                <input type="number" min="0" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="0.00" className={`${inputCls} mt-1`} />
              </div>
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
      { id: "owner-invoices", symbol: "◧", label: "Invoices" },
      { id: "owner-payments", symbol: "◨", label: "Payments" },
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

function OwnerSidebar({ active, onNav, onSignOut }: { active: string; onNav: (id: string) => void; onSignOut: () => void }) {
  return (
    <div className="fixed left-0 top-0 h-full w-[168px] bg-[#060f1e] flex flex-col z-20 select-none overflow-y-auto">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10 shrink-0">
        <div className="w-7 h-7 rounded-[4px] bg-white/10 flex items-center justify-center shrink-0">
          <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[12px] text-white/90">SA</span>
        </div>
        <div className="min-w-0">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-white leading-[15px] truncate">Star Auto Center</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-white/40 tracking-[0.5px] uppercase leading-[15px]">Owner</p>
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

      <div className="px-5 py-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[10px] text-white">OW</span>
          </div>
          <div className="min-w-0">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-white leading-[14px] truncate">Owner</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[9px] text-white/40 leading-[12px] uppercase tracking-[0.5px]">Owner</p>
          </div>
        </div>
        <button onClick={onSignOut} className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-white/40 hover:text-white/70 transition-colors">→ Sign out</button>
      </div>
    </div>
  );
}

// ─── Owner: Dashboard ─────────────────────────────────────────────────────────

function OwnerDashboardScreen({
  jobOrders,
  parts,
  onViewJobs,
  onViewParts,
}: {
  jobOrders: { number: string; customer: string; vehicle: string; plate: string; status: string }[];
  parts: WPart[];
  onViewJobs: () => void;
  onViewParts: () => void;
}) {
  const today = "12 Aug 2026";
  const todayJobs = jobOrders.filter((j) => j.status !== "Closed" && j.status !== "Cancelled");
  const openJobs = jobOrders.filter((j) => j.status === "Open");
  const completedJobs = jobOrders.filter((j) => j.status === "Completed");
  const closedJobs = jobOrders.filter((j) => j.status === "Closed");
  const outOfStock = parts.filter((p) => p.status === "Out of Stock");
  const lowStock = parts.filter((p) => p.status === "Low Stock");

  const kpis = [
    { label: "TODAY'S JOBS", value: todayJobs.length.toString(), sub: today, color: "#0f2340", onClick: onViewJobs },
    { label: "OPEN", value: openJobs.length.toString(), sub: "Awaiting work", color: "#0f2340", onClick: onViewJobs },
    { label: "COMPLETED", value: completedJobs.length.toString(), sub: "Done", color: "#008236", onClick: onViewJobs },
    { label: "CLOSED", value: closedJobs.length.toString(), sub: "Finalized", color: "#6a7282", onClick: onViewJobs },
    { label: "STOCK ALERTS", value: (outOfStock.length + lowStock.length).toString(), sub: `${outOfStock.length} out, ${lowStock.length} low`, color: "#e7000b", onClick: onViewParts },
  ];

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* KPIs */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {kpis.map((k) => (
            <button key={k.label} onClick={k.onClick} className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 text-left hover:border-[#0f2340] hover:shadow-sm transition-all">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">{k.label}</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[26px] mt-1" style={{ color: k.color }}>{k.value}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mt-0.5">{k.sub}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Job Orders table */}
          <div className="col-span-2 bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6] flex items-center justify-between">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] text-[#101828] tracking-[0.6px] uppercase">Recent Job Orders</p>
              <button onClick={onViewJobs} className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#1447e6] hover:underline">View All</button>
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
                {jobOrders.slice(0, 8).map((jo) => (
                  <tr key={jo.number} className="border-b border-[#f3f4f6] last:border-0">
                    <td className="px-4 py-3 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#0f2340]">{jo.number}</td>
                    <td className="px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{jo.customer}</td>
                    <td className="px-4 py-3">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{jo.vehicle}</p>
                      <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">{jo.plate}</p>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={jo.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stock alerts */}
          <div className="space-y-4">
            {outOfStock.length > 0 && (
              <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
                <div className="bg-[#fef2f2] border-b border-[#ffe2e2] px-4 py-3 flex items-center justify-between">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#1e2939] tracking-[0.6px] uppercase">Out of Stock</p>
                  <button onClick={onViewParts} className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#1447e6] hover:underline">View</button>
                </div>
                {outOfStock.map((p) => (
                  <div key={p.id} className="px-4 py-2.5 border-b border-[#f9fafb] last:border-0 flex items-center justify-between">
                    <div>
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#101828]">{p.name}</p>
                      <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#6a7282]">{p.number}</p>
                    </div>
                    <span className="font-['Inter:Bold',sans-serif] font-bold text-[13px] text-[#e7000b]">0</span>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
              <div className="border-b border-[#f3f4f6] px-4 py-3 flex items-center justify-between">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#1e2939] tracking-[0.6px] uppercase">Low Stock</p>
                <button onClick={onViewParts} className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#1447e6] hover:underline">View All</button>
              </div>
              {lowStock.slice(0, 5).map((p) => (
                <div key={p.id} className="px-4 py-2.5 border-b border-[#f9fafb] last:border-0 flex items-center justify-between">
                  <div>
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] text-[#101828]">{p.name}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#6a7282]">Min: {p.minQty}</p>
                  </div>
                  <span className="font-['Inter:Bold',sans-serif] font-bold text-[13px] text-[#e17100]">{p.currentQty}</span>
                </div>
              ))}
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

// ─── Owner: Invoices & Payments ───────────────────────────────────────────────

interface OInvoice {
  id: string;
  number: string;
  jobOrderNumber: string;
  customerName: string;
  customerPhone: string;
  vehicleName: string;
  vehiclePlate: string;
  issueDate: string;
  dueDate: string;
  laborAmount: number;
  partsAmount: number;
  taxAmount: number;
  totalAmount: number;
  status: "Paid" | "Partial" | "Unpaid";
}

const SEED_INVOICES: OInvoice[] = [
  {
    id: "inv-1",
    number: "INV-2026-00001",
    jobOrderNumber: "JO-2026-00001",
    customerName: "Ahmed Mohamed",
    customerPhone: "01012345678",
    vehicleName: "Toyota Corolla",
    vehiclePlate: "أ ب ج 1234",
    issueDate: "10 Sept 2026",
    dueDate: "17 Sept 2026",
    laborAmount: 700,
    partsAmount: 2300,
    taxAmount: 0,
    totalAmount: 3000,
    status: "Paid",
  },
  {
    id: "inv-2",
    number: "INV-2026-00002",
    jobOrderNumber: "JO-2026-00002",
    customerName: "Mahmoud Ali",
    customerPhone: "01098765432",
    vehicleName: "Hyundai Elantra",
    vehiclePlate: "س ص ع 5678",
    issueDate: "10 Sept 2026",
    dueDate: "17 Sept 2026",
    laborAmount: 500,
    partsAmount: 1300,
    taxAmount: 0,
    totalAmount: 1800,
    status: "Unpaid",
  },
  {
    id: "inv-3",
    number: "INV-2026-00003",
    jobOrderNumber: "JO-2026-00003",
    customerName: "Sarah Ahmed",
    customerPhone: "01156789012",
    vehicleName: "Nissan Sunny",
    vehiclePlate: "م ن هـ 9012",
    issueDate: "09 Sept 2026",
    dueDate: "16 Sept 2026",
    laborAmount: 1200,
    partsAmount: 3000,
    taxAmount: 0,
    totalAmount: 4200,
    status: "Partial",
  },
];

function OwnerInvoicesScreen({
  invoices,
  onMarkPaid,
}: {
  invoices: OInvoice[];
  onMarkPaid: (invId: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState<OInvoice | null>(null);

  const totalInvoiced = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalPaid =
    invoices
      .filter((i) => i.status === "Paid")
      .reduce((acc, i) => acc + i.totalAmount, 0) +
    invoices.filter((i) => i.status === "Partial").reduce((acc, i) => acc + Math.round(i.totalAmount / 2), 0);
  const totalOutstanding = totalInvoiced - totalPaid;

  const filtered = invoices.filter((inv) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      inv.number.toLowerCase().includes(q) ||
      inv.jobOrderNumber.toLowerCase().includes(q) ||
      inv.customerName.toLowerCase().includes(q) ||
      inv.vehiclePlate.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* Financial KPI Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 text-left">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Total Invoiced</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[26px] mt-1 text-[#0f2340]">{totalInvoiced.toLocaleString()} EGP</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mt-0.5">{invoices.length} Invoices generated</p>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 text-left">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Paid Amount</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[26px] mt-1 text-[#008236]">{totalPaid.toLocaleString()} EGP</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mt-0.5">Collected in full / partial</p>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 text-left">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Outstanding Balance</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[26px] mt-1 text-[#e7000b]">{totalOutstanding.toLocaleString()} EGP</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mt-0.5">Pending collection</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by invoice #, JO #, customer, plate..."
            className="flex-1 max-w-[380px] h-10 px-4 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none focus:border-[#0f2340] transition-colors"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153] outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Invoice #</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Job Order</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Customer</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Vehicle</th>
                <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Total Amount</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Date</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Status</th>
                <th className="text-right px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb]">
                  <td className="px-4 py-3.5 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] text-[#0f2340]">{inv.number}</td>
                  <td className="px-4 py-3.5 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{inv.jobOrderNumber}</td>
                  <td className="px-4 py-3.5">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{inv.customerName}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#6a7282]">{inv.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{inv.vehicleName}</p>
                    <p className="font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">{inv.vehiclePlate}</p>
                  </td>
                  <td className="px-4 py-3.5 text-right font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#101828]">{inv.totalAmount.toLocaleString()} EGP</td>
                  <td className="px-4 py-3.5 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{inv.issueDate}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] ${
                      inv.status === "Paid" ? "bg-[#dcfce7] text-[#15803d]" :
                      inv.status === "Partial" ? "bg-[#fef9c3] text-[#a16207]" :
                      "bg-[#fef2f2] text-[#b91c1c]"
                    }`}>{inv.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1 bg-white border border-[#d1d5dc] text-[#364153] rounded font-['Inter:Medium',sans-serif] font-medium text-[12px] hover:bg-[#f9fafb] transition-colors"
                    >
                      View & Print
                    </button>
                    {inv.status !== "Paid" && (
                      <button
                        onClick={() => onMarkPaid(inv.id)}
                        className="px-3 py-1 bg-[#008236] text-white rounded font-['Inter:Medium',sans-serif] font-medium text-[12px] hover:bg-[#006e2e] transition-colors"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail / Print Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-[640px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6] bg-[#0f2340] text-white">
              <div>
                <h2 className="font-['Inter:Bold',sans-serif] font-bold text-[18px]">Invoice {selectedInvoice.number}</h2>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-white/70">Job Order: {selectedInvoice.jobOrderNumber}</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-white/80 hover:text-white text-[24px] leading-none">×</button>
            </div>
            <div className="px-6 py-5 overflow-y-auto space-y-6">
              <div className="flex justify-between border-b border-[#f3f4f6] pb-4">
                <div>
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[16px] text-[#0f2340]">Star Auto Center</h3>
                  <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">123 Industrial Zone, Cairo, Egypt</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">+20 2 1234 5678</p>
                </div>
                <div className="text-right">
                  <p className="font-['Inter:Medium',sans-serif] text-[12px] text-[#6a7282]">DATE: <span className="text-[#101828] font-bold">{selectedInvoice.issueDate}</span></p>
                  <p className="font-['Inter:Medium',sans-serif] text-[12px] text-[#6a7282]">DUE: <span className="text-[#101828] font-bold">{selectedInvoice.dueDate}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#f9fafb] p-4 rounded-lg">
                <div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-[0.6px]">Billed To</p>
                  <p className="font-['Inter:Bold',sans-serif] text-[14px] text-[#101828] mt-1">{selectedInvoice.customerName}</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[12px] text-[#6a7282]">{selectedInvoice.customerPhone}</p>
                </div>
                <div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] text-[11px] text-[#6a7282] uppercase tracking-[0.6px]">Vehicle Details</p>
                  <p className="font-['Inter:Bold',sans-serif] text-[14px] text-[#101828] mt-1">{selectedInvoice.vehicleName}</p>
                  <p className="font-['JetBrains_Mono:Regular',sans-serif] text-[12px] text-[#6a7282]">{selectedInvoice.vehiclePlate}</p>
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e5e7eb] text-left">
                    <th className="py-2 text-[11px] font-semibold text-[#6a7282] uppercase">Description</th>
                    <th className="py-2 text-right text-[11px] font-semibold text-[#6a7282] uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6]">
                  <tr>
                    <td className="py-3 text-[14px] text-[#101828]">Labor & Service Work</td>
                    <td className="py-3 text-right text-[14px] font-medium text-[#101828]">{selectedInvoice.laborAmount.toLocaleString()} EGP</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-[14px] text-[#101828]">Issued Parts & Materials</td>
                    <td className="py-3 text-right text-[14px] font-medium text-[#101828]">{selectedInvoice.partsAmount.toLocaleString()} EGP</td>
                  </tr>
                </tbody>
              </table>

              <div className="border-t border-[#e5e7eb] pt-4 text-right space-y-1">
                <p className="text-[13px] text-[#6a7282]">Subtotal: <span className="font-bold text-[#101828]">{(selectedInvoice.laborAmount + selectedInvoice.partsAmount).toLocaleString()} EGP</span></p>
                <p className="text-[13px] text-[#6a7282]">Tax (0%): <span className="font-bold text-[#101828]">0 EGP</span></p>
                <p className="text-[18px] font-bold text-[#0f2340] pt-2">Total: {selectedInvoice.totalAmount.toLocaleString()} EGP</p>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#0f2340] text-white rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] hover:bg-[#1a3560] transition-colors"
              >
                🖨 Print Invoice
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-2.5 border border-[#e5e7eb] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface OPayment {
  id: string;
  date: string;
  invoiceNumber: string;
  jobOrderNumber: string;
  customerName: string;
  method: "Cash" | "Visa / Card" | "Bank Transfer";
  amount: number;
  reference: string;
  receivedBy: string;
}

const SEED_PAYMENTS: OPayment[] = [
  {
    id: "PAY-1001",
    date: "10 Sept 2026, 14:30",
    invoiceNumber: "INV-2026-00001",
    jobOrderNumber: "JO-2026-00001",
    customerName: "Ahmed Mohamed",
    method: "Cash",
    amount: 3000,
    reference: "CASH-REC-01",
    receivedBy: "Hassan Nour",
  },
  {
    id: "PAY-1002",
    date: "09 Sept 2026, 16:15",
    invoiceNumber: "INV-2026-00003",
    jobOrderNumber: "JO-2026-00003",
    customerName: "Sarah Ahmed",
    method: "Visa / Card",
    amount: 2000,
    reference: "VISA-992182",
    receivedBy: "Sara Hassan",
  },
];

function OwnerPaymentsScreen({
  payments,
  onRecordPayment,
}: {
  payments: OPayment[];
  onRecordPayment: (p: OPayment) => void;
}) {
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);

  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);
  const totalCash = payments.filter((p) => p.method === "Cash").reduce((acc, p) => acc + p.amount, 0);
  const totalCard = payments.filter((p) => p.method === "Visa / Card").reduce((acc, p) => acc + p.amount, 0);
  const totalTransfer = payments.filter((p) => p.method === "Bank Transfer").reduce((acc, p) => acc + p.amount, 0);

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.id.toLowerCase().includes(q) ||
      p.invoiceNumber.toLowerCase().includes(q) ||
      p.jobOrderNumber.toLowerCase().includes(q) ||
      p.customerName.toLowerCase().includes(q);
    const matchMethod = methodFilter === "All" || p.method === methodFilter;
    return matchSearch && matchMethod;
  });

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 text-left">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Total Receipts</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] mt-1 text-[#008236]">{totalCollected.toLocaleString()} EGP</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mt-0.5">{payments.length} Transactions</p>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 text-left">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Cash Payments</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] mt-1 text-[#0f2340]">{totalCash.toLocaleString()} EGP</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mt-0.5">Cash register</p>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 text-left">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Visa / Card</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] mt-1 text-[#1447e6]">{totalCard.toLocaleString()} EGP</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mt-0.5">POS terminal</p>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 text-left">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Bank Transfer</p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[24px] mt-1 text-[#475569]">{totalTransfer.toLocaleString()} EGP</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af] mt-0.5">Direct transfers</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transaction ID, invoice #, customer..."
            className="flex-1 max-w-[380px] h-10 px-4 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] placeholder-[#99a1af] outline-none"
          />
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="h-10 px-3 bg-white border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#364153] outline-none cursor-pointer"
          >
            <option value="All">All Methods</option>
            <option value="Cash">Cash</option>
            <option value="Visa / Card">Visa / Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          <div className="flex-1" />
          <button
            onClick={() => setShowAdd(true)}
            className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] px-5 py-2 rounded-lg hover:bg-[#1a3560] transition-colors h-10 whitespace-nowrap"
          >
            + Record Payment
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#f3f4f6]">
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Receipt #</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Date & Time</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Customer</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Invoice #</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Method</th>
                <th className="text-right px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Amount</th>
                <th className="text-left px-4 py-3 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase">Received By</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb]">
                  <td className="px-4 py-3.5 font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[13px] text-[#0f2340]">{p.id}</td>
                  <td className="px-4 py-3.5 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#364153]">{p.date}</td>
                  <td className="px-4 py-3.5 font-['Inter:Medium',sans-serif] font-medium text-[13px] text-[#101828]">{p.customerName}</td>
                  <td className="px-4 py-3.5 font-['JetBrains_Mono:Regular',sans-serif] font-normal text-[12px] text-[#364153]">{p.invoiceNumber}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] ${
                      p.method === "Cash" ? "bg-[#f0fdf4] text-[#166534]" :
                      p.method === "Visa / Card" ? "bg-[#eff6ff] text-[#1d4ed8]" :
                      "bg-[#f8fafc] text-[#475569]"
                    }`}>{p.method}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-['Inter:Bold',sans-serif] font-bold text-[14px] text-[#008236]">+{p.amount.toLocaleString()} EGP</td>
                  <td className="px-4 py-3.5 font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#6a7282]">{p.receivedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddPaymentModal
          onClose={() => setShowAdd(false)}
          onSave={(p) => {
            onRecordPayment(p);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}

function AddPaymentModal({ onClose, onSave }: { onClose: () => void; onSave: (p: OPayment) => void }) {
  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-00002");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<OPayment["method"]>("Cash");
  const [reference, setReference] = useState("");

  function handleSave() {
    if (!customerName.trim() || !amount) return;
    const now = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    onSave({
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      date: now,
      invoiceNumber: invoiceNumber.trim(),
      jobOrderNumber: invoiceNumber.replace("INV", "JO"),
      customerName: customerName.trim(),
      method,
      amount: parseFloat(amount) || 0,
      reference: reference.trim() || "N/A",
      receivedBy: "Owner / Cashier",
    });
  }

  const labelCls = "font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase";
  const inputCls = "w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[480px] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6]">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#111827]">Record Payment</h2>
          <button onClick={onClose} className="text-[#6a7282] hover:text-[#111827] text-[22px] leading-none">×</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className={labelCls}>Customer Name <span className="text-red-500">*</span></label>
            <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Mahmoud Ali" className={`${inputCls} mt-1`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Invoice #</label>
              <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} placeholder="INV-2026-XXXXX" className={`${inputCls} mt-1`} />
            </div>
            <div>
              <label className={labelCls}>Amount (EGP) <span className="text-red-500">*</span></label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1800" className={`${inputCls} mt-1`} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Payment Method</label>
              <select value={method} onChange={(e) => setMethod(e.target.value as OPayment["method"])} className={`${inputCls} mt-1`}>
                <option>Cash</option>
                <option>Visa / Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Reference / Trx #</label>
              <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="CASH-001 or VISA-123" className={`${inputCls} mt-1`} />
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-[#e5e7eb]">
          <button
            onClick={handleSave}
            disabled={!customerName.trim() || !amount}
            className={`flex-1 py-2.5 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors ${customerName.trim() && amount ? "bg-[#008236] text-white hover:bg-[#006e2e]" : "bg-[#d1d5dc] text-[#6a7282] cursor-not-allowed"}`}
          >
            Record Payment
          </button>
          <button onClick={onClose} className="px-5 py-2.5 border border-[#e5e7eb] rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#364153] hover:bg-[#f9fafb] transition-colors">
            Cancel
          </button>
        </div>
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

const SEED_USERS: OUser[] = [
  { id: "u1", name: "Ahmed Khalil", phone: "01012345678", email: "ahmed@starauto.com", role: "Engineer", status: "Active", lastActivity: "12 Aug 2026, 09:15", created: "01 Jan 2026" },
  { id: "u2", name: "Hassan Nour", phone: "01098765432", email: "hassan@starauto.com", role: "Warehouse", status: "Active", lastActivity: "12 Aug 2026, 08:40", created: "15 Feb 2026" },
  { id: "u3", name: "Sara Hassan", phone: "01156789012", email: "sara@starauto.com", role: "Accountant", status: "Active", lastActivity: "11 Aug 2026, 17:00", created: "01 Mar 2026" },
  { id: "u4", name: "Mohamed Aly", phone: "01234567890", email: "mohamed@starauto.com", role: "Technician", status: "Disabled", lastActivity: "20 Jul 2026, 14:30", created: "10 Apr 2026" },
];

function OwnerUsersScreen() {
  const [users, setUsers] = useState<OUser[]>(() => {
    try {
      const saved = localStorage.getItem("sac_oUsers");
      return saved ? JSON.parse(saved) : SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_oUsers", JSON.stringify(users));
    } catch {}
  }, [users]);

  useEffect(() => {
    api.getUsers()
      .then((res) => {
        if (res && Array.isArray(res) && res.length > 0) {
          setUsers(res.map((u: any) => ({
            id: u.id || u.Id || `u-${Date.now()}`,
            name: u.name || u.Name || "",
            phone: u.phone || u.Phone || "",
            email: u.email || u.Email || "",
            role: u.role || u.Role || "Engineer",
            status: u.status || u.Status || "Active",
            lastActivity: u.lastActivity || u.LastActivity || "—",
            created: u.created || u.Created || "Today",
          })));
        }
      })
      .catch(() => null);
  }, []);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q);
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  function toggleStatus(id: string) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" } : u));
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
            <option>Technician</option>
            <option>Warehouse</option>
            <option>Accountant</option>
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
                <th className="px-4 py-3" />
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
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`font-['Inter:Medium',sans-serif] font-medium text-[12px] px-3 py-1.5 rounded border transition-colors ${u.status === "Active" ? "border-[#d1d5dc] text-[#6a7282] hover:bg-[#f9fafb]" : "border-[#0f2340] text-[#0f2340] hover:bg-[#f0f4ff]"}`}
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
          onSave={(u) => { setUsers((prev) => [...prev, u]); setShowAdd(false); }}
        />
      )}
    </div>
  );
}

function AddUserModal({ onClose, onSave }: { onClose: () => void; onSave: (u: OUser) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<OUser["role"]>("Engineer");

  function handleSave() {
    if (!name.trim()) return;
    const now = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    onSave({ id: `u-${Date.now()}`, name: name.trim(), phone: phone.trim(), email: email.trim(), role, status: "Active", lastActivity: "—", created: now });
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
              <label className={labelCls}>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@starauto.com" className={`${inputCls} mt-1`} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as OUser["role"])} className={`${inputCls} mt-1`}>
              <option>Engineer</option>
              <option>Technician</option>
              <option>Warehouse</option>
              <option>Accountant</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-[#e5e7eb]">
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className={`flex-1 py-2.5 rounded-lg font-['Inter:Medium',sans-serif] font-medium text-[14px] transition-colors ${name.trim() ? "bg-[#0f2340] text-white hover:bg-[#1a3560]" : "bg-[#d1d5dc] text-[#6a7282] cursor-not-allowed"}`}
          >
            Add User
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

function OwnerSettingsScreen() {
  const [companyName, setCompanyName] = useState(() => localStorage.getItem("sac_companyName") || "Star Auto Center");
  const [address, setAddress] = useState(() => localStorage.getItem("sac_address") || "123 Industrial Zone, Cairo, Egypt");
  const [phone, setPhone] = useState(() => localStorage.getItem("sac_phone") || "+20 2 1234 5678");
  const [email, setEmail] = useState(() => localStorage.getItem("sac_email") || "info@starauto.com");
  const [currency, setCurrency] = useState(() => localStorage.getItem("sac_currency") || "EGP");
  const [saved, setSaved] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(() => localStorage.getItem("sac_logoUrl"));

  useEffect(() => {
    api.getSettings()
      .then((res) => {
        if (res) {
          if (res.companyName) setCompanyName(res.companyName);
          if (res.address) setAddress(res.address);
          if (res.phone) setPhone(res.phone);
          if (res.email) setEmail(res.email);
          if (res.currency) setCurrency(res.currency);
          if (res.logoUrl) setLogoUrl(res.logoUrl);
        }
      })
      .catch(() => null);
  }, []);

  async function handleSaveChanges() {
    try {
      localStorage.setItem("sac_companyName", companyName);
      localStorage.setItem("sac_address", address);
      localStorage.setItem("sac_phone", phone);
      localStorage.setItem("sac_email", email);
      localStorage.setItem("sac_currency", currency);
      if (logoUrl) localStorage.setItem("sac_logoUrl", logoUrl);
      else localStorage.removeItem("sac_logoUrl");

      await api.updateSettings({ companyName, address, phone, email, currency, logoUrl }).catch(() => null);
      setSaved(true);
    } catch {
      setSaved(true);
    }
  }

  const labelCls = "font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] text-[#6a7282] tracking-[0.6px] uppercase";
  const inputCls = "w-full h-10 px-3 border border-[#e5e7eb] rounded-lg font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#111827] outline-none focus:border-[#0f2340] transition-colors";

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLogoUrl(url);
    setSaved(false);
  }

  return (
    <div className="absolute left-[168px] right-0 top-[56px] bottom-0 overflow-y-auto bg-[#f3f4f6]">
      <div className="p-6 max-w-[720px]">
        {/* Business Information */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden mb-4">
          <div className="px-5 py-4 border-b border-[#f3f4f6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">Business Information</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">Workshop details displayed on printed documents and throughout the system.</p>
          </div>
          <div className="px-5 py-5 space-y-4">
            {/* Logo Upload */}
            <div>
              <label className={labelCls}>Workshop Logo</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="w-16 h-16 rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-center overflow-hidden shrink-0">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold text-[18px] text-[#6a7282]">SA</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer bg-white border border-[#d1d5dc] text-[#364153] font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors inline-block">
                    {logoUrl ? "Replace Logo" : "Upload Logo"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </label>
                  {logoUrl && (
                    <button onClick={() => { setLogoUrl(null); setSaved(false); }} className="text-[12px] text-[#e7000b] hover:underline text-left font-['Inter:Regular',sans-serif]">Remove logo</button>
                  )}
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-[#99a1af]">PNG, JPG or SVG. Max 2MB.<br />Recommended: 200×200 px.</p>
              </div>
            </div>

            <div>
              <label className={labelCls}>Company / Workshop Name</label>
              <input value={companyName} onChange={(e) => { setCompanyName(e.target.value); setSaved(false); }} className={`${inputCls} mt-1`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Phone Number</label>
                <input value={phone} onChange={(e) => { setPhone(e.target.value); setSaved(false); }} className={`${inputCls} mt-1`} />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input value={email} onChange={(e) => { setEmail(e.target.value); setSaved(false); }} className={`${inputCls} mt-1`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Address</label>
              <input value={address} onChange={(e) => { setAddress(e.target.value); setSaved(false); }} className={`${inputCls} mt-1`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Currency</label>
                <select value={currency} onChange={(e) => { setCurrency(e.target.value); setSaved(false); }} className={`${inputCls} mt-1`}>
                  <option>EGP</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>SAR</option>
                  <option>AED</option>
                </select>
              </div>
            </div>
            <div className="pt-1">
              <button
                onClick={handleSaveChanges}
                className="bg-[#0f2340] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] px-5 py-2 rounded-lg hover:bg-[#1a3560] transition-colors"
              >
                {saved ? "✓ Saved" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        {/* Print Settings */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f3f4f6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] text-[#101828]">Print Settings</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282] mt-0.5">Configure print templates for Job Orders, Invoices, and other documents.</p>
          </div>
          <div className="px-5 py-5 space-y-4">
            {[
              { label: "Job Order Print Template", desc: "Template used when printing Job Orders" },
              { label: "Invoice Print Template", desc: "Template used for customer invoices" },
            ].map((t) => (
              <div key={t.label} className="flex items-center justify-between py-3 border-b border-[#f3f4f6] last:border-0">
                <div>
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-[#101828]">{t.label}</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#6a7282]">{t.desc}</p>
                </div>
                <button className="bg-white border border-[#d1d5dc] text-[#364153] font-['Inter:Medium',sans-serif] font-medium text-[13px] px-4 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors">
                  Upload Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("role-selection");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [ctx, setCtx] = useState<FlowCtx>(FRESH_CTX);

  // Mutable customer/vehicle lists that can grow during the session
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem("sac_customers");
      return saved ? JSON.parse(saved) : SEED_CUSTOMERS;
    } catch {
      return SEED_CUSTOMERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_customers", JSON.stringify(customers));
    } catch {}
  }, [customers]);

  const [vehicleMap, setVehicleMap] = useState<Record<string, Vehicle[]>>(() => {
    try {
      const saved = localStorage.getItem("sac_vehicleMap");
      return saved ? JSON.parse(saved) : SEED_VEHICLES;
    } catch {
      return SEED_VEHICLES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_vehicleMap", JSON.stringify(vehicleMap));
    } catch {}
  }, [vehicleMap]);

  const [vehicleList, setVehicleList] = useState<VehicleListEntry[]>(() => {
    try {
      const saved = localStorage.getItem("sac_vehicleList");
      return saved ? JSON.parse(saved) : SEED_VEHICLE_LIST;
    } catch {
      return SEED_VEHICLE_LIST;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_vehicleList", JSON.stringify(vehicleList));
    } catch {}
  }, [vehicleList]);
  const [jobOrders, setJobOrders] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("sac_jobOrders");
      return saved ? JSON.parse(saved) : SEED_JOS;
    } catch {
      return SEED_JOS;
    }
  });

  // Customer flow state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedJobOrder, setSelectedJobOrder] = useState<JoDetail | null>(null);
  const [joDetails, setJoDetails] = useState<Record<string, JoDetail>>(() => {
    try {
      const saved = localStorage.getItem("sac_joDetails");
      return saved ? JSON.parse(saved) : SEED_JO_DETAILS;
    } catch {
      return SEED_JO_DETAILS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_joDetails", JSON.stringify(joDetails));
    } catch {}
  }, [joDetails]);

  useEffect(() => {
    try {
      localStorage.setItem("sac_jobOrders", JSON.stringify(jobOrders));
    } catch {}
  }, [jobOrders]);
  // vehicleDetailsBackTarget: where Vehicle Details "Back" goes
  const [vehicleDetailsBackTarget, setVehicleDetailsBackTarget] = useState<Screen>("vehicle-list");
  // joDetailsBackTarget: where Job Order Details "Back" goes
  const [joDetailsBackTarget, setJoDetailsBackTarget] = useState<Screen>("job-orders-list");
  // customerDetailsBackTarget: where Customer Details "Back" goes
  const [customerDetailsBackTarget, setCustomerDetailsBackTarget] = useState<Screen>("customer-list");

  // Warehouse state
  const [wSelectedJob, setWSelectedJob] = useState<WJob | null>(null);
  const [wJobPartsMap, setWJobPartsMap] = useState<Record<string, WIssuedPart[]>>(() => {
    try {
      const saved = localStorage.getItem("sac_wJobPartsMap");
      return saved ? JSON.parse(saved) : W_JOB_PARTS_INIT;
    } catch {
      return W_JOB_PARTS_INIT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_wJobPartsMap", JSON.stringify(wJobPartsMap));
    } catch {}
  }, [wJobPartsMap]);

  const [wSelectedPart, setWSelectedPart] = useState<WPart | null>(null);
  const [wPartsConfirmedSet, setWPartsConfirmedSet] = useState<Set<string>>(new Set());
  const [warehouseModal, setWarehouseModal] = useState<WarehouseModal>(null);
  const [wParts, setWParts] = useState<WPart[]>(() => {
    try {
      const saved = localStorage.getItem("sac_wParts");
      return saved ? JSON.parse(saved) : W_PARTS;
    } catch {
      return W_PARTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_wParts", JSON.stringify(wParts));
    } catch {}
  }, [wParts]);

  const [wMovements, setWMovements] = useState<WMovement[]>(() => {
    try {
      const saved = localStorage.getItem("sac_wMovements");
      return saved ? JSON.parse(saved) : W_MOVEMENTS;
    } catch {
      return W_MOVEMENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_wMovements", JSON.stringify(wMovements));
    } catch {}
  }, [wMovements]);

  const [oInvoices, setOInvoices] = useState<OInvoice[]>(() => {
    try {
      const saved = localStorage.getItem("sac_oInvoices");
      return saved ? JSON.parse(saved) : SEED_INVOICES;
    } catch {
      return SEED_INVOICES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_oInvoices", JSON.stringify(oInvoices));
    } catch {}
  }, [oInvoices]);

  const [oPayments, setOPayments] = useState<OPayment[]>(() => {
    try {
      const saved = localStorage.getItem("sac_oPayments");
      return saved ? JSON.parse(saved) : SEED_PAYMENTS;
    } catch {
      return SEED_PAYMENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_oPayments", JSON.stringify(oPayments));
    } catch {}
  }, [oPayments]);

  function handleMarkInvoicePaid(invId: string) {
    setOInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invId) {
          const updated = { ...inv, status: "Paid" as const };
          const newPay: OPayment = {
            id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
            invoiceNumber: inv.number,
            jobOrderNumber: inv.jobOrderNumber,
            customerName: inv.customerName,
            method: "Cash",
            amount: inv.totalAmount,
            reference: "AUTO-REC-PAID",
            receivedBy: "Owner",
          };
          setOPayments((pPrev) => [newPay, ...pPrev]);
          return updated;
        }
        return inv;
      })
    );
  }

  function handleRecordPayment(pay: OPayment) {
    setOPayments((prev) => [pay, ...prev]);
    if (pay.invoiceNumber) {
      setOInvoices((prev) =>
        prev.map((inv) => (inv.number === pay.invoiceNumber ? { ...inv, status: "Paid" as const } : inv))
      );
    }
  }

  const [wActiveNav, setWActiveNav] = useState("warehouse-dashboard");
  const [wPartBackTarget, setWPartBackTarget] = useState<Screen>("warehouse-parts");

  const openJobsForWarehouse: WJob[] = jobOrders
    .filter((jo) => jo.status === "Open")
    .map((jo) => {
      const detail = joDetails[jo.number];
      const issuedParts = wJobPartsMap[jo.number] ?? [];
      const issuedPartsCount = issuedParts.reduce((sum, p) => sum + p.qty, 0);
      return {
        number: jo.number,
        date: detail?.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        vehicle: jo.vehicle || detail?.vehicleName || "Vehicle",
        year: (detail as any)?.vehicleYear || "2024",
        color: (detail as any)?.vehicleColor || "",
        plate: jo.plate || detail?.vehiclePlate || "",
        partsIssued: issuedPartsCount,
        serviceType: detail?.type || "Full Service",
        customer: jo.customer || detail?.customerName || "",
        status: jo.status || "Open",
      };
    });

  useEffect(() => {
    async function loadBackendData() {
      try {
        const [backendCustomers, backendVehicles, backendJOs, backendParts, backendMovements] = await Promise.all([
          api.getCustomers().catch(() => null),
          api.getVehicles().catch(() => null),
          api.getJobOrders().catch(() => null),
          api.getParts().catch(() => null),
          api.getStockMovements().catch(() => null),
        ]);

        if (backendCustomers && backendCustomers.length > 0) {
          setCustomers(backendCustomers.map((c: any) => ({
            id: c.id.toString(),
            name: c.name,
            phone: c.phone,
            email: c.email || "",
            address: c.address || "",
            vehicleCount: c.vehicleCount || (c.vehicles ? c.vehicles.length : 0),
          })));
        }

        if (backendVehicles && backendVehicles.length > 0) {
          const vList: VehicleListEntry[] = backendVehicles.map((v: any) => ({
            id: `v${v.id}`,
            make: v.make,
            model: v.model,
            year: v.year,
            plate: v.plate,
            vin: v.vin || "",
            color: v.color || "",
            km: v.km || "0",
            visits: v.visits || 1,
            lastVisit: v.lastVisit ? new Date(v.lastVisit).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "",
            customerId: v.customerId.toString(),
            customerName: v.customerName || "",
            customerPhone: v.customerPhone || "",
          }));
          setVehicleList((prev) => {
            const map = new Map<string, VehicleListEntry>();
            vList.forEach((item) => map.set(item.plate, item));
            prev.forEach((item) => {
              if (!map.has(item.plate)) map.set(item.plate, item);
            });
            return Array.from(map.values());
          });
        }

        if (backendJOs && backendJOs.length > 0) {
          setJobOrders(backendJOs.map((jo: any) => ({
            number: jo.number,
            customer: jo.customerName || jo.customer,
            phone: jo.customerPhone || jo.phone,
            vehicle: jo.vehicleName || jo.vehicle,
            plate: jo.vehiclePlate || jo.plate,
            status: jo.status,
          })));
        }

        if (backendParts && backendParts.length > 0) {
          const fetchedParts: WPart[] = backendParts.map((p: any) => ({
            id: p.id.toString(),
            name: p.name,
            number: p.number,
            oem: p.oem || "",
            brand: p.brand || "",
            category: p.category || "",
            compatibleVehicles: Array.isArray(p.compatibleVehicles) ? p.compatibleVehicles : [],
            currentQty: p.currentQty,
            minQty: p.minQty,
            location: p.location || "",
            status: p.currentQty <= 0 ? "Out of Stock" : p.currentQty <= p.minQty ? "Low Stock" : "In Stock",
          }));
          setWParts((prev) => {
            const map = new Map<string, WPart>();
            fetchedParts.forEach((item) => map.set(item.number, item));
            prev.forEach((item) => {
              if (!map.has(item.number)) map.set(item.number, item);
            });
            return Array.from(map.values());
          });
        }

        if (backendMovements && backendMovements.length > 0) {
          setWMovements(backendMovements.map((m: any) => ({
            part: m.part,
            type: m.type === "Issue" ? "Issue" : "Stock In",
            reference: m.reference || "",
            note: m.note || "",
            date: m.date || "",
            qty: m.qty,
          })));
        }
      } catch (err) {
        console.warn("Could not connect to backend, using local state:", err);
      }
    }
    loadBackendData();
  }, []);

  function handleWNav(id: string) {
    setWActiveNav(id);
    setScreen(id as Screen);
  }

  async function handleOpenJob(job: WJob) {
    setWSelectedJob(job);
    setWActiveNav("warehouse-jobs");
    setScreen("warehouse-parts-issue");
    try {
      const issued = await api.getIssuedParts(job.number);
      if (issued && issued.length > 0) {
        const mapped: WIssuedPart[] = issued.map((ip: any) => ({
          partId: ip.partId.toString(),
          partName: ip.partName,
          partNumber: ip.partNumber,
          qty: ip.qty,
        }));
        setWJobPartsMap((prev) => ({ ...prev, [job.number]: mapped }));
      }
    } catch {}
  }

  async function handleWAddPart(selections: { part: WPart; qty: number }[]) {
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

    try {
      const payload = selections.map((s) => ({ partId: parseInt(s.part.id) || 1, qty: s.qty }));
      await api.issuePartsToJobOrder(joNum, payload);
    } catch (err) {
      console.warn("API issuePartsToJobOrder failed, using local state:", err);
    }
  }

  async function handleWRemovePart(partId: string) {
    if (!wSelectedJob) return;
    const joNum = wSelectedJob.number;
    setWJobPartsMap((prev) => ({
      ...prev,
      [joNum]: (prev[joNum] ?? []).filter((p) => p.partId !== partId),
    }));

    try {
      await api.removeIssuedPart(joNum, parseInt(partId) || 0);
    } catch (err) {
      console.warn("API removeIssuedPart failed, using local state:", err);
    }
  }

  async function handleWAddNewPart(part: WPart) {
    let newPart = part;
    try {
      const res = await api.createPart({
        name: part.name,
        number: part.number,
        oem: part.oem,
        brand: part.brand,
        category: part.category,
        compatibleVehicles: part.compatibleVehicles,
        currentQty: part.currentQty,
        minQty: part.minQty,
        location: part.location,
      });
      if (res && res.id) {
        newPart = {
          ...part,
          id: res.id.toString(),
          status: part.currentQty <= 0 ? "Out of Stock" : part.currentQty <= part.minQty ? "Low Stock" : "In Stock",
        };
      }
    } catch (err) {
      console.warn("API createPart failed, using local state:", err);
    }
    setWParts((prev) => [newPart, ...prev.filter((p) => p.number !== newPart.number)]);

    if (newPart.currentQty > 0) {
      const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(",", "");
      const newMovement: WMovement = {
        part: newPart.name,
        type: "Stock In",
        reference: newPart.number,
        note: "Initial Stock / Added Part",
        date: dateStr,
        qty: newPart.currentQty,
      };
      setWMovements((prev) => [newMovement, ...prev]);
    }

    setWarehouseModal(null);
  }

  async function handleWSaveCount(entries: StockCountEntry[]) {
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(",", "");
    const newMovements: WMovement[] = [];

    const apiEntries = entries
      .map((e) => ({ partId: parseInt(e.partId) || 0, actualQty: parseInt(e.actualQty) || 0 }))
      .filter((e) => e.partId > 0 && e.actualQty > 0);

    if (apiEntries.length > 0) {
      try {
        await api.updateStockCount(apiEntries);
      } catch (err) {
        console.warn("API updateStockCount failed, using local state:", err);
      }
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
    const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(",", "");

    try {
      await api.confirmPartsIssued(joNum);
    } catch (err) {
      console.warn("API confirmPartsIssued failed, using local state:", err);
    }

    // Deduct quantities from parts
    setWParts((prev) =>
      prev.map((p) => {
        const ip = issued.find((ip) => ip.partId === p.id);
        if (!ip) return p;
        const newQty = Math.max(0, p.currentQty - ip.qty);
        const newStatus: WPart["status"] = newQty <= 0 ? "Out of Stock" : newQty <= p.minQty ? "Low Stock" : "In Stock";
        return { ...p, currentQty: newQty, status: newStatus };
      })
    );
    // Add movements
    const newMovements: WMovement[] = issued.map((ip) => ({
      part: ip.partName,
      type: "Issue",
      reference: joNum,
      note: `Issued to ${joNum}`,
      date: dateStr,
      qty: -ip.qty,
    }));
    setWMovements((prev) => [...newMovements, ...prev]);
    setWPartsConfirmedSet((prev) => new Set([...prev, joNum]));
  }

  // Vehicle flow state
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleListEntry | null>(null);
  const [serviceHistoryMap, setServiceHistoryMap] = useState<Record<string, ServiceHistoryEntry[]>>(SEED_SERVICE_HISTORY);
  const [vehicleStep3BackTarget, setVehicleStep3BackTarget] = useState<Screen>("vehicle-details");
  // Track current owner per vehicle (vehicleId → {name, phone})
  const [vehicleOwnerMap, setVehicleOwnerMap] = useState<Record<string, { name: string; phone: string }>>(() => {
    try {
      const saved = localStorage.getItem("sac_vehicleOwnerMap");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sac_vehicleOwnerMap", JSON.stringify(vehicleOwnerMap));
    } catch {}
  }, [vehicleOwnerMap]);

  function handleNav(id: string) {
    setActiveNav(id);
    if (id === "dashboard") setScreen("dashboard");
    if (id === "vehicles") setScreen("vehicle-list");
    if (id === "customers") setScreen("customer-list");
    if (id === "job-orders") setScreen("job-orders-list");
  }

  async function handleOpenJobOrder(joNumber: string, backTarget: Screen) {
    const detail = joDetails[joNumber] || {
      number: joNumber,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Open",
      type: "Full Service",
      customerId: "1",
      customerName: "",
      customerPhone: "",
      vehicleId: "v1",
      vehicleName: "",
      vehiclePlate: "",
      vehicleKm: "0 km",
      vehicleVin: "",
      engineer: "Karim Samir",
      technicians: [],
      deferredItems: [],
    };
    setSelectedJobOrder(detail);
    setJoDetailsBackTarget(backTarget);
    setScreen("job-order-details");
    try {
      const apiJo = await api.getJobOrderByNumber(joNumber);
      if (apiJo) {
        const updated: JoDetail = {
          ...detail,
          customerRequest: apiJo.customerRequest || apiJo.requiredWork || detail.customerRequest,
          requiredWork: apiJo.requiredWork || detail.requiredWork,
          approvedItems: apiJo.approvedItems || detail.approvedItems,
          deferredItems: apiJo.deferredItems || detail.deferredItems,
        };
        setSelectedJobOrder(updated);
        setJoDetails((prev) => ({ ...prev, [joNumber]: updated }));
      }
    } catch {}
  }

  function startNewJobOrder() {
    setCtx({ ...FRESH_CTX });
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
    try {
      const res = await api.createCustomer({ name: c.name, phone: c.phone, email: c.email, address: c.address });
      const created: Customer = {
        id: res.id.toString(),
        name: res.name,
        phone: res.phone,
        email: res.email || "",
        address: res.address || "",
        vehicleCount: 0,
      };
      setCustomers((prev) => [...prev, created]);
      setVehicleMap((prev) => ({ ...prev, [created.id]: [] }));
      setCtx((prev) => ({ ...prev, customer: created, vehicle: null }));
    } catch {
      setCustomers((prev) => [...prev, c]);
      setVehicleMap((prev) => ({ ...prev, [c.id]: [] }));
      setCtx((prev) => ({ ...prev, customer: c, vehicle: null }));
    }
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
    if (ctx.customer) {
      let createdV: Vehicle = v;
      try {
        const res = await api.createVehicle({
          make: v.make,
          model: v.model,
          year: v.year,
          plate: v.plate,
          vin: v.vin,
          color: v.color,
          km: v.km,
          customerId: parseInt(ctx.customer.id.replace(/\D/g, "")) || 1,
        });
        createdV = {
          id: res.id ? res.id.toString() : v.id || Date.now().toString(),
          make: res.make || v.make,
          model: res.model || v.model,
          year: res.year || v.year,
          plate: res.plate || v.plate,
          vin: res.vin || v.vin || "",
          color: res.color || v.color || "",
          km: res.km || v.km || "0",
          visits: 1,
          lastVisit: "Today",
          customerId: ctx.customer.id,
        };
      } catch {
        createdV = { ...v, id: v.id || Date.now().toString(), customerId: ctx.customer.id };
      }

      setVehicleMap((prev) => ({
        ...prev,
        [ctx.customer!.id]: [...(prev[ctx.customer!.id] ?? []).filter((x) => x.plate !== createdV.plate), createdV],
      }));

      const vEntry: VehicleListEntry = {
        ...createdV,
        customerName: ctx.customer.name,
        customerPhone: ctx.customer.phone,
        visits: 1,
        lastVisit: "Today",
      };

      setVehicleList((prev) => {
        const exists = prev.some((x) => x.id === vEntry.id || x.plate === vEntry.plate);
        if (exists) return prev.map((x) => (x.plate === vEntry.plate ? vEntry : x));
        return [vEntry, ...prev];
      });

      setCtx((prev) => ({ ...prev, vehicle: createdV }));
    }
    setModal(null);
    setScreen("step3-details");
  }

  // Step 3 → create job order
  async function handleCreateJobOrder(data: { requiredWork: string; completedWork: string; notes: string; km: string }) {
    if (!ctx.customer || !ctx.vehicle) return;

    let joNum = ctx.joNumber;
    try {
      const res = await api.createJobOrder({
        customerId: parseInt(ctx.customer.id.replace(/\D/g, "")) || 1,
        vehicleId: parseInt(ctx.vehicle.id.replace(/\D/g, "")) || 1,
        type: "Full Service",
        requiredWork: data.requiredWork,
        completedWork: data.completedWork,
        notes: data.notes,
        km: data.km || ctx.vehicle.km,
        engineer: ctx.engineer,
      });
      if (res.number) joNum = res.number;
    } catch {
      // Fallback to local state if backend call fails
    }

    // Ensure customer is added to customers list
    if (ctx.customer) {
      setCustomers((prev) => {
        const exists = prev.some((c) => c.id === ctx.customer!.id || c.phone === ctx.customer!.phone);
        if (exists) {
          return prev.map((c) =>
            c.id === ctx.customer!.id || c.phone === ctx.customer!.phone
              ? { ...c, vehicleCount: (c.vehicleCount || 0) + 1 }
              : c
          );
        }
        return [...prev, { ...ctx.customer!, vehicleCount: 1 }];
      });
    }

    // Ensure vehicle is added to vehicleMap and vehicleList
    if (ctx.vehicle && ctx.customer) {
      const v = ctx.vehicle;
      const c = ctx.customer;
      setVehicleMap((prev) => {
        const current = prev[c.id] ?? [];
        const exists = current.some((x) => x.id === v.id || x.plate === v.plate);
        if (exists) return prev;
        return { ...prev, [c.id]: [...current, v] };
      });

      const vEntry: VehicleListEntry = {
        id: v.id || Date.now().toString(),
        make: v.make,
        model: v.model,
        year: v.year,
        plate: v.plate,
        vin: v.vin || "",
        color: v.color || "",
        km: `${data.km || v.km || "0"} km`,
        visits: (v.visits || 0) + 1,
        lastVisit: "Today",
        customerId: c.id,
        customerName: c.name,
        customerPhone: c.phone,
      };

      setVehicleList((prev) => {
        const exists = prev.some((x) => x.id === vEntry.id || x.plate === vEntry.plate);
        if (exists) {
          return prev.map((x) => (x.plate === vEntry.plate ? { ...x, visits: (x.visits || 1) + 1, lastVisit: "Today" } : x));
        }
        return [vEntry, ...prev];
      });
    }

    const newJO = {
      number: joNum,
      customer: ctx.customer.name,
      phone: ctx.customer.phone,
      vehicle: `${ctx.vehicle.make} ${ctx.vehicle.model}`,
      plate: ctx.vehicle.plate,
      status: "Open",
    };

    const userRequestText = [data.notes, data.requiredWork].filter((t) => t && t.trim()).join(" · ") || data.notes || data.requiredWork || "";

    const newJoDetail: JoDetail = {
      number: joNum,
      date: ctx.joDate || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Open",
      type: "Full Service",
      customerId: ctx.customer.id,
      customerName: ctx.customer.name,
      customerPhone: ctx.customer.phone,
      vehicleId: ctx.vehicle.id,
      vehicleName: `${ctx.vehicle.make} ${ctx.vehicle.model}`,
      vehiclePlate: ctx.vehicle.plate,
      vehicleKm: `${data.km || ctx.vehicle.km} km`,
      vehicleVin: ctx.vehicle.vin || "",
      engineer: ctx.engineer || "Karim Samir",
      technicians: [],
      customerRequest: userRequestText,
      requiredWork: userRequestText,
      approvedItems: [],
      deferredItems: [],
    };
    setJoDetails((prev) => ({ ...prev, [joNum]: newJoDetail }));

    const newHistoryEntry: ServiceHistoryEntry = {
      joNumber: joNum,
      date: ctx.joDate || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      km: data.km || ctx.vehicle.km,
      inspection: data.requiredWork ? data.requiredWork.slice(0, 60) : "General Inspection",
      status: "Open",
    };

    // If coming from vehicle flow, append to that vehicle's service history
    if (selectedVehicle && vehicleStep3BackTarget === "vehicle-details") {
      const vid = selectedVehicle.id;
      setServiceHistoryMap((prev) => ({
        ...prev,
        [vid]: [newHistoryEntry, ...(prev[vid] ?? [])],
      }));
      setJobOrders((prev) => [newJO, ...prev]);
      setScreen("vehicle-details");
      setActiveNav("vehicles");
    } else {
      setJobOrders((prev) => [newJO, ...prev]);
      setScreen("job-order-created");
      setActiveNav("job-orders");
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
  async function handleSelectJo(jo: JoDetail) {
    setSelectedJobOrder(jo);
    setJoDetailsBackTarget("customer-details");
    setScreen("job-order-details");
    try {
      const apiJo = await api.getJobOrderByNumber(jo.number);
      if (apiJo) {
        const updated: JoDetail = {
          ...jo,
          customerRequest: apiJo.customerRequest || apiJo.requiredWork || jo.customerRequest,
          requiredWork: apiJo.requiredWork || jo.requiredWork,
          approvedItems: apiJo.approvedItems || jo.approvedItems,
          deferredItems: apiJo.deferredItems || jo.deferredItems,
        };
        setSelectedJobOrder(updated);
        setJoDetails((prev) => ({ ...prev, [jo.number]: updated }));
      }
    } catch {}
  }

  // Vehicle list → select vehicle → vehicle details
  function handleSelectVehicleFromList(v: (typeof SEED_VEHICLE_LIST)[0]) {
    setSelectedVehicle(v);
    setVehicleDetailsBackTarget("vehicle-list");
    setScreen("vehicle-details");
  }

  // Vehicle details → new job order (skip steps 1 & 2)
  function handleNewJobOrderFromVehicle() {
    if (!selectedVehicle) return;
    const owner = vehicleOwnerMap[selectedVehicle.id] ?? { name: selectedVehicle.customerName, phone: selectedVehicle.customerPhone };
    const customer: Customer = {
      id: `auto-${selectedVehicle.id}`,
      name: owner.name,
      phone: owner.phone,
    };
    const vehicle: Vehicle = {
      id: selectedVehicle.id,
      make: selectedVehicle.make,
      model: selectedVehicle.model,
      year: selectedVehicle.year,
      plate: selectedVehicle.plate,
      vin: selectedVehicle.vin,
      color: selectedVehicle.color,
      km: selectedVehicle.km,
    };
    setCtx({ ...FRESH_CTX, customer, vehicle });
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
    : "";

  const isOwnerRole = selectedRole === "owner";
  const isWarehouseScreen = screen.startsWith("warehouse-") && !isOwnerRole;
  const isOwnerScreen = isOwnerRole && screen !== "role-selection";

  const step3BackTarget = vehicleStep3BackTarget === "vehicle-details"
    ? () => { setScreen("vehicle-details"); setActiveNav("vehicles"); }
    : () => setScreen("step2-vehicle");

  function handleSelectRole(role: Role) {
    setSelectedRole(role);
    if (role === "engineer") {
      setScreen("dashboard");
      setActiveNav("dashboard");
    } else if (role === "warehouse") {
      setScreen("warehouse-dashboard");
      setWActiveNav("warehouse-dashboard");
    } else if (role === "owner") {
      setScreen("owner-dashboard");
      setActiveNav("owner-dashboard");
    }
  }

  function handleOwnerNav(id: string) {
    setScreen(id as Screen);
    setActiveNav(id);
    setWActiveNav(id);
  }

  return (
    <div className="size-full bg-[#f3f4f6]">
      {/* Role selection is a full-screen overlay — rendered outside Sidebar/Header */}
      {screen === "role-selection" && (
        <RoleSelectionScreen onSelectRole={handleSelectRole} />
      )}

      {screen !== "role-selection" && !isWarehouseScreen && !isOwnerScreen && (
        <Sidebar
          active={activeNav}
          onNav={handleNav}
          onSignOut={() => { setScreen("role-selection"); setActiveNav("dashboard"); }}
        />
      )}
      {screen !== "role-selection" && !isWarehouseScreen && !isOwnerScreen && <Header title={headerTitle} />}

      {isWarehouseScreen && (
        <WarehouseSidebar
          active={wActiveNav}
          onNav={handleWNav}
          onSignOut={() => { setScreen("role-selection"); setWActiveNav("warehouse-dashboard"); }}
        />
      )}
      {isWarehouseScreen && <WarehouseHeader title={warehouseHeaderTitle} />}

      {isOwnerScreen && (
        <OwnerSidebar
          active={activeNav}
          onNav={handleOwnerNav}
          onSignOut={() => { setScreen("role-selection"); setSelectedRole(null); setActiveNav("dashboard"); }}
        />
      )}
      {isOwnerScreen && <Header title={
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
        "Owner"
      } />}

      {screen === "dashboard" && (
        <DashboardScreen
          jobOrders={jobOrders}
          vehicles={vehicleList}
          onNewJobOrder={startNewJobOrder}
          onSelectJo={(joNumber) => {
            const jo = jobOrders.find((j) => j.number === joNumber);
            const detail: JoDetail = joDetails[joNumber] || {
              number: joNumber,
              date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
              status: jo?.status || "Open",
              type: "Full Service",
              customerId: "1",
              customerName: jo?.customer || "",
              customerPhone: jo?.phone || "",
              vehicleId: "v1",
              vehicleName: jo?.vehicle || "",
              vehiclePlate: jo?.plate || "",
              vehicleKm: "0 km",
              vehicleVin: "",
              engineer: "Karim Samir",
              technicians: [],
              deferredItems: [],
              recommendedItems: [],
            };
            setSelectedJobOrder(detail);
            setJoDetailsBackTarget("dashboard");
            setScreen("job-order-details");
          }}
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
            deferredWork={SEED_DEFERRED_WORK[selectedVehicle.id] ?? []}
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
          onBack={() => {
            const target = joDetailsBackTarget;
            if (target === "vehicle-details") {
              setScreen("vehicle-details");
              setActiveNav("vehicles");
            } else if (target === "customer-details") {
              setScreen("customer-details");
              setActiveNav("customers");
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

      {/* ── Warehouse screens ── */}
      {screen === "warehouse-dashboard" && (
        <WarehouseDashboardScreen
          parts={wParts}
          movements={wMovements}
          jobs={openJobsForWarehouse}
          onOpenJob={(job) => handleOpenJob(job)}
          onViewAllParts={() => { setScreen("warehouse-parts"); setWActiveNav("warehouse-parts"); }}
          onViewAllMovements={() => { setScreen("warehouse-movements"); setWActiveNav("warehouse-movements"); }}
        />
      )}

      {screen === "warehouse-jobs" && (
        <WarehouseJobsScreen
          jobs={openJobsForWarehouse}
          onOpen={(job) => handleOpenJob(job)}
        />
      )}

      {screen === "warehouse-parts-issue" && wSelectedJob && (
        <WarehousePartsIssueScreen
          job={wSelectedJob}
          issuedParts={wJobPartsMap[wSelectedJob.number] ?? []}
          parts={wParts}
          onBack={() => { setScreen("warehouse-jobs"); setWActiveNav("warehouse-jobs"); }}
          onAddPart={() => setWarehouseModal("add-part-to-job")}
          onRemovePart={handleWRemovePart}
          onConfirm={handleWConfirmIssue}
          confirmed={wPartsConfirmedSet.has(wSelectedJob.number)}
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

      {screen === "warehouse-part-details" && wSelectedPart && (
        <WarehousePartDetailsScreen
          part={wSelectedPart}
          movements={wMovements}
          onBack={() => { setScreen(wPartBackTarget); setWActiveNav(wPartBackTarget); }}
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
      {screen === "owner-settings" && isOwnerScreen && <OwnerSettingsScreen />}
      {screen === "owner-invoices" && isOwnerScreen && <OwnerInvoicesScreen invoices={oInvoices} onMarkPaid={handleMarkInvoicePaid} />}
      {screen === "owner-payments" && isOwnerScreen && <OwnerPaymentsScreen payments={oPayments} onRecordPayment={handleRecordPayment} />}

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
          onCreate={async (v) => {
            if (screen === "customer-details" && selectedCustomer) {
              let createdV: Vehicle = { ...v, id: v.id || Date.now().toString(), customerId: selectedCustomer.id };
              try {
                const res = await api.createVehicle({
                  make: v.make,
                  model: v.model,
                  year: v.year,
                  plate: v.plate,
                  vin: v.vin,
                  color: v.color,
                  km: v.km,
                  customerId: parseInt(selectedCustomer.id.replace(/\D/g, "")) || 1,
                });
                if (res && res.id) {
                  createdV.id = res.id.toString();
                }
              } catch (err) {
                console.warn("API createVehicle failed, using local state:", err);
              }

              setVehicleMap((prev) => ({
                ...prev,
                [selectedCustomer.id]: [...(prev[selectedCustomer.id] ?? []).filter((x) => x.plate !== createdV.plate), createdV],
              }));

              const vEntry: VehicleListEntry = {
                ...createdV,
                customerName: selectedCustomer.name,
                customerPhone: selectedCustomer.phone,
                visits: 1,
                lastVisit: "Today",
              };

              setVehicleList((prev) => {
                const exists = prev.some((x) => x.id === vEntry.id || x.plate === vEntry.plate);
                if (exists) return prev.map((x) => (x.plate === vEntry.plate ? vEntry : x));
                return [vEntry, ...prev];
              });

              setCustomers((prev) =>
                prev.map((c) => (c.id === selectedCustomer.id ? { ...c, vehicleCount: (c.vehicleCount || 0) + 1 } : c))
              );

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
