import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import SessionCheck from '../utils/session';
import dynamic from "next/dynamic";


const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});

export default function Cancel_All_appointment() {
  const { checkUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleBackClick = (event) => {
    event.preventDefault();
    router.push('../Doctor/View_all_appointment');
  };

  const handleAllDeleteForm = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:3000/Doctor/deleteAllAppointment`,{
        withCredentials: true,
      });
      
      console.log("Backend Response:", response);
      
      if (response.data === "All appointments deleted") {
        setError('');
        router.push('/Doctor/View_all_appointment');
      }
      else if(response.data === "No appointments to delete")
      {
        setError('No appointments available to delete');

      }
       else {
        setError('Error deleting appointments');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {

  }, []);

  return (
    <div>
                <SessionCheck></SessionCheck>

        <>
        <Title page ="Remove All Appointment"></Title>

          {/* <HeaderForLoggedin /> */}
          <NavigationBarLoggedin></NavigationBarLoggedin>
          <div className="navbar bg-teal-800 shadow-xl">
            <div className="navbar-start">
              <div className="dropdown">
              </div>
              <a className="btn btn-ghost normal-case text-xl">Delete Appointments</a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
            <form className="w-full max-w-md p-6 bg-black shadow-md rounded-md">
              <h1 className="btn btn-ghost normal-case text-xl">Are you sure you want to delete all appointments?</h1>
              <br />
              {error && <p>{error}</p>}
              <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '3px' }}>
                <input type="submit" value="Yes" className='btn btn-outline btn-success ml-12' onClick={handleAllDeleteForm} />
                <input type="submit" value="No" className='btn btn-outline btn-error ml-12' onClick={handleBackClick} />
              </div>
            </form>
            <FooterForLoggedin />
          </div>
        </>
     
    </div>
  );
}
