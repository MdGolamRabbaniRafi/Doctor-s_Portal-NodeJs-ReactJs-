import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HomeLogo from '../Layout/HomeLogo';
import SessionCheck from '../utils/session';


export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const doctorLogoPath = "/docav.jpg" ; 


  const handleBackClick = () => {
    router.push('/Admin/Admin_LoggedinPage');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Admin/notification', {
        withCredentials: true
      });

      if (Array.isArray(response.data)) {
        setNotifications(response.data);
      } else {
        setError('No notifications found');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleDeleteForm = async () => {
      try {
        const response = await axios.delete(`http://localhost:3000/Admin/deletenotifications` ,{
          withCredentials: true
        });


        console.log("Backend Response:", response);

        if (response.data === 'No notifications to remove') {
          setError('No notifications to remove');


        } else if(response.data === "All notifications removed successfully") {
          router.push('./Admin_LoggedinPage')
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
   
  };

  return (
    <><SessionCheck></SessionCheck>
    <div className="bg-gray-100 h-screen w-screen  justify-between">
      <div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <a className="btn btn-ghost normal-case text-xl">Notifications</a>
  </div>
  <div className="navbar-center">
        <a><HomeLogo doctorLogoPath={doctorLogoPath}></HomeLogo></a>

      </div>
 
  <div className="navbar-end">
    <a className="btn" onClick={handleDeleteForm}>Clear Notifications</a>
  </div>
</div>

<main className="container mx-auto p-4">
  <h1 className="text-3xl font-semibold mb-4">Your Notifications</h1>
  {error && <p className="text-red-500">{error}</p>}
  <ul className="space-y-4">
    {notifications.map((notification, index) => (
      <li
        key={index}
        className="p-4 bg-gray-200 shadow-md rounded-md"
      >
        <div className="flex justify-between items-center">
          <span className="text-black font-semibold text-base">
            Notification <span className="text-blue-500">{index + 1}</span>
          </span>
          <span className="text-gray-600 text-xs">
            {notification.date} - {notification.time}
          </span>
        </div>
        <p className="mt-2 text-gray-700">{notification.Message}</p>
      </li>
    ))}
  </ul>
  <button
    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    onClick={handleBackClick}
  >
    Back
  </button>
</main>


    </div>
    </>
  );
}
