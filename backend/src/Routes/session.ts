import { userModal } from "@db/User.model";
import Express, { type Request, type Response }  from "express";
export const SessionRouter=Express.Router();

SessionRouter.get('/session',async (req:Request,res:Response)=>{
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthenticated" });
      }

      res.status(200).json({ user:req.user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }

})