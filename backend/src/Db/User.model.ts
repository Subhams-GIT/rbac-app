import mongoose, { Model, model, Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import type { User, Usermethods} from "@Types/types";
const user=new mongoose.Schema<User, mongoose.Model<User, {}, Usermethods>, Usermethods>({
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
    refreshtoken:{type:String},
    password:{type:String,required:true},
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

user.method("generateAccessToken", function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.SECRET!,
    { expiresIn: "1h" }
  );
});


user.method('generateRefreshToken',function (){
    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_SECRET!,{
        expiresIn:'180d'
    })
})

export const admins=model('Admins',admin);
export const nonAdmins=model('NonAdmin',nonAdmin);
export const userModal=model<User, mongoose.Model<User, {}, Usermethods>>('User',user);