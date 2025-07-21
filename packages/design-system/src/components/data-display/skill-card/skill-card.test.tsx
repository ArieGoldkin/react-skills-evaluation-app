import { fireEvent, render, screen } from "@testing-library/react";
import { SkillCard, type SkillCardProps } from "./skill-card";

const mockSkill: SkillCardProps["skill"] = {
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

const renderSkillCard = (props: Partial<SkillCardProps> = {}) => {
  return render(<SkillCard skill={mockSkill} {...props} />);
};

describe("SkillCard", () => {
  it("renders skill information correctly", () => {
    renderSkillCard();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(
      screen.getByText("Component-based JavaScript library")
    ).toBeInTheDocument();
    expect(screen.getByText("8/10")).toBeInTheDocument();
    expect(screen.getByText("Advanced+")).toBeInTheDocument();
  });

  it("displays tags correctly", () => {
    renderSkillCard();

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("UI")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
  });

  it("shows verified badge when skill is verified", () => {
    renderSkillCard({
      skill: { ...mockSkill, verified: true },
    });

    const verifiedIcon = screen.getByLabelText("Verified skill");
    expect(verifiedIcon).toBeInTheDocument();
  });

  it("hides description when showDescription is false", () => {
    renderSkillCard({ showDescription: false });

    expect(
      screen.queryByText("Component-based JavaScript library")
    ).not.toBeInTheDocument();
  });

  it("hides tags when showTags is false", () => {
    renderSkillCard({ showTags: false });

    expect(screen.queryByText("JavaScript")).not.toBeInTheDocument();
    expect(screen.queryByText("UI")).not.toBeInTheDocument();
  });

  it("hides actions when showActions is false", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    renderSkillCard({
      showActions: false,
      onEdit,
      onDelete,
    });

    expect(screen.queryByLabelText("Edit skill")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Delete skill")).not.toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();

    renderSkillCard({ onEdit });

    const editButton = screen.getByLabelText("Edit skill");
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();

    renderSkillCard({ onDelete });

    const deleteButton = screen.getByLabelText("Delete skill");
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("calls onClick when card is clicked and interactive is true", () => {
    const onClick = vi.fn();

    renderSkillCard({ onClick, interactive: true });

    const card = screen.getByText("React").closest("div");
    fireEvent.click(card!);

    expect(onClick).toHaveBeenCalled();
  });

  it("stops propagation when action buttons are clicked", () => {
    const onEdit = vi.fn();
    const onClick = vi.fn();

    renderSkillCard({ onEdit, onClick, interactive: true });

    const editButton = screen.getByLabelText("Edit skill");
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith("1");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("displays proficiency indicator correctly", () => {
    renderSkillCard();

    expect(screen.getByText("8/10")).toBeInTheDocument();
    expect(screen.getByText("Advanced+")).toBeInTheDocument();
  });

  it("shows source badge for non-manual sources", () => {
    renderSkillCard({
      skill: { ...mockSkill, source: "GITHUB" },
    });

    expect(screen.getByText("github")).toBeInTheDocument();
  });

  it("hides source badge for manual sources", () => {
    renderSkillCard({
      skill: { ...mockSkill, source: "MANUAL" },
    });

    expect(screen.queryByText("manual")).not.toBeInTheDocument();
  });

  it("displays last assessed date correctly", () => {
    renderSkillCard({
      skill: { ...mockSkill, lastAssessed: "2024-01-15" },
    });

    expect(screen.getByText(/Last assessed:/)).toBeInTheDocument();
  });

  it("shows 'Never assessed' when no lastAssessed date", () => {
    renderSkillCard({
      skill: { ...mockSkill, lastAssessed: undefined },
    });

    expect(
      screen.getByText("Last assessed: Never assessed")
    ).toBeInTheDocument();
  });

  it("limits tags display to 3 and shows count for remaining", () => {
    renderSkillCard({
      skill: {
        ...mockSkill,
        tags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
      },
    });

    expect(screen.getByText("Tag1")).toBeInTheDocument();
    expect(screen.getByText("Tag2")).toBeInTheDocument();
    expect(screen.getByText("Tag3")).toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
    expect(screen.queryByText("Tag4")).not.toBeInTheDocument();
    expect(screen.queryByText("Tag5")).not.toBeInTheDocument();
  });

  it("applies correct variant based on verification status", () => {
    const { container } = renderSkillCard({
      skill: { ...mockSkill, verified: true },
    });

    const card = container.firstChild as HTMLElement;
    expect(card?.className).toContain("border-green-200");
  });

  it("applies compact size correctly", () => {
    const { container } = renderSkillCard({ size: "compact" });

    const card = container.firstChild as HTMLElement;
    expect(card?.className).toContain("p-3");
  });

  it("applies detailed size correctly", () => {
    const { container } = renderSkillCard({ size: "detailed" });

    const card = container.firstChild as HTMLElement;
    expect(card?.className).toContain("p-6");
  });
});
