# Modal Component

A modal dialog component built on Radix UI Dialog primitives. Displays content in a layer above the page with backdrop overlay.

## Features

- ✅ **Accessibility First** - WCAG AA compliant with proper ARIA attributes
- ✅ **Keyboard Navigation** - Tab navigation and Escape to close
- ✅ **Focus Management** - Focus trap within modal
- ✅ **Size Variants** - Six size options from sm to full
- ✅ **Backdrop Control** - Click outside to close
- ✅ **Customizable** - Full control over content and styling
- ✅ **TypeScript** - Complete type safety
- ✅ **Animation** - Smooth enter/exit transitions

## Installation

```bash
npm install @radix-ui/react-dialog
```

## Usage

### Basic Modal

```tsx
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  ModalClose,
} from "@skills-eval/design-system";

function BasicModal() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>This is a basic modal example.</ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p>Modal content goes here.</p>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button>Confirm</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

### Controlled Modal

```tsx
function ControlledModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Controlled Modal</ModalTitle>
          <ModalDescription>This modal's state is controlled.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

### Size Variants

```tsx
// Small modal
<ModalContent size="sm">

// Medium modal (default)
<ModalContent size="md">

// Large modal
<ModalContent size="lg">

// Extra large modal
<ModalContent size="xl">

// 2X large modal
<ModalContent size="2xl">

// Full size modal
<ModalContent size="full">
```

### Form Modal

```tsx
function FormModal() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Create Account</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Create Account</ModalTitle>
          <ModalDescription>Fill out the form below.</ModalDescription>
        </ModalHeader>
        <form>
          <div className="grid gap-4 py-4">
            <input placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="outline">Cancel</Button>
            </ModalClose>
            <Button type="submit">Create Account</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
```

## API Reference

### Modal

Root component that provides context for the modal.

| Prop           | Type                      | Default | Description                    |
| -------------- | ------------------------- | ------- | ------------------------------ |
| `open`         | `boolean`                 | -       | Controlled open state          |
| `onOpenChange` | `(open: boolean) => void` | -       | Called when open state changes |
| `children`     | `ReactNode`               | -       | Modal trigger and content      |

### ModalTrigger

Button that opens the modal.

| Prop       | Type        | Default | Description             |
| ---------- | ----------- | ------- | ----------------------- |
| `asChild`  | `boolean`   | `false` | Render as child element |
| `children` | `ReactNode` | -       | Trigger content         |

### ModalContent

Main modal content container.

| Prop        | Type                                              | Default | Description            |
| ----------- | ------------------------------------------------- | ------- | ---------------------- |
| `size`      | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"` | `"md"`  | Modal size             |
| `className` | `string`                                          | -       | Additional CSS classes |
| `children`  | `ReactNode`                                       | -       | Modal content          |

### ModalHeader

Container for modal title and description.

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `className` | `string`    | -       | Additional CSS classes |
| `children`  | `ReactNode` | -       | Header content         |

### ModalTitle

Modal title with proper heading semantics.

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `className` | `string`    | -       | Additional CSS classes |
| `children`  | `ReactNode` | -       | Title text             |

### ModalDescription

Modal description for accessibility.

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `className` | `string`    | -       | Additional CSS classes |
| `children`  | `ReactNode` | -       | Description text       |

### ModalFooter

Container for modal action buttons.

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `className` | `string`    | -       | Additional CSS classes |
| `children`  | `ReactNode` | -       | Footer content         |

### ModalClose

Button that closes the modal.

| Prop       | Type        | Default | Description             |
| ---------- | ----------- | ------- | ----------------------- |
| `asChild`  | `boolean`   | `false` | Render as child element |
| `children` | `ReactNode` | -       | Close button content    |

## Size Options

| Size   | Max Width            | Use Case                     |
| ------ | -------------------- | ---------------------------- |
| `sm`   | `max-w-sm` (384px)   | Simple confirmations         |
| `md`   | `max-w-lg` (512px)   | Default size for most modals |
| `lg`   | `max-w-2xl` (672px)  | Forms and detailed content   |
| `xl`   | `max-w-4xl` (896px)  | Complex forms and data       |
| `2xl`  | `max-w-6xl` (1152px) | Large data tables            |
| `full` | `95vw x 95vh`        | Maximum screen usage         |

## Accessibility

The Modal component follows WAI-ARIA Dialog pattern:

- **Focus Management**: Focus is trapped within the modal
- **Keyboard Navigation**: Tab to navigate, Escape to close
- **ARIA Attributes**: Proper labeling for screen readers
- **Backdrop Interaction**: Click outside to close
- **Screen Reader**: Announces modal state changes

## Best Practices

1. **Always include ModalDescription** for accessibility
2. **Use appropriate size** for content
3. **Provide clear actions** in footer
4. **Handle loading states** for async actions
5. **Test keyboard navigation** thoroughly
6. **Keep content focused** and concise

## Examples

See the Storybook stories for comprehensive examples:

- Basic modal usage
- Size variants
- Form integration
- Confirmation dialogs
- Controlled state
- Nested modals
- Accessibility features

## Related Components

- [Button](../../../ui/button/README.md) - For triggers and actions
- [Toast](../toast/README.md) - For success/error feedback
- [Loading Spinner](../loading-spinner/README.md) - For loading states
