import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import Link from 'next/link';
import dynamic from "next/dynamic";
import SessionCheck from '../utils/session';
export default function AddAppointment() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const Title = dynamic(()=>import('../Layout/Admin_Title'),{

    ssr: false,
  
  });


  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleBack = () => {
    router.push('../Admin/Admin_LoggedinPage');
  };

  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);

    return (
      password.length >= minLength && hasUppercase && hasLowercase && hasDigit
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match. Please make sure they match.");
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and contain uppercase, lowercase, and a digit.'
      );
      return;
    }

    try {
      const updateData = {};

      if (password) {
        updateData.password = password;
      }

      if (Object.keys(updateData).length === 0) {
        setErrorMessage('Please enter at least one field to update.');
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/Admin/EditPass`,
        updateData,
        {
          withCredentials: true,
        }
      );

      console.log('Backend Response:', response);
      setSuccessMessage('Update successful.');
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setErrorMessage(
        'An error occurred during the update. Please try again later.'
      );
    }
  };

  return (
    <div>
      <SessionCheck></SessionCheck>
      <center>      <HeaderForLoggedin /> </center>

      <div className="mx-auto p-8 max-w-md">
        <h1 className="text-2xl font-semibold mb-4"><Title page ="Give a new password"></Title></h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              New password:
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered input-primary w-full "
              id="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Type here"
              className="input input-bordered input-primary w-full "
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
            />
          </div>

          <div className="flex space-x-4">
            <input
              type="submit"
              value="Confirm"
              className="btn btn-primary"
            />
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-secondary"
            >
              Back
            </button>
          </div>
        </form>

        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}
