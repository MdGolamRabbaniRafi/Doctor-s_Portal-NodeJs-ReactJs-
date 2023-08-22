import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';

export default function profile() {
  const [Profiles, setProfile] = useState([]);
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
      const response = await axios.get(`http://localhost:3000/Doctor/ViewProfile/1`);
      console.log("Backend Response:", response.data);
  
      if (Array.isArray(response.data)) {
        const ProfileData = response.data;
        console.log(" Data:", ProfileData);
  
        if (ProfileData.length > 0) {
          console.log("ProfileData:", ProfileData);
          setProfile(ProfileData);
        } else {
          setError('No ProfileData found');
        }
      } else {
        setError('No ProfileData found');
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
