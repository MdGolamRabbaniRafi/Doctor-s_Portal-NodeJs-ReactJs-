import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import Link from 'next/link';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import SessionCheck from '../utils/session';
import dynamic from "next/dynamic";


const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});


export default function View_all_appointment() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { checkUser } = useAuth();

  const handleBackClick = () => {
    router.push('../Doctor/LoggedinPage');
  };

  const handleEditClick = (appointment) => {
    router.push({
      pathname: '../Doctor/EditAppointment',
      query: {
        serial: appointment.Serial,
        email: appointment.email,
        age: appointment.age,
        date: appointment.date,
        time: appointment.time,
      },
    });
  };

  const handleDeleteClick = (appointment) => {
    router.push({
      pathname: '../Doctor/Delete_one_appointment',
      query: {
        serial: appointment.Serial,
        email: appointment.email,
        age: appointment.age,
        date: appointment.date,
        time: appointment.time,
      },
    });
  };

  useEffect(() => {

      fetchData();
    
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Doctor/viewAppointment', {
        withCredentials: true,
      });

      console.log('Backend Response:', response);

      if (Array.isArray(response.data)) {
        console.log(response.data);
        const doctorData = response.data[0];
        if (Array.isArray(doctorData.appointment)) {
          if (doctorData.appointment[0]) {
            setAppointments(doctorData.appointment);
          } else {
            setError('No appointments found');
          }
        } else {
          setError('No appointments found');
        }
      } else {
        setError('Error fetching appointments');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    }
  };
  return (
    <div className="bg-black-100 h-screen w-screen justify-between">
      <Title page ="Appointments"></Title>

                <SessionCheck></SessionCheck>

      <NavigationBarLoggedin />
      <main className="container mx-auto p-4">
          <>
<div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <a className="btn btn-ghost normal-case text-xl">View Appointments</a>
  </div>
 
</div>            {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li key={appointment.Serial} className="p-4 bg-black-200 shadow-md rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold text-base">
                      Serial: <span className="text-whte-500">{appointment.Serial}</span>
                    </span>
                    <span className="text-white-600 text-xs">
                    <div className="mt-2">
                    <button
  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
  onClick={() => handleEditClick(appointment)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M13.293 4.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-5 1a1 1 0 01-1.227-1.226l1-5a1 1 0 01.241-.39l9-9z"
      clipRule="evenodd"
    />
  </svg>
  Edit
</button>

<button
  className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition duration-300 ease-in-out"
  onClick={() => handleDeleteClick(appointment)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    {/* SVG path here */}
  </svg>
  Delete
</button>


                  </div>
                    </span>
                  </div>
                  <div className="text-white">
                    <p>Name:                 <Link  class="text-blue-500" href={`../Doctor/Dynamic_user/Dynamic/?email=${appointment.email}`}>
                  {appointment.name}</Link></p>
                    <p>Age: {appointment.age}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                  </div>
                 
                </li>
              ))}
            </ul>
          </>
        <FooterForLoggedin />
      </main>
    </div>
  );
  
  
  
  }
