# Container

A responsive container component that provides consistent content width constraints and padding across different screen sizes.

## Usage

```tsx
import { Container } from "@skills-eval/design-system";

export function Example() {
  return (
    <Container size="lg" padding="md">
      <h1>Page Content</h1>
      <p>This content is properly contained and responsive.</p>
    </Container>
  );
}
```

## Props

| Prop    | Type                                   | Default | Description               |
| ------- | -------------------------------------- | ------- | ------------------------- |
| size    | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'lg'    | Maximum width constraint  |
| padding | 'none' \| 'sm' \| 'md' \| 'lg'         | 'md'    | Horizontal padding        |
| as      | React.ElementType                      | 'div'   | HTML element to render as |

## Size Variants

- **sm**: max-w-2xl (672px)
- **md**: max-w-4xl (896px)
- **lg**: max-w-6xl (1152px)
- **xl**: max-w-7xl (1280px)
- **full**: max-w-full (no constraint)

## Padding Variants

- **none**: px-0 (no padding)
- **sm**: px-4 (16px)
- **md**: px-6 (24px)
- **lg**: px-8 (32px)

## Examples

### Basic Usage

```tsx
<Container>
  <h1>Default Container</h1>
  <p>Uses lg size and md padding by default.</p>
</Container>
```

### Different Sizes

```tsx
<Container size="sm">Small container for narrow content</Container>
<Container size="xl">Extra large container for wide layouts</Container>
<Container size="full">Full width container</Container>
```

### Semantic HTML

```tsx
<Container as="main" size="lg">
  <h1>Main Content Area</h1>
</Container>

<Container as="section" size="md">
  <h2>Section Content</h2>
</Container>
```

### Custom Padding

```tsx
<Container padding="none">No horizontal padding</Container>
<Container padding="lg">Extra padding for breathing room</Container>
```

## Responsive Behavior

The Container component is mobile-first and includes responsive padding:

- Base: px-4 (16px)
- sm: px-6 (24px)
- lg: px-8 (32px)

The padding prop overrides these defaults for more control.

## Accessibility

- Uses semantic HTML elements when specified with `as` prop
- Supports all standard HTML attributes
- Proper landmark roles when using semantic elements
- Screen reader friendly with meaningful structure

## Implementation Notes

- Built with Tailwind CSS utility classes
- Uses class-variance-authority (CVA) for variant management
- Fully typed with TypeScript interfaces
- Supports ref forwarding for DOM access
- Mobile-first responsive design approach
