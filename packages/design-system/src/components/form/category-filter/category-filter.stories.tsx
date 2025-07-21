import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { CategoryFilter } from "./category-filter";

const meta: Meta<typeof CategoryFilter> = {
  title: "Form/CategoryFilter",
  component: CategoryFilter,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A comprehensive filter component for selecting skill categories with search, bulk actions, and customization options.

## Features
- Multi-select category filtering
- Real-time search functionality
- Bulk select/deselect actions
- Category icons and skill counts
- Loading and empty states
- Responsive design
- Accessibility compliant
- Customizable appearance
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "outline"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Component size",
    },
    showSearch: {
      control: "boolean",
      description: "Show search input",
    },
    showCounts: {
      control: "boolean",
      description: "Show skill counts",
    },
    showBulkActions: {
      control: "boolean",
      description: "Show select all/clear all buttons",
    },
    showIcons: {
      control: "boolean",
      description: "Show category icons",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryFilter>;

// Sample categories data
const sampleCategories = [
  {
    id: "1",
    name: "Programming Languages",
    slug: "programming-languages",
    icon: "💻",
    color: "#3B82F6",
    skillCount: 8,
  },
  {
    id: "2", 
    name: "Frontend Development",
    slug: "frontend-development",
    icon: "🎨",
    color: "#8B5CF6",
    skillCount: 12,
  },
  {
    id: "3",
    name: "Backend Development", 
    slug: "backend-development",
    icon: "⚙️",
    color: "#10B981",
    skillCount: 6,
  },
  {
    id: "4",
    name: "Databases",
    slug: "databases",
    icon: "🗄️",
    color: "#F59E0B",
    skillCount: 4,
  },
  {
    id: "5",
    name: "DevOps & Cloud",
    slug: "devops-cloud",
    icon: "☁️",
    color: "#06B6D4",
    skillCount: 7,
  },
  {
    id: "6",
    name: "Mobile Development",
    slug: "mobile-development", 
    icon: "📱",
    color: "#EC4899",
    skillCount: 3,
  },
  {
    id: "7",
    name: "Data Science & AI",
    slug: "data-science-ai",
    icon: "🤖",
    color: "#84CC16",
    skillCount: 5,
  },
  {
    id: "8",
    name: "Security",
    slug: "security",
    icon: "🔒",
    color: "#EF4444",
    skillCount: 2,
  },
];

// Interactive wrapper for stories
const InteractiveWrapper: React.FC<{
  initialSelected?: string[];
  children: (props: { selectedCategories: string[]; onSelectionChange: (ids: string[]) => void }) => React.ReactNode;
}> = ({ initialSelected = [], children }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSelected);
  
  const handleSelectionChange = (ids: string[]) => {
    setSelectedCategories(ids);
    action("onSelectionChange")(ids);
  };

  return <>{children({ selectedCategories, onSelectionChange: handleSelectionChange })}</>;
};

export const Default: Story = {
  render: () => (
    <InteractiveWrapper>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
        />
      )}
    </InteractiveWrapper>
  ),
};

export const Compact: Story = {
  render: () => (
    <InteractiveWrapper>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
          variant="compact"
          size="sm"
        />
      )}
    </InteractiveWrapper>
  ),
};

export const WithoutSearch: Story = {
  render: () => (
    <InteractiveWrapper>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
          showSearch={false}
        />
      )}
    </InteractiveWrapper>
  ),
};

export const WithoutCounts: Story = {
  render: () => (
    <InteractiveWrapper>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
          showCounts={false}
        />
      )}
    </InteractiveWrapper>
  ),
};

export const WithoutBulkActions: Story = {
  render: () => (
    <InteractiveWrapper>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
          showBulkActions={false}
        />
      )}
    </InteractiveWrapper>
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <InteractiveWrapper>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
          showIcons={false}
        />
      )}
    </InteractiveWrapper>
  ),
};

export const PreSelected: Story = {
  render: () => (
    <InteractiveWrapper initialSelected={["1", "2", "5"]}>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
        />
      )}
    </InteractiveWrapper>
  ),
};

export const Loading: Story = {
  args: {
    categories: sampleCategories,
    selectedCategories: [],
    onSelectionChange: action("onSelectionChange"),
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    categories: sampleCategories,
    selectedCategories: ["1", "3"],
    onSelectionChange: action("onSelectionChange"),
    disabled: true,
  },
};

export const EmptyState: Story = {
  args: {
    categories: [],
    selectedCategories: [],
    onSelectionChange: action("onSelectionChange"),
    emptyMessage: "No categories available",
  },
};

export const LargeList: Story = {
  render: () => {
    const manyCategories = Array.from({ length: 25 }, (_, i) => ({
      id: `cat-${i + 1}`,
      name: `Category ${i + 1}`,
      slug: `category-${i + 1}`,
      icon: ["💻", "🎨", "⚙️", "🗄️", "☁️", "📱", "🤖", "🔒"][i % 8],
      color: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#06B6D4", "#EC4899", "#84CC16", "#EF4444"][i % 8],
      skillCount: Math.floor(Math.random() * 15) + 1,
    }));

    return (
      <InteractiveWrapper>
        {({ selectedCategories, onSelectionChange }) => (
          <CategoryFilter
            categories={manyCategories}
            selectedCategories={selectedCategories}
            onSelectionChange={onSelectionChange}
            maxHeight={250}
          />
        )}
      </InteractiveWrapper>
    );
  },
};

export const OutlineVariant: Story = {
  render: () => (
    <InteractiveWrapper>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
          variant="outline"
        />
      )}
    </InteractiveWrapper>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <InteractiveWrapper>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories.slice(0, 4)}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
          size="lg"
        />
      )}
    </InteractiveWrapper>
  ),
};

export const CustomPlaceholder: Story = {
  render: () => (
    <InteractiveWrapper>
      {({ selectedCategories, onSelectionChange }) => (
        <CategoryFilter
          categories={sampleCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={onSelectionChange}
          searchPlaceholder="Find your skill category..."
        />
      )}
    </InteractiveWrapper>
  ),
};

export const SidebarLayout: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="w-72">
        <InteractiveWrapper initialSelected={["2", "5"]}>
          {({ selectedCategories, onSelectionChange }) => (
            <CategoryFilter
              categories={sampleCategories}
              selectedCategories={selectedCategories}
              onSelectionChange={onSelectionChange}
              variant="compact"
            />
          )}
        </InteractiveWrapper>
      </div>
      <div className="flex-1 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Skills Content Area</h3>
        <p className="text-gray-600">
          This would show the filtered skills based on the selected categories.
          Use the filter on the left to see how it would work in a real application.
        </p>
      </div>
    </div>
  ),
};