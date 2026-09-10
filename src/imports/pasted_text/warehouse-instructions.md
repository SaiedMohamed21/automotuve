I am now going to provide you with the EXISTING Warehouse screens for the Auto Center Management System.

Your job is to ADD, CONNECT, AND ORGANIZE these Warehouse screens into ONE complete Warehouse flow inside the existing project.

IMPORTANT:
I will provide the Warehouse screens in multiple batches.
I still have 2 more Warehouse screens that I will provide later.

DO NOT consider the flow finished until all screens I provide are connected.

==================================================
1. WAREHOUSE ROLE FLOW
==================================================

The existing Role Selection screen has these roles:

- Engineer
- Warehouse
- Accountant
- Owner

When the user clicks:

Warehouse

they must enter the Warehouse flow using the Warehouse screens I provide.

Do NOT connect Warehouse to the Engineer flow.

The structure should be:

Role Selection
↓
Warehouse
↓
Warehouse Main / Dashboard
↓
Warehouse Screens
↓
Warehouse Details / Actions

Use the screens I provide as the source of truth for the Warehouse workflow.

==================================================
2. USE MY PROVIDED SCREENS
==================================================

I will provide existing Warehouse screens that I have already designed.

IMPORTANT:

Use these screens as they are.

Do NOT redesign them from scratch.

Do NOT create duplicate versions of the same screen.

Do NOT replace my screens with newly generated alternatives.

Connect the screens I provide into ONE coherent prototype flow.

If a screen is missing because I have not provided it yet, DO NOT invent a replacement.

Wait for the additional screens I provide later and connect them to the existing flow.

==================================================
3. FIX SPACING AND ALIGNMENT
==================================================

Some of the screens have spacing, alignment, and sizing that I manually adjusted and may now be inconsistent.

Clean up the layout while preserving the intended design.

Fix:
- Inconsistent spacing
- Uneven margins
- Misaligned cards
- Misaligned tables
- Incorrect gaps between sections
- Inconsistent padding
- Incorrect button alignment
- Inconsistent input heights
- Inconsistent header spacing
- Inconsistent sidebar/content spacing
- Text alignment issues
- Elements that are too close or too far apart

IMPORTANT:

Do NOT change the overall design.

Do NOT redesign the UI.

Only normalize spacing, alignment, sizing, and layout consistency while preserving my existing visual design.

==================================================
4. SEARCH
==================================================

Analyze EVERY Warehouse screen individually.

If a screen contains a list/table or a large amount of searchable data, add or preserve an appropriate Search field.

Do NOT automatically add Search to every screen.

Only add Search where it is useful and logically needed.

Examples may include:

Parts / Inventory
→ Search by part name, part number, SKU, etc.

Stock / Items
→ Search by item name or code

Stock Movements
→ Search by part/item or reference

Suppliers
→ Search by supplier name

Purchase Orders
→ Search by PO number or supplier

Use the information and purpose of each screen to determine what should be searchable.

==================================================
5. FILTERS
==================================================

Analyze each Warehouse screen and add filters only when they make sense.

Examples:

Category
→ Filter by Category

Type
→ Filter by Type

Status
→ Filter by Status

Supplier
→ Filter by Supplier

Location
→ Filter by Warehouse / Location

Do NOT add unnecessary filters.

Each filter must be relevant to the data displayed on that screen.

==================================================
6. SORTING
==================================================

Analyze each screen and determine whether sorting is useful.

Use appropriate sorting options based on the displayed data.

Examples:

DATE:
- Newest First
- Oldest First

QUANTITY:
- Highest Quantity
- Lowest Quantity

AVAILABLE:
- Highest Available
- Lowest Available

STATUS:
- Status A-Z / logical status order where appropriate

TYPE:
- A-Z where appropriate

CATEGORY:
- A-Z where appropriate

IMPORTANT:

Do not blindly add every sort option to every screen.

Only add sorting options that make sense for the columns/data shown on that specific screen.

For tables, sorting can be placed in the relevant column header or as a compact Sort control.

==================================================
7. SMART SCREEN-BY-SCREEN ANALYSIS
==================================================

For EACH Warehouse screen I provide:

First understand:
- What is the purpose of this screen?
- What data is displayed?
- Is it a list, table, dashboard, details page, form, or action screen?
- What does the user need to find?
- What does the user need to filter?
- What does the user need to sort?
- What actions can lead to another screen?

Then implement only the relevant controls.

For example:

If the screen contains inventory items:
→ Search
→ Category Filter
→ Quantity / Available Sort

If the screen contains stock movements:
→ Search
→ Type Filter
→ Date Sort
→ Status Filter if applicable

If the screen contains purchase orders:
→ Search
→ Status Filter
→ Supplier Filter if applicable
→ Date Sort

If the screen contains suppliers:
→ Search
→ Type/Category Filter if applicable
→ Name Sort if useful

Use the actual content of each screen to decide.

==================================================
8. CONNECT ALL BUTTONS AND ACTIONS
==================================================

Every existing interactive action should lead somewhere logical.

Examples:

View
→ Related Details Screen

View Details
→ Details Screen

Edit
→ Existing Edit Screen / State

Add
→ Existing Add/Create Screen

Create
→ Existing Create Screen

Back
→ Previous logical screen

Cancel
→ Previous screen / close modal

Save
→ Appropriate next screen/state

Close
→ Close modal / return to previous state

Do NOT leave important buttons disconnected.

==================================================
9. MULTIPLE BUTTONS GOING TO THE SAME SCREEN
==================================================

IMPORTANT:

If multiple buttons/actions have the SAME destination, connect all of them to the SAME existing screen.

Do NOT create duplicate screens.

Example:

Inventory
→ View Part
→ Part Details

Stock Movement
→ View Part
→ Part Details

Purchase Order
→ View Part
→ Part Details

All of these should open the SAME existing Part Details screen if that is the correct destination.

The same principle applies to any Warehouse screen.

ONE destination screen should be reused wherever the same information/action is being viewed.

==================================================
10. DATA CONTEXT
==================================================

When the user clicks an item from a list/table, the next screen should represent THAT selected item.

For example:

Part A
→ View
→ Part Details for Part A

Part B
→ View
→ Part Details for Part B

Do not mix the data between items.

Maintain logical context throughout the prototype.

==================================================
11. BACK NAVIGATION
==================================================

Back navigation must make sense based on where the user came from.

Example:

Warehouse
→ Inventory
→ Part Details
→ Back
→ Inventory

Warehouse
→ Stock Movements
→ Movement Details
→ Back
→ Stock Movements

Warehouse
→ Purchase Orders
→ Purchase Order Details
→ Back
→ Purchase Orders

Do not create unnecessary navigation jumps.

==================================================
12. WAREHOUSE SIDEBAR
==================================================

Use the Warehouse navigation that exists in the provided Warehouse screens.

Do NOT copy the Engineer navigation into Warehouse unless the screens clearly require shared navigation.

Keep the Warehouse navigation logically separate from Engineer.

The existing Role Selection remains the entry point:

Role Selection
→ Warehouse
→ Warehouse Flow

==================================================
13. SIGN OUT
==================================================

The existing Warehouse "Sign out" action must return to the EXISTING Role Selection screen.

Flow:

Warehouse
→ Sign out
→ Role Selection

Do NOT create another Role Selection screen.

==================================================
14. FUTURE WAREHOUSE SCREENS
==================================================

I still have 2 more Warehouse screens to provide.

IMPORTANT:

When I provide those screens later:

- Add them to the EXISTING Warehouse flow.
- Do NOT rebuild the Warehouse flow.
- Do NOT create a second Warehouse flow.
- Do NOT duplicate existing screens.
- Connect them to the correct existing screens/actions.
- Reuse existing components and destination screens where appropriate.
- Apply the same Search / Filter / Sort logic when relevant.
- Maintain consistent spacing and alignment with the screens already connected.

The flow must remain expandable.

==================================================
15. COMPONENT CONSISTENCY
==================================================

If the same component appears across multiple Warehouse screens, keep it consistent.

Examples:

- Search Bar
- Filter
- Sort Dropdown
- Buttons
- Table
- Status Badge
- Cards
- Input Fields
- Dropdowns
- Header
- Sidebar
- Modals

If the same component is used in multiple screens, use the same component/variant instead of creating visually different copies.

==================================================
16. DO NOT OVER-DESIGN
==================================================

Do NOT add features just because they are possible.

Do NOT add:
- Unnecessary filters
- Unnecessary sorting
- Unnecessary search bars
- Extra buttons
- Extra cards
- Extra screens

Only add UI controls when the screen's content logically requires them.

==================================================
17. FINAL PROTOTYPE STRUCTURE
==================================================

The overall structure should become:

ROLE SELECTION
│
├── Engineer
│   └── Existing Engineer Flow
│
├── Warehouse
│   └── Warehouse Flow
│       ├── Warehouse Main
│       ├── Inventory / Parts
│       ├── Stock
│       ├── Stock Movements
│       ├── Purchase Orders
│       ├── Suppliers
│       ├── Details Screens
│       └── Additional Warehouse Screens I provide later
│
├── Accountant
│   └── Accountant Flow
│
└── Owner
    └── Owner Flow

Warehouse must remain ONE connected flow.

==================================================
18. MOST IMPORTANT RULE
==================================================

MY PROVIDED WAREHOUSE SCREENS ARE THE SOURCE OF TRUTH.

Your job is to:

1. Connect them.
2. Fix their spacing/alignment.
3. Add Search where genuinely needed.
4. Add Filters where genuinely needed.
5. Add Sort controls where genuinely needed.
6. Connect every important button/action.
7. Reuse the same destination screen when multiple actions lead to the same information.
8. Preserve the existing design.
9. Avoid duplicate screens.
10. Keep the flow ready for the 2 additional Warehouse screens I will provide later.

DO NOT CREATE A NEW WAREHOUSE DESIGN.

DO NOT CREATE A SECOND WAREHOUSE FLOW.

BUILD ONE CONNECTED WAREHOUSE FLOW USING MY EXISTING SCREENS.