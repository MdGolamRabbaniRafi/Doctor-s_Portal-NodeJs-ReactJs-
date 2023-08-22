import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from './Layout/LoggedinHeader';
import FooterForLoggedin from './Layout/LoggedinFooter';

export default function Delete_one_appointment() {
  const router = useRouter();
  const { serial, email, age, date, time } = router.query;
  const [error, setError] = useState('');

  const handleBackClick = () => {
    router.push('/View_all_appointment');
  };
  const handleDeleteForm = async () => {
    console.log(email+"   "+age+"      "+"   "+serial)
    if (!email||!age||!date||!time) {
      setError('An error occurred');
    } else {
      try {
        const response = await axios.delete(`http://localhost:3000/Doctor/deleteOneAppointment/1/${serial}`);


        console.log("Backend Response:", response);
        if (response.data === "Don't find any appointment") {
          setError('Error updating appointment');
        } else if(response.data === "Appointment deleted") {
          setError('');
          router.push('/View_all_appointment')
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <HeaderForLoggedin></HeaderForLoggedin>
      <h1>Delete Appointment</h1>
      <label htmlFor="serial">Serial:{serial}</label>
      <br />
      <label htmlFor="email">Email:{email}</label>
      <br />
      <label htmlFor="age">Age:{age}</label>
      <br />
      <label htmlFor="date">Date:{date}</label>
      <br />
      <label htmlFor="time">Time:{time}</label>
      <br />
      {error && <p>{error}</p>}

      <input type="submit" value="Yes" onClick={handleDeleteForm} />

      <input type="submit" value="No" onClick={handleBackClick} />
      <FooterForLoggedin></FooterForLoggedin>
    </div>
  );
}
