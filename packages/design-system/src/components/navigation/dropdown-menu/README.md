# DropdownMenu Component

A comprehensive dropdown menu component that displays a menu to the user — such as a set of actions or functions — triggered by a button. Built with Radix UI primitives and styled with Tailwind CSS following shadcn/ui patterns.

## Features

- **Complete Menu System**: Full dropdown implementation with all menu item types
- **Radix UI Foundation**: Built on accessible Radix UI primitives
- **Flexible Positioning**: Support for all sides and alignment options
- **Interactive Items**: Actions, checkboxes, radio groups, and more
- **Keyboard Navigation**: Full keyboard support with arrow keys and shortcuts
- **Nested Submenus**: Support for nested dropdown menus
- **Customizable**: Flexible styling and content options
- **Accessibility**: WCAG AA compliant with proper ARIA support

## Installation

```bash
npm install @radix-ui/react-dropdown-menu lucide-react
```

## Usage

### Basic Example

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/navigation/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from "lucide-react";

function BasicDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### With Keyboard Shortcuts

```tsx
import { DropdownMenuShortcut } from "@/components/navigation/dropdown-menu";

function ShortcutDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### With Checkboxes

```tsx
import { DropdownMenuCheckboxItem } from "@/components/navigation/dropdown-menu";
import { useState } from "react";

function CheckboxDropdown() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### With Radio Groups

```tsx
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/navigation/dropdown-menu";
import { useState } from "react";

function RadioDropdown() {
  const [position, setPosition] = useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Position</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### With Submenus

```tsx
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/navigation/dropdown-menu";

function SubMenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">More Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Message</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Positioning Options

```tsx
function PositionedDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Positioned Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right" // "top" | "right" | "bottom" | "left"
        align="start" // "start" | "center" | "end"
        sideOffset={5} // Distance from trigger
        alignOffset={10} // Alignment offset
      >
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Component API

### DropdownMenu

The root container for the dropdown menu.

**Props:** All standard Radix UI DropdownMenu.Root props

### DropdownMenuTrigger

The button that triggers the dropdown menu.

**Props:**

- All standard Radix UI DropdownMenu.Trigger props
- `asChild?: boolean` - Merge props with immediate child

### DropdownMenuContent

The container for the menu content.

**Props:**

- All standard Radix UI DropdownMenu.Content props
- `className?: string` - Custom CSS classes
- `sideOffset?: number` - Distance from trigger (default: 4)
- `side?: "top" | "right" | "bottom" | "left"` - Positioning side
- `align?: "start" | "center" | "end"` - Alignment

### DropdownMenuItem

A menu item that can be selected.

**Props:**

- All standard Radix UI DropdownMenu.Item props
- `className?: string` - Custom CSS classes
- `inset?: boolean` - Add left padding for alignment
- `disabled?: boolean` - Disable the item

### DropdownMenuCheckboxItem

A menu item with a checkbox.

**Props:**

- All standard Radix UI DropdownMenu.CheckboxItem props
- `className?: string` - Custom CSS classes
- `checked?: boolean` - Checkbox state
- `onCheckedChange?: (checked: boolean) => void` - State change handler

### DropdownMenuRadioItem

A menu item that's part of a radio group.

**Props:**

- All standard Radix UI DropdownMenu.RadioItem props
- `className?: string` - Custom CSS classes
- `value: string` - Radio item value

### DropdownMenuRadioGroup

Container for radio items.

**Props:**

- All standard Radix UI DropdownMenu.RadioGroup props
- `value?: string` - Selected value
- `onValueChange?: (value: string) => void` - Selection handler

### DropdownMenuLabel

A label for grouping menu items.

**Props:**

- All standard Radix UI DropdownMenu.Label props
- `className?: string` - Custom CSS classes
- `inset?: boolean` - Add left padding for alignment

### DropdownMenuSeparator

A visual separator between menu sections.

**Props:**

- All standard Radix UI DropdownMenu.Separator props
- `className?: string` - Custom CSS classes

### DropdownMenuShortcut

Display keyboard shortcuts.

**Props:**

- All standard HTML span props
- `className?: string` - Custom CSS classes

### DropdownMenuSub

Container for submenu functionality.

**Props:** All standard Radix UI DropdownMenu.Sub props

### DropdownMenuSubTrigger

Trigger for opening a submenu.

**Props:**

- All standard Radix UI DropdownMenu.SubTrigger props
- `className?: string` - Custom CSS classes
- `inset?: boolean` - Add left padding for alignment

### DropdownMenuSubContent

Container for submenu content.

**Props:**

- All standard Radix UI DropdownMenu.SubContent props
- `className?: string` - Custom CSS classes

## Common Patterns

### User Profile Menu

```tsx
function UserProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@username" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Table Row Actions

```tsx
function TableRowActions({ row }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)}>
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Accessibility

The DropdownMenu component is built with accessibility in mind:

- **Keyboard Navigation**: Full support for arrow keys, Enter, and Escape
- **Focus Management**: Proper focus trapping and restoration
- **Screen Readers**: ARIA attributes and semantic structure
- **High Contrast**: Respects system color preferences

### Keyboard Shortcuts

- `Space` or `Enter` - Open/close menu or activate item
- `ArrowDown` / `ArrowUp` - Navigate menu items
- `ArrowRight` - Open submenu
- `ArrowLeft` - Close submenu
- `Escape` - Close menu
- `Tab` - Move to next focusable element

## Best Practices

1. **Use appropriate trigger elements** - Buttons are typically best
2. **Provide clear labels** - Use DropdownMenuLabel to group related items
3. **Include keyboard shortcuts** - For frequently used actions
4. **Handle state properly** - Manage checkbox and radio states correctly
5. **Consider positioning** - Use appropriate side and align props
6. **Implement proper spacing** - Use separators to group related items
7. **Handle loading states** - Disable items during async operations

## Styling

The component uses Tailwind CSS classes and can be customized by:

1. **Passing custom className props**
2. **Modifying the default styles in the component**
3. **Using CSS custom properties for theming**

## Testing

The component includes comprehensive tests covering:

- Basic functionality (open/close, click handling)
- Keyboard navigation and accessibility
- Checkbox and radio item behavior
- Submenu functionality
- Edge cases and error conditions

Run tests with:

```bash
npm test dropdown-menu
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- `@radix-ui/react-dropdown-menu` - Base primitives
- `lucide-react` - Icons
- `class-variance-authority` - Styling utilities
- `tailwind-merge` - Tailwind class merging
