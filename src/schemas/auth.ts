import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Full Name must contain at least 2 characters." })
      .max(50, { message: "Name must not exceed 50 characters." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please introduce a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
      .regex(/[0-9]/, { message: "Password must contain at least one numerical digit." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Security tokens do not match.",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;