I am providing you with 2 additional EXISTING screens.

Add these screens to the EXISTING project and connect them to the correct existing flows.

IMPORTANT:
DO NOT create duplicate screens.
DO NOT create a new separate flow.
Use the screens I provide as the SOURCE OF TRUTH.

==================================================
1. ADD NEW PART
==================================================

Use the existing "Add New Part" screen/modal I am providing.

This belongs to the WAREHOUSE flow.

Connect it to the existing Warehouse screens wherever an action such as:

- Add New Part
- Add Part
- Create Part

leads to creating a new inventory/part record.

Flow:

Warehouse
→ Parts / Inventory
→ Add New Part
→ Existing Add New Part screen/modal
→ Save / Create
→ Return to the appropriate Parts / Inventory screen

When the user saves the new part:
- Close the modal/screen
- Return to the correct existing Warehouse screen
- The new part should appear in the relevant list/table
- Preserve the entered information and context

Do NOT create another Add New Part screen.

==================================================
2. CUSTOMER DETAILS
==================================================

Use the existing "Customer Details" screen I am providing.

This belongs to the EXISTING ENGINEER / CUSTOMER flow.

Connect it wherever an existing customer is selected or viewed.

For example:

Sidebar
→ Customers
→ Customers List
→ Click Customer
→ SAME Customer Details screen

Also, if another existing screen contains:

View Customer
View Profile
Customer Name
Customer Details

and the purpose is to view that customer:

→ Open this SAME Customer Details screen.

Do NOT create duplicate Customer Details screens.

==================================================
3. SAME DESTINATION = SAME SCREEN
==================================================

If multiple buttons or actions lead to the same information, connect all of them to the SAME existing screen.

For example:

Customers List
→ Customer
→ Customer Details

Vehicle Details
→ Owner
→ View Customer Profile
→ SAME Customer Details

Job Order
→ Customer
→ View Profile
→ SAME Customer Details

All should reuse the SAME Customer Details screen.

Do not create separate versions.

==================================================
4. FIX SPACING AND ALIGNMENT
==================================================

I manually edited these screens.

Clean up the visual spacing without changing my intended design.

Fix:

- Margins
- Padding
- Gaps
- Card spacing
- Table spacing
- Input spacing
- Button spacing
- Alignment
- Header spacing
- Text alignment
- Column alignment
- Sidebar/content alignment
- Consistent component sizes

Make the screens look professionally aligned and consistent with the rest of the existing project.

IMPORTANT:
Do NOT redesign the screens.

Only polish spacing, alignment, sizing, and consistency.

==================================================
5. CONNECT ALL IMPORTANT ACTIONS
==================================================

Review the existing screens connected to these flows.

If a button clearly has a destination, connect it.

Examples:

View
→ Details

View Profile
→ Customer Details

Add New Part
→ Add New Part

Save
→ Appropriate previous/list screen

Cancel
→ Previous screen / close modal

Back
→ Previous logical screen

Edit
→ Existing edit screen/state

Do NOT invent new functionality.

==================================================
6. WAREHOUSE FLOW
==================================================

Keep the Warehouse as ONE connected flow.

Role Selection
→ Warehouse
→ Warehouse Main
→ Parts / Inventory
→ Add New Part
→ Save
→ Parts / Inventory

If the Warehouse screens already contain Search / Filter / Sort controls, preserve them.

If these new screens logically require Search / Filter / Sort, add them only when appropriate.

Do NOT add unnecessary controls.

==================================================
7. CUSTOMER / ENGINEER FLOW
==================================================

Keep the Engineer flow connected.

Role Selection
→ Engineer
→ Customers
→ Customer List
→ Customer Details

Customer Details should also remain connected to relevant existing screens such as:

Customer
→ Vehicles
→ Vehicle Details

Customer
→ Job Orders
→ Job Order Details

Use the existing screens wherever possible.

==================================================
8. FUTURE SCREENS
==================================================

I will continue adding more screens later.

When I provide another screen:

- Add it to the EXISTING flow.
- Connect it to the correct existing screens.
- Reuse existing destination screens.
- Do not create duplicates.
- Keep the existing navigation.
- Keep the same design system.
- Keep the spacing and alignment consistent.

If multiple actions lead to the same destination, always reuse the same screen.

==================================================
9. FINAL CHECK
==================================================

After adding these 2 screens, review the connected flows and make sure:

- No important buttons are disconnected.
- No duplicate screens were created.
- No duplicate flows were created.
- Back buttons work logically.
- Save/Cancel actions work logically.
- Existing screens are reused.
- Customer context is preserved.
- Part/inventory context is preserved.
- Spacing is consistent.
- Alignment is consistent.
- Warehouse remains separate from Engineer.
- Existing Engineer flow is not broken.

IMPORTANT:

EDIT AND CONNECT THE EXISTING PROJECT.

DO NOT REBUILD IT.

DO NOT CREATE DUPLICATE SCREENS.

Make these 2 screens part of the existing connected system.