import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function OrderMedicineForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderMedicine, setorderMedicine] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMedicineChange = (e) => {
    setorderMedicine(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !orderMedicine) {
      setError('All fields are required');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/Patient/orderMedicine', {
          name: name,
          email: email,
          orderMedicine: orderMedicine,
        });

        console.log('Backend Response:', response);
     
        setName('');
        setEmail('');
        setorderMedicine('');
 
        setError('Medicine Order Submitted Successfully! Thank you.');
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 mt-24">
      <h2 className="text-xl font-semibold">Order Medicine Form</h2>
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
          <label htmlFor="orderMedicine" className="block font-semibold text-gray-600">Order Medicine:</label>
          <input type="text" id="orderMedicine" name="orderMedicine" value={orderMedicine} onChange={handleMedicineChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Order Medicine
        </button>
      </form>
    </div>
  );
}
