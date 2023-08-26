import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';

export default function AddAppointment() {
  const [name, setName] = useState('');
  const [Link, setLink] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const { checkUser } = useAuth();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  
  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleBack = () => {
    router.push('../Doctor/LoggedinPage');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !Link) {
      setError('All fields are required');
    } else {
      setError('');

      try {
        const response = await axios.post(
          'http://localhost:3000/Doctor/addArticle',
          {
            name: name,
            Link: Link,
          },
          {
            withCredentials: true,
          }
        );

        console.log('Backend Response:', response);
        router.push('../Doctor/LoggedinPage');
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred during Add Article. Please try again later.');
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
          <h1>Add Appointment</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={handleChangeName}
            /><br />

            <label htmlFor="Link">Article Link:</label>
            <input
              type="text"
              id="Link"
              name="Link"
              value={Link}
              required
              onChange={handleChangeLink}
            /><br />

            <input type="submit" value="Confirm" />
            <button type="button" onClick={handleBack}>Back</button>
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
