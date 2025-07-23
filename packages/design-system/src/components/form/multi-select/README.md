# MultiSelect Component

A flexible multi-select dropdown component with search functionality, badges, and keyboard navigation. Perfect for selecting multiple items from a list.

## Features

- ✅ **Multi-selection**: Select multiple options with visual badges
- ✅ **Search functionality**: Filter options with built-in search
- ✅ **Controlled/Uncontrolled**: Support for both usage patterns
- ✅ **Customizable display**: Configure max badges and overflow handling
- ✅ **Clear functionality**: Clear individual items or all selections
- ✅ **Disabled states**: Disable entire component or individual options
- ✅ **Descriptions**: Rich option descriptions for better UX
- ✅ **Accessibility**: Full WCAG AA compliance with proper ARIA labels
- ✅ **Keyboard navigation**: Complete keyboard support
- ✅ **Close behaviors**: Configure dropdown close behavior

## Usage

### Basic Usage

```tsx
import { MultiSelect } from "@/components/form/multi-select";

const options = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "react", label: "React" },
];

<MultiSelect
  options={options}
  placeholder="Select technologies..."
  onChange={values => console.log(values)}
/>;
```

### With Search and Descriptions

```tsx
const skillsOptions = [
  {
    value: "js",
    label: "JavaScript",
    description: "Frontend and backend development",
  },
  {
    value: "react",
    label: "React",
    description: "Frontend library",
  },
];

<MultiSelect
  options={skillsOptions}
  searchable
  searchPlaceholder="Search skills..."
  placeholder="Select skills..."
  onChange={handleChange}
/>;
```

### Controlled Usage

```tsx
const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

<MultiSelect
  options={options}
  value={selectedSkills}
  onChange={setSelectedSkills}
  placeholder="Select skills..."
/>;
```

### With Custom Display

```tsx
<MultiSelect
  options={options}
  defaultValue={["js", "react", "vue", "angular"]}
  maxSelectedDisplay={2}
  placeholder="Select frameworks..."
  onChange={handleChange}
/>
// Displays: "JavaScript, React" "+2 more"
```

## Props

### MultiSelectOption

| Property       | Type      | Description                            |
| -------------- | --------- | -------------------------------------- |
| `value`        | `string`  | Unique identifier for the option       |
| `label`        | `string`  | Display text for the option            |
| `disabled?`    | `boolean` | Whether the option is disabled         |
| `description?` | `string`  | Optional description shown below label |

### MultiSelectProps

| Property              | Type                         | Default             | Description                                 |
| --------------------- | ---------------------------- | ------------------- | ------------------------------------------- |
| `options`             | `MultiSelectOption[]`        | `[]`                | Array of options to select from             |
| `value?`              | `string[]`                   | -                   | Controlled value (array of selected values) |
| `defaultValue?`       | `string[]`                   | `[]`                | Default value for uncontrolled usage        |
| `onChange?`           | `(values: string[]) => void` | -                   | Callback when selection changes             |
| `placeholder?`        | `string`                     | `"Select items..."` | Placeholder when no items selected          |
| `searchPlaceholder?`  | `string`                     | `"Search items..."` | Search input placeholder                    |
| `maxSelectedDisplay?` | `number`                     | `3`                 | Max badges before showing "+X more"         |
| `disabled?`           | `boolean`                    | `false`             | Whether component is disabled               |
| `className?`          | `string`                     | -                   | Container CSS class                         |
| `triggerClassName?`   | `string`                     | -                   | Trigger button CSS class                    |
| `emptyMessage?`       | `string`                     | `"No items found"`  | Message when no options match               |
| `searchable?`         | `boolean`                    | `true`              | Enable search functionality                 |
| `clearable?`          | `boolean`                    | `true`              | Enable clear all functionality              |
| `closeOnSelect?`      | `boolean`                    | `false`             | Close dropdown after selecting item         |

## Examples

### Skills Selection Form

```tsx
const skillsForm = () => {
  const [formData, setFormData] = useState({
    requiredSkills: [],
    optionalSkills: [],
  });

  return (
    <form>
      <div>
        <label>Required Skills *</label>
        <MultiSelect
          options={skillsOptions}
          value={formData.requiredSkills}
          onChange={values =>
            setFormData(prev => ({ ...prev, requiredSkills: values }))
          }
          placeholder="Select required skills..."
          searchable
        />
      </div>

      <div>
        <label>Optional Skills</label>
        <MultiSelect
          options={skillsOptions}
          value={formData.optionalSkills}
          onChange={values =>
            setFormData(prev => ({ ...prev, optionalSkills: values }))
          }
          placeholder="Select optional skills..."
          maxSelectedDisplay={5}
          closeOnSelect
        />
      </div>
    </form>
  );
};
```

### Category Filter

```tsx
const CategoryFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <MultiSelect
      options={categoryOptions}
      value={selectedCategories}
      onChange={setSelectedCategories}
      placeholder="Filter by categories..."
      maxSelectedDisplay={2}
      clearable
      searchable={false}
    />
  );
};
```

## Best Practices

### Option Design

- Keep labels concise but descriptive
- Use descriptions for additional context
- Group related options logically
- Disable unavailable options rather than hiding them

### Performance

- For large datasets (>100 items), consider virtualization
- Use search functionality to help users find options quickly
- Implement debounced search for remote data

### UX Guidelines

- Set appropriate `maxSelectedDisplay` based on available space
- Use clear, action-oriented placeholders
- Provide helpful empty states
- Consider `closeOnSelect` for single-category selections

### Accessibility

- Always provide descriptive labels
- Use proper form associations with `aria-labelledby`
- Test with screen readers
- Ensure keyboard navigation works smoothly

## Styling

The component uses Tailwind CSS classes and can be customized via:

- `className` - Container styling
- `triggerClassName` - Trigger button styling
- CSS custom properties for theme colors
- Badge component styling for selected items

## Testing

Comprehensive test coverage includes:

- Basic selection functionality
- Search and filtering
- Controlled/uncontrolled modes
- Clear functionality
- Disabled states
- Accessibility features
- Keyboard navigation

Run tests with:

```bash
npm test -- multi-select.test.tsx
```
