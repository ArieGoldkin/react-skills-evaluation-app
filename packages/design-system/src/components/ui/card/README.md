# Card

A flexible card component with header, content, and footer sections. Built on shadcn/ui patterns with enhanced variants for different visual styles and interaction states.

## Usage

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@skills-eval/design-system";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <button>Action</button>
      </CardFooter>
    </Card>
  );
}
```

## Components

### Card

Main container component with variants for different visual styles.

### CardHeader

Header section typically containing title and description.

### CardTitle

Semantic heading element with size variants.

### CardDescription

Descriptive text element with muted styling.

### CardContent

Main content area of the card.

### CardFooter

Footer section for actions and additional information.

## Props

### Card Props

| Prop      | Type                                             | Default   | Description                                        |
| --------- | ------------------------------------------------ | --------- | -------------------------------------------------- |
| variant   | 'default' \| 'outlined' \| 'elevated' \| 'ghost' | 'default' | Visual variant                                     |
| padding   | 'none' \| 'sm' \| 'default' \| 'lg'              | 'default' | Padding size                                       |
| clickable | boolean                                          | false     | Makes card interactive with hover and focus states |
| asChild   | boolean                                          | false     | Render as child element                            |

### CardHeader Props

| Prop    | Type                                | Default   | Description         |
| ------- | ----------------------------------- | --------- | ------------------- |
| padding | 'none' \| 'sm' \| 'default' \| 'lg' | 'default' | Header padding size |

### CardTitle Props

| Prop | Type                                         | Default   | Description          |
| ---- | -------------------------------------------- | --------- | -------------------- |
| as   | 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' | 'h3'      | HTML heading element |
| size | 'sm' \| 'default' \| 'lg'                    | 'default' | Title size variant   |

### CardDescription Props

| Prop | Type                      | Default   | Description              |
| ---- | ------------------------- | --------- | ------------------------ |
| size | 'sm' \| 'default' \| 'lg' | 'default' | Description size variant |

### CardContent Props

| Prop    | Type                                | Default   | Description          |
| ------- | ----------------------------------- | --------- | -------------------- |
| padding | 'none' \| 'sm' \| 'default' \| 'lg' | 'default' | Content padding size |

### CardFooter Props

| Prop    | Type                                                  | Default   | Description              |
| ------- | ----------------------------------------------------- | --------- | ------------------------ |
| padding | 'none' \| 'sm' \| 'default' \| 'lg'                   | 'default' | Footer padding size      |
| justify | 'start' \| 'center' \| 'end' \| 'between' \| 'around' | 'start'   | Footer content alignment |

## Examples

### Basic Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Getting Started</CardTitle>
    <CardDescription>Learn the basics of our platform</CardDescription>
  </CardHeader>
  <CardContent>
    <p>
      This guide will walk you through the essential features and help you get
      up and running quickly.
    </p>
  </CardContent>
  <CardFooter>
    <Button>Start Tutorial</Button>
  </CardFooter>
</Card>
```

### Card Variants

```tsx
{
  /* Default card */
}
<Card>
  <CardContent>Standard card with subtle border and shadow</CardContent>
</Card>;

{
  /* Outlined card */
}
<Card variant="outlined">
  <CardContent>Prominent border for emphasis</CardContent>
</Card>;

{
  /* Elevated card */
}
<Card variant="elevated">
  <CardContent>Enhanced shadow with no border</CardContent>
</Card>;

{
  /* Ghost card */
}
<Card variant="ghost">
  <CardContent>Minimal styling, transparent background</CardContent>
</Card>;
```

### Interactive Card

```tsx
<Card
  clickable
  onClick={() => navigate("/product/123")}
  className="transition-transform hover:scale-105"
>
  <CardHeader>
    <CardTitle>Premium Plan</CardTitle>
    <CardDescription>Best value for growing teams</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Everything in Pro plus advanced analytics and priority support.</p>
  </CardContent>
</Card>
```

### Padding Variants

```tsx
{
  /* Compact card */
}
<Card padding="sm">
  <CardHeader padding="sm">
    <CardTitle size="sm">Compact Layout</CardTitle>
  </CardHeader>
  <CardContent padding="sm">
    <p>Dense information display</p>
  </CardContent>
</Card>;

{
  /* Spacious card */
}
<Card padding="lg">
  <CardHeader padding="lg">
    <CardTitle size="lg">Spacious Layout</CardTitle>
  </CardHeader>
  <CardContent padding="lg">
    <p>Comfortable reading experience</p>
  </CardContent>
</Card>;
```

### Product Card

```tsx
<Card className="w-[350px]">
  <CardHeader>
    <img
      src="/product-image.jpg"
      alt="Product"
      className="w-full h-48 object-cover rounded-md mb-4"
    />
    <CardTitle>Wireless Headphones</CardTitle>
    <CardDescription>
      Premium audio experience with noise cancellation
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold">$199.99</span>
      <span className="text-sm text-muted-foreground line-through">
        $249.99
      </span>
    </div>
    <div className="mt-2 text-sm text-green-600">
      ✓ Free shipping • In stock
    </div>
  </CardContent>
  <CardFooter justify="between">
    <Button variant="outline">Add to Cart</Button>
    <Button>Buy Now</Button>
  </CardFooter>
</Card>
```

### User Profile Card

```tsx
<Card className="w-[300px]">
  <CardHeader>
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="/user-avatar.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle size="sm">John Doe</CardTitle>
        <CardDescription>Senior Developer</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <p>
      Full-stack developer passionate about creating elegant solutions to
      complex problems.
    </p>
    <div className="flex items-center mt-4 text-sm text-muted-foreground">
      <MapPin className="w-4 h-4 mr-1" />
      San Francisco, CA
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm" className="w-full">
      View Profile
    </Button>
  </CardFooter>
</Card>
```

### Statistics Card

```tsx
<Card>
  <CardHeader>
    <CardTitle size="sm">Monthly Revenue</CardTitle>
    <CardDescription>Total earnings this month</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold">$12,345</div>
    <div className="flex items-center mt-2 text-sm">
      <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
      <span className="text-green-600">+12.5% from last month</span>
    </div>
  </CardContent>
</Card>
```

### Notification Card

```tsx
<Card variant="outlined" className="w-[400px]">
  <CardHeader>
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-2">
        <Bell className="w-5 h-5" />
        <div>
          <CardTitle size="sm">New Message</CardTitle>
          <CardDescription>5 minutes ago</CardDescription>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <X className="w-4 h-4" />
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <p>
      You have a new message from Sarah regarding the project timeline. Please
      review when convenient.
    </p>
  </CardContent>
  <CardFooter justify="end">
    <Button variant="outline" size="sm">
      Mark as Read
    </Button>
    <Button size="sm">View Message</Button>
  </CardFooter>
</Card>
```

### Custom Padding Control

```tsx
<Card padding="none">
  {/* Custom header with specific styling */}
  <div className="p-6 border-b bg-muted/50">
    <CardTitle>Custom Layout</CardTitle>
    <CardDescription>Full control over spacing and layout</CardDescription>
  </div>

  {/* Image without padding */}
  <img src="/banner.jpg" alt="Banner" className="w-full h-32 object-cover" />

  {/* Custom content area */}
  <div className="p-6">
    <p>
      When you need precise control over spacing and layout, use padding="none"
      and apply custom spacing.
    </p>
  </div>

  {/* Custom footer */}
  <div className="px-6 pb-6 flex justify-end space-x-2">
    <Button variant="outline">Cancel</Button>
    <Button>Continue</Button>
  </div>
</Card>
```

## Composition Patterns

### Minimal Card

```tsx
<Card>
  <CardContent>Simple content without header or footer</CardContent>
</Card>
```

### Header Only

```tsx
<Card>
  <CardHeader>
    <CardTitle>Quick Update</CardTitle>
    <CardDescription>Status information</CardDescription>
  </CardHeader>
</Card>
```

### Content and Footer

```tsx
<Card>
  <CardContent>Main content area with important information</CardContent>
  <CardFooter justify="end">
    <Button>Take Action</Button>
  </CardFooter>
</Card>
```

## Accessibility

### Semantic Structure

- **Headings**: Use appropriate heading levels with CardTitle `as` prop
- **Landmarks**: Card structure provides logical content organization
- **Focus Management**: Clickable cards support keyboard navigation

```tsx
<Card clickable tabIndex={0} onKeyDown={handleKeyDown}>
  <CardHeader>
    <CardTitle as="h2">Accessible Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This card is fully keyboard accessible</p>
  </CardContent>
</Card>
```

### Interactive Cards

- **Keyboard Support**: Enter and Space keys trigger onClick
- **Focus Indicators**: Clear focus ring for keyboard navigation
- **ARIA**: Proper role and tabIndex for interactive elements

### Screen Reader Support

- **Semantic HTML**: Proper heading hierarchy and content structure
- **Alternative Text**: Ensure images have descriptive alt text
- **Contextual Information**: Use CardDescription for additional context

## Styling

### CSS Custom Properties

The Card component uses design tokens for consistent theming:

- `--card`: Card background color
- `--card-foreground`: Card text color
- `--border`: Border color
- `--muted-foreground`: Description text color

### Customization

```tsx
<Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
  <CardHeader>
    <CardTitle className="text-blue-900">Custom Styled Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-blue-800">Custom colors and gradients</p>
  </CardContent>
</Card>
```

## Best Practices

### Content Organization

1. **Use consistent padding** across related cards
2. **Maintain heading hierarchy** with CardTitle `as` prop
3. **Provide context** with CardDescription when needed
4. **Group related actions** in CardFooter

### Visual Design

1. **Choose appropriate variants** for the context
2. **Use elevated cards sparingly** for emphasis
3. **Ensure sufficient contrast** in custom color schemes
4. **Consider responsive behavior** for different screen sizes

### Interaction Design

1. **Make clickable cards obvious** with hover states
2. **Provide keyboard access** for interactive elements
3. **Use loading states** when card content is dynamic
4. **Handle error states** gracefully

### Performance

1. **Optimize images** in card content
2. **Use skeleton cards** for loading states
3. **Implement virtualization** for long lists of cards
4. **Consider lazy loading** for off-screen cards

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with touch support
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## Migration from HTML

```tsx
// Before (plain HTML)
<div className="border rounded-lg p-6 shadow-sm">
  <h3 className="text-xl font-semibold">Title</h3>
  <p className="text-gray-600">Description</p>
  <div className="mt-4">Content</div>
</div>

// After (Card component)
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```
