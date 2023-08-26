import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteAppointment() {
  const [serialNumber, setSerialNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSerialNumberChange = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:3000/Patient/deleteOneAppointment/${serialNumber}`);
      console.log('Backend Response:', response.data);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setSuccessMessage('');
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 mt-24">
      <h2 className="text-xl font-semibold">Delete Appointment</h2>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label htmlFor="serialNumber" className="block font-semibold text-gray-600">Serial Number:</label>
          <input type="number" id="serialNumber" name="serialNumber" value={serialNumber} onChange={handleSerialNumberChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <button type="submit" className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
          Delete Appointment
        </button>
      </form>
    </div>
  );
}
