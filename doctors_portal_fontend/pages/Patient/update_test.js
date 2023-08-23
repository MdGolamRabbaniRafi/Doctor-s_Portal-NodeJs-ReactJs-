import React, { useState } from 'react';
import axios from 'axios';

export default function TestStatusUpdateForm() {
  const [testId, setTestId] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [error, setError] = useState('');
  
  const handleTestIdChange = (e) => {
    setTestId(e.target.value);
  };

  const handleUpdateStatusChange = (e) => {
    setUpdateStatus(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!testId || !updateStatus) {
      setError('All fields are required');
    } else {
      try {
        const response = await axios.put(`http://localhost:3000/Patient/test/${testId}`, {
          update: updateStatus,
        });

        console.log('Update Response:', response);
        setError('Test Status Updated Successfully.');
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 mt-24">
      <h2 className="text-xl font-semibold">Update Test Status</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="testId" className="block font-semibold text-gray-600">Test ID:</label>
          <input type="text" id="testId" name="testId" value={testId} onChange={handleTestIdChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <div>
          <label htmlFor="updateStatus" className="block font-semibold text-gray-600">Update Status:</label>
          <input type="text" id="updateStatus" name="updateStatus" value={updateStatus} onChange={handleUpdateStatusChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Update Status
        </button>
      </form>
    </div>
  );
}
