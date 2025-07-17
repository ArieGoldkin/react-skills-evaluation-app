# React 19 Skills Evaluation App

A React 19-based application that evaluates user skills through multiple data sources including personal information, Git repository analysis, and Google account integration. The app provides personalized skill assessments and AI-powered recommendations using a custom design system built on shadcn/ui.

## Features

- **Multi-Source Skill Assessment**: Analyzes skills from personal information, Git repositories, and Google account data
- **AI-Powered Recommendations**: Provides personalized skill improvement suggestions
- **Modern React 19**: Built with the latest React features and best practices
- **Custom Design System**: Based on shadcn/ui for consistent, accessible UI components
- **TypeScript**: Full type safety throughout the application
- **TanStack Query**: Efficient server state management with caching and background updates

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: TanStack Query, React Context API
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier, Husky

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd skills-evaluation-app
```

2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env
```

4. Fill in your environment variables in `.env`

5. Start the development server:

```bash
npm run dev
```

## Environment Variables

See `.env.example` for required environment variables.

## Development

### Code Quality Standards

- Components must not exceed 180 lines of code
- Functions should have low cyclomatic complexity (max 11)
- Files should be focused and small (max 150-180 lines)
- Use TypeScript for all new code
- Follow React best practices and hooks patterns

### Testing

```bash
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
npm run coverage    # Generate coverage report
```

### Building

```bash
npm run build       # Build for production
npm run preview     # Preview production build
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the project standards
4. Run tests and ensure they pass
5. Commit your changes using conventional commit messages
6. Push to your fork and submit a pull request

## License

This project is licensed under the MIT License.
