
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
    generateAccessToken(role:string): string,
    generateRefreshToken(role:string): string
}

export type User = z.infer<typeof user> & { refreshtoken: string }