import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { Router } from '@Routes/signup';
import mongoose from 'mongoose';
import {signinRouter} from '@Routes/signin'
import { middleware } from 'middleware';
import parser from 'cookie-parser'
import { parse } from 'node:path';
const app=express();
async function main(){
    try {
        await mongoose.connect(process.env.DATABASE_URL!,{maxPoolSize:10,maxConnecting:100})
        console.log('db connected')  
    } catch (error) {
        console.error(error)
    }
}
main()
app.use(parser())
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET!
}))

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use('/api/v1',Router)
app.use('/api/v1',middleware,signinRouter)
app.listen(3000,()=>{
    console.log(`App listening at port 3000`)
})