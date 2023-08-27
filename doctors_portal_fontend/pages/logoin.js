import React, { useState } from 'react';

function MeetTheTeam() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
<div className="bg-gray-100 h-screen w-screen  justify-between">
      <div className="navbar bg-teal-800 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      
      
    </div>
    <a className="btn btn-ghost normal-case text-xl">Notifications</a>
  </div>
 
</div>

<main className="container mx-auto p-4">
  <h1 className="text-3xl font-semibold mb-4">Your Notifications</h1>
  {error && <p className="text-red-500">{error}</p>}
  <ul className="space-y-4">
    {notifications.map((notification, index) => (
      <li
        key={index}
        className="p-4 bg-gray-200 shadow-md rounded-md"
      >
        <div className="flex justify-between items-center">
          <span className="text-black font-semibold text-base">
            Notification <span className="text-blue-500">{index + 1}</span>
          </span>
          <span className="text-gray-600 text-xs">
            {notification.date} - {notification.time}
          </span>
        </div>
        <p className="mt-2 text-gray-700">{notification.Message}</p>
      </li>
    ))}
  </ul>
  <button
    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    onClick={handleBackClick}
  >
    Back
  </button>
</main>


    </div>
  );
}

export default MeetTheTeam;
