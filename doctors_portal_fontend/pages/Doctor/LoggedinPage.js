import FooterForLoggedin from "../Layout/LoggedinFooter"
import HeaderForLoggedin from "../Layout/LoggedinHeader"
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '../utils/authentication';
import DashBoard from "../Layout/Dashboard";


export default function LoggeginPage() {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  const { checkUser } = useAuth();

  const handlePicClick = () => {
    setShowButtons(!showButtons);
  };

  useEffect(() => {
    console.log("CheckUser::::"+checkUser())
    if(!checkUser()) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <div>
        {checkUser() ? (
          <>
            <title>LoggedIn</title>



            
            <NavigationBarLoggedin></NavigationBarLoggedin>
            <DashBoard></DashBoard>

          </>
        ) : (
          
          <div className="flex justify-center items-center h-screen">

            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p>Login First</p>
          </div>
        )}
      </div>
    </>
  );
}
