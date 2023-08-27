import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import SessionCheck from '../utils/session';
import dynamic from "next/dynamic";


const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});

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
      fetchData();

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
      <Title page ="Patient Profile"></Title>

                <SessionCheck></SessionCheck>
                <NavigationBarLoggedin></NavigationBarLoggedin>

      <div className="navbar bg-teal-800 shadow-xl">
        <div className="navbar-start">
          <div className="dropdown">
            {/* Dropdown content */}
          </div>
          <a className="btn btn-ghost normal-case text-xl">User</a>
        </div>
      </div>

      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                  <div className="flex flex-col items-center justify-center min-h-screen">
                    {error && <p>{error}</p>}
                    <ul className="my-4">
                      <li className="mb-2">
                        Name: {profile.name}<br />
                        Email: {profile.email}<br />
                        Gender: {profile.Gender}<br />
                        Degree: {profile.Degree}<br />
                        Blood Group: {profile.Blood_group}<br />
                        User: {profile.User}<br />
                      </li>
                    </ul>
                  </div>
              </div>
            </div>
            <input type="submit" value="Back" className="btn btn-primary" onClick={handleBackClick} />

          </div>
        </div>
      </div>
    </div>
  );
}
