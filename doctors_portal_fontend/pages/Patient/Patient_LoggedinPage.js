import FooterForLoggedin from "../Layout/LoggedinFooter"
import HeaderForLoggedin from "../Layout/LoggedinHeader"
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import { useState } from 'react';
import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);

  const handlePicClick = () => {
    setShowButtons(!showButtons);
  };

  return (
    <>
<div className="navbar bg-yellow-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        
        <li><button onClick={() => router.push("../Patient/addAppointment")}>Add Appointment</button></li>
        <li><button onClick={() => router.push("../Patient/deleteAppointment")}>Delete Appointment</button></li>
        <li><button onClick={() => router.push("../Patient/FeedbackForm")}>Feedback</button></li>
        <li><button onClick={() => router.push("../Patient/OrderMedicineForm")}>Order Medicine</button></li>
        <li><button onClick={() => router.push("../Patient/payment")}>Payment</button></li>
        <li><button onClick={() => router.push("../Patient/searchDoctor")}>Search Doctor</button></li>
        <li><button onClick={() => router.push("../Patient/test")}>Test</button></li>
        <li><button onClick={() => router.push("../Patient/update_test")}>Update Test</button></li>
        <li><button onClick={() => router.push("/Logout")}>Log Out</button></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost normal-case text-xl">Patient Profile</a>
  </div>
 
</div>












    </>
  )
}
