import React, { useState, useEffect } from 'react';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authentication';
import axios from 'axios';

export default function Send_email() {
  const [Subject, setSubject] = useState('');
  const [email, setemail] = useState('');
  const [Body, setBody] = useState('');
  const { checkUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleChangeEmail = (e) => {
    setemail(e.target.value);
  };

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleChangeBody = (e) => {
    setBody(e.target.value);
  };

  const handleBack = () => {
    router.push('../Doctor/LoggedinPage');
  };

  const HandleCheckEmail = () => {
    router.push('../Doctor/Check_email_history');
  };

  useEffect(() => {
    console.log('CheckUser::::' + checkUser());
    if (!checkUser()) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !Body || !Subject) {
      setError('All fields are required');
    } else {
      setError('');

      try {
        const response = await axios.post(
          'http://localhost:3000/Doctor/sendEmail',
          {
            to: email,
            subject: Subject,
            text: Body,
          },
          {
            withCredentials: true,
          }
        );

        console.log('Backend Response:', response);

        if (response.data === "Email doesn't sent") {
          setError('Email does not Sent');
        } else {
          router.push('../Doctor/LoggedinPage');
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred during sending email. Please try again later.');
      }
    }
  };

  return (
    <div>
      <HeaderForLoggedin />
      {checkUser() ? (
        <>
          <h1>Send Email</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Subject">Subject:</label>
            <input
              type="text"
              id="Subject"
              name="Subject"
              value={Subject}
              required
              onChange={handleChangeSubject}
            /><br />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={handleChangeEmail}
            /><br />

            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              name="body"
              value={Body}
              required
              onChange={handleChangeBody}
              rows={5}
            /><br />

            <button type="submit" onClick={HandleCheckEmail}>
              Check Email History
            </button><br />

            <button type="submit">Send</button><br />
            <button type="button" onClick={handleBack}>Back</button>

            {error && <p>{error}</p>}

          </form>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p>Login First</p>
        </div>
      )}
      <FooterForLoggedin />
    </div>
  );
}
