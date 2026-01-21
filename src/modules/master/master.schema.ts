import { array, mixed, number, object, string } from "yup";

const workFormatsSchema = array()
  .of(mixed<"PLACE" | "VISIT">().oneOf(["PLACE", "VISIT"]))
  .min(1, "At least one work format must be selected")
  .required();

export const createMasterSchema = object({
  body: object({
    userId: string(),
    address: string(),
    shortBio: string(),
    longBio: string(),
    careerStartYear: number().integer().min(1900).max(new Date().getFullYear()).required(),
    educationBio: string(),
    workStyleBio: string(),
    workFormats: workFormatsSchema,
    city: string().required(),
  }),
});

export const updateMasterSchema = object({
  body: object({
    address: string(),
    shortBio: string(),
    longBio: string(),
    careerStartYear: number().integer().min(1900).max(new Date().getFullYear()),
    educationBio: string(),
    workStyleBio: string(),
    workFormats: workFormatsSchema.optional(),
    onboardingStep: mixed<"BASE" | "WORKPLACE" | "ABOUT" | "RULES">().oneOf([
      "BASE",
      "WORKPLACE",
      "ABOUT",
      "RULES",
    ]),
    city: string(),
  }),
});
