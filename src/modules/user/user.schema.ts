import { object, string } from "yup";

export const createUserSchema = object({
  body: object({
    username: string()
      .required("Username is required")
      .max(30, "Username must not exceed 30 characters"),
    email: string().required().email(),
    password: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    phone: string()
      .required("Phone number is required")
      .max(15, "Phone number must not exceed 15 characters"),
    firstName: string()
      .required("First name is required")
      .max(100, "First name must not exceed 100 characters"),
    lastName: string()
      .required("Last name is required")
      .max(100, "Last name must not exceed 100 characters"),
    middleName: string().max(100, "Middle name must not exceed 100 characters"),
    avatarUrl: string().url(),
  }),
});

export const updateUserSchema = object({
  body: object({
    username: string().max(30, "Username must not exceed 30 characters"),
    email: string().email(),
    password: string().min(6, "Password must be at least 6 characters"),
    phone: string().max(15, "Phone number must not exceed 15 characters"),
    firstName: string().max(100, "First name must not exceed 100 characters"),
    lastName: string().max(100, "Last name must not exceed 100 characters"),
    middleName: string().max(100, "Middle name must not exceed 100 characters"),
    avatarUrl: string().url(),
  }),
});
