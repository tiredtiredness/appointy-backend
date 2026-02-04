import { boolean, number, object, string } from "yup";

export const createServiceSchema = object({
  categoryId: string().optional(),
  name: string().max(100, "Name must not exceed 100 characters").required(),
  description: string().optional(),
  duration: number().required(),
  price: number().required(),
  isActive: boolean().optional().default(false),
  imageUrl: string().optional(),
});

export const updateServiceSchema = object({
  categoryId: string().optional(),
  name: string().optional().max(100, "Name must not exceed 100 characters"),
  description: string().optional(),
  duration: number().optional(),
  price: number().optional(),
  isActive: boolean().optional(),
  imageUrl: string().optional(),
});
