import { mixed, object, string } from "yup";

export const createClientSchema = object({
  body: object({
    userId: string(),
    city: string().required(),
  }),
});

export const updateClientSchema = object({
  body: object({
    city: string(),
    onboardingStep: mixed<"BASE" | "INTERESTS">().oneOf(["BASE", "INTERESTS"]),
  }),
});
