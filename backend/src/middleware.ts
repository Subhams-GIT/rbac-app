import { UserError } from "@Types/Error";
import type { NextFunction, Request, Response } from "express";
import Jwt  from "jsonwebtoken";
export async function middleware(req:Request,res:Response,next:NextFunction){
    console.log(req.cookies)
    // console.log(req.cookies)
    try {     
        const id=req.cookies["access_token"];
        if(!id){
            throw new UserError({name:'SESSION_ERROR',message:'unauthenticated',cause:'token not present'})
        }
        const decoded=Jwt.verify(id,process.env.SECRET!)
        console.log(decoded)
        if(decoded===null){
            throw new UserError({name:'SESSION_ERROR',message:'unauthenticated',cause:'token malformed'})
        }
        next();
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}