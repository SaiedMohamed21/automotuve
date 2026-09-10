IMPORTANT — MODIFY THE EXISTING OWNER FLOW ONLY.
DO NOT REBUILD THE SYSTEM.
DO NOT CREATE DUPLICATE SCREENS.
DO NOT CHANGE THE EXISTING ENGINEER OR WAREHOUSE FLOWS.

I need you to FIX the existing OWNER flow based on the following corrections.

==================================================
1. OWNER MUST HAVE A REAL OWNER DASHBOARD
==================================================

The Owner currently has a page called "Overview".

Rename this to:

Dashboard

This must be the actual Owner Dashboard.

Do NOT use the Engineer Dashboard.
Do NOT use the Warehouse Dashboard.
Do NOT show either of those dashboards inside the Owner flow.

The Owner Dashboard must be an Owner-specific dashboard that summarizes the whole workshop.

The Dashboard should include:

SUMMARY CARDS:
- Today's Jobs
- Open Jobs
- Completed Jobs
- Closed Jobs
- Stock Alerts

IMPORTANT:
Today's Jobs must include ALL Job Order types.

Below the summary cards, show:

JOB SUMMARY
- Today's Jobs
- Open Jobs
- Completed Jobs
- Closed Jobs

STOCK ALERTS
- Low Stock
- Out of Stock
- Critical stock items

The Owner Dashboard should give the Owner a high-level view of the entire business.

Keep the existing visual style of the project.

==================================================
2. REMOVE ENGINEER AND WAREHOUSE DASHBOARDS FROM OWNER
==================================================

The Owner should NOT have:

- Engineer Dashboard
- Warehouse Dashboard

inside the Owner navigation.

There must be only ONE Dashboard entry for the Owner:

Dashboard

The Engineer Dashboard remains available only in the Engineer role.

The Warehouse Dashboard remains available only in the Warehouse role.

DO NOT delete the Engineer or Warehouse Dashboard screens from the project.

Only remove them from the Owner navigation.

==================================================
3. DO NOT PUT WAREHOUSE "OPEN JOB ORDERS" IN OWNER SIDEBAR
==================================================

The screen currently called:

Open Job Orders

is a Warehouse screen.

It belongs to the Warehouse flow.

Do NOT show "Open Job Orders" as a separate Owner sidebar item.

Do NOT duplicate this screen for Owner.

The Owner can still access Job Orders through the existing Owner/Engineer Job Orders flow.

If the Owner needs to inspect a Job Order from the Owner Dashboard, search, vehicle, customer, or Job Orders:

→ open the SAME existing Job Order Details screen.

ONE JOB ORDER SCREEN ONLY.

==================================================
4. OWNER SIDEBAR STRUCTURE
==================================================

Fix the Owner sidebar so it is clean and does not expose duplicate operational dashboards.

Use this structure:

OWNER

- Dashboard
- Customers
- Vehicles
- Job Orders

WAREHOUSE

- Parts
- Inventory
- Stock Update
- Movements

ACCOUNTING

- Invoices / Accounting
- Payments
- Other existing accounting screens

MANAGEMENT

- Reports
- Users
- Settings

IMPORTANT:

Do NOT add:

- Engineer Dashboard
- Warehouse Dashboard
- Open Job Orders

as separate Owner sidebar entries.

The Owner can access the functionality through the relevant existing screens.

==================================================
5. ENGINEER FUNCTIONALITY FOR OWNER
==================================================

The Owner still needs access to Engineer functionality.

However, do NOT duplicate Engineer screens.

For example:

Owner → Job Orders
→ SAME Job Orders screen already used by Engineer

Owner → Job Order
→ SAME Job Order Details screen already used by Engineer

Owner → Vehicles
→ SAME Vehicle Details screen already used by Engineer

Owner → Customers
→ SAME Customer Details screen already used by Engineer

The Owner is simply another role that has permission to access these existing screens.

ONE FUNCTION = ONE SCREEN.

==================================================
6. WAREHOUSE FUNCTIONALITY FOR OWNER
==================================================

The Owner needs access to Warehouse functionality, but do NOT duplicate Warehouse screens.

For example:

Owner → Parts
→ SAME Parts screen used by Warehouse

Owner → Inventory
→ SAME Inventory screen used by Warehouse

Owner → Stock Update
→ SAME Stock Update screen used by Warehouse

Owner → Movements
→ SAME Movements screen used by Warehouse

The Owner gets additional permissions where required.

Do NOT create separate Owner versions of these screens.

==================================================
7. FIX "ADD NEW PART" FOR OWNER
==================================================

The existing Add New Part screen is shared with Warehouse.

KEEP the same Add New Part screen.

Do NOT create a second Add New Part screen.

However, when the user is Owner, the form must include these additional fields:

- Purchase Price (EGP)
- Selling Price (EGP)

These fields must be visible and editable for Owner.

Example:

PART INFORMATION
- Part Name
- Part Number
- OEM Number
- Brand
- Category
- Compatible Make
- Compatible Model
- Minimum Stock
- Initial Quantity
- Purchase Price (EGP)
- Selling Price (EGP)

IMPORTANT:

Category must remain a TEXT INPUT.

Do NOT turn Category into a dropdown/list.

Also keep the fields that were intentionally removed previously removed.

DO NOT re-add:

- Compatible Year
- Storage Location
- Any old unnecessary fields

unless they already exist in the current approved Add New Part design.

==================================================
8. FIX PART / STOCK UPDATE LOGIC
==================================================

For Owner, "Add Quantity" means receiving NEW stock.

It is NOT Actual Quantity.

Example:

Current Stock = 10

New shipment = 12

Owner enters:

Add Quantity = 12

After saving:

Stock = 22

The entered quantity must be ADDED to the existing quantity.

Do NOT replace the current quantity with the entered value.

==================================================
9. SETTINGS — ADD LOGO UPLOAD
==================================================

The current Owner Settings screen is incomplete.

Add a proper Business Information section.

Owner must be able to edit:

- Company / Workshop Name
- Logo
- Address
- Phone Number
- Email
- Currency

For Logo:

Add:

UPLOAD LOGO

with an upload control.

The Owner should be able to:

- Upload a logo
- Preview the logo
- Replace the logo
- Remove/change the logo

The uploaded logo should be treated as the main workshop logo.

It should be reflected across the system wherever the workshop logo is displayed.

Do NOT create a separate logo-management screen.

Keep it inside Settings.

==================================================
10. PRINT SETTINGS
==================================================

Inside Settings, keep/add:

Print Settings

The Owner should be able to upload/select custom print formats/templates for documents.

Examples:

- Job Order
- Invoice
- Other printable documents

The existing Print buttons throughout the system should continue to use the configured print format.

Do NOT create duplicate print screens.

==================================================
11. OWNER USERS
==================================================

Keep the Owner Users screen.

Owner should be able to:

- View users
- Add User
- Assign role
- Enable/Disable user
- View Active/Disabled status
- View user activity

Roles can include the existing operational roles:

- Engineer
- Technician
- Warehouse
- Accountant

Do not create duplicate Users screens.

==================================================
12. OWNER REPORTS
==================================================

Keep the Owner Reports section.

Owner should be able to access reports from across the system.

Reports can include:

- Job Orders
- Customers
- Vehicles
- Inventory
- Stock Movements
- Sales
- Purchases
- Revenue
- Expenses
- Employee activity
- Other existing system reports

Use the existing data and existing screens where possible.

==================================================
13. OWNER DASHBOARD NAVIGATION
==================================================

Make sure the Owner Dashboard cards are clickable where appropriate.

For example:

Today's Jobs
→ Job Orders filtered to today's jobs

Open Jobs
→ Job Orders filtered to Open

Completed Jobs
→ Job Orders filtered to Completed

Closed Jobs
→ Job Orders filtered to Closed

Stock Alerts
→ existing Inventory/Parts screen

Clicking a specific Job Order
→ SAME existing Job Order Details screen.

Do not create duplicate destination screens.

==================================================
14. REMOVE "PENDING APPROVAL"
==================================================

"Pending Approval" is NOT part of our system.

Remove it completely from the entire system.

Do not show it as:

- Job Order status
- Filter
- Badge
- Dashboard statistic
- Dropdown option
- Table status
- Workflow step

Use only the valid statuses already defined in the system.

==================================================
15. KEEP ROLE FLOWS SEPARATE
==================================================

The system has multiple roles.

ROLE SELECTION:

Engineer
→ Engineer Dashboard
→ Engineer flow

Warehouse
→ Warehouse Dashboard
→ Warehouse flow

Accountant
→ Accountant flow

Owner
→ OWNER Dashboard
→ Owner flow

Do NOT mix the dashboards between roles.

The Owner can access operational screens from Engineer/Warehouse because of permissions, but the Owner Dashboard itself must remain unique to Owner.

==================================================
16. NO DUPLICATES
==================================================

This is extremely important.

If the same screen already exists, REUSE IT.

Do NOT create:

Owner Job Orders + Engineer Job Orders

Owner Vehicle Details + Engineer Vehicle Details

Owner Parts + Warehouse Parts

Owner Add New Part + Warehouse Add New Part

Owner Open Job Orders + Warehouse Open Job Orders

Instead, use the existing screen and make it accessible according to the user's role.

ONE FUNCTION = ONE SCREEN.

==================================================
17. FINAL OWNER SIDEBAR

The final Owner sidebar should look conceptually like this:

OWNER
Dashboard
Customers
Vehicles
Job Orders

WAREHOUSE
Parts
Inventory
Stock Update
Movements

ACCOUNTING
Invoices
Payments
[existing accounting items]

MANAGEMENT
Reports
Users
Settings

Do NOT show:

Engineer Dashboard
Warehouse Dashboard
Open Job Orders

inside the Owner sidebar.

==================================================
18. IMPORTANT — DO NOT CHANGE EXISTING DESIGNS UNNECESSARILY
==================================================

I am not asking you to redesign the whole application.

Only fix the Owner flow according to these requirements.

Keep the existing:

- typography
- colors
- cards
- tables
- buttons
- spacing
- sidebar style
- header
- modals
- search components
- existing screens

Fix spacing/alignment only where necessary.

Do not redesign existing Engineer or Warehouse screens.

==================================================
FINAL GOAL
==================================================

The final prototype must behave like ONE unified system.

Engineer:
→ Engineer Dashboard
→ Engineer functionality

Warehouse:
→ Warehouse Dashboard
→ Warehouse functionality

Owner:
→ OWNER Dashboard
→ Customers
→ Vehicles
→ Job Orders
→ Warehouse functionality through the EXISTING Warehouse screens
→ Accounting functionality
→ Reports
→ Users
→ Settings

The Owner Dashboard must be a REAL Owner Dashboard, not Engineer Dashboard, not Warehouse Dashboard, and not simply a renamed "Overview".

The Owner must have Purchase Price + Selling Price in Add New Part.

Settings must have Logo Upload.

Warehouse-only "Open Job Orders" must NOT appear in the Owner sidebar.

Most importantly:

DO NOT CREATE DUPLICATE SCREENS.

REUSE THE EXISTING SCREENS AND CONNECT THEM CORRECTLY THROUGH THE OWNER ROLE.

After making these corrections, check the entire prototype and make sure every button, sidebar item, card, table row, search result, and action leads to the correct existing screen.