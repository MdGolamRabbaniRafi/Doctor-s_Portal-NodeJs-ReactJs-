import React, { useState } from 'react';
import axios from 'axios';

export default function DoctorInfo() {
  const [doctorId, setDoctorId] = useState('');
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [error, setError] = useState('');

  const handleDoctorIdChange = (e) => {
    setDoctorId(e.target.value);
  };

  const handleFetchDoctor = async () => {
    if (!doctorId) {
      setError('Please enter a valid doctor ID');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/Patient/searchdoctor/${doctorId}`);
      setDoctorInfo(response.data);
      setError('');
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Doctor not found.');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 mt-24">
      <h2 className="text-xl font-semibold"> Doctor Info</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-4">
        <div>
          <label htmlFor="doctorId" className="block font-semibold text-gray-600">Doctor ID:</label>
          <input type="text" id="doctorId" name="doctorId" value={doctorId} onChange={handleDoctorIdChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <button type="button" onClick={handleFetchDoctor} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Search
        </button>

        {doctorInfo && (
          <div className="mt-4">
            <h3 className="font-semibold">Doctor Information</h3>
            <p>ID: {doctorInfo.id}</p>
            <p>Name: {doctorInfo.name}</p>
            <p>Email: {doctorInfo.email}</p>
            <p>Gender: {doctorInfo.Gender}</p>
            <p>Degree: {doctorInfo.Degree}</p>
            
          </div>
        )}
      </div>
    </div>
  );
}
