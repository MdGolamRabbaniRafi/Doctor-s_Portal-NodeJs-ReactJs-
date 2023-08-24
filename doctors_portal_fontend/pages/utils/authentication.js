import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const login = (email, cookie) => {
  //  sessionStorage.setItem('email', email); 
  console.log("EEEEEEEEE:"+email)
  console.log("ccccccccccccc:"+cookie)
    setUser({ email, cookie });

  };

  const checkUser = () => {
    console.log("user:  "+user.email)
    console.log("user:  "+user.cookie)
    if(user.email!=null && user.cookie!=null) {
      return true;
    }
    else
    {
      return false;
    }

  };



  const logout = () => {

    doSignOut()
  };
  async function doSignOut() {
    try {
      const response = await axios.post( 'http://localhost:3000/Admin/signout/',
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        }
      );
      console.log(response)
        setUser(null);
        document.cookie = null;

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
