import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"


export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, checkUser } = useAuth();

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
          <h1>Notifications</h1>
          {error && <p>{error}</p>}
          <ul>
            {notifications.map(notification => (
              <li key={notification.Serial}>
                Serial: {notification.Serial}<br />
                Activity: {notification.Message}<br />
                Date: {notification.date}<br />
                Time: {notification.time}<br />
                <br />
              </li>
            ))}
          </ul>
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
