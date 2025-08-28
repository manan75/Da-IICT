import { z } from 'zod';

export const SignUpSchema = z.object({
   email: z.email("Invalid email format"),
   password: z.string().min(6, "Password must be at least 6 characters"),
   name: z.string().min(2, "Name must be at least 2 characters"),
});

export const LoginSchema = z.object({
   email: z.email("Invalid email format"),
   password: z.string().min(6, "Password must be at least 6 characters")
});