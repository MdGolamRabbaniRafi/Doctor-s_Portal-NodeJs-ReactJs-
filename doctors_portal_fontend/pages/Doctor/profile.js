import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"


export default function Profile() {
  const [Profiles, setProfile] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  const [selectedFile, setSelectFile] = useState(null);
  const { checkUser } = useAuth();

  const handleBackClick = () => {
    router.push('../Doctor/LoggedinPage');
  };

  const handleProfilePicture = (e) => {
    e.preventDefault();
    setSelectFile(e.target.files[0]);
  };

  async function postData() {
    try {
      const formData = new FormData();
      formData.append('DoctorPicture', document.querySelector('#myfile').files[0]);

      const response = await axios.put(
        `http://localhost:3000/Doctor/changePicture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);
      setSelectFile(null);

      // After successfully updating the picture, re-fetch the user data
      fetchData(user);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async (user) => {
    try {
      const userEmail = user.email;
      console.log('User Email:', userEmail);

      const response = await axios.get(`http://localhost:3000/Doctor/ViewProfile/${userEmail}`, {
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
    // Wait until the user is available from the AuthProvider
    if (user === null) {
      // If user is null, it means authentication check is not complete yet.
      // You might want to show a loading screen or redirect to login.
      console.log("User Nulllllllllllllll")
    }

    if (!checkUser()) {
      router.push('/');
    } else {
      fetchData(user);
    }
  }, [user]); // Include user in the dependency array

  // ... rest of the component code ...

  return (
    <div>
      <NavigationBarLoggedin></NavigationBarLoggedin>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {checkUser() ? (
          <>
            {/* <HeaderForLoggedin className="self-start" /> */}
  
            <div className="flex items-center justify-center space-x-4">
              <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:3000/Doctor/viewProfilePicture?${Date.now()}`}
                  alt="Profile Picture"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  className="file-input file-input-ghost w-full max-w-xs"
                  accept="image/*"
                  onChange={handleProfilePicture}
                />
                {selectedFile && (
                  <button className="btn btn-xs" onClick={postData}>
                    Save
                  </button>
                )}
              </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <ul className="my-4">
              {Profiles.map((profile, index) => (
                <li key={index} className="mb-2">
                  <p className="text-lg font-semibold">{profile.name}</p>
                  <p>Email: {profile.email}</p>
                  <p>Gender: {profile.Gender}</p>
                  <p>Degree: {profile.Degree}</p>
                  <p>Blood Group: {profile.Blood_group}</p>
                </li>
              ))}
            </ul>
            <input
              type="submit"
              value="Back"
              onClick={handleBackClick}
              className="btn btn-primary"
            />
            <FooterForLoggedin />
          </>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p>Login First</p>
          </div>
        )}
      </div>
    </div>
  );
  }
