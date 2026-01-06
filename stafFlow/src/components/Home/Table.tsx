import React, { useState } from 'react'

type UserData={
    email:string,
    username:string,
    status:boolean,
    action:()=>void
}

const Table = () => {
    const [userData,setuserData]=useState();
    return (
    <div>
        <table>
            
        </table>
    </div>
  )
}

export default Table