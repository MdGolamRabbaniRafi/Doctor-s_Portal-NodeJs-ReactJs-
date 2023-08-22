import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';

export default function Cancel_All_appointment() {
  const router = useRouter();
  const { serial, email, age, date, time } = router.query;
  const [error, setError] = useState('');

  const handleBackClick = () => {
    router.push('/Appointment');
  };
  const handleAllDeleteForm = async () => { 
      try {
        const response = await axios.delete(`http://localhost:3000/Doctor/deleteAllAppointments/1/`);


        console.log("Backend Response:", response);
        if (response.data === "Don't find any appointment") {
          setError('Error updating appointment');
        } else if(response.data === "All appointments deleted") {
          setError('');
          router.push('/Appointment')
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    
  };

  return (
    <div>
      <HeaderForLoggedin></HeaderForLoggedin>
      <h1>Are you sure to delete all appointment?</h1>
      <br />
      {error && <p>{error}</p>}

      <input type="submit" value="Yes" onClick={handleAllDeleteForm} />

      <input type="submit" value="No" onClick={handleBackClick} />
      <FooterForLoggedin></FooterForLoggedin>
    </div>
  );
}
