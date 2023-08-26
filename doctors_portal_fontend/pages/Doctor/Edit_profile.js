import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import { useEffect } from 'react';


export default function Edit_profile() {
  const router = useRouter();
  const { checkUser } = useAuth();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [degree, setDegree] = useState('');
  const [Blood, setBlood] = useState('');
  const [error, setError] = useState('');


  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  const handleChangeDegree = (e) => {
    setDegree(e.target.value);
  };
  const handleChangeBlood= (e) => {
    setBlood(e.target.value);
  };



  const { user } = useAuth(); 


  console.log('user inside profile:', user);

  const handleBackClick = () => {
    router.push('../Doctor/LoggedinPage');
  };

  useEffect(() => {
    if(!checkUser())
    {
     //  alert('Log in first')
      router.push('/')
    }
    else{
      fetchData();

    }
  }, []);

  
  const fetchData = async () => {
    try {
      const userEmail = user.email;
      console.log("User Email:", userEmail);
  
      const response = await axios.get(`http://localhost:3000/Doctor/ViewProfile/${userEmail}`, {
        withCredentials: true, 
      });
      console.log("Backend Response:", response.data);
      console.log(response.data)
  
      if (response.data && typeof response.data === 'object') {
        setName(response.data.name)
        setGender(response.data.Gender)
        setDegree(response.data.Degree)
        setBlood(response.data.Blood_group)




  
      } else {
        setError('No Profile Data found');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    }
  };










  const handleEditForm = async () => {
    if (!gender || !degree || !Blood||!name) {
      setError('All fields are required');
    } else {
      try {
        const response = await axios.put(`http://localhost:3000/Doctor/Edit`, {
          Blood_group: Blood,
          Gender: gender,
          Degree: degree,
          name:name
        }
        ,{
          withCredentials: true,
        });



          setError('');
          router.push('../Doctor/LoggedinPage')
        }
       catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      {checkUser() ? (
        <>
          <HeaderForLoggedin />
          <h1>Edit Profile</h1>
          <label htmlFor="name">Name:</label>
          <input type="name" id="name" value={name} required onChange={handleChangeName} />
          <br />
  
          <div className="mb-4">
            <label className="block font-medium mb-1">Gender:</label>
            <div className="flex">
              <label htmlFor="male" className="mr-4">
                <input
                  type="radio"
                  id="male"
                  name="Gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleChangeGender}
                />{" "}
                Male
              </label>
              <label htmlFor="female" className="mr-4">
                <input
                  type="radio"
                  id="female"
                  name="Gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleChangeGender}
                />{" "}
                Female
              </label>
              <label htmlFor="other">
                <input
                  type="radio"
                  id="other"
                  name="Gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={handleChangeGender}
                />{" "}
                Other
              </label>
            </div>
          </div>
  
          <div className="mb-4">
            <label htmlFor="Degree" className="block font-medium mb-1">Degree:</label>
            <select id="Degree" name="Degree" required onChange={handleChangeDegree} value={degree}>
              <option value="">Select Degree</option>
              <option value="MBBS">MBBS</option>
              <option value="FCPS">FCPS</option>
              <option value="phd">Ph.D</option>
              <option value="other">Other</option>
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="Blood_group" className="block font-medium mb-1">Blood Group:</label>
            <select id="Blood_group" name="Blood_group" required onChange={handleChangeBlood} value={Blood}>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
  
          {error && <p>{error}</p>}
  
          <input type="submit" value="Save" onClick={handleEditForm} />
  
          <input type="submit" value="Back" onClick={handleBackClick} />
          <FooterForLoggedin />
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
  