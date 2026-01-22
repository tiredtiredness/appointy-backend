import { object, string } from "yup";

const tagSchema = object({
  name: string()
    .max(100, "Name must not exceed 100 characters")
    .min(2, "Name must be at least 2 characters")
    .required(),
});

export const createTagSchema = tagSchema;

export const updateTagSchema = tagSchema;
