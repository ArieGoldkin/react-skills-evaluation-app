# SkillCard Component

A comprehensive card component for displaying individual skills with proficiency tracking, categorization, and interactive features.

## Features

- **Visual Proficiency Indicator**: 0-10 scale with color-coded progress bar and descriptive labels
- **Category Support**: Display skills with category badges and custom colors
- **Verification Status**: Visual indicator for verified skills
- **Interactive Actions**: Edit and delete functionality with proper event handling
- **Multiple Variants**: Default, primary, and verified visual styles
- **Size Options**: Compact, default, and detailed layouts
- **Source Attribution**: Display where skills were imported from (manual, GitHub, AI, etc.)
- **Tag Support**: Display skill tags with overflow handling
- **Responsive Design**: Mobile-friendly layouts
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Example

```tsx
import { SkillCard } from "@aiSkillImprove/design-system";

const skill = {
  id: "1",
  name: "React",
  proficiency: 8,
  category: {
    name: "Frontend Development",
    color: "#3B82F6",
  },
  description: "Component-based JavaScript library",
  tags: ["JavaScript", "UI", "Components"],
  verified: false,
  lastAssessed: "2024-01-15",
  source: "MANUAL",
};

<SkillCard
  skill={skill}
  onEdit={id => console.log("Edit skill:", id)}
  onDelete={id => console.log("Delete skill:", id)}
/>;
```

### Interactive Card

```tsx
<SkillCard
  skill={skill}
  interactive
  onClick={() => console.log("Skill clicked")}
  onEdit={id => handleEdit(id)}
  onDelete={id => handleDelete(id)}
/>
```

### Compact Layout

```tsx
<SkillCard
  skill={skill}
  size="compact"
  showDescription={false}
  showTags={false}
  showLastAssessed={false}
/>
```

### Read-only Card

```tsx
<SkillCard skill={skill} showActions={false} variant="primary" />
```

## Props

### SkillCardProps

| Prop               | Type                                   | Default     | Description                           |
| ------------------ | -------------------------------------- | ----------- | ------------------------------------- |
| `skill`            | `Skill`                                | Required    | Skill data object                     |
| `variant`          | `"default" \| "primary" \| "verified"` | `"default"` | Visual style variant                  |
| `size`             | `"compact" \| "default" \| "detailed"` | `"default"` | Card size                             |
| `interactive`      | `boolean`                              | `false`     | Whether card is clickable             |
| `onEdit`           | `(skillId: string) => void`            | -           | Edit button click handler             |
| `onDelete`         | `(skillId: string) => void`            | -           | Delete button click handler           |
| `onClick`          | `() => void`                           | -           | Card click handler (when interactive) |
| `showActions`      | `boolean`                              | `true`      | Show edit/delete buttons              |
| `showDescription`  | `boolean`                              | `true`      | Show skill description                |
| `showTags`         | `boolean`                              | `true`      | Show skill tags                       |
| `showLastAssessed` | `boolean`                              | `true`      | Show last assessed date               |

### Skill Object

```tsx
interface Skill {
  id: string;
  name: string;
  proficiency: number; // 0-10
  category?: {
    name: string;
    color?: string;
  };
  description?: string;
  tags?: string[];
  verified?: boolean;
  lastAssessed?: string | Date;
  source?: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED";
}
```

## Proficiency Levels

The component supports 11 proficiency levels (0-10) with descriptive labels:

- **0**: Not Started
- **1**: Beginner
- **2**: Beginner+
- **3**: Basic
- **4**: Basic+
- **5**: Intermediate
- **6**: Intermediate+
- **7**: Advanced
- **8**: Advanced+
- **9**: Expert
- **10**: Master

## Variants

### Default

Standard card appearance with neutral styling.

### Primary

Highlighted card with blue accent colors, useful for featured skills.

### Verified

Automatically applied when `skill.verified` is true, shows green accent and verification badge.

## Sizes

### Compact

Minimal layout suitable for lists or grids where space is limited.

- Smaller padding
- Hidden description and tags by default
- Smaller proficiency indicator

### Default

Standard layout with balanced information display.

### Detailed

Expanded layout with more generous spacing for detailed views.

- Larger padding
- Full information display

## Accessibility

- Proper semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus management

## Styling

The component uses Tailwind CSS classes and supports dark mode. Category colors can be customized through the `skill.category.color` property.

## Examples

### Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {skills.map(skill => (
    <SkillCard
      key={skill.id}
      skill={skill}
      interactive
      onClick={() => navigateToSkill(skill.id)}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  ))}
</div>
```

### Dashboard Widget

```tsx
<div className="space-y-4">
  <h3>Recent Skills</h3>
  {recentSkills.map(skill => (
    <SkillCard
      key={skill.id}
      skill={skill}
      size="compact"
      showActions={false}
      interactive
      onClick={() => viewSkillDetails(skill.id)}
    />
  ))}
</div>
```

## Testing

The component includes comprehensive tests covering:

- Rendering with different props
- User interactions (click, edit, delete)
- Accessibility features
- Visual variants and sizes
- Edge cases and error handling

Run tests with:

```bash
npm test skill-card
```
