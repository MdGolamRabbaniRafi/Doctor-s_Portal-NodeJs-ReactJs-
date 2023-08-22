import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router=useRouter()
  useEffect(() => {
    logout();
  }, []);
  const logout =  () => 
  {
    router.push('/')
  }
  
    return (
      <></>
  
       )
  }
  