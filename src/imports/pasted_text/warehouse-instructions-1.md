I am now providing you with the FINAL 2 Warehouse screens.

These are additional screens for the SAME Warehouse flow that you have already been working on.

IMPORTANT:
DO NOT create a new Warehouse flow.
DO NOT rebuild the existing Warehouse screens.
DO NOT create duplicate screens.

Your task is to ADD these 2 screens to the EXISTING Warehouse flow and make the entire Warehouse prototype fully connected.

========================================
1. ADD THE 2 NEW SCREENS
========================================

Use the 2 screens I am providing as the source of truth.

Add them to the existing Warehouse flow.

Keep their existing design and structure.

Do not redesign them from scratch.

Do not replace them with different screens.

========================================
2. FIX SPACING AND ALIGNMENT
========================================

The screens may contain inconsistent spacing because I manually adjusted some elements.

Clean up and normalize:

- Margins
- Padding
- Gaps between sections
- Card spacing
- Table spacing
- Button spacing
- Input spacing
- Header alignment
- Text alignment
- Column alignment
- Sidebar/content alignment
- Element sizes

Make the new screens visually consistent with the other Warehouse screens.

IMPORTANT:
Only fix spacing, alignment, sizing, and consistency.

Do NOT change the intended UI design.

========================================
3. CONNECT THE NEW SCREENS
========================================

Analyze the purpose of each new screen and connect it to the appropriate existing Warehouse screens.

If an existing button/action should open one of these new screens:

Connect it.

If one of the new screens contains a button/action that should open an existing Warehouse screen:

Connect it.

If a button is a Back action:

Connect it to the previous logical screen.

If a button is Cancel:

Return to the appropriate previous screen or close the modal.

If a button is Save/Create/Confirm:

Connect it to the correct next step/state.

Do NOT leave important actions disconnected.

========================================
4. SAME DESTINATION = SAME SCREEN
========================================

IMPORTANT:

If multiple buttons/actions lead to the same destination, they must ALL open the SAME existing screen.

Do NOT create duplicate screens.

For example:

Screen A
→ View
→ Part Details

Screen B
→ View
→ Part Details

Both must open the SAME Part Details screen.

Apply this rule throughout the entire Warehouse flow.

========================================
5. KEEP DATA CONTEXT
========================================

When navigating from a list/table to a details screen, the destination should represent the selected item.

For example:

Select Part A
→ Part Details for Part A

Select Part B
→ Part Details for Part B

Do not mix data between different records.

Keep the selected item context throughout the flow.

========================================
6. SEARCH / FILTER / SORT
========================================

Analyze these 2 new screens individually.

Do NOT automatically add every control.

Add Search only if the screen contains data that users would reasonably search for.

Add Filters only when relevant to the information displayed.

Add Sort only when relevant to the displayed columns/data.

Possible controls include:

Search:
- Part name
- Part number
- SKU
- Reference number
- Supplier
- etc.

Filters:
- Category
- Type
- Status
- Supplier
- Location
- etc.

Sort:
- Date → Newest / Oldest
- Quantity → Highest / Lowest
- Available → Highest / Lowest
- Status
- Type
- etc.

Choose controls based on the actual content and purpose of each screen.

Do NOT add unnecessary Search, Filter, or Sort controls.

========================================
7. CONSISTENCY WITH EXISTING WAREHOUSE SCREENS
========================================

Make these 2 new screens consistent with the Warehouse screens already connected.

Reuse the same:

- Sidebar
- Header
- Search Bar
- Filter controls
- Sort controls
- Buttons
- Inputs
- Dropdowns
- Tables
- Cards
- Status Badges
- Modals
- Typography
- Spacing
- Components
- Variants

If an existing reusable component already exists, reuse it instead of creating a new visually different version.

========================================
8. COMPLETE THE ENTIRE WAREHOUSE FLOW
========================================

After adding these 2 screens, review the ENTIRE Warehouse prototype.

Check every important navigation path.

Make sure:

Warehouse Role
↓
Warehouse Main / Dashboard
↓
Warehouse Screens
↓
Details / Actions
↓
New Screens
↓
Back / Save / Cancel / View
↓
Correct Existing Screens

Everything should feel like ONE connected Warehouse workflow.

========================================
9. CHECK ALL EXISTING BUTTONS
========================================

Review the existing Warehouse screens as well.

If you find a button that clearly should navigate somewhere but is currently disconnected, connect it to the appropriate existing screen.

Examples:

- View
- View Details
- Edit
- Add
- Create
- Save
- Confirm
- Cancel
- Back
- Close
- Issue Stock
- Receive Stock
- Submit
- Approve

Do NOT invent new functionality.

Only connect actions that are clearly implied by the existing screens.

========================================
10. BACK NAVIGATION
========================================

Make Back navigation logical throughout the Warehouse flow.

For example:

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

The user should never be sent to an unrelated screen.

========================================
11. SIGN OUT
========================================

Keep the existing Warehouse Sign Out behavior:

Warehouse Flow
→ Sign out
→ EXISTING Role Selection screen

Do NOT create another Role Selection screen.

========================================
12. ROLE SELECTION
========================================

Keep the existing role-based entry point:

Role Selection
├── Engineer → Existing Engineer Flow
├── Warehouse → Complete Warehouse Flow
├── Accountant → Accountant Flow
└── Owner → Owner Flow

Do NOT change the Engineer flow.

Do NOT mix Engineer screens with Warehouse screens.

========================================
13. IMPORTANT — DO NOT DUPLICATE
========================================

Before creating ANY connection:

Check whether the destination screen already exists.

If it exists:
→ Connect to the existing screen.

If the same destination is needed from multiple places:
→ Reuse the same screen.

Do NOT create duplicate screens just because they are accessed from different buttons.

========================================
14. FINAL QUALITY CHECK
========================================

After connecting the 2 new screens:

Review the entire Warehouse flow from beginning to end.

Check:

- No disconnected important buttons
- No duplicate screens
- No duplicate flows
- No broken Back buttons
- No incorrect destinations
- No unnecessary screens
- Correct data context
- Consistent Sidebar
- Consistent Header
- Consistent Search
- Consistent Filters
- Consistent Sort controls
- Consistent spacing
- Consistent alignment
- Consistent components

========================================
FINAL GOAL
========================================

The result must be ONE COMPLETE, CONNECTED WAREHOUSE PROTOTYPE.

Use:

EXISTING WAREHOUSE SCREENS
+
THE 2 NEW SCREENS I AM PROVIDING

and connect everything into one logical flow.

Do not rebuild the project.

Do not create duplicate screens.

Do not redesign the existing screens.

Fix spacing and alignment where needed.

Add Search / Filter / Sort only where logically required.

Connect every relevant button and action to the correct existing screen.

Make the entire Warehouse flow work from:

Role Selection
→ Warehouse
→ Warehouse Flow
→ All Warehouse Screens
→ New Screens
→ Details / Actions
→ Back / Save / Cancel
→ Sign out → Role Selection

The final result should feel like the entire Warehouse system was designed as ONE connected product.