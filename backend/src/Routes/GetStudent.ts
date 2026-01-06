import { userModal } from '@db/User.model';
import e, { type Request, type Response } from 'express'
export const Router=e.Router();


Router.get('/getusers',(req:Request,res:Response)=>{
    const user=req.user;
  
})

