import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderForLoggedin from '../Layout/LoggedinHeader';
import FooterForLoggedin from '../Layout/LoggedinFooter';
import Link from 'next/link';
import { useAuth } from '../utils/authentication';

export default function View_all_appointment() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { checkUser } = useAuth();

  const handleBackClick = () => {
    router.push('../Doctor/Appointment');
  };

  const handleEditClick = (appointment) => {
    router.push({
      pathname: '../Doctor/EditAppointment',
      query: {
        serial: appointment.Serial,
        email: appointment.email,
        age: appointment.age,
        date: appointment.date,
        time: appointment.time,
      },
    });
  };

  const handleDeleteClick = (appointment) => {
    router.push({
      pathname: '../Doctor/Delete_one_appointment',
      query: {
        serial: appointment.Serial,
        email: appointment.email,
        age: appointment.age,
        date: appointment.date,
        time: appointment.time,
      },
    });
  };

  useEffect(() => {
    if (!checkUser()) {
      router.push('/');
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Doctor/viewAppointment', {
        withCredentials: true,
      });

      console.log('Backend Response:', response);

      if (Array.isArray(response.data)) {
        console.log(response.data);
        const doctorData = response.data[0];
        if (Array.isArray(doctorData.appointment)) {
          if (doctorData.appointment[0]) {
            setAppointments(doctorData.appointment);
          } else {
            setError('No appointments found');
          }
        } else {
          setError('No appointments found');
        }
      } else {
        setError('Error fetching appointments');
      }
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <HeaderForLoggedin />

      {checkUser() ? (
        <>
          <h1>View Appointments</h1>
          {error && <p>{error}</p>}
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.Serial}>
                Serial: {appointment.Serial}<br />

                Name:
                <Link href={`../Doctor/Dynamic_user/Dynamic/?email=${appointment.email}`}>
                  {appointment.name}
                </Link>
                <br />

                Age: {appointment.age}<br />
                Date: {appointment.date}<br />
                Time: {appointment.time}<br />
                <input type="submit" value="Edit" onClick={() => handleEditClick(appointment)} />
                <input
                  type="submit"
                  value="Delete"
                  onClick={() => handleDeleteClick(appointment)}
                />
              </li>
            ))}
          </ul>
          <input type="submit" value="Back" onClick={handleBackClick} />
          <FooterForLoggedin />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p>Login First</p>
        </div>
      )}
    </div>
  );
}
