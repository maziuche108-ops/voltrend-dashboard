# TechCronch Color Audit & Design System

## Core Brand Palette

This document defines the official color palette for TechCronch, replicating the TechCrunch design system. All UI components must strictly adhere to these values.

| Color Name | Hex Code | RGB | CSS Variable | Usage |
|------------|----------|-----|--------------|-------|
| **TechCrunch Green** | `#00d084` | `0, 208, 132` | `--color-brand` / `brand-DEFAULT` | Primary brand color, buttons, active states, links, logos |
| **TechCrunch Dark Green** | `#00a562` | `0, 165, 98` | `brand-dark` | Hover states for primary buttons |
| **TechCrunch Black** | `#111111` | `17, 17, 17` | `--color-accent` / `brand-accent` | Primary text, headings, footer backgrounds |
| **TechCrunch Gray** | `#f5f5f5` | `245, 245, 245` | `tc-gray` | Page backgrounds, secondary sections |
| **White** | `#ffffff` | `255, 255, 255` | `white` | Card backgrounds, inputs |
| **Dark Gray** | `#374151` | `55, 65, 81` | `gray-700` | Body text (Tailwind default) |
| **Light Gray Text** | `#9ca3af` | `156, 163, 175` | `gray-400` | Secondary text, timestamps |

## Tailwind Configuration

The project uses a customized Tailwind configuration to enforce these colors.

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00d084', // TechCrunch Green
          dark: '#00a562',
          accent: '#111111' // TechCrunch Black
        },
        'tc-green': '#00d084',
        'tc-black': '#111111',
        'tc-gray': '#f5f5f5'
      }
    }
  }
}
```

## Audit Results

### Forbidden Colors (Fixed)
The following legacy "Voltrend" colors have been removed and replaced:
- ❌ `#00f2ff` (Cyan/Electric Blue) -> Replaced with `#00d084`
- ❌ `rgba(0, 242, 255, ...)` -> Replaced with `rgba(0, 208, 132, ...)`

### Verification
Automated visual regression testing is implemented via `audit_colors.js`, which scans the codebase for prohibited hex codes and validates that only the approved palette is used for brand elements.
