import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "./modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Feedback/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modal dialog component built on Radix UI Dialog primitives. Displays content in a layer above the page with backdrop overlay.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Modal
export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a basic modal example. You can put any content here.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Modal content goes here. This could be form fields, information, or
            any other content.
          </p>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button>Confirm</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Modal>
        <ModalTrigger asChild>
          <Button variant="outline">Small Modal</Button>
        </ModalTrigger>
        <ModalContent size="sm">
          <ModalHeader>
            <ModalTitle>Small Modal</ModalTitle>
            <ModalDescription>
              This is a small modal (max-w-sm).
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="outline">Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <Button variant="outline">Medium Modal</Button>
        </ModalTrigger>
        <ModalContent size="md">
          <ModalHeader>
            <ModalTitle>Medium Modal</ModalTitle>
            <ModalDescription>
              This is a medium modal (max-w-lg) - the default size.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="outline">Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <Button variant="outline">Large Modal</Button>
        </ModalTrigger>
        <ModalContent size="lg">
          <ModalHeader>
            <ModalTitle>Large Modal</ModalTitle>
            <ModalDescription>
              This is a large modal (max-w-2xl).
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="outline">Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <Button variant="outline">Extra Large Modal</Button>
        </ModalTrigger>
        <ModalContent size="xl">
          <ModalHeader>
            <ModalTitle>Extra Large Modal</ModalTitle>
            <ModalDescription>
              This is an extra large modal (max-w-4xl).
            </ModalDescription>
          </ModalHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This size is great for forms, detailed content, or when you need
              more space.
            </p>
          </div>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="outline">Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger asChild>
          <Button variant="outline">Full Size Modal</Button>
        </ModalTrigger>
        <ModalContent size="full">
          <ModalHeader>
            <ModalTitle>Full Size Modal</ModalTitle>
            <ModalDescription>
              This is a full size modal (95vw x 95vh).
            </ModalDescription>
          </ModalHeader>
          <div className="py-4 flex-1">
            <p className="text-sm text-muted-foreground">
              Perfect for complex interfaces, data tables, or when you need
              maximum space.
            </p>
          </div>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="outline">Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  ),
};

// Confirmation Modal
export const ConfirmationModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Are you absolutely sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete the item
            and remove it from our servers.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="destructive">Delete</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Form Modal
export const FormModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Create Account</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Create Account</ModalTitle>
          <ModalDescription>
            Fill out the form below to create your new account.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              className="col-span-3 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="col-span-3 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="password"
              className="text-right text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="col-span-3 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button type="submit">Create Account</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Information Modal
export const InformationModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">View Details</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Product Information</ModalTitle>
          <ModalDescription>
            Detailed information about this product.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Features</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• High-quality materials</li>
              <li>• 2-year warranty</li>
              <li>• Free shipping</li>
              <li>• 30-day return policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Specifications</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Dimensions: 10" x 8" x 2"</li>
              <li>• Weight: 1.5 lbs</li>
              <li>• Material: Premium aluminum</li>
              <li>• Color: Space Gray</li>
            </ul>
          </div>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Close</Button>
          </ModalClose>
          <Button>Add to Cart</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Custom Close Modal
export const CustomCloseModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Custom Close</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Custom Close Behavior</ModalTitle>
          <ModalDescription>
            This modal demonstrates custom close buttons in the footer.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            You can close this modal using the X button in the top-right corner,
            or using one of the custom buttons in the footer below.
          </p>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="ghost">Maybe Later</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="outline">No Thanks</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button>Got It!</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Controlled Modal
export const ControlledModal: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    const handleSubmit = () => {
      // Simulate form submission
      alert("Form submitted!");
      setOpen(false);
    };

    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Controlled Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Controlled Modal</ModalTitle>
            <ModalDescription>
              This modal's open state is controlled by React state.
            </ModalDescription>
          </ModalHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Open state: {open ? "Open" : "Closed"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              The submit button will programmatically close the modal.
            </p>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};

// Scrollable Content Modal
export const ScrollableContentModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Scrollable Content</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Terms and Conditions</ModalTitle>
          <ModalDescription>
            Please read through our terms and conditions.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4 max-h-96 overflow-y-auto">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur?
            </p>
          </div>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Decline</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button>Accept</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Nested Modals Example
export const NestedModals: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Open First Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>First Modal</ModalTitle>
          <ModalDescription>
            This modal contains another modal trigger.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Click the button below to open a second modal on top of this one.
          </p>
          <Modal>
            <ModalTrigger asChild>
              <Button>Open Second Modal</Button>
            </ModalTrigger>
            <ModalContent size="sm">
              <ModalHeader>
                <ModalTitle>Second Modal</ModalTitle>
                <ModalDescription>
                  This is a nested modal example.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  This modal appears on top of the first one.
                </p>
              </div>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="outline">Close</Button>
                </ModalClose>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Close First Modal</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Accessible Modal
export const AccessibleModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Accessible Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Accessibility Features</ModalTitle>
          <ModalDescription>
            This modal demonstrates accessibility best practices.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">
              Accessibility Features:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Focus management - focus is trapped within the modal</li>
              <li>
                • Keyboard navigation - use Tab to navigate, Escape to close
              </li>
              <li>• ARIA attributes - proper labeling for screen readers</li>
              <li>• Backdrop click - click outside the modal to close</li>
              <li>• High contrast - follows system color preferences</li>
            </ul>
          </div>
          <div className="space-y-2">
            <label htmlFor="test-input" className="text-sm font-medium">
              Test Focus Management
            </label>
            <input
              id="test-input"
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Try tabbing through the modal"
            />
          </div>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Close</Button>
          </ModalClose>
          <Button>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Add React import for controlled example
import * as React from "react";
