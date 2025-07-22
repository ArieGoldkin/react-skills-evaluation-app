import type { Meta, StoryObj } from "@storybook/react";
import { Pagination, SimplePagination } from "./pagination";
import { useState } from "react";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Current active page",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    siblingCount: {
      control: { type: "number", min: 0, max: 3 },
      description: "Number of sibling pages to show on each side",
    },
    showFirstLast: {
      control: "boolean",
      description: "Show first/last page buttons",
    },
    showPrevNext: {
      control: "boolean",
      description: "Show previous/next buttons",
    },
    showPageInfo: {
      control: "boolean",
      description: "Show page information text",
    },
    disabled: {
      control: "boolean",
      description: "Disable all pagination controls",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function PaginationWrapper(args: any) {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

export const Default: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const WithPageInfo: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 2,
    totalPages: 10,
    pageSize: 20,
    totalItems: 193,
    showPageInfo: true,
  },
};

export const ManyPages: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 25,
    totalPages: 50,
  },
};

export const FewPages: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};

export const MiddlePage: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 15,
    totalPages: 30,
  },
};

export const LargeSiblingCount: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 15,
    totalPages: 30,
    siblingCount: 3,
  },
};

export const MinimalControls: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    showFirstLast: false,
    showPrevNext: false,
  },
};

export const OnlyPrevNext: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    showFirstLast: false,
  },
};

export const Disabled: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    disabled: true,
  },
};

export const SinglePage: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const CustomStyles: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
    buttonClassName: "hover:bg-blue-100 dark:hover:bg-blue-900",
    activeClassName: "bg-blue-500 text-white hover:bg-blue-600",
  },
};

function SimplePaginationWrapper(args: any) {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  return (
    <SimplePagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

export const Simple: Story = {
  render: args => <SimplePaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A simplified pagination component with just Previous/Next buttons.",
      },
    },
  },
};

export const SimpleMiddlePage: Story = {
  render: args => <SimplePaginationWrapper {...args} />,
  args: {
    currentPage: 3,
    totalPages: 5,
  },
};

export const SimpleDisabled: Story = {
  render: args => <SimplePaginationWrapper {...args} />,
  args: {
    currentPage: 2,
    totalPages: 5,
    disabled: true,
  },
};

export const DataTableExample: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalItems = 87;
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
      <div className="space-y-4">
        <div className="rounded-md border p-4">
          <h3 className="mb-4 text-lg font-semibold">User List</h3>
          <div className="space-y-2">
            {Array.from({
              length: Math.min(
                pageSize,
                totalItems - (currentPage - 1) * pageSize
              ),
            }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded border p-2"
              >
                <span>User {(currentPage - 1) * pageSize + i + 1}</span>
                <span className="text-sm text-muted-foreground">
                  user{(currentPage - 1) * pageSize + i + 1}@example.com
                </span>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          showPageInfo
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of pagination used with a data table.",
      },
    },
  },
};
