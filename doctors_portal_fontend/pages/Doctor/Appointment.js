import { useRouter } from "next/router";
import FooterForLoggedin from "../Layout/LoggedinFooter"; // Adjust the path accordingly
import HeaderForLoggedin from "../Layout/LoggedinHeader"; // Adjust the path accordingly

export default function Appointent() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <>
      <HeaderForLoggedin />
      
      <button onClick={() => handleNavigation('Add_appointment')}>Add Appointment</button><br />
      <button onClick={() => handleNavigation("../Doctor/View_all_appointment")}>View All Appointment</button><br />
      <button onClick={() => handleNavigation("../Doctor/Cancel_All_appointment")}>Delete All Appointment</button><br />
      <button onClick={() => handleNavigation("../Doctor/LoggedinPage")}>Back</button><br />

      <FooterForLoggedin />
    </>
  );
}
