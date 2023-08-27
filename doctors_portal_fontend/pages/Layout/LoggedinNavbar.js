import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const NavigationBarLoggedin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isAppointmentDropdownOpen, setIsAppointmentDropdownOpen] = useState(false);
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);

  const toggleAppointmentDropdown = () => {
    setIsAppointmentDropdownOpen(!isAppointmentDropdownOpen);
  };

  const toggleEmailDropdown = () => {
    setIsEmailDropdownOpen(!isEmailDropdownOpen);
  };
  const handleChangeEmail = (e) => {
    console.log("Handleeeeeee:"+e.target.value)
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Checkeeeeeeeeeeeeeeeeeeed")

    if (!email) {
      setError('All fields are required');
    } else {
      setError('');

      try {
        const response = await axios.get(`http://localhost:3000/Doctor/Searching/${email}`, {
          withCredentials: true,
        });

        console.log('Backend Response:', response);
        console.log(5418525);

        if (response.data === 'User Not Found') {
          setError('User does not found');
        } else {
          console.log('Response Data:', response.data);
          router.push({
            pathname: '../Doctor/Found_user',
            query: {
              data: JSON.stringify(response.data),
            },
          });
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <nav>

      <div className="navbar bg-base-100 ">
        
  <div className="flex-1">

    
    <a className="btn btn-ghost normal-case text-xl" onClick={() => handleNavigation("../Doctor/LoggedinPage")}><img src="/docav.jpg" width={70} height={70} alt="Doctor's Portal" style={{ borderRadius: '50%' }}/></a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
    <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              onChange={handleChangeEmail}
              className="input input-bordered w-24 md:w-auto"
            />
          </form>    </div>
          <button class="btn btn-ghost btn-circle" onClick={() => handleNavigation("../Doctor/Notification")}>
      <div class="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span class="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={`http://localhost:3000/Doctor/viewProfilePicture?${Date.now()}`} />
        </div>
      </label>
      
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <button onClick={() => handleNavigation("../Doctor/profile")} className="justify-between">
            Profile
            <span className="badge">New</span>
          </button>
        </li>
        <li><button onClick={() => handleNavigation("../Doctor/Post-article")}>Article</button></li>
        



        <ul className={`menu bg-black-200 w-56 rounded-box ${isAppointmentDropdownOpen ? 'menu-show' : ''}`}>
      <li>
        <span className={`menu-dropdown-toggle ${isAppointmentDropdownOpen  ? 'menu-dropdown-show' : ''} mr-6`} onClick={toggleAppointmentDropdown}>
        <span className="mr-8">Appointment</span>
        </span>
        <ul className={`menu-dropdown ${isAppointmentDropdownOpen  ? 'menu-dropdown-show' : ''}`}>
          <li><a onClick={() => handleNavigation("../Doctor/Add_appointment")}>Add Appointment</a></li>
          <li><a onClick={() => handleNavigation("../Doctor/View_all_appointment")}>View All Appointment</a></li>
          <li><a onClick={() => handleNavigation("../Doctor/Cancel_All_appointment")}>Cancel All Appointment</a></li>

        </ul>
      </li>
    </ul>










        {/* <li><a onClick={() => handleNavigation("../Doctor/Appointment")}>Appointment</a></li> */}
        <li><button onClick={() => handleNavigation("../Doctor/Refer_doctor")}>Refer</button></li>
        
        
        
        





        <ul className={`menu bg-black-200 w-56 rounded-box ${isEmailDropdownOpen ? 'menu-show' : ''}`}>
      <li>
        <span className={`menu-dropdown-toggle ${isEmailDropdownOpen ? 'menu-dropdown-show' : ''} mr-6`} onClick={toggleEmailDropdown}>
          Email
        </span>
        <ul className={`menu-dropdown ${isEmailDropdownOpen ? 'menu-dropdown-show' : ''}`}>
          <li><a  onClick={() => handleNavigation("../Doctor/Send_email")}>Send Email</a></li>
          <li><a onClick={() => handleNavigation("../Doctor/Check_email_history")}>Check Email History</a></li>
        </ul>
      </li>
    </ul>


        <li><button onClick={() => handleNavigation("/Logout")}>Logout</button></li>
      </ul>
    </div>
  </div>
</div>
    </nav>


  );
};

export default NavigationBarLoggedin;