# Breadcrumb Component

A flexible breadcrumb navigation component with Next.js integration and automatic path generation.

## Features

- 🔗 Automatic breadcrumb generation from URL paths
- 🎨 Customizable styling and separators
- ♿ Full accessibility support
- 📱 Responsive with max items truncation
- 🏠 Optional home link
- 🎯 TypeScript support
- 🧩 Icon support for each item

## Usage

### Basic Usage

```tsx
import { Breadcrumb } from "@skills-eval/design-system";

// With explicit items
<Breadcrumb
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Skills", href: "/dashboard/skills" },
    { label: "New Skill" }
  ]}
/>

// Auto-generated from pathname
<Breadcrumb />
```

### With Icons

```tsx
import { Home, Users, Settings } from "lucide-react";

<Breadcrumb
  items={[
    { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { label: "Users", href: "/users", icon: <Users className="h-4 w-4" /> },
    { label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ]}
/>;
```

### Custom Separator

```tsx
<Breadcrumb
  items={items}
  separator="/"
  // or
  separator={<ChevronRight className="h-4 w-4" />}
/>
```

### Max Items with Ellipsis

```tsx
<Breadcrumb items={longItemsList} maxItems={4} />
```

## Props

| Prop                 | Type               | Default            | Description                                                              |
| -------------------- | ------------------ | ------------------ | ------------------------------------------------------------------------ |
| `items`              | `BreadcrumbItem[]` | `undefined`        | Array of breadcrumb items. If not provided, auto-generates from pathname |
| `separator`          | `ReactNode`        | `<ChevronRight />` | Separator between breadcrumb items                                       |
| `className`          | `string`           | `undefined`        | CSS class for the nav element                                            |
| `homeLabel`          | `string`           | `"Home"`           | Label for the home link                                                  |
| `homeHref`           | `string`           | `"/"`              | URL for the home link                                                    |
| `showHome`           | `boolean`          | `true`             | Whether to show the home link                                            |
| `maxItems`           | `number`           | `undefined`        | Maximum items to display (shows ellipsis if exceeded)                    |
| `itemClassName`      | `string`           | `undefined`        | CSS class for each breadcrumb item                                       |
| `separatorClassName` | `string`           | `undefined`        | CSS class for separators                                                 |
| `activeClassName`    | `string`           | `undefined`        | CSS class for the active/current item                                    |

## BreadcrumbItem Type

```tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}
```

## Accessibility

- Uses semantic `<nav>` element with proper ARIA label
- Ordered list (`<ol>`) for proper structure
- Current page marked with `aria-current="page"`
- Separators hidden from screen readers with `aria-hidden="true"`
- Keyboard navigable links

## Examples

### E-commerce Breadcrumb

```tsx
<Breadcrumb
  items={[
    { label: "Shop", href: "/shop" },
    { label: "Electronics", href: "/shop/electronics" },
    { label: "Laptops", href: "/shop/electronics/laptops" },
    { label: "Gaming Laptops", href: "/shop/electronics/laptops/gaming" },
    { label: product.name },
  ]}
  maxItems={5}
/>
```

### Admin Dashboard

```tsx
<Breadcrumb
  homeLabel="Admin"
  homeHref="/admin"
  items={[
    { label: "Users", href: "/admin/users" },
    { label: "Permissions", href: "/admin/users/permissions" },
    { label: "Edit Role" },
  ]}
/>
```

### Documentation Site

```tsx
<Breadcrumb
  showHome={false}
  items={[
    { label: "Docs", href: "/docs", icon: <Book /> },
    { label: "Components", href: "/docs/components" },
    { label: "Navigation", href: "/docs/components/navigation" },
    { label: "Breadcrumb" },
  ]}
/>
```

## Styling

The component uses Tailwind CSS classes and can be customized using the className props:

```tsx
<Breadcrumb
  className="bg-gray-50 p-4 rounded-lg"
  itemClassName="text-sm font-medium"
  separatorClassName="text-gray-400"
  activeClassName="text-blue-600 font-semibold"
/>
```

## Best Practices

1. **Last item should not have href** - The current page shouldn't be a link
2. **Use descriptive labels** - Avoid abbreviations or technical IDs
3. **Keep it concise** - Use `maxItems` for deep navigation structures
4. **Consistent separators** - Use the same separator style throughout your app
5. **Mobile consideration** - Test with long breadcrumb trails on small screens
