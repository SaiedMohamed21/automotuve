# PHASE 6.1 — FORENSIC AUDIT REPORT
## LABOR / WORKMANSHIP DETAILS: INTERNAL INVOICE vs PRINTED INVOICE

---

### 1. EXECUTIVE SUMMARY

A forensic audit was performed across all system layers (Database, EF Core Entities, Backend Services, DTOs, API JSON response, `api.ts`, Frontend State Normalization, `AccountantInvoiceDetailsScreen`, and `PrintInvoiceView`) to investigate the handling of **Labor / Workmanship** details.

#### Key Findings:
1. **Internal ERP vs Printed Invoice Requirements**:
   - **Requirement A (Internal System)**: When an accountant opens an invoice in the ERP, detailed labor items (e.g., "Change brake pads: 800 EGP", "Engine inspection: 500 EGP") must be displayed itemized.
   - **Requirement B (Printed Invoice)**: Customer-facing printed invoices must only display a single summarized row (`LABOR / WORKMANSHIP 2,000 EGP`).
2. **Current State & Root Cause**:
   - **Database & Backend**: Neither SQL Server, EF Core models (`Invoice`, `JobOrder`), nor DTOs (`CreateInvoiceDto`, `InvoiceDetailsDto`) currently possess a table or property for itemized labor items with amounts. The system stores only a single scalar field: `LaborAmount` (`decimal(18,2)`).
   - **Frontend UI (`AccountantInvoiceDetailsScreen`)**: Contains conditional rendering logic for `invoice.laborItems`. However, because the API backend returns no `laborItems` array (only `laborAmount`), the UI falls back to displaying a synthetic default row titled **"Workshop Labor"** with the total `LaborAmount`.
   - **Printed View (`PrintInvoiceView`)**: Already correctly renders a single summarized `LABOR / WORKMANSHIP` row. It does **not** expose detailed labor descriptions to customers.

---

### 2. LABOR DATA SOURCE

| Concept | SQL Table | Entity / Class | Fields Present | Missing Fields |
| :--- | :--- | :--- | :--- | :--- |
| **Job Order Labor Total** | `JobOrders` | `JobOrder` | `LaborAmount` (decimal) | Itemized labor entries |
| **Invoice Labor Total** | `Invoices` | `Invoice` | `LaborAmount` (decimal) | Itemized labor entries |
| **Job Order Findings** | `JobOrderWorkItems` | `JobOrderWorkItem` | `Item` (nvarchar), `Note`, `IsDeferred` | **`Amount`** (decimal) |
| **Labor Items Table** | *None* | *None* | *None* | Table for itemized labor with description and price |

---

### 3. LABOR DATA FLOW

```
[LABOR INPUT] (Accountant enters single total scalar amount: 2,000 EGP)
      │
      ▼
[BACKEND DTO] (CreateInvoiceDto.LaborAmount = 2000)
      │
      ▼
[BACKEND SERVICE] (AccountantService: jo.LaborAmount = 2000, invoice.LaborAmount = 2000)
      │
      ▼
[DATABASE] (Invoices.LaborAmount = 2000.00; JobOrders.LaborAmount = 2000.00)
      │
      ▼
[INVOICE DETAILS DTO] (InvoiceDetailsDto.LaborAmount = 2000; laborItems field missing)
      │
      ▼
[API JSON] ({"laborAmount": 2000.00})
      │
      ▼
[api.ts NORMALIZATION] (normalized.laborItems = undefined)
      │
      ▼
[REACT STATE] (selectedInvoice.laborItems = undefined)
      │
      ├────────────────────────────────────────┐
      ▼                                        ▼
[INTERNAL INVOICE UI]                   [PRINTED INVOICE]
(AccountantInvoiceDetailsScreen)         (PrintInvoiceView)
Checks `invoice.laborItems`.             Renders summary table:
Since empty -> Fallback renders          `LABOR / WORKMANSHIP: 2,000 EGP`
"Workshop Labor: 2,000 EGP"              (REQUIREMENT B FULLFILLED)
(REQUIREMENT A NEEDS ITEMIZATION)
```

---

### 4. ROOT CAUSE ANALYSES

1. **Why Internal Invoice displays "Workshop Labor"**:
   - **Layer**: Backend DTO & Database Schema / Frontend Fallback.
   - **File**: `DTOs/Accountant/AccountantDtos.cs` & `src/App.tsx` (lines 9202–9220).
   - **Exact Code**:
     - `AccountantDtos.cs`: `CreateInvoiceDto` and `InvoiceDetailsDto` only define `public decimal LaborAmount { get; set; }`.
     - `src/App.tsx`:
       ```tsx
       {invoice.laborItems && invoice.laborItems.length > 0 ? (
         invoice.laborItems.map(...)
       ) : (
         <span>Workshop Labor</span> // FALLBACK TRIGGERED HERE
       )}
       ```
   - **Root Cause**: The backend contract only passes scalar `laborAmount`. Because `laborItems` is missing from the API response, the frontend enters its fallback branch and renders `"Workshop Labor"`.

2. **Why Print Invoice displays summary only**:
   - **Layer**: Frontend Component.
   - **File**: `src/App.tsx` (`PrintInvoiceView`, lines 8949–8967).
   - **Exact Code**:
     ```tsx
     <table style={s.tbl}>
       <tbody>
         <tr>
           <td style={s.td}>Labor / Workmanship</td>
           <td style={s.tdR}>{laborTotal.toLocaleString()} EGP</td>
         </tr>
       </tbody>
     </table>
     ```
   - **Assessment**: This behavior is **correct and intentional** per **Requirement B**. Printed invoices should not show detailed internal breakdown to customers.

---

### 5. DATABASE RECONCILIATION

#### Target Invoice: `INV-2026-00007` (Job Order `JO-2026-00011`)
- **`Invoices` Table Record**:
  - `Id`: `7`
  - `InvoiceNumber`: `INV-2026-00007`
  - `JobOrderId`: `11`
  - `PartsTotal`: `3,950.00`
  - `LaborAmount`: `2,000.00`
  - `ExpensesTotal`: `570.00`
  - `GrandTotal`: `6,520.00`
  - `PaidAmount`: `6,520.00`
  - `PaymentStatus`: `2` (`Paid`)
- **`JobOrders` Table Record**:
  - `Id`: `11`
  - `LaborAmount`: `2,000.00`

---

### 6. INVOICE RECONCILIATION

| Component | Value in DB / API | Value in Internal UI | Value in Print UI | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Parts Total** | 3,950.00 EGP | 3,950.00 EGP | 3,950.00 EGP | **MATCH** |
| **Labor Total** | 2,000.00 EGP | 2,000.00 EGP | 2,000.00 EGP | **MATCH** |
| **Expenses Total** | 570.00 EGP | 570.00 EGP | 570.00 EGP | **MATCH** |
| **Grand Total** | 6,520.00 EGP | 6,520.00 EGP | 6,520.00 EGP | **MATCH** |

---

### 7. PAYMENT RECONCILIATION

- **`Invoice.GrandTotal`**: `6,520.00 EGP`
- **`Invoice.PaidAmount`**: `6,520.00 EGP`
- **`SUM(Payments.Amount)`**: `6,000.00 EGP` (Payment ID 10) + `520.00 EGP` (Payment ID 11) = `6,520.00 EGP`.
- **`Remaining Balance`**: `0.00 EGP`.
- **`PaymentStatus`**: `Paid` (`2`).
- **Verdict**: 100% Reconciled.

---

### 8. INTERNAL VS PRINTED INVOICE COMPARISON

| Feature | Internal ERP (`AccountantInvoiceDetailsScreen`) | Printed Invoice (`PrintInvoiceView`) |
| :--- | :--- | :--- |
| **Target Audience** | Internal Accountant / Manager | External Customer |
| **Labor Presentation Rule** | Detailed Itemization (Requirement A) | Total Summary Only (Requirement B) |
| **Current Behavior** | Shows generic fallback `"Workshop Labor: 2,000 EGP"` due to missing itemized model | Shows `"Labor / Workmanship: 2,000 EGP"` |
| **Required Action** | Add itemized labor support to internal backend & frontend state | **No changes needed** (already compliant) |

---

### 9. SIGNALR AUDIT

- **Status**: **PASS**
- **Explanation**: SignalR notifications (`DataChanged`) trigger `refreshInvoices()` or re-fetching `InvoiceDetailsDto`. The invoice detail state preservation implemented in Phase 6 prevents SignalR from overwriting full invoice details with summary list DTOs.

---

### 10. RUNTIME ERROR AUDIT

- **Status**: **PASS**
- **Explanation**: No `Cannot read properties of undefined (reading 'length')` errors occurred during inspection. Optional chaining (`?.length`) and default arrays (`laborItems || []`) protect against array access crashes.

---

### 11. ROOT CAUSE MAP

| Issue | Layer | File | Function / Property | Root Cause |
| :--- | :--- | :--- | :--- | :--- |
| **Missing Itemized Labor in Internal ERP** | Backend Schema & DTO | `AccountantDtos.cs` | `CreateInvoiceDto.LaborAmount`, `InvoiceDetailsDto.LaborAmount` | Schema design only defines scalar `LaborAmount` (decimal) without a child collection of labor items with descriptions and prices. |
| **"Workshop Labor" Fallback Rendered** | Frontend UI | `src/App.tsx` | `AccountantInvoiceDetailsScreen` (L9202-L9220) | UI checks `invoice.laborItems`. Since API JSON omits `laborItems`, fallback renders `"Workshop Labor"`. |
| **Print Invoice View** | Frontend UI | `src/App.tsx` | `PrintInvoiceView` (L8949-L8967) | Intentionally renders summary row only. **Complies with Requirement B**. |

---

### 12. PROPOSED FIX PLAN (PHASE 6.2 — DESIGN ONLY)

> [!IMPORTANT]
> **STRICTLY PROPOSED ONLY. NO CHANGES HAVE BEEN IMPLEMENTED IN THIS PHASE.**

To support itemized labor internally in the ERP while keeping printed invoices summarized:

#### FIX A: Support Itemized Labor in Job Orders & Invoices (Internal ERP)
- **Database Entity & Schema**:
  - Option 1 (No DB Migration): Allow `JobOrder` and `Invoice` DTOs to represent itemized labor items parsed from stored JSON or structured work items, or create a `JobOrderLaborItem` / `InvoiceLaborItem` table if DB migration is approved.
  - Option 2 (Clean Entity Model): Add `InvoiceLaborItem` / `JobOrderLaborItem` entity (`Id`, `JobOrderId`, `InvoiceId`, `Description`, `Amount`) with EF Core relationship.
- **Backend DTOs (`AccountantDtos.cs`)**:
  - Add `LaborItemDto` (`string Description`, `decimal Amount`).
  - Add `List<LaborItemDto> LaborItems` to `CreateInvoiceDto` and `InvoiceDetailsDto`.
- **Backend Service (`AccountantService.cs`)**:
  - Map itemized `LaborItems` in `CreateInvoiceAsync` and `GetInvoiceDetailsAsync`.
  - Calculate `LaborAmount = LaborItems.Sum(x => x.Amount)`.
- **Frontend (`src/App.tsx`)**:
  - Update `AccountantJobDetailsScreen` labor section to allow entering itemized labor lines.
  - `AccountantInvoiceDetailsScreen` will naturally render itemized lines from `invoice.laborItems`.

#### FIX B: Preserve Printed Invoice Summary (Customer Print)
- **Files**: `src/App.tsx` (`PrintInvoiceView`).
- **Required Action**: **NONE**. `PrintInvoiceView` already renders only the total `LABOR / WORKMANSHIP` summary line (`laborTotal`), fulfilling Requirement B.

---

### 13. FINAL VERDICT

```
[ SAFE TO IMPLEMENT FIX IN PHASE 6.2 (PENDING USER APPROVAL) ]
```

- Audit completed cleanly with **zero side effects**, **zero code changes**, and **zero database modifications**.
- Database and financial ledger values for all invoices remain 100% consistent and intact.
