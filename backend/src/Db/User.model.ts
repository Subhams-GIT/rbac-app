import mongoose, { Model, Schema } from "mongoose";
import { Role } from "@Types/types";

const user=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{type:String,required:true},
    role:Role
})

const admin=new mongoose.Schema({
    id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
const nonAdmin=new mongoose.Schema({
    id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
export const admins=new Model('Admins',admin);
export const nonAdmins=new Model('NonAdmin',nonAdmin);
export const userModal=new Model('User',user);