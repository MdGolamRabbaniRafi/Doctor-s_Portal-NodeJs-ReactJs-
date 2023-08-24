import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './utils/authentication';
import App from './_app'; // Your main application component

const ClientApp = () => {
  useEffect(() => {
    // This code will run on the client side
    ReactDOM.render(
      <AuthProvider>
        <App />
      </AuthProvider>,
      document.getElementById('root')
    );
  }, []);

  return null; // Return null or a loading indicator, as this component doesn't render anything
};

export default ClientApp;
