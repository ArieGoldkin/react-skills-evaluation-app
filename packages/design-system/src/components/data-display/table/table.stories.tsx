import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// Icons used in stories are imported as needed
import * as React from "react";
import { Badge } from "../../ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  DataTable,
  SkillsTable,
  type Column,
  type Skill,
} from "./index";

const meta: Meta = {
  title: "Data Display/Table",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive table component with sorting, filtering, and pagination. Includes specialized components for different data types and use cases.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Table Examples
export const BasicTable: Story = {
  render: () => (
    <div className="p-6">
      <h3 className="mb-4 text-lg font-medium">Basic Table</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">001</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>
                <Badge variant="default">Active</Badge>
              </TableCell>
              <TableCell>Developer</TableCell>
              <TableCell className="text-right">$75,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">002</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>
                <Badge variant="secondary">Away</Badge>
              </TableCell>
              <TableCell>Designer</TableCell>
              <TableCell className="text-right">$65,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">003</TableCell>
              <TableCell>Mike Johnson</TableCell>
              <TableCell>
                <Badge variant="outline">Inactive</Badge>
              </TableCell>
              <TableCell>Manager</TableCell>
              <TableCell className="text-right">$95,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

// DataTable Examples
const sampleData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "Frontend Developer",
    status: "active",
    joinDate: "2023-01-15",
    salary: 75000,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@company.com",
    role: "Backend Developer",
    status: "active",
    joinDate: "2023-03-22",
    salary: 80000,
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@company.com",
    role: "UI/UX Designer",
    status: "away",
    joinDate: "2023-02-10",
    salary: 65000,
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@company.com",
    role: "Product Manager",
    status: "active",
    joinDate: "2022-11-05",
    salary: 95000,
  },
  {
    id: 5,
    name: "Eve Brown",
    email: "eve@company.com",
    role: "DevOps Engineer",
    status: "inactive",
    joinDate: "2023-04-18",
    salary: 85000,
  },
];

const employeeColumns: Column<(typeof sampleData)[0]>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    sortable: true,
    filterable: true,
    cell: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{row.email}</div>
      </div>
    ),
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    sortable: true,
    filterable: true,
    filterType: "select",
    filterOptions: [
      { label: "Frontend Developer", value: "Frontend Developer" },
      { label: "Backend Developer", value: "Backend Developer" },
      { label: "UI/UX Designer", value: "UI/UX Designer" },
      { label: "Product Manager", value: "Product Manager" },
      { label: "DevOps Engineer", value: "DevOps Engineer" },
    ],
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    sortable: true,
    filterable: true,
    cell: value => {
      const variant =
        value === "active"
          ? "default"
          : value === "away"
            ? "secondary"
            : "outline";
      return <Badge variant={variant}>{value}</Badge>;
    },
  },
  {
    id: "joinDate",
    header: "Join Date",
    accessorKey: "joinDate",
    sortable: true,
    cell: value => new Date(value).toLocaleDateString(),
  },
  {
    id: "salary",
    header: "Salary",
    accessorKey: "salary",
    sortable: true,
    filterable: true,
    filterType: "range",
    cell: value => `$${value.toLocaleString()}`,
    className: "text-right",
  },
];

export const DataTableExample: Story = {
  render: () => {
    const [sorting, setSorting] = React.useState([{ id: "name", desc: false }]);
    const [filtering, setFiltering] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    return (
      <div className="container mx-auto py-6">
        <h3 className="mb-4 text-lg font-medium">Employee Directory</h3>
        <DataTable
          data={sampleData}
          columns={employeeColumns}
          sorting={sorting}
          onSortingChange={setSorting}
          filtering={filtering}
          onFilteringChange={setFiltering}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          searchPlaceholder="Search employees..."
        />
      </div>
    );
  },
};

export const DataTableWithPagination: Story = {
  render: () => {
    const [pagination, setPagination] = React.useState({
      pageIndex: 0,
      pageSize: 3,
      pageCount: 2,
      totalCount: 5,
    });

    return (
      <div className="container mx-auto py-6">
        <h3 className="mb-4 text-lg font-medium">Paginated Table</h3>
        <DataTable
          data={sampleData}
          columns={employeeColumns}
          pagination={pagination}
          onPaginationChange={newPagination => {
            setPagination(prev => ({ ...prev, ...newPagination }));
          }}
          manualPagination
        />
      </div>
    );
  },
};

export const DataTableLoading: Story = {
  render: () => (
    <div className="container mx-auto py-6">
      <h3 className="mb-4 text-lg font-medium">Loading State</h3>
      <DataTable
        data={[]}
        columns={employeeColumns}
        loading
        searchPlaceholder="Search employees..."
      />
    </div>
  ),
};

export const DataTableError: Story = {
  render: () => (
    <div className="container mx-auto py-6">
      <h3 className="mb-4 text-lg font-medium">Error State</h3>
      <DataTable
        data={[]}
        columns={employeeColumns}
        error="Failed to load employee data. Please try again."
        searchPlaceholder="Search employees..."
      />
    </div>
  ),
};

export const DataTableEmpty: Story = {
  render: () => (
    <div className="container mx-auto py-6">
      <h3 className="mb-4 text-lg font-medium">Empty State</h3>
      <DataTable
        data={[]}
        columns={employeeColumns}
        emptyMessage="No employees found. Add some employees to get started."
        searchPlaceholder="Search employees..."
      />
    </div>
  ),
};

// Skills Table Examples
const sampleSkills: Skill[] = [
  {
    id: "skill_1",
    name: "JavaScript",
    proficiency: 9,
    description: "Frontend and backend development with modern JS/TS",
    tags: ["programming", "frontend", "backend", "web"],
    source: "MANUAL",
    verified: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-01-10T15:30:00Z",
    category: {
      id: "cat_prog",
      name: "Programming",
      slug: "programming",
      icon: "💻",
      color: "#3b82f6",
    },
    _count: {
      assessments: 5,
      history: 12,
    },
  },
  {
    id: "skill_2",
    name: "Python",
    proficiency: 8,
    description: "Data analysis, machine learning, and web development",
    tags: ["programming", "data-science", "ai", "backend"],
    source: "ASSESSMENT",
    verified: true,
    createdAt: "2023-02-20T09:15:00Z",
    updatedAt: "2024-01-08T11:20:00Z",
    category: {
      id: "cat_prog",
      name: "Programming",
      slug: "programming",
      icon: "💻",
      color: "#3b82f6",
    },
    _count: {
      assessments: 3,
      history: 8,
    },
  },
  {
    id: "skill_3",
    name: "UI/UX Design",
    proficiency: 7,
    description: "User interface and experience design principles",
    tags: ["design", "ui", "ux", "figma"],
    source: "MANUAL",
    verified: false,
    createdAt: "2023-03-10T14:30:00Z",
    updatedAt: "2024-01-05T16:45:00Z",
    category: {
      id: "cat_design",
      name: "Design",
      slug: "design",
      icon: "🎨",
      color: "#f59e0b",
    },
    _count: {
      assessments: 2,
      history: 6,
    },
  },
  {
    id: "skill_4",
    name: "PostgreSQL",
    proficiency: 6,
    description: "Relational database design and optimization",
    tags: ["database", "sql", "backend"],
    source: "GITHUB",
    verified: false,
    createdAt: "2023-04-05T11:00:00Z",
    updatedAt: "2023-12-20T09:30:00Z",
    category: {
      id: "cat_data",
      name: "Database",
      slug: "database",
      icon: "💾",
      color: "#10b981",
    },
    _count: {
      assessments: 1,
      history: 3,
    },
  },
  {
    id: "skill_5",
    name: "Project Management",
    proficiency: 8,
    description: "Agile methodologies, team coordination, and delivery",
    tags: ["management", "agile", "scrum", "leadership"],
    source: "AI_SUGGESTED",
    verified: true,
    createdAt: "2023-05-12T13:20:00Z",
    updatedAt: "2024-01-02T10:15:00Z",
    category: {
      id: "cat_mgmt",
      name: "Management",
      slug: "management",
      icon: "👥",
      color: "#8b5cf6",
    },
    _count: {
      assessments: 4,
      history: 10,
    },
  },
  {
    id: "skill_6",
    name: "Docker",
    proficiency: 5,
    description: "Containerization and deployment strategies",
    tags: ["devops", "containers", "deployment"],
    source: "IMPORTED",
    verified: false,
    createdAt: "2023-06-18T16:45:00Z",
    updatedAt: "2023-11-30T14:20:00Z",
    category: {
      id: "cat_devops",
      name: "DevOps",
      slug: "devops",
      icon: "🚀",
      color: "#ef4444",
    },
    _count: {
      assessments: 2,
      history: 4,
    },
  },
];

export const SkillsTableExample: Story = {
  render: () => {
    const [sorting, setSorting] = React.useState([
      { id: "proficiency", desc: true },
    ]);
    const [filtering, setFiltering] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    return (
      <div className="container mx-auto py-6">
        <h3 className="mb-4 text-lg font-medium">Skills Management</h3>
        <SkillsTable
          data={sampleSkills}
          sorting={sorting}
          onSortingChange={setSorting}
          filtering={filtering}
          onFilteringChange={setFiltering}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          onView={action("view skill")}
          onEdit={action("edit skill")}
          onDelete={action("delete skill")}
          manualPagination={false}
          manualSorting={false}
          manualFiltering={false}
        />
      </div>
    );
  },
};

export const SkillsTableWithPagination: Story = {
  render: () => {
    const [pagination, setPagination] = React.useState({
      pageIndex: 0,
      pageSize: 4,
      pageCount: 2,
      totalCount: 6,
    });

    return (
      <div className="container mx-auto py-6">
        <h3 className="mb-4 text-lg font-medium">Paginated Skills Table</h3>
        <SkillsTable
          data={sampleSkills}
          pagination={pagination}
          onPaginationChange={newPagination => {
            setPagination(prev => ({ ...prev, ...newPagination }));
            action("pagination changed")(newPagination);
          }}
          onView={action("view skill")}
          onEdit={action("edit skill")}
          onDelete={action("delete skill")}
          manualPagination
        />
      </div>
    );
  },
};

export const SkillsTableStates: Story = {
  render: () => (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-medium">Loading State</h3>
        <SkillsTable data={[]} loading />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Error State</h3>
        <SkillsTable
          data={[]}
          error="Failed to load skills from the API. Please check your connection."
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Empty State</h3>
        <SkillsTable data={[]} />
      </div>
    </div>
  ),
};

export const SkillsTableFiltered: Story = {
  render: () => {
    const filteredSkills = sampleSkills.filter(
      skill => skill.category.name === "Programming"
    );

    return (
      <div className="container mx-auto py-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Programming Skills Only</h3>
          <p className="text-sm text-muted-foreground">
            Showing {filteredSkills.length} skills in the Programming category
          </p>
        </div>
        <SkillsTable
          data={filteredSkills}
          onView={action("view skill")}
          onEdit={action("edit skill")}
          onDelete={action("delete skill")}
          manualPagination={false}
          manualSorting={false}
          manualFiltering={false}
        />
      </div>
    );
  },
};

export const SkillsTableInteractive: Story = {
  render: () => {
    const [skills, setSkills] = React.useState(sampleSkills);
    const [sorting, setSorting] = React.useState([]);
    const [filtering, setFiltering] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const handleView = (skill: Skill) => {
      alert(
        `Viewing skill: ${skill.name}\nProficiency: ${skill.proficiency}/10`
      );
    };

    const handleEdit = (skill: Skill) => {
      const newProficiency = Math.min(10, skill.proficiency + 1);
      setSkills(prev =>
        prev.map(s =>
          s.id === skill.id ? { ...s, proficiency: newProficiency } : s
        )
      );
    };

    const handleDelete = (skill: Skill) => {
      if (window.confirm(`Are you sure you want to delete "${skill.name}"?`)) {
        setSkills(prev => prev.filter(s => s.id !== skill.id));
      }
    };

    return (
      <div className="container mx-auto py-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Interactive Skills Table</h3>
          <p className="text-sm text-muted-foreground">
            Try the actions - View shows details, Edit increases proficiency,
            Delete removes the skill
          </p>
        </div>
        <SkillsTable
          data={skills}
          sorting={sorting}
          onSortingChange={setSorting}
          filtering={filtering}
          onFilteringChange={setFiltering}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          manualPagination={false}
          manualSorting={false}
          manualFiltering={false}
        />
      </div>
    );
  },
};
