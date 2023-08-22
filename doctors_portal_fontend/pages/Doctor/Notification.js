import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';

export default function Notification() {
  const [notifications, setNotification] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/LoggedinPage');
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Doctor/notification/1`);
      console.log("Backend Response:", response.data);
  
      if (Array.isArray(response.data)) {
        const notificationsData = response.data;
        console.log("Notifications Data:", notificationsData);
  
        if (notificationsData.length > 0) {
          console.log("Notifications:", notificationsData);
          setNotification(notificationsData);
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
    <HeaderForLoggedin></HeaderForLoggedin>
      <h1>Notifications</h1>
      {error && <p>{error}</p>}
      <ul>
        {notifications.map(notification => (
          
          <li>
            Serial: {notification.Serial}<br />
            Activity: {notification.Message}<br />
            Date: {notification.date}<br />
            Time: {notification.time}<br />
            <br></br>

          </li>
          
        ))}
      </ul>
      <input type="submit" value="Back" onClick={handleBackClick} />
      <FooterForLoggedin></FooterForLoggedin>

    </div>
  );
}
