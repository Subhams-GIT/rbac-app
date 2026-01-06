import { useContext, useEffect } from 'react'
import { instance } from '../../axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/userContext'
import Navbar from '../Layout/Navbar'
const Dashboard = () => {
  const navigate=useNavigate()
  const user=useContext(userContext)
  console.log(user)
  useEffect(()=>{
    async function  getSession(){
      try {
        const res=await instance.get('/session')
        console.log(res);
        if(!res){
        }
        user?.setuser(res.data.user)
      } catch (error) {
        
        navigate('/login')
      }
    }
    getSession();
  },[])
  return (
    <div>
        <Navbar/>
    </div>
  )
}

export default Dashboard