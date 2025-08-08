import { z } from "zod";
import { emailSchema } from "./shared";

export const ForgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
