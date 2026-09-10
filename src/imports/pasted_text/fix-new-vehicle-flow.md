FIX THE EXISTING "NEW VEHICLE" FLOW IN THE EXISTING NEW JOB ORDER SCREEN.

I am providing you with the existing "Add New Vehicle" screen/modal that already exists in the project.

IMPORTANT:
DO NOT CREATE A NEW "Add New Vehicle" SCREEN.
DO NOT DUPLICATE IT.
USE THE EXISTING SCREEN/MODAL I AM PROVIDING.

The problem is that the "New Vehicle" action/button in Step 2 — Vehicle of the existing New Job Order flow is currently not connected.

I want you to FIX THE PROTOTYPE CONNECTION.

========================================
CURRENT FLOW
========================================

The existing New Job Order flow is:

1. Customer
↓
2. Vehicle
↓
3. Job Details
↓
4. Review & Print

The current screen is Step 2 — Vehicle.

There should be an option to:

- Select an existing vehicle
OR
- Add a New Vehicle

========================================
NEW VEHICLE BUTTON
========================================

When the Engineer clicks the existing:

"New Vehicle"

button/action inside Step 2 — Vehicle:

OPEN THE EXISTING "Add New Vehicle" screen/modal that I am providing.

Flow:

New Job Order
↓
Step 2 — Vehicle
↓
Click "New Vehicle"
↓
EXISTING "Add New Vehicle" modal

Do NOT create another version of the modal.

========================================
ADD NEW VEHICLE
========================================

Use the existing Add New Vehicle design.

It contains fields such as:

- Make *
- Model *
- Year *
- Color
- Plate Number *
- VIN / Chassis
- Current KM

Keep the existing design and fields exactly as provided.

Do not redesign the modal.

========================================
CREATE & ATTACH TO JOB
========================================

When the Engineer clicks:

"Create & Attach to Job"

the new vehicle should be created and attached to the CURRENT Job Order.

Then:

1. Close the Add New Vehicle modal.
2. Return to the SAME New Job Order screen.
3. Stay in Step 2 — Vehicle.
4. Automatically select the newly created vehicle.
5. Display the newly created vehicle information in the Vehicle section.
6. Keep the selected Customer.
7. Keep the same Job Order Number.
8. Allow the Engineer to continue to Step 3 — Job Details.

Flow:

New Job Order
↓
Step 2 — Vehicle
↓
New Vehicle
↓
Add New Vehicle
↓
Enter Vehicle Information
↓
Create & Attach to Job
↓
Return to SAME New Job Order
↓
New Vehicle Selected
↓
Continue
↓
Step 3 — Job Details

========================================
CANCEL
========================================

When the Engineer clicks:

Cancel
OR
X

inside the Add New Vehicle modal:

Close the modal.

Return to the SAME Step 2 — Vehicle screen.

Do NOT create a vehicle.

Do NOT lose the selected customer.

Do NOT reset the Job Order.

========================================
EXISTING VEHICLE FLOW
========================================

The existing vehicle selection must continue working.

The Engineer can either:

A) Select Existing Vehicle

New Job Order
↓
Customer
↓
Vehicle
↓
Search / Select Existing Vehicle
↓
Job Details

OR:

B) Add New Vehicle

New Job Order
↓
Customer
↓
Vehicle
↓
New Vehicle
↓
Add New Vehicle
↓
Create & Attach to Job
↓
Vehicle Selected
↓
Job Details

Both paths must continue into the SAME Step 3 — Job Details.

========================================
IMPORTANT VEHICLE RULE
========================================

If the Engineer selects an existing vehicle:

DO NOT create a duplicate vehicle.

If the Engineer chooses New Vehicle:

Create a new vehicle because it does not already exist.

The newly created vehicle must be attached to the current Job Order.

========================================
JOB ORDER CONTEXT
========================================

The Job Order must remain the SAME Job Order throughout this flow.

For example:

Job Order:
JO-2026-00126

Customer:
Ahmed Mohamed

After creating the vehicle:

Job Order:
JO-2026-00126

Customer:
Ahmed Mohamed

Vehicle:
BMW 320i
ABC 123
2021

The vehicle is now attached to JO-2026-00126.

Do NOT create another Job Order.

Do NOT reset the Job Order.

========================================
STEP 2 BEHAVIOR
========================================

After creating the new vehicle:

The Step 2 — Vehicle step should become COMPLETED.

Then the Engineer can continue to:

Step 3 — Job Details

The stepper remains:

✓ Customer
✓ Vehicle
3 Job Details
4 Review & Print

========================================
DO NOT DUPLICATE SCREENS
========================================

Before creating anything:

Check whether the Add New Vehicle screen/modal already exists.

It DOES exist.

Use the existing one.

Do NOT create:
- Another Add New Vehicle screen
- Another Vehicle form
- Another New Job Order screen
- Another Vehicle step

Only connect the existing components/screens.

========================================
SPACING / DESIGN
========================================

Keep the existing Add New Vehicle design.

Do not redesign it.

If spacing or alignment is slightly inconsistent because of previous manual edits, clean it up professionally while preserving the existing design.

Fix only:
- Padding
- Margins
- Gaps
- Alignment
- Button spacing
- Input spacing
- Field alignment

Do not change the visual style.

========================================
FUTURE FLOW
========================================

Keep this flow connected to the larger existing New Job Order workflow.

The complete flow should remain:

Step 1 — Customer
↓
Step 2 — Vehicle
    ├── Select Existing Vehicle
    │
    └── New Vehicle
         ↓
         Add New Vehicle
         ↓
         Create & Attach to Job
↓
Step 3 — Job Details
↓
Step 4 — Review & Print
↓
Create / Save Job Order

========================================
FINAL REQUIREMENT
========================================

FIX THE EXISTING "NEW VEHICLE" BUTTON.

When the Engineer clicks New Vehicle:

→ Open the EXISTING Add New Vehicle modal.

When the Engineer clicks Create & Attach to Job:

→ Return to the EXISTING New Job Order screen.
→ Keep Step 2 active/completed correctly.
→ Automatically attach/select the new vehicle.
→ Preserve the current Customer and Job Order.
→ Allow the Engineer to continue to Step 3.

Do not create duplicate screens.
Do not create a separate flow.
Use the existing screens and connect them together.