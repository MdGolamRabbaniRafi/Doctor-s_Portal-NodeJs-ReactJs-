import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavigationBarLoggedin = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <nav>
      <ul>

        <li>
          <button onClick={() => handleNavigation("/profile")}>Profile</button><br />

        </li>
        <li>
        <Link href ="/Appointment">Appointment</Link><br />


        </li>

        <li>

        <Link href="Refer_doctor">Refer</Link> 

        </li>

        <li>

<Link href="Edit_profile">Edit Profile</Link> 

</li>
<li>

<Link href="Article">Article</Link> 

</li>
<li>

<Link href="Send_email">Send An Email</Link> 

</li>

<li>

<Link href="/Notification">Notification</Link><br />


</li>
      </ul>
    </nav>
  );
};

export default NavigationBarLoggedin;