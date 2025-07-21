export const formatLastAssessed = (date: string | Date | undefined): string => {
  if (!date) return "Never assessed";

  const assessedDate = new Date(date);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - assessedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;

  return assessedDate.toLocaleDateString();
};
