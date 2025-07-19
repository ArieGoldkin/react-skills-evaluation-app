# Button

A versatile button component built on shadcn/ui with multiple variants and sizes. Supports composition patterns through Radix UI Slot.

## Usage

```tsx
import { Button } from "@skills-eval/design-system";

export function Example() {
  return (
    <Button variant="default" size="md">
      Click me
    </Button>
  );
}
```

## Props

| Prop     | Type                                                                        | Default   | Description                              |
| -------- | --------------------------------------------------------------------------- | --------- | ---------------------------------------- |
| variant  | 'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' | 'default' | Visual variant of the button             |
| size     | 'default' \| 'sm' \| 'lg' \| 'icon'                                         | 'default' | Size variant of the button               |
| asChild  | boolean                                                                     | false     | Render as child element using Radix Slot |
| disabled | boolean                                                                     | false     | Disable the button                       |

## Examples

### Basic Usage

```tsx
<Button>Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🚀</Button>
```

### Advanced Usage

```tsx
// Using asChild for composition
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// Disabled state
<Button disabled>Disabled Button</Button>

// Destructive action
<Button variant="destructive">Delete Item</Button>
```

## Accessibility

- Supports keyboard navigation with Tab and Enter/Space keys
- Includes proper ARIA attributes for screen readers
- Focus management with visible focus indicators
- Meets WCAG AA contrast requirements for all variants
- Disabled state properly communicated to assistive technologies

## Implementation Notes

- Built on shadcn/ui foundation with Radix UI Slot for composition
- Uses class-variance-authority (CVA) for variant management
- Fully typed with TypeScript interfaces
- Supports all standard HTML button attributes
- Optimized for performance with React.forwardRef
