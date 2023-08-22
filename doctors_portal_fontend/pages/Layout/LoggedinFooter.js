import Link from 'next/link';
import { useRouter } from 'next/router';
export default function FooterForLoggedin() {
  const router=useRouter()
  const handleNavigation = (path) => {
    router.push(path);
  };
    return (
      <><div className="FooterForLoggedin">
        <footer>
          
        <button onClick={() => handleNavigation("/Logout")}>Log Out</button><br />

        </footer>
        </div></>
  
       )
  }
  