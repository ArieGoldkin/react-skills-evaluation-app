"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useCategories } from "@/hooks/queries/use-categories";
import { skillSchema, type SkillFormData } from "@/lib/validations/skills";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoadingSpinner,
  MultiSelect,
  RichTextEditor,
} from "@skills-eval/design-system";
import { useForm } from "react-hook-form";

interface SkillFormProps {
  defaultValues?: Partial<SkillFormData>;
  onSubmit: (data: SkillFormData) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function SkillForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save",
}: SkillFormProps) {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const categories = categoriesData?.categories || [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      proficiency: 5,
      ...defaultValues,
    },
  });

  const watchedProficiency = watch(
    "proficiency",
    defaultValues?.proficiency || 5
  );
  const watchedTags = watch("tags", defaultValues?.tags || []);

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  const availableTags = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Testing",
    "Security",
    "Performance",
    "Architecture",
    "Mobile",
    "Cloud",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="e.g., React, TypeScript, Docker"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Category *</Label>
        <Select
          value={watch("categoryId")}
          onValueChange={value => setValue("categoryId", value)}
          disabled={isSubmitting}
        >
          <SelectTrigger id="categoryId">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p className="text-sm text-destructive">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <RichTextEditor
          value={watch("description") || ""}
          onChange={value => setValue("description", value)}
          placeholder="Describe your experience and knowledge with this skill..."
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="proficiency">
          Proficiency Level: {watchedProficiency}/10
        </Label>
        <Slider
          id="proficiency"
          min={1}
          max={10}
          step={1}
          value={[watchedProficiency]}
          onValueChange={([value]) => setValue("proficiency", value || 5)}
          disabled={isSubmitting}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Expert</span>
        </div>
        {errors.proficiency && (
          <p className="text-sm text-destructive">
            {errors.proficiency.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
        <Input
          id="yearsOfExperience"
          type="number"
          step="0.5"
          min="0"
          {...register("yearsOfExperience", { valueAsNumber: true })}
          placeholder="e.g., 2.5"
          disabled={isSubmitting}
        />
        {errors.yearsOfExperience && (
          <p className="text-sm text-destructive">
            {errors.yearsOfExperience.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <MultiSelect
          options={availableTags.map(tag => ({ value: tag, label: tag }))}
          value={watchedTags || []}
          onChange={selected => setValue("tags", selected)}
          placeholder="Select tags..."
          disabled={isSubmitting}
        />
        {errors.tags && (
          <p className="text-sm text-destructive">{errors.tags.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <RichTextEditor
          value={watch("notes") || ""}
          onChange={value => setValue("notes", value)}
          placeholder="Any additional information about this skill..."
          disabled={isSubmitting}
        />
        {errors.notes && (
          <p className="text-sm text-destructive">{errors.notes.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <LoadingSpinner size="sm" className="mr-2" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
