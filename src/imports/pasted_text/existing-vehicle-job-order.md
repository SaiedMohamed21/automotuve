Build and connect the prototype flow for the EXISTING VEHICLE / RETURNING CAR Job Order scenario shown in the provided screens.

IMPORTANT:
This is part of ONE LARGE EXISTING SYSTEM.
Do NOT create a separate standalone flow.

The existing "Vehicles" section in the sidebar is the main entry point for existing/returning vehicles.

CURRENT SCENARIO:

An Engineer receives a vehicle that has already been registered in the system before.

The Engineer should be able to find the existing vehicle, open its vehicle profile, review its history, and create a NEW Job Order for the same vehicle.

FLOW:

Vehicles
↓
Vehicle List
↓
Search / Find Existing Vehicle
↓
Select Vehicle
↓
Vehicle Details
↓
Create New Job Order
↓
New Job Order for Existing Vehicle
↓
Save Job Order
↓
Job Order Created
↓
Vehicle Details / Service History

IMPORTANT VEHICLE RULE:

The existing vehicle must NOT be created again.

If the vehicle already exists:
- Reuse the existing Vehicle record.
- Keep the same Vehicle ID / VIN.
- Keep the complete Service History.
- Keep all previous Job Orders.
- Keep previous inspections, photos, documents, and deferred work.
- Creating a new Job Order creates a NEW Job Order linked to the SAME vehicle.

The vehicle's history must never be reset or duplicated.

RETURNING VEHICLE FLOW:

1. VEHICLES LIST
- Use the existing Vehicles screen.
- Engineer can search for the vehicle.
- Search can use:
  - License Plate
  - VIN
  - Make
  - Model
  - Vehicle ID
- Clicking a vehicle opens its Vehicle Details screen.

2. VEHICLE DETAILS
- Show the existing vehicle information.
- Show the current owner/customer.
- Show previous Job Orders / Service History.
- Show Deferred Work if applicable.
- Show a clear "Create New Job Order" action.

3. CREATE NEW JOB ORDER
When the Engineer clicks "Create New Job Order":
- Do NOT create a new vehicle.
- Automatically use the selected existing vehicle.
- Automatically load the vehicle information.
- Automatically load the current owner/customer associated with the vehicle.
- Start a NEW Job Order linked to this existing vehicle.

4. JOB ORDER DETAILS
The Engineer can enter:
- Current KM
- Customer Complaint
- Required Work
- Work Done
- Notes
- Engineer
- Technicians
- Work Status

The Job Order is NEW, but the Vehicle is EXISTING.

5. SAVE
When the Engineer saves:
- Create a new Job Order.
- Link it to the existing Vehicle.
- Keep the same Vehicle ID.
- Add the new Job Order to the vehicle's Service History.
- Keep all previous Job Orders unchanged.
- Return to the appropriate Vehicle Details / Job Order state.

IMPORTANT:

The current owner/customer shown for the vehicle should be associated with this new Job Order.

However, do NOT overwrite or delete historical customer/owner information from previous Job Orders.

Each Job Order should preserve the customer/owner information that existed when that Job Order was created.

-----------------------------------

CONNECT THIS WITH THE EXISTING SYSTEM:

This flow must connect to the existing Sidebar → Vehicles section.

Do NOT duplicate the Vehicles flow.

Use the existing Vehicles screens and components whenever possible.

The relationship should be:

Sidebar
↓
Vehicles
↓
Vehicle List
↓
Vehicle Details
↓
Create New Job Order
↓
New Job Order
↓
Save
↓
Vehicle Details / Service History

-----------------------------------

IMPORTANT: NEW SCREENS WILL BE ADDED LATER

I will continue giving you additional screens for this system.

Therefore, build the prototype as ONE expandable connected flow.

When I provide a new screen later:
- Connect it to the appropriate existing screen.
- Do NOT create a separate flow.
- Do NOT duplicate existing screens.
- Do NOT rebuild the current flow.
- Preserve the existing navigation and data context.
- Keep the Vehicle and Job Order relationship consistent.
- Allow new steps/screens to be inserted naturally into the existing workflow.

For example, future screens may include:
- Vehicle Inspection
- Service History
- Deferred Work
- Job Order Preview
- Job Order Completion
- Invoice
- Parts / Inventory
- Technician Assignment
- Customer Approval
- Vehicle Owner Change

These should be connected to the existing flow when I provide them.

-----------------------------------

DESIGN RULES:

Use the provided screens as the SOURCE OF TRUTH.

Do NOT redesign the UI.

Do NOT change the existing visual style.

Do NOT create duplicate screens.

Reuse existing:
- Sidebar
- Header
- Buttons
- Inputs
- Tables
- Cards
- Status badges
- Modals
- Search
- Filters
- Components
- Variants

Only create prototype connections/interactions and any necessary missing states.

-----------------------------------

PROTOTYPE BEHAVIOR:

Make the flow realistic and clickable.

Search Vehicle
→ Select Vehicle
→ Vehicle Details
→ Create New Job Order
→ Job Order Details
→ Save
→ New Job Order appears in Service History

Back buttons should return to the previous logical screen.

Cancel/Close should safely exit the current action.

Preserve the selected Vehicle context throughout the entire flow.

FINAL GOAL:

Create ONE connected, expandable prototype for the Auto Center system.

The returning/existing vehicle Job Order flow must be connected to the existing Vehicles flow in the Sidebar.

I will add more screens later, and every new screen must be connected to this same flow instead of creating an isolated prototype.