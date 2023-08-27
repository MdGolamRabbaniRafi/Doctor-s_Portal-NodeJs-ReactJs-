import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Make sure to add this import
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import SessionCheck from '../utils/session';
import dynamic from "next/dynamic";


const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});

export default function Refer_doctor() {
  const [Doctor_name, setDoctorName] = useState('');
  const [Patient_name, setPatientName] = useState('');
  const router = useRouter();
  const { checkUser } = useAuth();

  const [error, setError] = useState('');
  const handleChangeDoctorName = (e) => {
    setDoctorName(e.target.value);
  };
  const handleChangePatientName = (e) => {
    setPatientName(e.target.value);
  };
  const handleBack = (e) => {
    router.push('../Doctor/LoggedinPage');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Doctor_name || !Patient_name) {
      setError('All fields are required');
    } else {
      setError('');

      try {
        const response = await axios.post(
          `http://localhost:3000/Doctor/refer`,
          {
            Refer: Patient_name,
            ReferTo: Doctor_name,
          },
          {
            withCredentials: true,
          }
        );

        console.log('Backend Response:', response);
        console.log(5418525);

        if (response.data === "Email doesn't sent") {
          setError('Email Does not Sent');
        } else {
          router.push('../Doctor/LoggedinPage');
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError(
          'An error occurred during Add appointment. Please try again later.'
        );
      }
    }
  };

  useEffect(() => {
  
  }, []);

  return (
    <div>
      <Title page ="Refer"></Title>

          <SessionCheck></SessionCheck>
        <>
          <NavigationBarLoggedin></NavigationBarLoggedin>

          {/* <HeaderForLoggedin></HeaderForLoggedin> */}
          
          <div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <a className="btn btn-ghost normal-case text-xl">Post Article</a>
  </div>
 
</div>
<div className="flex flex-col items-center justify-center min-h-screen bg-black-100">

          <form onSubmit={handleSubmit} className='w-full max-w-md p-6 bg-black shadow-md rounded-md'>
          <h1 className="text-2xl font-semibold mb-4">Refer A Doctor</h1>
          <div className="form-control">
            <label htmlFor="Doctor_name" className='input-group input-group-sm'><span>Doctor Name:</span>
            <input
            className=''
              type="text"
              id="Doctor_name"
              name="Doctor_name"
              onChange={handleChangeDoctorName}
            />
            </label>
            </div>
            <br />



            <label className='input-group input-group-sm' htmlFor="Patient Name"><span>Patient Name:</span>
            <input
              type="text"
              id="Patient Name"
              name="Patient Name"
              onChange={handleChangePatientName}
            />
            </label>
            <br />
            <br />

            <button class="btn btn-outline">Confirm</button>
            <br />
          </form>
          <FooterForLoggedin></FooterForLoggedin>
          </div>
        </>

    </div>
  );
}
