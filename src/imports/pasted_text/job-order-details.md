I am providing you with my MODIFIED version of the existing "New Job Order / Job Order Details" screen.

IMPORTANT:
THIS IS AN EDIT OF AN EXISTING SCREEN.

Do NOT create a new screen.
Do NOT duplicate this screen.
Do NOT rebuild another version of Job Order Details.

I manually modified the existing screen, and my modifications are the SOURCE OF TRUTH for how this screen should look.

========================================
1. UPDATE THE EXISTING SCREEN
========================================

Take the EXISTING Job Order screen in the project and update it to match my modified version.

Preserve the design decisions I made, including:

- Header structure
- Job Order information section
- Customer section
- Vehicle section
- Notes
- Required Work
- Completed Work
- Engineer
- Technicians
- Status
- Stepper
- Bottom actions
- Buttons
- Overall layout

Do not revert my manual changes to the original Figma-generated design.

Do not redesign the screen.

Only clean up and organize my modifications.

========================================
2. FIX SPACING AND ALIGNMENT
========================================

I manually adjusted many elements, so the spacing may not be perfectly consistent.

Clean up the screen professionally while keeping my design.

Fix:

- Margins
- Padding
- Gaps between sections
- Card spacing
- Input spacing
- Button spacing
- Text alignment
- Column alignment
- Section alignment
- Header alignment
- Stepper alignment
- Vertical rhythm
- Horizontal spacing
- Card heights where necessary
- Consistent widths
- Consistent component spacing

IMPORTANT:

Do NOT change the overall layout or design that I created.

Only normalize spacing, alignment, sizing, and visual consistency.

The result should look like the same design, but professionally aligned and polished.

========================================
3. KEEP THE EXISTING 4-STEP FLOW
========================================

Keep the Job Order stepper:

1. Customer
2. Vehicle
3. Job Details
4. Review & Print

The stepper should remain part of the existing New Job Order flow.

Do NOT create duplicate screens just to represent these steps.

Use the existing screens/states in the project wherever they already exist.

========================================
4. MOST IMPORTANT — CONNECT THIS SCREEN TO THE ENTIRE FLOW
========================================

This screen must be the SINGLE EXISTING Job Order Details / Job Order screen used throughout the system.

If a Job Order is opened from different places, it must always lead to THIS SAME SCREEN.

Do NOT create multiple versions.

The following paths must all use this SAME existing screen:

A)

Sidebar
→ Job Orders
→ Job Orders List
→ Click any Job Order
→ THIS Job Order Details screen


B)

Vehicles
→ Vehicle Details
→ Service History
→ Click Job Order
→ THIS Job Order Details screen


C)

Vehicles
→ Vehicle Details
→ Deferred Work
→ View
→ THIS Job Order Details screen


D)

Any future screen
→ View Job Order
→ THIS SAME Job Order Details screen

========================================
5. NO DUPLICATE JOB ORDER DETAILS SCREENS
========================================

Before creating or connecting anything:

Check whether a Job Order Details screen already exists.

Use the existing one.

If there are multiple Job Order Details screens already created by previous Figma generations, DO NOT create another one.

Where possible, consolidate the prototype connections so all Job Order viewing actions point to the intended existing Job Order Details screen — the one I have now modified.

The modified screen is the SOURCE OF TRUTH.

========================================
6. JOB ORDER DATA CONTEXT
========================================

When the user clicks a specific Job Order, the Job Order Details screen should represent THAT Job Order.

For example:

Job Orders List
→ JO-2026-00125
→ Job Order Details

should show JO-2026-00125.

And:

Job Orders List
→ JO-2026-00124
→ Job Order Details

should show JO-2026-00124.

Do not mix information between Job Orders.

The same screen is reused, but the selected Job Order context must remain correct.

========================================
7. BACK NAVIGATION
========================================

Keep Back navigation logical.

If the Job Order Details screen was opened from:

Job Orders List
→ Back
→ Job Orders List

If opened from:

Vehicle Details → Service History
→ Back
→ Vehicle Details

If opened from:

Vehicle Details → Deferred Work → View
→ Back
→ Vehicle Details / Deferred Work

Do not break existing navigation.

========================================
8. PRESERVE EXISTING FUNCTIONALITY
========================================

Do not remove existing functionality from the Job Order screen.

Keep existing:

- Customer information
- Vehicle information
- Job Order information
- Current KM
- Customer Complaint
- Required Work
- Completed Work
- Notes
- Engineer
- Technicians
- Status
- Deferred Work
- Parts
- Print
- Save / Create
- Back
- Cancel

Only adjust the visual structure and prototype connections where necessary.

========================================
9. NEW JOB ORDER FLOW
========================================

Keep the existing New Job Order creation flow:

New Job Order
↓
1. Customer
↓
2. Vehicle
↓
3. Job Details
↓
4. Review & Print
↓
Create / Save Job Order

After creating the Job Order:

The new Job Order should appear in:

Job Orders List

and should also be available in the related Vehicle's:

Service History

========================================
10. EXISTING VEHICLE
========================================

If the New Job Order is created for an existing vehicle:

Use the SAME existing Vehicle.

Do NOT create a duplicate vehicle.

The vehicle keeps:

- Same Vehicle ID
- Same VIN
- Previous Job Orders
- Service History
- Deferred Work
- Previous records

========================================
11. DESIGN CONSISTENCY
========================================

Use the modified Job Order screen as the SOURCE OF TRUTH for its design.

If the same reusable components are used elsewhere, update/reuse the components consistently where appropriate.

Examples:

- Stepper
- Buttons
- Cards
- Inputs
- Status badges
- Headers
- Search
- Tables
- Spacing
- Typography

Do not redesign unrelated screens.

========================================
12. FUTURE SCREENS
========================================

I will continue adding screens to the project.

If a future screen contains a:

- Job Order
- Job Order Number
- View Job Order
- View
- Service History Job Order
- Deferred Work Job Order

and the action is intended to VIEW an existing Job Order:

Connect it to THIS SAME Job Order Details screen.

Never create another Job Order Details screen for the same purpose.

========================================
FINAL REQUIREMENT
========================================

EDIT THE EXISTING SCREEN I AM PROVIDING.

DO NOT CREATE A NEW SCREEN.

Make my modified design the final version of the existing Job Order Details screen.

Clean up the spacing and alignment without changing my design.

Then review the ENTIRE existing prototype and make sure every place that opens an existing Job Order points to THIS SAME SCREEN.

Final structure:

Job Orders
→ Job Order
→ SAME Job Order Details


Vehicles
→ Vehicle Details
→ Service History
→ Job Order
→ SAME Job Order Details


Vehicles
→ Vehicle Details
→ Deferred Work
→ View
→ SAME Job Order Details


Future screens
→ View Job Order
→ SAME Job Order Details

ONE JOB ORDER DETAILS SCREEN.
ONE CONSISTENT DESIGN.
ONE CONNECTED FLOW.
NO DUPLICATES.