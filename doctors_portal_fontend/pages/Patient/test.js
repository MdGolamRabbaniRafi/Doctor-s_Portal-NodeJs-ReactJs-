import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function TestBookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [testname, setTestName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTestNameChange = (e) => {
    setTestName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !testname) {
      setError('All fields are required');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/Patient/test', {
          name: name,
          email: email,
          testname: testname, // Change to match your database column name
        });

        console.log('Backend Response:', response);
        // Reset form fields after successful submission
        setName('');
        setEmail('');
        setTestName('');
        // Redirect or show a success message
        setError('Test Booking Submitted Successfully! Thank you.');
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 mt-24">
      <h2 className="text-xl font-semibold">Test Booking Form</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-600">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={handleNameChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <div>
          <label htmlFor="email" className="block font-semibold text-gray-600">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <div>
          <label htmlFor="testName" className="block font-semibold text-gray-600">Test Name:</label>
          <input type="text" id="testName" name="testName" value={testname} onChange={handleTestNameChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Book Test
        </button>
      </form>
    </div>
  );
}
