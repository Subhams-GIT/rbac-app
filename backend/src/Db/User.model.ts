import mongoose, { model, Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import type { User, Usermethods } from "@Types/types";
const user = new Schema<User, mongoose.Model<User, {}, Usermethods>, Usermethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  active:{
    type:Boolean,
    required:true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  refreshToken: {
    type: String,
  },
  orgEmail:{
    type:String,
    required:true
  }
});


const NonAdmin = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    AdminIds:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }],
    
})

user.method("generateAccessToken", function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.SECRET!,
    { expiresIn: "1h" }
  );
});


user.method('generateRefreshToken', function () {
    return jwt.sign({
        _id: this._id,
        role:this.role
    }, process.env.REFRESH_SECRET!, {
        expiresIn:'15552000'
    })
})


export const Users = model('NonAdmin', NonAdmin);
export const userModal = model<User, mongoose.Model<User, {}, Usermethods>>('User', user);


/*


*/