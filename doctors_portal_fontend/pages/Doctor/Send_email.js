import React, { useState, useEffect } from 'react';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authentication';
import axios from 'axios';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"


export default function Send_email() {
  const [Subject, setSubject] = useState('');
  const [email, setemail] = useState('');
  const [Body, setBody] = useState('');
  const { checkUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

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

  const handleSend = async () => {
    setShowToast(true);
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
        setShowToast(false);
        router.push('../Doctor/LoggedinPage');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred during sending email. Please try again later.');
      setShowToast(false);
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
      {/* <HeaderForLoggedin /> */}
      <NavigationBarLoggedin></NavigationBarLoggedin>

      {checkUser() ? (
        <>
          <h1>Send Email</h1>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>

          <div className="form-control">
  <label className="input-group input-group-sm">
    <span>Email</span>
    <input type="text"  className="input input-bordered input-sm" name="email"
              value={email}
              required
              onChange={handleChangeEmail} placeholder="email@site.com"/>
  </label>
</div>


<br></br>
<div className="form-control">
  <label className="input-group input-group-sm">
    <span>Subject</span>
    <input type="text"  className="input input-bordered input-sm"
              required
               id="Subject"
              name="Subject"
              value={Subject}
              onChange={handleChangeSubject} placeholder="Subject"/>
  </label>
</div>


<br></br>





            <label htmlFor="body"></label>
            <textarea
            className="textarea textarea-success" placeholder='Write your mail'
              id="body"
              name="body"
              value={Body}
              required
              onChange={handleChangeBody}
              rows={10}
              cols={30} 
              style={{ resize: 'both' }}
              
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

      {showToast && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
}
