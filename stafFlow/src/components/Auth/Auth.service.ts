
import { instance } from "../../axios"
interface signinProps{
    email:string,
    password:string,
    role:string
}

interface signupProps extends signinProps{
    username:string,
    adminEmail?:string
}

export class AuthService{
    static async login({email,password,role}:signinProps){
      console.log({email,password,role})
      try {
        const user=await instance.post(`/signIn/${role}`,{
          email,
          password
        })
        return user.data;
      } catch (error) {
          return error;        
      }
    }
    static async signup({email,password,username,role,adminEmail}:signupProps){
      try {
        const new_user=await instance.post(`/signup/${role}`,{
          email,
          username,
          password,
          adminEmail
        })
        return new_user;
      } catch (error) {
        throw error;
      }
    }
}
