import { object, string } from "yup";

export const registerSchema = object({
  username: string()
    .required("Username is required")
    .max(30, "Username must not exceed 30 characters"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = object({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});
