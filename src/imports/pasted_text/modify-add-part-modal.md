MODIFY THE EXISTING "ADD NEW PART" MODAL DIRECTLY.

IMPORTANT:
Do NOT create a new screen.
Do NOT create a new modal.
Modify the EXISTING Add New Part modal.

I want the following exact changes:

==================================================
1. REMOVE THESE FIELDS COMPLETELY
==================================================

Remove these fields from the Add New Part form:

- Compatible Year
- Storage Location
- Selling Price (EGP) *
- Purchase Price (EGP)

They should NOT appear anywhere in this modal.

After removing them, automatically reorganize the remaining fields so the form is compact, balanced, and professionally spaced.

==================================================
2. CHANGE CATEGORY FROM DROPDOWN TO TEXT INPUT
==================================================

The current CATEGORY field is a dropdown/list.

Change it to a normal text input.

The user must be able to type the category manually using the keyboard.

Use:

CATEGORY

Placeholder:

"e.g. Filters, Brakes, Oils..."

Do NOT use:

- Dropdown
- Select
- Menu
- Predefined category list

It must be a standard editable text field.

==================================================
3. KEEP THE IMPORTANT EXISTING FIELDS
==================================================

Keep these fields:

PART NAME *
PART NUMBER
OEM NUMBER
BRAND
CATEGORY
COMPATIBLE MAKE
COMPATIBLE MODEL
MINIMUM STOCK
INITIAL QUANTITY

Keep their existing functionality and styling.

==================================================
4. FORM LAYOUT
==================================================

After removing the unwanted fields, reorganize the remaining fields.

Use a clean two-column layout where appropriate.

For example:

PART NAME *
[................................................]

PART NUMBER                 OEM NUMBER
[....................]     [....................]

BRAND                       CATEGORY
[....................]     [....................]

COMPATIBLE MAKE             COMPATIBLE MODEL
[....................]     [....................]

MINIMUM STOCK               INITIAL QUANTITY
[....................]     [....................]

Do NOT leave large empty spaces where the removed fields used to be.

==================================================
5. MODAL SIZE
==================================================

Resize the EXISTING modal appropriately after removing the fields.

Do NOT keep the modal unnecessarily tall.

The modal should fit the new shorter form naturally.

Do NOT make it extremely small.

Maintain comfortable:

- Padding
- Field spacing
- Section spacing
- Button spacing

==================================================
6. SCROLL
==================================================

Because the form is now shorter, remove unnecessary internal scrolling if the complete form can fit naturally inside the modal.

If scrolling is still required because of the available viewport:

Keep the modal fixed and allow only the modal content area to scroll.

Do NOT make the entire page scroll.

==================================================
7. BUTTONS
==================================================

Keep:

SAVE PART
CANCEL

at the bottom of the modal.

The buttons should remain aligned and clearly visible.

SAVE PART should remain the primary action.

==================================================
8. VALIDATION
==================================================

Keep the existing required-field behavior.

PART NAME remains required.

CATEGORY is now a text input and should not behave like a dropdown.

MINIMUM STOCK and INITIAL QUANTITY should accept numeric values only.

Do not change unrelated validation behavior.

==================================================
9. KEEP THE EXISTING DESIGN SYSTEM
==================================================

Do NOT redesign the modal.

Keep the existing:

- Colors
- Typography
- Input style
- Border radius
- Borders
- Buttons
- Labels
- Close icon
- Overall visual language

Only make the requested field removals, Category input change, resizing, and spacing improvements.

==================================================
10. KEEP THE EXISTING FLOW
==================================================

The existing flow must remain:

Stock Update
→ + Add New Part
→ Existing Add New Part Modal
→ Fill Part Information
→ Save Part
→ Part is added to the existing Parts / Inventory data
→ Modal closes / existing success behavior

Do NOT create another Add New Part destination.

==================================================
11. FINAL CHECK
==================================================

Verify that:

✓ Compatible Year is completely removed.

✓ Storage Location is completely removed.

✓ Selling Price (EGP) is completely removed.

✓ Purchase Price (EGP) is completely removed.

✓ Category is now a normal keyboard text input.

✓ Category is NOT a dropdown.

✓ Remaining fields are arranged cleanly.

✓ There are no large empty gaps.

✓ Modal height is adjusted naturally.

✓ Spacing and alignment are professional.

✓ Save Part and Cancel remain visible.

✓ Existing Add New Part flow still works.

✓ Existing Parts / Inventory flow is not broken.

✓ No duplicate modal or screen is created.

FINAL GOAL:

Keep the same existing Add New Part modal, but make it simpler and cleaner by removing the unnecessary fields and making CATEGORY a manually typed text field.

Do not redesign anything unrelated.