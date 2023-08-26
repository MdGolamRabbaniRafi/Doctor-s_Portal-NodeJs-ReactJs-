import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';
import HomeLogo from '../Layout/HomeLogo';
import Admin_NavigationBar from '../Layout/Admin_LoggedinNavbar';
import Link from 'next/link';

// import { useRouter } from 'next/router';

export default function AddProfile() {
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [image, setImage] = useState(null); // Initialize image state with null
  const [education, setEducation] = useState('');

  const handleChangeBio = (e) => {
    setBio(e.target.value);
  };

  const handleChangeExperience = (e) => {
    setExperience(e.target.value);
  };

  const handleChangeWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleChangeEducation = (e) => {
    setEducation(e.target.value);
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]); // Update image state with selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bio || !location || !experience || !education || !website || !image) {
      setError('All fields are required');
    } else {
      try {
        const formData = new FormData(); // Create FormData to send the image
        formData.append('bio', bio);
        formData.append('location', location);
        formData.append('experience', experience);
        formData.append('education', education);
        formData.append('website', website);
        formData.append('image', image);

        const response = await axios.post(
          'http://localhost:3000/Admin/addProfile',
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data', // Set appropriate content type
            },
          }
        );

        console.log('Backend Response:', response);

        router.push('/Admin/Admin_Profile');
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('Already profile exists')
      }
    }
  };

  return (
    

    
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-semibold mb-4">Add Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio:</label>
          <textarea
            name="bio"
            rows="4"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeBio}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location:</label>
          <input
            type="text"
            name="location"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeLocation}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Website:</label>
          <input
            type="text"
            name="website"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeWebsite}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Experience:</label>
          <input
            type="text"
            name="experience"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeExperience}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Education:</label>
          <input
            type="text"
            name="education"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeEducation}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Photo:</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeImage}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onChange={handleSubmit}
        >
          Add Profile
        </button>
      </form>
    </div>
  </div>
  );
}
