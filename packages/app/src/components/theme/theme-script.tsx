export function ThemeScript() {
  const script = `
    try {
      const theme = localStorage.getItem('skills-eval-theme') || 'system';
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const resolvedTheme = theme === 'system' ? systemTheme : theme;
      document.documentElement.classList.add(resolvedTheme);
    } catch (e) {}
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}