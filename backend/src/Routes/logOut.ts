import logOut from "@Controller/logOut";
import Express  from "express";
export const logOutRouter=Express.Router();

logOutRouter.post('/logout',logOut)