interface CourseCardProps {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

export const CourseCard = ({ title, level, duration }: CourseCardProps) => (
  <div className="p-6 bg-card border rounded-lg">
    <div className="flex items-center justify-between mb-3">
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          level === "Beginner"
            ? "bg-accent-50 text-accent-900"
            : level === "Intermediate"
              ? "bg-primary-50 text-primary-900"
              : "bg-secondary-100 text-secondary-900"
        }`}
      >
        {level}
      </span>
      <span className="text-xs text-muted-foreground">{duration}</span>
    </div>
    <h3 className="font-semibold text-card-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm mb-4">
      Master the skills needed for {title.toLowerCase()} with hands-on exercises
      and real-world projects.
    </p>
    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
      Start Course
    </button>
  </div>
);
