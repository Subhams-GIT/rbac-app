// import { userModal } from "@db/User.model";
import { userModal } from "@db/User.model";
import Express, { type Request, type Response }  from "express";
import mongoose from "mongoose";
export const SessionRouter=Express.Router();

SessionRouter.get('/session',async (req:Request,res:Response)=>{
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthenticated" });
      }
      console.log({user:req.user})
      // const user=await userModal.findOne({_id:req.user._id});
      const userId = new mongoose.Types.ObjectId(req.user._id);
      if(req.user.role=='admin'){
      const adminData=await userModal.findOne({
        
      })
      res.status(200).json({ user:req.user,users:adminData });
    }
    res.status(200).json({ user:req.user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
})