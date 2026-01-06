import e, { type Request, type Response } from 'express'
import { signUp, user, type User } from '@Types/types';
import { UserError } from '@Types/Error';
import { userModal, Users } from '@db/User.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const passwordRegex =/^(?=(?:.*[A-Z]){2,})(?=(?:.*\d){2,})(?=(?:.*[a-z]){3,})(?=.*[!@#$&*]).{8,}$/;
export const Router = e.Router();

Router.post("/signup/admin", async (req, res) => {
    try {
        const parsed = signUp.safeParse(req.body);
        console.log(parsed)
        if (!parsed.success) {
            throw new UserError({
                name: "SIGNUP_ERROR",
                message: parsed.error.message,
                cause: "VALIDATION_ERROR",
            });
        }

        const { username, password, email } = parsed.data;

        if (await userModal.findOne({ email })) {
            throw new UserError({
                name: "SIGNUP_ERROR",
                message: "User already exists",
                cause: "DUPLICATE_EMAIL",
            });
        }

        if (!passwordRegex.test(password)) {
            throw new UserError({
                name: "SIGNUP_ERROR",
                message: "Weak password",
                cause: "PASSWORD_RULES",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const admin=await userModal.create({
            username,
            email,
            password: passwordHash,
            role:'admin',
            active:true
        });

        res
            .status(201)
            .json({ message: "signup successful"});
    } catch (error) {
        console.error(error)
        if (error instanceof UserError) {
            res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});


Router.post('/signup/user', async (req: Request, res: Response) => {
   try {
        const parsed = signUp.safeParse(req.body);
        if (!parsed.success) {
            throw new UserError({
                name: "SIGNUP_ERROR",
                message: parsed.error.message,
                cause: "VALIDATION_ERROR",
            });
        }

        const { username, password, email ,adminEmail} = parsed.data;
        if(!adminEmail){
            throw new UserError({name:'SIGNUP_ERROR',message:'please provide an Admin Email',cause:'admin Email not found'})
        }
        if (await userModal.findOne({ email })) {
            throw new UserError({
                name: "SIGNUP_ERROR",
                message: "User already exists",
                cause: "DUPLICATE_EMAIL",
            });
        }

        if (!passwordRegex.test(password)) {
            throw new UserError({
                name: "SIGNUP_ERROR",
                message: "Weak password",
                cause: "PASSWORD_RULES",
            });
        }
        const admin=await userModal.findOne({email:adminEmail})
        if(!admin){
            return 
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await userModal.create({
            username,
            email,
            password: passwordHash,
            active:true,
            role:'user',
       });

        await Users.findByIdAndUpdate({
            _id:newUser._id
        },{
            $push:{AdminIds:admin._id}
        })

        res
            .status(201)
            .json({ message: "signup successful"});
    } catch (error) {
        if (error instanceof UserError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
})