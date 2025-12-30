import e, { type Request, type Response } from 'express'
import { user } from '@Types/types';
const Router=e.Router();

Router.post('/signup',(req:Request,res:Response)=>{
    const {username,password,email}=req.body;

   const {data,error}= user.safeParse(req.body);
   if(error){
    
   }
})