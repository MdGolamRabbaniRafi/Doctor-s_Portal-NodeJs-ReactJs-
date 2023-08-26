import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../../Layout/LoggedinHeader';
import FooterForLoggedin from '../../Layout/LoggedinFooter';

export default function dynamic() {
  const [Profiles, setProfile] = useState([]);

  const [error, setError] = useState('');
  const router = useRouter();
  const {email } = router.query;

  const [selectedFile, setSelectFile] = useState(null);

  const handleBackClick = () => {
    router.push('../../Doctor/View_all_appointment');
  };

  // const handleProfilePicture = (e) => {
  //   e.preventDefault();
  //   setSelectFile(e.target.files[0]);
  // };


  const fetchData = async () => {
    try {
        const userEmail = email;
        console.log('User Email:', userEmail);

      const response = await axios.get(`http://localhost:3000/Patient/ViewMyProfile/${userEmail}`, {
        withCredentials: true,
      });
      console.log('Backend Response:', response.data);

      if (response.data && typeof response.data === 'object') {
        const profileData = [response.data];
        console.log('Profile Data:', profileData);

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

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeaderForLoggedin className="self-start" />
      <div className="flex items-center justify-center space-x-4">
        <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img className="w-full h-full object-cover" src={`http://localhost:3000/Doctor/viewProfilePicture?${Date.now()}`} alt="Profile Picture" />
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ul className="my-4">
        {Profiles.map((profile, index) => (
          <li key={index} className="mb-2">
            Name: {profile.name}
            <br />
            Email: {profile.email}
            <br />
            Gender: {profile.Gender}
            <br />
            Degree: {profile.Degree}
            <br />
            Blood Group: {profile.Blood_group}
            <br />
          </li>
        ))}
      </ul>
      <input type="submit" value="Back" onClick={handleBackClick} className="btn btn-primary" />
      <FooterForLoggedin />
    </div>
  );
}
