import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { MultiSelect, type MultiSelectOption } from "./multi-select";

const meta: Meta<typeof MultiSelect> = {
  title: "Form/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible multi-select dropdown component with search functionality, badges, and keyboard navigation. Perfect for selecting multiple items from a list.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      description: "Array of options to select from",
      control: { type: "object" },
    },
    value: {
      description: "Controlled value (array of selected option values)",
      control: { type: "object" },
    },
    defaultValue: {
      description: "Default value for uncontrolled usage",
      control: { type: "object" },
    },
    onChange: {
      description: "Callback when selection changes",
      action: "onChange",
    },
    placeholder: {
      description: "Placeholder text when no items are selected",
      control: { type: "text" },
    },
    searchPlaceholder: {
      description: "Placeholder text for search input",
      control: { type: "text" },
    },
    maxSelectedDisplay: {
      description: "Maximum number of selected items to display as badges",
      control: { type: "number" },
    },
    disabled: {
      description: "Whether the component is disabled",
      control: { type: "boolean" },
    },
    searchable: {
      description: "Whether search functionality is enabled",
      control: { type: "boolean" },
    },
    clearable: {
      description: "Whether clear all functionality is enabled",
      control: { type: "boolean" },
    },
    closeOnSelect: {
      description: "Whether dropdown closes after selecting an item",
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const skillsOptions: MultiSelectOption[] = [
  {
    value: "js",
    label: "JavaScript",
    description: "Frontend and backend development",
  },
  { value: "ts", label: "TypeScript", description: "Type-safe JavaScript" },
  { value: "react", label: "React", description: "Frontend library" },
  { value: "vue", label: "Vue.js", description: "Progressive framework" },
  { value: "angular", label: "Angular", description: "Full framework" },
  { value: "node", label: "Node.js", description: "Backend runtime" },
  { value: "python", label: "Python", description: "General purpose language" },
  { value: "java", label: "Java", description: "Enterprise language" },
  { value: "csharp", label: "C#", description: ".NET development" },
  { value: "php", label: "PHP", description: "Web development" },
];

const categoriesOptions: MultiSelectOption[] = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile" },
  { value: "devops", label: "DevOps" },
  { value: "design", label: "Design" },
  { value: "testing", label: "Testing" },
  { value: "database", label: "Database" },
  { value: "ai", label: "AI/ML" },
];

const tagsOptions: MultiSelectOption[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Popular" },
  { value: "legacy", label: "Legacy", disabled: true },
  { value: "experimental", label: "Experimental" },
];

// Basic Examples
export const Default: Story = {
  args: {
    options: skillsOptions.slice(0, 5),
    placeholder: "Select skills...",
    onChange: action("onChange"),
  },
};

export const WithDefaultSelection: Story = {
  args: {
    options: skillsOptions.slice(0, 5),
    defaultValue: ["js", "react"],
    placeholder: "Select skills...",
    onChange: action("onChange"),
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(["js", "ts"]);

    return (
      <div className="w-80">
        <MultiSelect
          options={skillsOptions.slice(0, 5)}
          value={value}
          onChange={newValue => {
            setValue(newValue);
            action("onChange")(newValue);
          }}
          placeholder="Select skills..."
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Selected: {value.join(", ") || "None"}
        </div>
      </div>
    );
  },
};

// Features
export const WithSearch: Story = {
  args: {
    options: skillsOptions,
    searchable: true,
    searchPlaceholder: "Search skills...",
    placeholder: "Select skills...",
    onChange: action("onChange"),
  },
};

export const WithDescriptions: Story = {
  args: {
    options: skillsOptions.slice(0, 6),
    searchable: true,
    placeholder: "Select technologies...",
    onChange: action("onChange"),
  },
};

export const ManySelections: Story = {
  args: {
    options: skillsOptions,
    defaultValue: ["js", "ts", "react", "vue", "node", "python"],
    maxSelectedDisplay: 2,
    placeholder: "Select skills...",
    onChange: action("onChange"),
  },
};

// Variants
export const Disabled: Story = {
  args: {
    options: skillsOptions.slice(0, 5),
    defaultValue: ["js", "react"],
    disabled: true,
    placeholder: "Select skills...",
  },
};

export const NonSearchable: Story = {
  args: {
    options: categoriesOptions,
    searchable: false,
    placeholder: "Select categories...",
    onChange: action("onChange"),
  },
};

export const NonClearable: Story = {
  args: {
    options: categoriesOptions,
    defaultValue: ["frontend", "backend"],
    clearable: false,
    placeholder: "Select categories...",
    onChange: action("onChange"),
  },
};

export const CloseOnSelect: Story = {
  args: {
    options: categoriesOptions,
    closeOnSelect: true,
    placeholder: "Select categories...",
    onChange: action("onChange"),
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: tagsOptions,
    placeholder: "Select tags...",
    onChange: action("onChange"),
  },
};

// Size Variants
export const Compact: Story = {
  args: {
    options: categoriesOptions,
    defaultValue: ["frontend"],
    maxSelectedDisplay: 1,
    placeholder: "Categories...",
    className: "w-40",
    onChange: action("onChange"),
  },
};

export const Wide: Story = {
  args: {
    options: skillsOptions,
    defaultValue: ["js", "ts", "react", "vue"],
    maxSelectedDisplay: 6,
    placeholder: "Select all your skills...",
    className: "w-96",
    onChange: action("onChange"),
  },
};

// Interactive Examples
export const InteractiveDemo: Story = {
  render: () => {
    const [skills, setSkills] = React.useState<string[]>([]);
    const [categories, setCategories] = React.useState<string[]>(["frontend"]);

    return (
      <div className="space-y-6 w-80">
        <div>
          <label className="text-sm font-medium mb-2 block">Skills</label>
          <MultiSelect
            options={skillsOptions}
            value={skills}
            onChange={setSkills}
            placeholder="Select skills..."
            searchable
            clearable
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Categories</label>
          <MultiSelect
            options={categoriesOptions}
            value={categories}
            onChange={setCategories}
            placeholder="Select categories..."
            maxSelectedDisplay={2}
          />
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Selection Summary:</h4>
          <div className="text-sm space-y-1">
            <div>Skills: {skills.length > 0 ? skills.join(", ") : "None"}</div>
            <div>
              Categories:{" "}
              {categories.length > 0 ? categories.join(", ") : "None"}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Form Integration
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      requiredSkills: [] as string[],
      optionalSkills: [] as string[],
      categories: [] as string[],
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      action("Form submitted")(formData);
      alert(`Form submitted with:\n${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <div>
          <label className="text-sm font-medium mb-2 block text-foreground">
            Required Skills *
          </label>
          <MultiSelect
            options={skillsOptions.slice(0, 6)}
            value={formData.requiredSkills}
            onChange={value =>
              setFormData(prev => ({ ...prev, requiredSkills: value }))
            }
            placeholder="Select required skills..."
            searchable
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block text-foreground">
            Optional Skills
          </label>
          <MultiSelect
            options={skillsOptions.slice(3, 10)}
            value={formData.optionalSkills}
            onChange={value =>
              setFormData(prev => ({ ...prev, optionalSkills: value }))
            }
            placeholder="Select optional skills..."
            searchable
            maxSelectedDisplay={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block text-foreground">
            Categories
          </label>
          <MultiSelect
            options={categoriesOptions}
            value={formData.categories}
            onChange={value =>
              setFormData(prev => ({ ...prev, categories: value }))
            }
            placeholder="Select categories..."
            closeOnSelect
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
        >
          Submit Form
        </button>
      </form>
    );
  },
};

// Error States
export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: "No options available...",
    emptyMessage: "No items to select",
    onChange: action("onChange"),
  },
};
