# Table Components

A comprehensive set of table components for displaying and managing tabular data with advanced features like sorting, filtering, and pagination.

## Features

### ✅ Core Components

- **Basic Table**: Semantic HTML table structure with styling
- **DataTable**: Advanced data table with sorting, filtering, and pagination
- **SkillsTable**: Specialized table for skills management
- **DataTablePagination**: Configurable pagination component

### ✅ Advanced Features

- **Sorting**: Click column headers to sort data (ascending/descending/none)
- **Filtering**: Global search and column-specific filtering
- **Pagination**: Client-side and server-side pagination support
- **Keyboard Navigation**: Full keyboard accessibility
- **Responsive Design**: Mobile-friendly responsive layouts

### ✅ Skills API Integration

- **API Hook**: `useSkillsTable` for seamless skills API integration
- **Real-time Updates**: Automatic data fetching and caching
- **Error Handling**: Comprehensive error states and retry mechanisms
- **Loading States**: Skeleton loading and progress indicators

## Components

### Basic Table Components

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/data-display/table";

function BasicTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

### DataTable Component

```tsx
import { DataTable, type Column } from "@/components/data-display/table";

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const columns: Column<Employee>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    sortable: true,
    filterable: true,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    filterable: true,
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    sortable: true,
    filterable: true,
    filterType: "select",
    filterOptions: [
      { label: "Developer", value: "developer" },
      { label: "Designer", value: "designer" },
    ],
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: value => (
      <Badge variant={value === "active" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
];

function EmployeeTable({ data }: { data: Employee[] }) {
  const [sorting, setSorting] = useState([{ id: "name", desc: false }]);
  const [filtering, setFiltering] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <DataTable
      data={data}
      columns={columns}
      sorting={sorting}
      onSortingChange={setSorting}
      filtering={filtering}
      onFilteringChange={setFiltering}
      globalFilter={globalFilter}
      onGlobalFilterChange={setGlobalFilter}
    />
  );
}
```

### SkillsTable Component

```tsx
import { SkillsTable, type Skill } from "@/components/data-display/table";

function SkillsManagement({ skills }: { skills: Skill[] }) {
  const handleView = (skill: Skill) => {
    console.log("Viewing skill:", skill.name);
  };

  const handleEdit = (skill: Skill) => {
    console.log("Editing skill:", skill.name);
  };

  const handleDelete = (skill: Skill) => {
    console.log("Deleting skill:", skill.name);
  };

  return (
    <SkillsTable
      data={skills}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      manualPagination={false}
      manualSorting={false}
      manualFiltering={false}
    />
  );
}
```

### Skills Table with API Integration

```tsx
import { useSkillsTable, SkillsTable } from "@/components/data-display/table";

function SkillsPage() {
  const {
    data,
    loading,
    error,
    sorting,
    filtering,
    globalFilter,
    pagination,
    onSortingChange,
    onFilteringChange,
    onGlobalFilterChange,
    onPaginationChange,
    refetch,
  } = useSkillsTable({
    initialPageSize: 10,
    initialSorting: [{ id: "proficiency", desc: true }],
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Skills</h1>
        <Button onClick={refetch}>Refresh</Button>
      </div>

      <SkillsTable
        data={data}
        loading={loading}
        error={error}
        sorting={sorting}
        onSortingChange={onSortingChange}
        filtering={filtering}
        onFilteringChange={onFilteringChange}
        globalFilter={globalFilter}
        onGlobalFilterChange={onGlobalFilterChange}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        manualPagination
        manualSorting
        manualFiltering
      />
    </div>
  );
}
```

## API Integration

### useSkillsTable Hook

The `useSkillsTable` hook provides complete integration with the skills API:

```tsx
const {
  // Data
  data, // Skill[] - Current skills data
  loading, // boolean - Loading state
  error, // string | null - Error message

  // Table state
  sorting, // SortingState[] - Current sorting
  filtering, // FilterState[] - Current filters
  globalFilter, // string - Global search term
  pagination, // PaginationState - Pagination info

  // Event handlers
  onSortingChange,
  onFilteringChange,
  onGlobalFilterChange,
  onPaginationChange,

  // Actions
  refetch, // () => Promise<void> - Refresh data
  reset, // () => void - Reset to initial state
} = useSkillsTable(options);
```

### API Parameters

The hook automatically converts table state to API parameters:

| Table State            | API Parameter | Description             |
| ---------------------- | ------------- | ----------------------- |
| `globalFilter`         | `search`      | Global search term      |
| `sorting[0].id`        | `sortBy`      | Sort column             |
| `sorting[0].desc`      | `order`       | Sort direction          |
| `pagination.pageIndex` | `offset`      | Page offset             |
| `pagination.pageSize`  | `limit`       | Items per page          |
| Column filters         | Various       | Column-specific filters |

## Column Configuration

### Column Types

```tsx
interface Column<TData> {
  id: string; // Unique column identifier
  header: string | ReactNode; // Column header content
  accessorKey?: keyof TData; // Data property key
  cell?: (value: any, row: TData) => ReactNode; // Custom cell renderer
  sortable?: boolean; // Enable sorting
  filterable?: boolean; // Enable filtering
  filterType?: "text" | "select" | "range"; // Filter input type
  filterOptions?: Array<{ label: string; value: string }>; // Select options
  className?: string; // Cell CSS classes
  headerClassName?: string; // Header CSS classes
}
```

### Cell Renderers

Custom cell renderers allow complex content:

```tsx
{
  id: "status",
  header: "Status",
  accessorKey: "status",
  cell: (value, row) => (
    <div className="flex items-center space-x-2">
      <StatusIcon status={value} />
      <span>{value}</span>
      {row.urgent && <Badge variant="destructive">Urgent</Badge>}
    </div>
  ),
}
```

## Pagination

### Client-Side Pagination

```tsx
<DataTable
  data={allData}
  columns={columns}
  manualPagination={false} // Handle pagination internally
  pagination={{
    pageIndex: 0,
    pageSize: 10,
    pageCount: Math.ceil(allData.length / 10),
    totalCount: allData.length,
  }}
/>
```

### Server-Side Pagination

```tsx
<DataTable
  data={currentPageData}
  columns={columns}
  manualPagination={true} // Handle pagination externally
  pagination={paginationState}
  onPaginationChange={newPagination => {
    // Fetch new page from server
    fetchPage(newPagination.pageIndex, newPagination.pageSize);
  }}
/>
```

## Filtering

### Global Filter

```tsx
const [globalFilter, setGlobalFilter] = useState("");

<DataTable
  globalFilter={globalFilter}
  onGlobalFilterChange={setGlobalFilter}
  searchPlaceholder="Search all columns..."
/>;
```

### Column Filters

```tsx
const columns = [
  {
    id: "category",
    header: "Category",
    filterable: true,
    filterType: "select",
    filterOptions: [
      { label: "Programming", value: "programming" },
      { label: "Design", value: "design" },
    ],
  },
  {
    id: "proficiency",
    header: "Proficiency",
    filterable: true,
    filterType: "range",
  },
];
```

## Sorting

### Single Column Sorting

```tsx
const [sorting, setSorting] = useState([{ id: "name", desc: false }]);

<DataTable sorting={sorting} onSortingChange={setSorting} />;
```

### Custom Sort Functions

For complex sorting, handle it in your data layer:

```tsx
// In useSkillsTable or similar
const sortedData = useMemo(() => {
  if (!sorting.length) return data;

  const { id, desc } = sorting[0];
  return [...data].sort((a, b) => {
    if (id === "custom") {
      // Custom sorting logic
      return customCompare(a, b, desc);
    }
    // Default sorting
    return desc ? b[id] - a[id] : a[id] - b[id];
  });
}, [data, sorting]);
```

## Accessibility

### Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Space/Enter**: Activate buttons and links
- **Arrow Keys**: Navigate within dropdowns and filters
- **Escape**: Close dropdowns and clear filters

### Screen Reader Support

```tsx
// Column headers announce sorting state
<TableHead aria-sort={getSortDirection(column.id)}>
  {column.header}
</TableHead>

// Action buttons have descriptive labels
<Button aria-label={`Actions for ${skill.name}`}>
  <MoreHorizontal />
</Button>

// Status information is announced
<div role="status" aria-live="polite">
  Showing {startItem} to {endItem} of {totalCount} entries
</div>
```

### ARIA Attributes

The components automatically provide:

- `role="table"` on table containers
- `role="columnheader"` on header cells
- `role="row"` on table rows
- `role="cell"` on data cells
- `aria-sort` states for sortable columns
- `aria-label` for action buttons

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "./data-table";

test("sorts data when column header is clicked", async () => {
  const data = [
    { id: 1, name: "Charlie" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" },
  ];

  render(<DataTable data={data} columns={columns} />);

  fireEvent.click(screen.getByText("Name"));

  const rows = screen.getAllByRole("row");
  expect(rows[1]).toHaveTextContent("Alice");
});
```

### Integration Tests

```tsx
test("filters data based on search input", async () => {
  render(<DataTable data={data} columns={columns} />);

  const searchInput = screen.getByPlaceholderText("Search...");
  fireEvent.change(searchInput, { target: { value: "Alice" } });

  await waitFor(() => {
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });
});
```

## Performance

### Optimization Strategies

1. **Virtualization**: For large datasets (1000+ rows)
2. **Memoization**: Use `React.memo` for expensive cell renderers
3. **Debounced Search**: Prevent excessive API calls
4. **Incremental Loading**: Load more data on scroll

```tsx
// Example: Memoized cell renderer
const ExpensiveCell = React.memo(({ value, row }) => {
  return <ComplexVisualization data={value} />;
});

// Example: Debounced search
const debouncedSearch = useCallback(
  debounce(searchTerm => {
    setGlobalFilter(searchTerm);
  }, 300),
  []
);
```

## Error Handling

### Error States

```tsx
if (error) {
  return (
    <div className="flex items-center justify-center p-8 text-destructive">
      <div className="text-center">
        <p className="mb-2">Failed to load data</p>
        <Button onClick={refetch} variant="outline">
          Try Again
        </Button>
      </div>
    </div>
  );
}
```

### Error Recovery

```tsx
const { error, refetch } = useSkillsTable({
  onError: error => {
    console.error("Skills table error:", error);
    toast.error("Failed to load skills");
  },
});
```

## Styling

### Custom Themes

```tsx
// Custom table with branded styling
<DataTable className="border-brand-200" data={data} columns={columns} />;

// Column-specific styling
const columns = [
  {
    id: "priority",
    header: "Priority",
    className: "text-center",
    headerClassName: "bg-red-50",
    cell: value => (
      <Badge
        variant={value === "high" ? "destructive" : "secondary"}
        className="font-bold"
      >
        {value}
      </Badge>
    ),
  },
];
```

### Responsive Design

```tsx
// Hide columns on smaller screens
const columns = [
  {
    id: "name",
    header: "Name",
    className: "min-w-[200px]", // Ensure minimum width
  },
  {
    id: "description",
    header: "Description",
    className: "hidden md:table-cell", // Hide on mobile
  },
];
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Related Components

- [Badge](../../ui/badge) - For status indicators
- [Button](../../ui/button) - For actions
- [Input](../../ui/input) - For search and filters
- [DropdownMenu](../../navigation/dropdown-menu) - For row actions
