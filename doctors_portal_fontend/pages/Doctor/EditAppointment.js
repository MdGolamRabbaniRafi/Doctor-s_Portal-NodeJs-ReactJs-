import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import { useEffect } from 'react';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"


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
    console.log("CheckUser::::"+checkUser())
    if(!checkUser())
    {
      router.push('/')
    }
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
    <div>
      {checkUser() ? (
        <>
          {/* <HeaderForLoggedin /> */}
          <NavigationBarLoggedin></NavigationBarLoggedin>

          <h1>Edit Appointment</h1>
  
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={updatedEmail} required onChange={handleChangeEmail} />
          <br />
          <label htmlFor="age">Age:</label>
          <input type="text" id="age" value={updatedAge} required onChange={handleChangeAge} />
          <br />
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={updatedDate} required onChange={handleChangeDate} />
          <br />
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" value={updatedTime} required onChange={handleChangeTime} />
          <br />
          {error && <p>{error}</p>}
  
          <input type="submit" value="Save" onClick={handleEditForm} />
  
          <input type="submit" value="Back" onClick={handleBackClick} />
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
