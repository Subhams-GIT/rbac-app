import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../axios";


export type user={
    session:any;
    loading:boolean;
    fetchSession:()=>Promise<void>
}
export const AuthContex=createContext<user|null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }){
    const [session,setsession]=useState<user|null>();
    const [loading,setloading]=useState(true);

    const fetchSession=async ()=>{
        try {
            const session=await instance.get('/session');
            setsession(session.data)
        } catch (error) {
            setsession(null);            
        }
        finally{
            setloading(false);
        }

    }

    useEffect(()=>{
        fetchSession();
    },[])

    return <AuthContex.Provider value={{session,loading,fetchSession}}>
        {children}
    </AuthContex.Provider>

}

export const useAuth=():user|null=>{
    const ctx=useContext(AuthContex)
    return ctx;
}