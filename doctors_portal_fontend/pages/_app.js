import '../styles/globals.css';
import { AuthProvider } from './utils/authentication';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

