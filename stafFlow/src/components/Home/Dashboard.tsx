import { useEffect } from 'react'
import { instance } from '../../axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    async function  getSession(){
      try {
        const res=await instance.get('/session')
        console.log(res);
        if(!res){
        }
        
      } catch (error) {
        
        navigate('/login')
      }
    }
    getSession();
  },[])
  return (
    <div>
        dashabdbn
    </div>
  )
}

export default Dashboard