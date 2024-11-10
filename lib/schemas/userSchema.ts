import { z } from "zod";
import { propertySchema, myTaskSchema, categorySchema, subcategorySchema } from "@/app/(protected)/service-provider/tasks/data/schema"; // Importación solo si realmente es necesaria

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastname: z.string(),
  username: z.string().optional(),
  email: z.string(),
  role: z.string(),
  isActive: z.string(),
  address: z.string().optional(),
  phone: z.string().optional(),
  tasks: myTaskSchema.optional(),
  categories: categorySchema.optional(),
  subcategories: subcategorySchema.optional(),
  properties: propertySchema.optional(), // Relación con `propertySchema`
  statusAccount: z.string().optional(),
  emailVerified: z.string().optional(),
});

export type UserType = z.infer<typeof userSchema>;