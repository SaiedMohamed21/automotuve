MODIFY THE EXISTING "STOCK UPDATE" SCREEN.

IMPORTANT:
Do NOT create a new screen.
Modify the existing Stock Update screen directly.

The current screen is incorrectly designed as an "Actual Quantity / Physical Stock Count" screen.

I DO NOT WANT ACTUAL QUANTITY HERE.

This screen is for RECEIVING NEW STOCK and ADDING QUANTITY to the existing inventory.

==================================================
1. CHANGE THE PURPOSE OF THE SCREEN
==================================================

Change the screen behavior from:

"Actual Quantity"

to:

"Add Quantity"

The Warehouse employee uses this screen when NEW STOCK arrives.

Example:

Current System Qty = 42

New shipment arrives = 12

Employee enters:

Add Qty = 12

The system calculates:

New Quantity = 42 + 12 = 54

After saving:

System Qty becomes 54.

==================================================
2. COLUMN STRUCTURE
==================================================

Keep the existing table design and modify the relevant column.

Current:

PART NAME
PART NUMBER
LOCATION
SYSTEM QTY
ACTUAL QTY
DIFFERENCE
NOTES

Change it to:

PART NAME
PART NUMBER
LOCATION
SYSTEM QTY
ADD QTY
NEW QTY
NOTES

Remove the concept of:

ACTUAL QTY

Remove:

DIFFERENCE

Replace them with:

ADD QTY
NEW QTY

==================================================
3. ADD QTY INPUT
==================================================

The "ADD QTY" field must be an editable numeric input.

This represents:

"How many new units were received?"

Example:

System Qty: 42

Add Qty input:
[ 12 ]

New Qty:
54

The employee should NEVER have to enter the final inventory quantity manually.

They only enter the quantity received.

==================================================
4. AUTOMATIC CALCULATION
==================================================

Calculate:

NEW QTY = SYSTEM QTY + ADD QTY

Examples:

System Qty 42
Add Qty 12
→ New Qty 54

System Qty 5
Add Qty 10
→ New Qty 15

System Qty 0
Add Qty 20
→ New Qty 20

System Qty 18
Add Qty 0
→ New Qty 18

The New Qty value should update immediately when Add Qty changes.

Make the New Qty read-only.

The user should not manually edit New Qty.

==================================================
5. EMPTY STATE
==================================================

If Add Qty is empty:

Show:

—

or the appropriate empty state.

Do NOT treat an empty input as an actual stock quantity.

==================================================
6. VALIDATION
==================================================

Add Qty must:

- Accept numbers only
- Accept 0 or positive quantities
- NOT accept negative numbers
- NOT accept text
- NOT allow invalid quantities

If the user enters an invalid value:

Show a clear validation message.

Example:

"Enter a valid quantity."

==================================================
7. SAVE BEHAVIOR
==================================================

When the user clicks:

"Save"

or the existing Save button:

For every row where Add Qty > 0:

Update inventory:

New System Qty = Old System Qty + Add Qty

Example:

Before:
System Qty = 42

Employee enters:
Add Qty = 12

After Save:
System Qty = 54

==================================================
8. STOCK MOVEMENT
==================================================

Every saved stock addition must create a Stock Movement record.

Movement type:

STOCK IN

Quantity:

+12

The movement should contain the appropriate:

- Part
- Part Number
- Quantity
- Movement Type
- Date
- Reference
- User/Warehouse employee if the existing system supports it

This must connect to the EXISTING Stock Movements screen.

Do NOT create a new Stock Movements screen.

==================================================
9. EXAMPLE
==================================================

For:

Engine Oil 5W-30 4L

System Qty:
42

Employee receives:
12 units

Employee enters:

Add Qty:
12

The UI immediately shows:

New Qty:
54

After Save:

System Qty:
54

And Stock Movements contains:

Engine Oil 5W-30 4L
Stock In
+12
[Current Date]
[Existing Reference]

==================================================
10. DO NOT USE ACTUAL QUANTITY LOGIC
==================================================

This screen is NOT a physical inventory count.

Do NOT calculate:

Actual Qty - System Qty

Do NOT show:

Difference

Do NOT ask the user to enter the total quantity physically present.

The employee only enters:

QUANTITY RECEIVED

The system adds it to the current inventory.

==================================================
11. KEEP THE EXISTING DESIGN
==================================================

Keep the current visual design of the Stock Update screen.

Keep:

- Sidebar
- Header
- Search Bar
- Table
- Part Name
- Part Number
- Location
- System Qty
- Notes
- Save button
- Add New Part button

Only modify the inventory-update logic and the affected table columns.

Do NOT redesign the entire screen.

==================================================
12. SEARCH
==================================================

Keep the existing Search Bar.

It should search by:

- Part Name
- Part Number
- SKU
- Brand

Use the existing search behavior if already implemented.

==================================================
13. ADD NEW PART
==================================================

Keep the existing:

"+ Add New Part"

button.

It should continue opening the EXISTING Add New Part flow.

Do NOT create a duplicate Add New Part screen.

==================================================
14. FLOW CONNECTION
==================================================

Connect the Stock Update screen to the existing Warehouse flow.

The intended flow is:

Warehouse Dashboard
↓
Stock Update
↓
Select/Search Part
↓
Enter Add Qty
↓
New Qty calculated automatically
↓
Save
↓
Inventory updated
↓
Stock Movement created
↓
Existing Stock Movements screen reflects the new Stock In transaction

==================================================
15. INVENTORY CONSISTENCY
==================================================

The quantity must remain consistent everywhere in the system.

If:

System Qty = 42
Add Qty = 12

After saving:

Inventory = 54

The same updated quantity should be reflected in:

- Stock Update
- Inventory
- Parts
- Dashboard stock indicators where applicable
- Stock Movements history

Do NOT create conflicting quantities between screens.

==================================================
16. DO NOT CREATE DUPLICATES
==================================================

Do NOT create:

- New Stock Update screen
- Stock Update V2
- Actual Quantity screen
- New Inventory screen
- New Stock Movements screen

Modify and reuse the existing screens.

==================================================
17. FINAL UI CHECK
==================================================

Verify:

✓ "Actual Qty" has been removed.

✓ "Difference" has been removed.

✓ "Add Qty" is the editable input.

✓ "New Qty" replaces the Difference/Actual Quantity logic.

✓ New Qty = System Qty + Add Qty.

✓ New Qty updates immediately.

✓ New Qty is read-only.

✓ Add Qty accepts only valid non-negative numbers.

✓ Saving updates the inventory quantity.

✓ Saving creates a Stock In movement.

✓ Stock Movement quantity is positive.

✓ Existing Stock Movements screen receives the transaction.

✓ Existing Inventory/Parts quantities stay synchronized.

✓ Search still works.

✓ Add New Part still works.

✓ Existing Warehouse navigation remains intact.

✓ No duplicate screens are created.

FINAL GOAL:

This screen must behave like a REAL WAREHOUSE STOCK RECEIVING screen.

The employee receives new stock.

They enter ONLY the quantity received.

Example:

Current Stock: 42
Received: 12

→ New Stock: 54

Then Save.

The system updates inventory and records:

STOCK IN +12

Do NOT treat the input as Actual Quantity.
Do NOT calculate Difference.
This is strictly an ADD STOCK / STOCK RECEIVING workflow.