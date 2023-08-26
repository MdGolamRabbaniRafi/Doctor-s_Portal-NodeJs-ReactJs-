import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Make sure to add this import
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';

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
    console.log('CheckUser::::' + checkUser());
    if (!checkUser()) {
      router.push('/');
    }
  }, []);

  return (
    <div>
      {checkUser() ? (
        <>
          <h1>Refer A Doctor</h1>
          <HeaderForLoggedin></HeaderForLoggedin>

          <form onSubmit={handleSubmit}>
            <label htmlFor="Doctor_name">Doctor Name:</label>
            <input
              type="text"
              id="Doctor_name"
              name="Doctor_name"
              onChange={handleChangeDoctorName}
            />
            <br />
            <label htmlFor="Patient Name">Patient Name:</label>
            <input
              type="text"
              id="Patient Name"
              name="Patient Name"
              onChange={handleChangePatientName}
            />
            <br />
            <button onClick={handleBack}>Back</button>
            <br />

            <button>Confirm</button>
            <br />
          </form>
          <FooterForLoggedin></FooterForLoggedin>
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
