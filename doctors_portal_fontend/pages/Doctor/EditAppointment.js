import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import { useEffect } from 'react';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import SessionCheck from '../utils/session';
import dynamic from "next/dynamic";


const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});

export default function EditAppointment() {
  const router = useRouter();
  const { serial, email, age, date, time } = router.query;
  const [updatedEmail, setUpdatedEmail] = useState(email || '');
  const [updatedAge, setUpdatedAge] = useState(age || '');
  const [updatedDate, setUpdatedDate] = useState(date || '');
  const [updatedTime, setUpdatedTime] = useState(time || '');
  const [error, setError] = useState('');
  const { checkUser } = useAuth();


  const handleBackClick = () => {
    router.push('../Doctor/View_all_appointment');
  };
  const handleChangeEmail = (e) => {
    setUpdatedEmail(e.target.value);
  };
  const handleChangeAge = (e) => {
    setUpdatedAge(e.target.value);
  };
  useEffect(() => {
  }, []);
  
  const handleChangeDate = (e) => {
    setUpdatedDate(e.target.value);
  };
  const handleChangeTime = (e) => {
    setUpdatedTime(e.target.value);
  };
  const handleEditForm = async () => {
    if (!updatedEmail || !updatedDate || !updatedTime || !updatedAge||!email||!age||!date||!time) {
      setError('All fields are required');
    } else {
      try {
        const response = await axios.put(`http://localhost:3000/Doctor/updateAppointment/${serial}`, {
          email: updatedEmail,
          age: updatedAge,
          date: updatedDate,
          time: updatedTime,
        }
        ,{
          withCredentials: true,
        });

        console.log("Backend Response:", response);
        if (response.data === "Don't find any appointment") {
          setError('Error updating appointment');
        } else {
          setError('');
          router.push('../Doctor/View_all_appointment')
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <>
              <SessionCheck></SessionCheck>
              <Title page ="Edit Appointment"></Title>

      <NavigationBarLoggedin />
  
      <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">

      <div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <a className="btn btn-ghost normal-case text-xl">Edit Profile</a>
  </div>
 
</div>


        <div className="w-full max-w-md p-6 bg-black shadow-md rounded-md">
          
          {checkUser() ? (
            <>
              <h1 className="text-2xl font-semibold mb-4">Edit Appointment</h1>
  
              <label htmlFor="email" className="block mb-1">Email:</label>
              <input
                type="email"
                id="email"
                value={updatedEmail}
                required
                onChange={handleChangeEmail}
                className="input"
              />
  
              <label htmlFor="age" className="block mt-4 mb-1">Age:</label>
              <input
                type="text"
                id="age"
                value={updatedAge}
                required
                onChange={handleChangeAge}
                className="input"
              />
  
              <label htmlFor="date" className="block mt-4 mb-1">Date:</label>
              <input
                type="date"
                id="date"
                value={updatedDate}
                required
                onChange={handleChangeDate}
                className="input"
              />
  
              <label htmlFor="time" className="block mt-4 mb-1">Time:</label>
              <input
                type="time"
                id="time"
                value={updatedTime}
                required
                onChange={handleChangeTime}
                className="input"
              />
  
              {error && <p className="text-red-500 mt-2">{error}</p>}
  
              <div className="mt-6 flex space-x-4">
                <button
                  className="btn btn-primary"
                  onClick={handleEditForm}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mr-2"></div>
              <p className="text-lg font-semibold">Login First</p>
            </div>
          )}
        </div>
  
        <FooterForLoggedin />
      </div>
    </>
  );
  
  
  }
