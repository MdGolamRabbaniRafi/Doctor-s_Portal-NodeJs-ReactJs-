import React, { useState, useEffect } from 'react';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authentication';
import axios from 'axios';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { faHistory } from '@fortawesome/free-solid-svg-icons';





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

  // const handleBack = () => {
  //   router.push('../Doctor/LoggedinPage');
  // };

  // const HandleCheckEmail = () => {
  //   router.push('../Doctor/Check_email_history');
  // };

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
<div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <p className="btn btn-ghost normal-case text-xl">Send Email</p>
    
  </div>
 
</div>
      {checkUser() ? (
        <>
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
<div className="flex justify-center">
  <textarea
    className="textarea textarea-info" placeholder='Write your mail'
    id="body"
    name="body"
    value={Body}
    required
    onChange={handleChangeBody}
    rows={15}
    cols={50}
    style={{ resize: 'both' }}
  />
</div>
<br />


            {/* <button type="submit"  className="btn btn-primary bg-blue-500 flex items-center space-x-1" style={{ width: '160px', height: '40px' }} onClick={HandleCheckEmail}>
            <FontAwesomeIcon icon={faHistory} className="w-4 h-4" />
  <span className="ml-1">Check History</span></button>
<br /> */}

<div className="flex justify-center">
  <button
    type="submit"
    className="btn btn-outline btn-success flex items-center space-x-1"
  >
    <span>Send</span>
  </button>
</div>

<br />
<br />


<br />
            {/* <button type="button"  style={{ width: '100px', height: '10px' }} onClick={handleBack}className="btn btn-primary">  <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            <span className="ml-1">Back</span>
             </button> */}

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
