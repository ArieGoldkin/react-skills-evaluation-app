# Color System Migration Guide

This guide helps you migrate from the previous color system to the new Professional Blue palette.

## What Changed

### New Color Palette

- **Primary**: Changed from generic blue to Professional Blue scale (11 shades)
- **Secondary**: Updated to Slate scale for better neutrals (10 shades)
- **Accent**: Added Emerald for success states (3 shades)
- **Design System**: Improved semantic token mapping

### Enhanced Tailwind Integration

- Full color scale available as Tailwind classes
- Better dark mode support
- Consistent HSL color format

## Migration Steps

### 1. Update Dependencies

Ensure you're using the latest version of the design system:

```bash
npm update @skills-eval/design-system
```

### 2. Review Color Usage

The new color system maintains backward compatibility for basic usage:

```tsx
// ✅ These still work (no changes needed)
<button className="bg-primary text-primary-foreground">Primary Button</button>
<div className="bg-secondary text-secondary-foreground">Secondary Content</div>
<div className="bg-accent text-accent-foreground">Success Message</div>
```

### 3. Leverage New Color Scales

Take advantage of the expanded color palette:

```tsx
// ✅ NEW - Use specific shades for better design
<div className="bg-primary-50 border border-primary-200">
  <h3 className="text-primary-900">Light primary background</h3>
  <p className="text-primary-700">Subtle primary text</p>
</div>

// ✅ NEW - Better neutral colors
<div className="bg-secondary-100 text-secondary-800">
  <span className="text-secondary-600">Muted text</span>
</div>
```

### 4. Update Custom CSS (if any)

If you have custom CSS using the old color variables:

```css
/* ❌ OLD - These still work but are less flexible */
.custom-component {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

/* ✅ NEW - Use specific shades for better control */
.custom-component {
  background-color: hsl(var(--primary-600));
  color: white;
  border: 1px solid hsl(var(--primary-300));
}

.custom-component:hover {
  background-color: hsl(var(--primary-700));
}
```

## New Features

### 1. Extended Color Scales

```tsx
// Primary scale (50-950)
<div className="bg-primary-50">Lightest</div>
<div className="bg-primary-500">Brand color</div>
<div className="bg-primary-950">Darkest</div>

// Secondary scale (50-900)
<div className="bg-secondary-100">Light background</div>
<div className="bg-secondary-600">Body text</div>
<div className="bg-secondary-900">Dark text</div>

// Accent scale (50, 500, 900)
<div className="bg-accent-50">Success background</div>
<div className="bg-accent-500">Success button</div>
<div className="bg-accent-900">Success text</div>
```

### 2. Better Dark Mode

Dark mode colors are automatically optimized:

```tsx
// Automatically adjusts for dark mode
<div className="bg-background text-foreground">
  <div className="bg-card text-card-foreground border">
    Content that works in both light and dark modes
  </div>
</div>
```

### 3. Semantic Color Usage

Use colors based on their semantic meaning:

```tsx
// ✅ GOOD - Semantic usage
<button className="bg-primary">Primary action</button>
<button className="bg-secondary">Secondary action</button>
<div className="bg-accent-50 text-accent-900">Success message</div>
<div className="bg-destructive text-destructive-foreground">Error message</div>

// ❌ AVOID - Don't use colors just for appearance
<div className="bg-primary-300">Random blue background</div>
```

## Common Patterns

### 1. Card Components

```tsx
// Light card with subtle border
<div className="bg-card border border-border rounded-lg p-4">
  <h3 className="text-card-foreground font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card description</p>
</div>

// Primary-themed card
<div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
  <h3 className="text-primary-900 font-semibold">Primary Card</h3>
  <p className="text-primary-700">Primary-themed content</p>
</div>
```

### 2. Button Variants

```tsx
// Primary button
<button className="bg-primary text-primary-foreground hover:bg-primary-700 px-4 py-2 rounded">
  Primary
</button>

// Secondary button
<button className="bg-secondary text-secondary-foreground hover:bg-secondary-300 px-4 py-2 rounded">
  Secondary
</button>

// Ghost button
<button className="text-primary hover:bg-primary-100 px-4 py-2 rounded">
  Ghost
</button>

// Success button
<button className="bg-accent text-accent-foreground hover:bg-accent-500/90 px-4 py-2 rounded">
  Success
</button>
```

### 3. Status Messages

```tsx
// Success message
<div className="bg-accent-50 border-l-4 border-accent-500 p-4">
  <div className="text-accent-900 font-medium">Success!</div>
  <div className="text-accent-800">Operation completed successfully.</div>
</div>

// Info message
<div className="bg-primary-50 border-l-4 border-primary-500 p-4">
  <div className="text-primary-900 font-medium">Information</div>
  <div className="text-primary-800">Here's some helpful information.</div>
</div>

// Warning message
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
  <div className="text-yellow-900 font-medium">Warning</div>
  <div className="text-yellow-800">Please review this carefully.</div>
</div>
```

### 4. Form Elements

```tsx
// Input field
<input
  className="border border-input bg-background px-3 py-2 rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
  placeholder="Enter text..."
/>

// Select field
<select className="border border-input bg-background px-3 py-2 rounded-md focus:ring-2 focus:ring-ring">
  <option>Choose option</option>
</select>

// Checkbox with custom styling
<div className="flex items-center space-x-2">
  <input type="checkbox" className="rounded border-input focus:ring-ring" />
  <label className="text-foreground">Accept terms</label>
</div>
```

## Testing Your Migration

### 1. Visual Testing

- Test components in both light and dark modes
- Verify color contrast meets accessibility standards
- Check hover and focus states

### 2. Storybook

Use the Color Showcase component to preview the new palette:

```tsx
import { ColorShowcase } from "@skills-eval/design-system";

// View in Storybook or your app
<ColorShowcase />;
```

### 3. Accessibility Testing

- Use browser dev tools to check contrast ratios
- Test with screen readers
- Verify keyboard navigation with focus indicators

## Troubleshooting

### Colors Look Different

- Clear your browser cache and rebuild your app
- Ensure you're importing the latest CSS from the design system
- Check that Tailwind is processing the new color classes

### Dark Mode Issues

- Verify the `dark` class is being applied to your root element
- Check that your theme toggle is working correctly
- Ensure dark mode colors are defined in your CSS

### Missing Color Classes

- Rebuild your Tailwind CSS
- Check that the design system's Tailwind config is being extended
- Verify the color variables are defined in your CSS

## Support

If you encounter issues during migration:

1. Check the [Color Documentation](./src/styles/colors.md)
2. Review the [Storybook examples](http://localhost:6006)
3. Look at existing component implementations
4. Create an issue in the project repository

The new Professional Blue color system provides a more cohesive, accessible, and professional appearance for the Skills Evaluation App while maintaining backward compatibility for existing code.
