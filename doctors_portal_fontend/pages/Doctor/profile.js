import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';

export default function profile() {
  const [Profiles, setProfile] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth(); 

  console.log('user inside profile:', user);

  const handleBackClick = () => {
    router.push('../Doctor/LoggedinPage');
  };
  useEffect(() => {
    fetchData();
  }, []);

  
  const fetchData = async () => {
    try {
      const userEmail = user.email;
      console.log("User Email:", userEmail);
  
      const response = await axios.get(`http://localhost:3000/Doctor/ViewProfile/${userEmail}`, {
        withCredentials: true, 
      });
      console.log("Backend Response:", response.data);
  
      if (response.data && typeof response.data === 'object') {
        const profileData = [response.data]; // Wrap the object in an array
        console.log("Profile Data:", profileData);
  
        setProfile(profileData);
      } else {
        setError('No Profile Data found');
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
      <h1>My Profile</h1>
      {error && <p>{error}</p>}
      <ul>
        {Profiles.map(profile => (
          
          <li>
            Name: {profile.name}<br />
            Email: {profile.email}<br />
            Gender: {profile.Gender}<br />
            Degree: {profile.Degree}<br />
            Blood Goup: {profile.Blood_group}<br />

            <br></br>

          </li>
          
        ))}
      </ul>
      <input type="submit" value="Back" onClick={handleBackClick} />
      <FooterForLoggedin></FooterForLoggedin>

    </div>
  );
}
