import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"


export default function Found_user() {
  const router = useRouter();
  const { checkUser } = useAuth();

  const { data } = router.query;

  const [profile, setProfile] = useState([]);
  const [error, setError] = useState('');

  const handleBackClick = () => {
    router.push('../Doctor/LoggedinPage');
  };

  useEffect(() => {
    if (!checkUser()) {
      //  alert('Log in first')
      router.push('/');
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      console.log('Data is ' + data);
      if (data) {
        const parsedData = JSON.parse(data);
        setProfile(parsedData);
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
          {/* <HeaderForLoggedin /> */}
          <NavigationBarLoggedin></NavigationBarLoggedin>

          <h1>User Profile</h1>
          {error && <p>{error}</p>}
          <ul>
            <li>
              Name: {profile.name}<br />
              Email: {profile.email}<br />
              Gender: {profile.Gender}<br />
              Degree: {profile.Degree}<br />
              Blood Group: {profile.Blood_group}<br />
              User: {profile.User}<br />
            </li>
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
