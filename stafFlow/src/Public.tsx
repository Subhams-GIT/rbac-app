import React from 'react'
import { useAuth} from './Context/AuthContext'
import {Navigate} from 'react-router-dom'
import { Loader } from 'lucide-react'
const Public = ({children}:{children:React.ReactNode}) => {
    const auth=useAuth();

    if(auth?.loading){
        return <div className='flex-1'><Loader className='animate-spin'/></div>
    }
    else if(auth?.session){
        return <Navigate to={'/dashboard'} replace/>
    }
    else if(auth?.session===null)
        return <>{children}</>;
    /*
    agar session load ho rha hai to just show loader 
    load hone ke baad we have to decided where to route
    */
}

export default Public