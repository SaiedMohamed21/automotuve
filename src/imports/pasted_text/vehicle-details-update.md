MODIFY THE EXISTING "VEHICLE DETAILS" SCREEN AND PROPAGATE THIS EXACT DESIGN UPDATE THROUGHOUT THE EXISTING FLOW.

IMPORTANT:
I manually edited this Vehicle Details screen.

The screen I am providing is my FINAL DESIGN and must be treated as the SOURCE OF TRUTH.

DO NOT redesign it.
DO NOT replace my design with the old version.
DO NOT create a new Vehicle Details screen.

Your job is to:
1. Keep my modifications.
2. Professionally clean up the spacing/alignment.
3. Apply the same updated Vehicle Details design wherever this screen is used in the existing project.
4. Keep the entire existing prototype flow connected.

==================================================
1. MY MODIFIED SCREEN IS THE SOURCE OF TRUTH
==================================================

The Vehicle Details screen I modified manually represents the design I want.

Preserve all of my changes, including the visual hierarchy, sections, buttons, cards, tables, labels, spacing direction, and information structure.

Do NOT revert any of my modifications.

Do NOT redesign the screen based on the old version.

Do NOT create an alternative version.

Use my modified screen as the MASTER version of Vehicle Details.

==================================================
2. CLEAN UP MY MANUAL DESIGN
==================================================

I created some of the modifications manually, so the spacing and alignment may not be perfectly consistent.

Professionally clean up the screen WITHOUT changing the design.

Fix:

- Margins
- Padding
- Gaps
- Card spacing
- Section spacing
- Alignment
- Text alignment
- Column alignment
- Button alignment
- Table row spacing
- Header spacing
- Sidebar/content alignment
- Consistent widths
- Consistent heights
- Vertical rhythm

Make everything feel intentionally designed and professionally aligned.

IMPORTANT:

Do NOT change the overall layout or design decisions I made.

Only correct inconsistencies caused by manual editing.

==================================================
3. VEHICLE DETAILS MUST BE ONE REUSABLE SCREEN
==================================================

There must be ONE consistent Vehicle Details screen in the entire prototype.

If Vehicle Details can be opened from multiple places, all entry points must lead to the SAME Vehicle Details screen/design.

Do NOT create multiple versions.

For example:

Vehicles
→ Select Vehicle
→ Vehicle Details

Job Order
→ Vehicle
→ View Profile
→ SAME Vehicle Details

Customer
→ Customer
→ Vehicle
→ SAME Vehicle Details

Global Search
→ Vehicle Result
→ SAME Vehicle Details

Any other existing link to Vehicle Details
→ SAME Vehicle Details

All of these must use the same screen/design.

==================================================
4. PRESERVE THE VEHICLE CONTEXT
==================================================

When the user opens a Vehicle Details screen from a specific vehicle:

The correct vehicle information must be displayed.

Example:

BMW 320i
ABC 123

must open the BMW 320i Vehicle Details.

If the user opens:

Hyundai Elantra
GHI 012

it must open the Hyundai Elantra Vehicle Details.

Do not mix vehicle data between screens.

The Vehicle Details design is shared, but the vehicle data/context must remain correct.

==================================================
5. EXISTING VEHICLE DETAILS CONTENT
==================================================

Preserve the existing Vehicle Details information and sections.

This includes the existing concepts such as:

- Vehicle information
- VIN
- Color
- Odometer / Current KM
- Current Owner
- Owner information
- Customer profile link
- Edit Owner action
- New Job Order action
- Total Visits
- Last Service
- Completed Items
- Deferred Items
- Service History
- Deferred Work
- Job Orders
- Work Items
- Statuses
- View actions

Do not remove existing functionality.

Do not invent unrelated information.

==================================================
6. OWNER EDIT FLOW
==================================================

Keep the existing Owner Edit functionality connected.

When the user clicks:

Edit

inside the Owner card:

→ Open the EXISTING Change Vehicle Owner flow/modal.

Do NOT create another owner-edit screen.

The existing behavior should remain:

Vehicle Details
→ Edit Owner
→ Change Vehicle Owner
→ Save Changes
→ Updated Vehicle Details

The vehicle itself must remain the same vehicle.

Changing the owner must NOT create a new vehicle.

The vehicle's previous service history and deferred work must remain associated with the vehicle.

==================================================
7. NEW JOB ORDER FLOW
==================================================

Keep the existing:

"+ New Job Order"

button.

When clicked:

→ Start the EXISTING New Job Order flow.

Do NOT create a duplicate New Job Order flow.

The selected vehicle must automatically be the vehicle from the Vehicle Details screen.

Example:

BMW 320i / ABC 123
→ + New Job Order
→ New Job Order
→ BMW 320i / ABC 123 already selected

Do not make the user select a different vehicle unless the existing flow specifically allows changing it.

==================================================
8. SERVICE HISTORY
==================================================

Keep the existing Service History section on the Vehicle Details screen.

When the user clicks a Job Order inside Service History:

→ Open the EXISTING Job Order Details screen.

Do NOT create another Job Order Details screen.

Flow:

Vehicle Details
→ Service History
→ Job Order
→ Existing Job Order Details

The correct Job Order must open.

==================================================
9. DEFERRED WORK
==================================================

Keep the existing Deferred Work section.

When the user clicks:

View →

next to a deferred work item:

→ Open the EXISTING Job Order Details screen associated with that deferred work item.

Do NOT create a separate Deferred Work Details screen unless one already exists in the project.

The correct Job Order and work item context must be preserved.

Example:

Deferred Work
→ Brake Pads
→ View
→ Existing Job Order Details

==================================================
10. VEHICLE DETAILS FROM JOB ORDERS
==================================================

If a Job Order contains:

Vehicle
→ View Profile

or another Vehicle Details link:

→ It must open the SAME Vehicle Details screen.

Do NOT create a different version of Vehicle Details for Job Orders.

==================================================
11. VEHICLE DETAILS FROM CUSTOMERS
==================================================

If the Customer Details screen contains a vehicle card/list:

→ Clicking the vehicle must open the SAME Vehicle Details screen.

Do NOT create a separate Customer-specific Vehicle Details screen.

==================================================
12. VEHICLES SIDEBAR FLOW
==================================================

The existing Vehicles item in the Sidebar must continue to work.

Flow:

Sidebar
→ Vehicles
→ Vehicles List
→ Select Vehicle
→ SAME Vehicle Details

Do not create another Vehicle Details destination.

==================================================
13. GLOBAL SEARCH FLOW
==================================================

If the existing Global Search can find vehicles:

Search
→ Vehicle Result
→ SAME Vehicle Details

The Vehicle Details screen must be identical regardless of where the user came from.

==================================================
14. BACK NAVIGATION
==================================================

Keep Back navigation logical based on the user's entry point.

For example:

Vehicles
→ Vehicle Details
→ Back
→ Vehicles

Customer
→ Vehicle
→ Vehicle Details
→ Back
→ Customer / previous context

Job Order
→ Vehicle
→ Vehicle Details
→ Back
→ Job Order Details

Do not break existing navigation.

Do not force every Back button to go to the same screen if the existing flow has a different source.

==================================================
15. PRINT / SERVICE HISTORY / DEFERRED WORK
==================================================

Preserve all existing actions on Vehicle Details.

If there is:

Print Job Orders

keep it connected to the existing printing flow.

If there are existing View actions:

keep them connected to the correct existing destination.

Do NOT create duplicate screens to support these actions.

==================================================
16. SEARCH / FILTER / SORT
==================================================

If the Vehicle Details screen contains tables or lists that can grow:

Preserve the existing Search / Filter / Sort behavior where it already exists.

Do NOT add unnecessary controls.

If a table/list needs internal scrolling because it can contain many records:

Use the existing project-wide internal scrolling behavior.

Keep the container size.

Make the content scroll internally.

For tables:

Keep the column headers sticky while the rows scroll.

Do NOT shrink the existing container to create scrolling.

==================================================
17. SPACING AND RESPONSIVE LAYOUT
==================================================

Make the Vehicle Details screen visually balanced.

Pay special attention to:

- Sidebar width
- Header height
- Main content margins
- Vehicle title section
- Vehicle Details card
- Owner card
- Summary cards
- Service History table
- Deferred Work table
- Button placement
- Card gaps
- Table row heights
- Column widths
- Text baselines
- Consistent padding

Do not let any section feel randomly positioned because of my manual edits.

==================================================
18. COMPONENT REUSE
==================================================

If Vehicle Details uses reusable components:

Update the reusable component rather than creating duplicate components.

For example:

Vehicle Details Card
Owner Card
Summary Card
Service History Table
Deferred Work Table
Status Badge
Action Button

If the same component appears elsewhere, keep it consistent.

Do NOT create duplicate variants unnecessarily.

==================================================
19. DO NOT COPY THE ENTIRE SCREEN INTO OTHER SCREENS
==================================================

IMPORTANT:

Propagate the Vehicle Details DESIGN SYSTEM and relevant components, but do NOT make every other screen look like Vehicle Details.

Only Vehicle Details instances should share this exact Vehicle Details layout.

Other screens should keep their own appropriate layouts.

The goal is:

SAME VEHICLE DETAILS DESIGN
across all Vehicle Details entry points.

NOT:

SAME LAYOUT FOR EVERY SCREEN.

==================================================
20. EXISTING FLOW MUST REMAIN CONNECTED
==================================================

Review the entire existing prototype and make sure every existing route to Vehicle Details points to the same updated screen.

Check at minimum:

Vehicles
→ Vehicle Details

Customers
→ Vehicle
→ Vehicle Details

Job Orders
→ Vehicle
→ Vehicle Details

Job Order Details
→ Vehicle Profile
→ Vehicle Details

Global Search
→ Vehicle
→ Vehicle Details

Deferred Work
→ View
→ Related Job Order
→ Vehicle
→ Vehicle Details

Any other existing Vehicle Details entry point
→ SAME Vehicle Details

==================================================
21. DO NOT CREATE DUPLICATES
==================================================

Do NOT create:

- Vehicle Details v2
- Vehicle Details Copy
- Customer Vehicle Details
- Job Order Vehicle Details
- Warehouse Vehicle Details
- Another Vehicle Details screen

There should be ONE canonical Vehicle Details screen.

All relevant links should point to it.

==================================================
22. FINAL QUALITY CHECK
==================================================

Before finishing, verify:

✓ My manually modified Vehicle Details design was preserved.

✓ The screen was NOT redesigned.

✓ The screen was NOT replaced with the old version.

✓ The container/card structure remains as I designed it.

✓ Spacing is professionally corrected.

✓ Alignment is consistent.

✓ Typography remains consistent.

✓ Existing colors remain unchanged.

✓ Existing functionality remains.

✓ Owner Edit flow works.

✓ New Job Order works.

✓ Service History Job Orders open correctly.

✓ Deferred Work View actions open correctly.

✓ Vehicle Details can be reached from Vehicles.

✓ Vehicle Details can be reached from Customers.

✓ Vehicle Details can be reached from Job Orders.

✓ Vehicle Details can be reached from Global Search.

✓ All routes lead to ONE SAME Vehicle Details screen.

✓ No duplicate Vehicle Details screens were created.

✓ Correct vehicle context is preserved.

✓ Existing navigation is not broken.

✓ Existing internal scrolling behavior is preserved where applicable.

==================================================
FINAL GOAL
==================================================

MY MANUALLY MODIFIED VEHICLE DETAILS SCREEN IS THE MASTER DESIGN.

Keep my design exactly as intended.

Professionally fix the manual spacing/alignment issues.

Then make sure EVERY existing flow that opens Vehicle Details uses this SAME updated screen.

ONE VEHICLE DETAILS SCREEN.
ONE CONSISTENT DESIGN.
MULTIPLE ENTRY POINTS.
NO DUPLICATES.
NO BROKEN LINKS.
NO REDESIGN.