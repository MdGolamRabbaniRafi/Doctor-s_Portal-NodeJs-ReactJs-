import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import SessionCheck from '../utils/session';
import dynamic from "next/dynamic";
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';

const Title = dynamic(() => import('../Layout/Doctor_Title'), {
  ssr: false,
});

export default function Edit_profile() {
  const router = useRouter();

  const [UpdateName, setName] = useState('');
  const [UpdateGender, setGender] = useState('');
  const [UpdateDegree, setDegree] = useState('');
  const [UpdateBlood, setBlood] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Doctor/ViewProfile`, {
        withCredentials: true,
      });

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

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  const handleChangeDegree = (e) => {
    setDegree(e.target.value);
  };
  const handleChangeBlood = (e) => {
    setBlood(e.target.value);
  };

  const handleBackClick = () => {
    router.push('../Doctor/LoggedinPage');
  };

  const handleEditForm = async (event) => {
    event.preventDefault();
    if (!UpdateGender || !UpdateDegree || !UpdateBlood || !UpdateName) {
      setError('All fields are required');
    } else {
      try {
        const response = await axios.put(`http://localhost:3000/Doctor/Edit`, {
          Blood_group: UpdateBlood,
          Gender: UpdateGender,
          Degree: UpdateDegree,
          name: UpdateName
        }, {
          withCredentials: true,
        });

        setError('');
        router.push('../Doctor/profile');
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <Title page="Edit Profile"></Title>
      <SessionCheck></SessionCheck>
      <NavigationBarLoggedin></NavigationBarLoggedin>
      <div className="navbar bg-teal-800 shadow-xl">
        <div className="navbar-start">
          <div className="dropdown">
            {/* Dropdown content */}
          </div>
          <a className="btn btn-ghost normal-case text-xl">Edit Profile</a>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="flex flex-col items-center justify-center min-h-screen">
                  <div className="form-control">
                    <label htmlFor="name" className="input-group input-group-sm">
                      <span>Name</span>
                      <input type="name" id="name" value={UpdateName} required onChange={handleChangeName} className="input input-bordered input-sm" />
                      <br />
                    </label>
                  </div>
                  <div className="mb-4">
  <label className="block font-medium mb-1">Gender:</label>
  <div className="flex">
    <label htmlFor="male" className="mr-4 flex items-center">
      <input
        type="radio"
        id="male"
        name="Gender"
        value="male"
        checked={UpdateGender === "male"}
        onChange={handleChangeGender}
        className="form-radio"
      />
      <span className="ml-2">Male</span>
    </label>
    <label htmlFor="female" className="mr-4 flex items-center">
      <input
        type="radio"
        id="female"
        name="Gender"
        value="female"
        checked={UpdateGender === "female"}
        onChange={handleChangeGender}
        className="form-radio"
      />
      <span className="ml-2">Female</span>
    </label>
    <label htmlFor="other" className="flex items-center">
      <input
        type="radio"
        id="other"
        name="Gender"
        value="other"
        checked={UpdateGender === "other"}
        onChange={handleChangeGender}
        className="form-radio"
      />
      <span className="ml-2">Other</span>
    </label>
  </div>
</div>
<div className="mb-4">
  <label htmlFor="Degree" className="block font-medium mb-1">Degree:</label>
  <select
    id="Degree"
    name="Degree"
    required
    onChange={handleChangeDegree}
    value={UpdateDegree}
    className="input input-bordered w-full"
  >
    <option value="">Select Degree</option>
    <option value="MBBS">MBBS</option>
    <option value="FCPS">FCPS</option>
    <option value="phd">Ph.D</option>
    <option value="other">Other</option>
  </select>
</div>
<div className="mb-4">
  <label htmlFor="Blood_group" className="block font-medium mb-1">Blood Group:</label>
  <select
    id="Blood_group"
    name="Blood_group"
    required
    onChange={handleChangeBlood}
    value={UpdateBlood}
    className="input input-bordered w-full"
  >
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
                  <div className="mt-6 flex space-x-4">

                  <input type="submit"                   className="btn btn-primary" value="Save" onClick={handleEditForm} />
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterForLoggedin />
    </div>
  );
}
