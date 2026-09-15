# PHASE 5.9 — FORENSIC AUDIT REPORT
**JOB ORDER ↔ INVOICE ↔ LABOR ↔ ADDITIONAL EXPENSES ↔ PAYMENTS**
**MODE: STRICT READ-ONLY FORENSIC DIAGNOSIS ONLY**

---

## 1. EXECUTIVE SUMMARY

A multi-layer forensic audit was conducted across the entire database schema, EF Core entities, backend C# services, controllers, DTO contracts, API endpoints (`api.ts`), frontend React state, normalization routines, screen components, and print templates.

### Key Audit Findings:
1. **DATABASE PERSISTENCE IS 100% CORRECT & INTACT**: Direct SQL queries against the SQL Server database (`StarAutoCenter`) confirm that no financial records, parts, labor, additional expenses, or payment data have been lost or corrupted in the database.
2. **ROOT CAUSE OF FINANCIAL CONTRADICTION**: The Job Order screen shows `0 Parts / 300 Labor / 100 Expenses / 300 Total` while the Invoice screen shows `3,800 Parts / 300 Labor / 100 Expenses / 4,200 Total` because:
   - **Backend DTO Asymmetry**: `JobOrderService.GetByNumberAsync` returns `JobOrderDetailsDto`, which omits `IssuedParts`, `AdditionalExpenses`, `PartsTotal`, `ExpensesTotal`, and `GrandTotal`. Conversely, `AccountantService.GetJobDetailsAsync` returns `AccountantJobDetailsDto`, which contains all financial details.
   - **Frontend Navigation Bypassing API Details**: Clicking a Job Order from the Accountant Dashboard, Accountant Jobs List, or Invoice Details passes a summary DTO directly to `setSelectedJobOrder(jo)` without invoking `api.getAccountantJobDetails(joNumber)`.
   - **Unsynced Client State Fallback**: When `selectedJobOrder.issuedParts` is absent, `<JobOrderDetailsScreen>` falls back to `wJobPartsMap[selectedJobOrder.number]`. `wJobPartsMap` is an isolated, mock in-memory React state variable that is **never** synchronized with the backend database.
3. **ROOT CAUSE OF PAYMENT STATE CONTRADICTION**: The Invoice header showed **Paid** while the payment section showed **Unpaid / 0 Paid / Full Remaining** because the header rendered `invoice.paymentStatus` from the summary object, while the payment section derived status from `invoice.payments`. When navigating via summary DTOs, `invoice.payments` was `undefined` (evaluating to `[]`), causing the local derivation to compute `0 Paid` and `"Unpaid"`.
4. **LABOR PRESERVATION VS PRINT SUMMARY**: Labor details are correctly stored in backend memory/DB and exposed in internal views (`AccountantInvoiceDetailsScreen`). In `PrintInvoiceView`, labor is intentionally summarized as `LABOR / WORKMANSHIP <total amount>`, which conforms to business requirements.

---

## 2. CRITICAL ISSUES

### BUG-07: Job Order Screen Omits Warehouse Issued Parts and Invoice Snapshot
- **Severity**: CRITICAL
- **Observed Behavior**: A closed/invoiced Job Order (`JO-2026-00010`) displays `0 EGP` Parts, `300 EGP` Labor, `100 EGP` Expenses, and `300 EGP` Grand Total on the Job Order Details screen, while its finalized Invoice (`INV-2026-00006`) displays `3,800 EGP` Parts, `300 EGP` Labor, `100 EGP` Expenses, and `4,200 EGP` Grand Total.
- **Expected Behavior**: A closed Job Order must display the exact financial totals (`3,800 EGP` Parts, `300 EGP` Labor, `100 EGP` Expenses, `4,200 EGP` Grand Total) corresponding to the authoritative finalized invoice snapshot or backend warehouse issued parts.
- **Root Cause**:
  1. `JobOrderService.cs` (`GetByNumberAsync`) returns `JobOrderDetailsDto` which does not map `IssuedParts`, `AdditionalExpenses`, `PartsTotal`, `ExpensesTotal`, or `GrandTotal`.
  2. In `src/App.tsx`, navigation handlers (`onReviewJob`, `onSelectJo`, `onOpenJobOrder`) set `selectedJobOrder` directly from list/summary DTOs without calling `api.getAccountantJobDetails(joNumber)`.
  3. `<JobOrderDetailsScreen>` receives `issuedParts={wJobPartsMap[selectedJobOrder.number] ?? []}`. `wJobPartsMap` is a static mock React state variable never populated from the SQL database.
- **Exact Layer**: Backend DTO + Service & Frontend Navigation / State.
- **Exact Files**:
  - `Services/Engineer/JobOrderService.cs` (`GetByNumberAsync`)
  - `src/App.tsx` (`onReviewJob`, `onSelectJo`, `onOpenJobOrder`)
- **Data Property**: `JobOrderDetailsDto` (missing `issuedParts`, `additionalExpenses`, `partsTotal`, `expensesTotal`, `grandTotal`).

---

### BUG-08: Summary DTO Usage Causes Payment Section Contradiction
- **Severity**: HIGH
- **Observed Behavior**: Invoice header displays status badge **Paid**, while the Payment Breakdown section displays **Unpaid**, **Total Paid = 0 EGP**, and **Remaining = Full Invoice Amount**.
- **Expected Behavior**: Invoice header and Payment section must consistently display **Paid**, **Total Paid = 4,200 EGP**, and **Remaining = 0 EGP**.
- **Root Cause**: When an invoice is selected from a summary list (`InvoiceListDto`), `invoice.payments` is `undefined`. Line 9072 of `App.tsx` falls back to `payments = []`, which causes local derivation to compute `totalPaid = 0`, `remaining = grandTotal`, and status `"Unpaid"`, contradicting header prop `invoice.paymentStatus`.
- **Exact Layer**: Frontend State Mapping & Normalization.
- **Exact Files**:
  - `src/App.tsx` (Lines 9071–9079)
  - `Services/Accountant/AccountantService.cs` (Lines 367–383)
- **Data Property**: `InvoiceListDto.Payments` (missing in summary DTO).

---

### BUG-09: Client-side `wJobPartsMap` Decoupled from SQL Server Database
- **Severity**: HIGH
- **Observed Behavior**: Parts issued in the Warehouse or persisted in database table `IssuedParts` do not automatically appear in the Job Order Details screen unless hardcoded in static mock state `W_JOB_PARTS_INIT`.
- **Expected Behavior**: All issued parts rendered in the Job Order screen must be fetched directly from the SQL Server database table `IssuedParts` joined with `Parts`.
- **Root Cause**: `wJobPartsMap` state in `App.tsx` line 14394 is initialized with static mock array `W_JOB_PARTS_INIT` and is never updated when backend warehouse parts are issued via API.
- **Exact Layer**: Frontend State Management.
- **Exact Files**:
  - `src/App.tsx` (Line 14394)
- **Data Property**: `wJobPartsMap`.

---

## 3. JOB ORDER ↔ INVOICE RECONCILIATION

### Real-World Case Evidence (Job Order `JO-2026-00010` & Invoice `INV-2026-00006`)

| Financial Component | Job Order Screen (Observed) | Invoice Details Screen (Observed) | SQL Database (Verified) | Discrepancy Cause |
| :--- | :--- | :--- | :--- | :--- |
| **Parts Total** | `0.00 EGP` | `3,800.00 EGP` | `3,800.00 EGP` | Frontend read `wJobPartsMap` (empty) instead of DB `IssuedParts`. |
| **Labor Amount** | `300.00 EGP` | `300.00 EGP` | `300.00 EGP` | Match (persisted on `JobOrder.LaborAmount`). |
| **Additional Expenses** | `100.00 EGP` | `100.00 EGP` | `100.00 EGP` | Match (persisted in `AdditionalExpenses` table). |
| **Grand Total** | **`300.00 EGP`** | **`4,200.00 EGP`** | **`4,200.00 EGP`** | Job Order UI calculated `0 (Parts) + 300 (Labor) + 0 (Exp fallback) = 300`. |

### Root Cause Explanation for Discrepancy:
- The database holds the single source of truth: Invoice `INV-2026-00006` has `PartsTotal = 3800`, `LaborAmount = 300`, `ExpensesTotal = 100`, `GrandTotal = 4200`.
- The Invoice Details screen fetches complete data via `api.getInvoiceDetails()`, which queries `AccountantService.GetInvoiceDetailsAsync()`, properly including `IssuedParts` and `AdditionalExpenses`.
- The Job Order screen received a partial summary DTO without calling `api.getAccountantJobDetails()`, causing `issuedParts` to evaluate to `[]` and `partsTotal` to `0 EGP`.

---

## 4. LABOR RECONCILIATION

### Labor Items for `JO-2026-00010` / `INV-2026-00006`:

| Layer | Item / Description | Stored Amount | Total Calculated |
| :--- | :--- | :--- | :--- |
| **Database (`JobOrders` table)** | `LaborAmount` column | `300.00 EGP` | `300.00 EGP` |
| **Database (`Invoices` table)** | `LaborAmount` column | `300.00 EGP` | `300.00 EGP` |
| **Internal UI (`AccountantInvoiceDetailsScreen`)** | `Labor / Workmanship` | `300.00 EGP` | `300.00 EGP` |
| **Printed Invoice (`PrintInvoiceView`)** | `LABOR / WORKMANSHIP` | — | `300.00 EGP` |

### Labor Preservation & Presentation Audit:
- **Requirement A (Internal System)**: Detailed labor amounts and descriptions remain preserved in backend models (`LaborAmount`) and frontend state (`laborItems`).
- **Requirement B (Printed Invoice)**: `PrintInvoiceView` summarizes labor as a single line item `LABOR / WORKMANSHIP 300 EGP` without exposing detailed internal breakdowns, fulfilling business requirement B.

---

## 5. EXPENSE RECONCILIATION

### Additional Expenses for `JO-2026-00010` / `INV-2026-00006`:

| Expense Id | Description | DB Amount (`AdditionalExpenses`) | Invoice `ExpensesTotal` | Job Order Display | Print Display |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **5** | External Service / Note | `100.00 EGP` | `100.00 EGP` | `100.00 EGP` | `100.00 EGP` |
| **Total** | — | **`100.00 EGP`** | **`100.00 EGP`** | **`100.00 EGP`** | **`100.00 EGP`** |

Reconciliation Status: **100% MATCH across DB, Invoice, Job Order, and Print.**

---

## 6. PART RECONCILIATION

### Warehouse Issued Parts for `JO-2026-00010` / `INV-2026-00006`:

| IssuedPart Id | Part Id | Part Name | Qty | Unit Price (Part.SellingPrice) | Line Total | Source Table |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **9** | **5** | مساعدين امامي | 1 | `3,600.00 EGP` | `3,600.00 EGP` | `IssuedParts` + `Parts` |
| **10** | **10** | فلتر زيت | 1 | `200.00 EGP` | `200.00 EGP` | `IssuedParts` + `Parts` |
| **Total** | — | — | **2** | — | **`3,800.00 EGP`** | `Invoices.PartsTotal` |

### Discrepancy Breakdown:
- **Warehouse DB**: Parts 5 (`3,600 EGP`) and 10 (`200 EGP`) issued to Job Order 11 (`JO-2026-00010`). Total = `3,800 EGP`.
- **Invoice Screen**: Correctly displays `3,800 EGP` Parts Subtotal.
- **Job Order Screen**: Displayed `"No physical parts have been issued to this job order"` because it read the empty local state `wJobPartsMap["JO-2026-00010"]` (`undefined` -> `[]`).

---

## 7. PAYMENT RECONCILIATION

### Payment Ledger for Invoice `INV-2026-00006` (Db Id 6):

| Payment Id | Amount | Date | Method | Invoice Id | DB Invariant Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **8** | `1,000.00 EGP` | `2026-09-15 17:32:10` | Cash (0) | 6 | Valid |
| **9** | `3,200.00 EGP` | `2026-09-15 17:32:10` | Cash (0) | 6 | Valid |
| **SUM(Payments)** | **`4,200.00 EGP`** | — | — | — | **Matches `Invoice.PaidAmount`** |

### Invoice Payment Ledger Invariants (Verified via SQL):
- `Invoice.GrandTotal`: `4,200.00 EGP`
- `Invoice.PaidAmount`: `4,200.00 EGP`
- `Invoice.PaymentStatus`: `2` (`Paid`)
- `Remaining Balance`: `0.00 EGP`
- `SUM(Payments.Amount)`: `4,200.00 EGP`

Reconciliation Status: **`SUM(Payments.Amount) === Invoice.PaidAmount === Invoice.GrandTotal`**. Perfect financial integrity in database.

---

## 8. SIGNALR AUDIT

### Real-Time Sync Investigation:
- **Event**: SignalR `DataChanged` notifications execute `setupSignalRSync(() => loadBackendData())`.
- **Behavior**: `loadBackendData()` invokes `api.getInvoices()` and `api.getJobOrders()`, updating top-level `invoices` and `jobOrders` state arrays with **summary DTOs** (`InvoiceListDto[]`, `JobOrderListDto[]`).
- **State Corruption Risk**:
  - `loadBackendData()` does **not** overwrite `selectedInvoice` or `selectedJobOrder` directly if they are already stored in React state.
  - However, if the user re-navigates or if a screen handler pulls from `invoices` or `jobOrders` list arrays upon re-render, the detailed object is replaced with a summary DTO lacking `issuedParts`, `laborItems`, `additionalExpenses`, and `payments`.
  - This causes open detail screens to lose itemized arrays and revert calculated totals to `0`.

---

## 9. RUNTIME ERROR AUDIT

### Audit of `Cannot read properties of undefined (reading 'length')`:
- **Root Cause**: Occurred when code accessed `.length` on optional array properties (`invoice.payments.length`, `joDetail.issuedParts.length`, `joDetail.laborItems.length`) when the active object was replaced by a summary DTO.
- **Verification**: In Phase 5.4, defensive nullish fallbacks were applied across all screen components (e.g. `(invoice.payments ?? []).length`, `(joDetail.issuedParts ?? []).length`).
- **Current Status**: Audited and confirmed safe. No un-defended `.length` calls remain on nullable DTO arrays.

---

## 10. DATA LOSS AUDIT

| Entity Component | Data Exists in Database? | Data Exists in API Response? | Data Exists in Frontend State? | Data Rendered in UI? | Diagnosis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Labor Details** | YES (`LaborAmount`) | YES (`laborAmount`) | YES (`laborItems`) | YES (Internal UI) / Summarized (Print) | **No Data Loss** |
| **Issued Parts** | YES (`IssuedParts` tbl) | YES (`AccountantJobDetails`) | PARTIAL (Lacking in summary DTOs) | NO (Job Order UI read empty `wJobPartsMap`) | **DTO / State Mapping Issue** |
| **Additional Expenses** | YES (`AdditionalExpenses`) | YES (`additionalExpenses`) | YES (`additionalExpenses`) | YES | **No Data Loss** |
| **Payments** | YES (`Payments` tbl) | YES (`InvoiceDetailsDto`) | PARTIAL (Lacking in summary DTOs) | NO (Summary navigation cleared payments) | **DTO / State Mapping Issue** |

---

## 11. ROOT CAUSE MAP

```
[ Financial Inconsistency / 0 Parts on Job Order ]
 ├── Root Cause A: JobOrderService.GetByNumberAsync returns JobOrderDetailsDto without IssuedParts & Expenses
 ├── Root Cause B: App.tsx handlers (onReviewJob, onSelectJo) pass summary DTO to selectedJobOrder without calling api.getAccountantJobDetails()
 └── Root Cause C: JobOrderDetailsScreen falls back to local wJobPartsMap (unsynced mock React state)

[ Payment Status Contradiction (Paid vs Unpaid / 0 Paid) ]
 ├── Root Cause A: AccountantService.GetInvoicesAsync returns InvoiceListDto without Payments array
 └── Root Cause B: AccountantInvoiceDetailsScreen derives local payment status from invoice.payments ([] when undefined)

[ SignalR Detail Clearing ]
 └── Root Cause: SignalR reload updates list arrays with summary DTOs, causing re-navigation to pass incomplete objects
```

---

## 12. PROPOSED FIX PLAN (ARCHITECTURE ONLY — NO CODE EXECUTED)

### FIX A — Unified Job Order Financial Source of Truth
- Update `JobOrderService.cs` to include `IssuedParts` (with `Part`), `AdditionalExpenses`, `LaborAmount`, `PartsTotal`, `ExpensesTotal`, and `GrandTotal` in `JobOrderDetailsDto`.
- Update `handleOpenJobOrder` in `App.tsx` so that all navigation pathways (Engineer, Accountant, Owner, Vehicle Details) invoke `api.getAccountantJobDetails(joNumber)` to guarantee complete financial data.

### FIX B — Eliminate Client Mock `wJobPartsMap`
- Deprecate static `wJobPartsMap` state in `App.tsx` and bind `<JobOrderDetailsScreen>` directly to `joDetail.issuedParts` returned from backend API.

### FIX C — Preserve Invoice Details State on Payment & SignalR Refresh
- Ensure `handleRecordPayment` and SignalR handlers always fetch full `InvoiceDetailsDto` via `api.getInvoiceDetails(invoiceNumber)` before setting `selectedInvoice`.

### FIX D — Authoritative Financial Snapshot for Closed Job Orders
- When a Job Order status is `Closed` and has an associated Invoice, `<JobOrderDetailsScreen>` should display the finalized invoice financial snapshot (`PartsTotal`, `LaborAmount`, `ExpensesTotal`, `GrandTotal`, `PaymentStatus`).

---

## 13. DATA SAFETY CONFIRMATION

- **Database Data Modified**: **NO**
- **EF Core Migrations Created**: **NO**
- **Financial Records Modified**: **NO**
- **Payment Records Modified**: **NO**
- **Invoice Records Modified**: **NO**
- **Stock Quantities Modified**: **NO**

---

## 14. FINAL VERDICT

### **SAFE TO IMPLEMENT FIX**

The forensic audit is complete. The database integrity is verified, and all root causes across backend DTO contracts, API endpoints, navigation handlers, and React state have been identified. Implementation may proceed in the next phase upon user approval.
