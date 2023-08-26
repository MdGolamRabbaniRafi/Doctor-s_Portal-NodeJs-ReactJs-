import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const login = (email, cookie) => {
  sessionStorage.setItem('email', email); 
  console.log("EEEEEEEEE:"+email)
  console.log("ccccccccccccc:"+cookie)
  console.log("session:::::"+sessionStorage.getItem('email'))
    setUser({ email, cookie });

  };
  

  const checkUser = () => {
  //  const sessionEmail = sessionStorage.getItem('email');
    //console.log(sessionStorage.getItem('email'))
    return user !== null;
  };
  

  const logout = () => {

    doSignOut()
  };
  async function doSignOut() {
    try {
      const response = await axios.post( 'http://localhost:3000/Doctor/logout',
        {
          // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         // withCredentials: true
        }
      );
      console.log("cookie available?"+document.cookie)
      console.log(response)
        setUser(null);
      //  document.cookie = null;
      const cookies = Cookies.get();
  
      for (const cookieName in cookies) {
        Cookies.remove(cookieName);
      }
      sessionStorage.removeItem('email')
      console.log("Cookie distroy?"+document.cookie)

        router.push('/login');
      

    } catch (error) {
      console.error('error failed: ', error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
