
import { z } from 'zod'
export enum Role {
    Admin = "Admin",
    Employee = "Employee"
}
export const TypeRole = Object.values(Role) as String[];
export const user = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(8).max(16),
    role:z.enum(["admin","user"]),
    refreshToken:z.string().optional()
})
export const signUp=z.object({
    username:z.string(),
    email:z.email(),
    password:z.string(),
    adminEmail:z.email().optional()
})
export const signIn = z.object({
    email: z.email(),
    password: z.string().min(8).max(16)
})
export interface Usermethods {
    generateAccessToken(): string,
    generateRefreshToken(): string
}

export type User = z.infer<typeof user> & { refreshtoken: string }