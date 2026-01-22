import { mixed, object, string } from "yup";

import { notEmptyObject } from "@/utils/yup-helpers";

export const createClientSchema = object({
  city: string().required(),
});

export const updateClientSchema = notEmptyObject(
  object({
    city: string(),
    onboardingStep: mixed<"BASE" | "INTERESTS">().oneOf(["BASE", "INTERESTS"]),
  }),
);
