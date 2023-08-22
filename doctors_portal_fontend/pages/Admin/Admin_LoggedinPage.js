import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';
import HomeLogo from '../Layout/HomeLogo';
import Admin_NavigationBar from '../Layout/Admin_LoggedinNavbar';

export default function LoggedinPage() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      setError('All fields are required');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/Admin/addNotice', {
          subject: subject,
          message: message,
        },
        {
            withCredentials: true
          });

        console.log('Backend Response:', response);

        router.push('/Admin/Admin_NoticeBoard');
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
      }
    }
  };

  return (
    <>
      <title>Admin</title>
      <Admin_NavigationBar />

      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <div className="mb-4 text-center">
            <div className="avatar indicator">
              <div className="w-20 h-20 rounded-lg">
                <img src="/noticeAv.jpg" alt="Notice Avatar" />
              </div>
            </div>
            <h1 className="text-3xl font-semibold mt-4">Post a Notice</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-600 font-semibold mb-2">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                required
                onChange={handleChangeSubject}
                placeholder="Enter subject"
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-green-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-600 font-semibold mb-2">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                required
                onChange={handleChangeMessage}
                placeholder="Enter message"
                rows="4"
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-green-700 text-white"
              ></textarea>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Post
            </button>
          </form>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => handleNavigation('/Admin/Admin_LoggedinPage')}
              className="btn btn-primary"
            >
              Back
            </button>
            <button
              onClick={() => handleNavigation('/Admin/Admin_NoticeBoard')}
              className="btn btn-primary"
            >
              Notice Board
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
