# Input

A comprehensive input component with built-in validation states, icons, labels, and accessibility features. Supports multiple sizes and provides visual feedback for different states.

## Features

- **Multiple sizes**: `sm`, `default`, `lg`
- **Validation states**: error, success with automatic icons
- **Icon support**: Left and right icons with proper spacing
- **Accessibility**: Full ARIA support and keyboard navigation
- **TypeScript**: Complete type definitions
- **Form integration**: Works with form libraries and validation

## Basic Usage

```tsx
import { Input } from "@skills-eval/design-system";

// Basic input
<Input placeholder="Enter your text..." />

// With label
<Input label="Full Name" placeholder="Enter your full name" />

// Required field
<Input label="Email" type="email" required />
```

## Sizes

```tsx
<Input size="sm" placeholder="Small input" />
<Input size="default" placeholder="Default input" />
<Input size="lg" placeholder="Large input" />
```

## Input Types

Supports all standard HTML input types:

```tsx
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="123" />
<Input type="search" placeholder="Search..." />
<Input type="tel" placeholder="+1 (555) 123-4567" />
<Input type="url" placeholder="https://example.com" />
```

## With Icons

```tsx
import { Mail, Search, User } from "lucide-react";

// Left icon
<Input
  leftIcon={<Mail className="h-4 w-4" />}
  placeholder="email@example.com"
/>

// Right icon
<Input
  rightIcon={<Search className="h-4 w-4" />}
  placeholder="Search..."
/>

// Both icons
<Input
  leftIcon={<User className="h-4 w-4" />}
  rightIcon={<Search className="h-4 w-4" />}
  placeholder="Search users..."
/>
```

## Validation States

```tsx
// Success state (with automatic icon)
<Input
  label="Valid Email"
  value="john@example.com"
  success={true}
/>

// Error state (with automatic icon)
<Input
  label="Invalid Email"
  value="invalid-email"
  error="Please enter a valid email address"
/>

// With hint text
<Input
  label="Password"
  type="password"
  hint="Must be at least 8 characters long"
/>
```

## Form Integration

```tsx
import { useState } from "react";

function ContactForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    if (!value.includes("@")) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  return (
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={e => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
      }}
      error={error}
      success={email.includes("@") && !error}
      leftIcon={<Mail className="h-4 w-4" />}
      required
    />
  );
}
```

## Advanced Example: Password Toggle

```tsx
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      label="Password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      leftIcon={<Lock className="h-4 w-4" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      }
    />
  );
}
```

## Props

| Prop                 | Type                                | Default     | Description                                     |
| -------------------- | ----------------------------------- | ----------- | ----------------------------------------------- |
| `size`               | `"sm" \| "default" \| "lg"`         | `"default"` | Size of the input                               |
| `state`              | `"default" \| "error" \| "success"` | `"default"` | Visual state (auto-detected from error/success) |
| `label`              | `string`                            | -           | Label text                                      |
| `error`              | `string`                            | -           | Error message (shows error state)               |
| `success`            | `boolean`                           | -           | Success state                                   |
| `hint`               | `string`                            | -           | Helper text                                     |
| `leftIcon`           | `ReactNode`                         | -           | Icon on the left side                           |
| `rightIcon`          | `ReactNode`                         | -           | Icon on the right side                          |
| `required`           | `boolean`                           | -           | Shows required indicator (\*)                   |
| `containerClassName` | `string`                            | -           | CSS class for the container                     |
| `className`          | `string`                            | -           | CSS class for the input                         |

All standard HTML input attributes are also supported.

## Accessibility

- **Labels**: Properly associated with inputs using `htmlFor` and `id`
- **ARIA**: Includes `aria-describedby` for error messages and hints
- **Required fields**: Marked with visual indicator and `required` attribute
- **Error states**: Include `aria-invalid` attribute
- **Focus management**: Proper focus styles and keyboard navigation
- **Screen readers**: Descriptive text for validation states

## Styling

The component uses CVA (Class Variance Authority) for variant management and includes:

- **Base styles**: Border, background, focus states
- **Size variants**: Height, padding, font size
- **State variants**: Border and focus ring colors
- **Icon spacing**: Automatic padding adjustments
- **Dark mode**: Full support via CSS custom properties

## Best Practices

1. **Always use labels** for better accessibility
2. **Provide helpful error messages** that guide users
3. **Use appropriate input types** for better mobile experience
4. **Include hint text** for complex requirements
5. **Use icons sparingly** and ensure they add value
6. **Test with screen readers** to ensure accessibility
7. **Validate on both client and server** side
