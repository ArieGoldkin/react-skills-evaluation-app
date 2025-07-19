import { GoogleLogin } from "@/components/auth/google-login";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Welcome to Skills Evaluation
            </h1>
            <p className="mb-8 text-sm text-gray-600">
              Sign in to analyze your coding skills and get personalized
              recommendations
            </p>

            <div className="space-y-4">
              <GoogleLogin className="w-full" />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    By signing in, you agree to our terms of service
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
