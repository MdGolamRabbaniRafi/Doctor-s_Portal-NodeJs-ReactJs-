import FooterForLoggedin from "../Layout/LoggedinFooter"
import HeaderForLoggedin from "../Layout/LoggedinHeader"
import NavigationBarLoggedin from "../Layout/LoggedinNavbar"
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '../utils/authentication';
import DashBoard from "../Layout/Dashboard";
import SessionCheck from "../utils/session";
import dynamic from "next/dynamic";

const Title = dynamic(()=>import('../Layout/Doctor_Title'),{

  ssr: false,

});

export default function LoggeginPage() {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  return (
    <>
      <div>
          <>
          <SessionCheck></SessionCheck>
<Title page ="Dashboard"></Title>


            
            <NavigationBarLoggedin></NavigationBarLoggedin>
            <DashBoard></DashBoard>

          </>

      </div>
    </>
  );
}
