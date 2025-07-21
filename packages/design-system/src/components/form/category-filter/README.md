# CategoryFilter Component

A comprehensive filter component for selecting skill categories with search functionality, bulk actions, and extensive customization options.

## Features

- **Multi-select Filtering**: Select multiple categories simultaneously
- **Real-time Search**: Filter categories by name or slug as you type
- **Bulk Actions**: Select all, deselect all, and clear all options
- **Visual Indicators**: Category icons, skill counts, and selection states
- **Loading States**: Built-in loading and empty state handling
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable**: Multiple variants, sizes, and styling options

## Usage

### Basic Example

```tsx
import { CategoryFilter } from "@aiSkillImprove/design-system";

const categories = [
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
];

const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

<CategoryFilter
  categories={categories}
  selectedCategories={selectedCategories}
  onSelectionChange={setSelectedCategories}
/>
```

### With Pre-selected Categories

```tsx
<CategoryFilter
  categories={categories}
  selectedCategories={["1", "3"]}
  onSelectionChange={handleSelectionChange}
/>
```

### Compact Layout

```tsx
<CategoryFilter
  categories={categories}
  selectedCategories={selectedCategories}
  onSelectionChange={handleSelectionChange}
  variant="compact"
  size="sm"
  showSearch={false}
  showBulkActions={false}
/>
```

### Custom Configuration

```tsx
<CategoryFilter
  categories={categories}
  selectedCategories={selectedCategories}
  onSelectionChange={handleSelectionChange}
  searchPlaceholder="Find your skill category..."
  showIcons={false}
  showCounts={false}
  maxHeight={200}
  emptyMessage="No skill categories available"
/>
```

### Loading State

```tsx
<CategoryFilter
  categories={[]}
  selectedCategories={[]}
  onSelectionChange={() => {}}
  loading={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `categories` | `Category[]` | Required | Array of category objects |
| `selectedCategories` | `string[]` | Required | Array of selected category IDs |
| `onSelectionChange` | `(ids: string[]) => void` | Required | Called when selection changes |
| `variant` | `"default" \| "compact" \| "outline"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Component size |
| `searchPlaceholder` | `string` | `"Search categories..."` | Search input placeholder |
| `showSearch` | `boolean` | `true` | Show search input |
| `showCounts` | `boolean` | `true` | Show skill counts |
| `showBulkActions` | `boolean` | `true` | Show select/clear all buttons |
| `showIcons` | `boolean` | `true` | Show category icons |
| `maxHeight` | `number` | `300` | Maximum height in pixels |
| `emptyMessage` | `string` | `"No categories found"` | Empty state message |
| `loading` | `boolean` | `false` | Loading state |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | - | Additional CSS classes |

### Category Object

```tsx
interface Category {
  id: string;           // Unique identifier
  name: string;         // Display name
  slug: string;         // URL-friendly identifier
  icon?: string;        // Emoji or icon character
  color?: string;       // Hex color code
  skillCount?: number;  // Number of skills in category
}
```

## Variants

### Default
Standard appearance with clean borders and neutral styling.

### Compact
Minimal styling with subtle shadows, perfect for sidebars.

### Outline
Dashed border style that emphasizes the filtering nature.

## Sizes

### Small (sm)
Compact padding suitable for tight layouts.

### Medium (md)
Balanced spacing for most use cases.

### Large (lg)
Generous padding for prominent placement.

## Functionality

### Search
- Real-time filtering as you type
- Searches both category names and slugs
- Case-insensitive matching
- Clear search option when no results

### Bulk Actions
- **Select All**: Selects all visible (filtered) categories
- **Deselect All**: Deselects all visible categories
- **Clear All**: Clears all selections regardless of filters

### Selection Behavior
- Click any category to toggle selection
- Visual indicators show selected state
- Selection count badge shows total selected
- Footer summary shows selection details

## Accessibility

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to toggle category selection
- Arrow keys within category list

### Screen Reader Support
- Proper ARIA labels and roles
- Selection state announcements
- Progress indicators for loading states
- Descriptive button labels

### Visual Accessibility
- High contrast selection indicators
- Color-blind friendly selection states
- Focus indicators on all interactive elements
- Sufficient text sizes and spacing

## Examples

### Sidebar Filter

```tsx
<div className="flex gap-6">
  <div className="w-64">
    <CategoryFilter
      categories={categories}
      selectedCategories={selectedCategories}
      onSelectionChange={setSelectedCategories}
      variant="compact"
    />
  </div>
  <div className="flex-1">
    <SkillsList 
      categories={selectedCategories}
      skills={filteredSkills} 
    />
  </div>
</div>
```

### Modal Filter

```tsx
<Modal open={isOpen} onClose={onClose}>
  <Modal.Header>
    <h2>Filter Skills by Category</h2>
  </Modal.Header>
  <Modal.Body>
    <CategoryFilter
      categories={categories}
      selectedCategories={selectedCategories}
      onSelectionChange={setSelectedCategories}
      size="lg"
    />
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={applyFilters}>Apply Filters</Button>
    <Button variant="outline" onClick={onClose}>Cancel</Button>
  </Modal.Footer>
</Modal>
```

### Inline Filter Bar

```tsx
<div className="mb-6">
  <CategoryFilter
    categories={categories}
    selectedCategories={selectedCategories}
    onSelectionChange={setSelectedCategories}
    variant="outline"
    showSearch={false}
    showBulkActions={false}
    maxHeight={150}
  />
</div>
```

### Advanced Usage with Analytics

```tsx
const handleSelectionChange = (selectedIds: string[]) => {
  setSelectedCategories(selectedIds);
  
  // Track analytics
  analytics.track('Categories Filtered', {
    selectedCount: selectedIds.length,
    categories: selectedIds,
    source: 'skills_page'
  });
  
  // Update URL params
  const params = new URLSearchParams();
  if (selectedIds.length > 0) {
    params.set('categories', selectedIds.join(','));
  }
  router.push(`/skills?${params.toString()}`);
};

<CategoryFilter
  categories={categories}
  selectedCategories={selectedCategories}
  onSelectionChange={handleSelectionChange}
/>
```

## State Management

### Local State

```tsx
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
const [filteredSkills, setFilteredSkills] = useState(skills);

useEffect(() => {
  if (selectedCategories.length === 0) {
    setFilteredSkills(skills);
  } else {
    setFilteredSkills(
      skills.filter(skill => 
        selectedCategories.includes(skill.categoryId)
      )
    );
  }
}, [selectedCategories, skills]);
```

### With TanStack Query

```tsx
const { data: categories, isLoading } = useQuery({
  queryKey: ['categories'],
  queryFn: fetchCategories,
});

<CategoryFilter
  categories={categories || []}
  selectedCategories={selectedCategories}
  onSelectionChange={setSelectedCategories}
  loading={isLoading}
/>
```

### URL Synchronization

```tsx
const router = useRouter();
const { categories: urlCategories } = router.query;

const selectedCategories = useMemo(() => {
  return typeof urlCategories === 'string' 
    ? urlCategories.split(',')
    : [];
}, [urlCategories]);

const handleSelectionChange = (ids: string[]) => {
  const query = { ...router.query };
  
  if (ids.length > 0) {
    query.categories = ids.join(',');
  } else {
    delete query.categories;
  }
  
  router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
};
```

## Performance Considerations

- **Virtualization**: For very large category lists (>100 items), consider implementing virtualization
- **Debounced Search**: Search is immediate but can be debounced for API calls
- **Memoization**: Categories list should be memoized to prevent unnecessary re-renders
- **Optimistic Updates**: Selection changes are immediate with optimistic UI updates

## Styling

### Custom Colors

Categories with colors automatically apply them to count badges:

```tsx
const category = {
  id: "1",
  name: "Frontend",
  color: "#3B82F6", // Applied to count badge background
  skillCount: 12
};
```

### CSS Variables

Override default spacing and colors:

```css
.category-filter {
  --category-filter-padding: 1rem;
  --category-filter-border: #e5e7eb;
  --category-filter-selected: #3b82f6;
}
```

### Dark Mode

All variants automatically adapt to dark mode with proper contrast ratios.

## Testing

The component includes comprehensive tests covering:
- Category rendering and selection
- Search functionality
- Bulk actions
- Loading and empty states
- Accessibility features
- Edge cases and error handling

Run tests with:
```bash
npm test category-filter
```

## Integration with Other Components

### With SkillCard

```tsx
const filteredSkills = skills.filter(skill => 
  selectedCategories.length === 0 || 
  selectedCategories.includes(skill.categoryId)
);

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredSkills.map(skill => (
    <SkillCard key={skill.id} skill={skill} />
  ))}
</div>
```

### With SkillMatrix

```tsx
<SkillMatrix 
  skills={skills}
  selectedCategories={selectedCategories}
  onCategoryChange={setSelectedCategories}
  categoryFilter={
    <CategoryFilter
      categories={categories}
      selectedCategories={selectedCategories}
      onSelectionChange={setSelectedCategories}
    />
  }
/>
```