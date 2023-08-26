import FooterForLoggedin from "../Layout/LoggedinFooter"
import HeaderForLoggedin from "../Layout/LoggedinHeader"
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '../utils/authentication';

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
            <HeaderForLoggedin></HeaderForLoggedin>
            <title>LoggedIn</title>
            <div className="flex justify-center items-center h-screen">
              <div className="relative">
                <img src={`http://localhost:3000/Doctor/viewProfilePicture?${Date.now()}`} alt="Profile Picture" onClick={handlePicClick} className="cursor-pointer" />
                {showButtons && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-2 space-y-2">
                    {/* Your button elements here */}
                  </div>
                )}
              </div>
            </div>
            <NavigationBarLoggedin></NavigationBarLoggedin>
            <FooterForLoggedin></FooterForLoggedin>
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
