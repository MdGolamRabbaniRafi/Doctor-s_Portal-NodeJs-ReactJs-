import FooterForLoggedin from "../Layout/LoggedinFooter"
import HeaderForLoggedin from "../Layout/LoggedinHeader"
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import { useState } from 'react';
import { useRouter } from "next/router";

export default function LoggeginPage() {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);

  const handlePicClick = () => {
    setShowButtons(!showButtons);
  };

  return (
    <>
      <HeaderForLoggedin></HeaderForLoggedin>
      <title>LoggedIn</title>
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <img src={`http://localhost:3000/Doctor/viewProfilePicture?${Date.now()}`} alt="Profile Picture" onClick={handlePicClick} className="cursor-pointer" />
          {showButtons && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-2 space-y-2">
              <button className="btn btn-primary" onClick={() => router.push("../Doctor/profile")}>Profile</button>
              <button className="btn btn-primary" onClick={() => router.push("../Doctor/Appointment")}>Appointment</button>
              <button className="btn btn-primary" onClick={() => router.push("../Doctor/Refer_doctor")}>Refer</button>
              <button className="btn btn-primary" onClick={() => router.push("../Doctor/Edit_profile")}>Edit Profile</button>
              <button className="btn btn-primary" onClick={() => router.push("../Doctor/Post-article")}>Post Article</button>
              <button className="btn btn-primary" onClick={() => router.push("../Doctor/Send_email")}>Email</button>
              <button className="btn btn-primary" onClick={() => router.push("../Doctor/Notification")}>Notification</button>
              <button className="btn btn-primary" onClick={() => router.push("../Doctor/Searching")}>Searching</button>
            </div>
          )}
        </div>
      </div>
      <NavigationBarLoggedin></NavigationBarLoggedin>
      <FooterForLoggedin></FooterForLoggedin>
    </>
  )
}
