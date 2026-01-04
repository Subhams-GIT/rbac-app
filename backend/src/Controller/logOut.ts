import type { Request, Response } from "express";

export default function logOut(req:Request,res:Response){

    res.clearCookie('access_token').json({
        sucess:true,
        message:'logged Out'
    })
}