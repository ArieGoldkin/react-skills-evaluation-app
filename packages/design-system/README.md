# @skills-eval/design-system

A comprehensive design system for the Skills Evaluation App, built on top of shadcn/ui and Radix UI primitives.

## Features

- 🎨 **Consistent Design Language**: Unified components with consistent styling
- 🧩 **Modular Architecture**: Tree-shakeable components with barrel exports
- 📚 **Storybook Documentation**: Interactive component documentation
- 🎯 **TypeScript First**: Full TypeScript support with proper type definitions
- 🎨 **Tailwind CSS**: Utility-first CSS framework integration
- ♿ **Accessibility**: WCAG 2.1 AA compliant components
- 🌙 **Dark Mode**: Built-in dark mode support

## Installation

```bash
npm install @skills-eval/design-system
```

## Usage

```tsx
import { Button, Container, Grid } from "@skills-eval/design-system";

function App() {
  return (
    <Container size="lg">
      <Grid cols={2} gap="md">
        <Button variant="default">Primary Action</Button>
        <Button variant="outline">Secondary Action</Button>
      </Grid>
    </Container>
  );
}
```

## Component Categories

### UI Components

- **Button**: Primary interactive element with multiple variants
- More components coming soon...

### Layout Components

- **Container**: Responsive content wrapper
- **Grid**: Flexible grid system
- **AppLayout**: Main application shell

### Form Components

- Coming soon...

### Data Display Components

- Coming soon...

### Feedback Components

- Coming soon...

### Navigation Components

- Coming soon...

## Development

### Building the Package

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Storybook

```bash
npm run storybook
```

### Testing

```bash
npm run test
```

## Design Tokens

The design system uses CSS custom properties for theming:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more tokens */
}
```

## Contributing

1. Add new components to the appropriate category folder
2. Include TypeScript interfaces and proper prop types
3. Add Storybook stories for documentation
4. Write unit tests for component behavior
5. Update barrel exports in index files

## Architecture

```
src/
├── components/
│   ├── ui/           # Base UI components (shadcn/ui)
│   ├── layout/       # Layout and structure components
│   ├── forms/        # Form and input components
│   ├── data-display/ # Data visualization components
│   ├── feedback/     # Loading, error, success states
│   └── navigation/   # Navigation and routing components
├── lib/              # Utilities and helpers
├── hooks/            # Reusable React hooks
├── types/            # TypeScript type definitions
└── styles/           # Global styles and CSS
```

## Versioning

This package follows semantic versioning. Breaking changes will result in major version bumps.

## License

Private package for Skills Evaluation App.
