import e, { type Request, type Response } from 'express'
import { signIn, user } from '@Types/types';
import { UserError } from '@Types/Error';
import { admins, userModal } from '@db/User.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const passwordRegex = new RegExp('/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$\'')
export const signinRouter = e.Router();

signinRouter.post('/signIn/admin', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { password, email } = req.body;
        const { error } = signIn.safeParse(req.body);
        if (error) {
            throw new UserError({ name: 'SIGNIN_ERROR', message: error.message, cause: error.cause as string })
        }
        const user = await userModal.findOne({email})

        if (!user) {
            throw new UserError({ name: "SIGNIN_ERROR", message: "Wrong email or password", cause: "Wrong Email or Password" });
        }
        const isPasswordSame = bcrypt.compareSync(password, user.password);
        if (!isPasswordSame) {
            throw new UserError({ name: "SIGNIN_ERROR", message: "Wrong credentials", cause: "Password doesnot match" });
        }
        
        user.generateAccessToken()
        return res.status(200).json({
            message:"signed in sucessfully"
        })

    } catch (error: any | UserError) {
        console.log(error)
        res.status(500).json({
            message: error,
        })
    }
})