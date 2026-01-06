import { UserError } from "@Types/Error";
import type { NextFunction, Request } from "express";

export default function adminMiddleware(req:Request,next:NextFunction){
    try {
        const role=req.user.role

        if(role!='admin'){
            throw  new UserError({name:"ACCESS_DENIED",message:'cannot access protected resource',cause:'Not enough Permissions'})
        }
        next();
    } catch (error) {
        return error;
    }
}