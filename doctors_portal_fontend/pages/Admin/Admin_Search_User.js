import React, { useState } from 'react';
import axios from 'axios';

export default function DoctorInfo() {
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userType, setUserType] = useState('doctor'); // Default to doctor
  const [error, setError] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserTypeToggle = () => {
    setUserType(userType === 'doctor' ? 'patient' : 'doctor');
    setUserId(''); 
    setUserInfo(null);
    setError('');
  };

  const handleFetchUser = async () => {
    if (!userId) {
      setError('Please enter a valid ID');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/Admin/${userType}/${userId}`, {
        withCredentials: true,
      });
      setUserInfo(response.data);
      setError('');
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError(`An error occurred. ${userType} not found.`);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 mt-24">
      <div className="flex justify-end">
       
        <div className="ml-2 form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Toggle to search</span>
            <input
              type="checkbox"
              className="toggle"
              checked={userType === 'doctor'}
              onChange={handleUserTypeToggle}
            />
          </label>
        </div>
      </div>

      <h2 className="text-xl font-semibold">
        {userType === 'doctor' ? 'Doctor' : 'Patient'} Info
      </h2>

      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-4">
        <div>
          <label htmlFor="userId" className="block font-semibold text-gray-600">
            {userType === 'doctor' ? 'Doctor ID:' : 'Patient ID:'}
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={handleUserIdChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Search button */}
        <button
          type="button"
          onClick={handleFetchUser}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Search
        </button>

        {/* User information */}
{userInfo && (
  <div className="mt-4 bg-gray-900 text-white p-4 rounded-md">
    <h3 className="font-semibold text-lg">
      {userType === 'doctor' ? 'Doctor' : 'Patient'} Information
    </h3>
    <div className="grid grid-cols-2 gap-4 mt-3">
      <div>
        <p className="font-medium">ID:</p>
        <p>{userInfo.id}</p>
      </div>
      <div>
        <p className="font-medium">Name:</p>
        <p>{userInfo.name}</p>
      </div>
      <div>
        <p className="font-medium">Email:</p>
        <p>{userInfo.email}</p>
      </div>
      <div>
        <p className="font-medium">Gender:</p>
        <p>{userInfo.Gender}</p>
      </div>
      {userType === 'doctor' && (
        <div>
          <p className="font-medium">Degree:</p>
          <p>{userInfo.Degree}</p>
        </div>
      )}
      {userType === 'patient' && (
        <div>
          <p className="font-medium">Blood Group:</p>
          <p>{userInfo.Blood_group}</p>
        </div>
      )}
    </div>
  </div>
)}

      </div>
    </div>
  );
}
