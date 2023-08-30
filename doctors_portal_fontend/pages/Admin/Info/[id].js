import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserInfo() {
  const router = useRouter();
  const { id, userType } = router.query;
  const [userData, setUserData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Admin/${userType}/${id}`, {
        withCredentials: true,
      });

      if (response.data) {
        setUserData(response.data);
        setUpdatedData(response.data);
        setError('');
      } else {
        setError('User data not found');
      }
    } catch (error) {
      console.error('Failed:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleChangeDegree = (e) => {
    setUpdatedData({ ...updatedData, Degree: e.target.value });
  };

  const handleChangeBloodGroup = (e) => {
    setUpdatedData({ ...updatedData, Blood_group: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/Admin/${userType}/${id}`,
        updatedData
      );

      if (response) {
        setError(`${userType} updated successfully`);
      } else {
        setError(`Could not update ${userType}`);
      }
    } catch (error) {
      console.error('Failed:', error);
      setError('Failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Edit {userType} Information</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleUpdateSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={updatedData.name || ''}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {userType === 'Doctor' ? 'Degree' : 'Blood Group'}:
            </label>
            {userType === 'Doctor' ? (
              <select
                id="Degree"
                name="Degree"
                required
                onChange={handleChangeDegree}
                className="w-full px-3 py-2 border rounded-md"
                value={updatedData.Degree || ''}
              >
                <option value="">Select Degree</option>
                <option value="MBBS">MBBS</option>
                <option value="FCPS">FCPS</option>
                <option value="phd">Ph.D</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <select
                id="Blood_group"
                name="Blood_group"
                required
                onChange={handleChangeBloodGroup}
                className="w-full px-3 py-2 border rounded-md"
                value={updatedData.Blood_group || ''}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={updatedData.email || ''}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, email: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
