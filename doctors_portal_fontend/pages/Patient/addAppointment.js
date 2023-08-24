import React, { useState } from 'react';
import axios from 'axios';

export default function AddAppointmentForm() {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePatientNameChange = (e) => {
    setPatientName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/Patient/addAppointment', {
        name: patientName,
        age: parseInt(age),
        email: email,
        date: date,
        time: time,
      });

      console.log('Backend Response:', response);
      setSuccessMessage('Appointment added successfully!');
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
      <h2 className="text-xl font-semibold">Add Appointment</h2>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patientName" className="block font-semibold text-gray-600">Patient Name:</label>
          <input type="text" id="patientName" name="patientName" value={patientName} onChange={handlePatientNameChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <div>
          <label htmlFor="age" className="block font-semibold text-gray-600">Age:</label>
          <input type="number" id="age" name="age" value={age} onChange={handleAgeChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <div>
          <label htmlFor="email" className="block font-semibold text-gray-600">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <div>
          <label htmlFor="date" className="block font-semibold text-gray-600">Date:</label>
          <input type="date" id="date" name="date" value={date} onChange={handleDateChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>

        <div>
          <label htmlFor="time" className="block font-semibold text-gray-600">Time:</label>
          <input type="time" id="time" name="time" value={time} onChange={handleTimeChange} className="w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Add Appointment
        </button>
      </form>
    </div>
  );
}
