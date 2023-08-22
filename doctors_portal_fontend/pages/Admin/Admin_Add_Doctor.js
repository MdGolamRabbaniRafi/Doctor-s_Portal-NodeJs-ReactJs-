import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
export default function AddAppointment() {
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');


  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeAge = (e) => {
    setAge(e.target.value);
  };
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };
  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email:"+email)
    console.log("age:"+age)
    console.log("date:"+date)
    console.log("time:"+time)

    if (!email || !date || !time || !age) {
      setError('All fields are required');
    } else {
      setError('');

      try {
        const response = await axios.post('http://localhost:3000/Doctor/addappointment/1', {
          email: email,
          age: age,
          date: date,
          time: time
        });

        console.log("Backend Response:", response);
        console.log(5418525)

        if (response.data === "Invalid Email") {
          setError('Email Does not found');
        } else if (response.data === "Error fetching patient") {
          setError('Error fetching patient');
        } else {
          router.push('/Appointment');
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response); 
        setError('An error occurred during Add appointment. Please try again later.');
      }
    }
  };

  return (
    <div>
      <HeaderForLoggedin></HeaderForLoggedin>
      <h1>Add Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} required onChange={handleChangeEmail} /><br />

        <label htmlFor="age">Age:</label>
        <input type="text" id="text" name="To" value={age}required onChange={handleChangeAge} /><br />

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={date}required onChange={handleChangeDate} /><br />

        <label htmlFor="time">Time:</label>
        <input type="time" id="time" name="time" value={time}required onChange={handleChangeTime} /><br />

        <input type="submit" value="Confirm" />
      </form>
      {error && <p>{error}</p>}
      <FooterForLoggedin></FooterForLoggedin>
    </div>
  );
}
