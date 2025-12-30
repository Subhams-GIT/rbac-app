import express from 'express'
import session from 'express-session'
import cors from 'cors'
const app=express();

app.use(session())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

