export type AuthMode = "signin" | "signup";

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export interface AuthErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  general?: string;
}
