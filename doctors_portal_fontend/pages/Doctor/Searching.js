import axios from 'axios';
import React, { useState, useEffect } from 'react'; // Import useEffect from 'react'
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';

export default function Searching() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const { checkUser } = useAuth();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleBack = (e) => {
    router.push('../Doctor/LoggedinPage');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('All fields are required');
    } else {
      setError('');

      try {
        const response = await axios.get(`http://localhost:3000/Doctor/Searching/${email}`, {
          withCredentials: true,
        });

        console.log('Backend Response:', response);
        console.log(5418525);

        if (response.data === 'User Not Found') {
          setError('User does not found');
        } else {
          console.log('Response Data:', response.data);
          router.push({
            pathname: '../Doctor/Found_user',
            query: {
              data: JSON.stringify(response.data),
            },
          });
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  useEffect(() => {
    console.log('CheckUser::::' + checkUser());
    if (!checkUser()) {
      router.push('/');
    }
  }, []);

  return (
    <div>
      {checkUser() ? (
        <>
          <HeaderForLoggedin></HeaderForLoggedin>
          <h1>Searching</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={handleChangeEmail}
              placeholder="Enter an Email"
            />
            <br />
            <input type="submit" value="Search" />
            <button type="button" onClick={handleBack}>
              Back
            </button>
          </form>
          {error && <p>{error}</p>}
          <FooterForLoggedin></FooterForLoggedin>
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
