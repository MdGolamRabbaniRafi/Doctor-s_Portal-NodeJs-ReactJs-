import { useRouter } from "next/router";
import FooterForLoggedin from "../Layout/LoggedinFooter"; // Adjust the path accordingly
import HeaderForLoggedin from "../Layout/LoggedinHeader"; // Adjust the path accordingly
import { useAuth } from '../utils/authentication';
import { useEffect } from "react";
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import SessionCheck from "../utils/session";

import dynamic from "next/dynamic";


const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});

export default function Appointent() {
  const router = useRouter();
  const { checkUser } = useAuth();

  const handleNavigation = (path) => {
    router.push(path);
  };

  useEffect(() => {

  }, []);

  return (
    <div>
        <>
                  <SessionCheck></SessionCheck>
                  <Title page ="Appointment"></Title>


          {/* <HeaderForLoggedin /> */}
          <NavigationBarLoggedin></NavigationBarLoggedin>

          
          <button onClick={() => handleNavigation('Add_appointment')}>Add Appointment</button><br />
          <button onClick={() => handleNavigation("../Doctor/View_all_appointment")}>View All Appointment</button><br />
          <button onClick={() => handleNavigation("../Doctor/Cancel_All_appointment")}>Delete All Appointment</button><br />
          <button onClick={() => handleNavigation("../Doctor/LoggedinPage")}>Back</button><br />

          <FooterForLoggedin />
        </>
    </div>
  );
}
