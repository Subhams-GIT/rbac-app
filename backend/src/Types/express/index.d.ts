import type { User } from "../types"

declare global {
  namespace Express {
    export interface Request {
      user: {
        email:string,
        username:string
        role:string,
        active:boolean
      };
    }
  }
}