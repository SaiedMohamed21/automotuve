I want to build the complete OWNER flow for the existing Star Auto Center system.

IMPORTANT:
This is NOT a new system and NOT a new design.

The Engineer flow and Warehouse flow already exist in this project and are already connected.

The OWNER should have access to BOTH of those existing flows, plus additional Owner-only features.

Use the EXISTING screens, components, layouts, styles, navigation, and prototype flows as the source of truth.

Do NOT duplicate existing screens.
Do NOT create separate copies of Engineer or Warehouse screens for the Owner.

The Owner should open the SAME existing screens used by Engineer/Warehouse whenever the functionality is the same.

The difference is that the Owner has broader access and some additional controls.

==================================================
1. OWNER LOGIN / ROLE SELECTION
==================================================

There is already a Role Selection screen containing:

- Engineer
- Warehouse
- Accountant
- Owner

Connect the Owner role to the new Owner flow.

When the user selects:

Owner

→ open the Owner Dashboard.

The existing Engineer and Warehouse role flows must remain unchanged.

When Owner clicks Sign Out:

→ return to the existing Role Selection screen.

Do not create another Role Selection screen.

==================================================
2. OWNER SIDEBAR
==================================================

Create/update the Owner sidebar so the Owner can access all major areas of the system.

Organize the sidebar into clear sections.

ENGINEER SECTION
- Dashboard
- Customers
- Vehicles
- Job Orders

WAREHOUSE SECTION
- Dashboard / Warehouse Dashboard
- Open Job Orders
- Parts
- Stock Update
- Inventory
- Movements

ACCOUNTING SECTION
- Accounting / Invoices
- Payments
- Any existing accounting screens already present in the project

OWNER SECTION
- Reports
- Users
- Settings

IMPORTANT:

Use the existing Engineer and Warehouse screens.

Do NOT duplicate them just because they are now accessible by Owner.

If Owner clicks a Job Order:
→ open the SAME Job Order screen already used by Engineer.

If Owner clicks a Vehicle:
→ open the SAME Vehicle Details screen already used by Engineer.

If Owner clicks a Part:
→ open the SAME Part/Inventory screen already used by Warehouse, but with Owner permissions enabled where required.

If Owner opens accounting:
→ use the existing accounting screens if they already exist.

==================================================
3. OWNER DASHBOARD
==================================================

Create/update the Owner Dashboard.

The Owner Dashboard should give a high-level summary of the entire business.

At the top, show summary cards for:

- Today's Jobs
- Open Jobs
- Completed Jobs
- Closed Jobs
- Stock Alerts

"Today's Jobs" must include ALL Job Order types.

Do NOT limit Today's Jobs to Full Service.

For example, Today's Jobs can include:

- Full Service
- Brake Service
- Oil Change
- AC Service
- Inspection
- Periodic Service
- Any other existing Job Order type

The dashboard should clearly show the total number of Today's Jobs.

==================================================
4. JOB SUMMARY
==================================================

The Owner Dashboard should include a clear Job Summary section.

Show useful job information such as:

- Today's Jobs
- Open Jobs
- Completed Jobs
- Closed Jobs

Use the same Job Order data already used throughout the system.

If the system already has Job Order statuses, use those existing statuses.

Do NOT create new statuses.

"Pending Approval" must NOT exist anywhere in the system.

==================================================
5. STOCK ALERTS
==================================================

The Owner Dashboard should also show Stock Alerts.

Show important inventory conditions such as:

- Out of Stock
- Low Stock
- Critical Stock

Make Stock Alerts clearly visible but secondary to the Job Order information.

The Owner should be able to click a stock alert and navigate to the relevant existing Warehouse/Inventory screen.

For example:

Out of Stock item
→ open the relevant inventory/part screen.

Low Stock
→ open the existing stock/inventory screen.

Do NOT create duplicate inventory screens.

==================================================
6. CUSTOMERS
==================================================

Update the existing Customers screen for Owner access.

Add a clear:

TOTAL CUSTOMERS

summary so the Owner can immediately see the total number of customers.

Keep the existing customer list and functionality.

The Owner should still be able to:

- Search customers
- Open customer details
- View vehicles
- View Job Orders
- Navigate through existing customer flows

Do not redesign the existing customer system unnecessarily.

==================================================
7. VEHICLES
==================================================

Update the existing Vehicles screen for Owner access.

Add a clear:

TOTAL VEHICLES

summary so the Owner can immediately see the total number of registered vehicles.

Keep all existing Vehicle functionality.

Owner should be able to:

- Search vehicles
- Open Vehicle Details
- View owner
- View Service History
- View Deferred Work
- Open previous Job Orders
- Create a New Job Order where the existing flow allows it

Use the SAME Vehicle Details screen already used in the Engineer flow.

==================================================
8. ENGINEER SECTION
==================================================

The Owner must have access to everything currently available in the Engineer flow.

Do NOT recreate Engineer screens.

Use the existing connected Engineer screens.

This includes the existing flows for:

- Customers
- Vehicles
- Job Orders
- Job Order Details
- New Job Order
- Existing Job Orders
- Deferred Work
- Vehicle owner changes
- Job Order printing
- Any other existing Engineer functionality

If a screen is accessible from multiple locations, it must always open the SAME screen/component.

There must not be two different versions of the same screen.

==================================================
9. WAREHOUSE SECTION
==================================================

The Owner must also have access to the complete Warehouse flow.

Use the existing Warehouse screens and prototype connections.

This includes:

- Warehouse Dashboard
- Open Job Orders
- Parts
- Stock Update
- Inventory
- Movements
- Add Part
- Add Part to Job
- Stock-related screens

Keep the existing Warehouse flow.

The Owner should have additional permissions where needed.

==================================================
10. OWNER PART PERMISSIONS
==================================================

When Owner opens a Part:

the Owner should be able to edit inventory-related information that the Warehouse role may not be allowed to change.

For example:

- Minimum Quantity
- Add Quantity
- Purchase Price
- Selling Price

IMPORTANT:

"Add Quantity" means RECEIVING NEW STOCK.

It is NOT an Actual Quantity / Physical Stock Count field.

Example:

Current quantity = 10

Owner receives 12 new units.

Owner enters:

Add Quantity = 12

After saving:

New quantity = 22

The system should ADD the entered quantity to the existing stock.

Do NOT replace the existing quantity with the entered value.

==================================================
11. ADD NEW PART — OWNER
==================================================

When Owner clicks:

+ Add New Part

use the SAME Add New Part screen already used by Warehouse.

Do not create a completely different Add Part screen.

However, Owner should have additional fields for:

- Purchase Price
- Selling Price

The Owner should be able to enter these prices when creating a new part.

Keep the existing Add Part fields and structure.

Do NOT add back fields that were intentionally removed from the existing Warehouse Add Part screen.

Keep the current simplified Add Part structure.

Category should remain a text input, NOT a dropdown/list.

==================================================
12. REPORTS
==================================================

Add an Owner-only:

Reports

section.

The Owner should be able to access reports covering the entire system.

Reports can include information such as:

- Job Orders
- Completed Jobs
- Closed Jobs
- Customers
- Vehicles
- Parts
- Inventory
- Stock Movements
- Sales
- Purchases
- Revenue
- Expenses
- Technician/Engineer activity
- Any other reports supported by the existing system

The Reports area should allow the Owner to choose the report they want.

Use filters/date ranges where appropriate.

Do not invent unnecessary report types if equivalent data already exists in the system.

==================================================
13. USERS MANAGEMENT
==================================================

Add an Owner-only:

Users

screen.

The Owner should be able to manage employees/users.

The existing Users screen should support:

- View users
- Add User
- Assign Role
- Enable/Disable user
- View user status
- View user activity

Roles should include the existing operational roles, such as:

- Engineer
- Technician
- Warehouse
- Accountant

Do NOT create Owner accounts from the normal employee-role selection unless the existing system already supports that.

==================================================
14. ADD USER
==================================================

When Owner clicks:

+ Add User

open the Add User flow.

Owner should be able to enter information such as:

- Name
- Phone
- Email
- Role
- Account status
- Any other existing user information

Role must be selectable from the actual roles supported by the system.

After creating the user:

the new user should immediately appear in the Users list.

==================================================
15. USER STATUS
==================================================

Owner should be able to see whether a user is:

- Active
- Disabled

Owner should be able to enable/disable users.

Changing a user's status must update the SAME user everywhere in the system.

Do not create separate user records for different sections.

==================================================
16. USER ACTIVITY
==================================================

In the Users screen, Owner should be able to see useful activity information.

For example:

- Last activity
- Login time
- Logout time
- Current/active status

If the existing design already has:

Last Activity
Created
Permissions

keep the same structure and extend it logically.

The Owner should be able to understand when a user started and ended their work/session when that information is available.

==================================================
17. SETTINGS
==================================================

Add a complete Owner Settings section.

Owner should be able to configure the workshop/company information.

Include settings such as:

BUSINESS INFORMATION

- Company / Workshop Name
- Logo
- Address
- Phone Number
- Email
- Currency

The Owner should be able to change these values.

Changes should be reflected throughout the system where applicable.

For example:

Changing the company logo
→ update the logo everywhere it is displayed.

Changing the company name
→ update headers/branding where appropriate.

==================================================
18. PRINT SETTINGS
==================================================

Inside Settings, add:

Print Settings

Owner should be able to configure printing behavior.

Allow the Owner to upload/select custom print formats/templates for documents printed from the system.

For example:

- Job Order Print
- Invoice Print
- Other printable system documents

The goal is to allow the Owner to use their own company-specific print format.

Keep the existing printing flows connected.

If a user clicks Print from a Job Order:

→ it should use the configured print format.

Do NOT create duplicate print screens.

==================================================
19. GLOBAL SEARCH
==================================================

The Owner should have access to the same global search system.

Search should be able to find:

- Customers
- Vehicles
- Job Orders
- Parts

depending on the section and existing system behavior.

Use the existing search component.

Do not create multiple different search bars with different behavior unless the screen specifically requires its own search.

==================================================
20. FILTERS AND SORTING
==================================================

Where appropriate, add/keep filters and sorting based on the content of each screen.

For example:

Job Orders:
- Search
- Status filter
- Date sorting

Parts / Inventory:
- Search
- Category filter where appropriate
- Stock/status filtering
- Quantity sorting where appropriate

Users:
- Search
- Role filter
- Active/Disabled filter

Reports:
- Date range
- Relevant category/type filters

Do not add filters where they do not make sense.

==================================================
21. SAME SCREEN = SAME SCREEN
==================================================

THIS IS VERY IMPORTANT.

If the same screen can be reached from multiple locations, it must be ONE shared screen.

For example:

Job Order opened from:
- Owner Dashboard
- Job Orders
- Vehicle Details
- Customer Details
- Warehouse Open Job Orders
- Search
- Deferred Work

must open the SAME Job Order Details screen.

Vehicle Details opened from:
- Vehicles
- Customers
- Job Orders
- Search
- Dashboard

must open the SAME Vehicle Details screen.

Part opened from:
- Dashboard
- Parts
- Inventory
- Stock Update
- Open Job Order
- Search

must open the SAME Part screen.

Do NOT create duplicates.

==================================================
22. KEEP EXISTING PROTOTYPE FLOWS
==================================================

Do NOT break the existing Engineer or Warehouse prototype flows.

The Owner flow should be added on top of the existing system.

Reuse existing navigation and components wherever possible.

All buttons that already navigate somewhere must continue to work.

If multiple buttons are supposed to open the same destination, connect them to the SAME destination.

==================================================
23. DESIGN CONSISTENCY
==================================================

Use the existing visual language of the project.

Keep:

- Sidebar
- Header
- Search bar
- Cards
- Tables
- Buttons
- Inputs
- Dropdowns
- Status badges
- Modals
- Typography
- Spacing
- Border radius
- Icons

consistent with the existing system.

Do not redesign the Engineer or Warehouse screens.

Do not make the Owner screens visually different from the rest of the system.

==================================================
24. RESPONSIVE / SPACING CLEANUP
==================================================

Make sure the Owner screens are properly aligned.

Fix:

- spacing
- margins
- padding
- card alignment
- table alignment
- sidebar spacing
- header spacing
- section spacing
- button alignment

Do not simply copy one screen's layout into another.

Each screen should keep its own appropriate layout.

==================================================
25. IMPORTANT — OWNER IS A SUPERSET ROLE
==================================================

Think of the Owner as:

OWNER = ENGINEER ACCESS + WAREHOUSE ACCESS + ACCOUNTING ACCESS + OWNER MANAGEMENT FEATURES

The Owner should NOT have separate duplicated versions of existing screens.

The Owner should access the existing screens with broader permissions.

Only Owner-specific features should have additional screens:

- Reports
- Users
- Settings
- Owner Dashboard
- Owner-specific controls

==================================================
26. FINAL PROTOTYPE FLOW

The final flow should work like this:

ROLE SELECTION
    ↓
OWNER
    ↓
OWNER DASHBOARD
    ├── Customers
    │     └── Customer Details
    │           └── Vehicles
    │                 └── Job Orders
    │
    ├── Vehicles
    │     └── Vehicle Details
    │           ├── Job Orders
    │           ├── Deferred Work
    │           └── New Job Order
    │
    ├── Job Orders
    │     └── Job Order Details
    │
    ├── Engineer Section
    │     └── USE EXISTING ENGINEER FLOW
    │
    ├── Warehouse Section
    │     └── USE EXISTING WAREHOUSE FLOW
    │
    ├── Accounting Section
    │     └── USE EXISTING ACCOUNTING FLOW
    │
    ├── Reports
    │
    ├── Users
    │     └── Add User
    │
    └── Settings
          ├── Business Information
          └── Print Settings

SIGN OUT
    ↓
EXISTING ROLE SELECTION SCREEN

==================================================
FINAL REQUIREMENT
==================================================

Build the Owner flow INTO THE EXISTING SYSTEM.

Do not rebuild the entire application.

Do not duplicate existing Engineer/Warehouse screens.

Do not create parallel versions of the same screen.

Reuse existing screens and components.

Connect every relevant button, card, row, sidebar item, search result, and action to the correct existing destination.

The final result should feel like ONE unified system with three levels of access:

ENGINEER
WAREHOUSE
OWNER

with ACCOUNTING available as its own section.

The Owner has the broadest access and management capabilities.

Most importantly:

ONE FUNCTION = ONE SCREEN.

If the same function is accessed from different places, all entry points must lead to the SAME screen and SAME prototype destination.

Keep the existing Engineer and Warehouse flows intact while adding the complete Owner flow on top of them.