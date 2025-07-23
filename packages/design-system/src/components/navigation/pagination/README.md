# Pagination Component

A flexible pagination component with multiple display options and full accessibility support.

## Features

- 🎯 Smart page range calculation with ellipsis
- 🔄 Previous/Next navigation
- ⏭️ First/Last page shortcuts
- 📊 Optional page info display
- ♿ Full accessibility support
- 📱 Responsive design
- 🎨 Customizable styling
- 🚀 Simple pagination variant

## Usage

### Basic Pagination

```tsx
import { Pagination } from "@skills-eval/design-system";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

### With Page Information

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  pageSize={20}
  totalItems={193}
  showPageInfo
/>
```

### Minimal Controls

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  showFirstLast={false}
  showPrevNext={false}
/>
```

### Simple Pagination

```tsx
import { SimplePagination } from "@skills-eval/design-system";

<SimplePagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>;
```

## Props

### Pagination Props

| Prop              | Type                     | Default                   | Description                                  |
| ----------------- | ------------------------ | ------------------------- | -------------------------------------------- |
| `currentPage`     | `number`                 | -                         | Current active page (1-indexed)              |
| `totalPages`      | `number`                 | -                         | Total number of pages                        |
| `onPageChange`    | `(page: number) => void` | -                         | Callback when page changes                   |
| `pageSize`        | `number`                 | `undefined`               | Number of items per page (for page info)     |
| `totalItems`      | `number`                 | `undefined`               | Total number of items (for page info)        |
| `siblingCount`    | `number`                 | `1`                       | Number of sibling pages to show on each side |
| `showFirstLast`   | `boolean`                | `true`                    | Show first/last page buttons                 |
| `showPrevNext`    | `boolean`                | `true`                    | Show previous/next buttons                   |
| `showPageInfo`    | `boolean`                | `false`                   | Show "Showing X to Y of Z results"           |
| `className`       | `string`                 | `undefined`               | CSS class for the nav element                |
| `buttonClassName` | `string`                 | `undefined`               | CSS class for all buttons                    |
| `activeClassName` | `string`                 | `undefined`               | CSS class for active page button             |
| `disabled`        | `boolean`                | `false`                   | Disable all pagination controls              |
| `ariaLabel`       | `string`                 | `"Pagination Navigation"` | ARIA label for navigation                    |

### SimplePagination Props

| Prop           | Type                     | Default     | Description                     |
| -------------- | ------------------------ | ----------- | ------------------------------- |
| `currentPage`  | `number`                 | -           | Current active page (1-indexed) |
| `totalPages`   | `number`                 | -           | Total number of pages           |
| `onPageChange` | `(page: number) => void` | -           | Callback when page changes      |
| `className`    | `string`                 | `undefined` | CSS class for the container     |
| `disabled`     | `boolean`                | `false`     | Disable all controls            |

## Examples

### Data Table Integration

```tsx
function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data, totalItems } = useUsers({ page: currentPage, pageSize });
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <>
      <Table>{/* Table content */}</Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        showPageInfo
      />
    </>
  );
}
```

### URL State Sync

```tsx
function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={20}
      onPageChange={handlePageChange}
    />
  );
}
```

### Custom Styling

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow"
  buttonClassName="hover:bg-blue-50 dark:hover:bg-blue-900"
  activeClassName="bg-blue-500 text-white hover:bg-blue-600"
/>
```

### Mobile-Friendly

```tsx
// Use SimplePagination for mobile views
const isMobile = useMediaQuery("(max-width: 640px)");

return isMobile ? (
  <SimplePagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />
) : (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
    showPageInfo
  />
);
```

## Accessibility

- Uses semantic `<nav>` element with proper ARIA label
- Current page marked with `aria-current="page"`
- Descriptive ARIA labels for all interactive elements
- Keyboard navigable with Tab key
- Disabled states properly communicated

## Page Range Algorithm

The component intelligently shows page numbers based on the current page and sibling count:

1. **Few pages**: Shows all page numbers if total pages ≤ (siblingCount \* 2 + 5)
2. **Start pages**: Shows first pages + ellipsis + last page
3. **End pages**: Shows first page + ellipsis + last pages
4. **Middle pages**: Shows first + ellipsis + current siblings + ellipsis + last

Example with `siblingCount=1`:

- Pages 1-7: `[1] 2 3 4 5 6 7`
- Page 5 of 20: `1 ... 4 [5] 6 ... 20`
- Page 18 of 20: `1 ... 17 [18] 19 20`

## Best Practices

1. **Always use 1-based indexing** for page numbers
2. **Provide page info** when showing tabular data
3. **Consider SimplePagination** for mobile or compact layouts
4. **Sync with URL** for shareable/bookmarkable pages
5. **Show loading state** by setting `disabled` during data fetching
6. **Handle edge cases** like empty results or single page

## Performance

- Memoized page range calculation
- No unnecessary re-renders
- Efficient event handling
- Minimal DOM updates
