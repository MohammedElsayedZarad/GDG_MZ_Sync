import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    region: z.string().min(2, 'Region is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export const verifyEmailOtpSchema = z.object({
    email: z.string().email('Invalid email address'),
    token: z.string().length(6, 'OTP must be 6 digits'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type VerifyEmailOtpInput = z.infer<typeof verifyEmailOtpSchema>

