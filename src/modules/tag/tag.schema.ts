import { object, string } from "yup";

export const createTagSchema = object({
  body: object({
    name: string().max(100, "Name must not exceed 100 characters"),
  }),
});
