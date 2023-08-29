import { useState } from 'react';
import axios from 'axios';
import dynamic from "next/dynamic";
import SessionCheck from '../utils/session';

export default function Email() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const Title = dynamic(()=>import('../Layout/Admin_Title'),{

    ssr: false,
  
  });


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
        const response = await axios.post('http://localhost:3000/Admin/sendemail', {
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
    <><SessionCheck></SessionCheck>  
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4"><Title page =" Email"></Title></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label htmlFor="Link" className="input-group input-group-sm">              
          <span>To:</span>
            <input
              type="email"
              id="email"
              name="email"
              value={to}
              required
              onChange={handleChangeTo}
              className="input input-bordered input-sm"            />
              </label>
          </div>
          <div className="mb-4">
          <label htmlFor="Link" className="input-group input-group-sm">              
          <span>Subject:</span>
            <input
              type="email"
              id="email"
              name="email"
              value={to}
              required
              onChange={handleChangeSubject}
              className="input input-bordered input-sm"            />
              </label>
          </div>
          <div className="mb-4">
          <label htmlFor="Link" className="input-group input-group-sm">
             <span> Text:</span>
            
            <textarea
              id="text"
              name="text"
              value={text}
              required
              onChange={handleChangeText}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-outline btn-accent "
          >
            Send Email
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </div>
    </div></>

  );
}
