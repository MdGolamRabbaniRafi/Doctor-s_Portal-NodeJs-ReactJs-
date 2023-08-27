import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function FooterForLoggedin() {
  const router=useRouter()
  const handleNavigation = (path) => {
    router.push(path);
  };
  const handleBack = () => {
    router.push('../Doctor/LoggedinPage');
  };
    return (
      <>
                  <button type="button"  style={{ width: '100px', height: '10px' }} onClick={handleBack}className="btn btn-primary">  <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            <span className="ml-1">Back</span>
             </button>
      
      <div className="FooterForLoggedin">
        <footer>
          
        <button
  onClick={() => handleNavigation("/Logout")}
  className="flex items-center space-x-1 text-red-600 hover:text-red-800"
>
  <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
  <span>Log Out</span>
</button>


        </footer>
        </div></>
  
       )
  }
  