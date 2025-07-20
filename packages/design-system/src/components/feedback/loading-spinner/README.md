# Loading Spinner

A loading spinner component for indicating loading states. Built with accessibility in mind and supports various sizes, speeds, and text display options. Uses Lucide React's Loader2 icon with CSS animations for optimal performance.

## Usage

```tsx
import { LoadingSpinner } from "@skills-eval/design-system";

export function Example() {
  return <LoadingSpinner text="Loading..." />;
}
```

## Props

| Prop         | Type                                         | Default      | Description                                          |
| ------------ | -------------------------------------------- | ------------ | ---------------------------------------------------- |
| size         | 'sm' \| 'default' \| 'lg'                    | 'default'    | Size of the spinner                                  |
| speed        | 'slow' \| 'default' \| 'fast'                | 'default'    | Animation speed (2s \| 1s \| 0.5s)                  |
| direction    | 'horizontal' \| 'vertical'                   | 'horizontal' | Layout direction when text is present                |
| show         | boolean                                      | true         | Controls visibility of the spinner                   |
| text         | string                                       | undefined    | Optional loading text to display                     |
| children     | React.ReactNode                              | undefined    | Alternative to text prop                             |
| aria-label   | string                                       | 'Loading'    | Accessible label for screen readers                  |
| className    | string                                       | undefined    | Additional CSS classes                               |

## Examples

### Basic Usage

```tsx
// Simple spinner
<LoadingSpinner />

// With loading text
<LoadingSpinner text="Loading data..." />

// Using children instead of text
<LoadingSpinner>Processing request...</LoadingSpinner>
```

### Size Variants

```tsx
// Small spinner for inline use
<LoadingSpinner size="sm" text="Loading" />

// Default size
<LoadingSpinner text="Loading data" />

// Large spinner for prominent loading states
<LoadingSpinner size="lg" text="Loading dashboard" />
```

### Speed Variants

```tsx
// Slow animation for long operations
<LoadingSpinner speed="slow" text="Processing large file..." />

// Default speed
<LoadingSpinner text="Loading..." />

// Fast animation for quick operations
<LoadingSpinner speed="fast" text="Saving changes..." />
```

### Direction Layouts

```tsx
// Horizontal layout (default)
<LoadingSpinner text="Loading horizontally" direction="horizontal" />

// Vertical layout for centered displays
<LoadingSpinner text="Loading vertically" direction="vertical" />
```

### Conditional Rendering

```tsx
function DataComponent() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <LoadingSpinner show={isLoading} text="Loading data..." />
      {!isLoading && <div>Data loaded successfully!</div>}
    </div>
  );
}
```

### Loading Button

```tsx
function SubmitButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <Button onClick={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? (
        <LoadingSpinner size="sm" text="Submitting..." />
      ) : (
        "Submit Form"
      )}
    </Button>
  );
}
```

### Inline Spinner

```tsx
// Inline with text
<p>
  Your request is being processed <LoadingSpinner size="sm" />
</p>

// With gap spacing
<div className="flex items-center gap-2">
  <LoadingSpinner size="sm" />
  <span>Syncing data...</span>
</div>
```

### Card Loading State

```tsx
function DashboardCard() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="min-h-32 flex items-center justify-center">
        {isLoading ? (
          <LoadingSpinner 
            text="Loading analytics data..." 
            direction="vertical" 
          />
        ) : (
          <div>Chart data here</div>
        )}
      </CardContent>
    </Card>
  );
}
```

### Form Loading States

```tsx
function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" disabled={isSubmitting} />
      <textarea placeholder="Message" disabled={isSubmitting} />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <LoadingSpinner size="sm" text="Sending message..." />
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
```

### Status Indicators

```tsx
function FileUploadStatus() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 border rounded">
        <span>Uploading photos.zip</span>
        <LoadingSpinner size="sm" speed="default" />
      </div>
      <div className="flex items-center justify-between p-3 border rounded">
        <span>Processing images</span>
        <LoadingSpinner size="sm" speed="slow" />
      </div>
      <div className="flex items-center justify-between p-3 border rounded">
        <span>Generating thumbnails</span>
        <LoadingSpinner size="sm" speed="fast" />
      </div>
    </div>
  );
}
```

### Custom Styling

```tsx
// Custom colors
<LoadingSpinner className="text-blue-500" text="Custom blue spinner" />

// On dark backgrounds
<div className="bg-gray-900 p-4 rounded">
  <LoadingSpinner className="text-white" text="Loading on dark" />
</div>

// Branded experience
<LoadingSpinner 
  size="lg"
  className="text-brand-primary"
  text="Loading your personalized experience"
  direction="vertical"
/>
```

## Accessibility

### Screen Reader Support

The LoadingSpinner component is built with accessibility in mind:

- **ARIA Attributes**: Uses `role="status"` and `aria-live="polite"` for screen reader announcements
- **Descriptive Labels**: Supports custom `aria-label` for context-specific descriptions
- **Hidden Decorative Elements**: The spinner icon is marked `aria-hidden="true"`

```tsx
// Basic accessibility
<LoadingSpinner aria-label="Loading user profile" />

// Context-specific labels
<LoadingSpinner 
  aria-label="Processing payment, this may take a moment"
  text="Processing payment..."
/>

// Long operations
<LoadingSpinner 
  aria-label="Uploading large file, this may take several minutes"
  text="Uploading..."
  speed="slow"
/>
```

### Keyboard Navigation

- The spinner itself is not focusable (uses `tabIndex="-1"` implicitly)
- When used in buttons, the button remains focusable and properly announced
- Loading states disable interactive elements appropriately

### Reduced Motion Support

The component respects the `prefers-reduced-motion` CSS media query when used with Tailwind CSS animations.

## Performance

### Optimized Animations

- Uses CSS-based animations rather than JavaScript
- Leverages Tailwind's `animate-spin` utility for optimal performance
- Custom animation durations with CSS custom properties

### Bundle Impact

- Minimal bundle size impact (uses existing Lucide React dependency)
- No additional dependencies beyond what's already in the design system
- Efficient CSS class generation with CVA

## Design Tokens

The LoadingSpinner uses design system tokens for consistent styling:

- **Colors**: Inherits from `text-current` by default, respects color system
- **Spacing**: Uses consistent gap spacing (gap-2) for text layouts
- **Typography**: Loading text uses `text-sm` and `text-muted-foreground`

## Best Practices

### When to Use

1. **API Calls**: Show spinner during data fetching operations
2. **Form Submissions**: Indicate processing state in forms
3. **File Operations**: Display progress for uploads/downloads
4. **Page Transitions**: Loading states between route changes
5. **Content Updates**: When refreshing or updating existing content

### Size Selection

- **Small (`sm`)**: Inline usage, button loading states, status indicators
- **Default**: General loading states, card content, modal loading
- **Large (`lg`)**: Full-page loading, splash screens, primary loading states

### Speed Selection

- **Slow (`2s`)**: Long operations (file uploads, data processing)
- **Default (`1s`)**: Standard loading operations (API calls, form submissions)
- **Fast (`0.5s`)**: Quick operations (auto-save, live updates)

### Text Guidelines

1. **Be Specific**: Use descriptive text that explains what's loading
2. **Keep it Short**: Aim for 2-4 words maximum
3. **Use Present Tense**: "Loading...", "Saving...", "Processing..."
4. **Provide Context**: "Loading dashboard data" vs "Loading..."

```tsx
// Good examples
<LoadingSpinner text="Loading profile..." />
<LoadingSpinner text="Saving changes..." />
<LoadingSpinner text="Processing payment..." />

// Avoid generic text when possible
<LoadingSpinner text="Loading..." /> // Too generic
<LoadingSpinner text="Please wait while we load your data..." /> // Too verbose
```

### Accessibility Guidelines

1. **Provide Context**: Use descriptive `aria-label` attributes
2. **Announce Changes**: Ensure loading states are announced to screen readers
3. **Manage Focus**: Don't trap focus on loading spinners
4. **Timeout Handling**: Provide alternative actions for long operations

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **CSS Animations**: Supported in all target browsers
- **SVG Icons**: Full support with Lucide React
- **Accessibility**: Screen reader compatible
- **Reduced Motion**: Respects user preferences

## Migration from Other Solutions

### From Custom CSS Spinners

```tsx
// Before (custom CSS)
<div className="spinner">
  <div className="spinner-inner"></div>
</div>

// After (LoadingSpinner)
<LoadingSpinner />
```

### From Loading Libraries

```tsx
// Before (react-spinners)
import { ClipLoader } from "react-spinners";
<ClipLoader loading={true} size={20} />

// After (LoadingSpinner)
<LoadingSpinner show={true} size="sm" />
```

### From Inline Icons

```tsx
// Before (manual Lucide setup)
import { Loader2 } from "lucide-react";
<Loader2 className="animate-spin" />

// After (LoadingSpinner)
<LoadingSpinner />
```

## Troubleshooting

### Common Issues

1. **Spinner Not Visible**: Check the `show` prop is not set to `false`
2. **Animation Not Working**: Ensure Tailwind CSS animations are available
3. **Text Not Showing**: Verify `text` prop or children are provided
4. **Accessibility Warnings**: Add descriptive `aria-label` attributes

### Performance Issues

1. **Multiple Spinners**: Avoid rendering many simultaneous spinners
2. **Complex Animations**: Use standard speeds unless necessary
3. **Memory Leaks**: Clean up timers when components unmount

## Component Variants Export

```tsx
// Access to variant functions for custom implementations
import { 
  LoadingSpinner,
  loadingSpinnerVariants,
  loadingContainerVariants 
} from "@skills-eval/design-system";

// Use variants directly
const spinnerClasses = loadingSpinnerVariants({ size: "lg", speed: "fast" });
```