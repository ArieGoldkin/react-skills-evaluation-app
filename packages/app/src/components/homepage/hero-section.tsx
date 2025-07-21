"use client";

import React from "react";

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

export const HeroSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Skills Evaluation App
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Analyze and improve your professional skills with AI-powered insights
          and personalized recommendations.
        </p>
      </div>

      {/* Key Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Key Features</h2>
        <div className="space-y-4">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-sm rounded-xl p-6 bg-card/80 text-card-foreground border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
