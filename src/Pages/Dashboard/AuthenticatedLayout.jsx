import React from 'react'
// import { useAuth } from "../Auth/AuthProvider";


const AuthenticatedLayout = ({children}) => {
  // const user = useAuth();
  // if(!user) {
    
  // };
  return (
    <>
        {children}
    </>
  )
}

export default AuthenticatedLayout