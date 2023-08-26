import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ViewUser() {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState('Doctor'); 
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [userType]); 

  const fetchData = async () => {
    try {
      const response = await axios.get(
        userType === 'Doctor'
          ? 'http://localhost:3000/Admin/viewallDoctor'
          : 'http://localhost:3000/Admin/viewallPatient',
        {
          withCredentials: true,
        }
      );

      if (Array.isArray(response.data)) {
        const userData = response.data;

        if (userData.length > 0) {
          setUsers(userData);
          setError('');
        } else {
          setUsers([]);
          setError(`No ${userType}s found`);
        }
      } else {
        setUsers([]);
        setError('Something is wrong');
      }
    } catch (error) {
      console.error('Failed:', error);
      setUsers([]);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleUserTypeToggle = () => {
    setUserType(userType === 'Doctor' ? 'Patient' : 'Doctor');
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm(`Are you sure you want to delete this ${userType}?`);
    if (!confirmed) {
      return; // User canceled the deletion
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/Admin/${userType}/${id}`, {
          withCredentials: true,
        }
      );

      if (response) {
        setError(`${userType} deleted successfully`);
        fetchData();
      } else {
        setError(`Could not delete ${userType}`);
      }
    } catch (error) {
      console.error('Failed:', error);
      setError(`Not allowed to remove this ${userType}`);    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-semibold mb-4">{userType === 'Doctor' ? 'Doctors' : 'Patients'}</h1>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Toggle to view {userType === 'Doctor' ? 'Patients' : 'Doctors'}</span>
            <input type="checkbox" className="toggle" checked={userType === 'Patient'} onChange={handleUserTypeToggle} />
          </label>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex items-center justify-between bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md mb-4">
          <span className="text-lg font-semibold">Total {userType}</span>
          <span className="text-3xl font-bold">{users.length}</span>
        </div>
        <ul className="space-y-4">
          {users.map((userItem, index) => (
            <li key={index} className="p-4 bg-gray-200 shadow-md rounded-md relative">
              <div className="flex justify-between items-center mb-2">
                <div className="countdown font-mono text-6xl" style={{ '--value': index + 1 }}>
                  <span style={{ '--value': index + 1 }}></span>
                </div>
                <div>
                  <div className="text-gray-600">
                    {userType === 'Doctor' ? 'Degree' : 'Blood Group'}: {userType === 'Doctor' ? userItem.Degree : userItem.Blood_group}
                  </div>
                  <p className="text-gray-600">Email: {userItem.email}</p>
                </div>
              </div>
              <p className="text-gray-600"> ID: {userItem.id}</p>
              <div className='font-semibold text-blue-600'>
                <Link href={`/Admin/Info/${userItem.id}?userType=${userType}`}>
                  {userType === 'Doctor' ? 'Doctor' : 'Patient'}: {userItem.name}
                </Link>
              </div>
              <button
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                onClick={() => deleteUser(userItem.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
