import { z } from "zod";
import { passwordSchema } from "./shared";

export const AccountFormSchema = z
  .object({
    displayName: z.string({ required_error: "Display name is required" }).trim().min(1, "Display name is required"),
    currentPassword: passwordSchema.describe("Current password"),
    newPassword: passwordSchema.describe("New password"),
    confirmPassword: z.string({ required_error: "Please confirm new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type AccountFormData = z.infer<typeof AccountFormSchema>;
