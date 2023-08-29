import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authentication';
import SessionCheck from "../utils/session";

export default function Profile() {
  const [adminInfo, setAdminInfo] = useState({});
  const [error, setError] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('http://localhost:3000/Admin/myphoto');
  const router = useRouter();
  const [selectedFile, setSelectFile] = useState(null);
  const { user } = useAuth();

  const handleEditProfile = () => {
    router.push('/Admin/Admin_Edit_Profile');
  };

  const handleProfilePicture = (e) => {
    e.preventDefault();
    setSelectFile(e.target.files[0]);
  };

  async function postData() {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.put(
        `http://localhost:3000/Admin/changePicture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);

      if (data.photoUrl) {
        setProfilePhoto(data.photoUrl);
      }

      setSelectFile(null);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Admin/ViewMyProfile`, {
        withCredentials: true,
      });
      if (response.data && response.data.admin) {
        setAdminInfo(response.data.admin);
        if (response.data.admin.profile && response.data.admin.profile.photo) {
          setProfilePhoto(response.data.admin.profile.photo);
        }
      } else {
        setError('Admin information not found');
      }
    } catch (error) {
      console.error('Failed:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <SessionCheck></SessionCheck>
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10">
      <center>
        <div className='px-6'>
          <div className="w-32 h-32 rounded-full px-3 bg-gray-700 flex items-center justify-center overflow-hidden">
            {profilePhoto && (
              <img
                src={profilePhoto}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </center>

      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow mt-4">
        <button
          onClick={handleEditProfile}
          className="float-right text-blue-500 hover:underline"
        >
          Edit
        </button>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {adminInfo.profile && (
          <>
            <div className="ml-8">
              <h1 className="text-3xl font-semibold text-gray-900">{adminInfo.name}</h1>
              <p className="text-gray-800">{adminInfo.email}</p>
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-xl font-semibold">Bio</h2>
              <p className="text-gray-600 mt-2">{adminInfo.profile.bio}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Location:</p>
                <p className="text-gray-600">{adminInfo.profile.location}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Website:</p>
                <a
                  href={adminInfo.profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {adminInfo.profile.website}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Education:</p>
                <p className="text-gray-600">{adminInfo.profile.education}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Experience:</p>
                <p className="text-gray-600">{adminInfo.profile.experience}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Blood Group:</p>
                <p className="text-gray-600">{adminInfo.Blood_group}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Degree:</p>
                <p className="text-gray-600">{adminInfo.Degree}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Gender:</p>
                <p className="text-gray-600">{adminInfo.Gender}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">User:</p>
                <p className="text-gray-600">{adminInfo.User}</p>
              </div>

              <div className="mb-4">
                <div className="space-y-2">
                  <p className="text-gray-600 font-semibold">New photo:</p>
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="myfile"
                      name="myfile"
                      className="file-input file-input-bordered file-input-primary file-input-xs w-full max-w-xs"
                      accept="image/*"
                      onChange={handleProfilePicture}
                    />

                    {selectedFile && (
                      <button
                        className="btn btn-xs ml-4"
                        onClick={postData}
                        disabled={!selectedFile}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
}
