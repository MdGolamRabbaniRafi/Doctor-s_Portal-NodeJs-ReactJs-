import { useState } from 'react';
import axios from 'axios';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';

export default function Email() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleChangeTo = (e) => {
    setTo(e.target.value);
  };

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!to || !subject || !text) {
      setError('All fields are required');
    } else {
      setError('');

      try {
        const response = await axios.post('http://localhost:3000/Patient/sendemail', {
          to: to,
          subject: subject,
          text: text,
        });

        if (response) {
          setError('Success');
        } else {
          setError('Failed');
        }
      } catch (error) {
        console.error('Failed:', error);
        setError('An error occurred during sending email. Please try again later.');
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Send an Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              To:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={to}
              required
              onChange={handleChangeTo}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              required
              onChange={handleChangeSubject}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 font-medium mb-2">
              Text:
            </label>
            <textarea
              id="text"
              name="text"
              value={text}
              required
              onChange={handleChangeText}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Email
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
