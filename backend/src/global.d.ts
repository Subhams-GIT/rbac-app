import type { request } from "express";
import { Request } from "express";
declare module "Request"{
    export const id:string 
}