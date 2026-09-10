UPDATE THE EXISTING VEHICLE DETAILS FLOW — DO NOT REDESIGN IT.

I already have an existing Vehicle Details screen and an existing "Change Vehicle Owner" modal.

I want you to connect them into one complete, realistic prototype flow.

IMPORTANT:
Use the existing screens and components.
Do NOT create duplicate screens.
Do NOT redesign the existing Vehicle Details screen.
Do NOT redesign the existing Change Vehicle Owner modal.

==================================================
1. VEHICLE DETAILS SCREEN
==================================================

Use the existing Vehicle Details screen.

Inside the OWNER card, keep the owner information displayed like this:

OWNER                                      Edit

Ahmed Mohamed
01012345678

View customer profile →

The "Edit" action must be located INSIDE the OWNER card, at the TOP-RIGHT corner, aligned with the OWNER label.

Do NOT place the Edit button somewhere else.

Do NOT create another Edit button.

==================================================
2. EDIT OWNER FLOW
==================================================

When the Engineer clicks the "Edit" text inside the OWNER card:

Vehicle Details
↓
Click "Edit"
↓
Open the EXISTING "Change Vehicle Owner" modal

Use the existing modal shown in the provided design.

==================================================
3. CHANGE VEHICLE OWNER MODAL
==================================================

The existing modal should contain:

Title:
Change Vehicle Owner

Warning / information message explaining that changing the owner updates the current vehicle owner, while previous service history remains linked to the vehicle.

Current Owner:
Ahmed Mohamed

New Customer:
- New Name
- New Phone Number

Buttons:
- Save Changes
- Cancel

The New Name and New Phone Number fields must be editable.

Initially populate them with the current owner's information.

Example:

New Name:
Ahmed Mohamed

New Phone Number:
01012345678

The Engineer can change the name, phone number, or both.

==================================================
4. SAVE CHANGES
==================================================

When the Engineer clicks "Save Changes":

1. Close the Change Vehicle Owner modal.
2. Return to the SAME Vehicle Details screen.
3. Update the OWNER card with the new customer name.
4. Update the OWNER card with the new phone number.
5. Keep the same Vehicle record.
6. Keep the same Vehicle ID / VIN.
7. Do NOT create a new Vehicle.
8. Do NOT delete the previous owner information from historical records.
9. Do NOT delete or reset Service History.
10. Do NOT modify previous Job Orders.

Example:

Before:

OWNER
Ahmed Mohamed
01012345678

After changing:

OWNER
Mohamed Ali
01123456789

The Vehicle itself remains the SAME vehicle.

==================================================
5. IMPORTANT VEHICLE HISTORY RULE
==================================================

Changing the current owner must NOT affect historical Job Orders.

The Vehicle keeps:

- All previous Job Orders
- Service History
- Deferred Work
- Inspections
- Photos
- Documents
- Previous service records

Previous Job Orders must keep the customer/owner information that belonged to them when they were created.

For example:

Vehicle:
BMW 320i
VIN: WBABE9C57JA123456

Previous Job Order:
JO-2026-00120
Customer: Ahmed Mohamed

Current owner is later changed to:
Mohamed Ali

The old Job Order must STILL show:
Customer: Ahmed Mohamed

The Vehicle is still:
BMW 320i
Same VIN
Same Vehicle record

Only the CURRENT OWNER displayed on Vehicle Details changes.

==================================================
6. CANCEL / CLOSE
==================================================

If the Engineer clicks:

Cancel
OR
X

inside the Change Vehicle Owner modal:

Close the modal.

Do NOT save any changes.

The Vehicle Details screen must still show the original owner information.

==================================================
7. COMPLETE PROTOTYPE FLOW
==================================================

The complete interaction should be:

Vehicles
↓
Vehicle List
↓
Select Existing Vehicle
↓
Vehicle Details
↓
OWNER card
↓
Click "Edit"
↓
Change Vehicle Owner Modal
↓
Edit Customer Name / Phone
↓
Save Changes
↓
Vehicle Details
↓
Updated Current Owner

OR:

Vehicle Details
↓
Click "Edit"
↓
Change Vehicle Owner Modal
↓
Cancel / X
↓
Vehicle Details
↓
Original Owner

==================================================
8. KEEP EXISTING VEHICLE FLOW
==================================================

This is an EXISTING vehicle.

Do NOT create another Vehicle when the owner changes.

The same Vehicle must continue to be used for:

Vehicle Details
→ Service History
→ Previous Job Orders
→ Deferred Work
→ New Job Orders

Changing the owner only changes the current owner/customer relationship.

==================================================
9. JOB ORDER RELATIONSHIP
==================================================

Keep the existing Job Order flow connected.

From Vehicle Details:

Service History
→ Click Job Order
→ SAME existing Job Order Details screen

Deferred Work
→ View
→ SAME existing Job Order Details screen

Sidebar
→ Job Orders
→ Job Orders List
→ Click Job Order
→ SAME existing Job Order Details screen

Do not create duplicate Job Order Details screens.

==================================================
10. SIDEBAR
==================================================

The Sidebar currently contains:

- Dashboard
- Customers
- Vehicles
- Job Orders

Do NOT add "Service History" back to the Sidebar.

Service History exists inside Vehicle Details only.

==================================================
11. FUTURE SCREENS
==================================================

I will continue adding more screens to this project.

Keep this flow expandable.

If I later provide another screen related to:

- Vehicle Owner
- Customer
- Vehicle
- Job Order
- Service History
- Deferred Work

connect it to the existing flow instead of creating a separate disconnected flow.

Reuse the existing screens and components whenever possible.

==================================================
12. DESIGN RULE
==================================================

MY EXISTING DESIGNS ARE THE SOURCE OF TRUTH.

Do NOT:

- Redesign the Vehicle Details screen
- Redesign the Owner card
- Redesign the Change Vehicle Owner modal
- Create duplicate screens
- Create duplicate modals
- Change the existing layout
- Change typography
- Change colors
- Change spacing
- Change the Sidebar design

Only add/fix the required prototype interactions and editable states.

==================================================
FINAL GOAL
==================================================

Make the existing Vehicle Details screen work like this:

OWNER CARD

OWNER                                      Edit
Ahmed Mohamed
01012345678
View customer profile →

                ↓ Click Edit

CHANGE VEHICLE OWNER MODAL

Current Owner:
Ahmed Mohamed

New Customer:
[ Name              ]
[ Phone Number       ]

[ Save Changes ]   [ Cancel ]

                ↓ Save

VEHICLE DETAILS

OWNER
Mohamed Ali
01123456789

The vehicle remains the SAME vehicle,
historical Job Orders remain unchanged,
and the new owner becomes the CURRENT owner.

Make this interaction work inside the existing prototype and keep it connected to the entire existing flow.