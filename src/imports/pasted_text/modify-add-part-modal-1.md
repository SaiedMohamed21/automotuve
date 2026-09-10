MODIFY THE EXISTING "ADD PART TO JOB" MODAL DIRECTLY.

IMPORTANT:
Do NOT create a new modal.
Do NOT create a new screen.
Modify the EXISTING "Add Part to Job" modal.

The current behavior allows the user to select only ONE part at a time.

I want this changed to a MULTI-SELECT workflow.

The Warehouse user must be able to select MULTIPLE PARTS at the same time and add them to the Job Order in ONE action.

==================================================
1. CHANGE SINGLE SELECT TO MULTI-SELECT
==================================================

Currently:

User selects one part
→ enters quantity
→ Add to Job
→ modal closes
→ user opens modal again
→ selects another part

I DO NOT WANT THIS.

Change it to:

User opens Add Part to Job
↓
Selects Part 1
↓
Selects Part 2
↓
Selects Part 3
↓
Selects Part 4
↓
Sets the quantity for each selected part
↓
Clicks "Add to Job" ONCE
↓
All selected parts are added to the Job Order

==================================================
2. PART LIST
==================================================

Keep the existing searchable part list.

Each part row should have a clear selection control.

Use a checkbox or equivalent multi-select control.

Example:

☐ Brake Pad Front — BMW Series 3
  BP-BMW-F001   Brembo   A-03
  Available: 8

☐ Engine Oil 5W-30 4L
  OIL-5W30-4L   Mobil 1   B-01
  Available: 42

☐ Oil Filter — BMW N20
  OF-BMW-N20   Mann Filter   B-02
  Available: 11

The user can select multiple rows without losing previous selections.

==================================================
3. SELECTED PARTS
==================================================

Instead of showing only ONE "Selected Part", create a "Selected Parts" section.

Example:

SELECTED PARTS (3)

Brake Pad Front — BMW Series 3
Available: 8
Quantity to Issue: [ 2 ]

Engine Oil 5W-30 4L
Available: 42
Quantity to Issue: [ 4 ]

Oil Filter — BMW N20
Available: 11
Quantity to Issue: [ 1 ]

Each selected part must have its own quantity input.

==================================================
4. SELECT MULTIPLE PARTS WITHOUT CLOSING THE MODAL
==================================================

Selecting a part must NOT:

- Close the modal
- Automatically add the part
- Remove previously selected parts
- Force the user to open the modal again

The modal remains open while the user selects additional parts.

Example:

Select Brake Pad
↓
Still open

Select Engine Oil
↓
Still open

Select Oil Filter
↓
Still open

All three remain selected.

==================================================
5. SEARCH MUST CONTINUE TO WORK
==================================================

Keep the existing Search Bar:

"Search by name, part number, OEM, brand..."

The user should be able to search for a part and select it.

Important:

Searching must NOT clear existing selections.

Example:

Search "Brake"
→ Select Brake Pad

Then search "Oil"
→ Select Engine Oil

Brake Pad must remain selected.

Then search "Filter"
→ Select Oil Filter

All three must remain selected.

==================================================
6. SELECTION STATE
==================================================

Clearly show which parts are selected.

Selected rows should have a visible selected state.

For example:

☑ Brake Pad Front — BMW Series 3

The user should immediately understand:

- Which parts are selected
- Which parts are not selected

Clicking a selected part again should deselect it.

==================================================
7. QUANTITY FOR EACH PART
==================================================

Each selected part must have its own:

"Quantity to Issue"

input.

Example:

Brake Pad
Available: 8
Quantity to Issue: [ 2 ]

Engine Oil
Available: 42
Quantity to Issue: [ 4 ]

Oil Filter
Available: 11
Quantity to Issue: [ 1 ]

Do NOT use one quantity field for all selected parts.

Each part needs its own quantity.

==================================================
8. QUANTITY VALIDATION
==================================================

Quantity must:

- Accept numbers only
- Be greater than 0
- Not exceed Available Quantity
- Not accept negative numbers
- Not accept invalid text

Example:

Available: 8
Quantity: 10

Show an error:

"Quantity cannot exceed available stock."

The Add to Job button should not allow invalid selected quantities.

==================================================
9. AVAILABLE QUANTITY
==================================================

Keep showing the current available quantity for every part.

Example:

Available: 11

The user should be able to compare the requested quantity against available stock before adding the part.

==================================================
10. LOCATION
==================================================

Keep showing the storage location for the selected part.

Example:

Location: B-02

This information should remain visible.

==================================================
11. ADD TO JOB BUTTON
==================================================

Change the bottom action to reflect the number of selected parts.

Example:

No selection:
"Add to Job"

1 selected:
"Add 1 Part to Job"

3 selected:
"Add 3 Parts to Job"

5 selected:
"Add 5 Parts to Job"

The button should be disabled when no parts are selected.

Once valid parts are selected:

→ Enable the button.

==================================================
12. ADD ALL SELECTED PARTS IN ONE ACTION
==================================================

When the user clicks:

"Add 3 Parts to Job"

All selected parts must be added to the current Job Order at once.

Example:

Selected:

Brake Pad × 2
Engine Oil × 4
Oil Filter × 1

Click:

Add 3 Parts to Job

Result:

The Job Order receives all three items.

Do NOT require the user to repeat the process for each part.

==================================================
13. UPDATE INVENTORY
==================================================

When the parts are added to the Job Order, update the existing inventory consistently.

Example:

Brake Pad:
Available 8
Issued 2
→ New Available = 6

Engine Oil:
Available 42
Issued 4
→ New Available = 38

Oil Filter:
Available 11
Issued 1
→ New Available = 10

Use the existing inventory logic.

Do NOT create a separate inventory system.

==================================================
14. CREATE STOCK MOVEMENTS
==================================================

Each issued part should create the appropriate existing Stock Movement record.

Example:

Brake Pad
Stock Out
-2

Engine Oil
Stock Out
-4

Oil Filter
Stock Out
-1

Use the EXISTING Stock Movements screen and logic.

Do NOT create another movement screen.

==================================================
15. UPDATE JOB ORDER
==================================================

After adding the selected parts:

The existing Job Order should show all issued parts.

Example:

PARTS ISSUED TO JOB

Brake Pad Front — BMW Series 3
Qty: 2

Engine Oil 5W-30 4L
Qty: 4

Oil Filter — BMW N20
Qty: 1

The Job Order must remain consistent with the selected parts.

==================================================
16. MODAL LAYOUT
==================================================

Keep the existing modal visual style.

Do NOT redesign it unnecessarily.

However, adjust the layout to support multiple selections.

The modal should have:

HEADER
Add Part to Job
Close

SEARCH
Search by name, part number, OEM, brand...

PART LIST
Scrollable list of parts with multi-select controls

SELECTED PARTS
Selected parts with individual quantities

FOOTER
Add X Parts to Job
Cancel

==================================================
17. SCROLLING
==================================================

The modal can contain many parts and multiple selected items.

Use internal scrolling.

Do NOT make the entire page scroll.

The modal itself should maintain a reasonable fixed size.

The part list should be scrollable.

If the selected parts section becomes long, handle it cleanly without breaking the modal layout.

Keep the main action buttons accessible.

==================================================
18. SEARCH + MULTI-SELECT EXAMPLE
==================================================

The intended interaction is:

Open Add Part to Job

↓

Search:
"Brake"

↓

Select:
Brake Pad

↓

Search:
"Oil"

↓

Select:
Engine Oil

↓

Search:
"Filter"

↓

Select:
Oil Filter

↓

Selected Parts:

Brake Pad
Qty [2]

Engine Oil
Qty [4]

Oil Filter
Qty [1]

↓

Click:

"Add 3 Parts to Job"

↓

All three are added to the Job Order.

==================================================
19. PRESERVE EXISTING FLOW
==================================================

The existing Warehouse flow should remain:

Open Job Orders
↓
Open Job Order
↓
Add Part to Job
↓
Select Multiple Parts
↓
Set quantities
↓
Add X Parts to Job
↓
Job Order updated
↓
Inventory updated
↓
Stock Movements updated

Do NOT create a new Job Order flow.

Do NOT create a new Warehouse flow.

==================================================
20. DO NOT CREATE DUPLICATES
==================================================

Do NOT create:

- Add Part to Job V2
- Multi Select Add Part
- New Add Part Modal
- Duplicate Job Order Details
- Duplicate Inventory screen
- Duplicate Stock Movement screen

Modify the EXISTING components and flows.

==================================================
21. FINAL QUALITY CHECK
==================================================

Verify:

✓ User can select multiple parts.

✓ Selecting one part does not close the modal.

✓ Selecting another part does not remove previous selections.

✓ Search does not clear selections.

✓ Multiple selected parts remain selected across searches.

✓ Each selected part has its own quantity.

✓ Quantity cannot exceed available stock.

✓ Quantity cannot be negative.

✓ Add to Job is disabled when nothing is selected.

✓ Button shows the number of selected parts.

✓ One click adds all selected parts.

✓ Job Order displays all selected parts.

✓ Inventory quantities are updated correctly.

✓ Stock Out movements are created correctly.

✓ Existing Stock Movements screen reflects the transactions.

✓ Existing Job Order Details screen is reused.

✓ Existing modal is modified instead of duplicated.

✓ Modal uses internal scrolling when necessary.

✓ Main action buttons remain accessible.

FINAL GOAL:

Turn the existing "Add Part to Job" modal from a SINGLE-SELECT workflow into a proper MULTI-SELECT workflow.

The Warehouse user should be able to:

SEARCH
→ SELECT MULTIPLE PARTS
→ SET QUANTITY FOR EACH PART
→ ADD ALL PARTS TO THE JOB IN ONE ACTION.

Do NOT make the user close and reopen the modal for every part.