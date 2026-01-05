
import { instance } from "../../axios"
interface signinProps{
    email:string,
    password:string,
    role:string
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
    static signup(){
      
    }
}
