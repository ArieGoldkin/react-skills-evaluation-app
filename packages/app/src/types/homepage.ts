/**
 * TypeScript interfaces for the Google Login Homepage
 */

// Main homepage component props
export interface HomePageProps {
  className?: string;
}

// Homepage state management
export interface HomePageState {
  isLoading: boolean;
  authError: string | null;
  isRedirecting: boolean;
}

// Note: AuthError and AuthState are now defined in ./auth.ts

// Feature item for features section
export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  comingSoon?: boolean;
}

// Hero section component props
export interface HeroSectionProps {
  onSignIn?: () => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

// Features section component props
export interface FeaturesSectionProps {
  features: FeatureItem[];
  className?: string;
}

// Google Sign-in button props (for future implementation)
export interface GoogleSignInButtonProps {
  onClick?: () => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Authentication handler props (for future implementation)
export interface AuthenticationHandlerProps {
  children: React.ReactNode;
  redirectTo?: string;
  loadingComponent?: React.ComponentType;
}
