import { useContext } from "react"

import { LogOut } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
    const session=useAuth();
    const user=session?.session;
  return (
    <div className="h-12 shadow-md bg-white text-black flex justify-between items-center px-2">
        <section className="px-1 ">{user?.user?.role}</section>
        <section>{user?.user?.username}</section>
        <section><LogOut/></section>
    </div>
  )
}

export default Navbar