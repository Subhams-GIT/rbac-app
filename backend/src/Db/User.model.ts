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
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  refreshToken: {
    type: String,
  },
});


const nonAdmin = new mongoose.Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    adminId:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    active:{
        type:Boolean,
        ref:'User'
    }
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
        expiresIn: '180d'
    })
})

export const nonAdmins = model('NonAdmin', nonAdmin);
export const userModal = model<User, mongoose.Model<User, {}, Usermethods>>('User', user);