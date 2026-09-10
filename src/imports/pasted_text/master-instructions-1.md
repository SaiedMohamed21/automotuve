MASTER INSTRUCTION — APPLY EVERY SCREEN I SEND TO THE EXISTING PROJECT

I will send you UI screenshots/design references ONE SCREEN AT A TIME.

For EVERY screenshot I send after this instruction, treat it as a modification/reference for an EXISTING screen or flow in the current project.

Do NOT create a separate new design unless I explicitly tell you that this is a completely new screen.

Your job for every screen I send is to:

1. Identify which existing screen/flow it belongs to.
2. Modify the EXISTING screen instead of creating a duplicate.
3. Match the screenshot/design I provide as closely as possible.
4. Professionally fix spacing, sizing, alignment, and layout inconsistencies caused by my manual edits.
5. Preserve the existing project design system.
6. Connect the modified screen correctly to the ENTIRE EXISTING PROTOTYPE FLOW.
7. Make sure every existing entry point that should open this screen opens the SAME updated screen.
8. Make sure buttons/actions that should lead to other existing screens point to the correct existing screen.
9. Never create duplicate versions of the same screen just because it can be reached from multiple places.

==================================================
1. SCREENSHOT = DESIGN SOURCE OF TRUTH
==================================================

When I send a screenshot:

Treat the screenshot as the visual reference for that specific screen.

If the screenshot differs from the current screen, apply the visual/structural changes shown in the screenshot.

Do NOT revert my modifications back to the old design.

Do NOT redesign the screen based on your own preferences.

Do NOT add unnecessary UI.

Preserve my intended design and only improve its execution.

==================================================
2. MODIFY EXISTING SCREEN — DO NOT DUPLICATE
==================================================

Before creating anything:

Look for the existing screen that corresponds to the screenshot.

If it already exists:

→ MODIFY THE EXISTING SCREEN.

Do NOT create:

- Screen Copy
- Screen V2
- Screen Final
- Screen 2
- Duplicate Screen
- New version of the same screen

There should be ONE canonical version of each screen.

==================================================
3. SPACING AND ALIGNMENT
==================================================

I may manually edit screenshots/designs before sending them to you.

Because of that, some measurements may not be perfectly consistent.

After applying my design:

Professionally clean up:

- Margins
- Padding
- Gaps
- Section spacing
- Card spacing
- Row spacing
- Column spacing
- Text alignment
- Button alignment
- Input alignment
- Component alignment
- Container dimensions
- Vertical rhythm
- Horizontal alignment
- Header spacing
- Sidebar/content alignment

Make the screen look professionally designed.

IMPORTANT:

Fix execution problems WITHOUT changing my design decisions.

Do not change the visual hierarchy unless necessary to correct an obvious layout problem.

==================================================
4. PRESERVE THE EXISTING DESIGN SYSTEM
==================================================

Keep the existing project's design language consistent.

Reuse existing components where possible:

- Sidebar
- Header
- Search
- Buttons
- Inputs
- Dropdowns
- Tables
- Cards
- Status badges
- Tabs
- Modals
- Toasts
- Filters
- Sort controls
- Navigation elements

Do NOT create a new component when an existing reusable component already performs the same role.

If the screenshot introduces a change to a reusable component:

Update the reusable component so the change is reflected consistently wherever that component is used.

==================================================
5. CONNECT THE SCREEN TO THE ENTIRE FLOW
==================================================

This is extremely important.

After modifying a screen, inspect the EXISTING prototype and determine:

Where can the user reach this screen?

Where should the user go from this screen?

Make sure all relevant existing flows use the updated screen.

For example:

Screen A
→ Button
→ THIS SCREEN

Screen B
→ View
→ THIS SCREEN

Screen C
→ Edit
→ THIS SCREEN

Global Search
→ Result
→ THIS SCREEN

All should use ONE SAME screen.

Do NOT create separate copies for each flow.

==================================================
6. MULTIPLE ENTRY POINTS
==================================================

If the same screen exists or can be accessed from multiple places:

All entry points must point to the SAME canonical screen.

Example:

Vehicles
→ Vehicle Details

Customers
→ Vehicle
→ Vehicle Details

Job Orders
→ Vehicle
→ Vehicle Details

Global Search
→ Vehicle
→ Vehicle Details

All of these must open the SAME Vehicle Details screen.

The same rule applies to every other screen in the system.

==================================================
7. PRESERVE CONTEXT
==================================================

When navigating between screens, preserve the correct context.

Examples:

If the user selects BMW 320i:

→ Vehicle Details must show BMW 320i.

If the user selects a specific Job Order:

→ Job Order Details must show that Job Order.

If the user selects a specific Customer:

→ Customer Details must show that Customer.

If the user clicks a specific Part:

→ The destination must correspond to that Part.

Do not mix data or contexts between different records.

The UI can be shared, but the prototype logic must make sense.

==================================================
8. BUTTONS AND ACTIONS
==================================================

Every existing interactive element should remain connected.

When a button is intended to open an existing screen:

→ Connect it to the correct EXISTING screen.

If multiple buttons lead to the same destination:

→ They should all point to the SAME screen.

Do not create duplicate destination screens.

Examples:

+ New Job Order
→ Existing New Job Order flow

View
→ Existing Details screen

Edit
→ Existing Edit flow/modal

Back
→ Previous logical screen

Save
→ Existing save/next step behavior

Cancel
→ Existing cancel behavior

Print
→ Existing print/review flow

==================================================
9. BACK NAVIGATION
==================================================

Keep Back navigation logical.

The destination should make sense based on where the user came from.

For example:

Vehicles
→ Vehicle Details
→ Back
→ Vehicles

Customers
→ Customer Details
→ Vehicle
→ Vehicle Details
→ Back
→ Previous logical context

Job Orders
→ Job Order Details
→ Vehicle
→ Vehicle Details
→ Back
→ Previous logical context

Do not break existing navigation.

==================================================
10. TABLES AND LONG LISTS
==================================================

If the screen contains a table or long list:

Keep the existing container size.

Do NOT shrink the container to create scrolling.

If the content exceeds the available space:

→ Make the content internally scrollable.

For tables:

→ Keep the column header sticky while rows scroll.

Do NOT allow the table header to disappear when scrolling.

Do NOT make the entire page unnecessarily long because of additional rows.

Apply this intelligently only where needed.

==================================================
11. SEARCH, FILTER AND SORT
==================================================

Look at the content of each screen and determine whether Search, Filter, or Sort controls are logically needed.

If they already exist:

Preserve them and make sure they work correctly.

If the screenshot clearly includes them:

Add them to the EXISTING screen.

Use them appropriately.

Examples:

Search:
- Customers
- Vehicles
- Job Orders
- Parts
- Inventory

Filter:
- Status
- Category
- Type
- Date
- Availability

Sort:
- Date
- Quantity
- Availability
- Status
- Other relevant fields

Do NOT blindly add Search/Filter/Sort to every screen.

Only add what makes sense for the specific screen.

==================================================
12. MODALS AND POPUPS
==================================================

If the screenshot represents a modal/popup:

Use the existing modal system if one already exists.

Do NOT create a duplicate screen behind the modal.

Keep:

- Modal header
- Close button
- Form content
- Action buttons

aligned and consistent.

If the modal content can become long:

Make the content internally scrollable while keeping important actions accessible.

==================================================
13. RESPONSIVE SPACING
==================================================

Keep the existing overall screen structure.

Do not randomly move sections.

Make sure:

- Containers align with the main content grid.
- Cards have consistent gaps.
- Tables align with their containers.
- Buttons align with the correct section.
- Headers align with content.
- Sidebar width remains consistent.
- Main content has consistent margins.
- Elements do not overlap.
- Nothing is unnecessarily compressed.

==================================================
14. DO NOT CHANGE UNRELATED SCREENS
==================================================

When I send one screenshot:

Focus primarily on the screen represented by that screenshot.

Do NOT redesign unrelated screens.

However:

If the modified screen is reused elsewhere in the existing flow, update those references/components so they use the SAME canonical version.

The goal is consistency, not redesigning the entire project every time.

==================================================
15. DO NOT BREAK EXISTING FLOWS
==================================================

Preserve all existing prototype connections unless the screenshot clearly indicates a behavior change.

Do NOT remove working flows.

Do NOT disconnect existing buttons.

Do NOT change unrelated navigation.

Do NOT create unnecessary new destinations.

==================================================
16. SCREEN-SPECIFIC DESIGN
==================================================

Do NOT make every screen look identical.

Each screen should maintain its own appropriate layout.

For example:

Vehicle Details should look like Vehicle Details.

Job Order Details should look like Job Order Details.

Stock Count should look like Stock Count.

Dashboard should look like Dashboard.

The consistency should come from:

- Components
- Typography
- Spacing rules
- Buttons
- Inputs
- Tables
- Status badges
- Navigation

NOT from copying the entire layout of one screen onto another.

==================================================
17. WHEN I SEND THE NEXT SCREEN
==================================================

When I send another screenshot:

Treat it as the next screen to implement using these SAME MASTER RULES.

Do not ask me to repeat these instructions.

Do not require a new prompt for every screenshot.

Analyze the new screenshot and apply it to the appropriate EXISTING screen.

Then connect it to the existing flow wherever necessary.

==================================================
18. FINAL CHECK AFTER EVERY SCREEN
==================================================

After implementing each screenshot, verify:

✓ Existing screen was modified instead of duplicated.

✓ My screenshot/design was treated as the visual source of truth.

✓ Manual spacing/alignment issues were professionally cleaned up.

✓ Existing design system was preserved.

✓ Existing components were reused where possible.

✓ No unnecessary components were duplicated.

✓ All relevant entry points use the SAME screen.

✓ Buttons point to the correct existing destinations.

✓ Back navigation remains logical.

✓ Correct record/context is preserved.

✓ Existing prototype flow is not broken.

✓ Tables/lists use internal scrolling when appropriate.

✓ Table headers remain sticky when appropriate.

✓ Search/Filter/Sort are added or preserved only when logically needed.

✓ No unrelated screens were redesigned.

✓ No duplicate screens were created.

==================================================
MOST IMPORTANT RULE
==================================================

EVERY SCREEN I SEND YOU IS AN UPDATE TO THE EXISTING PROJECT.

DO NOT TREAT EACH SCREEN AS A NEW STANDALONE DESIGN.

For every screenshot:

MODIFY THE EXISTING SCREEN
+
CLEAN UP SPACING AND ALIGNMENT
+
REUSE EXISTING COMPONENTS
+
CONNECT IT TO ALL RELEVANT EXISTING ENTRY POINTS
+
KEEP ONE CANONICAL VERSION OF THE SCREEN
+
PRESERVE THE COMPLETE PROTOTYPE FLOW

I will now send the screens ONE BY ONE.
Apply these rules automatically to every screen I send.