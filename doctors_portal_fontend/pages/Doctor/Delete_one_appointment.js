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

export default function Delete_one_appointment() {
  const router = useRouter();
  const { serial, email, age, date, time } = router.query;
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false); // Added state for delete status
  const [isBacking, setIsBacking] = useState(false); // Added state for delete status


  const handleBackClick = (event) => {
    event.preventDefault(); // Prevent the default behavior
    try {
      setIsBacking(true);
      router.replace('/Doctor/View_all_appointment');
    } finally {
      setIsBacking(false);
    }
  };

  const handleDeleteForm = async () => {
    if (!email || !age || !date || !time || isDeleting||isBacking) { // Check if deleting or missing data
      setError('An error occurred');
      return;
    }

    try {
      setIsDeleting(true); // Disable delete button during delete operation

      const response = await axios.delete(`http://localhost:3000/Doctor/deleteOneAppointment/${serial}`, {
        withCredentials: true,
      });

      console.log("Backend Response:", response);
      if (response.data === "Don't find any appointment") {
        setError('Error updating appointment');
      } else if (response.data === "Appointment deleted") {
        setError('');
        router.replace('/Doctor/View_all_appointment'); // Use replace for redirection
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsDeleting(false); 
    }
  };

  useEffect(() => {

  }, []);

  return (
    <div>
      <Title page ="Delete a Appointment"></Title>

          <SessionCheck></SessionCheck>
        <>
          {/* <HeaderForLoggedin /> */}
          <NavigationBarLoggedin></NavigationBarLoggedin>
          <div className="navbar bg-teal-800 shadow-xl">
            <div className="navbar-start">
              <div className="dropdown">
              </div>
              <a className="btn btn-ghost normal-case text-xl">Delete Appointment</a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
            <form className="w-full max-w-md p-6 bg-black shadow-md rounded-md">
              <label htmlFor="serial" >Serial: {serial}</label>
              <br />
              <label htmlFor="email">Email: {email}</label>
              <br />
              <label htmlFor="age">Age: {age}</label>
              <br />
              <label htmlFor="date">Date: {date}</label>
              <br />
              <label htmlFor="time">Time: {time}</label>
              <br />
              {error && <p>{error}</p>}
              <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '3px' }}>
                <input
                  type="submit"
                  value="Delete"
                  className='btn btn-outline btn-error ml-12'
                  onClick={handleDeleteForm}
                  disabled={isDeleting}
                />
                <input
                  type="submit"
                  value="Back"
                  className='btn btn-outline btn-success ml-12'
                  onClick={handleBackClick}
                  disabled={isBacking}


                />
              </div>
            </form>
            <FooterForLoggedin />
          </div>
        </>

    </div>
  );
}
