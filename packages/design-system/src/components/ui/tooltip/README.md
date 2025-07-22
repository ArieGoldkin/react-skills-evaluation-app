# Tooltip Component

A flexible tooltip component built on Radix UI with full accessibility support and customizable styling.

## Features

- 🎯 Multiple positioning options (top, right, bottom, left)
- 🎨 Customizable alignment (start, center, end)
- ⏱️ Configurable delay durations
- ♿ Full accessibility support
- 📱 Touch-friendly
- 🎭 Animation support
- 🧩 Composable API
- 🚀 Simple wrapper component

## Usage

### SimpleTooltip (Recommended)

The simplest way to add tooltips to your application:

```tsx
import { SimpleTooltip } from "@skills-eval/design-system";

<SimpleTooltip content="This is helpful information">
  <button>Hover me</button>
</SimpleTooltip>;
```

### With Custom Positioning

```tsx
<SimpleTooltip content="Appears on the right" side="right" align="start">
  <button>Right aligned tooltip</button>
</SimpleTooltip>
```

### Complex Content

```tsx
<SimpleTooltip
  content={
    <div>
      <strong>Pro tip:</strong>
      <p>You can use React components in tooltips!</p>
    </div>
  }
>
  <button>Complex tooltip</button>
</SimpleTooltip>
```

### Advanced Usage with Composable API

For more control, use the individual components:

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@skills-eval/design-system";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>Hover me</button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

## Props

### SimpleTooltip Props

| Prop                      | Type                                     | Default     | Description                                |
| ------------------------- | ---------------------------------------- | ----------- | ------------------------------------------ |
| `content`                 | `ReactNode`                              | -           | The content to display in the tooltip      |
| `children`                | `ReactNode`                              | -           | The trigger element                        |
| `side`                    | `"top" \| "right" \| "bottom" \| "left"` | `"top"`     | Preferred side of the trigger              |
| `align`                   | `"start" \| "center" \| "end"`           | `"center"`  | Preferred alignment against the trigger    |
| `delayDuration`           | `number`                                 | `700`       | Delay in ms before tooltip opens           |
| `skipDelayDuration`       | `number`                                 | `300`       | Delay when moving between tooltips         |
| `disableHoverableContent` | `boolean`                                | `false`     | Prevent tooltip from staying open on hover |
| `className`               | `string`                                 | `undefined` | Class name for the trigger wrapper         |
| `contentClassName`        | `string`                                 | `undefined` | Class name for the tooltip content         |
| `asChild`                 | `boolean`                                | `false`     | Merge props with child element             |

### TooltipProvider Props

| Prop                      | Type      | Default | Description                          |
| ------------------------- | --------- | ------- | ------------------------------------ |
| `delayDuration`           | `number`  | `700`   | Default delay for all child tooltips |
| `skipDelayDuration`       | `number`  | `300`   | Delay when moving between tooltips   |
| `disableHoverableContent` | `boolean` | `false` | Default for all child tooltips       |

## Examples

### Icon Buttons with Tooltips

```tsx
import { Info, Settings, User } from "lucide-react";

function IconBar() {
  return (
    <div className="flex gap-2">
      <SimpleTooltip content="View profile">
        <button className="p-2">
          <User className="h-4 w-4" />
        </button>
      </SimpleTooltip>

      <SimpleTooltip content="Settings">
        <button className="p-2">
          <Settings className="h-4 w-4" />
        </button>
      </SimpleTooltip>

      <SimpleTooltip content="More information">
        <button className="p-2">
          <Info className="h-4 w-4" />
        </button>
      </SimpleTooltip>
    </div>
  );
}
```

### Form Field Help

```tsx
function FormField() {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        Password
        <SimpleTooltip content="Must be at least 8 characters with one uppercase letter and one number">
          <Info className="h-3 w-3 text-muted-foreground" />
        </SimpleTooltip>
      </label>
      <input type="password" className="w-full rounded border px-3 py-2" />
    </div>
  );
}
```

### Disabled Elements

```tsx
// Wrap disabled elements in a span to enable tooltips
<SimpleTooltip content="This action is not available" asChild>
  <span tabIndex={0}>
    <button disabled>Disabled Action</button>
  </span>
</SimpleTooltip>
```

### Keyboard Shortcuts

```tsx
<SimpleTooltip
  content={
    <div className="space-y-1">
      <p>Save changes</p>
      <p className="text-xs text-muted-foreground">
        <kbd>⌘</kbd> + <kbd>S</kbd>
      </p>
    </div>
  }
>
  <button>Save</button>
</SimpleTooltip>
```

### Table Actions

```tsx
function DataTable() {
  return (
    <table>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              <div className="flex gap-1">
                <SimpleTooltip content="Edit">
                  <button onClick={() => handleEdit(item.id)}>
                    <Edit className="h-4 w-4" />
                  </button>
                </SimpleTooltip>

                <SimpleTooltip content="Delete">
                  <button onClick={() => handleDelete(item.id)}>
                    <Trash className="h-4 w-4" />
                  </button>
                </SimpleTooltip>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Accessibility

- Tooltips have `role="tooltip"` for proper semantics
- Content is announced by screen readers
- Keyboard accessible - appears on focus
- Dismissible with Escape key
- Proper ARIA attributes are set automatically

## Styling

The tooltip uses your theme's primary color by default. You can customize it:

```tsx
// Custom colors
<SimpleTooltip
  content="Custom styled"
  contentClassName="bg-blue-600 text-white"
>
  <button>Hover me</button>
</SimpleTooltip>

// Larger tooltip
<SimpleTooltip
  content="Larger text"
  contentClassName="text-sm px-4 py-2"
>
  <button>Hover me</button>
</SimpleTooltip>

// With max width for long content
<SimpleTooltip
  content="This is a very long tooltip..."
  contentClassName="max-w-xs"
>
  <button>Long tooltip</button>
</SimpleTooltip>
```

## Best Practices

1. **Keep content concise** - Tooltips should provide brief, helpful information
2. **Don't put essential information in tooltips** - They may not be accessible on all devices
3. **Use consistent positioning** - Maintain the same `side` prop for similar UI elements
4. **Add tooltips to icon-only buttons** - Always provide text alternatives for icons
5. **Test on mobile** - Ensure content is accessible without hover
6. **Consider delay duration** - Too short can be annoying, too long feels unresponsive
7. **Wrap disabled elements** - Use a span with `tabIndex={0}` to enable tooltips on disabled elements

## Animation

Tooltips include smooth animations by default:

- Fade in/out
- Slight scale animation
- Directional slide based on positioning

## Performance

- Tooltips are rendered in a React Portal for optimal positioning
- Content is lazy-rendered (only when tooltip is triggered)
- Efficient event handling with Radix UI primitives
