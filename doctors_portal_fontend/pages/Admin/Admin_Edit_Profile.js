import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SessionCheck from '../utils/session';
export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    website: '',
    education: '',
    experience: '',
    // filenames: '',
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Admin/ViewMyProfile', {
        withCredentials: true,
      });
      console.log('Response data:', response.data);
      const profileData = response.data[0];
      setFormData({
        bio: profileData.profile.bio,
        location: profileData.profile.location,
        website: profileData.profile.website,
        education: profileData.profile.education,
        experience: profileData.profile.experience,
        // filenames: profileData.profile.filenames,
      });
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:3000/Admin/EditProfile', formData, {
        withCredentials: true,
      });

      console.log('Backend Response:', response);
      router.push('/Admin/Admin_Profile');
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  return (
    <><SessionCheck></SessionCheck>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Bio:</label>
            <textarea
              name="bio"
              rows="4"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.bio}
              onChange={handleChange}
            />
            <label className="block text-sm font-medium text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.location}
              onChange={handleChange}
            />
            <label className="block text-sm font-medium text-gray-700">Website:</label>
            <input
              type="text"
              name="website"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.website}
              onChange={handleChange}
            />
            <label className="block text-sm font-medium text-gray-700">Education:</label>
            <input
              type="text"
              name="education"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.education}
              onChange={handleChange}
            />
            <label className="block text-sm font-medium text-gray-700">Experience:</label>
            <input
              type="text"
              name="experience"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.experience}
              onChange={handleChange}
            />
           
          </div>
          <div className='py-5'>
          <button
            type="submit"
            className="btn btn-outline btn-accent "
          >
            Save Changes
          </button>
          </div>
        </form>
      </div>
    </div></>
  );
}
