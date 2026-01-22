import { object, string } from "yup";

import { notEmptyObject } from "@/utils/yup-helpers";

export const createUserSchema = object({
  email: string().email(),
  phone: string().max(15, "Phone number must not exceed 15 characters"),
  firstName: string().max(100, "First name must not exceed 100 characters"),
  lastName: string().max(100, "Last name must not exceed 100 characters"),
  middleName: string().max(100, "Middle name must not exceed 100 characters"),
  avatarUrl: string().url(),
});

export const updateUserSchema = notEmptyObject(
  object({
    username: string()
      .max(30, "Username must not exceed 30 characters")
      .min(5, "Username must be at least 5 characters"),
    email: string().email().trim().nonNullable(),
    phone: string().max(15, "Phone number must not exceed 15 characters"),
    firstName: string().max(100, "First name must not exceed 100 characters"),
    lastName: string().max(100, "Last name must not exceed 100 characters"),
    middleName: string().max(100, "Middle name must not exceed 100 characters"),
    avatarUrl: string().url(),
  }),
);
