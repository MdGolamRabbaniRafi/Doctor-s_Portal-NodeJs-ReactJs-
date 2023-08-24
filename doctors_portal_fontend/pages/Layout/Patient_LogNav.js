import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HeaderForLoggedin from './LoggedinHeader';
import FooterForLoggedin from "./LoggedinFooter"


const PatiLogo = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, justifyContent: 'flex-end' }}>
      <li style={{ marginRight: '10px' }}>
          <HeaderForLoggedin></HeaderForLoggedin>
        </li>

        <li style={{ marginRight: '700px' }}>
          
        </li>

        <li style={{ marginRight: '10px' }}>
          <button onClick={() => handleNavigation("/profile")}>Profile</button>
        </li>
       
        <li style={{ marginRight: '10px' }}>
          <Link href="Edit_profile">Edit Profile</Link>
        </li>
        <li style={{ marginRight: '10px' }}>
          <Link href="/Notification">Notifications</Link>
        </li>
        <li style={{ marginRight: '10px' }}>
          <Link href="Send_email"> Email</Link>
        </li>
      
      </ul>

      <li>
          <FooterForLoggedin></FooterForLoggedin>
        </li>
    </div>
    
  );
};

export default PatiLogo;
