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
          <button onClick={() => handleNavigation("../Doctor/profile")}>Profile</button><br />

        </li>
        <li>
        <button onClick={() => handleNavigation("../Doctor/Appointment")}>Appointment</button><br />



        </li>

        <li>
        <button onClick={() => handleNavigation("../Doctor/Refer_doctor")}>Refer</button><br />


        </li>

        <li>

<button onClick={() => handleNavigation("../Doctor/Edit_profile")}>Edit Profile</button><br />


</li>
<li>
<button onClick={() => handleNavigation("../Doctor/Post-article")}>Post Article</button><br />


</li>
<li>
<button onClick={() => handleNavigation("../Doctor/Send_email")}>Email</button><br />


</li>

<li>
<button onClick={() => handleNavigation("../Doctor/Notification")}>Notification</button><br />

</li>
<li>
<button onClick={() => handleNavigation("../Doctor/Searching")}>Searching</button><br />

</li>
      </ul>
    </nav>
  );
};

export default NavigationBarLoggedin;