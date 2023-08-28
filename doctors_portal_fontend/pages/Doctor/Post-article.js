import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import { useAuth } from '../utils/authentication';
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"


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
    <>
      {checkUser() ? (
        <>
            <NavigationBarLoggedin />
            <div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <a className="btn btn-ghost normal-case text-xl">Post Article</a>
  </div>
 
</div>
          <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-black shadow-md rounded-md">
              <h1 className="text-2xl font-semibold mb-4">Post Article</h1>
              <div className="form-control">
                <label htmlFor="name" className="input-group input-group-sm">
                  <span>Name:</span>
                  <input
                    type="text"
                    className="input input-bordered input-sm"
                    id="name"
                    name="name"
                    value={name}
                    required
                    onChange={handleChangeName}
                  />
                </label>
              </div>
              <br />
              <div className="form-control">
                <label htmlFor="Link" className="input-group input-group-sm">
                  <span>Article Link:</span>
                  <input
                    type="text"
                    className="input input-bordered input-sm"
                    id="Link"
                    name="Link"
                    value={Link}
                    required
                    onChange={handleChangeLink}
                  />
                </label>
              </div>
              <br />
              <input type="submit" className="btn btn-outline btn-accent " value="Post" />
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <FooterForLoggedin />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="text-lg font-semibold">Login First</p>
        </div>
      )}
    </>
  );
  
}
