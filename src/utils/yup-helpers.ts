import { ObjectSchema } from "yup";

export function notEmptyObject<T extends object>(
  schema: ObjectSchema<T>,
  message = "At least one field must be provided",
) {
  return schema.test("not-empty", message, value => value != null && Object.keys(value).length > 0);
}
