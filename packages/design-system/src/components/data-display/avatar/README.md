# Avatar Component

An image element with a fallback for representing users. Built on shadcn/ui principles with enhanced features including status indicators, multiple sizes, and automatic initials generation.

## Features

- **6 Size Variants**: xs (24px), sm (32px), md (40px), lg (48px), xl (64px), 2xl (80px)
- **2 Shape Variants**: circle (default), square
- **4 Status Indicators**: online, offline, busy, away  
- **Automatic Initials**: Generates initials from name prop
- **Image Fallback**: Graceful fallback when image fails to load
- **Full Accessibility**: WCAG AA compliant with proper ARIA labels
- **Composition Pattern**: Built with sub-components for flexibility

## Installation

```bash
# Component is part of the design system
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
} from "@/components/data-display/avatar"
```

## Basic Usage

### Simple Avatar with Image

```tsx
<Avatar>
  <AvatarImage src="/user-image.jpg" alt="John Doe" />
  <AvatarFallback name="John Doe" />
</Avatar>
```

### Avatar with Fallback Only

```tsx
<Avatar>
  <AvatarFallback name="John Doe" />
</Avatar>
```

### Avatar with Status Indicator

```tsx
<Avatar status="online">
  <AvatarImage src="/user-image.jpg" alt="John Doe" />
  <AvatarFallback name="John Doe" />
</Avatar>
```

## Component API

### Avatar

Main container component that handles size, shape, and status indicator positioning.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Size of the avatar |
| `shape` | `"circle" \| "square"` | `"circle"` | Shape of the avatar |
| `status` | `"online" \| "offline" \| "busy" \| "away"` | `undefined` | Status indicator |
| `className` | `string` | `undefined` | Additional CSS classes |

### AvatarImage

Image component for displaying user photos.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | Image source URL |
| `alt` | `string` | `"Avatar"` | Alternative text for the image |
| `shape` | `"circle" \| "square"` | `"circle"` | Shape of the image |
| `className` | `string` | `undefined` | Additional CSS classes |

### AvatarFallback

Fallback component displayed when image fails to load or isn't provided.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `undefined` | Name to generate initials from |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Size for text scaling |
| `shape` | `"circle" \| "square"` | `"circle"` | Shape of the fallback |
| `children` | `React.ReactNode` | `undefined` | Custom fallback content |
| `className` | `string` | `undefined` | Additional CSS classes |

### AvatarStatus

Status indicator component (rendered automatically when status prop is provided).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `"online" \| "offline" \| "busy" \| "away"` | `undefined` | Status type |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Size of the status indicator |
| `className` | `string` | `undefined` | Additional CSS classes |

## Examples

### Size Variants

```tsx
<div className="flex items-center gap-4">
  <Avatar size="xs"><AvatarFallback name="John Doe" /></Avatar>
  <Avatar size="sm"><AvatarFallback name="John Doe" /></Avatar>
  <Avatar size="md"><AvatarFallback name="John Doe" /></Avatar>
  <Avatar size="lg"><AvatarFallback name="John Doe" /></Avatar>
  <Avatar size="xl"><AvatarFallback name="John Doe" /></Avatar>
  <Avatar size="2xl"><AvatarFallback name="John Doe" /></Avatar>
</div>
```

### Shape Variants

```tsx
<div className="flex items-center gap-4">
  <Avatar shape="circle">
    <AvatarFallback name="John Doe" />
  </Avatar>
  <Avatar shape="square">
    <AvatarFallback name="John Doe" />
  </Avatar>
</div>
```

### Status Indicators

```tsx
<div className="flex items-center gap-4">
  <Avatar status="online"><AvatarFallback name="John Doe" /></Avatar>
  <Avatar status="offline"><AvatarFallback name="Jane Smith" /></Avatar>
  <Avatar status="busy"><AvatarFallback name="Bob Wilson" /></Avatar>
  <Avatar status="away"><AvatarFallback name="Alice Johnson" /></Avatar>
</div>
```

### Initials Generation

The component automatically generates initials from the `name` prop:

```tsx
{/* Single name -> "J" */}
<Avatar><AvatarFallback name="John" /></Avatar>

{/* Two names -> "JD" */}
<Avatar><AvatarFallback name="John Doe" /></Avatar>

{/* Multiple names -> First + Last -> "JS" */}
<Avatar><AvatarFallback name="John Michael Doe Smith" /></Avatar>

{/* Custom fallback (overrides name) */}
<Avatar><AvatarFallback name="John Doe">Custom</AvatarFallback></Avatar>
```

### User Profile Card

```tsx
<div className="flex items-center gap-3 p-4 border rounded-lg">
  <Avatar size="lg" status="online">
    <AvatarImage src="/user-image.jpg" alt="John Doe" />
    <AvatarFallback name="John Doe" />
  </Avatar>
  <div className="flex flex-col">
    <span className="font-medium">John Doe</span>
    <span className="text-sm text-muted-foreground">Online</span>
  </div>
</div>
```

### Avatar Group (Overlapping)

```tsx
<div className="flex -space-x-2">
  <Avatar className="border-2 border-background">
    <AvatarFallback name="John Doe" />
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback name="Jane Smith" />
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback name="Bob Wilson" />
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+5</AvatarFallback>
  </Avatar>
</div>
```

### Team Members List

```tsx
<div className="space-y-2">
  {teamMembers.map((member) => (
    <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
      <Avatar size="md" status={member.status}>
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback name={member.name} />
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{member.name}</span>
        <span className="text-xs text-muted-foreground">{member.role}</span>
      </div>
    </div>
  ))}
</div>
```

## Accessibility

The Avatar component is built with accessibility in mind:

- **ARIA Labels**: Proper `aria-label` attributes for status indicators and fallbacks
- **Alt Text**: Automatic and customizable alt text for images
- **Semantic Structure**: Uses appropriate HTML elements and roles
- **Screen Reader Support**: Descriptive labels for all interactive elements
- **Keyboard Navigation**: Fully accessible via keyboard when used in interactive contexts

### Accessibility Features

```tsx
{/* Automatic ARIA labels */}
<Avatar status="online">
  <AvatarFallback name="John Doe" />
</Avatar>
{/* Results in aria-label="Status: online" for status indicator */}
{/* Results in aria-label="John Doe's avatar" for fallback */}

{/* Custom alt text for images */}
<Avatar>
  <AvatarImage src="/user.jpg" alt="Profile picture of John Doe" />
  <AvatarFallback name="John Doe" />
</Avatar>
```

## Styling and Customization

### Custom Classes

```tsx
<Avatar className="ring-2 ring-blue-500 ring-offset-2">
  <AvatarFallback name="John Doe" />
</Avatar>
```

### Custom Status Colors

You can extend the status colors by modifying the component or using custom CSS:

```tsx
<Avatar>
  <AvatarFallback name="John Doe" />
  <div className="absolute -bottom-0 -right-0 h-3 w-3 bg-purple-500 border-2 border-background rounded-full" />
</Avatar>
```

## Design Tokens

The Avatar component uses the following design tokens:

- **Colors**: `muted`, `muted-foreground`, `background`, status colors (green-500, gray-400, red-500, yellow-500)
- **Spacing**: Consistent spacing scale for sizes and positioning
- **Border Radius**: `rounded-full` for circle, `rounded-md` for square
- **Typography**: Responsive text scaling based on avatar size

## Performance Considerations

- **Image Loading**: Handles image loading states gracefully
- **Memory Efficiency**: Optimized for lists with many avatars
- **Bundle Size**: Minimal impact with tree-shaking support
- **CSS-in-JS**: Uses Tailwind classes for optimal performance

## Browser Support

- ✅ Chrome/Edge 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ iOS Safari 14.4+
- ✅ Android Chrome 88+

## Migration Guide

If migrating from other avatar components:

### From React Avatar

```tsx
// Before
<ReactAvatar name="John Doe" size="50" round />

// After
<Avatar size="lg">
  <AvatarFallback name="John Doe" />
</Avatar>
```

### From Custom Implementation

```tsx
// Before
<div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
  <span>JD</span>
</div>

// After
<Avatar>
  <AvatarFallback name="John Doe" />
</Avatar>
```

## Testing

The component includes comprehensive tests covering:

- ✅ All size and shape variants
- ✅ Status indicator functionality
- ✅ Initials generation logic
- ✅ Image loading and fallback behavior
- ✅ Accessibility compliance
- ✅ Integration between sub-components

```bash
# Run Avatar component tests
npm test avatar.test.tsx
```

## Related Components

- **[Button](../ui/button/README.md)** - For interactive user actions
- **[Card](../ui/card/README.md)** - For containing user information
- **[Badge](../ui/badge/README.md)** - For additional user status indicators

## Changelog

### v1.0.0
- ✅ Initial implementation with shadcn/ui compatibility
- ✅ Size variants (xs, sm, md, lg, xl, 2xl)
- ✅ Shape variants (circle, square)
- ✅ Status indicators (online, offline, busy, away)
- ✅ Automatic initials generation
- ✅ Full accessibility support
- ✅ Comprehensive test coverage
- ✅ Storybook documentation