import React, { useState } from 'react';
import axios from 'axios';

export default function PaymentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [makePayment, setMakePayment] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMakePaymentChange = (e) => {
    setMakePayment(e.target.value);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !makePayment) {
      setError('All fields are required');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/Patient/payment', {
          name: name,
          email: email,
          makePayment: makePayment,
        });

        console.log('Payment Response:', response);
        setError('Payment Successful!');
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred during payment. Please try again later.');
      }
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 mt-24">
      <h2 className="text-xl font-semibold">Payment Form</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-600">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={handleNameChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <div>
          <label htmlFor="email" className="block font-semibold text-gray-600">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <div>
          <label htmlFor="makePayment" className="block font-semibold text-gray-600">Make Payment:</label>
          <input type="text" id="makePayment" name="makePayment" value={makePayment} onChange={handleMakePaymentChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Make Payment
        </button>
      </form>
    </div>
  );
}
