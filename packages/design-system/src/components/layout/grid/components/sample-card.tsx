export const SampleCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div className="p-4 bg-card border rounded-lg">
    <h3 className="font-semibold text-card-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{content}</p>
    <div className="mt-3">
      <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90">
        Learn More
      </button>
    </div>
  </div>
);
