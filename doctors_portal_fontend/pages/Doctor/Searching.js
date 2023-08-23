import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
//import { useAuth } from '../utils/authentication';
export default function Searching() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
 // const { user } = useAuth(); 


  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleBack = (e) => {
    router.push('../Doctor/LoggedinPage');
  };
  const handleSubmit = async (e) => {
 

    if (!email) {
      setError('All fields are required');
    } else {
      setError('');

      try {
       // const userEmail = user.email;
        const response = await axios.post(`http://localhost:3000/Doctor/Searching/${email}`,
        {
          withCredentials: true,
        }
        );

        console.log("Backend Response:", response);
        console.log(5418525)

        if (response.data === "User Not Found") {
          setError('user Does not found');
        } else {
          router.push('../Doctor/Found_user');
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response); 
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <HeaderForLoggedin></HeaderForLoggedin>
      <h1>Searching</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} required onChange={handleChangeEmail} placeholder='Enter a Email' /><br />
        <input type="submit" value="Search" />
        <button type="button" onClick={handleBack}>Back</button>
      </form>
      {error && <p>{error}</p>}
      <FooterForLoggedin></FooterForLoggedin>
    </div>
  );
}
