import e, { type Request, type Response } from 'express'
import { OrgSchema, signUp, user, type User } from '@Types/types';
import { UserError } from '@Types/Error';
import { organisations, userModal, Users } from '@db/User.model';
import bcrypt from 'bcrypt'
import c from 'crypto'
import { middleware } from 'middleware';
const passwordRegex =/^(?=(?:.*[A-Z]){2,})(?=(?:.*\d){2,})(?=(?:.*[a-z]){3,})(?=.*[!@#$&*]).{8,}$/;
export const Router = e.Router();

Router.post("/upgrade/admin", middleware,async (req, res) => {
    try {
        const token=req.body.token;
        if(!token){
            res.json({
                message:'not allowed'
            })
        }
        const user=await userModal.findById({email:req.user.email}) 
        if(!user){
            return ;
        }
        user.role='admin'
        await user.save();
        res.json(
            {
                message:'role updated sucessfully'
            }
        )
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

        const { username, password, email,orgEmail} = parsed.data;
       
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

        const org=await userModal.findOne({email:orgEmail})
        if(!org){
            return 
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await userModal.create({
            username,
            email,
            password: passwordHash,
            active:true,
            role:'user',
            orgEmail
       });

        await Users.create({
            _id:newUser._id,
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


Router.post('/org',async (req:Request,res:Response)=>{
    try {
        const parsed=OrgSchema.safeParse(req.body());
        if(parsed.error){
            throw new UserError({name:'SIGNUP_ERROR',message:'signup error',cause:"wrong org email"})
        }
        const {email}=parsed.data;
        const orgToken=crypto.randomUUID();
        const org=await organisations.create({
            orgEmail:email,
            token:orgToken
        })

        res.json({
            message:"org created",
            orgtoken:org.token
        })
    } catch (error) {
        return error
    }
})