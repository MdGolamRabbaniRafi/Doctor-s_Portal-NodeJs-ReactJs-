import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
//import { useAuth } from '../utils/authentication';
import { useAuth } from '../utils/authentication';
import { useEffect } from 'react';
import SessionCheck from '../utils/session';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"

import dynamic from "next/dynamic";


const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});

export default function AddAppointment() {
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const { checkUser } = useAuth();

 // const { user } = useAuth(); 


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
  const handleBack = (e) => {
    router.push('../Doctor/LoggedinPage');
  };
 // const { checkUser } = useAuth();

  useEffect(() => {
  }, []);
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
       // const userEmail = user.email;
        const response = await axios.post(`http://localhost:3000/Doctor/addappointment`, {
          email: email,
          age: age,
          date: date,
          time: time,
        },
        {
          withCredentials: true,
        }
        );

        console.log("Backend Response:", response);
        console.log(5418525)

        if (response.data === "Invalid Email") {
          setError('Email Does not found');
        } else if (response.data === "Error fetching patient") {
          setError('Error fetching patient');
        } else {
          router.push('../Doctor/LoggedinPage');
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response); 
        setError('An error occurred during Add appointment. Please try again later.');
      }
    }
  };
  return (
    <>
        <>
                  <SessionCheck></SessionCheck>
                  <Title page ="Add Appointment"></Title>

          <NavigationBarLoggedin />
          <div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <a className="btn btn-ghost normal-case text-xl">Add Appointment</a>
  </div>
 
</div>
  
          <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">

  
            <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-black shadow-md rounded-md">
              <h1 className="text-2xl font-semibold mb-4">Add Appointment</h1>
  
              <div className="form-control">
                <label htmlFor="email" className="input-group input-group-sm">
                  <span>Email</span>
                  <input
                    type="email"
                    className="input input-bordered input-sm"
                    id="email"
                    name="email"
                    value={email}
                    required
                    onChange={handleChangeEmail}
                  />
                </label>
              </div>
  
              <br />
  
              <div className="form-control">
                <label className="input-group input-group-sm">
                  <span>Age:</span>
                  <input
                    type="text"
                    className="input input-bordered input-sm"
                    id="age"
                    name="age"
                    value={age}
                    required
                    onChange={handleChangeAge}
                  />
                </label>
              </div>
  
              <br />
  
              <label htmlFor="date" className="flex items-center space-x-1">
                <span className="mr-1">Date:</span>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  required
                  onChange={handleChangeDate}
                  className="input input-bordered input-sm"
                  style={{ lineHeight: '1.5', padding: '0.25rem 0.5rem' }}
                />
              </label>
  
              <br />
  
              <label htmlFor="time" className="flex items-center space-x-1">
                <span className="mr-1">Time:</span>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={time}
                  required
                  onChange={handleChangeTime}
                  className="input input-bordered input-sm"
                  style={{ lineHeight: '1.5', padding: '0.25rem 0.5rem' }}
                />
              </label>
  
              <br />
  
              <input type="submit" className="btn btn-outline btn-accent ml-12" value="ADD" />
            </form>
            
            {error && <p className="text-red-500 mt-2">{error}</p>}
            
            <FooterForLoggedin />
          </div>
        </>
     
    </>
  );
  }
