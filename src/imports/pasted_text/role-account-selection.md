I want to add a ROLE / ACCOUNT SELECTION screen as the ENTRY POINT of the entire Auto Center Management System.

IMPORTANT:
Create this as the MAIN ENTRY SCREEN before accessing any role-specific flow.

The screen should have the same concept and structure as the Role Selection screen I described.

========================================
ROLE SELECTION
========================================

Title:
Star Auto Center

Subtitle:
Workshop Management System

Section:
SELECT YOUR ROLE

Show these 4 account types:

1. Engineer
Description:
Create job orders, inspect vehicles, print job cards

2. Warehouse
Description:
Manage parts, issue stock, track movements

3. Accountant
Description:
Finalize jobs, create invoices, record payments

4. Owner
Description:
Full access: dashboard, reports, pricing, users

Each role should be presented as a clickable account/role card or row with:
- Role icon
- Role name
- Short description
- Arrow / navigation indicator

========================================
ENGINEER FLOW
========================================

When the user clicks:

Engineer

Open the EXISTING Engineer flow that has already been created.

Do NOT create a new Engineer flow.

The Engineer account should enter the existing Engineer screens and navigation.

The existing Engineer flow includes things such as:

Dashboard
Customers
Vehicles
Job Orders
Vehicle Details
New Job Order
Job Order Details
Deferred Work
etc.

Preserve the existing Engineer flow exactly as it currently exists.

========================================
WAREHOUSE FLOW
========================================

When the user clicks:

Warehouse

Open the Warehouse flow.

IMPORTANT:
I WILL PROVIDE THE WAREHOUSE SCREENS SEPARATELY.

Do NOT invent or create Warehouse screens now if they do not already exist.

When I provide the Warehouse screens, connect:

Role Selection
↓
Warehouse
↓
Warehouse Dashboard / Main Warehouse Screen
↓
Warehouse-specific screens

Use the exact Warehouse screens and navigation that I provide later.

Do NOT connect Warehouse to Engineer screens.

Do NOT duplicate Engineer screens for Warehouse.

========================================
ACCOUNTANT FLOW
========================================

When the user clicks:

Accountant

Connect to the Accountant flow.

If Accountant screens already exist, use them.

If I provide Accountant screens later, connect the Account Selection screen to those existing screens.

Do NOT create duplicate Accountant screens.

========================================
OWNER FLOW
========================================

When the user clicks:

Owner

Connect to the Owner flow.

If Owner screens already exist, use them.

If I provide Owner screens later, connect the Account Selection screen to those existing screens.

Do NOT create duplicate Owner screens.

========================================
IMPORTANT ROLE SEPARATION
========================================

Each account represents a different role with its own workflow.

The role selection screen is only the entry point.

The flows should be separated logically:

Engineer
→ Engineer Flow

Warehouse
→ Warehouse Flow

Accountant
→ Accountant Flow

Owner
→ Owner Flow

Do NOT mix screens between roles unless a screen is intentionally shared.

========================================
EXISTING ENGINEER FLOW
========================================

The Engineer flow is already built.

DO NOT rebuild it.

DO NOT duplicate it.

Only connect:

Role Selection
→ Engineer
→ Existing Engineer Flow

All existing Engineer navigation and prototype interactions must remain unchanged.

========================================
FUTURE SCREENS
========================================

I will continue providing screens for:

Warehouse
Accountant
Owner

When I provide new screens:

1. Use the provided screens as the source of truth.
2. Connect them to the correct role.
3. Preserve their existing design.
4. Preserve their existing navigation.
5. Do not create duplicate screens.
6. Do not redesign them unless I explicitly ask.
7. Connect them into the existing role-based structure.

For example, when I provide Warehouse screens:

Role Selection
→ Warehouse
→ Warehouse Main Screen
→ Warehouse Screens

The same principle applies to Accountant and Owner.

========================================
DESIGN RULE
========================================

The Role Selection screen should be visually consistent with the existing Auto Center system.

Keep it clean, professional, and simple.

Use the existing design language where appropriate.

Do not redesign the existing Engineer screens.

========================================
FINAL STRUCTURE
========================================

MAIN ENTRY
│
└── ROLE SELECTION
      │
      ├── Engineer
      │     └── EXISTING ENGINEER FLOW
      │
      ├── Warehouse
      │     └── WAREHOUSE FLOW
      │           (screens I will provide)
      │
      ├── Accountant
      │     └── ACCOUNTANT FLOW
      │           (screens I will provide)
      │
      └── Owner
            └── OWNER FLOW
                  (screens I will provide)

IMPORTANT:

The Role Selection screen is the single entry point for the application.

Make the prototype connections so that when I provide the Warehouse, Accountant, and Owner screens later, I can connect them directly to their corresponding role without rebuilding the existing project.

Do not create duplicate flows.
Do not rebuild the Engineer flow.
Keep the entire project as ONE connected prototype with separate role-based flows.