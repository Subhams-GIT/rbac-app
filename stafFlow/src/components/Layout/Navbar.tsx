import { useContext } from "react"
import { userContext } from "../../Context/userContext"
import { LogOut } from "lucide-react";

const Navbar = () => {
    const user=useContext(userContext);
    console.log({userd:user?.user})
    console.log(user?.user?.role)
  return (
    <div className="h-12 shadow-md bg-white text-black flex justify-between items-center px-2">
        <section className="px-1 ">{user?.user?.role}</section>
        <section>{user?.user?.username}</section>
        <section><LogOut/></section>
    </div>
  )
}

export default Navbar