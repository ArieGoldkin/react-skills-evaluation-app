import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Skills Evaluation App
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          A React 19-based application that evaluates user skills through
          multiple data sources including personal information, Git repository
          analysis, and Google account integration.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Project Foundation Ready
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">
                Tech Stack:
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✅ Next.js 15 with App Router</li>
                <li>✅ React 19</li>
                <li>✅ TypeScript</li>
                <li>✅ Tailwind CSS</li>
                <li>✅ TanStack Query</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">
                Project Structure:
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✅ Components directory</li>
                <li>✅ Hooks with queries</li>
                <li>✅ API layer setup</li>
                <li>✅ Types & utilities</li>
                <li>✅ Barrel exports</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        <p className="text-gray-500 dark:text-gray-400">
          Ready for development! Development environment and tooling configured
          ✅
        </p>
      </div>
    </div>
  );
}
