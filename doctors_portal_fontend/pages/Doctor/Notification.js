import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, checkUser } = useAuth();
  const index=0

  const handleBackClick = () => {
    router.push('../Doctor/LoggedinPage');
  };

  useEffect(() => {
    if (!checkUser()) {
      router.push('/');
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const userEmail = user.email;
      const response = await axios.get('http://localhost:3000/Doctor/notification', {
        withCredentials: true,
      });

      console.log('Backend Response:', response.data);

      if (Array.isArray(response.data)) {
        const notificationsData = response.data;
        console.log('Notifications Data:', notificationsData);

        if (notificationsData.length > 0) {
          console.log('Notifications:', notificationsData);
          setNotifications(notificationsData);
        } else {
          setError('No notifications found');
        }
      } else {
        setError('No Notification found');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      {checkUser() ? (
        <>
             <NavigationBarLoggedin></NavigationBarLoggedin>
             <div className="bg-black-100 h-screen w-screen  justify-between">

             <main className="container mx-auto p-4">

             <div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <a className="btn btn-ghost normal-case text-xl">Notifications</a>
  </div>
 
</div>

{error && <p className="text-red-500">{error}</p>}
          <ul className="space-y-4">
  {notifications.map((notification, index) => (
    <li key={notification.Serial} className="p-4 bg-black-200 shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <span className="text-black font-semibold text-base">
          Notification <span className="text-blue-500">{index + 1}</span>
        </span>
        <span className="text-gray-600 text-xs">
          {notification.date} - {notification.time}
        </span>
      </div>
      Activity: {notification.Message}<br />
      <br />
    </li>
  ))}
</ul>

          <FooterForLoggedin />
          </main>

          </div>
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
