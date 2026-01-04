// import { userModal } from '@db/User.model';
import e, { type Request, type Response } from 'express'
export const updateRouter=e.Router();

updateRouter.patch('/update', async (req:Request,res:Response)=>{
    const updates=req.body;
    const user=req.user;
    for (const key in updates){
        if(key!=undefined){
            user[key]=key;
        }
    }
    try {
        await user.save();
    } catch (error) {
        console.error(error);
        return ;
    }
})