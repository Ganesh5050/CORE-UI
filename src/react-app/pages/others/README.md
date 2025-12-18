# Others Category - Buttons & Cards Structure

## Overview
This folder contains the "Others" category components with a unique structure:
- Instead of individual component pages, we have **grid pages** that show multiple variants
- Each variant is displayed as a preview card
- Clicking a preview card opens the detailed documentation for that specific variant

## Structure

```
pages/others/
├── ButtonsGrid.tsx      # Grid of all button variants
├── ButtonDetail.tsx     # Individual button documentation
├── CardsGrid.tsx        # Grid of all card variants
└── CardDetail.tsx       # Individual card documentation
```

## How to Add New Buttons

### Step 1: Add to ButtonsGrid.tsx

Find the `buttonVariants` array and add your new button:

```tsx
const buttonVariants: ButtonVariant[] = [
  {
    id: 'button-1',  // Unique ID (used in URL)
    name: 'Glassmorphism Button',  // Display name
    category: 'Buttons',  // Category label
    component: (
      // Your button JSX here
      <button>Your Button</button>
    ),
  },
  // Add more buttons here...
];
```

### Step 2: Add to ButtonDetail.tsx

Find the `buttonsData` object and add the same button with full details:

```tsx
const buttonsData: Record<string, ButtonData> = {
  'button-1': {
    id: 'button-1',  // Must match the ID from ButtonsGrid
    name: 'Glassmorphism Button',
    category: 'Buttons',
    description: 'A beautiful glassmorphism button with...',
    code: `<button>Your full code here</button>`,  // The code users will copy
    preview: <button>Your Button</button>,  // Same as in ButtonsGrid
  },
  // Add more buttons here...
};
```

## How to Add New Cards

Follow the same process as buttons, but use:
- `CardsGrid.tsx` → `cardVariants` array
- `CardDetail.tsx` → `cardsData` object

## Features

### Grid Page Features:
- ✅ Responsive grid layout (1, 2, or 3 columns)
- ✅ Live preview of each variant
- ✅ Favorite/heart functionality
- ✅ Hover effects
- ✅ Click to view details

### Detail Page Features:
- ✅ Large preview area
- ✅ Full code display
- ✅ Copy code button
- ✅ Favorite/heart functionality
- ✅ Back navigation
- ✅ Usage instructions
- ✅ Technology tags

## Routing

- `/others/buttons` → Grid of all buttons
- `/others/buttons/button-1` → Detail page for button-1
- `/others/cards` → Grid of all cards
- `/others/cards/card-1` → Detail page for card-1

## Example: Adding a New Button

1. **Add to ButtonsGrid.tsx:**
```tsx
{
  id: 'gradient-button',
  name: 'Gradient Button',
  category: 'Buttons',
  component: (
    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
      Click Me
    </button>
  ),
}
```

2. **Add to ButtonDetail.tsx:**
```tsx
'gradient-button': {
  id: 'gradient-button',
  name: 'Gradient Button',
  category: 'Buttons',
  description: 'A vibrant gradient button with smooth color transitions.',
  code: `<button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
  Click Me
</button>`,
  preview: (
    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
      Click Me
    </button>
  ),
}
```

3. **Done!** The button will now appear in the grid and have its own detail page.

## Notes

- Keep the `id` consistent between Grid and Detail pages
- The `component` in Grid should match the `preview` in Detail
- Make sure the `code` string is properly formatted for copying
- Use template literals (backticks) for multi-line code
- Escape any backticks or `${}` in your code strings if needed
