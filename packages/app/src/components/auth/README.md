# Authentication Components

This directory contains components and hooks for handling authentication in the Skills Evaluation App.

## Components

### AuthProvider

The `AuthProvider` component wraps the application with NextAuth's `SessionProvider` and provides authentication context.

```tsx
import { AuthProvider } from "@/components/auth";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### GoogleLogin

The `GoogleLogin` component provides a button for authenticating with Google OAuth.

```tsx
import { GoogleLogin } from "@/components/auth";

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <GoogleLogin callbackUrl="/dashboard" />
    </div>
  );
}
```

### AuthCallback

The `AuthCallback` component handles the OAuth callback process and redirects users after successful authentication.

```tsx
import { AuthCallback } from "@/components/auth";

export default function CallbackPage() {
  return <AuthCallback defaultRedirect="/dashboard" />;
}
```

## Hooks

### useAuth

The `useAuth` hook provides easy access to authentication state throughout the application.

```tsx
import { useAuth } from "@/components/auth";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please sign in</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

## Environment Variables

The following environment variables are required for authentication:

```
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_key_32_chars_minimum
NEXTAUTH_URL_DEV=http://localhost:3000
```

## Setting Up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add "http://localhost:3000" to the "Authorized JavaScript origins"
7. Add "http://localhost:3000/api/auth/callback/google" to the "Authorized redirect URIs"
8. Click "Create" and note your Client ID and Client Secret
9. Add these values to your `.env.local` file

## Authentication Flow

1. User clicks the Google Login button
2. User is redirected to Google's OAuth consent screen
3. After granting permission, Google redirects back to our callback URL
4. NextAuth handles the token exchange and creates a session
5. User is redirected to the dashboard or specified callback URL
