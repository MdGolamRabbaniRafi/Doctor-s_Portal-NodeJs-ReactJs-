import React from 'react';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; 

export default function Send_email() {
  const [Subject, setSubject] = useState('');
  const [email, setemail] = useState('');
  const [Body, setBody] = useState('');
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
  const handleBack = (e) => {
    router.push('../Doctor/LoggedinPage');
  };

  const HandleCheckEmail = (e) => {
    router.push('../Doctor/Check_email_history');
  };









  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!email || !Body || !Subject) {
      setError('All fields are required');
    } else {
      setError('');

      try {
        const response = await axios.post(`http://localhost:3000/Doctor/sendEmail`, {
          to: email,
          subject: Subject,
          text: Body,
        },
        {
          withCredentials: true,
        }
        );

        console.log("Backend Response:", response);
        console.log(5418525)

        if (response.data === "Email doesn't sent") {
          setError('Email Does not Sent');
        } else {
          router.push('../Doctor/LoggedinPage');
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response); 
        setError('An error occurred during Add appointment. Please try again later.');
      }
    }
  };






  return (
    <div>
          <HeaderForLoggedin></HeaderForLoggedin>

      <h1>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Subject">Subject:</label>
        <input type="text" id="Subject" name="Subject" value={Subject} required onChange={handleChangeSubject}/><br></br>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} required onChange={handleChangeEmail}/><br></br>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          name="body"
          value={Body}
          required
          onChange={handleChangeBody}
          rows={5}
        />
        <br></br>
        <button type="submit" onClick={HandleCheckEmail}>Check Email History</button><br></br>


      

        <button type="submit">Send</button><br></br>
        <button type="button" onClick={handleBack}>Back</button>

        <FooterForLoggedin></FooterForLoggedin>

      </form>
    </div>
  );
}