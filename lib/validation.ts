import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(3, "Password is required"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
    username: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });


export type RegisterFormData = z.infer<typeof RegisterSchema>;



export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});


export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;