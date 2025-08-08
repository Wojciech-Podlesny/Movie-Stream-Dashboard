import { z } from "zod";
import { emailSchema } from "./shared";

export const LoginSchema = z.object({
  email: emailSchema,
  password: z.string({ required_error: "Password is required" }).min(3, "Password is required"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
