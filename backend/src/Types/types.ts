import { password } from 'bun'
import z, { email } from 'zod'
export enum Role{
    Admin,
    Employee
}
export const user=z.object({
    username:z.string(),
    email:z.email(),
    password:z.string(),
    role:Role
})