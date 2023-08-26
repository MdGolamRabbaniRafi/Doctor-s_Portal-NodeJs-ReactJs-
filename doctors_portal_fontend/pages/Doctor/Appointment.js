import { useRouter } from "next/router";
import FooterForLoggedin from "../Layout/LoggedinFooter"; // Adjust the path accordingly
import HeaderForLoggedin from "../Layout/LoggedinHeader"; // Adjust the path accordingly
import { useAuth } from '../utils/authentication';
import { useEffect } from "react";
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"


export default function Appointent() {
  const router = useRouter();
  const { checkUser } = useAuth();

  const handleNavigation = (path) => {
    router.push(path);
  };

  useEffect(() => {
    console.log("CheckUser::::"+checkUser())
    if (!checkUser()) {
      router.push('/');
    }
  }, []);

  return (
    <div>
      {checkUser() ? (
        <>
          {/* <HeaderForLoggedin /> */}
          <NavigationBarLoggedin></NavigationBarLoggedin>

          
          <button onClick={() => handleNavigation('Add_appointment')}>Add Appointment</button><br />
          <button onClick={() => handleNavigation("../Doctor/View_all_appointment")}>View All Appointment</button><br />
          <button onClick={() => handleNavigation("../Doctor/Cancel_All_appointment")}>Delete All Appointment</button><br />
          <button onClick={() => handleNavigation("../Doctor/LoggedinPage")}>Back</button><br />

          <FooterForLoggedin />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p>Login First</p>
        </div>
      )}
    </div>
  );
}
