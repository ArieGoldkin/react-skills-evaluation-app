# Text

A flexible typography component with semantic variants, color options, and responsive behavior. Built on shadcn/ui typography patterns with enhanced features.

## Features

- **Typography Scale**: Display, headings (h1-h4), body variants, and specialized text
- **Semantic Elements**: Automatic element selection or manual override with `as` prop
- **Color System**: Full design token color integration
- **Text Properties**: Alignment, weight, and truncation options
- **Responsive Design**: Mobile-first typography scaling
- **Accessibility**: Proper semantic structure and ARIA support
- **TypeScript**: Complete type definitions

## Basic Usage

```tsx
import { Text } from "@skills-eval/design-system";

// Basic text
<Text>Default body text</Text>

// Heading variants
<Text variant="h1">Main Heading</Text>
<Text variant="h2">Section Heading</Text>

// Body variants
<Text variant="lead">Introduction text</Text>
<Text variant="body-lg">Large body text</Text>
<Text variant="body-sm">Small body text</Text>
```

## Typography Scale

### Display and Headings

```tsx
<Text variant="display">Display Text</Text>
<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="h4">Heading 4</Text>
```

### Body Text

```tsx
<Text variant="body-lg">Large body text for emphasis</Text>
<Text variant="body">Regular body text (default)</Text>
<Text variant="body-sm">Small body text for secondary info</Text>
```

### Specialized Text

```tsx
<Text variant="lead">Lead text that introduces a section</Text>
<Text variant="large">Large text for emphasis</Text>
<Text variant="caption">Caption text for images</Text>
<Text variant="overline">Overline Text</Text>
<Text variant="muted">Muted text for less important info</Text>
```

## Semantic Elements

The component automatically selects appropriate HTML elements based on the variant, but you can override this:

```tsx
// Automatic element selection
<Text variant="h1">Renders as <h1></Text>
<Text variant="body">Renders as <p></Text>
<Text variant="caption">Renders as <span></Text>

// Manual element override
<Text variant="h1" as="p">H1 styling but <p> element</Text>
<Text variant="body" as="div">Body styling but <div> element</Text>
<Text variant="caption" as="label">Caption styling but <label> element</Text>
```

### Element Mapping

| Variant                                 | Default Element |
| --------------------------------------- | --------------- |
| `display`, `h1`                         | `h1`            |
| `h2`                                    | `h2`            |
| `h3`                                    | `h3`            |
| `h4`                                    | `h4`            |
| `body-lg`, `body`, `body-sm`, `lead`    | `p`             |
| `large`, `caption`, `overline`, `muted` | `span`          |

## Colors

```tsx
<Text color="primary">Primary text (default)</Text>
<Text color="secondary">Secondary text</Text>
<Text color="muted">Muted text</Text>
<Text color="error">Error text</Text>
<Text color="success">Success text</Text>
<Text color="warning">Warning text</Text>
<Text color="info">Info text</Text>
```

## Text Alignment

```tsx
<Text align="left">Left-aligned (default)</Text>
<Text align="center">Center-aligned</Text>
<Text align="right">Right-aligned</Text>
<Text align="justify">Justified text</Text>
```

## Font Weight

```tsx
<Text weight="normal">Normal weight (default)</Text>
<Text weight="medium">Medium weight</Text>
<Text weight="semibold">Semibold weight</Text>
<Text weight="bold">Bold weight</Text>
```

## Text Truncation

```tsx
// Single line truncation
<Text truncate={true}>
  This long text will be truncated to a single line...
</Text>

// Multi-line truncation
<Text truncate={2}>
  This longer text will be truncated to exactly two lines when it exceeds that limit...
</Text>

<Text truncate={3}>
  This text will be truncated to three lines maximum...
</Text>

// No truncation (default)
<Text>
  This text will wrap naturally without any truncation applied.
</Text>
```

## Combined Properties

```tsx
<Text
  variant="h2"
  color="success"
  align="center"
  weight="bold"
  truncate={true}
>
  Bold, centered, success-colored heading
</Text>

<Text
  variant="body-lg"
  color="muted"
  align="justify"
  weight="medium"
  truncate={2}
>
  Medium weight, justified body text with two-line truncation
</Text>
```

## Responsive Typography

The display variant automatically scales for responsive design:

```tsx
<Text variant="display">
  Automatically scales from text-4xl on mobile to text-5xl on large screens
</Text>
```

## Content Examples

### Article Structure

```tsx
<article>
  <Text variant="overline" color="muted">
    Technology
  </Text>
  <Text variant="h1">The Future of Design Systems</Text>
  <Text variant="lead">
    How component libraries are evolving to meet modern development demands
  </Text>

  <Text variant="body">
    Design systems provide consistency and efficiency across applications...
  </Text>

  <Text variant="h3">Key Benefits</Text>
  <Text variant="body">
    The primary advantages include improved consistency...
  </Text>

  <Text variant="body-sm" color="muted">
    Last updated: March 2024
  </Text>
</article>
```

### Status Messages

```tsx
<div>
  <Text color="success" weight="medium">
    ✓ All tests passing
  </Text>
  <Text color="warning" weight="medium">
    ⚠ Some warnings found
  </Text>
  <Text color="error" weight="medium">
    ✗ Build failed
  </Text>
  <Text color="info" weight="medium">
    ℹ New version available
  </Text>
</div>
```

### Content Cards

```tsx
<div>
  <Text variant="h4" truncate={true}>
    Card Title That Might Be Long
  </Text>
  <Text variant="body" color="muted" truncate={3}>
    Card description that provides context and details about the content, which
    will be truncated to three lines to maintain consistent layout...
  </Text>
  <Text variant="caption" color="muted">
    2 minutes ago
  </Text>
</div>
```

## Props

| Prop        | Type                                                                                                                                       | Default       | Description                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | --------------------------------------------------------- |
| `variant`   | `"display" \| "h1" \| "h2" \| "h3" \| "h4" \| "body-lg" \| "body" \| "body-sm" \| "lead" \| "large" \| "caption" \| "overline" \| "muted"` | `"body"`      | Typography variant                                        |
| `as`        | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "p" \| "span" \| "div" \| "label"`                                                        | Auto-selected | HTML element to render                                    |
| `color`     | `"primary" \| "secondary" \| "muted" \| "error" \| "success" \| "warning" \| "info"`                                                       | `"primary"`   | Text color variant                                        |
| `align`     | `"left" \| "center" \| "right" \| "justify"`                                                                                               | `"left"`      | Text alignment                                            |
| `weight`    | `"normal" \| "medium" \| "semibold" \| "bold"`                                                                                             | `"normal"`    | Font weight                                               |
| `truncate`  | `boolean \| number`                                                                                                                        | `false`       | Text truncation (true = single line, number = multi-line) |
| `children`  | `ReactNode`                                                                                                                                | -             | Text content                                              |
| `className` | `string`                                                                                                                                   | -             | Additional CSS classes                                    |

All standard HTML attributes are also supported based on the rendered element.

## Accessibility

### Semantic Structure

- **Heading Hierarchy**: Use appropriate heading levels (h1 → h2 → h3 → h4)
- **Element Choice**: Choose semantic elements that match content meaning
- **Screen Readers**: Proper element selection aids screen reader navigation

```tsx
// Good semantic structure
<Text variant="h1" as="h1">Page Title</Text>
<Text variant="h2" as="h2">Section Title</Text>
<Text variant="h3" as="h3">Subsection Title</Text>

// Visual hierarchy without semantic meaning
<Text variant="h1" as="p">Looks like H1 but doesn't break heading structure</Text>
```

### Color and Contrast

- **WCAG AA Compliance**: All color variants meet contrast requirements
- **Color Meaning**: Don't rely solely on color to convey meaning
- **High Contrast**: Supports high contrast mode

### Reading and Comprehension

- **Line Height**: Optimized for readability across all variants
- **Font Scaling**: Responsive scaling improves readability
- **Truncation**: Use sparingly and provide full content access when needed

## Styling

The component uses CVA (Class Variance Authority) and includes:

- **Typography Scale**: Consistent sizing and spacing
- **Color Integration**: Design token color system
- **Responsive Behavior**: Mobile-first approach
- **Dark Mode**: Full theme support
- **Custom Properties**: CSS custom properties for theming

## Best Practices

### Typography Hierarchy

1. **Use semantic elements** that match content structure
2. **Maintain heading hierarchy** (h1 → h2 → h3 → h4)
3. **Choose appropriate variants** for content purpose
4. **Limit heading levels** (avoid deep nesting)

### Performance

1. **Use appropriate truncation** for lists and cards
2. **Avoid excessive nesting** of text components
3. **Consider responsive scaling** for mobile users

### Accessibility

1. **Test with screen readers** to ensure proper navigation
2. **Verify color contrast** meets WCAG guidelines
3. **Provide full content access** when using truncation
4. **Use semantic elements** for better screen reader experience

### Content Strategy

1. **Write clear, concise text** appropriate for the variant
2. **Use consistent voice and tone** across variants
3. **Consider reading flow** when combining variants
4. **Test content length** with truncation settings

## Migration from HTML Elements

```tsx
// Before (plain HTML)
<h1 className="text-4xl font-bold">Title</h1>
<p className="text-lg text-gray-600">Description</p>

// After (Text component)
<Text variant="h1">Title</Text>
<Text variant="body-lg" color="muted">Description</Text>
```

## Integration with Forms

```tsx
<div>
  <Text variant="large" as="label" htmlFor="email" weight="medium">
    Email Address
  </Text>
  <Input id="email" type="email" />
  <Text variant="caption" color="muted">
    We'll never share your email address
  </Text>
</div>
```

The Text component provides a solid foundation for consistent, accessible, and responsive typography throughout your application.
