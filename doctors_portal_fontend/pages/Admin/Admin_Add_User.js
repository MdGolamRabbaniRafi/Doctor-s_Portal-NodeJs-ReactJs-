import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import HomeLogo from '../Layout/HomeLogo';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import PatiLogo from '../Layout/PatientLogo';

export default function AddUser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [degree, setDegree] = useState('');
  const [bloodGroup, setBlood] = useState('');
  const [gender, setGender] = useState('');
  const [userType, setUserType] = useState('Doctor'); 
  const router = useRouter();
  const [error, setError] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeDegree = (e) => {
    setDegree(e.target.value);
  };
  const handleChangeBlood = (e) => {
    setBlood(e.target.value);
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  const handleChangeUserType = (e) => {
    setUserType(e.target.checked ? 'Patient' : 'Doctor');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name || !password || !bloodGroup || !degree || !gender || !userType) {
      setError('All fields are required');
    } else {
      setError('');

      try {
        const response = await axios.post(
          userType === 'Doctor'
            ? 'http://localhost:3000/Admin/adddoctor'
            : 'http://localhost:3000/admin/addpatient',
          {
            name: name,
            password: password,
            email: email,
            Blood_group: bloodGroup,
            Degree: degree,
            Gender: gender,
            User: userType,
          },
          {
            withCredentials: true,
          }
        );

        console.log('Backend Response:', response);

        if (response) {
          setError(userType === 'Doctor' ? 'Doctor added successfully' : 'Patient added successfully');
        } else {
          setError('Could not add');
        }
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('An error occurred while adding');
      }
    }
  };

  return (
    <>
      <title>Manage</title>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-4 bg-slate-900 shadow-md rounded-md"
              >
        <div className="mb-2">
          <center>
          <span className="label-text">{userType === 'Doctor' ? <HomeLogo></HomeLogo> : <PatiLogo></PatiLogo>}</span>
            <h2 className="text-2xl font-bold mb-2">Add {userType}</h2>
          </center>

          <div className="signup-as max-w-md mx-auto mt-4 p-4 bg-slate-900 shadow-md rounded-lg">
            <div className="flex">
              <div className="flex flex-col">
                <div className="form-control w-52">
                  <label className="cursor-pointer label">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={userType === 'Patient'}
                      onChange={handleChangeUserType}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">Name:</label>
          <input type="text" id="name" name="name" value={name} required onChange={handleChangeName} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">Email:</label>
          <input type="email" id="email" name="email" value={email} required onChange={handleChangeEmail} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Gender:</label>
          <div className="flex">
            <label htmlFor="male" className="mr-4">
              <input type="radio" id="male" name="Gender" value="male" required onChange={handleChangeGender} /> Male
            </label>
            <label htmlFor="female" className="mr-4">
              <input type="radio" id="female" name="Gender" value="female" required onChange={handleChangeGender} /> Female
            </label>
            <label htmlFor="other">
              <input type="radio" id="other" name="Gender" value="other" required onChange={handleChangeGender} /> Other
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="Blood_group" className="block font-medium mb-1">Blood Group:</label>
          <select id="Blood_group" name="Blood_group" required onChange={handleChangeBlood} className="w-full px-3 py-2 border rounded-md">
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
        </div>

        <div className="mb-4">
          <label htmlFor="Degree" className="block font-medium mb-1">Degree:</label>
          <select id="Degree" name="Degree" required onChange={handleChangeDegree} className="w-full px-3 py-2 border rounded-md">
            <option value="">Select Degree</option>
            <option value="MBBS">MBBS</option>
            <option value="FCPS">FCPS</option>
            <option value="phd">Ph.D</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handleChangePassword} required className="w-full px-3 py-2 border rounded-md" />
        </div>

       

        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-6">
          <input
            type="submit"
            value={`Add ${userType}`}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          />
        </div>
      </form>
    </>
  );
}
