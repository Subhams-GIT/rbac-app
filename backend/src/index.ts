import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { Router } from '@Routes/signup';
import mongoose from 'mongoose';
import {signinRouter} from '@Routes/signin'
import { middleware } from 'middleware';
import parser from 'cookie-parser'
import rateLimit from 'express-rate-limit';
import { updateRouter } from '@Routes/update';
import { SessionRouter } from '@Routes/session';
import { logOutRouter } from '@Routes/logOut';
const app=express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.set('trust proxy',1)
// app.use(limiter);
app.use(parser())
app.use(
  session({
    name: "sid",
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,    
      sameSite: "lax",
    },
  })
);


async function main(){
    try {
        await mongoose.connect(process.env.DATABASE_URL!,{maxPoolSize:10,maxConnecting:100})
        console.log('db connected')  
    } catch (error) {
        console.error(error)
    }
}
main()
app.use(express.json())
app.use('/api/v1',Router)
app.use('/api/v1',signinRouter)

app.use('/api/v1',middleware,updateRouter)
app.use('/api/v1',middleware,SessionRouter)
app.use('/api/v1',middleware,logOutRouter)
app.use('/api/v1',middleware,)
app.listen(8000,()=>{
    console.log(`App listening at port 8000`)
})
