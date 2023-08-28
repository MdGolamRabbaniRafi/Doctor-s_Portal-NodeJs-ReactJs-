import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import SessionCheck from '../utils/session';

import dynamic from "next/dynamic";


const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});

export default function EmailHistory() {
  const [EmailData, setEmailData] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const index=0


  useEffect(() => {

      fetchData();
    
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Doctor/ChechEmailHistory`, {
        withCredentials: true,
      });
      console.log("Backend Response:", response.data);

      if (Array.isArray(response.data)) {
        const emailHistoryData = response.data;
        console.log("Email History Data:", emailHistoryData);

        if (emailHistoryData.length > 0) {
          console.log("Email History Data:", emailHistoryData);
          setEmailData(emailHistoryData);
        } else {
          setError('No Email Data found');
        }
      } else {
        setError('No Email Data found');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Title page ="Email History"></Title>

          <SessionCheck></SessionCheck>
        <>
          {/* <HeaderForLoggedin /> */}
          <NavigationBarLoggedin></NavigationBarLoggedin>
          <div className="bg-black-100 h-screen w-screen  justify-between">


          <div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <a className="btn btn-ghost normal-case text-xl">Email History</a>
  </div>
 
</div>
          {error && <p  className="text-red-500">{error}</p>}
          <ul className="space-y-4">
            {EmailData.map((emailData,index) => (
              <li key={emailData.id}>
                {emailData.mail.map((email,index) => (
                  <div key={email.Serial}>

<li key={email.Serial} className="p-4 bg-black-200 shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <span className="text-black font-semibold text-base">
          Email : <span className="text-blue-500">{index + 1}</span>
        </span>
        <span className="text-gray-600 text-xs">
         Date: {email.Date} <br></br>Time: {email.Time}
        </span>
      </div>
      Send to: {email.to}<br />
      Subject: {email.subject}<br />
      Body: {email.text}<br />

      <br />
    </li>


                    {/* Sent to: {email.to}<br />
                    Subject: {email.subject}<br />
                    Body: {email.text}<br /> */}
                    <br />
                  </div>
                ))}
              </li>
            ))}
          </ul>
          <FooterForLoggedin />
          </div>

        </>
     
    </div>
  );
}
