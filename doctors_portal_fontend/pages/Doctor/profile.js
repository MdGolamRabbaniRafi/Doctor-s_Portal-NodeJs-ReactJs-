import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SessionCheck from '../utils/session';
import dynamic from "next/dynamic";


const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});

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

  useEffect(() => {
   

      fetchData(user);
    
  }, []); 

  return (
    <div>
      <SessionCheck></SessionCheck>
      <Title page ="Profile"></Title>

      <NavigationBarLoggedin />
      <div className="navbar bg-teal-800 shadow-xl">
        <div className="navbar-start">
          <div className="dropdown">
            {/* Dropdown content */}
          </div>
          <a className="btn btn-ghost normal-case text-xl">Notifications</a>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <>
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
                    </>

                </div>

              </div>

            </div>      <FooterForLoggedin />


          </div>

        </div>

      </div>

    </div>
  );
      }
