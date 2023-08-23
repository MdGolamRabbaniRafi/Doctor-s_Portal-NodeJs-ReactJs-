import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';

export default function EmailHistory() {
  const [EmailData, setEmailData] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleBackClick = () => {
    router.push('../Doctor/Send_email');
  };

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
        const EmailData = response.data;
        console.log("EmailData Data:", EmailData);

        if (EmailData.length > 0) {
          console.log("EmailData:", EmailData);
          setEmailData(EmailData);
        } else {
          setError('No EmailData found');
        }
      } else {
        setError('No EmailData found');
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
      <h1>Email History</h1>
      {error && <p>{error}</p>}
      <ul>
        {EmailData.map((emailData) => (
          <li key={emailData.id}>
            {emailData.mail.map((email) => (
              <div key={email.Serial}>
                Sent to: {email.to}<br />
                Subject: {email.subject}<br />
                Body: {email.text}<br />
                Date: {email.Date}<br />
                Time: {email.Time}<br />
                <br />
              </div>
            ))}
          </li>
        ))}
      </ul>
      <input type="submit" value="Back" onClick={handleBackClick} />
      <FooterForLoggedin></FooterForLoggedin>
    </div>
  );
}
