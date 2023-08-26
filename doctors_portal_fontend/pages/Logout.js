import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./utils/authentication";

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {

    logout();
    router.push('/');
  }, [router, logout]);

  return (
    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    );
}
