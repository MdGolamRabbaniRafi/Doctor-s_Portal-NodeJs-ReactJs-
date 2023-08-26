import FooterForLoggedin from "../Layout/LoggedinFooter"
import HeaderForLoggedin from "../Layout/LoggedinHeader"
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import { useState } from 'react';
import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const handlePicClick = () => {
    setShowButtons(!showButtons);
  };

  return (
    <>
<div className="navbar bg-gray-100 py-10">
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

<div className="carousel w-full">
  <div id="slide1" className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
    <img src="/doctor1.jpg" className="w-full" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex  items-center justify-center"></div>
          <div class="absolute inset-0 flex items-center justify-center">
         
            <div class="text-center">
              <h1 class="text-6xl font-serif text-white">Your health is our priority</h1>
              <p class="mt-4 font-medium text-white">CHECK FOR DOCTORS GUIDANCE</p>
         
            </div>
          </div>
    
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <button onClick={() => setCurrentSlide(2)} className="btn btn-circle">❮</button>
      <button onClick={() => setCurrentSlide(2)} className="btn btn-circle">❯</button>
    </div>
  </div> 
  <div id="slide2" className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
    <img src="/doctor2.jpg" className="w-full" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex  place-items-end justify-center"></div>
          <div class="absolute inset-0 flex items-center justify-center">
         
            <div class="text-center">
              <h1 class="text-6xl font-serif text-white">Your health is our priority</h1>
              <p class="mt-4 font-medium text-white">CHECK FOR DOCTORS GUIDANCE</p>
              
             
            </div>
          </div>
    
    
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      
    <button onClick={() => setCurrentSlide(1)} className="btn btn-circle">❮</button>
      <button onClick={() => setCurrentSlide(1)} className="btn btn-circle">❯</button>
    </div>
    
  </div> 
  
  
</div>

    </>
    
  )
}
