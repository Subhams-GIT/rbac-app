import type { User } from "../types"

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}