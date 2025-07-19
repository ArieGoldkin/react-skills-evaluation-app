import * as React from "react";
import { Container } from "../../layout/container";
import { Grid } from "../../layout/grid";
import { Button } from "../../ui/button";
import { ColorShowcase } from "../../ui/color-showcase";

// Extracted components for better organization
const ShowcaseHeader: React.FC = () => (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-foreground mb-4">
      Component Showcase
    </h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      Explore our comprehensive design system components built with React 19,
      TypeScript, and Tailwind CSS.
    </p>
  </div>
);

const ButtonShowcase: React.FC = () => (
  <section>
    <h3 className="text-2xl font-semibold text-foreground mb-6">
      Button Components
    </h3>
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-foreground mb-3">
          Button Variants
        </h4>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-foreground mb-3">
          Button Sizes
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🎨</Button>
        </div>
      </div>
    </div>
  </section>
);

const LayoutShowcase: React.FC = () => (
  <section>
    <h3 className="text-2xl font-semibold text-foreground mb-6">
      Layout Components
    </h3>
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-foreground mb-3">
          Grid System
        </h4>
        <Grid cols={3} gap="md" className="mb-4">
          <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <h5 className="font-semibold text-primary-900">Grid Item 1</h5>
            <p className="text-primary-700 text-sm">
              Responsive grid system with flexible columns.
            </p>
          </div>
          <div className="p-4 bg-secondary-100 border border-secondary-300 rounded-lg">
            <h5 className="font-semibold text-secondary-900">Grid Item 2</h5>
            <p className="text-secondary-700 text-sm">
              Consistent spacing and alignment.
            </p>
          </div>
          <div className="p-4 bg-accent-50 border border-accent-500 rounded-lg">
            <h5 className="font-semibold text-accent-900">Grid Item 3</h5>
            <p className="text-accent-800 text-sm">
              Professional color palette integration.
            </p>
          </div>
        </Grid>
      </div>

      <div>
        <h4 className="text-lg font-medium text-foreground mb-3">
          Container Sizes
        </h4>
        <div className="space-y-3">
          <Container size="sm" className="bg-card border rounded-lg p-4">
            <p className="text-card-foreground text-sm">
              Small container (max-w-2xl)
            </p>
          </Container>
          <Container size="md" className="bg-card border rounded-lg p-4">
            <p className="text-card-foreground text-sm">
              Medium container (max-w-4xl)
            </p>
          </Container>
          <Container size="lg" className="bg-card border rounded-lg p-4">
            <p className="text-card-foreground text-sm">
              Large container (max-w-6xl) - Default
            </p>
          </Container>
        </div>
      </div>
    </div>
  </section>
);

const StatusShowcase: React.FC = () => (
  <section>
    <h3 className="text-2xl font-semibold text-foreground mb-6">
      Development Status
    </h3>
    <Grid cols={2} gap="lg" responsive>
      <div className="p-6 bg-accent-50 border border-accent-200 rounded-lg">
        <h4 className="font-semibold text-accent-900 mb-3">
          ✅ Completed Components
        </h4>
        <ul className="space-y-2 text-accent-800 text-sm">
          <li>• Button - All variants and sizes</li>
          <li>• Container - Responsive wrapper</li>
          <li>• Grid - Flexible layout system</li>
          <li>• AppLayout - Application shell</li>
          <li>• ColorShowcase - Palette demonstration</li>
        </ul>
      </div>
      <div className="p-6 bg-primary-50 border border-primary-200 rounded-lg">
        <h4 className="font-semibold text-primary-900 mb-3">
          🚧 In Development
        </h4>
        <ul className="space-y-2 text-primary-800 text-sm">
          <li>• Input - Form input component</li>
          <li>• Text - Typography component</li>
          <li>• Card - Content container</li>
          <li>• Loading - Spinner component</li>
          <li>• Avatar - User profile display</li>
        </ul>
      </div>
    </Grid>
  </section>
);

export const ComponentShowcase: React.FC = () => {
  return (
    <Container size="xl" className="py-8">
      <div className="space-y-12">
        <ShowcaseHeader />
        <ButtonShowcase />
        <LayoutShowcase />
        <section>
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Professional Blue Color System
          </h3>
          <ColorShowcase />
        </section>
        <StatusShowcase />
      </div>
    </Container>
  );
};
