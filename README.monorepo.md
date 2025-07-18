# Skills Evaluation Monorepo

A modern monorepo structure for the Skills Evaluation App, organized with separate packages for the main application and design system.

## 🏗️ Monorepo Structure

```
skills-evaluation-monorepo/
├── packages/
│   ├── app/                    # Main Next.js application
│   │   ├── src/               # App source code
│   │   ├── package.json       # App dependencies
│   │   ├── next.config.ts     # Next.js configuration
│   │   ├── tailwind.config.ts # Tailwind configuration
│   │   └── tsconfig.json      # TypeScript configuration
│   │
│   └── design-system/         # Shared design system
│       ├── src/              # Design system source
│       ├── .storybook/       # Storybook configuration
│       ├── package.json      # Design system dependencies
│       └── dist/             # Built design system
│
├── tsconfig.base.json         # Shared TypeScript configuration
├── eslint.config.root.mjs     # Shared ESLint configuration
├── .prettierrc.root          # Shared Prettier configuration
└── package.json              # Root workspace configuration
```

## 📦 Packages

### @skills-eval/app

The main Next.js application with React 19, featuring:

- Next.js 15 with App Router
- React 19 with latest features
- TypeScript with strict configuration
- Tailwind CSS for styling
- TanStack Query for server state
- Comprehensive testing setup

### @skills-eval/design-system

A comprehensive design system built on shadcn/ui:

- Reusable UI components
- Storybook documentation
- TypeScript definitions
- Tree-shakeable exports
- Theme system with CSS custom properties

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
# Start the main app
npm run app:dev

# Start Storybook for design system
npm run design-system:storybook
```

### Building

```bash
# Build all packages
npm run build:all

# Build specific packages
npm run app:build
npm run design-system:build
```

## 🛠️ Available Scripts

### Root Level Scripts

- `npm run dev` - Start app development server
- `npm run build` - Build the main app
- `npm run build:all` - Build all packages
- `npm run test` - Run tests in all packages
- `npm run lint` - Lint all packages
- `npm run format` - Format all code
- `npm run type-check` - Type check all packages

### App-Specific Scripts

- `npm run app:dev` - Start app development
- `npm run app:build` - Build app for production
- `npm run app:start` - Start production app
- `npm run app:test` - Run app tests

### Design System Scripts

- `npm run design-system:build` - Build design system
- `npm run design-system:storybook` - Start Storybook
- `npm run design-system:build-storybook` - Build Storybook
- `npm run design-system:test` - Run design system tests

## 🎯 Benefits of This Structure

### Separation of Concerns

- **App Package**: Contains application-specific code, pages, and business logic
- **Design System**: Contains reusable UI components and design tokens
- **Root**: Contains shared configuration and tooling

### Independent Dependencies

- Each package manages its own dependencies
- Reduces bundle size by avoiding unnecessary dependencies
- Easier to maintain and update packages independently

### Shared Configuration

- Common ESLint, Prettier, and TypeScript configurations
- Consistent code style across all packages
- Centralized tooling and scripts

### Scalability

- Easy to add new packages (e.g., backend, mobile app, documentation)
- Clear boundaries between different parts of the system
- Better team collaboration with package ownership

## 🔧 Configuration Files

### Root Configuration

- `tsconfig.base.json` - Base TypeScript configuration
- `eslint.config.root.mjs` - Shared ESLint rules
- `.prettierrc.root` - Code formatting rules
- `package.json` - Workspace configuration and scripts

### Package-Specific Configuration

Each package has its own:

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration (extends base)
- Build configuration (Next.js, Rollup, etc.)

## 🚀 Deployment

### App Deployment

The app package can be deployed independently:

```bash
cd packages/app
npm run build
npm run start
```

### Design System Publishing

The design system can be published as an npm package:

```bash
cd packages/design-system
npm run build
npm publish
```

## 🧪 Testing Strategy

### Unit Tests

- Each package has its own test suite
- Shared testing utilities in root
- Jest configuration per package

### Integration Tests

- Cross-package integration tests
- End-to-end testing for the main app
- Storybook interaction tests

## 📚 Documentation

### Design System

- Storybook provides interactive component documentation
- Component API documentation with TypeScript
- Usage examples and best practices

### App Documentation

- README files for each major feature
- API documentation
- Deployment guides

## 🔄 Development Workflow

1. **Feature Development**: Work in the app package
2. **Component Creation**: Add to design system first
3. **Testing**: Test components in Storybook, then in app
4. **Integration**: Use design system components in app
5. **Documentation**: Update Storybook and README files

## 🎨 Design System Usage

```tsx
// Import from design system
import { Button, Container, Grid } from "@skills-eval/design-system";

function MyComponent() {
  return (
    <Container size="lg">
      <Grid cols={2} gap="md">
        <Button variant="primary">Action</Button>
        <Button variant="outline">Cancel</Button>
      </Grid>
    </Container>
  );
}
```

## 🤝 Contributing

1. Follow the established package structure
2. Add new components to the design system first
3. Write tests for all new functionality
4. Update documentation (Storybook, README)
5. Ensure all packages build successfully

## 📈 Future Enhancements

- Add backend package for API
- Add mobile app package (React Native)
- Add documentation package (Docusaurus)
- Add shared utilities package
- Add testing utilities package

This monorepo structure provides a solid foundation for scaling the Skills Evaluation App while maintaining clean separation of concerns and shared tooling.
