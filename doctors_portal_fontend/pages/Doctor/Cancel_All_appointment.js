import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';

export default function Cancel_All_appointment() {
  const { checkUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleBackClick = () => {
    router.push('../Doctor/Appointment');
  };

  const handleAllDeleteForm = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/Doctor/deleteAllAppointments/1/`);
      
      console.log("Backend Response:", response);
      
      if (response.data === "Don't find any appointment") {
        setError('Error updating appointment');
      } else if (response.data === "All appointments deleted") {
        setError('');
        router.push('../Doctor/Appointment');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    console.log("CheckUser::::" + checkUser());
    if (!checkUser()) {
      router.push('/');
    }
  }, []);

  return (
    <div>
      {checkUser() ? (
        <>
          <HeaderForLoggedin />
          <h1>Are you sure to delete all appointment?</h1>
          <br />
          {error && <p>{error}</p>}
          
          <input type="submit" value="Yes" onClick={handleAllDeleteForm} />
          
          <input type="submit" value="No" onClick={handleBackClick} />
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
