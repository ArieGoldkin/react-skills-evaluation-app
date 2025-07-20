import { GoogleSignInButton } from "@/components/auth/google-signin-button";
import type { HomePageProps } from "@/types/homepage";
import type { Metadata } from "next";

// Metadata for the homepage
export const metadata: Metadata = {
  title: "Skills Evaluation App - Analyze and Improve Your Skills",
  description:
    "A modern application that evaluates your skills through multiple data sources including personal information, Git repository analysis, and Google account integration. Get personalized AI-powered recommendations to advance your career.",
  keywords: [
    "skills evaluation",
    "career development",
    "AI recommendations",
    "skill analysis",
    "professional growth",
  ],
  authors: [{ name: "Skills Evaluation Team" }],
  openGraph: {
    title: "Skills Evaluation App - Analyze and Improve Your Skills",
    description:
      "Get personalized skill assessments and AI-powered recommendations to advance your career.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills Evaluation App - Analyze and Improve Your Skills",
    description:
      "Get personalized skill assessments and AI-powered recommendations to advance your career.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

// Feature data - extracted for better maintainability
const FEATURES = [
  {
    title: "Skills Analysis",
    description:
      "Comprehensive evaluation of your technical and professional skills",
  },
  {
    title: "AI Recommendations",
    description: "Personalized suggestions to improve and advance your career",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your skill development over time with detailed analytics",
  },
] as const;

// Hero Section Component
function HeroSection() {
  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1
            id="hero-heading"
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Skills Evaluation App
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Analyze and improve your professional skills with AI-powered
            insights and personalized recommendations.
          </p>

          {/* Google Sign-in Button */}
          <div className="flex justify-center mb-12">
            <GoogleSignInButton
              className="text-lg px-8 py-4"
              callbackUrl="/dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section Component
function FeaturesSection() {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="features-heading"
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          Key Features
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
              <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
                Feature components will be implemented in upcoming tasks
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ className }: HomePageProps) {
  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 ${className || ""}`}
      role="main"
      aria-label="Skills Evaluation App Homepage"
    >
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
