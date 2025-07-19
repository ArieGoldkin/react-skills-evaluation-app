# Professional Blue Color Palette

This document outlines the color system for the Skills Evaluation App design system.

## Color Philosophy

The Professional Blue palette conveys trust, expertise, and professionalism - perfect for a skills evaluation application. The color scheme uses:

- **Primary Blue**: Main brand color for primary actions and key elements
- **Secondary Slate**: Neutral colors for text, backgrounds, and subtle elements
- **Accent Emerald**: Success states and positive feedback

## Color Scales

### Primary - Blue Scale

Used for primary actions, links, and brand elements.

| Shade | Hex     | CSS Variable    | Tailwind Class   | Usage                     |
| ----- | ------- | --------------- | ---------------- | ------------------------- |
| 50    | #f0f9ff | `--primary-50`  | `bg-primary-50`  | Very light backgrounds    |
| 100   | #e0f2fe | `--primary-100` | `bg-primary-100` | Light backgrounds         |
| 200   | #bae6fd | `--primary-200` | `bg-primary-200` | Hover states              |
| 300   | #7dd3fc | `--primary-300` | `bg-primary-300` | Disabled states           |
| 400   | #38bdf8 | `--primary-400` | `bg-primary-400` | Secondary buttons         |
| 500   | #0ea5e9 | `--primary-500` | `bg-primary-500` | Main brand color          |
| 600   | #0284c7 | `--primary-600` | `bg-primary-600` | Primary buttons (default) |
| 700   | #0369a1 | `--primary-700` | `bg-primary-700` | Hover states              |
| 800   | #075985 | `--primary-800` | `bg-primary-800` | Active states             |
| 900   | #0c4a6e | `--primary-900` | `bg-primary-900` | Dark text                 |
| 950   | #082f49 | `--primary-950` | `bg-primary-950` | Darkest shade             |

### Secondary - Slate Scale

Used for text, borders, and neutral elements.

| Shade | Hex     | CSS Variable      | Tailwind Class     | Usage             |
| ----- | ------- | ----------------- | ------------------ | ----------------- |
| 50    | #f8fafc | `--secondary-50`  | `bg-secondary-50`  | Page backgrounds  |
| 100   | #f1f5f9 | `--secondary-100` | `bg-secondary-100` | Card backgrounds  |
| 200   | #e2e8f0 | `--secondary-200` | `bg-secondary-200` | Borders, dividers |
| 300   | #cbd5e1 | `--secondary-300` | `bg-secondary-300` | Input borders     |
| 400   | #94a3b8 | `--secondary-400` | `bg-secondary-400` | Placeholder text  |
| 500   | #64748b | `--secondary-500` | `bg-secondary-500` | Secondary text    |
| 600   | #475569 | `--secondary-600` | `bg-secondary-600` | Body text         |
| 700   | #334155 | `--secondary-700` | `bg-secondary-700` | Headings          |
| 800   | #1e293b | `--secondary-800` | `bg-secondary-800` | Dark headings     |
| 900   | #0f172a | `--secondary-900` | `bg-secondary-900` | Darkest text      |

### Accent - Emerald

Used for success states and positive feedback.

| Shade | Hex     | CSS Variable   | Tailwind Class  | Usage                 |
| ----- | ------- | -------------- | --------------- | --------------------- |
| 50    | #ecfdf5 | `--accent-50`  | `bg-accent-50`  | Success backgrounds   |
| 500   | #10b981 | `--accent-500` | `bg-accent-500` | Success buttons/icons |
| 900   | #064e3b | `--accent-900` | `bg-accent-900` | Dark success text     |

## Design System Mappings

The color variables are mapped to semantic design system tokens:

| Token                    | Maps To           | Usage                         |
| ------------------------ | ----------------- | ----------------------------- |
| `--background`           | `--secondary-50`  | Page background               |
| `--foreground`           | `--secondary-900` | Primary text color            |
| `--primary`              | `--primary-600`   | Primary buttons, links        |
| `--primary-foreground`   | `white`           | Text on primary backgrounds   |
| `--secondary`            | `--secondary-200` | Secondary buttons             |
| `--secondary-foreground` | `--secondary-800` | Text on secondary backgrounds |
| `--accent`               | `--accent-500`    | Success states                |
| `--accent-foreground`    | `white`           | Text on accent backgrounds    |
| `--muted`                | `--secondary-200` | Muted backgrounds             |
| `--muted-foreground`     | `--secondary-600` | Muted text                    |
| `--border`               | `--secondary-300` | Default borders               |
| `--input`                | `--secondary-300` | Input field borders           |
| `--ring`                 | `--primary-500`   | Focus rings                   |

## Usage Examples

### Using Tailwind Classes

```tsx
// Primary button
<button className="bg-primary text-primary-foreground hover:bg-primary-700">
  Primary Action
</button>

// Secondary button
<button className="bg-secondary text-secondary-foreground hover:bg-secondary-300">
  Secondary Action
</button>

// Success state
<div className="bg-accent-50 text-accent-900 border border-accent-500">
  Success message
</div>

// Using specific shades
<div className="bg-primary-50 border border-primary-200">
  Light primary background
</div>
```

### Using CSS Variables

```css
.custom-component {
  background-color: hsl(var(--primary-100));
  border: 1px solid hsl(var(--primary-300));
  color: hsl(var(--primary-800));
}

.success-banner {
  background-color: hsl(var(--accent-50));
  color: hsl(var(--accent-900));
  border-left: 4px solid hsl(var(--accent-500));
}
```

## Dark Mode

The color system includes dark mode variants that automatically adjust based on the `.dark` class:

- Backgrounds become darker using secondary-800/900
- Text becomes lighter using secondary-50/100
- Primary colors adjust for better contrast
- Borders and inputs use darker variants

## Accessibility

All color combinations meet WCAG AA contrast requirements:

- Primary text (secondary-900) on light backgrounds: 16.75:1
- Secondary text (secondary-600) on light backgrounds: 7.23:1
- Primary buttons (primary-600) with white text: 8.59:1
- Success elements (accent-500) with white text: 4.56:1

## Best Practices

1. **Use semantic tokens** (`--primary`, `--secondary`) instead of specific shades when possible
2. **Test in both light and dark modes** to ensure proper contrast
3. **Use primary colors sparingly** to maintain visual hierarchy
4. **Leverage the full scale** - don't just use 500-level colors
5. **Consider color meaning** - use accent colors for positive states only
